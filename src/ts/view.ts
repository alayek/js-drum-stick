import Template from "./template";
import * as I from "./types";

class View {
  private _template: Template;
  public $target: HTMLElement;
  constructor(template: Template, target: string) {
    this._template = template;
    if (document) {
      if (target.startsWith("#") || target.startsWith(".")) {
        this.$target = document.querySelectorAll(target)[0] as HTMLElement;
      } else {
        this.$target = document.getElementById(target); // target element
      }
    }
  }

  /**
   * Populate the initial view
   * With key tiles and audio links
   */
  public mountInitialView(keys: Array<I.KeyInfo> | undefined): View {
    try {
      const tiles: string = this._template.keyTiles(keys);
      const audioLinks: string = this._template.audioLinks(keys);
      this.$target.innerHTML = `
        ${tiles}
        <br/>
        ${audioLinks}
      `;
    } catch (err) {
      console.error(`Something went wrong: ${err}`);
      throw new Error(err);
    }
    return this;
  }

  /**
   * Remove the playing class
   * After transition ends
   */
  private _removeTransition(event: TransitionEvent) {
    if (event.propertyName !== "transform") {
      return;
    }
    (event.target as HTMLElement).classList.remove("playing");
  }

  /**
   * Play sound
   * in response to keyboard events
   */
  private _playSound(event: KeyboardEvent) {
    const audio: HTMLAudioElement = this._template.findAudioElement(
      event.keyCode.toString()
    );
    const key: HTMLDivElement = this._template.findDivElement(
      event.keyCode.toString()
    );

    if (!audio) {
      return;
    }

    key.classList.add("playing");
    audio.currentTime = 0;
    audio.play();
  }

  /** Add audio and transitionend event listeners here */
  public addEventHandlers(): View {
    const divsWithKeys: Array<HTMLDivElement> = this._template.findAllDivs();
    if (divsWithKeys) {
      divsWithKeys.forEach(div =>
        div.addEventListener("transitionend", this._removeTransition.bind(this))
      );
    }
    window.addEventListener("keydown", this._playSound.bind(this));
    return this;
  }

  private _setHTMLBackground(url: string) {
    const html = document.querySelector("html");
    const frame = requestAnimationFrame(() => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      // html.style.transition = "background-image 0.8s linear";
      html.style.backgroundImage = `url('${url}')`;
    });
  }

  /**
   *
   */
  public addImageForBackground(url: string): View {
    const imgPixelElement: HTMLImageElement = document.createElement("img");
    imgPixelElement.src = url;
    imgPixelElement.width = 0;
    imgPixelElement.height = 0;
    imgPixelElement.onload = (event: UIEvent) => {
      this._setHTMLBackground(url);
      imgPixelElement.parentNode.removeChild(imgPixelElement);
    };
    document.body.appendChild(imgPixelElement);
    return this;
  }
}

export default View;

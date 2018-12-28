import * as I from "./types";

class Template {
  private _randomKey: string;
  private _audioElements: { keyCode: string; el: HTMLAudioElement }[];
  private _tileElements: { keyCode: string; el: HTMLDivElement }[];
  constructor(randomKey: string | undefined) {
    this._randomKey =
      randomKey.toLowerCase() ||
      Math.random()
        .toString(36)
        .substring(2, 9);
    this._audioElements = [];
    this._tileElements = [];
  }

  /**
   * Given a code
   * Find audio element in page
   */
  public findAudioElement(keyCode: string): HTMLAudioElement {
    // to avoid querying DOM, we'll check cached values here
    const entry = this._audioElements.find(x => x.keyCode === keyCode);
    let cachedElement;
    if (!entry) {
      // query the DOM, populate the array
      const el = document.querySelector(
        `audio[data-${this._randomKey}_key="${keyCode}"]`
      ) as HTMLAudioElement;
      this._audioElements = [
        ...this._audioElements,
        {
          keyCode,
          el
        }
      ];
      cachedElement = el;
    } else {
      cachedElement = entry.el;
    }
    return cachedElement;
  }

  /**
   * Given a code
   * Find div element in page
   */
  public findDivElement(keyCode: string): HTMLDivElement {
    // to avoid querying DOM, we'll check cached values here
    const entry = this._tileElements.find(x => x.keyCode === keyCode);
    let cachedElement;
    if (!entry) {
      // query the DOM, populate the array
      const el = document.querySelector(
        `div[data-${this._randomKey}_key="${keyCode}"]`
      ) as HTMLDivElement;
      this._tileElements = [
        ...this._tileElements,
        {
          keyCode,
          el
        }
      ];
      cachedElement = el;
    } else {
      cachedElement = entry.el;
    }
    return cachedElement;
  }

  /**
   * Return all the divs
   * with text
   */
  public findAllDivs(): Array<HTMLDivElement> {
    const elements = document.querySelectorAll(".key");
    return (Array.from(elements) as Array<HTMLDivElement>).filter(
      keyDiv => keyDiv.dataset[`${this._randomKey}_key`]
    );
  }

  /**
   * Render a single key tile
   */
  private _keyTile(keyInfo: I.KeyInfo | undefined): string {
    if (keyInfo) {
      return `
        <div data-${this._randomKey}_key="${keyInfo.keyCode}" class="key">
          <kbd>${keyInfo.character}</kbd>
          <span class="sound">
          ${keyInfo.soundName}
          </span>
        </div>
      `;
    }
    return `
      <div class="key">
      </div>
    `;
  }

  /**
   * Render a single audio link
   */
  private _audioLink(keyInfo: I.KeyInfo | undefined): string {
    if (keyInfo) {
      return `
        <audio data-${this._randomKey}_key="${
        keyInfo.keyCode
      }" src="./src/assets/${keyInfo.soundName}.wav">
        </audio>
      `;
    }
  }

  /**
   * Render all the key tiles
   */
  public keyTiles(keyInfoArray: Array<I.KeyInfo> | undefined): string {
    if (keyInfoArray) {
      if (keyInfoArray.length > 0) {
        return (
          keyInfoArray.reduce(
            (acc, keyInfo) => `${acc}${this._keyTile(keyInfo)}`,
            '<div class="keys">'
          ) + "</div>"
        );
      }
    }
    return `
      <div class="keys">
      </div>
    `;
  }

  /**
   * Render all the audio links
   */
  public audioLinks(keyInfoArray: Array<I.KeyInfo> | undefined): string {
    if (keyInfoArray) {
      if (keyInfoArray.length > 0) {
        return keyInfoArray.reduce(
          (acc, keyInfo) => `${acc}${this._audioLink(keyInfo)}`,
          ""
        );
      }
    }
  }
}

export default Template;

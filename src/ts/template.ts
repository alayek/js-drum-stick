import * as I from "./types";

class Template {
  private randomKey: string;
  constructor(randomKey: string | undefined) {
    this.randomKey =
      randomKey.toLowerCase() ||
      Math.random()
        .toString(36)
        .substring(2, 9);
  }

  /**
   * Given a code
   * Find audio element in page
   */
  public findAudioElement(keyCode: string): HTMLAudioElement {
    return document.querySelector(
      `audio[data-${this.randomKey}_key="${keyCode}"]`
    ) as HTMLAudioElement;
  }

  /**
   * Given a code
   * Find div element in page
   */
  public findDivElement(keyCode: string): HTMLDivElement {
    return document.querySelector(
      `div[data-${this.randomKey}_key="${keyCode}"]`
    ) as HTMLDivElement;
  }

  /**
   * Return all the divs
   * with text
   */
  public findAllDivs(): Array<HTMLDivElement> {
    const elements = document.querySelectorAll(".key");
    return (Array.from(elements) as Array<HTMLDivElement>)
    .filter(
      keyDiv => keyDiv.dataset[`${this.randomKey}_key`]
    );
  }

  /**
   * Render a single key tile
   */
  private _keyTile(keyInfo: I.KeyInfo | undefined): string {
    if (keyInfo) {
      return `
        <div data-${this.randomKey}_key="${keyInfo.keyCode}" class="key">
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
        <audio data-${this.randomKey}_key="${
        keyInfo.keyCode
      }" src="src/assets/${keyInfo.soundName}.wav">
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

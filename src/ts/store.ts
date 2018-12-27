import * as I from "./types";

export default class Store {
  private _data: Array<I.KeyInfo>;
  constructor() {
    this._data = [
      {
        keyCode: 65,
        soundName: "clap",
        character: "A"
      },
      {
        keyCode: 83,
        soundName: "hihat",
        character: "S"
      },
      {
        keyCode: 68,
        soundName: "kick",
        character: "D"
      },
      {
        keyCode: 70,
        soundName: "openhat",
        character: "F"
      },
      {
        keyCode: 71,
        soundName: "boom",
        character: "G"
      },
      {
        keyCode: 72,
        soundName: "ride",
        character: "H"
      },
      {
        keyCode: 74,
        soundName: "snare",
        character: "J"
      },
      {
        keyCode: 75,
        soundName: "tom",
        character: "K"
      },
      {
        keyCode: 76,
        soundName: "tink",
        character: "L"
      }
    ];
  }

  /**
   * Recursively create a randomized arrangement for a given array
   */
  private _randomArray(
    arr: Array<I.KeyInfo>,
    arr2: Array<I.KeyInfo> | undefined
  ): Array<I.KeyInfo> {
    if (arr.length === 0) {
      return [];
    }
    if (arr.length === 1) {
      if (Math.random() > 0.5) {
        return [...arr, ...arr2];
      }
      return [...arr2, ...arr];
    }

    const randomIndex: number = Math.floor(Math.random() * arr.length);
    const itemAtIndex: I.KeyInfo = arr[randomIndex];
    return this._randomArray(
      [...arr.slice(0, randomIndex), ...arr.slice(randomIndex + 1)],
      [...arr2, itemAtIndex]
    );
  }

  /**
   * Create a random arrangement of the array, and return the bigger slice
   */
  public getData(): Array<I.KeyInfo> {
    /**
     * Return a randomized slice of the array
     * after ordering it randomly
     */
    const startIndex = Math.floor(Math.random() * (this._data.length - 1));
    const randomArray = this._randomArray(this._data, []);
    if (startIndex > Math.floor(randomArray.length / 2)) {
      return randomArray.slice(0, startIndex + 1);
    }
    return randomArray.slice(startIndex);
  }

  /**
   * Generate a random string
   */
  public generateRandomString() {
    return Math.random()
      .toString(36)
      .substring(2, 9);
  }
}

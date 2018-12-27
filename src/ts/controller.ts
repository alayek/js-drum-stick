import * as I from "./types";
import View from "./view";

class Controller {
  private _view: View;
  constructor(view: View) {
    this._view = view;
  }

  /**
   * Set initial view after loading
   */
  public setView(keys: Array<I.KeyInfo>) {
    this._view
      .mountInitialView(keys) // set the initial elements
      .addEventHandlers() // add the event listners here
      .addImageForBackground("https://i.imgur.com/b9r5sEL.jpg"); // add fake image
  }
}

export default Controller;

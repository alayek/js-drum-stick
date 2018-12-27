import Controller from "./controller";
import View from "./view";
import Template from "./template";
import * as I from "./types";

class App {
  private _view: View;
  private _template: Template;
  private _controller: Controller;

  constructor(
    keys: Array<I.KeyInfo>,
    target: string,
    uuid: string | undefined
  ) {
    this._template = new Template(uuid);
    this._view = new View(this._template, target);
    this._controller = new Controller(this._view);
    this._controller.setView(keys);
  }
}

export default App;

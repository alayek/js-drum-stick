import App from "./ts/app";
import Store from "./ts/store";

const store = new Store();
const app = new App(store.getData(), "#app", store.generateRandomString());

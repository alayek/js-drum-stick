# JS Drum Stick

Exercise 1 from [JavaScript 30](https://github.com/wesbos/JavaScript30)

[Code Sandbox Link](https://codesandbox.io/s/oq58wn00n9)

[Live Demo](https://oq58wn00n9.codesandbox.io/)

This is written in TypeScript, and code is modular.

Modular can convey different meaning based on different context, so it's important to clarify what modularity means here.

Yes, the code is split in an MVC-style module system across app-controller-view-template-store modules. But that's not all.

Event listeners are added and removed in a way, that two copies of same app can co-exist on same page without polluting the global scope.

A random identifier is used with `dataset` on elements, to ensure one instance of the app, only operate on elements it's created or controlling.

Store provides the data array with info on sound files and keyboard codes. It's randomized too, would render different tiles on page refresh.

Also, background image loading is implemented in a way, that it'd be visible only if the full image is loaded into browser's cache. No rasterized loading of background image.

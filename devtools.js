console.log('devtools.js loaded');

chrome.devtools.panels.create(
    "My Net Tab",
    "/icon.png",
    "/index.html",
    null
  );


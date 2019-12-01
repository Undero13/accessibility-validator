# Accessibility validator

HTML accessibility validator adapted to pages dynamically rendered by JS

# Start

- git clone
- npm install
- npm start

## Script

- npm start - starting the project
- npm run lint - eslint + airbnb
- npm run test - running tests
- npm run build - build prod version

### Tech

- Electron - Desktop applications in JavaScript
- Nightmare - Allows remote work on the site DOM
- dom-parser - Virtual DOM management from node.js
- color - Comparing the contrast on the page
- electron-localizer - For translation
- electron-store - For data store

### ENV

- DEV_ENV - dev mode
- WINDOW_WIDTH - width of electron window
- WINDOW_HEIGHT- height of electron window
- SITE_LOADING_TIMEOUT - waiting time for page loading
- SITE_SCROLLING_TIMEOUT - scroll time
- {DEVICE}\_WIDTH - analize site window width
- {DEVICE}\_Height - analize site window height
- LANG - app lang

### Todos

- Better information in the report

### Bugs

- checkLinksAndButtons - bug picks up the style tag from svg and put it in textContent BUG#2
- Problems downloading css on some pages

### License

MIT

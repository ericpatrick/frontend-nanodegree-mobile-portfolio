# Website Performance Optimization portfolio project

## Install and Run
- Install [ImageMagick](https://www.imagemagick.org)
- Install [Node](https://nodejs.org)
- Run ```npm run config```
- If you desire run this project locally, open the `index.html` of the `dist` folder in you favorite browser
- If you prefer run a local web server, run `npm run start` and access [http://localhost:5000](http://localhost:5000)

## Improvements

### General
- The resources (js and css) has beem modified to load Asynchronously that improve the page load.
- The gulp has been used to minify resources (css and js) and change the external loads for scripts and styles inline.

### views/js/main.js
- Simplifying Pizza Size Calculation. The `determineX` function has been replaced by constant values.
- During pizza position recalculation, the `scrollTop` property was calculated only once, what avoid forced synchronous layout.

### views/pizza.html
- `pizzeria.jpg` has been compressed and the resolution was decreased.
- The `will-change` CSS property has been applied over the background pizzas, that avoid repainting.
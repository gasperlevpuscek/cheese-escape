# Cheese Chaser

Cheese Chaser is a browser maze game where you control a rat, avoid a roaming cat, collect cheese, and race to the exit.

## Overview

The game is built with plain HTML, CSS, and JavaScript.

- The maze and collectibles are rendered on an HTML5 `canvas`.
- The rat and cat are sprite images layered above the canvas.
- Movement and collision are handled with keyboard input and pixel-based wall checks.

No build tooling is required.

## Current Build Features

- Arrow-key rat movement
- Hidden collision canvas for wall detection
- Random cheese spawning from predefined maze polyline points
- Cheese collection sound effects and progress wheel UI
- Cat enemy pathing with delayed start and directional sprite swapping
- Win and lose SweetAlert popups


## Gameplay

### Player

- Starts near the top of the maze
- Moves using arrow keys
- Cannot pass through maze walls

### Cheese

- Spawned at random unique points from a predefined maze path
- Removed when the rat gets close enough
- UI panel updates as cheese is collected

### Cat

- Starts after a short delay
- Follows a predefined path through the maze
- Uses left/right sprite variants based on movement direction
- Triggering contact with the rat ends the game

### Goal

- Exit area is near the bottom-center of the maze
- Reaching it triggers the win popup in the current build

## Project Structure

```
index.html
LICENSE
README.md
images/
    catSprite/
        catLeft.gif
        catRight.gif
    cheeseImages/
        cheese.png
        cheese1.png
        cheese2.png
        cheese3.png
        cheese4.png
        cheese5.png
        cheese6.png
        cheese7.png
    cement.jpg
    floor.jpg
    legacySprites/
    maze25.svg
    ratSprites/
        ratStanding.png
        ratWalkingLeft.gif
        ratWalkingRight.gif
scripts/
    about.js
    audio.js
    catMovement.js
    cheeseSpawn.js
    main.js
sounds/
    meow1.mp3
    meow2.mp3
    meow3.mp3
    pianoMan.mp3
    RatEatCheese.mp3
    ratEncounter.mp3
styles/
    style.css
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/gasperlevpuscek/maze.git
```

### 2. Open the game

Open `index.html` in any modern browser.

## Controls

| Key | Action |
|-----|--------|
| ↑   | Move up |
| ↓   | Move down |
| ←   | Move left |
| →   | Move right |

## Author

Gasper Levpuscek

## License

MIT License. Free to use, modify, and distribute.

## Sources

- Cheese spawning logic (partly):
    https://stackoverflow.com/questions/37713983/java-swt-get-actual-x-y-coordinates-from-image-after-scaling-and-zooming
- Movement:
    https://codepen.io/AaronMakesGames/pen/grRGxX
- Rat sprite reference:
    https://tenor.com/view/walking-rat-stantwt-mouse-walking-gif-15699524885100061762
- Cat sprite reference:
    https://giphy.com/stickers/cat-black-walking-Hk5MWIosiHSVhes4rg

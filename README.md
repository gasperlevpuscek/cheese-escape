# Cheese Chaser

A small browser-based maze game where you guide a rat through a labyrinth, collect cheese pieces, and reach the goal at the bottom.

## Overview

Cheese Chaser is a JavaScript game rendered on an HTML5 `<canvas>`.

You control a rat navigating a maze and collecting pieces of cheese placed along a predefined solution path. After collecting all the cheese, reach the goal square to win.

The game uses basic collision detection and movement with the arrow keys.

## Features

- Canvas-based maze rendering  
- Player movement with arrow keys  
- Wall collision detection using a hidden canvas  
- Collectible cheese items  
- Win condition (collect all cheese and reach the goal)   

## How It Works

### Player

- Starts at the top center of the maze  
- Moves with the arrow keys  
- Cannot pass through walls  

### Cheese

- Cheese pieces are placed randomly in the maze  
- Cheese disappears when collected  
- All cheese must be collected before finishing  

### Goal

- A yellow square at the bottom center of the maze  
- Reach it after collecting all cheese to win  

## Project Structure

```
images
   maze25.svg
   rat.png
   cheese.png
   floor.jpg
   maze25
scripts
    main.js
styles
    style.css
index.html
LICENSE
README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/gasperlevpuscek/maze.git
```

Or download and extract the ZIP file.

### 2. Open the game

Open `index.html` in any modern browser.

No build tools or server setup required.

## Controls

| Key | Action |
|-----|--------|
| ↑   | Move up |
| ↓   | Move down |
| ←   | Move left |
| →   | Move right |

## Author
Gašper Levpušček

## License

MIT License. Free to use, modify, and distribute.


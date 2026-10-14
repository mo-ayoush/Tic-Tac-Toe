# Tic Tac Toe

A single-player 3×3 tic-tac-toe game built with JavaScript. Play as X against the computer, whose minimax strategy will take a win or block yours when it can.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Build and preview

```bash
npm run build
npm run preview
```

## Run unit tests

```bash
npm test
```

Jest tests the game rules, draw detection, and computer move selection. Build output goes to `dist/`, which is ignored by Git.

## Build and run with Docker

Build the multi-stage Docker image from the project directory:

```bash
docker build -t tic-tac-toe .
```

Start the container and map port 8080 on your computer to port 80 in the container:

```bash
docker run --rm -d --name tic-tac-toe-app -p 8080:80 tic-tac-toe
```

Open <http://localhost:8080> to try the game. To check that the web server responds, run:

```bash
curl -I http://localhost:8080
```

Stop the container when you're done:

```bash
docker stop tic-tac-toe-app
```

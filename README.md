# Arcade

Small browser games, built one pull request at a time. The first is BlockBreak, a brick-breaker: move the paddle, keep the ball in play, and break every brick.

It's plain HTML, CSS and JavaScript with no build step, so it will run by opening `index.html`.

## Running the tests

The tests check the game's rules and need only [Node.js](https://nodejs.org/) 22 or later, with no packages to install:

```
node --test
```

The same command runs automatically on every pull request, and the pull request shows a green check when every test passes.

## How this repo is built

Every change goes the same way, which is the point of this project:

1. **An issue** says what one piece of the game is and what "done" looks like.
2. **A branch** holds the work for that one issue, away from `main`.
3. **A pull request** shows the change, runs the automatic checks, and says `Closes #N` so the issue closes when it merges.
4. **A review and a merge** by Brandon puts it on `main`.

The open issues are the plan, one piece at a time.

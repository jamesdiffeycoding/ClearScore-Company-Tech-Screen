# Tech-screen

30 minutes spent on 14th Dec 2024.

## James's notes from reading the README.md file.

ClearScore wants to see that people can adapt to technologies that they use, and that they can assess which tools are used.
They are currently working with...

- ES6 and ES7 throughout the codebase
- React with Redux
- Isomorphic / Universal SPA
- PostCSS + CSS-modules for styling (legacy apps use SASS and BEM)
- MEN (Mongo, Express, Node) stack websites
- We build using the Webpack module bundler and Lerna package manager
- Jest + Enzyme for Unit testing
- We currently support the latest 2 versions of Edge, Chrome, Firefox and Safari (plus ie11)

They want

- A stylish solution
- Clean, concise code
- Unit Tests
- Demonstration of CSS knowledge
- A detailed README explaining assumptions / decisions
- A live site we can see

## James's notes from reading the IDEA-BOARD README.md file.

Want to see well structured and thought-out code. Unique solutions e.g. with animations or procedural programming are welcome.

Functionality needed is to create, edit or delete ideas. Each idea should be a tile with description and created/updated time. Edits for title/description should be done inline. Max length of 140 char.
Button to delete tile.

They want to see attention to detail and it treated like real world code (eg maintainable for others).

## MVP 1

- Fully responsive
- tiles with title, description and created/updated time
- new ideas should have title field focused to prompt typing
- tiles should be sortable alphabetically

## MVP 2

Stretch

- local storageAPI for persistance of current stati
- character countdown from characters 120-140 in description and 20-30 characters in the title
- unobtrusive notification when an update is made.
- animations: drag and drop to delete

## Assumptions I made

- Title should have max length of 30 char.

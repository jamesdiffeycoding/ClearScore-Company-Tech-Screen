# Developer Comments

14/12/24
I faced a challenge: 205 vulnerabilities in the packages being installed.
I assumed this was because the project was old and the packages installed are either no longer maintained or have newer versions.
I ran npm audit fix, and it dropped to 159 vulnerabilities

19/12/24
I ran npm audit fix --force, and it dropped to 8 vulnerabilities
I reviewed the file structure

    idea-board
        Node modules folder for packages
        Public folder with the index.html file
        Src folder
            App.css(styles for the App component)
            App.js(where the jsx is)
            App.test.js(enzyme basic tests)
            index.css (global styles)
            index.js(uses ReactDOM to render App component)
            setupTests.js(something to do with enzyme tests)
        package-lock.json (scripts and dependencies at last install)
        package.json (scripts and dependencies)
        yarn.lock (scripts and dependencies)
    .editorconfig (formatting rules)
    .gitignore (files to ignore push)
    .npmignore (not sure why this exists?)

I updated App.js to be modern react code, instead of using classes.
I installed Yarn, which I don't usually use.

I added a folder for readmes

    ReadMes
        ClearScore (original).md (all ClearScore instructions)
        Dev notes.md (an activity and thought-diary)
        ClearScore (short).md (my summary of the ClearScore instructions)

Planned MVP 1 with basic functionality.

    Draft structure of object I need.
    Create file with basic idea data.
    Map idea data into components.
    Create and add functions to delete the data.
    Adapt to work with local storage.

# Working towards a site with local variables

- I aimed to first get the site working with local variables.
- I created a DUMMYDATA set, now located in helpers.
- I created a responsive layout for mapping the DUMMYDATA on screen.
- I created a component for the IdeaCards that manages all complexity.
- I added text fields and buttons to the cards.

## CRUD functionality

- I implemented functionality for editing existing cards.

This included character counts with conditional formatting to alert the user when they are close to or have surpassed the character limit.

- I implemented functionality for creating new cards.

- I implemented functionality for deleting cards.

- I refactored the code for clarity/maintainability where possible, including:

... implementing a single object state for editing card title and details, supporting scalability by simplifying the process of adding more fields later if needed.

... adding reusable components (e.g for text areas and buttons) to improve readability where they are conditionally rendered.

... using consistent naming and declaration conventions, such as:

- declaring reusable components with arrow functions (const = () => ...)
- declaring functions with standard syntax (function name() {...})
- declaring const variables (e.g. for conditional length class names) to avoid 'magic values' causing accidental typo-errors

# Things I don't love about my code design

- all the CRUD functions and buttons create clutter by needing to be declared within the IdeaCards component as they use the states declared within it. I could make the buttons a nested component to part-solve this.

# Questions:

- How to handle old dependencies?
- Ok that I updated it to modern React code?
- What is the .editorconfig file and npm ignore file for?
- what is procedural programming?

What they use

ES6/ ES7,
React with Redux
Isomorphic / Universal SPA
PostCSS + CSS modules for styling
MEN - Mongo Express Nodes
Webpack module bundler and Lerna package manager
Jest and Enzyme for Unit testing

Looking for

stylish solution
clean concise code
unit tests
css knowledge
detailed readme with assumptions / decisions
a live site we can see

Idea board needs

create
update
delete
sort functionality

description max length of 140 c.

# include

- test suite
- comments where required
- attention to detail.
- full responsiveness
- focus the new title field when new idea pessed
- sort by creation date or alphabetically
- use localStorage to maintain state
- add character countdown
- add unobtrusive notification when update is made to a tile.

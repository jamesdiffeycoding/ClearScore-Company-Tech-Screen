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

# Questions:

- How to handle old dependencies?
- Ok that I updated it to modern React code?
- What is the .editorconfig file and npm ignore file for?
- what is procedural programming?

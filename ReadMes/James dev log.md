# Developer Comments

14/12/24
I faced a challenge: 205 vulnerabilities in the packages being installed.
I assumed this was because the project was old and the packages installed are either no longer maintained or have newer versions.
I ran npm audit fix, and it dropped to 159 vulnerabilities

19/12/24
I ran npm audit fix --force, and it dropped to 8 vulnerabilities
I reviewed the file structure

    Node modules folder for packages
    Public folder with the index.html file
    Src folder
        App.css(styles for the App component)
        App.js(where the jsx is)
        App.test.js(enzyme basic tests)
        index.css (global styles)
        index.js(uses ReactDOM to render App component)
        setupTests.js(something to do with enzyme tests)

    .

I updated App.js to be modern react code, instead of using classes.

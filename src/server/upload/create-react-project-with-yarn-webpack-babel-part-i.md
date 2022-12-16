# Create React Project with Yarn + Webpack + Babel
With this article, I want to show you guy about how to create project react with the most power tool of developer are Webpack, babel. After you read this article, you can build your first project react with yarn enviroment, Webpack tool and includes Babel generated.
## Why choose them ? (Yarn, Webpack, Babel)
- Yarn is a new package manager that replaces the existing workflow for the npm client or other package managers while remaining compatible with the npm registry. It has the same feature set as existing workflows while operating faster, more securely, and more reliably. It has been release and announce in [code facebook](https://code.facebook.com/posts/1840075619545360/yarn-a-new-package-manager-for-javascript/). It is the perfect one for React, Because at the facebook they’re already using Yarn in Production, they ‘re said that it’s been working really well for them. It powers the dependency and package management for many of our JavaScript projects.
Yarn is look like that npm you can add dependency package, So you can use dependency package in npm to use in Yarn. [list npm dependency](https://www.npmjs.com/package/)
![](https://images.viblo.asia/f7056dfa-699c-4e46-9000-d8bc04f37d57.jpeg)

-  Webpack is a module builder.  This is important to understand, as Webpack does not run during your page, it runs during your developer. With Webpack allow use to use:
   * JSX
   * SCSS
   *  CSS
   * SASS
   * JASCRIPT . . .

It helps us to loader that files above, with any problem you just add loader of the webpack with right name of loader function that allow you do that work. Example:
You can to webpack load file that have format A you just add the that support load that file, and this are the list loader that supports in webpack, [list loaders](https://webpack.js.org/loaders/)
![](https://images.viblo.asia/27c463e5-be82-49ca-960f-c1a17d85e34a.png)
- Babel: is the libraries javascript that allow us:
  - Complied javascript from ES6 to ES5 (because the old browser they don’t understand ES6 sytax)
  - Complied javascript to React.
  - Complied javascript from ES7 to ES5
The all complied of babel is called ```presets```, you can find other presets on this page [https://babeljs.io/docs/en/index.html](https://babeljs.io/docs/en/index.html)
## Installing Step
### Yarn
To install yarn on your computer, the first thing that you need to do, we need to install npm because as we know yarn is package develop from npm.  
After you install npm on your computer you can run ```npm -v``` to notification that your ```npm``` have been install or not by
```
npm   -v
```
![](https://images.viblo.asia/a3d6fff8-8748-4d09-8cfa-6558321c8a63.png)
After that we are going to install yarn from our npm.
```
npm installl -g yarn
```
Note we need to install yarn as global because we want to use yarn instead ```npm```, as npm after you install it, you can run code to notification that you have already installed it or not  ?
```
yarn -v
```
![](https://images.viblo.asia/a369adbf-4bd0-4645-b0d5-c9d756b7b393.png)
- Create the folder project, we will be called project is ```tutorial-generate-project-react```:
```
$  mkdir tutorial-generate-project-react && cd $_
```
We are going to generated our projects by using yarn.
```
$ yarn init
```
After that we ‘re using ```yarn install``` to finish our generated projects. On the finish we will see tree of our project is, look like that images.

![](https://images.viblo.asia/b2831e0d-d1fd-4328-859c-c22f37425197.png)
### Webpack
We are going to install ```webpack v 4``` it is the last version of webpack today in this point. By using code:
```
$ yarn add webpack@4.12.1
```
you can check it after you run it finish in your file ```package.json```
```
   "webpack": "4.12.1"
```
Note: with webpack v 4.X.X you need to install  ```webpack-cli``` , it is very important.
```
$ yarn add webpack-cli@3.0.8
```
on our project we create 2 folders are called: ```src``` and ```public```:
```
mkdir src public
```
Our purpose is: ```src``` to store our files code like ```js, css```,  and ```public``` to store our  generated from webpack.

### Babel
To run babel in webpack we need to in add ```babel``` to our staff, we are going to add:
- babel-cli: complie 
- babel-core: to run code babel
- babel-loader: loader babel for webpack
- babel-preset-env: preset for enviroment.
- babel-preset-react: preset for react
```
$ yarn add babel-cli@6.24.1 babel-core@6.26.3 babel-loader@7.1.4 babel-preset-env@1.5.2 babel-preset-react@6.24.1
```
With ```babel``` to allow it complie our file javascript to react, we need to create new file that is called ```.babelrc```
```
$ touch .babelrc
```
- Open file ```.babelrc``` and add preset to that file, our purpose to allow babel choose presets to complie.
```
{
  "presets": [
    "env",
    "react"
  ]
}
```
You can read more about style of file [.babelrc](https://babeljs.io/docs/en/babelrc.html)
## Conclusion
With this part let's you to know clearly about add babel, webpack,  yarn install  and config.  After that my second part II, I will show you guy how to contact ```babel```, ```webpack``` and ```yarn``` together to run only one command code that allow you to it for all.
## Document
- [Babel](https://babeljs.io/docs/en/babelrc.html)
- [Webpack](https://webpack.js.org/concepts/)
- [Yarn](https://yarnpkg.com/lang/en/docs/install/#debian-stable)
# 🔵 Gatsby.js
is a tool to create static sites using `react.js`. It was built with performance and simplicity in mind, as gatsby sites are 2-3 times faster than similar counterparts. The framework is designed to take care of performance on its own, leaving us free to focus on things that are more important, the code. `Gatsby.js` will use the most performant Webpack configuration to build our project. Also, it will prefetch (download ahead) resources so browsing will be lightening fast. It also follows [Google's PRPL pattern](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)  which makes the sites perform fast on the lowest of connections. We can also use `Gatsby.js` to create PWA apps, as it comes preloaded with all the requirements needed for a PWA.

# 🔨 Setting up
We need to setup the `gatsby-cli` in our system globally. 
run this to install `npm i -g gatsby-cli`

(prerequisite: node, npm)

## 💣 gatsby command not found
`gatsby command not found`
Some of the linux users report this problem, but not everyone seem to have it.
On one of my machines i faced this.

You can read the official bug report [here](https://github.com/gatsbyjs/gatsby/issues/4967)
But there is a better way than the solutions mentioned there.

Previously, I used [this guide from npm](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) to grant npm permission to install stuff without sudo.
(you don't have to run this. Unless you just set up nodejs in your linux system)
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
nano ~/.profile
# add in the bottom
export PATH=~/.npm-global/bin:$PATH
# save, and reload the .profile
source ~/.profile
```

So, as i my global packages are installed in `~/.npm-global` directory, gatsby somehow f's the path.
to fix this, first make sure gatsby is installed by running

```bash
npm -g ls --depth=0

# result
/home/sirajus.salekin/.npm-global/lib
└── gatsby-cli@2.6.2
```

and add the gatsby alias in your `.bashrc` file by running
```bash
nano ~/.bashrc

#add this at the bottom 
alias gatsby="~/.npm-global/bin/gatsby"

# save, close nano, reload by running
source ~/.bashrc
```

now, you should have the `gatsby` command available in your terminal.

# 🔵 Project Architecture
Run to create a new project
`gatsby new blog`

gatsby will ask you to pick your choice of package-manager it'll use (npm, yarn) if you have multiple of those in your system.
Select the package-manager, press enter, and you'll have your new gatsby static site ready.

move into the project folder
`cd blog`

to see the project architecture, we'll use the tree command (`sudo apt install tree`)

```bash
tree -I node_modules  #exclude node_modules folder ofcourse.

.
├── gatsby-browser.js
├── gatsby-config.js
├── gatsby-node.js
├── gatsby-ssr.js
├── LICENSE
├── package.json
├── README.md
│
├── src
│   ├── components
│   │   ├── header.js
│   │   ├── image.js
│   │   ├── layout.css
│   │   ├── layout.js
│   │   └── seo.js
│   ├── images
│   │   ├── gatsby-astronaut.png
│   │   └── gatsby-icon.png
│   └── pages
│       ├── 404.js
│       ├── index.js
│       └── page-2.js
└── yarn.lock
```

the `src` is the most importatnt folder her, as our code will reside inside it.
For other stuffs, here's the excerpt from `gatsby's` site.

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: Gatsby is licensed under the MIT license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: Duh  🙄 .


Now, to start the site locally, run
```sh
gatsby develop
```

we'll have the site running at [http://localhost:8000](http://localhost:8000)
![](https://images.viblo.asia/74229a14-26d8-4725-947b-4588d48294c0.png)

we'll also have a graphql secondary link on [http://localhost:8000/___graphql](http://localhost:8000/___graphql)
![](https://images.viblo.asia/d443ad2f-6ecd-420e-978b-147c0696787e.png)


# Changing the source code
Gatsby is written purely with react. So if you're okay with reactjs, you'll be able to work with gatsby without any issue.
For example lets see one of the file, `src/components/header.js`

```js
import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
```

This uses ES6 syntax as we're running on react version 16.
So, all the new goodness of react 16 (**hooks** ) will work out of the box  🎉  🎉  🎉 

Also, any change you do to your source will be hot reloaded in your browser.
![](https://images.viblo.asia/3937cfc3-76f1-4a04-974c-5135247e7481.gif)

#  📚  Learning material
[Full documentation for Gatsby](https://www.gatsbyjs.org/)

[in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/)

[PWA using Gatsby.js](https://www.gatsbyjs.org/docs/progressive-web-app/)

[code samples](https://www.gatsbyjs.org/docs/)

I highly suggest to see this demo from `Travesty.media`
{@embed: https://www.youtube.com/watch?v=6YhqQ2ZW1sc}


##  🚀 Hosting the sample site in netlifly
Simply, push your code on github.
Go to [https://app.netlify.com](https://app.netlify.com) , login with your github account.
![](https://images.viblo.asia/97f08cf8-2718-41f7-bda0-1a682df14825.png)

From there Select your repo to be deployed,
![](https://images.viblo.asia/236d178c-d3c7-44a1-953a-a72c082a5e08.png)
![](https://images.viblo.asia/f257b734-d1af-475a-9718-4481bd6da54b.png)

And click deploy.  🍻

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-default)
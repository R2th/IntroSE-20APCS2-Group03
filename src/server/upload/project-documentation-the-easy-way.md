When working on a project, many of us, developers, often think of two things as the most painful task. One of those is certainly, writing unit test for a project, and another one is, (yes, you guessed it right) writing documentation. Writing documentation can be a hassle, but keeping the documentation in sync. with the project every sprint, can be even more hassle.

When considering a project, two types of documentation comes in mind first. Documenting the code, and documenting the project features. These two types of documentation has two very distince types of audience. In this article, we are going to discuss about project documentation (for features only), a convenient approach for documentation development using [**Docusaurus**](https://docusaurus.io/) and integrating it in daily development cycles. Let's get to it!

## Preparing a Documentation Site

Different applications serves documentation (we are talking about feature documentation only) in different ways. Actually there are way too many to mention. Most significant documentation strategies that deserve a mention, includes,

- **Static sites**: Static documentation sites. Usually developed using a generator like Docusaurus, [Pickles](http://www.picklesdoc.com/) etc.
- **Portable Document Format**: PDFs are widely popular document format from Adobe. These are usually served via file download, or packaged with the software bundle, in cases of downloadable client applications.
- **Microsoft Compiled HTML Help**: *Microsoft compiled HTML help* or *CHM doc* s are proprietary documentation format from Microsoft. These documents are often used with *Windows* desktop applications.
- **Manual Page**: Software manual pages. These documentations are usually found on Unix or Unix-like operating systems
- **Doc files**: Word documents or it's variants
- **Cloud Docs**: Cloud docs (e.g. Google docs)

Site based documentations are often preferred over file based documentations. And, there are valid reasons behind it. When developing a site based documentation we have more flexibility over the structure, style and the overall tone of the documentation. Gone are the days when we used to develop static sites page by page.

Among many documentation generators, Docusauras is one option that is very simple to begin with, and works really well with a large variety of projects. Let's learn a bit about Docusaurus in brief.

### Docusaurus

Docusaurus is an open source doucmentation generator from Facebook. Considering its 7.6K stars on Github, it can be considered as a pretty popular project of this time. The project was started around the second quarter of 2017, and is under active development ever since.

Among other features, I consider **markdown based documentation** and **React support** as it's biggest plus. Additionally it has **search support** via [Algolia](https://www.algolia.com/), and **translation support** via [Crowdin](https://crowdin.com/).

Docusaurus is primarily used by different opensource projects including, [React Native](https://facebook.github.io/react-native), [Prettier](https://prettier.io/), [GO dep](https://golang.github.io/dep/), [Relay](https://facebook.github.io/relay/) and more. Many of these projects are Facebook's own.

### Initializing a Documentation Project

In this sections, we are going to,

- build a Docusaurus documentation project from the scratch
- go through the project structure and features
- test the project on development server

Let's get started!

#### Generating a scaffold

Docusaurus is a Node based application. If you don't have Node already, [get it first](https://nodejs.org/en/download/).

First, we need a project directory. Create a directory and `cd` into the directory.

```bash
$ mkdir project_n
$ cd project_n
```

It's a good idea to initiate `git` on the project directory root.

```bash
git init
```

Now, we'll generate the project scaffold.

```bash
npx docusaurus-init
```

The above command fetches the `docusaurus-init` package and executes it, which in turn generates the project files. Learn more about `npx` [here](https://www.npmjs.com/package/npx).

#### Preparing for test run

If you check the root directory, there will be two sub-directories.

- `website`: Contains the application files
- `docs-examples-from-docusaurus`: Contains the documentation files (markdowns)

Check the generation log, and you'll find something similar to the following,

```bash
...
Rename project_n/docs-examples-from-docusaurus to project_n/docs to see the example docs on your site.

Rename project_n/website/blog-examples-from-docusaurus to project_n/website/blog to see the example blog posts on your site.
...
```

Let's rename them.

```bash
mv docs-examples-from-docusaurus docs
mv website/blog-examples-from-docusaurus website/blog
```

Now, the project is ready to test.

#### Test run

To test the scaffold, `cd` into the `website` directory and run it using npm `start` script.

```bash
$ cd website
$ npm start
```

Docusaurus will attempt to start the application at port `3000` and open it on the default browser. If default port is unavailable, the next available port will be used.

![](https://images.viblo.asia/7bfc96c0-37b0-4c1b-b7da-2d7e2de609a4.png)

The development server supports live reload. Any change you make to a doc or blog file, will be reflected to the open browser tabs. But, please note that, changes to the application configuration files (e.g. `siteConfig.js`) requires a server restart to take effect.

#### Understanding the project

In this section, we'll go through the basics. But first, let's have a rough understanding of the project structure.

- `/docs`
  - Contains markdown documentation files in a flat directory (e.g. `/docs/Intro.md`)
  - May contain assets (e.g. in `/docs/assets` directory)
- `/website/siteConfig.js`
  - Application configurations
- `/website/pages/en/index.js`
  - Homepage (body only) as a React component
- `/website/sidebars.json`
  - Documentation sidebar (contains ordered documentation links with group)
- `/website/static`
  - Global static assets (e.g. css, image)
- `/website/core/Footer.js`
  - Global application footer as a React component
  - *Note*: Footer can be disabled by rendering `null` from the component
- `/website/blog`
  - Contains blog posts
- `/website/pages/en`
  - Contains static pages as React component

##### Customizing the navigation bar

Navigation bar consists of *application icon*, *title* and *links*. All of these properties are customizable from `siteConfig.js`. Let's consider that we made the following changes.

```javascript
...
const siteConfig = {
  title: 'Project N',
  tagline: 'A dummy project',
  headerIcon: 'img/project_n.svg',
  headerLinks: [
    {doc: 'intro', label: 'Docs'},
    {blog: true, label: 'Blog'}
  ]
...
}
...
```

The `title` property sets the project title, and `tagline` works as a oneliner project description (which is usually used as a window title). `headerIcon`, just like you guessed, sets the icon on the header, and it reads the file from the `img` subdirectory of `/website/static` directory.

`headerLinks` is an ordered list of all the navigation links, where,

```javascript
{doc: 'intro', label: 'Docs'}

```

implies that the link with label *Docs* will redirect to a docs markdown with title `intro`.

##### Customizing the footer and homepage

The footer and homepage configuration is mostly about configuring the React component located at `/website/core/Footer.js` and `/website/pages/en/index.js` respectively.

##### Organizing documentations

Docusaurus stores each documentation topic in an individual markdown file in `/docs` directory. Let's consider that, when user clicks *Docs* link from the navigation bar, they will be redirected to the documents page with the specified topic (which is usually the first topic in the documentation).

But, how user will find the remaining topics? That's where comes the sidebar. Each topic can be navigated from,

- Sidebar
- Next document link
- Direct URI link

For a smooth navigation, we should organize the topics in sidebar. Sidebar configuration is ordered, and the file is located at `/website/sidebars.json`. An example configuration looks like the following,

```javascript
{
  "docs": {
    "Introduction": ["intro"],
    "Topic 1": ["topic1"],
    "Topic 2": ["topic2"]
  }
}

```

##### Writing a blog post

All the blog posts are markdown files, which are located in `/website/blog` directory. A blog post must be named using the following format,

```text
YYYY-MM-DD-My-Blog-Post-Title.md
```

##### Linking from a static page

Resources can be linked from any React component page (located in `/website/pages/en`) in the following way.

Asset linking: `siteConfig.baseUrl + 'img/' + 'img1.png'`
Docs linking: `siteConfig.baseUrl + 'docs/' + 'intro.html'`

The above examples consider that you already imported the siteConfig as follows.

```javascript
const siteConfig = require(process.cwd() + '/siteConfig.js');
```

---

Please note that, this article intends to get you started with the basics only. To have a detailed understanding of the project structure, please refer to [Docusaurus documentation](https://docusaurus.io/docs/en/site-config).

### Documentation Structure

## Markdown Support

Let's check the following markdown page below, which will demonstrate some of the Docusaurus features.

```markdown
//---
id: intro
title: Introduction
//---

This is an [internal link](/docs/doc1.html)
This is an [external link](https://google.com)
![This is an image from "/docs/assets"](/docs/assets/image_1.png)
<center>This is a center text</center>
Text <img src="https://example.com/image.png" alt="An external image with inline CSS styling" style="display: initial;"> link
```

Let's investigate the markdown.

The initial section

```markdown
//---
id: intro
title: Introduction
//---
```

is specific to Docusaurus, where `id` acts as the doc id which is used to refer to this doc throughout the application (e.g. `intro.html`), **regardless of the name of the markdown file**. And, `title` acts as the doc title. If `sidebar_title` is not provided, `title` acts as the sidebar title.

```markdown
<center>This is a center text</center>
Text <img src="https://example.com/image.png" alt="An external image with inline CSS styling" style="display: initial;"> link
```

Docusaurus supports CSS styling in markdown, which enables formatting like the above.

## Considerations

Docusaurus is a pretty descent documentation generator. But, there are some edge cases you probably should consider before using it.

Remember that Docusaurus provides the translation service using Crowdin. Err..., here's a heads up if you have not used Crowdin before. They provide documentation translation service using their human resource, which is just great, right? But, here comes the catch, they have [a long list of conditions](https://crowdin.com/page/open-source-project-setup-request) which you must satisfy before they allow you to use their service for free. Long story short, if your project is not a very active, popular, community driven and mature enough, this service is not for you. In that case, the bright option is, to translate the document by yourself.

But if you don't need translation, there's not much apparent issue, really. And, while considering the alternatives, the first thing that comes in mind is "Google Translate", of course. We can consider it as a cheaper alternative, if quality is not that big of an issue. ;)

---

So far, we discussed a bit about project feature documentation, and then we checked the basic features of Docusaurus. Finally, we prepared a demonstration project on Docusaurus, and reviewed some markdown features. While this is enough to spin up a basic documentation project, it is always best to refer to the [core Docusaurus documentation](https://docusaurus.io/docs/en/installation) whenever necessary. It's a good platform for documentation website, but, it's also possible to use it as lite-blog application. In my next post, I am going to demonstrate how to automate the documentation deployment process. Until then, happy coding! :)
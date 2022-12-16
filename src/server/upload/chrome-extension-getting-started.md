In this post, I'm gonna talk a little bit about Chrome Extension, about what it is and how to build a small (but very useful) chrome extension.

## 1. What is Chrome Extension?
Chrome is an application which is used for browsing internet. And Chrome Extension is simply a small program that extends the functionality of the Chrome application, hence the name *Chrome Extension*.  

## 2. How to build a Chrome Extension?
Chrome Extension system is built with web developers in mind, which means, building a Chrome Extension is pretty much the same as building a web application. All you need to know is HTML, CSS and Javascript.

## 3. Building our first Chrome Extension

The Chrome Extension that we're going to build is an extension that helps to translate a Japanese sentence/word into English.

A Chrome Extension is a compressed directory which a bunch of files, however, they all have to have one file named **manifest.json**. So first, let's create a folder named JaEn, then, create a file named **manifest.json** inside that folder with the following content:

```
{
  "name": "Japanese to English",
  "version": "1.0.0",
  "manifest_version": 2
}
```

The **manifest.json** file might contain a lot of options, the only three options above are the options that it has to have, the rest is optional depends on your specific application's purpose. You can view all the manifest available options [here](https://developer.chrome.com/extensions/manifest)

Before moving forward, let's load our extension into chrome browser. 

1. Open the Extension Management page by navigating to *chrome://extensions*.
The Extension Management page can also be opened by clicking on the Chrome menu, hovering over **More Tools** then selecting **Extensions**.
2. Enable Developer Mode by clicking the toggle switch next to **Developer mode**.
3. Click the **LOAD UNPACKED** button and select the extension directory.

![](https://images.viblo.asia/0ef6ad19-b7fd-426d-b5ea-7bef4bfa64e4.png)

Yay! The extension has been successfully installed.

Now, let's move on to the important part. Without too much talking, this is the final *manifest.json* file that we need.

```
{
  "name": "Japanese to English",
  "version": "1.0.0",
  "manifest_version": 2,
  "permissions": ["contextMenus", "tabs"],
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  }
}
```

There are two things interesting about this. First is the [permissions](https://developer.chrome.com/extensions/declare_permissions), the permissions array declares which permissions our extension is required to perform its functionalities. Second is the [background page](https://developer.chrome.com/extensions/background_pages) in which our script will be run.

Next, let's create a second file named **background.js** with the following content:

```
chrome.runtime.onInstalled.addListener(function(){
  chrome.contextMenus.create({
    id:"JPEN",
    title: "Translate '%s' to English",
    contexts: ['selection']
  })
})

chrome.contextMenus.onClicked.addListener(function(info){
  const selectionText = info.selectionText.toLowerCase()
  const url = `https://translate.google.com/#view=home&op=translate&sl=ja&tl=en&text=${selectionText}`
  chrome.windows.create({ 
    url,
    type: 'popup',
    height: 500,
    width: 800,
  })
})
```

The [chrome.runtime.onInstalled](https://developer.chrome.com/apps/runtime#event-onInstalled) is a life cycle hook which is fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version. 

The [chrome.contextMenus.create](https://developer.chrome.com/apps/contextMenus#method-create) used to create a new context menu item.

The [chrome.contextMenus.onClicked](https://developer.chrome.com/apps/contextMenus#event-onClicked) is an event listener which is fired when a context menu is clicked. It will automatically receive an info object which contains a lot of useful information, in our extension, we're using the **selectionText** property of that object to get the selected text. 

The [chrome.windows.create](https://developer.chrome.com/extensions/windows#method-create) creates (opens) a new browser window with any optional sizing, position, or default URL provided. In our case, I'm opening a window with *popup* type and a URL which is the URL for utilizing Google Translate for translating purpose.

That's all the related information about our extension's implementation detail. The final extension folder will look like this:
```
JaEn
│--manifest.json
│--background.js   
```

Now, let's see whether our extension work as expected or not. (don't forget to click on the reload/update extension button)

![](https://images.viblo.asia/fc99631c-4ee5-4c97-a1ff-40b0d4e465cb.png)


![](https://images.viblo.asia/49bae6dd-91ce-44b4-b039-a86c796aa542.png)

Yay! It works.

## 4. Conclusion
In this post, I just introduced to you what a Chrome Extension is, which technologies needed to build one and how to build a simple but very useful Chrome Extension. Hopefully, it will be a starting point for you to build some next big, powerful chrome extensions.
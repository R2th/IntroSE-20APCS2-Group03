In my last [Progressive Web App (PWA)](https://viblo.asia/p/progressive-web-app-pwa-4dbZN8yL5YM), I had an introductory discussion about PWA. In this post I will deep dive more into PWA.

# Core building block of PWA

1. Service workers: Service workers are supported in modern browsers like chrome. Service workers are basically javascript running at the background process even if your application is closed. Service workers are a core building blocks because they allows us to get offline access to cache some files and serve them if you don’t have the internet available. And they also give us access to over progressive web app related features. For example, background synchronization, sending a request once the internet connection is re-established, we use service worker for that. Push notifications would be another example, because it runs on the background independent of currently opened tabs. 

2. Application Manifest: The application manifest is also an important building block which makes an application installable on whole screen not installed through App Store. 

3. Responsive Design: Design of application should be responsive so that it fits across different mobile view. 

4. Geolocation API:  Access user location. 

5. Media API: Access device camera and microphone.

![](https://images.viblo.asia/7cd7b008-18be-4f6b-afbc-b103b5e3019a.png)


# PWAs and SPAs
Single page applications are the web applications that are powered by javascript typically created with a framework like re-act Angler or VUE where the framework really renders the DOM all the time to react to user input to display the front page as well. You only have a single page and one HTML file. It is a website design approach where each new page's content is served not from loading new HTML pages but generated dynamically through JavaScript's ability to manipulate the DOM elements on the existing page itself. In a more traditional web page architecture, an index.html page might link to other HTML pages on the server that the browser will download and display from scratch.An SPA approach allows the user to continue consuming and interacting with the page while new elements are being updated or fetched, and can result in much faster interactions and content reloading. 

On the other hand, PWA is a collection of technologies and techniques, it runs totally independent of your app being a single page application or not. You can turn any single page application into a progressive web app and the same is true for any traditional multi-page application where you render your views from your server via node, PHP whatever it is. 

![](https://images.viblo.asia/903ce222-20d5-4d24-95bb-27cdad9a1b49.png)

# Progressive Enhancement
There is also other core concept that I want to emphasize as well. What does the progressive actually mean? Indeed it basically means that we can progressively enhance our web application. So let's consider this starting point.

![](https://images.viblo.asia/12a1c868-dc4c-4ed9-bfa2-9c8e52a1a0d0.png)

We have three different web apps. One is a legacy web app. So an old web app using older technology and probably all the supporting older browsers.

Then we have existing modern app which is maybe also a traditional web app not a single page application, nothing fancy but a target's modern browsers because maybe it's an internal company tool or some page which mainly addresses tech enthusiasts something like that. And maybe we have an upcoming project and there we can pretty much bank on people having more modern browsers because suborders already getting better more people are using more browsers. It's probably going to be better in the future too.

So we have these free different apps can we only turn the upcoming project into a progressive web app. Now because rewriting an existing app from scratch certainly isn't an option. So if you want to turn this into a progressive web app you can not just start over. Well let's have a look at the near future, we can simply add some features to our existing app and and you can stop at any given point. You can stop after adding an app manifest and a basic service worker, you can stop after you implement the basic caching advanced caching portion notifications, you can stop all the time. Now your existing modern app, here you can maybe made some more progressive web app features. 
So you can fully implemented as a progressive web app right from the start and plan everything with that in mind. Now in the further away future our older application might use some or multiple progressive web features but not all of them and it's perfectly fine. You don't have to use zero or 100 percent. You can absolutely use 40 percent of all the features you learn. Pick the one which enhance your application and atom.


![](https://images.viblo.asia/ed19b55d-677a-49e5-8290-828f31c37252.png)

# What I will discuss later 
Now let's see what exactly I will discuss in this and some upcoming post and how I will walk through all these topics. Well right now we're still getting started but we're almost done. 

![](https://images.viblo.asia/c804abe3-25fa-4a7a-8de2-d202e1b3e44e.png)

In the next module will have a look at the application manifest. This is a document which tells the browser more about our web application and you'll learn everything about it in the second module. Thereafter we'll all dive into service workers because they are such a core building block. Now service workers and in general a lot of progressive Web features use promises to fetch API. Therefore we will have a short module where I briefly refresh the knowledge about these core concepts. So we're all on the same page because we're going to use a lot of promises and fetch API because it's easier to use. Now once we understand this,  we'll head back to service workers and learn how we can use them to provide offline access through caching. We'll then continue on this road and dive into advanced caching strategies using service workers to really have the right strategy for which ever said you going to load in which every situation in your app.
After that we'll have a look at how we can cash dynamic content with indexed DB because thus far we will have cached assets like CSS script files and images. Now what about json data you get back from a rest and point, we can cash that too. Finally I will discuss about background synchronization, web push notification, media API and geolocation API.

Stay tuned for my next post from where we will start building a practical PWA. 

### Ref
[Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/)
[A Step-by-Step Tutorial for Developing a Progressive Web App](https://dzone.com/articles/a-step-by-step-tutorial-for-developing-a-progressi)
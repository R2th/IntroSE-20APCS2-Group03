### I. What is React Native ?
React Native is a framework for building native mobile applications using Javascript and released by Facebook. We can use React Native to build iOS apps and Android app only by code a javascript language. To understand what React Native is, we need to distinguish the difference between Native and Hybrid applications.

### II. HYBRID APPLICATION
HYBRID APPLICATION Is a software program on mobile phones written on the web platform (html5, css3, javascript), which is purely web application but has added features to manipulate the operating system like file, access camera, GPS or sensors  ... All of these are surrounded by a prominent Native application layer.

The web part processed is displayed by webview, the system access feature is provided by API functions. The application calls the Javascript function through the API, the Phonegap / Cordova program that wraps will call Native directly to the operating system. In this way, the web application has more advanced features of Native applications, and because of the availability of the source code, the speed of the hybrid application is faster than the web application.

### III. NATIVE APPLICATION
The application is developed directly in the language of the operating system provided. Ex: iOS is Objective-C, Swift and Android is Java, Window phone is C ++ or C #. Applications written in this language are compiled into the device language on the phone and have all the features that the operating system provides. Because it is a direct language as well as not through any other application, the speed is the fastest.

Speed here includes display speed (smoothness), and processing speed. If you pay close attention you will see native application operations such as page transfer, navigation, and page scrolling all very smooth. With the superior speed of processing, hybrid applications can hardly make heavy graphics applications such as games, although still possible but not smooth, so almost no use for hybrid programming game for mobile phones.

### IV. REACT NATIVE
React Native is a framework that helps programmers write Native applications only with Javascript. Just only javascript you can create a mobile app.

React Native helps web developers to write native applications to overcome the weaknesses of web and hybrid applications. For javascript programmer, you can code on all web app, desktops, servers and now mobile. This is not only benefie for web developers but it helps businesses develop  products with less code and human.

When building React Native, it's great to have the Live Reload feature integrated - similar to the Hot Replacement Module feature in Webpack. Live Reload is different to Reload feature, while Live Reload only reloads the changed function / file and Reload will reload the entire source code. In addition, you can easily debug javascript in Chrome and Safari. For Native errors, it is necessary to use XCode for iOS or Android Studio for Android.

### V. REACT NATIVE WORKS
Applications written in React Native are divided into two parts: the View and the Processing.
The View  is compiled from javascript will map to the components of the system eg navigation, tab, touch ... View is inspired by React JS 's Virtual DOM , all view processing is done on a tree Virtual DOM, then rendered by React Native with native view.
The Processing is still work directly in javascript, code is handled under the core executing Javascript, not translating via Java or Swift / Objective -C then do the calculation.

### VI. How to set up React native on ubuntu
At part, i will show how to set up React Native on ubuntu as below:

**1. Install nodeand npm**
* Maybe have alot of people have the same problems when the installation is completed, then they can not run the project because they are not compatible with the version nodejs, so that i want to recommend you to install nvm for manage the version of nodejs in personal computers. 
* Install NVM
```
apt-get update
apt-get install build-essential libssl-dev

// install nvm
curl-o-https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

// reload bash
source ~/.bashrc

// version
nvm --version
```
* Set up Node
```
// install latest node
nvm install node

// set default node version for nvm
nvm alias default node

// check version of node and npm
node -v
npm -v
```
**2. Install watchman**

Plz follow the comand line below:
```
git clone https://github.com/facebook/watchman.git
cd watchman/
git checkout v4.9.0
sudo apt-get install -y autoconf automake build-essential python-dev libssl-dev libtool
./autogen.sh
./configure
make
sudo make install
```
**3. Installation android studio**
* react-native-cli 
```
npm install -g react-native-cli
```
* Create and build an app:
```
react-native init FirstApp
// Move to created project dir.
cd FirstApp
// Start react-native packager
npm start
// open up another terminal and run android
react-native run-android
```

For the next part, I will show you how to build and run the first app with React Native.
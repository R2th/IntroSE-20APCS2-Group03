# Make a runnable Ionic's execution environment with Docker
![](https://images.viblo.asia/3e2cb9c7-aa00-4bc2-ad6b-47f9db70097f.png)

Do you know the Ionic Framework that can create Web applications and iOS / Android applications with HTML5 application?

> Reference: https://ionicframework.com/docs/
> 

I did build an application with Java Framework (Sping/ Struts).

And now i came up with ideas for some applications and wanted to make native applications (especially iOS applications).

However, it takes time to learn Swift (which is not familiar to me at all)... And I want to make it more easily to approach...

And I ended up with looking for a way and found this: React Native and Ionic.

Ionic is based on Angular. I've never touched both ReactNative or Angular, but this time I tried picking Ionic with a good feeling about their gorgeus naming.

In this article, I will show you some excerpts of the execution environment when running Ionic and the creation of template of the application.

# Enviroment
The environment used is listed below.

Since we build the environment with Docker, this tutorial should have no problem if Docker runs smoothly,

You need a MacOS machine to run iOS files.

· Mac Pro (2018) OS Mojave 10.14.1'

· Docker for Mac (Docker Engine 18.09)

· Xcode 10.1

※ Environment setup procedure is omitted

# Environment Construction
I pushed the Ionic  I constructed this time into DockerHub.

I also give [Dockefile](https://github.com/govargo/container/blob/master/docker/ionic/Dockerfile) to GitHub.

```
FROM node:10.14.2-alpine

WORKDIR /usr/src/app

# Install Ionic and Cordova
RUN npm i -g ionic cordova

# Setting Ionic
RUN ionic --no-interactive config set -g daemon.updates false

# Show ionic cli command
CMD ["ionic"]
```

Because it uses Alpine, it is quite heavy in terms of file size (about 72 MB)

Since `ionic --help` is specified in CMD, if you just simply type in down,

The following command help will be displayed and it done configured.

```
$ docker run -it govargo/ionic

   _             _
  (_) ___  _ __ (_) ___
  | |/ _ \| '_ \| |/ __|
  | | (_) | | | | | (__
  |_|\___/|_| |_|_|\___|  CLI 4.6.0


  Usage:

    $ ionic <command> [<args>] [--help] [--verbose] [--quiet] [--no-interactive] [--no-color] [--confirm] [options]

  Global Commands:

    config <subcommand> ............. Manage CLI and project config values (subcommands: get, set, unset)
    docs ............................ Open the Ionic documentation website
    info ............................ Print project, system, and environment information
    init ............................ (beta) Initialize existing projects with Ionic
    login ........................... Login to Ionic Appflow
    logout .......................... Logout of Ionic Appflow
    signup .......................... Create an account for Ionic Appflow
    ssh <subcommand> ................ Commands for configuring SSH keys (subcommands: add, delete, generate, list,
                                      setup, use)
    start ........................... Create a new project

  Project Commands:

    You are not in a project directory.
```

I will create an Ionic project using this Docker image immediately.

```
# Create a directory for saving build files app
$ mkdir app

# Ionic's default port 8100 port do the forwarding and specifying to make the build file persist and launch the container
$ docker run -it -p 8100:8100 -v $(pwd)/app:/usr/src/app govargo/ionic sh
```

Once we can go inside the container, create a project with the start command.

As Ionic is asked whether to use versions 3, 4 and 4 version, enter `y` for yes

```
/usr/src/app # ionic start
[INFO] You are about to create an Ionic 3 app. Would you like to try the release candidate for Ionic 4?

       Ionic 4 uses the power of the modern Web and embraces the Angular CLI and Angular Router to bring you the best
       version of Ionic ever. See our blog announcement[1] and documentation[2] for more information. We'd love to hear
       your feedback on our latest version!

       [1]: https://blog.ionicframework.com/ionic-framework-4-0-rc-shipped-paving-way-for-final
       [2]: https://beta.ionicframework.com/docs/

? Try Ionic 4? (y/N)
```

Next the project name will be asked.

In this example, enter `sample`.

```
? Try Ionic 4? Yes

Every great app needs a name! 😍

Please enter the full name of your app. You can change this at any time. To bypass this prompt next time, supply name,
the first argument to ionic start.

? Project name:
```

Next, select the type of template by positioning the cursor.

I chose sidemenu here.

```
? Project name: sample

Let's pick the perfect starter template! 💪

Starter templates are ready-to-go Ionic apps that come packed with everything you need to build your app. To bypass this
prompt next time, supply template, the second argument to ionic start.

? Starter template:
  blank    | A blank starter project
❯ sidemenu | A starting project with a side menu with navigation in the content area
  tabs     | A starting project with a simple tabbed interface
  ```
  
When you select a template, installation of necessary modules is started automatically.

(It is so convenent right?)

Installation takes several minutes.

When installation completes, you are asked whether you want to install the `Appflow` SDK.

In this example we selected `n` for no.

```
? Starter template: sidemenu
✔ Preparing directory ./sample - done!
✔ Downloading and extracting sidemenu starter - done!

Installing dependencies may take several minutes.

     ✨   IONIC  DEVAPP   ✨

 Speed up development with the Ionic DevApp, our fast, on-device testing mobile app

  -  🔑   Test on iOS and Android without Native SDKs
  -  🚀   LiveReload for instant style and JS updates

 -->    Install DevApp: https://bit.ly/ionic-dev-app    <--

────────────────────────────────────────────────────────────

> npm i
? Starter template: sidemenu
✔ Preparing directory ./sample - done!
✔ Downloading and extracting sidemenu starter - done!

Installing dependencies may take several minutes.

     ✨   IONIC  DEVAPP   ✨

 Speed up development with the Ionic DevApp, our fast, on-device testing mobile app

  -  🔑   Test on iOS and Android without Native SDKs
  -  🚀   LiveReload for instant style and JS updates

 -->    Install DevApp: https://bit.ly/ionic-dev-app    <--

────────────────────────────────────────────────────────────

> npm i
npm WARN deprecated circular-json@0.5.9: CircularJSON is in maintenance only, flatted is its successor.

> node-sass@4.10.0 install /usr/src/app/sample/node_modules/node-sass
> node scripts/install.js

Downloading binary from https://github.com/sass/node-sass/releases/download/v4.10.0/linux_musl-x64-64_binding.node
Download complete  ] - :
Binary saved to /usr/src/app/sample/node_modules/node-sass/vendor/linux_musl-x64-64/binding.node
Caching binary to /root/.npm/node-sass/4.10.0/linux_musl-x64-64_binding.node

> node-sass@4.10.0 postinstall /usr/src/app/sample/node_modules/node-sass
> node scripts/build.js

Binary found at /usr/src/app/sample/node_modules/node-sass/vendor/linux_musl-x64-64/binding.node
Testing binary
Binary is fine
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})

added 1138 packages from 1200 contributors and audited 50831 packages in 134.888s
found 0 vulnerabilities


     🔥   IONIC  APPFLOW   🔥

 Supercharge your Ionic development with the Ionic Appflow SDK

  -  ⚠️   Track runtime errors in real-time, back to your original TypeScript
  -  📲  Push remote updates and skip the app store queue

 Learn more about Ionic Appflow: https://ionicframework.com/appflow

────────────────────────────────────────────────────────────

? Install the free Ionic Appflow SDK and connect your app? (Y/n)
```
In this way, the project was successfully initialized.

```
? Install the free Ionic Appflow SDK and connect your app? No

[INFO] Next Steps:

       - Go to your newly created project: cd ./sample
       - Run ionic serve within the app directory to see your app
       - Build features and components: https://beta.ionicframework.com/docs/building/scaffolding
       - Get Ionic DevApp for easy device testing: https://bit.ly/ionic-dev-app
```

After checking the directory, a sample project has been created.

```
/usr/src/app # ls -l
total 0
drwxr-xr-x   12 3434     3434           384 Dec 22 15:46 sample
```

```
/usr/src/app # cd sample/
/usr/src/app/sample # ls -l
total 404
-rw-r--r--    1 3434     3434          5284 Dec 21 20:24 angular.json
drwxr-xr-x    5 3434     3434           160 Dec 22 15:41 e2e
-rw-r--r--    1 3434     3434            66 Dec 22 15:41 ionic.config.json
drwxr-xr-x  802 root     root         25664 Dec 22 15:43 node_modules
-rw-r--r--    1 root     root        388922 Dec 22 15:43 package-lock.json
-rw-r--r--    1 3434     3434          1736 Dec 22 15:41 package.json
drwxr-xr-x   14 3434     3434           448 Dec 22 15:41 src
-rw-r--r--    1 3434     3434           408 Dec 21 20:24 tsconfig.json
-rw-r--r--    1 3434     3434          2915 Dec 21 20:24 tslint.json
```

Since the initial template has been created, try accessing with a web browser.

I use `ionic serve` to start up as a Web application.

```
/usr/src/app/sample # ionic serve
> ng run app:serve --host=0.0.0.0 --port=8100
[INFO] Waiting for connectivity with ng...

[INFO] Development server running!

       Local: http://localhost:8100
       External: http://172.17.0.3:8100
       DevApp: sample@8100 on ce0bb319ee50

       Use Ctrl+C to quit this process

[INFO] Browser window opened to http://localhost:8100!

[ng]
[ng] Date: 2018-12-22T15:48:59.151Z
[ng] Hash: e031e8bc45e0bc25de7b
[ng] Time: 32941ms
[ng] chunk {62m} 62.js, 62.js.map () 19.3 kB  [rendered]
[ng] chunk {1m140} 140.js, 140.js.map () 3.34 kB  [rendered]
[ng] chunk {common} common.js, common.js.map (common) 20.7 kB  [rendered]
[ng] chunk {home-home-module} home-home-module.js, home-home-module.js.map (home-home-module) 7.32 kB  [rendered]
[ng] chunk {list-list-module} list-list-module.js, list-list-module.js.map (list-list-module) 6.71 kB  [rendered]
[ng] chunk {main} main.js, main.js.map (main) 34.4 kB [initial] [rendered]
[ng] chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 223 kB [initial] [rendered]
[ng] chunk {runtime} runtime.js, runtime.js.map (runtime) 8.88 kB [entry] [rendered]
[ng] chunk {styles} styles.js, styles.js.map (styles) 69.9 kB [initial] [rendered]
[ng] chunk {vendor} vendor.js, vendor.js.map (vendor) 5.16 MB [initial] [rendered]
[INFO] ... and 170 additional chunks
[ng] ℹ ｢wdm｣: Compiled successfully.
```

In the browser

You can check the screen for web browser by accessing.

`Http: // localhost: 8100`

The UI is looks stunning.

![](https://images.viblo.asia/2fc287a0-e087-48e8-8c0b-ec204939524e.png)

You can stop execution with `Ctrl + C`.

# Try to build as iOS File

Next to the Web application, we will build to run as an iOS application.

> Reference: https://ionicframework.com/docs/intro/deploying/#ios-devices

I will execute `ionic cordova build ios --prod` for building.

The build takes about several minutes.

> Although it is not mentioned in this article, it is necessary to install JDK separately in a container for building as Android.
> 
```
/usr/src/app/sample # ionic cordova build ios --prod
> ionic integrations enable cordova
[INFO] Downloading integration cordova
[INFO] Copying integrations files to project
CREATE config.xml
CREATE resources
CREATE resources/README.md
CREATE resources/android
CREATE resources/icon.png
CREATE resources/ios
CREATE resources/splash.png
CREATE resources/ios/icon
CREATE resources/ios/splash
CREATE resources/android/icon
CREATE resources/android/splash
CREATE resources/android/splash/drawable-land-hdpi-screen.png
CREATE resources/android/splash/drawable-land-ldpi-screen.png
CREATE resources/android/splash/drawable-land-mdpi-screen.png
CREATE resources/android/splash/drawable-land-xhdpi-screen.png
CREATE resources/android/splash/drawable-land-xxhdpi-screen.png
CREATE resources/android/splash/drawable-land-xxxhdpi-screen.png
CREATE resources/android/splash/drawable-port-hdpi-screen.png
CREATE resources/android/splash/drawable-port-ldpi-screen.png
CREATE resources/android/splash/drawable-port-mdpi-screen.png
CREATE resources/android/splash/drawable-port-xhdpi-screen.png
CREATE resources/android/splash/drawable-port-xxhdpi-screen.png
CREATE resources/android/splash/drawable-port-xxxhdpi-screen.png
CREATE resources/ios/icon/icon-1024.png
CREATE resources/ios/icon/icon-40.png
CREATE resources/ios/icon/icon-40@2x.png
CREATE resources/ios/icon/icon-40@3x.png
CREATE resources/ios/icon/icon-50.png
CREATE resources/ios/icon/icon-50@2x.png
CREATE resources/ios/icon/icon-60.png
CREATE resources/ios/icon/icon-60@2x.png
CREATE resources/ios/icon/icon-60@3x.png
CREATE resources/ios/icon/icon-72.png
CREATE resources/ios/icon/icon-72@2x.png
CREATE resources/ios/icon/icon-76.png
CREATE resources/ios/icon/icon-76@2x.png
CREATE resources/ios/icon/icon-83.5@2x.png
CREATE resources/ios/icon/icon-small.png
CREATE resources/ios/icon/icon-small@2x.png
CREATE resources/ios/icon/icon-small@3x.png
CREATE resources/ios/icon/icon.png
CREATE resources/ios/icon/icon@2x.png
CREATE resources/android/icon/drawable-hdpi-icon.png
CREATE resources/android/icon/drawable-ldpi-icon.png
CREATE resources/android/icon/drawable-mdpi-icon.png
CREATE resources/android/icon/drawable-xhdpi-icon.png
CREATE resources/android/icon/drawable-xxhdpi-icon.png
CREATE resources/android/icon/drawable-xxxhdpi-icon.png
CREATE resources/ios/splash/Default-568h@2x~iphone.png
CREATE resources/ios/splash/Default-667h.png
CREATE resources/ios/splash/Default-736h.png
CREATE resources/ios/splash/Default-Landscape-736h.png
CREATE resources/ios/splash/Default-Landscape@2x~ipad.png
CREATE resources/ios/splash/Default-Landscape@~ipadpro.png
CREATE resources/ios/splash/Default-Landscape~ipad.png
CREATE resources/ios/splash/Default-Portrait@2x~ipad.png
CREATE resources/ios/splash/Default-Portrait@~ipadpro.png
CREATE resources/ios/splash/Default-Portrait~ipad.png
CREATE resources/ios/splash/Default@2x~iphone.png
CREATE resources/ios/splash/Default@2x~universal~anyany.png
CREATE resources/ios/splash/Default~iphone.png
[OK] Integration cordova added!
✔ Creating ./www directory for you - done!
> cordova platform add ios --save

You have been opted out of telemetry. To change this, run: cordova telemetry on.
Using cordova-fetch for cordova-ios@~4.5.4
Adding ios project...
Creating Cordova project for the iOS platform:
    Path: platforms/ios
    Package: io.ionic.starter
    Name: MyApp
iOS project created with cordova-ios@4.5.5
Discovered plugin "cordova-plugin-whitelist" in config.xml. Adding it to the project
Installing "cordova-plugin-whitelist" for ios
Adding cordova-plugin-whitelist to package.json
Saved plugin info for "cordova-plugin-whitelist" to config.xml
Discovered plugin "cordova-plugin-statusbar" in config.xml. Adding it to the project
Installing "cordova-plugin-statusbar" for ios
Adding cordova-plugin-statusbar to package.json
Saved plugin info for "cordova-plugin-statusbar" to config.xml
Discovered plugin "cordova-plugin-device" in config.xml. Adding it to the project
Installing "cordova-plugin-device" for ios
Adding cordova-plugin-device to package.json
Saved plugin info for "cordova-plugin-device" to config.xml
Discovered plugin "cordova-plugin-splashscreen" in config.xml. Adding it to the project
Installing "cordova-plugin-splashscreen" for ios
Adding cordova-plugin-splashscreen to package.json
Saved plugin info for "cordova-plugin-splashscreen" to config.xml
Discovered plugin "cordova-plugin-ionic-webview" in config.xml. Adding it to the project
Installing "cordova-plugin-ionic-webview" for ios
apple-ios version check failed ("/usr/src/app/sample/platforms/ios/cordova/apple_ios_version"), continuing anyways.
Adding cordova-plugin-ionic-webview to package.json
Saved plugin info for "cordova-plugin-ionic-webview" to config.xml
Discovered plugin "cordova-plugin-ionic-keyboard" in config.xml. Adding it to the project
Installing "cordova-plugin-ionic-keyboard" for ios
Adding cordova-plugin-ionic-keyboard to package.json
Saved plugin info for "cordova-plugin-ionic-keyboard" to config.xml
--save flag or autosave detected
Saving ios@~4.5.5 into config.xml file ...
> ng run app:ionic-cordova-build:production --platform=ios

Date: 2018-12-22T16:06:06.831Z
Hash: 54e28c01e2e09d7332bf
Time: 66747ms
chunk {0} common.3222599edfedfb925af4.js (common) 18.2 kB  [rendered]
chunk {1} 1.c8c1ded9ad400bff2f40.js () 852 bytes  [rendered]
chunk {2} 2.3e1343b6cc1b38b51ba5.js () 3.55 kB  [rendered]
chunk {3} 3.ab2820a7c10e1866ad56.js () 420 bytes  [rendered]
chunk {4} 4.3fe582dd6b503735586e.js () 614 bytes  [rendered]
chunk {5} 5.c7e7b1d75862c558ce95.js () 88.7 kB  [rendered]
chunk {6} 6.1f2a667120b8cb52971e.js () 2.08 kB  [rendered]
chunk {7} runtime.2602b2896a743be6bef0.js (runtime) 6.67 kB [entry] [rendered]
chunk {8} 8.976225d3f88e3657b7b8.js () 1.02 kB  [rendered]
chunk {9} main.7d336394dd829610d50f.js (main) 480 kB [initial] [rendered]
chunk {10} polyfills.ab1cd86f59a83f4aa306.js (polyfills) 37.5 kB [initial] [rendered]
chunk {11} styles.44f08363fed1cf87985f.css (styles) 17.4 kB [initial] [rendered]
chunk {12} 12.26a43363ebaab0a80ddf.js () 5.82 kB  [rendered]
chunk {[1m13} 13.0387b6783362110437a0.js () 2.92 kB  [rendered]
chunk {14} 14.a2d347aded2568c32876.js () 11.2 kB  [rendered]
chunk {15} 15.1bf530e865daa1b58e10.js () 11.9 kB  [rendered]
chunk {16} 16.fe87589276c4a9519d5c.js () 10.9 kB  [rendered]
chunk {17} 17.01603fcc4f8201376f08.js () 11.9 kB  [rendered]
chunk {18} 18.fb638ce47ea988b8102b.js () 4.71 kB  [rendered]
chunk {19} 19.8aeb85194aa2e82ca4f4.js () 5.06 kB  [rendered]
chunk {20} 20.2e09637b99a0ddfed172.js () 6.42 kB  [rendered]
chunk {21} 21.5821ebfffd43ccaa1e99.js () 6.6 kB  [rendered]
chunk {22} 22.ab961ef6ff3e036ec341.js () 3.07 kB  [rendered]
chunk {23} 23.8e86aa17cbb21502515f.js () 3.21 kB  [rendered]
chunk {24} 24.948830ac7f3244390d1e.js () 4.94 kB  [rendered]
chunk {25} 25.bfe0fa66ff69cf349142.js () 5.38 kB  [rendered]
chunk {26} 26.a5f8db4c5ac1f26a5154.js () 11 kB  [rendered]
chunk {27} 27.7149f53864d4dba632c8.js () 11.7 kB 33m [rendered]
chunk {28} 28.944cc86f6145b0d0a9f1.js () 13.6 kB  [rendered]
chunk {29} 29.544c566eb0355c5cd954.js () 14.5 kB  [rendered]
chunk {30} 30.b733274797416300a66e.js () 5.1 kB  [rendered]
chunk {31} 31.7951edef3cf9c48cee8b.js () 5.43 kB  [rendered]
chunk {32} 32.e92b35111e370fb4f935.js () 11.3 kB  [rendered]
chunk {33} 33.268b875b94f5c48fa80d.js () 12.3 kB  [rendered]
chunk {34} 34.1d7e438b624c99964530.js () 12.7 kB  [rendered]
chunk {35} 35.cfaf30e2b7cd269c13de.js () 12.7 kB  [rendered]
chunk {36} 36.822cea1b3999e7b6b7b8.js () 14.1 kB  [rendered]
chunk {37} 37.74d9f53d5708160bb837.js () 15 kB  [rendered]
chunk {38} 38.0cb6bd310a756f384f27.js () 6.22 kB  [rendered]
chunk {39} 39.da17e453729684c20d9a.js () 6.25 kB  [rendered]
chunk {40} 40.cbdafd3712dc7b058bd8.js () 30.5 kB  [rendered]
chunk {41} 41.ade09624eb21343f3fa8.js () 30.6 kB  [rendered]
chunk {42} 42.bfec064a089d6f63b80c.js () 16.3 kB  [rendered]
chunk {43} 43.41795a28a98319a08753.js () 16.3 kB  [rendered]
chunk {44} 44.b3fc25947471a6fb89c9.js () 8.62 kB  [rendered]
chunk {45} 45.9e0edd49768d677e4271.js () 9 kB  [rendered]
chunk {46} 46.ef7361d89e66225e29e7.js () 23.5 kB  [rendered]
chunk {47} 47.e5845de1608cede7ef98.js () 25.4 kB  [rendered]
chunk {48} 48.1a32630d5fac11bb0c5c.js () 2.29 kB  [rendered]
chunk {49} 49.f1e70136e125aae0b7eb.js () 2.36 kB  [rendered]
chunk {50} 50.3cb5e97935abad5a98ef.js () 9.93 kB  [rendered]
chunk {51} 51.f537f7df8c037a8e6740.js () 10.9 kB  [rendered]
chunk {52} 52.1a0a3fbd68a078532f63.js () 7.81 kB  [rendered]
chunk {53} 53.01028fc094c4f813c7c0.js () 8.08 kB  [rendered]
chunk {54} 54.5aed963309c54be82f3c.js () 10.3 kB  [rendered]
chunk {55} 55.bc8ad3734e747594cfc0.js () 10.3 kB  [rendered]
chunk {56} 56.7588723761f263d88351.js () 6.11 kB  [rendered]
chunk {57} 57.ddb3baef2d3714bdd117.js () 6.37 kB  [rendered]
chunk {58} 58.a1aa53874a6e36fe4ce2.js () 2.83 kB  [rendered]
chunk {59} 59.9d5df368958450cdfb04.js () 3.04 kB  [rendered]
chunk {60} 60.de24f0a9e15e75af22c4.js () 10.7 kB  [rendered]
chunk {61} 61.9aa8d649c15fbc277b72.js () 10.7 kB  [rendered]
chunk {62} 62.e33afbb87f448237ad89.js () 11.5 kB  [rendered]
chunk {63} 63.364af1704b1c954ed0a5.js () 11.8 kB  [rendered]
chunk {64} 64.4efb94e0c5d2655bf57c.js () 3.81 kB  [rendered]
chunk {65} 65.daab19151b8760323692.js () 3.81 kB  [rendered]
chunk {66} 66.79b42ebe8ad417e3f4ce.js () 8.96 kB  [rendered]
chunk {67} 67.a8bba61c025b584c1c0d.js () 8.96 kB  [rendered]
chunk {68} 68.b58a05996b563890f735.js () 1.65 kB  [rendered]
chunk {69} 69.2280a8b0333ea7082d4a.js () 1.67 kB  [rendered]
chunk {70} 70.0c397f8d175b0dfb0fd8.js () 12.4 kB  [rendered]
chunk {71} 71.8a1658cccdf878f942ad.js[22m () 13.2 kB  [rendered]
chunk {72} 72.1651a04c1335f31d5125.js () 6.39 kB  [rendered]
chunk {73} 73.fcca3a80b41cb1782e24.js () 6.71 kB  [rendered]
chunk {74} 74.3f4c46f1d56926522f54.js () 5.48 kB  [rendered]
chunk {75} 75.197b566a6a196047cbaa.js () 5.48 kB  [rendered]
chunk {76} 76.69158446a355c60e3ec6.js () 2.69 kB  [rendered]
chunk {77} 77.f0b575ec08db5277af9a.js () 7.5 kB  [rendered]
chunk {78} 78.13dc78b8912db22f98dd.js () 7.67 kB  [rendered]
chunk {79} 79.8ec2e5536e4d57c38d0e.js () 7.23 kB  [rendered]
chunk {80} 80.232cef83875a4d378d36.js () 7.75 kB  [rendered]
chunk {81} 81.b0df22d3e451e6100c3f.js () 17.3 kB  [rendered]
chunk {82} 82.13330b726dc4521af78e.js () 17.3 kB  [rendered]
chunk {83} 83.d3d8828e10ed6e7aa2c7.js () 24.8 kB  [rendered]
chunk {84} 84.1f7e5f627dba4f9626c6.js () 26.9 kB  [rendered]
chunk {85} 85.3d7e01bd37daf79f6b8c.js () 835 bytes  [rendered]
chunk {m86} 86.7cebd80378f29b126049.js () 842 bytes  [rendered]
chunk {87} 87.a64dfe2d48cf15c84a35.js () 8.55 kB  [rendered]
chunk {88} 88.9520bf1933fd18a3f68f.js () 8.9 kB  [rendered]
chunk {89} 89.6395004f189fa9ee5ac6.js () 6.13 kB  [rendered]
chunk {90} 90.c3d9b2900421c646be97.js () 6.16 kB  [rendered]
chunk {91} 91.408abd3447532f3bb0c7.js () 2.29 kB  [rendered]
chunk {92} 92.e5d161ee10f7c8ade848.js () 2.35 kB  [rendered]
chunk {93} 93.ae5bff6420e773cdc5b1.js () 10.8 kB  [rendered]
chunk {94} 94.253f8721e32e2aeffd41.js () 11.4 kB  [rendered]
chunk {95} 95.5a1dc9962033be7217f0.js () 10.1 kB  [rendered]
chunk {96} 96.48afe835040c631c93e7.js () 10.1 kB  [rendered]
chunk {97} 97.72bd8ce489ec35270352.js () 919 bytes  [rendered]
chunk {98} 98.e7898375f70a64f34366.js () 14.2 kB  [rendered]
chunk {99} 99.f5e6ca1139da4c646eac.js () 14.2 kB  [rendered]
chunk {100} 100.c0c1638eda3210aa0f8a.js () 6.15 kB [33m [rendered]
chunk {101} 101.81d4ecff2f1560d68c6b.js () 6.18 kB  [rendered]
chunk {102} 102.f935c4cd3a783dbec0ae.js () 6.37 kB  [rendered]
chunk {103} 103.919e4a482b946f1593f0.js () 6.42 kB  [rendered]
chunk {104} 104.bd4d3e49c4112fa156f5.js () 7.27 kB  [rendered]
chunk {105} 105.0284910f505a248f51bc.js () 7.27 kB  [rendered]
chunk {106} 106.6e890b0617a13dc745b1.js () 6.42 kB  [rendered]
chunk {107} 107.029e4a6169c70628011d.js () 6.59 kB  [rendered]
chunk {108} 108.03ebc48e77f7528df2f8.js () 21.1 kB  [rendered]
chunk {109} 109.2423f8d80b4c53be469c.js () 21.6 kB  [rendered]
chunk {110} 110.a241fe5dbc5f55515063.js () 17.4 kB  [rendered]
chunk {111} 111.233a15df8c5af205320e.js () 17.9 kB  [rendered]
chunk {112} 112.72c9106f62705e2af25a.js () 6.22 kB  [rendered]
chunk {113} 113.e537f8ab5c009025b4ba.js () 6.25 kB  [rendered]
chunk {114} 114.c4a2309d22b8ca005ffd.js () 9.64 kB  [rendered]
chunk {1m115} 115.cbd0a1a53b8fb1ccfec2.js () 10.8 kB  [rendered]
chunk {116} 116.684547bba0a3f4cc408d.js () 30.4 kB  [rendered]
chunk {117} 117.aecf8c803e154ded28d3.js () 30.4 kB  [rendered]
chunk {118} 118.515785723dddf636725e.js () 12.3 kB  [rendered]
chunk {119} 119.7f9c7ee9d01d18f17d64.js () 12.5 kB  [rendered]
chunk {120} 120.07959e6b27f49d74a87c.js () 11.3 kB  [rendered]
chunk {121} 121.b997f5665fd736c48a19.js () 11.3 kB  [rendered]
chunk {122} 122.c3873e487a8e1587aef2.js () 30.4 kB  [rendered]
chunk {123} 123.bca4d5e93bdab7d759ff.js () 30.4 kB  [rendered]
chunk {124} 124.3cd765c9b1aac292605c.js () 7.76 kB  [rendered]
chunk {125} 125.75c4e95d1143a361ae63.js () 7.76 kB  [rendered]
chunk {126} 126.3c1e613c9d3fee3f65d9.js () 11.4 kB  [rendered]
chunk {127} 127.a392c5e1a24b6536d58d.js () 11.6 kB  [rendered]
chunk {128} 128.12c22f698211bf6cb9cb.js () 9.93 kB  [rendered]
chunk {129} 129.5afcc9d8968e93dd927f.js () 10.8 kB  [rendered]
chunk {130} 130.10a429738f5b5a76a7d2.js () 7.99 kB  [rendered]
chunk {131} 131.0b35351b495a144b85e7.js () 7.99 kB  [rendered]
chunk {132} 132.5d889a523400419e529a.js () 2.83 kB  [rendered]
chunk {133} 133.db6226b212201d60e7ac.js () 3.06 kB  [rendered]
chunk {134} 134.9dcd1b14943c3e8ec188.js () 12.3 kB  [rendered]
chunk {135} 135.f64488092dc63ff01da5.js () 12.5 kB  [rendered]
chunk {136} 136.cdd1bceb556f80650917.js () 9.49 kB  [rendered]
chunk {137} 137.ed3cfb21e77629fde73b.js () 9.49 kB  [rendered]
chunk {138} 138.eaa4e965f26a6dee8440.js () 3.6 kB  [rendered]
chunk {139} 139.53410d816fd596f26293.js () 3.68 kB  [rendered]
chunk {140} 140.2be372b03a00fc6d9ec9.js () 3.81 kB  [rendered]
chunk {141} 141.a388869052e0f5d7b4b1.js () 3.81 kB  [rendered]
chunk {142} 142.f3e4d3c1b77f69a74288.js () 21.1 kB  [rendered]
chunk {143} 143.b6ec9cc6e23eb3c7723d.js () 21.6 kB  [rendered]
chunk {144} 144.d5574e0615dc2ddbe865.js () 30.7 kB  [rendered]
chunk {145} 145.49275dcc8759f9e6207f.js () 30.8 kB  [rendered]
chunk {146} 146.0c7c10effc3d7ad6d25f.js () 7.75 kB  [rendered]
chunk {147} 147.5050925f0f1aa4a18159.js () 7.75 kB  [rendered]
chunk {148} 148.4034f935607ce0acdb69.js () 17.6 kB  [rendered]
chunk {149} 149.157667da142e81349ba9.js () 17.6 kB  [rendered]
chunk {150} 150.195c75e5aa7cdb94be5d.js () 3.02 kB  [rendered]
chunk {151} 151.b8a25a2fc572528b3dfa.js () 3.16 kB  [rendered]
chunk {152} 152.f56c4f44f0cdd245ed01.js () 6.98 kB  [rendered]
chunk {153} 153.16bf83e5ff84a77a1f50.js () 7.32 kB  [rendered]
chunk {154} 154.a4acff7041e4147536c0.js () 9.58 kB  [rendered]
chunk {155} 155.7ef26d81fa1aefe47a65.js () 10.7 kB  [rendered]
chunk {156} 156.79c765c375e99f7574a8.js () 8.04 kB  [rendered]
chunk {157} 157.fe1eae6284c16bbbefe6.js () 8.04 kB  [rendered]
chunk {158} 1m158.bbda5715ceb35c01c578.js () 12.5 kB  [rendered]
chunk {159} 159.8688446d66a8e265bda8.js () 12.5 kB  [rendered]
chunk {160} 160.74c13630705fce3643a3.js () 6.43 kB  [rendered]
chunk {161} 161.215bea75836bb4d9fbf9.js () 6.72 kB  [rendered]
chunk {162} 162.580260ef63f5a6ea8a28.js () 5.83 kB  [rendered]
chunk {163} 163.42b3efc960cf0739e960.js () 5.98 kB  [rendered]
chunk {164} 164.2f8c88ca7dcd01ca21a4.js () 18.3 kB  [rendered]
chunk {165} 165.6c897ef712714060fdb0.js () 18.8 kB  [rendered]
chunk {166} 166.970fcc6304038712d38b.js () 6.13 kB  [rendered]
chunk {167} 167.a90eb8ddcc73775c61ef.js () 6.39 kB  [rendered]
chunk {168} 168.011549e65a06ab69bcb1.js () 5.49 kB  [rendered]
chunk {169} 169.0978854dab5f8ab0eac7.js () 5.49 kB  [rendered]
chunk {170} 170.dcfba844cd5f2f8e03b4.js () 7.49 kB  [rendered]
chunk {171} 171.8a5077417e1f1ba0f5b1.js () 7.49 kB  [rendered]
chunk {172} 172.42092137cbf82bb68ed9.js () 2.33 kB  [rendered]
chunk {173} 173.bc7c83e3d1779e9f0b37.js () 9.67 kB  [rendered]
chunk {174} 174.17a71eb8bf5a968bb8c7.js () 13.6 kB  [rendered]
chunk {175} 175.f77c1368c2d565689bad.js () 7.2 kB  [rendered]
chunk {176} 176.21c94af83619202a1104.js () 999 bytes  [rendered]
chunk {177} 177.ac20e14f5e25210f2031.js () 708 bytes  [rendered]
chunk {178} 178.42b62f5025a2562d0262.js () 4.17 kB  [rendered]
chunk {cordova} cordova.17fb1a7c009cbc8d5d42.js (cordova) 22.8 kB  [rendered]
> cordova build ios

You have been opted out of telemetry. To change this, run: cordova telemetry on.
CordovaError: Promise rejected with non-error: 'xcodebuild was not found. Please install version 7.0.0 or greater from App Store'
    at cli.catch.err (/usr/local/lib/node_modules/cordova/bin/cordova:30:15)
    at process._tickCallback (internal/process/next_tick.js:68:7)
[ERROR] An error occurred while running subprocess cordova.

        cordova build ios exited with exit code 1.

        Re-running this command with the --verbose flag may provide more information.
```      

Finally an error `[ERROR] An error occurred while running subprocess cordova.`
has occurred, but this happens because there is no Xcode in the container.

Since the iOS executable file itself is completed, there is no problem.

Executable files are created under `platforms / ios`.

```
/usr/src/app/sample #cd platforms/ios/
/usr/src/app/sample/platforms/ios # ls -l
total 20
drwxr-xr-x    7 root     root           224 Dec 22 16:00 CordovaLib
drwxr-xr-x   14 root     root           448 Dec 22 16:00 MyApp
drwxr-xr-x    3 root     root            96 Dec 22 16:00 MyApp.xcodeproj
drwxr-xr-x    4 root     root           128 Dec 22 16:00 MyApp.xcworkspace
drwxr-xr-x   26 root     root           832 Dec 22 16:00 cordova
-rw-r--r--    1 root     root            48 Dec 22 16:04 frameworks.json
-rw-r--r--    1 root     root          4282 Dec 22 16:06 ios.json
drwxr-xr-x    7 root     root           224 Dec 22 16:03 platform_www
-rw-r--r--    1 root     root           860 Dec 22 16:00 pods-debug.xcconfig
-rw-r--r--    1 root     root           859 Dec 22 16:00 pods-release.xcconfig
drwxr-xr-x  886 root     root         28352 Dec 22 16:06 www
```
Click MyApp.xcodeproj to start Xcode.

![](https://images.viblo.asia/a06a50f5-2a26-40c7-8890-7c2f43c26d2c.png)

Originally I will set Team's information, but I will skip this time and try to run the application with an emulator.

Press the "▶ ︎" execution mark on the upper left to start up the emulator.

This time I tried to make the emulator as iPhone 7.

![](https://images.viblo.asia/40865020-84a7-4767-978f-5a01153ac3a0.png)

It will take some time to start up the emulator ...

![](https://images.viblo.asia/d98444da-1370-4bba-97a9-dea37afd37ed.png)

![](https://images.viblo.asia/f574dd2b-0e9b-456a-9f1d-071d1ced2ecf.png)

I was able to make the app starts for the first time without any knowledge of  Swift's grammar

I think that using Ionic can still make a stylish native app.

Thank you for your time, hope you can also learn something new with this post.
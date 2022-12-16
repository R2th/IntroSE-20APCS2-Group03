In any kind of project I think most people would agree with me when I say that sometimes setting up the environment is tougher than the actual development itself. React Native development is is not an exception in this reality and I am here to help you quickly set it up to save quality time. 

This article will be like your “cheat sheet” for React Native environment setup and will be divided into two parts, iOS and Android. It’s good to note that this guide will only cover MacOS to keep the scope small for fast.
<br><br><br>
**iOS React Native Environment Setup**

1. You will need to install [Node](https://nodejs.org/en/), [Watchman](https://facebook.github.io/watchman/), and other dependencies using [Homebrew](https://en.wikipedia.org/wiki/Homebrew_(package_management_software)) as recommended in the [documentation](https://facebook.github.io/react-native/docs/0.59/getting-started). The only thing you need to know about these dependencies is that they will improve your projects performance and provide you with the necessary tools you will need in development.
    ```
    brew install node
    brew install watchm
    brew tap AdoptOpenJDK/openjdk
    brew cask install adoptopenjdk8an
    ```

2. Node will provide you [npm](https://www.npmjs.com/) which you can use to install the [React Native CLI](https://www.npmjs.com/package/react-native-cli).
     ```
    npm install -g react-native-cli
    ```

3. Open up [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12) and install the latest version of [Xcode](https://developer.apple.com/xcode/). This tool will give you the simulators you need and tools for building an iOS App.

4. Open Xcode, choose "Preferences" under the "Xcode" dialog at the upper left corner of your screen, and go to the "Locations" panel to install the latest tools under "Command Line Tools" dropdown.

5. Initialize your own project by running the command below.
     ```
    react-native init ProjectName
    ```

6. You can run your project on the simulator by going inside your project directory and running the `run-ios` command.
     ```
    cd ProjectName
    react-native run-ios
    ```
    
<br><br>
It only took us six steps to prepare the environment for React Native iOS. It’s quite simple and doesn’t have to be complicated. Android Setup is an exception because it gets quite tedious if you’re a complete beginner. It’s easier to follow through a [video tutorial](https://youtu.be/x-ij3Sdc2Mk) for this part but feel free to continue reading if you’re up for it. 
<br><br><br>
**Android React Native Environment Setup**

1. Similar to the iOS setup, you will also need to install [Node](https://nodejs.org/en/), [Watchman](https://facebook.github.io/watchman/), and other dependencies using [Homebrew](https://en.wikipedia.org/wiki/Homebrew_(package_management_software)) as recommended in the [documentation](https://facebook.github.io/react-native/docs/0.59/getting-started).
    ```
    brew install node
    brew install watchm
    brew tap AdoptOpenJDK/openjdk
    brew cask install adoptopenjdk8an
    ```
    
2. Node will provide you [npm](https://www.npmjs.com/) which you can use to install the [React Native CLI](https://www.npmjs.com/package/react-native-cli).
     ```
    npm install -g react-native-cli
    ```
    
3. Install [Android Studio](https://developer.android.com/studio) and select the “Custom” setup for your installation type. There will also be a few checkboxes you want to make sure are checked before proceeding to the installation:
    * Android SDK
    * Android SDK Platform
    * Performance (Intel ® HAXM) (See here for AMD)
    * Android Virtual Device

4. Installing the [Android 9 (Pie)](https://developer.android.com/about/versions/pie) SDK is required for building a react native app with native code so follow though the bullets below for this setup:	
    * Start up Android Studio 
    * Click on “Preferences” under the Android Studio dialog at the upper left corner of the screen
    * Go to Appearance & Behavior → System Settings → Android SDK (Refer to this forum if the Android SDK option is missing)
    * Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner.
    * Look for and expand the Android 9 (Pie) entry, then make sure “Android SDK Platform 28” and “Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image” is checked
    * Select the "SDK Tools" tab and check the box next to "Show Package Details”. Expand the "Android SDK Build-Tools" entry and make sure that 28.0.3 is selected.
    * Click "Apply" to download and install the Android SDK and related build tools.
 
5. Add the following lines below inside your `$HOME/.bash_profile` or `$HOME/.bashrc` config file:
    ```
    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/emulator
    export PATH=$PATH:$ANDROID_HOME/tools
    export PATH=$PATH:$ANDROID_HOME/tools/bin
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    ```
    
6. Type `source $HOME/.bash_profile` to load the config into your current shell and verify that ANDROID_HOME has been added to your path by running `echo $PATH`.

7. Initialize your own project by running the command below.
     ```
    react-native init ProjectName
    ```
    
8. Open the Android folder inside your project directory with Android Studio and select a simulator under Tools → AVD Manager.

9. When the simulator is up and ready, run the commands below.
     ```
    cd ProjectName
    react-native run-android
    ```
<br><br>
Following this article on Viblo for setting up your React Native environment depends entirely on your convenience. I’d say that it’s always a good idea to follow through with the steps inside React Native's official [documentation ](https://facebook.github.io/react-native/docs/0.59/getting-started)as well since it’s always up to date. But I’ll try to update this article and making it easier to understand from time to time. 

Feel free to add suggestions in the comments and let’s try to make React Native development seamless for everyone for the betterment of the community.
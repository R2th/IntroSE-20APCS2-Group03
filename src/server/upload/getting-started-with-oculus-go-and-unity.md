## Introduction:
This article will provide you with the step by step process on how you can set up your Unity to develop applications for Oculus Go. Note that in the future some things may change from the time that this was posted but rest assured 80% of these steps are the same.
## Assumptions:
- You already own a license for Unity.
- You already have Unity installed.
- You have familiarized the IDE of Unity.
## Getting Started:
If you have already worked with Android applications before and have already setup the necessary environment for Android development, go ahead and skip this step. But for those who haven’t, to get started, you will need to install Unity’s Android module because Oculus Go is running on an Android operating system (Android 7) and so you will need to set Unity up for Android development.  To do so, you will need to complete the following steps:
## Step 1: Setting up Android development in Unity
### Android Build Support (SDK and NDK):
1. Open your Unity Hub application.
2. Go to `Installs` section and you will see all your installed Unity versions.
3. Click the three dots of a version you want and click `Add Modules`.
4. A window will pop up and make sure to check `Android build Support` and `Android SDK & NDK Tools`.
5. Click `Next` and your installation will begin.

![](https://images.viblo.asia/9fa063fe-624a-4786-8008-d96a893b96f0.PNG)

Once the download and installation is finished, go ahead and create a 3D project with Unity. Now that you have downloaded the Android SDK and NDK tools. You will have to install the Android module for Unity so that you can set Unity to build your project as an Android application.

### Android Module:
1. Go to `File > Build Settings` and a window will appear.
2. Scroll and locate `Android` then click `Open download page`. Once clicked, you will be redirected to your default browser and a file will be downloaded on your desktop.

![](https://images.viblo.asia/84fdce9d-c109-4a7d-9cd1-30a90eb06a65.PNG)

3. Now install that file. Note that you may need to close any Unity related applications for the installation to succeed.
4. Once done, reopen your Unity project and visit `File > Build Settings` again and you will notice that the Android section is now different.
5. Click on the `Switch platform` button to change your build settings to Android application.

![](https://images.viblo.asia/f9ed3e64-28d4-4a1e-8e19-2fa76902fce8.PNG)

Now you have successfully downloaded the Android module for Unity. Unity is now ready to build your Android projects but your project is not yet ready to be built as an Android application. Notice, when you click the `Build` button you will come across a problem like this:

![](https://images.viblo.asia/46d90b2a-1dcb-47ee-af8b-083f183c2045.PNG)

This error states that you haven’t set you application package yet and to fix such issue, you have to configure your project's player settings for Android.

### Android Player Settings:
1. Click `Player settings` (This can be found in `File > Build Settings`) and a window will appear.
2. In that window, fill in the following:

    a. `Company Name`. "Note: This can be anything so long as it is unique."
    
    b. `Product Name`. The name of your application.
3. Below that, in the Android tab, click `Other settings` and fill in the following:

   a. `Package Name`. "Note: The format for this is `com.CompanyName.ProductName`."

Save your application and you are now ready for Android development. But we aren’t interested in just Android development, we want to be able to create an application for Oculus Go. Your next step now is to setup your project to build for Oculus Go devices.

## Step 2: Setting up Unity project for Oculus Go development.
### Oculus Package:
1. Go to `Window > Package Manager` and a window will pop-up.
2. Click `Oculus(Android)`.
3. Click `Install`.
4. Click `Oculus(Desktop)`.
5. Click `Install`.

![](https://images.viblo.asia/8bc1207c-24f9-46d4-9489-83cb5d9ee936.PNG)

Once the installation is done, this package will automatically be added in your packages folder. Now you have to import the Oculus Integration asset from the asset store. This asset contains `Oculus VR Utilities` which you will need to create VR applications for Oculus.

### Oculus VR Utilities:
1. In Unity, you will find an` Asset store` tab. Click it.
2. In the search bar, Search for `"Oculus Integration"`. There should only be one that has an Oculus logo in it.

![](https://images.viblo.asia/5b1e1e6a-dd73-4164-8e17-4ca95fa8ae1a.PNG)

3. Click `Download`.
4. Once the download is finished, Click `Import`.
 
 ![](https://images.viblo.asia/b3ce3ebd-427c-465b-ba0a-af0ce786bc00.PNG)
 
5. A window will pop-up. Make sure VR is checked. Click `Import`.

![](https://images.viblo.asia/5b776abe-5e8e-4557-9f00-313ca3d06a7d.PNG)

Once the import is done, you will notice in your project a folder `Oculus`. This folder contains the OVR assets you imported form the Oculus integration asset package. Now you have to setup your `Player settings` for Oculus build.

### Oculus Player Settings:
1. Go to `File > Build Settings`.
2. Click `Player settings`.
3. `Other Settings`:
    
    a. Remove `Vulkan` in `Grapics API’s`.
    
    b. Set `Minimum level API` to `21`.

    c. Set `Scripting Backend` to `IL2CPP`.
4. `XR Settings`:
    
    a. Check `Virtual Reality Supported`.

    b. Add `Oculus` in `Virtual Reality SKDs`.

Done! You have now completed setting up Unity for VR development. Now we have to setup Oculus Go for development. Just like any other Android devices, you must turn on `Developer mode` in your Oculus device.

### Oculus Developer mode:
1. Download the mobile application Oculus.
2. Open Oculus app.
3. Login your credentials.
4. Go to `Settings`.
5. Click `Pair New Headset`.
 
![](https://images.viblo.asia/1bf80829-12e8-40d3-8301-5a175eb8f11d.jpg)
 
6. Select your device (In our case, Oculus Go).
7. Follow the instructions provided.
8. Once paired, go back to `Settings`.
9. Click on your Oculus device.
10. Click `More settings`.
 
![](https://images.viblo.asia/3f68f2b4-075b-424d-80b3-2f0c7573057d.jpg)
 
11. Click `Developer mode`.
 
![](https://images.viblo.asia/a802b767-7f4c-400f-9723-628a33ce732a.jpg)
 
12. Toggle `Developer mode` to `On`.

![](https://images.viblo.asia/2ac48008-510d-44ee-9fce-9312045a238e.jpg)

And done! Your Oculus device is now in developer mode and you can now build applications to your Oculus Go device. Now, to test that everything is working why don’t we build an application to your Oculus device. Go back to the Unity project we just setup and follow the next step.

## Step 3: Building an Oculus application.
### Making the application:
1. In your project hierarchy make a scene. `Right click > Create > Scene`. Let’s name it `MainScene`.
2. In the scene hierarchy, remove the `Main Camera`.
3. Create a plane. `Game Object > 3D Object > Plane`.
4. Set the plane position to `x: 0 y: 0 z: 0`.
5. In your project hierarchy, go to `Oculus > VR > Prefabs`.
6. Drag `OVRPlayerContoller` to your scene hierarchy.
7. Set the `OVRPlayerContoller` position to `x: 0 y: 1 z: 0`.

![](https://images.viblo.asia/e196ee31-e836-4c1e-863d-585f9607afa4.PNG)

This should be enough for now but if you want to add more to the environment please feel free to do so. When you're done, it’s time to build your application to your Oculus device.

### Building the application:
1. Plug in your Oculus device to your desktop via a USB to micro USB cord.
2. Your Oculus device will be prompt for permission to access your Oculus device. Click `Allow`.
3. In Unity, go to `File > Build Settings`.
4. Click `Add Open Scenes`.
5. Click `Build and Run`.
6. Save your `.apk` file anywhere you like. I prefer to create a `build` folder in my project.
7. Wait until Unity builds your application.
8. Once the build is done. Your application will automatically be opened in you Oculus device.

> Note: You can also access your application installed in Oculus Go through `Library > Unknown Sources`.


-----


**Congratulations, you have now made you first Oculus Go application with Unity! Now go and make great games!**
![](https://images.viblo.asia/78b88386-3586-4242-b154-d7f2bb6c8e09.jpg)
### **Development OS: WINDOW**

## **I. Chuẩn bị:**
![](https://images.viblo.asia/52e155ae-0c3e-4881-a6f1-1af9b52fff10.jpg)

**1. Cài đặt JDK tại:**
http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html

**2. Cài đặt NodeJS tại:** 
https://nodejs.org/en/#download

**3. Open command line và gõ cmd:**
<npm install -g react-native-cli> để install React Native 
    
**4. Cài đặt bộ Android Studio tại:**
 https://developer.android.com/studio/
 
**5. Sau khi cài Android Studio thì tiến hành chọn:**
 Files -> Settings > Di chuyển đến Appearance and Behavior -> System Settings -> Android SDK để cài platform mới nhất của Android.
 
**6. Tiến hành Add Environment Variables bằng cách:**

Right Click on My Computer > Goto Properties > Click on Advanced System Settings > Click on Environment Variables>Dưới hộp thoại System Variables click on New > Setting Variable Name là:ANDROID_HOME và Variable value là:{link tới folder SDK Manager}  
 
**7. Tạo React Native project :**
   - Xin dev folder lưu trữ source React Native của dự án > Copy để ở local
   - Mở cmd từ folder React Native của dự án
   - Tiếp tục command <react-native init FirstProject> > Enter 
   ![](https://images.viblo.asia/af09d8b5-56f9-494d-914d-d9b99c091a37.png)
    - Thư viện của React Native đang được install (Lúc này phải đảm bảo wifi của bạn hoạt động tốt)
    
   
  ![](https://images.viblo.asia/44e73bad-6001-42dc-8f32-f2aa022575c6.png)

## II. Các bước để thực hiện build source để test:
![](https://images.viblo.asia/1947a9db-1f22-4094-8cc8-7e2694d73663.jpg)

**1. Enable Debugging over USB**
- Enable chế độ debug của thiết bị
- Cách bật chế dộ debug: 
https://www.greenbot.com/article/2457986/android/how-to-enable-developer-options-on-your-android-phone-or-tablet.html

**2. Kết nối device với laptop thông qua dây USB**

- Kết nối device với laptop
- Select device mà bạn muốn build app

**3. Run your app**

- Thực hiện gõ các cmd dưới để thực hiện build
```

E:\>cd reactnativeprojects

E:\ReactNativeProjects>cd firstproject

E:\ReactNativeProjects\FirstProject>react-native run-android

```

- Nếu build THÀNH CÔNG bạn sẽ nhìn thấy nội dung như dưới:

```
E:\ReactNativeProjects\FirstProject>react-native run-android
Scanning 555 folders for symlinks in E:\ReactNativeProjects\FirstProject\node_mo
dules (134ms)
Starting JS server...
Building and installing the app on the device (cd android && gradlew.bat install
Debug)...
Download https://jcenter.bintray.com/com/facebook/react/react-native/0.42.3-atla
ssian-1/react-native-0.42.3-atlassian-1.pom
Incremental java compilation is an incubating feature.
:app:preBuild UP-TO-DATE
:app:preDebugBuild UP-TO-DATE
:app:checkDebugManifest
:app:preReleaseBuild UP-TO-DATE
:app:prepareComAndroidSupportAppcompatV72301Library
:app:prepareComAndroidSupportSupportV42301Library
:app:prepareComFacebookFbuiTextlayoutbuilderTextlayoutbuilder100Library
:app:prepareComFacebookFrescoDrawee101Library
:app:prepareComFacebookFrescoFbcore101Library
:app:prepareComFacebookFrescoFresco101Library
:app:prepareComFacebookFrescoImagepipeline101Library
:app:prepareComFacebookFrescoImagepipelineBase101Library
:app:prepareComFacebookFrescoImagepipelineOkhttp3101Library
:app:prepareComFacebookReactReactNative0442Library
:app:prepareComFacebookSoloaderSoloader010Library
:app:prepareOrgWebkitAndroidJscR174650Library
:app:prepareDebugDependencies
:app:compileDebugAidl
:app:compileDebugRenderscript
:app:generateDebugBuildConfig
:app:mergeDebugShaders
:app:compileDebugShaders
:app:generateDebugAssets
:app:mergeDebugAssets
:app:generateDebugResValues
:app:generateDebugResources
:app:mergeDebugResources
:app:bundleDebugJsAndAssets SKIPPED
:app:processDebugManifest
:app:processDebugResources
:app:generateDebugSources
:app:incrementalDebugJavaCompilationSafeguard
:app:compileDebugJavaWithJavac
:app:compileDebugJavaWithJavac - is not incremental (e.g. outputs have changed,
no previous execution, etc.).
:app:compileDebugNdk UP-TO-DATE
:app:compileDebugSources
:app:transformClassesWithDexForDebug
Running dex in-process requires build tools 23.0.2.
For faster builds update this project to use the latest build tools.
:app:mergeDebugJniLibFolders
:app:transformNative_libsWithMergeJniLibsForDebug
:app:processDebugJavaRes UP-TO-DATE
:app:transformResourcesWithMergeJavaResForDebug
:app:validateSigningDebug
:app:packageDebug
:app:assembleDebug
:app:installDebug
Installing APK 'app-debug.apk' on 'Marshmallow(AVD) - 6.0' for app:debug
Installed on 1 device.

<strong>BUILD SUCCESSFUL</strong>

Total time: 4 mins 53.489 secs
'adb' is not recognized as an internal or external command,
operable program or batch file.
Starting the app (E:\AndroidAppDevelopment\SDKManagerForAndroidStudio/platform-t
ools/adb shell am start -n com.firstproject/.MainActivity...
Starting: Intent { cmp=com.firstproject/.MainActivity }

```

CUỐI CÙNG, CHECK TRÊN DEVICE ANDROID CỦA BẠN SẼ THẤY APP ĐƯỢC MỞ.

## III. Trải nghiệm app

![](https://images.viblo.asia/7a86ed3b-c262-4d89-9a1e-953a75ca3929.gif)

## IV. Reference:
1. https://facebook.github.io/react-native/docs/signed-apk-android
2. https://facebook.github.io/react-native/docs/running-on-device
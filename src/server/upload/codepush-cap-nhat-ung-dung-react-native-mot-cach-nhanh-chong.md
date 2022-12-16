CodePush ra đời chủ yếu để giúp chúng ta có thể cập nhật ứng dụng đến người dùng nhanh chóng mà không cần phải release bản .ipa hay .apk rồi đưa lại lên app store/google play rất mất thời gian đúng không quý vị!. Các bài giới thiệu về CodePush cũng có nhiều rồi, ở bài này mình chỉ giới thiệu cách cài đặt và sử dụng CodePush (trên IOS) cơ bản nhất nha. :grinning:

**1. Init project**
```
 $react-native init <project-name> --version X.XX.X
```
I used react-native version 0.59.8 

**2. Sign up account in CodePush**
https://appcenter.ms

**3. Install code-push cli and add application in code-push** 
```
  $ npm install -g code-push-cli
  $ code-push login 
  $ code-push app add <project-name> ios react-native
```
**4. Install code-push SDK in app**

   ***4.1 Add SDK to the project***
   
   ```
   $ npm install appcenter appcenter-analytics appcenter-crashes --save-exact
   ```
   
   ***4.2 Link the SDK***

   ```
   $ react-native link
   ```
   or 
   ```
   $ react-native link react-native-code-push
   ```
*     To see deployment key:
   ```
   $ code-push deployment ls  -k
   ```
   ![](https://images.viblo.asia/554d7bcd-8124-4e04-8320-bef829f75433.png)
    ***4.3 Edit app secret*** 
*     IOS: 
    Add `CodePushDeploymentKey` into `Info.plist`
    ```
    <key>CodePushDeploymentKey</key>
    <string>IVMKw2wW6RUp2g28Pv-hOv9z4wLZ2eef8a81-xxxx-xxxx-xxxx-xxxxxxxxxxxx</string>
    ```
    Edit ios/{YourAppName}/AppCenter-Config.plist and replace YOUR_APP_SECRET placeholder value with your application secret.
    ```
    <key>AppSecret</key>
    <string>2ea4e686-xxxx-xxxx-xxxx-xxxxxxxxxxxx</string>
    ```
*     Android:
    Edit android/app/src/main/assets/appcenter-config.json; then add object:
    
   ```{"app_secret": "2ea4e686-xxxx-xxxx-xxxx-xxxxxxxxxxxx"}```

   ***4.4 Wrap root component with CodePush***

    ```
    import codePush from "react-native-code-push";
    class App extends Component {
                componentWillMount() {
                    codePush.sync({
                    updateDialog: true,
                    installMode: codePush.InstallMode.IMMEDIATE
                });
            }
            …
    }
    export default codePush(App)
    ```
**NOTE (important): Linking the iOS SDK requires CocoaPods:** Access this link bellow to see updating:
https://docs.microsoft.com/en-us/appcenter/sdk/getting-started/react-native#4-troubleshooting
* Prerequisites:
    - React native version 0.34 or later.
    - Android version 4.1, API level 16 or later, IOS version 9.0 or later.
    - You are not using any other library that provides Crash Reporting functionality on iOS.
    - Install ***[CocoaPods](https://guides.cocoapods.org/using/getting-started.html)*** (the default way to use the SDK in ios)
* Create your app to app-center portal.
* Add the app-center SDK module.
* Link SDK automatically.

    ***4.5 Change some thing in code***
    
    `<Text style={styles.welcome}>Hello everyone!</Text>`

**5. Deployment and release**    
* Deployment: 
   ```
   $ code-push deployment add <appName> <deploymentName>
   ```
    If you use this command line: 
    ```
    $ code-push deployment add <appName> --default
    ```
    Two brand "Staging" and "Production" will be added automatically.
    ![](https://images.viblo.asia/49d2e9e2-2791-42be-a805-6bc6ea0f1228.png)
    ![](https://images.viblo.asia/766ebeb6-a09c-46d2-acdd-7ab6531f2bff.png)
    
    Now I create “Deployment02” brand to deploy
    ![](https://images.viblo.asia/69132b8e-2420-4a4a-b085-57c7ef28053a.png)
* Let’s release (sắp xong rồi nè):
    ```
    $ code-push release <appName> <updateContents> <targetBinaryVersion> [--deploymentName <deploymentName>] [--description <description>] [--disabled <disabled>] [-mandatory] --rollout <rolloutPercentage>]
    ```
    ![](https://images.viblo.asia/e935587f-dbee-46c6-858d-9478a5553202.png)
**7. Update -> deployment -> release -> see result on device**
    ![](https://images.viblo.asia/695feb7a-bb55-4cc6-b732-bb1ede0af68f.png)
    ![](https://images.viblo.asia/888586ea-ac71-4e3e-85c0-6d76486ad522.png)
    ![](https://images.viblo.asia/88ed6da0-ccfd-4c95-be35-8a82e6223e3b.png)
    
   If there is any update from CodePush configuration in the future, please follow this page  https://docs.microsoft.com/en-us/appcenter/distribution/codepush/
   
   Cảm ơn ace đã đọc bài này nha! Thanks all <3 
    
**8. References**
* https://medium.com/spritle-software/react-native-codepush-b86f0ea8432c
* https://codeburst.io/react-native-updates-with-vs-app-center-codepush-3d56ef07f1c4
* https://medium.com/@rajanmaharjan/get-started-with-wonderful-technology-d838aafdc2d3
Live reload và hot reload đã khiến **React Native** trở nên tuyệt vời và thú vị. Tuy nhiên sẽ thế nào nếu như ta có thể cập nhật trực tiếp khi mà ứng dụng đã chạy production (đã lên store). Giả sử bạn muốn cập nhật ứng dụng của mình mà không muốn phát hành một bản cập nhật trên App store (do quá trình phê duyệt mất thời gian) thì giải pháp đó là sử dụng **CodePush**. **CodePush** trước đây là dịch vụ độc lập, nhưng hiện tại đã chuyển sang App Center. App Center cung cấp các giải pháp phát triển của một vòng đời các ứng dụng trên các nền tảng iOS, Android, Windows và MacOS. Về cơ bản, nó là một dịch vụ đám mây cho phép các developer React Native và Cordova deploy các bản cập nhật ứng dụng dành cho thiết bị di động trực tiếp trên thiết bị của người dùng.

Trong phần này chúng ta sẽ tích hợp **CodePush** và **AppCenter** vào một ứng dụng Android. Đối với iOS vui lòng đợi phần sau.

*Lưu ý: Bạn không thể publish phiên bản đầu tiên của ứng dụng qua App Center mà phải được publish thông qua Google Play Console*

### 1.Khởi tạo App trên App Center

**Bước 1:** Hãy chắc chắn rằng ứng dụng của bạn đã được publish trên Google Play Store.

**Bước 2:** Tạo một tài khoản trên Microsoft App Center.

![](https://images.viblo.asia/a373380b-67fb-425c-b803-a23dde7ca380.jpeg)

**Bước 3:** Click add new App.

**Bước 4:** Chọn tên hiển thị của App và chọn OS tương ứng. Ở đây ta chọn Android và React Native

![](https://images.viblo.asia/da0c896d-9afb-4e0c-a8fa-fc00af15d2aa.jpeg)


**Bước 5:** Màn hình tiếp theo cho các bạn các bước để tích hợp **appcenter-analytics** và **appcenter-crashes**.

![](https://images.viblo.asia/b2886207-e5f8-461b-a1ef-9c8cd05476a5.jpeg)

**Bước 6:** Tiếp theo chọn Distribute và chọn CodePush

![](https://images.viblo.asia/17c97f44-0c47-4ce8-bebd-a3628f06f2c5.jpeg)

**Bước 7:** Click Create Standard Deployments

![](https://images.viblo.asia/b59e44d4-6214-4cd8-b8a3-8064b33c04a0.jpeg)

**Bước 8:** Ở màn hình tiếp theo chọn icon Settings ở góc phải. Bạn có thể thay đổi môi trườn Staging thành Production ở đây

![](https://images.viblo.asia/66b3eff0-8e32-42b5-8a0c-906324559598.jpeg)

**Bước 9:** Copy key để sử dụng trong bước 13

![](https://images.viblo.asia/0e3673aa-cf69-470d-a3d7-2c312bb59631.jpeg)

### 2. Cài đặt và tích hợp React Native CodePush

**Bước 10:** Cài đặt [react-native-code-push](https://www.npmjs.com/package/react-native-code-push)

**Bước 11:** Cần cài đặt thủ công cho Android cho CodePush. Mở Android Studio lên và làm theo các bước trong [link](https://github.com/microsoft/react-native-code-push/blob/HEAD/docs/setup-android.md)

**Bước 12:** Trong link trên bạn sẽ gặp giống như hình

![](https://images.viblo.asia/53a92856-908a-4223-ada0-e14070170c05.jpeg)

**Bước 13:** Paste key đã copy ở bước 9 vào đây

### 3. Config trong React Native App 

**Bước 14:** Bạn cần thay đổi một số cài đặt sau trong file App.js. Import thư viện CodePush.

```
import CodePush from ‘react-native-code-push’;
```

**Bước 15:** Define các CodePush option. Bạn có thể tùy chỉnh các thứ ở đây:

```
const CODE_PUSH_OPTIONS={
  checkFrequency:CodePush.CheckFrequency.ON_APP_START
}
```

**Bước 16:** Trong `useEffect` ở file `App.js` thêm đoạn sau đây:

```
useEffect(() => {
  CodePush.sync({installMode:CodePush.InstallMode.IMMEDIATE},syncWithCodePush);
},[])

const syncWithCodePush = status => {
  console.log('Codepush sync status',status);
}
```

Một file `App.js` ví dụ như sau:

```
import React,{useEffect} from 'react';
import AppNavigator from './config/routes';
import rootReducer from './src/store/reducers';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import CodePush from 'react-native-code-push';
const CODE_PUSH_OPTIONS={
  checkFrequency:CodePush.CheckFrequency.ON_APP_START
}
const store=createStore(rootReducer);
const App=props=>{
  useEffect(()=>{
    CodePush.sync({installMode:CodePush.InstallMode.IMMEDIATE},syncWithCodePush);
  },[])
  const syncWithCodePush=status=>{
    console.log('Codepush sync status',status);
  }
  return(
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  )
}
export default CodePush(CODE_PUSH_OPTIONS)(App);
```

**Bước 17:** Bước tiếp theo là tạo .abb hoặc .apk file. Đảm bảo rằng đã tăng `versionCode` trong `build.gradle` trước khi generate bundle/apk

### 4. Kết nối App Center tới Play Store

**Bước 18:** Trong App Center Console chọn tab Store sau đó chọn Connect to store

![](https://images.viblo.asia/b4a7cae2-c493-4ddf-843a-47b2ad41fa08.jpeg)

**Bước 19:** Bạn cần upload một file `.json`

![](https://images.viblo.asia/19f40be3-f8ae-4da8-8087-0ac175fb2a0f.jpeg)

**Bước 20:** Để lấy được file `.json` thì cần mở Google Play console sau đó tới Settings -> Developer Account -> API access. Click vào Choose a Project

![](https://images.viblo.asia/867f5d64-66df-442f-a7c4-703f736198ae.jpeg)

**Bước 21:** Hiển thị popup confirm sau đó chọn đồng ý

**Bước 22:** Chọn Create new project

![](https://images.viblo.asia/4054fb92-2ba4-4fbc-afcf-08b6486a80d3.jpeg)

**Bước 23:** Sau đó bạn cần tạo một service account 

![](https://images.viblo.asia/00aa4f75-e4b1-48ae-9197-da32f4beb539.jpeg)

**Bước 24:** Click Google Cloud Platform link trong popup

![](https://images.viblo.asia/5993f6bb-92a8-4127-8e26-d22573a8be0c.jpeg)

**Bước 25:**  Click Create Service account

![](https://images.viblo.asia/57cdb615-8e58-40fb-b1e1-2cb8c6f5281d.jpeg)


**Bước 26:** Điền các form theo yêu cầu rồi click Done

![](https://images.viblo.asia/c80b5cf0-f40f-4103-8178-f999c6f5feb7.jpeg)

**Bước 27:** Hiển thị một list các account. Click vào button Action

![](https://images.viblo.asia/b6ab0469-fca6-44bd-8a65-2968b42fda7f.jpeg)

**Bước 28:** Chọn Manage Key

![](https://images.viblo.asia/be0759df-cfdc-41e7-9812-fe557075616b.jpeg)

**Bước 29:** Click Add key

![](https://images.viblo.asia/66cd9fcb-1e89-4c82-a4bc-b66db1ad5167.jpeg)

**Bước 30:** Một popup xuất hiện. Chọn JSON và sau đó click Create để download key. Bây giờ nếu bạn Settings -> Developer Account -> API access trong Google Play console thì key sẽ xuất hiện ở đây

![](https://images.viblo.asia/7c52848f-8bee-4a7e-97db-076800c50be8.jpeg)

**Bước 31:** Quay lại App Center Console và upload key bạn vừa download. Chọn package name của Android app và click Assign

![](https://images.viblo.asia/8eeb35f2-d5e8-44d7-b90a-8b6816904f6d.jpeg)

### 5. Upload App lên App Center

**Bước 32:** Distribute -> Releases. Click vào Create New Release. Ở đây, upload .aab hoặc .apk file

![](https://images.viblo.asia/2b125654-cac2-4ff4-ae3a-232f2af66d73.jpeg)


**Bước 33:** Chọn publish

![](https://images.viblo.asia/774f4860-2324-4fef-ab44-17636fde637d.jpeg)

**Bước 34:** Bạn đã tích hợp thành công App Center và CodePush, nó sẽ như hình dưới đây

![](https://images.viblo.asia/daec1103-0658-4827-8cda-91f5a45141b4.jpeg)

Bài viết đến đây là kết thúc, hẹn gặp lại các bạn ở các bài viết sau!

Bài dịch từ:
https://techblog.geekyants.com/a-guide-to-integrating-codepush-to-your-react-native-app-part-1
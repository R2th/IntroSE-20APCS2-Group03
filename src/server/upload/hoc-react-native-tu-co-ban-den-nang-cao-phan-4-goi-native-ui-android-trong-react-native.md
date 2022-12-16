Trong bài viết này tôi sẽ giới thiệu với các bạn cách sử dụng Native UI trong React Native. 

Do không có nhiều thời gian nên tôi xin phép giới hạn bài này giành cho Android :D. Từ ví dụ này các bạn sẽ tự dựng cho mình các bộ native ui phù hợp cho project của bạn dựa trên các thư viện UI đã có sẵn.
# 1. Giới thiệu

Hiện nay có hàng nghìn thư viện native ui đang được sử dụng và 1 trong số đó đã trở thành library không thể thiếu cho ứng dụng mobile. Nhưng React Native hiện nay chỉ đáp ứng được phần nào yêu cầu về UI. Nếu như bạn đi đâu đó tìm thấy app có giao diện đẹp rồi tìm trên mạng thì cũng chỉ có thể tìm ra các library native cho Android và iOS còn React Native thì không thấy đâu. 

Các bạn yên tâm đi, nếu như đã có library cho Android và iOS thì kiểu gì cũng sẽ tạo được bộ libray React Native. Tại sao ư ? Chúng ta sẽ quay trở lại 1 chút bản chất của React Native.

![](https://i.imgur.com/hinK7iN.png)

Như hình trên thì ứng dụng của bạn có 3 thành phần:

1. **Native Code/Modules**: là sẽ chứa api, nền tảng của platform để build ứng dụng của bạn
2. **Javacript VM**: là máy ảo thực thi tất cả các lệnh JavaScript Code của bạn. 
3. **React Native Bridge**: sẽ chịu trách nhiệm làm cầu nối liên kết giữa native và javascript với nhau.

(các bạn nếu hiểu rõ hơn có thể xem ở link sau: https://www.reactnative.guide/3-react-native-internals/3.1-react-native-internals.html)

Okay, đến đây chúng ta hình dung ra 3 bước cần phải làm:

1. Dựng native (bước này không cần làm gì đã có hàng vạn library sẵn có)
2. Viết RN Bridge để có thể gọi được trong code javascript
3. Gọi native UI trong code React Native.
# 2. Yêu cầu ban đầu
Đầu tiên chọn 1 library native ui để làm ví dụ.
https://github.com/dmytrodanylyk/circular-progress-button

Sau đó các bạn cài đặt:

* Android SDK, Android Studio
* React Native CLI
* VS Code

Chi tiết các bạn có thể xem trong https://facebook.github.io/react-native/docs/getting-started


# 3. Sử dụng Native UI trong React Native

Để tiện theo dõi ví dụ các bạn hãy tải source code theo link dưới đây
https://github.com/oTranThanhNghia/TestNativeUiDemo

hoặc lệnh sau:

```
$ git clone https://github.com/oTranThanhNghia/TestNativeUiDemo.git
```

## 3.1. Import native library vào project

Các bạn mở Android Studio, vào file `buid.gradle`

![](https://i.imgur.com/LFjoATs.png)

Thêm đoạn `implementation 'com.github.dmytrodanylyk.circular-progress-button:library:1.1.3'`

vào trong `dependencies`
```json
dependencies {
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation "com.android.support:appcompat-v7:${rootProject.ext.supportLibVersion}"
    implementation "com.facebook.react:react-native:+"  // From node_modules

    implementation 'com.github.dmytrodanylyk.circular-progress-button:library:1.1.3'
}
```

rồi ta đợi trong ít phút để Android Studio tải các library cần thiết về máy 

## 3.2. Implement SimpleViewManager

Trong ví dụ này chúng ta sẽ tạo `ReactProgressButtonManager` được kế thừa từ `SimpleViewManager`

```java
public class ReactProgressButtonManager extends SimpleViewManager<CircularProgressButton> {
    private static final String TAG = "RNProgressButtonManager";

    public static final String REACT_CLASS = "RCTCircularProgressButton";

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }
}
```

## 3.3. Tạo `createViewInstance` method

View sẽ được tạo trong `createViewInstance` và đi kèm với state mặc định của ứng dụng.

```java
@Nonnull
    @Override
    protected CircularProgressButton createViewInstance(@Nonnull ThemedReactContext reactContext) {
        Log.i(TAG, " createViewInstance");
        CircularProgressButton circularProgressButton = new CircularProgressButton(reactContext);
        return circularProgressButton;
    }
```

## 3.4. Tạo cầu nối với các property của native ui

Bằng cách sử dụng @ReactProp (hoặc @ReactPropGroup) thì thuộc tinh properties của native ui sẽ được tham chiếu trong Javascript.

```java
@ReactProp(name = "text", customType = "")
    public void setText(CircularProgressButton circularProgressButton, String text) {
        Log.i(TAG, " setText "+text);
        circularProgressButton.setText(text);
    }

    @ReactProp(name = "completeText", customType = "")
    public void setCompleteText(CircularProgressButton circularProgressButton, String completeText) {
        Log.i(TAG, " setCompleteText "+completeText);
        circularProgressButton.setCompleteText(completeText);
    }

    @ReactProp(name = "errorText", customType = "")
    public void setErrorText(CircularProgressButton circularProgressButton, String errorText) {
        Log.i(TAG, " setErrorText "+errorText);
        circularProgressButton.setErrorText(errorText);
    }

    @ReactProp(name = "progress", defaultInt = 0)
    public void setProgress(CircularProgressButton circularProgressButton, int progress){
        Log.i(TAG, " setProgress "+progress);
        circularProgressButton.setProgress(progress);
    }

    @ReactProp(name = "idleText", customType = "")
    public void setIdleText(CircularProgressButton circularProgressButton, String idleText) {
        Log.i(TAG, " setIdleText "+idleText);
        circularProgressButton.setIdleText(idleText);
    }
```

## 3.5. Implement `ReactPackage` và đăng ký `ViewManager`

Tạo `NativeViewPackage` để có thể đăng ký `ReactProgressButtonManager` vào trong Application.

```java
public class NativeViewPackage implements ReactPackage {

    @Nonnull
    @Override
    public List<NativeModule> createNativeModules(@Nonnull ReactApplicationContext reactContext) {
        return new ArrayList<>();
    }

    @Nonnull
    @Override
    public List<ViewManager> createViewManagers(@Nonnull ReactApplicationContext reactContext) {
        return Arrays.asList(new ReactProgressButtonManager());
    }
}

```

## 3.6. Đăng ký `NativeViewPackage` vào trong `MainApplication`

![](https://i.imgur.com/Jmtf60q.png)

```java
public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new NativeViewPackage() // add here
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

   ...
}
```

## 3.7. Tạo Javascript module

Tạo project React Native:

```
$ react-native init [Name] --version 0.59.9
```

Okay, bây giờ các bạn mở `VS Code` lên và chọn project bạn vừa tạo xong. 

Tạo file `CircularProgressButton.js`

![](https://i.imgur.com/g43rDlM.png)

Sau đó điền đoạn code sau:

```javascript
import React from 'react';
import { requireNativeComponent, View } from 'react-native';
import PropTypes from 'prop-types';

const CircularProgressButton = (props) => (
        <RCTCircularProgressButton 
            {...props}
            style={props.style}
            text={props.text}
            completeText={props.completeText}
            errorText={props.errorText}
            progress={props.progress}
            idleText={props.idleText}
        />
)

CircularProgressButton.propTypes={
    text: PropTypes.string,
    completeText: PropTypes.string,
    errorText: PropTypes.string,
    idleText:PropTypes.string,
    progress: PropTypes.number,
    ...View.propTypes,
};
const RCTCircularProgressButton=requireNativeComponent('RCTCircularProgressButton');

export default CircularProgressButton;

```

Done ! Bạn đã tạo xong module và giờ bạn muốn sử dụng thì chỉ cần 

```javascript
import CircularProgressButton from './CircularProgressButton';

...

<CircularProgressButton style={{ height:100, width:100 }}  
            text="text" completeText="Done" errorText="Error" idleText="idleText"
            progress={this.state.progress}
          />
...
```

# 4. Demo

![](https://i.imgur.com/cILsDoL.gif)

Ngoài ví dụ của tôi các bạn có thể tham khảo 1 số library nổi tiếng để hiểu rõ hơn về cách gọi native ui component:

https://github.com/react-native-community/react-native-video
# 5. Tài liệu tham khảo
1. https://medium.com/@atul.sharma_94062/how-to-develop-android-ui-component-for-react-native-fddd141f5ae4
2. https://facebook.github.io/react-native/docs/native-components-android
3. https://github.com/dmytrodanylyk/circular-progress-button
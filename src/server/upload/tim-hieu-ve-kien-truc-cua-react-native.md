Nếu đã làm việc với mobile app thì chắc hẳn các bạn không còn xa lạ gì với các tên React Native. Nó là một open-source hay còn gọi là Cross-Platform do Facebook tạo ra cho phép các nhà phát triển có thể xây dựng và triển khai một ứng dụng Android và IOS một cách nhanh chóng mà mạnh mẽ. Ngày xưa để xây dựng một ứng dụng chạy trên 2 platform là Android và IOS thì các công ty hoặc cá nhân phải có đủ nhân lực hoặc kinh nghiệm với cả 2 Android (Java/Kotlin) và IOS (Swift/Objective-C) thì mới có thể xây dựng được. React Native ra đời để giải quyết bài toán về chi phí, nguồn lực cũng như thời gian trong quá trình xây dựng một ứng dụng đa nền tảng.

React Native được xây dựng với sự kết hợp của 2 thành phần chính là React và Native. React là một framework của Facebook cho phép xây dựng UI một cách tối ưu và linh hoạt. Còn Native chính là các SDK của 2 nền tảng Android và IOS phát triển.
React Native cung cấp cho chúng ta 2 cách để xây dựng app đó là:
- Expo CLI
- React Native CLI

Trong bài viết này mình sẽ không nói nhiều về các khái niệm cơ bản hay các setup hoặc build app với React Native nữa mà sẽ tập chung vào một khái niệm nâng cao đó là Native Module, một thành phần rất quan trọng trong React Native. Để làm việc với Native Module thì bắt buộc các lập trình viên phải có kiến thức làm việc với  Java/Kotlin và Swift/Objective-C vì chúng ta sẽ phải làm việc nhiều với SDK, xử lý phần cứng cũng như hệ điều hành. Các thành phần chính các bạn cần quan tâm:

**Android**
- [Activities](https://developer.android.com/reference/android/app/Activity)
- [Services](https://developer.android.com/guide/components/services)
- [Broadcast Receivers](https://developer.android.com/guide/components/broadcasts)
- [Content Providers](https://developer.android.com/guide/topics/providers/content-provider-basics)
- [Room](https://developer.android.com/training/data-storage/room) / [SQLite](https://developer.android.com/training/data-storage/sqlite)
- [Intents](https://developer.android.com/reference/android/content/Intent)
- [Fragments](https://developer.android.com/guide/fragments#:~:text=A%20Fragment%20represents%20a%20reusable,an%20activity%20or%20another%20fragment.)
- [ListView](https://developer.android.com/reference/android/widget/ListView)
- [Retrofit](https://square.github.io/retrofit/)
- Các SDK liên quan đến phần cứng như [Camera](https://developer.android.com/guide/topics/media/camera), [Map](https://developers.google.com/maps/documentation/android-sdk/overview), [Audio & Video](https://developer.android.com/guide/topics/media),...


**IOS**
- [Viewcontroller](https://developer.apple.com/documentation/uikit/uiviewcontroller)
- [UIView](https://developer.apple.com/documentation/uikit/uiview)
- [UIImage](https://developer.apple.com/documentation/uikit/uiimage)
- [NavigationController](https://developer.apple.com/documentation/uikit/uinavigationcontroller)
- [UIWebview](https://developer.apple.com/documentation/uikit/uiwebview)
- [CoreData](https://developer.apple.com/documentation/coredata)/[SQLite](https://www.appcoda.com/sqlite-database-ios-app-tutorial/)
- [Network](https://developer.apple.com/documentation/foundation/urlsession)
-  Các SDK liên quan đến phần cứng như [ Map Kit](https://developer.apple.com/documentation/mapkit/), [Google API](https://developers.google.com/maps/documentation/ios-sdk/overview), [Camera](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture), [AVFoundation](https://developer.apple.com/av-foundation/), [AVKit](https://developer.apple.com/documentation/avkit/),...

Và cuối cùng chúng ta cần có kiến thức về 2 IDE [Android Studio](https://developer.android.com/studio) và [Xcode](https://developer.apple.com/xcode/) để phục vụ việc code trong quá trình phát triển.

![](https://images.viblo.asia/3352bdfe-24db-4c7e-8d8f-5e1e4ffb6587.png)


Trước khi bắt đầu làm việc với Native Module thì chúng ta cùng tìm hiểu cách mà React Native hoạt động nhé.

![](https://images.viblo.asia/605c22e0-bd26-4b06-9d0c-d7e6207328a0.png)

Khi một ứng dụng React Native được khởi chạy, nó sẽ có 3 luồng chính như sau:

**Native thread** (Native Queue): Đây là thread chính được khởi tạo ngày sau khi ứng dụng bắt đầu chạy. Nó có nhiệm vụ kích hoạt Javascript thread để thực thi code React mà các lập trình viên đã tạo ra trước đó và sau đó gửi lại cho Native thread để thực thi chúng. Đồng thời thread này cũng có nhiệm vụ lắng nghe các sự kiện thao tác trên màn hình và gửi sang cho Javascript thread. Do 2 thread này luôn giao tiếp liền mạch với nhau nên khi giao diện ứng dụng cần cập nhật thì việc thực hiện khá là nhanh chóng.

**Javascript thread** (JS Queue): Thread này có nhiệm vụ thực thi và đóng gói code javascript chưa logic nghiệp vụ của app và sau đó gửi đến cho Native thread.

**Shadow thread**: Đây là nơi tính toán lại bố cục giao diện được hiển thị trên màn hình ứng dụng của bạn. Facebook sử dụng một công cụ là Yoga để thực hiện công việc tính toán này và gửi lại cho Native thread để hiển thị lên màn hình.

Trước khi release app androdi hoặc ios với react-native thường chúng ta sẽ run 2 câu lệnh `npx react-native run-android --variant=release` hoặc `npx react-native run-ios --configuration Release`. Tiến trình này sẽ đóng gói toàn bộ code javascript của bạn thành 1 file là `main.bundle.js` bằng NPM của [NodeJS](https://nodejs.org/en/). Khi một app start, Native thread sẽ khởi động và sau đó gửi một message qua một bridge là JSI để kích hoạt Javascript thead. Sau đó  Javascript thead sẽ gửi lại toàn logic UI/UX cần hiển thị cho Native thread thông qua JSI. JSI sẽ gọi đến Shadow thread và sử dụng [Yoga](https://yogalayout.com/) để tính toán bố cục layout. Cuối cùng JSC sẽ gửi lại cho Native thread để hiển thị lên màn hình ứng dụng.

Nếu bạn muốn tạo View và Text để hiển thị lên màn hình thì với React Native mình có ví dụ sau:

Ở phía react-native chúng ta tạo ra một giao diện hiển thị như sau:

```Javascript
import React, { Component } from "react";
import { Text, View, AppRegistry } from "react-native";

function HelloWorldApp() {
  render() {
    return (
      <View style={{ padding: 40 }}>
        <Text>Hello world!</Text>
      </View>
    );
  }
}

export default HelloWorldApp;
AppRegistry.registerComponent("HelloWorldApp", () => HelloWorldApp);
```

Sau đó JS thread sẽ gửi cho Native thread một đoạn mã như sau:

`[ [2,3,[2,'Text',{...}]] [2,3,[3,'View',{...}]] ]`

Lúc này với Native thread sẽ khởi tạo các object view với Android` View -> ViewManager`, `TextView ->  TextView` và IOS` View -> RCTViewManager`, `TextView -> UITextView`

Ví dụ: 
- **Android**: `Text` -> `new TextView(getContext())`
- **IOS**: `Text` ->  `UITextView(frame: CGRect(x: 20.0, y: 90.0, width: 250.0, height: 100.0))`

Nếu các bạn đã làm việc với Android chắc sẽ không còn xa lạ với việc tạo View như thế này đúng không?

```XML
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/simpleTextView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:text="Before Clicking"
        android:textColor="#f00"
        android:textSize="25sp"
        android:textStyle="bold|italic"
        android:layout_marginTop="50dp"/>

</RelativeLayout>
```

Nó là một file XML cho phép chúng ta tạo ra UI trên Android. Bây giờ dựa vào message của Javascript thread gửi sang, Native thread sẽ khởi tạo các view này cho chúng ta bằng Java/Kotlin.

## Tổng kết

Trong bài viết này mình đã giới thiệu cho bạn về cách hoạt động cũng như kiến trúc của React Native. Câu hỏi là React Native có chậm hơn so với Native không thì câu trả lời là Có vì do 2 thread phải giao tiếp với nhau thông qua JSI API. Nhưng việc chậm này gần như không đáng kể do ngày nay đội ngũ kĩ sư Facebook nỗ lực tối ưu kiến trúc của React Native. Do đây là một thành phần nâng cao trong react-native nên ở  bài viết tới mình sẽ hướng dẫn bạn cách xây dựng Native Module với Android. Cảm ơn các bạn.
Bài này mình sẽ giúp các bạn config Firebase Crashlytics, nhờ đó mà bạn có thể quan sát được các báo cáo về crash app trên Firebase console.
## Before you begin

Trước khi setup Crashlytics, bạn cần phải config Firebase vào app của bạn. Nếu app của bạn chưa config Firebase thì hãy xem bài hướng dẫn tại [đây](https://viblo.asia/p/firebase-android-overview-3P0lPYL85ox#_4-cai-firebase-vao-project-9) nhé!

Chú ý rằng khi config Firebase trong project thì thao tác cả trên Firebase console nhé. 

Trong bài này mình hướng dẫn bạn cofig Crashlytics cho app lần đầu tiên, nếu như app của bạn đã sử dụng Fabric Crashlytics mà bạn muốn chuyển sang dùng Firebase Crashlytics thì hãy theo dõi tại [đây](https://firebase.google.com/docs/crashlytics/migration-post-linking).

## Step 1: Set up Crashlytics in the Firebase console
1. Click **Crashlytics** ở thanh navigation bên trái của Firebase console.
2. Nếu project Firebase của bạn có nhiều ứng dụng đăng ký thì bạn phải chọn ứng dụng mà bạn muốn thêm Crashlytics, quan sát ảnh sau: 


![](https://images.viblo.asia/b68fd565-a75c-48c2-aac0-125bb6313df8.png)


3. Màn hình như sau hiển thị ra, bạn chọn vào ô "**No, set up a new Firebase app**" và nhấn Next


![](https://images.viblo.asia/6f67902d-e9a6-494f-83a8-dbf4cfa6b9d4.png)

4. Màn hình sau hiển thị ra, bạn chọn "**Go to Crashlytics docs**" và quay trở lại Firebase console.


![](https://images.viblo.asia/f310d1f7-d0b1-430b-8bff-c659ac46695b.png)

Kết quả: 


![](https://images.viblo.asia/02ebf01f-1e03-4c18-84a9-cb990026eba5.png)

## Step 2: Add the Crashlytics SDK

1.  Trong file build.gradle của project, bạn update google-services lên 3.1.2 hoặc ít hơn, sau đó thêm Crashlytics vào responsitories và dependency:
 
```java
buildscript {
    repositories {
        // Check that you have Google's Maven repository (if not, add it).
        google()
    }

    dependencies {
        // ...

        // Check that you have the Google Services Gradle plugin v4.3.10 or later
        // (if not, add it).
       classpath 'com.google.gms:google-services:4.3.10'

        // Add the Crashlytics Gradle plugin.
        classpath 'com.google.firebase:firebase-crashlytics-gradle:2.8.1'
    }
}

allprojects {
    repositories {
        // Check that you have Google's Maven repository (if not, add it).
        google()
    }
}
```

2. Trong file build.gradle của app, thêm plugin và dependences Crashlytics : 

```java
apply plugin: 'com.android.application'

apply plugin: 'com.google.gms.google-services' // Google Services Gradle plugin

// Apply the Crashlytics Gradle plugin
apply plugin: 'com.google.firebase.crashlytics'
```

```java
dependencies {
    // Recommended: Add the Firebase SDK for Google Analytics.
    implementation 'com.google.firebase:firebase-analytics:21.0.0'

    // Add the Firebase SDK for Crashlytics.
    implementation 'com.google.firebase:firebase-crashlytics:18.2.10'
}
```

Sau khi bạn add SDK vào app, Crahslytics tự động lắng nghe và thu thập các sự kiện crash app.
## Step 3: Initialize Crashlytics
Firebase Crashlytics SDK tự động khởi tạo Crashlytics ngay sau khi bạn add nó vào trong app của mình :D . Nhanh gọn lẹ nhờ! 

## Step 4: Build or run your project
Bạn hãy build hoặc run app của mình để thông báo với Firebase rằng mình đã tích hợp thành công Crashlytics. Khi build thành công rồi thì màn hình console sẽ hiển thị như này: 

![](https://images.viblo.asia/059acd2a-337f-4ca5-931a-971eacb639f2.png)

## Test your implementation
Bây giờ chờ app nó crash rồi quan sát thôi nhờ :D.
.
.
.
. (once year later...)

Thôi lâu lắm... bây giờ thế này, tự làm cho app nó crash.
Bạn tạo một Button và set sự kiện click vào thì crash app:
```java
 public void onListen() {
        val crashButton = Button(this)
crashButton.text = "Crash!"
crashButton.setOnClickListener {
   throw RuntimeException("Test Crash") // Force a crash
}

addContentView(crashButton, ViewGroup.LayoutParams(
       ViewGroup.LayoutParams.MATCH_PARENT,
       ViewGroup.LayoutParams.WRAP_CONTENT))
    }
```

Sau đó quan sát trên Firebase console : 

![](https://images.viblo.asia/5a903551-a21a-4bc7-983a-5de13bbf0778.png)

Chờ cho kết quả log lên console cũng khá lâu, nó không update ngay tức thì đâu nhé, nên đừng nóng vội mà hãy chờ đợi nó log nha! ....

Mình xin kết thúc bài viết ở đây, xin chào và hẹn gặp lại! 

### Tài liệu tham khảo: 
https://firebase.google.com/docs/crashlytics/get-started?platform=android
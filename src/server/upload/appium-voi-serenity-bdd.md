- Chào các bạn, ở phần trước mình đã hướng dẫn các bạn sơ qua về Serenity BDD. Và cũng như mình đã giới thiệu trước đó. Serenity BDD có rất nhiều thư viện đáp ứng cho các công việc kiểm thử khác nhau như test website với Selenium, api với RestAssured và cả điều mình muốn nói trong bài này đó là automation test app với appium ([Automation Test với Serenity BDD](https://viblo.asia/p/automation-test-voi-serenity-bdd-Qbq5Q4RXlD8))

    **Appium là gì và tại sao lại sử dụng appium với Serenity BDD**

    - Appium là một công cụ mã nguồn mở ra đời từ năm 2011 bởi Dan Cuellar với cái tên ban đầu là "IOSAuto". Nghe qua thì có vẻ phần mềm này chỉ hỗ trợ cho IOS, tuy nhiên đến hiện tại thì Appium có thể  được sử dụng để kiểm thử tự động (test automation) các ứng dụng native, ứng dụng hybrid, ứng dụng window hay web trên nền tảng iOS và Android. Khi tìm hiểu về appium các bạn sẽ thấy nó khá giống với công cụ Selenium nổi tiếng. 

    **Tại sao lại sử dụng appium**

    - Vì appium là mã nguồn mở nên đương nhiên là nó hoàn toàn miễn phí.
    - Appium là công cụ kiểm thử tự động “cross-platform"- đa nền tảng.
    - Appium hỗ trợ rất nhiều ngôn ngữ khác nhau như: Java, Objective-C, JavaScript, Python, Php ..v.v
    - Appium đã ra đời rất lâu và có một cộng đồng sử dụng lớn mạnh. Vì thế nếu có issue thì chỉ cần hỏi chị Goolge là sẽ có kết quả.

    **Appium và Serenity BDD**

    - Serenity có các thư viện hỗ trợ rất tốt cho việc chạy test tự động với appium trên cả thiết bị máy thật và máy ảo. Việc tích hợp cũng rất dễ dàng. Để bắt đầu thì chúng ta chỉ cần thêm vào file serenity.properties  một số cấu hình cần thiết.

    - Ví dụ với test web trên IOS

        ```
        appium.hub = http://127.0.0.1:4723/wd/hub
        appium.platformName = iOS
        appium.platformVersion = 8.1
        appium.deviceName = iPhone 5
        appium.browserName = Safari
        ```

    - Ví dụ với test appication trên Android

        ```
        appium.hub = http://0.0.0.0:4723/wd/hub
        appium.platformName = ANDROID
        appium.deviceName = R58N21SLEWY
        appium.platformVersion = 10.0.0
        appium.appPackage = chungnd.demo.release
        appium.appActivity = chungnd.demo.MainActivity
        appium.app = classpath:app/AppDemo.apk
        appium.autoGrantPermissions = true
        ```

    - Để tìm hiểu nhiều hơn về các cấu hình khác, các bạn có thể vào trang chủ của appium [appium.io](http://appium.io/)

     ### 1. Cài đặt appium
     
    - Trước khi cài đặt appium chúng ta cần cài đặt Java 8 trở lên và Android SDK với Android, Xcode với IOS. Sau đó set các biến môi trường cần thiết để như JAVA_HOME, ANDROID_HOME,..
    - Có hai cách để cài đặt Appium là cài thông qua Nodejs hoặc sử dụng Appium Desktop.
    - Để cài đặt qua Nodejs thì các bạn gõ các lệnh sau:

        ```
        brew install node     # Cài đặt nodejs
        npm -g install appium # Cài đặt appium
        npm install wd        # Cài đặt appium client
        appium &              # Khởi động appium
        ```

     - Đối với Appium Desktop thì các bạn tải bộ cài tại đây: https://github.com/appium/appium-desktop/releases/ . Sau đó chọn phiên bản bạn muốn và phù hợp với hệ điều hành của bạn.

        ![](https://images.viblo.asia/c2ebec2f-9aac-4357-bf20-ed5c0401d3c2.PNG)

     - Và đây là ứng dụng của chúng ta sau khi cài đặt.

    ![](https://images.viblo.asia/dae81bcb-409d-48e4-9fbd-985408d4cff2.PNG)


    
   ### 2. Lấy elements trên android 

     - Một phần rất quan trọng khi viết test scrip automation test là chúng ta cần phải định vị được các đối tượng test (elements). Các đối tượng này nôm na chính là những thứ hiển thị trên màn hình giao diện của chúng ta như EditText, Button, TextView, Checkbox.... Với Android thì tôi thường sử dụng hai công cụ sau để tìm các elements đó là appium desktop (đã cài ở bài trước) và uiautomatorviewer ngay trong Android Sdk.

    - Kiểm tra kết nối của máy tính với điện thoại

    - Bạn có thể lựa chọn kết nối điện thoại và máy tính bằng cách cắm cáp hoặc thông qua wifi để thực hiện chạy test tùy theo nhu cầu sử dụng của mình . Với kết nối qua wifi thì bạn phải đảm bảo rằng máy tính và điện thoại nằm cùng chung một dải mạng. Sau đó sử dụng lệnh.

        ```
        adb tcpip 5555
        adb connect 192.168.0.101
        ```

    - Sau đó với cả hai trường hợp bạn cần phải kiểm tra kết nối giữa điện thoại và máy tính bằng lệnh.

        ```
        adb devices
        ```

    - Một danh sách tên các thiết bị sẽ được hiện ra và chúng ta cần đảm bảo rằng thiết bị test của mình nằm trong số đó.

       **Sử dụng uiautomatorviewer để lấy elements**
   
    - Uiautomatorviewer chính là một công cụ có sẵn trong Android Sdk. Bạn có thể tìm thấy file chạy trong thư mục Sdk/tools/bin. Sau khi khởi chạy Uiautomatorviewer sẽ có giao diện như sau:

        ![](https://images.viblo.asia/29e09e56-425e-4a26-b494-06ab3822458a.png)

    - Khi trỏ vào một element (phần bên trái), thì các bạn sẽ thấy các thuộc tính của element. Thông thường, tôi hay lấy theo resouce-id ( nếu có) hoặc theo xpath hoặc css selector. Tuy nhiên uiautomatorviewer show cho chúng ta khá nhiều thuộc tính và bạn có thể lấy element thông qua chúng. 
    
     **Sử dụng Appium Desktop**
    
    - Uiautomatorviewer là phần mềm nhỏ, gọn và khá tiện lợi để lấy element. Tuy nhiên chúng ta lại không thể tương tác trực tiếp với các element đó. Và appium lại làm rất tốt điều này. Để bắt đầu chúng ta cần tạo một session trên appium desktop bằng cách nhấn vào File -> New Session Window. Nhưng trước đó nhớ start server appium lên.


        ![](https://images.viblo.asia/e754bf64-51db-4f49-9adb-c33acf79ab4c.png)

    - Sau khi điền đầy đủ thông tin về thiết bị và ứng dụng cần chạy thì bấm Start Session.

     ![](https://images.viblo.asia/499ff6f8-8277-43d3-b493-c7591c6fd9d5.png)


    - Nhìn qua thì cũng khá giống uiautomatorviewer nhưng hiện tại bạn có thể thao tác trực tiếp với element bằng cách chọn các actions như tap, double tap, send keys, v..v hay thậm chí là record lại các thao tác này. 


    - **Note:** Cách lấy id hay xpath đối với mobile sẽ có một chút khác biệt nho nhỏ trên android hoặc ios và cả trên web nữa. Vì thế các bạn nên tìm hiểu thêm trên trang chủ của appium để có thể lấy được element một cách chính xác nhất.
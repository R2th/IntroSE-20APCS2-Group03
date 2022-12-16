Chắc hẳn chúng ta cũng đã từng nghe tính năng wireless install hay debuging trên Xcode dành cho các thế hệ iPhone, việc này giúp dễ dàng trong việc thao tác debug mà không cần phải cài cắm các dây cáp gây ra nhiều cản trở, đặc biệt là khi test những phần liên quan đến camera ta cần phải di chuyển ra những khoảng cách xa để test và xem log từ Xcode...

Tương tự với các thiết bị Android chúng ta cũng có thể tận dụng được tính năng này thông qua việc kết nối không dây từ device đến Android Studio. Một điều cần chú ý là sẽ có những cách kết nối khác nhau tuỳ theo phiên bản Android đang sử dụng. Bài viết này sẽ chia sẻ các cách thức kết nối với thiết bị từ Android 10 trở về trước và đối với Android 11+. Bên cạnh đó bài viết này cũng giới thiệu các plugin có thể hổ trợ cho việc thiết lập này đơn giản hơn.

# Kết nối Wireless với device từ Android 10 trở về trước
Để việc kết nối được thành công và có thể debug thì việc đầu tiên là chúng ta cần enable tính năng **Developer options**  và **USB debugging** trên phone trước, chúng ta có thể tham khảo việc thiết lập này từ https://developer.android.com/studio/debug/dev-options.
Điều kiện cần nữa là device và máy tính của chúng ta phải kết nối chung một network.

Sau đây là các bước kết nối:
1. Kết nối điện thoại với máy tính thông qua cable USB
2. Mở terminal/cmd đi đến đường dẫn cài đặt của Android SDK và tìm thư mục **platform-tools**, chúng ta sẽ sử dụng tiện ích **adb** ở thư mục này
3. Gõ lệnh: **adb tcpip 5555** để thiết lập cho việc kết nối đến port default này. Chú ý trên một số hệ điều hành khác có thể là **./adb**
![](https://images.viblo.asia/a5051761-1c35-48e4-965b-4bbae5d1dd38.PNG)
4. Vào phần setting của phone để lấy địa chỉ IP mà phone đang kết nối đến internet. Ví dụ: **192.168.1.5**
5. Gõ lệnh: **adb connect 192.168.1.5:5555**, nếu thành công chúng ta sẽ kết nối được tới device
![](https://images.viblo.asia/88c92bd6-1183-447e-aea5-0ce6089e5438.PNG)

    Kiểm tra trên Android Studio chúng ta sẽ thấy thông tin về device đang kết nối
![](https://images.viblo.asia/32febbb8-1a03-44d4-8a3a-670a076c4174.PNG)

Như vậy chúng ta đã kết nối thành công device với Android Studio qua kết nối không dây, từ đây chúng ta không cần cắm cable USB để chạy device nữa. Việc run/debug hoàn toàn qua không dây.

# Kết nối Wireless với device từ Android 11 trở lên
Đối với Android 11 trở lên có một cải tiến rất đáng tiền là chúng ta có thể thực hiện việc kết nối không dây mà không cần phải cắm cable USB để thiết lập.

Các bước thực hiện như sau:
1. Vào phone Setting, tìm đến Developer Options, tìm mục Wireless debugging và enable nó, chúng ta có thể thấy giao diện như bên dưới
![](https://images.viblo.asia/fac49780-9074-4e52-8449-e0fa37890517.png)

2. Kế đến chúng ta sẽ thấy có 2 tuỳ chọn cho việc kết nối:
* Pair device với QR code: tính năng này đang được phát triển với các bản Android Studio thử nghiệm, cụ thể là trên Android Studio sẽ có mục paring này chúng ta chọn vào đó sẽ tạo QR code, ở device chúng ta click vào menu này và scan QR code trên Android Studio, việc thiết lập sẽ được kết nối. Hiện tại chúng ta chưa sử dụng tính năng này được trên các bản Android Studio chính thức.
* Pair device với code: chúng ta sẽ sử dụng trình adb để thiết lập kết nối, đây là phương pháp có thể sử dụng hiện tại.

3. Sau khi chọn **"Pair device with pairing code"**, chúng ta sẽ thấy thông tin như bên dưới

    ![](https://images.viblo.asia/13c74fa0-3dd7-41e7-978c-72b67eb6ea27.png)

    Tiến hành mở terminal/cmd đi đến đường dẫn cài đặt của Android SDK và tìm thư mục **platform-tools**, chúng ta sẽ sử dụng tiện ích adb ở thư mục này.
    Thực hiện gõ lệnh với ip đã cung cấp như hình bên dưới: **adb pair 192.168.1.5:37803** và thực hiện điền pairing code: **185317**
    
    ![](https://images.viblo.asia/ea252019-2e63-43a3-99e8-509127ce531c.PNG)

   Đến đây việc pairing đã thành công.

4. Ở bước này chúng ta tiến hành connect device tới Android Studio, chúng ta quan sát hình ở trên sẽ thấy dòng **"IP address & Port"**, chúng ta thực hiện kết nối tới địa chỉ và port này
Tiếp tục gõ lệnh: **adb connect 192.1681.5:41827**

    ![](https://images.viblo.asia/ee8343e2-790b-4e40-8dee-89d5b700b2fb.PNG)
    
   Đến đây việc kết nối đã thành công, ta có thể dễ dàng thao tác run/debug app mà không cần dây cable USB nào cả.


# Kết nối sử dụng plugin ADB Wifi
Để giảm các bước kiểm tra và nhập ip, port gõ lệnh command chúng ta có thể sử dụng các plugin có sẵn để hổ trợ cho việc kết nối này, điều lưu ý để thực hiện kết nối thì device cần được kết nối với computer thông qua cable USB trước.

Để cài plugin thì chúng ta vào **Setting** -> **Plugins** từ Android Studio và tìm kiếm với từ khoá **"adb wifi"** như hình bên dưới

![](https://images.viblo.asia/8781c429-9102-4f07-8a92-416e51120481.PNG)

Ở demo này, bài viết sử dụng **ADB Wi-Fi** plugin để thử nghiệm

![](https://images.viblo.asia/39e340cb-8057-4f48-9fd1-6a6a7f983f71.PNG)

Như hình ta thấy, chỉ cần chọn device cần kết nối không dây rồi bấm **Connect** là hoàn thành, khá đơn giản. Sau khi kết nối xong ta có thể bỏ cable USB ra không cần cắm vào máy tính nữa.

Bài viết đã chia sẻ các kết nối Wireless từ thiết bị đến Android Studio trên các phiên bản Android khác nhau, hy vọng mọi người có thể dễ dàng thao tác được.
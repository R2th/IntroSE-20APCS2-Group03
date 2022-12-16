![](https://images.viblo.asia/a0fecbbd-e603-4b12-a33b-c6f74bf555df.jpg)

Nhiều web developer đã gặp phải trường hợp khi test trên thiết bị mobile gặp khó khăn trong việc debug, `alert` chỉ có thể được `string`, nếu là `object`, `array` thì không xem được thuộc tính bên trong. Như vậy thì có cách nào xem được, debug chúng không, câu trả lời là có và chúng ta xem được thông qua thiết bị remote.

Trong bài viết này mình sẽ hướng dẫn mọi người cách debug trên thiết bị android trên trình duyệt Chrome

### 1. Set up trên android
* Bật Developer mode

> Note: Những hãng android khác nhau thì cách bật Developer mode cũng khác nhau, nếu như bạn không tìm thấy phần bật Developer mode trên điện thoại mình, hãy thử thao tác tại [link này](https://www.thegioididong.com/hoi-dap/tuy-chon-nha-phat-trien-tren-android-la-gi-huong-dan-cach-585140).

Với những điện thoại android chưa bật `Developer mode`, chúng ta sẽ bật nó trong phần cài đặt, ở màn hình thông tin phần mềm, ta sẽ ấn` 7 lần liên tiếp` vào mục `Build Number`, `Build Number` có thể khác nhau ở mỗi hãng, ở đây mình dùng điện thoại Asus để bật.

`Setting` -> `System` -> `About phone` -> `Software information` -> `Build Number`

![](https://images.viblo.asia/26ae11d2-9f7d-47af-a961-b94506b60f17.PNG)

Sau khi đã bật chế độ  `Developer mode`, chúng ta sẽ thấy ở màn hình cài đặt hệ thống có mục `Developer options`, giờ chúng ta sẽ vào đó để bật chế độ `USB debugging`

![](https://images.viblo.asia/faddf01b-b80c-4781-a4df-b60160ed831b.PNG)

Tiếp theo chúng ta hãy cắm cáp kết nối điện thoại vào máy rồi chuyển chế độ kết nối USB thành `USB tethering`

![](https://images.viblo.asia/9d4e549e-42cb-44c5-9674-405d8c904e96.PNG)

Các bước setup trên điện thoại đã xong, tiếp tới ta bật chế độ remote device trên chrome

### 2. Bật remote device trên Chrome
![](https://images.viblo.asia/230b58e3-12cc-4296-8092-dae6aa8d87d4.PNG)

![](https://images.viblo.asia/35457721-7711-4e36-8f9d-7ab31afe7f3f.PNG)

Chúng ta bật `F12` -> `More tools` -> `Remote devices`, sẽ thấy một tab nhỏ mở ra và ấn vào đường link trong đó để vào phần quản lý remote device trên Chrome

[chrome://inspect/#devices](chrome://inspect/#devices)

![](https://images.viblo.asia/42fe9104-17e3-49d4-9a76-bdf2c273ec50.PNG)

Tại đây chúng ta đã nhìn thấy được thiết bị đang được remote
Tiếp theo mình sẽ public host trên máy tính để điện thoại có thể connect được vào

Như vậy các bước setup remote device trên chrome đã hoàn tất, chúng ta sẽ ấn vào `Inspect` để xem debug.

![](https://images.viblo.asia/656b7266-836e-4a14-a47e-11d9182c3694.PNG)


https://duongtiendat.com/lam-the-nao-co-the-xem-duoc-console-log-cua-dien-thoai
Ngày release phiên bản chính thức Android 11 đến người dùng càng gần hơn, ít nhiều anh em developer phát triển Android Mobile đều đã biết. Mình cũng cập nhật trong một bài viết gần đây về những thay đổi tính năng nổi bật cũng như thao tác người dùng các bạn nếu chưa xem có thể lướt qua tại đây.

Để đáp ứng được chất lượng ứng dụng tương thích tốt trên Android 11 thì chúng ta không chỉ biết tới những thay đổi trên mà cần phải tìm hiểu thêm APIs mới và phần kỹ thuật nào đã cập nhật trong phiên bản mới lần này. Có thể nói Google đã đưa ra 1 danh sách rất dài những APIs update và tính năng mới cho anh em develop sử dụng thuận tiện hơn, mình sẽ tóm lược những ý chính trong bài viết này.

![](https://images.viblo.asia/87f96ba1-6daf-43e8-88cb-687e50c65afd.png)


### 1. Build và Debug qua internet

Chắc hẳn ai đó từng sử dụng phương pháp này trong vài năm trước đây thì sẽ nghĩ ngay nó không có mới mẻ gì phải không nào? Đây là cách thực hiện việc build và debug không cần dùng dây cable USB vào thiết bị, với cách làm cũ bạn có thể dùng phần mềm bên thứ 3 hoặc chạy lệnh ADB hay root device nhưng tín hiệu nhiều khi rất chập chờn và chờ đợi khá mất thời gian. Đặc biệt là ứng dụng với độ phức tạp cao bạn nên dành một thời gian dài cho việc build theo cách này.

Tuy nhiên đợt này chúng ta có thể thực hiện rất đơn giản và thuận tiện khi được hỗ trợ trực tiếp trên Android 11. Bạn chỉ cần thực hiện vài thao tác sau:

Mở Developer Build (thiết bị) > Wireless debugging bật lên > Bấm Allow vào dialog xác nhận > Pair device with pairing code > Vào Terminal chạy lệnh

`adb pair ipaddr:port`

![](https://images.viblo.asia/2eb6263d-74ed-42d0-899d-e43594092835.png)


Bạn sử dụng thông tin : Code và IP ở bước trên

```
Enter pairing code: 482924
Successfully paired to 192.168.1.130:37099
```

 
 
*Lưu ý:* Cả thiết bị và máy tính cùng kết nối vào 1 đường truyền nhé

Ưu điểm: Tốc độ build rất nhanh so với cách làm cũ.

### 2. Gia tăng tốc độ cài đặt APK

Với những game có dung lượng lớn (trên 2G) việc cài đặt mất khá nhiều thời gian cài đặt. Bạn có thể thử tốc độ cài ứng dụng trên SDK version mới nhất.
Bạn sử dụng lệnh sau để enable nhé:

`adb install --incremental`

*Lưu ý:* APK cài phải được sign với APK Signature v4 một tính năng đăng kí ứng dụng phiên bản mới

### 3. Loại bỏ OpenSL ES

Trong bản build SDK 30 thì OpenSL ES bị loại bỏ và thay vào đó bạn có thể sử dụng một thư viện khác **Oboe** được phát triển bởi Google cho tính năng về âm thanh của mình.

Thêm function **AAudioStream_release()** để hỗ trợ cho function cũ  AAudioStream_close()

Thêm MediaParser API để parse file media và cung cấp thêm trình điều khiển media. Ví dụ:

```
 MyOutputConsumer myOutputConsumer = new MyOutputConsumer();
 MyInputReader myInputReader = new MyInputReader("http://your_service/song.mp3");
 MediaParser mediaParser = MediaParser.create(myOutputConsumer);

 while (mediaParser.advance(myInputReader)) {}

 mediaParser.release();
 mediaParser = null;
```

### 4. Định vị chính xác hơn (GNSS)

GNSS là hệ thống định vị toàn cầu, lúc này bạn được hỗ trợ ăng ten kết nối tới GNSS để nâng cao độ chính xác đến từng cm. Thật khủng khiếp phải không nào :D
Ứng dụng được cấp quyền truy cập **ACCESS_FINE_LOCATION** mới được sử dụng tính năng này. Và đương nhiên rồi thiết bị đó phải hỗ trợ nữa mới được bạn nha, để kiểm tra xem em nó có kỹ năng này không bạn chỉ cần check qua method: **hasGnssAntennaInfo()**

![](https://images.viblo.asia/5788e0de-b2c0-4ef9-ab33-95658d6fc918.jpg)

### 5. Ảnh và Camera

- Bạn có thể tắt cả hai thông báo Âm thanh và Rung khi chụp ảnh bằng cách:

`setCameraAudioRestriction()`

- Nâng cao chất lượng ảnh HEIF 

Khi bạn sử dụng **ImageDecoder.decodeDrawable()** để decode 1 ảnh HEIF gốc là một animate thì nó sẽ trả về cho bạn một chuỗi ảnh. Không giống với trước đây nó chỉ có thể trả về 1 frame duy nhất

### 6. Báo cáo tiến trình crash app

![](https://images.viblo.asia/1efa34a3-75a2-4d50-aa31-787f0a4fa649.jpg)

Đây thực sự là một tính năng tiện lợi cho việc check report về hoạt động app của bạn ở phía user. Vì gần như những lỗi trên production rất khó để check được nguyên nhân bị crash.

Hiện tại việc làm này trở nên tốt hơn khi bạn chỉ cần gọi **ActivityManager.getHistoricalProcessExitReasons()** về server để phân tích hoặc bạn lưu lại ở đâu đó cho việc phân tích định kỳ bằng cách dùng **setProcessStateSummary()**

Hàm ActivityManager.getHistoricalProcessExitReasons() nó sẽ trả về các class liên quan đến tiến trình bị dừng lại đột ngột giống như khi bạn debug trong quá trình phát triển. Từ đó bạn sẽ tìm xem nguyên nhân do bộ nhớ, sai sót ở đâu mà khắc phục.

### 7. Mở rộng Resources

Cung cấp thêm 2 APIs mới là **ResourcesLoader** và **ResourcesProvider** giúp cho việc load và tìm kiếm resource trong phạm vi xác định rõ ràng hơn thay vì bạn phải tìm cả apk file như trước. Và bạn có thể chỉnh sửa file được lấy ra trực tiếp. Ví dụ mình có thể tạo ra ResourcesProvider bằng việc gọi **loadFromDirectory()** hay **loadFromApk()**

### 8. Tổng kết

Trên đây là những thay đổi quan trọng dành cho anh em developer mong rằng bài viết sẽ mang lại sự hữu ích tới cộng đồng. Mọi người sẽ chuẩn bị cho phiên bản ứng dụng mới trong dự án tương thích tốt trên Android 11. Xin chào và hẹn gặp lại các bạn trong bài viết tới đây.
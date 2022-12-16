**Bài viết được dịch từ** https://futurestud.io/tutorials/how-to-debug-your-android-app-over-wifi-without-root

Mỗi khi tôi phát triển ứng dụng android, tôi phải kết nối android device với laptop bằng một cable USB. Sử dụng USB cable thật là khó chịu và giới hạn khu vực chuyển động. Kết quả là tôi đã tìm hiểu, xem có cách nào để debug qua Wifi hay không.
Thật may mắn, có một cách cực kỳ đơn giản, tất cả những gì bạn cần là một cable USB (cho cài đặt lúc khởi tạo thôi nhé), và các thiết bị (android device, laptop) kết nối đến cùng một network. Những screenshots ở dưới đây là từng bước cần thực hiện trên Macbook Pro của tôi, nhưng nó cũng sẽ hoạt động trên các hệ điều hành khác.

### Các bước thực hiện
1. Bạn cần kết nối device của bạn tới máy tính qua cable USB. Hãy chắc chắn rằng USB debugging đang hoạt động. Bạn có thể kiểm tra nó bằng cách chạy lệnh `adb devices`
![](https://images.viblo.asia/93149221-3cf5-4e70-acf6-e4d3501c1691.png)
2. Chạy lệnh `adb tcpip 5555`       
![](https://images.viblo.asia/eb2cdac0-6ba7-4784-b4b5-f26f0ef5038a.png)
3. Disconnect device bằng cách tháo cable USB
4. Đi đến *Settings -> About phone -> Status* để xem địa chỉ IP của điện thoại
5. Chạy lệnh `adb connect <IP address of your device>:5555`
![](https://images.viblo.asia/87c708fb-df23-4c81-80d2-8ebe8321193e.png)
6. Giờ, khi chạy lại lệnh *adb devices*, bạn sẽ thấy lại device của bạn
![](https://images.viblo.asia/788275f7-3ce9-4e0f-86b8-dd3a8422d1be.png)

Bây giờ bạn có thể chạy các lệnh adb hoặc dùng IDE để phát triển ứng dụng của bạn - sử dụng wireless
### Có cần thực hiện lại các bước này mỗi lần không ?
Bây giờ chắc bạn sẽ muốn hỏi, tôi phải làm gì khi chuyển sang một nơi làm việc khác hay một Wifi khác ? Bạn sẽ không phải thực hiện lại các bước từ 1 đến 3 (các bước này dùng để đưa điện thoại của bạn vào chế độ Wifi-debug mode). Nhưng bạn phải kết nối device lại bằng cách thực hiện các bước từ  4 đến 6.
Có một trở ngại nhỏ, đó là điện thoại sẽ bị tắt chế độ Wifi-debug mode khi restart. VÌ vậy nếu máy hết pin, bạn sẽ phải làm lại từ đầu. Vì vậy, hãy để ý đến pin của thiết bị và đừng restart máy trong quá trình hoạt động. BẠn có thể code mà không cần cable đến hàng tuần.
### Happy wireless coding!
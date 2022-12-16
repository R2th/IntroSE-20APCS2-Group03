Bạn đã quen gõ `Terminal` trên Ubuntu hay các bản phân phối khác của Linux. Bạn chê Windows không có cơ chế dòng lệnh "xịn xò" như Linux. Hay bạn chỉ là những người "đam mê" những dòng lệnh trên Linux thôi nhưng bạn đang thất vọng vì Windows không có. Nhưng bạn hãy thử xem video này xem Windows đã và đang làm được những gì nhé.
{@youtube: https://www.youtube.com/watch?v=8gw0rXPMMPE}
Đẹp đúng không ạ, bạn có thể mở Windows 10 lên và nhấp vào link store [Windows Terminal](https://www.microsoft.com/store/productId/9N0DX20HK701) để tải về và dùng thử.

> Thực ra mình định viết bài này từ cuối tháng 6 khi ứng dụng mới phát hành ở bản preview, nhưng drop đến tận bây giờ mới viết :sweat_smile:. Cảm thấy có lỗi quá :(
## Cài đặt
Do bản Windows Terminal (Preview) này đang hoạt động tốt trên nền Windows 10 1903 nên các bạn cố gắng kiểm tra xem Windows 10 của bạn đang ở bản 1903 trở lên không nhé. 

Các bạn có thể vào link [Windows Terminal (Preview)](https://www.microsoft.com/store/productId/9N0DX20HK701) hoặc các bạn có thể mở Microsoft Store lên và tìm kiếm Windows Terminal rồi bấm `Install` là được :D

![](https://images.viblo.asia/6a66e64c-1732-4be1-bfab-3dd77ab43799.PNG)

Phiên bản hiện tại của mình đang dùng là Version: 0.6.2951.0. Các bạn thử kiểm tra phiên bản xem có đúng không nhé.

![](https://images.viblo.asia/7dba66be-3933-41cb-8253-4a31bea10fb4.PNG)

## Chức năng
Vậy cái ứng dụng này thì làm được gì nhỉ :thinking:. Theo như Microsoft công bố thì ứng dụng này sẽ là 1 dạng ứng dụng tất-cả-trong-một. Từ đây người dùng sẽ truy cập được `cmd` truyền thống của Windows, hay là `Powershell`. Điều đặc biệt nhất là nó chạy cả hệ thống Windows Subsystem for Linux (WSL) dùng để chạy Terminal của Linux trên Windows. Vâng tôi không lừa các bạn đâu. Chạy Linux trên Windows đó.

![](https://images.viblo.asia/cc88af4a-1d3a-4570-b06c-4a0a6583e51f.PNG)

Các bạn có thể xem cách cài đặt Windows Subsystem for Linux (WSL) tại đây [https://docs.microsoft.com/en-us/windows/wsl/install-win10](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

![](https://images.viblo.asia/cb641be2-6138-46e2-b434-cec24b1cc3a4.png)

Có rất nhiều các distribution Linux ở đây. Bạn có thể tha hồ chọn lựa rồi `Install` vào máy mình thôi. 

## Sử dụng
Bạn đọc có thể đọc documents ứng dụng tại đây [https://github.com/microsoft/terminal/blob/master/doc/user-docs/index.md](https://github.com/microsoft/terminal/blob/master/doc/user-docs/index.md)

Ứng dụng Windows Terminal có khả năng cho phép duyệt nhiều tab, để người dùng có thể thực thi nhiều dòng lệnh ở cùng 1 thời điểm. Microsoft cũng cung cấp khả năng tuỳ biến khá cao đối với giao diện của ứng dụng này. Và một số tính năng cá nhân hoá tuỳ vào người dùng thích sử dụng như thế nào. Tuy nhiên là do phiên bản đầu tiên chưa đầy đủ tính năng nên người dùng phải cấu hình qua file JSON :joy:
Ứng dụng Windows Terminal còn hỗ trợ kết xuất văn bản bằng bộ xử lý đồ hoạ (GPU), cho phép người dùng chèn emoji.

![](https://images.viblo.asia/6a944bc9-0e2f-4777-af94-1f04a955327b.png)

Ở đây mình đã cài Ubuntu vào máy của mình rồi, và mình chẳng thấy trở ngại nào giữa Windows và Linux cả. Tuyệt nhiên là nó không có mỗi giao diện UI/UX thôi, chỉ có Terminal nên khởi động cực kỳ nhanh. Phản hồi ngay lập tức. Có các nút shortcut chuyển đổi qua lại giữa các ứng dụng rất tiện.

Mình thấy cả Azure Cloud Shell, tức là bạn có thể truy cập trực tiếp đến server Azure qua ứng dụng này. Tiếc là mình không có server Azure để trải nghiệm trên ứng dụng này xem nó mượt mà như thế nào. Hi vọng lần sau mình sẽ có cơ hội được trải nghiệm.
## Kết
Hi vọng các bạn thích thú với kiểu gõ `cmd` mới này của Windows 10. Chúc các bạn vui vẻ và hài lòng với ứng dụng Windows Terminal của Microsoft.

À hiện tại vẫn đang là phiên bản Preview nên chắc không thể tránh được lỗi, các bạn cứ dùng thử rồi chờ phiên bản Offical nhé. 

## Tham khảo
http://genk.vn/microsoft-chinh-thuc-ra-mat-ung-dung-dong-lenh-windows-terminal-moi-danh-cho-windows-10-20190623143320827.chn
https://github.com/microsoft/terminal/blob/master/doc/user-docs/index.md
# Series Outline
[kintone Plaform Part 1 - Giải pháp Quản trị dữ liệu không cần lập trình](https://viblo.asia/p/kintone-plaform-part-1-giai-phap-quan-tri-database-khong-can-lap-trinh-OeVKBYVr5kW)

[kintone Plaform Part 2 - Sử dụng Plugin để mở rộng chức năng](https://viblo.asia/p/kintone-plaform-part-2-su-dung-plugin-de-mo-rong-chuc-nang-L4x5xymqKBM)

[kintone Plaform Part 3 - Hướng dẫn phát triển Plug-in](https://viblo.asia/p/kintone-plaform-part-3-huong-dan-phat-trien-plug-in-4P856XmLZY3)

[kintone Plaform Part 4 - Plug-ins list](https://viblo.asia/p/kintone-plaform-part-4-plug-ins-list-oOVlYdQQZ8W)
# Overview
Một lần nữa mình xin giới thiệu tới mọi người một plugin mới, hỗ trợ mọi người download file trong app. Như mọi lần khi muốn tìm hiểu và cài đặt plugin này hãy đảm bảo có những hiểu biết nhất định về: 
- Kintone là gì
- Plugin là gì
- Môi trường Plugin và hướng dẫn phát triển Plugin
# Problem
Khi bạn dùng app, trong app có những file đính kèm. Bạn muốn download từng file, OK ko vấn đề, click lick file là download được. Bạn muốn download toàn bộ file, kintone không hỗ trợ điều này đâu, chịu khó click từng link file nhé. Như vậy rất bất tiện.

May quá, hôm trước mình tìm hiểu được một plugin hỗ trợ điều này. Đó là Download Attached Files plugin. Chi tiết về plugin mình sẽ giới thiệu ở phần dưới này.
# How to use Plug-in
Download Attached Files plugin đúng như tên gọi của nó, nó sẽ hỗ trợ người dùng download các file trong app của chúng ta.
## Setting config
Setting config để thiết lập những file người dùng được download. Nếu không config plugin sẽ mặc định download all file đó.
![](https://images.viblo.asia/0091592e-78ce-4c62-aa0f-551ff8390375.png)
Khi bạn chưa thiết lập gì, màn hình config sẽ như thế này nhé. Mặc định sẽ là tất cả các file đều được download và tên file sẽ bị thay đổi theo format sau file_{no}.{extension}
![](https://images.viblo.asia/3be805ac-c6a6-4881-8d31-ba2cabf8eb4e.png)
Nếu muốn file không được download thì bỏ chọn đi nhé. Ví dụ như ở đây mình có bỏ chọn 3 file nhé.
![](https://images.viblo.asia/ef672254-6a69-4909-a5b9-93eb4fea8cc2.png)
Bạn cũng có thể thay đổi tên file nhé.
![](https://images.viblo.asia/6d87ae5b-1777-4bc2-96be-4080fdcda430.png)
Tuy nhiên đừng để tên file giống nhau hay bỏ trống nhé. Sẽ lỗi đấy
![](https://images.viblo.asia/06c30a7a-62eb-4367-9752-b2231e8dc1f4.png)
![](https://images.viblo.asia/3186be68-0d54-495c-b972-aecfb3ae84a4.png)
Khi cấu hình xong nhớ submit nhé
![](https://images.viblo.asia/b661317c-342f-45ad-afe5-442f4f445e88.png)
Xong rồi, update app thôi nào, đừng quên nhé.
![](https://images.viblo.asia/b6bf732e-1c6e-4089-99ab-c86fc1ad6b5c.png)
## Setting desktop
Khi bạn add plugin xong,  giao diện app sẽ như sau
![](https://images.viblo.asia/a0127eb4-c2a4-4a30-8f13-56cd52a57b4a.png)
Nếu bạn chưa thiết lập config sẽ mặc định download all file. Để download file: 
![](https://images.viblo.asia/22a77e3e-2dd4-4f09-8f51-d268189602b5.png)
![](https://images.viblo.asia/0adf7086-3ef9-4410-a101-ba38a9e6b96b.png)
Sau đó, bạn sẽ thấy một tệp zip đóng gói của các file được download và message thông báo kết quả. Tên file zip sẽ có là  format như sau {current_year}{current_month}{current_day}.zip. Mở file zip ta sẽ thấy các file download.
![](https://images.viblo.asia/2e11cd2b-2831-4d92-91b2-3e4f30c7ca6a.png)
# Notes
1. Chúng tôi không đảm bảo Plugin này hoạt động (do đây chỉ là bản mẫu)
2. Chúng tôi không cung cấp bất cứ hỗ trợ về mặt kỹ thuật nào với các Plugin
# Downloadable Content

File zip, bạn hãy download và upload trực tiếp lên kintone, không cần giải nén
https://goo.gl/hgYTGj
# It 's not the end
Thật vui nếu như mọi người quan tâm đến kintone cũng như series về Plugin này. Mình mong sẽ còn kéo dài được series này thêm nữa để giới thiệu cho mọi người nhiều hơn những Plugin hữu dụng cũng như chúng ta có thể cùng nhau thảo luận về các vấn đề xung quanh nó. Nếu có bất cứ thắc mắc hay khó khăn gì hãy để lại comment và mình sẽ cố gắng hồi đáp nhanh nhất có thể. Cảm ơn !
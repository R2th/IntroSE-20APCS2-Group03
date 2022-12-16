# I. Tổng quan
IntelliJ IDEA là một trình IDE dùng để lập trình Java (nó cũng được sử dụng để lập trình một số ngôn ngữ khác như Node.js, python…).

Về cấu trúc IntelliJ IDEA tương đối giống các tool khác : Netbean, Eclipse nhưng có giao diện thân thiện người dùng hơn, debug nhanh, hỗ trợ autosave và có nhiều plugins hỗ trợ.

# II.Cài đặt

IntelliJ IDEA đang cung cấp 2 bản: community( bản miễn phí), ultimate( bản mất phí). Bản ultimate có hỗ trợ thêm: JavaScript, TypeScript, Database Tools, SQL,...

Trong bài viết này mình sẽ hướng dẫn các bạn cài bản community trên unbutu.

###  1.Phương pháp 1: cài đặt trực tiếp

Các bạn có thể vào Ubuntu Software, tìm kiếm và cài đặt Intellij IDEA dễ dàng
![](https://images.viblo.asia/421d5f71-eeb3-4595-a20b-a7bea3b78f02.png)

### 2.Phương pháp 2: cài đặt gián tiếp qua ubuntu make

Đầu tiên các bạn cần cài đặt Ubuntu Make, nếu các bạn đang sử dụng Ubuntu bản 16.04 hoặc phiên bản cao hơn thì có thể sử dụng câu lệnh dưới đây:

***sudo apt install ubuntu-make***

Sau khi cài đặt Unbutu Make xong, các bạn có thể sử dụng câu lệnh dưới để cài đặt IntelliJ:

***umake ide idea***

Quá trình tải xuống và cài đặt IntelliJ IDEA sẽ mất một thời gian. Nó cũng phụ thuộc vào tốc độ internet của bạn. 
![](https://images.viblo.asia/a3f13892-2b2d-4eeb-aaec-3d919b1641cf.png)

Nếu các bạn muốn gỡ cài đặt Intellij IDEA thì có thể sử dụng câu lệnh dưới đây:

***umake -r ide idea***

### 3.Phương pháp thứ 3: cài đặt khi phần mềm đã có sẵn

Các bạn có thể tải trực tiếp phần mềm tại đây: https://www.jetbrains.com/idea/download/#section=linux, chọn bản community.

Tiếp theo, các bạn sử dụng câu lệnh để thay đổi thư mục:

***cd /opt/***

Sau đó, câu lệnh để trích xuất IntelliJ IDEA từ thư mục ~/Download(nếu bạn lưu ở thư mục khác thì có thể thay đổi Download bằng tên thư mục lưu Intellij IDEA), ở đây mình download bản: ideaIC-2018.3.2

***sudo tar -xvzf ~/Downloads/ideaIC-2018.3.2.tar.gz***

Nếu các bạn muốn đổi tên thư mục IntelliJ IDEA thì có thể sử dụng lệnh:

***sudo mv idea-IC-183.4886.37 idea***

 Sau khi cài đặt thành công bằng 1 trong 3 cách trên, bạn chỉ có thể tìm kiếm IntelliJ bằng Search hoặc sử dụng câu lệnh dưới đây để khởi động IDE.
 
 ***/opt/idea/bin/idea.sh***

Chúc các bạn cài đặt IntelliJ IDEA trên Ubuntu thành công!


Tài liệu tham khảo: https://itsfoss.com/install-intellij-ubuntu-linux/
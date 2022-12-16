## Giới thiệu
Visual Studio Code là một trong những công cụ soạn thảo văn bản lập trình tốt nhất. Nó thay thế Sublime Text làm lựa chọn trình soạn thảo code của nhiều nhà lập trình. Đây là một ứng dụng JavaScript dựa trên Electron (như Atom, một trình soạn thảo code được đánh giá cao khác), nhưng nó nhanh và không gặp phải các vấn đề về hiệu suất như hầu hết các ứng dụng JavaScript khác. Visual Studio Code là mã nguồn mở và có trên GitHub. Dưới đây là một số mẹo về Visual Studio Code cần thiết mà bạn nên tìm hiểu nếu muốn tăng năng suất và luồng công việc của mình.
## 1. Tính năng sửa CONFLICT cực kỳ hay
![](https://images.viblo.asia/2b1e3f2f-4b80-4117-815b-d531c36c9b12.png)

Bạn chỉ cần tìm chọn tìm kiếm trên tất cả các file có dấu xương cá **<<<<<**. Lúc này VSCode sẽ hiện thị 2 phần, phía trên là code của nhánh chính (thường là master), còn phía dưới là code của nhánh hiện tại.Sẽ có 4 sự lựa chọn **Accept Current Change** nó sẽ lấy code phía trên, **Accept Incoming Change** sẽ lấy phần code dưới, **Accept Both Changes** sẽ chấp nhận cả 2, còn **Compare** sẽ hiện ra 1 màn hình để so sánh. Ngoài ra chúng ta có thể coppy phần cần thiết từ phần dưới lên phần trên và lấy sự thay đổi gộp đó, cũng như làm ngược lại là đưa phần nào ta cần của phần trên xuống phần dưới và chọn lấy những code phần dưới. Quá tuyệt đúng không ạ.
## 2. Làm chủ bảng lệnh trong VSCode
Giống như Sublime Text (và TextMate trước nó), Visual Studio Code có bảng lệnh, cho phép người dùng truy cập vào các lệnh khác nhau bằng cách gõ lệnh thay vì điều hướng đến menu sử dụng con chuột.
![](https://images.viblo.asia/e7bee2e9-1caf-4f23-87f1-150868e61d63.png)

Bạn có thể hiển thị bảng lệnh này bằng cách sử dụng phím tắt ***Ctrl + Shift + P***, sau đó chỉ cần nhập những gì muốn tìm kiếm (ví dụ như "close") và các tùy chọn sẽ cập nhật trong thời gian thực. Một số lệnh được phân loại (ví dụ: "File", Git","Terminal", v.v...), vì vậy bạn có thể sử dụng lệnh đó để định vị các lệnh mà bạn không thể tìm thấy.

## 3. Mở một dự án 
![](https://images.viblo.asia/b3d3cd09-72b8-40d2-9b6d-785a9959b2f4.png)
![](https://images.viblo.asia/d2d1be6f-a7ab-415d-8e04-4e37180f2f96.png)

Nếu click vào **Explorer** trong thanh điều hướng bên trái, bạn sẽ thấy một bảng con mới mở ra. Bảng con này được chia thành hai phần: **Open Editors** (tức là các file và tài liệu hiện đang được mở) và **No Folder Opened**.

Click vào **Open Folder** hoặc điều hướng đến **File > Open Folder** trên thanh menu và chọn bất cứ thư mục nào trên hệ thống. Thao tác này sẽ tải thư mục vào Visual Studio Code như là dự án hiện đang làm việc, cho phép bạn dễ dàng truy cập vào tất cả các file và thư mục con, không cần tìm trong **File Explorer** nữa.

## 4. Xem nhiều file cùng một lúc
![](https://images.viblo.asia/e505678f-4ea0-4815-aaeb-19ce6dc6fde2.png)

Hầu hết các trình soạn thảo văn bản hiện đại đều có thể hỗ trợ nhiều file cùng một lúc, cho phép bạn chuyển đổi giữa các file mở thông qua một số loại giao diện dựa trên tab. Các trình soạn thảo văn bản nâng cao hơn thậm chí có thể hỗ trợ chỉnh sửa văn bản song song và Visual Studio Code thực hiện được việc đó, mặc dù theo chiều ngang.

Để làm được điều này chúng ta để ý button trên góc bên phải của tab đang mở:
![](https://images.viblo.asia/79ea137d-43a5-462d-a182-bd7d4a24ff34.png)

Tuy nhiên việc chỉnh sửa song song rất khó trên màn hình nhỏ như máy tính xách tay hoặc màn hình cũ hơn, nhưng với Visual Studio Code điều đó đã được giải quyết. Nó có tính năng Dynamic panel, giúp điều chỉnh các bảng tài liệu nếu mở quá hẹp sẽ tự động mở rộng khi chỉ con trỏ vào nó. Nếu thích sử dụng độ phân giải gần 720p, bạn sẽ thích tính năng này.

## 7. Tính năng đa con trỏ
![](https://images.viblo.asia/ee6be8e5-0776-48cb-80dc-ccb3567c1359.png)

Nếu cần chèn hoặc xóa nhiều dòng văn bản trong toàn bộ tài liệu, bạn cần tạo ra nhiều con trỏ bằng cách giữ phím **Alt** (hoặc **Option** trên **Mac**) và click vào bất cứ đâu trong văn bản. Mỗi lần click sẽ tạo một con trỏ mới. Tính năng này đặc biệt hữu ích với HTML vì bạn có thể thêm nhiều instance trong cùng một class hoặc thay đổi định dạng cho nhiều siêu liên kết.

## 6. Chuyển đến định nghĩa
![](https://images.viblo.asia/c8c2098f-66fb-48e9-aa0d-913db4c0ec54.png)

Khi lập trình hoặc viết script, bạn thường tạo ra biến hoặc phương thức bạn không nhận ra. Vậy bạn sẽ làm gì? Bạn có thể dành vài phút để tìm kiếm các file đúng hoặc chọn biến/phương thức với con trỏ và nhấn **F12** để chuyển đến định nghĩa của nó.

Hoặc bạn có thể sử dụng phím tắt **Alt + F12** để xem nhanh định nghĩa, hiển thị cho bạn định nghĩa ngay trong dòng có con trỏ thay vì mở file nguồn.
![](https://images.viblo.asia/c7802a14-120b-43e0-86fd-21a9611d6198.png)

Để đi theo hướng ngược lại, bạn có thể chọn biến/phương thức đã định nghĩa và sử dụng phím tắt **Shift + F12** để tìm tất cả các tham chiếu đến nó. Thao tác này cũng hiển thị định nghĩa trong dòng tại con trỏ. Để tính năng này hoạt động, bạn cần đảm bảo thư mục thích hợp được mở như “dự án đang làm việc”

## 7. Đổi tên tất cả các biến hoặc phương thức cụ thể
![](https://images.viblo.asia/d3ece467-4036-45a3-9b9d-2b871fa06186.png)

Tái cấu trúc là một việc cần thiết để viết và duy trì code sạch, nhưng nó có thể khá đau đầu, đặc biệt khi bạn đang tái cấu trúc một module lớn hoặc một đoạn code lớn. Vì vậy, thay vì tìm kiếm trong hàng chục file để thay đổi tên biến hoặc phương thức, hãy để Visual Studio Code làm điều đó cho bạn.

Nếu chọn một biến/phương thức và nhấn **F2**, bạn có thể chỉnh sửa tên và nó sẽ thay đổi trên toàn bộ dự án đang làm việc. Nếu chỉ muốn thay đổi tên trong một file, sử dụng phím tắt **Ctrl + F2** và Visual Studio Code sẽ hiển thị một con trỏ ở các instance trong file đó.

## 8. Tìm kiếm trên nhiều file
![](https://images.viblo.asia/f9695357-a255-47b0-8a4e-35decf05d556.png)

Nếu đang làm việc với các file không phải là mã nguồn, các tính năng tìm kiếm biểu tượng ở trên (trong mẹo số 6) sẽ không thể sử dụng được. Vì vậy, khi muốn tìm một câu hoặc một từ mà không nhớ tên file, bạn có thể sử dụng hàm **find** cơ bản.

Trên file hiện tại, nhấn **Ctrl + F**, nếu muốn tìm kiếm ở tất cả các file trong dự án hiện tại, kể cả trong các thư mục phụ, bạn có thể nhấn **Ctrl + Shift + F**.

## 9. Sử dụng dòng lệnh trong VSCode
![](https://images.viblo.asia/8bb87104-9dea-4058-9cb6-4e42444bf780.png)

VS Code đi kèm với một terminal tích hợp. Trên Windows, terminal này hiển thị dưới dạng Command Prompt. Trên Mac và Linux, nó là Bash. Trong Visual Studio Code, terminal khởi động trong thư mục của dự án hiện tại (nếu dự án được tải) hoặc trong thư mục gốc (nếu dự án không được tải).

Ngoài ra, nó cũng hỗ trợ khả năng sử dụng nhiều terminal riêng biệt. Bạn chỉ cần click vào dấu **+** ở trên cùng bên phải để tạo nhiều phiên bản terminal hoặc **click** vào **Trash Can** để đóng terminal hiện tại. Menu thả xuống giúp bạn dễ dàng chuyển đổi giữa các **terminal** và không tốn nhiều không gian màn hình như giao diện dựa trên tab.

## 10. Cài đặt một theme mới trong VSCode
![](https://images.viblo.asia/a3189c8d-b719-4a53-a826-146f80a3caf4.png)

Visual Studio Code cho phép bạn cài đặt theme cho cú pháp giúp làm nổi bật văn bản và mã nguồn. Tuy nhiên, nó không cho phép người dùng thay đổi theme giao diện, nhưng làm nổi bật cú pháp cũng khá quan trọng. Bạn sẽ ngạc nhiên khi biết rằng việc cài đặt theme này sẽ đẩy nhanh năng suất của bạn như thế nào. Bạn có thể tìm theme mới trong Visual Studio Code Marketplace (miễn phí) hoặc tìm kiếm trực tiếp trong Visual Studio Code. Đầu tiên sử dụng tổ hợp phím **Ctrl+Shift+P** rồi gõ theme, sau đó chọn theme mong muốn.

![](https://images.viblo.asia/653085b1-fe74-40f3-be23-cf118182a48d.png)

## 11. Cài đặt extension của bên thứ ba trong VSCode
![](https://images.viblo.asia/93f82be5-1fc2-42d8-94b3-af5215919b65.png)

Tính năng quan trọng cuối cùng để tăng năng suất trên Visual Studio Code là sử dụng extension của bên thứ ba. Cũng như theme, bạn có thể tìm thấy chúng trong Visual Studio Code Marketplace (chúng đều miễn phí) hoặc có thể tìm kiếm trong Visual Studio Code. Để truy cập vào bảng **Extension**, bạn nhấn phím tắt **Ctrl + Shift + X**. Extension chính là chìa khóa tối đa hóa năng suất của bạn. Bạn sẽ tìm thấy tất cả các công cụ cần thiết ở đây.

## Tham Khảo
https://code.visualstudio.com/docs/getstarted/tips-and-tricks
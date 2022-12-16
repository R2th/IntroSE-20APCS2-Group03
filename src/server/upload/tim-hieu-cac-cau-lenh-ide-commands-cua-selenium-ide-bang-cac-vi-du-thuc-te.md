Trong bài viết trước, chúng ta đã tìm hiểu về cách cài đặt và cách sử dụng (các tùy chọn/tính năng) Selenium IDE. Trong bài viết này , hãy cùng nhau tìm hiểu các lệnh Selenium IDE thông qua các ví dụ trên trình duyệt Firefox.
Nội dung này là một trong những hướng dẫn quan trọng nhất để làm việc được với Selenium IDE.
Chúng ta sẽ lấy ứng dụng Login Google Account làm ứng dụng mẫu để chạy các lệnh thử nghiệm. Đầu tiên hãy cùng nhau tạo tập lệnh (script) cho Selenium IDE.

## Tạo tập lệnh Selenium IDE

Toàn bộ quá trình tạo tập lệnh có thể được phân thành 3 giai đoạn:

**Process #1: Recording** - Selenium IDE hỗ trợ người dùng ghi lại các tương tác của người dùng với trình duyệt, toàn bộ các hành động được ghi lại này được gọi là tập lệnh Selenium IDE.

**Process #2: Phát lại** - Trong phần này, chúng ta thực thi tập lệnh đã ghi để xác nhận và giám sát mức độ ổn định và tỷ lệ thành công của nó.

**Process #3: Lưu** - Sau khi có một tập lệnh (đã ghi) ổn định, có thể tùy chọn lưu tập lệnh này cho các lần chạy và hồi quy trong tương lai.

### Process #1: Recording a test script

**Scenario (kịch bản)**

* Mở trang "https://accounts.google.com"
* Nhập Tiêu đề trang của ứng dụng.
* Nhập tên người dùng và mật khẩu hợp lệ, gửi (submit) các chi tiết để đăng nhập.
* Xác nhận rằng người dùng được chuyển hướng đến Trang chủ (login thành công).

**Step 1 –** Mở trình duyệt Firefox, sau đó mở Selenium IDE từ menu bar của trình duyệt.

**Step 2 –** Nhập địa chỉ của ứng dụng đang được kiểm tra (“https://accounts.google.com”) trong mục nhập Base URL.

![](https://images.viblo.asia/c847d237-b346-412e-ae4e-8bc853dc09b7.jpg)

**Step 3 –** Theo mặc định, nút Record (Ghi) ở trạng thái ON (BẬT). Nhớ điều chỉnh thành ON (BẬT) nếu nó đang ở trạng thái OFF (TẮT) để bật chế độ ghi.

![](https://images.viblo.asia/fccdc7d3-3a5d-457c-a8e5-91a08c769d07.jpg)

**Step 4 –** Mở ứng dụng đang được thử nghiệm (https://accounts.google.com) trong Firefox.

![](https://images.viblo.asia/15451c4a-7eac-4be2-b64d-e6dc8f73f292.jpg)

**Step 5 –** Xác minh xem tiêu đề ứng dụng đã chính xác chưa. Để làm như vậy, nhấp chuột phải vào bất cứ nơi nào trên trang ngoại trừ các link liên kết hoặc hình ảnh. Nhấp chuột phải sẽ mở ra menu ngữ cảnh Selenium IDE liệt kê một vài lệnh. Để có được toàn bộ danh sách command, hãy chọn tùy chọn “Show Available Commands”. Điều này sẽ mở một menu khác chứa toàn bộ các lệnh có sẵn khả dụng. Chọn mục “assertTitle Sign in – Google Accounts” để xác minh tiêu đề trang.

![](https://images.viblo.asia/fe656b61-4575-4610-9f29-25f79b9a5fcd.jpg)

Ngay sau khi chọn mục assertTitle .... trên, 1 command (test step) bao gồm /appended sẽ được tự động thêm vào trình chỉnh sửa Selenium IDE.
![](https://images.viblo.asia/8f6bceda-4bb4-42fa-a0ea-bf2bb9dfbd8f.png)
 
**Step 6 –** Nhập một username hợp lệ vào “Email” Textbox của Gmail.

**Step 7 –** Nhập một password hợp lệ vào “Password” Textbox của Gmail.

Trình mô phỏng các hành động tương tự của người dùng có thể được nhìn thấy trong trình chỉnh sửa thử nghiệm Selenium IDE. Có nghĩa là các thao tác người dùng thực hiện trên trang ứng dụng sẽ được ghi lại hết vào trình chỉnh sửa của Selenium IDE.

![](https://images.viblo.asia/0de0e866-2b48-4ad4-9a76-cdfa36ad7828.jpg)

**Step 8 –** Click vào button "Sign in" để hoàn tất quá trình login. Chuyển hướng đến trang chủ nếu thông tin đăng nhập chính xác.

**Step 9 –** Kết thúc phiên record, chuyển nút Ghi sang trạng thái OFF, và chúng ta có bộ kịch bản được ghi lại.

![](https://images.viblo.asia/7c21eb0f-f0db-4409-ae58-c9df183e3c3e.jpg)

### Process #2: Playing back / executing a test script (Chạy lại bộ kịch bản đã ghi trước đó)

Ở process 1 chúng ta đã tạo tập lệnh Selenium IDE đầu tiên của mình, giờ chúng ta sẽ thực thi nó để xem tập lệnh có đủ ổn định không. Nhấp vào nút phát lại để thực thi tập lệnh.

![](https://images.viblo.asia/3bbc083e-aa86-4e59-b441-126cc03410cf.jpg)

Sau khi thực hiện, nếu tất cả các bước kiểm tra (dòng comand trong editor) được highlight màu xanh lục thì chứng tỏ quá trình thực thi đã thành công. Thanh progress (test case pane) sẽ hiển thị màu xanh lá cây (Runs: tăng thêm 1)

![](https://images.viblo.asia/535cd055-3038-4651-b4f9-325d927c5420.jpg)

Ngược lại nếu có bất kỳ bước kiểm tra nào thất bại không thể thực hiện thì bước kiểm tra (dòng comand trong editor) đó sẽ được highlight màu đỏ và Thanh progress (test case pane) sẽ hiển thị màu đỏ (Failures: tăng thêm 1)

### Process #3: Lưu kịch bản test

Sau khi phát lại thấy tập lệnh đã chạy ổn định thì sẽ thực hiện bước Lưu.

Bước 1 - Để lưu tập lệnh kiểm tra, Nhấp vào menu File và chọn Tùy chọn “Save Test Case”.

Bước 2 - Hệ thống sẽ nhắc chúng ta duyệt hoặc nhập vị trí mong muốn để lưu và điền tên muốn đặt cho tập lệnh. Sau đó nhấn nút Save.
Sau khi lưu thành công, tập lệnh test có thể được tìm thấy tại vị trí được cung cấp trong bước trên và được lưu ở định dạng HTML.

![](https://images.viblo.asia/c2fbe722-80c3-41f1-b3b4-72b40d8a990f.jpg)

## Sử dụng các tính năng chung của Selenium IDE

Các tính năng của Selenium IDE như điều chỉnh tốc độ chạy, các tùy chọn Edit ... đã nhắc đến trong bài trước nên mình không nhắc lại nữa. Dưới đây chỉ giới thiệu 1 số tính năng phục vụ cho việc chạy test.

### Tùy chọn “Execute this command”

Selenium IDE cho phép người dùng thực hiện một bước kiểm tra duy nhất trong toàn bộ tập lệnh kiểm tra mà không cần thực thi toàn bộ tập lệnh bàng cách sử dụng tùy chọn “Execute this command”. Được sử dụng vào những lúc chúng ta muốn gỡ lỗi / xem hành vi của một bước kiểm tra cụ thể.

**Có 4 cách để sử dụng option “Execute this command” :**

#1. Tìm option “Execute this command” trong tab Actions ở Menu bar

![](https://images.viblo.asia/5abf44a8-05b8-407e-a523-4a23522629fc.jpg)

#2. Sử dụng phím tắt (“X”)

#3. Chuột phải vào dòng lệnh muốn thực thi và chọn “Execute this command”

![](https://images.viblo.asia/123a3ac5-2a49-4608-b1b8-f1f1f386cedc.jpg)

#4. Double click (Click đúp chuột) vào dòng lệnh muốn chạy.
Bạn có thể dùng bất cứ cách nào mà bạn thích.

**Các bước cần tuân thủ:**

Bước 1 - Khởi chạy trình duyệt web và mở URL mục tiêu ( https://accounts.google.com,), Chọn bước kiểm tra (test step) mà bạn muốn thực hiện. Hãy nhớ mở trang web chính xác để giảm thiểu khả năng thất bại.

Bước 2 - Thực hiện chạy lệnh đã chọn bằng 1 trong 4 cách trên.

Bước 3 - Khi bước kiểm tra đã chọn được thực thi. Bước kiểm tra sẽ được highlight bằng màu xanh lá cây nếu thành công hoặc đỏ nếu thất bại. Đồng thời, bước kiểm tra sẽ được mô phỏng thành một hành động trên trình duyệt web.

## Selenium IDE Commands

Mỗi 1 bước kiểm tra Selenium IDE được chia thành ba thành phần sau:

* Command (hành động cần được thực thi)
* Target (web element cần tương tác)
* Value (giá trị đối số muốn truyền vào cho web element)

![](https://images.viblo.asia/8bbb4d47-96dc-4055-a936-a66159973d76.jpg)

**Các loại của Selenium IDE commands**

Có ba loại của lệnh Selenium IDE. Mỗi bước kiểm tra trong Selenium IDE đều thuộc bất kỳ 1 trong 3 loại nào sau đây.

* Actions
* Accessors
* Assertions

**Actions (Lệnh hành động)**

Đây là những lệnh tương tác trực tiếp với ứng dụng bằng cách thay đổi trạng thái của nó hoặc bằng cách đổi một số dữ liệu thử nghiệm.

Ví dụ: Lệnh mà "type" của người dùng cho phép người dùng tương tác trực tiếp với các thành phần web như nhập giá trị vào text box và khi giá trị được nhập; nó cũng được hiển thị trên giao diện người dùng.

Một ví dụ khác là lệnh click. Lệnh click nhấp vào cho phép người dùng thao tác với trạng thái của ứng dụng.

Trong trường hợp thất bại của một loại lệnh hành động, việc thực thi tập lệnh thử nghiệm dừng lại và các bước còn lại của các bước kiểm tra sẽ không được thực thi.

**Accessors**

Accessor là những lệnh cho phép người dùng lưu trữ các giá trị nhất định vào một biến do người dùng xác định. Những giá trị được lưu trữ này có thể được sử dụng sau này để tạo các xác nhận.

Ví dụ, lệnh  “storeAllLinks” đọc và lưu trữ tất cả các đường dẫn liên kết có sẵn trong một trang web thành một biến nào đó do người dùng xác định. 

**Assertions**

Assertions khá giống với Accessors vì chúng không tương tác trực tiếp với ứng dụng. Assertions được sử dụng để xác minh trạng thái hiện tại của ứng dụng với trạng thái mong muốn.

**Các dạng của Assertions:**

**#1. assert –** đảm bảo rằng việc thực hiện kiểm tra sẽ bị chấm dứt trong trường hợp thất bại.

**#2. verify –** cho phép Selenium IDE tiếp tục thực hiện tập lệnh kiểm tra ngay cả khi xác minh không thành công.

**#3. wait for –** chờ đợi một điều kiện nhất định được đáp ứng trước khi thực hiện bước kiểm tra tiếp theo. Các điều kiện như : trang được tải thành công, tồn tại element nào đó .... 

**Một số lệnh Selenium IDE hay dùng**

![](https://images.viblo.asia/262d8a4a-9d58-4a1a-af2d-066300b90ffc.png)

Bài trên còn nhiều thiếu xót, nếu bạn quan tâm có thể xem bào viết gốc tại đây : https://www.softwaretestinghelp.com/selenium-ide-script-selenium-tutorial-3/
Ở bài viết trước, chúng ta đã học về cách tạo ra 1 kịch bản test đơn giản với Selenium IDE bằng tính năng Record, cũng như tìm hiểu về các câu lệnh cơ bản. Record chính là tính năng mạnh nhất và hữu ích của Selenium, tuy nhiên trong khi ghi lại các thao tác sẽ có nhiều phần tử web đặc biệt nào đó sẽ bị bị bỏ qua do Selenium không nhận biết hoặc lấy được thông tin. Cũng có nhiều trường hợp do phần tử không có id, bị trùng tên hay đơn giản chúng ta muốn check lại các thông tin của phần tử đã ghi nhận được. Do đó, trong bài hướng dẫn thứ 4, chúng ta sẽ tìm hiểu về cách cài đặt và đặc tính của 1 tool khác, hỗ trợ cho Selenium: có tên là Firebug.

## Giới thiệu chung - Firebug
Firebug là một dạng add-on của trình duyệt Mozilla Firefox. Tool này sẽ giúp chúng ta trong việc xác định hoặc kiểm tra cụ thể HTML, CSS  và các phần tử JavaScript trên một trang web. Nó sẽ giúp chúng ta xác định các phần tử duy nhất trên một trang web. Các phần tử này có thể được tim dựa trên các loại locator của chúng và sẽ được nói đến ở những phần tiếp theo của bài hướng dẫn này.

## Cách cài đặt Firebug
Cách thức để cài đặt Firebug như sau:

**Bước 1:** Mở trình duyệt Mozilla Firefox và mở trang để [download Firebug](https://addons.mozilla.org/en-US/firefox/addon/firebug/). 

**Bước 2:** Kích "Add to Firefox" trên trang.
![](https://images.viblo.asia/ba856edf-505a-42fc-b5a1-08538d89f805.jpg)

**Bước 3:** Sau khi kích "Add to Firefox", trình duyệt sẽ tiến hành download add-on

![](https://images.viblo.asia/5bcfd11c-d66d-4766-9ff8-e5151bfa222f.jpg)

**Bước 4:** Kích "Install" để tiến hành cài đặt. Sau khi cài đặt thành công sẽ hiển thị popup thông báo.

![](https://images.viblo.asia/4d116d8e-7d30-49d4-98ae-b3862c180d65.jpg)

Lưu ý: Không cần restart lại trình duyệt Firefox để bắt đầu sử dụng Firebug.

**Bước 5:** Để sử dụng Firebug, chúng ta có thể thực hiện các cách sau:
* Nhấn phím F12
* Kích vào icon Firebug ở phía góc phải của cửa sổ Firefox. Khi chưa bật, icon có màu xám. Khi Fifefox được bật lên thì được highlight màu cam.

![](https://images.viblo.asia/ac84874b-a414-4c0c-b8f3-d0191f340a76.jpg)
* Kích vào menu bar của trình duyệt Firefox > Web Developer > Firebug > Open Firebug.
* Kích chuột phải trên cửa sổ Firefox, chọn "Inspect Elements with Firefox"

Màn hình của Firebug hiển thị ở phía dưới.
![](https://images.viblo.asia/5a9e2a4b-b9aa-4922-bef5-07a229e1d266.jpg)

## Tạo kịch bản Selenium với Firebug
Không giống với Selenium IDE, chúng ta tạo ra kịch bản kiểm thử tự động thủ công bằng cách thêm nhiều bước test để tạo thành một kịch bản logic và hoàn chỉnh. Để dễ hiểu, hãy cùng theo dõi cách thực hiện sau đây:

**Kịch bản:**

* Mở trang web: http://login.me.zing.vn/
* Check title của website
* Thực hiện đăng ký tài khoản

### 1. Mở trang web.

**Bước 1:** Mở trình duyệt Firefox, sau đó mở Selenium IDE

**Bước 2:** Nhập đường dẫn của trang cần test "http://login.me.zing.vn/" vào ô Base URL. 

![](https://images.viblo.asia/d0f7177d-efa9-47ae-b588-e20541c4db9b.jpg)

Lưu ý: Thông thường khi mở Selenium IDE thì icon Record luôn mặc định bật lên (icon màu đỏ được highligh background màu xanh) và sẽ bắt đầu ghi nhận khi người dùng có tương tác với trình duyệt. Do đó hãy nhớ tắt đi (bỏ highligh background và chuyển sang màu đỏ đậm)

**Bước 3:** Áp dụng 1 trong 4 cách đã giới thiệu ở trên để mở Firebug. Thông thường sẽ sử dụng phím tắt F12 sẽ nhanh chóng và thuận tiện hơn.

![](https://images.viblo.asia/e9155261-a3ea-4093-ae10-fa509a7191f9.jpg)

**Bước 4:** Quay trở lại với màn hình Selenium đang mở, tại vùng Editor, hãy chắc chắn đang mở tab Table, chúng ta sẽ click vào dòng lệnh trống đầu tiên.

![](https://images.viblo.asia/6f760c4d-5f6b-4323-bb94-3f4194950c32.jpg)

**Bước 5:** Tại ô Command cả vùng Editor Pane, chúng ta gõ lệnh "open". Đây là 1 câu lệnh nhằm mở ra một trang web/url bất kỳ trên trình duyệt Firefox.

![](https://images.viblo.asia/99662fb6-8f29-4fe4-aebe-4f345a7a374c.jpg)

Lư ý: 
* Khi chúng ta gõ lệnh vào hộp Command, Selenium sẽ cung cấp thêm tính năng tự động chọn và hiển thị các câu lệnh phù hợp, điều này giúp người dùng sẽ dễ dàng hơn trong việc sử dụng lệnh.
* Ô Target có thể nhập url của 1 website, tuy nhiên ở trường hợp chúng ta đã nhập link trang web ở trường Base URL thì có thể bỏ qua Target, chỉ sử dụng lệnh "open".

### 2. Check Title của trang web.

**Bước 6:** Bây giờ chúng ta sẽ quay trở về với Firebug, kích vào "+" phần "head" để mở các nội dung HTML bên trong. Chú ý các HTML có tag <title>. Vậy để tìm ra được title của trang web, chúng ta sẽ tìm đến giá trị của thẻ <title>.
    
![](https://images.viblo.asia/51f2aa51-702f-47e1-8f1a-aa8bb6a3127c.jpg)

Sau khi tìm thấy, chúng ta sẽ copy title của trang web "Zing Me - Mạng xã hội & giải trí online lớn nhất Việt Nam".

**Bước 7:** Tiếp tục quay trở lại với Selenium IDE, click vào dòng lệnh trống phía dưới lệnh "open". Sau đó, chúng ta gõ lệnh "assertTitle" ở hộp Command. Đây là lệnh cho phép trả về tên của trang web hiện tại, đồng thời so sánh nó với một title cụ thể nào đó. Áp dụng bài toán của chúng ta như sau:

![](https://images.viblo.asia/3f727ce7-ea55-473b-bba5-15bd1eb1b586.jpg)

**Bước 8:** Sử dụng title đã copy ở bước 6, chúng ta paste vào hộp Target.

![](https://images.viblo.asia/cb10b601-be8f-495b-80fe-fe62e4750636.jpg)

Lưu ý: với câu lệnh này chúng ta không sử dụng Value - theo đúng format của lệnh. Để biết  1 cách chi tiết về định dạng từng câu lệnh, sau khi kích vào câu lệnh bất kỳ, dưới vùng......

### 3. Đăng ký tài khoản.

Để nhập thông tin tài khoản, chúng ta sẽ xác định từng target hay chính là các trường trên màn hình. Có 2 cách thức xác định như sau:
- Đưa chuột vào textbox/button hay bất cứ control nào muốn xác định, sau đó kích chuột phải rồi chọn "Inspect Element with Firebug".

![](https://images.viblo.asia/d12b847a-b5dc-46ff-90ee-3d252f6d384c.jpg)

- Trên màn hình Firebug đang mở, kích vào icon mũi tên trên cùng góc bên tay trái, sau đó click chuột vào control muốn xem thông tin. 

![](https://images.viblo.asia/61a77524-f207-4f82-b53a-ec8e88b1dd5d.jpg)

**Bước 9:** Áp dụng một trong hai cách trên chúng ta sẽ thấy thông tin của link text "Đăng ký tài khoản" với "id = btnRegister" và copy thông tin này.

![](https://images.viblo.asia/8e4a1be4-8fe9-4852-bb1a-9b365ed3c2fa.jpg)

Quay trở lại với Selenium IDE, kích vào dòng lệnh trống ngay phía dưới, sau đó:
- Command: gõ lệnh "clickAndWait" - lệnh kích vào 1 control nào đó và chờ khi nó hoàn thành.
- Target: paste id của button "Đăng ký tài khoản".

![](https://images.viblo.asia/4c270943-2754-4d08-b1f9-f839c5389d85.jpg)

**Bước 10:** Trên màn hình Đăng ký tài khoản, chúng ta sẽ lần lượt thao tác như ở Bước 9 để tìm ra id  của các phần tử trên trang web. 

![](https://images.viblo.asia/f71e2337-bb78-412d-9511-050c3ed9169e.jpg)

Ta có thể dễ dàng nhận thấy mỗi phần tử HTML đều có các thuộc tính để nhận dạng nhất định - thường có 4 thuộc tính (ID, type, placeholder và name). Tùy thuộc vào người dùng chọn một hoặc nhiều thuộc tính để xác định phần tử web - khuyến khích sử dụng ID.

Sau đó quay trở lại với Selenium IDE, chúng ta sẽ kích vào từng dòng lệnh trắng phía dưới để hoàn thành thao tác insert câu lệnh. (Kết quả đoạn lệnh này giống với bài tập chúng ta đã record ở [bài hướng dẫn trước](https://viblo.asia/p/tao-kich-ban-test-voi-selenium-ide-selenium-tutorial-3-4dbZNE78KYM)).

![](https://images.viblo.asia/9bde4928-79a3-44f3-a980-5e32eee4eb1d.jpg)

Lưu ý:
- Các trường text, khi cần nhập dữ liệu sẽ sử dụng lệnh "type".
- Các trường dạng list để chọn như combobox: sử dụng lệnh "select".
- Các trường dạng checkbox hay button: sử dụng lệnh "click".
- Selenium IDE phân biệt chữ hoa chữ thường, do đó hãy nhập giá trị thuộc tính một cách cẩn thận và chính xác giống như được hiển thị trong mã HTML.
- Sau khi nhập Target, có thể sử dụng button Find để xác minh lại thông tin, vị trí của phần tử đó .
- Một số các element không có ID chúng ta sẽ lấy theo xpath. Các cách thức xác định chi tiết sẽ được giới thiệu ở bài sau.

**Bước 11:** Sau khi viết hoàn chỉnh các lệnh chúng ta sẽ tiến hành cho chạy để kiểm tra 

![](https://images.viblo.asia/115f34ac-46a3-4ab1-8cfe-08768c9d247a.jpg)

## Kết luận

Trong bài giới thiệu này, chúng ta đã cùng làm quen với cách tạo ra kịch bản test bằng Selenium IDE nhưng không sử dụng tính năng record. Chúng ta hoàn toàn thực hiện thủ công từ việc gõ lệnh đến việc tìm kiếm các phần tử trang web với công cụ Firebug. Hy vọng bài viết sẽ giúp các bạn hiểu và nắm được cách thức thực hiện và áp dụng cho chương trình của mình trong việc test.

Nguồn bài viết: https://www.softwaretestinghelp.com/firebug-for-selenium-scripts-selenium-tutorial-4/
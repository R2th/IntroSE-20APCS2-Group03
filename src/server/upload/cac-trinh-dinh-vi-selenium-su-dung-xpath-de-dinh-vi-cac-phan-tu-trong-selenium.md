Trình định vị có thể được gọi là một địa chỉ xác định một thành phần web duy nhất trong trang web. Các trình định vị là các thuộc tính HTML của một thành phần web, thông báo cho Selenium về thành phần web mà nó cần để thực hiện hành động.

Có rất nhiều các thành phần web. Phổ biến nhất trong số đó là:
* Text box
* Button
* Drop Down
* Hyperlink (siêu liên kết)
* Check Box
* Radio Button

## Các loại Locator

Các câu lệnh của Selenium đều yêu cầu phải định vị các phần tử web để có thể tìm kiếm. Hơn thế, việc xác định phần tử luôn là một chủ đề khá khó, do đó nó yêu cầu một phương pháp hiệu quả và chính xác. Để xác định những phần tử này chúng ta có các loại Locator sau:

![](https://images.viblo.asia/5f5ceec1-6a8a-4026-bc31-65f16257adaf.jpg)

### Định vị theo ID

Đây là phương thức định vị các phần tử web phổ biến nhất và tốt nhất, được sử dụng nhiều nhất từ trước đến nay. Trong 1 trang web, mỗi 1 phần tử sẽ có 1 ID riêng và là duy nhất.

![](https://images.viblo.asia/fe6bc17f-5a9d-4007-a891-68988c4e2854.jpg)

Trong ví dụ dưới đây, chúng ta đang cần truy cập vào text box "Email" ở trong form login của trang gmail.com. Việc đầu tiên là cần:

**a. Sử dụng Firebug để tìm ID của textbox "Email"**

**Bước 1**: Mở trình duyệt (Firefox) và truy cập đường link “https://accounts.google.com/”.

**Bước 2**: Mở firebug (nhấn F12)

**Bước 3:** Click chuột vào icon "inspect" để xác định phần tử web

![](https://images.viblo.asia/fffa1a39-0c42-4abb-87c8-254af0f0dee2.jpg)

**Bước 4:** Trỏ chuột vào textbox "Email". Ở firebug section, bạn sẽ thấy thẻ HTML tương ứng của textbox này được highlight lên
=> ID của phần tử đang truy cập : id="Email" (Cú pháp : id ="id_of_the_element") (hình duới đây)

![](https://images.viblo.asia/ffcb3775-fec8-4cee-be36-8a9dcdaabbdb.jpg)

Bằng việc tìm kiếm trong HTML code, chúng ta có thể xác nhận được rằng ID vừa tìm thấy là duy nhất.

*Cách tiếp cận khác:*

Thay vì thực hiện từ bước 2 đến bước 4 ở trên, chúng ta có thể  định vị/inspect trực tiếp phần tử web bằng việc click chuột phải vào phần tử web cần kiểm tra (trong ví dụ này là textbox Email), sau đó click option “Inspect Element with Firebug”. Sự kiện này sẽ mở rộng firebug section và làm highlight thẻ HTML của phần tử tương ứng.

![](https://images.viblo.asia/3b5c3bdf-79a6-4535-9e49-5fec00819a55.jpg)

**b. Xác minh giá trị định vị:**

Giả sử rằng trình duyệt đang mở và đang ở trang "https://accounts.google.com/".

**Bước 1:** Khởi chạy Selenium IDE.

**Bước 2:** Click vào dòng đầu tiên trong vùng Editor

**Bước 3:** Gõ “id=Email” (id của phần tử web vừa lấy ở trên) vào trường Target 

**Bước 4:** Click nút Find. Nếu giá trị định vị đã cung cấp là chính xác thì textbox Email sẽ được highlight màu vàng với viền xanh xung quanh. Còn nếu giá trị định vị không chính xác thì hiển thị thông báo lỗi trong ngăn nhật ký ở dưới cùng của Selenium IDE (ảnh dưới đây)

**Case 1** – Locator Value = Correct (giá trị định vị đã cung cấp là chính xác)

![](https://images.viblo.asia/2a3cbaf7-3971-4636-a19d-cc06e4a3f29a.jpg)

**Case 2** – Locator Value = Incorrect (giá trị định vị đã cung cấp không chính xác)

![](https://images.viblo.asia/8d1eea76-5f3d-47d3-8d2f-b42de4abbfe6.jpg)

Để xác minh thêm, bạn có thể nhập 1vài giá trị vào trong mục "Value" ngay dưới mục "Target" (đang được nhập "id=Email"). Sau khi nhập vào mục "Value", nếu textbox Email tương ứng cũng tự động được nhập text giống mục "Value" thì chứng tỏ giá trị định vị cũng cấp là chính xác và có thể truy cập được.

### Định danh theo ClassName

ClassName cũng là 1 loại locator  để xác định phần tử trên Web giống ID ở trên. Chỉ khác chỗ trong 1 trang web : ID thì là duy nhất cho mỗi phần tử, còn có thể có nhiều phần tử có ClassName giống nhau. Trong 1 trang web, thường những phần tử có liên quan hoặc có sự tương đồng thì hay được đặt tên class giống nhau (1 họ ...).
Trong trường hợp chúng ta muốn tìm 1 tập các phần tử chung nào đó thì có thể sử dụng locator ClassName này.

Trong ví dụ dưới đây chúng ta sẽ định vị đường link “Need Help?” - được hiển thị ở phía dưới của form login trên.

**a. Sử dụng Firebug để tìm classname của 1 phần tử web**

**Bước 1:** Click chuột phải vào phần tử web cần kiểm tra (trong ví dụ này là link text “Need help?”), sau đó click option “Inspect Element with Firebug”. Sự kiện này sẽ mở rộng firebug section và làm highlight thẻ HTML của phần tử tương ứng.

**Bước 2:** Ở thẻ HTML được highlight phía trên, xác định giá trị class name của phần tử này:

![](https://images.viblo.asia/9dcd6058-abd1-48fd-90e3-d8ce25863d85.jpg)

***Cú pháp*** : class = classname of the element

Nhìn vảo ảnh trên, chúng ta dễ dàng xác định được classname = “need-help-reverse”

**b. Xác minh giá trị định vị:**

**Bước 1:** Gõ “class= need-help-reverse” (class name của phần tử web vừa lấy ở trên) vào mục Target của Selenium IDE.

**Bước 2:** Click nút Find của Selenium IDE. Nếu giá trị định vị đã cung cấp là chính xác thì textlink "Need help?" sẽ được highlight màu vàng với viền xanh xung quanh. Còn nếu giá trị định vị không chính xác thì hiển thị thông báo lỗi trong ngăn nhật ký ở dưới cùng của Selenium IDE (ảnh dưới đây)

![](https://images.viblo.asia/dda0d3d5-7d1a-4edd-bf22-c4b2e02d5832.jpg)

### Định danh theo Name

Việc sử dụng thuộc tính "name" để xác định phần tử cũng giống hai loại trên (ID và ClassName), chỉ khác ở cú pháp. Tương tự như ID, tên của các phần tử thường là duy nhất, không thay đổi sau những lần refresh, cũng khá đơn giản dễ sử dụng.

Ví dụ, chúng ta sẽ sử dụng thuộc tính "name" để định vị textbox “Password” trong form login trên.

**Cú pháp**: name = name of the element

Thực hiện các bước tương tự như trên, sử dụng Firebug chúng ta sẽ dễ dàng tìm ra được textbox "Password" có name = “password”

![](https://images.viblo.asia/2bf14a62-4caf-4deb-820d-18733ff2a682.png)

**Xác minh giá trị định vị:**

**Bước 1:** Gõ “name= password”  (name của textbox "Password" vừa lấy ở trên) vào mục Target của Selenium IDE.

**Bước 2:** Click nút Find của Selenium IDE =>  textbox "Password" sẽ được highlight màu vàng với viền xanh xung quanh.
Thay đổi thành 1 giá trị định vị không chính xác (ví dụ “name= passwordabc” ...) thì sẽ hiển thị thông báo lỗi trong ngăn nhật ký ở dưới cùng của Selenium IDE.

### Định danh theo Link Text

Đây là cách để xác định/tìm ra các đường dẫn/siêu liên kết. Bất cứ siêu liên kết nào cũng đều gắn với thẻ neo "<a>...</a>" (Cấu trúc của 1 đường dẫn trong HTML code : (<a>{content_displayed}</a>))
    
Ví dụ, đang cần xác định đường dẫn “Create an account” trong form login trên.

**a. Sử dụng Firebug để tìm link text của 1 phần tử web**

**Bước 1:** Click chuột phải vào phần tử web cần kiểm tra (trong ví dụ này là link text “Create an account”), sau đó click option “Inspect Element with Firebug”. Sự kiện này sẽ mở rộng firebug section và làm highlight thẻ HTML của phần tử tương ứng.

**Bước 2:** Ở thẻ HTML được highlight phía trên, xác định giá trị link text của phần tử này: chính là text hiển thị bên trong thẻ "<a>...</a>"

Cú pháp: link = link text of the element

Trong ví dụ này, link text là “Create an account” (ảnh dưới đây).

![](https://images.viblo.asia/661be495-dcc0-43bb-8c5a-3ce276d5c569.jpg)

**Xác minh giá trị định vị:**

**Bước 1:** Gõ “link=Create an account”  (link text của đường dẫn "Create an account" vừa lấy ở trên) vào mục Target của Selenium IDE.

**Bước 2:** Click nút Find của Selenium IDE =>  đường dẫn "Create an account" sẽ được highlight màu vàng với viền xanh xung quanh.

![](https://images.viblo.asia/6e10c5c0-5820-4a94-b934-675eed487a98.jpg)

### Sử dụng XPath như 1 Locator

Xpath được sử dụng để định vị một phần tử web dựa trên đường dẫn XML của nó. XPath là viết tắt của ngôn ngữ đánh dấu XML, được sử dụng để lưu trữ, sắp xếp và vận chuyển dữ liệu tùy ý. Nó lưu trữ dữ liệu trong một cặp key-value rất giống với các thẻ HTML. Nó là một ngôn ngữ truy vấn để chọn các node từ một tài liệu XML. XPath dựa trên biểu diễn cây của các tài liệu XML và cung cấp khả năng điều hướng xung quanh cây bằng cách chọn các node bằng cách sử dụng nhiều tiêu chí khác nhau. Đây là một sự lựa chọn phổ biến vì tính linh động của nó.

Đây có thể coi là kỹ thuật hiệu quả nhất, có thể xác định tất cả các phần tử web kể cả các phần tử không thể định vị được bằng CSS (những phương pháp định vị phía trên). Tuy nhiên, khi có sự thay đổi trong cấu trúc trang thì bạn sẽ cần phải update lại thông tin các phần tử liên quan trong file XML này.

(to be continue ...)
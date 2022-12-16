Ở bài hướng dẫn trước, chúng ta đã tìm hiểu về các loại Locators khác nhau, cũng như cách sử dụng ID, ClassName, Name, Link Text và XPath để xác định các phần tử web. Trong bài viết hôm nay, chúng ta sẽ làm quen với cách sử dụng CSS Selector như một Locator.
Trước khi đi vào nội dung chính, chúng ta sẽ cùng tìm hiểu kiến thức cơ bản về CSS, HTML

## CSS là gì?

CSS - Cascading Style Sheet - Là tập tin định dạng theo tầng dùng để thiết lập bố cục của trang web bằng các thẻ HTML - hay chính là sử dụng CSS để thay đổi cách hiển thị: vị trí, màu sắc, text... của trang web.

Trong việc xây dựng giao diện của Website, HTML và CSS được các Lập trình viên Frontend sử dụng để triển khai từ bản file thiết kế như Photoshop. 

**Các loại CSS thông dụng gồm**:
* *Background*: là CSS để chỉnh hình/ màu nền.
* *Text*: tùy chỉnh hiển thị text
* *Font*: tùy chỉnh kích thước, kiểu chữ
* *Link*: tùy chỉnh các liên kết
* *List*: tùy chỉnh danh sách
* *Table*: tùy chỉnh dạng bảng biểu
* *Box model*: các dạng hiển thị theo box, có thể tùy chỉnh padding, margin, border
* ...

**Cú pháp CSS**:

Mỗi đoạn mã CSS sẽ được chia làm 2 phần:

![](https://images.viblo.asia/18b15ed9-c792-462d-86f0-d0fb0583f1c9.jpg)

* Selector: phần này sẽ trỏ tới các đối tượng chịu ảnh hưởng của CSS. Thông thường các đối tượng này dưới dạng HTML.
* Declaration: là các thuộc tính CSS được dùng để tạo thành style: màu sắc... cho thẻ selector trên.
## CSS Selector là gì?
Selector được sử dụng để truy vấn đến các thẻ HTML nhằm tác động lên chúng. Tuy nhiên trong cùng 1 file HTML có rất nhiều các thẻ giống nhau và thường chúng sẽ được phân biệt với nhau bởi ID, Class. Cách thức sử dụng ID và Class để truy xuất được gọi là Selector.

Các thủ tục để tạo CSS Selector và Xpath là tương tự như nhau, nó chỉ khác nhau về giao thức xây dựng.

Giống như Xpath, CSS selector cũng có thể định vị các phần tử web không có ID, class hoặc Name. Các loại CSS Selector cơ bản: 

![](https://images.viblo.asia/3d4bea55-f8c7-4f15-a61f-6436957b0af6.jpg)

## CSS Selector: ID
Như chúng ta đã biết thì mỗi phần tử trên web đều được phân biệt bằng thuộc tính ID - nó cụ thể và ko bị trùng lặp.

**Cú pháp:  css=<HTML tag><#><Giá trị của thuộc tính ID>**
* HTML tag - chính là phần tử web mà chúng ta muốn tương tác
* '#' - được sử dụng để tượng trưng cho thuộc tính ID. Lưu ý: bắt buộc phải có # nếu sử dụng thuộc tính ID để tạo CSS Selector.
* Giá trị của thuộc tính ID - là giá trị của ID sẽ được truy cập
* Luôn có '#' trước ID. 

**Lưu ý:**
* Khi sử dụng CSS Selector trong hộp Target của Selenium IDE, luôn nhớ tiền tố "css=".
* Thứ tự của các thành phần trong cú pháp - không được phép thay đổi
* Nếu có hơn 2 phần tử có cùng tag HTML và giá trị thuộc tính thì luôn mặc định xác định phần tử đầu tiên.

Tiếp tục áp dụng các ví dụ trước với trang web: https://id.zing.vn/v2/register

* **Tạo CSS Selector cho phần tử web**: Mở link của màn hình đăng nhập trên trình duyệt Firefox. Chuột phải vào phần tử cần xác định và chọn "Inspect Element with Firebug" - ví dụ trường "Họ tên". HTML tag là "input" và giá trị của ID là "regacc_fullname" - cả hai đều đề cập tới "Họ tên Textbox". 

![](https://images.viblo.asia/5be8c8fd-d68e-4f79-a00f-47354e816f72.jpg)

* **Xác định giá trị locator**: Mở Selenium IDE. Tại vùng Target, gõ "css=input#regacc_fullname", sau đó click nút Find. Trường Họ tên sẽ được highlight lên.

![](https://images.viblo.asia/6887ab40-1bf6-4fc1-8464-fd7377930e79.jpg)

## CSS Selector: Class
Cũng giống như ID, Class cũng là một thuộc tính dùng để xác định một phần tử nào đó trên trang. Tuy nhiên, Class có thể sử dụng cho nhiều phần tử trên trang HTML, còn ID thì chỉ được sử dụng cho 1 phần tử duy nhất. Áp dụng Class khi người dùng muốn check một loạt các phần tử trong đó như check màu nền, text...

**Cú pháp:  css=<HTML tag><.><Giá trị của Class>**
* "." - được sử dụng để biểu trưng cho thuộc tính Class (giống như ID sẽ sử dụng #). Bắt buộc có "." khi sử dụng thuộc tính Class để tạo CSS Selector.
* Luôn có dấu "." trước giá trị của Class.

Tiếp tục áp dụng các ví dụ trước với trang web: https://id.zing.vn/v2/register

* **Tạo CSS Selector cho phần tử web**: Mở link của màn hình đăng nhập trên trình duyệt Firefox. Chuột phải vào phần tử cần xác định và chọn "Inspect Element with Firebug" - ví dụ nút "Kiểm tra". HTML tag là "a" và giá trị của Class là "checkusernamebtn" - cả hai đều đề cập tới "Kiểm tra button". 

![](https://images.viblo.asia/9a2264e4-d305-45f8-936d-51b7a306ceec.jpg)

* **Xác định giá trị locator**: Mở Selenium IDE. Tại vùng Target, gõ "css=a.checkusernamebtn", sau đó click nút Find. Trường Kiểm tra btn sẽ được highlight lên.

![](https://images.viblo.asia/ed98e221-f635-4af1-a8b3-da9f72e24996.jpg)

## CSS Selector: Attribute
Đây là cách xác định các phần tử web bằng những thuộc tính khác trong thẻ HTML mà không cần khai báo ID hay Class. Một cách chính xác hơn đó là sẽ sử dụng giá trị của thuộc tính để xác định phần tử nào đó trên trang web.

**Cú pháp:  css=<HTML tag><[Thuộc_tính=giá trị của thuộc tính]>**
*     Thuộc tính - đó là thuộc tính mà chúng ta sẽ sử đụng để tạo CSS Selector. Nó có thể là value (giá trị), type, name... Lưu ý: nên sử dụng một thuộc tính mà giá trị của nó có thể xác định duy nhất một phần tử web.
*     Giá trị của thuộc tính - giá trị của thuộc tính mà ta đang muốn truy cập.

Tiếp tục áp dụng các ví dụ trước với trang web: https://id.zing.vn/v2/register

* **Tạo CSS Selector cho phần tử web**: Mở link của màn hình đăng nhập trên trình duyệt Firefox. Chuột phải vào phần tử cần xác định và chọn "Inspect Element with Firebug" - ví dụ Radio button "Nam". HTML tag là "input", attribute - thuộc tính- là "value" và giá trị của thuộc tính đó là "1" - tất cả đều đề cập tới "Radio button Nam". 

![](https://images.viblo.asia/f9ab801b-60d1-48d8-9e40-e08c03243305.jpg)

* **Xác định giá trị locator**: Mở Selenium IDE. Tại vùng Target, gõ "css=input[value=1]", sau đó click nút Find. Trường Radio button Nam sẽ được highlight lên.

![](https://images.viblo.asia/e256844f-b20f-4d7b-8a75-5042011f5089.jpg)

## CSS Selector: ID/Class và Attribute
Là sự kết hợp giữa ID hoặc Class với Attribute để xác định phần tử trên web hiệu quả hơn. Tuy nhiên việc kết hợp này cũng ảnh hưởng tới tốc độ của Selector khi truy vấn.

Cú pháp: css=<HTML tag><. Hoặc #><Giá trị của Class hoặc ID><[Thuộc tính=Giá trị của thuộc tính]>
* Nếu sử dụng Class kết hợp với Atrribute, có "." trước giá trị Class. Nếu kết hợp ID và Attribute thì sẽ thay thế "." bằng "#".
* Trường hợp có nhiều hơn 2 thuộc tính thì vẫn có thể sử dụng cú pháp trên. Ví dụ: css=<HTML tag><. Hoặc #><Giá trị của Class hoặc ID><[Thuộc_tính_1=Giá_trị_của_thuộc_tính_1][Thuộc_tinh_2=Giá_trị_của_thuộc_tính_2][...]...>
    
Tiếp tục áp dụng các ví dụ trước với trang web: https://id.zing.vn/v2/register

* **Tạo CSS Selector cho phần tử web**: Mở link của màn hình đăng nhập trên trình duyệt Firefox. Chuột phải vào phần tử cần xác định và chọn "Inspect Element with Firebug" - ví dụ trường "Mật khẩu". HTML tag là "input", Giá trị của ID là "regacc_pwd", attribute 1 là "type" với giá trị của thuộc tính đó là "password", attribute 2 là "name" với giá trị "pwd" - tất cả đều đề cập tới "Textbox Mật khẩu". 

![](https://images.viblo.asia/5e31d136-206a-49f7-b223-00a56d71bce4.jpg)

* **Xác định giá trị locator**: Mở Selenium IDE. Tại vùng Target, gõ "css=input#regacc_pwd[type='password'][name='pwd']", sau đó click nút Find. Trường "Mật khẩu" sẽ được highlight lên.

![](https://images.viblo.asia/8804515e-6315-4d0e-9ef8-62e4e7b3bba2.jpg)

## CSS Selector: Sub-string
Trường hợp người dùng muốn xác định các phần tử mà giá trị của thuộc tính có thể bắt đầu, kết thúc hoặc chứa một giá trị hay một đoạn ký tự nào đó, chúng ta sẽ sử dụng substring để tạo CSS Selector. Có 3 cách để tạo dựa trên cơ chế xác định sự phù hợp với substring.

**Các loại cơ chế:**

Những cơ chế được liệt kê dưới đây mang tính chất tượng trưng, tương đối:
* Khớp Tiền tố - Prefix.
* Khớp Hậu tố - Suffix.
* Khớp 1 chuỗi.

***1. Khớp với Tiền tố - Prefix***

Thường được sử dụng để so sánh và tìm ra các phần tử mà giá trị của nó bắt đầu với chuỗi cho trước.

**Cú pháp: css=<HTML tag><[Thuộc tính^=Chuỗi tiền tố]>**.
* ^ - ký hiệu để xác định khớp với tiền tố.
* Tiền tố - là chuỗi bắt đầu của giá trị thuộc tính.

Ví dụ: Xác định trường Mật khẩu "css=input#regacc_pwd[type^='pass']".

***2. Khớp với Hậu tố - Suffix***

Ngược với dạng trên thì ở loại này chúng ta sẽ xác định các phần tử web mà giá trị của chúng kết thúc bằng chuỗi nhất định.

**Cú pháp: css=<HTML tag><[Thuộc tính$=Chuỗi hậu tố]>**.
* $ - ký hiệu để xác định khớp với hậu tố.
* Hậu tố - là chuỗi kết thúc của giá trị thuộc tính.

Ví dụ: Xác định trường Mật khẩu "css=input#regacc_pwd[type$='ord']".

***3. Khớp với 1 chuỗi***

Với loại cuối cùng, chúng ta sẽ xác định phần tử web mà giá trị của chúng có chứa 1 chuỗi nhất định.

**Cú pháp: css=<HTML tag><[Thuộc tính*=Chuỗi]>**.
* $ - ký hiệu để xác định khớp với hậu tố.
* Chuỗi - là chuỗi nằm trong giá trị thuộc tính.

Ví dụ: Xác định trường Mật khẩu "css=input#regacc_pwd[type*='ss']".

## CSS Selector: Inner text

InnerText là một thuộc tính được sử dụng trên web để xuất các văn bản động như xuất tin nhắn xác nhận...

**Cú pháp: css=<HTML tag><:><contains><(text)>**.
* : - tượng trưng cho phương thức chứa.
* Contains - là giá trị của một thuộc tính Class được truy cập.
* Text - văn bản hiển thị ở bất cứ đâu trên trang web.

Đây là một trong những cách được sử dụng nhiều nhất để định vị các phần tử web vì nó có cú pháp khá đơn giản.

Một số trường hợp do element bị trùng class nhưng khác div thì có thể sử dụng phân cấp để tìm một cách chính xác. Ví dụ:

![](https://images.viblo.asia/5b55d059-d93d-46eb-a444-57a71e08c321.jpg)

Trên thực tế để hiểu và sử dụng được CSS cũng như Xpath thì chúng ta cần nhiều thời gian để học chi tiết và thực hành. Do đó bài viết trên chỉ giới hạn ở mức cơ bản để có thể sử dụng khi tạo script với Selenium IDE. Các bạn có thể tìm hiểu sâu hơn với những bài viết về chủ đề này trên trang Viblo.asia.

Nguồn bài viết: https://www.softwaretestinghelp.com/css-selector-selenium-locator-selenium-tutorial-6/
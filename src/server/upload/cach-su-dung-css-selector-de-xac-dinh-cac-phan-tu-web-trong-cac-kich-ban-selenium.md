Trước khi đi vào chi tiết chúng ta cùng tìm hiểu:

## CSS Selector là gì?

Trong CSS, selector (bộ chọn) là mẫu (được định nghĩa trước đó) để chọn phần tử HTML mà bạn muốn định nghĩa style cho chúng. Phần tử web nào muốn theo style của mẫu này thì chỉ cần gán tên selector mẫu này cho chúng là xong. Ví dụ:
* Phần tử tiêu đề h1, h2 ...
* Thuộc tính id và class của các phần tử : (#commonID, .commonClass ...). Lưu ý trong 1 layout thì thuộc tính id là duy nhất, khi có nhiều hơn 1 phần tử thì nên sử dụng thuộc tính class.
* Các phần tử dựa vào mối liên quan với các phần tử khác trong cây phân cấp tài liệu.
Ví dụ:
```
<head>
<meta charset="utf-8"> 
<style>
.dammio.dammio1 { color:red; }
</style>
</head>
 
<body>
<div class="dammio dammio1">
    Nội dung ví dụ --- dammio.com
</div>
</body>
```

## Sử dụng CSS Selector như một Locator:

CSS Selector là sự kết hợp giữa bộ chọn thành phần (element selector) và giá trị bộ chọn (selector value); dùng để xác định thành phần web. Tổng hợp của một bộ chọn phần tử và giá trị bộ chọn được gọi là Selector Pattern.

Selector Pattern được xây dựng bằng thẻ HTML, thuộc tính và giá trị của chúng. Thủ tục tạo CSS Selector và Xpath rất giống nhau, đều dựa trên sự khác biệt duy nhất trong giao thức xây dựng của chúng.

Giống như Xpath, bộ chọn CSS cũng có thể định vị các thành phần web không có : ID, lớp hoặc Tên.

Các loại CSS selector:

![](https://images.viblo.asia/a1b3da95-4450-4ba8-a923-a63870b919bc.jpg)

## CSS Selector: ID

Trong ví dụ này, chúng ta sẽ truy cập vào hộp văn bản "Email" trong biểu mẫu đăng nhập tại Gmail.com.

Hộp văn bản Email có thuộc tính ID có giá trị là "Email". Do đó, thuộc tính ID và giá trị của nó có thể được sử dụng để tạo CSS Selector để truy cập hộp văn bản email.

### Tạo CSS Selector cho thành phần web:

**Bước 1:** Locate/inspect phần tử web (trong trường hợp này là hộp văn bản "Email") : thẻ HTML là “input” và value của thuộc tính ID là “Email”, cả hai đều tham chiếu đến textbox "Email". Do đó, dữ liệu này sẽ được sử dụng để tạo CSS Selector (ảnh dưới đây)

![](https://images.viblo.asia/17b84c4d-f75a-4334-b23a-a381be9b6490.jpg)

### Verify (xác nhận) giá trị locator

**Bước 1:** Nhập giá trị của locator - text “css=input#Email”  vào trường Target của Selenium IDE và sau đó click nút "Find" => Textbox "Email" sẽ được highlight lên (hình dưới đây)

![](https://images.viblo.asia/0453b104-97ff-478d-b495-e06d23acf76b.jpg)

**Syntax:**

```
css=<HTML tag><#><Value of ID attribute>
```

* **HTML tag** – là thẻ được sử dụng để biểu thị thành phần web mà chúng ta muốn truy cập (trong ví dụ trên là thẻ input)
* **#** – Hash sign được sử dụng để tượng trưng cho thuộc tính ID (dấu hiệu nhận biết của ID). Bắt buộc phải sử dụng dấu # này nếu đang tạo CSS Selector theo ID.
* **Value of ID attribute** – value ID của phần tử đang được truy nhập.
* Giá trị của ID luôn được bắt đầu bằng dấu #

**Lưu ý:** Áp dụng cho cả những loại CSS Selector khác:
* Trong khi chỉ định CSS Selector trong hộp văn bản đích của Selenium IDE, hãy luôn nhớ đặt tiền tố "css=" trước nó.
* Trình tự của các phần trong syntax trên là không thể thay đổi.
* Nếu hai hoặc nhiều thành phần web có cùng thẻ HTML và giá trị thuộc tính, phần tử đầu tiên được đánh dấu trong source của page sẽ được chỉ định.

## CSS Selector: Class

Trong ví dụ này, chúng ta sẽ truy cập checkbox “Stay signed in” ở bên dưới biểu mẫu đăng nhập tại gmail.com.

Checkbox “Stay signed in” này có giá trị thuộc tính class là “remember". Do đó, thuộc tính class và giá trị của nó có thể được sử dụng để tạo CSS Selector để truy cập checkbox này.

Định vị 1 phần tử  bằng cách sử dụng class giống với sử dụng ID, chỉ khác 1 chút ở syntax:

### Tạo CSS Selector cho thành phần web:

**Bước 1:** Locate/inspect phần tử web (trong trường hợp này là checkbox “Stay signed in”) : thẻ HTML là “label” và value của thuộc tính class là “remember”, cả hai đều tham chiếu đến checkbox “Stay signed in”. Do đó, dữ liệu này sẽ được sử dụng để tạo CSS Selector.

### Verify (xác nhận) giá trị locator
​
**Bước 1:** Nhập giá trị của locator - text “css=label.remember”  vào trường Target của Selenium IDE và sau đó click nút "Find" => Checkbox “Stay signed in” sẽ được highlight lên (hình dưới đây)

![](https://images.viblo.asia/01733f10-b247-4aaf-8154-1ac19e25cb4e.jpg)

**Syntax:**
​
```
css=<HTML tag><.><Value of Class attribute>
```
​
* **HTML tag** – là thẻ được sử dụng để biểu thị thành phần web mà chúng ta muốn truy cập (trong ví dụ trên là thẻ label)
* **.** – Dấu chấm được sử dụng để tượng trưng cho thuộc tính class (dấu hiệu nhận biết của class). Bắt buộc phải sử dụng dấu "." này nếu đang tạo CSS Selector theo class.
* **Value of ID attribute** – value class của phần tử đang được truy nhập (trong ví dụ trên là "remember").
* Giá trị của class luôn được bắt đầu bằng dấu chấm.

## CSS Selector: Attribute

Trong ví dụ này, chúng ta sẽ truy cập vào nút "Sign in" hiển thị bên dưới biểu mẫu đăng nhập tại gmail.com.

Nút "Sign in" có một thuộc tính type có giá trị là “submit”. Do đó, thuộc tính type này và giá trị của nó  có thể được sử dụng để tạo CSS Selector để truy cập nút này.

### Tạo CSS Selector cho thành phần web:

**Bước 1:** Locate/inspect phần tử web (trong trường hợp này là button “Sign in”) : thẻ HTML là “input”, attribute là "type" và value của thuộc tính type này là “submit”, tất cả chúng đều tham chiếu đến button “Sign in”. Do đó, dữ liệu này sẽ được sử dụng để tạo CSS Selector.

### Verify (xác nhận) giá trị locator
​
**Bước 1:** Nhập giá trị của locator - text “css=input[type=’submit’]”  vào trường Target của Selenium IDE và sau đó click nút "Find" => button “Sign in” sẽ được highlight lên (hình dưới đây)

![](https://images.viblo.asia/68c1fd91-ddd4-45db-8f76-5f0823894df2.jpg)

**Syntax:**
​
```
css=<HTML tag><[attribute=Value of attribute]>
```
​
* **HTML tag** – là thẻ được sử dụng để biểu thị thành phần web mà chúng ta muốn truy cập (trong ví dụ trên là thẻ input)
* **Attribute** – Đây là thuộc tính bạn muốn sử dụng để tạo CSS Selector. Nó có thể là : type, value, name ... Nên chọn một thuộc tính có giá trị xác định duy nhất thành phần web (trong ví dụ này thì Attribute = "type")
* **Value of ID attribute** – value của thuộc tính của phần tử đang được truy nhập (trong ví dụ trên là "submit").

## CSS Selector: ID/Class và attribute (Kết hợp giữa ID/Class và attribute)

Trong ví dụ này, chúng ta sẽ truy cập vào textbox "Password" trong biểu mẫu đăng nhập tại gmail.com.

Textbox "Password" có một thuộc tính ID có giá trị là “Passwd” và thuộc tính "type" có giá trị là "password". Do đó, thuộc tính ID và type và các giá trị của chúng  có thể được sử dụng để tạo CSS Selector để truy cập textbox password này.

### Tạo CSS Selector cho thành phần web:

**Bước 1:** Locate/inspect phần tử web (trong trường hợp này là textbox “Password”) : thẻ HTML là “input”, thuộc tính là ID và "type", và value tương ứng của các thuộc tính này là ”Passwd” và “password”, tất cả chúng đều tham chiếu đến textbox “Password”. Do đó, dữ liệu này sẽ được sử dụng để tạo CSS Selector.

### Verify (xác nhận) giá trị locator
​
**Bước 1:** Nhập giá trị của locator - text “css=input#Passwd[name='Passwd']”  vào trường Target của Selenium IDE và sau đó click nút "Find" => textbox “Password” sẽ được highlight lên (hình dưới đây)

![](https://images.viblo.asia/4af7e722-4c95-4ddb-a862-9a9a1fe91565.jpg)


**Syntax:**
​
```
css=<HTML tag><. Or #><value of Class or ID attribute><[attribute=Value of attribute]>
```
​
* Các tham số tương tự như các cú pháp trên

Có thể kết hợp 2 hoặc nhiều thuộc tính dễ dàng theo cú pháp trên. Ví dụ:
*“css=input#Passwd[type='password'][name='Passwd']”*

## CSS Selector: Sub-string

CSS trong Selenium cho phép khớp chuỗi một phần và do đó có được một tính năng rất thú vị để tạo bộ CSS Selector bằng cách sử dụng các chuỗi con (Sub-string). Có ba cách tạo CSS Selector dựa trên cơ chế được sử dụng để khớp với chuỗi con:
* Match a prefix (khớp tiền tố)
* Match a suffix (khớp hậu tố)
* Match a substring (khớp substring)

### Match a prefix

**Syntax:**

`css=<HTML tag><[attribute^=prefix of the string]>`

* **^** – Ký hiệu tượng trưng để khớp với một chuỗi sử dụng tiền tố.
* **Prefix** – Đây là chuỗi dựa trên phương thức khớp nào được thực hiện. Tìm phần tử có thuộc tính bắt đầu với chuỗi được chỉ định.

Ví dụ : css=input#Passwd[name^='Pass'] (truy nhập vào input có ID là "Passwd", name có tiền tố là "Pass")

### Match a suffix
​
**Syntax:**
​
`css=<HTML tag><[attribute$=suffix of the string]>`
​
* **$** – Ký hiệu tượng trưng để khớp với một chuỗi sử dụng hậu tố.
* **Suffix** –  Đây là chuỗi dựa trên phương thức khớp nào được thực hiện. Tìm phần tử có thuộc tính kết thúc với chuỗi được chỉ định.
​
Ví dụ : css=input#Passwd[name$='wd'] (truy nhập vào input có ID là "Passwd", name có hậu tố là "wd")
​

### Match a substring

**Syntax:**
​
`css=<HTML tag><[attribute*=sub string]>`
​
* Dấu sao – Ký hiệu tượng trưng để khớp với một chuỗi substring.
* **Sub string** –  Đây là chuỗi dựa trên phương thức khớp nào được thực hiện. Tìm phần tử có thuộc tính có giá trị chứa chuỗi được chỉ định.

Ví dụ : css=input#Passwd[name*='ssw'] (truy nhập vào input có ID là "Passwd", name có chứa substring "ssw")

## CSS Selector: Inner text

Inner text giúp chúng ta xác định và tạo CSS Selector bằng cách sử dụng chuỗi mẫu (string pattern) mà thẻ HTML biểu thị trên trang web.

Ví dụ, link “Need help?” bên dưới mẫu đăng nhập tại gmail.com.

Thẻ neo đại diện cho đường link có một văn bản kèm theo. Do đó, văn bản này có thể được sử dụng để tạo CSS Selector để truy cập phần tử web được chỉ định.

**Syntax**:

`css=<HTML tag><:><contains><("inner text")>`

* **:** – Dấu hai chấm được sử dụng để biểu thị cho phương thức chứa (contains)
* **contains** – Giá trị của phương thức class của phần tử đang được truy cập.
* **text** – Text hiển thị của phần tử đang được truy cập.

Ví dụ : css=href:contains("Need help?") (truy nhập vào href có text là "Need help?")

### Lời kết

Trên đây chỉ là 1 số cách tạo CSS Selector phổ biến, bạn có thể tìm hiểu thêm nhiều cách khác nữa nhé.

Bài được dịch từ : https://www.softwaretestinghelp.com/css-selector-selenium-locator-selenium-tutorial-6/
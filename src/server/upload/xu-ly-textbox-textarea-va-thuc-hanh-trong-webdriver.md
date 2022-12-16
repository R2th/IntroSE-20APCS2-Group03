Trong bài hôm nay mình sẽ giới thiệu với các bạn về cách Handle Textbox hay Textarea và thực hành bốn testcase trong Automation test Selenium Webdriver.

Nội dung bài viết gồm các mục sau:
1. Các hàm dùng trong Textbox - Text Area
2. Ví dụ cho mỗi hàm
3. Thực hành với một bốn chức năng lớn (tương ứng với bốn testcase)

Bây giờ chúng ta cùng vào nội dung chính của bài học nhé!


# 1. Các hàm dùng để xử lý Textbox - Text Area và ví dụ

## 1.1. Dạng HTML của Textbox và Text Area 
 - Textbox cho field email
 
>  <input id="mail" type="email" name="user_email">

- Text area

> <textarea id="edu" name="user_edu"></textarea>

## 1.2. Các hàm sử dụng cho Textbox/Text Area và ví dụ

*1.2.1. Hàm sendKeys()*

- Hàm này để truyền dữ liệu cần nhập vào Textbox và Text Area

- Sử dụng hàm này như ví dụ sau:

![](https://images.viblo.asia/f37ffcb3-bd98-41b1-9743-8b8770bb5c06.png)


- Nhập Multi-line cho trường Text area
![](https://images.viblo.asia/030f11e6-ef42-42c1-8865-be46f99a9556.png)


*1.2.2. Hàm clear()*

- Hàm này dùng để clear text đã nhập ở Textbox và Text Area
- Sử dụng hàm này như ví dụ sau:

Chúng ta gán biến cho trường city sau đó sendKeys thì lúc này:
=> Trường City bây giờ đang có giá trị = "Hà Nội Edit".

Chúng ta thực hiện clear() text thì sẽ sử dụng như sau:
![](https://images.viblo.asia/dcf01a53-6e29-479b-ae3f-f7d420932cb1.png)


*1.2.3. Hàm getAttribute("value")*

- Dùng để verify dữ liệu nằm trong attribute của Textbox và Text Area
- Sử dụng hàm này như ví dụ sau:
![](https://images.viblo.asia/35e3379f-d584-41c2-b58c-562a6399fa0c.png)


*1.2.4. Hàm getText()*

- Dùng để verify dữ iệu của Textbox và Text Area nhưng không nằm trong Attribute

![](https://images.viblo.asia/80c24fa2-db1c-4350-8e9a-d53598d361a0.png)


*1.2.5. Hàm Assert.assertEquals*

- Hàm để verify output data = input data

![](https://images.viblo.asia/a358b09d-5e74-4fb7-968d-c0ae536980aa.png)


Như ví dụ trên là ta đang so sánh input đầu vào là: "Welcome To Manager's Page of Guru99 Bank" có bằng với ở Element heading3 hay không?


*1.2.6. Hàm click()*

- Hàm click() dùng cho các button hay hyperlink.

![](https://images.viblo.asia/45f809b8-0578-4fc6-98cc-7d33cb52d878.png)

Như ví dụ trên là hành vi người dùng click vào tên Element là: "sub", tương đương với hành động click trong manual test.

*1.2.7. Hàm về get link *

- Hàm dùng để get về link Website cần thực hiện Auto

`driver.get("http://demo.guru99.com/v4/");`

![](https://images.viblo.asia/b4304be6-1603-4b57-a558-b349cccc8162.png)


# 3. Thực hành
Yêu cầu: 

Đăng ký thông tin user và sau đó login vào hệ thống.
Customer thực hiện đăng ký thông tin khách hàng mới.
Customer thực hiện edit thông tin của mình (gọi là edit Profile). Trường Customer Name là không cho phép edit.
Thực hành trên Website: http://demo.guru99.com/v4/

## 3.1. Bài tập về chức năng đăng ký

URL: http://demo.guru99.com/v4/

Testcase được code như sau:

![](https://images.viblo.asia/ac5d9125-6f9a-43db-9334-e91d497b36a5.png)


## 3.2. Bài tập về chức năng login

Testcase được code như sau:

![](https://images.viblo.asia/e810c45c-6281-4b2d-8518-0b6b0571abce.png)


## 3.3. Bài tập về chức năng tạo thông tin khách hàng mới

Testcase được code như sau:

![](https://images.viblo.asia/83b001dd-d589-4b87-9f0d-5359f365ca12.png)


### 3.4. Bài tập về edit thông tin Profile của khách hàng

Testcase được code như sau:

![](https://images.viblo.asia/ff88d6bc-4d75-4ac7-a4a4-828ca8976d51.png)


## 3.5. Kết quả

![](https://images.viblo.asia/f6fc3b92-e332-45f0-91c9-fcb1a6f8ffd7.png)

Phân tích kết quả:
Đây là kết quả 4 testcase ở trên đã pass.

![](https://images.viblo.asia/dcd9b2cf-7600-4594-91ad-00e5ccbd65cd.png)
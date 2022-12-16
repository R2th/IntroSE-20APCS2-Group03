Nội dung của bài viết bao gồm:

1. Khái niệm Xpath

2.  Phân loại Xpath

4. Cấu trúc của Xpath

3. Giải thích chi tiết các yếu tố trong cấu trúc và ví dụ

4. Một số công nghệ trong Xpath


# 1. Khái niệm Xpath
XPath là đường dẫn XML. Nó là một cú pháp để tìm kiếm bất kỳ element nào trên trang web bằng cách sử dụng biểu thức XML path. XPath được sử dụng để tìm locator của bất kỳ element nào trên trang web bằng cách sử dụng cấu trúc DOM HTML.

![](https://images.viblo.asia/4e3466be-e93f-4b71-a69e-85b79fed3572.png)


# 2. Phân loại Xpath

## 2.1. Xpath tương đối

- Có thể tìm kiếm element ở mọi nơi trên Web

- Có thể bắt đầu từ bất kỳ vị trí nào của HTML

- Viết ngắn gọn và rất linh hoạt

- Bắt đầu bằng ký tự: "//"

![](https://images.viblo.asia/bcd9d284-0572-439a-a1bb-db1f81620408.png)


## 2.2. Xpath tuyệt đối


- Tìm kiếm trực tiếp từ một element

- Bắt đầu bằng ký tự: "/"

- Cấu trúc viết dài và không được linh hoạt

![](https://images.viblo.asia/fdfc4b64-3af9-4d8b-82c9-da50016ac1ae.png)


# 3. Cấu trúc của Xpath
`//tagname[@attribute=value]`

# 3.1. Ký hiệu "//"
//: là thể hiện bắt đầu từ node hiện tại

## 3.2. Element => tagname
Textbox => input

Textarea => textarea

Dropdown List (mặc định) => select > option

Dropdown list (Custom) => ul > li
                                                 div > span                
                                                 
Button => button
                   input
                   
Checkbox => input

Radio button => input

Image => img

Link => a

Table => table

header (table) => th

Column (table) => td

Row (table) => tr

Text => div
              span
              label
              
Header => h1 - h5

Slider => input

Upload file => input

Tooltip => div

Menu => a

Icon => span

## 3.3. Attribute

- Attribute là tên của Attribute

Ví dụ: Trong trường FirstName của chức năng đăng ký trong trang: http://live.demoguru99.com/index.php/customer/account/create/

Attribute name = id

## 3.4. Value

- Value là giá trị của attribute

Ví dụ: Trong trường FirstName của chức năng đăng ký trong trang: http://live.demoguru99.com/index.php/customer/account/create/

Attribute value = firstname

![](https://images.viblo.asia/6f6d0c49-089d-4822-9e85-5e7f3e34c8c2.png)


=> Xpath: `//tagname[@attribute=value]`

Trong ví dụ này sẽ quy đổi ra thành như sau:

//input[@id='firstname']

# 4. Một số công nghệ trong Xpath

## 4.1. Khi Attribute value là duy nhất

- Dùng format: Tagname & Attribute & Value

 `//tagname[@attribute=value]`
 
  1. //input[@id='email']
  2. //input[@title='title="Email Address']
  3. //input[@name='login[username]']

![](https://images.viblo.asia/cac4abc7-5415-4756-832b-91ca559eb650.png)

## 4.2. Khi không thể định danh được element bằng thẻ và attribute của nó
 
###  4.2.1. Lấy từ đời cha trở xuống (Parent node)

- Dùng cấu trúc: 
```
//parent-tagname[@attribute='value']//child-tagname[@attribute='value']
```
Ví dụ:

Dùng Tagname và attribute chúng ta không tìm được sự duy nhất của element:
![](https://images.viblo.asia/d0702008-57b7-430b-8576-acdd30ae7238.png)

Khi này chúng ta cẫn phải lấy thêm điều kiện từ đời cha trở xuống

![](https://images.viblo.asia/ba7a868f-ba3c-433b-a137-6b933ff3be77.png)

### 4.2.2. Lấy từ đời cha trở lên

![](https://images.viblo.asia/b66fc93e-0ae2-4d7a-b028-51bf05f2110a.png)

## 4.3. Lấy tuyệt đối

### 4.3.1. Text()

```
text()=: Chứa giá trị tuyệt đối trong chuỗi
```

Ví dụ:
![](https://images.viblo.asia/e615136a-ad32-44de-92a5-a53c79b56d77.png)

### 4.3.2.@attribute()

```
@attribute()=: chứa giá trị tuyệt đối trong attribute
```

![](https://images.viblo.asia/45c22e23-0fec-4b52-86a2-97d441809943.png)

## 4.4. Lấy tương đối 

```
contains(text()),attribute (value)
```
![](https://images.viblo.asia/07ccc6f0-d409-4c0a-ad75-42557f77605a.png)

```
contains(@attribute,value)
```
![](https://images.viblo.asia/3d09682e-fdb1-4f26-bde6-86afc9b3f680.png)


# KẾT LUẬN

Nội dung bài viết giúp các bạn có thể bắt được element bằng nhiều cách khác nhau trong trường hợp cụ thể, bài sau mình sẽ viết thêm bốn cách bắt element bằng Xpath và giới thiệu về CSS trong selenium tới các bạn.

Cảm ơn các bạn đã đọc bài viết!
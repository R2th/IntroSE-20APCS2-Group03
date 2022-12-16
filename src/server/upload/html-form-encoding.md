Trong quá trình làm việc với API, mình gặp một chút vấn đề với kiểu mã hóa dữ liệu khi submit form và gửi dữ liệu cho server. Sau khi tìm hiểu, mình muốn chia sẻ lại kiến thức này cũng mọi người, hy vọng nó sẽ giúp các bạn hiểu phần nào.
## 1. Giới thiệu
HTML Form Encoding xác định cách mã hóa dữ liệu gửi lên server khi submit form HTML. Giá trị này được xác định ở thuộc tính `enctype` trong thẻ mở `form`. Ta thường thấy 3 giá trị:

1. **`application/x-www-form-urlencoded`**: là kiểu mã hóa mặc định nếu thuộc tính `enctype` không có giá trị, đại diện cho `URL Encoded Form`. Tất cả các ký tự được mã hóa trước khi gửi (khoảng trắng được chuyển đổi thành ký hiệu "+" hoặc "%20" và các ký tự đặc biệt được chuyển đổi thành giá trị ASCII HEX).
2. **`multipart/form-data`**: đại diện cho `Multipart form`, kiểu mã hóa này được sử dụng khi người dùng muốn tải tệp dữ liệu lên. 
3. **`text/plain`**: Là một kiểu mới trong HTML 5, dữ liệu gửi lên mà ko có mã hóa.

Bây giờ, ta sẽ đi sâu vào các loại này hơn nhé.
## 2. URL Encoded Form
Ví dụ:
```
<form action="/urlencoded?firstname=sid&lastname=sloth" method="POST" enctype="application/x-www-form-urlencoded">
    <input type="text" name="username" value="sidthesloth"/>
    <input type="text" name="password" value="slothsecret"/>
    <input type="submit" value="Submit" />
</form>
```
Ở đây, phương thức đước sử dụng là phương thức POST, như vậy dữ liệu sẽ có trong body của request. Kiểu mã hóa được dùng ở đây là kiểu `URL Encoded`. Hiểu đơn giản thì dữ liệu được biểu diễn dưới dạng **(key, value)**, nối với nhau bằng ký hiệu **&** thành một chuỗi (long string). Trong mỗi cặp  **(key, value)**, key và value tách nhau bở dấu **=**. 

Ví dụ: `key1=value1&key2=value2`

Với form như trong ví dụ thì dữ liệu gửi lên sẽ là: `username=sidthesloth&password=slothsecret`. 

Ngoài ra, để ý thuộc tính `action` của form có `/urlencoded?firstname=sid&lastname=sloth`. Dữ liệu này và dữ liệu truyền lên từ form giống nhau về kiểu mã hóa. 
![](https://images.viblo.asia/19058b88-5a80-4759-a439-e2aa3ae0d147.png)
Ta thấy, ở trường **`Content-Type`** trên header của request có xác định kiểu mã hóa là `application/x-www-form-urlencoded`.
## 3. Multipart Forms
Multipart Forms thường được dùng khi người dùng muốn gửi file lên server. Ta sẽ gán giá trị tương ứng cho thuộc tính `enctype`:
```
<form action="/multipart?firstname=sid slayer&lastname=sloth" method="POST" enctype="multipart/form-data">
    <input type="text" name="username" value="sid the sloth"/>
    <input type="text" name="password" value="slothsecret"/>
    <input type="submit" value="Submit" />
</form>
```
Xem thông tin của request:
![](https://images.viblo.asia/2d74eb32-1ec9-4406-8eff-723fec5e8bcc.png)
Chú ý trường `Content-Type` và payload của request. 

**Content-Type Header**

Ngoài giá trị `multipart/form-data`, ở `Content-Type` còn có giá trị `boundary`. Giá trị này do trình duyệt tạo ra, nhưng nếu cần thì ta vẫn có thể xác định nó. 

**Request Body**

Mỗi cặp **(key, value)** được biểu diễn dưới dạng:
```
--<<boundary_value>>
Content-Disposition: form-data; name="<<field_name>>"

<<field_value>>
```
Kết thúc payload sẽ là giá trị của `boundary` nối với kí hiệu `--`. 
```
--<<boundary_value>>
Content-Disposition: form-data; name="<<field_name>>"

<<field_value>>
--<<boundary_value>>
Content-Disposition: form-data; name="<<field_name>>"

<<field_value>>
--<<boundary_value>>--
```
Như vậy, với kiểu mã hóa `application/x-www-form-urlencoded`, mỗi cặp (key, value) được phân cách với nhau bằng dấu **&** cho chép server biết nơi bắt đầu và kết thúc của một tham số. CÒn với kiểu `multipart/form-data`, các giá trị `boundary` thực hiện công việc này. 

Ví dụ, nếu đặt `boundary=XXX` thì 
```
Content-Type: multipart/form-data; boundary=XXX
```
payload có dạng:
```
--XXX
Content-Disposition: form-data; name="username"

sidthesloth
--XXX
Content-Disposition: form-data; name="password"

slothsecret
--XXX--
```

Như vậy, trình duyệt sẽ hiểu được bắt đầu và kết thúc của các giá trị.

## 4. Text/plain Forms
Kiểu mã hóa này gần giống với kiểu `URL encoded forms`, ngoại trừ việc các trường của form không được mã hóa khi gửi lên server. Kiểu này không được dùng rộng rãi vì định dạng này có thể đọc được và kém bảo mật. Để hiểu hơn, bạn có thể đọc [tại đây.](https://html.spec.whatwg.org/multipage/forms.html#text-plain-encoding-algorithm)

## 5. Tổng kết
Trên đây là một số tìm hiểu của mình về các loại HTML Form Encoding. Tuy chưa thật sự hoàn chỉnh nhưng mong rằng có thể giúp các bạn hiểu và phân biệt cơ bản. Cảm ơn các bạn.

## Tài liệu tham khảo
https://dev.to/sidthesloth92/understanding-html-form-encoding-url-encoded-and-multipart-forms-3lpa#:~:text=application%2Fx%2Dwww%2Dform,user%20wants%20to%20upload%20files

https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data

https://www.w3schools.com/tags/att_form_enctype.asp

https://stackoverflow.com/questions/2678551/when-to-encode-space-to-plus-or-20
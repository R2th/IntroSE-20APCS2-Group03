# IV. Một số tính năng khác khi sử dụng HTML

## 1. Thuộc tính Style

### 1.1. Mục đích

- Dùng để xác định kiểu cách cho các phần tử trong HTML.

### 1.2. Cú pháp

> style = "property:value"

- property= style
- Value= giá trị của style đó 

### 1.3. Một số ví dụ điển hình

- Màu chữ/màu văn bản: dùng đặc tính `color`. 

Ví dụ: `<h2 style="color:red">This is Red Text</h2>    `

![image.png](https://images.viblo.asia/e78284e9-c9ad-4759-a9a7-8c6cf0e6aa80.png)

- Màu nền: dùng đặc tính `background-color`.

Ví dụ: 

```
<body style="background-color:pink;">

<h2 style="color:red">This is Red Text</h2>

</body>
```

![image.png](https://images.viblo.asia/64504325-5f73-4fad-baf1-3a3660a82199.png)

- Font type/font size: dùng đặc tính `font-family` cho kiểu chữ và `font-size` cho kích thước chữ.

Ví dụ: 
```
<body style="background-color:pink;">

<h2 style="color:red">This is Red Text</h2>
  
<p style="color:red;font-family:arial; font-size:30px">Đây là ví dụ.</p>
 
</body>
```

![image.png](https://images.viblo.asia/c50bd4b1-1d10-4588-b970-e4f3c489cb84.png)

- Ngoài ra có thể kết hợp các đặc tính lại với nhau bằng cách dùng ; giữa các đặc tính.

Ví dụ:
```
<body style="background-color:pink;">

<h2 style="color:red;font-family:arial; font-size:30px;text-align:center">Đây là ví dụ. </h2>
 
</body>
```

![](https://images.viblo.asia/99748327-3d5f-474e-8a6b-ceedfd739ec6.png)

## 2. Canh vị trí và màu viền 

### 2.1. Canh chỉnh vị trí của văn bản 

- Dùng đặc tính `text-align`.

Ví dụ:
```
<body style="background-color:pink;">

<h2 style="color:red">This is Red Text</h2>
   
<p style="text-align:center;">Tôi muốn văn bản này nằm giữa trang.</p>
 
</body>
```

![image.png](https://images.viblo.asia/cd26a1c7-e6d5-44e4-add0-6f9fc06fb7c2.png)

### 2.2. Màu viền

- Dùng đặc tính border. 
- Ví dụ:
```
<p style="border:10px solid SpringGreen;">Đây là ví dụ.</p>
````

![image.png](https://images.viblo.asia/b2a97c13-bb83-4505-87ff-ea217e64ddbf.png)

## 3. Thẻ chú thích

- Dùng để chèn bình luận, ghi chú vào HTML để lưu ý khi sửa lỗi. Tất nhiên là phía UI người dùng sẽ không nhìn thấy đoạn ghi chú đó.
- Ví dụ:
> <!-- Lưu ý chỗ này. -->
> <p>Đây là ví dụ.</p>

![image.png](https://images.viblo.asia/766153f1-ae2e-4906-a7f6-58d1b04bb6ef.png)

## 4. Cách chèn khoảng trống

- Thông thường HTML chỉ hiển thị một khoảng trắng giữa các từ mặc dù người dùng đã gõ bao nhiêu dấu cách giữa các từ đi nữa. 
- Vì vậy để thêm khoảng trống giữa các từ có thể chèn ký tự sau:
 `&nbsp;` : chèn 1 khoảng trống
 `&ensp;` : chèn 2 khoảng trống
`&emsp;` : chèn 4 khoảng trống
 `&nbsp;&nbsp;&nbsp;&nbsp;` : chèn tab
 - Ví dụ:
```
 - Tôi&nbsp;đang&ensp;học&emsp;HTML&nbsp;&nbsp;&nbsp;&nbsp;đó.
<br>Tôi đang  học   HTML    đó.
```

![image.png](https://images.viblo.asia/7ef8f7a4-51be-47f8-be83-11f4e33a9c64.png)

## 5. Bảng biểu

### 5.1. Định nghĩa

- Bảng HTML được định nghĩa bằng thẻ `<table>`. 
- Mỗi hàng được định nghĩa bằng thẻ `<tr>`.
- Tiêu đề định nghĩa bằng `<th>`. Mặc định tiêu đề sẽ in đậm và nằm ở chính giữa. 
- Ô trong bảng định nghĩa bằng thẻ `<td>`.

Ví dụ:
```
<table style="width:50%">
 <tr>
  <th>No</th>
  <th>Name</th>
  <th>Age</th>
 </tr>
 <tr>
  <td>1</td>
  <td>Nguyen Van A</td>
  <td>20</td>
 </tr>
 <tr>
  <td>2</td>
  <td>Nguyen Van B</td>
  <td>21</td>
 </tr>
   <tr>
  <td>3</td>
  <td>Nguyen Van C</td>
  <td>22</td>
 </tr>
</table>  
```

![](https://images.viblo.asia/1430e0e4-5470-48eb-86a9-8996a84d26e0.png)

### 5.2. Thêm viền cho bảng HTML

- Mặc định là bảng sẽ không có đường viền. Và chúng ta có thể chỉ định viền của bảng được xác định bằng đặc tính border 
- Ví dụ:
```
<table style="width:50%;border: 1px solid black">
 <tr>
  <th>No</th>
  <th>Name</th>
  <th>Age</th>
 </tr>
 <tr>
  <td>1</td>
  <td>Nguyen Van A</td>
  <td>20</td>
 </tr>
</table>  
```

![image.png](https://images.viblo.asia/0a7af6b6-b8f1-40ac-9c7b-916b3c50254d.png)

## 6.Form

- `<input type=”text”>` : Định nghĩa một dòng nhập dữ liệu văn bản
- `<input type=”radio”>` : Định nghĩa nút bấm tròn để chọn một trong số các đáp án
- `<input type=”submit”>` : Định nghĩa nút để nộp/gửi biểu mẫu

### 6.1. Dữ liệu đầu vào là văn bản

- Dùng `<input type=”text”>`. 
- Lưu ý: độ rộng mặc định của trường điền văn bản là 20 kí tự. 
- Thêm button gửi/submit bằng cú pháp:  <input type="submit" value="Gửi">
- Ví dụ:
```
<form>
 Họ:<br>
 <input type="text" name="họ"><br>
 Tên:<br>
 <input type="text" name="tên">
 <br>
 <input type="submit" value="submit">
</form>
```

![image.png](https://images.viblo.asia/6fea3b81-9035-4cfe-a8c4-a99d25813902.png)

### 5.2. Radio để select dữ liệu

- Dùng - `<input type=”radio”>`.
- Thêm button gửi/submit bằng cú pháp:  <input type="submit" value="Gửi">
- Ví dụ:
```
<form>
 <input type="radio" name="gender" value="male" checked> Male<br>
 <input type="radio" name="gender" value="female"> Female<br>
 <input type="submit" value="submit">
</form>
```

![image.png](https://images.viblo.asia/bae48e9d-8b2c-4416-a69c-62ee7ac2bd83.png)

### 5.3. Thuộc tính action

- Định nghĩa sự kiện xảy ra khi form được gửi đi.
- Cú pháp: `<form action="/trang muốn gửi form đến">`
- Nếu trong form không có thuộc tính action thì form sẽ được gửi về trang hiện tại.

### 5.4. Thuộc tính target

- Xác định hình thức hiển thị của form được gửi về.
- Cú pháp: `<form action="/action_page.php" target="hình thức hiển thị">`
- Giá trị mặc định là` _seft`. Nghĩa là biểu mẫu gửi về sẽ mở trong cửa sổ hiện tại.
- Các hình thức hiển thị:
`_Blank` : mở tab khác

### 5.5. Thuộc tính method

- Xác định phương pháp HTTP (GET hay POST) sẽ được dùng khi gửi dữ liệu của form.

|  | Phương pháp GET | Phương pháp POST |
| -------- | -------- | -------- |
|Cú pháp     |`<form action="/action_page.php" method="get">`    | `<form action="/action_page.php" method="get">`     |
|     | Hữu ích khi muốn đánh dấu trang kết quả.     | Không thể đánh dấu trang kết quả được.     |
|      | Độ dài URL bị giới hạn (khoảng 300 kí tự).     | Không giới hạn kích thước.    |
|      | Dữ liệu trong biểu mẫu sẽ được thêm vào đằng sau URL. Phù hợp để dùng cho các dữ liệu không cần bảo mật. Vì vậy không nên dùng GET để gửi những dữ liệu nhạy cảm.     | Text     |

### 5.6. Phần tử fieldset và legeng

- `<Fieldset>` : Dùng để nhóm các dữ liệu trong form.
- `<Legend>` : Dùng để mô tả cho phần tử `<fieldset>`. 
- Ví dụ:
```
<form action="/action_page.php">
 <fieldset>
  <legend>Thông tin cá nhân:</legend>
  Họ:<br>
  <input type="text" name="họ" value="Lê"><br>
  Tên:<br>
  <input type="text" name="tên" value="Điệp"><br><br>
  <input type="submit" value="Submit">
 </fieldset>
</form>
```

![image.png](https://images.viblo.asia/b025335b-a449-453b-acc7-72d494fc30bc.png)

## 7. Iframe

- Cú pháp: `<iframe src="URL"></iframe>`. Trong đó src là thuộc tính dùng để xác định URL. 
- Ví dụ:
`<iframe src="https://viblo.asia/followings"></iframe>`

![image.png](https://images.viblo.asia/ff82e607-c573-47fb-85d6-d6381f5b71f3.png)

### 7.1. Thiết lập height và width

- Cú pháp: `<iframe src="URL" height="height" width="width"></iframe>`
- Ví dụ:
`<iframe src="https://viblo.asia/followings" height="200" width="200"></iframe>`

![image.png](https://images.viblo.asia/4a359c32-795e-4681-9c43-b909449c1e32.png)

### 7.2. Xóa bỏ đường viền

- Dùng thuộc tính `<style>` và đặc tính `<border>` để xóa viền. 
- Cú pháp: `<iframe src="URL" style="border:none;"></iframe>`
- Ví dụ:
`<iframe src="https://viblo.asia/followings" style="border:none;"></iframe>`

| Có viền | Không viền | 
| -------- | -------- | 
|![image.png](https://images.viblo.asia/ff82e607-c573-47fb-85d6-d6381f5b71f3.png)    | ![image.png](https://images.viblo.asia/49a01a81-2405-4032-a384-fc2d98838c54.png) |
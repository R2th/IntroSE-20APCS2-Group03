# I. Định nghĩa
- HTML viết đầy đủ là Hyper Text Markup Language, cho phép người dùng tạo và cấu trúc hóa các thành phần trên một trang web như đoạn văn, tiêu đề, bảng biểu...
- HTML không phải là ngôn ngữ lập trình nên HTML sẽ không thể thực hiện được các chức năng động. 

# II. Các thuộc tính và phần tử của HTML
## 1. Các thuộc tính

- Thuộc tính giúp bổ sung thông tin cho phần tử. 

### 1.1. Thuộc tính href

- Dùng để tạo liên kết trong HTML.
- Đường dẫn được xác định bằng thẻ <a> và địa chỉ trong đường dẫn được xác định bằng thuộc tính href.
Ví dụ: `<a href="https://viblo.asia/newest">VIBLO</a>`
    
    ![](https://images.viblo.asia/3616a808-21bb-4b0e-a612-647fffd12dba.png)
    
### 1.2. Thuộc tính src + width, height  

- Dùng để tạo đường dẫn tham chiếu đến ảnh.
- Hình ảnh sẽ được xác định bằng thẻ <img> và tên file ảnh sẽ xác định bằng thuộc tính src. 
- Ngoài ra chúng ta có thể quy định cả width (chiều rộng) và height (chiều cao) trong thẻ đó. 
Ví dụ: `<img src="https://ctf.viblo.asia/" width="500" height="500">  `

    ![](https://images.viblo.asia/d8f0ae84-0d41-4248-895b-59a226ba76fa.png)
    
### 1.3. Thuộc tính alt
    
- Dùng để xác định đoạn text sẽ thay thế trong trường hợp ảnh không hiển thị.
- Giá trị của thuộc tính alt có thể đọc được trên thiết bị đọc màn hình giúp người khiếm thị có thể nghe được phần tử của trang HTML. 
    Ví dụ: `<img src="https://ctf.viblo.asia/" alt="No image">`
 
    ![](https://images.viblo.asia/dae9d95a-5c71-4822-a918-d90dc1cdfdfe.png)

### 1.4. Thuộc tính style
    
- Dùng để xác định định dạng cho một phần tử trong HTML.
    Ví dụ: `<p style="color:red;font-size:50px;font-family:cursive">Example</p>`
   
    ![](https://images.viblo.asia/a02c6c44-36b3-4f47-93ee-f793db424918.png)

### 1.5. Thuộc tính lang
    
- Dùng để khai báo ngôn ngữ của phần tử.
    Cú pháp: ```<html lang="mã">...</html>```
    
- Mã ngôn ngữ tham khảo ở đây: https://webvn.com/ma-ngon-ngu-theo-chuan-iso/
    
### 1.6. Thuộc tính title
    
- Dùng để hiển thị thêm thông tin bổ sung cho nội dung của phần tử khi bạn hover vào phần tử.
    Ví dụ: ```<p title="Tôi là chú thích">Tôi đang học HTML. </p>```
    
    ![](https://images.viblo.asia/63d1b6f4-6651-45ac-b0f5-e9b866699b4e.png)

## 2. Các phần tử 

`<html>` là phần tử gốc của trang HTML
		
|  Thẻ mở | Nội dung | Thẻ đóng |
| -------- | -------- | -------- |
|`<head>`    | chứa thông tin mô tả về văn bản     |` </head>`     |
|`<title>`     | cho biết tiêu đề văn bản     | `</title>`     |
| `<body>`     | chứa các nội dung trang sẽ hiển thị     | `</body>`     |
| `<p>`     | phần tử của đoạn văn bản     | `</p>`     |
| `<pre>`     | dùng để định nghĩa đoạn văn bản trước khi được định dạng (sẽ vẫn giữ nguyên các khoảng trống, ngắt dòng.)     | `</pre>`     |
| `<br> `    |dùng để xác định vị trí xuống dòng     | `</br>`     |
| `<hr> `    | dùng để tạo một đường ngang trên trang HTML     |      |
| `<h1> tới <h6>`     |  `<h1>` là tiêu đề quan trọng nhất (thể hiện bằng front size lớn nhất) còn `<h6>`  là ít quan trọng nhất (thể hiện bằng font size nhỏ nhất)   | `</h1>,  </h2>, </h3>, </h4>, </h5>, </h6> `    |
|`<u>`     | gạch chân văn bản     | `</u>`     |
|`<i>`     | in nghiêng văn bản     | `</i>`     |
|`<b>`     | in đậm văn bản     | `</b>`     |


Ví dụ: dưới đây là 1 đoạn HTML kết hợp các phần tử phía trên.

Tham khảo: 
https://codepen.io/DiepLTH/pen/NWgKYjN

![](https://images.viblo.asia/4e339764-7fc6-41cc-8ad4-306847518aa5.png)

##  3. Một số lưu ý khác

- Phần tử rỗng: là phần tử HTML khi không có nội dung.
- Phần tử HTML có thể lồng vào nhau (phần tử này nằm trong phần tử khác).
- Các phần tử luôn đi theo cặp, nghĩa là có thẻ đóng và mở. Vì vậy để phần tử có thể hiển thị thì đừng quên việc đóng thẻ. 
- Thẻ HTML không nhất thiết phải là chữ thường hay chữ hoa, <p> hay <P> cũng đều như nhau.
- Cách xem mã nguồn HTML của website: Click chuột phải vào bất kì vị trí nào trên trang => chọn View Page Source/View Source => sẽ có một cửa sổ mới mở ra và hiển thị mã nguồn HTML của trang đó.
- Cách kiểm tra các phần tử HTML: Click chuột phải vào một phần tử trên trang => chọn Inspect/Inspect Element => sẽ xem được phần tử đó gồm có những gì (sẽ có cả HTML và CSS). Và chúng ta có thể chỉnh sửa HTML hoặc CSS ngay trên bảng Elements và Styles mới mở ra.
 
# III. Các công cụ soạn thảo HTML

- Dưới đây là 1 vài tool soạn thảo HTML online. Các bạn có thể tham khảo và dùng thử. 

## 1. Codepen.io
## 2. JSFiddle.net
## 3. JSBin.com
## 4. Liveweave.com
## 5. HTML.house
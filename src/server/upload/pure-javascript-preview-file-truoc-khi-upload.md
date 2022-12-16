##### Chào anh em năm mới nhé :grinning:. Trước khi upload 1 file lên server, anh em có thường thắc mắc là nó đã thực sự ổn áp hay chưa và cũng muốn xem sơ qua nó như thế nào chẳng hạn  ? Vì vậy hôm nay chúng ta cùng xem một vài cách để giải quyết vấn đề đó và cụ thể là preview file dạng image nhé. Bắt đầu :100:

# 1. Chuẩn bị

#### Một vài kiến thức cần biết:
  - Javascript (tất nhiên rồi)
  - Html

#### Môi trường sẽ demo:
  - Window 10
  - Visual studio code 1.41.1
  - Google Chrome 80.0.3987.106

# 2. Tiến hành

Với việc preview image file mình sẽ thường dùng 2 cách sau
1. [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) (Web API) thường được dùng để đọc nội dung của các file được lưu trữ trên máy tính của người dùng thông qua thao tác với các đối tượng `File` hoặc `Blob`.
2. [window.URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) (Web API) và các phương thức tĩnh của nó để thao tác với các đối tượng `File` hay `Blob`

## Sử dụng FileReader
#### 1. Trước tiên ta sẽ cần tạo 1 vài đoạn HTML
![](https://images.viblo.asia/88392cb5-6485-4df3-bf15-0ce9f51e7592.png)

#### 2. Tạo một hàm để thực hiện việc đọc nội dung của file và preview nó
![](https://images.viblo.asia/5d3eb281-b75d-482c-b8ae-5af2a762e6d3.png)

Hình dung các bước như sau:
1. Khi chọn 1 file sẽ gọi hàm `previewFile`
2. Lấy thông tin file và phần tử `preview`
3. Tạo đối tượng `FileReader`
4. Tiến hành đọc file thông qua phương thức `readAsDataURL`
5. Sau khi hoàn thành sẽ gọi hàm `onload` của reader
6. Tạo phần tử `image` và thiết lập thuộc tính `src` và gán bằng dữ liệu `data base64` của `reader` result
7. Chèn image vào phần tử preview

#### 3. Chạy thử xem sao
![](https://images.viblo.asia/ae862005-e67b-4c42-b20f-5ced9f4e1e60.gif)

## Sử dụng window.URL
#### 1. Sử dụng đoạn html bên trên
#### 2. Tạo một hàm để thực hiện việc đọc nội dung của file và preview nó
![](https://images.viblo.asia/79561cd5-c423-4ce1-a799-f04430a594d4.png)

Hình dung các bước như sau:
1. Khi chọn 1 file sẽ gọi hàm `previewFile`
2. Lấy thông tin file và phần tử `preview`
3. Tạo một object url (dạng DOMString chứa thông tin của file) thông qua phương thức tĩnh `revokeObjectURL` của `window.URL`
4. Tạo phần tử `image` và thiết lập thuộc tính `src` và gán bằng dữ liệu dạng URL `blob:` được tạo từ object url ở bước 3
5. Chèn image vào phần tử preview
6. Giải phóng tham chiếu object url ở bước 3 thông qua phương thức tĩnh `revokeObjectURL` của `window.URL`

#### 3. Chạy thử xem sao
![](https://images.viblo.asia/5df99b2c-60e8-46b6-837c-9b62626a7290.gif)

## Preview nhiều file
#### 1. Ta sẽ thêm thuộc tính `multiple` cho input file để có thể chọn nhiều file 1 lần.
![](https://images.viblo.asia/3a64e397-c5a1-417c-bda8-917cf49948b7.png)

#### 2. Sử dụng FileReader
- Hàm
<br>
![](https://images.viblo.asia/5b5237f2-b69b-40c0-b300-9c37e22a9991.png)
<br>
- Chạy
<br>
![](https://images.viblo.asia/fcd4d502-f120-4573-aa13-bbcabb34e328.gif)


#### 3. Sử dụng window.URL
- Hàm
<br>
![](https://images.viblo.asia/76f79ed8-bee2-494f-9435-07cb599d8cdb.png)
<br>
- Chạy
<br>
![](https://images.viblo.asia/f0f1d2f2-c368-48f1-924f-8125e1173f7d.gif)

# 3. Tổng kết
Trên đây là những cách thông dụng nhất để preview file thông qua các đối tượng của Web API. Nói chung thì nó thật sự thú vị và cũng rất có ích anh em nhỉ :D .
<br>
Với những phương thức trên ta hoàn toàn có thể làm được nhiều hơn nữa. Học tập sẽ không bao giờ có điểm dừng nhỉ :nerd_face: .
<br>
Cảm ơn anh em đã đọc bài viết này. Chúc anh em thành công nhé :sunglasses: .

[Repo tại đây](https://github.com/daint2git/viblo.asia/tree/master/javascript-preview-file)
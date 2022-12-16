Xin chào các bạn, trong quá trình phát triển sản phẩm, chúng ta nhận được các yêu cầu của khách hàng về việc muốn ứng dụng có thể hỗ trợ nhiều loại ngôn ngữ ví dụ như: tiếng anh, tiếng nhât, tiếng đức... Vậy chúng ta sẽ làm như thế nào? Bài viết này mình sẽ tạo một ứng dụng hỗ trợ đa ngôn ngữ bao gồm cả message đối với các popup xin cấp quyền cho ứng dụng.
### Tạo project và cấu hình.
Trước tiên, mình sẽ tạo một project với tên "DemoLocalized".
Sau khi tạo xong project, mình sẽ kéo layout cho app như hình dưới đây:
![](https://images.viblo.asia/11618069-c843-4e32-afdb-3ffe51b5e5cf.png)
Tiếp đó, để có thể hỗ trợ đa ngôn ngữ cho nội dung text và message xin cấp quyền trên ứng dụng, mình sẽ tạo một file .strings có tên là: "Localizable.strings" và "InfoPlist.strings". Như tên của file chắc các bạn cũng hiểu được rằng file InfoPlist sẽ được sử dụng để localized message xin cấp quyền. Còn file Localizable sẽ dùng để localized text string. Sau khi tạo xong, mở mục project info lên và chọn thêm ngôn ngữ mà khách hàng muốn ứng dụng hỗ trợ.
![](https://images.viblo.asia/529f78f9-a159-4c29-a340-1eda543e72e4.png)
Tiếp theo, mở 2 file .strings đó lên và ở mục file inspector bên phải, mình sẽ tiến hành chọn localize ngôn ngữ mà khách hàng yêu cầu. 
![](https://images.viblo.asia/45a6d81a-77d3-45de-8e6f-839de4acaa6b.png)
Trong các file .strings tương ứng với các ngôn ngữ, chúng ta sẽ define các key tương ứng với nội dung. 
![](https://images.viblo.asia/1d6ecc92-34cb-437c-938b-ad2ab9fa1399.png)
![](https://images.viblo.asia/0148f36d-e509-4aa9-b48e-5a60d9fc878c.png)
![](https://images.viblo.asia/2ac6ca76-22e7-43d9-afef-776b3bffd7c2.png)
![](https://images.viblo.asia/1fdc4397-13ad-42c3-9324-0b9dc3b15140.png)
Và đây là cách mình gán text cho Label và Button trong code.
![](https://images.viblo.asia/88b8e12e-e566-4443-8058-36db13a1b25a.png)
### Kết quả
Cuối cùng đây là kết quả khi mình cài đặt app lên 2 device sử dụng tiếng anh và tiếng nhật.
![](https://images.viblo.asia/48177295-da40-4324-a26f-17c3f45e96c6.png)
![](https://images.viblo.asia/018e5bd2-b4d2-48fe-a1ed-480ec432bf2b.png)
Và đây là popup xin cấp quyền của hệ thống:
![](https://images.viblo.asia/8e86085b-c6fb-42f4-8083-232b6377422a.png)
![](https://images.viblo.asia/6369dcb6-7273-4513-8c6a-a046db6bdc59.png)

Xin cảm ơn các bạn, dưới đây là sample code mà mình sử dụng trong bài này: 
- https://github.com/dungkv95/LocalizedApp
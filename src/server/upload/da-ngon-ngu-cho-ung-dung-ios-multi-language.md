#  Giới thiệu
Ngày nay, hầu hết các ứng dụng đều hỗ trợ đa ngôn ngữ để nhắm đến khách hàng ở khắp nơi trên thế giới. Ứng dụng hỗ trợ đa ngôn ngữ làm cho ứng dụng của bạn trở nên thân thiện với người dùng hơn. Trong bài viết này tôi sẽ hướng dẫn các bạn tạo ứng dụng hỗ trợ đa ngôn ngữ dựa trên ngôn ngữ máy

# Thực hiện
XCode hỗ trợ quản lí các text localize bằng file .string.

##  Thêm ngôn ngữ.
 Khi khởi tạo project ứng dụng sẽ chọn mặc đinh bằng tiếng Anh. Để tiến hành đa ngôn ngữ cho ứng dụng, chúng ta cần add thêm nhưng ngôn mà ứng dụng hỗ trợ

![](https://images.viblo.asia/63dee742-038f-41cb-b7d0-8dddeac5f7e5.png)


- Trong tab bên trái chọn vào project
- Bấm vào nút + trong tab Infor
- chọn ngôn ngữ cần thêm (ví dụ: Tiếng Việt)
![](https://images.viblo.asia/d52a03d9-c0bd-4e1b-b9e9-59302a589933.png)

 >>Finish
 
## Tạo file Localize.string

Như đã giới thiệu, XCode giúp chúng ta quản lí các text localize bằng các file .string. 
![](https://images.viblo.asia/4875f2a1-15a5-416c-9d31-f04ce952c41c.png)

File > New > File..
![](https://images.viblo.asia/ec6b4bd1-57ca-4132-819f-189796bbf4c7.png)

Chọn file định dang string. > Nhập tên file Localizable.string


![](https://images.viblo.asia/49ef8e91-9fbc-4e1a-b0f2-f5486c790d28.png)


Sau khi tạo xong trong thư mục sẽ xuất hiện file như hình

![](https://images.viblo.asia/28c68e7b-a0c0-4b95-998b-d6156a71132b.png)

Trong tab bên phải chọn Localize 

![](https://images.viblo.asia/a874424b-98aa-4d13-943d-ef0f903fe335.png)
 > Chọn ngôn ngữ tiếng việt và tiếng anh.


![](https://images.viblo.asia/e7a60ed7-8b03-436a-aa90-560340f0f5a8.png)
> Sau khi tạo thành công xcode sẽ tạo file string ứng với từng ngôn ngữ hỗ trợ
> 
## Khai báo chuỗi.

Trong file .string chúng ta sẽ lưu trữ tấc các cả text cần thiết để hiển thị lên app với format

    "key" = "value";
    
   
  trong đó key là để dùng để phân biệt text. value là giá trị text ứng với từng ngôn ngữ.

ví dụ text hello sẽ lưu trong file tiếng anh 
![](https://images.viblo.asia/c1872d68-681e-4ee4-92b8-2adc5080f587.png)
text trong file tiếng việt

![](https://images.viblo.asia/d11befc9-0cfa-42ee-afe4-2b633ea77b00.png)

##  Sử dụng 
Khi sử dụng text ta chỉ đơn giản bằng dòng NSLocalizedString("text.hello", comment: "")
hệ thống sẽ tạo text với ngôn ngữ tương ứng với key.
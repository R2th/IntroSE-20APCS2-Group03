### *1.2.2 Việc xử lý luồng nghiệp vụ (Flow) – F *
Các chức năng  được xử lý liên quan với nhau theo 1 luồng nghiệp vụ (Flow). Với đầu vào là kết quả một chức năng và cho kết quả đầu ra liên quan đến 1 chức năng khác. Ở đây nêu ra 1 số Test case về việc xử lý luồng nghiệp vụ 
![image.png](https://images.viblo.asia/3be72825-7acb-46a4-9b96-cc9fa942f4b1.png)
### *1.2.3 Xử lý thao tác (A)*
Phần xử lý thao tác đối với 1 chức năng nào đó thường không được diễn tả chi tiết trong yêu cầu của khách hàng nhưng được lập trình xử lý. Nếu như viết test case chi tiết thì ta viết cho các thao tác như mô tả dưới đây còn nếu như không viết Test case chi tiết thì mặc định kiểm tra Test case này trong TC xử lý về luồng nghiệp vụ  có chứa các thao tác. Ở đây  nêu ra 1 số Test case về thao tác:  
![image.png](https://images.viblo.asia/cb3c4260-d87f-45ae-b17d-6ca49520725e.png)
## *1.3 TEST CASE VỀ CHỨC NĂNG CHUNG TRONG CÁC DỰ ÁN*

![image.png](https://images.viblo.asia/c0256217-1a0c-4ffb-994e-d88ecda6cbea.png)
![image.png](https://images.viblo.asia/c7c3d4cd-3c30-4c79-bd30-39d806ab6d25.png)
![image.png](https://images.viblo.asia/6c1aa8b0-d835-4598-9052-a5330027d21b.png)
![image.png](https://images.viblo.asia/116764a4-e0a1-4a23-8f7b-7b5f3db1136d.png)

# **2.	HƯỚNG DẪN TEST GIAO DIỆN**
## *2.1 MỤC ĐÍCH TEST GIAO DIỆN*
> •	Test giao diện người dùng là kiểm tra sự tác động, ảnh hưởng của giao diện người dùng tới phần mềm.
> •	Giao diện người dùng phản ánh đầy đủ các chức năng mà người dùng yêu cầu bao gồm các cửa sổ lệnh (form, trang), các trường dữ liệu, và phương thức tiếp cận các chức năng đó ( như phím tab, dùng chuột, các phím tắt).
> •	Test giao diện kiểm tra các đối tượng sau:
> 	Kiểm tra các đối tượng cửa sổ (Form hoặc trang hoặc màn hình) gồm các đặc tính như menu, kích thước, vị trí, màu sắc hiển thị trên giao diện có đúng với yêu cầu của khách hàng không?
> 	Kiểm tra các điều khiển như: Textbox, option (radio button), check boxes, command button, combo boxes, list boxes, Label, Dialog, Icon/Tooltip, Phím nóng/ tắt, các phím Tab/ Shift tab/ enter/ ESC, Focus con trỏ, Thông báo, Menu điều khiển, dấu hiệu của trường bắt buộc.
## *2.2 PHƯƠNG PHÁP TEST GIAO DIỆN*
> •	Xác định được số Form cần test (dựa theo tài liệu Screen design)
> •	Kiểm tra lần lượt các điều khiển trên cùng 1 form theo trật tự từ: 
> -	Trên xuống dưới 
> -	Từ trái sang phải 
> -	Từ mỗi điều khiển độc lập đến logic giữa các điều khiển
> •	Kiểm tra các nội dung trên mỗi Form như sau:
> -	Màu sắc hài hoà hợp lý, vị trí  các điều khiển đặt theo yêu cầu khách hàng (nếu có trong yêu cầu).
> -	Các nút hiển thị ở các Form tương tự nhau phải giống nhau trừ khi có yêu cầu riêng. 
> -	Các tên thuộc tính dạng text tương ứng với các điều khiển trên Form đều phải đúng chính tả không dùng tiếng anh. 
> •	Kiểm tra  giao diện các Form trên các trình duyệt khác nhau đảm báo phải như nhau.
## *2.3 CÁC ĐIỀU KHIỂN  TRÊN FORM*

## *2.4 CÁC LỖI THƯỜNG GẶP KHI TEST UI*
1.	Các Form  giao diện  không nhất quán về màu sắc, tên nút, các nút không cùng kích cỡ.
2.	Các câu thông báo thường sai chính tả hoặc là tiếng anh hoặc tiếng việt không dấu.
3.	Lỗi chính tả (tên Form, tên nút lệnh, tên trường thuộc tính...)
4.	Thiếu ký tự * bên cạnh trường bắt buộc
5.	Câu thông báo không chính xác với thao tác đã thực hiện
6.	Sai trật tự Tab
7.	Khi một nút lệnh không được sử dụng trong 1 số thời điểm nó không được chuyển sang màu xám mờ
8.	Tên các nút lựa chọn mang tính kỹ thuật, không dễ hiểu với người dùng hệ thống.
9.	Không Focus con trỏ chuột tới thuộc tính đầu tiên của form.
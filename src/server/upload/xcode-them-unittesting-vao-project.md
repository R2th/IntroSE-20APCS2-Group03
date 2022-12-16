# Mở đầu
Trong quá trình phát triển dự án, để đảm bảo chất lượng của sản phẩm. Việc thực hiện unit testing sẽ giúp quá trình phát triển không gặp phải những vấn đề không mong muốn và đảm bảo chất lượng soure-code cho việc phát triển sau này. Những team CI/CD có thể phát triển việc tự động thực hiện unit test mỗi commit và thực hiện ui test hàng ngày.

Tùy vào từng team phát triển, việc thêm unit testing có thể sẽ không được triển khai ngay từ khi bắt đầu dự án. Nên bài viết lần này, mình sẽ chia sẻ kinh nghiệm và những vấn đề có thể gặp phải khi thêm unit test vào project trên Xcode.

# Add unit testing

Việc thêm unit testing vào project Xcode được tiến hành theo các bước như sau: 
### Bước 1
Trong project Xcode, chọn File -> New -> Target
### Bước 2
Khi cửa sổ chọn template target hiện ra, chọn Filter -> nhập "unit Testing" -> chọn **iOS Unit Testing Bundle** -> Next

![](https://images.viblo.asia/f60101e7-fb7d-47a1-81e1-8e705b03033a.png)
### Bước 3
Khi cửa sổ cho các option hiện ra -> Điền thông tin cần thiết theo dự án -> Finish

![](https://images.viblo.asia/7732dc80-28de-49c2-a382-c4ea3d76196b.png)

### Bước 4

Sau khi thực hiện bước 3. Một thư mục mới sẽ có tên như phần option vừa điền được thêm vào trong struct của project.
![](https://images.viblo.asia/9f89d805-d82d-4855-adb5-edbbe7d9266f.png)

### Bước 5
Mở file {test}.swift chúng ta sẽ được kết quả như sau
![](https://images.viblo.asia/831dcde3-4b9f-4e42-8a0d-993f9c85ecde.png)
Ấn vào hình thoi cùng với dòng "line of code". Target Test sẽ được chạy và báo success.

**Xong**, thành công với việc thêm unit testing vào trong một project Xcode.

**Nhưng không** mọi chuyện không dễ dàng như vậy. Khó khăn sẽ đến khi bắt tay vào thực hiện những dòng code.
Mình sẽ liệt kê một số vấn đề mình đã gặp và google tới tận trang 2 mới tìm được chút hy vọng.

# Các lỗi có thể gặp phải

## @testable import
Lỗi không import được project cần test vào file unit test.

### No such module

Để khác phục lỗi này cần lưu ý một số điểm sau:
* **Target/Deploy version** của **unit testing** khác với main project. Cần sửa lại cho 2 target/deploy version **giống nhau**.
* Set thuộc tính **"Enable Testability" = Yes** trong **Build Setting** của main app target và test target
* Set thuộc tính **"Allow Non-modular Includes in Framework Modulares" = Yes** trong **Build Setting** của main app target và test target

### Fail to import bring header

Vấn đề này xảy ra khi project sử dụng cocoapod.
Để khác phục lỗi này thì cần thêm trong PodFile như sau:
*  `target ‘ProdTests' do inherit! :search_paths # Pods for testing end`
    
    Nếu cách này vẫn chưa được thì thêm vào trong pod của main app, như sau
*     target 'YourProduct' do  # Pods for product target 'YourProductTests' do  inherit! :search_paths # Pods for product testing end end`
    
## Crash app khi chạy unit test

Nếu app bị crash ngay khi mới chạy unit test thì bạn có thể thử uncheck thuộc tính ** "UI Main Thread checker"**
![](https://images.viblo.asia/7ff6b99e-2010-4e3f-bb6a-a07de6a42eb3.png)


# Kết luận

Bên trên là những kinh nghiệm mình đã có trong quá trình thực hiện add unit test vào một dự án đã chạy.
UI test sẽ có những vấn đề khác mình chưa có cơ hội tiếp cận. Trong bài viết tới mình sẽ chia sẻ những kinh nghiệm mình gặp trong quá trình thực hiện unit test và ui test.
Thanks!
Tại Công ty có số lượng nhân viên nhiều, tuy nhiên để thực hiện tạo một bảng tên hay giấy mời có kèm ảnh thẻ của mỗi nhân viên nếu thao tác tay thì rất mất thời gian. Hôm nay mình sẽ hướng dẫn các bạn thao tác làm thẻ nhân viên hay mẫu giấy mời chứa hình ảnh từng nhân viên một cách nhanh chóng, chuẩn xác.

**Đầu tiên để thực hiện thì cần chuẩn bị trước 3 file:**

* File chứa thông tin nhân viên
* File chứa hình ảnh
* File mẫu thư mời được tạo

## Thực hiện các bước trộn thư có chứa hình ảnh trong Word

Bước 1: Tại file Excel chứa thông tin nhân viên. Chèn đường dẫn đến hình ảnh, tại Tab Insert các bạn chọn HyperLink. Hộp thoại Insert Hyperlink sẽ hiện ra. Các bạn di chuyển đến thư mục chứa những hình ảnh của nhân viên, sau đó chọn và nhấn OK.

![](https://images.viblo.asia/64df7691-cca1-4edc-a45c-e0b5dff40e7b.jpg)

Bước 2: Copy dữ liệu vừa chèn xuống các ô còn lại và đổi tên hình cuối cùng hoặc thực hiện link tương tự cho 12 nhân viên.

![](https://images.viblo.asia/9d8fa779-cd8f-47b8-a9b7-c9c804627fdd.jpg)

Bước 3: Mặc dù đã chèn được đúng đường dẫn hình ảnh nhưng bạn phải cần phải thay đổi dấu “\” thành dấu “\\” để đúng định dạng đường dẫn trong Windows.

Thực hiện các bạn bôi đen toàn bộ vùng dữ liệu chứa đường dẫn sau đó ấn Ctrl + H trên bàn phím để mở hộp thoại tìm kiếm và thay thế.

Tại Find what nhập “\” và phần Replace with nhập “\\”. Sau đó nhấn Replace All ở bên dưới để tiến hành thay đổi toàn bộ.

![](https://images.viblo.asia/e1c47c3b-3298-42d7-9b59-2a99e98f8d35.jpg)

Bước 4: Chuyển qua file Word tạo thư mời.

Ở đây mình tạo riêng lẽ thư mời chứa thông tin như họ tên, mã nhân viên, chức vụ vào sẵn mỗi trang cho một nhân viên. Sau tại tab Insert chọn Table rồi chọn Draw Table để vẽ một khung chứa hình ảnh của nhân viên vào thư mời.

![](https://images.viblo.asia/85e481b4-4ae9-4ab7-80fc-2e7f69cbfcfd.jpg)

Bước 5: Tiến hành kết nối với dữ liệu mà chúng ta đã có ở file Excel phía trên. Tại tab Mailings chọn Select Recipients rồi chọn Use an Existing List.

![](https://images.viblo.asia/cce75d18-c58f-4942-b91e-030605ccdec8.jpg)

Bước 6: Chọn đúng thư mục chứa file Danh Sách Excel. Sau đó hộp thoại Select Table hiện ra, hệ thống sẽ hỏi chúng ta muốn sử dụng Sheet nào trong file Excel vừa chọn. Hiện mình chỉ sử dụng một Sheet nên các bạn chỉ cần nhấn OK là được.

![](https://images.viblo.asia/1af5897d-088e-4142-aaf7-5490d7b33973.jpg)

Bước 7: Tại tab Mailings --> Insert Merge Field và chọn trường tương ứng với danh sách trong bảng như: “Mã Nhân viên”, “Họ tên”, “Chức vụ”, “Phòng ban”. Riêng Hình Ảnh thực hiện Bước 8.

![](https://images.viblo.asia/16b1a407-f0d3-4060-8a56-167594dbe5b3.jpg)

Bước 8: Tại ô chứa hình ảnh --> ấn nút F9 hoặc Ctrl+F9 ở 1 số máy. Hiển thị dấu ngoặc nhọn “{}” là chính xác.

Nhập lệnh: “INCLUDEPICTURE” vào dấu ngoặc nhọn. Lưu ý sau khi viết chữ xong các bạn phải cách ra 1 kí tự rồi nhập dấu ngoặc kép “. Cuối cùng tại Tab Mailings chọn Insert Merge Field rồi chọn “Hình Ảnh”.

![](https://images.viblo.asia/dc1979ff-00f5-452e-94c9-101bf6283182.jpg)

Bước 9: Để các trang tiếp theo đều hiển thị hết thông tin của Nhân Viên. Ta thực hiện như sau: Tại Tab Mailings --> Start Mail Merge --> Labels. Sau đó hộp thoại Label Options sẽ hiện ra, các bạn không cần thao tác gì cả và chỉ cần nhấn Cancel thôi.

![](https://images.viblo.asia/4c2b0fb6-db78-4661-905f-b2f040d77402.jpg)

Bước 10: Sau khi đã tạo label xong, các bạn ấn Update Labels tại thẻ Mailings để các trang còn lại chứa định dạng giống như ô đầu tiên chúng ta làm nãy giờ.

![](https://images.viblo.asia/e2b64cf2-49e6-4833-a003-0b4975575012.jpg)

Bước 11: Xem dữ liệu. Tại tab Mailings các bạn chọn Finish & Merge rồi chọn Edit Individual Documents. Lúc này sẽ có hộp thoại mới hiện ra, các bạn chọn mục All rồi nấn OK.

![](https://images.viblo.asia/f3a231e4-e913-4725-a67b-0a276d4abfb9.jpg)

Bước 12: Lúc này hình ảnh chưa hiển thị. Các bạn nhấn Ctrl+A để bôi tất cả bảng. Sau đó ấn F9 hoặc Fn+F9 ở một số máy là hình ảnh sẽ hiển thị ra.

![](https://images.viblo.asia/6fd1afc0-d499-4d94-9903-e2363312cbde.jpg)

Video Hướng Dẫn: https://youtu.be/yVm1-QATM5Y

Như vậy bạn đã thực hiện thành công các bước hướng dẫn trộn thư có chứa hình ảnh, Bấy giờ bạn chỉ cần lưu lại và sử dụng. Chúc các bạn thành công!
<<Tiếp>> Bài https://viblo.asia/p/lam-the-nao-de-tich-hop-uft-qtp-voi-alm-hp-alm-quality-center-Do754q8LKM6

Bước 8) Bước tiếp theo là lưu các tệp thư viện chức năng được liên kết trong mô-đun 'tài nguyên thử nghiệm' của ALM sẽ được chọn tự động trong khi thực hiện.

Đối với tập lệnh này, chúng ta có hai thư viện hàm được liên kết với tập lệnh kiểm tra đã tạo, trong đó một thư viện chứa tất cả các chức năng liên quan đến ứng dụng và một thư viện chứa chức năng sẽ giúp người dùng tạo tệp kết quả văn bản đầu ra.
![](https://images.viblo.asia/1a944a60-b2c5-48ba-9ba5-2002c4bb7861.PNG)

Bước 9) Chúng ta cần lưu các tệp thư viện liên quan trong ALM trong phần 'test Resources'.
* Nhấp vào nút 'New Resource'
* Hộp thoại 'New Resource' mở ra
* Nhập tên của thư viện chức năng
* Chọn loại là 'Function Library'
* Nhấp vào 'OK'

![](https://images.viblo.asia/2a008050-4be3-430a-90f1-c3623a88b9d3.PNG)

Bước 10) Tài nguyên kiểm tra đã tạo sẽ được hiển thị cho người dùng như hiển thị bên dưới.
![](https://images.viblo.asia/9d61a202-3ec8-49ff-bd27-a5964f89dada.PNG)

Bước 11) Bây giờ chúng ta cần tải lên .vbs lên tài nguyên kiểm tra đã tạo.
* Nhấp vào 'Resource Viewer'
* Nhấp vào 'Upload File'
![](https://images.viblo.asia/60b2a574-2916-4baf-b3e1-7a59c43e72ae.PNG)

Bước 12) Hộp thoại tải lên tập tin mở ra.

* Chọn đường dẫn chứa tệp .vbs
* Chọn tập tin phải được tải lên.
* Nhấp vào 'Open'.
![](https://images.viblo.asia/3891a706-d172-4d72-9a0d-d3fa92caf149.PNG)

Bước 13) Khi tải lên thành công, ALM sẽ hiển thị trạng thái cho người dùng. Nhấp vào 'OK'.
![](https://images.viblo.asia/bcb9a132-2422-4073-8a88-8a7b10bebeff.PNG)

Bước 14) Tài nguyên kiểm tra được tải lên có thể được xem bằng 'Resource Viewer'.
![](https://images.viblo.asia/c79a5cae-6b41-4829-98f0-85e5049a710f.PNG)

Bước 15) Lặp lại các bước 8 đến 14 để tải lên một tệp chức năng khác được liên kết với thử nghiệm. Sau khi tải lên 'generateresult.vbs', trình xem tài nguyên sẽ được hiển thị như bên dưới.
![](https://images.viblo.asia/5bae9b59-4ccb-482c-9431-6a0c90bffce0.PNG)

Bước 16) Bây giờ chúng ta cần tải lên các tệp 'Object Repository' có liên quan trong mô-đun 'test resources', tương tự như cách chúng ta đã tải lên các thư viện chức năng.

1. Nhấp vào mô-đun 'New Resource'
2. Cửa sổ Mô-đun 'New Resource' mở ra.
3. Nhập tên của tài nguyên kiểm tra.
4. Chọn loại tệp là 'Object Repository'.
5. Nhấp vào 'OK'
![](https://images.viblo.asia/f2731fae-d82a-49cd-a175-f3cf81023b0c.PNG)

Bước 17) Tài nguyên thử nghiệm được tạo như hình dưới đây. Bây giờ người dùng cần tải lên tệp lưu trữ.

* Nhấp vào tab 'Resource Viewer'.
* Nhấp vào nút 'Upload File'.
![](https://images.viblo.asia/c9bdf373-15c0-47e1-9818-5c943c6981cb.PNG)

Bước 18) Bây giờ tải lên tệp kho đối tượng chia sẻ.

Chọn tập tin nơi nó đã được lưu trữ.
Nhấp vào nút 'Open'.
![](https://images.viblo.asia/f55423e2-2d1b-4814-8790-e133036d7950.PNG)

Bước 19) Khi tải lên thành công, ALM sẽ hiển thị trạng thái cho người dùng. Nhấp vào 'OK'.
![](https://images.viblo.asia/9d6fd746-d172-4faf-8425-2d8da6a841e9.PNG)

Bước 20) Tài nguyên kiểm tra có thể được xem ngay từ ALM như hình bên dưới.
![](https://images.viblo.asia/121013f3-560e-43bf-8e6b-447aa3fede3d.PNG)


Bước 21) Tài nguyên kiểm tra cuối cùng mà chúng ta cần tải lên là Bảng 'Test Data' có chứa  tham số Test

Đối với mục đích Demo, chúng ta đã tự động 4 trường hợp thử nghiệm. Dữ liệu thử nghiệm được thiết kế được hiển thị như dưới đây. Bây giờ chúng ta cần tải lên tương tự trong ALM.
![](https://images.viblo.asia/f5cdeab8-a133-4bc3-8d0e-057128105da6.PNG)

Bước 22) Tạo tài nguyên mới với tên 'TestData' và chọn loại là 'test Resource' và chọn 'OK'
![](https://images.viblo.asia/5b001732-ba6d-436b-a6a4-7e0ebbff3414.PNG)

Bước 23) Như được giải thích từ bước 17 đến 19, tải lên tệp dữ liệu thử nghiệm Excel và tải lên không thành công "test data" được tạo sẽ được hiển thị như bên dưới.

![](https://images.viblo.asia/5f90ce17-ff83-4a8a-89ba-86507bea5bca.PNG)

<<Còn tiếp>>

Tài liệu tham khảo: https://www.guru99.com/hp-alm-integrate-uft.html
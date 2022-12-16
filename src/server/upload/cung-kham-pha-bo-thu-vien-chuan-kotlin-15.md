Bài viết này chia sẻ về một số thay đổi của thư viện chuẩn Kotlin ở phiên bản 1.5, nếu mọi người thấy thiếu sót có thể comment phía dưới nhé  :sweat_smile:. Còn bây giờ thì bắt đầu thôi.

**1. Các hàm mới của collection**

* Giả sử bạn có một danh sách các đối tượng, tất cả đều có thuộc tính là nullable và bạn muốn nhận giá trị không phải null đầu tiên của thuộc tính đó trong collection. Thông thường, đầu tiên chúng ta sẽ sử dụng mapNotNull() để lấy ra một collection tất cả các giá trị không null và sau đó gọi firstOrNull() để lấy giá trị cuối cùng.
    
* Trong Kotlin 1.5, chúng ta có các hàm như: firstNotNullOf() và firstNotNullOfOrNull().
    * Hàm firstNotNullOf() trả về giá trị không phải null đầu tiên của collection.
    * Hàm firstNotNullOfOrNull() trả về giá trị không phải null đầu tiên của collection hoặc trả về null nếu không có phần tử nào phù hợp.

* Hàm firstNotNullOf() là sự kết hợp của mapNotNull() và first(). Tương tự firstNotNullOfOrNull() là sự kết hợp của mapNotNull() và firstOrNull().

![](https://images.viblo.asia/4d776f12-8212-4406-a022-f5c1a63b88b6.png)


**2. Các loại số nguyên Unsigned : UByte, UShort, UInt, ULong**

* Các loại số unsigned này hữu ích khi bạn muốn giới hạn một loại chỉ chứa các giá trị không âm. Chúng có thể trực quan hơn khi chúng ta làm việc ở mức bit và byte, thao tác với pixel trong bitmap, byte trong tệp hoặc dữ liệu nhị phân khác
    * UByte: 1 số nguyên unsigned 8-bit, nằm trong khoảng từ 0 - 255.
    * UShort: 1 số nguyên unsigned 16-bit, nằm trong khoảng từ 0 - 65535
    * UInt: 1 số nguyên unsigned 32-bit, nằm trong khoảng từ 0 - 2^32 - 1
    * ULong: 1 số nguyên 64-bit, nằm trong khoảng từ 0 - 2^64-1


**3. Chia lấy nguyên và toán tử mod**

* Hàm floorDiv() giúp chúng ta có thể chia 2 số và lấy phần nguyên của chúng. 

 ![](https://images.viblo.asia/61f23a85-84b3-4e43-b595-6a91279bfdf1.png)

*  Hàm mod trả về số dư sau khi chia một số cho ước số. Hàm này khác với toán tử "%", được gọi là "rem" trong Kotlin.

![](https://images.viblo.asia/61e7a608-1459-4871-9b51-28e8dd978b39.png)

* Ở đây toán tử "%" trả về -1. Nhưng a.mod(b) là sự khác biệt giữa a và a.floorDiv(b) * b. Nó bằng 0 hoặc có cùng dấu với b, trong khi a%b có thể có một dấu khác.


**4. API chuyển đổi kí tự thành số nguyên**

* Đối với các ký tự riêng lẻ, Kotlin đã giới thiệu các chức năng giúp chuyển đổi chúng thành số. Kotlin giới thiệu cách chuyển đổi các kí tự thành các nhóm chức năng sau đây:

     Các hàm lấy mã số nguyên của kí tự và tạo kí tự từ mã đã cho  
     
     ![](https://images.viblo.asia/b69ad4ef-7e5a-40dc-9ca7-d025db8bb4a8.png)
     
     Các hàm chuyển kí tự thành giá trị số của số mà nó đại diện
     
     ![](https://images.viblo.asia/9295a06f-da34-4e8b-b869-add5f43e6a9a.png)

     
     Một hàm mở rộng cho kiểu số nguyên để chuyển đổi chữ số đơn không âm mà nó biểu thị thành kí tự tương ứng
     
    ![](https://images.viblo.asia/2d1ae0b2-c19a-45ad-b06b-df7cf20a821e.png)


**5. Các hàm chuyển đổi String/Char**

* Kotlin 1.5 giới thiệu một locale-agnostic API cho chuyển đổi văn bản chữ hoa/ chữ thường. Locale-agnostic nghĩa là bất kể cài đặt ngôn ngữ nào trên thiết bị, bạn sẽ nhận được kết quả chuyển đổi nhất quán. Vì vậy, nó giúp bạn tránh các lỗi do cài đặt ngôn ngữ khác nhau.

    Các hàm chuyển đổi chuỗi

    ![](https://images.viblo.asia/c9ec508a-aa19-48b0-be9f-0b7ce4ed6c9b.png)

    Các hàm chuyển đổi kí tự

    ![](https://images.viblo.asia/15d07cdb-ab1e-474a-ab4b-452f1aeb5b45.png)

    Nếu bạn muốn chuyển đổi dựa trên ngôn ngữ, bạn cần chỉ định rõ ràng ngôn ngữ như bên dưới

    ![](https://images.viblo.asia/865de1d0-b110-4a0d-a689-caa2f4668b1d.png)



**Kết bài**
* Hi vọng việc đọc bài viết giúp bạn có thêm kiến thức. Nếu muốn tìm hiểu thêm bạn có thể vào tài liệu này: https://kotlinlang.org/docs/whatsnew15.html#standard-library
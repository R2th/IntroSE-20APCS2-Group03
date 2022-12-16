Kiểm tra bảng quyết định là một kỹ thuật kiểm thử phần mềm được sử dụng để kiểm tra hành vi hệ thống cho các kết hợp đầu vào khác nhau. 

Đây là cách tiếp cận có hệ thống trong đó các kết hợp đầu vào khác nhau và hành vi hệ thống tương ứng (Đầu ra) của chúng được ghi lại dưới dạng bảng. 

Đó là lý do tại sao nó còn được gọi là dưới dạng bảng Cause-Effect nơi nguyên nhân và độ ảnh hưởng được ghi lại để bảo hiểm thử nghiệm tốt hơn.

Bảng quyết định là biểu diễn dạng bảng của đầu vào so với quy tắc / trường hợp / điều kiện kiểm tra. Hãy tìm hiểu với một ví dụ.

![](https://images.viblo.asia/fe449cb8-0ffb-41df-ac9f-1f2d8daa87ad.PNG)

Điều kiện rất đơn giản nếu người dùng cung cấp tên người dùng và mật khẩu chính xác, người dùng sẽ được chuyển hướng đến trang chủ. Nếu bất kỳ đầu vào nào sai, thông báo lỗi sẽ được hiển thị.
![](https://images.viblo.asia/2923ed5c-4530-4588-8b5b-dab1a955c647.PNG)

Kí hiệu:

* T - Tên người dùng / mật khẩu chính xác
* F - Tên người dùng / mật khẩu sai
* E - Thông báo lỗi được hiển thị
* H - Màn hình chính được hiển thị

Các trường hợp chính:
* Trường hợp 1 - Cả tên người dùng và mật khẩu đều sai. Người dùng được hiển thị thông báo lỗi.
* Trường hợp 2 - Tên người dùng đã đúng, nhưng mật khẩu bị sai. Người dùng được hiển thị thông báo lỗi.
* Trường hợp 3 - Tên người dùng bị sai, nhưng mật khẩu đã đúng. Người dùng được hiển thị thông báo lỗi.
* Trường hợp 4 - Cả tên người dùng và mật khẩu đều chính xác và người dùng đã điều hướng đến trang chủ

Trong khi chuyển đổi trường hợp này sang test case, chúng ta có thể tạo 2 kịch bản,

Nhập tên người dùng chính xác và mật khẩu chính xác và nhấp vào đăng nhập, và kết quả mong đợi sẽ là người dùng sẽ được điều hướng đến trang chủ

Sẽ có các kịch bản dưới đây:

* Nhập sai tên người dùng và mật khẩu sai và nhấp vào đăng nhập, và kết quả mong đợi sẽ là người dùng sẽ nhận được thông báo lỗi
* Nhập tên người dùng chính xác và mật khẩu sai và nhấp vào đăng nhập, và kết quả mong đợi sẽ là người dùng sẽ nhận được thông báo lỗi
* Nhập sai tên người dùng và mật khẩu chính xác và nhấp vào đăng nhập, và kết quả mong đợi sẽ là người dùng sẽ nhận được thông báo lỗi vì về cơ bản họ kiểm tra cùng một quy tắc.

**Ví dụ 2: Cách tạo Bảng quyết định cho màn hình Upload**

Bây giờ hãy xem xét một hộp thoại sẽ yêu cầu người dùng tải lên ảnh với một số điều kiện như -

* Bạn chỉ có thể tải lên hình ảnh định dạng '.jpg'
* kích thước tệp dưới 32kb
* độ phân giải 137 * 177.
* Nếu bất kỳ điều kiện nào bị lỗi, hệ thống sẽ đưa ra thông báo lỗi tương ứng nêu rõ vấn đề và nếu tất cả các điều kiện được đáp ứng, ảnh sẽ được cập nhật thành công

Hãy tạo bảng quyết định cho trường hợp này.
![](https://images.viblo.asia/14a773ae-5c4d-49f6-89d5-e3389a278f00.PNG)

Đối với điều kiện này, chúng ta có thể tạo 8 trường hợp thử nghiệm khác nhau và đảm bảo phạm vi bảo hiểm hoàn toàn dựa trên bảng trên.

* Tải lên ảnh có định dạng '.jpg', kích thước nhỏ hơn 32kb và độ phân giải 137 * 177 và nhấp vào tải lên. Kết quả dự kiến là Ảnh sẽ tải lên thành công
* Tải lên một bức ảnh với định dạng '.jpg', kích thước nhỏ hơn 32kb và độ phân giải không phải là 137 * 177 và nhấp vào tải lên. Kết quả dự kiến là độ phân giải thông báo lỗi không khớp
* Tải lên một bức ảnh với định dạng '.jpg', kích thước hơn 32kb và độ phân giải 137 * 177 và nhấp vào tải lên. Kết quả được hiển thị là kích thước thông báo lỗi không khớp
* Tải lên ảnh có định dạng '.jpg', kích thước lớn hơn 32kb và độ phân giải không phải là 137 * 177 và nhấp vào tải lên. Kết quả được hiển thị là Kích thước thông báo lỗi và độ phân giải không khớp sẽ được hiển thị
* Tải lên ảnh có định dạng khác với '.jpg', kích thước nhỏ hơn 32kb và độ phân giải 137 * 177 và nhấp vào tải lên. Kết quả dự kiến là thông báo lỗi cho định dạng không khớp sẽ được hiển thị
* Tải lên ảnh có định dạng khác với '.jpg', kích thước nhỏ hơn 32kb và độ phân giải không phải là 137 * 177 và nhấp vào tải lên. Kết quả dự kiến là Định dạng thông báo lỗi và độ phân giải không khớp sẽ được hiển thị
* Tải lên ảnh có định dạng khác với '.jpg', kích thước hơn 32kb và độ phân giải 137 * 177 và nhấp vào tải lên. Kết quả dự kiến là thông báo lỗi cho định dạng và kích thước không khớp sẽ được hiển thị
* Tải lên ảnh có định dạng không phải là '.jpg', kích thước hơn 32kb và độ phân giải không phải là 137 * 177 và nhấp vào tải lên. Kết quả được hiển thị là thông báo lỗi cho định dạng, kích thước và độ phân giải không khớp

**Tại sao bảng quyết định là quan trọng?**

Kỹ thuật kiểm tra này trở nên quan trọng khi được yêu cầu kiểm tra sự kết hợp khác nhau. Nó cũng giúp trong phạm vi kiểm tra tốt hơn cho logic kinh doanh phức tạp.

Trong Kỹ thuật phần mềm, giá trị biên và phân vùng tương đương là các kỹ thuật tương tự khác được sử dụng để đảm bảo mức độ bao phủ tốt hơn. Chúng được sử dụng nếu hệ thống hiển thị hành vi tương tự cho một tập hợp đầu vào lớn. Tuy nhiên, trong một hệ thống, trong đó mỗi bộ giá trị đầu vào của hệ thống hành vi là khác nhau, giá trị biên và kỹ thuật phân vùng tương đương không hiệu quả trong việc đảm bảo phạm vi kiểm tra tốt.

Trong trường hợp này, kiểm tra bảng quyết định là một lựa chọn tốt. Kỹ thuật này có thể đảm bảo phạm vi bảo hiểm tốt, và việc trình bày đơn giản để dễ diễn giải và sử dụng.

Bảng này có thể được sử dụng làm tài liệu tham khảo cho yêu cầu và phát triển chức năng vì nó dễ hiểu và bao gồm tất cả các kết hợp.

Tầm quan trọng của kỹ thuật này trở nên rõ ràng ngay lập tức khi số lượng đầu vào tăng lên. Số kết hợp có thể được đưa ra bởi 2 ^ n, trong đó n là số lượng Đầu vào. For n = 10, rất phổ biến trong thử nghiệm dựa trên web, có hình thức đầu vào lớn, số lượng kết hợp sẽ là 1024. Rõ ràng, bạn không thể kiểm tra tất cả nhưng bạn sẽ chọn một tập hợp con phong phú của các kết hợp có thể sử dụng kỹ thuật kiểm tra dựa trên quyết định.


**Ưu điểm của kiểm tra bảng quyết định**
Khi hành vi hệ thống khác nhau đối với đầu vào khác nhau và không giống nhau đối với một phạm vi đầu vào, cả phân vùng tương đương và phân tích giá trị biên sẽ không giúp ích, nhưng có thể sử dụng bảng quyết định.

Việc trình bày rất đơn giản để có thể dễ dàng diễn giải và được sử dụng để phát triển và kinh doanh.

Bảng này sẽ giúp thực hiện các kết hợp hiệu quả và có thể đảm bảo phạm vi bảo hiểm tốt hơn để thử nghiệm

Bất kỳ điều kiện kinh doanh phức tạp nào cũng có thể dễ dàng biến thành các bảng quyết định

Trong trường hợp chúng tôi sẽ bảo hiểm 100% thông thường khi các kết hợp đầu vào thấp, kỹ thuật này có thể đảm bảo phạm vi bảo hiểm.

**Nhược điểm của kiểm tra bảng quyết định**
Nhược điểm chính là khi số lượng đầu vào tăng lên, bảng sẽ trở nên phức tạp hơn
# Khái niệm về Software Test Estimation
- Estimate testing là một hoạt động quản lý ước tính thời gian hoàn thành  một task Test.  Đây là một trong những nhiệm vụ chính và quan trọng trong Test Management.
![](https://images.viblo.asia/14bdace8-6081-445f-b7f0-729e6c33f5f7.jpg)

* **Resources:** Cần có các nguồn lực để thực hiện bất kỳ nhiệm vụ nào của dự án. Đó có thể là con người, thiết bị, cơ sở vật chất, kinh phí hoặc bất kỳ thứ gì khác có khả năng xác định được yêu cầu để hoàn thành một hoạt động dự án.
* **Times :** Thời gian là tài nguyên quý giá nhất trong một dự án. Mọi dự án đều có thời hạn bàn giao nhất định.
* **Human Skills :** Trình độ con người có nghĩa là kiến thức và kinh nghiệm của các thành viên trong team. Chúng ảnh hưởng đến Estimate của bạn. Ví dụ, một team Test có các thành viên có kỹ năng testing thấp, sẽ mất nhiều thời gian hơn để hoàn thành dự án so với team Test có kỹ năng kiểm tra cao.
* **Cost:** 
Chi phí là ngân sách dự án. Nói chung, nó có nghĩa là cần bao nhiêu tiền để hoàn thành dự án.

# Làm thế nào để Test Estimation?
Dưới đây là danh sách các kỹ thuật Estimate:
* Work Breakdown Structure ( Cấu trúc phân tích công việc)
* 3-Point Software Testing Estimation (Estimate kiểm thử qua 3 điểm)
* Wideband Delphi  (Băng rộng Delphi)
* Function Point/Testing Point Analysis ( Phân tích điểm chức năng/điểm kiểm thử)
* Use – Case Point Method ( Phương pháp điểm Use-case)
* Percentage distribution (Phân phối phần trăm)
* Ad-hoc method (Phương pháp đặc biệt)
 
 ![](https://images.viblo.asia/970a16b5-bec5-47bd-bde1-f597df6c0785.png)
 
 Sau đây là quy trình 4 bước để thực hiện Estimate:
 ![](https://images.viblo.asia/aa62c674-3b6e-4b1d-bcd3-f0da5ac04c76.png)
 
**Step1) Chia toàn bộ nhiệm vụ dự án thành các nhiệm vụ nhỏ.**

Nhiệm vụ là một phần của công việc đã được giao cho ai đó. Để làm điều này, bạn có thể sử dụng kỹ thuật Work Breakdown Structure technique.

Trong kỹ thuật này, một dự án phức tạp được chia thành các mô-đun. Các mô-đun được chia thành các mô-đun con. Mỗi mô-đun con được chia thành các chức năng. Nó có nghĩa là chia toàn bộ nhiệm vụ dự án thành các nhiệm vụ nhỏ nhất.
![](https://images.viblo.asia/1ab67ddb-9018-4f78-88bc-f64926e3516f.png)

Sử dụng Work Breakdown Structure technique để chia nhỏ 1 dự án bất kỳ thành 5 tasks nhỏ hơn:
![](https://images.viblo.asia/224e65a0-35de-4f49-8d2f-5d23828a12f2.png)

Sau đó,  có thể chia nhỏ từng nhiệm vụ thành nhiệm vụ nhỏ hơn. Mục đích của hoạt động này là tạo nhiệm vụ càng chi tiết càng tốt.


| Task| Sub task | 
| -------- | -------- |  
| Phân tích đặc tả yêu cầu phần mềm    | Điều tra các thông số kỹ thuật yêu cầu mềm   |  
|                                                                                          | Trao đổi với nhà phát triển và các bên liên quan khác để biết thêm về trang web    |
| Tạo kịch bản kiểm thử | Thiết kế các kịch bản kiểm thử      |  
|    | Tạo các trường hợp kiểm thử    | 
|     | Xem xét và sửa đổi các trường hợp kiểm thử  | 
| Chạy các trường hợp kiểm thử     |Xây dựng môi trường kiểm thử   |  
|     |Chạy các trường hợp kiểm thử    |  
|    |Xem xét các kết quả chạy các trường hợp kiểm thử |  
 Báo cáo các lỗi   | Tạo báo cáo về các lỗi    |
  |     | Báo cáo các lỗi    | 
  
  
**Step 2) Phân bổ từng nhiệm vụ cho thành viên trong team**


| Task | Members |  
| -------- | -------- |  
| Phân tích yêu cầu nghiệp vụ phần mềm   | Tất cả thành viên    |  
|Tạo tài liệu test   | QA Leader   |  
|Setup môi trường test   | QA Leader   | 
| Thực hiện test   | QA member   | 
| Báo cáo lỗi  | QA member    | 

**Step 3) Ước tính nỗ lực cho mỗi task**

Có 2 kỹ thuật phổ biến để ước tính nỗ lực cho mỗi tasks
*   Functional Point Method
*  Three Point Estimation

**1. Functional Point Method**-  Phương pháp tính Point chức năng


Trong kỹ thuật này, QA management ước tính Kích thước, Thời lượng và Chi phí cho các nhiệm vụ.

![](https://images.viblo.asia/98a69b63-53eb-4bd7-b26b-75dca9d81b92.png)

*Bước A) Ước tính kích thước(Size) cho mỗi nhiệm vụ:*

Trong step1,  đã chia toàn bộ nhiệm vụ dự án thành nhiệm vụ nhỏ bằng cách sử dụng phương pháp WBS. Bây giờ bạn ước tính size của các nhiệm vụ đó. Hãy thực hành với một ví dụ về nhiệm vụ cụ thể  “Tạo tài liệu kiểm thử”

Kích thước của nhiệm vụ này phụ thuộc vào kích thước chức năng của hệ thống được kiểm thử. Kích thước chức năng phản ánh số lượng chức năng có liên quan đến người dùng. Càng nhiều chức năng, hệ thống càng phức tạp.

Trước khi bắt đầu công việc ước tính thực tế, các điểm chức năng được chia thành ba nhóm như Phức tạp(Complex), Đơn giản(Simple) Trung bình(Medium) như sau:
![](https://images.viblo.asia/1a573d0c-d786-4873-9cb5-4655166c288e.png)
Dựa trên sự phức tạp của các chức năng phần mềm, QA management phải cung cấp đủ trọng số cho từng điểm chức năng. Ví dụ


| Group| Weightage|  
| -------- | -------- |  
| Complex    | 5   | 
| Medium   | 3    | 
| Simple    | 1    | 

Hãy xem một bài tập ví dụ đơn giản để hiểu rõ hơn:

Hãy xem thông số kỹ thuật phần mềm của trang web Guru99 Bank ở đây, kỹ sư phần mềm đã mô tả chi tiết các mô-đun phần mềm, ta có thể xác định mức độ phức tạp của các tính năng của trang web bằng cách đưa ra trọng số cho từng mô-đun không?
Các điểm chức năng phức tạp hơn sẽ mất nhiều nỗ lực hơn để kiểm tra nó. Trang web được chia thành 12 điểm chức năng, bạn có thể xác định độ phức tạp của từng điểm chức năng như sau


| No | Module Name | Description |Weightage |  
| -------- | -------- | -------- | -------- | -------- |
| 1   | Kiểm tra số dư  | **Khách hàng:** Một khách hàng có thể có nhiều tài khoản ngân hàng. Họ có thể xem số dư tài khoản của mình. **Người quản lý:** Người quản lý có thể xem số dư của tất cả những khách hàng chịu sự giám sát của họ    | 3 | 
|2    |Chuyển quỹ | **Khách hàng:** Khách hàng có thể chuyển tiền từ tài khoản “của riêng mình” sang bất kỳ tài khoản đích nào.**Người quản lý:** Người quản lý có thể chuyển tiền từ bất kỳ tài khoản ngân hàng nguồn nào sang tài khoản đích    |5     | 
| 3    | Báo cáo nhỏ | Một bảng sao kê Mini sẽ hiển thị 5 giao dịch gần đây nhất của một tài khoản. **Khách hàng:** Khách hàng chỉ có thể xem bảng sao kê nhỏ về các tài khoản “của riêng mình”. **Người quản lý:** Người quản lý có thể xem bảng sao kê nhỏ của bất kỳ tài khoản nào    | 3| 
|4    | Tùy chỉnh  | Một bảng sao kê tùy chỉnh cho phép bạn lọc và hiển thị các giao dịch trong tài khoản dựa trên ngày, giá trị giao dịch. **Khách hàng:** Khách hàng chỉ có thể xem bảng sao kê tùy chỉnh về các tài khoản “của riêng mình”. **Người quản lý:** Người quản lý có thể xem Báo cáo tùy chỉnh của bất kỳ tài khoản nào   |  5     | 
|5     |Thay đổi mật khẩu   | **Khách hàng:** Khách hàng chỉ có thể thay đổi mật khẩu của tài khoản của mình. **Người quản lý:** Người quản lý chỉ có thể thay đổi mật khẩu của tài khoản của mình, không thể thay đổi mật khẩu của khách hàng của mình  | 1
| 6    | Khách hàng mới | Người quản lý: Người quản lý có thể thêm một khách hàng mới, chỉnh sửa các thông tin chi tiết như địa chỉ, email, điện thoại của khách hàng.    | 3 |  
| 7     | Tài khoản mới  | Hiện tại hệ thống cung cấp 2 loại tài khoản: Tiết kiệm & Hiện hành. Một **khách hàng** có thể có nhiều tài khoản tiết kiệm và có thể có nhiều tài khoản hiện hành cho các công ty khác nhau. **Người quản lý:** Người quản lý có thể thêm tài khoản mới cho khách hàng hiện tại.  | 5     |  
| 8     | Chỉnh sửa tài khoản | **Người quản lý:** Người quản lý có thể thêm chỉnh sửa chi tiết tài khoản cho tài khoản hiện có    | 1    | 
|9  | Xóa tài khoản | **Người quản lý:** Người quản lý có thể thêm xóa tài khoản cho khách hàng.    | 1     |  
| 10     |Xóa khách hàng  | **Khách hàng** chỉ có thể bị xóa nếu họ không có tài khoản hiện tại hoặc tài khoản tiết kiệm đang hoạt động. **Người quản lý:**  có thể xóa một khách hàng.    | 1    |  
| 11   | Tiền gửi  | **Người quản lý:**  có thể gửi tiền vào bất kỳ tài khoản nào. Thường được thực hiện khi tiền mặt được gửi tại chi nhánh ngân hàng.    | 3     |  
| 12   | Rút tiền  | **Người quản lý:**  có thể rút tiền từ bất kỳ tài khoản nào. Thường được thực hiện khi rút tiền mặt tại chi nhánh ngân hàng.    | 3    | 

*BƯỚC B) Ước tính thời lượng cho nhiệm vụ*

Sau khi phân loại mức độ phức tạp của các điểm chức năng,  phải ước tính khoảng thời gian để kiểm thử chúng. Thời lượng có nghĩa là cần bao nhiêu thời gian để hoàn thành nhiệm vụ.

![](https://images.viblo.asia/710d67e7-c1e8-4454-9386-024cb33df3b7.png)

Tổng Effort: Nỗ lực kiểm tra hoàn toàn tất cả các chức năng của trang web
Tổng số điểm chức năng: Tổng số mô-đun của trang web.

Ước lượng được xác định cho mỗi Điểm chức năng: Nỗ lực trung bình để hoàn thành một điểm chức năng. Giá trị này phụ thuộc vào năng suất của thành viên sẽ đảm nhiệm công việc này.

Giả sử nhóm dự án của bạn đã ước tính được xác định cho mỗi Điểm chức năng là 5 giờ / điểm. Bạn có thể ước tính tổng nỗ lực để kiểm tra tất cả các tính năng của trang web Guru99 Bank như sau:


|   | Weightage | Function Points | Total |
| -------- | -------- | -------- |-------- |
|Complex    |5    | 3    |15   |
|Medium    | 3    | 5    |15   |
|Simple    | 1   | 4    |4   |
|**Function Total Points**    |     |     |34   |
|  **Estimate define per point** |   |    |5   |
|  **Total Estimated Effort (Person Hours**) |   |    |170|
Vì vậy, tổng nỗ lực để hoàn thành nhiệm vụ “Tạo tài liệu kiểm thử” của Guru99 Bank là khoảng 170  man-hours

*BƯỚC C) Ước tính chi phí cho các nhiệm vụ*

Bước này giúp bạn trả lời câu hỏi cuối cùng của khách hàng "Nó có giá bao nhiêu?"

Giả sử, mức lương trung bình cho nhóm của bạn là $ 5 mỗi giờ. Thời gian cần thiết cho task “Tạo tài liệu kiểm thử” là 170 giờ. Theo đó, chi phí cho nhiệm vụ là 5 * 170 = $ 850. Bây giờ bạn có thể tính toán ngân sách cho các hoạt động khác trong WBS và đi đến ngân sách tổng thể cho dự án.

Là người quản lý dự án, bạn phải quyết định làm thế nào để thu được nhiều lợi nhuận nhất cho khoản đầu tư của công ty bạn. Ước tính chi phí dự án của bạn càng chính xác, bạn càng có thể quản lý ngân sách của dự án tốt hơn.

**2. Three Point Estimation**

Three Point Estimation là một trong những kỹ thuật có thể được sử dụng để ước tính một nhiệm vụ. Tính đơn giản của Three Point Estimation làm cho nó trở thành một công cụ rất hữu ích cho Người quản lý dự án muốn ước tính.

Trong "Three Point Estimation", ba giá trị được tạo ban đầu cho mọi nhiệm vụ dựa trên kinh nghiệm từ các dự án trước đó như sau:
 ![](https://images.viblo.asia/80cecb72-ee5b-4149-ba2a-dcf99000f370.png)
Khi ước tính một nhiệm vụ, QA management cần cung cấp ba giá trị, như được chỉ định ở trên. Ba giá trị được xác định, ước tính điều gì xảy ra ở trạng thái tối ưu, điều gì có khả năng xảy ra cao nhất hoặc những gì sẽ là trường hợp xấu nhất.

Hãy xem cách sử dụng ba giá trị trên trong ví dụ sau

Đối với nhiệm vụ “Tạo tài liệu kiểm thử”, ta có thể ước tính nỗ lực kiểm thử không? Hãy nhớ rằng nó sẽ cần liệt kê bao gồm tất cả các mô-đun của trang web Guru99 Bank giống như được thực hiện trong Phương pháp Functional Point Method.

Ta có thể ước lượng như sau:

* Trường hợp tốt nhất để hoàn thành nhiệm vụ này là 120 man-hours (khoảng 15 ngày). Trong trường hợp này, team có một đội ngũ tài năng, họ có thể hoàn thành nhiệm vụ trong thời gian nhỏ nhất.
* Trường hợp có nhiều khả năng nhất để hoàn thành nhiệm vụ này là 170 man-hours (khoảng 21 ngày). Đây là trường hợp bình thường,  có đủ nguồn lực và khả năng để hoàn thành nhiệm vụ
* Trường hợp xấu nhất để hoàn thành nhiệm vụ này là 200 man-hours (khoảng 25 ngày). Ta cần thực hiện nhiều công việc hơn vì các thành viên trong nhóm chưa có kinh nghiệm.
 
Bây giờ, hãy gán giá trị cho từng tham số như bên dưới
   
                                       a=120 m=170 b=200
 Nỗ lực hoàn thành nhiệm vụ có thể được tính bằng công thức phân phối tam giác kép như sau:
 ![](https://images.viblo.asia/2b4e1876-2e8b-4af8-ad88-b8fe93893966.png)

Trong công thức trên, tham số E được gọi là Gía trị Trung bình. Nó là ước tính của nhiệm vụ "Tạo tài liệu kiểm thử".

Nhưng sẽ gặp câu hỏi sau:
![](https://images.viblo.asia/357eac6c-38a7-48fd-a7b8-f6c98bf852fe.jpg)


Trong ước lượng trên, ta chỉ cần xác định một giá trị có thể xảy ra chứ không phải một giá trị nhất định, chúng ta phải biết về xác suất ước tính là đúng. Ta có thể sử dụng công thức khác:
![](https://images.viblo.asia/468daca5-0be3-490b-bac0-1d7f88469a67.png)
Trong công thức trên, Độ lệch chuẩn trung bình SD, giá trị này có thể cung cấp cho bạn thông tin về xác suất ước tính đúng.

Bây giờ bạn có thể kết thúc ước tính cho nhiệm vụ "Tạo tài liệu kiểm thử"

Để hoàn thành tác vụ “Tạo thông số kỹ thuật thử nghiệm” của Guru99 Bank, bạn cần 166,6 ± 13,33 Man-giờ (153,33 đến 179,99 man-giờ)

**Step 4) Xác thực con số ước tính**

Khi  tạo một ước tính tổng hợp cho tất cả các nhiệm vụ được đề cập trong WBS, bạn cần phải chuyển nó đến người quản lý dự án, người sẽ xem xét và phê duyệt nó.
 

Người quản lý dự án sẽ cùng bạn xem xét và thảo luận về phương án dự toán. Bạn có thể giải thích cho họ ước tính của bạn một cách logic và hợp lý để họ có thể chấp thuận kế hoạch ước tính của bạn.

Tài liệu tham khảo: https://www.guru99.com/an-expert-view-on-test-estimation.html
Kiểm thử hộp trắng (White box testing) và kiểm thử hộp đen (Black box testing) là hai phương thức kiểm thử cơ bản nhất hiện nay. Hai phương thức kiểm thử này được sử dụng khá phổ biến. Tuy nhiên, không phải ai cũng biết sự khác biệt giữa chúng. Để tìm hiểu rõ hơn về vấn đề này, hãy tham khảo bài viết dưới đây nhé. :)
   
**1/ Khái niệm**

   Kiểm thử hộp đen (black box testing) là phương pháp kiểm thử phần mềm mà việc kiểm tra các chức năng của một ứng dụng không cần quan tâm vào cấu trúc nội bộ. Mục đích chính của kiểm thử hộp đen chỉ là để xem phần mềm có hoạt động như dự kiến và liệu nó có đáp ứng được sự mong đợi của người dùng hay không.
    ![](https://images.viblo.asia/e2f9ad2d-8570-451d-b6ed-a41a446fd889.PNG)
    
**2/ Mục tiêu**
 - Mục tiêu chính của Black box testing là kiểm tra chức năng của hệ thống được thử nghiệm
 - Đối tượng: Là thành phần phần mềm. Có thể là 1 hàm chức năng, 1 module chức năng, 1 phân hệ chức năng.
 - Người thực hiện test: end user, developer, và tester
 
**3/ Phương pháp kiểm thử**

   Kiểm thử hộp đen được sử dụng thích hợp nhất trong kiểm thử hệ thống (System test) và kiểm thử chấp nhận (Acceptance test). Ngoài ra, kiểu test này còn được sử dụng trong nhiều cấp độ khác của kiểm thử phần mềm như: kiểm thử đơn vị, kiểm thử tích hợp,….
- Khi viết test case: Dựa vào yêu cầu và giao diện bên ngoài của chương trình. Không can thiệp vào bên trong code của chương trình.
- Khi thực hiện test: Thực hiện trên giao diện của chương trình. Yêu cầu chương trình phải chạy được mới test được, không can thiệp vào code.

**4/ Các kỹ thuật của black box test**
- Phân vùng tương đương (Equivalence partitioning - EP)
- Phân tích giá trị biên (Boundary value analysis - BVA)
- Bảng quyết định (Decision table -  test matrix)
- Test chuyển đổi trạng thái (State transition testing)
- Bảng trạng thái (States table)
- Trường hợp sử dụng (Use case testing)

**4.1/ Phân vùng tương đương (Equivalence partitioning - EP)**
- Chia các vùng dựa vào đầu vào, đầu ra,.. thành các khu vực mà kết quả mong đợi là giống nhau (tương đương) vì thế chúng được xử lý theo một cách giống nhau.
- Chỉ cần kiểm chứng 1 giá trị thì sẽ có thể khẳng định được vùng đó là valid hay invalid
- Testcase được thiết kế để bao phủ tất cả các TH valid và invalid. EP được áp dụng ở tất cả các level test

Ví dụ: Tìm tất cả các testcase (items)
     ![](https://images.viblo.asia/d3b0d7fa-47fa-4b88-8e39-16c5538808b9.PNG)
=> EP: 3 case

TC1: x> 1, TC2: 1<= x <=100, TC3: x<100

**4.2/ Phân tích giá trị biên (Boundary value analysis - BVA)**
- Kiểm tra các giá trị có xu hướng ẩn nấp gần ranh giới
- Có 2 loại:
     +  + Tow-boundary: Giá trị lớn nhất và nhỏ nhất trong 1 phân vùng là giá trị biên
     +  + Three-boundary: Giá trị trước, tại, sau trong 1 phân vùng
- Test được thiết kế để cover các giá trị biên valid và invalid
- BVA được áp dụng ở tất cả các level test. Nó khá dễ dàng áp dụng để tìm ra lỗi.
- Đặc tả chi tiết sẽ giúp cho các xác định được giá trị biên này

Ví dụ: -5<x<=4
![](https://images.viblo.asia/0a78221f-0626-48b3-b47a-0329d1941259.PNG)

+ Two boundary: -5, -4, 4, 5
+ Three boundary: -5, -4, -3, 3, 4, 5

**4.3/ Bảng quyết định (Decision table -  test matrix)**
- Kết hợp các input, tình huống hoặc sự kiện
- Diễn đạt bằng các điều kiện đầu vào để họ có TRUE or FALSE

Ví dụ cụ thể, bạn có thể xem ở đây: https://viblo.asia/p/uu-diem-va-nhuoc-diem-cua-test-matrix-RQqKLGOp57z

**4.4/ Test chuyển đổi trạng thái (State transition testing)**
- Một hệ thống có thể biểu hiện một phản ứng khác nhau tùy thuộc vào điều kiện hiên tại hoặc tiền sử
- Nó cho phép test để xem xét các phần mềm về trạng thái của nó, chuyển đổi giữa các trạng thái, các yếu tố đầu vào hoặc sự việc gây ra những thay đổi trạng thái (chuyển tiếp) và các lệnh, các đầu vào, có thẻ làm nổi bật quá trình chuyển đổi hoặc có thể là không hợp lệ

VD: sơ đồ cho nhập PIN cho thẻ
![](https://images.viblo.asia/1cd5023d-1809-4537-ad29-a8b398ddaa4d.PNG)

**Một mô hình chuyển đổi trạng thái có bốn phần cơ bản**: 
- Các trạng thái mà phần mềm có thể thực hiện(mở/đóng): O (states)
- Việc chuyển đổi từ một trạng thái khác: -> (transition)
- Các sự kiện đã gây ra một quá trình chuyển đổi: insert card, event,...
- Các hành động đó là kết quả của một quá trình chuyển đổi: action
=> Kỹ thuật này phù hợp với mô hình kinh doanh có trạng thái cụ thể hoặc test các dòng màn hình thoại

**4.5/ Bảng trạng thái (States table)**
- Để xem tổng số kết hợp các trạng thái và quá trình chuyển đổi, hợp lệ và không hợp lệ, một bảng trạng thái có thể được sử dụng.
- Bảng liệt kê tất cả các trạng thái xuống một bên bảng và tất cả các sự kiện gây ra quá trình chuyển đổi ở đầu trang. Mỗi ô sau đó đại diện cho một cặp trạng thái-sự kiện. Các nội dung của mỗi ô chỉ ra trạng thái hệ thống sẽ chuyển sang
![](https://images.viblo.asia/7b6bb8ec-22b1-4a5e-8523-aa384ddac77a.PNG)

**4.6/ Trường hợp sử dụng (Use case testing)**
- Là một kỹ thuật giúp chúng ta xác định các trường hợp test quyền thực hiện toàn bộ hệ thống trên cơ sở của giao dịch từ đầu đến cuối
- Sử dụng các trường hợp là một chuỗi các bước mô tả sự tương tác giữa các đối tượng sử dụng và hệ thống
- Có thể mô tả ở mức trừu tượng, hoặc ở cấp độ hệ thống
- Mỗi trường hợp sử dụng thường có kịch bản chính và đường dẫn thay thế
- Thiết kế trường hợp test từ trường hợp sử dụng có thể được kết hợp với các kỹ thuật dựa trên đặc điểm khác.


Hy vọng bài viết của mình sẽ giúp bạn hiển thêm về các kỹ thuật kiểm thử hộp đen. Và sẽ hứa hẹn với các bạn về bài viết kiểm thử hộp trắng nhé!!!:blush::blush::blush:
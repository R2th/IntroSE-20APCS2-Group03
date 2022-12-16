## Mở đầu

Bạn đã bao giờ cảm thấy điều này khi học lập trình chưa?

"Tôi không thể làm ra một sản phẩm dù tôi đã học lập trình"

"Phát triển phần mềm từ lúc bắt đầu như thế nào?"

"Định nghĩa yêu cầu là gì?"

Để giải quyết vấn đề đó, trước hết chúng ta hãy hiểu các quá trình của phát triển phần mềm.
Vui lòng xem hình bên dưới "Quy trình phát triển phần mềm"

Phần lập trình mà chúng ta vẫn hay học tương ứng với phần "Thực hiện".
Như vậy, có tới bốn quá trình cần thực hiện trước khi bạn có thể thể hiện kỹ năng lập trình của mình.

![](https://images.viblo.asia/dc6f4b52-036e-4697-962e-88b09126210f.jpg)

Vì vậy, trong bài viết này, tôi sẽ trình bày về điều cần thiết trước khi bắt đầu thực hiện lập trình đó là các bước từ "Lập kế hoạch ~ Thiết kế".
Đặc biệt, chúng ta sẽ tập trung vào việc "Định nghĩa yêu cầu" và "Thiết kế" mà các kỹ sư phần mềm nên hiểu.

Người ta nói rằng thời gian được sử dụng để thực hiện lập trình trong toàn bộ quá trình phát triển là 20 đến 30% tổng thời gian.
Mặt khác, 50% tổng số thời gian được sử dụng cho các quy trình phía trên (tiếng Nhật gọi là 上流工程) như là xác định yêu cầu và thiết kế.

Nói cách khác, những cá nhân có thể thực hiện việc Định nghĩa yêu cầu và Thiết kế chắc chắn sẽ đóng góp nhiều hơn cho các dự án phát triển.
Hãy đọc bài viết này để hiểu được nó và nâng cao đóng góp của bản thân trong công việc.

Bài viết này bao gồm những phần sau:

* Sự quan trọng của Định nghĩa yêu cầu
* Quy trình xác định định nghĩa yêu cầu
* Các vấn đề cần được quyết định trong Định nghĩa yêu cầu
* Cách tạo ra Thiết kế cơ bản
* Đi trước một bước so với thiết kế cơ bản
* Tóm lược

### Sự quan trọng của Định nghĩa yêu cầu

Có hai nhóm tham gia vào các dự án phát triển hệ thống.

* Những người "tạo ra" hệ thống (nhà phát triển)
* Những người "sử dụng" hệ thống (người đặt hàng)

Nếu bạn muốn tạo ra hệ thống mà bạn muốn, không có vấn đề gì vì bạn đã có hình ảnh hoàn chỉnh về những gì bạn muốn làm trong đầu.
Trong nhiều trường hợp đó là việc phát triển sẽ theo yêu cầu "Người đặt hàng ⇒ Nhà phát triển".

Khi đó, Nhà phát triển không biết phải làm sao nếu không làm rõ được hình ảnh trong đầu người đặt hàng.
Các định nghĩa yêu cầu tồn tại cho nhằm mục đích hỗ trợ cho việc giao tiếp này.

Hãy so sánh nó với cuộc sống hàng ngày.
Khi bạn khát nước, bạn có yêu cầu người khác là "Hãy mua đồ uống đi!”  không?

Nếu bạn không nói là "Hãy mua cà phê đi" hay cụ thể hơn là
"Mua cà phê đường hảo hạng nóng. Đó là chai nhựa chứ không phải lon!"
thì bạn sẽ không thể được mua hộ món cà phê mà bạn mong muốn.

Phát triển hệ thống cũng vậy.
Mục đích của định nghĩa yêu cầu là để thống nhất rõ ràng rằng“Tôi cần làm gì để khách hàng hài lòng?".

Tóm lại,
Tốt nhất nên có một Định nghĩa yêu cầu = Danh sách những mục đã được thống nhất trước để khi giao hàng người đặt hàng có thể kiểm tra theo và xác nhận rằng "Làm thế này là ổn rồi nhé".

## Quy trình xác định định nghĩa yêu cầu

Bây giờ bạn đã biết mục đích của Định nghĩa yêu cầu, hãy tìm hiểu ba bước để hoàn thành Định nghĩa yêu cầu.

* Demand (tiếng Nhật: 要望): Ý tưởng như "Tôi ước có một hệ thống làm được điều này"
* Request (tiếng Nhật: 要求): Danh sách sơ bộ các tính năng bạn muốn hệ thống của mình triển khai
* Requirement (tiếng Nhật: 要件): Danh mục chức năng cụ thể và phương thức thực hiện do hai bên thống nhất

![](https://images.viblo.asia/f36e3354-ecd6-474d-aaed-951d2e548607.jpg)

Giao tiếp thông qua "Kiểm tra" và "Đề xuất" là cần thiết cho quá trình ba bước này.
Nó sẽ như sau khi sắp xếp theo thứ tự.

1. Demand : Vấn đề cần giải quyết (nhiệm vụ của người đặt hàng)
    * Các vấn đề hiện tại
    * Mục tiêu (nó phải là gì)
    * Khoảng cách giữa tình hình hiện tại và mục tiêu (các vấn đề cần giải quyết)

2. Request : Chức năng được triển khai trong hệ thống (nhiệm vụ của người đặt hàng)
    * Bối cảnh của dự án (các vấn đề cần giải quyết)
    * Tổng quan về hệ thống cần thiết để giải quyết vấn đề
    * Danh sách các chức năng bạn muốn triển khai cụ thể

3. Consider : Xem xét tính khả thi của yêu cầu (nhiệm vụ của nhà phát triển)
    * Nó có khả thi về mặt kỹ thuật không?
    * Bạn cần bao nhiêu ngân sách?
    * Ngày giao hàng sẽ là khi nào?

4. Suggest : Trả kết quả xem xét cho người đặt hàng (nhiệm vụ của nhà phát triển)
    * Các chức năng có thể được thực hiện
    * Số tiền sẽ được tính phí
    * Ngày giao hàng

5. Requirement : Các quyết định do hai bên đồng ý (quyết định của bên đặt hàng / nhà phát triển)
    * Danh sách các chức năng được triển khai trong hệ thống
    * Trong một số trường hợp, ngày giao hàng ước tính và số tiền thanh toán sẽ được nêu rõ.

![](https://images.viblo.asia/5af1fde7-72a1-4c2e-810c-8ecc6acbc023.jpg)

## Các vấn đề cần được quyết định trong Định nghĩa yêu cầu

Bây giờ bạn đã biết quy trình, hãy sắp xếp sơ bộ các vấn đề sẽ được quyết định trong Định nghĩa yêu cầu.
Nếu bạn tổ chức lại nó bằng cách sử dụng 3W (Why, What, How), nội dung sẽ được sắp xếp gọn gàng.

* **Why**: Mục đích phát triển hệ thống (Demand)
    * Các vấn đề hiện tại
    * Mục tiêu (trạng thái nên có)
    * Khoảng cách giữa tình hình hiện tại và mục tiêu (các vấn đề cần giải quyết)
* **What**: Làm thế nào để giải quyết vấn đề
    * Luồng kinh doanh sau khi giới thiệu hệ thống
    * Yêu cầu chức năng
        * Danh sách các chức năng được triển khai trong hệ thống
    * Những yêu cầu phi chức năng
        * Tốc độ xử lý, bảo mật, v.v.
* **How**: Khả năng sử dụng cụ thể và phương pháp thực hiện (nhiệm vụ gần với thiết kế hệ thống)
    * Thiết kế cơ bản
        * Thiết kế màn hình (thiết kế giao diện người dùng)
        * Thiết kế chức năng
        * Thiết kế dữ liệu
    * Thiết kế chi tiết
        * Class diagram, Sequence Diagram
        * Kiến Trúc Hệ Thống (System architecture)
        * Các công nghệ khác nhau được sử dụng cho từng phần 

## Cách thiết kế cơ bản (thiết kế màn hình, thiết kế chức năng, thiết kế dữ liệu)

Bạn có thể tưởng tượng rằng có rất nhiều thứ cần quyết định trong định nghĩa yêu cầu, nhưng đừng lo lắng.

Phần **What** (Quy trình kinh doanh, Yêu cầu chức năng, Yêu cầu phi chức năng) thì không phải là kỹ sư,
mà có xu hướng được giải quyết bởi các “Nhân viên kinh doanh” và “Sales engineer”.

Do đó, chúng ta sẽ tìm hiểu sâu hơn về phần **How** (thiết kế), nơi mà các kỹ sư thể hiện khả năng của họ.
Trong số đó, thiết kế cơ bản là chủ đạo, vì vậy bài viết này sẽ tập trung vào điều đó.

Như đã đề cập ở trên, trong thiết kế cơ bản, "màn hình / chức năng / dữ liệu" được thiết kế.
Chỉ khi có những điều này thì một lập trình viên mới có thể bắt đầu phát triển phần mềm.

* Thiết kế màn hình (thiết kế giao diện người dùng)
    * Bạn có thể làm gì trên mỗi màn hình?
    * Thông tin hiển thị (văn bản, hình ảnh, v.v.) và bố cục
    * Tóm tắt những điều trên trong một sơ đồ chuyển đổi màn hình
* Thiết kế chức năng
    * Xử lý mặt sau (tên chức năng và nội dung xử lý)
    * Dữ liệu cần thiết để xử lý, nguồn thu thập dữ liệu (đầu vào từ màn hình, thu nhận từ DB, v.v.)
    * Điểm đến phân phối của dữ liệu đã xử lý (hiển thị màn hình, lưu vào DB, v.v.)
* Thiết kế dữ liệu
    * Nội dung cụ thể của dữ liệu
    * Thiết kế cơ sở dữ liệu
    * Luồng dữ liệu (luồng dữ liệu)

## Tài liệu tham khảo 

https://qiita.com/Saku731/items/741fcf0f40dd989ee4f8
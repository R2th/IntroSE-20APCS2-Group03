# Giới thiệu V-Model
Trong kiểm thử phần mềm,  **V-Model** (hay mô hình chữ V) là một mô hình dạng `SDLC` (Software Development Life Cycle) có tính kỷ luật cao, trong đó có một giai đoạn kiểm thử chạy song song với mỗi giai đoạn của phát triển. Mô hình chữ V là một phần mở rộng của mô hình thác nước (`Waterfall`), trong đó việc kiểm thử được thực hiện trên từng giai đoạn song song với việc phát triển một cách tuần tự. Nó còn được biết đến với tên gọi **Validation Model** (mô hình xác thực) hoặc **Verification Model** (mô hình xác minh).

- Một số Thuật ngữ được dùng trong bài viết:
    1. **SDLC** (Software Development Life Cycle): còn gọi là vòng đời phát triển phần mềm. Nó là một chuỗi các hoạt động được thực hiện bởi các `Developers` để thiết kế và phát triển thành một phần mềm chất lượng cao. 
    2. **STLC** (Software Testing Life Cycle): còn gọi là vòng đời kiểm thử phần mềm. Nó bao gồm một loạt các hoạt động do các `Testers` thực hiện theo phương pháp có sẵn để kiểm thử sản phẩm phần mềm có đáp ứng được yêu cầu đề ra hay không.
    3. **Waterfall Model**: còn gọi là mô hình thác nước. Nó là một mô hình tuần tự được chia thành các giai đoạn khác nhau của hoạt động phát triển phần mềm. Mỗi giai đoạn được thiết kế để thực hiện một hoạt động cụ thể. Giai đoạn kiểm thử trong mô hình thác nước chỉ bắt đầu sau khi phần mềm đã được phát triển hoàn tất.

# Ví dụ giúp hiểu rõ hơn về V-Model
Giả sử, bạn được giao một nhiệm vụ là phát triển một phần mềm tùy biến cho khách hàng. Không cần quá quan tâm đến các nền tảng kỹ thuật hay các công nghệ sẽ áp dụng, bạn hãy thử đưa ra dự đoán có hệ thống về trình tự các bước bạn sẽ làm theo để hoàn thành được nhiệm vụ này.

![](https://images.viblo.asia/ff3fec57-6dc6-470f-9718-ce1070116dcb.png)

Các bước bạn nghĩ ra thông thường sẽ bao gồm như sau: 
- Quyết định về nền tảng sử dụng, có thể là `Java`, `PHP` hoặc `.NET`, với hệ quản trị cơ sở dữ liệu `Oracle`, `MySQL` ... Bất cứ cái nào, miễn nó phù hợp cho dự án.
- Kiểm tra phần mềm để xác minh rằng nó đã được xây dựng dựa trên spec cung cấp bởi khách hàng 
- Viết mã nguồn cho phần mềm
- Tìm tất cả các thông tin có thể về chi tiết thiết kế và đặc tả kỹ thuật cho phần mềm từ khách hàng.

Chúng ta có lẽ cần sắp xếp lại một chút, chẳng hạn bạn cần tìm thông tin trước, sau đó lên kế hoạch mình sẽ làm việc bằng công nghệ nào, rồi viết mã cho nó, cuối cùng mới kiểm tra lại xem phần mềm đã đáp ứng hết các yêu cầu chưa.

![](https://images.viblo.asia/daf49eae-6fca-492b-af76-a32d969dfcff.png)

Và thực tế chúng ta sẽ cần nhiều bước hơn thế này, bảng dưới đây mô tả các bước cần thiết cho giai đoạn phát triển trong mô hình thác nước (`Waterfall`)

| **Giai đoạn** | **Hoạt động** |
| - | - |
| Thu thập yêu cầu | Thu thập càng nhiều thông tin càng tốt về các chi tiết thiết kế và đặc tả kỹ thuật của phần mềm từ các mong muốn của khách hàng. Giai đoạn này đơn giản chỉ là thu thập các yêu cầu, không cần làm gì khác. |
| Thiết kế | Lên kế hoạch về ngôn ngữ lập trình được sử dụng như Java, PHP, .net; cơ sở dữ liệu như Oracle, MySQL, v.v. Quyết định cái nào sẽ phù hợp với dự án, cũng như một số chức năng và kiến trúc cấp cao. |
| Xây dựng | Viết source code cho phần mềm |
| Kiểm thử | Kiểm tra phần mềm để xác minh rằng nó được xây dựng theo các đặc tả kỹ thuật do khách hàng cung cấp. |
| Triển khai | Triển khai phần mềm trong môi trường thực tế |
| Bảo trì | Đây là trạng thái khi phần mềm sẵn sàng để sử dụng, có thể bạn sẽ được khách hàng yêu cầu thay đổi (nếu có). |

# Vấn đề của mô hình thác nước - Waterfall
Như bạn thấy, quá trình kiểm thử trong mô hình này chỉ bắt đầu sau mã nguồn được triển khai xong.

Nếu bạn đang làm việc trong một dự án lớn, nơi mà có các hệ thống phức tạp, bạn rất dễ bỏ lỡ các chi tiết chính trong giai đoạn yêu cầu. Trong những trường hợp như vậy, một sản phẩm hoàn toàn sai sẽ được giao cho khách hàng và bạn có thể phải bắt đầu lại dự án HOẶC nếu bạn quản lý để ghi chú các yêu cầu một cách chính xác nhưng mắc lỗi nghiêm trọng trong thiết kế và kiến trúc phần mềm của bạn, bạn sẽ phải thiết kế lại toàn bộ phần mềm để sửa lỗi.

Theo đánh giá của hàng nghìn dự án áp dụng mô hình thác nước đã chỉ ra rằng các defects được đưa ra trong quá trình yêu cầu & thiết kế chiếm gần một nửa. Và vì đây là giai đoạn rất sớm của toàn bộ quá trình, hậu quả xấu nhất xảy ra là chúng ta cần làm lại từ đầu tất cả các bước nếu chúng ta không phát hiện ra vấn đề sớm  ;( ;( ;( .

![](https://images.viblo.asia/c4a81bf9-3dcf-4980-8b92-2229f9410d8c.png)

Chi phí cần bỏ ra để sửa chữa một khiếm khuyết sẽ tăng lên trong suốt vòng đời phát triển. Và xui cho chúng ta là nó sẽ tăng theo cấp số nhân. Một lỗi được phát hiện càng sớm trong vòng đời, thì việc sửa chữa nó càng dễ dàng.

# Giải pháp: V-Model
Mô hình chữ V được tạo ra như một giải pháp để giải quyết vấn đề của mô hình thác nước. Thay vì chỉ kiểm thử khi quá trình phát triển mã nguồn kết thúc như trong mô hình thác nước, mô hình chữ V cung cấp một quá trình kiểm thử chạy song song cho mỗi bước của quá trình phát triển.

![](https://images.viblo.asia/233469a4-8dc8-4a01-860b-ec0332e0e343.png)

Mô hình chữ V thực chất là tổ hợp của vòng đời phát triển phần mềm **SDLC** ở bên trái và vòng đời kiểm thử phần mềm **STLC** ở bên phải. 
- **Requirement Analysis** (Phân tích yêu cầu) sẽ có quá trình tương ứng là **System Testing** (Kiểm thử hệ thống) : Ở bước này chúng ta sẽ kiểm tra tổng quan toàn bộ hệ thống.
- **High Level Design** (Thiết kế cấp cao) sẽ có quá trình tương ứng là **Integration Testing** (Kiểm thử tích hợp): Ở bước này chúng ta sẽ kiểm tra sự kết nối và tương hợp giữa các thành phần của phần mềm.
- **Low Level Design** (Thiết kế cấp thấp) sẽ có quá trình tương ứng là **Unit Testing** (Kiểm thử đơn vị): Ở bước này chúng ta sẽ kiểm tra ở mức `function` (tính năng) của phần mềm
- **Coding** không cần một quá trình kiểm thử tương ứng, thật ra là không cần thiết do ở bước này hầu như các công nghệ và nền tảng kỹ thuật đã hoàn toàn được kiểm tra trước đó bởi nhà sản xuất của mỗi hãng trước khi được sử dụng chính thức. Vì vậy chúng ta không phải kiểm tra lại ở bước này, thường sẽ do Dev đảm bảo.

Ngoài mô hình chữ V, hiện nay cũng có các mô hình phát triển lặp đi lặp lại, trong đó việc phát triển được thực hiện theo các giai đoạn, với mỗi giai đoạn bổ sung một chức năng cho phần mềm. Mỗi giai đoạn bao gồm một tập hợp các hoạt động phát triển và thử nghiệm độc lập và được lặp lại ở giai đoạn phát triển tiếp theo khi giai đoạn hiện tại kết thúc.
Ví dụ điển hình về các vòng đời Phát triển theo phương pháp lặp lại là [**Rapid Application Development**](https://en.wikipedia.org/wiki/Rapid_application_development), [**Agile Software Development**](https://en.wikipedia.org/wiki/Agile_software_development).

# Kết luận
Hiện nay theo mình thấy có rất nhiều mô hình vòng đời phát triển. Mô hình phát triển được lựa chọn cho một dự án phụ thuộc vào mục tiêu và đích đến hướng tới của dự án đó. Chúng ta cần chú ý như sau:
- Kiểm Thử không phải là một hoạt động độc lập và nó phải điều chỉnh dựa theo mô hình phát triển được chọn cho dự án.
- Trong bất kỳ mô hình nào, việc kiểm thử phải được thực hiện ở tất cả các cấp, tức là ngay từ khi yêu cầu cho đến khi bảo trì để đảm bảo quá trình phát triển có thể khắc phục được tối đa các vấn đề gặp phải.

Cảm ơn mọi người đã đọc bài viết.
# Tài liệu tham khảo
* https://www.guru99.com/v-model-software-testing.html
* https://en.wikipedia.org/wiki/V-Model_(software_development)
* https://en.wikipedia.org/wiki/Rapid_application_development
* https://en.wikipedia.org/wiki/Agile_software_development
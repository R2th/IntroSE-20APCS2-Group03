### Mức độ nghiêm trọng (Severity) là gì?
Mức độ nghiêm trọng (Severity) được định nghĩa là mức độ ảnh hưởng của lỗi đối với sự phát triển hoặc hoạt động của thành phần ứng dụng đang được thử nghiệm.

Hiệu quả cao hơn đối với chức năng hệ thống sẽ dẫn đến việc gán mức độ nghiêm trọng cao hơn cho lỗi. Quality Assurance (QA) (or Tester) thường là người xác định mức độ nghiêm trọng của lỗi.

### Mức độ ưu tiên (Priority) là gì?
Mức độ ưu tiên (Priority) được định nghĩa là thứ tự lỗi cần sửa. Lỗi ưu tiên càng cao thì càng cần giải quyết sớm.

Các lỗi khiến hệ thống phần mềm không sử dụng được ưu tiên cao hơn các lỗi khiến một chức năng nhỏ của phần mềm bị lỗi.

### Defect Severity and Priority Types (Các phân loại mức độ nghiêm trọng và ưu tiên của lỗi)
#### Trong Kiểm thử phần mềm, mức độ nghiêm trọng của lỗi có thể được phân thành 4 cấp độ :
* **Critical (Nghiêm trọng) :** Lỗi ở cấp độ này có nghĩa là xử lý của hệ thống bị ngừng hoàn toàn, không có gì có thể tiến hành thêm bất kỳ xử lý gì khác.
* **Major/High (Quan trọng) :** Lỗi ở cấp độ này là rất nghiêm trọng và làm sập hệ thống. Tuy nhiên, một số phần của hệ thống vẫn hoạt động.
* **Medium (Trung bình) :** Lỗi ở cấp độ này gây ra một số hành vi không mong muốn, nhưng hệ thống vẫn hoạt động
* **Low (Thấp) :** Lỗi ở cấp độ này sẽ không gây ra bất kỳ sự cố lớn nào của hệ thống

#### Mức độ ưu tiên của lỗi có thể được phân thành 3 cấp độ :
* **Low (Thấp) :** Lỗi ở mức độ ưu tiên này là một tác nhân gây khó chịu nhưng việc sửa chữa có thể được thực hiện một khi Lỗi nghiêm trọng hơn đã được khắc phục
* **Medium (Trung bình) :** Trong quá trình bình thường của các hoạt động phát triển, Lỗi ở mức độ ưu tiên này nên được giải quyết. Nó có thể đợi cho đến khi một phiên bản mới được tạo ra 
* **High (Cao) :** Lỗi ở mức độ ưu tiên này phải được giải quyết càng sớm càng tốt vì nó ảnh hưởng nghiêm trọng đến hệ thống và không thể được sử dụng cho đến khi được khắc phục

### Các tip để xác định mức độ nghiêm trọng của lỗi
* **Decide the frequency of occurrence (Quyết định dựa trên tân suất xuất hiện) :** Trong một số trường hợp, nếu sự xuất hiện của một lỗi nhỏ thường xảy ra trong code, nó có thể trở nên nghiêm trọng hơn. Vì vậy, từ quan điểm của người dùng, nó là nghiêm trọng hơn mặc dù đó là một lỗi nhỏ.
* **Isolate the defect (Cô lập khuyết điểm) :** Cô lập khuyết điểm có thể giúp tìm ra mức độ nghiêm trọng của tác động.
![](https://images.viblo.asia/66d75990-5468-4656-aacd-48dd97e1149c.gif)

### So sánh Mức độ ưu tiên (Priority) và Mức độ nghiêm trọng (Severity): Sự khác biệt chính
| Mức độ ưu tiên (Priority) | Mức độ nghiêm trọng (Severity) |
| -------- | -------- |
| Mức độ ưu tiên của lỗi đã xác định thứ tự mà nhà phát triển nên giải quyết lỗi | Mức độ nghiêm trọng của lối được định nghĩa là mức độ ảnh hưởng của lỗi đối với hoạt động của sản phẩm |
| Mức độ ưu tiên được phần thành 3 cấp độ : <hr>- Low (Thấp)<hr>- Medium (Trung bình) <hr>- High (Cao)| Mức độ nghiêm trọng được phần thành 4 cấp độ : <hr>- Critical (Nghiêm trọng)<hr>- Major/High (Quan trọng) <hr>- Medium (Trung bình)<hr>- Low (Thấp) |
| Mức độ ưu tiên liên quan đến lập kế hoạch| Mức độ nghiêm trọng được liên kết với chức năng hoặc các tiêu chuẩn |
| Mức độ ưu tiên cho biết lỗi cần được sửa sớm như thế nào | Mức độ nghiêm trọng cho thấy mức độ nghiêm trọng của lỗi trên chức năng sản phẩm |
| Mức độ ưu tiên của lỗi được quyết định với sự tư vấn của người quản lý / khách hàng | Quality Assurance (QA) (or Tester) là người xác định mức độ nghiêm trọng của lỗi|
| Mức độ ưu tiên được thúc đẩy bởi giá trị kinh doanh| Mức độ nghiêm trọng được điều khiển bởi chức năng |
| Giá trị của mức độ ưu tiên là chủ quan và có thể thay đổi trong một khoảng thời gian tùy thuộc vào sự thay đổi trong tình hình dự án | Giá trị của mức độ nghiệm trọng là khách quan và ít có khả năng thay đổi|
| Mức độ ưu tiên cao và mức độ nghiêm trọng thấp cho thấy, lỗi phải được khắc phục ngay lập tức nhưng không ảnh hưởng đến ứng dụng| Mức độ nghiêm trọng cao và mức độ ưu tiên thấp cho thấy lỗi phải được sửa chữa nhưng không phải ngay lập tức |
| Status của mức độ ưu tiên dựa trên yêu cầu của khách hàng| Status của mức độ nghiêm trọng dựa trên khía cạnh kỹ thuật của sản phẩm|
| Trong UAT, nhóm phát triển sửa lỗi dựa trên mức độ ưu tiên| Trong SIT, nhóm phát triển sẽ sửa các lỗi dựa trên mức độ nghiêm trọng và sau đó ưu tiên|

### Ví dụ về Mức độ nghiêm trọng và Mức độ ưu tiên của lỗi
![](https://images.viblo.asia/378c472e-0ba8-4990-8584-7553dc06c75f.png)

Hãy xem một ví dụ về mức độ nghiêm trọng thấp và mức độ ưu tiên cao và ngược lại
##### Mức độ nghiêm trọng rất thấp với mức độ ưu tiên cao: 
Lỗi logo cho bất kỳ trang web giao hàng nào, có thể có mức độ nghiêm trọng thấp vì nó sẽ không ảnh hưởng đến chức năng của trang web nhưng có thể được ưu tiên cao vì người dùng sẽ không muốn tiếp tục gửi hàng nữa với logo sai.
##### Mức độ nghiêm trọng rất cao với mức độ ưu tiên thấp: 
Tương tự như vậy, đối với trang web khai thác chuyến bay, lỗi về chức năng đặt chỗ có thể có mức độ nghiêm trọng cao nhưng có thể là mức độ ưu tiên thấp vì có thể được lên lịch phát hành trong chu kỳ tiếp theo.

### Defect Triage (Phân loại lỗi)
Phân loại lỗi là một quá trình cố gắng thực hiện việc cân bằng lại quy trình trong đó nhóm thử nghiệm phải đối mặt với vấn đề hạn chế về nguồn lực. Vì vậy, khi có số lượng lớn lỗi và tester hạn chế để xác minh chúng, việc phân loại lỗi để làm sao càng nhiều lỗi được giải quyết nhất có thể dựa trên các tham số lỗi như mức độ nghiêm trọng và mức độ ưu tiên.
##### Cách phân loại lỗi
![](https://images.viblo.asia/815c7a88-e86c-4548-b4a7-76c9fd73ace7.png)

Hầu hết các hệ thống sử dụng mức độ ưu tiên làm tiêu chí chính để đánh giá lỗi. Tuy nhiên, một quá trình xử lý phân loại tốt cũng phải xem xét mức độ nghiêm trọng.

Quá trình xử lý phân loại lỗi gồm các bước sau :
* Xem xét tất cả các lỗi bao gồm các lỗi bị từ chối bởi team
* Đánh giá ban đầu về các lỗi dựa trên nội dung của nó và thiết lập mức độ ưu tiên và mức độ nghiêm trọng tương ứng
* Ưu tiên các lỗi dựa trên các đầu vào
* Chỉ định lỗi chính xác bởi người quản lý sản phẩm để phát hành 
* Chuyển hướng lại lỗi cho chủ sở hữu / nhóm chính xác để tiếp tục hành động

### Nguyên tắc mà mọi tester nên xem xét trước khi chọn mức độ nghiêm trọng
Thông số mức độ nghiêm trọng được đánh giá bởi tester trong khi tham số ưu tiên được đánh giá bởi người quản lý sản phẩm hoặc bởi nhóm phân loại. Để ưu tiên cho lỗi, bắt buộc tester phải chọn đúng mức độ nghiêm trọng để tránh nhầm lẫn cho nhóm phát triển.
* Hiểu rõ khái niệm mức độ ưu tiên và mức độ nghiêm trọng
* Luôn chỉ định mức độ nghiêm trọng dựa trên loại sự cố vì điều này sẽ ảnh hưởng đến mức độ ưu tiên của nó
* Hiểu cụ thể và chính xác Scenario hoặc Test Case sẽ ảnh hưởng như thế nào đến người dùng cuối
* Cần xem xét mất bao nhiêu thời gian để sửa lỗi dựa trên độ phức tạp và thời gian để xác minh lỗi

#### Vài scenorio rất quan trọng liên quan đến mức độ nghiêm trọng và mức độ ưu tiên được hỏi trong cuộc phỏng vấn:
* **High Priority & High Severity:** Một lỗi xảy ra trên chức năng cơ bản của ứng dụng và sẽ không cho phép người dùng sử dụng hệ thống. (Ví dụ: Hệ thống gặp sự cố sau khi bạn thực hiện thanh toán hoặc khi bạn không thể thêm các mục vào Giỏ hàng, lỗi này được đánh dấu là lỗi nghiêm trọng cao và ưu tiên cao..)
* **High Priority & Low Severity:** Bất kỳ lỗi nghiêm trọng nhỏ nào có thể ảnh hưởng trực tiếp đến trải nghiệm người dùng. (Ví dụ: Các lỗi chính tả xảy ra trên trang bìa hoặc tiêu đề hoặc tiêu đề của một ứng dụng.)
* **High Severity & Low Priority:** Một lỗi xảy ra trên chức năng của ứng dụng (không có cách giải quyết) và sẽ không cho phép người dùng sử dụng hệ thống nhưng là liên kết mà người dùng cuối hiếm khi sử dụng.
* **Low Priority and Low Severity:** Bất kỳ vấn đề thẩm mỹ hoặc chính tả nào trong một đoạn hoặc trong báo cáo (Không phải trên trang bìa, tiêu đề, tiêu đề).

### Phần kết luận:
Trong Kỹ thuật phần mềm, việc chỉ định mức độ nghiêm trọng sai cho lỗi có thể trì hoãn quá trình STLC (Software Testing Life Cycle) và có thể có một số ý nghĩa quyết định đối với hiệu suất chung của team. Vì vậy, người có trách nhiệm này cần phải cẩn thận và chính xác trong việc phát hành lỗi và phân loại lỗi.

### Nguồn Tham khảo: 
https://www.guru99.com/defect-severity-in-software-testing.html
http://tryqa.com/what-is-the-difference-between-severity-and-priority/
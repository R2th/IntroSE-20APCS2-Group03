Ở bài viết trước, mình đã giới thiệu về rủi ro, cách tiếp cận về rủi ro. Ở bài viết này sẽ là phần về cách thức thực hiện kiểm thử dựa trên rủi ro. Mong rằng bài viết sẽ có ích phần nào cho các bạn

link phần 1: https://viblo.asia/p/thu-nghiem-dua-tren-rui-ro-quan-ly-rui-ro-cach-tiep-can-gGJ59k2DZX2
# Quy trình thực hiện
Để thực hiện được việc thử nghiệm dựa trên rủi ro sẽ thông qua các bước như sau:
1. Xác định rủi ro
2. Phân tích rủi ro
3. Đối ứng với rủi ro
4. Kiểm tra phạm vi
5. Định nghĩa quy trình thử nghiệm

![](https://images.viblo.asia/c14ec54f-5ba0-4aa7-b679-512859bad8ba.png)

1. Xác định rủi ro

Trong giai đoạn này:
- Thực hiện xác định và phân loại các rủi ro; Việc phân loại rủi ro được thực hiện để xác định mức độ của rủi ro.
-  Đưa ra một bản nháp rủi ro. 

2. Đối ứng rủi ro

Liên quan đến việc:
- Xây dựng các mục tiêu thử nghiệm từ các rủi ro
- Lựa chọn các kỹ thuật phù hợp để thể hiện hoạt động thử nghiệm 
- Lựa chọn kỹ thuật thử nghiệm để đáp ứng các mục tiêu thử nghiệm.

3. Tài liệu đi kèm, yêu cầu, chi phí, thời gian cần thiết để thử nghiệm... được xem xét để tính toán hiệu quả thử nghiệm.

4. Phạm vi thử nghiệm

Xác định phạm vi thử nghiệm đòi hỏi sự tham gia của tất cả các bên liên quan và nhân viên kỹ thuật. Điều quan trọng là phải tuân thủ phạm vi rủi ro đã thỏa thuận. Những rủi ro này cần được giải quyết bằng thử nghiệm và tất cả các thành viên đồng ý với các trách nhiệm được giao  và ngân sách được phân bổ cho các hoạt động này.

5. Định nghĩa quy trình thử nghiệm

Hoạt động này được thực hiện sau khi phạm vi thử nghiệm đã được hoàn thành các mục tiêu thử nghiệm, các giả định, phụ thuộc cho từng giai đoạn thử nghiệm, và phải được biên soạn theo định dạng chuẩn.

![](https://images.viblo.asia/d864d721-663b-4530-8ef7-d658c7cf94c7.png)

Xem xét các yêu cầu chức năng F1, F2, F3

* Yêu cầu chức năng F1, Rủi ro R1 liên quan đến F1

*Mục tiêu thử nghiệm:  Chứng minh  rằng các tính năng và chức năng dự kiến của hệ thống hoạt động tốt và rủi ro R1 có thể được giải quyết bằng thử nghiệm chức năng*

*Thực hiện: Kiểm tra trang Trình duyệt thử nghiệm để thực thi các tác vụ quan trọng của người dùng và xác minh rằng R1 có thể được xử lý trong một loạt các kịch bản.*

* F2-Yêu cầu chức năng, R2-Rủi ro liên quan đến F2

*Mục tiêu thử nghiệm: Chứng minh  rằng các tính năng và chức năng mong đợi của hệ thống hoạt động tốt và rủi ro R2 có thể được giải quyết bằng thử nghiệm chức năng*

*Thực hiện: Kiểm tra trang Trình duyệt để thực thi các tác vụ quan trọng của người dùng và xác minh rằng R2 có thể được xử lý trong một loạt các kịch bản*

* F3 - Yêu cầu về chức năng, R3 - Rủi ro liên quan đến F3

*Mục tiêu thử nghiệm: Chứng minh rằng các tính năng và chức năng mong đợi của hệ thống hoạt động tốt và rủi ro R3 có thể được giải quyết bằng thử nghiệm chức năng*

*Thực hiện: Kiểm tra trang Trình duyệt để thực thi các tác vụ quan trọng của người dùng và xác minh rằng R2 có thể được xử lý trong một loạt các kịch bản*


**Mục tiêu thử nghiệm cụ thể**

Các rủi ro và mục tiêu thử nghiệm được liệt kê là cụ thể cho các loại thử nghiệm được cụ thể ở bên dưới đây

![](https://images.viblo.asia/05eb1e0b-c33a-4129-8d78-e09f3957335f.png)

**Trình tự thiết kế quy trình thử nghiệm dựa trên rủi ro**

Việc thiết kế quy trình thử nghiệm dựa trên rủi ro thường sẽ có các giai đoạn sau

- Chuẩn bị một bản đăng ký rủi ro. Văn bản này ghi lại các rủi ro xuất phát từ danh sách rủi ro chung, danh sách thử nghiệm hiện có.
- Bao gồm các rủi ro liên quan đến các yêu cầu chức năng và phi chức năng của hệ thống (Tính khả dụng, bảo mật, hiệu suất)
- Mỗi rủi ro được đánh số định danh duy nhất

| STT cột | Tiêu đề cột | Mô tả |
| -------- | -------- | -------- |
| 1  | Xác suất |Khả năng hệ thống dễ bị lỗi này nhiều hay ít |
| 2  | Hậu quả | tác động của lỗi này sẽ ảnh hưởng ra sao |
| 3  | Biểu hiện | Nó là kết quả của Xác suất và Hậu quả (columm 1 & 2) |
| 4  | Kiểm tra hiệu quả | Làm thế nào tự tin là những người thử nghiệm có thể giải quyết rủi ro này? |
| 5  |Độ ưu tiên thử nghiệm | Kết quả của Xác suất, Hậu quả và Hiệu quả Thử nghiệm (cột 1, 2, 4) |
| 6  | Mục tiêu thử nghiệm | Mục tiêu thử nghiệm nào sẽ được sử dụng để giải quyết rủi ro này |
| 7  | Kỹ thuật kiểm tra | Phương pháp hay kỹ thuật nào sẽ được sử dụng |
| 8  | Yếu tố phụ thuộc | Giả định người thử nghiệm và điều kiện ràng buộc là gì |
| 9  | Nguồn lực | Cần bao nhiêu nguồn lực để thực hiện thử nghiệm này |
| 10 | Thời gian | Cần bao nhiêu thời gian để thực hiện thử nghiệm này  |
| 11 |Thử nghiệm | Tên của người hoặc nhóm thực hiện hoạt động này (cụ thể từng loại thử nghiệm) |

Mỗi rủi ro được đánh giá Xác suất và Hậu quả đều gồm 5 cấp độ từ 1 tới 5 (1 Thấp -5 Cao)

![](https://images.viblo.asia/a9790094-1616-4f12-a831-b210cb0ef7ca.png)

- Người kiểm tra phân tích từng rủi ro và đánh giá xem rủi ro có thể kiểm tra được hay không
- Mục tiêu thử nghiệm được xacsc định cho những rủi ro có thể kiểm tra
- Tester chỉ định hoạt động kiểm tra cần được thực hiện một cách có kế hoạch để đáp ứng mục tiêu kiểm tra
- Các hoạt động kiểm tra này có thể được chia thành các giai đoạn (Component Testing/Unit testing, Integration Testing, System Testing, Acceptance Testing)
- Đôi khi, rủi ro có thể được giải quyết bằng một hoặc nhiều giai đoạn thử nghiệm
- Xác định các phụ thuộc và giả định (Ví dụ các kỹ năng, công cụ hỗ trợ, môi trường thử nghiệm, tài nguyên cần có)
- Tính toán hiệu quả thử nghiệm. Việc này liên quan đến mức độ tin cậy của người thử nghiệm rằng rủi ro sẽ được giải quyết dứt điểm thông qua thử nghiệm. 
-  Ước tính nguồn lực, thời gian cần thiết, chi phí để chuẩn bị và thực hiện các thử nghiệm này.
- Tính toán thứ tự ưu tiên thử nghiệm. Nó dựa trên kết quả tính toán xác suất, hậu quả và hiệu quả của thử nghiệm
- Dựa trên thứ tự ưu tiên kiểm tra, Các rủi ro cao nhất được thử nghiệm đầu tiên.
- Phân bổ các hoạt động thử nghiệm cho các giai đoạn. Chỉ định nhóm sẽ thực hiện kiểm tra cho từng mục tiêu trong các giai đoạn kiểm tra khác nhau (Thử nghiệm đơn vị, Thử nghiệm tích hợp, Thử nghiệm hệ thống, Thử nghiệm chấp nhận)
- Ở giai đoạn xác định phạm vi thử nghiệm sẽ xác định: những gì trong phạm vi thử nghiệm và những gì sẽ không thực hiện thử nghiệm
- Đối với mực tiêu từng giai đoạn thử nghiệm sẽ xác định: thành phần được thử nghiệm, trách nhiệm, môi trường, tiêu chí đầu vào, tiêu chí thoát, công cụ, kỹ thuật, bàn giao

![](https://images.viblo.asia/5ca9261f-f915-4e85-983d-0982d53fdfd9.png)

**Mục tiêu thử nghiệm chung**

Những mục tiêu chung được trình bày dưới đây có thể áp dụng cho nhiều dự án và ứng dụng khác nhau
- Thành phần đáp ứng yêu cầu và sẵn sàng để sử dụng trong các hệ thống con lớn hơn
- Các rủi ro liên quan đến từng loại thử nghiệm cụ thể được giải quyết và các mục tiêu thử nghiệm đã được hoàn thành.
- Các thành phần tích hợp được lắp ráp chính xác. Đảm bảo khả năng tương thích giữa các thành phần.
- Hệ thống đáp ứng các yêu cầu chức năng và phi chức năng được chỉ định.
- Các thành phần sản phẩm đáp ứng nhu cầu của người dùng cuối trong môi trường hoạt động  của họ
- Chiến lược quản lý rủi ro được sử dụng để xác định, phân tích và giảm thiểu rủi ro.
- Hệ thống đáp ứng các yêu cầu tiêu chuẩn của lĩnh vực
- Hệ thống đáp ứng các nghĩa vụ hợp đồng
- Thể chế hóa mục tiêu, đạt được các mục tiêu cụ thể khác được thiết lập như: chi phí, lịch trình và các mục tiêu chất lượng.
- Hệ thống, quy trình và con người thích hợp yêu cầu kinh doanh

Mục tiêu thử nghiệm chung có thể được xác định cho các giai đoạn thử nghiệm khác nhau, cụ thể như:
- Component Testing
- Integration Testing
- System Testing
- Acceptance Testing

## Ma trận đánh giá ưu tiên và rủi ro

***Ma trận đánh giá rủi ro là ma trận đo tác động của xác suất xẩy ra. Nó cung cấp cho nhóm dự án một cái nhìn nhanh chóng về các rủi ro và mức độ ưu tiên mà mỗi rủi ro này cần được giải quyết.***

> Thứ hạng rủi ro = Xác suất * Hậu quả (Mức độ nghiêm trọng)

***Xác suất là thước đo một sự kiện không chắc chắn sẽ xảy ra dựa theo thời gian, gần kề và sự lặp lại.***

Nó được thể hiện dưới dạng tỷ lệ phần trăm. Xác suất có thể được phân loại là Thường xuyên (A), Có thể xảy ra (B), Thỉnh thoảng (C), Đôi khi (D), Không chắc có (E), Không theer xảy ra (F)

- Thường xuyên: Dự kiến sẽ xảy ra nhiều lần trong hầu hết các trường hợp (91 - 100%)
- Có thể xẩy ra: Có khả năng xảy ra nhiều lần trong hầu hết các trường hợp (61 - 90%)
- Thỉnh thoảng: Đôi khi có thể xảy ra (41 - 60%)
- Không có khả năng xảy ra / đôi khi xảy ra (11 - 40%). 
- Không chắc xảy ra - Có thể xảy ra trong những trường hợp hiếm gặp và đặc biệt (0 -10%)
- Không thể xảy ra (0%)

***Mức độ nghiêm trọng là mức độ ảnh hưởng của thiệt hại hoặc mất mát gây ra do sự kiện không chắc chắn.***

Mức độ nghiêm trọng được đánh giá từ 1 đến 4 và có thể được phân loại là Thảm họa = 1, Quan trọng = 2, Trung bình = 3, Không đáng kể = 4

- *Thảm họa:* Hậu quả nghiêm trọng khiến dự án hoàn toàn không có tác dụng và thậm chí có thể dẫn đến việc đóng cửa dự án. Nó phải là ưu tiên hàng đầu trong quá trình quản lý rủi ro.
- *Quan trọng:* Hậu quả lớn có thể dẫn đến một mất mát lớn. Dự án đang bị đe dọa nghiêm trọng.
- *Trung bình:* Thiệt hại ngắn hạn vẫn có thể đảo ngược thông qua các hoạt động phục hồi.
- *Không đáng kể:* Ít hoặc ít thiệt hại hoặc mất mát. Nó có thể được theo dõi và quản lý bởi các thủ tục thông thường

Thứ tự Ưu tiên được phân thành bốn loại, được ánh xạ theo mức độ nghiêm trọng và xác suất rủi ro như trong hình dưới đây.

- Nghiêm trọng
- Cao
- Trung bình
- Thấp

![](https://images.viblo.asia/25ed66d9-aaa9-4cb7-a190-0a8051e45b94.png)

- Nghiêm trọng: Những rủi ro thuộc danh mục này được đánh dấu bằng màu Vàng đậm. Hoạt động phải được dừng lại, và phải hành động ngay lập tức để cô lập rủi ro. Kiểm soát hiệu quả phải được xác định và thực hiện. Hơn nữa, hoạt động không được tiến hành trừ khi rủi ro giảm xuống mức thấp hoặc trung bình.

- Cao: Các rủi ro thuộc danh mục này được đánh dấu bằng Màu đỏ. Với các rủi ro này phải hành động ngay lập tức để cô lập, loại bỏ, thay thế rủi ro và thực hiện kiểm soát rủi ro hiệu quả. Nếu những vấn đề này không thể được giải quyết ngay lập tức, cần đặt ra các mốc thời gian chặt chẽ để giải quyết những vấn đề này.

- Trung bình: Những rủi ro thuộc danh mục này được đánh dấu màu Vàng nhạt. Cần thực hiện các bước hợp lý và thực tế để giảm thiểu rủi ro.

- Thấp: Các rủi ro thuộc danh mục này được đánh dấu màu xanh lục, chúng có thể được bỏ qua vì chúng thường không gây ra bất kỳ vấn đề quan trọng nào. Đánh giá định kỳ là phải đảm bảo các biện pháp kiểm soát vẫn hiệu quả

 # Checklist chung để thử nghiệm dựa trên rủi ro

Lý thuyết cho việc thử nghiệm dựa trên rủi ro là thế. Tổng kết chung lại, chúng ta quan tâm nhiều tới việc tóm tắt: phải làm gì để thực hiện thử nghiện dựa trên rủi ro hiệu quả, dễ nhớ.
Các điểm quan trọng cần được xem xét trong thử nghiệm dựa trên rủi ro như sau:

- Các chức năng quan trọng trong dự án.
- Người dùng có thể thấy chức năng nào trong dự án
- Các chức năng có tác động lớn nhất tới độ an toàn
- Các chức năng có tác động lớn nhất tới tài chính người dùng
- Các vùng có độ phức tạp của code và dễ có lỗi
- Các tính năng hoặc chức năng có thể được kiểm tra sớm trong chu kỳ phát triển.
- Các tính năng hoặc chức năng đã được thêm vào sản phẩm bàn giao trong phút cuối.
- Các yếu tố quan trọng của các dự án tương tự hoặc liên quan đã từng có vấn đề.
- Các yếu tố chính hoặc các vấn đề của các dự án tương tự hoặc liên quan có ảnh hưởng lớn đến chi phí vận hành và bảo trì.
- Các yêu cầu kém dẫn đến các thiết kế và thử nghiệm kém có thể có tác động đến các mục tiêu và bàn giao dự án.
- Xác định loại vấn đề nào là quan trọng đối với các mục tiêu sản phẩm. Trong trường hợp xấu nhất, một sản phẩm có thể bị lỗi đến mức không thể làm lại và phải được loại bỏ hoàn toàn, điều này sẽ gây tổn hại nghiêm trọng đến uy tín của công ty. 
- Các tình huống hoặc vấn đề sẽ gây ra khách hàng liên tục khiếu nại dịch vụ.
- Thực hiện các thử nghiệm từ đầu đến cuối có thể dễ dàng tập trung vào nhiều chức năng của hệ thống.
- Xây dựng bộ thử nghiệm tối ưu có thể tối đa hóa phạm vi rủi ro
- Những thử nghiệm nào sẽ có tỷ lệ bảo hiểm rủi ro cao nhất trong thời gian yêu cầu?

# Report kết quả thử nghiệm
 1. Chuẩn bị Test report

Báo cáo tình trạng thử nghiệm là việc truyền đạt hiệu quả kết quả thử nghiệm đến các bên liên quan của dự án.

Để cung cấp thông tin rõ ràng và để hiển thị so sánh kết quả thử nghiệm với các mục tiêu thử nghiệm. ta cần cụ thể các tiêu chí:

- Số lượng các trường hợp thử nghiệm được lên kế hoạch so với thực hiện
- Số trường hợp kiểm tra đạt / không đạt
- Số lượng lỗi được xác định và Tình trạng & Mức độ nghiêm trọng của chúng
- Số lượng lỗi và trạng thái của chúng
- Số lượng lỗi nghiêm trọng - vẫn còn mở
- Thời gian môi trường bị chết- nếu có
- Tình trạng tắc nghẽn - nếu có
- Báo cáo tóm tắt thử nghiệm, Báo cáo độ bao phủ thử nghiệm

2. Chuẩn bị Metrics

Metrics là sự kết hợp của hai hoặc nhiều biện pháp được sử dụng để so sánh các quy trình, dự án và sản phẩm phần mềm. Các tiêu chi cần có gồm

- Nguồn lực và thay đổi lịch trình
- Năng suất chuẩn bị testcases
- Độ bao phủ thiết kế thử nghiệm
- Năng suất thực hiện  testcases
- Hiệu quả xác định rủi ro (%)
- Hiệu quả giảm thiểu rủi ro (%)
- Hiệu quả thử nghiệm (%)
- Độ bao phủ việc thực hiện thử nghiệm
- Năng suất việc thực hiện thử nghiệm
- Lỗi bị rò rỉ (%)
- Lỗi được phát hiện
- Chỉ số ổn định yêu cầu
- Chi phí của chất lượng

3. Phân tích các rủi ro trong các danh mục phi chức năng (hiệu suất, độ tin cậy và khả năng sử dụng) dựa trên trạng thái lỗi và một số trạng thái vượt qua hoặc thất bại kiểm tra, dựa trên mối quan hệ của chúng với rủi ro.
4. Phân tích các rủi ro trong các số liệu chức năng của thử nghiệm, trạng thái lỗi và trạng thái vượt qua hoặc thất bại kiểm tra, dựa trên mối quan hệ của chúng với rủi ro.
5. Xác định các chỉ số chỉ dẫn và độ trễ chính và tạo các cảnh báo sớm
6. Theo dõi và báo cáo về các chỉ số rủi ro và độ trễ bằng cách phân tích các mẫu dữ liệu, xu hướng và sự phụ thuộc lẫn nhau.

# Lợi ích của thử nghiệm dựa trên rủi ro

* Cải thiện năng suất và giảm chi phí
* Cải thiện cơ hội thị trường (Nghiên cứu thị trường) và giao hàng đúng thời gian.
* Cải thiện hiệu suất dịch vụ
* Cải thiện chất lượng
* Cung cấp thông tin rõ ràng về phạm vi kiểm tra. Do đó xác định được những gì đã hoặc chưa được thử nghiệm.
* Thử nghiệm phân bổ dựa trên đánh giá rủi ro là cách hiệu quả nhất để giảm thiểu rủi ro còn lại khi phát hành.
* Đo lường kết quả thử nghiệm dựa trên phân tích rủi ro cho phép tổ chức xác định mức độ rủi ro chất lượng còn lại trong quá trình thực hiện thử nghiệm và đưa ra quyết định phát hành thông minh.
* Thử nghiệm tối ưu hóa với các phương pháp đánh giá rủi ro được xác định.
* Cải thiện sự hài lòng của khách hàng - Do sự tham gia của khách hàng, báo cáo và theo dõi tiến độ.
* Phát hiện sớm các khu vực có vấn đề tiềm năng. Từ đó có các biện pháp phòng ngừa và thực hiện giải quyết hiệu quả
* Giám sát và đánh giá rủi ro liên tục trong toàn bộ vòng đời của dự án giúp xác định và giải quyết các rủi ro, các vấn đề có thể gây nguy hiểm cho việc đạt được các mục tiêu và mục tiêu chung của dự án.

*Tóm tắt:*

Trong thử nghiệm dựa trên rủi ro, các nỗ lực thử nghiệm được tổ chức hiệu quả và có đánh giá mức độ ưu tiên của từng hạng mục. Mỗi rủi ro sau đó được thực hiện với hoạt động kiểm tra thích hợp, trong đó một thử nghiệm duy nhất có nhiều mục rủi ro, thì thử nghiệm được chỉ định là rủi ro cao nhất. Các thử nghiệm được thực hiện theo thứ tự ưu tiên của rủi ro. 
Quá trình giám sát rủi ro giúp theo dõi các rủi ro đã xác định và giảm tác động của rủi ro tồn dư.

Link Refer:
https://www.guru99.com/risk-based-testing.html
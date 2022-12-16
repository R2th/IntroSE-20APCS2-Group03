![](https://images.viblo.asia/b07c92f9-53d1-41ed-bcde-5f32571a0f01.jpg)




Đối với những người không phải trong đội đảm bảo chất lượng (QA) , ví dụ như developer, Brse...rất hiếm khi họ xem lại chi tiết các test plan . 
Vì vậy ,  cần cố gắng để cho người phát triển hoặc quản lí dự án review kế hoạch kiểm thử của bạn. Cách duy nhất là cần viết một phác thảo ngắn gọn về kế hoạch kiểm thử bao gồm những gì.

Các kế hoạch cần thiết phải được  trình bày  nhanh, ngắn gọn, dễ đọc , dễ hiểu - tốt hơn là một trang hoặc ít hơn thế. Như thế kế hoạch kiểm thử sẽ trở nên cần thiết đối với tất cả các đội , các team liên quan của dự án agile.

Đây là cách để có được kế hoạch kiểm thử bắt đầu bằng cách xem xét những gì cần thiết.

Trong bài viết này sẽ nhắc lại một chút về test plan và Agile.


# 1. Mục đích của test plan là gì?
- Một kế hoạch kiểm thử được xem như là hợp đồng làm việc giữa QA, đội phát triển và người quản lí sản phẩm. 
- Nó là một trang duy nhất về thông tin ngắn gọn cho phép các thành viên trong nhóm có thể xem và cung cấp đầu vào cần thiết cho QA kiểm tra.
- Kế hoạch kiểm thử một trang bao gồm các chi tiết cụ thể về ai, cái gì, ở đâu, khi nào và làm thế nào để code phát triển phần mềm được kiểm tra. Nó phải ở dạng có thể đọc được và chỉ bao gồm thông tin cần thiết nhất về những gì bạn cần thử nghiệm, ở đâu, khi nào và như thế nào.

- Mục đích của kế hoạch kiểm tra là giúp cung cấp cho nhà phát triểm đầu vào để đảm bảo chất lượng và tài liệu lịch sử để tham khảo khi cần thiết. Bạn có thể sử dụng lại các kế hoạch kiểm thử trước đây, từ những dự án trước như là một tài liệu tham khảo, đào tạo hoặc làm bằng chứng nếu cần.
- Nếu bạn muốn kế hoạch kiểm thử của mình được sử dụng và lưu trữ trong công cụ phát triển phần mềm, có thể nhúng vào story của bạn. 
- Hầu hết các công cụ đều có phần cho ý kiến và thậm chí kiểm tra thông tin thực hiện. 
- Sử dụng những công cụ này để giúp đỡ tạo, quản lí và lưu trữ test plan - nơi mọi người có thể dễ dàng truy cập và tìm thấy chúng.
# 2. Giá trị của test plan trong mô hình phát triển Agile

 ![](https://images.viblo.asia/1bd2ebbb-4327-42e6-a625-eae98dc61cd9.png)

- Các team Agile vẫn có thể được hưởng lợi ích từ các kế hoạch kiểm thử - nếu các kế hoạch đó được giới hạn ngắn gọn và đầy đủ các thông tin thiết yếu.
- Một kế hoạch kiểm tra dễ hiểu và xúc tích cung cấp cả thông tin kiểm tra lịch sử và truy xuất nguồn gốc. Đây là một lợi thế khi khi các thành viên của nhóm thay đổi hoặc nhóm phát triển và cần phải có tài liệu về các chức năng ứng dụng, cũng như thông tin đã phát hành trước đó. 
- Kế hoạch kiểm thử cũng cung cấp cho bạn tài liệu pháp lý về những gì đẫ kiểm thử, làm thế nào và khi nào.
- Kế hoạch kiểm thử không chỉ là kế hoạch, nó là một thỏa thuận giữa QA, quản lí dự án và phát triển hoạt động có ý nghĩa và nó hoạt động như thế nào. Trong thỏa thuận có mô tả những công việc đã làm, được thử nghiệm như thế nào giữa nhà phát triển với bên đảm bảo chất lượng
- Nó xác minh sự hiểu biết và cung cấp tài liệu ứng dụng.
# 3. Các yếu tố của một kế hoạch kiểm thử chức năng/dự án ngắn gọn
Vậy nên cần đưa những phần nào vào kế hoạch kiểm thử ? Có 5 yếu tố đó là :

**Tóm tắt**

Bao gồm mô tả ngắn gọn về các tính năng trong bản release, trong danh sách. Đối với nhiều ứng dụng, xác định người dùng sẽ giải thích các tính năng trong bản release cũng như mục đích và giá trị công việc.

**Các kịch bản kiểm thử được đề xuất**

Trong phần này cần cung cấp danh sách các cấp độ hoặc giải thích về các tình huống kiểm thử hiện tại.
Có thể xem xét sử dụng sơ đồ luồng nếu nó giúp dễ dang theo dõi hơn.

**Phân tích rủi ro**

Phân tích rủi ro bao gồm một bảng các mục không thể tiến hành kiểm thử được do nền tảng, môi trường , thời gian hoặc hạn chế về nguồn lực.

**Phạm vi kiểm thử**

Nếu bạn luôn kiểm tra 5 trình duyệt, hoặc IOS và Android cho mobile, hoặc SQL injection để bảo mật, hãy liệt kê các thông tin đó trong phần này

**Đánh giá**

Liệt kê bất kì ghi chú và đánh giá nhận xét từ phía QA với nhà phát triển và quản lí dự án. Các kết quả của việc xem xét và cho dù các kịch bản kiểm thử mới đã được thêm vào hoặc bất kì thay đổi bổ sung được thực hiện.
# 4. Các thành phần của một kế hoạch kiểm thử cấp độ phát hành
Dưới đây là những phần nên đưa vào kế hoạch kiểm thử mức release khác nhau . Bao gồm:

**Tóm tắt**

- Bao gồm mô tả ngắn gọn về các tính năng trong bản phát hành trong danh sách.
- Đối với nhiều ứng dụng, có thể xác định người dùng để giải thích các tính năng trong bản phát hành và mỗi mục đích giá trị của công việc.
- Đối với bản releae lớn, hoặc khi một tập tính năng ảnh hưởng tới quy trình làm việc, hãy xem xét nhóm các tính năng đó với nhau.

**Ngày phát hành**

Khi nào sản phẩm sẽ tới tay khách hàng ? Bao gồm ngày ban đầu cũng như bất kì ngày thay đổi nào - nếu có.

**Phân tích rủi ro**

- Bao gồm một bảng hoặc danh sách các rủi ro đã biết và một phần chức năng của ứng dụng bị ảnh hưởng.
- Cũng bao gồm bất kỳ quy trình công việc hoặc kiểm thử nào chưa hoàn thành hoặc không thể hoàn thành.

  Ví dụ: kiểm thử bảo mật toàn diện có thể xảy ra ngay sao khi phát hành thay vì trước đó, hoặc kiểm thử hiệu suất có thể được thực hiện giữa các bản phát hành sau khi đã thiết lập dựa trên một cơ sở.
  
**Phạm vi kiểm thử**

- Liệt kê tất cả các trình duyệt, nền tảng và các phiên bản cần được kiểm tra, cũng như phạm vi kiểm tra chuẩn và các thực hiện kiểm tra bổ sung.
- Danh sách dấu đầu dòng nơi hoạt động tốt, không làm cho nó vào một danh sách dài các tính năng ứng dụng. 

**Kiểm thử định kỳ**

Note lại các loại kiểm thử và những defect sẽ được xử lý liên quan đến thời gian phát hành như thế nào.
Lưu ý các lỗi sẽ được xử lý khác nhau dựa trên mức độ ưu tiên.

**Các tiêu chí phát hành**

Được xác định khi nó đủ tốt để phát hành.
Ví dụ bạn chỉ có thể release với tỉ lệ trên 99% đối với smoke test , hoặc khi không có lỗi nghiêm trọng nào.
Mô tả cách bạn đánh giá khi chất lượng ứng dụng đủ cao.
# 5. Viết test plan: Giữ nó ngắn gọn và dễ hiểu
- Kế hoạch kiểm thử single-page là một công cụ  có giá trị cho việc lập kế hoạch kiểm thử, ngay cả trong môi trường phát triển Agile
- Kế hoạch kiểm thử ngắn gọn tạo ra quy trình kiểm tra cho QA, đầu vào từ phát triển và quản lý dự án và tài liệu tham khảo hữu ích cho nhiều tác vụ.
- Kế hoạch kiểm tra khi được viết đúng, nhóm của bạn sẽ xem chúng như là công cụ lập kế hoạch và ghi chép có giá trị.

# Tài liệu dịch từ link:
https://techbeacon.com/get-agile-your-test-plan-how-streamline
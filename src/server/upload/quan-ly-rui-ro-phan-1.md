Quản lý rủi ro có rất nhiều phần như:
* Quản lý rủi ro
* Kiểm thử dựa trên rủi ro
* Mode lỗi và phân tích ảnh hưởng
* Kiểm thử dựa trên rủi ro làm như thế nào
* Kiểm thử phân tán, outsourced và insourrced
* Vấn đề quản lý kiểm thử

Trong phần một này tôi xin phép được trình bày hai vấn đề về quản lý rủi ro là quản lý rủi ro là gì, kiểm thử dựa trên rủi ro như thế nào. Các phần khác tôi xin được trình bày ở các phần sau.

Vậy trước hết rủi ro là gì?
Rủi ro là khả năng của kết quả hoặc sự kiện xảy ra tiêu cực hoặc không như mong đợi.

# I. Quản lý rủi ro

1. Nhận định: Những cái gì được gọi là rủi ro
2. Đánh giá:
*  Khả năng rủi ro có thể xảy ra
*  Rủi ro có tác động nghiệm trọng như thế nào

3. Điều khiển: Cái chúng ta có thể làm để giảm được sự tác động của rủi ro
4. Giám sát: hoàn cảnh nào có thể được thay đổi hay có những rủi ro nào sẽ có thể xảy ra thêm.

Mức độ của rủi ro
*  Khả năng của vấn đề có thể xảy ra
*  Tác động của vấn đề sẽ xảy ra

Chúng ta có bốn lựa chọn chính cho điều khiển rủi ro. Với các mối đe dọa ta có thể 

* Tránh: loại bỏ nguyên nhân của rủi ro
* Giảm thiểu: giảm xác suất hoặc tác động của rủi ro. Bằng cách chúng ta có thể lấy các phương pháp có thể ngăn chặn để làm giảm khả năng hoặc tác động của rủi ro.
* Chấp nhận: có kế hoạch cho rủi ro
* Chuyển đổi: có bên thứ ba gánh vác trách nhiệm của rủi ro và kết quả của nó ( ví dụ như bảo hiểm)

# II. Kiểm thử dựa trên rủi ro

## 1. Lợi ích của kiểm thử dựa trên rủi ro
Chúng ta có sơ đồ sau:

![](https://images.viblo.asia/37dc0cbf-2d76-4d53-b170-112c4c051a1b.png)

Chiến lược kiểm thử dựa trên rủi ro nên kiểm thử ở những vùng và kiểm thử cho các lỗi mà đáng ngại có khả năng xảy ra và bỏ qua các lỗi không đáng ngại.

![](https://images.viblo.asia/afeff73a-5d21-4cf6-aff7-5d8160e7b736.png)

Kỹ thuật trọng số nhẹ cho phép việc sử dụng các trọng số của khả năng và các tác nhân tác động để nhấn mạnh các rủi ro về business hoặc kỹ thuật:
*  Chỉ sử dụng hai tác nhân: khả năng và tác động
*  Sử dụng đơn giản, đánh giá định tính và quy mô.

## 2. Danh mục rủi ro

| Rủi ro dự án ( các rủi ro về kế hoạch) | Rủi ro sản phẩm ( rủi ro chất lượng) |
| -------- | -------- |
| Rủi ro tới khả năng của dự án để bàn giao sản phẩm như phạm vi, chi phí, thời gian   | Rủi ro tới chất lượng của chất lượng sản phẩm    | 
| Liên quan đến quản lý và điều khiển của dự án kiểm thử. Ví dụ thiếu nhân sự, deadlines nghiêm ngặt, thay đổi yêu cầu |Liên quan trực tiếp tới mục tiêu kiểm thử   | 
| Tác động chính của vấn đề tiềm ẩn là trên sự thành công của toàn bộ dự án | Một lỗi đáng tin cậy có thể là nguyên nhân gây ra xung đột trong hoạt động bình thường của hệ thống   |

**Rủi ro dự án**

Một danh sách đặc biệt của tất cả các rủi ro dự án liên quan đến kiểm thử có thể như sau:

* Công cụ và môi trường kiểm thử sẵn sàng
* Nhân viên kiểm thử là sẵn sàng và có chất lượng
* Chất lượng của bàn giao kiểm thử thấp
* Có quá nhiều thay đổi trong phạm vi hoặc định nghĩa sản phẩm
* Cẩu thả, effort kiểm thử ad hoc.

Tuy nhiên, một số rủi ro dự án có thể và nên được giảm thiểu một cách thành công bởi nhà quản lý kiểm thử hoặc phân tích kiểm thử:

* Chuẩn bị testware ( các đối tượng sinh ra trong quá trình kiểm thử) sớm hơn
* Kiểm thử trước của các môi trường kiểm thử
* Kiểm thử trước từ những phiên bản đầu tiên của sản phẩm
* Áp dụng điều kiện đầu vào chặt chẽ cho kiểm thử
* Thi hành các yêu cầu cho khả năng kiểm tra
* Tham gia đánh giá vào các sản phẩm công việc dự án ngay từ đầu
* Tham gia vào việc quản lý những thay đổi

## 3. Các rủi ro dự án liên quan đến kiểm thử thông thường
* Các yếu tố về kỹ thuật: các yêu cầu, công nghệ, độ phức tạp và giao diện, hiệu năng và độ tin cậy, chất lượng
* Các yếu tố bên ngoài: các nhà cung cấp và các nhà thầu phụ, tính thường xuyên, thị trường, khách hàng, luật pháp quốc gia, thời tiết.
* Các yếu tố liên quan đến tổ chức: tùy thuộc vào dự án, nguồn nhân lực, kinh phí, độ ưu tiên
* Các yếu tố liên quan đến quản lý dự án: ước tính, giao tiếp, lập kế hoạch và điều khiển.

## 4. Tài liệu về các rủi ro về chất lượng
**a. Dưới đây là một mẫu cho việc ghi lại thông tin rủi ro về chất lượng**:
*  Rủi ro về chất lượng: là các vấn đề hệ thống tiềm năng cái mà có thể làm giảm sự thỏa mãn của người sử dụng
                  Rủi ro 1
                  Rủi ro 2
                  Rủi ro n
 Có sự phân cấp phân loại rủi ro có thể giúp tổ chức ra danh sách và gợi lại trong trí nhớ củ bạn
*  Khả năng  của vấn đề: phát sinh từ việc cân nhắc kỹ thuật và thực hiện
*  Tác động của vấn đề: phát sinh từ business, sự vận hành và cân nhắc quy định
Cả khả năng và tác động của vấn đề đều được chia thành các mức khác nhau từ cao xuống thấp. Ví dụ như 1: rất cao, 2: cao, 3: trung bình, 4: thấp, 5: rất thấp.
* Đánh số ưu tiên của rủi ro: tổng hợp của vấn đề rủi ro. 
* Mở rộng của kiểm thử: 1~5 = Extensive ( sâu rộng), 6~10 Broad (Rộng), 11~15 Cursory (Mau), 16~20 Opportunity (Cơ hội), 21~25 Report bugs ( báo cáo lỗi)
* Theo dấu: Theo dấu thông tin quay ngược lại yêu cầu, thiết kế hoặc dựa trên các rủi ro khác.

**b. Mức độ của kiểm thử**
* Extensive: chạy một lượng lớn số lượng các kiểm thử mà bao gồm cả chiều rộng và chiều sâu, kết hợp và thay đổi các điều kiện khác nhau.
* Broad: chạy một lượng kiểm thử trung bình mà thực hiện nhiều các điều kiện khác nhau.
* Cursory: chạy một lượng nhỏ kiểm thử mà đơn giản chỉ là các điều kiện
* Opportunity: là đòn bảy các kiểm thử khác hoặc các hoạt động để chạy  một kiểm thử hoặc 2 của một điều kiện nhưng tốn rất ít thời gian và công sức.
* Chỉ báo cáo lỗi: không kiểm thử tất cả nhưng nếu các lỗi được liên quan tới rủi ro này làm nảy sinh trong quá trình kiểm thử khác, báo cáo những lỗi đó.
* Không làm gì: không kiểm thử cho những rủi ro này cũng như không báo cáo các lỗi liên quan.

Tôi hy vọng qua bài viết trên đã giúp các bạn hiểu thêm phần nào về quản lý rủi ro, kiểm thử dựa trển rủi ro. Trong các phần kế tiếp tôi xin trình bày các phần còn lại của quản lý rủi ro.

*Tài liệu tham khảo*: Advanced Software Testing Vol.1
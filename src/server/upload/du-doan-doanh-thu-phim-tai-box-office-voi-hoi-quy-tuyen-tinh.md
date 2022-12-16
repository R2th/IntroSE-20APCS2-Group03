**BoxOffice** một tạp chí phim ảnh ra đời từ năm 1920 và là một tên tuổi lớn trong lĩnh vực đầu tư, thương mại và sản xuất phim. 

*Có một vấn đề đặt ra khi chuẩn bị xây dựng một bộ phim là liệu bộ phim này có mang về lợi nhuận và lợi nhuận khoảng chừng bao nhiêu? Thông tin này rất quý giá cho những nhà đầu tư, bởi họ chỉ biết rót vốn và thu lời. May thay, nhờ những dữ liệu có sẵn trong quá khứ với hàng ngàn bộ phim, cộng với những thuật toán tính toán tinh vi trong Machine Learning, việc dự đoán doanh thu một bộ phim không còn quá khó khăn.*

**Hồi quy tuyến tính - Linear Regression** là thuật toán cơ bản nhất trong Machine Learning. Trong dự án đầu tiên, chúng ta sẽ sử dụng thuật toán này để dự đoán doanh thu một bộ phim khi biết chi phí sản xuất.

# Bài 1: Thu thập và làm sạch dữ liệu khi sử dụng Linear Regression

**Thu thập và tiền xử lý dữ liệu** là một khâu quan trọng trước khi bắt đầu sử dụng các thuật toán Machine Learning, các dữ liệu không có thông tin bị mất mát sai lệch làm đầu vào cho Linear Regression giúp cho các dự đoán ở đầu ra chính xác.

Trước khi bắt đầu bài đầu tiên thu thập và làm sạch dữ liệu chuẩn bị cho thuật toán Linear Regression, chúng ta sẽ tìm hiểu qua quy trình làm việc khoa học dữ liệu.

## 1. Quy trình làm việc khoa học dữ liệu
Bất kể bạn áp dụng thuật toán Machine Learning nào cho vấn đề bạn gặp phải, chúng ta sẽ đều phải trải qua một quy trình làm việc (data science workflow).
![](https://images.viblo.asia/1607b6f1-b6fe-4beb-b89a-ad7181e23780.jpg)
Trong tất cả các dự án chúng ta sẽ áp dụng quy trình này, tuy rằng không phải lúc nào cũng đủ tất cả các bước trong đấy. Trong quy trình này có 3 giai đoạn và rất nhiều các bước.

* **Giai đoạn 1 - Chuẩn bị dữ liệu:** Dữ liệu được thu thập và làm sạch. Phần lớn dữ liệu gốc đều ở dạng hỗn loạn, có thể thiếu thông tin hoặc thông tin sai lệch, do vậy cần được xử lý trước khi đưa vào các mô hình thuật toán.
* **Giai đoạn 2 - Thử nghiệm:** tại giai đoạn này các giả định được đặt ra, dữ liệu được trực quan hóa thông qua các biểu đồ và lựa chọn các mô hình.
* **Giai đoạn 3 - Triển khai:** Các báo cáo, đánh giá quá trình áp dụng và kết quả được triển khai thông qua các ứng dụng thực tế hoặc đơn thuần là các báo cáo.

Khi thực hiện các giai đoạn, có thể quay lại giai đoạn trước đó để chuẩn bị dữ liệu tốt hơn. Quy trình này được áp dụng cho các công việc thực tế, nhưng với các bài viết chúng ta sẽ rút gọn các bước lại để tập trung vào việc học tập hơn.
![](https://images.viblo.asia/5d8fe9a2-7f86-482b-84c4-2d229732e7f7.jpg)
Các bước được cô đọng lại như sau:

* Bước 1: Hình thành câu hỏi
* Bước 2: Thu thập dữ liệu
* Bước 3: Làm sạch dữ liệu
* Bước 4: Khám phá và trực quan hóa dữ liệu với biểu đồ
* Bước 5: Áp dụng thuật toán hay mô hình huấn luyện
* Bước 6: Đánh giá kết quả
## 2. Bài toán dự đoán doanh thu phim
Trước khi bắt đầu xử lý một vấn đề, chúng ta nên bỏ chút thời gian đặt ra những câu hỏi như Cái gì, Tại sao, Làm như thế nào, Ở đâu... những câu hỏi này giúp chúng ta trìu tượng hóa vấn đề. Cũng chính nhờ những câu hỏi này chúng ta sẽ xác định được loại dữ liệu nào là cần thiết bởi trong thực tế lượng dữ liệu là rất khổng lồ.

Trở lại với vấn đề mà chúng ta đang gặp phải trong bài toán dự đoán doanh thu phim. Những nhà đầu tư phim, họ rót vốn cho các bộ phim và quan tâm đến lợi nhuận các bộ phim. Áp dụng quy trình data science ở trên, bước đầu tiên chúng ta cần hình thành các câu hỏi. Câu hỏi đầu tiên:

*"Chúng ta cần bao nhiêu tiền để sản xuất bộ phim này?"*

Câu hỏi này thật sự chưa ổn, nó hơi mơ hồ. Với những người đầu tư phim, họ quan tâm đến lợi nhuận hơn là chi phí. Do đó, câu hỏi nên là:

*"Chúng ta thu được bao nhiêu khi sản xuất bộ phim này?"*

Câu hỏi này tốt hơn nhiều, nó đã nhắm đến lợi nhuận là tiêu chí các nhà đầu tư đo lường và kiểm tra cơ hội đầu tư. Chúng ta cần suy nghĩ thêm chút, vậy doanh thu sẽ phụ thuộc vào những yếu tố nào? Chúng ta có thể kể ra một loạt các yếu tố sau:

* Diễn viên có phải các ngôi sao hạng A?
* Kịch bản hay và nổi tiếng không?
* Phim có sử dụng các công nghệ tạo hiệu ứng hiện đại nhất?
* Chi phí quảng bá phim
* Đạo diễn phim có số má trên thị trường không?
* ...

Nhưng chung quy, tất cả các yếu tố này đều quay về chi phí sản xuất hay ngân sách dành cho một bộ phim. Như vậy, chúng ta cần tìm hiểu chi phí sản xuất tất cả các bộ phim đã được phát hành. Các phim như Avatar, Titanic, The Advengers... đã tiêu tốn rất nhiều chi phí, nhưng họ cũng thu lại lợi nhuận khổng lồ. Những thông tin này thì có liên quan gì đến bộ phim mà chúng ta sắp đầu tư? Nếu chúng ta biết được các bộ phim đã tiêu tốn như thế nào để đạt được doanh thu này, chúng ta có thể dự đoán được doanh thu bộ phim của chúng ta thông qua thuật toán Linear Regression - Hồi quy tuyến tính.

![](https://images.viblo.asia/f484cdf2-242e-4ced-9808-b290754bcbb7.jpg)

Trong bài toán của chúng ta có hai yếu tố:

* **Doanh thu của bộ phim chính là mục tiêu cần tìm ra (target).**
* **Ngân sách bộ phim là tham số độc lập (feature).**

Như vậy chúng ta đã hoàn thành bước đầu tiên trong dự án, chúng ta đã xác định được các yếu tố (loại dữ liệu cần thiết). Chúng ta sẽ chuyển sang bước tiếp theo thu thập và làm sạch dữ liệu.

## 3. Thu thập dữ liệu phim
Trong phần trước, dựa vào các câu hỏi và phân tích chúng ta đã biết cần phải có những dữ liệu về doanh thu và ngân sách các bộ phim. Vậy cần tìm dữ liệu này ở đâu, rất may trong trang web www.the-numbers.com có tất cả dữ liệu này. Tất cả dữ liệu doanh thu và ngân sách trong website này ở dạng bảng và tôi đã đưa chúng vào file csv.

Bạn có thể tải về dữ liệu trong file [cost_revenue_dirty.csv](https://drive.google.com/file/d/1B0r3TB1Z5IJ01U4ANA9ifstxmaCBBhat/view) để tiếp tục bước tiếp theo làm sạch dữ liệu.

## 4. Tiền xử lý dữ liệu
Mở file [cost_revenue_dirty.csv](https://drive.google.com/file/d/1B0r3TB1Z5IJ01U4ANA9ifstxmaCBBhat/view) và xem nội dung file, có rất nhiều các thông tin bất thường, có những bộ phim có doanh thu bằng 0, ví dụ như phim Singularity chẳng hạn. Nguyên nhân là gì, nếu bạn xem cột Ngày phát hành (Cột B) thì hóa ra phim này chưa ra mắt, đến tận 31/12/2020 mới phát hành.
![](https://images.viblo.asia/9e908897-08f0-4d07-a711-90cb4ed10daa.jpg)

Thực hiện lọc các phim có doanh thu bằng 0, chúng ta thấy có rất nhiều các bộ phim như vậy. Nhưng không phải tất cả trong số chúng là chưa phát hành mà có những bộ phim đã hoàn thành nhưng không được công chiếu do đang trong quá trình kiện tụng và còn nhiều lý do khác nữa... Như vậy, chúng ta cần loại bỏ tất cả những bộ phim này vì nó là những trường hợp ngoại lệ, nó làm cho dữ liệu của chúng ta thiếu sót.

Chúng ta cũng chỉ cần hai loại thông tin là doanh thu và ngân sách phim do vậy chỉ giữ lại các cột Production Budget () và WorldwideGross(). Các cột thứ hạng phim, ngày phát hành, doanh thu trong nước sẽ được loại bỏ.
Sau khi loại bỏ các thông tin bị mất, sai sót, không đúng định dạng hoặc không cần thiết, chúng ta có được file dữ liệu sau khi làm sạch [cost_revenue_clean.csv.](https://drive.google.com/file/d/1RZrLIjnG0BbRY5WYDH6hvP8KF0R9TdzV/view)

Như vậy, chúng ta đã hoàn thành 2 trong 6 bước đầu tiên là tìm ra các thông tin cần thiết và thu thập, làm sạch dữ liệu. Trong bài tiếp theo chúng ta sẽ tiếp tục bước tiếp theo là khai phá dữ liệu và trực quan hóa dữ liệu thông qua vẽ biểu đồ từ dữ liệu có được.
## 5. Tài nguyên liên quan bài viết
* File dữ liệu thu thập ban đầu [cost_revenue_dirty.csv.](https://drive.google.com/file/d/1B0r3TB1Z5IJ01U4ANA9ifstxmaCBBhat/view)
* File dữ liệu đã được xử lý [cost_revenue_clean.csv.](https://drive.google.com/file/d/1RZrLIjnG0BbRY5WYDH6hvP8KF0R9TdzV/view)
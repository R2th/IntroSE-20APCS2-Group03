# Google Pagespeed Insights là gì?

Google PageSpeed Insights là một nhóm công cụ của Google được thiết kế để giúp tối ưu hóa hiệu suất của trang Web. Pagespeed Insights sẽ tập trung hai vấn đề là tốc độ tải trang và tính thân thiện với người dùng.Các thành phần này tuân thủ các phương pháp về hiệu suất Web của Google, cũng như là tự động hóa quy trình điều chỉnh.

![](https://images.viblo.asia/56dc91d5-49bd-4e70-b33c-dbf82188eee8.jpg)

Số liệu sẽ trả về thông qua bản báo cáo PSI. Và đề xuất cải thiện trang sẽ được công cụ này cung cấp cho người dùng. Kể từ cuối năm 2018, PSI được vận hành bởi Lighthouse. Vì thế, những số liệu trong báo cáo PSI đều dựa trên số liệu từ phòng Lab của Lighthouse. Khi quét trên Web, Pagespeed Insights sẽ cung cấp hai loại dữ liệu về cho người dùng:

* Thứ nhất là dữ liệu phòng thí nghiệm (Lab Data)
* Hai là dữ liệu thực tế (Field Data)

Lab Data được thu thập trong môi trường bị kiểm soát. Với nhiều thiết bị và mạng Internet đã sắp xếp trước. Vì vấn đề về mạng và thiết bị được kiểm tra toàn diện. Nên kết quả trả về sẽ cho người dùng biết vấn đề xảy ra hoàn toàn do hiệu suất Website.

Từ đó họ dễ dàng tìm ra lỗi và khắc phục. Mặt khác, dữ liệu thực là dữ liệu đã thu thập qua những lần tải trang thực đến từ người dùng. Từ đây, chúng ta kiểm tra và giải quyết nút thắt Page Speed có thể xảy ra trong thực tế.

# PageSpeed cung cấp loại thông tin nào về Website? 
Dùng Google Pagespeed Insights để phân tích một Page. Kết quả trả về sẽ là những phần và chỉ số hiệu năng khác nhau của Web đó. Chúng sẽ sắp xếp theo thứ tự như sau:

## Speed Score – Điểm tốc độ
![](https://images.viblo.asia/0c313c98-5a1a-43d2-a0c0-d25a111d2c3a.jpg)

Điểm tốc độ Page Speed này dựa trên số liệu lấy ra từ phòng thí nghiệm của Lighthouse. Chúng ta sẽ tìm hiểu kĩ hơn về cách tính số liệu này trong những phần sau.

## Field Data – Số liệu thực
![](https://images.viblo.asia/b67792f1-1e88-4701-b6af-e97066461fa5.jpg)

Gồm 2 phần chính:[ First Contentful Paint (FCP)](https://developers.google.com/web/tools/lighthouse/audits/first-contentful-paint) và [First Input Delay (FID)](https://developers.google.com/web/updates/2018/05/first-input-delay). Nó sẽ trả về dựa trên [Trải nghiệm thực người dùng Chrome](https://developers.google.com/web/tools/chrome-user-experience-report/). Chúng được kiểm nghiệm trong vòng 30 ngày khi chạy Pagespeed Insights . 

## Lab Data – Dữ liệu Lab
![](https://images.viblo.asia/87a9b60e-ad6f-48ec-9e23-21d50ca3703e.jpg)

Như đã nói ở trên, dữ liệu Lab hoàn toàn dựa trên phân tích của Lighthouse. Những số liệu này lấy từ thiết bị di động và mạng di động giả lập.

## Opportunities – Cơ hội (Đề xuất cải thiện trang)
![](https://images.viblo.asia/e2f86721-cc5c-4d89-9eb7-3b2f2d4d0a8a.jpg)

Ở phần Opportunities, PSI đưa ra những đề xuất về những chỉ số hiệu suất để cải thiện thời gian tải. Mỗi đề xuất sẽ cho thấy ước tính thời gian tải trang tiết kiệm được nếu gợi ý PSI đã triển khai.

Người dùng qua đó để tạo ra thay đổi giúp cho hiệu năng tải tăng lên. Từ đó nâng cao trải nghiệm người truy cập Website khi cải thiện Pagespeed Insights.

## Diagnostics – Chẩn đoán
![](https://images.viblo.asia/f841003c-56b3-4709-a769-7252fa6f8d81.jpg)
Phần Diagnostics cung cấp khuyến nghị về phương pháp phát triển Website hay nhất để thêm vào Web. Nó sẽ đưa ra một số công cụ đề xuất hỗ trợ để có thể sử dụng.

## Passed Audits – Thông qua kiểm tra (Các thành phần ổn định)
Phần Passed Audits bao gồm tất cả kết quả hiệu năng đã hoạt động tốt trên Website. Những thành phần hiển thị sẽ không cần chỉnh sửa gì thêm nữa.

# Điểm PageSpeed ​​Insights được tính như thế nào?  
Như đã đề cập ở phần trên. Kết quả PageSpeed Insights được cung cấp với API Lighthouse. Điểm Google Pagespeed Insights bao nhiêu cũng không ngoại lệ. Điều quan trọng nhất cần chú ý là: Lightgouse mô phỏng tải trang trong một môi trường đã sắp xếp sẵn:

Với mạng và thiết bị di động ở tầm trung. Một số tài liệu về cách tính Lighthouse đã được Google Page Speed phát hành. Chúng sẽ giúp ta hiểu thêm về nguồn gốc xếp hạng Page Speed Insights.

Lighthouse trả kết quả Performance Score cho Website giữa 0 đến 100. 0 là điểm số thấp nhất, nó chỉ xảy ra khi Lighthouse bị lỗi. […]. 100 là cao nhất mà một Website có. Nó đại diện cho việc Web đó thuộc Top đầu phân vị 98 (trên thang nhóm 100). Điểm 50 đại diện cho phân vị thứ 75.

Google Page Speed cũng làm rõ: Ở danh mục Performance của Lighthouse, chỉ có mục trong phần Metrics mới có ảnh hưởng đến điểm Page Speed. Với Lighthouse 6 (phát hành hồi tháng năm, 2020), sẽ đo bằng 6 chỉ số dưới đây:

* First Contentful Paint – Nội dung đầu hiển thị
* Time to Interactive – Thời gian tương tác
* Speed Index – Chỉ số tốc độ Page Speed
* Largest Contentful Paint – Phần tử lớn nhất hiển thị
* Total Blocking Time – Tổng thời gian chặn
* Cumulative Layout Shift  – Thay đổi bố cục tích lũy

![](https://images.viblo.asia/84e8189d-3b32-4eea-891b-53a030f6456a.jpg)
Lighthouse sẽ dùng những chỉ số này để tạo ra bảng Performance Rating. Tùy vào khung điểm sẽ có màu sắc khác nhau:

* 0 đến 49 (chậm): Màu đỏ
* 50 đến 89 (trung bình): Màu cam
* 90 đến 100 (nhanh): Màu xanh lá

Nếu muốn biết cách chỉ số ảnh hưởng đến điểm số cuối cùng. Thì hãy tham khảo [Chi tiết điểm của Google Pagespeed Insights](https://googlechrome.github.io/lighthouse/scorecalc/) nhé.

# Pagespeed ​​Insights ảnh hưởng như thế nào đến SEO? 
Google Page Speed sẽ đánh giá một phần độ thân thiện của Web thông qua điểm số Google Pagespeed Insights. Trên thực tế, điểm số này thực sự không có mối liên hệ gì đến SEO. Tuy nhiên, việc điểm số cao tương đồng với việc người truy cập sẽ có trải nghiệm tốt hơn.

Công cụ tìm kiếm thông qua chỉ số này sẽ đánh giá cao Website. Đồng thời đẩy thứ hạng của Web lên bảng kết quả nhiều hơn, cao hơn. Tuy điểm số Page Speed không gây ảnh hưởng đến SEO. Nhưng nếu cao, nó sẽ giúp ta có thêm nhiều lượt truy cập và ở lại Web lâu hơn.

> Tóm lại là điểm số của Page Speed không có sự ảnh hưởng trực tiếp tới tiến trình hay điểm SEO. Nó cũng không giúp cải thiện hay làm hạ thấp thứ hạng của Website.Nhưng điểm cao Pagespeed Insights cao sẽ mang lại trải nghiệm tuyệt vời.



# Cách sử dụng Google PageSpeed Insights Report
Chúng ta đã biết chỉ số PSI, vậy dùng báo cáo PSI như thế nào? Để cho ra PSI Report hãy truy cập vào đường dẫn của PSI, điền URL của bạn và chờ kết quả hiển thị Page Speed. Vậy sau đó thì sao? Tất nhiên là phải kiểm tra số liệu và sửa những lỗi mà PSI đưa ra để Web hoạt động tốt hơn rồi.

Ngay bên dưới phần Opportunities, nhấn vào dòng chữ “Show How To Fix”. Những tệp đang làm chậm Website liệt kê ra, việc của bạn là xử lý chúng để giảm thời gian chờ máy chủ phản hồi.

![](https://images.viblo.asia/7c8f7c46-5497-4a8f-8182-7419358ed53d.jpg)

Nói tóm lại, nếu bạn muốn có một trang web chất lượng cao và được tối ưu hóa, Pagespeed Insights chính là công cụ hữu hiệu cho bạn. Bạn nên biết sử dụng công cụ này sao cho hợp lý để trang web của mình đạt được chất lượng hoàn hảo nhất.
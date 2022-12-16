# **1. Google Lighthouse là gì?**

**Google Lighthouse** là một công cụ mã nguồn mở để chạy kiểm tra website. Công cụ này được google phát triển khá lâu cho đến nay. Hiện tại đang đang là bản 3.0 và nó dùng phân tích từng khía cạnh của url như: Hiệu suất, Ứng dụng web, Khả năng truy cập, phương pháp và SEO.

Có thể nói Lighthouse là công cụ toàn diện nhất của Google hiện nay để giúp người dùng đánh giá trang web một cách chính xác nhất. Ngoài khả năng phân tích bao quát, công cụ này cũng đưa ra  các lời khuyên hữu ích để bạn nâng cao chất lượng website. 

![](https://edgy.app/wp-content/uploads/2019/06/New-Study-Unveils-the-Technical-Optimization-Standards-of-Top-Ranking-Websites-on-Google.jpg)

# **2. Các thông tin số trong Google Lighthouse**
### a. Performance
**Performance** chính là hiệu suất của website, để đánh giá được tiêu chí này, cần dựa trên nhiều yếu tố như back-end và front-end. Nếu muốn nhận được điểm đáng giá cao, bạn cần chú ý đến Optimize images, minify Css/Js, tăng tốc website, nếu website đang chậm hãy tham khảo tăng tốc bằng các plugin nhé! Ngoài đánh giá dựa trên một số tiêu chí cụ thể thì việc tăng trải nghiệm người dùng vẫn là yếu tố được quan tâm hàng đầu.

![](https://user-images.githubusercontent.com/4038316/91424890-ad467d00-e85a-11ea-81fc-e6506366ae50.png)

Trong danh mục này, Lighthouse phân tích tốc độ tải trang web hoặc ứng dụng và người dùng có thể truy cập hoặc xem nội dung nhanh như thế nào. Tại đây, Lighthouse phân tích sáu chỉ số tốc độ:

* **First Contentful Paint (Nội dung đầu tiên)**: Điều này cho biết thời gian trước khi văn bản hoặc hình ảnh đầu tiên hiển thị cho người dùng.
* **Bức tranh có ý nghĩa đầu tiên** :  Điều này cho biết thời gian khi nội dung chính của trang hiển thị cho người dùng.
* **Speed Index (Chỉ số tốc độ)**: Chỉ số tốc độ cung cấp một số liệu thống nhất để thể hiện tốc độ tải nội dung của một trang.
* **Largest Contentful Paint (Hiển thị nội dung lớn nhất)**: là chỉ số đo lường thời gian tải hoàn tất của một thành phần lớn nhất trên website được hiển thị đầu tiên sau khi tải trang
* **Time to interactive (Thời gian tương tác)**: Điều này cho biết thời gian trước khi người dùng có thể tương tác hoàn toàn với trang và nội dung của trang.
* **Total Blocking Time (Tổng thời gian chặn)** : chỉ số quan trọng, lấy người dùng làm trung tâm, dùng để đo khả năng đáp ứng tải (load responsiveness), vì nó giúp định lượng mức độ nghiêm trọng của khoảng thời gian từ khi trang không có khả năng tương tác đến khi có khả năng tương tác ổn định (reliably interactive)- TBT thấp giúp đảm bảo trang nhanh chóng sử dụng được. Kết quả trước đó là ước tính (tính bằng mili giây) về thời gian một ứng dụng cần phản ứng với đầu vào của người dùng trong cửa sổ tính toán tối đa 5 giây trong khi tải trang. Nếu độ trễ trên 50 mili giây, người dùng có thể nhận thấy ứng dụng hoặc trang web quá chậm.
* **Cumulative Layout Shift (Thay đổi bố cục website)**: CLS là sự dịch chuyển bất ngờ các yếu tố trên trang web (mà người dùng không mong đợi) trong khi trang web vẫn đang tải xuống. Các yếu tố thường gây ra sự thay đổi thường gặp là font chữ, hình ảnh, video, contact form, các nút bấm (botton) và một vài loại nội dung khác

**Tham khảo chi tiết tại đây** : https://web.dev/lighthouse-performance/

### b. Accessibility
Với tiêu chí **Accessibility** của Lighthouse bạn sẽ biết được liệu web của mình đã được tối ưu khả năng truy cập hay chưa, với các đánh giá cụ thể theo thang điểm bạn sẽ cân nhắc xem liệu yếu tố nào cần phải cải thiện.

![](https://azdgo.com/wp-content/uploads/2021/01/Google-Lighthouse-Accessibility.jpg)

Kiểm tra khả năng truy cập của Lighthouse kiểm tra mức độ sử dụng của một trang web. Điều này bao gồm kiểm tra các yếu tố quan trọng như nút hoặc liên kết, để xem liệu chúng có được mô tả đầy đủ hay không hoặc liệu hình ảnh có được gán thuộc tính alt để nội dung hình ảnh.

**Tham khảo chi tiết tại đây** : https://web.dev/lighthouse-accessibility/

### c. Best Practices
Tương tự như các tiêu chí đã được nêu, **Best Practices** là yếu tố quan trọng để Lighthouse đánh giá website của bạn. Best Practice yêu cầu website của bạn phải đạt được một số tiêu chuẩn bắt buộc.

![](https://azdgo.com/wp-content/uploads/2021/01/Google-Lighthouse-Best-Practices.jpg)

Thực tiễn tốt nhất được Lighthouse kiểm tra chủ yếu tập trung vào các khía cạnh bảo mật của trang web và các tiêu chuẩn phát triển web hiện đại. Lighthouse phân tích xem HTTPS và HTTP / 2 có được sử dụng hay không, kiểm tra xem tài nguyên có đến từ các nguồn an toàn hay không và đánh giá lỗ hổng của các thư viện JavaScript.

Các phương pháp hay nhất khác xem xét các kết nối cơ sở dữ liệu an toàn và tránh sử dụng các lệnh không an toàn, chẳng hạn như document.write () hoặc kết hợp các API cổ.

**Tham khảo chi tiết tại đây** : https://web.dev/lighthouse-best-practices/

### d. SEO

Lighthouse chạy nhiều thử nghiệm khác nhau để xác định mức độ tốt mà một trang web hoặc ứng dụng có thể được thu thập thông tin bởi các công cụ tìm kiếm và hiển thị trong kết quả tìm kiếm. Các bài kiểm tra Lighthouse mà Google mô tả là “SEO” này rất hạn chế; bất kỳ ai có trang web hoặc ứng dụng không đạt được điểm tối đa nên thực hiện các bản sửa lỗi cần thiết.

![](https://azdgo.com/wp-content/uploads/2021/01/Google-Lighthouse-SEO.jpg)

Khi những thay đổi này đã được thực hiện, việc tối ưu hóa công cụ tìm kiếm mang lại tiềm năng rất lớn cho những cải tiến khác, điều này chắc chắn cần được khám phá.

Lighthouse hiện đang thực hiện 13 cuộc kiểm tra trong danh mục tối ưu hóa công cụ tìm kiếm. Chúng chủ yếu xem xét tính thân thiện với thiết bị di động, ứng dụng chính xác của dữ liệu có cấu trúc và các thẻ như canonicals, hreflang, tiêu đề và mô tả meta và liệu một trang có thể được thu thập thông tin bằng bot của công cụ tìm kiếm hay không.

**Tham khảo chi tiết tại đây** : https://web.dev/lighthouse-seo/

### e. Progressive Web App

**Progressive Web App** là một nhóm các kỹ thuật tạo ra trải nghiệm tốt hơn cho người dùng dựa trên nền tảng web. Cho phép người dùng trải nghiệm tốt hơn trên thiết bị điện thoại, cung cấp nhiều tính năng khác nhau như: khả năng ngoại tuyến, đẩy thông báo, lưu trữ cục bộ tài nguyên. 

![](https://ecshopvietnam.com/cdn/upload/images/article/pwa-google-lighthouse.png)

Phần này ban đầu là cốt lõi của Google Lighthouse – phân tích về Ứng dụng web tiến bộ hoặc PWA. Trang web có đăng ký nhân viên dịch vụ không? Nó có hoạt động ngoại tuyến với truy cập internet không? Nó có trả về lỗi 200 không? Các cuộc kiểm tra này là cách Lighthouse bắt đầu, nhưng chúng hiện chỉ là một trong năm hạng mục kiểm tra và là một hạng mục chỉ thực sự quan trọng đối với các nhà cung cấp Ứng dụng web tiến bộ.

**Tham khảo chi tiết tại đây** : https://web.dev/progressive-web-apps/
# **3. Cách sử dụng Google Lighthouse**
# 
Có 3 cách để sử dụng **Google Lighthouse**:

### a. Chạy Lighthouse trong Chrome DevTools <br>

Đây là cách đơn giản và được sử dụng nhiều nhất mỗi khi bạn muốn dùng công cụ **Google Lighthouse**.

**Bước 1**:  Nhập vào Google Chrome địa chỉ website bạn muốn kiểm tra tối ưu

**Bước 2**:  Nhấn tổ hợp phím Ctrl + Shift + J hoặc phím F12 để mở bảng công cụ và chọn Audits.

**Bước 3**: Chọn Perform an audit DevTools để hiển thị các danh sách Audit Categories.

**Bước 4**: Chọn các danh mục bạn muốn Google Lighthouse phân tích.

**Bước 5**: Chọn Generate Report để hiển thị kết quả phân tích.

### b. Chạy Lighthouse bằng Chrome Extension <br>

Đối với cách thức này, bạn phải cài đặt Lighthouse Chrome Extension để sử dụng. Các bước cụ thể như sau:

**Bước 1**: Truy cập Google Chrome. Tìm kiếm Lighthouse Chrome Extension. Chọn Lighthouse trở thành công cụ tiện ích trên Google Chrome.

Bước 2: Mở Website bạn muốn kiểm tra. Click Lighthouse nằm ở góc phải màn hình để kích hoạt công cụ. Sau đó, chọn Tạo báo cáo (Generate Report) và đợi kết quả hiển thị sau 1 phút.



# 4. Tổng kết:
- Google Lighthouse là một trong những công cụ toàn diện giúp bạn đánh giá nhiều khía cạnh và đưa ra lời khuyên cụ thể để tối ưu cho trang web mình
- Với Lighthouse, cả QA và dev có thể dễ dàng xác định bất kỳ vấn đề nào với trang Web và có thông tin cần thiết để tối ưu hóa trang một cách thích hợp trong giai đoạn dự án chuẩn bị bàn giao cho khách hàng 
- Theo kinh nghiệm của mình riêng QA sử dụng nó check phần performance và SEO thì sẽ rất hiệu quả. Riêng phần PWA trong lighthouse thì phía QA sẽ hạn chế check phần này nhất vì trong giai đoạn phát triển hệ thống bên dev sẽ kiểm tra được phần PWA dễ dàng hơn.
- Qua bài chia sẽ hôm nay, những tính năng và lợi ích nổi bật mà Lighthouse mang lại cho chúng ta được giải đáp. Còn chần chờ gì mà bạn không không sử dụng Google Lighthouse để tối ưu hiệu suất cho webpage mình ngay bây giờ.
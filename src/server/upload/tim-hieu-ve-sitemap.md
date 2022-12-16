# 1. Định nghĩa 
- Sitemap là 1 hệ thống bản đồ của 1 trang web. 
- Là 1 tập tin văn bản có chứa tất cả các URL của website. 
- Sitemap hay còn gọi là sơ đồ web có thể cung cấp các thông tin như: bài viết mới, bài viết được cập nhật, thời điểm trang được update lần cuối v.v... 
# 2. Chức năng
- Định hướng cho các công cụ, bộ máy tìm kiếm có thể dễ dàng truy cập và thu thập thông tin của website 1 cách hiệu quả. 
- Một sitemap có cấu trúc tốt thì sẽ được Google đánh giá cao.
- Update những thay đổi của website khi thực hiện những thay đổi bất kì. 
# 3. Phân loại
## 3.1. Theo cấu trúc
Có 2 loại Sitemap:
### 3.1.1.  XML 
- Dành cho bot của các công cụ tìm kiếm. 
- Dùng để khai báo siêu văn bản riêng cho các công cụ tìm kiếm.
- Chứa các meta data chung với các URL của website
- Chứa các thông tin về thời gian update

VD: https://www.google.com/sitemap.xml
### 3.1.2. HTML 
- Dành cho người dùng dễ truy cập trên các giao diện trang web
- Giúp người dùng chuyển hướng dễ dàng
- Thúc đẩy thứ hạng của website nhờ tính thân thiện 

VD: https://www.google.com/sitemap.html
## 3.2. Theo dạng 
- Sitemap Index: Tập hợp các Sitemap được đính kèm và được dùng để đặt trong file robots.txt
- Sitemap-category.xml: Tập hợp cấu trúc của các danh mục trên website.
- Sitemap-products.xml: Sitemap dành cho các link chi tiết về các sản phẩm trên website.
- Sitemap-articles.xml: Sitemap dành cho các link chi tiết của từng bài viết trên website.
- Sitemap-tags.xml: Sitemap dành cho các thẻ trên website.
- Sitemap-video.xml: Sitemap dành riêng cho video trên website.
- Sitemap-image.xml: Sitemap dành cho các link về hình ảnh.
# 4. Lợi ích
4.1. Ảnh hưởng trực tiếp đến quá trình SEO 
- Góp phần thông báo cho công cụ tìm kiếm Google biết rằng, trang web của bạn có chuẩn SEO.

VD: Nếu website bạn có một số bài viết chưa được index thì sitemap sẽ khai báo với Google bài viết này và sau đó Google sẽ index cho những bài viết này.
4.2. Giúp Google index website mới nhanh hơn
- Các Robot dựa vào đây để indexing website của bạn 1 cách nhanh nhất, thay vì chúng phải tự mò và lập sitemap riêng có thể không giống như mục đích của người chủ website. 
- Việc Robot tự indexing dựa vào sitemap đem lại lợi ích cho chiến lược SEO.  
4.3. Hỗ trợ trải nghiệm người dùng khi website có sitemap
- Về phương diện người sử dụng, Sitemap trong website giúp cho người truy cập có thể định hình và hiểu được cấu trúc của trang web rõ hơn, đồng thời có thể truy cập và tìm kiếm thông tin mà họ cần một cách chính xác nhất.
- Sitemap càng chi tiết, phân cấp càng rõ ràng thì khả năng gia tăng trải nghiệm, thu hút người dùng càng cao.
# 5. Cách để tạo ra Sitemap 
**Bước 1**
- Vào địa chỉ http://www.xml-sitemaps.com/. 
- Có thể tạo được khoảng 500 sitemap miễn phí. 
- Trên 500 thì sẽ mất phí khoảng từ 5 đô la đến 40 đô la/ tháng tùy theo những dịch vụ mà bạn mong muốn sử dụng.

**Bước 2**
- Điền địa chỉ Url cho website của bạn và hoàn tất một số thông tin cơ bản theo hướng dẫn.

**Bước 3**
- Nhấn nút “Start” và chờ quá trình hoàn tất. 
- Sau khi quá trình hoàn tất, bạn sẽ nhận được một danh sách các file sitemap nhưng chủ yếu bạn cần lưu ý đến 4 file sau: ror.xml, sitemap.html và urllist.txt, sitemap.xml.

**Bước 4**
- Tải file xml về. 
- Sau đó, sử dụng Notepad ++ để mở file đã tải và điều chỉnh các thông số Priority cho các url theo ý muốn của bạn.

**Bước 5**
- Up file xml lên website của bạn và vào công cụ SEO Google Webmaster để cập nhật sitemap.
# 6. Một số lưu ý khi tạo sitemap
- Sitemap nên tương ứng với thiết kế của website. Lý do: để tránh việc các bộ máy tìm kiếm như Google sẽ đánh giá website của bạn là một website rác và cần được loại bỏ chỉ vì đưa ra các chỉ dẫn không phù hợp với website thực tế. 
- Hạn chế sử dụng những yếu tố đồ họa khi tạo sitemap. Lý do: hiện nay người dùng thường dùng các chức năng chặn đồ họa khi truy cập vào các trang web.
- Đặt đường liên kết của sitemap ở trang chính hoặc trang đầu hay bất kỳ nơi nào mà người dùng có thể dễ dàng sử dụng khi cần thiết. Lý do: nếu để ở những nơi khó tìm sẽ gây khó khăn cho việc điều hướng người dùng truy cập các trang web dễ dàng hơn. 
# 7. Tìm hiểu thêm về các thôg số trong Sitemap XML

***Chú thích 1 số thuật ngữ:***
- Index (Indexing) là một thuật ngữ được sử dụng trong SEO. Nó mô tả quá trình thu nhâp dữ liệu của công cụ tìm kiếm đối với website.
- SEO  là viết tắt của từ Search Engine Optimization – tối ưu hoá công cụ tìm kiếm.
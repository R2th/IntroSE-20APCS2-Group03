Để giữ cho code của bạn được gọn gàng, có tổ chức khi phát triển một ứng dụng Rails lớn có thể khá là khó khăn, ngay thậm chí đối với những developer có kinh nghiệm. May mắn thay, các gem hiện nay đã giúp bạn làm việc đó một cách dễ dàng hơn.

Đối với hầu hết mọi người, những dead code, hoặc những code kém hiệu quả sẽ được xây dựng dần theo thời gian. Một số khác sẽ tìm thấy chính mình trong những trình trạng khó khăn tương tự khi họ nhận dự án của người khác. Refactor lại codes của người khác, là một công việc khá tẻ nhạt và tốn nhiều thời gian, vì vậy việc sử dụng công cụ bên thứ 3 sẽ giúp ích cho các bạn rất nhiều.
Nếu bạn muốn codes của mình dễ bảo trì hơn, an toàn và tối ưu hơn, hãy tham khảo qua một số gem sau đây
# 1. [TRACEROUTE](https://github.com/amatsuda/traceroute)
Traceroute là một công cụ giúp làm gọn gàng các routes trong ứng dụng của bạn. Nó cung cấp các rake task đơn giản để kiểm tra các routes đang được ánh xạ tới những controller actions không tồn tại, và tìm ra những controller actions không thể truy cập tới.

![](https://images.viblo.asia/d168d4eb-9f0f-4871-bb62-5edb2bcf5b4a.png)

# 2. [RACK-MINI-PROFILER](https://github.com/MiniProfiler/rack-mini-profiler)
Đây là một công cụ tốt được sử dụng cho việc tìm kiếm những điểm nghẽn trong các ứng dụng của bạn. Nó thực hiện một phân tích tốc độ trực tiếp, xem mất bao lâu để request được xử lý, mất bao nhiêu thời gian để truy vấn database, load DOM. Chỉ cần add nó vào Gemfile, bạn sẽ nhận được một cửa sổ nhỏ ở góc trên bên trái của trang của bạn, hiển thị tất cả những thông tin như đã nói ở trên.

![](https://images.viblo.asia/65e2f95b-57ef-4144-8066-b5331b865e87.png)

# 3. [BULLET](https://github.com/flyerhzm/bullet)
Gem này tôi đặc biệt cảm thấy thích. Bullet gem giúp tăng hiệu năng cho ứng dụng của bạn bằng cách giảm số lượng câu truy vấn đã có. Nó sẽ xem tất cả các truy vấn của bạn và thông báo cho bạn khi phát hiện ra câu truy vấn N+1 queries, hoặc những eager loading không cần thiết và khi nào cần sử dụng truy cập bộ nhớ cache thông qua một alert box.

![](https://images.viblo.asia/92412d3e-4fa7-45d2-be74-e7eff3b4a961.png)

# 4. [BRAKEMAN](https://github.com/presidentbeef/brakeman)
Đây là một công cụ phân tích bảo mật cho các ứng dụng Rails của bạn. Nó quét thông qua ứng dụng của bạn và kết quả đầu ra là một bảng định dạng các lỗ hổng có thể. Cảnh báo an toàn được phân nhóm theo mức độ nghiêm trọng của nó (cao, trung bình và thấp). Bạn có thể tìm hiểu thêm về ý nghĩa của chúng trong danh sách các cảnh báo của Brakeman.

Lưu ý rằng ngay cả khi bạn kết thúc không có bất kỳ cảnh báo, nó không có nghĩa là ứng dụng của bạn là an toàn, vì Brakeman đôi khi bỏ qua một số cạm bẫy bảo mật cơ bản.

![](https://images.viblo.asia/c0478d5c-8c90-42a1-bf5d-9cfe314fc0c2.png)

# 5. [DEADWEIGHT](https://github.com/aanand/deadweight)
Deadweight được sử dụng để làm sạch bộ chọn CSS không sử dụng. Bạn phải phát một tập hợp các trang mẫu và các trang HTML của ứng dụng và nó sẽ báo cáo bộ chọn CSS nào an toàn để loại bỏ.

![](https://images.viblo.asia/1dd4fc0f-e5d3-461c-a9f5-b24082304fe7.png)

# 6. [RAILS BEST PRACTICES](https://github.com/railsbp/rails_best_practices)
Rails best practices là một công cụ đo số liệu của codes để kiểm tra chất lượng của codes Rails của bạn. Nó cung cấp một loạt các gợi ý, như sử dụng scope access, restrict auto-generated routes, và database indexes.

![](https://images.viblo.asia/c32f2185-0fe2-4b93-9a4c-7bbb8182ed88.png)

# 7. [RUBOCOP](https://github.com/bbatsov/rubocop#cops)
Rubocop là một công cụ để phân tích và so sánh code Ruby với một số quy tắc đã được định nghĩa sẵn (Các quy tắc của RuboCop thường được gọi là "cops").

Rubocop được xây dựng để phục vụ cho các Ruby developer. Các quy tắc trong RuboCop có thể được enable hoặc disable tùy ý. Ta cũng có thể tùy chỉnh các quy tắc trong RuboCop để có thể thực thi những chuẩn riêng ứng với từng dự án Ruby.

Sử dụng RuboCop sẽ giúp chúng ta tạo ra những dòng code Ruby tốt hơn:

Đánh giá được code của bạn với các số liệu như độ dài của dòng, kích thước hàm.
Giúp cho các thành viên trong cùng một dự án tạo ra được cấu trúc code tương tự nhau.
Thiết lập được sự thống nhất trong source code.

![](https://images.viblo.asia/ba225333-7421-4447-b04a-a14c57436990.png)

# 8. [RUBYCRITIC](https://github.com/whitesmith/rubycritic)
Là một gem tương đối mới, bao quanh một số gem phân tích tĩnh như Reek (ruby code smells), Flay (phát hiện trùng lặp code) and Flog (ABC metrics) để cung cấp một bản báo cáo về chất lượng của code Ruby của bạn.

![](https://images.viblo.asia/63dac531-d5c0-4a22-aedb-97ca62a43ab6.png)


Nếu bạn đang làm việc trong một dự án mã nguồn mở hoặc có thể đủ khả năng để tự động hóa tất cả quá trình phân tích mã tĩnh trên mỗi commit, tôi đề xuất bạn nên sử dụng code climate service.

Trên đây là bài viết của mình, hi vọng vài viết trên sẽ giúp bạn đọc có thể tối ưu code và gọn gàng hơn, mình xin cảm ơn!

# Tham khảo
https://infinum.co/the-capsized-eight/top-8-tools-for-ruby-on-rails-code-optimization-and-cleanup
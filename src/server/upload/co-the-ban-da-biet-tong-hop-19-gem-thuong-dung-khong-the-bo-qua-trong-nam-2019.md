Tác giả đã mất nhiều năm để cung cấp cho bạn thông tin cập nhật về những gem Ruby mà các developer thấy hữu ích nhất trong công việc của họ. Rất vui khi mang đến cho bạn list gem mà bạn không thể bỏ qua trong năm 2019.

**1. ActiveRecord Import**

Một gem cho phép insert số lượng lớn bản ghi một cách dễ dàng. 
activerecord-import theo các liên kết Activerecord và tạo ra số lượng câu lệnh insert SQL tối thiểu cần thiết, tránh vấn đề N + 1. Vì ActiveRecord đơn giản có thể hoạt động tốt khi insert hàng trăm hoặc hàng nghìn bản ghi, gem này cực kỳ hữu ích khi nhập dữ liệu ngoài. Nói một cách đơn giản, activerecord-import giảm thời gian chuyển đổi đáng kể.

**2. Primary**

Primary cung cấp đánh dấu một bản ghi một cách dễ dàng để là "primary" hay "active" hoặc "selected” một scope nhất định. Ví dụ: nếu trang web của bạn có một số ngôn ngữ phân biệt, Nó sẽ chọn một trong số đó làm ngôn ngữ mặc định.

**3. Rollout**

gem này cho phép đưa ra các tính năng cho người dùng chọn.

**4. Pry, Pry-Rails, Pry-Byebug, Pry-Remote**

Một bộ gem bắt buộc phải có cho bất kỳ developer Rails nào dùng trong debug. Pry được viết bắt đầu để đảm bảo một số tính năng nâng cao bao gồm duyệt mã nguồn, đánh dấu cú pháp, trợ giúp trực tiếp hệ thống và một loạt các plugin cung cấp từ xa và các chức năng sửa lỗi đầy đủ.

**5. Wicked PDF**

Một gem tạo ra các tệp PDF từ các  Rails template . Thay vì xử lý một số PDF generation DSL, bạn chỉ cần viết Rails view như bình thường và sau đó wicked_pdf xử lý phần còn lại.

**6. Cocoon**

gem này xử lý các form lồng nhau dễ dàng hơn. Các hình thức lồng nhau là xử lý các mô hình và thuộc tính lồng nhau trong một hình thức. ví dụ: một dự án với nhiều task của nó hoặc một hóa đơn với các chi tiết đơn hàng của nó. Tương thích với Rails 3 , 4 và 5.

**7. Grape**

Khung API giống như REST của Ruby. Nó được thiết kế để chạy trên Rack hoặc bổ sung các khung ứng dụng web hiện có như Rails và Sinatra bằng cách cung cấp DSL đơn giản để dễ dàng phát triển API RESTful.

**8. Rake**

Đây là một chương trình Make-like được triển khai trong Ruby với các tác vụ và phụ thuộc được chỉ định trong cú pháp Ruby tiêu chuẩn. 
-	Rakefiles: hoàn toàn được xác định theo cú pháp Ruby tiêu chuẩn. 
-	Người dùng có thể chỉ định các nhiệm vụ với điều kiện tiên quyết.
-	Rake hỗ trợ các mẫu quy tắc để tổng hợp các tác vụ ngầm
-	Các tệp tin linh hoạt hoạt động như các mảng nhưng biết về thao tác tên và đường dẫn tệp.

**9. Webpacker**

Cung cấp tích hợp với gói webpack và yarntrong rails app. Mục đích chính webpacker là để phục vụ JavaScript, cũng như các assets của CSS, hình ảnh và phông chữ cho JavaScript dựa trên thành phần, nhưng cũng có thể sử dụng nó cho application's assets.

**10. Bullet**

Được thiết kế để tăng hiệu suất của ứng dụng bằng cách giảm số lượng truy vấn mà nó thực hiện. Bullet để mắt đến chúng trong khi ứng dụng đang được phát triển và sẽ thông báo cho bạn bất cứ khi nào eager loading(N + 1 queries ), khi không cần thiết và khi nào nên sử dụng bộ đệm.

**11. Geocoder**

geocoder thực hiện nhiều chức năng. Nhờ có nó, bạn có thể chuyển tiếp và đảo ngược mã hóa cũng như mã hóa địa chỉ IP. Hơn thế nữa, nó kết nối với hơn 40 APIs worldwide. Nhờ cấu hình nâng cao, bạn sẽ có thể sử dụng các tham số và API khác nhau trong các điều kiện khác nhau. Các tính năng như bộ nhớ đệm chắc chắn sẽ nâng cao hiệu suất của app của bạn. geocoder tích hợp với ActiveRecord và Mongoid.

**12. VCR**

gem này cho phép bạn ghi lại các tương tác test suite's HTTP của bạn và phát lại chúng sau này, các lần chạy thử trong tương lai. Lợi nhuận, Kiểm tra nhanh, xác định, chính xác.

**13. ParallelTests**

Chức năng chính của ParallelTests là tách các thử nghiệm thành các nhóm chẵn và chạy từng nhóm trong một quy trình với cơ sở dữ liệu riêng.

**14. Capistrano**

một framework để xây dựng các kịch bản triển khai tự động. Mặc dù được viết bằng Ruby, capistrano có thể được sử dụng để triển khai các dự án thuộc bất kỳ ngôn ngữ hoặc framework nào: Rails, Java, hay PHP. Bạn đặt tên cho nó. Khi được cài đặt, gem này cung cấp cho bạn một công cụ “cap” để triển khai ngay từ command line.

**15. Bundler Audit**

"Patch-level verification for Bundler" - như người tạo ra nó mô tả.

**16. Shoulda Matchers**

shoulda-matchers cung cấp các lớp lót tương thích với RSpec và Minitest để kiểm tra chức năng Rails phổ biến. chạy các test này nếu không sẽ dài hơn, phức tạp hơn và dễ bị lỗi .

**17. Devise Masquerade**

Đây là một thư viện tiện ích cho phép chức năng đăng nhập như nút cho quản trị viên. Nếu bạn muốn kiểm tra ứng dụng nhiều người dùng của mình bằng cách sử dụng thông tin đăng nhập của người dùng hiện tại, mặc dù không yêu cầu họ nhập mật khẩu - tất cả những gì bạn phải làm là xác định đăng nhập như một nút với trình trợ giúp url và sử dụng nó.

**18. Sidekiq-Cron**

Để sắp xếp công việc vào những thời điểm được chỉ định, sidekiq-cron chạy một chuỗi cùng với tất cả task Sidekiq. Nó kiểm tra các công việc mới để lên lịch. Công việc chỉ được thêm khi có ít nhất một quy trình Sidekiq đang được chạy.

**19. Ancestry**

cho phép Ruby-on-Rails ActiveRecord model được tổ chức dưới dạng cấu trúc cây (hoặc phân cấp). Trong khi sử dụng mẫu đường dẫn cụ thể hóa, nó sử dụng một cột cơ sở dữ liệu. Tất cả các quan hệ cấu trúc cây tiêu chuẩn có thể được tìm nạp trong một truy vấn SQL.

link tham khảo: https://prograils.com/posts/top-19-ruby-gems-you-cant-miss-2018
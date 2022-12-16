**Smoke** và **Sanity** testing là những chủ đề bị hiểu lầm nhất trong Kiểm thử phần mềm. Có rất nhiều tài liệu về chủ đề này, nhưng hầu hết chúng đều khó hiểu. Bài viết sau đây sẽ phần nào giúp chúng ta giải quyết được sự nhầm lẫn này.

Sơ đồ dưới đây sẽ giúp bạn phần nào hiểu rõ hơn về sự khác biệt chính giữa Smoke test và Snaity test- 

![](https://images.viblo.asia/a3716cfa-d243-4f22-8a65-dca33ba5b1fc.PNG)

Để đánh giá sơ đồ trên, đầu tiên hiểu chúng ta hãy cùng tìm hiểu -

# Software Build là gì?
Nếu bạn đang phát triển một chương trình máy tính đơn giản chỉ bao gồm một tệp mã nguồn, bạn chỉ cần biên dịch và liên kết một tệp này, để tạo một tệp thi hành. Quá trình này rất đơn giản.
Thường thì đây không phải là trường hợp. Một dự án phần mềm điển hình bao gồm hàng trăm hoặc thậm chí hàng ngàn tệp mã nguồn. Tạo một chương trình thực thi từ các tệp nguồn này là một nhiệm vụ phức tạp và tốn thời gian.
Bạn cần sử dụng phần mềm "build" để tạo một chương trình thực thi và quá trình này được gọi là "Software Build"

# Smoke Testing là gì?
Smoke test là một loại Kiểm thử phần mềm được thực hiện sau khi xây dựng phần mềm để xác định rằng các chức năng quan trọng của chương trình đang hoạt động tốt. Nó được thực hiện "trước" bất kỳ kiểm tra chức năng hoặc hồi quy chi tiết nào được thực thi trên bản dựng phần mềm. Mục đích là để từ chối một ứng dụng bị hỏng nặng, vì vậy mà nhóm QA sẽ không mất nhiều thời gian cài đặt và thử nghiệm ứng dụng phần mềm.

Trong Smoke test, các trường hợp thử nghiệm được chọn bao gồm chức năng quan trọng nhất hoặc thành phần của hệ thống. Mục tiêu không phải là để thực hiện kiểm tra toàn diện, nhưng để xác minh rằng các chức năng quan trọng của hệ thống đang hoạt động tốt.
Ví dụ một Smoke test điển hình sẽ là - Xác minh rằng ứng dụng chạy thành công, Kiểm tra xem GUI có đáp ứng không... v.v.


# Sanity testing là gì?
Sanity testing là một loại Kiểm thử phần mềm được thực hiện sau khi nhận được một bản build phần mềm, với những thay đổi nhỏ về mã, hoặc chức năng, để xác định rằng các lỗi đã được sửa và không có vấn đề gì khác xảy ra do những thay đổi này. Mục đích là để xác định rằng chức năng được đề xuất hoạt động gần như mong đợi. Nếu kiểm tra sanity không thành công, bản build bị từ chối để tiết kiệm thời gian và chi phí liên quan đến một thử nghiệm nghiêm ngặt hơn.

Mục tiêu là "không" để xác minh triệt để chức năng mới, nhưng để xác định rằng nhà phát triển đã áp dụng một số tính hợp lý (sanity) trong khi sản xuất phần mềm. Ví dụ, nếu máy tính khoa học của bạn cho kết quả của 2 + 2 = 5! Sau đó, không có điểm kiểm tra các chức năng nâng cao như sin 30 + cos 50.

# Bảng so sánh Smoke Testing và Sanity Testing

![](https://images.viblo.asia/2c600c55-3175-42e6-b0bc-3eeacb37bb1c.PNG)


# Điểm cần lưu ý.
* Smoke và sanity tesing đều là những cách để tránh lãng phí thời gian và effort bằng cách nhanh chóng xác định xem ứng dụng đủ điều kiện cho các giai đoạn tiếp theo không.
* Sanity testing cũng được gọi là Acceptance testing.
* Smoke testing được thực hiện trên một bản build cụ thể còn được gọi là kiểm tra xác minh xây dựng.
* Một trong những thói quen tốt nhất là tiến hành build hàng ngày và smoke test trong các dự án phần mềm.
* Cả hai thử nghiệm smoke và sanity có thể được thực hiện bằng tay hoặc sử dụng một công cụ tự động hóa. Khi các công cụ tự động được sử dụng, các bài kiểm tra thường được khởi tạo bởi cùng một quá trình tạo bản thân bản dựng.
* Theo nhu cầu của thử nghiệm, bạn có thể phải thực hiện cả hai Sanity và Smoke Tests trên bản build phần mềm. Trong những trường hợp như vậy, trước tiên bạn sẽ thực hiện các thử nghiệm smoke và sau đó tiến hành kiểm tra Sanity. Trong ngành công nghiệp, các trường hợp sanity testing để kiểm tra tính thân thiện thường được kết hợp với smike testing, để tăng tốc độ thử nghiệm. Do đó, thông thường các thuật ngữ thường bị nhầm lẫn và được sử dụng thay thế cho nhau.

Nguồn: https://www.guru99.com/smoke-sanity-testing.html
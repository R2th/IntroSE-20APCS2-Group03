Như chúng ta đã biết, trong quá trình thực hiện sửa đổi hay thay đổi nào đó cho ứng dụng, thì có thể sẽ dẫn đến những sự cố không mong muốn. Cùng với những thay đổi mới, việc kiểm tra xem chức năng hiện có còn nguyên vẹn hay không là điều rất quan trọng. Điều này có thể đạt được bằng cách thực hiện kiểm tra hồi quy.

Mục đích của kiểm tra hồi quy là tìm ra các lỗi có thể vô tình phát sinh do những thay đổi hoặc sửa đổi mới. Trong quá trình kiểm tra xác nhận , lỗi đã được sửa và một phần của ứng dụng bắt đầu hoạt động như dự định. Nhưng có thể sẽ phát hiện ra một khiếm khuyết khác ở nơi khác trong phần mềm. Cách để phát hiện các ' tác dụng phụ không mong muốn ' này  là thực hiện kiểm tra hồi quy.

Thông thường kiểm tra hồi quy được thực hiện bởi các công cụ tự động hóa vì để khắc phục lỗi, kiểm tra tương tự được thực hiện lặp đi lặp lại và sẽ rất tẻ nhạt và tốn thời gian để thực hiện thủ công. Trong quá trình kiểm tra hồi quy, các trường hợp kiểm thử được ưu tiên tùy thuộc vào các thay đổi được thực hiện đối với tính năng hoặc mô-đun trong ứng dụng. 
 Kiểm tra hồi quy trở nên rất quan trọng khi có những sửa đổi hoặc cải tiến liên tục được thực hiện trong ứng dụng hoặc sản phẩm. Những thay đổi hoặc cải tiến này không nên đưa ra các vấn đề mới trong mã được thử nghiệm hiện có. Ngoài ra còn giúp duy trì chất lượng sản phẩm cùng với những thay đổi mới trong ứng dụng.

**Có 4 loại kỹ thuật kiểm tra hồi quy:**

- Kiểm tra lại tất cả các chiến lược:  Phương pháp này để để đảm bảo rằng tất cả các trường hợp thử nghiệm hiện tại trên chương trình được giám sát về tính toàn vẹn và chức năng. Hạn chế của phương pháp này là nó có thể rất tốn kém vì nó thường đòi hỏi một sự đầu tư rất lớn về thời gian và nguồn lực.
- Kiểm tra hồi quy khắc phục : Kiểm tra hồi quy khắc phục có thể được sử dụng khi không có thay đổi trong thông số kỹ thuật và các trường hợp kiểm thử có thể được sử dụng lại.
- Kiểm tra hồi quy kết hợp: Kiểm tra hồi quy kết hợp được sử dụng khi các sửa đổi được thực hiện trong các thông số kỹ thuật và các trường hợp kiểm thử mới được thiết kế.
- Chiến lược chọn lọc: Thay vì thực hiện lại, toàn bộ bộ kiểm thử, lựa chọn kiểm tra hồi quy cho phép người dùng chọn một phần cụ thể của bộ kiểm thử để chạy và do đó có khả năng bảo toàn tài nguyên cả về thời gian và tiền bạc.

**Ví dụ**

Giả sử rằng có một ứng dụng duy trì các chi tiết của tất cả các học sinh trong trường. Ứng dụng này có bốn nút Thêm, Lưu, Xóa và Làm mới. Tất cả các chức năng của nút đang làm việc như mong đợi.

Trong quá trình làm mới hệ thống, một nút mới 'Cập nhật' được thêm vào trong ứng dụng. Chức năng của nút 'Cập nhật' này đã được kiểm tra và xác nhận rằng nó hoạt động như mong đợi. Nhưng điều đó chưa khẳng định rằng chức năng của các nút khác hoạt động tốt. Vì thế cần phải xác minh việc thêm nút "Cập nhật"  nút mới này có ảnh hưởng đến chức năng của các nút hiện có khác.

Cùng với nút 'Cập nhật', tất cả các chức năng của các nút khác đều được kiểm tra để tìm bất kỳ sự cố mới nào trong mã hiện có. Quá trình này được gọi là thử nghiệm hồi quy.

**Một số công cụ kiểm tra hồi quy:**

**Selenium** : Đây là một trong những công cụ kiểm tra hồi quy tự động hàng đầu để kiểm tra ứng dụng web. Selenium WebDriver có thể được sử dụng để xây dựng các bộ kiểm tra và tự động hồi quy mạnh mẽ, dựa trên trình duyệt.

Tính năng chính:

- Selenium có hỗ trợ đa môi trường, hệ điều hành và trình duyệt.
- Nó tương thích với nhiều ngôn ngữ lập trình và các khung kiểm tra khác.
- Đây là một công cụ tuyệt vời để thực hiện kiểm tra hồi quy thường xuyên.Đây là một công cụ nguồn mở được sử dụng để tự động hóa các ứng dụng web. Selenium có thể được sử dụng để kiểm tra hồi quy dựa trên trình duyệt.

**IBM Rational Functional Tester**: IBM Rational Functional Tester là một công cụ kiểm tra hồi quy tự động. Nó hỗ trợ nhiều ứng dụng như ứng dụng dựa trên trình giả lập thiết bị đầu cuối, tài liệu Adobe PDF, Java, SAP, v.v.

Các tính năng chính:
- Hỗ trợ chỉnh sửa trực quan 
- Kiểm tra kịch bản
- Phát hiện dữ liệu trước đó
- Đồng hóa với phần mềm khác
- Công nghệ đảm bảo kịch bản cấp tiến.

**Silk Test** : là một công cụ kiểm tra tự động của Borland (Phần mềm Segue trước đây) để thực hiện kiểm tra chức năng và hồi quy. Nó dựa trên ngôn ngữ lập trình hướng đối tượng (OOP) tương tự như C ++ có các đối tượng, lớp và kế thừa.

Các tính năng chính:
- Hỗ trợ kiểm tra chuyển đổi tập lệnh từ văn bản sang các lệnh GUI.
- Thực hiện kiểm tra hồi quy trên tất cả các máy và nút.
- Sử dụng bản ghi và phát lại và quy trình lập trình mô tả.




Nguồn: http://tryqa.com/what-is-regression-testing-in-software/
https://www.testbytes.net/blog/regression-testing-tools-in-2019/
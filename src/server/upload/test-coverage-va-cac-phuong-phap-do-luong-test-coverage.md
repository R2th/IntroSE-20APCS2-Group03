# 1. Test coverage là gì?
![](https://images.viblo.asia/5cfe1255-34e7-42ad-baa9-378fad409a7b.jpg)

Trong thử nghiệm có phân chia hai khái niệm là thử nghiệm hộp đen và kiểm tra hộp trắng. Kiểm tra hộp đen là thực hiện quá trình kiểm tra khi không biết mã nguồn của chương trình như thế nào. Còn khi đã có mã nguồn của chương trình, chúng tôi có thể thực hiện việc kiểm tra hộp trắng, nghĩa là thực hiện kiểm tra với các mã hàng, một chức năng, từng gói tin của chương trình.

Khi thực hiện kiểm tra bằng thử nghiệm hộp trắng, chúng ta phải có một bộ kiểm tra cho chương trình. Tuy nhiên làm sao để chắc chắn rằng chúng ta đã hoàn thành bản kiểm tra cho tất cả các trường hợp chưa? When this ta will apply the Tesing of the coverage for measurement of the result of program when executable the execution.

Kiểm tra độ bao phủ có thể hiểu là tỷ lệ kiểm tra (tính theo%) đã được thực hiện trên trường hợp thử nghiệm tổng hợp cần thiết cho ứng dụng. Nếu tỉ lệ này càng cao, ứng dụng càng kiểm tra kỹ thuật. Mặc dù việc đảm bảo ứng dụng có chế độ kiểm tra là 100% trong một trường hợp là bất khả thi, tuy nhiên bạn vẫn phải cố gắng để đạt được kết quả gần với con số nhất.
![](https://images.viblo.asia/de06277c-f779-4381-b944-ed36fc44e6fc.jpg)
# 2. Test coverage có liên quan gì tới test?
Khi tính toán phạm vi kiểm tra con số, điều có thể tính là:
- Mức độ test case đã được thực hiện trên chức năng/hệ thống.
- Các phần còn lại chưa được test trên chức năng/hệ thống.
- Với khả năng phát hiện và khả năng kiểm tra độ lớn của chúng, chúng ta tin rằng chúng ta có trong hệ thống thuộc tính tại bất kỳ thời điểm nào.
- Số lượng bài kiểm tra tối thiểu phải được kiểm tra ở một mức độ nhất định để đảm bảo hệ thống chất lượng.

# 3. Các phương pháp đo lường test coverage
1. Kiểm tra tính năng theo tính năng. Theo spec, hệ thống có n chức năng, cộng với khởi động và tắt máy. Chúng ta nên có một bộ test case cho mọi tính năng cộng với khởi động và tắt máy không?
2. Kiểm tra bảo hiểm theo GUI. Giao diện người dùng có một số màn hình, các nút, các thanh kéo xuống, các tab, các menu, vv . Có nên liệt kê tất cả chúng hay chỉ cần thực hiện một?
3. Kiểm tra phạm vi bằng công cụ. Sử dụng một công cụ hoặc xây dựng một công cụ thích hợp và sau đó kiểm tra trên bộ test case đã được chuẩn. Công cụ nên đầu tiên có thể biết được mức độ bao phủ trong mã và trong hệ thống (tất nhiên, nó không cần thiết cho mọi trường hợp.)


4. Kiểm tra phạm vi theo cấu trúc. Khi thực hiện kiểm tra đơn vị, bạn cần chắc chắn rằng bạn đã thực hiện kiểm tra trên một đơn vị mã. Testing bao gồm Statement coverage, Decision (branch) coverage, Condition coverage, All-DU-paths coverage, Linear Code Sequence vàJump (LCSAJ)
5. Kiểm tra theo kịch bản. Người dùng có một mục tiêu mà họ muốn đạt được. Họ đã đạt được chúng bằng cách sử dụng một số tính năng. Bằng cách đó, họ thiết lập các tương tác giữa các tính năng. Sử dụng người dùng đăng nhập (nếu cần).
7. Kiểm tra phạm vi bảo hiểm theo quá trình chuyển đổi. Thông thường trên web ứng dụng, mà trong các ứng dụng thông thường, có một số "đường dẫn" mà người dùng có thể thực hiện để đạt được mục tiêu. Các đường dẫn này cần được xác định có thể dưới dạng trạng thái tài liệu (thông thường là từ URL đến URL trong trang web kiểm tra hợp lệ) cho số lượng đường đi tối thiểu có thể xác định và đi qua.
8. Kiểm tra phạm vi theo các tập lệnh web, trang web, ứng dụng và thành phần. Sau khi xác định trang web mức độ rủi ro của trang, bạn có thể xác định mức phủ sóng cần thiết để kiểm tra rủi ro bằng cách chọn các loại kiểm tra.
# 4. Lợi ích của Test coverage
- Đảm bảo chất lượng của thử nghiệm
- Giúp xác định các mã phần nào sẽ gây ra ảnh hưởng đến việc phát hành
- Giúp xác định các đường dẫn trong ứng dụng của bạn mà không được kiểm tra
 - Ngăn chặn rò rỉ lỗi
 - Thời gian, phạm vi và chi phí có thể được kiểm tra
  - Phòng chống khuyết tật ở giai đoạn đầu của dự án giai đoạn
  - Có thể xác định tất cả các định hướng và đường dẫn được sử dụng trong ứng dụng, cho phép bạn tăng phạm vi phủ sóng
- Khoảng trống trong yêu cầu, trường hợp thử nghiệm và lỗi ở đơn vị mức có thể được tìm thấy trong một cách dễ dàng

Nguồn:

http://blog.qatestlab.com/2011/03/31/7-ways-to-measure-test-coverage/

https://www.guru99.com/test-coverage-in-software-testing.html
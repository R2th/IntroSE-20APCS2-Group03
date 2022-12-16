Viết test report là một phần của kiểm thử. Kiểm thử là một phần vô cùng quan trọng trong vòng đời phát triển phần mềm, là 'Quality gate' cho ứng dụng và phần mềm muốn được "Go live" thì cần phải thông qua và được chứng nhận bởi nhóm kiểm thử. 
Test summary report là một phần quan trọng được chuẩn bị ở cuối dự án, hay đúng hơn là sau khi hoàn thành kiểm thử. Mục tiêu chính của tài liệu này là giải thích các chi tiết và hoạt động khác nhau về  kiểm thử được thực hiện cho Dự án, cho các bên liên quan tương ứng như Quản lý cấp cao, Khách hàng, v.v.

Kết quả của Daily report sẽ được chia sẻ với các bên liên quan mỗi ngày, nhưng test summary report cung cấp một bản báo cáo tổng hợp về kiểm thử trong một khoảng thời gian của dự án. 

Giả sử rằng khách hàng ngồi ở vị trí xa cần hiểu kết quả và trạng thái của dự án trong một khoảng thời gian nào đó: ví dụ  4 tháng thì Test summary report sẽ giải quyết vấn đề này. 

Đây cũng là một sản phẩm cần thiết, là một phần của quy trình CMMI 

# Test summary report bao gồm những gì? 

Một mẫu Test summary report sẽ có những thông tin cơ bản như: số testcases trong kế hoạch, số testcases đã được test, số TCs pass, số TC fail ... Tuy nhiên dựa trên mỗi định dạng và thực tế ở mỗi công ty, nội dung có thể khác nhau. 

Sau đây là 12 bước hướng dẫn viết Test summary report hiệu quả: 

## Bước # 1: Mục đích của tài liệu

**<Mô tả ngắn về mục tiêu chuẩn bị tài liệu>**

Ví dụ: Tài liệu này giải thích các hoạt động khác nhau được thực hiện như là một phần của kiểm thử" Ứng dụng hệ thống vận chuyển ABCD"

## Bước # 2: Tổng quan về ứng dụng

**<Mô tả ngắn gọn về ứng dụng được thử nghiệm>**

Ví dụ: Hệ thống giao thông ABCD là một ứng dụng đặt vé xe buýt dựa trên web. Vé cho các xe buýt khác nhau có thể được đặt bằng cách sử dụng các phương tiện trực tuyến. Thông tin hành khách theo thời gian thực được nhận từ system, Hệ thống kho lưu trữ trung tâm, sẽ được giới thiệu trước khi đặt chỗ được xác nhận. Có một số chức năng  như Đăng ký, Đặt chỗ, Thanh toán và Báo cáo được tích hợp để hoàn thành mục đích.

## Bước # 3: Phạm vi kiểm thử

Trong phạm vi

Ngoài phạm vi

Các mục không cần kiểm thử

**<Phần này giải thích về các chức năng / mô-đun trong phạm vi & ngoài phạm vi kiểm thử ; Bất kỳ mục nào không được kiểm tra do bất kỳ ràng buộc / phụ thuộc / hạn chế>**

Ví dụ: Không thể kiểm tra xác minh chức năng cần kết nối với ứng dụng của bên thứ ba, vì không thể thiết lập kết nối do một số hạn chế kỹ thuật. Phần này phải được ghi lại rõ ràng, phần khác sẽ được giả định rằng kiểm thử bao trùm (coverage) tất cả các lĩnh vực của ứng dụng.

**a) Trong phạm vi**

Kiểm tra chức năng cho các mô-đun sau nằm trong Phạm vi kiểm tra

Đăng ký

Đặt trước

Thanh toán

**b) Ngoài phạm vi**

Performance Testing đã không được hoàn thành trong ứng dụng này

**c) Các mục không được kiểm thử**

Xác minh kết nối với hệ thống bên thứ ba "Hệ thống kho lưu trữ trung tâm "không được kiểm tra, vì kết nối không thể được thiết lập do một số hạn chế kỹ thuật. Điều này có thể được xác minh trong UAT (Kiểm tra chấp nhận người dùng) nơi kết nối có sẵn hoặc có thể được thiết lập.

## Bước # 4: Metrics

**<Metrics sẽ giúp hiểu kết quả thực hiện test, trạng thái của testcases và bugs, v.v. Các metrics cần thiết có thể được thêm vào khi cần thiết. 
Ví dụ: Tổng hợp bug (Defect summary), Biểu đồ / Đồ thị có thể được đính kèm để thể hiện hình ảnh tốt hơn...>**

a) Số test cases được lên kế hoạch so với số testcases được thực hiện

b) Số Test cases passed/ failed 

![](https://images.viblo.asia/e9c915d3-b357-4570-9a10-31d45701cdc1.jpg)

![](https://images.viblo.asia/2e91dde1-4273-42b1-8cba-90313dac886c.jpg)

c) Số Bugs tìm được và Tình trạng & Mức độ nghiêm trọng của chúng

![](https://images.viblo.asia/e9ce49ca-e273-4b7f-b631-0cb44eda34e3.jpg)

![](https://images.viblo.asia/10a51cfc-4dae-4767-a3f2-1002b495829a.jpg)


d) Sự phân phối bugs

![](https://images.viblo.asia/c2add08e-33a1-4718-8ddd-f724527f460b.jpg)

![](https://images.viblo.asia/f50e979b-25bb-42f7-a88f-992e4b05932b.jpg)

## Bước # 5: Các loại thử nghiệm được thực hiện

1. Smoke Testing
2. System Integration Testing ( Kiểm thử tích hợp hệ thống) 
3. Regression Testing ( Kiểm thử hồi quy) 

**<Mô tả các loại kiểm thử khác nhau được thực hiện cho Dự án. Điều này sẽ đảm bảo ứng dụng đang được kiểm tra đúng cách thông qua các loại kiểm thử  được thống nhất theo Chiến lược kiểm thử (Test strategy).>**


Lưu ý: Nếu nhiều vòng kiểm thử đã được thực hiện, các chi tiết cũng có thể được đưa vào đây.

Thí dụ:

a) Smoke testing

Thử nghiệm này được thực hiện bất cứ khi nào bản Build được nhận (triển khai vào môi trường Test) để Kiểm tra để đảm bảo chức năng chính hoạt động tốt, bản Build có thể được chấp nhận và kiểm thửcó thể bắt đầu.

b) Kiểm thử tích hợp hệ thống

Đây là kiểm thử được thực hiện trên Ứng dụng đang được thử nghiệm, để xác minh toàn bộ ứng dụng hoạt động theo yêu cầu.
Các kịch bản nghiệp vụ quan trọng đã được thử nghiệm để đảm bảo chức năng quan trọng trong ứng dụng hoạt động như dự định mà không có bất kỳ lỗi nào.

c) Kiểm thử hồi quy

Kiểm thử hồi quy được thực hiện mỗi khi bản build mới được triển khai để kiểm tra có sửa lỗi và cải tiến mới, nếu có.
Kiểm thử hồi quy đang được thực hiện trên toàn bộ ứng dụng chứ không chỉ là các chức năng mới và sửa lỗi.
Kiểm thử này đảm bảo rằng chức năng hiện có hoạt động tốt sau khi sửa lỗi và các cải tiến mới được thêm vào ứng dụng hiện có.
Các testcases cho chức năng mới được thêm vào các testcases hiện có và được thực thi.

## Bước # 6: Kiểm tra môi trường test ( Test Environment) & công cụ

**<Cung cấp chi tiết về Môi trường test: Server, cơ sở dữ liệu, URL ứng dụng, v.v ... Cung cấp thông tin về công cụ log bug>**

![](https://images.viblo.asia/a5423ec1-86a0-424c-839e-ffa95ff1261f.jpg)

## Bước # 7: Bài học kinh nghiệm

**<Phần này được sử dụng để mô tả các vấn đề quan trọng phải đối mặt và các giải pháp của họ (cách chúng được giải quyết trong quá trình kiểm thử). Bài học kinh nghiệm sẽ giúp đưa ra quyết định chủ động trong lần tham gia kiểm thử tiếp theo, bằng cách tránh những sai lầm này hoặc tìm cách giải quyết phù hợp>**

Ví dụ: 

![](https://images.viblo.asia/0c1bbaab-7215-4267-88f1-72dc1e740599.jpg)

## Bước # 8: Khuyến nghị

**<Bất kỳ cách giải quyết hoặc đề xuất nào có thể được đề cập ở đây>**

Thí dụ:

Quyền admin đối với công cụ quản lý lỗi có thể được trao cho Test manager  để cung cấp quyền truy cập cho testing team. 

## Bước # 9: Cách làm tốt nhất

**<Sẽ có rất nhiều hoạt động được thực hiện bởi nhóm kiểm thử trong dự án. Một số trong số chúng có thể đã tiết kiệm thời gian, một số được chứng minh là một cách tốt và hiệu quả để làm việc, v.v. Những thứ này có thể được ghi lại dưới dạng ‘Giá trị Thêm, để hiển thị trình bày cho các bên liên quan>**

Thí dụ:

* Một nhiệm vụ lặp đi lặp lại được thực hiện thủ công mỗi lần là tốn thời gian. Nhiệm vụ này được tự động hóa bằng cách tạo tập lệnh và chạy mỗi lần, giúp tiết kiệm thời gian và tài nguyên.
* Smoke testcases được tự động hóa và các scripts đã được chạy, chạy nhanh và tiết kiệm thời gian.
* Các kịch bản tự động hóa đã được chuẩn bị để tạo ra các khách hàng mới, trong đó rất nhiều bản ghi cần được tạo để kiểm thử.
* Các kịch bản quan trọng trong nghiệp vụ được kiểm tra riêng trên toàn bộ ứng dụng rất quan trọng để chứng nhận rằng chúng hoạt động tốt.

## Bước # 10: Exit criteria

**<Exit criteria định nghĩa là Hoàn thành kiểm thử bằng cách đáp ứng một số điều kiện nhất định>**

Như:

(i) Tất cả các test cases theo kế hoạch được thực hiện;

(iI) Tất cả các lỗi nghiêm trọng đã bị đóng, v.v


Thí dụ:

a) Tất cả các testcases nên được thực hiện - Có

b) Tất cả các Bug cực kì nghiêm trọng, nghiêm trọng, trung bình cần được xác minh và đóng - Có.

c) Bất kỳ các bug nhỏ, độ ưu tiên thấp  đều có kế hoạch thực hiện và được chuẩn bị với ngày đóng cửa dự kiến.


## Bước # 11: Kết luận 

**<Phần này sẽ đề cập đến việc testing team có đồng ý hay không và đưa ra tín hiệu Xanh cho ứng dụng "Go live" hay không, sau khi Exit criteria được đáp ứng. Nếu ứng dụng không đáp ứng exit criteria, thì có thể không được "Go live". Nó sẽ được để lại với quyết định của Quản lý cấp cao và Khách hàng và các Bên liên quan khác >**

Ví dụ: Vì Exit criteria được đáp ứng và thỏa mãn như được đề cập trong Phần 10, ứng dụng này được đề xuất để "Go live" bởi Testing team. Kiểm thử chấp nhận nên được thực hiện sau khi "Go live"

## Bước # 12: Định nghĩa, từ viết tắt 

**<Phần này đề cập đến ý nghĩa của các thuật ngữ viết tắt được sử dụng trong tài liệu này và bất kỳ định nghĩa mới nào khác>**

# Một số điểm cần lưu ý trong khi chuẩn bị Test Summary Report:

* Thu thập tất cả thông tin bắt buộc về kiểm thử được thực hiện. Điều này sẽ giúp chuẩn bị một Test summary report tốt.
* Bài học kinh nghiệm có thể được giải thích chi tiết, điều này sẽ truyền đạt Trách nhiệm được thực hiện để giải quyết các vấn đề này. Ngoài ra đây sẽ là một tài liệu tham khảo cho các dự án sắp tới để tránh những điều này.
* Tương tự như vậy, việc đề cập đến các "Cách làm tốt nhất" sẽ mô tả những nỗ lực mà nhóm đã thực hiện ngoài việc kiểm thử thông thường, cũng sẽ được coi là một Giá trị Bổ sung.
* Đề cập đến các số liệu ở dạng đồ họa (Biểu đồ, đồ thị) sẽ là một cách tốt để thể hiện trực quan trạng thái & dữ liệu.
* Hãy nhớ rằng, test summary report sẽ đề cập và giải thích các hoạt động được thực hiện như một phần của kiểm thử, để người nhận hiểu rõ hơn.
* Một số phần thích hợp hơn có thể được thêm vào nếu cần.

# Phần kết luận:

Test summary report là một tài liệu quan trọng quan trọng và cần tập trung để chuẩn bị một tài liệu hiệu quả, vì tài liệu này sẽ được chia sẻ với nhiều bên liên quan khác nhau như quản lý cấp cao, khách hàng, v.v.

Sau khi thực hiện kiểm tra toàn diện, công bố kết quả kiểm tra, số liệu, cách làm tốt nhất, bài học kinh nghiệm, kết luận về ‘Go Live, v.v ... là cực kỳ quan trọng để đưa ra làm bằng chứng cho kiểm thử được thực hiện và kết luận kiểm thử.


Bài viết được dịch lại từ nguồn: https://www.softwaretestinghelp.com/test-summary-report-template-download-sample/
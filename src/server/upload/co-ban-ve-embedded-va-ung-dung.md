# Automotive & Testing

### Cơ bản về Embedded và ứng dụng
![](https://images.viblo.asia/7435e638-cc49-4cee-95bf-ea7a6a5fa4af.png)

**1. Embedded system là gì?**

Hệ thống nhúng là một loại hệ thống máy tính được thiết kế để thực hiện một số tác vụ như truy cập, xử lý, lưu trữ và kiểm soát dữ liệu trong các hệ thống thiết bị điện tử khác nhau.

Các hệ thống nhúng là sự kết hợp giữa phần cứng và phần mềm, và ở đây phần mềm được nhúng vào phần cứng.

Một trong những đặc điểm quan trọng nhất của các hệ thống này là nó cung cấp input/output trong một khoảng thời gian giới hạn.

Sự hỗ trợ của các hệ thống nhúng giúp cho cho công việc trở nên hoàn thiện và thuận tiện hơn. Vì thế, các hệ thống nhúng thường được tích hợp trong rất nhiều trong cả các thiết bị đơn giản hay phức tạp.

Hệ thống nhúng được ứng dụng rất nhiều trong cuộc sống của chúng ta, các ứng dụng trên các thiết bị sử dụng hàng ngày mà bạn có thể thấy như lò vi sóng, máy tính, điều khiển từ xa TV, máy giặt, các hệ thống tích hợp trên ô tô…
![](https://images.viblo.asia/451fa63b-cf84-4f00-ba57-82a3c30caad6.png)

**2. Embedded hardware**

Hệ thống nhúng sử dụng nền tảng phần cứng để thực thi các hoạt động. Phần cứng của hệ thống nhúng được lắp ráp cùng với bộ vi xử lý / vi điều khiển. Hệ thống phần cứng này bao gồm các yếu tố như giao diện cho các dữ liệu đầu vào / đầu ra, bộ nhớ, giao diện người dùng và bộ hiển thị dữ liệu. Về cơ bản, một hệ thống nhúng thường bao gồm:

– Bộ cung cấp năng lượng

– Bộ nhớ

– Bộ xử lý

– Timers

– Đầu ra/Bảng mạch đầu ra

– Cổng giao tiếp nối tiếp

– SASC (System application specific circuits

– Các mạch ứng dụng cho một hệ thống cụ thể nào đó)

**3. Embedded software**

Phần mềm được viết cho hệ thống nhúng được gọi là phần mềm nhúng (Embedded software) hay còn gọi là firmware.

Phần mềm nhúng là một chương trình được viết, biên dịch trên máy tính và nạp vào một hệ thống khác bao gồm một hoặc nhiều bộ vi xử lý đã được cài sẵn một hệ điều hành, bộ nhớ ghi chép được, các cổng giao tiếp với các phần cứng khác. Phần mềm nhúng là phần mềm tạo nên phần hồn, phần trí tuệ của các sản phẩm nhúng. Phần mềm nhúng ngày càng có tỷ lệ giá trị cao trong giá trị của các sản phẩm nhúng.

Ví dụ trực quan nhất đó là máy giặt được điều khiển bởi embedded software, hệ thống có thể đo lượng quần áo và chọn chu trình phù hợp để giặt đồ. Với tủ lạnh, hệ thống nhúng cung cấp cho phép chúng ta có thể lựa chọn các chế độ bảo quản phù hợp….

**4. Đặc điểm của Embedded system**

Hệ thống nhúng được thiết kế để thực hiện một chức năng chuyên biệt nào đó. Đây là điểm khác biệt so với các hệ thống máy tính khác như máy tính cá nhân hoặc các siêu máy tính có thể thực hiện nhiều chức năng khác nhau với những phép tính phức tạp. Chuyên dụng giúp nâng cao tính dễ sử dụng và tiết kiệm tài nguyên.

Tất cả các hệ thống máy tính đều có những hạn chế về các số liệu thiết kế, tài nguyên. Số liệu thiết kế là thước đo để đánh giá việc xây dựng các tính năng như độ lớn, công suất, chi phí và cả hiệu năng hoạt động của hệ thống.

Hệ thống phải hoạt động nhanh ở mức độ chấp nhận được nào đó đồng thời vẫn phải đảm bảo tiêu thụ ít năng lượng hơn để tăng tuổi thọ của pin.

Một số hệ thống nhúng phải tương tác liên tục với những thay đổi trong hệ thống và tính toán các kết quả cụ thể trong thời gian thực với độ trễ cực thấp hoặc hầu như không có. Ví dụ, trong một bộ theo dõi hành trình trên ô tô, hệ thống phải liên tục hiển thị và có phản hồi tương ứng với tốc độ thực tế hiện tại và bộ cảm biến phanh của. Đồng thời, cũng phải tính toán gia tốc/giảm tốc thường xuyên trong một thời gian giới hạn, chỉ với một phép tính chậm trễ có thể ảnh hưởng rất nhiều đến việc điều khiển xe.

Hệ thống nhúng phải được dựa vào một vi điều khiển hoặc trên bộ vi xử lý.

Hệ thống nhúng phải yêu cầu một bộ nhớ, phần mềm nhúng thường đưa trực tiếp vào ROM. Hệ thống phần mềm nhúng không bắt buộc sử dụng bộ nhớ thứ cấp trên PC.

Hệ thống nhúng phải được kết nối với các thiết bị ngoại vi để kết hợp các thiết bị đầu vào và đầu ra.

Hệ thống nhúng được tích hợp sẵn với phần cứng để đảm bảo được tính bảo mật và hiệu suất. Phần mềm nhúng đáp ứng được nhu cầu sử dụng với độ linh hoạt hơn

**5. Các ứng dụng Embeded system**

Các ứng dụng cơ bản của hệ thống nhúng mà ta có thể dễ dàng thấy được như trong các thẻ thông minh, mạng máy tính, vệ tinh, viễn thông, thiết bị điện tử tiêu dùng kỹ thuật số, tên lửa, v.v.
![](https://images.viblo.asia/f80ae1ab-4507-4151-9445-a6c3db44a91a.jpg)
Hệ thống nhúng được ứng dụng trong ngành công nghiệp ô tô như điều khiển động cơ, kiểm soát,theo dõi hành trình, việc bảo an toàn cho thân xe, sự an toàn cho động cơ, điều khiển robot trong các chuyền lắp ráp, trình đa phương tiện trên ô tô, hệ thống giải trí trên ô tô, truy cập E-com, kết nối với điện thoại di động, v.v …

Các hệ thống nhúng trong viễn thông thuộc các mạng lưới viễn thông, ứng dụng điện toán di động và hệ thống truyền thông không dây, v.v.

Các hệ thống nhúng ứng dụng trong thẻ thông minh thuộc các hệ thống ngân hàng, hệ thống ứng dụng điện thoại di động và bảo mật.

Hệ thống nhúng ứng dụng trong vệ tinh và tên lửa thuộc các đơn vị quốc phòng, truyền thông và hàng không vũ trụ.

Các hệ thống nhúng trong hệ thống mạng và các thiết bị ngoại vi máy tính nằm trong các ứng dụng xử lý hình ảnh, hệ thống mạng lưới, các máy in, các thẻ mạng, màn hình và các vật hiển thị.

Các hệ thống nhúng ứng dụng trong các thiết bị điện tử tiêu dùng kỹ thuật số có thể thấy được như đầu DVD, các loại tivi với độ phân giải cao và máy ảnh kỹ thuật.

-------
Tài liệu tham khảo

https://en.wikipedia.org/wiki/Embedded_system

https://en.wikipedia.org/wiki/Embedded_software

https://itviec.com/blog/5-ly-do-ban-nen-chon-embedded-software/

https://www.elprocus.com/basics-of-embedded-system-and-applications/
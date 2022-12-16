### Docker được coi là một "Người thay đổi cuộc chơi". Nhưng nó không phải là giải pháp phù hợp với mọi kích thước.
Có rất nhiều điều tốt về Docker. Nó đóng gói, vận chuyển và chạy các ứng dụng như một công cụ container nhẹ, di động và tự cung cấp. Docker rất tuyệt vời cho các doanh nghiệp thuộc mọi quy mô. Khi bạn đang làm việc với một đoạn code trong một nhóm nhỏ, nó sẽ loại bỏ các vấn đề nhưng nó hoạt động với vấn đề máy của tôi. Trong khi đó, các doanh nghiệp có thể sử dụng Docker để xây dựng các đường ống phân phối phần mềm Agile để vận chuyển các tính năng mới nhanh hơn và an toàn hơn.

Với hệ thống container tích hợp, Docker là một công cụ tuyệt vời cho điện toán đám mây. Đổi lại, Docker Swarm thúc đẩy phân cụm và thiết kế phi tập trung. Nghe có vẻ quá tốt phải không? Vâng, vẫn còn một số trường hợp khi không sử dụng Docker. Dưới đây là 7 trường hợp đó.

![](https://images.viblo.asia/a907423e-a310-43e3-ab26-e9c66df0e8c8.png)


# 1. Không sử dụng Docker nếu bạn cần tăng tốc
Docker container nhỏ hơn và yêu cầu ít tài nguyên hơn máy ảo với máy chủ và cơ sở dữ liệu. Đồng thời, Docker sẽ sử dụng nhiều tài nguyên hệ thống như bộ lập lịch kernel của máy chủ sẽ cho phép. Bạn không nên mong đợi Docker tăng tốc ứng dụng theo bất kỳ cách nào.

Hơn thế nữa, Docker thậm chí có thể làm cho nó chậm hơn. Nếu bạn đang làm việc với nó, bạn nên đặt giới hạn về dung lượng bộ nhớ, CPU hoặc chặn IO mà bộ chứa có thể sử dụng. Mặt khác, nếu kernel phát hiện bộ nhớ của máy chủ đang chạy quá thấp để thực hiện các chức năng hệ thống quan trọng, nó có thể bắt đầu giết chết các quy trình quan trọng. Nếu quá trình sai bị giết (bao gồm cả Docker), hệ thống sẽ không ổn định.

Thật không may, các điều chỉnh bộ nhớ của Docker - ưu tiên hết bộ nhớ trên Docker daemon - không giải quyết được vấn đề này. Ngược lại, một lớp bổ sung giữa một ứng dụng và hệ điều hành cũng có thể dẫn đến việc giảm tốc độ. Tuy nhiên, mức giảm này sẽ không đáng kể. Docker container không được cách ly hoàn toàn và không chứa một hệ điều hành hoàn chỉnh như bất kỳ máy ảo nào.

# 2. Không sử dụng Docker nếu bạn ưu tiên bảo mật
Ưu điểm bảo mật lớn nhất của Docker là nó chia ứng dụng thành các phần nhỏ hơn. Nếu bảo mật của một phần bị xâm phạm, phần còn lại sẽ không bị ảnh hưởng.

Tuy nhiên, trong khi các quy trình riêng biệt trong các container hứa hẹn cải thiện bảo mật, tất cả các container đều chia sẻ quyền truy cập vào một hệ điều hành máy chủ duy nhất. Bạn có nguy cơ chạy các container Docker với sự cô lập không đầy đủ. Bất kỳ mã độc hại có thể có quyền truy cập vào bộ nhớ máy tính của bạn.

Có một thực tế phổ biến để chạy rất nhiều container trong một môi trường duy nhất. Đây là cách bạn làm cho ứng dụng của mình bị tấn công theo kiểu tấn công Tài nguyên lạm dụng trừ khi bạn giới hạn khả năng của bộ chứa tài nguyên. Để có hiệu quả và cách ly tối đa, mỗi container nên giải quyết một lĩnh vực quan tâm cụ thể.

Một vấn đề khác là cấu hình mặc định của Docker - người dùng không được đặt tên. Không gian tên cho phép tài nguyên phần mềm chỉ sử dụng các tài nguyên khác nếu chúng thuộc về một không gian tên cụ thể.

Chạy các ứng dụng với Docker ngụ ý chạy daemon Docker với quyền root. Bất kỳ quy trình nào thoát ra khỏi Docker container sẽ có cùng đặc quyền trên máy chủ như đã thực hiện trong vùng chứa. Chạy các quy trình của bạn bên trong các thùng chứa như một người dùng không có đặc quyền có thể đảm bảo an ninh. Nó phụ thuộc vào khả năng bạn thêm hoặc loại bỏ. Để giảm thiểu rủi ro khi đột nhập container Docker, bạn không nên tải xuống các container sẵn sàng sử dụng từ các nguồn không đáng tin cậy.

# 3. Không sử dụng Docker nếu bạn phát triển ứng dụng GUI trên máy tính để bàn
Docker không phù hợp với các ứng dụng yêu cầu giao diện người dùng phong phú. Docker chủ yếu dành cho các container bị cô lập với các ứng dụng dựa trên bảng điều khiển. Các ứng dụng dựa trên GUI không phải là ưu tiên, hỗ trợ của chúng sẽ dựa vào trường hợp và ứng dụng cụ thể. Các bộ chứa Windows dựa trên Nano hoặc Core Server - nó không cho phép người dùng khởi động giao diện dựa trên GUI hoặc máy chủ RDP của Docker trong bộ chứa Docker.

Tuy nhiên, bạn vẫn có thể chạy các ứng dụng dựa trên GUI được phát triển với Python và khung QT trong bộ chứa Linux. Ngoài ra, bạn có thể sử dụng chuyển tiếp X11, nhưng giải pháp này hơi khó xử.

# 4. Không sử dụng Docker nếu bạn muốn làm sáng tỏ sự phát triển và gỡ lỗi
Docker được tạo ra bởi các nhà phát triển và cho các nhà phát triển. Nó cung cấp sự ổn định môi trường: một container trên máy phát triển sẽ hoạt động chính xác như nhau trên dàn, sản xuất hoặc bất kỳ môi trường nào khác. Điều này giúp loại bỏ vấn đề của phiên bản chương trình khác nhau trong các môi trường khác nhau.

Với sự giúp đỡ của Docker, bạn có thể dễ dàng thêm một phụ thuộc mới vào ứng dụng của mình. Không có nhà phát triển nào trong nhóm của bạn sẽ cần lặp lại thao tác này trên máy của họ. Tất cả mọi thứ sẽ được lên và chạy trong container và phân phối cho toàn đội.

Đồng thời, bạn phải thực hiện một số thiết lập bổ sung để mã hóa ứng dụng của mình trong Docker. Hơn nữa, với gỡ lỗi Docker, bạn phải cấu hình đầu ra nhật ký và thiết lập các cổng gỡ lỗi. Bạn cũng có thể cần ánh xạ các cổng cho các ứng dụng và dịch vụ của mình trong các thùng chứa. Vì vậy, nếu bạn có một quy trình triển khai phức tạp và tẻ nhạt, Docker sẽ giúp bạn rất nhiều. Nếu bạn có một ứng dụng đơn giản, nó chỉ cần thêm sự phức tạp không cần thiết.

# 5. Không sử dụng Docker nếu bạn cần sử dụng các hệ điều hành hoặc nhân khác nhau
Với các máy ảo, trình ảo hóa có thể trừu tượng hóa toàn bộ thiết bị. Bạn có thể sử dụng Microsoft Azure để chạy cả hai phiên bản Windows Server và Linux Server cùng một lúc. Hình ảnh Docker, tuy nhiên, yêu cầu cùng một hệ điều hành mà nó được tạo ra.

Có một cơ sở dữ liệu lớn về hình ảnh container Docker - Docker Hub. Tuy nhiên, nếu một hình ảnh được tạo trên Linux Ubuntu, nó sẽ chỉ chạy trên cùng một Ubuntu.

Nếu một ứng dụng được phát triển trên Windows, nhưng việc sản xuất chạy trên Linux, bạn sẽ không thể sử dụng Docker một cách hiệu quả. Đôi khi, việc thiết lập máy chủ sẽ dễ dàng hơn nếu bạn có một vài ứng dụng tĩnh.

# 6. Không sử dụng Docker nếu bạn có nhiều dữ liệu có giá trị để lưu trữ
Theo thiết kế, tất cả các tệp Docker được tạo bên trong một thùng chứa và được lưu trữ trên một lớp chứa có thể ghi. Có thể khó lấy dữ liệu ra khỏi container nếu một quy trình khác cần. Ngoài ra, lớp có thể ghi của một container được kết nối với máy chủ mà container đang chạy. Nếu bạn cần di chuyển dữ liệu đi nơi khác, bạn không thể làm điều đó một cách dễ dàng. Hơn thế nữa, tất cả dữ liệu được lưu trữ bên trong một container sẽ bị mất mãi mãi sau khi container bị tắt.

Bạn phải nghĩ cách lưu dữ liệu của bạn ở một nơi khác trước. Để giữ an toàn cho dữ liệu trong Docker, bạn cần sử dụng một công cụ bổ sung - Docker Data Volume. Tuy nhiên, giải pháp này vẫn còn khá vụng về và cần được cải thiện.

# 7. Không sử dụng Docker nếu bạn đang tìm kiếm công nghệ dễ nhất để quản lý
Được giới thiệu vào năm 2012, Docker vẫn là một công nghệ mới. Là nhà phát triển, bạn có thể phải cập nhật các phiên bản Docker thường xuyên. Thật không may, khả năng tương thích ngược không được đảm bảo. Hơn nữa, các tài liệu đang tụt lại phía sau sự tiến bộ của công nghệ. Là một nhà phát triển, bạn sẽ phải tự mình tìm ra một số điều.

Ngoài ra, các tùy chọn giám sát mà Docker cung cấp khá kém. Bạn có thể có được một cái nhìn sâu sắc nhanh chóng vào một số thống kê đơn giản. Tuy nhiên, nếu bạn muốn xem một số tính năng giám sát nâng cao, Docker không có gì để cung cấp.

Ngoài ra, trong trường hợp ứng dụng lớn và phức tạp, việc triển khai Docker phải trả giá. Xây dựng và duy trì liên lạc giữa nhiều container trên nhiều máy chủ sẽ tốn rất nhiều thời gian và công sức. Tuy nhiên, có một công cụ hữu ích, giúp làm việc dễ dàng hơn với các ứng dụng Docker đa container, - Docker Compose. Docker Compose định nghĩa các dịch vụ, mạng và khối lượng trong một tệp YAML.

Tuy nhiên, hệ sinh thái Docker khá rạn nứt - không phải tất cả các sản phẩm container hỗ trợ đều hoạt động tốt với nhau. Mỗi sản phẩm được hỗ trợ bởi một công ty hoặc cộng đồng nhất định. Sự cạnh tranh gay gắt giữa những kết quả trong sự không tương thích sản phẩm.

# Tóm lại
Các chuyên gia của KeenEthics thích làm việc với Docker và thường sử dụng nó để phát triển ứng dụng. Mặc dù có một số nhược điểm, bạn có thể dễ dàng sử dụng nó để chạy và quản lý các ứng dụng cạnh nhau trong các thùng chứa bị cô lập.

Cài đặt ứng dụng có thể đơn giản như chạy một lệnh - <docker run>. Docker cũng cung cấp một môi trường cách ly sạch và nguyên bản cho mỗi thử nghiệm, làm cho nó trở thành một công cụ quan trọng và hữu ích để thử nghiệm tự động hóa.

Các tính năng của Docker cung cấp lợi ích về mặt quản lý và bảo mật phụ thuộc. Được cải tiến với các công cụ hữu ích như Docker Hub, Docker Swarm và Docker Compose, Docker là một giải pháp phổ biến và thân thiện với người dùng.

Mặc dù có tất cả các lợi ích của Docker, bạn không nên sử dụng nó để chứa từng ứng dụng bạn phát triển.

*Hãy nhớ rằng: Docker là một người thay đổi trò chơi. Nhưng nó không phải là một giải pháp phù hợp với một kích thước.*

Docker không phải là một công cụ như vậy trên thị trường. Các lựa chọn thay thế của Docker là rkt , được phát âm là 'rocket', Linux Container hoặc OpenVZ . Mỗi cái đều có ưu điểm và nhược điểm là khá giống với Docker. Mức độ phổ biến ngày càng tăng và tỷ lệ sử dụng của Docker chỉ do quyết định của các doanh nghiệp áp dụng nó.

Trước khi đưa ra kết luận về việc bạn có nên sử dụng Docker hay không, hãy nghiên cứu các yêu cầu của dự án. Nói chuyện với đồng đội hoặc đồng nghiệp của bạn và để họ giúp bạn quyết định khi nào nên sử dụng Docker, khi nào không sử dụng container và liệu đó có phải là một trong những trường hợp sử dụng Docker đó không.

Cho dù bạn có muốn hay không, công nghệ này có một tương lai. Có một số nhà phát triển và cơ quan phát triển ghét Docker và cố gắng loại bỏ nó khỏi tất cả các dự án đang diễn ra của họ. Đồng thời, có những chuyên gia đóng gói mọi thứ họ có thể vì họ xem Docker là thuốc chữa bách bệnh. Có lẽ, bạn không nên tham gia một trong hai trại. Hãy vô tư, giữ mục tiêu và đưa ra quyết định tùy thuộc vào một tình huống cụ thể.

Nguồn: https://www.freecodecamp.org/news/7-cases-when-not-to-use-docker/
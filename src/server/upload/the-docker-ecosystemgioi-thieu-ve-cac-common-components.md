**Giới thiệu**

Containerization là quá trình phân phối và triển khai ứng dụng theo cách di động và có thể dự đoán được. Nó hoàn thành điều này bằng cách đóng gói các components và phụ thuộc vào môi trường quy trình tiêu chuẩn hóa, cô lập, nhẹ được gọi là containers. Nhiều tổ chức hiện đang quan tâm đến việc thiết kế các ứng dụng và dịch vụ có thể dễ dàng được triển khai cho các hệ thống phân tán, cho phép hệ thống mở rộng dễ dàng và tồn tại các lỗi máy và ứng dụng. Docker, một nền tảng container được phát triển để đơn giản hóa và chuẩn hóa việc triển khai trong các môi trường khác nhau, phần lớn là công cụ thúc đẩy việc áp dụng phong cách thiết kế và quản lý dịch vụ này. Một lượng lớn phần mềm đã được tạo ra để xây dựng trên hệ sinh thái quản lý container được phân phối này.


**Docker và Containerization**


Docker là phần mềm container phổ biến nhất hiện nay. Trong khi các hệ thống container khác tồn tại, Docker làm cho việc tạo và quản lý container trở nên đơn giản và tích hợp với nhiều dự án mã nguồn mở.

![](https://images.viblo.asia/db8bab10-c22f-4eea-abf1-2f376f15ead0.png)

Trong hình ảnh này, bạn có thể  thấy cách các container liên quan đến hệ thống máy chủ. Container cách ly các ứng dụng riêng lẻ và sử dụng tài nguyên hệ điều hành đã được Docker trừu tượng hóa. Trong chế độ chi tiết, chúng ta có thể thấy rằng các container có thể được tạo bằng cách "phân lớp", với nhiều container chia sẻ các lớp bên dưới, giảm mức sử dụng tài nguyên.

Ưu điểm chính của Docker là:

* Sử dụng tài nguyên nhẹ: thay vì ảo hóa toàn bộ hệ điều hành, các container được cô lập ở cấp quy trình và sử dụng hạt nhân của máy chủ.
* Tính di động: tất cả các phụ thuộc cho một ứng dụng được đóng gói được đóng gói bên trong container, cho phép nó chạy trên bất kỳ máy chủ Docker nào.
* Dự đoán: Máy chủ không quan tâm đến những gì đang chạy bên trong container và container không quan tâm đến máy chủ đang chạy trên máy chủ nào. Các giao diện được chuẩn hóa và tương tác có thể dự đoán được.
Thông thường, khi thiết kế một ứng dụng hoặc dịch vụ để sử dụng Docker, nó hoạt động tốt nhất để phá vỡ chức năng vào các container riêng lẻ, một quyết định thiết kế được gọi là kiến trúc hướng dịch vụ. Điều này mang lại cho bạn khả năng dễ dàng mở rộng hoặc cập nhật các component độc lập trong tương lai. Có sự linh hoạt này là một trong nhiều lý do khiến mọi người quan tâm đến Docker để phát triển và triển khai.


**Service Discovery and Global Configuration Stores**


Service Discovery là một thành phần của một chiến lược tổng thể nhằm giúp triển khai container có thể mở rộng và linh hoạt. Service Discovery được sử dụng để các container có thể tìm hiểu về môi trường mà chúng đã được giới thiệu mà không cần sự can thiệp của quản trị viên. Họ có thể tìm thấy thông tin kết nối cho các component mà họ phải tương tác và họ có thể tự đăng ký để các công cụ khác biết rằng họ có sẵn. Các công cụ này cũng thường hoạt động như các Global Configuration Stores  phân tán trên toàn cầu, nơi các thiết lập cấu hình tùy ý có thể được thiết lập cho các dịch vụ hoạt động trong cơ sở hạ tầng của bạn.

![](https://images.viblo.asia/10d66e92-4a1a-4397-a648-a5fad63a2cbd.png)

Trong hình trên, bạn có thể thấy một luồng ví dụ trong đó một ứng dụng đăng ký thông tin kết nối của nó với hệ thống Service Discovery. Sau khi đăng ký, các ứng dụng khác có thể truy vấn dịch vụ khám phá để tìm hiểu cách kết nối với ứng dụng.

Các công cụ này thường được thực hiện như các kho key-value đơn giản được phân phối giữa các máy chủ trong một môi trường nhóm. Nói chung, các kho key-value cung cấp một API HTTP để truy cập và thiết lập các giá trị. Một số bao gồm các biện pháp bảo mật bổ sung như mục được mã hóa hoặc cơ chế kiểm soát truy cập. Các cửa hàng phân tán là cần thiết để quản lý các máy chủ Docker được nhóm lại ngoài chức năng chính của chúng trong việc cung cấp các chi tiết tự cấu hình cho các thùng chứa mới.

Một số trách nhiệm của các Service Discovery là:

* Cho phép ứng dụng lấy dữ liệu cần thiết để kết nối với các dịch vụ mà họ phụ thuộc.
* Cho phép các dịch vụ đăng ký thông tin kết nối của họ cho mục đích trên.
* Cung cấp vị trí có thể truy cập toàn cầu để lưu trữ dữ liệu cấu hình tùy ý.
* Lưu trữ thông tin về các thành viên cụm khi cần thiết bởi bất kỳ phần mềm quản lý cụm nào.

Một số công cụ khám phá dịch vụ phổ biến và các dự án có liên quan là:

* etcd: cửa hàng khóa-giá trị phân phối dịch vụ khám phá / phân phối toàn cầu
* consul: phát hiện dịch vụ / kho khóa-giá trị phân phối toàn cầu
* zookeeper: khám phá dịch vụ / cửa hàng khóa-giá trị phân phối toàn cầu
* crypt: dự án mã hóa các mục nhập v.v.
* confd: đồng hồ lưu trữ khóa-giá trị cho các thay đổi và kích hoạt cấu hình lại các dịch vụ với các giá trị mới


**Công cụ mạng**


Các ứng dụng được đóng gói với một thiết kế hướng dịch vụ, khuyến khích phân tách chức năng thành các thành phần rời rạc. Trong khi điều này làm cho việc quản lý và mở rộng quy mô dễ dàng hơn, nó đòi hỏi sự bảo đảm nhiều hơn về chức năng và độ tin cậy của mạng giữa các component. Docker chính nó cung cấp các cấu trúc mạng cơ bản cần thiết cho việc truyền tải container đến container và truyền thông giữa các host.

Khả năng kết nối mạng gốc của Docker cung cấp hai cơ chế để gắn các container lại với nhau. Đầu tiên là để lộ các cổng của một container và tùy chọn ánh xạ tới hệ thống máy chủ để định tuyến bên ngoài. Bạn có thể chọn cổng máy chủ để ánh xạ tới hoặc cho phép Docker chọn ngẫu nhiên một cổng không sử dụng cao. Đây là cách chung để cung cấp quyền truy cập vào container hoạt động tốt cho hầu hết các mục đích.

Phương pháp khác là cho phép các container giao tiếp bằng cách sử dụng "links" Docker. Một container được liên kết sẽ nhận thông tin kết nối về đối tác của nó, cho phép nó tự động kết nối nếu nó được cấu hình để chú ý đến các biến đó. Điều này cho phép liên hệ giữa các container trên cùng một máy chủ mà không cần phải biết trước cổng hoặc địa chỉ nơi dịch vụ sẽ được đặt.

Cấp độ mạng cơ bản này phù hợp với môi trường máy chủ đơn lẻ hoặc được quản lý chặt chẽ. Tuy nhiên, hệ sinh thái Docker đã tạo ra một loạt các dự án tập trung vào việc mở rộng chức năng kết nối mạng có sẵn cho các nhà khai thác và nhà phát triển. Một số khả năng mạng bổ sung có sẵn thông qua các công cụ bổ sung bao gồm:

* Lớp phủ mạng để đơn giản hóa và thống nhất không gian địa chỉ trên nhiều máy chủ.
* Mạng riêng ảo thích nghi để cung cấp giao tiếp an toàn giữa các thành phần khác nhau.
* Chỉ định mạng con cho mỗi máy chủ lưu trữ hoặc mỗi ứng dụng
* Thiết lập giao diện macvlan cho giao tiếp
* Định cấu hình địa chỉ MAC tùy chỉnh, cổng, v.v. cho các vùng chứa của bạn

Một số dự án có liên quan đến cải thiện mạng Docker là:

* flannel: Lớp phủ mạng cung cấp cho mỗi máy chủ với một mạng con riêng biệt.
* weave: Mạng lớp phủ mô tả tất cả các vùng chứa trên một mạng đơn lẻ.
* pipework: Bộ công cụ mạng nâng cao cho các cấu hình mạng tùy ý nâng cao.


**Lập kế hoạch, quản lý cụm và phối hợp**


Một thành phần khác cần thiết khi xây dựng môi trường container cụm là một bộ lập lịch biểu. Schedulers chịu trách nhiệm bắt đầu container trên các host có sẵn.

![](https://images.viblo.asia/7aef3422-4c48-4728-93b5-7184e71bcd42.png)

Hình ảnh trên minh họa một quyết định lập lịch đơn giản. Yêu cầu được đưa ra thông qua API hoặc công cụ quản lý. Từ đây, bộ lập lịch đánh giá các điều kiện của yêu cầu và trạng thái của các máy chủ có sẵn. Trong ví dụ này, nó lấy thông tin về mật độ vùng chứa từ một kho lưu trữ dữ liệu / dịch vụ phát hiện được phân tán (như đã thảo luận ở trên) để nó có thể đặt ứng dụng mới trên máy chủ lưu trữ ít bận nhất.

Quy trình chọn máy chủ này là một trong những trách nhiệm cốt lõi của bộ lập lịch. Thông thường, nó có các chức năng tự động hóa quy trình này với quản trị viên có tùy chọn để chỉ định một số ràng buộc nhất định. Một số ràng buộc này có thể là:

* Lên lịch vùng chứa trên cùng một máy chủ như một vùng chứa khác.
* Hãy chắc chắn rằng các thùng chứa không được đặt trên cùng một máy chủ như một container nhất định.
* Đặt container lên máy chủ có nhãn hoặc siêu dữ liệu phù hợp.
* Đặt container trên máy chủ lưu trữ ít bận nhất.
* Chạy vùng chứa trên mọi máy chủ trong cụm.
Trình lên lịch chịu trách nhiệm tải vùng chứa lên các máy chủ có liên quan và bắt đầu, dừng và quản lý vòng đời của quy trình.

Vì trình lên lịch phải tương tác với mỗi máy chủ trong nhóm, các hàm quản lý cụm cũng thường được bao gồm. Điều này cho phép người lập lịch nhận thông tin về các thành viên và thực hiện các nhiệm vụ quản trị. Việc phối hợp trong bối cảnh này thường đề cập đến sự kết hợp giữa lịch trình vùng chứa và quản lý máy chủ.

Một số dự án phổ biến có chức năng như công cụ lập lịch và quản lý nhóm là:

* fleet: công cụ quản lý lịch và cụm.
* marathon: công cụ quản lý lịch biểu và dịch vụ.
* Swarm: công cụ quản lý lịch biểu và dịch vụ.
* mesos: host abstraction service hợp nhất tài nguyên máy chủ cho bộ lập lịch biểu.
* kubernetes: Scheduler nâng cao có khả năng quản lý các nhóm container.
* compose: công cụ sắp xếp container để tạo nhóm chứa.
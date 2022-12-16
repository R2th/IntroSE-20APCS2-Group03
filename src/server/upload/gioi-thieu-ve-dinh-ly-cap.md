Nguồn: https://www.ibm.com/cloud/learn/cap-theorem

## Định lý CAP là gì?

Hẳn là tất cả trong chúng ta đã từng nghe đến câu quảng cáo "Ngon, bổ, rẻ", và đều hiểu rằng sẽ chẳng bao giờ có thứ gì có cả 3 điều trên. Cái gì "ngon", "bổ" thì sẽ không "rẻ".
Định lý CAP phát biểu điều tương tự với các hệ thống phân tán — cụ thể là, một hệ thống phân tán chỉ có thể có được hai trong ba đặc tính mong muốn: Tính nhất quán (Consistency), tính khả dụng (Availibility) và dung sai phân vùng (Partition tolerance).
Hệ thống phân tán là một mạng lưu trữ dữ liệu trên nhiều node (máy vật lý hoặc máy ảo) cùng một lúc. Bởi vì tất cả các ứng dụng đám mây đều là hệ thống phân tán, khi thiết kế ứng dụng đám mây, chúng ta cần phải hiểu định lý CAP để có thể lựa chọn hệ thống quản lý dữ liệu với các đặc điểm mà ứng dụng của chúng ta cần nhất.


## Về ba chữ ‘CAP’ 

Chúng ta hãy xem xét chi tiết ba đặc điểm của hệ thống phân tán mà định lý CAP đề cập đến.

### Tính nhất quán

Tính nhất quán có nghĩa là tại cùng một thời điểm, dữ liệu mà tất cả các máy khách nhìn thấy phải là giống nhau, bất kể nó kết nối với node nào. Để điều này xảy ra, bất cứ khi nào dữ liệu được ghi vào một node, nó phải được chuyển tiếp hoặc sao chép ngay lập tức tới tất cả các node khác trong hệ thống trước khi việc ghi được coi là "thành công".

### Tính khả dụng

Tính khả dụng có nghĩa là bất kỳ máy khách nào đưa ra yêu cầu dữ liệu đều nhận được phản hồi, ngay cả khi một hoặc nhiều node bị ngừng hoạt động. Hay nói cách khác — đối với bất kỳ yêu cầu nào, tất cả các node đang hoạt động trong hệ thống phân tán phải trả về phản hồi hợp lệ.

### Dung sai phân vùng

Phân vùng là sự đứt gãy liên lạc trong hệ thống phân tán, hay cụ thể hơn, là việc kết nối giữa hai node bị mất hoặc tạm thời bị trì hoãn. Dung sai phân vùng có nghĩa là cluster phải duy trì được trạng thái hoạt động dù cho có bất kỳ sự cố giao tiếp nào giữa các node trong hệ thống.

## Phân loại các kiểu cơ sở dữ liệu NoSQL dựa trên cơ sở định lý CAP

Cơ sở dữ liệu NoSQL (không quan hệ) là lựa chọn lý tưởng cho các ứng dụng mạng phân tán. Không giống như các CSDL SQL (quan hệ) có thể scale theo chiều dọc, cơ sở dữ liệu NoSQL được thiết kế để có thể scale theo chiều ngang và phân tán, tức có thể mở rộng nhanh chóng trên một mạng lớn dần lên bao gồm nhiều node được kết nối với nhau.

Ngày nay, cơ sở dữ liệu NoSQL được phân loại dựa trên các đặc điểm trong định lý CAP mà chúng hỗ trợ:

Cơ sở dữ liệu CP: Một cơ sở dữ liệu CP có tính nhất quán và dung sai phân vùng, tức hi sinh tính khả dụng. Khi tình trạng phân vùng xảy ra giữa hai node bất kỳ, hệ thống phải shutdown node gặp tình trạng không nhất quán (tức là làm cho nó không khả dụng) cho đến khi phân vùng được giải quyết.
Cơ sở dữ liệu AP: Cơ sở dữ liệu AP cung cấp tính khả dụng và khả năng chịu phân vùng với chi phí nhất quán. Khi tình trạng phân vùng xảy ra, tất cả các node vẫn có khả dụng nhưng sẽ có những node chứa phiên bản dữ liệu cũ hơn những node khác. (Khi tình trạng phân vùng được giải quyết, cơ sở dữ liệu AP thường đồng bộ lại các node để đồng bộ lại tất cả các điểm không nhất quán trong hệ thống.)
Cơ sở dữ liệu CA: Cơ sở dữ liệu CA cung cấp tính nhất quán và tính khả dụng trên tất cả các node. Tuy nhiên, nó không thể thực hiện được điều này nếu xảy ra tình trạng phân vùng giữa hai node bất kỳ trong hệ thống và do đó không có khả năng chịu lỗi (fault tolerance).

Không phải ngẫu nhiên mà CA được liệt kê cuối cùng. Lý do là trong hệ thống phân tán, việc bị phân vùng là không thể tránh khỏi. Vì vậy, trong khi chúng ta có thể thảo luận về cơ sở dữ liệu phân tán CA về mặt lý thuyết, trên thực tế, cơ sở dữ liệu phân tán CA không thể tồn tại. Tuy nhiên, điều này không có nghĩa là chúng ta không thể tạo một cơ sở dữ liệu CA khi xây dựng một ứng dụng phân tán, nếu cần. Nhiều cơ sở dữ liệu quan hệ, chẳng hạn như PostgreSQL, cung cấp tính nhất quán và tính khả dụng và có thể được deploy lên nhiều node bằng cách nhân bản.

## MongoDB và định lý CAP (CP)

MongoDB là một hệ quản trị cơ sở dữ liệu NoSQL phổ biến. MongoDB lưu trữ dữ liệu dưới dạng tài liệu BSON (JSON nhị phân). Nó thường được sử dụng cho dữ liệu lớn và các ứng dụng thời gian thực chạy ở nhiều vị trí khác nhau. Nhìn từ góc độ CAP, MongoDB là một kho lưu trữ dữ liệu CP — nó giải quyết các phân vùng mạng bằng cách duy trì tính nhất quán, nhưng không đảm bảo tính khả dụng.

MongoDB là một hệ thống single-master — mỗi tập hợp bản sao chỉ có thể có một node chính tiếp nhận tất cả các thao tác ghi. Tất cả các node khác trong cùng một tập hợp bản sao là các node thứ cấp log lại nhật ký hoạt động của node chính và áp dụng các hoạt động đó vào tập dữ liệu riêng của chúng. Mặc định, các máy khách cũng đọc từ node chính, nhưng cũng có thể chỉ định tùy chọn đọc để đọc từ các node phụ.

Khi node chính không khả dụng, node phụ có nhật ký hoạt động gần đây nhất sẽ được chọn làm node chính mới. Khi tất cả các node phụ khác bắt kịp với node chính mới, cụm sẽ khả dụng trở lại. Vì các máy khách không thể thực hiện bất kỳ yêu cầu ghi nào trong khoảng thời gian này, nên dữ liệu vẫn nhất quán trên toàn bộ mạng.

## Cassandra và định lý CAP (AP)

Apache Cassandra là một cơ sở dữ liệu NoSQL mã nguồn mở được maintain bởi Apache Software Foundation. Đây là một cơ sở dữ liệu dạng wide-column cho phép lưu trữ dữ liệu trên mạng phân tán. Tuy nhiên, không giống như MongoDB, Cassandra có kiến trúc masterless (vô chủ), và kết quả là, nó có nhiều điểm có thể gặp lỗi chứ không phải một điểm duy nhất.

Nhìn từ góc độ CAP, Cassandra là một cơ sở dữ liệu AP —  cung cấp tính khả dụng và dung sai phân vùng nhưng không thể cung cấp tính nhất quán mọi lúc. Bởi vì Cassandra không có node chính, tất cả các node phải có sẵn liên tục. Tuy nhiên, Cassandra cung cấp *tính nhất quán cuối cùng* bằng cách cho phép máy khách ghi vào bất kỳ node nào vào bất kỳ lúc nào và điều chỉnh các conflict càng nhanh càng tốt.

Vì dữ liệu chỉ trở nên không nhất quán trong trường hợp phân vùng mạng và các mâu thuẫn được giải quyết nhanh chóng, Cassandra cung cấp chức năng “sửa chữa” để giúp các node bắt kịp với các node khác. Tuy nhiên, tính khả dụng liên tục đem lại một hệ thống có hiệu suất cao, và đây là một điều rất có giá trị, đáng để đánh đổi trong nhiều trường hợp.

## Làm việc với microservices

Microservice là các thành phần ứng dụng được kết nối một cách lỏng lẻo (loosely coupled), có thể triển khai độc lập kết hợp, và triển khai trên stack riêng biệt nhau — bao gồm cả cơ sở dữ liệu và mô hình cơ sở dữ liệu, và giao tiếp với nhau qua mạng. Vì microservice có thể chạy trên cả máy chủ on-premise và trên cloud, chúng đã trở nên rất phổ biến cho các ứng dụng hybrid và multicloud.

Hiểu định lý CAP giúp chúng ta có thể lựa chọn cơ sở dữ liệu tốt nhất khi thiết kế một ứng dụng dựa trên kiến trúc microservices chạy từ nhiều vị trí. Ví dụ: nếu chúng ta cần xây dựng một ứng dụng mà trong đó khả năng duyệt nhanh chóng mô hình dữ liệu và scale theo chiều ngang là cần thiết, và có thể chấp nhận được *tính nhất quán cuối cùng*, thì cơ sở dữ liệu AP như Cassandra hoặc Apache CouchDB có thể đáp ứng yêu cầu và đơn giản hóa việc implement . Mặt khác, nếu ứng dụng của chúng ta phụ thuộc nhiều vào tính nhất quán của dữ liệu — như trong các ứng dụng thương mại điện tử hoặc dịch vụ thanh toán — thì ta có thể chọn cơ sở dữ liệu quan hệ như PostgreSQL.
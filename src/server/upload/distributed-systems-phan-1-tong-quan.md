Đây là bài viết mở đầu trong series bài viết về đề tài Distributed Systems. Dự định của mình là sẽ thực hiện loạt bài viết tương đối chuyên sâu về các chủ đề: Distributed Systems, Microservices, Transactions, Event sourcing, CQRS, Domain Driven Design, và nếu có thời gian, có thể sẽ đề cập đến cả Blockchain nữa.

*Bài viết này được đăng lại từ blog cá nhân của mình tại: https://dhhoang.github.io/posts/distributed-system-overview*
## Sơ lược
Một "hệ thống phân tán" (Distributed Systems-từ giờ xin được phép sử dụng từ gốc tiếng Anh) được định nghĩa là một tập hợp các tiến trình điện toán (process) độc lập, được kết nối với nhau bởi một hệ thống mạng (network) để các process này có thể truyền nhận thông tin  ('process' ở đây được định nghĩa là một đơn vị điện toán được vận hành với một không gian bộ nhớ riêng biệt, không trùng lặp với các process khác). Các process này phối hợp hoạt động với nhau như một thực thể duy nhất đối với người dùng bên ngoài  nhằm thực thi một nhiệm vụ nào đó. Dựa theo định nghĩa này thì nhiều process trên cùng 1 máy tính cũng có thể được coi như Distributed Systems (DS). Dĩ nhiên trên thực tế, người ta quan tâm đến việc vận hành nhiều máy tính cùng với nhau, cho nên chúng ta có thể ngầm hiểu là các process này chạy trên các máy tính riêng biệt.

Vậy **tại sao chúng ta cần tìm hiểu về DS**? DS xuất hiện rất phổ biến trên thực tế. Hầu hết các ứng dụng ngày nay, đặc biệt là các ứng dụng Internet, đều được triển khai dưới dạng DS. Việc triển khai phần mềm, đặc biệt là những hệ thống lớn, trên nhiều đơn vị máy tính (thay vì chỉ dùng một máy tính duy nhất) có rất nhiều lợi ích, VD như:
* Cung cấp nhiều tài nguyên hơn khi hệ thống cần xử lý lượng công việc lớn hơn.
* Chỉ dùng một đơn vị máy tính đồng nghĩa với rủi ro phần mềm bị sập (crash) nếu máy đó gặp sự cố. Dùng nhiều đơn vị máy sẽ cho phép bạn tiếp tục vận hành phần mềm kể cả khi sự cố xảy ra.
* Khi hệ thống của bạn trở nên phức tạp và cần sự kết hợp từ nhiều thành phần khác nhau, sử dụng DS cho phép bạn chia nhỏ một hệ thống to thành nhiều đơn vị nhỏ. Mỗi đơn vị có thể hoạt động độc lập, thậm chí có thể được phát triển bởi các team khác nhau với các chuyên môn khác nhau.
* Người dùng hệ thống có thể có sự phân tán về mặt địa lý trên toàn cầu. Để đảm bảo chất lượng dịch vụ và hạn chế độ trễ thì hệ thống máy cũng cần được phân tán để có thể có mặt ở gần người dùng nhất có thể.

## Xây dựng Distributed Systems có gì khó ?
Tuy mang đến nhiều lợi ích như kể trên, DS cũng làm cho việc phát triển và vận hành trở nên phức tạp hơn, do đặc tính phân tán của nó. Để xây dựng một hệ thống DS hoạt động tốt, chúng ta sẽ phải giải quyết rất nhiều bài toán, tùy thuộc vào đặc thù của hệ thống đó. Có thể kể ra một vài bài toán thường gặp như:
* Bài toán về xử lý sự cố (failure): Với một hệ thống máy tính lớn thì việc máy móc gặp trục trặc hay sự cố là điều thường xuyên xảy ra. Xử lý sự cố để không làm ảnh hưởng đến hệ thống (hoặc ít ra là giảm thiểu ảnh hưởng) là vấn đề cốt lõi nhất trong việc xây dựng DS.
* Vấn đề đồng thuận về dữ liệu (consensus): Xây dựng DS đồng nghĩa với việc dữ liệu của hệ thống cũng sẽ bị phân tán. Điều này gây ra trở ngại nếu chúng ta muốn hệ thống làm việc như một thực thể thống nhất, vì các máy đôi khi sẽ bất đồng với nhau về mặt dữ liệu.
* Vấn đề bất đồng bộ về mặt thời gian: Mỗi máy tính trong hệ thống có một đồng hồ riêng biệt, và không nhất quán với nhau về mặt thời gian. Đồng hồ máy tính cũng thường xuyên xảy ra tình trạng chạy lệch pha (clock drift). Sự bất đồng bộ này có thể dẫn đến sai lệch về mặt logic của hệ thống. VD như, nếu một ứng dụng nhắn tin không thống nhất được về mặt thời gian, thứ tự tin nhắn của người dùng có thể sẽ sai lệch giữa người dùng này với người dùng kia.
* Các vấn đề khác như vấn đề bảo mật, vấn đề giao tiếp, vấn đề lưu trữ và sao lưu dữ liệu...

Có một điều thú vị trong lĩnh vực DS, đó là các bài toán kể trên hầu như không có lời giải lý thuyết nào đáp ứng được yêu cầu một cách hoàn hảo trên (sẽ được bàn luận sâu hơn trong các bài sau). Tuy nhiên điều này không có nghĩa là chúng không có những cách giải quyết phù hợp trong thực tế, tùy vào từng hệ thống cụ thể. Hầu hết các tiến triển gần đây trong lĩnh vực DS đều nhắm đến việc xây dựng những lời giải thực tế cho những hệ thống với mục đích cụ thể.

## Các kiểu sự cố trong Distributed Systems
Như đã nói ở trên, sự cố trong vận hành hệ thống xảy ra một cách thường xuyên. Sau đây là đoạn lược dịch lời **Jeff Dean**, một kĩ sư trưởng tại Google:
> Trong trung tâm dữ liệu (data center) của Google, mỗi năm một cluster sẽ xảy ra khoảng 1000 sự cố máy, hàng ngàn sự cố ổ cứng, trung bình một sự cố về nguồn điện khiến cho khoảng 500-1000 server bị sập trong vòng khoảng 6 tiếng đồng hồ. Ngoài ra, trung bình 5 rack sẽ gặp trục trặc, làm mất đi một nửa số packet được truyền tải, làm ảnh hưởng đến khoảng 5% số server tại bất kì thời điểm nào.

Vì sự cố xảy ra thường xuyên như vậy, nên các hệ thống DS cần có cơ chế tự động xử lý khi gặp phải tình huống xấu, vì không phải lúc nào con người cũng có thể can thiệp một cách kịp thời. Để giải quyết được vấn đề này thì chúng ta cần hiểu được hệ thống có thể gặp phải những kiểu sự cố nào.
### Sự cố về máy (node failure)
Mỗi máy tính vật lý, do nhiều nguyên nhân khác nhau, có thể gặp sự có trong khi hoạt động. Người ta chia các sự cố này thành một vài loại chính:
* **Fail-stop**: Đây là kiểu sự cố khiến cho process trên máy dừng hoạt động (dừng tính toán cũng như truyền nhận tin). Nguyên nhân sự cố này có thể do máy bị sập (lỗi phần mềm, lỗi hệ điều hành ...), lỗi phần cứng, hay những nguyên nhân bên ngoài (vd như mất điện chẳng hạn). Đây là kiểu sự cố thường gặp nhất, nên khi người ta nói đến 'failure' mà không nhắc gì thêm thì thường được ngầm hiểu là kiểu sự cố này. Hầu hết các thuật toán được phát triển trong DS đều nhằm đối phó với kiểu sự cố này.
* **Fail-recover**: Process có thể ngừng hoạt động trong một thời gian nhất định, nhưng sau đó phục hồi hoạt động trở lại. Nguyên nhân của kiểu sự cố này có thể là do máy tự động reboot do một nguyên nhân nào đó. Thường khi nhắc đến kiểu sự cố này, người ta mặc đình rằng máy có khả năng lưu trữ thông tin vào ổ đĩa cứng và phục hồi thông tin này sau khi sự cố xảy ra.
* **Byzantine failure**: Sự cố mà máy tính không hoạt động theo đúng yêu cầu đề ra. VD như, máy có thể gửi tin tùy ý, hay thay đổi trạng thái tùy ý, không giống những gì được lập trình. Đây là kiểu sự cố *khó chịu* nhất, có thể xảy ra khi hệ thống gặp trục trặc không rõ nguyên nhân (vd như RAM có thể bị hỏng khiến xảy ra tình trạng bit-flip), hay do hệ thống bị kể xấu tấn công.
### Sự cố về network
![alt text](https://github.com/dhhoang/dhhoang.github.io/raw/gh-pages/network_partition.JPG "Logo Title Text 1")
Mạng máy tính cũng là một sản phẩm vật lý và vì vậy cũng có thể xảy ra sự cố. Một kiểu sự cố thường gặp là sự cố "chia cắt mạng" (**network partitioning**), được mô phỏng bởi hình trên. Sự cố này xảy ra đường truyền của một hoặc nhiều server bị chia cắt khỏi phần còn lại của hệ thống, khiến hệ thống bị chia cắt thành nhiều phần không thể giao tiếp với nhau. 
Trên thực tế, trong các data center, một cluster máy chủ thường được kết nối với nhau bởi một hoặc nhiều cục switch. Sự cố của cổng switch hoặc dây dẫn có thể dẫn đến việc một hay nhiều server bị ngắt kết nối, dẫn đến tình trạng partitioning kể trên.

Ngoài ra, một vài sự cố mạng khác có thể kể ra như việc latency bị tăng cao (do congestion control), hay network adapter của các server gặp trục trặc ...

### Thiết kế Distributed Systems để sẵn sàng xử lý các sự cố
Do sự cố xảy ra thường xuyên và đa dạng như đã kể trên, hệ thống DS cần được thiết kế để có cơ chế tự động xử lý sự cố, đảm bảo việc vận hành không bị gián đoạn hay sai sót. Sau đây mình sẽ trích đoạn một bài báo khoa học có tên là ["Về việc thiết kế và triển khai các dịch vụ Internet"](https://www.usenix.org/legacy/event/lisa07/tech/full_papers/hamilton/hamilton.pdf), của tác giả **James Hamilton** (khi đó làm việc tại Microsoft, hiện tại là kĩ sư trưởng tại Amazon Web Service):
>**Thiết kế hệ thống để xử lý sự cố** là khái niệm cốt lõi khi phát triển các dịch vụ quy mô lớn, bao gồm nhiều thành phần nhỏ. Những thành phần này sẽ thường xuyên gặp sự cố, và đôi khi sự cố này có thể dẫn đến sự cố kia. Khi hệ thống được triển khai trên khoảng 10,000 server và 50,000 đơn vị đĩa cứng, sự cố sẽ xảy ra nhiều lần trong một ngày. Nếu sự cố nào cũng cần đến con người can thiệp, hệ thống sẽ không thể vận hành một cách trơn tru và tiết kiệm được chi phí. Do đó, hệ thống cần có cơ chế đối phó với sự cố mà không cần con người can thiệp. Cơ chế này cần được kiểm tra một cách thường xuyên. Một cách đơn giản để kiểm tra là cố tình gây ra sự cố thường xuyên trong quá trình vận hành hệ thống. Điều này thoạt nghe có vẻ vô lý, tuy nhiên, nếu cơ chế sự cố không thường xuyên được sử dụng thì chúng sẽ không hoạt động khi cần thiết.

Nói thế để thấy rằng, khi phát triển một hệ thống DS, vấn đề sự cố luôn phải được coi như một phần của bài toán, và chúng ta tuyệt đối không được mặc định rằng sự cố không bao giờ xảy ra. 

## Một vài tài liệu & đường link để tìm hiểu sâu thêm về Distributed Systems
Distributed Systems là một lĩnh vực tương đối sâu rộng và trong một vài bài viết thì khó mà chúng ta có thể đề cập chi tiết hết về các chủ đề được. Sau đây mình chia sẻ một vài nguồn thông tin để các bạn có thể tìm hiểu sâu hơn về lĩnh vực này: 
* Khóa **Distributed Systems** của MIT được ghi lại trên YouTube: https://www.youtube.com/playlist?list=PLrw6a1wE39_tb2fErI4-WkMbsvGQk9_UB
* Kênh **Distributed Systems Course** trên Youtube: https://www.youtube.com/user/cbcolohan
* Khóa học **Reliable Distributed Algorithms** (miễn phí): [phần 1](https://courses.edx.org/courses/course-v1:KTHx+ID2203.1x+3T_2017/course/) và [phần 2](https://courses.edx.org/courses/course-v1:KTHx+ID2203.2x+2016T4/course/)

Trong phần sau, mình sẽ bàn về bài toán đồng thuận (Consensus), một bài toán cơ bản nhất trong Distributed Systems.
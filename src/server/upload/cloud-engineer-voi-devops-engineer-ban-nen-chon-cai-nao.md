# Lời đầu
Với sự trỗi dậy mạnh mẽ của phần mềm và điện toán đám mây, ngày càng có nhiều vị trí công việc mới được sinh ra trong ngành IT.

Có những vị trí mang chức danh khác nhau, nhưng lại chia sẻ chung một phần nhiệm vụ, đôi lúc khiến cho người ta cảm thấy khó hiểu, kiểu "chẳng phải chúng là một sao?".

Nổi bật nhất có lẽ phải kể đến: Cloud Engineer và Devops Engineer. Đây là 2 role khá mới mẻ, job description thì cũng khá tương đồng nhau,
nào là CI/CD pipeline, microservices, container orchestration , rồi system architecture, cloud technologies (AWS, Azure, GCP) ...
   
Trong bài viết này, mình muốn chia sẻ cho mọi người điểm khác biệt giữa DevOps Engineer và Cloud Engineer. Nắm được kiến thức này
sẽ phần nào giúp bạn có quyết định đúng đắn hơn trong việc lựa chọn con đường sự nghiệp cho mình.

So, let's go!

# Cloud Engineer với DevOps Engineer

## DevOps Engineer?
Trước tiên, chúng ta cần hiểu khái niệm "DevOps" trước đã.

> "DevOps" là một khái niệm chỉ những công việc, kế hoạch giúp tăng tốc việc triển khai ứng dụng phần mềm.

Điều này được thực hiện bằng cách xây dựng một quy trình triển khai tự động (CI/CD pipeline).

Với mỗi thay đổi mà lập trình viên thực hiện trên source code, một loạt các thao tác sẽ được kích hoạt (scan code, build, test, package, deploy, ...) nhằm
cập nhật phần mềm nhanh nhất, để người dùng có thể tiếp cận sản phẩm sớm nhất có thể.

Nhiệm vụ của một DevOps Engineer bao gồm định nghĩa các bước cần thiết trong quy trình và xây dựng cơ sở hạ tầng (một hệ thống bao gồm các tool hỗ trợ CI/CD, như Jenkins để tạo pipeline, SonarQube để scan code, ... )
để đáp ứng được quy trình đó.

Chịu trách nhiệm về quy trình, họ cần nắm khá sâu về vòng đời phát triển của phần mềm (software lifecycle).

Ngoài ra, DevOps Engineer còn có trách nhiệm monitoring các ứng dụng đã được triển khai, các server thuộc hệ thống DevOps, cấu hình
sinh cảnh báo cũng như phối hợp khắc phục khi có sự cố xảy ra.

Có thể thấy, DevOps Engineer là một vị trí sở hữu danh sách công việc cực khủng khiến nhiều người phải ghen tị 😂😂

## Cloud Engineer?

Như tên gọi của nó, đối tượng quan tâm chính của Cloud Engineer là công nghệ và giải pháp trên nền tảng cloud.

Khi công ty muốn triển khai sản phẩm ứng dụng trên nền tảng của cloud providers, Cloud Engineer sẽ chịu trách nhiệm lựa chọn giải pháp sao cho phù hợp với yêu cầu cần thiết.

Quyết định lượng tài nguyên (RAM, CPUs, băng thông, ...) cần có, loại cơ sở dữ liệu, cũng như các dịch vụ đi kèm (cache, DNS, CDN, ...), từ đó đưa ra phân tích, đánh giá cho từng giải pháp để đưa ra lựa chọn tối ưu nhất trong khi vẫn đáp ứng được hiệu năng tối đa cho sản phẩm ứng dụng.

Sau khi đã lựa chọn xong giải pháp, Cloud Engineer sẽ thực hiện các bước cài đặt, cấu hình, xong xuôi sẽ cung cấp thông tin cho đội phát triển để họ tích hợp phần mềm lên hệ thống.

Cloud Engineer cũng cần liên tục monitor cơ sở hạ tầng trên cloud để có thể phát hiện những tài nguyên được phân bổ quá nhiều, hoặc quá ít so với hiện trạng sử dụng thực tế, từ đó đưa ra phương hướng khắc phục nhằm tối ưu chi phí.

## Túm lại, điểm khác biệt là?

Như vậy, có thể thấy Cloud Engineer tập trung chủ yếu vào quản trị cơ sở hạ tầng cloud thông qua việc lựa chọn giải pháp phù hợp túi tiền, đảm bảo hệ thống được bảo mật và có thể scale dễ dàng.

Còn Devops Engineer thì tập trung hơn vào việc xây dựng quy trình tự động hóa nhằm tăng tốc việc triển khai phần mềm.

Giá trị của một Cloud Engineer được đánh giá dựa trên số năm kinh nghiệm cũng như hiểu biết của họ về một hoặc vài nền tảng cloud.

Còn với Devops Engineer, ngoài số năm kinh nghiệm thì giá trị được còn đánh giá dựa trên sự thông thạo lượng lớn các công cụ hỗ trợ CI/CD hiện hành. Tập kĩ năng (skill set) cần thiết của Devops Engineer rộng hơn so với Cloud Engineer vì họ cần hiểu biết về cả những tool không thuộc nền tảng cloud nữa.

## Vậy thì bạn nên chọn cái nào?

Hầu hết các nhà cung cấp dịch vụ cloud hiện tại đều có các khóa học đào tạo cần thiết để bạn trở thành Cloud Engineer. Những khóa học này sẽ giúp bạn làm quen với các sản phẩm dịch vụ của họ, cũng như gom đủ kiến thức để thi và kiếm vài chứng chỉ tương ứng.

DevOps Engineer cần hiểu biết nhiều hơn những dịch vụ trên nền tảng cloud. Họ tập trung vào các giai đoạn mà phần mềm trải qua, từ phát triển (develop) đến kiểm thử (test), triển khai (release) và hoàn thiện (finish). Với mỗi giai đoạn sẽ cần các công cụ khác nhau, các thao tác tối ưu khác nhau nên tập kĩ năng là cực rộng. 

Do vậy, có thể nói con đường của Cloud Engineer rõ ràng và dễ đi hơn so với DevOps Engineer. Bù lại, với cùng số năm kinh nghiệm thì DevOps Engineer thường được trả mức lương cao hơn.

Nếu là beginner, Cloud Engineer sẽ phù hợp hơn cho bạn, nhưng nếu bạn thích thử thách (và tiền 😆), ngại gì mà không chọn DevOps Engineer !!!

# Lời kết
Suy cho cùng, dù vai trò khác nhau nhưng không thể phủ nhận cả hai vị trí đều đóng góp những giá trị quan trọng cho tổ chức, công ty chủ quản. Công nghệ còn phát triển, các vị trí công việc mới sẽ còn được tạo ra với yêu cầu chuyên môn thậm chí cần sâu rộng hơn nữa. 

Chúc cho mỗi chúng ta luôn có đủ can đảm, nhiệt huyết cũng như sự tò mò để chinh phục được mọi công việc mà ta mong ước.

Cảm ơn các bạn đã dành thời gian theo dõi!
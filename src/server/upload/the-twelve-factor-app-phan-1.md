### Giới thiệu
Ngày nay , phần mềm thường được chuyển giao như là 1 dịch vụ, được gọi là các web apps, hay software-as-a-service (SaaS). The Twelve-Factors App là một phương pháp để xây dựng các SaaS với các tiêu chí sau:
* Sử dụng các định dạng theo kiểu tường thuật cho việc thiết lập tự động hóa, để cắt giảm chi phí và thời gian cho lập trình viên mới.
* Có các quy ước rõ ràng với hệ điều hành bên dưới, cung cấp tối đa khả năng chuyển đổi giữa các môi trường thực thi.
* Phù hợp triển khai trên các nền tảng đám mây, cắt giảm yêu cầu quản trị cho server và hệ thống.
* Giảm thiểu sự khác nhau giữa môi trường development và môi trường production, cho phép đạt được sự linh hoạt tối đa trong phát triển liên tục.
* Có thể mở rộng mà không cần thay đổi lớn cho các công cụ, kiến trúc, hoặc cách thức phát triển.

Phương pháp Twelve-Factors có thể áp dụng cho các ứng dụng viết bằng ngôn ngữ lập trình bất kỳ và sử dụng kết hợp bất kỳ dịch vụ backend. Như tên gọi của nó Twelve-Factors bao gồm 12 yếu tố:
1. **Codebase** (Codebase được theo dõi với hệ thống quản lý phiên bản, và nhiều lần triển khai)
1. **Dependencies** (Khai báo rõ ràng và phân tách dependencies)
1. **Cấu hình** (Lưu trữ cấu hình trong môi trường)
1. **Dịch vụ hỗ trợ** (Dịch vụ hỗ trợ như tài nguyên bổ sung)
1. **Xây dựng, phát hành, vận hành** (Tách biệt hoàn toàn giữa các bước xây dựng và vận hành)
1. **Tiến trình** (Vận hành ứng dụng như là một hoặc nhiều tiến trình phi trạng thái)
1. **Mở cổng mạng** (Cung cấp các dịch vụ thông qua cổng mạng)
1. **Đồng bộ** (Mở rộng theo chiều ngang thông qua mô hình tiến trình)
1. **Tính khả dụng** (Tối ưu hóa với việc khởi động nhanh và dừng phần mềm ổn định)
1. **Sự tương đồng giữa quá trình phát triển và vận hành thực tế** (Giữ cho môi trường development, staging, production giống nhau nhất có thể)
1. **Nhật ký** (Nhật ký coi như là các luồng sự kiện)
1. **Tiến trình quản trị** (Thực thi nhiệm vụ quản trị như là một tiến trình)

Chúng ta hãy cùng tìm hiểu rõ hơn về 12 yếu tố này:

### 1, Codebase
Mã code sẽ luôn được theo dõi bởi hệ thống quản lý phiên bản như là Git. Một bản lưu của cơ sở dữ liệu các phiên bản được gọi là kho mã (code repository). Một mã code là bất kỳ một repo riêng lẻ (trong một hệ thống quản lý phiên bản thống nhất như Subversion), hoặc bất kì một nhóm các repo chia sẻ cùng một commit nguồn (trong một hệ thống quản lý phiên bản kiểu phân quyển như Git).

![](https://images.viblo.asia/ebb57033-f2ef-49a9-94fa-d34d0c6cdfa3.png)


Sẽ luôn luôn có sự tương quan 1-1 giữa mã code và ứng dụng:
* Nếu có nhiều mã gốc, đấy không phải là một ứng dụng – mà là một hệ thống phân tán. Với các phần tử trong một hệ thống phân tán là một ứng dụng, với mỗi cá thể tuân theo luật Twelve-Factor.
* Nhiều ứng dụng chia sẻ cùng một mã là vi phạm luật của Twelve-Factor. Giải pháp ở đây là xem xét để nhóm các mã chia sẻ thành các thư viện mà có thể được nhúng vào thông qua trình quản lý các gói phụ thuộc (dependency manager).

Chỉ có một mã gốc từng ứng dụng, nhưng sẽ có nhiều deploy của một ứng dụng. Đây là trường hợp rất phổ biến của các trang đã đi vào hoạt động. Thêm vào đó mỗi lập trình viên sẽ có một bản lưu ứng dụng đang chạy trên local, mỗi bản đều được coi là 1 deploy.

Mã code sẽ giống nhau trên các deploy, tuy phiên bản khác nhau có thể hoạt động trên mỗi deploy.

### 2, Dependencies

Hầu hết các ngôn ngữ lập trình đề cung cấp hệ thống để phân phối các thư viện hỗ trợ, ví dụ Rubygems cho Ruby. Các thư viện cài đặt thông qua một hệ thống gói có thể cài đặt như 1 site packages hay được nhóm trong một thư mục kèm ứng dụng (còn được gọi là "vendoring" hay "bundling")

Một ứng dụng 12-hệ số không bao giờ phụ thuộc vào sự hiện diện tuyệt đối của các gói hệ thống. Nó khai báo toàn bộ dependencies hoàn toàn thông qua bản kê khai khai báo phụ thuộc. Hơn thế nữa nó còn sử dụng công cụ phân cách phụ thuộc trong quá trình thực thi để đảm bảo rằng không có dependencies tuyệt đối nào bị “lọt” vào trong các hệ thống xung quanh. Khai báo đầy đủ và rõ ràng dependencies được áp dụng đồng đều cho cả hệ thống sản xuất và phát triển.

Lấy ví dụ với `Gem Bundler` của Ruby cung cấp định dạng kê khai phụ thuộc `Gemfile` để khai báo gem và `bundle exec` để phân cách phụ thuộc. Bất kể công cụ là gì, kê khai phụ thuộc và phân cách luôn phải đi đôi với nhau

Một lợi ích khác của khai báo dependencies rõ ràng là nó đơn giản hóa qua trình cài đặt cho lập trình viên mới tiếp nhận dự án.Các lập trình viên mới có thể lấy về mã trên hệ thống phát triển của họ, chỉ với một yêu cầu là cài đặt trước ngôn ngữ lập trình và trình quản lý phụ thuộc. Chúng có thể được dùng để thiết lập mọi thứ cần để vận hành một ứng dụng với một lệnh biên dịch/xây dựng định sẵn. Ví dụ với lệnh thiết lập cho Ruby là `bundle install`

Các Twelve-Factor App đồng thời có thể không phụ thuộc vào bất cứ sự hiện diện của các công cụ hệ thống tuyệt đối nào. Ví dụ như các công cụ cài đặt sẵn như ImageMagick hay curl. Trong khi các công cụ trên có thể hiện diện trên đa số các hệ thống, nhưng không có gì bảo đảm là chúng sẽ hiện diện trên toàn bộ các hệ thống mà ứng dụng có thể chạy trong tương lai, hoặc có chăng phiên bản tìm thấy trên các hệ thống tương lai sẽ tương thích với ứng dụng. Nếu ứng dụng cần được cài sẵn như một công cụ hệ thống, các công cụ đó nên được đi kèm cùng với ứng dụng.

### 3, Cấu hình
Cấu hình của ứng dụng là những thứ có thể thay đổi qua các môi trường (development, staging, production). Nó bao gồm:
* Database, hệ thống cached, dịch vụ hỗ trợ
* Thông tin đăng nhập đến các dịch vụ như là AmazonS3, Twitter, ...
* Các giá trị ứng với từng deploy

Cấc ứng dụng thường lưu trữ cấu hình như là hằng số trong mã code. Điều này không phù hợp với nguyên tắc của Twelve-Factor App, yêu cầu tách biệt config ra khỏi mã code. Các cấu hình thay đổi qua các deploy còn mã code thì không.

Câu hình ở đây không bao gồm các cấu hình nội tại của ứng dụng ví dụ như là routes. Những cấu hình này thường không thay đổi giữa các deploy.

Một cách tiếp cận khác với các cấu hình là sử dụng các tệp cấu hình mà tệp tin đó không được quản lý bởi phiên bản, như là `config/database.yml` trong Rails. Đây là một cải tiến so với việc sử dụng hằng số nhưng nó vẫn có những nhược điểm như là: dễ bị thêm nhầm vào quản lý phiên bản, dễ bị phân tán ở những nơi khác nhau và các định dạng khác nhau, làm cho nó trở nên khó đọc và khó quản lý một cách tập trung. Ngoài ra, định dạng của các file này thường chỉ đặc tả cho một ngôn ngữ.

Trong Twelve-Factor App sử dụng các biến môi trường (env) để cấu hình. Các biến môi trường này rất dễ thay đổi giữa các deploy mà không phải thay đổi mã nguồn.

Một khía cạnh khác của quản lý cấu hình là nhóm các cấu hình. Đôi khi, các ứng dụng tổ chức cấu hình theo nhóm (thường được gọi là "các môi trường") được đặt tên theo các triển khai như môi trường `development`, `test`, `production`. Nếu một dự án phát triển, lập trình viên có thể thêm các môi trường của riêng mình.

Trong một ứng dụng Twelve-Factor, các biến môi trường được quản lý chi tiết, hoàn toàn độc lập với các biến môi trường khác. Chúng có thể không được nhóm với nhau như là các môi trường, nhưng thay vào đó được quản lý độc lập theo các deploy. Mô hình này giúp việc mở rộng trở nên trơn tru, dễ dàng cho việc thêm các deploy theo vòng đời của ứng dụng.

### 4, Dịch vụ hỗ trợ

Dịch vụ hỗ trợ là các dịch vụ mà ứng dụng sử dụng thông qua mạng như là một thành phần trong vận hành. Ví dụ như là nơi lưu trữ dữ liệu, hệ thống gửi thư điện tử, ...

Dịch vụ hỗ trợ như cơ sở dữ liệu thường được quản lý bởi chính hệ thống quản trị của dịch vụ đó trong quá trình triển khai ứng dụng. Các ứng dụng có thể sử dụng các dịch vụ được cung cấp và quản lý bởi bên thứ ba. Ví dụ như các dịch vụ SMTP (như Postmark), dịch vụ lưu trữ (như Amazon S3), các dịch vụ sử dụng API (như Twitter, Google Maps, ...)

Mã code của ứng dụng áp dụng Twelve-Factor cho phép không có sự khác biệt giữa dịch vụ cục bộ và bên thứ 3. Một deploy của ứng dụng có thể chuyển đổi giữa cơ sở dữ liệu MySQL cục bộ với một cơ sở dữ liệu được quản lý bởi bên thứ 3 mà không phải thay đổi bất kỳ một đoạn code nào. Chúng ta chỉ cần thay đổi các env trong cấu hình.

Mỗi dịch vụ hỗ trợ riêng biệt là một tài nguyên. Ví dụ, cơ sở dữ liệu MySQL là một tài nguyên, hai cơ sở dữ liệu MySQL (sử dụng cho việc phân tách ở tầng ứng dụng) được xác định là hai tài nguyên riêng biệt.

![](https://images.viblo.asia/506895ef-d217-4dd0-b8be-e97af3a457d7.png)


Tài nguyên có thể được thêm vào deploy khi cần thiết. Ví dụ, nếu cơ sở dũ liệu của ứng dụng bị mất do phần cứng, quản trị viên của ứng dụng có thể thêm vào một máy chủ cơ sở dữ liệu được khôi phục từ các sao lưu trước đó. Các thay đổi bao gồm cơ sở dữ liệu chính đang sử dụng có thể được loại bỏ, và bổ xung cơ sở dữ liệu mới có thể xảy ra mà không cần thay đổi bất kỳ một đoạn mã nguồn nào.

(Còn tiếp)

Tài liệu dịch: https://www.12factor.net/
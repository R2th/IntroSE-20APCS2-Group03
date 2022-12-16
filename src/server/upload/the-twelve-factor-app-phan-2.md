Trong lần trước mình đã giới thiệu với mọi người về Twelve-Factor App và 4 yếu tố đầu tiên của Twelve-Factor App là Codebase, Dependencies, Cấu hình và Backing service. Mọi người có thể xem lại phần 1 [tại đây](https://viblo.asia/p/the-twelve-factor-app-phan-1-oOVlYzzn58W). Trong bài viết lần này mình sẽ giới thiệu nốt với mọi người về 8 yếu tố còn lại của Twelve-Factor App.

## 5, Build, release, run
Codebase sẽ được chuyển qua triển khai thông qua 3 bước:

**Bước xây dựng (build)** là bước chuyển các đoạn mã thành các gói có khả năng thực thị được gọi là một bản dựng (a build). Sử dụng phiên bản của mã nguồn ở 1 commit quy định bởi quy trình triển khai, bước xây dựng sẽ lấy về và cung cấp các dependencies và biên dịch các thành phần và tài nguyên.

**Bước phát hành (release)** sử dụng các kết quả của bước xây dựng kết hợp với các cấu hình triển khai hiện tại. Kết quả của release bao gồm cả bản build và các cấu hình cho phép ứng dụng có thể được vận hành trong môi trường thực thi.

**Bước vận hành (runtime)** vận hành ứng dụng trong môi trường thực thi, bằng việc thực thi một tập các tiến trình của ứng dụng với một phiên bản release cụ thể.

![](https://images.viblo.asia/06b0fa9b-494e-43bf-bc91-c273082a2691.png)

Twelve-Factor App tách biệt hoàn toàn giữa các bước xây dựng, phát hành và vận hành. Ví dụ, chúng ta không thể tạo ra các thay đổi của mã nguồn khi đang vận hành, do đó không có khả năng quay ngược lại bước xây dựng.

Công cụ triển khai thường cung cấp công cụ quản lý các bản release, cùng với các ký pháp cho phép quay ngược lại bản phát hành trước đó. Ví dụ, công cụ triển khai Capistrano lưu trữ các phát hành trong thư mục con tên là `release`, nơi mà phiên bản hiện tại được liên kết tượng trưng đến thư mục release hiện tại. Lệnh `rollback` làm cho việc quay trở lại phiên bản trước trở nên dễ dàng.

Mỗi release đều có một định dạng duy nhất như ID, có thể dự vào thời gian release hoặc 1 số thứ tự tăng dần như v100. Các phiên bản được tạo ra thành một chuỗi liên tục và một phiên bản không thể được thay đổi sau khi nó được tạo ra, Bất cứ thay đổi nào đều tao ra một bản release mới.

Các bước xây dựng được khởi tạo với developer khi mà mã nguồn được triển khai. Thời gian thực thi, ngược lại, có thể tự động xảy ra trong trường hợp các máy chủ được khởi động, hoặc tiến trình tạm dừng được khởi động lại. Do đó, bước vận hành nên được giữ các thành phần thay đổi càng ít các tốt, vì các sự cố xảy ra làm ứng dụng không vận hành được có thể gây ra các thiệt hại khi mà không có bất kỳ lập trình viên nào có thể khắc phục sự cố. 

## 6, Tiến trình
Ứng dụng được vận hành trong môi trường vận hành như là một hoặc nhiều tiến trình.

Trong trường hợp đơn giản, mã nguồn là các kịch bản độc lập, môi trường vận hành chính là máy tính của lập trình viên với ngôn ngữ thực thi được cài đặt, và tiến trình được khởi chạy thông qua dòng lệnh. Ở một khía cạnh khác, các triển khai thực tế của ứng dụng phức tạp có thể sử dụng nhiều loại tiến trình từ không, khởi tạo từ không cho đến chạy nhiều tiến trình.

Tiến trình của Twelve-Factor App là phi trạng thái và không chia sẻ bất kỳ tài nguyên nào. Bất kỳ dữ liệu nào cần lưu trữ lâu dài cần được lưu trữ trong backing service, thông thường là cơ sở dữ liệu.

Không gian bộ nhớ hoặc hệ thống tệp tin của tiến trình có thể được sử dụng như là bộ đệm tạm thời, thông qua luồng xử lý duy nhất. Ví dụ, việc tải một tệp tin lớn, tiến trình tải xuống và lưu trữ kết quả của tiến trình được lưu trữ trong cơ sở dữ liệu. Ứng dụng Twelve-Factor không bao giờ không bao giờ giả định có bất cứ cơ chế nào của bộ nhớ hay ổ đĩa sẵn sàng cho các yêu cầu trong tương lai - với nhiều tiến trình của mỗi kiểu vận hành, khả năng cao là yêu cầu trong tương lai sẽ được phục vụ bởi 1 tiến trình khác. Ngay cả khi chỉ chạy một tiến trình, việc khởi động lại thường sẽ loại bỏ toàn bộ trạng thái cục bộ.

Một vài hệ thống web dựa vào "sticky sessions" - đó là cơ chế lưu trữ tạm thời các dữ liệu của người dùng theo phiên làm việc trong bộ nhớ của các tiến trình vận hành ứng dụng và trông đợi các yêu cầu từ cùng một người dùng được định hướng tới cùng tiến trình tiến trình. Sticky session đã vi phạm nguyên tắc của Twelve-Factor App và không nên được sử dụng hoặc áp dụng theo. Dữ liệu trạng thái của phiên làm việc nên được lưu trữ trong các nơi lưu trữ cung cấp khả năng hết hạn theo thời gian như là Redis.

## 7, Mở cổng mạng

Các ứng dụng web thường được thực thi bên trong một máy chủ web. Ví dụ ứng dụng PHP có thể thực thi như là một thành phần của Apache HTTPD, hoặc ứng dụng Rails có thể thực thi thông qua Puma.

Twelve-Factor App có khả năng tự đóng gói hoàn toàn chính nó và không phụ thuộc vào việc tích hợp thêm máy chủ web trong thời gian thực thi vào môi trường thực thi để tạo ra dịch vụ web. Ứng dụng web cung cấp cơ chế HTTP như là dịch vụ bởi việc mở một cổng nhất định, và lắng nghe các yêu cầu được gửi tới cổng này.

Trong môi trường phát triển cục bộ, lập trình viên có thể truy cập dịch vụ thông qua URL như là `http://localhost:3000` để truy cập đến các dịch vụ được cung cấp bởi ứng dụng của họ. Trong triển khai, lớp điều khiển luồng sẽ điều khiển các yêu cầu từ đường dẫn công khai thông qua tên máy chủ đến tiến trình cung cấp cổng ứng dụng.

HTTP không phải là dịch vụ duy nhất mà có thể cung cấp việc mở cổng mạng. Gần như bất kỳ máy chủ phần mềm nào cũng có thể vận hành như là tiến trình mở cổng mạng và chờ đợi các yêu cầu được gửi tới.

Chú ý là cách tiếp cận bằng cách mở cổng mạng có nghĩa là ứng dụng có thể trở thành dịch vụ hỗ trợ (backing service) cho bất kỳ ứng dụng nào khác, bằng việc cung cấp URL đến backing service như là tài nguyên được điều khiển trong cấu hình cho ứng dụng cần sử dụng dịch vụ.

## 8, Đồng bộ
Bất kỳ chương trình máy tình nào , khi vận hành, đều được đại diện bởi một hoặc nhiều tiến trình vận hành. Ví dụ, tiến trình PHP vận hành như là tiến trình con của Apache, chạy như một tiến trình nền dựa vào số lượng yêu cầu được gửi đến. Các tiến trình vận hành hiện hữu rất ít đối với các developer

![](https://images.viblo.asia/e3483de7-d302-43c1-b13b-70997ee5d81c.png)

Trong Twelve-Factor App, các tiến trình thành phần là nền tảng đầu tiên. Các tiến trình này sử dụng các tín hiệu rõ rệt từ các mô hình tiến trình của unix cho các dịch vụ chạy nền. Sử dụng mô hình này, các lập trình viên có thể thiết kế ứng dụng của họ để điều khiển các công việc khác nhau bằng cách gán mỗi loại tương ứng với một kiểu tiến trình. Ví dụ, yêu cầu HTTP có thể được điều khiển bởi tiến trình web, các công việc chạy ngầm tốn thời gian có thể xử lý bằng các tiến trình worker.

Điều này không loại bỏ các tiến trình riêng lẻ khỏi việc quản lý các kênh nội bộ của tiến trình đó, thông qua các luồng bên trong máy ảo đang thực thi, hoặc mô hình bất đồng bộ/sự kiện trong các công cụ như là Node.js. Nhưng một máy ảo riêng biệt chỉ có thể mở rộng quá lớn theo chiều dọc, do đó ứng dụng cũng phải có khả năng mở rộng nhiều tiến trình đang chạy trên nhiều máy vật lý.

Mô hình tiến trình thực sự nổi trội khi mà việc mở rộng tài nguyên trở nên phổ biến. Việc không chia sẻ, phân hoạch tự nhiên của các tiến trình của Twelve-Factor App có nghĩa là việc thêm nhiều tiến trình đồng bộ là một hoạt động đơn giản và tin cậy.

## 9, Tính khả dụng
Tiến trình của Twelve-Factor App luôn sẵn sàng, tức là bạn có thể chạy hoặc dừng phần mềm tại một thời điểm báo trước. Điều này tạo điều kiện cho việc mở rộng trở nên dễ dàng hơn, việc triển khai nhanh các thay đổi của mã nguồn hoặc cấu hình, và sự linh hoạt quá trình triển khai sản phẩm.

Các tiến trình nên cố gắng giảm thiểu thời gian khởi động. Lý tưởng nhất, một tiến trình chỉ cần một vài giây kể từ khi có lệnh khởi động cho đến khi tiến trình bắt đầu và sẵn sàng để nhận yêu cầu hay bắt đầu công việc. Thời gian khởi động ngắn cho phép quá trình triển khai và mở rộng nhanh hơn và hỗ trợ mạnh mẽ hơn, vì hệ thống quản lý các tiến trình có thể dễ dàng mang các tiến trình tới các máy chủ vật lý khi có các cảnh báo.

Tiến trình ngừng hoạt động linh hoạt khi chúng nhận được một tín hiệu chấm dứt tiến trình SIGTERM từ hệ thống quản lý tiến trình. Đối với ứng dụng web, việc ngừng hoạt động linh hoạt rất dễ thực hiện bằng cách ngừng lắng nghe trên cổng dịch vụ(từ chối bất kỳ yêu cầu nào), cho phép các yêu cầu hiện tại được kết thúc và thoát ra. Ý tưởng của mô hình này là yêu cầu HTTP cần thực hiện trong thời gian ngắn, hoặc trong trường hợp kết nối lâu hơn, ứng dụng cần thực hiện kết nối lại khi các kết nối đã bị mất.

Đối với các tiến trình thực thi, việc ngừng hoạt động linh hoạt có thể đạt được bằng cách trả các công việc trở lại hàng đợi. Các tiến trình cũng có thể có khả năng chống lại các lỗi bất thường, như các thiết bị phần cứng đột nhiên ngừng hoạt động. Điều này thường ít xảy ra hơn là việc ngừng hoạt động với tín hiệu SIGTERM, nhưng vẫn có khả năng xảy ra. Cách tiếp cận thường được khuyến nghị là sử dụng cơ chế hàng đợi backend, như là Beanstalkd, các công việc quay trở lại hàng đợi khi mà các kết nối bị ngừng hoặc quá hạn thời gian.

## 10, Sự tương đồng giữa quá trình phát triển và vận hành thực tế

Trước đây, có sự khác biệt nhất định giữa quá trình phát triển (lập trình viên có thể tạo ra các bản chỉnh sửa triển khai cục bộ của ứng dụng) và vận hành thực tế (phiên bản được triển khai thực tế và truy cập bởi khách hàng). Khác biệt này được thể hiện ở 3 lĩnh vực:

**Về thời gian:** Lập trình viên có thể làm việc với mã nguồn hàng ngày, hàng tuần để có một pphieen bản vận hành thực tế.

**Về tính cá nhân:** Lập trình viên viết mã nguồn, người vận hành triển khai mã nguồn đó.

**Về công cụ:** Lập trình viên có thể sử dụng các công cụ như là Nginx, SQLite, trong khi triển khai thực tế sử dụng Apache, MySQL.

Twelve-Factor App được thiết kế để triển khai liên tục bằng việc giảm thiểu khác biệt giữa quá trình triển khai và vận hành thực tế. Chúng ta cùng xem sự khác biệt ở trên:

**Giảm thiểu thời gian:** lập trình viên có thể viết mã nguồn và nó được triển khai vài giờ sau đó.

**Giảm thiểu tính cá nhân:** lập trình viên người viết ra các dòng lệnh, có thể tham gia trực tiếp vào quá trình triển khai và quan sát các hành vi của ứng dụng trong thời gian vận hành thực tế.

**Giảm thiểu các công cụ:** đảm bảo sự tương đồng giữa môi trường phát triển và vận hành.

Backing service, như là cơ sở dữ liệu của ứng dụng, hệ thống hàng đợi hoặc bộ đệm, là nơi mà thường có sự khác biệt giữa môi trường phát triển và vận hành. Rất nhiều ngôn ngữ cung cấp các thư viện, bao gồm nhiều mô phỏng của các loại dịch vụ khác nhau được cung cấp để làm đơn giản hóa việc truy cập các dịch vụ hỗ trợ.

Lập trình viên thường thích sử dụng các backing service đơn giản trên môi trường cục bộ của họ, trong khi nhiều backing service mạnh mẽ và an toàn hơn được sử dụng trong môi trường vận hành thực tế. Ví dụ, sử dụng SQLite ở cục bộ và Postgresql trong vận hành, hoặc sử dụng trực tiếp bộ nhớ cho bộ đệm trong phát triển và Memcached trong vận hành.

Twelve-Factor App không cho phép sử dụng backing service khác nhau giữa môi trường phát triển và vận hành, mặc dù các bộ mô phỏng có thể trừu tượng hóa bất kỳ sự khác biệt của backing service. Sự khác biệt giữa backing service có nghĩa là dù bất kỳ sự không đồng bộ nhỏ nào cũng có thể mở rộng, là nguyên nhân cho việc mã nguồn có thể hoạt động tốt ở môi trường phát triển hoặc kiểm thử nhưng không hoạt động ở môi trường thực tế. Các kiểu lỗi này thường làm cản trở quá trình triển khai liên tục. Chi phí cho các cản trở và làm giảm ảnh hưởng cho chúng thường rất tốn kém trong quá trình phát triển của một số ứng dụng.

Bộ mô phỏng đối với các backing service vẫn có ích, vì chúng làm giảm ảnh hưởng của việc chuyển đổi sang backing service mới. Nhưng tất cả các bước triển khai của ứng dụng (môi trường của lập trình viên, kiểm thử, vận hành thực tế) nên sử dụng một loại và phiên bản của các kiểu backing service.

## 11, Logs
Logs (nhật ký) cung cấp khả năng thể hiện các hành vi của ứng dụng đang vận hành, trong môi trường máy chủ chúng thường được ghi lại thành các tệp tin trên ổ đĩa cứng (logfile), nhưng chỉ có một định dạng biểu diễn duy nhất.

Logs như là luồng của sự kết hợp, theo trình tự thời gian của các sự kiện, được thu thập từ các luồng ra của tiến trình đang vận hành và dịch vụ hỗ trợ của ứng dụng. Nhật ký ở dạng nguyên gốc thường là các chuỗi ký tự được định dạng với mỗi sự kiện trên một dòng (mặc dù các truy vết của ngoại lệ thường được chia thành nhiều dòng). Logs không có định điểm bắt đầu hay kết thúc, nhưng là luồng liên tục miễn là ứng dụng vẫn đang vận hành.

Twelve-Factor App không bao giờ quan tâm đến việc điều hướng hay lưu trữ luồng đầu ra. Ứng dụng không nên ghi hoặc quản lý các logfiles. Thay vào đó, mỗi tiến trình đang vận hành ghi các luồng sự kiện. Trong môi trường phát triển cục bộ, lập trình viên sẽ xem các luồng này ở trên thiết bị đầu cuối để nắm bắt được hành vi của ứng dụng.

Trong quá trình triển khai hoặc kiểm thử, mỗi luồng của tiến trình sẽ được lưu trữ bởi môi trường thực thi, kết hợp cùng với tất cả các luồng của ứng dụng, và định hướng đến một hoặc nhiều điểm đến cuối dùng để đọc và lưu trữ lâu dài.

Luồng sự kiện của ứng dụng có thể định hướng ra các tệp tin, hoặc xem xét thời gian thực ở thiết bị đầu cuối. Hơn nữa, luồng còn có thể được đánh chỉ mục và phân tích bởi hệ thống như là Splunk hay Hadoop/Hive. Các hệ thống này cung cấp các công cụ mạnh mẽ và linh hoạt cho việc phân tích hành vi của ứng dụng theo thời gian.

## 12, Tiến trình quản trị
Hệ thống các tiến trình là danh sách các tiến trình được sử dụng để thực thi các nghiệp vụ của ứng dụng khi cúng vận hành. Ngoài ra, lập trình viên thường mong muốn thực hiện các nhiệm vụ quản trị ứng dụng như là:

* Áp dụng các thay đổi cho cơ sở dữ liệu (như là rails db:migrate với Rails).
* Giao diện điều khiển trực tiếp ứng dụng để vận hành các đoạn mã nguồn tùy ý hoặc kiểm tra các models của ứng dụng với cơ sở dữ liệu hiện tại.
* Thực thi một lần đoạn kịch bản được quản lý trên kho mã nguồn của ứng dụng.

Tiến trình quản trị thực thi một lần nên được vận hành trong một môi trường giống như tiến trình vận hành lâu dài của ứng dụng. Với một bản release, các tiến trình quản trị sử dụng cùng mà nguồn và cấu hình như bất kỳ các tiến trình vận hành trong bản release đó. Đoạn mã quản trị cần được triển khai cùng  với mã nguồn của ứng dụng để đảm bảo không có các vấn đề về mặt đồng bộ hóa.

Twelve-Factor App ưu tiên sử dụng các ngôn ngữ cung cấp REPL shell linh hoạt, và làm nó trở nên dễ dàng cho việc thực thi một lần các kịch bản. Trong môi trường triển khai cục bộ, lập trình viên thực thi các tiến trình quản trị bằng cách thực thi trực tiếp các câu lệnh trong thư mục lưu trữ mã nguồn của ứng dụng. Trong môi trường vận hành thực tế, lập trình viên có thể sử dụng ssh hoặc các câu lệnh điều khiển thực thi cơ chế được cung cấp bởi môi trường vận hành của quá trình triển khai để thực thi các tiến trình.

Tài liệu dịch: https://www.12factor.net/
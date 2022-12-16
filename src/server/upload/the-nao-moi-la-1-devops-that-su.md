Phương pháp luận biện chứng duy vật về ngành nghề hot nhất trên thị trường tuyển dụng IT hiện nay: **DevOps**

Xin chào các bạn, cũng lâu rồi mình không lên sóng nhỉ. Chả là đợt vừa rồi mình bắt đầu đi làm trainer ở 1 số lớp học về Kubernetes nên hơi bận bịu. Hôm qua thì cũng vừa hay là buổi cuối với phần trình bày của mình về `Zero downtime application`. Phần trình bày thì không phải chỉ có gồm những kiến thức công nghệ, cấu hình,... mà còn có nhiều thứ khác liên quan tới quy trình tích hợp, thiết kế ứng dụng, devops,... Qua đó thì mình cũng có cơ hội hệ thống hoá lại những thành quả mình đạt được trong những năm trở lại đây khi tiếp cận với DevOps và Kubernetes.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/kzwbse5f62_image.png)

Trong bài viết này, hy vọng mình sẽ đưa cho các bạn 1 góc nhìn thực tế về cái gọi là DevOps tại các công ty, trong đó có những góc nhìn là chủ quan, có những góc nhìn là từ những người khác chứ không có đúng sai gì nên mong các bạn có thể thoải mái đưa ra quan điểm riêng sau bài viết để góp ý cho mình nhé.

## First things first

Đầu tiên lại là màn giới thiệu bản thân, vẫn là mình - **Minh Monmen** của mọi ngày nhưng thay vì là người dẫn dắt các bạn qua các trải nghiệm công nghệ thì hôm nay lại đóng vai trò là nhà triết học Đép-Lê Óp để kể về 1 triết lý làm việc mà mình theo đuổi từ khi mới đi làm tới giờ. Bài viết không chỉ nhắc tới khái niệm đang là trending hiện nay, mà còn kể lại những khó khăn khi tuyển dụng và lý do tại sao lại khó tìm kiếm được 1 DevOps chính hiệu đến thế. Rất mong các bạn sẽ ủng hộ bằng nhiều gạch đá.

**!!! Lưu ý: !!!** Sau những bài viết có hàm lượng technical lớn thì bài viết này gần như là **NON-TECH**, các bạn không nên chờ đợi công nghệ cao siêu gì ở đây mà nên kỳ vọng nó sẽ đưa lại cho các bạn 1 chút kinh nghiệm để các bạn build team.

## Câu chuyện 2 chiến tuyến

Câu chuyện bắt đầu từ 1 buổi training dành cho doanh nghiệp, mình có hỏi thử các anh em bên dưới: 

- `Các anh em nghĩ DevOps là cái gì và khoá học này để làm gì?`

1 anh dev nói (mình không quote chính xác được mà chỉ nhớ ý nhé):

- `Thì giờ DevOps rồi container docker đang là xu hướng rồi, đi học để  hợp với xu thế và không lạc hậu, Devops là vừa dev vừa triển khai trên server các thứ.`

1 anh sysadmin nói:

- `Theo mình thì DevOps là các công cụ tự động thay thế việc của con người, thay vì mình phải deploy code bằng tay thì sẽ có tool làm tự động`

Đây là 2 ý kiến từ 2 đầu **chiến tuyến**. Tại sao mình lại gọi là 2 chiến tuyến, là bởi vì ngay từ khi đi làm với công ty đầu tiên thì mình đã nhìn thấy luôn có 1 bức tường vô hình ngăn cách giữa team Dev và team Sys của 1 công ty. Xuất phát từ nhu cầu trái ngược, thói quen trái ngược, hiểu biết trái ngược dẫn tới việc cùng làm việc trên 1 sản phẩm diễn ra tương đối rắc rối nhưng lại không hiệu quả. Ví dụ tới lúc hệ thống có lỗi, ông dev không được cấp quyền vào hệ thống thì đòi log, debug, ông sys có log nhưng lại không hiểu nội dung bên trong là lỗi chỗ nào,... dẫn tới việc xử lý rất lâu la và lề mề. 

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/jwenu19bnu_image.png)

Lúc đó mình đã phải xin phép leader để **đi đêm** với team Sys, tức là tạo ra 1 ngoại lệ để mình có thể truy cập vào hệ thống và debug xử lý lỗi. Tất nhiên đây không phải là thứ nên làm ở các hệ thống lớn nhưng là cách để bọn mình có thể xử lý lỗi nhanh nhất có thể. Lúc đó mọi người ngầm thành lập ra cái gọi là **đội phản ứng nhanh** chuyên xử lý lỗi và có quyền vượt trên các team dev lúc đó khi vừa có hiểu biết sâu về ứng dụng, có quyền truy cập các tài nguyên server. Đây chính là cái mà chúng ta gọi là **DevOps** sau này.

Trở lại với câu chuyện tại doanh nghiệp kia, các bạn có thể thấy rõ ràng là góc nhìn từ 2 phía xuất phát từ những kinh nghiệm cũng đặc điểm công việc của từng bên. Bên Dev thì nghĩ DevOps là Dev và thêm phần cài đặt server, còn bên Ops thì nghĩ DevOps là Sys thêm phần tự động hoá. Chính vì điểm này mà ở nhiều công ty Việt Nam mình thấy đang hơi lạm dụng khái niệm DevOps để đặt cho các team có sẵn của mình 1 cái tên mới. Đó là góc nhìn của họ, còn góc nhìn của mình thì sao?

## Ai là người cần thay đổi?

Sau khoảng 4 năm tiếp cận với docker, k8s, rồi DevOps thì mình đã thu được điều gì? Khác với nhiều anh em khác là sau quá trình làm việc thu được nào là những thứ như hiểu biết công nghệ về container, cloud, gitops, helm chart, cấu hình,... thì mình lại thu được 1 thứ khác và hiểu tại sao nói tới DevOps không phải là nói tới công cụ mà là nói tới 1 nền văn hoá làm việc. Đó chính là tìm ra **tiếng nói chung** của 2 team Dev và Ops (system, vận hành) thông qua việc **chia sẻ thông tin**, **feedback** và **thành lập quy trình làm việc**. Đây là quá trình cả 2 team đều phải thay đổi để đáp ứng, chứ không phải chỉ cài cắm vài cái CI/CD rồi có thể gọi là DevOps được. Hãy cùng nhìn lại khái niệm DevOps 1 chút:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/c2t1lwewg7_image.png)

Đây là bức ảnh nói lên tất cả, nhưng lại ít người hiểu nó đầy đủ. DevOps phải xuất phát ngay từ khâu `plan` chứ không phải là tới khi `release` mới bắt đầu như hầu hết cách làm việc theo team hiện tại. Mình lấy ví dụ 1 quy trình tại công ty cũ của mình:

- Dev và Dev lead đưa ra plan về code
- Dev code logic, implement xong
- Gửi email yêu cầu Sys cung cấp server / cài đặt DB
- Sys sau khi cài đặt xong hạ tầng sẽ tiến hành build code và deploy lên các môi trường.

Đây là 1 quy trình hết sức đơn giản, Sys Admin chỉ tham gia vào khâu cuối cùng, khi mà Dev đã hoàn thành việc code. Điều này làm phát sinh những vấn đề liên quan tới hạ tầng mà có thể phía Dev không lường trước như:

- Sys team không có kinh nghiệm vận hành 1 loại DB mới
- Kiến trúc app không phù hợp với môi trường triển khai như log ra nhiều file, env fix trong code,...
- Tài nguyên Sys cấp không đủ khi ứng dụng cao tải hoặc quá thừa thãi
- vân vân và mây mây...

Quy trình này vẫn còn được sử dụng tới hiện tại, khi mà nhiều công ty đã có team DevOps luôn. Và chính là thứ tạo nên bức tường giữa 2 team, khi mà team này không biết (hoặc không được biết) team bên kia đang làm gì. Đây là thứ phải thay đổi, và phải thay đổi từ mindset của người quản lý.

## Những bức tường khó vượt qua

Ô kê, vậy thì khi tiếp cận với DevOps, khi mà 2 team phải hiểu về công việc của nhau thì sẽ có khó khăn gì?

Đối với team Dev:

- **Setup môi trường**, sao cho môi trường dev giống với môi trường production
- **Mindset của Ops**, tức là mindset về vận hành, theo dõi sản phẩm, tài nguyên,...
- **System-related problem**, như application life cycle, kill signal,...
- **Docker**, build và tối ưu docker image

Đối với team Sys:

- **Hiểu biết về ngôn ngữ**, các kiến thức liên quan tới package management, dependencies,... 
- **Logic ứng dụng**, các hiểu biết liên quan tới logic ứng dụng, luồng lạch các thứ,...
- **Kiến trúc ứng dụng**, kiến trúc các thành phần API, worker, cronjob,... và cách tương tác.

Những khó khăn này khiến cho team dev tạo ra những sản phẩm không phù hợp với hệ thống và ngược lại, hệ thống được team sys tạo ra không phù hợp với ứng dụng của team dev. Đây không hẳn chỉ là những khó khăn về mặt kiến thức (mà có thể được cải thiện qua việc học) mà còn có những khó khăn về mặt tổ chức, quy trình quy chế công ty, bảo mật, phân chia giai cấp,... khiến cho các bên bị thiếu thông tin hoặc bị xem nhẹ vai trò. Muốn vượt qua những bức tường rất cao này thì chẳng còn cách nào khác là thay đổi.

## Thay đổi hay là... sống một cách khó khăn

Tất nhiên, khi đề cập tới những thay đổi phía sau đây, mình không có ý nói rằng mọi doanh nghiệp, mọi môi trường đều phải áp dụng. Chúng ta hoàn toàn có thể giữ lại cách tổ chức team truyền thống, cách vận hành truyền thống, chỉ là nó sẽ khó khăn hơn 1 chút cho chúng ta ở những vấn đề trên mà thôi.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/88ufr8svfo_image.png)

Còn nếu các bạn muốn thay đổi, và có quyết tâm thay đổi, thì trước tiên cần phải tìm ra tiếng nói chung của 2 bên. Ông có thể kêu tiếng chó tiếng mèo tiếng hổ cũng được nhưng phải kêu cùng nhau. Và bọn mình đã làm điều đó bằng cách đội DevOps sẽ đưa ra 1 số quy tắc ví dụ như:

- **[12factor.net](https://12factor.net)**: Đây là thứ dễ thấy nhất vì nó đã được recommend 1 cách rộng rãi trong cộng đồng rồi. Đây là các rule để phát triển ứng dụng dễ dàng triển khai trên các hạ tầng, đặc biệt là container, cloud,...:
    + Config load từ biến môi trường
    + Chạy app dưới dạng stateless process
    + Log ra stdout, stderr
    + App có khả năng chạy nhiều instance
    + App phải handle phần life cycle (graceful shutdown)
    ...

- **Migration rule**: Ngoài phần thiết kế app ra thì lúc migration sẽ là lúc mà 2 team phải cọ xát với nhau nhiều nhất, do đó đặt ra rule cho phần này cũng rất quan trọng
    + Fast migration
    + Backward compatible
    ...

- **DevOps review**: Ngoài việc để dev và dev lead tự làm sản phẩm thì ý kiến của DevOps là rất quan trọng và phải được tham gia ngay từ khi bắt đầu làm sản phẩm chứ không phải khi mọi thứ đã xong xuôi. Trong đó bọn mình sẽ review về:
    + Kiến trúc app phù hợp hạ tầng không
    + Tài nguyên app sử dụng có vấn đề gì không
    ...

Để thực hiện được những cái này thì đòi hỏi cả Dev cũng phải trau dồi những kiến thức về hệ thống và phía DevOps cũng phải nâng cao hiểu biết về ứng dụng để đưa ra được những tư vấn chất lượng. Well, không phải ai cũng muốn học những thứ mình không mạnh, hay không quen, rồi các sếp cũng không đánh giá đúng vai trò của DevOps nên không cho phép tham gia từ đầu,... Như bọn mình đã phải rất khó khăn và vất vả đấu tranh để có thể đặt đúng vai trò của team DevOps cũng như force được đội phát triển follow theo những gì mà bọn mình đưa ra. Nhưng nếu họ follow được thì cuộc sống của bạn sẽ tự nhiên dễ thở hơn rất nhiều đó nhé.

## One quy trình rule them all

Chung quy lại, đội DevOps sẽ có 1 quy trình để nói chuyện với Dev, qua đó bọn mình sẽ yêu cầu được tham gia vào các giai đoạn phát triển khác nhau cũng như cho phép đội dev tham gia vào quá trình vận hành sản phẩm. Cụ thể quy trình sẽ như sau:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/a28mh4fvdc_devops.png)

**Bước Planning**: Lên kế hoạch và thiết kế sản phẩm thì bọn mình sẽ tham gia **review** 3 thứ là:

- **Application Architecture**: Kiến trúc ứng dụng, app có thành phần gì, kết nối nhau như nào, vai trò như nào,... 
- **Dependencies**: Những điều kiện cần thiết để chạy ứng dụng, như dùng DB gì, cache gì, message queue gì,... Liệu hệ thống có những thành phần đó chưa, maintain dễ dàng không,...
- **Sizing**: Dev sẽ đưa ra dự tính về tài nguyên sử dụng dựa trên việc tính toán lượng data có thể phát sinh. Phần này sẽ dùng để bọn mình sắp xếp tài nguyên cho hợp lý.

Ngoài ra trong bước planning thì bọn mình cũng đưa ra guideline về **Git**, cách chia branch, chia môi trường,...

**Bước Coding**: Phần code này chủ yếu bọn mình sẽ đưa guideline cho dev về việc phát triển ứng dụng đáp ứng được hạ tầng bên dưới (cụ thể là Kubernetes), trong đó sẽ có những phần thuộc cái 12factor này:

- **Config**: Config được đặt ở đâu, cái gì nên đưa vào config cái gì thì không,... 
- **Logging**: Log được bắn ra theo các level ra stdout, stderr
- **Healthcheck**: Để triển khai được thì các service phải implement healthcheck.
- **Concurrency**: Ứng dụng support việc scale theo chiều ngang
- **Disposability**: Ứng dụng phải handle các system signal như `SIGTERM`, `SIGINT`,... để graceful shutdown
- **Tracing**: Ngoài ra còn phải tích hợp các tool tracing của hệ thống mà đơn giản nhất là error tracing qua sentry chẳng hạn.

**Bước Deploying**: Phần này là bước thường xuyên lặp lại trong quá trình team dev update application, thì bọn mình sẽ đưa ra 1 flow để triển khai ứng dụng với những yêu cầu sau:

- **Deploy request**: Tạo deploy request cho team DevOps với các chi tiết liên quan đến thông tin app mới, cần release khi nào môi trường gì,...
- **Release note**: Mỗi bản deploy này sẽ cần có release note để xem có những gì thay đổi, phần này giúp khi triển khai xong team có thể focus vào những thứ đó xem hoạt động ok chưa.
- **Affected service**: Đưa ra danh sách những service khác bị ảnh hưởng và mức độ ảnh hưởng, ảnh hưởng ra sao để bọn mình biết và có phương án theo dõi.
- **Migration steps**: Đây là phần chi tiết các bước thực hiện migration, thường dùng cho database hoặc breaking change. Bọn mình cũng sẽ review lại xem phương án migration này có khả thi và có ảnh hưởng gì tới hoạt động của hệ thống không.

**Bước Operating**: Đây là phần cuối, bọn mình sẽ cung cấp ngược trở lại cho dev những công cụ để theo dõi hệ thống, cho phép Dev can thiệp sâu hơn vào việc vận hành sản phẩm. Bao gồm:

- **Centralize logs**: Hệ thống log tập trung
- **Resource monitoring**: Hệ thống monitor tài nguyên server, application metrics,...
- **CI/CD dashboard**: Dev sẽ biết được tiến trình CI/CD đang được thực hiện tới đâu, trên server app triển khai ra sao.
- **Error tracing**: Công cụ trace error hoặc trace activity
- **Notification**: Setup thông báo các sự kiện hệ thống để Dev cũng nắm được như quá trình triển khai, downtime,...

## Một chút suy nghĩ cuối cùng

Mặc dù nghĩ tới DevOps là sẽ nghĩ tới những công cụ tự động để thay thế con người, tuy nhiên để có thể đạt được điều đó thì vai trò của con người lại phải được đặt lên hàng đầu. Nghe thì rất vô lý nhưng lại rất thuyết phục các bạn ạ =))) Bởi vì DevOps không chỉ có 1 bụm tool và setup nó lên mà quan trọng hơn là việc các bạn sử dụng những tool đó vào việc gì, sắp xếp nó ra sao và nhất là việc chia sẻ thông tin cũng như vai trò của 2 team Dev - Ops diễn ra thế nào. 

Điều quan trọng nhất mà bọn mình đã làm được chính là việc yêu cầu tham gia vào phát triển sản phẩm từ khâu đầu tiên, khi đó phía dev sẽ có những góp ý của bọn mình về mặt hạ tầng cũng như bọn mình có đủ thông tin để lên kế hoạch testing, scaling,... sau này. Chắc chắn điều này không dễ dàng với cả 2 phía vì những ràng buộc về mặt tổ chức cũng như kiến thức. Nhưng hãy tự tin lên và tạo ra thay đổi với công ty ngay từ bây giờ, bởi vì đó là việc làm cần thiết cho việc phát triển nhanh chóng và bền vững.

Hết rồi, cảm ơn các bạn đã lắng nghe.
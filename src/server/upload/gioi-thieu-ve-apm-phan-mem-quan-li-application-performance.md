Nguồn bài viết : [APM（アプリケーション性能管理）ツール5選 | ニーズが高まる理由・重要性を解説](https://boxil.jp/mag/a3041/)



Trong bài viết này tôi sẽ giải thích khái quát về APM (Application Performance Management), thứ được quan tâm để đảm bảo vận hành ổn định Web service, và giới thiệu những APM tool tiêu biểu.

Ngày nay rất nhiều doanh nghiệp sử dụng nhiều loại Web service trong nghiệp vụ hàng ngày để nâng cao hiệu suất công việc, song trong khi sử dụng lại phát sinh các vấn đề như response của hệ thống bị chậm, khiến các doanh nghiệp lo lắng về vấn đề tính năng của application. 

Mà các vấn đề về tính năng thì việc tìm ra nguyên nhân thường mất khá nhiều thời gian, hơn nữa cũng không ít trường hợp khi phát triển hệ thống không test kĩ dẫn đến sau khi đưa vào sử dụng tính năng bị giảm rõ rệt.

Những năm gần đây APM được quan tâm chú ý như 1 giải pháp để giải quyết những vấn đề nêu trên. Việc sử dụng APM đem lại lợi ích là giảm được cost để xử lí các sự cố xảy ra, đồng thời khi vận hành được 1 hệ thống ổn định thì sẽ tăng được mức độ hài lòng của khách hàng, tăng được giá trị của sản phẩm .

Bởi vậy trong bài viết này tôi sẽ giải thích về tầm quan trọng của APM, những tool tiêu biểu và những điểm cần lưu ý khi đưa APM vào sử dụng.

# APM（Application Performance Management）là gì
APM là 1 hệ thống quản lí tình hình hoạt động của toàn bộ application thông qua việc giám sát tình trạng response của Web application hay điều tra các vấn đề về response time liên quan đến tính năng của hệ thống được các doanh nghiệp sử dụng.


Việc đưa APM vào sử dụng mang lại lợi ích như nhận biết, dự đoán được các vấn đề liên quan đến việc response chậm của hệ thống, có khả năng phòng ngừa trước các vấn đề có thể xảy ra, đồng thời khi vấn đề thực sự xảy ra thì giảm được thời gian điều tra đáng kể.

# Lý do nhu cầu sử dụng APM tăng cao
Một trong những lý do lớn ở đây là cùng với việc nhiều nghiệp vụ của doanh nghiệp hiện nay dần được thực hiện online dẫn đến độ lớn của transaction hệ thống tăng lên và trở nên phức tạp. 

Hơn nữa việc phát triển sử dụng cloud hay các kĩ thuật giả lập sẽ làm cho phạm vi giám sát hệ thống trở nên không rõ ràng khiến cho phía giám sát hệ thống không thể đáp ứng được những yêu cầu mà khách hàng đưa ra cũng là một lý do giải thích cho nhu cầu sử dụng APM dần tăng cao.

# Bối cảnh nhu cầu sử dụng APM
Việc phức tạp hóa các hệ thống do sự phát triển của IT chính là bối cảnh khiến cho nhu cầu sử dụng APM của các doanh nghiệp tăng cao.

Những năm gần đây những web system, network mà các doanh nghiệp sử dụng, hay những thiết bị dùng để tiếp cận thông tin mà các doanh nghiệp cung cấp ngày càng trở nên phức tạp, do đó việc duy trì sự ổn định của response ngày càng trở nên khó khăn hơn.

Đặc biệt là đối với các doanh nghiệp cung cấp dịch vụ trên nền tảng web thì response của hệ thống có liên hệ trực tiếp đến với độ hài lòng của khách hàng, do vậy việc quản lí application performance càng trở nên quan trọng.

# Tính cần thiết của APM
Như đã giải thích phía trên, việc hệ thống đang sử dụng có performance kém sẽ gây ra không ít ảnh hưởng cho việc vận hành của các doanh nghiệp. 

Từ trước đến nay khi vận hành 1 hệ thống thì thường quản lí riêng biệt các loại web system và network, nên nhiều trường hợp phía quản lí thấy rằng không có vấn đề gì nhưng phía end user thì nhận thấy rõ ràng đang có vấn đề về performance. 

Chính bởi vì hiện nay cần phải vận hành hệ thống trong môi trường IT ngày càng trở nên phức tạp nên việc quản lí tính năng của hệ thống nhìn từ quan điểm của end user ngày càng trở nên cần thiết. APM là 1 hệ thống được sinh ra để đáp ứng những nhu cầu đó.

# Lợi ích của việc đưa vào sử dụng APM tool
APM cơ bản là làm công việc giám sát tình trạng performance của hệ thống nhìn từ quan điểm người sử dụng. 


Do đó, không những có thể xử lí nhanh trong trường hợp hệ thống xảy ra lỗi mà còn có thể phân tích và làm rõ nguyên nhân một cách nhanh chóng, giúp cho người quản lí có thể giảm được việc phân tích những nguyên nhân phức tạp để chuyển sang xử lí vấn đề.

Hơn nữa người ta còn dự đoán tương lai sắp tới sẽ có những sản phẩm APM có độ tiện dụng cao, có thể giám sát tính năng cũng như transaction của application từ các thiết bị mobile và PC của khách hàng.

# Giới thiệu APM tool
Dưới đây tôi sẽ giới thiệu các tool phổ biến thường được sử dụng trong thực tế, giúp quản lí hệ thống một cách toàn thể và bao quát.

## AppDynamics
AppDynamics là software giám sát real time tính năng của nhiều loại web application như Java hay .NET…

Nó là một hệ thống giám sát hầu như không gây ảnh hưởng đến môi trường hệ thống được giám sát đang hoạt động và đồng thời cũng có thể giám sát được cả tình trạng xử lí của các service liên kết bên ngoài.  
Màn hình console được thiết kế trực quan dễ hiểu, đồng thời từ các dữ liệu thống kê tool này cũng tự động tạo ra map về tình trạng sử dụng của hệ thống nên khi có vấn đề gì của hệ thống có thể dễ dàng xử lí một cách nhanh chóng.

## dynaTrace
dynaTrace 1 APM tool của thời đại mới, có thể giúp phát triển ra nguyên nhân trực tiếp và nguyên nhân sâu xa của các vấn đề phát sinh trong hệ thống trong thời gian ngắn. 
Việc đưa vào sử dụng cũng rất đơn giản, không cần thiết phải thêm gì vào program sẵn có.

Tool này sẽ lưu lại xử lí của transaction từ khi bắt đầu đến khi kết thúc và giám sát tình trạng performance. Nhờ đó có thể nhanh chóng tìm ra những vấn đề của hệ thống và nguyên nhân để giải quyết.

## CA Application Performance Management（CA APM）

CA APM là một monitoring solution mang tính bao quát, giám sát từ user mobile đến main frame.

Tool này sẽ giúp phát hiện nhanh chóng những vấn đề gây chậm tính năng của application hay network trước khi các vấn đề gây hại cho khách hàng xảy ra. 

Những vấn đề này và nguyên nhân của chúng được gửi tới người quản lí real time, đồng thời chỉ ra một cách rõ ràng những điểm cần phải sửa theo tình hình thực tế của hệ thống.

## New Relic
New Relic là một dịch vụ cung cấp môi trường giám sát application và network như một cloud service. Nó không cần setup mà có thể ngay lập tức giám sát hệ thống. 


Những dữ liệu thu thập được sẽ tự động được hiển thị và có thể nhanh chóng xác định được những điểm có vấn đề trong hệ thống. 

Bằng việc sử dụng tool này chúng ta có thể quản lí giám sát được toàn bộ môi trường application thường xuyên thay đổi, từ đó đưa ra được những xử lí hay sizing nhanh chóng và hợp lí.

## JENNIFER

JENNIFER là 1 APM tool để giám sát web application server. Vì nó sẽ giám sát trực tiếp xử lí bên trong của từng application nên có thể phát hiện và giải quyết vấn đề một cách nhanh chóng.

Bằng việc giám sát thời gian response của page request cũng như cuat DB đối với query, tool này giúp cho chúng ta nhận biế được vấn đề và nguyên nhân của nó ở giai đoạn sớm cũng như nắm được xu hướng độ tại của service một cách cụ thể.


# Những điểm cần lưu ý khi đưa APM tool vào sử dụng
Dưới đây tôi sẽ giải thích đơn giản về những điểm cần lưu ý khi đưa APM tool vào sử dụng.

Trước tiên điều quan trọng nhất là cần phải hiểu rõ các vấn đề liên quan đến network và application của bản thân doanh nghiệp, tức là cần làm rõ xem đưa APM vào sử dụng để giải quyết vấn đề gì.


Tùy theo từng doanh nghiệp mà có nhiều trường hợp việc đưa APM vào sử dụng lại trở thành mục đích chính, mà quên mất việc cần giải quyết vấn đề gì. Bởi vậy cần thiết phải làm rõ mục đích và quy chuẩn để đạt được mục đích, chuẩn bị môi trường để giải quyết những vấn đề đang được đưa ra.


Hơn nữa, cần xác định người dùng trực tiếp của APM cũng như nhu cầu của họ để đưa vào sử dụng tool phù hợp, tránh gây khó hiểu hay áp lực cho người sử dụng.

# Hãy tìm hiểu về tính tiện dụng của APM!

Trong bài viết này tôi đã giới thiệu về APM, hệ thống quản lí tính năng của web service được chú ý trong những năm gần đây bởi các doanh nghiệp.


Tương lai tới đây chắc chắn hệ thống của các doanh nghiệp sẽ ngày càng trở nên phức tạp hơn, do đó hẳn là không thể tránh được các vấn đề phát sinh liên quan đến vận hành hay tính năng trong quá trình sử dụng. 

Mong rằng thông qua bài viết này độc giả có thể tham khảo những APM tool được giới thiệu và xem xét đưa vào sử dụng để có được môi trường ổn định cho web service.
Phần mềm ngày nay rất linh hoạt và dễ rơi vào tình trạng không phù hợp và bắt buộc phải thay đổi để phù hợp với kỳ vọng của người dùng ở một thời điểm nào sau đó, nên một mô hình độc lập là không hữu ích trong trường hợp này mà thay vào đó là SOA - phù hợp ngay trong giải pháp.

Đó là lý do tại sao, rất nhiều công ty đang dần thích ứng hoặc cố gắng thích ứng với phương pháp tiếp cận SOA vì những lợi thế của nó như : cắt giảm chi phí, xử lý nghiệp vụ nhanh, bảo trì dễ dàng... Dự kiến thị trường sắp tới sẽ phổ dụng kiến trúc SOA, nên việc tester trang bị kiến thức và làm quen với SOA là cần thiết. Để hiểu về SOA nói chung cũng như kiểm thử SOA nói riêng thì trước hết chúng ta cùng nhau tìm hiểu xem SOA và SOA testing là gì.

## SOA và SOA testing là gì?

SOA (Service Oriented Architecture : kiến trúc hướng dịch vụ) là một phương pháp tích hợp các ứng dụng và quy trình nghiệp vụ với nhau để đáp ứng nhu cầu nghiệp vụ của phần mềm. SOA nhanh và linh hoạt cho các quy trình nghiệp vụ. Các thay đổi về quy trình hoặc ứng dụng sẽ được chuyển đến một thành phần cụ thể mà không ảnh hưởng đến toàn bộ hệ thống.

Các nhà phát triển phần mềm trong SOA hoặc tự phát triển hoặc mua các phần của các chương trình gọi là DỊCH VỤ (SERVICE). 

Kiểm thử SOA là kiểm thử về kiến trúc hướng dịch vụ - là một kiểu kiến trúc trong đó các thành phần ứng dụng được thiết kế để giao tiếp thông qua các giao thức truyền thông thông thường qua mạng.

## SERVICE là gì?

![](https://images.viblo.asia/0c135b54-86f6-447e-8cd7-bbe5c896d80b.png)

* Dịch vụ có thể là một đơn vị chức năng của ứng dụng hoặc là một quy trình nghiệp vụ, nó có thể được tái sử dụng lại hoặc lặp lại bởi bất kỳ ứng dụng hoặc quy trình nào khác.
(Ví dụ trong hình trên, Cổng thanh toán là một service, nó có thể được sử dụng lại bởi bất kỳ trang web thương mại điện tử nào. Bất cứ khi nào cần thực hiện thanh toán, trang web thương mại điện tử gọi / yêu cầu dịch vụ Cổng thanh toán. Sau khi hoàn thành thanh toán, một phản hồi được gửi đến trang web thương mại điện tử).
* Rất dễ để lắp ráp các dịch vụ và dễ dàng cấu hình lại các thành phần.
* Các dịch vụ có thể coi là các khối xây dựng. Họ có thể xây dựng bất kỳ ứng dụng nào cần thiết. Việc thêm và xóa chúng khỏi ứng dụng hoặc quy trình nghiệp vụ thật dễ dàng.
* Các dịch vụ được định nghĩa bởi chức năng nghiệp vụ mà chúng thực hiện nhiều hơn là các đoạn mã.

### Web Service (Dịch vụ web)

Các dịch vụ Web là các thành phần ứng dụng độc lập, có sẵn trên web. Chúng có thể được xuất bản, tìm thấy và có thể được sử dụng trên Web. Chúng có thể giao tiếp thông qua internet.

![](https://images.viblo.asia/7f88c5c8-86ca-45c2-a499-baec310e80ac.png)

![](https://images.viblo.asia/3c61bfb7-3e74-4422-a59a-fe64e505b6f6.png)

1. Nhà cung cấp dịch vụ xuất bản dịch vụ lên Internet.
2. Khách hàng tìm kiếm một dịch vụ web cụ thể từ cơ quan đăng ký dịch vụ web
3. Trả về một URL và WSDL cho dịch vụ web được yêu cầu.
>> Sử dụng WSDL và URL - thông tin liên lạc giữa nhà cung cấp dịch vụ và người yêu cầu diễn ra thông qua các thông điệp SOAP <<
4. Khi người dùng gọi một dịch vụ web, kết nối http sẽ được thiết lập đến nhà cung cấp. Một thông điệp SOAP được tạo ra để hướng dẫn nhà cung cấp gọi dịch vụ web cần thiết (logic).
5. Phản hồi nhận được từ nhà cung cấp là một thông điệp SOAP sẽ được nhúng vào phản hồi HTTP. Phản hồi HTTP này là định dạng dữ liệu dễ hiểu bởi ứng dụng của người dùng.

**Ví dụ** : Trang chủ của trang web và Công cụ tìm kiếm hiển thị báo cáo thời tiết hàng ngày. Thay vì mã hóa phần báo cáo thời tiết trên tất cả, một dịch vụ báo cáo thời tiết có thể được mua từ một nhà cung cấp và tích hợp vào các trang.

![](https://images.viblo.asia/c220bcc5-10fd-4a7b-ad66-cc0c844cf573.png)

## SOA Testing

SOA bao gồm các công nghệ khác nhau. Các ứng dụng được xây dựng bằng SOA có các dịch vụ khác nhau được kết hợp lỏng lẻo.

![](https://images.viblo.asia/8b59b91e-9784-4ae1-9083-38b52969cb7c.png)

Kiểm thử SOA nên tập trung vào 3 tầng hệ thống sau:

**1. Tầng Services**

Tầng này bao gồm các dịch vụ được tiếp xúc bởi hệ thống có nguồn gốc từ các chức năng nghiệp vụ.

Ví dụ : Xem xét một trang web chăm sóc sức khỏe bao gồm:

1. Theo dõi cân nặng
2. Theo dõi lượng đường trong máu
3. Theo dõi huyết áp

Trình theo dõi hiển thị dữ liệu tương ứng và ngày chúng được nhập. Tầng dịch vụ bao gồm các dịch vụ nhận dữ liệu tương ứng từ Database:

* Dịch vụ theo dõi cân nặng
* Dịch vụ theo dõi lượng đường trong máu
* Dịch vụ theo dõi huyết áp
* Dịch vụ đăng nhập

**2. Tầng xử lý**

Tầng này bao gồm các quy trình, tập hợp các dịch vụ là những phần của một chức năng duy nhất.

Các quy trình này có thể là một phần của giao diện người dùng (ví dụ: công cụ tìm kiếm), hoặc một phần của công cụ ETL (để lấy dữ liệu từ cơ sở dữ liệu).

Trọng tâm chính trong tầng này sẽ ở trong giao diện người dùng và quy trình. Ví dụ : Giao diện người dùng của bộ theo dõi cân nặng và tích hợp của nó với cơ sở dữ liệu là trọng tâm chính:

* Thêm dữ liệu mới
* Chỉnh sửa dữ liệu hiện có
* Tạo trình theo dõi mới
* Xóa dữ liệu

**3. Tầng người tiêu dùng**

Tầng này chủ yếu bao gồm các giao diện người dùng.

![](https://images.viblo.asia/ee12af44-14ab-43e1-8bec-f588e9c602c3.png)

Ở tầng này việc kiểm thử 1 ứng dụng SOA được phân thành 3 mức (cấp độ):
1. Mức dịch vụ
2. Mức giao diện
3. Mức End to End (đầu cuối)
* Cách tiếp cận Top Down được sử dụng để thiết kế kiểm thử.
* Cách tiếp cận Bottom Up được sử dụng để thực hiện kiểm thử.

### Chiến lược kiểm thử SOA

**Phương pháp lập kế hoạch kiểm thử**

* Tester phải hiểu được kiến trúc hoàn chỉnh của ứng dụng.
* Ứng dụng cần được chia thành các dịch vụ độc lập (dịch vụ có yêu cầu và cấu trúc phản hồi của riêng chúng và không phụ thuộc vào bất kỳ dịch vụ nào khác để tạo ra phản hồi).
* Cấu trúc ứng dụng cần phải được tổ chức lại thành ba thành phần : Dữ liệu, Dịch vụ và Các ứng dụng giao diện người dùng.
* Tất cả các thành phần cần phải được phân tích kỹ lưỡng, và các kịch bản nghiệp vụ nên được bôi đen.
* Các kịch bản nghiệp vụ nên được phân loại thành các kịch bản phổ biến và các tình huống cụ thể của ứng dụng.
* Nên chuẩn bị 1 ma trận truy xuất nguồn gốc, và tất cả các trường hợp kiểm thử nên được truy xuất đến các kịch bản nghiệp vụ.

**Phương pháp thực hiện kiểm thử**

* Cần kiểm tra mọi thành phần dịch vụ.
* Nên thực hiện Kiểm thử tích hợp các thành phần dịch vụ để xác nhận luồng dữ liệu thông qua các dịch vụ và tính toàn vẹn của dữ liệu.
* Cần thực hiện Kiểm thử hệ thống mô hình hoàn chỉnh để xác thực luồng dữ liệu giữa ứng dụng đầu cuối và Cơ sở dữ liệu.
* Nên Kiểm thử hiệu năng để tinh chỉnh và đạt hiệu suất tối ưu.

### Các phương pháp Kiểm thử SOA

**Kiểm thử dựa trên kịch bản nghiệp vụ hướng đến data**

* Các khía cạnh nghiệp vụ khác nhau liên quan đến hệ thống nên được phân tích.
* Các kịch bản nên được phát triển dựa trên sự tích hợp của:
    * Các dịch vụ web khác nhau của ứng dụng
    * Dịch vụ web và ứng dụng.
* Việc thiết lập dữ liệu phải được thực hiện dựa trên kịch bản trên.
* Thiết lập dữ liệu cần bao gồm (cover) được hết tất cả các kịch bản.

**Stubs**

* Giao diện giả sẽ được tạo ra để kiểm tra các dịch vụ.
* Các đầu vào khác nhau có thể được cung cấp thông qua các giao diện này và các đầu ra được xác nhận hợp lệ.
* Khi một ứng dụng sử dụng một giao diện cho một dịch vụ bên ngoài, mà không được kiểm tra (dịch vụ của bên thứ ba), thì có thể tạo một nhánh (stub) trong khi Kiểm thử tích hợp.

**Kiểm thử hồi quy**

* Kiểm thử hồi quy trên ứng dụng nên được thực hiện khi có nhiều bản phát hành, Kiểm thử hồi quy để đảm bảo sự ổn định và tính khả dụng của các hệ thống.
* Một bộ kiểm tra hồi quy toàn diện sẽ được tạo ra bao gồm các dịch vụ tạo thành một phần quan trọng của ứng dụng.
* Bộ thử nghiệm này có thể được sử dụng lại trong nhiều bản phát hành của dự án.

**Kiểm thử mức dịch vụ (Service Level Testing)**

Kiểm thử mức dịch vụ bao gồm thử nghiệm thành phần của chức năng, bảo mật, hiệu suất và khả năng tương tác.

Mọi dịch vụ cần phải được kiểm thử cái này đầu tiên một cách độc lập.

**Kiểm thử chức năng**

Kiểm thử chức năng nên được thực hiện trên mỗi dịch vụ đ:

* Đảm bảo rằng dịch vụ cung cấp phản hồi phù hợp cho từng yêu cầu.
* Lỗi chính xác cho các yêu cầu có dữ liệu không hợp lệ, dữ liệu không hợp lệ, v.v.
* Kiểm tra từng yêu cầu và phản hồi cho từng hoạt động mà dịch vụ phải thực hiện trong thời gian chạy.
* Xác thực các thông báo lỗi khi có lỗi xảy ra ở cấp độ máy chủ, máy khách hoặc mạng.
* Xác nhận rằng các phản hồi nhận được có định dạng đúng.
* Xác thực rằng dữ liệu nhận được trên phản hồi tương ứng với dữ liệu được yêu cầu.

**Kiểm thử bảo mật**

Kiểm thử bảo mật dịch vụ web là một khía cạnh quan trọng trong quá trìnhKiểm thử mức dịch vụ của ứng dụng SOA; điều này đảm bảo sự an toàn của ứng dụng.

Các yếu tố sau đây cần được đề cập trong quá trình kiểm thử :

* Tiêu chuẩn công nghiệp được xác định bởi thử nghiệm WS-Security phải được tuân thủ bởi Dịch vụ Web.
* Các biện pháp an ninh nên hoạt động hoàn hảo.
* Mã hóa dữ liệu và chữ ký số trên các tài liệu
* Xác thực và ủy quyền
* SQL Injection, Malware, XSS, CSRF, các lỗ hổng khác sẽ được kiểm tra trên XML.
* Từ chối các tấn công dịch vụ.

**Kiểm thử hiệu năng**

Kiểm thử hiệu năng dịch vụ cần được thực hiện vì các dịch vụ có thể tái sử dụng được và nhiều ứng dụng có thể đang sử dụng cùng một dịch vụ.

Các yếu tố sau cần được xem xét trong quá trình thử nghiệm:

* Hiệu suất và chức năng của dịch vụ cần được kiểm tra dưới tải nặng.
* Hiệu suất của dịch vụ cần được so sánh trong khi làm việc riêng lẻ và trong ứng dụng mà nó kết hợp cùng.
* Tải thử nghiệm dịch vụ nên được thực hiện để:
    * Xác minh thời gian phản hồi
    * Kiểm tra cổ chai
    * Xác minh việc sử dụng CPU và bộ nhớ
    * Dự đoán khả năng mở rộng

**Kiểm thử mức tích hợp**

* Kiểm thử mức dịch vụ chỉ đảm bảo các dịch vụ riêng lẻ hoạt động đúng đắn, nó không đảm bảo hoạt động của các thành phần được kết hợp.
* Kiểm thử tích hợp được thực hiện tập trung chủ yếu vào các giao diện.
* Giai đoạn này bao gồm tất cả các kịch bản nghiệp vụ có thể xảy ra.
* Kiểm thử phi chức năng của ứng dụng sẽ được thực hiện thêm một lần nữa trong giai đoạn này. Kiểm thử bảo mật và Kiểm thử hiệu năng đảm bảo tính khả dụng và tính ổn định của hệ thống ở mọi khía cạnh.
* Các giao thức mạng và giao tiếp cần được kiểm tra để xác nhận tính nhất quán của việc truyền dữ liệu giữa các dịch vụ.

**Kiểm tra End to End (đầu cuối)**

Phase này đảm bảo rằng ứng dụng xác nhận các yêu cầu nghiệp vụ cả về mặt chức năng và phi chức năng.

Cần đảm bảo các mục dưới đây được kiểm tra trong suốt quá trình kiểm thử :

* Tất cả các dịch vụ hoạt động như mong đợi sau khi tích hợp
* Xử lý ngoại lệ
* Giao diện người dùng của ứng dụng
* Lưu lượng dữ liệu thích hợp thông qua tất cả các thành phần
* Quy trình nghiệp vụ

### Những thách thức trong Kiểm thử SOA

* Liệt kê thiếu (lack) giao diện của dịch vụ
* Quá trình kiể thử trải rộng trên nhiều hệ thống, do đó tạo ra các nhu cầu dữ liệu phức tạp
* Ứng dụng này là một tập hợp các thành phần khác nhau có xu hướng thay đổi. Nhu cầu kiểm thử hồi quy thường xuyên hơn.
* Do kiến trúc đa tầng, nên rất khó để cô lập các lỗi (khuyết tật).
* Kể từ khi dịch vụ được sử dụng trong các giao diện khác nhau, rất khó dự đoán tải, do đó làm cho kế hoạch kiểm thử hiệu năng cồng kềnh, phức tạp.
* SOA là một tập hợp các công nghệ không đồng nhất nên kiểm thử một ứng dụng SOA đòi hỏi những tester có các bộ kỹ năng khác nhau nên làm tăng chi phí lập kế hoạch và thực thi.
* Vì ứng dụng là một tích hợp của nhiều dịch vụ, kiểm thử bảo mật cũng gặp nhiều rủi ro. Xác thực và ủy quyền gặp khá nhiều khó khăn.

### SOA Testing Tools

Có nhiều công cụ có sẵn trên thị trường giúp kiểm thử các ứng dụng SOA, dưới đây là 1 số tool tiêu biểu:

**SOAP UI**

"SOAP UI" là một tool mã nguồn mở để kiểm thử chức năng cho dịch vụ và Kiểm tra Api:

* Ứng dụng máy tính để bàn
* Hỗ trợ nhiều giao thức - SOAP, REST, HTTP, JMS, AMF, JDBC
* Các dịch vụ Web có thể được phát triển, kiểm tra và gọi đến.
* Cũng có thể sử dụng để thử tải, Kiểm thử tự động và Kiểm thử bảo mật
* Có thể tạo các stub bằng MockServices
* Các yêu cầu và kiểm tra dịch vụ Web có thể được tạo tự động thông qua ứng dụng dịch vụ web của nó.
* Có công cụ báo cáo sẵn có
* Phát triển bởi SmartBear

**iTKO LISA**

"LISA" là bộ sản phẩm cung cấp giải pháp kiểm thử chức năng cho việc phân phối các hệ thống như SOA.

* Có thể sử dụng để Kiểm thử : hồi quy, tích hợp, tải và hiệu suất.
* Phát triển bởi iTKO (CA Technologies)
* Có thể được sử dụng để thiết kế và thực hiện các thử nghiệm.

**HP Service Test**

"Service Test" là một công cụ kiểm thử chức năng, hỗ trợ cả kiểm tra giao diện người dùng và dịch vụ dùng chung

* Có thể thực hiện kiểm thử chức năng và kiểm thử hiệu năng của các dịch vụ bởi một kịch bản duy nhất.
* Tích hợp với HP QC.
* Có thể quản lý được số lượng lớn dịch vụ và dữ liệu.
* Hỗ trợ kiểm tra khả năng tương tác bằng cách mô phỏng các môi trường máy khách JEE, AXIS và DotNet.
* Được phát triển bởi HP.

**ParaSoft SOA Test**

Đây là bộ công cụ kiểm tra và phân tích được phát triển cho API, để thử nghiệm các ứng dụng API.

* Hỗ trợ các dịch vụ Web, REST, JSON, MQ, JMS, TIBCO, HTTP, công nghệ XML.
* Có thể thực hiện kiểm thử : chức năng, đơn vị, tích hợp, hồi quy, bảo mật, khả năng tương tác, tính tuân thủ, hiệu năng.
* Có thể tạo các stub bằng cách sử dụng Parasoft Virtualize, thông minh hơn SOAP UI.
* Phát triển bởi ParaSoft

### Lời kết

Bằng cách phác thảo chiến lược phù hợp cho kiểm thử, tài nguyên, các công cụ và sự tuân thủ để cung cấp dịch vụ tốt, kiểm thử SOA có thể mang lại những ứng dụng được kiểm tra hoàn toàn (đầy đủ) và hoàn hảo.

Bài dịch từ : https://www.guru99.com/learn-soa-testing.html
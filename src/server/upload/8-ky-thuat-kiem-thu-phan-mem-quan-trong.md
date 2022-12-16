Như chúng ta đã biết, trong kiểm thử phần mềm, kiến thức là vô hạn. Để đạt được hiệu quả trong quá trình kiểm thử phần mềm đòi hỏi các kiểm thử viên phải có được những kiến thức nhất định. Từ hiểu biết chung về chuyên ngành kiểm thử đến các kỹ thuật đặc trưng của từng dự án đều cần được lĩnh hội đầy đủ. Có như vậy mới giúp các kiểm thử viên hoàn thành tốt việc bắt bug và đảm bảo chất lượng tốt nhất cho sản phẩm của dự án.

Trong bài viết này, tôi sẽ giải thích 8 kỹ thuật kiểm thử phần mềm quan trọng giúp bạn có được hình dung cơ bản, tăng khả năng linh động trong việc sử dụng các kỹ thuật kiểm thử với từng giai đoạn trong dự án cụ thể nói chung và giai đoạn kiểm thử chấp nhận của người dùng (UAT) nói riêng.

## Kiểm thử chấp nhận của người dùng (UAT) là gì?

- Một dự án phần mềm hoàn thiện ngoài việc đảm bảo được tất cả các yêu cầu của khía cạnh chức năng qua các phép kiểm thử như kiểm thử đơn vị, kiểm thử tích hợp, kiểm thử hệ thống v.v. thì còn cần phải đảm bảo được phần mềm hoạt động tương thích trong môi trường phát triển của người dùng.
- Kiểm thử chấp nhận của người dùng (UAT) giúp cho người dùng đảm bảo rằng phần mềm đáp ứng nhu cầu của họ và vận hành tốt trong môi trường của họ. Nó được thiết kế để trả lời cho câu hỏi liệu phần mềm có đáp ứng được tiêu chí chấp nhận và có sẵn sàng cho sử dụng trong thực tế không. UAT nhận diện phần mềm có khả năng tuân thủ đúng các yêu cầu doanh nghiệp khi nó vận hành trong môi trường doanh nghiệp thực hay không.
- Do đó, các chủ sở hữu sản phẩm (PO) và đơn vị kinh doanh thường sử dụng các kỹ thuật kiểm tra dựa trên yêu cầu và dựa trên hoạt động trong quá trình UAT để đánh giá chất lượng sản phẩm.
- Trong mô hình Agile, nó là hoạt động thử nghiệm được thực hiện bởi các chủ sở hữu sản phẩm nói chung sau khi đã hoàn thành quá trình phát triển và kiểm thử phần mềm.
- Trong các mô hình thác nước và mô hình V, các thử nghiệm này thường được thực hiện bởi các nhà phân tích hoặc các đơn vị kinh doanh.

Để hiểu rõ hơn chúng ta sẽ có ví dụ cho các tiêu chí đầu vào và đầu ra  cho bài kiểm tra chấp nhận của người dùng được tóm tắt trong bảng sau:


| Tiêu chí thực hiện | Tiêu chí cần đạt được | 
| -------- | -------- | -------- |
| Viết code   |  Tất cả các tình huống UAT đều phải được thực thi   |
| review code   |  Đã kiểm tra được tất cả các tiêu chí kiểm thử chấp nhận  |
| Thực hiện kiểm thử mức đơn vị và sửa lỗi |  Đạt được mục tiêu chất lượng ở mức (> = 90%), (Các trường hợp đã kiểm tra / trường hợp kiểm tra bị lỗi + không thành công)  |
| chuẩn bị dữ liệu kiểm thử sử dụng trong UAT  | Các lỗi được sửa theo mức độ (Ưu tiên> = Chính)   |

### 1) Kiểm thử bản tóm tắt nhu cầu người dùng (User Story) (AGILE)
- Mỗi bản tóm tắt nhu cầu của người dùng có thể dùng để mô tả  một tính năng được yêu cầu cần có trong phần mềm, lấy từ quan điểm của người dùng cuối trong vòng đời phát triển phần mềm. Trong bản tóm tắt này, chúng tôi phải xác định được yêu cầu của khách hàng là gì, ai sẽ là người sử dụng chức năng đó, nhằm mục đích gì. Đây là các thông tin cơ bản nhất mà nhóm phát triển cần biết để có thể thực hiện công việc của mình.
- Định nghĩa Hoàn thành (DOD): định nghĩa các tiêu chuẩn hoàn thành như: thực hiện xong viết mã lệnh, thực hiện xong kiểm thử mức đơn vị, thực hiện xong cả quá trình kiểm thử, thực hiện xong UAT, vv… Nhóm Scrum (bao gồm: nhà phát triển, người kiểm tra, PO, vv) chịu trách nhiệm về sự thành công của sản phẩm đồng thời có trách nhiệm thực hiện DOD.
- Ngoài ra, tiêu chuẩn chấp nhận của sản phẩm phải được thể hiện rõ ràng bởi PO (Product Owner: Là người chịu trách nhiệm về sự thành công của sản phẩm đang được phát triển. Công việc chủ yếu của Product Owner là tối ưu hóa giá trị của sản phẩm thông qua việc quản lý thật tốt Product Backlog.) Nhóm phát triển cần có ít nhất một kịch bản thử nghiệm cho mỗi tiêu chí chấp nhận của sản phẩm. Đồng thời các tiêu chí chấp nhận này cũng cần phải được kiểm thử một cách cẩn thận.

Các tiêu chí kiểm thử và kết quả mong muốn  cũng phải được xác định trước khi bắt đầu chạy thử nghiệm. Đây là một ví dụ.

| Tiêu chí thực hiện | Tiêu chí cần đạt được | 
| -------- | -------- | -------- |
| Có cần thiết phải hiểu rõ yêu cầu và lý do thực hiện các yêu cầu của người dùng hay không?  |  Đã kiểm tra tất cả các trường hợp thử nghiệm và đảm bảo thỏa mãn tất cả các tiêu chí chấp nhận |
| Những rủi ro liên quan đến nhu cầu được chỉ định trong User Story là gì? |  Các yêu cầu chức năng và phi chức năng đều đã được kiểm tra.  |
| Phân tích các tác động được sử dụng trong User story |   Đạt được mục tiêu chất lượng ở mức (> = 85%), (Các trường hợp đã kiểm tra / trường hợp kiểm tra bị lỗi + không thành công)  |
|  Tiêu chí chấp nhận của DOD có cần nêu rõ không? |    Các lỗi được sửa theo mức độ (Ưu tiên> = Trung bình) |
|  Các yêu cầu phi chức năng được xác định với số liệu dự kiến như thế nào (Hiệu suất, bảo mật, v.v.)
|  Nếu có sự tích hợp trong việc phát triển phần mềm, chúng có được định nghĩa rõ ràng không?|    |
|  Hoàn thành việc phát triển phần mềm khi nào?|    |
|  Phân tích mã tĩnh đã hoàn thành chưa? |    |
|  Kiểm thử mức đơn vị đã được viết và sửa hết các lỗi chưa? |   |
|  Code đã được đánh giá chưa? |    |
|  Kịch bản thử nghiệm được viết chưa ?|    |
|  Các trường hợp kiểm tra được đánh giá bởi PO / Analyst chưa ?|    |
|  Các trường hợp kiểm tra quan trọng đã được xem xét và thực thi với các nhà phát triển trong môi trường phát triển chưa? |   |
|  Môi trường thử nghiệm đã được chuẩn bị để kiểm thử chưa?|    |
| Dữ liệu cần thiết cho thử nghiệm được chuẩn bị trong môi trường thử nghiệm chưa? |    |
|  Việc thay đổi cơ sở dữ liệu đã được thực hiện trên môi trường thử nghiệm chưa? |    |
| Cài đặt cấu hình được áp dụng cho môi trường thử nghiệm chưa? |    |
|  Điều kiện tiên quyết được xác định trước khi bắt đầu thử nghiệm là gì? |    |

**Ví dụ cụ thể cho User Story:**

**User story 1:**

Là chủ sở hữu sản phẩm [Người dùng], để quảng cáo chiến dịch chào mừng Hè 2018 của nhãn hàng điện thoại MEIZU [lý do yêu cầu], tôi muốn popup quảng cáo được thêm vào giữa trang chủ của trang shopee.vn [yêu cầu].

![](https://images.viblo.asia/36ceb58f-6819-43a9-9f53-1baeeab335f7.png)

**Rủi ro:**

- Tốc độ trang chủ có thể bị giảm
- Lỗi tải ảnh của biểu ngữ sẽ ảnh hưởng đến giao diện trang chủ
- Việc xóa cookie liên tục có thể khiến biểu ngữ liên tục hiển thị ở phía người dùng.
- Chức năng Close POPUP rất quan trọng. Nó sẽ hoạt động liên tục khi click.

**Phân tích tác động:**

- Chức năng tải biểu ngữ có thể bị ảnh hưởng trong bảng điều khiển Quản trị.

**Định nghĩa hoàn thành:**

- Viết mã xong
- Hoàn thành đánh giá mã
- Kiểm tra đơn vị đã hoàn tất
- UAT xong

**Tiêu chí chấp nhận:**

- Khi trang chủ shopee.vn được mở, popup được hiển thị giữa trang là 500 × 500 trong 8 giây và sau đó nó sẽ tự mất đi.

- Khi người dùng nhấp vào popup, nó sẽ được chuyển hướng đến trang: 
https://shopee.vn/%C4%90i%E1%BB%87n-tho%E1%BA%A1i-Meizu-M5C-H%C3%A3ng-ph%C3%A2n-ph%E1%BB%91i-ch%C3%ADnh-th%E1%BB%A9c-i.65772891.1084272505?smtt=200.16515.

- Nếu người dùng truy cập shopee.vn nhiều hơn 4 lần từ cùng một máy tính, giá trị cookie AA-kobiBannerClosed phải là 4 và hơn thế nữa và popup không được hiển thị.
- Góc trên cùng bên phải của popup phải có biểu tượng đóng hình chữ thập và popup phải được đóng khi được nhấp vào.
Nếu popup đã bị người dùng tắt trước đó, nó sẽ không được hiển thị lại.

**Test case mẫu:**
![](https://images.viblo.asia/468ed2ce-e1c4-433a-ac4d-8ad43c6751e7.png)

### 2) Sử dụng các trường hợp kiểm thử
- Một trường hợp kiểm thử là danh sách các hoạt động được thực hiện trong hệ thống để đạt được một mục đích cụ thể.
- Các yêu cầu chức năng của một hệ thống có thể được xác định và quản lý bằng các trường hợp sử dụng.
- Bằng cách này, phạm vi của công việc hoặc yêu cầu sẽ được xác định một cách cụ thể.
- Các kịch bản kiểm thử được chuẩn bị bằng cách xem xét các đầu vào và đầu ra của từng bước thực hiển do người dùng xác định để đạt được mục đích cụ thể. Trong các thử nghiệm, kết quả của các thử nghiệm được xác định bằng cách so sánh với các kết quả đầu ra mong đợi với kết quả thực tế.
 
- Khi viết các trường hợp, thường sử dụng ngôn ngữ kinh doanh hơn là ngôn ngữ kỹ thuật.
Do đó, chúng thường được sử dụng để viết các kiểm thử chấp nhận. Ít nhất một kịch bản thử nghiệm được chuẩn bị cho một yêu cầu. Và để đáp ứng tất cả các yêu cầu cần chuẩn bị đầy đủ các trường hợp kiểm thử.  
 Bằng cách này, phạm vi kiểm tra có thể được tăng lên và chúng tôi có thể đo lường mức độ phù hợp này bằng cách sử dụng ma trận truy xuất nguồn gốc.
Trong ma trận, chúng ta tạo ra một bảng ma trận truy xuất nguồn gốc với các kịch bản và yêu cầu thử nghiệm và đặt một dấu chéo trong trường hợp có liên quan nếu nó đáp ứng các yêu cầu cho từng trường hợp thử nghiệm.
Mục đích là để bao phủ được tất cả các yêu cầu.

![](https://images.viblo.asia/cad0cd1c-4938-458c-b3a3-b7998d612d15.png)


### 3) Kiểm thử dựa trên bảng danh sách
- Trong các quy trình của agile, chúng tôi tạo danh sách kiểm tra chung độc lập từ các user story.
- Nếu không có bất kỳ rủi ro nào được quy định trong User Story, các mục trong danh sách kiểm tra này đều có thể được sử dụng để kiểm thử.
- Trong khi thực hiện, nếu bạn tìm thấy lỗi, bạn nên mở rộng phạm vi của danh sách kiểm tra bằng cách thêm các trường hợp bị lỗi hệ thống hoặc lỗi chương trình.
Do đó, chúng tôi có thể thêm các mục có nguy cơ rủi ro trong danh sách kiểm tra cho những sprint ngắn tiếp theo.
![](https://images.viblo.asia/b9ee7ba0-31a1-4e6b-817f-75b4b93c11e3.jpg)

**Ví dụ cụ thể về checklist:**
- Tất cả các liên kết trong hệ thống (Web / Di động) sẽ hoạt động chính xác.
- Không nên có một lỗi ngữ pháp trong các bài viết trong hệ thống.
- Kích thước phông chữ, phông chữ, phải như mong đợi.
- Không nên có bất kỳ hình ảnh nào không thể tải / hỏng trong hệ thống.
- Hình ảnh, văn bản, vv sự liên kết giữa các thành phần với nhau phải như mong đợi.
- Tất cả các nút phải hoạt động đúng và mỗi nút hướng người dùng đến các hoạt động tương ứng.
- Mỗi trang phải có biểu tượng trang chủ và sẽ được chuyển hướng đến trang chủ khi được click vào.
- Cảnh báo, thông báo thông tin sẽ được hiển thị theo đúng định dạng.
- Nếu tải được trang thì nó phải được kiểm tra ở tất cả các độ phân giải.
- Tất cả các thành phần trên trang web (danh sách thả xuống, popup, nút radio, v.v.) sẽ hoạt động chính xác.
- Các điều kiện đặc biệt (số, chữ và số, vv) trong các trường yêu cầu nhập phải được kiểm tra.
- Không thể thực hiện thao tác tiếp theo  khi để trống các trường bắt buộc.
- Mọi hoạt động của trang web không được kéo dài quá 3 đến 15 giây.
… V.v.


### 4) Kiểm thử thăm dò
- Kiểm thử thăm dò không phải là một thử nghiệm ngẫu nhiên hoặc đặc biệt. Một trong những quan niệm sai lầm lớn nhất về kỹ thuật thử nghiệm này là coi nói như một kỹ thuật kiểm tra ngẫu nhiên, không thể kiểm tra, không thể quan sát được. 
- Kiểm thử  thăm dò là phương pháp thử nghiệm dựa trên việc học và khám phá sản phẩm kết hợp với kinh nghiệm, sự hiểu biết, khả năng phân tích và trí tuệ của kỹ sư kiểm tra trong các quy trình agile.

- Cần chuẩn bị điều kiện tiền đề trước khi bắt đầu thử nghiệm thăm dò. Việc lên một kế hoạch về phạm vi chức năng, công cụ sử dụng, dữ liệu thử nghiệm, môi trường, vv sẽ giúp người thử nghiệm trong quá trình thực hiện kiểm thử được suôn sẻ hơn. Một điểm quan trọng khác của kiểm thử thăm dò là tài liệu cần được hoàn thành đầy đủ sau khi các bài kiểm tra kết thúc.

![](https://images.viblo.asia/2f152bd0-04cf-4676-ac0b-ddbf06903e55.jpeg)
- Có những công cụ thử nghiệm thăm dò khác nhau trên thị trường. Một trong những công cụ kiểm tra là "Session Tester" có thể được sử dụng như để quản lý và thu âm “Session-Based Testing”. Kỹ thuật này bao gồm các bước sau:

**Các hoạt động chính:**

- Thời gian kiểm tra (Sẽ mất vài giờ)

- Phiên hoạt động bao gồm:

     Thiết lập phiên
 
     Kiểm thử thiết kế và thực hiện kiểm thử
     
     Tìm kiếm lỗi
     
    Báo cáo
- Cần xác định mục đích của thử nghiệm

- Cần xác định mục tiêu của thử nghiệm.

- Các chức năng có trong thử nghiệm (báo cáo thử nghiệm - điều lệ) đều nên được viết ra.

**Báo cáo kiểm thử trong và sau quá trình thử nghiệm:**

- Báo cáo thử nghiệm (Điều lệ) [Chỉ ra chức năng kiểm tra.]

- Người thực hiện kiểm tra

- Ngày bắt đầu và thời gian

- Số liệu  (Số liệu được thu thập trong quá trình thực hiện kiểm tra và tìm kiếm lỗi)

- Dữ liệu thử nghiệm

- Ghi chú kiểm tra

- Các kết quả

- Lỗi

### 5) Kiểm thử dựa trên kinh nghiệm
- Kỹ thuật kiểm tra này dựa trên kiến thức, kỹ năng và kinh nghiệm của người kiểm thử.
- Trong kỹ thuật thử nghiệm này, kế hoạch kiểm tra, chiến lược kiểm tra, đầu vào thử nghiệm và các kịch bản thử nghiệm được xác định bởi trải nghiệm của người thực hiện kiểm thử.
- Người thích hợp sử dụng kỹ thuật này phải là một ứng cử viên có kinh nghiệm với kiến thức kỹ thuật và kiến thức kinh doanh đầy đủ. Họ 
sẽ dễ dàng xác định được những gì đang diễn ra là đúng hay sai trong quá trình thử nghiệm bởi vì họ có những kinh nghiệm thu được trong quá trình kiểm thử các dự án trước đây.
- Người này có thể thực hiện kiểm thử bằng cách sử dụng các kỹ thuật như kiểm thử thăm dò, vì nó giúp họ dễ dàng sử dụng kinh nghiệm trong quá khứ kết hợp với kiến thức phân tích / trí tuệ để kiểm thử.
- Kỹ thuật kiểm tra này có ý nghĩa khi dự án có thời gian thực hiện kiểm thử rất ngắn hoặc không có đủ tài liệu về dự án, v.v.
- Nếu hệ thống đang được thử nghiệm chứa nhiều rủi ro thì không nên sử dụng kỹ thuật kiểm thử dựa trên kinh nghiệm vì nó không thể bao phủ được hoàn toàn các yêu cầu của hệ thống. 

### 6) Kiểm thử hành trình người dùng
- Kiểm thử hành trình người dùng có tính đến các yếu tố bản đồ đường bộ và hành trình của một người dùng thông thường trên hệ thống.
Trong các thử nghiệm này, những hành trình quan trọng nhất mà người dùng sẽ thực hiện trong trang web được xác định và dựa vào đó dựng các trường hợp kiểm thử. Tương tác của người dùng với hệ thống được tính toán nhiều nhất có thể.
Các kiểm thử này thường là các ca kiểm thử “từ đầu đến cuối”, vì vậy họ có thể mất nhiều thời gian hơn các kiểm thử khác, nhưng tỷ lệ bao phủ của các kiểm thử này cũng đồng thời cao hơn.

- Vì kiểm thử “Hành trình người dùng” là các trường hợp kiểm thử toàn diện và mở rộng. Các trường hợp kiểm thử của loại kiểm thử này sẽ bao gồm các trường hợp có các xử lý quan trọng nhất của hệ thống. Đó là các trường hợp kiểm thử nên được chạy đầu tiên.
- Phạm vi phủ sóng rộng của các kiểm thử “hành trình người dùng” có lợi trong việc phát hiện sớm các lỗi nghiêm trọng trong quá trình phát triển phần mềm, đặc biệt là trước khi bắt đầu thử nghiệm rộng rãi.
- Không giống như kiểm thử user story, kiểm tra hành trình của người dùng không được gắn với câu chuyện của người dùng.
Khi có những thay đổi được tạo ra bởi yêu cầu mới của người dùng mới, các kiểm tra hành trình của người dùng hiện có sẽ được cập nhật khi hệ thống áp dụng những thay đổi mới này.
### 7) Thử nghiệm dựa trên rủi ro
- Một trong những mục tiêu cơ bản nhất của kỹ thuật kiểm tra dựa trên rủi ro là tìm ra các lỗi quan trọng và quan trọng nhất càng sớm càng tốt với chi phí thấp nhất.
- Rủi ro là những thứ mà chúng ta không biết chính xác điều gì sẽ xảy ra, nhưng chúng ta biết xác suất có thể xảy ra.
- Định nghĩa chung về độ lớn của rủi ro là khả năng nhân lên của các vấn đề và tác động của chúng trong hệ thống.
Vì vậy, trong các thử nghiệm dựa trên rủi ro, chúng tôi ưu tiên kiểm tra các chức năng dễ bị lỗi nhất trước tiên.

Tầm quan trọng của rủi ro = Khả năng * Tác động

Việc áp dụng sớm phương pháp thử nghiệm dựa trên rủi ro trong các dự án là rất quan trọng để phát hiện sớm các vấn đề.

Các bước cơ bản nhất của thử nghiệm dựa trên rủi ro được tóm tắt dưới đây:

1- Đầu tiên, xác định các rủi ro và lập danh sách rủi ro theo thứ tự ưu tiên.

2- Lập kế hoạch kiểm tra theo danh sách rủi ro được ưu tiên và tiến hành các thử nghiệm thực hiện cho từng rủi ro.

3- Kết quả  kiểm thử là một số rủi ro sẽ được loại bỏ và một số trong số chúng sẽ bị phát sinh. Rủi ro mới sẽ được tiến hành kiểm thử lại.
Tại thời điểm này, mục tiêu cơ bản nhất của chúng tôi là tìm ra những khiếm khuyết quan trọng nhất.

Nếu bạn chịu trách nhiệm kiểm thử một sản phẩm có khả năng thất bại rất cao, bạn sẽ cần phân tích rủi ro một cách chi tiết. 
Có thể sử dụng các mô hình thống kê. Một trong những mô hình nổi tiếng nhất là mô hình PHÂN TÍCH TÁC ĐỘNG VÀ HÌNH THỨC SINH RA LỖI SAI (FMEA).

Cách tính bằng việc lấy 3 chỉ số với 5 thang đo như sau:

**Mức độ nghiêm trọng**


| Mô tả | Tầm quan trọng | cấp độ |
| -------- | -------- | -------- |
| Mất dữ liệu, phần cứng hoặc các vấn đề bảo mật    | khẩn cấp      | 1     |
| Mất chức năng, thậm chí không có cách giải quyết     | cao      | 2     |
| Mất chức năng, có khả năng giải quyết    | trung bình      | 3    |
| Mất một phần chức năng    | thấp     | 4     |
| Lỗi nhỏ hoặc không quan trọng    | N/A    | 5    |

**Mức độ ưu tiên**


| Mô tả | Tầm quan trọng | cấp độ |
| -------- | -------- | -------- |
| Gây thất thoát toàn bộ giá trị trong hệ thống   | khẩn cấp      | 1     |
| Mất giá trị hệ thống không được chấp nhận     | cao      | 2     |
| Có thể gây giảm giá trị hệ thống   | trung bình      | 3    |
| Giảm giá trị hệ thống có thể chấp nhận   | thấp     | 4     |
| Giảm giá trị hệ thống không đáng kể    | N/A    | 5    |

**Khả năng ảnh hưởng**


| Mô tả | Tầm quan trọng | cấp độ |
| -------- | -------- | -------- |
| ảnh hưởng toàn bộ giá trị trong hệ thống   | khẩn cấp      | 1     |
|Một số người dùng bị ảnh hưởng     | cao      | 2     |
| Những ảnh hưởng có thể xảy ra đối với một số người dùng   | trung bình      | 3    |
| Tác động hạn chế lên số ít người dùng   | thấp     | 4     |
| Tác động không ảnh hưởng trên thực tế sử dụng    | N/A    | 5    |

Tất cả ba yếu tố (Mức độ nghiêm trọng, Ưu tiên và khả năng ảnh hưởng) được tính riêng, sau đó các giá trị này được nhân với nhau để có được Hạng Ưu tiên của Rủi ro (RPN).

Hạng Ưu tiên của Rủi ro (RPN) = S * P * L

Dựa trên giá trị RPN này, chúng tôi có thể xác định phạm vi của việc kiểm thử. RPN càng thấp cho thấy nguy cơ càng cao.

### 8) Thử nghiệm dựa trên rủi ro theo kinh nghiệm của James Bach
(Xuất bản lần đầu trong tạp chí kiểm thử phần mềm và kỹ thuật chất lượng, 11/99 Copyright 1999, James Bach)

Bạn có thể tìm thấy chi tiết trong liên kết này: http://www.satisfice.com/articles/hrbt.pdf

Tôi chỉ muốn cung cấp cho một bản tóm tắt của thử nghiệm dựa trên rủi ro Heuristic.

- Khi bắt đầu các dự án của bạn, phân tích rủi ro của bạn có thể không đầy đủ hoặc không chính xác ở một mức độ nào đó bởi vì không thể ước tính tất cả mọi thứ 100% ngay từ lúc đầu.

- Tuy nhiên, khi dự án của bạn có tiến triển và sản phẩm của bạn được cải thiện, ước tính của bạn và phân tích rủi ro sẽ ngày càng trở nên mạnh mẽ hơn.
Theo James Bach, hai yếu tố quan trọng nhất đối với rủi ro là kinh nghiệm và tinh thần đồng đội.

Trong một khoảng thời gian nhất định, các sản phẩm hoặc công nghệ bắt đầu lộ ra các vấn đề đặc trưng của chúng.

 Điều quan trọng là quan sát và tìm hiểu về chúng. Điều này rất quan trọng để làm phân tích rủi ro với những người có quan điểm khác nhau.
 
 Ngoài ra, việc sử dụng danh sách rủi ro giúp chúng tôi thương lượng tốt hơn với quản lý về sử dụng lao động trong dự án một cách hiệu quả.
Chúng tôi có thể cho họ thấy rằng chúng tôi sử dụng lực lượng kiểm thử hiện tại cho các điểm quan trọng nhất của sản phẩm hoặc chúng tôi có thể cần phải giải thích rằng chúng tôi cần thêm người để xử lý được tất cả các khu vực có rủi ro.

Tài liệu tham khảo: https://www.swtestacademy.com/software-testing-techniques/
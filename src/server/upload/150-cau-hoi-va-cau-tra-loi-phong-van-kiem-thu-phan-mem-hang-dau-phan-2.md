# 41. Các bước bạn sẽ làm khi tìm thấy defect là gì?

Một khi defect được tìm thấy, bạn sẽ  phải làm theo bước sau : 

a) Tái hiện lại defect

b) Đính kèm ảnh chụp màn hình

c) Log bug 

# 42. Giải thích phương pháp kiểm thử  "Test Plan Driven" hoặc "Key Word Driven"  là gì?

Kỹ thuật này sử dụng tài liệu với các trường hợp kiểm thử thực tế được phát triển bởi những người kiểm thử bằng bảng tính có chứa "key" đặc biệt. Các từ khóa sẽ kiểm soát quá trình xử lý.

43. DFD (Sơ đồ luồng dữ liệu) là gì?

Khi một "luồng dữ liệu" của một hệ thống thông tin được biểu thị bằng đồ họa, thì nó được gọi là Sơ đồ luồng dữ liệu. Nó cũng được sử dụng để hiển thị các dữ liệu cần xử lý.

# 44. Giải thích LCSAJ là gì?

LCSAJ là viết tắt của 'linear code sequence and jump.'  ( bao phủ luồng dữ liệu ) Nó bao gồm ba mục sau đây: 

a) Bắt đầu chuỗi tuyến tính của các câu lệnh thực thi

b) Kết thúc chuỗi tuyến tính

c) Đích chính là luồng điều khiển được truyền ở cuối chuỗi tuyến tính

# 45. Giải thích kiểm thử N + 1 là gì?

Các trường hợp đặc biệt của kiểm thử hồi quy được biểu diễn là N + 1. Trong kỹ thuật này, kiểm thử được thực hiện theo nhiều chu kỳ trong đó các lỗi được tìm thấy trong chu kỳ kiểm thử 'N' được giải quyết và kiểm thử lại trong chu kỳ kiểm thử N + 1. trừ khi không có lỗi tìm thấy.

# 46. Kiểm thử Fuzz là gì và khi nào nó được sử dụng?

Kiểm thử Fuzz được sử dụng để phát hiện các lỗ hổng bảo mật và lỗi mã hóa trong phần mềm. Trong kỹ thuật này, dữ liệu ngẫu nhiên được thêm vào hệ thống nhằm khắc phục sự cố hệ thống. Nếu lỗ hổng vẫn tồn tại, một công cụ gọi là kiểm thử fuzz được sử dụng để xác định nguyên nhân tiềm ẩn. Kỹ thuật đặc biệt hữu ích cho các dự án lớn nhưng chỉ có thể phát hiện ra lỗi lớn.
 
# 47. Đề cập đến những lợi ích chính của số liệu đã được tuyên bố trong kiểm thử phần mềm là gì?

Lợi ích của số liệu đã được tuyên bố  là

a) Nó không yêu cầu xử lý mã nguồn và có thể được áp dụng trực tiếp vào mã đối tượng

b) Lỗi được phân phối đều thông qua mã, do đó tỷ lệ phần trăm của các câu lệnh thực thi được bảo đảm bao gồm phần trăm lỗi được phát hiện.

# 48. Cần tạo test case như thế nào cho phương pháp ""replace a string"?

a) Nếu các ký tự trong chuỗi mới > các ký tự trong chuỗi trước đó. Một số ký tự sẽ bị cắt ngắn

b) Nếu các ký tự trong chuỗi mới < các ký tự trong chuỗi trước. Không nên thêm các ký tự

c) Không nên xóa các dấu cách sau và trước chuỗi

d) Chuỗi chỉ nên được thay thế cho lần xuất hiện đầu tiên của chuỗi

# 49. Bạn sẽ xử lý như thế nào khi có xung đột giữa các thành viên trong nhóm của bạn?

* Nói chuyện riêng với từng người và ghi nhận mối quan tâm đó.
* Tìm một giải pháp cho các vấn đề phổ biến được đưa ra bởi các thành viên trong nhóm.
* Tổ chức một cuộc họp nhóm, tiết lộ giải pháp và yêu cầu mọi người hợp tác

# 50. Các loại defects thường gặp là gì?

Chủ yếu có ba loại defects: 

* Sai: Khi một yêu cầu được thực hiện không chính xác
* Thiếu: Đó là một sai sót kỹ thuật, một dấu hiệu cho thấy một đặc tả không được thực hiện hoặc yêu cầu của khách hàng không được đáp ứng
* Bổ sung: Một yêu cầu được đưa vào sản phẩm  mà không được đưa ra bởi khách hàng. Nó được coi là một khiếm khuyết vì nó là một sai sót so với các yêu cầu thực tế.

# 51. Giải thích một công cụ kiểm tra đảm bảo hoạt động như thế nào?

Công cụ kiểm tra chạy song song khi thực hiện kiểm thử trên sản phẩm. Công cụ giám sát các câu lệnh được thực thi của mã nguồn. Khi kiểm thử cuối cùng được thực hiện, sẽ nhận được báo cáo đầy đủ cũng như các báo cáo đang chờ xử lý và cũng nhận được tỷ lệ đã thực hiện .

# 52. Sự khác biệt giữa "defect"  và  "failure" trong kiểm thử phần mềm là gì?

Nói một cách đơn giản khi một khiếm khuyết đến được với khách hàng, nó được gọi là failure, khi lỗi được xác định bên trong và được giải quyết, sau đó lại xuất hiện khiếm khuyết thì nó được gọi là một defect.

# 53. Giải thích cách kiểm tra tài liệu trong một dự án trải qua vòng đời phát triển phần mềm?

Dự án trải qua vòng đời phát triển phần mềm theo cách sau

Kế hoạch kiểm thử trung tâm / dự án: Đây là kế hoạch kiểm thử chính phác thảo chiến lược kiểm thử hoàn chỉnh của dự án. Kế hoạch này được sử dụng cho đến khi kết thúc vòng đời phát triển phần mềm
Kế hoạch kiểm tra chấp nhận: Tài liệu này bắt đầu trong giai đoạn yêu cầu và được hoàn thành vào lần giao hàng cuối cùng
Kế hoạch kiểm tra hệ thống: Kế hoạch này bắt đầu trong kế hoạch thiết kế và tiến hành cho đến khi kết thúc dự án
Kế hoạch kiểm thử đơn vị và tích hợp: Cả hai kế hoạch kiểm tra này đều bắt đầu trong giai đoạn thực hiện và kéo dài cho đến khi giao hàng cuối cùng

# 54. Điều đầu tiền cần để viết Testcase kiểm thử hộp đen/hộp trắng là gì?

* Các case kiểm thử hộp đen sẽ được viết trước tiên . Để viết được yêu cầu phải có kế hoạch dự án, tài liệu đều phải có sẵn. 
* Trong trường hợp viết các trường hợp kiểm thử hộp trắng đòi hỏi hiểu biết về kiến trúc nhiều hơn và không có sẵn tại thời điểm bắt đầu dự án.

# 55. Giải thích sự khác biệt giữa Latent defect và Masked defect  ?

* **Latent defect**: là một khiếm khuyết mà hiện tại không gây ra thất bại vì các điều kiện không bao giờ được đáp ứng
* **Masked defect**: Đó là một khiếm khuyết hiện có mà không gây ra lỗi vì một khiếm khuyết khác đã ngăn không cho một phần của mã lệnh được thực thi

#  56. Kiểm thử từ dưới lên là gì?

Kiểm thử từ dưới lên là một cách tiếp cận để kiểm tra tích hợp, trong đó các thành phần cấp thấp nhất được kiểm tra trước, sau đó được sử dụng để tạo tiền đề cho việc kiểm tra các thành phần cấp cao hơn. Quá trình được lặp lại cho đến khi kiểm thử hết các cấp.

# 57. Sự khác biệt giữa các loại  test coverage techniques là gì ?

Các loại kỹ thuật khác nhau bao gồm : 

**Statement Coverage**: Xác minh rằng mỗi dòng mã nguồn đã được thực thi và kiểm thử
**Decision Coverage**: Đảm bảo rằng mọi quyết định trong mã nguồn được thực thi và kiểm thử
**Path Coverage**: Đảm bảo rằng mọi tuyến đường có thể thông qua một phần nhất định của mã được thực thi và kiểm thử

# 58. Ý nghĩa của breath testing là gì?

Breath testing là bộ kiểm thử thực hiện đầy đủ chức năng của sản phẩm nhưng không kiểm thử chi tiết các tính năng.

# 59. Giải thích ý nghĩa của Code Walk Through là gì?

Code Walk Through là phân tích không chính thức về mã nguồn của chương trình để tìm lỗi và xác minh các mã nguồn. 

# 60. Các thành phần cơ bản của định dạng báo cáo lỗi là gì?
Các thành phần thiết yếu của báo cáo lỗi bao gồm:

* Tên dự án
* Tên mô-đun
* Khiếm khuyết được phát hiện trên môi trường nào 
* Khiếm khuyết được phát hiện bởi ai
* ID và tên lỗi
* Ảnh chụp khiếm khuyết
* Mức độ ưu tiên và nghiêm trọng
* Khiếm khuyết được giải quyết bởi ai
* Khiếm khuyết giải quyết trên môi trường nào 

# 61. Mục đích của việc thực hiện kiểm thử đầu ra là gì?

Kiểm thử đầu ra được thực hiện sau khi kiểm thử chức năng. Mục đích của việc thực hiện kiểm thử đầu ra là

* Để xác nhận các yêu cầu của phần mềm và tích hợp với giao diện.
* Ứng dụng kiểm thử với các kịch bản với môi trường thực
* Kiểm tra sự tương tác giữa ứng dụng và cơ sở dữ liệu

# 62. Giải thích ý nghĩa của việc khai thác kiểm thử ?   

Khai thác kiểm thử nhằm mục đích cấu hình một tập hợp các công cụ và dữ liệu kiểm thử để kiểm tra ứng dụng với các điều kiện khác nhau và có liên quan đến việc giám sát đầu ra , đầu ra dự kiến cho chính xác.

# 63. Trong một dự án kiểm thử, bạn sẽ tự động hóa được các hoạt động kiểm thử như thế nào nào?

Trong kiểm thử phần mềm, bạn có thể tự động hóa như sau : 

* Các kiểm thử cần được chạy cho mọi bản demo của ứng dụng
* Các kiểm thử  sử dụng nhiều dữ liệu cho cùng một bộ hành động
* Các kiểm thử giống hệt nhau cần được thực hiện bằng các trình duyệt khác nhau

Nhiệm vụ quan trọng:

Kết nối với các trang không thay đổi trong thời gian ngắn

# 64. Lợi ích CHÍNH của việc thiết kế kiểm thử trong quy trình phát triển phần mềm là gì?

Nó giúp ngăn ngừa các khiếm khuyết có thể được đưa vào mã nguồn.

# 65. Kiểm thử dựa trên rủi ro là gì?

Kiểm thử dựa trên rủi ro là thuật ngữ được sử dụng nhằm tiếp cận, tạo Chiến lược kiểm thử dựa trên việc ưu tiên của mức độ rủi ro. Cơ sở của phương pháp này là phân tích chi tiết rủi ro và đánh giá độ ưu tiên theo mức độ rủi ro. Các kiểm thử giải quyết từng rủi ro được chỉ định, bắt đầu với rủi ro cao nhất.

# 66. Sự khác biệt quan trọng giữa phương pháp preventative and reactive approaches để kiểm thử là gì?

* Preventative được thiết kế sớm
* Reactive approaches được thiết kế sau khi phần mềm đã được sản xuất.

# 67. Mục đích của tiêu chuẩn đầu ra là gì?

Mục đích của tiêu chuẩn đầu ra là xác định khi mức độ hoàn thành kiểm thử.

# 68. Điều gì quyết định mức độ rủi ro?

Khả năng xảy ra sự kiện bất lợi và tác động của sự kiện đó sẽ quyết định mức độ rủi ro.

# 69. Khi nào nên sử dụng kiểm thử bằng bảng quyết định?

Kiểm thử bằng bảng quyết định được sử dụng cho các hệ thống kiểm tra mà đặc tả có dạng quy tắc hoặc có sự kết hợp nguyên nhân. Trong bảng quyết định, các đầu vào được liệt kê trong một cột, và các đầu ra cũng trong cùng một cột nhưng nằm  bên dưới các đầu vào. Các đầu vào kết hợp đầu với nhau để xác định đầu ra.

# 70. Tại sao chúng ta sử dụng bảng quyết định?

Các kỹ thuật phân vùng tương đương và phân tích giá trị biên thường được áp dụng cho các tình huống với đầu vào cụ thể. Tuy nhiên, nếu kết hợp đầu vào khác nhau sẽ dẫn đến các hành động khác nhau được thực hiện, điều này có thể khó mô tả hơn khi phân vùng tương đương và phân tích giá trị biên ( tập trung vào giao diện ). Còn bảng quyết định và kiểm thử chuyển đổi trạng thái  tập trung nhiều hơn vào logic hoặc quy tắc. Bảng quyết định là một cách tốt để đối phó với sự kết hợp của nhiều điều kiện (ví dụ: đầu vào). Kỹ thuật này đôi khi cũng được gọi là bảng 'nguyên nhân'. Lý do cho điều này là có một kỹ thuật lập biểu đồ logic liên quan được gọi là 'biểu đồ hiệu ứng nguyên nhân' đôi khi được sử dụng để giúp rút ra bảng quyết định.

# 71. Mục tiêu CHÍNH khi xem xét một phần mềm được giao là gì?

Để xác định lỗi .

# 72. Điều nào sau đây xác định kết quả dự kiến của một kiểm thử? Đặc tả Test case hayc đặc điểm kỹ thuật thiết kế kiểm thử.

Đặc tả Test case 

# 73. Lợi ích của test independence ( Kiểm thử độc lập) là gì?

Nó tránh sự thiên vị của tác giả trong việc xác định kiểm thử hiệu quả.

# 74. Giai đoạn nào của quá trình kiểm thử, bạn xác định tiêu chí dừng lại?

Các tiêu chí dừng lại được xác định dựa trên cơ sở của 'Test plan'.

# 75. Kiểm thử Alpha là gì?

Kiểm thử , hoạt động mà được  thức hiện trước khi phát hành bởi đại diện người dùng cuối tại web của nhà phát triển.

# 76. Kiểm thử beta là gì?

Kiểm thử được thực hiện bởi khách hàng tiềm năng tại địa điểm của họ.

# 77. Sự khác nhau giữa kiểm thử Pilot và Beta là gì?

Sự khác biệt giữa kiểm thử Pilot và kiểm thử beta là kiểm thử Pilot được thực hiện bằng cách sử dụng sản phẩm của nhóm người dùng trước, không nhập dữ liệu thực, nhưng được cài đặt ở khách hàng cuối nhằm xác thực sản phẩm có thể được sử dụng trong sản xuất.

# 78. Cho đoạn mã sau đây, có bao nhiêu thử nghiệm được yêu cầu cho Bao phủ các nhánh 100%?

```
if width > length 
   thenbiggest_dimension = width
     if height > width 
             thenbiggest_dimension = height 
     end_if
elsebiggest_dimension = length  
            if height > length 
                thenbiggest_dimension = height 
          end_if
end_if
```
4

# 79. Bạn đã thiết kế các trường hợp kiểm thử để cung cấp bao phủ quyết định  100% cho đoạn mã sau. if width > length then biggest_dimension = width else biggest_dimension = length end_if .Phần sau đây đã được thêm vào dưới cùng của đoạn mã ở trên. print "Biggest dimension is " &biggest_dimensionprint "Width: " & width print "Length: " & length . Cần thêm bao nhiêu test case?


Không cần , vì test case hiện tại vẫn có thể được sử dụng.

# Tài liệu tham khảo
https://www.guru99.com/software-testing-interview-questions.html
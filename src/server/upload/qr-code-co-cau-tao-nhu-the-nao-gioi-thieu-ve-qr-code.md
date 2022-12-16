*Dịch từ bài viết [『QRコード』の仕組みを解説！ 決済やスマホでの読み取り方・作成方法も](https://time-space.kddi.com/ict-keywords/20190425/2624)*

*(Bài dịch lược bỏ một phần nội dung cuối giới thiệu về cách đọc và tạo QR code bằng smartphone)*

Gần đây, trên những poster đặt ở quẩy thanh toán các cửa hàng, ngày càng xuất hiện thường xuyên **QR code** - tập hợp các hoạ tiết đen trắng được in trong một khung hình vuông. Chỉ bằng cách sử dụng camera của điện thoại, ta có thể đọc được thông tin từ QR code và làm được nhiều việc như thanh toán tiền, download ứng dụng, thêm bạn trên LINE, v.v.

Trong bài viết này, tôi sẽ giới thiệu về cấu tạo của QR code cũng như các ví dụ về việc ứng dụng nó.

# 1. QR code là gì? Đây là một kỹ thuật do Nhật Bản phát triển!
QR code là kỹ thuật giúp chúng ta ó thể đọc được thông tin khi quét bằng camera của điện thoại thông minh, tương tự như mã vạch. Như ví dụ tôi đưa ra ở đầu bài viết, QR code có tính ứng dụng cao và được sử dụng trong nhiều trường hợp như bảng, biển quảng cáo, quản lý kho, đặt vé xem phim, nhạc hội, v.v.

Cùng với sự phổ cập của Smartphone, những năm gần đây, QR code cũng trở nên quen thuộc hơn với người dùng, tuy nhiên, thực tế, kỹ thuật này được phát triển từ năm 1994 bởi Công ty cổ phần Denso Wave, một công ty của Nhật Bản. So với mã vạch chỉ có thể lưu được tối đa 20 ký tự, QR code ra đời đã đáp ứng được nhu cầu lưu trữ nhiều thông tin hơn nữa.

So với mã vạch lưu trữ thông tin theo hàng ngang (nói cách khác là lưu trữ thông tin một chiều), với QR code, thông tin được lưu theo 2 chiều ngang và dọc, là một loại code 2 chiều. Trường hợp cần lưu trữ lượng lớn thông tin, với trường hợp sử dụng mã vạch, ta cần chia thông tin thành nhiều dòng mã vạch, khó mà in lên bao bì sản phẩm được. Với QR code, số lượng thông tin có thể lưu trữ tăng lên hàng chục, hàng trăm lần, từ đó giải quyết được hạn chế trên của mã vạch.

# 2. Ưu điểm của QR code
Xem xét dưới góc nhìn là một cách thức lưu trữ và đọc thông tin, QR code có nhiều ưu điểm.

## Có thể lưu được lượng lớn thông tin

Như tôi đã nhắc ở trên, QR code có khả năng lưu trữ lượng lớn thông tin so với mã vạch truyền thống. Với version 40, phiên bản mới nhất của QR code ở thời điểm bài viết này được viết (tháng 4/2020), khả năng sửa chữa lỗi mức L, một QR code có thể lưu trữ tối đa 1817 ký tự kanji/kana (2 loại ký tự tiếng Nhật), 4296 ký tự tiếng Anh hoặc 7098 chữ số.

Khi sử dụng mã vạch truyền thống, do lượng thông tin có thể lưu trữ được bị giới hạn, ta phải đặt mã quốc gia, mã sản phẩm, mã nhà cung cấp, rồi dựa vào các số hiệu đọc được từ mã vạch, đối chiếu với cơ sở dữ liệu để biết thông tin sản phẩm. Với QR code, ta hoàn toàn có thể lưu trữ nhiều thông tin như tên sản phẩm, ngày sản xuất, hạn sử dụng mà không còn bị giới hạn với việc chỉ lưu các số hiệu đơn thuần nữa.

Hơn thế, QR code có thể được sử dụng để lưu link trang web, app nên nó còn được dùng để hiển thị liên kết trên internet.

## Có thể được đọc một cách nhanh chóng ở nhiều góc độ khác nhau

Một ưu điểm khác của QR code là nó có thể được đọc với tốc độ rất nhanh. QR code được cấu tạo gồm 1 hình vuông, 3 trong 4 góc của hình vuông được đặt ký hiệu ngăn cách, nhờ thế phạm vi của QR code có thể được nhận biết rõ ràng và được đọc với tốc độ nhanh chóng ở bất cứ góc độ nào, nhờ đó chúng ta sẽ không phải đối diện với tình cảnh phải không ngừng thay đổi góc độ của camera điện thoại mà mãi vẫn không đọc được mã nữa!

## Ngay cả khi QR code bị bẩn hay hỏng, ta vẫn có thể khôi phục thông tin chứa trong nó

QR code có khả năng ứng phó với trường hợp bị bẩn hay rách. Ngay cả khi một bộ phận code bị mất đi nữa, bản thân QR code có khả năng sửa chữa lỗi, khôi phục data mà nó chứa.

Khả năng sửa chữa lỗi của QR code được chia làm 4 mức độ: L, M, Q, H. Mức độ sửa chữa lỗi càng cao thì khả năng kháng lại lỗi rách, hỏng của QR code càng cao. Trong các trường hợp thông thường, QR code với mức độ sửa chữa lỗi M được sử dụng. Trong các môi trường QR code dễ bị bẩn, rách như công xưởng, công trường, code level Q hoặc H được sử dụng.

|Mức độ sửa chữa lỗi của QR code | Độ khôi phục | ứng dụng |
| -------- | -------- | -------- |
| Level L     | khoảng 7%     | Sử dụng trong môi trường ít bị bẩn     |
| Level M    | khoảng 15%     | Sử dụng trong môi trường thông thường    |
| Level Q     | khoảng 25%     | Sử dụng trong môi trường dễ bị bẩn như xưởng sản xuất     |
| Level H     | khoảng 30%     | Sử dụng trong môi trường dễ bị bẩn như xưởng sản xuất     |

## Có thể đọc được thông tin bằng kỹ thuật xử lý hình ảnh của Camera

Ưu điểm lớn nhất của QR code giúp nó được sử dụng ngày càng phổ biến là ta có thể đọc được thông tin bằng kỹ thuật xử lý hình ảnh của Camera mà không cần máy đọc mã chuyên dụng. Để đọc được mã vạch truyền thống, ta cần có sensor chuyên dụng như đầu đọc lazer giống với loại máy chuyên dụng thường thấy trong các siêu thị hay cửa hàng tiện lợi. Với QR code, ta có thể tiết kiệm được chi phí đầu tư ban đầu này.

# 3. Cấu trúc và cách hoạt động của QR code

Khi vừa nhìn vào, nhiều người sẽ nghĩ QR code là một hình vẽ được sắp xếp phức tạp không thể đọc hiểu được, tuy nhiên, QR code được cấu trúc dựa trên những nguyên tắc cơ bản được định sẵn. Tiếp sau đây, tôi sẽ giới thiệu cấu trúc của QR code chưa link của trang web TIME&SPACE (*link trang web chứa bài viết gốc*)

![](https://images.viblo.asia/ef9dd6d1-fdbb-4984-83f3-2ee487515647.png)

**① Cell (ngôn ngữ)**

Trước hết, trong QR code có chứa nhiều ô hoa văn đen trắng, thực tế, các ô đen trắng này chứa các đoạn mã nhị phân. Các ô (cell) trắng đen này lần lượt mang giá trị 0 và 1, tập hợp các cell chính là các thông tin được lưu trữ vào QR code.

**② Hoa văn định vị**

Ở bốn góc của QR code bố trí các ô vuông gọi là hoa văn định vị. Nhờ vào hoa văn định vị này, camerra có thể xác định được phạm vi QR code cũng như đọc được thông tin ngay cả trong trường hợp QR code bị biến dạng, nhờ đó ta có thể quét được QR code một cách nhanh chóng ở bất kỳ góc độ nào.

Thêm vào đó, hoa văn hình vuông được sử dụng dể xác định phạm vi QR code ngăn cách với các ký tự, hình vẽ xung quanh nó. Đội phát triển QR code đã phải khảo sát hơn 5000 trang tờ rơi, bao bì, poster, v.v. và thấy rằng hoa văn này là loại hoa văn có tỉ lệ sử dụng thấp nhất. Cả sự sắp xếp hoa văn cùng với tỉ lệ kích thước cũng là kết quả của việc thống kế nhằm đảm bảo phạm vi code được xác định đúng.

**③ Timing pattern**

Các ô vuông đen trắng được đặt xen kẽ nhau nhằm giúp cho việc xác định toạ độ của QR code.

**④ Alignment pattern**

Ở vùng phía dưới bên phải của QR code có một hình vuông chứa hình vuông nhỏ khác bên trong, hoa văn này có tác dụng quan trọng, giúp cho việc điều chỉnh lại những chênh lệch phát sinh do camera bị lệch trong quá trình quét.

**⑤ Thông tin format (chức năng sửa chữa lỗi)**

Xung quanh hoa văn định vị là phần chứa thông tin format, quyết dịnh mức độ sửa chữa lỗi của QR code. 

Ngoại trừ các phần ② - ⑤, các vùng khác của QR code là những vùng ta có thể thiết kế.

Bên cạnh đó, để giúp cho việc giữ cân bằng giữa các ô đen và trắng trên QR code, chức năng Mask được thiết lập. Nhờ vào đó, chúng ta không bao giờ thấy QR code chứa toàn các ô đen. Dựa trên 8 loại nguyên tắc, các thông tin lưu trong QR code được đảm bảo vẫn giữ toàn vẹn nhưng màu sắc của các ô đen trắng có thể đảo ngược để đảm bảo sự cân bằng.

# 4. Ví dụ về việc sử dụng QR code
Tiếp sau, chúng ta hãy cùng xem những ứng dụng của QR code trong các ví dụ thực tế.

## Thanh toán bằng QR code

Việc thanh toán bằng QR code ngày càng trở nên phổ biến. Ta có thể dễ dàng thanh toán bằng cách dùng app chuyên dụng để đọc QR code chuyên dụng đặt ở quẩy thanh toán, hoặc để nhân viên cửa hàng quét mã QR trên điện thoại của mình. Đặc biệt, ở Trung Quốc và Hàn Quốc, việc thanh toán bằng QR code đã phổ biến đến mức dù ở bất cứ đâu, bách hoá, nhà hàng cao cấp hay cửa hàng ven đường, ta đều không cần dùng đến tiền mặt nữa.

(Lược phần giới thiệu về AU Pay app)

## Lưu thông tin account LINE/Twitter dưới dạng mã QR

Khi follow bạn bè trên SNS, nhiều người thường tìm kiếm bạn bè bằng ID hay tên gọi. Tuy nhiên, việc nhập chuỗi ký tự dài thật phiền phức đúng không nào? Nhờ vào QR code, vấn đề trên đã được giải quyết. Bằng thao tác quét QR code, ta có thể tìm được account LINE/Twitter của bạn bè một cách dễ dàng. Chức năng này đặc biệt tiện lợi khi trao đổi thông tin, làm quen với những người bạn mới gặp.

## Quản lý người ra vào

Trong một số sự kiện hoặc buổi hoà nhạc, trận đấu bóng, QR code được in trên vé, giúp cho việc soát vé. Sau khi đặt vé trên Internet, người tham gia sẽ nhận được vé điện tử chứa QR code, sau đó, khi đến sự kiện, chỉ cần quét QR code nhận được, ta đã có thể vào trong khán đài. Tương tự, ở các sân bay, cửa soát vé tàu, ta cũng có thể thấy QR code được áp dụng dưới dạng Cửa soát vé điện tử.

## Quản lý quy trình, quản lý kho trong ngành sản xuất

Đây là một ứng dụng ít được biết đến hơn của QR code, tuy nhiên, ban đầu mục đích QR code được tạo ra là nhằm phục vụ cho ngành sản xuất. Ngoài tác dụng quản lý số lượng lưu kho, bằng việc gắn cho mỗi sản phẩm một QR code riêng biệt, ta có thể dễ dàng truy xuất nguồn gốc, quy trình sản xuất của sản phẩm đó. Ngoài ra, QR code cũng được ứng dụng trong việc quản lý xuất nhập kho, quản lý số lượng bán ra, số lượng tồn kho trong các cửa hàng.

**Trong bối cảnh việc thanh toán không tiền mặt ngày càng trở nên phổ biến, QR code cũng ngày càng được ứng dụng rộng rãi hơn. Hãy cùng trải nghiệm sự tiện lợi mà QR code đem lại nhé!**
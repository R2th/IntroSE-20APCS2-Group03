Cross-Site Scripting (XSS) là dạng tấn công injection mà trong đó kẻ tấn công đưa các đoạn scripting code vào một ứng dụng web, và trình duyệt của người dùng thực thi đoạn scripting code đó như thể nó là một phần của trang web và đến từ một nguồn đáng tin cậy.

Trong quá khứ, tấn công XSS đã bị hiểu sai và đánh giá thấp. Nhiều người đã không nhìn ra sự ảnh hưởng của nó. Vấn đề ở đây là chúng ta có thể tận dụng các lỗ hổng, các điểm yếu của web server hay ứng dụng web và sử dụng nó để tấn công người dùng của trang web / ứng dụng web đó.

Hãy tưởng tượng bạn đăng nhập vào tài khoản ngân hàng. Trang web ngân hàng của bạn lưu một số thông tin trong trình duyệt để dùng trong một khoảng thời gian nào đó. Thông tin đó có thể chỉ là thông tin phiên làm việc, những cũng có thể là thông tin quan trọng như mã người dùng của bạn (user ID) hay số tài khoản ngân hàng. Những thông tin này được trình duyệt lưu lại và chỉ sử dụng cho chính trang web ngân hàng đó. Điều gì sẽ sảy ra nếu như những kẻ tấn công có khả năng truy cập vào những dữ liệu quan trọng đó? Vì thế nên mức độ nguy hiểm và sự ảnh hưởng của các lỗ hổng XSS là không thể xem nhẹ.

Trong bài viết này chúng ta sẽ cũng tìm hiểu rõ hơn về Cross-Site Scripting (XSS).
# 1.	Các thành phần của tấn công XSS
Một tấn công XSS được tạo nên bởi các thành phần sau:

*	Người dùng, đối tượng bị lừa chạy đoạn mã (code) trong trình duyệt của mình.
*	Ứng dụng bị lợi dụng để gửi đoạn mã đến người dùng.
*	Kẻ tấn công, đối tượng hy vọng khai thác được thông tin từ mục tiêu.
*	Đoạn mã (code – thường là mã Javascript) mà kẻ tấn công hy vọng sẽ được chạy trên trình duyệt của người dùng.
# 2.	Quy tắc một nguồn (Same Origin Policy)
Quy tắc một nguồn được trình duyệt sử dụng để xác định xem client-side code có thể tương tác hay thay đổi nội dung hay không. Quy tắc này biểu thị  rằng client-side code chỉ có thể truy cập nội dung từ cùng một nguồn. Một nguồn được xác định bởi tên miền (hostname), cổng (port) và giao thức (protocol). Tên miền được sử dụng chứ không phải IP vì nhiều trang web sử dụng nhiều máy chủ cũng lúc để cân bằng tải.

Tại sao lại cần phải có quy tắc một nguồn? Quy tắc này được áp dụng để cung cấp sự bảo đảm an toàn cho nội dung trang web. Hãy tưởng tượng bạn có thể viết mã code giao tiếp với nội dung của bất kỳ trang nào. Khi đó các trang web có thể bị thay đổi giao diện trong trình duyệt, cookies có thể bị đánh cắp, và các forms có thể bị thay đổi để submit đến bất kỳ nơi nào mà kẻ tấn công muốn. Những tấn công kiểu này là có thể với XSS, nhưng nếu như không có quy tắc một nguồn thì chúng còn được thực hiện dễ dàng hơn rất nhiều, đôi khi chỉ đơn giản là gửi một email có chứa mã code JavaScript.
# 3.	Phát hiện lỗ hổng XSS
Bây giờ chúng ta sẽ thảo luận đến việc tìm kiếm các lỗ hổng này trong ứng dụng web. Nhiều lỗ hổng rất dễ phát hiện. Chỉ bằng việc nhập một đoạn mã JavaScript vào các trường dữ liệu vào (input), chúng ta có thể phát hiện ra hầu hết các lỗi XSS đơn giản.

Cách đơn giản nhất để kiểm tra lỗ hổng XSS là chúng ta sẽ nhập đoạn code <SCRIPT>alert(“XSS”)</SCRIPT> vào bất kỳ trường dữ liệu vào nào chấp nhận nó. Sau khi dữ liệu được nhập thành công, ta sẽ chờ xem có một cửa sổ pop-up kèm dòng thông báo “XSS” hiện lên hay không.

Để đơn giản hóa việc kiểm tra, thông thường chúng ta sẽ tập trung vào các trường trả về kết quả ngay sau khi nhập dữ liệu. Nhưng vẫn cần chú ý rằng có nhiều trường dữ liệu được nhập và lưu lại trong ứng dụng web để có thể hiển thị các dữ liệu sau này khi cần thiết.

Ví dụ, một form cho phép người dùng cập nhật thông tin có thể không hiển thị lại các thông tin đó ngày lập tức, tuy nhiên những thông tin này được lưu trữ và hiển thị trong trang thông tin của người dùng, nơi mà có thể được truy cập bởi chính người dùng đó hay bởi một người dùng khác bất kỳ khi truy cập vào trang thông tin cá nhân này. Qua đó có thể thực hiện tấn công trực tiếp đến những người dùng khác.
# 4.	Bộ lọc
Khi mà các tấn công XSS được biết đến nhiều hơn thông qua cộng đồng các nhà phát triển, các ứng dụng cũng đã bắt đầu áp dụng các kỹ thuật lọc nhằm bảo vệ ứng dụng và người dùng của nó khỏi những cuộc tấn công. Các ứng dụng cố gắng lọc các dữ liệu được nhập vào trước khi sử dụng nó trong ứng dụng hay hiển thị nó cho người dùng. Có hai loại bộ lọc chính được sử dụng: danh sách trắng (whitelisting) và danh sách đen (blacklisting). Hai bộ lọc này khác nhau ở cách chúng xác định một dữ liệu nhập vào là độc hại hay không. Các ứng dụng luôn phải kiểm tra phát hiện đoạn mã độc hại mỗi khi có dữ liệu được nhập vào, nhưng kẻ tấn công lại chỉ cần tìm ra một cách duy nhất để vượt qua được các bộ lọc này là đủ.

Có hai cách chính để kiểm tra dữ liệu vào: whitelisting và blacklisting.

**Whitelisting**: Lập trình viên sẽ xác định xem những dữ liệu nào được phép nhập vào trường. Đây là phương pháp được khuyến khích sử dụng.

**Blacklisting**: Lập trình viên xác định các ký tự hay các cấu trúc đã được biết đến là độc hại và lọc nó ra khỏi trường dữ liệu hoặc ngăn chặn việc nhập dữ liệu vào hệ thống.

Cả hai cách tiếp cận đều có những thách thức riêng. Whitelisting có thể làm việc tốt hơn bởi vì lập trình viên phải xác định cụ thể các yêu cầu của mỗi trường dữ liệu. Với dữ liệu ngày tháng hay thời gian thì hiếm khi có vấn đề. Tuy nhiên với trường text thì vấn đề trở nên lớn hơn nhiều. Thêm vào đó, quá trình whitelisting vẫn yêu cầu phải có hiểu biết về những ký tự độc hại, để phòng trường hợp ngẫu nhiên nào đó mà chúng lọt được vào whitelist.

Vấn đề với blacklisting là nó không bao giờ xét được toàn bộ các tấn công. Kẻ tấn công có thể sáng tạo không giới hạn. Các lập trình viên có thể chặn những ký tự độc hại đã biết, những còn những ký tự khác thì sao? Điều gì sẽ xảy ra nếu các đoạn code được mã hóa?

Giải pháp hiệu quả nhất là kết hợp cả hai phương pháp whitelisting và blacklisting cùng với nhau.
# 5.	Cách qua mặt các bộ lọc
Có nhiều kỹ thuật khác nhau để qua mặt các bộ lọc trong các ứng dụng web:
*	Mã hóa như Unicode hay Hex
*	Các dạng scripting khác như VBScript
*	Scripting trong các thẻ khác thay vì thẻ `<script>`

Các bạn có thể xem thêm về các kỹ thuật qua mặt bộ lọc theo đường dẫn sau đây:
    
XSS Filter Evasion Cheat Sheet: [https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet]
#     6. Các loại XSS
## a.	Reflected XSS
Reflected XSS là dạng tấn công mà đoạn script được trả về người dùng từ web server dưới dạng một thông báo lỗi, kết quả tìm kiếm hay bất cứ một dạng phản hồi nào có chứa một vài hay tất cả các dữ liệu được gửi đến server như một phần của truy vấn (request).  Một cách đơn giản, kẻ tấn công sẽ gửi một đoạn script như một phần của truy vấn đến server, sau đó server sẽ phản hồi lại một response có chứa đoạn script đó. Lúc này trình duyệt sẽ chạy đoạn script vì cho rằng nó đến từ nguồn tin tưởng.

Nếu gửi trực tiếp script qua các trường input thì kết quả nhận được sẽ trên chính máy của mình. Mà không có ai hứng thú với việc hack máy của chính bản thân mình cả. Do vậy tấn công Reflected XSS được gửi tới các nạn nhân qua các con đường khác như là trong một email, hay trong một trang web khác.

Khi người dùng bị lừa click vào một đường link độc hại, gửi một form dữ liệu, hay chỉ đơn giản là truy cập vào trang độc hại thì đoạn script mang mã độc sẽ được gửi đến người dùng thông qua trang web có lỗ hổng XSS. Lúc này trình duyệt tin tưởng và tiến hành chạy đoạn script đó.

Reflected XSS còn được gọi với tên gọi Non-Persistent XSS hay Type-II XSS. Dạng tấn công này ảnh hưởng đến chỉ một nạn nhân là người click vào đường link.    
## b.	Persistent XSS
Persistent XSS, hay còn gọi là Stored XSS, Type-I XSS, là dạng tấn công mà script mang mã độc được lưu trữ trên máy chủ mục tiêu dưới dạng dữ liệu người dùng như tin nhắn diễn đàn, bài đăng, bình luận, v.v. 

Kẻ tấn công sẽ tìm cách đưa script mang mã độc lên máy chủ. Nếu máy chủ chấp nhận dữ liệu này, nó sẽ lưu trữ dài hạn dữ liệu (bao gồm cả script) và sẵn sàng cung cấp như mọi tài nguyên khác của trang web. Nạn nhân sẽ nhận được từ máy chủ và thực thi đoạn script mang mã độc khi truy vấn đến thông tin được lưu trữ.

Loại tấn công này tác động đến một lượng lớn người dùng do dữ liệu được lưu trữ có chứa script độc hại được cung cấp bởi ứng dụng web. Mọi người dùng ứng dụng đều có khả năng bị tác động khi truy cập đến dữ liệu đó.
#     Nguồn tham khảo    
   SANS SEC542 - 2016
    
   XSS - OWASP [https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)]
![](https://images.viblo.asia/fd984f99-ca67-4c42-88ea-697e58e8871d.jpg)

Bạn đã từng bao giờ thấy URL của nội dung kết nối từ kết quả search có đuôi là “google.co.jp” chưa? Hay bạn đã từng nhìn thấy trang web nào có gắn biểu tượng hình tia chớp ở màn hình search chưa?

Những trang web đó được tạo trên cơ chế có tên là AMP để hiển thị các trang ở tốc độ cao.

Trong thời đại công nghệ số hiện nay, số lượng người sử dụng smartphone đang gia tăng nhanh chóng. Điều này khiến cơ hội truy cập các website của người dùng có thể thực hiện ở mọi nơi mọi lúc.

Trong bài viết “Find out how you stack up to new industry benchmarks for mobile page speed” được công bố trên Google ngày 2/2017, người ta thấy rằng khi người dùng truy cập vào các trang web từ smartphone thì tỉ lệ rời trang web khi phải đợi load trang tăng khá cao.

Cụ thể là: tỉ lệ rời trang khi phải đợi từ 1~ 3 giây là 32%, 1~ 5 giây là 90%, 1~ 6 giây là 106%, 1~ 10 giây tăng đến 123%. Từ dữ liệu này, chúng ta có thể thấy rằng tốc độ hiển thị trang ảnh hưởng đến việc xem trang. Thời gian để hiển thị một trang web có thể dẫn đến việc giảm độ tương tác của người dùng với trang. Và đây chính là điều mà chúng ta cần phải tránh chạm phải.

Để cải thiện tốc độ hiển thị trang web, có nhiều phương pháp được đưa ra như tối ưu hóa kích thước hình ảnh và cải thiện mã nguồn,... Một trong số đó có 1 phương pháp có tên là AMP. AMP là một frame work tạo content có tốc độ hiển thị nhanh chóng. Bài viết dưới đây sẽ giới thiệu cho các bạn những kiến thức cơ bản về AMP.

## AMP là gì

AMP là từ viết tắt của Accelerated Mobile Pages, đây là một frame work dùng để tăng tốc độ hiển thị page trên thiết bị smartphone do Google và Twitter đồng sáng lập. Theo giải thích trên Google Japan Blog ngày 25/2/2016 thì tốc độ hiển thị trang có sử dụng AMP nhanh gấp 4 lần so với các trang không sử dụng. AMP được sử dụng trong các phương tiện truyền thông khác nhau bao gồm cả báo chí, nó cung cấp một môi trường thao tác thuận tiện cho người dùng smartphone. AMP là open source nên bất cứ ai cũng có thể sử dụng. Do đó, nó sẽ không quá khó để bạn sử dụng cho trang web của mình.

AMP không tải trang web mà nó tăng tốc độ hiển thị trang bằng cách sử dụng cache. Cache là phương pháp lưu trữ dữ liệu của trang sau khi mở và tiết kiệm thời gian khi chuyển màn hình trang. Cache là chức năng có sẵn trên trình duyệt và công cụ tìm kiếm. Các trang web có sử dụng AMP sẽ có đặc trưng là dung lượng data nhỏ, không tốn thời gian hiển thị.

Ngoài ra, URL của các trang có sử dụng AMP cũng khác với các URL thông thường. Do hiển thị trang đã được cache nên URL của trang có sử dụng AMP thường nằm ở phía sau domain của công cụ search. Khi hiển thị kết quả search nếu có trang sử dụng AMP thì nó thường có gắn icon tia chớp bên dưới tiêu đề trang, điều này khiến người dùng biết được đó là trang có sử dụng AMP. Khi nhấn vào trang có icon này thì bạn cũng có thể kiểm tra được URL của trang gốc. 

![](https://images.viblo.asia/2701455d-3c5b-4952-86f1-9568c2ce9337.png)

## Hiệu quả mà AMP mang lại

### Nâng cao độ hài lòng của người sử dụng

Như đã đề cập ở phía trên, thời gian load trang có ảnh hưởng đến tỉ lệ rời trang của người dùng. Khi người dùng truy cập vào 1 trang web thì chắc chắn họ đang có một mục đích gì đó. Dù chỉ đơn thuần là tìm kiếm thông tin hay thực hiện mua hàng thì điều này cũng ảnh hưởng đến mức độ hài lòng khi sử dụng.  

Đặc biệt, với những người dùng sử dụng smartphone thì họ không bị giới hạn về môi trường truy cập. Do đó việc hiển thị trang một cách nhanh chóng và mượt mà là một điều không thể bỏ qua.

### Dễ dàng kết nối đến các trang từ kết quả tìm kiếm

Việc người dùng có thể kết nối đến các trang có sử dụng AMP từ màn hình kết quả search nhanh hơn nhiều so với các trang không sử dụng AMP đã được minh chứng rõ ràng. 

### Cải thiện tốc độ hiển thị sẽ thay đổi tích cực về SEO

Có một sự thật cần hiểu rõ là dù bạn có sử dụng AMP cho trang của mình thì nó cũng không giúp bạn cải thiện được vị trí tìm kiếm của trang. Tuy nhiên, thời gian load trang lại là yếu tố quan trọng liên quan mật thiết đến SEO. Việc ứng dụng AMP để nâng cao trải nghiệm người dùng sẽ là chìa khóa kết nối đến SEO

## Phương pháp ứng dụng AMP

### Phương pháp 1: Sử dụng plug-in với wordpress

Nếu trang web của bạn có sử dụng Wordpress thì bạn có thể dễ dàng sử dụng plugin có tên AMP. Tùy theo chức năng của plugin mà có thể tự động tạo trang web có ứng dụng AMP. Với những trang web này phía đuôi URL thường được gắn thêm “/amp/”. 

Tuy nhiên, có một điều cần phải chú ý đó chính là việc xác nhận độ tương ứng giữa version của plugin với wordpress. Ngoài ra, việc cài đặt plugin cần phải thực hiện sau khi đã backup xong.

### Phương pháp 2: sửa trang hiện tại bằng cách thủ công

Nếu trang của bạn không sử dụng các CMS như wordexpress,... thì bạn cần phải tạo file một cách thủ công. Trường hợp này bạn cần phải tạo 2 trang là trang web thông thường và web AMP. Việc tạo trang web AMP bắt buộc phải tạo trang bằng AMP HTML.

Tuy nhiên, do CSS không thể đọc các file bên ngoài, nên nó giới hạn những điều mà 1 trang thông thường có thể thực hiện. Ngoài ra, JavaScript cũng phải sử dụng cái dành cho AMP. Mặc dù vậy, việc tạo một trang web bằng HTML sẽ không khó nhưng nó mất nhiều thời gian để tạo tính tương thích với AMP.

## Những điều cần chú ý trước khi ứng dụng AMP vào trang web

### Mức độ ảnh hưởng đến design của trang web

Khi bạn tạo một trang web theo các thông số của AMP thì có thể trang của bạn không thể sao chép được các thiết kế phức tạp. Do đó, khi ứng dụng AMP vào trang web hiện có của bạn thì bạn cần phải chú ý đến khả năng sao chép design từ trang gốc.

Bên cạnh đó, để tránh phát sinh những sai khác giữa trang web thường và trang web có ứng dụng AMP thì bạn nên tạo trang bằng các design đơn giản có độ tương thích với AMP. Ngoài ra, bạn cũng nên chú ý có một số JavaScript không sử dụng được.

### Mất thời gian do phải xử lý theo các thông số của AMP

Bạn cần phải có lượng kiến thức nhất định về các thông số kĩ thuật liên quan đến trang web có ứng dụng AMP khi tạo trang ứng dụng chúng. Mặc dù nó không có nhiều khó khăn về mặt kĩ thuật nhưng lại khá mất thời gian trong việc thao tác. 

### Việc phân tích truy cập sẽ có nhiều trở ngại

Như đã nói ở trên, các trang có ứng dụng AMP thường có URL khác với các trang thông thường. Vì vậy, khi sử dụng Google Analytics để phân tích truy cập thì sẽ gặp nhiều khó khăn. Mặc dù cùng một nội dung nhưng việc tổng hợp dữ liệu trên trang thông thường và trang có ứng dụng AMP lại khác nhau. Do đó mà việc phân tích dữ liệu cũng mất nhiều thời gian hơn.

### Có những trang web không thể ứng dụng được AMP

Việc ứng dụng AMP chỉ dành cho những trang web đơn giản, chủ yếu dùng để hiển thị các trang chính thống có nội dung tĩnh như các bài báo,… Nó không phù hợp với những trang web có nội dung động. 

## Tổng kết

Việc ứng dụng AMP là một nền tảng quan trọng góp phần cải thiện mức độ hài lòng của người dùng thông qua việc cải thiện tốc độ hiển thị trang. Mặc dù không khó để ứng dụng AMP vào trang web nhưng nó tốn nhiều thời gian để thao tác. Ngoài ra, việc ứng dụng này dễ hay khó cũng còn phụ thuộc vào thông số kĩ thuật của trang web mà bạn có.

Vì vậy mà bạn cần phải xem xét mức độ cần thiết của công việc, khả năng tương thích của trang để quyết định có nên ứng dụng AMP hay không. Một đặc trưng của AMP bạn cần phải nắm được đó chính là nó cung cấp cho người dung một môi trường kết nối vào các trang một cách dễ dàng và nhanh chóng.  

*Link nguồn: https://ferret-plus.com/11854*
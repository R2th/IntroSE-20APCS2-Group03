# Question 1: Thủ thuật tăng performance cho việc import data
> Các thủ thuật tăng performance cho việc import data. Có nên import hàng loạt và bỏ qua validation không?

***Answer:***
Tính đến thời điểm hiện tại, Ruby cũng như Rails đã có nhiều gem hỗ trợ cho việc import, export data dễ dàng hơn trước. Có thể sử dụng những gem này để giúp cho việc import data từ file csv thuận tiện hơn chẳng hạn như smart_csv, csv_importer. Còn đối với những file cần import mà có số lượng data lớn (hơn trăm nghìn dòng bản ghi) thì có thể cân nhắc những trường hợp sau đây:

Thứ nhất, nếu file dữ liệu import được cung cấp có độ tin cậy cao và hoàn toàn chuẩn xác thì có thể xem xét bỏ qua validation của Rails rồi import thẳng vào database. Và thay vì chạy từng lệnh để insert vào database thì ta nên chạy 1 lệnh insert duy nhất. Một số gem có hỗ trợ tính năng trên là https://github.com/zdennis/activerecord-import. Khi đó việc import sẽ không cần phải thực hiện qua những đoạn check logic validate cho dữ liệu và chỉ cần 1 câu lệnh insert sẽ import được nhiều dữ liệu hơn, Nhờ vậy, việc import file có chứa nhiều dữ liệu sẽ trở nên nhanh chóng.

Thứ hai là sử dụng rake task để import trực tiếp vào database. Cách này cũng sẽ bỏ qua validation của Rails và import dữ liệu trực tiếp vào database qua những câu lệnh SQL. Rake task là do developer viết ra với bản chất là những câu lệnh SQL thay vì sử dụng hàm hỗ trợ skip validation trong các gem để import.

-----
# Question 2: Tối ưu query n+1
> Có phải lúc nào cũng tối ưu được query n+1? Có trường hợp nào bắt buộc phải dùng nó mà không tối ưu được không? Dùng eagerloading hay preloading tốt hơn? 
> 
***Answer:***
Anh Tùng đã từng đọc 1 bài viết với tiêu đề “N+1 is a Rails feature”. Trong bài viết này, tác giả đưa ra 1 ví dụ là khi tối ưu N+1 query gây ra tác dụng ngược. Giả sử chúng ta có model Post và model Author, mỗi post có 1 author. Ở trang index của post chúng ta cần hiển thị danh sách các post kèm theo thông tin của author. Thường thì chúng ta cần 1 câu query để lấy ra các post và N câu query để lấy ra thông tin của N author tương ứng, đây chính là vấn đề N+1 query. Để giải quyết thì chúng ta có thể dùng eager load để lấy ra dữ liệu của Post và Author với 1 query hoặc preload để lấy ra dữ liệu với 2 query. Tuy nhiên, tác giả của bài viết kia đã chỉ ra 1 trường hợp mà chúng ta không nên làm vậy. Đó là khi chúng ta cache lại view (HTML) của từng post. Khi đó, nếu như thông tin của post không có gì thay đổi, Rails chỉ cần đọc HTML đã được cache và trả về cho client mà không cần lấy dữ liệu của author. Trong trường hợp này, việc load trước dữ liệu của tất cả author bằng eager load hoặc preload là không cần thiết. Ngoài ra, trong thực tế còn có trường hợp dùng eager load hoặc preload sẽ dẫn đến 1 câu slow query mà thời gian thực thi còn chậm hơn N + 1 query. Vậy nên, theo ý kiến của anh Tùng thì không phải lúc nào cũng cần tối ưu N + 1 query mà phải tuỳ vào từng trường hợp cụ thể.

-----
# Question 3: Import/export file csv/excel
> Trong các dự án dùng Ruby on Rails hiện nay rất hay gặp yêu cầu về import/export file csv/excel. Tuy nhiên, nếu file là đa ngôn ngữ như tiếng Nhật, tiếng Trung, tiếng Hàn…thì nên xử lý như thế nào? 
> 
***Answer:***
Vì không cách nào xử lý chung cho tất cả các trường hợp nên cần detect ra từng loại để tìm ra tất cả các loại encoding trong các file. Sau đó thực hiện xử lí từng file một. 

Với trường hợp 1 file có dung lượng lớn (khoảng 1GB) thì cần một máy tính cực khoẻ mới có thể xử lý được. Khi đó cần thực hiện chia nhỏ file lớn ra thành nhiều file có dung lượng nhỏ hơn và xử lý từng phần.

Ở phần này, bạn Duy Vinh (Div1) đã có thêm thắc mắc: Cache rất nhiều lần thì có gây ảnh hưởng đến Performance hay ko?

Đáp án: Trong ứng dụng nếu gặp phải trường hợp query xuất hiện nhiều lần cache thì cũng không ảnh hưởng đến performance của server. Lý do là vì khi cache lại một query nào đó thì database chỉ bị tác động ở lần query đầu tiên, kết quả trả về được lưu trong bộ nhớ. Khi câu query tương tự xuất hiện thì bộ nhớ sẽ trả về kết quả đã lưu từ trước mà không phải đụng đến database lần nữa. Tuy nhiên, hiện tượng này xuất hiện có nghĩa là ứng dụng của bạn đã gặp phải tình trạng N+1 query, có thể tìm nguyên nhân gây ra N+1 query và xử lý để không phải gọi cùng một query nhiều lần.
![](https://images.viblo.asia/ac0bd31e-eade-4e8b-b6c0-87c0653e2ee4.jpg)

-----
# Question 4: Xây dựng hệ thống lớn 
> Đối với Ruby on Rails trên production có thể cần sử dùng rất nhiều RAM (có thể nói một cách dễ hiểu là tốn rất nhiều RAM để chạy). Điều này có đúng hay không? Như vậy, nếu mình mong muốn xây dựng một hệ thống lớn như Twitter, Spotify thì cần có giải pháp như thế nào?
> 
***Answer:***
Đúng là ứng dụng Ruby on rails trên production sẽ tốn nhiều ram. Nếu như xét đến những app server dành cho Rails thì Unicorn là ngốn RAM nhất, tiếp đến là Puma, và ít nhất là Passenger nhưng nếu so với các app server dành cho website được build bằng những ngôn ngữ khác thì vẫn thuộc loại ăn RAM nhiều. Bất kể ứng dụng của bạn có sử dụng load balancer hay không thì vẫn cần tối thiểu là 4GB RAM để có thể khởi động những workers cần thiết để sử dụng cho server của Rails.

Xét đến những dự án thực tế, đối với ứng dụng có 12000 concurrent users (12000 lượt người dùng truy cập cùng lúc) thì những trang web được build bằng Rails khó có thể tải nổi. Một ví dụ điển hình là trang web Twitter ban đầu vốn được xây dựng bằng Ruby on Rails, nhưng sau khi lượng user tăng cao và càng ngày càng phát triển thì những developer tại Twitter đã migrate dần từ Rails sang ngôn ngữ Scala để có thể đáp ứng nhu cầu người dùng lớn như hiện tại.

Ngoài ra để đáp ứng nhu cầu ứng dụng Rails có lượng truy cập cao thì cách đơn giản là bạn có thể bỏ thêm tiền để tăng cấu hình server, RAM, CPU lên.

-----
# Question 5: Cách nâng cao kỹ năng bản thân
> 1 bạn Junior Dev đã thắc mắc về cách thức nâng cao technical cho bản thân, mong muốn các Professor X chia sẻ quá trình nâng cao kỹ năng của họ và có thể đưa ra vài lời khuyên cho các bạn trình độ Fresher/Junior nói chung.
> 
***Answer:*** 
* Kinh nghiệm của anh Thành Linh – “Vượt qua sức ì”: Theo anh, sự chăm chỉ là yếu tố quan trọng dẫn đến thành công và được thể hiện qua những việc nhỏ nhất. Ví dụ bạn làm xong task thì sẽ làm gì? Bạn lướt Facebook, xem Youtube, xem phim, chơi game…hay bạn biết cần phải học kỹ thuật mới, trau dồi kiến thức mới. Tuy nhiên, vấn đề đáng nói là bạn biết nên làm gì là một chuyện nhưng bạn có bắt tay vào thực hiện việc đó không lại là chuyện khác. Đó chính là sức ì mà bất kỳ ai cũng có và nếu không thể vượt qua sức ì đó thì sẽ không thể bắt đầu làm được việc gì cả. Hãy đặt ra mục tiêu là trong thời gian rảnh sẽ học gì, làm gì và cố gắng hoàn thành theo từng mục tiêu nhỏ, đừng đặt kỳ vọng mình sẽ trở nên bá đạo trong ngày một ngày hai mà thay vào đó là đi từng bước một, tích lũy thành quả từng chút một sẽ tốt hơn.
* Tuyệt chiêu của anh Tùng B – “Học và thực hành”: Anh Tùng khi vào Framgia mới bắt đầu vừa học Ruby vừa học Rails qua tutorial và sách Ruby Metaprogramming. Đến khi anh được công ty cử đi thi lấy chứng chỉ Ruby Bạc, anh đã ôn tập rất nhiều và đặc biệt là thông qua cuốn sách luyện thi Ruby Bạc – cuốn sách được coi là “từ điển về Ruby” giải thích rất nhiều và chi tiết các kỹ thuật trong Ruby. Trong thời gian ôn thi, anh đã phải ghi nhớ cũng như thực hành rất nhiều và đạt được mục tiêu Ruby Bạc. Sau này, anh cũng đạt thành tích rất cao là đạt chứng chỉ Ruby Vàng. Với những kỹ thuật anh đã từng học và thực hành, anh đã có thể áp dụng khá thành thạo trong các dự án mà trước đó anh chưa từng làm qua.
* Bí kíp của anh Đăng Huy – “Thời gian rảnh cũng dành cho học tập”: Hơi khác so với anh Tùng B, anh Huy chưa bao giờ được đào tạo một cách bài bản, thậm chí chưa đọc hết cuốn sách Metaprogramming nhưng anh học bằng cách đọc code của những người đi trước và nhảy vào những dự án maintain cực nát để xem chỗ code “thơm” code “thối” như thế nào. Khi gặp vấn đề bug hay gem, anh thường tự debug đến cùng, giải quyết đến khi hiểu bản chất của vấn đề. Anh sẵn sàng đánh đổi việc bỏ qua thời gian rảnh vui chơi giải trí để học tập và trau dồi kỹ năng làm việc có ích sau này.

Mặc dù bí quyết của mỗi Professor X là khác nhau nhưng tựu chung lại vẫn là đề cao sự chăm chỉ. Cuối cùng, anh Lê Duy Khánh đã tóm lại những cách thức mà bản thân anh cũng từng trải nghiệm và đưa ra phương pháp tăng skill dựa vào 3 bí kíp của các anh Professor X. Cụ thể là việc đọc, hiểu, đánh giá được code của người khác là kỹ năng quan trọng và vì thế nên đầu tư thời gian cho việc này. Ngoài ra, việc đọc thêm sách, tutorial về kỹ thuật mới là không bao giờ thừa thãi và nên có một kế hoạch lý tưởng cũng như mục tiêu cụ thể cho kế hoạch, như dành ra 2-3h một tuần vừa học, vừa thực hành. Nếu có khả năng hơn nữa thì việc xây dựng một sản phẩm cá nhân để tạo môi trường thực hành kiến thức mới cũng là ý tưởng không tồi.
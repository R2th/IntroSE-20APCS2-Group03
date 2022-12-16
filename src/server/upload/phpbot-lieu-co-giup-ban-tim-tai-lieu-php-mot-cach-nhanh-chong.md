# Giới thiệu
Dành cho những người chưa hiểu Bot hay robot mạng là gì, thì đó là những ứng dụng phần mềm chạy các tác vụ tự động hóa trên mạng. Nó thực hiện các việc đơn giản, có cấu trúc lặp với một tần suất cao hơn nhiều so với khả năng  soạn thảo của con người.

Ví dụ như chatbot, nó là một chương trình máy tính tương tác với người dùng bằng ngôn ngữ tự nhiên như là âm thanh, tin nhắn văn bản. 
Với các bạn đã làm  việc với PHP thì chắc hẳn mọi người sẽ biết đến[ Botman](https://botman.io/) hoặc là [FondBot](https://github.com/fondbot/framework), nó đều là những framework để xây dựng lên chatbot.
Nhưng hôm nay mình sẽ giới thiệu [PHPBot](https://www.phpbot.org/), nó không hề giống với Botman và FondBot là xây dựng ứng dụng từ đầu, mà nó là một chatbot trực tuyến, giúp bạn tìm kiếm mã nguồn,  hướng dẫn sử dụng cho từng thuật ngữ trong PHP.

![](https://images.viblo.asia/de2dac01-d7e5-481c-aaf9-4a7d7f09011d.jpg)
Cùng nhau tìm hiểu với mình nhé!
# Khái niệm
Theo như những gì trên docs nói thì PHPBot là con bot duy nhất truy xuất các ví dụ code nhanh hơn cả Google! Phản ánh của người dùng là nó còn nhanh hơn cả việc đọc các tài liệu PHP. 

Việc tra cứu cũng rất đơn giản, bạn chỉ cần nhập 1 thuật ngữ liên quan đến PHP (ví dụ như là `array_values`) và PHPBot sẽ trả lời bằng một mã ví dụ, như dưới đây:
![](https://images.viblo.asia/184797b2-3e66-40e3-b862-143d283a1e49.JPG)
Sau đó bạn chỉ cần copy paste vào code editor rồi chạy thử là được. Mỗi một query sẽ cho ra một response khác nhau. Ví dụ thử với `echo`:

![](https://images.viblo.asia/f8a202e5-f15e-4520-9826-b207b97f9996.JPG)



Ngược lại với `array_values` thậm chí còn không có comment giới thiệu nhiệm vụ của hàm này, thì với `echo` thì PHPBot gợi ý rất chi tiết phải không nào =))
# Phân tích một chút về PHPBot
Nghe thì có vẻ khá là thú vị khi không phải đọc những bản docs dài ngoằng cho 1 function mà bạn muốn tìm kiếm, nhưng cái gì cũng có 2 mặt của nó. Và PHPBot cũng không phải là ngoại lệ.
## Kiến thức nó mang lại và Bugs còn tồn tại
Lượng kiến thức mà nó mang lại khá hạn chế. Chỉ những function thông dụng sẽ được gợi ý đầy đủ. Hay như ví dụ sau:
![](https://images.viblo.asia/202e795e-0727-4b1c-91d2-b19b5b3ab5d3.JPG)
Hoặc là những magic method cũng không thể đưa ra mã code cụ thể:
![](https://images.viblo.asia/ecdbaceb-6957-4f88-9aeb-8b6798d19068.JPG)

Thật hài hước khi bắt bạn phải truy cập vào trang docs để tìm hiểu thêm :D

## Autocompletion / Suggestion

Với những truy vấn mà PHPBot không nhận ra, hay đối với những người dùng mới bắt đầu nhập, sẽ là tuyệt hơn nếu như có 1 dropdown gợi ý để người dùng lựa chọn hoặc tự động sửa lỗi nếu người dùng nhập sai function, hoặc ít ra khi nhập sai, bot cũng có thể suy ra những gì chúng ta muốn nói và đưa ra lời đề nghị. Ví dụ như `preg_split` và `explode` đều được sử dụng để phân tách 1 chuỗi, nhưng nếu bạn nhập `preg_explode`, bot sẽ trả lời như sau:
![](https://images.viblo.asia/547371dd-f014-4f60-babb-9bf4c5fe3518.JPG)

Nếu bắt xem trong PHP term thì còn sử dụng con bot này làm gì nữa, hi vọng nó sớm đưa ra hệ thống gợi ý thân thiện cho người dùng.
## Code trả về cần thân thiện hơn
Các bạn có để ý là response mà bot trả về chỉ là các khối code được highlight, nhưng lại được trình bày không đẹp mắt và không thuận tiện cho việc sao chép. Như ví dụ dưới đây:
![](https://images.viblo.asia/0d91239b-f48b-4975-b15d-cfcfa7e5e6f3.JPG)

Sẽ là mất công nếu các bạn copy đoạn code trên kia về code editor của mình để chạy thử xem kết quả là gì. Điều mình cần là 1 comment phía trên đầu nói về chức năng của hàm tìm kiếm, và sau mỗi ví dụ sẽ có comment ghi output của đoạn code mà nó thực hiện.

Còn về coding convention thì nhìn khá là rối mắt phải không các bạn! Ít ra nó cũng nên viết code theo 1 chuẩn quy định, chẳng hạn như PSR-2. 
# API

Ứng dụng này không cấp quyền truy cập API, do đó ta chỉ có thể sử dụng trên 1 tab/ trình duyệt riêng biệt. Trong thời đại mà tất cả chúng ta đều có hơn 20 tab khác nhau mở tại bất kì thời điểm nào trong lúc làm việc, sẽ là tốt hơn nếu PHPBot là một extension của trình duyệt hoặc là cung cấp 1 API.

Nếu tốt hơn thì có thể triển khai PHPBot như một công cụ, client hoặc IDE của bên thứ 3, có thể tăng cường đáng kể các công cụ như class templates và các code snippets trong các IDE như PHP Storm!
# Source Code

Hiện tại thì PHPBot đang có mã nguồn đóng. Có thể là do trước đây nó đã từng bị hack và bị crawler các truy vấn liên quan. Điều đó có thể hiểu được nhưng hi vọng tác giả sẽ sớm chuyển nó sang mã nguồn mở để cộng đồng coder có thể khai thác và biết đâu đó lại có những ý tưởng hay ho giúp phát triển ứng dụng này.
# Tổng kết

Bên cạnh những nhược điểm vừa nêu trên, thì mình thấy PHPBot cũng khá hữu ích. Nó cũng là một trải nghiệm hay cho mọi người. Và biết đâu khi mã nguồn này được mở và có sự đóng góp của cộng đồng thì nó lại trở thành một ứng dụng tuyệt vời. Cùng chờ đón sự phát triển của nó trong tương lai nhé!
> Tham khảo: 
> https://www.sitepoint.com/phpbot-can-php-bot-help-look-documentation-faster/
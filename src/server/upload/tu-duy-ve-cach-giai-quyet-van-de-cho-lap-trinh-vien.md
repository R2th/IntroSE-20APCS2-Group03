Chân của bạn bắt đầu bị chuột rút mười phút trước, nhưng dường như bạn không cảm nhận được điều đó.

Cuộc trò chuyện từ một chiếc TV ở xa không có gì ngoài tiếng ồn, một lời nhắc nhở nhẹ nhàng về thế giới bên ngoài.

Trọng tâm duy nhất của bạn là âm thanh từ các nút trên bàn phím của bạn. Click Click Click...Tạo một đối tượng mới...Phương thức insert...Khoảnh khắc khi bạn kiểm tra các dòng code mà bạn vừa thêm vào...Thành công! Tuyệt vời, và bây giờ bạn chỉ cần thêm một chức năng cuối cùng...console.log...chạy...bị sai! Cái gì vậy? Dòng nào gây ra lỗi vậy?

Viết code, dù bạn có bao nhiêu kinh nghiệm về nó, cũng giống như đi trên dây vậy. Bạn đã cố gắng cân bằng nhất, dựa trên kiến thức về ngôn ngữ và mức độ bạn có thể xây dựng một giải pháp cho một vấn đề mà bạn nghĩ ra. Bên trái và bên hải của bạn, không có gì cả - chỉ là một chương trình bị sai và xuất hiện thông báo lỗi. Khi bạn gặp nó (và nó xảy ra với tất cả mọi người),  một số thông báo lỗi có thể giúp bạn phát hiện được nơi phát sinh ra lỗi, còn 1 số thì lại thông báo chung chung, rất khó để giúp bạn tìm ra điểm gây ra bug. Thông thường, chỉ cần 1 lần viết lại và sửa lại chỗ phát sinh ra bug sẽ giúp chương trình hoạt động trở lại.

Nhưng điều gì xảy ra khi bạn gặp bế tắc khi cố gắng giải quyết vấn đề? Nhìn vào hơn 200 dòng trên máy tính dường như rất quen thuộc với bạn chỉ một giây trước, nhưng ngay sau đó thì mọi thứ đều trở nên lạ lẫm. Làm thế nào để bạn làm việc theo cách của mình, trong khi vẫn giữ cả những thay đổi và những dòng mới mà bạn vừa thêm?

## Step 0: Kiểm tra cú pháp/ lỗi chính tả
Rõ ràng? Chắc chắn, nhưng tôi nhận thấy rằng 98% sai lầm của tôi đến từ một dấu phẩy bị đặt sai hoặc một lỗi sai chính tả . Code là một đoạn mã không thể thêm tuỳ tiện một chữ cái hay cú pháp bị thiếu có thể phá vỡ toàn bộ các tệp.
Tin tốt là hầu hết các IDE đều đi kèm các tính năng giúp bạn bắt lỗi nhanh hơn. Tôi thích những điều sau đây: Tự động hoàn thành, phát hiện lỗi, mã hoá màu. Điều cuốic cùng làm tôi ưa thích bởi vì điều đó có nghĩa tôi lướt qua một chuỗi các đoạn văn bản màu cam và nhận thấy có một stinker nhỏ màu đỏ với dấu ngoặc kép bị thiếu và ngay lập tức tôi có thể sửa nó luôn. Nhưng nếu đã sửa hết những lỗi này mà không thấy thành công thì hãy tự hỏi bản thân...

## Step 1: Bạn biết gì về nó?

Có thể bạn cảm thấy bực bội khi sự tự tin của bạn bị phá vỡ bởi những "ERROR" màu đỏ trên màn hình. Nhưng bạn đã tự bình tĩnh lại được, điều nay có nghĩa là bạn đủ biết để tự tìm ra cách sửa lỗi. Vì vậy trước tiên bạn nên chọn ra thông báo lỗi và ghi chú lại.

“Syntax error…Tôi đã nhìn thấy điều này trước đây và lần cuối cùng nó chỉ là một lỗi đánh máy.”

“Null value….Tôi biết điều đó có nghĩa là một số giá trị không được xác định hoặc nó không tồn tại. Và tôi cũng biết rằng nó có lẽ được coi là ‘false.”

Một điều khác mà bạn có thể thử đó là, nếu bạn thêm nhiều dòng mã thì hãy thử tách chúng ra riêng biệt rồi đọc chúng một cách lần lượt, tự hỏi bản thân chức năng của từng dòng và nhắc nhở bản thân về định nghĩa. Có thể bạn đã quên toán tử "OR", hay đã quên cách tạo hàm của một đối tượng. Điều này dẫn tôi đến bước tiếp theo.

## Step 2: Bạn có bỏ lỡ điều gì không?

Ở đây, có thể thực sự hữu ích để tạo một danh sách những gì bạn không quen thuộc. Bạn có biết dòng mã nào là vấn đề không? Nếu không, kiểm tra lại thông báo lỗi để cô lập vấn đề. Có từ mới nào trong thông báo lỗi mà bạn đã thấy trước đó không? Bạn có đang thực hành một khái niệm mới, một khái niệm phức tạp và có thể tương tác với đoạn mã của bạn theo cách mà bạn mong đợi không? Nếu đó là trường hợp khác thì bạn có thể cần bước tiếp theo...

## Step 3: Nghiên cứu từ những nguồn mới

Đây là phần thực hành yêu thích của tôi về tiền mã hóa. Mỗi ngày bạn có thể phải đối mặt với một thử thách mới và mỗi ngày thử thách đó có thể là cơ hội để phát triển. Lượng tài nguyên có sẵn trực tuyến cho lập trình máy tính là đáng kinh ngạc. Từ các bài viết phá vỡ các trường hợp  rất cụ thể, tất cả các cách để hoàn thành các khóa học Ivy League. Cố gắng đừng cảm thấy nản lòng khi bạn gặp phải một ngôn ngữ lập trình / khái niệm mới rất lớn và điều này có thể xảy ra mỗi ngày! Thay vào đó, hãy thử xem nó như một lời mời để nghiên cứu những thứ mới mẻ. Biết đâu điều đọc thực sự khiến bạn cảm thấy hứng thú.

## Step 4: Tìm ai đó chia sẻ về vấn của bạn.

Điều đầu tiên bạn nên lạc quan rằng, chắc chắn không phải một mình bạn phải đối diện với nó đâu. Bên cạnh bạn, tại bất kỳ nơi bạn làm việc nào, cũng cũng những người đi trước, hoặc có những "siêu nhân" để bạn có thể mở lời để nhận được sự giúp đỡ từ họ. Bên cạnh đó, bạn còn có cả một cộng đồng lập trình viên trên toàn thế giới cũng với những diễn đàn công nghệ giải đáp mọi thắc mắc mà bạn găp phải. Chắc hẳn mọi lập trình viên đều biết đến StackOverFlow. Dường như mọi vấn đề bạn có thể tìm ở đó. Bạn cũng có thể tìm những sự giúp đỡ từ chính những người đòng nghiệp của bạn. Bất kể bạn ở đâu với sự phát triển chuyên nghiệp của mình, và cho dù bạn đang làm gì, thì điều tốt nhất và quan trọng nhất bạn có thể làm là tiếp tục, và không bỏ cuộc. Mọi vấn đề đều có cách giải quyết của nó hết.

Nguồn tài liệu: https://medium.com/@michaelchrupcala/dev-mindset-how-to-fix-a-new-problem-264e3125e7a3
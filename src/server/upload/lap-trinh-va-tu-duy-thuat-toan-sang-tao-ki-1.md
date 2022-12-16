Xin chào các bạn! trong thời gian tới, mình sẽ thực hiện một Series dài kì về "Lập trình và tư duy thuật toán sáng tạo". 
## Giới thiệu về Series

* **Nội dung:** Chia sẻ, giới thiệu những thuật toán trong **CTDL&GTLT**. Những ***cải tiến 'sáng tạo'*** trong giải thuật để tối ưu chương trình. Mình sẽ cố gắng giải thích một cách dễ hiểu và đơn giản nhất để các bạn có thể nắm bắt được ý tưởng và triển khai thuật toán.
* **Mục đích:** Đối với bản thân mình, series này sẽ giúp mình hệ thống lại kiến thức. Tiếp đó là chia sẻ, giúp đỡ mọi người cùng tìm hiểu và học tập về chủ đề này. Chính vì thế, các bạn có thể comment để trao đổi, thảo luận và góp ý nhé.

## Nội dung "Kì 1"
* Giới thiệu thuật toán là gì?
* Tại sao cần dùng thuật toán?
* Thuật toán có quan trọng không?
* Các bước giải một bài toán

Những nội dung ở "Kì 1" sẽ chỉ mang tính giới thiệu về khái niệm, lý do bạn cần sử dụng thuật toán. Những điều cơ bản đề giải quyết một bài toán.

## Thuật toán là gì?

![](https://images.viblo.asia/21d3304c-a86a-49e4-b18b-e8fe9cd645b9.png)

Thuật toán hay giải thuật *(tiếng anh là Algorithm)* có khá nhiều định nghĩa phức tạp. Bạn có thể đọc ở nhiều nguồn để hiểu thêm về nó. Cá nhân mình định nghĩa dễ hiểu rằng:
> **Thuật toán là “thuật” (phương pháp) để giải quyết 1 bài toán.** 

Nói dễ hiểu hơn, mỗi một bài toán giống như một chiếc hòm chứa đựng kho báu (kết quả, đáp án), và chiếc chìa khoá để mở cái hòm đó chính là “giải thuật”. Nếu dùng sai chìa khoá, bạn vẫn có thể mở được hòm (bằng nhiều cách khác nhau:upside_down_face:), nhưng mà sẽ mất nhiều thời gian, hoặc mở được hòm thì kho báu ở bên trong bị méo mó, không toàn vẹn. Sử dụng đúng chìa khoá, sẽ giúp bạn lấy được kho báu 1 cách dễ dàng, nhanh chóng. Tất nhiên mỗi chiếc hòm sẽ luôn cần loại chìa khoá khác nhau, giống như một bài toán luôn có những giải thuật xác định. Không có chiếc chìa khoá nào mở được tất cả các hòm, cũng như không có giải thuật nào giải được toàn bộ các bài toán.

## Tại sao cần dùng thuật toán?

Lập trình chính là yêu cầu, chỉ thị máy thực hiện, giải quyết 1 công việc, bài toán cụ thể nào đó của cuộc sống. Mỗi bài toán thực tế sẽ có cách giải quyết khác nhau. Am hiểu và sử dụng đúng thuật toán, sẽ giúp bạn giải quyết một cách dễ dàng, cùng với độ chính xác cao trong thời gian ngắn nhất. 

Mình xin được lấy một ví dụ về thuật toán tìm đường đi ngắn nhất. Đại khái là nếu mình đưa cho bạn một danh sách các đường đi giữa các địa điểm, thì bạn phải tìm đường đi ngắn nhất (về khoảng cách) hoặc chi phí tối thiểu khi đi từ điểm X đến điểm Y.

![](https://images.viblo.asia/0c0a4aed-90df-4440-9ea8-9a08daf79621.png)

Bạn biết thuật toán này dùng ở đâu rồi chứ? Hiện tại, bạn có thể sẽ biết nó xuất hiện trong các phần mềm chỉ đường và ứng dụng liên quan tới ngành giao thông vận tải (ví dụ google map, grab, uber, giao hàng nhanh, ….), nhưng bạn có biết nó còn dùng ở đâu nữa không? Xin nói với các bạn rằng, trong các hệ thống mạng, viễn thông người ta cũng dùng thuật toán này để định hướng đường truyền và tín hiệu. Cuộc điện thoại từ 1 người ở thành phố Hà Nội gọi cho 1 người ở thành phố Hồ Chí Minh đi qua các cột thu phát sóng, dữ liệu internet từ máy tính của bạn đi tới máy chủ của nhà cung cấp mạng cũng phải sử dụng thuật toán này để đạt được tốc độ tối đa.

Tiếp theo, một thuật toán khá nổi tiếng khác là thuật toán tìm kiếm. Bạn có thể nhìn thấy nó ở khá nhiều sản phẩm phần mềm hiện tại, điển hình như Google. Bạn có thể nghĩ rằng, tìm kiếm thì có gì mà khó! Nhưng khoan đã, hãy đặt bạn vào một tính huống như thế này: bạn có hàng tỷ tỷ món đồ dùng được vứt lộn xộn trong 1 căn nhà, bạn sẽ mất bao nhiêu lâu để tìm được món đồ mà bạn mong muốn. Bạn cần phải nhớ rằng, việc Google trả ra được kết quả mà bạn yêu cầu tìm kiếm trong vòng 1 vài giây! **(Thật không thể tin được :grinning:)**. Điều ấy, yêu cầu 1 thuật toán cực mạnh, và vẫn liên tục cần cải tiến cho đến ngày hôm nay.

## Thuật toán có quan trọng không?
Câu trả là của mình là **CÓ HAY KHÔNG TÙY THUỘC VÀO MỤC ĐÍCH CỦA BẠN.** 

![](https://images.viblo.asia/f9059b6e-53aa-4fe0-b4ee-644502570e46.jpeg)


Bạn không cần học thuật toán vẫn làm có thể phát triển tốt phần mềm (Nếu các bạn không làm những bài toán có độ phức tạp cao, có dữ liệu người dùng lớn, cần phải ra đáp án nhanh với độ chính xác cao). 

Ví dụ nếu bạn làm 1 website chủ yếu là nội dung, nếu bạn làm 1 ứng dụng điện thoại chỉ xử lí các logic thông thường, thuật toán không giúp ích nhiều cho bạn trong trường hợp ấy. Kể cả khi bạn làm những sản phẩm rất lớn, sử dụng những công nghệ rất mới và hot như AI, BigData hay Blockchain, dù không thành thạo thuật toán nào cả, bạn vẫn xây dựng được hệ thống. Trong trường hợp này, bạn chỉ cần hiểu rõ cách sử dụng và ứng dụng của công nghệ, chứ không cần nằm hay hiểu rõ thuật toán bên trong công nghệ ấy. (*Trường hợp bạn không theo hướng research nhé!* :grinning:)

Nhưng hãy thử tưởng tượng, khi hệ thống có hàng nghìn hàng vạn người cùng truy cập và bạn phải trả về kết quả là cực kì nhanh, bạn sẽ làm như thế nào để đảm bảo điều đó? Thực tế đã trả lời rằng: Bạn cần phải chọn và chọn một giải thuật tối ưu và hợp lí để tốc độ xử lí có thể tăng lên từ hàng chục tới hàng trăm lần,

Có 1 sự thật rằng, đa phần các sản phẩm phần mềm ngày nay thành công mà không cần hay sử dụng rất ít thuật toán bên trong nó. Tuy nhiên những sản phẩm có hàm lượng thuật toán cao, trí tuệ lớn, thật sự tạo ra sự khác biệt và thành công lớn hơn những sản phẩm bình thường. 

**Tóm lại**

Google thành công vì có thuật toán tìm kiếm mạnh mẽ bậc nhất thế giới. Sản phẩm như Facebook hay Youtube cũng phải sử dụng nhiều thuật toán như tìm kiếm, gợi ý người dùng, gợi ý nội dung, … Nhưng thuật toán lại không phải yếu tố cốt lõi quyết định thành công của sản phẩm này. Do đó, việc học thuật toán, sự quan trọng của thuật toán phụ thuộc vào sản phẩm, ứng dụng mà bạn làm. Dù có giỏi hay không giỏi thuật toán, bạn vẫn có thể thành công nếu vận dụng đúng kỹ năng, hiểu biết của mình vào lĩnh vực mà bạn làm. 

## Các bước giải một bài toán
1. Bước đầu tiên và là bước quan trọng nhất là hiểu rõ nội dung bài toán. Đây là yêu cầu quen thuộc đối với những người làm toán. Để hiểu bài toán theo
cách tiếp cận của tin học ta phải gắng xây dựng một số thí dụ phản ánh đúng các
yêu cầu đề ra của đầu bài rồi thử giải các thí dụ đó để hình thành dần những hướng
đi của thuật toán.
2. Bước thứ hai là dùng một ngôn ngữ quen thuộc, tốt nhất là ngôn ngữ toán học đặc
tả các đối tượng cần xử lí ở mức độ trừu tượng, lập các tương quan, xây dựng các
hệ thức thể hiện các quan hệ giữa các đại lượng cần xử lí.
3. Bước thứ ba là xác định cấu trúc dữ liệu để biểu diễn các đối tượng cần xử lí cho
phù hợp với các thao tác của thuật toán.
Trong những bước tiếp theo ta tiếp tục làm mịn dần các đặc tả theo trình tự từ trên
xuống, từ trừu tượng đến cụ thể, từ đại thể đến chi tiết.
4. Bước cuối cùng là sử dụng ngôn ngữ lập trình đã chọn để viết chương trình hoàn
chỉnh. Ở bước này ta tiến hành theo kĩ thuật đi từ dưới lên, từ những thao tác nhỏ
đến các thao tác tổ hợp.
Sau khi nhận được chương trình ta cho chương trình chạy thử với các dữ liệu lấy từ
các thí dụ đã xây dựng ở bước đầu tiên.

Trên đây là 4 bước giải một bài toán-tin. Lý thuyết là vậy thôi, có thể bạn chưa hình dung ra nhưng đừng lo. Trong những bài tiếp tới, khi đi chi tiết vào các ví dụ mình sẽ phân tích kĩ hơn.

## Bonus
* Đừng quá thần thánh hóa một thuật toán nào !
* Đừng chỉ học lý thuyết, xem video mà không áp dụng. Mình đã viết về vấn đề này [tại đây](https://viblo.asia/p/code-theo-video-co-mang-lai-loi-ich-cho-lap-trinh-vien-Az45bzzO5xY)
* Hãy rèn luyện thuật toán thường xuyên. Vì bạn rất ít khi cần nhưng một khi cần mà không biết thì lại mất khá khá thời gian tìm hiểu. Điều này có thể ảnh hướng đến tiến độ công việc của bạn.
* Cá nhân mình luôn khuyên và nhắn nhủ các bạn lập trình viên hãy luôn học và rèn luyện thuật toán. Thuật toán giúp bạn rèn luyện tư duy giải quyết vấn đề, cùng với suy nghĩ về việc luôn tối ưu và làm sản phẩm một cách tối ưu và tổng quát.

Hẹn gặp lại các bạn ở kì tiếp theo ! :+1:
# Tổng quan
Trong quá trình làm việc cũng như tham gia giảng dạy các khóa học, mình thưỡng xuyên nhận được những câu hỏi của các bạn như: Làm sao bắt đầu học bảo mật vậy anh? Hay làm hacker thì cần bắt học cái gì vậy anh? Làm bảo mật là làm công việc gì vậy anh? Làm bảo mật có khó không vậy?.. Rất nhiều câu hỏi được đặt ra và trong thời gian ngắn thì mình cũng chỉ có thể đưa ra những câu trả lời đại khái theo kiểu định hướng và chung chung chứ khó có thể mô tả chi tiết được. Vì đơn giản để làm được một công việc nào đó không hề dễ, và để làm việc đó giỏi, trở thành chuyên gia trong lĩnh vực đó lại càng khó. Mỗi chúng ta cần có quá trình học hỏi, rèn luyện và kiên trì để có thể đạt được thành quả. Vì vậy, mình mong muốn các bạn đọc bài viết này có được cái nhìn tổng quan cũng như hiểu rõ hơn về công việc của một hacker mũ trắng (pentester) là gì và làm sao để có thể trở thành một pentester trong tương lai.

Bài viết này hướng tới đối tượng là những bạn mới vào nghề hoặc những bạn có định hướng vào nghề. Những bạn đã trong nghề lâu năm hay những "chiên gia đầu ngành" mình mong muốn có những góp ý hay đóng góp để bài viết hoàn thiện hơn. Bài viết hoàn toàn trên những chia sẻ cá nhân nên có thể có những kinh nghiệm hay định hướng chưa thực sự phù hợp với tất cả. Bài vết của mình chỉ với mong muốn giúp các bạn có định hướng vào nghề có thêm thông tin và vững bước hơn. Giờ thì chúng ta vào việc thôi!

# Làm pentester là làm gì?
Điều đầu tiên chúng ta cần quan tâm là nếu làm nghề này thì chúng ta sẽ làm gì? Pentest là thuật ngữ chuyên môn dùng để miêu ta hành động kiểm thử xâm nhập (giả lập các cuộc tấn công như một kẻ tấn công thực sự) vào phần mềm (web, ứng dụng mobile, thiết bị phần cứng, server, network... để tìm ra những lỗ hổng bảo mật của đối tượng. Từ những cuộc tấn công giả lập, nhà phát triển có thể đánh giá được phần mềm của mình có đang an toàn và từ đó đưa ra giải pháp phù hợp để giúp hệ thống trở nên an toàn hơn trước những kẻ tấn công. Vì đó pentester có thể coi như là hacker mũ trắng giúp bảo vệ phần mềm, ngược lại là hacker mũ đen là những kẻ tấn công phá hoại hay thực hiện các hành vi xấu tổn hại tới hệ thống. Mình đã có một bài viết làm rõ hơn về khái niệm penetration test tại [Hiểu hơn về penetration test](https://viblo.asia/p/hieu-hon-ve-penetration-test-LzD5dgP0ljY) các bạn có thể đọc để hiểu hơn về công việc này.

# Các pentester sẽ làm việc ở đâu?
Chúng ta có thể làm việc tại các công ty cung cấp dịch vụ kiểm thử bảo mật (Ví dụ ở Việt Nam: Viettel, CMC, FPT..), những công ty chuyên về CNTT hay phần mềm, những tổ chức tài chính - ngân hàng (Ví dụ: Vietcombank, Techcombank..), những công ty viễn thông (Viettel, VNPT..), các ban ngành thuộc nhà nước (Ban cơ yếu chính phủ, Trung tâm Giám sát an toàn không gian mạng quốc gia).v.v. Nói chung là rất nhiều các công ty có các lĩnh vực có liên quan đến CNTT.

Một hướng khác mà các bạn có thể giành thời gian làm part-time hay full-time là làm những bug bounty hunter (Tìm kiếm lỗ hổng bảo mật có trả tiền trên các nền tảng bugbounty). Các bạn có thể lên các nền tảng chuyên về bug bounty để kiếm thêm thu nhập (hackerone, bugcrowd, safevuln, whitehub..). Đây là công việc đòi hỏi các bạn có kỹ năng khá và giành thời gian kha khác để có thể đạt được kết quả. Có khi là 1 tháng, 3 tháng thậm chí là 1 năm. Mình cũng khá vất vả để có thể đạt được quả ngọt đầu tiên. Nên những bạn có hướng theo cái này phải xác định rõ từ đầu và thật kiên trì.

Ngoài hai hướng chính trên chúng ta có thể đi theo hướng khác như: Tham gia tư vấn về an toàn thông tin, tham gia đào tạo giảng dạy về an toàn thông tin nếu các bạn có kiến thức đủ tốt.

# Chúng ta cần bắt đầu như thế nào?
Tiếp theo, chúng ta cần quan tâm tới việc chúng ta cần học những gì, làm những gì để có thể làm tốt công việc trên.

## Học tập tại các trường đào tạo về An toàn thông tin:
Đây là một trong những bước đầu tiên giúp chúng ta có hành trang tốt cho con đường sau này. Những trường này thường có các chuyên nghành về An toàn thông tin để đào tạo chuyên sâu, trang bị cho sinh viên những kiến thức căn bản để có thể bước đầu bước chân vào nghề này. Ở Việt Nam có thể kể đến một số trường như: Học viện Kỹ thuật Mật mã, Đại học bách khoa Hà Nội, Học viện Công nghệ Bưu chính Viễn thông,... Vậy nếu chúng ta không học ở những trường có chuyên nghành vê An toàn thông tin thì sao? Đương nhiên là các bạn vẫn hoàn toàn có thể chọn con đường này để đi tiếp. Các bạn theo học một trường về công nghệ thông tin thì các bạn cũng sẽ được trang bị những kiến thức căn bản giúp ích cho các bạn có thể tiến xa hơn trong lĩnh vực này. Lời khuyên của mình là các bạn có thể theo học một trường không phải chuyên về an toàn thông tin và tranh thủ tìm hiểu thêm kiến thức trong thời gian là sinh viên, việc đó sẽ giúp các bạn đỡ bỡ ngỡ hơn trong con đường dài sau này.
## Lập trình:
Lập trình là một kiến thức quan trọng mà các pentester cần có. Chúng ta cần hiểu cơ bản về logic hoạt động của chương trình, những mô hình thiết kế cơ bản, cách hoạt động và giao tiếp của các ứng dụng để từ đó có thể thực hiện kiểm tra nó một cách dễ dàng. Chắc hẳn việc học trong các trường đại học - cao đẳng thì các bạn đã được trang bị căn bản về kiến thức lập trình nên việc phát triển thêm nó là hoàn toàn có thể. Các bạn có thể chọn cho mình một ngôn ngữ lập trình và học nó (Python, php, java...) là những ngôn ngữ mà các bạn có thể chọn. Đương nhiên các bạn có thể học những ngôn ngữ khác. Nhưng theo mình hiểu căn bản về web, ứng dụng mobile và network là cần thiết để có thể đi sâu trong lĩnh vự này
## Học và thực hành khai thác lỗ hổng bảo mật:
Học đi đôi với hành, muốn kiến thức nhớ được lâu và áp dụng được vào thực tế chúng ta cần thực hành thường xuyên. Học 4 phần thì thực hành phải chiếm 6 phần để có thể vào việc một cách nhanh nhất. Thực hành lập trình những chương trình, tool đơn giản để luyện tập kiến thức lập trình. Mình sẽ giới thiệu một số trang thực hành online kiến thức bảo mật giúp ích cho các bạn vừa học vừa thực hành khi mới bắt đầu"
 
 **OWASP:** https://owasp.org/: Đây là một Project giúp các bạn tìm hiểu các kiến thức căn bản về lỗ hổng bảo mật web, mobile..
 
 **PortSwigger Web Security Academy:** https://portswigger.net/: Một website vừa học kiến thức mới kết hợp thực hành các bài lab về lỗ hổng bảo mật hay thích hợp cho các bạn bắt đầu
 
 **Root-me:** https://www.root-me.org/ Học kiến thức về bảo mật: Web, reverse, exploit server..
 
 **Try hack me:**  https://tryhackme.com/: Trang đào tạo về khai thác lỗ hổng bảo mật..
## Tham gia các khóa học về bảo mật:
Tham gia các khóa học offline hoặc online về bảo mật để giúp quá trình học của chúng ta được như và căn bản hơn. Một số trang cung cấp khóa học online mà các bạn có thể tham khảo:

**Udemy:** https://www.udemy.com/

**Coursera:** https://www.coursera.org/

## Học kiến thức căn bản về network, hệ thống:
Các bạn cần tìm hiểu kiến thức cơ bản về network, ứng dụng, hệ thống: Mô hình OSI, network, TCP. Việc hiểu các mô hình mạng, cách hoạt động giao thức giúp chúng ta có thể dễ dàng hiểu về cách thức trao đổi thông tin giữa các thành phần trong hệ thống từ đó có thể tìm ra các lỗ hổng bảo mật
## Liên tục học và cập nhật kiến thức mới
Đọc bào, bài viết, báo cáo về lỗ hổng bảo mật hoặc những nghiên cứu về kiến thức bảo mật: Đây là cách giúp chứng ta có thể học thêm được nhiều kiến thức mới từ những người đi trước cũng như giúp chứng ta tự bổ sung kiến thức cho mình. Đọc các bài báo, báo cáo lỗ hổng giúp chúng ta hiểu và biết cách khai thác các lỗ hổng, giúp ích cho công việc của chúng ta. Thường xuyên follow những hacker, chuyên gia bảo mật để có thêm những cập nhật mới nhất về lỗ hổng hay tin tức bảo mật. Chúng ta cần xác định phải luôn tự học và cập nhật kiến thức mới để không bị bỏ lại.
## Thi chứng chỉ về bảo mật: 
Sau khi có những kiến thức cũng như kinh nghiệm trong lĩnh vực này, việc thi một chứng chỉ bảo mật là nên vì nó giúp các bạn có cơ hội thăng tiến trong công việc cũng như sự nghiệp. Chúng ta có thể bắt đầu với các chứng chỉ của EC-Council (CEH, ECSA), chứng chỉ của Offensive (OSCP, OSWE..) hay cao cấp hơn là chứng chỉ CISSP của ISC2, hoặc các chứng chỉ của GIAC Certifications..
## Chia sẻ kiến thức: 
Sau khi có được những kiến thức, việc chia sẻ kiến thức đó cho người khác giúp mình một lần nữa củng cố kiến thức và nhớ lâu. Bên cạnh đó còn giúp chúng ta nhận về được nhiều những kiến thức thiếu sót qua việc đóng góp hay góp ý của người khác. Giúp chúng ta có tiếng nói hơn trong cộng đồng.

# Lời kết
Những chia sẻ trên của mình có thể còn chưa đầy đủ và hay nhưng mình mong các bạn trẻ khi có đam mê và yêu thích lĩnh vực an toàn thông tin có thể chọn cho mình con đường đi đúng đắn và ngày càng tiến xa trong sự nghiệp của mình. Chúc các bạn thành công
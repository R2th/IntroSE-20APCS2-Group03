# Question 1: Cải thiện việc code gọn và sạch
> Làm thế nào để cải thiện việc code gọn và sạch? Cách tối ưu mã nguồn? Tham khảo ở đâu?
Answer: Có vài cách để cải thiện việc code:

* Tham khảo coding standard (Framgia cũng đang áp dụng những chuẩn của riêng mình dựa trên PSR2). Chuẩn này có thể giúp việc code trở nên gọn gàng, sạch sẽ. Tuy nhiên, chuẩn coding có thể thay đổi theo thời gian nên việc bám sát tiêu chuẩn nào thì cũng chỉ nên ở mức độ nhất định.
* Trong quá trình code, các developer nên nghĩ đến requirement từ khách hàng và function của dự án một cách đơn giản để thực hiện task hiệu quả nhất có thể.   
* Nên lắng nghe lời khuyên, góp ý từ Team leader và teammate để cải thiện những lỗi code cơ bản đồng thời áp dụng nguyên tắc DRY (không lặp lại lỗi mình từng mắc phải).
* Đọc code của người khác: mỗi người có cách code khác nhau và có quan điểm khác nhau trong việc đánh giá code của người khác. Nhiều người được coi là giỏi chưa chắc code đã gọn nhưng có thể chỉ những bạn Fresher cũng sở hữu những dòng code tỉ mỉ và đẹp. Vì vậy, nếu bạn tự đánh giá code của ai đó dễ hiểu, dễ đọc, “thuận mắt” thì nên tham khảo.

-----
# Question 2: Một số người nhận xét PHP là ngôn ngữ khá dễ học, dễ làm và cấu trúc không được chặt chẽ như các ngôn ngữ khác. Các Professor X nghĩ sao về nhận xét này?
Answer: PHP mang tiếng “cùi” nhưng thật sự không phải vậy. Lý do là bởi:

* “Học PHP dễ” là đúng: việc học ngôn ngữ một cách cơ bản thì không khó nhưng áp dụng vào bài toán thực tế thì không phải là dễ. Trên thực tế, học PHP cơ bản không quá khó khăn nhưng muốn học sâu và rộng về nó thì luôn là thử thách lớn cho bất kỳ lập trình viên nào.
* Có thể coi “PHP không chặt chẽ” nhưng cũng nên coi đây là ưu điểm của ngôn ngữ này vì nó linh hoạt, có thể hỗ trợ lập trình hướng đối tượng giúp ích cho lập trình viên trong quá trình làm việc…Quan trọng hơn vẫn là cách các dev ứng dụng để phát huy điểm mạnh của ngôn ngữ PHP.

-----
# Question 3: So sánh Dev out-source và Dev product
>  Một số công ty làm product yêu cầu kỹ sư tối ưu performance, tối ưu query, thiết kế database sao cho chịu tải được lượng user rất lớn. Công ty mình chuyên làm outsource, phần lớn chỉ là CRUD chứ rất ít dự án phải thiết kế cho nhiều user nên các anh X nghĩ sao về điều này? Phải chăng Dev outsource sẽ kém hơn product?
>  
Answer: Trước hết bạn không nên so sánh việc làm outsource hay product trong công ty vì mục tiêu cuối cùng của mọi dự án đều là đưa sản phẩm tới tay người dùng. Bởi vậy, dù bạn có làm outsource thì sản phẩm của bạn làm ra cũng chính là product của khách hàng và sau đó sẽ đến tay người dùng cuối.

CRUD là thuật ngữ không hề xa lạ với mọi người nhưng cũng không nên coi thường task này. Nó sẽ là đơn giản nếu bạn code cho xong, còn phức tạp nếu bạn làm tỉ mỉ và có thể có yêu cầu cao hơn từ phía khách hàng. Ví dụ: 1 website đấu giá thì thao tác bid giá chỉ đơn giản là create hoặc update nhưng bạn nghĩ nó có đơn giản không? Câu lệnh create liên quan tới nhiều table thì cũng sẽ phải tối ưu query/index.

Về việc thiết kế sao cho hệ thống chịu tải lớn thì không chỉ dừng lại ở phạm vi coding mà còn liên quan tới infra. Bạn có thể tham khảo về “devOps”: đây là văn hóa làm việc đề cao sự hợp tác, kéo hai giai đoạn phát triển (development) và vận hành (operations) xích lại gần nhau hơn.

Tốc độ phát triển của công nghệ như vũ bão, chỉ 1 ngày không học hỏi là đã bị tụt về phía sau rồi, bởi vậy việc giỏi hay kém phụ thuộc vào sự cố gắng của mỗi cá nhân chứ không quan trọng là bạn làm ở công ty outsource hay product.!

![](https://images.viblo.asia/1a22a6b6-fa99-451e-943e-24c218e2b7dd.jpg)
-----
# Question 4: Có nên tiếp tục theo đuổi PHP...
> Có nên tiếp tục theo đuổi PHP khi những ngôn ngữ như Ruby, Python, Nodejs… đang phát triển mạnh mẽ và được sử dụng trong nhiều mảng công nghệ mới.?
> 
Answer: Việc học ngôn ngữ nào là phụ thuộc định hướng phát triển nghề nghiệp từng cá nhân. Ngôn ngữ về cơ bản chỉ là công cụ làm việc và mỗi công cụ lại có thế mạnh riêng cho những bài toán đặc thù. Về ứng dụng web nói chung, điều quan trọng nhất vẫn là kiến thức nền tảng như Web-based (HTTP, Session, Cookie, …), OOP, Design Pattern,….chứ ngôn ngữ cũng chỉ là cung cấp các SYNTAX để dựng lên ứng dụng web. Tuy nhiên, việc học nhiều ngôn ngữ cũng đem đến những trải nghiệm thú vị giúp cho các dev có thể so sánh, phân tích sự giống và khác nhau giữa các ngôn ngữ, từ đó sẽ hiểu sâu hơn về lập trình.

-----
# Question 5: Theo anh, những người hiểu sâu hay hiểu rộng sẽ dễ dàng hơn trong công việc khi là một developer?
Answer: Câu hỏi này khiến các Professor X chia làm 2 phe:

* Phe ủng hộ việc “biết rộng hơn biết sâu” (anh Vượng, anh Tùng A) cho rằng điều này sẽ giúp ích các dev nhanh chóng tiếp cận và thích nghi với bất kỳ dự án nào. Tại Framgia, việc đổi sang các dự án khác nhau là khá liên tục. Vì vậy, nếu có kiến thức đủ rộng thì các dev sẽ dễ dàng hiểu dự án (về framework, cấu trúc…) để có thể “quẩy” tung các task của mình. Hơn nữa, việc đào sâu công nghệ mất khá nhiều thời gian trong khi công nghệ lại thay đổi từng ngày nên gây khó khăn cho dev.
* Trong khi đó, phe đối lập (anh Tùng D) lại ủng hộ “biết sâu hơn biết rộng” bởi lẽ: Trong 3 năm đầu học và làm PHP, anh muốn biết rộng nhưng đã gặp khó khăn trong việc chuyển sang việc học mới 1 framework nào đó vì đã quá quen với những cái cũ.  Tuy nhiên, sau khoảng thời gian trải nghiệm đủ framework và biết đủ rộng với bản thân thì anh dừng lại để nghiên cứu sâu hơn bằng việc so sánh các framework với nhau, đồng thời nghiên cứu thêm PHP thuần. Lúc đó, anh nhận ra rằng việc hiểu sâu là cần thiết và giúp ích nhiều cho công việc.
Tuy mỗi phe 1 ý kiến nhưng cả 2 phe đều cho rằng, việc dev muốn hiểu sâu hay biết rộng là tùy vào tính chất công việc và định hướng của từng người.
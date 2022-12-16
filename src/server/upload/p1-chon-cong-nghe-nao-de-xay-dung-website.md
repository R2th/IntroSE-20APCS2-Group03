Hiện nay nhu cầu phát triển website, app tăng rất cao do xu hướng "số hóa 4.0" trong và ngoài nước. Và rõ ràng là website đang chiếm ưu thế so với mobile app do thời gian phát triển nhanh và tương thích với rất nhiều nền tảng, phù hợp với đại đa số những nhu cầu mới có trong chuyển đổi số. Chỉ cần có một trình duyệt web bạn có thể khám phá cả thế giới.

Cùng với xu hướng đó là rất nhiều công cụ, nền tảng website đang và sẽ phát triển mạnh hơn nữa. Việc chọn công nghệ để xây dụng website phải đáp ứng rất nhiều tiêu chí. Đã từng làm qua nhiều dự án website lớn có nhỏ có tí tẹo cũng có, mình sẽ chia sẻ với các bạn cách mà mình đã lựa chọn công nghệ cho dự án website.

### Điều kiện, hoàn cảnh

Chắc chắn rồi, điều kiện đầu tiên là phải có cơ hội được chọn công nghệ chứ :D. Nếu là lý do hay yêu cầu của khách hàng bắt buộc phải sử dụng cố định một công nghệ thì khá khó chịu. Tuy nhiên đó không phải là kết thúc sự sáng tạo, hãy nghĩ theo cách tích cực hơn và cố gắng phát huy kỹ năng bản thân, tối ưu, sử dụng các convention nghiêm túc. Như vậy sẽ tạo ra một sự tin tưởng nhất định sau đó những cơ hội khác bạn có thể là người sẽ được lựa chọn sử dụng công nghệ. 

Về hoàn cảnh, đây là yếu tố tiên quyết đến thành công của dự án nên đừng vì bất kì lý do nào khác mà bỏ qua. Hoàn cảnh cơ bản bao gồm: Vision, Time, Effort. Sau khi hiểu được những phần trên thì mới đến bước xét duyệt các tính chất của công nghệ để phù hợp. Suy cho cùng thì nếu dự án không có User, không có Data, không thể runable được thì cho dù bạn chọn công nghệ đỉnh như Big Company hay dễ như Student thì giá trị công nghệ bằng không rồi.

### Why not PHP?
Nhắc đến website thì không thể thiếu PHP được. Theo [w3techs](https://w3techs.com/technologies/details/pl-php) 

> PHP is used by 79.0% of all the websites whose server-side programming language we know.

có đến 79% website đang sử dụng PHP. Các công cụ thống kê thường quét `X-Powered-By`, vì lý do bảo mật nên một số nhà cung cấp hosting xóa header này nên trên thực tế mình nghĩ tỉ lệ này cao hơn. Một điểm nữa dẫn đến sự áp đảo này đó là các mã nguồn mở như Wordpress, Drupal, Joomla rất phổ biến đều sử dụng PHP. Với sự xuất hiện của nhiều ngôn ngữ mới, tỉ lệ này có giảm một chút (80,1% năm 2016) tuy nhiên vẫn còn rất cao, chứng minh rằng những website PHP cũ cũng không hề chuyển đổi sang công nghệ khác. Vì sao vậy?

PHP rất dễ để người mới học hỏi, điều này khỏi dẫn chứng vì nó luôn là top đầu những khóa học online :D. Nhiều bạn bè mình nói rằng PHP chậm phát triển, thực ra đó là góc nhìn từ Việt Nam đó. Trên thế giới, cộng đồng hỗ trợ và phát triển PHP vẫn đang rất đều tay cập nhật những phiên bản rất giá trị và tốt lên rất nhiều. Tìm kiếm việc làm hay nhân sự mới cho PHP cũng rất dễ dàng vì nhiều website thế mà :D.

Framework mình làm việc nhiều nhất với PHP đó là Laravel. Cái tên vô cùng quen thuộc. Xét về tổng thể, Framework này cân bằng các yếu tố hoàn cảnh phát triển của dự án tốt. Thời gian xây dựng nhanh, tốc độ đáp ứng vừa phải, có thể tối ưu hóa để mở rộng dự án, tích hợp được với nhiều công nghệ khác. Ngoài Laravel các bạn có thể lựa chọn thêm nhiều Framework khác như Code Igniter, Phalcon, Yii...
![](https://images.viblo.asia/b88044ed-ff29-4f52-808a-13ddded3161d.png)

Khen vậy đủ rồi, hãy xem xét về mặt hạn chế của PHP. Đây là một ngôn ngữ Script, vì vậy việc bạn không tuân theo syntax hay convention rất khó để phát hiện. Nếu như dự án lớn dần mà phần base không được tốt thì sẽ rất phức tạp khi maintain. Cần áp dụng thêm một số công cụ hỗ trợ như phpcs để đảm bảo Clean Code cho dự án. Đơn luồng, đây cũng là hạn chế dẫn đến tốc độ xử lý của website. Tuy nhiên nếu website của bạn đạt tới giới hạn chậm trể của PHP thì trước hết phải ăn mừng cái đã =)) Sau đó có thêm vị trí mới lo hạ tầng cho website bằng Docker hoặc K8S thì đơn luồng không phải là vấn đề nữa. Tiếp đến là phần Front-end UI/UX thì PHP đang kém miếng phần này khi chỉ hỗ trợ những tác vụ đơn giản tác động đến cấu trúc HTML như binding, input, reload... Còn lại phải phụ thuộc CSS và 
JavaScript


### Is Java & C# dead?
Chẳng hiểu từ đâu ra mà mấy lớp đại học năm nay mình khảo sát đều đánh giá rất thấp và thường không lựa chọn Java và C# để làm website. "Vì nó cồng kềnh" đây hầu hết là ý tưởng chung khi nhận xét về 2 ngôn ngữ này. Rất may mắn mình đã có cơ hội trải nghiệm làm website với cả 2 ngôn ngữ này, trong đó C# nhiều hơn.
Nó cồng kềnh là có lý do của nó. Những thư viện đính kèm đều có chất lượng rất tốt, bảo mật tốt, ít lỗi, và được maintain bởi những kỹ sư rất lâu năm của các công ty siêu to như Microsoft, Oracle, IBM, Netflix... Và nếu bạn muốn có cơ hội làm việc ở nước ngoài hay những công ty trên, 2 ngôn ngữ này là vũ khí có thể cân mọi cuộc interview.

Hãy nói về hiệu suất, những ngôn ngữ này thường được sử dụng trong những Serverless Framework. Đó cũng là lý do khiến những người mới nghĩ rằng nó không phù hợp trên website, nhưng hãy cân nhắc rằng vì nó Serverless nên nó làm rất tốt việc của một Back-end thực thụ. Giao tiếp, xử lý dữ liệu Database siêu nhanh, đa luồng, kiểm soát tài nguyên hoàn toàn. Vậy là đã đảm bảo được hơn 40% khối lượng công việc dựng website rồi, phần còn lại hãy kết hợp thêm những công nghệ "chuyên môn hóa" cho giao diện UI/UX.
![](https://images.viblo.asia/c338a3b5-8604-4adc-8bf1-e6a14afec5ec.png)

Thời gian cũng là hạn chế với ngôn ngữ "Professional" này. Syntax, convention cực kỳ chặt chẽ và ít khi lách được kẽ hở Clean Code, kéo theo đó là thời gian phát triển lâu hơn những ngôn ngữ khác. Đổi lại sau này maintain hay thậm chí thay đổi cả chức năng cũ cũng rất dễ dàng mà ít lo lắng ảnh hưởng đến chức năng cũ. Cũng giống như PHP, cần thêm ngôn ngữ khác bổ trợ cho phần Front-end.

### Super JavaScript
Người anh em gần tên khác họ của Java. Nó không hề giống Java chút nào và nó lại còn là ngôn ngữ Script. JavaScript có tốt không? Có, hiện tại nó đang rất tốt vì tốc độ phát triển cộng đồng là cấp số cộng, cực nhiều chức năng mạnh mẽ được tích hợp cho JavaScript, từ back-end đến front-end.

Không thể không nhắc tới Node.js runtime environment, công nghệ đã đột biến JavaScript thành thần thánh với một số ý kiến. Trước đó JavaScript chỉ có thể hoạt động tốt trong trình duyệt website và như một bổ trợ có hoặc không cũng được. Nhưng với Node.js và hàng triệu thư viện được các developer trên khắp thế giới phát triển, chắp thêm ba đầu sáu tay làm cho JavaScript có thể làm được mọi việc. Về giới hạn tính năng hay hiệu suất bạn có thể tham khảo thêm nhiều thư viện, chắc chắn là sẽ đáp ứng đủ bất kì thứ gì bạn kì vọng.

Thời gian học hỏi và phát triển dự án cũng rất nhanh, thậm chí còn nhanh hơn PHP do chỉ cần sử dụng JavaScript cho toàn bộ kể cả Animation khó trên website. Framework thì không hề thiếu và hoàn toàn open-source miễn phí.

Vậy hãy nói đến việc băn khoăn khi sử dụng JavaScript. Dự án mình hiện tại đang làm cũng sử dụng JavaScript, điều mình nhận ra là cộng đồng còn khá "trẻ". Nên những thư viện đính kèm, Framework còn nhiều lỗi vặt, các phiên bản cập nhật bị thay đổi nhiều. Nếu không chú ý rất có thể gặp incident không thể sửa mà buộc phải quay về phiên bản cũ ổn định hơn. Với những kỹ thuật ứng dụng vào JavaScript cần phải có hiểu biết về nó từ lõi nếu không sẽ phản tác dụng đó là thời gian fix bug rất rất lâu. Phía giao tiếp với Database cũng đủ dùng nhưng còn chưa đủ linh hoạt khi query phức tạp, điều mà PHP, Java, C# đang làm tốt hơn. Mình đang dùng Squelize, TypeORM cho dự án và sẽ sớm có review nếu các bạn đang băn khoăn lựa chọn.

### Tổng kết
Nói túm lại dựa trên những tiêu chí của dự án, bạn có thể lựa chọn:
- PHP để cân bằng giữa các yêu cầu nếu không có yêu cầu nào có độ ưu tiên cao hơn.
- (Java or C#) and JavaScript nếu tiêu chí hàng đầu là chất lượng phần mềm và chất lượng nhân sự.
- Only JavaScript nếu yêu cầu ra sản phẩm cực nhanh, có chi phí để maintain sau này, nhân sự mới có khả năng học hỏi nhanh.

Ở bài viết sau mình sẽ review kĩ hơn những Case study Framework đã sử dụng của mỗi ngôn ngữ. Hãy comment ý kiến của bạn để mình cùng học hỏi nhé :D

### Tham khảo
https://kinsta.com/blog/is-php-dead/
![](https://images.viblo.asia/3e71ba16-b7e6-4f5f-816e-6cc00ae3dc0a.jpg)

Hệ điều hành Unix đã tồn tại trong nhiều thập kỷ và nó cũng như các hệ điều hành Linux là một phần quan trọng của thế giới máy tính. Hệ điều hành Unix được viết vào năm 1970 và là một trong những hệ điều hành đầu tiên viết bằng ngôn ngữ C. Hệ điều hành MacOS của Apple, Solaris, BSD dựa trên nhân Unix để phát triển. Ngay cả khi bạn chưa bao giờ trực tiếp sử dụng một trong các hệ điều hành này, ít nhất hai phần ba tổng số tất cả trang web trên internet được phục vụ bởi hệ điều hành Unix hoặc hệ điều hành Unix-like [1]. Và, nếu bạn đã từng chọn một chiếc điện thoại thông minh, rất có thể nó đang chạy một biến thể Unix, hoặc Android chạy trên nền tảng Linux hay iOS của Apple được phát triển từ BSD Unix từ dự án Darwin. 

Hệ điều hành UNIX là một trường hợp của điều: **"Những cái tốt nhất thường đều miễn phí"**.

Lý do cốt lõi khiến Unix trở nên phổ biến không phải là khả năng truy cập, chi phí hoặc thiết kế giao diện người dùng của nó, mặc dù những điều này rất hữu ích. Nguyên nhân gốc rễ của sự phổ quát của Unix là ở triết lý thiết kế của Unix.

![](https://images.viblo.asia/b4b8391c-fce3-47b1-8f86-8973304b38ab.jpg)

# 1. Phương pháp thiết kế của hệ điều hành Unix
Thiết kế tốt là yếu tố quan trọng để thành công của UNIX. Cho dù đó là thiết kế tốt của một phần mềm, cơ sở hạ tầng như đường sắt, mạng lưới điện hay thậm chí là thứ gì đó tương đối đơn giản như một lá cờ, nếu không có thiết kế tốt thì dự án của bạn về cơ bản sẽ bị thất bại. 

Đối với Unix, những người tạo ra nó đã thiết lập một triết lý thiết kế dựa trên sự đơn giản ngay từ đầu. Phần mềm được xây dựng dựa trên một số nguyên tắc hướng dẫn dễ hiểu và dễ thực hiện. 

Đầu tiên, các phần mềm cụ thể nên được xây dựng để làm một việc và làm tốt một việc đó. 

Thứ hai, các chương trình phải có thể làm việc cùng nhau một cách dễ dàng, có nghĩa là đầu vào và đầu ra thường là văn bản. 

Với hai ý tưởng đơn giản trên, máy tính trở nên ít phức tạp hơn và dễ tiếp cận hơn, dẫn đến sự bùng nổ của khoa học máy tính và máy tính đa năng trong những năm 1970 và 80.

Những nguyên tắc cốt lõi trên đã khiến Unix có ảnh hưởng lớn đến lĩnh vực máy tính trong những ngày đầu được thiết kế. 

Unix đã phổ biến ý tưởng về phần mềm như các công cụ phần mềm và ý tưởng cho rằng có nhiều công cụ để xây dựng phần mềm dễ dàng và trực quan hơn nhiều so với việc viết các chương trình độc lập khổng lồ lại từ đầu nhằm phát minh lại bánh xe trên mọi quá trình triển khai. Thật vậy, vào thời điểm Unix xuất hiện, rất nhiều nhà nghiên cứu máy tính đang xây dựng các  khối phần mềm  cho một mục đích duy nhất cho các máy tính cụ thể. Code trong phần mềm không tái sử dụng trên những nền tảng khác. Khi Unix lần đầu tiên được triển khai, nó đã thổi bay mô hình này.

![](https://images.viblo.asia/36640dd5-527e-4287-b377-4b891088f42e.jpg) 

_Tôi Không có ý không tôn trọng máy tính IBM 360; tôi chỉ cần một bức ảnh tuyệt vời về một chiếc máy tính cũ_

Do thiết kế của nó, Unix có thể chạy dễ dàng trên nhiều máy tính khác nhau và bản thân những máy tính đó có thể ít tốn kém hơn và ít tốn tài nguyên hơn. Nó được thể hiện bởi tính tương tác vì bản chất của các chương trình là tương đối nhỏ và dễ sử dụng. Vì tất cả các thiết kế của Unix khiến Unix trở nên trực quan hơn, nó đã được áp dụng rộng rãi trong thế giới máy tính. Giờ đây, mô hình này không phải không có nhược điểm của nó, cụ thể là hiệu quả trong một số trường hợp, nhưng ý tưởng cốt lõi là tốt và hoạt động hiệu quả cho thời đại.

Tất cả những nguyên lý thiết kế của hệ điều hành UNIX có thể gói gọn trong nguyên lý: **Keep it Simple, Stupid (KISS)**
# 2. Worse is better
Tôi không biết dịch từ worse là tệ hơn hay là đơn giản hơn để phù hợp nên xin phép để nguyên văn của thuật ngữ là "Worse is better" của Richard P. Gabriel.

Năm 1991, Richard Gabriel đã xuất bản một bài báo có ảnh hưởng  "[The Rise of Worse is Better](http://www.dreamsongs.com/RiseOfWorseIsBetter.html)" Bài báo này lập luận cho một triết lý thiết kế mà ông gọi là Worse is better, trong đó sự đơn giản về triển khai có khả năng ảnh hưởng nhiều hơn sự đơn giản về giao diện. Bài báo của Gabriel đã được đọc rộng rãi trong cộng đồng kỹ sư phần mềm và từ đó đã ảnh hưởng đến một thế hệ lập trình viên.

Bài báo gốc tập trung vào sự thành công của Unix và ngôn ngữ lập trình C, mà Gabriel mô tả trong câu trích dẫn có lẽ là nổi tiếng nhất từ bài báo:

_Triết lý "worse is better"có nghĩa là sự đơn giản thực hiện có mức ưu tiên cao nhất, có nghĩa là Unix và C dễ dàng chuyển giao trên các máy. Do đó, người ta kỳ vọng rằng nếu hỗ trợ 50% chức năng của Unix và C là thỏa đáng, chúng sẽ bắt đầu xuất hiện ở khắp mọi nơi. Và họ làm được, phải không? Unix và C là những virus máy tính cuối cùng._

Nguyên tắc có 4 đặc trưng:
* Tính đơn giản: Đề cập đến sự dễ thực hiện và quan trọng hơn là một giao diện đơn giản.
* Tính đúng đắn: Đề cập đến sự cần thiết của thiết kế là phải chính xác một cách rõ ràng và không có bất kỳ sai sót nào.
* Tính nhất quán: Đề cập đến tính đồng nhất tổng thể của thiết kế, điều quan trọng hơn là tính đơn giản, hoàn thiện và quan trọng không kém là tính đúng đắn.
* Tính hoàn chỉnh: Đề cập đến ý tưởng rằng một thiết kế phải cung cấp toàn bộ trải nghiệm, với tất cả các biến số dự kiến được đề cập. Tuy nhiên, không nên giảm bớt tính đầy đủ để tăng tính đơn giản.

Một ý tưởng thú vị đã xuất hiện trong thế giới máy tính vào khoảng thập niên những năm 90 đó là thuật ngữ "Worse is better". Mặc dù ý tưởng này không phải là họ hàng trực tiếp của triết lý Unix, nhưng nó chắc chắn tương tự với họ. Ý tưởng đề cập đến thực tế là các tính năng bổ sung hoặc tính năng phức tạp không nhất thiết làm cho mọi thứ tốt hơn và một dự án “dở hơn”, là một dự án có ít tính năng hơn và ít phức tạp hơn có thể thực sự tốt hơn vì nó sẽ có xu hướng đáng tin cậy hơn và có thể sử dụng được. Nhấn mạnh vào sự đơn giản và khả năng tương tác giúp chống lại sự leo thang của tính năng.

Có rất nhiều ví dụ mà việc không tuân theo một triết lý thiết kế đơn giản đã dẫn đến thất bại. Cơ sở hạ tầng lớn có thể đặc biệt dễ bị hỏng do sự phức tạp, vì các hệ thống cũ thường bị bỏ quên khi các phần mới được bổ sung khi dân số tăng lên. Mặc dù những hỏng hóc như khủng hoảng nước không phải do sự phức tạp trực tiếp gây ra, nhưng bất cứ khi nào hư hỏng xảy ra đối với các hệ thống này, chúng có thể cực kỳ khó sửa chữa vì sự phức tạp đó. Rất khó để xây dựng phần lớn các cơ sở hạ tầng mà không có mức độ phức tạp nhất định, nhưng sự đơn giản, dễ bảo trì và sử dụng các nguyên tắc thiết kế tốt có thể giúp tiết kiệm rất nhiều rắc rối trong quá trình thực hiện.

Mặc dù Unix hiện đại và đặc biệt là Linux kernel hiện nay vô cùng phức tạp, nhưng chúng vẫn giữ được rất nhiều triết lý thiết kế ban đầu mà chúng có trong những ngày đầu. Ý tưởng về sự đơn giản và làm tốt một công việc vẫn còn ăn sâu vào triết lý này, mặc dù bạn chắc chắn có thể tìm thấy các ví dụ về phần mềm không tuân theo tất cả những ý tưởng này nữa. Bất kể tình trạng hiện tại của phần mềm hiện đại như thế nào, các bài học kinh nghiệm từ triết lý thiết kế ban đầu của Unix đều mang tính phổ biến và có thể giúp ích rất nhiều cho dù bạn đang làm việc trên phần mềm, ô tô, cơ sở hạ tầng hay chỉ đơn giản là tưới cây.
# 2. Tài liệu tham khảo
[1] Usage statistics of operating systems for websites, https://w3techs.com/technologies/overview/operating_system

[2] Worse is better, https://en.wikipedia.org/wiki/Worse_is_better

[3] The UNIX KISS: A Case Study, https://arxiv.org/vc/cs/papers/0701/0701021v1.pdf
![](https://images.viblo.asia/85d1b923-f06f-443f-ae47-f6b9cd63c68e.jpeg)

Là một mobile developer, bạn muốn phát triển một ứng dụng với rất nhiều các tính năng. Tuy nhiên,với một chiếc điện thoại nhỏ xinh, để có thể bố trí và thể hiện đầy đủ các tính năng mà không gây khó chịu đối với người sử dụng thì chúng ta cần phải chú ý đến một số nguyên tắc xây dựng ứng dụng để đem lại trải nghiệm tốt nhất có thể. 

Rất nhiều trong chúng ta đã ngầm định hiểu và áp dụng những nguyên tắc đó, và cũng nhiều người trong chúng ta đã vô tình quên mất nó. Trong bài viết này mình sẽ liệt kê lại một số nguyên tắc mà mình tổng hợp được để giúp ứng dụng của bạn có được sự hài lòng nhất về UI, UX.

Những nguyên tắc này có thể áp dụng cho cả web và native app. Mình mong rằng sau bài viết này các bạn có thể áp dụng các nguyên tắc này vào thực tế.

### Nguyên tắc 1: Chủ nghĩa tối giản
Việc đặt tất cả các UI element cần thiết vào màn hình smartphone mà không làm lộn xộn giao diện và ức chế người dùng có thể rất khó.

Chúng ta cần phải sắp xếp các UI elements dựa vào độ ưu tiên trên mỗi màn hình, cái gì lược bỏ được thì lược bỏ.
Có 2 câu trích dẫn như sau:

> "Perfection is achieved not when there is nothing
more to add, but when there is nothing left to take
away."
— Antoine de Saint-Exupéry


-> Tạm hiểu là: Sự hoàn hảo đạt được không phải khi không còn gì để thêm mà là khi không còn gì để bỏ đi.

>"One of the basic rules of good UX is to reduce the effort users have to put in to get what the want." – Nick Babich.
>
-> Tạm hiểu là: Nguyên tắc cơ bản là giảm thểu nỗ lực của người dùng để đạt được mục đích.

Phân bổ sự chú ý của người dùng phù hợp với nhu cầu của bạn hoặc người dùng. Quá nhiều thông tin có thể khiến người dùng sợ hãi và gây nhầm lẫn.

Để tiến đến chủ nghĩa tối giản bạn cần tăng white space, các element đơn giản, font thanh lịch, ... Việc đơn giản hóa UI cũng giúp cải thiện đáng kể tốc độ và performance của website và app. Điều này cũng ảnh hưởng đáng kể đến trải nhiệm của người dùng. Dữ liệu load càng lâu, hiển thị càng chậm, trải nghiệm người dùng càng tệ

![](https://images.viblo.asia/e4bc2b49-f033-4afc-a6b6-bf82f712c798.png)

Ví dụ như Uber. Uber biết rằng mục đích của người dùng sử dụng ứng dụng là đi taxi. Ứng dụng không làm người dùng choáng ngợp với các thông tin khác: nó tự động phát hiện vị trí của người dùng dựa trên dữ liệu GEO và việc duy nhất người dùng phải làm là chọn vị trí đón.

### Nguyên tắc 2: Đặt các elements quan trọng nhất gần bottom hoặc center

Steven Hoober đã thử nghiệm rất nhiều các nghiên cứu thú vị về các topics liên quan đến hành vi của người sử dụng smartphone. Kết quả của các nghiên cứu chỉ ra rằng tầm quan trọng của việc đặt các thao tác điểu khiển trong tầm với của ngón tay cái khi sử dụng điện thoại bằng một tay, mặc dù Steven Hoober cũng đã chứng minh rằng người dùng cầm điện thoại của họ theo nhiều cách khác nhau. [Chi tiết hơn thì các bạn có thể xem tại đây.](https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php)

![](https://images.viblo.asia/74d03ab5-c5cf-4c9f-90b6-3cb8888126f2.png)

Ngoài ra, Steven Hoober cho thấy rằng người sử dụng smartphone khi phải lựa chọn điều gì đó, họ thích nội dung được hiển thị theo chiều dọc và ở trung tâm của màn hình, áp dụng cho cả khi đọc nội dung và tương tác với màn hình.

>“I set up a study that let users move the content to the position on the screen where they naturally wanted it to be. Once they had moved  he content to the center of the screen, they would tap to select it.” — Steven Hoober

![](https://images.viblo.asia/54f10e54-18b8-4749-8970-15b1ecc9579b.png)

Dân dev nhìn phát biết luôn những đốm đỏ là khu vực tương tác chính của người dùng  :iphone:

### Nguyên tắc 3: Giảm thiểu yêu cầu nhập
Người sử dụng smartphone thường có ít thời gian hơn để tương tác với UI khi sử dụng laptop hoặc desktop. Họ có thể đang di chuyển hoặc đang tranh thủ tìm kiếm thông tin trong một vài phút. Vì vậy, để mang lại lợi ích khi sử dụng laptop và desktop đặt lên chiếc smartphone thì bản cần phả giữ cho biểu mẫu càng ngắn gọn và đơn giản càng tốt bằng cách xóa mọi trường không cần thiết. Sử dụng dữ liệu tự động hoàn thành và được cá nhân hóa nếu thích hợp để người dùng chỉ phải nhập thông tin tối thiểu. Ví dụ: 
- Auto-fill bất kì trường yêu cầu nhập nào nếu có thể auto-filled.
- Smart suggest khi người dùng thực hiện nhập hoặc tìm kiếm
- Filter để giảm lọc bớt các thông tin không liên quan
- Sự dụng date pickers thay vì yêu cầu nhập date bằng cơm :D 

Đó chỉ là một số ví dụ phổ biến và trực quan nhất. Và dĩ nhiên, bạn sẽ có thể khám phá ra nhiều hơn nữa bằng cách hình thành thói quen tự đặt câu hỏi cho bản thân. Chẳng hạn, Task này có thể bỏ bớt cái gì hay làm cách nào khác không nếu mình muốn thao tác ít hơn? Nhập bằng cơm ít hơn? Có thay thế được cái này không nhỉ?

![](https://images.viblo.asia/32181bb8-fad0-4f1a-8acb-b07b938c8965.png)

![](https://images.viblo.asia/a14b25b7-e8df-4086-ab21-0540e9be6c8c.png)

### Nguyên tắc 4: Mở rộng phạm vi của action tap

Con trỏ trên desktop hoặc laptop cho phép người dùng click đúng mục tiêu dù là nhỏ nhất trên màn hình. Tuy nhiên trên màn hình cảm ứng việc đó khó hơn rất nhiều.

Đầu ngón tay của bạn không chỉ lớn hơn và kém chính xác hơn nhiều so với con trỏ chuột, mà còn bao phủ mục tiêu của bạn khi bạn cố gắng chạm vào nó.

![](https://images.viblo.asia/ee0debe1-45ad-413c-babb-ecf7af6ad419.png)

Có 1 điều mình thường gặp ở các bạn mới là các bạn ý thường xuyên bỏ qua nguyên tắc số 3 này. Các bạn design đối tượng rất chuẩn bản mẫu, tuy nhiên phạm vi tap vào đối tượng đó thì rất khó để nhận action tap. Bạn sẽ không bao giờ sai khi thiết kế mục tiêu tap lớn nhất có thể. 

Thực hiện theo các nguyên tắc do [Apple](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/adaptivity-and-layout/) và  [Android](https://material.io/components/buttons) cung cấp, đề xuất các đối tượng chạm lần lượt là ít nhất 44 x 44 points và 48 x 48 dp (pixel độc lập với thiết bị)

Cách phổ biến nhất để mở rộng phạm vi tap là tăng khoảng trắng xung quanh đối tượng thay vì tăng kích cỡ của đối tượng, việc tăng kích cỡ của đối tượng có thể khiến UI trông sẽ không được đẹp mắt, thậm chí là UI xen kẽ, đè vào nhau.

![](https://images.viblo.asia/b7be0e38-7e2a-45de-86a2-fbfaaf6d454d.png)

### Nguyên tắc 5: Ưu tiên tính dễ đọc
Tính dễ đọc là một trong những điều rõ ràng quan trọng bất kể nền tảng nào mà bạn thiết kế. Bạn phải luôn tuân theo các nguyên tắc chung về định cỡ phông chữ, chiều cao dòng, lựa chọn phông chữ cho văn bản dạng dài hơn, v.v.

[Recommend kích thước phông chữ là 16pt](https://www.smashingmagazine.com/2018/06/reference-guide-typography-mobile-web-design/). Sử dụng bất kỳ kích thước nào nhỏ hơn mức đó và bạn sẽ ảnh hưởng đến tính dễ đọc cho ít nhất một số người dùng của mình.

![](https://images.viblo.asia/9e60b7c8-284e-4462-904a-a0db524eaff3.png)

Ngoài ra, 1 yếu tố cũng rất quan trọng ảnh hưởng đến tính dễ đọc đó là màu chữ và background. Cái này thì tùy vào nghiệp vụ mà chúng ta sẽ design sao cho phù hợp. Tuy nhiên chúng ta cũng cần phải lưu ý cả về điều kiện ánh sáng vì người sử dụng thiết bị di động thường sẽ sử dụng ở những nơi có điều kiện ánh sáng khác nhau. Ví dụ về text color thì mình thường sẽ không chọn màu #000000 mà thay vào đó sẽ là 1 màu nhẹ nhàng hơn chút để tránh gây cảm giác tức mắt.

![](https://images.viblo.asia/eecb272a-2c08-4fb4-9544-0a5bceafb5b4.png)


### Nguyên tắc 6: Đưa ra phản hồi ngay lập tức - và tốt (!) -
Việc thiết kế cho các kết nối internet di động kém có thể sẽ sớm bớt lo lắng hơn nhiều, thậm chí bây giờ cũng vậy do tốc độ internet 4G, 5G đã rất nhanh . Tuy nhiên, đừng mong đợi người dùng di động luôn có kết nối Internet tốc độ cao, ổn định và đừng bỏ qua trạng thái tải loading. Cần phải tối ưu hóa thời gian tải và thể hiện trạng thái tải để người dùng có thể nhận biết.


### Nguyên tắc 7:  Bật khôi phục lỗi dễ dàng
Bất kể bạn tuân thủ các nguyên tắc trên tốt đến đâu, bạn design giỏi đến đâu, lỗi người dùng chắc chắn xảy ra.
>Mis-taps and misunderstandings are your responsibility, but you’ll never be able to eliminate them completely
-> Đại loại nói là bạn sẽ không bao giờ có thể loại bỏ lỗi hoàn toàn. Kiểu như bug là không thể tránh khi lập trình vậy :D

Hơn nữa, luôn có nguy cơ xảy ra lỗi bên ngoài, từ phía người dùng và thiết bị. Một số trong số này - như trang không tải được do kết nối kém - là nhiều khả năng hơn trên thiết bị di động.

Ví dụ như nút undo ở Google sheet, bạn có thể dễ dàng back lại trạng thái trước đó của sheet:
![](https://images.viblo.asia/4468397c-688b-458a-a832-bbb627a19dd0.png)

### Nguyên tắc 8: Tạo điều hướng trực quan
Khá là giống với nguyên tắc 1 và 3, tạo điều hướng 1 cách đơn giản nhất cũng rất quan trọng.
![](https://images.viblo.asia/d4536409-e993-4638-8131-3397de6d713d.png)

>“If the user can’t use it, it doesn’t work.”– Susan Dray

Người dùng thiếu kiên nhẫn để cố gắng làm việc qua các bước phức tạp để đạt được những gì họ muốn. Nếu mất quá nhiều thời gian hoặc nỗ lực để khám phá cách sử dụng app, rất có thể bạn sẽ mất người dùng của mình. Nếu là mình mà gặp cái app phức tạp là mình xóa app vote 1* luôn cho nó mát :D Vì vậy mà bạn cần đơn giản hóa quy trình và có sẵn tất cả thông tin cần thiết.

### Nguyên tắc 9: Kiểm tra lại design
Thông thường, design cho thiết bị di động trông rất tuyệt khi được xem trên màn hình của designer nhưng ngay sau khi bạn bắt đầu xem và tương tác với ứng dụng trên thiết bị di động thực tế, nó trở nên kém hài lòng hơn nhiều. Đó là lý do tại sao việc kiểm tra ứng dụng của bạn với người dùng thực trên nhiều thiết bị di động là rất quan trọng. Bạn nên yêu cầu người dùng thực hoàn thành các tác vụ thường xuyên và chỉ sau đó bạn sẽ thấy thiết kế thực sự hoạt động tốt như thế nào.
![](https://images.viblo.asia/2ab726f0-5eb6-4deb-9a6b-6a61a98275f0.png)


Như vậy, trên đây là một số nguyên tắc mà mình đã tổng hợp từ các nguồn cũng như từ kinh nghiệm bản thân. Mình cảm thấy việc áp dụng các nguyên tắc này rất có ích cho mình trong quá trình phát triển ứng dụng. Mình hi vọng với các bạn cũng vậy. Cảm ơn các bạn đã dành thời gian đọc bài viết này.


Nguồn tham khảo: 
- https://uxplanet.org/mobile-ux-design-key-principles-dee1a632f9e6 
- https://uxdesign.cc/learn-from-the-best-mobile-design-principles-f1bdc46bc016
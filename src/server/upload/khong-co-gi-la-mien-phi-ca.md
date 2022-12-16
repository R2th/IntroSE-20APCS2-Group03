Mình có cái tật rất xấu. Đấy là hay cố gắng tìm hướng giải quyết cho người  khác.

Chuyện là ở công ty hồi đó mọi người đang cố gắng dockerize một monolithic project viết bằng C, được xây dựng cách đây hàng chục năm về trước. Vì chương trình được xây dựng quá lâu, thời đó mọi người chưa có khái niệm đầy đủ giữa state, cache, data, code etc. Việc trong code có chứa data là chuyện rất thường xuyên. Nên dù có biết first rule của containerization là không chứa state data trong container. Thì cũng không thực hiện nổi, vì thực sự quá khó.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/arw6itz583_image.png)

Final image nặng cỡ **~ 10 GB** và có rất nhiều step manual setting vào container.  Hoàn toàn dùng container như một **mini VM**. Đồng nghiệp than với mình. Mình hồi đó vẫn chưa từng gặp bất kì vấn đề nào khó với container, nghĩ cái gì cũng containize được. Đề nghị bạn để đó cho mình. Bạn làm việc khác đi. Bạn sau một hồi suy nghĩ thì đồng ý. Lúc đó mình cần đạt được 2 mục đích: **Shrink image** lại và **setup CI-CD** cho nó.

Việc này tricky ở chỗ software này lại dùng một số thứ của một **license software** khác, và phải active qua một interact shell (Shell cũng rất củ chuối. Interact với cả Ctrl Key etc). Vì để upgrade được license "automatically". Mình dùng **expect** của linux.

(Với bạn nào không biết thì expect là một tool script dành cho *"interactive programs or scripts that require user interaction."* - Tìm hiểu thêm ở [đây](https://likegeeks.com/expect-command/).)

Vật lộn mất một tuần mới shrink lại còn ~ 8GB. Thật sự mình cũng không tìm được cách nào tốt hơn cả. Vì giờ muốn thì cách duy nhất là rewrite lại toàn bộ, break down service và chia images thay vì build một gigantic image. (**Setup between builder - runner docker**).

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/musxvjdnsr_image.png)

Cuối cùng vẫn dùng image đó, thêm được mỗi bước set license. Bạn cũng không nói gì. Nhưng mình biết bạn không vui. Một thời gian sau công ty mẹ provide vẫn phần mềm license đó, nhưng được viết bằng java và seperate package. Mọi chuyện dễ thở hơn. Nhưng có vẻ hình ảnh của mình đã bị ảnh hưởng, bạn cũng không nói gì với mình về project đó nữa.

Mình nghĩ trong cuộc sống, khi ai đó tâm sự với mình, đôi khi chỉ cần có mặt, ngồi xuống và lắng nghe cho tử tế là đủ. Việc cho lời khuyên cần rất nhiều sự tế nhị. Mình không sống hộ cho ai được. Có lẽ nếu mình không xung phong giúp bạn, bạn đã có thời gian suy ngẫm và làm được tốt hơn. Nên đó là lỗi của mình. Mình nghĩ nhiệt tình là tốt, nhưng không đủ, phải biết quý trọng lời nói của bản thân.

Vì không có gì là miễn phí cả.

Somewhere, xx-xx-20xx

Rice
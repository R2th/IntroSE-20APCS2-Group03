Bài gốc: https://thanhle.blog/en/blog/pm-bat-change-hoai-lam-sao-cho-pm-cung

## Tại sao nên đọc bài này?

- Giải tỏa áp lực khi cứ làm xong sếp lại bảo… “Ủa em?” hay “Chỗ này nên đổi thêm một xíu”,…
- Bạn để tâm của mình ở đâu, level của bạn ở đó

## Sao không nói rõ từ đầu?

Có bao giờ những câu nói như này chảy qua dòng suy nghĩ của các bạn chưa?

> Sao chỗ này không nói rõ từ đầu đi? Em làm theo y chang rồi mà giờ bắt em sửa lại
> 

> Ông PM này thiếu uy tín vkl, lúc đầu thì nói làm như này như này, làm xong thì lại bảo làm như kia !??! 🙃
> 

Hồi mới đi làm mình cũng hay có những suy nghĩ như vậy lắm, tốn công, tốn sức, tốn não, đổ mồ hôi, sôi nước mắt mới làm xong task, vậy mà anh lead lại bảo “Em rất tốt nhưng mà anh rất tiếc 🙃”

![image.png](https://images.viblo.asia/a89eaa23-1b37-4f29-979d-8de69c4d46e9.png)

Sau một quãng thời gian, tới khi làm lead, thì mình cũng lại trở thành người phải nói những câu như trên - những câu mà hồi xưa mình đã từng rất ghét. Mình cũng feel được rằng các bạn khi nghe được câu đó của mình thì cũng có hơi… trợn mắt, nhăn mặt, không nói ra thành lời nhưng trong đầu chắc cũng vài ba câu kiểu … “Đan Mạch, ông này làm việc như 💩, éo nói từ đầu mọe đi”

## Soft-ware

Gần đây mình mới nghe được một câu cực kì thấm

> Em sẽ không biết em muốn gì, nhưng em biết được em không muốn gì
> 

Đôi khi đi làm, phải code ra, nhìn thấy thì mới biết được nó không phù hợp còn lúc planning thì ai chả muốn thứ mình làm là thứ phù hợp nhất, phải không nhỉ?

Chính vì lý do như vậy nên chuyện làm xong rồi, cần phải sửa lại với mình bây giờ là chuyện khá là bình thường. Dĩ nhiên cứ làm xong sửa, làm xong sửa nhiều lần như vậy thì rất bad rồi, ý mình nói là phải sửa lại là chuyện bình thường, nhưng mình cũng không khuyến khích sửa lại nhiều đâu nhé, vậy tệ lắm.

![Một hai lần change thôi, đừng change nhiều lần, khổ em](https://images.viblo.asia/a636e540-acfb-497d-ae9a-3334946a3b05.png)
*Một hai lần change thôi, đừng change nhiều lần, khổ em*

Có bao giờ các bạn thắc mắc là sao trong ngành này người ta gọi là “soft-ware”, mà không phải là “hard-ware” hay là “cái gì đó - ware” chưa?

**Soft** vì cái ngành này khá là mềm dẻo, do đó nó sẽ thay đổi liên tục. Bạn code bug? Fix bug. Bạn code không scale? Refactor cho scale hơn. Bạn deploy lỗi? Rollback… Nó là một đặc thù cực kì cực kì thú vị so với các ngành khác. Thử tưởng tượng xem nếu ở ngành khác nha

- Bác sĩ lỡ cho thuốc… bị bug ⇒ Chết người, đi tù
- Cơ khí oto làm ra thiết bị phanh không không hiệu quả ở vận tốc cao ⇒ Cả công ty mất thương hiệu ⇒ Phá sản ⇒ Bạn thất nghiệp
- Bạn đấu sai điện ⇒ À không còn cơ hội để làm lại nữa :) kiếp này coi như bỏ

Thấy hậu quả ác chưa? Ngành phần mềm có một ưu điểm cực kì lớn so với các ngành khác là vòng đời từ: Test → Improve → Test… lặp lại rất nhanh, có thể tính theo giờ, theo ngày, theo tháng,..

Còn các ngành khác thường là rất lâu, và cơ hội để được làm lại cũng không nhiều. Thử hỏi bạn kê thuốc cho người ta mà bị bug thì số lần bạn được làm sai là bao nhiêu lần?

![image.png](https://images.viblo.asia/1483cdd5-941d-4238-9f89-7aef18f90f10.png)

Do bản tính soft của soft-ware nên hầu hết các task bạn đã làm đều là version không hoàn thiện (dĩ nhiên là so với các ngành khác) và vì bản chất hầu hết đều không hoàn thiện, việc phải thay đổi, update, hay đập đi xây lại là điều đương nhiên.

## Vì nó là soft nên nó phải linh hoạt

Như ở trên mình có nói, vì bản chất nó là không hoàn thiện, nên khi làm software bạn phải làm nó một cách linh hoạt. Linh hoạt nghĩa là sao?

- Khi có một thay đổi, bạn nhanh chóng apply cái thay đổi đó vào code
- Khi bạn apply cái thay đổi đó vào code, bạn đảm bảo nó không ảnh hưởng tới các phần khác
- Khi bạn thấy một thành phần không phù hợp, bạn có thể dễ dàng tháo phần đó ra và thay bằng thành phần khác phù hợp hơn.
![](
Do đó về principle của công việc coder thì code bạn viết ra phải đáp ứng các level:

- **Lv1: Readable** - Bạn viết code, bạn đảm bảo là người khác, hay là bạn-của-sau-này biết bạn đang làm gì
- **Lv2: Maintainable** - Bạn viết code, người khác hiểu được và đảm bảo được khi người ta muốn sửa đổi, thì nó phải dễ, và đảm bảo là không ảnh hưởng các phần khác
- **Lv3: Scalable** - Bạn viết code dễ hiểu, dễ maintain rồi thì bây giờ là lúc đảm bảo nó scale được, nghĩa là có thể handle tối đa lượng user truy cập, optimize tối đa thời gian cho user,…

Do đó mới có mấy cái thuật ngữ như như DRY, SOLID,… để đảm bảo các level như trên

Tuy nhiên các bạn khi mới vào nghề đang còn ở **Lv0: Code của bạn chạy đúng requirement**, còn đọc vô thì không ai hiểu, nhưng bạn thì quả quyết “Em thấy nó cực-kì-dễ-hiểu!” hay “Em thấy làm vậy mới đẹp”

![image.png](https://images.viblo.asia/0637b477-d773-466c-9333-dc8e3ba9a965.png)

Mình hay ví cái này giống như tầm nhìn khi làm task vậy?

- Nếu bạn chạy mà cứ nhìn xuống chân thì Ok, bạn vẫn chạy được, nhưng khi nào dẫm 💩 thì không biết.
- Do đã vài lần dẫm 💩 rồi, bạn bắt đầu nhìn ra xa hơn xíu, bắt đầu suy nghĩ là làm sao để chạy không phải dẫm 💩 nữa, chuẩn bị sẵn sàng cho những biến cố ở phía trước.
- Giờ thì bạn đã khá nghiệp dư rồi, chạy không bao giờ dẫm 💩 nữa nhưng mà… lâu lâu chạy sai mọe nó hướng :))) do đó bạn cần phải có cái nhìn xa hơn nữa để tránh tình trạng như vậy.

Đó, hay code ở level mà PM bảo change, thì bạn change trong vòng 30s, chứ đừng có kiểu tốn cả ngày để sửa lại mà vừa change vừa chửi PM gà, trách bản thân bạn quá tệ thôi

## Luôn hướng tới level tiếp theo

Khi bạn đang ở Lv0, hãy hướng tới Lv1, nếu bạn ở Lv2 hãy hướng tới Lv3,…

Thực tế là cần cù không bù bờ ro (pro) được! Nếu bạn cứ bằng lòng level của mình thì thời gian bạn làm nó vẫn sẽ như vậy và giới hạn sức mạnh của bạn sẽ nằm ở thời gian của bạn. Bạn làm 1h được 1 task thì bạn có nhiều giờ hơn thì bạn làm được task nhiều hơn tương đương. Còn nếu bạn nhảy sang được level tiếp theo, nghĩa là bạn đang nâng cao hiệu suất của bản thân, khiến một 1h của bạn giá trị hơn.

> Đừng bao giờ nghĩ mình làm nhiều là đỉnh nhé. Cũng khá đó nhưng hãy hỏi sao làm nhiều mà vẫn bèo?
> 

[Vì sao chăm chỉ làm việc mãi mà bạn vẫn chưa thành công?](https://vietcetera.com/vn/vi-sao-cham-chi-lam-viec-mai-ma-ban-van-chua-thanh-cong)

Bạn để tâm ở đâu thì level của bạn sẽ ở đó

## Lời kết

Thực tế chả ai phải muốn phải làm xong sửa cả, cả bạn, QA, Lead, PM, sếp,… tất cả đều muốn 1 shot-1 kill nhưng cuộc sống thì chả dễ dàng như vậy. Mọi người, tới cuối, thì đều muốn tạo ra thứ có value thôi.

Thứ bạn nghĩ là có value thì chưa chắc nó thật sự có value cho người khác do đó, hay bỏ cái tôi của bản thân đi, hướng tới những thứ có value cho user. Do đó hãy chấp nhận sự thay đổi liên tục trong ngành này nhé.

Đọc thêm về Real-value mà mình viết trước đây:

[Làm việc tạo ra real-value?](https://thanhle.blog/en/blog/lam-viec-tao-ra-value)

Những lần thay đổi củ chuối nhất mà bạn từng gặp là gì? Comment bên dưới để mọi người giải trí nhé
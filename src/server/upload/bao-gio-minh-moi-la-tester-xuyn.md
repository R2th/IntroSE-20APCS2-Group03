Hế lô các bạn, là mình đây 😗

Nay hơi rảnh xíu nên mình ngồi đây kể lể với các bạn đôi ba tình huống “ối dồi ôi” mà mình từng gặp khi làm tester và qua đó mình đã nhận ra rằng: Để trở thành 1 tester “xuỵn”, ngoài những kỹ năng liên quan đến chuyên môn thì bạn bắt buộc phải có 3 kỹ năng này: *Khả năng phân tích và phán đoán, kỹ năng giao tiếp, kỹ năng sắp xếp độ ưu tiên.*

Mình dùng từ bắt buộc vì mình thấy nó thực sự quan trọng ấy các bạn … khum, phải nói là rất quan trọng 😖

À ... note 1 chút: câu chuyện bên dưới như một bài văn kể khổ của mình nên hơi dài dòng á :<. Vậy nên mọi người rảnh thì đọc cho zui nha, cảm thấy dài quá mà ngại đọc thì vẫn cứ đọc nhá >.O ... hay ho nhắm =))

### Nói về việc sắp xếp độ ưu tiên trước nhá :v: 

Mình đã từng gặp tình huống như thế này:

Dự án đã UAT, trong giai đoạn đó thì team sẽ chờ feedback của KH, đồng thời ngồi fix các bug tồn đọng. Lúc đó mình đang ngồi verify bug. Con bug này khá loằng ngoằng vì liên quan đến logic tính toán và nó ảnh hưởng đến nhiều màn hình nên mình phải tập trung, chứ đang test mà ngó nghiêng những việc khác thì lại quên xừ mất. Và bùm ... comtor báo là phía KH feedback rằng API của bên mình cung cấp cho bên họ bị lỗi, họ không call được.

Mình định lặng lẽ ngồi test nốt rồi mới xem, nhưng thấy PM với DEV ngồi điều tra lỗi quá trời nên mình mới quay sang bảo dev: "Anh thử xem body bên họ gửi đã đúng chưa?" Sẽ không có vấn đề gì nếu lúc đó mình cũng đang ngồi check cùng mọi người. Nhưng lúc đó mình không check :v nên vừa nói xong thì anh PM quay sang quạo: "Em cũng check đi, em là tester thì em phải check đầu tiên chứ!" … 
Lúc đấy mình kiểu: 😀🙃🤔😒 

Mình định giải thích nhưng mà thui vì sợ anh mắng lại (anh PM của mình là PML nữa, nên mình cũng hơi rén), với do mình cũng hiền nữa (ngụy biện cho sự cam chịu 😎). Cuối cùng mình đành dừng verify bug lại để check FB 🙂… con bé ngồi check FB trong im lặng, anh PM thấy thế nên ra ngó: “Anh nói không đúng hay sao mà không nói gì, dỗi à?” 
Lúc đấy cảm thấy tự nhiên bị quạo nên cũng hơi pực đấy :), mà xong anh PM bảo: “Sau gặp những tình huống như này thì em cứ ưu tiên check trước giúp anh, bug để test sau cũng được”. Nghe xong thì mình cũng phải ngồi nghĩ lại đó..

Theo các bạn trong tình huống này thì mình nên làm gì trước?

Sau khi nghĩ lại thì thấy mình cũng hồ đồ thật. Đúng ra mình nên dừng việc test lại để check FB trước ấy. Do tính chất dự án là outsource, UAT rồi mà còn bị lỗi API là hỏng rồi, việc API lỗi nghiêm trọng hơn là verify bug đó :v. Ấy thế mà mình đã không nghĩ thế làm PM phải nhắc nhở 🤕. Tester như thế là bị đánh giá không biết cách sắp xếp độ ưu tiên rồi đó.

### Còn về khả năng phán đoán khi retest bug thì ...

Khi có một bug phát sinh và dev đã fix xong. Khi đó quan trọng nhất lúc tester retest bug là dự đoán được rằng: bug đó sửa xong thì có thể sẽ ảnh hưởng đến những chức năng nào? 

Nhiều khi dự án gấp mà phải test nhiều cái, lúc đó không có thời gian để check lại test case khi retest bug đâu. Sẽ có những chức năng mà mình test xong rồi, mãi sau lại có bug của phần khác và khi dev fix thì dễ có khả năng ảnh hưởng đến những chức năng khác lắm.

Mình từng gặp trường hợp vậy rồi =)). Kiểu thời gian thì gấp, chức năng chưa test còn nhiều, dev thì cứ quay sang hỏi spec (cái này tuỳ dự án, nhưng con dự án của mình bị vậy). 
Vậy nên mình hay chỉ retest bug đó mà không để ý đến những phần khác, đó là lý do mình cực dễ để lọt bug :<. Xong đến lúc UAT rồi còn bị KH báo bug trong khi test case của mình thì pass hết rồi … lúc đó muốn khóc vãi lúa :))

Mọi người sẽ không quan tâm lý do là gì. Mọi người chỉ quan tâm là tester không cẩn thận và bị lọt bug thôi.

Thật ra nếu đúng thì trong quy trình log bug và khi dev resolved thì dev sẽ phải note giúp mình những phần có thể bị ảnh hưởng trong ticket bug đó. Nhưng thường dev cũng ko để ý đâu. Vậy nên buộc mình phải cẩn thận thôi, và nó cũng phụ thuộc vào kinh nghiệm test của mình nữa. Những người có kinh nghiệm thì sẽ dễ xác định hơn.

Túm lại là … trường hợp này cũng tính là làm lọt bug và lại bị đánh giá thui 😞

Híc … mỗi lần làm gì sai trái xong bị đánh giá là mình cảm giác buổi review lương tiếp theo sẽ khum yên ổn =))

### Với giao tiếp thì sao nhỷ :>

Ở chức vụ hay lĩnh vực nào thì cũng rất cần cái này. Mà nhất là tester thì càng cần ạ. 

Phải có kỹ năng để còn nhờ dev fix bug chứ :)). Dev nào mà gặp quả tester ngang với cứng đầu, thấy bug là cáu gắt rồi lèm bèm nhiều, xong lại hay giục nữa thì đúng là … :> Dev mà cáu là thui không fix bug cho đâu 😀. Nói vậy chứ có bug thì vẫn phải fix, nhưng nếu biết cách giao tiếp thì việc giải thích hoặc nhờ vả dev sẽ dễ dàng hơn, mà đôi bên lại cùng zui zẻ ^_^

Hoặc trong 1 số trường hợp muốn đề xuất với cấp trên thì cũng cần có kỹ năng nói để nhận được sự  đồng ý chứ :v . 

Mình nói với mọi người như vậy, nhưng thực tế thì mình thường xuyên bị đồng nghiệp bảo là: “Mày nói anh nghe chẳng hiểu gì cả!!!” … một chút nhói trong tymmm :3

Vậy nên khi chúng ta có kỹ năng giao tiếp tốt thì mọi thứ đều dễ trao đổi hơn và bản thân mình cũng được mọi người đánh giá cao hơn.


-----



Nhìn chung, với cá nhân mình thì cả 3 kỹ năng trên mình đều chưa tốt và cần cải thiện rất nhiều. Vậy nên để mà trả lời câu hỏi ở tiêu đề thì ... mình cũng khum biết bao giờ mình mới trở thành tester "xuỵn" nữa =)).
Còn với các bạn, hy vọng qua những tình huống “ố zề” của mình và những chia sẻ từ đáy lòng trong bài viết này sẽ giúp mọi người  phần nào đó nhaaa >.O

Còn bạn nào muốn đọc thêm về những kỹ năng khác thì có thể đọc ở post này nha, mình thấy liệt kê khá đủ các kỹ năng mà chúng ta đều cần đó: https://viblo.asia/p/mot-so-ky-nang-ma-tester-nen-co-Az45bNBz5xY

Trên đây là quan điểm cá nhân của mình. Ngoài ra nếu có rì muốn góp ý, hay các bạn cũng từng gặp những tình huống như vậy hoặc “ngáo” hơn nữa thì nhớ kể mình nghe với nhéee =))


Bái baiii!!!

Mình sẽ quay lại trong bài viết tiếp theooo …
# Lời giới thiệu
Chắc hẳn trong chúng ta khi lập trình ứng dụng android, sau khi đã tìm hiểu hết toàn bộ component và cách sử dụng chúng các kiểu con đà điểu (từ những ví dụ demo cho tới những dự án thật có độ lớn vài chục ngàn dòng) thì sẽ đào sâu hơn vào phần cốt lõi của android. Một trong những cái mà mình thấy khá là khó nuốt, đồng thời cũng rất khó control dc đó chính là LauchMode và cả Flag intent nữa. Qua bài viết này, chúng ta sẽ có cái nhìn tổng quát hơn về Lauchmode, đồng thời biết áp dụng kiểu nào trong từng trường hợp chạy Activity cho phù hợp!

![?? :D ??](https://images.viblo.asia/a0453e8c-dd2e-405c-9a82-0d1b0797dbee.JPG)

> *Tí ảnh vui cho không khí nó relax nào*
# launchMode=”singleTop”
Hãy tưởng tượng như này, 5 Activity A, B, C, D, E đang ở trong stack, hoặc muốn dễ hiểu hơn thì cũng giống như 5 thanh niên cao to đen không hôi đang xếp hàng mua KFC vậy :smirk: à mà thằng A đang ở đầu nhé!

OK, bắt đầu nào, lần này lấy 4 thằng đầu là A B C D thôi vì không cần nhiều :D 
> Ví dụ 1 

Thằng A đang ở top, bổng nhiêu từ hư không, somebody triệu hồi thằng A , vậy thì chuyện giề sẽ xảy ra ???

Kết quả là thằng A vẫn dc giữ instance cũ, ví trí cũ (trên top của stack) và đồng thời sẽ gọi method onNewIntent(Intent intent) và get data qua intent mới. Vậy thôi , qua ví dụ tiếp theo nào!!
> Ví dụ 2 

Lần này lấy B C D thôi , thằng A ko có ở trong stack. Rồi A dc triệu hồi by somebody. A sẽ được khởi tạo và đồng thời đẩy lên top, chạy như một activity start intent bình thường ấy. Dễ phải không nào :open_mouth: 
>Ví dụ 3 
>
A B C D vẫn ở trong stack ( nói cái này nhiều gõ mỏi vl :D)
Thằng A triệu hồi thằng B thì sao. B dc khởi tạo mới, ko phải là instance cũ trong stack đâu nghen, đồng thời đẩy lên top nhé. Thứ tự stack như thế này để cho các bạn dễ hình dung : B(new) A B(old) C D 
# launchMode=”singleTask”
Lần này chúng ta sẽ qua 2 ví dụ thôi, vì mode này khá là dễ :v 
>Ví dụ 1
>
Vẫn là A B C D trong stack. 
Chạy B from nowhere. Vì launchmod ở đây là singleTask nên nó sẽ đẩy old instance B ở trong stack lên top và đồng thời get data thông qua onNewIntent. Và một điều nữa, A sẽ bị destroy(Thằng ở top hiện tại). Thứ tự của chúng ta sẽ là B C D. Rất thú vị phải ko nào :v: 
>Ví dụ 2
>
Lần này chỉ có B C. Start A from n o w h e r e. A vẫn sẽ khởi tạo và đẩy lên top như activity bình thường. Câu hỏi đặt ra ở đây là B có bị destroy ko ? 

No noooo. Ví dụ này khác ví dụ trên ở chỗ là activity dính singleTask có ở trong stack hay ko. Nếu có sẳn trong stack rồi thì quay lại vd 1, còn vd 2 là trường hợp hoàn toàn khác. Stack hiện tại để các bạn hình dung : A B C.
# launchMode=”singleInstance”
Cái chế độ này mới mệt nè -_-

Vẫn là 4 thanh niên xếp hàng để chờ mua KFC, theo thứ tự lần lượt là A B C D.
>Ví dụ 1
>
Start thằng E from nowhere. Điều gì xảy ra tiếp nữa?? Thằng E sẽ tạo nguyên 1 cái stack của nó, tách biệt với 4 thằng kia luôn, và đồng thời đẩy cả cái stack này lên đầu. Như này nè :

E | A B C D (Để ý là E ở đầu nhé, xuất hiện ngay ở màng hình luôn đó)

Rồi vậy thì sẽ có trường hợp tiếp theo xảy ra. Đó là từ E , start 1 Activity nữa. Cứ gọi là mr F đi. F sẽ quay qua hàng bên kia, tức là hàng A B C gì gì đó, và đồng thời đẩy stack hiện tại là stack cũ.
Cụ thể cho các bạn dễ hình dung : 

F A B C D | E

>Ví dụ 2
>
Đã có 2 Stack hiện tại như sau : A B | E

Nếu như từ A ta start E thì hệ thống sẽ đẩy cả stack chứa E lên đầu, đồng thời không tạo instance mới đâu mà lấy instance cũ của E rồi get data qua method onNewIntent. Cụ thể như sau

E(old) | A B

Cũng khá là dễ hiểu phải ko nào :V![Ngủ thấy mẹ](https://images.viblo.asia/481c4271-dbcb-4236-9fa2-5cd1ff95ca8d.jpg)
>Đọc dài buồn ngủ ghê luôn ý .__. 
# launchMode=”standard”
Và chế độ cuối cùng đây rồi.  
Vẫn là cái hàng cũ A B C D (Xếp hàng hoài ko mỏi hả tụi mầy .__.)

Ví dụ thứ n : Start B từ bất kì ở chỗ nào thì cũng tạo instance mới cả, nhanh gọn nhẹ. 
### FINISHHHHHHH!
No no, còn phần Flag nữa ...

Hên là phần này cũng sẽ nhanh thôi :D
# FLAG_NEW_TASK
> Y chang SingleInstance phía trên, khỏe re, kéo lên đọc nhé 
> 
# FLAG_CLEAR_TASK
>Khi start một Act với flag này thì cho dù điều kiện nào, hệ thống cũng sẽ tạo Instance mới và đồng thời destroy hết toàn bộ Activity có trong stack. Khá là hữu ích trong một số trường hợp đấy chứ!
>
# FLAG_SINGLE_TOP
>Y chang singleTop phía trên, khỏe part 2 nhé , kaka.
>
# FLAG_CLEAR_TOP
>Nếu Activity đã có thể hiện trong stack, thì khi sờ tạc với flag này, hệ thống sẽ đẩy old instance lên và ghét data thông qua onNewIntent. Destroy toàn bộ Activity, trừ cái cuối. Mình nhắc lại, trừ cái cuối stack nhé :v:

# Cuối cùng cũng xong
Qua bài viết này, hi vọng bạn đọc cũng có cái nhìn rõ hơn về lau chờ mốt. Một trong những kiến thức khá là khó nhai của Android qua các ví dụ mà mình minh họa ở phía trên. 

Nếu cảm thấy hữu ích, hãy để lại 1 like, 1 share và follow mình để cho mình động lực ra những bài viết tiếp theo nhé. 
>Xin cảm ơn các bạn!
>

[Link FB chủ thớt chưa có gấu](https://www.facebook.com/levan.minh.509)
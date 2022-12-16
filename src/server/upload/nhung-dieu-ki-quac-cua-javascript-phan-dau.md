Chào các bạn, lâu nay chúng ta đã làm việc với Javascript để tạo nên những ứng dụng, website tuyệt vời. Vậy các bạn đã bao giờ gặp những điều kỳ quặc sau đây khi code bằng JS chưa?

Hãy cùng mình tìm hiểu về nó bằng những câu hỏi sau nhé 

**PHẦN 1: CÂU HỎI**

**1) true + false ?**

Bạn có biết kết quả của phép tính này không? hãy thử suy nghĩ trước khi code thử nó vào console nhé!

**2) [,,,].length ?**

Bạn đã gặp trường hợp này bao giờ chưa?

**3) [1, 2, 3] + [4, 5, 6] ?**

Theo mình nghĩ nó sẽ ra [1, 2, 3, 4, 5, 6], còn bạn thì thế nào?

**4) 0.2 + 0.1 === 0.3 ?**

Đáp án chắc chắn là true rồi, sai thế éo nào được!

**5) 10,2 ?**

Chắc nó sẽ ra là 10 nhỉ? Mình cảm thấy ngu dần đều khi phải trả lời những câu này rồi.

**6) !!"" ?**

Cái này ..., chắc chắn là false!!!

**7) +!![] ?**

Hừm,... chúng ta vừa trả lời đúng 1 câu rồi, câu này mình nghỉ tí được không?

**8) !!!true ?**

!true là false, vậy đáp án chắc là false nhỉ?

**9) true == "true" ?**

Mình nghĩ là false, các bạn thì sao?

**10) 010 - 03 ?**

7, sure kèo là 7, trật thế nào được nữa!!!

**11) "" - - "" ?**

... Não ơi, hoạt động đi nào

**12) null + 0 ?**

không có gì + 0, vậy kết quả chỉ có thể là 0 thôi

**13) 0/0 ?**

...............

**PHẦN 2: ĐÁP ÁN**

Ở 1 số đáp án, mình sẽ đưa lời giải thích theo ý kiến cá nhân của mình, nếu bạn thấy đúng, hãy cho mình 1 like nhé, còn nếu sai, hãy comment và góp ý ở dưới

**Câu 1: true + false => 1**  có đúng với suy nghĩ của bạn không?

Có lẽ JS đã "ép kiểu" lại cho true và false để phù hợp với toán tử, true => 1 và false => 0

**Câu 2: [,,,].length => 3** các bạn có nghĩ như vậy không?

JS đã xem từng phần tử trong đó là undefined, vậy chúng ta có thể hiểu array trên là [undefined,undefined,undefined]

**Câu 3: [1, 2, 3] + [4, 5, 6] => "1,2,34,5,6"**  nước đi này tại hạ không lường được!!! 

Có lẽ JS đã lại "ép kiểu" array cho phù hợp với phép tính, nên nó mới ra được cái đáp án khó đỡ kia

**Câu 4: 0.2 + 0.1 === 0.3 => false**  what the he**? cái quái gì vậy?

Có lẽ bạn đã hoặc chưa biết **0.1 + 0.2 => 0.30000000000000004** Suprise!!!!!!!!!!! :|

**Câu 5: 10,2 => 2**  sao nó ra 2 được nhỉ? Chuyện gì đang xảy ra vậy???

có vẻ như số trước dấu phẩy được xem như không hợp lệ nên bị bỏ qua và chỉ giữ lấy số dấu phẩy. Tuy nhiên, nếu bạn viết thêm **a =** đằng trước, nó sẽ trở thành phép gán, và lúc này **a = 10**, số 2 bị bỏ qua.

**Câu 6: !!"" => false** úi dời ơi, game là dễ các bạn ạ.

**""** được xem như 1 biến string rỗng, khi ta thêm ! vào trước, nó sẽ đảo ngược giá trị của "", vì rỗng nên nó hiểu đó là false, !"" thì true nên đáp án đúng cho !!"" là false, !dễ phải ko nào? !(^-^)

**Câu 7: +!![] => 1** đúng là không ngoài dự đoán của mình, câu này... mình trả lời sai.

lại 1 pha đùa giỡn với não bộ của chúng ta đến từ vị trí của JS, [] là 1 array rỗng, đúng hem??? Đúng, sai thể nào được, nhưng... nếu bạn nghĩ [] sẽ giống với "" trên kia thì bạn đã bị JS lừa rồi, ![] nó ra false các bạn ạ :|, và !![] nó lại về true. Và các bạn biết không? dấu + nó lại "ép kiểu" cho giá trị phù hợp với nó và true trở thành 1 (wew, JS ơi, trả não ta đây)

**Câu 8: !!!true => false** còn câu nào khó hơn không?

chỉ là 1 pha tráo hàng qua lại của JS thôi, không có gì nhiều để bàn tán cả 

**Câu 9: true == "true" => false** Bring me Thanos!!!!!!!!

về mặt giá trị, true có thể quy ra 1, nhưng "true" nó là string, nên dĩ nhiên là không bằng nhau rồi. chúng sẽ bằng nhau khi bạn thêm dấu ! vào, và ta có **!true == !"true"**

**Câu 10: 010 - 03 => 5** Ơ, chắc mình phải học lại lớp 1 mất thôi

Quây ờ mi nít, đoạn này, JS lại chơi chó, à không, chơi khó chúng ta rồi, nếu bạn gõ ra số 010 lên console, nó sẽ trả về là 8 ( dờ heo???)
Mình đã thử với các dãy số khác, như 011, 022, 033, 044. Điểm chung của chúng đều có số 0 ở trước, dường như việc có số 0 đằng trước, đã làm số đó chuyển qua bảng số khác (không phải loại thập phân chúng ta hay xài), nhưng lưu ý là dãy số phải từ 3 số trở lên nó mới chuyển nhé, ví như 03 thì nó không chuyển đâu

**Câu 11: "" - - ""  => 0** Sao nó ra thế được nhỉ?

Cùng phân tích nó nhé, "" có thể hiểu sang boolean là false, false hiểu qua number là 0, 0 - - 0, :v nghe có vẻ hợp lý nhở

**Câu 12: null + 0 => 0** A ha, chính xác rồi nhé

null có thể hiểu là không có gì, chuyển sang number là 0 lun :v (cơ mà đừng ai thử parseInt(null) nhá, nó ra NaN đấy, thật ảo diệu :v)

**Câu 13: 0/0 => NaN** Đáng lẽ phải là SyntaxError chứ nhỉ, phép tính này sai rồi :v 

Mình đã nghĩ là phép tính này sai, nó sẽ ra SyntaxError, nhưng không các bạn ạ, nó .... không sai :|, chỉ là nó không đúng thôi (quát dờ heo???)

Cảm ơn các bạn đã theo dõi bài viết của mình, :v 1 bài viết có chút nhộn nhạo để giúp mình giải toả stress sau chuỗi ngày OT, hy vọng được các bạn đón nhận

Các câu hỏi trên được mình tham khảo từ nguồn [jsisweird](https://jsisweird.com/) , vẫn còn 12 câu hỏi nữa, hẹn các bạn lần chia sẻ tiếp theo nhé!!!
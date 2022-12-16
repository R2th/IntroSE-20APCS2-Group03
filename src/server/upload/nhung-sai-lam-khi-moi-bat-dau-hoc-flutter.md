### I) Introduction 
- Dạo gần đây chắc hẳn mọi người hay nghe đến cái tên ```Flutter``` nhỉ, nói thật tui thấy hắn ngày càng nổi tiếng rùi đó, tại sao đẻ ra sau nhưng hắn lại được yêu thương như vậy, hắn cũng chỉ là 1 cái framework dùng để build các ứng dụng cho mobile thôi mà, các đàn anh đi trước đã có nhiều cải thiến, tối ưu nhưng tại sao vẫn bị thằng này chiếm quyền yêu thương của nhiều coder vậy, lý do thì các bạn tự tìm hiểu nha =)).
- Thằng ```Flutter``` này tính từ lúc nó được thằng Google ra mắt vào năm 2018 cho đến giờ thì phải công nhận trong thời gian ngắn mà nó được cải tiến và nâng cấp một cách rõ rệt, performance thì tuyệt vời, UI thì dễ thiết kế, cộng đồng thì đông đảo. Suy ra nhiều thanh niên tay mơ, cơ nhỏ nghe hấp dẫn, bị dụ dỗ bởi mật ngọt mà đi tắt đón đầu bay vào thử bóc lột, khai thác thằng flutter ni một cách trắng trợn dẫn đến nhiều sai lầm, hậu quả nảy sinh, lãng phí thời gian tiền bạc mà kết quả không khả quan cho lắm =)).
- Hãy cùng điểm qua những sai lầm mà những người mới học hay mắt phải cũng như những điều mà chúng ta nên làm trong khi học flutter nào. Let's gâu
### II) Chưa nắm rõ OOP mà bay thẳng vào học Flutter
- Theo mình nghĩ điều này rất là quan trọng, có thể bạn không cần biết về Native Development , bạn vẫn có thể bay thẳng vào học Flutter, nhưng nếu bạn không nắm rõ được khái niệm OOP thì việc học Flutter của bạn thực sự bạn sẽ gặp rất nhiều khó khăn.

![alt](https://media.giphy.com/media/d2lcHJTG5Tscg/giphy.gif)
### II) Đừng dừng lại ở việc chỉ xem tutorials hay đọc document.
- Một trong những sai lầm khác là chúng ta có thói quen là xem và làm theo như tutorial hay document, điều này thực sự không khiến bạn trở thành 1 good dev đâu. Thay vào đó bạn nên build cho mình ít nhất 1 app với những kiến thức mà bạn học được, điều này giúp bạn nhớ lâu hơn cũng như biết được những sai lầm trong khi chúng ta thực hành với nó.

![alt](https://media.giphy.com/media/cir4yci4imK6CB9lAB/giphy.gif)
### III) Vừa code vừa xem tutorials
- Chúng ta hay có 1 thói quen là vừa xem tutorial vừa code, Theo mình nghĩ, thay vào đó bạn nên xem 3 - 4 tutorials rồi mới bắt tay vào code mà không cần xem lại chúng, điều này giúp bạn nhớ code lâu hơn, đồng thời có thể tạo ra code riêng cho mình. Chắc hẳn trong số các bạn đã từng trải qua cảm giác copy paste rùi nhỉ =)). Đó chính là hậu quả của việc hiểu code nhưng không nhớ code đó :D. Chúng ta có thể hiểu được những gì người ta code, nhưng không có nghĩa chúng ta code lại được những gì người ta làm.

### IV) Những gì bạn học được, cứ quăng thẳng lên Github đi
- Có thể các bạn thấy không cần thiết, nhưng theo mình nó cũng có lợi ích đó nha, một mũi tên trúng 2 hòn dái đó. Github thì không quá xa lạ trong xã hội dev rồi, do nó quá là tiện ích đấy mà
- Mình đã từng làm với 1 anh ở cty, số lượng mà anh ấy quăng lên github trong khoảng thời gian ngắn > 200 project và anh ấy cũng rất thành thạo Git luôn, hỏi ra mới biết thì anh ấy bảo là những gì anh học thì đẩy lên trên Git có cái tiện là ở đâu cũng có thể lấy ra dùng, chỉnh sửa gì cũng được, lâu ngày có thể quên thì vào lục lại và có cái hay là do làm việc với Git nhiều nên hầu như trong mọi tình huống xảy ra với Git anh ấy đều có thể giải quyết. Có thể mình nói không liên quan lắm nhưng mà chúng ta nên tập làm quen với việc là những  gì học được, project nhỏ lớn trong khi thực hành thì cứ cho nó lên Github hết, để sau này khi nhìn lại mới biết được hên lúc nớ mình đi đúng con đường =)). Chém gió đủ rồi, tới vấn đề tiếp nào.

### V) Flutter là thế giới của Widget, do đó hãy lựa chọn những widget mà hay được sử dụng
- ```Flutter``` có rất nhiều Widget, vì vậy bạn nên khám phá, tìm hiểu những widget nào hay được sử dụng. Ví dụ tại sao thằng Scaffold, MaterialApp hay được sử dụng. Thực sự có khả thi khi làm 1 app mà không sử dụng MaterialApp. Việc đặt ra những câu hỏi cũng như tìm kiếm câu trả lời sẽ giúp bạn hiểu rõ hơn về các widget cũng như cách apply chúng.
### VI) Mới học cứ nhắm thẳng UI mà tiến
- Như mình đã nói trước đó, ```Flutter``` là thế giới của Widget, do đó bạn nên thành thục với nó đã, ít nhất là đủ để bạn tạo ra 1 simple app. Vì nó giúp bạn hiểu rõ hơn về ```Widget Tree``` cũng như cách mà Flutter nó render ```Widget```.
### VII) Tập làm quen với debug code
- Ngày nay mình thấy nhiều bạn có thói quen là hay print, print every where, thay vào đó các bạn có thể dùng Log. Nhưng mình nghĩ tốt nhất các bạn nên tập debug code, vì nó giúp bạn hiểu rõ hơn về flow của app cũng như các library được sử dụng.
### VIII) Public 1 package lên trang pub.dev
- Nghe có vẻ lạ lạ nhỉ, nhưng mà không đâu, nó cũng là 1 điều quan trọng đó. Việc có 1 package của riêng mình trên trang pub.dev cũng đồng nghĩa việc bạn hiểu cách để public 1 package của riêng mình, bên cạnh đó có thể hiểu cách mà các package khác nó hoạt động. Ngoài lề xí, bạn hãy thử tưởng tượng một ngày nào đó packge của chính bạn được upvote rất nhiều like, được sử dụng rất nhiều thì bạn cảm thấy sao, sung sướng, hạnh phúc chứ sao, vì nó nằm ở đó, hằng ngày được những con dev thiêu thân lao vào clone về sử dụng, khai thác, cảm kích thứ mà  mình tạo ra, hạnh phúc quá ý à =)).
### IX) Tổng kết
- Trên đây mình chỉ giới thiệu những điều cần và thiết để những người mới học cũng như các bạn đang học Flutter hiểu rõ hơn quy trình học Flutter cũng như cách khai thác, sử dụng chúng cho hợp lý, nếu có gì sai xót, mong các bạn góp ý.
- Nguồn tham khảo: https://abhishekdoshi26.medium.com/dont-do-this-mistake-while-learning-flutter-2bb35b658f7e
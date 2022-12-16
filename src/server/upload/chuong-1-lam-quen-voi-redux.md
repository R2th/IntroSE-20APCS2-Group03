Đây là bài dịch, bài gốc mời các bạn xem ở đây : https://medium.freecodecamp.org/understanding-redux-the-worlds-easiest-guide-to-beginning-redux-c695f45546f6


Vì bài gốc khá dài nên mình sẽ chia thành nhiều phần, đây là phần đầu tiên

![](https://images.viblo.asia/9fce4f38-b42c-454a-b29f-94fc6df7a3c4.png)

Đây là một hướng dẫn toàn diện (nhưng đã được đơn giản hoá) dành cho người gần như mới hoàn toàn về Redux, hoặc cho bất kỳ ai muốn đánh giá và kiểm tra lại kiến thức của bản thân về những định nghĩa và tư tưởng cơ bản của Redux.

Các bạn có thể tham khảo mục lục nội dung chi tiết hơn ở [đây](https://medium.com/@ohansemmanuel/table-of-contents-for-understanding-redux-ea0667e1453d)

## Giới thiệu

![](https://images.viblo.asia/065f4ac4-ad75-4e65-8d54-4e27c0db281c.png)

Bài viết này (mà thật ra là một quyển sách) là mảnh ghép còn thiếu nếu như bạn đang trên con đường để làm chủ Redux.

Trước khi bắt đầu, tôi muốn nói với các bạn rằng quyển sách này hầu hết là về tôi. Vâng chính tôi, chính là những rắc rối mà tôi gặp phải khi học Redux, và quá trình tìm kiếm một giải pháp tốt hơn để có thể dạy lại nó cho người khác. 

Tôi bắt đầu học React từ một vài năm trước. Tôi đã rất hào hứng với nó, nhưng dường như mọi người khác lại đang nói về một thứ gì đó có tên là Redux

### Chúa ơi! Cái quá trình học hỏi liên hoàn này có kết thúc không vậy?

Là một Kỹ sư phần mềm có cam kết về việc tự phát triển bản thân, tôi muốn có thêm tri thức và không muốn mình bị tụt hậu. Vì thế tôi đã bắt đầu học Redux.

Tôi đã xem tài liệu về Redux. Tài liệu khá là tốt, thực sự là như vậy! Tuy nhiên vì một vài lý do, tôi cảm thấy nó không phù hợp với mình cho lắm. Tôi đã xem một loạt các Video trên Youtube, nhưng những thứ mà tôi tìm được thì có vẻ đã lỗi thời và không chi tiết cho lắm. Tôi khổ lắm.

Thành thật mà nói, tôi không nghĩ rằng những video hướng dẫn mà tôi đã xem là tệ. Nó chỉ đơn giản là thiếu một cái gì đó. Tôi chỉ cần một hướng dẫn dễ dàng để có thể suy nghĩ một cách thấu đáo, và dành cho người ôn hoà, chứ không phải cho một vài nhân loại có trí tưởng tượng phong phú.

Và tôi nghĩ rằng mình không đơn độc.

Một người bạn tốt của tôi, là người mà tôi đã hướng dẫn trong một đoạn thời gian, vừa mới hoàn thành một khoá học để giàng được một chứng chỉ lập trình React với một cái giá khá cao (khoảng 300$) . 

Khi tôi hỏi anh ta về cảm nhận thực tế với chương trình, thì ý kiến của anh ta như sau:

> Khoá học về cơ bản là tốt, nhưng tôi không nghĩ phần Redux đã được giải thích tốt cho những người bắt đầu như tôi. Nó cũng không được mô tả tốt cho lắm.
 
Bạn thấy đấy, có rất nhiều người giống như bạn của tôi, đang gặp vấn đề để hiểu về Redux. Họ thể sử dụng được Redux, nhưng không thể tự tin nói rằng mình thực sự hiểu cách hoạt động của nó.

Tôi quyết định phải tìm ra một giải pháp cho vấn đề này, bằng cách tìm hiểu một cách sâu sắc về Redux và tìm ra một con đường rõ ràng hơn cho việc dạy nó cho người khác.

Kết quả là những điều mà các bạn sắp đọc ngay sau đây đã tốn của tôi hàng tháng trời học hỏi, làm một vài ví dụ mẫu, trong khi vẫn đang đi làm hàng cùng với những cam kết nghiêm túc khác.

Nhưng bạn biết gì không?

Tôi cực kì háo hức khi chia sẻ những điều này với bạn!

Nếu bạn đang tìm kiếm một hướng dẫn về Redux phù hợp với bản thân, thì đây chính là cái bạn đang cần.

Tôi đã đưa vào đây những suy nghĩ và lý giải về những vấn đề mà mình gặp phải khi học Redux kèm theo nhiều thứ khác nữa. Tôi sẽ đảm bảo rằng sẽ dạy cho bạn phần quan trọng nhất mà không khiến bạn phải băn khoăn hay bối rối. Nó là một lời hứa đấy.

### Cách tiếp cận của tôi để dạy Redux

Vấn đề thực tế khi cần giảng giải về Redux - đặc biệt là với những người mới - không phải là sự phức tạp của chính thư viện đó.

Tôi không nghĩ là nó phức tạp. Nó chỉ đơn giản là một thư viện với độ lớn vỏn vẹn 2kb - mà đấy là đã bao gồm cả các thư viện phụ thuộc rồi đấy.

Nhưng khi nhìn vào cộng đồng Redux với tư cách là một người mới bắt đầu, bạn sẽ chóng mặt rất nhanh đấy. Vì nó không **chỉ** nói về Redux, mà còn là hằng ha sa số các thư viện tích hợp hỗ trợ cho việc xây dựng những ứng dụng thực tế.

Nếu bạn dành ra chút thời gian để tìm hiểu, thì hẳn bạn đã từng lướt qua một số thư viện rồi. Có thể kể đến như là Redux, React-Redux, Redux-thunk, Redux-saga, Redux-promise, Reselect, Recompose và rất nhiều thứ khác nữa!

Và nếu như thế vẫn chưa đủ, sẽ còn một vài thư viện khác như là Routing, Authentication, Server side rendering, Testing, Bunding rải rác khắp nơi.

Chúa ơi điều này thực sự trở nên quá tả mất rồi.

Các hướng dẫn về Redux thông thường nói chả bao nhiêu về Redux, nhưng lại nói rất nhiều về những thứ khác đi kèm theo nó.

Đáng lẽ nên có một cách tiếp cận ôn hoà và hướng dến người mới bắt đầu nhiều hơn. Nếu bạn là một rô-bốt lập trình viên , thì có thể bạn sẽ không gặp vấn đề gì cả. Nhưng tất cả lập trình viên chúng ta đều là con người, phải không.

### Và đây là cách mà tôi đã tiếp cận để dạy Redux

Hãy tạm quên hết tất cả các thứ bổ sung cho Redux đi, và chúng ta chỉ làm Redux thôi. Y eah!

Tôi sẽ chỉ giới thiệu những điều căn bản nhất bạn cần biết. Trong này sẽ không có React-router, Redux-form, Reselect, Ajax, Webpack, Authentication, Testing, ... Tất cả!

Và đoán xem? Đó cũng là cách mà bạn đã dùng để học được những skill quan trọng trong cuộc đời.

Làm thế nào mà bạn học đi?

Bạn có bắt đầu chạy trong một ngày không? Không!

Hãy để tôi dẫn dắt bạn qua một cách hết sức ôn hoà để học Redux mà không có bất kì sự phiền nhiễu nào.

Hãy ngồi cho chắc.

### "Một con sóng sẽ nâng tất cả các con thuyền"

Một khi bạn đã quen với các khái niệm và cách mà Redux hoạt động (con sóng), thì mọi thứ khác sẽ dễ dàng hơn để suy luận (nâng tất cả con thuyền)

## Một chú thích về đường cong học tập của Redux

![](https://images.viblo.asia/182b3fb7-3aaa-4945-985d-a5582b9f06cf.png)
> Một tweet từ Eric Elliot về đường cong học tập của React.

Redux cũng có một đường cong học tập, và tôi đồng ý với nó.

Học để bước đi cũng có một đường cong học tập. Tuy nhiên với cách tiếp cận có hệ thống để học tập thì bạn có thể làm chủ nó.

Bạn có thể thất bại một vài lần, nhưng điều đó hoàn toàn ổn. Một vài người sẽ luôn ở xung quanh để nâng bạn lên và đặt bạn đứng lên.

Và tôi hy vọng rằng mình sẽ là người đó khi bạn học Redux với tôi.

### Những điều bạn sẽ học

Sau tất cả những gì tôi nói ở trên, bạn sẽ dần cảm nhận được rằng Redux không hề đáng sợ như vẻ ngoài của nó. 

Những nguyên tắc của Redux cực kỳ dễ hiểu!

Đầu tiên, tôi sẽ dạy bạn những điều căn bản nhất của Redux bằng ngôn ngữ giao tiếp cơ bản và dễ tiếp cận.

Sau đó, chúng ta sẽ cùng xây dựng một vài ứng dụng đơn giản. Bắt đầu bằng Hello World như bao ngôn ngữ khác :D

![](https://images.viblo.asia/a2534316-ed35-460d-8b5f-77174f17c9d7.png)

Nhưng thế vẫn chưa đủ.

Tôi sẽ thêm vào cả những bài tập và vấn đề mà tôi nghĩ rằng bạn sẽ dễ dàng gặp rắc rối.

![](https://images.viblo.asia/efd06601-c5d9-4501-9821-c987b666f571.png)
> Một vài bài tập mà chúng ta sẽ làm cùng nhau.

Cách học tập hiệu quả không phải là chỉ đọc và nghe, mà nó hầu như là về luyện tập!

Hãy nghĩ những bài tập ở trên như là bài tập về nhà của bạn, nhưng thiếu vắng một thầy giáo dữ dằn. Khi bắt tay vào làm những bài tập này, bạn có thể Tweet đến tôi với hashtag #UnderstandingRedux và tôi nhất định sẽ xem cho bạn!

Không có giáo viên dữ dằn, hở?

Bài tập là tốt, nhưng bạn cũng cần phải xem tôi xây dựng một ứng dụng lớn hơn. Đây sẽ là nơi mà chúng ta tổng kết lại và xây dựng một ứng dụng có tên là **Skypey**, một app nhắn tin tuyệt vời giống như là bản sao của Skype.

![](https://cdn-images-1.medium.com/max/2000/1*3VVJuwBx5J-A4A4n5FhKcg.gif)

Skypey sẽ có các chức năng như là sửa, xoá tin nhắn, gửi tin nhắn đến nhiều liên lạc.

Các bạn đã thấy sôi động chưa ạ!

Nếu những thứ trên chưa đủ kích thích với bạn, thì tôi không nghĩ ra được thứ gì sẽ làm được. Tôi rất háo hức để cho bạn thấy ngay bây giờ!

![](https://cdn-images-1.medium.com/max/1600/1*LGGCJPkm_P-dpjlTKlFymw.gif)

### Yêu cầu

Yêu cầu duy nhất là bạn đã biết về React. Nếu như bạn chưa biết React, tôi đề nghị khoá học của [Dave Ceddia](https://medium.com/@dceddia) có tên là [Pure React](https://daveceddia.com/pure-react/) trong trường hợp bạn muốn tiêu tiền. Tôi không phải là người môi giới nhé, nó chỉ đơn giản là một tài liệu tốt thôi :P

![](https://images.viblo.asia/2256cda0-dcf7-421d-b6bf-c1d65262149e.png)


### Tải PDF và Epub cho đọc ngoại tuyến

Video dưới đây đánh dấu những điểm quan trọng trong quá trình bạn cần để lấy bản PDF và Epub của cuốn sách này

{@youtube: yHOPFYwlVvI}

Điểm then chốt ở đây là:

1) Truy cập vào trang [thông tin bán sách](https://www.youtube.com/watch?time_continue=1&v=yHOPFYwlVvI).
2) Sử dụng coupon **FREECODECAMP** để được discount 100% 
3) Nếu bạn muốn cảm ơn, hãy recommend bài viết này và bấm giữ icon clap để vỗ tay 50 lần.

Giờ hãy bắt đầu nào

## Chương 1: Làm quen với Redux
 
 ![](https://images.viblo.asia/e8c837b8-319e-4c83-bfd8-e279c77dcb2d.png)
 
 Một vài năm về trước, việc lập trình cho các ứng dụng front-end có vẻ như là một trò đùa đối với rất nhiều người. Những ngày đó, sự phức tạp tịnh tiến dần trong việc xây dựng những ứng dụng front-end một cách tươm tất thì rất là nhiêu khê.
 
 Dường như là để thoả mãn những yêu cầu thay đổi và cập nhật liên tục của người dùng, con mèo dễ thương đã phát triển và lớn lên ngoài phạm vi của môt ngôi nhà. Nó đã trở thành một con sư tử không biết sợ là gì với một bộ móng dài 3 inch và một cái mồm mở rộng đến mức có thể vừa một cái đầu người.
 
 Vâng, và nó thực sự là những gì mà những người lập trình web đã cảm nhận trong thời kỳ đó.
 
 Những framework hiện đại hiện nay như là Angular, React và Vue đã thực sự tuyệt vời khi cung cấp giải pháp để thuần phục con thú dữ này. Nói cách khác, các nguyên lý hiện đại sắp được trình bày dưới đây được củng cố và hỗ trợ bởi Redux cũng tồn tại như một liều thuốc an thần cho con thú đó.
 
 Chúng ta sẽ cùng điểm qua tất cả các nguyên lý này
 
 ### Redux là gì?
 
 ![](https://images.viblo.asia/bdeffd5d-2e2b-4359-9d14-9d13b42e0ea1.png)
 > Redux là gì? Nhìn từ phía tài liệu của Redux
 
 Tài liệu chính thống của Redux mô tả như sau:
 
 > Redux là một state container với các giá trị có thể dự đoán được dành cho các ứng dụng Javascript
 
 Với tôi, 9 từ ở trên (nguyên gốc tiếng Anh) có cảm giác như là một đoạn văn với 90 từ chưa hoàn thiện khi lần đầu đọc được. Tôi chỉ đơn giản là không hiểu được. Bạn chắc cũng có cùng cảm giác với tôi.
 
 Đừng sợ hãi nó. Tôi sẽ tạm bỏ qua đoạn ở trên một chút, và khi bạn sử dụng Redux nhiều hơn, câu văn ở trên sẽ dần dần trở nên rõ ràng hơn.
 
 Trong một mặt sáng sủa hơn, nếu bạn đọc được tài liệu ở trên vào thời điểm sớm hơn, bạn sẽ tìm thấy một vài thứ giải thích rõ ràng hơn ở một số điểm.
 
 Như là:
 
 > Nó giúp bạn viết các ứng dụng xử lý và thao tác một cách thống nhất ...
 
 Bạn hiểu rồi chứ?
 
 Một cách ẩn dụ, trong ngôn từ của người đi săn, câu nói trên có nghĩa là "Nó giúp bạn thuần hoá thú dữ".
 
 Redux giúp chúng ta xử lý những vấn đề khó khăn khi phải đổi mặt với việc quản lý state trong những ứng dụng lớn. Nó cung cấp cho bạn một trải nghiệp lập trình tuyệt vời, và đảm bảo rằng khả năng test cho app của bạn không bị hi sinh cho bất kỳ mục đích nào khác.
 
 Với việc phát triển các ứng dụng React, bạn có thể tìm ra rằng việc lưu trữ tất cả state trong một component ở level top sẽ không bao giờ là đủ để dùng cả.
 
 Bạn cũng có thể có rất nhiều sự thay đổi dữ liệu trong app của bạn theo thời gian.
 
 Redux sẽ giúp bạn xử lý tất cả những vấn đề trên. Và lưu ý rằng, nó không phải là giải pháp duy nhất.
 
 ### Vì sao sử dụng Redux?
 
Như bạn đã biết, các câu hỏi như là "Vì sao tôi nên sử dụng A chứ không phải B?" sẽ chẳng khác gì là những suy nghĩ cá nhân.

Tôi đã xây dựng các ứng dụng thực tế không sử dụng Redux. Và tôi chắc rằng sẽ có rất nhiều người làm giống như vậy.
 
Bản thân tôi cũng đã đắn đo rất nhiều về việc giới thiệu xem có nên giới thiệu thêm một lớp phức tạp nữa cho những người đồng đội trong team không. Trong trường hợp bạn đang tò mò, thì kết quả là tôi đã không hối hận.
 
Tác giả của Redux, [Dan Abamov](https://twitter.com/dan_abramov) cũng đã cảnh báo về sự nguy hiểm của việc [giới thiệu và sử dụng Redux quá sớm](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367) trong app của bạn. Bạn có thể không thích Redux, và đó là quá đủ để không sử dụng nó. Tôi cũng có những người bạn như thế.
 
Nhưng nói gì đi nữa, thì vẫn có những lý do rất hợp lý cho việc học Redux.
 
Lấy ví dụ, trong những app lớn hơn với rất nhiều mảnh ghép với nhau, việc quản lý state là vấn đề cực kỳ lớn. Redux xử lý vấn đề này khá tốt mà không ảnh hưởng đến hiệu năng cũng như đánh đổi lấy khả năng test của app.
 
Một lý do khác khiến rất nhiều lập trình viên yêu Redux bởi vì trải nghiệm trong công việc mà Redux cung cấp cho lập trình viên. Rất nhiều công cụ khác đã bắt đầu làm những điều tương tự, nhưng ra ngô ra khoai thì là Redux.
 
Một số thứ khá ngon lành bạn có thể có được với việc sử dụng Redux bao gồm logging, hot reloading, time travel, universal app, record and replay - hầu hết đều không phải làm gì để cài đặt, và dễ dàng sử dụng với tư cách là lập trình viên.
 
Bài nói của Dan với tên là [Hot Reloading với Time Travel](https://youtu.be/xsSnOQynTHs) sẽ giúp bạn có cái nhìn rõ ràng hơn về cách hoạt động của chúng.
 
Đồng thời, [Mark Ericsson](https://twitter.com/acemarke?lang=en), một trong những người đang maintain dự án Redux, nói rằng [có trên 60%](http://blog.isquaredsoftware.com/2018/03/redux-not-dead-yet/) các app React dùng trong thực tế sử dụng Redux. Đó là con số rất lớn!
 
Nếu bạn muốn có thêm một vài lý do để sử dụng Redux, thì Dan - người sáng tạo ra Redux, đã mô tả về rất nhiều lý do trong [bài viết này](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367) ở Medium.

Trong trường hợp không coi mình là một kỹ sư cấp cao, tôi đề nghị bạn càng nên học Redux - vì cả những nguyên tắc mà Redux có thể dạy cho bạn nữa. Bạn sẽ học được cách làm những điều thông thường theo một cách mới, và sẽ khiến bạn trở thành một kỹ sư phần mềm tốt hơn.

Mọi người đều có những lý do khác nhau trong việc chọn các công nghệ khác nhau. Cuối cùng thì, việc sử dụng cái gì là do bạn. Nhưng việc thêm Redux vào skill set của bạn thì không hề làm đau bạn chút nào.

### Giải thích Redux cho một đứa trẻ 5 tuổi

Phần này trong quyển sách là cực kỳ quan trọng. Lý giải ở đây sẽ được tham chiếu đến tất cả các phần trong quyển sách. Vì thế hãy sẵn sàng.

Vì một đứa trẻ 5 tuổi không có thời gian để hiểu được những thuật ngữ kỹ thuật, tôi sẽ làm cho phần này đơn giản hết mức có thể nhưng vẫn rất liên quan đến mục đích học Redux.

Giờ chúng ta bắt đầu!

Hãy xem xét một hành động bạn rất quen thuộc - đến ngân hàng để rút tiền. Kể cả bạn không làm việc này thường xuyên thì bạn vẫn có thể hình dung được quá trình sẽ diễn ra như thế nào.

![](https://images.viblo.asia/6b92ce2a-9583-4263-bf64-821b0ac2f366.png)
> Joe  đến ngân hàng.

Joe tỉnh dậy vào buổi sáng, và đến ngân hàng càng sớm càng tốt. Trên đường đến ngân hàng, chỉ có một **hành động/mục đích** ở trong đầu mình: để *RÚT_TIỀN*.

Joe muốn rút tiền từ ngân hàng.

![](https://images.viblo.asia/6ada3804-a196-467a-8133-e642fb9a40f4.png)
> Joe  đến ngân hàng với dự định rút tiền.

Khi đến ngân hàng, Joe đi thẳng đến quầy thu ngân để thông báo về nhu cầu của mình.

![](https://images.viblo.asia/b267f37b-7113-42c1-9879-78499965790f.png)
> Joe  đến ngân hàng, qua quầy thu ngân và thông báo rút tiền

Đợi đã, Joe đã qua quầy thu ngân ư?

Tại sao Joe không đến trực tiếp kho tiền của ngân hàng và lấy tiền của mình?
![](https://images.viblo.asia/d5bf1e26-2864-40df-bf00-21641b7c8119.png)
> Nếu Joe đến trực tiếp kho tiền của ngân hàng. Lúc đó anh ta có thể lấy được bao nhiêu tuỳ thích.

Sau cùng thì số tiền đó chẳng phải là số tiền mà bạn đã vất vả kiếm được hay sao.

Đương nhiên là như các bạn đã biết, mọi thứ không hoạt động tuỳ ý được. Tiền ở trong kho, đúng vậy, nhưng bạn phải nói chuyện với nhân viên ở quầy thu ngân để giúp bạn làm theo một quy trình để rút tiền từ tài khoản của bản thân.

Người thu ngân sẽ sử dụng máy tính của mình để nhập vào một số lệnh và đưa lại tiền cho bạn. Đơn giản và dễ dàng.

![](https://images.viblo.asia/c144e5d3-76f7-4136-874a-872752595cce.png)
> Joe sẽ nhận tiền như này chứ không phải chui vào kho, xin lỗi nha

Vậy thì Redux liên quan gì đến câu chuyện tôi vừa kể?

Chúng ta sẽ đi vào chi tiết sớm thôi, nhưng trước hết hãy cùng nói về những thuật ngữ chuyên môn một chút nhé.

1. Kho tiền là của ngân hàng, tương đương với `Redux Store` là của Redux
![](https://images.viblo.asia/dba4405a-cfcd-4ba4-9c07-2439906fead5.png)
> Kho tiền của ngân hàng có thể được ví như Redux Store.

Nhưng kho tiền thì sẽ giữ tiền của ngân hàng, còn Redux Store thì sao?

Thực tế thì, trong ứng dụngc ủa bạn, bạn sẽ không tiêu tiền. Thay vào đó, `state` (trạng thái) của ứng dụng sẽ giống như tiền mà bạn tiêu. Toàn bộ phần giao diện người dùng sẽ là một chức năng của state trong ứng dụng.

Cũng giống như chức năng của kho tiền của ngân hàng là giữ tiền một cách an toàn, state trong ứng dụng của bạn sẽ được đảm bảo an toàn bởi một thứ gọi là `store`. Vì thế có thể nói rằng, `store` sẽ đảm bảo cho `state` của bạn an toàn như tiền trong kho.

Bạn nên ghi nhớ điều này, thật sự đó.

**Redux Store có thể được ví với Kho Tiền trong ngân hàng. Nó lưu trữ state của ứng dụng và đảm bảo nó được an toàn**

Điều này sẽ dẫn tới nguyên tắc đầu tiên của Redux:

> Chỉ có một nguồn đúng đắn duy nhất (single source of truth): State của toàn bộ ứng dụng được lưu trữ ở trong một cây object nằm trong một Redux store duy nhất
 
Đừng để ngôn từ làm bạn bối rối.

Nói theo các từ ngữ đơn giản, bạn được khuyến để lưu trữ state của ứng dụng trong một đối tượng duy nhất và được quản lý bởi Redux `store`. Nó cũng giống như là có một `nhà kho` để lưu trữ toàn bộ tiền của ngân hàng.

![](https://images.viblo.asia/70533011-e386-4989-836d-5f93f5dbd569.png)
> Nguyên tắc đầu tiên của Redux

2. Đến ngân hàng với một `action` (hành động) trong đầu.

Nếu bạn muốn đến ngân hàng để rút tiền, bạn sẽ phải đến đó với một vài dự định hoặc hành động gì đó để có thể rút tiền. Nói cách khác, nếu bạn chỉ đi bộ đến ngân hàng và lởn vởn ở quanh đấy, sẽ không có ai đưa tiền cho bạn. Thậm chí bạn có thể bị đuổi ra ngoài bởi bảo vệ, nghe thật buồn.

Điều tương tự cũng có thể áp dụng cho Redux. 

Bạn có thể viết bao nhiêu code bạn muốn, nhưng nếu bạn muốn cập nhật state của ứng dụng trong Redux (tương tự như khi sử dụng `setState` trong React), bạn cần phải thông báo cho Redux biết điều đó với một thứ gọi là `action` (hành động)

Cũng giống như cách bạn cần phải theo khi rút tiền từ ngân hàng, Redux cũng có một quy trình để thay đổi/cập nhật state của ứng dụng.

Điều này sẽ dẫn đến nguyên tắc thứ 2 của Redux

> State chỉ có thể đọc (read-only)
> Cách duy nhất để có thể thay đổi state là bắn (emit) ra một action, với một đối tượng mô tả những gì đã xảy ra.

Điều này có nghĩa là gì theo ngôn ngữ thông thường?

Khi bạn đi bộ đến ngân hàng, bạn đã có một hành động/mục tiêu rõ ràng trong đầu. Trong ví dụ này, bạn muốn đến rút tiền.

Nếu chúng ta thử mô tả lại quá trình rút tiền ở trên trong một ứng dụng Redux, hành động đến ngân hàng có thể được biểu diễn bởi một đối tượng như sau.

```
{ 
  type: "WITHDRAW_MONEY",
  amount: "$10,000"
}
```

Trong context (bối cảnh) của một ứng dụng Redux, đối tượng ở trên được gọi là một `action`! Nó luôn luôn có một trường tên là `type` để mô tả hành động mà bạn muốn thực hiện. Trong trường hợp này thì giá trị là `WIDTHDRAR_MONEY` (rút tiền).

Mỗi khi muốn thay đổi/cập nhật state của ứng dụng Redux, bạn cần dispatch (gửi đi) một action

![](https://images.viblo.asia/3113d203-2adf-4cb9-a9ee-e81db7c04ef0.png)
> Nguyên tắc thứ hai của Redux

Bạn không nên stress quá khi cố hiểu nguyên tắc này. Tôi chỉ đang mô tả đến những nguyên tắc nền tảng ở đây. Chúng ta sẽ bắt gặp và thực hành lại những điều này trong rất nhiều ví dụ sớm thôi.

3. Người ở quần thu ngân đóng vai trò là `reducer` trong Redux.

Giờ chúng ta sẽ quay lại một chút.

Trong cậu chuyện của chúng ta vừa kể ở trên, bạn không thể đi trực tiếp vào kho và lấy tiền của mình, mà phải gặp nhân viên ở quầy thu ngân trước đó.

Vậy là bạn đã có một hành động muốn thực hiện (rút tiền), nhưng bạn cần truyền đạt hành động đó cho một người nào đó - nhân viên thu ngân - với vai trò sẽ giao tiếp với kho của ngân hàng (bằng bất cứ phương thức nào cũng được) là nơi chứa tất cả tiền (tương đương với store của Redux đang chứa object là state của app)

![](https://images.viblo.asia/c3efcc3a-ae9f-43ae-95d7-11e22502525a.png)
> Giao tiếp giữa nhân viên thu ngân và kho tiền!

Điều tương tự cũng áp dụng với Redux!

Giống như cách bạn tạo ra action để rút tiền với người thu ngân, bạn cũng cần phải làm tương tự trong ứng dụng Redux. Nếu bạn muốn cập nhật state của ứng dụng, bàn cần chuyển `action` của mình đến `reducer` - người thu ngân của bạn.

Quá trình này thường được gọi là `dispatch một action` (gửi đi một hành động).

![](https://images.viblo.asia/a8282137-5a1b-419f-8cfc-aa94520c05f3.png)

Từ dispatch chỉ là một từ tiếng Anh đơn giản. Trong ví dụ này, và trong thế giới của Redux, thì nó có nghĩa là gửi một hành động đến các `reducer`.

Các `reducer` sẽ biết phải làm gì. Trong ví dụ này, nó sẽ nhận hành động có kiểu là `WITHDRAW_MONEY` và đảm bảo rằng bạn lấy được tiền. Còn nói trong ngôn ngữ của Redux, số tiền mà bạn rút được là `state` của bạn. Vì thế, reducer biết phải làm gì, và nó luôn luôn trả về một `state mới`.

Việc đó không quá khó để hiểu, đúng không?

Và nó dẫn đến nguyên tắc cuối cùng của Redux:

> Để mô tả state tree được biến đổi như thế nào bởi các action, bạn viết các hàm reducer dưới dạng pure (thuần khiết).

Tôi sẽ giải thích từ `pure` có nghĩa là gì. Đến thời điểm này, điều quan trọng nhất bạn cần phải hiểu, đó là để cập nhật state trong app của bạn (giống như với `setState` trong React), thì các action của bạn cần phải luôn luôn được gửi (dispatch) đến các reducer để lấy về `state mới`.

![](https://images.viblo.asia/eac752a4-f451-4909-b0c3-e4636bd07a22.png)
> Nguyên tắc thứ 3 trong Redux

Hy vọng với sự so sánh này, bạn đã có được những khái niệm đầu tiên về những thành tố quan trọng nhất trong Redux, đó là : `store`, `reducer` và `action`.

3 thành tố trên là nòng cốt cho bất kỳ ứng dụng Redux nào. Khi đã hiểu về cách chúng hoạt động, thì chúng ta đã xong việc.
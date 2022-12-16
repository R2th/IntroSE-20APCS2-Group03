Ngày nay, Slack đã trở thành một công cụ quen thuộc của các cty. Nhưng qua bài viết của tác giả Takata Kizashi trên diễn đàn qiita, chúng ta sẽ thấy Slack có những vai trò cực kì hay ho khác.
Hãy cùng tìm hiểu nhé.
Bài gốc: https://qiita.com/KizashiTakata/items/d442d4a28d147529f1b6

Lời tác giả:
Tôi là một lập trình viên freelance, và hiện tại tôi chưa có ý định làm nhân viên chính thức. Tuy nhiên tôi đã thấy được torng quá trình làm việc ở nhiều nơi một điều là " Từ phương pháp sử dụng SLack, có thể phản ánh thái độ đối với kĩ thuật của một công ti ( ở một mức nào đó) "
Nếu sau này tôi có đi xin việc thì tôi nhất định sẽ hỏi câu "Công ti các bạn đang sử dụng Slack như thế nào?"

Tôi cũng có lưu ý đến vài vấn đề như "Cti bạn có cung cấp ghế ngồi và bàn phím chất lượng cao hay không?" nhưng mà những câu đó thì khó mà hỏi trong buổi phỏng vấn đúng không nào? So với những chuyện đó, thì câu hỏi về "mức độ sử dụng Slack" thì sẽ dễ hỏi hơn và sẽ được cung cấp thông tin một cách chính xác. 

Lưu ý:
Phần tiếp theo tôi sẽ chia việc sử dụng Slack theo nhiều level cho dễ nói, nhưng chắc chắn tôi không có ý là "Nếu chỉ dùng Slack ở level 2 thì mức độ công nghệ kĩ thuật của công ti đó không vượt quá level 2".
Nếu nói chính xác thì "Một khi sử dụng vượt quá level 3 như một lẽ đương nhiên, thì cho thấy công ti đó có sự quan tâm rất cao đến việc cài đặt kĩ thuật mới, cải thiện nghiệp vụ và sử dụng các DevOps". Từ đó, ta có thể suy ra khả năng cao đây là một công ti rất "quan tâm đến kĩ thuật viên". Dù sao đi nữa, thì trong thế giới mà chuyện gì cũng có thể xảy ra này, bài viết của tôi không phải là tuyệt đối.

Bên cạnh đó, tuy nói rằng công ti sử dụng Slack ở Level cao thì khả năng cao là họ có những kiến thức và ý tưởng về mặt kĩ thuật cao, nhưng mà từ level 3 trở đi thì sẽ rất khó cho các doanh nghiệp quy mô lớn áp dụng vào tiêu chuẩn chung của họ. Tôi cũng hiểu điều đó mà. Còn về nhóm web và SIer thì lại khác. SIer thì thì từ level 3 trở đi mà áp dụng cho toàn thể công ti thì có lẽ cũng sẽ khó khăn.

Thông qua bài viết này, tôi mong rằng các bạn sẽ đọc bài viết này từ góc độ của nhân viên cơ sở hạ tầng để thấy được rằng "Nếu chỉnh sửa lại những chỗ (như trong bài viết) này, thì có thể tạo cho các kỹ thuật viên một môi trường công ti thoải mái.
Ngay cả ở cấp độ dự án, nội việc cài đặt từ level 3 trở đi đã là rất khác biệt rồi.
Nhưng mà nói thì nói thế, level 0 thì không thể chấp nhận được. 

Tiếp theo sau đây tôi sẽ viết về các level
Level 0: Chat tool? Cti tôi ko xài tool mà dùng mail.
Bạn sẽ nghĩ : “Sao lại có thể có công ti như thế?” đúng không?
Thực tế là có đấy.
Những công ti như thế thì chỉ có thể giải thích là họ “Không coi trọng việc tối ưu hóa giao tiếp nội bộ trong quá trình lập trình”
Có những công ti dù luôn mồm kêu gọi “Tăng cường giao tiếp nội bộ” nhưng mà cấp người ta nói chuyện trong khi không hiển thị một chút gì sự quan tâm đến tối ưu hoá việc chia sẻ thông tin.
Đây chính là một trong những công ti cũ tôi từng làm. Gần đây tôi nghe nói đã có cải thiện rồi.
※ Vì tôi vẫn giao lưu với mấy người bạn có quan hệ tốt trong công ti đó.

Trên thực tế, tôi cho rằng quá bán số cti áp dụng Slack ở level 1
Level 1: Dùng như tool liên lạc, tạo channel cho từng project.
Level phổ thông, ko có gì để nói.

Level 2 : 
Chuẩn bị channel để mọi người chat chung và channel để chat trong project. Ngoài ra, chuẩn bị riêng channel kĩ thuật.
Nếu không theo cấu trúc này thì dùng cấu trúc khác cũng được, nhưng cái tôi muốn nói là:
1.  Cti hiểu được tầm quan trọng của việc [Xây dựng và vận dụng Channel].
2.   Cti hiểu được tầm quan trọng của Channel chat chung giúp mọi người bắt chuyện làm quen với nhau
3.   Thông qua channel kĩ thuật có thể chia sẻ nhanh chóng các kĩ thuật mới.
+ Quan trọng là 2 ý đầu, ý thứ 3 thì có càng tốt.
Ý thức nhất rất quan trọng, còn ý thứ 2 cũng quan trọng không kém.
Có người sẽ cho rằng ý thứ 3 mới là quan trọng, nhưng cá nhân tôi thấy ý số 1 và số 2 quan trọng hơn nhiều.
Tại sao thế?

Nếu làm được ý số 2, thì sẽ giảm được sự ngại ngần khi phải gửi tin lên Slack.
Theo bạn thì giữa 2 vấn đề:
" Sự ngại ngần khi gửi tin lên Slack mà thấp quá thì sẽ xảy ra tình trạng gửi tin không cần thiết"
và
" Sự ngại ngần khi gửi tin lên Slack mà cao quá thì họ sẽ không thoải mái trong việc gửi".
Thì vấn đề nào sẽ gây khó khăn cho nghiệp vụ? Tôi thì cho rằng là vấn đề thứ hai.

Thứ nhất: Vân đề đầu tiên thì đã có thể giải quyết bằng việc có channel chat chung rồi, vì đây là vấn đề của mỗi người nên dù thế nào cũng đối ứng được.
Việc "Không thể phát ngôn thoải mái trên chat tool" có ảnh hưởng rất lớn đến cả bầu không khí trong cti lẫn performance cá nhân. Kĩ sư cũng là người cho nên đương nhiên là cảm xúc của họ cũng ảnh hưởng đến công việc, nếu bạn không thấy một công ti mà trong đó “Ai cũng không thoải mái phát ngôn trên Slack” là một công ti có vấn đề thì cũng hơi bị sai đấy.
Nếu có thể giải quyết vấn đề đó chỉ bằng một channel thì cái giá phải trả quá rẻ đúng không nào? Gần như là miễn phí luôn đấy.

Level 3: Liên kết hoàn toàn với hosting service của GIT 
Từ level này, Slack sẽ vượt quá vai trò “tool giao tiếp”, và trở thành “tool phát triển” hay còn gọi là “DevOps tool”.
Từ level 3 trở đi thì có lẽ sẽ có sự thay đổi. Như là chỉ cài đặt level 4 thôi chẳng hạn.
Tuy nhiên, từ level trở đi thì chỉ cần cài đặt 1 nội dung thì việc cài đặt sẽ tăng lên, cho nên bạn không cần coi trọng việc xếp hạng trên dưới của các level này,

Tôi gọi level 3 này là “Liên kết hoàn toàn hosting service GIT” nhưng nói chung đây là tiêu chuẩn cho thấy mức độ thực hiện của “văn hóa review hoạt động pull request” trên thiết bị.
Đây là một vấn đề mà kĩ sư rất coi trọng. Chỉ bằng việc có hay không có cái này, mà sinh ra sự khác biệt về mức độ thành thục trong lĩnh vực lập trình của người kĩ sư.

Về action trên remote server của GIT thì có nhiều cái lắm: như là push, merge, pull request, reviewer chỉ định comment, xác nhận v.v.
Tôi nghĩ rằng những thao tác này liên kết hết mức có thể với Slack mới là tốt nhất
Chẳng hạn như bitbucket có thể liên kết account của nhiều người với slack, khi người reviewer chỉ định thì thông báo sẽ được gửi đi.

Nếu không có chức năng liên kết này, thì mỗi lần tạo pull request lại phải gửi message riêng cho reviewer.
Những việc như thế không phải là phí phạm công sức hay sao?
Tất cả những action ở GIT sẽ được thông báo cho kĩ sư.
Nếu làm được như thế này thì tuyệt vô cùng. Tốc độ phát triển cũng tăng lên.


Level 4: liên kết CI/CD
Từ đoạn này trở đi thì Slack gần nghĩa với công cụ “điều hành’ hơn là “DevOps tool” rồi. Và nó có thể ko có ích gì cho developer, hoặc vô dụng nếu công ti không phải là doanh nghiệp kiêm luôn cả phần điều hành hệ thống do họ phát triển.
Tuy nhiên, tôi sẽ đưa ra ví dụ dễ hiểu:
Chẳng hạn như liên kết hosting service của GIT với tool như là CircleCI, sau khi push thì thường chạy build và test code.
Nếu có thể thông báo khi có vấn đề cho dev, thì có thể giúp dev có phương án đối phó sớm.
 ※Dĩ nhiên cũng có thể dùng các pre-commit.

Nhưng vốn ý tôi muốn nói là “ sẽ tốt nhất nếu có thể tự tay hoàn thiện bản test và build rồi push”. Và sẽ có rất nhiều lý do khiến cho việc đó không thể được tiến hành một cách tốt đẹp.
Khi đó, thì Slack sẽ hỗ trợ cho bạn!

Level 5: Liên kết 1 chương trình nào đó với Slack để rồi thông báo qua Slack những vấn đề nào đó.
Đến đây thì xem như đã hoàn hảo rồi. Mà thật ra chỉ cần đến level 4 là đã có thể xem như “Có khả năng liên kết Slack với bất kì chương trình nào” rồi.
Chẳng hạn như IFTTT. Có thể tập hợp những câu tweet trên twitter.

Cách tập hợp những câu truyền miệng trên Twitter thông qua liên kết Slack và IFTTT

Cái này không chỉ vì mục đích marketing đâu, mà còn có thể phát hiện ra bug và những chỗ không hoàn chỉnh của sản phẩm.
Bên cạnh đó, những dịch vụ của AWS mà có thể liên kết với Slack thì cũng đang tăng lên.
Bạn có thể thông báo các thông tin maintenance của AWS lên Slack.

Kết luận:

Những nội dung từ level 3 trở đi thì có thể thực hiện bằng mail nhưng nếu thế thì sẽ có vấn đề là số lượng mail tăng lên rất nhiều. Và cách phân chia Inbox của mail sẽ tùy vào mỗi cá nhân, dẫn đến những vấn đề phát sinh do lỗi con người.
Nếu dùng Slack thì có thể chia Channel và hiển thị các thông báo đó, giúp cho không xảy ra tình trạng “mail quan trọng bị trộn lẫn với notification”.

Nó là một chat tool nhưng không chỉ dừng lại ở chat tool.
Nó sẽ giúp bạn cải thiện nghiệp vụ mà không cần chi phí quá cao. Có thể nói Slack là một công cụ chiếm vị trí trung tâm của những DevOps.
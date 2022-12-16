Nhiều khi tôi cũng hay tự hỏi mình câu hỏi này, tôi luôn mong có ai đó chỉ ra những điểm mình làm chưa tốt, chưa đúng để cải thiện. Có lẽ mọi người cũng có chung một cảm giác như vậy. Nhưng thật ra, "ai đó", trong phần lớn trường hợp, lại là chính bản thân chúng ta đấy. Sao phải chờ một người đến giúp chúng ta tốt lên, mà không tự mình làm điều đó đúng không nào.

Có nhiều điều chúng ta biết là nếu làm sẽ tốt hơn, nhưng lại hay để dành để "lúc nào đấy" sẽ làm sau. Sự lười biếng như vậy dần dần sẽ khiến chúng ta trở nên "tồi" hơn. Vậy hãy cùng nhau tìm hiểu xem những dấu hiệu của một "Bad Programmer" là gì, và những thứ mà chúng ta nên cải thiện nhé!

Bài viết này mình có tổng hợp từ 1 số bài viết mà mình đọc được, khi đang tự đi tìm câu trả lời cho câu hỏi trên, link mình sẽ để bên dưới nhé.

## Không hiểu mục đích của code
Trước khi bắt tay vào code, chúng ta nên hiểu rõ mục đích của nó, từ đó chúng ta mới có thể tính toán các trường hợp và đưa ra giải pháp hợp lí nhất.

#### Dấu hiệu:
1. Code có nhiều các biến "rác" (unused)
2. Gọi các hàm, trả ra các output không liên quan đến mục tiêu
3. Khi fixbug thì chỉ sửa đoạn code đang bị báo lỗi, thay vì tìm hiểu cụ thể nguyên nhân để giải quyết triệt để.
4. Convert định dạng kiểu vô tội vạ, từ int sang string rồi sau đó lại từ string sang int

#### Khắc phục:
1. Tận dụng các tool mà các IDE hỗ trợ để support check lại code

## Không nắm rõ về ngôn ngữ lập trình của mình
Đôi khi mọi người chuyển từ ngôn ngữ này qua ngôn ngữ khác, nắm được cơ bản về các cơ chế tương tự nhau giữa các ngôn ngữ, nhưng lại chưa nắm sâu về cách hoạt động riêng của từng ngôn ngữ mình đang làm việc

#### Dấu hiệu:
1. Không follow theo standard (chuẩn) của ngôn ngữ, framework đó, hay rộng hơn là ko làm đúng theo OOP
2. Viết các đoạn xử lí quá dài, vì ko biết rằng trong ngôn ngữ, framework đó có hỗ trợ sẵn

#### Khắc phục:
1. Code, code và code. Không có 1 bài viết, clip hay course nào có thể giúp bạn từ newbie thành senior, chỉ có "lao động hăng say" thì "tình yêu sẽ tới"
2. Nghiền ngẫm documentation nhiều hơn. Ngoài hùng hục code thì bổ sung kiến thức để áp dụng vào thực tế cũng rất quan trọng
3. Học tập theo code của những người giỏi (qua github,...)


## Thiếu kĩ năng research
Các ngôn ngữ, framework ngày nay phát triển rất nhanh, support rất nhiều thứ (built-in features). Để có thể master được tất cả trong ngày một ngày hai là điều ko thể. Nhưng một lập trình viên giỏi là người luôn có kinh nghiệm trong việc nghiên cứu về các sự support mà framework, ngôn ngữ của mình mang lại, để tối ưu thời gian cho công việc đó.

#### Dấu hiệu:
1. Không nắm được các cơ chế hoạt động, các tính năng mà framework, ngôn ngữ mình đang dùng mang lại, nên phải tự code lại hết. Dẫn đến mất thời gian và chắc chắn sẽ nhiều bug hơn.
2. Không biết phải search như thế nào để giải quyết vấn đề mình gặp phải nhanh chóng. (Với việc ngành lập trình đã tồn tại từ nhiều năm, hầu hết các vấn đề cơ bản các bạn gặp phải thì đều đã có người gặp rồi, và đã có câu trả lời, nên chỉ cần biết cách tìm đến nó nhanh nhất)

#### Khắc phục:
1. Again: "Lao động hăng say, tình yêu sẽ đến"
2. Khi gặp vấn đề và tìm được cách giải quyết, ko chỉ copy paste mà hãy tìm hiểu rõ, sâu hơn để nắm được cụ thể, thậm chí nghiên cứu cả documentation để có thể hiểu rõ tường tận (nếu có time).

## Code không có tổ chức
Có thể vì áp lực của deadline, có thể vì bạn đã quá mệt mỏi sau khi debug mãi mới giải quyết được vấn đề, hoặc đơn giản là bạn nghĩ cần đếch gì phải có tổ chức. Tất cả sẽ biết code của bạn thành một đống rác trong 1 sớm 1 chiều xD

#### Dấu hiệu:
1. "Tôi sẽ fix nó sau, giờ tạm thế đã". Tất nhiên sẽ có những lúc phải ưu tiên giải quyết các vấn đề khác, tuy nhiên cũng nên ít nhất là để lại 1 cái TODO ở đó để sau biết mà quay lại
2. Quá chú trọng vào việc viết ra những dòng code ngắn. Ok nó rất tuyệt, hẳn là bạn cũng phải rất hiểu biết để có thể gộp 10-20 dòng code lại 1-2 dòng như vậy. Nhưng,... liệu mọi người, hay chính bạn sau này, có hiểu bạn đang viết gì hay ko, hay sẽ phải mất cả 1-2h để đi tìm hiểu lại mục đích của nó.
3. Convention ko quan trọng. Có những người chỉ cần nhìn những dòng code ko "ngăn nắp" thôi là đã thấy khó chịu, nhưng cũng có nhiều người lại ko quan tâm lắm, chạy được là được, cầu kì quá làm gì. Nhưng dần dần nó sẽ khiến cả project trông như một mớ hỗn độn đó.
4. Đặt tên không mang ý nghĩa: Yeah, không phải lúc nào tìm được một cái tên phù hợp và ngắn gọn để giải thích cho mục đích của nó cũng là dễ dàng, nhưng lâu dài, nó sẽ mang lại trải nghiệm tốt hơn, tiết kiệm time, giảm sai sót do hiểu sai, ... cho bạn cũng như những người cùng dùng chung cái code đó đó.

#### Khắc phục:
1. Sử dụng các tool để highlight lại những chỗ code chưa theo convention,...
2. Chú ý đến tính dễ đọc/dễ hiểu hơn là ngắn gọn.


## Thiếu kĩ năng Teamwork
Phần lớn các developer sẽ làm việc theo team chứ ít ai chỉ làm 1 mình trong phần lớn thời gian làm việc, thế nên khả năng phối hợp với nhau để cả team hoạt động trơn tru nhất cũng rất quan trọng. Bên cạnh là 1 lập trình viên, bạn còn là người anh, người em, người bạn của mọi người trong team, hãy cùng nhau hoàn thành tốt công việc của mình.

#### Dấu hiệu:
1. Cứ làm mãi theo 1 kế hoạch định trước dù biết không mang lại hiệu quả.
2. Chỉ làm việc độc lập, không trao đổi liên tục với team: Như đã nói, chúng ta ko làm việc một mình, mà luôn có 1 team, vậy nên hãy trao đổi nhiều hơn, bạn sẽ hạn chế được những thiếu sót ko đáng có trong quá trình làm việc vì miscommunication, và đôi khi đồng nghiệp lại có thể giúp bạn nghĩ ra solution cho vấn đề bạn đang gặp phải đó.
3. Đỗ lỗi: Đôi khi bạn ko muốn nhận là mình đã sai lầm, đôi khi bạn không muốn những kết quả tiêu cực ảnh hưởng đến thành tích của bạn, nên bạn đẩy nó càng xa mình càng tốt, đôi khi là bạn chỉ ko muốn phải chịu trách nhiệm. Tuy nhiên, việc đứng ra chịu trách nhiệm cho vấn đề của bạn/team lại khiến bạn trưởng thành hơn, cũng như nhận được sự đánh giá cao hơn từ mọi người đó.
4.  Không sharing với mọi người những gì mình học được: chia sẻ là cách để chúng ta cùng nhau tiến bộ hơn, đưa team cùng mạnh lên, cũng như là cách để ôn luyện lại những gì mình đã bỏ công sức ra học được.

#### Khắc phục:
1. Trao đổi nhiều hơn với team, trước, trong và sau khi làm task
2. Thoải mái trong việc nhận những ý kiến trái chiều về mình, willing to change.
3. Sharing is key

## Thiếu kĩ năng test, maintain hiệu quả
Để đảm bảo chất lượng code mà mình đưa ra, thì việc test hiệu quả cũng là rất quan trọng

#### Dấu hiệu:
1. Viết test để pass coverage: Bạn thừa biết là nó vô nghĩa, nhưng công việc bắt phải vậy
2. Không chú ý test performance cho các phần quan trọng
3. Không check lại sau khi build/deploy xem có hoạt động bình thường ko
4. Code cả đống rồi đến cuối ngày mới đẩy: có thể bạn tự tin vào những gì mình làm là zerobug, nhưng đa phần các trường hợp là bạn sẽ có khoảng thời gian khó khăn (OT, KH chửi, team chửi, sếp chửi..)

#### Khắc phục:
1. Viết test để đạt được đúng mục đích của nó.
2. Luôn chú ý đến việc test performance
3. Check lại phần của mình sau khi deploy
4. Luôn có kế hoạch hợp lí, để mọi người đều có đủ time hoàn thành việc của mình, và không bị rơi vào thế khó.


-----


*Trên đây là một vài điều mà mình đã tổng kết được, và mình cũng gặp phải đa số trong đó, nên mong rằng nó sẽ giúp được cho bạn trên con đường trở thành "good programmer" nhé!*

Reference:

https://www.getfilecloud.com/blog/10-ways-to-be-a-bad-programmer/

https://javascript.plainenglish.io/signs-that-you-are-a-bad-programmer-dc1c647827d6

https://www.infoworld.com/article/2992566/10-bad-programming-habits-we-secretly-love.html

https://techbeacon.com/app-dev-testing/35-programming-habits-make-your-code-smell
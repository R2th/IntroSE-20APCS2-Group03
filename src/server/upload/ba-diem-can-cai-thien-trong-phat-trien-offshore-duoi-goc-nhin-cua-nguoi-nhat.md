***Lời ngỏ***

*Chắc hẳn khi làm việc với Khách hàng Nhật, chúng ta đều đã hiểu phần nào về phát triển Offshore, sự khác nhau về mặt ngôn ngữ, cách thức truyền đạt, cách hiểu specs...giữa team Offshore và phía Khách hàng.*

*Vậy đã bao giờ các bạn tự hỏi: Người Nhật nghĩ gì về những điều này khi phát triển dự án Offshore?*

*Bài viết dưới đây, mình xin phép dịch từ bài viết gốc [オフショア開発で改善した３つのこと](https://qiita.com/platyceroom/items/1802dcd9b6e9a549cbd0) - dưới góc nhìn của một người Nhật đã đang làm việc với team Offshore Việt Nam.*

*Các bạn thử đọc để xem liệu bên "đối phương" - phía Khách hàng thực sự đang nghĩ như thế nào nhé!*


## Mở đầu
Công ty chúng tôi hiện đang phát triển Offshore liên kết với một Công ty Việt Nam.

Chắc hẳn, đối với những Công ty từng có kinh nghiệm phát triển Offshore thì ít nhiều đều đã cảm nhận được, thực sự không hề dễ dàng để có thể chạy trơn tru hệ thống phát triển này.

Vừa rồi, chúng tôi đã vừa kết thúc một dự án phát triển Offshore.Hướng tới những dự án tiếp theo, tôi đã tổng hợp lại những điều mà tôi nghĩ là nếu làm được thì sẽ tốt hơn.

## Khái lược về dự án phát triển Offshore
### Cấu trúc member phát triển

Trước hết, tôi xin phép tổng hợp lại cấu trúc member trong lần phát triển Offshore vừa rồi.

Trong đó, tôi cũng sẽ mô tả chi tiết về vai trò và số lượng member được assign trong dự án, thông qua đó, giải thích các task phải đối ứng của từng member.

Ngoài ra, trong việc phát triển Offshore, sự khác biệt quốc gia có liên quan rất lớn, nên tôi cũng sẽ ghi ra Quốc tịch của từng member.

* System Engineer x 1 (Nhật)

Quyết định specs, thiết kế hệ thống, tạo tài liệu, test tích hợp.

Định nghĩa requirement với Client, thống nhất nhận thức về specs với BrSE, review code.

* BrSE x 1 (Việt Nam)

Dịch tài liệu từ System Engineer, đối ứng trả lời các Q&A.

Thống nhất nhận thức về specs với System engineer, thông nhất nhận thức về specs với các member phát triển.

* Lập trình viên iOS x 3 (Việt Nam)

Thống nhất nhận thức về specs với BrSE, phát triển app iOS, Unit test, Intergration test

* Lập trình viên Android x 3 (Việt Nam)

Thống nhất nhận thức về specs với BrSE, phát triển app Adroid, Unit test, Intergration test


### Vấn đề gặp phải trong giai đoạn đầu

* Rào cản ngôn ngữ

System engineer và programmer tiếng mẹ đẻ khác nhau, rất khó để System engineer và programmer có thể trao đổi trực tiếp.

* Rất nhiều task nếu không dựa vào BrSE thì không thể triển khai được

Có khuynh hướng bị phụ thuộc vào người có thể nói được ngôn ngữ chung

* Để truyền đạt specs đến programmer phải qua rất nhiều bước

Phải thông qua BrSE để truyền đạt đến programmer

* Khác biệt văn hóa

## Điểm cần cải thiện 1: System engineer (người Nhật) không nên là người trực tiếp đưa ra các chỉ thị cho programmer

Đối với tôi, điểm mấu chốt trong phát triển Offshore chính là vấn đề về ngôn ngữ.

Về cơ bản, chúng tôi đã triệt để sử dụng ngôn ngữ chung, và những member không thể giao tiếp ở level business sẽ không được communicate.

Lý do cho việc triệt để này là để đảm bảo không có sự sai lệch trong nhận thức giữa System engineer và programmer về vấn đề specs.

Tôi đã từng gặp dự án mà system engineer và programmer trực tiếp trao đổi bằng tiếng Anh với nhau mà không phải vì cả hai đều đủ giỏi để làm vậy.Cách viết lệch nhau, cách đọc hiểu lệch nhau, kết quả dẫn đến lack specs chức năng, cuối cùng lại phải nhờ đến BrSE để programmer đối ứng lại...thực sự rất lãng phí.Do vậy, tất cả các trao đổi chúng tôi sẽ thực hiện thông qua BrSE.

Tuy nhiên, việc hoàn toàn thông qua BrSE cũng có những mặt hạn chế.

Nếu triệt để cách làm này thì cứ mỗi khi phát sinh công việc phải nhờ đến BrSE , chi phí communication sẽ tăng lên đáng kể.

Hơn nữa, với dự án mà tôi đã làm thì có đến 6 programmer, trong khi chỉ có 1 BrSE, dẫn đến đôi khi công việc của BrSe bị quá tải.

(...)

Ngoài lề một chút, BrSE - giống như Infrastructure engineer, thường được assign vào nhiều dự án, nên về cơ bản điều quan trọng là phải suy nghĩ xem làm thế nào để giảm tải cho BrSE được.

## Điểm cần cải thiện 2: Phải nắm chắc được skill level của từng Programmer

Trước hết, tôi muốn đặt một câu hỏi cho các bạn đang phát triển Offshore thực tế.

**Bạn có thể kể tên toàn bộ các programmer đang được assign không?**

Đối với câu hỏi này, tôi nghĩ là đại đa số sẽ trả lời là "Tôi không biết" - thực tế lần đầu làm dự án Offshore tôi cũng vậy.

Sự thực là, khi phát triển offshore, System engineer (người Nhật) hầu như không có bất cứ tương tác gì với các programmer, do đó, có thể nghĩ là không cần phải biết thông tin về bất cứ programmer nào.

Tuy nhiên, vì những lý do sau đây, tôi nghĩ rằng việc nắm được những thông tin này là vô cùng quan trọng:

* Mỗi programmer có skill level khác nhau

Vâng, hiển nhiên mỗi người sẽ có mỗi level khác nhau.Cùng một chức năng, có người code trong 1 ngày thì cũng có người phải dùng đến tận 3 ngày.(Trên thực tế, cơ bản các programmer đang phát triển ở Offshore đều có skill level tương đối cao.)

Sự khác nhau về skill level này sẽ gây ảnh hưởng đến effort coding, do đó tôi nghĩ rằng kể cả phía Nhật cũng cần phải nắm được ai đang được assign task gì để có thể kịp thời điều chỉnh resource nếu cần thiết.Hầu hết trường hợp, việc điều chỉnh này sẽ nhờ BrSE xử lý, tuy nhiên, như đã nói lúc trước, effort của BrSE tăng lên thì kết quả cũng sẽ gây ảnh hưởng đến việc phát triển, nên chắc chắn không ổn rồi.

Hơn thế nữa, nếu nắm được skill level của programmer thì đối với những chức năng phức tạp, chúng ta hoàn toàn có thể yêu cầu programmer có skill level cao thực hiện - Ở vị trí system engineer, rõ ràng việc này cũng rất đáng được hoan nghênh.

**Vậy thì, skill level là cái gì? Và làm sao để có thể nắm được?**

Chắc hẳn có rất nhiều người sẽ nghĩ như trên, và câu trả lời là hãy mạnh dạn hỏi BrSE thật nhiều nhé.

*Task này nếu bạn A và bạn B làm thì ai xong sớm hơn?*

*Bạn A đã quen với việc coding sử dụng cái này chưa?*

Bằng những câu hỏi như trên, các bạn hãy hỏi xem nếu assign người này thì sẽ như thế nào, người kia thì sẽ như thế nào...BrSE là người nắm được skill level của programmer, do đó dựa trên những đánh giá của BrSE, chúng ta hoàn toàn có thể lựa chọn được member phù hợp để assign task tương ứng.

## Điểm cần cải thiện 3: Phải nắm được schedule phát triển của programmer

Cơ bản thì phát triển Offshore cũng giống như phát triển từ xa, nên đương nhiên không thể nhìn thấy những gì programmer đang làm.

Nếu cứ tiếp tục phát triển dự án mà không hề biết programmer đang làm cái gì, đang implement chức năng nào hiện tại, chắc chắn có thể phát sinh tình huống có một member nào đó đang không làm gì cả.Với những dự án mà số lượng member phát triển lớn thì tình huống này càng dễ xảy ra, do vậy hãy đảm bảo chúng ta luôn biết programmer đang làm gì nhé.

Dự án vừa rồi, chúng tôi đã sử dụng trello(https://trello.com/) để nắm được programmer nào đang implement chức năng nào.Chúng tôi tạo ra các status: in Progress(進行中), Waiting(対応まち), Complete(完了) và yêu cầu các engineer fill ticket đang đối ứng vào mục in progress (Ticket được ghi bằng tiếng Nhật nên thực tế đã nhờ BrSE update status).

Bằng cách hình dung dạng bảng như này, phía Nhật cũng có thể confirm được hiện trạng của programmer, từ đó đẩy được các ticket đang Waiting sang status khác.

## Kết luận

* Với những trao đổi quan trong, đặc biệt liên quan đến specs, sẽ thông qua BrSE.

* Do gánh nặng cho các BrSE là rất lớn nên phải cố gắng giảm tải gánh nặng này càng nhiều càng tốt.

* Phải nắm được skill level của programmer.

* Phải nắm được task của từng member theo dạng bảng

Tôi sẽ rất vui nếu có thể đưa ra bất kỳ lời khuyên nào cho các engineer cũng đang phát triển Offshore.

Không có cách hiểu nào là đúng nhất trong phương pháp phát triển. Bản thân tôi cũng sẽ thử nhiều cách trong tương lai và hy vọng rằng cùng nhau chúng ta sẽ chọn được cách triển khai dễ dàng nhất.
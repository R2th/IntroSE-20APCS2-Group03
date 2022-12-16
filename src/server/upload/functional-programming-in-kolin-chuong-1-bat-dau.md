# Mở đầu
Mình chuyển sang lập trình từ lúc học, tiếp cận máy tính đến giờ cũng được hơn 2 năm. Nhưng chính thức dấn thân vào **lập trình Android** thì chỉ độ hơn một năm gần đây thôi. Là một thanh niên ngoại đạo mình phải học hỏi và cày khá nhiều. Trong một lần mày mò và học hỏi thêm, mình đã va phải em **Functional Programming**. :scream: Oh no! Em này có rất ít bài viết tiếng việt để đọc, trên các diễn đàn cũng ít có các cuộc tranh luận về ẻm, đa số là so sánh giữa **Object Oriented Programming**(OOP) và **Functional Programming**(FP). Nên mình viết series này đễ dẫn lối anh em đến với con đường tu tiên, trường phái **Functional Programming** :joy::+1:
# Thế giới tu tiên Computer Science
## Hai vị tu tiên cấp độ Hoá Thần Kỳ
 Ở một thế giới **Computer Science** bao la và cao siêu khó lường, có hai cách tiếp cận nguyên lý xử lý tính toán trong computer hay còn gọi là mô hình tính toán :  
*  Một bên là *Turing Machine* của **Alan Turing** (Phát triển 1935 - 1937)
*  Một bên là *Lambda Calculus* của **Alonzo Church** (Phát triển 1928 - 1929)

Hai mô hình này được tao ra để giải bài toán do Nhà toán học người Đức *David Hilbert* tạo ra. Bài toán này được gọi là *bài toán quyết định* (**Decision problem**):
> Liệu có một thuật toán lấy đầu vào là một câu lệnh được viết theo dạng logic và tạo ra một câu trả lời "có" hoặc "không" luôn chính xác?

![](https://images.viblo.asia/aa8bd265-c9c1-47ae-bfd0-d8fb874dc2b6.png)

Nhìn vào thời gian ở trên thì ta thấy là nhà Toán học *Alonzo Church* đưa ra giải pháp cho vấn đề này sớm hơn. Ông phát triển ra một hệ thống biểu thức toán học gọi là giả tích Lambda(**Lambda Calculus**). Giải tích Lambda cơ bản là một hệ thống biểu thức toán sử dụng **hàm số**, ứng dụng hàm số và **đệ quy**.   

Nhà toán học *Alan Turing* thì đề xuất một máy tính giả định gọi là **Turing Machine** cung cấp mô hình tính toán đơn giản hơn nhưng mạnh mẽ.  

Về cơ bản nó tương đương về mặc chức năng với *Giải tích Lambda* về sức mạnh tính toán nhưng kỹ thuật toán học của **Lambda Calculus** của *Alonzo Church* rất khó áp dụng và khó hiểu.  
Cả hai là tiền đề của cái mà ngày nay chúng ta gọi là *Khoa học máy tính* (**Computer Science**) :smiley: Cũng chính là cơ sở lý thuyết hình thành nên hai thái cực trong *mô hình lập trình* (**Programming Paradigm**). :scream: 

## Phương pháp tu luyện
 Vậy *mô hình lập trình* (**Programming Paradigm**) là phương pháp tu luyện gì?

Không có định nghĩa chính thức cho *mô hình lập trình* (**Programming Paradigm**) nhưng mọi người hiểu rằng thuật ngữ này được sử dụng để nói đến một *phong cách lập trình* (**style of programming**). Nó không dùng cho một ngôn ngữ lập trình cụ thể mà nó đề cập đến cách bạn lập trình, cách bạn giải quyết vấn đề (**solve some problem**).

Có nhiều ngôn ngữ lập trình hiện nay nào là **C**, **C++**, **Java**, **C#**, **PHP**, **javascript**,... nhưng tất cả chúng khi xây dựng đều phải chọn lựa cho mình một hoặc vài chiến lược (**strategy**) và chiến lược đó là mô hình lập trình. Tuỳ ngôn ngữ mà sẽ phù hợp với mô hình nhất định. 

## Hai thái cực và các tông phái
 Vậy có bao nhiêu trường phái **Programming Paradigm** ?  
Câu trả lời là có rất nhiều nhưng được gom chung vào hai nhóm chính: 
*  **Declarative Programming** (DP) - *Lập trình khai báo*
*  **Imperative Programming** (IP) - *Lập trình mệnh lệnh*


Với **Lập trình mệnh lệnh**  thứ thường được gắn liền với **OOP** hay gọi là lập trình hướng đối tượng. Còn nhắc đến **Lập trình khai báo** người ta sẽ nhắc đến **FP** **lập trình hướng chức năng** hay còn gọi là **lập trình hàm**.

**Imperative Programming** hay **Declarative Programming** đều được gọi chung là cơ chế hay *mô hình lập trình* (**Programming Paradigm**). Mà cụ thể các bạn xem mô hình tổng hợp quan hệ giữa các cơ chế lập trình trong cuốn ["Programming Paradigms for Dummies: What Every Programmer Should Know"](http://www.cs.albany.edu/~sdc/CSI500/Downloads/ProgrammingParadigmsVanRoyChapter.pdf) của tác giả **Peter Van Roy**  bên dưới:

![](https://images.viblo.asia/f21ed39a-94cb-42e4-aef8-e8e279b2982d.png)
 
## Pháp quyết (Định nghĩa)
> * **Imperative programming**: telling the “machine” **how** to do something, and as a result **what** you want to happen will happen.
> * **Declarative programming**: telling the “machine” **what** you would like to happen, and let the computer figure out **how** to do it.


 Giống như trong bài học ngữ pháp chúng ta cũng có 2 kiểu câu: câu trần thuật (**Declarative Sentence**), và câu mệnh lệnh (**Imperative Sentence**). :grinning:  

Mình để định nghĩa nguyên văn tiếng Anh vì nó vốn quá súc tích, ngắn gọn và rất dễ để nhận ra sự khác biệt. Tuy nhiên hẳn các bạn cũng sẽ thấy từ khóa “**what**”, “**how**” được in đậm ở đây.  

Dịch nôm na **lập trình mệnh lệnh** là bạn bảo máy tính hãy làm việc A, B, C ... X, Y, Z đi. Kết quả thì bạn nghĩ ra trong đầu rồi, giờ là xem máy có trả ra kết quả như bạn muốn không.

Theo mình thì đa số là không :stuck_out_tongue_winking_eye::laughing:, sau khi fix n lần bug thì mới được như ý muốn. Cái này do trí não con người chứ không phải máy tính chạy sai đâu. :rofl::rofl:  

Lập trình theo lối **lập trình mệnh lệnh** là sắp xếp một loạt các mệnh lệnh liên tiếp, để máy tính thực thi tuần tự từng bước. Ở đây người ta tập trung vào "how". Nào, hãy làm thế này, rồi làm thế kia... Một hình thức "cầm tay chỉ việc".

Khác với mô hình **lập trình mệnh lệnh** thì mô hình **lập trình khai báo** được hiểu nôm na là anh em mình sẽ nói cho máy tính biết rằng mình muốn cái gì và sau đó máy tính sẽ tìm cách thực hiện nó cho mình. 

Bạn có thể hình dung là với **Imperative Programming** thì bạn quan tâm tới việc *làm thế nào* (**how**) để giải quyết bài toán còn **Declarative Programming** quan tâm nhiều hơn đến kết quả sẽ cho ra cái gì (**what**). Cụ thể ở đây là đầu vào (**input**) và đầu ra (**output**) của bài toán.

Hai nhóm mô hình trên vốn khá nhiều tông phái và *FP* nằm trong nhóm **Declarative Programming**. *OOP* nằm trong nhóm **Imperative Programming**
# Nhánh phái FP :heart:
##  Tình cờ gia nhập
*Lập trình chức năng* (**Functional programming**) có thể coi là một nhánh con của *lập trình khai báo*, trong *lập trình chức năng* thì chúng ta cũng đưa ra bài toán cho máy tính giải quyết (**cái gì**), nhưng đồng thời cũng đưa ra cách giải quyết (**như thế nào**), chỉ có điều là chúng ta không hề làm bất cứ thứ gì để thay đổi giá trị/trạng thái của các biến.

Mình biết đến **Functional Programming** khi mình làm chung một dự án với một số bạn ở trường Bách Khoa Đà Nẵng. Phải sang 1 tháng sau kết thúc dự án, mình chính thức tìm hiểu sâu về **Functional Programming**. Vậy là trên đường đi khám phá trường phái FP mình gặp rất nhiều tu giả đi theo chung con đường với mình và dành nhiều lời ca ngợi về nó, càng thôi thúc sự tò mò, khát khao khám phá.

Nhưng bạn đọc nên lưu ý, **Functional Programming** chỉ là những con đường tu luyện khác.
Mình nhận thấy việc hiểu rõ được FP là một trong những bước phát triển quan trọng trong sự nghiệp lập trình của mình và cũng là bước khó khăn. Nhưng  sự tò mò, khát khao khám phá nó đang thúc đẩy mình quan tâm đến *lập trình chức năng* (FP) trướng khi đến với **FRP** :rofl::rofl: .

Có vẻ như sự thống trị của lập *trình hướng đối tượng* có thể kết thúc. Trộn lẫn các mô hình đang trở nên phổ biến, thậm chí cần thiết. Trong khi viết code, ta hoàn toàn có thể phối hợp nhiều cơ chế lập trình khác nhau, miễn sao đạt đến kết quả Đúng - Nhanh - Ổn - Đẹp. :heart_eyes::+1: 

 Và ngôn ngữ Kotlin mà mình sắp giới thiệu đây là một ví dụ điển hình. Về điểm này, **Hadi Hariri** có một bài thuyết trình ở GOTO 2018.
 {@embed: https://www.youtube.com/watch?v=eNe5Nokrjdg&t=308s}
 
 Hay video **Functional Programming with Kotlin** của [JetBrainsTV](https://www.youtube.com/channel/UCGp4UBwpTNegd_4nCpuBcow)
 
  {@embed: https://www.youtube.com/watch?v=AhA-Q7MOre0}
  
  Dù sao, từ đó đến nay, khuynh hướng tư duy *lập trình chức năng* vẫn từng bước lan rộng, ảnh hưởng đến thiết kế của rất nhiều chương trình hiện đại. Chỉ cần để ý một chút, chúng ta có thể nhận ra các đặc tính nổi bật của *Functional Programming* xuất hiện trong hầu hết frameworks và các bản cập nhật ngôn ngữ mới. Thậm chí, nếu xét kỹ, những khái niệm thoạt nhìn có vẻ không liên quan như **WebComponent**, **Serverless**, **Microservice**... cũng ẩn hiện tư tưởng FP :heart::heart:.
  
  ##  Sự trổi dậy
Tại sao phải biết tới **Declarative Programming** hay gia nhập nhánh phái **FP**? Nó không phải mới được đề xướng trong những năm gần đây, mà nó đã có từ rất lâu rồi, từ những năm 50 – thời sơ khai của máy tính hiện đại, đầu tiên với ngôn ngữ lập trình Lisp. Bao lâu nay nó vẫn tồn tại song song với **Imperative** mà chúng ta không hề hay biết.

Trong lịch sử công nghệ, có vẻ **OOP** chiếm ưu thế hơn so với **FP**. Bạn cứ thử nhìn xung quanh mình là biết, từ thời tập tành code đã thấy thiên địa tràn ngập quy tắc **OOP** rồi. Các **job description**, các buổi **interview** đều nhắc đến **OOP** như pháp thuật căn bản. Thảo luận kỹ thuật hầu hết xoay quanh mấy khái niệm *Class*, *Object*, *Inheritance*, rồi cao hơn thì *SOLID*, *Polymorphism*, *Encapsulation*...

Nhưng, trên thế giới, từ thời *Lisp* đến *FP*, rồi *Haskell*, *Elixir*, chưa bao giờ thiếu vắng những tu tin giả đi theo con đường **Functional Programming**. Nhất là khoảng sau 2010, không rõ vì sao người ta bắt đầu phàn nàn nhiều hơn về **OOP**, trích dẫn nhiều hơn luận điểm **banana/gorilla** của **Joe Armstrong (2)**, theo đó, chủ đề **FP** bắt đầu nóng dần trở lại.
## Pháp quyết
> **Functional Programming** là phương pháp lập trình lấy function làm đơn vị thao tác cơ bản.

Đúng vậy. FP xét về lý tưởng thì chỉ có function, function và function. Không lệnh gán (**assignment statements**), không cần tới các biến (**variables**), không lưu giữ trạng thái toàn cục (**global state**). Trong FP, chúng ta điều khiển dòng chảy chương trình bằng cách phối hợp các functions lại với nhau. Chúng ta tung hứng các functions qua lại, nhận vào function, nhả ra function, lồng ghép, xâu chuỗi, biến hóa chúng theo mọi cách có thể nghĩ ra.

Đó gọi là không gian "**first-class functions**", nơi lập trình viên đối xử với functions như "**first-class citizens**". Ở đâu functions được coi trọng như vậy, ở đó ta có thể lập trình theo cơ chế FP . JavaScript, Python, Golang, ngay cả PHP chính là như vậy. Java tính từ v8.0 ra mắt năm 2017 cũng là như vậy và giờ Kotlin cũng như vậy :stuck_out_tongue_winking_eye: . Dù không hoàn hảo như Haskell, F#, etc - những tu chân giới vốn được sinh ra cho FP - nhưng ta vẫn có thể tu luyện FP được...

Chỉ có điều phải vận dụng khác một chút, linh hoạt hơn một chút. Đó là lý do tại sao trong các chương trình **JavaScript**, **Python**, **Kotlin**... dù viết theo phong cách FP nhưng vẫn phải dùng đến các biến, lệnh gán để thao tác.

Các tu tin giả ngoại đạo như mình muốn bắt đầu con đường FP cần phải nắm bắt những khái niệm cơ bản như **Immutability**, **Purity**, **Higher-order functions**, **Currying function**, **Function Composition**... Sau khi thăng cấp cảnh giới *Hoá hư kì* thì có thể tìm hiểu **Monad**, **Functor**, **Setoid**, **Idempotent**, **Lens**... và nhiều nữa.  

Chúng ta sẽ không so sánh hay nêu ưu và nhược điểm của nó vì có khá nhiều bài đã viết về nó rồi. Chúng ta sẽ tập trung đi tìm hiểu thực tế nó trong ngôn ngữ **Kotlin**. Giờ mình xin tạm dừng bài viết ở đây, chúng ta nghỉ ngơi ở đây một tí sau đó bài viết sau sẽ tiến hành tu tiên, nhập đạo :grinning:
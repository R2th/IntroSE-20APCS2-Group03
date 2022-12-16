Vừa rồi, dự án mới có vài câu chuyện không mấy vui vẻ về `refactor code` và `deal` chức năng với khách hàng, sực nhớ lại cuộc đời làm dev `outsource` của bản thân, không quá dài, nhưng cũng đủ lâu để nhận ra vài điều. Viết văn không hay, đành tìm trên mạng và *share* lại mấy bài viết tâm đắc, lúc đọc cảm thấy bóng dáng mình trong đó, chia sẻ lại mọi người, hy vọng bạn nhận được chút gì đó, hãy thư giãn và chiêm nghiệm bản thân :D.
# Refactor or not
Trong thời gian làm *dev*, chắc chắn sẽ có lúc bạn sẽ làm việc trên đống *source code* mà những lập trình viên khác đã làm trước đó. Nó có thể đã là một khối *source* khá lớn, một ứng dụng hay một *website* đã được *release*, có thể là *outsource*, hoặc cũng có thể là *product*... và `Có một số bug cần phải sửa, nhưng nó làm đúng điều (chức năng) mà nó phải làm, không gì hơn` - đây là những gì người khác nhìn thấy từ bên ngoài.

Tuy nhiên, góc nhìn từ *source code*, từ lập trình viên thì sao? ta nghĩ gì về phần mềm của mình?

Là một trong những lập trình viên đã / đang xây dựng phần mềm này, bạn sẽ thấy những điều hoàn toàn khác từ bên trong *source code*.

Điều đầu tiên, bạn nghĩ rằng *code base* quá lớn. Bạn chắc chắn rằng phần mềm này có thể được viết với ít *code* hơn mà vẫn cung cấp chức năng tương tự. *Code base* có vẻ rất phức tạp. Bạn biết rằng *code* có thể được viết theo cách tốt hơn, đơn giản hơn và có cấu trúc hơn.

Thêm các tính năng mới hoặc thực hiện một cái gì đó mới luôn là điều khó khăn và đau khổ vì bạn phải xem xét các phần khác được kết nối với nhau như thế nào? Các *module* không được độc lập, linh động, do đó, việc thay đổi mất quá nhiều thời gian. Và tất nhiên, việc *debug*, tìm lỗi và sửa chúng cũng mất nhiều thời gian không kém.

Đắng cay là, bên cạnh việc *code* xấu, *design* tệ, phần mềm lại đang hoạt động tốt và khách hàng đang hài lòng. Bây giờ, bạn như đang ở ngã tư đường. Có hai cách có thể dành cho bạn: 

1. Bạn nên tuân theo câu `ngạn ngữ` kỹ thuật quen thuộc `If it works, don’t fix it.`. 
2. Bạn nên thực hiện một vài tái cấu trúc (`refactoring`) để làm cho công việc dễ dàng hơn trong khi làm việc trên *code base* , để *code* bạn dễ đọc và dễ hiểu hơn.

## Hai mindset của lập trình viên

Lối suy nghĩ đầu tiên, tin vào câu *ngạn ngữ* cũ kĩ : `If it works, don’t fix it - Nếu nó hoạt động, đừng sửa nó`. Đối với họ, *code style* không quan trọng. Họ là những lập trình viên hướng đến kết quả (`result-driven`). *Code* có thể phức tạp, có cấu trúc xấu, hoàn toàn trái ngược với các nguyên tắc lập trình, nhưng họ không quan tâm đến việc *code* đó được viết tốt như thế nào. Họ chỉ quan tâm đến những gì nó làm được.

Vì vậy, đối với những lập trình viên này, việc sửa *code* viết sai là một sự lãng phí thời gian. Nó đang hoạt động, tại sao phải động chạm vào nó? Và bên cạnh đó, có một rủi ro lớn khi gây *side-effect*, các lỗi mới trong khi sửa *code* xấu. *Vậy họ sẽ làm gì*? Rõ ràng, họ có lý lẽ riêng của mình, họ sẽ không chạm vào *code* và tiếp tục theo câu ngạn ngữ đã nói.

Mặt khác, các lập trình viên khác xem mã *code* là tác phẩm nghệ thuật, họ sẽ không thoải mái với tình huống đó. Họ sẽ cảm thấy ghê tởm trong khi đọc *code* viết xấu. Họ sẽ cố gắng sửa từng đoạn *code* trong dự án vì họ quan tâm đến *code style* rất nhiều. Với họ, mọi đoạn *code* trong dự án nên được coi là nghệ thuật.

Họ quá ám ảnh về *code style*. Ngay cả khi các lập trình viên khác viết *code* có cấu trúc tốt, họ sẽ cố gắng thay đổi *code* đó để làm cho nó phù hợp với phong cách của riêng họ. Vì vậy, về cơ bản, họ không theo kiểu `if it works, don’t fix it`. Họ sẽ sửa chữa mọi thứ theo suy nghĩ riêng của họ. Cuối cùng, không quan trọng với họ nếu *code* hoạt động hay không.

## Giải pháp tốt nhất cho bạn
Tìm các phần của *code* mà bạn làm việc thường xuyên và sửa các phần này để làm cho chúng dễ hiểu và dễ đọc hơn. Đừng chạm vào các phần khác nếu chúng hoạt động như mong đợi và chúng không có lỗi. Tạm gọi phần *code* này là phần cốt lõi (*core*).

*Tại sao phần cốt lõi này lại rất quan trọng*? Các phần cốt lõi của phần mềm của bạn là những phần bạn sẽ làm việc nhiều nhất. Bạn sẽ đọc những phần này thường xuyên hơn và sẽ thay đổi chúng thường xuyên hơn những phần còn lại. Nếu có nhu cầu thêm các chức năng bổ sung hoặc thực hiện các tính năng mới, chúng sẽ được kết nối trực tiếp với phần này. Hầu hết các lỗi là từ phần lõi này, điều đó có nghĩa là bạn sẽ dành phần lớn thời gian để gỡ lỗi ở đây. 

Hãy nhớ quy tắc ***80/20*** ([Nguyên tắc Perato](https://en.wikipedia.org/wiki/Pareto_principle#In_computing)), 20% *code* có 80% lỗi. Tìm và sửa chúng!

> 20 percent of the code has 80 percent of the errors.

***Còn những phần khác thì sao?***

Những phần đó là những phần mà bạn sẽ hiếm khi làm việc. Chúng hiếm hoặc không có lỗi. Chúng được viết thậm chí có thể vài tháng hoặc nhiều năm trước và đang hoạt động như mong đợi. Chúng có thể được viết theo một cách xấu xí, mặc dù có thể nên viết theo cách đơn giản hơn, dễ đọc và dễ hiểu hơn, nhưng điều này không có nghĩa là bạn phải sửa chúng. Vì vậy, những phần này có thể giữ nguyên. Quên chúng đi, không cần phải sửa chúng. Bạn có thể dành thời gian làm việc trên những thứ quan trọng hơn.

## Lý do fix phần core lại quan trọng ngay cả khi nó đang hoạt động tốt?

Nếu bạn muốn phục vụ khách hàng của mình trong nhiều năm, bạn nên có một sản phẩm có thể bảo trì. Một sản phẩm có thể bảo trì nghĩa là thực hiện các thay đổi không phải là điều gì quá khó khăn, phức tạp. Gỡ lỗi và sửa lỗi không nên mất quá nhiều thời gian và thêm các tính năng mới cũng nên dễ dàng. Vì vậy, kết quả là các lập trình viên của bạn hạnh phúc và khách hàng của bạn cũng hạnh phúc.
[Martin Fowler](https://martinfowler.com/) đã viết trong cuốn [Refactoring](https://martinfowler.com/books/refactoring.html):
>When you think about programmers, most of us will think that they spend most of their time writing code. Actually, this is quite a small fraction. Programmers spend most of their time reading the code and debugging it. Every programmer can tell a story of a bug that took a whole day (or more) to find. Fixing the bug is usually pretty quick, but finding it is a nightmare.

> Khi nghĩ về các lập trình viên, hầu hết chúng ta nghĩ rằng họ dành phần lớn thời gian để viết code. Thực tế, nó chỉ là 1 phần nhỏ. Họ dành phần lớn thời gian để đọc *code* và *debug* nó, mỗi lập trình viên có thể kể cho bạn một câu chuyện về lỗi họ tốn cả ngày (hoặc hơn) để tìm ra. *Fix* lỗi thường dễ, nhưng tìm lỗi thì thực sự là ác mộng.

Bạn càng viết nhiều *code* tốt, bạn càng dễ hiểu *code*. Và *code* càng dễ hiểu, công việc của bạn càng dễ dàng.

Đó là lý do tại sao không nên tuân theo câu ngạn ngữ `if it works, don’t fix it` cho các phần cốt lõi (*core*) của phần mềm là một quyết định quan trọng bạn có thể đưa ra.

# Skill "Knowing when not to code"
Là một lập trình viên, viết *code* là phần lớn nhất trong công việc của bạn. Trong vòng đời lập trình, đôi lúc bạn sẽ phải đối mặt với nhiều loại yêu cầu khác nhau. Mỗi yêu cầu có buộc bạn phải đưa ra quyết định khó khăn? hay tất cả đều ***OKAY***?

Không có gì sai với điều đó. Đây là những gì mọi người mong đợi từ bạn, với tư cách là một lập trình viên: ***Hãy viết code***. Tuy nhiên, có bao giờ bạn được / tự hỏi: *Bạn có nên viết tất cả các mã code được yêu cầu?* 

Câu hỏi này mang chúng ta đến với một *skill* quan trọng mà một lập trình viên có thể học:
> Knowing when not to code is possibly the most important skill a programmer can learn. — The Art Of Readable Code

*Bạn có thể không đồng ý?*

Vì bản thân lập trình là nghệ thuật giải quyết vấn đề. Thế nên có thể xem lập trình viên là những người giải quyết vấn đề. Là lập trình viên, khi bạn gặp vấn đề mới, bạn sẵn sàng giải quyết, hoặc bất kỳ lý do nào khác cần từ việc bạn *code*, bạn sẽ cảm thấy phấn khích.

Và điều này là bình thường, vì chúng ta là lập trình viên, chúng ta yêu *code*.

Tuy nhiên, quá phấn khích về việc viết *code* khiến chúng ta bị mù quáng. Nó khiến ta bỏ qua một số *sự thật quan trọng* có thể gây ra những vấn đề lớn hơn mà chúng ta sẽ phải giải quyết trong tương lai.

Vậy, những sự thật quan trọng mà chúng ta có xu hướng bỏ qua là gì?

Mỗi dòng *code* bạn viết là:

- *code* phải được đọc và hiểu bởi các lập trình viên khác.
- *code* phải được kiểm tra và gỡ lỗi.
- *code* sẽ làm tăng lỗi trong phần mềm của bạn.
- *code* có thể gây ra các lỗi mới trong tương lai.

Như [Rich Skrenta đã viết](http://www.skrenta.com/2007/05/code_is_our_enemy.html)

> - Code đòi hỏi phải bảo trì định kỳ. Nó có lỗi cần được tìm thấy. Các tính năng mới có nghĩa là *code* cũ phải được điều chỉnh.
>
> - Bạn càng có nhiều *code*, càng có nhiều chỗ để ẩn lỗi. Việc kiểm tra hoặc biên dịch mất nhiều thời gian hơn. Càng mất nhiều thời gian để một *member* mới có thể hiểu về hệ thống của bạn. Nếu bạn phải *refactor code*, có nhiều thứ di chuyển, thay đổi.
>
> - Nhiều *code* thường có nghĩa là giảm tính linh hoạt và chức năng. 
>
> - Để tạo ra nhiều *code* hơn đòi hỏi nhiều người hơn. Có ***n ^ 2*** chi phí liên lạc và tất cả *code* mà họ thêm vào hệ thống, đồng thời mở rộng khả năng của nó, cũng làm tăng cả đống chi phí.

Những điều ở trên rất đúng, phải không? Các lập trình viên truyền cảm hứng cho bạn với năng suất và tâm lý *coding* của họ, là những người biết khi nào nên nói không và khi nào không nên viết code. Phần mềm dễ bảo trì, tồn tại lâu dài và tiếp tục giúp đỡ người dùng là phần mềm không chứa bất kỳ dòng *code* nào không cần thiết.
> The best code is no code at all, and the most effective programmer is the one who knows when not to code.

## Làm thế nào để biết khi nào không nên code?
Bạn hứng thú khi làm việc trong một dự án và suy nghĩ về tất cả các tính năng thú vị mà bạn muốn thực hiện. Nhưng các lập trình viên / khách hàng thường có xu hướng *estimate* quá cao số tính năng mà dự án của họ cần. Nhiều tính năng chưa hoàn thành hoặc chưa sử dụng hoặc đơn giản là làm cho ứng dụng bị quá tải. Bạn nên biết những gì là cần thiết cho dự án của bạn để tránh phạm sai lầm này.
> Hiểu về mục đích phần mềm của bạn và những định nghĩa cốt lõi của nó là bước đầu tiên để biết khi nào không nên *code*.

Ví dụ, ứng dụng của bạn là quản lý *email*, rõ ràng 2 chức năng quan trọng cần có là gởi và nhận *email*. Bạn không thể mong muốn nó quản lý *todo-list* được.

Thế nên bạn `say No` với  bất cứ tính năng nào mà không liên quan đến định nghĩa ứng dụng. Đây là thời điểm bạn có thể biết chắc chắn lúc bạn không *code*.
> Never expand your software’s purpose if not needed.

Một khi bạn biết điều gì là cần thiết cho dự án, bạn sẽ có ý thức vào lần tới khi đánh giá các yêu cầu có thể. Bạn sẽ biết chính xác yêu cầu nên được *code*. Những tính năng nào nên được thực hiện? *Code* nào đáng để viết? Bạn sẽ đặt câu hỏi cho tất cả mọi thứ bởi vì bạn sẽ biết chính xác *code* không cần thiết có thể giết chết dự án.
> Knowing when not to code keeps your codebase small.

Ban đầu, *source code* trông thật đơn giản. Chỉ mất vài giây để biên dịch và chạy. Bạn biết nơi để tìm chính xác những gì bạn đang tìm kiếm.

Về sau, khi dự án phát triển, ngày càng nhiều *source code*, chúng lấp đầy các thư mục. Mỗi *file* chứa hàng trăm dòng *code*. Để tổ chức tất cả, bạn sẽ cần nhiều thư mục (*package*). Ghi nhớ các *function* gọi các *function* khác trở nên khó khăn hơn và theo dõi các *bug* đòi hỏi nhiều công việc hơn một chút. Quản lý dự án của bạn trở nên khó khăn và cần nhiều lập trình viên để giúp đỡ. Chi phí cho việc *communicate* tăng lên khi số lượng lập trình viên tăng lên. Bạn càng ngày càng chậm.

Cuối cùng, dự án trở nên rất lớn. Thêm các tính năng mới thực sự khó khăn và thử thách. Ngay cả những thay đổi nhỏ cũng mất hàng giờ. Sửa lỗi hiện tại luôn có khả năng gây *side-effect*, các lỗi mới. Bạn bắt đầu bỏ lỡ *deadline*.

Hiện tại, cuộc sống của bạn trở nên khó khăn, tại sao?

Vì bạn không biết khi nào không nên *code*, bạn ***YES*** với mọi chức năng được yêu cầu. Bạn mù quáng, *code* những cái mới mà bỏ qua những điều cần thiết.

Có thể nói, biết được khi nào không *code* thực sự khó, thậm chi là với *senior*. Bước vào hành trình *coding*, bạn muốn *code* và cảm thấy hào hứng. Điều đó tốt, cố gắng giữ lấy cảm hứng ấy, nhưng nhớ không bao giờ bỏ qua những điều quan trọng. Chúng ta học từ những sai lầm, bạn cũng vậy, nhưng ít nhất, bạn và tôi có thể có được ý thức từ việc học hỏi từ kinh nghiệm người đi trước.

> Keep coding but know when to say no to coding.

**P/S**: 
> Ở đây, bài học chỉ dừng lại ở chỗ bạn biết được khi nào không nên *code*, nhưng trong thực tế, để thương lượng, đàm phán với khách hàng, *user*, người đưa ra yêu cầu cũng là một chuyện khó khăn. Điều cần thiết ở bạn là kĩ năng đàm phán (**NEGOTIATION**), và cách tốt nhất để đàm phán thành công là đưa ra các lý lẽ, dẫn chứng - những thứ mà trong ngành lập trình, bạn chỉ có thể có được khi bạn có vốn kiến thức vững vàng, đủ rộng.


**References**

https://www.freecodecamp.org/news/advice-to-programmers-if-it-works-dont-fix-it-or/

https://www.freecodecamp.org/news/the-most-important-skill-a-programmer-can-learn-9d410c786baf/
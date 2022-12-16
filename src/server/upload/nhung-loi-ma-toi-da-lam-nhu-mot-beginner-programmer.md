Trước tiên tôi muốn làm rõ ràng một điều. Nếu bạn là một beginner programmer, bài viết này không phải làm cho bạn cảm thấy tồi tệ về những sai lầm mà bạn mắc phải, mà là để bạn, cũng như tôi nhận thức về  nó, nhắc nhở chúng ta nên tránh.
Tôi đã mắc phải những lỗi này và học được nhiều thứ từ mỗi lỗi đó. Tôi rất vui khi có những thói quen coding giúp tôi tránh được những lỗi đã gặp, và tôi nghĩ bạn cũng nên tránh.
Sau đây là những lỗi đó, tuy nhiên nó không được trình bày theo một thứ tự nào.

### 1.  Viết code không có kế hoạch (without planning)
Nói chung, một nội dung có chất lượng cao không dễ dàng được tạo ra. Nó yêu cầu phải suy nghĩ và nghiên cứu thật cẩn thận. Một programs chất lượng cao cũng không ngoại lệ.
Viết programs có chất lượng là một process theo quy trình:
Suy nghĩ. Nghiên cứu. Kế hoạch. Viết. Validate. Modify.
Thật không may, không có từ để viết tắt cho tiến trình này. Bạn cần phải có một thói quen để luôn đi qua đúng số lượng của những hoạt động này.
Một trong những lỗi lớn nhất mà tôi đã gặp đó là bắt đầu viết code mà bỏ qua quá nhiều suy nghĩ và nghiên cứu. Trong khi điều này có thể hoạt động tốt với một phần nhỏ, độc lập, nhưng nó có thể lại ảnh hưởng xấu đến ứng dụng trong trường hợp lớn hơn.
Điều đó giống như bạn cần suy nghĩ trước khi nói bất cứ điều gì mà bạn có thể hối hận, bạn cần suy nghĩ trước khi code bất cứ điều gì làm bạn có thể hối hận. Coding cũng là một cách để chúng ta truyền đạt suy nghĩ của bản thân.

> *When angry, count to 10 before you speak. If very angry, a hundred.
> — Thomas Jefferson.*

Và cũng hãy làm tương tự như khi bạn review code nhé.

Programming chủ yếu là đọc về đoạn code trước đó, nghiên cứu xem những gì cần, và làm thế nào để nó phù hợp với hệ thống hiện tại, và lên kế hoạch viết các tính năng nhỏ, có thể test được. Thực sự thì việc viết dòng code chỉ chiểm khoảng 10% trong toàn bộ quá trình.
Đừng nghĩ rằng programming nghĩa là chỉ viết và viết code. Programming là tạo nên những thứ hữu ích từ những logic cơ bản.

### 2. Lập kế hoạch quá nhiều trước khi bắt đầu viết code
Đúng vậy. Lập kế hoạch trước khi nhảy tới giai đoạn viết code là một điều tốt, tuy nhiên "tốt quá" thì nghĩa là nó đang trở nên tồi tệ, ý tôi ở đây là lên kế hoạch quá nhiều trước khi bắt đầu. Giống như uống nước nhiều là tốt, nhưng quá nhiều nước lại là gây hại cho bạn.
Đừng trông chờ vào một kế hoạch perfect. Điều đó dường như không tồn tại trong thế giới của programming. Chỉ cần một kế hoạch đủ tốt, đó là những thứ bạn sử dụng khi bắt đầu. Thực sự thì kế hoạch của bạn sẽ thay đổi, nhưng điều đó là tốt để ép bạn vào một structure hướng bạn đến sự rõ ràng hơn trong code của mình. Quá nhiều kế hoạch dễ gây ra lãng phí thời gian của bạn.

Tôi chỉ đang nói về kế hoạch cho những features nhỏ. Kế hoạch cho tất cả các features cùng một lúc thì lại nên bị cấm. Đó là những gì chúng ta gọi là Phương pháp Waterfall, đó là hệ thống tuần tự kế hoạch với các bước riêng biệt và được hoàn thành bởi từng người một. Bạn có thể tưởng tượng có bao nhiêu kế hoạch mà cần tiếp cận. Điều đó không phải là loại kế hoạch mà tôi đang nói đến ở đây. Cách tiếp cận waterfall không được hoạt động. Bất cứ điều gì phức tạp chỉ được thực hiện với sự thích ứng với agile vào thực tế.
Việc tạo programs phải là một hoạt động đáp ứng với nhu cầu thực tế. Bạn sẽ thêm các features mà bạn chưa bao giờ nghĩ tới trong waterfall plan. Bạn sẽ xóa bỏ các features bởi lý do là bạn không bao giờ có giai đoạn cân nhắc trong waterfall plan. Bạn cần phải fix bugs và làm cho phù hợp với sự thay đổi. Do đó, bạn cần trở nên agile.

Tuy nhiên, hãy luôn luôn lên kế hoạch các tính năng tiếp theo. Thực hiện chúng thật cẩn thận, bởi vì quá ít kế hoạch hoặc quá nhiều kế hoạch đều ảnh hưởng xấu đến code của bạn, và chất lượng code của bạn không phải là thứ mà bạn có thể mạo hiểm để gặp rủi ro.

### 3. Đánh giá thấp tầm quan trọng của chất lượng code
Nếu bạn chỉ tập trung vào một khía cạnh của đoạn code mà bạn viết, nó phải có tính dễ đọc. Code không rõ ràng là rác. Nó không có tính tái sử dụng.
Đừng bao giờ đánh giá thấp tầm quan trọng của chất lượng code. Nhìn vào code như là một cách giao tiếp với việc thực hiện của code. Công việc chính của một coder là hiểu rõ công việc của code thực thi mà bạn đang tạo nên.

Một câu nói yêu thích của tôi về programming:
> Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.
> — John Woods

*(Tạm dịch: Luôn luôn code như thể có một gã thực hiện việc maintaining code của bạn sẽ là một kẻ bạo lực và hắn biết nơi bạn đang ở - xác định đi)*
Một lời khuyên tuyệt vời, John! :v:  do đó hãy cẩn thận với từng dòng code của mình nhé.
Một điều nhỏ nữa cũng rất quan trọng, đó là coding convention, một cái thụt lề không nhất quán, hay không viết hoa, bạn sẽ dễ dàng mất đi bản quyền dòng code của bạn.
```
tHIS is
  WAY MORE important
than
         you think
```
Thậm chí, với một số ngôn ngữ (như coffee script) cách thụt lề còn quy định scope của block code. 
Một thứ đơn giản khác là viết dòng code quá dài. Những dòng code vượt quá 80 kí tự trở nên khó đọc hơn. Vì vậy nên hạn chế viết những dòng code dài, và tốt nhất đừng để vượt quá 80.

Dưới đây là một số lỗi hay gặp nữa liên quan đến chất lượng của code:
- Sử dụng quá nhiều dòng code trong một function. Bạn nên break code ra, mỗi function chỉ nên đảm nhiệm một vai trò riêng, đừng thực hiện quá nhiều chức năng trong một function.
> *Any function that has more than 10 lines is just too long*

- Đừng dùng phủ định của phủ định (double nagatives) 
> *Using double negatives is just very not not wrong*

- Using short, generic, or type-based variable names. Give your variables descriptive and non-ambiguous names.
- Sử dụng tên biến ngắn, tên chung, hoặc kiểu. Tên biến gợi nhớ và không mơ hồ..
> *There are only two hard things in Computer Science: cache invalidation and naming things.* 
> *— Phil Karlton*
> 
 Tốt nhất thì hãy đặt tên biến sao cho khi nhìn vào biến người khác có thể hiểu ngay được vai trò/ ý nghĩa của nó là gì. Việc đặt tên cho một biến đôi khi cũng khá mất thời gian và đau đầu đấy :smiley: 
Những đoạn hard-coding và các con số không có mô tả. Nếu bạn muốn viêts logic phụ thuộc vào một string hoặc một giá trị number, hãy khai báo dưới dạng constant và đặt cho nó một cái tên tốt, tùy thuộc vào ngôn ngữ cuả bạn mà hãy đặt tên đúng coding convention :v: 

Suy nghĩ rằng  code ngắn hơn là tốt hơn trong hầu hết các trường hợp. Chỉ viết code dài hơn nếu làm làm cho code dễ đọc hơn. Tất nhiên ngắn hơn ở đây còn bao gồm ngắn hơn về thời gian xử lý của code.  Loại bỏ những đoạn code không cần thiết là điều nên thực hiện khi bạn xây dựng bất kỳ chương trình nào.
> *Measuring programming progress by lines of code is like measuring aircraft building progress by weight.* 
 > *- Bill Gates*
 >

 Việc sử dụng quá nhiều các điều kiện logic. Phần lớn các trường hợp bạn hay nghĩ rằng cần điều kiện logic có thể hoàn thành mà không cần có điều kiện đó. Cân nhắc tất cả sự thay thế và lựa chọn dựa trên khả năng đọc. Đừng vội tối ưu performance trừ phi bạn cần đo lường.  Bài viết liên quan [avoid Yoda conditions and assignments within conditionals.](https://en.wikipedia.org/wiki/Yoda_conditions)
 
 ### 4. Lựa chọn ngay giải pháp đầu tiên
 
Khi tôi mới bắt đầu lập trình, tôi nhớ rằng khi tôi gặp phải một vấn đề, tôi cần phải tìm ra giải pháp và ngay lập tức chạy thử nó. Tôi chạy ngay lập tức trước khi nghĩ đến những case phức tạp hơn liên quan đến hệt thống và những nguye hiểm tiềm tàng từ trong giải pháp đầu tiên của tôi.
Trong khi giải pháp đầ tiên có thể là cái bẫy, giải pháp tốt nhất thường xuất hiện khi bạn bắt đầu đặt câu hỏi về các giải pháp bạn vừa tìm thấy. Nếu bạn không thể tìm được nhiều giải pháp hơn có thể bạn đang hiểu chưa đúng hết về vấn đề bạn gặp phải.
Công việc của một lập trình viên chuyên nghiệp như bạn không phải là tìm ra giải pháp cho vấn đề. Đó là tìm giải pháp đơn giản nhất cho vấn đề. Từ "đơn giản" ở đây nghĩa là tìm giải pháp để hoạt động đúng và đầy đủ, nhưng vẫn phải dễ đọc và dễ hiểu.

> *There are two ways of constructing a software design. One way is to make it so simple that there are obviously no deficiencies, and the other way is to make it so complicated that there are no obvious deficiencies.
> — C.A.R. Hoare*
> 

### 5. Không chịu từ bỏ

Một lỗi khác mà tôi gặp phải thường xuyên hơn cả việc tôi quan tâm thừa nhận giải pháp đầu tiên sau khi tôi nhận ra rằng đó không phải giải pháp đơn giản nhất. Đây có lẽ liên quan đến tâm lý không bỏ cuộc. Đó là điều tốt trong hầu hết mọi việc, tuy nhiên "không bỏ cuộc" lại không nên áp dụng cho programming . Trên thực tế, khi bắt đầu lập trình, suy nghĩ đúng đắn nên là chấp nhận fail sớm và fail thường xuyên. Không phải cứ lúc nào cũng khăng khăng theo một cách, điều đó không khác gì đâm đầu vào đá.
Giây phút bạn bắt đầu nghi ngờ một giải pháp, bạn nên cân nhắc bỏ nó đi và suy nghĩ lại vấn đề. Điều này là đúng cho dù bạn đã mất công rất nhiều cho giải pháp đó. Nhờ vào GIT bạn có thể lưu lại code và bắt đầu một giải pháp mới, thử nhiều cách hơn. 
> *Do not be attached to code because of how much effort you put into it. Bad code needs to be discarded.*
> 

### 6. Không chịu sử dụng Google

Đã có nhiều trường hợp tôi lãng phí rất hiều thời gian trước đó để giải quyết một vấn đề, khi tôi vừa mới nghiên cứu trước đó.
Trừ phi bạn đang sử dụng công nghệ cực kì tiên tiền, khi bạn gặp phải một vấn đề, đã có người cũng từng gặp vấn đề tương tự và tìm ra giải pháp cho vấn đề đó. Hãy tiết kiệm thời gian, và hãy nghĩ đến Google đầu tiên.
Đôi khi Google cũng tiết lộ rằng những gì bạn nghĩ là vấn đề thực sự lại không phải, và những gì bạn cần là không phải fix mà là nắm bắt nó. Đừng cho rằng bạn có thể biết tất cả mọi thứ và tự làm được mọi thứ. Google sẽ làm bạn ngạc nhiên đấy.
Tuy nhiên, hãy cẩn thận những gì mà bạn Google. Một dấu hiệu của newbie là sao chép và sử dụng code nhưng không hiểu gì về nó. Trong khi đoạn code đó có thể giải quyết chính xác vấn đề của bạn, bạn đừng bao giờ sử dụng những đoạn code mà mình hoàn toàn không hiểu.
Nếu bạn muốn là một coder sáng tạo, đừng bao giờ nghĩ rằng bạn biết bạn đang làm gì.
> *The most dangerous thought that you can have as a creative person is to think that you know what you’re doing.*
> 
> *— Bret Victor*
> 

### 7. Không sử dụng đóng gói

Điểm này không nói về mô hình  OOP. Việc sử dụng khái niệm đóng gối luôn hữu ích. Không sử dụng đóng gói thường xuyên dẫn tới khó trong việc maintain hệ thống.
Trong một ứng dụng, một chức năng nên được đặt ở một nơi để xử lý nó. Điều này thường có trách nhiệm với từng single object. Object này chỉ nên tiết lộ những trường cần thiết để object khác có thể sử dụng trong ứng dụng. Điều này không phải là bí mật, mà là để giảm sự phụ thuộc giữa các phần khác nhau trong ứng dụng. Việc gắn bó với các quy tắc này cho phép bạn thay đổi một cách an toàn các thuộc tính bên trong các classes, objects, và functions mà không lo lắng việc ảnh hưởng đến các phần khác trên quy mô lớn hơn.

Các khái niệm đơn vị logic và trạng thái nên được có các classes riêng. Với class, tôi muốn nói đến các template chi tiết. Điều này có thể là một class thực sự hoặc một Function object. Bạn có thể xác định nó như là một Module hoặc một Package.
Với một class logic, cần phải có các methods riêng của nó. Các methods chỉ nên thực hiện một chức năng. 

Khi là một beginner, không phải lucs nào cũng có thể tạo một class mới cho một đươn vị khái niệm, và tôi thường xuyeen failed trong việc xác định cái gì chưá bên trong một đối tượng. Nếu bạn tạo một thay đổi đơn giản và thay đổi đó có tác động đến nhiều nơi trên hệ thống nằm ngoài mong muốn của bạn, đó là dấu hiệu của một newbie.

Trước khi thêm một  method vào một class hoặc thêm vào nhều responsiblities vào một method, hãy suy nghĩ và đặt câu hỏi. Bạn cần thêm thời gian ở đây. Đừng bỏ qua nó và nghĩ rằng mình sẽ refactor sau. Hãy làm điều đó ngay, refactor xong thì mới là xong một task.

### 8. Lên kế hoạch cho những gì bạn chưa biết

Nó thường xuyên vượt xa khỏi những giải pháp mà bạn đang viết. Tất cả những gì sẽ đi vào đầu bạn với những gì bạn viết. Đó là một điều tốt cho các test cases, nhưng nó có thể sai để sử dụng cho các nhu cầu tiềm năng.
Bạn nên xác định cho hai loại chính không thuộc sở hữu của bạn. Đừng viết code cho những gì mà hôm nay chưa cần. Đừng lên kế hoạch cho một tương lai mà bạn không biết trước.
Viết một tính năng vì bạn nghĩ rằng bạn có thể cần trong tương lai đơn giản là sai. Đừng làm điều đó.
Luôn viết với số lượng code tối thiểu mà bạn cần để giải quyết vấn đề hôm nay. Handle các cases hiện có, đừng thêm các tính năng thừa thải.
> *Growth for the sake of growth is the ideology of the cancer cell.*
> 
> *— Edward Abbey*
> 

### 9. Không sử dụng cấu trúc dữ liệu đúng

Khi chuẩn bị cho các cuộc phỏng vấn, các beginner programmers thường tập trung quá nhiều vào các thuật toán. Tốt nhất là xác định các thuật toán tốt và khi nào sử dụng chúng, nhưng ghi nhớ chúng có thể không bao giờ làm bạn thành thiên tài.
Tuy nhiên, việc ghi nhớ các điểm mạnh, điểm yếu của các data structures khác nhau mà bạn có thể sử dụng trong ngôn ngữ bạn dùng chắc chắn làm bạn trở thành developer tốt hơn.

Sử dụng sai data structure là một dấu hiệu cảnh báo đây là code của newbie.
Câu chuyện sau không có ý dạy bạn về data structuré nhưng cho phép tôi nhắc đến hai ví dụ nhỏ:
**Sử dụng list(array) thay vì map (object) để quản lý các record**

Sai lầm phổ biến nhất có thể là việc sử dụng lists thay vì dùng maps để quản lí một list records. Vâng, để quản lý một LIST records bạn nên sử dụng MAP.
Lưu ý rằng tôi đang nói về một list records ở đây nơi mà mỗi record có một định danh để được tra cứu lại. Sử dụng lists cho các giá trị vô hướng thì ok và thường là sự lựa chọn tốt hơn đặc biệt nếu mục đích sử dụng là "pushing" giá trị vào list.

Trong Javascript, list structure phổ biến nhất là một array và map structure là mootjobject (cũng là map structure trong Javascript mới nhất).
Sử dụng lists thay cho maps để quản lý records thường là sai. Mặc dù điều này chỉ thực sự đúng với bộ dữ liệu lớn, tôi thường nói rằng thường dùng nó trong tất cả các trường hợp. Lý do chính và quan trọng là khi tìm kiếm dựa vào định danh (identifier) của maps nhanh hơn so với lists.

**Không sử dụng stack**

Khi viết một vài đoạn code yêu cầu một số dạng đệ quy, nó luôn luôn cám dỗ để dùng các hàm đệ quy đơn giản. Tuy nhiên, thường khó để có thể tối ưu các code đệ quy, đặc biệt trong môi trường single-thread.
Tối ưu code đệ quy phụ thuộc vào hàm đệ quy trả về. Ví dụ, tối ưu hàm đệ quy trả về 2 hoặc nhiều lần gọi đến chính nó khó hơn việc tối ưu hàm đệ quy trả về việc gọi đến chính nó một lần.

Những gì chúng ta có xu hướng bỏ qua như là người mới bắt đầu là có một sự thay thế cho việc sử dụng các hàm đệ quy. Bạn chỉ có thể sử dụng một cấu trúc Stack. Push functions gọi đến một Stack mình và bắt đầu popping chúng ra khi bạn đã sẵn sàng để vượt qua các calls back.

### 10. Làm code hiện taị tệ hơn

Tưởng tượng code hiện tại của bạn lộn xộn như căn phòng này:

![alt](https://cdn-images-1.medium.com/max/800/1*T6gU2PGfqll9h1zT6ApTUA.png)

Sau đó bạn được yêu cầu thêm một mục vào phòng đó. Vì nó đang quá lộn xộn rồi, bạn có thể bị cám dỗ để đưa nó vào bất cứ đâu. Bạn có thể thực hiện công việc của mình trong vài giây.
Đừng làm điều đó với một đống code lộn xộn. Đừng làm nó thêm tồi tệ. Luôn để đoạn code sạch hơn khi bạn bắt đầu làm việc với nó.

Điều đúng để làm cho căn phòng ở trên là để làm sạch những gì cần thiết để đặt những thứ mới ở đúng nơi. Ví dụ: Nếu thứ cần thêm là quần áo cần được đặt trong tủ quần áo, bạn phải dọn dẹp đường đến tủ đó. Đó là một phần công việc của bạn.
Dưới đây là một số điều làm cho code trở nên rối rắm và bẩn hơn hiện tại:

- **Duplicating code**. Nếu bạn copy/paste một phần code chỉ để thay đổi một dòng sau đó, bạ đơn giản là đang duplicating code và làm nó trở nên hỗn độn hơn. Trong bối cảnh của căn phòng lộn xộn ở ví dụ trên,  điều này giống như việc giới thiệu một chiếc ghế khác có đế thấp hơn thay vì đầu tư vào chiếc ghế mới có thể điều chỉnh độ cao. Luôn luôn giữ khái niệm trừu tượng trong tâm trí của bạn và sử dụng nó khi bạn có thể.

- **Không sử dụng các files configuration**. Nếu bạn cần sử dụng một giá trị có thể có khả năng khác nhau trong các môi trường khác nhau hoặc vào các thời điểm khác nhau, giá trị đó thuộc về một file config. Nếu bạn cần sử dụng một giá trị ở nhiều nơi trong code của bạn, giá trị đó thuộc về một file config. Chỉ cần tự hỏi mình câu hỏi này mọi lúc khi bạn giới thiệu một giá trị mới cho code: giá trị này thuộc về một file config? Câu trả lời sẽ rất có thể là có.

- **Sử dụng câu lệnh có điều kiện không cần thiết và các biến tạm thời**. Mỗi câu lệnh if là một nhánh logic cần phải có ít nhất hai lần test. Khi bạn có thể tránh các điều kiện mà không làm mất khả năng đọc, bạn nên làm. Vấn đề chính với việc này là mở rộng một chức năng với logic nhánh thay vì đưa ra một hàm khác. Mỗi khi bạn nghĩ rằng bạn cần một câu lệnh if hoặc một biến chức năng mới, bạn nên tự hỏi mình: Tôi đang thay đổi code ở mức phù hợp hay tôi nên suy nghĩ về vấn đề ở cấp độ cao hơn?

### 12. Không viết tests

Tôi sẽ nói điều này đơn giản thôi. Nếu bạn nghĩ rằng bạn là một  chuyên gia lập trình và suy nghĩ đó mang lại cho bạn sự tự tin để viết code mà không cần test, bạn là một newbie trong bài viết của tôi. 

Nếu bạn không viết test cho  code, bạn rất có thể test chương trình của bạn theo cách khác, bằng tay. Nếu bạn đang xây dựng một ứng dụng web, bạn sẽ được làm mới và tương tác với ứng dụng sau mỗi vài dòng code.Tôi cũng làm thế. Điều đó không có gì sai khi test code của bạn bằng tay. Tuy nhiên, bạn nên test code của mình một cách tự động. Nếu bạn test thành công một tương tác với ứng dụng của mình, bạn nên trở lại trình soạn thảo mã và viết mã để tự động thực hiện tương tác chính xác giống nhau trong lần tiếp theo bạn thêm code vào dự án.

Bạn là một con người. Bạn sẽ quên để test tất cả các xác nhận thành công trước đây sau mỗi lần thay đổi code. Hãy để máy tính làm điều đó cho bạn!
Nếu có thể, hãy bắt đầu bằng cách đoán hoặc thiết kế các xác nhận tính hợp lệ ngay cả trước khi bạn viết code để thỏa mãn chúng. Thử nghiệm theo định hướng phát triển (TDD) không chỉ là một số cường điệu ưa thích. Nó ảnh hưởng tích cực đến cách suy nghĩ của bạn về các tính năng của bạn và làm thế nào để tìm ra một thiết kế tốt hơn cho chúng.
TDD không dành cho tất cả mọi người và nó không hoạt động tốt cho mọi dự án, nhưng nếu bạn có thể sử dụng nó (thậm chí là một phần), bạn hoàn toàn nên làm như vậy.

Cám ơn các bạn, bài viết được dịch từ [The Mistakes I Made As a Beginner Programmer](https://medium.com/@samerbuna/the-mistakes-i-made-as-a-beginner-programmer-ac8b3e54c312)
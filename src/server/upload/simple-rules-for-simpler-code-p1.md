## Giới thiệu . 
- Gần đây mình động chạm đến vấn đề, là làm cách nào đơn giản code mình đã viết hay không. Làm sao để nó càng đơn giản càng tốt, càng dễ hiểu càng tốt... chứ không phải càng cao siêu càng tốt hay hiệu xuất càng nhanh càng tốt. 

- Giữa hai hoặc nhiều vấn đề, hiệu xuất hoạt động, đơn giản, dễ hiểu, thì từ việc đơn giản code mình viết, nó sẽ làm cho việc đọc code dễ hiểu hơn, và nếu code đơn giản đến mức tối giản, thì hiệu xuất nó cũng chỉ có thể như vậy và không thể cải thiện thêm nữa. Mọi việc diễn ra luôn có thể xuất phát từ việc, làm sao để mình có thể viết code một cách đơn giản nhất có thể. 
- Động tới vấn đề này, thì hai cuốn sách đáng được đọc, và nên đọc là "The Art of Readable Code" và "Clean Code". Cũng may là có thể đọc một số chương bằng tiếng việt qua tác giả [MinhNV](https://viblo.asia/u/minhnv), bạn này có đã đọc và dịch một số chương trong cuốn "Clean Code", tiếc là cuốn sách này bạn ấy dịch chưa hoàn thành, và một số chương bị nhảy chương. Nhưng cũng đáng để đọc và upvote cho tác giả về những cố gắng đó. 

## Viết code đơn giản hơn - Khởi điểm từ một bài hướng dẫn.
- Việc đưa mình đến vấn đề làm sao để viết code càng đơn giản càng tốt, là một bài hướng dẫn về  "[các nguyên tắc để viết code đơn giản hơn](https://laracasts.com/series/simple-rules-for-simpler-code)", tác giả đề cập đến một số nguyên tắc để viết code đơn giản hơn. Tuy nhiên, bài giảng chỉ mang tính chất tham khảo là chính, vì theo mình, một số nguyên tắc này không dễ áp dụng và mất khá nhiều thời gian, cũng đòi hỏi phải là quá trình dài luôn luôn đặt cho mình câu hỏi: "Code của mình có thể cải thiện hơn cho nó đơn giản hơn hay không", và sau đó tái cấu trúc lại code... Mình sẽ tóm tắt một số nguyên tắc mà tác giả của bài giảng đã đề cập đến.

### Nguyên tắc 1: Tránh viết tắt. 

- Bằng việc đưa ra một số ví dụ về cách đặt tên viết tắt ví dụ:
```
$tranl = a; // translator;
$cc = b; // clean code ;
```
sẽ có thể gây khó hiểu hơn cho code đang viết nếu không có comment (mà comment thì mình thêm vào). 

Việc đặt tên biến (variable), hàm (function), **class**, **function**, ...mọi thứ cần được đặt tên mang tính gợi nhớ là một nguyên tắc chung và là nguyên tắc đơn giản và dễ nhớ, có thể áp dụng, và áp dụng nhiều nhất trong cách làm sao để viết code đơn giản và dễ hiểu.

Nhưng bài toán giữa độ dài của tên và mức độ gợi nhớ của nó cần được cân đối, và cũng là bài toán khó cân đối nhất trong khi đặt tên mang tính gợi nhớ. Nhất là đối với những người không có nhiều vốn từ vựng. Viết sao cho tên biến không dài từ địa đầu tổ quốc đến điểm cuối của tổ quốc, mà vẫn mang tính gợi nhớ, thì cần mọi người luyện tập trong thời gian dài. Với coder, việc code, và việc thực hiện rèn luyện này trong quá trình code gần như là một quá trình tự nhiên cần có, để có thể tiến bộ hơn.

Trong hai cực của vấn đề đặt tên mang tính gợi nhớ, thì việc **cố gắng** ưu tiên *có tính gợi nhớ*, đôi khi chúng ta sẽ chấp nhận một cái tên hơi dài một chút. Nhưng theo quan điểm của mình điều đó là ổn. 

### Nguyên tắc 2: Đừng dùng "Else"

- Trong cấu trúc điều khiển logic thông thường, thì if-else là câu điều kiện đơn giản, dễ hiểu và dường như ngôn ngữ nào cũng cung cấp cấu trúc để thực hiện cấu trúc điều khiển if-else này.
- Việc **đừng dùng else** ở đây nên được hiểu như sau:
  ```
   // Logic thông thường, ta sẽ có cấu trúc điều khiển điều kiện kiểu như sau: 
   if (điều kiện đúng) { // Nếu điều kiện này đúng
        // thực hiện khối lệnh này 
   } else if (điều kiện đúng thứ hai) { // Nếu điều kiện này đúng
       // thực hiện khối lệnh này
   } else { // Nếu không thực hiện khối lệnh này. 
   }
   ```
    Theo logic thông thường, thì khối lệnh **if-else-if-else** là không có gì sai, nó mang tính **tự nhiên** cao. Nhưng nếu chú ý một chút, thì thấy ngay rằng, nếu điều kiện trong **if** mà không đúng thì sẽ thực hiện việc thực hiện khối lệnh else. Như vậy, ta có thể bỏ else thì code sẽ trở lên đơn giản hơn, mà hoạt động vẫn đúng.
    ```
    if <điều kiện đúng> {
         // thực hiện lệnh
     }
     // thực hiện các lệnh nếu điều kiện không đúng.
    ```
    Bằng cách giản lược các khối lệnh else, chúng ta sẽ thực hiện việc làm cho code của chúng ta đơn giản hơn. Đơn giản ở đây không phải là việc số dòng code ít, mà đơn giản ở mức đọc hiểu, và logic vẫn hoàn toàn tự nhiên.
    :warning: chú ý, điều này chỉ làm được khi mà trong khối lệnh của **if** có lệnh return. Nếu không có return, thì logic cần phải xem xét kỹ lại, trước khi giản lược **else** tránh thay đổi giá trị của biến trong một số trường hợp.

    Một số nguyên tắc ngoài lề với if-else
    - Tránh sử dụng phủ định trong điều kiện if. Hiểu nôm na là nếu sử dụng **if (! false) {}** thì hãy cố gắng tái cấu trúc lại code để không phải sử dụng như vậy. 
    - Tránh sử dụng các **if** lồng nhau quá nhiều (nếu nhiều if hãy cân nhắc sử dụng cấu trúc switch-case nếu có thể) 
    - Và nguyên tắc được đề cập ở đây, nếu bỏ được **else** thì hãy bỏ **else** đi. 
### Nguyên tắc 3: Chỉ thụt đầu dòng 1 lần (One Level of Indentation)
- Điều này hiểu nôm na là hạn chế các cấu trúc điều khiển lồng nhau.
    Ví dụ: 
    ```
    if <điều kiện đúng a> {
        // thụt đầu dòng lần 1
        if <điều kiện đúng b> {
             // thụt đầu dòng lần 2
             if <điệu kiện đúng c> {
                 // thụt đầu dòng lần 3
             }
        }
    }
    ```
    Thay vì cấu trúc trên, ta có thể là như sau:
    ```
    if <điều kiện đúng a> và < điều kiện đúng b> và <điều kiện đúng c> {
        // thực hiện khối lệnh ở thụt đầu dòng lần 3
    }
    
    if <điều kiện đúng a> và <điều kiện đúng b> {
        // thực hiện khối lệnh ở thụt đầu dòng lần 2
    }
    
    if <điều kiện đúng a> {
        // thực hiện khối lệnh ở thụt đầu dòng lần 1
    }
    ```
    Nếu thực hiện được nguyên tắc này, code chúng ta sẽ trở lên đơn giản hơn, dễ đọc hơn, dễ hiểu hơn.
    
    Nhưng thực tế, để làm được nguyên tắc này, không đơn giản như ví dụ mình đưa ra. Nhiều đoạn code, hay cấu trúc code, để có thể thực hiện chỉ **thụt đầu dòng 1 lần**, thì đòi hỏi phải có nền tảng kỹ thuật tốt, có tư duy, và đôi khi cần cả sự tinh tế cần thiết nữa.
    
    Cần kiên trì, và chú ý thực hiện điều này trong code của mình, thì việc này sẽ trở thành thói quen, và cải thiện đáng kể chất lượng các dòng code mà mình viết ra. Tuy nhiên, bạn không thể quá chăm chú vào code làm sao cho đẹp, cho dễ hiểu nếu bị deadline ngồi trên vai và chỉ đạo bạn code. :).
    
    Hãy thực hiện việc **refactor code** khi có thời gian rảnh, và cố gắng tối ưu hóa code ngay từ lúc bắt đầu viết.

### Nguyên tắc 4: Hạn chế  các thể hiện của biến ( Limit Your Instance Variables)
- Nguyên tắc này chúng ta thường gặp nhất trong cấu trúc injection và microservices. Thường thường, chúng ta hay gặp một class như sau
    ```php
    class ExampleController
    {
        protected $userService;
        protected $payService;
        protected $learnService;

        public function __contruct(
            UserService $userService,
            PayService $payService,
            LearnService $learnService
        ) {
            // thực hiện việc gán ở đây
        }
    }
    ```
- Các class như vậy, thường được inject rất nhiều các thành phần khác nhau, dẫn đến việc các phần **thêm vào** sẽ càng ngày càng nhiều, có đôi khi danh sách các phần **thêm vào** sẽ dài cả cái màn hình đang code của bạn. Đó thực sự là một điều nghe có vẻ **hơi có mùi**.

- Giải pháp mà tác giả đưa ra, là hãy tách nhau class Controller trong ví dụ (cũng có thể hiểu là các class có kích thước quá lớn) thành các class nhỏ hơn, và thực hiện việc **thêm vào** các thành phần một cách từ từ. Về bản chất, thì kết quả của cả một quá trình to như vậy thì vẫn là một khối to như cũ, nhưng ít ra, các thành phần được phần chia ra rõ ràng, và nó không phải là một **mớ bòng bong**.

 Lời khuyên được đưa ra, là mỗi class, chỉ nên có 2 cái **thêm vào**, để cho code nó đơn giản hơn. Nhưng nói chung đề cập là vậy, còn thực tế, thì nó cũng là một điều không dễ để thực hiện. 

### Nguyên tắc 5: Gói các kiểu nguyên thủy (Wrap Primitives)
- Nguyên tắc này theo mình hiểu là sẽ đóng gói các số hay các chuỗi thành một class để đặt tên mang tính gợi nhớ hơn.

  Mục đích chính của nó là tăng khả năng đọc-hiểu của code. Mà trong bài giảng, nó diễn giải nhiều lắm, và mình không hiểu hết. Nguyên tắc này và việc thực hiện, cũng giống như việc đặt tên các hằng số mang tính gợi nhớ. 

  Ví dụ các giá trị cố định, không thay đổi, thì nên để vào hằng, để gợi nhớ giá trị đó, và khi sửa chỉ cần sửa một nơi thôi. Còn khi các giá trị thay đổi, thì đóng gói nó vào một class. 
  
## Nguồn tham khảo: 
- [Bài giảng một số nguyên tắc để code đơn giản hơn](https://laracasts.com/series/simple-rules-for-simpler-code)
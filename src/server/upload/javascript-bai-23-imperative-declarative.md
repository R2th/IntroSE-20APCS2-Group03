Nhóm nội dung cuối cùng trong `Sub-Series JavaScript` của chúng ta là thảo luận về các mô hình lập trình `Programming Paradigm` phổ biến - hay có thể hiểu nôm na là các phương thức tư duy tổng quan khi lập trình phần mềm. Nếu như bạn thử Google với từ khóa `programming paradigms` thì chắc chắn là bạn sẽ được giới thiệu tới liên kết gần nhất là Wikipedia với một danh sách các `paradigm` rất dài. Tuy nhiên chúng ta sẽ chỉ cần quan tâm tới một vài mô hình lập trình phổ biến nhất.

Và ở đây, trong bài viết này, chúng ta sẽ khởi đầu với 2 mô hình lập trình `Imperative Programming` và `Declarative Programming` - tạm dịch là `tư duy lập trình tuần tự` và `tư duy lập trình định nghĩa`. Trên thực tế thì nếu như bạn Google Translate từ `imperative` sẽ có ý nghĩa là `mệnh lệnh`, còn `declarative` sẽ được dịch là `khai báo`. Bạn có thể tạm giữ một chút băn khoăn về phần dịch nghĩa này và tự chọn lựa cái nào phù hợp với cách hiểu của bạn sau khi chúng ta thảo luận xong. :D

## Tại sao chúng ta nên tìm hiểu về các mô hình lập trình?

Bởi vì việc vông việc lập trình nói chung về cơ bản là truyền tải tiến trình logic trong tâm trí của chúng ta trở thành một giải pháp phần mềm trong máy tính; Do đó yếu tố căn bản nhất và có ảnh hưởng nhiều nhất đến tiến trình tạo ra phần mềm - là phương thức tư duy mà chúng ta lựa chọn để chuyển tải ý tưởng thành code. Nếu như chúng ta có thể nhìn một vấn đề theo nhiều khía cạnh khác nhau, thì điều đó cũng có nghĩa là chúng ta sẽ có nhiều lựa chọn hơn ở mỗi thời điểm.

Hiển nhiên là sẽ không có thứ gì thực sự là tốt nhất trong mọi tình huống. Tuy nhiên ứng với mỗi trường hợp cụ thể, chúng ta sẽ có thể chọn ra được những cách thức phù hợp nhất để chuyển tải ý tưởng của mình thành những đoạn code.

> Khả năng thay đổi tư duy và cách thức nhìn nhận vấn đề thực sự đáng giá hơn rất nhiều so với điểm số IQ.  
>*_Alan Kay*

Và hơn thế nữa, mỗi một mô hình lập trình cũng giống như mỗi một khái niệm khác mà chúng ta đã được biết - đều được gắn liền với cuộc sống thường nhật của chúng ta. Bởi tất cả chỉ là một - cách thức mà logic trong tâm trí của chúng ta được thể hiện vào trong code cũng là những dạng thức `pattern` mà tâm trí tự nó đưa ra những nhận định, phân tích về môi trường sống xung quanh. Đâu đó, có lẽ việc tìm hiểu về các mô hình lập trình cũng sẽ giúp cho chúng ta hiểu được phần nào về cách thức mà ơn trên sắp xếp và xoay vần dòng chảy cuộc sống.

## Nếu vậy có nghĩa là chúng ta đã và đang sử dụng các mô hình này từ trước đến giờ mà không biết?

Đúng là như vậy. Mỗi một mô hình lập trình, nếu như được hiểu theo một cách khác thì chỉ đơn giản là một khía cạnh tư duy hay nền móng tư duy để viết ra một đoạn code; và nếu ở trên một bình diện lớn hơn thì là để cấu trúc nên một phần mềm. Việc tìm hiểu các mô hình lập trình về cơ bản không phải là học những kiến thức mới, mà là nhận diện và đặt tên cho những thứ mà chúng ta đã biết; Và sau đó chúng ta sẽ có thể nhìn nhận một tác vụ cần thực hiện trong phần mềm một cách rành mạch hơn. Bây giờ thì chúng ta hãy bắt đầu thôi. :D

## Tuần Tự & Định Nghĩa

`Imperative Programming` có thể hiểu nôm na là khi chúng ta nhìn nhận một chương trình là một tuần tự các câu lệnh chỉ dẫn cho máy tính việc cần làm là gì? - hay trình tự các bước để thực hiện một công việc `như thế nào?`

Trong khi đó `Declarative Programming` ở một khía cạnh khác lại là câu chuyện - chúng ta cần phải định nghĩa hay giải thích cho máy tính hiểu được mục tiêu hay kết quả mà chúng ta đang hướng đến `là cái gì?`

Chúng ta sẽ thử lấy một ví dụ đơn giản về một hàm tính tổng một mảng số nguyên bất kỳ; Và trước tiên sẽ là lối tư duy tuần tự `imperative` -

```imperative.js
var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function sumArray(arr) {
   var total = 0;
   
   for (var num of arr) {
      total += num;
   }
   
   return total;
} // sumArray

console.log( sumArray(numberArray) );
// 45
```

Trong code ví dụ ở trên thì chúng ta đã chỉ ra cho máy tính tuần tự công việc được thực hiện như sau -

- Khởi tạo một cái hộp rỗng `total` giả định là tổng xuất phát ban đầu là `0`.
- Sau đó tìm tới mảng `arr` để lấy ra phần tử đầu tiên và cộng gộp vào `total`
- Sau đó lại tiếp tục lấy ra phần tử thứ hai, thứ ba... và cộng gộp dần dần vào `total`
- Tới khi cộng gộp xong lần lượt tất các phần tử vào `total` thì có nghĩa là chúng ta đã thu được tổng cần tính.

Và code ví dụ dưới đây là ở một khía cạnh tư duy khác - `declarative`, khi chúng ta suy nghĩ về việc giải thích cho máy tính hiểu tổng mà chúng ta cần tính `là cái gì?` -

```declarative.js
let numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const sumOf = function(arr) {
   let [first, ...rest] = arr
   // - - - - - - - - -
   if (arr.length == 0)    return 0;
   if ('any-other-case')   return first + sumOf(rest);
}; // sumOf

console.log( sumOf(numberArray) );
// 45
```

Tổng `sumOf` của một mảng `arr` có thể hiểu đơn giản là - giá trị của phần tử đầu tiên `first` đem cộng gộp với tổng `sumOf` của mảng con `rest` chứa tất cả các phần tử còn lại. Định nghĩa này hiển nhiên là đúng và chúng ta thấy rất rõ ràng và dễ hiểu. Cụ thể là tổng của mảng `[1 -> 9]` thì hiển nhiên là `1` cộng với tổng của mảng `[2 -> 9]`.

Tuy nhiên định nghĩa đó vẫn chưa đầy đủ và phù hợp cho mọi tình huống. Cụ thể là khi mảng `arr` không có phần tử nào thì chúng ta sẽ không thể nói như vậy được. Do đó chúng ta cần phải bổ sung vào định nghĩa này thêm một chút để đảm bảo trong trường hợp nào thì máy tính cũng sẽ không gặp khó.

Tổng `sumOf` của một mảng `arr` còn có thể là `0` trong trường hợp mảng `arr` không có phần tử nào cả. 

Sau khi đã bổ sung định nghĩa xong kín kẽ rồi thì công việc tính toán là của máy tính thôi, chúng ta không cần phải bận tâm tới nữa. :D

Trích đoạn bài viết [[JavaScript] Bài 11 - Hàm & Vùng](https://viblo.asia/p/63vKjAaR52R) -

```conversation.txt
[ Máy tính ] "Tổng của mảng [1, 2, 3, 4, 5, 6, 7, 8, 9] là gì?"
[Người dùng] "Ủa, tưởng giỏi tính toán hơn tôi. Sao hỏi kỳ thế?"
[ Máy tính ] "Tôi giỏi tính toán chứ không giỏi tiếng Việt.  
              Tổng đấy là cái gì thế?"
[Người dùng] "Ừ thì là: 1 + tổng của mảng [2, 3, 4, 5, 6, 7, 8, 9]"
[ Máy tính ] "Ok, đó là bước 1. Cái đoạn `1 +` thì tôi biết rồi.  
              Nhưng tổng của mảng còn lại là cái gì?"
[Người dùng] "Ừ thì là: 2 + tổng của mảng [3, 4, 5, 6, 7, 8, 9]"
[ Máy tính ] "Ok, đó là bước 2. Cái đoạn `2 +` thì tôi biết rồi.  
              Nhưng tổng của mảng còn lại là cái gì?"
[Người dùng] "Ừ thì là: 3 + tổng của mảng [4, 5, 6, 7, 8, 9]"
. . .
. . .
[ Máy tính ] "Ok, đó là bước 8. Cái đoạn `8 +` thì tôi biết rồi.  
              Nhưng tổng của mảng còn lại là cái gì?"
[Người dùng] "Ừ thì là: 9 + tổng của mảng []"
[ Máy tính ] "Ok, đó là bước 9.  Cái đoạn `9 +` thì tôi biết rồi.
              Nhưng tổng của mảng [] là cái gì?"
[Người dùng] "Là 0. Có gì đâu để mà tính. Thế ra kết quả chưa?"

[ Máy tính ] "Từ từ để tôi quay lại bước 9 đã... Tổng là 9."
[Người dùng] "Tôi đang hỏi cái tổng của mảng ban đầu. =,="
[ Máy tính ] "Từ từ để tôi quay lại bước 8 đã... Tổng là 17."
[Người dùng] "Tôi đang hỏi cái tổng của mảng ban đầu. =,="
. . .
. . .
[ Máy tính ] "Từ từ để tôi quay lại bước 2 đã... Tổng là ..."
[Người dùng] "Tôi đang hỏi cái tổng của mảng ban đầu. =,="
[ Máy tính ] "Từ từ để tôi quay lại bước 1 đã... Tổng là 45.
              Kết quả cuối cùng rồi đấy."

[Người dùng] "Ok, thế bây giờ tính giúp tôi tổng của mảng  
              [1, 2, 3, ..., 100_000] được không?"
[ Máy tính ] "Tôi chỉ nhớ được khoảng 10_000 bước thôi. =,="
```

## Một chút suy nghĩ

Hai mô hình lập trình đầu tiên mà chúng ta tìm kiếm tên gọi để nhận diện ở đây cũng là hai khía cạnh tư duy căn bản, tương ứng với 2 dạng câu hỏi thường nhật mà tâm trí của chúng ta phải đáp ứng với mỗi tác vụ công việc cần thực hiện hàng ngày - `Như thế nào?` và `Là cái gì?`.

Thực tế thì câu hỏi `Là cái gì?` luôn luôn là câu hỏi tới trước, bởi nó biểu thị cho khoảnh khắc khi mà tâm trí của chúng ta đang đứng ở vị trí quan sát bên ngoài công việc cần thực hiện. Tuy nhiên trải nghiệm cuộc sống của chúng ta lại được trực tiếp gom góp trong tiến trình làm việc, do đó nên câu hỏi `Như thế nào?` dường như được chú ý nhiều hơn cả.

Đây là lý do các ngôn ngữ lập trình phổ biến đều hỗ trợ `Imperative Programming` trước hết; Hoặc cũng có thể là ngược lại - những ngôn ngữ chủ điểm hỗ trợ `Imperative Programming` thì mới có thể trở nên phổ biến. :D Và JavaScript là một trong số đó, với các từ khóa mang ý nghĩa giải thích tuần tự logic cần thực hiện, và cả những công cụ khác nữa. Vì vậy nên mặc dù với mục đích là truyền đạt lối biểu thị `declarative` trong code thì chúng ta vẫn sẽ không thể viết như thế này -

```declarative.js
sumOf []   is   0
sumOf [first, ...rest]   is   first + sumOf rest
```

Tuy nhiên thì điều đó có lẽ là không quan trọng lắm. Ý nghĩa của một từ khóa nhiều khi sẽ là do chúng ta quy ước trong logic nội tại của mình. Và đối với mỗi từ khóa `if` trong code `declarative` ở phía trên, bạn hãy cứ xem như đó là một ký hiệu giúp tránh phải viết lặp lại tên hàm `sumOf` cũng được. :D

## Vậy JavaScript có hỗ trợ Declarative Programming?

Chắc chắn là có. Như đã nói ở trên thì `declarative` là một khía cạnh tư duy căn bản luôn luôn đứng ngay sát cạnh `imperative`. Một đặc điểm điển hình của `declarative` đó là lối viết `diễn dịch` - có nghĩa là chúng ta cứ đưa ra một định nghĩa trừu tượng hay sử dụng một cái tên nào đó trước, rồi mới thể hiện chi tiết diễn giải về cái tên đó ở phía sau. JavaScript cũng như nhiều ngôn ngữ khác có cho phép chúng ta gọi và sử dụng một hàm đứng trước phần code định nghĩa để tạo ra hàm đó. 

Ở các ngôn ngữ có nền móng chủ điểm là `declarative` và sử dụng ít code `imperative` hơn, thì chúng ta sẽ có thêm các cú pháp `late binding` để định nghĩa hay giải thích các yếu tố đã được sử dụng trước đó.

```declarative.hs
-- thể tích của một chiếc hộp có các cạnh a, b, c
-- là diện tích của mặt chứa các cạnh (a, b) nhân với c
boxVolume a b c = area * c
   -- giải thích về diện tích area ở dòng trên
   where area = a * b
```

## Một vài công cụ Imperative chưa nhắc đến

Giống với các ngôn ngữ lập trình phổ biến khác, do trọng tâm ban đầu là tính tuần tự của các câu lệnh cần thực hiện nên JavaScript có cung cấp thêm các công cụ giúp chúng ta thay đổi trình tự thực hiện của các câu lệnh khi cần thiết. Điều này nhằm mục đích cho phép tạo ra logic hoạt động đa dạng hơn cho code và cung cấp nhiều khả năng hơn để chúng ta chuyển tải các ý tưởng thành phần mềm.

Xuyên suốt `Sub-Series JavaScript` của chúng ta ở đây thì chỉ có duy nhất từ khóa [`break`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break) trong cấu trúc điều kiện `switch` là được thiết kế với mục đích như vậy. Chúng ta cũng có thể sử dụng `break` để rời khỏi một vòng lặp `for` hay `while` trước khi chu trình lặp kết thúc. Và như vậy là tuần tự của công việc đang thực hiện có thể được thay đổi linh hoạt hơn để nhằm đáp ứng một logic nào đó khi cần thiết.

Bên cạnh đó thì `JavaScript` còn 2 công cụ nữa là từ khóa [`continue`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue) và các nhãn [`label`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label). Trong đó thì `continue` sẽ giúp chúng ta `break` nhè nhẹ qua một lần lặp và sau đó vẫn tiếp tục thực hiện tiếp chu trình lặp; Còn các nhãn `label` thì sẽ giúp chúng ta đặt tên cho một khối lệnh để `break` có thể xác định phạm vi và thoát ra ngoài khối lệnh đó. Điểm hữu dụng là ở chỗ cho dù có bao nhiêu khối lệnh xếp chồng bên ngoài thì cũng không quan trọng, `break labelName;` sẽ chỉ đơn giản là nhảy ra khỏi phạm vi của khối lệnh mà nó đã xác định. :D

Lý do mà mình không đưa các công cụ này vào phần nội dung chính của `Sub-Series JavaScript` là vì các công cụ này thực sự không phải là bắt buộc hay quá cần thiết. Trong khi đó thì JavaScript cung cấp cho chúng ta rất nhiều phương thức khác để thể hiện công việc cần thực hiện với logic của code dễ theo dõi hơn. Bởi vì dù gì ở khía cạnh `imperative`, điều mà chúng ta mong muốn nhất vẫn là code có tuần tự dễ theo dõi và phỏng đoán kết quả hoạt động.

## Một vài đặc tính cơ bản

Và ở đây chúng ta sẽ liệt kê một số đặc tính cơ bản của `Imperative Programming` và `Declarative Programming` để hiểu hơn về tiến trình tư duy logic của chính mình. :D

`imprative`

- Trình tự của các câu lệnh `có` phản ánh logic vận hành của code.
- Thường xuyên cần phải tạo ra các biến tạm để gom dần kết quả của tiến trình vận hành được viết ra sau đó, đặc biệt là các thao tác vòng lặp. Do đó sẽ thường có thao tác thay đổi giá trị của các biến hay trạng thái `state`.
- Nội dung của code là chỉ ra `tuần tự` các bước cần thực hiện để đạt được mục tiêu `như thế nào?`

`declarative`

- Trình tự của các câu lệnh `không` phản ánh logic vận hành; Bởi vì chúng ta thường viết code sử dụng trước rồi mới định nghĩa giải thích sau.
- Cung cấp định nghĩa thay vì hướng dẫn máy tính thực hiện công việc. Do đó không có hướng dẫn `vòng lặp` mà thay vào đó là các định nghĩa `đệ quy`. Cũng vì vậy nên không cần tạo ra các biến tạm để gom kết quả vận hành từng bước của vòng lặp.
- Nội dung của code là `định nghĩa` mối liên hệ tương quan giữa các thành phần để khiến cho mục tiêu được thành hình và để máy tính hiểu được đó `là cái gì?`

Và đối với chúng ta, điểm chung tuyệt vời hơn cả của hai mô hình lập trình này đó là đều được hỗ trợ bởi JavaScript. Chúng ta có thể kết hợp cả 2 khía cạnh tư duy này khi thể hiện ý tưởng công việc cần thực hiện vào code. :D

## Kết thúc bài viết

Trong bài viết tiếp theo, chúng ta sẽ thảo luận về hai mô hình lập trình `Procedural & Functional`. À không. Từ bây giờ chúng ta không dùng từ `mô hình lập trình` nữa được không? :D Chúng ta sẽ chỉ gọi là những khía cạnh tư duy thôi, như vậy nghe đỡ `bác học` hơn và thân thiện hơn. :D

Vậy đấy, những bài viết cuối cùng trong `Sub-Series JavaScript` của chúng ta về cơ bản chỉ là những câu chuyện tản mạn. Vì toàn là những thứ chúng ta đã biết cả rồi mà. :D

[[JavaScript] Bài 24 - Procedural & Functional](https://viblo.asia/p/Eb85oAw2Z2G)
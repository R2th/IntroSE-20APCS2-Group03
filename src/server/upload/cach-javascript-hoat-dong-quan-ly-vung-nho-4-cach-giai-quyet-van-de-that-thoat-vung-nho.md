Nguồn: https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec

*Notes: Bài này là bài dịch từ blog khác, mình sẽ loại bỏ phần quảng cáo không liên quan để các bạn tập trung vào kiến thức được chia sẻ cụ thể trong bài này. Nếu muốn đọc sâu hơn và kỹ hơn thì các bạn nên đọc bài gốc. Cảm ơn ^^!

PS: Bài này khá là dài, mình dịch cũng nản luôn. Nhưng kiến thức về quản lý vùng nhớ rất hay. 

Bài đầu tiên của loạt bài tập trung vào cung cấp cho chúng ta [một cái nhìn tổng quan về engine, runtime và Call stasks](https://viblo.asia/p/cach-javascript-hoat-dong-khai-niem-ve-engine-runtime-va-call-stack-trong-javascript-3P0lPaa45ox).

Bài đăng thứ hai chúng ta đi sâu vào [các phần bên trong của công cụ JavaScript Google V8 và cũng cung cấp một số tips về cách viết code JavaScript tốt hơn](https://viblo.asia/p/cach-javascript-hoat-dong-chi-tet-ve-v8-engine-5-tips-de-toi-uu-hoa-code-cua-ban-1Je5EPDjlnL).*

Với bài thứ 3 trong series này, chúng tôi sẽ thảo luận về một chủ đề quan trọng khác mà các developer đã bỏ quên nhiều nhất do sự phát triển về sức mạnh và độ phức tạp của các ngôn ngữ lập trình đang được sử dụng hàng ngày - **quản lý bộ nhớ (memory management)**. Chúng tôi cũng cung cấp một số mẹo về cách xử lý rò rỉ bộ nhớ trong JavaScript.

# **Overview**

Các ngôn ngữ lập trình như C có các hàm quản lý vùng nhớ cấp thấp sơ khai (low-level memory management) như `malloc()`  và `free()`. Các hàm nguyên thủy này được nhà phát triển và sử dụng để phân bổ vùng nhớ và giải phóng vùng nhớ cho hệ điều hành.

Trong cùng một lúc, JavaScript sẽ cấp phát vùng nhớ khi objects hay string, v.v.... được tạo ra và theo một cách tự động nó giải phóng luôn các đối tượng khi chúng không được sử dụng nữa, một quá trình gọi là **garbage collection** ([Xem lại phần 2](https://viblo.asia/p/cach-javascript-hoat-dong-chi-tet-ve-v8-engine-5-tips-de-toi-uu-hoa-code-cua-ban-1Je5EPDjlnL)).

> Tính chất giải phóng vùng nhớ nghe có vẽ "tự động hoá" một cách tự nhiên này thực tế là một sự nhầm lẫn. Nó khiến các developer JavaScript (và mốt số ngôn ngữ bậc cao khác) mặc định cho qua hoặc cố tình không quan tâm tới nó. Đây là một sai lầm rất lớn.




Ngay cả khi làm việc với các ngôn ngữ bậc cao (high-level languages), các nhà phát triển nên có sự hiểu biết về vấn đề quản lý vùng nhớ (hoặc ít nhất là nắm được cơ bản). Đôi khi có những vấn đề xãy ra trong việc quản lý vùng nhớ (bugs, hoặc sự thực thi trong garbage collection bị hạn chế) và khi đó các developer cần phải hiểu được cơ chế của nó để có thể xử lý vấn đề một cách tối ưu nhất. (hoặc để tìm một cách giải quyết phù hợp, với tối thiểu risky và bad code).

# **Memory life cycle** (chu kỳ của vùng nhớ)
Cho dù bạn sử dụng ngôn ngữ lập trình nào, Memory life cycle vẫn luôn giống nhau:

![](https://images.viblo.asia/ef6bbe46-2077-41a2-aafb-756dfd44d7c8.png)

Dưới đây là tổng quan về những gì xảy ra ở mỗi bước của chu kỳ:

**Allocate memory (Cấp phát vùng nhớ)**: Memory sẽ được cấp phát bởi hệ điều hành đang chạy chương trình của bạn. Trong các ngôn ngữ cấp thấp (ví dụ: C), tiến trình này nên được xứ lý bởi chính developer. Tuy nhiên với ngôn ngữ bật cao thì tiến trình này được tự động xử lý bởi engine.

**Use memory (Xử dụng vùng nhớ được cấp phát)**: đây là lúc chương trình của bạn thực sự sử dụng vùng nhớ đã được cấp phát trước đó. Các hoạt động Read và Write sẽ diễn ra ngay khi bạn tạo biến, cấp phát vùng nhớ cho biến của mình trong code.

**Release memory** (Giải phóng vùng nhớ): Đây là khi bạn giải phóng toàn bộ vùng nhớ mà bạn không dùng nữa. Lúc này chúng sẽ được giải phóng và cũng sẳng sàng để được xử dụng tiếp. Đối với các ngôn ngữ bậc thấp thì tiến trình Release memory và cả Allocate memory đều khá là rõ ràng và các lập trình viên sẽ phải tự handle vấn đề này với code của họ.

Để đi nhanh về các khái niệm của **call stacks** và **memory heap**, [bạn có thể đọc bài viết đầu tiên của chúng tôi về chủ đề này](https://viblo.asia/p/cach-javascript-hoat-dong-khai-niem-ve-engine-runtime-va-call-stack-trong-javascript-3P0lPaa45ox).

# **What is memory?**

Trước khi đi trực tiếp vào chi tiết, chúng ta nên xem khái quát về khái niệm tổng quan của memory và nó hoạt động như thế nào.

Ở cấp độ phần cứng, bộ nhớ máy tính bao gồm một số lượng lớn [flip-flop](https://vi.wikipedia.org/wiki/Flip-flop). Mỗi flip-flop chứa một vài bóng bán dẫn và có khả năng lưu trữ một bit. Mỗi flip-flop sẽ được đánh địa chỉ với một định danh duy nhất, vì vậy chúng ta có thể đọc và ghi đè lên chúng. Do đó, về mặt khái niệm, chúng ta có thể nghĩ đơn giản như thế này:  "toàn bộ bộ nhớ máy tính của mình chỉ là một mảng bit khổng lồ mà chúng ta có thể đọc và ghi".

Vì là con người nên chúng ta không có khả năng để đọc toàn bộ suy nghĩ hay các công thức toán học từ các chuỗi bits,  chúng ta sắp xếp chúng thành các nhóm lớn hơn, xếp chúng cùng nhau và có thể được sử dụng để biểu thị các con số.  8 bits sẽ là 1 byte. Nói về Byte, có một số kiểu (đôi khi là 16 bits, đôi khi là 32 bits).

Rất nhiều thứ được lưu trữ trong memory:

1. Tất cả các biến và dữ liệu được sử dụng trong phần mềm.
2. Tất cả code, bao gồm cả hệ điều hành.

Trình biên dịch và hệ điều hành phối hợp với nhau để đảm nhiệm hầu hết việc quản lý bộ nhớ cho bạn, nhưng chúng tôi khuyên bạn nên biết những gì mà diễn ra trong đó.

Khi bạn biên dịch mã của mình, trình biên dịch có thể kiểm tra các kiểu dữ liệu nguyên thủy (primitive data types) và tính toán trước chúng sẽ cần bao nhiêu vùng nhớ. Số lượng cần thiết sau đó được phân bổ và đặt trong **stack space** (không gian ngăn xếp). Cái space mà các biến này được phân bổ gọi là **stack space** (không gian ngăn xếp)  bởi vì khi các functions được gọi, memory của chúng sẽ được thêm vào phía trên memory hiện có. Khi chúng chấm dứt, chúng được xóa theo thứ tự LIFO (last-in, last-out). Ví dụ, hãy xem xét các trường hợp:

```
int n; // 4 bytes
int x[4]; // array có 4 elements, mỗi elements có 4 bytes
double m; // 8 bytes
```

Trình biên dịch sẽ thấy được như thế này:
4 + 4 × 4 + 8 = 28 bytes.

> Đó là cách mà nó hoạt động với các kích thước hiện tại cho integers và doubles. Khoảng 20 năm trước, integers thường là 2 byte và doubles là 4 byte. Mã của bạn không bao giờ phải phụ thuộc vào kích thước của các kiểu dữ liệu cơ bản tại thời điểm này.
> 

Trình biên dịch sẽ chèn code để tương tác với hệ điều hành, yêu cầu số byte cần thiết trên stack để lưu trữ các biến của bạn.

Trong ví dụ trên, trình biên dịch sẽ biết chính xác địa chỉ vùng nhớ của từng biến. Trong thực tế, bất cứ khi nào chúng ta ghi vào biến n, nó sẽ được biên dịch đại khái thành “memory address 4127963”. 

Lưu ý rằng nếu chúng ta cố gắng truy cập vào `x[4]` lúc này, chúng ta sẽ phải truy cập vào kiểu dữ liệu giống biến m. Đó là bởi vì chúng ta đang truy cập vào một phần tử trong không hề tồn tại mảng . (4 bytes của nó được phân bổ thêm vào sau phần tử cuối cùng của mảng này `x[3]`. - Lưu ý mảng x này trong ví dụ có nói chỉ có 4 phần tử thôi. `x[4]` lúc này có thể được đọc và ghi đè lên một số bits của biến m kiểu double). Nó chắc chắn là không mang lại sự tối ưu của việc phân bổ vùng nhớ cho phần mềm của chúng ta.

![](https://images.viblo.asia/f784b490-88c5-48c5-9be8-7bd8d56bbb6b.png)

Khi các functions gọi các functions khác, mỗi function sẽ có một đoạn riêng trong ngăn xếp khi nó được gọi. Nó giữ tất cả các biến cục bộ của nó ở đó, nhưng cũng chứa một bộ đệm ghi nhớ vị trí thực thi của nó. Khi functions đó kết thúc, memory block của nó một lần nữa được giải phóng và sẳng sàng được cung cấp cho các mục đích khác.

# **Cấp phát tự động**
Thật không may, mọi thứ không hoàn toàn dễ dàng khi chúng ta không hề biết  sẽ phải có bao nhiêu thời gian biên dịch cho bao nhiêu vùng nhớ mà một biến sẽ cần. Giả sử chúng ta muốn làm một cái gì đó như sau:

```
int n = readInput(); // reads input from the user
...
// create an array with "n" elements
```

Ở đây, tại thời gian biên dịch, trình biên dịch không biết mảng sẽ cần bao nhiêu vùng nhớ vì nó được xác định bởi một giá trị động được cung cấp từ người dùng.

Chính vì thế chúng ta không thể biết mà cấp vùng nhớ cho biến trong stack được. Thay vào đó, chương trình của chúng ta cần phải đưa yêu cầu rõ ràng đến hệ điều hành có thể cấp phát chúng ta đúng dung lượng cần lúc run-time. Vùng nhớ này sẽ được phân bổ từ vùng **heap**. Sự khác biệt giữa cấp phát bộ nhớ tĩnh và động được tóm tắt trong bảng sau:

![](https://images.viblo.asia/c3cccbcf-e7f5-4d58-9410-c41df87eca37.png)

Để có thể hiểu tường tận cách mà quy trình cấp phát động thực hiện như thế nào. Chúng ta cần phải bỏ nhiều thời gian để hiểu về **pointers**(con trỏ), vấn đề này có thể hơi đi lệch với chủ để đang đề cập trong bài này.
(Đoạn này tác giả có nói nếu bạn muốn đào sâu hơn về pointers thì cứ comment vào bài post của tác giả để được giải thích thêm)

# Cấp phát vùng nhớ trong JavaScript
Rồi bây giờ chúng tôi sẽ giải thích về cái bước đầu tiên trong JavaScript "Cấp phát vùng nhớ". JavaScript đã giảm tải trách nhiệm cho developers trong vấn đề cấp phát vùng nhớ này. Nó làm tự động ngay khi bạn khai báo một biến xong.

```
var n = 374; // cấp phát vùng nhớ cho 1 number
var s = 'sessionstack'; // cấp phát vùng nhớ cho 1 string 
var o = {
  a: 1,
  b: null
}; // cấp phát vùng nhớ cho một object và cho từng property của nó
var a = [1, null, 'str'];  // (giống như object) cấp phát vùng nhớ cho một
                           // array và từng element của nó
                           
function f(a) {
  return a + 3;
} // cấp phát vùng nhớ cho một function (function này được cấp phát như một object nhưng có thể được gọi tới)

// function expressions cũng được cấp phát như một object
someElement.addEventListener('click', function() {
  someElement.style.backgroundColor = 'blue';
}, false);
```

Xem thêm Function Expressions ở [đây](https://viblo.asia/p/tan-man-ve-function-declaration-va-function-expression-YmjeoLxnkqa)

Một số trường hợp khởi tạo object bằng cách gọi một hàm khởi tạo cũng sẽ được cấp phát như một objects

```
var d = new Date(); // cấp phát vùng nhớ cho Date object
var e = document.createElement('div'); // cấp phát cho một DOM element
```

Các phương thức có thể cấp phát giá trị mới hoặc một object mới. VD:

```
var s1 = 'sessionstack';
var s2 = s1.substr(0, 3); // s2 là một string mới
// Bởi vì các string là những giá trị bất biến, 
// JavaScript lúc này sẽ không cấp phát vùng nhớ cho nó, 
// nhưng vẫn sẽ lưu cái range [0, 3] lại.

var a1 = ['str1', 'str2'];
var a2 = ['str3', 'str4'];
var a3 = a1.concat(a2); 
// một array mới với 4 elements được ghép lại 
// từ các elements của a1 và a2
```

# Xử dụng memory trong JavaScript
Việc xử dụng memory trong javaScript đơn giản là đọc và ghi đè lên nó.

Điều này được thực hiện bởi việc đọc và ghi các giá trị của một giá trị nào đó hoặc một thuộc tính của object nào đó hay thậm chí là việc chúng ta đưa một thuộc tính (argument) vào trong một functions.

# Giải phóng vùng nhớ khi không xử dụng nữa.
Hầu hết các vấn đề hay lỗi trong quá trình xử lý memory đều đến từ bước này.

Nhiệm vụ khó khăn nhất ở đây là làm cách nào để xác định được vùng nhớ đã được cấp phát nào đang không được xử dụng nữa. Thường thì các developers cần phải xác định được chổ nào trong code của mình đang không cần dùng tới nữa và phải giải phóng vùng nhớ ở đó ngay.

Với các ngôn ngữ bậc cao thì nó sẽ có thêm một tiến trình gọi là **garbage collector** (cái này được cung cấp bởi engine). Tiến trình này nó sẽ giúp theo dõi toàn bộ memory heap của mình và khi đó nó sẽ dò tới nơi nào đang không còn xử dụng nữa thì sẽ remove đi một cách tự động (Nghe có vẽ khoẻ ru nhỉ :D).

Có điều đương nhiên không có gì là tuyệt đối, các việc xác định vùng nhớ nào cần hay không cần không thể nào dựa vào một thuật toán mà giải quyết hết được. 

Hầu hết các garbage collector này hoạt động bằng cách thu thập những vùng nhớ mà không thể truy xuất tới được nữa ví dụ những biến con trỏ nằm ngoài scope hiện tại. Tuy nhiên việc thu thập như vậy cũng mang tính tương tối chứ không thể quét qua được hết. Bởi vì thực tế thì bất kỳ vùng nhớ nào cũng có những biến con trỏ nằm bên trong scope trỏ tới nó nhưng lại không bao giờ được truy cập lại lần nữa.

# Garbage collection (Thu gom rác)
Theo như thực tế thì việc xác địch được vùng nhớ nào còn xử dụng hay vùng nhớ nào không được xử dụng rất là khó khăn và mang tính tương đối. Cho nên giải pháp Garbage Collection này cũng rất hạn chế cho cái vấn đề này vì vậy trong phần này chúng tôi sẽ giải thích các khái niệm cần thiết để hiểu các thuật toán chủ yếu của việc thu gom rác và những hạn chế của chúng.


# Memory references
Các thuật toán của GC chủ yếu dựa vào các reference của nó. Trong context của việc quả lý vùng nhớ, một object có thể reference đến một object khác nếu như object đầu có thể truy cập vào object sau (có thể ẩn hoặc rõ ràng). Ví dụ: Một cái object có thể reference tới prototype của chính nó (**implicit reference** - dịch nôm na là try vấn ẩn) và cả các giá trị của từng properties của nó. (**explicit reference** - dịch nôm na là truy vấn công khai).

Trong context này, một objects có thể được mở rộng ra thành một object bự hơn so với ban đầu và nó còn chứa được các function scopes (hoặc cả global lexical scope - biến toán cục).

> Lexical scopes là những biến được khởi tạo trong các hàm lồng nhau: hàm bên trong có thể chứa scope của hàm bọc nó ngay cả khi hàm bọc nó đã được return (Xem them về [closure and scopes](https://kipalog.com/posts/Closure-va-scope-trong-javascript))
> 

# Reference-counting garbage collection
Thuật toán thu góm rác này siêu đơn giản. Một đối tượng được coi là rác và có thể được gôm khi mà chả có cái nào tham chiếu tới nó cả.

Hãy xem một ví dụ dưới đây: 

```
var o1 = {
  o2: {
    x: 1
  }
};
// chúng ta tạo ra 2 objects. 
// 'o1' tham chiếu tới 'o2' tại biến 'x' của 'o2'.
// lúc này thì không có cái nào là rác cả

var o3 = o1; // 'o3' được khởi tại và có giá trị là 'o1'
            // lúc này 'o3' nó cũng trỏ tới cái object mà 'o1' trỏ tới (chính là o2). 
                                                       
o1 = 1;      // khi mình gán trực tiếp 'o1' = 1 rồi thì lúc này 'o1' sẽ chỉ có tham chiếu duy nhất trỏ tới nó đó là 'o3' (o1=1 thì khi đó o1 không còn = o2 nữa)

var o4 = o3.o2; // 'o4' được khởi tạo và nó bằng 'o3.o2' nghĩa là lúc này nó có trỏ tới 'o2' và có một property là 'x = 1'.
                // 'o4' lúc này sẽ có 2 reference: 
                // 1 là là biến x trong 'o2'. 
                // 2 là chính giá trị của nó 

o3 = '374'; // Nếu gán trực tiếp 'o3' với giá trị '374' thì lúc này 'o1' sẽ không có đối tượng nào tham chiếu đến nó nữa cả
            // Lúc này nó chính là rác.
            // Nhưng mà lúc này gía trị bàn đầu của nó là 'o2' vẫn tồn tại
            // và được tham chiếu bởi 'o4', cho nên vùng nhớ chứa nó vẫn không được giải phóng 

o4 = null; // 'o4' trước đó tham chiếu tới 'o2' nhưng mà giờ được gán giá trí khác
           // vậy lúc này 'o1' chính xác là không còn ai tham chiếu tới nữa. 
           // Nó sẽ được thu gom.
```
( Bao rối rắm (_ _!))

# Vấn đề đến từ cycles (chu kỳ, vòng lặp)
Có một sự hạn chế đến từ các vòng lặp. Ở ví dụ sau chúng ta sẽ thấy 2 đối tượng tham chiếu lẫn nhau và tạo ra một vòng lặp. Chùng nằm ngoài scope sau khi function được gọi và khi đó chúng không còn tác dụng gì nữa và vùng nhớ của chúng có thể được giải phóng. Thế nhưng đối với thuật toán đếm số lượt tham chiếu để dọn dẹp rác hiện tại thì nó vẫn sẽ thấy rằng nếu ít nhất còn một đối tượng tham chiếu tới thì vẫn sẽ chưa thể được giải phóng. 
Nghĩa là khi chúng cứ liên tục tham chiếu tới nhau tạo ra một vòng lặp. Thì lúc đó cả hai đều không thể được giải phóng. 

```
function f() {
  var o1 = {};
  var o2 = {};
  o1.p = o2; // o1 references o2
  o2.p = o1; // o2 references o1. This creates a cycle.
}

f();
```

![](https://images.viblo.asia/7c1e4d95-6da9-47d9-9db6-79138abc5fea.png)

# Thuật toán Mark-and-sweep

Để quyết định xem một đối tượng có còn được sử dụng hay không, thuật toán này xác định xem đối tượng có thể truy cập được hay không.

Thuật toán này có 3 bước: 
1. Roots: Về cơ bản thì roots là một biến toàn cục đc tham chiếu đến trong code. Ví dụ như trong JavaScript chúng ta có object `window` là biến global được coi như là root. Trong Nodejs các đối tượng giống nhau được gọi là "global". Một danh sách đầy đủ các roots sẽ được build bởi garbage collector.
2. Tiếp theo đó thuật toán sẽ bắt đầu kiểm tra toàn bộ các roots trong list và các phần tử con của nó sau đó đánh giấu là active (nghĩa là không phải là rác). Và ngược lại nếu cái nào mà root không trỏ tới thì coi như là rác.
3. Và cuối cùng garbage collector sẽ giải phóng hết vùng nhớ của những phần tử không được đánh active và giải phóng vùng nhớ của chúng trả về cho hệ điều hành có thể xử dụng. 

![](https://images.viblo.asia/244f184c-ed99-48f0-9744-12be738b282d.gif)

Thuật toán này tốt hơn thuật toán trước vì một đối tượng không có tham chiếu nào dẫn đến việc đối tượng này  cũng không thể truy cập được. Và rõ ràng lý thuyết này không đúng với trường hợp các cycles. Kể từ năm 2012, tất cả các trình duyệt hiện đại đều có bộ Mark-and-sweep garbage collector. Tất cả các cải tiến về vấn đề thu gom rác ở JavaScript như (generational/incremental/concurrent/parallel garbage collection) đều hướng tới việc phát triển thuật toán này. Nhưng mà nó thực thế không cải thiện vấn đề chung của chính GC hay có thể đạt được mục tiêu là xác định được một đối tượng nào đó có thể tiếp cận được hay không. 

[Xem thêm bài viết này](https://en.wikipedia.org/wiki/Tracing_garbage_collection) để tìm hiểu rõ hơn về việc thu gom rác cũng như thuật toán mark-and-sweep và nó đã được tối ưu hoá như thế nào.

# Cycles đã không còn là vấn đề lúc này nữa

Trong ví dụ đầu tiên ở trên, sau khi function được gọi trả về giả trị, hai đối tượng không được tham chiếu bởi global variable nữa, thì lúc này chúng sẽ được tìm thấy bởi GC. 

![](https://images.viblo.asia/00c7cce3-ddc5-4d5e-a7e5-3779508e135a.png)

Mặc dù chúng có sự tham chiếu qua lại lẫn nhau nhưng vẫn được coi là rác vì không được root tham chiếu tới. Nên lúc này chúng sẽ bị gom đi. 

# Sự không trực quan của Garbage Collectors

Mặc dù Garbage Collectors rất tiện lợi nhưng đi kèm đó cũng có một số hạn chế khi xảy ra một vài vấn đề có thể không tích hợp được với chính nó. Một trong số đó là [**non-determinism** (thuật toán không đơn định)](https://vi.wikipedia.org/wiki/Thu%E1%BA%ADt_to%C3%A1n_kh%C3%B4ng_%C4%91%C6%A1n_%C4%91%E1%BB%8Bnh). Nói cách khác thì GCs là một kiểu không thể đoán trước được. Bạn thực sự không thể biết được khi nào thì việc collection được thực hiện. Trong một vài trường hợp thì chương trình của chúng ta có thể xử dụng nhiều vùng nhớ hơn mức nó yêu cầu. Trong một số trường hợp vấn đề tạm ngưng hoạt động (short-pause) cũng khá cần được lưu tâm đối với một vài ứng dụng nhạy cảm.

Mặc dù non-determinism nghĩa là chúng ta không chắc chắn được khi nào thì việc collection được thực thi, nhưng trong hầu hết các tiến trình của CGs chúng đều dùng chung một mô hình để thực hiện việc dọn dẹp trong suốt quá trình phần bổ vùng nhớ. Nếu không có hoạt động phân bổ nào được thực hiện thì hầu hết các CGs cũng sẽ không hoạt động. Hãy xem xét các kịch bản sau đây:

1. Cấp phát một vùng nhớ với size khá lớn.
2. Hầu hết các elements (hoặc tất cả chúng) đều được đánh giấu không thể truy cập được (giả sử chúng ta vô hiệu hóa một con trỏ trỏ đến cái cache mà chúng ta không còn dùng nữa).
3. Không còn hoạt động phân bổ nào được thực hiện nữa. 

Trong trường này hầu hết CG đều sẽ không chạy. Nói một cách khác, mặc dù trong các trường hợp trên GCs đã xác được những đối tượng không được truy vấn tới và chúng sẳng sàng để gôm dọn nhưng những collector không đưa ra yêu cầu thực thi thì GC cũng sẽ không chạy. Những trường hợp này không phải vấn đề rò rỉ nghiệm trọng lắm nhưng thực tế thì nó vẫn dẫn tới vấn đề sự dụng vùng nhớ nhiều hơn mức định ra.

# Vậy rò rỉ bộ nhớ là gì?
Đại khái rò rỉ bộ nhớ nghĩa là những phần vùng nhớ mà chúng ta đã sài trước đây nhưng giờ thì không dùng tới nữa. Nhưng chúng vẫn chưa được giải phóng về cho HĐH hoặc về khu vực chứa các vùng nhớ sẳng sàng được sử dụng.

![](https://images.viblo.asia/b477a7d2-344d-4df1-ab56-5110355c7d68.jpeg)

Các ngôn ngữ lập trình khác nhau sẽ xử dụng những cách khác nhau để xử lý vấn đề quản lý memory. Tuy nhiên việc xác định một vùng nhớ có được xử dụng xong rồi hay chưa thực sự là một vấn đề không thể giải quyết được ([undecidable problem](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management#Release_when_the_memory_is_not_needed_anymore)). Nói các khác thì chỉ có developer mới có thể xác định được vùng nhớ nào anh ta còn cần vùng nhớ nào thì không. Cũng có một số ngôn ngữ lập trình cung cấp các tính năng giúp nhà phát triển thực hiện điều này. Nhưng một số khác thì yêu cầu các lập trình viên phải tự xác định và quản lý được vấn đề này. Wikipedia có khá nhiều các articles hay cho vấn đề [manual](https://en.wikipedia.org/wiki/Manual_memory_management) hay [auto](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)) quản lý memory.

# 4 kiểu thất thoát vùng nhớ hay gặp phải trong javaScript

### 1: Global variables (biến toàn cục)

JavaScript xử lý các biến chưa được khai báo một cách khá là thú vị: Khi một biến chưa được khai báo nhưng được trỏ tới thì ngay lập tực một thuộc tính sẽ được tạo ra trong global object được `window`. Nó sẽ như thế này:

```
function foo(arg) {
    bar = "some text";
}
```
Nó sẽ tương đương với
```
function foo(arg) {
    window.bar = "some text";
}
```

Nói thế này, mục đích của biến `bar` là muốn tham chiếu tới một string `some test` ở bên trong function `foo`. Nhưng khi bạn không dùng `var` để khai báo nó thì một biến toàn cục dự phòng sẽ được tạo ra trong object `window`. Với đoạn code ngắn ngủi trên chưa phải là vấn đề to tát lắm. Nhưng mà thử tưởng tượng với một đống code đều tạo ra những biến dự phòng toàn cục như thế này thì chắc chắn là một vấn đề lớn với memory của chúng ta.

Bạn cũng có thể vô tình tạo một biến toàn cục bằng cách sử dụng `this`:

```
function foo() {
    this.var1 = "potential accidental global";
}
// Foo gọi chính nó, this trỏ tới global object (window)
// thay vì là undefined.
foo();
```

> Bạn có thể tránh tất cả những điều này bằng cách thêm ‘use strict’ ở đầu file JavaScript của bạn, lúc đó nó sẽ chuyển sang chế độ phân tích cú pháp JavaScript chặt chẽ hơn nhiều, điều này sẽ ngăn cản việc tạo các biến toàn cục bất ngờ.
> 


Việc vô tình tạo ra các biến toàn cục chắc chắn không phải là một vấn đề lớn, tuy nhiên điều quan trọng là nếu bạn thường xuyên tạo ra các biến như vậy, thì khi đó theo lý thuyết GC sẽ không thể thu thập và dọn dẹp hết đc các biến này. Cho nên chúng ta cần lưu ý đặt biệt đến các biến toàn cục khi tạo ra để lưu trử thông tin một lượng lớn các bits. Chỉ sử dụng biến toàn cục khi bạn buộc phải làm vậy, phải đảm bảo sẽ gán giá trị null hoặc update lại giá trị của nó sau khi bạn dùng xong.

### 2: Các Timers hoặc callbacks bị bỏ quên

Lấy ví dụ với `setInterval` một API được cung cấp với browser và rất hay được sử dụng trong JavaScript.

Những thư viện cung cấp các observers (quan sát viên) hay các công cụ khác cho phép các hàm callbacks thường sẽ phải đảm bảo rằng một khi các instances của nó unreachable (không thể truy cập được) thì tất cả các tham chiếu (con trỏ trỏ tới) các callbacks mà nó cho phép cũng đều phải unreachable (không truy cập đc). Trường hợp dưới đây xãy ra cũng không ít:

```
var serverData = loadData();
setInterval(function() {
    var renderer = document.getElementById('renderer');
    if(renderer) {
        renderer.innerHTML = JSON.stringify(serverData);
    }
}, 5000); //This will be executed every ~5 seconds.
```

Đoạn mã trên cho thấy hậu quả của việc sử dụng timers mà các reference nodes hoặc data của nó mà không còn cần thiết nữa.

> Chổ này giải thích hơi phức tạp và rườm ra nên mình không dịch. Mình sẽ giải thích theo quan điểm cá nhân đơn giản như thế này. Cái biến `renderer` trong một số trường hợp nếu nó bằng `false` thì rõ ràng cái function callback bên trong `setInterval` sẽ không con ý nghĩa gì nữa. Thế nhưng nó vẫn chạy liên tục cứ sau mỗi 5 giây (tính chất của hàm `setInterval`). Bởi vì nó vẫn còn hoạt động nên trình xứ lý cũng như các phần phụ thuộc của nó sẽ không thể được dọn dẹp. Vậy lúc này cái `serverData` và `loadData()` đang thừa thải những vẫn không thể được thu gom. 

Khi sử dụng observer, bạn cần phải có một câu lệnh tường minh để remove chúng mỗi khi xong việc (Dù là observer đó không cần dùng nữa hay object không thể truy cập được).

Thật may là hầu hết các trình duyệt hiện đại sẽ thực hiện công việc này cho bạn: browser sẽ tự động thu thập các observers một khi một observer trở nên không thể truy cập được ngay cả khi bạn quên xóa listener. Một số browser cũ trước đây không làm được chuyện này (IE6).

Tuy nhiên với ví dụ dưới đây sẽ cho các bạn thấy một vài trường hợp cụ thể chúng ta cần lưu ý loại bỏ các observers đi khi nó trở nên vô dụng:

```
var element = document.getElementById('launch-button');
var counter = 0;

function onClick(event) {
   counter++;
   element.innerHtml = 'text ' + counter;
}
element.addEventListener('click', onClick);

// Do stuff
element.removeEventListener('click', onClick); // một listeners
element.parentNode.removeChild(element);

// Lúc này element đã nằm ngoài scope,
// cả element và onClick sẽ được thu lượm ngay cả trên các browsers cũ
// chúng không có cơ chế handle cycels tốt lắm 
```

Những với các trình duyệt hiện đại ngày nay bạn thậm chí không cần thực hiện thao tác `removeEventListener` trước khi biến cái node của element thành unreachable. Bởi vì trình duyệt nó sẽ làm luôn cho bạn thao tác này. Nếu bạn sài JQuery (một số libraries, frameworks cũng có support) các listeners cũng sẽ được loại bỏ giúp bạn trước khi cái node không được tham chiếu tới nữa. Thư viện JQuery giúp bạn đảm bảo không có rò rỉ bộ nhớ ngay cả khi ứng dụng đang chạy dưới các phiên bản trình duyệt cũ.


### 3: Closures

Một khía cạnh khá quan trọng trong JavaScript đó là Closures: Một inner functions có thể acccess tới các biến của một outer (enclosing) function. Bởi vì các triển khai của JavaScript trong runtime nên cũng sẽ xãy ra các vấn đề rò rỉ vùng nhớ như sau: 

```
var theThing = null;
var replaceThing = function () {
  var originalThing = theThing;
  var unused = function () {
    if (originalThing) // a reference to 'originalThing'
      console.log("hi");
  };
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      console.log("message");
    }
  };
};
setInterval(replaceThing, 1000);
```

Khi hàm `replaceThing` được gọi. `theThing` sẽ được update thành một object chứa một array rất lớn và một closure (`someMethod`). Tuy nhiên `originalThing` lại được tham chiếu bởi một closure khác là biến `unused`. Cần lưu ý là  **scope của closure được tạo ra cho các closures trong cùng parent scope thì scope đó được dùng chung.**

Trong trường hợp này, Scrope được tạo ra cho hàm closure `someMethod` sẽ được refer bởi function `unused` (hai closure có chung scope), mà `unused` thì lại reference tới `originalThing`. Mặc dù `unused` được khởi tạo nhưng không hề được sử dụng nhưng `someMethod` lại được sử gọi bởi `theThing`, biến `theThing` được khởi tạo bên ngoài scope của hàm `replaceThing` (thuộc về biến global). Một khi mà `someMethod` chia sẽ scope với `unused` mà `unused` này là reference bởi `originalThing` thế nên biến `unused` lúc này vẫn không thể được collect (vì lúc này nó vẫn được global scope tham chiếu tới).

Với ví dụ vừa rồi, scope của `someMethod` được chia sẽ với `unused` trong khi `unused` lại refer đến `originalThing`,  Thực tế thì `someMethod` có thể được sử dụng thông qua `theThing` bên ngoài scope của `replaceThing` mặc dù sự thật là `unused` không hề được gọi (sự tồn tại của nó là vô dụng). Trên thực tế cái references vô dụng `originalThing` bắc buộc nó vẫn phải hoạt động khi mà `someMathod` chia sẽ closure scope của nó với biến `unused`. 

Tất cả những điều này có thể dẫn tới một vụ rò rĩ bộ nhớ đáng kể. Bạn có thể thấy được sự tăng đột biến trong việc sử dụng bộ nhớ khi đoạn mã trên được chạy đi chạy lại. Kích thước của nó sẽ không giảm thiểu khi GC chạy. Một chuỗi liên kết giữa các closures sẽ được tạo ra (root của nó sẽ là biến `theThing` đối với trường hợp trên), và mỗi scope của từng closures sẽ phải chịu tải một tham chiếu gián tiếp đến một mảng lớn. 

Vấn đề này đã được tìm thấy bởi nhóm **Meteor** và họ có [một bài viết tuyệt vời ](https://blog.meteor.com/an-interesting-kind-of-javascript-memory-leak-8b47d2e7f156)mô tả nó rất chi tiết.

### 4: Out of DOM references

Có một số trường hợp gặp phải khi mà các lập trình viên lưu các DOM nodes bên trong data structures. Giả sử bạn muốn update contents cho một số rows trong một table một cách nhanh chóng. Nếu như bạn lưu một reference cho từng DOM row trong một dictionary hay một array, lúc đó sẽ có đến 2 reference trỏ tới cùng một DOM element: một ở DOM tree và một trong dictionary. Nếu muốn loại bỏ các row này, bạn cũng cần lưu ý phải loại bỏ luôn các references kia. 

```
var elements = {
    button: document.getElementById('button'),
    image: document.getElementById('image')
};
function doStuff() {
    elements.image.src = 'http://example.com/image_name.png';
}
function removeImage() {
    // image là một biến thuộc về object element
    document.body.removeChild(document.getElementById('image'));
    // Ở đây, chúng ta vẫn còn một reference tới #button trong object elements global. 
    // nói cách khác thì cái element button này vẫn tồn tại trong bộ nhớ và không thể đc collect bởi GC
}
```

Có một sự xem xét khác cần được tính đến khi nó bắt đầu thàm chiếu đến các nhánh bên trong của một DOM tree. Nếu bạn tạo một reference đến một table cell (thẻ <td>) và sau đó muốn xoá cái table đi nhưng vẫn giữ cái reference đến một cell cụ thể nào đó, lúc đó có thể xãy ra một vụ rò rỉ vùng nhớ, tuy không lớn lắm. Có thể bạn sẽ nghĩ GC sẽ dọn dẹp toàn bộ mọi thứ trừ cái cell cụ thể đó, nhưng không, không phải như vậy. Một khi cái cell là child node của table thì children luôn giữ reference đến parents của nó, lúc đó cái reference tưởng chừng duy nhất này sẽ giữ toàn bộ table trong vùng nhớ.

Xem tiếp P4 Cách JavaScript hoạt động: Event loop và căn nguyên của lập trình bất đồng bộ + 5 mẹo giúp bạn code tốt hơn với async/await [tại đây](https://viblo.asia/p/cach-javascript-hoat-dong-event-loop-va-can-nguyen-cua-lap-trinh-bat-dong-bo-5-meo-giup-ban-code-tot-hon-voi-asyncawait-V3m5WvqWlO7)
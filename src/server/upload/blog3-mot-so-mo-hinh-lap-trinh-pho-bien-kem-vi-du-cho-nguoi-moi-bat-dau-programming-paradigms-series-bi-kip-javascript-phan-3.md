![image.png](https://images.viblo.asia/12bbab93-84c9-41d1-a9ed-0830aa0c6e48.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Trong bài viết này, chúng ta sẽ cùng nhau rì viu (review) qua các mô hình lập trình, một tiêu đề lạ mắt để mô tả các cách hoặc phong cách phổ biến để tổ chức chương trình của bạn.

Mình sẽ cố gắng chia nhỏ nó thành nhiều phần và đưa ra lời giải thích đơn giản về từng mô hình. Bằng cách này, bạn có thể hiểu những gì mọi người đang nói như "**hướng đối tượng - Object-oriented programming**", "**hướng chức năng - Functional programming**" hoặc "**hướng khai báo - Declarative programming**"..v..v..

Đây sẽ là một phần giới thiệu lý thuyết hời hợt và ngắn gọn hơn bất cứ thứ gì khác, mặc dù bạn cũng sẽ thấy một số code giả và ví dụ về code.

Mình dự định khám phá sâu từng mô hình với các ví dụ JavaScript thực tế trong tương lai, vì vậy hãy theo dõi mình (bằng cách nhấn vào nút đăng ký bên trái màn hình) nếu bạn quan tâm đến loại bài viết đó.

GÉT GÔ! 🤣

Mục lục
-------

*   [Mô hình lập trình là gì](#what-is-a-programming-paradigm)
*   [Tại sao bạn phải quan tâm nó](#what-a-programming-paradigm-is-not) 
*   [Tại sao mình phải quan tâm?](#why-should-i-care)
*   [Các mô hình lập trình phổ biến](#popular-programming-paradigms)
    *   [Hướng mệnh lệnh - Imperative programming](#imperative-programming)
    *   [Hướng thủ tục - Procedural programming](#procedural-programming)
    *   [Hướng chức năng - Functional programming](#imperative-programming)
    *   [Hướng khai báo - Declarative programming](#imperative-programming)
    *   [Hướng hướng đối tượng - Object-oriented programming](#imperative-programming)
*   [Phần kết](#roundup)

Mô hình lập trình là gì?
========================

Mô hình lập trình là những cách hoặc kiểu khác nhau trong đó một chương trình hoặc ngôn ngữ lập trình nhất định có thể được tổ chức. Mỗi mô hình bao gồm các cấu trúc, tính năng và ý kiến ​​nhất định về cách giải quyết các vấn đề lập trình phổ biến.

Câu hỏi tại sao có nhiều mô hình lập trình khác nhau cũng tương tự như tại sao có nhiều ngôn ngữ lập trình. Một số mô hình nhất định phù hợp hơn với một số loại vấn đề nhất định, vì vậy sẽ hợp lý khi sử dụng các mô hình khác nhau cho các loại dự án khác nhau.

Ngoài ra, việc thực hiện và tạo nên mỗi mô hình đã phát triển theo thời gian. Nhờ những tiến bộ cả về phần mềm và phần cứng, các method tiếp cận khác nhau đã xuất hiện mà trước đây không tồn tại.

Và cuối cùng mình nghĩ, có sự sáng tạo của con người. Là một loài, bạn chỉ thích tạo ra mọi thứ, cải thiện những gì người khác đã xây dựng trong quá khứ và điều chỉnh các công cụ theo sở thích của bạn hoặc những gì có vẻ hiệu quả hơn đối với bạn. 🤓

Tất cả điều này dẫn đến thực tế là ngày nay bạn có nhiều lựa chọn để chọn khi bạn muốn viết và cấu trúc một chương trình nhất định. 🤪

Mô hình lập trình là gì
=======================

Mô hình lập trình không phải là ngôn ngữ hoặc công cụ. Ae không thể "xây dựng" bất cứ thứ gì với một mô hình. Chúng giống như một tập hợp các lý tưởng và hướng dẫn mà nhiều người đã đồng ý, tuân theo và mở rộng ra.

Ngôn ngữ lập trình không phải lúc nào cũng gắn liền với một mô hình cụ thể. Có những ngôn ngữ được xây dựng với một mô hình nhất định và có các tính năng tạo điều kiện thuận lợi cho kiểu lập trình đó hơn những ngôn ngữ khác (VD: Ổng JAVA là OOP).

Nhưng cũng có những ngôn ngữ "đa mô hình", nghĩa là bạn có thể điều chỉnh code của mình để phù hợp với một mô hình nhất định hoặc một mô hình khác (JavaScript và Python là những ví dụ điển hình).

Đồng thời, các mô hình lập trình không loại trừ lẫn nhau, theo nghĩa là bạn có thể sử dụng các method thực hành từ các mô hình khác nhau cùng một lúc mà không có vấn đề gì.

Tại sao mình phải quan tâm?
===========================

Câu trả lời ngắn gọn: kiến thức chung.

Câu trả lời dài: mình thấy rằng thật thú vị khi hiểu nhiều Style lập trình khác nhau. Khám phá những chủ đề này là một cách tốt để mở mang đầu óc và giúp bạn suy nghĩ vượt ra ngoài những công cụ bạn đã biết.

Hơn nữa, những thuật ngữ này được sử dụng rất nhiều trong thế giới CỐT ĐƠ, vì vậy có một sự hiểu biết cơ bản sẽ giúp bạn hiểu rõ hơn về các chủ đề khác.

Mô hình lập trình phổ biến
==========================

Bạn đã hiểu sơ sơ về các mô hình lập trình là gì chưa? 

Hãy cùng xem qua một vài mô hình phổ biến nhất, giải thích các đặc điểm chính của chúng và so sánh chúng.

Hãy nhớ rằng danh sách này không đầy đủ. Có những mô hình lập trình khác không được đề cập ở đây, mặc dù mình sẽ đề cập đến những mô hình phổ biến nhất và được sử dụng rộng rãi nhất.

Lập trình hướng mệnh lệnh - Imperative programming
--------------------------------------------------

Lập trình mệnh lệnh bao gồm các tập hợp các hướng dẫn chi tiết được cung cấp cho máy tính để thực thi theo một thứ tự nhất định. Nó được gọi là "mệnh lệnh" bởi vì là lập trình viên, bạn ra lệnh chính xác những gì máy tính phải làm, theo một cách rất cụ thể.

Lập trình mệnh lệnh tập trung vào việc mô tả _cách_ một chương trình hoạt động, từng bước.

Giả sử bạn muốn nướng bánh. Chương trình của bạn có thể trông như thế này (mình không phải là một đầu bếp giỏi, vì vậy đừng đánh giá mình 😒):

1- Đổ bột mì vào bát
  2- Đập một vài quả trứng vào cùng một bát
  3- Đổ một ít sữa vào cùng một bát
  4- Trộn hết lên
  5- Đổ hỗn hợp vào khuôn
  6- Nấu trong 35 phút
  7- Quất thôi

Sử dụng một ví dụ code thực tế, giả sử bạn muốn lọc một array số để chỉ giữ lại các phần tử lớn hơn 5. code mệnh lệnh của bạn có thể trông như thế này:

```js
const nums = [1, 4, 3, 6, 7, 8, 9, 2]
const result = []

for (let i = 0; i < nums.length; i++) {
  if (nums[i] > 5) result.push(nums[i])
}

console.log(result) 
// Output: [ 6, 7, 8, 9 ]
```

Bạn  đang yêu cầu chương trình lặp lại từng phần tử trong array, so sánh value mục với 5 và nếu mục lớn hơn 5, hãy đẩy nó vào một array.

Bạn đang hướng dẫn chi tiết và cụ thể và đó là viết tắt của lập trình bắt buộc.

Lập trình hướng thủ tục - Procedural programming
------------------------------------------------

Lập trình thủ tục là một dẫn xuất của lập trình mệnh lệnh, thêm vào đó tính năng của các hàm (còn được gọi là "thủ tục" hoặc "chương trình con").

Trong lập trình thủ tục, người dùng được khuyến khích chia nhỏ việc thực thi chương trình thành các chức năng, như một cách để cải thiện tính mô-đun và tổ chức.

Theo ví dụ bánh trước đó thì, lập trình thủ tục có thể trông giống như sau:

```js
function pourIngredients() {
  // Đổ bột vào bát
  // Đập một vài quả trứng vào cùng một bát
  // Đổ một ít sữa vào cùng một bát
}

function mixAndTransferToMold() {
  // Trộn các component với nhau
  // Đổ hỗn hợp vào khuôn
}

function cookAndLetChill() {
  // Nấu trong 35 phút
  // Tận hưởng
}

pourIngredients()
mixAndTransferToMold()
cookAndLetChill()
```

Bạn có thể thấy rằng, nhờ vào việc triển khai các hàm, bạn có thể chỉ cần đọc ba lệnh gọi hàm ở cuối tệp và hiểu rõ về những gì chương trình của bạn thực hiện.

Sự đơn giản hóa và trừu tượng hóa đó là một trong những lợi ích của lập trình thủ tục. Nhưng trong các hàm, bạn vẫn có cùng một code mệnh lệnh cũ.

Lập trình hướng chức năng - Functional programming
--------------------------------------------------

Lập trình hướng chức năng có khái niệm về hàm xa hơn một chút.

Trong lập trình hướng chức năng, các hàm được coi là **first-class citizens**, có nghĩa là chúng có thể được gán cho các biến, được truyền dưới dạng đối số và được trả về từ các hàm khác.

Một khái niệm quan trọng khác là ý tưởng về các **chức năng thuần túy**. Một hàm **thuần túy** là một hàm chỉ dựa vào các đầu vào của nó để tạo ra kết quả của nó. Và được cung cấp cùng một đầu vào, nó sẽ luôn tạo ra cùng một kết quả. Bên cạnh đó, nó không tạo ra tác dụng phụ (bất kỳ thay đổi nào bên ngoài môi trường của chức năng). 😳

Với những khái niệm này, lập trình hướng chức năng khuyến khích các chương trình được viết chủ yếu bằng các hàm (bất ngờ 😲). Nó cũng bảo vệ ý tưởng rằng tính mô-đun code và sự vắng mặt của các tác dụng phụ làm cho việc xác định và phân tách các trách nhiệm trong cơ sở code trở nên dễ dàng hơn. Do đó, nó cải thiện khả năng bảo trì code. 😵

Quay trở lại với ví dụ về lọc array, bạn có thể thấy rằng với mô hình mệnh lệnh, bạn có thể sử dụng một biến bên ngoài để lưu trữ kết quả của hàm, điều này có thể được coi là một tác dụng phụ.

```js
const nums = [1, 4, 3, 6, 7, 8, 9, 2]
const result = [] // Biến bên ngoài

for (let i = 0; i < nums.length; i++) {
  if (nums[i] > 5) result.push(nums[i])
}

console.log(result)
// Output: [ 6, 7, 8, 9 ]
```

Để chuyển nó thành lập trình hướng chức năng, bạn có thể làm như sau:

```js
const nums = [1, 4, 3, 6, 7, 8, 9, 2];

function filterNums() {
  const result = []; // Biến nội bộ

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 5) result.push(nums[i]);
  }

  return result;
}

console.log(filterNums());
// Output: [ 6, 7, 8, 9 ]
```

Nó gần giống như một đoạn code, nhưng bạn bao bọc quá trình lặp lại của bạn trong một hàm, trong đó chúng ta cũng lưu trữ array kết quả. Bằng cách này, bạn có thể đảm bảo rằng hàm không sửa đổi bất cứ điều gì bên ngoài phạm vi của nó. Nó chỉ tạo một biến để xử lý thông tin của chính nó và khi quá trình thực thi kết thúc, biến đó cũng biến mất.

Lập trình hướng khai báo - Declarative programming
--------------------------------------------------

Lập trình khai báo là tất cả về việc che giấu sự phức tạp và đưa các ngôn ngữ lập trình đến gần hơn với ngôn ngữ và tư duy của con người. 😱Nó đối lập trực tiếp với lập trình mệnh lệnh theo nghĩa là lập trình viên không đưa ra hướng dẫn về _cách_ máy tính sẽ thực thi tác vụ, mà là về _kết_ quả cần thiết. 😨 

Điều này sẽ rõ ràng hơn nhiều với một ví dụ. 😰Theo cùng một câu chuyện lọc array, cách tiếp cận theo hướng khai báo có thể là:

```js
const nums = [1, 4, 3, 6, 7, 8, 9, 2]

console.log(
  nums.filter((num) => num > 5)
) // Output: [ 6, 7, 8, 9 ]
```

Hãy thấy rằng với chức năng bộ lọc, bạn không yêu cầu máy tính lặp lại một cách rõ ràng trong array hoặc lưu trữ các value trong một array riêng biệt. bạn chỉ nói những gì bạn muốn ("bộ lọc") và điều kiện cần được đáp ứng ("num> 5").

Điều tuyệt vời về điều này là nó dễ đọc và dễ hiểu hơn và thường ngắn hơn để viết. các hàm JavaScript `filter`và `map`**reduce** **sort** là những ví dụ điển hình về code hướng khai báo. 🤪

Một ví dụ điển hình khác là các **framework/library JS** hiện đại như **React**. 

Lấy code này làm ví dụ:

```html
<button
  onClick={() =>
    console.log('You clicked me!')
  }>
  Click me
</button>
```

Ở đây bạn có một phần tử **button**, với một trình xử lý sự kiện sẽ kích hoạt một hàm **console.log** khi **button** được **click**.

Cú pháp **JSX** (những gì **React** sử dụng) kết hợp **HTML** và **JS** trong cùng một thứ, giúp viết ứng dụng dễ dàng và nhanh hơn. Nhưng đó không phải là những gì trình duyệt đọc và thực thi. **C****ode React** sau đó được chuyển thành **HTML** và **JS** thông thường, và đó là những gì các trình duyệt chạy trong thực tế.

**JSX** mang tính khai báo, theo nghĩa mục đích của nó là cung cấp cho các nhà phát triển một giao diện thân thiện hơn và hiệu quả hơn để làm việc. (Đấy bạn thấy chưa nhìn vậy nhưng ko phải vậy nhé 🤓)

Một điều quan trọng cần lưu ý về lập trình hướng khai báo là dù sao thì máy tính cũng xử lý thông tin này dưới dạng **code mệnh lệnh**.

Theo ví dụ về array, máy tính vẫn lặp lại array giống như trong vòng lặp for, nhưng với tư cách là lập trình viên, bạn không cần phải viết code trực tiếp. Những gì lập trình khai báo làm là **che giấu** sự phức tạp đó khỏi cái nhìn trực tiếp của người lập trình.

Đây là một video hay trên youtube [so sánh giữa lập trình mệnh lệnh và lập trình khai báo.](https://www.youtube.com/watch?v=E7Fbf7R3x6I)

Lập trình hướng đối tượng
-------------------------

Một trong những mô hình lập trình phổ biến nhất là lập trình hướng đối tượng (OOP).

**Quả OOP này mới chất chơi người dơi này****😱****. Bạn thường phải học 1-2 học phần ở đại học (4-8 chỉ) tùy trường => Bạn nào mà lơ tơ mở không qua môn thì đi ăn cắp ngay.****🤣**

Khái niệm cốt lõi của OOP là tách các mối quan tâm thành các thực thể được code hóa thành các đối tượng. Mỗi thực thể sẽ nhóm một tập hợp thông tin (thuộc tính) và các hành động (method) nhất định có thể được thực hiện bởi thực thể.

OOP sử dụng nhiều lớp (Class là một cách tạo các đối tượng mới dựa trên bản thiết kế hoặc bản mẫu mà bạn đặt ra). Các đối tượng được tạo từ một lớp được gọi là **instances**.

Theo ví dụ nấu ăn, bây giờ giả sử trong tiệm bánh của bạn có một đầu bếp chính (gọi là Frank) và một phụ bếp (gọi là Anthony) và mỗi người sẽ có những trách nhiệm nhất định trong quá trình nướng boánh. Nếu bạn sử dụng OOP, chương trình của bạn có thể trông như thế này.

```js
// Tạo hai lớp tương ứng với mỗi thực thể
class Cook {
  constructor(name) {
    this.name = name
  }

  mixAndBake() {
    // Trộn các component lại với nhau
    // Đổ hỗn hợp vào khuôn
    // Nấu trong 35 phút
  }
}

class AssistantCook {
  constructor(name) {
    this.name = name
  }

  pourIngredients() {
    // Đổ bột vào bát
    // Đập một vài quả trứng vào
    // Đổ một ít sữa vào cùng một bát
  }

  chillTheCake() {
    // Chén thôi
  }
}

// Khởi tạo các đối tượng tương ứng
const Frank = new Cook('Frank')
const Anthony = new AssistantCook(
  'Anthony'
)

// Gọi các method tương ứng
Anthony.pourIngredients()
Frank.mixAndBake()
Anthony.chillTheCake()
```

Điều tốt đẹp về OOP là nó tạo điều kiện cho sự hiểu biết về một chương trình, bằng cách tách bạch rõ ràng các mối quan tâm và trách nhiệm.

Trong ví dụ này, mình đã chỉ sơ lược bề mặt của nhiều tính năng của OOP. Nếu bạn muốn biết thêm, đây là hai video tuyệt vời giải thích những điều cơ bản về OOP:

*   [OOP video 1](https://www.youtube.com/watch?v=cg1xvFy1JQQ)
*   [OOP video 2](https://www.youtube.com/watch?v=pTB0EiLXUC8)

Và [đây là một so sánh tuyệt vời giữa lập trnh mệnh lệnh, chức năng và hướng đối tượng.](https://www.youtube.com/watch?v=08CWw_VD45w)

Cuối cùng
---------

Như bạn đã thấy, mô hình lập trình là những cách khác nhau mà bạn có thể đối mặt với các vấn đề trong lập trình và tổ chức code của mình.

Các mô hình hướng mệnh lệnh, thủ tục, chức năng, khai báo và hướng đối tượng là một số mô hình phổ biến và được sử dụng rộng rãi nhất hiện nay. Và biết những điều cơ bản về chúng sẽ tốt cho kiến ​​thức chung và cũng để hiểu rõ hơn về các chủ đề khác.

Như mọi khi, mình hy vọng bạn thích bài viết và học được điều gì đó mới. 

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy thích blog của mình thì nhấn theo dõi để ủng hộ mình nhé. Thank you bạn.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/09/blog3-mot-so-mo-hinh-lap-trinh-pho-bien.html
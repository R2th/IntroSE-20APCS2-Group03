![image.png](https://images.viblo.asia/f95da4aa-f3e2-4b29-8ef5-c2ca8bc44d2c.png)

Mình là **TUẤN** hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Trong bài viết ngắn này, mình sẽ nói về kế thừa prototype trong JavaScript và ý nghĩa của nó là gì.

# Mục lục

*   [Giới thiệu](#intro)
*   [Cách truy cập các thuộc tính và method của prototype trong JavaScript](#how-to-access-a-prototype-s-properties-and-methods-in-javascript)
*   [Chuỗi prototype](#the-prototype-chain)
*   [Một ngôn ngữ dựa trên protorype](#a-prototype-based-language)
*   [Các lớp Javascript](#javascript-classes)
*   [Roundup](#roundup)

Giới thiệu
==========

Bạn đã bao giờ tự hỏi làm thế nào mà các string, array hoặc đối tượng “**biết**” các method mà chúng có? Làm thế nào để một string biết rằng nó có thể `.toUpperCase()`hoặc một array biết rằng nó có thể `.sort()`? Ae chưa bao giờ code các method này theo cách thủ công, phải không?

Câu trả lời là những phương thức này được tích hợp sẵn trong mỗi kiểu cấu trúc dữ liệu nhờ một thứ gọi là **kế thừa** **prototype**.

Trong JavaScript, một đối tượng có thể kế thừa các thuộc tính của một đối tượng khác. Đối tượng mà từ đó các thuộc tính được kế thừa được gọi là **prototype**. Tóm lại, các đối tượng có thể kế thừa các thuộc tính từ các đối tượng khác - các **prototype**.

Có lẽ bạn đang tự hỏi: tại sao lại cần kế thừa ngay từ đầu? Vâng, kế thừa giải quyết vấn đề trùng lặp dữ liệu và logic. Bằng cách kế thừa, các đối tượng có thể chia sẻ các thuộc tính và method mà không cần thiết lập thủ công các thuộc tính và phương thức đó trên mỗi đối tượng.

# Cách tiếp cận Properties của Prototype và Methods trong JavaScript

Khi bạn cố gắng truy cập một thuộc tính của một đối tượng, thuộc tính đó không chỉ được tìm kiếm trong chính đối tượng đó. Nó cũng được tìm kiếm trong **prototype** của đối tượng, trong **prototype** của **prototype**, v.v. - cho đến khi tìm thấy một thuộc tính khớp với tên hoặc phần cuối của **string** **prototype**.

Nếu thuộc tính hoặc phương thức không được tìm thấy ở bất kỳ đâu trong string **prototype**, thì chỉ khi đó JavaScript mới trả về `undefined`.

Mọi đối tượng trong JavaScript đều có một thuộc tính nội bộ được gọi `[[Prototype]]`.**

Nếu bạn tạo một array và đăng nhập nó vào bảng điều khiển như thế này:

```js
const arr = [1,2,3]
console.log(arr)
```

bạn sẽ thấy điều này:

![image.png](https://images.viblo.asia/cdb8619c-a97f-4824-998f-41b1f96552ec.png)

Dấu ngoặc vuông kép bao quanh `[[Prototype]]`biểu thị rằng nó là một thuộc tính nội bộ và không thể được truy cập trực tiếp trong code.

Để tìm đối tượng **\[\[Prototype\]\]**, bạn sẽ sử dụng `Object.getPrototypeOf()` method này.

```js
const arr = [1, 2, 3];
console.log(Object.getPrototypeOf(arr));
```

Đầu ra sẽ bao gồm một số thuộc tính và method được tích hợp sẵn:

![image.png](https://images.viblo.asia/7a79b3e5-c183-417f-8e23-5291c8c02abc.png)

Hãy nhớ rằng các **Prototype** cũng có thể được thay đổi và sửa đổi thông qua các phương pháp khác nhau.

# Prototype Chain

Vào cuối của string **Prototype** là `Object.prototype`. Tất cả các đối tượng kế thừa các thuộc tính và method của `Object`. Bất kỳ nỗ lực nào để tìm kiếm ngoài phần cuối của string đều dẫn đến kết quả `null`.

Nếu bạn tìm kiếm **Prototype** của **Prototype** của một array, một hàm hoặc một string, bạn sẽ thấy đó là một đối tượng. Và đó là bởi vì trong JavaScript tất cả các đối tượng là con cháu hoặc là một phiên bản của `Object.prototype`, là một đối tượng đặt thuộc tính và method cho tất cả các kiểu dữ liệu **JavaScript** khác.

```js
const arr = [1, 2, 3];
const arrProto = Object.getPrototypeOf(arr);
console.log(Object.getPrototypeOf(arrProto));
```

![image.png](https://images.viblo.asia/6f148a48-989a-4e2b-af52-15737199b9f2.png)

Mỗi kiểu **Prototype** (ví dụ: **Prototype của** array) xác định các method và thuộc tính riêng của nó, và trong một số trường hợp, ghi đè các method **Object.prototype** và thuộc tính (đó là lý do tại sao array có các method mà đối tượng không có).

Nhưng dưới mui xe và đi lên bậc thang của string nguyên mẫu, **mọi thứ trong JavaScript đều được xây dựng dựa trên `Object.prototype`.**

Nếu bạn cố gắng truy cập nguyên mẫu của `Object.prototype` bạn nhận được `null`.

```js
const arr = [1, 2, 3];
const arrProto = Object.getPrototypeOf(arr);
const objectProto = Object.getPrototypeOf(arrProto);
console.log(Object.getPrototypeOf(objectProto));
```

![image.png](https://images.viblo.asia/86190fd5-713f-449a-bd9c-eaa0f92bd04f.png)

# Javascript là một ngôn ngữ dựa trên Prototype

**JavaScript** là một **ngôn ngữ dựa trên** **Prototype**, có nghĩa là các thuộc tính và method của đối tượng có thể được chia sẻ thông qua các đối tượng tổng quát có khả năng được nhân bản và mở rộng.

Khi nói đến tính kế thừa, **JavaScript** chỉ có một cấu trúc: **các đối tượng.**

Mỗi đối tượng có một thuộc tính riêng (được gọi là của nó `[[Prototype]]`) duy trì một liên kết đến một đối tượng khác được gọi là **Prototype** của nó. Đối tượng **Prototype** đó có **Prototype** của riêng nó, và cứ tiếp tục như vậy cho đến khi đạt được đối tượng có nguyên mẫu `null`. 😵

Theo định nghĩa, `null` không có **Prototype** và đóng vai trò là mắt xích cuối cùng trong string **Prototype** này.

Đây được gọi là kế thừa **Prototype** và khác với kế thừa lớp. Trong số các ngôn ngữ lập trình hướng đối tượng phổ biến, JavaScript tương đối độc đáo, vì các ngôn ngữ nổi bật khác như PHP, Python và Java là các ngôn ngữ dựa trên lớp, thay vào đó định nghĩa các lớp là bản thiết kế cho các đối tượng.

Tại thời điểm này, mình biết bạn đang rất bối rối vì cứ **Prototype** rồi lại **Prototype**🤫🤔.  Không sao mình hiểu mà, các anh em chỉ cần nhớ 1 điều đó là ngoài trừ mấy cái kiểu dữ liệu nguyên thuỷ như number, string, boolean... ra thì tất cả đều là **Object**. Và thằng **Object** nó có **Prototype =>** **JavaScript** là một **ngôn ngữ dựa trên** **Prototype.**

# Các lớp Javascript

Các lớp là một cách để thiết lập một bản thiết kế nhằm tạo ra các đối tượng với các thuộc tính và phương thức được xác định trước. Bằng cách tạo một lớp với các thuộc tính và phương thức cụ thể, sau này bạn có thể khởi tạo các đối tượng từ lớp đó, lớp đó sẽ kế thừa tất cả các thuộc tính và method mà lớp đó có.

Trong JavaScript, bạn có thể tạo các lớp theo cách sau:

```js
class Alien {
  constructor(name, phrase) {
    this.name = name
    this.phrase = phrase
    this.species = 'alien'
  }
  fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!')
  sayPhrase = () => console.log(this.phrase)
}
```

Và sau đó bạn có thể khởi tạo một đối tượng từ lớp đó như thế này:

```js
const alien1 = new Alien('Ali', "I'm Ali the alien!");
console.log(alien1.name); // output: "Ali"
```

Các lớp được sử dụng như một cách để làm cho code mô-đun, có tổ chức và dễ hiểu hơn và được sử dụng nhiều trong lập trình OOP.

Nhưng hãy nhớ rằng **JavaScript** không thực sự hỗ trợ các lớp (**class)** như các ngôn ngữ khác. Từ key **class** được giới thiệu với ES6 như là một cú pháp tạo điều kiện thuận lợi cho cách tổ chức code này.

Để hình dung điều này, hãy xem điều tương tự mà chúng ta đã phải làm để tạo một thứ như là  **class** **Alien** ở trên nhé**.**

Lúc chưa có từ khoá **class** bạn có thể thực hiện bằng cách xác định một **hàm** và chỉnh sửa nguyên mẫu theo cách sau (hoặc giờ vẫn có thể dùng cách này nếu bạn muốn):

```js
function Alien(name, phrase) {
  this.name = name;
  this.phrase = phrase;
  this.species = 'alien';
}

Alien.prototype.fly = () => console.log('Zzzzzziiiiiinnnnnggggg!!');
Alien.prototype.sayPhrase = () => console.log(this.phrase);

const alien1 = new Alien('Ali', "I'm Ali the alien!");

console.log(alien1.name); // output "Ali"
console.log(alien1.phrase); // output "I'm Ali the alien!"
alien1.fly(); // output "Zzzzzziiiiiinnnnnggggg"
```

Bất kỳ **hàm** nào cũng có thể được gọi như một method khởi tạo với keyword **new** và thuộc tính **Prototype** của hàm đó được sử dụng cho đối tượng để kế thừa các method từ đó. Trong JavaScript, “**lớp**” chỉ được sử dụng về mặt khái niệm để mô tả hoạt động ở trên - về mặt kỹ thuật, chúng chỉ là các **hàm**.😑

Mặc dù điều này không nhất thiết tạo ra nhiều khác biệt (bạn vẫn có thể triển khai OOP và sử dụng các lớp một cách hoàn hảo như trong hầu hết các ngôn ngữ lập trình khác), nhưng điều quan trọng cần nhớ là JavaScript được xây dựng với sự kế thừa **Prototype** ở cốt lõi của nó.

Cuối cùng
=========

Ngoài lề một chút, nếu bạn nào có xem **truyện kiếm hiệp kim dung** thì biết có môn võ công là **Tiểu Vô Tướng Công** mà thanh niên **Hư Trúc** sở hữu thật là ảo diệu vô song. (Hư Trúc: bạn có nghe Đen vâu hát "...muốn làm trường môn phải tiêu dao..." chính là muốn được trở thành thanh niên này). Với môn võ này thì có thể nhái lại mọi loại võ công. Nhìn biên ngoài thì rất giống nhưng thực ra bản chất thì ko phải. 

Same Class trong JS nhìn giống Class của mấy ngôn ngữ OOP đấy nhưng thực ra bản chất chỉ là **Prototype.** Và với môn võ công **Prototype** này thì JS có thể hoá thân thành rất nhiều thứ khác.

Như mọi khi, mình hy vọng bạn thích bài viết này và học được điều gì đó mới. 

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy thích blog của mình thì nhấn theo dõi để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/09/blog5-nguyen-mau-va-ke-thua-javascript.html
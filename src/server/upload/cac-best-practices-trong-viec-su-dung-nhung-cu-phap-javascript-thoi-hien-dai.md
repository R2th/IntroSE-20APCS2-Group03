# Mở đầu
Là những lập trình viên Javascript thời buổi nay, chắc có rất nhiều người trong chúng ta đều đã từng gặp phải một trường hợp khiến ta rất chi là đau đầu. Đó là việc khi code một đoạn logic nào đó chúng ta phải đứng giữa vô vàn sự lựa chọn giữa các cú pháp trong Javascript. Nếu như thời xưa hoặc một số ngôn ngữ lập trình khác, chúng ta có thể chỉ có một cú pháp để giải quyết một vấn đề logic nào đó hoặc có nhiều cú pháp nhưng sự khác biệt giữa các cú pháp khá rõ ràng và có các trường hợp sử dụng riêng, thì với Javascript thời nay có rất nhiều cú pháp giúp ta tiện lợi hơn khi phải giải quyết một vấn đề nào đó và chúng khá là tương đồng nhau khi ta không tìm hiểu đủ sâu đủ kĩ về nó. Nhưng thật không may khi đó lại trở thành con dao hai lưỡi khi chúng ta được free code, không được ai hướng dẫn hay bắt buộc phải theo một convention nào, khi ta chưa có đủ kiến thức và kinh nghiệm để phân biệt lúc nào nên sử dụng cú pháp đó. Cũng vì điều đó, nên có lẽ chúng ta nhiều khi cũng nên tự xây dựng, sưu tầm cho mình một bộ quy tắc riêng khi code, điển hình khi code Javascript. Và dưới đây mình cũng đã sưu tầm được một bài viết để có thể đưa vào bộ quy tắc code Javascript của riêng mình.

Javascript thời hiện đại đang phát triển vô cùng nhanh chóng để có thể đáp ứng được các thay đổi trong nhu cầu về framework mới hay môi trường mới. Việc có thể hiểu được cách tận dụng các lợi thế, điểm mạnh của những sự thay đổi ấy có thể giúp cho bạn tiết kiệm được rất nhiều thời gian, nâng cao hoàn thiện bộ kĩ năng của bản thân, và đánh dấu sự khác biệt giữa code tốt và code tuyệt vời. Và việc hiểu biết được những thay đổi cũng giúp cho bạn có thể quyết định được khi nào cần dùng các cú pháp mới để có thể đạt được hiệu quả cao, và khi nào thì việc sử dụng các cú pháp cũ vẫn hợp lý.

Bài viết này tóm gọn một số điểm chính trong quyển sách [Javascript: Best Practice](https://www.sitepoint.com/premium/books/javascript-best-practice?ref_source=sitepoint&ref_medium=article_copy&ref_campaign=js-best-practice)

# Cần bám lấy, nắm chắc các kiến thức nền tảng
Thật là khó để có thể tìm thấy một ai mà cảm thấy không hề bối rối hay loạn với tình trạng Javascript những ngày nay, cho dù họ là người mới học Javascript hay là người đã code ngôn ngữ này được một thời gian. Thực sự có quá nhiều các framework mới, quá nhiều sự thay đổi trong Javascript và có quá nhiều trường hợp, ngữ cảnh cần được xét đến. Quả là một điều "ngạc nhiên" khi ai đó có thể hoàn thành bất cứ công việc nào bằng tất cả những điều mới mẻ mà ta "phải" học mỗi tháng.

Mình tin rằng chìa khóa cho sự thành công với bất kì một ngôn ngữ lập trình nào, bất kể ứng dụng có phức tạp đến đâu đi chăng nữa, là nắm vững được kiến thức cơ bản. Nếu bạn muốn hiểu được Rails, hãy rèn luyện kĩ năng lập trình Ruby của mình, hay nếu bạn muốn sử dụng [immutables](https://www.sitepoint.com/immutable-data-functional-javascript-mori/) hay luồng dữ liệu một chiều ([unidirectional data flow](https://www.sitepoint.com/video-introducing-one-way-data-flow/)) cho [React](https://www.sitepoint.com/universal-react-rendering-sitepoint/) cùng với [webpack](https://www.sitepoint.com/bundle-static-site-webpack/), hãy bắt đầu bằng việc hiểu một chút về phần core của Javascript.

Việc hiểu được cách một ngôn ngữ lập trình hoạt động sẽ thực tiễn hơn rất nhiều so với việc bạn cố gắng làm quen với các framework và môi trường mới nhất. Những thay đổi đó thậm chí còn nhanh hơn cả thời tiết. Và với Javascrip thuần, chúng ta đã có một danh sách dài các thông tin hữu ích trên mạng về cách mà nó hoạt động hay cách dùng nó hiệu quả như thế nào.

# Tránh "nghiện" các sự thay đổi mới
Có rất nhiều các thay đổi mới trong Javascript vào các năm gần đây được ví như các "viên đường" cú pháp bổ sung cho các cú pháp có sẵn khiến chúng "ngọt" hơn, "dễ uống" hơn. Trong nhiều trường hợp, những "viên đường" ấy có thể sẽ giúp cho các lập trình viên Java dễ dàng "nuốt trôi" được cách làm việc với Javascript, hay tất cả chúng ta chỉ mong muốn có một cách đơn giản hơn, gọn gàng hơn để hoàn thành một việc mà tất cả chúng ta đều đã biết cách giải quyết. Những thay đổi đem đến cho chúng ta những khả năng kì diệu mới khác.

Nhưng nếu bạn cố sử dụng hay lạm dụng các cú pháp hiện đại để tái lập lại các phương pháp cũ, hoặc cứ dùng chúng bừa bãi mà không cần hiểu xem thực sự chúng hoạt động như nào, bạn sẽ có nguy cơ gặp phải:
* Việc phải debug các đoạn code vốn đã hoạt động vô cùng hoàn hảo trước đây.
* Gây ra một vài lỗi ngầm có thể sẽ xuất hiện trong lúc chạy.
* Tạo ra một đoạn code thất bại một cách âm thầm khi mà bạn ít ngờ tới nhất.

Thực tế, có rất nhiều những thay đổi trông có vẻ là một sự thay thế hoàn toàn cho các kĩ thuật cũ nhưng thực ra lại hoạt động khác hoàn toàn so với đoạn code mà đáng lẽ ra chúng thay thế. Trong nhiều trường hợp, việc sử dụng các kĩ thuật nguyên thủy, phong cách cũ hơn sẽ là hợp lý để có thể hoàn thành vấn đề bạn đang cố gắng giải quyết.
Nhận ra được những điều đang diễn ra, và biết được cách để đưa ra quyết định đúng là những điều vô cùng cần thiết trong việc viết một đoạn Javascript hiệu quả thời nay.

# Khi mà `const` không hẳn lúc nào bất biến
Javascript thời hiện đại đã đem đến cho chúng ta 2 từ khóa mới, đó là `let` và `const`, những từ khóa thay thế hiệu quả cho nhu cầu sử dụng từ khóa `var` cho việc khai báo biến trong hầu hết các trường hợp. Nhưng 2 từ khóa đó không hoạt động y hệt như từ khóa `var`.

Theo Javascript truyền thống, việc khai báo các biến của bạn với từ khóa `var` trước khi sử dụng chúng luôn luôn là một thói quen code cho việc code clean. Nếu không làm điều đó đồng nghĩa với việc biến của bạn khai báo ra có thể sẽ được truy cập trong phạm vi toàn cục bởi bất kì một đoạn script nào được chạy trong cùng context đó. Và bởi vì Javascript truyền thống thường được chạy trên các trang web nơi mà rất nhiều các đoạn script có thể sẽ đc load đồng thời cùng nhau, điều đó có nghĩa rằng các biến được khai báo ở trong 1 đoạn script bất kì có khả năng sẽ bị leak, trùng sang các đoạn script khác.

Sự thay thế sạch sẽ, gọn gàng nhất cho từ khóa `var` trong Javascript thời hiện đại đó là từ khóa `let`. Nhưng từ khóa này sở hữu một vài tính chất khiến chúng ta có thể phận biệt nó với `var`. Các biến được khai báo với từ khóa `var` luôn mặc định được đẩy lên thứ tự ưu tiên cao nhất trong phạm vi nó được khai báo, mặc cho việc nó được đặt ở bất cứ đâu bên trong phạm vi đó. Điều đó có nghĩa là ngay cả một biến được nest rất sâu cũng có thể coi là đã được khai báo, xuất hiện và có thể được sử dụng ngay từ đầu trong phạm vi khai báo. Nhưng điều tương tự không xảy ra với `let` hay `const`.

```
console.log(usingVar); // undefined
var usingVar = "defined";
console.log(usingVar); // "defined"

console.log(usingLet); // error
let usingLet = "defined"; // không bao giờ được thực thi
console.log(usingLet); // không bao giờ được thực thi
```

Khi bạn khai báo một biến với từ khóa `let` hay `const`, phạm vi cho biến đó bị giới hạn bởi block cục bộ nơi nó được khai báo. Một block trong Javascript được nhận biết bằng cặp dấu ngoặc nhọn `{}`, như là thân của một hàm hoặc đoạn code được thực thi bên trong các hàm loop.

Đây là một điều khá tiện lợi cho việc sử dụng biến trong phạm vi khai báo block như các iterator hay loop. Như trước đây, các biến được khai báo trong các loop có thể được truy cập ở bên ngoài nó và trong phạm vi nơi loop được khai báo, dẫn đến việc gây khó hiểu khi nhiều nơi có thể sử dụng cùng tên biến đó. Nhưng `let` có thể sẽ khiến cho bạn ngạc nhiên nếu bạn khai báo biến ở một block trong đoạn script của bạn và mong muốn nó xuât hiện được ở một nơi khác.

```
for (var count = 0; count < 5; count++) {
  console.log(count);
} // in 0 - 4  ra console
console.log(count); // 5


for (let otherCount = 0; otherCount < 5; otherCount++) {
  console.log(otherCount);
} // in 0 - 4 ra console
console.log(otherCount); // error, otherCount is undefined
```

Một cách khai báo khác đó là `const`, từ khóa đáng nhẽ ra biểu thị cho việc khai báo một hằng số. Nhưng nó lại không hoàn toàn bất biến.

Một `const` không thể khai báo mà không được gán giá trị, khác với các biến `var` hay `let`.

```
var x; // valid
let y; //valid
const z; // error
```

Một `const` cũng sẽ throw ra error nếu bạn cố set giá trị mới cho nó sau khi nó đã được khai báo.

```
const z = 3; // valid
z = 4; // error
```

Nhưng nếu bạn mong chờ rằng biến `const` của bạn bất biến trong mọi trường hợp, thì có lẽ bạn sẽ gặp phải bất ngờ khi một object hay array được khai báo bằng `const` vẫn cho phép bạn thay đổi nội dung của nó.

```
const z = []; // valid
z.push(1); // valid, và z bây giờ là [1]
z = [2] // error
```

Và chính vì lý do này mà mình vẫn thấy hoài nghi khi mọi người khuyên sử dụng `const` thường xuyên hơn để thay thế cho `var` cho tất cả việc khai báo biến, ngay cả khi bạn không bao giờ có ý định thay đổi các biến đó sau khi nó được khai báo.

Khi việc coi các biến của bạn khai báo ra là bất biến trở thành một thói quen tốt, thì Javascript lại không hỗ trợ việc đó cho nội dung của các biến tham chiếu như array và object được khai báo bằng từ khóa `const` mà không có sự trợ giúp từ các đoạn script bên ngoài. Thế nên từ khóa `const` có thể sẽ khiến cho những người không nghiên cứu kĩ hay những người mới học Javascript mong chờ nhiều hơn về tính bảo mật mà thực tế nó mang đến.

Mình thường nghiêng về việc sử dụng `const` cho các số đơn giản hay các biến string mà mình muốn khởi tạo và không bao giờ thay đổi, hoặc cho việc đặt tên các hàm, class mà mình muốn khai báo một lần và tránh điều chỉnh lại. Trong hầu hết các trường hợp còn lại thì mình sử dụng `let` cho việc khai báo biến thông thường - đặc biệt là các biến mà mình muốn chỉ được phép truy cập trong phạm vi nơi nó được khai báo. Gần đây mình thấy rất ít các trường hợp phải sử dụng `var`, nhưng nếu mình muốn việc khai báo biến có khả năng phá vỡ phạm vi và đưa biến đó lên thứ tự ưu tiên nhất trong script thì `var` sẽ là lựa chọn của mình.

# Hạn chế phạm vi hoạt động của Function
Các function truyền thống được định nghĩa bằng cách sử dụng từ khóa `function`, có thể được gọi để thực thi hàng loạt các câu lệnh được khai báo bên trong một block với bất kì tham số nào được truyền vào và có thể sẽ trả về một giá trị nào đó:

```
function doSomething(param) {
  return(`Did it: ${param}`);
}
console.log(doSomething("Hello")); // "Did it: Hello"
```

Chúng cũng có thể được sử dụng với từ khóa `new` để xây dựng một object có khả năng được kế thừa và định nghĩa của nó có thể được đặt bất cứ đâu bên trong phạm vi nơi nó có thể được gọi:

```
function Animal(name) {
  this.name = name;
}
let cat = new Animal("Fluffy");
console.log(`My cat's name is ${cat.name}.`); // "My cat's name is Fluffy."
```

Các function được sử dụng theo bất cứ cách nào trong 2 cách trên đều có thể được định nghĩa trước hoặc sau khi nó được gọi. Nó không phải vấn đề với Javascript.

```
console.log(doSomething("Hello")); // "Did it: Hello"

let cat = new Animal("Fluffy");
console.log(`My cat's name is ${cat.name}.`); // "My cat's name is Fluffy."

function doSomething(param) {
  return(`Did it: ${param}`);
}
function Animal(name) {
  this.name = name;
}
```

Một function truyền thống cũng có thể tạo một context riêng của nó, định nghĩa một giá trị cho `this` mà chỉ tồn tại trong phạm vi thân hàm. Bất kì một lệnh hay function phụ nào được định nghĩa bên trong nó đều được thực thi, và có thể cho phép ta bind giá trị cho `this` khi gọi hàm.

Có quá nhiều từ khóa phải sử dụng, và thường thì nhiều hơn những gì một lập trình viên cần tại một thời điểm nào đó. Thế nên Javascript thời nay đã tách cách hoạt động của function truyền thống thành các arrow function và class.

# Sử dụng Class đúng thời điểm
MỘt phần của `function` truyền thống đã được thay thế bởi từ khóa `class`. Điều này cho phép lập trình viên chọn giữa việc họ muốn theo mô hình functional programming với các hàm arrow function, hay sử dụng phương pháp hướng đối tượng hơn với từ khóa `class` thay thế cho việc khả năng đại diện các object có thể được kế thừa của function truyền thống. 

Class trong Javascript nhìn và hoạt động giống như các class đơn giản ở các ngôn ngữ lập trình hướng đối tượng khác, và có thể là một bước đệm dễ dàng cho các lập trình viên Java hay C++ bước chân vào thế giới Javascript khi Javascript mở rộng sang lập trình phía server.

Một điểm khác nhau giữa function và class khi thực hiện lập trình hướng đối tượng trong Javascript đó là class trong Javascript yêu cầu việc khai báo trước. Một `class` cần được khai báo trong đoạn script trước khi nó được khởi tạo thông qua từ khóa `new`. Việc kế thừa mẫu sử dụng từ khóa `function` ngay cả khi nó được khai báo sau trong đoạn script là điều có thể, vì các khai báo qua từ khóa `function` đều được đẩy lên trên đầu, khác với `class`.

```
// Sử dụng function để khai báo và khởi tạo một object (không cần đúng thứ tự)
let aProto = new Proto("Myra");
aProto.greet(); // "Hi Myra"

function Proto(name) {
  this.name = name;
  this.greet = function() {
    console.log(`Hi ${this.name}`);
  };
};

// Sử dụng class để khai báo và khởi tạo một object (phải theo thứ tự)
class Classy {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hi ${this.name}`);
  }
};

let aClassy = new Classy("Sonja");
aClassy.greet(); // "Hi Sonja"
```

# Áp dụng những điểm khác biệt với Arrow Function
Một mặt khác của các function truyền thống có thể được truy nhập bằng cách sử dụng arrow function, một cú pháp mới cho phép bạn viết một hàm có thể gọi lại một cách chính xác, vừa vặn hơn trong việc sử dụng làm callback. Thực tế, cách sử dụng đơn giản nhất của arrow function là cách khai báo chỉ trên một dòng mà không cần thiết dùng đến cặp ngoặc nhọn `{}`, và tự động trả về kết quả của lệnh được thực thi:

```
const traditional = function(data) {
  return (`${data} from a traditional function`);
}
const arrow = data => `${data} from an arrow function`;

console.log(traditional("Hi")); // "Hi from a traditional function"
console.log(arrow("Hi"));  // "Hi from an arrow function"
```

Arrow function bao gồm rất nhiều tính chất khiến cho việc gọi chúng trở nên tiện lợi hơn, và bỏ qua các tính chất không quá hữu dụng khi gọi một function bình thường. Arrow function không hẳn là sự thay thế cho từ khóa `function` với nhiều tính năng đa dạng.

Ví dụ, một arrow function có thể thừa kế cả `this` và `tham số` từ context nơi nó được gọi. Đây là một điều tuyệt vời cho trường hợp xử lý event hay sử dụng hàm `setTimeout` khi mà một lập trình viên thường muốn kết quả của các xử lý được áp dụng thẳng vào context nơi nó được gọi. Các function truyền thống buộc các lập trình viên phải viết các đoạn code phức tạp để có thể bind function vào `this` của nơi nó được gọi sử dụng `.bind(this)`. Tất cả những điều đó là không cần thiết khi sử dụng arrow function.

```
class GreeterTraditional {
  constructor() {
    this.name = "Joe";
  }
  greet() {
    setTimeout(function () {
      console.log(`Hello ${this.name}`);
    }, 1000); // function bên trong có ngữ cảnh this riêng của nó và không chứa name
  }
}
let greeterTraditional = new GreeterTraditional();
greeterTraditional.greet(); // "Hello "

class GreeterBound {
  constructor() {
    this.name = "Steven";
  }
  greet() {
    setTimeout(function () {
      console.log(`Hello ${this.name}`);
    }.bind(this), 1000); // truyền ngữ cảnh this từ bên ngoài vào trong
  }
}
let greeterBound = new GreeterBound(); // "Hello Steven"
greeterBound.greet();

class GreeterArrow {
  constructor() {
    this.name = "Ravi";
  }
  greet() {
    setTimeout(() => {
      console.log(`Hello ${this.name}`);
    }, 1000); // arrow function măc định thừa kế this
  }
}
let greeterArrow = new GreeterArrow();
greeterArrow.greet(); // "Hello Ravi"
```

# Kết luận
Javascript thời nay giới thiệu rất nhiều thay đổi mới vì các tính năng mới là cần thiết và được yêu cầu. Nhưng điều đó không có nghĩa rằng các lý do để sử dụng các cú pháp truyền thống đã mất. Thường thì sẽ hợp lý và dễ hiểu khi tiếp tục sử dụng cú pháp Javascript truyền thống, và đôi khi sử dụng các cú pháp mới sẽ khiến code của bạn được viết nhanh hơn và dễ hiểu hơn.

Thói quen tốt nhất cho việc học và sử dụng Javascript thời hiện đại đó là nên chú ý vào việc ngôn ngữ này thực sự đang hoạt động như thế nào và làm gì. Hãy nghĩ về mục đích của đoạn code bạn đang viết, bạn nên deploy nó ở đâu, và ai sẽ thay đổi nó về sau. Từ đó bạn có thể tự quyết định đâu mới là phương pháp tốt nhất.
# Tham khảo
* https://www.sitepoint.com/modern-javascript-best-practices/
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
* https://www.w3schools.com/js/js_functions.asp
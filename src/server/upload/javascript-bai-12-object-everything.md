Trong bài viết này, chúng ta sẽ quay lại với chủ đề `Object & Everything` để tìm hiểu chi tiết hơn về `object`.

Trích đoạn bài viết [[JavaScript] Bài 4 - Object & Everything](https://viblo.asia/p/LzD5dRD0ZjY):
> Một trong những chiều kích quan trọng nhất của trí thông minh mà con người chúng ta được ban tặng, đó là `intellect` - tạm dịch là trí tuệ nhị nguyên. Với `intellect` thì mọi thứ xung quanh cuộc sống của chúng ta dường như có thể được tách rời riêng biệt và có thể được định nghĩa với một đường viền bao quanh. Dường như bất cứ thứ gì cũng có thể được định nghĩa bởi một vài thuộc tính và khả năng. Ví dụ như một cái cây có thể được xem là một đối tượng hay `object` độc lập với các thuộc tính như: chiều cao, màu sắc, tuổi tác; và khả năng tạo ra thế hệ tiếp theo.
>  
> Để phản ánh chiều kích này của trí thông minh mà chúng ta sở hữu vào trong môi trường lập trình, những lập trình viên đầu tiên của thế giới đã quyết định cho phép mô tả các đối tượng hay `object` trong code. Điều này khiến cho công việc lập trình trở nên thân thiện hơn và đem đến cho mọi người nhiều khả năng hơn để chuyển tải các ý tưởng vào phần mềm.

Vậy là chúng ta đã biết khái niệm `object` xuất hiện từ cuộc sống thực tế và được đem vào không gian lập trình. Do đó các biến được đóng gói bên trong một `object` thường được gọi với một cái tên khác là thuộc tính `property`, từ này thân thiện hơn và gần gũi hơn với cuộc sống của chúng ta vì khái niệm Biến `variable` về cơ bản là vay mượn của toán học. Bên cạnh đó thì các hàm được đóng gói bên trong một `object` cũng thường được gọi với một cái tên khác là phương thức `method` - tức là cách thức thực hiện một hành động của `object` đó.

Do ở thời điểm ban đầu, việc duy trì mọi thứ đơn giản là rất quan trọng để chúng ta có thể tập trung tốt hơn vào việc tìm hiểu logic hoạt động của các công cụ; Chúng ta đã quy ước là giữ nguyên các tên gọi Biến và Hàm. Tuy nhiên, điều này cũng sẽ không phù hợp nữa khi chúng ta mở rộng hiểu biết của mình về `object` và `class`. Vậy kể từ thời điểm này, hãy cùng sử dụng những cái tên mới là thuộc tính `property` và phương thức `method`. :D

## Một class có thể được mở rộng

Lần này, vì đã biết `object` và `class` là cái gì rồi, chúng ta sẽ xuất phát với code định nghĩa của `class Thing` trong bài viết lần trước.

```thing.js
class Thing {
   constructor(givenColor, givenAge) {
      this.color = givenColor;
      this.age = givenAge;
   }
  
   whisper() {
      console.log(this.age + ' years ago...');
      console.log(this.color + '...');
   }
} // class
```

Chúng ta đã tạo ra một `class Thing` để mô tả chung chung cho mọi thứ xung quanh cuộc sống. Bất kỳ đối tượng `object` nào xung quanh chúng ta cũng đều có màu sắc và khoảng thời gian đã tồn tại tính cho đến giờ. 

Tuy nhiên bây giờ chúng ta muốn tạo ra một `class` mới để mô tả cụ thể hơn một nhóm `object` nào đó; Lấy ví dụ là những chiếc laptop đi. :D Vậy ngoài 2 thuộc tính trên thì có thể chúng ta có quan tâm tới kích thước màn hình hiển thị. Lúc này chúng ta vẫn muốn có các thuộc tính và phương thức của `Thing` đã định nghĩa trước đó. Thao tác copy/paste các đoạn code cũng không khó thực hiện, nhưng nếu như chúng ta có 1001 `class` muốn sử dụng code của `Thing` thì lại là câu chuyện khác. :D

Thật may mắn là JavaScript và nhiều ngôn ngữ lập trình khác có hỗ trợ tự động hóa thao tác mà chúng ta đang cần thực hiện bằng hình thức có tên gọi là kế thừa `inherit` hay mở rộng `extends`.

```laptop.js
class Laptop
extends Thing {
   constructor(givenColor, givenAge, givenScreen) {
      super(givenColor, givenAge);
      this.screen = givenScreen;
   }
} // class

var inspiron = new Laptop('black', 3.5, '14"');
inspiron.whisper();
// '3.5 years ago...'
// 'black...'
```

Ồ... như vậy là chúng ta không cần phải viết lại code gắn giá trị cho các thuộc tính `color` và `age`. Và phương thức `whisper` vẫn có thể hoạt động khá ổn nhưng vẫn thiếu thuộc tính mới `screen` chưa được in ra. 

Trong phần code của phương thức khởi tạo `constructor`, từ khóa `super` dường như được dùng để trỏ về định nghĩa của `class` ban đầu là `Thing`. Nếu vậy chúng ta sẽ thử dùng nó để tạo ra một phương thức `whisper` mới cho `Laptop` và tận dụng phương thức `whisper` đã định nghĩa ở `Thing`.

```laptop.js
class Laptop
extends Thing {
   constructor(givenColor, givenAge, givenScreen) {
      super(givenColor, givenAge);
      this.screen = givenScreen;
   }

   whisper() {
      super.whisper();
      console.log(this.screen + '...');
   }
} // class

var inspiron = new Laptop('black', 3.5, '14"');
inspiron.whisper();
// '3.5 years ago...'
// 'black...'
// '14"...'
```

Tuyệt vời, mọi thứ đã hoạt động như chúng ta mong muốn. Với tính năng mở rộng `extends` này, chúng ta lại có thêm nhiều khả năng hơn để chuyển tải ý tưởng phần mềm của mình thành các dòng code. Tuy nhiên bạn lưu ý là trong JavaScript thì một `class con` sẽ chỉ có thể kế thừa từ một `class cha` duy nhất.

## Làm sao để biết một object có thuộc một class nào đó hay không?

Đây là câu hỏi tiếp theo mà chúng ta đều băn khoăn sau khi biết được tính năng có thể mở rộng `extends` của các `class`. Bởi vì rồi đây chúng ta sẽ tạo ra rất nhiều các object để lưu chuyển, sử dụng trong một chương trình. Ở một thời điểm nhất định, khi nhận được một `object` nào đó từ một hàm đa năng, rất có thể chúng ta sẽ cần thực hiện thao tác kiểm tra để chắc chắn `object` nọ thuộc một `class` kia. :D

```instanceof.js
class Thing {}
class Laptop extends Thing {}

var sky = new Thing();
console.log(sky instanceof Thing);
// true

var inspiron = new Laptop();
console.log(inspiron instanceof Thing);
// true
```

Bởi vì `Laptop` đã thực hiện hành động mở rộng `Thing`, do đó object `inspiron` cũng thuộc class `Thing`. Và đó là cách mà JavaScript suy nghĩ. :D

```instanceof.js
class Thing {}

var sky = new Thing();
console.log(sky instanceof Object);
// true
```

Ồ... vậy là `Thing` đã `extends` một class có tên là `Object`. Nhưng chúng ta đâu có viết ra điều đó ở trong code ví dụ? Thật kỳ lạ. :D

Sự thật là tất cả các class trong JavaScript sẽ ngầm định kế thừa từ `class Object`; Và hiển nhiên sẽ có các thuộc tính và phương thức được định nghĩa bởi `class Object` được lập tài liệu ở đây - [Tài liệu về class Object của MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object). Như vậy là chúng ta còn có thêm một thư viện các phương thức để làm việc với các `object` trong trang tài liệu mới này.

Trong trường hợp muốn biết chính xác tên của `class` đã được sử dụng để tạo ra một `object` nào đó, chúng ta có thể truy xuất tới thuộc tính `constructor` rồi đi tiếp tới thuộc tính `name` của `constructor`.

```classname.js
class Thing {}

var sky = new Thing();
var className = sky.constructor.name;
console.log(className);
// 'Thing'
```

## Các thuộc tính và phương thức được ẩn khỏi thế giới bên ngoài

Đôi khi chúng ta sẽ muốn tạo ra những thuộc tính hay những phương thức chỉ được sử dụng bên trong code nội bộ của một class. Phiên bản hiện tại của JavaScript cho phép chúng ta tạo ra các thuộc tính và các phương thức như vậy bằng cách mở đầu tên thuộc tính hoặc tên phương thức với dấu `#`.

```thing.js
class Thing {
   #privateProperty;

   constructor(givenColor, givenAge) {
      this.color = givenColor;
      this.age = givenAge;
      this.#privateProperty = 'hidden';
   }
  
   whisper() {
      console.log(this.age + ' years ago...');
      console.log(this.color + '...');
      console.log(this.#privateProperty + '...');
   }
} // class

var sky = new Thing('blue', 1001);
console.log( sky.#privateProperty );
// console thông báo lỗi
// trường thông tin riêng `#privateProperty` được định nghĩa đóng kín
```

Và chúng ta đã thấy là thuộc tính `#privateProperty` không thể được truy xuất từ phần code ở bên ngoài định nghĩa `class`. Tuy nhiên phương thức `whisper` thì có thể sử dụng thuộc tính này bình thường.

```thing.js
/* ... */

var sky = new Thing('blue', 1001);
sky.whisper();
// '1001 years ago...'
// 'blue...'
// 'hidden...'
```

Bây giờ thì chúng ta có thể chắc chắn rằng các thuộc tính và phương thức ẩn của một `class` sẽ không thể được sử dụng bởi code ở bên ngoài `class` đó. Và thậm chí cả các `object` được tạo ra bởi các `class con` - ví dụ như `Laptop` ở trên - cũng sẽ không thể truy xuất và sử dụng thuộc tính riêng của `class cha` - ví dụ như `#privateProperty` của `Thing`.

## Các thuộc tính và phương thức của object bản mẫu `static`

Đôi khi chúng ta sẽ muốn tạo ra một thư viện các thuộc tính và các phương thức tiện ích để làm việc xoay quanh một `class` giống như cách mà JavaScript đã cung cấp các công cụ tiện ích để làm việc xoay quanh các kiểu dữ liệu mặc định. Ví dụ như khi chúng ta muốn tách ra một giá trị số nguyên từ một chuỗi, `class Number` có cung cấp một phương thức là `Number.parseInt()`.

```number.js
var ten = Number.parseInt('10.01');
console.log(ten);
// 10
```

Ở đây chúng ta thấy là phương thức `parseInt` được tham chiếu từ object bản mẫu `Number` thay vì một object thực thể `new Number()`. Để tạo ra các thuộc tính và phương thức gắn với object bản mẫu như vậy, chúng ta cần sử dụng thêm từ khóa `static` ở phía trước tên của các thuộc tính và phương thức.

```thing.js
class Thing {
   /* --- Dành cho các object thực thể */

   #privateProperty;

   constructor(givenColor, givenAge) {
      this.color = givenColor;
      this.age = givenAge;
      this.#privateProperty = 'hidden';
   }
  
   whisper() {
      console.log(this.age + ' years ago...');
      console.log(this.color + '...');
      console.log(this.#privateProperty + '...');
   }
   
   /* --- Dành cho object bản mẫu `Thing` */
   
   static staticProperty;

   static {
      this.staticProperty = 'static';
   }

   static staticWhisper() {
      console.log(this.staticProperty + '...');
   }
} // class

Thing.staticWhisper();
// 'static...'
```

Để khởi tạo giá trị cho các thuộc tính `static`, chúng ta có hàm khởi tạo không dùng từ khóa `constructor` nhưng vẫn cần từ khóa `static` để gắn với object bản mẫu `Thing`. Ngay khi một thành phần `static` bất kỳ của `Thing` được truy vấn để sử dụng, hàm khởi tạo `static` sẽ được khởi chạy trước để thực hiện các thiết lập ban đầu cho các thuộc tính `static` hoặc một thao tác nào đó mà bạn cần thực hiện.

Thêm vào đó thì các thuộc tính và phương thức `static` cũng có thể được ẩn khỏi không gian code bên ngoài bằng cách mở đầu tên gọi với ký hiệu `#`.

Bạn có thấy điều gì hơi kỳ lạ khi chúng ta gặp mặt thêm các phương thức `static` không? Con trỏ `this` lúc này đã tự động trỏ về object bản mẫu `Thing`, chứ không giống như ở các phương thức thông thường.

## Con trỏ `this` hoạt động như thế nào?

Chúng ta hãy quay trở lại với code định nghĩa `Thing` ban đầu để quan sát mọi thứ đơn giản và dễ tìm hiểu vấn đề này hơn.

```thing.js
class Thing {
   constructor(givenColor, givenAge) {
      this.color = givenColor;
      this.age = givenAge;
   }
  
   whisper() {
      console.log(this.age + ' years ago...');
      console.log(this.color + '...');
   }
} // class

var sky = new Thing('blue', 1001);
sky.whisper();
// '1001 years ago...'
// 'blue...'

var grass = new Thing('green', 10);
grass.whisper();
// '10 years ago...'
// 'green...'
```

Lúc này chúng ta đang hiểu đơn giản là - từ khóa `this` là con trỏ được sử dụng để tham chiếu tới chính bản thân `object` thực thể đang thực hiện hành động `whisper()`.

Khi hàm `whisper` được khởi chạy bởi `sky`, con trỏ `this` được sử dụng để tham chiếu tới chính object `sky` đang thực hiện hành động, và tương tự với trường hợp của `grass`. Vậy chúng ta có thể nghĩ là - mỗi `object` hình như sẽ có một con trỏ `this` riêng để trỏ tới chính bản thân `object` đó, và sử dụng cho các phương thức được chứa bên trong `object` đó.

Nhưng bây giờ chúng ta cũng biết rằng về cơ bản phương thức `whisper` là một hàm, vậy nó cũng là một `object`. Nếu như chúng ta lưu địa chỉ tham chiếu của `whisper` vào một biến khác rồi thực hiện chạy hàm, có lẽ kết quả hoạt động của code sẽ không thay đổi?

```class.js
var sky = new Thing('blue', 1001);
var skyWhisper = sky.whisper;
skyWhisper();
// console thông báo lỗi
// không thể đọc được thuộc tính `age` tại định nghĩa hàm `whisper`
```

Thật kỳ lạ, chúng ta đâu có thao tác thay đổi điều gì. Tất cả những gì chúng ta vừa làm là sao chép địa chỉ tham chiếu của phương thức `whisper` vào biến `skyWhisper`, và sau đó thực hiện gọi hàm.

À... có một khả năng - nếu như con trỏ `this` trong phần khai báo hàm `whisper` được gắn với object `sky` ngay từ khi `object` này được tạo ra, thì hiển nhiên lời gọi hàm `skyWhisper()` sẽ phải hoạt động bình thường chứ không thể có lỗi phát sinh được.

Nếu vậy, có lẽ phép xử lý được biểu thị bằng dấu chấm `.`, ngoài việc giúp chúng ta truy xuất tới phương thức `whisper` khi thực hiện lệnh `sky.whisper()`, đã kiêm thêm công việc kết nối con trỏ `this` mà phương thức `whisper` đang sử dụng với object `sky` đứng phía trước. Hay nói một cách khác, con trỏ `this` trong phần khai báo phương thức `whisper` chỉ được gắn tạm thời với object `sky` tại thời điểm khởi chạy với dấu `.`

Vậy rất có khả năng là chúng ta có thể định nghĩa hàm `whisper` rời ở bên ngoài class `Thing` và tìm được cách gọi hàm như thế nào đó để có kết quả hoạt động tương tự. :D

```this.js
class Thing {
   constructor(givenColor, givenAge) {
      this.color = givenColor;
      this.age = givenAge;
   }
} // Thing

var sky = new Thing('blue', 1001);

const whisper = function() {
   console.log(this.age + ' years ago...');
   console.log(this.color + '...');
};

whisper.apply(sky);
// '1001 years ago...'
// 'blue...'
```

Như chúng ta đã biết thì hàm `whisper` về cơ bản cũng là một `object` và có chứa một số thuộc tính và phương thức bên trong nó. Trong code ví dụ ở trên, phương thức `apply` được sử dụng để phát động hàm `whisper` thay vì sử dụng cách viết trực tiếp `whisper()`; Và `sky` được truyền vào phương thức `apply` để được gắn tạm thời với con trỏ `this` trong định nghĩa của hàm `whisper`.

Tuy nhiên khi khai báo hàm `whisper`, nếu như chúng ta không sử dụng từ khóa `function` mà thay vào đó là sử dụng cú pháp `=>` thì kết quả hoạt động lại không được như vậy. Hãy sửa lại code của hàm `whisper` một chút, chúng ta sẽ thử với cú pháp `=>` và thêm thao tác in con trỏ `this` ra `console`.

```this.js
class Thing {
   constructor(givenColor, givenAge) {
      this.color = givenColor;
      this.age = givenAge;
   }
} // Thing

const whisper = () => {
   console.log(this.age + ' years ago...');
   console.log(this.color + '...');
   console.log(this);
};

var sky = new Thing('blue', 1001);
whisper.apply(sky);
// 'undefined years ago...'
// 'undefined...'
// object `window`
```

Thì ra là vậy, khi tạo ra hàm `whisper` bằng cú pháp `=>` con trỏ `this` dường như được gắn cố định ở thời điểm được tạo ra và không thể thay đổi. Vậy đây chính là một điểm khác biệt giữa từ khóa `function` và cú pháp `=>` mà chúng ta đã để dành ở bài trước. :D

Vậy chúng ta cùng tổng kết 2 lưu ý quan trọng này nhé:

- Con trỏ `this` hay chủ thể hoạt động của một hàm `có thể` được thay đổi linh động tại thời điểm gọi hàm. Tuy nhiên điều đó `không đúng` với các hàm được tạo ra bằng cú pháp `=>`.
- Bên cạnh đó thì hàm được tạo ra bằng cú pháp `=>` sẽ có chủ thể hoạt động `this` được kế thừa của môi trường đang bao quanh phần code định nghĩa và cố định ngay tại thời điểm hàm được tạo ra.

Tới đây thì chúng ta cũng hiểu rằng - Các phương thức được khai báo bên trong định nghĩa `class` sẽ được lưu một bản ở đâu đó và sử dụng chung cho các `object` thực thể được tạo ra sau này. Và khi các phương thức được gọi với dấu `.` đứng trước thì con trỏ `this`  mới được tạm gắn với `object` thực thể đang là chủ thể thực hiện hành động. Vậy thì các `object` cũng không cồng kềnh lắm nhỉ? :D

## Phân tách các thuộc tính từ một object

JavaScript có cung cấp một cú pháp giúp chúng ta nhanh chóng tách lấy các thuộc tính mà chúng ta cần sử dụng từ một `object` và gán vào các biến ở bên ngoài, thay vì phải viết lại nhiều lần tên biến tham chiếu tới `object` đó mỗi khi cần sử dụng tới các thuộc tính.

```destructuring.js
var sky = {
   color: 'blue',
   age: 1001,
   size: 'unbound'
};

// phân tách các thuộc tính của `sky`
// vào các biến có tên tương ứng
var { color, age, size } = sky;
console.log(color);   // 'blue'
console.log(age);     // 1001
console.log(size);    // 'unbound'
```

Trong cú pháp này thì dòng khai báo các biến `var` được viết với một cặp ngoặc xoắn `{}` để mô tả rằng - chúng ta muốn gán giá trị của các thuộc tính tương ứng trong một `object` ở phía bên phải phép gán `=`. Bạn có cảm thấy cú pháp này rất ngắn gọn và xúc tích không? :D

Bên cạnh đó, chúng ta cũng có một cú pháp hỗ trợ nhanh chóng sao chép các thuộc tính của một `object` bất kỳ vào một `object` được khởi tạo trực tiếp không thông qua `class`, với sự hỗ trợ của phép dàn trải `spread operator` được ký hiệu bởi dấu 3 chấm `...`.

```spread.js
var sky = {
   color: 'blue',
   age: 1001,
   size: 'unbound'
};

// phân tách các thuộc tính của `sky`
// và đặt vào `heaven` với các tên thuộc tính tương ứng
var heaven = {
   ...sky,
   universe: 'tabha'
};

console.log(heaven);
// {color: 'blue', age: 1001, size: 'unbound', universe: 'tabha'}
```

Tuy nhiên, chúng ta cũng cần lưu ý rằng, về cơ bản thì cú pháp này chỉ là cách viết gọn cho thao tác truy xuất tới các tên thuộc tính, do đó các thuộc tính ẩn `#private` (nếu có) sẽ không được sao chép sang `object` mới.

Trong trường hợp `object` mới khởi tạo trực tiếp có một số thuộc tính trùng lặp tên với `object` cũ, thì thuộc tính nào được viết sau sẽ ghi đè thuộc tính được viết trước.

```spread.js
var sky = {
   color: 'blue',
   age: 1001,
   size: 'unbound'
};

var heaven = {
   ...sky,
   color: 'dodgerblue', // ghi đè thuộc tính `color` lấy từ `sky`
   universe: 'tabha'
};

console.log(heaven);
// {color: 'dodgerblue', age: 1001, size: 'unbound', universe: 'tabha'}
```

Bên cạnh đó, nếu được sử dụng trong thao tác phân tách và gán giá trị vào các biến như ban đầu thì ký hiệu `...` có thể giúp chúng ta gom các thuộc tính còn lại của `object` ban đầu thành một `object` nhỏ hơn. Lúc này `...` được gọi với một cái tên khác là phép lấy phần thừa `rest operator`.

```rest.js
var sky = {
   color: 'blue',
   age: 1001,
   size: 'unbound'
};

var { color, ...others } = sky;
console.log(color);   // 'blue'
console.log(others);   // { age: 1001, size: 'unbound' }
```

## Các class đệ quy

Vẫn lại là khái niệm đệ quy xuất hiện ở mọi nơi trong cuộc sống của chúng ta. Mình đặt phần này ở cuối bài bởi vì chỉ mang tính chất tham khảo chứ không phải là kiến thức quan trọng ở thời điểm hiện tại. Nếu bạn có thời gian để đọc thêm một chút thì mình có code của một `class` đệ quy đơn giản ở đây. :D

Một `class` đệ quy được cho là có thể tạo ra các `object` đệ quy, các `object` này có một thuộc tính tham chiếu tới một `object` khác cũng thuộc chính `class` đó.

```recursion.js
class Just {
   constructor(
      value = null,
      past = null
   ) {
      this.value = value;
      this.past = past;
   }

   getMemory() {
      if (this.past == null)   return [this.value];
      else                     return this.past.getMemory().concat(this.value);
   }

   be(value = null) {
      var valueIsPrimitive = Just.checkPrimitive(value);
      var valueExisted = this.getMemory().includes(value);
      // ---
      if ( ! valueIsPrimitive)   return this;
      if (valueExisted)          return this;
      else                       return new Just(value, this);
   }
   
   static checkPrimitive(value) {
      return (typeof value) != 'object';
   }
} // Just

var just = new Just();
just = just.be(0)
           .be(1)
           .be('word')
           .be(true)
           .be(false)
           .be(1001);

console.log(just.getMemory());
// [null, 0, 1, 'word', true, false, 1001]
```

Trong ví dụ ở trên, chúng ta có một `class` đơn giản tên là `Just` tạo ra các `object` để bọc các giá trị `primitive` trong thuộc tính `value`. Khi phương thức `just.be` được gọi với một giá trị `primitive`, nó sẽ tạo ra một phiên bản mới của `just` và lưu phiên bản hiện tại vào thuộc tính `past` để làm quá khứ của của phiên bản mới. 

Mỗi khi chúng ta cần nhìn lại quá khứ và xem xét tập ký ức `memory` của `just` hiện tại thì chỉ cần gọi phương thức `just.getMemory`. Phương thức này sẽ truy xuất tới các phiên bản cũ của `just` theo phương cách đệ quy và lấy ra các giá trị để trả về ở dạng một mảng phẳng lỳ. Về cơ bản thì `getMemory` vẫn là một `hàm đệ quy` như chúng ta đã biết tới trong [bài viết trước](https://viblo.asia/p/63vKjAaR52R) thôi. :D

> Một class đệ quy chỉ đơn giản là một cấu trúc để lưu trữ dữ liệu khác với mảng Array phẳng lỳ. Chỉ có vậy thôi. :D  
> *_Một người đang học lập trình*

Bài viết của chúng ta về chủ đề `Object & Everything` tới đây là kết thúc. Trong bài tiếp theo, chúng ta sẽ quay trở lại với chủ đề xử lý các sự kiện người dùng trong trình duyệt web, đã được nói tới trong bài JavaScript số 5; Và sau đó chúng ta sẽ cùng xây dựng một thanh điều hướng phụ `sidebar` có tính năng lọc nhanh nội dung trong danh sách liên kết khi người dùng nhập từ khóa vào ô truy vấn.

Hẹn gặp lại bạn trong bài viết tiếp theo. :D

[[JavaScript] Bài 13 - Event & Listener](https://viblo.asia/p/RnB5pA0wKPG)
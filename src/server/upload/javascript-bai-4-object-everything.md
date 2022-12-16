Trong bài này, chúng ta sẽ nói về kiểu dữ liệu quan trọng nhất trong JavaScript. Đó là đối tượng hay `object`. Thực tế thì trong JavaScript, tất cả mọi thứ đều có thể được xem là `object`. Tất cả mọi thứ! :D

## Một `object` trong JavaScript

Một trong những chiều kích quan trọng nhất của trí thông minh mà con người chúng ta được ban tặng, đó là `intellect` - tạm dịch là trí tuệ nhị nguyên. Với `intellect` thì mọi thứ xung quanh cuộc sống của chúng ta dường như có thể được tách rời riêng biệt và có thể được định nghĩa với một đường viền bao quanh. Dường như bất cứ thứ gì cũng có thể được định nghĩa bởi một vài thuộc tính và khả năng. Ví dụ như một cái cây có thể được xem là một đối tượng hay `object` độc lập với các thuộc tính như: chiều cao, màu sắc, tuổi tác; và khả năng tạo ra thế hệ tiếp theo.

Để phản ánh chiều kích này của trí thông minh mà chúng ta sở hữu vào trong môi trường lập trình, những lập trình viên đầu tiên của thế giới đã quyết định cho phép mô tả các đối tượng hay `object` trong code. Điều này khiến cho công việc lập trình trở nên thân thiện hơn và đem đến cho mọi người nhiều khả năng hơn để chuyển tải các ý tưởng vào phần mềm. Hãy cùng xem xét ví dụ dưới đây.

```object.js
var theTree = {
   name : 'Divine' ,
   age  : 1001     ,

   produce() {
      return '108 seeds';
   }
}; // theTree

console.log( theTree.name );      // 'Divine' 
console.log( theTree.age );       // 1001
console.log( theTree.produce() ); // '108 seeds'
```

Ở đây chúng ta có một `object` được lưu vào biến `theTree`.

> Một `object` trong JavaScript chỉ đơn giản là một nhóm các biến và các hàm được đóng gói bởi một cặp ngoặc xoắn `{}`.  
> *_Một người đang học JavaScript*

Bạn hãy lưu ý rằng ở đây chúng ta không cần sử dụng các từ khóa `var` và `function` cho các thành phần của `object`; Các giá trị được gắn với các biến bằng cách sử dụng các dấu hai chấm `:` thay vì dấu `=`; Và mọi thứ được phân tách với nhau bởi các dấu phẩy `,`

## Tham chiếu từ bên trong

Trong ví dụ ở trên thì chúng ta đã sử dụng biến `theTree` để lưu trữ địa chỉ tham chiếu của  `object` ở phía bên phải; Để sử dụng địa chỉ tham chiếu này ở phần code bên trong cặp ngoặc xoắn `{}`, từ khóa `this` được sử dụng để tham chiếu tới `object` đó.

```this.js
var theTree = {
   name : 'Divine' ,
   age  : 1001     ,

   produce() {
      return '108 fruits';
   } ,
  
   whisper() {
      console.log(this.age + ' years ago...');
      console.log(this.produce() + '...');
   }
}; // theTree

theTree.whisper();
// '1001 years ago...'
// '108 fruits...'
```

## Tạo ra các `object` bằng `class`

Việc tạo ra các `object` trong JavaScript có thể được thực hiện theo một cách thức thuận tiện hơn. Chúng ta hãy cùng xem xét ví dụ sau.

```class.js
   // tạo ra một bản mẫu phác họa
class Thing {
   constructor(givenColor, givenAge) {
      this.color = givenColor;
      this.age = givenAge;
   }
  
   whisper() {
      console.log(this.age + ' years ago...');
      console.log(this.color + '...');
   }
} // class Thing

// tạo ra 2 object từ bản mẫu
var water = new Thing('blue', 1001);
var grass = new Thing('green', 10);

water.whisper();
// '1001 years ago...'
// 'blue...'

grass.whisper();
// '10 years ago'
// 'green...'
```

Từ khóa `class` được sử dụng để tạo ra một `object` có tên là `Thing` đóng vai trò là một bản mẫu phác họa các `object` sẽ được tạo ra sau này. Bản mẫu này không có sẵn các giá trị màu sắc `color` và tuổi tác `age` mô tả thực tế; Thay vào đó thì một hàm khởi tạo `constructor` được sử dụng để gắn `givencolor` và `givenage` khi một `object` thực thể được tạo ra sau đó.

Tiếp theo chúng ta đã tạo ra 2 `object` sử dụng từ khóa `new`, đi kèm với tên của bản mẫu, và cung cấp các chi tiết cho `color` và `age` của mỗi `object`. Bằng cách khởi tạo các `object` như thế này, chúng ta không cần phải tốn thời gian viết các đoạn code lặp lại để mô tả các `object` có dạng giống nhau với các tên biến và các tên hàm lặp lại nhiều lần.

JavaScript cũng cung cấp nhiều `class` đã được định nghĩa sẵn và nhiều `object` dựng sẵn trong môi trường chạy code (ở đây chúng ta đang sử dụng trình duyệt web) để thực hiện nhiều tác vụ tiện ích. Tuy nhiên thì chúng ta sẽ duy trì mọi thứ đơn giản ở thời điểm hiện tại và để dành những thứ đó cho các bài viết sau. Dưới đây là một ví dụ nhỏ sử dụng một `class` đã được định nghĩa sẵn để truy vấn thông tin thời gian từ hệ thống.

```date.js
var date = new Date();
var datestring = date.toUTCString();
console.log(dateString);
// result: Thu, 17 Mar 2022 07:37:16 GMT
```

## Tất cả mọi thứ trong JavaScript đều là `object`

Không hẳn là như vậy. Nói đúng hơn thì là: "JavaScript đối xử với tất cả mọi thứ như thể tất cả đều là `object`". :D

Một hàm có thể được sử dụng như  một `object`, một gói các biến và phương thức.

```function.js
function just() {
   return 'nothing';
}

console.log( just.name );
// 'just'

console.log( just.apply() );
// 'nothing'
```

Một giá trị số học cũng có thể được sử dụng như một `object` - [**Các phương thức và thuộc tính của `number`**](https://www.w3schools.com/jsref/jsref_obj_number.asp)

```number.js
var infinity = 10.01;
var ten = infinity.toPrecision(2);
console.log(ten);
// result: 10
```

Một chuỗi cũng có thể được sử dụng như một `object` - [**Các phương thức và thuộc tính của `string`**](https://www.w3schools.com/jsref/jsref_obj_string.asp)

```string.js
var knowing = 'infinite';
console.log( knowing.length );
// result: 8

var intellect = knowing.slice(2);
console.log(intellect);
// result: 'finite'
```

Và chúng ta sẽ được gặp nhiều `object` hơn nữa kể từ thời điểm này. Bài viết của chúng ta về `object` tới đây là kết thúc. Trong bài tiếp theo, chúng ta sẽ gặp một vài `object` dựng sẵn của các trình duyệt web - được thiết kế để giúp chúng ta thực hiện các thao tác tùy chỉnh cấu trúc của văn bản HTML và các thuộc tính CSS.

[**About the Realm Beyond Intellect**](https://www.youtube.com/watch?v=WCFfjp0bPuM)

[**[JavaScript] Bài 5 - Document & Event**](https://viblo.asia/p/Qbq5QRWGKD8)
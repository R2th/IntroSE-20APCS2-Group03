![image.png](https://images.viblo.asia/87755919-f853-41e7-8749-bd631d731702.png)

Trong những phần trước, chúng ta đã tìm hiểu về khái niệm JavaScript là gì?, cách cài đặt môi trường cũng như cách sử dụng công cụ devtool cơ bản. Trong bài này, chúng ta sẽ cùng nhau bắt đầu đi vào phần đầu tiên và cũng là một trong những phần cơ bản cần phải nắm được khi chúng ta làm việc với ông thần JavaScript này nhé. Chúng ta bắt đầu thôi 😉

## I. Các kiểu dữ liệu trong JavaScript

JavaScript về bản chất là một ngôn ngữ được nhập động, tức là kiểu dữ liệu của một biến phụ thuộc vào giá trị mà biến đó chứa. Nếu ta thay đổi giá trị hiện có của một biến thành giá trị có kiểu dữ liệu khác thì kểu dữ liệu của biến đó cũng thay đổi theo.

```
let a = 10;
typeof a; //--> number
a = '200lab';
typeof a; //--> string
```

Trong JavaScript, ta có hai kiểu dữ liệu chính là: kiểu dữ liệu nguyên thủy (Primitive data type) và kiểu dữ liệu object (Non-primitive data type).

> Bạn có thể xem thêm bài viết tại đây: https://200lab.io/blog/tim-hieu-kieu-du-lieu-va-typeof-trong-javascript/

### 1. Kiểu dữ liệu nguyên thủy (Primitive data type)

Bao gồm:

* Number & bigInt: 0.5, 1, 2, ...
* String: "200lab"
* Boolean: true/false
* Null
* undefined
* Symbol (ES6)

#### Number & Big Int

Đây là kiểu số, nó bao gồm cả số nguyên và số có dấu phẩy động (số thập phân)

```
let number = 123;
let dec = 0.1232;
```

Vậy BigInt là cái gì? Thì do giới hạn về mặt kỹ thuật nên một biến không thể lưu giá trị số nguyên vượt quá `2^53 - 1 = 900719925470991`. Với những số vượt quá giới hạn trên, bạn chỉ cần dùng BigInt để lưu bằng cách thêm `n` ở cuối cùng là được nè.

```
let bigInt = 9007199254709912123n;
```

#### String

Đây là kiểu dữ liệu dạng chuỗi, dùng để lưu các giá trị ở dạng text. Ta có thể sử dụng cả dấu ngoặc kép `""` hoặc dấu ngoặc đơn `''` để tạo một giá trị chuỗi bất kỳ nhé.

```
let str_1 = "Welcome to 200lab";
let str_2 = 'Welcome to 200lab';
```

Trong JavaScript còn có dấu ` ` này, nó là một tính năng mở rộng, nó cho phép ta nhúng một một giá trị bất kỳ vào một chuỗi

```
let str_1 = '200lab';
let str_2 = `Welcome to ${str_1}`;
console.log(str_2); //--> 'Welcome to 200lab'
```

#### Boolean

Kiểu `boolean` có hai giá trị: `true` hoặc `false`. Nó thường được dùng để lưu giá trị `yes/no` hoặc `0/1`

```
let isShow = true;
let isHidden = false;
```

Một cái hay ho trong JavaScript mà có thể các bạn rất ít gặp, đó là ta có thể lưu giá trị boolean như sau:

```
let isGreater = 9 > 3;  // true
let isLess = 6 < 3;   // false
```

Null và Undefined

![image.png](https://images.viblo.asia/13ce96cb-e97e-4170-965f-721237a15448.png)

Một số bạn sẽ thắc mắc "Vậy `null` với `undefied` nó khác nhau chỗ nào?" và đôi khi câu hỏi này cũng được một số nhà tuyển dụng hỏi với ứng viên cho vị trí Fresher JavaScript đấy, vì vậy các bạn cần lưu ý một chút nhé 😉

`null` và `undefined` về cơ bản thì cả hai bằng nhau về mặt giá trị, tuy nhiên chúng lại khác nhau về kiểu. (Trong JavaScript bạn có thể dùng `typeof` để kiểm tra kiểu dữ liệu)

```
null == undefined   //--> true
null === undefined  //--> false

typeof null 	 //--> object
typeof undefined //--> undefined
```

Khi bạn nhìn thấy kết quả, chắc chắn bạn sẽ thắc mắc rằng: "Ủa, tại sao `typeof null` cho ra kết quả là `object` kia mà sao lại bảo nó thuộc kiểu dữ liệu nguyên thủy 🤨 ? Vô lý thế 🙄".

Các bạn bình tĩnh, để mình giải thích 😁. Thực chất, ngay từ ban đầu xây dựng nên ngôn ngữ JavaScript này thì cha đẻ của nó, ông Crockford cùng đội ngũ phát triển đã vô tình tạo ra nó mà không nhận ra và thế là `typeof null` là `object` ra đời.

Ok, vậy tại sao không chỉnh sửa lại nó sau khi đã nhận ra lỗi này? Chẳng hạn cho nó một kiểu dữ liệu mới chẳng hạn 🤔?.

Một điều bạn cần phải biết là có rất ít thời gian để hoàn thành phiên bản JavaScript đầu tiên nên việc xuất hiện quả bug như thế là điều không thể tránh khỏi.

Khi họ phát hiện ra thì mọi chuyện đã quá muộn, có quá nhiều người đã sử dụng nó. Do đó việc chỉnh sửa lại sẽ mang lại quá nhiều khó khăn - theo như ông Crockford đã nói:

> "I think it is too late to fix typeof. The change proposed for typeof null will break existing code"
> (Nếu bạn muốn biết thêm về quả bug này thì có thể đọc bài viết The history of "typeof null" tại đây nhé ?)

Được rồi, chúng ta quay lại với `null` và `undefined` nào. Vậy làm sao để phân biệt hai đứa này?

Để phân biệt `null` và `undefined` thì ta có thể hiểu như sau:

`null` có nghĩa là rỗng, tức là không có gì cả (tuy nhiên rỗng ở đây khác với chuỗi rỗng `''` nhé 😁) . Thường thì `null` được dùng cho `object` mà không có giá trị như mong đợi.

`undefined` có nghĩa là chưa xác định, tức chưa xác định được giá trị, `undefined` thường xuất hiện ở:

#### Biến đã được khai báo nhưng không khởi tạo giá trị

```
let a;
console.log(a); // --> undefined
```

Truy cập vào thuộc tính mà không có trong object

```
let animal = {species: 'cat'}
console.log(animal.longevity); //--> undefined
```

#### Truyền thiếu parameter vào function

```
function show(a, b) {
	console.log(a + ' and ' + b);
}
show(1); //-> 1 and undefined
```

#### Function không return hoặc return undefined

```
function show(a, b) {
	alert(a, b);
}
console.log(show(1, 2)); //undefined
```

Lưu ý: Bạn không thể truy cập vào các thuộc tính của `null` cũng như `undefined` đâu nhé.

```
function geProps(params) {
	return params.name;
}
getProps(null);      //--> TypeError
getProps(undefined); //--> TypeError
```

### 2. Kiểu dữ liệu object (Non-primitive data type)

Bạn có thể hiểu là kiểu dữ liệu nào mà không thuộc kiểu dữ liệu nguyên thủy (Primitive data type) trên thì đều thuộc kiểu object 😁.

Những kiểu dữ liệu thuộc kiểu object gồm: Object, Array object, Regular Expression, Function.

Object

Object chứa các cặp `key` và `value`. Nó không giống như array, các cặp `key` và `value` trong object có thể có nhiều kiểu dữ liệu khác nhau.

```
const user = {
   name: "Alice",
   posts: 2,
   isLoggedIn: false
};
```

Ta có thể truy cập vào giá trị của một object bằng cách ghi tên object đó ra sau đó là key mà bạn muốn lấy giá trị.

```
let welcomeMessage = `Hello ${user.name}`;
console.log(welcomeMessage); //--> 'Hello Alice'
```

#### Array

Array hay mảng, nó chứa một danh sách các giá trị thuộc cùng một kiểu dữ liệu, các giá trị trong mảng có thể thuộc bất kỳ kiểu dữ liệu nào.

```
const rainbowColours = ["Red","Orange","Yellow","Green","Blue","Purple"];
let numbers = [1,2,3,5,6,7,12,31,768];
```

Để truy cập đến một giá trị bất kỳ trong mảng thì bạn phải biết vị trí index của giá trị đó trong mảng (Trong JavaScript, mảng bắt đầu từ 0 nhé).

```
const rainbowColours = ["Red","Orange","Yellow","Green","Blue","Purple"];
console.log(rainbowColours[0]); //--> 'Red'
```

#### Regular Expression

Hay còn được gọi là biểu thức chính quy (Phần này chúng ta sẽ tìm hiểu trong một bài viết khác nhé ?)

```
let regex = /ab+c/
```

#### Function

```
function sum (a, b) {
	return a + b;
}
```

Lưu ý: Mặc dù function cũng được xem là thuộc kiểu object tuy nhiên nếu bạn dùng `typeof` để kiểm tra một `function` bất kỳ thì nó cho kết quả là `function` đấy nhé. Nó cũng giống như `typeof null` vậy 😆.

```
function sum (a, b) {
	return a + b;
}
typeof sum  //--> function
typeof null //--> object
```

## II. Tham trị và tham chiếu

Tham trị và tham chiếu là hai thứ khá là nhọc nhằn, khó "hấp thu" không chỉ với những bạn mới học JavaScript mà đôi khi cả những bạn đã làm dev JavaScript tầm 1 - 2 năm cũng sẽ hay nhầm lẫn hai ông thần này (trong đó có mình 🤣).

Vậy trong phần này, mình sẽ sơ lược những điểm quan trọng để chúng ta dễ hiểu và dễ nhớ hơn về hai ông thần này nhé 😉.

### 1. Tham trị

Tham trị đối với kiểu dữ liệu nguyên thủy nhé. Khi ta gán biến này cho biến kia thì giá trị của hai biến là hoàn toàn độc lập. Nói một cách đơn giản thì biến sẽ lưu giá trị của biến đó.

```
let num_1 = 100;
let num_2 = num_1;
console.log(num_1 + ' - ' + num_2); //--> 100 - 100
num_1 = 200;
console.log(num_1 + ' - ' + num_2); //--> 200 - 100
```

Khi ta gán `num_2 = num_1` thì bản chất `num_2` sẽ lưu giá trị của `num_1` tức là `100`. Sau đó, ta gán giá trị mới cho `num_1 = 200` thì `num_2` vẫn không thay đổi. Vì việc thằng `num_1` nó thay đổi giá trị thì thằng `num_2` nó không quan tâm, nó chỉ biết rằng nó có nhiệm vụ là lưu giá trị là `100` mà nó được cho ban đầu mà thôi 😄.

Nếu bạn dùng function để thay đổi thì cũng sẽ như vậy

```
let str_1 = '200lab';

function changeText(str) {
	str = 'Welcome to 200lab';
}
changeText(str_1);
console.log(str_1); //--> '200lab'
```

### 2. Tham chiếu

Tham chiếu đối với object. Đối với tham chiếu thì nó khác với tham trị ở chỗ là tham chiếu khi gán hoặc copy giá trị thì nó chỉ lưu ở dạng địa chỉ vùng nhớ trên RAM, nơi mà dùng để lưu giá trị đó. Để dễ hiểu thì chúng ta xem ví dụ dưới nè 😊

```
const user = {
   name: "Alice",
   posts: 2,
   isLoggedIn: false
};

const temp = user; //--> {name: "Alice", posts: 2, isLoggedIn: false}
```

Ví dụ object `user` được lưu ở địa chỉ `4R15T` trên RAM nhé 😉. khi mà ta gán `temp = user` thì cái mà biến `temp` lưu lại đó là địa chỉ `4R15T` nơi chứa giá trị của `user` mà thôi nhé. Việc gán như vậy thực chất là copy địa chỉ vùng nhớ mà thôi 😀.

Lưu ý: Tuy nhiên, việc 2 biến cùng trỏ đến một địa chỉ vùng nhớ như vậy nên khi một trong 2 ổng đi thay đổi giá trị bên trong vùng nhớ đó thì ông còn lại cũng bị thay đổi theo luôn.

```
const user = {
   name: "Alice",
   posts: 2,
   isLoggedIn: false
};
const temp = user; 
console.log(temp);//--> {name: "Alice", posts: 2, isLoggedIn: false}
user.name = 'Kirito'
console.log(temp);//--> {name: "Kirito", posts: 2, isLoggedIn: false}
```

## III. Tổng kết

Qua bài viết này, hy vọng nó sẽ giúp các bạn có cái nhìn tổng quan hơn về các kiểu dữ liệu trong JavaScript, giúp các bạn hiểu rõ hơn về tham trị và tham chiếu cũng như phân biệt được hai ông thần này. Trong bài viết tiếp theo, chúng ta sẽ cùng nhau tìm hiểu cách khai báo biến, khái niệm hoisting, scope trong JavaScript nhé. Cảm ơn các bạn đã đọc 🤗.
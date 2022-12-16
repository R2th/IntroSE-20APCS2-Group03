Trong bài viết này, chúng ta sẽ đi sâu tìm hiểu về Generics( Generic data types) trong Typescript.  Đối với các bạn dev C# hoặc Java thì Generic data type vô cùng quen thuộc, tuy nhiên đối với các bạn dev javascript khi mới chuyển qua Typescpirt thì sẽ gặp đôi chút khó khăn khi tiếp cận với khái niệm này :sweat_smile:<br>


![](https://images.viblo.asia/9ec68530-7181-47e1-a0a9-709cf032376c.png)
## 1.  Giới thiệu
   Đầu tiên, chúng ta hãy cùng tìm hiểu Generic type là gì ? <br>
   Theo như định nghĩa của TypeScript về Generic:<br>
>    In languages like C# and Java, one of the main tools in the toolbox for creating reusable components is generics, that is, being able to create a component that can work over a variety of types rather than a single one. This allows users to consume these components and use their own types.

Hiểu đơn giản thì Generic type là việc cho phép truyền type vào components(function, class, interface) như là 1 tham số.
Điều này sẽ giúp các components mềm dẻo hơn. Tái sử dụng tốt hơn.
## 2.   Tại sao lại cần Generic
Chúng ta tạo một function nhận vào 2 tham số cùng kiểu dữ liệu (string | number) và return về một [Turple](https://www.typescriptlang.org/docs/handbook/basic-types.html#tuple).
```typescript
// union type : `string` and `number`
type NS = string | number;

// function that returns a tuple
function getTuple( a: NS, b: NS ): [ NS, NS ] {
    return [ a, b ];
}

let stringArray = getTuple( 'hello', 'world' );

let numberArray = getTuple( 1.25, 2.56 );

//case error
let mixedArray = getTuple( 1.25, 'world' );

// Property 'toUpperCase' does not exist on type 'NS'.
console.log( stringArray.map( s => s.toUpperCase() ) );

// Error: Property 'toFixed' does not exist on type 'NS'.
console.log( numberArray.map( n => n.toFixed() ) );
```
Ở ví dụ trên function `getTuple` có 2 tham số `a` và `b` có kiểu NS ( [Union type](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#union-types)) và trả về một tuple `[NS, NS]`.
<br>
Bây giờ chúng ta có một vài vấn đề với function trên:<br>
* Đầu tiên chúng ta không thể ràng buộc `a` và `b` có cùng kiểu dữ liệu bời vì `a`  và `b` có thể là chuỗi hoặc số.
* Thứ hai là khi fuction trả về 1 tuple (array) chứa các giá trị có kiểu string hoặc number và trình biên dịch Typescript không cho phép ta làm như vậy bởi vì nó cần phải biết chính xác kiểu dữ liệu của các giá trị trả về.

Cách để giải quyết vấn đề là sử dụng `any type` cho `a` và `b` và tuple [any, any]. Hoặc ta có thể sử dụng [type assertion](https://www.typescriptlang.org/docs/handbook/basic-types.html#type-assertions) để ép kiểu giá trị trong tuple (`NS` thành `string`  hoặc `number`).<br>
Tuy nhiên cả 2 cách đều có thể gây ra lỗi nếu như chúng ta không tiến hành kiểm tra thủ công kiểu dữ liệu của các giá trị.<br>
##### Và Generic type xuất hiện, giúp chúng ta giải quyết những vấn đề trên :satisfied: <br>
Typescript hỗ trợ mạnh cho generic, chúng ta có thể sử dụng generic cho function, class, interface....<br>
Bây giờ ta sẽ sửa lại ví dụ trên bằng cách sử dụng Generic function:
```typescript
// function that returns a tuple
function getTuple<T>( a: T, b: T ): [ T, T ] {
    return [ a, b ];
}


let stringArray = getTuple<string>( 'hello', 'world' );

let numberArray = getTuple<number>( 1.25, 2.56 );

let ucStrings = stringArray.map( s => s.toUpperCase() );

let numInts = numberArray.map( n => n.toFixed() );

// Error: Argument of type '"world"' is not assignable to parameter of type 'number'.
let mixedArray = getTuple( 1.25, 'world' );
```
Ta có thể ràng buộc a và b cùng kiểu dữ liệu bằng cách dùng generic type.<br>
Khi ta sử dụng cú pháp`getTuple<number>`, trình biên dịch Typescrpit sẽ thay thể `T` thành `number`. Vì vậy trình biên dịch TS sẽ diễn giải hàm `getTuple` như dưới đây :
```typescript
function getTuple( a: number, b: number ): [ number, number ] {
    return [ a, b ];
}
```
Dó đó giá trị trả về  của hàm là tuple `[number, number]` và trình biên dịch TS sẽ cho ta thao tác lên bộ giá trị này.(tương tự với `string`)<br>
Chúng ta có thể thay `T` bằng bất cứ tham số nào. Cú pháp ` f<Type>() `.
<br>
<br>
Ở ví dụ trên, ta để ý , khi ta gọi làm `getTuple( 1.25, 'world' )`.Trong lệnh gọi hàm, chúng ta đã bỏ giá trị của tham số generic.  Vì vậy, TypeScript sẽ suy ra kiểu dữ liệu cho T từ kiểu của đối số đầu tiên1.25 là `number` .  Do đó đối số thứ hai phải có cùng kiểu, nên lệnh gọi này sẽ dẫn đến lỗi biên dịch vì cả hai đối số phải cùng kiểu với mỗi khai báo hàm.Tương tự nếu ta thay đối số đầu tiên là 'word' thì trình biên dịch TS sẽ suy ra kiểu dữ liệu của `T` là `string`.

Ta có thể viết lại hàm getTuple bằng arrow function generic như sau :
```typescript
let getTuple = <T>( a: T, b: T ): [ T, T ] => { ... }
```
## 3. Khai báo Generic type
 Chúng ta có thể sử dụng generic cho function, class, interface....
### 3.1 Generic Function
Như chúng ta đã biết, TypeScript có thể suy ra kiểu dữ liệu từ giá trị. Nếu bạn di chuột vào tên hàm getTuple trong IDE của mình, bạn sẽ thấy kiểu dữ liệu trả về bên dưới của hàm. Đây là kiểu của hàm chúng ta vừa tạo.
```typescript
let getTuple: <T>(a: T, b: T) => [T, T]
```
Một generic type có thể chứa nhiều tham số khác nhau đại diện cho nhiều kiểu dữ liệu khác nhau, ví dụ nếu 2 tham số `a` và `b` khác nhau thì ta phải cần 2 tham số khác nhau để đại diện kiểu dữ liệu riêng cho chúng.
```typescript
let getTuple: <T, U>( a: T, b: U ) => [ T, U ] = ( a, b ) => {
    return [ a, b ];
}


let stringArray = getTuple<string, string>( 'hello', 'world' );

let numberArray = getTuple( 1.25, 2.56 );

let mixedArray = getTuple( 1.25, 'world' );
```
Do đó khi ta gọi hàm  `getTuple( 1.25, 'world' )` thì trình biên dịch sẽ không báo lỗi nữa vì đối số `a` và `b` có thể có các kiểu riêng biệt. <br>
Cách khai báo hàm getTuple tương tự :
```typescript
type TupleFunc = <T, U>( a: T, b: U ) => [ T, U ];
let getTuple: TupleFunc = ...;
```
### 3.2 Generic Interface
Một Interface cũng có thể đại diện cho một function.
```typescript
interface MyFunction {
  (a: number, b: string): any;
}
```
Interface trên sẽ đại diện cho một function nhận vào 2 đối số là `number` và `string`, trả về giá trị có kiểu là `any`.Ta có thể sử dụng interface này để khai báo type cho function:
```typescript
let myFunction: MyFunction = ( a, b ) => a+b;
```
Đối số `a` ,`b` sẽ nhận kiểu `number` và `string`. Giá trị trả về sẽ có kiểu `any`. <br>
#### 3.2.1 Khai báo generic function sử dụng interface
```typescript
// declare a generic function using interface
interface TupleFunction {
    <T, U>( a: T, b: U ): [ T, U ];
}

// declare a function of type `TupleFunction`
var getTuple: TupleFunction = ( a, b ) => {
    return [ a, b ];
}

// var stringArray: [string, string]
var stringArray = getTuple<string, string>( 'hello', 'world' );

// var numberArray: [number, number]
var numberArray = getTuple( 1.25, 2.56 );

// var mixedArray: [number, string]
var mixedArray = getTuple( 1.25, 'world' );
```
Ví dụ này giống với ví dụ trước đó, chỉ khác chúng ta tạo một interface kèm một generic function. Sẽ giúp chúng ta linh động hơn với kiểu dữ liệu của `a` và `b`.
#### 3.2.2 Định nghĩa một generic interface
Interface cho phép chúng ta định nghĩa các thuộc tính và phương thức của 1 object. Hãy tưởng tượng một object có các thuộc tính `a` và `b` và có hàm `getTuple` trả về `tuple` có kiểu dữ liệu của `a` và `b`.Làm thế nào để viết interface đó :thinking::thinking:?
<br>
```typescript
interface TupleObject {
    a: T; // ← invalid
    b: U; // ← invalid
    getTuple<T, U>(): [ T, U ];
}
```
Có thể bạn sẽ nghĩ như trên, tuy nhiên cách này sẽ không đúng. `ERROR : cannot find name 'T'`.
Cú pháp đúng sẽ là : <br>
```typescript
interface TupleObject<T, U> {
    a: T;
    b: U;
    getTuple(): [ T, U ];
}
```
Ex:<br>
```typescript
let tupleObj1: TupleObject<number, number> = {
    a: 1,
    b: 2,
    getTuple: function() {
        return [ this.a, this.b ];
    }
};

// tuple1: [number, number]
let tuple1 = tupleObj1.getTuple();
console.log( 'tuple1 =>', tuple1 ); // "tuple1 =>",  [1, 2] 

// var tupleObj2: TupleObject<string, number>
let tupleObj2: TupleObject<string, number> = {
    a: '1',
    b: 3,
    getTuple: function() {
        return [ this.a, this.b ];
    }
};

//  tuple2: [string, number]
let tuple2 = tupleObj2.getTuple();
console.log( 'tuple2 =>', tuple2 ); // "tuple2 =>",  ["1", 3] 
```
Hãy xem xét một tình huống khác cho ví dụ trên. Điều gì sẽ xảy ra nếu hàm getTuple chấp nhận một generic argument?
```typescript
interface TupleObject<T, U, V> {
    a: T;
    b: U;
    getTuple( c: V ): [ T, U, V ];
}
```
Lúc này type của `c` là cố định theo `V`.<br>
Trong một vài trường hợp chúng ta muốn type của `c` linh động hơn mà không phụ thuộc vào generic của `TupleObject`
ta có thể làm:
```typescript
// declare a generic interface with a genetic method
interface TupleObject<T, U> {
    a: T;
    b: U;
    getTuple<V>( c: V ): [ T, U, V ];
}

// var tupleObj: TupleObject<string, number>
var tupleObj: TupleObject<string, number> = {
    a: '1',
    b: 2,
    getTuple( c ) {
        return [ this.a, this.b, c ];
    }
};

// var tuple: [string, number, boolean]
var tuple = tupleObj.getTuple<boolean>( true );
console.log( 'tuple =>', tuple ); //"tuple =>",  ["1", 2, true] 
```
### 3.3 Generic class
Ex : <br>
```typescript
// declare a generic class
class Items<U> {
    public items: U[];

    constructor( ...values: U[] ) {
        this.items = values;
    }
}

// generic class extends another generic class
class Collection<T> extends Items<T> {
    getFirstItem(): T {
        return this.items[ 0 ];
    }
}

// a collection of `string` items
var letters = new Collection<string>( 1, 'b', 'c' );
//=>Argument of type 'number' is not assignable to parameter of type 'string'

// var item: string
var item = letters.getFirstItem();
console.log( 'item =>', item.toUpperCase() );
```
Trong ví dụ trên Collection là 1 generic class, khi tạo 1 thực thể của class Collection bằng từ khóa `new` ta cung cấp type `T` bằng syntax  `new Collection<Type>`. Trình biên dịch TS sẽ thay thế  `T` bằng type mà ta cung cấp.<br>
Type `T` được  sử dụng (suy ra) trong các thuộc tính `public`, `private`,`protected`, trong các phương thức cũng như là `contructor`.
Tuy nhiên đối với thuộc tính hoặc phương thức`static` thì trình biên dịch TS không cho sử dụng generic  `T`. <br><br>
Bạn có thể chuyển generic type  từ lớp con sang lớp cha trong kế thừa được minh họa bên dưới.  Mình đã sử dụng tham số U chỉ để chứng minh rằng tên tham số không quan trọng giữa các lớp và điều tương tự cũng áp dụng cho Interface.
```typescript
// declare a generic class
class Items<U> {
    public items: U[];

    constructor( ...values: U[] ) {
        this.items = values;
    }
}

// generic class extends another generic class
class Collection<T> extends Items<T> {
    getFirstItem(): T {
        return this.items[ 0 ];
    }
}

// a collection of `string` items
var letters = new Collection<string>( 1, 'b', 'c' );

// var item: string
var item = letters.getFirstItem();
console.log( 'item =>', item.toUpperCase() ); //"item =>",  "A" 

```
## 4.Ràng buộc generic type
### 4.1 Ràng buộc bằng `extends`
Ex :
```typescript
function merge<U, V>(obj1: U, obj2: V) {
    return {
        ...obj1,
        ...obj2
    };
}
```
Hàm merge là một hàm hợp nhất 2 đối tượng, Ex:
```typescript
let person = merge(
    { name: 'John' },
    { age: 25 }
);

console.log(result); //{ name: 'John', age: 25 }
```
Nó hoạt động tốt, hàm merge() muốn bạn truyền vào 2 object, tuy nhiên nó không ngăn bạn truyền vào như thế này :
```typescript
let person = merge(
    { name: 'John' },
    25
);

console.log(person); //{ name: 'John' }
```
TS không gặp bất cứ lỗi nào, hàm merge() làm việc với tất cả dữ liệu, tuy nhiên ta có thể ràng buộc hàm merge hoạt động với các object. Để làm được điều đó, ta sử dụng từ khóa `extends`:
```typescript
function merge<U extends object, V extends object>(obj1: U, obj2: V) {
    return {
        ...obj1,
        ...obj2
    };
}
```
Bây giờ hàm merge() đã bị ràng buộc kiểu dữ liệu.
```typescript
let person = merge(
    { name: 'John' },
    25
);
// ERROR : Argument of type '25' is not assignable to parameter of type 'object'.
```
### 4.2 Ràng buộc bằng `extends keyof`
Ex:
```typescript
function prop<T, K>(obj: T, key: K) {
    return obj[key];
}
```
Hàm props nhận vào 2 tham số là một đối tượng và 1 `key` của đối tượng.
Trình biên dịch sẽ gặp lỗi sau:
```typescript
Type 'K' cannot be used to index type 'T'.
```
Để khắc phục bạn phải ràng buộc kiểu dữ liệu K là `key` của kiểu dữ liệu `T` .
```typescript
function prop<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}
```
Nếu bạn truyền vào prop() một `key` hợp lệ thì trình biên dịch sẽ không báo lỗi :
```typescript
let str = prop({ name: 'John' }, 'name');
console.log(str);//John
```
```typescript
let str = prop({ name: 'John' }, 'age');
//error: Argument of type '"age"' is not assignable to parameter of type '"name"'.
```
## Tóm lược
* Sử dụng generic type trong typescript để tạo các funtion , interface, class... có tính linh động, tái sử dụng cao.
* Sử dụng từ khoá `extends` để giới hạn kiểu dữ liệu của tham số thành kiểu dữ liệu cụ thể.
* Sử dụng từ khoá `extends of` để ràng buộc kiểu dữ liệu là thuộc tính của một đối tượng khác.
## Tài liệu tham khảo
https://www.typescriptlang.org/docs/handbook/generics.html <br>
https://www.tutorialsteacher.com/typescript/typescript-generic <br>
https://medium.com/jspoint/typescript-generics-10e99078cc8
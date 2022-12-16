Khi làm việc với Typescript,chúng ta rất hay bị "Bối rối" về việc sử dụng Type và interface.Trong bài viết này mình sẽ phân tích 1 vài điểm khác
nhau giữa Type và Interface.

Typescript nâng cao của javascript,tất nhiên rồi ngoài nhưng tính năng đã có của javascript thì typescript cung cấp cho chúng ta thêm rất nhiều
tính năng khác,điển hình là Static Type.

Về cơ bản typescript có 3 loại types chính đó là
* Any type
* Built in type
* User defined type

Interface và Type thuộc loại thứ 3 - User defined type.

### 1.Khai báo
Type
``` ts
type Shape = {
  name: string;
  color: string;
};
```
Interface
```ts
interface Shape {
   name: string;
  color: string;
}
```
###  2.Interface có thể merge còn Type thì không
Trong cùng 1 file chúng ta khai báo như sau
``` ts
interface Shape {
   name: string;
}

interface Shape {
  color:string;
}

const Circle:Shape = {
  name:'circle',
  color:'blue'
}
```
Mọi thì đều ổn,còn với Type thì sao
```ts
type Shape {
   name: string;
}

type Shape {
  color:string;
}

const Circle:Shape = {
  name:'circle',
  color:'blue'
}
```
Ở đây chúng ta sẽ nhận được lỗi : "**Duplicate identifier 'Shape**."

###  3.Type có thể sử dụng được với "Computed Properties" còn interface thì không
Type
``` ts
type keys = 'color' | 'name';
type Shape = {
  [key in keys]:string;
}
const Circle:Shape = {
  name:'circle',
  color:'res'
}
```
Interface 
``` ts
type keys = 'color' | 'name';
interface Shape {
  [key in keys]:string;
}
const Circle:Shape = {
  name:'circle',
  color:'res'
}
```
Chúng ta sẽ nhận được lỗi **A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.**
###  4.Tuples Type
``` ts
type Tuple = [number, number];

interface ITuple {
  0: number;
  1: number;
}

[1, 2, 3] as Tuple; // Conversion of type '[number, number, number]' to type '[number, number]' may be a mistake

[1, 2, 3] as ITuple; // Ok
```
### 5.Type có Unions type còn interface thì không
Type
``` ts
type colors = 'blue' | 'green' ;

function setColor(color:colors){

}

```
Ngoài việc tự định nghĩa ra các type ,thì Typescript cũng cấp cho chúng ta [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html) rất hữu dụng khi làm việv với Legacy code.
### Tổng Kết
Vậy khi nào sử dụng Type và khi nào sử dụng Interface,cái này thì cá nhân mình cũng chưa phân biệt được rõ ràng ;)).Theo kinh nghiệm
làm việc của mình,dùng **Inferface** khi :

-Bạn viết library - và cung cấp public Api cho nguười khác dùng

Dùng **type** khi :

Bạn muốn một điều gì đó rõ ràng hơn interface
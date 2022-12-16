TypeScript được xem là một phiên bản nâng cao hơn của JavaScript vì nó được bổ xung thêm nhiều chức năng tiện lợi hơn. Điển hình mình muốn nói đến ở đây là Static Typing. Tính năng này giúp chúng ta có thể khai báo kiểu cho biến. Nhờ đó code viết bằng TypeScript dễ dự đoán hơn, và dễ debug hơn. Bài viết này mình xin trình bày một số khái niệm cơ bản trong Typescript và cách khai báo một số kiểu dữ liệu cơ bản. 

## 1.Tìm hiểu về Type Annotation và Type Inference trong Typescript. 
Như mình đã nói ở trên thì TypeScript giúp chúng ta có thể khai báo kiểu cho biến. Việc chúng ta khai báo kiểu cho biến đó được gọi là Type AnnoTation. 


```typescript
// Để gán Type chúng ta dùng ": Type" sau biến:
let name: string = “Hoang Lao Ta”; //gán type string cho name.
let age: number = 23; // gán type number cho age.
let isFat: boolean = true; // gán type boolean cho isFat.

name = 23;
// Nếu gán lại một số cho name thì sẽ bị báo lỗi:  
// error: Type 'number' is not assignable to type 'string'.
```
 
Ngoài **Type AnnoTation** thì TypeScript còn 1 cách khác để nhận biết được các kiểu dữ liệu. Đó là **Type Inference**, **Type Inference** là một tính năng giúp TypeScript có thể tự suy đoán kiểu dữ liệu của một biến nhờ vào giá trị ban đầu khi chúng ta khai báo biến đó. 

Do đó ví dụ trên có thể viết lại như sau: 

```js
let name = “Hoang Lao Ta”; //gán type string cho name.
let age = 23; // gán type number cho age.
let isFat = true; // gán type boolean cho isFat. 
```
 
## 2. Sử dụng Type Annotation để báo type cho Array và Object.
### 2.1 Array: 
Đối với array trong TypeScript thường có hai cách khai báo. 
```typescript
Cách 1 dùng :  Type[]; 
Cách 2 dùng :  Array<Type>;

// VD: 

// Khai báo array listName nhận vào các phần tử là string. 
let listName: string[] = [‘Hoa’, ‘Nam’, ‘Phu’]  // Cách 1
let listName: Array<listName> =  [‘Hoa’, ‘Nam’, ‘Phu’] // Cách 2


// Khai báo array listAge nhận vào các phần tử là number.  
let listAge: number[] = [23, 24, 25]  // Cách 1
let listAge: Array<number> = [23, 24, 25]  // Cách 2


// Khai báo array mix nhận được cả ba kiểu dữ liệu string, number và boolean.
let mix: (string | number | boolean)[] = ['Phú', 25, false] 
let mix: Array<string | number | boolean> = ['Phú', 25, false] 
```
### 2.2 Object:
Đối với trường hợp khai báo type cho Object chúng ta có thể dùng cách khai báo trực tiếp như sau:
```typescript
var Person:  { 
	name: string; 
    age: number;
    isFat: boolean;
} = {name: 'Lui', age: ‘24’, isFat: false} 
```

Ngoài ra chúng ta còn có thể  dùng type và interface để khai báo 1 type object riêng sau đó dùng **Type AnnoTation**  thêm type object đó vào trước tên biến. 

## 3. Vậy Type và interface trong Typescript là gì? 
### 3.1 Giới thiệu
Type và interface trong TypeScript là những từ khóa dùng để khai báo các type object. Tên của các type object này thường sẽ được viết hoa. 


VD1: Khai báo một type object là PersonType có các properties là name, age và isFat dùng type: 
```typescript
type PersonType = {
	name: string;
    age: number;
    isFat: boolean;
}
```
 Khi đã có type object thì việc khai báo type cho object sẽ ngắn gọn hơn nhiều. Cũng ví dụ ở 2.2 chúng ta có thể viết lại như sau: 
```typescript
var Person: PersonType = {name: 'Lui', age: ‘24’, isFat: false} 
```

Dùng interface khá tương tự nhưng sẽ hơi khác nhau về cú pháp khai báo.

```typescript
interface UserType  {
	name: string;
    age: number;
    isFat: boolean;
}

var Person: PersonType = {name: 'Lui', age: ‘24’, isFat: false} 
```
### 3.2 Tiện lợi khi sử dụng interface và type
* Giúp code chúng ta rõ ràng dễ đọc dễ hiểu hơn. 
* Nhờ việc tạo ra các type object riêng biệt mà chúng ta có thể tái sử dụng lại các type object cho nhiều biến, nhiều chỗ khác nhau. 

### 3.3 Sự khác nhau giữa type và interface
**Khai báo các kiểu dữ liệu khác**

Interface chỉ được sử dụng để khai báo các type object. Con Type ngoài việc dùng khai báo type object như interface nó còn được dùng cho cách kiểu dữ liệu khác như primitives, unions hay tuples. (unions và tuples sẽ được giới thiệu ở phần sau)

```typescript
// primitives
type Name = string; 
type age = number;
type isFat = boolean;

// union
type UnionType= string | number | boolean;

// tuple
type Data = [number, string, boolean]; 
```

**Extend**

Để mở rộng kiểu dữ liệu đã có. Chúng ta dùng “&” cho những biến được khởi tạo bằng type, và dùng “extends” cho những biến khởi tạo bằng interface. 

Xét ví dụ sau để hiểu rõ hơn:

```typescript
//Khởi tạo 1 object type là human
type HumanType = {age : number}
 
//Khai báo thêm Type Object là UserType extend từ HumanType và thêm property name
 
type UserType = HumanType & {name: string} // c1: dùng type
// UserType = {age: number; name: string}


interface UserType extends HumanType { name: string} //c2: dùng interface
// UserType = {age: number; name: string}
```

**Declaration merging**

interface cho phép chúng ta định nghĩa một object type nhiều lần. Giá trị của tất cả các object type cùng tên được định nghĩa sẽ được merge lại với nhau.
 
```typescript
interface Human {name: string};
interface Human {age: number};
interface Human {gender: string};

const user: Human = {name: ‘hoa’, age: 16, gender: male};
```

Còn khi chúng ta định nghĩa một object type nhiều lần bằng type thì sẽ báo lỗi. 
```typescript
type Human = {name: string}
type Human = {age: number}
//Error: Duplicate identifier “Human”.
```

## 4. Các kiểu dữ liệu thường sử dụng phổ biến trong TypeScript. 

* String : Kiểu chuỗi. 
* Number : Tất cả các giá trị số tính luôn cả số nguyên số thực. 
* Boolean :  true or false sử dụng 0 1 sẽ gây ra lỗi biên dịch. 
* Any : Một biến với kiểu này có thể có giá trị string, boolean hoặc bất kỳ kiểu dữ liệu nào. 
* Arrays : Có 2 kiểu cú pháp: Type[ ] hoặc Array<Type> 

* Tuple : Có thể hiểu là kiểu dữ liệu mở rộng của array. Giúp chúng ta kiểm soát được thứ tự kiểu  dữ liệu của các phần tử trong array.
    
VD: Tạo mảng list có kiểu dữ liệu của các phần tử vị trí index  0 - 1 -  2  lần lược là string - number - boolean
    
```typescript
let list: [string, number, boolean] = [‘hoang’,23];

list[0] = 123;
// Lúc này nếu chúng ta cố tình gán  giá trị của phần tử thứ nhất 
// trong mảng thành number thì sẽ bị báo lỗi.
// error:  Type 'number' is not assignable to type 'string'.
```
    
Lưu ý: Tuple cũng giống như array nên chúng ta cũng có thể dùng các methods của array cho Tuple. 

```typescript
let person: [string, number] = [‘hoang’,23];

person.push(213, ‘Lui’)    
// Hợp lệ vì kiểu dữ liệu thêm và là string và number. 
// Nhưng nếu thêm vào boolean hoặc các kiểu dữ liệu khác thì sẽ bị báo lỗi. 

person.push(true) 
// error:  Argument of type 'true' is not assignable to parameter of type 'number | string'.
```

* Union : Là kiểu dữ liệu cho phép chúng kết hợp nhiều kiểu dữ liệu lại với nhau sử dụng | . 

```typescript
VD: let age:  string | number;
age = 17;  //OK
age = “mười bảy”;  //OK
age = true; // Compiler Error

// Lưu ý : Union type dùng cho mảng hay function sẻ được bao bởi ():
// Khai báo mảng list vừa nhận các phần tử là string và number. 
    let list: (boolean | string)[];
```

* Enum :  Enum là từ viết tắt của Enumeration (sự liệt kê), Enum dùng để định nghĩa kiểu dữ liệu với số lượng giá trị hữu hạn. 

Cú pháp khởi tạo:

```typescript
enum Place {
	HaNoi,
	DaNang,
	Hue, 
}
```
Giá Trị phần tử: 
Giá trị mặc định của các phần tử là giá trị số, bắt đầu từ số 0. Ở ví dụ trên:
```typescript
enum Place {
	HaNoi,  // Giá Trị 0
	DaNang,   // Giá Trị 1
	Hue,  //Giá Trị 2
}
    
// Place.HaNoi = 0
```
Chúng ta cũng có thể chủ động khởi tạo giá trị: 
```typescript
enum Place {
	HaNoi = 3,  // Chúng ta gán giá trị là 3
	DaNang,   // Giá Trị 4
	Hue,  //Giá Trị 5
	NhaTrang = 8, // Chúng ta gán giá trị là 8
	Vinh, // Giá Trị 9
}
// Giá trị do TypeScript tự động khởi tạo sẽ tự động tăng lên
    1 đơn vị so với giá trị trước nó. 
```
Enum thường dùng để gom các constant vào một nhóm để code để hiểu hơn: 
```typescript
enum BootstrapStatus {
      success = 'success',
      info = 'info',
      warning = 'warning',
      danger = 'danger',
    }
``` 
    
* Never :  Never trong Typescript là kiểu sẽ không nhận giá trị. Thông thường chúng ta dùng never để định nghĩa kiểu cho một hàm luôn tạo ra lỗi hoặc một hàm chứa vòng lặp vô hạn. 
* Void : Sử dụng cho hàm khi hàm không trả về bất cứ giá trị nào. Cùng tìm hiểu thêm cách khai báo type cho function ở phần sau để hiểu rõ hơn nào...

## 5. Khai báo type cho function

Ngoài các kiểu khai báo dữ liệu ở phần 4 thì chúng ta còn có **Function Type**  với cú pháp (TenThamSo: Type) => Type. Để khai báo kiểu hàm cho một biến. 

VD:  Khai báo biến print có kiểu dữ liệu là function nhận vào một tham số có type là string và không trả về giá trị nào cả. (Lúc này chúng ta sử dụng "void" cho giá trị trả về của hàm print)
```typescript
let print:  (name: string)  => void;
  
add = function (name: string) {
    console.log(name)
};
    
// Có thể viết lại như sau: 
let print:  (name: string)  => void = function (name) {
    console.log(name)
};
// Or
let print:  (name: string)  => void =  name => {
    console.log(name)
};
```
Thông thường chúng ta sử dụng **Function Type** cho các biến chỉ khai bảo kiểu hàm mà chưa gán giá trị. (VD như khai báo propsType trong react). Đối với những biến được gán giá trị để làm gọn code thì lúc khai báo thì sẽ dùng **Type AnnoTation** chú thích type cho chúng : 
    
VD trên có thể viết lại như sau: 
```typescript
let print =  (name: string) : void => {
    console.log(name)
};
```
VD khác: Khai báo biến add có type là function nhận vào hai tham số có kiểu là number và trả về giá trị có kiểu là number.  
```typescript
// function expression use Type AnnoTation
let myAdd1 = function (x: number, y: number): number  {
  return x + y;
};

// function expression use Type AnnoTation and Type Inference
let myAdd1 = function (x: number, y: number)  {
  return x + y;
};

    
// function expression use Function Type
let myAdd2: (x: number, y: number) => number = function (x, y) {
  return x + y;
};
    
//Đối với function declaration thì chỉ có thể dùng Type AnnoTation để chú thích Type
function myAdd3(x: number, y: number): number {
  return x + y;
}
```
 **** 
Cảm ơn mọi người đã theo dõi bài viết của mình.


Tài liệu tham khảo: 
- https://www.typescriptlang.org/docs/handbook/functions.html#typing-the-function
- https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types
- https://comdy.vn/typescript/function-trong-typescript/
- https://thinhdora.me/development/typescript-enums-nhung-dieu-co-the-ban-chua-biet
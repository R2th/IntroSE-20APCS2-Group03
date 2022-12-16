## 1. Unions type: |
Trong javascript thì kí hiệu | để tính bit : 
Toán tử OR (|) sẽ trả về 1 nếu 1 trong mỗi vị trí của các bit tương ưng có có bit có giá trị là 1 hoặc cả hai đều có 1.
Trong javascipt example : 
```
const a = 5;
const b = 3;
console.log(a | b);
// expected output: 7
```
Cách nó trả về kết quả là 7 : 
5 có mã nhị phân là 101, 3 có mã nhị phân là 011
Tính theo phương thức OR sẽ có kết quả 111.
![](https://images.viblo.asia/b140c43c-102a-4fd4-a9f4-dc29b4f0cbc4.png)
Trong TypeScript là 1 extension của Javascript thì bạn có thể dùng như trên, ngoài ra trong typescript bạn có thể dùng (|) để biểu thị unions type:

![](https://images.viblo.asia/d9fbd057-260b-4d37-a7c4-dd5367d37eef.png)

Đôi khi một kiểu có 1 vài giá trị khả dĩ vì vậy chúng ta có thể sử dụng unions type để biểu diễn chúng : 
```
type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";
function xhr(method: HttpMethod, url: string): void {
    console.log(`${method}: ${url}`);
}
```

TypeScript sẽ kiểm tra kiểu mà chúng ta cung cấp ở trên : 
![](https://images.viblo.asia/e05c792e-dcf3-475a-aa23-a16fda01aa9c.png)

Nó sẽ chúng ta ko có kiểu "Get" ở trên giúp tránh được rất nhiều lỗi.

## 2. Intersection Types: &
Giống với toán tử | , toán tử & cũng để so sánh bit.
Trong typescript , & cũng có thể được sử dụng để chỉ ra loại giao nhau : 
```
interface Runnable{
    run(): void;
}
interface Swimmable{
    swim(): void;
}
```
Sau đó , chúng ta define ra 1 kiểu mới , kiểu Goose vừa có thể bơi vừa có thể run : 
```
type Goose = Runnable & Swimmable;
```

![](https://images.viblo.asia/c4220452-3230-4823-8999-1942d5f196c6.png)

Nếu parameter ko đủ cả 2 interface thì trình biên dịch sẽ báo lỗi : 
![](https://images.viblo.asia/88a3ce80-f244-421f-8042-a7e63f299205.png)

## 3. Numeric Separators: _
Nếu trong code bạn viết 1 đoạn số rất dài bạn có thể viết : 
```
let total = 12_2300_222;
```
cách này giúp bạn khỏi mất vài giây để đọc nhưng số dài.
## 4. Non-null assertion operator: !

Trong Javascript toán tử ! dùng để đảo ngược giá trị boolean.
```
!false // return true
!true // return false
let flag = false;
flag = !flag;
console.log(flag); // true
```

Trong Typescript   bạn có thể sử dụng nó như sau : 
![](https://images.viblo.asia/9c604dec-2c62-4fa0-a30c-383090139755.png)

Trong đoạn code trên maybeString có thể là 1 chuỗi string hoặc null. Nếu bạn chắc maybeString luôn luôn là chuỗi string thì bạn có thể dùng cách sau để complile ko bị lỗi : 
![](https://images.viblo.asia/5a5d7bcc-6d57-4232-9da2-1927500563ed.png)

## 5. Optional notation: ?
Kí hiệu này có 2 cách dùng :  ?. and ?:

**Optional Chaining: ?.**
 Thi thoảng , 1 object có chứa thuộc tính đấy hay không , điều này có thể khiến cho việc viết mã trở nên khó.
 
 Javascript code : 
 
 `function getCity(user){
    return user.location.city
}`

Nếu user ko có param location thì sẽ bị lỗi runtime: 
![](https://images.viblo.asia/5db94b10-9671-4471-9e4e-f83ef4451ea7.png)

Để sửa lỗi trên thì trong javascirpt sẽ viết : 
```
function getCity(user){
    return user.location ? user.location.city : undefined
}
```

Cách trên thì chúng ta check xem user.location có tồn tại ko thì trả về giá trị city còn ko sẽ trả về undefined.

Cách trên viết hơi rắc rối 1 chút, trong typescirpt có thể viết như sau : 
```
function getCity(user: any){
    return user.location?.city
}
getCity({name: 'Jon'})
```

Nếu user.location ko có giá trị thì ngừng truy cập vào biến city.

Đoạn code trên sẽ biên dịch như sau : 
```
function getCity(user) {
    var _a;
    return (_a = user.location) === null || _a === void 0 ? void 0 : _a.city;
}
```
void 0 sẽ tương ứng với undefined.

- Kí hiệu ? cũng được sử dụng trong khi gọi hàm . Ví dụ đoạn code javascript sau : 
```
function run(obj){
    obj.run()
}
```

![](https://images.viblo.asia/180cf4b8-e53a-4ce2-b0a3-74b8148aac92.png)

Nếu tham số obj ko có hàm run thì sẽ báo lỗi như trên, bạn có thể viết như sau trong typescript để complie 1 cách an toàn : 

```
function run(obj: any){
    obj.run?.()
}
run({})
```

**Optional Properties: ?:**
 Ngoài việc sử dụng toán tử trên để check object có thuộc tính hay không bạn có thể dùng nó khi define 1 thuộc tính : 
 ![](https://images.viblo.asia/f14977e8-78e1-475d-8da6-318e13ba9377.png)
Lỗi này là do trình biên dịch mong đợi user1 bắt buộc phải khởi tạo 2 thuộc tính là name và email. Nhưng trong thực tế bạn chỉ muốn truyền value name và value email có thể là trường ko bắt buộc , bạn có thể sửa bằng cách viết như sau : 

![](https://images.viblo.asia/30b01a27-82ee-43b1-ae72-4129ea36200a.png)

Thêm dấu ? vào sau thuộc tính để báo rằng value của thuộc tính này là tuỳ chọn.

# 6. Nullish coalescing operator: ??

```
let a = null
let b =  a ?? "default string";  // default string
```

Dấu ?? trên có ý nghĩa nếu a có giá trị null thì sẽ b sẽ nhận giá trị "default string " còn ngược lại sẽ nhận giá trị a.

## 7. Private property: #
Để báo cho trình biên dịch biết class có thuộc tính private thì ta viết # trước thuộc tính đấy : 
```
class Person{
    #name: string;
    constructor(name: string) {
        this.#name = name
    }
    greet(){
        console.log(`Hello, I am ${this.#name}`)
    }
}
```

Vậy các bạn sẽ thắc mắc từ khoá # khác gì từ khoá private: 

```
class Person {
	#name: string;
	private location: string;

	constructor(name: string, location: string) {
	this.#name = name;
	this.location = location;
	}
}
```

Các thuộc tính khai bao từ khoá private sẽ tồn tại trong instance và chúng ta có thể force access vào chúng còn  thuộc tính  khai báo  # sẽ ko lưu trữ trực tiếp trong instance : 

```
class Person {
	#name: string;
	private location: string;

	constructor(name: string, location: string) {
	this.#name = name;
	this.location = location;
	}
}

let json = new Person ("Jon",  "viet");
console.log((json as any).location); // viet
console.log((json as any).name); // undefined
```

## 8. Angle brackets: <>

Từ khoá này dùng ở 2 nới : một cho type assertions và hai cho generic types

##  Type assertions

![](https://images.viblo.asia/42a4326e-8f54-4199-8893-1ca060ea098c.png)

 Vì khi compiler, someValue có nhận vào 2 type string hoặc number nó sẽ ko match với tham số của function doubleString. Phân tích code 1 chút chúng ta có thể thấy someValue có thể là kiểu string .Chúng ta có thể sử dụng <> để nói với trình biên dịch rằng : someValue phải là string.
 
![](https://images.viblo.asia/f07075a3-1ea0-4d20-8cb1-feee71f14c0b.png)

Tuy nhiên TSLint, không khyết khích bạn sử dụng cách trên thay vào đó hãy sử dụng : 
![](https://images.viblo.asia/c09682bc-ea14-4bc6-b405-4e18501ee39c.png)

## 9. Generic types
Dùng Typescript giúp chúng ta viết code nó an toàn hơn nhưng cũng hy sinh tính linh hoạt của javascript.
Ví dụ nếu ta viết function add gồm 2 đối số có thể string hoặc number, chúng ta sẽ viết như sau trong javascript :
```
function add(a, b){
  return a + b
}
```
Tuy nhiên, rất khó thực hiện trong typescript , bạn khó có thể viết : 
```
function add(a: string | number, b: string | number) {
    return a + b;
}
```

bởi vì không thể thêm trực tiếp các kiểu union type, trình biên dịch sẽ báo lỗi , hoặc bạn có thể viết kiểu dưới nhưng rất hard code : 
```
function addString(a: string, b: string) {
    return a + b;
}
function addNumber(a: number, b: number) {
    return a + b;
}
```

Trong trường hợp trên chúng ta có thể viết như sau : 
```
function add<T>(a: T, b: T){
    return a as any + b
}
```

Đoạn mã có nghĩa là hàm add chưa chắc chắn loại kiểu dữ liệu nào vì vậy chúng ta sẽ chuyền kiểu dữ liệu khi chúng ta sử dụng chúng : 
![](https://images.viblo.asia/16fc4eb7-68f6-42ba-9ee4-52bf0837486a.png)

## 10. Decorators: @

giả sử chúng ta có 1 chức năng sau : 
```
function hello(name) {
    console.log("Hello " + name)
}
```
Chúng tôi muốn sẽ in ra log mỗi call hello , bạn sẽ làm như thế nào ?
Trong javascript sẽ ko có cách nào thực hiện điều này trực tiếp nhưng chúng ta có thể wrap hello với decorator function : 
![](https://images.viblo.asia/ba5fac39-e478-4388-9f0d-5d2e2f79ba93.png)

The results:
```
Start execute function "hello" at 2021-03-17T04:15:47.724Z
Hello Jack
```

Trong JS điều này nó ko được thanh lịch lắm nhưng trong typescript đã cung cấp decorator sytax để làm điều này : 
Ví dụ : 
```
class Friend {
    name: string;
    constructor(name: string) {
        this.name = name
    }
    hello() {
        console.log(this.name + " says: Hello")
    }
}
```

khi bạn muốn in ra log khi call hàm hello , bạn có thể chỉ đinh decorator function logging lên hàm hello .

Nếu bạn muốn define lại 1 hàm decorator cho 1 lớp thì hàm decorator phải có định dạng sau : 
```
function logging(target: any, propertyKey: string,
                 descriptor: PropertyDescriptor) {
                 // do something
}
```

Kết quả : 
```
function logging(target: any, propertyKey: string,
                 descriptor: PropertyDescriptor) {
                     let func: Function = target[propertyKey];
console.log(`Start execute function "${func.name} at ${new Date().toISOString()}`);
}

class Friend {
    name: string;
    constructor(name: string) {
        this.name = name
    }
    @logging
    hello() {
        console.log(this.name + " says: Hello")
    }
}

let friend = new Friend("le huu dung");
friend.hello();
```

Kết quả sau khi run đoạn code trên : 
```
"Start execute function "hello at 2021-09-19T15:22:13.024Z" 
```

 Đây là cách mà chúng ta ghi ra nhật khi log vào nhiều phương thức mà ko cần thay đổi phương thức đó.
 
 Bài viết của mình đến đây là hết , cám ơn bạn đã xem.
 
##  Tài liệu tham khảo : 
 https://javascript.plainenglish.io/10-confusing-typescript-notations-i-wish-i-understood-earlier-d1c6f722828c
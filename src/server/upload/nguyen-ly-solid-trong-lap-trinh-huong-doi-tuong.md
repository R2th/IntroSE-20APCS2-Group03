Lập trình hướng đối tượng mang lại một thiết kế mới trong việc phát triển phần mềm. Hầu hết các lập trình viên đều biết đến 4 tính chất cơ bản trong OOP:
1. Tính đóng gói (Encapsulation)
2. Tính kế thừa (Inheritance)
3. Tính trừu tượng (Abstraction)
4. Tính đa hình (Polymophirsm)

Nó cho phép lập trình viên kết hợp dữ liệu với cùng chức năng trong 1 lớp để giải quyết một vấn đề trên toàn bộ ứng dụng. Tuy nhiên để thiết kế một ứng dụng có độ linh hoạt cao thì cần phải áp dụng thuần thục các kiến thức về Design pattern các nguyên tắc trong thiết kế và lập trình. Và SOLID là một tập hợp trong các nguyên tắc đó. SOLID bao gồm những nguyên tắc sau: 

1. [S]ingle responsibility principle
2. [O]pen-Closed Principle
3. [L]iskov Substitution Principle
4. [I]nterface Segregation Principle
5. [D]ependency Inversion Principle

Năm nguyên tắc này giúp cho lập trình viên tạo ra những project có code dễ đọc, dễ bảo trì và mở rộng. Và việc quan trọng nhất là việc bảo trì code sẽ dễ hơn rất nhiều.
## 1. Nguyên lý thứ nhất: Single responsibility principle
> Mỗi `Class` chỉ nên có một chức năng duy nhất.

Một `Class` chỉ nên chịu trách nhiệm cho một chức năng(function) duy nhất. Nếu một `Class` có nhiều hơn một chức năng (function) thì việc thay dổi một chức năng sẽ dẫn đến việc thay đổi các chức năng khác.
Cùng xem ví dụ sau: 

```
class Animal {
constructor(name: string){ }
getAnimalName() { }
saveAnimal(a: Animal) { }
}
```

`Class Animal` đã vi phạm nguyên lý thứ nhất (Single responsibility principle).

*Vậy nó vi phạm như thế  nào ?*

SRP nói rằng mỗi một `Class` chỉ nên có một chức năng nhưng ở đây ta có thể  thấy có hai chức năng: Xử lý dữ liệu trên DB và xử lý về thuộc tính.
Hàm `constructor` và `getAnimalName()` quản lý các thuộc tính, còn hàm `saveAnimal` quản lý lưu trữ Animal trên DB.

*Vậy thiết kế này sẽ gây ra những vấn đề gì trong tương lai?* 

Nếu ứng dụng thay đổi làm ảnh hưởng đến DB thì thuộc tính của `Class Animal` sẽ bị ảnh hưởng theo. Điều này không tốt chút nào. Việc này giống với hiệu ứng domino, thay đổi một phần nhỏ sẽ ảnh hưởng đến cả những phần khác.
Vậy để  ví dụ trên thỏa mãn nguyên lý thứ nhất(SRP) ta cần tạo thêm một `Class` khác với chức năng lưu trữ dữ liệu trên DB.

```
class Animal {
    constructor(name: string){ }
    getAnimalName() { }
}
class AnimalDB {
    getAnimal(a: Animal) { }
    saveAnimal(a: Animal) { }
}
```

Mọi thứ đã rõ ràng hơn trước. `Class Animal` sẽ chỉ làm việc với đối tượng `Animal` trong khi `Class AnimalDB` sẽ chỉ làm việc với DB.

## 2. Nguyên lý thứ hai: Open-Closed Principle
> Các thực thể  (Class, Module, Function) nên được mở rộng ra, không nên sửa đổi.

 Ta tiếp tục với `Class Animal`.
 
```
class Animal {
constructor(name: string){ }
getAnimalName() { }
}
```

Ở đây chúng ta muốn có một vòng lặp chạy qua danh sách các loài động vật và lấy ra tiếng kêu của chúng.

```
const animals: Array<Animal> = [
    new Animal('lion'),
    new Animal('mouse')
];

function AnimalSound(a: Array<Animal>) {
    for(int i = 0; i <= a.length; i++) {
        if(a[i].name == 'lion')
            log('roar');
        if(a[i].name == 'mouse')
            log('squeak');
    }
}
AnimalSound(animals);
```
Ở đây `function AnimalSound` đã vi phạm nguyên lý thứ hai(OCP) vì nó không thể hoàn thành khi chúng ta tạo thêm một loài động vật mới. Cụ thể như sau:

Nếu thêm một loài động vật mới: 
```
const animals: Array<Animal> = [
    new Animal('lion'),
    new Animal('mouse'),
    new Animal('snake')
]
```

Ta sẽ phải sửa lại `function AnimalSound`
```
function AnimalSound(a: Array<Animal>) {
    for(int i = 0; i <= a.length; i++) {
        if(a[i].name == 'lion')
            log('roar');
        if(a[i].name == 'mouse')
            log('squeak');
        if(a[i].name == 'snake')
            log('hiss');
    }
}
AnimalSound(animals);
```
 
 Có thể thấy rằng với mỗi `Animal` mới được tạo ra, ta sẽ phải thêm logic vào cho `function AnimalSound`. Đây là ví dụ đơn giản. Khi ứng dụng của bạn phát triển và phức tạp hơn thì `function AnimalSound` sẽ phình to ra và rất khó để  kiểm soát.
 
 Để ví dụ trên thỏa mãn nguyên lý thứ 2(OCP) ta sẽ thay đổi như sau: 
 
 ```
class Animal {
        makeSound();
}
class Lion extends Animal {
    makeSound() {
        return 'roar';
    }
}
class Squirrel extends Animal {
    makeSound() {
        return 'squeak';
    }
}
class Snake extends Animal {
    makeSound() {
        return 'hiss';
    }
}
//...

function AnimalSound(a: Array<Animal>) {
    for(int i = 0; i <= a.length; i++) {
        log(a[i].makeSound());
    }
}
AnimalSound(animals);
```
`Class Animal` có một phương thức ảo (virtual method) `makeSound`. Mỗi con vật kế thừa từ `Class Animal` và thực hiện phương thức `makeSound`. 

Mỗi con vật thêm tiếng kêu (sound) riêng của nó trong phương thức `makeSound`. Sau đó hàm `AnimalSound` lặp lại thông qua mảng các `Animal` và gọi đến phương thức `makeSound` của con vật đó.

Bây giờ nếu ta thêm một con vật với hàm `AnimalSound` không cần thay đổi. Tất cả những gì cần làm là thêm động vật mới vào mảng động vật và tạo cho nó một tiếng kêu trong phương thức `makeSound` kế thừa từ `Class Animal`.

Hàm `AnimalSound` bây giờ đã thỏa mãn nguyên lý số 2

Cùng xem thêm một ví dụ khác.

Hãy tưởng tượng bạn có một cửa hàng. Và bạn muốn giảm giá 20% cho những khách hàng đặc biệt. Ta có:

```
class Discount {
    giveDiscount() {
        return this.price * 0.2
    }
}
```

Và sau đó bạn lại muốn gấp đôi mức giảm giá 20% cho những khách hàng VIP, bạn sẽ sửa lại `Class Discount` như sau: 

```
class Discount {
    giveDiscount() {
        if(this.customer.type == 'fav') {
            return this.price * 0.2;
        }
        if(this.customer.type == 'vip') {
            return this.price * 0.4;
        }
    }
}
```

Điều này là vi phạm nguyên lý thứ 2. Nếu chúng ta muốn có một mức chiết khấu cho những loại khách hàng khác chúng ta sẽ phải thêm code vào `Class Discount`

Để `Class Discount` thỏa mãn nguyên lý số 2 (OCP) chúng ta thêm một `Class` khác kế thừa từ `Class Discount`.

```
class VIPDiscount: Discount {
    getDiscount() {
        return super.getDiscount() * 2;
    }
}
```

Bây giờ nếu muốn chiết khấu cho những khách hàng `SupperVIP` với mức 80% ta làm như sau: 

```
class SuperVIPDiscount: VIPDiscount {
    getDiscount() {
        return super.getDiscount() * 2;
    }
}
```
  
Điều này là thỏa mãn nguyên lý thứ 2(OCP): mở rộng chức năng mà không sửa đổi

## 3. Nguyên lý thứ ba: Liskov Substitution Principle
```
Class con có thể thay thế Class cha của nó
```

Mục tiêu của nguyên lý này nói rằng một `Class` con có thể thay thế `Class` cha mà không gây ra lỗi trong chương trình. 
Cùng xem ví dụ sau: 

```
function AnimalLegCount(a: Array<Animal>) {
    for(int i = 0; i <= a.length; i++) {
        if(typeof a[i] == Lion)
            log(LionLegCount(a[i]));
        if(typeof a[i] == Mouse)
            log(MouseLegCount(a[i]));
        if(typeof a[i] == Snake)
            log(SnakeLegCount(a[i]));
    }
}
AnimalLegCount(animals);
```

hàm `AnimalLegCount` vi phạm nguyên lý thứ 3(LSP) (và cả nguyên lý thứ 2 OCP). Hàm `AnimalLegCount` phải biết được tất cả mọi loài động vật và gọi đến hàm `LegCount` liên quan. 

Vậy với mỗi con vật mới được tạo ra hàm `AnimalLegCount` phải sửa đổi để chấp nhận con vật mới được tạo ra.

Ví dụ: 

```
class Pigeon extends Animal {
        
}
const animals[]: Array<Animal> = [
    //...,
    new Pigeon();
]
function AnimalLegCount(a: Array<Animal>) {
    for(int i = 0; i <= a.length; i++) {
        if(typeof a[i] == Lion)
            log(LionLegCount(a[i]));
        if(typeof a[i] == Mouse)
            log(MouseLegCount(a[i]));
         if(typeof a[i] == Snake)
            log(SnakeLegCount(a[i]));
        if(typeof a[i] == Pigeon)
            log(PigeonLegCount(a[i]));
    }
}
AnimalLegCount(animals);
```

Để hàm này thỏa mãn nguyên lý thứ 3(LSP) ta định nghĩa lại hàm `AnimalLegCount` như sau:

```
function AnimalLegCount(a: Array<Animal>) {
    for(let i = 0; i <= a.length; i++) {
        a[i].LegCount();
    }
}
AnimalLegCount(animals);
```

Hàm `AnimalLegCount` không quan tâm đến loại `Animal`, nó chỉ gọi phương thức `LegCount`. Tất cả những gì nó cần là một tham số phải thuộc `Class Animal` hoặc `Class` con của nó.

`Class Animal` sẽ định nghĩa một phương thức có tên là `LegCount`

```
class Animal {
    //...
    LegCount();
}
```

Và các `Class` con cũng thực hiện phương thức `LegCount`

```
class Lion extends Animal{
    //...
    LegCount() {
        //...
    }
}
//...
```

Khi được truyền vào hàm `AnimalLegCount` nó sẽ gọi đến phương thức `LegCount` của `Class Lion` và trả về số chân của con sư tử.

Ta thấy, hàm `AnimalLegCount` không cần biết động vật đó là con gì để trả về số lượng chân của nó. Hàm `AnimalLegCount` chỉ gọi đến phương thức `LegCount` của loài động vật đó. Vì `Class` con của `Class Animal` phải thực thi phương thức `LegCount`

## 4. Nguyên lý thứ tư: Interface Segregation Principle
>Thay vì dùng 1 interface lớn với mục định chung, ta nên tách thành nhiều interface nhỏ, với nhiều mục đích cụ thể.
Nguyên tắc này đề cập đến những nhược điểm của việc triển khai các interface lớn.

Ta xem ví dụ sau:

```
interface IShape {
    drawCircle();
    drawSquare();
    drawRectangle();
}
```

`Interface` này làm 3 nhiệm vụ: `drawCircle`, `drawSquare`, `drawRectangle`. Các `Class Circle`, `Square` hay `Rectangle` muốn thực hiện (implement) `interface IShape` phải định nghĩa các hàm `drawCircle()`, `drawSquare()`, `drawRectangle()`.

```
class Circle implements IShape {
    drawCircle(){
        //...
    }
    drawSquare(){
        //...
    }
    drawRectangle(){
        //...
    }    
}

class Square implements IShape {
    drawCircle(){
        //...
    }
    drawSquare(){
        //...
    }
    drawRectangle(){
        //...
    }    
}

class Rectangle implements IShape {
    drawCircle(){
        //...
    }
    drawSquare(){
        //...
    }
    drawRectangle(){
        //...
    }    
}
```

Nhìn đoạn code ở trên khá là cồng kềnh. `Class Rectangle` định nghĩa hai phương thức `drawCircle()` và `drawSquare()` nhưng không dùng tới. Cũng tương tự với `Class Square` định nghĩa hai phương thức `drawRectangle()` và `drawCircle()`.

Nếu chúng ta thêm một phương thức khác vào `interface IShape` như `drawTriangle()`

```
interface IShape {
    drawCircle();
    drawSquare();
    drawRectangle();
    drawTriangle();
}
```

Các `Class` thực hiện (implement) `interface IShape` đều phải định nghĩa thêm phương thức `drawTriangle()`.

Nguyên lý ISP có thể khắc phục được thiết kế không tốt này. Các `Class Rectangle`, `Circle`, `Square` sẽ không còn phụ thuộc vào những phương thức không cần hoặc không sử dụng tới. Bên cạnh đó nguyên lý ISP nói rằng mỗi `interface` chỉ nên thực hiện một chức năng (giống với nguyên lý thứ nhất SRP)


Ở đây, `interface IShape` của chúng ta thực hiện các phương thức cần được xử lý độc lập bởi các giao diện khác.

Để  `interface IShape` tuân theo nguyên lý ISP chúng ta cần tách riêng các phương thức với các `interface` khác 


```
interface IShape {
    draw();
}

interface ICircle {
    drawCircle();
}

interface ISquare {
    drawSquare();
}

interface IRectangle {
    drawRectangle();
}

interface ITriangle {
    drawTriangle();
}

class Circle implements ICircle {
    drawCircle() {
        //...
    }
}

class Square implements ISquare {
    drawSquare() {
        //...
    }
}

class Rectangle implements IRectangle {
    drawRectangle() {
        //...
    }    
}

class Triangle implements ITriangle {
    drawTriangle() {
        //...
    }
}

class CustomShape implements IShape {
   draw(){
      //...
   }
}
```

`interface ICircle` chỉ thực hiện nhiệm vụ `drawCirle()`, `IShape` xử lý `draw()` bất kì hình nào, `ISquare` chỉ xử lý việc `drawSquare()` tương tự với `IRectangle`

Hoặc có thể viết lại thành: 

```
class Circle implements IShape {
    draw(){
        //...
    }
}

class Triangle implements IShape {
    draw(){
        //...
    }
}

class Square implements IShape {
    draw(){
        //...
    }
}

class Rectangle implements IShape {
    draw(){
        //...
    }
}
```

Các `Class Circle`, `Rectangle`, `Square`... có thể kế thừa từ `interface IShape` và thực hiện phương thức draw().


## 5. Nguyên lý thứ năm: Dependency Inversion Principle
> A. Các module cấp cao không nên phụ thuộc vào các modules cấp thấp. Cả 2 nên phụ thuộc vào abstraction.
> B.Abstraction không nên phụ thuộc vào chi tiết, mà ngược lại

Xét ví dụ sau: 

```
class XMLHttpService extends XMLHttpRequestService {}
class Http {
    constructor(private xmlhttpService: XMLHttpService) { }
    get(url: string , options: any) {
        this.xmlhttpService.request(url,'GET');
    }
    post() {
        this.xmlhttpService.request(url,'POST');
    }
    //...
}
```

Ở đây, `Http` là thành phần cấp cao còn `HttpService` là thành phần cấp thấp. Thiết kế này vi phạm nguyên lý số 5 (DIP A) Các mô đun cấp cao không nên phụ thuộc vào mô đun cấp thấp. Nó nên phụ thuộc vào tính trừu tượng của nó.

Ở đây, `Class Http` buộc phải phụ thuộc vào `Class XMLHttpService`. `Class Http` nên ít quan tâm đến kiểu dịch vụ `Http` bạn đang sử dụng. Chúng ta sẽ tạo một `interface Connection`

```
interface Connection {
    request(url: string, opts:any);
}
```

`interface Connection` có một phương thức yêu cầu. Với điều này, chúng ta truyền vào một đối số kiểu `Connection` cho `Class Http`

```
class Http {
    constructor(private httpConnection: Connection) { }
    get(url: string , options: any) {
        this.httpConnection.request(url,'GET');
    }
    post() {
        this.httpConnection.request(url,'POST');
    }
    //...
}
```

Bây giờ kiểu kết nối `Http` không còn là vấn đề nữa, `Http` có thể kết nối mạng dễ dàng mà không cần quan tâm đến kiểu kết nối `Http` nữa.

Chúng ta có thể viết lại `Class XMLHttpService` như sau: 

```
class XMLHttpService implements Connection {
    const xhr = new XMLHttpRequest();
    //...
    request(url: string, opts:any) {
        xhr.open();
        xhr.send();
    }
}
```

Ta có thể tạo ra nhiều kiểu kết nối `Http` và truyền nó đến `Class Http` mà không có lỗi xảy ra

```
class NodeHttpService implements Connection {
    request(url: string, opts:any) {
        //...
    }
}

class MockHttpService implements Connection {
    request(url: string, opts:any) {
        //...
    }    
}
```

Bây giờ ta có thể thấy rằng cả mô đun cấp cao và mô đun cấp thấp đều phụ thuộc vào `abstraction`. `Class Http` (mô đun cấp cao) phụ thuộc vào `interface Connection` (abstraction) và kiểu kết nối `HttpService` (mô đun cấp thấp) phụ thuộc vào `interface Connection` (abstraction)

Bên cạnh đó, nguyên lý DIP sẽ giúp ta không vi phạm nguyên lý số 3 (LSP) Các kiểu kết nối `Node-XML-MockHttpService` có thể thay thế cho kiểu kết nối cha của chúng là `Connection`

## 6. Tổng kết

Như vậy chúng ta đã hiểu được sơ qua về năm nguyên lý mà mọi lập trình viên phải tuân thủ. Có thể ban đầu nhiều người sẽ gặp khó khăn trong việc tuân thủ năm nguyên tắc trên, nhưng nếu thực hành thường xuyên bạn sẽ hiểu rõ về năm nguyên tắc này và sẽ có tác dụng rất lớn đến việc bảo trì các chương trình của chúng ta.

Cám ơn mọi người đã đọc bài viết.

### Nguồn tham khảo: https://blog.bitsrc.io/solid-principles-every-developer-should-know-b3bfa96bb688
Xin chào tất cả các bạn, bài viết này mình xin trình bày một chút kiến thức kiến thức cơ bản về **TypeScript**, rất mong mọi người theo dõi.

## 1) Typescript là gì?
- **TypeScript** là một dự án mã nguồn mở được phát triển bởi **Microsoft**.  Nó có thể được coi là một phiên bản nâng cao của Javascript bởi việc bổ sung tùy chọn **kiểu tĩnh** và **lớp hướng đối tượng** mà điều này không có ở Javascript.
- **TypeScript** có thể sử dụng để phát triển các ứng dụng chạy ở client-side (Angular) và server-side (NodeJS).
- **TypeScript** sử dụng tất cả các tính năng của của ECMAScript 2015 (ES6) như classes, modules.
- Trưởng nhóm dự án này là Anders Hejlsberg, người đã đóng góp cũng như tạo ra các ngôn ngữ khác C#, Turbo Pascal và Delphi.
- **TypeScript** không phải ra đời đầu tiên mà trước đây cũng có một số thư viện như CoffeScript và Dart được phát triển bởi Google, tuy nhiên điểm yếu là hai thư viện này sư dụng cú pháp mới hoàn toàn, điều này khác hoàn toàn với **TypeScript**, vì vậy tuy ra đời sau nhưng **TypeScript** vẫn đang nhận được sự đón nhận từ các lập trình viên.

![](https://images.viblo.asia/5f57c189-6791-4e04-91c8-ee7e8914c0d2.png)

## 2) Tại sao nên sử dụng Typescript

- **TypeScript** giúp chúng ta phát triển các dự án lớn một cách dễ dàng.
- Hiện nay có nhiều Javascript Framework khuyến khích sử dụng **Typescript**. Ví dụ: AngularJS, Ionic ...
- Hỗ trợ các tính năng của Javascript phiên bản mới nhất.
- **TypeScript** là một mã nguồn mở nên bạn hoàn toàn có thể sử dụng mà không mất phí, bên cạnh đó có một công cụ code rất mạnh mẽ cũng được phát triển bởi Microsoft giúp chúng ta code **Typescript** một cách dễ dàng hơn nữa.
- Bản chất của **Typescript** vẫn là **Javascript** - **TypeScript** được biên dịch tạo ra các đoạn mã **javascript** nên bạn có thể chạy bất kì ở đâu miễn ở đó có hỗ trợ biên dịch **Javascript**. Ngoài ra bạn có thể sử dụng trộn lẫn cú pháp của Javascript vào bên trong **TypeScript**, điều này giúp các lập trình viên tiếp cận **TypeScript** dễ dàng hơn.

## 3) Các kiến thức cơ bản về Typescript

## 3.1) Cài đặt và chạy chương trình đầu tiên

- Cài đặt nodejs [tại đây](https://nodejs.org/en/)
- Cài đặt **Typescript**: 
> npm install –g typescript
> 
- **Typescript** có đuôi mở rộng là **.ts**
- Để biên dịch một file **Typescript** sang **javascript** ta chạy lệnh
> tsc tên_file --watch
> 
Ví dụ
- File html: 1.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Hello word</title>
    <script src="1.js"></script>
</head>
<body>
    
</body>
</html>
```
- File **typescript:** 1.ts
```js
console.log('Hello word');
var a: number;

a = 1;
console.log(a);
```

Khi chạy lệnh: 
> tsc 1.ts --watch
> 
thì một file **1.js** sẽ được tự động sinh ra để chứa code sau khi biên dịch file **1.ts**

```js
console.log('Hello word');
var a;
a = 1;
console.log(a);
```

### 3.2) Kiểu dữ liệu và khai báo biến



|  | **Javascript** | **Typescript** |
| -------- | -------- | -------- |
| Kiểu dữ liệu cơ bản     |   number, string, Boolean, array …   | …, enum, tuple, any, void …     |
|Cú pháp khai báo| var test = 123; | var test : string; |

- Như mình đã nói ở trên thì bản chất của **Typescript** vẫn là Javascript nên các kiểu dữ liệu cơ bản của java script thì **Typescript** đều có ngoài ra **Typescript** còn có một số kiểu đữ liệu khác như là enum, tuple, any, void ...
- Còn về mặt cú pháp khai báo biến trong **Typescript** hơi khác một chút đó là khi khai báo chúng ta cần khai báo thêm cho nó xem là thuộc kiểu dữ liệu nào.

Ví dụ:
```js
// KDL string
var string1 : string;
string1 = '1001';

// console.log(string1);

// KDL number

var number1 : number = 10;
console.log(number1);

// KDL mang
//KDL mang string

var arrString : string[];

arrString = ['teo', 'ty', 'tun'];

console.log(arrString[0]);

// KDL mang number

var arrNumber : number[];

arrNumber = [1, 2, 3];

//KDL boolean

var boolean1 : boolean = true;
console.log(boolean1);

// KDL enum

enum Color {Red, Green, Blue}
var c: Color = Color.Green;

// KDl tuple - kieu du lieu hon tap

var x: [string, number];

x = ['ahihi', 10];
for (let i = 0; i < x.length; i++) {
    console.log(x[i]);    
}
console.log(x[0]);

// KDL any

var xyz : any;
xyz = 'ahihi';
console.log(xyz);
```

Ở trên là một số kiểu dữ liệu cơ bản trong **Typescript** thì có một số kiểu dữ liệu khác so với **Javascript**
 - Enum là từ khoá dùng để khai báo một kiểu liệt kê (Enumeration). Kiểu liệt kê là một tập hợp các hằng số do người dùng tự định nghĩa.
 - Tuple là một mảng hỗn tạp nhưng đã được khai báo số phần tử.

### 3.3) Function trong TypeScript

- Trong **typescript** các hàm đều trả về một kết quả, kết quả đó sẽ thuộc về một kiểu dữ liệu nào đó (vd: number, string, void, …).
- Ta phải chỉ định luôn kiểu dữ liệu trả về cho hàm ngay từ đầu.

Ví dụ:
```js
// number

function sum (x: number, y: number) : number {
    return x + y;
}

console.log(sum(111, 222));

// string

function showString() : string {
    return 'hello';
}

// array
function showArrNumber() : number[] {
    return [1, 2, 3];
}
```

Ngoài ra còn có một số cú pháp khai báo function như:

```js
var z = function(x: number, y: string) : string {
    return `Chao ${y}, nam nay ban ${x} tuoi phai khong?`;
}

console.log(z(18, 'ahihi'));

var g: (x: number, y: string) => string = function(x, y) { // Khai bao truoc sau do moi dinh nghia
    return `Chao ${y}, nam nay ban ${x} tuoi phai khong?`;
}

console.log(g(18, 'ahihi'));

var h = (x: number) : number => {
    return x + 9;
}

console.log(h(10));
```

### 3.4) Hướng đối tượng trong Typescript

**Trong Typescript hỗ trợ chúng ta các tính chất về hướng đối tượng như:**

- *Class*

```js
class NhanVatGame {
    tenNhanVat: string;
    solugan: string;
    mau: number;

    constructor (tenNhanVat: string, solugan: string, mau: number) {
        this.tenNhanVat = tenNhanVat;
        this.solugan = solugan;
        this.mau = mau;
    }

    show() {
        console.log(this.mau);
    }
}

var nhanVat1 = new NhanVatGame('irelia', 'Y chi cua luoi kiem', 697.2);
nhanVat1.show();
```

- *Access Modifier*

Phạm vi truy cập trong class: Private, protected, public. Mặc định khi không khai báo thì là public

- *Tính kế thừa*
```js
class Tuong {
    ten : string;
    mota : string;
    kinang : string[];

    constructor(ten : string, mota : string, kinang : string[]) {
        this.ten = ten;
        this.mota = mota;
        this.kinang = kinang;
    }

    ShowInfo () {
        let kn = '';
        for (var i = 0; i < this.kinang.length; i++) {
            kn += this.kinang[i] + " | ";
        }
        return `
            Tên Tướng : ${this.ten}
            Mô Tả : ${this.mota}
            Ki Năng : ${kn}
        `;
    }
}

let ashe = new Tuong('Ashe', 'Cung Băng', ['Chú tâm tiễn', 'Tán Xạ tiễn', 'Ưng tiễn', 'Đại băng tiễn']);

console.log(ashe.ShowInfo());

// Class SatThu ke thua tu class tuong
class SatThu extends Tuong {
    donsatthu : string;

    constructor(ten : string, mota : string, kinang : string[], donsatthu : string) {
        super(ten, mota,  kinang);
        this.donsatthu = donsatthu;
    }

    ShowInfo () {
        let kn = '';
        for (var i = 0; i < this.kinang.length; i++) {
            kn += this.kinang[i] + " | ";
        }
        return `
            Tên Tướng : ${this.ten}
            Mô Tả : ${this.mota}
            Kĩ Năng : ${kn}
            Đòn Sát Thủ : ${this.donsatthu}
        `;
    }
}

let talon = new SatThu('Talon', 'Cung Băng', ['Chú tâm tiễn', 'Tán Xạ tiễn', 'Ưng tiễn', 'Đại băng tiễn'], 'Sát Thủ Bóng Đêm');
console.log(talon.ShowInfo());
```

- *Tính đóng gói*

- *Tính đa hình*

- *Tính trừu tượng*

- *Interface*

Interface trong TypeScript thì có thể khai báo được cả property
```js
interface nguoi {
	tuoi : number;
	ten? : string; // ten nay co the truyen vao hoac khong
}
function xemtt(motnguoi : nguoi) : void {
	console.log(`Xin chao ${motnguoi.ten} ban ${motnguoi.tuoi} phai khong`);
}

xemtt({tuoi : 18, ten : 'ahihi'});
```

- *Abstract*
```js
interface TuongInterface {
    ten : string;
    mau : number;
    satthuong : number;
    mota : string;

    XemTuong() : void;
    donkinang() : any;
    bienve() : void;
}

//class tuong ke thua lai Interface TuongInterface
class Tuong implements TuongInterface {
    ten : string;
    mau : number;
    satthuong : number;
    mota : string;

    XemTuong () : void {
        console.log('xem');
    }

    donkinang () : any {
        return 'don ky nang';
    }

    bienve () : void {
        console.log('bien ve');
    }
}
```

- *Namespace*

Đặt tên class mà không sợ bị trùng từ khóa. Quản lý theo một nhóm gọi là module có hệ thống.
```js
module Adroid {
	export class String {
		
	}
	export class Number {
		
		test () : void {
			console.log('ahihi');
		}
	}
}

var coca = new Adroid.String();
var pessi = new Adroid.Number();
pessi.test();
```

- *Generic*
Hiểu một cách đơn giản là khai báo nhưng mà không cần chỉ ra kiểu dữ liệu mà khi nào sử dụng thì mới định nghĩa kiểu dữ liệu.

```js
function xem1(x : number) : number {
    return x;
}

function xem2(x : string) : string {
    return x;
}

function xem3(x : boolean) : boolean {
    return x;
}

console.log(xem1(9));

//Generic

function xem4<T>(x : T) : T {
    return x;
}

console.log(xem4<string>("ahihi"));
```

Qua ví dụ ta thấy khi hàm xem1(), xem2(), xem3() giống nhau về các xử lý chỉ khác kiểu dữ liệu trả về và kiểu dữ liệu params thay vì phải định nghĩa 3 hàm ta chỉ cần viết một hàm xem4() có thể dùng chung được cho cả trường hợp trên. Một ví dụ khác để bạn có thể hiểu rõ hơn về Generic

```js
class MayTinh {
    
    static XemThongTin<T> (x : T[]) : void {
        for (var i = 0; i < x.length; i++) {
            console.log(x[i]);
        }
    }
}

MayTinh.XemThongTin<string>(['HP', 'Dell', 'Asus']);
MayTinh.XemThongTin<any>(['HP', 9000000, 'Asus']);
```
Ở ví dụ trên hàm XemThongTin() có tham số truyền vào là một mảng có kiểu dữ liệu là generic. Khi ta gọi hàm XemThongTin() ta phải  chỉ ra kiểu dữ liệu T là gì trong trường hợp này là string thì khi ta truyền tham số vào cũng phải mà một mảng  string nếu chương trình sẽ bị lỗi. Như đôi khi bạn muốn kiểu dữ liệu T kia không phải là string mà thay vào đó là một kiểu dữ liệu nào đó như any chẳng hạn chả nhẽ lúc này bạn lại phải viết thêm một hàm mới trong khi code xử lý như nhau, nhìn vào ví dụ ta thaays nhờ có generic thì mọi chuyện dễ dàng hơn bạn chỉ cần định nghĩa nó là kiểu any và tham số truyền vào là một mảng kiểu any là được. 

## Kết luận
Anders Hejlsberg và các cộng sự của mình khi tạo ra Typescript thì hầu hết các đặc trưng trong C# đều được dùng để tạo nên Typescript vì thế nhưng ai mà code C#, Java (các ngôn ngữ hướng đối tượng) thì việc làm quen với Typescript thì tương đối dễ dàng. Angular - một trong những Javascript Framework phỏ biến cũng sử dụng hoàn toàn cú pháp là Typescript.

Trên đây là một chút kiến thức mà mình tìm hiểu được về Typescript, rất mong được sự góp ý của mọi người. Cảm ơn mọi người đã theo dõi bài viết của mình.

### Nguồn tham khảo

https://www.typescriptlang.org/docs/home.html
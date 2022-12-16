**Tìm hiều về Class và Interface trong typescript**

-----

Xin chào mọi người! Như đã biết hoặc chưa biết thì khái niệm về interface và class không tồn tại trong javascript kể từ trước ES6, tuy nhiên ở phiên bản ES6 thì khái niệm class đã được đưa vào js.
Cơ mà javascript thì có liên quan gì đến typescript nhỉ?

Thế thì đầu tiên mình xin được phép giới thiệu sơ sơ về typescript là gì.

Typescript, ngôn ngữ do hãng Microsoft phát triển (chính xác là do team của Anders Hejlsberg - tác giả ngôn ngữ C# - xây dựng nên). Vì vậy, thật dễ hiểu khi Typescript - vốn được thiết kế như một superset của javascript - nay cũng được "cài cắm" thêm nhiều tính năng khác. Trong đó bao gồm “class” và “interface” cái mà chúng ta sẽ giới thiệu trong bài viết này.

OK. LET’S GO!!!

**I.CLASS**

Bắt đầu bài viết ta sẽ tìm hiểu về class.
Javasript thông thường sử dụng function và nguyên lý kế thừa dựa trên prototype để viết nên các component có khả năng sử dụng lại. Còn đối với các dev đã quen với các ngôn ngữ OOP như C#, java ... việc kế thừa được xây dựng dựa theo kế thừa của các class.
Typescript (và sau này là ES6) đưa vào khái niệm Class cho javascript:
```
class Avenger {
	name: string;
	weapon: string;
	constructor(_name: string, _weapon: string) {
        this.name = _name;
        this.weapon = _weapon;
    }
    attack() {
        console.log(`I’m ${this.name} who can attack with ${this.weapon}`);
    }
}

const IronMan = new Avenger('Iron Man', 'lazer');
```
Đối với các dev java, C# thì cú pháp trên rất quen thuộc. Ta khai báo một class mới tên Avenger. Class này bao gồm 3 member: 2 property name, weapon, hàm khởi tạo(constructor) và một method attack. Và để sử dụng nó ta dùng keyword "new".
Khi được biên dịch sang js thì sẽ có kết quả như sau:
```
var Avenger = (function() {
    function Avenger(_name, _weapon) {
        this.name = _name;
        this.weapon = _weapon; 
    }
    Avenger.prototype.attack = function() {
        console.log(`I’m ${this.name} who can attack with ${this.weapon}`);
    }
    return Avenger;
})();
```

Từ đoạn code trên, ta có thể thấy rằng Bản chất của class trong Typescript cũng chính là việc sử dụng self-invoke function cùng với prototype của javascript.

*+ Tính kế thừa (inheritance) class.*

Đã có class thì phải có inheritance class. Nguyên lý kế thừa trong Typescript cũng giống các ngôn ngữ khác:

```
class InfinityWar extends Avenger {
    attack() {
        super.attack();
        console.log('I love 3000');
    }
}
```

+ Ta khai báo kế thừa lớp bằng từ khóa extends.
+ Trong class con, ta có thể gọi tới function của class cha bằng thông qua super.

*+ Access modifier: Public, private, protected*

Với ví dụ ở trên, ta hoàn toàn có thể gọi tới property của class Avenger như sau:

```
let  Hulk = new Avenger('Hulk', 'Punch');
let name = Hulk.name;
let name = Hulk.weapon;
```

Khác với C# nhưng giống với Java OOP: Đối với class trong Typescript, nếu không có khai báo gì thêm, 1 property được mặc định coi như là public

Bên cạnh đó, ta cũng có các modifier private, protected cho property, đồng thời cũng có thể dùng modifier public để tăng readable cho code.

```
class Avenger {
    public name: string;   // public ở đây là optional
    public weapon: string; // tương tự
    ...
}
```

Với private, property không thể bị gọi từ ngoài vào.

```
class Avenger {
    public name: string;
    private weapon: string;
    ...
}

...
let Hulk = new Avenger('Hulk');
let name = Hulk.weapon;                   //  Error: 'weapon' is private;
```

Với protected, nó giống với private với 1 ngoại lệ là các property này có thể được gọi tới từ bên trong lớp con kế thừa từ lớp cha.

```
class Avenger {
    public name: string;
    private weapon: string;
    ...
}

class InfinityWar extends Avenger {
    attack() {
        this.weapon;                     //  => đoạn này sẽ bắn error nếu weapon được khai báo private ở trên.
    }
}
```

**II. INTERFACE**

Cùng với class, Typescript đưa vào thêm khái niệm Interface. Tương tự với các ngôn ngữ khác, interface trong typescript cũng được sử dụng như 1 công cụ để tạo sự ràng buộc, quy ước giữa các thành phần tương tác trong hệ thống.

Thế interface dùng để làm cái gì

Code javascript, hẳn ta rất quen thuộc với bài toán : bên phía client, lấy dữ liệu dạng JSON về từ server, sau đó làm các thứ với dữ liệu này. Giả sử , ta cần viết 1 hàm nhận vào là 1 Post và đầu ra là in ra cái gì đó được sinh ra từ post này:

```
function tomTat( post: {content: string} ) {
    return post.content.slice(0,  10);    // trả về tóm tắt nội dung bài post với max là 30 kí tự đầu tiên.
}

let post = { content: 'this is a very long long long long post.' }
tomTat(post);
```

Để ý rằng: để viết được logic của hàm tomTat, trong params của tomTat ta phải khai báo kiểu object sẽ được truyền vào: post: {content: string} Lúc này, interface có thể được sử dụng để viết lại hàm trên ngắn gon hơn.

```
interface Post {
    content: string;
}

function tomTat( post: Post ) {
    return post.content.slice(0,  10);    // trả về tóm tắt nội dung bài post với max là 30 kí tự đầu tiên.
}
```

Bằng cách sử dụng interface Post, ta tạo 1 quy ước cho đầu vào của function tomTat. interface Post ở đây cũng có thể tái sử dụng ở những chỗ khác trong chương trình.

Từ ví dụ trên , ta có thể thấy: trong Typescript, Interface có thể chứa cả property.

Mặt khác , đối với Typescript

Interface lúc này đóng vai trò tạo nên ràng buộc cho các class implement lại nó, không chỉ là về các phương thức , mà còn cả về hình dạng (shape) của đối tượng được implement.

*+ Optional property*

Property trong interface có thể không bắt buộc.

```
interface accountConfig{
        name?: string;
        password?: string;
}

function createAccount(config: accountConfig) {
    let newAccount = { name: 'Tran Ngoc Tan', password: 'qwe123' }
    if (config.name) { newCar = config.name } 
    if (config.password) { newCar = config.password } 
    return newAccount;
}

...
let newAccount = createAccount({ name: 'Ribi Sachi' });
```

*+ Dùng interface hay class ! Khi nào ?*

Cho một ví dụ:

```
interface Human {
    name: string;
}

class Teacher implements Human {
    name: string;
}
```

```
class Human {
    name: string;
}

class Teacher extends Human {
  // ...
}
```

Như những gì đã tìm hiểu. Ta thấy mọi thứ của interface có thể thực hiện được bằng class, vậy interface để làm gì ?

Interface sẽ toát lên vẻ quý's tộc của mình khi compile code từ Typescript thành javascript để chạy:

Hãy cùng xem ví dụ sau để hiểu rõ:

Ta có khai báo 1 interface Response để định dạng kiểu dữ liệu trả về từ API:
```
interface Resposne {
    status: number;            // 200, 401, 404 ...
    message: string;
}

fetch('https://my-api.com').then((response: Response) => {
    if (response.status == 200) {
        console.log(response.message);
    }
});
```

Compile đoạn code trên về javascript, mã đích của ta sẽ như sau

```
fetch('https://my-api.com').then(function (response) {
    if (response.status == 200) {
        console.log(response.message);
    }
});
```

Tuy nhiên đối với class

```
var Response = (function() {
    function Response() {        
    }
    return Response;
})();
```

Compile đoạn code trên về javascript, mã đích của ta sẽ như sau

```
fetch('https://my-api.com').then(function (response) {
    if (response.status == 200) {
        console.log(response.message);
    }
});
```

Nhìn vào ví dụ trên: 
Ta không có thấy bóng dáng của interface Response đâu cả ! Interface trong Typescript sẽ chỉ có vai trò nhắc hint, báo lỗi khi viết code bằng editor cũng như trong quá trình compile. Sau đó, nó sẽ được loại bỏ khỏi mã đích javascript.

Ngược lại, không giống như interface, một class của Typescript sẽ sinh ra 1 Javascript construct thực sự .

Sau khi compiler dịch code từ Typescript sang javascript, class của ta sẽ biến thành dạng function trong javascript, được lưu trong mã nguồn cuối cùng của chương trình ! Đoạn code khai báo biến Response trên hoàn toàn thừa thãi và làm tăng dung lượng mã đích.

Nếu ta có 1 application đủ lớn, và sử dụng bừa bãi class như một model type annotation, thì sẽ dẫn tới kết quả là dung lượng chương trình được biên dịch phình to ra đáng kể !

=> Chỉ sử dụng Class khi ta có logic nghiệp vụ thực sự cần được implement để thực thi. Ngược lại, nếu chỉ dùng nó để tạo 1 ràng buộc kiểu cho params hay variable, ta nên dùng Interface.

**Kết luận**

Tổng kết kiến thức:
+ Class và interface.
+ Ưu điểm của interface và khi nào nên sử dụng nó.

**Tài liệu tham khảo:**
+ https://www.typescriptlang.org/docs/handbook/interfaces.html
+ https://www.typescriptlang.org/docs/handbook/classes.html
+ https://jameshenry.blog/typescript-classes-vs-interfaces/
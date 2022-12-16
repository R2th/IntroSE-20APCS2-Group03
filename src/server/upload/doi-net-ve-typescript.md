# Giới thiệu
## TypeScript là gì
  TypeScript là một superset của ES6, có nghĩa là tất cả các tính năng của ES6 là một phần của TypeScript, nhưng không phải tất cả các tính năng của TypeScript đều là một phần của ES6. Và hiện tại thì TypeScript đã được cập nhật phiên bản ES7 . TypeScript được biên dịch chuyển thành ES5 để chạy trong hầu hết các trình duyệt.
  TypeScript bổ sung tùy chọn kiểu tĩnh và lớp hướng đối tượng mà điều này không có ở Javascript. 
## Tại sao lại nên sử dụng typescript
 
**Dễ phát triển dự án lớn**: Với việc sử dụng các kỹ thuật mới nhất và lập trình hướng đối tượng nên TypeScript giúp chúng ta phát triển các dự án lớn một cách dễ dàng.

**Nhiều Framework lựa chọn**: Hiện nay các Javascript Framework đã dần khuyến khích nên sử dụng TypeScript để phát triển, ví dụ như AngularJS và Reactjs.

**Javascript phiên bản mới nhất**: TypeScript luôn đảm bảo việc sử dụng đầy đủ các kỹ thuật mới nhất của Javascript, ví dụ như version hiện tại là ECMAScript 2015 (ES6).

 **Mã nguồn mở**: TypeScript là một mã nguồn mở nên bạn hoàn toàn có thể sử dụng mà không mất phí, bên cạnh đó còn được cộng đồng hỗ trợ.

*TypeScript là Javscript*: Bản chất của TypeScript là biên dịch tạo ra các đoạn mã javascript nên ban có thê chạy bất kì ở đâu miễn ở đó có hỗ trợ biên dịch Javascript. Ngoài ra bạn ***có thể sử dụng trộn lẫn cú pháp của Javascript vào bên trong TypeScript***, điều này giúp các lập trình viên tiếp cận TypeScript dễ dàng hơn.
# Đôi nét về typescript
## Type
TypeScript có hỗ trợ các kiểu dữ liệu căn bản như :
  **Kiểu Boolean** : Có hai giá trị là true hoặc false
  ```
    let isDone: boolean = false;
  ```
**Kiểu Number**:  Dữ liệu kiểu số . TypeScript cũng hỗ trợ kiểu nhị phân và bát phân .
  ```
    var decimal: number = 12;
  ```
  **Kiểu String** : Là một chuỗi (một đoạn text) 
  ```
  let username: string = 'thelafheets';
  ```
  **Kiểu Array** : Mảng các giá trị
  ```
  let students: string[] = ['Cuong', 'Kinh', 'Chinh'];
  ```
  **Kiểu Enum** : Là kiểu dữ liệu đặc biệt dùng để tạo một nhóm tên tương ứng với các giá trị là những con số mà ta thiết lập cho nó
  ```
    enum Fruits {Orange, Banana, Mango, Apple};  
    let a: Fruits = Fruits.Orange; 
    alert(a); # Kết qủa a = 0 
  ```
  **Kiểu Any** : Đây là kiểu dữ liệu thoải mái nhất bởi nó cho phép bạn gán giá trị với kiểu dữ liệu bất kì
  ```
  let notSure: any = 4; // kiểu number
  notSure = "Thay thế bằng kiểu string";
  notSure = false; // bây giờ lại là kiểu boolean
  ```
  **Kiểu Void**:  Là một kiểu dữ liệu với giá trị là null, trong TypeScript thì có thêm giá trị undefined
  ```
  function showMessage(): void {
    alert("Success!");
  }
  ```
## Function
Trong typescrpit hỗ trợ khai báo kiểu trả ra của function cũng như kiểu dữ liệu của đầu vào ..
```
function addnumber (x: number, y: number): number {
    return x+y;
}
```
Ngoài ra typescript cho phép chúng ta khai báo giá trị mặc định đầu vào hoặc bỏ qua một vài giá trị đầu vào ! 
```
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

# Có thể bỏ nhập giá trị lastName
function buildName(firstName: string, lastName?: string) {
    if (lastName){
    ...
    }
}

```

## Kế thừa trong typescript
Typescript bổ sung tùy chọn lớp đối tượng 
```
class People {
    name: string;
    height: number;
    constructor(name: string, height: number) {
        this.name = name;
    }

    setheight(meters: number): number {
        return this.height = meters ;
    }
}

class Man extends People {
    constructor(name: string, height: number) {
        super(name, height);
    }

    setheight(meters = 1): number {
        return super.setheight(meters);
    }
}

var toi = new Man("Duy Tung", 2);
toi.setheight(3);   // = 3.
```
## Asynchronous
 Asynchronous là xử lý bất động bộ, nghĩa là chương trình có thể nhảy đi bỏ qua một bước nào đó .  Với Javascript cũ ta phải sử dụng các hàm phản hồi để xử lý các thao tác bất đồng bộ. Tuy nhiên việc này dẫn tới tình trạng callback hell khi ta có nhiều thao tác bất đồng bộ phải chờ nhau thực hiện . và nó làm cho mã nguồn của chúng ta rất rối và khó bảo trì . Ở phiên bản ES6 Promise đã được đưa vào mặc định nhằm giải quyết tình trạng callback hell .  Với phiên bản ES7 hàm async được đưa vào để giải quyết tình trạng trên .
### async - await
Hàm async cho phép chúng ta viết các thao tác bất đồng bộ với phong cách của các mã đồng bộ . Điều này giúp mã nguồn của chúng ta dễ đọc và dễ bảo trì hơn !  Ví dụ :
Tôi xử dụng thư viện axios và gửi yêu cầu HTTP GET đến Https://tutorialzine.com/misc/files/example.json . Và chúng ta phải chờ đợi phản hồi từ máy chủ .  Có 2 cách viết để thực hiện chức năng này .
```
# Cách 1
    function getJSON() {
        return new Promise( function(resolve) {
            axios.get('https://tutorialzine.com/misc/files/example.json')
                .then( function(json) {
                    resolve(json);
                });
        });
    }
    
  # Cách 2
      async function getJSONAsync() {
        let json = await axios.get('https://tutorialzine.com/misc/files/example.json');
        return json;
    }
```
Như các bạn thấy việc sử dụng  async - await giúp mã nguồn ngắn gọn và dễ đọc hơn .
# Kết luận
  Bài viết này chưa đủ để khái quát toàn bộ về Typescript tuy nhiên nó cung cấp phần nào một số điều về typescript giúp bạn có cái nhìn tốt hơn ! Thank for reading
  Tài liệu tham khảo : 
  https://freetuts.net/typescript-basic-types-746.html
  https://angular-2-training-book.rangle.io/handout/features/typescript.html
  https://viblo.asia/p/giai-thich-ve-asyncawait-javascript-trong-10-phut-1VgZvBn7ZAw
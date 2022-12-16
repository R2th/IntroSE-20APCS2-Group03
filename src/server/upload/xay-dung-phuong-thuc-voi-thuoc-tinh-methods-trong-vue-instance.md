# 1. Tại sao cần có phương thức trong thuộc tính method?
Trong lập trình, chúng ta thường gặp các thuật ngữ hàm (function - có trả về dữ liệu), thủ tục (procedure - chỉ thực thi một số công việc), phương thức (method là hàm hoặc thủ tục gắn với class). Các khái niệm này rất cần thiết do mấy lý do:

- Thứ nhất nó giúp mô đun hóa trong ứng dụng, xây dựng các khối code không phải lặp đi lặp lại, giảm kích thước ứng dụng, dễ quản lý mã nguồn hơn.
- Thứ hai, nó giúp định nghĩa cấu trúc logic của ứng dụng.

Như vậy, với việc sử dụng các method trong Vue.js giúp tạo ra các function Javascript (trong Javascript hàm và thủ tục là một và là function). Trong Vue instance có thể khai báo nhiều các phương thức trong thuộc tính methods. Với cú pháp {{ }} cho phép một biểu thức Javascript bên trong nhưng chỉ được duy nhất một câu lệnh đơn và nếu có quá nhiều logic nằm dải rác khắp ứng dụng khiến cho việc duy trì mã nguồn là rất khó khăn. Phương thức trong thuộc tính methods của thực thể Vue có thể đưa vào các logic hoặc những công việc như lấy dữ liệu từ một nguồn ở xa... Ví dụ về việc sử dụng biểu thức Javascript
```php
<!DOCTYPE html>
<html>
<head>
    <title>Ví dụ về phương thức trong Vue.js - allaravel.com</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>
    <div class="container" id="app">
        <div class="row">
            <div class="col-md-12">
                <h1>Họ tên đầy đủ: {{ ((firstName.toUpperCase().indexOf('VĂN') != -1) ? 'ÔNG' : ((firstName.toUpperCase().indexOf('THỊ') != -1) ? 'BÀ' : 'ÔNG / BÀ')) + ' ' + firstName.toUpperCase() + ' ' + lastName.toUpperCase() }}</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
                <label>First name</label>
            </div>
            <div class="col-md-6">
                <input type="text" class="form-control" v-model="firstName">
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
                <label>Last name</label>
            </div>
            <div class="col-md-6">
                <input type="text" class="form-control" v-model="lastName">
            </div>
        </div>
    </div>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
    <script type="text/javascript">
        new Vue({
            el: '#app',
            data: {
                firstName: '',
                lastName: ''
            }
        });
    </script>
</body>
</html>
```

[jsfiddle url="https://jsfiddle.net/6kqsn5Lm/" height="300px" include="result,html,js" font-color="39464E" menu-background-color="FFFFFF" code-background-color="f3f5f6" accent-color="1C90F3"]

Logic trong ví dụ như sau, khi nhập Họ (firstName) nếu có Văn hoặc Thị thì sẽ thay Ông/Bà thành Ông hoặc Bà. Trong ứng dụng nếu hiển thị họ tên đầy đủ ở một số nơi, như vậy mỗi khi thay đổi logic chúng ta cần thay đổi ở nhiều chỗ, thay vì như thế chúng ta đưa logic trên vào phương thức trong thuộc tính methods của Vue instance như ví dụ tiếp theo.
```php
<!DOCTYPE html>
<html>
<head>
    <title>Ví dụ về phương thức trong Vue.js - allaravel.com</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>
    <div class="container" id="app">
        <div class="row">
            <div class="col-md-12">
                <h1>Họ tên đầy đủ: {{ fullName() }}</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
                <label>First name</label>
            </div>
            <div class="col-md-6">
                <input type="text" class="form-control" v-model="firstName">
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
                <label>Last name</label>
            </div>
            <div class="col-md-6">
                <input type="text" class="form-control" v-model="lastName">
            </div>
        </div>
    </div>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
    <script type="text/javascript">
        new Vue({
            el: '#app',
            data: {
                firstName: '',
                lastName: ''
            },
            methods: {
                fullName: function () {
                    var title = '';
                    if (this.firstName.toUpperCase().indexOf('VĂN') != -1) {
                        title = 'ÔNG';
                    } else if (this.firstName.toUpperCase().indexOf('THỊ') != -1) {
                        title = 'BÀ';
                    } else {
                        title = 'ÔNG/BÀ';
                    }
                    return title + ' ' + this.firstName.toUpperCase() + ' ' + this.lastName.toUpperCase();
                }
            }
        });
    </script>
</body>
</html>
```

Chuyển sang dùng method không khác gì so với ví dụ đầu, logic về xử lý họ tên đầy đủ được đưa vào fullName(), bất kỳ chỗ nào cần hiển thị họ tên đầy đủ chúng ta chỉ cần gọi đến fullName().

Để truy xuất đến một đối tượng trong thuộc tính data chúng ta sử dụng biến this và sử dụng dấu chấm để truy xuất vào các thành phần thuộc tính con. Ví dụ this.firstName, this.user.firstName...

Phương thức là các hàm, thủ tục do đó nó có thể có tham số đầu vào, ví dụ chúng ta có nhiều kiểu xử lý họ tên đầy đủ theo kiểu tiếng Anh và tiếng Việt khác nhau, ví dụ tiếp theo chúng ta sẽ thực hiện logic này trong phương thức fullName().
```php
<!DOCTYPE html>
<html>
<head>
    <title>Ví dụ về phương thức trong Vue.js - allaravel.com</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>
    <div class="container" id="app">
        <div class="row">
            <div class="col-md-12">
                <h1>Họ tên đầy đủ: {{ fullName(1) }}</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h1>Full name: {{ fullName(2) }}</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
                <label>Họ và đệm</label>
            </div>
            <div class="col-md-6">
                <input type="text" class="form-control" v-model="firstName">
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
                <label>Tên</label>
            </div>
            <div class="col-md-6">
                <input type="text" class="form-control" v-model="lastName">
            </div>
        </div>
    </div>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
    <script type="text/javascript">
        new Vue({
            el: '#app',
            data: {
                firstName: 'Nguyễn Văn',
                lastName: 'Tuấn'
            },
            methods: {
                fullName: function (type) {
                    var title = '';
                    var fullName = '';
                    if (type == 1 ) {
                        // Kiểu Việt Nam
                        if (this.firstName.toUpperCase().indexOf('VĂN') != -1) {
                            title = 'ÔNG';
                        } else if (this.firstName.toUpperCase().indexOf('THỊ') != -1) {
                            title = 'BÀ';
                        } else {
                            title = 'ÔNG/BÀ';
                        }
                        fullName = title + ' ' + this.firstName.toUpperCase() + ' ' + this.lastName.toUpperCase();
                    } else if (type == 2) {
                        // Kiểu Anh
                        title = 'MR/MRS';
                        fullName = title + ' ' + this.lastName.toUpperCase() + ' ' + this.firstName.toUpperCase();
                    }
                    return fullName;
                }
            }
        });
    </script>
</body>
</html>
```
[jsfiddle url="https://jsfiddle.net/jcg2fymz/" height="300px" include="result,html,js" font-color="39464E" menu-background-color="FFFFFF" code-background-color="f3f5f6" accent-color="1C90F3"]

# 2. Sử dụng arrow function trong khai báo phương thức
## 2.1 Arrow function là gì?
Function là khái niệm hết sức căn bản trong Javascript, đến phiên bản ECMAScript 5 xuất hiện khái niệm function expression - hàm dạng biểu thức. Đúng như tên gọi của nó, từ khóa function có thể được sử dụng để định nghĩa một hàm trong một biểu thức, bạn hãy xem ví dụ sau đây:
```php
var getSum = function(a, b) {
    return a + b;
}
console.log(getSum(3,4));
// Trả về 7
```

Đến phiên bản ES 6 xuất hiện một cách viết ngắn gọn hàm dạng biểu thức ở trên dưới dạng dấu mũi tên béo => hay thuật ngữ gọi là arrow function. Ví dụ ở trên được viết lại thành:
```php
let getSum = (a, b) => { return a + b };
console.log(getSum(3,4));
// Trả về: 7
```
## 2.2 Cú pháp arrow function
Cú pháp chung của arrow function như sau:

```php
let func = (arg1, arg2, ...argN) => { expression }
```
Arrow function có chung một cú pháp, dưới đây chúng ta sẽ xem xét từng trường hợp cụ thể sử dụng arrow function. Trường hợp 1: Chỉ có một câu lệnh trong hàm thì có thể bỏ qua các dấu ngoặc:
```php
let getSum = (a, b) => a + b;
console.log(getSum(3,4));
```
Trường hợp 2: Chỉ có một tham số đầu vào
```php
let getDouble = x => x * 2;
console.log(getDouble(3));
// Kết quả 6
```

Trường hợp 3: Không có tham số
```php
let alertInfo = () => alert('Không có tham số');
console.log(alertInfo());
```
Trường hợp 4: Trả về một đối tượng từ arrow function
```php
// ES5
var mix = function(n) {
    return {
        double: n * 2,
        square: n * n
    };
};
// ES6
let mix = n => ({ double: n*2, square: n * n });
```
Trên đây là các cú pháp cơ bản, chúng ta thường dùng arrow function trong việc thao tác với các mảng, ví dụ sau cho thấy code thao tác mảng thật sự ngắn gọn: Ví dụ: Lấy danh sách ngày sinh từ một mảng chứa thông tin người dùng

```php
const users = [
  { name:'Trần Văn A', birthday:'1982-01-01', active:false },
  { name:'Nguyễn Văn B', birthday:'1993-03-21', active:true },
  { name:'Lê Văn C', birthday:'1978-09-18', active:true }
];
// ES5
var birthdays = users.map(function(user) {
  return user.birthday;
});
// ES6
let birthdays = users.map(user => user.birthday);
```


Hoặc ví dụ về lọc người dùng đang hoạt động
```php
// ES5
var activeUsers = users.filter(function(user) {
  return user.active;
});
// ES6
let activeUsers = users.filter(user => user.active);
```
## 2.3 Hạn chế arrow function
Arrow function không thể sử dụng để làm contructor giống như hàm thông thường, không sử dụng chúng để tạo ra các đối tượng, nếu bạn sử dụng từ khóa new với một arrow function, nó sẽ phát sinh lỗi. Arrow function giống như các function được xây dựng sẵn, không thể có các thuộc tính hoặc các phương thức nội tại.

Kiểu hàm arrow function cần phải khai báo ở trên trước khi gọi đến chúng. Khi đang ở phạm vi bên trong arrow function không thể tham chiếu đến các đối tượng ở ngoài nếu không truyền nó qua tham số.

## 2.4 Sử dụng arrow function trong thuộc tính methods của Vue instance
Như đã cảnh báo các hạn chế ở trên, arrow function không thể tham chiếu đến các đối tượng ở ngoài nếu không truyền nó qua tham số do arrow function bị ràng buộc với ngữ cảnh gốc và từ khóa this không tham chiếu đến Vue instance. Chính vì thế các thuộc tính của data và các phương thức của Vue không thể tham chiếu đến trong khai báo bằng arrow function. Một giải pháp đưa ra là sử dụng function expression ES5.

```php
// undefined error
methods: {
    fullName: () => this.firsName + ' ' + this.lastName;
}
```
Với kiểu function expression ES5 như chúng ta vẫn thường viết:

```php
methods: {
    fullName: function() {
    return this.firstName + ' ' + this.lastName;
    }
}
```
Với các phương thức không cần truy xuất đến các thuộc tính của data hoặc các phương thức khác trong methods thì chúng ta hoàn toàn có thể sử dụng arrow function:
```php
methods: {
    fullName: () => 'Tôi là Vue.js'
}
```
Hoặc có thể truyền các thuộc tính của data dưới dạng tham số nhưng sẽ phải gõ code nhiều hơn:

```php
<h1>{{ fullName(firstName, lastName) }}</h1>
...
methods: {
    fullName: (a, b) => a+ ' ' + b
}

```
# 3. Một số câu hỏi thường gặp
**Câu hỏi 1:**  Truy cập đến một phương thức từ một phương thức khác trong Vue như thế nào? Gọi một phương thức trong một phương thức khác là rất hay sử dụng, trong Vue.js chúng ta sử dụng biến this để truy cập một phương thức trong một phương thức khác, bạn có thể tham khảo ví dụ sau đây:

```php
var vm = new Vue({
  ...
  methods: {
    methodA() {
      // Phương thức A
    },
    methodB() {
      // Phương thức B

      // Gọi phương thức A bên trong phương thức B
      this.methodA()
    }
  },
  ...
});
```


**Câu hỏi 2:** Tại sao tôi sử dụng biến this nhưng không thể gọi được phương thức khác, lỗi trong console là undefined? Nếu bạn khai báo phương thức với cú pháp kiểu arrow function của ES6 thì biến this không có tác dụng do ngữ cảnh trong hàm không giống với ngữ cảnh các hàm khai báo thông thường, khi đó sử dụng biến this.phương_thức() hoặc this.thuộc_tính đều trả về undefined. 
**Câu hỏi 3:** Có thể gọi phương thức từ bên ngoài Vue instance không? Hoàn toàn có thể được, bạn tham khảo ví dụ sau đây:

```php
var vm = new Vue({ methods: { myFunc : function(){} } } );
this.vm.myFunc();
```
**Câu hỏi 4:** Tại sao khi gọi một phương thức thì chương trình gọi tất cả các phương thức khác mặc dù chúng độc lập nhau? Trong các ứng dụng Javascript thông thường các phương thức sẽ độc lập nhau, gọi phương thức nào thì phương thức đó được thực hiện. Điều này không còn đúng 100% trong Vue.js do khi áp dụng mô hình MVVM, mọi thay đổi của một giá trị nó sẽ tự động cập nhật (hay gọi đến) tất cả các phương thức có liên quan. Chúng ta cùng xem xét ví dụ sau để minh chứng cho điều này:

```php
<!DOCTYPE html>
<html>
<head>
    <title>Phương thức trong Vue.js - allaravel.com</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>
    <div id="app">
        <p>A = {{ addA() }}</p>
        <p>B = {{ addB() }}</p>
        <button v-on:click="a++">Thêm 1 vào a</button>
        <button v-on:click="b++">Thêm 1 vào b</button>
    </div>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
    <script type="text/javascript">
        new Vue({
            el: '#app',
            data: {
                a: 0,
                b: 0
            },
            methods: {
                addA: function(){
                    console.log('Gọi phương thức addA');
                    return this.a;
                },
                addB: function(){
                    console.log('Gọi phương thức addB');
                    return this.b;
                }
            }
        });
    </script>
</body>
</html>
```


Trong ví dụ này, phương thức addA() và addB() rõ ràng là không liên quan gì đến nhau, nhưng khi bấm nút "Thêm 1 vào a" thì chúng ta lại thấy nó gọi đến cả phương thức addB().
![](https://images.viblo.asia/c78ac234-8224-4ab0-bbbd-98cda55461e5.gif)

Hai phương thức addA() và addB() độc lập với nhau, tuy nhiên trong chúng đều có sử dụng đến dữ liệu được khai báo trong thuộc tính data của Vue instance, như vậy bất kể một thuộc tính nào của data thay đổi, có thể là a hoặc b, các phương thức có sử dụng a hoặc b mà có liên quan đến render đều được gọi. Các câu hỏi thường gặp sẽ được cập nhật, nếu bạn có câu hỏi nào hãy comment cuối bài viết nhé.

# 4. Lời kết
Methods là một trong những thuộc tính cơ bản của Vue instance và là thuộc tính được sử dụng nhiều nhất. Bài viết khá lan man nhiều thứ nhưng nó có ích cho bạn vì các kiến thức này sẽ được dùng đến ở rất nhiều các phần tiếp theo. Arrow function tuy không phải là mục đích chính của bài viết này nhưng tôi tin chắc các cú pháp ES6 sẽ giúp bạn viết code nhanh hơn gọn đẹp hơn sau này. Hơn nữa việc diễn giải kỹ về arrow function sẽ giúp bạn hiểu tại sao trong một số tài liệu hướng dẫn Vue.js họ khuyến cáo không sử dụng arrow function trong khai báo các phương thức trong thuộc tính methods. Bài viết cũng khá dài, hy vọng dễ đọc với các bạn, nếu có góp ý gì hãy comment cuối bài viết nhé.
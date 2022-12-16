# I. NodeJS là gì?
Như các bạn cũng biết, javascript thường được dùng cho phía client để truy cập trực tiếp vào các DOM mục đích có thể là sửa style css, html hoặc là các effect của trang web. 

Nhưng javascript còn hơn thế nữa, chúng ta có thể sử dụng nó để làm server, và NodeJS là một cách.

NodeJS chạy trên môi trường V8 Javascript runtime, nó là gì? V8 Javascipt runtime là 1 một trình thông dịch trên chrome. 

Với NodeJS, nó có các module thực hiện cho việc nhiều thread kết nối tới 1 server dễ dàng hơn nhưng khó khăn cho người mới bắt đầu cũng có và lợi ích thu được cũng có.

**Câu hỏi đặt ra là tại sao nên sử dụng NodeJS??**
- Tốc độ thực thi và khả năng mở rộng.
- Có thể đồng thời xử lý nhiều kết nối.

# II. Cài đặt NodeJS.
1. Trên Mac OS.

Các bạn có thể truy cập trang chủ của nodejs và tải về như cài các ứng dụng bình thường (https://nodejs.org/en/).
Nhưng ở đây mình sử dụng Homebrew.

**Đầu tiên các bạn cần phải cài brew:**
```shell
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
Brew là gì? Nó cho phép chúng ta cài các ứng dụng liên quan tới Shell và các ứng dụng khác. Homebrew được viết bằng ruby `usr/bin/ruby` và ruby đã được cài đặt sẵn trên Mac OS rồi.

Ok đã xong, tiếp theo các bạn có thể cài đặt bất cứ shell nào các bạn cần cho project
```brew install node```

Nếu muốn update lên version mới nhất thì có thể ``` brew upgrade node ``` hoặc xem version node ``` node -v ```

**Cài đặt npm(node package manager)**

```brew install npm```

Trong nodejs có các package và library,.. phục vụ cho các mục đích khác nhau và chúng ta sẽ sử dụng **npm** để cài, hoặc [yarn](https://yarnpkg.com/en/)

2. Trên Ubuntu

Đối với ubuntu thì ta có apt để thay cho brew. Apt là một quản lý ứng dụng, package,... 
```markdown
sudo apt install nodejs-legacy
sudo apt install npm
```
# III. Cấu trúc
Chúng ta tạo ra 1 folder mới và đặt tên tuỳ theo các bạn và cd vào folder vừa tạo nhá.
Đầu tiên ta khời tạo project bằng cách tạo file package.json 
```php
npm init
```
Trong khi tạo nó có hỏi name và version thì các bạn có thể lấy default của nó bằng cách Enter.

![](https://images.viblo.asia/9ca38d62-899f-4bfd-a1bd-77e4bd80e30f.png)

Các bạn mở IDE lên và để ý vào từ khoá **main** ("main": "index.js") chính là tên file sẽ chạy đầu tiên. Do đó ta cần phải tạo thêm 1 file **index.js**.

Để test xem chúng ta từ nãy giờ có làm đúng hay không, đơn giản trong file index.js các bạn gõ **console.log('True / False :D')** và chúng ta hãy quay lại terminal và gõ lệnh `node file_name`

![](https://images.viblo.asia/1388a424-9d66-4635-93a6-e52045b04f03.png)

### Cách sử dụng modul trong NodeJS.
- Module là gì? module chính là 1 file chứa một số biến, fuction, constant, ... và chúng ta export nó ra để sử dụng

Mính có tạo 1 folder mới và đặt tên là Animal trong đó có chứa file **Cat.js**
```javascript:js:Cat.js
//area là 1 fuction
exports.area  = (name, age) => name + ' ' + age;
```
ở đây nghĩa là chúng ta export function `area` để tất cả các file có thể sử dụng được function area, `(name, age)` ở đây là input đầu vào, `name+age` là phần thực thi, đây là 1 arrow function.

Sau đó chúng quay lại file index và import file Cat.js lại
```javascript:js:index.js
//import file Cat.js
const cat = require('./Animal/Cat');
console.log(` This is ${cat.area('ConMeo', 2)} age`);
```
Khi đó chạy trên terminal và được kết quả như sau: 

![](https://images.viblo.asia/b40ed384-dfed-4b12-8736-fdda17feb96f.png)

Có 1 cách nữa đó là chúng ta sử dụng modul. Modul ở đây nghĩa là gì, module ở đây chính ta trỏ tới chính file này, cũng như là con trỏ this trỏ tới chính function đó. Cách này thường được sử dụng khi ta muốn public nhiều hàm ra ngoài.

chúng ta sửa file Cat.js thành như sau: 
```python:js:Cat.js
module.exports = {
    area: (name, age) => name + ' ' + age,
    info: (height, width) => 'Height is' + ' ' + height + ' ' + 'cm' + ' ' + 'Width is' + ' ' + width + ' ' + 'cm',
}
```

![](https://images.viblo.asia/665e7ec0-e184-499b-abcd-08d66a3b7645.png)

Nếu trong hàm thực thi mà có nhiều dòng ví dụ như sau:

```javascript:js:Cat.js
module.exports = {
    area: (name, age) => {
        console.log('Get info ...');
        return name + ' ' + age;
    },
    info: (height, width) => 'Height is' + ' ' + height + ' ' + 'cm' + ' ' + 'Width is' + ' ' + width + ' ' + 'cm'
}
```
![](https://images.viblo.asia/7450a532-77e9-4198-a631-8c855b66335e.png)

# IV. Debugger
Cũng giống như cú pháp debug trên js ta chỉ cần thêm `debugger` vào sau đoạn cần debug: 
```rust:js:index.js
console.log('start');
debugger;
var TotalNumber = (numbers) => {
    var total = 0;
    debugger;
    for (let number in numbers) {
        total = total + parseFloat(number);
        console.log(`total is : ${total}, number is ${number}`);
    }
    console.log(`Result is : ${total / numbers.length} `);
}

TotalNumber([9, 2, 3, 10, 6, 8]);
```

Nếu ta chạy `node index.js` thì sẽ ra kết quả như sau:

![](https://images.viblo.asia/065c0f49-e100-4758-9bdd-56aba6ea1b51.png)

Nhưng nếu muốn chạy debug thì sao?? Các bạn thêm inspect vào câu lệnh nhé: `node inspect index.js`

Khi bạn chạy câu lệnh trên, chương trình sẽ dừng lại trước mỗi `debugger` và khi muốn tiếp tục chạy ta chỉ cần gõ `c` và `Enter`. 

`n` để chỉ chạy thêm 1 dòng code

`repl` Real Eval Print Loop: hiểu đơn giản là ta có thể in được kết quả hiện tại ta đang debug

`list(3)` hiển thị ra 3 dòng code trong đoạn mà ta đang debug

`sb(20)` set breakpoint nhảy đến dòng 20

![](https://images.viblo.asia/2bb28a8b-bf8c-4565-9c92-5dc92a7c7aad.png)

Bài viết này mình xin kết thúc tại đây, bài viết tiếp theo trong series này mình sẽ giời thiệu về HTTP, Babel, Event ,... Thanks!!
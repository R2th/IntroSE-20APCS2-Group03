Không biết mọi người thấy sao nhưng mình thấy `javascript` giống một cô gái. Nhìn rất hay nhưng tìm hiểu kĩ thì rất phức tạp. Javascript ẩn trong nó là hàng tá các định nghĩa khó hiểu không kém: `prototype`, `callback function`, `scope`, `hoisting, dynamic object,` `invocation pattern`.

Nhưng mà gái thì không thể thiếu được đúng không ? Javascript cũng vậy, không thể thiếu trong các website, nhưng việc code những hệ thống lớn, gồm hàng trăm module, dùng từ front end đến back end, từ web đến mobile app, desktop app mà chỉ có mỗi javascript thì gần như là quá tải, và sớm muộn gì mấy ông maintain cũng sẽ đến đốt nhà bạn. Thật may `ES6` đã ra đời. `ES6` nhằm hỗ trợ cho việc code trở nên dễ dàng và tường minh hơn. Nhưng ES6 không phải gồm 1 hay 2 technique mà gồm hàng tá kỹ thuật hỗ trợ, trong bài viết này mình sẽ  giới thiệu một số tính năng mới của `ES6` và mổ xẻ so sánh nó với ES5.

Nó giống như việc việc bạn đang quen một cô gái tính cách rắc rối, ngoại hình xấu xí, tán mãi không đổ. Một ngày đẹp trời bạn `ES6` xuất hiện, tính cách đơn giản, ngoại hình ưa nhìn. Tại sao chúng ta lại bỏ lỡ một cô gái như vậy đúng không.

Thôi lan man quá, vào tán đi không thằng khác nó tán mất :D
# 1. Tìm hiểu 
Cũng giống cách các bạn tán gái, để làm việc với `ES6` chúng ta cần biết sở thích, nguồn gốc, bố mẹ nó là ai, có dễ tính không chứ.

## ES6 Là Gì ?
ES6 là chữ viết tắt của ECMAScript 6, đây được coi là một tập hợp các kỹ thuật nâng cao của Javascript và là phiên bản mới nhất của chuẩn ECMAScript. ECMAScript do hiệp hội các nhà sản xuất máy tính Châu Âu đề xuất làm tiêu chuẩn của ngôn ngữ Javascript. Bạn cứ nghĩ xem hiện nay có khá nhiều trình duyệt Browser ra đời và nếu mỗi Browser lại có cách chạy Javascript khác nhau thì các trang web không thể hoạt động trên tất cả các trình duyệt đó được, vì vậy cần có một chuẩn chung để bắt buộc các browser phải phát triển dựa theo chuẩn đó.

ES6 ra đời vào năm 2015 nên cái tên ES2015 được lấy làm tên chính thức với nhiều tính năng mới, học hỏi các ngôn ngữ cấp cao khác. Hy vọng dần theo thời gian Javascript trở thành một ngôn ngữ lập trình hướng đối tượng.

Phiên bản sắp ra trong năm 2017 đó là phiên bản ES7 cũng đang được nghiên cứu và phát triển, họ cũng nhắm đến các kiến thức mới lạ như async function, observer... Hy vọng sẽ có nhiều biến động mới.

## Tán có dễ không ?
Chắc chắn dễ , đùa chút thôi chứ với một ngôn ngữ mới học bạn cần `trì` một chút. Nhưng nếu tán được một cô gái xinh đẹp thì trì nhiều chút cũng được đúng không?
Để bắt đầu với ES6 bạn cần có `kĩ năng tán gái cơ bản`( `Kiến thức JavaScript`) và `con nhà có điều kiện một chút`(`trình duyệt`).

* Kĩ năng tán gái cơ bản ( `Kiến thức JavaScript`): Bạn phải học qua, làm qua mới JavaScript thì mới thấy ES6 nó hay. Có cái nhìn và sự so sánh, Nhưng quan trọng nhất để không bị `fail`
* Con nhà có điều kiện (`Trình duyệt`): Đi xe đạp thì ai yêu đúng không, `update` trình duyệt phiên bản mới nhất ngay bây giờ và tán nó.

Nếu bạn có đủ 2 tiêu chí trên thì vào làm quen nào.

# 2. Làm quen 
Để dễ hình dung hơn mình sẽ tập trung so sánh giữa `ES6 `và các phiên bản cũ hơn để dễ làm quen nhé.
Cũng nói luôn là gái thì xinh nên mình chỉ nêu ra những cái hay nhất của nó thôi. Các bạn có thể tự tìm hiểu. Gái xinh sao mà chỉ tán từ đầu đến cuối hết được đúng không. Mới cả tự tìm hiểu sẽ thấy nó xinh hơn thằng khác chém gió.

## Arrow Function in ES6
Ở ES6, thay vì khai báo function như kiểu thông thường, ta đã có thể sử dụng =>. Cách khai báo này tương tự như Lambda Expression trong C#, giúp cho code tường minh và ngắn gọn hơn rất rất nhiều.
Lấy 1 ví dụ để so sánh nhé :
Đối với ES5 để viết 1 function chúng ta thường hay làm như sau.
```
function hello(name) {
    console.log('Xin chào ' + name);
}
hello('Sử')
```
Với ES6 thì sao.
```
var hello = (name) => console.log('Xin chào ' + name);
hello('Sử')
```
Ngoài ra, nhờ có arrow, ta không còn bị tình trạng this bị bind nhầm như trước kia nữa.
```
var person = {
    firstName: 'Tiến Đạt',
    friends: ['Hariwon', 'Trấn Thành'],
    showFriend: function() {
        this.friends.forEach(function(fr) {
            // Với cách viết cũ, this ở đây sẽ là object window, không phải person
            console.log(this.firstName + ' have a friend named ' + fr);
        });
    }
};
person.showFriend(); //undefined
```

Cùng xem ES6 xử lí trường hợp này như thế nào nhé
```
var person = {

    firstName: 'Tiến Đạt',

    friends: ['Hariwon', 'Trấn Thành'],

    showFriend: function() {

        this.friends.forEach(fr => console.log(this.firstName + ' have a friend named ' + fr));
    }
};
person.showFriend();
```
Mở console trình duyệt ra rồi chạy. Xinh gái hơn hẳn đúng không.
## Default parameter spread
Default Parameter là giá trị mặc định của tham số khi truyền vào các function. Đối với Javascript thì có nhiều bạn chưa biết chức năng này mặc dù trong ES5 đã cung cấp săn cho chúng ta, tuy nhiên người ta cảm thấy cách tạo giá trị mặc định trong ES5 vẫn không hay nên họ đã bổ sung một cách khác mới hơn và đơn giản hơn rất nhiều trong ES6.
Tiếp tục lấy ví dụ để so sánh sự khác biệt giữa ES5 và ES6 nhé
Với ES5 chúng ta thường khai báo default parameter như sau.
```
function multiply(a, b) {
    var b = typeofb !== 'undefined' ? b : 1;
    console.log(a * b);
}
multiply(5, 2); //10
multiply(5); // 5
```
Với ES6 thì sao ?
```
function multiply(a = 1, b = 1) {
    //truyền vào 2 giá trị a, b
    //trả về kết quả a* b
    console.log(a * b);
}

multiply(5, 2); //10

multiply(5); // 5

multiply(); //1
```
## Cải tiến syntax class và object
Có lẽ đây là điều mình thích nhất ở ES6. Mình rất ghét phải sử dụng prototype.Có lẽ do ảnh hưởng của lập trình hướng đối tượng. Thật may trong ES6, class có hỗ trợ constructor, get/set, việc kế thừa cũng rất dễ thực hiện bằng từ khóa extends.
Việc viết code dễ đọc dễ hiểu hơn rất nhiều:
```
class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
    // Getter
    getarea() {
        return this.calcArea();
    }
    // Method
    calcArea() {
        return this.height * this.width;
    }
}
constsquare = newRectangle(10, 10);
console.log(square.area); // 100
```
Với cách khai báo object mới, ta có thể viết code một cách ngắn gọn và rõ ràng hơn nhiều
```
var firstName = 'Su ';
var lastName = 'Dep Trai';
// Khai báo object kiểu cũ
var obj = {
    firstName: firstName,
    lastName: lastName,
    showName: function() {
        console.log(this.firstName + ' ' + this.lastName)
    }
};

// Khai báo kiểu mới, ngắn gọn hơn
// Không cần lặp lại tên biến hay function
var obj = {
    firstName,
    lastName,
    showName() {
        console.log(this.firstName + ' ' + this.lastName)
    }
};
```
## Iterator
Ngày xưa, để duyệt qua từng phần tử trong một mảng, ta phải sử dụng hàm for, chạy index từ 0 tới cuối mảng. Về sau đỡ hơn, ta có thể sử dụng hàm forEach. Tuy nhiên nhiều người lại thấy cú pháp hàm forEach hơi lạ, không được tự nhiên cho lắm. Trong ES6, ta đã có thêm for… of để duyệt từng phần tử trong một mảng (Đừng nhầm với for…in, để duyệt các trường trong 1 object nhé).

```
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// Dùng forEach
numbers.forEach(function(number) {
    console.log(number);
})
// Dùng for...of, dễ viết dễ đọc
for (var number of numbers) console.log(number);
```
 ## Template String
 Chức năng này khá giống chức năng string interpolation trong C# 6.0. Trước đây, JavaScript không có string.format, do đó ta phải cộng chuỗi bằng tay rất cực. Giờ đây, sử dụng `template string`, ta không cần phải mất công cộng chuỗi nữa, code rõ ràng hơn nhiều.
 ```
 var name = "Su", time = "today";
// Cách cũ
console.log("Hello " + name + " how are you " + time + " ?");
// Dùng string interpolation, để ý dấu `
console.log(`Hello ${name}, how are you ${time}?`);
 ```
 ## Multiline String in ES6
 Tiện đây nhắc luôn về multiline. MultiLine có nghĩa là nhiều dòng. Khi bạn code một đoạn nào đấy các bạn không thể để 1 dòng code quá dài phải không ! nó rất là xấu và khi có sếp review code chắc chắn sẽ comment là convention luôn đấy. Trong ES5 mọi người hay làm như thế này phải không. Lấy ví dụ cả thơ cho lãng mạn.
 ```
 var content = 'Ngủ đi nhé những yêu thương khờ dại,\n\t'

+ 'Gió sẽ thổi, quên đi một bờ vai\n\t'

+ 'Nắng sẽ hồng và mưa cũng sẽ tạnh\n\t'

+ 'Thời gian nhòa, kỉ niệm sẽ phôi pha\n\t'

console.log(content);
 ```
 Với ES6 không cần nhiều nháy đơn đến thế ^^
 ```
var content = `Ngủ đi nhé những yêu thương khờ dại

Gió sẽ thổi, quên đi một bờ vai

Nắng sẽ hồng và mưa cũng sẽ tạnh

Thời gian nhòa, kỉ niệm sẽ phôi pha`

console.log(content);
 ```
 ## Promise
>  The Promise object is used for asynchronous computations. A Promise represents an operation that hasn't completed yet, but is expected in the future  - Theo MDN
> 
Để dễ hiểu, mình gọi Promise là lời hứa. Tương tự như trong thực tế, có người hứa rồi làm, có người hứa rồi … thất hứa.

Một lời hứa có 3 trạng thái sau:

* Pending: Hiện lời hứa chỉ là lời hứa suông, còn đang chờ người khác thực hiện
* Fulfilled: Lời hứa đã được thực hiện
* Reject: Bạn đã bị thất hứa, hay còn gọi là bị “xù”

Lấy ví dụ nhé:
```
 var promise = new Promise(function(resolve, reject) {
     // do a thing, possibly async, then…
     if (true) {
         resolve("Stuff worked!");
     } else {
         reject(Error("It broke"));
     }
 });
 promise.then(function(result) {
     console.log(result); // "Stuff worked!"
 }, function(err) {
     console.log(err); // Error: "It broke"
 });
```
Trong đoạn code trên resolve là một hàm callback xử lý cho hành động thành công. reject là một hàm callback xử lý cho hành động thất bại.
# 3. Lời kết
Thôi làm quen có thế thôi, còn bạn muốn ôm, hôn, hay làm gì tiếp theo thì tự mày mò tiếp đi nhé :D. Còn bạn muốn tán nhiều gái hơn hay muốn ôm, hôn `ES6` thì cũng có thể theo dõi blog mình viết tại địa chỉ [này nhé](https://storyofsu.com/).
Cảm ơn bạn đã đọc bài viết này của mình :D
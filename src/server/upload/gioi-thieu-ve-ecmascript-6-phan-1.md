# 1. Giới thiệu 
## 1.1 ECMAScript 6 là gì?
ECMAScript thực ra đây là tên gọi khác của Javascript thôi chả có gì cả =)). Đây là phiên bản của Javascript (từ 6/2015).
Ở phạm vi bài viết này chúng ta sẽ cùng tìm hiểu về một số chức năng nổi bật của ES6 nhé.
## 1.2 Tại Sao Lại Nên Dùng ES6
ES6 là một tập hợp kỹ thuật nâng cao của javascript và nó là 1 chuẩn mực để làm theo. Ví dụ bạn cứ tưởng tưởng khi 1 team có nhiều thanh viên làm một dự án mà mỗi người code 1 loại ngôn ngữ, code 1 phong cách khác nhau thì dự án của bạn sẽ ra sao. Thì ES6 cũng thế nó là một chuẩn mực để cho các framework từ đó mà phát triển lên hay để cho các lập trình viên code javascript một các thống nhất và tối ưu nhất.
# 2. Một số tính năng nổi bật
## 2.1 Template Literals
Template Literals là tính năng cho phép bạn có thể nhúng biểu thức javascript vào trong chuỗi. Ở các phiên bản trước khi muốn là điều như vậy bạn phải sử dụng dấu `+` để nối các đoạn với nhau. Như ở ví dụ dưới đây:
Trước kia: 
```
var name = 'Long';
console.log('My name is ' + name);
```
Tuy nhiên, trong ES6 thì: 
```
var name = 'Long';
console.log(`My name is ${name}`);
```
## 2.2 Multi-line String
Trong ES6 bây giờ bạn có thể viết được đoạn string nhiều dòng dễ dàng hơn mà không cần thêm các ký tự \n \t gì vào nữa.
Trước kia:
```
var content = 'Dòng thứ 1 \n Dòng thứ 2';
```

Trong es6:
```
var content = `Dòng thứ 1
               Dòng thứ 2`;
```
## 2.3 Destructuring Assignment
Destructuring Assignment là khả năng lấy ra giá trị của một hay nhiều phần tử trong 1 mảng hoặc 1 object đồng thời gán giá trị lấy ra này vào một biến cho trước. Ví dụ ta có 1 object:
```
var info = {
              name: 'Long',
              age: 22,
              country: 'Việt Nam'
            }
```
Không dùng ES6:
```
var name = info.name;
var age = info.age;
var city = info.city;
```
Nếu dùng ES6:
```
var {name, age, city} = info
```
chú ý: 
   + Biến sẽ được set theo giá trị tương ứng với key trong object. Trường hợp mà tên biến khai báo không trùng với key nào trong object thì sẽ được báo `undefined`.
   + Sử dụng tính năng này cho Array cũng sẽ tương tự như trên. 
## 2.4 Default Parameter
Trong trường hợp không gán giá trị mặc định cho tham số đầu vào thì giá trị mặc định sẽ được lấy ra. Với các phiên bản trước của ECMAScript không cung cấp sẵn tính năng gán giá trị mặc định cho tham số của hàm mà thông thường cần phải thực hiện thông qua một số bước gián tiếp khác để đạt được mục đính tương tự. Trong ECMAScript 6, tính năng gán giá trị mặc định cho tham số đã được hỗ trợ: 
```
function tinhTong(x, y = 10) {
    return x + y;
}
```
Nếu như không truyền đủ tham số hoặc có truyền nhưng là undefined thì sẽ gán giá trị mặc định cho y = 10 
```
tinhTong(5); // kết quả = 15
tinhTong(5, undefined) // kết quả = 15
```
## 2.5 Rest Parameter
Rest Parameter là tính năng cho phép ta có thể truyền tham số vào function 1 cách tuỳ ý. Hay nói cách khác là khi viết hàm mà ta không chắc chắn về số lượng tham số đầu và thì ta sẽ dùng Rest Parameter. Mình thấy có ví dụ điển hình về trường hợp này đó là tính tổng dãy số bất kỳ.
```
function tinhTong(...rest_parameters) {
    let tong = 0;
    for(let i = 0; i < rest_parameters.length; i++) {
        tong+= rest_parameter[i];
    }
}
```
Chú ý:
* Tham số rest_parameters nó sẽ hiểu đây là 1 mảng các bạn ạ.
* Các bạn hãy nhớ tới ví dụ này nhé, hiện tại mình lấy ví dụ như thế này để chúng ta dễ hình dung ra được thôi chứ thực ra cách viết thế này cũng chưa tối ưu ES6 lắm nhưng hiện tại bạn cứ hiểu về Rest Parameter đi đã nhé.
# Tổng kết
* Ok hôm nay mình xin phép được giới thiệu về một phần tính năng trong ES6, mình sẽ sớm viết tiếp phần 2 để giới thiệu cho các bạn về các tính năng khác trong ES6(Arrow Function,  ES6 import và export, ES6 Rest Parameter, ...).
* Bài viết có thể sẽ có những sai sót nhất định nên mong các bạn thông cảm và hãy cmt góp ý giúp mình bên dưới để có 1 bài viết hoàn thiện hơn nhé. Xin cảm ơn các bạn!!!
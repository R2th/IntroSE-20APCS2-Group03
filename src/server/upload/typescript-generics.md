# Giới thiệu
Một phần chính của công nghệ phần mềm là xây dựng các thành phần có thể tái sử dụng.  Các thầnh phần có khả năng làm việc với dữ liệu của ngày hôm nay cũng như dữ liệu của ngày mai. Điều này cung cấp cho chúng ta các khả năng linh hoạt nhất để xây dựng các hệ thống phần mềm lớn.

*Bài viết giả định mọi người đã biết đến TypeScript. Nếu muốn các bạn có thể tìm hiểu TypeScript [tại đây](https://www.typescriptlang.org/docs/home.html)*
# Generics - Hello World

Để bắt đầu chúng ta chuẩn bị một function *helloWorld*  - function đơn giản  trả về những gì đã truyền vào. Nếu không sử dụng Generics thì function sẽ như sau:

```
function helloWorld(arg: any): any {
    return arg;
}
```

Chúng ra đã sử dụng kiểu *any* cho tham số *arg*, điều này làm cho function chúng ta có thể chấp nhận mọi kiểu dữ liệu cho tham số *arg*. Nhưng vấn đề khi sử dụng kiểu *any* là trong thân hàm chúng ta không thể xác định được kiểu dữ liệu thực tế của đối số *arg*, khiến cho việc xử lý trong thân function nói chung gặp khó khăn, hoặc đơn giản ở function *helloWorld* chúng ta sẽ không biết dữ liệu của function này là gì.

Thay vào đó, khi chúng ta sử dụng **Generics** sẽ khắc phục được nhược điểm trên:

```
function helloWorld<T>(arg: T): T {
    return arg;
}
```

Chú ý cú pháp `<T>` sau tên function.  Chúng ta có thể sử dụng một biến bất kì, nhưng thông thường sẽ là **T** - *Type variable*. Có thể hiểu biến này là một tham số đặc biệt, giá trị của nó sẽ được truyền từ bên ngoài vào. Giá trị biến này được sử dụng như một kiểu dữ liệu, khác với các tham số thông thường. Cụ thể ở function trên biến T dùng để quy định kiểu dữ liệu của tham số *arg* và kiểu dữ liệu trả về của function. 
    
Giả sử trong một bối cảnh nào đó chúng ta muốn làm việc với function bằng kiểu dữ liệu **string**, chúng ta sẽ gọi hàm như sau:

```
let output = helloWorld<string>('myString);  // type of output will be 'string'
```

Chú ý chúng ta truyền đối số **string**  trong cú pháp `<>` chứ không phải `()`.

Hoặc chúng ta có thể sử dụng *type argument inference* - một cách thuận tiện hơn, chúng ta có thể giao phó cho trình biên dịch. Trình biên dịch sẽ tự động đặt giá trị cho biến T dựa vào giá trị chúng ta truyền vào tham số *arg*:

```
let output = helloWorld('myString);  // type of output will be 'string'
```
Tuy rằng khi sử dụng *type argument inference*  sẽ giúp code chúng ta ngắn và dể đọc hơn, nhưng với các kiểu dữ liệu phức tạp - không phải các kiểu dữ liệu nguyên thuỷ như **string**, **number**... thì chúng ta cần truyền kiểu dữ liệu đó cho function như cách chúng ta đã làm ở ví dụ trên, vì trình biên dịch không thể dự nhận dang được kiểu dữ liệu này từ tham số *arg*.

Chúng ta gọi function *helloWorld* là **Generic** vì nó làm việc với mọi kiểu dữ liệu, nhưng không giống như sử dụng *any*, **Generic** có thể xác định rõ ràng kiểu dữ liệu của tham số và kiễu dữ liệu trả về.

#  Generic Classes
Tương tự như functon, chúng ta có thể truyền kiểu dữ liệu vào trong một class và làm nó thành một class chung có thể linh hoạt sử  dụng với nhiều kiểu dữ liệu - **Generic class**.

```
class AddGeneric<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
```

Tiếp tục sử dụng cú pháp `<T>` sau tên class. Bây giờ class *AddGeneric* không hạn chế chỉ làm việc với kiểu **number**, mà còn có thể làm việc với **string** hoặc các kiểu dữ liệu phức tạp hơn.

```
// number
let addNumber = new AddGeneric<number>();
addNumber.zeroValue = 0;
addNumber.add = function(x, y) { return x + y; };
console.log(addNumber.add(addNumber.zeroValue, 1)); // return 1

// string
let addString = new AddGeneric<string>();
addString.zeroValue = '';
addString.add = function(x, y) { return x + y; };

console.log(addString.add(addString.zeroValue, 'a')); // return 'a'
```

# Generic Constraints
Giả sử chúng ta muốn log length của đối số *arg* trên console. Ban đầu chúng ta có thể làm như thế này:

```
function loggingLength<T>(arg: T): T {
    console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}
```

Khi chúng ta làm như trên chúng ta sẽ nhận lại một lỗi. Bởi vì không một nơi nào chúng ra nói rằng tham số *arg* có thuộc tính *length*. Nhớ rằng sớm hơn chúng ya đã nói T có thể là bất kỳ kiểu dữ liệu nào. Vì vậy function này có thể được truyền đố số là **string** hoặc **number**. Tất nhiên với **number** thì sẽ không có thuộc tính *length*. Chúng ta có thể giải quyết vấn đề này như sau:

```
interface Lengthwise {
    length: number;
}

function loggingLength<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
```

Trình biên dịch sẽ không báo lỗi bởi vì bây giờ chúng ta đã định nghĩa thuộc tính length cho đối số *arg* bằng cách cho **T** kế thừa *Lengthwise* - **Generic Constraints**.

```
loggingIdentity(1);  // Error, number doesn't have a .length property
loggingIdentity("a");  // return 1
loggingIdentity({length: 1, value: 1}); // return 1
```

# Tham khảo
https://www.typescriptlang.org/docs/handbook/generics.html#hello-world-of-generics
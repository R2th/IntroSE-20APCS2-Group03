Ok... như vậy là kiểu lưu trữ dữ liệu đầu tiên mà trong mấy cái tài liệu DSA mà mình Google được đều trỏ tới là `array` - thường được dịch là mảng dữ liệu. Định nghĩa tổng quan về mảng thì sơ sơ là một cấu trúc lưu trữ dữ liệu có thể giúp chúng ta lưu nhiều giá trị cùng kiểu ở dạng `key/value`. Trong đó thì các khóa `key` là các trị số chỉ vị trí của các phần tử dữ liệu `value` trong mảng, xuất phát từ `0` và hiển nhiên tất cả các trị số đều là số nguyên.

## Một số tiện ích của array

Cách tổ chức lưu trữ dữ liệu này có thể được xem như một chiếc giá đựng các cuốn sách với các ô chứa được đánh số. Trong đó thì hiển nhiên mỗi ô sẽ chỉ có thể đặt vào một cuốn sách duy nhất. Một số điểm thuận tiện mà chúng ta có thể kể đến khi sử dụng `array` là:

- Truy xuất nhanh một phần tử bất kỳ bằng trị số chỉ vị trí. Rất dễ hình dung khi sử dụng để mô tả một bảng dữ liệu với các hàng mô tả các bản ghi được đánh số thứ tự.
- Nhờ vậy thì việc thêm mới hoặc cập nhật một giá trị đã được lưu trữ tại một vị trí bất kỳ ở trong mảng cũng rất thuận tiện.
- Dễ dàng lặp một thao tác chỉnh sửa lần lượt qua các phần tử của mảng từ một vị trí bất kỳ, theo chiều xuôi hoặc ngược.
- Từ cái tiện ích ở trên thì chúng ta cũng sẽ có thể dễ dàng thực hiện các phép toán tổ hợp ví dụ như tính tổng giá trị, trung bình, thống kê, v.v...

## Array in JavaScript

Trong hầu hết tất cả các ngôn ngữ thì `array` là kiểu cấu trúc dữ liệu phổ biến nhất. Do đó, ngoài giao diện viết code ở dạng cấu trúc và tương tác bằng các `sub-program`, thì thao tác làm việc với các mảng còn thường được biểu thị bằng các cặp ngoặc vuông `[]`.

```array.js
var stringArray = new Array ("the", "quick", "brown", "fox");
console.log( stringArray.at(0) );   // "the"

var numberArray = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
console.log( numberArray[9] );   // 9
```

Trong một số ngôn ngữ có độ linh động cao như JavaScript thì các mảng được thiết kế với độ dài không cố định. Do đó thao tác bổ sung thêm các phần tử mới vào mảng thông qua các trị số chỉ vị trí cũng rất đơn giản.

```array.js
var stringArray = ["the", "quick", "brown", "fox"];
stringArray[4] = "jumps";
stringArray[5] = "over";
console.log(stringArray);
```

Tuy nhiên ở các ngôn ngữ định kiểu tĩnh như Java, C#, hay C ở đây, thì chúng ta sẽ cần khai báo một mảng có độ rộng dư giả một chút để có thể thao tác thêm phần tử mới vào mảng thông qua các trị số chỉ vị trí như trên.

Các mảng trong JavaScript và một số ngôn ngữ khác ví dụ như PHP còn có khả năng lưu trữ các giá trị thuộc các kiểu khác nhau. Khi một mảng được sử dụng theo cách này, người ta thường ta thường gọi đó là `mixed array` hay một mảng hỗn hợp. Và ở một số ngôn ngữ khác thì người ta gọi đó là `tuple` - có nghĩa là một danh sách các giá trị có số lượng hữu hạn đã được biết trước, thường được dùng để mô tả các bản ghi dữ liệu đơn giản.

```array.js
var bookArray = [
   [0, "Tao Te Ching", "Lao Tzu"       , 9],
   [1, "Yoga Sutra"  , "Patanjali"     , 9.5],
   [2, "Lotus Sutra" , "Gautama Buddha", 10]
];

console.log( bookArray[0] );
// [0, "Tao Te Ching", "Lao Tzu", 9]
```

## Array in C

Như chúng ta đã biết về các [mảng trong C](https://viblo.asia/p/aWj53myPZ6m) thì độ dài của một mảng bất kỳ sẽ được cố định tại thời điểm khởi tạo. Khi sử dụng cú pháp đơn giản để khởi tạo một mảng trong C, thì các vị trí trong mảng chưa được gán dữ liệu sẽ có các `bit` dữ liệu mặc định đều là `0` đối với mọi kiểu dữ liệu.

```simplicity-dsa-c/index.h
typedef double val;
typedef void* ref;
```

```simplicity-dsa-c/test.c
#include <stdio.h>
#include "index.h"

int main ()
   {  val numberArray[128] = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
      printf ("%lf", numberArray[90]);
      return 0;
   }
```

```CMD|Terminal.io
gcc test.c -o test
test

0.000000
```

Điều này tạo ra một vài sự bất cập với các thao tác làm việc với các mảng. Cụ thể là khi chúng ta có một mảng có độ rộng khá lớn đang chứa một vài phần tử và còn kha khá khoảng trống chưa sử dụng. Lúc này, để thêm một phần tử mới vào vị trí tiếp theo sau phần tử mới nhất đang có mặt trong mảng thì chúng ta cần phải biết được trong mảng đang có bao nhiêu phần tử.

Tuy nhiên, nếu như đối với một mảng lưu các giá trị số học như trong ví dụ trên, thì giá trị `0` cũng là giá trị có ý nghĩa. Vậy chúng ta sẽ không có cách nào để luôn luôn xác định được chính xác phần tử mới nhất đang có mặt trong mảng. Bởi vì nếu như chúng ta thực hiện thao tác vòng lặp và đếm từ phần tử đầu tiên, thì chúng ta không biết nên đếm tới khi nào thì dừng lại.

JavaScript và nhiều ngôn ngữ khác đã xử lý vấn đề này bằng cách kiến trúc nên các mảng ở dạng `object` có thêm thuộc tính `length` mô tả độ dài hiệu dụng của mảng. Và các thao tác làm việc với mảng - ví dụ như thêm phần tử mới - vẫn có cú pháp ngắn gọn sử dụng các dấu ngoặc vuông `[]` nhưng thực ra đã ngầm định thực hiện thêm công việc tăng giá trị của thuộc tính `length`.

Như vậy, nếu như chúng ta có thể xây dựng một `struct` có chứa `array` và thuộc tính `length`; kèm theo đó là các `sub-program` hỗ trợ làm việc với `struct` này thay cho cú pháp sử dụng các dấu ngoặc vuông `[]`; Thì có lẽ chúng ta sẽ có thể khắc phục những điểm bất cập đã nói ở trên.

> Cứ miễn sao chúng ta có thể tạo ra được một khối dữ liệu thực hiện truy xuất bằng các trị số chỉ vị trí đếm từ 0 thì đó là Array. Mấy cái dấu ngoặc vuông `[]` không quan trọng lắm đâu. :D

[[Imperative Programming + C] Bài 12 - Simplicity DSA-C Array (tiếp theo)](https://viblo.asia/p/Az45bjbN5xY)
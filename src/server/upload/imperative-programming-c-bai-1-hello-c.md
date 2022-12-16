Đây là bài viết đầu tiên của [Series Programming Paradigms](https://viblo.asia/s/jeZ103X3KWz) - dịch nôm na là các mô hình lập trình - hay nền móng như tuy duy để tạo ra một chương trình phần mềm. Series này được tạo ra nhằm chia sẻ lại kinh nghiệm tự học một vài ngôn ngữ lập trình, sau khi mình đã hoàn thành một chặng đường ngắn [Tự Học Lập Trình Web Căn Bản](https://viblo.asia/s/Wj53OQQP56m) với mức hiểu biết lơ mơ về JavaScript và công việc lập trình nói chung.

Nội dung của Series này là chất liệu chi tiết cho các bài viết giới thiệu tổng quan về các mô hình lập trình trong Sub-Series JavaScript tại đây: [https://viblo.asia/p/gDVK2r2XKLj](https://viblo.asia/p/gDVK2r2XKLj). Cụ thể là với mỗi một mô hình lập trình phổ biến thì mình có chọn ra một ngôn ngữ để tìm hiểu và áp dụng lối tư duy chủ điểm của mô hình lập trình đó. Mục tiêu vừa là để học hỏi thêm những kiến thức lập trình căn bản và vừa là để làm quen với các ngôn ngữ lập trình khác nữa.

## Imperative Programming

Dịch nôm na là "Lập Trình Tuần Tự" hay "Lập Trình Mệnh Lệnh" - là một trong hai mô hình lập trình căn bản nhất; Trong đó, mô hình còn lại có tên là `Declarative Programming` - có nghĩa là "Lập Trình Định Nghĩa" hay "Lập Trình Khai Báo".

`Imperative Programming` đơn giản và gần gũi tới mức không có gì để băn khoăn đối với vị trí đứng quan sát của một newbie như mình, khi đã viết được một trang blog cá nhân đơn giản trên nền NodeJS. Cụm từ đó chỉ đơn giản có ý nghĩa là tạo ra một chương trình bằng các câu lệnh nối tiếp nhau, tuần tự, mô tả công việc cần thực hiện cho máy tính.

Vì vậy nên Sub-Serries `Imperative Programing + C-Ada` chủ yếu là để chia sẻ lại những điểm mà mình học thêm được từ C mà khi học JavaScript đã không có cơ hội được gặp. :D

## Ngôn ngữ C

Theo như Google bảo thì C xuất hiện gần như sớm nhất và được sử dụng để tạo ra hệ điều hành Unix nguyên thủy cách đây từ rất lâu. Còn hiện tại thì C được ứng dụng khá rộng rãi từ lập trình nhúng `embedded` - điều hành các thiết bị phần cứng có tài nguyên xử lý khá giới hạn - cho tới lập trình web như [Facil.io](https://facil.io/) hay [Kore.io](https://kore.io/). Ở đây mình chọn học ở khoảng xen giữa hai biên ứng dụng này, đó là làm quen với các khái niệm trong C rồi viết một ứng dụng `console` đơn giản thôi chứ không hướng đến những mục tiêu xa vời như `embedded` hay lập trình web bằng C. :D

So với JavaScript thì C có cú pháp khá tương đồng, sử dụng các câu lệnh đơn, đôi khi được đóng gói trong các khối ngoặc xoắn `{}` hay còn được gọi là `block style`; Khác với cú pháp của những ngôn ngữ như Python, Ruby, Haskell, v.v... được xác định khối bằng các khoảng trống thụt vào ở đầu các dòng code được gọi là `indentation style`. Ngoài ra thì còn nhiều điểm khác biệt nữa rất mới mẻ đối với những ai bắt đầu học lập trình từ các ngôn ngữ bậc cao như JavaScript. Những điểm khác và giống với JavaScript mà mình học được sẽ được liệt kê chi tiết trong những bài viết sau. :D

## Chuẩn bị môi trường

Hầu như bất kỳ ngôn ngữ lập trình nào cũng đều có thể được sử dụng theo hướng được đọc và chạy luôn bởi một chương trình thông dịch `interpreter` - giống như kiểu chúng ta đọc tin tức hàng ngày vậy. Đọc tới đâu là chữ nghĩa được cập nhật vào trí nhớ và tư duy logic nó hoạt động tới đó luôn. C cũng vậy.

Tuy nhiên thì khởi điểm C lại được thiết kế để xử lý qua các trình biên dịch `compiler` để chuyển đổi thành kiểu tệp thực thi được bởi hệ điều hành mà chúng ta đang sử dụng; Và đây là cách sử dụng chính của các chương trình được viết bằng C.

Chúng ta sẽ cần cài đặt một trình biên dịch trên hệ điều hành đang sử dụng. Nếu bạn đang dùng Windows thì có thể tải về và cài đặt [GNAT Studio Community](https://www.adacore.com/download). Đây là một trình soạn thảo code tích hợp môi trường phát triển phần mềm được xây dựng dành riêng cho Ada Lovelace. :D

Khi cài cái này về máy xong thì bạn mở cửa sổ dòng lệnh và gõ `gcc -v` sẽ thấy có trình biên dịch `gcc` đã được cài đặt kèm theo. Trình biên dịch này sẽ giúp dịch tệp code mà chúng ta viết thành một kiểu tệp chạy được bởi hệ điều hành đang sử dụng. Các bản phân phối Linux hầu hết đều được cài đặt sẵn `gcc` rồi, hoặc nếu không thì mình chắc chắn là bạn cũng biết rất rõ cách xử lý. :D

Vì vậy nên chúng ta hãy bắt đầu nói về C... theo cách của một newbie JavaScript.

## Hello C

Và đầu tiên là ứng dụng "Hello World" như mọi người thường nói trong các ngôn ngữ mới. Cái này là mình copy được trên mạng xong sửa lại cái đoạn chữ in ra màn hình thành "Hello C !" thôi. :D

```Documents\imperative-programming-c\0000-hello-c\main.c
#include <stdio.h>

int main() {
   printf("Hello C !");
   return 0;
}
```

Chúng ta có một dòng đầu tiên `#include` - dịch nôm na là "bao gồm" - chắc là để nhúng một cái tệp `stdio.h` ở đâu đó vào tệp code hiện tại, kiểu kiểu như `import` hay `require` khi học NodeJS. Cái `stdio` thì mình cũng có biết từ lúc học NodeJS nó là giao diện giao tiếp tiêu chuẩn của các phần mềm và hệ điều hành máy tính rồi. Vậy chắc là để hỗ trợ cho cái đoạn `printf` in chữ ra cửa sổ dòng lệnh.

Đoạn code phía sau thì sơ lược là một khối có cú pháp giống với định nghĩa `function` trong JavaScript, có mấy cái ngoặc đơn `()`, ngoặc xoắn `{}`, với lệnh `return`, nên nhìn ra luôn. Vậy là một khối lệnh được định nghĩa để gọi ở đâu đó và chạy các lệnh bên trong, trả về `0`. Vậy chỉ có cái từ khóa `int` và cách sử dụng đặt trước tên `main` của khối định nghĩa là mới so với JavaScript.

Bây giờ chúng ta cần chạy thử code này đã. Đầu tiên là trong cửa sổ dòng lệnh, chúng ta cần di chuyển tới thư mục chứa tệp `main.c`. Sau đó nhờ `gcc` biên dịch thành một tệp `main` kiểu khác mà hệ điều hành có thể chạy được.

```CMD|Terminal.io
cd Documents && cd imperative-programming-c && cd 0000-hello-c
gcc main.c -o main
```

Nếu như bạn đang sử dụng Windows sẽ thấy trong thư mục xuất hiện thêm tệp `main.exe`, còn Linux hay Mac thì sẽ thấy tệp mới là `main.o`. Tiếp tục gõ `main` trong cửa sổ dòng lệnh để chạy tệp đã biên dịch.

```CMD|Terminal.io
main

Hello C !
```

## Hello JavaScript

```main.js
console.log("Hello JavaScript !");
```

Trong môi trường chạy JavaScript tại trình duyệt web hay NodeJS thì hàm `main` được trình thông dịch ngầm định là nguyên cái tệp thực thi `main.js`; Còn cái giao diện `stdio` được đặt trong object `console` sẵn rồi vì vậy nên chúng ta thường viết lệnh sử dụng đơn giản vậy thôi. Có lẽ là C rườm rà hơn thật. :D

[[Imperative Programming + C] Bài 2 - Static Typing](https://viblo.asia/p/RQqKLRjml7z)
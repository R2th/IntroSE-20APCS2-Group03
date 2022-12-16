![](https://images.viblo.asia/a7ad9198-526c-4d14-9521-cef45f52b0e2.jpg)

Một ngôn ngữ mới lại được ra lò trong năm 2018 này và có vẻ như nó đang được rất nhiều cộng đồng quan tâm đến. Đó chính là `nim`. Ở bài viết này mình xin giới thiệu sơ qua về 1 vài thông tin của ngôn ngữ thú vị này.

Xem qua phần giới thiệu từ trang chủ của ngôn ngữ này thì có vẻ như yếu tố performance được nó ưu tiên cao nhất

[https://nim-lang.org/](https://nim-lang.org/)

+ High-performance garbage-collected language
+ Compiles to C, C++ or JavaScript
+ Produces dependency-free binaries
+ Runs on Windows, macOS, Linux, and more

Mới chỉ đọc qua những tính năng của nó thôi nhưng có vẻ như khá tương đồng với `go` một ngôn ngữ mà được rất nhiều người thích. còn mình thì thích nhất ở điểm nó có thể build ra mã binaries và chạy `anywhere`.

```go
var
  sum = 0
  count = 0

for line in stdin.lines:
  sum += line.len
  count += 1

echo("Average line length: ",
     if count > 0: sum / count else: 0)
```

ví dụ trên là 1 demo của ngôn ngữ này nhìn vào mình có vẻ rất thiện cảm vì những dòng code khá ngắn lại dễ nhìn dễ đọc.

## Tốc độ chạy

Trước hết để test thử tốc độ chạy của language này mình sẽ viết 1 tool cli đơn giản để chạy `hello world` đầu tiên các bạn tạo 1 file `hello.nim`;

```go
const str* = "[ Created by Nim ]"

echo "Hello World " & str

```

để compile nó lại các bạn sử dụng lệnh

```sh

$ nim c hello.nim
```

cũng giống như `go` vậy nim sẽ tự động biên dịch ra 1 mã binary `hello` để nó có thể chạy ở bất kỳ hệ điều hành nào bạn muốn.

```sh
./hello

//Out pug
Hello World [ Created by Nim ]
```

Thông số biên dịch ra của nó cho thấy khá là nhẹ chỉ có (96 kB) và cho chạy khoảng (2ms) Một con số khá là ấn tượng và theo mình thấy nó còn nhanh hơn cả `go` nữa 0_0!. Và ý tưởng loé lên trong đầu mình có lẽ sẽ hợp lý nếu viết 1 vài tool cho con `raspberry Pi` thì ngon.

## Biên dịch được sang cả javascript

Ngôn ngữ này còn có thể biên dịch được sang cả `javascript` điều này khó mà tin nổi tuy nhiên nó vẫn có thể làm tốt.

```sh

$ nim js hello.nim
$ node hello.js

//Out Put
Hello World [ Created by Nim ]
```

## Ông lớn nào đứng đằng sau ngôn ngữ này
Theo thông tin từ repo github

[https://github.com/nim-lang/Nim](https://github.com/nim-lang/Nim)

Không giống như những ngôn ngữ khác. 

+ `rust` By `Mozilla`
+ `go` By `Google`
+ `swift` By `Apple`
+ `typescript` By `Microsoft`
+ `kotlin` By `Jetbrains`


Thì Nim lại là dự án từ rất nhiều contributors xây dựng. Tuy mới chỉ là ngôn ngữ mới được ra mắt không lâu nhưng những điểm nổi bật của nó đều thừa hưởng từ rất nhiều những language hiện đại ngày nay. và có thể không biết chừng nó sẽ là 1 hot trending trong tương lai gần.

## Tài liệu tham khảo

+ [https://github.com/nim-lang/Nim](https://github.com/nim-lang/Nim)
+ [https://nim-lang.org/documentation.html](https://nim-lang.org/documentation.html)
+ [https://www.youtube.com/watch?v=hzxr9_ZK9uY](https://www.youtube.com/watch?v=hzxr9_ZK9uY)
+ [https://www.manning.com/books/nim-in-action](https://www.manning.com/books/nim-in-action)
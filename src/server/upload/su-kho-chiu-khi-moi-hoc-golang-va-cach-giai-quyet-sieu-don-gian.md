<div align="left"></div>Gần đây mình đang tìm một giải pháp backend thay thế cho Java Spring (do nó nặng vãi chưởng), sẵn tiện học luôn ngôn ngữ mới. Bỏ ra một ngày để tìm hiểu, khảo sát vài ngôn ngữ backend, cuối cùng mình đã chọn Golang. Nghe thiên hạ đồn Golang đơn giản, mạnh mẽ, chạy nhẹ nhàng, quá phù hợp với tiêu chuẩn của mình rồi (mình biết Nodejs cơ mà không thích lắm).

Tuy vậy, mới học Go được vài ngày, có một thứ làm mình vô cùng khó chịu. Google liền hai ba ngày mới ra được cách fix, và công nhận sau đó thì code Go sướng hẳn ra, việc học cũng trở nên tiện hơn rất nhiều. Vậy đó là gì, và cách giải quyết ra sao, hãy cùng tìm hiểu qua bài viết này nhé.

## Đôi nét về Golang

Trước hết mình sẽ giới thiệu đôi nét về Golang trước khi vào chủ đề chính. Bạn nào đã biết rồi có thể bỏ qua phần này nhé.

> Go - ngôn ngữ chỉ nghe qua tên thôi là biết của bác Google rồi :D

![](https://images.viblo.asia/96522d2b-b7ef-46f8-b66c-bdf9c6ba6e52.png)

Khi mới tiếp xúc với Golang, cảm giác đầu tiên là cái logo đúng kiểu trúa hề :joy: Tìm hiểu sâu hơn chút, mình biết thêm được Go là một ngôn ngữ khá mạnh:

* Đơn giản, dễ học hơn C/C++ nhiều
* Có static typing, kiểu dữ liệu tương tự như Java
* Là ngôn ngữ biên dịch thành native code (không cần thông dịch, byte code hoặc máy ảo gì cả).
* Hiệu suất rất tốt, do native code và goroutine siêu nhẹ
* Rất phù hợp cho kiến trúc Microservices

Do những ưu điểm trên, Golang rất phổ biến để xây dựng phần backend cho web. Ngay cả ông lớn như Google đã áp dụng nó cho rất nhiều ứng dụng web của mình. Không nói đâu xa, phổ biến dạo gần đây là Docker cũng được viết bằng Go. Và theo khảo sát của JetBrains, Go là ngôn ngữ hứa hẹn có nhiều tiềm năng nhất trong tương lai.

![](https://images.viblo.asia/2742f92f-38a4-440e-881e-91112de75004.png)

https://www.jetbrains.com/lp/devecosystem-2019/

Giới thiệu nhiêu đó có vẻ đủ rồi, và giờ hãy vào chủ đề chính của bài viết: sự khó chịu khi mới bắt đầu học Golang.

## Vấn đề phiền phức với Go module

Khi mới bắt đầu học ngôn ngữ hay framework nào đó, mình thường check xem có extension nào cho VSCode không. Nếu có thì quá tốt, do nếu so với các IDE khác thì VSCode vẫn nhẹ chán, code thích hơn. May mắn là Golang có VSCode extension chính thức của nó luôn, thế là mình hí hửng cài vào và bắt đầu code.

```main.go
package main

import "fmt"

func main() {
    fmt.Println("Hello world")
}
```

Như một thói quen, mình nhấn F5 cho VSCode chạy default build & run. Okay vẫn chạy tốt, nhưng hình như có con bug nhỏ nhoi nào đấy.

![](https://images.viblo.asia/fbaa0464-5871-4859-a84c-76badbde5c1e.png)

Google thêm một lúc, ồ, hóa ra do Go yêu cầu phải tạo **module** trong thư mục code. Mình tiếp tục gõ lệnh sau.

```shell
# Tạo module có tên main
go mod init main
```

Xong bước trên, một file `go.mod` được tạo ra. Chạy lại chương trình thì mọi thứ đã ổn. Ơ thế thì vấn đề thực sự là gì?

## Cơ mà có mỗi một hàm `main()`

Kinh nghiệm học code của mình như sau, và chính cái cách làm của mình lần này lại không hoạt động với Go.

> Mỗi bài học thì sẽ code thành một file ví dụ riêng.
> 
> Ví dụ `hello-world.go`, `variable.go`, `function.go`,...
> 
> Như vậy sẽ tiện cho sau này coi lại cũng nhanh hơn.

Sẵn show luôn cấu trúc tổ chức của project mình đang học Go luôn.

![](https://images.viblo.asia/3cafe4d3-9107-4a49-95d0-0b18b0bd6abc.png)

Sự khó chịu khi code Go như trên là do 3 nguyên nhân chính:

* Go bắt buộc phải có module để chạy (hoặc chạy được từng file mà phải gõ command)
* Module phải khai báo ở root directory, không tạo nhiều module trong thư mục con được
* Mỗi module có duy nhất một hàm `main()`

Do đó, khi nhấn F5 để run thì chỉ có mỗi hàm `main()` được chạy. Thế thì những đoạn code ở các file khác thì sao?

Lúc đó mình khá là bực mình rồi, giải pháp tạm thời là viết code lại như sau.

```main.go
package main

import "fmt"

// Không cần import các file .go khác
// Do cùng thư mục là auto có được rồi

func main() {
    // Phải toggle comment từng function để chạy
    hello_world()
    variable()
    function()
    ...
}
```

## Giải pháp đơn giản cho vấn đề trên

Mình lại tiếp tục hành trình google, và cuối cùng mình đã tìm ra cách giải quyết cực kỳ đơn giản.

> Khi nhấn F5 thì VSCode mặc định sẽ chạy cả một module.
> 
> Do đó, cần tìm cách chỉnh lại sao đó cho VSCode chạy lệnh `go run file.go` là được.

Okay mình đã biết VSCode sử dụng file `.vscode/launch.json` để config các Run command. Cơ mà biết đến thế rồi, google cả buổi, bằng tiếng Anh hẳn hoi vẫn không ra. Và rồi may mắn thay mình đã gặp được cách giải quyết.

```.vscode/launch.json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch Package",
            "type": "go",
            "request": "launch",
            "mode": "auto",
            "program": "${file}"
        }
    ]
}
```

Chỉ cần đổi chỗ `program` từ `${fileDirname}` thành `${file}` là được. Mình cũng chưa từng để ý chỗ đấy, ai dè VSCode nó chạy cả thư mục hiện tại `$fileDirname` thay vì file mình đang mở `$file`.

Okay xong, vấn đề khó chịu đã được giải quyết theo một cách đơn giản đến bất ngờ. Từ nay code Go cũng dễ hơn, chỉ cần nhấn F5 phát là nó chạy file mình đang mở luôn.

---

Okay bài viết hết rồi, cảm ơn các bạn đã đọc đến đây nhé :heart_eyes: Mặc dù ngôn từ bài viết có hơi "tưng tửng" so với bình thường do tác giả tới tháng :joy: cơ mà mình vẫn hi vọng các bạn sẽ học được gì đó qua bài viết của mềnh.

À và đừng ngại nhấn upvote cho tớ thêm động lực nếu bài viết hữu ích với các bạn nhé. Chào thân ái và quyết thắng :heart:
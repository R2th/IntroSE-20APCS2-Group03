## Goroutines là gì ?
Goroutines có thể được coi là một luồng nhẹ có thể thực thi độc lập riêng biệt và có thể thực thi đồng thời với các goroutines khác. Goroutines có thể là một function hoặc là method và được quản lý bới GO runtime. Hiểu đơn giản từ goroutines có thể giúp các function của bạn chạy trên luồng riêng, xử lý công việc đồng thời với nhau.
## Start goroutines
Golang định nghĩa keyword `go` cho  1 goroutines. Việc đơn giản là bạn chỉ cần thêm nó vào trước function hay method được gọi . Function hay method đó sẽ được thực thi trong goroutines tức là 1 luồng xử lý khác. Lưu ý là function hay method là goroutines mà khi các bạn gọi function hay method với keyword `go` Golang sẽ thực thi nó ở goroutines

Dưới đây là sự khác nhau giữa 1 việc thực thi bình thường và thực thi với goroutines
### Run function bình thường
```
statement1
start()
statement2
```
Trình tự xử lý sẽ là như sau:

1. Đầu tiên statement1 sẽ được thực thi
2. Tiếp đến function start() được gọi
3. Sau khi start() finish statement

### Với goroutines
```
statement1
go start()
statement2
```
Việc thực thi sẽ diễn ra như sau
1. Đầu tiên statement1 sẽ được thực thi
2. Function start() sẽ được gọi như là 1 goroutines - thực thi không đồng bộ
3. Statement2 thực thi ngay lập tức sau statement1 mà không đợi function start() finish. Tức function start() sẽ được xử lý ở 1 luồng riêng trong khi phần còn lại của chương trình vẫn tiếp tục

### Thử với 1 ví dụ nhỏ nhé
```
package main

import (
    "fmt"
    "time"
)

func main() {
    go start()
    fmt.Println("Started")
    time.Sleep(1 * time.Second)
    fmt.Println("Finished")
}

func start() {
    fmt.Println("In Goroutine")
}
```

Ta có kết quả như sau 
```
Started
In Goroutine
Finished
```
Như đã đề cập khi start() được gọi bằng goroutines, chương trình vẫn tiếp tục được thực thi, "Started" được in ra, tôi settimeout để chờ cho goroutine được thực thi trước khi hàm main kết thúc. Nếu như chúng ta bỏ timout chườn trình sẽ in ra
```
Started
Finished
```
Main goroutine đã kết thúc trước trước khi start() được lên lịch để chạy. Sau đây ta sẽ nói một chút về main goroutine
## Main goroutine
Main function trong main package là main goroutine. Tất cả các goroutines đều được bắt đầu từ main goroutine . Những goroutines này sau đó có thể bắt đầu nhiều goroutine khác

Main goroutine đại diện cho main program, main goroutine kết thúc có nghĩa là chương trình kết thúc

Goroutines không có parent hoặc children. Khi bạn bắt đầu 1 goroutine, nó chỉ thực thi cùng với tất cả các goroutines đang chạy khác. Mỗi goroutine chỉ thoát khi hàm của nó trả về. Ngoại lệ duy nhất cho điều đó là tất cả các goroutines thoát ra khi main goroutine thoát.

Xem thử 1 ví dụ nhé
```
package main

import (
    "fmt"
    "time"
)

func main() {
    go start()
    fmt.Println("Started")
    time.Sleep(1 * time.Second)
    fmt.Println("Finished")
}

func start() {
    go start2()
    fmt.Println("In Goroutine")
}
func start2() {
    fmt.Println("In Goroutine2")
}
```
Output:
```
Started
In Goroutine
In Goroutine2
Finished
```
Ta có thể thấy start() in "In Goroutine" rồi kết thúc, sau đó goroutine start2() thực thi và in ra "In Goroutine2"
Nó cho thấy rằng các goroutines không có parent hoặc children và chúng tồn tại như một sự thực thi độc lập.

## Tạo multi goroutines
```
package main

import (
    "fmt"
    "time"
)

func execute(id int) {
    fmt.Printf("id: %d\n", id)
}

func main() {
    fmt.Println("Started")
    for i := 0; i < 10; i++ {
        go execute(i)
    }
    time.Sleep(time.Second * 2)
    fmt.Println("Finished")
}
```
Output:
```
Started
id: 4
id: 9
id: 1
id: 0
id: 8
id: 2
id: 6
id: 3
id: 7
id: 5
Finished
```
Ta có thể thấy vòng lặp tạo ra 10 goroutines và chúng hoạt động độc lập với nhau. Cứ mỗi lần chạy ta lại có kết quả khác nhau vì goroutines chạy đồng thời và không xác định cái nào sẽ thực hiẹn trước
## Anonymous goroutines
Anonymous functions có thể sử dụng được với goroutine
```
go func(){
   //body
}(args..)
```
Nó không khác với 1 function bình thường khi sử dụng goroutine

Dưới đây là 1 ví dụ
```
package main

import (
    "fmt"
    "time"
)

func main() {
    go func() {
        fmt.Println("In Goroutine")
    }()

    fmt.Println("Started")
    time.Sleep(1 * time.Second)
    fmt.Println("Finished")
}
```
Output:
```
Started
In Goroutine
Finished
```
> Timeout chỉ để minh họa và không bao giờ được sử dụng trong môi trường production
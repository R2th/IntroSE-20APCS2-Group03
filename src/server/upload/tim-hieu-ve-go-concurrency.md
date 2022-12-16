Bài viết này tôi sẽ trình bày về concurrency in go.

### Goroutine

goroutine hiểu một cách đơn giản là 1 function có thể chạy đồng thời với các function khác.  
goroutine được thực thi bằng cách gọi function sau từ khoá `go`. Ví dụ `go subtract(a, b)`

```
package main
import "fmt"
    
func printValue() {
	for i:=0; i<5; i++ {
		fmt.Println("In goroutine")
	}
}

func main() {
	go printValue()
    
	for i:=0; i<5; i++ {
		fmt.Println("In main func")
	}
}
```

Output của program trên sẽ như sau

```
In main
In main
In main
In main
In main
```

Ở ví dụ trên, ta có thể thấy `In goroutine` không được in ra.  
Lý do là bởi function main sẽ không đợi function `printValue` thực hiện trước,
thay vào đó chương trình sẽ thực thi các dòng lệnh trong function `main` 
và chỉ khi gặp những tác vụ cần thời gian để thực thi (ví dụ khi một goroutine đang chờ data để xử lý)  
thì lúc đó `printValue` sẽ được thực thi.

Và với ví dụ trên thì `main` đã kết thúc trước khi function `printValue` được thực thi.  
Với ví dụ dưới đây, ta sẽ sử dụng `time.Sleep` để `main` phải chờ data để xử lý,
lúc này `printValue` sẽ được thực thi.

```
package main
import "fmt"
import "time"
    
func printValue() {
	for i:=0; i<5; i++ {
		time.Sleep(1 * time.Second)
		fmt.Println("In goroutine")
	}
}

func main() {
	go printValue()
    
	for i:=0; i<5; i++ {
		time.Sleep(2 * time.Second)
		fmt.Println("In main")
	}
}
```
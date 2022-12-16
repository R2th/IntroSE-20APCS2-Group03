![image.png](https://images.viblo.asia/90449bfa-3ce2-43b9-addf-872a04b97191.png)
Go không có phương thức ~~try/catch~~ như thông thường để xử lý lỗi, thay vào đó lỗi sẽ được trả về như một giá trị.

Chúng ta đều hiểu rằng lỗi là khi có gì đó bất thưởng xảy ra trong trường trình, nhưng trong Go thì lỗi mang một ý nghĩa khác. Lỗi với Go chỉ là một giá trị hàm có thể trả về nếu có điều gì đó không mong đợi xảy ra.

*error* được tích hợp sẵn trong Go với giá trị mặc định là *nil*. Có một cách để xử lý lỗi là trả nó về như giá trị cuối cùng của hàm gọi và kiểm tra xem nó có *nil* hay không.

```
val, err := abcFunction( args... );
if err != nil {
  // Xử lý lỗi
} else {
  // Thành công
}
```
### error
Cùng tìm hiểu sau hơn về kiểu dữ liệu error ta có: đây là một kiểu tích hợp sẵn nhưng thực tế nó là một interface có sẵn sử dụng ở mọi nơi trong chương trình Go và nó thực thi phương thức Error() trả về một thông báo lỗi dạng string.
```
tpye error interface{
    Error() string
}
```
Do đó chúng ta có thể định nghĩa các kiểu dữ liệu lỗi bằng cách thực thi cho error interface. Ví dụ:
```
package main
 
import "fmt"
 
// Tạo struct
type MyError struct{}
 
// struct thực thi phương thức `Error`
func (myErr *MyError) Error() string {
	return "Something unexpected happend!"
}
 
func main() {
 
	// tạo error
	myErr := &MyError{}
 
	// in ra thông báo lỗi
	fmt.Println(myErr)
}
```

Trong ví dụ trên, ta đã tạo struct MyError, cung cấp thực thi code cho phương thức Error. Phương thức này trả về một string. Do đó struct MyError đã thực thi code cho interface error.

Để tạo một error dù đơn giản thì chúng ta cũng phải định nghĩa một struct và tạo một thực thi code cho phương thức Error(). Để tránh điều này, Go cung cấp một package error được tích hợp sẵn và public, đó là hàm New. Hàm này yêu cầu một thông báo lỗi và trả về error.
Ví dụ về hàm New:

```

package main
 
import "fmt"
import "errors"
 
func main() {
 
	// tạo error
	myErr := errors.New("Something unexpected happend!")
 
	// in ra thông báo lỗi
	fmt.Println(myErr)
}
```

Chúng ta thấy ham New yêu cầu string là thông báo lỗi và trả về một error. Vậy myError là kiểu gì ? Ta sẽ viết lại ví dụ bên trên và thử in kiểu trả về:
![image.png](https://images.viblo.asia/1e61fef1-8bd2-4adc-8957-9cb4ee16e51b.png)

Kết quả trả về ta có:

![image.png](https://images.viblo.asia/97cd4144-574b-4e50-abb9-f05c3bd098cf.png)

Như vậy kiểu dữ liệu của myErr là * errors.errorString, nó là một con trỏ cho errors.errorString.

### Panic
Panic tương tự như việc đưa ra một Exception. Nói cách khác, một Panic là một Exception trong Go. Panice được gây ra bởi một lỗi trong lúc chạy và gọi thẳng đến hàm Panic trong Go.

Cách xử lý phổ biến khi gặp điều kiện bất thường trong Go là sử dụng errors là dủ cho hầu hết các trường hợp bất thường phát sinh.

Nhưng trong một số trường hợp chương trình không thể tiếp tục chạy bình thường khi lỗi. Torng trường hợp này chúng ta sử dụng Panic để shutdown chương trình. Khi một hàm gặp Panic, nó lập tức dùng xử lý, hàm bất kỳ được defer sẽ chạy và kiểm soát trả về cho phía gọi. Tiến trình này tiếp tục cho tới khi tất cả các hàm của goroutine hiện tại hoàn toàn được trả về, tại thời điểm đó chương trình in ra thông báo Panic, cùng với thông tin stack lỗi và kế thúc.

Khi một Panic được gọi xử lý thông thường của goroutine sẽ tạm dừng ngay lạp tức:
Khi một chương trình bị panic, nó sẽ ngay lập tức giải phóng stack gọi
Điều này sẽ tiếp tục cho tới khi chương trình lỗi và in ra thông tin stack lỗi hoặc tới khi hàm recover được gọi.
**Định nghĩa Panic**
```
func panic(interface{})
```
Các tham số được truyền cho Panic sẽ được in ra khi chương trình chấm dứt.
Để hiểu rõ hơn ta sẽ có ví dụ:
![image.png](https://images.viblo.asia/a37a21da-fc51-4a3f-9137-3c4a0bd33a65.png)

Bên trên là chương trình đơn giản dùng để in ra tên đầy đủ của một người. Hàm fullName sẽ in ra tên đầy đủ cửa một người. Hàm này kiểm tra xem liệu con trỏ firstName và lastName có nil hay không. Nếu nil thì hàm sẽ gọi panic với thông báo đã được set sẵn. Thông báo lỗi này sẽ được in ra khi chương trình kết thúc.

Truyền vào WAN cho firstName, còn nil cho lastName. Do giá trị truyền vòa thỏa mãn điều kiện nil nên sẽ panic. Khi panic xảy ra, chương trình chấm dứt và in ra tham số được truyền cho panic kèm với thông tin stack lỗi.
### Recover from panic
Recover là hàm được tích hợp sẵn trong Go và sử dụng để lấy lại kiểm soát của goroutine đang panic.
Định nghĩa recover:
```
recover() interface{}
```

Hàm recover trả về giá trị được truyền cho hàm panic và không bị Side Effect. Nghĩa là nếu goroutine không bị panic, hàm recover sẽ trả về nil. Do đó việc kiểm tra giá trị trả về của recover có phải là nil hay không là cách tốt nhất để biết được rằng chương trình có bị panic không. Hãy cùng xem ví dụ sau:

```
package main

import (
	"fmt"
)

func defFoo() {
	fmt.Println("defFoo() started")

	if r := recover(); r != nil {
		fmt.Println("This program is packing with value", r)
	}

	fmt.Println("defFoo() done")
}

func normMain() {
	fmt.Println("normMain() started")

	defer defFoo() // defer defFoo call

	panic("HELP") // panic here

}

func main() {
	fmt.Println("main() started")

	normMain() // normal call

	fmt.Println("main() done")
}
```

Ta có kết quả:

Hàm normMain gọi bên trong hàm main() mà thực hiện defer khi gọi hàm defFoo(). Sau đó chương trình bị panic nên không có câu lệnh nào sau đấy được thực hiện, sau đó chương trình gọi hàm defer defFoo(), trong hàm này chúng ta có xử lý recover() để kiểm tra chương trình panic hay không. Do chương trình bị panic nên chúng ta in ra thông tin stack lỗi của Panic

![image.png](https://images.viblo.asia/5c0d132c-cd0a-4b8b-a432-80b8bb3ed065.png)

### Kết
Việc nhận biết lỗi và handle các lỗi đó một cách thông minh và tinh tế sẽ giúp cho việc debug cũng như tránh các biến cố xảy ra, do đó chúng ta không nên bỏ qua lỗi mà hãy nên xử lý chúng. Hy vọng bạn cảm thấy hữu ích với bài viết, have a nice day <3

Bài viết tham khảo:

Go – Xử lý lỗi: https://vngeeks.com/go-xu-ly-loi/
Go – Panic và recover: https://vngeeks.com/go-panic-va-recover/
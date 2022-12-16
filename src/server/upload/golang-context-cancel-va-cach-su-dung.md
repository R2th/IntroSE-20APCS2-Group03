Context là một phần rất hay trong golang mà lập trình viên về golang cần biết, hôm nay mình sẽ nói về Cancel trong context.


-----


### **Context WithCancel**
Cancel là copy ra một context mới từ context cha trước đó kèm theo New Channel Done, nó được gửi thông tin đến rất nhiều tiến trình cũng như operation khác nhau. Cancel là một tính hiệu (signals) để huỷ tiến trình đang chạy ở một nơi khác(một function khác). 

**Tại sao chúng ta cần sử dụng Cancel:**
 Khi user gửi request từ client đến server nếu không có gì xảy ra khác thường thì sẽ là thế này:
 ![](https://images.viblo.asia/a454ba95-52e6-47f6-8948-7d78fcf57a90.png)
![](https://images.viblo.asia/85828dad-468e-478f-90af-86969e2f9312.png)

Trong trường hợp nếu user đang gửi request mà cancel thì điều gì xảy ra:
![](https://images.viblo.asia/8934a083-c544-461d-a802-1aa55fc319df.png)
nếu đã cancel mà vẫn trả về data thì là việc dư thừa không cần thiết, cũng như tốn resources để xử lý.

**Hướng Giải Quyết**

Để giải quyết vấn đề nầy thì cancel ra đời, mục đích là để stop ngay lập tức các operation khác,  không tốn tài nguyên sử lý.
![](https://images.viblo.asia/04b7203d-1387-45f8-91c6-d72caad1b114.png)

### **Code Demo**
Ví Dụ 1:

```
package main

import (
	"context"
	"fmt"
)

func main() {

	taskfn := func(ctx context.Context) <-chan int {
		dst := make(chan int)
		n := 1
		go func() {
			for {
				select {
				case <-ctx.Done():
					fmt.Println("exe cannel")
					return // returning not to leak the goroutine
				case dst <- n:
					n++
				}
			}
		}()
		return dst
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel() // cancel when we are finished consuming integers
	for n := range taskfn(ctx) {
		fmt.Println(n)
		if n == 5 {
			break
		}
	}

}
```
> 1
> 2
> 3
> 4
> 5

Ví Dụ 2:

```
package main

import (
	"context"
	"errors"
	"fmt"
	"time"
)


func func1(ctx context.Context) error {
	time.Sleep(100 * time.Millisecond)
	return errors.New("failed")
}

func func2(ctx context.Context) {
	fmt.Println("exe operation2")
	select {
	case <-time.After(50 * time.Millisecond):
		fmt.Println("done")
	case <-ctx.Done():
		fmt.Println("halted operation2")
	}
}

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	go func() {
		err := func1(ctx)
		fmt.Println("operation1 err:", err)
		if err != nil {
			cancel()
		}
	}()

	func2(ctx)
}

```
=> ở phần ví dụ này thì cancel() sẽ không được execute vì select case nó chỉ sleep 50 Millisecond.
kết quả.
> exe operation2

> done


tiếp theo đổi từ 50 lên 500 millisecond thì function cancel() sẽ được thực hiện.
```
case <-time.After(50 * time.Millisecond):
```
=> kết quả thế này: 
> exe operation2
 
> operation1 err: failed

> halted operation2

Cảm ơn nhé các bạn.

Source: 
https://pkg.go.dev/context#WithCancel

Tks anh,em: https://t.me/OpenDevGolang join group này nếu anh em có câu hỏi.
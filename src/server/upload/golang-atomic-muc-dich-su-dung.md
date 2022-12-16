### **Khái Niệm**
Atomic được sử dụng để chia sẻ sữ liệu của các biến trên nhiều goroutine được chạy đồng thời. Khi bạn chạy nhiều goroutine mà không sử dụng atomic thì giá trị sẽ không được như mong muốn.

-----

### **Trường Hợp Sử Dụng**
* Nhiều Goroutine cùng access đến một biến để tăng hoặc giảm giá trị.
* Dùng biến để kiểm tra để chặn những process tiếp theo, ví dụ: chúng ta có 3 goroutine để thực hiện việc lấy thông tin user, nhưng logic là chỉ muốn 2 trong 3 goroutine được đi tiếp còn 1 goroutine bị từ chối thừ sử dụng *atomic* là một cách.

### **Code Mẫu**

VíDụ1:
```
package main

import (
	"fmt"
	"sync"
)

func main() {
	var i int32
	var wg sync.WaitGroup
	wg.Add(3)
	go Process(&i, &wg)
	go Process(&i, &wg)
	go Process(&i, &wg)
	wg.Wait()
	fmt.Println("i:", i)
}

func Process(variable *int32, wg *sync.WaitGroup) {
	defer wg.Done()
	for i := 0; i < 2000; i++ {
		*variable++
	}
}
```

=> Với việc code không dùng *atomic* thì khi start service, sẽ có trường hợp ra đúng 6000, một vài trường hợp giá trị nó sẽ không đúng 6000.

[RUN](https://go.dev/play/p/sgWZCxTt98H)

Ví Dụ 2:
```
package main

import (
	"fmt"
	"sync"
	"sync/atomic"
)

func main() {
	var i int32
	var wg sync.WaitGroup
	wg.Add(3)
	go Process(&i, &wg)
	go Process(&i, &wg)
	go Process(&i, &wg)
	wg.Wait()
	fmt.Println("i:", i)
}

func Process(variable *int32, wg *sync.WaitGroup) {
	defer wg.Done()
	for i := 0; i < 2000; i++ {
		atomic.AddInt32(variable, 1)
	}
}
```

=> Với việc dùng *atomic* thì khi start service, thì luôn luôn là giá trị sẽ là *6000*

[RUN](https://go.dev/play/p/uWge1Rg-1JB)

Tks anh,em: https://t.me/OpenDevGolang join group này nếu anh em có câu hỏi.
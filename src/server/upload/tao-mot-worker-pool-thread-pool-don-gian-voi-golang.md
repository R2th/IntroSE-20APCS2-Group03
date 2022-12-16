# Worker Pool (Thread Pool)
Bài này mình giới thiệu thêm một khả năng chứng minh sức mạnh của Golang và khiến mình thích thú hơn với ngôn ngữ đầy rẫy kí hiệu * & này. Đó là về worker pool.

Nói qua về Worker Pool 
Worker Pool qua tên gọi ta có thể hình dung được công dụng của nó là tạo ra một nơi chứa gọi là pool, để chứa các worker của chúng ta. Mục đích là để ta có thể quản lý các worker, quản lý việc phân phối task và đặc biệt là kiểm soát được những tài nguyên dùng chung giữa các worker. Ví dụ như các worker chạy đồng thời và cùng truy xuất vào 1 file hoặc dùng chung một API.

![](https://images.viblo.asia/021f38af-79c3-46eb-9895-1bff980ee5d0.png)

Việc xây dựng một worker pool trong Go  dễ dàng được thực hiện bởi dùng Channel và ta chỉ cần vài dòng code là đủ rồi cho một ví dụ đơn giản rồi

```go
package main

import (
	"fmt"
	"time"
)

func worker(id int, jobs <-chan int, results chan<- int) {
	for j := range jobs {
		fmt.Println("worker", id, "processing job", j)
		time.Sleep(time.Second)
		results <- j * 2
	}
}

func main() {
	jobs := make(chan int, 100)
	results := make(chan int, 100)

	for w := 1; w <= 3; w++ {
		go worker(w, jobs, results)
	}

	for j := 1; j <= 9; j++ {
		jobs <- j
	}
	close(jobs)

	for a := 1; a <= 9; a++ {
		<-results
	}
}
```
Trong ví dụ trên, có 3 worker được start và có 9 work item (9 job) được đẩy vào jobs channel. Mỗi worker sẽ bốc một jobs ra xử lý lệnh Println và đẩy kết quả vào results channel. 

# Kiểm tra Error
Tiếp với ví dụ ở trên nhưng ta thêm vào 1 channel errors để kiểm tra lỗi như mẫu sau
```go
errors := make(chan error, 100)

...

select {
case err := <-errors:
    fmt.Println("finished with error:", err.Error())
default:
}
```
Thay đổi một chút ví dụ trên, ta thêm 1 trường hợp sẽ trả kết quả ra errors thay vì results channel. Và để chờ những worker hoàn tất công việc rồi kiểm tra errors channel để in ra kết quả lỗi ta dùng **sync.waitGroup**.

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

func worker(id int, wg *sync.WaitGroup, jobs <-chan int, results chan<- int, errors chan<- error) {
	for j := range jobs {
		fmt.Println("worker", id, "processing job", j)
		time.Sleep(time.Second)

		if j%2 == 0 {
			results <- j * 2
		} else {
			errors <- fmt.Errorf("error on job %v", j)
		}
		wg.Done()
	}
}

func main() {
	jobs := make(chan int, 100)
	results := make(chan int, 100)
	errors := make(chan error, 100)

	var wg sync.WaitGroup
	for w := 1; w <= 3; w++ {
		go worker(w, &wg, jobs, results, errors)
	}

	for j := 1; j <= 9; j++ {
		jobs <- j
		wg.Add(1)
	}
	close(jobs)

	wg.Wait()

	select {
	case err := <-errors:
		fmt.Println("finished with error:", err.Error())
	default:
	}
}
```
Lưu ý
Trong ví dụ trên, sẽ có thể xảy ra một trường hợp khi error channel nhỏ hơn số work item gây ra lỗi, khi đó worker sẽ bị block. Nó xảy vì chúng ta gây ra 1 deadlock ở đây.
Bạn có thể dễ dàng tái hiện bằng cách thay đổi size của errors channel
```go
errors := make(chan error, 1)
```
Và sau khi run chúng ta sẽ nhận được thông báo như sau :
```go
$ go run worker_pool_err.go
worker 3 processing job 1
worker 1 processing job 2
worker 2 processing job 3
worker 2 processing job 5
worker 1 processing job 4
worker 1 processing job 6
worker 1 processing job 7
fatal error: all goroutines are asleep - deadlock!
```
# Xây dựng một worker pool hoàn chỉnh 

Đặt tất cả những code ta mới dùng trong ví dụ bên nhau. Thay vì jobs channel chỉ để chứa 1 kiểu dữ liệu đơn giản là int thì giờ ta xây dựng 1 model task, để chứa các task truyền qua channel tới worker.

```go
import (
	"sync"
)


type Pool struct {
	Tasks []*Task

	concurrency int
	tasksChan   chan *Task
	wg          sync.WaitGroup
}


func NewPool(tasks []*Task, concurrency int) *Pool {
	return &Pool{
		Tasks:       tasks,
		concurrency: concurrency,
		tasksChan:   make(chan *Task),
	}
}


func (p *Pool) Run() {
	for i := 0; i < p.concurrency; i++ {
		go p.work()
	}

	p.wg.Add(len(p.Tasks))
	for _, task := range p.Tasks {
		p.tasksChan <- task
	}


	close(p.tasksChan)

	p.wg.Wait()
}


func (p *Pool) work() {
	for task := range p.tasksChan {
		task.Run(&p.wg)
	}
}
```
xây dựng một Task model đơn giản như sau

```go
type Task struct {

	Err error

	f func() error
}


func NewTask(f func() error) *Task {
	return &Task{f: f}
}


func (t *Task) Run(wg *sync.WaitGroup) {
	t.Err = t.f()
	wg.Done()
}
```
Vậy là xong, ta có thể chạy thử nó như sau

```go
tasks := []*Task{
    NewTask(func() error { return nil }),
    NewTask(func() error { return nil }),
    NewTask(func() error { return nil }),
}

p := pool.NewPool(tasks, conf.Concurrency)
p.Run()

var numErrors int
for _, task := range p.Tasks {
    if task.Err != nil {
        log.Error(task.Err)
        numErrors++
    }
    if numErrors >= 10 {
        log.Error("Too many errors.")
        break
    }
}
```
# Tổng kết
Các bạn có thể dễ dàng tự xây dựng một worker pool  bằng những gì đơn giản nhất từ Golang mà không cần import thêm bất gì package nào từ bên ngoài. 
Hiện tại có rất nhiều package trên Github để giúp ta giải quyết vấn đề này nhưng thật sự nó quá nhiều và khó mà lọc ra package phù hợp mình cần. Nên trong lúc research thì mình thấy ví dụ từ bài viết https://brandur.org/go-worker-pool là đơn giản nhất, cơ bản nhất để hiểu và giải quyết worker pool.
Hi vọng sẽ giúp ích được cho các bạn chút gì đó. Các bạn vẫn nên đọc lại link gốc nếu có gì không rõ do mình diễn giải lại.
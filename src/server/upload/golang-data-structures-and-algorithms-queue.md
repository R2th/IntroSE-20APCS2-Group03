## Giới thiệu
Series về cấu trúc dữ liệu và thuật toán sử dụng Golang. Ở bài này chúng ta sẽ tìm hiểu về Queue.

## Queue
Queue là một cấu trúc dữ liệu dạng First-in First-out (FIFO), nó giống như một hàng chờ nơi mà dữ liệu chỉ có thể được thêm vào ở cuối và lấy ra ở đầu,  như hình minh họa bên dưới.

![image.png](https://images.viblo.asia/0bba9fb8-ba65-407a-b95b-2f6a04ca1675.png)

Stack sẽ có các hàm như sau để ta có thể thêm, xóa và đọc phần tử bên trong nó:
+ enqueue: thêm phần tử vào cuối của queue.
+ dequeue: lấy phần tử ở đầu của queue.
+ front: đọc phần tử ở đầu của queue.
+ back: đọc phần tử ở cuối của queue.
+ length: kiểm tra số lượng phần tử trong queue.
+ clear: xóa toàn bộ phần tử trong queue.
+ print: in ra phần tử của queue.

## A Queue Implementation
Ta sẽ viết code để thực thi Queue bằng Golang, đầu tiên ta tạo một file tên là `queue.go` với đoạn code như sau:

```queue.go
package main

type Queue struct {
	data []interface{}
}

func main() {

}
```

Ta sẽ khai báo Queue với kiểu dữ liệu là struct. Bên trong nó sẽ có một thuộc tính là data []interface{} dùng để chứa phần tử của Queue. **Thuộc tính `data` trong Golang nó sẽ thuộc kiểu dữ liệu `slice`, nhưng để dễ dàng thì trong bài này mình sẽ gọi nó là mảng.**

Tiếp theo ta sẽ thêm vào hàm enqueue và dequeue cho nó.

```queue.go
package main

type Queue struct {
	data []interface{}
}

func (q *Queue) Enqueue(element interface{}) {
	q.data = append([]interface{}{element}, q.data...)
}

func (q *Queue) Dequeue() interface{} {
	length := len(q.data)

	if length > 0 {
		front := q.data[length-1]
		q.data = q.data[:length-1]

		return front
	}

	return nil
}

func main() {

}
```

Ở hàm `Enqueue()` ta sẽ thêm phần tử vào vị trí thứ 0 của thuộc tính `data` và đẩy các phần tử còn lại ra sau, vì trong Golang không có hàm nào có sẵn để làm được việc này, nên ta phải làm như sau, đầu tiên ta tạo mới một mảng rỗng và để phần tử vào nó.

```go
[]interface{}{element}
```

Ở trên là mảng với kiểu dữ liệu là `interface{}`, có nghĩa bất kì dữ liệu nào cũng có thể thêm vào mảng này được, có thể hiểu nó giống như kiểu `any` trong Typescript.

Sau đó ta dùng hàm `append()` để thêm toàn bộ dữ liệu của thuộc tính `data` vào đằng sau mảng `[]interface{}{element}`. Đây là cách ta thêm một phần tử vào vị trí thứ 0 của mảng và đẩy các phần tử còn lại ra sau.

Quay trở lại queue, hàm `Dequeue()` ta chỉ đơn giản lấy phần tử ở vị trí cuối cùng ra (ở đầu của queue) và gán lại thuộc tính `data` là mảng đã được xóa đi phần tử đó, sau đó ta trả về phần tử ta vừa lấy ra.

Tiếp theo ta sẽ thực hiện hàm `front` và `back`, cập nhật lại `queue.go`.

```queue.go
package main

type Queue struct {
	data []interface{}
}

...

func (q *Queue) Front() interface{} {
	length := len(q.data)

	if length > 0 {
		return q.data[length-1]
	}

	return nil
}

func (q *Queue) Back() interface{} {
	length := len(q.data)

	if length > 0 {
		return q.data[0]
	}

	return nil
}

func main() {

}
```

Hàm `Front()` ta làm tương tự hàm `Dequeue()`, chỉ là ta không có xóa phần tử đi. Còn hàm `Back()` ta chỉ đơn giản trả về phần tử thứ 0 của mảng (cuối của queue).

Kế tiếp ta làm hai hàm cuối là `length` và `clear`.

```queue.go
package main

type Queue struct {
	data []interface{}
}

...

func (q *Queue) Length() int {
	return len(q.data)
}

func (q *Queue) Clear() {
	q.data = []interface{}{}
}

func (q *Queue) Print() {
	fmt.Printf("Queue %+v\n", q.data)
}

func main() {

}
```

Hàm `Length()` đơn giản ta chỉ cần trả về chiều dài của queue.

Hàm `Clear()` ta sẽ gán thuộc tính data của queue lại thành rỗng.

Hàm `Print()` ta in ra các phần tử của queue.

Ok, vậy là ta đã code xong queue, giờ ta sử dụng nó thử nào.

```queue.go
package main

import "fmt"

type Queue struct {
	data []interface{}
}

func (q *Queue) Enqueue(element interface{}) {
	q.data = append([]interface{}{element}, q.data...)
}

func (q *Queue) Dequeue() interface{} {
	length := len(q.data)

	if length > 0 {
		front := q.data[length-1]
		q.data = q.data[:length-1]

		return front
	}

	return nil
}

func (q *Queue) Front() interface{} {
	length := len(q.data)

	if length > 0 {
		return q.data[length-1]
	}

	return nil
}

func (q *Queue) Back() interface{} {
	length := len(q.data)

	if length > 0 {
		return q.data[0]
	}

	return nil
}

func (q *Queue) Length() int {
	return len(q.data)
}

func (q *Queue) Clear() {
	q.data = []interface{}{}
}

func (q *Queue) Print() {
	fmt.Printf("Queue %+v\n", q.data)
}

func main() {
	queue := Queue{}
	queue.Enqueue("1: Hoàng Phúc International")
	queue.Enqueue("2: Kappa")
	queue.Enqueue("3: Ecko Unltd")
	queue.Enqueue("4: Superga")
	queue.Enqueue("5: Staple")

	queue.Print()
	fmt.Println()

	fmt.Println(queue.Dequeue())
	queue.Print()
	fmt.Println()

	fmt.Printf("Front %v\n", queue.Front())
	fmt.Printf("Back %v\n", queue.Back())
	queue.Print()
	fmt.Println()

	queue.Clear()
	fmt.Println(queue.Length())
	queue.Print()
}
```

Kết quả.

```bash
Queue [5: Staple 4: Superga 3: Ecko Unltd 2: Kappa 1: Hoàng Phúc International]

1: Hoàng Phúc International
Queue [5: Staple 4: Superga 3: Ecko Unltd 2: Kappa]

Front 2: Kappa
Back 5: Staple
Queue [5: Staple 4: Superga 3: Ecko Unltd 2: Kappa]

0
Queue []
```

Vậy là ta đã code xong Queue, vậy thằng Queue này được dùng để làm gì? Trong lập trình Queue giúp ta giải quyết rất vấn đề, mà cụ thể nhất là các vấn đề mà cần thời gian xử lý lâu và tuần tự. Ví dụ là ta có một API dùng để xử lý đơn hàng, đằng sau nó sẽ thực hiện rất nhiều tác vụ như tính toán tiền, xử lý tồn kho, đồng bộ tồn, gửi thông báo cho khách hàng, ... Nên thường ta sẽ không xử lý nhiều tác vụ như thế trong một API, mà khi user gọi API thì ta chỉ đơn giản là đẩy request đó vào Queue để xử lý sau.

Hoặc là dùng Queue để sort mảng, một kĩ thuật sort mà có thể sử dụng Queue là *radix sort*, thằng này tuy không phải là một kĩ thuật sort nhanh nhất nhưng ta có làm nó thử để xem Queue sẽ được sử dụng như thế nào trong *radix sort*.

## Radix Sort with Queues
Radix Sort là cách sort dữ liệu dựa theo cơ số, cách nó hoạt động giải thích đơn giản như sau:
1. Ta sẽ có một bảng để chứa các cơ số tương ứng, ví dụ nếu mảng ta có số từ 1 tới 99 thì ta sẽ có bảng từ 0 - 9.
2. Sắp xếp các số trong mảng vào bảng theo một cơ số cuối.
3. Tổng hợp lại mảng.
4. Sắp xếp các số trong mảng vào bảng theo các cơ số đầu.
5. Tổng hợp lại mảng, lúc này ta sẽ có mảng đã được sắp xếp theo thứ tự.

Minh họa ta có mảng như sau:

```bash
[15, 82, 56, 17, 62, 45, 42, 90, 93, 33, 75, 21]
```

Sắp xếp các số trong mảng vào bảng theo cơ số cuối ta sẽ được một bảng như sau:

```bash
Bin 0: [90]
Bin 1: [21]
Bin 2: [42 62 82]
Bin 3: [33 93]
Bin 4: []
Bin 5: [75 45 15]
Bin 6: [56]
Bin 7: [17]
Bin 8: []
Bin 9: []
```

Tổng hợp lại mảng từ bảng:

```bash
[90 21 82 62 42 93 33 15 45 75 56 17]
```

Sắp xếp các số trong mảng vào bảng theo các cơ số đầu ta sẽ được một bảng như sau:

```bash
Bin 0: []
Bin 1: [17 15]
Bin 2: [21]
Bin 3: [33]
Bin 4: [45 42]
Bin 5: [56]
Bin 6: [62]
Bin 7: [75]
Bin 8: [82]
Bin 9: [93 90]
```

Tổng hợp lại mảng từ bảng:

```bash
[15 17 21 33 42 45 56 62 75 82 90 93]
```

Như bạn thấy ta đã có một mảng đã được sắp xếp, giờ ta tiến hành code nào, để hiểu rõ hơn về *radix sort* thì các bạn đọc cuốn này nhé **Data Structures with C++ by Prentice Hall**. Tạo một file tên là `radixsort.go` nằm cùng thư mục với `queue.go`.

```radixsort.go
package main

import "fmt"

var RADIX_LENGTH = 10
```

Cập nhật hàm `queue.go`.

```queue.go
package main

import "fmt"

type Queue struct {
	data []interface{}
}

...

func main() {
	numbers := []int{15, 82, 56, 17, 62, 45, 42, 90, 93, 33, 75, 21}

	queues := make([]Queue, RADIX_LENGTH)
	for i := 0; i < RADIX_LENGTH; i++ {
		queues[i] = Queue{}
	}
}
```

Ta sẽ dùng Queue để làm bảng chứa các phần tử trong mảng của ta, vì mảng của ta chỉ có giá trị từ 1 tới 99 nên `RADIX_LENGTH` của ta sẽ có giá trị là 10 => mảng sẽ có index từ 0 tới 9.

```radixsort.go
package main

import "fmt"

var RADIX_LENGTH = 10

func PrintRadix(queues []Queue) {
	for i := 0; i < RADIX_LENGTH; i++ {
		fmt.Printf("Bin %d: %+v\n", i, queues[i].data)
	}
}

func Distribute(numbers []int, queues []Queue, digit int) {
	length := len(numbers)

	for i := 0; i < length; i++ {
		if digit == 1 {
			queues[numbers[i]%10].Enqueue(numbers[i])
		} else {
			queues[numbers[i]/10].Enqueue(numbers[i])
		}
	}
}

func Collect(numbers []int, queues []Queue) {
	i := 0
	for bin := 0; bin < RADIX_LENGTH; bin++ {
		for queues[bin].Length() != 0 {
			numbers[i] = queues[bin].Dequeue().(int)
			i++
		}
	}
}
```

Hàm `Distribute()` ta sẽ dùng để phân phối mảng tử của mảng vào bảng Queue, với giá trị `digit = 1` thì ta sẽ xếp theo cơ số cuối, ví dụ:

```
90 % 10 = 0 => xếp vào bin 0
23 % 10 = 3 => xếp vào bin 3
31 % 10 = 1 => xếp vào bin 1
33 % 10 = 3 => xếp vào bin 3
```

Cập nhật `queue.go`.

```queue.go
package main

import "fmt"

type Queue struct {
	data []interface{}
}

...

func main() {
	numbers := []int{15, 82, 56, 17, 62, 45, 42, 90, 93, 33, 75, 21}

	queues := make([]Queue, RADIX_LENGTH)
	for i := 0; i < RADIX_LENGTH; i++ {
		queues[i] = Queue{}
	}
    
    fmt.Println("Before radix sort: ")
	fmt.Println(numbers)
	fmt.Println()

	Distribute(numbers, queues, 1)
	PrintRadix(queues)
	Collect(numbers, queues)
	fmt.Println()

	fmt.Println("After radix with digit 1: ")
	fmt.Println(numbers)
	fmt.Println()
}
```

Chạy thử code.

```
go run queue.go radixsort.go
```

Kết quả.

```
Before radix sort: 
[15 82 56 17 62 45 42 90 93 33 75 21]

Bin 0: [90]
Bin 1: [21]
Bin 2: [42 62 82]
Bin 3: [33 93]
Bin 4: []
Bin 5: [75 45 15]
Bin 6: [56]
Bin 7: [17]
Bin 8: []
Bin 9: []

After radix with digit 1: 
[90 21 82 62 42 93 33 15 45 75 56 17]
```

Tiếp theo ta sẽ xếp mảng lại vào bản theo cơ số đầu.

```queue.go
package main

import "fmt"

type Queue struct {
	data []interface{}
}

...

func main() {
	numbers := []int{15, 82, 56, 17, 62, 45, 42, 90, 93, 33, 75, 21}

	queues := make([]Queue, RADIX_LENGTH)
	for i := 0; i < RADIX_LENGTH; i++ {
		queues[i] = Queue{}
	}

	fmt.Println("Before radix sort: ")
	fmt.Println(numbers)
	fmt.Println()

	Distribute(numbers, queues, 1)
	PrintRadix(queues)
	Collect(numbers, queues)
	fmt.Println()

	fmt.Println("After radix with digit 1: ")
	fmt.Println(numbers)
	fmt.Println()

	Distribute(numbers, queues, 10)
	PrintRadix(queues)
	Collect(numbers, queues)
	fmt.Println()

	fmt.Println("After radix sort: ")
	fmt.Println(numbers)
}
```

Sau khi ta phân phối phần tử lại vào bảng với cơ số đầu, ta sẽ được bảng như sau:

```bash
Bin 0: []
Bin 1: [17 15]
Bin 2: [21]
Bin 3: [33]
Bin 4: [45 42]
Bin 5: [56]
Bin 6: [62]
Bin 7: [75]
Bin 8: [82]
Bin 9: [93 90]
```

Tiếp theo ta chỉ đơn giản tổng hợp nó lại bằng hàm `Collect(numbers, queues)` thì ta sẽ có mảng đã được sắp xếp.

```bash
After radix sort: 
[15 17 21 33 42 45 56 62 75 82 90 93]
```

## Kết luận
Vậy là ta đã tìm hiểu xong cách viết Queue và cách sử dụng nó. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Team mình đã cải thiện website Hoàng Phúc từ 1 điểm Google lên 90 điểm như thế nào?

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Đây là bài viết mà mình để tiêu đề trước và hy vọng sẽ viết được bài này trong tương lai. Team công nghệ Hoàng Phúc của bọn mình được thành lập từ tháng 8 năm 2021, ban đầu chỉ có hai sếp, một bạn Backend và một bạn Front-end, mình là thành viên thứ 5 và sau đó team từ từ đã có nhiều thành viên hơn. Với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 40 điểm, và mục tiêu là 90 điểm, để đáp ứng được nhu cầu của nhiều khách hàng nhất có thể. Bọn mình làm được điều đó không phải vì kĩ thuật giỏi hay gì hết, mà là có những đồng đội mà sẵn sàng hỗ trợ nhau và sự dẫn dắt của hai sếp cực giỏi, những thành viên trong team bọn mình có thể không phải giỏi về chuyên môn kỹ thuật nhất nhưng chắc chắn là sẽ tạo ra được hiệu quả cao nhất. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tưởng tượng bạn là những người đầu tiên góp phần xây dựng cho một hệ thống lớn như thế. Hãy tham gia với bọn mình nhé.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).
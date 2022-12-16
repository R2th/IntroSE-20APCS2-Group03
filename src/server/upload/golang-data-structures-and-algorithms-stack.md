## Giới thiệu
Series về cấu trúc dữ liệu và thuật toán sử dụng Golang. Ở bài này chúng ta sẽ tìm hiểu về Stack.

## Stack
Stack là một cấu trúc dữ liệu dạng Last-In First-Out (LIFO), nó giống như một ngăn xếp nơi mà dữ liệu chỉ có thể được thêm vào hoặc xóa đi từ đỉnh (top), như hình minh họa bên dưới.

![image.png](https://images.viblo.asia/18843430-c86a-48ee-b186-2f71ea624adc.png)

Stack sẽ có các hàm như sau để ta có thể thêm, xóa và đọc phần tử (element) bên trong nó:
+ push: thêm phần tử ở đỉnh của stack.
+ pop: xóa phần tử ở đỉnh của stack.
+ peek: không giống như pop sẽ xóa phần tử ở đỉnh của stack, peek chỉ đọc phần tử ở đỉnh chứ không xóa. 
+ clear: xóa toàn bộ phần tử bên trong stack.
+ length: kiểm tra số lượng phần tử bên trong stack.

## A Stack Implementation
Ta sẽ viết code để thực thi Stack bằng Golang, đầu tiên ta tạo một file tên là `stack.go` với đoạn code như sau:

```stack.go
package main

type Stack struct {
	data []interface{}
	top  int
}

func main() {

}
```

Ta sẽ khai báo Stack với kiểu dữ liệu là `struct`. Bên trong nó sẽ có hai thuộc tính là `data []interface{}` dùng để chứa phần tử của Stack, và `top int` dùng để đánh dấu vị trí đỉnh của Stack.

Tiếp theo ta sẽ thực hiện hàm `push` và `pop` cho nó.

```stack.go
package main

type Stack struct {
	data []interface{}
	top  int
}

func (s *Stack) Push(element interface{}) {
	s.top++
	s.data = append(s.data, element)
}

func (s *Stack) Pop() interface{} {
	if len(s.data) > 0 {
		s.top--
		last := s.data[s.top]
		s.data = s.data[:s.top]

		return last
	}

	return nil
}

func main() {

}
```

Hàm `Push(element interface{})` sẽ nhận vào một phần tử, ở hàm này đầu tiên ta sẽ tăng giá trị của thuộc tính `top` lên, sau đó ta sẽ đẩy phần tử đó vào cuối của `data`.

Hàm `Pop()` sẽ không có phần tử nào được truyền vào nhưng nó sẽ trả về một phần tử, ở hàm này đầu tiên ta kiểm tra mảng `data` của Stack có dữ liệu hay chưa, nếu chưa thì ta trả về `nil`, nếu có rồi thì ta sẽ giảm thuộc tính `top` đi. Sau đó ta gán giá trị cuối cùng vào biến last, và gán lại thuộc tính `data` của Stack mà đã xóa phần tử cuối của thuộc tính `data` đi.

Tiếp theo ta sẽ thực hiện hàm `peek` và `clear` và `length`.

```stack.go
package main

type Stack struct {
	data []interface{}
	top  int
}

func (s *Stack) Push(element interface{}) {
	s.top++
	s.data = append(s.data, element)
}

func (s *Stack) Pop() interface{} {
	if len(s.data) > 0 {
		s.top--
		last := s.data[s.top]
		s.data = s.data[:s.top]

		return last
	}

	return nil
}

func (s *Stack) Peek() interface{} {
	if len(s.data) > 0 {
		return s.data[s.top-1]
	}

	return nil
}

func (s *Stack) Clear() {
    s.top  = 0
	s.data = []interface{}{}
}

func (s *Stack) Length() int {
	return s.top
}

func main() {

}

```

Hàm `Peek()` tương tự hàm `Pop()`, chỉ là ta sẽ không xóa phần tử ở cuối đi.

Hàm `Clear()` ta sẽ gán thuộc tính `top` lại bằng 0 và thuộc tính `data` của Stack lại thành rỗng.

Hàm `Length()` đơn giản ta chỉ cần trả về thuộc tính `top` của Stack.

Ok, vậy là ta đã code xong Stack, giờ ta sử dụng nó thử nào.

```stack.go
package main

....

func main() {
	stack := Stack{}
	stack.Push("Hoàng Phúc International")
	stack.Push("Kappa")
	stack.Push("Ecko Unltd")
	stack.Push("Superga")
	stack.Push("Staple")

	fmt.Printf("length %d\n", stack.Length())
	fmt.Println()

	fmt.Printf("length %s\n", stack.Pop())
	fmt.Printf("length after pop %d\n", stack.Length())
	fmt.Println()

	fmt.Printf("length %s\n", stack.Peek())
	fmt.Printf("length after peek %d\n", stack.Length())
	fmt.Println()

	stack.Clear()
	fmt.Printf("length %d\n", stack.Length())
}
```

Kết quả.

```bash
length 5

length Staple
length after pop 4

length Superga
length after peek 4

length 0
```

Vậy là ta đã code xong Stack, nhưng thằng này nó được dùng để làm gì? Có một số bài toán mà Stack là kiểu dữ liệu hoàn hảo để giải quyết các bài toàn đó. Ví dụ sau đây là một bài toàn ta có thể dùng Stack.

## Multiple Base Conversions
Ở bài toán này, ta sẽ tìm hiểu cách chuyển đổi một số từ dạng thập phân sang dạng khác, như là chuyển một số từ dạng thập phân sang dạng nhị phân (decimal to binary). Ví dụ ta có số n và ta muốn chuyển nó sang dạng m, ta sẽ thực hiện chuyển đổi nó như sau:
1. Thực hiện chia lấy phần dư của số n và dạng m (n % m), sau đó push số dư đó vào stack. Ví dụ ta có n = 4 và muốn chuyển nó sang dạng binary (m = 2), ta chia lấy phần dư `4 % 2 = 0`, push số 0 vào stack.
2. Gán n lại bằng n / m. Ví dụ `n = 4 /2 = 2`.
3. Thực hiện cho tới khi n bằng 0.  lúc này stack của ta sẽ có giá trị là `[0, 0, 1, 0]`.
4. Xây dựng lại số n với dạng m bằng cách cộng chuỗi với hàm pop của stack cho tới khi stack rỗng, ta sẽ có n ở dạng m là `0100`.

Ta tiến hành viết code, tạo một hàm tên là `MulBase()` ở trong `stack.go` như sau.

```stack.go
package main

...

func MulBase(number int, base int) string {
	s := Stack{}
	for {
		s.Push(number % base)
		number = number / base

		if number <= 0 {
			break
		}
	}

	converted := ""

	for s.Length() > 0 {
		converted = converted + strconv.Itoa(s.Pop().(int))
	}

	return converted
}
```

Đầu tiên ta tạo stack, sau đó ta dùng vòng `for` để lập lại công việc, trong vòng `for` ta push vào stack số dư của `number % base`, tiếp theo ta gán number lại bằng `number / base`, vì biến của ta là kiểu `int` nên khi ta chia ra số thập phân thì Go sẽ tự động làm tròn xuống nên ta không cần phải dùng hàm `Math.floor` như trong Javascript.

Ta kiểm tra nếu `number` nhỏ hơn hoặc bằng 0 ta sẽ kết thúc vòng `for`. Còn lại là ta sẽ nối chuỗi để có được dạng `base` của số `number`.

Cập nhật lại hàm `main()` và kiểm tra thử nào.

```stack.go
package main

import (
	"fmt"
	"strconv"
)

type Stack struct {
	data []interface{}
	top  int
}

func (s *Stack) Push(element interface{}) {
	s.top++
	s.data = append(s.data, element)
}

func (s *Stack) Pop() interface{} {
	if len(s.data) > 0 {
		s.top--
		last := s.data[s.top]
		s.data = s.data[:s.top]

		return last
	}

	return nil
}

func (s *Stack) Peek() interface{} {
	if len(s.data) > 0 {
		return s.data[s.top-1]
	}

	return nil
}

func (s *Stack) Clear() {
	s.top  = 0
	s.data = []interface{}{}
}

func (s *Stack) Length() int {
	return s.top
}

func main() {
	var number = 12

	fmt.Printf("Number %d converted to base %d is %s\n", number, 2, MulBase(number, 2))
	fmt.Printf("Number %d converted to base %d is %s\n", number, 8, MulBase(number, 8))
}

func MulBase(number int, base int) string {
	s := Stack{}
	for {
		s.Push(number % base)
		number = number / base

		if number <= 0 {
			break
		}
	}

	converted := ""

	for s.Length() > 0 {
		converted = converted + strconv.Itoa(s.Pop().(int))
	}

	return converted
}

```

Kết quả.

```
Number 12 converted to base 2 is 1100
Number 12 converted to base 8 is 14
```

## Kết luận
Vậy là ta đã tìm hiểu xong cách viết Stack và cách sử dụng nó. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Team mình đã cải thiện website Hoàng Phúc từ 1 điểm Google lên 90 điểm như thế nào?

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Đây là bài viết mà mình để tiêu đề trước và hy vọng sẽ viết được bài này trong tương lai. Team công nghệ Hoàng Phúc của bọn mình được thành lập từ tháng 8 năm 2021, ban đầu chỉ có hai sếp, một bạn Backend và một bạn Front-end, mình là thành viên thứ 5 và sau đó team từ từ đã có nhiều thành viên hơn. Với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 40 điểm, và mục tiêu là 90 điểm, để đáp ứng được nhu cầu của nhiều khách hàng nhất có thể. Bọn mình làm được điều đó không phải vì kĩ thuật giỏi hay gì hết, mà là có những đồng đội mà sẵn sàng hỗ trợ nhau và sự dẫn dắt của hai sếp cực giỏi, những thành viên trong team bọn mình có thể không phải giỏi về chuyên môn kỹ thuật nhất nhưng chắc chắn là sẽ tạo ra được hiệu quả cao nhất. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tưởng tượng bạn là những người đầu tiên góp phần xây dựng cho một hệ thống lớn như thế. Hãy tham gia với bọn mình nhé.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).
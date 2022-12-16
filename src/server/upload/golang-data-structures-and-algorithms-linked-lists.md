## Giới thiệu
Series về cấu trúc dữ liệu và thuật toán sử dụng Golang. Ở bài này chúng ta sẽ tìm hiểu về Linked Lists.

## Linked Lists
Linked Lists là một cấu trúc dữ liệu dạng collection, nó là tập họp của nhiều object được gọi là *node*, và các node này được nối với nhau thông qua một liên kết được gọi là *link*, như hình minh họa bên dưới.

![image.png](https://images.viblo.asia/3b9dd1b5-3fce-4587-aafe-a5f2ef9d4246.png)

Linked Lists cũng tương tự như Array, nhưng ở một số ngôn ngữ khi ta làm việc với Array, thì ta thường phải đối mặt với một số vấn đề về độ dài của Array. Linked Lists sẽ giúp ta giải quyết các vấn đề đó.

Linked Lists sẽ có các hàm như sau để ta làm việc với nó:
+ insert: thêm một node vào Linked Lists.
+ remove: xóa một node khỏi Linked Lists.
+ find: tìm một node trong Linked Lists.
+ findPrevious: tìm một node mà đằng trước node khác trong Linked Lists.
+ print: in ra dữ liệu của Linked Lists.
 
## Linked Lists Implementation
Đầu tiên ta tạo một file tên là `linked.go` với đoạn code như sau:

```linked.go
package main

type Node struct {
	element interface{}
	next    *Node
}

type LinkedLists struct {
	head *Node
}

func main() {
}
```

Ta sẽ dùng `struct` để định nghĩa Node, một Node sẽ có hai thuộc tính là `element` và `next`. Với element dùng để chứa giá trị của Node, và next dùng để Node liên kết tới một Node khác.

Ta cũng sẽ dùng `struct` để định nghĩa Linked Lists, nó sẽ có một thuộc tính là `head`, đây là Node bắt đầu của Linked Lists, ta sẽ luôn phải truy cập head trước sau đó mới đi qua các Node còn lại.

Ta sẽ khởi tạo Linked Lists với một Node có element là "head", và thuộc tính next sẽ là null, vì trong Golang sẽ không có Constructor cho struct, nên ta sẽ dùng function để giả lập hàm Constructor cho một struct, cú pháp thông dụng của function dùng để làm Constructor trong Golang là `New<StructName>`.

```linked.go
package main

type Node struct {
	element interface{}
	next    *Node
}

type LinkedLists struct {
	head *Node
}

func main() {

}

func NewLinkedLists() *LinkedLists {
	return &LinkedLists{head: &Node{element: "head", next: nil}}
}
```

Tiếp theo ta sẽ viết hàm insert, cập nhật `linked.go`.

```linked.go
package main

...

func (l *LinkedLists) Find(element interface{}) *Node {
	current := l.head
	for current.element != element {
		current = current.next
	}
	return current
}

func (l *LinkedLists) Insert(newElement interface{}, element interface{}) {

}

func main() {

}

...
```

Hàm `Insert()` của ta sẽ nhận vào hai giá trị là `newElement` và `element`, với element là giá trị của Node mà ta muốn thêm một Node mới vào trước nó. Và để kiếm được Node mà ta sẽ thêm một Node mới vào trước nó, ta phải dùng hàm `Find()`.

Hàm `Find()` được dùng để kiếm một Node bất kì nào đó trong Linked Lists, đầu tiên ta sẽ tạo một biến tên là current và gán Head Node vào nó, sau đó ta sẽ duyệt qua từng Node và trả về Node mà có giá trị element bằng với giá trị element ta truyền vào.

Ta sẽ thực hiện hàm `Insert()` như sau.

```linked.go
package main

...

func (l *LinkedLists) Insert(newElement interface{}, element interface{}) {
	newNode := &Node{element: newElement}
	current := l.Find(element)
	newNode.next = current.next
	current.next = newNode
}

func main() {

}

...
```

Ta khởi tạo một Node mới với giá trị newElement, và tìm kiếm Node mà ta muốn thêm Node mới vào trước nó, gán nó vào biến current. Tiếp theo ta cập nhật lại giá trị next của Node mới bằng giá trị của Node mà ta vừa kiếm được, sau đó ta gán lại giá trị next của nó để liên kết với Node mới, minh họa như sau.

![image.png](https://images.viblo.asia/063a1b11-e5dd-4950-8476-e433491d63c5.png)

Để kiểm tra được hàm `Insert()` của ta có hoạt động đúng không, ta viết thêm hàm print để in giá trị của Linked Lists ra thử.

```linked.go
package main

...

func (l *LinkedLists) Print() {
	current := l.head

	for {
		fmt.Printf("%v", current.element)

		if current.next == nil {
			fmt.Println()
			break
		}
        
        current = current.next

		fmt.Print(" -> ")
	}
}

func main() {

}

...
```

Cập nhật lại `linked.go` để kiểm tra các hàm của ta nào.

```linked.go
package main

import "fmt"

type Node struct {
	element interface{}
	next    *Node
}

type LinkedLists struct {
	head *Node
}

func (l *LinkedLists) Find(element interface{}) *Node {
	current := l.head
	for current.element != element {
		current = current.next
	}
	return current
}

func (l *LinkedLists) Insert(newElement interface{}, element interface{}) {
	newNode := &Node{element: newElement}
	current := l.Find(element)
	newNode.next = current.next
	current.next = newNode
}

func (l *LinkedLists) Print() {
	current := l.head

	for {
		fmt.Printf("%v", current.element)

		if current.next == nil {
			fmt.Println()
			break
		}
        
        current = current.next

		fmt.Print(" -> ")
	}
}

func main() {
	l := NewLinkedLists()
	l.Insert("Hoàng Phúc International", "head")
	l.Insert("Ecko", "Hoàng Phúc International")
	l.Insert("Kappa", "Ecko")
	l.Print()
}

func NewLinkedLists() *LinkedLists {
	return &LinkedLists{head: &Node{element: "head", next: nil}}
}
```

```
go run linked.go
```

Kết quả.

```
head -> Hoàng Phúc International -> Ecko -> Kappa
```

Các hàm của ta đã chạy đúng như ý ta muốn, tiếp theo ta sẽ viết hàm remove để xóa Node ra khỏi Linked Lists.

```linked.go
package main

...

func (l *LinkedLists) FindPrevious(element interface{}) *Node {
	current := l.head
	for current.next != nil && current.next.element != element {
		current = current.next
	}
	return current
}

func (l *LinkedLists) Remove(element interface{}) {
	prevNode := l.FindPrevious(element)
	if prevNode.next != nil {
		current := prevNode.next
		prevNode.next = current.next
		current = nil
	}
}


func main() {

}
...
```

Hàm `Remove()` ta sẽ nhận vào giá trị element của Node mà ta muốn xóa đi, để xóa được Node ra khỏi Linked Lists ta cần làm một số bước sau, ta phải có hàm `FindPrevious()` để kiếm Node trước đó (prevNode) của Node mà ta muốn xóa, sau đó ta chỉ đơn giản là cập nhật lại giá trị next của prevNode, cho nó liên kết tới Node tiếp theo của Node mà ta cần xóa, Node ta xóa đi sẽ không được liên kết tới bất kì Node nào nữa.

Hàm `FindPrevious()` ta sẽ bắt đầu từ head và duyệt qua từng Node, để tìm kiếm Node trước đó của một Node bất kì, thay vì kiểm tra giá trị element của Node hiện tại thì ta sẽ kiểm ta giá trị element của Node kế tiếp bằng `current.next.element`.

![image.png](https://images.viblo.asia/b5a015ce-47b8-4aeb-9360-3d0860061c4d.png)

Ở hàm `Remove()` thì sẽ lằng nhằng hơn một chút, đầu tiên ta sẽ lấy prevNode của Node mà ta muốn xóa ra, gán Node mà ta muốn xóa vào biến current. Và để xóa Node đó rất đơn giản, ta chỉ cần cập nhật lại thuộc tính next của prevNode chỉa tới `current.next`, lúc này prevNode sẽ không liên kết với current nữa mà sẽ liên kết với Node kế tiếp của current.

![image.png](https://images.viblo.asia/9099cd82-e3ed-43f5-9239-d30acb3d2123.png)

Cập nhật lại hàm main để kiểm tra xem hàm `Remove()` có hoạt động đúng ý ta không.

```linked.go
package main

import "fmt"

type Node struct {
	element interface{}
	next    *Node
}

type LinkedLists struct {
	head *Node
}

func (l *LinkedLists) Find(element interface{}) *Node {
	current := l.head
	for current.element != element {
		current = current.next
	}
	return current
}

func (l *LinkedLists) FindPrevious(element interface{}) *Node {
	current := l.head
	for current.next != nil && current.next.element != element {
		current = current.next
	}
	return current
}

func (l *LinkedLists) Insert(newElement interface{}, element interface{}) {
	newNode := &Node{element: newElement}
	current := l.Find(element)
	newNode.next = current.next
	current.next = newNode
}

func (l *LinkedLists) Remove(element interface{}) {
	prevNode := l.FindPrevious(element)
	if prevNode.next != nil {
		current := prevNode.next
		prevNode.next = current.next
		current = nil
	}
}

func (l *LinkedLists) Print() {
	current := l.head

	for {
		fmt.Printf("%v", current.element)

		if current.next == nil {
			fmt.Println()
			break
		}

        current = current.next

		fmt.Print(" -> ")
	}
}

func main() {
	l := NewLinkedLists()
	l.Insert("Hoàng Phúc International", "head")
	l.Insert("Ecko", "Hoàng Phúc International")
	l.Insert("Kappa", "Ecko")
	l.Print()
	l.Remove("Ecko")
	l.Print()
}

func NewLinkedLists() *LinkedLists {
	return &LinkedLists{head: &Node{element: "head", next: nill}}
}
```

```
go run linked.go
```

Kết quả.

```
head -> Hoàng Phúc International -> Ecko -> Kappa
head -> Hoàng Phúc International -> Kappa
```

Oke, vậy là ta đã viết được Linked Lists thành công 😁. Bài này sẽ là tiền đề để ta tìm hiểu bài tiếp theo: **Doubly Linked Lists and Circular Linked Lists**.

## Real World Example
Vậy Linked Lists sẽ được sử dụng ở đâu trong thực tế và nó giúp ta giải quyết những vấn đề gì?

Linked Lists được sử dụng cho khá nhiều ứng dụng trong khoa học máy tính (Computer Science), ví dụ:
+ Dynamic memory allocation : We use linked list of free blocks.
+ Maintaining directory of names.
+ Performing arithmetic operations on long integers.
+ Manipulation of polynomials by storing constants in the node of linked list.
+ Representing sparse matrices.

Còn trong thực tế ta có thể sử dụng Linked Lists cho các ứng dụng như:
+ Image viewer.
+ Previous and next page in web browser.
+ Music Player.

Các ứng dụng trên thì ta không thể dùng Linked Lists bình thường được, mà ta cần dùng **[Doubly Linked Lists](https://www.geeksforgeeks.org/doubly-linked-list/)**, các bạn có thể đọc để biết rõ hơn.

## Kết luận
Vậy là ta đã tìm hiểu xong cách viết Linked Lists và cách sử dụng nó. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Team mình đã cải thiện website Hoàng Phúc từ 1 điểm Google lên 90 điểm như thế nào?

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Đây là bài viết mà mình để tiêu đề trước và hy vọng sẽ viết được bài này trong tương lai. Team công nghệ Hoàng Phúc của bọn mình được thành lập từ tháng 8 năm 2021, ban đầu chỉ có hai sếp, một bạn Backend và một bạn Front-end, mình là thành viên thứ 5 và sau đó team từ từ đã có nhiều thành viên hơn. Với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 40 điểm, và mục tiêu là 90 điểm, để đáp ứng được nhu cầu của nhiều khách hàng nhất có thể. Bọn mình làm được điều đó không phải vì kĩ thuật giỏi hay gì hết, mà là có những đồng đội mà sẵn sàng hỗ trợ nhau và sự dẫn dắt của hai sếp cực giỏi, những thành viên trong team bọn mình có thể không phải giỏi về chuyên môn kỹ thuật nhất nhưng chắc chắn là sẽ tạo ra được hiệu quả cao nhất. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tưởng tượng bạn là những người đầu tiên góp phần xây dựng cho một hệ thống lớn như thế. Hãy tham gia với bọn mình nhé.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).
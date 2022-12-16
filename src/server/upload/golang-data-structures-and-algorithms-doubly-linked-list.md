## Giới thiệu
Series về cấu trúc dữ liệu và thuật toán sử dụng Golang. Ở bài này chúng ta sẽ tìm hiểu về dạng tiếp theo của Linked Lists là Doubly Linked Lists.

## Doubly Linked Lists
Doubly Linked Lists là dạng mở rộng của Linked Lists. Trong Linked Lists một Node chỉ liên kết tới Node tiếp theo, do đó nếu ta muốn duyệt qua Linked Lists ta chỉ có thể bắt đầu từ Node đầu tiên, và ta không thể quay lại một Node trước đó.

Doubly Linked Lists sẽ giải quyết vấn đề này cho ta, thay vì một Node chỉ liên kết tới Node tiếp theo, thì nó cũng sẽ liên kết tới Node trước đó, như hình minh họa bên dưới.

![image.png](https://images.viblo.asia/773fa22e-2f03-476c-b513-0a8b3bcdc355.png)

## Doubly Linked Lists Implementation
Tạo một file tên là `doubly_linked.go` và lấy code ở bài trước dán vào.

```doubly_linked.go
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
	return &LinkedLists{head: &Node{element: "head", next: nil}}
}
```

Ta sẽ sửa Linked Lists ở bài trước thành Doubly Linked Lists, đầu tiên ta sẽ cập nhật lại `Node struct`.

```doubly_linked.go
package main

import "fmt"

type Node struct {
	element  interface{}
	next     *Node
	previous *Node
}

type DoublyLinkedLists struct {
	head *Node
}

...
```

Ta sẽ thêm cho `Node struct` một thuộc tính `previous` để liên kết tới Node trước đó. Tiếp theo ta sẽ cập nhật lại hàm `Insert()`.

```doubly_linked.go
package main

...

func (l *DoublyLinkedLists) Insert(newElement interface{}, element interface{}) {
	newNode := &Node{element: newElement}
	current := l.Find(element)

	newNode.next = current.next
	newNode.previous = current

	if current.next != nil {
		current.next.previous = newNode
	}

	current.next = newNode
}

...
```

Hàm `Insert()` mới của ta sẽ hoạt động như sau, tạo một Node mới tên là `newNode` và tìm vị trí của Node mà ta muốn thêm newNode vào trước nó và gán nó vào `current`. Tiếp theo ta sẽ cập nhật thuộc tính `next` của newNode bằng `next` của current.

![image.png](https://images.viblo.asia/44051010-e64c-4d61-b136-81a91bf4201f.png)

Sau đó ta gán thuộc tính `previous` của newNode bằng current.

![image.png](https://images.viblo.asia/1b0bf0df-5785-4d3f-a649-359fa89cf71a.png)

Cuối cùng ta gán thuộc tính previous của Node kế tiếp bằng newNode.

![image.png](https://images.viblo.asia/52279ac0-a25b-44e8-b486-35d71a0e4e32.png)

Và cập nhật liên kết của current chỉa tới newNode.

![image.png](https://images.viblo.asia/9804646e-d4e7-41e5-a8f8-f45bbe305580.png)

Để kiểm tra được Doubly Linked Lists, thì ngoài hàm `Print()` dùng để in Linked Lists theo chiều từ đầu tới cuối, ta cũng phải có hàm `PrintReverse()` để in Linked Lists theo chiều ngược lại.

Muốn in được Linked Lists theo chiều ngược lại, ta phải bắt đầu từ cuối và quay ngược về trước bằng thuộc tính previous, do đó ta phải có hàm để di chuyển tới Node cuối cùng của Linked Lists, ta thêm vào hàm `FindLast()` và hàm `PrintReverse()` như sau.

```doubly_linked.go
package main

...

func (l *DoublyLinkedLists) FindLast() *Node {
	current := l.head
	for current.next != nil {
		current = current.next
	}
	return current
}

...

func (l *DoublyLinkedLists) PrintReverse() {
	current := l.FindLast()

	for {
		fmt.Printf("%v", current.element)

		if current.element == "head" {
			fmt.Println()
			break
		}

		current = current.previous

		fmt.Print(" -> ")
	}
}

...
```

Để lấy được Node cuối cùng ta chỉ đơn giản là duyệt cho tới khi nào kiếm được Node mà thuộc tính next của nó là null (nill trong Golang). Còn ở hàm `PrintReverse()` ta sẽ lấy ra Node cuối cùng và di chuyển ngược lại cho tới khi nào tới Node đầu tiên thì ta sẽ dừng lại.

Cập nhật lại hàm `main()` để kiểm tra Doubly Linked Lists của ta.

```doubly_linked.go
package main

...

func main() {
	l := NewDoublyLinkedLists()
	l.Insert("Hoàng Phúc International", "head")
	l.Insert("Ecko", "Hoàng Phúc International")
	l.Insert("Kappa", "Ecko")
	l.Insert("Staple", "Ecko")
	l.Print()
	l.PrintReverse()
}
```

```
go run doubly_linked.go
```

Kết quả.

```
head -> Hoàng Phúc International -> Ecko -> Staple -> Kappa
Kappa -> Staple -> Ecko -> Hoàng Phúc International -> head
```

Ok, kết quả đã đúng 😁. Hàm tiếp theo ta cần làm là hàm `Remove()`, do các Node đã có thể liên kết tới Node trước đó nên ta sẽ không cần hàm `FindPrevious()`, ta sẽ xóa hàm đó đi, cập nhật hàm `Remove()`.

```doubly_linked.go
package main

...

func (l *DoublyLinkedLists) Remove(element interface{}) {
	current := l.Find(element)
	prevNode := current.previous
	nextNode := current.next

	nextNode.previous = prevNode
    prevNode.next = nextNode
	current = nil
}

...
```

Hàm `Remove()` mới của ta sẽ hoạt động như sau, đầu tiên ta kiếm Node mà ta muốn xóa đi, khi kiếm được rồi ta sẽ lấy ra prevNode và nextNode của nó. Tiếp theo ta chỉ đơn giản cập nhật `nextNode.previous` bằng prevNode và `prevNode.next` bằng nextNode.

![image.png](https://images.viblo.asia/6bf77ebb-459e-4b1a-ba4e-7f387f062e1d.png)

![image.png](https://images.viblo.asia/1bb9539b-c5d8-4e41-8c97-514954ba4cb5.png)

![image.png](https://images.viblo.asia/4b81c46b-2a12-484a-b7d3-ef1998b3d0c7.png)

![image.png](https://images.viblo.asia/fa32880a-7039-471c-8a80-f63e3634df01.png)

Cập nhật lại hàm `main()` để kiểm tra.

```doubly_linked.go
package main

...

func main() {
	l := NewDoublyLinkedLists()
	l.Insert("Hoàng Phúc International", "head")
	l.Insert("Ecko", "Hoàng Phúc International")
	l.Insert("Kappa", "Ecko")
	l.Insert("Staple", "Ecko")
	l.Print()
	l.PrintReverse()

	fmt.Println("\nRemove")
	l.Remove("Ecko")
	l.Print()
}

...
```

```
go run doubly_linked.go
```

Kết quả.

```
head -> Hoàng Phúc International -> Ecko -> Staple -> Kappa
Kappa -> Staple -> Ecko -> Hoàng Phúc International -> head

Remove
head -> Hoàng Phúc International -> Staple -> Kappa
```

Vậy là ta đã viết được Linked Lists thành công 😁. Doubly Linked Lists thường được sử dụng ở đâu? Một vài ứng dụng phổ biến của Doubly Linked Lists là:
+ Music player.
+ Undo và Redo.
+ Web history.

Ở bài này ta sẽ dùng Doubly Linked Lists để mô phỏng *music player*.

## Simulating the Music Player
Thông thường *music player* của ta sẽ chứa một danh sách bài hát, và có hai nút next và prev để ta di chuyển tới và quay lại để nghe bài hát trước đó. Doubly Linked Lists của ta sẽ được dùng để chứa danh sách bài hát, và sẽ có các hàm để ta di chuyển tới và quay lại một bài hát bất kì.

Tạo một file tên là `music_player.go` với đoạn code Doubly Linked Lists ở trên.

```music_player.go
package main

import "fmt"

type Node struct {
	element  interface{}
	next     *Node
	previous *Node
}

type DoublyLinkedLists struct {
	head *Node
}

func (l *DoublyLinkedLists) Find(element interface{}) *Node {
	current := l.head
	for current.element != element {
		current = current.next
	}
	return current
}

func (l *DoublyLinkedLists) FindLast() *Node {
	current := l.head
	for current.next != nil {
		current = current.next
	}
	return current
}

func (l *DoublyLinkedLists) Insert(newElement interface{}, element interface{}) {
	newNode := &Node{element: newElement}
	current := l.Find(element)

	newNode.next = current.next
	newNode.previous = current

	if current.next != nil {
		current.next.previous = newNode
	}

	current.next = newNode
}

func (l *DoublyLinkedLists) Remove(element interface{}) {
	current := l.Find(element)
	prevNode := current.previous
	nextNode := current.next

	prevNode.next = nextNode
	nextNode.previous = prevNode
	current = nil
}

func (l *DoublyLinkedLists) Print() {
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

func (l *DoublyLinkedLists) PrintReverse() {
	current := l.FindLast()

	for {
		fmt.Printf("%v", current.element)

		if current.element == "head" {
			fmt.Println()
			break
		}

		current = current.previous

		fmt.Print(" -> ")
	}
}

func main() {

}

func NewDoublyLinkedLists() *DoublyLinkedLists {
	return &DoublyLinkedLists{head: &Node{element: "head", next: nil, previous: nil}}
}
```

Và để có thể di chuyển tới và quay lại một bài hát bất kì nào đó, ta cần phải thêm vào một vài hàm để xác định bài hát hiện tại, di chuyển tới bài hát kế tiếp và quay lại bài hát trước đó. Ta sẽ có thêm ba hàm là `Advance(step int)`, `Back(step int)`, `Play()`:
+ advance dùng để di chuyển tới một bài hát bất kì theo số step ta truyền vào.
+ back dùng để quay ngược lại một bài hát bất kì theo số step ta truyền vào.
+ play dùng để chạy bài hát hiện tại.

Cập nhật lại `DoublyLinkedLists struct` và hàm `NewDoublyLinkedLists()`.

```music_player.go
package main

...

type DoublyLinkedLists struct {
	head    *Node
	current *Node
}

...

func NewDoublyLinkedLists() *DoublyLinkedLists {
	head := &Node{element: "head", next: nil, previous: nil}
	return &DoublyLinkedLists{head: head, current: head}
}
```

Ta thêm vào thuộc tính `current` để xác định bài hát hiện tại. Tiếp theo ta thêm vào 3 hàm trên.

```music_player.go
package main

...

func (l *DoublyLinkedLists) Advance(step int) {
	for i := 0; i < step; i++ {
		if l.current.next != nil {
			l.current = l.current.next
		}
	}
}

func (l *DoublyLinkedLists) Back(step int) {
	for i := 0; i < step; i++ {
		if l.current.previous != nil && l.current.previous.element != "head" {
			l.current = l.current.previous

		}
	}
}

func (l *DoublyLinkedLists) Play() {
	if l.current.element == "head" {
		l.Advance(1)
	}

	fmt.Printf("Play music %+v\n", l.current.element)
}

...
```

Ở hàm `Advance()` ta sẽ di chuyển tới các bài hát kế theo theo số step truyền vào, còn hàm `Back()` thì ta làm ngược lại.

Còn ở hàm `Play()`, trước khi chạy bài hát ta sẽ kiểm ta nếu ta đang ở head thì ta cần phải di chuyển tới bài hát đầu tiên.

Giờ ta sẽ viết mô phỏng Music Player ở hàm `main()`, cập nhật lại code.

```music_player.go
package main

...

var music = NewDoublyLinkedLists()

func init() {
	music.Insert("Mùa xuân về trên Thành Phố Hồ Chí Minh", "head")
	music.Insert("Thương quá Việt Nam", "Mùa xuân về trên Thành Phố Hồ Chí Minh")
	music.Insert("Năm anh em trên chiếc xe tăng", "Thương quá Việt Nam")
	music.Insert("Tiến Quân Ca", "Năm anh em trên chiếc xe tăng")
}

func main() 
    music.Print()
	fmt.Println()
	music.Play()

	scanner := bufio.NewScanner(os.Stdin)

	for {
		fmt.Println()
		fmt.Printf("Enter prev or next to play prev or next music: ")

		scanner.Scan()
		input := scanner.Text()

		if input == "prev" {
			music.Back(1)
			music.Play()
			continue
		}

		if input == "next" {
			music.Advance(1)
			music.Play()
			continue
		}
	}

}

...
```

Ta khởi tạo Doubly Linked Lists và gán nó vào biến `music`, và ở hàm `init()` ta thêm bài hát vào Doubly Linked Lists. Tiếp theo ở hàm `main()` ta sẽ mô phỏng nếu người dùng nhập vào "next" thì ta sẽ di chuyển tới bài hát kế tiếp, và ngược lại nếu người dùng nhập vào "prev" ta sẽ quay lại bài hát trước đó.

Code hoàn chỉnh.

```music_player.go
package main

import (
	"bufio"
	"fmt"
	"os"
)

type Node struct {
	element  interface{}
	next     *Node
	previous *Node
}

type DoublyLinkedLists struct {
	head    *Node
	current *Node
}

func (l *DoublyLinkedLists) Find(element interface{}) *Node {
	current := l.head
	for current.element != element {
		current = current.next
	}
	return current
}

func (l *DoublyLinkedLists) FindLast() *Node {
	current := l.head
	for current.next != nil {
		current = current.next
	}
	return current
}

func (l *DoublyLinkedLists) Insert(newElement interface{}, element interface{}) {
	newNode := &Node{element: newElement}
	current := l.Find(element)
	newNode.next = current.next
	newNode.previous = current
	current.next = newNode
}

func (l *DoublyLinkedLists) Remove(element interface{}) {
	current := l.Find(element)
	prevNode := current.previous
	nextNode := current.next

	prevNode.next = nextNode
	nextNode.previous = prevNode
	current = nil
}

func (l *DoublyLinkedLists) Print() {
	current := l.head

	for {
		if current.element == "head" {
			current = current.next
			continue
		}

		fmt.Printf("%v", current.element)

		if current.next == nil {
			fmt.Println()
			break
		}

		current = current.next

		fmt.Print(" -> ")
	}
}

func (l *DoublyLinkedLists) PrintReverse() {
	current := l.FindLast()

	for {
		fmt.Printf("%v", current.element)

		if current.element == "head" {
			fmt.Println()
			break
		}

		current = current.previous

		fmt.Print(" -> ")
	}
}

func (l *DoublyLinkedLists) Advance(step int) {
	for i := 0; i < step; i++ {
		if l.current.next != nil {
			l.current = l.current.next
		}
	}
}

func (l *DoublyLinkedLists) Back(step int) {
	for i := 0; i < step; i++ {
		if l.current.previous != nil && l.current.previous.element != "head" {
			l.current = l.current.previous

		}
	}
}

func (l *DoublyLinkedLists) Play() {
	if l.current.element == "head" {
		l.Advance(1)
	}

	fmt.Printf("Play music %+v\n", l.current.element)
}

var music = NewDoublyLinkedLists()

func init() {
	music.Insert("Mùa xuân về trên Thành Phố Hồ Chí Minh", "head")
	music.Insert("Thương quá Việt Nam", "Mùa xuân về trên Thành Phố Hồ Chí Minh")
	music.Insert("Năm anh em trên chiếc xe tăng", "Thương quá Việt Nam")
	music.Insert("Tiến Quân Ca", "Năm anh em trên chiếc xe tăng")
}

func main() {
	music.Print()
	fmt.Println()
	music.Play()

	scanner := bufio.NewScanner(os.Stdin)

	for {
		fmt.Println()
		fmt.Printf("Enter prev or next to play prev or next music: ")

		scanner.Scan()
		input := scanner.Text()

		if input == "prev" {
			music.Back(1)
			music.Play()
			continue
		}

		if input == "next" {
			music.Advance(1)
			music.Play()
			continue
		}
	}

}

func NewDoublyLinkedLists() *DoublyLinkedLists {
	head := &Node{element: "head", next: nil, previous: nil}
	return &DoublyLinkedLists{head: head, current: head}
}
```

Ta chạy thử.

```
go run music_player.go
```

Kết quả.

```bash
Mùa xuân về trên Thành Phố Hồ Chí Minh -> Thương quá Việt Nam -> Năm anh em trên chiếc xe tăng -> Tiến Quân Ca
Play music Mùa xuân về trên Thành Phố Hồ Chí Minh

Enter prev or next to play prev or next music: next
Play music Thương quá Việt Nam

Enter prev or next to play prev or next music: next
Play music Năm anh em trên chiếc xe tăng

Enter prev or next to play prev or next music: next
Play music Tiến Quân Ca

Enter prev or next to play prev or next music: prev
Play music Năm anh em trên chiếc xe tăng
```

Done 😁.

## Kết luận
Vậy là ta đã tìm hiểu xong về Doubly Linked Lists và cách sử dụng nó. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Team mình đã cải thiện website Hoàng Phúc từ 1 điểm Google lên 90 điểm như thế nào?

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Đây là bài viết mà mình để tiêu đề trước và hy vọng sẽ viết được bài này trong tương lai. Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 40 điểm, và mục tiêu là 90 điểm, để đáp ứng được nhu cầu của nhiều khách hàng nhất có thể. Bọn mình làm được điều đó không phải vì kĩ thuật giỏi hay gì hết, mà là có những đồng đội mà sẵn sàng hỗ trợ nhau và sự dẫn dắt của hai sếp cực giỏi, những thành viên trong team bọn mình có thể không phải giỏi về chuyên môn kỹ thuật nhất nhưng chắc chắn là sẽ tạo ra được hiệu quả cao nhất. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tưởng tượng bạn là những người đầu tiên góp phần xây dựng cho một hệ thống lớn như thế. Hãy tham gia với bọn mình nhé.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).
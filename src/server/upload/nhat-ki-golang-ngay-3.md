# Mở đầu
Nay cuối tuần rồi ngại học ghê, cố nắm được con trỏ với struct vậy.
Mấy cái này cơ bản giống C thôi, cũng không có gì lạ lắm. 

Sau 10p đọc... con trỏ thì ok không vấn đề gì, struct thì thêm đống OOP, hơi phức tạp, thử thêm 1 bài viết tiếng việt cho dễ hiểu vậy, [https://viblo.asia/p/lap-trinh-huong-doi-tuong-voi-go-07LKXA7kZV4](https://viblo.asia/p/lap-trinh-huong-doi-tuong-voi-go-07LKXA7kZV4) 

Cơ bản hiểu được cái OOP của go rồi, cú pháp này khó chịu hơn của java, giống C hơn, cái kiểu viết struct một nơi method một nơi này mình vẫn không thể yêu quý được, tí code thử xem đã.
# Code thử chút xem
## LinkedList để thử con trỏ.

```go
package main

import "fmt"

type Node struct {
	val int
	next *Node
}

func makeLL(n *Node) {
	for i := 1; i <= 30; i++ {
		n.val = i
		n.next = new(Node)
		n = n.next
	}
}

func show(n *Node) {
	for n.next != nil {
		fmt.Println(n.val)
		n = n.next
	}
}

func main() {
	head := new(Node)
	makeLL(head)
	show(head)
}
```
Không quen code lâu quá.
## Đóng gói cái linked list kia thành class xem
```go
package main

import "fmt"

type Node struct {
	val int
	next *Node
}

type LinkedList struct {
	head *Node
}

func (ll *LinkedList) add(val int) {
	head := Node{val, ll.head}
	ll.head = &head
}

func (ll *LinkedList) getAt(pos int) int {
	head := ll.head
	for i := 0; i < pos; i++ {
		if head.next == nil {
			return -1
		}
		head = head.next
	}
	return head.val
}

func main() {
	ll := new(LinkedList)
	for i := 1; i <= 30; i++ {
		ll.add(i)
	}
	for i := 0; i <= 30; i++ {
		fmt.Println(ll.getAt(i))
	}
}
```
Hơi dễ nhỉ, thử cái gì khác nữa xem
## Thử mấy cái design pattern của OOP xem.
[https://www.tutorialspoint.com/design_pattern/index.htm](https://www.tutorialspoint.com/design_pattern/index.htm)

Cả đống thế này ngồi code thử cả ngày. Trước học java mình cũng ngồi code thử những cũng chán chả code hết được.
Thử cái facade pattern xem.
```go
package main

import "fmt"

type Shape interface { // Không có từ khóa kiểu implements thì interface dùng làm gì nhỉ, chưa hiểu lắm
	draw()
}

type Circle struct {}
func (c *Circle) draw() {fmt.Println("Circle::draw()")}

type Square struct {}
func (c *Square) draw() {fmt.Println("Square::draw()")}

type Rectangle struct {}
func (c *Rectangle) draw() {fmt.Println("Rectangle::draw()")}

type ShapeMaker struct {
	circle Circle
	square Square
	rectangle Rectangle
}

func (sm *ShapeMaker) drawCircle() {
	sm.circle.draw()
}

func (sm *ShapeMaker) drawSquare() {
	sm.square.draw()
}

func (sm *ShapeMaker) drawRectangle() {
	sm.rectangle.draw()
}

func newShapeMaker() ShapeMaker {
	shapeMaker := ShapeMaker{
		circle:    Circle{},
		square:    Square{},
		rectangle: Rectangle{},
	}
	return shapeMaker
}

func main() {
	sm := newShapeMaker()
	sm.drawCircle()
	sm.drawRectangle()
	sm.drawSquare()
}
```
Thực sự mình không thích kiểu OOP này, chắc cũng tại go không sinh ra chỉ dành riêng OOP như java hay ruby. Cứ học thôi để quen dần vậy.

Vẫn còn rất nhiều thứ mình không biết làm thế nào, như constructor, destructor, khởi tạo rồi không biết có tự dọn rác không, rồi con class variable với class method nữa. Search trên mạng thì nó một bản tóm tắt thế này


[https://stackoverflow.com/questions/37510763/static-member-variable-such-as-oop-langage](https://stackoverflow.com/questions/37510763/static-member-variable-such-as-oop-langage)
> There is no inheritance in Go, but you can do all OOP stuff in Golang way.
> 
> also see:
https://github.com/luciotato/golang-notes/blob/master/OOP.md 
> 
> https://www.goinggo.net/2013/07/object-oriented-programming-in-go.html
> 
> 1: static var in C# class => global var in Golang package
> 
> 2: enum in C# => new package with enum name and const type of enum elements
> 
> 3: class in OOP => struct type
> 
> 4: class methods => struct with receiver methods
> 
> 5: C#/Java abstract methods(pure virtual functions in C++) => interface methods like io.Reader
> 
> 6: public => first letter Upper case Name
> 
> 7: private => first letter lower case name
> 
> 8: namespace => package name
> 
> 9: inheritance => embedded struct and embedded interface
> 
> 10: Thread => Go routines
> 
> 11: lock => sync.Mutex


Có lẽ mình không lên dấn quá sâu vào vụ này, nó không support thì có nghĩa là sẽ có cách khác.
# Tổng kết
Nay cuối tuần hơi oải, đọc cái này càng chán, mai chắc đi thẳng vào concurrency vậy, cứ linh tinh thế này nhanh mất động lực lắm
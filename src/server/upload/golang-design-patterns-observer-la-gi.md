# Khái niệm
> Observer is a behavioral design pattern that lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they’re observing.

![observer-2x.png](https://images.viblo.asia/2c1d2c58-bbdf-45a1-b0e8-83f76dc7065d.png)
(refactoring.guru)

**Observer** là một behavioral design pattern ( mẫu thiết kế hành vi), cho phép chúng ta xác định cơ chế `subcription`  để `notify` cho nhiều đối tượng về bất kỳ sự kiện nào xảy ra với đối tượng mà họ `observing`.

# Ngữ cảnh
Hãy tưởng tượng chúng ta đang thiết kế tính năng `subcribe` cho trang blog của mình. Cho phép các người xem theo dõi các bài viết mới mà họ quan tâm. 

Người xem có thể ghé thăm trang blog mỗi ngày để kiểm tra xem có bài viết mới hay không. Nhưng nhiều khi vài ngày hoặc vài tuần ta mới viết bài mới , điều đó khiến các lần kiểm tra của người xem trở nên vô nghĩa. 

Hoặc cách khác, chúng ta sẽ gửi hàng loạt email cho tất cả người xem mỗi khi có bài viết mới, điều này sẽ tiết kiệm thời gian của người xem. Nhưng đồng thời, nó cũng sẽ làm khó chịu những người xem khác - những người xem không quan tâm đến các bài viết mới của mình.

Cả 2 hướng tiếp cận trên đều gây lãng phí tài nguyên (thời gian) để kiểm tra trạng thái ( tính sẵn có) của bài viết, hoặc lãng phí tài nguyên (chi phí vận hành) để thông báo dư thừa cho người xem.

Để giải quyết vấn đề này, `Observer` patterns được đưa ra.  `Observer` mô tả cơ chế `observing` (quan sát) trạng thái sẵn có của các bài viết mới (publisher) để `notify` (thông báo) chỉ cho các người xem (subscriber) đã đăng ký theo dõi blog của mình.

![solution1-en-2x.png](https://images.viblo.asia/00cf9c94-c413-42aa-9cf9-e62cd0a6aba8.png)

# Cấu trúc
![structure-indexed-2x.png](https://images.viblo.asia/5cd42038-57e1-4312-9fbc-126d09180dfe.png)

1. `Publisher` phát hành các sự kiện mà các `object` khác quan tâm. Những sự kiện này xảy ra khi `Publisher` thay đổi trạng thái hoặc thực hiện một số hành vi. `Publisher` có các phương thức cho phép `Subcriber` mới tham gia (`.Subcribe`)  và `Subscriber` hiện tại rời khỏi danh sách (`.UnSubscribe`).

2. Khi một sự kiện mới xảy ra, `Publisher` xem qua danh sách đăng ký (`listSubcriber`) và gọi phương thức thông báo được khai báo trong `interface`  của từng người đăng ký. (`subscriber[i].Update`)

3.  `Subscriber` khai báo giao diện thông báo (`Subscriber interface`). Trong hầu hết các trường hợp, nó bao gồm một phương pháp duy nhất `.Update`. Phương thức có thể có một số tham số (`params`) cho phép `Publisher` chuyển một số thông tin sự kiện.

4. Các `Subcriber` thực hiện một số hành động để phản hồi lại các thông báo (`notify`) do `Publisher` đưa ra. Tất cả các `Class` này phải triển khai cùng một `interface`.

5. Thông thường, `subscriber` cần một số thông tin theo ngữ cảnh (`context data`) để xử lý `.Update` một cách chính xác. Vì lý do này, `Publisher` thường chuyển một số `context data` làm tham số của phương thức `.Update`. `Publisher` có thể chuyển chính nó làm tham số, cho phép `Subscriber` lấy trực tiếp bất kỳ dữ liệu bắt buộc nào.

6. `Client` tạo các `object` `Publisher` và `Subsciber` riêng biệt và sau đó đăng ký `Subsciber` cho các cập nhật của `Publisher`.
# Triển khai trong Go:
`publisher_interface.go`

```
package observer

type publisher interface {
	Register(Subscriber subscriber)
	Deregister(Subscriber subscriber)
	UpdateStatus()
	NotifyAll()
}
```

`pushlisher.go`
```
package observer

import "fmt"

type post struct {
	subscriberList []subscriber
	tittle         string
	isNew          bool
}

func NewPost(tittle string) publisher {
	return &post{
		tittle: tittle,
	}
}
func (p *post) UpdateStatus() {
	fmt.Printf("New post published:  %s\n", p.tittle)
	p.isNew = true
	p.NotifyAll()
}
func (p *post) Register(o subscriber) {
	p.subscriberList = append(p.subscriberList, o)
}

func (p *post) Deregister(o subscriber) {
	p.subscriberList = removeFromslice(p.subscriberList, o)
}

func (p *post) NotifyAll() {
	for _, subscriber := range p.subscriberList {
		subscriber.update(p.tittle)
	}
}

func removeFromslice(subscriberList []subscriber, observerToRemove subscriber) []subscriber {
	subscriberListLength := len(subscriberList)
	for i, subscriber := range subscriberList {
		if observerToRemove.getID() == subscriber.getID() {
			subscriberList[subscriberListLength-1], subscriberList[i] = subscriberList[i], subscriberList[subscriberListLength-1]
			return subscriberList[:subscriberListLength-1]
		}
	}
	return subscriberList
}
```

`subscriber_interface.go`
```
package observer

type subscriber interface {
	update(string)
	getID() string
}
```

`subscriber.go`
```
package observer

import "fmt"

type Subscriber struct {
	ID string
}

func (c *Subscriber) update(title string) {
	fmt.Printf("Notify to Subscriber %s for post: %s\n", c.ID, title)
}

func (c *Subscriber) getID() string {
	return c.ID
}
```

`client/main.go` 
```
package main

import (
	observer "github.com/giap9416/observer"
)

func main() {
	post := observer.NewPost("Golang Design Patterns: Observer")

	subscriber1 := &observer.Subscriber{ID: "subscriber1@gmail.com"}
	subscriber2 := &observer.Subscriber{ID: "subscriber2@gmail.com"}

	post.Register(subscriber1)
	post.Register(subscriber2)

	post.UpdateStatus()

}
```

Output:
```
go run client/main.go                                                                                                                     ✔  at 15:04:40 
New post published:  Golang Design Patterns: Observer
Notify to Subscriber subscriber1@gmail.com for post: Golang Design Patterns: Observer
Notify to Subscriber subscriber2@gmail.com for post: Golang Design Patterns: Observer
```

# Tài liệu tham khảo
https://refactoring.guru/
### Github repo:
https://github.com/giap9416/golang-design-patterns
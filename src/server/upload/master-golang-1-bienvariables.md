## **Biến (Variables)**
Trong phần đầu tiên của master golang thì giới thiệu về việc khai báo cũng như làm việc với biến trong golang.
Trước khi bắt đầu thì cần phải setup môi trường của ngôn ngữ golang nhé các bạn.

-----

### Biến (variables) là gì.
Biến được hiểu đơn giản nó là một cái tên được dùng trong phần mềm, khi biến được khai báo thì sẽ cấp phát vùng nhớ cho nó, mỗi biến có một type khác nhau.

### Khai báo biến.
**Khai báo một biến**
Cú pháp để khai váo biến trong go: *var tenbien type*
```
var username string
```
```
package main

import "fmt"

func main() {
	var username string // variable declaration
	fmt.Println("value:", username)
	var count int // variable declaration
	fmt.Println("count:", count)
}

```
[Run](https://go.dev/play/p/gJJM5NXNLHb)
phần var name string là khai báo một biến, với name là  *username* với kiểu type là string. Trong golang khi khai báo như vậy thì biến *username* đang có giá trị là "",  đối với biến *count* thì *type* là int thì giá trị được khởi tạo ban đầu bằng 0.
sau khi run kết quả là:
> value: 

> count: 0

**Khai báo nhiều biến**
 Chúng ta có thể khai báo nhiều biến bằng cách: 
 ```
 package main

import "fmt"

func main() {
	var username, address string // variable declaration
	fmt.Println("value1:", username, address)
	// or
	var (
		username2 string
		address2  string
	)
	fmt.Println("value2:", username2, address2)
}
 ```
 
[ Run](https://go.dev/play/p/HrehWlKLIx2)

**Khai báo biến ngắn**
```
package main

import "fmt"

func main() {
	username := ""
	fmt.Println("username:", username)
}
```
[Run](https://go.dev/play/p/9GsKee9WjiT)

### Khai báo biến có giá trị
```
package main

import "fmt"

func main() {
	var username, address string = "opendev", "ho chi minh" // variable declaration
	fmt.Println("value1:", username, address)
	// or
	var (
		username2 string = "opendev1"
		address2  string = "thu duc - ho chi minh"
	)
	fmt.Println("value2:", username2, address2)
}
```
[Run](https://go.dev/play/p/Cyqa3a4GYnr)

Kết quả: 
> value1: opendev ho chi minh
> 
> value2: opendev1 thu duc - ho chi minh

 Cảm ơn các bạn đã đọc
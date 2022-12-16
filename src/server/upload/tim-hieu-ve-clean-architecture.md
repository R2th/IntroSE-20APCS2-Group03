## 1.**Clean Architecture là gì?**

Clean Architecture được xây dựng dựa trên tư tưởng "độc lập" kết hợp với các nguyên lý thiết kế hướng đối tượng(đại diện tiêu biểu là Dependency Inversion). Độc lập ở đây nghĩa là việc project không bị phụ thuộc vào framework và các công cụ sử dụng trong quá trình kiểm thử.

Kiến trúc của Clean Architecture chia thành 4 layer với một quy tắc phụ thuộc. 
- Entities 
- Use Cases (Application business rules) 
- Interface Adapter
- Framework and Drivers

Các layer bên trong không nên biết bất kỳ điều gì về các layer bên ngoài. Điều này có nghĩa là nó có quan hệ phụ thuộc nên "hướng" vào bên trong. Có nghĩa là một layer chỉ có thể biết được các layer bên trong nó chứa gì. Nhìn vào hình vẽ minh họa sau đây:
 ![image.png](https://images.viblo.asia/b926dbd9-ca7e-4519-a05e-0bb21a767171.png)<div align="center"></div>
 
 ![image.png](https://images.viblo.asia/c10e98e7-999e-4336-8ebd-e2feafae922b.png)

**Entities**: là khái niệm dùng để mô tả các Business Logic. Đây là layer quan trọng nhất, là nơi bạn thực hiện giải quyết các vấn đề - mục đích khi xây dựng app. Hay nói cách khác là lớp Model. Đây là lớp trong cùng của kiến trúc Clean architecture. 

Cấu trúc Entity như sau:
![image.png](https://images.viblo.asia/a0a3e9f4-9b6f-4492-bf4b-8922c051b182.png)
Ở package trên, các entities gồm book, book_test, entity...

Ví dụ với user như sau:
```
package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
)

//User data
type User struct {
	ID        ID
	Email     string
	Password  string
	FirstName string
	LastName  string
	CreatedAt time.Time
	UpdatedAt time.Time
	Books     []ID
}

//NewUser create a new user
func NewUser(email, password, firstName, lastName string) (*User, error) {
	u := &User{
		ID:        NewID(),
		Email:     email,
		FirstName: firstName,
		LastName:  lastName,
		CreatedAt: time.Now(),
	}
	pwd, err := generatePassword(password)
	if err != nil {
		return nil, err
	}
	u.Password = pwd
	err = u.Validate()
	if err != nil {
		return nil, ErrInvalidEntity
	}
	return u, nil
}
```

Với entity này, chúng ta có các business như:
* Tạo 1 user mới với email, password, firstName, lastName.

**Use case** : chứa các rule liên quan trực tiếp tới ứng dụng cục bộ (application-specific business rules).

ví dụ: 
![image.png](https://images.viblo.asia/f6064580-5cbd-4d3c-b4a7-6b7d1e539752.png)

Các package trong usercase này sẽ triển khai các quy tắc của sản phẩm, ví dụ với quy tắc loan – cho mượn, file service.go sẽ như sau:
```
package loan

import (
	"github.com/eminetto/clean-architecture-go-v2/entity"
	"github.com/eminetto/clean-architecture-go-v2/usecase/book"
	"github.com/eminetto/clean-architecture-go-v2/usecase/user"
)

//Service loan usecase
type Service struct {
	userService user.UseCase
	bookService book.UseCase
}

//NewService create new use case
func NewService(u user.UseCase, b book.UseCase) *Service {
	return &Service{
		userService: u,
		bookService: b,
	}
}

//Borrow borrow a book to an user
func (s *Service) Borrow(u *entity.User, b *entity.Book) error {
	u, err := s.userService.GetUser(u.ID)
	if err != nil {
		return err
	}
	b, err = s.bookService.GetBook(b.ID)
	if err != nil {
		return err
	}
	if b.Quantity <= 0 {
		return entity.ErrNotEnoughBooks
	}

	err = u.AddBook(b.ID)
	if err != nil {
		return err
	}
	err = s.userService.UpdateUser(u)
	if err != nil {
		return err
	}
	b.Quantity--
	err = s.bookService.UpdateBook(b)
	if err != nil {
		return err
	}
	return nil
}

//Return return a book
func (s *Service) Return(b *entity.Book) error {
	b, err := s.bookService.GetBook(b.ID)
	if err != nil {
		return err
	}

	all, err := s.userService.ListUsers()
	if err != nil {
		return err
	}
	borrowed := false
	var borrowedBy entity.ID
	for _, u := range all {
		_, err := u.GetBook(b.ID)
		if err != nil {
			continue
		}
		borrowed = true
		borrowedBy = u.ID
		break
	}
	if !borrowed {
		return entity.ErrBookNotBorrowed
	}
	u, err := s.userService.GetUser(borrowedBy)
	if err != nil {
		return err
	}
	err = u.RemoveBook(b.ID)
	if err != nil {
		return err
	}
	err = s.userService.UpdateUser(u)
	if err != nil {
		return err
	}
	b.Quantity++
	err = s.bookService.UpdateBook(b)
	if err != nil {
		return err
	}

	return nil
}
```

Ở file trên các rule sau được triển khai:

* Mượn sách bởi 1 người dùng.
* Trả 1 cuốn sách bởi người dùng.

**Frameworks and Drivers layer**

Lớp ngoài cùng thường chứa các frameworks và tools như Database, Web Framework… Tuy nhiên cần chắc chắn về mức ưu tiên sử dụng các công cụ này trong project.

![image.png](https://images.viblo.asia/29152ba6-fa69-4f87-a6b0-e008665f40fd.png)

Ví dụ, với file infrastructure/repository/user_mysql.go, chúng ta triển khai các interface Repository của MySQL. Nếu chúng ta muốn chuyển đổi sang cơ sở dữ liệu mới, đây là nơi chuyển đổi.

**Interface Adapters layer**

Codes ở lớp này được thích ứng và chuyển đổi dữ liệu tới format được sử dụng bởi các entities và các use cases cho việc mở rộng bởi các tác nhân bên ngoài như như databases, web… Ở lớp Application, có 2 cách để truy cập tới các UseCases. Đầu tiên là các API và thứ 2 là các command line của ứng dụng CLI.

Cấu trúc của CLI đơn giản như sau:

![image.png](https://images.viblo.asia/8560c8aa-3fd8-484f-a00b-54528dcdd51c.png)

![image.png](https://images.viblo.asia/c266a71f-9911-45e8-96b7-c9490bcf33bd.png)

Package handler bao gồm các requests và responses, cũng như các quy tắc có sẵn của business ở usecases:

![image.png](https://images.viblo.asia/ff2530fa-8948-4123-bbba-1a9f0a2ebaec.png)
Cấu trúc API thường phức tạp hơn với 3 packages: handler, presenter và middleware.

![image.png](https://images.viblo.asia/7f5c6a1f-af07-4feb-b295-ce0a06fbca55.png)
Lớp presenters chịu trách nhiệm định dạng dữ liệu sinh ra giống như response bởi các handlers.
```
type User struct {
	ID        ID
	Email     string
	Password  string
	FirstName string
	LastName  string
	CreatedAt time.Time
	UpdatedAt time.Time
	Books     []ID
}
```
Nó sẽ được chuyển đổi thành:
```
type User struct {
	ID        entity.ID `json:"id"`
	Email     string    `json:"email"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
}
```
Điều này cho phép chúng ta kiểm soát 1 entity sẽ được cung cấp thông qua API.

Trong packages cuối cùng của API là các middlewares, được sử dụng bởi các endpoints:
![image.png](https://images.viblo.asia/b777b2a5-c1c3-4d28-967f-1c8abfc6b2d4.png)

**Support packages**

Chúng là các packages cung cấp các hàm dùng chung như mã hóa, logging, xử lý files,… Chúng là các tính năng không thuộc domain của ứng dụng, và tất cả các lớp đều có thể sử dụng chúng. Ngay cả các ứng dụng khác cũng có thể import và sử dụng các packages này.
![image.png](https://images.viblo.asia/27336830-3f17-42b3-8392-7401c28b1eb3.png)


## 2.**Lợi ích của Clean Architecture**
Clean Architecture mang lại những lợi ích sau:
- Mạch lạc - dễ xem (bản gốc ghi screaming với dụng ý là chỉ cần nhìn cấu trúc package cũng có thể hiểu được mục đích và cơ chế hoạt động của ứng dụng)
- Linh hoạt - thể hiện ở khả năng độc lập, không phụ thuộc vào framework, database, application server.
- Dễ kiểm thử - testable

## 2.**Hạn chế của Clean Architecture**
Bên cạnh những lợi ích trên thì Clean Architecture còn những hạn chế sau:

- Không thể sử dụng framework theo cách mỳ ăn liền- do luật dependency inversion.
- Khó áp dụng
- Indirect - quá nhiều interface?
- Cồng kềnh - thể hiện ở việc có quá nhiều class so với các project cùng mục tiêu (tuy nhiên các class được thêm vào đều có chủ ý và đáp ứng đúng quy định khi triển khai kiến trúc)


Bài viết của mình được tổng hợp bởi các nguồn liên quan, hy vọng các bạn có thế hiểu thêm về Clean Architecture. Chúc mọi người ngày làm việc vui vẻ. 

Tham khảo:
- https://techmaster.vn/posts/34271/kien-truc-sach-clean-architecture
- https://viblo.asia/p/clean-architecture-Ljy5VMYzlra
- https://topdev.vn/blog/2-lap-trinh-golang-an-xoi-clean-architecture/
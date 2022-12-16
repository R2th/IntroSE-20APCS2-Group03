Mẫu pattern cuối cùng thuộc Creational Pattern trong series Design Patterns mà mình muốn giới thiệu. Cũng xoay quanh việc khởi tạo đối tượng, nhưng không phức tạp như các mẫu thiết kế cùng loại, ta tận dụng lại những đối tượng đã có sẵn để phục vụ cho việc khởi tạo. Chi tiết về mẫu thiết kế này mình sẽ nói sau đây.

## I. Prototype - Creational Patterns
![](https://images.viblo.asia/24e522e9-aa6d-4a3a-886e-02636fcb191d.png)


Mục tiêu của Prototype hướng tới những đối tượng đã được khởi tạo trước đó (như tại thời điểm compile) và cho phép chúng ta `clone` đối tượng đó không giới hạn số lần vào thời điểm runtime chẳng hạn. Lấy ví dụ khi build một trang web gồm 3 thành phần header-body-footer, sẽ có rất nhiều trang chỉ cần thay đổi nội dung ở phần body, và phần header và footer là như nhau. Khi đó prototype sẽ giúp chúng ta tiết kiệm chi phí và thời gian cho việc khởi tạo lại header và footer.

## II. Prototype mang lại cho developers những gì?
Tránh lặp đi lặp lại việc khởi tạo không đáng có, đó là những gì mà mẫu thiết kế này mang lại. Thử tưởng tượng header của trang chứa rất nhiều thông tin lấy từ API, việc chuyển trang đồng nghĩa phải đi fetch lại toàn bộ thông tin thì quả là dư thừa không đáng có. Một cách tóm tắt, Prototype hướng đến:
- Những đối tượng thường được tái sử dụng có chi phí khởi tạo cao và (có thể), cung cấp default value cho chúng
- Giảm tiêu tốn tài nguyên cho việc khởi tạo phức tạp (CPU, resources...)

## III. Ví dụ thực tế
Chúng ta lấy luôn ví dụ ở trên để triển khai nhé. Bài toán đặt ra là 1 trang web bao gồm 3 routes: 
- /login (không header và footer)
- /home (có header và footer)
- /profile (có header và footer)
Dễ nhận thấy ở đây có 2 dạng layout Blank Và Main (mình hay đặt tên vậy 😂). Blank thì đơn thuần là một layout chỉ chứa content (body). Main là một layout chứa 3 phần header - body (dynamic) - footer. 

Mẫu Prototype áp dụng vào trường hợp này cần tuân thủ những quy tắc sau:
- Có 2 layouts (Blank và Main), layout luôn yêu cầu tham số truyền vào là body (content của trang)
- Khi yêu cầu chuyển trang trong cùng 1 layout (home -> profile), đối tượng trang mới được tạo ra nhưng header và footer là những instance được tận dụng lại
- Một Page Info sẽ bao gồm các thông tin của page là route, header, body, footer (mặc định là nil)

## IV. Implementation

Khởi tạo struct Layout như sau, layout bao gồm 3 thành phần (header, body, footer). Một Layout bao gồm các methods SetBody, GetInfo và 2 layouts được phép clone là `Blank` và `Main`
```layout.go
package prototype

import "fmt"

type Layout struct {
	Header *string
	Body   string
	Footer *string
}

const (
	BLANK_LAYOUT = "BLANK"
	MAIN_LAYOUT  = "MAIN"
)

func (s *Layout) SetBody(body string) {
	s.Body = body
}

func (s *Layout) GetInfo() string {
	header, footer := "empty", "empty"
	if s.Header != nil {
		header = *s.Header
	}
	if s.Footer != nil {
		footer = *s.Footer
	}
	return fmt.Sprintf("Layout: Header: %s, Body: %s, Footer: %s", header, s.Body, footer)
}

```

- Blank Layout bao gồm các thành phần từ Layout và một instance mặc định (header và footer nil)

```blank_layout.go
package prototype

type BlankLayout struct {
	Layout
}

var BlankLayoutIns *Layout = &Layout{
	Header: nil,
	Body:   "Blank Body",
	Footer: nil,
}

```

- Với Main Layout thì phức tạp hơn, để khởi tạo header của Main Layout phải trả qua một vài công đoạn như fetch data từ API, xử lý logic...và việc khởi tạo mất tầm 1s:
```main_layout.go
package prototype

import "fmt"

type MainLayout struct {
	Layout
}

var MainLayoutIns *Layout = &Layout{
	Header: getHeader(),
	Body:   "Main Body",
	Footer: getFooter(),
}

func getHeader() *string {
	fmt.Println("Getting header data, it took 1 second...")
	header := "Main Header"
	return &header
}

func getFooter() *string {
	footer := "Main Footer"
	return &footer
}

```

- Sau cùng là định nghĩa struct cho Page, bao gồm route, layout và các method NewPage và GetInfo. Ở đây NewPage nhận vào tham số là route và pageLayout, ở đây mình đưa công việc clone layout vào: 
```page.go
package prototype

import (
	"errors"
	"fmt"
)

type Page struct {
	Route string
	Layout
}

func NewPage(route, layout string) *Page {
	layoutClone, err := cloneLayout(layout)
	if err != nil {
		panic(err)
	}
	return &Page{
		Route:  route,
		Layout: *layoutClone,
	}
}

func cloneLayout(layout string) (*Layout, error) {
	switch layout {
	case BLANK_LAYOUT:
		newLayout := *BlankLayoutIns
		return &newLayout, nil
	case MAIN_LAYOUT:
		newLayout := *MainLayoutIns
		return &newLayout, nil
	default:
		return nil, errors.New("Layout not found")
	}
}

func (s *Page) GetInfo() string {
	return fmt.Sprintf("Page route: %s, %s", s.Route, s.Layout.GetInfo())
}

```

- Bây giờ mình sẽ run đoạn code theo yêu cầu bài toán, bao gồm 3 route: `/home`, `/profile` và `/login`. Đảm bảo layout instance không bị ảnh hưởng trong quá trình clone:
```main.go
/*
    Example Prototype
*/
fmt.Println("*** Example Prototype ***")
homePage := prototype.NewPage("/home", prototype.MAIN_LAYOUT)
homePage.SetBody("Home Body")
fmt.Println(homePage.GetInfo())

profilePage := prototype.NewPage("/profile", prototype.MAIN_LAYOUT)
fmt.Println(profilePage.GetInfo())
profilePage.SetBody("Profile Body")
fmt.Println(profilePage.GetInfo())

loginPage := prototype.NewPage("/login", prototype.BLANK_LAYOUT)
fmt.Println(loginPage.GetInfo())
fmt.Print("*** End of Prototype ***\n\n\n")
```

- Kết quả:

![image.png](https://images.viblo.asia/506832c9-c89d-4211-b295-c6631c8c2360.png)


## V. Lời kết

Prototype design pattern được xem như một công cụ hỗ trợ mạnh mẽ cho việc khởi tạo nhanh những đối tượng mà tiết kiệm được rất nhiều thời gian và tài nguyên, cũng có thể xem prototype như một build caches. Có thể thấy được sự trùng lặp trong cách triển khai giữa các mẫu creational design patterns, nhưng vẫn có những sự khác biệt nhỏ khiến các pattern này thể hiện sức mạnh nếu được sử dụng đúng cách. 

Mình cũng giới thiệu qua toàn bộ 5 mẫu thiết kế thuộc nhóm khởi tạo thường được developers sử dụng nhất. Hi vọng gặp các bạn ở các chapers khác

Cảm ơn các bạn đã xem bài viết 😄


## VI. References

Go Design Patterns (Mario Castro Contreras)

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy lấn cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

[Đồng đội Senior Backend Engineer.](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022)

[Đồng đội Senior Frontend Engineer.](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021)

[Đồng đội Junior Backend Engineer.](https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067)

[Đồng đội Junior Frontend Engineer.](https://tuyendung.hoang-phuc.com/job/junior-frontend-engineer-1068)
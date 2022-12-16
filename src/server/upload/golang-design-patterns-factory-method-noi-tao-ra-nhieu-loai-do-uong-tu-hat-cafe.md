## I. Factory Method - Creational Patterns

![](https://images.viblo.asia/2e544e62-7c35-43eb-8612-aceba67cf66d.png)

Mẫu thiết kế Factory Method (gọi là Factory cho gọn cũng được) cũng là design pattern rất thường được sử dụng trong các dự án thực tế. Mục đích của Factory đưa người dùng tránh xa việc khởi tạo phức tạp của đối tượng bằng cách `abstraction` công việc đó, và cung cấp những gì người dùng cần như lấy data từ một nguồn cụ thể, từ web service, database...

Cụ thể hơn, Factory Method tạo ra một `higher layer` , nơi tập trung cho việc khởi tạo các đối tượng, chúng ta uỷ thác (delegate) việc khởi tạo các loại đối tượng có tính chất tương đồng với nhau cho layer này thay vì phải xử lý ngay tại đối tượng đó. Giống như việc đầu tư tài chính (stock hay cryptocurrency) thông qua bot AI vậy, mình không phải bận tâm việc mua về cổ phiếu của công ty nào hay đồng coin nào cả, cứ để mấy con bot làm hết nhé 😄.

## II. Factory Method mang lại cho developers những gì?
Sơ qua một vài điều trên thì mình tóm tắt lại cho các bạn những ý chính sau mà mẫu thiết kế này mang lại:
- Factory đem tất cả các công việc khởi tạo đối tượng đi một nơi khác (object khác, package khác) mà không để nó nằm ở chính nơi định nghĩa nó.
- Tất cả đều giao tiếp qua interface mà không phải trực tiếp đi vào công đoạn khởi tạo cụ thể nào cả.
- Gom nhóm những loại đối tượng tương đồng với nhau về khía cạnh nào đó (cappuccino và latte đều được làm từ hạt cafe).

## III. Ví dụ thực tế
Đưa ra một bài toán cụ thể để chúng ta dễ hình dung nhé. Bây giờ chúng ta cần triển khai một máy pha thức uống từ cafe, chiếc máy này có thể làm ra cappuccino và latte tự động cho khách hàng, trên mỗi ly thức uống sẽ có tên của chúng. Mình sẽ đặt tên cho dễ nhớ vậy, gọi máy pha thức uống từ cafe là CoffeeBarFactory, các đối tượng Cappuccino và Latte đều gọi chung là CoffeeDrink - có chung một method là GetName implement từ một interface ICoffeeDrink.

Trước khi đi vào coding thì mình sẽ nói sơ qua một vài điều cần chú ý khi sử dụng Factory Method:
- Mọi đồ uống (Cappuccino, Latte,...) gọi chung là CoffeeDrink đều cần implement interface ICoffeeDrink, ở đây cụ thể là GetName.
- Chúng ta uỷ thác mọi việc khởi tạo đối tượng đồ uống cho CoffeeBarFactory.
- Được phép bổ sung nhiều loại đồ uống khác từ cafe thông qua CoffeeBarFactory.

## IV. Implementation
Trước tiên define struct CoffeeDrink và interface ICoffeeDrink. Struct CoffeeDrink sẽ implement method đã được định nghĩa ở ICoffeeDrink.

```coffee_drink.go
package factory_method

type CoffeeDrink struct {
	name string
}

func (me *CoffeeDrink) GetName() string {
	return me.name
}
```


```go
package factory_method

type ICoffeeDrink interface {
	GetName() string
}
```

Tiếp đến chúng ta sẽ định nghĩa đối tượng Cappuccino và Latte, theo kèm đó là creation function của chúng, lưu ý những function này là private, giấu đi các việc khởi tạo của chúng với bên ngoài.

```cappuccino.go
package factory_method

type Cappuccino struct {
	CoffeeDrink
}

func newCappuccino() *Cappuccino {
	return &Cappuccino{
		CoffeeDrink: CoffeeDrink{
			name: "Cappuccino",
		},
	}
}

```

```latte.go
package factory_method

type Latte struct {
	CoffeeDrink
}

func newLatte() *Latte {
	return &Latte{
		CoffeeDrink: CoffeeDrink{
			name: "Latte",
		},
	}
}

```

Cuối cùng là CoffeeBarFactory, ở đây để đơn giản nhất, mình chỉ define một function có tên là GetCoffeeDrink, đương nhiên đây là public accessor function:

```coffee_bar_factory.go
package factory_method

import "fmt"

const (
	latteName      = "Latte"
	cappuccinoName = "Cappuccino"
)

func GetCoffeeDrink(name string) (ICoffeeDrink, error) {
	switch name {
	case latteName:
		return newLatte(), nil
	case cappuccinoName:
		return newCappuccino(), nil
	default:
		return nil, fmt.Errorf("unknown coffee drink: %s", name)
	}
}

```

Vậy là đủ rồi, chúng ta chạy thử chương trình sample nhé:

```main.go
cappuccino, err := factory_method.GetCoffeeDrink("Cappuccino")
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(cappuccino.GetName())
	}

	latte, err := factory_method.GetCoffeeDrink("Latte")
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(latte.GetName())
	}

	_, err = factory_method.GetCoffeeDrink("Error")
	if err != nil {
		fmt.Println(err)
	}
```

Kết quả:

![image.png](https://images.viblo.asia/836988e0-cfa9-46aa-b00c-1a7a24f409f1.png)

## V. Lời kết
Qua ví dụ ở trên, các bạn đã hình dung được rõ chức năng của design pattern Factory Method rồi, đó là gom nhóm các đối tượng cùng loại và đưa việc khởi tạo (outside of scope). Bên cạnh đó, việc thêm nhiều loại `CoffeeDrink` sẽ không còn quá phức tạp nữa.

À, ở trên mình ví dụ thôi nhé, không có con bot nào trade lời cho các bạn đâu, như crypto thì chỉ có CZ là con bot AI đó thôi 😄 (just kidding). Cảm ơn các bạn đã xem bài viết .

## VI. References
 Go Design Patterns (Mario Castro Contreras)

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).
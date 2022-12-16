## I. Abstract Factory - Creational Patterns

![Thiết kế chưa có tên (2).png](https://images.viblo.asia/aa188a52-4a6d-437c-85be-d37b52c046fd.png)

Nếu chúng ta đã biết được mẫu thiết kế [Factory](https://viblo.asia/p/golang-design-patterns-factory-method-noi-tao-ra-nhieu-loai-do-uong-tu-hat-cafe-y3RL12ynVao) là như thế nào, thì hôm nay mình xin giới thiệu với các bạn design pattern bao quát hơn nữa, chính là Absract Factory.

Mục đích chính của mẫu thiết kế này là gom nhóm các Factory thành một Factory lớn, thứ có thể hoán đổi và mở rộng một cách dễ dàng hơn. Thường trong giai đoạn đầu của việc plan, define về chức năng mà các Factory có thể có, việc chúng ta thao tác và chỉ quan tâm đến các factories và abstract factories sẽ là một hướng tiếp cận dễ dàng hơn so với việc đợi define đầy đủ chi tiết cho chúng. Nhưng để triển khai pattern này, chúng ta cũng cần quan tâm những thứ mà mình sẽ nói trong bài viết sau nhé 😄

## II. Abstract Factory mang lại cho developers những gì?
Pattern này giúp chúng ta gom nhóm các đối tượng liên quan khi số lượng đối tượng có thể tăng lên mà ta không thể kiểm soát trong giai đoạn phát triển, bằng cách tạo ra một unique point, nơi có thể tạo ra tất cả các đối tượng đó: 
- Tạo ra một lớp mới `đóng gói` các Factory Method và trả về một common interface cho toàn bộ fatories.
- Gom nhóm các common factories vào một `super Factory`, hay còn được gọi là Factory của những Factories.

## III. Ví dụ thực tế
Chúng ta sẽ quay lại với ví dụ trong bài [Builder Design Pattern](https://viblo.asia/p/golang-design-patterns-builder-khoi-tao-nhung-doi-tuong-phuc-tap-bang-phuong-phap-step-by-step-PwlVm0zPL5Z), nhưng có một vài yêu cầu đặc biệt hơn, chúng ta đến một cửa hàng bán xe để mua 1 chiếc xe máy và 1 chiếc xe đạp. Cửa hàng này có các loại xe sau:

- Xe đạp có 2 loại: xe đạp bình thường và xe đạp thể thao
- Xe máy có 2 loại: xe 125cc và 150cc
<br>
<br>

Để triển khai Abstract Factory dựa trên đối tượng Vehicle của mẫu Factory Method trước đó, chúng ta cần tuân thủ các nguyên tắc sau:
- Chúng ta luôn tạo Vehicle bằng cách sử dụng factory được trả về từ abstract factory
- Một đối tượng xe luôn là 1 trong 2 đối tượng Bicycle (implement Vehicle + Bicycle) hoặc Motorbike (implement interface Vehicle + Motorbike)


## IV. Implementation
Theo đề bài, chúng ta cần phải tạo những đối tượng như sau:
- Vehicle: là một interface mà tất cả các đối tượng factory cần phải implement:
    + Bicycle: Một interface bao gồm 2 loại xe đạp NormalBicycle - xe đạp thường và SportBicycle - xe đạp thể thao
    + Motorbike: interface của xe máy gồm xe máy Motor125CC và Motor150CC
<br>
<br>
- VehicleFactory: là interface (abstract interface mà chúng ta đang quan tâm) để tạo ra các factories triển khai phương thức của nó:
    + BicycleFactory: là factory implement VehicleFactory interface và trả về đối tượng vehicle, đối tượng này bắt buộc phải implement các phương thức của interface Vehicle và Bicycle
    + MotorbikeFactory: tương tự như trên, chỉ khác là các đối tượng vehicle này phải triển khai các phương thức từ interface Vehicle và Motorbike

<br>
<br>
Bắt đầu với Golang thôi nào ^^

Chúng ta sẽ tạo các entity ở trên bằng những file riêng biệt. Đầu tiên là `Vehicle` interface trong file vehicle.go
```vehicle.go
package abstract_factory

type Vehicle interface {
	NumWheels() int
	NumSeats() int
}

```

Bicycle interface và MotorBike interface sẽ được tạo trong file bicyle.go và motorbike.go, tương ứng như sau:
```bicycle.go
package abstract_factory

type Bicycle interface {
	GetType() int
}
```
```motorbike.go
package abstract_factory

type Motorbike interface {
	GetCC() string
}
```


Chúng ta có một interface cuối cùng, nơi mà tất cả các factory đều phải triển khai đó là VehicleFactory trong file vehicle_factory.go, interface này cung cấp 1 method duy nhất (được xem như chức năng của cửa hàng bán xe là lấy xe giao cho khách 😄)
```vehicle_factory.go
package abstract_factory

type VehicleFactory interface {
	NewVehicle(v int) (Vehicle, error)
}

```


Bây giờ tới gian đoạn triển khai các đối tượng nhỏ hơn, ta bắt đầu với BicycleFactory và MotorbikeFactory nhé, vì đoạn này implement như mẫu Factory trong bài trước nên các bạn đọc qua sẽ hiểu, mình không nói chi tiết nữa. Với BicycleFactory:
```bicycle_factory.go
package abstract_factory

import (
	"errors"
	"fmt"
)

const (
	NormalBicycleType = 1
	SportBicycleType  = 2
)

type BicycleFactory struct{}

func (c *BicycleFactory) NewVehicle(v int) (Vehicle, error) {
	switch v {
	case NormalBicycleType:
		return new(NormalBicycle), nil
	case SportBicycleType:
		return new(SportBicycle), nil
	default:
		err := fmt.Sprintf("Vehicle of type %d not recognized\n", v)
		return nil, errors.New(err)
	}
}

```

```normal_bicycle.go
package abstract_factory

type NormalBicycle struct{}

func (*NormalBicycle) GetType() string {
	return "Normal Bicycle"
}

func (*NormalBicycle) NumWheels() int {
	return 2
}

func (*NormalBicycle) NumSeats() int {
	return 1
}

```

```sport_bicycle.go
package abstract_factory

type SportBicycle struct{}

func (*SportBicycle) GetType() string {
	return "Sport Bicycle"
}

func (*SportBicycle) NumWheels() int {
	return 1
}

func (*SportBicycle) NumSeats() int {
	return 1
}

```

Và MotorbikeFactory:
```motorbike_factory.go
package abstract_factory

import (
	"errors"
	"fmt"
)

const (
	Motorbike125CCType = 1
	Motorbike150CCType = 2
)

type MotorbikeFactory struct{}

func (c *MotorbikeFactory) NewVehicle(v int) (Vehicle, error) {
	switch v {
	case Motorbike125CCType:
		return new(Motorbike125CC), nil
	case Motorbike150CCType:
		return new(Motorbike150CC), nil
	default:
		err := fmt.Sprintf("Vehicle of type %d not recognized\n", v)
		return nil, errors.New(err)
	}
}



```


```motorbike_125cc.go
package abstract_factory

type Motorbike125CC struct{}

func (*Motorbike125CC) GetCC() string {
	return "125cc"
}

func (*Motorbike125CC) NumWheels() int {
	return 2
}

func (*Motorbike125CC) NumSeats() int {
	return 2
}

```

```motorbike_150cc.go
package abstract_factory

type Motorbike150CC struct{}

func (*Motorbike150CC) GetCC() string {
	return "150cc"
}

func (*Motorbike150CC) NumWheels() int {
	return 2
}

func (*Motorbike150CC) NumSeats() int {
	return 2
}

```

Và cuối cùng, chúng ta cần abstract các factory trên, và tạo ra một `unique point` như đầu bài viết mình có nhắc đến, phục vụ cho việc tạo ra cách đối tượng vehicle. Chúng ta triển khai function này trong file vehicle_factory.go đã được tạo phía trên luôn nhé:

``` vehicle_factory.go
package abstract_factory

import (
	"errors"
	"fmt"
)

type VehicleFactory interface {
	NewVehicle(v int) (Vehicle, error)
}

const (
	BicycleFactoryType   = 1
	MotorbikeFactoryType = 2
)

func BuildFactory(f int) (VehicleFactory, error) {
	switch f {
	case BicycleFactoryType:
		return new(BicycleFactory), nil
	case MotorbikeFactoryType:
		return new(MotorbikeFactory), nil
	default:
		err := fmt.Sprintf("Factory with id %d not recognized\n", f)
		return nil, errors.New(err)
	}

}

```


Có đầy đủ tất cả rồi, chúng ta chạy chương trình trong main.go:
```main.go
func main() {
	/*
		Example Abstract Factory
	*/
	fmt.Println("*** Example Abstract Factory ***")

	bicycleFactory, err := abstract_factory.BuildFactory(abstract_factory.BicycleFactoryType)
	if err != nil {
		fmt.Println("Error: ", err)
	}

	sportBicycle, err := bicycleFactory.NewVehicle(abstract_factory.SportBicycleType)
	if err != nil {
		fmt.Println("Error: ", err)
	}

	fmt.Println("Sport Bicycle:")
	fmt.Printf("Vehicle has %d wheels, %d seats.\n", sportBicycle.NumWheels(), sportBicycle.NumSeats())

	fmt.Print("*** End of Abstract Factory ***\n\n\n")

}

```

Kết quả:
![image.png](https://images.viblo.asia/102c5044-02e2-44aa-b2cb-cb6d50818c67.png)

## V. Lời kết
Qua bài viết của mình, các bạn đã hiểu được cách tạo ra factory từ những factories rồi, mẫu thiết kế này thường được dùng nhiều trong các ứng dụng, thư viện đa nên tảng như GUI libraries. Lấy ví dụ đơn giản nhất là `button`, một đối tượng rất chung, và một button factory giúp bạn tạo ra các factory trên các OS khác nhau như Microsoft Windows buttons hay Mac OS X buttons. Chúng ta không cần quan tâm phần triển khai cụ thể trên từng platform, hệ điều hành,... Công việc của chúng ta chỉ cần định nghĩa một vài action đặc biệt phải có của một button mà thôi.

Việc tạo ra các đối tượng, có thể tiếp cận bằng nhiều phương pháp khác nhau. Như ở bài viết Buider Design Pattern, mình tạo ra Bicycle và MotorBike từ 1 factory duy nhất, nhưng ở bài viết này, mình đã mở rộng nó ra, và chúng ta có thể thấy được việc customize những đối tượng mới thêm vào sẽ dễ dàng hơn rất nhiều. Tuy nhiên, không có mẫu thiết kế nào là tối ưu hơn mẫu thiết kế nào cả, tất cả là phụ thuộc và business, vào chính bạn ^^

Cảm ơn các bạn đã xem bài viết.

## VI. References
 Go Design Patterns (Mario Castro Contreras)

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

[Đồng đội Senior Backend Engineer.](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022)

[Đồng đội Senior Frontend Engineer.](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021)

[Đồng đội Junior Backend Engineer.](https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067)

[Đồng đội Junior Frontend Engineer.](https://tuyendung.hoang-phuc.com/job/junior-frontend-engineer-1068)
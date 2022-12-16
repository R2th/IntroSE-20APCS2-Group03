## I. Builder - Creational Patterns
- Một cách tổng quan hơn, Builder được sinh ra để: `reusing an algorithm to create many implementations of an interface`. Design Pattern này giúp chúng ta xây dựng các đối tượng phức tạp mà không cần trực tiếp khởi tạo cấu trúc hoặc implement ngay lập tức các logic mà đối tượng yêu cầu. 
- Hình dung chúng ta có một đối tượng phức tạp với hàng tá fields/methods bên trong, và một vài đối tượng khác cũng sở hữu số lượng fields/methods nhiều như vậy. Sẽ thật khó khăn nếu phải implements toàn bộ constructor cho những đối tượng đó, và ngay tại lúc development, chúng ta hoàn toàn không biết được số lượng loại object có thể được tạo ra. Khi đó Builder Pattern sẽ giúp ích cho chúng ta.

## II. Khi nào nên sử dụng Builder
- Mình sẽ cho một trường hợp cụ thể để các bạn dễ hình dung nhé. Để tạo ra xe đạp và xe máy, người ta phải trải qua rất nhiều công đoạn như build khung sườn, build bánh xe, build chỗ ngồi...Ở đây chúng ta hoàn toàn có thể tận dụng lại các step đã define trước đó dành cho xe đạp, mà không cần phải define lại toàn bộ cho xe máy
- Quay về định nghĩa, Builder design pattern cố gắng adapt những điều sau:
    + Trừu tượng hoá những khởi tạo đối tượng phức tạp
    + Tạo đối tượng một cách `step by step`, nghĩa là ngay lần đầu khởi tạo, đối tượng chắc chắn sẽ chưa hoàn chỉnh, chúng ta có thể tuỳ ý custom bằng cách `build` thêm các fields/thuộc tính vào đó
    + Tái sử dụng các công đoạn khởi tạo từ các đối tượng riêng biệt
    
## III. Ví dụ thực tế
Tiếp tục với ví dụ ở trên, mình sẽ tạo ra 1 đối tượng là Vehicle builder và một đối tượng duy nhất là `ManufacturingDirector` với chức năng nhận vào builders (Bicycle or Motorbike)  và constructs products. Với những nguyên tắc sau: 
   - Chúng ta có manufacturing type để define cấu trúc những thứ mà Vehicle cần
- Khi sử dụng bicycle builder, đối tượng `VehicleProduct` bao gồm 2 bánh xe, 1 chỗ ngồi, 1 structure field với type là `Bicycle` sẽ được trả về.
- Khi sử dụng motorbike builder, đối tượng `VehicleProduct` bao gồm 2 bánh xe,  2 chỗ ngồi, 1 structure field với type là `Motorbike`được trả về.
- Đối tượng `VehicleProduct` được tạo ra từ `Build Process` builder luôn phải được open to modifications.
    
## IV. Implementation
- Trước tiên chúng ta define VehicleProduct struct, bao gồm các thuộc tính Wheels, Seats, Structure:
```
// vehicle_product.go
package builder

type VehicleProduct struct {
	Wheels    int
	Seats     int
	Structure string
}
```
- Kế đến, để tạo ra một Vehicle, ta cần define một common process, ở đây mình tạo ra:
```
// build_process.go
package builder

type BuildProcess interface {
	SetWheels() BuildProcess
	SetSeats() BuildProcess
	SetStructure() BuildProcess
	GetVehicle() VehicleProduct
}
```
  - BuildProcess bao gồm các method SetWheels, SetSeats, SetStructure, các method này thể hiện các công việc cần làm để build một Vehicle, lưu ý rằng return type của các method này luôn là BuildProcess. Thêm vào đó có `GetVehicle`, đơn giản chỉ để get thông tin Vehicle mà thôi.
  - Tiếp theo là BicycleBuilder
```
// bicycle_builder.go
package builder

type BicycleBuilder struct {
	v VehicleProduct
}

func (c *BicycleBuilder) SetWheels() BuildProcess {
	c.v.Wheels = 2
	return c
}
func (c *BicycleBuilder) SetSeats() BuildProcess {
	c.v.Seats = 1
	return c
}
func (c *BicycleBuilder) SetStructure() BuildProcess {
	c.v.Structure = "Bicycle"
	return c
}
func (c *BicycleBuilder) GetVehicle() VehicleProduct {
	return c.v
}

```
- và MotorbikeBuilder
```

// motorbike_builder.go
package builder

type MotorbikeBuilder struct {
	v VehicleProduct
}

func (c *MotorbikeBuilder) SetWheels() BuildProcess {
	c.v.Wheels = 2
	return c
}
func (c *MotorbikeBuilder) SetSeats() BuildProcess {
	c.v.Seats = 2
	return c
}
func (c *MotorbikeBuilder) SetStructure() BuildProcess {
	c.v.Structure = "Motorbike"
	return c
}
func (c *MotorbikeBuilder) GetVehicle() VehicleProduct {
	return c.v
}

```
- Tiếp theo, như ví dụ nói ở phần trước, chúng ta define một đối tượng `ManufacturingDirector`, chịu trách nhiệm nhận vào một Vehicle Builder và construct những common step để cấu thành một Vehicle cơ bản nhất:
```
// manufacturing_director.go
package builder

type ManufacturingDirector struct {
	builder BuildProcess
}

func (f *ManufacturingDirector) SetBuilder(b BuildProcess) {
	f.builder = b
}
func (f *ManufacturingDirector) Construct() {
	f.builder.SetSeats().SetStructure().SetWheels()
}
```
- Run it: 
```
// main.go
manufacturingVehicle := builder.ManufacturingDirector{}
bicycleBuilder := &builder.BicycleBuilder{}

manufacturingVehicle.SetBuilder(bicycleBuilder)
manufacturingVehicle.Construct()

bicycle := bicycleBuilder.GetVehicle()
fmt.Printf("Vehicle is %s has %d wheels, %d seats.", bicycle.Structure, bicycle.Wheels, bicycle.Seats)
```

- Kết quả: 
![image.png](https://images.viblo.asia/b0ec0b11-5425-408a-895a-062d9865bd63.png)

## V. Lời kết
- Builder Pattern vẫn giúp chúng ta kiểm soát tốt cho dù có bao nhiêu loại Vehicle được sinh ra sau này. Quá trình construct luôn được trừu tượng hoá với user, user sẽ không biết được logic phức tạp khi khởi tạo một Vehicle.
- Hơn nữa, việc define một structure rõ ràng sẽ giúp các developers tuân thủ đúng các step/process được định nghĩa trước đó ở `BuildProcess`

Cảm ơn các bạn đã đọc ^^

Source code: https://github.com/khaaleoo/golang-design-patterns

## VI. References
- Go Design Patterns (Mario Castro Contreras)

## Team mình đã cải thiện website Hoàng Phúc từ 1 điểm Google lên 90 điểm như thế nào?
Đây là bài viết mà mình để tiêu đề trước và hy vọng sẽ viết được bài này trong tương lai. Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 40 điểm, và mục tiêu là 90 điểm, để đáp ứng được nhu cầu của nhiều khách hàng nhất có thể. Bọn mình làm được điều đó không phải vì kĩ thuật giỏi hay gì hết, mà là có những đồng đội mà sẵn sàng hỗ trợ nhau và sự dẫn dắt của hai sếp cực giỏi, những thành viên trong team bọn mình có thể không phải giỏi về chuyên môn kỹ thuật nhất nhưng chắc chắn là sẽ tạo ra được hiệu quả cao nhất. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tưởng tượng bạn là những người đầu tiên góp phần xây dựng cho một hệ thống lớn như thế. Hãy tham gia với bọn mình nhé.

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).
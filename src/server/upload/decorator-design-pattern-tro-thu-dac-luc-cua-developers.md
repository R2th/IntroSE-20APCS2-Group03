![](https://images.viblo.asia/686b8487-1108-4802-94da-47b4207ec33b.png)

## 1. Giới thiệu
* Phân loại: Structural pattern
* Bí danh: Wrapper
* Mục đích: Mở rộng tính năng của một object tại run-time, decorator cung cấp một sự thay thế linh hoạt cho subclass để mở rộng tính năng của object
* Tần suất sử dụng: bình thường
## 2. Mục đích ra đời
Hãy tưởng tượng rằng bạn đang làm việc với một thư viện thông báo cho phép các chương trình khác thông báo cho người dùng của họ về các sự kiện quan trọng.

Phiên bản ban đầu của thư viện dựa trên lớp Notifier chỉ có một số trường, một hàm tạo và một phương thức gửi duy nhất. Phương thức này có thể chấp nhận một đối số thông báo từ một ứng dụng khách và gửi thông báo đến một danh sách các email đã được chuyển đến trình thông báo thông qua hàm tạo của nó. Một ứng dụng của bên thứ ba hoạt động như một ứng dụng khách phải được tạo và cấu hình đối tượng trình thông báo một lần và sau đó sử dụng nó mỗi khi có điều gì đó quan trọng xảy ra.
![](https://images.viblo.asia/f38f196d-29bc-49b3-b080-906b56c4b7c8.png)

Một lúc nào đó, bạn nhận ra rằng người dùng thư viện không chỉ muốn nhận thông báo qua email. Nhiều người còn muốn nhận được tin nhắn từ SMS, Facebook, Slack…
![](https://images.viblo.asia/92a307f5-7bbf-4dd8-ae0f-c39d95d2d83b.png)

Bạn đã mở rộng lớp Notifier và đưa các phương thức thông báo bổ sung vào các lớp con mới. Bây giờ ứng dụng khách phải khởi tạo lớp thông báo mong muốn và sử dụng nó cho tất cả các thông báo tiếp theo.

Nhưng sau đó, ai đó đã hỏi bạn một cách hợp lý rằng: “Tại sao bạn không thể sử dụng nhiều loại thông báo cùng một lúc?”

Bạn đã cố gắng giải quyết vấn đề đó bằng cách tạo các lớp con đặc biệt kết hợp nhiều phương thức thông báo trong một lớp. Tuy nhiên, nhanh chóng trở nên rõ ràng rằng cách tiếp cận này sẽ làm source code của bạn trở nên nhiều và phức tạp ở mức không cần thiết, không chỉ ở thư viện mà còn ở người sử dụng
![](https://images.viblo.asia/227e067f-40b8-4005-bb45-a4635addd199.png)

Decorator Pattern có thể giải quyết được vấn đề này bằng cách để phương thức thông báo email bên trong lớp thông báo cơ sở, nhưng chuyển tất cả các phương thức thông báo khác bên trong decorators
![](https://images.viblo.asia/72866cfd-8a62-40e1-860f-1dee14ee1ceb.png)

Client code sẽ cần chứa một đối tượng thông báo cơ bản như một tập hợp các decorator phụ thuộc vào người sử dụng. Các đối tượng decorator sẽ được cấu trúc như một ngăn xếp.
![](https://images.viblo.asia/1ecaca1e-d494-4959-99cd-872a654f68be.png)

## 3. Kiến trúc
Các thành phần trong mô hình:
* *Component:* là một interface quy định các method chung cần phải có cho tất cả các thành phần tham gia vào mẫu này.
* *Concrete Component:* là lớp hiện thực (implements) các phương thức của Component.
* *Decorator:* là một abstract class dùng để duy trì một tham chiếu của đối tượng Component và đồng thời cài đặt các phương thức của Component interface.
* *Concrete Decorator:* là lớp hiện thực (implements) các phương thức của Decorator, nó cài đặt thêm các tính năng mới cho Component.
* *Client:* đối tượng sử dụng Component với những yêu cầu mở rộng đính kèm.
## 4. Ưu & nhược điểm
#### Ưu điểm
* Bạn có thể mở rộng hành vi của đối tượng mà không cần tạo lớp con mới.
* Bạn có thể thêm hoặc xoá tính năng của một đối tượng trong lúc thực thi.
* Một đối tượng có thể được bao bọc bởi nhiều wrapper cùng một lúc.
* Single Responsibility Principle - Có thể chia nhiều cách thực thi của một phương thức trong một lớp cho nhiều lớp nhỏ hơn.
#### Nhược điểm
* Khó để xóa một wrapper cụ thể khỏi stack.
* Khó để triển khai decorator theo cách mà phương thức của nó không phụ thuộc vào thứ tự trong stack.
## 5. Khi nào thì sử dụng 
* Khi muốn thêm tính năng mới cho các đối tượng mà không ảnh hưởng đến các đối tượng này.
* Khi không thể mở rộng một đối tượng bằng cách thừa kế (inheritance). Chẳng hạn, một class sử dụng từ khóa final, muốn mở rộng class này chỉ còn cách duy nhất là sử dụng decorator.
* Trong một số nhiều trường hợp mà việc sử dụng kế thừa sẽ mất nhiều công sức trong việc viết code.
## 6. Source code minh họa với C#
**Bài toán:** Giả sử, tôi muốn thêm động cơ Xăng hoặc động cơ Diesel vào chiếc xe này. Sau đó những gì tôi cần làm là, tôi phải giới thiệu Decorator của ô tô. Những gì Decorator này sẽ làm là, nó sẽ thêm một Động cơ vào Ô tô. Giả sử tôi muốn thêm Động cơ xăng thì Decorator sẽ thêm Động cơ xăng vào chiếc xe này và trả lại chiếc xe với động cơ xăng. Giả sử, tôi muốn thêm một Động cơ Diesel cho chiếc xe này thì Decorator sẽ thêm một động cơ Diesel cho chiếc xe này và trả lại chiếc xe với động cơ Diesel.
![](https://images.viblo.asia/162cfea8-9900-4b5e-bd6c-d5baf8dd03ea.png)

#### Tạo Component
```
    public interface ICar
    {
        ICar ManufactureCar();
    }   
```
#### Tạo ConcreteComponent
```
    public class BMWCar : ICar
    {
        private string CarName = "BMW";
        public string CarBody { get; set; }
        public string CarDoor { get; set; }
        public string CarWheels { get; set; }
        public string CarGlass { get; set; }
        public string Engine { get; set; }
        public override string ToString()
        {
            return "BMWCar [CarName=" + CarName + ", CarBody=" + CarBody + ", CarDoor=" + CarDoor + ", CarWheels="
                            + CarWheels + ", CarGlass=" + CarGlass + ", Engine=" + Engine + "]";
        }
        public ICar ManufactureCar()
        {
            CarBody = "carbon fiber material";
            CarDoor = "4 car doors";
            CarWheels = "6 car glasses";
            CarGlass = "4 MRF wheels";
            return this;
        }
    }   
```
#### Tạo Decorator
```
    public abstract class CarDecorator : ICar
    {
        protected ICar car;
        public CarDecorator(ICar car)
        {
            this.car = car;
        }
        public virtual ICar ManufactureCar()
        {
            return car.ManufactureCar();
        }
    }   
```
#### Tạo ConcreteDecorator
```
    public class DieselCarDecorator : CarDecorator
    {
        public DieselCarDecorator(ICar car) : base(car)
        {
        }
        public override ICar ManufactureCar()
        {
            car.ManufactureCar();
            AddEngine(car);
            return car;
        }
        public void AddEngine(ICar car)
        {
            if (car is BMWCar)
            {
                BMWCar BMWCar = (BMWCar)car;
                BMWCar.Engine = "Diesel Engine";
                Console.WriteLine("DieselCarDecorator added Diesel Engine to the Car : " + car);
            }
        }
    }
    
    class PetrolCarDecorator : CarDecorator
    {
        public PetrolCarDecorator(ICar car) : base(car)
        {
        }
        public override ICar ManufactureCar()
        {
            car.ManufactureCar();
            AddEngine(car);
            return car;
        }
        public void AddEngine(ICar car)
        {
            if (car is BMWCar)
            {
                BMWCar BMWCar = (BMWCar)car;
                BMWCar.Engine = "Petrol Engine";
                Console.WriteLine("PetrolCarDecorator added Petrol Engine to the Car : " + car);
            }
        }
    }
```
#### Tạo Client
```
    class Client
    {
        static void Main(string[] args)
        {
            ICar bmwCar1 = new BMWCar();
            bmwCar1.ManufactureCar();
            Console.WriteLine(bmwCar1 + "\n");
            DieselCarDecorator carWithDieselEngine = new DieselCarDecorator(bmwCar1);
            carWithDieselEngine.ManufactureCar();
            Console.WriteLine();
            ICar bmwCar2 = new BMWCar();
            PetrolCarDecorator carWithPetrolEngine = new PetrolCarDecorator(bmwCar2);
            carWithPetrolEngine.ManufactureCar();
            Console.ReadKey();
        }
    }   
```
## 7. Design Pattern liên quan
* *Adapter:* Decorator khác với adapter ở chỗ decorator chỉ thay đổi trách nhiệm của một đối tượng chứ không phải giao diện của nó.
* *Composite:* Decorator có thể xem là một degenerate Composite với chỉ một component. Tuy nhiên, decorator thêm các trách nhiệm bổ sung - nó không dành cho việc tập hợp object.
* *Strategy:* Decorator cho phép bạn thay đổi “da” của một đối tượng, strategy cho phép bạn thay đổi “ruột”.Đây là hai cách thay thế để thay đổi một đối tượng.

Bài viết của mình đến đây là kết thúc, cảm ơn các bạn đã theo dõi. Nếu các bạn thấy có ích có thể khám phá thêm [Series Design Patterns - Trợ thủ đắc lực của Developers](https://viblo.asia/s/design-patterns-tro-thu-dac-luc-cua-developers-Q75wqJ67ZWb) của mình!!
## Tài liệu tham khảo
[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern
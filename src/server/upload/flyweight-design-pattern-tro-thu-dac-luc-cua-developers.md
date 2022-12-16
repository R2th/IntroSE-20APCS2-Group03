![](https://images.viblo.asia/8422ca5b-9ec4-422a-8e00-43e3ba14e26f.png)

## 1. Giới thiệu
* Flyweight là một mẫu thiết kế thuộc nhóm Structural Pattern – những mẫu thiết kế giúp dễ dàng thiết kế bằng cách xác định một cách hiện thực hóa mối quan hệ giữa các thực thể.
* Mẫu thiết kế Flyweight là một mẫu thiết kế cấu trúc cho phép bạn lắp nhiều đối tượng hơn vào dung lượng RAM có sẵn bằng cách chia sẻ, phân phối các phần trạng thái chung - riêng giữa nhiều đối tượng thay vì giữ tất cả dữ liệu trong mỗi đối tượng. 
* Khi nhiều đối tượng (objects) phải được xử lý mà chương trình không thể chịu nổi một lượng dữ liệu khổng lồ, thì cần dùng flyweight.
* Nó là một trong những mẫu thiết kế của Gang of Four.
* Tần suất sử dụng: Thấp
## 2. Mục đích ra đời
### Problem
Chẳng hạn bạn tạo ra một game FPS open world người chơi sẽ di chuyển quanh bản đồ và bắn nhau. Thêm vào rất nhiều hiệu ứng kỹ xảo, cháy nổ, ánh sáng. Số lượng lớn đạn, tên lửa và mảnh bom từ các vụ nổ sẽ trải dài khắp thế giới trong game và mang lại trải nghiệm thú vị cho người chơi.

Sau khi hoàn thành game và gửi nó cho bạn bè của bạn để chơi thử. Mặc dù trò chơi đang chạy hoàn hảo trên máy của bạn, nhưng trên các máy khác không thể chơi được lâu. Trò chơi liên tục gặp sự cố sau vài phút chơi. Sau vài giờ tìm hiểu các bản debug log, bạn phát hiện ra rằng trò chơi bị lỗi do không đủ dung lượng RAM. Hóa ra là thiết bị khác kém hơn nhiều so với máy tính của bạn và đó là lý do tại sao vấn đề lại xuất hiện rất nhanh trên các máy khác.

Chẳng hạn như một viên đạn, một tên lửa hoặc một mảnh đạn được thể hiện bằng một đối tượng riêng biệt chứa nhiều dữ liệu. Tại một số thời điểm, khi rất nhiều đối tượng xảy ra trên màn hình của người chơi lên đến đỉnh điểm, các đối tượng mới được tạo ra không còn đủ với bộ nhớ RAM còn lại, do đó chương trình bị lỗi.
![](https://images.viblo.asia/d344bd63-97a9-4f6f-a172-3e7b7f562ae6.png)

Dễ đoán ra được, lý do là vì mỗi class Particle chứa quá nhiều thông tin: vị trí, tọa độ, vector, tốc độ, màu sắc, sprite. Trong khi đó, có những loại thông tin luôn thay đổi theo từng unit và những loại thông tin thường giống nhau giữa các loại unit. Nếu không biết về flyweight pattern, một người sẽ đành bó tay chịu đựng, và dự định sẽ nâng system requirement của ứng dụng - quả là một nước đi không khôn ngoan.
![](https://images.viblo.asia/b93e226c-af77-46b6-b2d2-182afa544117.jpg)

### Solution
Khi kiểm tra kỹ hơn Class Particle, bạn có thể nhận thấy rằng các biến color và sprite tiêu tốn nhiều bộ nhớ hơn các trường khác. Điều tồi tệ hơn là hai biến này lưu trữ dữ liệu gần như giống hệt nhau trên tất cả các particle. Ví dụ, tất cả các viên đạn có cùng màu và sprite. 

Như tọa độ, vectơ chuyển động và tốc độ, là những biến duy nhất của mỗi particle. Giá trị của các biến này thay đổi theo thời gian. Dữ liệu này đại diện cho context luôn thay đổi trong đó có sự xuất hiện của particle đó, trong khi màu sắc và sprite không đổi.

![](https://images.viblo.asia/d1ce8030-622a-4df2-b712-c37fba1d5ef1.png)

Dữ liệu không đổi này của một đối tượng thường được gọi là trạng thái intrinsic. Nó tồn tại bên trong đối tượng; các đối tượng khác chỉ có thể đọc nó, không thay đổi nó. Phần còn lại của trạng thái của đối tượng, thường bị thay đổi “từ bên ngoài” bởi các đối tượng khác, được gọi là trạng thái extrinsic.
![](https://images.viblo.asia/4d9121e8-3e6c-478b-beb9-f1cee8a0f82c.png)

## 3. Kiến trúc
![](https://images.viblo.asia/864a398a-7d05-4fb5-8ec6-4f8491c4dd98.png)

Các thành phần trong mô hình:
* Mô hình Flyweight chỉ đơn thuần là một sự tối ưu hóa cho hệ thống. Trước khi áp dụng nó, hãy đảm bảo rằng chương trình có vấn đề tiêu thụ RAM liên quan đến việc có một số lượng lớn các đối tượng tương tự trong bộ nhớ cùng một lúc. 
* Class Flyweight chứa phần trạng thái ban đầu của đối tượng có thể được chia sẻ giữa nhiều đối tượng. Cùng một đối tượng flyweight có thể được sử dụng trong nhiều context khác nhau. Trạng thái được lưu trữ bên trong một flyweight được gọi là “intrinsic”. Trạng thái được truyền cho các phương thức của flyweight được gọi là “extrinsic”.
* Class Context chứa trạng thái extrinsic. Khi một context được ghép nối với một trong các đối tượng flyweight, nó đại diện cho trạng thái đầy đủ của đối tượng ban đầu.
* Thông thường, hành vi của đối tượng ban đầu vẫn thuộc lớp Flyweight.Trường hợp này, bất cứ khi nào gọi một phương thức của flyweight cũng phải chuyển các giá trị thích hợp của extrinsic state vào các tham số của phương thức. Mặt khác, hành vi có thể được chuyển sang lớp Context, lớp này sẽ sử dụng flyweight được liên kết đơn thuần như một đối tượng dữ liệu
* Client ( Các class sử dụng Flyweight ) tính toán hoặc lưu trữ trạng thái extrinsic của Flyweights. Từ góc độ client, Flyweight là một đối tượng mẫu có thể được cấu hình trong thời gian chạy bằng cách chuyển một số dữ liệu theo ngữ cảnh vào các tham số của các phương thức của nó.
* Flyweight Factory quản lý một nhóm các flyweight hiện có. Các client sẽ không tạo ra flyweights trực tiếp. Thay vào đó, họ gọi factory, chuyển cho nó intrinsic state mong muốn của flyweight. factory xem xét các flyweight được tạo trước đó và trả về một cái hiện có phù hợp với tiêu chí tìm kiếm hoặc tạo một cái mới nếu không tìm thấy gì.
![](https://images.viblo.asia/46340148-6cba-446c-aa60-fecdb9105eec.png)

Trong ví dụ này, Flyweight Pattern giúp giảm mức sử dụng bộ nhớ khi cần hiển thị hàng triệu đối tượng dạng cây trên canvas.

Lúc này, mỗi Tree object chỉ còn trường vị trí và trường type, bao gồm các TreeType object. Từ đó, những cây có type giống nhau sẽ cùng sử dụng chung object TreeType giúp giải quyết vấn đề về bộ nhớ. Ngoài ra, ứng dụng còn có thêm TreeFactory để dễ dàng quản lý các TreeType. 
## 4. Ưu & nhược điểm
#### Ưu điểm
* Giảm số lương đối tượng được tạo ra bằng cách chia sẻ đối tượng. Vì vậy tiết kiệm bộ nhớ và các thiết bị lưu trữ cần thiết
* Cải thiện khả năng cache dữ liệu vì thời gian đáp ứng nhanh
* Tăng Performance cho hệ thống
#### Nhược điểm
* Đánh đổi về mặt sử dụng CPU khi các flyweight object bị truy cập nhiều lần.
* Code trở nên phức tạp hơn nhiều. Các thành viên mới trong team sẽ luôn thắc mắc tại sao trạng thái của một thực thể lại được tách ra theo cách như vậy. Độ dễ hiểu (understandability) thấp 
## 5. Khi nào thì sử dụng 
Flyweight được sử dụng khi:
* Khi có một số lớn các đối tượng được ứng dụng tạo ra một cách lặp đi lặp lại.
* Khi việc tạo ra đối tượng đòi hỏi nhiều bộ nhớ và thời gian
* Khi muốn tái sử dụng đối tượng đã tồn tại thay vì phải tối thời gian để tạo mới
* Khi nhóm đối tượng chứa nhiều đối tượng tương tự và hai đối tượng trong nhóm không khác nhau nhiều
## 6. Source code minh họa với C#
* Chia các trường của một lớp sẽ trở thành flyweight thành hai phần: trạng thái nội tại và trạng thái ngoại vi.
* Để lại các trường đại diện cho trạng thái nội tại trong lớp, nhưng đảm bảo chúng là bất biến.
* Xem qua các phương thức sử dụng các trường của trạng thái bên ngoài. Đối với mỗi trường được sử dụng trong phương thức, giới thiệu một tham số mới và sử dụng nó thay cho trường.
* Tạo một lớp factory để quản lý nhóm các flyweight (không bắt buộc).
* Các client phải lưu trữ hoặc tính toán các giá trị của trạng thái bên ngoài (ngữ cảnh) để có thể gọi các phương thức của đối tượng flyweight.
```
    public class Flyweight
    {
        private Car _sharedState;

        public Flyweight(Car car)
        {
            this._sharedState = car;
        }

        public void Operation(Car uniqueState)
        {
            string s = JsonConvert.SerializeObject(this._sharedState);
            string u = JsonConvert.SerializeObject(uniqueState);
            Console.WriteLine($"Flyweight: Displaying shared {s} and unique {u} state.");
        }
    }   
```
Flyweight lưu trữ một phần chung của trạng thái (còn gọi là trạng thái intrinsic) thuộc về nhiều thực thể thực. Flyweight chấp nhận phần còn lại của trạng thái (trạng thái extrinsic, duy nhất cho mỗi thực thể) thông qua các tham số phương thức của nó.

Flyweight Factory tạo và quản lý các Flyweight object. Nó đảm bảo rằng các flyweight được chia sẻ một cách chính xác. Khi client yêu cầu một flyweight, factoryflyweight sẽ trả về một phiên bản hiện có hoặc tạo một phiên bản mới, nếu nó chưa tồn tại.
```
    public class FlyweightFactory
    {
        private List<Tuple<Flyweight, string>> flyweights = new List<Tuple<Flyweight, string>>();

        public FlyweightFactory(params Car[] args)
        {
            foreach (var elem in args)
            {
                flyweights.Add(new Tuple<Flyweight, string>(new Flyweight(elem), this.getKey(elem)));
            }
        }

        public string getKey(Car key)
        {
            List<string> elements = new List<string>();

            elements.Add(key.Model);
            elements.Add(key.Color);
            elements.Add(key.Company);

            if (key.Owner != null && key.Number != null)
            {
                elements.Add(key.Number);
                elements.Add(key.Owner);
            }

            elements.Sort();

            return string.Join("_", elements);
        }

        public Flyweight GetFlyweight(Car sharedState)
        {
            string key = this.getKey(sharedState);

            if (flyweights.Where(t => t.Item2 == key).Count() == 0)
            {
                Console.WriteLine("FlyweightFactory: Can't find a flyweight, creating new one.");
                this.flyweights.Add(new Tuple<Flyweight, string>(new Flyweight(sharedState), key));
            }
            else
            {
                Console.WriteLine("FlyweightFactory: Reusing existing flyweight.");
            }
            return this.flyweights.Where(t => t.Item2 == key).FirstOrDefault().Item1;
        }

        public void listFlyweights()
        {
            var count = flyweights.Count;
            Console.WriteLine($"\nFlyweightFactory: I have {count} flyweights:");
            foreach (var flyweight in flyweights)
            {
                Console.WriteLine(flyweight.Item2);
            }
        }
    }

    public class Car
    {
        public string Owner { get; set; }

        public string Number { get; set; }

        public string Company { get; set; }

        public string Model { get; set; }

        public string Color { get; set; }
    }

    class Program
    {
        static void Main(string[] args)
        {
            var factory = new FlyweightFactory(
                new Car { Company = "Chevrolet", Model = "Camaro2018", Color = "pink" },
                new Car { Company = "Mercedes Benz", Model = "C300", Color = "black" },
                new Car { Company = "Mercedes Benz", Model = "C500", Color = "red" },
                new Car { Company = "BMW", Model = "M5", Color = "red" },
                new Car { Company = "BMW", Model = "X6", Color = "white" }
            );
            factory.listFlyweights();

            addCarToPoliceDatabase(factory, new Car
            {
                Number = "CL234IR",
                Owner = "James Doe",
                Company = "BMW",
                Model = "M5",
                Color = "red"
            });

            addCarToPoliceDatabase(factory, new Car
            {
                Number = "CL234IR",
                Owner = "James Doe",
                Company = "BMW",
                Model = "X1",
                Color = "red"
            });

            factory.listFlyweights();
        }

        public static void addCarToPoliceDatabase(FlyweightFactory factory, Car car)
        {
            Console.WriteLine("\nClient: Adding a car to database.");

            var flyweight = factory.GetFlyweight(new Car
            {
                Color = car.Color,
                Model = car.Model,
                Company = car.Company
            });

            flyweight.Operation(car);
        }
    }
```
## 7. Design Pattern liên quan
* *Composite:* Các node lá trong design pattern Composite, nếu có “thuộc tính chung” có thể được cài đặt theo Flyweight Pattern
* *Facade:* Flyweight đưa ra cách xử lý đối với số lượng lớn các object nhỏ, trong khi Facade đưa ra cách xử lý đối với tạo ra một object duy nhất biểu diễn cho một hệ thống con.
* *Singleton:* Flyweight sẽ giống với Singleton nếu bằng cách nào đó giảm được tất cả các trạng thái được chia sẻ của các đối tượng xuống chỉ còn một đối tượng flyweight. Nhưng có hai điểm khác biệt cơ bản giữa các mẫu này:
  - Chỉ nên có một cá thể Singleton, trong khi một lớp Flyweight có thể có nhiều cá thể với các trạng thái nội tại khác nhau. 
  - Đối tượng Singleton có thể thay đổi được. Đối tượng Flyweight là bất biến.

Bài viết của mình đến đây là kết thúc, cảm ơn các bạn đã theo dõi. Nếu các bạn thấy có ích có thể khám phá thêm [Series Design Patterns - Trợ thủ đắc lực của Developers](https://viblo.asia/s/design-patterns-tro-thu-dac-luc-cua-developers-Q75wqJ67ZWb) của mình!!
## Tài liệu tham khảo
[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern
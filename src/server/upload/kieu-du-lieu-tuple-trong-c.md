# Vì sao mình giới thiệu về Tuple? 

Trong khi làm việc mình đã từng gặp nhiều trường hợp phương thức chúng ta muốn trả về một giá trị, khi phát sinh hay muốn trả về thêm những giá trị nữa thì mình buộc thế phải tạo riêng một object chứa nhiều giá trị đó vào rồi trả về object đó (tức là mình sẽ phải thay đổi kiểu data trả về) và những trường hợp đó chỉ sử dụng object đó 1 lần chẳng hạn như maintain một sourcecode của người khác và ngại việc thay đổi đó thì hãy sử dùng Tuple.


# Tuple là gì? 
Tuple được giới thiệu từ .NET Framwork 4.0, là một kiểu dữ liệu có cấu trúc, giúp lưu trữ các dữ liệu phức tạp tạm thời mà không cần phải tạo ra một object class mới.

Mỗi Tuple định nghĩa sẵn các item1, item2,... Có tối đa 8 items được định nghĩa.

```SQL
public class Tuple <T1>

public class Tuple <T1, T2>

public class Tuple <T1, T2, T3>

public class Tuple <T1, T2, T3, T4>

public class Tuple <T1, T2, T3, T4, T5>

public class Tuple <T1, T2, T3, T4, T5, T6>

public class Tuple <T1, T2, T3, T4, T5, T6, T7>

public class Tuple <T1, T2, T3, T4, T5, T6, T7, TRest>
```




Mỗi lớp Tuple<> đã được định nghĩa sẵn các Property có tên Item1, Item2, Item3,… tương ứng với các kiểu dữ liệu T1, T2, T3,… được truyền vào. Hình ảnh sau đây là một ví dụ:

![](https://images.viblo.asia/4e663fbb-0d27-47ee-937e-36b4cf7c1c1b.PNG)

Trên đây kiows Tuple<T1, T2, T3, T4, T5, T6, T7, T8, TRest> khi ta truyền kiểu dữ liệu vào thì sẽ map tương ứng với các property Item1, Item2, Item3, Item4, Item5 ...

# Cách dùng Tuple? 

**Khởi tạo đối tượng Tuple có 2 cách:**

* Tạo qua phương thức Create trong class Tuple:

```SQL
var MyTuple = Tuple.Create<int, string>(1992, "KhoaPC");
```

* Tạo qua hàm dựng khởi tạo Constructor:

```SQL
var MyTuple2 = new Tuple<int, string>(1992, "KhoaPC");
```

**Lấy giá trị từ Tuple**
```SQL
Console.WriteLine(" Your birth year: {0}, Name: {1}", MyTuple.Item1, MyTuple.Item2);
```

![](https://images.viblo.asia/07129c35-3155-4900-80c6-56f33af21a00.PNG)




**Tuple lồng**

Nếu bạn muốn bao gồm nhiều hơn tám phần tử trong một tuple, bạn có thể làm điều đó bằng cách lồng một đối tượng tuple khác làm phần tử thứ tám. Bộ dữ liệu lồng nhau cuối cùng có thể được truy cập bằng thuộc tính Rest. Để lấy giá trị từ tuple lồng đó thì dùng lệnh Rest.Item1.Item<elelementNumber>
    
```SQL

    //Tạo Tuple numbers với một tuple lồng ở phần tử thứ 8
    var numbers = Tuple.Create(1, 2, 3, 4, 5, 6, 7, Tuple.Create(8, 9, 10, 11, 12, 13));
    
    // return 1
    numbers.Item1;
    
    // return 7
    numbers.Item7; 
    
    //return (8, 9, 10, 11, 12, 13)
    numbers.Rest.Item1;
    
    //return 8
    numbers.Rest.Item1.Item1;
    
    //return 9
    numbers.Rest.Item1.Item2; 
```

   Bạn có thể đặt các đối tượng tuple lồng nhau ở bất cứ đâu trong chuỗi.  Tuy nhiên, nên đặt bộ dữ liệu lồng vào cuối chuỗi để có thể truy cập bằng thuộc tính Rest.

 ```SQL
    //Tạo Tuple numbers với một tuple lồng ở phần tử thứ 3
    var numbers = Tuple.Create(1, 2, Tuple.Create(3, 4, 5, 6, 7,  8), 9, 10, 11, 12, 13 );
    
    // returns 1
    numbers.Item1; 
    
    // return 2
    numbers.Item2; 
    
    // return (3, 4, 5, 6, 7,  8)
    numbers.Item3; 
    
    // return 3
    numbers.Item3.Item1; 
    
    // return 9
    numbers.Item4; 
    
    //return 13
    numbers.Rest.Item1; 
```
    
    
**Tuple được dùng giống như một Method parameter**      
 ```SQL
static void Main(string[] args)
{
    var person = Tuple.Create(1, "Steve", "Jobs");
    DisplayTuple(person);
}

static void DisplayTuple(Tuple<int,string,string> person)
{
    Console.WriteLine($"Id = { person.Item1}");
    Console.WriteLine($"First Name = { person.Item2}");
    Console.WriteLine($"Last Name = { person.Item3}");
}
 ```
**Tuple được dùng giống như một kiểu trả về**      

```SQL
//Để dễ hiểu hơn lấy ví dụ thực tế khi bạn có 2 số a và b đầu vào và in ra 4 kết quả là giá trị cộng trừ nhân chia củ 2 số a và b thì sẽ viết như sau:
    
static void Example()
{
    var result = Calculator();
    Console.WriteLine("Ket qua: {0} {1} {2} {3}", result.Item1, result.Item2, result.Item3, result.Item4);
}

static Tuple Calculator()
{
    int a = 24, b = 9;
    return Tuple.Create(a + b, a - b, a * b, 1.0 * a / b);
}
```
# Kết luận.
**Bạn nên dùng Tuple trong những tình huống sau:**

* Khi bạn muốn trả về nhiều giá trị từ một phương thức mà không muốn sử dụng `ref` hoặc là `out` parameters
* Khi bạn muốn truyền nhiều giá trị cho một phương thức thông qua một tham số
*  Khi bạn muốn giữ một bản ghi cơ sở dữ liệu hoặc một số giá trị tạm thời mà không tạo một lớp riêng
    
**Bạn không nên dùng Tuple trong những tình huống sau:**
*  Tuple là một kiểu dữ liệu tham chiếu chứ không phải tham trị. Nên việc dùng không đúng có thể ảnh hưởng đến CPU
*  Tuple được giới hạn bao gồm 8 yếu tố.  Bạn cần sử dụng các bộ dữ liệu lồng nhau nếu bạn cần lưu trữ nhiều phần tử hơn.  Tuy nhiên, điều này có thể dẫn đến sự lẫn lộn trong khi làm việc
* Trong quá trình lấy dữ liệu từ tuple có sử dụng những tên thuộc tính như Items1, Items2 nhìn có vẻ không tường minh lắm. Sẽ gây khó khăn cho người thứ 2 đọc vào code trong quá trình sau này.
    
Chúc mọi người làm việc thật tốt . :)

Bài viết tham khảo từ nguồn: 
https://docs.microsoft.com/en-us/dotnet/csharp/tuples
    
https://www.tutorialsteacher.com/csharp/csharp-tuple
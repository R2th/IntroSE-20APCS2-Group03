# Vì sao mình giới thiệu về Anonymous Type? 

Trong khi làm việc mình đã từng gặp nhiều trường hợp khi sử dụng LinQ để tương tác với database, sau đó phải tạo ra những object có rất nhiều thuộc tính để chứa những data trả về từ database rồi sau đó map với những object cần thiết khác và bỏ xó luôn không dùng nữa. Trong C# 3.0 có một kiểu ẩn danh rất hay ho mình muốn giới thiệu tới mọi người


# Anonymous Type là gì? 
Anonymous Type dùng để đóng gói cách thuộc tính chỉ đọc (read-only properties) vào một đối tượng mà không cần xác định rõ ràng loại (type) của nó. Trong C# 3.0 cho phép khởi tạo 1 anonymous  type bằng cách sử dụng toán tử new với 1 biểu thức khởi tạo anonymous type . Anonymous type là kiểu không có tên, kế thừa trực tiếp từ kiểu object mà không cần phải khai báo kiểu đó giống như C# 1. hay 2.0 trước đó.


# Cách dùng Anonymous Type? 

**1. Tạo object person có 3 thuộc tính Name, Address và Salary.**
```SQL
var person = new { Name = "Khoa", Address = "Da Nang", Salary= 1000 }; 
```

Câu trên khai báo một kiểu ẩn danh person, với kiểu/loại dữ liệu không quan tâm đến, mà chỉ quan tâm cái kiểu đó có 3 thuộc tính là Name, Address và Salary. Và sau đó có thể sử dụng 3 thuộc tính này như bình thường:


```SQL
Console.WriteLine("name: " + person.Name + ", address: " + person.Address);
```

```SQL
OUTPUT: name: Khoa, address: Da nang
```

**2. Kiểu ẩn danh này phải được khai báo với từ khóa `var`. Nếu chúng ta khai báo với từ khóa là kiểu dữ liệu cụ thể là object thì truy xuất vào thuộc tính trong object đó sẽ không tìm thấy được.**


![](https://images.viblo.asia/30268794-f723-47cd-8429-079c9704faa7.PNG)



**3. Phạm vi của anonymous type.**

```SQL
static void Main(string[] args)
{

    var myAnonymousType = new
                            {
                                firstProperty = "First Property",
                                secondProperty = 2,
                                thirdProperty = true               
                            };

    DoSomethig(myAnonymousType);
}

static void DoSomethig(dynamic param)
{
    Console.WriteLine(param.firstProperty);
}
```
    
Qua ví dụ trên chúng ta thấy rằng: tính năng Anonymous Type thường được sử dụng cho xử lý nội bộ hàm mà không pass dữ liệu của kiểu đó ra ngoài hàm mà anonymous type được khai báo. Vì bên trong hàm khai báo anonymous type, chúng ta có thể dễ dàng access các thuộc tính của nó.

**4. Anonymous Type trong truy vấn với LinQ**

Đây là phần mà mình dùng gặp rất nhiều trong khi làm việc. Mệnh đề select của Linq sẽ tạo một Anonymous Type là kết quả của một truy vấn bao gồm các thuộc tính khác nhau mà không được xác định trong bất kỳ lớp nào.

```SQL
public class Student
{
    public int StudentID { get; set; }
    public string StudentName { get; set; }
    public int age { get; set; }
}

class Program
{
    static void Main(string[] args)
    {
        IList<Student> studentList = new List<Student>() { 
                        new Student() { StudentID = 1, StudentName = "John", age = 18 } ,
                        new Student() { StudentID = 2, StudentName = "Steve",  age = 21 } ,
                        new Student() { StudentID = 3, StudentName = "Bill",  age = 18 } ,
                        new Student() { StudentID = 4, StudentName = "Ram" , age = 20  } ,
                        new Student() { StudentID = 5, StudentName = "Ron" , age = 21 } 
                    };

        var studentNames = from s in studentList
                           select new 
                           {
                                StudentID = s.StudentID, 
                                StudentName = s.StudentName 
                           };
    }
}
```

Lớp Student bao gồm nhiều thuộc tính khác nhau. Trong method Main(), mệnh đề Linq select tạo một anonymous type chỉ bao gồm id và name thay vì bao gồm tất cả các thuộc tính trong kết quả trả về. Vì vậy, nó rất hữu ích trong việc tiết kiệm bộ nhớ và code không cần thiết

![](https://images.viblo.asia/79e16776-d7c7-4a4f-aa9a-dfca1b0fa237.png)

Đây là object studentNames khi debug. Lưu ý các thuộc tính của đối tượng vô danh chỉ đọc - readonly, bạn không thay đổi được giá trị của các thuộc tính đã có của đối tượng vô danh nhé.

# Tổng kết? 

1. Anonymous type có thể được xác định bằng cách sử dụng từ khóa new và cú pháp khởi tạo đối tượng object initializer.
2.Khai báo biến kiểu ngầm định với từ khóa var được sử dụng để giữ một anonymous type.
3. Anonymous type là loại tham chiếu (reference type) và tất cả các thuộc tính là chỉ đọc (read-only).
4. Phạm vi của một anonymous type là cục bộ (local), là trong phạm vi của phương thức định nghĩa ra nó.
5. Anonymous types là các class types xuất phát trực tiếp từ object và không thể truyền sang bất kỳ loại nào ngoại trừ object.

Chúc mọi người làm việc thật tốt . :)

Bài viết tham khảo từ nguồn: 
https://www.tutorialsteacher.com/csharp/csharp-anonymous-type
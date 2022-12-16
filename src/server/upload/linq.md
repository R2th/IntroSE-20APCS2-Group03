*(phần 1)*

Truy vấn tích hợp ngôn ngữ (LINQ) là ngôn ngữ truy vấn mạnh mẽ được giới thiệu với .Net 3.5 & Visual Studio 2008. LINQ có thể được sử dụng với C # hoặc Visual Basic để truy vấn các nguồn dữ liệu khác nhau.

Hướng dẫn LINQ sẽ giúp bạn học ngôn ngữ LINQ bằng các chủ đề đi từ cơ bản đến nâng cao. Các hướng dẫn này được chia thành một loạt các chủ đề liên quan, để bạn bắt đầu từ một chủ đề phải được hiểu trước, sau đó dần dần tìm hiểu các tính năng khác của LINQ một cách tuần tự. Hướng dẫn LINQ được đóng gói với các giải thích dễ hiểu, các ví dụ thực tế, các mẹo hữu ích, ghi chú thông tin và các điểm cần nhớ.

Các hướng dẫn này được thiết kế cho người mới bắt đầu và các chuyên gia muốn tìm hiểu LINQ từng bước.

vậy LINQ là gì?

LINQ (Truy vấn tích hợp ngôn ngữ) là cú pháp truy vấn thống nhất trong C # và VB.NET để truy xuất dữ liệu từ các nguồn và định dạng khác nhau. Nó được tích hợp trong C # hoặc VB, do đó loại bỏ sự không phù hợp giữa các ngôn ngữ lập trình và cơ sở dữ liệu, cũng như cung cấp một giao diện truy vấn duy nhất cho các loại nguồn dữ liệu khác nhau.

Ví dụ: SQL là Ngôn ngữ truy vấn có cấu trúc được sử dụng để lưu và truy xuất dữ liệu từ cơ sở dữ liệu. Theo cùng một cách, LINQ là một cú pháp truy vấn có cấu trúc được xây dựng trong C # và VB.NET để lấy dữ liệu từ các loại nguồn dữ liệu khác nhau, chẳng hạn như bộ sưu tập, ADO.Net Dataset, XML Docs, dịch vụ web và MS SQL Server và các cơ sở dữ liệu khác.

![](https://images.viblo.asia/5657c22d-dffa-4298-a111-c6d7a2a73db4.png)

Truy vấn LINQ trả về kết quả dưới dạng đối tượng. Nó cho phép bạn sử dụng cách tiếp cận hướng đối tượng trên tập kết quả và không phải lo lắng về việc chuyển đổi các định dạng kết quả khác nhau thành các đối tượng.

![](https://images.viblo.asia/ff4bda89-054b-47e0-8df9-581fe36d9c5e.png)

Ví dụ sau đây cho thấy một truy vấn LINQ đơn giản nhận được tất cả các chuỗi từ một mảng có chứa 'a'.
```
// Data source
string[] names = {"Bill", "Steve", "James", "Mohan" };

// LINQ Query 
var myLinqQuery = from name in names
                where name.Contains('a')
                select name;
    
// Query execution
foreach(var name in myLinqQuery)
    Console.Write(name + " ");


Trong ví dụ trên, tên mảng chuỗi là nguồn dữ liệu. Sau đây là truy vấn LINQ được gán cho biến myLinqQuery.

from name in names
where name.Contains('a')
select name;

```
Bạn sẽ không nhận được kết quả của truy vấn LINQ cho đến khi bạn thực hiện nó. Truy vấn LINQ có thể được thực thi theo nhiều cách, ở đây chúng ta đã sử dụng vòng lặp foreach để thực hiện truy vấn được lưu trữ trong myLinqQuery. Vòng lặp foreach thực hiện truy vấn trên nguồn dữ liệu và nhận kết quả và sau đó lặp lại qua tập kết quả.

Do đó, mọi truy vấn LINQ phải truy vấn một số loại nguồn dữ liệu cho dù đó có thể là array, collections, XML hoặc cơ sở dữ liệu khác. Sau khi viết truy vấn LINQ, nó phải được thực thi để có kết quả.

Tại sao ta phải dùng LINQ?
	Để hiểu lý do tại sao chúng ta nên sử dụng LINQ, hãy xem xét một số ví dụ. Giả sử bạn muốn tìm danh sách Student tuổi teen (có độ tuổi từ 12 đến 20) từ một loạt các đối tượng  Student

Trước C # 2.0, chúng ta đã phải sử dụng vòng lặp 'foreach' hoặc 'for' để duyệt qua bộ sưu tập để tìm một đối tượng cụ thể. Ví dụ: chúng ta đã phải viết mã sau đây để tìm tất cả các đối tượng Student từ một mảng Student có độ tuổi từ 12 đến 20 (dành cho tuổi từ 13 đến 19):
```
class Student
{
    public int StudentID { get; set; }
    public String StudentName { get; set; }
    public int Age { get; set; }
}

class Program
{
    static void Main(string[] args)
    {
        Student[] studentArray = { 
          new Student() { StudentID = 1, StudentName = "John", Age = 18 },
          new Student() { StudentID = 2, StudentName = "Steve", Age = 21 },
          new Student() { StudentID = 3, StudentName = "Bill", Age = 25 },
          new Student() { StudentID = 4, StudentName = "Ram" , Age = 20 },
          new Student() { StudentID = 5, StudentName = "Ron" , Age = 31 },
          new Student() { StudentID = 6, StudentName = "Chris", Age = 17 },
          new Student() { StudentID = 7, StudentName = "Rob",Age = 19  },
     };

     Student[] students = new Student[10];
     int i = 0;
     foreach (Student std in studentArray)
     {
        if (std.Age > 12 && std.Age < 20)
        {
                students[i] = std;
                i++;
        }
      }
   }
}
```

Sử dụng vòng lặp for là cồng kềnh, không thể duy trì và có thể đọc được. Phiên bản C # 2.0, có thể được sử dụng để xử lý loại kịch bản này, như hiển thị bên dưới:

```
delegate bool FindStudent(Student std);

class StudentExtension
{ 
    public static Student[] where(Student[] stdArray, FindStudent del)
    {
        int i=0;
        Student[] result = new Student[10];
        foreach (Student std in stdArray)
            if (del(std))
            {
                result[i] = std;
                i++;
            }

        return result;
    }
}
    
class Program
{
   static void Main(string[] args)
   {
       Student[] studentArray = { 
         new Student() { StudentID = 1,StudentName = "John", Age = 18 },
         new Student() { StudentID = 2,StudentName = "Steve", Age = 21 },
         new Student() { StudentID = 3, StudentName = "Bill", Age = 25 },
         new Student() { StudentID = 4, StudentName = "Ram" ,Age = 20 },
         new Student() { StudentID = 5, StudentName = "Ron" ,Age = 31 },
         new Student() { StudentID = 6, StudentName = "Chris",  Age = 17},
         new Student() { StudentID = 7, StudentName = "Rob",Age = 19  },
    };

    Student[]students = StudentExtension.where(studentArray,delegate(Student std){
        return std.Age > 12 && std.Age < 20;});
    }
  }
}

```

Vì vậy, với C # 2.0, bạn có lợi thế của delegate trong việc tìm kiếm Student với bất kỳ tiêu chí nào. Bạn không phải sử dụng vòng lặp “for” để tìm Student sử dụng các tiêu chí khác nhau. Ví dụ: bạn có thể sử dụng cùng chức năng ủy nhiệm để tìm Student viên có StudentId là 5 hoặc tên là Bill, như sau:

```
Student[] students = StudentExtension.where(studentArray, delegate(Student std) {
        return std.StudentID == 5;
});
//Also, use another criteria using same delegate
Student[] students = StudentExtension.where(studentArray, delegate(Student std) {
        return std.StudentName == "Bill"; 
});
```

Nhóm C # cảm thấy rằng họ vẫn cần thiết để làm cho mã nhỏ gọn hơn và dễ đọc hơn. Vì vậy, họ đã giới thiệu phương thức mở rộng, biểu thức lambda, cây biểu thức, loại ẩn danh và biểu thức truy vấn trong C # 3.0. Bạn có thể sử dụng các tính năng này của C # 3.0, là các khối xây dựng của LINQ để truy vấn các loại collection khác nhau và nhận (các) phần tử kết quả trong một câu lệnh.

Ví dụ dưới đây cho thấy cách bạn có thể sử dụng truy vấn LINQ với biểu thức lambda để tìm (các) học sinh cụ thể từ collection của học sinh.

```
class Program
{
    static void Main(string[] args)
    {
        Student[] studentArray = { 
                    new Student() { StudentID = 1, StudentName = "John", age = 18 } ,
                    new Student() { StudentID = 2, StudentName = "Steve",  age = 21 } ,
                    new Student() { StudentID = 3, StudentName = "Bill",  age = 25 } ,
                    new Student() { StudentID = 4, StudentName = "Ram" , age = 20 } ,
                    new Student() { StudentID = 5, StudentName = "Ron" , age = 31 } ,
                    new Student() { StudentID = 6, StudentName = "Chris",  age = 17 } ,
                    new Student() { StudentID = 7, StudentName = "Rob",age = 19  } ,
                };

     // Use LINQ to find teenager students
     Student[] teenAgerStudents = studentArray.Where(s => s.age > 12 && s.age < 20).ToArray();     
     // Use LINQ to find first student whose name is Bill 
     Student bill = studentArray.Where(s => s.StudentName == "Bill").FirstOrDefault();    
     // Use LINQ to find student whose StudentID is 5
      Student student5 = studentArray.Where(s => s.StudentID == 5).FirstOrDefault();
   }
}
```

Như bạn có thể thấy trong ví dụ trên, chúng tôi chỉ định các tiêu chí khác nhau bằng cách sử dụng toán tử LINQ và biểu thức lambda trong một câu lệnh. Do đó, LINQ làm cho mã nhỏ gọn hơn và dễ đọc hơn và nó cũng có thể được sử dụng để truy vấn các nguồn dữ liệu khác nhau. Ví dụ: nếu bạn có một bảng Student trong cơ sở dữ liệu thay vì một mảng các đối tượng Student như trên, bạn vẫn có thể sử dụng cùng một truy vấn để tìm Student bằng cách sử dụng Entity Framework.

(còn tiếp ...)
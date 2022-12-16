Việc thực hiện hoãn lại trong Linq nghĩa là việc đánh giá một biểu thức bị trì hoãn cho đến khi giá trị thực sự của nó được yêu cầu. Nó cải thiện đáng kể hiệu suất bằng cách tránh thực hiện không cần thiết.

Việc thực hiện hoãn lại được áp dụng trên mọi collection trong bộ nhớ ,  LINQ provider như LINQ-to-SQL, LINQ-to-Entities, LINQ-to-XML, v.v.

Hãy hiểu thực thi hoãn lại bằng cách sử dụng ví dụ sau:
![](https://images.viblo.asia/1478f642-2117-410c-981c-c6a178e0b994.png)

Trong ví dụ trên, bạn có thể thấy truy vấn được cụ thể hóa và được thực thi khi bạn lặp lại bằng vòng lặp foreach. Điều này được gọi là thực hiện hoãn lại. LINQ xử lý  studentList collection  khi bạn thực sự truy cập từng đối tượng từ collection và làm một cái gì đó với nó.

**Deferred Execution returns the Latest Data**

Để kiểm tra xem việc thực hiện hoãn lại có trả lại dữ liệu mới nhất mỗi lần hay không, ta hãy thêm một biến teenAgerStudents sau vòng lặp foreach và kiểm tra danh sách sinh viên thiếu niên:

![](https://images.viblo.asia/5953cd1f-ca69-403f-bdf5-cfa3f8a6114c.png)

Như bạn có thể thấy, vòng lặp foreach thứ hai thực hiện lại truy vấn và trả về dữ liệu mới nhất. Việc thực hiện hoãn lại đánh giá lại trên mỗi lần thực hiện; điều này được gọi là đánh giá lười biếng (lazy evaluation). Đây là một trong những lợi thế chính của việc thực hiện hoãn lại, nó luôn cung cấp cho bạn dữ liệu mới nhất.

**Implementing Deferred Execution**

Bạn có thể triển khai thực thi hoãn lại cho các phương thức tiện ích mở rộng tùy chỉnh của mình cho IEnumerable bằng cách sử dụng từ khóa **yield** của C #.

Ví dụ: bạn có thể triển khai phương thức tiện ích mở rộng tùy chỉnh GetTeenAgerStudents cho IEnumerable trả về danh sách tất cả học sinh là thanh thiếu niên.

```
public static class EnumerableExtensionMethods
{
    public static IEnumerable<Student> GetTeenAgerStudents(this IEnumerable<Student> source)
    {

        foreach (Student std in source)
        {
            Console.WriteLine("Accessing student {0}", std.StudentName);

            if (std.age > 12 && std.age < 20)
                yield return std;
        }
    }
}
```

Lưu ý rằng chúng ta in tên sinh viên trên màn hình  console  bất cứ khi nào GetTeenAgerStudents () được gọi.

Bây giờ chúng ta có thể sử dụng phương thức mở rộng này như dưới đây:

```
IList<Student> studentList = new List<Student>() { 
            new Student() { StudentID = 1, StudentName = "John", age = 13 } ,
            new Student() { StudentID = 2, StudentName = "Steve",  age = 15 } ,
            new Student() { StudentID = 3, StudentName = "Bill",  age = 18 } ,
            new Student() { StudentID = 4, StudentName = "Ram" , age = 12 } ,
            new Student() { StudentID = 5, StudentName = "Ron" , age = 21 } 
        };
            
var teenAgerStudents = from s in studentList.GetTeenAgerStudents() 
                        select s;

foreach (Student teenStudent in teenAgerStudents)
    Console.WriteLine("Student Name: {0}", teenStudent.StudentName);
```

Ta thu được kết quả trên màn hình console như sau:
```
Accessing student John
Student Name: John
Accessing student Steve
Student Name: Steve
Accessing student Bill
Student Name: Bill
Accessing student Ram
Accessing student Ron
```
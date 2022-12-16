Viết code không hề khó, nhưng viết code “Sạch” lại không hề dễ dàng.

Code “Sạch” là gì? Những lập trình viên vừa bước chân vào nghề, hay những lập trình viên “Gà” thường **Code cho xong** mà không cần nghĩ tới tương lai của dự án, có bao giờ bạn mở lại đống code của bạn mà bạn viết cách đây khoảng 1 năm, và bạn đọc nó và thấy mình chả viết nó là cái gì
Điển hình như việc sinh viên hay code thuật toán, đặt tên biến là a,b,c… xong đọc lại chả nhớ a,b,c là cái vẹo gì. Code sạch là code mà bạn viết ra trước hết là chính bạn có thể đọc, sau đó là người khác đọc vào, biết bạn đang code cái gì. Người viết code sạch thì sẽ không lạm dụng comment, mà ngươi khác vẫn hiểu những gì bạn viết.

## **1. Sử dụng IDE “Ngon”**
Đầu tiên hãy lựa chọn IDE phù hợp với ngôn ngữ của mình, và “ngon”. Ví dụ hồi trước mình có code java trên NetBean, Eclipse, sau khi chuyển qua Intelliji thì nó như 1 bầu trời mới vậy. Tất nhiên IDE cũng chỉ là 1 phần, đối với những lập trình viên mới thì chọn IDE tốt sẽ giúp tránh đc các lỗi vặt, đảm bảo tốt được hiệu năng

Một số IDE mình đang dùng: Visual Studio (.NET), Visual Studio Code (Front end), DbForge (Database) (bạn có thể dùng DataGrib, cũng cực ngon luôn), Visual Paradigm (Phân tích thiết kế), PostMan (Call API),…

## **2. Đặt tên phải có Ý nghĩa**
Đặt tên biến luôn là một vấn đề khá là khó khăn, tuy nhiên hãy cố đặt nó theo cách dễ hiểu nhất

Code tồi

```
int a;
```

Code Xịn

```
int daysToAppocalypse;
```
## **3. Sử dụng Camel/Pascal Case**

### **Camel Case**
Về cơ bản, chữ cái đầu tiên của từ đầu sẽ viết thường, chữ cái đầu của từ tiếp theo sẽ viết hoa

Code tồi

```
int RandomInteger;
string FirstName;
```

Code Xịn

```
int randomInteger;
string firstName;
```

### **Pascal Case**

Các chữ cái đầu của từ sẽ được viết hoa (Áp dụng cho class và function)

Code tồi

```
class program
{
    static void main(string[] args)
    {
        Console.WriteLine("Hello World!");
    }
}
```

Code Xịn

```
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hello World!");
    }
}
```

## **4. Chú ý định dạng code**


Code tồi

```
class Program
{static void Main(string[] args)
    {Console.WriteLine("Hello World!");
    }
}
```

Lựa chọn IDE ngon sẽ giúp bạn format code tự động, như này chẳng hạn
![](https://images.viblo.asia/41736997-ae45-46c8-bd30-0e2cd17dadd2.gif)



## **5. Thêm Comment vào những chỗ Cần Thiết**


Hãy sử dụng comment vào những chỗ “Cần thiết”, đừng lạm dụng quá. Ông nào code thì cũng lười comment cả thôi, nhưng cố mà thêm vào để sau đọc lại còn hiểu
![](https://images.viblo.asia/6ccc49cb-89d9-4491-b179-1a1599fef68d.gif)

Như mình dùng VS, sau khi comment, lúc gọi tới hàm, chỉ vào là thấy hàm này làm gì
![](https://images.viblo.asia/9ae5e44e-1832-4223-accf-5f3dc5698fe6.png)



Hãy thêm comment khi code của bạn muốn giải thích chuyên sâu, rõ ràng, không nên lạm dụng comment

## **6. Code phải được Tái sử dụng**

Viết code có thể được sử dụng lại là điều khá quan trọng. Nó có thể làm giảm các dòng code tổng thể trong dự án của bạn và làm cho nó có hiệu quả cao. Bạn không muốn sao chép-dán một hàm qua nhiều file/class. Thay vào đó, tạo một function chung, sau đó gọi tới ở những nơi cần. Và, nếu có bất kỳ sửa đổi nào cần thiết, bạn sẽ chỉ phải thay đổi code trong hàm đó, không phải ở mọi nơi.

Xịn hơn, bạn có thể dùng Generic và Dynamic 

## **7. Đừng để 1 Class/ Function quá Phình To**

Theo SOLID Principles, trong 1 class / function không code quá nhiều dòng, mỗi class nên là 1 chức năng nào đó nhất định, nếu dài quá, hãy tách ra 1 class / function khác

## **8. Sử dụng Design pattern**

Lựa chọn Design Pattern tốt sẽ giúp code của bạn quản lý tốt hơn

## **9. Sắp xếp các thư mục / Project tốt**

Việc phân chia bố cục của project, gồm những Folder nào thực hiện chức năng nào sẽ giúp bạn quản lý tốt hơn
![](https://images.viblo.asia/c4365c78-af7a-4960-b330-0d7cd8b6342c.png)


Tất nhiên là vẫn có thể ném hết tất cả code vào 1 file hoặc tất cả file vào 1 folder, nhưng đến lúc nó phình to thì việc mở rộng là cực kỳ khó, mất thời gian và người khác đọc thì chắc chắn rồi, k hiểu gì cả

## **10. Tránh việc sử dụng chuỗi / số fix cứng**

Code tồi
```
if(userRole == "Admin")
{
    //logic here
}
```

Code xịn

```
const string ADMIN_ROLE = "Admin"
if(userRole == ADMIN_ROLE )
{
//logic here
}
```

Ngoài ra, bạn cũng có thể tạo 1 Enum để lưu các giá trị đc hard code

## **11, Xoá những đoạn Code thừa**

Bạn cần xoá những dòng code thừa trong quá trình code, những người viết javascript thường hay Console.log để xem kết quả, đôi khi họ cứ để đấy mãi

## **12. Sử dụng Async/Await**

Lập trình bất đồng bộ sẽ giúp code của bạn chạy nhanh hơn, tuy nhiên vấn đề quản lý task chưa bao giờ là dễ dàng

## **13. Không sử dụng ‘throw ex’**

Code tồi

```
try
{
    // Do something..
}
catch (Exception ex)
{
    throw ex;
}
```

Code xịn

```
try
{
    // Do something..
}
catch (Exception ex)
{
    throw;
}
```

## **14. Sử dụng toán tử 3 ngôi**

Code tồi

```
public string SomeMethod(int value)
{
    if(value == 10)
    {
        return "Value is 10";
    }
    else
    {
        return "Value is not 10";
    }
}
```

Code xịn

```
public string SomeMethod(int value)
{
    return value == 10 ? "Value is 10" : "Value is not 10";
}
```

## **15. Đừng cộng chuỗi**

Cộng chuỗi cũng oke đấy, nhưng nhìn sẽ rất rối

Code tồi

```
public string SomeMethod(Student student)
{
    return "Student Name is " + student.Name + ". Age is " + student.Age;
}
```

Code xịn

```
public string SomeMethod(Student student)
{
    return $"Student Name is {student.Name}. Age is {student.Age}";
}
```

## **16. Sử dụng quá nhiều Parameter trong hàm**

Thay vào đó hãy nhóm chúng thành 1 class cho gọn

Code tồi

```
public Student SomeMethod(string name, string city, int age, string section, DateTime dateOfBirth)
{
    return new Student()
    {
        Age = age,
        Name = name,
        //Other parameters too
    };
}
```

Code xịn

```
public Student SomeMethod(Student student)
{
    return student;
}
```

## **17. Đừng bỏ trống catch**

Code tồi

```
public void SomeMethod()
{
    try
    {
        DoSomething();
    }
    catch
    {
    }
}
```
Code xịn

```
public void SomeMethod()
{
    try
    {
        DoSomething();
    }
    catch (Exception ex)
    {
        LogItSomewhere(ex);
    }
}
```

## **18. Sử dụng Multiple catch**

Code tồi

```
try
{
    // Do something..
}
catch (Exception ex)
{

    if (ex is TaskCanceledException)
    {
        // Take action for TaskCanceledException
    }
    else if (ex is TaskSchedulerException)
    {
        // Take action for TaskSchedulerException
    }
}
```
Code xịn

```
try
{
    // Do something..
}
catch (TaskCanceledException ex)
{
    // Take action for TaskCanceledException
}
catch (TaskSchedulerException ex)
{
    // Take action for TaskSchedulerException
}
```

## **19. Don't Repeat Yourself (DRY)**


Code tồi

```
public List ShowDeveloperList(Developers developers)
{
    foreach (var developers in developer)
    {
        var expectedSalary = developer.CalculateExpectedSalary();
        var experience = developer.GetExperience();
        var githubLink = developer.GetGithubLink();
        var data = new[] {
            expectedSalary,
            experience,
            githubLink
        };

        Render(data);
    }
}

public List ShowManagerList(Manager managers)
{
    foreach (var manager in managers)
    {
        var expectedSalary = manager.CalculateExpectedSalary();
        var experience = manager.GetExperience();
        var githubLink = manager.GetGithubLink();
        var data =
        new[] {
            expectedSalary,
            experience,
            githubLink
        };

        render(data);
    }
}
```

Code xịn

```
public List ShowList(Employee employees)
{
    foreach (var employee in employees)
    {
        var expectedSalary = employees.CalculateExpectedSalary();
        var experience = employees.GetExperience();
        var githubLink = employees.GetGithubLink();
        var data =
        new[] {
            expectedSalary,
            experience,
            githubLink
        };

        render(data);
    }
}
```

Code cực xịn

```
public List ShowList(Employee employees)
{
    foreach (var employee in employees)
    {
        render(new[] {
            employee.CalculateExpectedSalary(),
            employee.GetExperience(),
            employee.GetGithubLink()
        });
    }
}
```

## **20. SOLID**

Bạn hãy tìm hiểu về các quy tắc này, nó sẽ giúp íchh cho bạn rất nhiều

 

**Tài liệu tham khảo**: [Clean Code concepts and tools adapted for .NET (github.com)](https://github.com/thangchung/clean-code-dotnet)

[20 Important Tips To Write Clean C# Code - MUST SHARE](https://codewithmukesh.com/blog/write-clean-csharp-code/)
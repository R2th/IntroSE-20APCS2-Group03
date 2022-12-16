# Giới thiệu
Trong 1 vài năm trở lại đây thì **C#** đã có rất nhiều thay đổi, cập nhật về mặt ngôn ngữ để giúp cho việc viết code trở nên *dễ dàng, dễ hiểu và hiệu quả hơn*. Là 1 lập trình viên, nắm bắt được những điểm mạnh mà ngôn ngữ mang lại sẽ giúp cho cuộc sống ngày càng dễ dàng hơn.
Ở bài viết này mình xin giới thiệu *những điểm mới của phiên bản C# 6*, với hàng loạt những cú pháp thêm vào có thể nói là "**chất như nước cất**". Chúng ta cùng tìm hiểu nhé.

# Các tính năng mới
## 1. Auto-Property 
### Read-only auto-properties
**Read-only auto-properties** cung cấp 1 cú pháp rõ ràng để tạo ra 1 thuộc tính không thể thay đổi (immutable). Ở các phiển bản trước thì bạn có thể thấy là chúng ta sẽ khai báo biến đó dùng *private setters*.
```csharp
//Phiên bản cũ
public string FirstName { get; private set; }
public string LastName { get; private set; }
```

Nhưng cú pháp trên không hoàn toàn không thay đổi được, nó chỉ đảm bảo là giá trị của thuộc tính đó chỉ không thay đổi được bên ngoài class. 
**Read-only auto-properties** sẽ làm cho việc không thể thay đổi này (immutable) hoạt động đúng như bản chất của nó (readonly). Bạn chỉ cần khải bảo **Read-only auto-properties** với chỉ câu lệnh get, khi đó thì chương trình sẽ hiểu là thuộc tính đó chỉ có thể get thôi và không được set (kể cả bên trong class, chỉ được set ở trong constructor để khởi tạo giá trị)
```csharp
public string FirstName { get; }
public string LastName { get;  }
```
Khởi tạo giá trị ở trong constructor được thôi, 
```csharp
public Student(string firstName, string lastName)
{
    if (IsNullOrWhiteSpace(lastName))
        throw new ArgumentException(message: "Cannot be blank", paramName: nameof(lastName));
    FirstName = firstName;
    LastName = lastName;
}
```
Cố gắng thay đổi giá trị biến ở ngoài constructor sẽ gây lỗi 
```csharp
public class Student
{
    public string LastName { get;  }

    public void ChangeName(string newLastName)
    {
        // Generates CS0200: Property or indexer cannot be assigned to -- it is read only
        LastName = newLastName;
    }
}
```
Tính năng này dùng để tạo 1 *read-only* type đúng nghĩa chỉ với cú pháp đơn giản ở *auto-property*
### Auto-Property Initializers
Tính năng này cho phép bạn khởi tạo giá trị cho 1 *auto-property* ngay khi khai báo biến. Điều này thật tuyệt với vì ta luôn muốn gán giá trị khởi tạo của biến ngay khi khai báo nó. Trong các phiên bản trước thì ta chỉ có thể khởi tạo giá trị biến bằng setter
```csharp
public Student(string firstName, string lastName)
{
    FirstName = firstName;
    LastName = lastName;
}
```
Khi class này càng phình to ra, bạn lại cần thêm các constructor khác nhau cho class này, và lại phải gán giá trị khởi tạo cho biến, khá mất công và có thể gây lỗi bởi nhầm lẫn.
Phiên bản này cho phép ta khởi tạo giá trị khi khai báo luôn
```csharp
public ICollection<double> Grades { get; } = new List<double>();
public Standing YearInSchool { get; set; } = Standing.Freshman;
```
Điều này giúp cho việc khởi tạo giá trị cho biến chỉ cần 1 lần.
## 2. Expression-bodied function members
Rất nhiều method hoặc properties chứa body chỉ gồm 1 statement (gần như 1 dòng code), trước kia ta vẫn phải dùng cặp "{}" để chứa chỉ 1 dòng code đó thì nay với **Expression-bodied function**, chúng ta có thể viết code body giống như expression giúp cho code ngắn gọn hơn. Ví dụ override method *ToString*()
```csharp
public override string ToString() => $"{LastName}, {FirstName}";
```
Có thể dùng **Expression-bodied** ở thuộc tính read-only
```csharp
public string FullName => $"{FirstName} {LastName}";
```
## 3. using static
Sử dụng "**using static**" giúp ta import chỉ các method static của 1 class. Và sau đó có thể dùng mà không cần gõ class name ở phía trước, điều này giúp chúng ta dễ dàng đọc code hơn khi mà class name không lặp lại gây lằng nhằng.
Ví dụ dưới đây bạn chỉ cần gọi method "*IsNullOrWhiteSpace*" mà không cần phải ghi dài dòng "**string**.*IsNullOrWhiteSpace*" như trước đây.
```csharp
using static System.String;
```
```csharp
if (IsNullOrWhiteSpace(lastName))
    throw new ArgumentException(message: "Cannot be blank", paramName: nameof(lastName));
```
Cần lưu ý là **Extention Methods** không dùng được khi gọi "**using static**", nó chỉ gọi được bằng cách gọi thông thường của **Extention methods** (dùng class name ở trước), để phân biệt với các static method bình thường, tránh nhầm lẫn.
```csharp
using static System.Linq.Enumerable;
```
```csharp
public bool MakesDeansList()
{
    return Grades.All(g => g > 3.5) && Grades.Any();
    // Code below generates CS0103: 
    // The name 'All' does not exist in the current context.
    //return All(Grades, g => g > 3.5) && Grades.Any();
}
```
## 4. Null-conditional operators
Rất nhiều lần bạn code và sau đó run code thì xuất hiện Exception *Null Reference Exception*, bạn phải check cẩn thận mỗi lần access 1 biến để chắc chắn nó không bị reference từ 1 null object. Với cú pháp mới ở C#6 thì việc check null dễ dàng và ngắn gọn hơn.
```csharp
//check null object person, nếu không null thì gán first từ giá trị FirstName, nếu không thì first null, không gây ra Exception nào.
var first = person?.FirstName; 
```
```csharp
// Dùng toán tử "??" để kiểm tra xem nếu person có bị null hay không, nếu bị null thì trả về giá trị mặc định cho first là "Unspecified"
first = person?.FirstName ?? "Unspecified";
```
Toán tử check null cũng được dùng để kiểm tra nếu việc gọi đến 1 delegate hay event handler để đảm bảo không null và evaluate once (1 câu lệnh, execute đồng thời check null, sau đó invoke)
```csharp
this.SomethingHappened?.Invoke(this, eventArgs);
```
## 5. String Interpolation
Ở các phiên bản trước thì để in ra 1 string theo Format nào đó thì chúng ta phải dùng **string.Format** với câu lệnh lằng nhằng và nhiều khi thiếu hoặc thừa parameter.
```csharp
// phiên bản cũ
public string FullName
{
    get
    {
        return string.Format("{0} {1}", FirstName, LastName);
    }
}
```
Với C#6 thì việc in ra String rất dễ đọc và ngắn gọn với toán tử "$", support các expression trong cặp "{}" kể cả LINQ
```csharp
public string FullName => $"{FirstName} {LastName}";
```
```csharp
public string GetFormattedGradePoint() =>
    $"Name: {LastName}, {FirstName}. G.P.A: {Grades.Average()}";
```
Sử dụng dấu ":" sau Expression để format 
```csharp
public string GetGradePointPercentage() =>
    $"Name: {LastName}, {FirstName}. G.P.A: {Grades.Average():F2}";
```
Sử dụng conditional operation để tính toán ngay trong string interpolation
```csharp
public string GetGradePointPercentages() =>
    $"Name: {LastName}, {FirstName}. G.P.A: {Grades.Any() ? Grades.Average() : double.NaN:F2}";
```
```csharp
public string GetGradePointPercentages() =>
    $"Name: {LastName}, {FirstName}. G.P.A: {(Grades.Any() ? Grades.Average() : double.NaN):F2}";
```
Sử dụng cả Linq operation để tính toán kết quả trong interpolated string
```csharp
public string GetAllGrades() =>
    $@"All Grades: {Grades.OrderByDescending(g => g)
    .Select(s => s.ToString("F2")).Aggregate((partial, element) => $"{partial}, {element}")}";
```
## 6.Exception Filters
Một tính năng mới nữa ở C# 6 là **exeption filters**. Nó chỉ rõ khi nào thì catch code được thi hành. Nếu **exception filter** trả về giá trị true, catch code được thi hành như bình thường, nếu nó trả về giá trị false, catch code bị bỏ qua.
Ví dụ:
```csharp
Nếu mệnh đề "when (e.Message.Contains("301")" trả về false thì code trong block catch sẽ không được execute. Ở đây, exception đã được filter. 
public static async Task<string> MakeRequest()
{
    WebRequestHandler webRequestHandler = new WebRequestHandler();
    webRequestHandler.AllowAutoRedirect = false;
    using (HttpClient client = new HttpClient(webRequestHandler))
    {
        var stringTask = client.GetStringAsync("https://docs.microsoft.com/en-us/dotnet/about/");
        try
        {
            var responseText = await stringTask;
            return responseText;
        }
        catch (System.Net.Http.HttpRequestException e) when (e.Message.Contains("301"))
        {
            return "Site Moved";
        }
    }
}
```

Nếu như theo cách viết thông thường ở phiên bản trước thì sẽ viết như sau 
```csharp
public static async Task<string> MakeRequest()
{ 
    var client = new System.Net.Http.HttpClient();
    var streamTask = client.GetStringAsync("https://localHost:10000");
    try {
        var responseText = await streamTask;
        return responseText;
    } catch (System.Net.Http.HttpRequestException e)
    {
        if (e.Message.Contains("301"))
            return "Site Moved";
        else
            throw;
    }
}
```

Điểm khác biệt ở đây chính là catch exception code không cần execute, và việc debug code đằng sau diễn ra bình thường.
Ngoài ra, ta có thể sử dụng **Exception filter** để log thông tin nếu có exception xảy ra nhưng không muốn catch, chỉ cần return về true ở mệnh để when và log exception information ở đây.
```csharp
public static bool LogException(this Exception e)
{
    Console.Error.WriteLine($"Exceptions happen: {e}");
    return false;
} 
```
```csharp
public void MethodThatFailsSometimes()
{
    try {
        PerformFailingOperation();
    } catch (Exception e) when (e.LogException())
    {
        // This is never reached!
    }
} 
```
Một ứng dụng nữa là ta có thể tùy chọn throw hoặc không throw exception khi Debugger đang được attach. Giúp cho việc debug nhiều tùy chọn.
```csharp
public void MethodThatFailsWhenDebuggerIsNotAttached()
{
    try {
        PerformFailingOperation();
    } catch (Exception e) when (e.LogException())
    {
        // This is never reached!
    }
    catch (RecoverableException ex) when (!System.Diagnostics.Debugger.IsAttached)
    {
        Console.WriteLine(ex.ToString());
        // Only catch exceptions when a debugger is not attached.
        // Otherwise, this should stop in the debugger. 
    }
}
```
## 7. nameof Expressions
Phép tính nameof trả về tên của 1 biến, trường. Nó thường được dùng để cung cấp tên của biến gây ra lỗi hoặc exception
```csharp
if (IsNullOrWhiteSpace(lastName))
    throw new ArgumentException(message: "Cannot be blank", paramName: nameof(lastName));
```
## 8. Await in Catch and Finally blocks
Ở C# 6 bạn đã có thể dùng **await** ở trong **catch** hoặc **finally** block trong **async method**, nhưng hãy cẩn thận vì có thể bạn sẽ tạo ra những Exception mới 
```csharp
public static async Task<string> MakeRequestAndLogFailures()
{ 
    await logMethodEntrance();
    var client = new System.Net.Http.HttpClient();
    var streamTask = client.GetStringAsync("https://localHost:10000");
    try {
        var responseText = await streamTask;
        return responseText;
    } catch (System.Net.Http.HttpRequestException e) when (e.Message.Contains("301"))
    {
        await logError("Recovered from redirect", e);
        return "Site Moved";
    }
    finally
    {
        await logMethodExit();
        client.Dispose();
    }
}
```

## 9. Index Initializers
**Index Initializers** là 1 trong 2 tính năng giúp cho việc khởi tạo giá trị của collection mạnh mẽ hơn với index. Giờ đây, bạn có thể dùng gán giá trị cho collection sử dụng index với **Dictionary<TKey,TValue>** hoặc các kiểu tương tự.
```csharp
private Dictionary<int, string> webErrors = new Dictionary<int, string>
{
    [404] = "Page not Found",
    [302] = "Page moved, but left a forwarding address.",
    [500] = "The web server can't come out to play today."
};
```

## 10. Extension Add methods in collection initializers
Tính năng này rất hữu ích khi bạn có *1 collection class mà có 1 method để thêm 1 item mới vào collection.*
Ví dụ: bạn có 1 lớp như sau
```csharp
public class Enrollment : IEnumerable<Student>
{
    private List<Student> allStudents = new List<Student>();

    public void Enroll(Student s)
    {
        allStudents.Add(s);
    }

    public IEnumerator<Student> GetEnumerator()
    {
        return ((IEnumerable<Student>)allStudents).GetEnumerator();
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return ((IEnumerable<Student>)allStudents).GetEnumerator();
    }
}
```
Method "**Enroll**" dùng để thêm 1 student vào lớp học. Nhưng với constructor cho list thì chúng ta không thể dùng được method này để thêm student vào lớp ở các phiên bản trước.
Nhưng ở c# 6, nếu ta map phương thức "**Add**" của Collection với method "**Enroll**" bằng **Extention method** thì ta có thể khởi tạo list này như sau
```csharp
public static class StudentExtensions
{
    public static void Add(this Enrollment e, Student s) => e.Enroll(s);
}
```
```csharp
var classList = new Enrollment()
{
    new Student("Lessie", "Crosby"),
    new Student("Vicki", "Petty"),
    new Student("Ofelia", "Hobbs"),
    new Student("Leah", "Kinney"),
    new Student("Alton", "Stoker"),
    new Student("Luella", "Ferrell"),
    new Student("Marcy", "Riggs"),
    new Student("Ida", "Bean"),
    new Student("Ollie", "Cottle"),
    new Student("Tommy", "Broadnax"),
    new Student("Jody", "Yates")
};
```
Class Enrollment sẽ map phương thức add với Enroll, đổi với mỗi sinh viên thêm vào thì nó sẽ qua hàm Enroll

## 11. Improved overload resolution
Ở các compiler trước không phân biệt đúng đắn giữa **Task.Run(Action)** và **Task.Run(Fun<Task>())**. ở C#6 compiler xác định rõ rãng **Task.Run(Func<Task>)** ở sự lựa chọn tốt nhất.
```csharp
static Task DoThings() 
{
     return Task.FromResult(0); 
}
```
```csharp
Task.Run(() => DoThings());
```

# Kết 
Hi vọng bài viết đã giúp các bạn có thêm một ít kiến thức về cú pháp mới của C#. **Happy Learning!** :D



Nguồn: https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-6#string-interpolation
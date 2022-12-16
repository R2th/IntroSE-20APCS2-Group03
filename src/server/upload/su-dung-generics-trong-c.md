# 1. Giới thiệu

Trong ngôn ngữ C# một trong những kiểu rất mạnh mẽ để tạo ra các thành phần có thể tái sử dụng, giúp ứng dụng mềm dẻo hơn, dễ bảo trì hơn đó chính là kiểu generic. Các thành phần đó có thể là tham số của hàm, class, interface..Chúng có thể làm việc trên nhiều kiểu dữ liệu khác nhau nhưng lại chỉ cần viết một lần, tránh việc duplicate code. Trong bài viết này tôi sẽ giới thiệu đến các bạn kiểu Generic trong ngôn ngữ C#, tại sao nên dùng nó và các loại generic thường dùng.

# 2. Bài toán cần giải quyết
Giả sử chúng ta có một yêu cầu viết một chương trình thêm một phần tử số nguyên vào list, tất nhiên với việc đó là hết sức dễ dàng nếu ta biết đến class ```List``` trong C#. Tuy nhiên tôi cứ giả định chúng ta chưa biết gì về nó. Tôi sẽ triển khai như sau:
```csharp
public class ExampleList
{
    public void Add(int item) { }
}
```

Trong main của chương trình ta sử dụng nó như sau:

```csharp
class TestProgram
{
    static void Main()
    {
        ExampleList list = new ExampleList();
        list1.Add(1);
    }
}
```
Vấn đề đặt ra là, tôi muốn ExampleList có thể add nhiều loại đối số khác nhau như: string, object, date,..Chúng ta phải làm thế nào? Nếu chưa có generic, ta cần thêm một đối tượng List khác hỗ trợ cho việc add các kiểu dự liệu kia, ví dụ như:

```csharp
public class TextList
{
    public void Add(string item) { }
}

public class ObjectList
{
    public void Add(objetc item) { }
}
...
```
Các bạn có thể thấy đó là một cách giải quyết khá tồi, giả định có khoảng 10 kiểu dữ liệu chúng ta cần viết thêm cho 10 đối tượng List với cùng một cấu trúc như nhau. Đó quả thực là không tốt cho việc bảo trì sau này. Vậy chúng ta phải làm thế nào ? Generic là thứ ta cần đến trong trường hợp này:

```csharp
public class ExampleList<T>
{
    public void Add(T input) { }
}
class TestProgram
{
    private class ListItem { }
    static void Main()
    {
        ExampleList<int> list1 = new ExampleList<int>();
        list1.Add(1);

        ExampleList<string> list2 = new ExampleList<string>();
        list2.Add("Hello world");

        ExampleList<ListItem> list3 = new ExampleList<ListItem>();
        list3.Add(new ListItem());
    }
}
```

Như các bạn thấy ở code trên, chúng ta chỉ cần khai báo một đối tượng ExampleList với một method Add, tham số truyền kiểu T thì các bạn có thể add một item thuộc kiểu int, string, object hay bất kì một đối tượng nào mà bạn khai báo.

Chúng ta đã thêm một kiểu biến là T để định danh class hoặc function. T cho phép chúng ta nắm bắt kiểu mà người dùng cung cấp, như vậy chúng ta có thể sử dụng thông tin này sau. Các bạn có thể dùng T hay một kì một chữ cáikhác như X, Y, ...

# 3. Các loại Generic
### 3.1 Generic Type Parameters
Trong ví dụ ở đầu bài viết thì ExampleList<T> không thực sự là một Generic Type Parameter, bởi vì muốn dùng nó chúng ta cần khởi tạo. Generic Type Parameter có thể hiểu nó như một kiểu dữ liệu có thể dùng khai báo biến, trong đó có một kiểu T là động, nghĩa là chúng ta có thể truyền nhiều kiểu dữ liệu khác nhau cho nó, ví dụ trong C# ta có những kiểu có thể dùng Generic Type Parameter như:

```csharp
public int IComparer<T>() { return 0; }
public delegate bool Predicate<T>(T item);
public struct Nullable<T> where T : struct { /*...*/ }
```
Đây chúng ta có thể gọi là Generic Type

### 3.2 Generic classes

Generic classes đóng gói các xử lý mà không chỉ định rõ kiểu dữ liệu. Hầu hết các trường hợp phổ biến sử dụng generic classes là với collections giống như: danh sách liên kết (Linked List), hash tables, queues, trees,..Các xử lý giống như thêm mới, gỡ bỏ item trong collection cơ bản được thực hiện theo cùng một cơ chế bất kể kiểu dữ nào được lưu trữ trong collection.

Khi tạo custom generic classes của riêng bạn, những điểm quan trọng cần xem xét đó là:
- Những types nào được khái quát hóa đến type parameters.

  Theo quy tắc, bạn càng tham số hóa càng nhiều, code của bạn càng mềm dẻo và dễ tái sử dụng. Tuy nhiên, điều đó cũng có thể làm code khó để đọc và hiểu cho người khác.
- Những ràng buộc gì để áp dụng type parameters
- Liệu implement một hoặc nhiều interfaces.

  Cho ví dụ, nếu bạn đang thiết kế một class mà sẽ sử dụng để tạo các items dựa trên collection, bạn có thể phải implement một interface giống như ```IComparable<T> where T```
  
Code bên dưới là một ví dụ về Generic class:
```csharp
 class Demo<T>
 {
    T value;

    public Demo(T t)
    {
        value = t;
    }

    public void Write()
    {
        Console.WriteLine(value);
    }
 }

class Program
{
    static void Main()
    {
        Demo<int> test1 = new Demo<int>(10);
        test1.Write();

        Demo<string> test2 = new Demo<string>("Cat");
        test2.Write();

        Console.ReadLine();
    }
}
```

### 3.3 Generic Interface

Nó thường hữa ích để định nghĩa cho collection classes, hoặc cho generic classes. Có thể lấy ví dụ như IComparable<T>.

Ví dụ sau demo cách sử dụng Generic interface. Giả sử ta xây dựng một chức năng getAll và save data của đối tượng Book và Author xuống DB. Chúng ta sẽ sử dụng một base interface và triển khai như bên dưới:
```csharp
class Book
{
    public string Name { get; set; }

    public int Page { get; set; }
}

class Author
{
    public string Name { get; set; }

    public int Age { get; set; }
}

interface IBaseRepository<T>
{
    List<T> getAll();

    T Save(T item);
}

class BaseRepository<T>: IBaseRepository<T>
{
    public List<T> getAll()
    {
        return new List<T>();
    }

    public T Save(T item)
    {
        return item;
    }
}

class Program
{
    static void Main()
    {
        BaseRepository<Book> bookRepository = new BaseRepository<Book>();
        BaseRepository<Author> authorRepository = new BaseRepository<Author>();
        Book book = bookRepository.Save(new Book { Name = "Book1", Page = 100 });
        Author author = authorRepository.Save(new Author { Name = "Author1", Age = 50 });

        Console.WriteLine("Book: {0} - page: {1}", book.Name, book.Page);
        Console.WriteLine("Name: {0} - age: {1}", author.Name, author.Age);


        Console.ReadLine();
    }
}
```

### 3.4 Generic method
Một generic method được khai báo với type parameter, có thể hiểu là kiểu của tham số là dynamic (không được chỉ định trước cho đến khi gọi method đó) như code bện dưới:
```csharp
class Program
{
    static int Compare<T>(T first, T second)
    {
        if(first.Equals(second))
        {
            return 0;
        }

        return 1;
    }

    static void Main()
    {
        int result1 = Compare(2, 2);
        int result2 = Compare("abc", "def");

        Console.WriteLine(result1);
        Console.WriteLine(result2);

        Console.ReadLine();
    }
}
```

# 5. Tổng kết
Những điểm nổi bật mà chúng ta có thể tổng kết về generic đó là: 
- Sử dụng generic type tối đa hóa việc tái sử dụng code, đảm bảo và an toàn về kiểu dữ liệu, hiệu suất cao.
- .Net Framwork hỗ trợ một số generic collection, chúng ta nên sử dụng bất kể khi nào có thể, thay vì dùng classes như ```ArrayList```.
- Bạn có thể tạo generic cho riêng mình với nhiều loại khác nhau như: Interfaces, classes, methods, events và delegates.
- Generic classes có thể được ràng buộc để cho phép truy cập các methods trên các data riêng biệt.

Hy vọng bài viết này một phần nào đó có thể giúp các bạn về Generic trong C#, chúc các bạn thành công.

**Tài liệu thàm khảo:**
 - [Generics (C# Programming Guide)](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/generics/)
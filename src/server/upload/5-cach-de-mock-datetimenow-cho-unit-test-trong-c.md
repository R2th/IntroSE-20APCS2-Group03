Trừu tượng hóa logic của application từ property DateTime.Now là 1 task rất thông dụng cho developer khi thực hiện unit test. 
Khi mà DateTime được hard-code vào trong logic, thì unit test sẽ không còn đáng tin cậy.  
Trong ví dụ dưới đây, unit test này chỉ có thể pass nếu nó được chạy trên 1 máy tính siêu nhanh:  
```
//Logic
public class User
{
    public DateTime CreatedAt { get; } = DateTime.Now;
}

//Unit test
public class Tests
{
    [Fact]
    public void UserCreated()
    {
        var user = new User();
        Assert.Equal(DateTime.Now, user.CreatedAt);
    }
}
```
Nhìn vào thì tất nhiên ai cũng thấy, instance DateTime.Now được sử dụng trong logic  sẽ có số milisecond khác với DateTime.Now của unit test case assertion.  
Có ít nhất 5 cách để giải quyết vấn đề DateTime.Now trong các unit test và làm cho chúng chạy chuẩn như expect, chúng ta cùng tìm hiểu nhé.
## IDateTimeProvider Interface
Một trong những cách tiếp cận phổ biến nhất là sử dụng một Interface thay vì sử dụng trực tiếp thuộc tính DateTime.Now.  
```
//Interface
public interface IDateTimeProvider
{
    DateTime GetNow();
}

//Implementation with real DateTime.Now
public class DateTimeProvider : IDateTimeProvider
{
    public DateTime GetNow() => DateTime.Now;
}

//DI-Container registration
services.AddScoped<IDateTimeProvider, DateTimeProvider>();

//App logic 
public class User
{
    public User(IDateTimeProvider dateTimeProvider)
    { 
        CreatedAt = dateTimeProvider.GetNow();
    }

    public DateTime CreatedAt { get; }
}

//FixedDateTimeProvider implementation for unit tests
public class FixedDateTimeProvider : IDateTimeProvider
{
    private DateTime _fixedDateTime;

    public FixedDateTimeProvider(DateTime fixedDateTime)
        => _fixedDateTime = fixedDateTime;

    public DateTime GetNow() => _fixedDateTime;
}

//Unit test
[Fact]
public void UserCreated()
{
    User user = new User(new FixedDateTimeProvider(new DateTime(2021, 07, 20)));

    Assert.Equal(new DateTime(2021, 07, 20), user.CreatedAt);
}
```
**Ưu điểm**:  
* IDateTimeProvider là 1 dependency tường minh. Để hiểu liệu một class cụ thể có hoạt động với IDateTimeProvider hay không, developer chỉ cần nhìn vào hàm constructor của class. Không cần phân tích logic phần còn lại của class.    
* Sẽ tự nhiên hơn khi có một phương thức trả về DateTime hiện tại hơn là một property. Thông thường, khi các developer C# gọi cùng một property nhiều lần, họ thường mong muốn nhận được cùng một giá trị.  

**Nhược điểm**:  
* Nhiều hàm constructor của class phải add thêm param IDateTimeProvider, điều này làm "ô nhiễm" code.    
* Cần thiết phải register Interface và implement trong DI-Container.  
* Không có gì ngăn cản developer tiếp tục sử dụng trực tiếp kiểu DateTime, bỏ qua việc implement IDateTimeProvider.  
## Single DateTimeProvider Class
Ví dụ ở trên có thể được đơn giản hóa. Interface IDateTimeProvider và hai implementation của nó có thể được kết hợp thành một class DateTimeProvider.  
```
//DateTimeProvider implementation
public class DateTimeProvider
{
    private readonly DateTime? _dateTime = null;

    public DateTimeProvider(DateTime fixedDateTime)
        => _dateTime = fixedDateTime;

    public DateTime Now => _dateTime ?? DateTime.Now;
}

//DI-Container registration
services.AddScoped<DateTimeProvider>();

//DateTimeProvider usage in app logic
public class User
{
    public User(DateTimeProvider dateTimeProvider)
    {
        CreatedAt = dateTimeProvider.Now;
    }

    public DateTime CreatedAt { get; }
}

//Unit test
[Fact]
public void UserCreated()
{
    var user = new User(new DateTimeProvider(new DateTime(2021, 07, 20)));
    Assert.Equal(new DateTime(2021, 07, 20), user.CreatedAt);
}
```
**Ưu điểm**:  
*  DateTimeProvider là một dependency tường minh, vì nó được đưa vào hàm constructor.  
*  Solution này đơn giản, chỉ cần 1 single class.  

**Nhược điểm**:  
* Vẫn như phương pháp trên, không có gì ngăn cản developer tiếp tục sử dụng trực tiếp kiểu DateTime.    
* Bắt buộc phải đăng ký bổ sung trong DI-container.    
## Ambient Context Pattern
Có một cách để cung cấp global access point cho DateTime bằng cách sử dụng Ambient Context Pattern implementation.  
```
//DateTimeProvider implementation
public static class DateTimeProvider
{
    private static Func<DateTime> _dateTimeNowFunc = () => DateTime.Now;
    public static DateTime Now => _dateTimeNowFunc();

    public static void Set(Func<DateTime> dateTimeNowFunc)
    {
        _dateTimeNowFunc = dateTimeNowFunc;
    }
}

//DateTimeProvider usage in app logic
public class User
{
    public DateTime CreatedAt { get; } = DateTimeProvider.Now;
}

//Unit test
[Fact]
public void UserCreated()
{
    DateTimeProvider.Set(() => new DateTime(2021, 07, 20));

    var user = new User();

    Assert.Equal(new DateTime(2021, 07, 20), user.CreatedAt);
}
```
**Ưu điểm**:  
*  Sử dụng DateTimeProvider rất giống với sử dụng class DateTime.  
*  Không cần tiến hành đăng kí DI.  

**Nhược điểm**:  
* Vì implementation DateTimeProvider được dựa trên thuộc tính shared static, nên các nội dung test không thể chạy song song.    
* Dependency của DateTimeProvider là ngầm định vì không cần phải đưa nó vào hàm constructor để sử dụng nó. Developer nên review toàn bộ implementation của class để xem liệu nó có được sử dụng ở đó không.  
* Và lại một lần nữa, không có gì ngăn cản developer tiếp tục sử dụng trực tiếp kiểu DateTime.  
## One-line Wrapper
Implementation sau đây cung cấp một wrapper nhỏ cho thuộc tính DateTime.Now
```
//DateTimeProvider implementation
public class DateTimeProvider
{
    public virtual DateTime Now { get; } = DateTime.Now;
}

//DateTimeProvider usage
public class User
{
    public User(DateTimeProvider dateTimeProvider)
    {
        CreatedAt = dateTimeProvider.Now;
    }

    public DateTime CreatedAt { get; }
}

//DI-Container registration
services.AddScoped<DateTimeProvider>();

//Unit test
[Fact]
public void UserCreated()
{
    var mock = new Mock<DateTimeProvider>();
    mock.Setup(x => x.Now).Returns(new DateTime(2021, 07, 20));

    var user = new User(mock.Object);

    Assert.Equal(new DateTime(2021, 07, 20), user.CreatedAt);
}
```
**Ưu điểm**:  
*  DateTimeProvider là một one-line implementation.  
*  DateTimeProvider là một dependency tường minh.  

**Nhược điểm**:   
* Property Now phải là ảo. Nếu không, framework Moq không thể tạo wrapper cho kiểu mock. Nói cách khác, chúng ta làm "ô nhiễm" code chỉ vì mục đích chạy được unit test.    
* Cần thiết phải đăng kí DI cho DateTimeProvider.  
* Và lại một lần nữa, không có gì ngăn cản developer tiếp tục sử dụng trực tiếp kiểu DateTime.  
## Pose Library
Cách tiếp cận cuối cùng là giữ nguyên logic của app và sử dụng Pose library, cho phép bạn thay thế bất kỳ thuộc tính hoặc phương thức nào bằng delegate của riêng bạn.
```
//App logic
public class User
{
    public DateTime CreatedAt { get; } = DateTime.Now;
}

//Unit test
[Fact]
public void UserCreated()
{
    User user = null;

    Shim shim = Shim.Replace(() => DateTime.Now).With(() => new DateTime(2021, 07, 20));

    PoseContext.Isolate(() =>
    {
        user = new User();
    }, shim);

    Assert.Equal(new DateTime(2021, 07, 20), user.CreatedAt);
}
```
**Ưu điểm**:  
*  Không cần thay đổi logic của app.  
*  Lựa chọn duy nhất của developer là kiểu DateTime.  

**Nhược điểm**:  
* Mock type mà bạn không làm chủ thì thường là bad practice. Tham khảo [tại đây](https://github.com/testdouble/contributing-tests/wiki/Don't-mock-what-you-don't-own).    
* Library của bên thứ ba có thể chứa lỗi, yêu cầu effort maintenance bổ sung, v.v..  
* Kiểu DateTime sẽ được sử dụng ngầm trong logic của app.  
  
  Chúng ta vừa xem qua 5 cách để viết unit test cho DateTime.Now, cùng với ưu nhược điểm từng cách. Hi vọng giúp ích được ít nhiều cho các bạn.

## Tham khảo
Đây là một bài dịch, bạn có thể xem bài gốc tại đây.  
https://esashamathews.medium.com/5-ways-to-mock-datetime-now-for-unit-testing-in-c-bf0438eab032
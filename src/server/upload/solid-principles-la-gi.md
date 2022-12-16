* SOLID là từ viết tắt của 5 nguyên tắc quan trọng khi làm việc với lập trinh hướng đối tượng. Nó được đã từng được giới thiệu trong [Design Principles and Design Patterns.] (https://web.archive.org/web/20150906155800/http://www.objectmentor.com/resources/articles/Principles_and_Patterns.pdf) của Robert C. Martin (Uncle Bob).

* 5 nguyên tắc này là làm cho code trở nên dễ hiểu, dễ bảo trì hơn và dễ mở rộng hơn. Là một software developer, 5 nguyên tắc này rất cần thiết!

* Trong bài viết, tôi sẽ giới thiệu các nguyên tắc này, đưa ra các ví dụ bị vi phạm và cách sửa chúng để chúng tuân thủ SOLID. Ví dụ sẽ được đưa ra trong C #, nhưng SOLID có thể áp dụng cho bất kỳ ngôn ngữ OOP nào.

## S -Single responsibility principle
> Một class chỉ nên giữ 1 trách nhiệm duy nhất (Chỉ có thể sửa đổi class với 1 lý do duy nhất).

* Để hiểu nguyên lý này, ta hãy lấy ví dụ với 1 class vi phạm nguyên lý. Ta có 1 class như sau:
```
class User
{
    void CreatePost(Database db, string postMessage)
    {
        try
        {
            db.Add(postMessage);
        }
        catch (Exception ex)
        {
            db.LogError("An error occured: ", ex.ToString());
            File.WriteAllText("\LocalErrors.txt", ex.ToString());
        }
    }
}
```
* Chúng ta có thẻ dễ dàng nhận thấy `CreatedPost()` đảm nhiệm nhiều nhiện vụ. Nó vừa tạo ra 1 post mới và ghi lại lỗi vào 1 file cục bộ.
* Điều này vi phạm single responsibility principle.

Hãy sửa lại cho nó đúng nào:

```
class Post
{
    private ErrorLogger errorLogger = new ErrorLogger();

    void CreatePost(Database db, string postMessage)
    {
        try
        {
            db.Add(postMessage);
        }
        catch (Exception ex)
        {
            errorLogger.log(ex.ToString())
        }
    }
}

class ErrorLogger
{
    void log(string error)
    {
      db.LogError("An error occured: ", error);
      File.WriteAllText("\LocalErrors.txt", error);
    }
}
```
* Việc ghi lại log khi xảy ra lỗi đã được được vào `ErrorLogger`, Bây giờ đã có 2 class, 1 để tạo post và 1 để ghi lại error, chúng ta không còn vi phạm nguyên tắc này nữa.

## O - Open/closed principle
> Objects or entities should be open for extension, but closed for modification.
> (Có thể thoải mái mở rộng 1 class, nhưng không được sửa đổi bên trong class đó)
> 
* Chúng ta có thể đảm bảo rằng code luôn tuân thủ Open/closed principle bằng cách sử dụng inheritance  hoặc interface.
* Để dễ hiểu thì chúng ta đi qua 1 ví dụ:
```
class Post
{
    void CreatePost(Database db, string postMessage)
    {
        if (postMessage.StartsWith("#"))
        {
            db.AddAsTag(postMessage);
        }
        else
        {
            db.Add(postMessage);
        }
    }
}
```
* Trong ví dụ này, dựa vào dấu `#` mà `CreatePost()` sẽ thực thi khác nhau, nếu sau này thêm 1 trường hợp tương tự với dấu `@` thì phải sửa đổi  `CreatePost()` thêm vào 1 case, điều này là vi phạm  Open/closed principle. 

* Và chúng ta hãy sửa lại để nó không vi phạm:
```
class Post
{
    void CreatePost(Database db, string postMessage)
    {
        db.Add(postMessage);
    }
}

class TagPost : Post
{
    override void CreatePost(Database db, string postMessage)
    {
        db.AddAsTag(postMessage);
    }
}
```
* Bằng cách sử dụng thừa kế, việc tạo hành vi mở rộng cho dối tượng Post dễ dàng hơn nhiều bằng cách overide method `CreatePost()`
* Việc kiểm tra ký tự `#` đầu tiên sẽ được xử lí ở nới khác(ở một class có cấp cao hơn), và sau này nếu thay đổi cách kiểm tra ký tự đầu tiên, chúng ta hoàn toàn xử lí ở đó mà không ảnh hưởng đến bất kỳ đến 2 class `Post` và `TagPost`.

## L - Liskov substitution principle
> Trong một chương trình, các object của class con có thể thay thế class cha mà không làm thay đổi tính đúng đắn của chương trình.

* Đây có lẽ là cái khó hiểu nhất, hãy đi qua 1 ví dụ để dễ hiểu hơn:
```
class Post
{
    void CreatePost(Database db, string postMessage)
    {
        db.Add(postMessage);
    }
}

class TagPost : Post
{
    override void CreatePost(Database db, string postMessage)
    {
        db.AddAsTag(postMessage);
    }
}

class MentionPost : Post
{
    void CreateMentionPost(Database db, string postMessage)
    {
        string user = postMessage.parseUser();

        db.NotifyUser(user);
        db.OverrideExistingMention(user, postMessage);
        base.CreatePost(db, postMessage);
    }
}

class PostHandler
{
    private database = new Database();

    void HandleNewPosts() {
        List<string> newPosts = database.getUnhandledPostsMessages();

        foreach (string postMessage in newPosts)
        {
            Post post;

            if (postMessage.StartsWith("#"))
            {
                post = new TagPost();
            }
            else if (postMessage.StartsWith("@"))
            {
                post = new MentionPost();
            }
            else {
                post = new Post();
            }

            post.CreatePost(database, postMessage);
        }
    }
}
```
* Ta nhận thấy rằng `CreatPost ()` trong trường hợp `MentionPost` sẽ làm nhiều hơn chức năng mà nó cần làm, như thông báo cho người dùng và ghi đè đề cập hiện có.
* Vì phương thức `CreatePost ()` không bị overide trong `MentionPost`,  nên khi ta gọi thì sẽ sử dụng `CreatPost ()` từ lớp cha của nó.
* Theo nguyên tắc Liskov chúng ta có thể sửa thành như sau:
```
...

class MentionPost : Post
{
    override void CreatePost(Database db, string postMessage)
    {
        string user = postMessage.parseUser();

        NotifyUser(user);
        OverrideExistingMention(user, postMessage)
        base.CreatePost(db, postMessage);
    }

    private void NotifyUser(string user)
    {
        db.NotifyUser(user);
    }

    private void OverrideExistingMention(string user, string postMessage)
    {
        db.OverrideExistingMention(_user, postMessage);
    }
}

...
```

* Bằng cách refactor class `MentionPost` overide method `CreatPost ()` thay vì gọi nó trên lớp cơ sở của nó, chúng ta không còn vi phạm Liskov substitution principle.
* Đây chỉ là một ví dụ đơn giản về cách sửa lỗi vi phạm nguyên tắc này. Tuy nhiên, tình huống này có thể biểu hiện theo nhiều cách khác nhau và không phải lúc nào cũng dễ xác định.

## I - Interface segregation principle
> Thay vì dùng 1 interface lớn, ta nên tách thành nhiều interface nhỏ, với nhiều mục đích cụ thể

* Nguyên lý này khá dễ hiểu. Hãy tưởng tượng chúng ta có 1 interface lớn, khoảng 100 methods. Việc implements sẽ khá cực khổ, ngoài ra còn có thể dư thừa vì 1 class không cần dùng hết 100 method. Khi tách interface ra thành nhiều interface nhỏ, gồm các method liên quan tới nhau, việc implement và quản lý sẽ dễ hơn.
* Hãy đi vào 1 ví dụ cụ thể như sau:
```
interface IPost
{
    void CreatePost();
}

interface IPostNew
{
    void CreatePost();
    void ReadPost();
}
```
* Giả sử răng đầu tiên tôi có interface `IPost` với method `CreatePost()`.
* Sau đó, tối muốn thêm vào interface này method `ReadPost()`, vì vậy tạo thêm 1 interface `IPostNew`, và điều này vi phạm Interface segregation principle.
* Để khắc phục, tôi có code như sau:
```
interface IPostCreate
{
    void CreatePost();
}

interface IPostRead
{
    void ReadPost();
}
```
* Bất kỳ 1 class nào cần cả 2 phương thức thì sẽ cho nó implement cả 2 interface.
## D - Dependency inversion principle
* Cuối cùng, chúng ta đã đến D, nguyên tắc cuối cùng trong số 5 nguyên tắc.
> 1. Các module cấp cao không nên phụ thuộc vào các modules cấp thấp. 
   Cả 2 nên phụ thuộc vào abstraction.
> 2. Interface (abstraction) không nên phụ thuộc vào chi tiết, mà ngược lại.
> ( Các class giao tiếp với nhau thông qua interface, không phải thông qua implementation.)
* Để tuân thủ nguyên tắc này, chúng ta cần sử dụng một design patern, đó là dependency inversion pattern. thường giải quyết bằng cách sử dụng dependency injection.
* Thông thường, dependency injection được sử dụng bằng cách ‘injecting’  bất kỳ 1 sự phụ thuộc nào có trong 1 class, thông qua hàm tạo để nhận giá trị từ input.
* Hãy xem ví dụ sau:
```
class Post
{
    private ErrorLogger errorLogger = new ErrorLogger();

    void CreatePost(Database db, string postMessage)
    {
        try
        {
            db.Add(postMessage);
        }
        catch (Exception ex)
        {
            errorLogger.log(ex.ToString())
        }
    }
}
```
* Quan sát cgungs ta có thể dễ dàng thấy, instance của `ErrorLogger` trong lớp `Post`. Đây là 1 vi phạm đối với Dependency inversion principle.
* Nếu chúng ta muốn sử dụng một loại logger khác, chúng ta sẽ phải sửa đổi lớp `Post`.
* Sửa lại  nó thông qua `dependency injection`
```
class Post
{
    private Logger _logger;

    public Post(Logger injectedLogger)
    {
        _logger = injectedLogger;
    }

    void CreatePost(Database db, string postMessage)
    {
        try
        {
            db.Add(postMessage);
        }
        catch (Exception ex)
        {
            logger.log(ex.ToString())
        }
    }
}
```
* Giờ đây, logger không còn phụ thuộc vào lớp `Post` nữa, chúng ta có thể thay đổi nó tùy thích bằng việc truyền nó vào lớp này lúc khởi tạo.
## Conclusion
* Bằng cách áp dụng 5 nguyên tắc tạo ra từ SOLID, chúng ta sẽ có được 1 source code có thể dùng lại, dễ bảo trì, mở rộng và dễ kiểm tra.
* Đây là 5 nguyên tắc thiết yếu được sử dụng bởi các dev chuyên nghiệp trên toàn cầu, bạn nên bắt đầu áp dụng các nguyên tắc này ngay hôm nay!
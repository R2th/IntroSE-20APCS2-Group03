Trong Swift chúng ta có năm loại `access-level modifier` đó là: `open`, `public`, `internal`, `fileprivate` and `private`. Một thuộc tính được khai báo internal nghĩa là nó chỉ có thể được sử dụng bên trong module mà nó được khai báo. Trong Swift, mặc định các thuộc tính đều là internal, tuy nhiên mọi thứ sẽ trở nên thú vị khi chúng ta chia code thành nhiều module.

Trong khuôn khổ bài viết này chúng ta sẽ xem làm sao để có thể truy xuất cấu trúc dữ liệu bên trong các class của framework, trong khi vẫn có thể giữ cho các thuộc tính internal được ẩn.

# Vấn đề

Hầu hết các ứng dụng hiện nay đều lưu dữ liệu dưới local, chúng ta có rất nhiều lựa chọn như: Core Data, Realm, SQLite,... Và cho dù có chọn cách nào đi chăng nữa, thì khi project phình to lên trên 10k, 50k, 100k dòng code thì chắc chắn chúng ta sẽ phải bắt đầu nghĩ đến việc chia chúng thành các module. 

Giả sử chúng ta có một module được chia từ main target của project chứa các đoạn code liên quan đến việc thao tác với database. Hãy tạm gọi nó là PersistenceKit - theo như quy ước đặt tên của Apple. Chúng ta có thể implement module này như là một [`dynamic framework`](https://developer.apple.com/library/archive/documentation/DeveloperTools/Conceptual/DynamicLibraries/100-Articles/OverviewOfDynamicLibraries.html) hoặc [`static framework`](https://www.bignerdranch.com/blog/it-looks-like-you-are-trying-to-use-a-framework/) tùy ý.

Hãy giả sử rằng PersistenceKit sẽ chứa nhiều [`repositories`](https://en.wikipedia.org/wiki/Data_access_object), chẳng hạn như: ArticleRepository, UserRepository, v.v. mà chúng ta sẽ sử dụng để tìm nạp và lưu trữ dữ liệu. Một repository có thể được implement như sau:

```
public struct Article {
    public let id: ArticleID
    public let title: String
    public let content: String
}

public class ArticleRepository {
    public func article(for id: ArticleID) -> Article? {
        // finds a row in the database and maps it to a struct
        //
        // missing implementation
    }

    // other methods...
}
```

Trong phần implement của Repository trên, để có thể thao tác với database, chúng ta cần sử dụng một số object liên quan đến cơ sở dữ liệu được sử dụng trong project, như:

* Core Data: [NSManagedObjectContext](https://developer.apple.com/documentation/coredata/nsmanagedobjectcontext)
* Realm: [Realm object](https://realm.io/docs/swift/latest/#opening-realms)
* SQLite in C: [sqlite3 pointer](https://www.sqlite.org/c3ref/sqlite3.html)
* GRDB.swift: [DatabasePool](https://github.com/groue/GRDB.swift/blob/6c7ac25fb8a75396774260b96e3a149d4ba92310/GRDB/Core/DatabasePool.swift)

Để cố gắng trở thành những lập trình viên giỏi và có tâm, có tầm, chúng ta nên:

* Tránh việc sử dụng singleton hoặc biến global để tham chiếu đến các object kể trên.
* Không cho phép các người sử dụng module PersistenceKit biết về cách mà nó implement như thế nào, tức là không chó người dùng biết chúng ta đang sử dụng `NSManagedObjectContext` hay `DatabasePool` hay gì gì đi chăng nữa.


# Giải pháp

Gần đây tôi đã suy nghĩ về hai điều kể trên và cố gắng tìm một giải pháp có thể khiến bản thân hài lòng. Nó dựa trên sự kết hợp của việc sử dụng `public` và `internal` modifier. Giả sử chúng ta khai báo một struct:

```
public struct Connection {
    let pool: DatabasePool
}
```

Bằng cách này thuộc tính Connection có thể truy cập được từ bên ngoài `PersistenceKit`, còn thuộc tính `pool` thì không. Thậm chí ta cũng không thể khởi tạo được struct này bên ngoài `PersistenceKit` bởi vì [`memberwise initializer`](https://docs.swift.org/swift-book/LanguageGuide/AccessControl.html#ID21) trong trường hợp này là `internal`.

Và bởi vì người sử dụng module `PersistenceKit`  sẽ không thể tự mình khởi tạo `Connection`, nên chúng ta cần cung cấp cho họ một instance, như sau:

```
public struct AppDatabase {
    public func setup(with path: URL) throws -> Connection {
        // performs the setup and returns a connection instance
    }
}
```

Việc tiếp theo là truyền instance của `Connection` trên vào `ArticleRepository`, như sau:

```
public class ArticleRepository {
    public func article(for id: ArticleID, connection: Connection) -> Article? {
        // we can access `pool` property here because it’s accessible in this module
        return connection.pool.read { (db) -> Article? in
            return Article.fetchOne(db, key: id)
        }
    }
}
```

Như vậy, kể từ bây giờ chúng ta có thể setup PersistenceKit như sau:

```
class AppCoordinator {
    let connection: PersistenceKit.Connection
    ...

    init() throws {
        let database = AppDatabase()
        connection = try database.setup(with: path)
    }
}
```

Và bất cứ khi nào muốn fetch dữ liệu, chúng ta chỉ cần truyền `connection` vào trong phương thức của `ArticleRepository`:

```
let repository = ArticleRepository()
let article = repository.article(for: id, connection: connection)
```

Bằng cách trên, người sử dụng framework  sẽ không thể gọi trực tiếp Connection.pool được, vì nó không thể truy cập được bên ngoài `PersistenceKit`. Nhờ đó chúng ta có thể đảm bảo được rằng người khác không thể truy cập đến các thành phần bên trong `PersistenceKit`, từ đó đảm bảo được tính [cleaner overall architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

# Tóm lại

Public types đi kèm với internal properties là một công cụ hết sức mạnh mẽ, giúp cho framework của chúng ta tuy vẫn có thể cho phép người dùng có được những thứ họ mong muốn, nhưng lại đảm bảo được họ không biết ta đang làm gì bên trong framework. 

Bạn đang sử dụng bất kì một cách tiếp cận nào khác với public types cùng internal properties không, hãy cho tôi biết bằng cách comment ở bên dưới bài viết nhé!
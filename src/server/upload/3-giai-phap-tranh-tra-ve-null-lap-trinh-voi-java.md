Lập trình viên Java thì ai cũng biết đến exception kinh điển là `NullPointerException`. Nó là một RuntimeException, nó bắn ra khi đoạn code xử lý biến `null`. Với hầu hết các ứng dụng, `null` được trả về vì ba lý do chính: (1) để biểu thị rằng không có phần tử nào cho danh sách trả về, (2) báo hiệu rằng không tìm thấy giá trị nào, mặc dù không có lỗi xảy ra, và (3) biểu thị giá trị trả về cho trường hợp đặc biệt.

Với ứng dụng hiệu năng cao, `null` ngoài tác dụng thông báo không có giá trị nào được trả về thì, nó còn là giải pháp tốt để giảm thiểu số lượng object, tiết kiệm bộ nhớ.

Ngoài bối cảnh ứng dụng hiệu năng cao, `null` đem đến không ít phiền toái. Đó là những dòng code kiểm tra `null` trước khi xử lý biến trả về, hoặc là gặp lỗi exception khi cố tình lờ đi việc kiểm tra.

Sau đây là cách xử lý để tránh trả về `null` cho từng trường hợp cụ thể tương ứng ba lý do đã liệt kê ở trên.
## 1. Danh sách rỗng
Khi trả về List hay bất kỳ Collections nào khác, ta vẫn thường trả về `null` trong trường hợp không tìm thấy giá trị nào của danh sách. Xét ví dụ đơn giản là một service quản lý User của một database như sau.
```Java
public class UserService {
    public List<User> getUsers() {
        User[] usersFromDb = getUsersFromDatabase();
        if (usersFromDb == null) {
            // No users found in database
            return null;
        }
        else {
            return Arrays.asList(usersFromDb);
        }
    }
}
UserServer service = new UserService();
List<Users> users = service.getUsers();
if (users != null) {
    for (User user: users) {
        System.out.println("User found: " + user.getName());
    }
}
```
Bằng việc trả về `null` cho trường hợp không tìm thấy user nào từ database, phía client (nhận giá trị trả về) phải kiểm tra `null` trước khi thực hiện vòng lặp để xử lý danh sách user trả về. Nếu thay vì trả về `null`, ta trả về một List rỗng - không có phần tử nào thì phía client có thể bỏ qua bước kiểm tra `null và thực hiện vòng lặp ngay.
```Java
public class UserService {
    public List<User> getUsers() {
        User[] usersFromDb = getUsersFromDatabase();
        if (usersFromDb == null) {
            // No users found in database
            return Collections.emptyList();
        }
        else {
            return Arrays.asList(usersFromDb);
        }
    }
}
UserServer service = new UserService();
List<Users> users = service.getUsers();
for (User user: users) {
    System.out.println("User found: " + user.getName());
}
```
Trong trường hợp trên, ta đã chọn giải pháp là trả về danh sách rỗng và không thay đổi được (immutable). Cách này được coi như một giải pháp có thể chấp nhân được. Nó sẽ gây exception khi phía client không chỉ duyệt danh sách trả về mà còn biến đổi nó. Để tránh ngoại lệ này thì ta có thể trả về danh sách rỗng và có thể thay đổi, như sau.
```Java
public List<User> getUsers() {
    User[] usersFromDb = getUsersFromDatabase();
    if (usersFromDb == null) {
        // No users found in database
        return new ArrayList<>();    // A mutable list
    }
    else {
        return Arrays.asList(usersFromDb);
    }
}
```
## 2. Xử dụng Optional
Nhiều lần, ta trả về `null` với mong muốn là báo cho client biết rằng giá trị Optional không có, nhưng không hề có lỗi xảy ra. Ví dụ, lấy giá trị của tham số từ một URL. Trong một số trường hợp thì tham số tồn tại, một số trường hợp khác thì không.

Việt thiếu tham số này không nhất thiết là lỗi, nhưng đúng hơn, nó nói nên rằng người dùng không muốn một chức năng được kèm theo khi tham số được cung cấp (chẳng hạn chức năng sắp xếp). Chúng ta có thể trả về `null` khi không có tham số hoặc trả về giá trị của tham số khi nó được cung cấp.
```Java
public class UserListUrl {
    private final String url;
    public UserListUrl(String url) {
        this.url = url;
    }
    public String getSortingValue() {
        if (urlContainsSortParameter(url)) {
            return extractSortParameter(url);
        }
        else {
            return null;
        }
    }
}
UserService userService = new UserService();
UserListUrl url = new UserListUrl("http://localhost/api/v2/users");
String sortingParam = url.getSortingValue();
if (sortingParam != null) {
    UserSorter sorter = UserSorter.fromParameter(sortingParam);
    return userService.getUsers(sorter);
}
else {
    return userService.getUsers();
}
```
Khi không có tham số được cung cấp ta trả về `null`, khi đó client phải có bước kiểm tra `null` của biến trả về để tránh exception. Nhưng không chỗ nào của hàm `getSortingValue()` cho thấy giá trị sắp xếp là tùy chọn (có thể có hoặc không).

Thay vào đó, ta có thể làm cho ý nghĩa tùy chọn của giá trị sắp xếp rõ ràng hơn bằng cách trả về đối tượng Optional. Như ta thấy, phía client vẫn phải xử lý (kiểm tra present) cho trường hợp không có tham số, nhưng bây giờ yêu cầu đã được làm rõ ràng hơn. Hơn nữa, lơp Optional cung cấp nhiều cơ chế để xử lý cho trường hợp tham số bị thiếu hơn là chỉ có một tùy chọn kiểm tra `null` đơn giản.
```Java
public class UserListUrl {
    private final String url;
    public UserListUrl(String url) {
        this.url = url;
    }
    public Optional<String> getSortingValue() {
        if (urlContainsSortParameter(url)) {
            return Optional.of(extractSortParameter(url));
        }
        else {
            return Optional.empty();
        }
    }
}
UserService userService = new UserService();
UserListUrl url = new UserListUrl("http://localhost/api/v2/users");
Optional<String> sortingParam = url.getSortingValue();
if (sortingParam.isPresent()) {
    UserSorter sorter = UserSorter.fromParameter(sortingParam.get());
    return userService.getUsers(sorter);
}
else {
    return userService.getUsers();
}
```
Vài cơ chế hữu dụng khác của Optional giúp giảm thiểu code mà vẫn đảm bảo rõ ràng đủ nghĩa.
```Java
sortingParam.ifPresentOrElse(
    param -> System.out.println("Parameter is :" + param),
    () -> System.out.println("No parameter supplied.")
);
```
Trường hợp chỉ xử lý khi tham số được cung cấp.
```Java
sortingParam.ifPresent(param -> System.out.println("Parameter is :" + param));
```
## 3. Giá trị cho trường hợp đặc biệt
Trường hợp trả về `null` phổ biến cuối cùng là giá trị cho trường hợp đặc biệt. Trong đó, phía client sẽ phải có một xử lý khác các xử lý thông thường khi giá trị trả về không là một trong các giá trị thông thường.

Ta xét ví dụ, chức năng xử lý lệnh mà từ đó client yêu cầu các lệnh để hoàn thành. Nếu không có bất kì lệnh nào sẵn sàng thì client sẽ tạm dừng 1 giây rồi yêu cầu lại. Theo cách thông thường chúng ta xử lý bằng cách trả về `null` khi không có lệnh nào sẵn sàng. Như vậy client buộc phải kiểm tra `null`.
```Java
public interface Command {
    public void execute();
}
public class ReadCommand implements Command {
    @Override
    public void execute() {
        System.out.println("Read");
    }
}
public class WriteCommand implements Command {
    @Override
    public void execute() {
        System.out.println("Write");
    }
}
public class CommandFactory {
    public Command getCommand() {
        if (shouldRead()) {
            return new ReadCommand();
        }
        else if (shouldWrite()) {
            return new WriteCommand();
        }
        else {
            return null;
        }
    }
}
CommandFactory factory = new CommandFactory();
while (true) {
    Command command = factory.getCommand();
    if (command != null) {
        command.execute();
    }
    else {
        Thread.sleep(1000);
    }
}
```
Vì lớp `CommandFactory` có thể trả về lệnh null, nên client có nghĩa vụ kiểm tra nếu lệnh nhận được là null thì tạm dừng 1 giây. Điều này tạo ra một tập hợp các logic điều kiện mà client phải tự xử lý.

Chúng ta có thể khắc phục điều này bằng cách tạo một đối tượng null (đôi khi được gọi là một đối tượng đặc biệt). Một đối tượng null được đóng gói logic mà đã được thực hiện trong kịch bản null phía client (cụ thể là dừng 1 giây) vào một đối tượng được trả về trong trường hợp null.

Đối với ví dụ lệnh của chúng ta là tạo lệnh `SleepCommand` thực hiện dừng khi lệnh được thực thi.
```Java
public class SleepCommand implements Command {
    @Override
    public void execute() {
        Thread.sleep(1000);
    }
}
public class CommandFactory {
    public Command getCommand() {
        if (shouldRead()) {
            return new ReadCommand();
        }
        else if (shouldWrite()) {
            return new WriteCommand();
        }
        else {
            return new SleepCommand();
        }
    }
}
CommandFactory factory = new CommandFactory();
while (true) {
    Command command = factory.getCommand();
    command.execute();
}
```
Trong thực tế có thể có những trường hợp mà quyết định giải quyết vụ việc đặc biệt phải do client thực hiện. Điều này có thể được xử lý bằng cách cho phép client tạo và xử dụng một giá trị mặc định, như được thực hiện với lớp Optional.

Quay lại ví dụ cho trường hợp 2 Optional, client có thể lấy giá trị chứa trong Optional hoặc giá trị mặc định bằng phương thức orElse:
```Java
UserService userService = new UserService();
UserListUrl url = new UserListUrl("http://localhost/api/v2/users");
Optional<String> sortingParam = url.getSortingValue();
String sort = sortingParam.orElse("ASC");
return userService.getUsers(sort);
```
Ba giải pháp trên không giải quyết hoàn toàn việc trả về `null` trong lập trình Java nhưng, nếu ta luôn đê ý đến nó khi viết code để áp dụng nó một cách hợp lý sẽ làm giảm rủi ro lỗi `NullPointerException` khi ứng dụng đang hoạt động.

### Tài liệu tham khảo
* [Dzone](https://dzone.com/articles/3-things-every-java-developer-should-stop-doing)
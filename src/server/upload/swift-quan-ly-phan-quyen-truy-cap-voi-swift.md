Làm cho ứng dụng của bạn tốt hơn bằng cách kiểm soát những tài nguyên nào người dùng có thể truy cập và những hành động nào họ có thể thực hiện.
<br><br>
Access control có ích cho những ứng dụng có phân loại người dùng khác nhau hoặc thậm chí chỉ thực hiện chức năng đăng nhập, đôi khi nó đơn giản là ngăn người dùng chưa đăng nhập truy cập nội dung của ứng dụng nhưng có những tình huống khác không đơn giản như vậy.<br>
Trong bài viết này, chúng tôi sẽ đi sâu hơn vào chủ đề đó bằng cách xây dựng một ứng dụng tin tức để chia tin tức thành các nhóm, ứng dụng của chúng tôi có các yêu cầu sau:<br>
* Bất cứ ai cũng có thể duyệt các nhóm công khai ngay cả khi là người dùng ẩn danh
* Duyệt các nhóm riêng tư và đăng lên,  giới hạn chỉ cho các thành viên trong nhóm
* Việc xóa bài đăng trong nhóm chỉ được giới hạn cho quản trị viên của nhóm (lưu ý rằng quản trị viên nhóm cũng có thể duyệt và đăng lên nhóm của mình)
* Super admin có thể duyệt, đăng hoặc xóa bài đăng từ bất kỳ nhóm nào
<br><br>
Vì vậy, ví dụ: nếu chúng tôi có 4 nhóm, trong đó chỉ có Nhóm 1 và Nhóm 4 là công khai, ứng dụng sẽ như thế này:
<br><br>
![](https://images.viblo.asia/5d7d82f9-ac55-4085-b140-b8064cac5a7c.gif)<br>
![](https://images.viblo.asia/e37d9b26-3a9a-4826-8017-9b1033db99e2.png)

## Thiết kế để dễ dàng thay đổi
Một điều cuối cùng tôi muốn nói với bạn trước khi chúng tôi bắt đầu thực hiện giải pháp của mình, trong các tình huống thực tế, hầu hết các yêu cầu này sẽ liên tục thay đổi theo nhu cầu kinh doanh khác nhau.<br>
Khi thiết kế giải pháp cho một vấn đề, chúng ta nên làm thế nào để dễ dàng thay đổi sau này và làm thế nào chúng ta có thể làm cho giải pháp của mình đủ linh hoạt để nắm bắt những thay đổi và với chi phí tối thiểu.<br>

## Plan
* Vai trò: người dùng ẩn danh, thành viên nhóm, quản trị viên nhóm, siêu quản trị viên
* Hành động: duyệt nhóm, đăng lên nhóm, xóa bài
* Tài nguyên: nhóm, bài đăng
<br><br>
![](https://images.viblo.asia/7b879880-9665-4268-9e4f-88949f871f75.png)
<br><br>
Tiếp theo, chúng ta cần một cách khai báo để mô tả mối quan hệ giữa ba miền này theo vai trò có thể thực hiện. <br>
Ví dụ, thành viên nhóm sẽ có thể duyệt một nhóm khi anh ta là thành viên của nhóm này.
<br><br>
![](https://images.viblo.asia/184eb88b-e5b4-464b-9e84-b23709fe516e.png)
<br><br>
Chúng ta hãy gọi phương trình này là policy, vì vậy bây giờ chúng ta có thể chuyển đổi bất kỳ yêu cầu nào mà chúng ta có về quyền kiểm soát truy cập thành policy. <br>
Một số policy thậm chí không cần điều kiện, ví dụ như một siêu quản trị viên có thể duyệt bất kỳ nhóm nào mà không có giới hạn nào, trong trường hợp đó chúng ta cần bỏ qua điều kiện vì nó sẽ luôn true.
<br><br>
![](https://images.viblo.asia/56d6ab43-eaec-4627-bf4a-8ef77c86edf2.png)
<br><br>
Trong phần tiếp theo sẽ tận dụng sức mạnh của Swift để triển khai một framework có thể:

* Mô tả và duy trì các yêu cầu dưới dạng một bộ policy.
* Cung cấp API cho các thành phần hệ thống khác để hỏi xem người dùng có được phép thực hiện một hành động cụ thể nào đó hay không (tuân thủ các policy).

<br>
## Triển khai
Viết trước những gì muốn đạt được:
<br><br>
```
/ The Group member policy
GroupMember.shouldBeAbleTo(BrowseGroup)
    .when(member.groupId == action.groupId)
// create users
user1 = GroupMember(name = "Adam Smith", age = 18, groupId = 1)
user2 = GroupMember(name = "Adam Smith", age = 18, groupId = 2)
// create action
browseGroup2 = BrowseGroup(groupId = 2)
// check if user is allowed 
user1.can(browseGroup2)  // false
user2.can(browseGroup2)  // true
```

Trong ứng dụng tin tức của chúng tôi, giả sử rằng chúng tôi có một class User có chứa thông tin người dùng cơ bản như tên và tuổi và class Group chứa thông tin nhóm cơ bản như groupNumber và cờ cho biết nhóm có công khai hay không:
<br>
```
class User {
    var name: String?
    var age: Int?
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
}

struct Group {
    let groupNumber: Int
    let isPublicGroup: Bool
}
```

Vì Swift là ngôn ngữ lập trình POP, chúng tôi sẽ sử dụng sức mạnh của các protocol và protocol extension để xây dựng giải pháp. <br>
Chúng tôi sẽ soạn thảo vai trò cho người dùng bằng cách ánh xạ vai trò với các protocol và trộn các protocol này với class User để tạo các loại người dùng khác nhau dựa trên vai trò của họ.<br>
Ví dụ: lớp User tuân thủ protocol GroupMember là GroupMemberUser và phải có thuộc tính groupNumber.
<br><br>
![](https://images.viblo.asia/c9d30e91-4016-41f4-9d39-46e9751a8ac3.png)

Bây giờ xem xét phân cấp vai trò, chúng tôi sẽ mô hình hóa tất cả các vai trò như các protocol. Ví dụ: GroupAdmin mở rộng GroupMember vì mỗi GroupAdmin là một GroupMember, điều này có nghĩa là quản trị nhóm có tất cả các đặc quyền của thành viên nhóm. <br>
```
protocol Role { }
protocol Anonymous: Role { }
protocol GroupMember: Role {
    var groupNumber: Int {set get}
}
protocol GroupAdmin: GroupMember { }  // every GroupAdmin is-a GroupMember
protocol SuperAdmin: Role { }
```
<br>
Bước tiếp theo là mô hình hóa các hành động, ánh xạ các hành động khác nhau thành các loại đơn giản (trong trường hợp của chúng tôi, tôi chọn struct) phù hợp với protocol Action
<br>
```
protocol Action {  }
struct BrowseGroup: Action {
    let group: Group
}
struct PostToGroup: Action {
    let group: Group
}
struct DeleteGroup: Action {
    let group: Group
}
```

Phần tiếp theo là quản lý mối quan hệ giữa các hành động và vai trò, Chính sách. Hãy nhớ từ phần trước rằng Policy = Vai trò + Hành động + Điều kiện. <br>
```
public class Policy {
    let action: Action
    let role: Role
    var condition: ((Role, Action) -> Bool)?
    
    init(action: Action, role: Role) {
        self.action = action
        self.role = role
    }
    
    func apply(role: Role, action: Action) -> Bool {
        return condition?(role, action) ?? false
    }
    
    public func when(condition: @escaping (Role, Action) -> Bool) {
        self.condition = condition
    }
}
```

## Kết nối lại với nhau

Chúng tôi sẽ thay đổi các giao thức Vai trò và Hành động như sau:
```
internal var rules = [Policy]()

public protocol Action {
    init()
    static var action: Action.Type { get }
}

public extension Action {
    static var action: Action.Type { return Self.self }
}

public protocol Role {
    init()
    static func shouldBeAbleTo (_ action: Action.Type) -> Policy
    func can (_ action: Action) -> Bool
}

public extension Role {
    static func shouldBeAbleTo(_ action: Action.Type) -> Policy {
        let rule = Policy(action: action.init(), role: self.init())
        rule.condition = { role, action in
            guard role is Self else {
                return false
            }
            return true
        }
        rules.append(rule)
        return rule
    }
    
    func can (_ action: Action) -> Bool {
        return rules.reduce(false) {
            $1.apply(role: self, action: action) || $0
        }
    }
}
```

Ở đây, chúng tôi đã thêm chức năng ShouldBeAbleTo vào giao thức Role, chức năng này hoạt động như một phương thức tạo chính sách kết nối Action với Role, sau đó chúng tôi có thể gán điều kiện bổ sung cho chính sách này bằng cách sử dụng chức năng khi chúng tôi thêm vào trước trong lớp Chính sách. <br>

Bây giờ mọi thứ đã sẵn sàng, bây giờ có thể cung cấp framework của chúng tôi với tất cả các chính sách có trong các yêu cầu và xây dựng ứng dụng:
<br>
```
GroupAdminUser.shouldBeAbleTo(DeleteGroup.action).when {
    guard let groupAdmin = $0 as? GroupAdminUser,
        let deleteAction = $1 as? DeleteGroup else {
            return false
    }
    return groupAdmin.groupNumber == deleteAction.group.groupNumber
}

GroupMemberUser.shouldBeAbleTo(BrowseGroup.action).when {
    guard let groupMember = $0 as? GroupMember,
        let browseAction = $1 as? BrowseGroup else { return false }
    return groupMember.groupNumber == browseAction.group.groupNumber
}

AnonymousUser.shouldBeAbleTo(BrowseGroup.action).when {
    guard let browseAction = $1 as? BrowseGroup else { return false }
    return browseAction.group.isPublicGroup
}

_ = SuperAdminUser.shouldBeAbleTo(BrowseGroup.action)
_ = SuperAdminUser.shouldBeAbleTo(PostToGroup.action)
_ = SuperAdminUser.shouldBeAbleTo(DeleteGroup.action)
```

Việc triển khai này cho phép thêm các chính sách mới với ít chi phí. Nếu nhận được một yêu cầu mới muốn cho phép người dùng duyệt một nhóm nếu nó được tạo cho tin tức trong phạm vi 30 km từ nơi người dùng sống, chúng tôi có thể thực hiện theo yêu cầu:
```
User.shouldBeAbleTo(BrowseGroup.action).when {
    guard let user = $0 as? User,
        let browseAction = $1 as? BrowseGroup else { return false }
    return distanceBetween(user.locaion, browseAction.group.location) < 30
}
```
## Kết luận 
Trong bài viết này, chúng tôi đã triển khai framework kiểm soát truy cập dựa trên vai trò đơn giản trong Swift. 
Giải pháp của chúng tôi đã sử dụng sức mạnh của các protocol để cho phép chúng tôi mô hình hóa các yêu cầu. <br>
Mã nguồn đầy đủ của bài viết này : https://github.com/mmabdelateef/Koosa.
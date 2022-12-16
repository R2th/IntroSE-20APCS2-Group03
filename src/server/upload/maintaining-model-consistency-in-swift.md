Khi thiết kế model layer của bất kỳ ứng dụng hoặc hệ thống nào, việc thiết lập một model nhất quán cho mỗi state và dữ liệu mà chúng ta xử lý là điều cần thiết, để làm cho logic của chúng ta có thể dự đoán được.
Tuy nhiên, đảm bảo rằng mỗi state được lưu trữ ở một nơi duy nhất thường nói dễ hơn làm - và rất phổ biến khi kết thúc với các bug và error do model data không nhất quán, đặc biệt là khi các model đó được truyền qua và biến đổi ở nhiều nơi khác nhau.
Các lỗi đó chắc chắn xảy ra bên ngoài các mô hình, trong bài viết này, chúng ta hãy xem làm thế nào chúng ta có thể cải thiện tính nhất quán bên trong mỗi model của mình - và làm thế nào để chúng ta thiết lập một nền tảng mạnh mẽ hơn cho codebase chúng ta.
## Deriving dependent states
overall model layer cho bất kỳ hệ thống cụ thể nào thường được mô tả dưới dạng phân cấp, trong đó các phần dữ liệu cấp cao hơn phụ thuộc vào một số dạng trạng thái cơ bản. Ví dụ đơn giản, giả sử chúng ta đang làm việc trên một ứng dụng quản lý contact và chúng ta có một model Contact chứa thông tin liên hệ của mỗi người - như tên và địa chỉ email của họ:
```
struct Contact {
    let id: ID
    var firstName: String
    var lastName: String
    var fullName: String
    var emailAddress: String
    ...
}
```
Thoạt nhìn, code ở trên có thể trông giống như bất kỳ data model tiêu chuẩn nào, nhưng thực sự có một rủi ro đáng kể để nó trở nên không nhất quán. Vì chúng ta có ba thuộc tính riêng biệt cho `firstName`, `lastName` và `fullName`, chúng ta luôn phải nhớ cập nhật `fullName` bất cứ khi nào chúng ta thực hiện thay đổi đối với `firstName`, `lastName` nếu không dữ liệu của chúng ta sẽ không nhất quán. Thay vì triển khai `fullName` như một stored property riêng biệt, thay vào đó, hãy biến nó thành một property được tính toán:
```
struct Contact {
    let id: ID
    var firstName: String
    var lastName: String
    var fullName: String { "\(firstName) \(lastName)" }
    var emailAddress: String
    ...
}
```
Bằng cách đó, chúng ta không còn phải lo lắng về việc model của chúng tôi trở nên không nhất quán, vì `fullName` của một contact bây giờ sẽ được tính lại mỗi khi nó truy cập theo `firstName` và `lastName` hiện tại.
Tuy nhiên, luôn luôn tính toán lại state phụ thuộc mỗi lần nó được truy cập không phải lúc nào cũng thực tế - đặc biệt nếu state đó phụ thuộc vào một tập hợp lớn các phần tử  hoặc nếu tính toán được yêu cầu liên quan nhiều hơn một chút so với việc kết hợp một vài giá trị cơ bản.
Giống như chúng ta đã xem trong [“Utilizing value semantics in Swift”](https://www.swiftbysundell.com/articles/utilizing-value-semantics-in-swift/), trong những tình huống đó, duy trì một thuộc tính được lưu trữ riêng biệt có thể lại là cách tiếp cận tốt nhất - nhưng nếu chúng ta ngăn chặn tài sản đó bị biến đổi bên ngoài và tự động cập nhật bất cứ khi nào state cơ bản của nó thay đổi, thì chúng ta vẫn có thể đảm bảo rằng model chứa nó vẫn nhất quán.
Ở đây, chúng ta có thể sử dụng một property observer để làm điều đó cho Leaderboard model, trong đó chứa các điểm số cao cho những người chơi hàng đầu của trò chơi, cũng như điểm trung bình hiện tại của những người chơi đó:
```
struct Leaderboard {
    typealias Entry = (name: String, score: Int)

    var entries: [Entry] {
        // Each time that our array of entries gets modified, we
        // re-compute the current average score:
        didSet { updateAverageScore() }
    }
    
    // By marking our property as 'private(set)', we prevent it
    // from being mutated outside of this type:
    private(set) var averageScore = 0

    init(entries: [Entry]) {
        self.entries = entries
        // Property observers don't get triggered as part of
        // initializers, so we have to call our update method
        // manually here:
        updateAverageScore()
    }

    private mutating func updateAverageScore() {
        guard !entries.isEmpty else {
            averageScore = 0
            return
        }

        let totalScore = entries.reduce(into: 0) { score, entry in
            score += entry.score
        }

        averageScore = totalScore / entries.count
    }
}
```
Các patterns ở trên không chỉ cải thiện tính nhất quán của model chúng ta mà còn giúp model đó dễ hiểu và dễ sử dụng hơn
## Consistent collections
Trong khi việc duy trì mối quan hệ 1: 1 giữa hai phần state có thể đủ thách thức thì mọi thứ thậm chí còn khó khăn hơn khi chúng ta phải đảm bảo rằng nhiều collections vẫn nhất quán với nhau. Quay trở lại ví dụ về ứng dụng quản lý contact từ trước đó, giả sử rằng chúng ta hiện đang xây dựng một class `ContactList` - sẽ lưu trữ một tập hợp các contact, đồng thời cho phép các contact đó được tổ chức thành các nhóm và được đánh dấu là mục yêu thích :
```
class ContactList {
    var name: String
    var contacts = [Contact.ID : Contact]()
    var favoriteIDs = Set<Contact.ID>()
    var groups = [Contact.Group.Name : Contact.Group]()

    init(name: String) {
        self.name = name
    }
}
```
Tương tự như ví dụ trước đó, chúng ta được yêu cầu đồng bộ các tên contact một cách thủ công, model trên cũng làm cho mỗi call site của nó chịu trách nhiệm để dữ liệu đồng nhất. Ví dụ: khi xóa một liên hệ, chúng ta cũng phải nhớ xóa ID của nó khỏi bộ ID yêu thích của chúng ta - và khi đổi tên một nhóm, chúng tôi luôn phải cập nhật khóa của nó trong `groups` dictionary.
Cả hai chức năng dưới đây đều không thực hiện được điều đó và mặc dù chúng có thể trông hoàn toàn hợp lệ, nhưng cả hai đều khiến cho `ContactList` mà chúng thay đổi trở nên không nhất quán:
```
func removeContact(_ contact: Contact) {
    // If the removed contact was also added as a favorite, its
    // ID will still remain in that list, even after it was removed.
    contactList.contacts[contact.id] = nil
}

func renameGroup(named currentName: Contact.Group.Name,
                 to newName: Contact.Group.Name) {
    // The renamed group's key will now be incorrect, since
    // it's still referring to the group's previous name.
    contactList.groups[currentName]?.name = newName
}
```
Một ý tưởng ban đầu về cách tránh các loại mâu thuẫn ở trên có thể là sử dụng  private(set)  mà chúng ta đã sử dụng trên mô hình `Leaderboard` của mình từ trước và ngăn các collections của chúng ta bị biến đổi bên ngoài loại `ContactList`:
```
class ContactList {
    var name: String
    private(set) var contacts = [Contact.ID : Contact]()
    private(set) var favoriteIDs = Set<Contact.ID>()
    private(set) var groups = [Contact.Group.Name : Contact.Group]()
    ...
}
```
Tuy nhiên, trong trường hợp này, chúng ta thực sự cần phải có khả năng thay đổi các collections của mình bằng cách nào đó - vì vậy cách tiếp cận ở trên sẽ yêu cầu chúng tôi sao chép một số collections API cơ bản của chúng ta, để có thể tạo thay đổi như thêm và xóa contact:
```
extension ContactList {
    func add(_ contact: Contact) {
        contacts[contact.id] = contact
    }

    func remove(_ contact: Contact) {
        contacts[contact.id] = nil
        favoriteIDs.remove(contact.id)
    }

    func renameGroup(named currentName: Contact.Group.Name,
                     to newName: Contact.Group.Name) {
        guard var group = groups.removeValue(forKey: currentName) else {
            return
        }

        group.name = newName
        groups[newName] = group
    }
}
```
Những code trên có thể hoạt động miễn là chúng ta chỉ phải thay đổi các collections của mình theo những cách rất đơn giản và miễn là chúng ta không thêm bất kỳ mẩu dữ liệu mới nào vào mô hình của mình, nhưng nó không phải là một giải pháp linh hoạt. Yêu cầu một API hoàn toàn mới được tạo cho mỗi việc thay đổi, nói chung, không phải là một thiết kế tuyệt vời - vì vậy, hãy để xem nếu chúng ta có thể tìm thấy một cách tiếp cận năng động hơn và sử dụng được trong tương lai.
Nếu chúng ta nghĩ về điều đó, việc giữ đồng bộ dữ liệu `ContactList` của chúng ta thực sự chỉ yêu cầu chúng ta có thể phản ứng với bất kỳ thay đổi nào đối với thuộc tính cũng được sử dụng làm element key (id trong trường hợp `Contact` và tên trong trường hợp của `Contact.group` ) và để có thể thực hiện cập nhật bất cứ khi nào một phần tử bị xóa (để chúng ta có thể đảm bảo rằng không còn liên hệ bị xóa nào vẫn còn trong bộ `favoriteIDs`).
Chúng ta hãy thêm vào cả hai khả năng đó bằng cách triển khai một lightweight wrapper xung quanh Dictionary. Wrapper của chúng ta, hãy gọi là `Storage`, sẽ sử dụng  [key paths mechanism](https://www.swiftbysundell.com/articles/the-power-of-key-paths-in-swift/)  để giữ cho các keys của chúng ta đồng bộ - và cũng sẽ cho phép chúng ta đính kèm closure `keyRemovalHandler` để nhận thông báo mỗi khi key bị xoá:
```
extension ContactList {
    struct Storage<Key: Hashable, Value> {
        fileprivate var keyRemovalHandler: ((Key) -> Void)?

        private let keyPath: KeyPath<Value, Key>
        private var values = [Key : Value]()

        fileprivate init(keyPath: KeyPath<Value, Key>) {
            self.keyPath = keyPath
        }
    }
}
```
initializer và keyRemovalHandler của chúng ta được đánh dấu là `fileprivate` để ngăn các instance Loại `Storage` mới của chúng ta được tạo bên ngoài file mà `ContactList` được xác định, tăng cường tính nhất quán của model của chúng ta.
Để làm cho `Storage` hoạt động giống như một collection Swift thật sự, chúng ta có 2 option. Chúng ta có thể làm cho nó tuân thủ protocol Collection đầy đủ hoặc nếu chúng ta chỉ cần lặp lại nó, chúng ta có thể làm cho nó tuân thủ Sequence - bằng cách chuyển tiếp lệnh gọi `makeIterator ()` vào từ điển cơ bản của nó:
```
extension ContactList.Storage: Sequence {
    func makeIterator() -> Dictionary<Key, Value>.Iterator {
        values.makeIterator()
    }
}
```
Với những điều đã nêu ở trên, chúng ta có thể viết các vòng lặp trên các collections của chúng ta và sử dụng các API như `forEach`, `map` và `filter` trên chúng - giống như khi sử dụng Dictionary trực tiếp. 
Tiếp theo, để cho phép `Storage` có thể thay đổi, chúng ta sẽ thêm `subscript` implementation  để đảm bảo rằng element key được cập nhật trong trường hợp thuộc tính key của nó được thay đổi và cũng gọi `keyRemovalHandler` khi key bị xóa :
```
extension ContactList.Storage {
    subscript(key: Key) -> Value? {
        get { values[key] }
        set {
            guard let newValue = newValue else {
                return remove(key)
            }

            let newKey = newValue[keyPath: keyPath]
            values[newKey] = newValue

            if key != newKey {
                remove(key)
            }
        }
    }

    private mutating func remove(_ key: Key) {
        values[key] = nil
        keyRemovalHandler?(key)
    }
}
```
Cũng như vậy, collection wrapper của chúng ta đã hoàn tất và chúng ta đã sẵn sàng cập nhật `ContactList` để sử dụng nó - bằng cách lưu trữ danh bạ và nhóm của chúng ta bằng loại mới của chúng ta và bằng cách sử dụng `keyremovalHandler` để đảm bảo rằng favoriteIDs của chúng ta vẫn đồng bộ với collection của contact:
```
class ContactList {
    var name: String
    var contacts = Storage(keyPath: \Contact.id)
    var favoriteIDs = Set<Contact.ID>()
    var groups = Storage(keyPath: \Contact.Group.name)

    init(name: String) {
        self.name = name

        contacts.keyRemovalHandler = { [weak self] key in
            self?.favoriteIDs.remove(key)
        }
    }
}
```
Với triển khai mới này, chúng ta vẫn có thể thay đổi các collections của mình bằng cách thêm và xóa các giá trị, giống như khi sử dụng `Dictionary` trực tiếp - chỉ bây giờ chúng tôi mới đảm bảo rằng dữ liệu của vẫn nhất quán, hoàn toàn tự động.
Hiện tại chúng ta đã có loại custom collection, chúng ta có thể tiến thêm một bước và làm cho nó dễ sử dụng hơn - bằng cách thêm API tiện lợi để thêm và xóa giá trị mà không phải lo lắng về việc sử dụng key nào:
```
extension ContactList.Storage {
    mutating func add(_ value: Value) {
        let key = value[keyPath: keyPath]
        values[key] = value
    }

    mutating func remove(_ value: Value) {
        let key = value[keyPath: keyPath]
        remove(key)
    }
}
```
Sử dụng APIs ở trên và `subscript` trước đó, giờ đây chúng ta có thể tự do quyết định cách thêm hoặc xoá giá trị trong mỗi trường hợp mà không ảnh hưởng đến tính nhất quán của model theo bất cứ cách nào
```
// Adding values:
contactList.contacts[contact.id] = contact
contactList.contacts.add(contact)

// Removing values:
contactList.contacts[contact.id] = nil
contactList.contacts.remove(contact)
```
Mặc dù viết một custom collection không phải lúc nào cũng phù hợp, bất cứ khi nào chúng ta muốn thêm các behavior mới nào vào một trong các cấu trúc dữ liệu mà thư viện tiêu chuẩn cung cấp, tạo các lightweight wrappers được điều chỉnh theo một domain rất cụ thể có thể là một cách tiếp cận tuyệt vời.
## Conclusion
Theo nhiều cách, để làm cho một code base thực sự mạnh mẽg, chúng ta phải bắt đầu bằng cách làm cho các data model cốt lõi của nó trở nên dễ đoán và nhất quán nhất có thể - vì các mô hình đó thường đóng vai trò là nền tảng của phần còn lại code base mà chúng ta xây dựng.

Hy vọng bài viết sẽ có ích với các bạn

Reference: https://www.swiftbysundell.com/articles/maintaining-model-consistency-in-swift/
# Diffable DataSource là gì ?
-	Diffable DataSource là một API mới của UITableView và UICollectionView được giới thiệu tại WWDC19 trên iOS 13 để thay thế cho UITableViewDataSource và UICollectionViewDataSource. Vì Diffable Data Source là API mới nhất của iOS nên bắt buộc sử dụng các version iOS mới để được hỗ trợ đầy đủ.

-	Trước đây, khi làm việc với UITableView hoặc UICollectionView, ta cần phải implement protocol UITableViewDataSource để chỉ định chi tiết những dữ liệu được hiển thị trên cell hay các supplementary views như headers and footers.
![image.png](https://images.viblo.asia/493ce16b-3f2c-472e-b16e-9177dea58675.png)
![image.png](https://images.viblo.asia/794a98f8-42f6-4e7d-82f6-04af0a83baf6.png)
-	Bất cứ khi nào dữ liệu ở controller thay đổi, thông thường chúng ta phải reload toàn bộ các thành phần của tableView bằng cách gọi reloadData() 
để cập nhật (insert, delete, move) các item hay section cụ thể
-	Nhưng cần phải cẩn thận khi thực hiện các thay đổi và đảm bảo các thay đổi được áp dụng theo đúng thứ tự. Nếu không, khi cập nhật sẽ bị lỗi ! 

=> Giờ đây với UITableViewDiffableDataSource, bạn có thể tạo dataSource và apply các thay đổi giữa các state một cách an toàn hơn bằng cách thao tác với snapshot (một khái niệm mới đại diện cho trạng thái hiện tại của tableView).


```Với giải pháp từ một đối tượng DataSource chung nhất thì sự biến đổi của TableView sẽ đi theo.```
 

-    Tương tự như với RxDataSource của [RxSwift](https://viblo.asia/p/tim-hieu-ve-rxswift-1VgZvB62ZAw) trong thế giới [**Reactive Progamming**](https://viblo.asia/p/tim-hieu-reactive-programming-bWrZn1WYKxw)


**Để hiển thị hoặc cập nhật dữ liệu, bạn chỉ cần tạo một đối tượng của NSDiffableDataSourceSnapshot với dữ liệu đã được cập nhật và cung cấp nó cho dataSource thông qua việc gọi phương thức apply (_: animatingDifferences :), nó sẽ so sánh snapshot hiện tại ( rendered models ) với snapshot mới để xem sự khác biệt sau đó hiển thị lên tableView hay collectionView.**

# Cách sử dụng Diffable DataSource

Ta sẽ tạo một màn hình danh sách các tên liên hệ với thanh tìm kiếm cho phép người dung tìm kiếm tên liên hệ.
Như đã đề cập, với cách tiếp cận mới, chỉ cần hai loại:

 -  UITableViewDiffableDataSource hoặc UICollectionViewDiffableDataSource  có hai kiểu chung: Kiểu item và kiểu section, để chỉ định tableView cách hiện thị cell và các supplementary views. Đối tượng bạn sử dụng để quản lý dữ liệu và cung cấp cells cho tableView.
-    NSDiffableDataSourceSnapshot <SectionIdentifierType,ItemIdentifierType>: đại diện cho dataSource mới sẽ được hiển thị.

### Create the model

Bắt đầu bằng cách tạo 1 model ContactsModel, nó là dữ liệu sẽ được hiển thị trong TableView.

```Swift
truct ContactsModel: Hashable {
    static var friendContacts: [ContactsModel] = [.init(fullName: "Curtis Tu", emailAddress: "phambatu111@yahoo.com"),
                                           .init(fullName: "TMT", emailAddress: "tmt@qmail.com"),
                                           .init(fullName: "David Nguyen", emailAddress: "david@yahoo.com")]
    static var allContacts: [ContactsModel] = [.init(fullName: "Viet Nam", emailAddress: "vietnamd@yahoo.com"),
                                        .init(fullName: "Vu Dao", emailAddress: "vudao@gmail.com"),
                                        .init(fullName: "Hieu NT", emailAddress: "hieunt@yahoo.com"),
                                        .init(fullName: "Viet ND", emailAddress: "vietnd@gmail.com"),
                                        .init(fullName: "Quan DP", emailAddress: "quandp@qmail.com"),
                                        .init(fullName: "Minh Tung", emailAddress: "minhtung@gmail.com")]
    var id = UUID()
    var fullName: String
    var emailAddress: String
    
    func hash(into hasher: inout Hasher) {
        hasher.combine(id)
    }
    
    static func == (lhs: ContactsModel, rhs: ContactsModel) -> Bool {
        lhs.id == rhs.id
    }
}
```
 
**Note**: Diffable data source yêu cầu ItemIdentifierType (model) phải kế thừa Hashable để cho phép dataSource so sánh giữa các snapshot với nhau để tìm ra sự khác biệt cho việc update lại UI (để biết chính xác những gì đã được chèn, xóa hoặc di chuyển).

### Setting up the data source

Đầu tiên, tạo 1 Section type chúng sẽ được sử dụng dưới dạng SectionIdentifierType, gồm 2 section:

 ```Swift
 enum ContactsSection : Int , CaseIterable {
    case friendsContacts
    case allContacts
}
```

Sau đó, tạo và tuỳ chỉnh diffable data source để cung cấp cho TableView với chi tiết về cách hiện thị cells va các supplementary view ( section headers and footers )

```Swift
typealias DataSource = UITableViewDiffableDataSource<ContactsSection, ContactsModel>
private lazy var dataSource = makeDataSource()
```

```Swift
    private func makeDataSource() -> DataSource {
        let dataSource = DataSource(tableView: contactsTableView) { (tableView, indexPath, itemIdentifier) in
            guard let cell = tableView.dequeueReusableCell(withIdentifier: "ContactTableViewCell",
                                                           for: indexPath) as? ContactTableViewCell else {return nil}
            cell.configure(with: itemIdentifier)
            return cell
        }
        
        return dataSource
    }
```

  
### Creating a Snapshot

Bây giờ TableView đã biết chính xác cách hiển thị dữ liệu, chúng ta cần cung cấp cho TableView dữ liệu để hiển thị. Đây là lúc NSDiffableDataSourceSnapshot xuất hiện.

```Swift
typealias SnapShot = NSDiffableDataSourceSnapshot<ContactsSection, ContactsModel>
    
    private func applySnapShot() {
        var snapShot = SnapShot()
        snapShot.appendSections(ContactsSection.allCases)
        snapShot.appendItems(friendContacts, toSection: .friendsContacts)
        snapShot.appendItems(allContacts, toSection: .allContacts)
        snapShot.reloadedItemIdentifiers
        dataSource.apply(snapShot)
    }
 ```
 
-   Tạo một snapshot với các section và item sẽ được hiển thị. Bất cứ khi nào apply một snapshot mới, TableView sẽ so sánh với snapshot hiện tại để biết chính xác những gì được cập nhật, sau đó hiển thị và tạo các animation cho các cập nhật đó.
-   Ta có thể hoàn toàn custom ra 1 func ```applySnapShot(data: [])``` với đầu vào tuỳ chỉnh là 1 list ^^.


### Add UISearchBar
 
Bất cứ khi nào người dùng thay đổi text trong searchBar, chúng ta sẽ cập nhật danh sách allContacts và friendsContacts cho phù hợp sau đó apply một snapshot mới, và các danh sách cập nhật sẽ được hiển thị.

```Swift
func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        let myContacts = ContactsModel.allContacts
        let myFriends = ContactsModel.friendContacts
        if !searchText.isEmpty {
            allContacts = myContacts.filter { contact in
                return contact.fullName.contains(searchText)
            }
            friendContacts = myFriends.filter { contact in
                return contact.fullName.contains(searchText)
            }
        } else {
            allContacts = myContacts
            friendContacts = myFriends
        }
        applySnapShot()
    }
 ```
 
 Hoặc chúng ta có thể làm như sau, Dùng hàm range để lọc theo những điều kiện, location tuỳ ý :D 
 
 ```Swift
 func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        let myContacts = ContactsModel.allContacts
        let myFriends = ContactsModel.friendContacts
        if !searchText.isEmpty {
            allContacts.removeAll()
            friendContacts.removeAll()
            for i in myContacts {
                if i.fullName.range(of: searchText, options: .diacriticInsensitive, range: nil, locale: nil) != nil {
                    allContacts.append(i)
                }
            }
            for i in myFriends {
                if i.fullName.range(of: searchText, options: .diacriticInsensitive, range: nil, locale: nil) != nil {
                    friendContacts.append(i)
                }
            }
        } else {
            allContacts = myContacts
            friendContacts = myFriends
        }
        applySnapShot()
    }
  ```

Ngoài ra chúng ta có thể set animation khi cật nhật lại snapShot cho Diffable DataSource bằng cách set lại giá trị cho thuộc tính **defaultRowAnimation**
![image.png](https://images.viblo.asia/21659736-7d1e-4e5f-a06c-458ec329dd4a.png)

### Kết quả
  
  ![simulator_screenshot_3CF096F0-4D5B-455E-8DA4-AC96287A84A3.png](https://images.viblo.asia/b14dd04e-d31f-4ee1-b7a3-2de9cb38891b.png)
  ![Simulator Screen Recording - iPhone 11 Pro Max - 2022-12-01 at 16.08.49.gif](https://images.viblo.asia/0975b533-804b-4907-a40a-93b333ebf10a.gif)
  
  
    Tương tự ta hoàn toàn có thể làm với UICollectionView.
    
# Nhận xét
-   Đây là API mới nhất của Apple
-   Khó cài đặt và sử dụng hơn so với UICollectionViewDataSource
-   Dễ nhầm lẫn, chết chương trình

Tuy nhiên,  nó mang lại cho chúng ta:
-   Một trải nghiệm mới chuyên nghiệp hơn
-   Không cần quan tâm nhiều tới các protocol
-   Mọi thứ giờ chính là dữ liệu của bạn sẽ quyết định
-   Tiến gần hơn các nền tảng lập trình mới
-   Có thể đây là bước chuyển mình tiếp theo của Apple với iOS và Swift.
# So sánh
### So với DataSorce truyền thống

-   Khó cài đặt, rắc rối hơn
-   Linh hoạt, dễ dàng khi cập nhật data, giao diện tuy nhiên cần cẩn thận khi update nếu sai thời điểm app sẽ crash :D

### So sánh với RxDataSource

- Tuỳ cảm nhận mỗi người nhưng cá nhân mình thấy Diffable DataSource dễ cài đặt hơn ^^
- RxDataSource auto binding tiện hơn Diffable DataSource ( Diffable khi subcribe phải gõ thêm apply vô =))) )
- RxDataSource mỗi khi có thay đổi 1 data nó sẽ update lại toàn bộ UI còn Diffable DataSource thì khi có thay đổi nó sẽ xem xét so sánh với tráng thái hiện tại xem có gì mới thay đổi và update ở những chỗ có thay đổi (vì item của Diffable DataSource kết thừa từ [Hasable](https://developer.apple.com/documentation/swift/hashable)) . Chính vì thế Diffable DataSource sẽ mượt mà và tối ưu hơn RxDataSource
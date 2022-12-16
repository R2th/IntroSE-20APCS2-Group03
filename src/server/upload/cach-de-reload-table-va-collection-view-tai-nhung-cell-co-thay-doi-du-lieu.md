Trong iOS 13, Apple đã giới thiệu diffable data source và snapshot. Việc reload một cell trong TableView và CollectionView có thể dễ dàng thực hiện qua bằng cách gọi một trong số các function sau:
```Swift
reloadRows(at:with:) // For reloading table view cell
reloadItems(at:) // For reloading collection view cell
```
Đối với table và collection views được tạo bằng diffable data source thì điều này không còn đúng nữa. Vậy developer nên reload table và collection views khi nào? 

Giải pháp cho điều này có thể không đơn giản như bạn nghĩ. Do sự khác biệt giữa **value type** và **reference type**, sẽ có 2 cách khác nhau để reload lại table và collection views.

# Một app ví dụ:
![](https://images.viblo.asia/dc7c0e26-1468-4545-b370-104f263fff53.gif)
# Reloading Reference Type Items:
Trước khi đi vào logic của reload, hãy xem một chút về diffable data source item identifier type - một `Superhero` class:
```Swift
class Superhero: Hashable {

    var name: String

    init(name: String) {
        self.name = name
    }

    // MARK: Hashable
    func hash(into hasher: inout Hasher) {
        hasher.combine(name)
    }

    static func == (lhs: ReloadReferenceTypeViewController.Superhero,
                    rhs: ReloadReferenceTypeViewController.Superhero) -> Bool {
        lhs.name == rhs.name
    }
}
```
Như bạn thấy thì `Superhero` đơn giản là 1 class với variable gọi là `name`

Lưu ý rằng chúng ta cần implement cho 2 hàm `hash(into:)` và `==(lhs:,rhs:)` bởi vì class không có hỗ trợ **automatic Hashable conformance.**

Và đó là `Superhero` class tiếp theo hãy đến với chủ đề chính của bài viết **cell reloading**

Chúng ta sẽ hiện thực việc cell reloading trong hàm delegate method `collectionView(_:didSelectItemAt:)`:
```Swift
func collectionView(_ collectionView: UICollectionView,
                    didSelectItemAt indexPath: IndexPath) {
    
    // 1
    // Get selected hero using index path
    guard let selectedHero = dataSource.itemIdentifier(for: indexPath) else {
        collectionView.deselectItem(at: indexPath, animated: true)
        return
    }
    
    // 2
    // Update selectedHero
    selectedHero.name = selectedHero.name.appending(" ★")

    // 3
    // Create a new copy of data source snapshot for modification
    var newSnapshot = dataSource.snapshot()
    
    // 4
    // Reload selectedHero in newSnapshot
    newSnapshot.reloadItems([selectedHero])
    
    // 5
    // Apply snapshot changes to data source
    dataSource.apply(newSnapshot)
}
```
Đoạn code trên khá đơn giản:

1. Get selected `Superhero`(`selectedHero`) object từ diffable data source bằng cách sử dụng index path.
2. Thêm “★” vào `selectedHero`.`name`.
3. Tạo một bản copy của diffable data source snapshot hiện tại, để chúng ta có thể chỉnh sửa sau này.
4. Chỉnh sửa bản copy mới của diffable data source snapshot bằng reload `selectedHero` bên trong nó.
5. Apply snapshot vào diffable data source. Collection view sẽ hiển thị snapshot được thay đổi.

Một lưu ý lớn của đoạn code là nó chỉ hoạt động trên các item có reference type. Tại sao vậy?

Để hiểu điều gì đang xảy ra, trước tiên bạn phải hiểu sự khác biệt giữa value type và reference type. Tóm lại, nếu `Superhero` là một value type, thì `selectHero` sẽ là một phiên bản mới của `Superhero`, nó sẽ không trỏ đến đối tượng `Superhero` đã chọn trong snapshot. Do đó, nếu bạn cố gắng reload `selectHero` trong `newSnapshot`, bạn sẽ nhận được exception `NSInternalInconsistencyException` với lý do "Invalid item identifier specified for reload".

Bây giờ bạn đã hiểu tại sao đoạn code trên chỉ có thể hoạt động trên reference type. Hãy chuyển trọng tâm của chúng ta và tìm hiểu cách bạn có thể làm cho điều tương tự hoạt động trên các value type item.

# Reloading Value Type Items:
Tại thời điểm này, bạn có thể tự hỏi tại sao một số developer có thể thích sử dụng value type (struct) làm item identifier thay vì reference type (class). Có nhiều lý do khác nhau cho điều đó, và lý do quan trọng nhất để sử dụng struct thì sẽ rõ ràng và đơn giản hơn.
```Swift
struct Superhero: Hashable {
    var name: String
}
```
Như bạn có thể thấy, chúng ta đã giảm đáng kể số lượng code trong definition nhờ sự trợ giúp của **automatic Hashable conformance** và **automatic initializer synthesis**.

Quay lại đoạn code cell reloading, nó hơi khác một chút so với cell reloading đang reference type. Như đã đề cập trước đó, các value type item sẽ không hoạt động trên `reloadItems (_ :)`. Nếu vậy, chúng ta có thể làm gì với điều đó?

May mắn thay, chúng ta có thể dễ dàng giải quyết vấn đề đó bằng cách thay thế đối tượng `Superhero` đã chọn (`selectHero`) trong snapshot bằng một đối tượng `Superhero` mới (`updatedHero`).
```Swift
func collectionView(_ collectionView: UICollectionView,
                  didSelectItemAt indexPath: IndexPath) {

  // Get selected hero using index path
  guard let selectedHero = dataSource.itemIdentifier(for: indexPath) else {
      collectionView.deselectItem(at: indexPath, animated: true)
      return
  }

  // Create a new copy of selectedHero & update it
  var updatedHero = selectedHero
  updatedHero.name = updatedHero.name.appending(" ★")

  // Create a new copy of data source snapshot for modification
  var newSnapshot = dataSource.snapshot()

  // Replacing selectedHero with updatedHero
  newSnapshot.insertItems([updatedHero], beforeItem: selectedHero)
  newSnapshot.deleteItems([selectedHero])

  // Apply snapshot changes to data source
  dataSource.apply(newSnapshot)
}
```
Lưu ý rằng đoạn code trên chỉ hoạt động trên các item value type, nếu bạn áp dụng đoạn code trên trên các item reference type, bạn sẽ nhận được `NSInternalInconsistencyException` với lý do “Invalid update: destination for insertion operation [struct_instance] is in the insertion identifier list for update “.

# Tóm gọn:
Thành thật mà nói, tôi không chắc tại sao Apple lại thiết kế các API `NSDiffableDataSourceSnapshot` theo cách mà nó không hoạt động trên cả value type và reference type.

Tôi nghi ngờ rằng nó có thể là do một số hạn chế kỹ thuật mà chúng ta không biết. Điều đó nói rằng, tôi hy vọng rằng Apple sẽ cải thiện các API bằng cách cung cấp cho chúng ta một cách chuẩn hóa để reload lại table và collection views.

Full sample code on [GitHub](https://github.com/LeeKahSeng/SwiftSenpai-UICollectionView-List).

[Tham khảo](https://swiftsenpai.com/development/modern-ways-reload-cells/)

Thanks for reading.
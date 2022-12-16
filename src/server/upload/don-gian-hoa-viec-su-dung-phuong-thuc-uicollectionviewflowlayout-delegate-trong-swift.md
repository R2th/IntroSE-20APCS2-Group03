Khi viết layouts cho collection view, chúng ta thường phân lớp UICollectionViewFlowLayout để có quyền truy cập vào các tùy chọn bổ sung được cung cấp.
Có sáu thuộc tính được xác định trên UICollectionViewFlowLayout có thể được đặt bởi người dùng để xác định thuộc tính layouts :

* minimumLineSpacing: CGFloat
* minimumInteritemSpacing: CGFloat
* itemSize: CGSize
* headerReferenceSize: CGSize
* footerReferenceSize: CGSize
* sectionInset: UIEdgeInsets


*UICollectionViewDelegateFlowLayout* , delegate cho layout class này,  cũng có một tập các phương thức phù hợp với các thuộc tính. Chúng cho phép người dùng đặt các giá trị khác nhau cho mỗi section, cung cấp kích thước cho từng đường dẫn chỉ mục.

```
* collectionView(_:layout:minimumLineSpacingForSectionAt:)
* collectionView(_:layout:minimumInteritemSpacingForSectionAt:)
* collectionView(_:layout:sizeForItemAt:)
* collectionView(_:layout:referenceSizeForHeaderInSection:)
* collectionView(_:layout:referenceSizeForFooterInSection:)
* collectionView(_:layout:insetForSectionAt:)
```

Tuy nhiên, việc truy cập các giá trị này có thể gặp khó khăn. Đối với một điều có một số lượng lớn các optionals trong cách của bạn:
* Layout đó có thuộc tính optional collection view.
* delegate của collection view là optional.
* delegate có thể không là *UICollectionViewDelegateFlowLayout*
* Mỗi một phương thức nó là optional.


Chúng ta có thể tiếp cận bằng cách viết một extension *UICollectionViewFlowLayout* để truy cập dễ dàng. Đoạn code dưới đây cho thấy một phương pháp sẽ tìm nạp các cạnh cho một section  nhất định, bằng cách sử dụng phương thức delegate nếu có thể nếu không rơi trở lại thuộc tính *sectionInset*.

```
extension UICollectionViewFlowLayout {

  func inset(for section: Int) -> UIEdgeInsets {

    guard
      let collectionView = collectionView,
      let delegate = collectionView.delegate,
      let flowDelegate = delegate as? UICollectionViewDelegateFlowLayout,
      let section = flowDelegate.collectionView?(collectionView, layout: self, insetForSectionAt: section)
    else {
      return sectionInset
    }

    return section
  }
}
```

Thật dễ dàng để xem làm thế nào năm phương pháp khác có thể được thực hiện một cách chính xác theo cùng một cách. Tuy nhiên, phương pháp này sẽ có một số lượng lớn các bản sao mã trên sáu phương pháp đó. 

Và delegate được ẩn trong vùng unwrapping này, có nghĩa là bạn không thể xem qua phương pháp này và đảm bảo rằng delegate chính xác và thuộc tính dự phòng được sử dụng.

### Phân tách Unwrapping Code

Để trừu tượng hóa việc *Unwrapping* các optionals và xử lý logic dự phòng, chúng ta có thể viết một hàm có hai điều sau:
* Một hàm để chuyển đổi giá trị non-optional *UICollectionViewDelegateFlowLayout* và *UICollectionView*  trả về một giá trị optional. Giá trị này là chung cho phép chúng ta bao bọc tất cả sáu phương thức / thuộc tính delegate.
* Một phương thức dự phòng sẽ được sử dụng nếu hàm cũ trả về nil.
```
extension UICollectionViewFlowLayout {

  private func retrieve<Value>(
    using function: (UICollectionViewDelegateFlowLayout, UICollectionView) -> Value?,
    fallback: () -> Value
  ) -> Value {

    guard
      let collectionView = collectionView,
      let delegate = collectionView.delegate,
      let flowDelegate = delegate as? UICollectionViewDelegateFlowLayout,
      let value = function(flowDelegate, collectionView)
    else {
      return fallback()
    }

    return value
  }



  func inset(for section: Int) -> UIEdgeInsets {

    return retrieve(using: { delegate, collectionView in

      delegate.collectionView?(collectionView,
                               layout: self,
                               insetForSectionAt: section)

    }, fallback: { sectionInset })
  }
}
```

Phiên bản này cải thiện tình hình của hai vấn đề tôi đã có với đầu tiên, cụ thể là có ít mã trùng lặp và mỗi phương pháp cá nhân là dễ dàng hơn để đọc và lý do về.

### Using @autoclosure

Một lưu ý nhỏ về lý do tại sao việc thực hiện dự phòng một chức năng là ta giữ nguyên hành vi tương tự như phương pháp ban đầu và không gọi thuộc tính dự phòng trừ khi cuộc gọi đến phương thức delegate không thành công. Nếu chúng tôi đã thông qua phầnInset làm giá trị, chúng tôi sẽ gọi đến cho thuộc tính trước khi gọi phương thức delegate.

Thay vì truyền một hàm trả về giá trị chúng ta có thể sử dụng @autoclosure để làm cho Swift tự động kèm theo một biểu thức trong một closure. Bằng cách đặt dự phòng là @autoclosure () -> Giá trị chúng tôi chỉ có thể chuyển một biểu thức và nó sẽ không được thực hiện cho đến khi  gọi delegate thất bại.

### Chuyển trực tiếp các phương thức Delegate

Chúng ta cũng có thể thấy rằng mỗi phương thức delegate ở trên có cùng signature. Có ba tham số, trong đó đầu tiên là collection view, thứ hai là layout và giá trị cuối cùng là giá trị duy nhất cho phương thức đó, chẳng hạn như phần hoặc indexPath. Tôi sẽ tham khảo param cuối cùng này dưới dạng *Key*.

 Có thể lấy một tham chiếu đến phương thức delegate và chuyển nó thẳng đến hàm truy xuất để nó có thể gọi nó thay vì gọi một closure mà chúng ta cung cấp sau đó gọi phương thức delegate.
 
 Thứ nhất, chúng ta cần phải định nghĩa trong mã *signature* của từng phương thức của sáu phương thức delegate. Chúng ta có thể lấy các phát hiện của chúng ta từ trên và định nghĩa một typealias để định nghĩa một hàm trên hai loại generic  *Key* và *Value*  mà lấy một  collection view, layout và *Key* và trả về một *Value*:


```
typealias DelegateMethod<Key, Value> =
  ((UICollectionView, UICollectionViewLayout, Key) -> Value)
```

Điều này đại diện cho signature cho tất cả sáu phương thức delegate của *UICollectionViewDelegateFlowLayout*. Chúng ta có thể viết lại truy xuất theo *DelegateMethod* :

```
extension UICollectionViewFlowLayout {

  private func retrieve<Key, Value>(
    using delegateMethod: DelegateMethod<Key, Value>?,
    key: Key,
    fallback: @autoclosure () -> Value
  ) -> Value {

    guard
      let collectionView = collectionView,
      let value = delegateMethod?(collectionView, self, key)
    else {
      return fallback()
    }

    return value
  }
}
```
 Xác định rằng phương thức delegate là optional, bởi vì điều này sẽ cho phép code clean hơn vì tất cả các phương thức delegate này là optional. *retrieve* có thể sau đó unwrap các collection view và gọi phương thức với nó, chính nó như là layout và một *Key*  là một tham số mới được cung cấp. Chúng ta có thể thoát khỏi việc triển khai dự phòng hiện tại của mình, nhưng chúng ta sẽ sử dụng @autoclosure để cải thiện khả năng đọc tại site.
 
 Bây giờ chúng ta cần có một tham chiếu đến phương thức delegate. Bởi vì chúng ta sẽ cần *UICollectionViewDelegateFlowLayout* cho mỗi lần gọi, chúng ta sẽ wrap nó trong một thuộc tính.
 
```
extension UICollectionViewFlowLayout {

  private var delegate: UICollectionViewDelegateFlowLayout? {
    return collectionView?.delegate as? UICollectionViewDelegateFlowLayout
  }

  func inset(for section: Int) -> UIEdgeInsets {

    return retrieve(
      using: delegate?.collectionView(_:layout:insetForSectionAt:),
      key: section,
      fallback: sectionInset)
  }
}
```

Điều này cho phép yêu cầu các delegate cho một tham chiếu đến các collectionView chức năng (: layout: insetForSectionAt : ) có thể chuyển đến *retrieve*.

So với phiên bản cải tiến, phiên bản này làm cho mọi phần của từng parameters đều thông qua cần thiết. Rất rõ ràng rằng delegate là chính xác cho một inset phương pháp wrapping  *inset(for section:)* , chìa khóa là chính xác và dự phòng là một trong đó có liên quan đến phương pháp delegate.

Bạn có thể xem phần *extension UICollectionViewFlowLayout* tại [Github](https://gist.github.com/danielctull/6938b4516eaba29556e382f7f83b7534).

Bài viết tham khảo tại [đây](http://danieltull.co.uk/blog/2018/04/13/simplifying-uicollectionviewflowlayout-delegate-method-usage-with-functional-programming/).
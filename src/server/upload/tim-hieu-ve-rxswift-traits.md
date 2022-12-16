Traits là một thuộc tính read-only Observable sequence được đóng gói thành một struct với những tập behavior hạn chế hơn so với raw Observable. Traits là một giá trị không bắt buộc. Ta hoàn toàn có thể sử dụng raw Observable sequences ở bất cứ nơi nào của ứng dụng bởi chúng được hỗ trợ bởi tất cả core RxSwift/RxCocoa APIs.

Bài viết này sẽ tìm hiểu sâu hơn về Single, Completable and Maybe, một trong những Traits phổ biến của RxSwift.

### Single<T>:
Một Single cũng tương tự như một Observable mà thay vì phát ra một chuỗi các giá trị, nó lại đảm bảo trả về hoặc một giá trị hoặc một lỗi. Single trả về chính xác chỉ một giá trị, hoặc một lỗi và không chia sẻ side effect.
Vì thế, thay vì subscribe Single với 3 phương thức, ta chỉ subscribe với 2 phương thức. Hãy cùng xem định nghĩa của SingleEvent sau:
```
public enum SingleEvent<Element> {
    /// Chỉ có một sequence element được tạo ra (Và nó chỉ phát ra .next(Element), .completed)
    case success(Element)
    /// Sequence bị kết thúc bởi một lỗi. (phát ra: `.error(Error)`)
    case error(Swift.Error)
}
```
**Trường hợp sử dụng:**
* Sử dụng trong request network vốn được thực hiện một lần và trả về một kết quả hoặc một lỗi. 
* Trong các thao tác fetch data của DB
* Single có thể được sử dụng để model các trường hợp chỉ cần quan tâm đến một thành phần đơn, và không dành cho một infinity stream hoặc elements.
* Khi đã tải được ảnh, và ta muốn thực thi một tác vụ nào đó.

Một raw Observable sequence có thể được chuyển đổi sang Single bằng cách sử dụng phương thức .asSingle(). Ta cần lưu ý khi sử dụng Single, cần đảm bảo chỉ phát ra một giá trị đơn. Nó có thể dẫn đến lỗi sequence chứa nhiều hơn một giá trị nếu sử dụng không đúng cách.

### Completable:
Một Competable đại diện cho một Observable chỉ có thể được complete hoặc phát ra một lỗi. Nó tương ứng với Observable<Void> vì không thể phát ra elements.
Completable không phát ra elements, chỉ phát ra một sự kiện completion hoặc một lỗi, và không chia sẻ side effect.
 
```
public enum CompletableEvent {
    /// Sequence bị kết thúc bởi một lỗi (phát ra: `.error(Error)`)
    case error(Swift.Error)
    /// Sequence được hoàn thành.
    case completed
}
```

**Trường hợp sử dụng:**
* Sau khi một operation được hoàn thành nhưng ta không quan tâm về kết  quả được trả về
* Cập nhật cache cho một instance
* Update/Put network API cho kết quả với trường hợp thành công
* Ta cần thực hiện tác vụ khi network connection được tái lập.

```
func cacheLocally() -> Completable {
   return Completable.create { completable in
      // Store some data locally
      ...
 
      guard success else {
          completable(.error(CacheError.failedCaching))
          return Disposables.create {}
      }
 
      completable(.completed)
      return Disposables.create {}
   }
}
```

Một raw Observable sequence có thể được chuyển đổi thành  Completable bằng cách sử dụng phương thức .asCompletable() hoặc một completable có thể được hoàn thành với Completable.empty()

### Maybe<T>:
Maybe là sự kết hợp của Completable và Single. Maybe được sử dụng khi ta muốn một Observable có thể không có giá trị hoặc sẽ chỉ complete. Nó sẽ hoặc phát ra một element đơn, hoàn thành mà không phát ra element hoặc phát ra một lỗi. Và nó không chia sẻ side effect.
    
```
public enum MaybeEvent<Element> {
    /// Chỉ một sequence element được tạo ra (phát ra: `.next(Element)`, `.completed`)
    case success(Element)
    /// Sequence bị kết thúc bởi một lỗi. (phát ra: `.error(Error)`)
    case error(Swift.Error)
    /// Sequence hoàn thành.
    case completed
}
```
 
**Trường hợp sử dụng:**
* Khi lấy data từ  cache, ta không cần có một giá trị trong cache, vì vậy ta sẽ gọi complete, và nhận onSuccess với giá trị từ cache.
Để tạo ra Maybe, ta có thể làm như sau:
```
func generateString() -> Maybe<String> {
   return Maybe<String>.create { maybe in
       maybe(.success("done"))
       // OR
       maybe(.completed)
       // OR
        maybe(.error(error))
       return Disposables.create {}
   }
}
```
Một raw Observable sequence có thể được chuyển đổi sang Maybe bằng cách sử dụng phương thức.asMaybe()
 
 
Đến đây ta đã tìm hiểu thêm được một số Traits trong RxSwift. Cảm ơn bạn đã theo dõi.
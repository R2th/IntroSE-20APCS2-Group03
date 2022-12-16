RxSwift đang dần trở thành khái niệm quen thuộc vs các anh em lập trình IOS, tuy nhiên do có khá nhiều các thuật ngữ trong đó nên chắc chắn gây ra không ít khó khăn để mọi người có thể làm chủ được nó. Trong series về RxSwift lần này mình sẽ giải thích 1 số thuật ngữ để anh em sẽ dễ dàng sử dụng hơn, tránh mắc phải những cạm bẫy và tìm ra nguyên nhân khi gặp sự cố.

Đầu tiên đó là phương thức "On"
Cũng giống như phương thức subscribe chúng ta có subscribeNext/subscribeError/subscribeCompleted thì on cũng sẽ có onNext/onError/onCompleted

 Phương thức on sẽ chỉ định sự kiện Event<E> theo enum được mô tả như bên dưới. .
  
```
 public enum Event<Element> {
    case Next(Element)
    case Error(ErrorType)
    case Completed
}
```
    
Việc thực thi các phương thức  onNext/onError/onCompleted sẽ được triển khai như bên dưới.   
```
public extension ObserverType {
    final func onNext(element: E) {
        on(.Next(element))
    }

    final func onCompleted() {
        on(.Completed)
    }

    final func onError(error: ErrorType) {
        on(.Error(error))
    }
}
```

Vậy subscribeOn vs observeOn sẽ được chèn vào đâu, mỗi phương thức được thực thi trên thread nào, chúng ta sẽ cùng đi sâu tìm hiểu nhé. 
    
```
    _ = fetchServerDataWithRequest(request)
  .subscribeOn(ConcurrentDispatchQueueScheduler(
    globalConcurrentQueueQOS: .UserInitiated))
  .map { parse($0) }
  .observeOn(MainScheduler.instance)
  .subscribe(
    onNext: { result in
      // パース済みデータ受信時の処理
    },
    onError: { error in
      // エラー時の処理
    }
  )
```
   
Khi chúng ta dùng các operator để chuyển đổi Observable, thì 1 Observable mới sẽ được tạo ra.  Theo như hình bên dưới, thì Obsevable mới này sẽ giữ nội dung của Observable ban đầu, khi người dùng subsribe thì nó sẽ subsribe Observable ban đầu. Sau đó, sự kiện sẽ chảy từ Observable ban đầu, sau đó ta sẽ xử lý sự kiện đó và đẩy trả lại Observable ban đầu.
    
   Ta có thể quan sát bên trong như hình dưới đây.
    ![](https://images.viblo.asia/0730e88a-819f-4553-9262-1ae6f70daf3b.png)
    
   Trường hợp phân tách thành nhiều Observable thì nó sẽ thể hiện như dưới đây
    ![](https://images.viblo.asia/642d4f1e-4c84-44c4-a999-3e032f9e0a24.png)
    
Trong hình dưới, fetchServerData, subscribeOn ... đại diện cho các Observables được trả về bởi mỗi hàm. subscribeOn trả về một Observable thực thi việc đăng ký của Observable mà nó chứa trong thread được chỉ định, và ObserveOn trả về Observable chuyển đổi sự kiện từ Observable mà nó chứa để được thông báo trong thread đã chỉ định.
    ![](https://images.viblo.asia/f886d958-6320-49f0-816e-6b4a4fe5a031.png)

Mũi tên màu xanh đại diện cho thread gọi subscribe và màu bạc đại diện cho thread tiến hành xử lý thông tin (thường là background thread).

Bài viết đầu tiên mình xin kết thúc tại đây, nếu còn chỗ nào khó hiểu anh em comment để mình sẽ cải thiện vào những bài tiếp theo nhé.

Cám ơn vì đã đọc hết bài viết của mình. 
Link thao khảo: https://qiita.com/k5n/items/643cc07e3973dd1fded4
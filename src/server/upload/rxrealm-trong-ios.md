![](https://images.viblo.asia/4d4a6e93-98f7-41e9-98b5-1b79ddd64b6f.jpg)

**RxRealm**

Nó là một phần mở rộng của RxSwift dùng để convert Realm dataTypes thành RxObservable để bạn có thể observe và react khi chúng thay đổi 

RxRealm có thể được sử dụng để tạo Observables từ đối tượng kiểu Results , List, LinkingObject hoăc AnyRealmCollection .Các kiểu này thường được sử dụng để load và observe các object collection từ Realm Mobile Database .

**Live results trong Realm**

Các tập kết quả Realm luôn trả về dữ liệu cập nhật mới nhất . Dữ liệu trong Results không bao giờ cũ . Nghĩa là bạn sẽ không bao giờ phải load lại kết quả từ kho lưu trữ hay bằng cách nào đó refresh thủ công dữ liệu trong bộ nhớ .

Như hình 1 chúng ta đã có người dùng mới và đã không fetch bằng cách sử dụng phương thức realm.objects thay vì đối tượng mới được thêm vào và được present trên biến users . Nếu bạn dùng CoreData bạn cần fetch lại object từ stack

[Read và Write có thể xảy ra ở các điểm khác nhau trong dự án , trên các thread khác nhau từ các quy trình khác nhau hay sử dụng nền tảng Realm từ bất kỳ đâu trên thế giới .Mỗi class trong app có thể tập trung vào business logic và quên đi khái niệm dữ liệu đã cũ hoăc cache data vì các objects Realm luôn được cập nhật](https://academy.realm.io/posts/live-objects-fine-grained-notifications-realm-update/) 

![](https://images.viblo.asia/71b94054-7cad-4f5d-9699-9951efbc9cf3.png)

*HÌNH 1*

Ngay cả khi bạn luôn truy cập dữ liệu cập nhật mới nhất , bạn vẫn cần biết khi nào dữ liệu đó thay đổi để bạn có thể cập nhật UI phù hợp cho ứng dụng . Túm lại , chúng ta không có cơ chế nào để biết rằng dữ liệu đã thay đổi để chúng ta có thể cập nhật UI của chúng ta .

Để giải quyết vấn đề này Realm có một cơ chế thông báo cho phép notify khi dữ liệu của bạn thay đổi , và quan trọng hơn nó cung cấp cho bạn thông tin chính xác về những gì đã thay đổi. . Bạn có thể tham khảo thêm ở bài [này](https://medium.com/@aliakhtar_16369/realm-notifications-realmswift-part-2-60c66ab99ea9)

Ở trong bài viết này , mình sẽ giải quyết vấn đề này sử dụng **RxRealm**

**Getting Started**

Đoạn code được show ở hình 2 thực hiện 1 số nhiệm vụ :

1 . Lấy tất cả người dùng từ realm database trong biến *users* . vì không có object User *users* được khởi tạo count = 0. biến *users* là kiểu dữ liệu Realm Results<User>
    
2 . *Observable.collection* trả về một *Observable<E>* trong trường hợp của chúng ta *Observable<Results<User>>* phát ra mỗi khi dữ liệu collection thay đổi . Oservable phát ra một giá trị khởi tạo khi đăng ký . Bạn sẽ không notify cho đến khi bạn đăng ký observable sử dụng phương thức *. subscribe *
    
3 . Phương thức *onNext* sẽ gọi mỗi khi bạn add , update hoặc remove object user trong database 
    
4 . Như ở trong hình *onNext* được gọi khi user1 và user2 được add vào database . *Chú ý : Nếu chúng ta add user1 từ thread khác hay thậm chí với process khác onNext sẽ vẫn được gọi*
    
5 . *Observable.collection* bên dưới sử dụng cơ chế Realm Collection notification
    
 ![](https://images.viblo.asia/4cda1b9a-2ca9-431c-a383-fb4c982dcbfd.png)
    
*HÌNH 2*
    
 Xoá ứng dụng chạy code ở được show ở hình 3  có 1 điểm cần lưu ý 
   
1 . *Observable.array* làm việc giống với *Observable.collection* nhưng nó sẽ trả về Swift *Observable<Array<User>>* thay vì Realm *Observable<Results<User>>*. Điều này hữu dụng khi business logic phụ thuộc vào *array* Swift thay vì *Results* của Realm 
    
  ![](https://images.viblo.asia/0898fe11-2bf1-475d-9f0f-3afcd3ed72fd.png)
    
    HÌNH 3
    
Xoá ứng dụng và chạy code sau để lưu trữ objects vào database như ở hình 4 dưới đây 

![](https://images.viblo.asia/5229d223-4e55-44b4-976b-1a6cfd1ad6a4.png)
    
HÌNH 4
    
Hình 5 được sử dụng *Observable.changeset* phát ra mỗi khi collection thay đổi và cung cấp các index chính xác đã bị xoá ,  được insert hoặc update và được hiển thị kể từ khi chúng ta update user tại index 0 nó đã print 1 phần tử được update tại index 0 ta chúng ta lấy thông tin này để cập nhật row at index 0 thay vì reload toàn lại bộ tableview nếu ta đưa phần này vào một UITableView .
    
![](https://images.viblo.asia/ed1ca0df-1435-4634-96ee-85465d37aa9f.png)
    
    HÌNH 5

Sau khi bạn chạy đoạn code dưới đây bạn sẽ bất ngờ trước kết quả của bộ thay đổi 
Bạn chắc chắn sẽ có một câu hỏi tại sao nó đang nó rằng xoá tại index 0 và 2 , và insert object at index 0 , nhưng chúng ta chỉ delete object at index 0 và sau đó update object at index 0 . Vì vậy hãy break và hiểu mọi thứ .

1 . Điều đầu tiên cần hiểu là thông báo thay đổi sẽ kích hoạt khi hoàn tất việc write transaction 
    
2 . Điều thứ 2 là thông báo thay đổi sẽ giúp cập nhật UITableView một cách thông minh , vì vậy thông tin được cung cấp để giúp UITableView
    
3 . Hãy nói rằng bạn có một UITableView gắn với user1 , user2 và user3 theo thứ tự tương ứng .
    
4 . Bây giờ khi bạn xoá user1 ở index 0 thì nó đã xoá nó và user3 là index cuối cùng chuyển sang index 0 
    
5 . Sau đó chúng ta update đối tượng user tại index 0 tại thời điểm đó user3 firstName sẽ update 
    
6 . Viết giao dịch bây giờ kết thúc , Notification sẽ kích hoạt với những thông tin này như trong hình 
    
7 . UITableView bây giờ delete row at index 0 và 3.  
    
8 . Sau khi mà nó insert row at 0 trong trường hợp này user3 sẽ move tới index 0 trong UITableView
    
![](https://images.viblo.asia/a61dc5e3-5ec8-4626-ac59-de4b946dd3f7.png)
    
    HÌNH 6

    
**Observing a single object**
    
Xoá ứng dụng và chạy code như hình 4 và sau đó chạy lại như hình 7 , Nó phát ra trạng thái ban đầu của đối tượng như là sự kiện *next* đầu tiên của nó sau khi đăng ký . Bạn có thể vô hiệu hoá hành vi này bằng cách sử dụng tham số *emitInitialValue* và đặt nó thành *false* được hiển thị trong hình 7.1 
    
![](https://images.viblo.asia/b1284f96-791f-4405-b81b-b2625435db7b.png)
    
HÌNH 7
    
![](https://images.viblo.asia/1e76b084-7653-4db6-9a14-5a97d37957d6.png)
    
HÌNH 7.1
    
Bạn có thể đặt các thay đổi cho các thuộc tính tạo thành một thay đổi đối tượng mà bạn muốn quan sát: Trong trường hợp của chúng ta đang quan sát thuộc tính passport của object User và như đã show ở Hình 8 , chúng ta đã update user firstName và nó không kích hoạt subscriber block . Có những điều cân phải lưu ý :
    
1 . API này sử dụng [Realm object notifications](https://realm.io/blog/realm-objc-swift-2-4/) để lắng nghe thay đổi , bạn có thể tham khoả loạt bài [này](https://medium.com/@aliakhtar_16369/realm-notifications-realmswift-part-2-60c66ab99ea9) 
    
2 . Như được hiển thị trong Hình 8.1, chúng ta cập nhật thuộc tính vì nó nằm trong danh sách observe mà bạn nhận được thay đổi
    
![](https://images.viblo.asia/c39c3c93-4ddf-4840-9a8f-48f08ce4ef94.png)
    
    HÌNH 8
    
![](https://images.viblo.asia/98a3b219-f74e-40de-9fd9-d0ac4c0f2273.png)
    
    HÌNH 8.1
    
Như trong Hình 9, chúng ta đã sử dụng *propertyChanges:* cung cấp thông tin về các thuộc tính nào đã thay đổi, cùng với các giá trị đã thay đổi, cũ và mới. **Lưu ý: Observer sẽ tự động loại bỏ khi đối tượng bị xóa khỏi realm**
    
![](https://images.viblo.asia/1bd4e644-2608-4615-b47a-0b4b90a5d085.png)

    HÌNH 9
    
    Bài viết được tham khảo từ :
    https://medium.com/@aliakhtar_16369/rxrealm-realmswift-part-7-cf83c4a3edb5
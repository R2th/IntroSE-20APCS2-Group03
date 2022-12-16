Mối quan hệ( **Relationship**) một - một, một - nhiều trong Core Data

![](https://cdn-images-1.medium.com/max/2000/1*7VXg6I088zuwNpmJ7EM9TQ.png)

Đối với các ứng dụng iOS ngày này, Persistent Storage đã trở thành một phần thiết yếu. Và khi nói về persistency trong iOS, chúng ta luôn nghĩ đến Core Data. Một công cụ mạnh mẽ, mang đến trải nghiệm tuyệt vời cho bạn trong việc quả lý dữ liệu, hơn nữa nó còn được phát triển bởi Apple và tích hợp sẵn trong Xcode.

# Core Data Relationships Example

Để đơn giản, chung ta sẽ bắt đầu với một project nhỏ với các Core Data Entities đơn giản và xử lý các mối quan hệ giữa chúng (một - một, một - nhiều).

Có 3 Entities trông ví dụ này:

1. **Person** - Đây là thực thể chính và có mối quan hệ với Phone and Friends entities.
2. **Phone** - Một thực thể giữ thông tin về số điện thoại của **Person**. Nó được sử dụng là quan hệ một - một với người, giả định rằng một người sẽ chỉ có một số điện thoại.
3. **Friend** - Thực thể sẽ giữ thông tin về bạn bè của **Person**. Nó được sử dụng là quan hệ một nhiều, tất nhiên một người luôn có nhiều hơn một người bạn rồi.

![](https://cdn-images-1.medium.com/max/800/1*KmbyBDJ7i8rJ6gSkTyheRg.png)

Như bạn có thể thấy ở trên, tôi tạo ra các relationships. Bây giờ tôi sẽ giải thích cho bạn cách thực hiện, nó khá đơn giản

# One-To-One Relationship (Person -> Phone)

Nếu bạn tạo ra các Entities, bạn có thể tạo ra mối quan hệ(relationship) giữa **Person** và **Phone**. Bạn sẽ cần 3 giá trị để tạo mối quan hệ

1. **Relationship** - Tên của mối quan hệ.
2. **Destination** - Thêm Entity bạn muốn thiết lập mối quan hệ( trong trường hợp này là **Phone**).
3. **Inverse** - Tạo một mối quan hệ nghịch đảo từ **Phone** và chọn nó trong **Persion**. Apple luôn khuyên bạn thêm giá trị nghịch đảo, vì vậy không nên để trống giá trị này.

![](https://cdn-images-1.medium.com/max/800/1*lyRZO4ll1jxynOJA-XGONQ.gif)

![](https://cdn-images-1.medium.com/max/800/1*0XV1pTdP4TiEiJPRlJFSrQ.gif)

# Code

Mỗi Entity đều chứa NSManagedObject được tự động tạo mà bạn có thể làm việc với nó. Đây là một trong những ưu điểm của Core Data so với các công cụ khác.
Đây là một ví dụ về cách viết trong Person và mối quan hệ một - một (Phone) của nó.

```
let context = persistentContainer.viewContext

let person = Person(context: context)
person.firstName = "John"
person.lastName = "Doe"
        
let phone = Phone(context: context)
phone.brand = "Apple"
phone.model = "iPhone X"
phone.os = "iOS"
person.phone = phone
        
saveContext()
```

# One-To-Many Relationship (Person -> Friends)
Có thể đến đây các bạn đã hiểu về hoạt động của **Relationship**. Bây giờ chúng ta sẽ đi xa hơn, tạo ra mối quan hệ một - nhiều. Khái niệm này cũng giống mối quan hệ một - một, chỉ thay đổi một điểm nhỏ.

Khi tạo mối quan hệ một nhiều, bạn cần thay đổi type thằng To Many trong Data Model Inspector. 

![](https://cdn-images-1.medium.com/max/800/1*p9fOxbXPLgvWCr_yo5mEDw.gif)

# Code

Đây là code bạn viết trong Person để thêm mối quan hệ một nhiều của nó(Friends)

```
let context = persistentContainer.viewContext

let person = Person(context: context)
person.firstName = "John"
person.lastName = "Doe"
        
let friend1 = Friends(context: context)
friend1.firstName = "Friend"
friend1.lastName = "One"
person.addToFriends(friend1)
        
let friend2 = Friends(context: context)
friend2.firstName = "Friend"
friend2.lastName = "Two"
person.addToFriends(friend2)

saveContext()
```

NSManagedObject chứa các Generic methods như addToFriends(), bạn có thể add một đối tượng Friend hoặc một mảng Friends.

## Note:
Code trong hướng dẫn được viết trong AppDelegate để đơn giản và nhanh hơn.

Đây là một ví dụ đơn giản về Core Data và cách sử dụng mô hình quan hệ giữa các entities. Hi vọng nó sẽ giúp bạn hiểu rõ hơn về Core Data và làm việc với nó một cách hiệu quả.
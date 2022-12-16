![](https://images.viblo.asia/f642be5e-dfe5-4113-809d-274f574a810f.png)

![](https://images.viblo.asia/9aca7bf2-3924-46ac-a411-174d031d43c0.png)

Nếu bạn biết ARC và memory leaks là gì trong iOs bạn có thể bắt đầu phần 2. Đây là danh sách chúng ta sẽ tìm hiểu:
1. Memory Leaks là gì trong iOs
2. Tại sao lại Memory Leaks
3. Làm thế nào ARC không thể giải phóng bộ nhớ
4. Memory Leaks trong Closure
5. Giải pháp khả thi
6. 1 số trường hợp đặc biệt ( singleton và Static Classes Memory Leaks)
7. Khác biệt giữa weak và unowned
8. Tìm ra lỗi Leaks bằng việc sử dụng Memory Graph Debbuger
9. Vài quy tắc thiết yếu

[Swift uses Automatic Reference Counting (ARC) to track and manage your app’s memory usage. In most cases, this means that memory management “just works” in Swift, and you do not need to think about memory management yourself. ARC automatically frees up the memory used by class instances when those instances are no longer needed.](https://docs.swift.org/swift-book/LanguageGuide/AutomaticReferenceCounting.html#//apple_ref/doc/uid/TP40014097-CH20-ID51)

# Section 1
## Memory Leaks trong iOS
Rò rỉ bộ nhớ xảy ra khi cung cấp không gian bộ nhớ không được tái sử dụng bởi ARC (Bộ đếm tham chiếu tự động) vì nó không thể biết rằng vùng nhớ này thực sự được sử dụng hay không. 1 trong những vấn đề phổ biến với rò rỉ bộ nhớ trong iOS là retained cycles mà chúng ta sẽ tìm hiểu sau

## Vì sao ARC không giải phóng bộ nhớ ?
Mỗi khi bạn tạo 1 đối tượng của 1 lớp, ARC sẽ cung cấp vùng nhớ để lưu trữ thông tin về đế đối tượng đó. Khi đối tơngj không còn dùng tới nó sẽ được giải phóng vì thế câu hỏi đặt ra là **bằng cách nào ARC định nghĩa 1 đối tượng là còn sử dụng nữa hay không?.** Để hiểu điều này, chúng ta sẽ nhìn qua cách ARC hoạt động

Mỗi biến đều được định nghĩa bởi tham chiếu **mạnh theo mặc định** Khi bạn tạo 1 đối tượng của lớp với tham chiếu mạnh nó sẽ tăng số tham chiếu lên đối tượng đó. Số tham chiếu là số tham chiếu mạnh lên đối tượng đó. Khi ARC nhìn vào bất kỳ biến nào có số tham chiếu là 0 nó sẽ giải phóng vùng nhớ của đối tượng:

` swift
var referenceOne: Person? = Person()
`

Như ví dụ bên trên chúng ta tạo đối tượng Person. ARC sẽ cung cấp bộ nhớ và lưu trữ tham chiếu tới biến `referenceOne` từ khi biến đó giữ 1 tham chiếu mạnh tới đối tượng `Person` ARC sẽ tăng số đếm tham chiếu lên 1 như hình minh hoạ dưới:

![](https://images.viblo.asia/c712a883-98a2-47c8-9569-0f0baee47b8d.png)

` swift
var reference2 = referenceOne
`

Sau khi thực hiện như trên, chúng ta tạo thêm 1 tham chiếu mạnh tới đối tượng `Person` bằng cách gán địa chỉ của nó cho biến `reference2`. Nhìn hình minh hoạ 2 bên dưới, giờ số đếm tham chiếu đã là 2 sau khi gán thêm 1 tham chiếu mạnh tới đối tượng Person:

![](https://images.viblo.asia/1ceb74a1-62eb-4790-a716-5766b721b7c7.png)

` swift
referenceOne = nil
`

Với việc thực hiện câu lệnh trên chúng ta đã xoá 1 tham chiếu mạnh tới đối tượng `Person` bởi việc gán bằng giá trị nil cho biến `referencOne` để phá vỡ tham chiếu mạnh. Giờ, số đếm tham chiếu = 1 sau khi xoá bỏ 1 tham chiếu mạnh tới đối tượng Person như hình 3:

![](https://images.viblo.asia/ad5b7b01-501e-4ea8-9781-f01bc83222f7.png)

` swift
reference2 = nil
`

Với hành động trên, chúng ta đã xoá thêm 1 tham chiếu mạnh tới đối tượng `Person` bằng cách gán giá trị nil cho đối biến `reference2`. Giờ thì số đếm tham chiếu = 0.

![](https://images.viblo.asia/bc5041af-ea38-4230-a47f-71602017e06b.png)

Khi số đếm tham chiếu = 0 ARC sẽ giải phóng đối tượng Person khỏi bộ nhớ. Đây là cách ARC hoạt động

## Vậy còn làm thế nào rò rỉ bộ nhớ?
Chúng ta đã hiểu cách ARC hoạt động nếu nó thấy bất kỳ bién nào với bộ đếm tham chiếu = 0 nó sẽ giải phóng vậy còn với những vùng bộ đếm tham chiếu không bao giờ trở về 0 nó sẽ khả thi khi viết code với đối tượng thuộc lớp không bao giờ có số đếm tham chiếu khi mà nó không có tham chiếu mạnh. Hãy cùng xem qua ví dụ và tìm giải pháp cho trường hợp này

*Rule of thumb : Nếu không sở hữu đối tượng, ARC sẽ giải phóng bộ nhớ HOẶC*

*Nếu không có tham chiếu mạnh tới thực thể của 1 đối tượng ARC sẽ giải phóng HOẶC*

*Nếu số đếm tham chiếu = 0 ARC giải phóng bộ nhớ HOẶC*

*1 đối tượng không có tham chiếu mạnh, nó sẽ được giải phóng khỏi bộ nhớ*

Đây là ví dụ với việc vòng lặp tham chiếu mạnh (nghĩa là số đếm tham chiếu không bao giờ trở về 0 ) được tạo ra bởi sự bất cẩn. Như ví dụ 5 chúng ta định nghĩa 2 lớp tên `User` và  `Todo`. User có thuộc tính todo dùng để tham chiếu mạnh tới đối tượng todo như chúng ta đã nói trước đó bởi thuộc tính mặc định được tạo bằng con trỏ mạnh tới đối tượng:

![](https://images.viblo.asia/81dc7cb5-e697-4efa-960e-93210142ef06.png)

``` swift
var user: User? = User() //reference count 1 User object

var todo: Todo? = Todo() //Reference count 1 Todo Object
```

Với việc thực thi câu lệnh trên chúng ta tạo ra đối tượng của User và Todo. ARC sẽ cung cấp bộ nhớ và lưu trữ tham chiếu mạnh của đối tượng User tới biến `user` từ khi biến này giữ tham chiếu mạnh tới thực thể đối tượng ARC sẽ tăng số đếm tham chiếu lên 1 tương tự với đối tượng `todo`. Như hình minh hoạ 1 biến user giữ 1 tham chiếu mạnh tới đối tượng User trong khi đó đối tượng todo sẽ giữ đối thực thể Todo:

![](https://images.viblo.asia/d0a16d40-f4a5-4065-af59-7ac542bd6d3c.png)

``` swift
user?.todo = todo //reference count 2 Todo Object

todo?.associatedUser = user //reference count 2 User Object
```

Với việc thực thi những câu lệnh trên chúng ta đã làm: 

1. Đầu tiên, chúng ta tăng số đếm tham chiếu tới đối tượng Todo, giờ thì có 2 con trỏ tham chiếu mạnh tới nó. Nghĩa là nó có 2 chủ sở hữu.
2. Tiếp theo, chúng ta tăng số đếm tham chiếu tới đối tượng User, tương tự như trên thì hiện nó có 2 chủ sở hữu.

![](https://images.viblo.asia/bc22658c-6080-4e7a-b6f4-e2b495f4518e.png)

``` swift
user = nil //reference count 1 User object

todo = nil //reference count 1 Todo object
```

Hợp lý nhất, khi bạn chỉnh Object thành nil thì hàm deinitializer nên được gọi. Trong 1 vài trường hợp, thậm chí deinitializer không được gọi khi bạn set 2 biến là `nil`. Tham chiếu mạnh giữa thực thể `User` và `Todo` vẫn còn và không thể phá vỡ và không có cách nào để giải phóng bộ nhớ cho các đối tượng. Điều này được gọi là **vòng lặp tham chiếu mạnh:**

![](https://images.viblo.asia/9cdb516a-597c-49b0-bec3-86a2f88abdff.png)

## Giải pháp

Có 2 giải pháp cho vấn đề này đó là khiến 1 trong những thuộc tính trở thành weak hoặc unowned. Tham chiếu weak và unowned cho phép thực thể trong vòng lặp tham chiếu có thể chiếu tới đối tượng khác mà không giữ tham chiếu mạnh tới nó. Thực thể có thể tham chiếu tới đối tượng khác mà không tạo ra vòng lặp tham chiếu mạnh. So với mạnh, **weak không làm tăng bộ đếm tham chiếu.**

Như hình dưới, chúng ta tạo thuộc tính `weak` với tên `associatedUser` trong lớp `Todo` nghĩa là gán đối tượng `User` thành thuộc tính mà không làm tăng bộ đếm tham chiếu / không giữ tham chiếu mạnh tới đối tượng User:

![](https://images.viblo.asia/5e654fc2-e5fa-4f50-a422-4b8453e60014.png)

``` swift
var user: User? = User() //reference count 1 User object

var todo: Todo? = Todo() //reference count 1 Todo Object
```

Chúng ta tạo đối tượng User và Todo trong user và biến todo không giữ tham chiếu mạnh tới đối tượng mà nó tương ứng nghĩa là khiến tham chiếu giữa 2 đối tượng là 1:

![](https://images.viblo.asia/1dd16dd5-57fc-4ca9-b581-ffc48dcb77ff.png)

``` swift
user?.todo = todo //reference count 2 Todo Object

todo?.associatedUser = user //reference count 1 User object
```

Đây là cách tham chiếu liên kết tới nhau, User có tham chiếu mạnh tới đối tượng Todo điều đó khiến bộ đếm tham chiếu tăng lên 2 trong khi đó đối tượng Todo có tham chiếu yếu tới User nghĩa là nó không làm thay đổi bộ đếm tham chiếu:

![](https://images.viblo.asia/90f6444c-e89d-4cae-9e7c-432059ed1e6d.png)

`user = nil `

Chỉnh `user` thành nil sẽ giảm số tham chiếu của đối tượng User thành 0:

![](https://images.viblo.asia/374fadb6-5d8e-441f-9e04-61a3b84b8a80.png)

Giờ thì ARC sẽ kiếm tra tất cả đối tượng có bộ đếm tham chiếu nguồn gốc từ đối tượng User bằng 0, nó giải phóng bộ nhớ và các tham chiếu mạnh, sở hữu liên quan như hình dưới. Đối tượng Todo với thuộc tính `associatedUser` sẽ chỉnh thành nil từ khi nó sở hữu tham chiếu yếu. Đối tượng User giờ đã được giải phóng tất cả tham chiếu mạnh tới nó được giữ bởi thuộc tính sẽ trở thành nil khiến cho bộ tham chiếu đối tượng Todo giảm thành 1:

![](https://images.viblo.asia/a4ea8712-ee41-4c39-b37a-4b69bc08c1da.png)

`
todo = nil
`

Chỉnh todo thành nil sẽ khiến bộ đếm tham chiếu thành 0 và ARC sẽ giải phóng đối tượng Todo từ bộ nhớ. Chúng ta sẽ giải quyết vấn đề vòng lặp tham chiếu mạnh bằng việc sử dụng tham chiếu weak điều này tạo nên chúng ta luật đầu tiên.

### Rule 1:
Khi 2 đối tượng có 1 mối quan hệ tương tác thì khiến 1 trong 2 thành weak hoặc unowned.

### Rò rì bộ nhớ trong Closure 

Rò rì bộ nhớ trong Closure = self tham chiếu tới -> đối tượng tham chiếu -> self

Closure là các khối khép kín của chức năng  nó có thể truyền xung quanh cũng như sử dụng trong code của bạn. Closure chụp biến và hằng số từ môi trường xung quanh nó.

## Chụp ?

Như đã nói, Closure chụp ghía trị và hằng số từ phạm vi xung quanh chính nó. Hãy nhìn vào thực hành sau.

1. Đầu tiên, chúng ta định nghĩa 2 biến `a` và `b` với giá trị 20 và 30 tương ứng. Khi chúng ta định nghĩa bất cứ biến nào trong 1 phương thức nó chỉ có thể truy cập bên trong nó.
2. Thứ 2, chúng ta định nghĩa biến `someClosure` nó sẽ chụp `a` và `b` bởi tham chiếu mạnh tới nó để ngăn những giá trị đó được giải phóng và closure  khởi crash khi chúng được giải phóng.
3. Khi phương thức `someMethodThatTakeClosure` gọi nó sẽ thực thi closure và closure sẽ trả lại tổng của `a` và `b` nó chụp lại từ `viewDidLoad`. Như hình minh hoạ bên dưới, giá trị in ra là 50.

![](https://images.viblo.asia/6c3aaf7c-569d-48c1-a58b-d4fc39a50210.png)

Vậy là đã hết phần 1 của bài dịch theo [bài viết](https://medium.com/flawless-app-stories/all-about-memory-leaks-in-ios-cdd450d0cc34) của tác giả Ali Akhtar, cám ơn các bạn đã dành thời gian đọc.
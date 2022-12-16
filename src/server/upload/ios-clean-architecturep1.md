### Introduction

Chắc hẳn với mỗi chúng ta, trước khi chúng ta bắt tay vào làm dự án thì phần xây dựng kiến trúc, tổ chức dự án là điều đầu tiên và rất quan trọng trước khi bắt đầu code. Một số mô hình nổi tiếng như: MVC, MVP, VIPER, MVVM... đã rất quen thuộc với chúng ta. Hôm nay mình xin giới thiệu tới các bạn một kiến trúc khá hay và rất hữu ích với những project phát triển trong thời gian dài đó là Clean Achitecture. Vậy iOS Clean Achitecture là gì? Lợi ích khi sử dụng Clean Achitecture như thế nào?

**Chúng ta cùng tìm hiểu nhé!**

### Common problems in iOS development
"Business logic should be placed in the model", điều này có thể mọi người cũng đã nắm được tư tưởng này, tuy hiên việc hiểu rõ và thực hiện lại không được thống nhất bởi các nhà phát triển.
Trong quá trình phát triển dự án, chúng ta hay gặp việc thay đổi liên quan tới Spec dự án, kỹ thuật dự án thì ý tưởng ban đầu dần dần sẽ không còn chính xác nữa. Phần code bắt đầu trở lên phức tạp, gánh nặng khi phải sửa lỗi. Tình huống này gặp thường xuyên khi chúng ta làm việc với các mô hình MVC, MVP, MVVM...

-> Clean Architecture sẽ giải quyết những khó khăn chúng ta gặp phải ở trên.

### About Clean Architecture

Clean Architecture là business architecture ở đó chia rõ business logic từ UI và Framework, nhận thức được phát triển theo định hướng miền (DDD) và phát triển theo trường hợp sử dụng (UCDD), vai  trò và trách nhiệm của mỗi layer sẽ được giải thích dưới đây: 

![](https://images.viblo.asia/b959a13b-061c-4dcd-a8b8-c0c1dc7c1c0d.jpeg)

#### Benefits of using Clean Architecture

* Business logic trở lên rõ ràng: Ngăn chặn các tình huống là logic đặt trong các class cụ thể và trở lên cồng kềnh và phụ thuộc vào các class khác.
* Nó không phụ thuộc vào framework: Clean Architecture độc lập với các frameworks và thư viện cụ thể.
* UI độc lập: Bạn có thể thay đổi giao diện người dùng mà không thay đổi logic nghiệp vụ
* Không phụ thuộc vào kho dữ liệu: The business logic không biết nơi lưu trữ và đích đến của dữ liệu.
* Dễ dàng test: Dễ dàng trong việc viết unit test trong tất cả các layer

#### Disadvantages of using Clean Architecture

* Lots of code: Viết nhiều code: Số layer sẽ tăng cho mỗi chức năng vì thế số code cũng sẽ tăng lên đáng kể
* Tôi nghĩ rằng nó không phù hợp với những dự án phát triển ngắn hạn.

#### Comparison with other Architecture

**MVC architecture**

![](https://images.viblo.asia/be31c020-f2ca-495d-9ab9-299fe09addbc.png)

**MVP (MVVM) architecture**

![](https://images.viblo.asia/c5ae8208-cd3f-4922-8d90-efcf74f5fc07.png)

**DDD architecture**

![](https://images.viblo.asia/be7932f0-6f8e-477e-a97d-474858f85499.png)

**iOS Clean Architecture**

![](https://images.viblo.asia/e7ffaa7f-fded-45cb-b88e-cde6f0769a0d.png)

### Role and description of each layer

#### Presentation layer

Chúng ta xử lý hiển thị UI và sự kiện, chúng ta không xử lý business logic ở đây

**View (ViewController)**

* Thông báo cho Presenter về các sự kiện như: hiển thị màn hình và sự kiện chạm của người dùng
* Chuyển màn hình với dữ liệu và trạng thái của Model nhận từ Presenter

**Presenter**

* Nhận sự kiện từ View và thực hiện UseCase tuân theo sự kiện nếu cần thiết
* Gán dữ liệu từ UseCase cho View
* Không biết View như thế nào


#### Domain layer

* Layer này có trách nhiệm độc lập về business logic của ứng dụng iOS

**UseCase**

* Mô tả quá trình xử lý logic cần thiết cho use case
* Không trực tiếp gọi UI(không trực tiếp reference từ View, View Controller )

**Translater**

* Chuyển đổi Entity từ UseCase thành Model để sử dụng trong Presentation layer
* Tạo model tối ưu để sử dụng trong View

**Repository**

* Mô tả I/F tương đương vời CRUD của dữ liệu mà bạn muốn có được với UseCase
* Yêu cầu xử lý dữ liệu cho DataStore cần thiết để thu thập dữ liệu
* Repository định nghĩa một I / F xử lý dữ liệu, nhưng nó không biết xử lý dữ liệu như thế nào.
* Có thể coi nó như một lớp Domain, nhưng thực tế nó là I / F của Domain layer và Data layer

#### Data layer

Layer này có trách nhiệm cho việc communication và  quản lý dữ liệu logic

**DataStore**

* Mô tả quá trình xử lý để thu thập và cập nhật dữ liệu
* Nó tương ứng với việc thực hiện xử lý gọi API, Realm, CoreData...
* Khi trao đổi với nhiều DataStore, sử dụng Factory pattern và thiết kết cho repository không  ý thực được kiểu dữ liệu

**Entity**

* Là static model của dữ liệu có thể xử lý bởi DataStore
* Không trực tiếp thao tác với chính nó mà chỉ sử dụng như một value object
* Entity không sử dụng trong Presentation layer

### Conclusion

Trong phần thứ nhất, tôi giới thiệu qua với bạn về Clean Architecture, ưu nhược điểm cũng như việc phân chia các layer. Có thể nói Clean Architecture thể hiện sự phân tách và rõ ràng giữa các layer như: Presentation layer, Data layer, Domain layer... và mỗi layer sẽ chịu chức năng khác nhau, quy định rõ ràng rule từng layer. Chúng ta sẽ cùng đi sâu và làm rõ hơn về từng layer trong project thực tế tại phần hai nhé!

Cám ơn bạn đã dành thời gian cho bài viết này!

##### _Nguồn:_
[https://qiita.com/koutalou/items/07a4f9cf51a2d13e4cdc)
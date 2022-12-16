Xin chào các bạn đã đến với bài viết của mình. Mình là một dev gà mờ, cũng không dám tự nhận mình là master gì đó :)) Hôm nay mình muốn chia sẻ cho các bạn một số kiến thức nhỏ mà mình có được khi làm việc được ở công ty liên quan đến Repository. Nó là gì? Tác dụng của nó là chi? và cách sử dụng nó thế nào? Không lan man nữa, let's starting =))

## Định Nghĩa

Repository là một Design pattern mà theo mình biết khá nối tiếng, nó là lớp trung gian đứng ra giữa phần xử lý logic và phần kết nối cơ sở dữ liệu, cho phép chúng ta sử dụng phần kết nối dữ liệu mà ko cần bận tâm quá nhiều đến phần cơ sở dữ liệu là gì.

Nó giúp ra tuân thủ theo Inversion of Control - Một cách code quy chuẩn giúp tách biệt các phần có liên quan đến nhau, mang tính độc lập. Vẫn có ràng buộc đến nhau nhưng sẽ không ảnh hưởng đến một bên khi bên kia thay đổi. Và nó cũng giúp ta tuân thủ được [Dependency injection](https://viblo.asia/p/dependency-injection-Qbq5Qv3XKD8) nữa :))

## Ưu nhược điểm
Như đã nói ở trên, việc chúng ta áp dung Repository có một số ưu điểm như sau:

* Giảm lượng code nhờ việc chỉ cần gọi các phương thức trong repository ra
* Giảm các phụ thuộc giữa việc sử lý logic code và phần tương tác với cơ sở dữ liệu
* Giảm khả năng code thiếu ở cùng một nơi xử lý
* Dễ dàng trong việc viết Unit Test, giảm rủi ro trong maintain
* Hiệu quả cho việc sử dụng cache

Tuy có khá nhiều ưu điểm nhưng cũng không hẳn là áp dụng repository vào ứng dụng sẽ không có nhược điểm:
* Hiệu quả trong việc dùng cache nhưng nếu phần xử lý có logic nhiều thì việc đưa ra kết quả vào cache sẽ khó khăn hơn
* Việc áp dụng Unit Test khó khăn hơn do logic cần đồng nhất 
* Khi sử dụng reposotiry ở nhiều nơi khác nhau có thể sẽ bị thiếu logic code tùy theo độ khó của phần xử lý logic đó

## Cách sử dụng
Mình sẽ áp dụng luôn Repository trong Laravel cho dễ hình dung =))
Chúng ta sẽ sử dụng cách dễ dàng nhất khi áp repository vào Laravel: Đó là sử dụng thông qua Interface nhúng vào contructor của Controller.

Đầu tiên chúng ta tạo ra một thư mục Repositories trong thư mục app của Laravel.
Sau đó chúng ta tạo ra một BaseInterface với các phương thức hay sử dụng trong thư mục Repositories:

![](https://images.viblo.asia/cebb84e5-a961-4800-b28e-b0d92735cdc4.png)

Nhìn hình ta có thể thấy ở đây mình khai báo các phướng thức chúng ta hay sử dụng trong Controller ra như **getAll**, **find**, **update**, **create**, ...

Tiếp theo đó, chúng ta tạo ra một lớp BaseReposotiry để triển khai interface này ra:
![](https://images.viblo.asia/acef20b8-114b-4694-a59a-eecf831c67e2.png)

Chúng ta sẽ cần overrider lại tất cảc phương thức trong Iterface BaseInterface (cái này ai cũng biết nên mình cũng ko giải thích thêm)

Ở đây chúng ta để ý, mình có truyền một tham số vào contruct của lớp BaseReposotiry này. Mục đích là để lát nữa khi mình sử dụng lại lớp này cho các repository các của các model khác thì chúng ta nếu có phải dùng lại các phương thức của lớp Base này mà áp lên các model kia thì chỉ cần viết lại truyền thạm số là tên các model này vào các contruct của lớp repository đó thôi :))

Sau khi tạo ra lớp BaseRepository này rồi, ta tiếp tục tạo một Interface cho một model cụ thể nào đó, ở đây mình ví dụ là model Item:

![](https://images.viblo.asia/82c40aee-3970-4bf3-90be-f23d589125e7.png)

Trong interface này mình có một phương thức là **getItemByCategory**. Sau đó chúng ta tạo ra môt lớp để implement lại interface của model Item này:

![](https://images.viblo.asia/9bcff129-24ea-4f05-a4fb-9dee7efcfd93.png)

Chúng ta có thể thấy, ở phương thức khởi tạo, mình truyền vào là một model Item, có nghĩa là tất cả các phương thức trong lớp này sẽ tương tác với model Item.

Sau khi đã tạo ra các Interface và các lớp implement cho các model cần thiết, bước tiếp theo chúng ta sẽ tạo ra một service provider cho repository băng cú pháp: 

`php artisan make:provider RepositoryServiceProvider`

Cú pháp này sẽ tạo ra một provider cho repository, nhưng đó chưa phải đủ. Mà chúng ta cần đăng kí nó trong file app config của ứng dụng ở phần **provider** bằng cách: **namespace** + **RepositoryServiceProvider**   :

![](https://images.viblo.asia/1b783ba7-a12c-4561-a82f-24f29c330b01.png)

Nhớ sử dụng **php artisan config:cache** để xóa cache cũ đi nhé !

Sau đó trong file RepositoryServiceProvider ở thư mục App\Providers, ta sẽ đăng kí các Interface cùng các implement của chúng ở đây vào phương thức **register()** :

![](https://images.viblo.asia/ae90f4a7-5973-4d0d-b901-a27093434e79.png)

Ok, vậy là chúng ta đã làm xong khâu chuẩn bị. Bây giờ chúng ta chỉ cần gọi chúng ra mà sử dụng thôi

Ở một controller bất kì nào đó mà chúng ta có sử dụng đến model Item, ta sẽ truyền tham số vào contruct của controller đó ItemrepositoryInterface:

![](https://images.viblo.asia/17ada7c6-7cfc-48fe-b56a-e3ab9a23f825.png)

Đó như ta có thể thấy, mình sử dụng một biến $item để lấy dữ liệu từ tham số truyền vào trong contruct
và sau đó trong phương thức bên tronng controller ta gọi ra phương thức getItemBycateogory mà ta đã viết trong ItemRepositoryInterface. Đơn giản phải không :))

Nhưng nó móe đơn giản đâu? Tại sao ư? Bạn có biết tại sao ở đây chúng ta truyền một tham số là một interface mà ta lại gọi được phương thức từ đó không =))
Đó là do nó đã được inject class implement tự động khi chúng ta sử dụng service container, nên chúng ta chỉ cần đưa interface của nó vào là nó tự động dò được classs implement vào controller để cho chúng ta có thể gọi ra thoi :v:  Tuyệt vời đúng ko :D
## Kết luận
Việc áp dụng repository vào dự án là một quyết định đúng đắn nhất của mình đến thời điểm hiện tại, dù sau này không biết code có được coi là ngon không =)). Nó giúp mình maintain rất nhiều và tiết kiệm thời gian cũng như công sức code, mà lại có thể sử dụng lại được nữa chứ :D

Bài viết có tham thảo nguồn:

https://viblo.asia/p/tim-hieu-ve-service-container-trong-laravel-Qbq5QLw3lD8

Xin cảm ơn các bạn đã đọc bài :D
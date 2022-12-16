Laravel Eloquent ORM ([tham khảo tại đây](https://laravel.com/docs/6.x/eloquent)) cung cấp một API đơn giản để làm việc với cơ sở dữ liệu. Nó là một triển khai của mẫu [Active Record](https://www.martinfowler.com/eaaCatalog/activeRecord.html). Mỗi bảng cơ sở dữ liệu được ánh xạ tới một **lớp Model** được sử dụng để tương tác với bảng đó.
# Mass Assignment
Hãy chia nhỏ từ này nhé

* **Mass** : có nghĩa là số lượng lớn
* **Assignment**  :nghĩa là toán tử gán trong lập trình
Để giúp cuộc sống của các nhà phát triển trở nên dễ dàng hơn, Eloquent ORM cung cấp chức năng Gán hàng loạt giúp họ gán (chèn) một số lượng lớn đầu vào vào cơ sở dữ liệu.
# Khi không sử dụng Mass Assignment
Hãy xét một form với 10 trường thông tin người dùng như sau:
```
  <form method="POST" action="/signup">
        <input type="text" name="name" />
        <input type="text" name="user_name" />
        <input type="text" name="password" />
        <input type="text" name="address" />
        <input type="text" name="city" />
        ...
        ...
        ...
        <button type="submit">Signup</button>
    </form>
```
và phương thức lưu trữ của Controller của chúng ta trông giống như sau:
```
public function store(Request $request)
{
    //thực hiện xác thực

    $user = new User;

    $user->name = $request->get('name');
    $user->user_name = $request->get('user_name');
    $user->password = bcrypt($request->get('password'));
    $user->address = $request->get('address');
    $user->city = $request->get('city');

    //....

    $user->save();
}
```
Chúng ta sẽ gán từng dữ liệu đầu vào theo cách thủ công cho model User và sau đó lưu vào cơ sở dữ liệu.
> *Sẽ như thế nào nếu có một cách để chèn tất cả các dữ liệu đầu vào mà không cần gán thủ công?*
# Sử dụng Mass Assignment
Laravel Eloquent ORM cung cấp một phương thức **create** giúp bạn lưu tất cả dữ liệu đầu vào chỉ với một dòng duy nhất.
```
public function store(UserFormRequest $request)
{
    //xác thực được thực hiện trong UserFormRequest

    $user = User::create($request->validated());
} 
```
Thật tuyệt phải không? Chỉ với một dòng duy nhất, chúng ta có thể lưu tất cả dữ liệu đầu vào vào cơ sở dữ liệu. Trong tương lai, nếu chúng ta thêm nhiều trường đầu vào hơn trong biểu mẫu HTML của mình, chúng ta không cần phải lo lắng về việc lưu vào phần cơ sở dữ liệu.
> Chú ý là thuộc tính **name** của input phải khớp với tên cột trong cơ sở dữ liệu.
# Lỗ hổng tiềm ẩn
Để dễ hiểu, chúng ta hãy xem xét rằng ta có một cột **is_admin** trên bảng **User** với giá trị true / false.

Người dùng có thể chèn HTML của riêng họ, một đầu vào ẩn như sau:
```
  <form method="POST" action="/signup">

        <input type="hidden" name="is_admin" value="1" />

        <input type="text" name="name" />
        <input type="text" name="user_name" />
        <input type="text" name="password" />
        <input type="text" name="address" />
        <input type="text" name="city" />
        ...
        ...
        ...
        <button type="submit">Signup</button>
    </form>
```
Với Mass Assignment, **is_admin** sẽ được gán **true** và người dùng sẽ có quyền Quản trị trên trang web, điều mà chúng ta không muốn.
# Tránh lỗ hổng bảo mật
Có hai cách để xử lý điều này.

* Chúng ta có thể chỉ định (danh sách trắng) những cột nào có thể được gán hàng loạt.
Laravel Eloquent cung cấp một cách dễ dàng để đạt được điều này. Trong lớp model của bạn, hãy thêm thuộc `$fillable` tính và chỉ định tên của các cột trong mảng như bên dưới:
```
class User extends Model
{
    protected $fillable = [
        'name',
        'user_name',
        'password',
        'address',
        'city'
        ...
    ];
}
```
Bất kỳ trường đầu vào nào khác với những trường này được truyền cho phương thức **create()** sẽ được ném qua **MassAssignmentException** .

* Chúng ta có thể chỉ định (danh sách đen) cột nào không thể được chỉ định hàng loạt. Bạn có thể đạt được điều này bằng cách thêm thuộc tính `$guarded` trong lớp model:
```
class User extends Model
{
    protected $guarded = ['is_admin'];
}
```
Tất cả các cột không phải **is_admin** bây giờ sẽ có thể gán hàng loạt.
> Bạn có thể chọn `$fillable` hoặc `$guarded` nhưng không được cả hai.

Vậy là chúng ta vừa tìm hiểu xong về Mass Assignment trong Laravel Eloquent. Đơn giản đúng không nào.
# Reference
[Understanding Mass Assignment in Laravel Eloquent ORM](https://dev.to/zubairmohsin33/understanding-mass-assignment-in-laravel-eloquent-orm-331g)
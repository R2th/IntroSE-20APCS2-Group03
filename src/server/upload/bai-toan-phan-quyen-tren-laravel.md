# Lời nói đầu.

Là một lập trình viên  , chắc hẳn ai cũng phải làm bài toán quản trị Thêm , Sửa, Xóa .... Đây gần như là bài toán mà hầu như lập trình viên nào cũng phải làm qua. Tuy nhiên ngày hôm nay mình sẽ không nói về các bài toán phổ thông trên mà sẽ nói về bài toán ít phổ thông hơn. Đó là bài toán phân quyền. Nào, cùng bắt đầu việc phân quyền với `Laravel` nhé ! Let's go ........... 

# Nội dung

## Bài toán.
Bạn có 1 trong quản trị nội dung vơi các chức năng :
* Quản lý tài khoản
* Quản lý bài viết
* Quản lý chuyên mục
* Quản lý tác giả
* ..v...v...v...

***Nhiệm vụ***:  

Cần phân tách các chức năng ra, 1 user chỉ có thể làm 1 chức năng và user đó không được phép truy cập vào các chức năng khác.

## Tiến hành
Đầu tiên, chúng ta cần tạo ra 1 nơi để chứa quyền của 1 user . Vì 1 user chỉ có quyền vào 1 chức năng nên mình sẽ tạo thêm 1 fiel `permission` ở bảng `users`  trong database . Bảng `users` sẽ có dạng như sau :


| Field Name | Type |
| -------- | -------- | 
| id     |  int(9)     | 
| name     |  int(9)     | 
| email |  string(256) |
| password |   string(256) |
| .... | ...... |
| permission | string(256) |


Sau khi đã tạo được giá trị bảng dữ liệu như trên, ta bắt đầu thực hiện làm 1 màn hình update với mục đích update permission cho các user . Việc này quá đơn giản rồi nên mình xin phép không nói gì thêm ở đây. 

Khi đã tạo xong, ta update quyền cho 1 user . Ví dụ như sau :

| Field Name | Type |
| -------- | -------- | 
| id     |  1     | 
| name     |  Viet Anh     | 
| email | nv2anh@gmail.com |
| password |   xxxxxxxx |
| .... | ...... |
| permission | user |

Để xác định xem tài khoản `Viet Anh` có được phép phân quyền chức năng `quản trị user ` hay không ? Ta tiếp tục, vào model cúa `User` để định nghĩa ra 1 function như sau : 

| Input | Output |
| -------- | -------- | 
| String (Example : user, author, category, article )    |  Boolean (Example : `true` or `false` )     | 

```
 public function hasDefinePrivilege($permission)
    {
        if (!$permission) {
            return false;
        }

        return $this->permission ==  $permission;
    }
```

Ok, như vậy là chúng ta đã có một Function để check xem User `Viet Anh` có quyền `quản trị user ` bằng cách như sau :

1. Vào command và di chuyển đến thư mục project
2. Run : `php artisan tinker`
3. Get User bằng cách run Command :
    ```
        $user = Models/User::find(1)
    ```
4. Check permisson bằng cách chạy câu lệnh sau :

    ```
        $user->hasDefinePrivilege('user'); // Return true hiển nhiên rồi
        $user->hasDefinePrivilege('article'); // Return False
    ```
    
    Như vậy bạn cũng đã thấy, đây đơn giải chỉ comapre 2 text với nhau qua là đơn giản luôn . Nhưng chẳng lẽ cứ lần nào muốn check quyền lại phải code 1 đống thư như thế kia... như vậy khá là nan giải vào tốn rất nhiều công sức nếu các bạn có cực nhiều module chức năng vào nhiều user. Code to tay luôn =))
    
    Cần tìm 1 phương án khác .... Và thật may mắn là với `Laravel` chúng ta có 1 cách khá đơn giản .Laravel hộ trợ tự động package [Gate](https://laravel.com/docs/5.6/authorization#gates) . 
    
    `Gates` là `Closures` xác định xem người dùng có được phép thực hiện một hành động cụ thể hay không (ở đây chúng ta thực việc check permission nhé) và thường được định nghĩa trong `App\Providers\AuthServiceProvider`. Function cụ thể như sau :
    
    ```
    public function boot(GateContract $gate)
    {
        $gate->define('permission', function ($user, $permissions) {
                return $user->hasDefinePrivilege($permissions);
            });
    }
    ```
    
    
    ***Notes :***
`Gate` luôn nhận được một `user` làm đối số đầu tiên và có thể tùy ý nhận các đối số bổ sung khác . Vì vậy khi define `Gate` bạn nên chú ý đến điều này .

Ok, như vậy ở đây mình đã define 1 funtion để xác thực quyền rồi . GIờ thì chỉ còn việc cần xác thực ở đâu và cách xác thực như thế nào nữa thôi . Với vấn đề này, `Gate` cung cấp cho chúng ta 2 phương thức để `allows` và `denies` . Cụ thể như sau :
```
if (Gate::allows('permission', 'user')) {
    // User hiện tại có quyền truy cập quản trị User...
}

if (Gate::denies('permission', 'article')) {
    //  User hiện tại không có quyền truy cập quản trị bài viết
}
```

  ***Notes :***
  Bạn ko cần chuyền đối số `user` vào vì `Gate` tự động lấy user đang đăng nhập vào để check quyền.
  
  
Vơi 2 phương thức này bạn có quyền check quyền thoải mái ở khắp mọi nơi tư Controller, Service hay là Model ... Việc này là không giới hạn, tuy nhiên với View thì sẽ có 1 chút khách biệt nho nhỏ. Bạn thực hiện xác thực bằng cách :

```
@can('permission', 'user')

@endcan
```
 Với cú pháp này, bạn có thể dễ dàng hiện hay ẩn các menu tùy thuộc vào user có quyền gì để show menu ra . 
 
 
 Đó, chỉ có vậy thôi ... Quá là easy phải không ! 
 
 Thực ra đây là cách đơn giản nhất để phân quyền, với [Gate](https://laravel.com/docs/5.6/authorization#gates) bạn có nhiều phương pháp hơn để giải quyết vấn đề này ... Hãy tìm hiểu nó và tìm ra những cách hay hơn nhé ! Thân !
 
#  Tư liệu tham kháo
[Gate - https://laravel.com/docs/5.6/authorization#gates](https://laravel.com/docs/5.6/authorization#gates)
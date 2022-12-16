If you want to count the number of results from a relationship without actually loading them you may use the withCount method, which will place a {relation}_count column on your resulting models. 

Nếu như bạn muốn đếm số kết quả từ 1 model quan hệ mà không thực sự muốn loading chúng,bạn có thể sử dụng phương thức withCount .Phương thức này sẽ tạo thêm 1 trường {relation}_count trong kểt quả nhận đc .
Ví dụ : bạn có 2 model : User và  Post , 1 user có thể có nhiều post .
Trong model user, bạn tạo quan hệ one to many:
```
 public function post() {
        return $this->hasMany('App\Post','user_id');
    }
```
Ở đây , nêú bạn muốn lấy số post mà 1 user thực hiện ,bạn có thể thực hiện : 
 ```
 $users = User::withCount('post')->get();
  foreach ($users as $user) {
       echo $user->post_count;
}
```
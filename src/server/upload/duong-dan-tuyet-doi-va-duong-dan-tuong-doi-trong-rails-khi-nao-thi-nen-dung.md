## Lời mở đầu
Trong rails _path là đường dẫn tương đối. Còn _url là đường dẫn tuyệt đối.

Ví dụ trong rails routes có `resources: users`

thì `users_path` sẽ là đường dẫn `/users`

`users_url` sẽ là đường dẫn `http://localhost:3000/users`

Qua _url ta có thể thấy được giao thức truyền tải của trang web và server name.

Ở ví dụ trên thì giao thức truyền tải là `http` và có server name `localhost:3000`

#### Vậy khi nào thì NÊN dùng _url, _path?
##### _url:
- Khi điều hướng (`redirect_to`) ở controller
- Trong trường hợp liên kết đến một trang SSL từ một trang không phải SSL và ngược lại. Nó giống như trường hợp khi bạn copy và paste đường dẫn video Youtube nào đó thì cần đường dẫn tuyệt đối. Hay là các liên kết trong email, đó phải là những đường dẫn tuyệt đối
##### _path:
- Dùng trong những liên kết trên view (`link_to`). 
#### Lưu ý:
 Trong các trang view, những liên kết (`link_to`) các bạn dùng _url hay _path thì vẫn chạy bình thường nhé. Còn ở các liên kết trong email nếu các bạn dùng _path thì sẽ bị báo lỗi, không tin các bạn cứ thử xem. :grinning:
## Lời kết
Bài viết tuy hơi ngắn nhưng mình hi vọng giúp ích được cho một số bạn chưa hiểu rõ vì sao khi nào nên dùng _url, khi nào nên dùng  _path.
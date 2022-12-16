## Đặt vấn đề
Hỏi: Tôi muốn sử dụng `git` và `Github` ngay trong chính IDE của mình có được không, IDE nào hỗ trợ điều đó?

Trả lời: Có rất nhiều IDE hỗ trợ hệ thống quản lý phiên bản. Nhưng để trải nhiệm được sâu sắc nhất sự tiện lợi thì mong bạn hãy thử `PhpStorm` . 

## Sử dụng `Git`, `Github` trong PhpStorm

### Cấu hình và sử dụng VCS
Đầu tiên để sử dụng hệ thông quản lý phiên bản - VCS thì bạn cần cấu hình nó:

- Cấu hình VCS: `File->Setting->Version Control` và add một hệ quản lý phiên bản bạn muốn dùng vào cùng với đường dẫn đến project của bạn. `PhpStorm` hỗ trợ nhiều VCS như:`CVS`, `Git`, `Mercurial`, `Perforce`, `Subversion`. Ví dụ:

![](https://images.viblo.asia/d0b1efa6-53ea-42d1-9dc9-e1efc223717c.png)

- Cấu hình `Github`: `File->Setting->Tools->Tasks->Servers` và add một server VCS cần đăng nhập.

![](https://images.viblo.asia/8e0d941f-bdc4-4644-a5ea-0f7ecb801249.png)

Sau khi cấu hình VCS chúng ta có thể sử dụng `Alt+9` để show màn hình Log.
![](https://images.viblo.asia/d479ec77-ec29-4a29-90d8-1625811c0976.png)

Bên trái là danh sách các commit và thông tin, bên phải là danh sách các file thay đổi trong commit đó (có thể xem các thay đổi này bằng cách click vào tên file).
### Sử dụng: 
Để sử dụng các tính năng của `Git` bạn có thể sử dụng `Terminal` (`Alt+F12`) của PhpStorm hoặc Chọn các tính năng trên tab VCS của thanh menu:
![](https://images.viblo.asia/d77f54a8-3788-4aa4-966d-261f19642afe.jpg)

các lệnh với Git đều có như: `commit`, `reset`, `checkout`, `stash`, `fetch`, `pull`, `push` , `clone` - clone một project về theo đường dẫn.....
Ví dụ:
Để tạo một `commit` mới từ nhánh nào đó chỉ cần `ctl+K` sau đó: chọn các file muốn commit hay bỏ chọn các file không muốn; chọn các dòng muốn và bỏ chọn các dòng không muốn trong file (các thay đổi đều được hiện một cách trực quan dễ thao tác); commit messenge; refactor code trước khi commit; deploy sau khi commit ... và cuối cùng là nhấn `Commit`
![](https://images.viblo.asia/8bb73741-0559-4bb7-a979-52bca792edfa.png)

Để tạo push commit thì chỉ cần nhấn `shift+ctl+k` chọn hoặc loại bỏ commit rồi click `Push`

![](https://images.viblo.asia/6c961fbd-e3e3-4d93-827e-1f5302185d41.png)

### Quản lý issue Github với PhpStorm
Sau khi đã đăng nhập Github chúng ta có thể xem các thông tin repository của mình kể cả các pullrequest, issue hay commit.

Ngoài ra PhpStorm cũng hỗ trợ công việc hoàn thành issue. Ví dụ:

Chọn Tools -> Tasks & Context -> Open task (`Alt+Shift+N`)  để mở danh sách các issue cũng như các task đang có. Chọn một issue để làm. Tiếp theo sẽ checkout sang một branch mới. 
![](https://images.viblo.asia/b9dbbc10-ba42-4851-9eb4-3d096ae57836.png)

Làm, commit, push và sau đó tiếp tục vào `Tools -> Tasks & Context -> Close active Task` để tự động close task trên Issue Github
## Tổng kết 
Còn rất nhiều tính năng của VCS mà PhpStorm hỗ trợ như: "show branch", "Show history", show "Annotations",... hãy cài đặt và trải nhiệm PhpStorm ngay thôi :+1:

Cảm ơn các bạn đã đọc bài viết của mình :hugs:
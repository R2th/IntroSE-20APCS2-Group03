Nếu bạn không muốn dùng tool được tích hợp sẵn trong Xcode(Xcode -> Source Control -> Commit, Push, Pull,...) hoặc các phần mềm quản lý source riêng biệt như Source Tree,... thì bạn cũng có thể sử dụng các command trong Terminal để quản lý source của project.

Dưới đây là một danh sách các lệnh git được sắp xếp có thứ tự trong một project thực tế.

**Fork, Clone**

Mở website của [github](https://github.com) , tìm đến project, và nhấn nút **Fork** ở phía trên bên phải của website để tạo 1 sub-project của project cha, nó là project mới trong git hub cá nhân mình
![](https://images.viblo.asia/c6ece143-ea47-4c8d-b2fc-1f36d105c136.png)

Sau đó, trở lại website project cha, nhấn nút "Clone or download" để lấy code xuống máy, có 2 cách clone là "HTTPS" và "SSH"
- "HTTPS" thì sử dụng web url
- "SSH" thì nó sử dụng SSH key và passphrase của tài khoản của mình, và mỗi lần tương tác với project cha thì buộc phải nhập passphrase, vì vậy, khi cấu hình SSH thì các bạn nên đặt passphrase cho dễ nhớ, và ngắn gọn, đơn giản thôi. Vì trong thực tế coding, bạn sẽ phát cáu với git nếu chẳng may đặt pass lộn xộn như mấy ông khách hàng Nhật.

Clone bằng HTTPS, sao chép cái link ở trong ô hình chữ nhật, mở Terminal, trỏ đến đường dẫn thư mục muốn lưu project và gõ lệnh sau

```
git clone link
```

**Tạo remotes**

Chúng ta phải tạo ít nhất 2 remote cho project 1 cho super-project và 1 cho sub-project mới vừa clone.

Mặc định khi mới clone về máy thì ta chỉ có 1 remote với tên là origin, nó là remote của super-project vì nãy mình clone từ project đó.

Thông thường, mình đặt tên remote cho super-project là *company* và remote cho sub-project là *origin*, vậy nên mình sẽ sửa lại remote như sau

Đầu tiên, move đến project và kiểm tra lại danh sách các remote hiện tại
```
git remote -v

==> 
origin link (fetch)
origin link (push)
```

Tạo remote mới cho super-project
```
git remote add company super-project-link
```

Sau đó xoá origin remote
```
git remote remove origin
```

Và cuối cùng add lại origin cho sub-project
```
git remote add origin sub-project-link
```

Check lại danh sách các remote
```
git remote -v

==>
company	super-project-link (fetch)
company	super-project-link (push)
origin	sub-project-link (fetch)
origin	sub-project-link (push)
```

Xong phần remote, tiếp đến là phần code

**Code**

Thông thường thì super-project có 2 branch là master(mặc định) và develop, và mình sẽ chỉ code trên develop branch, còn chỉ khi release xong các mốc cố định thì mới merge code từ develop vào master. 

Ta checkout 1 branch mới từ develop để làm những task của mình.

Chẳng hạn làm UI cho màn hình search.
```
git checkout -b search_ui
```

Thì search_ui sẽ là branch mới, sau đó chúng ta làm task, thêm mới, thay đổi code trong branch đó, đến khi hoàn thành và muốn tạo 1 pull request để merge code vào develop branch để cho các thành viên khác trong team có thể review  

Gõ lệnh tạo 1 commit cho branch đó
```
git commit -am "implement search ui"
```

Gõ lệnh kiểm tra xem các file thay đổi đã được commit hết chưa
```
git status
```

Nếu còn file chưa được commit thì phải gõ lệnh sau:
Add toàn bộ file vào commit hiện tại
```
git add .
```
 Nếu vẫn còn thì add thủ công từng file
```
git add link_file_1
git add link_file_2
...
```
Sau khi đã add tất cả file xong thì tiến hành gộp nó vào commit hiện tại bằng lệnh
```
git commit --amend
```

Kiểm tra xem đúng các commit chưa, nếu đúng rồi thì nhấn tổ hợp phím
*Shift* + *:* và gõ wq, nghĩa là write and quit.

Xong phần commit code, đến phần rebase những code đã thay đổi đó đến develop branch để xem có xung đột với code của develop không, vì team có nhiều người, đôi lúc người ta cũng thay đổi code ở chỗ mình thay đổi, và nếu code của người ta đã được merged trước vào develop thì code của mình đã trở nên cũ và gây xung đột, cho nên, bắt buộc phải rebase code trong mọi trường hợp tạo pull request.

Trước hết phải chuyển qua develop branch
```
git checkout develop
```

Sau đó, pull code mới nhất từ develop về
```
git pull company develop
```
Nếu dùng SSH thì ở bước này nhập cái passphrase vào và nhấn nút *Enter* để thực hiện pull

Sau khi pull xong thì chuyển qua lại search_ui của chúng ta
```
git checkout search_ui
```

Tiếp, rebase code với develop
```
git rebase -i develop
```

Check trạng thái của branch
```
git status
```

Nếu thành công thì mọi chuyện đều tốt đẹp, nhưng lỡ may bị conflict thì sẽ  hiện 1 danh sách các file bị xung đột. Nhiệm vụ của chúng ta là sửa từng file đó, thống nhất code cũ và mới. Khi đã sửa xong toàn bộ thì chạy thử project, nếu chạy được ngon lành thì tiếp tục các bước sau, nếu chưa chạy được thì xem lại các file đã sửa rồi giải quyết vấn đề.

Tiếp, add các file đã thay đổi vào commit hiện tại

```
git add .
 
//hoặc
  
git add changed_file_link_1
git add changed_file_link_2
...
```

Sau đó tiếp tục rebase
```
git rebase --continue
```

Xong phần rebase, bước cuối cùng dưới project là push code đó lên github của mình, chính là origin remote mà mình tạo ở trên
```
git push origin search_ui
or
git push origin search_ui -f
```

Bây giờ code đã lên web, dưới Terminal không cần làm việc gì nữa.

Tổng hợp 1 list thứ tự các lệnh git thông thường trong project đã tồn tại
```
git checkout develop
git pull company develop
git checkout -b branch_a
git commit -am "message"
git checkout develop
git pull company develop
git checkout branch_a
git rebase -i develop
git push origin branch_a / git push origin branch_a -f
```

**Pull request**

Sau khi code đã lên trên website của github, thì chúng ta lên trên đó để tạo Pull Request, merge code từ search_ui into develop, web hướng dẫn rất rõ ràng và dễ làm, không cần phải nói thêm nữa.
Trong quá trình làm việc, Ubuntu luôn là hệ điều hành đóng vai trò là môi trường chính để mình phát triển các sản phẩm. Tuy đã làm việc với Ubuntu trong một thời gian khá lâu nhưng nhiều khi mình vẫn thấy hơi bối rối khi gặp phải một vài trường hợp muốn sửa hay chạy một file nào đó nhưng không thể thực hiện được. Lỗi đơn giản là do mình không có quyền thực hiện các tác vụ đó. Những lúc như thế mình thường thêm sudo vào đằng trước câu lệnh vừa nãy hay cục xúc hơn là sử dụng chmod 777 cho cái file cứng đầu kia mà không cần biết tại sao. Dù là hơi muộn nhưng còn hơn là không, ngày hôm nay mình sẽ giành ra một buổi tối để tìm hiểu về vấn đề này.

## Classes

Chúng ta đều biết permission là việc phân chia các quyền hạn được phép thực hiện trên một tài nguyên hệ thống tương ứng với từng loại user. Vì vậy trước khi đi vào chủ đề chính, việc đầu tiên chúng ta cần biết là trong Linux tồn tại những lớp đối tượng nào có khả năng tác động đến các tài nguyên hệ thống.

### root

Thông thường trong bất cứ hệ điều hành Linux nào đều tồn tại một người dùng đặc biệt là root. Đây là người dùng có mọi quyền hạn liên quan đến việc quản lý các tài nguyên trên máy.

### user

Đây đơn giản là một user nào đó, bao gồm cả user đang đăng nhập vào trong hệ thống. Bạn có thể kiểm tra user mà mình đang đăng nhập thông qua dòng lệnh:

```
whoami
```

Do trong một hệ thống có thể sẽ có nhiều user khác nhau nên bạn cũng có thể switch sang các user khác bằng lệnh:

```
su – otheruser
```

Khi không truyền tên user mà bạn muốn đăng nhập vào thì mặc định bạn sẽ được switch sang user root.

### group

Khi có nhiều user cùng tồn tại trên hệ thống, việc quan trọng mà bạn cần làm để có thể quản lý được quyền hạn của chúng là nhóm chúng vào trong các group. Mỗi user trong group sẽ có quyền tương ứng với group đó và một user có thể ở trong nhiều group khác nhau. Bạn có thể tạo mới một group như sau:

```
sudo groupadd docker
```

Bạn cũng có thể thêm một user vào trong một group:

```
sudo usermod -a -G docker lam
```

### owner

Với bất kỳ tài nguyên nào trên hệ thống của bạn, khi xét về tính sở hữu đối với tài nguyên đó, chúng ta có thể liệt kê ra những loại sau:

* Chủ sở hữu là một user (owner): Đây là một user nào đó sở hữu tài nguyên đó.
* Chủ sở hữu là một group (group): Một group cũng có thể là chủ sở hữu của một tài nguyên.
* Những user, group không sở hữu (other): Tất cả những user và group không phải là chủ sở hữu của tài nguyên.

Vậy làm thế nào để thay đổi chủ sở hữu cho một tài nguyên nào đó? Để dễ hình dung, chúng ta sẽ coi file `hello.example` là tài nguyên mà chúng ta cần thao tác.

Để đổi người sở hữu, chúng ta sử dụng:

```
chown [username] hello.example
```

Tương tự, nếu bạn muốn đổi group sở hữu:

```
chown :[groupname] hello.example
```

Trong trường hợp bạn muốn đổi cả owner và group thì sẽ chạy câu lệnh sau:

```
chown [username]:[groupname] hello.example
```

## Permission

Bây giờ bạn hãy vào thư mục chứa file `hello.example`, mở terminal lên và gõ lệnh sau:

```
ls -l
```

Trên máy của bạn có thể sẽ cho ra một kết quả khác nhưng trên máy của mình thì là:

```
-rwxrw-r--  1 lam root       0 Th09 22 21:40 hello.example
```

Trong đó `lam` thể hiện user đang sở hữu file `hello.example`, còn `root` sẽ tương ứng với group đang sở hữu. Để dễ hiểu chúng ta sẽ phần tách chuỗi `-rwxrw-r--` ra như sau:

```
-       rwx        rw-        r--
        u(owner)   g(group)   o(other)
```

Kí tự đầu tiên trong chuỗi biểu thị loại của tài nguyên. Nó cho ta biết đó là một file, một folder hay là một link. Mỗi 3 ký tự tiếp theo sẽ tương ứng với những permission đang được áp dụng cho owner, group và other. Cụ thể ý nghĩa của nó như sau:



| Permission | Notation | 
| -------- | -------- | 
| read     | r     |
| write     | w    |
| execute   | x    |

Dựa vào đây chúng ta có thể thay đổi quyền thao tác lên bất cứ một tài nguyên nào chúng ta muốn.

### chmod

Tại thời điểm này, kết hợp tất cả những gì đã biết, chúng ta hoàn toàn có thể thay đổi quyền của từng nhóm người dùng chỉ trong một câu lệnh. Cú pháp chung sẽ là:

```
chmod [target][condition][permission] [filename]
```
Trong đó:

* `target`: Đại diện cho đối tượng muốn thay đổi quyền, nhận các giá trị: `u` (owner), `g` (group), `o` (other), `a` (all).
* `condition`: Điều kiện thêm vào hay thu hồi quyền bao gồm: `+` (thêm vào), `-` (thu hồi).
* `permission`: Đây là các quyền được phép thao tác: `r` (read), `w` (write), `x` (execute).
* `filename`: Đối tượng chịu tác động.

Trở lại với ví dụ bên trên, bây giờ chúng ta sẽ thử thêm quyền execute file `hello.example` cho group root và other:

```
chmod go+x hello.example
```
Tương tự, nếu bạn muốn bỏ quyền execute của owner thì chỉ cần chạy lệnh dưới đây:

```
chmod u-x hello.example
```

Cú pháp bên trên rất thuận tiện và thích hợp khi bạn muốn thêm hoặc thu hồi quyền đối với một đối tượng nào đó. Tuy nhiên, nó có một hạn chế là bạn không thể thêm và thu hồi quyền một cách đồng thời. Rất may mắn là chmod cũng cung cấp cho chúng ta một cách khác để thực hiện được điều đó:

|Permission|Value|
| -------- | -------- | 
|read|2 ^ 2 = 4|
|write|2 ^ 1 = 2|
|execute|2 ^ 0 = 1|

Như các bạn đã thấy, mỗi permission sẽ tương ứng với một lũy thừa của 2 và tổng hợp các quyền sẽ tương ứng với tổng các giá trị của từng permission. File `hello.example` đang có trạng thái như sau:

```
421        420        400
rwx        rw-        r--
o(owner)   g(group)   o(other)
```
Khi biểu diễn bằng số, các quyền của nó sẽ là: `764` . Đến đây chắc các bạn cũng đã nhận ra, đôi khi chúng ta `chmod 777` là vì điều gì rồi đúng không.

## Summary

Vừa rồi là một số chia sẻ của mình về việc phân quyền trong Linux nói chung và trong Ubuntu nói riêng. Về cơ bản, chỉ cần nắm được một số kiến thức bên trên là chúng ta đã có thể tự tin thao tác với những tài nguyên trên máy tính. Có thể bạn sẽ không thấy nó hữu ích ngay lúc này nhưng một lúc nào đó bạn phải thao tác nhiều trên server thì đây có thể sẽ là những kiến thức cơ bản mà bạn cần phải biết. Hẹn gặp lại các bạn trong những bài viết lần sau!
## Introduction
![](https://images.viblo.asia/90d5efa9-be8b-4dad-b4f4-2053a0d9a30c.jpeg)

Có bao giờ bạn thắc mắc khi gõ lệnh `ls -l` trong Terminal, console hiện ra một loạt các cột như `drwx--x--x` rồi thì tên của ai đó, rồi admin hay staff gì đó, thật là khó hiểu. 

```
$ ls -l
```

![](https://images.viblo.asia/0b8995e4-e389-45ac-929a-90433f7ba98a.png)

Rồi thì đôi khi phải chạy một số lệnh như `chmod 400 filename` để giúp file có thể chạy được. Chúng là gì và có ý nghĩa thế nào, cùng tìm hiểu với mình trong bài viết này nhé.

## Overview
Khi bạn mở Terminal hoặc connect vào Server, Command Line sẽ xuất hiện, Account của bạn sẽ quyết định xem thư mục nào bạn sẽ connect tới, và nó cũng xác định luôn Permission nào bạn có đối với file và thư mục. Trong bài viết này chúng ta sẽ nói đến Permission, thứ mà xác định dựa vào file, thư mục, quyền thực thi, môi trường thực thi và Account mà bạn đang sử dụng. 

Trong Unix và Linux, Permissions được chia thành 2 loại: Ownership và Access types. Ownership có 3 loại: User, Group và Other. Và Access types có 3 kiểu: Read, Write và Execute. Nhìn vào cấu trúc `tree` thì nó giống thế này

```
$ tree Permission
Permission
├── Access_Type
│   ├── Execute
│   ├── Read
│   └── Write
└── Ownership
    ├── Group
    ├── Other
    └── User
```

## Permission

- 1 file hay thư mục có:
  + Owner và `rwx` của Owner
  + Group và `rwx` của Group
  + `rwx` của Other

```
# +-------- Có phải là thư mục hay không
# |  +------- read write execute của Owner
# |  |   +------- read write execute của Group
# |  |   |   +----- read write execute của Other
# |  |   |   |   +--- Tên của Owner
# |  |   |   |   |     +--- Owner Group
# |  |   |   |   |     |
# d|rwx|rwx|rwx user group
```

- Để dễ hiểu hơn, hãy xem một số ví dụ sau
```
$ groups user1
admin staff boy
$ groups user2
staff boy
$ groups user3
handsome
$ ls -l Folder
drwx------  2 user1  admin     0 Jan 01 00:01 folder1
-rw-rw----  1 user2  boy       0 Jan 01 00:01 file1
-rw-rw----  1 user3  admin     0 Jan 01 00:01 file2
-rw-rw----  1 user3  staff     0 Jan 01 00:01 file3
-rw-rw---x  1 user1  handsome  0 Jan 01 00:01 file4
```

Trong thư mục `Folder` bao gồm: 1 thư mục tên là folder1 (có gán `d` ở đầu), và 4 file (ở đầu là kí tự `-`)

+ Với `folder1`: Owner là **user1**, Group là **admin**

=> **user1** có quyền `r` `w` `x`, những users trong group **admin** (user1) không có quyền gì cả, others (user2, user3) không có quyền gì cả

+ Với `file1`: Owner là **user2**, Group là **boy**

=> **user2** có quyền `r` `w`, những users trong group **boy** (user1, user2) có quyền `r` `w`, others (user3) không có quyền gì cả

+ Với `file2`: Owner là **user3**, Group là **admin**

=> **user3** có quyền `r` `w`, những users trong group **admin** (user1) có quyền `r` `w`, others (user2) không có quyền gì cả

+ Với `file3`: Owner là **user3**, Group là **staff**

=> **user3** có quyền `r` `w`, những users trong group **staff** (user1, user2) có quyền `r` `w`, others (không có ai) không có quyền gì cả

+ Với `file4`: Owner là **user1**, Group là **handsome**

=> **user1** có quyền `r` `w`, những users trong group **handsome** (user3) có quyền `r` `w`, others (user2) có quyền `x`


## Setting Permissions
Để cài đặt Permission cho file hoặc thư mục, ta dùng `chmod` (change mod).

```
$ chmod +w index.html
```

`+w` có nghĩa là "Được quyền ghi". Chúng ta có thể dùng `+r` `+x` hay `-r` `-x`. Nếu bạn muốn cài đặt Permission một cách chi tiết hơn cho từng nhóm thì có thể sử dụng `u`, `g`, `o`, `a` theo thứ tự cho User (Owner), Group, Other và All, ví dụ:
```
$ ls -l index1.html
-rwxr--r--  1 user1  admin  0 Jan 01 00:01 index1.html

$ #Bỏ quyền r của User
$ chmod u-r index1.html
$ ls -l index1.html
--wxr--r--  1 user1  admin  0 Jan 01 00:01 index1.html

$ #Thêm quyền w cho Other
$ chmod o-r index1.html
$ ls -l index1.html
--wxr--rw-  1 user1  admin  0 Jan 01 00:01 index1.html
```

Nếu như chỉnh cho từng đối tượng thế này mà muốn cài Permission cho cả User, Group và Other thì lại phải thao tác 3 lần hay sao? Rất may là chúng ta không cần làm như vậy. Permission của mỗi đối tượng là số từ 0-7. Tại sao lại là 0-7?

`---` Với mỗi đối tượng có 3 vị trí, mỗi vị trí có 2 lựa chọn (hoặc `-` hoặc 1 trong 3 `r` `w` `x`) nên ta có 2^3 = 8.

Đây là bảng liệt kê Permission tương ứng với các số 

| Số | Permission               |
|----|--------------------------|
| 0  | Chúc bạn may mắn lần sau |
| 1  | Có thể thực thi          |
| 2  | Có thể ghi               |
| 3  | Có thể ghi + thực thi    |
| 4  | Có thể đọc               |
| 5  | Có thể đọc + thực thi   |
| 6  | Có thể đọc + ghi        |
| 7  | Bạn đã trúng giải độc đắc   |

Nào giờ bạn đã hiểu dòng lệnh `chmod 765 file` làm gì chưa? 

765 tương ứng với Permission của User là 7, Group là 6 và Other là 5, nó tương đương với `-rwxrw-r-x`

+ 7: Owner có thể làm tất cả `r` `w` `x`

+ 6: Group có thể đọc và ghi `r` `w`

+ 5: Other có thể đọc và thực thi `r` `x`


> Ghi chú: Nếu bạn muốn thay đổi Permission của file hay thư mục, bạn phải là Owner, Root hoặc sử dụng `sudo`.


## Users and Groups
User và Group được chỉ định trong tất cả các file và thư mục, nếu User được chỉ định vào một file, bạn sẽ có quyền Read, Write hoặc Execute dựa theo Access types được gán. Đó là đối với User, thế còn Group thì sao? Một User có thể thuộc nhiều Group, và một Group có thể có nhiều User. Nếu một User thuộc một Group sẽ có toàn bộ quyền được gắn với Group đó. Như ví dụ dưới đây, toàn bộ Users "chị em" trong Group `girl` đều có quyền đọc file `lam_dep.txt`.

```
-rwxr--r--  1 user1  girl  0 Jan 01 00:01 lam_dep.txt
```

Để xác định một User thuộc Group vào, sử dụng lệnh `groups`:

```
$ groups
staff vip admin handsome
```

Trong ví dụ trên, User thuộc tập Group staff, vip, admin và handsome.


## Root User and Sudo

### Root User
Trong hệ thống Unix and Linux, có một User đặc biệt gọi là `root`, là loại Super User, có thể read, write delete bất kì file nào. Hãy tưởng tượng User này là God (thần thánh), có thể làm bất cứ điều gì trong hệ thống của bạn. 

Bởi vì lý do God có thể làm mọi thứ, nên thông thường không nên sử dụng User Root để login vào hệ thống, chỉ khi nào cần dùng quyền của Root thì mới dùng, đó là Switch sang tài khoản Root bằng cách dùng lệnh `su` (viết tắt của switch user), và bạn phải nhập mật khẩu của Root.

```
$ su - [user_name]
```

> Nếu không chỉ định user_name, thì sẽ đăng nhập account của root. 

Mặc dù root có thể read, write và delete (gần như) tất cả các file, nhưng không có nghĩa nó có thể thực hiện chạy file. Một file chỉ có thể thực hiện khi nó có quyền execute `x`. Trong trường hợp User root, chỉ cần có quyền `x` của User hoặc Group hoặc Other, thì root có thể thực thi được. 

### Sudo
Mặc dù chúng ta có thể switch sang root user, tuy nhiên trong hầu hết trường hợp chúng ta không làm vậy mà dùng `sudo`, nó giống như việc mượn tạm quyền của Root trong một thời gian ngắn. Khi bạn gõ lệnh `sudo`, màn hình sẽ yêu cầu bạn nhập password, nhưng thay vì nhập mật khẩu của root, thì chúng ta nhập của user hiện tại. 

Nhưng tại sao lại dùng `sudo` trong khi có thể dùng `su -`? Có một vài lí do như sau:
- Admin của server muốn bạn có quyền thực thi một số lệnh, nhưng không phải tất cả. Do đó Admin sẽ giới hạn lại những lệnh nào được cho phép thực thi. 
- Vì câu lệnh yêu cầu `sudo`, Admin dễ dàng truy vết khi cần thiết xem user đã làm gì với hệ thống mà yêu cầu quyền của root.
- Dùng `sudo` sẽ yêu cầu nhập mật khẩu lần đầu, và hết hạn trong khoảng 5 phút hoặc lâu hơn. Điều này tăng tính bảo mật cho hệ thống, ngăn ngừa người khác chiếm đoạt quyền điều khiển của bạn.


## Summary
- Permission được gắn với file và thư mục, chứ không phải user và group.
- Access level có 3 loại `r` `w` và `x` dành cho owner, group và other.
- Một file phải có quyền `x` thì mới thực thi được.
- Để thay đổi Permission của một file hay một thư mục, bạn phải đăng nhập vào tài khoản owner hoặc root, hoặc phải sử dụng lệnh `sudo`.


## Reference
https://launchschool.com/books/command_line/read/permissions#overview
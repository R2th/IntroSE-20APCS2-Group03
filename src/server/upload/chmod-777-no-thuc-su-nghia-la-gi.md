Nếu bạn là một người dùng Linux hoặc là một quản trị trang web (có thể host được đặt trên server Linux), chắc hẳn bạn đã gặp phải những tình huống khi xóa hay chỉnh sửa một file nào đó và gặp phải lỗi "You do not have the permissions to modify this file". Và sau một vài tìm kiếm trên Google, bạn nhận được một số đề xuất giải pháp đơn giản như setting file permission thành `"775"` hoặc `"777"`. Vậy chính xác thì `"777"` thực chất có nghĩa là gì? Tại sao lại là `"7"` mà không phải là `"8"` hoặc `"9"`? 

Để hiểu được ý nghĩa của nó, trước tiên chúng ta hãy đi tìm hiểu về `Quyền truy cập file trong Linux`

![](https://images.viblo.asia/ac2fc05e-9f50-4316-8164-b9e65b1b9a5a.jpg)

### Quyền truy cập file trong Linux
Hệ thống Linux đi kèm với một cơ chế kiểm soát file để xác định xem ai có thể truy cập vào một file hoặc folder cụ thể và những hành động họ có thể làm với nó. Có 2 phần trong cơ chế kiểm soát file này, đó là **`Classes`** và **`Permission`**. Trong đó **Classes** xác định xem ai có thể truy cập vào file còn **Permission** xác định loại hành động mà người dùng có thể làm với file đó.

Có 3 loại **Classes** - Owner, Group và Others:
- `Owner`: thường là người tạo ra các files/folders. Trong Linux, những files/folders mà bạn tạo trong thư mục Home của mình sẽ thường thuộc về quyền sở hữu của mình, trừ khi bạn chuyển quyền sở hữu đó sang cho một user khác.
- `Group`: chứa một nhóm người dùng có cùng chung permission
- `Others`: Những người dùng khác trong hệ thống

Còn đối với **Permission**, có 3 loại hành động bạn có thể thực hiện đối với một file/folder. Bạn có thể `read`, `write` hoặc `execute`:
- `Read`: Bạn chỉ có thể xem được file, không thể sửa đổi nội dung của file được. Khi áp dụng với Folder, bạn chỉ có thể xem được các files trong folder đó, không thể xóa hay thêm các file vào folder đó.
- `Write`: Bạn có thể sửa đổi nội dung của một file. Đối với folder, bạn có thể xóa hoặc thêm các files vào folder đó. (Lưu ý rằng: quyền `Write` đối với một folder sẽ cho phép xóa các files trong folder đó ngay cả khi user không có quyền write đối với file đó).
- `Execute`: Được sử dụng chủ yếu khi bạn muốn run một file (thường là một script). Đối với folder, ta có thể sử dụng nó để hạn chế/cho phép thay đổi thư mục hiện tại. Ví dụ như lệnh `cd`.

Khi kết hợp `Classes` với `Permissions`, chúng ta có thể kiểm soát việc những ai có thể truy cập vào file và những hành động họ có thể làm đối với chúng. 

Ví dụ, một `Owner` thường sẽ có tất cả permissions (read, write và execute) để truy cập tới một file. Nếu bạn không phải là owner của file/folder, bạn phải thay đổi `Quyền sở hữu` của file/folder đó thành tên của bạn, hoặc thay đổi permission của Group của bạn hoặc Others thành những permission phù hợp.

### Tìm lời giải mã về con số "777"

Mọi file, folder trong Linux đều chứa 8 bits dữ liệu lưu quyền truy cập. Ở dạng nhị phân cơ bản của nó, nó sẽ là "000", tương đương với việc không có bất cứ quyền truy cập nào. 

- Khi bạn muốn thiết lập quyền `Read`: nó sẽ thêm 4-bit vào dữ liệu, tạo thành "100" (dạng nhị phân) hoặc "4" dạng thập phân.
- Thiết lập quyền `Write` sẽ tương đương với việc thêm 2-bit vào dữ liệu, tạo thành "010" (nhị phân) hoặc "2" dạng thập phân.
- Cuối cùng, thiết lập quyền `Execute` sẽ thêm 1-bit vào dữ liệu, tạo thành "001" hoặc "1" dạng thập phân.
   
Như vậy, nói ngắn gọn lại thì:
  - Read (`r`) tương đương với `'4'`
  - Write (`w`) tương đương với `'2'` - w
  - Execute (`x`) tương đương với `'1'` - x

Khi bạn muốn thiếp lập một permissions đối với file/folder nào đó, bạn chỉ cần cộng thêm số thập phân tương ứng với permission đó là được. Ví dụ, khi bạn muốn thiết lập permission là read và execute, số tương ứng sẽ là 4(r) + 1(x) = `5`. Đối với read, write và execute sẽ là 4(r) + 2(w) + 1(x) = `7`.

Như vậy, các permission sẽ có giá trị từ 0 - 7 (mà không phải 8 hay 9 như thắc mắc phía trên):
- 0 - không có bất cứ quyền truy cập nào
- 1 - execute
- 2 - write
- 3 - write và execute 
- 4 - read
- 5 - read và execute
- 6 - read và write
- 7 - read, write và execute

Ở đây có tận 3 số `777`, và mục đích của nó là:
- Số 7 đầu tiên được dùng để cấp quyền cho `Owner`
- Số 7 thứ 2 để cấp quyền cho `Group`
- Còn số 7 cuối cùng để cấp quyền cho `Others`

Như vậy thì `777` có nghĩa là tất cả users trong hệ thống đều có full permissions: read, write và execute.

Thử kiểm tra quyền truy cập của file `/etc/hosts` xem thế nào nhé, sử dụng lệnh sau đây: 

```
ls -l /etc/hosts
```

ta được kết quả như sau:
```
-rw-r--r-- 1 root root 251 Thg 1 11 14:25 /etc/hosts
```
Ta có:
- owner  = Read và Write (rw-)
- group  = Read (r--)
- others = Read (r--)

### Thiết lập quyền truy cập file
Trong Linux, bạn có thể dễ dàng thay đổi quyền truy cập file/folder bằng câu lệnh Terminal đơn giản: **`chmod`**. Có 2 cách để thay đổi quyền truy cập với `chmod`, đó là sử dụng `Symbolic mode` và `Octal mode`.

#### Octal mode
Sử dụng những numbers như đã phân tích ở phía trên (ví dụ `777`), ta có được cách thay đổi như sau:
```
chmod {number} filename
```
Ví dụ:
```
chmod 644 samplefile
```
có nghĩa là chúng ta mới thiết lập quyền Read và Write cho Owner, quyền Read cho Group và Others đối với file có tên `samplefile`

#### Symbolic mode
Cú pháp của cách này như sau:
```
chmod {options} filename
```
với options được định nghĩa như sau:

| Options | Định nghĩa |
| -------- | -------- | 
|   u   |   Owner  | 
|    g  | Group     | 
|     o |    Other  | 
|     a |    Tất cả (Owner, group và other), tương đương ugo  | 
|    r  | read     | 
|     w |    write  | 
|     x |    execute  | 
|     + |   Thêm permission   | 
|     - |    Loại bỏ permission  | 
|     = |    Gán permission bằng như vậy  | 

Với cách này, chúng ta có thể thêm (+), bớt (-), gán (=) các quyền (r w x) cho từng nhóm (u g o) hoặc cả 3 nhóm (a hoặc ugo).
Ưu điểm của cách này là ta có thể kế thừa lại quyền truy cập trước đó.

Để hiểu hơn về cách này, chúng ta cùng đến với một số ví dụ sau đây:
- Thêm quyền execute cho Owner:
    ```
        chmod u+x file1
    ```
- Thêm quyền write and execute cho Group:
    ```
        chmod g+wx file2
    ```
    
- Xóa quyền execute cho Other:
    ```
        chmod o-x file3
    ```
- Thêm tất cả quyền cho mọi users:
    ```
        chmod a+rwx file4
    ```

### Thay đổi quyền sở hữu file
Như đã nói ở phần trên, chúng ta có thể thay đổi quyền sở hữu một file từ người này sang người khác, sử dụng câu lệnh **`chown`**.

Ví dụ, bạn muốn chuyển `Owner` của file `LinuxPermission` sang user `vuonghung`, cú pháp sẽ như sau:
```
sudo chown vuonghung LinuxPermission
```

Để chuyển `Group` của file `LinuxPermission` sang group `framgia`, cú pháp sẽ như sau:
```
sudo chown :framgia LinuxPermission
```

Để vừa chuyển `Owner` của file `LinuxPermission` sang `vuonghung`, vừa chuyển group sang `framgia`, cú pháp sẽ như sau:

```
sudo chown vuonghung:framgia LinuxPermission
```

### Kết luận
Sau bài viết này, hi vọng bạn đọc sẽ cảm thấy tự tin mỗi khi gặp phải những lỗi về permission trong Linux.
### Tài liệu tham khảo
1. https://www.maketecheasier.com/file-permissions-what-does-chmod-777-means/
2. https://help.ubuntu.com/community/FilePermissions
3. https://blogchiasekienthuc.wordpress.com/2015/10/30/phan-quyen-trong-linux-bai-1-quan-ly-user-group-va-phan-quyen-tren-linux/
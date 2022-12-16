Bài viết này dành cho những người đã có chút kinh nghiệm về command line, đã dùng thử hầu hết các lệnh cơ bản và cảm thấy muốn tiến sâu hơn vào khả năng làm việc với command line. Mình chọn ra sáu lệnh cho bài viết này kèm theo một số tip ở cuối bài nữa.

---

# 1. wget
Trên các hệ điều hành Unix, lệnh **wget** sẽ tải xuống từ mạng các file bằng giao thức HTTP, HTTPS hoặc FTP. Mặc định nó được tích hợp sẵn trong tất cả các bản phân phối Linux.
<br>

Cách sử dụng **wget** cơ bản nhất là cung cấp cho nó vị trí của một file bạn muốn download qua HTTP. Ví dụ, để tải về file `http://website.com/static/images/header.jpg` bằng **wget** bạn sẽ viết dòng lệnh như sau:
```
wget http://website.com/static/images/header.jpg
```

Điều hay của **wget** là nó không cần tương tác. Nghĩa là nó có thể chạy ngầm khi người dùng không đăng nhập.

# 2. scp
Bạn đã bao giờ gặp phải tình huống mà bạn cần lấy một file từ một server remote về máy local? Ví dụ như bạn cần kiểm tra một file có vấn đề được người dùng upload lên server.
<br>

Bạn có thể tải file đó qua command line bằng lệnh **scp**. **scp** là viết tắt của `secure copy`, như vậy tức là quan trọng hơn nữa, không nhưng bạn remote copy mà còn remote secure copy. Lệnh này giống như lệnh cp mà có lẽ bạn đã quá quen thuộc, tuy nhiên với **scp** thì file nguồn hoặc nơi copy tới sẽ ở một hệ thống khác..
<br>

Dòng lệnh sau sẽ copy một file foobar.txt từ một server remote tới một thư mục local.
```
scp username@remotehost.com:/path/to/foobar.txt /some/local/directory
```

Ngược lại, **scp** cũng có thể được dùng để copy một file từ thư mục local lên server remote.
```
scp /some/local/directory/foobar.txt username@remotehost.com:/destination/path/
```

Để copy một thư mục bạn cần sử dụng option `-r` để copy toàn bộ các file và thư mục bên trong nó.

# 3. ssh-keygen
Lệnh **ssh-keygen** được sử dụng để tạo mới một cặp khóa SSH. Khóa SSH pulic được tạo bởi lệnh này có thể được sử dụng trong Github hoặc Gitlab để thiết lập một kết nối an toàn.
<br>

Sau khi bạn đã thêm khóa SSH của mình vào Github hoặc Gitlab, bạn sẽ không bị yêu cầu nhập mật khẩu mỗi khi đẩy file đến một remote branch.
<br>

Để tạo cặp khóa SSH, hãy sử dụng lệnh sau:
```
ssh-keygen -t ed25519
```

Lưu ý rằng ví dụ trên sử dụng thuật toán signing ED25519. Mặc dù ED25519 được coi là best practice, bạn nên nghiên cứu về các thuật toán signing khác.
<br>

Việc tạo cặp khóa SSH và thiết lập trên Github hoặc Gitlab sẽ chỉ mất khoảng hai, ba phút nhưng lợi ịch có được rất tiện lợi!

# 4. chmod
Trong hệ điều hành Unix và các hệ điều hành tương tự Unix, **chmod** là lệnh gọi hệ thống được sử dụng để thay đổi quyền truy cập của các tệp và thư mục.
<br>

Chắc hẳn tất cả chúng ta đều đã gặp phải trường hợp máy chủ không có quyền truy cập vào một tệp nhất định do cấu hình sai trong quyền đối với tệp đó.
<br>

Bản thân lệnh chmod khá đơn giản, nhưng việc cấp quyền phù hợp cho các tệp và thư mục lại phức tạp hơn một chút.
```
chmod 664 robots.txt
chmod 775 public/images
```

Ví dụ đầu tiên cấp quyền đọc và ghi cho người dùng và nhóm đối với tệp robots.txt. Quyền đọc được cấp cho những người khác đối với tệp này.
<br>

Ví dụ thứ hai cấp quyền đọc, ghi và thực thi cho người dùng và nhóm đối với thư mục public/images. Những người khác được cấp quyền đọc và thực thi cho thư mục này.
<br>

Vì sao mình có thể nói được như vậy? Để sử dụng được lệnh **chmod** bạn cần phải hiểu được những con số có thể dùng với lệnh này.
```
$ ls -l findPhoneNumbers.sh
-rwxr-xr--  1 dgerman  staff  823 Dec 16 15:03 findPhoneNumbers.sh
$ stat -c %a findPhoneNumbers.sh
754
```

`r`, `w` và `x` chỉ định quyền đọc (read), ghi (write) và thực thi (execute). Tập lệnh này có thể được người dùng dgerman đọc, ghi và thực thi (`rwx`); có thể đọc và thực thi bởi các thành viên của nhóm `staff` (`r-x`); và chỉ được đọc đối với bất kỳ người dùng nào khác (`r--`).
<br>

Định dạng số chmod chấp nhận tối đa bốn chữ số bát phân. Ba chữ số ngoài cùng bên phải xác định quyền cho user, nhóm và những người khác. Khi có 4 chữ số, chữ số đầu tiền sẽ để chỉ định các flag `setuid`, `setgid` và `sticky`. Mỗi chữ số trong ba chữ số ngoài cùng bên phải đại diện cho một giá trị nhị phân dùng để control các quyền "đọc", "ghi" và "thực thi". Giá trị 1 có nghĩa là một nhóm người dùng nào đó được phép thực hiện hành động đó, trong khi giá trị 0 có nghĩa là nó không được phép. Chi tiết ở bảng sau:

| # |	Permission | rwx | Binary |
| - | - | - | - |
| 7 | read, write and execute | rwx | 111 |
| 6 | read and write | rw- | 110 |
| 5 | read and execute | r-x | 101 |
| 4 | read only | r-- | 100 |
| 3 | write and execute | -wx | 011 |
| 2 | write only | -w- | 010 |
| 1 | execute only | --x | 001 |
| 0 | none | --- | 000 |

# 5. tar
Lệnh **tar** của Linux là viết tắt của `tape archive`. Nó được sử dụng để tổng hợp nhiều tệp thành một tệp lưu trữ. **tar** là lệnh được sử dụng rộng rãi nhất để tạo tệp lưu trữ nén.
<br>

Để tạo tệp lưu trữ cho một thư mục cụ thể bằng lệnh **tar**, bạn làm như sau:
```
tar -cvf my-archive.tar /path/to/directory
```

Kết quả của lệnh này là một tệp lưu trữ tên là `my-archive.tar`, chứa tất cả các tệp của thư mục `/path/to/directory` được tạo ra trong thư mục làm việc hiện tại.
<br>

Tạo tệp lưu trữ là ứng dụng thứ nhất. Ứng dụng thứ hai là việc hủy lưu trữ tệp. Bạn có thể hủy lưu trữ tệp vào một thư mục cụ thể bằng cách nhập lệnh sau:
```
tar -xvf my-archive.tar -C /home/myfolder/
```

# 6. alias
Mọi người thường cần phải sử dụng một số lệnh quá dài hoặc phức tạp và khó có thể nhớ toàn bộ nó. May mắn thay, bạn có thể tạo bí danh cho lệnh đó để không phải nhớ toàn bộ lệnh.
```
alias short-command="your custom and very long command here"
```

Mặc dù việc tạo bí danh theo cách này đi kèm với một vấn đề: Bí danh này chỉ là tạm thời. Nếu bạn tạo bí danh theo cách này, bí danh sẽ chỉ khả dụng cho phiên làm việc terminal hiện tại.
<br>

Để giữ bí danh giữa các phiên, bạn có thể lưu chúng trong tệp hồ sơ cấu hình shell. Tệp hồ sơ này thường được đặt tại `~/.bashrc` hoặc `~/.zshrc` nếu bạn đang sử dụng Bash hoặc ZSH tương ứng.

# 7. một số tip khi dùng command line

### Tip 1: Chuyển hướng output

Dù thiết bị đầu ra tiêu chuẩn là màn hình nhưng đôi khi bạn không muốn xuất mọi thứ trên màn hình của mình. Trong một số trường hợp, bạn có thể thích xuất kết quả của một số lệnh vào một tệp để tạo thành log.
<br>

Để chuyển hướng đầu ra, bạn có thể sử dụng dấu `>`. Trong lệnh sau, đầu ra của `ls -al` được chuyển hướng đến tệp `myfile` thay vì màn hình.
```
ls -al > myfile
```

Mình sử dụng `ls` trong ví dụ trên, nhưng thực tế bạn có thể áp dụng nó với bất kỳ lệnh nào có output. Để xác nhận rằng việc chuyển hướng output đã thành công, bạn có thể kiểm tra tệp myfile.
```
cat myfile
```

### Tip 2: Kết hợp các lệnh

Bạn có thể chạy hai hoặc nhiều lệnh cùng một lúc. Toán tử dấu chấm phẩy `;` cho phép bạn thực hiện điều này. Bạn có thể thực hiện nhiều lệnh liên tiếp, bất kể mỗi lệnh trước đó có thành công hay không.
```
ls -al; pwd;
```

Nếu bạn muốn lệnh thứ hai chỉ chạy nếu lệnh đầu tiên thành công, hãy tách các lệnh bằng toán tử `&&`.
```
mkdir images && cd images
```

Và đôi khi bạn có thể chỉ muốn thực hiện lệnh thứ hai nếu lệnh đầu tiên không thành công. Để làm được điều này hãy sử dụng toán tử `||`.

---
*source: https://medium.com/better-programming/advanced-cli-commands-you-should-know-as-a-developer-7bc48c752a5e*
Chào mừng các bạn đã trở lại với series hay nói đúng hơn là cheatsheet về các câu lệnh Linux mình tổng hợp lại sau quá trình tự học. Như đã giới thiệu ở phần trước thì nội dung bài viết nằm trong cuốn [The Linux Command Line: A Complete Introduction - William E. Shotts Jr.](https://www.amazon.com/Linux-Command-Line-Complete-Introduction/dp/1593273894), nên bạn nào muốn tìm hiểu sâu hơn, có lời giải thích kỹ hơn thì hãy tìm đọc theo cuốn sách đó.

Ở phần trước chúng ta đã cùng nhau tìm hiểu về hai phần khá thú vị trong việc sử dụng command nhanh và hiệu quả bằng cách ứng dụng shell expansion và cách sử dụng các thao tác editing dòng lệnh mà ít phải phụ thuộc vào chuột. Hôm nay chúng ta sẽ đi sâu hơn vào hệ điều hành Linux với một chủ đề quan trọng trong bảo mật hệ thống đó là Permission, trong phần ngày hôm nay chúng ta sẽ điểm qua những câu lệnh sau đây:

```
- id
- chmod
- umask
- su
- sudo 
- chown
- passwd
```

### Owner, group members và "những người khác"

Ở [phần 1](https://viblo.asia/p/cac-cau-lenh-linux-6J3Zgm0W5mB) trong series này, chúng ta đã biết về lệnh `file` để đọc định dạng của `file`, giờ chúng ta sẽ sử dụng nó để đọc file `/etc/shadow`:

```
➜  ~ file /etc/shadow 
/etc/shadow: regular file, no read permission
➜  ~ less /etc/shadow 
/etc/shadow: Permission denied
```

Lí do chúng ta không thể đọc được thông tin của file cũng như nội dung file là bởi chúng ta ko có quyền truy cập vào file đó. Trong mô hình bảo mật của Unix, một user có thể sở hữu file và directory (owner), khi đó user đó có thể quản lý quyền access đối với file và directory đó.
User cũng có thể thuộc về một group nào đó gồm nhiều user khác và được owner cho quyền truy cập vào một file hoặc directory.
Một file cũng có thể được truy cập bởi bất cứ người nào ngoài owner và group members kể trên, trong thuật ngữ của Unix những user đó được coi là *'the world'*

Như vậy là đã xong phần giới thiệu, chúng ta sẽ đi vào câu lệnh đầu tiên, để xác định danh tính của user hiện tại, chúng ta có thể dùng lệnh `id`:

```
➜  ~ id
uid=1000(hunguyen) gid=1000(hunguyen) groups=1000(hunguyen),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),113(lpadmin),128(sambashare)
```

Hãy nhìn vào output của câu lệnh, có 3 phần:

- uid: là user ID của người dùng, map với username của người dùng hiện tại
- primary group (gid): id và tên group chính của user đó.
- groups: user có thể thuộc về nhiều group khác, phần này liệt kê danh sách group và gid của chúng

Thông tin này được lấy từ một số file trong hệ thống, thông tin account được ghi trong file `/etc/passwd` và group được ghi trong file `/etc/group`. Mỗi khi có một user và group được tạo ra thì những file này được chỉnh sửa cùng với file `/etc/shadow` là file chứa thông tin về password người dùng.

Đối với mỗi user account thì `/etc/password` định nghĩa user login account, uid, gid, tên thật của người dùng, home directory, login shell. Trong Linux thường mỗi user tạo ra sẽ được gán vào single-member group có cùng tên với username, điều này cho phép một vài loại permission được gán dễ dàng hơn.

### Quyền đọc, ghi và thực thi

Có ba loại quyền cơ bản của bất kì một file nào đó là đọc (read), ghi (write) và thực thi (execute). Như đã giới thiệu ở [phần 1](https://viblo.asia/p/cac-cau-lenh-linux-6J3Zgm0W5mB), thì trong output dạng long format của lệnh `ls` có phần đầu tiên là phần quyền truy cập của file hay cũng có thể gọi là file attributes, gồm 10 kí tự. Bây giờ chúng ta sẽ đi sâu hơn vào phần output này để hiểu được ý nghĩa của nó nhé.

- Ký tự đầu tiên là file type

| Attribute | File type |
| -------- | -------- | 
| `-`     |  file thường    | 
| `d`     |  directory    | 
| `l`     |  symbolic link (với loại này 9 ký tự tiếp theo là dummy value, file attribute thật sự nằm ở file mà link này trỏ tới)  | 
| `c`     | characters file ám chỉ một device xử lý data theo luồng bytes, ví dụ như modem   | 
| `b`     |  block file ám chỉ những thiết bị xử lý data theo block như là ổ đĩa, hard drive  | 

- Chín ký tự còn lại được gọi file mode, lần lượt biểu thị quyển truy cập vào file của file owner, group owner và các user khác, kí tự `-` ở vị trí nào biểu thị đối tượng ko có quyền đó với file hiện tại.



| Attribute | Files | Directories |
| -------- | -------- | -------- |
| `r`     | Cho phép mở file và đọc     | cho phép list content của directory nếu thuộc tính `x` (execute) cũng được set     |
| `w` | Cho phép ghi vào file hoặc xóa nội dung file, không cho phép xóa hoặc rename.  | Cho phép xóa, tạo, đổi tên file nếu thuộc tính `x` cũng được set|
| `x` | Cho phép file được coi như một chương trình có thể thực thi được. Những file được viết bằng scripting language cũng cần có quyền đọc `r` để có thể thực thi được | Cho phép truy cập directory |

### Thay đổi quyền truy cập

Để thay đổi quyền truy cập (file mode) vào một file hoặc directory, chúng ta sử dụng lệnh `chmod`. 

Lưu ý là chỉ có file owner hoặc superuser mới có thể thay đổi file mode của file hoặc directory,

`chmod` hỗ trợ 2 cách để định nghĩa mode cho một file: set file mode theo hệ cơ số 8 (octal) hoặc thông qua kí hiệu.

#### Cách set file mode bằng hệ cơ số 8

Chúng ta sử dụng hệ cơ số 8 với các con số để set pattern cho quyền mà chúng ta mong muốn. Ở đây chúng ta sẽ dùng 3 số hệ cơ số 8, với mỗi chữ số là quyền đọc, ghi, thực thi của một loại user. Mỗi chữ số này khi được biểu diễn dưới dạng 3 chữ số nhị phân sẽ map đúng với 3 quyền truy cập file của mỗi loại user. 

| Cơ số 8 | Cơ số 2 | File mode |
| -------- | -------- | -------- |
| `0` | `000` | `---` |
| `2` | `010` | `-w-` |
| `3` | `011` | `-wx` |
| `4` | `100` | `r--` |
| `5` | `101` | `r-x` |
| `6` | `110` | `rw-` |
| `7` | `111` | `rwx` |

Như vậy bằng cách sử dụng 3 chữ số octal chúng ta có thể set quyền truy cập vào một file một cách dễ dàng, cá nhân mình thấy cách này đơn giản và dễ nhớ hơn so với cách sử dụng kí hiệu. Ví dụ: 

```
➜  /tmp vim foo.txt 
➜  /tmp ls -l foo.txt 
-rw-rw-r-- 1 hunguyen hunguyen 20 Th07 21 10:05 foo.txt
➜  /tmp chmod 600 foo.txt 
➜  /tmp ls -l foo.txt
-rw------- 1 hunguyen hunguyen 20 Th07 21 10:05 foo.txt
```

Trong ví dụ trên, khi mới tạo file `foo.txt` có quyền mặc định là `664` ~ owner, owner's group có quyền đọc ghi, còn lại có quyền đọc (tham chiếu bảng trên).

Chúng ta đã sử dụng `chmod` để thay đổi quyền truy cập (file mode) thành `600` ~ chỉ có owner có quyền đọc ghi, còn lại không được thao tác trên file này.

#### Cách set file mode bằng ký hiệu

Trong cách này, ký hiệu dùng để set file mode được chia thành 3 phần: ký hiệu áp dụng cho đối tượng nào, ký hiệu operation được thực hiện, và ký hiệu permission nào được set.

- Ký hiệu cho đối tượng

| Ký hiệu | Ý nghĩa |
| -------- | -------- | 
| `u` | file hoặc directory owner |
| `g`| group owner |
| `o` | the world |
| `a` | tất cả đối tượng |

- Ký hiệu operation: `+` là permisssion được add thêm vào, `-` là permission bị lấy đi, `=` có nghĩa là thay thế toàn bộ quyền hiện tại bằng quyền mới này
- Ký hiệu quyền chính là ba ký hiệu `rwx` chúng ta đã biết

Ví dụ ta muốn set lại quyền đọc ghi cho group ở trong ví dụ trên, ta có dùng lệnh sau:

```
➜  /tmp chmod g+rw foo.txt 
➜  /tmp ls -l foo.txt 
-rw-rw---- 1 hunguyen hunguyen 20 Th07 21 10:05 foo.txt
```

#### `umask`

Để set quyền mặc định cho bất kỳ file nào được tạo, ta sử dụng lệnh `umask [file_mode]`, để xem `umask` hiện tại, sử dụng câu lệnh mà không truyền vào tham số nào.

```
➜  /tmp umask
002
```

Ta có thể thấy `umask` hiện tại đang là `002`. Tuy nhiên đây không phải quyền mặc định của nó, để tìm được quyền mặc định chúng ta cần XOR `umask` hiện tại với quyền mặc định hay còn gọi là original file mode - `666`

|||
| -------- | -------- | 
| Original file mode | `rw- rw- rw-`|
| Mask               | `000 000 010` |
| Result             | `rw- rw- r--` |

Ví dụ ta có thể thấy file mới sau được tạo ra có quyền mặc định đúng với kết quả bên trên.

```
➜  /tmp echo "hello" > bar.txt
➜  /tmp ls -l bar.txt
-rw-rw-r-- 1 hunguyen hunguyen 6 Th07 21 11:01 bar.txt
```

Khi chúng ta muốn đổi quyền mặc định, ta phải thay đổi `umask` sao cho sau khi giá trị `umask` mới XOR với quyền mặc định sẽ ra quyền mặc định mong muốn của chúng ta.

Ví dụ sau đây ta set quyền mặc định là, đọc ghi với file owner nhưng ko có quyền gì với hai loại user còn lại:

```
➜  /tmp umask 066
➜  /tmp echo "hello" > bas.txt
➜  /tmp ls -l bas.txt 
-rw------- 1 hunguyen hunguyen 6 Th07 21 11:09 bas.txt
```

Các bạn hãy dùng thử phép XOR với quyền mặc đinh - `666` để kiểm tra lại kết quả nhé.

**Ví dụ ở phần này chỉ muốn giới thiệu cho các bạn về lệnh `umask`. Chúng ta nên set lại về giá trị hiện tại trước khi tiếp tục phần tiếp theo, vì giá trị này sử dụng chung cho toàn bộ file trong hệ thống, nếu không đổi về giá trị ban đầu rất dễ có thể gây lỗi ở bất cứ đâu**

```
➜  /tmp rm bas.txt; umask 002; umask
002
```

### Thay đổi định danh

Để sử dụng terminal hiện tại bằng một user khác, chúng ta sử dụng lệnh `su`

```
➜  /tmp su hungexample
Password: 
hungexample@hunguyen-MS-7B49:/tmp$
```

Nếu không có tên account của user truyền vào câu lệnh sẽ hiểu là truyền sang quyền root.

để load cả user environment của user `hungexample` chúng ta cần thêm option `-l`, khi đó working directory cũng chuyển sang home của user `hungexample`

```
hungexample@hunguyen-MS-7B49:/tmp$ exit
➜  /tmp su -l hungexample
Password: 
hungexample@hunguyen-MS-7B49:~$
```

sử dụng lệnh `su` cũng có thể chạy một command dưới quyền của user `hungexample`

```
➜  /tmp ls ~  
anaconda3        Downloads                  opt              setups
bin              elasticsearch-5.5.3        Pictures         snap
books            examples.desktop           projects         Templates
Calibre Library  kibana-5.5.3-linux-x86_64  Public           Videos
Desktop          Music                      PycharmProjects  VirtualBox VMs
Documents        neotiq_docs                redis-stable     vmware
➜  /tmp su -c 'ls ~' hungexample
Password: 
examples.desktop
➜  /tmp 
```

Ngoài lệnh `su` còn có lệnh `sudo` thần thánh mà chúng ta vẫn thường hay sử dụng. Ý nghĩa của lệnh này là cho phép user thường sử dụng/execute những câu lệnh dưới quyền của user khác và thường là superuser. 

Điểm khác biệt với `su` là chúng ta phải cung cấp password của user đích, nhưng với `sudo` chúng ta chỉ cần cung cấp password của user hiện tại, nếu user hiện tại được configure có thể chạy câu lệnh hiện tại với quyền `sudo` thì câu lệnh sẽ được thực thi.

Để configure quyền, user và câu lệnh được chạy của `sudo` chúng ta có thể tham khảo bài viết [này](https://www.howtogeek.com/116757/8-ways-to-tweak-and-configure-sudo-on-ubuntu/)

Sử dụng `sudo -l` để có thể xem được quyền `sudo` của user hiện tại.

### Thay đổi file's owner

Sử dụng lệnh `chown` để thay đổi file owner và group owner của file. Ví dụ:

```
➜  /tmp ls -l foo.txt 
-rw-rw---- 1 hunguyen hunguyen 20 Th07 21 10:05 foo.txt
➜  /tmp sudo chown hungexample foo.txt
➜  /tmp ls -l foo.txt 
-rw-rw---- 1 hungexample hunguyen 20 Th07 21 10:05 foo.txt
```

Cú pháp: 

`chown new_owner:new_owner_group file_name`

| Tham số | Kết quả |
| -------- | -------- |
| new_user | Đổi file owner thành new_user |
| new_user:new_group | Đổi file owner thành new_user và group owner thành new_group |
| new_user: | Đổi file owner và group owner thành new_user |
| :new_group |  Chỉ đổi group owner thành new_group, file owner giữ nguyên |

#### Đổi password

Chắc hẳn ai đổi password máy cũng đã từng chạy qua lệnh này rồi đó chính là lệnh `passwd`. Khi chạy lệnh, hệ thống sẽ hỏi pass cũ và yêu cầu chúng ta cung cấp pass mới phù hợp với policy của hệ thống.

-----

Như vậy ở bài viết này chúng ta đã biết thêm được về hệ thống phân quyền, cũng như cách set quyền cho file và directory, thay đổi quyền owner. Ở bài viết tiếp theo chúng ta sẽ cùng nhau tìm hiểu về Process trong Linux và các câu lệnh liên quan nhé.

Còn ở phần này chúng ta có thể tìm hiểu thêm về các lệnh:

- `adduser`
- `groupadd`
- `useradd`

bằng cách check `manpage` của các lệnh này nhé, cũng là một cách để ôn tập [phần 2](https://viblo.asia/p/cac-cau-lenh-linux-phan-2-lam-viec-voi-lenh-redirection-3Q75wXQMKWb) của series này, đừng dùng google vội mà hãy ôn tập nhé. :+1:

-----

Sắp tới những bài viết của mình sắp tới sẽ được cập nhật thường xuyên trên blog cá nhân [chiase.tech](https://chiase.tech). Series câu lệnh Linux sẽ được mình update những nội dung mới hơn tại [đây](https://chiase.tech/chu-de/linux/). Mong các bạn giành thời gian ủng hộ và góp ý nhé 😁

Tham khảo: 
- https://chiase.tech/cac-cau-lenh-linux-co-ban-phan-5-permission-trong-linux/
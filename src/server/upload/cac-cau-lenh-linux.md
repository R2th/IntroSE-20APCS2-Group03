Dạo gần đây mình có ngồi đọc lại quyển [The Linux Command Line: A Complete Introduction - William E. Shotts Jr.](https://www.amazon.com/Linux-Command-Line-Complete-Introduction/dp/1593273894) để học lại một số câu lệnh linux, hướng đến một tương lai ít sờ vào chuột hơn, nhưng mà nhận thấy là việc mình không thực hành và không ghi lại thì có thể sẽ khiến mình dễ quên các câu lệnh này, các keyboard tips này. Nên nhân đây mình quyết định làm một series tổng hợp lại hết tất cả các câu lệnh mình đã đọc được trong quyển trên thành một series và gần như là một cheat sheet cho mình sau này. Lưu ý là mình chỉ tổng hợp lại các câu lệnh, mình sẽ không giải thích cụ thể như ở trong cuốn sách (chủ yếu là cho những người mới tiếp cận), nên nếu bạn nào muốn hiểu kỹ hơn thì có thể tham khảo ở link mình đã để ở trên

### Một số câu lệnh cơ bản

```
# câu lệnh in ra ngày tháng năm hiện tại
date
# Output
Thứ ba, 19 Tháng ba năm 2019 13:26:09 +07

# câu lệnh in ra lịch của tháng hiện tại
cal
# Output
   Tháng ba 2019      
CN T2 T3 T4 T5 T6 T7  
                1  2  
 3  4  5  6  7  8  9  
10 11 12 13 14 15 16  
17 18 19 20 21 22 23  
24 25 26 27 28 29 30  
31                    

# in ra lịch của tháng và năm cụ thể
cal 2 2019
# Output
   Tháng hai 2019     
CN T2 T3 T4 T5 T6 T7  
                1  2  
 3  4  5  6  7  8  9  
10 11 12 13 14 15 16  
17 18 19 20 21 22 23  
24 25 26 27 28        

# kiểm tra dung lượng trống còn lại trên ổ đĩa, option -h sẽ in dung lượng dưới dạng số và đơn vị
df -h
# Output
Filesystem      Size  Used Avail Use% Mounted on
udev            3,8G     0  3,8G   0% /dev
tmpfs           784M  9,4M  775M   2% /run
/dev/sda1       222G   67G  144G  32% /
...
...
tmpfs           784M  664K  784M   1% /run/user/33558631

# kiểm tra bộ nhớ trống, option -h cũng tương tự
free -h
# Output
              total        used        free      shared  buff/cache   available
Mem:           7,7G        5,0G        181M        563M        2,4G        1,7G
Swap:          7,9G        1,5G        6,4G
```

### Navigation

```
# hiển thị directory hiện tại
pwd
# Output
/home/nguyen.viet.hung

# liệt kê content của một directory
ls
Desktop  Documents  Downloads  Music  Pictures

# chuyển vị trí directory hiện tại có thể sử dụng đường dẫn tuyệt đối, tương đối
cd [absolute_path|relative_path]

# chuyển đến vị trí directory ngay trước vị trí hiện tại `n` lần (chỉ để - sẽ là vị trí ngay trước đó)
cd -[n]
# Example
➜  ~ cd /etc/nginx
➜  nginx pwd
/etc/nginx
➜  nginx cd -         
~
➜  ~ pwd
/home/nguyen.viet.hung

# Chuyển đến home directory của một user bất kỳ
cd ~[user_name]
```

### Các câu lệnh cơ bản với file

`ls` là một câu lệnh hay được sử dụng trong mọi hoàn cảnh, kết hợp chúng với một vài option sẽ cho chúng ta get insight về cấu trúc của một cây chỉ mục (mặc dù mình thích làm điều này với  `tree` hơn, tuy nhiên nó lại không phải là một builtin ở trong shell)

Ở phần này hãy cùng khám phá thêm một vài option để sử dụng cùng với `ls` và một số câu lệnh khác để khám phá một hệ thống thư mục là chúng ta chưa động tới bao giờ nhé

```
# ls có thể liệt kê cho nhiều thư mục cùng một lúc. Ví dụ:
➜  ~ ls ~ /etc/nginx/sites-available 
/etc/nginx/sites-available:
default

/home/nguyen.viet.hung:
anaconda3  Desktop  Documents  Downloads

# Chúng ta cũng có thể thay đổi format của output để nhìn thấy nhiều thông tin hơn:
total 92
drwxr-xr-x  3 FRAMGIA\nguyen.viet.hung FRAMGIA\domain^users  4096 Th02 11 16:45 Desktop
drwxr-xr-x  2 FRAMGIA\nguyen.viet.hung FRAMGIA\domain^users  4096 Th01 16 17:27 Documents
drwxr-xr-x  3 FRAMGIA\nguyen.viet.hung FRAMGIA\domain^users  4096 Th03 14 09:08 Downloads
drwxr-xr-x  2 FRAMGIA\nguyen.viet.hung FRAMGIA\domain^users  4096 Th07  2  2018 Music
drwxr-xr-x  4 FRAMGIA\nguyen.viet.hung FRAMGIA\domain^users 20480 Th03 19 11:22 Pictures
drwxr-xr-x  2 FRAMGIA\nguyen.viet.hung FRAMGIA\domain^users  4096 Th07  2  2018 Public
drwxr-xr-x  2 FRAMGIA\nguyen.viet.hung FRAMGIA\domain^users  4096 Th07  2  2018 Templates
drwxr-xr-x  2 FRAMGIA\nguyen.viet.hung FRAMGIA\domain^users  4096 Th03 19 10:43 Videos
```

Một vài option khác có thể thử với `ls`:

| Options | Long options | Mô tả |
| -------- | -------- | -------- |
| `-a`     | `--all`     | liệt kê tất cả kể cả hidden file |
| `-A`     | `--almost-all`     |  liệt kê tất cả trừ `.` và `..`    |
| `-d`     | `--directory`     |  khi dùng `ls` với một folder thì nó sẽ liệt kê content của folder đó, sử dụng option này kết hợp với `-l` sẽ chỉ đưa ra thông tin về bản thân directory đó    |
| `-F`     | `--classify`     |  nếu content là directory thì sẽ được thêm `/` để biết nó không phải là file  |
| `-h`     | `--human-readable`     |  khả dụng với khá nhiều câu lệnh, hiển thị file size ở dạng người đọc được chứ không phải dạng bytes    |
| `-l`     |      |  Liệt kê chi tiết    |
| `-S`     |      |   Sắp xếp theo file size   |
|-t|| Sắp xếp theo thời gian chỉnh sửa cuối cùng|

#### Hiểu chi tiết về dạng `long format`

Bảng sau liệt kê example output của một câu lệnh `ls -l` và giải thích từng cột và ý nghĩa của output



| Field | Ý nghĩa |
| -------- | -------- |
|   ` -rw-r--r--`  | Quyền truy cập của file. Ký tự đầu tiên quy định loại file. `-` nghĩa là file thường. `d` nghĩa là directory.  `l` nghĩa là link. Các cụm 3 ký tự tiếp sau lần lượt là quyền truy cập của file owner, group owner và những người còn lại|
| 2 | số hard link trỏ đến file này |
|FRAMGIA\nguyen.viet.hung| file owner |
|FRAMGIA\domain^users| group owner - user group của file owner |
| 4096 | file size dưới dạng bytes |
| Th03 19 10:43 | Ngày thay đổi file cuối cùng |
|Videos |tên của thư mục hoặc file |

#### Xác định định dạng của file

Đối với những ai chưa biết, hay thậm chí đã biết rồi, thì chúng ta cũng nên nhắc lại rằng trong Linux thì tất cả đều được coi như là file, và file name thường không phản ánh định dạng chứa trong file, vì vậy hay có trường hợp tên file một kiểu, mà định dạng trong file một kiểu gây nhầm lẫn. Ta có thể xác định định dạng của file bằng câu lệnh:

```
file [file_name]
# Example
file name app/controllers/application_controller.rb 
app/controllers/application_controller.rb: Ruby module source, ASCII text
```

Ngoài ra có một câu lệnh view content của file cũng rất hay sử dụng đối với text file đó là `less` (chúng ta sẽ tìm hiểu về một text editor hay hơn và tuyệt hơn đó là `vim` - thực ra không phải là tìm hiểu mà là vọc thêm vì chắc ai cũng biết đến nó rồi)

#### Symbolic links là gì?

Khi liệt kê content của folder với `ls` ta có thể bắt gặp một dòng

```
lrwxrwxrwx 1 root root 11 2007-08-11 07:34 libc.so.6 -> libc-2.6.so
```

Ký tự đầu tiên `l` chỉ ra đây là một symbolic links. Vậy thế nào là một link và thế nào là một symbolic links. Ở đây tôi sẽ chỉ giải thích ngắn gọn, vì series hay bài viết này tôi chỉ định làm như một cheat sheet.

Về cách hoạt động thì link như thể là một shortcut trên window vậy, khi bạn tạo ra một link tới một file nào đó, link đó có thể có một cái tên khác nhưng khi chỉnh sửa nội dung của link thì nội dung của file cũng tự động chỉnh sửa theo.

Có hai loại link: symbolic link và hard link

**Hard link:**

+ Chỉ tạo được trên file, không tạo được trên directory
+ Không thể tạo được hard link trên một file nằm khác partition với partition đặt link đó.
+ Không thể phân biệt hard link với file khi dùng `ls`
+ Khi xóa hard link thì link bị xóa, nhưng content của link thì vẫn được giữ nguyên dẫn đến không gian nhớ không được xác định

Vì thế các hệ thống mới bây giờ thường ít khi sử dụng hard link

**Symbolic link:**

+ Tạo được link trên cả file và directory
+ Không giới hạn việc đặt link ở đâu trên ổ đĩa
+ Symlink đơn giản chỉ là con trỏ tới file thực.
+ Khi xóa symlink thì toàn bộ link lẫn content của link đều được xóa.
+ Có thể phân biệt được link dễ dàng nhờ ký tự `l` khi dùng `ls` ở long format.

###  Các lệnh thao tác trên file và directory

#### Wildcards

Như những ai đã quen với Linux thì, hệ thống command cung cấp một tập các ký tự đặc biệt để định nghĩa filenames group. Những ký tự đặc biệt này được gọi là wildcards. Sử dụng chúng có thể select những filename dựa trên một tập các pattern. Bảng sau sẽ định nghĩa các wildcards trong Linux:

| Wildcard | Ý nghĩa |
| -------- | -------- |
| `*`     | match bất kỳ ký tự nào     |
| `?`     | match 1 ký tự bất kỳ     |
|`[characters]`|match ký tự nào có trong set|
|`[!characters]`| không match ký tự nào có trong set|
|`[[:class:]]`|match ký tự định nghĩa bởi class|

Bảng dưới đây định nghĩa các class thường được dùng trong wild card cuối cùng

| Pattern | Ý nghĩa |
| -------- | -------- |
|:alnum:|Ký tự chữ và chữ số|
|:alpha:|Ký tự chữ cái|
|:digit:|Ký tự chữ số|
|:lower:|Bất kỳ chữ cái thường nào|
|:upper:|Bất kỳ chữ cái hoa nào|

#### Các câu lệnh

##### Tạo directories

```
# Tạo một hoặc nhiều directory
mkdir [path] [path_1] [path_2] [path_3] ...
# Tạo một directory và tạo parrent directory nếu không tồn tại
mkdir -p [path]
```

##### Copy files

```
# copy một file thành một file khác
cp {file_1} {file_2}
# copy một hay nhiều file vào một directory
cp {file_1}..{file_n} directory/
```

Các options:

| Options | Ý nghĩa |
| -------- | -------- |
|`-a, --archive`|Copy file và tất cả các thuộc tính, permission, ownership của nó sang file mới|
|`-i, --interative`|hỏi người dùng có muốn thực hiện thao tác không trước khi copy, thông thường nếu tên file giống nhau, hệ thống sẽ tự ghi đè file cũ mà không hỏi han gì|
|`-r, --recursive`|Khi copy directory nó sẽ copy cả content của dir đó, required khi copy directory|
|`-u, --update`|Chỉ copy những file chưa tồn tại hoặc có thời gian chỉnh sửa cuối mới hơn|
|`-v, --verbose`|Hiển thị thông tin khi quá trình copy diễn ra|


##### Move và rename files

```
# rename file
mv file1 file2
# mv một hoặc nhiều item và một directory khác
mv item1 item2 directory/
```

Các options tương tự như `cp` chỉ không có option `-a`.

##### Remove

```
rm item
```

Các option giống với option của `mv` và thêm một option: `-f, --force` (ignore file không tồn tại và file đang mở mà vẫn thực hiện xóa hết file).

##### Tạo link

```
# Tạo hard link
ln file link
# Tạo symbolic link
ln -s item link
```

*Tôi thường tạo alias cho câu lệnh `rm` thành `rm -i` vì đôi khi chạy sai chỉ một câu nhỏ trên server thôi cũng khiến chúng ta trả giá đắt. VD như
`rm * .html` chẳng hạn*



-----


Hiện tại những bài viết của mình sắp tới sẽ được cập nhật thường xuyên trên blog cá nhân [chiase.tech](https://chiase.tech). Series câu lệnh Linux sẽ được mình update những nội dung mới hơn tại [đây](https://chiase.tech/chu-de/linux/). Mong các bạn giành thời gian ủng hộ và góp ý nhé 😁
Như chúng ta đã biết, những thông tin shell lưu trữ để chạy một shell session gọi là `environment`. Khi mà phần lớn các chương trình hiện nay đã sử dụng file config lưu giữ settings, thì một số vẫn sử dụng environment để giúp chương trình hoạt động. Nhờ đó chúng ta có thể sử dùng environment để tùy biến trải nghiệm sử dụng shell, hoặc để lưu giữ thông tin giúp chương trình hoạt động.

Trong phần này, chúng ta sẽ tìm hiểu về một số lệnh:

```
- printenv
- set
- export
- alias
```

### Cái được lưu trữ trong environment?

Shell lưu trữ 2 loại thông tin trong environment, đó là:

- Biến của shell (shell variables): là thông tin lưu được thiết lập bởi `bash`
- Biến môi trường (environment variables): đơn giản là tất cả những biến còn lại.

Thêm vào đó, shell cũng có thể lưu trữ những dữ liệu được lập trình như là `aliases` và `function`

Để nhìn được những biến được setting trong environment, chúng ta có thể sử dụng hoặc lệnh `set` buitin của bash hoặc lệnh `printenv`.

Lệnh `set` sẽ in ra terminal cả biến shell và biến môi trường, còn lệnh `printenv` chỉ in ra biến môi trường. Chúng ta nên pipe output của 2 lệnh này vào `less` để có thể tìm được biến ta muốn.

Nếu chúng ta muốn in ra một biến cụ thể, chúng ta có thể dùng `printenv` kết hợp tên biến hoặc dùng `echo $(tên_biến)` 

```
➜  ~ printenv USER 
hunguyen
➜  ~ echo $USER    
hunguyen
```

Có một loại thành phần của biến môi trường là aliases có thể view được bằng lệnh `alias`:

```
➜  ~ alias
-='cd -'
...=../..
....=../../..
.....=../../../..
......=../../../../..
1='cd -'
2='cd -2'
...
```

### Biến môi trường được thiết lập như thế nào?

Khi chúng ta đăng nhập vào hệ thống, `bash` sẽ được khởi chạy và nó sẽ đọc một loạt các script cấu hình gọi là *startup files*, định nghĩa *default environment* dùng chung bởi tất cả các user. 

Tiếp theo `bash` tiếp tục đọc các *startup files* tại home directory của chúng ta định nghĩa *personal environment*. 

Thứ tự thực thi trên còn phụ thuộc vào loại của phiên session được khởi chạy. Có 2 loại:

- Login shell session: là khi chúng ta được hỏi username và password, khi chúng ta mở virtual console session (`Ctrl + Alt + F1-6`).
- Non-login shell session: là khi chúng ta mở cửa sổ terminal để shell session mới trong GUI.

Login shell session sẽ đọc các file sau:

- `/etc/profile`: là global config script áp dụng cho tất cả các users.
- `~/.bash_profile`: là một personnal startup files, được sử dụng để thêm mới settings, hoặc overwrite lại setting trong file global config script.
- `~/.bash_login`, `~/.profile`: nếu file `~/.bash_profile` không được tìm thấy thì mặc định `bash` sẽ đọc một trong hai file này. Đây là quá trình mặc định với các phiên bản Debian.

Non-login shell sẽ đoc file sau:

- `/etc/bash.bashrc`: global config script.
- `~/.bashrc`: Personal startup file.
- Thêm vào đó, non-login shell thường được kế thừa những biến từ session cha, thường là login shell session.

Trong file startup, điều chúng ta cần lưu ý nhất là biến `PATH`. Đây là list các directory mà khi chúng ta thực thi một chương trình nào trong một shell session, nó sẽ không tìm toàn bộ máy tính để tìm kiếm full path của chương trình mà tìm trong chính biến `PATH`. `PATH` thường được thiết đặt như sau trong personal startup file:

```
PATH=$PATH:$HOME/bin
```

Thường khi chúng ta cài đặt một chương trình chúng ta muốn chương trình đó có thể chạy ở tất cả mọi nơi mà không phải vào trực tiếp vào nơi cài đặt chương trình. Chúng ta có thể thêm fullpath nơi chương trình được cài đặt vào `PATH` (đối với các chương trình mới hiện nay thì bộ cài đặt thường đã tự làm điều này cho chúng ta rồi). Có hai cách để làm điều này:

- Một là thay đổi trực tiếp biến `PATH` bằng lệnh `export`: lệnh này cho phép biến `PATH` mới này được overwrite lại ở session hiện tại và các session con của nó, nhưng nó sẽ không lưu lại sau khi chúng ta kết thúc session hoặc khởi động lại máy.

```
➜  ~ export PATH=$PATH:$HOME/new_program_directory
```

- Cách thứ hai là chỉnh sửa trực tiếp trong startup file. Tuy nhiên, chúng ta phải khởi động một session mới để thay đổi có tác dụng, vì file startup chỉ được đọc khi chúng ta chạy lại một session mới. Chúng ta có thể dùng lệnh `source` để `bash` đọc lại file này bằng cách:

```
➜  ~ source .bash_profile
```

### Tìm hiểu về `vim`

`vim` là phiên bản mở rộng của `vi`, một text editor và là một trong những chương trình core của hệ thống Unix. `vim` rất nhẹ và nhanh, khi thao tác trên server với `ssh` chẳng hạn, chúng ta thường rất khó có thể sử dụng những text editor có giao diện GUI.
Còn một text editor khác là `nano` nhưng mình không prefer nó lắm vì `vim` cung cấp nhiều tính năng tuyệt vời hơn. Thao tác trên `vim` sẽ hơi khó với những người mới làm quen với nó, nhưng khi đã sử dụng nhiều ta sẽ thấy việc dùng `vim` là nhanh hơn nhiều so với `nano`.

Để khởi động `vim`, đơn giản chúng ta chỉ cần gõ lệnh `vim`:\

```
➜  ~ vim 
```

```
~                                                                                             
~                                                                                             
~                                                                                             
~                                                                                             
~                                                                                             
~                                                                                             
~                                                                                             
~                                                                                             
~                                                                                             
~                                                                                             
~                                                                                             
~                                     VIM - Vi IMproved                                       
~                                                                                             
~                                      version 7.4.1689                                       
~                                  by Bram Moolenaar et al.                                   
~                  Modified by pkg-vim-maintainers@lists.alioth.debian.org                    
~                        Vim is open source and freely distributable                          
~                                                                                             
~                               Help poor children in Uganda!                                 
~                       type  :help iccf<Enter>       for information                         
~                                                                                             
~                       type  :q<Enter>               to exit                                 
~                       type  :help<Enter>  or  <F1>  for on-line help                        
~                       type  :help version7<Enter>   for version info                        
```

để thao tác trong `vim` thì chủ yếu chúng ta phải sử dụng lệnh, một số lệnh chúng ta chỉ cần gõ một ký tự trên bàn phím, một số lệnh chúng ta phải gõ lệnh đi trước là dấu `:` (colon), mình sẽ thêm cả dấu `:` nếu câu lệnh cần trong bài viết này.

Để thoát `vim` chúng ta sử dụng lệnh `:q`, nếu chúng ta không thể thoát, có nghĩa là chúng ta đã thay đổi một file mà chưa save nó lại, chúng ta có thể discard phần chúng ta thay đổi bằng cách sử dụng lệnh `:q!`.

#### Chế độ inserting trong `vim`

Để bắt đầu với phần này chúng ta sẽ tạo trước một file text ví dụ:

```
➜  /tmp touch vim_example.txt
➜  /tmp vim vim_example.txt 
```

Khi mở file lên mặc định chúng ta sẽ không thể gõ được nội dung, vì chúng ta đang ở trong command mode, nghĩa là chỉ có thể sử dụng lệnh để điều khiển `vim`. Để có thể thêm nội dung chúng ta phải dùng lệnh `i`, có nghĩa là insert mode, lúc này chúng ta có thể gõ text vào bình thường. Có thể biết chúng ta đang trong mode này bằng cách nhìn vào line cuối của terminal

```
-- INSERT --
```

Bây giờ chúng ta thêm vào:

```
The quick brown fox jumped over the lazy dog.
```

Để thoát chế độ insert chúng ta nhấn `Esc`. Để lưu lại thay đổi, chúng ta sử dụng lệnh `:w`.

#### Di chuyển con trỏ trong chế độ command mode

Trong command mode, chúng ta có thể sử dụng những lệnh sau để di chuyển con trỏ, `vim` không chỉ giới hạn di chuyển con trỏ di chuyển từng kí tự một hay từng dòng một, mà có rất nhiều lệnh khiến việc di chuyển con trỏ rất thuận tiện và nhanh chóng:



| Key command | Move the cursor |
| -------- | -------- | 
|  `l`    |  sang phải một ký tự    |
|   `h`   |    sang trái một ký tự  |
|   `j`   |    xuống một dòng  |
|   `k`  |    lên một dòng |
|   `0`   |   đến đầu dòng hiện tại   |
|   `^`   |   đến đầu dòng hiện tại nơi chứa ký tự khác space (có thể một số file config `yml` indent chẳng hạn thì lệnh này sẽ giúp bỏ qua phần indent đó)  |
|   `$`   |    đến cuối dòng hiện tại  |
|   `w`   |    đến đầu word tiếp theo hoặc đến dấu chấm câu tiếp theo  |
|   `W`   |    đến đầu word tiếp theo, ignore chấm câu  |
|   `b`   |   đến đầu word trước, hoặc chấm câu trước   |
|   `B`   |    đến đầu word trước, ignore chấm câu trước  |
|   `Ctrl + f`   |   trang tiếp theo   |
|  `Ctrl + b`    |    trang trước  |
|  `[number] + G`    |   đến dòng thứ `[number]` của file  |
|`G`| đến dòng cuối file |

#### Edit text cơ bản

Trong chế độ command mode, chúng ta có sử dụng một số lệnh để edit text như sau:

Trước hết hay bật lại file lên

```
➜  /tmp vim vim_example.txt
```

##### Append text

Để thêm mới text vào sau kí tự cuối cùng của file, chúng ta dùng lệnh `a`, sau đó chúng ta lại được vào insert mode và có thể thêm text bình thường. Thêm vào nội dung như sau.

```
The quick brown fox jumped over the lazy dog. It was cool.
Line 2
Line 3
Line 4
Line 5
Line 6
~                                                                                             
~                                                                                             
~  
```

##### Opening a line

Chúng ta có thể chèn thêm dòng vào file hiện tại bằng cách sử dụng lệnh `o` hoặc `O`:

| Command | Ý nghĩa |
| -------- | -------- | 
|    `o`  |   chèn dòng phía dưới dòng hiện tại  | 
|    `O`  |   chèn dòng lên trên dòng hiện tại  | 

Mặc định sau khi dùng 2 lệnh này thì vim sẽ vào inserting mode.

Ta dùng lệnh này để thêm một dòng vào trên và dưới của *line 3*


```
The quick brown fox jumped over the lazy dog. It was cool.i
Line 2

Line 3

Line 4
Line 5
Line 6

~  
~  
~  
~  
~  
```

##### Deleting text

Chúng ta có thể xóa text theo rất nhiều cách khác nhau bằng những câu lệnh mà `vim` cung cấp.


 | Command | Ý nghĩa |
| -------- | -------- | 
|`x`|Delete ký tự hiện tại|
|`3x`|Delete ký tự hiện tại và 2 ký tự sau đó|
|`dd`|Delete dòng hiện tại|
|`5dd`|Delete dòng hiện tại và 4 dòng sau đó|
|`dW`|Delete từ vị trí con trỏ đến đầu word tiếp theo|
|`d0`|Delete từ vị trí con trỏ đến đầu dòng hiện tại|
|`d$`|Delete từ vị trí con trỏ đến hết dòng hiện tại|
|`d^`|Delete từ vị trí con trỏ đến đầu dòng hiện tại trừ ký tự khoảng trắng|
|`dG`|Delete từ vị trí con trỏ đến hết file|
|`d20G`|Delete từ vị trí con trỏ đến dòng thứ 20|

Chúng ta có thể thử edit lại file ví dụ của chúng ta, sau đó chúng ta có thể sử dụng lệnh `u` - undo, để khôi phục nội dung file và đến với ví dụ tiếp theo.

##### Copy, Paste

Về cơ bản thì cách sử dụng copy không khác với delete text là mấy. Chúng ta có thể sử dụng bảng trên, thay vào bằng lệnh `y` thay thế từ *Delete* trong phần ý nghĩa thành *Copy* là xong, chúng ta đã có cách sử dụng lệnh copy.
Để paste nội dung vừa copy, chúng ta sử dụng `p` paste dưới dòng hiện tại hoặc `P` paste trên dòng hiện tại.

##### Joining Line

Để join hai dòng với nhau, chúng ta có thể dùng `J`, khi đó `vim` sẽ join dòng hiện tại với dòng ngay dưới nó.

##### Select text

Để có thể select một đoạn text hay một block of text chúng ta có thể dùng lệnh `v`, từ đó ta có thể dùng nó để copy text hoặc delete text, khi đó sử dụng `p` sẽ paste text vào sau vị trí con trỏ, và `P` sẽ paste text vào trước vị trí con trỏ.

#### Mở multiple file

`vim` có thể dùng để edit nhiều hơn là một file, chúng ta có thể dùng lệnh sau:

```
➜  /tmp vim vim_example_1.txt vim_example_2.txt vim_example.txt
```

Để chuyển giữa các file chúng ta có thể dùng lệnh `:n` next file tiếp theo, `:N` quay lại file trước. Ngoài ra chúng ta có thể dùng lệnh `:buffers` để view danh sách các file đang được mở. 

```
~                                                                                             
:buffers
  1 %a   "vim_example_1.txt"            line 1
  2      "vim_example_2.txt"            line 0
  3      "vim_example.txt"              line 0
```

#### Chia màn hình trong `vim`

Mình thường prefer một cách khác hơn để edit multiple file hơn bằng cách mở vim ở một file, sau đó sử dụng lệnh `:split` hoặc `:vsplit` để chia đôi màn hình theo chiều ngang hoặc dọc

```
File 1                                         |File 1
The quick brown fox jumped over the lazy dog. I|The quick brown fox jumped over the lazy dog.
t was cool                                     |It was cool
Line 2                                         |Line 2
Line 3                                         |Line 3
Line 4                                         |Line 4
Line 5                                         |Line 5
Line 6                                         |Line 6
                                               |
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
vim_example_1.txt            1,1            All vim_example_1.txt           1,1            All
```

sau đó dùng lệnh 

```
:e [another_file_path.txt]
```

để mở file khác edit tại cửa sổ còn lại, `:e` có nghĩa là *edit*.

Để di chuyển giữa các cửa sổ, chúng ta có thể dùng lệnh `Ctrl+w+[arrow key]`  để chọn cửa sổ tương ứng. Nếu ai sử dụng `tmux` rồi chắc biết kiểu lệnh điều khiển này

```
File 1                                         |File 2
The quick brown fox jumped over the lazy dog. I|The quick brown fox jumped over the lazy dog.
t was cool                                     |It was cool
Line 2                                         |Line 2
Line 3                                         |Line 3
Line 4                                         |Line 4
Line 5                                         |Line 5
Line 6                                         |Line 6
                                               |
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |vim_example_2.txt           1,1            All
~                                              |The quick brown fox jumped over the lazy dog.
~                                              |It was cool
~                                              |Line 2 
~                                              |Line 3
~                                              |Line 4
~                                              |Line 5
~                                              |Line 6
~                                              |
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
~                                              |~                                             
vim_example_1.txt            1,1            All vim_example.txt             1,1            All
"vim_example.txt" 7L, 94C
```

Trong ví dụ trên là mình mở 3 files để edit.

-----

Như vậy ở phần này chúng ta đã đi tiếp được 2 chủ đề nhỏ nữa, đó là environment trong Linux và cách sử dụng `vim` editor. Ở phần tiếp theo mình sẽ tổng hợp một vài tool hay được sử dụng, và sau đó là đi đến phần cuối cùng, viết một vài shell script đơn giản.
Ngoài ra với những bạn muốn tập sử dụng `vim` có thể chơi trò chơi sau. [Have fun!](https://vim-adventures.com/)

-----

-----

Sắp tới những bài viết của mình sắp tới sẽ được cập nhật thường xuyên trên blog cá nhân [chiase.tech](https://chiase.tech). Series câu lệnh Linux sẽ được mình update những nội dung mới hơn tại [đây](https://chiase.tech/chu-de/linux/). Mong các bạn giành thời gian ủng hộ và góp ý nhé 😁

Tham khảo: 
- https://chiase.tech/cac-cau-lenh-linux-co-ban-phan-7-environment/
- https://chiase.tech/cac-cau-lenh-linux-co-ban-phan-8-gioi-thieu-ve-vim-text-editor/
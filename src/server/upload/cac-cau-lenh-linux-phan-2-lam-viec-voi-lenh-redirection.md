Chào mừng các bạn đã trở lại với series hay nói đúng hơn là cheatsheet về các câu lệnh Linux mình tổng hợp lại sau quá trình tự học. Như đã giới thiệu ở phần trước thì nội dung bài viết nằm trong cuốn [The Linux Command Line: A Complete Introduction - William E. Shotts Jr.](https://www.amazon.com/Linux-Command-Line-Complete-Introduction/dp/1593273894), nên bạn nào muốn tìm hiểu sâu hơn, có lời giải thích kỹ hơn thì hãy tìm đọc theo cuốn sách đó.

Ở phần trước thì chúng ta đã tìm hiểu về những lệnh cơ bản nhất của Linux, cách thao tác với file và directory trên Linux cùng với những option mà không phải ai cũng đã biết hết, vân vân và mây mây...

Ở kỳ này chúng ta sẽ cùng tìm hiểu thêm về các lệnh liên quan đến làm việc với các lệnh khác và redirection :v:

### Làm việc với câu lệnh

Trước hết chúng ta có thể hiểu, câu lệnh (hay Linux commands) có thể là 1 trong 4 thứ sau:

1. Một chương trình có thể được thực thi (viết bằng C/C++ hoặc viết bằng ngôn ngữ như Python, Ruby, Perl,...)
2. Shell built-in: bash support một vài câu lệnh gọi là shell built-in.
3. Shell functions: một dạng shellscript thu nhỏ tích hợp trong environment.
4. Một alias: câu lệnh được chúng ta tự định nghĩa, từ các câu lệnh các

Vậy chúng ta có cách để nhận diện một câu lệnh thuộc loại nào trong 4 loại trên bằng lệnh:

```
type [command]
```

với `command` là câu lệnh mà ta muốn biết nó là gì 

```
➜  ~ type ls
ls is an alias for ls --color=tty
➜  ~ type cd
cd is a shell builtin
➜  ~ type ps
ps is /bin/ps
➜  ~ type rails
rails is /home/hunguyen/.rvm/gems/ruby-2.4.4/bin/rails
➜  ~ type git
git is /usr/bin/git
```

Chúng ta có thể biết `ls` là một alias của chính nó với một option cho phép nó hiển thị màu trên kết quả, `cd` là một shell built-in, các lệnh còn lại là chương trình thực thi.


Đối với nhưng câu lệnh thực thi chương trình, chúng ta có thể biết được nơi thực thi của nó nằm ở đâu nhờ vào lệnh `which`

```
which [command]
```

Ví dụ

```
➜  ~ which rails 
/home/hunguyen/.rvm/gems/ruby-2.4.4/bin/rails
➜  ~ which ruby
/home/hunguyen/.rvm/rubies/ruby-2.4.4/bin/ruby
➜  ~ which ps
/bin/ps
```

Đối với các lệnh shell built-in, `which` sẽ trả về lỗi hoặc thông báo chúng là shell built-in nên không có executable location

#### "Hướng dẫn sử dụng" của câu lệnh

Sau khi đã biết được chính xác loại câu lệnh dựa vào `type` chúng ta có thể tìm "hướng dẫn sử dụng trước khi dùng" của câu lệnh đó.

Chắc ai cũng biết là đối với đa phần hầu hết các lệnh thì việc sử dụng option `--help` là chúng ta có thể lấy được "bí kíp võ công" của lệnh đó, nhưng ngoài ra còn vài câu lệnh không phải ai cũng biết.

Đối với shell built-in, chúng ta có thể dùng lệnh:

```
help [command]
```

Đối với các lệnh thực thi chương trình thì chúng ta có lệnh:

```
man [command]
man [section] [search term]
```

để xem manual page của chương trình đó. Trong đó: `command` là lệnh hay chương trình, `section` là phần muốn search trong manual page (được đánh số 1-8), `search term` là cụm từ muốn tìm trong phần đó (Phần này để các bạn tự tìm hiểu nhé, vì mình nghĩ ít ai sử dụng đến phần này nhiều :D)


Một vài lệnh khác về câu lệnh trên Linux:

* `apropos`: search manual page với cụm từ nào đó để output là list manual page có cụm từ đó, section chứa cụm từ đó
* `whatis`: hiển thị mô tả ngắn gọn của một câu lệnh
* `info`: hiển thị program info, giống với manual page

#### Tạo alias

Alias là cách để chúng ta tạo ra một lệnh riêng bằng cách kết hợp nhiều câu lệnh đã có sẵn:

```
alias name='string'
```

trước khi tạo alias chúng ta có thể sử dụng lệnh `type` để test xem tên đó đã tồn tại hay chưa.

Ví dụ:

```
➜  ~ alias foo='cd /usr/bin; ls; cd -'
➜  ~ foo
[                                   evince
...
~
➜  ~
➜  ~ type foo
foo is an alias for cd /usr/bin; ls; cd -
```

Để xóa alias chúng ta dùng lệnh sau:

```
➜  ~ unalias foo
➜  ~ type foo
foo not found
```

Để list hết các alias trong môi trường, ta chạy `alias` mà không truyền vào tham số nào

```
➜  ~ alias
-='cd -'
...=../..
....=../../..
.....=../../../..
......=../../../../..
1='cd -'
2='cd -2'
3='cd -3'
4='cd -4'
5='cd -5'
6='cd -6'
7='cd -7'
8='cd -8'
9='cd -9'
_=sudo
afind='ack -il'
g=git
ga='git add'
gaa='git add --all'
gap='git apply'
gapa='git add --patch'
gau='git add --update'
gav='git add --verbose'
gb='git branch'
```

Đây là một vài alias khi chúng ta sử dụng `zsh`

### Redirection

Trước khi đi vào các lệnh chúng ta đều biết rằng, chương trình đều sinh ra output. Output thì thường bao gồm 2 phần, output mong muốn của một chương trình, và các error messages.

Một chương trình chạy trên Linux sẽ gửi đầu ra vào một file đặc biệt là stdout (standard output) và error messages đến stderr (standard error). Hai file này được link đến màn hình và không được save lại trong file.

Thêm vào đó, các chương trình thường lấy đầu vào từ stdin (standard input) được attach với bàn phím.

I/O rediretion cho phép chúng ta thay đổi nơi output ra và nơi input đến.

#### Redirect standard output

Để redirect output của một lệnh hay một chương trình ra một file khác stdout, chúng ta sử dụng ký hiệu `> [file_name]`. Ví dụ, để redirect output của lệnh `ls` ra một file tên `foo.txt`:

```
➜  /tmp ls > foo.txt
➜  /tmp
➜  /tmp ls -l foo.txt 
-rw-rw-r-- 1 hunguyen hunguyen 405 Th05 19 11:36 foo.txt
```

Chúng ta sẽ thấy lệnh trên không in kết quả vì kết quả đã được redirect đến `foo.txt` rồi.

Vậy nếu ta thực hiện lệnh trên với một directory không tồn tại thì sao.

```
➜  /tmp ls /foo/bar > foo.txt
ls: cannot access '/foo/bar': No such file or directory
➜  /tmp ls -l foo.txt 
-rw-rw-r-- 1 hunguyen hunguyen 0 Th05 19 11:40 foo.txt
```

Chúng ta vẫn thấy kết quả lỗi in ra màn hình vì chúng ta mới chỉ redirect output thôi còn error thì vẫn được lưu trong stderr, file `foo.txt` thì không có gì vì output không trả ra gì cả.

Chúng ta có thể thấy là file `foo.txt` bị overwrite vì chúng ta đang sử dụng `>`, để append vào file output chúng ta phải sử dụng `>>`. Ví dụ:

```
➜  /tmp ls -l foo.txt 
-rw-rw-r-- 1 hunguyen hunguyen 20769 Th05 19 11:44 foo.txt
➜  /tmp ls /home/hunguyen >> foo.txt 
➜  /tmp ls -l foo.txt               
-rw-rw-r-- 1 hunguyen hunguyen 21006 Th05 19 11:45 foo.txt
```

#### Redirect standard error

Một chương trình có thể sinh ra output trên rất nhiều file streams. 

Chúng ta đã biết 3 loại file stream là stdin, stdout, stderr. 

Shell tham chiếu chúng tương ứng với 3 file descriptor là `0, 1, 2`.

Shell cho phép chúng ta định nghĩa I/O redirecion bằng cách sử dụng file descriptor number.

Để redirect error chúng ta file sử dụng file descriptor tương ứng là `2`:

```
➜  /tmp ls /foo/bar 2> foo-error.txt
➜  /tmp    
➜  /tmp ls -l foo-error.txt 
-rw-rw-r-- 1 hunguyen hunguyen 56 Th05 19 11:58 foo-error.txt
```

như vậy chúng ta đã không thấy output error trên màn hình nữa mà nó đã được update trong file `foo-error.txt`

#### Redirect output & error ra cùng một file

Chúng ta có thể sử dụng một trong các cách sau để redirect cả error và output ra cùng một file


```
ls -l /bin/usr > ls-output.txt 2>&1
ls -l /bin/usr &> ls-output.txt
ls -l /bin/usr &>> ls-output.txt
```

Cách đầu tiên là cách thực hiện trong shell ở các phiên bản cũ: redirect stdout ra một file sau đó redirect stderr ra stdout (lưu ý đúng thứ tự trên nếu không sẽ không chính xác).

Cách thứ hai là là cho các version đến hiện tại của shell, dòng 3 là redirect và append vào một file.


#### Loại bỏ những đầu ra không mong muốn

Đôi khi chúng ta có thể không muốn nhìn thấy output của chương trình ra màn hình lẫn ra file. Hệ thống cung cấp một cách để redirect những đầu ra này ra một file đặc biệt gọi là `/dev/null`.  File này chấp nhận đầu vào và không làm gì với nó cả. Để loại bỏ những error message không mong muốn chúng ta có thể thực hiện lệnh sau:

```
ls -l /bin/usr 2> /dev/null
```

#### Redirect standard input

Trước hết chúng ta sẽ giới thiệu về lệnh `cat`. Lệnh `cat` dùng để nối các file và redirect chúng ra stdout:

```
cat [file...]
```

trong đó `[file...]` có thể là một hoặc nhiều file.

nếu chúng ta sử dụng `cat` mà không truyền vào tham số nào. Nó sẽ nhận nội dung chúng ta nhận vào bàn phím và in chúng ra màn hình, sau khi chúng ta nhấn `ctrl+d`.

```
➜  ~ cat 
this is a demo    
this is a demo
➜  ~
```

chúng ta cũng có thể redirect đầu ra của lệnh `cat` vào một file, làm `cat` giống như một dummy text editor

```
➜  /tmp cat > foo.txt
This is a demonstration
➜  /tmp cat foo.txt 
This is a demonstration
```

Sau đây là cách chúng ta có thể redirect stdin, chuyển input từ 1 file thay vì bàn phím:

```
➜  /tmp cat < foo.txt 
This is a demonstration
```

Nhìn ví dụ trên thì có vẻ hơi dummy nhưng đó chính là cách chúng ta hiểu về redirect input với operator `<`, mặc dù việc này không cải thiện việc dùng câu lệnh `cat` chút nào.


#### Pipelines

Pipeline là chức năng redirect standard output của một command đến standard input của một command khác bằng operator `|`.

Chúng ta có thể hiển thị content của một directory lớn trong `less` để có thể search, hiển thị phân trang:

```
$ ls -l /usr/bin | less
```

##### Filters

Chúng ta có thể sử dụng filter trong pipeline để biến đầu ra (output của một lệnh) thành kết quả mong muốn rồi đưa ra standard output.

Các filter phổ biến là: `sort`, `uniq`

Ví dụ, để nhìn thấy list uniq của một vài directory trong `less`:

```
$ ls /bin /usr/bin | sort | uniq | less
```

Hoặc chúng ta có thể sử dụng option `-d` của `uniq` để chỉ nhìn thấy list những dòng có từ một lần xuất hiện trở lên

##### `wc` - line, word, byte count

câu lệnh `wc` dùng để đếm dòng, từ, byte trong một file. Chúng ta có thể dùng nó để đếm số uniq file, directory trong một directory.

```
$ ls /bin /usr/bin | sort | uniq | wc -l
2728
```

##### `grep`

Có lẽ chúng ta đã quá quen với lệnh `grep` rồi, dùng để match tên file/directory nội dung file. Khi gặp một file có chứa pattern cần search nó sẽ in dòng đó ra standard output

```
grep pattern [file...]
```

Ví dụ

```
➜  /tmp ls /bin /usr/bin | sort | uniq | grep zip
bunzip2
bzip2
bzip2recover
funzip
gpg-zip
gunzip
gzip
mzip
preunzip
prezip
prezip-bin
unzip
unzipsfx
zip
zipcloak
zipdetails
zipgrep
zipinfo
zipnote
zipsplit
```

##### `head`/`tail`

Hai câu lệnh trên tương ứng để in ra phần đầu và phần cuối của file. Mặc định chúng sẽ in ra 10 dòng đầu hoặc cuối của một file. Chúng ta có thế sử dụng option `-n [number of lines]` để định nghĩa số dòng muốn in ra

```
➜  /tmp ls /bin /usr/bin | sort | uniq | head -n 4

[
2to3
2to3-2.7
➜  /tmp ls /bin /usr/bin | sort | uniq | tail -n 4 
zmore
znew
zsh
zsh5
```

`tail` có một option `-f` mà chắc ai cũng biết để output realtime content của một file.

##### `tee`

Lệnh cuối cùng mà chúng ta tìm hiểu trong bài này đó là `tee` đọc stdin và redirect nó ra một hoặc nhiều file khác nhau, chúng ta dùng nó để ghi lại một kết quả cụ thể trong một đoạn nhất định của pipelines, tưởng tượng nó là ống nước chữ T để chia nguồn nước vậy

Ví dụ:

```
➜  /tmp ls /usr/bin | tee ls.txt | grep zip
funzip
gpg-zip
mzip
preunzip
prezip
prezip-bin
unzip
unzipsfx
zip
zipcloak
zipdetails
zipgrep
zipinfo
zipnote
zipsplit
➜  /tmp head ls.txt 
[
2to3
2to3-2.7
2to3-3.5
411toppm
7z
7za
a11y-profile-manager-indicator
aa-enabled
aclocal
```

Trong bài viết này , chúng ta đã được tìm hiểu về cách để redirect output, error, input của một chương trình, một câu lệnh. Chúng ta đã tìm hiểu thể nào là pipeline, ở phần đầu chúng ta cũng đã tìm hiểu về cách để đọc "hướng dẫn sử dụng" của một câu lệnh mà không phải tra google. Ở phần tiếp theo chúng ta sẽ cùng tìm hiểu về các thủ thuật dùng bàn phím khi ở trong Terminal, tìm hiểu về expansion trong shell là như thế nào.

-----


Sắp tới những bài viết của mình sắp tới sẽ được cập nhật thường xuyên trên blog cá nhân [chiase.tech](https://chiase.tech). Series câu lệnh Linux sẽ được mình update những nội dung mới hơn tại [đây](https://chiase.tech/chu-de/linux/). Mong các bạn giành thời gian ủng hộ và góp ý nhé 😁

Tham khảo: 
- https://chiase.tech/cac-cau-lenh-linux-co-ban-phan-2-dung-lenh-ma-khong-phai-tra-google/
- https://chiase.tech/cac-cau-lenh-linux-co-ban-phan-3-tim-kiem-va-loc-ket-qua-voi-redirection/
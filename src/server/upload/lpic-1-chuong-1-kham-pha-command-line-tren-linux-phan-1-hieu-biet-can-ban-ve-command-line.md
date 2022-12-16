### Phần 1: Hiểu biết căn bản về Command-Line

### 1.1. Khám phá Linux Shell

Đầu tiên ta cần hiều shell là gì. Shell hiểu một cách đơn giản là 1 chương trình nhận và phiên dịch các câu lệnh (command-line) dưới dạng text, nó là interface để ta tương tác với hệ thống.

Linux cung cấp cho ta rất nhiều shell nhưng các shell phổ biến nhất hiện nay là: bash, sh, tcsh, csh, ksh, zsh. Các bạn chỉ cần lưu tâm 2 điều: bash shell là shell phổ biến nhất, sẽ nằm trong nội dung chương trình và sh đóng vai trò là pointer trỏ đến bash shell hoặc các shell khác.

Shell có hai kiểu:
* **Default interactive shell:** 

     *user nhập lệnh và chạy chương trình trên shell này*

* **Default system shell:**

     *Được Linux sử dụng để chạy các script, thường khi khởi động máy*
     
     
  

-----

   
### 1.2. Tương tác với Shell

Nếu các bạn cài Linux không có giao diện GUI thì khi khởi động máy bạn được đưa trực tiếp vào default shell. Ngược lại nếu bạn có GUI thì bạn hãy tìm chương trình terminal và chạy nó. Hãy bắt đầu với các câu lệnh đơn giản nhé:

**Thể hiện thông tin hệ thống:**

```
$ uname -a 
Linux localhost.localdomain 3.10.0-957.el7.x86_86_64 #1 SMP Thu Nox 8 23:39:32 UTC 2018 x86_64 GNU/Linux
```

Tùy vào hệ điều hành các bạn sử dụng mà kết quả có thể khác nhâu, câu lệnh trên thể hiện thông tin sau:

Kernel Verion:  3.10.0-957

System Hostname: localhost.localdomain

**Thay đổi đường dẫn:**

```
$ cd /home/linda

/home/linda $
```

Câu lệnh trên đưa bạn đến home directory của user linda. Hoặn bạn có thể gõ lệnh tắt sau:

```
$ cd ~

/home/linda $
```

**Thể hiện đường dẫn hiện tại:**

```
$ pwd

/home/linda 
```

**Tính thời gian thực thi xong một lệnh**

```
$ time pwd

real    0m0.000s
user    0m0.000s
sys     0m0.000s
```

**Chấm dứt 1 shell** 

Thoát khỏi bất kỳ shell nào
```
$ exit
```

Thoát khỏi login shell mà thôi
```
$ log out
```

**Xác định một lệnh là Internal hay External**

```
$ type -a pwd

pwd is a shell built-in
pwd is /bin/pwd
```

pwd vừa là Internal và External command.

**Xem lịch sử các lệnh đã gõ**
```
$ history

  1 cd ~
  2 pwd
  3 type
```

**Thực thi các lệnh trong history**

Để thực thi lệnh số 1 như trong ví dụ trước ta gõ lệnh sau:
```
$ !1

$ cd ~
```
Để thực thi lệnh gần nhất (tức lệnh type)  ta gõ:

```
$!!

$ type
```

Linux lưu lại 500 dòng lệnh mà ta đã gõ và lưu và file **.bash_hístory** trong **home directory **của mỗi user. Để xóa hết các lệnh đã lưu ta gõ:

```
$ history -c
```

**Sự khác nhau giữa  Internal và External Commands:**


**Internal Command** là các lệnh built-in tức có sẵn trong shell, khi dùng lệnh hệ thống không phát sinh bất kỳ tiến trình nào

**External Command** là các lệnh không có sẵn trong shell, khi dùng lệnh hệ thống sẽ đi tìm lệnh này trong biến $PATH và khởi tạo 1 process để chạy lệnh đó

**Lưu ý:** lệnh internal được ưu tiên hơn lệnh external.

**Các mẹo hữu ích khi gõ lệnh**

* Nhấn **TAB** key để hệ thống tự hoàn thiện câu lệnh hoặc thể hiện các gợi ý khi gõ lệnh
* Đối với dòng lệnh dài nahasn **CTRL + A** hoặc **CTRL + E** để di chuyển con trỏ lên đầu dòng hoặc cuối dòng thay vì phải nhấn đè phím mũi tên.
* Nhấn **ESC** rồi nhấn **B** hoặc **F** để di chuyển con trỏ qua lại giữa các từ
* Nhấn **CTRL + X** sau đó nhấn **Backspace** để xóa hết từ vị trí con trỏ trở về đầu dòng lệnh
* Nhấn **CTR:L + K** để xóa hết từ vị trí con trỏ đến hết cuối dòng lệnh
* Để tim lại câu lệnh bạn vừa gõ di chuyển phím mũi tên lên xuống 
* Khi màn hình hiên thị quá nhiều gõ lệnh **clear** để làm gọn hơn



### 1.3. File cấu hình Shell

Ta cấu hình Shell thông qua file có định dạng plain-text. File cấu hình của **bash** thực chất là một bash shell scipts. Một vài ví dụ về các file cấu hình shell có thể kể đến như: **~/.bashrc** và **/etc/profile**. Các bạn có thể tùy chỉnh các file cấu hình này mà không cần biết nhiều shell script, nhưng hãy backup file gốc chạy thử nếu có gì đó không ổn thì restore lại nhé.

### 1.4. Sử dụng biến môi trường (Environment Variable):
### 
Biến môi trường là một phần của program, và có thể chỉnh sửa để các program khác nhau truy xuất các biến khi cần. Ví dụ:

Biến **$PATH** cho thấy đường dẫn tới các thư mục chứa câu lệnh (chương trình) để chạy khi bạn gõ trên terminal, các mục cách nhau dấu “:” ví dụ /usr/local/sbin; /usr/local/bin... Xem $PATH với lệnh:

```
$ echo $PATH
```

Một ví dụ vui vẻ khác là biến $PS1 dùng để thay đổi nội dung shell prompt.

```
PS1= "My New Shell Promt $"
My New Shell Prompt $
```
Nếu muốn trở lại như trước các bạn logout rồi login lại nhé, đừng dại dột dùng lệnh **unset PS1** nhé vì nó sẽ xóa shell prompt đấy

### 1.5. Linux Help

Linux có đến hàng tá lệnh và không phải lúc nào bạn cũng có thể nhớ hết các lệnh cũng như các option của nó, nên hệ thống hỗ trợ bạn với lệnh man (manual) như là cuốn hướng dẫn sử dụng các lệnh vậy. 

`$ man pwd`

![](https://images.viblo.asia/aa586ef2-4099-4cb7-a966-c0a699ae92cf.PNG)

Các bạn nhấn Space bar để kéo xem tiếp và nhấn q (quit) để thoát. Khi bạn không nhớ rõ tên lệnh mà chỉ nhớ chức năng của nó thôi ví dụ mình cần tìm lệnh show thông tin hệ thống, mình sẽ dùng option -k theo sau là keyword mình muốn tìm. Ví dụ

$ man -k "System information"

![](https://images.viblo.asia/7072d2c1-23b4-4e58-b146-6daeebab7f64.PNG)

Vậy là chúng ta đã kết thúc bài 1 rồi, các bạn cố gắng thực hành để hiểu nhé, bạn nào có thắc mắc gì thì cứ comment mình sẽ giải đáp. Chúc các bạn thành công.
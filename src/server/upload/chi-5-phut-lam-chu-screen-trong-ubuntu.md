![](https://images.viblo.asia/4f60ecfe-5c86-46e1-b032-9abb71b8299c.jpg)

Trong quá trình remote tới server bằng ssh đôi khi chúng ta bị disconnect ssh do mạng hoặc không sử dụng lâu. Như vậy sẽ rất bất tiện nếu như bạn đang chạy project nào đó và khi bị disconnect đồng nghĩa với việc project của bạn sẽ bị dừng . Bài viết này mình sẽ đưa ra 1 giải pháp đó là sử dụng Screen 

## Screen là gì ?
**Screen** là một terminal multiplexer, cho phép người dùng truy cập và sử dụng nhiều chương trình đang chạy trên 1 terminal duy nhất hoặc sử dụng terminal từ xa (chẳng hạn như khi sử dụng SSH). Đối với việc sử dụng ssh sẽ giúp bạn vẫn có thể duy trì chương trình đang chạy hoặc chạy nhiều chương trình cùng 1 lúc kể cả sau khi bạn ngắt kết ssh tới server

## Hướng dẫn cài đặt 

Sử dụng “apt-get” để install trên Ubuntu:
```sh
sudo apt-get update
sudo apt-get install screen
```

## Useage
### Quản lý các window trong 1 Screen sessions
Để bắt đầu một **screen session** mới chúng ta chỉ cần gõ lệnh screen
```sh
screen
```
Đây là kết quả
![](https://images.viblo.asia/70452987-1b55-4adb-ae1a-e9fc09cc2ce2.png)

Như vậy chúng ta đã tạo được một screen mới và chỉ cần nhấn phím Space 

Để thao tác Screen chúng ta chủ yếu thao tác bằng các tổ hợp phím "Ctrl+a" 

Ví dụ chúng ta đang theo dõi các tiến trình bằng lệnh `top` nhưng chúng ta muốn chạy một lệnh khác thì sao ? Chúng ta không cần thoát khỏi terminal đang chạy lệnh `top` chúng ta có thể tạo một màn hình terminal  mới để chạy lệnh này 

```sh
Ctrl-a c
```
Tổ hợp phím trên tạo ra một màn hình terminal mới cho chúng ta chạy bất cứ lệnh gì mà ko làm gián đoạn chương trình mà chúng ta chạy ở terminal trước  . Vậy màn hình terminal kia ở đâu ? Chúng ta có thể quay trở lại màn hình đấy bằng lệnh 

```sh
Ctrl-a n
```
```sh
Ctrl-a p
```

2 lệnh này chuyển tiếp các màn hình tiếp theo ( next ) và trước đó ( previous )

**Ví dụ** : Chúng ta tạo ra 3 màn hình mới rồi chạy lệnh `Ctrl-a w`
```sh
Ctrl-a c
Ctrl-a c
Ctrl-a c
Ctrl-a w
```
**Kết Quả**
```sh
0$ bash  1$ bash  2-$ bash  3*$ bash
```
Lệnh trên sẽ hiển thị ra các màn hình và vị trí màn hình đang sử dụng của chúng ta

Để di chuyển đến màn hình khác cách nhanh nhất là sử dụng lệnh **Ctrl-a + với số thứ tự của màn hình đấy** :

```sh
Ctrl-a 1
```
Hoặc chúng ta có thể chạy một cách khác đó là dùng lệnh **`Ctrl-a + "`**
```sh
Num Name                                                                   Flags

  0 bash                                                                       $
  1 bash                                                                       $
  2 bash                                                                       $
  3 bash                                                                       $
```
Đây là màn hình hiển thị và chúng ta có thể chọn màn hình mà chúng ta muốn sử dụng

Để tránh bị nhầm lẫn chúng ta có thể đặt tên cho từng màn hình bằng lệnh **`Ctrl-a A`** ( nhấn Ctrl-a rồi nhấn Shift-a)

```sh
Set window's title to: set name here
```
và cuối cùng là lệnh kill các màn hình 
**`Ctrl-a k`** : kill màn hình hiện tại 
**`Ctrl-a \`** : kill tất cả các màn hình và đồng thời thoái khỏi Screen

### Quản lý các Screen Sessions

Chúng ta có thể xem các Screen sessions bằng lệnh
```sh
screen –ls
```
```sh
There are screens on:
	12996.pts-11.ubuntu-Inspiron	(15/10/2019 15:23:39)	(Detached)
	12797.pts-0.ubuntu-Inspiron	(15/10/2019 15:22:15)	(Detached)
2 Sockets in /var/run/screen/S-ubuntu.
```

Để sử dụng lại một Screen Sessions ta sử dụng lệnh `screen –r`. Trong đó r là reattack

**Ví dụ** bạn muốn sử dụng lại sessions `12996.pts-11.ubuntu-Inspiron	(15/10/2019 15:23:39)	(Detached)`
```sh
screen -r 12996
```

## Quản lý Terminals trong Screen
Có một số lệnh giúp bạn quản lý terminal sessions trong screen
Để copy text 
```sh
Ctrl-a [
```
Lệnh này cung cấp cho bạn 1 con trỏ có thể di chuyển bằng các phím mũi tên .Di chuyển đến nơi bạn muốn bắt đầu copy rồi nhấn `Enter` . Di chuyển đến cuối nơi bạn muốn sao chép và nhấn lại `Enter` lần nữa . Text sẽ được copy vào clipboard của bạn

Để paste text mà chúng ta đã copy
```sh
Ctrl-a ]
```
### Lock Screen

Screen cũng có phím tắt để khóa screen .**`Ctrl-a x`** là phím tắt để khóa màn hình 
```sh
Ctrl-a x
```
```sh
Screen used by Ubuntu on mint.
Password:
```
Bạn có thể dùng pass của Ubuntu để mở khóa

### Add password to lock screen
Vì lý do bảo mật, bạn có thể muốn đặt mật khẩu cho screen sessions của mình. Mật khẩu sẽ được hỏi bất cứ khi nào bạn muốn reattack lại screen. Mật khẩu này khác với cơ chế khóa màn hình ở trên.

Để bảo vệ mật khẩu screen của bạn, bạn có thể chỉnh sửa file “$HOME/.screenrc”. Nếu tập tin không tồn tại, bạn có thể tạo nó bằng tay. Cú pháp sẽ như thế này.
```sh
password crypt_password
```
để tạo `crypt_password` bạn có thể dụng lệnh `mkpasswd` của Linux và copy password sau khi thu đc vào file `.screenrc`

Như vậy mỗi khi bạn re-attack lại vào screen sẽ phải nhập pass
```sh
screen -r 5741
Screen password:
```

Trên đây là một số lệnh thông dụng khi sử dụng Screen trên Ubuntu . Còn rất nhiều lệnh nữa các bạn có thể đọc tại 

http://manpages.ubuntu.com/manpages/cosmic/man1/screen.1.html
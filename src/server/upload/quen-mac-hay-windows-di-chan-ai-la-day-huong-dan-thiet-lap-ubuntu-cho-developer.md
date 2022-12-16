Cái tiêu đề nghe nổ quá phải không? Nhưng không đâu, bạn hãy đọc hết bài viết này đi.

## Về công việc mới

Chuyện là gần đây mình vừa mới lựa chọn bỏ vị trí **.NET developer** để chuyển qua làm một **Golang Backend developer.** 
Sự khác biệt về ngôn ngữ là chắc chắn, dự án ở công ty mới sử dụng Golang - con chuột chũi mới nổi thay vì C# và Visual studio quen thuộc. 

Bên cạnh đó, thiết bị làm việc cũng không phải là Mac mà là máy tính chạy Ubuntu - 1 distro Linux phổ biến. 
Lý do chính là bởi vì cao tầng muốn phổ biến văn hóa devops cho nhân viên, do đó Ubuntu được chạy từ server của hệ thống cho tới máy của developer.

![Chiếc laptop thinkpad chạy windows gắn bó với mình đã mấy năm](https://images.viblo.asia/0e91a996-6fc4-4f50-ae96-dc593cacc193.jpg)
Chiếc laptop thinkpad chạy windows gắn bó với mình đã mấy năm

## Điểm mình thích ở Ubuntu/Linux

Có vài điều mà mình thích ở Mac và Ubuntu/Linux so với Windows chính là:

**Thứ nhất**, terminal của các hệ điều hành nhân Linux và Unix hoạt động rất tốt, dùng rất hiệu quả trong công việc, chẳng hạn tạo file, tạo folder hay chạy những lệnh hệ thống. Điều này còn tuyệt vời hơn khi bạn có thể cài các custom shell/terminal khác, chúng sẽ có những chức năng hay ho và hữu ích hơn nữa.

Còn ở windows thì hầu như mọi người chẳng bao giờ dùng tới command ngoài việc chạy những lệnh như `yarn` hoặc `npm install` 😂 😂, ở phần dưới mình sẽ hướng dẫn cài zsh cho ubuntu.


**Thứ 2** chính là cơ chế quản lý file, ở Mac và Linux, việc xóa file hoặc folder diễn ra rất nhanh. Trong vòng vài nốt nhạc bạn đã có thể xóa node_modules bằng 1 lệnh đơn giản là `rm -rf node_modules` (cẩn thận với lệnh này nhé 😛). 
Còn ở Windows ư, thôi đi, xóa thư mục này sẽ tốn của bạn hàng phút cho tới chục phút thời gian. Trước kia khi phải xóa nó, mình hầu hết đều di chuyển thư mục cũ đi chỗ khác hoặc là đổi tên, lúc nào rảnh thì cho máy xóa. Chưa kể việc xóa file này cũng khiến máy chạy chậm/lag hơn do bị ngốn nhiều tài nguyên.

![Chiếc macbook pro đầu tiên mình sử dụng (công ty cấp 😂](https://images.viblo.asia/c5b5c9e2-2498-416c-a18d-a6b46258b1ee.png)
Chiếc macbook pro đầu tiên mình sử dụng (công ty cấp 😂)


**Thứ bar**, Workspace manager và touchpad gestures. Kể từ khi việc work from home trở nên phổ biến, mình hầu như chỉ sử dụng laptop mà không sử dụng máy bàn nữa. Mà laptop hay đặc biệt Macbook vẫn nổi tiếng bởi tính năng kiếm ra tiền: chiếc **touchpad đỉnh của chóp.** 

Sau khi sử dụng macbook được 1 thời gian, đã quen với gesture trên mac, rồi quay trở lại chiếc thinkpad chạy windows là mình không còn muốn sử dụng em nó nữa. Ít nhất là khi không có chuột rời thì mình không sử dụng, vứt xó 🤣.
Việc di chuyển bằng touchpad giữa các workspace, các cửa sổ trên Windows rất chuối, vuốt bằng 3 ngón lên xuống trái phải thì animation chuyển cảnh còn bị khựng, giật. 

Ngược lại, việc này Mac làm tốt nhất, Ubuntu thì có trình GNOME và Wayland làm tốt, nếu dùng X11 thay vì Wayland thì cũng có cách để mod lại (phía dưới sẽ có hướng dẫn).

Demo touchpad gestures & workspace manager trên ubuntu (X11):
{@embed: https://www.youtube.com/watch?v=WRhvF_aaaPY}

**Thứ tư**, lại là command, nhưng là command để cài thêm application. Là developer, chúng ta thường xuyên phải cài nhiều phần mềm liên quan việc lập trình chẳng hạn như docker, các engine cho các ngôn ngữ như Go, rồi còn Nodejs… vân vân và mây mây.
Ở Windows thì hầu như chúng ta sẽ tìm nơi download, tải gói cài đặt **exe** hoặc **msi** rồi cài theo file đó, rất rườm rà phải không nào?  

Còn Linux hoặc Mac thì chúng ta chỉ cần cài `brew` , Linux thì có sẵn `apt` và có cả snap store, cài app qua command nhanh gọn lẹ. Tất nhiên Windows cũng có 1 alternative là Chocolatey, nhưng ở đây có bao nhiêu người nghe tới em nó nào? Sử dụng có ổn không? App có nhiều không ?

Chưa kể cài app thông qua command sẽ có tốc độ download nhanh hơn vì không cần qua ông middleman là trình duyệt như Chrome/ Firefox, thậm chí lúc gỡ cũng chỉ cần vài dòng command, quá tuyệt !

**Thứ numb**, Linux là open-source và miễn phí, ở đây chắc chưa có ai dùng Windows mà chưa crack bao giờ đâu nhỉ ? Mặc dù Opensource sẽ có nhiều thứ không được ổn định như mấy hệ điều hành trả phí, tuy nhiên đôi khi nó là một lựa chọn không tồi.

## Tại sao không chọn Mac hay Windows?

Đọc qua 5 lý do trên, có thể bạn sẽ có 2 câu hỏi ?

- Tại sao không mua Mac khi nó cũng có những tính năng trên lại còn ổn định hơn?
  Đáp án là do Mac `đắt` , đắt thấy ông bà nội luôn, với giá của Macbook pro 32gb thì chúng ta có thể mua từ 2 tới 3 chiếc laptop khác cùng mức dung lượng RAM (chạy intel). Mặc dù macbook Air M1 rất rẻ và ngon, tuy nhiên RAM lại thấp và không có quạt tản nhiệt.

- Thế Linux thì dùng office kiểu gì? Nhà tôi 3 đời dùng Windows vẫn bình thường chỉ với bàn phím và chuột rời đấy thôi.
  Okay, với một developer như mình, tần suất sử dụng các phần mềm văn phòng không cao, Google docs có thể đáp ứng được, chưa kể Linux cũng có các phần mềm thay thế như LibreOffice đấy thôi (mình chỉ mới chuyển qua Mac và Linux được 4 tháng).
  Là dev, chúng ta tập trung chính vào trải nghiệm xoay quanh công việc lập trình, và mình thấy ở mặt này Linux vượt trội hơn nhiều so với Windows - trừ phi bạn làm .NET như mình trước kia hehe.

## Hướng dẫn thiết lập Ubuntu từ A - Z

Sau bài diễn văn dài dằng dặc phía trên, chúng ta cùng nhau đến với phần hướng dẫn nào, dù gì với thiết lập mặc định của Ubuntu mặc định các bạn sẽ không có được đầy đủ trải nghiệm như mình nói ở trên đâu. Bên cạnh đó bạn cũng phải làm quen thêm vài dòng lệnh cơ bản nữa. Let's get started.

Xuyên suốt từ đầu bài viết tới giờ, mình đã nhắc tới Command rất nhiều, yeah, hầu hết thời gian chúng ta sẽ làm việc thông qua **Terminal**, dưới đây là terminal mặc định của Ubuntu, bạn có thể mở nó từ thanh tìm kiếm bằng cách gõ Phím Super (hay còn gọi là phím Windows).

![Ubuntu default Gnome Terminal](https://images.viblo.asia/2c3d654f-322b-453d-9a7b-aea2160a0796.png)


Ubuntu default Gnome Terminal

### Những câu lệnh và khái niệm cơ bản trong terminal của Linux

- Tiền tố **sudo** trước mỗi câu lệnh có nghĩa rằng câu lệnh phía sau sẽ được thực thi với quyền root user. (Sudo có nghĩa là SuperUser DO và nó được sử dụng cho các file và tác vụ bị hạn chế)
  Sử dụng command **sudo** thì terminal sẽ hỏi bạn mật khẩu, và khi bạn gõ mật khẩu lên terminal, nó sẽ không hiển thị bất kì kí tự nào biểu hiện rằng bạn đang nhập. Nếu bạn vẫn muốn hiển thị dấu (\*) khi nhập mật khẩu, phía dưới mình có phần hướng dẫn config cho vụ này.
- Command để cài 1 phần mềm từ file .deb (đuôi này dành cho distro hệ Debian/Ubuntu):

```bash
sudo dpkg -i <filename>.deb
```

- Trước khi cài đặt hoặc update app nào trong hệ thống Linux, thì việc update apt/apt-get là một điều hết sức nên làm:

```bash
sudo apt update
```

### Cài đặt các component cần thiết nhất cho Linux:

Đầu tiên chúng ta cần cài vài thành phần quan trọng, dĩ nhiên, bạn nên chạy `apt update` trước nha.

```bash
sudo apt install curl wget git -y
```

- **-y** có nghĩa là “yes", tự động đồng ý cho các prompt sẽ bật ra khi chúng ta cài đặt các component trên
- Chúng ta cài 3 app cần thiết nhất:
  - **curl**: Viết tắt của client URL, là một command line tool sử dụng để truyền/ lấy dữ liệu thông qua nhiều giao thức khác nhau (như HTTP, HTTPS, FTP, FTPS, SCP, SFTP, FILE, …)
  - **wget**: Là tool sử dụng cho việc tải file trên giao thức HTTP hoặc FTP, (tải nhanh hơn Chrome đó nha 😛)
  - **git**

### Custom Shell

Thứ đầu tiên mình nghĩ mà chúng ta nên cài và cá nhân hóa chính là shell, mặc định thì Linux sẽ chạy Bash, nhưng bash chỉ support những tính năng cơ bản. Ở đây mình cài đặt 1 custom shell là [ZSH](https://www.zsh.org/), và 1 framework để quản lý plugin cho ZSH chính là [Oh My Zsh](https://ohmyz.sh/).

Dưới đây là một số lý do chính trong số rất nhiều tính năng mà ZSH sở hữu, chính những thứ này khiến mình luôn cài ZSH để thay thế shell mặc định trong Ubuntu hay MacOS.

- **Automatic cd:** Bạn chỉ cần gõ cd và nhấn tab (hoặc gõ thêm 1 vài chữ cái đầu), danh sách những thư mục và file tương tứng trong thư mục sẽ hiển thị phía dưới dòng command, giúp bạn dễ dàng di chuyển giữa các thư mục hơn.
  Tin mình đi, từ khi quen dùng cd và auto cd này, hầu như mình không dùng tới UI file manager nữa.
- **Recursive path expansion:** Ví dụ, bạn gõ “/u/lo/b” thì sẽ tự động được chuyển thành “/usr/local/bin”
- **Spelling correction and approximate completion:** Khi chúng ta gõ nhầm tên file hoặc thư mục, ZSH sẽ tự động sửa sai cho mình.
- ZSH sở hữu kho plugin phong phú cũng như framework đi kèm (như mình đề cập Oh My Zsh ở trên).

Mình để ở đây ví dụ cho vụ automatic cd cho các bạn dễ hình dung:

![auto matic cd](https://images.viblo.asia/6fbd4bfe-4a25-498a-b3a2-6f74eceb86bd.gif)


**Cài ZSH và Oh My Zsh**

Việc cài ZSH và Oh My Zsh rất đơn giản, bạn chỉ cần copy đoạn script dưới đây, sau đó paste vào terminal bằng cách nhấn **Ctrl + Shift + P**, rồi enter là xong.

```bash
sudo apt install zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Sau đó chúng ta sẽ cần cài zsh làm shell mặc định cho Terminal:

```bash
sudo chsh -s $(which zsh)
```

Nếu ZSH vẫn không được set mặc định khi bạn đóng Terminal và mở lại, thì chỉ việc đăng xuất và đăng nhập lại vào Ubuntu là xong nhé.

Lưu ý: Khi sử dụng Bash, thì mặc định những câu lệnh trong `~/.bashrc` sẽ chạy bất cứ khi nào shell được mở, tương tự với zsh, file này là `~/.zshrc`

### Cài app Terminal thay thế cho GNOME Terminal

We have two good alternatives to the Gnome terminal, **Konsole** and **Terminator,** I recommend Konsole. Install Konsole by the commands below and choose it as the default terminal app.
GNOME Terminal là app mặc định để chúng ta có thể làm việc được với shell, nhưng app này có 1 số hạn chế nhất định. Có 2 ứng cử viên sáng giá có thể thay thế cho vị trí này chính là **Konsole** và **Terminator**, ở đây mình chọn Konsole vì một số lý do như quản lý profile, color scheme, scroll back… hơn cả là giao diện em nó nhìn thuận mắt.
Cài Konsole như sau:

```bash
sudo apt-get update -y
sudo apt-get install -y konsole
# update default terminal:
sudo update-alternatives --config x-terminal-emulator
```

Sau khi cài xong thì nó sẽ hiện ra danh sách để chọn terminal mặc định, chúng ta chọn konsole và nhấn enter là xong:

![Chọn konsole làm terminal mặc định](https://images.viblo.asia/b68c4475-5f79-4f47-8192-fc7193b20911.png)


Đây là giao diện em Konsole khi sử dụng ZSH:

![Giao diện Konsole terminal](https://images.viblo.asia/fcdf5123-f859-469b-b700-393a69b57193.png)


### Cài bộ gõ Tiếng Việt

Bộ gõ phổ biến nhất trên Linux tương tự như Unikey ở Windows chính là IBus-Bamboo. Việc cài đặt cũng đơn giản thôi, chỉ việc copy các dòng lệnh dưới đây (mình copy từ trang github của Bamboo nhé) và chạy trong terminal là xong:

```bash
sudo add-apt-repository ppa:bamboo-engine/ibus-bamboo
sudo apt-get update -y
sudo apt-get install ibus ibus-bamboo --install-recommends
ibus restart
# Đặt ibus-bamboo làm bộ gõ mặc định
env DCONF_PROFILE=ibus dconf write /desktop/ibus/general/preload-engines "['BambooUs', 'Bamboo']" && gsettings set org.gnome.desktop.input-sources sources "[('xkb', 'us'), ('ibus', 'Bamboo')]"
```

Chúng ta có thể đổi chế độ gõ từ English qua Tiếng Việt bằng cách nhấn tổ hợp **Super** + **Space**. Có thể nhấn tổ hợp **Shift** + **~** để hiện các option gõ khác nhau và sửa các lỗi như gạch chân. Nếu cài xong mà Ibus không chạy thì bạn chỉ việc đăng xuất rồi đăng nhập lại là xong nhé.

![Giao diện của IBus Bamboo](https://images.viblo.asia/948bbecf-96c8-4b66-9db2-980994284f46.png)

Giao diện của IBus Bamboo

### Gnome extensions & Touchpad Gesture

#### Vấn đề touchpad gesture

Trên Linux thì chúng ta có 2 desktop environment chính là GNOME và KDE Plasma, cái trước thì khá là giống macOS, còn cái sau thì mang lại trải nghiệm giống Windows, Ubuntu mặc định được cài sẵn GNOME.

Như đã đề cập bên trên, GNOME trên Ubuntu có trình quản lý workspace xài đã hơn Windows rất nhiều, tuy nhiên trên GNOME có 2 loại session manager là Xorg (x11) và Wayland. Vấn đề là Wayland có hỗ trợ touchpad gesture rất tốt nhưng lại không hỗ trợ việc share màn hình. Bên cạnh đó tính năng fractional scaling trên Wayland rất chán, khiến trải nghiệm sử dụng màn hình độ phân giải cao như 2K, 4K trở nên tồi tệ.

Để kiểm tra xem máy bạn đang sử dụng Wayland hay Xorg thì bạn gõ dòng lệnh này:

```bash
echo $XDG_SESSION_TYPE
```

Dòng lệnh trên sẽ in ra session manager tương ứng mà máy bạn đang sử dụng.

Với trường hợp dùng wayland, bạn nên tắt nó đi và quay về x11 chân ái.
Để chuyển từ Wayland về x11 vĩnh viễn thì việc ta cần làm là sửa config của nó bằng cách gõ lệnh này:

```bash
sudo nano /etc/gdm3/custom.conf
```

Sau đó bạn sửa dòng `#WaylandEnable=false` thành `WaylandEnable=false` , rồi nhấn Ctrl + O để lưu và Ctrl + X để thoát, done!

Trong trường hợp bạn vẫn muốn dùng Wayland mà có thể share được màn hình trên Chrome thì có thể fix nhanh bằng cách vào thanh địa chỉ của Chrome, dán đường dẫn này vào: `chrome://flags/#enable-webrtc-pipewire-capturer` , tiếp theo đó bật tính năng này lên. Tuy nhiên nếu bạn sử dụng Slack hay các app khác cần share màn hình như Zoom thì vẫn nên chuyển qua X11 nhé.

Nếu bạn đang dùng X11 hoặc đã chuyển từ Wayland qua X11, thì chúng ta có thể cài thêm Gesture vào bằng 2 cách, 1 là sử dụng extension như [X11 gesture](https://extensions.gnome.org/extension/4033/x11-gestures/) và Touchegg, 2 là dùng tool như [Fusuma](https://github.com/iberianpig/fusuma).
Ở đây mình hướng dẫn dùng extension nhé.

#### Hướng dẫn cài đặt extension cho GNOME

Đầu tiên chúng ta cần cài đặt connection cho trình duyệt (ở đây mình dùng Chrome) để có thể cài extension từ Chrome vào GNOME Shell.

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install chrome-gnome-shell
```

Sau đó chúng ta cài thêm Touchegg, 1 phần mềm bổ sung để chạy extension phía trên

```bash
sudo add-apt-repository ppa:touchegg/stable -y
sudo apt install touchegg -y
systemctl status touchegg.service
```

Sau đó bạn vào link của extension này [X11 gestures](https://extensions.gnome.org/extension/4033/x11-gestures/) để cài và bật nó lên:

![Cài extension trên GNOME](https://images.viblo.asia/453d8c91-f80b-46f8-aee5-ec6e684e42a1.png)
Sau đó cài thêm Touche để tiện cài phím tắt, chẳng hạn vuốt 3 ngón thì sẽ dùng phím tắt tương tự để chuyển workspace hoặc show app...: [https://github.com/JoseExposito/touche](https://github.com/JoseExposito/touche)

Nếu các bạn dùng Fusuma thì có thể tham khảo config của mình:
```yml
swipe:
  3:
    left: 
      command: 'xdotool key super+alt+Right'
    right: 
      command: 'xdotool key super+alt+Left'
    up: 
      command: 'xdotool key super+a'
    down: 
      command: 'xdotool key super'
  4:
  left: 
    command: 'xdotool key alt+Left'
  right: 
    command: 'xdotool key alt+Right'
  up: 
    command: 'xdotool key ctrl+alt+Down'
  down: 
    command: 'xdotool key ctrl+alt+Up'
threshold:
  swipe: 0.4
  pinch: 0.4

interval:
  swipe: 0.8
  pinch: 0.1
```
Mình chia sẻ thêm cho các bạn một số extension hữu ích nữa mà mình đang sử dụng:

- [Notification banner position](https://extensions.gnome.org/extension/4105/notification-banner-position/): Đưa pop up thông báo của Ubuntu từ chính giữa màn hình (middle top) qua bên góc phải màn hình (right - top).
- [Clipboard indicator](https://extensions.gnome.org/extension/779/clipboard-indicator/): Tiện ích này giúp bạn có thể quản lý được nhiều clipboard hơn, giống như **Windows + V** trên hệ điều hành nhà Microsoft hoặc trình quản lý clipboard mặc định trên KDE Plasma.
- [Resource monitor](https://extensions.gnome.org/extension/1634/resource-monitor/) : Hiển thị thông số của máy như RAM, CPU, Network… trên thanh top bar.
- [Unite](https://extensions.gnome.org/extension/1287/unite/) : Tiết kiệm được thêm không gian trên thanh top bar nhờ lược bỏ được thanh title của từng app, đưa tiêu đề của app lên trên thanh topbar của hệ thống.
Update thêm:
- [Blur my shell](https://extensions.gnome.org/extension/3193/blur-my-shell/): Tạo hiệu ứng blur cho giao diện, nhìn đẹp cực nha :v: 
- [Big sur status area](https://extensions.gnome.org/extension/4085/big-sur-status-area/): Tùy biến thanh status bar giống mac os

Đây là kết quả sau khi mình cài hết những extension trên:

![Kết quả sau khi cài extension](https://images.viblo.asia/d716eb87-6e13-4d75-947f-6c7ade466e53.png)

Giao diện sau khi cập nhật:

![Kết quả sau khi cài extension](https://images.viblo.asia/012f560a-4f3e-4bdb-a321-b38154eb1e59.png)


Cài quá nhiều extension khiến bạn không biết quản lý như thế nào ư? Đã có extension manager giúp bạn làm việc đó, hãy cài thêm em nó vào:

```bash
sudo apt install gnome-shell-extension-manager
```

---

![Extension manager](https://images.viblo.asia/18fac49d-d0c6-42cc-88c4-f9ce62c7080c.png)

Đẹp hẳn rồi đấy, giờ thì chúng ta có thể qua phần tiếp theo để cài những phần mềm cần thiết cho việc code nào.

### Cài đặt các phần mềm

[Snap store](https://snapcraft.io/store) là một cửa hàng ứng dụng mà có rất nhiều app hỗ trợ cho nhiều distro khác nhau của Linux, Ubuntu cũng không ngoại lệ. Mặc định từ Ubuntu 16.04 LTS, snap đã được cài sẵn.
Chúng ta có thể cài đặt các app thông qua trang chủ bằng cách download file `.deb` rồi chạy lệnh dpkg mà mình hướng dẫn bên trên, hoặc có thể cài nhanh bằng snap store.
Ở đây mình viết sẵn command để cài 3 app cần thiết là VsCode, Slack và Dbeaver (làm database management tool).

```bash
sudo snap install code --classic
sudo snap install dbeaver-ce
sudo snap install slack
```

### Thiết lập nhiều tài khoản GITHUB khác nhau

Hiện tại thì Github đã không còn cho phép chúng ta push code bằng giao thức HTTPS nữa, mà phải push thông qua SSH, cho nên việc đăng nhập bằng tài khoản và mật khẩu giờ đây đã không còn có thể sử dụng. Công ty mình sử dụng Github, mà mình cũng dùng Github để làm vài dự án cá nhân, contribute cho opensource các thứ, nên việc thiết lập song song 2 tài khoản là điều vô cùng cần thiết.
Thiết lập này mình tham khảo từ [Gist này](https://gist.github.com/oanhnn/80a89405ab9023894df7), mình fork về 1 bản ở đây: [https://gist.github.com/devgiangho/963f8f749963e4e800ccc84ebf6b45e7](https://gist.github.com/devgiangho/963f8f749963e4e800ccc84ebf6b45e7)

Sau khi làm theo hướng dẫn bên trên thì các bạn có thể tham khảo config của mình

```bash
# personal github account: kienmatu
Host github.com-kienmatu
   HostName github.com
   IdentityFile ~/.ssh/id_ed25519
   IdentitiesOnly yes

# work github account: manabie
Host github.com
   HostName github.com
   IdentityFile ~/.ssh/manabie_private_key
   IdentitiesOnly yes
```

Vì sử dụng github cho công việc nhiều hơn nên mình để account công việc là mặc định, vẫn clone bằng SSH như thường, tuy nhiên với account cá nhân thì chúng ta clone như sau:

```bash
git clone git@github.com-kienmatu:kienmatu/togo.git
```

### Hiển thị dấu \* khi nhập mật khẩu trên Linux

Ở đầu phần này mình đã nhắc tới vụ này rồi, ở đây mình sẽ hướng dẫn cách để terminal show ra kí tự \* biểu thị cho việc chúng ta đang nhập mật khẩu.

1. Mở terminal và gõ dòng lệnh sau:

   ```bash
   sudo visudo
   ```

2. Dùng phím lên xuống, hoặc cuộn chuột tới dòng chữ này:

   ```
   Defaults env_reset
   ```

   Sửa dòng này thành giống bên dưới, thêm vào `pwfeedback`

   ```
   Defaults env_reset,pwfeedback
   ```

3. Lưu file lại và thoát ra thôi
4. Kết quả:
![Hiện dấu * khi nhập mật khẩu](https://images.viblo.asia/782ca736-a97c-4605-a4a6-cf0d440e1af7.gif)


## Kết bài

Mặc dù Linux nói chung và Ubuntu nói riêng vẫn còn nhiều điều hạn chế vì là những hệ điều hành Opensource, tuy nhiên tính dễ tùy biến, hỗ trợ nhiều tính năng cho developer đã đưa Linux vào sự lựa chọn ưu tiên của mình khi cài OS để làm việc.
Hi vọng sau bài viết này các bạn sẽ có cái nhìn mới về Linux, cũng như biết cách thiết lập Ubuntu sao cho đáp ứng công việc thật là hiệu quả.
Happy coding !


Bài viết gốc: [https://devgiangho.github.io/quen-mac-hay-windows-di-chan-ai-la-day-huong-dan-thiet-lap-ubuntu-cho-dev](https://devgiangho.github.io/quen-mac-hay-windows-di-chan-ai-la-day-huong-dan-thiet-lap-ubuntu-cho-dev)
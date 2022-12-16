Sau vài ba năm mình chuyển qua code trên Ubuntu thì thật không thể phủ nhận rằng mình đã yêu em nó. Cá nhân mình sử dụng Ubuntu để code web thì thật là tuyệt vời. Thông thường khi develop web trên môi trường Ubuntu, mình dùng VSCode để làm editor, khi cần mở file Photoshop thì up lên [Photopea](https://photopea.com) để cắt giao diện, edit ảnh với thao tác như dùng Photoshop. Mà code thi hiếm khi bị đơ (trừ khi hết RAM). Như vậy cũng khá là ổn. Mặc dù máy cá nhân vẫn cài cả Win + Ubuntu nhưng hầu như chả bao giờ động vào Win cả.

Tuy nhiên, có một vấn đề là sau thời gian vài năm chỉ dùng Ubuntu trên cả máy công ty + máy cá nhân, mình cảm thấy mình như trở thành *người tối cổ*. Trong khi bạn bè chúng nó update Windows 10 ầm ầm (không kể mấy thằng đã có Mac), về nhà thì anh chị em cũng dùng windows. Đôi khi ai đó cần mình support thì mình lại quên hết các command, shortcuts trên Win. Khách gửi file thiết kế như `.xd` thì lại không xem được trên Ubuntu *(thực ra Photopea cũng support nhưng thao tác thì... lag)*. Một số tool audio mình sắp có nhu cầu dùng như FLStudio thì không suport trên Ubuntu nữa.

Nhân tiện thấy anh em nói là bây giờ Windows support "cài cả Ubuntu trên Win"  thế nên là mình quyết định dành vài ngày để setup lại bản Windows trên máy coi sao. Sau đó thì note lại thành bài viết này để chia sẻ cho các anh em cùng cảnh ngộ. Một vài cái chính mình dùng để code trên Ubuntu  mình dự kiến cần setup được trên Win đó là:
- Docker
- Terminal (Konsole)
- ZSH / Fish
- VSCode
- Git
- PHP
- Node.js
- Golang

## Cài đặt Docker + Hyper-V trên Windows 10

Bắt đầu hành trình vọc vạch. Phiên bản Windows đang cài trên máy laptop của mình là Windows 10 Home Single Language theo máy khi mua. Mình bắt đầu download Docker desktop for Windows để cài đặt Docker đầu tiên. Ghé qua trang chủ để tải file cài đặt Docker cho Windows về https://www.docker.com/products/docker-desktop. Ôi thôi, mở file cài đặt thì ăn ngay quả message **Hyper-V feature is required** . Mà cái feature này lại không có trên Windows 10 Home. Quá nhọ! Lại phải cài lại Win và xin ngay được quả key cho Windows 10 Enterprise :D. Thế nên anh em nào muốn dùng docker trên windows 10 thì phải xem xét điều này trước tiên nhé. Cũng may là mình không dùng nên winddows nên cũng chả có gì để backup cả.


Bước tiếp theo sau khi có edition phù hợp, hỗ trợ Hyper-V, mình tiếp tục bật chức năng này lên theo [document](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v) của Microsoft, vắn tắt lại thì cần làm như sau:
- Kiểm tra câu hình yêu cầu: 64bits, RAM từ 4GB, windows pro hoặc enterprise hoặc education
- Mở Powershell với quyền Administrator
- Chạy lệnh sau:
```bash
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```
- Reboot máy là xong

Hoặc nếu thích dùng UI thì:
- `Window + R`, nhập `Control` để vào Control Panel
- Chọn `Programs`, ở mục `Programs and Features` chọn `Turn Windows feature on or off`
- Hộp thoại xuất hiện thì tích chọn Hyper-V, lưu lại rồi reboot là xong

![](https://images.viblo.asia/ca6e79d1-a564-4ff0-8595-ee5c8dccbc62.png)

Sau khi reboot, bật Docker lên và cuối cùng nó cũng đã chạy. Mình thử chạy vài lệnh với docker trên Powershell để kiểm tra và mọi thứ đã OK.
```bash
docker info
docker ps
```

## Cài đặt WSL + cấu hình với Docker

Sau khi cài đặt docker thành công mình cần mang lại Konsole về Windows, chính là terminal mà mình đã từng được nhắc tới trong bài viết [Cách cài đặt zsh và zsh-autosuggestions trên Ubuntu
](https://viblo.asia/p/cach-cai-dat-zsh-va-zsh-autosuggestions-tren-ubuntu-LzD5ddDO5jY) mới đây. Nhớ lại ngày trước mình dùng Git Bash + Cygwin để có cái terminal support mấy lệnh trên Linux, mà dùng thì.. hơi chán.

### Cài đặt WSL và Ubuntu 18.04 trên Windows

Tới thời điểm hiện tại, Windows 10 đã ra mắt [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10). Thấy bảo là hỗ trợ giả lập Linux trên Win, giúp cài mấy cái giả lập Ubuntu để dùng. Thế là mình bắt tay vào làm và đã thành công. Kết quả là mình có một cái terminal chạy Ubuntu ngay trên Windows 10. Có thể cài cắm package vào qua câu lệnh quen thuộc:
```bash
sudo apt-get install
```

Quá trình cài đặt mình thực hiện theo [document](https://docs.microsoft.com/en-us/windows/wsl/install-win10) của Microsoft gồm các bước sau:
- Mở powershell và chạy lệnh sau với quyền Administrator
```bash
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```
- Restart máy

Hoặc có thể cài đặt qua Control Panel tương tự như với Hyper-V: `Control Panel` -> `Programs and Features` -> `Turn Windows Feature on or off` -> Tích chọn `Windows Subsystem for Linux` sau đó restart máy là xong.

Tiếp theo là cài đặt Ubuntu lên win thì thật đơn giản. Không chỉ Ubuntu, để cài đặt một distribution của Linux thì chúng ta chỉ cần truy cập vào Windows Store, chọn cho mình một distribution phù hợp, ở đây thì mình chọn Ubuntu 18.04. Dưới đây là các distribution được support:

![](https://images.viblo.asia/ae26b373-2b46-47ed-95cd-633ef8f97d8d.png)

Sau khi nhấn nút "Get" và quá trình cài đặt thành công, mở Ubuntu 18.04 lên và nó sẽ chạy như là một terminal để mình dùng. Do đó mình không cần cài đặt Konsole như dự tính nữa. Lúc đầu mình nghĩ nó chạy cả giao diện lên nhưng không phải, chỉ phần core thôi. Mình thấy như vậy cũng OK vì dev thì chỉ dùng terminal thôi mà. :wink: 

### Tùy chỉnh Ubuntu

Click chuột phải vào title bar của ứng dụng Ubuntu vừa bật, chọn `Properties` để tinh chỉnh vài thứ về theme, color, background cho cái terminal bắt mắt hơn. Một số option của mình bạn có thể tham khảo:
- Chọn font khác
- Thay đổi cỡ chữ
- Nền để màu đen, trong suốt với tùy chính Opacity

![](https://images.viblo.asia/25df51ee-9165-4f2c-86b3-312c53aaab95.png)
![](https://images.viblo.asia/74010c95-92b8-43f3-9201-b3eba4cceff5.png)
![](https://images.viblo.asia/80fdb5b1-397e-4098-b3d7-f050e86c716d.png)


### Cấu hình docker với WSL

Sau khi có WSL và Ubuntu, tiếp tục thử dụng Docker trong Ubuntu. Tuy nhiên, Docker Desktop đã cài ở trên không tồn tại trong Ubuntu. MÌnh càn cài đặt tiếp Docker vào Ubuntu theo [document](https://docs.docker.com/engine/install/ubuntu/) của Docker dành cho Ubuntu.

Sau khi cài đặt, chạy thử:
```bash
docker ps
```

Một thống báo hiện ra rằng docker chưa chạy: *Docker daemon is not running...*. Thật may mắn vì docker support remote connect giữa các docker host với nhau. Chúng ta chỉ cần tạo một environment variable trong Ubuntu với `DOCKER_HOST` là tcp url tới remote host (chính là Docker Desktop for Windows).
- Click chuột phải vào icon Docker > Settings > Expose daemon in tcp://localhost:2375 without TLS > OK
- Đợi Docker Desktop restart
- Tạo environment variable trong Ubuntu
```bash
echo 'export DOCKER_HOST=tcp://localhost:2375' >> ~/.bashrc
source ~/.bashrc
docker info
```

![](https://images.viblo.asia/7e1d04f8-d621-465a-999a-7cc40ed978aa.png)


**Một vài chú ý quan trọng:**
- Sau khi thực hiện tới đây, một số trường hợp có thể gặp vấn đề việc mount folder vào trong container nhưng khi vào container thi lại không thấy file. Các bạn có thể vào `Docker Desktop` > `Settings` > `Resources` và kiểm tra xem có tích chọn mount phân vùng của bạn vào chưa.
- Khi mount phân vùng vào trong docker, sẽ gặp vấn về file permission. Do các phân vùng trên windows là NTFS, chúng không có phân quyền 777 hay 644 như trên Linux nên chúng ta cần config WSL một chút khi thực hiện mount phân vùng, tạo file như nếu chưa có rồi reboot lại máy. Khi đó chúng ta có thể set permission cho file giống như trên Linux:
```ini:/etc/wsl.conf
[automount]
options = "metadata"
```
- Mặc định khi mount file/folder vào trong Ubuntu WSL thì chúng sẽ có permission là 777. Mình không muốn để full quyền như vậy vì highlight khó nhìn + full permission như vậy có vẻ hơi risk nên mình thường set lại permission về 744.
```bash
sudo chmod -R 744 my-folder
```
- WSL ở trên là version 1, Windows sắp sửa release WSL2 kèm Windows phiên bản mới (build từ 19018+ trở lên). Phiên bản mới windows sắp release tới đó là Windows 10 build 2004. WSL2 được đánh giá với hiệu năng tốt hơn WSL, filesystem tốt hơn, nhanh hơn. Cấu hình mọi thứ đơn giản hơn, hỗ trợ Linux tốt hơn vì WSL2 cần cài đặt Linux Kernel vào máy tính. Mình đã lên và thấy mọi thứ đều ổn, bạn đọc có thể upgrade lên WSL2 giống mình nhé.
- Ubuntu WSL có thể bị lỗi không hiển thị được các biểu tượng đặc biệt, như trên máy mình thì mình cài thêm một fonts khác support powerline symbol vào Windows, sau đó mở mục tùy chỉnh Ubuntu Terminal như ở phần trên để chọn lại font thì sẽ hết bị lỗi. Mình dùng font DejaVu Sans Mono for Powerline trong patch này https://github.com/powerline/fonts

## Cấu đặt VSCode + WSL

VSCode support WSL, mặc định thì VSCode version mới sẽ có kèm WSL extension giúp mở các file thư mục trong Linux Distribution mà chúng ta cài (như mình ở trên là Ubuntu 18.04 WSL). Nếu phiên bản của bạn chưa có thì có thể vào mục Extension để cài nhé. Mình search WSL là nó ra liền. Về cách sử dụng thì chúng ta sẽ:

- Nhấn vào biểu tượng màu xanh góc dưới bên trái của VSCode.
![](https://images.viblo.asia/74449b02-79ce-475e-ac9e-6ed982f2a7b4.png)
- Chọn: `Remote-WSL: New window using Distro...` > `Ubuntu 18.04`
- Cuối cùng, một window mới được mở ra và bắt đặù duyệt file trong Ubuntu
![](https://images.viblo.asia/b57e1640-9dbf-4a0d-b450-1c9b7d603d41.png)

##  Cài đặt Fish-Shell, PHP, Node.js..

Các tool còn lại như PHP, Node.js hay đổi một shell khác mình đều thực hiện cài đặt vào trong Ubuntu WSL như trên Ubuntu thật. Cứ theo document của mỗi cái mà làm theo. MÌnh note lại vào đây để anh em ai đọc có thể làm theo và cài đặt luôn:

### Cài đặt PHP 7.4

Script cài PHP v7.4:

```bash
sudo apt install software-properties-common
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt-get install php7.4
php -v
```

Script cài thêm các extension cần thiết để dùng với Laravel như:

```bash
sudo apt-get install php7.4-mbstring php7.4-curl php7.4-xml php7.4-zip
```

Nếu muốn search một extension khác, dùng lệnh theo mẫu sau để kiếm tra trước khi cài:

```bash
apt-cache search php7.4-extension_name
```

Cài đặt composer:
```bash
curl -s https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
composer about
```

### Cài đặt Fish-Shell + Oh My Fish

- Script cài đặt:
```bash
sudo apt-add-repository ppa:fish-shell/release-3
sudo apt-get update
sudo apt-get install fish
```

- Cấu hình `$PATH` cho các binary của `composer`, `golang`, `yarn` vời `Fish-Shell`...
```bash:~/.config/fish/config.fish
# set composer binaries:
set PATH /home/kimyvgy/.yarn/bin $PATH
set PATH /home/kimyvgy/.composer/vendor/bin $PATH
set PATH /usr/local/go/bin $PATH
```

- Script cài đặt Oh My Fish:
```bash
curl -L https://get.oh-my.fish | fish
omf --version
```

- Xem danh sách theme của Oh My Fish, cài theme ưu dùng của mình với Oh My Fish - [gitstatus](https://github.com/oh-my-fish/theme-gitstatus). Nếu anh em nào dùng ZSH mà thích theme này thì có thể dùng thử theme mình đã tạo cho Oh My ZSh [tại đây](https://github.com/kimyvgy/gitstatus-zsh-theme).
```bash
omf theme
omf install gitstatus 
```


### Cài đặt Node.js với FNM

- Script cài đặt FNM:
```bash
curl -fsSL https://github.com/Schniz/fnm/raw/master/.ci/install.sh | bash
fnm --version
```
- Nếu sau khi chạy script cài FNM thành công mà khi chạy fnm --version lại báo lỗi thì mình cần kiểm tra lại xem đã add `$PATH` cho fnm chưa.
```bash:~/.config/fish/config.fish
# fnm
set PATH /home/kimyvgy/.fnm $PATH
fnm env --multi | source
```

- Cài đặt nhiều phiên bản `Node.js` với fnm, cài đặt `yarn`:
```bash
fnm install 13
fnm install 12

fnm use 13

npm -g install yarn
yarn --version
```

## Cài đặt WSL2

**Cảnh báo:**
- Phiên bản WSL2 + Windows 2004 chưa chính thức ra mắt do đó có thể phát sinh lỗi ngoài ý muốn. Bạn nên cân nhắc trước khi upgrade Windows.
- Khi upgrade cũng đồng nghĩa với cài lại window bản mới, bản này có nhiều thứ mới được update nên thời gian upgrade khá lâu ~1h nên cần có pin và mạng ổn định
- Khi upgrade lên version mới, vẫn có thể dùng tiếp cả WSL1 + WSL2

Sau khi upgrade lên WSL2 mình gặp một vài issues:
- Vấn đề khi làm việc với các thư mục có git trong các phân vùng NTFS được mount vào Ubuntu WSL, các lệnh bị chậm và hơi lag rất khó chịu. Nếu lưu data source code như mình vào trong `~/` thì không bị lỗi này.
- WSL2 sử dụng Hyper-V sẽ bị lỗi full 100% Memory, -> mình limit memory cho WSL2 là không bị nữa:
```ini:%UserProfile%\.wslconfig
[wsl2]
memory=6GB
swap=0
localhostForwarding=true
```
- Một lỗi gặp trên cả WSL, thi thoảng hypernate máy xong mở lên thì Ubuntu mất kế nối với Docker Desktop -> restart lại Docker là được (có thể máy khác không bị)
- Giờ trong Ubuntu WSL bị sai, cách khác phục đó là sử dụng `ntpdate` để tự động sync time:
```bash
sudo apt-get install ntpdate
sudo ntpdate pool.ntp.org
```

Còn lại thì mọi thứ hoạt động tốt với WSL2 + Docker.

### Upgrade Windows build 2004

Bản này chưa release nên muốn cài cần đăng ký tham gia chương trình Insider Program của Microsoft để trải nghiệm trước bằng cách:

- Windows Setings > Update & Security > Windows Insider Program -> Đăng nhập tài khoản Microsoft để hoàn tất. Nên đăng ký ở mức Slow thôi.
- Restart
- Windows Settings > Update & Security > Check updates
- Tiến hành cài bản update windows 2004

### Bật WSL2

Mình tiếp tục thực hiện bật WSL theo [document](https://docs.microsoft.com/en-us/windows/wsl/wsl2-install) của Microsoft.

- Bật WSL2
```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

- Set version 2 cho distro;
```powershell:powershell
PS C:\WINDOWS\system32> wsl -l
Windows Subsystem for Linux Distributions:
Ubuntu-18.04 (Default)
docker-desktop
docker-desktop-data

# wsl --set-version <Distro> 2
wsl --set-version Ubuntu-18.04

# Set default version
wsl --set-default-version 2
```

### Docker + WSL2

Docker cũng support WSL2, để kích hoạt mình đã đổi config thành như sau:
- Tích chọn `Enable the experimental WSL2 based engine`
- Bỏ tích `Expose tcp://localhost:2375`
![](https://images.viblo.asia/dc34682d-7c96-4586-8a70-28befdca80c4.png)
- Bật WSL2 integration với Distro dùng WSL2
![](https://images.viblo.asia/18e6ce8d-d7af-46f0-8dbd-9693a8531789.png)
- Apply & Restart rồi mọi thứ sẽ chạy như bình thường.


Trên đây là các note mà mình đã dùng để setup máy khắc phục một số issue để có trải nghiệm code trên Windows 10 giống như dùng với Ubuntu mà bạn đọc có thể tham khảo. Dưới đây là Ubuntu WSL mà mình đã setup để dùng. Cái terminal trong hình là Tmux được cài sẵn theo Ubuntu và Mac. Cảm ơn mọi người đã đọc hết bài viết này của mình!

![](https://images.viblo.asia/b97c9702-1b14-469b-9c85-2eabc8231661.png)

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***
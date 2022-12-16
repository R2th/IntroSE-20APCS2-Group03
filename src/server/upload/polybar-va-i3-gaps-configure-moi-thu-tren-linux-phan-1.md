# 1. Giới thiệu
Việc có một môi trường desktop mạnh và ổn định là rất tốt cho một lập trình viên có thể hoàn thành công việc của họ một cách hoàn hảo nhất. Bên cạnh đó một yếu tố giúp bản thân mình tập trung hơn khi làm việc đó là giao diện của máy mình, nếu mình có một bố trí (Layout) đẹp cho màn hình, các cửa sổ transparent xếp chồng lên nhau (hoặc là nằm cạnh nhau), thoải mái code trong khi vẫn ngắm nhìn hình nền (background) của bản thân điều đó khiến tinh thần mình rất thoải mái. 

![](https://images.viblo.asia/34be191b-24f4-4a1f-8c69-83f25a400723.png)

Bạn cũng muốn có một Desktop nơi mà mình có thể tự tinh chỉnh mọi thứ theo ý muốn, mềm mại uyển chuyển hay mạnh mẽ dứt khoát, bạn muốn màn hình của bạn sẽ không còn những thanh taskbar cứng nhắc của **Ubuntu** hay những thẻ Terminal nằm chung trong 1 cửa sổ như **Manjaro XFCE** ? Nhưng bạn lại là một người sử dụng truyền thống ? Đã đến lúc thay đổi rồi. Hãy cùng mình cài ngay  **`i3 Window Tilling Manager`** và **`Polybar`** packages để tự tay xây dựng cho mình một Desktop ưng ý ngay nào.

# 2. Các Packages

### 2.1 Linux Window Manager

Như tên gọi Trình quản lý cửa sổ Linux gợi ý, công việc của trình quản lý cửa sổ là điều phối cách hoạt động của các cửa sổ ứng dụng và chúng tự động chạy trên nền hệ điều hành của bạn để quản lý sự xuất hiện và vị trí của các ứng dụng đang chạy.

![Optimized-1632982574.png](https://images.viblo.asia/d4059ee0-f312-4246-b2ad-4e49caa01008.png)

**Một số LWM để bạn lựa chọn** 
* [i3 Window Tilling Manager](https://i3wm.org/)
    * [i3-gaps](https://github.com/Airblader/i3)
    * [i3wm](https://i3wm.org/)
* [dwm](https://dwm.suckless.org/)
* [awesome](https://awesomewm.org/index.html)
* [bspwm](https://github.com/baskerville/bspwm)

Cũng giống với đa số các `packages` khác trong `Linux` như là `picom, neofetch, alacritty, zsh,...`, Tất cả các Window Manager đều có riêng cho mình một `configuration file`(`config`), nơi bạn có thể đặt để những lựa chọn của mình. Hầu hết các `config` đều đã được code sẵn hoặc giới thiệu cho bạn ( trong quá trình cài đặt và hướng dẫn) một phần để bạn tiện cho việc sử dụng ngay lần đầu tiên tải về. Tuy nhiên, sẽ có một số khó khăn cho bạn nào lần đầu tập xài các Window Manager, nhưng đừng nản chí, một khi bạn quen với việc chỉnh sửa `config`, mình tin là bạn sẽ dần bị **nghiện** với WM.

Những tính năng chung của Window Manager.
#### **Layout**
Bạn có thể mở một cửa sổ theo **horizontal** hoặc **vertical**, và có thể chuyển đổi giữa 2 loại này một cách luân phiên và tủy thích (một số các WM hỗ trợ việc tùy chỉnh cho một Window sẽ xuất hiện với tọa độ chính xác nào đó trên màn hình)
#### **Key Binding**:
Tất nhiên rồi, key binding thì ở đâu cũng có nhưng đây là phần quan trọng nhất trong WM, vì ở WM, các bạn thường tương tác trực tiếp với Shell, và thật sự là không có gì trên màn hình để các bạn có thể bấm vào và mở chương trình cả.  Việc sử dụng quen với bàn phím và các phím tắt (hầu hết bạn có thể tự cài để quen hơn) sẽ làm tốc độ code, tốc độ sử dụng máy của bạn tăng lên nhanh chóng. Hãy thử tưởng tượng nếu như ngày xưa bạn có 3 cách. Một là rê con chuột từ đâu đó đến chỗ có icon và mất đến 2 lần click chuột liên tiếp. Hãy thử tưởng tượng các bạn có 2 màn hình, và icon nằm ở màn hình bên trái nhưng con chuột nằm ở màn hình bên phải (quao, xa đấy). Trường hợp thứ 2 là bật terminal lên và gõ vào`<packages>`, rồi đang trong lúc sử dụng lỡ tay tắt đi. Ôi thật là buồn, những thứ chúng ta làm đã bị mất hết. Cuối cùng, các bạn ấn nút `Windows` và gõ tên và `Enter` đây là cách tối ưu trong cả `Window OS` và các distro sử dụng `Desktop Environment (DE)` mà mình biết. Nhưng vẫn không thể nào so sánh được với bạn dùng tổ hợp `Ctrl + Shihft + Y` để mở một cửa sổ `Firefox` mới. Đúng không ạ.

Nói về việc xài WM cho người mới bát đầu thật sự rất khó. Nhưng mình nghĩ nếu các bạn thực sự muốn thì các bạn sẽ làm được mà thôi.


### 2.2 Polybar và Polybar-themes
![](https://images.viblo.asia/9cc40c4e-502d-48a0-aefd-d51749293cd2.png)
![Optimized-1632984603.png](https://images.viblo.asia/04356edb-632c-4ace-991d-613ab5c94e6d.png)

Nhìn vào 2 bức ảnh trên có thể dễ dàng nhận thấy bức ảnh ở dưới có 2 thanh `bar` trên và dưới trông thật đẹp và chứa nhiều thông tin hơn là thanh `bar` tối giản ở trên và `taskbar` bên trái của `Ubuntu 16.04`
![image.png](https://images.viblo.asia/9f5cb889-a4bb-4386-99b7-8767a24c9b5c.png)
![image.png](https://images.viblo.asia/b0f275a1-b082-4922-be12-d87cb0edfe4b.png)
![image.png](https://images.viblo.asia/251cae26-3fd6-4d16-b9ef-3f62ed0d07c6.png)
**Và thậm chí chúng có thể đổi màu dựa theo hình nền của bạn**

"Polybar aims to help users build beautiful and highly customizable status bars for their desktop environment, without the need of having a black belt in shell scripting. Here are a few screenshots showing you what it can look like" - Polybar's developers team.

Nếu các bạn thấy những ô hình bình thành hay hình thang trong 2 cái bar trên desktop của mình, thì chúng được gọi là modules. Có rất nhiều modules được viết sẵn, những modules khác nhau có output khác nhau, có format khác nhau và chức năng khác nhau. Chúng có những thuộc tính thú vị khác nhau được các nhà phát triển dựng nên và bạn có thể tùy chọn những thứ bạn muốn sử dụng.

Một số bạn trên Github đã phát triển các tính năng này và `configure` chúng dưới dạng những modules với một themes nhất định và đồng đều. Repository đó được gọi là [`polybar-themes`](https://github.com/adi1090x/polybar-themes).

Một số Modules có sẵn trong polybar.
##### Launch menu with Rofi
![ezgif.com-gif-maker.gif](https://images.viblo.asia/8bf6e91c-3d56-4f11-9122-8b821363817f.gif)

* `rofi`
* `dmenu`

##### Các module cpu, mount, và memory
![](https://images.viblo.asia/9ed96543-8a5e-40f1-bca4-0fe1189f27c1.png)


Và điều khiến cho mọi người thêm phần thích thú với `polybar` là họ cho phép sự sáng tạo của các bạn lan tỏa, đã có rất nhiều người sử dụng `polybar` tự viết ra `module` cho chính bản thân mình. Một số module rất hay có thể kể đến

*  [Gmail](https://github.com/vyachkonovalov/polybar-gmail)
*  [Crypto](https://github.com/willHol/polybar-crypto)
* [Poly News](https://github.com/zemmsoares/polynews)
* [Unseen Mail](https://framagit.org/DanaruDev/UnseenMail)
* [Battery Level](https://github.com/drdeimos/polybar_another_battery)
* [Browser Media](https://github.com/HackeSta/polybar-browsermediacontrol)
* [Gnome Pomodoro](https://github.com/kantord/i3-gnome-pomodoro)
* [Spotify (with scrolling)](https://github.com/PrayagS/polybar-spotify)
* [PulseEffects Presets](https://github.com/marioortizmanero/polybar-pulseeffects-presets)


##### Khoe một tí
Do mình cũng là người dùng `Polybar` và mình rất tò mò nên cũng đã viết ra được một module dự báo thời tiết như thế này.
![](https://images.viblo.asia/f9f09282-7c7d-4947-a832-6d9ee28a0f20.png) ![](https://images.viblo.asia/7ec6b55a-875b-4e31-9d80-4abe31bb63b7.png)

**Kết quả**
![image.png](https://images.viblo.asia/a6458c28-20e1-4d6f-8e66-900106216d0e.png)
![image.png](https://images.viblo.asia/734f92f6-ccbd-4349-849e-727540881764.png)

[Xem thêm về các module thú vị khác, tại đây](https://github.com/TiagoDanin/Awesome-Polybar)

# 3. Installation
### 3.1 i3

#### 3.1.1 Arch / Manjaro
[Mình dịch theo những gì được viết ở đây](https://linoxide.com/install-i3-window-manager-linux/)

`i3` packages có sẵn trên AUR nên bạn chỉ đơn giản thực hiện

```bash
sudo pacman -S i3
```
Các bạn có thể chọn giữ `i3wm` hoặc `i3gaps`.
*Lưu ý: i3 có bao gồm một i3-bar có sẵn những module bạn muốn nhưng vì trong khuôn khổ bài viết này mình chỉ đề cập đến `polybar` nên mình sẽ không nói về `i3-bar`*

các bạn sửa `~/.xinitrc` như sau
```bash
echo "exec i3" >> ~/.xinitrc
```

Nếu bạn có một window manager khác hoặc desktop enviroment khác đã được cài đặt sẵn *(trong trường hợp này là `gnome` và `xfce` hoặc `kde`)* Bạn có thể chọn i3 là window manager khi ở cửa sổ đăng nhập.

Nếu bạn không có desktop manager để chọn `i3`, hoặc bạn muốn nó là WM độc nhất vô nhị, hãy xóa hoặc comment những dòng liên quan trực tiếp đến WM/DE khác đã được cài đặt trong hệ thống của bạn, kể cả trong `~/.xinitrc` nữa.
Tức nếu bạn chỉ có màn hình màu đen thui với một cái nháy nháy nhỏ nhỏ bắt bạn nhập một lệnh gì đó (giống như khi bạn vừa mới cài đặt `Arch Linux` xong)
Hãy dùng lệnh sau để cài đặt `xorg` cho máy của bạn
 ```bash
 sudo pacman -S xorg-server xorg-xinit
 ```
 sau đó khởi động `i3` bằng cách
 ```bash
 startx
 ```
 
 

#### 3.1.2 Debian / Ubuntu

Về `Ubuntu` thì mình không chắc lắm
Các bạn xem thêm ở [đây](https://linoxide.com/install-i3-window-manager-linux/)

### 3.2 Polybar

#### 3.2.1 Arch / Manjaro

```bash
sudo pacman -S polybar
```


#### 3.2.2 Ubuntu / Debian
```bash
sudo apt-get install polybar
```

#### 3.2.3 Khởi chạy `polybar` (cả 2 distro)

Chạy dòng lệnh để tạo file `launch.sh`
```bash
touch $HOME/.config/polybar/launch.sh
```

Dùng Text Editor bất kỳ copy những dòng sau vào file `$HOME/.config/polybar/launch.sh` 

```bash
#!/usr/bin/env bash

# Terminate already running bar instances
killall -q polybar
# If all your bars have ipc enabled, you can also use 
# polybar-msg cmd quit

# Launch bar1 and bar2
echo "---" | tee -a /tmp/polybar1.log /tmp/polybar2.log
polybar bar1 2>&1 | tee -a /tmp/polybar1.log & disown
polybar bar2 2>&1 | tee -a /tmp/polybar2.log & disown

echo "Bars launched..."
```

Làm cho file `$HOME/.config/polybar/launch.sh` executable

```bash
chmod +x $HOME/.config/polybar/launch.sh
```

Chạy `polybar` bằng cách
```bash
$HOME/.config/polybar/launch.sh
```

# 4. Lời kết
Mình định viết thành 3 phần, phần tiếp theo mình sẽ giới thiệu một tí về cách để tùy chỉnh `config` của i3, và phần cuối là phần tùy chỉnh của `polybar`. Tuy nhiên nếu các bạn hiếu kỳ muốn tự tìm hiểu thì document của 2 packages đều có sẵn và được trích dẫn rất nhiều ở trong bài viết. Hy vong các bạn thích bài viết này và hẹn gặp các bạn trong bài viết tiếp theo.
# Reference
1.[ https://www.tecmint.com/best-tiling-window-managers-for-linux/](https://www.tecmint.com/best-tiling-window-managers-for-linux/)

2.[ https://vietnix.vn/huong-dan-su-dung-ubuntu/](https://vietnix.vn/huong-dan-su-dung-ubuntu/)

3.[ https://github.com/i3/i3](https://github.com/i3/i3)

4.[ https://linoxide.com/install-i3-window-manager-linux/](https://linoxide.com/install-i3-window-manager-linux/)

5.[ https://github.com/Airblader/i3/wiki/installation](https://github.com/Airblader/i3/wiki/installation)

6.[ https://github.com/polybar/polybar](https://github.com/polybar/polybar)
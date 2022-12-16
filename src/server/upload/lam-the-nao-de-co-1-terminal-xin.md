Chào các bợn, mình Hoàng đây.

Nếu coi việc phát triển dự án phần mềm là 1 cuộc chiến tranh, thì các dev chúng ta là những chiến binh. Còn việc các bạn chơi hệ nào thì do các bạn chọn (ví dụ như PHP, JS, Ruby, ...)

Nhưng gần như vũ khí cơ bản nhất của chúng ta không gì khác chính là `terminal` của mình. Vậy làm sao để nó tối ưu cho riêng bản thân mình, làm sao để thay đổi cái màu xấu xí ban đầu cua nó. Cùng mình đi `rèn lại vũ khí` của chúng ta nhé

## Các công cụ sử dụng

- Dracula cho gnome (hoặc mac cũng có bản tương tự nhé)
- ZSH và Oh-my-zsh
- Các plugin hữu dụng cho oh-my-zsh
- Color LS và dracula colors

## 1. Cài đặt dracula cho gnome

Đầu tiên, terminal mặc định của chúng ta sẽ có giao diện như sau.

![](https://images.viblo.asia/aad3e4b9-b676-4536-8912-4aaa5879a3ec.png)


Ở đây mình chọn **dracula cho gnome**, khá là thuận mắt.

```bash
# Cài đặt dconf-cli nhé
sudo apt-get install dconf-cli

# Clone github của dracula về (mình chọn gnome => ubuntu) - Bạn nào dùng mac thì tìm bản mac nhé
git clone https://github.com/dracula/gnome-terminal

# Di chuyển vào thư mục git vừa clone, và cài đặt nó thôi
cd gnome-terminal

./install.sh
```

Các bạn cứ chọn options tương ứng là được nhé. Sau khi chọn xong thì chúng ta sẽ có giao diện terminal mới như sau 😎 Nhìn xịn xò hơn rồi đúng khôngggggg :heart_eyes::heart_eyes::heart_eyes:

![](https://images.viblo.asia/5ca6f954-1083-4dbd-9468-aa4e6f4eebab.png)


Các bạn có thể tham khảo original-link này nếu có thắc mắc gì nhé

[**https://draculatheme.com/gnome-terminal**](https://draculatheme.com/gnome-terminal)

## 2. Cài đặt zsh và oh-my-zsh

Đầu tiên, update ubuntu đã :

```bash
sudo apt-get update

sudo apt upgrade
```

Tiếp theo chúng ta cài đặt các package require nhé

```bash
sudo apt install zsh

# cài đặt các font nhé => ở dưới mình có nhắc đến đó
sudo apt-get install powerline fonts-powerline
```

Clone **oh-my-zsh**

```bash
git clone https://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh
```

Tạo zsh configuration file

```bash
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
```

File config trên sẽ là file chúng ta khai báo các themes và các plugins cho oh-my-zsh nhé. Các bạn nhớ kĩ điều này.

Thay đổi Default Shell từ bash sang **zsh** nha ⇒ Nếu không thay đổi thì bạn sẽ không thấy zsh được dùng đâuuuuu (lưu ý: Sau khi thay đổi thì reset lại máy nhé)

```bash
chsh -s /bin/zsh
```

Thế là chúng ta đã cài đặt xong zsh và oh-my-zsh.

## 3. Cài đặt các plugins và themes cho oh-my-zsh

- ZSH Syntax Highlighting
- ZSH Autosuggestions
- Dracule themes

### ZSH Syntax Highlighting

Clone git project

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $OH_MY_ZSH/plugins/zsh-syntax-highlighting
```

**$OH_MY_ZSH** ở đây chính là thư mục .oh-my-zsh nhé, thường là `~/.oh-my-zsh` :sunglasses::sunglasses:

### ZSH Autosuggestions

Clone git project

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions.git $OH_MY_ZSH/plugins/zsh-autosuggestions
```

Sau khi clone các plugins trong  `$ZSH_CUSTOM/plugins` thì chúng ta chỉ cần khai báo với zsh là có tao cần dùng các plugins trên thôi nhé.

Mở file config của **oh-my-zsh** lên - Các bạn có thể dùng bất cứ trình soạn thảo nào quen với mình nhé. Ở đây mình dùng vim.

```bash
vi ~/.zshrc
```

Tìm đến dòng khai báo plugins trong file

```bash
# Which plugins would you like to load?
# Standard plugins can be found in ~/.oh-my-zsh/plugins/*
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git docker zsh-autosuggestions zsh-syntax-highlighting)
```

Khai báo thêm các plugins mong muốn nhé. Okay, save lại và cùng check phát nào. :open_mouth::open_mouth:

![](https://images.viblo.asia/5c1ab1a4-9ddd-45bd-8688-c00e32a9d696.png)


Okay, ngon rồi. :+1::+1:

### Dracula themes

[**https://github.com/dracula/zsh**](https://github.com/dracula/zsh)

Tiếp theo chúng ta sẽ cài dracule themes cho oh-my-zsh. Nhiều bạn thắc mắc là chúng ta vừa cài cái dracula này rồi mà. Nhưng các bạn ơi, dracula đấy là cho gnome nhé. Còn cái này là themes cho oh-my-zsh nha

**Clone dracula themes về nhé**

```bash
git clone https://github.com/dracula/zsh.git
```

Sau khi clone, chúng ta sẽ link vào trong themes của oh-my-zsh nhé.

```bash
ln -s $DRACULA_THEME/dracula.zsh-theme $OH_MY_ZSH/themes/dracula.zsh-theme
```

**$DRACULA_THEME :** là đường dẫn của directiory dracula bạn vừa clone về.

**$OH_MY_ZSH :** là đường dẫn của .oh-my-zsh nhé (như mình vừa trình bày bên trên).

Sau khi link xong thì chúng ta chỉ cần mở file config của oh-my-zsh lên và khai báo thôi nhé.

```bash
vi ~/.zshrc
```

```bash
# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="dracula"
```

Chúng ta lưu lại và **restart terminal** nhé.

Vola

![](https://images.viblo.asia/d998229d-1970-4fbc-8d97-49ba464f599b.png)


Chúng ta đã có được terminal như sau. Rất xịn xò và đẹp mắt đúng không nào các bạn mình ơi. :kissing_heart::kissing_heart:

## 4. Color LS và dracula color

Tiếp theo chúng ta sẽ cài đặt color ls + dracula cho terminal

**Color ls**: [https://github.com/athityakumar/colorls](https://github.com/athityakumar/colorls)

**Dracula color**: [https://github.com/dracula/colorls](https://github.com/dracula/colorls)

Các bạn có thể vào 2 link trên để tham khảo rõ hơn nhé.

### Cài đặt color ls

* Install ruby (do thanh niên color ls này là 1 gem nên phải cài ruby trước nhé - Nếu bạn nào chưa cài thì mình có [bài viết ở đây hướng dẫn](https://hoangpn.com/p/cai-dat-rvm-ruby-rails-tren-ubuntu-ver-18-va-20) nhé)

* Install 1 số font nhé (**Nếu các bạn làm theo step ở bên trên thì chúng ta đã install sẵn rồi nha**), tham khảo thêm tại [https://github.com/ryanoasis/nerd-fonts/blob/master/readme.md](https://github.com/ryanoasis/nerd-fonts/blob/master/readme.md)

* Install gem color ls thôi `gem install colorls`

![](https://images.viblo.asia/9fe6fc72-5045-4670-ae37-d7132407a6d3.png)


Để sử dụng được câu lệnh colorls chúng ta cần thêm `source` vào file **config zsh** bên trên nhé

```bash
source $(dirname $(gem which colorls))/tab_complete.sh
```

Sau khi source xong chúng ta check thử nhé

```bash
colorls -l 
```

![](https://images.viblo.asia/6bb92467-879f-4b87-ae94-551390a1e531.png)


Chúng ta có thể thay đổi các icon và màu sắc tương ứng nhé - tham khảo link github của **color ls** nha 

### Cài đặt dracula color

* Clone github của dracula color về nhé 

```bash
git clone [git@github.com](mailto:git@github.com):dracula/colorls.git
```

![](https://images.viblo.asia/29f6b0b2-74f5-4f5e-8060-820ef3c09836.png)


* Sau đó chúng ta tạo thư mục **colorls** trong **config** nhé

```bash
mkdir ~/.config/colorls/
```

Okay, giờ chúng ta chỉ cần copy file yml trong repo git vừa clone về vào trong thư mục config chúng ta vừa tạo là được nha

```bash
cp ~/colorls/dark_colors.yaml ~/.config/colorls/dark_colors.yaml
```

Cùng thử thành quả nào

```bash
colorsls -l
```

![](https://images.viblo.asia/a4146525-2f53-4ec8-ace2-4298a14a7d69.png)

![](https://images.viblo.asia/57f12f2d-c591-48e7-9fa7-2e73a1a5019d.png)


Nhìn xịn xò hơn hẳn rồi đúng không nào, ngoài ra **colorsls** còn có 1 số kiểu xem khác khác hay, các bạn tham khảo thêm trên github của colorls nha

## Kết

- Ngoài các plugins mình hướng dẫn trên thì còn có rất nhiều plugins khác thuận tiện cho các bạn như **ruby, php, docker**, .... Hay các themes khác mà bạn mong muốn.

- Các bạn chỉ cần ghi nhớ là chúng ta cần **clone các themes( plugins)** về và **khai báo chúng trong file `~/.zshrc`**

- Bên cạnh đó terminal sẽ mạnh mẽ hơn rất nhiều nếu các bạn có thể sử dụng các tiện ích khác của chúng ví dụ như **tmux** (chia layout màn hình, ...).

:100::100::100::100:

Mong các bạn có 1 terminal vừa ý mình nhé.

Bất kỳ đóng góp gì hãy comment cho mình biết nha. !!!!!

___

Ủng hộ mình với cách đọc bài viết gốc nha...:point_down::point_down::point_down:

https://hoangpn.com/p/lam-the-nao-de-co-1-terminal-xin
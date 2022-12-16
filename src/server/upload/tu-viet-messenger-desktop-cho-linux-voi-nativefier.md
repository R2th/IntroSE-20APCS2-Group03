# Nguyên nhân

Mình không dùng Facebook nhiều mà chỉ dùng mỗi Messenger để nhắn tin chat chit cho công việc và bạn bè - Mặc dù mình thích thằng [Telegram](https://telegram.org/) hơn, ngon hơn thằng Messenger của anh Mark 3000 lần. Thằng Messenger thì hiện tại hình như bên Windows thì đã có Official rồi thì phải, còn bên Linux như con ghẻ, chả có gì, toàn phải dùng bản Web App. Mỗi lần sử dụng toàn phải tìm lại trong đống tab của mình. Nên mình tim hiểu tự làm một cái thử xem. Sau một lhời gian tìm hiểu thì thấy có một package làm giúp cho mình việc này, **tất nhiên nó không phải là native app, mà làm wrapper của Electron.**

# [Nativefier](https://github.com/jiahaog/nativefier)

[Nativefier](https://github.com/jiahaog/nativefier) là một wrapper của Electron dùng để tạo D**esktop Application** cho Linux và các platform khác. Tuy nhiên mình chỉ dùng cái này trên Linux thôi nên không test được ở platform khác nha. Ngoài ra, có thể vọc vạch thêm một chút cho application này, ví dụ như **inject javascript hay css**.

![https://raw.githubusercontent.com/jiahaog/nativefier/HEAD/docs/walkthrough.gif](https://raw.githubusercontent.com/jiahaog/nativefier/HEAD/docs/walkthrough.gif)

## Cài đặt và cách sử dụng

Cài đặt package này, rồi gắn global flag rồi để sau này có gì sử dụng cho nó tiện cũng được. Nếu không thì bỏ cái global flag ra cũng ok.

```bash
sudo npm i nativefier -g
```

Sử dụng thì đơn giản cực kỳ. Sử dụng nativefier để convert web app [messenger.com](http://messenger.com) cho platform linux. 

```bash
nativefier https://www.messenger.com -p linux
```

Sau khi chạy command này xong thì nativefier sẽ generate ra một folder là `Messenger-linux-x64`

![](https://images.viblo.asia/321a83e8-d0d2-46e9-b71f-940169fc9386.png)

Tới lúc này thì start lên với câu lệnh

```bash
./Messenger.com
```

Thế là xong, có một Desktop Application rồi.

# Mở rộng

Tất nhiên là nếu như vậy không thôi thì cũng không tận dụng hết được tính năng của Nativefier. Ở đây thì mình sẽ mở rộng thêm một chút, mình sẽ làm Dark Mode cho con ứng dụng ghẻ của mình. Electron là một framework dùng để build desktop application bằng html, css, javascript. Thì thằng nativefier này được build dựa trên thằng electron. Như vậy thì muốn thay đổi giao diện của ứng dụng thì chỉ việc add thêm dark mode css là xong. Để inject được css trong natifier thì dùng flag —inject. Vì thế mình sửa code lại một tí.

```bash
nativefier https://www.messenger.com -p linux --inject dark.css
```

Sau đó vào trong `Messenger-linux-x64/resources/app/inject` ****để sửa file `dark.css` như sau. Mình bợ của anh nào đấy trên github 

[](https://raw.githubusercontent.com/ducfilan/Dark-mode-Franz-Ferdi/master/messenger/darkmode.css)

Thế là có một Messenger Dark Mode Desktop Application rồi.

Các bạn có thể xem thêm các API hay ho khác của Nativefier ở đây nhé. Còn nhiều thứ hay ho có thể dùng lắm.

Đến đây thì có vẻ như chưa đủ, mình còn phải tạo shortcut cho nó để bấm là chạy nữa chứ. Lúc này thì phải dùng một số câu lệnh SHELL của Linux.

Đầu tiên là tạo shortcut cho nó tên là `shortcut.sh`

```bash
#!/bin/sh
set -e
WORKING_DIR=`pwd`
THIS_PATH=`readlink -f $0`
cd `dirname ${THIS_PATH}`
FULL_PATH=`pwd`/Lotion
cd ${WORKING_DIR}
cat <<EOS > Messenger.desktop
[Desktop Entry]
Name=Messenger
Name[en_US]=Messenger
Comment=Unofficial Facebook Messenger application for Linux
Exec="${FULL_PATH}/Messenger"
Terminal=false
Categories=Social
Type=Application
Icon=${WORKING_DIR}/icon.png
StartupWMClass=Messenger
EOS
chmod +x Messenger.desktop
## This can be updated if this path is not valid. 
cp -p Messenger.desktop ~/.local/share/applications
```

Tiếp theo là tạo file `install.sh`

```bash
#!/bin/bash
PD=`pwd`
INSTALL_DIR=$PD"/Messenger"
echo $INSTALL_DIR
mkdir -p $INSTALL_DIR
tar xvf $PD/Messenger-linux-x64.tar.xz -C $INSTALL_DIR --strip 1
/bin/bash $PD/shortcut.sh
```

Rồi làm nốt file `remove.sh` cho nó đủ bộ

```bash
#!/bin/bash
PD=`pwd`
INSTALL_DIR=$PD"/Messenger"
rm -r $INSTALL_DIR
rm ~/.local/share/applications/Messenger.desktop
```

# Kết luận

Trên đây đơn giản chỉ là một package giúp mình convert một Web App ra Desktop App. Tuy nhiên, nếu Custom tốt thì cũng không đến nổi nào. Ngoài ra thì mình có thể xài thằng này để làm một số App cho mình, ví dụ như thằng Zalo, hay Whatsapp. Cũng là một ứng dụng, vì có app vẫn thích hơn là dùng browser.

Các bạn có thể xem repo tại GIthub của mình nhé.
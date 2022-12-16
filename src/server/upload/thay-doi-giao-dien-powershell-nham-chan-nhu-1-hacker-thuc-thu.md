# Thay đổi giao diện `powershell` thường ngày trở nên thú vị hơn và biến bạn thành 1 ~~hacker~~ :detective:

Có lẽ đối với một developer thì việc tiếp xúc với giao diện `cmd` đã là quá quen thuộc với chúng ta. Nó như một người bạn gái luôn bên ta giúp ta bắt đầu một website, một ứng dụng, nhắc nhở ta khi có log hoặc thậm chí `shutdown` luôn ứng dụng của ta khi giận dỗi. Vui buồn đều bắt đầu từ nó. Vậy nên, việc "chăm sóc", trang trí cho người bạn gái mình thêm lung linh hơn để mọi cuộc vui điều trở nên thú vị là một việc rất đáng phải không :). 

Chém gió vậy đủ rồi :grin: bài viết này mình sẽ hướng dẫn cách trang trí giao diện `powershell` và `Ubuntu` (WSL).

### Thành quả mình sẽ đạt được
*Từ* :frowning:
 ![](https://images.viblo.asia/ff50f771-e7fb-4bb3-9087-6ec3f4544a43.png)
:point_down:

*Thành* :laughing:
| Powershell | Ubuntu |
| -------- | -------- | -------- |
| ![](https://images.viblo.asia/1bbe7d63-0e7d-4fe2-bd6d-ed94b2df6545.png)   | ![](https://images.viblo.asia/e48afd7d-2ddc-4693-8df8-7e113ff74684.png)   |

* * *

#### Đầu tiên các bạn cần phải cài đặt một số thứ để tiếp tục
Ở bài viết này mình sẽ thực hiện trên **Window Terminal** do nó hỗ trợ customize giao diện nhiều và mình cũng rất thích command trên này do có thể mở nhiều tab cùng lúc. Bạn có thể tải nó từ Windows Store. 

***Note***: bạn vẫn có thể thực hiện trên  **Powershell** nếu không có **Window Terminal** nha.

1. **Cài đặt git** cho Windows [ở đây](https://git-scm.com/downloads) 
2. **Bộ font để có thể hiển thị các icon trên giao diện cmd**
    
    Mở `cmd` để clont bộ font  hoặc bạn có thể tải dưới dạng zip [ở đây](https://github.com/powerline/fonts)
    ```powershell
    git clone https://github.com/powerline/fonts.git --depth=1
    ```
    Sau đó bạn mở folder vừa tải về và chạy lệnh sau bằng `powershell`
    ```
    ./install.ps1
    ```
 
    ( quá trình có thể mất một lúc để cài fonts )
3. **Cài đặt WSL cho các bạn muốn dùng Terminal của Linux trên Window**  ( Windows Subsystem for Linux ), điều này có thể giúp các bạn code backend chạy server ngay trên Windows rất hay. Bạn có thể xem thêm và tải [ở đây](https://ubuntu.com/wsl)
4. **Window Terminal** [ở đây](https://www.microsoft.com/en-us/p/windows-terminal-preview/9n0dx20hk701?activetab=pivot:overviewtab)

Ok sau khi đã hoàn tất các bước trên thì mình bắt tay vào phần chính.
## 1. Powershell
- Cài đặt **posh-git** và **[oh-my-posh](https://github.com/JanDeDobbeleer/oh-my-posh?WT.mc_id=-blog-scottha#installation)** ( giống như **oh-my-zosh** trên Linux )

Các bạn mở `powershell` lên và chạy lệnh như sau:

```cmd
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Install-Module posh-git -Scope CurrentUser
Install-Module oh-my-posh -Scope CurrentUser
```
- Sau đó cài đặt để thay đổi giao diện trên `powershell`
Tiếp tục chạy các lệnh sau
```cmd
# Start the default settings (might not work so optional)
Set-Prompt
# Set-up file  profile để thay đổi giao diện cho powershell
notepad $PROFILE
```

Sau khi file mở lên thì các bạn *thêm ba dòng này* vào cuối file ( trường hợp file chưa có thì các bạn cứ tạo mới file nha )
```
Import-Module posh-git
Import-Module oh-my-posh
Set-Theme Paradox
```
![](https://images.viblo.asia/c5b48777-a7f5-411b-853b-0c7d1be257eb.png)

Sau đó các b sẽ có thành quả :) trên **Window Terminal**
![](https://images.viblo.asia/1bbe7d63-0e7d-4fe2-bd6d-ed94b2df6545.png)

Lưu ý: Trên **Window Powershell** thì có thể nhìn khác một chút nha.
Nếu như bị lỗi icon thì các bạn vào setting của Powershell và chọn font `MesloLGS` nha. Nếu thiếu bạn có thể cài đặt font [ở đây ](https://github.com/ryanoasis/nerd-fonts). Ngoài ra bạn có thể xem thêm các [theme khác](https://github.com/JanDeDobbeleer/oh-my-posh?WT.mc_id=-blog-scottha#themes).


## 2. Ubuntu ( trên Windows Terminal Preview )
Các bạn mở một tab Ubuntu trên **Terminal**
![](https://images.viblo.asia/0d3a5bc1-06fa-4fea-9842-880028d6176f.png)

- Cài đặt **zsh**

```
sudo apt-get install zsh curl git
```

- Cài đặt **oh-my-zosh**

```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

- Sau khi cài đặt oh-my-zosh xong ta sẽ cài đặt **[powerlevel10k](https://github.com/romkatv/powerlevel10k)** để thay đổi giao diện.

```
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k
```

- Sau đó thiết lập theme cho zsh là **powerlevel10k** 
Ở đây mình sẽ dùng VS Code để thay đổi file config, bạn có thể dùng các text editor khác để chỉnh nha.

```
code ~/.zshrc
```

Sau đó tìm dòng `ZSH_THEME=` và set thành `ZSH_THEME=powerlevel10k/powerlevel10k`. Lưu lại và restart lại terminal.
Lúc này màn hình sẽ hiện các setting để bạn tinh chỉnh giao diện theo ý mình, các bạn cứ làm theo nha khá đơn giản.
![](https://images.viblo.asia/5121490f-8d22-4871-9c46-d12ba9f74901.png)

## 3. Bonus
Nếu sử dụng **Window Terminal** thì b có thể thay đổi ảnh nền cho sinh động nha.

Các bạn mở setting trong  **Window Terminal** lên và dán đè lên như sau ( lưu lại file setting cũ nếu cần backup nha )

```text
{
  "$schema": "https://aka.ms/terminal-profiles-schema",
  "defaultProfile": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
  "profiles": [
    {
      "acrylicOpacity": 0.9,
      "closeOnExit": true,
      "colorScheme": "One Half Dark",
      "backgroundImage": "E:\\terminal_background2.gif",
      "backgroundImageOpacity": 0.2,
      "backgroundImageStretchMode": "uniformToFill",
      "commandline": "powershell.exe",
      "cursorColor": "#FFFFFF",
      "cursorShape": "bar",
      "fontFace": "MesloLGS NF",
      "fontSize": 14,
      "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
      "name": "Windows PowerShell",
      "hidden": false,
      "padding": "0, 0, 0, 0",
      "snapOnInput": true,
      "startingDirectory": "%USERPROFILE%",
      "useAcrylic": true
    },
    {
      "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
      "backgroundImage": "E:\\terminal_background3.gif",
      "backgroundImageOpacity": 0.2,
      "fontFace": "MesloLGS NF",
      "backgroundImageStretchMode": "uniformToFill",
      "name": "cmd",
      "commandline": "cmd.exe",
      "hidden": false
    },
    {
      "guid": "{b453ae62-4e3d-5e58-b989-0a998ec441b8}",
      "hidden": false,
      "name": "Azure Cloud Shell",
      "source": "Windows.Terminal.Azure"
    },
    {
      "acrylicOpacity": 0.9,
      "closeOnExit": true,
      "backgroundImage": "E:\\terminal_background3.gif",
      "backgroundImageOpacity": 0.2,
      "backgroundImageStretchMode": "uniformToFill",
      "colorScheme": "Solarized Dark",
      "commandline": "wsl",
      "cursorColor": "#FFFFFF",
      "cursorHeight": 25,
      "cursorShape": "vintage",
      "fontFace": "MesloLGS NF",
      "fontSize": 14,
      "guid": "{c6eaf9f4-32a7-5fdc-b5cf-066e8a4b1e40}",
      "hidden": false,
      "name": "Ubuntu-18.04",
      "source": "Windows.Terminal.Wsl",
      "padding": "0, 0, 0, 0",
      "snapOnInput": true,
      "useAcrylic": true,
      "startingDirectory": "%USERPROFILE%"
    },
    {
      "guid": "{2c4de342-38b7-51cf-b940-2309a097f518}",
      "hidden": false,
      "fontFace": "MesloLGS NF",
      "backgroundImage": "E:\\terminal_background.gif",
      "backgroundImageOpacity": 0.2,
      "backgroundImageStretchMode": "uniformToFill",
      "name": "Ubuntu",
      "source": "Windows.Terminal.Wsl"
    }
  ],
  "schemes": [
    {
      "background": "#282C34",
      "black": "#282C34",
      "blue": "#61AFEF",
      "brightBlack": "#5A6374",
      "brightBlue": "#61AFEF",
      "brightCyan": "#56B6C2",
      "brightGreen": "#98C379",
      "brightPurple": "#C678DD",
      "brightRed": "#E06C75",
      "brightWhite": "#DCDFE4",
      "brightYellow": "#E5C07B",
      "cyan": "#56B6C2",
      "foreground": "#DCDFE4",
      "green": "#98C379",
      "name": "One Half Dark",
      "purple": "#C678DD",
      "red": "#E06C75",
      "white": "#DCDFE4",
      "yellow": "#E5C07B"
    },
    {
      "background": "#073642",
      "black": "#073642",
      "blue": "#268BD2",
      "brightBlack": "#002B36",
      "brightBlue": "#839496",
      "brightCyan": "#93A1A1",
      "brightGreen": "#586E75",
      "brightPurple": "#6C71C4",
      "brightRed": "#CB4B16",
      "brightWhite": "#FDF6E3",
      "brightYellow": "#657B83",
      "cyan": "#2AA198",
      "foreground": "#FDF6E3",
      "green": "#859900",
      "name": "Solarized Dark",
      "purple": "#D33682",
      "red": "#D30102",
      "white": "#EEE8D5",
      "yellow": "#B58900"
    }
  ],
  "keybindings": []
}
```

Các bạn thay các `backgroundImage` trong profiles tới đường dẫn hình ảnh ( cả file **.gif** )  trên máy các bạn là được nha. [Gif của mình cho bạn nào cần](https://res.cloudinary.com/practicaldev/image/fetch/s--LBM53ShP--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/3u7x3b3otmyh6kytychp.gif).

### Kết
Bài viết khá dài do lần đầu mình làm cũng khá chật vật nên cũng muốn hướng dẫn rõ cho các b để dễ dàng thành công hơn :))). 
Nếu có chỗ nào cần hỗ trợ các b cứ cmt mình sé support and... nếu bài viết bổ ích các b cho mình một vote :point_up_2: để có động lực viết thêm nhiều bài nữa nha. :kissing_heart:

Chúc các b thành công và có thêm nhiều cảm hứng hơn khi làm việc với "cô bạn gái mới :woman:" của mình nha :)))

**Ref**:

- https://medium.com/@vhanla/agnoster-like-theme-for-powershell-95d257ba9ba8
- https://medium.com/@hjgraca/style-your-windows-terminal-and-wsl2-like-a-pro-9a2e1ad4c9d0
- https://dev.to/expertsinside/how-to-customize-the-new-windows-terminal-with-visual-studio-code-56b1
- https://github.com/romkatv/powerlevel10k
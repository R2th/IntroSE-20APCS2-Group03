Có rất nhiều tuỳ chọn để bạn thay đổi Terminal của mình, nhưng chúng tôi không muốn phải bỏ ra hàng giờ để làm việc đó, vậy nên chúng tôi sẽ giúp bạn có trải nghiệm Terminal sau chỉ với 7 phút:

* Hiển thị trạng thái của git tốt hơn
* Code nhanh hơn với autocompletions
* Thoải mái hơn trong việc code mỗi ngày

Nếu có bất kì góp ý nào, hãy để lại comment dưới bài này nhé ;)

#### Bật mí 1 chút thành quả sau khi thực hiện

![](https://cdn-images-1.medium.com/max/800/1*HR2axSnawYpDNSlPZRy0wA.png)
## Các bước thực hiện

### 1. Cài đặt và cấu hình iTerm2

```
$ brew install --cask iterm2
```

Chúng tôi dùng iTerm2 vì màu sắc của nó chân thực hơn so với Terminal mặc định để mang lại trải nghiệm tốt hơn.

##### Chọn bảng màu cho Iterm2 của bạn. 
* Bạn có thể sử dụng [màu của Clovis](https://raw.githubusercontent.com/Clovis-team/clovis-open-code-extracts/master/utils/Clovis-iTerm2-Color-Scheme.itermcolors) (giống với hình chụp ở đầu bài).
* Hoặc lựa chọn ở [opensource iTerm2 color schemes](https://iterm2colorschemes.com/) và download ở [preset’s file](https://github.com/mbadolato/iTerm2-Color-Schemes/tree/master/schemes).

##### Áp dụng bảng màu trong iTerm2
```
iTerm → Preferences → Profiles → Colors → Color presets → Import
```
```
→  Color presets → file bảng màu của bạn
```
![](https://cdn-images-1.medium.com/max/1600/1*-ewoBb3M1lsQWyuy7WvF-w.png)

### 2. Cài đặt phông chữ còn thiếu
Phông chữ ở đây là phông chữ được iTerm2 sử dụng để hiển thị các ký tự đặc biệt như các mũi tên và biểu tượng git.
![](https://cdn-images-1.medium.com/max/1600/1*xCYq2efusqeW5cg-tLYCaQ.png)

<br>

##### Tải xuống và cài đặt phông chữ
* [Meslo](https://github.com/powerline/fonts/blob/master/Meslo%20Slashed/Meslo%20LG%20M%20Regular%20for%20Powerline.ttf) (font chữ trong ảnh minh hoạ). Nhấp vào "view raw" để tải phông chữ.
* [Source Code Pro](https://github.com/powerline/fonts/blob/master/SourceCodePro/Source%20Code%20Pro%20for%20Powerline.otf) có sự liên kết tốt hơn cho glyphs @14px.
* [Các font chữ khác](https://github.com/powerline/fonts)

Mở phông chữ đã tải xuống và nhấn “Install Font” trên máy tính của bạn.

<br>

##### Thêm phông chữ trong iTerm2

```
iTerm2 → Preferences → Profiles → Text → Change Font
```
![](https://cdn-images-1.medium.com/max/1600/1*BZkmXHh80z_i5vxWh5HQcQ.png)

### 3. Cài đặt Zsh và Oh my Zsh
![](https://cdn-images-1.medium.com/max/1600/1*7inD8Cq3yU_GKGbizyFutg.png)

Zsh là một trình shell cung cấp nhiều tính năng như điều hướng các file và thư mục tốt hơn. Để cài đặt nó:

```
brew install zsh zsh-completions
```
Oh my Zsh là một framework Zsh, bạn có thể đọc thêm ở đây: github.com/robbyrussell/oh-my-zsh.

Để cài đặt nó:
```
$ sh -c "$ (curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```
Trong các bước tiếp theo, bạn sẽ cần phải chỉnh sửa file `~/.zshrc` được chạy khi thiết bị khởi động.

### 4. Thêm theme Powerlevel9k Zsh
![](https://cdn-images-1.medium.com/max/1600/1*xCYq2efusqeW5cg-tLYCaQ.png)

Theme Powerlevel9k zsh thêm nhiều tính năng khác như thông tin code, thời gian...

Để cài đặt nó chạy:
```
$ git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
```

Sau đó chỉnh sửa file `~/.zshrc` và set

```
ZSH_THEME="powerlevel9k/powerlevel9k"
```

### 5. Những cài đặt cuối cùng
* dấu nhắc ngắn hơn
* bật điều hướng trình chỉnh sửa văn bản
* tự động đề xuất
* highlight cú pháp
* dòng mới sau mỗi câu lệnh 
* Thay đổi màu của trạng thái cảnh báo git
* Thay đổi màu của tab Iterm2

<br>

##### Dấu nhắc ngắn hơn
Ở đây bạn có thể loại bỏ tên người dùng @hostname và thông tin không cần thiết + đặt dòng code xuống dòng:

*Trước đây*
![](https://cdn-images-1.medium.com/max/800/1*nqh3bSDUYSBxjDWUgFSwLw.png)
*Bây giờ*
![](https://cdn-images-1.medium.com/max/800/1*jCBFWhLKkCz4dCFOJ2DTpQ.png)

Thêm vào file `~/.zshrc` của bạn:

```
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(dir rbenv vcs)
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(status root_indicator background_jobs history time)
```
Để contror xuất hiện ở dòng mới
```
POWERLEVEL9K_PROMPT_ON_NEWLINE=true
```

Để kí tự `$` đẹp hơn

```
# Add a space in the first prompt
POWERLEVEL9K_MULTILINE_FIRST_PROMPT_PREFIX="%f"
# Visual customisation of the second prompt line
local user_symbol="$"
if [[ $(print -P "%#") =~ "#" ]]; then
    user_symbol = "#"
fi
POWERLEVEL9K_MULTILINE_LAST_PROMPT_PREFIX="%{%B%F{black}%K{yellow}%} $user_symbol%{%b%f%k%F{yellow}%} %{%f%}"
```

Đọc thêm về POWERLEVEL9K ở đây: https://code.tutsplus.com/tutorials/how-to-customize-your-command-prompt--net-24083

<br>

##### Bật thanh điều hướng văn bản
###### Con trỏ
![](https://cdn-images-1.medium.com/max/1600/1*wyUWoCDeiHJE7V-HEmclkg.png)

```
iTerm2 → Preferences → Profiles → Text
→ Cursor : ✓ Vertical Bar 
→ Blinking cursor : ✓ ON
```
![](https://cdn-images-1.medium.com/max/1600/1*BZkmXHh80z_i5vxWh5HQcQ.png)
###### Điều hướng với bàn phím

Mặc định, bạn sẽ duyệt qua từ với (option + → or ←) và xoá từ với option + backspace), nhưng trong iTerm2 nó sẽ không bật sẵn. Bạn cần mở nó lên:
```
iTerm → Preferences → Profiles → Keys → Load Preset… → Natural Text Editing
```
![](https://cdn-images-1.medium.com/max/1600/1*PBDetWpgW4VXpr-0SmUXdA.png)

Khởi động lại iTerm2 để lưu lại những thay đổi.

<br>


#### Đề xuất tự động (cho Oh My Zsh)
Plugin này gợi ý các lệnh bạn đã sử dụng trong lịch sử. Bạn chỉ cần gõ → để điền hoàn toàn!

![](https://cdn-images-1.medium.com/max/1600/1*byEErAY20uZGYsXI0T14MQ.png)

```
$ git clone https://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions

Note: $ZSH_CUSTOM/plugins path is by default ~/.oh-my-zsh/custom/plugins
```
Thêm plugin vào file `~/.zshrc`
```
plugins=(
    …
    zsh-autosuggestions
)
```
Mở 1 session terminal mới để trải nghiệm.

Đọc thêm về nó ở đây: github.com/tarruda/zsh-autosuggestions#oh-my-zsh

<br>


#### Highlight cú pháp
![](https://cdn-images-1.medium.com/max/1600/1*la_o-lG9oe0dzbSWNxv6IA.png)
Highlight cho phép bạn nhìn các dòng code với màu sắc đẹp và dễ dùng hơn, nó cũng hiển thị những câu lệnh đã từng được lưu với shell của bạn
```
$ brew install zsh-syntax-highlighting
```

Sau khi cài đặt, thêm dòng sau vào file `~/.zshrc`
```
source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
```
Sau đó khởi động lại terminal. Source file `~/.zshrc` bằng câu lệnh `source ~/.zshrc` để bắt đầu sử dụng plugin này

<br>

#### Thêm dòng trống

Trước đây
![](https://cdn-images-1.medium.com/max/1600/1*-Roc94tb5pEPAkKul9FBpA.png)

Sau khi thêm
![](https://cdn-images-1.medium.com/max/1600/1*OEEvmlEiZ8kia50ijK-gTA.png)

Thêm dòng sau vào file `~/.zshrc`:

```
POWERLEVEL9K_PROMPT_ADD_NEWLINE=true
```

<br>

#### Đổi màu cảnh bảo git

Trước đây
![](https://cdn-images-1.medium.com/max/1600/1*ZNc2UsmF4RCw_uev37o1bA.png)

Sau khi thêm
![](https://cdn-images-1.medium.com/max/1600/1*CuXZ7ypMtFyrlqO8ARf83w.png)

Thêm dòng sau:
```
POWERLEVEL9K_VCS_MODIFIED_BACKGROUND=’red’
```
<br>

#### Đổi màu các tab của iTerm2

![](https://cdn-images-1.medium.com/max/1600/1*jv9oRgRRwPyuNjRk6iNqgw.png)

*Giao diện cuối cùng chưa quá hoàn hảo, nhưng đã tốt hơn rất nhiều*

Thêm mấy dòng này vào cuối file `~/.zshrc` và khởi động lại iTerm:

```
# Colorise the top Tabs of Iterm2 with the same color as background
# Just change the 18/26/33 wich are the rgb values
echo -e "\033]6;1;bg;red;brightness;18\a"
echo -e "\033]6;1;bg;green;brightness;26\a"
echo -e "\033]6;1;bg;blue;brightness;33\a"
```

Nguồn tham khảo:
* Bài gốc: https://medium.com/@Clovis_app/configuration-of-a-beautiful-efficient-terminal-and-prompt-on-osx-in-7-minutes-827c29391961
* https://github.com/chris-murray/powerlevel9k-custom
* https://gist.github.com/kevin-smets/8568070
Bài viết này chia sẻ về cách configure terminal theme của bạn sử dụng [Powerlevel9k](https://github.com/bhilburn/powerlevel9k) cho Zsh và iTerm2!. Các bạn không dùng đồ của nhà Táo thì chờ mình sẽ có bài viết tiếp theo nhé! See you :D

Powerlevel9k là một theme tuỳ biến của terminal phổ biến nhất cho shell Zsh. Tôi sẽ giải thích làm thế nào để configure nó với icons từ [NerdFonts](https://github.com/ryanoasis/nerd-fonts) về màu sắc cũng như custom prompt theo ý của riêng bạn.
Dưới đây là một số cách mà bạn có thể custom cho terminal của bạn, sử dụng custom prompt dựa trên Medium và freeCodeCamp

![](https://images.viblo.asia/91bfcd66-ddd3-4481-b7b0-2724b560bb8a.png)
![](https://images.viblo.asia/9f536aaa-cdbc-4343-9563-1133ca23b2bb.png)
![](https://images.viblo.asia/c9fd6e73-d154-4a0b-8a96-5cbe3393d738.png)


Hãy cùng bắt đầu step by step.
* *Điều kiện tiên quyết: Homebrew, iTerm2 và Zsh*
* *Chọn và phối màu*
* *Download Nerd Fonts và configure iTerm2 sử dụng font*
* *Thêm Powerlevel9k theme cho Zsh*
* *Tuỳ chỉnh prompt*

## Homebrew, iTerm2 và Zsh
* Nếu chưa cài Homebrew thì có thể cài đặt trình quản lý package [**Homebrew**](https://docs.brew.sh/Installation.html)
* Cài đặt terminal iTerm2 [ở đây](https://www.iterm2.com/downloads.html) hoặc sử dụng `brew install zsh`
* Mở iTerm2 vừa cài đặt xong, thay đổi default shell là Zsh thay vì bash, chạy đoạn lệnh shell để thay đổi trên terminal `chsh -s /bin/zsh`

Resource của Zsh là file ~/.zshrc là một tập lệnh được chạy bất cứ khi nào khởi động Zsh. Bài hướng dẫn này sẽ thêm các câu lệnh và biến vào file này để configure terminal

## Chọn và phối màu
Có rất nhiều cách phối màu trong iTerm2. Nguồn [iterm2colorschemes](https://iterm2colorschemes.com/) cung cấp 175 sự lựa chọn khác nhau. Sau khi đã tải chúng về, chọn `iTerm -> Preferences -> Profile -> Colors -> Color Presets -> Import` sau đó chọn cách phối màu mà bạn thích, như là Dracula và Solarised Dark theme như các hình ảnh ví dụ ở trên

![](https://images.viblo.asia/7fc06da8-8ce4-4ff4-9725-492b1f6a9081.png)

Cũng có thể tự phối màu bởi các màu ANSI, sau đó click `Color Presets -> Export` để save lại
Nếu bạn quan tâm để freeCodeCamp sử dụng màu như thế nào, có thể tham khảo [tại đây](https://design-style-guide.freecodecamp.org/).

## Download Nerd Fonts và configure iTerm2 sử dụng font đó
Để prompt có những icon mang tính thẩm mỹ cao, ta cần cài đặt một bộ font đặc biệt. Trước khi cài đặt [nerd-fonts](https://github.com/ryanoasis/nerd-fonts#font-installation), hãy xem nó có khỉ mốc gì đã.

> Nerd Fonts is a project that patches developer targeted fonts with a high number of glyphs (icons). Specifically to add a high number of extra glyphs from popular ‘iconic fonts’ such as Font Awesome ➶, Devicons ➶, Octicons ➶, and others.
> 
> [— Nerd Fonts on GitHub](https://github.com/ryanoasis/nerd-fonts)

### Download Nerd Fonts với curl
Có nhiều [tuỳ chọn khác](https://github.com/ryanoasis/nerd-fonts#font-installation) để cài đặt nerd fonts. Hãy ưu tiên `curl`

```shell
cd ~/Library/Fonts && curl -fLo "Droid Sans Mono for Powerline Nerd Font Complete.otf" https://github.com/ryanoasis/nerd-fonts/raw/master/patched-fonts/DroidSansMono/complete/Droid%20Sans%20Mono%20Nerd%20Font%20Complete.otf
```
Tìm hiểu kĩ hơn về việc sử dụng Nerd Fonts [ở đây](https://github.com/ryanoasis/nerd-fonts)

### Configure iTerm2 với Nerd Fonts

Cài đặt iTerm2 sử dụng Nerd Fonts
```shell
iTerm2 -> Preferences -> Profiles -> Text -> Font -> Change Font
```
![](https://images.viblo.asia/c7888549-2af3-460a-adf5-6c748d1de0c9.png)

Chọn font **Droid Sans Mono Nerd Font** và chỉnh fontSize cho phù hợp. Tích vào lựa chọn `Use a different font for non-ASCII text` và cũng chọn lại font đó. Nó để hiển thị font chữ và icon trên prompt

## Thêm Powerlevel9k theme cho Zsh
![](https://images.viblo.asia/cbd8df1f-8f6b-4d97-b99c-f2f1c5072106.png)
### Cài đặt
Để thêm Powerlevel9k sử dụng Nerd Fonts
- Báo cho Powerlevel9k sử dụng Nerd Fonts trong ~/.zshrc
```shell
echo "POWERLEVEL9K_MODE='nerdfont-complete'" >> ~/.zshrc
```
Bước tiếp theo cài Powerlevel9k từ Github và thêm đoạn command để load nó khi Zsh khởi động
```shell
git clone https://github.com/bhilburn/powerlevel9k.git ~/powerlevel9k
echo 'source  ~/powerlevel9k/powerlevel9k.zsh-theme' >> ~/.zshrc
```
**Note**: Font cần được thiết lập trước khi Powerlevel9k khởi tạo để sử dụng font đó. Nếu mở ~/.zshrc lên nó sẽ có các lệnh theo thứ tự sau
```
POWERLEVEL9K_MODE='nerdfont-complete'
source ~/powerlevel9k/powerlevel9k.zsh-theme
```
Powerlevel9 có khả năng cấu hình cao. Ví dụ, ta có thể điều chỉnh khoảng cách và các đoạn trong prompt - và chúng có các tuỳ chọn khác nhau

## Tuỳ chỉnh prompt
### Configure prompt elements và layout
Powerlevel9 đi kèm với một số phân đoạn prompt được cấu hình sẵn, ta có thể chỉ cần thêm vào 1 biến môi trường để sử dụng. Chúng bao gồm nhiều thành phần khác nhau với nhiều phiên bản hệ thống điều khiển(ví dụ git)

![](https://images.viblo.asia/d5d25845-6902-4995-b3d7-d320ed922ef8.png)

![](https://images.viblo.asia/0601d17a-d012-49d8-86b5-9c2fea51bde0.png)

và một ngôn ngữ là Node.js và Ruby

Để thay đổi cài đặt

```shell
open ~/.zshrc
```
và thêm [configuration](https://github.com/bhilburn/powerlevel9k#prompt-customization) bạn thích. Cách tốt nhất là khai báo tất cả các configuration trước khi chạy Powerlevel9 theme script. Dưới đây là một ví dụ cơ bản để cài đặt, chúng được viết vào file ~/.zshrc
```
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(dir vcs newline status)
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=()
POWERLEVEL9K_PROMPT_ADD_NEWLINE=true
POWERLEVEL9K_MODE='nerdfont-complete'
source ~/powerlevel9k/powerlevel9k.zsh-theme
```
cái tên của biến đã nói lên tất cả những gì nó mang lại cho từng prompt segment.
Cái chính ở đây là prompt bên trái có:
![](https://images.viblo.asia/c3f5a16e-5435-47a8-b00c-f0e0495e5ee5.png)
- Thư mục đang làm việc
- Hệ thống điều khiển phiên bản (hiển thị git status và branch)
- Một dòng mới
- Trả về code của câu lệnh phía trước

### Tạo từng prompt segment của chính bạn
Những ảnh chụp phía trên cùng của post đã show ra Medium icon cũng như là freeCodeCamp segment. Một phần của tut này sẽ đi sâu vào làm sao để customize prompt của riêng bạn
Sáng tạo thật sự là ở đây chứ đâu :D. Ta có thể thiết kế một số thứ liên quan như là ngôn ngữ lập trình mà bạn đang sử dụng, hoặc một số thức khác liên quan

Powerleve9 cho phép dễ dàng thêm các custom prompt segment bằng cách add chúng vào biến môi trường. Dưới đây là configuration cho custom Medium và freeCodeCamp giống như ảnh ở trên cùng của post
```
# Customise the Powerlevel9k prompts
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(
  custom_medium custom_freecodecamp dir vcs newline status
)
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=()
POWERLEVEL9K_PROMPT_ADD_NEWLINE=true
# Add the custom Medium M icon prompt segment
POWERLEVEL9K_CUSTOM_MEDIUM="echo -n '\uF859'"
POWERLEVEL9K_CUSTOM_MEDIUM_FOREGROUND="black"
POWERLEVEL9K_CUSTOM_MEDIUM_BACKGROUND="white"
# Add the custom freeCodeCamp prompt segment
POWERLEVEL9K_CUSTOM_FREECODECAMP="echo -n ’\uE242' freeCodeCamp"
POWERLEVEL9K_CUSTOM_FREECODECAMP_FOREGROUND="white"
POWERLEVEL9K_CUSTOM_FREECODECAMP_BACKGROUND="cyan"
```
### Set tên biến cho custom prompt segment
Powerlevel9 bao gồm các code để tự động tạo các prompt element dựa trên biến môi trường. Theo dõi các cấu trúc sau để thêm biến môi trường cho custom prompt segment
* Thêm `custom_<YOUR PROMPT SECTION NAME>` vào `POWERLEVEL9K_LEFT_PROMPT_ELEMENTS` hoặc `POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS`
* Set màu cho `POWERLEVEL9K_CUSTOM_<YOUR PROMPT SECTION NAME>_FOREGROUND`
* Set màu cho `POWERLEVEL9K_CUSTOM_<YOUR PROMPT SECTION NAME>_BACKGROUND`
* Set icon và text cho nội dung của section được khai báo thành `POWERLEVEL9K_CUSTOM_<YOUR PROMPT SECTION NAME>`

Bạn cũng có thể thêm vào right prompt với các custom tương tự như left

### Thêm icon và text của riêng bạn
Dưới đây là code với Nerd Font icon - bạn có thể xem qua nhiều hơn trên [Nerd Fonts website](http://nerdfonts.com/#cheat-sheet)
```POWERLEVEL9K_CUSTOM_FREECODECAMP="echo -n ’\uE242' freeCodeCamp"```

Chỉ cần thay 4 ký tự phía sau `\u` thành code của icon muốn sử dụng
Option `-n` của câu lệnh echo thông báo cho Zsh để không tạo ra dòng mới ở cuối chuỗi. Nó đều nằm trên cùng 1 dòng

### Programming language prompt sections
Một option khác cho promt sections là dựa trên một ngôn ngữ mà bạn sử dụng. Để hiểu hơn về cách tạo ngôn ngữ, ví dụ như JavaScript, Python và Ruby [ở đây](https://medium.com/the-code-review/powerlevel9k-personalise-your-prompt-for-any-programming-language-68974c127c63)
![](https://images.viblo.asia/c65480fd-4db7-4523-ba9a-cb329846f4f9.png)

## Thành quả với .zshrc
Dưới đây là toàn bộ configuration cho file .zshrc sau khi thực hiện xong tut này và có custom 1 chút, bạn có thể sử dụng nó là base để custom lại terminal riêng cho chính mình
```
# Customise the Powerlevel9k prompts
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(
  custom_apple
  #custom_javascript
  dir
  vcs
  newline
  status
)
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=()
POWERLEVEL9K_PROMPT_ADD_NEWLINE=false

# Add the custom Apple icon prompt segment
POWERLEVEL9K_CUSTOM_APPLE="echo -n $'\uE711'"
POWERLEVEL9K_CUSTOM_APPLE_FOREGROUND="white"
POWERLEVEL9K_CUSTOM_APPLE_BACKGROUND="black"

# Add the custom Javascript icon prompt segment
POWERLEVEL9K_CUSTOM_JAVASCRIPT="echo -n $'\ue781'"
POWERLEVEL9K_CUSTOM_JAVASCRIPT_FOREGROUND="black"
POWERLEVEL9K_CUSTOM_JAVASCRIPT_BACKGROUND="yellow"

# Load Nerd Fonts with Powerlevel9k theme for Zsh
POWERLEVEL9K_MODE='nerdfont-complete'
source ~/powerlevel9k/powerlevel9k.zsh-theme
```

![](https://images.viblo.asia/2fd584dd-ee02-4401-b944-9e4ab2a84470.png)

## Bonus
Một số config cho title và background color
```
# Set a color for iTerm2 tab title background using rgb values
function title_background_color {
  echo -ne "\033]6;1;bg;red;brightness;$ITERM2_TITLE_BACKGROUND_RED\a"
  echo -ne "\033]6;1;bg;green;brightness;$ITERM2_TITLE_BACKGROUND_GREEN\a"
  echo -ne "\033]6;1;bg;blue;brightness;$ITERM2_TITLE_BACKGROUND_BLUE\a"
}
ITERM2_TITLE_BACKGROUND_RED="18"
ITERM2_TITLE_BACKGROUND_GREEN="26"
ITERM2_TITLE_BACKGROUND_BLUE="33"
title_background_color
# Set iTerm2 tab title text
function title_text {
    echo -ne "\033]0;"$*"\007"
}
title_text freeCodeCamp
```

Cảm ơn bạn đã theo dõi bài viết! Đừng quên vote nếu bạn cảm thấy bài viết giúp ích cho bạn

Refs
> https://github.com/bhilburn/powerlevel9k
> 
> https://github.com/ryanoasis/nerd-fonts
> 
> https://medium.freecodecamp.org/how-you-can-style-your-terminal-like-medium-freecodecamp-or-any-way-you-want-f499234d48bc
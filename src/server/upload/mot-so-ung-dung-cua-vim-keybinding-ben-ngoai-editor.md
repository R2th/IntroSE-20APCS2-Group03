![](https://images.viblo.asia/86176841-ecf5-40bd-bede-615ddfda72e2.jpg)


Qua những bài viết trước, hẳn các bạn cũng phần nào thấy được sự linh hoạt và tiện dụng của Vim keybinding. Ý tưởng sự kết hợp của các ký tự tạo ra các chuỗi hành động nhanh chóng, cảm giác có thể đi khắp nơi trong file và chỉnh sửa text một cách hiệu quả, thật sự khiến mình cảm thấy quyết định làm quen với **Vim** như một sự đột phá của bản thân 🤣🤣Trong bài hôm nay, mình sẽ giới thiệu 3 ứng dụng gắn bó chặt chẽ với hầu hết lập trình viên, mà có phong cách của **Vim**, hứa hẹn đưa daily workflow của bạn lên một tầm cao mới 😉

# Shell bindkey

Với rất nhiều developer, việc thao tác trên **Terminal** và **Shell** là một hoạt động thường ngày. Trước khi biết đến **Vim**, mình cũng biết một vài phím tắt nh nhỏ khi gõ gõ trên **Shell**, ví dụ như `ctrl w` để xóa một từ, `ctrl u` để xóa cả dòng. Tuy nhiên nếu trong quá trình gõ mà có lỗi, thì vẫn phải kết hợp `ctrl` và `arrow key` đưa con trỏ về tới vị trì mà mình cần sửa 😰Và trong một lúc vô tình đọc file `.zshrc` do **ZimFW** generate ra, mình đã rất ngạc nhiên và vui mừng khi phát hiện các **Shell** hiện nay có hỗ trợ keymap của **Vi**. 

Để enable nó, các bạn cần mở `~/.zshrc`, tìm tới dòng `bindkey` và chuyển giá trị `-e` thành `-v`.

![image.png](https://images.viblo.asia/089af90f-0beb-4469-872d-b2c181220ac0.png)

Có một chút khó nhìn, đó là dù *Normal Mode* hay *Insert Mode*, thì cái cursor luôn là block chữ nhật. Để tăng trải nghiệm, mình sẽ hướng dẫn các bạn chuyển mode cho cursor cho giống với **Neovim**. Bằng cách copy đoạn code này, nhét vào dưới cùng của file `.zshrc` và nạp lại bằng `source ~/.zshrc`

```bash
export KEYTIMEOUT=1

# Change cursor shape for different vi modes.
function zle-keymap-select {
  if [[ ${KEYMAP} == vicmd ]] ||
     [[ $1 = 'block' ]]; then
    echo -ne '\e[2 q'
  elif [[ ${KEYMAP} == main ]] ||
       [[ ${KEYMAP} == viins ]] ||
       [[ ${KEYMAP} = '' ]] ||
       [[ $1 = 'beam' ]]; then
    echo -ne '\e[6 q'
  fi
}
zle -N zle-keymap-select
zle-line-init() {
    zle -K viins # initiate `vi insert` as keymap (can be removed if `bindkey -V` has been set elsewhere)
    echo -ne "\e[6 q"
}
zle -N zle-line-init
echo -ne '\e[6 q' # Use beam shape cursor on startup.
preexec() { echo -ne '\e[6 q' ;} # Use beam shape cursor for each new prompt.
```

Lúc này hẳn cái chế độ `vi` của Shell đã dễ hình dung hơn rất nhiều rồi. Các bạn có thể tham khảo cách mình tách đoạn code trong [.zshrc của mình](https://github.com/l3aro/dotfiles/blob/main/.zshrc) thành một file riêng chứa những code mình tự thêm vào cho tiện theo dõi tại file [absolute.zsh](https://github.com/l3aro/dotfiles/blob/main/zsh/absolute.zsh). Trong đó bonus thêm một số alias mà mình nghĩ cũng sẽ hữu dụng với các bạn 😂

# Lazygit
Khi sử dụng git, mình hay gõ alias git kiểu `gaa` => `git add .`, `gcm "commit message"` => `git commit -m "commit message"`,... Với mình như vậy đã nhanh hơn so với mở git GUI như Github Desktop hay Source Tree rồi. Đối với các task phức tạp hơn như sửa conflict thì mình vẫn phải nhờ cậy tới built-in git của VSCode. Mà thật ra thằng này cũng khá tuyệt, mỗi tội không có keybinding mặc định, setup tay thì cũng quá nhiều task khác nhau trong quá trình xử lý. Và rồi trong quá trình tìm hiểu **Neovim**, mình tìm thấy [Lazygit](https://github.com/jesseduffield/lazygit) Thật sự đây như là một gamechanger cho daily workflow của mình vậy. **Lazygit** về ý tưởng, nó sẽ tạo 1 màn hình bố trí dạng GUI, nhưng nằm ngay trên **Shell** của các bạn. Có nhiều lựa chọn cài đặt, mình [cài bằng Homebrew](https://github.com/jesseduffield/lazygit#homebrew).
```bash
brew install jesseduffield/lazygit/lazygit
```

Trên một project bất kỳ, bạn chỉ cần gõ `lazygit` là sẽ có một giao diện có hỗ trợ hầu hết các thao tác với git cơ bản.
* `Tab` hoặc `Shift Tab` hoặc `1`, `2`, `3`, `4` để nhảy qua các pane
* `[` hoặc `]` để nhảy qua lại các tab trong pane
* Chi tiết các thao tác khả dụng trong các pane tương ứng, các bạn có thể ấn `x` để biết chi tiết

![image.png](https://images.viblo.asia/85037948-7486-4efe-867a-6eaed03952e9.png)

# Browser vim keybinding
Bạn có bao giờ nghĩ tới việc có thể lướt web không cần dùng chuột? [Vimium](https://vimium.github.io/) là một trong những mảnh ghép quan trọng, giúp bạn có thể thao tác nhanh chóng mà gần như không phải nhấc tay lên tìm lấy con chuột. Hơi tiếc một chút, việc **Vimium** dò link dựa vào thẻ `<a>` hoặc `<button>`, nên đôi khi bạn sẽ không thấy một số link mong muốn do link đó dev sử dụng thẻ khác rồi add thêm event, hoặc link đó bị ẩn, phải hover vào mới hiện chẳng hạn. Ngoài ra, vẫn có một số action cần tới chuột, vd drag-and-drop. Dù vậy, **Vimium** đã có thể cover 90% các hoạt động trên browser của các bạn thay cho việc dùng chuột rồi. Với mình như thế vẫn là khá tuyệt vời 🤩

{@embed: https://www.youtube.com/watch?v=t67Sn0RGK54}
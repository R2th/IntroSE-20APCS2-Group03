### I. Mở đầu:
- Hiện tại đối với phiên bản mới của windows 10 đã hỗ trợ việc dùng Windows Subsystem Linux (WSL) vì vậy hiện tại việc sử dụng các package hỗ trợ trên linux có thể dùng ngay trên windows, nói vậy chứ thật chất nó vẫn chạy trên môi trường linux.
- Nên thay vì phải chạy song song OS hay cài máy ảo, ta có cách tiện hơn, nhanh hơn và ít chiếm bộ nhớ và tài nguyên hơn
- Đối với mình đây là điều tuyệt vời trên cả tuyệt vời
### II. Cài đặt WSL:
- Để cài đặt WSL đầu tiên ta phải cấp quyền chạy môi trường linux
    - Nhấn tổ hợp phím `windows + s` (windows là phím logo windows)
    - Gõ control panel
    - Ở hàng trên bên phải có filter tên `View by`, bạn chọn `Large icons`
    - Tìm tới `Programs and Features` và chọn
    - ![](https://images.viblo.asia/4556f476-0577-435b-866d-6ecd84a6cf4c.png)
    - Nó hiện ra hộp thoại, chọn `Turn Windows features on or off`
    - ![](https://images.viblo.asia/12bfb66a-1f67-458d-8546-e0158e003869.png)
    - Hộp thoại `Windows Feature` được hiện ra -> tìm và chọn `Windows Subsystem for Linux`
    - ![](https://images.viblo.asia/49c0f9a7-1caf-4e54-bd10-c0cdd33c6797.png)
    - Reset lại máy
- Sau khi cấp quyền xong, việc tiếp theo ta cần làm là tải ứng dụng để tương tác với môi trường linux, mình thích phần mềm `Ubuntu` có trên store của windows
- 
![](https://images.viblo.asia/a9abdc7a-5cbd-48d4-a42d-4761a057d99c.png)

- Khi chạy `Ubuntu bash` lần đầu tiên, nó sẽ yêu cầu bạn đặt username và password cho nó
- Sau khi đã hoàn tất thì đây là giao diện
- ![](https://images.viblo.asia/b1ac0682-3da7-4dcd-ba7f-a1af132c7196.png)

### III. Cài đặt Git trên Bash
- Dùng các câu lệnh sau để cài đặt
    ```
    git config --global color.ui true
    git config --global user.name "<Tên bạn muốn dùng>"
    git config --global user.email "<Email của bạn>"
    ssh-keygen -t rsa -b 4096 -C "<Email của bạn>"
    ```
- Để lấy ssh key dùng lệnh sau
    ```
    cat ~/.ssh/id_rsa.pub
    ```
### IV. Visual Studio Code
#### 1. Tải VS Code
- Bạn có thể lên trang chủ của vs code để [tải về](https://code.visualstudio.com/)
- Không biết mọi người thế nào, chứ mình hay dùng lệnh `code .` để có thể mở project hiện tại lên vs code, nó thực sự rất tiện so với việc phải đi mở từng folder
- Đối với Ubuntu OS thì dùng lệnh `code .` là sẽ là mặc định nhưng đối với windows ta phải config trong vs code thêm đoạn lệnh dưới đây trong file `setting.json`, bạn có thể dùng tổ hợp phím `ctrl + shift + p` rồi gõ `setting.json` để mở file
    ```
    "terminal.integrated.shell.windows": "/bin/bash",
    ```
- Xong! Thật đơn giản đúng không :D
#### 2. Emmet trong VS Code
- Chắc cái này mọi người ai cũng biết rồi là tải extensions trong vs code để dùng :v
- Nhưng không lần này mình xin được giới thiệu emmet có sẵn trong vs code, thêm các câu lệnh sau để bật emmet
    ```
    "emmet.triggerExpansionOnTab": true,
    "emmet.showSuggestionsAsSnippets": true, // Hiện suggest emmet bên dưới
    // Thực hiện emmet đối với các ngôn ngữ
    "emmet.includeLanguages": {
        "javascript": "javascriptreact",
        "vue-html": "html",
        "razor": "html",
        "plaintext": "jade"
    },
    ```
    ![](https://images.viblo.asia/053e0d79-644f-43df-892b-a5c50f53ba91.png)
#### 3. EditorConfig for VS Code
- Đây là một extensions hỗ trợ việc code trong vs code
![](https://images.viblo.asia/e1312c16-fd75-4206-86ee-9ba58d7bb633.png)
- Để sử dụng thì trong Project của bạn thêm một file là `.editorconfig`, trong file thêm các đoạn code sau
```
# top-most EditorConfig file
root = true

# Luôn có dòng trống trong file
[*]
end_of_line = lf
insert_final_newline = true

# Matches multiple files with brace expansion notation
# Cài đặt mặc định charset
[*.{js,py}]
charset = utf-8

# Thụt đầu dòng với 4 space (hiện tại mình đang để là các file py và css)
[*.{py,css}]
indent_style = space
indent_size = 4

# Thụt dòng bằng tab (không có kích thước quy định)
[Makefile]
indent_style = tab

# tất cả các file có đuôi .js thì thụt lề là 2 space
[lib/**.js]
indent_style = space
indent_size = 2

# Matches the exact files either package.json or .travis.yml
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2
```
### V.  Hiện nhánh git ngay trên đường dẫn
![](https://images.viblo.asia/cf2ffa82-55c8-4e02-a0e5-f68080b38bde.png)
Để được như trên thì dùng các câu lệnh sau:
```
$ cd // Trở về địa chỉ gốc trong bash
```
 ```// Clone rbenv
$ git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```
```
// path đường dẫn vào bashrc
$ echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
```
```
//
$ exec $SHELL
```
```
// vào bashrc - vim mặc định được cài sẵn trong ubuntu bash
$ vim .bashrc
```
```
// Thêm đoạn này vào (nên để ở cuối để tránh ảnh hưởng các lệnh khác trong bashrc)
# Append current git branch in prompt
parse_git_branch() {
if ! git rev-parse --git-dir > /dev/null 2>&1; then
return 0
fi
git_branch=$(git branch 2>/dev/null| sed -n '/^\*/s/^\* //p')
echo "[$git_branch]"

}

PS1="${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\[\033[01;31m\]\$(parse_git_branch)\[\033[00m\]$ "
```
Tắt bash và mở lại, xem thành quả :D
### VI. Tmux trong bash
- Không biết mọi người có biết tmux không nữa, [định nghĩa](https://github.com/tmux/tmux/wiki) của ẻm
- Đơn giản tmux là một Terminal Multiplexer (bộ ghép kênh - dịch tiếng Việt nghe hơi chuối :v). Giúp ta quản lý tiến trình trên một terminal, lưu lại session và còn nhiều hơn nữa
- Đối với bash thì tmux đã được cài sẵn, bạn chỉ cần gõ `tmux` để mở ẻm lên là được
- Một số lệnh cơ bản
    - Ctrl + b được tmux gọi là bind-key
    - Ctrl + b + " sẽ chia màn hình terminal thành hai nửa theo chiều ngang
    - Ctrl + b + % sẽ chia màn hình terminal thành hai nửa theo chiều dọc
    - Ctrl +b + , giữ và dùng arrow keys để thay đổi kích cỡ của pane
    - Ctrl + b + c tạo một cửa sổ mới
    - Ctrl + b + w danh sách cửa sổ
    - Ctrl + b + n di chuyển đến cửa sổ tiếp theo
    - Ctrl + b + p di chuyển về cửa sổ trước đó.
    - Ctrl + b chuyển vào chế độ copy mode để cho phép bạn copy text trong một window hoặc một pane.
    - Ctrl + b + ? liệt kê tất cả các bind key
    - Ctrl + b + & Kill window, kéo theo toàn bộ các pane trong window đó.
    - Ctrl + b + x Kill pane, xóa một pane trong một window
    - Ctrl +b + d detach tmux session
- Các bạn có thể tham khảo một số bài viết dưới đây
    - https://kipalog.com/posts/Nghich-tmux
    - https://viblo.asia/p/gioi-thieu-co-ban-ve-tmux-zoZVRgLEMmg5
### VII. Kết
Mong rằng với những thủ thuật này sẽ giúp bạn thuận tiện, tiết kiệm thời gian hơn trong việc phát triển ứng dụng
[SublimeText](https://www.sublimetext.com/) chắc không còn quá xa lạ với mọi người. Hôm nay mình sẽ hướng dẫn mọi người cách viết 1 plugin cho sublime text và có thể share cho người khác dùng chung.

Dĩ nhiên, thì sublime text của bạn phải có [package control](https://packagecontrol.io/installation).

Sublime text được viết bằng C++ và Python, nên plugin của nó đương nhiên cũng sẽ được viết bằng Python, nhưng mình là 1 đứa mù tịt về Python, nên có vì sai sót mong mọi người bỏ qua.

## Làm quen với 1 plugin mới

Cách tạo 1 plugin mới:

```
Tools > Developer > New Plugin
```

Khi đó, sẽ có 1 file được tạo ra:

```python
import sublime
import sublime_plugin

class ExampleCommand(sublime_plugin.TextCommand):
  def run(self, edit):
    self.view.insert(edit, 0, "Hello, World!")
```

- 2 dòng import này gần như là mặc định và giúp ta sử dụng method liên quan , bạn có thể xem thêm ở [API Reference](https://www.sublimetext.com/docs/3/api_reference.html#sublime_plugin)
- class name sẽ có dạng `Tên class + Command`
- `sublime_plugin.TextCommand` chính là class sẽ được kế thừa, giúp chúng ra dùng được các method của class này(mình đoán là thế).
- `def run(self, edit)`, nếu bạn muốn thực thi class này, thì sẽ cần 1 hàm `run`, các tham số đầu vào tùy thuộc xem class bạn kế thừa sẽ cần những gì, nhưng chắc chắn luôn có `self`
- nội dung của method, trong ví dụ, thì sẽ là thêm text `Hello, World!`, vào vị trí đầu tiên của tab sublime bạn đang mở.

Khi lưu file, bạn sẽ thấy file được lưu tại `/home/hatd/.config/sublime-text-3/Packages/User`, đặt 1 tên tùy thích.

Để thực thi class `ExampleCommand`, bạn bấm 
```
ctrl + `
```
sau đó gõ `view.run_command("example")`, (`example` chính là tên class đã nói ở trên, được chuyển từ camelcase sang snakecase và bỏ chữ Command), enter. Bạn sẽ thấy `Hello, World!` được thêm vào vị trí đầu tiên của tab sublime mà bạn đang mở.

Trên đây là ví dụ lý thuyết về tạo mới và chạy 1 plugin. Còn giờ sẽ đi vào thực tế.

## Ý tưởng

Dùng phím tắt, để lấy [permanent link](https://docs.github.com/en/github/managing-your-work-on-github/creating-a-permanent-link-to-a-code-snippet) của dòng code mà con trỏ chuột đang trỏ vào, với branch là develop.

## Giải quyết ý tưởng

Bình thường, để dẫn link của 1 dòng code, ví dụ `https://github.com/hatd/MoreGit/blob/master/more_git_commands.py#L7`
,chắc hẳn là bạn sẽ làm như sau:
- vào project trên github
- tìm đến file
- click vào số line trước dòng code
- copy url trên thanh address của trình duyệt
- 
Khá là mất công.

Để giải quyết vấn đề này thì khá đơn giản:

tạo 1 url có dạng: 

```
project_github_url + "/blob/develop/" + file_name + "#L" + dòng_của_con_trỏ_chuột
```
 và cho vào clipboard
 
## Thực hành

### 1. Tạo folder project và push lên github

(Viết 1 plugin và share cho người khác dùng được, thì khá là cool đúng không)

Bạn cần tạo 1 project(mình đặt là `MoreGit`) trong folder mà bạn hay làm việc, init git và push lên github như bình thường.

Chuột phải vào project folder, chọn `Make Link` (mình dùng ubuntu, còn ở hđh khác thì mình không chắc), sẽ tạo cho bạn 1 folder tên là `Link to MoreGit`. Copy folder này vào `/home/hatd/.config/sublime-text-3/Packages`. Và bây giờ, bạn chỉ cần code với folder `MoreGit`, thì tự động plugin sẽ được load.

### 2. Code

Lần lượt tạo các file sau:

**package-metadata.json**

để package installer biết được project của bạn là 1 plugin để install hoặc update, thì cần file này.

```json
{"platforms": ["linux"], "version": "1.0.3", "description": "More git", "url": "https://github.com", "dependencies": [], "sublime_text": ">=3211"}

```

ở đây chắc chỉ cần chú ý đến platforms: các hđh mà plugin hỗ trợ(sẽ nói ở đoạn sau), sublime_text: version của sublime mà plugin hỗ trợ, vì version thấp quá sẽ cần code phức tạp hơn

 **MoreGit.sublime-settings**

Đây là file setting của plugin
```json
{
  "remote_name": "origin"
}
```
Vì 1 project có thể add nhiều remote, nên sẽ cần phải dùng 1 remote chính cho `prject_github_url`. Remote name mặc định mình để là `origin`

 **more_git_commands.py**
 
Đây sẽ là file chưa code

```python
# tùy vào các method mình muốn mà sẽ import các module/library khác nhau
import os  
import sublime
import sublime_plugin
import subprocess
import re

class CopyGitCommand(sublime_plugin.TextCommand):
  def run(self, edit):
    # lấy ra được đường dẫn đến file đang mở ở active tab của sublime
    # sẽ có dạng /home/hatd/MoreGit/folder1/folder2/file_name
    file_name = self.view.file_name()
    # lấy được đường dẫn đến file
    # /home/hatd/MoreGit/folder1/folder2/
    dir_path = os.path.dirname(file_name)
    # hash này là option dùng cho subprocess, sẽ nói ở dưới
    kwargs = {}
    kwargs["stdout"] = subprocess.PIPE
    kwargs["cwd"] = dir_path

    # lấy ra remote name được đặt trong setting
    settings = sublime.load_settings("MoreGit.sublime-settings")
    remote_name = settings.get("remote_name")
    # subprocess là 1 lib của python, giúp ta chạy các câu lệnh giống như trên terminal
    # https://docs.python.org/3/library/subprocess.html
    # câu lệnh git config --get remote.remote_name.url sẽ giúp lấy được url đang đặt cho remote_name
    # kwargs["stdout"] = subprocess.PIPE sẽ giúp đầu ra của câu lệnh .Popen giống như trên terminal
    # kwargs["cwd"] = dir_path, subprocess sẽ luôn chạy ở thư mục ~/, nên bạn cần chỉ cho nó thư mục cần chạy, vì lệnh git phải chạy trong thư mục có init git đúng không?
    remote = subprocess.Popen(["git", "config", "--get", "remote." + remote_name + ".url"], **kwargs).stdout.read()

    if remote:
      # self.view.sel() sẽ giúp bạn lấy ra list các vùng mà bạn đang chọn(sublime có tính năng chọn 1 vùng, xong bấm ctrl để chọn tiếp vùng khác ý)
      # mình sẽ lấy ra vùng đầu tiên
      current_selection = self.view.sel()[0]
      # lấy ra row đầu tiên và row cuối cùng của vùng đang được chọn
      (row_begin,_) = self.view.rowcol(current_selection.begin())
      (row_end,_) = self.view.rowcol(current_selection.end())
      # vì remote có thể là dùng http url, hoặc ssh, nên mình cần phải regex đoạn này, để tạo ra được url https://github.com/hatd/MoreGit
      remote_url = re.sub("^git@.*:", "https://github.com/", remote.decode("utf-8")[:-5])
      # câu lệnh git rev-parse --show-toplevel sẽ cho ra kết quả /home/hatd/MoreGit
      top_level = subprocess.Popen(["git", "rev-parse", "--show-toplevel"], **kwargs).stdout.read().decode("utf-8")[:-1]
      # giờ chỉ là việc replace, nối text bình thường
      link = file_name.replace(top_level, remote_url + "/blob/develop")
      link = link + "#L" + str(row_begin + 1)
      # đoạn sẽ là lấy link theo block, nếu như bạn đang chọn 1 đoạn code, chứ không phải 1 dòng code
      if row_begin != row_end:
        link = link + "-" + str(row_end + 1)
      # dòng này sẽ gắn url vào clipboard, và bạn có thể ctrl+v để parse url ra
      sublime.set_clipboard(link)
    else:
      print("Please setting remote repo!!! Preference > Package Settings > MoreGit > Settings")
```

**Main.sublime-menu**

File này giúp bạn thêm option vào menu.
Có khá nhiều loại menu, ở những vị trí khác nhau, bạn có thể tham khảo [available_menus](https://www.sublimetext.com/docs/3/menus.html#available_menus) 

Ở đây mình chỉ dùng Main menu (cái menu ở trên cùng)

```json
[
  {
    "id": "preferences",
    "children":
    [
      {
        "caption": "Package Settings",
        "mnemonic": "P",
        "id": "package-settings",
        "children":
        [
          {
            "caption": "MoreGit",
            "children":
            [
              {
                "command": "edit_settings",
                "args": {
                  "base_file": "${packages}/MoreGit/MoreGit.sublime-settings",
                  "default": "// Settings in here override those in \"MoreGit.sublime-settings\"\n\n{\n\t$0\n}\n",
                },
                "caption": "Settings"
              },
              { "caption": "-" },
              {
                "caption": "Key Bindings",
                "command": "edit_settings",
                "args": {
                  "base_file": "${packages}/MoreGit/Default (${platform}).sublime-keymap",
                  "default": "// Key Bindings - User\n[\n\t$0\n]\n"
                }
              },
              { "caption": "-" },
              {
                "command": "open_file",
                "args": {
                  "file": "${packages}/MoreGit/README.md",
                },
                "caption": "Help"
              },
            ]
          }
        ]
      }
    ]
  }
]

```

Bạn có thể tùy chọn các menu của riêng mình, nhưng ở đây mình chỉ muốn

```
Preferences > Package Settings > MoreGit
```

và có 2 option là:

- Chỉnh sửa setting: là chỉnh sửa `remote_name` mặc định trong file `MoreGit.sublime-settings`.

- Chỉnh sửa phím tắt sẽ nói ở file tiếp theo

Để chỉnh sửa, thì chỉ cần copy nội dung ở base_file bên trái, dán sang bên phải, xong thay các giá trị mà các bạn muốn

**Default (Linux).sublime-keymap**

File này chứa các phím tắt dùng cho plugin của bạn

Ở đây, mình chỉ support cho linux, nên chỉ có 1 file này, nếu các bạn muốn cho nhiều hđh khác thì có thể tạo thêm `Default (Mac).sublime-keymap`, `Default (Window).sublime-keymap`, hoặc muốn cho tất cả, thì chỉ cần `Default.sublime-keymap`

```json
[
  { "keys": ["alt+c"], "command": "copy_git" }
]

```
Mình gán phím `alt + c`, với command `copy_git` (đây chính là class name của mình, được chuyển từ camelcase sang snakecase).

Vậy là xong, giờ bạn chỉ cần trỏ chuột(hoặc chọn 1 block code), `alt+c` để copy url của dòng code đó, và parse vào đâu đó.

### 3. Chia sẻ cho người khác dùng chung

Hãy push tất cả đống file vừa rồi lên github, và copy lấy url của project(https://github.com/hatd/MoreGit) và chia sẻ link cho bạn bè.

Và cách để sử dụng link đấy là:
- Thêm repository: `Ctrl+Shift+P`, tìm `Package Control: Add Repository`, parse url https://github.com/hatd/MoreGit và enter
- Install package: `Ctrl+Shift+P`, tìm `Package Control: Install Package`, tìm `MoreGit` và enter

Đấy là cách chia sẻ lên github, còn để public lên packageinstall.io như nào thì mình cũng chưa kịp tìm hiểu.

Qua bài viết này, mong các bạn có thể tạo được plugin cho riêng mình.
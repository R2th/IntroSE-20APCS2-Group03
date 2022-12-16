Bài viết dưới đây mình sẽ note lại vài tips giúp bạn viết shellscript dễ dàng và pro hơn, nếu bạn là một backend engineer thì kỹ năng code shellscript là một kỹ năng không thể thiếu mà mọi developer nên biết.

#### Cải thiện chất lượng code bằng  ShellCheck
Nếu bắt đầu code shellscript chưa quen, lỗi cú pháp là lỗi mà chúng ta hay gặp nhất, có khi mất vài giờ để debug vì những lỗi ngớ ngẩn
ShellCheck là tool tuyệt vời dùng để check cú pháp shellcript và bad code, suggest bạn viết shellscript theo cú pháp chuẩn, 
Bạn có thể cài ShellCheck trên các môi trường khác nhau như Linux, MacOs, Windows, tiện hơn cả là cài trên các text editor phổ biến như Vim hay Emacs vì lỗi cú pháp sẽ được suggest ngay khi shellscript được save. Bạn có thể tìm hiểu cài đặt trên repo chính của ShellCheck
* Github Repo: https://github.com/koalaman/shellcheck
* Syntastic là plugins support shellcheck: https://github.com/vim-syntastic/syntastic

Sau khi cài syntastic và ShellScript thành công trên Vim các bạn sẽ thấy kết quả như này:

![](https://images.viblo.asia/1687b5c9-fca2-4ffc-b604-623980148479.png)

Note: Một vài plugins nên cài cho Vim:
* https://github.com/vim-syntastic/syntastic
* https://github.com/amix/vimrc

#### Sử dụng các strict mode

Sử dụng các strict mode để ép buộc bạn viết code theo một chuẩn, điều này giúp bạn control và debug shellscript dễ hơn nếu có phát sinh bất thường.

```shellscrip
#!/bin/bash
set -euo pipefail
IFS=$'\n\t'
```

* `set -e` shellscript sẽ exit ngay lập tức nếu gặp bất kỳ command nào trả ra status code khác 0
* `set -u` sẽ không cho phép sử dụng một biến mà không khai báo
* set -o pipefail sẽ thoát pipelines lệnh ngay khi gặp một lệnh trả ra status code khác 0
* `FS=$' \n\t'` giá trị mặc định thông thường là `IFS=$' \n\t' ` tuy nhiên trong nhiều trường hợp seperator có thể là `space`, khai báo tường minh giúp code shellscript dễ hiểu và control tốt hơn

#### Hãy dọn dẹp rác rưởi!
Khi shellscripts bị dừng đột ngột có thể do scipt sai hoặc do một hành động từ user, hầu hết các shellscript không dọn dẹp hậu quả mà nó để lại. Trong nhiều trường hợp bạn có thể muốn restart lại một service nào đó hoặc muốn xoá file temp ... Sử dụng `trap` command trong trường hợp này là một good practice

```shellscript
cleanup() {
    # ...
}
trap cleanup EXIT
```

`trap` command sẽ được thực thi ngay khi script exit.

#### Log mọi thứ mà shellscript đang làm

Việc log shellscript giúp bạn trace log, debug tốt hơn, thống kê các số liệu. Nói tóm lại là không chỉ có shellscript mà bất cứ chương trình nào khi thự thi cũng phải có log:

```shellscript
readonly LOG_FILE="/tmp/$(basename "$0").log"
info()    { echo "[INFO]    $*" | tee -a "$LOG_FILE" >&2 ; }
warning() { echo "[WARNING] $*" | tee -a "$LOG_FILE" >&2 ; }
error()   { echo "[ERROR]   $*" | tee -a "$LOG_FILE" >&2 ; }
fatal()   { echo "[FATAL]   $*" | tee -a "$LOG_FILE" >&2 ; exit 1 ; }
```

Chỉ với vài câu lệnh cơ bản trên bạn có thể có ngay một logging framework nhỏ.

#### Debug như thế nào?
Cách dễ nhất để debug một shellscript ngoài việc log bạn có thể chạy shellscript với tham số `-x`
hoặc `set -x` bên trong shellscript
```shelscript
# chạy shellscipt với tham số `-x`
./tips.sh -x

#  set -x`bên trong shellscript
#!/usr/bin/env bash
set -euo pipefail

set -x
IFS=$'\n\t'
```

#### Viết document cho scripts
Bất cứ shellscript nào nên có  `--help` option

```shellscript
#/ Usage: add <first number> <second number>
#/ Compute the sum of two numbers
usage() {
    grep '^#/' "$0" | cut -c4-
    exit 0
}
expr "$*" : ".*--help" > /dev/null && usage
```

* `usage` function sẽ in ra tất cả các line bắt đầu với `#/`

* `expr` command sẽ concat các parameters và check xem nó có chứa sâu con `--help` hay không . nếu có `usage` function sẽ được gọi

#### Đặt biến trong các dấu quote
Ngay cả khi việc đặt dấu quote cho các variable là không bắt buộc, tuy nhiên đó là một thói quen tốt . không quote các strings có chứa space có thể dẫn đến shellscript break string thành các string nhỏ không như mong muốn.

#### Naming tên biến, function

Điều hiển nhiên phải không, chắc không cần giải thích lý do :)

#### Sử dụng subshells để điều khiển scope của các biến

Ví dụ dưới đây nói lên tất cả:

```shellscript
var=1
echo $var
(
    echo $var
    var=5
    echo $var
)
echo $var
```

Kết quả:
```
1
1
5
1
```

#### Sử dụng template
Template dưới đây đã tóm tắt tất cả các tips bên trên, bạn có thể sử dụng nó cho các script của bạn sau này. Tất nhiên là bạn phải hiểu tất cả về nó trước đã.

```shellscript
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

#/ Usage:
#/ Description:
#/ Examples:
#/ Options:
#/   --help: Display this help message
usage() { grep '^#/' "$0" | cut -c4- ; exit 0 ; }
expr "$*" : ".*--help" > /dev/null && usage

readonly LOG_FILE="/tmp/$(basename "$0").log"
info()    { echo "[INFO]    $*" | tee -a "$LOG_FILE" >&2 ; }
warning() { echo "[WARNING] $*" | tee -a "$LOG_FILE" >&2 ; }
error()   { echo "[ERROR]   $*" | tee -a "$LOG_FILE" >&2 ; }
fatal()   { echo "[FATAL]   $*" | tee -a "$LOG_FILE" >&2 ; exit 1 ; }

cleanup() {
    # Remove temporary files
    # Restart services
    # ...
}

if [[ "${BASH_SOURCE[0]}" = "$0" ]]; then
    trap cleanup EXIT
    # Script goes here
    # ...
fi
```

Reference:
[Shell Scripts Matter](https://dev.to/thiht/shell-scripts-matter)
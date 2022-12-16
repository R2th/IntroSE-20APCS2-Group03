## Mình bắt đầu grep như thế nào?

Ngày đầu chập chững bắt đầu biết cách `grep log` là gì thì rất háo hức muốn được lên môi trường production or staging thử vài đường cơ bản cho nó mượt. Cơ mà đời không như mơ, local thì chỉ toàn `touch file_test` xong rồi `grep 'kem danh rang ps' file_test` -> không có kết quả => dễ vãi =)))) .

Đến lúc lên môi trường production `grep 'tay trang moi vet ban' *.log`

1s

2s

:expressionless:

5s

:confused:

...

10s

:slightly_smiling_face:

À mà trong lúc chờ đợi tiện thể ta tìm hiểu grep là gì cái nhỉ!

Ai cũng biết `grep được sử dụng để tìm kiếm một chuỗi kí tự truyền vào trong 1 file or nhiều file`. Xúc tích thì nó là như thế! cơ mà không biết có ai tò mò nghĩa của từ `grep` là gì không, ai cũng có thể đoán ra đó là `tìm kiếm` nhưng ...

30s


!!!Bùm!!!

![](https://images.viblo.asia/30a7e615-9852-47f6-aaf0-f177a8b8a18c.png)


:upside_down_face: :upside_down_face: :upside_down_face::upside_down_face: :upside_down_face: :upside_down_face: :upside_down_face: :upside_down_face: :upside_down_face: :upside_down_face: :upside_down_face: :upside_down_face: :upside_down_face::upside_down_face: :upside_down_face: :upside_down_face: :upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face:
:upside_down_face: :upside_down_face: :upside_down_face::upside_down_face: :upside_down_face: :upside_down_face: :upside_down_face: :upside_down_face: :upside_down_face: :upside_down_face: :upside_down_face: :upside_down_face: :upside_down_face::upside_down_face: :upside_down_face: :upside_down_face: :upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face::upside_down_face:

thôi nghỉ m* đi! méo có grep gờ riếc gì ở đây hết.

Nói thế chứ pha vừa rồi là do mình grep ngu thôi chứ dự án mình khi muốn thao tác trên môi trường prod thì sẽ phải pass 1 bài test nhỏ :) - mình mới nghĩ ra đấy haha :3

*HW*: Grep toàn bộ biến ENV của dự án ra một file rồi compare với file .env hiện tại. (Ruby project)

file .env dạng
```
API_LINK="https://google.com"
SLACK_HOOK_URL="https://ksjkd.com"
...
```

một file trong hệ thống có sử dụng ENV ví dụ như
```
if ENV["VERSION_OS"] > 1
  puts "Need to be updated."
end
```

## Bài toán

Mặc dù nói là bài test nhưng ta cũng phải hiểu xem tại sao lại có bài toán trên.(hình như làm cái gì cũng phải hiểu vấn đề thì mới giải quyết được nhanh và tốt nhất :v)

Dự án mình có khá nhiều server chạy app - đâu đó khoảng chục con đi :upside_down_face:, check file .env giữa các con server thì đang có sự sai khác. Tại sao lại khác thì lại là câu chuyện của các Fn đời trước của dự án, tại sao khi thêm ENV lại không thêm ở tất cả các con server - Vì ngại phải add từng con một chăng? Hoặc cũng có thể do ENV không được dùng nữa nhưng các con server cũng chưa xóa đi => Dẫn đến việc sai khác `ENV variables` giữa các môi trường.

Vậy nên mục đích cuối cùng là list up những ENV nào đang được sử dụng trong hệ thống và compare ENV giữa các server để có giải pháp xử lý đồng bộ `ENV` giữa tất cả con server vì biến này dùng được ở toàn hệ thống.

Hiểu được tại sao lại có vấn đề rồi thì bắt đầu `grep` thôi :)))
`chắc sẽ có nhiều cách khác nhưng trong bài biết này thì ý tưởng của mình là grep`

## 1. First step: `grep` trong 1 file
Ví dụ file test.text chứa `ENV`:
```
SUN-ASTERISK\nguyen.dang.van@b121765-lt1:~$ cat test.text 
vand
asdasd

if ENV["API_LINK"] == "https://google.com"
 puts "van"
end

webhook_url = ENV["WEBHOOK_URL"]

```

grep `ENV` trong file `test.text`
```
SUN-ASTERISK\nguyen.dang.van@b121765-lt1:~$ grep ENV test.text 
if ENV["API_LINK"] == "https://google.com"
webhook_url = ENV["WEBHOOK_URL"]
```

Ơ, nó in ra cả line chứa kí tự `ENV` mất rồi, cos option nào chỉ in ra text match vs input không nhỉ?

```
SUN-ASTERISK\nguyen.dang.van@b121765-lt1:~$ grep -o ENV test.text 
ENV
ENV
```
Có rôi nè `-o` or `only-matching` sẽ in ra kí tự bạn grep. Cơ mà ta grep thế này để làm gì nhỉ?. Yêu cầu là phải grep ra tất cả các biến `ENV` có nhưng tên khác nhau cơ mà, ta có thông tin là

- Format các biến `ENV` đều giống nhau ví dụ: `ENV["WEBHOOK_URL"]`
- Tất cả đều viết hoa và ngăn cách nhau bởi dấu `_`

Vậy thì việc tiếp theo là regex cái chuỗi này `ENV["WEBHOOK_URL"]` :D - > Ta gọi đó là `Grep Expression`

## 2. Second step: `grep regex`

```
SUN-ASTERISK\nguyen.dang.van@b121765-lt1:~$ grep -o 'ENV\[' test.text
ENV[
ENV[
```
Output nếu chưa các kí tự đặc biệt như `[`, `*`, ... thì thêm `\` => cũng khá giống với regex ở các ngôn ngữ lập trình nhỉ :3 

Tiếp theo ta thêm

```
SUN-ASTERISK\nguyen.dang.van@b121765-lt1:~$ grep -o 'ENV\[".*[A-Z0-9]' test.text
ENV["API_LINK
ENV["WEBHOOK_URL
ENV["ENV_NUMBER
```
giải thích
```
. kí tự bất kì
```

```
* số lần lặp bất kì
```
=> ghép lại ta sẽ lấy được tất cả kí tự sau `'ENV["` như sau:
```
SUN-ASTERISK\nguyen.dang.van@b121765-lt1:~$ grep -o 'ENV\[".*' test.text
ENV["API_LINK"] == "https://google.com"
ENV["WEBHOOK_URL"]
ENV["ENV_NUMBER1"]
```

Cho nên ta phải định nghĩa format mà thằng `*` sẽ lấy kí tự bằng cách t hêm `[A-Z0-9]`

=>  Zậy là xong - đây cũng chỉ là cách do mình nghĩ ra thôi nếu có suggest thêm xin hãy để lại comment bên dưới :100:

```
SUN-ASTERISK\nguyen.dang.van@b121765-lt1:~$ grep -o 'ENV\[".*[A-Z0-9]"\]' test.text
ENV["API_LINK"]
ENV["WEBHOOK_URL"]

```
=> Về cơ bản thì nó cũng không khác cách regex của các ngôn ngữ khác
## Step 3: grep cả project

Ai lại vào từng folder grep như thế này nhỉ :3 

```
grep -o 'ENV\[".*[A-Z0-9]"\]' *
```

Quê quá!!! -.-

Đầu tiên
```
grep -r -o 'ENV\[".*[A-Z0-9]."\]' *
lib/tasks/db.rake:ENV["MODEL"]
lib/tasks/migrate.rake:ENV["MODELS"]
```

Với option `-r` ta sẽ grep tất cả các file trong tất cả các sub-directories. 

Vì nó show ra cả tên file nữa nên ta sẽ sử dụng `grep` lồng như sau
```
grep -r ENV | grep -o 'ENV\[".*[A-Z0-9]"\]'
ENV["API_LINK"]
ENV["WEBHOOK_URL"]
ENV["WEBHOOK_URL"]
```

Để tránh trường hợp bị trùng `ENV` ta thêm option `sort --unique`
```
grep -r ENV | grep -o 'ENV\[".*[A-Z0-9]"\]' | sort --unique
```

## Step 4: gán
Suýt quên cần file gán vào file lưu lại rồi compare nữa chứ
```
grep -r ENV | grep -o 'ENV\[".*[A-Z0-9]"\]' | sort --unique > env_to_compare.text
```


!!!Bùm!!!

Quay lại đầu bài `grep` là gì trước khi compare nhá :v 

> [Google translate](https://translate.google.com/?sl=auto&tl=vi&text=grep&op=translate) thì bảo là `nắm chặt`
> 
> Facebook thì chả bảo gì :(
> 
> [Wiki](https://en.wikipedia.org/wiki/Grep) thì nói nó là viết tắt của cụm `g/re/p` :joy::joy::joy:  (search for a regular expression and print matching lines) 

\
~~
Thôi nghỉ đã bài sau compare tiếp nhé!!! :upside_down_face: :upside_down_face: :upside_down_face:

Hy vọng bài viết giúp ích cho các bạn!

**Tham khảo:**

Definition: https://en.wikipedia.org/wiki/Grep

Grep regular ex:  https://www.digitalocean.com/community/tutorials/using-grep-regular-expressions-to-search-for-text-patterns-in-linux

Grep all files: https://www.cyberciti.biz/faq/grep-subdirectory-for-files-on-linux-bsd-osx-unix-oses/
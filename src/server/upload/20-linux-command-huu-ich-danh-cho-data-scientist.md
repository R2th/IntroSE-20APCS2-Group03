**Bài viết này của Lập [Trình Không Khó](https://nguyenvanhieu.vn/) sẽ trình bày các linux command hữu ích dành cho dân data scientist. Đây là tổng hợp của bản thân tác giả trong quá trình học tập và làm việc. Danh sách này không bao gồm các command cơ bản của linux như (cd, pwd, ls, ssh, scp, …). Bằng việc biết và sử dụng các command trong danh sách này, tốc độ xử lý công việc của bạn sẽ nhanh hơn đáng kể đó.**

![20+ linux command hữu ích dành cho Data Scientist](https://nguyenvanhieu.vn/wp-content/uploads/2020/05/20-linux-command-huu-ich.jpg)

> Bài viết gốc được đăng tại blog cá nhân của mình: [20+ linux command hữu ích dành cho Data Scientist](https://nguyenvanhieu.vn/linux-command-huu-ich-danh-cho-data-scientist/)

Trong quá trình làm việc, nếu mình biết hoặc tìm ra một command hữu ích nào thì mình sẽ tiếp tục bổ sung vào danh sách này. Và bây giờ chúng ta cùng bắt đầu với danh sách linux command hữu ích giúp chúng ta làm việc hiểu quả hơn nào.

## Danh sách linux command hữu ích
Mình sẽ đi theo chức năng, các linux command hoặc tổ hợp command giúp chúng ta giải quyết một vấn đề cụ thể nào đó trong cộng việc nhé. Các command hoặc tổ hợp command này rất ngắn gọn và có thể không dễ nhớ ^^ (dùng nhiều sẽ nhớ được, hoặc quên thì lại lên đây xem, hehe)

### 1. Download dữ liệu từ internet
Đây là 2 command giúp bạn download file từ internet về máy bạn và hơn thế nữa. Thay vì việc dùng trình duyệt download về máy tính cá nhân, xong rồi lại phải chuyển từ máy cá nhân lên máy server thì từ máy server, sử dụng 1 trong 2 command này sẽ giúp bạn tải trực tiếp nó về nơi bạn cần.
```markdown
$ wget https://gist.githubusercontent.com/nguyenvanhieuvn/7d9441c10b3c2739499fc5a4d9ea06fb/raw/06c0f4ed63c0951cf32c32089383aeb345e6743e/teencode.txt
--2020-05-03 11:37:24--  https://gist.githubusercontent.com/nguyenvanhieuvn/7d9441c10b3c2739499fc5a4d9ea06fb/raw/06c0f4ed63c0951cf32c32089383aeb345e6743e/teencode.txt
Resolving gist.githubusercontent.com (gist.githubusercontent.com)... 151.101.76.133
Connecting to gist.githubusercontent.com (gist.githubusercontent.com)|151.101.76.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 1437875 (1,4M) [text/plain]
Saving to: ‘teencode.txt’

teencode.txt                                        100%[=================================================================================================================>]   1,37M  1,81MB/s    in 0,8s    

2020-05-03 11:37:26 (1,81 MB/s) - ‘teencode.txt’ saved [1437875/1437875]
```
Còn với command *curl* thì nó cũng sẽ download nhưng không save file mà hiển thị nội dung download được lên màn hình nếu bạn không chỉ định tham số `--output` cho nó:

```sql
$ curl https://dumps.wikimedia.org/viwiki/20191201/viwiki-20191201-pages-articles-multistream.xml.bz2 --output viwiki-20191201-pages-articles-multistream.xml.bz2
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0  694M    0  287k    0     0  45186      0  4:28:30  0:00:06  4:28:24 57884
```
Tất nhiên, ứng dụng của 2 command này không chỉ dừng lại ở đây, bạn có thể tìm hiểu thêm nhé. Có đôi chút sự khác nhau giữa 2 command này, bạn xem sự khác nhau được trình bày rất chi tiết tại [curl vs wget](https://daniel.haxx.se/docs/curl-vs-wget.html).

### 2. Xem nội dung tập tin

Bộ 3 command giúp bạn nhanh chóng xem được 1 phần hoặc toàn bộ nội dung của các tệp tin văn bản theo nhưng góc view khác nhau.

Lệnh *head* sẽ cho bạn xem 1 phần văn bản ở đầu tệp tin, và ngược lại bạn có thể xem một phần nội dung ở cuối tệp tin với lệnh *tail*. Còn với *cat* command thì nó sẽ hiển thị toàn bộ nội dung văn bản.

Việc xem nội dung văn bản mà không muốn chỉnh sửa thì dùng 1 trong 3 command này sẽ giúp bạn xem nhanh nhất, nhanh hơn là dùng vim editor.

Với *head* và *tail*, bạn có thể chỉ định số dòng muốn xem với tham số *-n*. Còn khi dùng cat mà bạn muốn xem từ từ trong trường hợp file cần xem có quá nhiều dòng thì hãy thêm | less vào phía sau lệnh cat nhé (Dùng *q*  để thoát khỏi lệnh và dùng mũi tên hoặc cuộn chuột để xem thêm).

```shell
$ head -n 5 teencode.txt 
created    cờ ri ết
kg    không
ctrai    con trai
khôg    không
bme    bố mẹ
$ tail teencode.txt 
ngaay    1
tieuthutaodo    1
nosmay    1
bpđ    1
tuongvs    1
jjvyxmni    1
engày    1
oáh    1
thiix    1
zajjj    1
$ cat teencode.txt | less
...
đág     đáng
nvay    như vậy
nhjeu   nhiều
xg      xuống
zồi     rồi
trag    trang
zữ      dữ
atrai   anh trai
:
```
### 3. Đếm số từ, số dòng trong file
Lệnh *wc* sẽ giúp bạn đếm được lần lượt số từ, số dòng và số byte dữ liệu từ một file văn bản. Khi bạn gọi lệnh này mà không có tham số nào, thì 1 dòng kết quả sẽ hiện lên với các giá trị lần lượt trình tự đã nói. Hoặc nếu bạn chỉ muốn đếm 1 tham số cụ thể thị hãy thêm tham số.
```shell
$ wc teencode.txt 
 135042  270198 1437875 teencode.txt

# -c, --bytes            print the byte counts
# -m, --chars            print the character counts
# -l, --lines            print the newline counts

$ wc -w teencode.txt 
270198 teencode.txt
$ wc -l teencode.txt
135042 teencode.txt
```
### 4. Sắp xếp và xóa trùng lặp

Đúng như cái tên, *sort* (sắp xếp) command giúp bạn sắp xếp dữ liệu theo thứ tự bảng chữ cái. Nó có rất nhiều tùy chọn nhưng tùy chọn mà mình hay dùng nhất đó là sort và xóa trùng lặp nội dung.
```php
$ sort -u filename
```
Tham số `-u` có nghĩa là xóa các dòng trùng lặp (chỉ giữ lại 1 dòng duy nhất trong trường hợp có nhiều dòng giống nhau). Bạn cũng có thể sắp xếp ngược lại (giảm dần theo bảng chữ cái) bằng cách dùng tham số `-r`.

Nếu bạn muốn sắp xếp mà không phân biệt hoa thường, thêm tham số `-f` nhé. Có gì cứ gõ `sort --help` là có hết à.

Việc xóa trùng lặp nội dung có rất nhiều command khác nhau làm được. Đây là một command khác có thể xóa trùng lặp khá nhanh mà không cần sort:
```php
$ awk '!seen[$0]++' filename
```
Hoặc:
```php
$ uniq -u filename
```
### 5. Đếm tần suất xuất hiện
Giả sử nếu bạn có một file text với một đống các từ như thế này:
```scala:scala:scala:text
a
b
c
a
b
c
d
f
a
f
a
```
Và bạn muốn đếm số lần xuất hiện của mỗi dòng trong file này, hãy dùng tổ hợp command sau đây với file dữ liệu, giả sử là data.txt:
```rust
$ sort a.txt | uniq -c
      4 a
      2 b
      2 c
      1 d
      2 f
```
Hoặc in đẹp hơn thì sửa lại xíu, như này:
```shell
$ sort data.txt | uniq -c | awk '{print $2, $1}'
a 4
b 2
c 2
d 1
f 2
```
### 6. Kiểm tra, xóa dòng theo điều kiện
Bạn đang làm việc với tệp tin văn bản và muốn kiểm tra xem nội dung văn bản có chữ “yêu” hay không chẳng hạn. Thì bạn sẽ có thể kiểm tra rất nhanh mà không cần phải mở text editor lên:
```sql
$ grep "yêu" data.txt
vũ tức sôi máu nhưng chỉ có thể cung kính phục tùng mọi yêu cầu của nó
tôi có thể giúp cô chỉ cần cô không làm ảnh hưởng đến cuộc sống gia đình tôi mọi yêu cầu của cô tôi đều chấp nhận làm theo
ông không tin chuyện ma quỷ ông chỉ nghĩ con trai mình yêu đương vớ vẩn nửa đêm nửa hôm ngang nhiên dẫn con gái về nhà
```
Ở trên mình chèn code nên bạn không nhìn thấy highlight, thực tế thì chữ yêu sẽ được bôi đậm và tô màu đỏ. Bằng cách này, bạn nhanh chóng kiểm tra được theo điều kiện bạn muốn.

Bạn có thể tìm kiếm bằng [regex](https://nguyenvanhieu.vn/regex-la-gi/) nhé, ví dụ:
```sql
$ grep "y[êế]u" data.txt 
giọng nữ yếu ớt thê lương truyền vào tai anh
đứng từ xa chỉ thấy cô ấy là một cái bóng trắng có mái tóc vừa đen vừa dài người yếu bóng vía chắc chắn bị dọa cho chết ngất ngay đến thanh niên trai tráng như vũ mới nhìn qua cũng bị dọa cho giật mình
một luồng khói trắng yếu ớt uốn lượn trong không khí dần dần tụ lại thành hình hài một cô gái gầy yếu vừa khít với chỗ khoanh vùng thi thể
vũ tức sôi máu nhưng chỉ có thể cung kính phục tùng mọi yêu cầu của nó
```
Hoặc không phân biệt hoa thường, tìm kiếm các dòng bắt đầu với chữ *anh*,
```sql
$ grep -i '^anh' data.txt 
Anh chương một con đường ma ám
anh học y vì gia cảnh tốt nên ra trường thuận lợi làm bác sĩ ở bệnh viện lớn chuyện ở công ty của ba anh anh hầu như không quan tâm
anh chăm chú xem mà không để ý ngoài trời đã đổ mưa lớn gió rít từng cơn rợn người
anh nhìn vết máu dài màu đỏ bắt mắt trên cánh tay thở dài để mẹ anh nhìn thấy bà ấy lại mắng ù tai đây
```
Nếu bạn muốn lấy các dòng này thì output nó ra file thôi:
```perl
$ grep 'pattern' filename > output
```
Còn nếu bạn muốn xóa các dòng theo điều kiện thì sao?
- Dùng invert match của command grep phía trên, ví dụ xóa các dòng bắt đầu bằng chữ yêu:

```shell
$ grep -v '^anh' data.txt > output
```
- Hoặc dùng *sed* command như sau:

```shell
# sed '/pattern to match/d' ./infile
$ sed '/^yêu/d' data.txt > output

```
### 7. Xóa dòng dài hơn, ngắn hơn x ký tự
Vẫn là command sed mà chúng ta đã nhắc tới ở trên thôi. Trải nghiệm với 1 dòng command ngắn gọn thay vì phải ngồi viết một đoạn code dài dòng nào.

- Xóa các dòng trong file văn bản có chiều dài nhỏ hơn hoặc bằng x, giả sử x = 10:

```perl
$ sed '/^.\{10\}./d' filename > output
```

Nếu bạn nào rành regex thì sẽ hiểu hơn command trên. Hoặc có một command khác dùng awk cũng với chức năng tương tự:

- Xóa các dòng trong file văn bản có độ dài lớn hơn x, giả sử x = 10:

```perl
$ sed -r '/^.{,10}$/d' filename > output
# Hoặc
$ awk 'length($0)<=10' filename > output
```

### 8. Kiểm tra encoding, chuyển về UTF-8

Trong quá trình làm việc với file văn bản, đôi khi vì một lý do nào đó chúng ta sẽ gặp vấn đề lỗi encoding, đặc biệt do mình hay làm việc với dữ liệu tiếng Việt nên thường phải xử lý vấn đề này.

Để kiểm tra encoding của một file văn bản, hãy dùng command sau:

```css
$ file teencode.txt 
teencode.txt: UTF-8 Unicode text, with very long lines
```

Nếu đó là UTF-8 thì không có vấn đề gì rồi. Nhưng nếu kết quả là 1 loại encoding khác, bạn vẫn có thể chuyển lại về UTF-8 theo cách sau đây (giả sử cần chuyển từ UTF16 về UTF8)

```shell
# iconv options -f from-encoding -t to-encoding inputfile(s) -o outputfile
$ iconv -f UTF-16 -t UTF-8 filename -o output
```

Xem các encoding mà *iconv* hỗ trợ bằng cách dùng command:

```shell
$ iconv -l
```

### 9. Xóa các dòng dữ liệu của file A có trong file B

Cách đầu tiên, yêu cầu hai tập tin file A và file B đã được sắp xếp. Nếu chưa sắp xếp thì dùng command sort đã trình bày ở mục 4.

Sau đó, để xóa các dòng dữ liệu của file A xuất hiện trong file B, bạn dùng command sau:

```html:html:html
comm -23 fileA fileB > output

$ cat a.txt 
a
b
c
d
$ cat b.txt 
a 
b
$ comm -23 a.txt b.txt 
a
c
d
```

Khi đó file output sẽ là các dòng dữ liệu của file A nhưng không xuất hiện trong file B. Tham số `-23` lấy các dòng xuất hiện trong cả 2 file, hoặc chỉ xuất hiện trong file B.

Trong trường hợp bạn muốn giữ nguyên trật tự sắp xếp ban đầu của file mà vẫn muốn đạt được mục đích tương tự, thì dùng command sau:

```html:html:html
# grep -Fvxf <lines-to-remove> <all-lines>
$ grep -Fvxf fileB fileA > output

$ cat a.txt 
a
d
c
b
$ cat b.txt 
a 
b
$ grep -Fvxf b.txt a.txt 
a
d
c
```

### 10. Trộn ngẫu nhiên (Shuffle) các dòng
Giả sử bạn đang huấn luyện mô hình phân loại hay gì đó, và bạn muốn chia train/test nhưng lại muốn dữ liệu của bạn có phân phối ngẫu nhiên. Khi đó, bạn có thể trộn ngẫu nhiên vị trí các dòng trong file.

```php
$ shuf filename
```

### 11. Split file thành nhiều file nhỏ hơn

Đôi khi bạn phải làm việc với file hàng chục GB, mà bạn lại muốn xử lý từng dòng file dữ liệu này. Vậy để có thể chạy đa luồng thì bạn cần chia nhỏ thành nhiều file. Trong linux có một command có thể giúp bạn làm việc này nhanh chóng:

```objectivec
// Kiểm tra số dòng của file
$ wc -l bigfile.txt
// Chia nhỏ theo số lượng dòng ở mỗi file con, giả sử là 1 triệu dòng mỗi file
$ split -l 1000000 bigfile.txt output_dir/prefix_
```

## Tổng kết
Trên đây là một số linux command hữu ích mà tổng hợp lại từ kinh nghiệm trong quá trình học tập và làm việc của mình. Các chia sẻ trong bài viết này tổng hợp từ các kết quả mình tra cứu trên Google. Nếu bạn có command nào hay thì đừng ngại chia sẻ với mọi người nhé.

Cảm ơn các bạn đã đọc hết bài viết!
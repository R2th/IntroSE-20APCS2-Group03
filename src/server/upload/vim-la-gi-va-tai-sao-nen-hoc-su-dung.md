![](https://images.viblo.asia/28c26c14-9d5f-4013-a0c8-6a04be9104c0.png)


# Giới thiệu chung về Vim
**Vim** là một **trình soạn thảo văn bản** thường được biết và nhắc đến là nhanh, mạnh mẽ. Nó có thể chạy ngay trên terminal mà vẫn cung cấp một giao diện đồ họa trực quan cho người dùng thao tác. Ngoài ra phải nhắc tới là nó có được tạo ra để tối ưu mọi thao tác cần thiết trong quá trình soạn thảo văn bản của bạn để chỉ sử dụng bàn phím. Đây cũng là điều mình thích nhất ở Vim 🤯🤯

**Vim** là một bản nâng cấp của một trình soạn thảo khác được trình làng năm 1976 tên **Vi**, và sau đó chúng ta có **Vi Improved** hay thường đc gọi là **Vim** như hiện tại.

Sẽ có câu hỏi đặt ra, tại sao *tới thời đại này rồi* mà chúng ta phải cân nhắc sử dụng **Vim**? Thì với cá nhân mình, chủ yếu là do mình quá lười 😅Khi mà đã đặt tay xuống để bắt đầu quá trình viết code, mình muốn bàn tay mình dính luôn lấy phím! Thật sự cái hành động nhấc tay lên cầm lấy con chuột vào kéo kéo thả thả có chút làm đứt mạch code của mình. Và **Vim** nổi lên như một giải pháp.

Với mình, học cách code sử dụng **Vim** cũng tựa như học cách chơi nhạc cụ vậy. Nó sẽ rất khó khăn khi mới bắt đầu, nhưng những khó khăn đó dần dần sẽ trở thành sự chính xác và hiệu quả trong tương lai.

Và trong bài hôm nay, mình sẽ giới thiệu cho các bạn những thao tác cơ bản làm nên tên tuổi của **Vim**!

Nói thêm thì mình là một PHP + JS developer, thế nên môi trường làm việc chủ yếu của mình là trên Ubuntu. Máy cá nhân sử dụng WSL Ubuntu 20.04, và máy công ty sử dụng Ubuntu 22.04

**Vim** thường được ship kèm luôn khi bạn cài các hệ điều hành Linux, BSD hoặc MacOS. Và trong series này, mình sẽ cài mới hoàn toàn bản WSL Ubuntu-22.04 và thao tác từ đầu.

# Các thao tác cơ bản với Vim

## Thoát khỏi Vim

**Vim** có thể được cài đặt và đi kèm gần như tất cả mọi nơi. Và đôi khi bạn chẳng may rơi vào bên trong mê cung **Vim** mà không làm sao thoát ra được 😂Ví dụ như merge non fast forward với git chẳng hạn.

![image.png](https://images.viblo.asia/e54b899d-90c1-4d94-be42-c2d54d43a70a.png)

Điều đầu tiên các bạn có thể học ở đây là thoát khỏi **Vim**. Nếu bạn chưa lỡ ấn nhầm chỉnh sửa gì, bạn có thể an toàn thoát khỏi **Vim** bằng cách gõ `:q`, trong đó `:` để đưa bạn vào trạng thái Command và `q` viết tắt của quit. Nếu file đã bị thay đổi, bạn có thể chọn discard hoàn toàn những thay đổi, giữ nguyên trạng thái của file và ép thoát **Vim** bằng cách gõ `:q!`, hoặc lưu lại thay đổi và thoát bình thường bằng tổ hợp `:wq` trong đó `w` viết tắt của write.

## Mở Vim

**Vim** có thể được mở bằng cách gõ `vim` ngay trên terminal. Hãy thêm param thứ 2 là địa chỉ dẫn tới file bạn muốn mở. **Vim** cũng có thể mở file chưa tồn tại. Chúng ta hãy mở terminal lên và gõ `vim hello.txt`. Máy mình vừa cài hệ điều hành, chưa có file gì cả nên sẽ nhận được giao diện như ảnh bên dưới.

![image.png](https://images.viblo.asia/7514b62d-c98e-4eb4-aa6d-bb00cdcb96b0.png)


## Các trạng thái trong Vim

**Vim** có khá nhiều mode (trạng thái), trong đó chúng ta cần biết 4 mode cơ bản là
1. Normal Mode - thường dùng cho việc điều hướng con trỏ
2. Edit Mode - dùng cho việc nhập dữ liệu
3. Command Line Mode - dùng để chạy các lệnh
4. Visual Mode - dùng để tạo vùng chọn

Chúng ta có thể chuyển qua lại giữa các mode này thông qua phím tắt luôn. 
Hiện tại thì mình đang ở **Normal Mode**.

Muốn ghi dòng chữ `Hello, World` thì cần nhấn `i` để chuyển sang **Edit Mode** rồi type, sau đó gõ `Esc` để trở về **Normal Mode**. Các bạn hãy chuyển sang **Edit Mode** và gõ kha khá chữ, kha khá dòng nhé. Có thể copy luôn 1 đoạn code nào đó cũng được luôn 😂
![image.png](https://images.viblo.asia/0c35de84-f184-48bc-9927-28785ecbbe8f.png)


## Điều hướng cơ bản

#### Điều hướng từng block
Bạn đã quen với việc di chuyển trái phải lên xuống bằng tổ hợp 4 phím mũi tên phải không? Hãy tiếp tục tập thói quen di chuyển bằng tổ hợp phím `hjkl`. Điều này tương đối cần thiết. Lý do chủ yếu cho việc bố trí này, là do một dev tiêu chuẩn thường gõ được 10 ngón (bạn nào vẫn gõ mổ cò thì nên học ngay gõ 10 ngón đi nhé), 2 ngón trỏ đặt trên 2 phím neo là `f` và `j`, và việc gõ phím sẽ xoay quanh khu vực phím này, như vậy nếu thuần thục việc điều hướng ngay tại hàng phím cơ sở thì sẽ bớt được động tác nhấc tay phải lên tìm tới hàng phím arrow, ấn ấn để điều hường rồi lại nhấc tay phải về hàng phím cơ sở, tìm phím `j` để hạ ngón trỏ xuống 😰

![image.png](https://images.viblo.asia/65e49ec7-fd68-4253-9005-007690700df9.png)

Có 1 chút trick cho bạn mới làm quen, là bạn sẽ thấy `h` nằm ngoài cùng bên trái và `l` nằm ngoài cùng bên phải thì thôi cũng dễ luyện rồi. còn lại thì `j` là phím có neo, sẽ là xuống vì thao tác xuống dưới sẽ phổ biến hơn là thao tác đi lên, do chúng ta đang đọc văn bản từ trên xuống dưới mà 😂 còn lại `k` là đi lên rồi.

#### Điều hướng với từng dòng
* `0` - đi tới block đầu tiên của dòng, ví dụ dòng thứ 2 của mình, ấn `0` thì đi tới đầu luôn
* `^` - đi tới block đầu tiên có ký tự không phải rỗng, ví dụ dòng thứ 2 của mình, ấn `^` sẽ đưa con trỏ tới chữ `c` trong từ `console`
* `$` - đi tới block cuối cùng có ký tự không phải rỗng.
* `g_` - đi tới block cuối cùng bất kể có rỗng hay không.
* `f{i}` - viết tắt cho *forward*, gõ `f` và 1 ký tự, **Vim** sẽ đưa con trỏ tới vị trí bên phải kế tiếp có ký tự đó, nếu muốn tiếp tục tìm kiếm ký tự đó hãy ấn `;`
* `F{i}` - cũng là tìm tới ví trị có ký tự đó, nhưng tìm về hướng ngược lại, bên trái của con trỏ
* `t{i}` - viết tắt cho `til`, nó cũng tìm tới ký tự đó giống như `f` nhưng chỉ tiệm cận, đặt con trỏ ngay trước vị trí tìm được
* `T{i}` - tương tự, là tìm kiếm phía ngược lại của `t`

#### Điều hướng cả màn hình
* `H` - đi đến block đầu tiên trên màn hình hiện tại
* `L` - đi tới block cuối cùng trên màn hình hiện tại
* `gg` - đi tới block đầu tiên của file
* `G` - đi tới block cuối cùng của file

Nhiều khi file code của bạn khá dài, bạn thường lên xuống sử dụng `Page Up`/`Page Down` đúng không? Ở đây chúng ta cũng có
* `ctrl f` - nhảy nguyên một màn hình xuống dưới
* `ctrl b` - nhảy nguyên một màn hình lên phía trên
* `ctrl d` - nhảy nửa màn hình xuống dưới
* `ctrl u` - nhảy nửa màn hình lên phía trên

Mình thường dùng 2 cái sau nhiều hơn khi mà mình di chuyển lên xuống mà vẫn muốn track xem mình đang ở đâu, cái đoạn trước/sau là gì.

#### Điều hướng giữa các từ

Ở đây mình muốn điều hướng giữa các word, tuy vậy trong Vim phân ra 2 loại word cho các bạn thêm lựa chọn.

* **word** - là các tập hợp các chữ cái, chữ số và dấu gạch dưới `_` (shift -)
* **WORD** - là tập hợp các ký tự không phải rỗng, phân tách nhau bằng dấu cách (space)

với định nghĩa trên thì chúng ta có thể coi như này
* 192.168.1.1 - có 7 **word**
* 192.168.1.1 - có 1 **WORD**

Và các bạn có thể điều hướng giữa các từ như sau:
* `w` - nhảy sang block đầu tiên của **word** kế tiếp bên phải
* `W` - nhảy sang block đầu tiên của **WORD** kế tiếp bên phải
* `b` - nhảy sang block đầu tiên của **word** liền kề bên trái
* `B` - nhảy sang block đầu tiên của **WORD** liền kề bên trái
* `e` - nhảy sang block cuối cùng của **word** liền kề bên phải
* `E` - nhảy sang block cuối cùng của **WORD** liền kề bên phải

#### Tìm kiếm trong file
* `*` - đi tới vị trí gần nhất tiếp theo có cùng **word** với vị trí con trỏ hiện tại.
* `#` - ngược lại, chúng ta đưa con trỏ tới ví trí có cùng **word**, nhưng là gần nhất ở phía trước con trỏ.
* `/{index}` - gõ `/` sẽ đưa bạn vàom *Command Mode*, lúc này bạn gõ các ký tự cần tìm kiếm, ấn `Enter` và nó sẽ đưa bạn tới vị trí xuất hiện tiếp theo, tiếp tục ấn `n` để tìm kiếm tiếp theo, hoặc `N` để tìm kiếm hướng ngược lại
* `?{index}` - ngược lại của lệnh trên =]]

#### Motion

Trên đây là những lệnh điều hướng cơ bản mà mình thường sử dụng. Chúng được gọi là *Motion* trong **Vim**. Các bạn có sử dụng cú pháp `{count} {motion}` để lặp lại thay tác nhiều lần. Ví dụ, mình muốn xuống 9 dòng dưới, thay vì gõ `jjjjjjjj` thì mình có thể gõ `9j` cũng cho kết quả tương tự 🤯


## Chỉnh sửa văn bản

Phía trên mình đã nhắc tới sử dụng `i` để  tiến vào *Insert Mode* và thao tác, rồi trở về *Normal Mode* bằng cách ấn `Esc`. Để nói chính xác thì `i` ở đây ko phải là *Insert* mà đúng hơn là `i` trong *Inside*, chúng ta cùng tìm hiểu thêm nhé

* `i` - tiến vào *Insert Mode*, đặt con trỏ vào bên trái của block hiện tại. Ví dụ nếu con trỏ đang nằm tại block `c` trong từ `abcde`, ấn `i` và gõ sẽ thêm các ký tự vào giữa `b` và `c`
* `a` - tiến vào *Insert Mode*, đặt con trỏ vào bên phải của block hiện tại. . Ví dụ nếu con trỏ đang nằm tại block `c` trong từ `abcde`, ấn `a` và gõ sẽ thêm các ký tự vào giữa `c` và `d`
* `I` - đưa con trỏ vào block đầu tiên không rỗng của dòng và *Insert Mode* từ bên trái
* `A` - đưa con trỏ vào block cuối cùng dòng và *Insert Mode* sang bên phải
* `o`- tạo một dòng mới ngay dưới dòng hiện tại và *Insert Mode*
* `O` - tạo một dòng mới ngay bên trên dòng hiện tại và *Insert Mode*
* `x` - ngay tại *Normal Mode*, gõ `x` sẽ xóa 1 ký tự tại block hiện tại mà con trỏ đang đứng
* `r{c}` - ngay tại *Normal Mode*, gõ `r` rồi gõ tiếp 1 ký tự khác sẽ thay ký tự đó vào vị trí block hiện tại
*`u` - tại *Normal Mode*, muốn *undo* về trạng thái trước
*`ctrl r` - tại *Normal Mode*,  muốn *redo* về trạng thái sau

## Chọn văn bản

Tại *Normal Mode*, chúng ta có thể tạo vùng chọn văn bản, hay nói Tiếng Việt là bôi đen 🤣
* `v`-  tiến vào *Visual Mode*, sử dụng các motion để select đoạn văn bản
* `V` - cũng là tiến vào *Visual Line Mode*, sử dụng các motion để select đoạn văn bản trên từng dòng

## Tổ hợp hành động

### Giới thiệu về tổ hợp

Trong **Vim**, chúng ta có 4 hành động chính có thể sử dụng trong hầu hết các mode, trừ *Insert Mode*, lần lượt là
* `d` - viết tắt của *delete*, dùng để xóa, đồng thời lưu phần đã xóa vào clipboard
* `c` - viết tắt của *change* hoặc *cut* thì đúng hơn, dùng để xóa, đồng thử lưu phần đã xóa vào clipboard và tiến vào *Insert Mode*
* `y` - viết tắt của *yank*, ở trong **Vim** chính là thao tác copy
* `p` - viết tắt của *paste*, dùng để dán nội dung trong clipboard ra

Một tổ hợp hành động sẽ có dạng đầy đủ là `{action} {count} {motion}`. Một số ví dụ của tổ hợp hành động, có sử dụng các motion đã nêu để các bạn có thể hình dung dễ hơn:
* xóa dòng hiện tại đồng thời xóa 5 dòng phía trên: `d5k` (bạn ấn `5k` tới dòng nào thì `d5k` xóa từng đó dòng)
* xóa dòng hiện tại đồng thời xóa 3 dòng phía dưới, sau đó tiến vào *Insert Mode*: `c3j`
* copy từ vị trí con trỏ tới hết **word** hiện tại và 2 **word** tiếp theo: `y3w`
* xóa các ký tự tới khi tìm thấy ký tự `'` tiếp theo, xóa luôn cái `'` đó và lưu cái đã xóa vào clipboard: `df'`
* vẫn là xóa các ký tự tới khi tìm thấy ký tự `'` tiếp theo, nhưng không xóa luôn cái `'` đó, và lưu cái đã xóa vào clipboard: `dt'`
* riêng paste thường chỉ ấn `p` để paste luôn vào vị trí con trỏ đang đứng, hoặc muốn paste 3 lần liên tiếp thì gõ `3p`

Ngoài ra, chúng ta có một số tổ hợp của chính *action*
* `dd` - xóa dòng con trỏ đang đứng, lưu vào clipboard
* `cc` - xóa dòng con trỏ đang đứng, lưu vào clipboard, tiến vào *Insert Mode* ngay tại dòng vừa bị xóa
* `yy` - copy dòng có con trỏ, lưu cả dòng vào clipboard
* `D` - tương đương với `d$`, xóa từ vị trí con trỏ hiện tại tới hết dòng, lưu vào clipboard
* `C` - tương đương với `c$`, xóa từ vị trí con trỏ hiện tại tới hết dòng, tiến vào *Insert Mode*, lưu vào clipboard
* `Y` - tương đương với `yy`, copy cả dòng hiện tại

### Tổ hợp với inside/around
Có 2 *count* mà mình rất hay dùng mà ở trên mình có nhắc tới là 2 *motion* `i` và `a`, hiện sẽ đóng vai trò làm *count*, viết tắt của *inside* và `around`. Ví dụ mình đang có text "Hello, World" và đặt con trỏ tại bất kỳ vị trí nào trong cái text này
* `i` - thao tác với mọi thứ bên trong. Muốn xóa chữ `Hello, World` đi? gõ `di"`, nó sẽ tìm tới cặp dấu `"` và xóa mọi thứ bên trong cặp dấu đó.
* `a` - thao tác với index, ví dụ bạn muốn đổi `"Hello, World"` thành `'Hi!'`?, gõ `ca"` rồi type `'Hi!'
* *count* này hiểu cặp ngoặc đối xứng `()` `[]` `{}`. Ví dụ trong một cụm `if {}`, bạn navigate con trỏ vào vị trí bất kỳ giữa `{` và `}`, thì 2 lệnh `ci{` và `ci}` đều cho kết quả giống nhau.


Vì tác dụng như vậy nên *count* cũng có chút kén *motion*, các *motion* mà nó support gồm:
* `w` và `W` - **word** và **WORD**
* `s` - viết tắt của *sentence*, là *motion* khả dụng khi kết hợp với tổ hợp `i`, `a` này, định nghĩa là 1 mệnh đề, 1 câu kế thúc với dấu `.`, `!`, `?`
* `p` - viết tắt của *paragraph*, là *motion* khả dụng khi kết hợp với tổ hợp `i`, `a` này, gồm đoạn văn bản kết hợp nhiều *sentence* cho tới khi xuốn dòng.
* `t` - viết tắt của *tag html*, là cặp đối xứng kiểu `<element></element>`
* các dấu quote `'`, `"`, `\``
* các dấu ngoặc `()`, `[]`, `{}`, `<>`
* `b` - đại diện cho ngoặc tròn *round bracket*, `dab` tương đương với `da(` và `da)`
* `B` - đại diện cho ngoặc nhọn *curly backet*, `daB` tương đương với `da{` và `da}`

# Tổng kết

Các bạn có thể thấy hơi ngợp với lượng keymap "cơ bản" mà nhiều như vậy. Tuy nhiên, khi bạn đạt tới giai đoạn như mình, thuần thục những thao tác cơ bản và đạt danh hiệu tự phong `Muscle Memory Vim` rồi thì việc navigate và modify văn bản của bạn sẽ trở nên dễ dàng hơn rất nhiều.

Bài viết này hi vọng phần nào đó gợi lên trí tò mò trong bạn. Và trong các bài viết sau, mình sẽ giới thiệu kỹ hơn các mảnh ghép xung quanh **Vim**. Hãy ấn follow mình để không bỏ lỡ nhé, và hẹn gặp lại!
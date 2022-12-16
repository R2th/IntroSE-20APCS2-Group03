**Regular expression** là một nhóm của các ký tự được dùng để tìm ra một pattern cụ thể nào đó trong một hay một vài câu hay đoạn text. Bạn có thể gọi chúng là `biểu thức đại diện` cũng được. Đứng về khía cạnh là một developer thì `regular expression` có thể được coi là một công cụ rất là mạnh trong việc lập trình, bạn chắc chắn đã từng phải dùng chúng trong chương trình của bạn ví dụ như chức năng search hay thay thể biểu thức, vân vân và mây mây... Các ứng dụng khác nhau và ngôn ngữ lập trình sẽ có những các implement cho biểu thức regex một cách khác nhau, nhưng về mặt ý tưởng, về mặt concept thì chúng giống nhau. Trong bài viết này mình sẽ dùng ngôn ngữ PHP để giải thích và lấy ví dụ cho các bạn hiểu thêm về Regex nhé.

![](https://images.viblo.asia/cf93f312-4925-4c93-acbc-e75656e17c50.png)



# 1 Biểu thức chính quy là gì ?
`Biểu thức chính quy` là một chuỗi miễu tả một bộ các chuỗi khác, theo những quy tắc cú pháp nhất định từ trái sang phải. `Regular Expression` là cách nói đầy đủ của biểu thức chính quy, nhưng bạn sẽ thấy các bài viết khác bạn tìm được trên google viết tắt là `regex` hay `regexp`. Biểu thức chính quy được dùng cho việc thay thế một đoạn text trong một chuỗi dài, validate form, lấy một chuỗi nhỏ trong một chuỗi lớn dưới vào pattern mà chúng ta định nghĩa ra, và còn rất nhiều trường hợp khác các bạn có thể sử dụng nó.

Hãy tưởng tượng rằng bạn đang viết một chương trình và bạn muốn set những rules cho iệc khi user lựa chọn username. Bạn muốn cho phép user chứa những chữ cái, những con số, gạc dưới (), hay là dấu gạch ngang (-). Bạn cũng muốn giới hạn số lượng những ký tự trong username. Bạn sử dụng biểu thức chính quy dưới đây để validate theo yêu cầu vừa đặt ra nhé
```PHP
^[a-z-9_-]{3,15}$
```
* `^`: ký tự bắt đầu một chuỗi
* `[a-z-9_-]`: chỗ này thể hiện là cho phép lấy chữ cái, các con số, dầu gạch dưới, dấu gạch ngang.
* {3,15}`: giới hạn chuỗi từ 3 đến 15 ký tự
* `$`: ký tự kết thúc chuỗi.

Biểu thức chính quy ở trên có thể chấp nhận các chuỗi sau: `hoang_nm`, `ho-ang_nm`, và `hoangnm_97`. Nó không match với chuỗi `Hoangnmmmmmmmmmmmmmmmmmmmmm` bởi vì nó chưa ký tự viết hoa và nó không nằm trong khoảng từ 3 đến 15 ký tự.
# 2.Ví dụ cơ bản
Biểu thức chính quy là một mẫu các ký tự mà bạn có thể sử dụng để thực hiện tìm kiếm trong một đoạn văn bản. Ví dụ, biểu thức chính quy `Nguyen` tức là nó sẽ tìm trong một đoạn text bắt đầu bằng `N`, tiếp đến là `g` và tiếp đến cho đến cuối cùng là `n`

Hoang => Nguyen Minh **Hoang**

Biểu thức chính quy `123` khớp với chuỗi `123`. Biểu thức chính quy được so khớp với chuỗi đầu vào bằng cách so sánh từng ký tự trong biểu thức chính quy với mỗi ký tự trong chuỗi đầu vào, lần lượt từng ký tự một. Biểu thức chính quy thường phân biệt những chữ thường, nếu như ta so khớp với chuỗi `hoang` trong chuỗi bên trên thì chắc chắn nó sẽ không được so khớp.

Hoang => Nguyen hoang Minh **Hoang**

# 3.Meta Characters
**Meta Character** ở đây ý muốn nói là thay vì các bạn cố định biểu thức chính quy cụ thể như `Hoang` thì các bạn còn có thể lấy bao quát hơn nữa bằng cách sử dụng khối biểu thức chính quy. Ở dưới đây là bảng giải thích khối biểu thức chính quy


| Meta characters |Description |
| -------- | -------- |
| .     | Match với tất các các ký tự ngoại trừ ký tự đặc biệt xuống dòng \n     |
| []   |Match với bất cứ ký tự được chứa giữa cặp ngoặc vuông này |
| [^ ] | Match với bất cứ ký tự nào mà không được chứa giữa cặp ngoặc vuông này|
|\*| Đại diện cho không hoặc nhiều ký tự|
|\+| Match 1 hoặc nhiều lần lặp lại của biểu tượng đứng trước +|
|?|Có hay không ký tự đứng trước nó|
|{n,m}| Độ dài chuỗi nằm trong khoảng từ n cho đếm m|
|(xyz)| Match với chuỗi xyz theo thứ tự nhiều lần|
| \| | Hoặc  |
| \\ | Đứng trước ký tự như `{}, [], / \ + * . & ^` để không bị nhầm lẫn giữa syntax và ký tự cần match|
| ^ | Bắt đầu của input |
| $ | Match đến cuối của input

## 3.1 Match với một ký tự bất kỳ
Trong biểu thức chính quy khi chúng ta sử dụng ký tự `.` là ví dụ đơn giản nhất cho việc chúng ta so khớp với nhiều ký tự trong chuỗi input. `.` trong biểu thức chính quy nghĩa là match với đơn ký tự. Nó sẽ không so khớp với ký tự xuống dòng `\n`. Ví dụ, bạn có biểu thức chính quy là `.g` tức là nó sẽ so khớp với chuỗi đầu vào bất cứ những từ nào trong chuỗi đầu vào bắt đầu bằng  bất cứ ký tự nào nhưng sau đó phải là `g`.

**.g** => **ng**uyên **ng**uyền **ng**uyến **ng**uyển **ng**uyện 
## 3.2 Character set
**Character sets** được gọi là nhóm các ký tự. Cặp ngoặc vuông được dùng để chỉ ra những ký tự nào được so khớp. Thứ tự so khớp của các ký tự trong cặp dấu ngoặc vuông này các bạn không cần quan tâm.  Ví dụ, ta có biếu thức chính quy như sau

**[Nn]guyen** => **N**guyen **n**guyen Minh Hoang

**et[.]** => Day la dau cham h**et.**

### 3.2.1 Negated character set
Như ta đã biết ký tự `^` là ký tự đại diện cho bắt đầu một chuỗi nhưng khi sử dụng trong cặp dấu ngặc vuông, cụ thể hơn là sau mở ngoặc vuông thì nó sẽ có nghĩa là không match với những ký tự sau `^` trong cặp dấu ngoặc vuông.

**[^c]**\oi => Dong **d**oi la phai biet nguon coi cua nhau.

## 3.3 Repetitions
`+`, `*` hoặc `?` được dùng để chỉ định sự xuất hiện bao nhiêu lần của 1 hoặc 1 nhóm pattern có thể xuất hiện. 
### 3.3.1 *
`*` đại diện cho không hoặc nhiều ký tự. Ví dụ biểu thức chính quy `a*` chúng ta có thể hiểu là sau `a` có thể không có  hoặc nhiều ký tự đứng sau nó. Nhưng nếu nó xuất hiện sau một class ký tự được đặt trong dấu ngoặc vuông thì nó sẽ so khớp tất cả các trường hợp mà được set ở trong dấu ngoặc vuông đó. Ví dụ, biểu thức chính quy `[a-z]*` có nghĩa là so khớp bất cứ chữ cái thường nào.

**\[a-z]\*** => Nguyen **minh** **hoang** **sinh** **nam** **bao** **nhieu**.

`*` có thể được sử dụng với meta character, để có thể so khớp bất cứ chuỗi của các ký tự `.*`. `*` có thể được sử dụng với whitespace `\s` để so khớp một chuỗi của chứa whitespace. Ví dụ, ta có biểu thức chính quy như sau `\s*em\s*` có nghĩa là: không hoặc nhiều space, theo sau đó là ký tự `e`, tiếp theo sau đó là ký tự `m`, cuối cùng đó là không hoặc nhiều space.

**\s\*em\s\***  => Khi doi moi **em** con do mong, an k**em** truoc cong

### 3.3.2 +

`+` đại diện cho một hoặc nhiều ký tự. Ví dụ, ta có biểu thức chính quy `u.+n` nghĩa là bắt đầu so khớp bắt đầu là `u` tiếp đến là một ký tự bất kỳ nhưng bởi vì đằng sau nó có ký tự `+` nên bắt buộc sau `u` phải có một hoặc nhiều ký tự, cuối cùng là `n`.

**u.+n** => Ch**ung** ta **uon** **luon** **tuon** **cuon**

### 3.3.3 ?
`?` đại diện cho một hoặc không có ký tự nào. Ví dụ, biểu thức chính quy `[N]?hieu` có nghĩa là: Có hoặc không có ký tự N, tiếp đến là ký tự `h`, cứ tiếp diễn đến cuối cùng là ký tự `u`.

**\[N]?hieu** => **Nhieu** nguoi cho rang **hieu** nhau chua phai la du

## 3.4 Braces {}
Trong biểu thức chính quy `{}` được gọi là định lượng độ dài thường được sử dụng để chỉ rõ ra số lượng, hay số lần xuất hiện của ký tự hoặc một nhóm ký tự có thể lặp lại. Ví dụ, ta có biểu thức chính quy như sau `[0-9]{2,3}` có nghĩa là: các ký tự số tối thiểu là 2 và không được nhiều hơn 3, ký tự số nằm trong từ 0 đến 9.

`[0-9]{2,3}` => nam nay la  nam **202**0

Chúng ta có thể lấy ra nhiều hơn 3 ký tự bằng cách như sau 

`[0-9]{2,}` => nam nay la  nam **2020**

Hoặc lấy đúng 2 ký tự số

`[0-9]{2}` => nam nay la  nam **20**20

## 3.5 Capturing value

Capturing value là một nhóm các pattern nhỏ hơn được đặt trong dấu `()`. 
Ví dụ `(ng|th)uyen` có nghĩa là: bắt đầu bằng `ng` hoặc `th`, tiếp sau là ký tự `u`, và cứ cho đến cuối là `n`.

**(ng|th)uyen** => **nguyen** nhan dan den **thuyen** bi lat la song to

**(\[a-z\]+)(\[0-9\]+)** => **hoang0607**

## 3.6 Alternation
Trong biểu thức chính quy, thì `|` được sử dụng để định nghĩa hoặc có cái này hoặc có cái kia, hoặc có cả hai. Nó giống như phép `or` trong lập trình vậy. Ví dụ `(C|c)hung|ta` có nghĩa là: đầu tiền bắt đầu bằng `C` hoặc `c`, tiếp đến là `hun`, tiếp sau đó là `g` hoặc `t`, tiếp sau đó cuối cùng là `a`.

**(C|c)hung|ta** => **Chung ta** la mot gia dinh, bọn **chung** khong phai gia dinh

## 3.7 Special Character
Khi chúng ta muốn sử dụng các ký tự đặc trong đoạn regex `{}, [], / \ + * . & ^` thì chúng ta có thể kèm theo ký từ `\` trước ký tự đặc biệt đó để cho đỡ bị nhầm lẫn với syntax regex nhé. 

**(g|c|m)a\\.** => **ga** an **ca**, cho an **ga**, cho can **ma.**
## 3.8 Anchors ^, $
Trong lập trình chúng ta muốn kiểm tra xem hai biến có chính xác bằng nhau hay không thì chúng ta chỉ cần so sánh `==`. Còn trong biểu thức chính quy chúng ta sẽ sử dụng bắt đầu `^` và ký tự kết thúc `$` đặt vào đầu hoặc cuối biểu thức chính quy, như vậy khi so khớp sẽ so sánh từ đầu đến cuối, tức là chúng ta sẽ so khớp hoàn toàn.
## 3.8.1 Anchor ^
Mình sẽ lấy 2 ví dụ để giải thích cho bạn nhé

**uyen** => ng**uyen** **uyen**

trong trường hợp này thì các bạn thấy đấy nó sẽ match với tất cả những từ có `uyen` không phân biệt là `uyen` nó nằm ở đâu. Nhưng khi bạn thêm `^uyen` thì nó sẽ khác

**^uyen** => nguyen **uyen**

* Ký tự thứ 1 phải là chứ `u` và bắt đầu chuỗi
* Ký tự thứ 2 phải là chữ `y`
* ...
* Ký tự cuối cùng phải là chữ `n`

## 3.8.2 Anchor $
Mình cũng sẽ lấy 2 ví dụ để giải thích cho bạn 

**uyen\.** => ng**uyen** **uyen.**

Nhưng khi các bạn thêm `$` ở cuối regex thì nó sẽ như sau

**uyen\.$** => nguyen uyen **uyen.**

Ý là bắt buộc sau ký tự `n` phải là dấu `.` thì mới hợp lệ

# 4. Shorthand and Character Sets
Biểu thức chính quy mang tới syntax ngắn mà thuận tiện hơn trong việc chúng ta viết các biểu thức regex.


| Shorthand | Description |
| -------- | -------- |
| .     | Bất cứ ký tự nào ngoại trừ ký tự xuống dòng \n     |
|\w| \[a-zA-Z0-9_] |
|\W|\[\w]|
|\d|\[0-9]|
|\D|\[^\d]|
|\s|\[^\s]|

# 5. Lookaround
Lookaround được chia làm 2 loại đó là lookahead và lookbehind. Nó dùng để kiểm tra điều kiện ở phía trước hoặc phía sau pattern đứng trước hoặc sau nó. Lookahead được sử dụng khi chúng ta có điều kiện pattern này được đi trước pattern khác. Ví dụ, bạn muốn lấy tất cả các số trước đó là ký tự `$`

**(?<=\$)\[0-9\.]\*** => **$1.67** **$1.02**

## 5.1 Positive Lookahead (?=)
Ví dụ bạn muốn lấy ra tất cả những user đứng sau là `@gmail.com` thì có thể viết biểu thức chính quy như sau 

**'/[^\s]+(?=@gmail\.com)/'** => **nguyenminhoang**@gmail.com nguyenminhhoang@framgia.com

ý ở đây sẽ là chỉ lấy những chuỗi đầu vào nào mà có đuôi `@gmail.com` thôi.

## 5.2 Negative Lookahead (?!)
Nó là ngược lại của `?=`. Bây giờ mình thay thế `?=` bằng `?!` thì nó sẽ có kết quả ngược lại.
**'/[^\s]+(?!@gmail\.com)/'** => **nguyenminhoang**@framgia.com 
## 5.3 Positive Lookbehind
Mình sẽ lấy ví dụ để bạn hiểu rõ hơn nhé. Bạn muốn regex những email có phần đầu là `nguyenminhhoang` thì các bạn sẽ viết biểu thức chính quy như sau:

**(?\<=nguyenminhhoang)@\[^,\]+** => nguyenminhhoang**@gmail.com** nguyenminhhoang**@yahoo.com** nguyenminhhoang@**framgia.com**
## 5.4 Negative Lookbehind

Ngược lại với Positive ở bên trên thì đó chính là Negative. Các bạn muốn lấy phần đuôi của email  không phải của `nguyenminhhoang` thì các bạn sẽ viết đoạn regex như sau:

**(?<!nguyenminhhoang)@\[^,]+**

thì trong những chuôi `nguyenminhhoang@gmail.com nguyen.minh.hoang@framgia.com` thì chuỗi thỏa mãn là `@framgia.com` bởi vì nó không chứa `nguyenminhhoang`

# 6. Flag
`Flag` cũng được gọi là modifier bởi vì chúng modify đầu ra của biểu thức chính quy. Những flag này có thể được sử dụng theo bất cứ thứ tự hoặc kết hợp nào, và là một phần không thể thiếu của Regex.

## 6.1 Case intensive (i)
Ví dụ ta có biểu thức chính quy như sau `/Nguyen/gi` nghĩa là: đầu tiên sẽ bắt đầu bằng `N`, tiếp theo sau đó là `g`, tiếp theo là `u`, sau nữa là `u`, tiếp theo nữa là `y` cho đến `n`. Ở cuối của biểu thức chính quy là `i` flag có ý nghĩa bảo với engine để ignore trường hợp đã xác định ở trên. Như các bạn đã thấy chúng ta cũng thêm `g` flag bởi vì muốn search cho pattern này ở trong toàn bộ chuỗi đầu vào.

**Nguyen**  => **Nguyen** minh nguyen

**/Nguyen/gi** => **Nguyen** minh **nguyen**

Cái flag này các bạn lưu ý để dùng trong các engine online có sẵn nhé, tùy thuộc các bạn chọn flag nào mà kết quả match regex nó sẽ khác nhau.
## 6.2 Global search (g)
`g` modifier được sử dụng để tìm trong những cái gì thoả mãn trong chuỗi đầu vào. Ví dụ, biểu thức chính quy `\.(a)n/g` có nghĩa là: bất cứ ký tự nào ngoại trừ ký tự xuống dòng mới, tiếp đó theo sau là ký tự `a`, sau đó nữa là `n`. Bởi vì cuối cùng có `g` flag nên nó sẽ tìm tất cả các khả năng có thể match được trong chuỗi input, không chỉ tìm và trả về kết quả đầu tiên

**/.(a)n/** => Con n**gan** danh dan ta lung

**/.(a)n/g** => Con n**gan** **dan**h **dan** ta lung

## 6.3 Multiline (m)
`m` modifier được sử dụng khi chúng ta cần match đoạn input có nhiều dòng. Như mình đã nói ở trên là ký tự anchors `(^, $)` được sử dụng để check nếu pattern muốn match ở đầu hay ở cuối của chuỗi đầu vào. Nhưng nếu chúng ta muốn những ký tự anchors làm việc trên một dòng tức là input đầu vào không có ký tự `\n`. Nếu các bạn muốn nó match trên nhiều dòng thì các bạn chọn `m` flag ở cuối của engine nhé. Ví dụ, bạn có biểu thức chính quy như sau: 

`/.{2}uyen(.)?$/` =>  Nguyen \
                                            minh \
                                            **nguyen.** 
                                            
`/.{2}uyen(.)?$/gm` => **Nguyen** \
                                            minh \
                                            **nguyen.** 
 # 7. Kết luận
 Vậy qua một vài những điều mình chia sẻ ở trên mong rằng một phân nào các bạn cũng hiểu hơn về biểu thức chính quy. Bài chia sẻ tiếp theo mình sẽ đi tìm hiểu một số hàm dùng với biểu thức chính quy và một số các ví dụ nhé. Cảm ơn các bạn đã đọc bài chia sẻ của mình.
 # 8. Tham khảo
 https://www.regular-expressions.info/
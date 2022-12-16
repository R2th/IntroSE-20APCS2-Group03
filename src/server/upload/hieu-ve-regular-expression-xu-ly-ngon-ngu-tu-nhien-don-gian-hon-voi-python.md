## Regular Expression là gì?
Một biểu thức chính quy là một chuỗi các ký tự được định nghĩa theo một quy tắt định trước nhằm xác định một tập hơn các chuỗi phù hợp với nó.

Các biểu thức chính quy có thể được ghép nối để tạo thành các biểu thức chính quy mới. Nếu **A** và **B** là hai biểu thức chính quy thì **AB** cũng là 1 biểu thức chính quy và nếu chuỗi **a** khớp với biểu thức **A** và một chuỗi **b** khác khớp với biểu thức **B** thì chuỗi **ab** sẽ khớp với biểu thức **AB**. Do đó, các biểu thức phức tạp có thể được xây dựng từ nhiều biểu thức đơn giản hơn.

Biểu thức chính quy có thể chứa cả những ký tự đặc biệt và những ký tự thông thường. Các ký tự thông thường như các chữ cái từ 'A' đến 'Z', từ 'a' đến 'z' và từ '0' đến '9'. Đây là các thành phần đơn giản nhât của một biểu thức chính quy, chúng đơn giản chỉ là biểu thức phù hợp với chính ký tự đó trong chuỗi. Bạn có thể ghép các ký tự thông thường này thành 1 chuỗi dài, ví dụ biểu thức 'python' sẽ khớp với chuỗi 'python'.

Một số ký tự đặc biệt như '**|**' hoặc '**(**',... Các ký tự đặc biệt này hoặc là viết tắt của các ký tự thông thường(ví dụ dấu '**.**' thay thế cho một ký tự bất kì,...), hoặc là ảnh hưởng tới cách các cụm từ xung quanh chúng được diễn giải(ví dụ ký hiệu '**A|B**' là thể hiện hoặc là khớp với biểu thức **A**, hoặc là khớp với biểu thức **B**).

Các vòng lặp bao gồm '***+?{m,n}**' không thể được lồng ghép trực tiếp. Để áp dụng một phép lặp thứ 2 bên trong một phép lặp, chúng ta sử dụng dấu *ngoặc đơn*

## Cú pháp Regular Expression

Các cú pháp đặc biệt bao gồm:

+ '**.**'
    + Ở dạng mặc định, ký tự này khớp với bất kỳ một ký tự thông thường nào ngoại trừ ký tự newline(**\n**).
+ '**\$**'
    + Khớp với ký tự cuối chuỗi(ký tự giả định được thêm vào cuối mỗi chuỗi hoặc trước ký tự newline trong trường hợp chuỗi có nhiều dòng). Ví dụ biểu thức '**foo**' sẽ khớp với cả hai chuỗi 'foo' và 'foobar' trong khi biểu thức '**foo\$**' chỉ khớp với chuỗi 'foo' mà không khớp với chuỗi 'foobar' nữa.
+ '**\***'
    + làm cho biểu thức chính quy khớp với 0 hoặc nhiều lần lặp lại của biểu thức chính quy được định nghĩa trước nó, càng nhiều lần lặp lại càng tốt. Ví dụ biểu thức '**ab\***' sẽ khớp với 'a', 'ab' hoặc 'a' theo sau bởi bất kỳ số chữ cái 'b' nào.
+ '**+**'
    + Làm cho biểu thức chính quy khớp với 1 hoặc nhiều lần lặp lại của biểu thức chính quy được định nghĩa trước nó. Ví dụ '**ab+**' sẽ khớp với 'a' theo sau bởi bất kỳ số chữ cái 'b' nào(khác 0, tức là chữ b xuất hiện ít nhất 1 lần), và nó không khớp với chuỗi 'a' nữa.
+ '**?**'
    + làm cho biểu thức chính quy khớp với 0 hoặc 1 lần lặp lại của biểu thức chính quy được định nghĩa trước đó. Ví dụ **ab?** sẽ khớp với chuỗi 'a' hoặc 'ab'.
+ '**\*?**', '**+?**', '**??**'
    + Ký tự '**\***', '**+**' và '**?**' là các ký tự tham lam, chúng sẽ khớp với chuỗi dài nhất có thể. Đôi khi hành vi này là không mong muốn, nêu biểu thức '**<.*>**' được so khớp với chuỗi '<a> b <c>', nó sẽ khớp với toàn bộ chuỗi(nhưng ta lại chỉ muốn tìm ra chuỗi '<a>' và '<c>').
Thếm dấu '**?**' vào sau chúng sẽ giải quyết được vấn đề này. Nó sẽ tìm ra chuỗi khớp với mẫu với ít ký tự nhất có thể. Sử dụng '**<.*?>**' sẽ chỉ khớp với chuỗi '<a>'.
+ '**{m}**'
    + chỉ định rằng chính xác m bản sao của biểu thức chính quy được định nghĩa trước đó được lặp lại, ít hơn sẽ không khớp. Ví dụ, '**a{6}**' sẽ khớp với chính xác 6 ký tự 'a', chuỗi có 5 ký tự 'a' sẽ không khớp.
+ '**{m,n}**'
    + chỉ định rằng biểu thức chính quy sẽ khớp với **m** đến **n** lần lặp lại của biểu thức chính quy được định nghĩa trước đó, có gắng khớp nhiều nhất có thể. Ví dụ '**a{3,5}**' sẽ khớp với chuỗi từ 3 đến 5 ký tự 'a'. Nếu bỏ qua **m**, nó sẽ mặc định là 0, còn **n** mặc định là vô hạn. Ví dụ '**a{4,}b**' sẽ khớp với 'aaaab' hoặc một nghìn ký tự 'a' theo sau là ký tự 'b'.
+ '**{m,n}?**'
    + Đây là phiên bản không tham lam của biểu thức trước, chỉ định rằng biểu thức chính quy sẽ khớp với **m** đến **n** lần lặp lại của biểu thức chính quy được định nghĩa trước đó, **có gắng khớp ít nhất có thể**. Ví dụ trong chuỗi 6 ký tự 'a', biểu thức '**a{3,5}**' sẽ khớp với 5 ký tự 'a' trong khi biểu thức '**a{3,5}?**' chỉ khớp với 3 ký tự 'a'.
+ '**\\**'
    + Đây có thể là ký tự với nhãn không phải ký tự đặc biệt(cho phép bạn coi các ký tự '**\*?.**' như các ký tự thông thường) hoặc là sự bắt đầu cho một ký tự đặc biệt, ví dụ '**\n, \t**'.
+ '**[...]**'
    + Được sử dụng để thể hiện tập các ký tự.
    + Các ký tự có thể được liệt kê riêng lẻ. Ví dụ '**[akm]**' sẽ khớp với ký tự 'a' hoặc 'k' hoặc 'm'.
    + Có thể liệt kê bằng 1 khoảng các ký tự, giữa ký tự bắt đầu và kết thúc cách nhau bởi dấu '**-**'. Ví dụ '**[a-z]**' sẽ khớp với tất cả các ký tự viết thường từ 'a' tới 'z'. '**[0-5][0-9]**' sẽ khớp với tất cả các số có 2 chữ số trong khoảng từ 00 đến 59. Nếu bạn thực sự muốn liệt kê ký tự '**-**' trong tập hợp thì hãy nhớ lại cách dùng dấu '**\\**' (sử dụng biểu thức '**[a\-z]**') hoặc thêm dấu '**-**' vào đầu hoặc cuối tập hợp('**[a-]**').
    + Các ký tự đặc biệt trong dấu '**[]**' sẽ được coi như ký tự thông thường. Ví dụ '**[(+*)]**' sẽ khớp với bất kỳ ký tự '**(**', '**+**' hoặc '**)**' nào.
    + Các ký tự như '**\\S**','**\\W**' được chấp nhận trong tập hợp
    + Nếu ký tự đầu tiên của tập hợp là '**^**', tất cả các ký tự không được định nghĩa trong tập hợp sẽ được so khớp. Ví dụ biểu thức '**[^5]**' sẽ khớp với tất cả các ký tự ngoại trừ '5'. Ký tự '**^**' chỉ có ý nghĩa khi nó ở vị trí đầu tiên trong tập hợp.
+ '**|**'
    + '**A|B**', trong đó A và B là các biểu thức chính quy tùy ý. Đây là một biểu thức chính quy khớp với các chuỗi khớp với biểu thức A hoặc B. Số lượng bất kỳ các biểu thức chính quy có thể được phân cách nhau theo cách này. Nó như phép toán **OR** trong số học.
+ '**(...)**'
    + Khớp với bất kỳ biểu thức chính quy nào bên trong dấu ngoặc đơn. Nó cũng là ký hiệu cho biết điểm bắt đầu và kết thúc của một nhóm. Các giá trị khớp với biểu thức trong cặp dấu ngoặc đơn được lưu lại và có thể được sử dụng lại sau này.

Các ký tự đặc biệt được bắt đầu bởi dấu '**\\**':

+ '**\\number**'
    + khớp với nội dung của nhóm được đánh số. Ví dụ, '**(.+)\1**' khớp với chuỗi 'the the' thì '**\1**' sẽ có giá trị là chuỗi 'the the'. Các chuỗi được đánh số từ 1 tới 99.
+ '**\\A**'
    + chỉ khớp với giá trị đầu chuỗi
+ '**\\b**'
    + khớp với chuỗi rỗng, nhưng chỉ ở đầu hoặc cuối của một từ. Một từ được định nghĩa là một chuỗi các ký tự chữ, số hoặc dấu gạch dưới. Do đó, kết thúc của một từ có thể được biểu thị bằng dấu khoảng trắng hoặc ký tự không phải chữ, số  và dấu gạch dưới. '**\b**' được định nghĩa là ranh giới giữa một '**\\w**' và một '**\\W**'(hoặc ngược lại) hoặc giữa '**\\w**' với ký tự bắt đầu/ kết thúc của một chuỗi. Ví dụ, '**r'\bfoo\b'**' sẽ khớp với 'foo', 'foo.', '(foo)', 'bar foo baz' nhưng không khớp với 'foobar' hoặc 'foo3'.
+ '**\\B**'
    + khớp với chuỗi rỗng, nhưng chỉ khi nó không đứng ở vị trí bắt đầu hoặc kết thúc 1 từ. Điều này có nghĩa là '**r'py\B'**' khớp với chuỗi 'python', 'python3', 'py2' nhưng không khớp với 'py.', 'py' hoặc 'py!'. Đây là trường hợp đối nghịch với '**\\b**'.
+ '**\\d**'
    + khớp với bất kỳ chữ số thập phân nào, tương đương với '**[0-9]**'
+ '**\\D**'
    + Khớp với bất kỳ ký tự không phải chữ số nào, tương đương với tập hợp ''**[^0-9]**''
+ '**\\s**'
    + khớp với bất kỳ ký tự khoảng trắng nào, tương đương với tập hợp '**[\t\n\r\f\v]**'
+ '**\\S**'
    + khớp với bất kỳ ký tự nào không phải khoảng trắng, tương đương với tập hợp '**[^\t\n\r\f\v]**'
+ '**\\w**'
    + khớp với bất kỳ ký tự chữ, số nào và dấu gạch dưới, điều này tương đương với tập hợp '**[a-zA-Z0-9_]**'.
+ '**\\W**'
    + khớp với bất kỳ ký tự không phải chữ, số nào và dấu gạch dưới, điều này tương đương với tập hợp '**[^ a-zA-Z0-9_]**'
+ '**\\Z**'
    + chỉ khớp với giá trị cuối chuỗi.

## Các biểu thức chính quy thông dụng trong xử lý dữ liệu văn bản
1. Thời gian: ngày, tháng, năm

```python
text = u'Ngày 14/12/1996 là ngày 14/12 của năm 1996. Tháng 12/2000 là tháng cuối cùng của năm.'
datetime = '\d{1,2}\s?[:/-]\s?\d{1,2}\s?[:/-]\s?\d{4}' \
           '|\d{1,2}\s?[:/-]\s?\d{4}' \
           '|\d{1,2}\s?[:/-]\s?\d{1,2}' \
           '|\d{4}'

import re
print re.findall(datetime, text)
```
Kết quả:
> \[u'14/12/1996', u'14/12', u'1996', u'12/2000'\]

2. Địa chỉ email
```python
text = u'địa chỉ mail của mình là phamquang@gmail.com và 20172603@student.hust.edu.vn'
email = '[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+'

import re
print re.findall(email, text)
```
Kết quả:
> \[u'phamquang@gmail.com', u'20172603@student.hust.edu.vn'\]

3. link website
```python
text = u'Đây là link bài viết mới nhất của mình trên viblo: https://viblo.asia/p/tro-chuyen-voi-le-viet-quocquoc-le-chuyen-gia-tri-tue-nhan-tao-phia-sau-su-thanh-cong-cua-google-automl-eW65GAW6ZDO'
url = 'https?:\/\/[^\s]*'

import re
print re.findall(url, text)
```
Kết quả:
> \[u'https://viblo.asia/p/tro-chuyen-voi-le-viet-quocquoc-le-chuyen-gia-tri-tue-nhan-tao-phia-sau-su-thanh-cong-cua-google-automl-eW65GAW6ZDO'\]
4. Số thực
```python
text = 'Mình nặng 70.5kg, nặng 175.8 cm.'
digit = '\d+[\.,]\d+'

import re
print re.findall(digit, text)
```
Kết quả:
> \['70.5', '175.8'\]

5. Phân số
```python
text = u'đạt được kết quả PES1 22/100 điểm'
fraction = '\d+\/\d+'

import re
print re.findall(fraction, text)
```
Kết quả:
> \[u'22/100'\]

6. Chuẩn hóa tiền tệ
```python
import re

text = u'mình có 2.000.000 yên trong tài khoản với hơn 2000$ tiền mặt mà k biết tiêu gì nên đổi hơn 10 tỷ vnđ ra đốt chơi.'
moneytag = [u'k', u'đ', u'ngàn', u'nghìn', u'usd', u'tr', u'củ', u'triệu', u'yên', u'tỷ']
for money in moneytag:
    text = re.sub(u'(^|\s)\d*([,.]?\d+)+\s*' + money, ' monney ', text)
text = re.sub('((^|\s)(\d+\s*\$)|((^|\s)\$\d+\s*))', ' monney ', text)

print text
```
Kết quả:
> mình có **monney** trong tài khoản với hơn **monney**  tiền mặt mà k biết tiêu gì nên đổi hơn **monney** vnđ ra đốt chơi.
 

7. Chuẩn hóa láy âm tiết(thể hiện cảm xúc đặc biệt)
```python
import re
text = u'Món này ngooon quá điiiiiiii!!!!!!!!!'
print re.sub(r'(\D)\1+', r'\1', text)
```
Kết quả:
> Món này ngon quá đi!
 
## Kết luận

Ngoài những ví dụ trên còn có rất rất nhiều tình huống mà các biểu thức chính quy thể hiện sự mạnh mẽ của mình.

Nhìn chung sử dụng biểu thức chính quy giúp ta dễ dàng hơn trong các xử lý cho văn bản, tìm kiếm và trích rút thông tin một cách đơn giản và trực quan, xác thực dữ liệu người dùng nhập vào đó đúng chuẩn mong muốn không, thay đổi một kiểu mẫu trong văn bản lớn thành một mẫu khác,...
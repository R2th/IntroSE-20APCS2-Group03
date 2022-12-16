# Giới thiệu
Hôm nay trong lúc lướt web, mình chợt qua một link về việc bạn [không thể parse HTML bằng regex](https://stackoverflow.com/a/1732454/2327379) (chú ý: rất nhiều câu trả lời đùa giỡn trong đó). Tóm tắt ngắn lại lý do về lý thuyết là HTML là *Context-Free Language*, một chuẩn ngôn ngữ bao quát hơn (hay còn gọi là tập hợp cha của) *Regular Expression*. Tuy nhiên, thực tế hơi khác một chút:
- Thứ nhất, regex trong thực tế không giống với regex theo định nghĩa về ngôn ngữ học trong khoa học máy tính;
- Ngoài ra bạn có thể sử dụng regex cho các  đoạn HTML đơn giản, đã escape các ký tự đặc biệt (ví dụ: `>` thành `&gt;`). Một ví dụ regex lấy từ link trên là:
```javascript:regex
<([^\s]+)(\s[^>]*?)?(?<!/)>
```

Nhưng đây không phải là nội dung chính của bài này (^^;) Trong link đó có dẫn tới một đoạn regex ngắn được cho là từ Perl power user Abigail (trang cá nhân của cô ấy đã biến mất), được tạo ra từ những năm 9x lưu truyền qua các kênh newsletter. Đoạn regex này có thể nhận biết được nếu một số là số nguyên tố:
```php:regex
/^1?$|^(11+?)\1+$/
```
Kỳ thú, phải không?

# Test chức năng
Ở link [này](https://www.noulakaz.net/2007/03/18/a-regular-expression-to-check-for-prime-numbers/), tác giả có thử regex bằng Ruby để check cho chắc kèo xem liệu có phải regex này xịn không, hay là ma thuật của Perl :) Mình sẽ viết một đoạn code tương tự nhưng trong ngôn ngữ Python:
```python
import re
is_prime = lambda num: re.search(r'^1?$|^(11+?)\1+$', '1' * num) is None

print(100, is_prime(100))
print(101, is_prime(101))
```
Chú ý, dấu `/` bắt đầu và kết thúc regex pattern không có trong Python, và đầu vào của pattern này được encode bằng hệ đơn phân. Và như dự đoán, kết quả ra đúng như mong đợi:
```objectivec
100 False
101 True
```
Vậy đoạn regex này hoạt động như thế nào?

# Giải thích
Có thể thấy rằng regex này có 2 phần, được phân chia bởi `|`: nghĩa là match 1 trong 2 cái là được. Chúng ta sẽ đi tìm hiểu từng cái một:
- `^1?$`: trong pattern này, `^` yêu cầu regex bắt từ đầu chuỗi, và `$` yêu cầu bắt cuối chuối, đồng nghĩa với việc pattern này phải bắt được toàn bộ chuỗi thì sẽ là hợp số. Phần còn lại là `1?`, nghĩa là bắt 0 hoặc 1 ký tự `1`, tương ứng với giá trị 0 và 1, và đúng là 2 giá trị đó đều không phải số nguyên tố. Nếu đầu vào không phải là 2 giá trị này, chúng ta qua phần thứ 2 của regex.
- `^(11+?)\1+$`: tương tự như regex trên, pattern này yêu cầu bắt toàn bộ chuỗi đầu vào. Chúng ta lại chia nhỏ regex này thành 2 phần nữa:
    - `(11+?)`: chuỗi này sẽ bắt 1 số `1`, rồi bắt thêm ít nhất 1 số `1` nữa theo toán tử `+`. Tuy nhiên, toán tử `?` yêu cầu phần tử trước bắt chuỗi lười (thay vì tham như mặc định) <sup>[1]</sup>. Cụ thể hơn, mặc định thì `1+` sẽ bắt càng nhiều số 1 có thể càng tốt; tuy nhiên `1+?` sẽ bắt đầu bằng việc bắt 1 số 1. Nếu không thành công, nó sẽ backtrack và bắt 2 số 1. Nếu vẫn không thành công, nó backtrack và chuyển qua 3 số `1`, và cứ thế. Vậy, `11+?` sẽ bắt từ 2 số `1` trở lên, và cứ thế tăng dần số chữ số 1 nếu bắt không thành công.
    - `\1+`: `\1` được trỏ đến capture group 1, nghĩa là những gì đã bắt được trong ngoặc vừa rồi. Và tương tự như trên, `\1+` yêu cầu nhóm đó lặp lại 1 lần hoặc nhiều hơn.

    Ghép 2 phần đó lại, ta có được cách hoạt động:
    - `(11+?)` sẽ bắt đầu bắt 2 số `1`, và `\1+` sẽ bắt tiếp một bội-số-của-2 các số `1`. Vậy, `(11+?)\1+` sẽ bắt 4, 6, 8, 10,... các số `1`, và `^(11+?)\1+$` sẽ yêu cầu chuỗi được bắt phải chiếm toàn bộ chuỗi đầu vào.
    - Nếu thất bại, `(11+?)` sẽ bắt 3 số `1`, và `^(11+?)\1+$` sẽ bắt các chuỗi có số `1` có độ dài là 6, 9,...
    - Cứ như vậy, đến lúc `(11+?)` dài quá độ dài của chuỗi đầu vào, regex sẽ kết thúc, và trả lại không bắt được, nghĩa là đầu vào là một số nguyên tố.

Với giải thích trên, chắc các bạn cũng thấy nguyên tắc hoạt động của regex này khá dễ hiểu nhỉ? Capture group sẽ thử từng giá trị từ 2 trở đi, và lặp lại capture group đó thử cả chuỗi đó xem có phải là bội số không tầm thường của giá trị trên không. Nếu trúng 1 ước nào đó, regex sẽ trả về match, và nếu capture group dài quá chuỗi đầu vào rồi mà vẫn không tìm ra ước thì số đó là số nguyên tố.

<sup>[1]</sup> Cần chú ý rằng `?` ở đây khác với toán tử cho không bắt buộc: `1?` nghĩa là bắt 0 hoặc 1 số 1, nhưng `1+?` thì như mình đã giải thích ở trên: để ý rằng toán tử `?` ở đây có tác dụng lên toán tử `+` chứ không phải chữ cái `1` như ví dụ đầu.

# Bình luận
## So sánh với sàng Eratosthenes
Các bạn có thể thấy rằng "thuật toán" này khá giống với [sàng Eratosthenes](https://vi.wikipedia.org/wiki/S%C3%A0ng_Eratosthenes), chỉ khác nhau ở chỗ là thuật toán này không nhớ các giá trị hợp số đã bị loại ra để bỏ qua không kiểm tra các ước đó nữa. Khi sử dụng regex này với các chuỗi to, chúng sẽ mất rất nhiều thời gian:
```python
from timeit import timeit
def time(num: int, count: int) -> None:
    val = timeit(lambda: is_prime(num), number=count) / count
    print(f'is_prime({num}) takes {val:.06f} secs')
time(100, 10000)
time(101, 10000)
time(1000, 1000)
time(1001, 1000)
time(10000, 100)
time(10001, 100)
time(100000, 10)
time(100001, 10)
time(1000000, 1)
time(1000001, 1)
```
Mình phải giảm số lần chạy code dần vì nó lâu quá 😰 Kết quả là:
```markdown
is_prime(100) takes 0.000016 secs
is_prime(101) takes 0.000135 secs
is_prime(1000) takes 0.000064 secs
is_prime(1001) takes 0.000312 secs
is_prime(10000) takes 0.000843 secs
is_prime(10001) takes 0.011829 secs
is_prime(100000) takes 0.005481 secs
is_prime(100001) takes 0.051016 secs
is_prime(1000000) takes 0.211841 secs
is_prime(1000001) takes 1.620660 secs
```
Vì vậy, câu regex này chỉ là để cho thấy sự [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness) của các bộ máy regex thôi, chứ đừng sử dụng cái này những lúc bạn cần kiểm tra tính nguyên tố nhé (^^;)

## Vậy độ phức tạp của thuật toán này là gì? 
Thực ra, mỗi một lần thử ước số, regex sẽ cố bắt toàn bộ chuỗi, và số ước được thử cũng là độ dài chuỗi. Tuy nhiên, độ dài chuỗi là $2^n$, vì độ phức tạp của thuật toán được tính theo hệ nhị phân; vì vậy độ phức tạp của regex này là $(2^n)^2$, trên cả exponential 😅. Ngoài ra, để ý rằng việc một chuỗi từ hệ nhị phân (cách lưu trữ của số trong máy tính) sang hệ đơn phân không thôi đã mất $O(2^n)$  bộ nhớ rồi (bằng độ dài của chuỗi), chưa kể thời gian, nên các bạn lại càng có thêm lý do tại sao không nên dùng regex này để kiểm tra tính nguyên tố nhé (^^;)

## Nhưng pattern này đâu phải Regular Expression! Lừa ai chứ mình học Context-Free Grammar rồi nhé!
Nếu câu trên nghe quen quen thì bởi vì trong phần giới thiệu ở trên mình đã giới thiệu về Context-Free Grammar, cơ bản là một tập hợp cha bao quát hơn Regular Expression. Và, bởi vì [cái regex pattern kia chứa đệ quy, **nó không phải là regular expression theo như định nghĩa trong khoa học máy tính**](https://stackoverflow.com/questions/2255403/why-is-recursive-regex-not-regex). Chứng minh thì vô cùng đơn giản, sử dụng [Pumping lemma](https://en.wikipedia.org/wiki/Pumping_lemma_for_regular_languages) [mất 3 dòng](https://stackoverflow.com/a/2256286/2327379). Tuy nhiên, các hệ thống regex phổ thông hiện tại đều hỗ trợ việc backreference các capture group (chưa cần đụng đến quái vật Perl nhé!). Vì vậy, chặt chẽ về lý thuyết thì đây thực sự không phải regular expression, mà đã có một vài luật đã được thả lỏng, và đã trở thành một tập con của context-free grammar to hơn regular expression. Tuy nhiên, nếu bạn sẵn sàng tạm nhắm mắt làm ngơ sách vở và định nghĩa regex theo các implementation hiện tại, thì :D

# Hết bài rồi.
![](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Thats_all_folks.svg/319px-Thats_all_folks.svg.png)

Mong bài này cũng làm bạn cảm thấy thú vị như lần đầu mình đọc về cái này :D
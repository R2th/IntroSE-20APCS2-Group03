![](https://krinvan.files.wordpress.com/2020/06/untitled-3.jpg)

<div align="center"><sup>Never had a proper closure, why you left me I'll never know.</sup></div>

# Giới thiệu
Hôm nay mình tham gia [ISITCTF Quals 2020](https://whitehat.vn/threads/isitdtu-ctf-2020.14078/) (và chỉ làm được 2/5 câu crypto), trong giải đó có bài **Predict my urandom** với đề như sau:
```python
from os import urandom
from email import email

BLOCK_SIZE = 16

pad = lambda x: x + chr(16-len(x)%16)*(16-len(x)%16)
unpad = lambda x: x[:-ord(x[-1])]
keys = [urandom(16) for i in range(100)]
keys = {i:{
    "enc":(lambda x: ''.join(chr(ord(a)^ord(b)) for a,b in zip(x,j)))
    } for i,j in enumerate(keys)}

email = pad(email)
ct = ""
for i in range(0,len(email),16):
    ct += keys[i/16]["enc"](email[i:i+16])

f = open('cipher','w')
f.write(ct)
f.close()
```

Nếu bạn chưa hiểu được ý tưởng chính (hoặc ít nhất ra là đáng lẽ vậy), thì `keys` sẽ là 1 list với 100 [random one-time pads](https://en.wikipedia.org/wiki/One-time_pad) — OTPs không thể bị phá nếu không lặp lại và thực sự ngẫu nhiên, và [`urandom` thì secure nhất có thể rồi](https://security.stackexchange.com/questions/3936/is-a-rand-from-dev-urandom-secure-for-a-login-key). Vậy thì bài này phải giải như thế nào? Mấu chốt của challenge này là **Closure**, và cũng là chủ đề của bài viết này.

# Closure là gì?
Theo như Wikipedia thì closure được định nghĩa là:
> Trong khoa học máy tính, **bao đóng** (*closure*) là một hàm (*function*) hay một tham chiếu (*reference*) tới một hàm cùng với môi trường tham chiếu - một bảng chứa tham chiếu đến mỗi biến không phải cục bộ (hay còn gọi là biến tự do).

Giết tôi đi.

Để mình thử giải thích lại một cách thân thiện hơn chút. Bạn chắc hẳn biết về variables và scopes rồi nhỉ? Nhắc lại nhanh một chút với một ví dụ trong C nhé:
```c:C
char * author = "kwkt"; // parent scope
int i = 69; // (1)

{
    int i = 420; // (2)
    printf("%s wuz hia\n", author); // kwkt wuz hia
    void * local; // local variable
}

printf("%d\n", i); // 69
// printf("%x\n", local); <-- error: ‘local’ undeclared
```

Trong đó, code ở trong block tạo một scope mới, gần như hoàn toàn độc lập với thế giới bên ngoài (nếu không C đã kêu lỗi um trời về việc định nghĩa lại variable `i`). Các biến của scope cha (`author`) có thể truy cập được ở trong scope con như lúc mình `printf` biến `author` ra, nhưng không thể truy cập được từ ở ngoài: nếu bạn uncomment dòng cuối, C sẽ kêu trời rằng chúng ta chưa đăng ký biến này.

Closure cũng tương tự với scope một chút, tuy nhiên [mạnh mẽ hơn rất nhiều](https://stackoverflow.com/a/1812417/2327379): ngoài việc tạo ra một scope cho các variables độc lập với các scope khác (bao gồm cả parent scope), thì closure còn bao gồm cả code (instructions) của một hàm; và chúng ta có thể chuyển tiếp closure như một variable (!), hay có thể gọi tới các instructions của hàm đó lên các scope đó. Ví dụ điển hình là với các anonymous functions, dưới đây là một ví dụ trong Golang:
```go:Golang
another1 := func() string {
	return "DEE CHAY KHA LET"
}
```

Trong đó, closure ở đây là toàn bộ tất cả mọi thứ liên quan đến hàm/biến `another1`. Trong closure đó có code của biến, có constant (chuỗi được trả về), và các references của các biến thuộc scope ngoài. Nếu bạn không thấy điều đó thật to lớn thì hãy nghĩ lại: định nghĩa các scope trong ví dụ C ở trên không quá khó khăn với các static compiler: các instructions nằm trong `.code` section dành riêng cho nó (hãy check thử bằng cách disassemble code C/C++ với `gdb`), và tất cả các register address đều có thể được allocate trước ở trên stack lúc compile. Tuy nhiên, với closures, bạn phải tạo một khoảng bộ nhớ *trên stack* để chứa code và các biến đó, phải lưu được các thay đổi của các biến đó trong quá trình chạy code (stateful), chưa kể vẫn phải đảm bảo rằng trong closure có đầy đủ các reference đến các biến ở block ngoài. Sau đó, khoảng bộ nhớ đó phải có một địa chỉ cụ thể trên stack và có thể sử dụng như một variable bình thường. Điều này không phải ngôn ngữ nào cũng có thể hỗ trợ, ví dụ như C (trong C chỉ hỗ trợ function pointers chứ không có anonymous functions).

# Quyền công dân?
> Trong thế giới này, tất cả các công dân đều có quyền bình đẳng, trong đó có các công dân có quyền bình đẳng hơn những người khác.

Trong các ngôn ngữ OOP như C/C++ (trước C++11) hay Java (trước Java 8), functions là các [công dân hạng hai](https://en.wikipedia.org/wiki/First-class_citizen#Functions). Trong đó, chúng ta không thể định nghĩa các hàm anonymous functions, và không thể dùng chúng như các variable bình thường được. Điều này xảy ra vì lúc thiết kế ngôn ngữ ban đầu, các tác giả không định thêm tính năng này vào ngôn ngữ, vì nó không phù hợp với programming paradigm của ngôn ngữ đó. Tuy nhiên, sau 1 thời gian anonymous functions trở nên phổ biến và thông dụng ở các ngôn ngữ khác, những ngôn ngữ này được sửa đổi để làm hài lòng các programmer và giữ thị phần trên thị trường phần mềm.

Ngược lại, trong các ngôn ngữ thuộc functional programming paradigm, vì ngay từ đầu đã được thiết kế để sử dụng các functions như biến, functions là các [công dân hạng nhất](https://en.wikipedia.org/wiki/First-class_function). Cụ thể, giống như các primitive object/biến cơ bản, các functions sẽ có tất cả các quyền hạn sau đây:
- Có thể đưa một function vào làm parameter cho một function khác,
- Có thể trả một function về làm return cho một function khác,
- Có thể ghi chúng vào các biến,
- Có thể lưu chúng vào các data structures.

Ví dụ như trong Lisp, chúng ta tạo một anonymous function cho $f(x)=x+i$, và tạo hàm $f(i)$ trả về closure đó:
```lisp:Lisp
(defun f (i) (lambda (x) (+ x i)))
```

Hoặc trong Haskell, nhưng lần này ngầu hơn tạo $f$ anonymous:
```haskell:Haskell
f = (\i -> (\x -> x + i))
```

Do có thể sử dụng các functions vô cùng tự do, kèm với việc xử lý các giá trị (returns/currying) được tối ưu hoá, nên các ngôn ngữ này có một lượng fan đông đảo riêng.

# Closure captures
Việc xử lý và sử dụng closure có những yếu tố gây bug cực kỳ khó tìm. Một [vấn đề nho nhỏ](https://stackoverflow.com/q/2295290/2327379) có thể xảy ra trong lúc viết code như sau (code đã sửa cho dễ tưởng tượng):
```python:Python
for i in range(1): # i = 0
    fn = lambda: i # should return 0
        
i = 1 # Python leaks `for` scope!
assert fn() == 1 # no AssertionError raised!
```

[Trong FAQ của Python cũng có đề cập đến vấn đề này.](https://docs.python.org/3/faq/programming.html#why-do-lambdas-defined-in-a-loop-with-different-values-all-return-the-same-result) Thực ra, đây không phải vấn đề của Python, mà là do chúng ta cứ đinh ninh rằng closure sẽ nhận giá trị thay vì variable reference <sup>[1]</sup>. Tuy nhiên trong Python, thay vì chỉ giá trị mà `i` lưu, closure sẽ lưu tên biến `i` và scope của nó để lúc nào cần mới lấy giá trị cụ thể để evaluate. Vì vậy, khi chúng ta thay đổi của biến `i` đó kể cả sau khi đã tạo hàm lambda function, đến lúc gọi hàm lambda đó giá trị của biến `i` mới được sử dụng. Hậu quả là hàm `fn` của chúng ta trả về 1.

Việc closure lưu một biến ngoài scope theo value/reference đó được gọi là **closure capture**. Một số ngôn ngữ xử lý vấn đề về ambiguity này với định nghĩa cụ thể xem người dùng muốn capture-by-gì. Trong C++, định nghĩa anonymous function phải bao gồm định nghĩa đó:
> `[&]` : capture all external variable by reference<br>
> `[=]` : capture all external variable by value

Tuy nhiên như mọi thứ khác trong C++ thì hành vi của closure capture rất lằng nhằng, nếu bạn muốn [đọc hiểu sâu](https://en.cppreference.com/w/cpp/language/lambda#Lambda_capture) thì chúc bạn may mắn.

Một ví dụ thú vị tương tự là trong JavaScript: nếu scope của biến đó sống sót qua được for block thì hành vi sẽ giống với Python:
```javascript:JavaScript
for (var i = 0; i < 1; i++) {
    fn = () => {return i};
}
fn(); // 1
```

Nếu không thì giá trị của biến sẽ được pass qua như mong đợi <sup>[2]</sup>:
```javascript:JavaScript
for (let i = 1; i < 2; i++) {
    fn = () => {return i};
}
fn(); // 1
```

Vậy để "sửa" vấn đề này thì phải làm thế nào? Chúng ta chỉ cần evaluate biến `i` thành giá trị thật của nó lúc tạo anonymous function bằng một optional function parameter:
```python:Python
for i in range(1): # i = 0
    fn = lambda i=i: i # dummy optional variable i
        
i = 1
assert fn() == 0 # now this works.
```

Hậu quả là hàm `fn` của chúng ta thực ra nhận 1 parameter, làm cho fix này thực ra là một cái hack không hoàn hảo.

<sup>[1]</sup> "Expectation is the root of all heartache."<br>
Thực ra câu gốc của William Shakespear là
> Oft expectation fails, and most oft there where most it promises.

trong vở kịch *All's Well That Ends Well*.<br>
<sup>[2]</sup> Chúng ta thay đổi loop range từ $0 \rightarrow 1$ thành $1 \rightarrow 2$ để không phải lo về việc JS có thể tự động làm các trò lung tung với các biến không tồn tại.
# Vậy bài kia giải như thế nào?
Với closure trong loop bị xài đi xài lại thế kia thực tất cả các one-time pad đó thực ra đều giống nhau, và từ đó bài toán này trở thành repeated-XOR với 16-byte key length. Bạn chỉ cần đọc [bài writeup Cryptopals của mình](https://viblo.asia/p/cryptopals-set-1-basics-4dbZNJNkZYM#_challenge-6-break-repeating-key-xor-5) và chạy code ăn liền mình đã đính kèm là ra:
```python
break_repeated_xor(cipher=open('cipher', 'rb').read(), min_keysize=16, max_keysize=16)
```
Và chúng ta ra được decrypted email:
```

From: ISITDTU@strange_dict_lambda_comprehension.com
To: crypto@cryp.to
CC: ISITDTU@strange_dict_lambda_comprehension.com
Attachments: cipher
Dear Sir/Madam,
I have a new cryptosystem proposal, I've found a way to have perfect encryption and this is definitely not possible to decrypt. I have also encrypted email and attached the cipher in the file 'cipher' that is attached in this email as well. I believe that it is not possible to decrypt but you may try with the attached file.
Yours Sincerely,
ISITDTU{57r4n63_d1c7_l4mbd4_c0mpr3h3n510n}
\x10\x10\x10\x10\x10\x10\x10\x10\x10\x10\x10\x10\x10\x10\x10\x10
```

# Hết rồi.
Hãy like và subscribe vì nó miễn phí?
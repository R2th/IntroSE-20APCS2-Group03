![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2020/10/individually-1576948_1920.jpg?w=1920&ssl=1)

Hôm ni, mình học tiếp về bạn “Lỗi và ngoại lệ”, bài blog tiếp theo nằm trong series[ “Khám phá Đại Bản Doanh Python”](https://beautyoncode.com/dai-ban-doanh-python-series-overview/), thuộc phần Python Tutorial nha. 

Ở bài này, mình sẽ đi tìm hiểu các loại lỗi và ngoại lệ trong Python cũng như cách xử lý và tạo ngoại lệ riêng của mình.

(Những nội dung trong bài series này từ chủ yếu mình lấy từ python.org rồi viết lại hoặc dịch lại theo ngôn ngữ của mình)

Nếu bạn đọc từ đầu sê-ri đến đây, hẳn là bạn có thấy vài đoạn code mình cố tình ví dụ cho nó xuất hiện lỗi, trong bài [“I/O trong Python”](https://beautyoncode.com/i-o-trong-python/):

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2020/07/format-string.png?resize=1024%2C337&ssl=1)
![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2020/07/io.png?w=652&ssl=1)

Hình trên cho mình thấy có hai loại lỗi có thể phân biệt được, đó là: **“lỗi cú pháp”** và **“ngoại lệ“**.

## Lỗi cú pháp

Lỗi cú pháp là lỗi xảy ra khi phân tích cú pháp, là loại lỗi mình hay gặp nhất.
![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2020/09/syntax-error.png?w=1280&ssl=1)
Trình phân tích cú pháp sẽ lặp lại dòng bị lỗi và hiển thị một dấu mũi tên nhỏ tạo vị trí là thời điểm sớm nhất trong dòng nơi lỗi được phát hiện. 

Ở ví dụ trên thể hiện lỗi được phát hiện tại vị trí hàm print được gọi, lý do là bị thiếu dấu “:”

Đôi khi lỗi syntax nhưng không có vị trí được phát hiện, ví dụ như ở đầu bài “*SyntaxError: positional argument follows keyword argument*” thể hiện phải đặt biến theo vị trí trước biến theo từ khoá.

## Ngoại lệ

Ngay cả khi cú pháp đã đúng, mã vẫn có thể gây ra lỗi trong quá trình thực thi. Những lỗi phát hiện trong quá trình thực thi code được gọi là các ngoại lệ.

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2020/09/exceptions.png?w=1280&ssl=1)

Như bạn thấy ở trên thì ngoại lệ có nhiều loại khác nhau và sẽ được in kèm thông tin của lỗi.

Ở ví dụ trên, tụi mình có các ngoại lệ như là “**ZeroDivisionError**“, “**NameError**“, “**TypeError**“

### Xử lý ngoại lệ

Khi viết chương trình với Python, đôi khi mình sẽ cố tình để ngoại lễ xảy ra để xử lý chúng. Như ở ví dụ dưới đây, đầu vào được nhập từ phía người dùng có thể gây ngoại lệ “*ValueErrror*” và mình đi xử lý bằng cách gửi thông tin cho người dùng biết họ đã nhập sai.

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2020/09/handle-exceptions.png?w=751&ssl=1)

Ở ví dụ trên đã dùng nhóm lệnh “**try … except**” để bắt và sử lý ngoại lệ. 

Đoạn code trên hoạt động như sau:

– Đầu tiên, mã trong mệnh đề “**try**” được thực hiện

– Nếu không có ngoại lệ xảy ra, mệnh đề “**except**” sẽ bị bỏ qua và kết thúc chương trình(như khi mình nhập 9)

– Nếu có ngoại lệ xảy ra trong lúc thực thi mã trong mệnh đề try thì các đoạn mã bên dưới nó sẽ bị bỏ qua. Nếu lỗi ngoại lệ trùng với lỗi mình bắt(sau từ khoá “except”, ở đây là ValueError), thì đoạn mã trong except sẽ được thực thi(in ra “Oops! …”). Và đoạn mã trong try sẽ tiếp tục được thực hiện.

– Còn nếu ngoại lệ xảy ra nhưng không trùng với ngoại lệ mình đã bắt thì chương trình sẽ dừng lại và in ngoại lệ ra màn hình(ngoại lệ chưa được xử lý).

**Vì có thể có nhiều ngoại lệ xảy ra nên:**

– một “try” có thể đi cùng với nhiều “except”: hay sử dụng khi mình muốn xử lý từng except khác nhau.

– một except có thể bắt nhiều loại ngoại lệ, ví dụ: except(RuntimeError, TypeError): hay sử dụng khi mình muốn gom nhiều loại except vào sử lý một lần.

#### Xe cấp cứu nào đến trước

Có hai đoạn code như hai hình dưới đây, cùng đoán thứ tự in ra khi hai example 1, 2 được thực thi nhé 😀 

Lưu ý là “RotDH_NV1” được extend từ class Exception

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2020/10/Screen-Shot-2020-10-05-at-6.34.28-PM.png?w=1226&ssl=1)

Bạn nghiên cứu kỹ chưa, đã đoán được thứ tự in ra ở hai ví dụ là gì chưa nhỉ? 

Trước khi dòm đáp án, hãy cố thử đưa ra kết quả của mình trước nha.
<hr />

Đây là đáp án của mình, để mình làm thử coi đúng không hen:

Đầu tiên là cả thứ tự kế thừa của mấy bạn này: 

**Exception > RotDH_NV1 > RotDH_NV2 > RotDH_NV3**

*Như vậy là khi vòng lặp thực thi từng đối tượng:*

**Example 1:**

– **raise** RotDH_NV1 thì kiểm tra:

   -> trùng với except RotDH_NV3 -> False, đi tiếp

   -> trùng với except RotDH_NV2 -> False, đi tiếp

   -> trùng với except RotDH_NV1 -> True, đi in ra “RotDH_NV1“

– **raise** RotDH_NV2 thì kiểm tra:

   -> trùng với except RotDH_NV3 -> False, đi tiếp

   -> trùng với except RotDH_NV2 -> True, đi in ra “RotDH_NV2“

– **raise** RotDH_NV3 thì kiểm tra:

   -> trùng với except RotDH_NV3 -> True, đi in ra “RotDH_NV3“

Vậy kết quả in ra ở example 1 là:

> RotDH_NV1
> 
> RotDH_NV2
> 
> RotDH_NV3


**Example 2: **

– **raise** RotDH_NV1 thì kiểm tra:

   -> trùng với except RotDH_NV1 -> True, đi in ra “RotDH_NV1“

– **raise** RotDH_NV2 thì kiểm tra:

   -> trùng với except RotDH_NV1 -> True, đi in ra “RotDH_NV1“

– **raise** RotDH_NV3 thì kiểm tra:

   -> trùng với except RotDH_NV1 -> True, đi in ra “RotDH_NV1“

Vậy kết quả in ra ở example 2 là:

> RotDH_NV1
> 
> RotDH_NV1
> 
> RotDH_NV1

Từ ví dụ trên, mình thấy được khi có ngoại lệ được raise lên, đụng bạn nào là bạn ấy thực thi trước, nó cũng giống như việc cấp cứu vậy, xe cấp cứu nào đến trước thì chở người ta đi bệnh viện trước.

Đôi khi sẽ có lỗi xảy ra nhưng mình chưa đoán được loại exception đó là gì, và mình thường xử dụng “**except:**” không đi kèm với loại ngoại lệ nào, để hốt trọn mấy bạn còn lại.

Tuy nhiên nhớ cẩn trọng khi xài bạn này nha, vì bạn ấy hốt cả rổ nên sẽ dễ che dấu lỗi của chương trình và gây khó khăn cho việc kiểm lỗi ý. 

Do đó, tốt nhất là nên dùng bạn ấy cho tụi còn lại, in lỗi ra ngoài và raise lại bạn ấy lên để biết mà chủ động bảo vệ code nha.

**Làm ri nè:** bắt coi mặt mũi thằng lỗi ra sao rồi raise error lên lại để cho bạn lỗi ngoài ý muốn không cứ thế mà lặng thinh lơ đi.

```
except:
      print(‘Lỗi chi mà hông rõ nè”, sys.exc_info()[0])
      raise
```

Đoạn ni cho mình lưu ý xí nữa nha. Có bạn nào hay xài *“except Exception as e:”* để bắt các loại ngoại lệ còn lại không nhỉ? 

Khi mình xài cái *“except Exception as e:”* thì có cái tiện là mình có thể truy cập vào các thuộc tính của đổi tượng “**e**” như *e.message* hay *e.args*. 

Nhưng bạn lưu ý xíu là cái **“except Exception as e:”** nó khác với cái **“except:”** nha. *Cụ thể:*

– **“except:”** bắt tất cả các loại ngoại lệ.

– **“except Exception:”** hoặc **“except Exception as e:”** bắt tất cả các loại ngoại lệ nhưng TRỪ “*BaseException*”, “*SystemExist*”, “*KeyboardInterupt*” và “*GeneratorExist*”(Có nghĩa là gặp các bạn bị trừ đi này vẫn la làng  chứ không có im lặng đâu nha)

#### Làm cho tôi điều này nếu không bị dính ngoại lệ nào(Do it if no exception raise)

Ngoài ra, nhóm “**try … except**” còn có một mệnh đề đi kèm không bắt buộc là “**else**”, đi sau tất cả các loại “except”. 

Mệnh đề này thường chứa các đoạn mã cần thực thi nếu mệnh đề try không có bất cứ ngoại lệ nào.

```
try:
   # code cần thực thi
except OSError:
   # xử lý ngoại lệ OSError
else:
   # thực thi đoạn này dù ngoại lệ có bị bắt hay không
```

Dùng mệnh đề else như trên thì tốt hơn so với việc bỏ đoạn code cần thực thi đó luôn trong mệnh đề try như thế này:

```
try:
   # code cần thực thi
   # thực thi đoạn này dù ngoại lệ có bị bắt hay không
except OSError:
   # xử lý ngoại lệ OSError
   ```
   
#### Chụp cắt lớp ngoại lệ

Khi ngoại lệ xảy ra, bạn ấy có một vài giá trị để thể hiện mình, kiểu như mình tên gì, nhà ở đâu hay gia đình có mấy người ý, mấy bạn này hay được gọi với tên tiếng anh là “*exception’s argument*”.

Mình có từng nhắc đến các bạn này ở trên đoạn *“except Exception as e”* có *e.message* và *e.args* ý ạ.

Ngoài mấy bạn mặc định được trả ra như trên, thì khi mình raise ngoại lệ, mình cũng có thể truyền cho bạn ấy những giá trị cụ thể như sau: *“raise Exception(“value 1”, “value 2″)”*

Để cho tiện thì các giá trị được truyền vào này mặc định sẽ được trả ra ở hàm khởi tạo `__str__()` của exception, cho nên khi gọi print(e) của e trong “except Exception as e”  thì nó có giá trị là (“value 1”, “value 2”). Hoặc e.args cũng có giá trị như trên.

#### La làng khi có ngoại lệ

Ở các nội dung trên, rất nhiều lần tụi mình đã la làng mỗi khi code có vấn đề, bạn đã biết cách la làng khi có ngoại lệ rồi phải không?

Đó chính là sử dụng cuộc gọi cấp cứu 115 =)) 

Mình đùa thôi, đó là dùng từ khoá “**raise**” đi kèm với ngoại lệ hoặc đi một mình bạn ấy cũng được.

#### Đổ lỗi

Ha ha, bạn có tin ngoại lệ đổ lỗi cho nhau được không? 

Nếu bạn muốn thì nó được. Thật á! 

Đây là ví dụ cho sự đổ lỗi, hay gọi hoa mỹ hơn là các ngoại lệ được xâu chuỗi với nhau, mời bạn xem đoạn code này:

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2020/10/Screen-Shot-2020-10-10-at-10.00.20-PM.png?resize=1024%2C425&ssl=1)

Ở trên, rõ là exception IOError được bắt, nhưng mình cố tình đổi lỗi thành RuntimeError bằng cách sử dụng “**from**”, cú pháp giúp mình có thể xâu chuỗi lỗi IOError qua lỗi RuntimeError và in cả hai bạn này ra màn hình như trên.

Nhưng nếu bạn chỉ muốn in lỗi “RuntimError” thôi, và không muốn hiện lỗi IOError nữa, thì có thể dùng **“from None**” để vô hiệu hoá quá trình xâu exception của bạn from. 

Khi đó nó sẽ làm việc như thế này:

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2020/10/Screen-Shot-2020-10-10-at-10.07.35-PM.png?w=1292&ssl=1)

Yeah, vậy là tụi mình có thể đổi lỗi trắng trợn mà không truy được nguồn gốc luôn(trừ khi nhìn vô code). 

E hèm, tuy nhiên, bạn này khá là nguy hiểm nha vì đổi tứ tung lên cả lại làm khó khi debug ấy, nên thận trọng khi dùng thì hơn.

#### Ngoại lệ của mình

Đó giờ(ý là từ đầu bài tới chừ), mình làm việc với ngoại lệ của người ta(ngoại lệ mặc định của Python), giờ mình cũng thích tạo ngoại lệ của riêng mình rồi, đơn giản là nói tiếng người, á nhầm, tiếng của người dùng, và tiếng của lập trình viên thì đôi khi có ý nghĩa và thân thiện hơn mà, hihi.

Khi mình viết chương trình của mình, mình có thể tạo ngoại lệ bằng cách kế thừa từ lớp “**Exception**”, cả bằng cách trực tiếp lẫn gián tiếp. 

Trực tiếp thì khỏi giải thích ha, còn gián tiếp là mình kế thừa từ bạn ngoại lệ nào đó đã kế thừa từ “**Exception**”, vậy hoai.

Thường thường, người ta hay tạo một base exception kế thừa trực tiếp, rồi những loại ngoại lệ khác kế thừa gián tiếp “Exception” bằng cái base exception đó. 

À, còn về cách đặt tên, họ cũng đặt tên theo cùng họ luôn, ví dụ họ ở đây có thể là Error: Input Error, StupidError, NevermindError, … Kiểu vậy á 😀

Mọi người cùng dòm qua ví dụ nha:

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2020/10/Screen-Shot-2020-10-10-at-10.24.48-PM.png?w=768&ssl=1)

#### Làm cho tôi điều này bất cứ giá nào(Do it no matter what)

Ở phần “Làm cho tôi điều này nếu không bị dính ngoại lệ nào”, tụi mình xài “else” sau except á nạ, nhớ hông, đó là mình thực thi code khi không có ngoại lệ xảy ra.

Còn ở đây, là “**Làm cho tôi điều này bất cứ giá nào**”, thì mình xài với “**finally**“, đó là mình thực thi đám code trong finally dù có ngoại lệ xảy ra hay không. 

Tức là đoạn code ở finally này thể nào cũng phải làm, họ gọi là mát mẻ là “**clean-up actions**”.

Mời bạn xem ví dụ nha:

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2020/10/Screen-Shot-2020-10-10-at-10.34.57-PM.png?resize=1024%2C278&ssl=1)

Bạn có thắc mắc vì sao gặp exception mà đoạn print vẫn in được không?

Đó là cơ chế của finally đó, cùng mình tìm hiểu thêm về cách hoạt động của bạn ấy nào.

Nếu có mệnh đề “finally” xuất hiện, thì code thuộc mệnh đề này sẽ thực thi như là công việc cuối cùng trước khi lệnh try kết thúc. 

**Dưới đây là cơ chế hoạt động cho những tình huống khá phức tạp với finally:**

– Nếu có ngoại lệ xảy ra trong khi thực thi nhóm lệnh trong “try”, nếu ngoại lệ la làng lên nhưng chưa bị bắt lại bằng “except”, thì nhóm lệnh trong “finally” vẫn chạy trước, sau đó ngoại lệ mới được la làng sau đó.

– Nếu có ngoại lệ xảy ra bởi nhóm lệnh trong except hoặc else. Một lần nữa, nhóm lệnh trong finally được chạy trước sau đó  ngoại lệ trong đám phát sinh này mới được la làng lên.

– Nếu khối lệnh trong try có các lệnh đặt biệt như “break”, “continue” hay “return” làm dừng thực thi giữa chừng thì nhóm lệnh trong finally cũng thực hiện trước khi đám này được gọi.

– Nếu khối lệnh trong finally có chứa lệnh “return” thì giá trị trả về sẽ là giá trị từ finally chứ không phải giá trị trả về từ khối code trong try.

Trong thực tế, finally là nơi chứa các nhóm lệnh phục vụ cho việc giải phóng các tài nguyên như là file hay các kết nối mạng, bất kể các tài nguyên này có được dùng hay không.

Một vài ví dụ thú vị về finally đây ạ:
```
>>> def bool_return():
...   try:
...      return True
...   finally:
...      return False
...
>>> bool_return()
False
```

```
>>> def divide(x, y):
...     try:
...         result = x / y
...     except ZeroDivisionError:
...         print("division by zero!")
...     else:
...         print("result is", result)
...     finally:
...         print("executing finally clause")
...
>>> divide(2, 1)
result is 2.0
executing finally clause
>>> divide(2, 0)
division by zero!
executing finally clause
>>> divide("2", "1")
executing finally clause
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<stdin>", line 3, in divide
TypeError: unsupported operand type(s) for /: 'str' and 'str'
```

Nè, nhớ nghiền ngẫm bạn finally trước khi đi tiếp nha. 

Dòm lại lần nữa coi có hiểu ví dụ hông?

### Định nghĩa trước công việc làm sạch

Trong Python, có một vài loại object được định nghĩa sẵn các hành động làm sạch để trả lại tài nguyên khi mình không xài nữa mà không cần biết tài nguyên đó có được sử dụng thành công hay không(như khi chính ta thực hiện làm sạch tài nguyên với finally ở trên).

Loại object như vậy có thể kể điển hình là khi mình làm việc với một file. 

Thường thì khi mình mở một file mình sẽ dùng **open(“filename.txt”)**. Vấn đề ở đây là tụi mình mở người ta rồi nhưng không nhớ mà đóng lại để thu hồi tài nguyên bộ nhớ về, và có thể gây vấn đề về bộ nhớ cho các dự án lớn hoặc file quá nặng.

Với lệnh “**with**” cho phép những object như là file có thể đảm bảo việc bộ nhớ sẽ được giải phóng mỗi khi thực thi xong đoạn code nằm trong nhóm lệnh này. Do đó đảm bảo tài nguyên được thu hồi kịp thời và chính xác.

Hãy nhớ ví dụ này nha, và luôn dùng bạn ấy khi mở file như là best practice.
![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2020/10/Screen-Shot-2020-10-10-at-10.58.13-PM.png?w=608&ssl=1)

Hôm nay mình đã biết thêm ít kiến thức về lỗi và các ngoại lệ rồi.

Sau phần này, tụi mình sẽ cùng nhau đọc tiếp phần “Lớp trong Python” nhé.

Bài viết gốc ở [beautyoncode.com](https://beautyoncode.com/loi-va-xu-ly-ngoai-le-trong-python/) ạ.

---

If you think these contents are helpful, you could send me an encouraging by:
- Support me
  - [☕️ Buy me a coffee](https://ko-fi.com/beautyoncode)
  - [😇 Send a hi on Momo](https://me.momo.vn/beautyoncode)
  - [👀 Visit support page](beautyoncode.com/support/)
- Visit my blog at [beautyoncode.com](beautyoncode.com)
- Follow me on:
  - [Careerly](https://careerly.vn/profiles/1140)
  - [fanpage](facebook.com/beautyoncode)
  - [linkedin](https://www.linkedin.com/in/graphicdthanh/)

🤘 Chat with me 🤘 

See you around, friends!
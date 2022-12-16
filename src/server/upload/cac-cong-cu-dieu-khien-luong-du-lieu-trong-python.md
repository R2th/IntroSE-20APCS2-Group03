![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2020/02/python-control-flow.jpeg?w=1050&ssl=1)
(image from internet)

## Mở bài
Chào mừng mọi người đến với bài post tiếp theo của phần [“The Python Tutorial”](https://beautyoncode.com/the-python-interpreter/) của series [“Khám phá Đại Bản Doanh Python”](https://beautyoncode.com/dai-ban-doanh-python-series-overview/). 

The Python Tutorial mang đến những khái niệm và các tính năng cơ bản nhất của Python và cú pháp của nó.

Mình đã biết qua các kiểu dữ liệu cơ bản cũng như các phép tính liên quan ở bài trước. Trong bài này, mình học tiếp về những công cụ điều khiển luồng dữ liệu, còn gọi là Control Flow Tools đồng thời đi sâu hơn về function trong Python nữa.

Những nội dung trong bài series này từ chủ yếu mình lấy từ python.org rồi viết lại theo ngôn ngữ của mình. Có những từ tiếng anh chuyên ngành mình không chắc dịch có đúng không cho nên mình giữ nửa nạc nửa mỡ(vừa Anh vừa Việt) nghen ^^

## Các công cụ điều khiển luồng dữ liệu trong Python

### if, for, break, continue, pass, else trong loops và range()

Lệnh **if, else** hẳn là nhóm lệnh rẽ nhánh phổ biến nhất quả đất rồi, nó đại diện cho câu thần chú “Nếu … thì” của chúng ta. Nhưng không phải một nếu một thì là được, thế giới này phức tạp lắm, cho nên có khi phải nhiều nếu nhiều thì mới xong, thế là nhóm lệnh combo **if … elif … elif … … else** ra đời, nhóm lệnh này tương tự “switch … case” trong javascript vậy.

Còn với vòng lặp, đã có lệnh **for**, bạn có thể lặp qua từng phần tử trong một danh sách(list) hay một bộ từ điển(dict), thậm chí có thể lặp qua một chuỗi(string) và làm việc với từng phần tử của nó. 

Tuy nhiên, khi lặp qua các giá trị mang tính chất reference như **dict, list**(không biết dùng chữ chi chỗ ni, giống kiểu dữ liệu ref tới một vị trí data trong js ấy) thì việc thay đổi giá trị của từng phần tử sẽ ảnh hưởng tới giá trị ban đầu cho nên người ta khuyến khích mình hãy tạo ra một bản copy mà xài, hoặc khởi tạo một giá trị mới để lưu những thay đổi thì hơn.

Mời bạn xem một ví dụ bên dưới:
![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2020/02/Screen-Shot-2020-04-06-at-9.55.29-PM.png?w=948&ssl=1)

Bên cạnh đó, có một function tiện lợi hay dùng để lặp qua chuỗi các số, đó là hàm **range()**. 

Theo mặc định, **range(number)** sẽ lặp qua từ **0** đến **number**, với bước lặp mặc định tăng thêm 1.

– Nếu bạn muốn bắt đầu từ một số khác 0, có thể viết **range(start_number, end_number)** như range(3, 5). 

– Nếu bạn muốn một bước lặp khác 1, hãy đổi thông số thứ 3 thành giá trị bước lặp, ví dụ, range(0, 10, 3) sẽ lặp qua 0, 3, 6, 9.

Trước đây, người ta thường kết hợp range() và len() để lặp qua một list vì các chỉ số index thể hiện thứ tự của phần tử trong list tương ứng với range của chiều dài của list, như thế này: range(len())

nhưng sau này hay dùng hàm **enumerate()** thì tiện lợi hơn.

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2020/02/Screen-Shot-2020-04-06-at-10.08.21-PM.png?w=455&ssl=1)

Với range(), nó là một object thuộc class “range”, và là một generator(cái có thể loop qua đó) chứ không phải là list như bạn nghĩ, muốn nó thành list bạn phải dùng list convert nó qua mới được hen.

### break, continue và else trong vòng lặp và pass

Đã có vòng lặp thì hẳn là phải có cách nào đó để nhảy ra ngoài vòng lặp đó, hay tiếp tục lặp qua phần tử khác mà không cần đọc cho hết code của phần tử này, **break** và **continue** giúp bạn làm những chuyện đó. Ở Python có cái lạ, là else có thể đi cùng với for nữa.

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2020/02/Screen-Shot-2020-04-06-at-10.38.24-PM.png?w=650&ssl=1)

Còn lệnh **pass**, nó đại diện cho sự “không làm gì cả”, “lơ đi”, nó có ích khi mình viết structure cho app, đặt tên class, function thoả mái rồi thêm pass ở phần body thì sẽ không có báo lỗi syntax đâu.

### Hàm(function)

Trong Python, hàm được định nghĩa bằng từ khoá “**def**” theo sau là tên function và danh sách tham số bọc trong **()**. Thường mỗi function sẽ có docstrings ngay dòng đầu tiên của body mô tả function đó. Khi gọi hàm và truyền đối số, đối số sẽ được nhận tương ứng theo vị trí của nó hoặc theo keyword của nó(nếu vị trí đó chưa có đối số truyền vào).

Trong function, để trả về giá trị nào đó ta dùng **return**. Nếu không có giá trị nào cụ thể được trả về thì mặc định return là **None**.

Có những function mặc định của từng loại object trong python, ví dụ **append()** là function của object list. Ta có thể check bằng lệnh **dir()** của object đó.

Khi định nghĩa hàm, thường đi kèm đối số của hàm đó, có 3 dạng đối số được kết hợp sử dụng:

#### Đối số mặc định(Default Argument Values)

Là các đối số đi kèm với giá trị mặc định của chúng. Trong trường hợp không có giá trị tương ứng được truyền vào, thì giá trị của đối số đó chính là giá trị mặc định, ví dụ:

`def ask_ok(promp, retries=4, reminder=”Please try again”)`

tham số retries có giá trị mặc định là 4

tham số reminder có giá trị mặc định là “Please try again”

Lưu ý: giá trị mặc định chỉ được gán một lần, do đó khi giá trị này được gán bằng những loại mutable object(có thể thay đổi được) như list, dict hay class instance thì sẽ dễ gây hiểu lầm như ví dụ sau:

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2020/02/Screen-Shot-2020-04-08-at-9.05.46-PM.png?w=772&ssl=1)

#### Đối số từ khoá(Keyword Arguments)

Theo mặc định, các giá trị truyền theo thứ tự của đối số tương ứng. Nếu đối số không có giá trị mặc định thì nó là đối số bắt buộc phải được truyền vào.

Đối số từ khoá có dạng **kwarg=value**, dùng từ khoá để định nghĩa giá trị truyền vào thuộc đối số nào mà không cần quan tâm tới thứ tự của nó.

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2020/02/Screen-Shot-2020-04-08-at-9.48.52-PM.png?w=723&ssl=1)

Đối số theo vị trí phải đứng trước đối số theo từ khoá

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2020/02/Screen-Shot-2020-04-08-at-9.51.29-PM.png?w=585&ssl=1)

Khi quá nhiều đối số, ta có thể sử dụng * hoặc ** kèm tên cho đối số đại diện, ví dụ `def bananashop(kind, *args, **kwargs)`.
Đối số đại diện là một list các đối số(tìm hiểu thêm bên dưới phần đối số là một danh sách).

#### Các đối số đặt biệt(Special parameters)

Vì đối số của một function có thể theo vị trí hoặc là theo từ khoá và cả hai loại này có thể ở riêng hoặc ở chung trong cùng một function. Cho nên thiết lập một công thức chung, để từ đó có thể nhìn vào và biết đâu là đối số theo vị trí, đâu là đối số từ khoá, và đâu là có thể một trong hai theo công thức sau:

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2020/02/Screen-Shot-2020-04-14-at-10.45.55-PM.png?w=542&ssl=1)

Ở đây, / và * là không bắt buộc. Nếu được sử dụng, những đối số đặt biệt này chỉ ra cách mà các giá trị được truyền vào hàm: 

→ **position only**: chỉ gồm đối số chỉ vị trí

→ **positional or keyword**: có thể là đối số chỉ vị trí hoặc đối số từ khoá

→ **keyword only**: chỉ gồm đối số từ khoá

**Ví dụ**

Dưới đây là hàm có đối số tuỳ ý, có thể là đối số vị trí hay đối số từ khoá đều cho phép:

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2020/02/Screen-Shot-2020-04-14-at-11.01.05-PM.png?fit=739%2C194&ssl=1)

Dưới đây là hàm chỉ cho phép đối số vị trí tham gia, định nghĩa bằng từ khoá đặt biệt / và đối số đứng trước nó:

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2020/02/Screen-Shot-2020-04-14-at-11.01.25-PM.png?w=736&ssl=1)

Dưới đây là hàm chỉ cho phép đối số từ khoá tham gia, định nghĩa bằng từ khoá đặt biệt * và đối số đứng sau nó:

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2020/02/Screen-Shot-2020-04-14-at-11.01.43-PM.png?w=736&ssl=1)

Cuối cùng là hàm cho phép cả 3 loại(chỉ cho phép đối số vị trí, chỉ cho phép đối số từ khoá, cho phép cả hai loại) tham gia và phân chia cụ thể bằng hai từ khoá đặt biệt /, *

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2020/02/Screen-Shot-2020-04-14-at-11.02.05-PM.png?w=738&ssl=1)

Tóm lại, hãy ghi nhớ công thức định nghĩa hàm trong Python:

```
def f(pos1, pos2, /, pos_or_kwd, *, kwd1, kwd2):
```

**Và một vài chỉ dẫn sử dụng cho từng loại:**

- Đối số vị trí chỉ nên được sử dụng khi các tham số không biết đặt tên thế nào cho đúng(vì nó không có ý nghĩa cụ thể nào) .

- Đối số từ khoá nên được ưu tiên sử dụng để định nghĩa các tên từ khoá dễ hiểu, rõ ràng.

- Đối với API, chỉ sử dụng đối số vị trí để ngăn chặn việc thay đổi nếu các tên tham số có thể sửa đổi trong nay mai.

#### Đối số là một danh sách tuỳ ý

Đây là một loại đối số có thể dao động tuỳ vào giá trị được truyền vào(arbitrary argument lists), các giá trị này sẽ được bọc trong một tuple(args ở ví dụ bên dưới), ví dụ:

```
def write_multiple_items(file, separator, *args):
       file.write(separator.join(args)
```

Thông thường, đối số này được đặt cuối danh sách và trong trường hợp phía sau nó còn những đối số khác thì đó phải là đối số từ khoá.
![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2020/02/Screen-Shot-2020-04-15-at-10.58.14-PM.png?w=1272&ssl=1)

#### Giải nén một danh sách đối số

Ở trên, ta thấy những đối số được truyền riêng biệt nhau nhưng khi vào hàm thì chúng nó được bọc lại trong một tuple(là args). Và ngược lại, có khi mình truyền vào một list, hay một tuple và muốn giải nén nó ra trong function, quá trình này gọi là “unpacking”.

**Ví dụ1**: function range() cần hai đối số start và stop, nhưng args là một list nên ta unpacking nó bằng * khi dùng với range

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2020/02/Screen-Shot-2020-04-15-at-11.12.55-PM.png?w=1266&ssl=1)

**Ví dụ 2**: unpacking một dictionary với key là đối số từ khoá và value là giá trị truyền vào bằng **

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2020/02/Screen-Shot-2020-04-15-at-11.17.17-PM.png?w=1272&ssl=1)

#### Biểu thức lambda

Bên cạnh cách định nghĩa hàm bằng **def**, có thể dùng từ khoá **lambda** để định nghĩa một hàm không tên và được giới hạn định nghĩa trong một biểu thức duy nhất.

lambda function thường được dùng khi cần định nghĩa những function nằm lồng trong function khác một cách nhanh chóng, ví dụ như gán key nằm trong function sort với lambda function.

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2020/02/Screen-Shot-2020-04-15-at-11.25.20-PM.png?w=1270&ssl=1)

#### Docstrings của hàm

Docstrings là một loại ghi chú có thể mở rộng thành nhiều hàng, bắt đầu và kết thúc bằng “””(3 dấu ngoặc kép), thường được sử dụng ngay dưới khai báo hàm trong Python để diễn giải nội dung cũng như ý nghĩa các đối số và giá trị trả về.

Vài quy ước về nội dung và định dạng của nó như dòng đầu tiên là một câu có nội dung ngắn gọn súc tích thể hiện ý nghĩa chung, tiếp đến là một dòng trống, sau đó đến nội dung cụ thể hơn cho phần mô tả.

#### Function Annotations

Function Annotations là chú thích của hàm về các loại dữ liệu do người dùng định nghĩa trong function.

Annotations được lưu trong thuộc tính __annotations__ của hàm, nó được định nghĩa sau dấu : của tên đối số và kiểu dữ liệu của hàm số trả về sẽ được định nghĩa với dấu ->, ví dụ:

```
def full_name(first_name: str, last_name: str) -> str:
    return first_name + last_name
```
thì full_name.__annotations__ sẽ có giá trị là:

```{‘full_name’: <class ‘str’>, ‘return’: <class ‘str’>, ‘first_name’: <class ‘str’>, ‘last_name’: <class ‘str’>}```

### Coding Style

Trên đây mình đã học qua các lệnh và nhóm lệnh cũng như tìm hiểu về function từ đơn giản đến chi tiết, và đây là lúc nên nói đến phong cách code trong Python(vì code dài rồi không thể cứ thích viết sao thì viết được ^^):

Trong Python, PEP8 rất phổ biến như là một hướng dẫn về cách viết code Python mà hầu hết các dự án đều tuân thủ theo, giúp code dễ đọc và nhìn dễ chịu, dưới đây là một vài nội dung quan trọng bạn cần biết:

→ Thụt lề là 4 dấu cách(không dùng tab)

→Một dòng không dài quá 79 ký tự

→ Mỗi function, class cách nhau 2 dòng trống, và các đoạn code trong function/class cách nhau một dòng

→ Chú thích nên đặt ngay trên dòng được chú thích, sử dụng docstring định nghĩa ý nghĩa của hàm và các thông tin liên quan

→ Khoảng trắng được sử dụng xong quanh các toán tử và phía sau dấu , cho dễ đọc 

→ Tên class đặt dạng **UpperCamelCase** và tên function, method trong class đặt dạng **lowercase_with_underscores**. Luôn dùng self là tên của param đầu tiên của method trong class

→ Dùng các loại mã hoá phổ biến như UTF-8, ASCII

→ Không dùng các loại ngôn ngữ khác nhau trong mã code(ví dụ không comment bằng tiếng Việt @@)

## Kết bài

Ngày nào cũng làm việc với Python, ngày nào cũng dùng control flow của nó và function, cơ mà đến đây mình mới thực sự có thể nói là mình từng học qua các bạn ấy ^^

Hôm ni các bạn cùng mình học Python đến đây thôi nhé, những nội dung này toàn là kiến thức cơ bản của Python mà mình vừa đọc vừa viết để luôn tiện ôn bài luôn hihi.

Ở bài viết sau, mình sẽ đi học tiếp về [cấu trúc dữ liệu của Python](https://beautyoncode.com/data-structure-in-python/) nằm trong “**The Python Tutorial**” thuộc sê ri tào lao vĩ đại “Khám phá Đại Bản Doanh Python” nha.

Cám ơn mọi người đã đọc!
Bài viết gốc ở [beautyoncode.com](https://beautyoncode.com/control-flow-in-python/) ạ.

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
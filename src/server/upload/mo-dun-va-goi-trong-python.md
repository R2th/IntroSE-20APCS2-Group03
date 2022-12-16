![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2020/06/module-in-python.jpg?w=1068&ssl=1)
Chào mừng mọi người đến với bài tiếp theo của phần “The Python Tutorial” của series “Khám phá Đại Bản Doanh Python“.

Bài trước, mình đã học thêm về “Cấu trúc dữ liệu trong Python”. Hôm ni, mình học tiếp về bạn “Mô-đun” nha.

(Những nội dung trong bài series này từ chủ yếu mình lấy từ python.org rồi viết lại hoặc dịch lại theo ngôn ngữ của mình)

## Mô-đun

Khi thoát khỏi PI, các dự liệu(biến, hàm, …) được khai báo trước đây sẽ bị mất như ví dụ sau:

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2020/06/pi-not-keep-data.gif?fit=654%2C504&ssl=1)

Do đó, cần chuẩn bị đầu vào cho trình thông dịch để có thể dùng được bất cứ khi nào mình cần, các file chứa những đoạn mã như vậy được gọi là các script

Để làm được như vậy, cách mình cần làm với Python là tạo một file có đuôi là “.py” rồi bỏ code vào đó. File này được gọi là mô-đun.

Một mô-đun có thể được sử dụng trong một mô-đun khác, cũng có thể sử dụng trong trình thông dịch PI.

Tên của mô-đun được lưu dưới biến __name__ của chính mô-đun đó.

> Mô-đun là tệp chứa các định nghĩa và các câu lệnh Python

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2020/06/calculator.gif?fit=908%2C678&ssl=1)

Trên đây là cách dùng một mô-đun trong PI, mình cần nạp nó vào bằng lệnh “import”.

Lưu ý nhỏ: Đến đây, mình đã cần sử dụng đến trình soạn thảo(editor) để tạo file và viết những đoạn code dài hơn. Editor mình đang dùng là “[Visual Studio Code](https://code.visualstudio.com/)“

### Cách nạp mô-đun để sử dụng

Nạp mô-đun vào đâu để sử dụng? Là nạp vào mô-đun khác hoặc nạp vào khi mình đang ở trong trình thông dịch PI như ví dụ trên đây.

Khi mình nạp một mô-đun, các thành phần của nó sẽ được khởi tạo. 

Mỗi mô-đun như một cái gói bọc hết các giá trị được khởi tạo của nó trong đó, do đó khi cần dùng mình phải trỏ từ tên mô-đun vào lấy các thành phần khác. Ví dụ, bạn muốn dùng biến “name” trong module “person”, thì nó là: “person.name”

Có nhiều cách nạp mô-đun và các thành phần của nó:

→ **Nạp luôn cả mô-đun**: import person

   Khi nạp một mô-đun như vậy, mình cần gọi các thành phần bên trong nó từ mô-đun này, ví dụ “person.first_name”

→ **Nạp từng thành phần của mô-đun** với from person import first_name, last_name

  Khi nạp từng thành phần như trên thì mô-đun person không có được nạp vào, chỉ có hai hàm first_name và last_name, nên không gọi person.first_name được, chỉ dùng first_name thôi nghen.

→ **Nạp hết tất cả thành phần** với *: from person import *

  Tương tự như trên, tất cả các thành phần trong mô-đun person được nạp vào nhưng chính bản thân nó thì không.

→ **Nạp mô-đun và sử dụng với tên khác với “as“**: from person import full_name as name

   Hàm full_name được kết nối với tên thay thế là “name”, nên gọi name chính là gọi full_name
   
   ### Cách cập nhật nội dung của mô-đun
   
   Khi làm việc với mô-đun trong PI, đôi khi mình sửa code nhưng không thấy kết quả được cập nhật, đó là do nội dung mô-đun bạn nạp trước đây vẫn tồn tại và bạn cần tải lại mô-đun để có nội dung mới nhất.

#### Có hai cách cập nhật nội dung của mô-đun:

**Cách 1: thoát PI và tải lại mô-đun đó**
![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2020/06/reloadPI.gif?fit=908%2C678&ssl=1)

**Cách 2: gọi đến mô-đun importlib và gọi lệnh để reload mô-đun mình cần**

>   import importlib; importlib.reload(<mô-đun>) 

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2020/06/reload-inside-PI.gif?fit=910%2C678&ssl=1)

#### Thực thi một mô-đun như là một script

Ngoài cách vào trình thông dịch PI, nạp mô-đun mà gọi lệnh thực thi chương trình để kiểm thử, bạn có một cách khác nhanh hơn là viết sẵn chương trình bạn cần làm trong mô-đun luôn và gọi lệnh để thực thi script đó.

Để thực thi một mô đun trong PI, bạn dùng từ khoá “python”:

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2020/06/Screen-Shot-2020-06-27-at-11.04.24-PM.png?w=810&ssl=1)

> python calculator.py

Kết quả của lệnh trên sẽ là: Total 5

Gọi vậy thì mô-đun sẽ được thực thi như khi bạn import nó vào mô-đun khác. 

Điều khác duy nhất khi thực thi bằng lệnh “python” là tên __name__ của mô-đun sẽ được gán với giá trị __main__.

Bạn để ý chỗ ni xíu, vì khúc này liên quan tới một câu lệnh mình hay dùng mà hỏng hiểu tại sao, câu lệnh đó là:

> if __name__ == “__main__”:
> 
>     # code thực thi đặt vào đây

Bạn có thấy câu lệnh ni quen không? Nếu bạn từng học qua Python hẳn bạn đã gặp rồi. 

Người ta hay bỏ câu lệnh như vậy vào chương trình để mần chi nhỉ?

Để cho các code trong chỗ “#code thực thi thì đặt vào đây” ấy, chỉ được chạy khi mà mình chạy nó như một script với lệnh “python” thôi. Còn khi import nó vào mô-đun khác thì hỏng có chạy.

Đây là cách tiện hay dùng để kiểm thử một mô-đun đồng thời khi dùng nó trong mô-đun khác lại không bị ảnh hưởng.

Bạn thấy chỗ ni hay hông? Mình thấy siêu hay luôn, vì khúc ni trước mình xài mà hông có hiểu mấy ^^

#### Python tìm mô-đun ở đâu?

Khi làm việc với mô-đun, bạn có thể sẽ gặp lỗi không tìm thấy mô-đun như thế này. 

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2020/06/Screen-Shot-2020-06-17-at-6.32.15-PM.png?w=1288&ssl=1)

Khi một mô-đun nạp đúng, bạn có để ý PI biết chính xác mô-đun của bạn đang ở đâu.

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2020/06/Screen-Shot-2020-06-17-at-6.32.41-PM.png?resize=1024%2C133&ssl=1)

**Vậy thì PI đã tìm mô-đun ở những nơi nào?**

→ Đầu tiên, PI sẽ đi kiếm nó trong built-in mô-đun(là những mô-đun được Python xây dựng sẵn, hay còn gọi là những mô-đun tiêu chuẩn)

→ Nếu tìm chưa thấy, nó sẽ tiếp tục tìm trong sys.path, sys.path được định nghĩa ở những nơi sau:

- Thư mục hiện tại(nơi bạn đứng và truy cập vào PI) là giá trị của sys.path[0], nên được tìm kiếm đầu tiên.
- PYTHONPATH
- Thư mục cài đặt mặc định

**Lưu ý**: Nếu mô-đun trùng tên với built-in mô-đun, thì mô-đun ở folder hiện tại sẽ được nạp vào, chớ không phải built-ins mô-đun nghen.

Nếu bạn chưa nạp được mô-đun của mình trong PI, vui lòng hãy dòm qua cái sys.path thử có cái đường dẫn đến thư mục mô-đun của bạn chưa, nếu chưa có thì bạn đứng sai chỗ rồi đó.

#### Biên dịch các file .py

Quá trình biên dịch này diễn ra hoàn toàn tự động, cho nên khi làm việc với Python bạn sẽ thấy folder __pycache__ này thường xuyên, mình cùng đọc cho biết thêm ha.

Để tăng tốc độ tải các mô-đun, Python lưu phiên bản biên dịch của từng version khác nhau của mô-đun dưới định dạng module.version.pyc trong thư mục __pycache__.

Quy ước đặt tên này cho phép Python có thể biên dịch lại từ các version khác nhau.

Ví dụ dưới đây thể hiện version python 3.8 mình đang sử dụng

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2020/06/Screen-Shot-2020-06-24-at-5.26.41-AM.png?resize=1024%2C379&ssl=1)

## Các mô-đun chuẩn

Python có sẵn thư viện của các mô-đun tiêu chuẩn, được viết ở “[The Python Standard Library](https://docs.python.org/3/library/)“, bao gồm những nhóm chính như là:

– **Built-in functions**: các hàm dựng sẵn

– **Built-in constants**: các biến dựng sẵn

– **Built-in types**: các kiểu dữ liệu dựng sẵn

– **Built-in exceptions**: các ngoại lệ dựng sẵn

– **Data types**: các kiểu dữ liệu …

Các mô-đun này có thể khác nhau tuỳ theo nền tảng chạy Python, ví dụ mô-đun winreg chỉ có ở hệ điều hành Window, hoặc hai giá trị sys.ps1 và sys.ps2 của mô-đun sys chỉ có trong PI, còn sys.path lại thể hiện các nơi có thể tìm kiếm mô-đun.

*Trò chơi nhỏ*: cùng xem sys.ps1 và sys.ps2 có giá trị gì trong PI của máy bạn sau đó gán nó bằng một giá trị bất kỳ rồi thử in ra một câu xem có gì thú vị sẽ xảy ra nhé.

(Nếu bạn đang không vui, hãy bỏ qua mấy trò nhảm của mình ạ)

## Hàm dir()

Nhìn một mô-đun mình chẳng biết nó có gì cả, bạn **dir()** này như kiểu chụp X-quang cắt lớp xem cái mô-đun của mình chứa những biến gì, những hàm nào, nhưng ở dạng rất sơ khai, là một mảng các tên được sắp xếp theo thứ tự A đến Z.

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2020/06/Screen-Shot-2020-06-24-at-5.41.57-AM.png?resize=1024%2C127&ssl=1)

Chưa hết, gọi dir() không có giá trị truyền vào trong PI sẽ thấy được những biến, hàm có thể sử dụng ở PI hiện tại:

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2020/06/Screen-Shot-2020-06-24-at-5.43.37-AM.png?resize=1024%2C98&ssl=1)

Lưu ý nhỏ là dir() không list ra được những hàm và giá trị được dựng sẵn(mấy bạn built-ins). Muốn xem mấy bạn này, mình phải dùng cái gọi là **dir(builtins)**

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2020/06/Screen-Shot-2020-06-24-at-5.46.08-AM.png?w=1280&ssl=1)

## Gói

Gói(package) là một nhóm các mô-đun khác nhau. Nó tương tự như thư mục chứa nhiều tệp tin vậy, nhưng cần phải đăng ký nhẹ với python để nó biết đó là gói, bằng cách thêm file __init.py__ là python biết mình khởi tạo gói. 

Một gói cũng có thể chứa nhiều gói con khác nằm bên trong nó.

Ví dụ mình muốn thiết kế một gói tên là “calculators” chứa hai gói con là máy tính “casio_fx115” và “casio_fx9750” đồng thời chứa các mô-đun “utils” thì sẽ có cấu trúc thư mục là:

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2020/06/package-in-python.png?w=1280&ssl=1)

### Nạp gói, mô-đun và các lưu ý

Lỗi khi import mô-đun là lỗi khá phổ biến với người mới học. Do đó, khi thực hiện import, bạn hãy nhớ đến 2 câu thần chú: “*Tôi đang đứng ở đâu? Thứ tôi cần đang ở đâu?*”

Nghe khá tào lao nhưng bạn lấy thư mục/gói chứa điểm chung gần nhất của nơi bạn đứng và nơi bạn cần sẽ là điểm bạn thực hiện import từ đó.

Chắc bạn không hiểu đâu, để mình ví dụ nè:

(ví dụ hơi lộn xộn, bạn phải thật bình tĩnh khi đọc và dòm cái hình bên trên nữa nhé)

**Ví dụ 1:** Import hàm total từ utils.py vào total.py trong thư mục casio_fx115

*Thì mình sẽ làm thế này:*

– Mình xác định mình đang đứng ở “casio_fx9570/total.py” tức là đứng trong gói “casio_fx9570“

– Thứ mình cần đang ở “utils.py” là mô-đun của gói “calculators”

=> Do đó, gói chung gần nhất của hai bạn này là “calculators”, vì bạn ni bọc bạn “casio_fx9570“. 

Cho nên, mình sẽ import từ thằng cha, cụ thể là trong “casio_fx9570/total.py” cần:

> from calculators.utils import total

**Ví dụ 2:** Import hàm “total_fx9750” từ mô-đun “total.py” trong thư mục “casio_fx9570″ vào mô-đun “total.py” nằm trong thư mục “casio_fx115″

*Thì mình sẽ làm thế này:*

– Mình xác định mình đang đứng ở “casio_fx115/total.py” tức là đứng trong gói “casio_fx115“

– Thứ mình cần đang ở “total.py” là mô-đun của gói “total_fx9750“

=> Do đó, gói chung gần nhất của hai bạn này là “calculators”, vì hai bạn này đều là gói con của “calculators”. Cho nên, mình cần import từ gói cha, cụ thể trong “casio_fx115/total.py” cần:

> from calculators. casio_fx115.total import total_fx9750

**Lưu ý 1: "from <gói> import A"**

Cú pháp **“from <gói> import A“**, thì A có thể là:

– một gói con nằm trong “gói”

– một mô-đun con nằm trong “gói”

– một hàm, một biến nằm trong gói(nằm trong file __init__.py)

*Thứ tự kiểm tra của câu lệnh import này là:*

– Đầu tiên, cho A là gói và kiếm nó để nạp vào

– Nếu A không phải gói, nó lại giả định A là mô-đun và kiếm nó để nạp vào

– Nếu A không phải mô-đun, tiếp tục giả đinh A là hàm, là biến số để kiếm và nạp vào

– Nếu đến cuối vẫn không tìm thấy A, ImportError sẽ la làng lên.

**Lưu ý 2: "import A.B.C"**

Cú pháp **“import A.B.C”**, thì:

– A, B phải là các gói

– C có thể là gói hoặc mô-đun, nhưng C **KHÔNG THỂ** là một hàm, một biến được

## Tệp __init__.py

Thường thường, __init__.py là một tệp rỗng, tuy nhiên __init__.py cũng có thể dùng để chứa code khởi tạo cho gói đó hoặc dùng để gán biến __all__ , thể hiện khi import với * thì sẽ có những mô-đun nào được nạp. Nếu biến này không được gán, python hiểu là tất cả các mô-đun trong gói đều được nạp khi gọi import với *.

Ví dụ, trong gói calculators gán trong file __init__.py: 

> __all__ = [“utils”]

thì khi gọi “from calculators import *” sẽ có mô-đun “utils” được nạp vào.
_______________________________________________________________________________________________________________________________________
Nội dung bài mô-đun trong Python Tutorial đến đây tạm hết rồi, cám ơn mọi người đã đọc.

Hôm nay mình tìm được một bản dịch The Python Tutorial qua tiếng Việt khá đầy đủ, bản dịch này của cộng đồng python Việt Nam, nó ở [đây](https://tutorial.pythonvietnam.info/). Mọi người ghé đọc nhé, nội dung rất đầy đủ, kiểu như dịch từng chữ trong bản gốc ra luôn ấy, chứ không phải kiểu học hiểu ý rồi viết lại như mình. 

Đọc bản dịch này làm mình cảm thấy thật là hổ thẹn với những thứ mình viết ra ở bài này và những bài trước. Và mình phân vân không biết có nên viết tiếp về ba phần chính còn lại của tutorial này là: “Đầu vào và đầu ra”, “Lỗi và các ngoại lệ”, “Lớp” hay không nữa vì bản dịch rất đầy đủ rồi.

Nghĩ từ chiều tới tối thì mình đã đưa ra quyết định là sẽ tiếp tục viết ba bài còn lại cho hoàn thành nội dung của The Python Tutorial theo ngôn ngữ của BeautyOnCode. 

Thực sự là mình không có dịch hết nội dung của sê-ri, mình đọc làm và viết lại, hay gọi nôm na là thổi hồn và chút hài hước theo ngôn ngữ dân dã vô cái đám kiến thức khá là khô khan này. 

Với mình, học xong, hiểu rồi, viết lại tốn khá là nhiều thời gian, nhưng càng làm mình lại càng thấm, mình thấy yêu thương từng câu từ, từng hình ảnh, demo, từng đoạn code mà mình viết và lập trình không còn khô khan nữa.

Mình lảm nhảm đến đây cũng tạm rồi hehe, chốt lại là có bản dịch đó, mọi người cứ vào đọc cho gọn, còn mình cứ tiếp tục học và viết theo cách của mình thôi à.

Thay lời tạm biệt, gửi bạn một bài blog của RealPython “[Python Modules and Packages: Introduction](https://realpython.com/python-modules-packages)” rất đầy đủ và bổ ích <3 

Bài viết gốc ở [beautyoncode.com](https://beautyoncode.com/module-and-package-in-python/) ạ.

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
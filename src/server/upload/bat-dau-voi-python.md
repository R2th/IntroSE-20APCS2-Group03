![](https://beautyoncode.com/wp-content/uploads/2020/01/getting-started.jpg)
## Mở bài 
Chào mừng mọi người đến với bài post thứ ba của phần “Lượn lờ cùng Python” của series [“Khám phá Đại Bản Doanh Python”](https://beautyoncode.com/kham-pha-dai-ban-doanh-python-se-ri-au-vo-vieu/)

Trong phần này, tụi mình sẽ cùng nhau dạo quanh quanh những phần ngoài lề trước khi tấn công vào document ở những phần tiếp theo nhé. 

Mình sẽ đi trả lời nhưng câu hỏi sau trong “Lượn lờ cùng Python”:

- [Python có thể dùng để làm gì nhỉ?](https://beautyoncode.com/khong-biet-python-co-the-dung-de-lam-gi-nhi%e2%80%8b/)

- [Ai đã thành công cùng Python?](https://beautyoncode.com/ai-da-thanh-cong-cung-python/)

- [Háo hức với Python quá ♥ Mình nên bắt đầu từ đâu?](https://beautyoncode.com/bat-dau-voi-python/) (bài hôm ni)

Những nội dung trong bài series này từ “Đại bản doanh Python” [python.org](https://www.python.org/), mình viết bằng ngôn ngữ của mình kèm theo những tài liệu khác mà mình thấy liên quan và hữu ích cho chủ đề của bài.

Bài dưới đây sẽ đi trả lời câu hỏi “Háo hức với Python quá ♥ Mình nên bắt đầu từ đâu?” nằm trong mục [“Getting Started”](https://www.python.org/about/gettingstarted/) nha

## Thân bài
### Háo hức với Python quá ♥ Mình nên bắt đầu từ đâu?



Dô dô, dô ngay và luôn, không đợi chờ gì nữa, học Python ngay thôi, lương nghìn lẻ một đô đang chờ ahihi

Ở phần “Bắt đầu với Python” này, gồm những nội dung chính sau:

– Python là gì thế ạ?

– Cách lượm Python về và chơi thử 

– Chơi thử rồi, giờ là học thiệt nghe

– Tìm kiếm những ứng dụng làm sẵn

– Hỏi han thường gặp

Đi thôi mấy mọi người ơi!

#### Python là gì thế ạ?
Python là ngôn ngữ lập trình hướng đối tượng, có thể so sánh với `Perl`, `Ruby`, `Scheme` hoặc `Java`

**Các tính năng đáng chú ý:**

♥ Cú pháp tao nhã, dễ đọc dễ viết

♥ Viết chương trình một phát là có thể chạy liền

♥ Thư viện chuẩn hỗ trợ các tác vụ phổ biến như kết nối server, tìm kiếm với các biểu thức(regular expression), đọc và chỉnh sửa file

♥ Dễ dàng kiểm thử các đoạn code ngắn với `Python interactive mode`(PI)

♥ Có thể thêm các mô đun khác được viết bằng ngôn ngữ khác như `C`, `C++`. Có thể nhúng vào ứng dụng khác để tạo giao diện sử dụng

♥ Chạy trên đa nền tảng: `Mac OS X`, `Linux,` `Windows`, `Unix`. Miễn phí tải xuống, miễn phí sử dụng

**Các tính năng đáng chú ý về ngôn ngữ:**

♥ Nhiều kiểu dữ liệu: `number`(floating point, complex, and unlimited-length long integers), `string` (both ASCII and Unicode), `lists`(danh sách), và `dictionaries`(từ điển). Kiểu dữ liệu động và mạnh mẽ, trộn các loại dữ liệu khác nhau sẽ báo lỗi ngay(như cộng string với number)

♥ Hỗ trợ lập trình hướng đối tượng với lớp(classes) và nhiều lớp kế thừa(multi inheritances).

♥ Code có thể nhóm thành các mô-đun, các gói. Bộ nhớ được quản lý tự động. Có hỗ trợ xử lý lỗi sạch đẹp

♥ Python chứa các tính năng nâng cao của một ngôn ngữ lập trình như `list comprehensions` và `generators`

#### Cách lượm Python về chơi thử

Để lượm được Python về và chơi thử, mình phải cài đặt cái trình thông dịch của bạn ấy – Python Interpreter, đây là chương trình có thể đọc code Python và chạy. Ngoài ra, bạn ấy còn có kèm theo nhiều tài liệu có thể giúp mình hiểu hơn về Python nữa.

Thường thì Mac và Linux sẽ được tích hợp Python sẵn rồi, nhưng đó là bản lỗi thời rồi(Python 2.x), cho nên mình cần phải cập nhật lên bản mới(Python 3.x)(vui lòng kiểm tra ở trang [Downloads](https://www.python.org/downloads) này nhé).

Sau khi cài được python version 3 rồi, mình vô command line gõ `python` hoặc `python3` là đã được vô chế độ chơi thử cùng Python Interpreter rồi đó. 

Vô đây chỉ là chơi thử thấy liền kết quả thôi, còn nếu bạn muốn lưu code lại và chỉnh sửa thì mình cần có IDE hoặc Code Editor để mở file đó, bạn có thể bắt đầu với Thony(một chương trình tích hợp sẵn Python Interpreter và IDE bundles), khá đơn giản và nhẹ nữa.

(Bonus)
Nếu bạn đang tìm kiếm một IDEs hay Text Editors để xài với Python, thì python.org cũng có nguyên hai list to bự chảng cho bạn tham khảo luôn:

 ⇒ [IDEs Python](https://wiki.python.org/moin/IntegratedDevelopmentEnvironments) giới thiệu tên, nền tảng, lần cuối cập nhật và vài thông tin chính của IDE

⇒ [Python Editors](https://wiki.python.org/moin/PythonEditors) giới thiệu tên, nền tảng, viết bằng ngôn ngữ gì, giấy phép nào, và vài thông tin chính của editor

**Mình tạt qua giới thiệu cái IDEs với cái Code Editors xí nếu bạn chưa rõ thì đọc thêm nhé**

IDEs là môi trường lập trình cung cấp những tính năng như mã hoá, biên dịch, gỡ lỗi, thực thi, tự động điền vào(autocomplete), các thư viện trong cùng một nơi giúp các tác vụ trở nên đơn giản và dễ dàng hơn

Các IDEs phổ biến có thể kể đến: PyCharm, Spyder, PyDev, Idle, Wing, Eric Python, Rodeo, Thonny

Trong khi đó, Code editors là một nền tảng để chỉnh và sửa mã nguồn, phổ biến dùng với Python có thể kể đến: Sublime text, Atom, Vim, Visual Studio Code

Bạn có thể xem qua những python IDE, code editors ở [article này](https://www.softwaretestinghelp.com/python-ide-code-editors/), có giới thiệu những features chính, ưu điểm, nhược điểm để mình lựa cái dùng cho phù hợp.

#### Chơi thử rồi, giờ là học thiệt nghe

Lựa được nơi code rồi, mình bắt tay vô code thôi. Á nhầm, mình phải đọc mấy cái hướng dẫn(tutorial) trước, rồi code theo xem nó chạy thế nào chớ. Về hướng dẫn thì có 2 hướng chính nè:

- Mới học lập trình, hãy đi cùng [Beginner Guide – Non Programmer](https://wiki.python.org/moin/BeginnersGuide/NonProgrammers)

- Có tí kinh nghiệm lập trình rồi, thì đi cùng [Beginner Guide – Programmer](https://wiki.python.org/moin/BeginnersGuide/NonProgrammers)

Trong mỗi hướng dẫn, đều gồm những mục như giới thiệu sách phù hợp cho từng đối tượng, các tutorials và các websites, các khoá học tương tác, tài liệu giành cho người nghiên cứu khoa học, các videos và tools.

Mình thấy bên Non Programmer thì các khoá học tương tác được xếp trước những tài nguyên khác chắc là muốn người bắt đầu tương tác làm quen Python trước.

Còn bên Programmer thì là hai link review những khoá học tốt nhất giành cho Python để nắm bắt nhanh nhất, nàm trên top có [“Google Python’s class”](https://developers.google.com/edu/python/)(miễn phí) và  khóa [“Complete Python Bootcamp: Go from zero to hero in Python 3”](https://www.udemy.com/course/complete-python-bootcamp/?LSNPUBID=q15T%2FSfRF14&ranEAID=q15T%2FSfRF14&ranMID=39197&ranSiteID=q15T_SfRF14-p8TkjVNx50ElGm9thCvQmA) từ Udemy(có phí).

Bên cạnh đó, khi cần tìm kiếm thêm thông tin gì về Python thì [online documentation](https://docs.python.org/3/) là nơi bạn cần ghé. Ngoài ra, cũng có [Python tutorial](https://docs.python.org/3/tutorial/) học những thứ cơ bản nhất và giúp mình bắt đầu với Python, mình sẽ cùng học tutorial này trong những bài blog tiếp theo.

Sau khi học và viết những thứ cơ bản rồi, đã đến lúc bạn nên tìm hiểu thêm về Syntax Python cùng series [“The Python Language Reference”](https://docs.python.org/3/reference/) và những thư viện chuẩn của Python với [“The Python Standard Library“](https://docs.python.org/3/library/#the-python-standard-library). 

Bạn có muốn biết những recipes(công thức) và patterns(mẫu) phổ biến trong Python, hãy ghé [“ActiveState Python Cookbook”](http://code.activestate.com/recipes/langs/python/) để xem.

#### Tìm kiếm những ứng dụng có sẵn


Nếu bạn muốn tìm kiếm những mô đun, package hay những ứng dụng được viết bằng Python rồi để tham khảo hay dùng trong ứng dựng của mình, thì nơi đầu tiên có thể ghé kiếm thử là PyPI – kho packages viết bằng Python sẽ tìm kiếm được những source code tốt nhất hoặc đơn giản chỉ cần hỏi thăm bác Google với những từ khoá như là “python package”, “python example”, “python recipes”, … là được rồi.

Nếu vẫn không tìm được thứ bạn cần, ngại gì không hỏi một câu trên Stackoverflow hay bất cứ ai bạn biết là họ biết nhiều Python hơn bạn nhỉ ^^.

#### Hỏi han thường gặp


Nếu bạn có câu hỏi nào về Python, thử kiểm tra trong phần [“Hỏi han thường gặp”](https://docs.python.org/3/faq/) thử xem người ta đã trả lời chưa nhé. 

Bonus cho bạn [top câu hỏi Python trên StackOverflow](https://stackoverflow.com/questions/tagged/python?sort=MostVotes&edited=true) nè.

## Kết bài

Đây là bài cuối của phần “Lượn lờ cùng Python” rồi.

Tụi mình đã đi qua đám này hẳn mình đã hiểu cái độ quan trọng của Python và háo hức cho hành trình tiếp theo rồi đó.

Tiếp đến, mình sẽ gặm qua phần khó ăn nhất “Documentation”

Thực ra mình cũng ngán mấy cái documentation dữ lắm, cho nên mình không dại dột chi mà chui vô liền cái document lắm chữ đâu. Mình thấy ở đây còn có nhiều sự lựa chọn khác có vẻ dễ thương hơn nhiều, đó là [“Audio/Visual Talks”](https://www.python.org/doc/av/) và [“Beginner Guide“](https://wiki.python.org/moin/BeginnersGuide). Phần ni gọi tên là “Làm quen kết bạn với Python” cho nó thân thiện ha.

Bài viết gốc ở [beautyoncode.com](https://beautyoncode.com/bat-dau-voi-python/) ạ.

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
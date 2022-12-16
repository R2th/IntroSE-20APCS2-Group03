![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2022/06/debugging.jpeg)

Hôm nay mình muốn nói về **“Gỡ lỗi”(Debugging)** 🐞, một qui trình sửa lỗi trong chương trình phần mềm. 

Điều quan trọng đầu tiên cần nhớ là:

> **Đừng cảm thấy thất vọng khi bạn tạo ra một con bug.**

Khi viết một chương trình thì việc gặp bug 🐞 là việc đương nhiên 🥲, vì khi đã viết chương trình ⌨️ tức là mình đã bắt đầu một việc để tạo ra các bạn ấy cơ mà. Đó có thể là sai cú pháp, sai chính tả, chương trình không chạy đúng, …

Sau khi đã có một mindset đúng đắn hơn(như ở trên), là không sợ bug, bug là chuyện đương nhiên, may quá có bug rồi, bug mình gặp thì review code sẽ không gặp, QA sẽ không mắc công bắt, lên production lại đỡ làm phiền người dùng. Cho nên:

Bug là bạn, bug là bạn, bug là bạn nha 🥲

Tiếp theo sẽ là một số **mẹo và kỹ thuật** để nhận dạng bug và sửa nó hiệu quả:

## ✍️ Mô tả vấn đề(describe the problem)
Để fix bug, đầu tiên bạn cần mô tả được vấn đề mà mình gặp phải. 

Đôi khi có những vấn đề đơn giản chỉ cần bạn mô tả và kiểm tra vài thông tin liên quan là có thể sửa được rồi.

**Ví dụ**: Thực hiện in ra một danh sách các số từ 1 đến 5 với đoạn code Python sau:
![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2022/06/range-bug.png)

**Mô tả vấn đề:**

Không có số 5 trong danh sách như mong đợi dù range(1, 5) là mong đợi sẽ trả về từ 1 đến 5.

**Sửa lỗi:** 

Để giải quyết vấn đề này sẽ cần đọc lại về hàm range, bạn sẽ thấy cú pháp là:

`range(start, stop, step=1)` với `stop` sẽ bị bỏ qua.

Do đó muốn giải quyết thì mình cần tăng stop từ 5 lên 6, tức `range(1, 6)`

## 🐞 Tái tạo lại lỗi(reproduce the bug)
Rất nhiều khi bug chỉ thỉnh thoảng xuất hiện. Để fix được những bug như vậy lập trình viên cần biết cách tái tạo lại con bug đó và tìm hiểu chính xác vấn đề mà trường hợp đó gặp phải là gì thì mới có thể sửa lỗi được

**Ví dụ:**

Giả sử bạn có một danh sách: `numbers = [1, 2, 3, 4, 5, 6]`. Bạn muốn chọn ngẫu nhiên một số trong 6 số ở trên. 
Gọi `choice = randint(1, 6)` để chọn số từ 1 đến 6 và kết quả chọn được sẽ là `numbers[choice]`

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2022/06/choice-not-error.png)

Khi chạy chương trình, bạn sẽ thấy chương trình chạy ổn. 

Tuy nhiên nếu chạy nhiều lần thì sẽ có một lỗi như thế này xuất hiện:

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2022/06/choice-error.png)

Vậy làm sao có thể tái tạo lại lỗi này nhỉ?

**Tái tạo lỗi:**

Đầu tiên, `choice = randint(1, 6)` nên mình cần đọc lại về randint, bạn sẽ thấy nó được mô tả là sẽ trả về một số nguyên giữa khoảng 1 và 6, bao gồm cả số 1, 6.

Bạn có thể thử nghiệm bằng cách gán giá trị từ 1 đến 6 cho biến choice để thấy được là khi `choice = 6` thì sẽ có lỗi trên xuất hiện.

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2022/06/error-with-6.png)

**Sửa lỗi:**

Như vậy ở đây lỗi sẽ xảy ra với số 6 vì `numbers` có 6 phần tử với index đếm từ 0 đến 5. Do đó lỗi này sẽ được sửa với `choice = randint(1, 5)`

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2022/06/fix-bug.png)

## 💻 Thử đóng vai là máy tính(play computer)
Với một chương trình phức tạp như có logic với nhiều điều kiện rẽ nhánh, hay gọi nhiều hàm khác nhau, thì việc sửa lỗi sẽ càng khoai hơn. 

Lúc này bạn cần tưởng tượng mình là máy tính, và bạn tự kiểm tra từng dòng một của chương trình như cách máy tính chạy để tìm manh mối cho lỗi của mình.

**Ví dụ:** Đoạn chương trình dưới đây sẽ kiểm tra nếu số tuổi nhỏ hơn 16 và lớn hơn 60 sẽ không được chơi trò chơi. 

**Mô tả vấn đề:** khi nhập 16 tuổi thì lại không in ra gì cả.

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2022/06/play-game-condition-1.png)

**Play computer:** 
Để sửa được lỗi này, mình sẽ áp dụng Play computer như sau:

– Đầu tiên, `year_old` được nhập là 16, ở dòng số 1

– Tiếp theo, máy tính sẽ chạy đến dòng số 4:

      – `year_old > 60 tức là `16 > 60` là `False`

  – `year_old < 16` tức là `16 < 16` là `False`

  Do đó ở đây là: `if False or False`. Kết quả là `False`, nên dòng số 5 sẽ không được thực thi.

– Tiếp theo, máy tính sẽ chạy đến dòng số 6, `year_old > 16` là `16 > 16` cũng là `False`, nên dòng số 7 cũng không được thực thi

**Vậy kết quả là không in gì ra hết.**

**Sửa lỗi:** Vì 16 không có điều kiện đúng ở đâu cả, nên mình cần làm 16 trả về `True` để có thể chơi game, tức là thay vì `year_old > 16` sẽ là `year_old >= 16`
![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2022/06/play-game-condition-2.png)

## 🏹 Sửa lỗi(fix the errors)
Khi bạn viết chương trình, nếu trình soạn thảo(editor) hiển thị các lỗi(như hiện gạch đỏ ở nơi có lỗi)

Khi bạn chạy chương trình, nếu có lỗi hiển thị các lỗi thì bạn cũng cần sửa chúng. Bạn có thể đọc thông tin của lỗi hiện ra, và cũng có thể dùng thông tin đó tìm trên mạng(StackOverflow).

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2022/06/error-on-code.png)

Và cũng có những lỗi mà không có bất cứ thông tin hay lỗi nào thực sự xuất hiện.

Ví dụ bạn viết:

`print("Hello {name}")` thì kết quả sẽ là `Hello {name}`, chỉ đơn giản là nó không đúng với cái bạn mong đợi Hello Thanh với name ở đây là Thanh.

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2022/06/f-string-error.png)

Để sửa lỗi này, bạn cần phải xem lại các kiến thức mình đã học, cụ thể ở đây là dùng một biến trong chuỗi ký tự thì sẽ cần có **f-strings**, nên sửa lại là `print(f"Hello {name}")`

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2022/06/fix-f-string-erro.png)

## 🛠 Dùng các công cụ hỗ trợ kiểm tra lỗi(print, log, debugger)
Cuối cùng, để kiểm tra chính xác từng kết quả khi chương trình thực thi, bạn có thể dùng các câu lệnh in ra màn hình(print) để kiểm tra các tham số, kết quả hay chỉ là chương trình đã chạy đến dòng nào đó hay chưa. Như chương trình if/else với year_old ở trên là chưa in ra các câu tức là chương trình chưa chạy vào đó.

Debugger là một công cụ mạnh mẽ hơn cả print, nó giúp bạn đi qua từng dòng code và xem chương trình thực thi ra sao(với Python bạn có thể dùng [pythontutor](https://pythontutor.com/) hay [Thony](https://thonny.org/), [VSCode Debugger)](https://code.visualstudio.com/docs/python/debugging)

Đây là một ví dụ mình thực hiện debug với pythontutor.com:
![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2022/06/debugger-python-tutor.png)

## 😌 Nghỉ tay tí đã
Mọi chuyện đều từ từ sẽ giải quyết được(hoặc không giải quyết được 🥲) , quan trọng là *“Ăn miếng bánh, uống miếng nước”* cái đã, chứ ngồi chu hu vô cái máy tính, nhìn chằm chằm vô code thì cũng không vì thế mà bug nó tự hết được. 

Tự nói với bản thân: **Bình tĩnh, chuyện nhỏ thôi. Take it easy!**

Khúc ni tám nhảm tí, hồi mới làm dự án, mình ám ảnh bug tới nổi mà ngủ cũng mơ thấy bug luôn. Có hôm còn kỳ diệu đến nổi làm không ra xong đi ngủ giấc mai dậy tự biết cách sửa luôn ấy ~.~ 

Cho nên là, nếu bí quá thì nhớ nghỉ tay tí đã ha.

## 👭 Hỏi bạn bè thử
Khi bị ăn bí thì bạn cũng có thể hỏi bạn bè cùng học với mình, hoặc là đồng nghiệp, hoặc là hỏi trên những cộng đồng có nhiều người dùng ngôn ngữ này, hoặc đặt câu hỏi **StackOverflow**(nhớ kiểm tra xem câu hỏi của bạn đã có trên đó chưa nha) nữa. 

Nói chung là nếu cần thì cứ chủ động đi hỏi nha, vì người khác nhìn vào code của mình sẽ nhìn ra những điểm mà mình không nhìn thấy á.

## 🏃‍♀️Chạy code thường xuyên
Khi chương trình ngày càng phức tạp lên, bạn nên thực hiện chạy chương trình thường xuyên(mỗi khi có code thay đổi), hay thậm chí là mình chạy từng phần của chương trình, gọi từng đoạn logic nhỏ và đảm bảo chạy đúng như mình mong đợi. 

Làm như vậy sẽ giúp chia nhỏ chương trình để dễ kiểm lỗi hơn, và giúp bạn dễ định hướng hơn thay vì phải đi fix một đống lỗi tùm lum mà không biết đâu là đâu cả.

---
Trên đây là Trên đây là một vài note từ bài học gỡ lỗi mà mình học được, chúc các bạn code ít bug và gặp bug thì không ngại nha.

Nếu bạn có những cách gỡ lỗi nào hiệu quả thì giới thiệu đến mình và độc giả của BeautyOnCode với nhé.

[Bài gốc của blog này nằm ở blog cá nhân của mình, mời bạn ghé chơi!](https://beautyoncode.com/go-loi-chuong-trinh/)

Nếu thích bạn cũng có thể [follow fanpage này](https://www.facebook.com/beautyoncode) để nhận thông báo bài viết mới nhé.

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
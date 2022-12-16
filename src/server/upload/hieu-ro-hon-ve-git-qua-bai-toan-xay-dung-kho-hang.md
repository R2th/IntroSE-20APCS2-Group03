Với người mới bắt đầu tìm hiểu và sử dụng git hẳn sẽ có rất nhiều thắc mắc, khó khắn hay cảm thấy mù mờ không rõ ràng về hệ thống quản lý phiên bản này, mình cũng từng như vậy nhưng sau một thời gian làm việc, vật lộn cùng nó thì đã hiểu ra được ít nhiều và muốn chia sẻ với mọi người sâu hơn, rõ ràng hơn một chút về git qua một ví dụ lấy từ thực tế nhằm giúp mọi người tiếp cận vấn đề một cách tường minh nhất.

## 1. Đặt vấn đề
Hãy giả sử bạn là một tên lâm tặc  ( hay người tiều phu  =)) ), hàng ngày bạn phải đi chặt gỗ trong rừng, bạn chặt được rất nhiều gỗ để xây nhà, trong khi xây nhà có khi gỗ bị thiếu hụt do trộm cắp, do gỗ xấu mình muốn bỏ bớt đi, hay được thêm vào do công trình cần thêm nguyên liệu, rồi phát sinh thêm nhu cầu cần bỏ đi các chi tiết đã xây mà không ưng ý để xây lại kiểu khác, đôi khi lại muốn căn nhà về như hiện trạng ban đầu để xây mới cho đẹp đẽ, ... tất cả những nhu cầu quản lý và sửa đổi này nếu như làm thủ công, hàng ngày bạn phải đi kiểm tra xem gỗ có đủ hay không, muốn sửa chữa phải dỡ bỏ từng chút một rồi làm lại sẽ rất mất công. Đang bế tắc thì có một tay sale, chuyên bán các giải pháp quản lý cho chủ thầu đến làm quen vầ muốn hợp tác với bạn.

Tay này tên là git, hắn có một giải pháp rất thông minh và tiện lợi cho yêu cầu của bạn, đó là xây dựng một cái kho, cái kho này sẽ nằm trong khu rừng của bạn và đội ngũ tay chân của hắn sẽ quản lý mọi thứ cho bạn, chúng sẽ giám sát khởi điểm bạn có bao nhiêu gỗ, mỗi ngày thêm mới hay bớt đi bao nhiêu, hay hơn nữa, với mỗi lần bạn xây nhà nó sẽ lưu lại trạng thái căn nhà của bạn, nếu như sau khi xây tiếp mà xấu quá căn nhà có thể trở lại trạng thái như trước khi sửa đổi chỉ trong 1 nốt nhạc, bạn có thể có hàng trăm nghìn những trạng thái của căn nhà, để rồi trạng thái nào ưng nhất tốt nhất thì dùng thôi,... Tất cả tất cả những thông tin đó sẽ được cất giữ an toàn trong cái kho đã xây ra, có thể hiểu cái kho này là nơi lưu trữ mọi thay đổi về hiện trạng căn nhà cũng như các tài nguyên của bạn, đấy là các lợi ích chính của tay này, bên cạnh đó còn vô vàn các công cụ khác mà hắn cung cấp, phải nói thêm, git đến với mục tiêu **phi lợi nhuận**, vâng chính xác, hắn cung cấp cho chúng ta rất nhiều lợi ích như vậy nhưng hoàn toàn free, cứ thế mà xài thôi.

## 2. Git init
Ai từng dùng git chắc chắn phải ít nhất 1 lần dụng lệnh `git init` và chính xác mục đích của lệnh này đó là `initialization` khởi tạo một kho chứa gỗ, gỗ ở đây chính là source code của chúng ta, kho chưa này được lưu trong thư mục project dưới dạng một folder tên là `.git`, mọi người dùng ubuntu có thể `Ctrl+H` để show folder ẩn sẽ thấy trong thư mục project của mình có chưa 1 folder `.git`. Bên trong folder này sẽ chứa các file và folder nhằm mục đích quản lý toàn bộ code của chúng ta. Dưới đây là những gì chứa trong cái kho

   ![](https://images.viblo.asia/52d412cb-1b01-4f7b-9d05-23ddeca294ff.png)

Một số folder và file cần lưu ý:
* HEAD
* config: Nơi lưu giữ các thông tin cấu hình về cái kho của bạn, như tên của bạn, mail, ...
* description: Trước đây thường dùng để lưu các thông tin mô tả của kho hàng.
* hooks: Lưu các đoạn script dùng để chạy một số tiện ích trước hoặc sau khi chúng ta thao tác push/pull/rebase,...
* info — exclude: Lưu thông tin các file mà bạn không muốn git kiểm soát ( nằm ngoài vùng kiểm soát )
* objects: **Đây là nơi thực sự chứa bản sao, hay các commit mà chúng ta tạo ra( có thể nói cách khác đây chính là vùng thực sự có gỗ trong cái kho của chúng ta) và cũng sẽ là nội dung chính của bài chia sẻ này**

## 3. Git objects
Như đã đề cập ở trên folder `objects` trong thư mục .git là nơi chính lưu code của chúng ta vậy tổ chức bên trong folder này ra sao? Tại sao nó có thể lưu được nhiều thứ đến như vậy? ,.. ta sẽ cùng đi tìm hiểu ngay bây giờ đây.

Các bạn cần lưu ý là khi mới init để khởi tạo kho lưu trữ thì thư mục `objects` bên trong `.git` sẽ chỉ có 2 folder con là `info` và `pack` và chúng ta không cần quan tâm đến chúng. Các folder cần quan tâm chỉ được sinh ra khi bạn thực hiện commit lần đầu tiên. Đến đây sẽ có câu hỏi vậy commit là gì? Đây là 1 câu hỏi tưởng chừng như ai cũng biết nhưng thực sự không phải ai cũng biết :D, khi gõ lệnh `git commit -m 'commit message`thì chính xác điều gì xảy ra?

Để tường minh mình sẽ có một folder `test`, bên trong có chứa 1 file `test_commit.rb`, trong file này có đoạn text `this is test file`. cd đến folder test, chạy `git init` sẽ có folder `.git`
![](https://images.viblo.asia/47e25f9c-e93b-440f-a128-3a6e1a055ec3.png)

Hiện tại bên trong folder `objects` ở trong `.git` có thể được coi là trống trơn
![](https://images.viblo.asia/29677f16-95b4-4f90-b084-6945aec6bd4b.png)

Sau đó thực hiện commit 
```  
$ git commit -m 'First time init' 
```
Lúc này sẽ thấy thay đổi bên trong folder `objects`
![](https://images.viblo.asia/e71e0049-fc60-47d4-8fc0-b23cae00ff2d.png)

Xuất hiện thêm 3 folder mới là `9d` `c8` và `e7` và sự thú vị bây giờ mới bắt đầu đây. Ta sẽ vào terminal xem log của git nhé
```
$ git log --oneline

# Log commit
c83dd69 First time init
(END)
```
Commit id là `c83dd69`, trong folder `objects` có folder `c8` hãy mở folder này ra, bên trong chứa 1 file binary tên `3dd69a05df00477f449dce63e727b70e660052`, ghép tên folder và tên file này vào sẽ được một chuỗi hash `c83dd69a05df00477f449dce63e727b70e660052`, có thể thấy 6 số đầu tiên chính là commit id của chúng ta `c83dd69`.

Tiếp tục, ta sẽ mở tiếp file binary bên trong folder c8 bằng lệnh:
```
$ git cat-file -p c83dd69a05df00477f449dce63e727b70e660052

# noi dung
tree e771be2e6592ac8143a6d839c0ac5548162ebd1e
author *******Thinh <*****.thinh@gmail.com> 1528626639 +0700
committer *******Thinh​ <*****.thinh@gmail.com> 1528626639 +0700

First time init
```

Có thể thấy trong file này chứa một số thông tin về `tree`, author, commiter. Đáng chú ý `tree` này sẽ khớp với 1 folder `e7` đã đề cập phía trên, bạn mở tiếp vào folder `e7` chắc chắn sẽ có file với tên dưới dạng hash bắt đầu bằng `71b` , tiếp tục khám phá cái `tree` này bằng lệnh:
```
$ git cat-file -p e771be2e6592ac8143a6d839c0ac5548162ebd1e

# noi dung
100644 blob 9d8a4e73e4f8897352d20eda060a812dab709fc9	test_commit.rb
```

Ta thấy có 1 blob cũng ở dạng hash và chắc chắn rồi, nó sẽ tương ứng với folder còn lại của chúng ta là `9d`. Hãy thử đoán xem khi bung file này ra sẽ chứa cái gì ??
```
$ git cat-file -p 9d8a4e73e4f8897352d20eda060a812dab709fc9

# noi dung
this is test file
```
Vâng nó chính là nội dung của file test_commit mà chúng ta đã tạo lúc ban đầu!

**Đi ngược lại** quá trình trên ta sẽ hiểu được git đã làm gì khi chúng ta **thực hiện commit:**
* Đầu tiên, nó sẽ đọc lần lượt từng file, folder trong cây thư mục project của chúng ta, sử dụng thuật toán băm ( hoặc một thuật toán gì đó khác, phần này mình ko chắc chắn lắm :D) để mã hóa toàn bộ nội dung của file thành 1 mã hash gồm 40 ký tự như ta đã thấy ( ở đây, nội dung `this is test file` được băm thành mã `9d8a4e73e4f8897352d20eda060a812dab709fc9`), có bao nhiêu file sẽ tương ứng với ngần đó file hash ( đến đây đừng thắc mắc vội đoc tiếp đi đã :D). Như ví dụ của chúng ta chỉ có 1 file là `test_commit` nên chỉ có 1 hash tương ứng với nó.
* Tiếp theo, sau khi `băm` một lượt cả thư mục, ta được một tập hợp rất nhiều file binary dưới dạng mã hash, git tiếp tục `băm` toàn bộ những **mã hash của tất cả các file đã được băm ở bước trên** thành 1 file duy nhất. Cụ thể ở đây ta thấy đó là `tree e771be2e6592ac8143a6d839c0ac5548162ebd1e` . Có thể hiểu đây chính là bước chụp lại ảnh của toàn bộ thư mục, lưu giữ kí ức trong hash mới `e7` này. `tree` .
* `tree` này cùng một số thông tin khác như thông tin về `author` và `committer` được git băm lại ra một file cuối cùng chính là `c83dd69a05df00477f449dce63e727b70e660052` và đây chính là commit object của chúng ta thường thấy khi xem git log.


Đến đây mọi người đã thấy git hoạt động khá tường mình chưa nào, có thêm 1 câu hỏi nhỏ để kiểm tra xem mọi người có năm được vấn đề không nhé: Giả sử ban đầu mình có 4 file chưa được track, vậy sau khi commit ta sẽ có bao nhiêu folder chứa các file hash?
--> Rất dễ phải không, chúng ta sẽ có 6 foldể như vậy, vì 4 folder tương ứng với 4 file được băm, 1 folder băm tất cả các hash của 4 file kia, và 1 folder cuối cùng băm thằng vừa băm 4 thằng kia và đây chính là commit id của chúng ta.

Bài viết cũng khá dài rồi nên những vấn đề khác bên trong kho chứa `.git` mình sẽ hẹn các bạn ở bài viết sau nhé

## 4. References
https://git-scm.com/book/en/v2/Git-Internals-Git-Objects
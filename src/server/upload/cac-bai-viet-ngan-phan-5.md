![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2022/08/300370292_1907622342776748_7410017351988095767_n-scaled.jpeg)

## Liệu JS có bị cho về hưu ?
Trong cuộc phỏng vấn gần đây với Evron, Douglas Crocklock, một trong những người tham gia khởi tạo ngôn ngữ JavaScript.

Ông cũng là tác giả của “How does JavaSript work?”, cũng là người khám phá ra JSON – định dạng dữ liệu được yêu thích nhất trên thế giới.

Douglas đã trả lời Evrone rằng “Điều tốt nhất ngày nay chúng ta nên làm cho JavaScrip là cho nó nghỉ ngơi (gỡ bỏ nó). Phải chăng đây cũng là lý do ông đã không còn viết nhiều về JavaScript nữa?

Evrone: In your opinion, what expected changes in JavaScript are going to be the most important?

Douglas: The best thing we can do today to JavaScript is to retire it.

Evron cũng đề cập đến cuộc chiến giữa XML và JSON, Douglas đã cho biết thời kỳ bán rã của XML từng là trong khoảng 3 năm.

Thật khó để nói về tương lai sẽ ra sao, liệu Typescript hay ngôn ngữ nào có thể thay thế cho chú khủng long JavaScript không?

Đọc thêm cuộc trò chuyện thú vị này ở [đây](https://evrone.com/douglas-crockford-interview).

## Tìm kiếm nhị phân (binary search)
Tìm [kiếm nhị phân](https://vi.wikipedia.org/wiki/T%C3%ACm_ki%E1%BA%BFm_nh%E1%BB%8B_ph%C3%A2n) (binary search) là một thuật toán tìm kiếm xác định vị trí của một giá trị cần tìm trong một mảng đã được sắp xếp.

Thuật toán sẽ tiến hành so sánh giá trị cần tìm với phần tử đứng giữa của mảng. Nếu hai giá trị không bằng nhau, thì một nửa mảng không chứa giá trị cần tìm sẽ được bỏ qua, và tiếp tục tìm kiếm trên nửa còn lại. Một lần nữa, lấy phần tử ở giữa so sánh với giá trị cần tìm, cứ thế lặp lại cho đến khi tìm thấy giá trị đó. Nếu phép tìm kiếm kết thúc mà vẫn chưa có giá trị cần tìm tức là nó không có trong mảng.

Binary search chạy theo giời gian logarit trong trường hợp tệ nhất, thực hiện O(logn) bước so sánh, với n là số phần tử của mảng. Thuật toán này sẽ nhanh hơn thuật toán tìm kiếm tuyến tính thông thường (lặp qua toàn mảng) với O(n)

Một số vấn đề thường gặp khi giải bài toán binary search:

– Khi nào thì sẽ thoát ra khỏi vòng lặp?

– Làm sao để khởi tạo và cập nhật biên bên trái (left), biên bên phải (right)?

[Bài viết sau](https://beautyoncode.com/tim-kiem-nhi-phanbinary-search/) giới thiệu một bản mẫu tổng quát về cách giải binary search sẽ giúp bạn hình dung về cách giải bài toán này dễ dàng hơn.

## Useful extensions for FE Developer
Là một Frontend Developer, một trong những bộ công cụ hữu dụng chính là những extensions(phần mở rộng) được cài đặt trên trình duyệt Chrome.

Giới thiệu đến bạn 4 extensions sẽ mang đến cho bạn thêm năng lực làm một FE developer xịn xò:

1. **WhatFont** – giúp bạn xem trang web đang sử dụng loại font nào, kích thước ra sao

2. **Measure It** – Một cây thước trên trình duyệt giúp đo đạc sẽ là công cụ hữu dụng

3. **Perfect Pixel** – Kiểm tra trang web của bạn với bản thiết kế bằng cách kéo thả bản thiết kế vào và thực hiện so sánh trực tiếp trên trang web với chế độ chỉnh opacity và drap/drop

4. **Live Editor CSS** – Sửa style của trang web ngay trên màn hình và có thể sử dụng những đoạn mã này nhanh chóng

Ghé [blog này](https://beautyoncode.com/chrome-extensions-huu-ich-danh-cho-frontend-developer/) để đọc thêm chi tiết với hình minh hoạ và link để cài đặt những extensions này nhé.
## Tự động push code giải leetcode bằng Leethub extensions
Bạn đã bắt đầu giải [leetcode.com](http://leetcode.com/) hàng ngày để rèn luyện tư duy logic cũng như học thêm về cấu trúc dữ liệu và thuật toán chưa?

Bạn có đang copy code đã giải trên leetcode rồi commit lên repo cá nhân của mình để lưu lại những bài tập mình đã làm không? Hay để làm đẹp tài khoản github bằng những contributions thường xuyên thể hiện bạn code mỗi ngày (cool mà ^^)

Nếu bạn đang làm như thế thì .. đây, minh muốn giới thiệu một tuyệt chiêu mình mới tậu gần đây, một extension giúp bạn không làm gì cả nhưng cứ Submit leetcode là sẽ có commit tự động lên repo cá nhân của bạn. Đó là LeetHub.

Đây là [link](https://chrome.google.com/webstore/detail/leethub/aciombdipochlnkbpcbgdpjffcfdbggi?hl=en) tải extension LeetHub 

Sau khi cài đặt và kết nối đến github với repo có sẵn hay repo mới sẽ được tạo, là bạn có thể bắt đầu thử nghiệm rồi.

Đây là [repo](https://github.com/GraphicDThanh/leetcode) mình thử nghiệm submit leetcode gần đây.

Giao diện LeetHub hiển thị:
![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2022/09/leethub.png)
## Trực quan hóa khi chạy mã chương trình
Giả sử bạn đang giả một bài toán nhưng gặp bug, thì bạn sẽ làm gì?

Giới thiệu đến bạn một công cụ Visualize Code Running có tên là [pythontutor.com](http://pythontutor.com/) giúp bạn xem được từng bước được mô tả một cách trực quan. Dù là pythontutor nhưng công cụ này hỗ trợ nhiều loại ngôn ngữ như Python, JavaScript, C, C++, and Java.

Bạn vào trang pythontutor.com sau đó chọn Start writing and visualizing code now và chọn ngôn ngữ muốn viết.

Sau khi đã nhập (paste) đoạn code cần debug vào, nhấn nút Visualize Executionđể bắt đầu xem code thực thi ra sao. Bấm Next để di chuyển đến bước tiếp theo.

Nửa màn hình bên trái chứa code, các nút bấm để di chuyển đến bước tiếp theo Next, bước trước đó Prev, bước cuối cùng Last và bước đầu tiên First

– Mũi tên xanh lá câu nhạt chỉ dòng vừa mới thực thi

– Mũi tên đỏ chỉ dòng sẽ thực thi tiếp theo

Mời bạn ghé đọc [bài viết này](https://beautyoncode.com/truc-quan-hoa-khi-chay-ma-chuong-trinh/) là một ví dụ cụ thể về cách bạn có thể sử dụng pythontutor để debug một đoạn logic của bài leetcode [**35. Search Insert Position**](https://leetcode.com/problems/search-insert-position/) và xem từng bước chạy như thế nào. 

Thay vì đi console.log mọi nơi thì cách này xịn xò hơn hẳn phải không?
## npkill
Nếu muốn hiện các dependences trong một một dự án quản lý bởi npm (Node Package Manager), câu lệnh “npm list” hoặc “npm ls”. Nếu muốn tìm kiếm có thể sử dụng “npm search [search term]”

Gần đây, npm v8.16.0 đã mắt thêm một câu lệnh “npm query” cho phép tìm kiếm theo Dependences Selector, có cú pháp tương tự như CSS Selectors, một ngôn ngữ mà hầu như lập trình viên nào cũng biết.

Ví dụ thay vì “npm list –all” thì nay có thể thay bằng npm query “*” Hoặc muốn tìm kiếm những phiên bản của react thì có thể kiếm bằng: npm query “#react” Tìm những phiên bản react mà không phải là peer dependences: npm query “#react:not(.peer)” Tìm tất cả dependences loại git: npm query “:type(git)” Tìm tất cả dependences có license là MIT: npm query “license=MIT”

Bạn ghé đọc [bài viết này](https://github.blog/changelog/2022-08-03-introducing-the-new-npm-dependency-selector-syntax/) để bỏ túi thêm vài típ sử dụng khác nha.
## CRUD là gì?
Thuật ngữ CRUD, hay CRUD Operation được sử dụng khá phổ biến, đó không phải là một từ mà là viết tắt của Create – Read – Update – Delete, đại diện cho 4 hoạt động chính của một ứng dụng

Ví dụ bạn tạo một app các công việc cần làm (todo list), thì sẽ cần người dùng nhập các công việc cần làm (create), xem được danh sách các công việc (read), thay đổi nội dung công việc (update) hoặc xoá công việc khi không cần làm nữa (delete).

Một ứng dụng CRUD sẽ bao gồm 3 phần chính: server (API) : truyền dữ liệu database : lưu dữ liệu client app (UI) : hiển thị dữ liệu, nơi người dùng nhập dữ liệu

CRUD cũng tương ứng với các phương thức HTTP cụ thể: Create tương ứng với POST Read tương ứng với GET Update tương ứng với PUT/PATCH. PUT là update toàn phần, PATCH là update một phần Delete tương ứng với DELETE

Bạn có thể đọc thêm về các ví dụ ở [link sau](https://www.freecodecamp.org/news/crud-operations-explained/).
## npm query
Nếu muốn hiện các dependences trong một một dự án quản lý bởi npm(Node Package Manager), câu lệnh “npm list” hoặc “npm ls”. Nếu muốn tìm kiếm có thể sử dụng “npm search [search term]”

Gần đây, npm v8.16.0 đã mắt thêm một câu lệnh “npm query” cho phép tìm kiếm theo Dependences Selector, có cú pháp tương tự như CSS Selectors, một ngôn ngữ mà hầu như lập trình viên nào cũng biết.

Ví dụ thay vì “npm list –all” thì nay có thể thay bằng npm query “*” Hoặc muốn tìm kiếm những phiên bản của react thì có thể kiếm bằng: npm query “#react” Tìm những phiên bản react mà không phải là peer dependences: npm query “#react:not(.peer)” Tìm tất cả dependences loại git: npm query “:type(git)” Tìm tất cả dependences có license là MIT: npm query “license=MIT”

Bạn ghé đọc [bài viết này](https://github.blog/changelog/2022-08-03-introducing-the-new-npm-dependency-selector-syntax/) để bỏ túi thêm vài típ sử dụng khác nha.
## Giới thiệu về mã 
Trong thế giới phần mềm, bạn sẽ hay gặp câu hỏi: “Phần mềm này là loại mã nguồn mở (open source) hay mã nguồn đóng (closed source)?”

Vậy thì mã nguồn là gì? mã nguồn mở hay mã nguồn đóng nghĩa là sao?

Mã nguồn (source code) là phần code của ứng dụng. Ví dụ đơn giản nhất là chương trình hello world, in ra một dòng “Hello Linux!”

```python
print("Hello Linux")
```
nội dung trên chính là mã nguồn của chương trình viết bằng Python.

Mã nguồn đóng(closed source) là những phần mềm độc quyền với mục đích bảo vệ mã nguồn để tránh cạnh tranh, sao chép, … (Windows, MacOS, …)

Mã nguồn mở(open source) là chương trình có mã nguồn được cung cấp sẵn (Linux, Firefox, Git, …). Open source có thể hiểu là khả năng truy cập vào mã nguồn.

Ngoài ra còn có free source, là những phần mềm được tự do copy hay có thể thay đổi của chương trình, chứ không liên quan đến giá cả.

Open source có rất nhiều lợi ích như được sự đóng góp của cộng đồng, source code tốt hơn và giảm thời gian phát triển phần mềm. Và cũng vì được mở nên sẽ tiếp cận được nhiều người hơn.

Linux thường hay được biết đến là hệ điều hành mã nguồn mở phổ biến. Tuy nhiên thực tế Linux chỉ là một phần mềm nhân (kernel). Mời bạn đọc thêm về các loại mã nguồn và giới thiệu về Linux ở [đây](https://beautyoncode.com/gioi-thieu-ve-linux/).
## Làm tròn số thực trong Python
Làm tròn số thực trong Python là chuyện thường ngày, và tụi mình sẽ sử dụng rất nhiều trong khi học Python cùng toán cũng như trong hiển thị các số thực với một số lượng các chữ số thập phân bất kỳ.

Có một số cách để làm tròn số thập phân:

– Dùng hàm round() Cách này sẽ làm tròn số 3.333333 thành 3.33 và số 3.5 sẽ giữ nguyên là 3.5. round(3.33333) kết quả 3.33 round(3.5) kết quả 3.5 Nếu bạn muốn bắt buộc có hai chữ số thập phân thì cách này chưa triệt để, kết quả cần là 3.50

– Chuyển về định dạng chuỗi và cắt số ký tự đứng sau dấu . rồi chuyển về lại dạng số với ép kiểu qua float

“{:.2f}”.format(3.5) kết quả “3.50”

Lưu ý đây là chuỗi, muốn chuyển qua số bạn cần thực hiện ép kiểu từ string về số với float()

Nội dung này được tóm tắt từ [bài viết](https://beautyoncode.com/lam-tron-dung-hai-chu-so-thap-phan-trong-python/) chia sẻ tips trên blog cá nhân của mình.

---
Nội dung này thuộc BeautyOnCode's short posts là các bài viết ngắn tóm tắt nội dung và ý kiến cá nhân từ các nguồn như các slack channels (công ty, cộng đồng), các new letters, …

Các bài viết này cũng được đăng ở:

👉 [BeautyOnCode trên Careerly](https://careerly.vn/profiles/1140) (lời hứa với Careerly) Trên đây có gần 900 người theo dõi, và là trang tin công nghệ khá hay, bạn có thể tải app rồi theo dõi mình nhé.

👉 [Blog BeautyOnCode, chuyên mục “Short Posts”](https://beautyoncode.com/category/short-posts/)

👉 [Fanpage BeautyOnCode](https://www.facebook.com/beautyoncode)

👉 Trang [notion này](https://graphicdthanh.notion.site/BeautyOnCode-short-posts-c2996f46c7674f50bf9b88bb491094ab) tổng kết các bài viết

Nếu bạn thích đọc hàng ngày thì hãy follow các trang trên nhé. Chúc bạn đọc vui ^^

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
<div align="center">
    
# Lời nói đầu
    
</div>

Xin chào tất cả các bạn, hôm nay mình sẽ quay trở lại với một chủ đề *`tuy lạ mà quen, tuy quen mà lạ`*. Chắc hẳn nếu là một web developer, các bạn sẽ không còn xa lạ gì với việc phải **validate** dữ liệu người dùng nhập vào (**email** phải đúng format @xxx.xxx, **tuổi/sđt** phải không chứa ký tự chữ). Khi sử dụng các framework thì bạn có thể giải quyết nó một cách rất dễ dàng. Tuy nhiên bạn đã bao giờ tự hỏi là làm thế nào để xử lý được việc đó chưa?

Câu trả lời ở đây chính là "**Regular Expressions- Biểu thức chính quy**" hay thường được gọi tắt là **Regex**.

<div align="center">
    
# Nội dung
    
</div>

<div align="center">
    
## Regex là gì?
    
</div>

- Theo như định nghĩa trên wikipedia thì 
> **Biểu thức chính quy** (tiếng Anh: **regular expression**, viết tắt là regexp, regex hay regxp) là một chuỗi miêu tả một bộ các chuỗi khác, theo những quy tắc cú pháp nhất định. Biểu thức chính quy thường được dùng trong các trình biên tập văn bản và các tiện ích tìm kiếm và xử lý văn bản dựa trên các mẫu được quy định. Nhiều ngôn ngữ lập trình cũng hỗ trợ biểu thức chính quy trong việc xử lý chuỗi, chẳng hạn như Perl có bộ máy mạnh mẽ để xử lý biểu thức chính quy được xây dựng trực tiếp trong cú pháp của chúng. Bộ các trình tiện ích (gồm trình biên tập sed và trình lọc grep) đi kèm các bản phân phối Unix có vai trò đầu tiên trong việc phổ biến khái niệm biểu thức chính quy

- Nói một cách đơn giản thì **Regex** là một bộ những quy tắc để xử lý chuỗi ký tự. Nó gần giống như kiểu là bạn tra từ điển vậy, bạn sẽ tìm ra một chuỗi ký tự thoả mãn điều kiện nhất định, và thay vì làm bằng cơm thì bạn sẽ dùng **regex** để nhờ máy tính tìm chuỗi ký tự ấy thay bạn. 

- Trước khi bắt đầu, hãy nhớ một điều rằng `Regex là BỘ QUY TẮC chứ không phải NGÔN NGỮ LẬP TRÌNH`. Và dù bạn có đang học tập, làm việc với ngôn ngữ lập trình nào đi chăng nữa thì nó cũng hỗ trợ regex, bởi vì nó cực kỳ phổ biến và hữu dụng.

<div align="center">
    
## Một số trang web phổ biến
    
</div>

- Ngày xưa các cụ đã có câu "Học đi đôi với hành" cho nên là mình sẽ cung cấp cho các bạn các trang demo trước. Và ở trong mỗi trang cũng có phần ***cheatsheet*** thống kê các cú pháp của regex. Nếu bạn , còn nếu bạn lười dịch (như mình) thì hãy kéo xuống dưới xem phần vietsub của mình nhé.

- Demo regex online: 
    - https://regex101.com/
    - https://regexr.com/
- Làm bài tập thực tế: https://regexone.com/

<div align="center">
    
## Các cú pháp thường sử dụng
    
</div>

- `[xyz]` tìm ra chuỗi có chứa 1 ký tự trong chuỗi ở trong dấu ngoặc vuông (hoặc x hoặc y hoặc z). Ví dụ: `[ba]` sẽ trùng khớp với b hoặc a.

![](https://images.viblo.asia/6c91be29-7a72-4ceb-a558-5058b8a0239c.jpg)

- `[X-Y]` tìm ra chuỗi có chứa 1 ký tự nằm trong khoảng chỉ định (có thể là chữ cái a-z hoặc chữ số 0-9). Ví dụ: `[a-d]` sẽ trùng với a hoặc b hoặc c hoặc d. 

![](https://images.viblo.asia/2fa4c5ac-51b4-4e53-9e8c-d3eeac9ab466.jpg)


- `[^xyz]` thêm dấu mũ vào trong `[]` sẽ mang ý nghĩa phủ định, ở đây là tìm ra chuỗi KHÔNG chứa ký tự x và y và z. 

![](https://images.viblo.asia/8fb7d4f5-7289-4be4-a6d2-46a44a28159e.jpg)

- `\b` (viết thường) tìm chuỗi có chứa NGUYÊN VĂN ký tự đứng trước nó. Ví dụ: boy\b sẽ tìm ra chuỗi "boy friend" nhưng sẽ không tìm được chuỗi "boyfriend".

![](https://images.viblo.asia/31cd7646-6062-4eb1-8556-1ed9043cfdb2.jpg)

- `\B` (viết HOA) cái này sẽ ngược lại với `\b`, `\B` sẽ tìm chuỗi có chứa 1 phần ký tự đứng trước nó. Ví dụ: boy\B sẽ tìm ra chuỗi "boyfriend" nhưng sẽ không tìm được chuỗi "boy friend".

![](https://images.viblo.asia/83d6022b-8997-472b-84e6-6fd076d9ac62.jpg)

- `\d` (viết thường) tìm ra chuỗi có 1 ký tự số (digit).

![](https://images.viblo.asia/8b9b5ab8-8198-4998-bb99-71300b6ae65e.jpg)

- `\D` (viết HOA) ngược lại với `\d`, tìm  ra chuỗi 1 ký tự không phải số (non-digit).

![](https://images.viblo.asia/b25211df-49ad-4695-9f89-5f7005029bfe.jpg)

- `\w` (viết thường) tìm chuỗi có chứa các ký tự là từ (word) bao gồm dấu _ (underscore) và chữ số.

![](https://images.viblo.asia/f9fd148b-2f4d-4dfc-bfbf-4aa77128714e.jpg)


- `\W` (viết HOA) ngược với `\w` tìm chuỗi có chứa các ký tự đặc biệt (trừ dấu `_`), không phải là từ. Ví dụ: \W sẽ khớp với ký tự % trong chuỗi "100%".

![](https://images.viblo.asia/4c592eb3-81a9-41cc-9808-0fe2418913c4.jpg)


- `\s` (viết thường) tìm chuỗi có chứa 1 khoảng trắng (tab = 4 space thì cũng được tính là 1 khoảng trắng)

![](https://images.viblo.asia/18593c27-d7a9-4088-8ffe-5d76019eb5c2.jpg)


- `\S` (viết HOA) tìm chuỗi có chứa 1 ký tự không phải là khoảng trắng (non-whitespace).

![](https://images.viblo.asia/ca53c7ef-1e31-4723-acf1-c5eba6ba6cde.jpg)


- `^x` dấu mũ khi không đặt trong [] sẽ tìm ra ký tự/chuỗi ký tự đứng đầu tiên trong 1 chuỗi. Ví dụ: `^a` sẽ tìm ra ký tự a đứng đầu trong chuỗi, tức là chuỗi "abc" thì tìm được nhưng chuỗi "bac". "bca" thì không,

![](https://images.viblo.asia/68f0c74e-0bad-4189-975c-eafbb16eb323.jpg)

- `x$` ngược với `^`, nó sẽ tìm ra ký tự/chuỗi ký tự đứng cuối trong 1 chuỗi. Ví dụ: `a$` sẽ tìm ra ký tự a đứng cuối trong chuỗi, tức là chuỗi "bca" thì tìm được nhưng chuỗi "bac". "abc" thì không,

![](https://images.viblo.asia/89618ef9-1473-4df6-9c55-bb0ac47880d0.jpg)


- `+` tìm ra chuỗi có chứa 1 hoặc nhiều ký tự liên tiếp. Ví dụ `a+` sẽ tìm được chuỗi có 1 chữ a hoặc nhiều chữ a liền nhau.

![](https://images.viblo.asia/20c64b0a-6e74-45c7-b3a0-1735b738cec1.jpg)


- `?` (thực sự là mình không biết phải giải thích bằng lời thế nào nên các bạn xem tạm ví dụ để hiểu nhé). Ví dụ; `abc?` sẽ tìm ra chuỗi "ab", "abc" nhưng lại không tìm ra chuỗi "abbbbb" hay "abcccccccc"

![](https://images.viblo.asia/d0f6ea18-b9a0-43ac-ade6-10fe363ac90c.jpg)


- `*` giống như `?` tuy nhiên ký tự cuối có thể xuất hiện nhiều lần. Ví dụ `abc*` sẽ tìm ra chuỗi có chứa "ab", "abc", "abccccccc" nhưng lại ko tìm được "a" hay "bc".

![](https://images.viblo.asia/01424416-bfdf-495b-adf6-3837a31c9a2f.jpg)

- `.` tìm thấy tất cả các ký tự đơn bất kỳ trừ ký tự ngắt dòng (line-break).

![](https://images.viblo.asia/0d29aed7-3063-4da0-85c9-ad1913e3f98f.jpg)


- `x{n}` tìm được chuỗi x lặp lại n lần (n > 0). Ví dụ `a{3}` sẽ tìm chuỗi có đúng 3 chữ a liền nhau.

![](https://images.viblo.asia/41fbb3fb-f5dc-4ac3-a367-09a7cb60b96a.jpg)


- `x{n,}` tìm được chuỗi x lặp lại ít nhất n lần (n > 0). Ví dụ `a{3,}`  sẽ tìm chuỗi có ít nhất 3 chữ a liền nhau.

![](https://images.viblo.asia/b10a770f-5612-4865-92a5-d25619e3eb43.jpg)


- `x{n,m}` tìm được chuỗi x lặp lại từ n đến m lần (0 < n < m). Ví dụ `a{3,5}`  sẽ tìm chuỗi có chứa từ 3 đến 5 chữ a liền nhau.

![](https://images.viblo.asia/73f45d59-c514-4cf8-9fac-b2ce53e683b2.jpg)


- `x|y` tìm chuỗi có chưa x hoặc y.

![](https://images.viblo.asia/fe332de7-d9f7-4238-94de-f2f91b7c8aae.jpg)


Trên đây là những cú pháp cơ bản giống như là bảng chữ cái khi học một ngoại ngữ vậy, để ghép thành từ bạn sẽ phải kết hợp các chữ cái với nhau. Thế nên là trong thực tế bạn sẽ phải kết hợp vài, hoặc nhiều cú pháp ở trên để có thể tìm được chuỗi mà bạn mong muốn. Nghe có vẻ khó rồi đúng không? Nhưng mà khó thì mới hấp dẫn chứ!
>Cái gì dễ dàng đạt được quá thì sẽ không biết trân trọng. 

<div align="center">
    
# Tổng kết
    
</div>

- Mong rằng sau bài viết này các bạn sẽ nắm được các cú pháp cơ bản của regex, bởi vì bài hôm nay chỉ mới là bài **VỠ LÒNG** thôi. Mình biết là mới đầu sẽ khá là khó nhưng chẳng có thành công nào có thể đạt được chỉ trong ngày một ngày hai cả, vì vậy đừng vội nản nhé, **`CẦN CÙ BÙ SIÊNG NĂNG`** mà :D :D :D :D 
 
<div align="center">
    
# Tài liệu tham khảo
    
</div>

- https://vi.wikipedia.org/wiki/Bi%E1%BB%83u_th%E1%BB%A9c_ch%C3%ADnh_quy
- https://regex101.com/ 
- https://regexr.com/
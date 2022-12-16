ERD là một trong các bản vẽ thường thấy trong lập trình. Các trường đại học đều dạy ERD trong các môn như database hay OOAD (phân tích thiết kế hệ thống OOP).

Có nhiều dạng ERD khác nhau, sử dụng các kí hiệu (notation) khác nhau. Thường người học sẽ không nắm rõ về những loại này, và chỉ vẽ theo kiểu "hiểu là được". Hai sai lầm thường thấy là đặt sai vị trí kí hiệu và mix các loại notation với nhau.

Bài viết này sẽ trình bày về 3 loại notation phổ biến nhất, giúp các bạn hiểu hơn về ERD và tránh được các sai lầm như trên.

# 1. Chen's notation

Chen's notation là notation đầu tiên được giới thiệu. Thường các giáo trình sẽ dùng loại notation này để dạy về ERD.

Notation này sử dụng các kí hiệu khá đơn giản:

- Hình chữ nhật cho thực thể
- Hình elip cho các thuộc tính
- Hình thoi cho các mối quan hệ
- ...

Các đường nối mỗi bên sẽ có kí hiệu đơn là 1 hoặc N.

![image.png](https://images.viblo.asia/81488138-3265-451b-a02a-c494301b4a64.png)

Tất nhiên còn các khái niệm khác như weak entity, mandatory/optional, total/partial participation,... Nhưng cơ bản nhất sẽ gồm các kí hiệu như trên hình.

Loại này ít được dùng trong thực tế, đơn giản vì vẽ khá tốn diện tích.

# 2. Min-max notation

Min-max notation sử dụng các kí hiệu giống với Chen's, nhưng khác ở cách đánh số. Cụ thể, mỗi bên mối liên kết sẽ dùng 2 số `(min, max)` để biểu thị số lượng thực thể. Nhờ chỉ định thêm số min, các loại liên kết mandatory/optional,... được lược bỏ.

![image.png](https://images.viblo.asia/cc7d52a7-5483-45ec-b957-59c992991956.png)

Sai lầm thường gặp với loại này là đặt sai vị trí cặp số `(min, max)`. Mình nhận ra điều này nhờ câu hỏi trên Dạy Nhau Học ở [đây](https://daynhauhoc.com/t/doc-so-do-thuc-the-sao-cho-dung/121663) và [đây](https://daynhauhoc.com/t/hoi-cach-giai-thich-er-model/123194).

Có một mẹo khá hay để nhớ trong trường hợp này.

> Min-max notation là loại ERD ngược đời nhất.
> 
> Các notation khác đọc từ `A`, nhảy qua số cạnh `B`, rồi đọc `B`.
> 
> Còn min-max notation thì ngược lại, đọc `A` và số bên cạnh `A` trước, sau đó mới đọc `B`.

Xem lại 2 hình vẽ ở trên, xét mối quan hệ `User` và `Pomo` thì:

- Min-max notation: một `User` có 0-N `Pomo`, một `Pomo` chỉ thuộc 1 `User`
- Các notation khác: một `User` có N `Pomo`, một `Pomo` chỉ thuộc 1 `User`

Nên tránh dùng notation này, vì ngoài nhược điểm tốn diện tích như của Chen's, nó còn bị vấn đề đặt số ngược đời nữa.

# 3. Crow's foot notation

Chen's notation chỉ sử dụng một số max để kí hiệu, và đặt số max ở phía bên thực thể bên kia. Do đó, rất dễ dàng chuyển số này thành dấu chân chim (crow's foot), đọc tiện hơn rất nhiều.

Loại notation là Crow's Foot, ngoài ra nó còn được gọi là Information Engineering (IE) notation.

Xem qua hình vẽ nhé (có vài điểm chưa đúng lắm). Crow's Foot notation gom các thuộc tính và thực thể thành dạng bảng, không dùng hình thoi biểu diễn mối liên kết, và thay các con số bằng kí hiệu chân chim.

![image.png](https://images.viblo.asia/7169aa8a-c7b0-4f84-8182-2514f2a84808.png)

Một điểm nữa về crow's foot notation là nó cho phép chỉ định cả min, max ngay trong dấu chân chim. Ví dụ vòng tròn là số 0, một gạch là số 1, chân chim là N, cứ thế mà kết hợp lại tùy thích.

Theo vài nguồn tin thì loại notation này được dùng phổ biến nhất. Cũng dễ hiểu thôi do nó khá gọn và đơn giản hơn so với các loại khác. Mình cũng thích 😂

---

Các nguồn tham khảo kiến thức cho bài viết.

https://medium.com/@ericgcc/dont-get-wrong-explained-guide-to-choosing-a-database-design-notation-for-erd-in-a-while-7747925a7531
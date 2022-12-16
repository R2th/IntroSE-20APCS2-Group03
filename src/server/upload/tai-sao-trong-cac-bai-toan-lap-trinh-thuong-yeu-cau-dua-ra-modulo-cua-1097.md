Nếu bạn là người yêu thích _competitive programming_ thì có lẽ bạn sẽ không lạ gì với con số này, nó xuất hiện thường xuyên trong các cuộc thi. Đến nỗi, bạn coi nó như một mặc định mà chẳng hề đề ý.

Cho đến một ngày mình bắt gặp câu hỏi tại sao lại chọn con số $10^9+7$ này để tính modulo, mình ngớ người và vội vàng đi tìm đáp án.

Đó thực sự là một con số đặc biệt: 1000000007, nó là một **số nguyên tố**. Nhưng đó chưa phải là tất cả, mình sẽ giải thích tại sao người ta lại dùng modulo và tại sao lại dùng số nguyên tố.

## Lý do

Có 2 lý do cơ bản cho việc sử dụng modulo $10^9+7$ :
1. Để tránh các tính toán bị overflow.
2. Để việc tính toán trở nên đơn giản hơn.

## 1. Để tránh việc tính toán bị overflow

Kiểu dữ liệu lớn nhất trong **C/C++** là *unsigned long long*, có độ lớn 64 bit, tức là nó biểu diễn được các con số từ 0 cho tới $2^{64} - 1$. 

Nhưng trong nhiều bài toán ta cần phải tính toán các kết quả lớn hơn rất nhiều con số này, do đó ta cần làm nhỏ việc tính toán đi cho phù hợp với kiểu dữ liệu của chúng ta, đó chính là lý do của việc sử dụng phép tính modulo.

Điều này giúp chúng ta có thể tập trung toàn bộ vào việc thiết kế và tìm kiếm thuật toán, thay vì loanh quanh implement các phép toán đối với số lớn.

Và 1000000007 là một số **đủ lớn** để sau khi tính modulo, phép toán vừa trở nên đơn giản lại không bị tràn số. Cụ thể:

- Phép cộng: $(A+B)\bmod m = A\bmod m + B\bmod m$
- Phép trừ: $(A-B)\bmod m = (A\bmod m - B\bmod m + m)\bmod m$
- Phép nhân: $(A*B)\bmod m = (A\bmod m * B\bmod m)\bmod m$. 

Chú ý một điều là $(10^9+7)^2$ vừa đủ 63 bits, nghĩa là phù hợp với kiểu dữ liệu _long long_, vì thế ta hoàn toàn có thể nhân mà không lo tràn số.

- Phép chia: Tại đây nảy sinh vấn đề, đó là lý do tại sao người ta chọn số nguyên tố, ta sẽ nói rõ hơn ở bên dưới
- Phép luỹ thừa:
  $(A^B)\bmod m=(A^{B\bmod (m-1)})\bmod m$

## 2. Để việc tính toán trở nên đơn giản hơn

>  $10^9+7$ là một số nguyên tố.

Rất nhiều phép toán trở nên đơn giản hơn khi làm việc với số nguyên tố.

Với phép chia, ta phải chú ý một điều là:

$\frac{A}{B}\bmod m~~~~~ \not = ~~~~~\frac{A\bmod m}{B\bmod m}\bmod m$

biểu thức đúng phải là:

$\frac{A}{B}\bmod m = (A\bmod m \times inv(B)\bmod m + m)\bmod m$

trong đó $inv(B)$ là nghịch đảo theo modulo m của B. 

Ta lưu ý ở đây là **nghịch đảo theo modulo** ([modular multiplicative inverse](https://en.wikipedia.org/wiki/Modular_multiplicative_inverse)), chứ không phải nghịch đảo đơn thuần trong tính toán thập phân là $\frac{1}{B}$. 

Nếu trong tính toán thập phân $B\times \frac{1}{B} = 1$ thì theo modulo $B \times inv(B) \equiv 1 \bmod m$.

Ví dụ nghịch đảo của 2 trong tính toán thập phân là $\frac{1}{2}$ vì $2\times \frac{1}{2} = 1$. Nhưng nghịch đảo theo modulo 5 của 2 sẽ là 3 vì $2 \times 3 = 6 \equiv 1 \bmod 5$. Vậy $inv(2) = 3 \bmod 5$.

Đây là phần kiến thức khá quan trọng, và được sử dụng rất nhiều trong mã hoá, các bạn có thể tự tìm hiểu thêm theo link trên.

Vậy làm thế nào để tính $inv(B)\bmod m$ ? Đây chính là lúc số nguyên tố thể hiện vai trò. 

Theo [định lý nhỏ Fermat](https://vi.wikipedia.org/wiki/%C4%90%E1%BB%8Bnh_l%C3%BD_nh%E1%BB%8F_Fermat), nếu $m$ là một số nguyên tố và $B$ không chia hết cho $m$ thì ta có:

$B^{m-1} \equiv 1 \bmod m$

$\Leftrightarrow	B \times B^{m-2} \equiv 1 \bmod m$

$\Leftrightarrow	inv(B) = B^{m-2} \bmod m$

Bằng phép biến đổi này ta đã chuyển modulo của phép chia trở về modulo của phép nhân và có thể tính toán một cách đơn giản.

## Kết luận

Tóm lại, con số $10^9+7$ hay 1000000007 là một con số đặc biệt, nó đủ lớn, và nhằm mục đích đơn giản tính toán trong các bài toán lập trình. 

Theo những gì đã chứng minh bên trên thì các số nguyên tố đủ lớn trong phạm vi $2^{30}$ đều có thể thoả mãn, nhưng có lẽ $10^9+7$ là một số có cách viết "thuận mắt" và đẹp đẽ nhất.

## Tham khảo

- [What exactly is "print it modulo 10^9 + 7" in competitive programming web sites?](https://www.quora.com/What-exactly-is-print-it-modulo-10-9-+-7-in-competitive-programming-web-sites)
- [How do I output modulo 10^9 + 7 in competitive programming?](https://www.quora.com/How-do-I-output-modulo-10-9-+-7-in-competitive-programming)
- [Modulo 10^9+7 (1000000007)](https://www.geeksforgeeks.org/modulo-1097-1000000007/)
Gần đây, mình có đọc lại được bài toán này, chắc hẳn nhiều bạn cũng đã từng biết qua về bài toán này rồi ( nếu không thì để mình giới thiệu ). Bài toán như sau:
> Ở 1 tòa nhà 100 tầng, coi như các quả trứng là như nhau: <br>
> - Trứng sẽ vỡ nếu bị thả từ tầng >= N.<br>
> - Trứng không vỡ nếu bị thả từ tầng < N.<br>
>
> Bạn có 2 quả trứng, hãy nêu 1 cách giải để tìm N với số lần thả trứng ít nhất.
>
<br><br>
![](https://images.viblo.asia/360543d1-1f86-45df-9e22-6adb329016e6.jpg)
<br><br>

Để giải bài toán này, ta có thể dùng quả trứng 1 thả với mỗi x tầng ví dụ x=10 tầng. Quả trứng 1 sẽ đóng vai trò thu hẹp khoảng cần tìm vào trong 10 tầng, sau đó dùng quả trúng 2 để tìm tầng thỏa mãn trong 10 tầng đó. Ví dụ nếu tầng cần tìm là 93, quả trứng 1 sẽ được thả lần lượt các tầng 10, 20, 30, 40, 50, 60, 70, 80, 90 và vỡ ở tầng 100. Sau đó ta biết N cần tìm trong khoảng 90-100 và dùng quả trứng 2 để tìm, cần 3 lần thả nữa 91, 92, 93 là trứng vỡ, suy ra N = 93.<br><br>
Đây là 1 cách giải tốt, nếu 1 < N < 10, ta chỉ cần 2-10 lần thả trứng. Nhưng nếu 81<N<90, t cần đến 18 lần thả. Vậy cần chia khoảng để thả quả trứng 1 là bao nhiêu để tối ưu ?. Hãy nhớ rằng chúng ta tìm cách giải với số lần thả nhỏ nhất, chứ không phải tìm số lần cần thả trung bình.<br><br>
Ta thấy số_lần_thả_trứng_ít_nhất sẽ tăng tỉ lệ thuận với tầng. Nếu quả trứng 1 vỡ ở tầng x thì ta cần nhiều nhất 9 lần thả quả trứng 2. Cho nên, thay vì việc thả trứng 1 mỗi 10 tầng, ta sẽ điều chỉnh khoảng cách đó, sao cho nó lớn ở những tầng dưới và nhỏ dần ở những tầng trên. Qua đó ta giảm số lần phải thả trong trường hợp xấu nhất, khi đó số lần tối đa phải thả quả trứng 2 sẽ **giảm cùng tốc độ** với tốc độ tăng của số lần (tương đương với độ cao) phải thả quả trứng 1.

| Số lần thả trứng 1 |Khoảng cách giữa 2 tầng|
| -------- | -------- |
| # 1  | x     |
| # 2  | x-1     |
| # 3  | x-2     |
| # 4  | x-3     |
| # 5  | x-4     |
| # ...  | ...    |

Suy ra: (x + 1) * x / 2 >= 100. <br>
x ≥ 13.65097. làm tròn đến giá trị đầu tiên để tổng >= 100. => x = 14.

Vậy ta bắt đầu từ tầng 14. Cần tối đa 14 lần thả. Độ phức tạp O($\sqrt{n}$)<br>
Với n nhỏ, 2 cách trên gần như tương đương.
| Số lần thả trứng 1 | Tầng |
| -------- | -------- |
| 1     | 14     |
| 2     | 27     |
| 3     | 39     |
| 4     | 50     |
| 5     | 60     |
| 6     | 69     |
| 7     | 77     |
| 8     | 84     |
| 9     | 90     |
| 10   | 95     |
| 12 | 99     |
| 12 | 100     |

Tham khảo: https://ed.ted.com/lessons/can-you-solve-the-egg-drop-riddle-yossi-elran

**Thực tế :** chúng ta chỉ cần 2 lần thả ở tầng 1 là tìm được kết quả. :sunglasses:
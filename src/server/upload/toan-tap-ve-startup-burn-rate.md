Hôm nay mình chia sẻ cho mọi người 1 số kiến thức cơ bản về startup, đặc biệt là 1 số thuật ngữ cơ bản về nguồn tiền trong startup, các từ ngữ hay dùng giữa nhà đầu tư và nhà khởi nghiệp.
Khi nào thì cần thêm vốn đầu tư...

Mình sẽ cố gắng chia sẻ theo nhiều bài nhỏ. Ai đọc cũng có thể hiểu được.

1. [Burn Rate](https://nghethuatcoding.com/2020/05/09/toan-tap-ve-startup-burnrate)
2. Lợi nhuận (Revenue & MRR & SaaS Quick Ratio) 
3. Lợi nhuận và tỉ lệ lợi nhuận (Profit & Margin) 
4. Churn Rate 
5. Unit Economics (CAC & LTV) 
6. Tỉ lệ tăng trưởng (MoM & CMGR) 
7. Tổng hợp 

Đầu tiên mình sẽ đi vào phần đầu tiên là Burn Rate nhé.

## Burn Rate là gì?

Burn Rate là 1 chỉ số về số tiền mà bạn đã chi tiêu trong tháng. Hay nói cách khác nó còn gọi là tỉ lệ đốt tiền hàng tháng.

Burn Rate có 2 loại. Là Gross Burn Rate và Net Burn Rate. 
- Gross Burn Rate: Số tiền thực tế đã chi tiêu trong 1 tháng (ví dụ tiền trả lương nhân viên, tiền thuê server ...)
- Net Burn Rate: Số tiền 1 tháng nhận được sau khi đã trừ đi doanh thu của tháng đó

![](https://images.viblo.asia/e4d5917b-a4ad-49a9-996a-71a0e3b31e19.png)

Thông thường khi mà nói đến Burn Rate tức là nói đến Net Burn Rate nhé. Công thức tính Net Burn Rate sẽ được tính như sau:

```objectivec
Net Burn Rate = Gross Burn Rate - Revenue (doanh thu 1 tháng)
```

Ví dụ:  
Tổng số tiền chi trong 1 tháng hết 1000\$. Số tiền doanh thu kiếm được tháng đó được 200\$.  
-> Vậy Net Burn Rate = 1000 - 200 = 800\$

## Burn Rate với huy động vốn có liên quan gì?

Burn Rate với huy động vốn có liên quan như bảng dưới đây.

![](https://images.viblo.asia/7ac04f3d-aad5-4c7f-9871-41ace377c29f.png)

Đại đa số với giai đoạn đầu của startup thì tỉ lệ Burn Rate đều khá cao (vì hầu như chưa có doanh thu).

Khoản phải chi lớn hơn rất nhiều so với khoản thu được nên dẫn đến tiền vốn cũng càng ngày càng ít đi.
Sau khi gần hết tiền thì việc huy động vốn là vô cùng quan trọng.

Giai đoạn tiếp theo sau khi bắt đầu có doanh thu thì lúc này Burn Rate dần dần tiến đến 0. Và khi có lợi nhuận thì Burn Rate < 0

Mặc dù đã có lãi nhưng để tăng trưởng nhanh hơn nữa thì nhiều công ty startup vẫn tiếp tục huy động vốn.

Sau khi đã nắm bắt được tỉ lệ Burn Rate thì từ đó có thể biết được công ty của chúng ta sẽ kéo dài được bao nhiêu tháng. Công thức đơn giản sẽ như sau:

```sql
Số tháng có thể kéo dài = Tiền còn lại trong tài khoản ngân hàng / Net Burn Rate
```

## Burn Rate với doanh thu hàng tháng

Burn Rate và doanh thu có quan hệ như sau:

![](https://images.viblo.asia/9f0bad26-8716-4068-a2c7-c9a69db5dd83.png)


Từ bảng trên ta có thể thấy được, doanh thu càng lớn thì tỉ lệ Burn Rate càng ngày càng thấp đi. Và khi nào có lãi thì tỉ lệ Burn Rate sẽ nhỏ hơn 0.

Về cơ bản các công ty startup đều nhắm đến sự tăng trưởng nhanh. Trong khi doanh thu không cao, càng ngày càng thâm hụt.
Và khi này tỉ lệ Burn Rate được gọi là Default Dead (mặc định chết).

Chính vì vậy, chúng ta cần nắm bắt rõ bản thân chúng ta đang ở giai đoạn nào? "Default Dead" (Mặc định là chết) hay "Default Alive" (mặc định là sống).
Và cần phải nhanh chóng đưa bản thân mình đến trạng thái "Default Alive" càng sớm càng tốt.

![](https://images.viblo.asia/7caf97b4-57a5-491f-a72d-31bd636c5dc9.png)

## Làm thế nào để giảm Burn Rate xuống?

Trong phần lớn startup thì chi phí nhân sự (tiền lương cho nhân viên) đang chiếm phần lớn Burn Rate. Do đó để giảm được Burn Rate thì đơn giản nhất là cần giảm chi phí này xuống mức có thể.
Cần tối ưu hoá tài nguyên con ngừời trong công ty, không nên tuyển dụng quá nhiều. Hoặc có thể thuê tài nguyên bên ngoài để giảm chi phí.

Giám đốc của Y Combinator đã cảnh báo rằng, đa số nhà sáng lập trẻ thường có xu hướng tuyển thêm rất nhiều người. Bởi vì như thế mới giống 1 công ty.
Nên mọi người hãy chú ý nhé. Biết tận dụng tốt tài nguyên trong công ty là điều vô cùng quan trọng.

## Tuy nhiên tỉ lệ Burn Rate cao không có nghĩa là xấu

Bản thân việc Burn Rate cao thì không phải là xấu. Nhưng vấn đề ở đây là: 
- Tiền vốn không còn nhưng mà Burn Rate thì vẫn cao
- Burn Rate cao nhưng mà vẫn không đạt được milestone đã đề ra

Đặc biệt là trường hợp thứ 2. Vì nếu trường hợp này xảy ra thì việc huy động vốn lần tiếp theo vô cùng khó, hoặc có thể sẽ mất khá nhiều thời gian mới kêu gọi vốn được.

Tuy nhiên nếu mà quá để ý đến Burn Rate thì có khả năng sẽ làm tốc độ phát triển của dự án giảm xuống. Nên hãy cân bằng nó cho tốt nhé.


==============

Để nhận thông báo khi có bài viết mới nhất thì các bạn có thể like fanpage của mình ở bên dưới nhé:

→→→ [Nghệ thuật Coding Fanpage Facebook](https://www.facebook.com/669339543503374)
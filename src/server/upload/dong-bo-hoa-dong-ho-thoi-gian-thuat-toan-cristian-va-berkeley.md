## 1. Vấn đề đồng bộ hóa đồng hồ
Trong hệ phân tán mỗi máy tính là một đồng hồ riêng biệt, nên việc đồng bộ các đồng hồ này rất cần thiết và rất khó khăn. Hôm nay mình sẽ giới thiệu đến các bạn hai giải thuật dùng để giải quyết vấn đề đồng bộ hóa đồng hồ trong các hệ phân tán.
## 2. Các giải thuật đồng bộ
### a. Giải thuật Cristian
Thuật toán của Cristian (được giới thiệu bởi Flaviu Cristian năm 1989)  là một phương pháp đồng bộ hóa đồng hồ có thể được sử dụng trong nhiều lĩnh vực khoa học máy tính phân tán nhưng chủ yếu được sử dụng trong các mạng nội bộ có độ trễ thấp. Cristian hoạt động giữa một Client và một máy chủ thời gian(Time Server) - được kết nối với một nguồn của UTC (Coordinated Universal Time).

**Ý tưởng thuật toán:**

-	Client và Server đều có đồng hồ riêng của mình
-	Xác định một máy chủ có nguồn thời gian chính xác(UTC). 
-	Các Client đang có thời gian không chính xác sẽ liên hệ với máy chủ để đồng bộ thời gian theo thời gian của máy chủ.
    Chúng ta hãy cùng quan sát hình dưới đây để hiểu rõ hơn về thuật toán này nhé.
    ![](https://images.viblo.asia/c60e0d5a-734b-4e1f-98cf-2fbe24a905c6.png)
 
-	Client Cli gửi yêu cầu đến Time Server Ser, tại lúc gửi yêu cầu thời gian đánh dấu đồng hồ cục bộ của nó là T1.
-	Server  nhận được yêu cầu đồng bộ của Client tại thời điểm T2, và Server sẽ ghi lại thời điểm nhận là T2 theo đồng hồ của nó.
-	Đến thời điểm T3 theo đồng hồ của Server, nó sẽ gửi cho Client nhãn thời gian là T3 để Client đặt lại thời gian là T3 và sẽ giử kèm theo cả T1 và T2.
-	Nhưng do độ trễ mạng khi trả lời nên đến thời điểm T4 tính theo đồng hồ của Client thì nó mới nhận được phản hồi của Server.
    + dTreq là độ trễ mạng mạng khi gửi yêu cầu (request) gửi đi.
	+ dTres là độ trễ mạng mạng khi truyền tải phản hồi (respond).
-   Bây giờ Client sẽ có thông tin cả T1, T2, T3 và T4.

**Giả sử rằng** độ trễ truyền từ Client → Server và Server-> Client giống nhau ta sẽ có.

Ban đầu Server đồng hồ Server chạy chuẩn còn đồng hồ Client chạy sai nên ta giả sử độ lệnh thời gian giữa Client và Server là θ giá trị này có thể âm hoặc dương (Nếu θ> 0  đồng hồ Client chậm hơn Sever θ giây; nếu θ< 0 đồng hồ Client nhanh hơn Sever θ giây ). 
Theo giải thuật ta có công thức sau.

```
θ = T3 + dTres – T4
  = T3 + ((T2-T1)+(T4-T3))/2 – T4
  = ((T2-T1)+(T3-T4))/2
```

Và sau đó đồng hồ Client sẽ cập nhật lại dựa vào giá trị θ vừa tính được.

Mình giải thích công thức trên nhé, chắc các bạn đang thắc mắc vì sao dTres lại được thay bằng ((T2-T1)+(T4-T3))/2 phải không. 
Theo giải thuật ta có được hai biểu thức sau:

```
T2 = T1 + θ + dTreq
T4 = T3 - θ  + dTres
```

Cộng vế theo vế của 2 biểu thức trên kết hợp với điều giả sử  dTreq = dTres.

Ta rút ra được dTres = ((T2-T1) + (T4-T3))/2

Hãy lấy một ví dụ cụ thể để minh họa:

Vd: Client gửi yêu cầu đồng bộ lúc 7h (T1= 7h), Server nhận được Request của Client lúc 7h8’ (T2 = 7h8’) và nó gửi reply về cho Client lúc 7h10’ (T3 = 7h10’). Client nhận được phản hồi lúc 7h8’ (T4 = 7h8’) Theo giải thuật Critian có.

```
θ = T3 + dTres – T4 = ((T2 - T1)+(T3 - T4))/2
  =(7h8’- 7h + 7h10’ -7h8’)/2 
  = 10’/2 = 5’
```
Và ta cũng tính được 
```
dTres = dTreq = θ  +T4 – T3 
      = 5’+7h8’ - 7h10’ 
      = 3’
```

Bước cuối cùng là Client sẽ đặt lại thời gian của mình
- Nếu θ> 0 thì thời gian Client sẽ được tăng θ giây. 
- Nếu θ <0 thì thời gian Client sẽ được giảm đi θ giây.
Với θ = 5 > 0 => đồng hồ của Client chậm hơn Server 5’.
Tức là sau khi nhận phản hồi từ Server thì Client sẽ đặt đồng hồ của mình là 7h13'.

**More:** Với dạng bài tập chỉ cho chúng ta Tserver(thời gian trung bình lúc Server nhận được request là respond cho Client) và cho T1, T4 tức là thời gian lúc Client gửi và Nhận theo đồng hồ của Client thì chúng ta sẽ không đi tính độ lệch thời gian giữa hai đồng hồ mà chúng ta sẽ áp dụng công thức sau để tính ra luôn được thời gian mà Client sẽ đặt lại đồng hồ của nó sau khi nhận respond từ Server.
   
   ```
   Tnew = Tserver + (T4 - T1)/2
   ```

Áp dụng với bài toán trên ta cũng tính được
   ```
   Tnew = Tserver + (T4 - T1)/2 
        = (7h8' + 7h10')/2 + (7h8' - 7h)/2 =7h13'   
   ```
Tức là sau khi nhận respond từ Server thì Client sẽ đặt đồng hồ của mình là 7h13'

**Note:**
1. Về sự chậm trễ truyền gói tin
    - Thuật toán của Cristian giả định rằng thời gian khứ hồi cho các tin nhắn được trao đổi qua mạng là hợp lý ngắn
    - Thuật toán giả định rằng độ trễ cho yêu cầu và phản hồi bằng nhau
2. Máy chủ thời gian bị lỗi hoặc đồng hồ máy chủ bị lỗi
    - Đồng hồ bị lỗi trên máy chủ thời gian dẫn đến các đồng hồ không chính xác trong toàn bộ DS
3. Đồng bộ thời gian
    -	Thay vì thay đổi thời gian đáng kể bằng θ giây, thường là thời gian được đồng bộ hóa dần dần
    -	Đồng hồ được cập nhật với tốc độ thấp hơn / lớn hơn bất cứ khi nào mà bộ định giờ bị gián đoạn


### b. Berkeley Algorithm
Thuật toán Berkeley là một phương pháp đồng bộ hóa đồng hồ trong tính toán phân tán mà không chịu bất cứ máy có nguồn thời gian chính xác nào. Nó được phát triển bởi Gusella và Zatti tại Đại học California, Berkeley vào năm 1989. Giống như thuật toán của Cristian , nó được thiết kế để sử dụng trong mạng nội bộ .
**Hướng tiếp cận:**
1. Một máy chủ thời gian Server sẽ gửi thời gian của nó đến tất cả các máy tính để thăm dò sự khác biệt thời gian
2. Các máy tính tính toán độ chênh lệch với thời gian mà máy chủ gửi tới và sau đó trả lời lại máy chủ
3. Máy chủ tính toán chênh lệch thời gian trung bình cho mỗi máy tính
4. Máy chủ gửi báo tất cả các máy tính khác nhật thời gian của họ (bằng cách đồng bộ hóa dần dần thời gian)

      ![](https://images.viblo.asia/ef88be08-f251-49d2-8db4-8a09e52ab8b3.png)
                  

Mình sẽ giải thích hình trên để các bạn có thể hiểu rõ hơn nhé:
Nhìn hình trên ta có thể thấy ban đầu giả sử có 3 đồng hồ T1,T2,T3. Trong đó T1 là đồng hồ Server đang là 3h00 các đồng hồ còn lại là của Clientvới T2 =2h50, T3= 3h25.
-	Server sẽ gửi đồng hồ của mình cho các Client
-	T2 và T3 tính toán độ lệch thời gian và gửi về cho Server lần lượt là:
	
    `
     T1’=-10’ và T2’= + 25’
    `

-	Server sẽ tính trung bình:
 
	`
    T = (0 + T1’ + T2’)/3 = (0 - 10 + 25)/3 = 5’
    `
    
-	Sau đó Server sẽ đặt thời gian của mình là:

	`
    Tnew =  3h + 5’
    `
 
Và báo cho các máy Client T2 (+15') và T3 (-20')

**Note:**
1. Về sự chậm trễ truyền gói tin: Thuật toán của Berkeley dự đoán độ trễ mạng (tương tự như thuật toán của Cristian).
    Do đó, nó có hiệu quả trong mạng nội bộ và không chính xác trong các mạng diện rộng
2. Lỗi máy chủ thời gian có thể được ẩn đi (che dấu): Nếu máy chủ thời gian lỗi, một máy tính khác có thể được chọn làm máy chủ thời gian

## 3. Kết luận
Vậy là trên đây mình đã trình bày cho bạn hai thuật toán về đồng bộ hóa đồng hồ thời gian trong hệ phân tán.
Mình có dùng một số nguồn tham khảo như cuốn sách huyền thoại về Hệ phân tán đó là cuốn **Distributed systems principles and paradigms** của **Andrew S.Tanenbaum** và bên cạnh đó là Slide bài giảng **Distributed System** của ĐHBK Hà Nội.
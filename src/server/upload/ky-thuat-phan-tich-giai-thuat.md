Trong bài viết này chúng ta sẽ nghiên cứu những vấn đề sau:
* *Sự cần thiết phải phân tích các giải thuật*
* *Thời gian thực hiện chương trình*
* *Tỷ suất tăng và độ phức tạp của giải thuật*
* *Tính thời gian thực hiện chương trình*

## 1. Sự cần thiết phải phân tích các giải thuật

Trong khi giải một bài toán chúng ta có thể có một số giải thuật khác nhau, vấn đề là cần phải đánh giá các giải thuật đó để lựa chọn một giải thuật tốt nhất. Thông thường thì ta sẽ căn cứ vào các tiêu chuẩn sau:

1. Giải thuật đúng đắn
1. Giải thuật đơn giản
1. Giải thuật thực hiện nhanh

Với yêu cầu (1), để kiểm tra tính đúng đắn của giải thuật chúng ta có thể cài đặt giải thuật đó và cho thực hiện trên máy với một số bộ dữ liệu mẫu rồi lấy kết quả thu được so sánh với kết quả đã biết. Thực ra thì cách làm này không chắc chắn bởi vì có thể giải thuật đúng với tất cả các bộ dữ liệu chúng ta đã thử nhưng lại sai với một bộ dữ liệu nào đó. Vả lại cách làm này chỉ phát hiện ra giải thuật sai chứ chưa chứng minh được là nó đúng. Tính đúng đắn của giải thuật cần phải được chứng minh bằng toán học. Tất nhiên điều này không đơn giản và do vậy chúng ta sẽ không đề cập đến ở đây.


Khi chúng ta viết một chương trình để sử dụng một vài lần thì yêu cầu (2) là quan trọng nhất. Chúng ta cần một giải thuật dễ viết chương trình để nhanh chóng có được kết quả , thời gian thực hiện chương trình không được đề cao vì dù sao thì chương trình đó cũng chỉ sử dụng một vài lần


Tuy nhiên khi một chương trình được sử dụng nhiều lần thì thì yêu cầu tiếït kiệm thời gian thực hiện chương trình lại rất quan trọng đặc biệt đối với những chương trình mà khi thực hiện cần dữ liệu nhập lớn do đó yêu cầu (3) sẽ được xem xét một cách kỹ càng. Ta gọi nó là hiệu quả thời gian thực hiện của giải thuật.


## 2. Thời gian thực hiện của giải thuật
Thời gian thực hiện của giải thuật được xem xét ở các khía cạnh sau:
* Thời gian thực hiện chương trình
* Đơn vị đo thời gian thực hiện
* Thời gian thực hiện trong trường hợp xấu nhất

Một phương pháp để xác định hiệu quả thời gian thực hiện của một giải thuật là lập trình nó và đo lường thời gian thực hiện của hoạt động trên một máy tính xác định đối với tập hợp được chọn lọc các dữ liệu vào.

Thời gian thực hiện không chỉ phụ thuộc vào giải thuật mà còn phụ thuộc váo tập các chỉ thị của máy tính, chất lượng của máy tính và kỹ xảo của người lập trình. Sự thi hành cũng có thể điều chỉnh để thực hiện tốt trên tập đặc biệt các dữ liệu vào được chọn. Để vượt qua các trở ngại này, các nhà khoa học máy tính đã chấp nhận tính phức tạp của thới gian được tiếp cận như một sự đo lường cơ bản sự thực thi của giải thuật. Thuật ngữ tính hiệu quả sẽ đề cập đến sự đo lường này và đặc biệt đối với sự phức tạp thời gian trong trường hợp xấu nhất.

### 2.1 Thời gian thực hiện chương trình

Thời gian thực hiện một chương trình là một hàm của kích thước dữ liệu vào, ký hiệu $T(n)$ trong đó $n$ là kích thước (độ lớn) của dữ liệu vào.

> **Ví dụ:** Chương trình tính tổng của $n$ số có thời gian thực hiện là **$T(n) = cn$** trong đó **$c$** là một hằng số.

### 2.2 Đơn vị đo thời gian thực hiện

 Đơn vị của $T(n)$ không phải là đơn vị đo thời gian bình thường như giờ, phút giây... mà thường được xác định bởi số các lệnh được thực hiện trong một máy tính lý tưởng.
 
>   **Ví dụ:** Khi ta nói thời gian thực hiện của một chương trình là **$T(n) = cn$** thì có nghĩa là chương trình ấy cần **$cn$** chỉ thị thực thi.

### 2.3 Thời gian thực hiện trong trường hợp xấu nhất
Nói chung thì thời gian thực hiện chương trình không chỉ phụ thuộc vào kích thước mà còn phụ thuộc vào tính chất của dữ liệu vào. Nghĩa là dữ liệu vào có cùng kích thước nhưng thời gian thực hiện chương trình có thể khác nhau. Chẳng hạn chương trình sắp xếp dãy số nguyên tăng dần, khi ta cho vào dãy có thứ tự thì thời gian thực hiện khác với khi ta cho vào dãy chưa có thứ tự, hoặc khi ta cho vào một dãy đã có thứ tự tăng thì thời gian thực hiện cũng khác so với khi ta cho vào một dãy đã có thứ tự giảm.

Vì vậy thường ta coi $T(n)$ là thời gian thực hiện chương trình trong trường hợp xấu nhất trên dữ liệu vào có kích thưóc $n$, tức là: $T(n)$ là thời gian lớn nhất để thực hiện chương trình đối với mọi dữ liệu vào có cùng kích thước $n$.

## 3. Tỷ suất tăng và độ phức tạp của giải thuật
### 3.1 Tỷ suất tăng
Ta nói rằng hàm không âm **$T(n)$** có tỷ suất tăng **$(growth rate)$** **$f(n)$** nếu tồn tại các hằng số **$c$** và **$n_0$** sao cho $T(n) ≤ f(n)$ với mọi $n ≥ n_0$. 

*Ta có thể chứng minh được rằng “Cho một hàm không âm $T(n)$ bất kỳ, ta luôn tìm được tỷ suất tăng $f(n)$ của nó”.*

> **Ví dụ:**  Giả sử $T(0) = 1$ , $T(1) = 4$ và tổng quát $T(n) = (n+1)^2$. Đặt $n_0 = 1$ và $c = 4$ thì với mọi $n ≥ 1$ chúng ta dễ dàng chứng minh rằng $T(n) = (n+1)^2 ≤ 4n^2$ với mọi $n ≥ 1$, tức là tỷ suất tăng của $T(n)$ là $n^2$.

### 3.2 Khái niệm độ phức tạp của giải thuật

Giả sử ta có hai giải thuật $P_1$ và $P_2$ với thời gian thực hiện tương ứng là $T_1(n) = 100n^2$ (với tỷ suất tăng là $n^2$) và $T_2(n) = 5n^3$ (với tỷ suất tăng là $n^3$). 

Giải thuật nào sẽ thực hiện nhanh hơn? 

Câu trả lời phụ thuộc vào kích thước dữ liệu vào. Với $n < 20$ thì $P_2$ sẽ nhanh hơn $P_1$ $(T_2<T_1)$, do hệ số của 5$n^3$ nhỏ hơn hệ số của 100$n^2$ $(5<100)$. Nhưng khi $n > 20$ thì ngươc lại do số mũ của 100$n^2$ nhỏ hơn số mũ của 5$n^3$ $(2<3)$. Ở đây chúng ta chỉ nên quan tâm đến trường hợp $n>20$ vì khi $n<20$ thì thời gian thực hiện của cả $P_1$ và $P_2$ đều không lớn và sự khác biệt giữa $T_1$ và $T_2$ là không đáng kể..

Như vậy một cách hợp lý là ta xét tỷ suất tăng của hàm thời gian thực hiện chương trình thay vì xét chính bản thân thời gian thực hiện

Cho một hàm $T(n)$, $T(n)$ gọi là có độ phức tạp $f(n)$ nếu tồn tại các hằng $c$, $N_0$ sao cho $T(n) ≤ cf(n)$ với mọi $n ≥ N_0$ ( tức là $T(n)$ có tỷ suất tăng là $f(n)$ ) và kí hiệu $T(n)$ là $O(f(n))$ (đọc là “ô của $f(n)$”)

**Nói cách khác độ phức tạp tính toán của giải thuật là một hàm chặn trên của hàm thời gian**. Vì hằng nhân tử $c$ trong hàm chặn trên không có ý nghĩa nên ta có thể bỏ qua vì vậy hàm thể hiện độ phức tạp có các dạng thường gặp sau: **$log2n$, $n$, $nlog2n$, $n^2$, $n^3$, $n!$, $n^n$**. 

Ba hàm cuối cùng ta gọi là dạng hàm mũ, các hàm khác gọi là hàm đa thức. Một giải thuật mà thời gian thực hiện có độ phức tạp là một hàm đa thức thì chấp nhận được, tức là có thể cài đặt để thực hiện, còn các giải thuật có độ phức tạp hàm mũ thì phải tìm cách cải tiến giải thuật. 


Khi nói đến độ phức tạp của giải thuật là ta muốn nói đến hiệu quả của thời gian thực hiện của chương trình nên ta có thể xem việc xác định thời gian thực hiên của chương trình chính là **xác định độ phức tạp của giải thuật**.

## 4. Cách tính độ phức tạp của thuật toán

Cách tính độ phức tạp của một giải thuật bất kỳ là một vấn đề không đơn giản. Tuy nhiên ta có thể tuân theo một số nguyên tắc sau:

### 4.1 Qui tắc cộng

Nếu $T_1(n)$ và $T_2(n)$ là thời gian thực hiện của hai đoạn chương trình $P_1$ và $P_2$; và $T_1(n)=O(f(n))$, $T_2(n)=O(g(n)$ thì thời gian thực hiện của đoạn hai chương trình đó nối tiếp nhau là $T(n)=O(max(f(n),g(n)))$

> **Ví dụ:** Lệnh gán $x:=15$ tốn một hằng thời gian hay $O(1)$, Lệnh đọc dữ liệu $READ(x)$ tốn một hằng thời gian hay $O(1)$, Vậy thời gian thực hiện cả hai lệnh trên nối tiếp nhau là $O(max(1,1))=O(1)$

### 4.2 Qui tắc nhân

Nếu $T_1(n)$ và $T_2(n)$ là thời gian thực hiện của hai đoạn chương trình $P_1$ và $P_2$ và $T_1(n) = O(f(n))$, $T_2(n) = O(g(n)$ thì thời gian thực hiện của đoạn hai đoạn chương trình đó lồng nhau là $T(n) = O(f(n).g(n))$

### 4.3 Qui tắc tổng quát để phân tích một chương trình
- Thời gian thực hiện của mỗi lệnh gán, $READ$, $WRITE$ là $O(1)$
- Thời gian thực hiện của một chuỗi tuần tự các lệnh được xác định bằng qui tắc cộng. Như vậy thời gian này là thời gian thi hành một lệnh nào đó lâu nhất trong chuỗi lệnh
- Thời gian thực hiện cấu trúc IF là thời gian lớn nhất thực hiện lệnh sau $THEN$ hoặc sau $ELSE$ và thời gian kiểm tra điều kiện. Thường thời gian kiểm tra điều kiện là $O(1)$.
- Thời gian thực hiện vòng lặp là tổng (trên tất cả các lần lặp) thời gian thực hiện thân vòng lặp. Nếu thời gian thực hiện than vòng lặp không đổi thì thời gian thực hiện vòng lặp là tích của số lần lặp với thời gian thực hiện thân vòng lặp.

> **Ví dụ:** Tính thời gian thực hiện của đoạn chương trình, ở đây mình dùng pseudo code:
```
0 function bubbleSort(alist):
1    for passnum in range(0..n-1):
2        for i in range(passnum+1..n):
3            if alist[i] > alist[i+1]:
4                temp = alist[i]
5                alist[i] = alist[i+1]
6                alist[i+1] = temp
              endif
         endfor
      endfor
  endfunction    
```
Cả ba lệnh đổi chỗ {4} {5} {6} tốn O(1) thời gian, do đó lệnh {3} tốn $O(1)$.

Vòng lặp {2} thực hiện $(n-i)$ lần, mỗi lần $O(1)$ do đó vòng lặp {2} tốn $O((n-i).1)=O(n-i)$.

Vòng lặp {1} lặp $(n-1)$ lần vậy độ phức tạp của giải thuật là: 

![](https://images.viblo.asia/594e148b-c0d7-4957-9cc0-d4cc11175755.gif)

## 5. Độ phức tạp của chương trình có lời gọi chương trình con không đệ quy

 Nếu chúng ta có một chương trình với các chương trình con không đệ quy, để tính thời gian thực hiện của chương trình, trước hết chúng ta tính thời gian thực hiện của các chương trình con không gọi các chương trình con khác. Sau đó chúng ta tính thời gian thực hiện của các chương trình con chỉ gọi các chương trình con mà thời gian thực hiện của chúng đã được tính. Chúng ta tiếp tục quá trình đánh giá thời gian thực hiện của mỗi chương trình con sau khi thời gian thực hiện của tất cả các chương trình con mà nó gọi đã được đánh giá. Cuối cùng ta tính thời gian cho chương trình chính.

Giả sử ta cô một hệ thống các chương trình gọi theo sơ đồ sau:![](https://images.viblo.asia/36c8b663-4fb7-44bc-8b7f-c19f4dcfbc82.gif)
Chương trình $A$ gọi hai chương trình con là $B$ và $C$, chương trình $B$ gọi hai chương trình con là $B1$ và $B2$, chương trình $B1$ gọi hai chương trình con là $B11$ và $B12$. Để tính thời gian thực hiện của $A$, ta tính theo các bước sau:
 - Tính thời gian thực hiện của $C$, $B2$, $B11$ và $B12$.
 - Tính thời gian thực hiện của $B1$
 - Tính thời gian thực hiện của $B$.
 - Tính thời gian thực hiện của $A$.

> **Ví dụ:** Ta có thể viết lại chương trình sắp xếp bubble như sau:
```
procedure Swap (var x, y: integer);
var temp: integer;
begin
             temp := x;
             x := y;
             y := temp;
end;

procedure Bubble (var a: array[1..n] of integer);
var i,j :integer;
begin
             {1} for i:=1 to n-1 do
             {2} for j:=n downto i+1 do
             {3} if a[j-1]>a[j] then Swap(a[j-1], a[j]);
end;
```

Trong cách viết trên, chương trình Bubble gọi chương trình con Swap, do đó để tính thời gian thực hiện của Bubble, trước hết ta cần tính thời gian thực hiện của Swap. Dễ thấy thời gian thực hiện của Swap là $O(1)$ vì nó chỉ bao gồm 3 lệnh gán.

 Trong Bubble, lệnh {3} gọi Swap nên chỉ tốn $O(1)$, lệnh {2} thực hiện $n-i$ lần, mỗi lần tốn $O(1)$ nên tốn $O(n-i)$. Lệnh {1} thực hiện $n-1$ lần nên 

![](https://images.viblo.asia/594e148b-c0d7-4957-9cc0-d4cc11175755.gif)
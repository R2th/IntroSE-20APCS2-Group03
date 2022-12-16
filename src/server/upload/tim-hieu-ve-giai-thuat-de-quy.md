Tiếp theo bài viết đầu tiên về [Cùng ôn lại các khái niệm về Cấu trúc dữ liệu, Giải thuật, Độ phức tạp thuật toán](https://viblo.asia/p/cung-on-lai-cac-khai-niem-ve-cau-truc-du-lieu-giai-thuat-do-phuc-tap-thuat-toan-Eb85oVy6l2G) trong series về Algorithm lần này, chúng ta sẽ tiếp tục ôn lại về một khái niệm cũng khá quen thuộc khác khi còn ngồi trên ghế nhà trường, đó là Đệ Quy, một công cụ cực kỳ mạnh mẽ để giải quyết nhiều bài toán. 

Mặc dù có thể chỉ là những kiến thức khá cơ bản, tuy nhiên việc nắm vững được về khái niệm, các đặc điểm, cũng như vấn đề của đệ quy sẽ giúp ích cho mọi người rất nhiều trong việc ứng dụng nó vào giải các bài toán từ đơn giản đến phức tạp, hay tự trả lời được câu hỏi khi nào nên dùng, và khi nào không nên dùng đệ quy. Bên cạnh đó, những kiến thức này cũng là nền tảng cần thiết để chúng ta đi sâu về việc tìm hiểu một số chiến lược thiết kế thuật toán như Backtracking, Divide and Conquer, Dynamic Programming ... ở những bài tiếp theo.

Hãy cùng bắt đầu nhé ;)

## Khái niệm về Đệ Quy

Về cơ bản thì **đệ quy xảy ra khi một sự vật được định nghĩa theo chính nó hoặc một đối tượng khác cùng dạng với chính nó**. 

Ta thỉnh thoảng cũng có thể bắt gặp đệ quy ở trong cuộc sống hàng ngày, ví dụ như khi đặt 2 cái gương đối diện nhau, và đứng ở giữa thì khi đó ta có thể nhìn thấy trong cái gương thứ nhất có chứa hình ảnh của cái gương thứ hai, và ở hình ảnh của cái gương thứ 2 đó lại chứa hình ảnh của cái gương thứ nhất, và theo đó thì (đương nhiên) nó cũng chứa tiếp hình ảnh của mình được phản chiếu trong hình ảnh của cái gương thứ nhất mà nó chứa (:joy:). Và cứ như vậy ...

Đệ quy được sử dụng trong nhiều lĩnh vực khác nhau, phổ biến nhất là trong toán học và khoa học máy tính. 

Ví dụ như ta có thể định nghĩa số tự nhiên như sau:
- 0 là số tự nhiên
- n là số tự nhiên nếu như n - 1 là số tự nhiên

Hay định nghĩa về giai thừa như sau:
- $0! = 1$
- Với $n > 0$ thì $n! = n * (n-1)!$

Trong tin học, thì đệ quy có thể định nghĩa:

> Đệ Quy (Recursion) là phương pháp dùng trong các chương trình máy tính trong đó có **một hàm tự gọi chính nó**

Rất đơn giản phải không các bạn :D **Khi nào bạn thấy bên trong 1 hàm, có lời gọi đến chính nó, thì đó chính là một hàm đệ quy!**

## Giải thuật Đệ Quy
Nếu lời giải của một bài toán $X$, được thực hiện bằng lời giải của một bài toán $X'$ có dạng giống như $X$, thì đó là một lời giải đệ quy. **Giải thuật tương ứng với lời giải như vậy gọi là giải thuật đệ quy**.

Một điều rất quan trọng của một chương trình máy tính là thông thường sau khi chạy thì nó phải quyết được vấn đề được giao, và kết thúc, chứ không thể chạy mãi được. Tương ứng với đó thì khi thiết kế một giải thuật đệ quy thì chúng ta phải tính đến điều kiện kết thúc của giải thuật, tức điều kiện mà ở đó hàm không được định nghĩa dựa vào chính nó nữa (tức chương trình không gọi đến nó nữa).

Như ví dụ ở trên thì khi định nghĩa về số tự nhiên ta có một điều kiện **0 là số tự nhiên**, hay khi định nghĩa về giai thừa, ta có một điều kiện $0! = 1$, đây chính là những điều kiện mà ở đó hàm không còn được định nghĩa bởi chính nó, hay nói cách khác, khi hàm đệ quy được gọi, và tính toán đến điều kiện này, thì hàm sẽ dừng lại, không gọi đệ quy nữa.

Như vậy, thì về cơ bản giải thuật đệ quy cho một vấn đề cần phải thoả mãn các đòi hỏi sau:
1. Phải có lời giải cho các trường hợp đơn giản nhất của bài toán. Các trường hợp này được gọi là các trường hợp cơ sở hay các trường hợp dừng của đệ quy. Hay nói một cách ngắn gọn thì **giải thuật đệ quy phải có điều kiện dừng**
2. Trong các trường hợp khác, thực hiện các lời gọi đệ quy giải quyết các vấn đề con với cỡ nhỏ hơn.
3. Các lời gọi đệ quy sinh ra các lời gọi đệ quy khác và đến một lúc nào đó các lời gọi đệ quy **phải dẫn đến điều kiện dừng**, lúc này lời gọi đệ quy sẽ được kết thúc.
 
## Một số ví dụ về giải thuật Đệ Quy
Ở phần này, chúng ta hãy cùng đi một số bài toán cơ bản, luôn được đưa ra giảng dạy khi đề cập đến đệ quy. Tất cả đều ở mức đơn giản thôi nhé, chúng ta sẽ dần đi đến các bài toán phức tạp hơn, ở những phần sau của series này, khi áp dụng đệ quy vào một số phương pháp thiết kế giải thuật khác. Phần ví dụ thì mình sẽ implement bằng Python cho ngắn gọn, và dễ hiểu :D

### Tính giai thừa
Với định nghĩa về giai thừa ở trên, hãy cùng nhau viết một hàm để tính `n` giai thừa nhé.

```python
def factorial(n):
   if n == 0:
       return 1
   else:
       return n * factorial(n-1)

factorial(10)
# = 3628800
```

Như bạn đã thấy ở trên thì hàm đệ quy factorial của chúng ta rất đơn giản, nó có điều kiện dừng là khi giá trị truyền vào n bằng 0, còn trong các trường hợp khác nó gọi đệ quy để tính factorial của n-1. Như vậy hàm của chúng ta thỏa mãn cả 3 yếu tố của một giải thuật đệ quy đã nêu ở trên:
- Nó có điều kiện dừng lại (khi n bằng 0)
- Nó có lời gọi đệ quy để giải quyết các vấn đề con
- Lời gọi đệ quy đó lại tiếp tục sinh ra các lời gọi đệ quy khác (n giảm dần), đến một lúc nào đó sẽ gọi đến điều kiện dừng (n = 0)

### Dãy số Fibonacci
Tính số Fibonacci thứ nn cũng làm một trong những bài toán hay được sử dụng, khi nhắc đến giải thuật đệ quy, nhưng với ý nghĩa là một ví dụ về việc ... **sử dụng đệ quy theo một cách không tốt**! Chúng ta cũng sẽ làm rõ phần này ở phía dưới, nhưng trước hết, hãy cùng tìm hiểu qua một vài khái niệm cơ bản về dãy Fibonacci nhé.

> Dãy Fibonacci là dãy vô hạn các số tự nhiên bắt đầu bằng hai phần tử 0 và 1, các phần tử sau đó được thiết lập theo quy tắc mỗi phần tử luôn bằng tổng hai phần tử trước nó

Chúng ta có thể định nghĩa dãy Fibonacci theo cách đệ quy như sau:
- $F(0) = 0$
- $F(1) = 1$
- $F(n) = F(n-1) + F(n-2)$ với $n >= 2$

Khi đó ta có thể implement một hàm đệ quy để tính số Fibonacci thứ n như sau

```python
def fibonacci(n):
  if n < 2:
    return n
  return fibonacci(n-1) + fibonacci(n-2)

fibonacci(10)
# = 55
```

Về cơ bản thì chúng ta có một hàm fibonacci rất đơn giản, dễ đọc, dễ hiểu. Tuy nhiên nếu bạn thử gõ `fibonacci(40)` để tính số Fibonacci thứ 40 bằng hàm ở trên thì bạn sẽ nhận ra rằng cơn ác mộng đã xảy ra.

Nó quá chậm! (mình vừa thử trên máy của mình thì nó mất hơn 20s)

Và đây chính là lý do:

![fibonacci](https://images.viblo.asia/0b7d5d4e-3637-4d10-88a3-b08602585ea9.jpg)

Hình phía trên miêu tả những gì đã diễn ra khi chúng ta gọi hàm để tính số Fibonacci thứ 5. Với cách implement đệ quy như ở trên, chúng ta đã lặp lại các phép tính toán rất nhiều lần. Cụ thể chúng ta phải tính $f(3)$ 2 lần, $f(2)$ 3 lần ... Và với $f(5)$ thì mọi chuyện còn đơn giản, và chúng ta có thể biểu diễn được cách mà hệ thống tính toán như hình ở trên. Nếu thay vào đó ta gọi hàm $f(50)$ thì hạn hãy tưởng tưởng xem số phép tính sẽ khủng khiếp như thế nào.

Hãy cùng đi vào phân tích xem độ phức tạp thuật toán của giải thuật ở trên, để cùng giải thích cho việc tại sao số nn tăng lên thì chậm, mà thời gian tính toán lại tăng lên nhiều như vậy nhé.

Giả sử thời gian của thuật toán là $T(n)$ thì thời gian tính $T(n)$ có thể biểu diễn bằng thời gian tính của $T(n-1)$ cộng với $T(n-2)$ cộng với hằng số $C$ (với C là hằng số khi thực hiện các phép toán so sánh `if`, với phép `+` hai số Fibonacci thứ `n-1` và `n-2`)

Do đó thì

```
T(n) = T(n-1) + T(n-2) + O(1) 
< 2T(n-1) + O(1)
< 4T(n-2) + 3O(1)
< ...
< 2^k * T(n–k) + (2^k-1)O(1)
< ...
< 2^n * T(0) +  (2^n-1)O(1) ~ 2 * 2^n = O(2^n)
```

Tức như bạn thấy thì đội phức tạp thời gian của thuật toán ở trên là một hàm mũ `n` (thực ra người ta có thể tính chính xác ra $T(n)$ ở đây có giá trị là $O(1.6180)^n$ (bạn có thể tìm hiểu thêm ở những bài viết chuyên sâu về dãy số Fibonacci), điều này khiến nó tăng với tốc độ nhanh chóng, và rất khó khả thi khi ứng dựng thực tế. Hãy thử nhìn lại biểu đồ về các hàm O lớn đã từng được chia sẻ ở bài trước, để thấy với hàm `^n` thế kia thì thời gian sẽ tăng như thế nào nhé:

![big o notation](https://images.viblo.asia/1dd9e734-5096-4571-9c56-a0842434e895.png)

Như đã đề cập ở phần đầu của bài toán này, thì lời giải đệ quy thông thường cho bài toán tìm số trong dãy Fibonacci này thường được đưa ra làm ví dụ tiêu biểu cho việc gọi đệ quy không tốt. Đó là lời cảnh tỉnh cho chúng ta trong việc nếu không tính toán kỹ các bước sẽ được thực hiện, cũng như không biết cách kiểm soát các lời gọi đệ quy thì đôi khi có thể dẫn đến những tính toán thừa thãi, từ đó làm độ phức tạp thời gian của thuật toán tăng lên rất nhiều.

Thực ra bài toán dãy số Fibonacci này có thể giải bằng nhiều cách khác bên cạnh giải thuật đệ quy, ví dụ như sử dụng vòng lặp như sau:

```python
def fibonacci(n):
  fib = [0, 1]
  for i in range(2, n+1):
    fib.append(fib[i - 1] + fib[i - 2])
  return fib[n]
  
fibonacci(10)
# 55
```

Với cách đơn giản là chạy một vòng lặp đến n, và tính toán kết quả từng số Fibonacci rồi lưu lại để sử dụng cho việc tính số Fibonacci tiếp theo, chúng ta đã có thế giải quyết bài toán tính đi tính lại nhiều lần ở trên (thực tế thì kể cả với cách gọi đệ quy, bạn cũng có thể sử dụng một mảng để lưu lại giá trị tạm thời, phục vụ cho những lần cần đến nó tiếp sau, tránh việc phải gọi đệ quy tính toán lại). Theo đó, chúng ta đã thu gọn được độ phức tạp từ một hàm số mũ nn xuống còn một hàm tuyến tính $O(n)$ !

**P/S**: Thực ra với bài toán dãy số Fibonacci thì ta còn có cả ... công thức toán học để tính ra số Fibonacci thứ nn, thế nên chỉ cần dùng đúng công thức toán học đó thì bạn còn có thể implement được một cách giải với độ phức tạp là $O(1)$ 😂

### Bài toán Tháp Hà Nội
Tháp Hà Nội, hay Tower of Hanoi, là một trò chơi toán học nổi tiếng, và là một ví dụ kinh điển, luôn được lấy để giới thiệu khi giảng dạy về giải thuật đệ quy. Mặc dù có một cái tên rất Việt Nam như vậy, nhưng nó không có nghĩa đây là một bài toán của người Việt, hay chỉ được biết đến ở Việt Nam đâu nhé. 😂 Nó nổi tiếng trên toàn thế giới đấy.

Nội dung của bài toán Tháp Hà Nội như sau:

Có 3 cái cọc A, B, C, và n cái đĩa với kích cỡ khác nhau, được đặt tại cột A, theo thứ tự nhỏ dần đến to dần. Hãy di chuyển n cái đĩa đó từ cột A sang cột C, sao cho
- Mỗi bước chỉ có thể di chuyển 1 cái đĩa từ cột này sang cột khác. Và cái đĩa được nhấc ra phải là cái đĩa ở trên cùng (không được di chuyển cái đĩa khi mà có đĩa khác ở trên nó)
- Khi chuyển đĩa sang một cột, thì phải đặt nó ở trên cùng
- Không được đặt cái đĩa to lên trên cái đĩa nhỏ hơn. Tức một đĩa chỉ có thể được chuyển vào một cọc trống, hoặc cọc mà đang có đĩa to hơn nó ở trên cùng.

Với trường hợp $n = 3$ thì ta có thể chuyển hết 3 đĩa từ cột A sang cột C theo 7 bước như hình dưới đây:

![tower of hanoi](https://images.viblo.asia/d234a401-a41a-4677-a765-de0a8cc71872.jpg)

(Source: https://craftofcoding.wordpress.com/2020/06/23/recursion-the-towers-of-hanoi-iii/)

Trông thì có vẻ rất phức tạp, thế nhưng ta có thể giải bài toán này một cách rất dễ dàng bằng giải thuật đệ quy như sau:

Ta có bài toán là chuyển n đĩa, từ cột A sang cột C, với B là cột chứa trung gian
- Chuyển `n-1` đĩa từ cột A sang cột B, với cột C là cột chứa trung gian. Khi đó chỉ còn lại đĩa thứ `n` trên cọc A
- Chuyển đĩa thứ n từ cột A sang cột C
- Chuyển `n-1` đĩa từ cột B sang cột C, với cột A là cột chứa trung gian, cho chúng nằm trên đĩa thứ `n`
- Lặp lại các bước đến khi không còn đĩa nào nữa (tất cả các đĩa đã được chuyển sang cột đích) thì dừng lại

Tức để chuyển `n` đĩa từ A sang C, ta tiến hành 2 lời gọi đệ quy, là chuyển `n-1` đĩa từ A sang B, sau đó chuyển `n-1` đĩa từ B sang C. Nghe thì thấy đơn giản hơn nhiều rồi nhỉ 😂 Hãy cùng đi vào implement chi tiết giải thuật nhé:

```python
def move(n, source, target, middle):
  if n == 0: # Khi không còn đĩa nào nữa thì dừng lại
    return;
  move(n - 1, source, middle, target) # Chuyển n - 1 đĩa từ cột nguồn, đến cột trung gian để giữ tạm 
  print("Move the disk", n, "from", source, "to", target) # Chuyển đĩa cuối cùng còn lại, tức đĩa thứ n từ cột nguồn sang cột đích
  move(n - 1, middle, target, source) # Chuyển n - 1 đĩa đang ở cột trung gian sang cột đích
  
move(3, "A", "C", "B")
'''
# Result
Move the disk 1 from A to C
Move the disk 2 from A to B
Move the disk 1 from C to B
Move the disk 3 from A to C
Move the disk 1 from B to A
Move the disk 2 from B to C
Move the disk 1 from A to C
```

Bằng phương pháp quy nạp toán học, ta có thể dễ dàng chứng minh được rằng cần $2^n - 1$ phép chuyển để chuyển `n` đĩa trong bài toán này. Thật vậy:

- Với $n = 1$, ta cần $2^1 - 1 = 1$ phép chuyển, đề chuyển 1 đĩa từ cột A sang cột C
- Với $n > 1$, giả sử để chuyển $n - 1$ đĩa ta cần $2^{n-1} - 1$ phép chuyển, khi đó để chuyển `n` đĩa ta cần $(2^{n-1} - 1) + 1 + (2^{n-1} - 1) = 2^n - 1$ phép chuyển. Như vậy công thức được chứng minh đúng với nn

Khi đó, nếu coi mỗi bước chuyển chúng ta tốn một lượng thời gian là hằng số $T$, thì có thể thấy độ phức tạp của thuật toán của chúng ta sẽ là $O(2^n)$. Và cũng giống như kết luận với trường hợp của bài toán dãy số Fibonacci ở trên, thời gian cần xử lý sẽ tăng rất nhanh khi `n` tăng dần. Bạn mà thử chạy với trường hợp nn bằng vài chục thôi thì có mà chờ dài hơi 😹

Như vậy bạn có thể thấy từ một bài toán rất phức tạp, kết quả cũng rất phức tạp, tuy nhiên chúng ta lại có thể giải một cách rất dễ dàng, và viết code một cách rất ngắn gọn bằng phương pháp đệ quy.

## Kết luận
Như vậy chúng ta đã cùng nhau tìm hiểu về đệ quy, cũng như một vài ví dụ về việc sử dụng giải thuật đệ quy để giải quyết một số bài toán đơn giản. **Phương pháp đệ quy có các ưu điểm là dễ hiểu, code ngắn gọn, dễ đọc, tốn ít thời gian để implement, cũng như để debug**.

Trong thực tế, sẽ có rất nhiều bài toán khác mà bạn cũng có thể giải quyết được bằng đệ quy, và bên cạnh đó cũng sẽ có những bài toán mà ngoài việc sử dụng giải thuật đệ quy ta còn có thể sử dụng các giải thuật dùng vòng lặp để giải quyết. **Giải thuật đệ quy có một vấn đề là khá tốn không gian bộ nhớ**. Mỗi lần hàm đệ quy được call là sẽ có thêm một layer mới được add thêm vào stack để lưu trữ kết quả và trạng thái của những lời gọi, điều đó đồng nghĩa với việc nếu giải thuật đệ quy của bạn gọi `n` tầng thì nó sẽ cần ít nhất một không gian bộ nhớ là $O(n)$. Việc khó kiểm soát được số lần gọi đệ quy trong một số trường hợp rất có thể sẽ dẫn đến việc không kiểm soát được bộ nhớ sử dụng, và sẽ dẫn đến việc chương trình bị lỗi (StackOverflow). Ngoài ra việc implement giải thuật đệ quy nếu không tính toán kỹ (giống như trường hợp giải thuật Fibonacci gọi đệ quy tính các hàm một cách độc lập như ví dụ ở phía trên) sẽ khiến độ phức tạp thuật toán tăng lên rất nhiều. 

Về cơ bản thì hầu hết mọi giải thuật đệ quy đều có thể viết viết lại bằng một giải thuật không đệ quy, đôi lúc việc đó có thể nó đem lại hiểu quả tốt hơn, nhưng đối lúc nó cũng có thể khiến cho chương trình trở nên cồng kềnh, khó đọc, khó hiểu hơn. Ví dụ như bài toán Tháp Hà Nội mà viết lại giải thuật đệ quy theo hướng dùng vòng lặp sẽ thực sự rất phức tạp, bạn có thể tham khảo ở [đây](https://www.geeksforgeeks.org/iterative-tower-of-hanoi/). Bài toán Tháp Hà Nội, thuật toán merge sort, hay các giải thuật duyệt đồ thị, duyệt cây ... là những ví dụ về việc thường hay sử dụng đệ quy vì tính hiệu quả của nó.

Ở bài toán Tháp Hà Nội ở trên, thông qua việc sử dụng đệ quy, chúng ta cũng đã thực hiện việc chia một bài toán lớn (với `n` phần tử) thành các bài toán con (với `n-1` phần tử), và xử lý từng bài toán con đó một, trước khi dùng kết quả của chúng để giải bài toán cha. Phương pháp này gọi là **chia để trị** (divide and conquer).

Chúng ta sẽ cùng tìm hiểu sâu hơn về phương pháp thiết kế giải thuật này, cùng việc ứng dụng đệ quy trong các cách giải chia để trị ở bài tiếp theo nhé 😉

P/S: Hình dưới đây là ảnh screenshot màn hình tìm kiếm trên Google với từ khóa "recursion", bạn có hiểu ý nghĩa của nó không 😅

![recursion google](https://images.viblo.asia/c7d8d947-539b-428c-843d-edee8b17da0f.png)

## Tham khảo
- [Đệ quy - Wiki](https://vi.wikipedia.org/wiki/%C4%90%E1%BB%87_quy_(tin_h%E1%BB%8Dc))
- [Dãy Fibonacci - Wiki](https://vi.wikipedia.org/wiki/D%C3%A3y_Fibonacci)
- [Tháp Hà Nội - Wiki](https://vi.wikipedia.org/wiki/Th%C3%A1p_H%C3%A0_N%E1%BB%99i)
- [Advantages/Disadvantages of Recursion](https://collegenote.pythonanywhere.com/curriculum/data-structures-and-algorithms/41/454/)
- [Recursion vs Iteration](http://pages.cs.wisc.edu/~vernon/cs367/notes/6.RECURSION.html#iter)
- [Computational Complexity of Fibonacci Sequence](https://www.baeldung.com/cs/fibonacci-computational-complexity)
- [Time complexity of recursive Fibonacci program](https://www.geeksforgeeks.org/time-complexity-recursive-fibonacci-program/)
- [Algorithms (4th Edition)](https://www.amazon.com/Algorithms-4th-Robert-Sedgewick/dp/032157351X) 
- Cracking the Coding Interview (6th Edition)
- Cấu trúc dữ liệu và giải thuật - Đỗ Xuân Lôi
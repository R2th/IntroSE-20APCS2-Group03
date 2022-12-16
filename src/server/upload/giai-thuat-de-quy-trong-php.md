# I. Giải thuật đệ quy là gì 

Đệ quy liên quan đến rất nhiều trong toán học, vì thế ta quay lại toán học một chút, một tính chất trong toán học được gọi là đệ quy nếu trong đó một lớp các đối tượng có các tính chất giống nhau và có mối liên hệ với nhau, kết quả của bước 1 là một thành phần của bước 2, bước 2 là thành phần bước 3, ….
** Ví dụ :** 
 Cha của 1 con kiến tên là A , Thì Cha của Cha con kiến đó tên là B (Tức là ông nội nó đấy :) ) . Cứ như vậy đệ quy n lần thì sẽ ra được nguồn gốc của gia tộc nhà kiến thôi :v. Đây cũng là <b>Chương trình đệ quy</b>  nhằm tìm ra nguồn gốc họ nhà kiến . Giải thuật đệ quy cũng có thể gọi là phương pháp chia để trị (chia nhỏ từng phần ra rồi kết hợp lại sẽ dễ dàng hơn) . Muốn dùng được đệ quy bạn phải biết viết hàm vì mỗi lần đệ quy là hàm gọi lại chính nó. Một chương trình đệ quy phải có điều kiện dừng, vì nếu không có thì chương trình sẽ gọi vô hạn (lặp vô hạn). Ví dụ tính tổng từ 1 tới n thì điều kiện dừng là khi tới n rồi thì không được tính nữa. còn nếu tính từ n trở về 1 thì điều kiện dừng là n = 1. 
 
# 1. Đệ quy tuyến tính

Đây là loại đệ quy mà trong hàm đệ quy chỉ gọi duy nhất 1 lần đến chính nó.
Ví dụ: Cho n = 10, tính tổng các số từ 1 tới 10.
Bài này nếu dùng vòng lặp thì đơn giản, ta lặp từ 1 đến 10 và mỗi vòng lặp cộng dồn lại sẽ ra tổng. Bài giải cho vòng lặp như sau:
![](https://images.viblo.asia/b00288d7-10f5-4c66-9eef-bab905f28a63.png)

Còn với giải thuật đệ quy thì ý tưởng là ở mỗi lần đệ quy ta sẽ lấy số đó cộng với hàm chính nó và biến truyền vào là số đó trừ đi 1. Điều kiện dừng là nếu số đó = 1 thì dừng vòng lặp và trả kết quả về. Phân tích kỹ hơn tức là mỗi bước đệ quy chính là một lần lặp, cộng dồn tổng các lần đệ quy chính là cộng dồn tổng các lần lặp nên kết quả nó sẽ tương đương với vòng lặp trên.

![](https://images.viblo.asia/4f0bde12-718e-4355-b6db-af336049a7c5.png)

Trong giải thuật đệ quy này thì trong  hàm gọi lại chính nó chỉ 1 lần (tức là chỉ có 1 đoạn code tinhtong($n-1)). Ở mỗi bước đệ quy sẽ lấy giá trị $n truyền vào cộng với giá trị của tinhtong($n-1), cứ lặp đệ quy như vậy cho tới khi biến $n truyền vào hàm = 1 thì dừng đệ quy, bài toán được mô phỏng như sau:
Biến $n truyền vào = 100; giá trị return = 100 + đệ quy lần 2 với tham số như sau: tinhtong(100-1). Cứ như vậy mỗi lần đệ quy quy sẽ bằng biến truyền vào + lần đệ quy tiếp. Luồng cộng như sau: 100 + ( 100-1 = 99 ) + (99 – 1 = 98) + …. + (2-1 = 1)  <=> 100 + 99 + 98 + …. + 1 .

# 2. Đệ quy nhị phân

Đệ quy nhị phân là loại đệ quy mà thân hạm gọi lại chính nó 2 lần.
Ví dụ:  Xuất ra màn hình phần tử thứ 100 của dãy Fibonacci.
Dãy Fibonacci là dãy bắt đầu từ 1 tới n trong đó phần tử thứ $i trong dãy sẽ bằng tổng 2 phần tử trước nó cộng lại.  Ví dụ viết dãy từ Fibonacci của 8 phần tử đầu tiên thì ta viết như sau: 1 – 1 – 2 – 3 – 5  – 8  – 13 – 21.
Trong dãy Fibonacci phần tử thứ 1 và thứ 2 có giá trị bằng 1. Đây cũng chính là điêu kiện dừng của dãy.

**Ví dụ**

![](https://images.viblo.asia/eca2cd68-474d-4a52-acef-8e246b67ebd8.png)

# 3. Đệ quy phi tuyến
Là loại đệ quy mà trong hàm có dùng vòng lặp để gọi lại chính nó.

**Ví dụ**

![](https://images.viblo.asia/2a3b09b2-8acf-48ee-b95a-4250bc0c75da.png)

# 4. Đệ quy hổ tương
Nghe cái tên thôi cũng hiểu được phần nào. Đệ quy hổ tương là đệ quy một hàm A gọi sang một hàm B, Trong hàm B lại gọi sang hàm A. Như vậy là chúng gọi lẫn nhau nên người ta gọi là  hổ tương.
Cũng như các loại đệ quy trên kia, nếu cả 2 hàm A, B đều không có điều kiện dừng thì sẽ bị lặp vô hạn, điều này rất nguy hiểm nên các bạn phải chú ý.

**Ví dụ**

![](https://images.viblo.asia/89732024-2602-4762-82ca-c57796c4b1e7.png)

# 5. Khử đệ quy
Giải thuật đệ quy rất hay nhưng chi phí tính toán cho nó thì rất mà cao, vì thế người ta hay tìm những giải thuật khác để thay thế cho nó. Tuy  nhiên trên thực tế chưa có một giải thuật nào chắc chắn cho điều này, có nghĩa là không phải bài nào cũng chuyển được. Và phần này là một quá trình nên tôi không có thời gian và cũng như là không đủ trình độ để giải hết các bài đệ quy được. Như ví dụ ở phần đệ quy tuyến tính các bạn thấy tôi đã dùng vòng lặp for để giải cho bài toán tính tổng. đó cũng là một cách dùng vòng lặp để khử đệ quy.
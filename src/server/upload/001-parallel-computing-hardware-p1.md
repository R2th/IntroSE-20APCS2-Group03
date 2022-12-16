© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Multithread từ hardware tới software với Java](https://viblo.asia/s/QqKLvp2rl7z).

## 1) Sequential vs Parallel computing
Như chúng ta đã biết (hoặc có thể bạn chưa biết), một chương trình chạy trên máy tính là một tập các chỉ dẫn (instruction), giống như các bước cần thực hiện để có thể làm một đĩa salad tươi ngon. Công thức đã có rất nhanh trên google, bao gồm:
- Gọt rửa hoa quả, rau xanh.
- Cắt các loại rau củ quả.
- Trộn tất cả lên và thêm nước sốt mong muốn.
- Trình bày ra đĩa và thưởng thức thôi.

![](https://i.imgur.com/VXrEKpK.png)

Mình sẽ đóng vai trò đầu bếp, thực hiện tất cả các công đoạn trên để hoàn thành đĩa salad. Đó là ví dụ của `single processor` (đơn nhân), có duy nhất mình thực hiện việc làm đĩa salad theo một công thức được cho trước từ đầu đến cuối (đã tách nhỏ thành các bước và thực hiện tuần tự).

Ngoài ra, mình chỉ có thể thực hiện 1 hành động (rửa rau, cắt kiwi...) tại một thời điểm. Có phải bạn đang nghĩ hoàn toàn làm được nhiều việc cùng lúc, nhưng thực tế trong lúc cắt kiwi bạn không thể rửa rau được (bàn luận cụ thể ở bài sau).  

Bài toán làm salad ở trên là ví dụ của `sequential programming` (lập trình tuần tự), cách mà chúng ta vẫn được học vì nó dễ để tiếp cận. Nhưng nó cũng là hạn chế, thời gian để hoàn thành công việc sẽ phụ thuộc vào tốc độ làm việc của mình và sẽ có giới hạn. Việc rửa rau, cắt kiwi càng nhanh thì món salad sẽ càng nhanh chóng được hoàn thành. Sau rất nhiều nỗ lực, mình đã hoàn thành món salad trong... 5 phút. 

> Máy tính cũng hoạt động vậy, thời gian để một chương trình chạy xong sẽ phụ thuộc vào tốc độ của bộ xử lý (CPU/processor). **Kết luận đầu tiên**: tốc độ processor càng nhanh thì chương trình hoạt động càng nhanh.

![](https://i.imgur.com/LnuCfmK.png)

Tất nhiên 1 đĩa salad là không đủ, mình tiếp tục vào bếp làm đĩa thứ hai. Để tăng tốc, mình gọi thêm một đầu bếp khác vào làm cùng. Chúng mình quyết định phân chia công việc để hoàn thành đĩa salad nhanh hơn. Mình sẽ cắt kiwi, trộn sốt, bạn còn lại sẽ cắt rau củ, cà rốt.

Một lúc sau, mình đã cắt xong nguyên liệu... tuy nhiên bạn còn lại chưa thực hiện xong. Mình phải chờ cho đến khi bạn ấy hoàn thành xong mới có thể tiếp tục.

![](https://i.imgur.com/hezjC0k.png)

Ví dụ trên chính là `parallel execution` (xử lý song song), chúng ta sẽ chia công việc có sẵn thành các phần có thể thực hiện cùng lúc và mỗi người sẽ lựa chọn task sau đó thực hiện cùng nhau. Bước cuối cùng (trộn sốt) sẽ thực hiện khi tất cả các công việc trước đó được hoàn thành. 

> **Rút ra kết luận thứ hai**: có nhiều processor thì chương trình hoạt động nhanh hơn so với ít processor. 
> **Lưu ý**, không phải cứ nhiều processor thì sẽ nhanh hơn, mình sẽ giải thích ở bài sau.

Đĩa salad thứ 2 đã hoàn thành trong vòng 3 phút. **Hãy chú ý**, khi có thêm một người nữa làm cùng không có nghĩa là thời gian được giảm đi một nửa. Thực tế, có thêm người tức là có thêm sự phức tạp, chúng ta cần nhiều effort hơn cho việc giao tiếp để hoàn thành công việc. Một lý do nữa, không phải việc nào cũng có thể chia ra làm cùng nhau, đôi khi sẽ phải chờ lẫn nhau để tiếp tục một công việc nào đó (trộn salad, thêm sốt). 

> Sẽ có rất nhiều thứ cần phải xử lý, đó chính là khó khăn khi lập trình multi thread so với single thread. Tuy nhiên, lợi ích mà nó đem lại sẽ rất lớn nếu biết áp dụng đúng cách, nhớ là đúng cách nhé. Và khi thực hiện đúng cách, nó sẽ giúp:
> - Hoàn thành 1 công việc sớm hơn (so với single thread programming).
> - Hoàn thành được nhiều công việc hơn trong cùng 1 khoảng thời gian (so với single thread programming). 

## 2) Parallel computing architecture
Các CPU (bộ vi xử lý) ngày này bao gồm rất nhiều processors (đa nhân) bên trong, chúng ta thường nay nghe đến Intel i5, i7 với 4 nhân (core), 8 luồng (thread) và hyper-threading (sẽ có giải thích thuật ngữ ở các bài tiếp theo). Nhờ có nhiều processor (core) như vậy nên chúng thật sự có thể xử lý các bài toán song song với nhau.

Có một câu hỏi đặt ra, vậy thì với các máy tính đời single core, làm thế nào để chúng có thể thực hiện được nhiều thứ đến vậy: lướt web, nghe nhạc, xem phim?

Đi sâu hơn một chút, chúng ta tiếp tục tìm hiểu về các kiến trúc xử lý song song mà máy tính đang có. Dựa trên cách phân loại Flynn (**Flynn's taxonomy**), phân chia với 2 yếu tố:
- Số lượng của các luồng chỉ dẫn (instruction) (the number of concurrent struction or control streams).
- Số lượng của các luồng dữ liệu (data) (the number of data streams).

Từ hai yếu tố trên, sẽ có 4 loại kiến trúc:
- SISD: Single instruction stream, single data stream.
- SIMD: Single instruction stream, multiple data stream.
- MISD: Multiple instruction stream, single data stream.
- MIMD: Multiple instruction stream, multiple data stream.

![](https://i.imgur.com/GwjhINZ.png)

Bắt đầu có nhiều thuật ngữ hơn rồi đây. Vậy thì 4 loại kiến trúc trên thực sự là gì, ví dụ thực tế như thế nào và chúng khác nhau ra sao?

### 2.1) SISD

Đầu tiên với kiến trúc SISD, trong bất kì thời điểm nào, chỉ có thể xử lý duy nhất một instruction và tương tác với duy nhất một nguồn data. Ví dụ, mình là SISD computer, mình chỉ có thể thực hiện duy nhất một hành động cắt (single instruction) với quả kiwi (single data) tại một thời điểm. Đây là kiến trúc được áp dụng phổ biến cho các máy tính đời đầu.

![](https://i.imgur.com/dO3q5tW.png)

### 2.2) SIMD

Tiếp tục đến SIMD, một loại parallel computing với nhiều processor (core), hay chúng ta gọi là nhân của hệ điều hành (multiple processing units). Tại một thời điểm bất kì, tất cả các processors đều xử lý chung một instruction nhưng sẽ tương tác với nhiều nguồn data khác nhau. 

Ví dụ, SIMD bao gồm hai processors là 2 đầu bếp, cả 2 đều sẽ thực hiện hành động cắt (single instruction), tuy nhiên mỗi processor sẽ xử lý với nguồn data khác nhau. Mình cắt (instruction) kiwi (data), bạn còn lại sẽ cắt (instruction) cà rốt (data).

Quick question, từ ví dụ trên, theo bạn SIMD được áp dụng ở đâu, cho cái gì (câu trả lời sẽ có ở cuối)?

![](https://i.imgur.com/4k8AcjO.png)

### 2.3) MISD

Mỗi processor sẽ xử lý riêng một instruction, tuy nhiên tất cả các processors sẽ thực hiện thao tác trên cùng một data.

Quay về bài toán đĩa salad, cụ thể ta sẽ có 2 instructions (cho 2 processors) là gọt vỏ và cắt, thao tác trên đối tượng là quả kiwi (data). Nghĩa là 1 người gọt vỏ kiwi, 1 người sẽ cắt kiwi, hai bọn mình làm đồng thời cùng một lúc. Nghe có vẻ không... make sence lắm nhỉ. Thực tế đúng là như vậy, MISD không phải là kiến trúc phổ biến.

![](https://i.imgur.com/MhMmt3w.png)

### 2.4) MIMD

Cuối cùng là MIMD. Mỗi processor sẽ thực hiện những instruction riêng biệt trên data riêng biệt. Ví dụ rất đơn giản, mình sẽ gọt vỏ kiwi trong khi bạn còn lại cắt cà rốt. Kiến trúc MIMD rất phổ biển và xuất hiện trong gần như toàn bộ các máy tính hiện đại ngày này từ laptop, máy tính để bàn cho đến smart phone...

![](https://i.imgur.com/hQR3ia3.png)

Đi sâu vào MIMD, chúng ta sẽ có hai cách xử lý bài toán trong kiến trúc MIMD đó là:
- SPMD: Single program, multiple data.
- MPMD: Multiple program, multiple data.

#### 2.4.1) SPMD

Với SPMD, các processors sẽ xử lý 1 bài toán song song với nhau (2 người cùng làm 1 đĩa salad), tuy nhiên mỗi processor sẽ thao tác với dữ liệu khác nhau. Nghe có vẻ giống SIMD nhưng thực tế không phải vậy, mặc dù cả 2 processors cùng xử lý 1 bài toán nhưng không cùng thực hiện 1 instruction. Ví dụ, cả 2 người cùng nhìn vào công thức làm món salad, sau đó sẽ chia thành các nhiệm vụ nhỏ và mỗi người làm một phần khác nhau. Mô hình này rất phổ biến và nó được áp dụng trong chính chiếc máy vi tính mà chúng ta đang sử dụng. 

![](https://i.imgur.com/ytDXsIY.png)

#### 2.4.2) MPMD

Cuối cùng là MPMD. Thay vì làm 1 đĩa salad thì bọn mình làm 2 đĩa salad, mỗi một người sẽ làm một đĩa khác nhau dựa trên 2 công thức khác nhau và không liên quan đến công việc của người còn lại. MPMD sẽ phù hợp với các bài toán có thể chia nhỏ ra theo hướng chức năng. 

![](https://i.imgur.com/hAasaNs.png)

### Reference
Reference in series: https://viblo.asia/s/multithread-programming-tu-hardware-toi-software-voi-java-QqKLvp2rl7z

### After credit
Với ví dụ trên về SIMD, nó sẽ phù hợp với các bài toán xử lý với lượng dữ liệu lớn nhưng lại cùng một instruction, ví dụ như xử lý ảnh. Kiến trúc của GPU (Praphics processing unit - Card đồ họa) đa số sẽ là SIMD.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)
© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Multithread từ hardware tới software với Java](https://viblo.asia/s/QqKLvp2rl7z).

Quay về [bài toán salad](https://viblo.asia/p/concurrent-and-parallel-001-parallel-computing-hardware-p1-Ljy5Vvvy5ra#_1-sequential-vs-parallel-computing-0), có thể có nhiều thread (đầu bếp) nhưng không có nghĩa là tất cả đều thực hiện song song (parallel) với nhau. Vì sao vậy? Bài viết này sẽ tìm câu trả lời với hai khái niệm dễ gây nhầm lẫn là **concurrent** và **parallel**. Let's begin.

## 1) Concurrent
Có nhiều công đoạn để hoàn thành một đĩa salad tươi ngon. Từ rửa, cắt gọt rau củ, trộn đều và thêm các loại sốt. Với công thức đó, để giảm thời gian hoàn thành, ta sẽ chia nhỏ thành nhiều việc và một vài việc có thể được thực hiện độc lập, không liên quan đến nhau, không ảnh hưởng đến hương vị của món salad. Ví dụ như thái rau củ, cắt hoa quả.

Đó chính là tư tưởng và ý nghĩa của **concurrent**. Với ngôn ngữ kĩ thuật, **concurrent** diễn tả về:
> - Cấu trúc của một thuật toán hoặc chương trình bao gồm nhiều phần được thực thi **không phụ thuộc vào nhau**.
> - Với cấu trúc đó, các phần sẽ được thực thi theo **thứ tự bất kì** mà **không ảnh hưởng đến kết quả cuối cùng**.

![](https://i.imgur.com/N1TEv3y.png)

Tiếp theo, kết hợp tất cả các phần chúng ta đã biết để bắt đầu làm đĩa salad:
- Công thức làm món salad (process, series of instruction)
- Hai đầu bếp (thread)
- Nguyên liệu (data)

Có vẻ vẫn thiếu thiếu... Đó là bộ dụng cụ chuyên dụng để cắt gọt hoa quả, không có sao làm được :joy:. Và nó là processor của hệ thống, thứ không thể thiếu.

Phân chia công việc thôi, mình cắt kiwi, bạn còn lại cắt dưa chuột. Chỉ có duy nhất một bộ dụng cụ (corn nhà nghèo :joy:), và đó là single processor. Để đảm bảo công bằng, mỗi người sẽ thực hiện một lúc, sau đó đổi cho người còn lại. Cứ như vậy cho đến khi cả hai hoàn thành công việc.

> Với ví dụ này, chúng mình đang thực hiện các công việc **đồng thời** với nhau sử dụng duy nhất một bộ dụng cụ (single processor), và nó miêu tả kĩ hơn cho khái niệm **concurrent**.

![](https://i.imgur.com/xyspcYX.png)

Khi bọn mình tăng tần suất trao đổi lên tối đa, nó khiến ta cảm giác như 2 người đang thực hiện song song cùng một lúc với nhau mặc dù chỉ có duy nhất một bộ dụng cụ. Và tất nhiên, nó **không phải là parallel execution** (xử lý song song).

Vậy parallel và cụ thể parallel execution là gì?


## 2) Parallel
Nếu chúng mình muốn thực hiện các công việc song song với nhau một cách đúng nghĩa, ta sẽ cần hai bộ dụng cụ, thêm một processor nữa. That's easy game :sweat_smile:.

Nói theo ngôn ngữ kĩ thuật, ta cần xử lý bài toán trên **parallel hardware**. Có thể nói là **multi-processors**, nhưng nó là chưa đủ. Cụ thể, **parallel hardware** có một vài hình thái sau:
> - **Multi-processors**. Các máy tính, smartphone hiện đại ngày nay đều được trang bị các CPU 2, 4, 8 hoặc 16 processors.
> - **Graphics Processing Unit (GPU)**, dân gian gọi là card đồ họa. Về bản chất, nó vẫn là multi-processors nhưng số lượng rất lớn, lên đến **vài trăm** hoặc **vài nghìn processors**. Vì nhiệm vụ của nó là xử lý ảnh (single instruction) với hàng triệu các byte data khác nhau (multiple data) nên nó sẽ tập trung vào số lượng các processor (mình đã đề cập đến ở bài đầu tiên). Giờ thì đã hiểu vì sao dân đào coin lại dùng GPU chứ không dùng CPU rồi 🤔.
> - **Computer cluster**. Hiểu đơn giản là các máy tính được kết nối với nhau tạo thành **supercomputer** 🦸‍♂.

Hơi lan man, quay trở lại bài. Với hai bộ dụng cụ thì bọn mình không cần trao đổi qua lại nữa, tốc độ nhanh hơn đáng kể.

![](https://i.imgur.com/mg4X3TX.png)

> Kết luận, **parallel** muốn nói đến các công việc được thực thi đúng nghĩa song song, với điều kiện vật chất như nhau, không phụ thuộc vào nhau.

## 3) Tổng kết
Từ hai phần trên dẫn tới 2 kết luận sau để so sánh giữa **concurrent** và **parallel**:
> - **Concurrent**: diễn tả về cấu trúc của một bài toán có khả năng phân chia được ra nhiều phần, các phần đó được thực thi độc lập, không theo thứ tự và không ảnh hưởng đến kết quả cuối cùng. **Parallel**: khả năng thực thi các nhiệm vụ song song với nhau.
> - **Concurrent**: *deal* với nhiều nhiệm vụ cùng một lúc. Tôi sẽ làm tất cả các công việc này nhưng không thực hiện chúng song song với nhau. **Parallel**: *thực hiện* nhiều nhiệm vụ cùng một lúc, cùng một thời điểm.

Như vậy, **concurrent** sẽ giúp một chương trình có khả năng được xử lý song song, tất nhiên với **parallel hardware**. Tuy nhiên, không phải chương trình nào cũng có thể tận dụng được lợi ích từ **parallel execution**. 

Ví dụ nhé, máy tính chúng ta có các driver (chương trình phần mềm) để xử lý các tín hiệu từ thiết bị ngoại vi (I/O device), ví dụ như bàn phím, loa, chuột... Các driver đó tất nhiên được thực thi một cách đồng thời (concurrency) và OS sẽ quản lý, điều phối chúng (bài sau sẽ nói về cách OS điều phối các thread). Với các máy tính **multi-processors** hiện nay, các task của driver sẽ được tách nhỏ và thực hiện trên nhiều processor khác nhau. 

> Cụ thể hơn, hành động click/scroll chuột sẽ không nhiều, có thể trong vài giây click một lần. Hoặc gõ bàn phím, tốc độ trung bình rơi vào khoảng 120 WPS (word per second) là cao, tương đương 8 **button hits** một giây, vẫn rất chậm so với tốc độ processor/memory xử lý. Như vậy, việc phân chia nhiệm vụ ra nhiều processor thật sự **gần như không có cải thiện** gì đáng kể.

Do đó, các bài toán lớn sẽ tận dụng được nhiều lợi thế hơn khi xử lý song song, ví dụ như các phép toán giai thừa hoặc số mũ hoặc các bài toán thỏa mãn 2 yếu tố:
> - Có thể chia thành nhiều phần nhở hơn để tính toán, sau đó tổng hợp lại ra kết quả cuối cùng.
> - Cần nhiều thời gian, công sức (liên quan đến độ phức tạp) để thực hiện.

Hóa ra **concurrent** và **parallel** chẳng có gì phức tạp. Bài tiếp theo mình sẽ nói về cách OS thực thi các thread như thế nào.

### Reference
Reference in series: https://viblo.asia/s/multithread-programming-tu-hardware-toi-software-voi-java-QqKLvp2rl7z

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)
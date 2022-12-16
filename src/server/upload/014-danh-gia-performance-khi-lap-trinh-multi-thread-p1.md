© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Multithread từ hardware tới software với Java](https://viblo.asia/s/QqKLvp2rl7z).

Có nhiều thứ cần bàn luận về **multi-thread programming**, đặc biệt là **performance**. Vì **performance** là thứ ta muốn tối ưu khi chuyển từ **single-thread** sang **multi-thread** và **single-processor** sang **multi-processor**.

Bài viết này giới thiệu vài thuật ngữ quan trọng khi đánh giá một chương trình **parallel execution**. Let's begin!

## 1) Weak scaling và Strong scaling
Ngoài việc tăng **performance** (tốc độ xử lý, hiệu suất chương trình), một mục tiêu khác muốn hướng tới đó là **tăng số lượng task có thể xử lý trong một khoảng thời gian**.

Ví dụ, sắp đến giờ party mới nhớ còn [món salad](https://viblo.asia/p/001-parallel-computing-hardware-p1-Ljy5Vvvy5ra#_1-sequential-vs-parallel-computing-0) chưa chuẩn bị. Còn 40 phút, mình phải **làm đủ 8 đĩa**. Tuy nhiên, một thành viên khác tham gia cùng mình với vai trò **processor** thứ hai, làm công việc song song với mình. Tổng cộng bọn mình hoàn thành được **16 đĩa** (gấp đôi con số ban đầu) cũng trong 40 phút.

![](https://i.imgur.com/ODkNBw6.png)

Việc thêm **processor** như trên để **parallelization** (song song hóa) được gọi là **Weak scaling**. **Weak scaling** có những đặc điểm:
> - Giữ nguyên số lượng task có thể xử lý của mỗi **processor**.
> - Việc thêm **processor** sẽ giúp hoàn thành được **nhiều task hơn** trong **một khoảng thời gian cụ thể**.

Ngoài ưu điểm trên, chúng ta có một cách khác để tận dụng khả năng **parallelization** đó là hoàn thành **các task cho trước** nhanh hơn. Đây là mục tiêu chính khi ta thiết kế chương trình được thực thi song song.

Vẫn ví dụ trên, hai bọn mình sẽ chia đôi công việc và hoàn thành 8 đĩa trong 20 phút. Như vậy là **giữ nguyên số lượng task ban đầu** và hoàn thành nhanh hơn.

![](https://i.imgur.com/DfzNJ7w.png)

Khả năng **parallelization** này được gọi là **Strong scaling**, có các đặc điểm:
> - Chia đều **tổng số task ban đầu** ra các **processor**.
> - Từ đó việc thêm **processor** nhằm mục đích hoàn thành công việc với ít thời gian hơn.

## 2) Throughput, Latency
**Throughput** chắc hẳn rất quen thuộc với nhiều bạn. Nó nói đến tổng số lượng task có thể hoàn thành trong một khoảng thời gian.

**Latency** càng quen thuộc hơn, là thời gian để thực thi một task từ đầu đến cuối với đơn vị thời gian.

Với ví dụ trên, thời gian để hoàn thành đĩa salad là 5 phút. Vậy **latency** = 1/12 hour.

Nếu chỉ có mình thực hiện việc làm đĩa salad, **throughput** = 8 / (8 * 1/12) = 12 tasks/hour. Thêm một người nữa, **throughput** tăng lên 24 tasks/hour. Tiếp tục thêm người nữa tăng lên 36 tasks/hours. 

> Như vậy, thêm **processor**, **throughput** sẽ tăng lên trong khi **latency** không đổi.

Do đó, ngoài việc tăng **processor** để tăng **performance** của chương trình, chúng ta có thể giảm **latency** của task. 

## 3) Speedup

Một thông số hay được sử dụng tính toán hiệu năng của **parallel program** là **speedup**.

**Speedup** được tính toán dựa trên tổng thời gian chương trình cần để thực thi tuần tự chia cho tổng thời gian xử lý song song với X **processor**.

![](https://i.imgur.com/DUKNGLp.png)

Với ví dụ trên, nếu tăng lên 2 processors thì **speedup = 2**, với 3 processors là **speedup = 3**. Các con số khá đẹp :joy:, vì nó chỉ là ví dụ.

Thực tế, việc một chương trình được chia ra nhiều task với **latency** như nhau là rất khó. Ngoài ra, có những task có thể thực thi đồng thời và những task phải thực thi tuần tự. Do vậy, nó sẽ giới hạn **speedup** tới một con số nào đó dẫn tới việc thêm nhiều **processor** cũng không đem lại hiệu quả. Vì sao lại không hiệu quả, theo dõi bài sau để hiểu rõ hơn nhé.

**Note**: bạn có nhận ra **speedup** khá quen không. Nếu đã đọc bài trước của mình, nó hơi giống khái niệm **parallel ratio**. Tuy nhiên nó diễn tả 2 việc khác nhau.
> - **Parallel ratio** nói về tỉ lệ tối đa chương trình được thực thi song song.
> - **Speedup** diễn tả về hiệu năng của **parallel programm** được thực thi trên môi trường **multi-processors**.

### Reference
Reference in series: https://viblo.asia/s/multithread-programming-tu-hardware-toi-software-voi-java-QqKLvp2rl7z

### After credit
Ở [bài trước](https://viblo.asia/p/002-parallel-computing-hardware-p2-Qbq5QEER5D8) mình có để lại câu hỏi khá thú vị liên quan đến **performance** của chương trình:
> Có phải thêm càng nhiều **processor** thì máy tính chạy càng nhanh, các chương trình được thực thi càng nhanh không. Nếu có thì thêm bao nhiêu cho đủ?

Với ý đầu tiên, mình đã trả lời ở bài [013: Lập trình multi-thread có thật sự nhanh hơn single-thead không?](https://viblo.asia/p/013-lap-trinh-multi-thread-co-that-su-nhanh-hon-single-thead-L4x5xV2YZBM) Câu trả lời cho ý thứ hai sẽ có ở [bài sau](https://viblo.asia/p/924lJj7alPM) nhé.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)
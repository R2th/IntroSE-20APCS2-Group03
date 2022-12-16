© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Multithread từ hardware tới software với Java](https://viblo.asia/s/QqKLvp2rl7z).

Chúng ta đã rất quen thuộc với Intel Core i5 4 cores 4 threads, i5 4 cores 8 threads có công nghệ **Hyper-threading**. Vậy **hyper-threading** là gì, 4 cores 8 threads là sao?

Bài viết này chỉ có duy nhất mục đích đó là giải thích về **hyper-threading**.

Có 2 loại **thread** chúng ta cần quan tâm và phân biệt:
> - **CPU thread**: là thread trong Interl Core i5 4 cores 4 threads. Nó mang ý nghĩa luồng thực thi của CPU. Mỗi một processor (core) chỉ có khả năng xử lý duy nhất 1 luồng (thread).
> - **OS thread**: là thread trong lập trình **multi-thread**. Là thread trong một process. Với các lập trình viên, khi nói đến **thread**, ta hiểu nó là **OS thread**.

Ở bài trước, ta đã biết 1 **processor** (core) của CPU chỉ thực thi duy nhất **1 thread** tại một thời điểm. Và CPU sẽ bao gồm nhiều processor bên trong, ví dụ Intel Core i5 4 cores 4 threads, 4 threads này tương ứng mỗi processor xử lý duy nhất 1 CPU thread. Các **OS thread** sẽ được đẩy vào **CPU thread** này để được thực thi. 

Tuy nhiên, bạn sẽ bắt gặp một vài CPU Intel Core i5 4 cores 8 threads. Mỗi nhân vật lý (processor) thực thi như 2 nhân ảo, có thể xử lý được 2 luồng một lúc, sức mạnh ngang ngửa  8 cores vật lý mà lại rẻ hơn. Cái này là seller quảng cáo như vậy :joy:.

Theo google, **Hyper-threading** là công nghệ siêu phân luồng do Intel phát minh, cho phép chạy đồng thời 2 luồng cùng lúc trên một processor. 

Hàng ảo mà ngang ngửa hàng thật. Sự thật phía sau là gì?

Về mặt bản chất, **hyper-threading** là tận dụng tối đa khoảng thời gian trống của **processor** khi một thread bị ngừng thực thi (vì một vài lý do), từ đó tối ưu khả năng xử lý. **Đa số** các trường hợp thread ngừng thực thi có **2 nguyên nhân chính**:
> - Context switch.
> - Cache coherency.

Chúng ta đã biết **context switch** ở bài trước, xảy ra khi 2 thread đổi chỗ cho nhau để được thực thi trên processor. Trong quá trình đổi chỗ đó, **processor** được giải phóng và không làm gì **(1)**. Synchronize dẫn đến **context switch**, I/O blocking dẫn đến **switch context**...

Tiếp theo là vấn đề **cache coherency**. OS sẽ copy value/instruction từ **RAM** lên **processor register** để **processor** thực thi. Tuy nhiên, có thể xảy ra hiện tượng **cache miss** do value/instruction đó không còn tồn tại. Nguyên nhân dung lượng của **register** rất nhỏ, nếu value/instruction đó chưa được thực thi ngay nó sẽ bị xóa ra khỏi bộ nhớ. Do đó, đến thời điểm thực thi thật sự, **register** phải copy lại value/instruction từ **RAM**. Trong quá trình đó, **processor** được giải phóng và không làm gì **(2)**.

> **Hyper-threading** ra đời nhằm tận dụng khoảng thời gian chết đó **(1) và (2)**, nhằm tối đa hóa công suất và thời gian làm việc của **processor**.

Ngoài ra với **hyper-threading**, mỗi **processor** có 2 **set of registers (bộ thanh ghi)** và có thể thực hiện các instruction từ **2 thread**, tuy nhiên tại 1 thời điểm chỉ thực thi duy nhất 1 **thread**. Do đó nó được gọi là **2 cores 4 threads/4 cores 8 threads** (số lượng threads gấp đôi số cores). Và khi **(1) hoặc (2)** xảy ra, nó sẽ switch sang **set of registers** còn lại và xử lý với tốc độ cực nhanh, không tốn thời gian như **context switch**.

Do vậy, CPU 4 cores 8 threads vẫn không thể so sánh với CPU 8 cores 8 threads. Tuy nhiên tốc độ xử lý của nó tốt hơn CPU 4 cores 4 threads, phụ thuộc vào tần suất các vấn đề **cache miss** hay **context switch** xảy ra, rơi vào khoảng 30% (theo Intel).

Một nửa sự thật, vẫn là sự thật. CPU có hyper-threading sẽ nhanh hơn, đồng thời tốn điện hơn, tuy nhiên không thể bằng hàng thật. 

### Reference
Reference in series: https://viblo.asia/s/multithread-programming-tu-hardware-toi-software-voi-java-QqKLvp2rl7z

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)
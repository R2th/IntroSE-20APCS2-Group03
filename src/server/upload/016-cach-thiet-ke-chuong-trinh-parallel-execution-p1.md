© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Multithread từ hardware tới software với Java](https://viblo.asia/s/QqKLvp2rl7z).

Chúng ta đã đi qua một loạt các bài về cơ chế, cách hoạt động của **hardware** với **single/multi-processors** và implement **software** với **multi-thread** chỉ nhằm mục đích duy nhất: tăng tốc chương trình.

Lý thuyết đã nắm vững, bước quan trọng nhất là làm thế nào để thiết kế một chương trình **parallel execution**, tận dụng tối đa sức mạnh của **multi-processors**.

Chủ đề hôm nay sẽ bàn về các step để thiết kế chương trình **parallel execution**, gồm có 4 phần:
- Partitioning
- Communication
- Agglomeration
- Mapping

## 1) Partitioning
Với bước đầu tiên là **partitioning**, tư tưởng là chia nhỏ task lớn thành các task nhỏ, chia task nhỏ thành các task nhỏ hơn. Nhưng điều quan trọng nhất là chia như thế nào? Có bạn nào gặp hội chứng Trypophobia không nhỉ. Hội chứng sợ những cái **lỗ**. Nhìn hình dưới cũng hơi hãi :worried:.

![](https://i.imgur.com/ZeoFF10.png)

Có 2 yếu tố cơ bản có thể dựa vào để phân chia thành các task nhỏ hơn:
> - **Domain/Data**: phân tách các task dựa trên data gắn với task đó. 
> - **Function**: chia nhỏ task theo hướng chức năng.

Ví dụ, lần này bọn mình sẽ làm spaghetti. Cụ thể là 2 người làm 8 đĩa spaghetti.
> - Với **domain/data partitioning**, mình sẽ chia làm hai phần, mỗi người làm 4 đĩa spaghetti.
> - Với **function partitioning**, mình sẽ chia công đoạn thực hiện đĩa spaghetti thành nhiều bước: luộc mì, làm sốt... Mỗi người sẽ đảm nhiệm một vài task và thực hiện cho cả 8 đĩa.

![](https://i.imgur.com/Nqh7YOD.png)

![](https://i.imgur.com/SsuENNV.png)

Trong thực tế, chúng ta sẽ áp dụng cả 2 yếu tố trên để thực hiện **partitioning** một bài toán. Như vậy bước đầu tiên lý thuyết khá đơn giản, phần khó nhất vẫn là thực hành sao cho đúng với lý thuyết.

Một câu thần chú quen thuộc, dựa vào bài toán cụ thể, tình hình thực tế để thực thi sao cho đúng nhất, nếu chưa đúng ta bỏ đi hết làm lại từ đầu :worried:.

## 2) Communication
Bước tiếp theo cần quan tâm và xử lý đó là làm thế nào để các task (cụ thể là các thread thực thi task) giao tiếp với nhau, chia sẻ dữ liệu với nhau.

Mặc dù chúng ta cố gắng để chia thành các task thực thi độc lập, không phụ thuộc vào các task còn lại, tuy nhiên các bài toán thực tế không đơn giản như vậy. 

### 2.1) Point-to-point communication

Giả sử mình mong muốn các đĩa spaghetti được trang trí nhiều kiểu và không đĩa nào giống đĩa nào. Như vậy mình phải biết thông tin của các đĩa đã hoàn thành, hay nói cách khác, cần sự giao tiếp giữa các task để yêu cầu được thực hiện chính xác.

![](https://i.imgur.com/75XDiYC.png)

Như vậy, mặc dù các task có thể thực thi đồng thời với nhau tuy nhiên **vẫn phụ thuộc ít nhiều** vào nhau. Trong tình huống này, tất cả các task đều cần communicate với nhau, được gọi là **point-to-point communication**. 
- Một task sẽ đóng vai trò là **sender** hoặc **producer**
- Task còn lại đóng vai trò **receiver** hoặc **consumer**.

![](https://i.imgur.com/oIynkTk.png)

### 2.2) Collective communication
Ngoài ra, ta có thể dùng cơ chế khác để giao tiếp giữa các task thay cho **point-to-point communication**. Nếu một **task** muốn **share/collect** dữ liệu **to/from** nhiều **task** khác nhau, chúng ta sẽ sử dụng cơ chế **collective communication**.

![](https://i.imgur.com/pgzHPZM.png)

Với **collective communication**, một **task** sẽ đóng vai trò giống như bộ quản lý trung tâm, phân tán và thu cập các data từ nhiều **task** khác nhau. Khi số lượng các task xung quanh tăng lên đồng nghĩ với việc **task** trung tâm phải làm việc nhiều hơn, rất có khả năng xảy ra **bottle neck**. Điều tương tự cũng có thể xảy ra với **point-to-point communication**.

![](https://i.imgur.com/6M1uEmv.png)

### 2.3) Devide & Conquer

Có sử dụng chiến lược **devide and conquer**/**fork and join** để xử lý vấn đề giao tiếp và chia sẻ data. Mục tiêu của phương pháp này là chia từ một phần thành các phần nhỏ hơn, các phần nhỏ hơn tiếp tục chia nhỏ hơn nữa. Các **task** chỉ giao tiếp trực tiếp với **task** ở level trên và level dưới, giảm gánh nặng của **task** trung tâm.

![](https://i.imgur.com/kv1ROXC.png)

### 2.4) Synchronous & Asynchronous
Ngoài các cách trên để mô hình hóa sự giao tiếp giữa các task, một yếu tố nữa cần quan tâm đó là cách giao tiếp:
> **Synchronous**:
> - Giao tiếp đồng bộ. **Blocking communication**.
> - Một **task** sẽ chờ cho đến khi quá trình **communicate** thành công, nhận được response (nếu có) mới tiếp tục xử lý.
> - Do đó, không thể thực thi các nhiệm vụ khác trong quá trình chờ response.
> 
> **Asynchronous**:
> - Giao tiếp bất đồng bộ. **Non-blocking communication**.
> Một **task** không cần chờ cho đến khi nhận được response.
> Nhờ vậy, nó có thể thực thi nhiệm vụ khác trong quá trình chờ response.

Ngoài ra, vài yếu tố khác cần quan tâm trong quá trình **communication**:
- **Overhead**: tài nguyên mà máy tính cần cho quá trình **communication**. Giao tiếp cũng tốn calories mà.
- **Latency**: thời gian một **message** gửi từ **A** đến **B**.
- **Bandwidth**: rất quen thuộc, băng thông. Dung lượng **message** tối đa có thể truyền tải trong một đơn vị thời gian (GiB/s). Nếu trong cùng thiết bị vật lý thì thông số này không quá quan trọng. Tuy nhiên nếu triển khai trên nhiều thiết bị vật lý và giao tiếp thông qua Internet, nó là một yếu tố cần được chú ý.

Còn 2 step nữa, mình sẽ giới thiệu trong bài sau:
- Agglomeration
- Mapping

### Reference
Reference in series: https://viblo.asia/s/multithread-programming-tu-hardware-toi-software-voi-java-QqKLvp2rl7z

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)
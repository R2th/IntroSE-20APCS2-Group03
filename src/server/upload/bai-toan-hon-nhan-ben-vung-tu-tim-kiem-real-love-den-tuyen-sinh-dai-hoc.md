Trong bài này, mình sẽ giới thiệu bài toán Hôn nhân bền vững, cùng với bí quyết tìm được cặp đôi hoàn hảo bằng một thuật toán đã đoạt giải Nobel kinh tế 2012.

Chúng ta cùng lướt qua một ví dụ thực tế như sau:

Vì quá cô đơn, Ngân đã vội đồng ý ngay khi được Hoàng tỏ tình. Cuộc tình của 2 người tưởng như êm đẹp, cho tới một hôm Ngân được Tú tỏ tình. Tú là một anh chàng đẹp trai, nhà giàu nên Ngân thích Tú hơn người yêu hiện tại của mình. Khi đó, mối quan hệ của Ngân và Hoàng trở nên không bền vững.

Vậy làm thế nào để tất cả mọi người có thể kết đôi với người mình thích ngay từ ban đầu và không có chuyện ngoại tình?

Đó chính là bài toán Hôn nhân bền vững (Stable Marriage).
## 1. Bài toán Hôn nhân bền vững (Stable Marriage Problem)
Bài toán này được phát biểu như sau: Có n bạn nam và n bạn nữ, trong đó mỗi người xếp hạng tất các mọi người khác giới từ 1 đến n theo thứ tự ưu tiên, cần tìm cách tổ thức hôn nhân sao cho không tồn tại hai người khác giới yêu nhau hơn người yêu của họ. Nếu không tồn tại những người như vậy thì tất cả các cuộc hôn nhân được xem là "bền vững."

Trong cuộc sống, chắc hẳn chúng ta gặp rất nhiều tình huống "hôn nhân không bền vững", ví dụ như ngoại tình trong hôn nhân, vừa mới vào làm đã nhăm nhe nhảy việc, chọn sai trường đại học,....

Để hạn chế tình trạng này, Gale & Shapley đã nghiên cứu ra một giải thuật mang tên chính 2 ông: Thuật toán Gale & Shapley (Gale & Shapley Algorithm).
## 2. Thuật toán Gale & Shapley
Thuật toán Gale & Shapley đã đạt giải Nobel kinh tế năm 2012 nhờ vào sự ứng dụng rộng rãi trong đời sống.

Thuật toán này còn được gọi là Thuật toán chấp nhận trì hoãn (Deferred-Acceptance Algorithm).

Tại sao lại được gọi như vậy, bởi vì thuật toán được xây dựng dựa trên ý tưởng: các bạn nam sẽ lần lượt đi tỏ tình với từng bạn nữ mà mình đang nhắm đến, với thứ tự ưa thích giảm dần. Ở phía còn lại, các bạn nữ khi được tỏ tình sẽ chưa trả lời luôn (trì hoãn) nếu như chưa có mối khác ngon hơn. :D

### Nội dung thuật toán:
* Input:	Mỗi người có một danh sách xếp hạng người khác giới theo thứ tự ưu tiên.
* Output: 	Các cặp nam-nữ (các cặp này là bền vững).
* Các bước thực hiện:
    * B1: Tại thời điểm khởi tạo, tất cả đều có một danh sách xếp hạng người khác giới, và chưa ghép cặp với ai.
    * B2: Các bạn nam lần lượt tỏ tình với cô gái đứng đầu danh sách ưa thích của mình. Các bạn nữ khi nhận được lời tỏ tình thì chỉ tạm chấp nhận. Nếu như có một bạn nam gửi lời tỏ tình đến một bạn nữ đã có một lời mời tỏ tình khác, phía bạn nữ sẽ kiểm tra trong xếp hạng ưa thích của mình và chọn bạn nam nào có thứ hạng ưa thích cao hơn.
    * B3: Lặp lại các bước 2 cho đến khi tất cả bạn nam đã gửi lời tỏ tình.
 * Demo: Nếu còn đang chưa rõ về cách thức thực hiện của thuật toán này, mời các bạn xem video mô tả sau (0:48 - 2:50): 

{@embed: https://www.youtube.com/watch?v=fudb8DuzQlM}

* Mã giả:
```
function GaleShapleyAlgorithm(man,women){
    Khởi tạo trạng thái độc thân cho tất cả man và women.
    while(tồn tại man còn độc thân mà chưa tỏ tình){
        women = women có độ ưa thích cao nhất mà man chưa tỏ tình.
       if(women đang độc thân){
           kết đôi man, women này.
       }else{  //Khi này women đang kết đôi với một bạn man'
           if(women thích man hơn man'){
               kết đôi man, women.
               man' trở thành độc thân.
           }   //Nếu else thì duy trì kết đôi giữa man' và women như bình thường.
       }
    }
}
```
* Độ phức tạp: Thuật toán này có độ phức tạp O(n^2).
* Khi thực hiện thuật toán, ta có thể cho nam tỏ tình trước hoặc nữ tỏ tình trước.  Output sẽ cho ra các cặp đôi bền vững, có lợi hơn cho bên tỏ tình.
* Trang web chạy thuật toán online: http://www.sephlietz.com/gale-shapley/
## 3. Áp dụng thực tế
Thuật toán này có vẻ đơn giản, nhưng nó được ứng dụng trong rất nhiều tình huống thực tế.
1. Y tế: Phân phối tạng của người hiến tặng cho bệnh nhân.
2. Công việc: Phân công bác sĩ thực tập đến các bệnh viện (Chương trình quốc gia về phân bổ bác sĩ nội trú Hoa Kì NRMP đang áp dụng).
3. Giáo dục: (bất ngờ nè :D) thuật toán này đã được rất nhiều giáo sư đề xuất sử dụng trong việc tuyển sinh đại học. Mình không tìm thấy bài báo nào nói Bộ Giáo dục có đang sử dụng thuật toán này hay chưa, nhưng những năm gần đây mình thấy các bạn học sinh phải sắp xếp cẩn thận thứ tự ưu tiên nguyện vọng, khi đã đỗ nguyện vọng bên trên thì sẽ không được lựa chọn những nguyện vọng bên dưới.

### Tài liệu tham khảo
1. https://www.geeksforgeeks.org/stable-marriage-problem/
2. https://thetalog.com/algorithm/deferred-acceptance/
3. https://blogm4e.wordpress.com/2016/09/09/vai-net-ve-bai-toan-hon-nhan-ben-vung/
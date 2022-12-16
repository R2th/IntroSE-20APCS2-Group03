Chắc hẳn các bạn đều ít nhiều biết đến bom tấn đình đám vừa qua: Avengers: End game. Và nếu đã xem thì trong bộ phim này có một vài chi tiết mà có thể nói là "key" của bộ phim, đó là việc các anh hùng đã sử dụng công nghệ lượng tử để về quá khứ. Tuy rất hư cấu nhưng về lý thuyết thì trong phim và ngoài đời thực khá giống nhau, chỉ khác là "thực hành" thì hiện tại đang phải nhờ đến kĩ xảo :innocent::innocent::innocent:. Nôm na thì trong phim các siêu anh hùng sẽ thu nhỏ cơ thể về mức nguyên tử để có thể xâm nhập vào cõi lượng tử Quantum Realm nơi các định luật của Newton đã không còn tính đúng đắn của nó. Nếu cứ đào sâu thì chúng ta sẽ nổ não về một mớ lý thuyết mới mà chúng ta không hề thân thuộc. 

Bài viết này nói về một thực tế hữu hình hơn, đã và đang được các nhà khoa học cũng như những tập đoàn hàng đầu thế giới như Google, Microsoft hay IBM nghiên cứu, à mà Huawei cũng manh nha nhưng chắc giờ đang bận làm việc khác rồi (cười). Thôi không lan man nữa.

![](https://images.viblo.asia/233d11ba-c424-480d-951f-da66ed9e9387.jpeg)
# Máy tính lượng tử là gì?
Nếu tra cứu trên Google thì có rất nhiều kết quả tuy nhiên nó sẽ khiến chúng ta khá "nhăn não" để hiểu, để đúng với mục đích bài viết này thì mình đã chọn lọc được một định nghĩa dễ hiểu như sau:

> Máy tính lượng tử là một loại máy tính sử dụng cơ học lượng tử để nó có thể thực hiện một số loại tính toán hiệu quả hơn so với máy tính thông thường.

Để giải thích máy tính lượng tử là gì, trước tiên chúng ta cần giải thích một chút về máy tính thông thường (không lượng tử).

### Làm thế nào một máy tính thông thường lưu trữ thông tin
Một máy tính thông thường lưu trữ thông tin dưới dạng 0 và 1.

Các loại thông tin khác nhau, chẳng hạn như số, văn bản và hình ảnh có thể được trình bày theo cách này.

Mỗi đơn vị trong chuỗi 0 và 1 này được gọi là một bit. Vì vậy, một bit có thể được đặt thành 0 hoặc 1.

### tiếp theo, nói về máy tính lượng tử?
Một máy tính lượng tử không sử dụng bit để lưu trữ thông tin. Thay vào đó, nó sử dụng qubit (Quantum bit).

Mỗi qubit không chỉ có thể được đặt thành 1 hoặc 0, mà còn có thể được đặt thành 1 và 0. Nhưng điều đó có nghĩa chính xác là gì?

Chúng ta hãy cùng tìm hiểu qua một ví dụ đơn giản.

# Một ví dụ đơn giản để hiểu cách thức máy tính lượng tử hoạt động
Bây giờ, giả sử bạn đang điều hành một công ty du lịch và bạn cần di chuyển một nhóm người từ địa điểm này sang địa điểm khác.

Để đơn giản, hãy nói rằng bạn chỉ cần di chuyển 3 người - A, B và C.

Và giả sử rằng bạn đã đặt 2 chiếc taxi cho mục đích này và bạn xếp chỗ, ai sẽ lên taxi nào.

Ngoài ra, giả sử ở đây bạn được cung cấp thông tin về ai thích ai và ai ghét ai:

A và B là bạn

A và C là kẻ thù

B và C là kẻ thù

Và giả sử rằng mục tiêu của bạn ở đây là chia nhóm 3 người này thành hai taxi để đạt được hai mục tiêu sau:

- Tối đa hóa số lượng cặp bạn bè có chung xe

- Giảm thiểu số lượng cặp kẻ thù chia sẻ cùng một chiếc xe

Được rồi, vì vậy đây là yêu cầu cơ bản của bài toán này. Trước tiên chúng ta hãy nghĩ về cách chúng ta sẽ giải quyết vấn đề này bằng máy tính thông thường.

### Giải quyết vấn đề này với một máy tính thông thường
Để giải quyết vấn đề này với một máy tính thông thường, không lượng tử, trước tiên bạn sẽ cần tìm ra cách lưu trữ thông tin liên quan bằng bit.

Hãy gắn nhãn hai taxi Taxi # 1 và Taxi # 0.

Sau đó, bạn có thể đại diện cho ai vào xe nào với 3 bit.

Ví dụ, chúng ta có thể thiết lập ba bit để 0 , 0 , và 1 đại diện:

A vào Taxi # 0

B vào Taxi # 0

C vào Taxi # 1

Vì có hai lựa chọn cho mỗi người, nên có 2 * 2 * 2 = 8 cách chia nhóm người này thành hai chiếc xe.

Dưới đây là danh sách tất cả các cấu hình có thể:

A | B | C 

0 | 0 | 0 

0 | 0 | 1 

0 | 1 | 0 

0 | 1 | 1 

1 | 0 | 0 

1 | 0 | 1 

1 | 1 | 0 

1 | 1 | 1

Sử dụng 3 bit, bạn có thể biểu diễn bất kỳ một trong những kết hợp này.

### Tính điểm cho từng cấu hình
Bây giờ, sử dụng một máy tính thông thường, làm thế nào chúng ta sẽ xác định cách xếp nào là giải pháp tốt nhất?

Để làm điều này, hãy xác định cách chúng ta có thể tính điểm cho từng giải pháp. Điểm này sẽ đại diện cho mức độ mà mỗi giải pháp đạt được hai mục tiêu đã đề cập trước đó:

- Tối đa hóa số lượng cặp bạn bè có chung xe
- Giảm thiểu số lượng cặp kẻ thù chia sẻ cùng một chiếc xe

Hãy đơn giản xác định điểm số như sau:

(số điểm của một giải pháp) = (# cặp bạn bè chia sẻ cùng một chiếc xe) - (# cặp kẻ thù chia sẻ cùng một chiếc xe)

Ví dụ: giả sử A, B và C đều vào Taxi # 1. Với ba bit, điều này có thể được biểu thị bằng 111 .

Trong trường hợp này, chỉ có một cặp bạn bè chia sẻ cùng một chiếc xe - A và B.

Tuy nhiên, có hai cặp kẻ thù chia sẻ cùng một chiếc xe - A và C, và B và C.

Vì vậy, tổng số điểm của cấu hình này là 1-2 = -1.

### Giải quyết vấn đề
Với tất cả các thiết lập ở trên, cuối cùng chúng ta cũng có thể giải quyết vấn đề này.

Với một máy tính thông thường, để tìm cấu hình tốt nhất, về cơ bản bạn sẽ phải trải qua tất cả các cấu hình để xem cái nào đạt được điểm cao nhất.

Vì vậy, bạn có thể nghĩ về việc xây dựng một bảng như thế này:

A | B | C | Điểm 

0 | 0 | 0 | -1 

0 | 0 | 1 | 1 <- một trong những giải pháp tốt nhất

0 | 1 | 0 | -1 

0 | 1 | 1 | -1 

1 | 0 | 0 | -1 

1 | 0 | 1 | -1 

1 | 1 | 0 | 1 <- giải pháp tốt nhất khác

1 | 1 | 1 | -1

Như bạn có thể thấy, có hai giải pháp chính xác ở đây - 001 và 110, cả hai đều đạt được điểm 1.

Vấn đề này khá đơn giản. Tuy nhiên sẽ trở nên khó khăn hơn nhiều để giải quyết với một máy tính thông thường khi chúng ta tăng số lượng người trong bài toán này này.

Chúng ta thấy rằng với 3 người, chúng ta cần duyệt qua 8 giải pháp có thể.

Nếu có 4 người thì sao?  Trong trường hợp đó, chúng ta sẽ cần duyệt qua 2 * 2 * 2 * 2 = 16 trường hợp.

Với n người, chúng ta sẽ cần duyệt qua (2^n) cấu hình để tìm giải pháp tốt nhất.

Vì vậy, nếu có 100 người, chúng ta sẽ cần phải duyệt qua: 2¹⁰⁰ ~ = 10³⁰ = một triệu triệu triệu triệu triệu.

Điều này chỉ đơn giản là không thể giải quyết với một máy tính thông thường.

### Giải quyết vấn đề này với máy tính lượng tử
Làm thế nào chúng ta sẽ giải quyết vấn đề này với một máy tính lượng tử?

Để nghĩ về điều đó, chúng ta hãy quay lại trường hợp chia 3 người thành hai chiếc taxi.

Như chúng ta đã thấy trước đó, có 8 giải pháp khả thi cho vấn đề này:

A | B | C 

0 | 0 | 0 

0 | 0 | 1 

0 | 1 | 0 

0 | 1 | 1 

1 | 0 | 0 

1 | 0 | 1 

1 | 1 | 0 

1 | 1 | 1

Với một máy tính thông thường, sử dụng 3 bit, chúng ta chỉ có thể đại diện cho một trong những giải pháp này tại một thời điểm - ví dụ: 001.

Tuy nhiên, **với một máy tính lượng tử, sử dụng 3 qubit , chúng ta có thể đại diện cho tất cả 8 giải pháp** này cùng một lúc .

Đầu tiên, kiểm tra qubit đầu tiên trong số 3 qubit này. Khi bạn đặt nó thành cả 0 và 1, nó giống như tạo hai thế giới song song.

Trong một trong những thế giới song song đó, qubit được đặt thành 0. Trong một thế giới khác, nó được đặt thành 1.

Bây giờ, nếu bạn đặt qubit thứ hai thành 0 và 1 thì sao? Sau đó, nó giống như tạo ra 4 thế giới song song.

Ở thế giới thứ nhất, hai qubit được đặt thành 00. Trong thế giới thứ hai, chúng là 01. Trong thế giới thứ ba, chúng là 10. Trong thế giới thứ tư, chúng là 11.

Tương tự, nếu bạn đặt cả ba qubit thành cả 0 và 1, bạn sẽ tạo 8 thế giới song song - 000, 001, 010, 011, 100, 101, 110 và 111.

Đây là lối tư duy kỳ lạ, nhưng nó là một trong những cách chính xác để diễn giải cách các qubit hoạt động trong thế giới thực.

Bây giờ, khi bạn áp dụng một số loại tính toán trên ba qubit này, bạn thực sự đang áp dụng cùng một tính toán trong tất cả 8 thế giới song song đó cùng một lúc.

Vì vậy, thay vì đi qua từng giải pháp tiềm năng đó một cách tuần tự, chúng ta có thể tính điểm của tất cả các giải pháp cùng một lúc.

Với ví dụ cụ thể này, theo lý thuyết, máy tính lượng tử của bạn sẽ có thể tìm thấy một trong những giải pháp tốt nhất trong vài mili giây. Một lần nữa, đó là 001 hoặc 110 như chúng ta đã thấy trước đó:

A | B | C | Điểm 

0 | 0 | 0 | -1 

0 | 0 | 1 | 1 <- một trong những giải pháp tốt nhất

0 | 1 | 0 | -1 

0 | 1 | 1 | -1 

1 | 0 | 0 | -1 

1 | 0 | 1 | -1 

1 | 1 | 0 | 1 <- giải pháp tốt nhất khác

1 | 1 | 1 | -1

Trong thực tế, để giải quyết vấn đề này, bạn sẽ cần cung cấp cho máy tính lượng tử hai điều kiện:

Tất cả các giải pháp được đại diện với qubit.

Một chức năng biến mỗi giải pháp thành một điểm số. Trong trường hợp này, đây là chức năng đếm số cặp bạn bè và cặp kẻ thù chia sẻ cùng một chiếc xe.

Với hai điều này, máy tính lượng tử của bạn sẽ đưa ra một trong những giải pháp tốt nhất trong vài mili giây. Trong trường hợp này, đó là 001 hoặc 110 với số điểm là 1.

Bây giờ, trên lý thuyết, một máy tính lượng tử có thể tìm thấy một trong những giải pháp tốt nhất mỗi khi nó chạy.

Tuy nhiên, trong thực tế, có lỗi khi chạy máy tính lượng tử. Vì vậy, thay vì tìm giải pháp tốt nhất, nó có thể tìm giải pháp tốt thứ hai, giải pháp tốt thứ ba, v.v.

Những lỗi này trở nên nổi bật hơn khi vấn đề ngày càng phức tạp hơn.

Vì vậy, trong thực tế, có lẽ bạn sẽ muốn chạy hoạt động tương tự trên một máy tính lượng tử hàng chục lần hoặc hàng trăm lần. Sau đó chọn kết quả tốt nhất trong số nhiều kết quả bạn nhận được.

Làm thế nào một máy tính lượng tử hoạt động.

Ngay cả với các lỗi đã đề cập, máy tính lượng tử không có vấn đề mở rộng giống như một máy tính thông thường mắc phải.

Khi có 3 người chúng ta cần chia thành hai chiếc ô tô, số lượng thao tác chúng ta cần thực hiện trên máy tính lượng tử là 1. Điều này là do một máy tính lượng tử tính toán điểm của tất cả các cấu hình cùng một lúc.

Khi có 4 người, số lượng hoạt động vẫn là 1.

Khi có 100 người, số lượng hoạt động vẫn là 1. Với một thao tác duy nhất, một máy tính lượng tử sẽ tính toán điểm của tất cả 2¹⁰⁰ ~ = 10³⁰ = một triệu triệu triệu triệu cấu hình cùng một lúc.

Như mình đã đề cập trước đó, trong thực tế, có lẽ tốt nhất là chạy máy tính lượng tử của bạn hàng chục lần hoặc hàng trăm lần và chọn kết quả tốt nhất trong số nhiều kết quả bạn nhận được.

Tuy nhiên, nó vẫn tốt hơn nhiều so với việc chạy cùng một vấn đề trên một máy tính thông thường và phải lặp lại cùng một kiểu tính toán một triệu triệu triệu triệu triệu lần.

> Bên cạnh Machine learning, Blockchain cũng như AI hay IoT thì Quantum Computing cũng là một xu hướng công nghệ không kém phần nổi bật với những đột phá mà nó mang lại, định hình mới cho nền công nghệ trong lương lai.

# Chú thích thêm

Kiến thức trong bài được tham khảo từ D-Wave Systems.

D-Wave gần đây đã ra mắt môi trường đám mây để tương tác với máy tính lượng tử.

Nếu bạn là nhà phát triển và thực sự muốn thử sử dụng máy tính lượng tử, có lẽ đó là cách dễ nhất để làm điều đó.


![](https://images.viblo.asia/bccf588c-1976-49ed-ba7d-d944f79a2255.png)


Nó được gọi là Leap và tại https://cloud.dwavesys.com/leap . Bạn có thể sử dụng nó miễn phí để giải quyết hàng ngàn vấn đề và họ cũng có các hướng dẫn dễ thực hiện khi bắt đầu với máy tính lượng tử sau khi bạn đăng ký. (Nhớ chọn Âu Mỹ nhé vì ở VN mình không khả dụng đâu)

Chú thích:

> Trong bài viết này đã sử dụng thuật ngữ máy tính thông thường để chỉ một máy tính không lượng tử. Tuy nhiên, trong ngành điện toán lượng tử, máy tính không lượng tử thường được gọi là máy tính cổ điển.
Trên thực tế, do thời gian và ngân sách nên chúng ta không thể kiểm thử cạn kiệt cho từng tập dữ liệu, đặc biệt là khi có một nhóm các điều kiện kết hợp với nhau. 
Chúng ta cần một cách dễ dàng hoặc những kỹ thuật đặc biệt nào đó có thể chọn ra được các trường hợp kiểm thử thông minh từ nhóm các trường hợp kiểm thử sao cho tất cả các case được bao phủ.  Và kỹ thuật `Phân tích giá trị biên`  và `Phân vùng tương đương`  giúp chúng ta làm được điều này.

# Phân vùng tương đương (Equivalence Partitioning)
- Phân vùng tương đương (Equivalence Partitioning) là một loại của Black box testing mà ta có thể áp dụng vào tất cả các cấp độ kiểm thử như: kiểm thử đơn vị (`unit testing`), kiểm thử tích hợp (`integration testing`), kiểm thử hệ thống (`system testing`) ...  
- Trong kỹ thuật này, các đơn vị dữ liệu đầu vào được chia thành các phân vùng tương đương. Khi chia các giá trị đầu vào thành các vùng tương đương nhau, tại mỗi vùng ta chọn 1 hoặc 1 vài phần tử đại diện, chính vì thế số lượng test case sẽ giảm => thời gian test giảm.   
- Tuy nhiên, các bạn thường thấy rằng, lỗi thường tiềm ẩn tại các ngõ ngách và biên, trong khi đó ta chọn 1 giá trị bất kì trong vùng thì sẽ không biết được giá trị biên đó nhập vào có đúng với yêu cầu của bài toán hay không  
=> Vậy nên phân tích giá trị biên là một phương pháp phù hợp giúp chúng ta giải quyết vấn đề này.

# Kiểm thử giá trị biên (Boundary Testing)
Kiểm thử giá trị biên là quá trình kiểm thử giữa các đầu cực hạn hoặc ranh giới giữa các phân vùng của các giá trị đầu vào.
Với kỹ thuật phân tích giá trị biên, chúng ta dựa vào những nguyên tắc sau:

![](https://images.viblo.asia/b76b9490-198b-4e4f-a684-ef4898a29c39.PNG)

Trong đó:
* a-1: giá trị ngay dưới mức tối thiểu
* a: giá trị tối thiểu
* a+1: giá trị ngay trên mức tối thiểu
* b-1: giá trị dưới giá trị tối đa
* b: giá trị tối đa
* b+1: giá trị ngay trên mức tối đa

Để tiến hành kiểm thử giá trị biên, chúng ta cần phân vùng giá trị tương đương trước đó.
Thiếu đi phân vùng tương đương, kiểm thử giá trị biên không thể tiến hành, đây là một phần rất quan trọng của quá trình.


# Ví dụ 1: Giá trị tương đương và biên cho kiểm thử số lượng Pizza có thể đặt
- Hãy xem xét hành vi của text box cho phép đặt Pizza dưới đây:
- Số lượng pizza từ 1 đến 10 được xem là hợp lệ. Một thông báo đặt hàng thành công sẽ hiện lên.
- Trong trường hợp khác, số lượng pizza từ 11 đến 99 sẽ được tính là không hợp lệ vì quá nhiều. Thông báo "Mỗi lần đặt hàng, bạn chỉ có thể đặt tối đa 10 chiếc pizza." sẽ xuất hiện.

{@embed: https://codepen.io/goloce/pen/gOgjxKJ}

Điều kiện kiểm thử sẽ như sau:
1. Bất kỳ Số nào lớn hơn 10 được nhập vào trường Số lượng Pizza (giả sử là 11) được coi là không hợp lệ.
2. Bất kỳ Số nào nhỏ hơn 1, chẳng hạn 0 hoặc số âm, thì nó được coi là không hợp lệ.
3. Các số từ 1 đến 10 được coi là hợp lệ
4. Bất kỳ số có 3 chữ số đều là không hợp lệ.

Chúng ta không thể kiểm thử tất cả các giá trị có thể có vì nếu được thực hiện, số lượng trường hợp kiểm thử sẽ rất nhiều. Để giải quyết vấn đề này, chúng tôi sử dụng giả thuyết phân vùng tương đương trong đó chúng tôi chia các giá trị có thể có của yêu cầu đầu vào thành các nhóm hoặc tập hợp như được hiển thị bên dưới nơi hệ thống hành vi có thể được coi là như nhau.

![](https://images.viblo.asia/f7ca8a9f-86a8-46a7-a5d1-539594c74c69.png)

Các tập hợp được chia được gọi là **Phân vùng tương đương** hoặc **Lớp tương đương**. Sau đó, chúng tôi chỉ chọn một giá trị từ mỗi phân vùng để kiểm thử. Giả thuyết đằng sau kỹ thuật này là nếu một điều kiện / giá trị trong một phân vùng vượt qua thì tất cả những điều kiện / giá trị khác cũng sẽ vượt qua. Tương tự như vậy, nếu một điều kiện trong một phân vùng không thành công, tất cả các điều kiện khác trong phân vùng đó cũng sẽ không thành công.

![](https://images.viblo.asia/a91ff614-9c81-4772-b366-44c0472f0bce.png)

Phân tích giá trị biên: bạn cần kiểm thử giới hạn cực giữa các phân vùng tương đương.

![](https://images.viblo.asia/1ae80965-381c-4092-871c-fae371a0db32.png)

Trong ví dụ về phân vùng tương đương trước đó của chúng tôi, thay vì kiểm thử một giá trị cho mỗi phân vùng, bạn sẽ cần kiểm thử các giá trị tại các phân vùng như 0, 1, 10, 11, v.v. Như bạn có thể quan sát, bạn kiểm thử các giá trị ở cả điểm cực biên hợp lệ và không hợp lệ. Phân tích giá trị biên còn được gọi là kiểm thử phạm vi.

Phân vùng tương đương và phân tích giá trị biên (**BVA**) có liên quan chặt chẽ với nhau và có thể được sử dụng cùng nhau ở tất cả các cấp độ thử nghiệm.
# Ví dụ 2: Giá trị tương đương và biên cho kiểm thử độ dài của mật khẩu

Trường mật khẩu sau chấp nhận tối thiểu 6 ký tự và tối đa 10 ký tự
{@embed: https://codepen.io/goloce/pen/jOypGbB}

Trong bài toán trên, trước hết ta sử dụng kỹ thuật phân vùng tương đương để chia thành các vùng hợp lệ và không hợp lệ:
![](https://images.viblo.asia/86c8056f-74a4-4e5b-bc74-7779e3e0285d.PNG)

Sau đó ta dùng phân tích giá trị biên:
![](https://images.viblo.asia/4e7a0f38-80e8-4d6a-b6e7-f952a45725ef.PNG)


# Trường hợp nên sử dụng phân vùng tương đương và kiểm thử biên
1. Phương pháp kiểm thử này được sử dụng để giảm một số lượng rất lớn các trường hợp kiểm thử thành các phần có thể quản lý được.
2. Hướng dẫn rất rõ ràng về việc xác định các trường hợp kiểm thử mà không ảnh hưởng đến hiệu quả của việc kiểm thử.
3. Thích hợp cho các ứng dụng tính toán chuyên sâu với số lượng lớn các biến / đầu vào

# Tổng kết
- Kiểm thử phân tích biên được sử dụng khi thực tế không thể kiểm thử một nhóm lớn các trường hợp kiểm thử riêng lẻ.
- Hai kỹ thuật bao gồm **Kỹ thuật phân tích giá trị biên** và **Kiểm thử phân vùng tương đương** được sử dụng.
- Trong **Phân vùng Tương đương**, trước tiên, bạn chia một tập hợp các điều kiện kiểm thử thành một phân vùng có thể được xem xét.
- Sau đó trong **Phân tích giá trị biên**, bạn kiểm thử ranh giới giữa các phân vùng tương đương.
- Thích hợp cho các ứng dụng chuyên sâu về tính toán với các biến đại diện cho các đại lượng vật lý
# Tài liệu tham khảo
- https://www.guru99.com/equivalence-partitioning-boundary-value-analysis.html
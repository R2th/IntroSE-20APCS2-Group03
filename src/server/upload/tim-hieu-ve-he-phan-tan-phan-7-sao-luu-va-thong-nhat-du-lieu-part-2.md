Ở phần trước mình đã giới thiệu hai phần: Giới thiệu về sao lưu và thống nhất dữ liệu và Các mô hình sao lưu hướng dữ liệu ở bài [Tìm hiểu về hệ phân tán (Phần 6: Sao lưu và thống nhất dữ liệu) - Part 1](https://viblo.asia/p/tim-hieu-ve-he-phan-tan-phan-6-sao-luu-va-thong-nhat-du-lieu-part-1-yMnKM2VmZ7P/) thì hôm nay mình sẽ giới thiệu ba mục còn lại trong phần mục lục. Cùng tìm hiểu nhé!

**Mục lục**

1.  [Giới thiệu về sao lưu và thống nhất dữ liệu](https://viblo.asia/p/tim-hieu-ve-he-phan-tan-phan-6-sao-luu-va-thong-nhat-du-lieu-part-1-yMnKM2VmZ7P#_1-gioi-thieu-0)
2.   [ Các mô hình sao lưu hướng dữ liệu](https://viblo.asia/p/tim-hieu-ve-he-phan-tan-phan-6-sao-luu-va-thong-nhat-du-lieu-part-1-yMnKM2VmZ7P#_2-cac-mo-hinh-sao-luu-huong-du-lieu-4)
3.   Các mô hình sao lưu hướng client
4.   Quản lý các bản sao
5.   Các giao thức sao lưu

# 3.  Các mô hình sao lưu hướng client
* Cung ứng đảm bảo thống nhất cho các truy cập của một client đơn vào kho dữ liệu.
* Giải quyết vấn đề nhiều tiến trình liên tục cập nhật tương tranh trên dữ liệu.
* Không đảm bảo thống nhất cho các truy cập cạnh tranh của các tiến trình khác. 
* Các kiểu mô hình: 
    * Đọc đơn điệu
    * Ghi đơn điệu
    * Đọc kết quả đã ghi
    * Ghi theo thao tác đọc 

## 3.1. Thống nhất cuối cùng (eventual consistency)
* Trong nhiều hệ thống cơ sở dữ liệu, chủ yếu các tiến trình thực hiện đọc rất ít khi thực hiện các thao tác ghi => xung đột ghi-ghi hầu như không xảy ra mà chủ yếu cần phải xem xét xung đột đọc-ghi
* Nếu một tiến trình cập nhật dữ liệu và nhiều tiến trình đang cần đọc thì phải giải quyết là làm sao các thao tác ghi được thực hiện nhanh nhất để cung cấp kết quả cho các tiến trình chỉ đọc => tính nhất quán cần hoàn toàn có thể bị vi phạm.
* Nếu trong một khoảng thời gian dài mà không xuất hiện lệnh cập nhật thì các bản sao sẽ dần dần trở nên nhất quán => gọi là Thống nhất cuối cùng.
* Thống nhất cuối cùng sẽ hoạt động tốt nếu client chỉ truy nhập đến một bản sao.
* **Vấn đề của Thống nhất cuối cùng**: khi client thực hiện cập nhật tại một bản sao và trong thời gian ngắn chuyển sang bản sao khác. Trường hợp client là thiết bị di động, việc thực hiện yêu cầu gặp khó khăn hơn =>  đảm bảo các bản sao luôn nhất quán khi mà client thay đổi về vị trí vật lý.

![](https://images.viblo.asia/ea554bed-982d-425b-81c7-0a2ca9131e63.png)
*  Ví dụ hình trên: 
    *  Người dùng sử dụng máy tính kết nối mạng không dây, việc kết nối đến bản sao hoàn toàn trong suốt đối với người sử dụng. 
    *  Sau khi cập nhật tại một bản sao người dùng di chuyển sang vị trí khác và hoàn toàn có khả năng phần mềm ứng dụng có thể kết nối đến bản sao chưa kịp cập nhật. 
    *  Sau các thao tác cập nhật tất cả các bản sao đều phải giống nhau, yêu cầu này sẽ được thực hiện tốt nếu mỗi client luôn cập nhật các bản sao. 
    *  Việc cập nhật các bản sao ngay sau khi cập nhật bản chính có thể kéo dài thời gian thực hiện, do đó lập trình viên cần dự đoán thời gian thực hiện mỗi yêu cầu và lựa chọn phương án thích hợp.

Vấn đề trên có thể giảm bớt bằng cách sử nhất quán lấy client làm trung tâm, nó đảm bảo tính nhất quán cho một client chứ không đảm bảo nhất quán cho các client khác nhau.
## 3.2. Thống nhất đơn điệu đọc 
Mô hình phải đảm bảo điều kiện sau:
* Một tiến trình thực hiện thao tác đọc trên một mục dữ liệu phải đảm bảo bất kì thao tác đọc nào cũng đều cho cùng một kết quả hay kết quả gần đây nhất.
* Đảm bảo rằng  khi một client thực hiện một thao tác đọc trên một bản sao rồi tiếp theo lại đọc trên một bản sao khác thì bản sao thứ hai kia ít nhất cũng phải được ghi giống với bản sao đầu tiên.

![](https://images.viblo.asia/1b9e20ae-8cf1-4fc3-a1d6-51595612e90a.png)

Ví dụ: Hệ thống lưu trữ gồm hai bản sao L1 và L2, **WS(xi)** là thao tác ghi xi vào mục dữ liệu, **WS(xi ,xi+1)** là thao tác bao gồm cả thao tác ghi xi vào mục dữ liệu. 
*    Trường hợp (a): 
        * Tiến trình cập nhật dữ liệu lên bản sao L1 sau đó lan tỏa đến bản sao L2.
        * Tại bản sao L2, thao tác ghi x1 là phần đầu của thao tác WS(x1 ,x2) nên client đọc bản sao trên L2 chắc chắn sẽ nhận được giá trị x2 => thỏa mãn yêu cầu thống nhất đơn điệu đọc.
*    Trường hợp (b):
    *    Bản sao L2 chỉ thực hiện thao tác ghi WS(x2) sau đó đọc được giá trị x2.
    *    Tuy nhiên thao tác WS(x1) chưa được thực hiện trên L2 nên không có gì đảm bảo sau này không đọc được giá trị x1 => trường hợp này không đáp ứng yêu cầu thống nhất đơn điệu đọc.

## 3.3. Đơn điệu ghi
Mô hình phải đảm bảo điều kiện sau:
* Các thao tác ghi của một tiến trình trên dữ liệu là rời nhau.
* Tương tự như FIFO, nhưng chỉ có giá trị với một tiến trình.
* Các thao tác ghi của một tiến trình cần được kết thúc trước khi tiến trình thực hiện bất cứ một thao tác ghi nào trên cùng một phần tử dữ liệu.
* Các thao tác ghi cần chờ các thao tác ghi trước kết thúc.

![](https://images.viblo.asia/7cb0ce8b-d1ae-48c9-8751-6b3d15469281.png)
Ví dụ: Tiến trình thực hiện thao tác cập nhật W(x1) và WS(x2).
* Trường hợp (a): bản sao L3 nhận thực hiện cả hai lệnh này theo thứ tự  => đáp ứng yêu cầu đơn điệu ghi. 
* Trường hợp (b) bản sao L2 chỉ thực hiện lệnh cập nhật W(x2), do đó lệnh cập nhật W(x1) có thể sẽ đến sau =>  không đảm bảo yêu cầu đơn điệu ghi.

## 3.4. Đọc dữ liệu ghi
Mô hình phải đảm bảo điều kiện sau:
* Trên một tiến trình, nếu thao tác đọc xảy ra sau thao tác ghi, thao tác đọc sẽ xảy ra sau khi thao tác ghi hoàn thành.
* Các thao tác đọc sẽ chờ sau khi thao tác ghi hoàn thành mới thực hiện.

![](https://images.viblo.asia/02734734-aef1-4c15-ac09-9cb5d9e7e444.png)

* Ví dụ: Tiến trình thực hiện thao tác ghi W(xi), sau đó thực hiện thao tác đọc R(xi) trên bản sao khác.
    * Trường hợp (a): thao tác W(x1;x2) thể hiện thao tác ghi W(x1) là một phần của thao tác ghi W(x2)
    * Trường hợp (b): thể hiện thao tác ghi W(x1) chưa được truyền đến bản sao L2 => không đảm bảo tính nhất quán giữa hai bản sao này.
## 3.5. Ghi sau khi đọc
Mô hình phải đảm bảo điều kiện sau:
* Thao tác ghi thực hiện sau thao tác đọc.
*  Thao tác ghi chỉ được thực hiện sau khi thao tác đọc hoàn thành.

![](https://images.viblo.asia/da3e63dc-b115-4019-b923-42527ad05c93.png)

Ví dụ: Tiến trình thực hiện thao tác ghi W(xi) sau đó thực hiện thao tác đọc R(xi) trên bản sao khác. 
* Trường hợp (a): thao tác W(x1;x2) thể hiện thao tác ghi W(x1) đã được truyền đến bản sao L2. Tiến trình đọc được kết quả thao tác ghi W(x1) sau đó mới thực hiện thao tác ghi W(x2). 
* Trường hợp (b) thể hiện thao tác ghi W(x1) chưa được lan tỏa đến bản sao L2 => không đảm bảo tính nhất quán giữa hai bản sao này.


# 4. Quản lý các bản sao
## 4.1. Quản lý máy chủ
* Lựa chọn vị trí đặt máy chủ bản sao dựa trên kết quả phân tích các thuộc tính về mạng và client sao cho độ trễ truyền thông giữa server và client có thể đạt giá trị thấp nhất. 
* Tuy nhiên trong thực tế không chỉ đơn thuần vấn đề tối ưu truyền thông server/client mà còn phải tính đến các vấn đề thương mại.
* Có nhiều cách khác nhau để tính toán vị trí tốt nhất đặt các máy chủ bản sao nhưng nhìn chung đều là vấn đề tối ưu tìm ra K vị trí tốt nhất trong số N vị trí. Những vấn đề tính toán này phức tạp và chỉ có thể được giải quyết thông qua kinh nghiệm. 
* Ví dụ có thể lấy khoảng cách giữa server và client để làm tiêu chí nhưng cũng có thể lấy tiêu chí tối ưu là vùng tự trị, tuy nhiên các thuật toán này đều có chi phí tính toán cao.

## 4.2. Quản lý nội dung

![](https://images.viblo.asia/f4d4f346-f01c-4630-ab8a-6a1b204488e6.png)

### 4.2.1. Sử dụng các bản sao cố định
* Có thể coi là tập khởi đầu của các bản sao, chúng tạo nên kho dữ liệu phân tán.
* Số lượng các bản sao cố định thường nhỏ.
* Khi cài đặt trang web có thể tổ chức theo hai cách:
    * Cách tổ chức 1:
        * Dữ liệu được sao lưu trên các bản sao khác nhau.
        * Khi có yêu cầu sử dụng dữ liệu, yêu cầu sẽ được chuyển đến một bản sao theo chiến thuật Roundrobi để xử lý.

    * Cách tổ chức 2:
        * Dùng cơ chế phản chiếu, trang web sẽ được nhân bản lên một số máy chủ phân bố dựa theo vị trí địa lý trên toàn mạng Internet. 
        * Client chọn một trong các bản sao để truy cập

* Nguyên tắc chung: không chia sẻ tài nguyên giữa các bản sao.

### 4.2.2. Bản sao kích hoạt bởi server 
* Bản sao kích hoạt bởi server được sử dụng để làm tăng hiệu năng và được tạo từ yêu cầu của kho dữ liệu.
* Các bản sao này được xếp đặt động dựa vào yêu cầu của máy chủ khác. 
* Ví dụ máy chủ web đặt tại một vị trí, bình thường vẫn xử lý các yêu cầu nhưng quản trị viên nhận thấy có sự tăng trưởng đột ngột từ một khu vực nào đó => có thể nhân bản  trang web tạm thời lên các server ở những khu vực có nhiều người truy nhập => quyết định đặt nội dung ở đâu sẽ dễ dàng hơn quyết định đặt server. 
* Giải thuật nhân bản động giải quyết hai vấn đề: 
    * Giảm tải cho bản sao cũ và đưa thông tin cần thiết gần với vị trí của người dùng.
    * Mỗi server lưu vết truy nhập của người dùng, dựa trên thông tin về nội dung và vị trí truy nhập có thể cập nhật dữ liệu lên bản sao mới gần với client hơn.

![](https://images.viblo.asia/254a6deb-9977-429b-8f9d-f96a39b55d5a.png)

* Trên hình: 
    * Tập tin F đặt tại server Q nhưng nhiều người dùng truy nhập đến tập tin này phải đi qua server P.
    * Nếu số lượng truy nhập qua P lớn hơn ngưỡng nhân bản thì sẽ tạo bản sao tập tin F trên server P. 
    * Nếu số lượng truy nhập đến tập tin F trên Q không vượt qua ngưỡng xóa thì hoàn toàn có thể loại bỏ tập tin này trên Q => sẽ giảm số lượng các bản sao.

### 4.2.2. Bản sao kích hoạt bởi client
* Bản sao kích hoạt bởi client được tạo ra từ yêu cầu của những ứng dụng nằm trên chính client.
* Ví dụ: việc ghi nhớ dữ liệu cache. 
    * Bản chất đó là vùng nhớ để client tạm thời lưu dữ liệu vừa yêu cầu. 
    * Về nguyên tắc, việc quản lý cache hoàn toàn dành cho client, kho dữ liệu không cần phải duy trì tính nhất quán.
    * Tuy nhiên trong nhiều trường hợp client có thể dựa vào sự tham gia của kho dữ liệu để thông báo cho nó khi nào dữ liệu cache đã cũ. 
    * Dữ liệu cache của client dùng để cải thiện thời gian truy nhập dữ liệu, chúng được sắp xếp tùy thuộc vào yêu cầu của người sử dụng các ứng dụng trên client. 
    * Bình thường khi client truy nhập dữ liệu nào đó, nó kết nối đến bản sao gần nhất của kho dữ liệu đã lấy ra và muốn đọc hoặc nơi nó đã thay đổi. 
    * Nếu là hệ thống khai phá dữ liệu, hiệu năng có thể cải thiện bằng cách cho phép client lưu dữ liệu đã yêu cầu trong cache ở vị trí gần => có thể lưu trên chính client hoặc trên máy tính trong mạng cục bộ cùng với client. Những lần kế tiếp dữ liệu sẽ được lấy từ cache cục bộ.

# 5. Các giao thức đảm bảo thống nhất
## 5.1. Thống nhất liên tục
### 5.1.1. Giới hạn về sai lệch giá trị
* Giả sử cần cập nhật mục dữ liệu x, mỗi thao tác cập nhật W(x) được gán trọng số weight(W) với weight(W)>0. 
* Mỗi thao tác ghi ban đầu được chuyển đến một trong số N server bản sao và server này trở thành gốc của thao tác ghi, ký hiệu origin(W). 
* Nếu xét hệ thống tại một thời điểm ta thấy một số cập nhật cần phải được truyền đến tất cả các server. 
* Mỗi server Si sẽ lưu vết nhật ký Li của các thao tác cập nhật được thực hiện trên bản sao cục bộ của mục dữ liệu x. 
* Giả sử TW[i,j] là các thao tác cập nhật được thực hiện trên server Si với yêu cầu xuất phát từ server Sj:
    * **TW[i,j] = ∑{weight(W) | origin(W) = Sj & W Є log(Si )}**
* Mục đích cần đạt là  với bất kỳ thời gian t nào thì giá trị Vi tại server Si dịch chuyển trong khoảng giá trị thực v(t) của mục dữ liệu x.
* Giá trị thực này được quyết định bởi tất cả các thao tác cập nhật, nghĩa là nếu v(0) là giá trị ban đầu của mục dữ liệu x thì giá trị thực v(t) của mục dữ liệu x được tính theo công thức:
    ![](https://images.viblo.asia/5a120faf-3526-42f3-bf0b-893bb7122092.png)

* Tập trung vào độ lệch tuyệt đối, kết hợp cận trên δi cho mỗi server Si, do đó cần phải đảm bảo
**v(t) – vi ≤ δi**.
* Các thao tác cập nhật gửi đến server Si sẽ phải lan truyền đến các server khác.

### 5.1.2. Giới hạn về sai lệch thời gian
* Cho phép server Sk giữ đồng hồ vector theo thời gian thực RVCk trong đó **RVCk[i] = T(i)**, nghĩa là server Sk đã nhìn thấy tất cả các thao tác cập nhật đã gửi cho nó đến thời điểm T(i).
* Giả thiết các thao tác cập nhật được gán nhãn thời gian và T(i) là nhãn thời gian cục bộ của server Si. 
* Khi server Sk nhận thấy T(i)-RVCk[i] vượt quá giới hạn xác định thì nó chỉ cần kéo các thao tác cập nhật xuẩt phát từ Si với nhãn thời gian lớn hơn RVCk[i]. 
* Trường hợp này server bản sao có trách nhiệm giữ cho mục dữ liệu được cập nhật mới nhất bất chấp các thao tác cập nhật xuất phát từ đâu, ngược lại với giải pháp giới hạn sai số cho phép server gốc giữ các bản sao luôn được cập nhật mới nhất bằng cách chuyển tiếp các thao tác cập nhật. 
* Trường hợp giới hạn chênh lệch trạng thái, thao tác đẩy cập nhật không đảm bảo tính nhất quán vì không biết trước thời gian lan truyền cập nhật tối đa sẽ là bao nhiêu. Do đó thao tác kéo cập nhật sẽ cải thiện tình huống này do nhiều server cùng giúp giữ cho bản sao mục dữ liệu được cập nhật mới nhất.

### 5.1.3. Giới hạn về sai lệch thứ tự thao tác
* Nguyên nhân sai lệch thứ tự thao tác là do các thao tác này chưa được khẳng định, chúng đang ở trong hàng đợi cục bộ và thứ tự thực sự của chúng đang phải chờ để được quyết định.
* Sai lệch thứ tự thao tác được giới hạn bằng cách xác định chiều dài tối đa của hàng đợi các thao tác cập nhật chưa được khẳng định.
* Như vậy việc phát hiện vi phạm nhất quán thứ tự xảy ra khi chiều dài hàng đợi này vượt quá chiều dài tối đa đã xác định trước, tại thời điểm đó server sẽ không tiếp nhận thêm các thao tác cập nhật mới gửi đến mà sẽ cố gắng thực hiện khẳng định bằng cách đàm phán với các server khác về thứ tự của các thao tác đang chờ khẳng định. 

## 5.2. Các giao thức dựa vào bản sao primary (nguyên thủy)
* Mô hình thống nhất => phức tạp
* Các nhà phát triển cần các mô hình đơn giản hơn
* Mỗi phần tử dữ liệu có một bản sao (primary) chịu trách nhiệm điều khiển các thao tác trên phần tử dữ liệu đó
    * Primary cố định (giao thức ghi từ xa)
    * Primary cục bộ (giao thức ghi cục bộ)

## 5.2.1. Giao thức ghi từ xa
* Giao thức dựa trên bản chính hỗ trợ nhân bản thực hiện theo nguyên lý tất cả các thao tác cập nhật đều được chuyển về một server cố định.
* Các thao tác đọc sẽ được thực hiện cục bộ

![](https://images.viblo.asia/90b28c80-a72a-4970-9b11-e38e504b1087.png)
 
* Ví dụ hình trên: trường hợp cần phải cập nhật mục dữ liệu x. 
    * Tiến trình sẽ chuyển thao tác cập nhật cho tiến trình trên server chính.
    * Sau khi hoàn thành cập nhật cục bộ, tiến trình trên server chính sẽ trả về kết quả cho tiến trình khởi đầu thao tác cập nhật và đồng thời thông báo cập nhật này tới các server của các bản sao khác.
    * Các bản sao sau khi hoàn thành cập nhật cục bộ cũng sẽ xác nhận với server chính. 
*  Nhược điểm giao thức nằm ở vấn đề hiệu năng
    *  Thao tác cập nhật có thể thực hiện tương đối lâu. 
    *  Tiến trình khởi xướng yêu cầu cập nhật sẽ bị phong tỏa. Trong thời gian đó có thể khắc phục bằng cách sử dụng cơ chế không phong tỏa. Tuy nhiên nếu sử dụng cơ chế không phong tỏa sẽ bị các vấn đề liên quan đến khả năng chịu lỗi. 
    *  Nếu hoạt động dựa trên cơ chế phong tỏa thì tiến trình client sẽ tin chắc thao tác cập nhật đã được hoàn thành trên tất cả các bản sao. 
    *  Giao thức dựa trên bản chính cung cấp khả năng cài đặt trực tiếp mô hình nhất quán tuần tự
    *  Server chính có thể sắp xếp tất cả các thao tác cập nhật theo thứ tự thời gian duy nhất trong toàn bộ hệ thống => các tiến trình sẽ nhìn thấy các thao tác ghi theo cùng một thứ tự và không ảnh hưởng đến kết quả các thao tác đọc trên bất kỳ bản sao nào. 
    *  Nếu sử dụng cơ chế phong tỏa thì các tiến trình luôn nhìn thấy kết quả của thao tác ghi gần nhất => điều này sẽ không được đảm bảo nếu sử dụng cơ chế không phong tỏa.

## 5.2.2. Giao thức ghi cục bộ
![](https://images.viblo.asia/1244755b-2a75-438e-8e58-cb14d59063d6.png)
* Giao thức dựa trên bản chính có thể thực hiện theo cách khác, bản sao chính di chuyển giữa các tiến trình để thực hiện thao tác ghi.
* Khi tiến trình muốn cập nhật mục dữ liệu, nó lấy bản chính của mục dữ liệu và chuyển về máy cục bộ để xử lý. 
* Sau khi hoàn thành trên máy cục bộ sẽ lan truyền thao tác cập nhật đến tất cả các bản sao khác. 
* Ưu điểm: 
    * Nhiều thao tác cập nhật liên tiếp có thể thực hiện cục bộ trong khi các tiến trình khác vẫn có thể đọc bản sao cục bộ của nó. 
    * Có thể cải thiện hiệu năng bằng phương thức không phong tỏa. 
* Giao thức này phù hợp cho các thiết bị di động hay những nơi chất lượng mạng kém và có thể hoạt động ngay cả khi không có kết nối mạng.

Bài viết cũng đã dài, mình xin kết thúc phần **Sao lưu và thống nhất dữ liệu** tại đây. Hẹn gặp mọi người ở phần tiếp theo của series là Tính chịu lỗi (Fault Tolerance) trong hệ phân tán.

Thanks for reading:sparkling_heart:

**Tài liệu tham khảo**: Bài giảng Hệ phân tán - DHBKHN
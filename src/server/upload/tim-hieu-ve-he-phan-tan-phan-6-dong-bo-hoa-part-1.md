Nối tiếp chuỗi serises về hệ phần tán thì phần tiếp theo này chúng ta sẽ tìm hiểu bằng cách nào các tiến trình đồng bộ hóa được với nhau. Cùng tìm hiểu nhé! Let's go.

**Mục lục**
* (1) Đồng bộ hóa đồng hồ (Clock Synchronization)
* (2) Đồng hồ logic (Logical clock)
* (3)[ Loại trừ lẫn nhau (Mutual exclusion) ](https://viblo.asia/p/tim-hieu-ve-he-phan-tan-phan-5-dong-bo-hoa-part-2-Qbq5Q94X5D8#_3-mutual-exclusion-0)
* (4) [Các giải thuật bầu chọn (Election algorithm)](https://viblo.asia/p/tim-hieu-ve-he-phan-tan-phan-5-dong-bo-hoa-part-2-Qbq5Q94X5D8#_4-election-algorithm-4)

Ở phần này mình sẽ chia làm 2 phần con nữa nhé. Bài này mình sẽ nói vể mục (1) và (2)

# 1. Clock Synchronization
* Trong một hệ tập trung, thời gian hệ thống là riêng biệt. 
* Khi một tiến trình muốn biết thời gian hệ thống, nó chỉ cần đưa ra 1 lời gọi hệ thống và đợi kernel trả lời. 
* Nếu tiến trình A hỏi thời gian, ngay sau đó tiến trình B hỏi thời gian, thì thời gian mà B nhận được sẽ lớn hơn (hoặc bằng) so với thời gian mà A nhận được. Và không bao giờ thời gian B nhận được nhỏ hơn A. 
* Tuy nhiên trong một hệ thống phân tán, để đạt được sự thống nhất về thời gian như vậy là không hề đơn giản.

Ví dụ chương trình *make* của Unix
* Trong Unix, các chương trình lớn được chia nhỏ thành nhiều file nguồn để khi có thay đổi trong 1 file nguồn thì chỉ có file đó phải được biên dịch lại mà không phải là tất cả chương trình. 
* Nếu 1 chương trình có 100 files, thì không nhất thiết phải biên dịch lại toàn bộ bởi 1 file bất kì thay đổi với tốc độ cao hơn bất kì 1 người lập trình nào có thể làm việc. 
*  Khi lập trình viên thay đổi file nguồn và chạy lệnh make thì thời điểm đó được đánh dấu cho tất cả các file nguồn đã bị modify. 
*  Nếu file *output.c* có thời gian là 2151 và file đối tượng tương ứng của nó *output.o* có thời gian là 2150 thì lệnh make hiểu rằng *output.c* đã bị thay đổi sau khi *output.o* được tạo ra. Như vậy cần phải biên dịch lại *output.c* để cho ra phiên bản *output.o* mới. 
*  Trường hợp khác, nếu thời gian của *output.o* là 2144, *output.c* là 2143 thì không cần biên dịch lại file này. 
 
 => Như vậy lệnh make kiểm tra lại toàn bộ file nguồn và chỉ gọi trình biên dịch biên dịch những file cần thiết.
 
 Nếu hệ thống không đạt được sự thống nhất về thời gian, sự việc sẽ xảy ra như sơ đồ sau:
 
 ![](https://images.viblo.asia/d276c856-4311-4b8e-a900-a183da6361c6.png)

* File output.o có thời gian là 2144 và gần như ngay sau đó output.c bị thay đổi nhưng lại được đánh dấu thời gian là 2143 vì đồng hồ trên máy đó chậm hơn 1 chút. Do đó lệnh make sẽ không gọi trình biên dịch. Kết quả là chương trình được biên dịch ra lẫn lộn giữa các đối tượng từ file nguồn cũ và mới. Dẫn đến có lỗi trong chương trình mà lập trình viên không thể kiểm soát hoặc hiểu được.

## 1.1. Physical Clock (Đồng hồ vật lý)
* Trong một số hệ thống (như hệ thống thời gian thực), thời gian hiện tại là rất quan trọng. Vì thế việc sử dụng các đồng hồ vật lý bên ngoài là cần thiết. 
* Vì các lý do hiệu suất và độ phức tạp, việc phát triển một hệ thống các đồng hồ vật lý đặt ra 2 vấn đề lớn: 
    * Làm sao để đồng bộ chúng với các đồng hồ thực tế trên thế giới.
    * Làm sao để đồng bộ chúng với nhau? 

Trước tiên ta xem xét sơ qua việc làm sao đo được thời gian.
![](https://images.viblo.asia/c5604810-ffd0-477b-89ff-ba0ee3b32e20.png)
* Ban đầu, người ta tính thời gian dựa trên sự dịch chuyển của mặt trời (sự tự quay quanh trục của trái đất). 
* Theo đó, khoảng thời gian giữa 2 lần mặt trời xuất hiện liên tiếp ở cùng 1 vị trí được gọi là ngày mặt trời. 
* Mỗi một ngày mặt trời được chia ra làm 86400 giây mặt trời.
*  Nhìn trên hình vẽ: vào những năm 40 của thế kỉ trước, người ta phát hiện ra rằng trái đất đang quay chậm dần đều dưới tác động ma sát của thủy triều và bầu khí quyển. Thực tế thì khoảng thời gian của 1 năm hầu như ko đổi (là khoảng thời gian trái đất quay 1 vòng quanh mặt trời) nhưng độ dài của 1 ngày đã bị thay đổi. Người ta đành đo khoảng thời gian của 1 số cực lớn các ngày, lấy trung bình và chia khoảng thời gian trung bình đó ra làm 86400 giây mặt trời.

Vào năm 1948, đồng hồ nguyên tử ra đời làm cho việc đo thời gian chính xác hơn rất nhiều, đồng thời tách khái niệm thời gian ra khỏi sự vận động của trái đất.
* Đồng hồ nguyên tử hoạt động dựa trên cơ sở đếm số dao động trạng thái của nguyên tử Cesium(Cs) 133. 
* Mỗi 1 giây, nguyên tử Cs dao động 9 192 631 770 lần
* Số dao động của đồng hồ Cs 133 tính từ nửa đêm ngày 1 tháng 1 năm 1958 đến nay chia cho 9 192 631 770 gọi là TAI để tính thời gian

![](https://images.viblo.asia/4fe45120-662b-4468-9bb5-fb2bc2191244.png)

* Tuy nhiên, TAI lại có một vấn đề là cứ 86400TAIs sẽ có 3ms chậm hơn so với đồng hồ mặt trời.

Do đó để thống nhất thời gian vật lý người ta đã đưa ra khái niệm thời gian phối hợp toàn cầu UTC (Coordinated Universal Time). 

## 1.2. Clock synchronization algorithm (Các giải thuật đồng bộ)
Nếu tất cả các máy tính đều có WWV Receiver thì việc đồng bộ chúng là dễ dàng vì tất cả đều cùng đồng bộ với giờ chuẩn quốc tế UTC. Tuy nhiên khi không có WWV thì việc đồng bộ được thực hiện bằng các giải thuật đồng bộ sau.
### Giải thuật Cristian
Giả sử trong hệ phân tán có một máy chủ thời gian gọi là Time server và chúng ta sẽ tiến hành đồng bộ các máy khác với máy này như hình sau:

![](https://images.viblo.asia/eca96739-f336-475c-88c8-2ce789504e0b.png)

* Client A gửi yêu cầu đến Time Server và thời gian đánh dấu đồng hồ cục bộ của A là T1.
* Server B nhận được yêu cầu đồng bộ của A tại thời điểm T2, và ghi lại thời điểm nhận là T2 theo đồng hồ của B.
* Đến thời điểm T3 theo đồng hồ của B, nó gửi cho A nhãn thời gian là T3 để A đặt lại thời gian là T3 và sẽ giử kèm theo cả T1 và T2.
* Nhưng do độ trễ của mạng khi trả lời nên tại thời điểm T4 tính theo đồng hồ của A nó mới nhận được phản hồi của B.
* Bây giờ A có thông tin cả T1, T2, T3 và T4.

Trong hình vẽ mọi người sẽ thấy có 1 công thức. Đó là công thức tính **độ lệnh thời gian θ**. Giá trị này có thể âm hoặc dương
  * Nếu θ > 0: thời gian Client  tăng lên θ giây.
  * Nếu θ < 0: thời gian Client  chậm hơn θ giây.

Giả sử độ trễ truyền từ A -> B và từ B -> A là như nhau. Ta sẽ có **dTreq = dTres**. Trong đó:
* dTreq là độ trễ mạng khi gửi yêu cầu.
* dTres là độ trễ mạng khi truyền phản hồi.
Ta có công thức sau (công thức có trong hình rồi đó:grin:):
```php
θ = T3 + dTres – T4
  = T3 + ((T2-T1)+(T4-T3))/2 – T4
  = ((T2-T1)+(T3-T4))/2
```
Trong đó
```php
T2 = T1 + θ + dTreq
T4 = T3 - θ  + dTres
```
### Giải thuật Berkeley

![](https://images.viblo.asia/99aad45a-b75e-4ceb-90eb-9f5f3d888082.png)

* Server chủ động cho các máy khác biết thời gian chuẩn của mình là Cutc 
* Sau đó yêu cầu thông tin về thời gian của các client.
* Client trả lời khoảng thời gian chênh lệch giữa nó và server.
* Server tính khoảng thời gian mà các client so với thời gian chuẩn của server lúc đó và gửi cho các máy khách cách điều chỉnh thời gian cho phù hợp.
### Giải thuật trung bình sử dụng mạng không dây
* Chia thời gian thành những khoảng đồng bộ cố định. 
* Khoảng thời gian I sẽ bắt đầu từ thời điểm (To + i.R) và chạy đến khi To+(i+1)R với: 
    * To là thời điểm xác định trước 
    * R là một biến hệ thống .
* Vào thời điểm bắt đầu của mỗi lần đồng bộ, tất cả các máy của mạng sẽ broadcast thời gian của mình .
* Sau khi broadcast nó bắt đầu thu thập thời gian mà các máy khác gửi đến trong khoảng thời gian S. 
* Sau đó bỏ đi giá trị lớn nhất và nhỏ nhất rồi tính trung bình của các giá trị thời gian còn lại.

# 2. Logical Clock
Khái niệm đồng hồ logic ra đời trong trường hợp giữa các tiến trình không nhất thiết phải phù hợp theo thời gian thực tế mà chỉ cần khớp với nhau về thời gian
## 2.1. Nhãn thời gian Lamport
###  Xét định nghĩa mối quan hệ “xảy ra trước” (→)
Khi có a→ b : 
* a xảy ra trước b thì tất cả các tiến trình trong hệ phân tán thỏa thuận sự kiện a xảy ra trước rồi đến sự kiện b.
* Trong đó a và b là hai sự kiện của cùng một tiến trình. 
* Nếu a xảy ra trước b thì a→b là đúng.
* Nếu a là sự kiện bản tin được gửi bởi một tiến trình nào đó và b là sự kiện bản tin đó được nhận bởi một tiến trình khác thì quan hệ a→ b là đúng.
* Quan hệ xảy ra trước có tính bắc cầu: a→ b, b→c thì a→c.

### Time Stamps
Cập nhật bộ đếm Ci cho tiến trình Pi
* (1) Trước khi thực thi sự kiên Pi thực thi Ci ←Ci+1
* (2) Khi tiến trình Pi gửi 1 thông điệp m cho Pj, nó sẽ set timestamp ts(m) băng Ci sau khi đã thực hiện ở bước trước
* (3) Khi nhận được thông điệp m, tiến trình Pj điều chỉnh bộ đếm cục bộ của chính nó là Cj ← max {Cj, ts(m)}. Sau đó nó sẽ thực hiện bước (1) và gửi thông điệp đến ứng dụng.

## 2.2. Vector clocks
* Giải thuật đưa ra một vetor clocks VC(a) gán cho sự kiện a có thuộc tính là 
    * nếu VC(a) < VC(b) thì sự kiện a là nguyên nhân của b.
* Trong vector clock mỗi tiến trình Pi lưu giữ một VCi với giá trị N (các tiến trình khác nhau thì N khác nhau) 
* VCi[i] là số các sự kiện đã xảy ra tại Pi
    - Nếu VCi[j] = k nghĩa là Pi biết đã có k sự kiện đã xẩy ra tại Pj
- Yêu cầu là mỗi khi có sự kiện mới xảy ra ở tiến trình Pi thì phải tăng VCi[i] và phải đảm bảo vector này được gửi cùng thông điệp suốt trong quá trình. 
- Từ đó bên nhận sẽ biết được đã có bao nhiêu sự kiện xảy ra tại Pi .
- Quan trọng hơn phía nhận sẽ báo cho biết là đã có bao nhiều sự kiện ở các tiến trình khác đã xảy ra trước khi Pi gửi thông điệp m. 

Cách cập nhật vector:
- Thiết lập VCi[j] =0 với mọi j,i
- Sự kiện xảy ra ở Pi là nguyên nhân tăng VCi[i]
- Pi gắn một timestamp ts(m)=VCi vào mọi thông điệp gửi đi
- Khi Pi nhân được một thông điệp có ts(m) nó sẽ thiết lập  VCi[j]=Max{Vi[j] ,ts(m)[j]} và tăng VCi[i]

Đến đây mình kết thúc part 1 ở đây. Ở [phần tiếp theo](https://viblo.asia/p/tim-hieu-ve-he-phan-tan-phan-5-dong-bo-hoa-part-2-Qbq5Q94X5D8) mình sẽ nóí tiếp vê mục (3) và (4) ở phần mục lục nhé!

Thanks for reading:sparkling_heart:

**Tài liệu tham khảo**:  Bài giảng Hệ phân tán - ĐHBKHN
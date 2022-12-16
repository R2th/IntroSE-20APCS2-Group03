# 1. Các nhu cầu an toàn thông tin:
* Với sự phát triển trong thời kì 4.0 ngày nay thì gần như mọi thông tin đều được số hóa và được gửi qua mạng internet.
* Chính vì thế mà tăng khả năng bị rò rỉ thông tin, bị lộ thông tin hoặc bị thay đổi thông tin trên đường truyền. Đây cũng chính là nguyên nhân xuất hiện các hacker.
* Vậy mã hóa, hàm băm sinh ra để làm gì? 
    * Bảo vệ thông tin trong quá trình truyền thông tin trên mạng (Network Security)
    * Bảo vệ hệ thống máy tính, và mạng máy tính,khỏi sự xâm nhập phá hoại từ bên ngoài (System Security)

=> Tóm lại, mã hóa và hàm băm sinh ra để biến dữ liệu thành 1 chuỗi kí tự không thể hiểu được nhằm ngăn chặn các hiện tượng như sau.

# 2. Các tình huống tấn công:

## Xem trộm thông tin(Release of Message Content):

   * *Trong trường  hợp  này Trudy chặn các thông điệp  Alice gửi  cho Bob, và xem được nội dung của thông điệp*.*
     ![](https://images.viblo.asia/682bd231-73ba-4445-bd69-b99a44133041.png)
     
## Thay đổi thông điệp (Modification of Message): 
*Trudy chặn các thông điệp Alice gửi cho Bob và ngăn không cho các thông điệp này đến đích. 
Sau đó Trudy thay đổi  nội  dung  của thông điệp  và  gửi  tiếp  cho  Bob. Bob nghĩ rằng nhận được thông điệp nguyên bản ban đầu của Alice mà không biết rằng chúng đã bị sửa đổi.*
    ![](https://images.viblo.asia/2941c017-7019-411d-8e8d-aaeb4b7f5452.png)
## Mạo danh(Masquerade):
*Trong trường hợp này Trudy giả là  Alice gửi thông điệp cho Bob. 
Bob không biết điều này và nghĩ rằng thông điệp là của Alice.*
    ![](https://images.viblo.asia/1c107d01-c5b1-4440-8d08-11fa3f94fbb3.png)
## Phát lại thông điệp (Replay): 
*Giả sử Bob là ngân hàng còn Alice là một khách hàng. 
Alice gửi thông điệp đề nghị Bob chuyển cho Trudy 1000$. 
Alice có áp dụng các biện pháp như chữ ký điện tử với mục đích không cho Trudy mạo danh cũng như sửa thông điệp. 
Tuy  nhiên nếu Trudy sao  chép  và  phát  lại thông điệp  thì  các  biện  pháp  bảo  vệnày không có ý nghĩa. 
Bob tin rằng Alice gửi tiếp một thông điệp mới đểchuyển thêm cho Trudy 1000$ nữa.*
  ![](https://images.viblo.asia/f60e8e28-967c-4f62-be55-f02cb42d8f5d.png)
#  3. Yêu cầu của một hệ truyền thông tin an toàn và bảo mật:
* Tính bảo mật (Confidentiality): Ngăn chặn được vấn đề xem trộm thông điệp.
* Tính chứng thực (Authentication): Nhằm đảm bảo cho Bob rằng thông điệp mà Bob nhận được thực sựđược gửi đi từ Alice, và không bịthay đổi trong quá trình truyền tin. Như vậy tính chứng thực ngăn chặn các hình thức tấn công sửa thông điệp, mạo danh, và phát lại thông điệp.
* Tính không từ chối (Nonrepudiation):  
    - Xét tình huống sau:   
        * Giả sử Bob là nhân viên môi giới chứng khoán của Alice. 
        * Alice gởi thông điệp  yêu cầu  Bob mua cổ phiếu của công ty Z. 
        * Ngày hôm sau, giá cổ phiếu công ty này giảm hơn 50%. Thấy bị thiệt hại, Alice nói rằng Alice không gửi thông điệp nào cả và quy  trách nhiệm cho Bob. 
        * Bob phải có cơ chế để xác định rằng chính Alice là người gởi mà Alice không thể từ chối trách nhiệm được.
    ![](https://images.viblo.asia/2ee55379-1b12-4c47-af7c-7bfc09d11138.png)
# 4.Mã hóa:
**Mã hóa là gì:**
* Là những thuật toán nhằm biến đổi thông tin thành 1 chuỗi các kí tự vô nghĩa để đảm bảo rằng những người ở giữa đường truyền dù có bắt được gói tin nhưng cũng không hiểu được.
    * Mã hóa đảm bảo tính bí mật(Confidentiality), tính toàn vẹn dữ liệu( Authentication) và tính chống chối từ (Nonrepudiation).
    * Mã hóa được chia ra thành 2 loại:
        * Mã hóa đối xứng (Sử dụng 1 key để vừa mã hóa vừa giải mã )
        * Mã hóa bất đối xứng (Sử dụng 2 key : 1 key để giải mã và 1 key để mã hóa
*  Từ khóa trong mã hóa:
    - Ta sẽ quy định với nhau:
        - 1 thuật toán mã hóa sẽ có 
             - P: bản rõ ( là thông tin đầu vào - Plain text )
             - C: bản mã ( là thông tin đầu ra đã được mã hóa - Cipher text )
             - K: Khóa ( mỗi 1 thuật toán mã hóa sẽ có 1 key để mã hóa và giải mã - *chỉ đối với thuật toán mã hóa đối xứng* )
## 4.1: Mã hóa đối xứng 
* **Mã hóa cổ điển:**
    - **Mã hóa** **Ceasar**: 
        * Đây cũng chính là thuật toán mã hóa mở đầu cho công cuộc an toàn thông tin.
        * Thế kỷ thứ 3 trước công nguyên, nhà quân sự người La Mã Julius Ceasar đã nghĩ ra phương pháp mã hóa một bản tin như sau: 
                * Thay thế mỗi chữ trong bản tin bằng chữ đứng sau nó k vị trí trong bảng chữ cái.
            - Giả sử k = 3:
            Chữ ban đầu: a b c d e f g h i j k l m n o p q r s t u v w x y z
            Chữ thay thế: D E F G H I J K L M N O P Q R S T U V W X Y Z A B C
            (sau Z sẽ vòng lại là A, do đó x -> A, y -> B và z -> C).
 Giả sử có bản tin gốc (bản rõ): meet me after the toga party
            Như vậy bản tin mã hóa (bản mã) sẽ là: PHHW PH DIWHU WKH WRJD SDUWB
*  Phương pháp Ceasar được biểu diễn như sau: với mỗi chữ cái p thay bằng chữ mã hóa C, trong đó:
    *  **C = (p + k) mod 26  (trong đó mod là phép chia lấy số dư)**
* Và quá trình giải mã đơn giản là:
    * **p = (C – k) mod 26**
    * k được gọi là khóa. Dĩ nhiên là Ceasar và cấp dưới phải cùng dùng chung một giá trị
khóa k, nếu không bản tin giải mã sẽ không giống bản rõ ban đầu.
    * Nhưng thuật toán này giờ không còn an toàn và phù hợp với sự phát triển của khoa học công nghệ ngày nay. 1 ví dụ đơn giản như sau: 
    * Giả sử đối thủ của Ceasar  có được bản mã PHHW  PH  DIWHU  WKH  WRJD  SDUWB và biết được phương pháp mã hóa và giải mã là phép cộng trừ modulo 26. 
    * Đối thủ có thể thử tất cả 25 trường hợp của k như sau:
    
    ![](https://images.viblo.asia/9a14f777-1cb3-45b7-a63c-3c15624b631a.png)
### *  Mã hóa hiện đại:
*  Xuất phát từ điểm yếu của mã hóa cổ điển như không gian quét nhỏ (có thể sử dụng phương pháp vét cạn để phá mã) thì mã hóa hiện đại có thuật toán phức tạp hơn, nhiều bước mã hóa hơn => Phá mã khó hơn rất nhiều.
*  Khác với việc sử dụng bảng chữ cái và chữ số để thực hiện việc mã hóa và giải mã thì thuật toán hiện đại chuyển đổi dữ liệu đầu vào thành chuỗi các bit và thực hiện việc mã hóa và giải mã trên mã bit đó. 
*  **Mã hóa hiện đại (DES):**
    - 1 thuật toán mã hóa khối hiện đại điển hình là thuật toán mã hóa DES:
        * Kích thước đầu vào dữ liệu của khối là 64 bit:  
* Ví dụ bản tin, meetmeafterthetogaparty‟, biểu diễn theo mã ASCII thì mã DES sẽ mã hóa làm 3 lần, mỗi lần 8 chữ cái (64 bít): meetmeaf - tertheto – gaparty.*
Meetmeaf = 01101101 01100101 01100101 01110100 01101101 01100101 01100001 01100110
( 1 chữ cái = 1 byte = 8 bit )
* **Thuật toán sẽ trải qua 16 ROUND.**
* **Kích thước của khóa là 56 bit.**
* Mỗi vòng của DES dùng khóa con có kích thước 48 bít được trích ra từ khóa chính.
    * 1 số khái niệm trước khi ta xem mô hình mã hóa của thuật toán: 
        * Hoán vị (permutation)  : 01101101(m) → 01111010(z)
        * Dịch vòng trái (Left circular shift): 01101101 → 11011010 ( dịch trái 1 bit)
        * Nén khóa: 01101101( 8bit ) → Nén →011011(6 bit )
        * Đổi 2 nửa đầu, cuối: 01101101 →  11010110
        
![](https://images.viblo.asia/291b5c77-2b55-4f6c-889d-ca257b2f5cb0.png)
* Thuật toán mã hóa bất đối xứng( thuật toán mã hóa khóa công khai ) sử dụng 2 khóa để mã hóa và giải mã.
    * Public key: Dùng để mã hóa.
    * Private key: Dùng để giải mã.
* *Vậy nguyên nhân do đâu mà chúng ta lại phát minh thêm mô hình mã hóa bất đối xứng?*
    * Ở mô hình này, ta phải gửi key qua 1 kênh an toàn sẽ dẫn đến việc lãng phí tài nguyên và thời gian chậm hơn.
    * Mặt khác việc mã hóa và giải mã đều phụ thuộc vào 1 key duy nhất nên nếu lộ key thì hacker có thể phá mã dễ dàng.

**Bài toán 1: Giả sử Alice muốn gửi dữ liệu cho Bob dùng mã hóa khóa công khai, trước tiên:**

* Alice và Bob sẽ chọn cặp khóa riêng-khóa công khai. Ký hiệu khóa riêng-khóa công khai của Alice là Kra và Kua , của Bob là Krb và Kub.
* Vậy để Alice gửi dữ liệu cho Bob: mã hóa dữ liệu bằng khóa công khai Kub của Bob, và Bob dùng khóa riêng Krb để giải mã. 
            ![](https://images.viblo.asia/d51eb2dd-dd93-4720-bfdf-d8fc5e06374a.png)
            
* C = E(M, K UB )
* M = D(C, K RB )

### Vậy điều gì sẽ xảy ra nếu chị Ngọc cũng có Kub ? 

Chị Ngọc sẽ mạo danh là Alice và sử dụng Kub của Bob để mã hóa dữ liệu và gửi cho Bob, Bob dùng Krb của mình giải mã ra và đọc như bình thường và không biết rằng đấy là dữ liệu mà chị Ngọc đưa vào thay vì Alice.
![](https://images.viblo.asia/d51eb2dd-dd93-4720-bfdf-d8fc5e06374a.png)

**Bài toán 2: Giả sử Alice gửi dữ liệu cho Bob yêu cầu Bob mua cổ phiếu của công ty A, nhưng công ty A phá sản nên Alice từ chối trách nhiệm gửi cho Bob và cho rằng người khác gửi cho Bob:**

* Để đảm bảo tính chứng thực và Alice không từ chối trách nhiệm gửi dữ liệu, Alice: 
* Sẽ dùng phương án 2: Alice mã hóa dữ liệu bằng khóa riêng Kra , và Bob dùng khóa công khai Kua của Alice để giải mã.
* Alice sẽ mã hóa dữ liệu mình muốn gửi đi bằng Kra sau đó, gửi cho người nhận Kua của mình để giải mã dữ liệu của Alice. Vì chỉ có Alice mới có Kra nên Alice không thể chối từ trách nhiệm gửi dữ liệu.
![](https://images.viblo.asia/92eec44f-aef0-4cd1-be41-70f063804974.png)

**Vậy ứng dụng của mô hình mã hóa bất đối xứng là gì?**
* Chính là ứng dụng Chữ ký số mà ta đang sử dụng ngày nay.
* SSH key trong git chính là 1 ví dụ điển hình về chữ ký số.
**SSH keys:**

* Cơ chế của SSH keys là sinh ra cho chúng ta 1 cặp key : Public Key và Private Key, trong đó: 
    * Private Key sẽ được lưu trong 1 thư mục ở máy tính và được gửi lên mỗi khi ta push code lên git.
    * Public Key sẽ được lưu lại trên server (Github, Gitlab).
Khi ta push code lên thì server Github, Gitlab sẽ kiểm tra 2 key bằng thuật toán của mình, nếu hợp lệ thì thực hiện tác vụ tiếp theo còn nếu không thì hủy bỏ tác vụ đang thực hiện.
* Private Key: 
![](https://images.viblo.asia/f910836b-5f92-4445-9323-25a02744c3f7.png)
* Public Key: 

    ![](https://images.viblo.asia/d53361c3-35fe-41cc-b990-a106b72c75d6.png)
    ![](https://images.viblo.asia/b624077a-83f3-4ff0-b48a-3f84419c82b1.png)
 
*  Đây chính là 1 số màu sắc về mã hóa hi vọng các bạn yêu thích <3
*  *Nguồn tham khảo:  Trường đại học Nha Trang - Khoa CNTT ( Bài giảng An Toàn Thông Tin )*
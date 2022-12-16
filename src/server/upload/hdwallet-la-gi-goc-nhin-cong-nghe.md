**Warning** : bài viết này là tổng hợp theo sự tìm hiểu cũng như phân tích từ khía cạnh công nghệ của HDWallet nên nó khá là phức tạp mọi người chuẩn bị tinh thần nhé .

![](https://images.viblo.asia/fdfce3c9-b4d5-424e-965e-80994171e9a4.png)

Bên cạnh các loại ví như **Non-Deterministic (Random) Wallets** , **Deterministic (Seeded) Wallets** thì ta có thêm **Hierarchical Deterministic Wallets (BIP0032/BIP0044)** ngắn gọn là HDwallet hay còn được biết với cái tên ví phân cấp xác định . Được giới thiệu trong BIP 32 và sau đó được cải thiện bởi BIP 44. ( BIPs được viết tắt của Bitcoin Improvement Proposals , các giải pháp cải tiến Bitcoin ). Mặc dù ví HD được cộng đồng Bitcoin giới thiệu, nhưng đây là cấu trúc ví hỗ trợ nhiều loại tiền điện tử khác nhau. Trước khi vào thẳng HDwallet là gì thì chúng ta nên đảo qua định nghĩa về **Mnemonic** một chút.

## Mnemonic Code Words
Mã Mnemonic ( từ gợi nhớ ) là các chuỗi từ tiếng Anh đại diện cho việc mã hóa một số ngẫu nhiên được sử dụng làm seed để lấy ra một ví xác định. Chuỗi các từ này đủ để tạo lại seed và từ đó tạo lại ví và tất cả các khóa trong đó. Các ứng dụng ví hiện nay sẽ hiển thị cho người dùng một chuỗi 12-24 khi lần đầu tiên tạo ví. Chuỗi từ đó có thể được sử dụng để khôi phục và tạo lại tất cả các khóa trong cùng hoặc bất kỳ ứng dụng ví tương thích nào khác. Các **từ gợi nhớ này** giúp người dùng dễ nhớ hơn, vì chúng dễ đọc và phiên âm chính xác, so với một chuỗi số ngẫu nhiên. 

Việc tạo các từ nhớ được mô tả như sau  :

1. Tạo một chuỗi ngẫu nhiên (thỏa mãn entropy) từ 128 đến 256 bit
2. Tạo một checksum của chuỗi ngẫu nhiên bằng cách lấy một vài bit đầu tiên của SHA256 hash
3. Thêm checksum vào cuối chuỗi ngẫu nhiên đó
4. Chia chuỗi thành này thành các phần 11 bit khác nhau, sử dụng các phần này để lập chỉ mục tới 2048 từ được xác định trước
5. Tạo ra 12-24 từ đại diện cho mã chuỗi ngẫu nhiên này

Dưới đây là hình minh họa chi tiết để dễ hiểu hơn :
![](https://images.viblo.asia/3b6b8298-055b-41a8-9001-93b62e954942.png)


## HDwallet là gì 
Vậy HDwallet là gì ? Nói một cách đơn giải thì đây là một public/private key tree bắt đầu từ một node gốc ( master node) , sao cho khóa cha có thể lấy được một chuỗi các khóa con, mỗi khóa đó có thể lấy được một chuỗi các khóa cháu và cứ thế tiến sâu đến vô tận. Dưới đây là một hình minh họa .

![](https://images.viblo.asia/fdfce3c9-b4d5-424e-965e-80994171e9a4.png)

## Lợi ích của nó 

Đầu tiên, cấu trúc cây có thể được sử dụng để thể hiện ý nghĩa tổ chức, chẳng hạn như khi một nhánh khóa phụ cụ thể được sử dụng để nhận thanh toán đến và một nhánh khác được sử dụng để nhận thay đổi từ thanh toán đi. Các nhánh của khóa cũng có thể được sử dụng trong môi trường doanh nghiệp, các nhánh khác nhau cho các phòng ban, công ty con, v.v..

Ưu điểm thứ hai của ví HD là người dùng có thể tạo một chuỗi các khóa công khai mà không cần truy cập vào các khóa riêng tương ứng ( đây là đặc điểm được so sánh với Non-Deterministic (Random) Wallets , loại ví này tạo ra các private key ngẫu nhiên rồi tạo ra public key từ các private key tương ứng ). Điều này cho phép ví HD được sử dụng trên máy chủ không an toàn .

## Quá trình tạo ví
HDwallet được tạo từ một một seed gốc, đó là một số ngẫu nhiên 128, 256 hoặc 512 bit. Mọi thứ khác trong ví HD đều có nguồn gốc rõ ràng từ seed gốc, cho phép tạo lại toàn bộ ví HD từ seed. Điều này giúp bạn dễ dàng sao lưu, khôi phục, xuất và nhập HDwallet chứa hàng ngàn hoặc thậm chí hàng triệu khóa chỉ bằng cách chuyển seed gốc. Seed gốc thường được biểu thị bằng một chuỗi từ nhớ, như được mô tả trong phần trước về Mnemonic. 

Dưới đây là hình minh họa :

![](https://images.viblo.asia/6dbb4376-1fb9-45c2-8f03-e782f8768bdb.png)

Seed gốc được nhập vào thuật toán HMAC-SHA512 và hàm băm kết quả được sử dụng để tạo private key (m) và Master chain code. Private key (m) sau đó tạo master public key (M) tương ứng, bằng cách sử dụng thuật toán normal elliptic curve. Master Chain code được sử dụng để tạo entropy trong chức năng tạo khóa con từ khóa cha, như chúng ta sẽ thấy trong phần tiếp theo.

## Tạo Private child key
HDwallet sử dụng chức năng sinh khóa con (CKD- child key derivation ) để lấy được khóa con từ khóa cha. Các hàm sinh khóa con dựa trên hàm băm một chiều kết hợp với các tham số sau 

* Một parent private hoặc public key
* seed đc gọi là **chain code** (được tạo bên trên)
* index number (32 bits)

Ba mục này được kết hợp và băm để tạo khóa con, như sau:

Parent public key, chain code và index number được kết hợp và băm với thuật toán HMAC-SHA512 để tạo ra hàm băm 512 bit. Băm kết quả được chia thành hai nửa. 256 bit bên phải của đầu ra băm trở thành chain code . 256 bit bên trái của hàm băm và index cộng thêm parent Private key để tạo Child private key. Trong sơ đồ bên dưới, chúng ta thấy điều này được minh họa với index = 0 . Thay đổi index lên 1 2 3 giúp chúng ta tạo ra các khóa con khác . Lặp đi lặp lại quá trình chúng ta sẽ có vô hạn các khóa con.

![](https://images.viblo.asia/8e0b1afa-e8fe-4180-8c8e-d366315a892c.png)

## Tạo Public child key
Như đã đề cập ở trên, một đặc tính rất hữu ích của ví là khả năng lấy public child keys từ public parent keys mà không cần private keys . Cũng tương tự như tạo private key nhưng hơi khác một chút 

![](https://images.viblo.asia/6a9769d6-8139-47df-8810-d553a3fdc280.png)

Tuy nhiên, vì public child key chứa Chain code, nếu biết 1 private key hoặc bị rò rỉ bằng cách nào đó, nó có thể được sử dụng với chain code để lấy tất cả các private child key khác. Và họ có một giải pháp

![](https://images.viblo.asia/d5b4866f-888a-4366-9430-d26f62d0c589.png)

Bằng cách sử dụng parent private key thay vì parent public key

## HD wallet key identifier (path)
HD wallet tree được biểu diễn bằng các đường dẫn từ node địa chỉ đầu tiên . Ví dụ trong path mặc định trong Ethereum là **m/44'/60'/0'/0** mỗi số trong path này đều mang một ý nghĩa của nó

```
m / purpose' / coin_type' / account' / change / address_index
```

Path `m/44'/60'/0'/0` được giải thích là
- 44 : dựa theo BIP 44
- 60 : Ethereum's coin type ( có thể tham khảo tại [đây](https://github.com/satoshilabs/slips/blob/master/slip-0044.md) để biết các coin type khác) 
- 0 : Account 0
- 0 : Change 0

Lý giải theo hướng kĩ thuật thì ví phân cấp có dạng cây mà mỗi node của nó có một cặp public / private key được mở rộng từ master node. Hơn nữa số lượng node là không giới hạn .

Ví dụ :  HDwallet giữ 2 loại code của Bitcoin và Ethereum thì nó sẽ như này 
```
// Bitcoin cointype : 0
// Ethereum cointype : 44
                coinType 0 -- account 0 - change 0 - address 0
               /                                   \
root -- BIP 44                                      address 1
               \
                coinType 44 -- account 0 - change 0 - address 0
```

Điều quan trọng cần ghi nhớ sau khi có cài nhìn tổng quan này là : mục đích của master private key là để tái tạo các node của cây . Nó ko phải dùng để kí transaction . Nói tóm lại HDwallet được thiết kế để nó có thể tạo ra nhiều public/private key từ seed hoặc mnemonic .

## Tree level Breakdown
Bạn có thể dùng HDwallet để lưu giữ nhiều loại tiền khác nhau bằng cách sử dụng nhiều nhánh **coinType**. Trong khi đó nhánh **account** dùng để giữ nhiều ví trong cùng một loại tiền . VÍ dụ đơn giản cũng giống như bạn mở thêm các tài khoản ngân hàng cho vợ 1 , vợ 2 hoặc con ,... . Tiếp đó là nhánh **change** có giá trị 0 hoặc 1 , 0 để tạo **receiving addresses** và 1 để tạo **change addresses** (bạn có thể đọc về change address tại [đây](https://support.bitpay.com/hc/en-us/articles/115003063823-What-is-a-bitcoin-change-address-)) . Và cuối cùng là **address_index** là các địa chỉ ví khác nhau . Dưới đây là vài ví dụ :
```
M/44'/0'/0'/0/2 Khóa công khai thứ ba cho tài khoản bitcoin chính
M/44'/0'/3'/1/14 Khóa công khai change-address thứ mười lăm cho tài khoản bitcoin thứ tư
m/44'/2'/0'/0/1 Khóa riêng thứ hai trong tài khoản chính Litecoin, để ký các giao dịch
```

## Kết luận
Như vậy, chúng ta đã cùng đi tìm hiểu về HD Wallet. Loại ví này tạo ra nhằm đáp ứng nhu cầu sử dụng nhiều địa chỉ ví của người dùng. Với HD Wallet, chúng ta có khả năng tạo ra vô số ví và chỉ cần một seed duy nhất .

## Reference
- Mastering Bitcoin
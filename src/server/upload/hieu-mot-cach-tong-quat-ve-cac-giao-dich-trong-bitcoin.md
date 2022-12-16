# Giới Thiệu
- Hiện nay với sự phát triển của thị trường **tiền điện tử**(Crypocurrency) , việc mua vào các bitcoin là một ý tưởng tuyệt vời nếu bạn là một nhà đầu tư và có niềm tin là nó sẽ còn tiếp tục lên. Nhưng bạn đã bao giờ tự hỏi vậy các **giao dịch**(transaction) bitcoin này hoạt động như thế nào. Để trả lời cho câu hỏi này chúng ta sẽ đi vào các đặc điểm cơ bản của một transaction bitcoin.

- Các transaction bitcoin được gửi và nhận giữa những ví điện tử bitcoin, chúng được đăng ký bằng kỹ thuật số để đảm bảo an toàn. Mọi người trong network có thể biết về thông tin của các transaction cũng như là lịch sử của chúng, khi truy nguyên nguồn gốc mà bitcoin được sản xuất. Tuy nhiên, họ không thể thay đổi bất kỳ dữ liệu nào trên transaction mà chỉ có thể ghi nhận thành một dữ liệu khác (tính minh bạch hoàn toàn).

# Đi Vào Các Đặc Điểm
### 1. Thực tế mỗi tài khoản chả chứa một đồng bitcoin nào cả
- Trên thực tế bitcoin không hề tồn tại ở bất cứ đâu. Chúng ta nhắc đến các bitcoin, ông A có 10bitcoin, bà B có 20bitcoin nhưng khi bạn nhìn vào một địa chỉ bitcoin cụ thể nó không thật sự có Bitcion hữu hình nào trong đó cả, thực chất lượng bitcoin đó được tính bằng cách tính tổng tất cả giá trị của các đầu ra của các transaction trước đó mà có địa chỉ thụ hưởng trỏ đến địa chỉ của ông A hay ông B mà thôi.

- Nó tuân theo quy tắc đầu ra của transaction này sẽ là đầu vào của transaction khác như hình minh họa bên dưới:

![](https://images.viblo.asia/8edf951b-ad6c-4bb7-b67c-8f60fc1e08c0.png)

- Giống như việc chúng ta tiêu tiền giấy vậy, số tiền ta có thực chất là tiền mà ta được người khác đưa cho và tổng đống tiền đó lại ta có số tiền ta đang có. Sẽ có nhiều dạng transaction có dạng 1 đầu vào 1 đầu ra, 1 đầu vào nhiều đầu ra, nhiều đầu vào và 1 đầu ra và v.v.. nó sẽ có dạng chung thường như thế này

![](https://images.viblo.asia/cbdbd442-80a2-4911-b9f4-2e3d85248d6e.png)

- Tức là một khoản để thanh toán và nếu số tiền đó còn thừa sẽ được tạo thành một transaction trả lại tiền thừa, nó cũng giống như ta mua hàng ở siêu thị và được thu ngân trả lại tiền thừa. Lúc này output 0 sẽ là transaction dùng để thanh toán nó sẽ có thể sử dụng cho lần chi tiêu tiếp theo của Bob và tiền thừa trả về ví của Alice là output 1 kia cũng có thể sử dụng cho lần tiếp theo. Còn các transaction đưa vào Input 1 sẽ không còn được sử dụng nữa.

- Vì vậy nên thực chất số bitcoin có ở trong ví chỉ là nó đi tìm những transaction vẫn chưa được sử dụng mà có địa chỉ thụ hưởng trỏ về địa chỉ của ví mình và tính tổng giá trị của chúng sẽ ra số bitcoin người giữ ví đó đang có.

### 2. Giao dịch bitcoin trông sẽ như thế nào?
- Nếu Alice gửi một vài bitcoin cho Bob, giao dịch đó sẽ có ba phần thông tin:
    + Một, thông tin đầu vào: Những địa chỉ bitcoin được Alice sử dụng để nhận bitcoin trước đây.
    + Hai, khoản tiền: Đây là số lượng bitcoin mà Alice gửi cho Bob.
    + Ba, thông tin đầu ra: Địa chỉ bitcoin của Bob.
![](https://images.viblo.asia/b4a722a1-b7a0-4088-9117-739ed2678d87.png)

### 3. Nó sẽ được gửi đi như thế nào ?
- Sau khi ví lấy được các transaction có địa chỉ của Alice mà chưa được sử dụng và để đem vào thanh toán trong transaction với Bob thì trasaction mới sẽ được tạo thành rồi đưa lên mạng bitcoin.

- Như đã biết mỗi địa chỉ trong bitcion sẽ chứa 2 khóa là **khóa công khai** (public key) và **khóa bí mật** (private key). Hai khóa này có liên quan đến nhau nhưng sẽ không có cách nào có thể từ public key tìm ra private key. Điều quan trong ở đây bây giờ là bất kỳ một transaction nào xuất phát từ địa chỉ của Alice sẽ cần **`ký`** với chữ ký được tạo ra từ private key của Alice. Vì private key là bí mật chỉ có Alice biết nên không ai có thể giảo mạo Alice để nhận số tiền đó. Một tính năng vô cùng tuyệt vời của bitcoin đó là **nếu chữ ký được tạo bằng private key tương ứng với public key đó, chương trình sẽ xác thực giao dịch mà không cần biết khóa riêng là gì. Rất thông minh.**

- Mạng bitcoin sau đó xác nhận xem trước đây Alice đã sử dụng bitcoin đó chưa bằng cách chạy qua lịch sử địa chỉ của Alice để kiểm tra, điều này ví sẽ tự động làm ví nó đã viết địa chỉ của Alice và public key cùng vì tất cả các giao dịch đều công khai trên sổ cái bitcoin.

### 4. Ai sẽ là người xác nhận giao dịch của bạn?
- Đầu tiên, ví sẽ tiến hành kiểm tra nhanh giao dịch trên. Nó sẽ kiểm tra xem liệu Alice có đủ bitcoin trong tài khoản của mình hay không và địa chỉ của Bob cung cấp có phải là một địa chỉ bitcoin còn sử dụng được hay không.

- Sau khi thông qua 2 bài kiểm tra trên, giao dịch này sẽ được đóng gói kèm với các giao dịch khác để tạo thành 1 khối (block).

- Khối này di chuyển tới các miner bitcoin. Mục tiêu của các miner là xác thực khối đó và thêm nó vào Blockchain (đây là quá trình cập nhật sổ cái).

- Giống như đời thực con người cần lao động để nhận lại thành quả có thể là tiền, lương thực,... Thì trong bitcoin cũng vậy để có được bitcoin các miner cần phải lao động. Để nhận được bitcoin các miner cần xác nhận các giao dịch được người dùng tạo ra, nếu xác nhận thành công giao dịch đó họ sẽ nhận được bitcoin. Đây chính là khái niệm **Proof of Work** (PoW) - bằng chứng công việc. Bitcoin sử dụng một bài toán rất khó giải nhưng dễ kiểm tra cho các block của mình, đó chính là băm khối đó với một hệ số nonce là độ khó của thuật toán tùy vào số lượng miner đào block nhằm đảm bảo đúng 10 phút sẽ có một block được xác thực. Công việc của các miner giờ là giải bài toán đó.

- Để hiểu được điều này, chúng ta cần phải tìm hiểu về các giá trị hash. **Một giá trị hash (hash value) là một chuỗi ký tự gồm số và chữ đi kèm với nhau và trông như thế này: 1gwv7fpx97hmavc6inruz36j5h2kfi803jnhg**.

- Một giá trị hash được tạo ra bằng cách xử lý dữ liệu thông qua một thuật toán gọi là hàm hash (hash function).

- Hàm hash là một hàm số toán học (mathematical function) ánh xạ (mapping) từ dữ liệu có độ dài bất kỳ (arbitrary size) thành dữ liệu có độ dài cố định (fixed size).

- Để dễ hiểu hơn, hãy xem nó như là các nguyên liệu để xay sinh tố. Bạn phải lấy nguyên liệu (chính là dữ liệu), cho nó vào máy xay (hàm hash) và bạn sẽ có được nước sinh tố (giá trị hash).

- Hashing là quá trình diễn ra 1 chiều. Khi bạn đưa ai đó 1 giá trị hash, người đó không thể biến nó trở về dữ liệu đầu vào ban đầu, cũng giống như không thể biến nước sinh tố trở về các nguyên liệu gốc.

![](https://images.viblo.asia/c67b5a00-c8e8-4864-b648-cf2765a48d2c.jpg)

- Khi các miner nhận được một khối các giao dịch và tìm cách đưa vào Blockchain, họ đang sử dụng hàm hash để giải quyết câu đố dưới dạng mật mã.

- Các miner tiền ảo sử dụng khối mới (bao gồm các giao dịch được đóng gói trong khối này) kết hợp với một dãy số được tạo ra ngẫu nhiên (gọi là tham số nonce), đưa nó vào hàm băm khối và sau đó nhận được một giá trị hash cụ thể.

- Những gì mà một miner tiền ảo cố gắng thực hiện là tìm một giá trị hash bắt đầu với nhiều con số 0. Họ sẽ liên tục thử các dãy số nonce khác nhau cho đến khi đạt được giá trị hash cần thiết.

- Quá trình tính toán thử và sai được trình bày trong bước 1 và bước 2 trong biểu đồ dưới đây.

![](https://images.viblo.asia/c47021b5-9113-470e-b323-90ccb89af04a.jpg)

- Tất cả miner tiền ảo đang trong một cuộc cạnh tranh khốc liệt để tìm ra giá trị hash chính xác đó. Điều này là vì miner nào tìm ra giá trị chính xác (bước 3) sẽ đưa giải pháp chính xác tới node nhỏ (bước 4) để được xác thực.

![](https://images.viblo.asia/8fbc0b8b-8ac7-4e34-876d-a206afa5df76.jpg)

- Khối mới được thêm vào Blockchain (bước 5), và miner giành chiến thắng sẽ được thưởng một số bitcoin.

![](https://images.viblo.asia/2c26c1a4-4776-4e2b-a8dd-a731f297f9fa.jpg)

- Giao dịch bitcoin của Alice giờ đã được ghi nhận vào Blockchain. Ví tiền bitcoin của Bob cũng có thêm bitcoin và số dư của ông Alice bị trừ đi bitcoin.

- Sau đó, quá trình đào tiền ảo bắt đầu lại từ đầu, với một loạt các giao dịch được gói lại vào một khối mới, và tất cả miner tranh nhau tìm ra giá trị hash chính xác.

### 5. Có khoản phí giao dịch nào không?
- Chắc chắn là **`có`** rồi !
- Phí giao dịch được tính bởi nhiều yếu tố. Một số ví cho phép bạn đặt các khoản phí này một cachs thủ công. Bạn sẽ thấy tổng tất cả đầu ra của các transaction sẽ không bằng tổng tất cả các đầu vào, đó được ngầm hiểu chính là phí giao dịch và phì này sẽ được dành cho các miner có công xác thực giao dịch. Ví dụ, Alice gửi cho Bob 1 BTC, ví của Alice sẽ ghi nhận đã chuyển cho Bob là 1,00045 BTC thì 0,00045 BTC này là phí dành cho miner, trong khi Bob vẫn nhận đủ 1 BTC. Điều này dẫn đến một số miner sẽ kiếm thêm khoảng phí trên ngoài phần thưởng từ việc tìm ra block.

- Hiện tại, một số miner vẫn xử lý nhiều giao dịch không phí nhưng khi phần thưởng từ các block giảm, điều này sẽ ít xảy ra.

# Kết luận
- Qua đây ta sẽ có cái nhìn tổng quan hơn về cách thức hoạt động bên dưới của những giao dịch bitcoin. Và cũng để giải thích cho những ai tò mò rằng không biết các giao dịch bạn vẫn thực hiện hằng ngày kia thực chất chúng hoạt động như thế nào, có thể đây sẽ là những câu trả lời cho bạn

### Nguồn :
https://www.coindesk.com/information/how-do-bitcoin-transactions-work

https://bitcoinplay.net/bitcoin-transactions/

http://stansberrypacific.com/
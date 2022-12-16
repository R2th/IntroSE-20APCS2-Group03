Hế lô anh em mình là Cris Leo đây <br/>
Đây là bài viết thứ 2 trong seri Ethereum cơ bản, anh em có thể đọc phần 1ở [đây](https://viblo.asia/p/ethereum-co-ban-p1-3Q75wE23ZWb) nhé. <br/>
Phần 1: https://viblo.asia/p/ethereum-co-ban-p1-3Q75wE23ZWb

### Tính minh bạch và tức thời trong blockchain
Béatrice Collot, Trưởng phòng Thương mại Toàn cầu và Tài chính tại ngân hàng đa quốc gia HSBC đã từng phát biểu trong buổi phỏng vấn với tạp chí kinh doanh và công nghệ Pháp L’Usine Digitale. <br/>
*"Tính minh bạch và tính tức thời là thế mạnh thực sự của blockchain và sẽ tạo ra không chỉ tiết kiệm đáng kể thời gian và tăng tính bảo mật, mà còn tiết kiệm [tài chính] đáng kể"*. 

Vậy chúng ta sẽ cùng nhau xem ở trong blockchain Ethereum nó minh bạnh và tức thời đến như thế nào nhé! 

Như ở phần 1 chúng ta đã thực hiện việc nhận 1 ETH miễn phí ở testnet Ropsten. Sau khi nhận ETH từ ***faucet*** thì ngay lập tức sẽ có 1 ***transaction hash*** được hiển thị ở phần **Transactions**. (như ảnh dưới)

![](https://images.viblo.asia/2ab98b64-b980-43c3-8721-9c68e351d841.png)

Chúng ta có thể làm gì với ***Transaction hash*** này đây?  <br/>
Anh em có thể click trực tiếp vào link của transaction hash để chuyển đến trang https://ropsten.etherscan.io/tx/0xc6a0703616cfdf7be3c18a8661f75617bec5daa5329ab7401d80ccf57a5dfe76  nơi hiển thị toàn bộ thông tin liên quan đến giao dịch chuyển ETH từ ***faucet***  về địa chỉ ví Ethereum của anh em. <br/>
Hoặc có 1 cách khác để anh em xem thông tin liên quan đến 1 transaction là bằng cách truy cập vào https://ropsten.etherscan.io/ (*đối với mạng testnet Ropsten còn với các testnet khác or mainnet sẽ là những trang khác*)  và copy transaction hash mà anh em muốn xem thông tin của transaction vào để tìm kiếm thông tin (ảnh dưới).
![](https://images.viblo.asia/d0e28c01-ec0e-4783-84de-b174640fa32e.png)

Và đây là kết quả

![](https://images.viblo.asia/a7578846-c117-4405-aa59-f435d9728364.png)
Ở Transaction Detail này anh em có thể nhìn thấy thông tin giao dịch về trạng thái của giao dịch đã thành công hay thất bại, Ether được chuyển từ đâu đến đâu, transaction fee của nó là bao nhiêu, thời gian diễn ra giao dịch này lúc nào. 

Những bước anh em vừa cùng tôi thực hiện ở trên đã thể hiển được sự minh bạch và tức thì của Ethereum khi bất kỳ ai cũng có thể kiểm tra transacion và ngay lập tức không cần phải chờ đợi qua các thủ tục hãy xin chữ ký xét duyệt của bất kỳ tổ chức cá nhân nào. 


### Gửi đi ETH bằng MetaMask 
Những bước vừa qua chúng ta đã cùng nhau  thực hiện việc nhận ETH rồi, vậy giờ chúng ta hãy cùng nhau  thực hiện các bước gửi đi ETH nhé. 

Để gửi được thư từ bưu phẩm thì bạn cần có địa chỉ của người nhận, trong blockchain Ethereum cũng thế, bạn muốn gửi ETH đi thì cần 1 địa chỉ người nhận, vậy chúng ta sẽ gửi cho ai bây giờ?? <br/>
Đơn giản nhất hãy gửi lại vào ***faucet*** nơi  ae vừa nhận ETH hoặc  ae có thể gửi đến địa chỉ của tôi để tôi có thể biết được liệu có bao nhiêu anh em cùng tôi thực hiện việc khám phá Ethereum nhé ^_^. <br/>
(Anh em hãy nhớ lại những gì tôi viết ở phần 1, ETH trong testnet cụ thể ở bài viết này là ropsten hoàn toàn không có giá trị, chỉ dùng để test). <br/>
***My address***: 0x28890A712ba2FDe9171bB1dFE1561BAfD8fEBa4D

Bước 1: <br/>
Click vào icon wallet MetaMask, và ấn vào button "Gửi". 

![](https://images.viblo.asia/51535b42-774c-4a1e-87a7-2bfe274e7463.png)

Bước 2: <br/>
Nhập địa nhận ETH vào ô "*Gửi*" <br/>
Nhập số ETH mà bạn sẽ gửi đi <br/>
Sau khi hoàn tất hãy click vào "*Tiếp theo*"<br/>
![](https://images.viblo.asia/cd4c408c-6f23-47c5-a52e-d163d6134ad4.png)

Bước 3: <br/>
Xác nhận thông tin và tổng số ETH bạn bị trừ đi sẽ là Tiền gửi + Phí giao dịch. Cái này giống như việc anh em muốn gửi thư, bưu phẩm thì phải mua tem đó.  Cái phí giao dịch này sẽ trả cho ai thì tôi sẽ nói giải thích chi tiết ở những bài sau, còn bây giờ anh em tạm hiểu phí giao dịch này trả cho những người đào coin. 

![](https://images.viblo.asia/43070515-a3a9-4787-8261-d4e79503c736.png)

Bước 4: <br/> 
Xem thông tin quá trình giao dịch. <br/>
Sau khi anh em click "*xác nhận*"  MetaMask sẽ gửi đi ETH, và anh em có thể nhìn thấy quá trình giao dịch của mình ở mục "*Hàng đợi*" trong tab "*Hoạt động" *<br/>
![](https://images.viblo.asia/b93c2a47-56d4-479b-9d1a-8747f6b3e950.png)

Bước 5: <br/>
Sau khi hoàn tất quá trình giao dịch anh em có thể  xem thông tin chi tiết giao dịch trên ropsten.etherscan.io như cách chúng ta đã làm ở các bước trên. Ngay lập tức có thể xem được thông tin giao dich, rất minh bạch và tức thời phải không anh em. 

![](https://images.viblo.asia/624848d1-c6ce-40df-9b2c-53a16f4ea27e.png)

![](https://images.viblo.asia/93cfb8dd-eae0-44a3-b27d-857a7311fdad.png)

Như vậy là chúng ta đã cùng nhau khám phá các kiểm tra thông tin 1 transaction và gửi đi ETH.  

### Kiểm tra toàn bộ các giao dịch liên quan đến 1 địa chỉ (Ethereum Adress)
Như trong phần 1 tôi đã trình bày với anh em, MetaMask sẽ sử dụng chung 1 address cho cả mainnet và testnet vì thế anh em có thể kiểm tra các giao dịch liên quan đến 1 Address bất kỳ miễn là có địa chỉ Ethereum đó.  <br/>
Đối với testnet ropsten: https://ropsten.etherscan.io/ <br/>
Đối với mainnet: https://etherscan.io/ <br/>

Anh em hãy copy địa chỉ Ethereum muốn tìm kiếm thông tin giao dịch sau đó paste vào nơi ae muốn tìm kiếm. Ở trong ví dụ này tôi sẽ tìm trên testnet ropsten, vì ở mainnet tôi ko có tiền (nghèo vl ae à) nên ko có giao dịch nào cả. 

Như anh em thấy ảnh dưới toàn bộ các transaction liên quan đến address của tôi sẽ đều được show ra, rất minh bạch ko giấu diếm được gì cả. <br/>
***Lưu ý: Bất kỳ một address nào cũng thế đều có thể tra các transaction liên quan***

![](https://images.viblo.asia/860a94db-e8f2-4c3c-941a-e123fd05b4f8.png)



OK anh em phần 2 của chúng ta tạm thời đến đây đã nhé, hẹn anh em vào phần 3 nhoé. <br/>
*to be continued*
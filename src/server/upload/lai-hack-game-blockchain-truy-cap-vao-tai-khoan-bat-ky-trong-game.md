> Kiến thức về Blockchain của mình vẫn đang hạn hẹp, nếu có câu nào hay kiến thức chỗ nào mình hiểu sai thì xin các bạn góp ý ở dưới phần comment nhé

Dạo gần đây mình cùng homie của mình cũng hay đi xiên các con game Blockchain, do trend NFT game Blockchain đang cực kỳ nổi bây giờ, nhất là Việt Nam mình có con game Axie Infinity vốn hoá hàng tỷ Biden.

Thật tiếc là ngày xưa - tháng 5 vừa rồi - một homie khác của mình cũng rủ chơi game Axie Infinity mà mình lại không chơi, chứ chơi đến bây giờ thì cũng ....   
Các bạn có thể đọc bài viết tại https://viblo.asia/p/blockchain-do-bo-nen-cong-nghiep-gaming-co-hoi-hay-rui-ro-cung-loi-chia-se-ve-viec-ca-nhan-minh-dang-kiem-them-thu-nhap-bang-cach-choi-cac-blockchain-game-nhu-the-nao-LzD5daVEKjY

![image.png](https://images.viblo.asia/4124b329-8bdc-4737-8d98-3dfeacd08885.png)
<div align="center">

*Cố gắng lên các bạn, nghèo thì lâu chứ giàu thì mấy đâu huhu*

</div>

Thôi lòng vòng văn tự thế đủ rồi, vào chủ đề chính thôi, lẹt gâu

# Metamask
Nếu ai chưa từng tiếp xúc với crypto blockchain thì cái này có vẻ lạ lẫm, chứ Metamask đã quá quen thuộc với anh em "chơi" crypto rồi, tuy nhiên không chắc là tất cả những người dùng nó đã hiểu rõ về Metamask, các ký khoá của nó, vân vân và mây mây. Nói đơn giản, Metamask là một tiện ích giúp lưu trữ cho mình khoá Private-key và hiển thị Public-key 

![image.png](https://images.viblo.asia/9c8c5420-7eaa-4d5e-a62a-b5e645d5437b.png)
<div align="center">

*Giao diện Metamask*

</div>

Và đương nhiên là không chỉ Metamask có khả năng làm được điều này, có rất nhiều ví DEX có thể giúp chúng ta làm được điều cơ bản Metamask làm được, tuy nhiên tuỳ vào game có support nó hay không, mình thấy đa số game NFT đều hỗ trợ Metamask nên mình tập trung nói về Metamask thôi

![image.png](https://images.viblo.asia/7e2cb2f7-06b4-47d5-a3af-3abab20e0c41.png)
<div align="center">

*Game hỗ trợ rất nhiều kết nối các ví khác nhau*

</div>

# Kết nối tới hệ thống
Điều đầu tiên, khi click vào Metamask hệ thống sẽ cho phép ta login luôn, ví dụ

![login-metamask.gif](https://images.viblo.asia/a08b5d6b-a872-4df6-ade4-8be40937c606.gif)

Vậy thì ở đây, tại sao khi click như vậy thì hệ thống có thể cho chúng ta login vào user của chúng ta luôn, và có thể sử dụng vài tính năng cơ bản.

Để cho dễ hiểu, đây là API để server get được username của mình

![image.png](https://images.viblo.asia/17ca0363-92f6-40e6-8f7f-29b7491c9288.png)

Chúng ta có thể thấy thằng không hề có xác thực, chỉ đơn giản là cung cấp cho API address của mình thì server trả về username.

Khi click vào Metamask như vậy, Metamask sẽ cung cấp cho website public key ví của chúng ta (chính là địa chỉ ví đấy), website sẽ sử dụng địa chỉ ví để login vào hệ thống luôn. Giống như việc sử dụng username login vào hệ thống mà không cần sử dụng mật khẩu vậy.
![](https://c.tenor.com/XHyzk7O2ndIAAAAC/what-meme.gif)

Ớ thế là, ai có địa chỉ ví của mềnh là cũng có thể login vào account của mềnh à 🤔  
Chính xác là như vậy, tuy nhiên thông tin đấy có lẽ chỉ là public thôi, khi chỉnh sửa thông tin user thì chúng ta cần phải ký 1 phát để xác thực đúng là mình đang sửa thông tin trên account của mình nữa. Việc này giống việc xác thực chữ ký điện tử vậy, khẳng định chính mình đã ký vào đó chứ không phải anh hàng xóm, hay cô bạn thân nào đó ký hộ được.
> Nếu có thời gian mình sẽ bổ sung thêm về phần ký này nhé
# Hack game thôi nào
Lâu lâu rồi homie của mình có gửi cho mình cái link game của người anh em láng giềng, các bạn có thể truy cập tại đây https://bidragon.io

Đường link trên chỉ là cái market thôi, muốn chơi game thì các bạn cần phải mua NFT game rồi mới chơi được.

Truy cập vào URL để chơi game https://app.bidragon.io/ mình thấy nó **truy cập thẳng trực tiếp vào game luôn chứ không cần mình làm 1 hành động nào khác** 🤔
![image.png](https://images.viblo.asia/5af6a800-046c-4685-bc85-a5b92bc20284.png)

Ớ thế thì, chắc chắn game đã không có cơ chế verify nào với account đang truy cập vào game, vậy thì mình có thể sử dụng address bất kỳ cũng có thể login vào game rồi.

![image.png](https://images.viblo.asia/58eba79d-aaf3-4247-a91f-e94115c61dcd.png)

Game sử dụng socket để gửi dữ liệu, Đọc code JS một chút chúng ta có thể thấy việc login rất đơn giản, gửi gói tin socket bao gồm login và password, do không cần tác động gì tới account của mình cả nên password sẽ được set bởi hệ thống, vậy thì quá trình tạo password sẽ diễn ra như thế nào

![image.png](https://images.viblo.asia/e929b043-78ef-423e-9490-c17bc23d793d.png)

Có thể thấy rằng 
```js
_pwd = md5.hexMD5(_DAPP_SDK.openId);
```
Tuy nhiên cái `openId` kia ở đâu

![image.png](https://images.viblo.asia/890dae8a-6896-42f2-89fe-9b3383c82c0e.png)

Chỉ với một request đơn giản bao gồm address, secret thì mặc định là `secret=Welcome%20To%20MoonGming%21`, signature không có, ta có thể lấy được openId account bất kỳ rồi

![](https://c.tenor.com/BGNlcHU8yiMAAAAM/leonardo-dicaprio-clap.gif)

Một nạn nhân xấu số trên top scoreboard được target
![image.png](https://images.viblo.asia/488615be-51ef-407d-82cc-b2a6fbb7840a.png)

Server bảo OK, nhập password đi tau cho login
![image.png](https://images.viblo.asia/88ece087-6b05-4d60-a769-409fc3c8eb82.png)

Nhập password là md5 của openId lấy được ở trên rồi gửi đi
![image.png](https://images.viblo.asia/5584abc5-6928-454d-a604-ccc4cdef181d.png)

Login success, bây giờ có thể thoải mái sử dụng account này rồi
![image.png](https://images.viblo.asia/d90dfe87-b408-4f1e-9b15-6ee641dbd83d.png)

# Timeline
- Ngày 25 tháng 8: Báo cáo cho đội dev bidragon thông qua telegram
- Ngày 26 tháng 8: Dev bidragon đã fix bug, và trao thưởng cho chúng tôi một NFT Dragon cấp S.


Đương nhiên rằng nhận rồi là bán luôn lấy tiền - được 4.5BNB (đang nghèo mà) 
![image.png](https://images.viblo.asia/e4f8fc32-303d-4e5c-903a-d937610e70be.png)

> Còn phần nữa, các bạn cùng đón đọc nhé
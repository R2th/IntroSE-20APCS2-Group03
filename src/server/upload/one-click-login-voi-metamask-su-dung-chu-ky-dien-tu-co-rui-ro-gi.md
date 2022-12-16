Online users ngày càng trở nên không thích (hoặc cảm thấy khó chịu) đối với sử dụng tính năng đăng ký truyền thống sử dụng username/email và password. Họ thích sử dụng tính năng đăng nhập chỉ bằng một cú nhấp chuột thông qua Facebook, Google hoặc GitHub hơn nhiều, đỡ cần phải suy nghĩ xem đặt mật khẩu là gì, username là gì, có cần lưu lại để sau này đăng nhập lại không ..v.v. Tuy nhiên, nó đi kèm với một sự đánh đổi.

#### Ưu điểm:
- Không cần phải điền form nhiều trường phức tạp
- Không cần phải nhớ thêm username/email và password khác
- Toàn bộ quá trình đăng nhập mất vài giây thay vì vài phút.
#### Nhược điểm
- Vì thông tin user được cập nhật từ các nhà cung cấp khác (Facebook, Google, Github, ...), điều này dậy lên vấn đề nhức nhối về quyền riêng tư của các nhà cung cấp sử dụng tất cả dữ liệu cá nhân này. Ví dụ, [Facebook đang phải đối mặt với các vấn đề về quyền riêng tư dữ liệu](https://www.reuters.com/article/us-facebook-privacy-costs-analysis/privacy-issues-emerge-as-major-business-risk-for-facebook-idUSKBN1GW01F).

Tuy nhiên, có một phương pháp giải quyết vấn đề trên mà các developer blockchain hay sử dụng, đăng nhập chỉ với 1-click với Metamask , hay còn gọi là "**Login with Metamask**"

![Imgur](https://i.imgur.com/GRq01L2.gif)

<div align="center">

*Có vẻ rất là ổn đúng không?*

</div>

Trên hình chúng ta có thể thấy rằng, chỉ cần chúng ta ấn Sign (ký) là có thể login vào tài khoản game rồi chơi như bình thường thôi. Cách login không hề rườm rà và chẳng lộ thông tin cá nhân ở đâu cả, rất là tiện. 

Cơ chế login cũng rất đơn giản. Ý tưởng cơ bản là về mặt mật mã, chúng ta có thể chứng minh rằng mình là chủ sở hữu tài khoản nếu chúng ta **ký** vào một đoạn **message** mà server yêu cầu. Nếu bạn gửi một đoạn chữ ký (signature) đã ký với message đó tới server, thì server sẽ coi bạn là chủ sở hữu của địa chỉ ví công khai đó. Vậy nên, hoàn toàn có thể xây dựng hệ thống định danh bằng phương pháp này.

![image.png](https://images.viblo.asia/103aaabc-8d5d-4f7f-83e9-aeda124fdb68.png)
<div align="center">

*Hệ thống login 1-click với Metamask*

</div>

### Vậy thì có vấn đề gì ở đây nhỉ?

Như bài đầu tiên mình có phân tích tại [Lại hack game Blockchain, truy cập vào tài khoản bất kỳ trong game](https://viblo.asia/p/lai-hack-game-blockchain-truy-cap-vao-tai-khoan-bat-ky-trong-game-gGJ59BbaKX2), mình đã có thể truy cập vào account bất kỳ của một game thông qua địa chỉ ví công khai (public key) của người đó. Tuy nhiên, các developer cũng rất ít khi gặp lỗi sơ đẳng như vậy (nhưng cũng không phải là không có, mình cũng có khai thác ở một game khác cũng đăng nhập thông qua public key và được thưởng một khoản tương xứng :D)

![image.png](https://images.viblo.asia/0c9b2144-c70e-4496-8ec6-8a5fb5f89794.png)

Thông thường, developer sẽ yêu cầu chúng ta ký vào một đoạn message. Tuy nhiên, các bạn có thể thấy rằng khi mình login vào game, mình đã ký vào đoạn message có nội dung là "**Verify Account**". Chúng ta đã biết rằng chữ ký điện tử thì sử dụng private key để mã hoá và public key để giải mã. Vậy thì private key của mỗi ví chỉ có 1, nội dung ký cũng chỉ có 1 => bản mã cũng chỉ có 1. Ơ thế vậy thì có thể sử dụng lại bản mã sau khi ký xong để login vào game à?

Test thử xem sao nhé.

![image.png](https://images.viblo.asia/6cc7c4c0-0ee1-4ac1-b410-6c72be1041ee.png)

Request này có thể thấy rằng, mình đã gửi public key và signature sau khi mình ký vào chữ "**Verify Account**", login thành công.

Tuy nhiên, mình sử dụng https://www.myetherwallet.com/wallet/sign để lấy ví mình ký vào chữ "**Verify Account**" thì cũng nhận được kết quả tương tự. 

![image.png](https://images.viblo.asia/301621b7-7ae5-4a15-bb1f-b8576cc6b80e.png)

Vậy là, hoàn toàn mình có thể dựng lên một trang web, yêu cầu mọi người ký vào message "**Verify Account**" và rồi có thể lấy được signature và sử dụng nó để đăng nhập vào game/ứng dụng (nếu họ có chơi game/ứng dụng đó). 

Tuy cần một chút phishing nhưng với người dùng hiện nay, nhất là cơn bão GameFI đang đổ bộ, hoàn toàn mọi người sẽ không để ý đến cái message để ký đó mà mọi người sẽ ký luôn để login vào game chơi, chỉ có chúa mới biết được rằng hệ thống backend của những game đó có đang thu thập Signature của người chơi hay không, họ có thể sử dụng lại để đăng nhập vào các game khác nếu có nội dung ký tương tự. 

![image.png](https://images.viblo.asia/50cf2096-eac4-408b-85a2-4f9617e213b5.png)

<div align="center">

*Ví dụ như game này, nếu mình có giá trị Signature của user thì chẳng phải mình có thể đổi password được hay sao 🤔*

</div>

### Update

Mình vừa gặp một trường hợp khá là buồn cười, thấy bạn mình gửi cho link nên chẳng biết thế nào, vào check xem sao. Thấy bảo game này đang hot lắm.

![image.png](https://images.viblo.asia/02550535-e364-4133-96ca-c82579d78a9e.png)

Thông tin chữ ký có ngẫu nhiên đầy đủ, khá xịn xò. Check request thì có vẻ rất an toàn rồi chứ nhờ

![image.png](https://images.viblo.asia/0d3910d7-11ae-4787-b4ff-fcdae9b147c5.png)

Tuy nhiên, mình thử ký với message và sign khác xem sao

![image.png](https://images.viblo.asia/097e0361-b44f-41a7-9bf7-269cd2a767a2.png)
Ký với chữ "a"

![image.png](https://images.viblo.asia/712ce6f4-3603-4685-90ce-84500392ad4e.png)

Ớ tạo được session đăng nhập thành công này, vậy thì với message và sign bất kỳ của user nào đều có thể login được, quả là ảo ma canada =)) 

### Vậy làm sao để login với Metamask an toàn
- Sử dụng giá trị Nonce ngẫu nhiên gửi cùng message khi yêu cầu user ký
- Giá trị Nonce hết hạn sau một khoảng thời gian nhất định
- Thay đổi Nonce khi login thành công
- ....

### Tham khảo
 - https://www.toptal.com/ethereum/one-click-login-flows-a-metamask-tutorial
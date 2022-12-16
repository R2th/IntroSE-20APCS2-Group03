## Lời nói đầu
Lời đầu tiên xin được xin chào cả nhà, đã lâu lắm rồi mình không viết blog nay May Fest mà người iu mình thích cái áo viblo quá nên xin phép nổ phát súng trên Viblo về **Mosh** - thứ khá hay ho mà anh em dev nên biết (không chỉ mỗi dev mà anh em nào hay remote SSH cũng nên biết)

## Mosh là gì?
[**Mosh**](https://mosh.org/) là sự kết hợp của *mobile* và *shell* (vỏ sò di động =))))))) ) nghe cũng xịn xò đấy chứ. Trên trang chủ của **Mosh** đập vào mắt đã giới thiệu những tính năng chính và xịn xò nhất của **Mosh** đó là:

- Hỗ trợ roaming (Roaming ở đây là bạn chuyển từ wifi sang 1 wifi khác hoặc từ wifi sang cellular và ngược lại). 
- Hỗ trợ kết nối không liên tục
- Tối ưu tốc độ phản hồi khi vừa gõ phím

Ở trong môi trường mạng cục bộ **LAN**, chúng ta không thấy sự rõ rệt khác nhau giữa **Mosh** và **SSH** bởi **Mosh** sinh ra để khắc phục những vấn đề liên quan đến kết nối ở 1 khoảng cách xa (long-distance link) như qua mạng Internet, mạng di động,... 

## Tại sao tôi nên lựa chọn **Mosh**
Ồ đây cũng là một câu hỏi mình suy nghĩ tới khi nghe đến **Mosh**. **Mosh** có thể còn non trẻ hơn **SSH** bởi **SSH** đã tồn tại 26 năm nay còn **Mosh** mới được 9 năm :3. Tuy **SSH** vẫn cập nhật nhưng do tính chất giao thức nên một số tính năng đối với **SSH** chỉ là trong giấc mơ :(. Với **Mosh** mình sẽ liệt kê một số điểm sáng sau mà nhà phát hành đã nói đến
- Giữ kết nối ngay cả khi IP bị thay đổi
- Makes for sweet dreams (cái này mình lấy nguyên gốc của nhà phát hành), nói đơn giản là chiếc laptop của bạn sẽ "ngủ ngon" hơn, và khi nó thức dậy mọi kết nối sẽ tự kết nối lại :( Đây là tính năng mình đã phải rất đau đầu ở trên **SSH** bởi server trên cloud, muốn save lại cái gì đó trước khi đi từ công ty về nhà phải dùng screen, khá bất tiện
- Giảm thiểu lag: Với **SSH**, mọi thứ bạn nhập phải gửi về server trước rồi mới hiện ra ở cửa sổ ssh-client, với **Mosh** chúng sẽ được xử lí ở client trước, điều này phần nào giúp bạn đỡ gõ sai hơn nếu terminal của bạn sử dụng zsh với 1 những pack autocomplete hoặc syntax-highlight
- Không yêu cầu superuser để chạy
- Sử dụng phương thức Auth của **SSH**: Đây là cái mình thấy xịn xò nhất của **Mosh**, bạn không cần phải tìm hiểu hay quản lí quá nhiều với **Mosh** bởi flow-control của **Mosh** là sử dụng **SSH** để xác thực và sau đó sẽ tạo 1 kết nối UDP để giảm thiểu độ trễ (khác với **SSH** thuần trên TCP/22). Điều này có nghĩa là bạn cũng sẽ cần mở cả 2 port nhưng bạn có thể disable tính năng shell của **SSH**
- Sử dụng thuần UTF-8 :3 hiểu đơn giản thôi mấy cái lỗi UTF-8 không còn dính nữa đâu
![](https://images.viblo.asia/853ba301-cc89-4283-b224-2c561dfba3ae.png)
![](https://images.viblo.asia/35993af4-74e6-47d2-90d1-c5dfc12325ee.png)
![](https://images.viblo.asia/54ac9710-c2c1-4164-988b-7ec5eefdcf87.png)
- Sử dụng Control-C mọi lúc mọi nơi: Khác với **SSH** thì do **Mosh** dựa vào UDP nên có thể dễ dàng xử lí việc mất gói mạng và set frame tùy thuộc vào tốc độ mạng của bạn. **Mosh** có thể cho phép sử dụng Control-C mọi lúc vì chúng không gây lấp đấy buffer network

## Cài đặt **Mosh** trên Ubuntu
### Mở port
Do **Mosh** sử dụng UDP nên ta sẽ phải mở port trước
- Mở port **SSH**: Mặc định là 22, cái này nếu bạn thích có thể custom lại port với 1 loạt hướng dẫn trên mạng nhé
- Mở port **Mosh**: Mở UDP với range từ 60000 đến 61000
*Note*: Nếu bạn sử dụng firewall sử dụng lệnh sau để thông port
```bash
sudo iptables -I INPUT 1 -p udp --dport 60000:61000 -j ACCEPT
sudo ufw allow 60000:61000/udp
```
và đừng quên mở port trong cloud service hay router nhé :3 hình dưới đây là mình setup với AWS
![](https://images.viblo.asia/2cb36666-72fa-4b29-b4a0-d58ceb88e290.png)

### Cài đặt mosh
Khi cài 1 phần mềm gì đó vào Ubuntu, quên `apt update` là một tội lỗi lớn
```bash
sudo apt-get update
sudo apt-get install mosh
```

### Kết nối đến Mosh
#### Với terminus
:3 Mình hay sử dụng Termius để quản lí SSH cho dễ, cái này nếu bạn nào quen rồi chỉ cần enable cái Mosh lên là được
![](https://images.viblo.asia/e05e9f10-3cd6-441c-af43-5980fcd2e74a.png)

#### Với Terminal
Đầu tiên bạn cần cài mosh trước, trên trang chủ đã hướng dẫn cài trên từng nên tảng khác nhau, và sử dụng lệnh sau để connect vào
```bash
mosh <username>@<host>  --ssh="<ssh command>"
```
*Note*: Đối với những bạn sử dụng port 22 và sử dụng password, tùy chọn ssh có thể bỏ qua; phần `<ssh command>` có thể thay bằng `ssh -p 2222` nếu bạn sử dụng port 2222 với SSH hoặc `ssh -i <key_path>` đối với xử dụng key để auth

Và đây là kết quả
![](https://images.viblo.asia/f2cb7174-2ff7-496d-a9d3-cc931768a25a.png)
Khi vừa ngắt kết nối mạng

![](https://images.viblo.asia/51b8f3e3-c9e5-4859-9f2d-da6b9f2a8f87.png)
Khi có kết nối trở lại

**Note**: Nếu bạn có lỗi liên quan đến UTF-8 thì hãy thêm những dòng sau vào .bashrc hay .zshrc của bạn
```bash
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
export LANGUAGE=en_US.UTF-8
```

Đến đây xin được phép hết :3 Do bận quá chưa kịp chuẩn bị meme nên ở bài tiếp theo hứa sẽ có meme cho cute :(( tại mình mới cài lại win mà cài pts cứ crack hix
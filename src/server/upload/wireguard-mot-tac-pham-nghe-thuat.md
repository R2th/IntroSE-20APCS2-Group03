## Giới thiệu
Nếu bạn đã từng sử dụng Facebook vào những năm thứ 10 của thế kỷ 21, bạn đã trải qua khoảng thời gian khó khăn của những dân chơi Facebook hồi đó - sử dụng VPN, vì nhà mạng của Việt Nam chặn IP của Facebook. Vậy VPN là gì mà nó lại có thể bypass được rule của nhà mạng như vậy nhỉ :scream:

VPN (Virtual Private Network - mạng riêng ảo) cho phép người dùng tạo một đường hầm (tunnel) để kết nối với một mạng khác trên Internet. VPN rất thích hợp khi các bạn muốn sử dụng Internet với mục đích riêng tư, ngăn chặn việc kiểm tra truy cập của ISP - nhà cung cấp dịch vụ mạng, hay là bạn truy cập Wifi trong quán cafe mà vẫn muốn riêng tư, hay với một điều khác là bạn ngồi tại công ty nhưng muốn lấy dữ liệu từ ổ cứng ở nhà bạn. 

![](https://images.viblo.asia/2a539a99-8833-4e93-810e-2d880c44400c.jpeg)

Chuyện ở một công ty nọ, vào giờ làm là bị chặn Youtube, nhưng tài liệu học tập toàn ở trên đó mới khổ, thế nên một người anh xã hội của tôi phải sử dụng VPN để xem được Yotube.  
> "Tuy anh đang sống ở Việt Nam, nhưng lúc nào anh cũng đang ở bên Mỹ" - Trích lời một người anh xã hội nào đó.

Tuy nhiên, bài này của mình không phải là giới thiệu VPN là gì, cách hoạt động của nó ra sao. Ở đây, mình muốn giới thiệu với các bạn một loại VPN tầm gần 1 năm mình thường xuyên sử dụng. Nó khác hoàn toàn với OpenVPN, IPSec mà các bạn từng biết, đó là những tiêu chuẩn VPN từ rất lâu rồi. Hôm nay mình muốn giới thiệu về **WireGuard** - VPN hiện đại bây giờ.
## WireGuard là gì?
![](https://images.viblo.asia/3d9e5eac-1894-42f7-9bad-3f5aef27e36f.png)

Cũng giống như OpenVPN và IPSec, WireGuard là một hệ thống VPN, nó cũng giúp các bạn thiết lập một kết nối mã hóa giữa máy client và server thông qua kết nối Internet. WireGuard được hoạt động ở layer 3, được thiết kế như một virtual network interface của Kernel cho Linux. WireGuard được sinh ra nhằm mục đích thay thế cho IPSec trong hầu hết các trường hợp sử dụng, và dựa vào các giải pháp dựa trên TLS như OpenVPN, trong khi WireGuard an toàn hơn, nhanh hơn, và dễ sử dụng hơn. 

**Linus Torvalds đã gửi mail cho David Miller với nội dung như thế này**
> Pulled.  
> Btw, on an unrelated issue: I see that Jason actually made the pull request to have wireguard included in the kernel.  
> Can I just once again state my love for it and hope it gets merged soon? Maybe the code isn't perfect, but I've skimmed it, and compared to the horrors that are OpenVPN and IPSec, it's a work of art.

**Linus Torvalds** - người sáng tạo ra Linux đã nói về **WireGuard** như một tác phẩm nghệ thuật vậy. WireGuard có code OpenSource trên Github và nó chỉ có chưa đến **4000 dòng code**, không bằng 1% số lượng code của OpenVPN (600.000 dòng), giúp dễ dàng kiểm tra và xác minh. 

WireGuard đã được tích hợp vào Kernel 5.6 (các bạn có thể đọc tại https://lists.zx2c4.com/pipermail/wireguard/2020-March/005206.html). Vậy là từ Kernel 5.6 trở đi, WireGuard được cài đặt theo mặc định, và sẽ giúp cho mọi người tiếp cận về WireGuard nhiều hơn, tốt hơn. 

## WireGuard nhanh như thế nào?
Nãy giờ mình đã nói WireGuard nó nhanh hơn OpenVPN hay IPSec, vậy nó nhanh đến mức như thế nào. Có một bài test khách quan ở dưới đây, mọi người có thể xem và so sánh nhé
{@embed: https://www.youtube.com/watch?v=RkgL-NfPdYs}
## Trao đổi khóa và gói dữ liệu
WireGuard sử dụng `Noise_IK` bắt tay từ Noise, dựa trên hoạt động của CurveCP, NaCL, KEA +, SIGMA, FHMQV và HOMQV . Tất cả được đóng gói và được gửi qua UDP.

Trao đổi khóa có các đặc tính tốt sau:
- Tránh mạo danh
- Tránh các cuộc tấn công phát lại (replay attack)
- Perfect forward secrecy
- Đạt được "AKE Security"
- Ẩn danh
## Nhược điểm của WireGuard
- Chỉ hỗ trợ giao thức UDP
- Vẫn đang được contribute để được hoàn thiện hơn
- Hoạt động tốt nhất trên Linux
## Tham khảo
- https://www.wireguard.com/
- https://www.wireguard.com/protocol/
- https://www.wireguard.com/papers/wireguard.pdf
- https://www.wireguard.com/repositories/
- https://lists.openwall.net/netdev/2018/08/02/124
- https://duo.com/decipher/wireguard-vpn-added-to-linux-kernel
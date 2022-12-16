Ở bài viết này tụi mình sẽ cùng tìm hiểu về các keyword cơ bản nhất liên quan đến Networking. Nếu các bạn đến từ bài viết trước [Dev ops là gì](https://viblo.asia/p/devops-la-gi-cung-hoc-devops-voi-minh-nhe-devops-101-2oKLn2EgLQO) thì mình cũng có đề cập rằng kiến thức về Networking cũng là một trong những thứ quan trọng mà một Devops Engineer cần có. Vậy hãy cùng mình tìm hiểu nhé!

![](https://images.viblo.asia/3a406acc-a539-4ccf-b92e-a84882029852.jpg)
*<div align="center">Image from Jordan Harrison</div>*

## Host
Host là bất kỳ thiết bị nào cái có thể gửi hoặc nhận tín hiệu, có thể là server, máy tính, điện thoại, máy in, smart TV,...

![image.png](https://images.viblo.asia/9afdae59-a874-4985-be01-1f71dbadfa94.png)

## IP Address
Địa chỉ IP chính là định danh của một Host. Bạn có thể kiểm tra địa chỉ IP hiện tại của mình ở [đây](https://whatismyipaddress.com/)

![image.png](https://images.viblo.asia/fb8e4cc3-14ad-4c6d-b2c7-5c78e7d0d65a.png)

## Network
* Network là một nhóm các Host có cùng kết nối với nhau
* Các Host trên cùng một Network chia sẻ cùng 1 địa chỉ IP
* Network có thể chứa các network khác (subnet)
* Network có thể kết nối với các network khác (internet)

![image.png](https://images.viblo.asia/fd8da928-2fa5-4569-899a-096e337d3e9e.png)

## Switch
Switch phụ trách việc giao tiếp nội bộ bên trong một network, nó gửi hoặc vận chuyển các gói dữ liệu cho các Host

![image.png](https://images.viblo.asia/81282bc6-ba9f-4136-b0fb-fb21c7330142.png)

## Router
Khác với Switch, Router phụ trách việc giao tiếp giữa các Network với nhau. Router ghi nhớ những network mà nó được gắn vào. Mỗi network sẽ ứng với một con đường (route), router sẽ lưu Route của các Network mà nó biết vào một nơi gọi là Routing Table. Route table chính là tấm bản đồ giúp Router gửi các gói dữ liệu từ trong Network của mình đến các Network bên ngoài mà nó biết.

![image.png](https://images.viblo.asia/d02b9c05-6feb-4ca5-b515-50a9c3278d70.png)

Trên đây là những ý kiến cá nhân của mình sau khi tìm hiểu, nếu có sai sót gì mong mọi người góp ý nhé!
Tạm thời tụi mình sẽ dừng lại ở đây, nếu mọi người hứng thú với chủ đề này mình sẽ tiếp tục ra thêm các bài viết liên quan đến Networking. Hoặc nếu các bạn thích về Docker thì bài viết sau mình sẽ cùng tìm hiểu về nó nhé. Cảm ơn các bạn đã xem hết nha!

## Tham khảo
[90DaysOfDevOps](https://github.com/MichaelCade/90DaysOfDevOps/blob/main/Days/day21.md)
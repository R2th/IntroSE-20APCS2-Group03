- Ở phần trước, chúng ta đã cùng nhau tìm hiểu về cấu trúc và các loại địa chỉ IPv6. Trong phần này, chúng ta sẽ cùng nhau tìm hiểu về kỹ thuật chuyển đổi IPv4 sang IPv6.
- Thủ tục IPv6 phát triển khi IPv4 đã được sử dụng rộng rãi, mạng lưới IPv4 Internet hoàn thiện, hoạt động dựa trên thủ tục này. Trong quá trình triển khai thế hệ địa chỉ IPv6 trên mạng Internet, không thể có một thời điểm nhất định mà tại đó, địa chỉ IPv4 được hủy bỏ, thay thế hoàn toàn bởi thế hệ địa chỉ mới IPv6. Hai thế hệ mạng IPv4, IPv6 sẽ cùng tồn tại trong một thời gian rất dài. Trong quá trình phát triển, các kết nối IPv6 sẽ tận dụng cơ sở hạ tầng sẵn có của IPv4.
Do vậy cần có những công nghệ phục vụ cho việc chuyển đổi từ địa chỉ IPv4 sang địa chỉ IPv6. Những công nghệ chuyển đổi này, cơ bản có thể phân thành ba loại như sau:
- Công nghệ đường hầm (Tunnel): Công nghệ sử dụng cơ sở hạ tầng mạng IPv4 để truyền tải gói tin IPv6, phục vụ cho kết nối IPv6.
- Dual-stack: Cho phép IPv4 và IPv6 cùng tồn tại trong cùng một thiết bị mạng.
- Công nghệ biên dịch: Thực chất là một dạng thức công nghệ NAT, cho phép thiết bị chỉ hỗ trợ IPv6 có thể giao tiếp với thiết bị chỉ hỗ trợ IPv4.
- Trong bài viết này, chúng sẽ đi sâu vào tìm hiểu về Công nghệ đường hầm (Tunnel) nhé.
# 1) Tổng quan về Công nghệ đường hầm:
- Công nghệ đường hầm là một phương pháp sử dụng cơ sở hạ tầng sẵn có của mạng IPv4 để thực hiện các kết nối IPv6 bằng cách sử dụng các thiết bị mạng có khả năng hoạt động dual-stack tại hai điểm đầu và cuối nhất định. Các thiết bị này “bọc” gói tin IPv6 trong gói tin IPv4 và truyền tải đi trong mạng IPv4 tại điểm đầu và gỡ bỏ gói tin IPv4, nhận lại gói tin IPv6 ban đầu tại điểm đích cuối đường truyền IPv4.
Hình dưới đây mô tả quá trình chuyển tiếp gói tin qua đường hầm.

![](https://images.viblo.asia/6bb83714-0961-4cc2-a111-de6951b62817.jpg)
- Giá trị của trường Protocol Field trong IPv4 header luôn được xác lập có giá trị 41 để xác định đây là gói tin IPv6 được bọc trong gói tin IPv4. Do vậy để các gói tin có thể truyền đi trên cơ sở hạ tầng mạng IPv4, nếu trên đường kết nối có sử dụng firewall, firewall này cần phải được thiết lập để cho phép gói tin có giá trị Protocol 41 đi qua.
Điểm kết thúc tunnel có thể được xác định tại host hoặc router tạo nên kết nối như sau:
    - Router-tới-Router
    - Host-tới-Router hoặc Router-tới-Host
    - Host-tới-Host
#  2) Nguyên tắc hoạt động của việc tạo đường hầm:

 ![](https://images.viblo.asia/00522901-efad-4c5a-9104-42030c8ff5e5.png)
- Xác định thiết bị kết nối tại các điểm đầu và cuối đường hầm. Hai thiết bị này phải có khả năng hoạt động với cả địa chỉ IPv4 và IPv6.
- Xác định địa chỉ IPv4 và địa chỉ IPv6 nguồn và đích của giao diện tunnel (hai đầu kết thúc tunnel)
- Trên hai thiết bị kết nối tại đầu và cuối tunnel, thiết lập một giao diện tunnel (giao diện ảo, không phải giao diện vật lí) dành cho những gói tin IPv6 sẽ được bọc trong gói tin IPv4 đi qua.
- Gắn địa chỉ IPv6 cho giao diện tunnel.
- Tạo tuyến (route) để các gói tin IPv6 đi qua giao diện tunnel. Tại đó, chúng được bọc trong gói tin IPv4 có giá trị trường Protocol 41 và chuyển đi dựa trên cơ sở hạ tầng mạng IPv4 và nhờ định tuyến IPv4.
# 3) Phân loại kỹ thuật đường hầm:
Tùy theo công nghệ tunnel, các điểm bắt đầu và kết thúc đường tunnel có thể được cấu hình bằng tay bởi người quản trị, hoặc được tự động suy ra từ địa chỉ nguồn và địa chỉ đích của gói tin IPv6. Đường kết nối tunnel sẽ có dạng kết nối điểm - điểm hay điểm – đa điểm. Dựa theo cách thức thiết lập điểm đầu và cuối đường hầm (tunnel), công nghệ tunnel có thể phân thành ba loại: tunnel bằng tay (Manual Tunnel), tunnel bán tự động (Semi-automated) và tunnel tự động (Automatic).

## 3.1. Tunnel bằng tay:
![](https://images.viblo.asia/27779ff7-3cfc-4e41-935b-55f7ea7fe8cb.png)
- Tunnel bằng tay là hình thức tạo đường hầm kết nối IPv6 trên cơ sở hạ tầng mạng IPv4, trong đó đòi hỏi phải có cấu hình bằng tay các điểm kết thúc tunnel. Trong tunnel cấu hình bằng tay, các điểm kết cuối đường hầm này sẽ không được suy ra từ các địa chỉ nằm trong địa chỉ nguồn và địa chỉ đích của gói tin.
- Thông thường, hình thức tạo đường hầm bằng tay này thường được cấu hình để tạo đường hầm giữa router tới router (hai border router) nhằm kết nối hai mạng IPv6 xác định sử dụng cơ sở hạ tầng mạng IPv4. Nó cũng có thể được cấu hình giữa router và host để kết nối IPv6 host vào một mạng IPv6 từ xa.
- Việc cấu hình giao diện tunnel, bao gồm địa chỉ IPv6 gắn cho giao diện tunnel, địa chỉ IPv4 của các điểm kết thúc tunnel cần phải được cấu hình bằng tay cùng với tuyến sẽ sử dụng giao diện tunnel.
- Tunnel cấu hình bằng tay tương đương với một đường link vĩnh viễn (permanent link) giữa hai miền IPv6 trên cơ sở hạ tầng mạng IPv4, cho một kết nối ổn định giữa hai điểm xác định. Dạng kết nối tunnel này là kết nối điểm – điểm, tạo nên một đường kết nối ổn định, bảo mật, riêng biệt. Tính chất này tương tự như khi ta cấu hình định tuyến tĩnh (static route) so với định tuyến động (dynamic route). Tuy nhiên, nó đòi hỏi cấu hình, quản trị thủ công. Nếu muốn kết nối tới nhiều điểm, sẽ phải tạo nhiều giao diện tunnel và nhiều đường tunnel.
- Trong trường hợp một tổ chức có hai phân mạng IPv6 tại hai vùng địa lý và chỉ có cơ sở hạ tầng IPv4 giữa hai phân mạng này. Trong trường hợp đó, để có thể có kết nối IPv6, tạo một tunnel cấu hình bằng tay giữa hai router gateway của hai phân mạng có thể là sự lựa chọn tốt nhất để có một kết nối ổn định.
## 3.2. Tunnel bán tự động (Tunnel Broker):
![](https://images.viblo.asia/f117f5e9-a3eb-410b-8e47-66c885859565.JPG)
- Tunnel Broker là hình thức tunnel, trong đó một tổ chức đứng ra làm trung gian, cung cấp kết nối tới Internet IPv6 cho những thành viên đăng ký sử dụng dịch vụ Tunnel Broker do tổ chức cung cấp.
- Tổ chức cung cấp dịch vụ Tunnel Broker có vùng địa chỉ IPv6 độc lập, toàn cầu, xin cấp từ các tổ chức quản lý địa chỉ IP quốc tế, mạng IPv6 của tổ chức có kết nối tới Internet IPv6 và những mạng IPv6 khác. Thành viên đăng ký và được cấp quyền sử dụng dịch vụ Tunnel Broker sẽ nhận được những thông tin từ tổ chức quản lý Tunnel Broker để thiết lập đường hầm tunnel từ host hoặc từ router gateway mạng IPv6 của tổ chức mình tới mạng của tổ chức duy trì Tunnel Broker, từ đó kết nối tới được Internet IPv6 hay những mạng IPv6 khác mà tổ chức duy trì Tunnel Broker có kết nối tới.
- Người sử dụng sẽ kết nối tới được IPv6 Internet và các mạng IPv6 khác khi đăng ký và được phép sử dụng dịch vụ Tunnel Broker của nhà cung cấp. Người sử dụng sẽ được cung cấp thông tin để thiết lập đường hầm từ host hoặc mạng của mình đến mạng của tổ chức duy trì Tunnel Broker và dùng mạng này như một trung gian để kết nối tới các mạng IPv6 khác. Người đăng ký sử dụng dịch vụ Tunnel Broker sẽ được cấp một vùng địa chỉ thuần IPv6, tuỳ theo nhu cầu sử dụng từ không gian địa chỉ IPv6 của nhà cung cấp dịch vụ tunnel broker và được chuyển giao một không gian tên miền cấp dưới không gian tên miền của nhà cung cấp dịch vụ Tunnel Broker. Đây là địa chỉ và tên miền hợp lệ toàn cầu, thành viên của Tunnel Broker có thể sử dụng tên miền này để thiết lập IPv6 Website cho phép những mạng IPv6 có kết nối tới mạng của nhà cung cấp dịch vụ Tunnel Broker truy cập tới.
- Đường hầm thiết lập giữa người sử dụng và mạng của nhà cung cấp dịch vụ Tunnel Broker được cấu hình trên nguyên lý Tunnel bằng tay.
## 3.3. Tunnel tự động (6to4 tunnel):
![](https://images.viblo.asia/a3b46c00-c3f6-450c-a15e-ac6c640a1e6e.png)
- Tunnel tự động là công nghệ tunnel trong đó không đòi hỏi phải cấu hình địa chỉ IPv4 của điểm bắt đầu và kết thúc tunnel bằng tay.
- Nói tới đường hầm tự động, người ta thường nhắc tới kỹ thuật 6to4 tunnel. Kỹ thuật 6to4 tunnel cho phép truy cập Internet IPv6 mà không cần nhiều thủ tục hay cấu hình phức tạp, bằng cách sử dụng địa chỉ IPv6 đặc biệt có tiền tố prefix 2002::/16 đã được IANA cấp dành riêng cho công nghệ 6to4, kết hợp với địa chỉ IPv4 toàn cầu.
- Tunnel 6to4 cho phép những miền IPv6 6to4 tách biệt có thể kết nối qua mạng IPv4 tới những miền IPv6 6to4 khác. Điểm khác biệt cơ bản nhất giữa tunnel tự động 6to4 và tunnel cấu hình bằng tay là ở chỗ đường hầm 6to4 là dạng kết nối điểm – đa điểm. Trong đó, các router không được cấu hình thành từng cặp mà chúng coi môi trường kết nối IPv4 là một môi trường kết nối vật lý ảo. Chính địa chỉ IPv4 gắn trong địa chỉ IPv6 sẽ được sử dụng để tìm thấy đầu bên kia của đường tunnel.
- Kỹ thuật tunnel 6to4 được sử dụng khi kết nối nhiều mạng IPv6 riêng biệt, trong đó mỗi mạng có ít nhất một đường kết nối tới mạng IPv4 chung sử dụng địa chỉ IPv4 toàn cầu.
### * Địa chỉ IPv6 sử dụng trong 6to4 tunnel:
- IANA đã phân bổ dành riêng một prefix địa chỉ cho công nghệ tunnel 6to4 toàn cầu. Đó là 2002::/16
- Prefix địa chỉ này, kết hợp với 32 bít địa chỉ IPv4 sẽ tạo nên một prefix địa chỉ 6to4 kích cỡ /48 duy nhất toàn cầu sử dụng cho một mạng IPv6.
- Prefix /48 địa chỉ IPv6 tương ứng một địa chỉ IPv4 toàn cầu được tạo nên theo nguyên tắc trên hình vẽ dưới đây:
![](https://images.viblo.asia/3d6f8c6e-7fc5-4279-afe8-ba7ffb8083b3.png)
- Ví dụ, nếu một router đang nối vào Internet IPv4 với địa chỉ 203.119.9.15. Khi đó chúng ta sẽ có một vùng địa chỉ IPv6 6to4 như sau: 2002:cb77:090f::/48
### * Các thành phần của tunnel 6to4, cung cấp kết nối IPv6 toàn cầu:
![](https://images.viblo.asia/532f148b-6be7-4d7e-b65c-889dfc1058a4.png)
- 6to4 host: Là bất kỳ host IPv6 nào được cấu hình với ít nhất một địa chỉ 6to4, địa chỉ 6to4 có thể được tự động cấu hình.
- 6to4 router: Là một router dual-stack hỗ trợ sử dụng giao diện 6to4. Router này sẽ chuyển tiếp lưu lượng có gán địa chỉ 6to4 giữa những 6to4 host trong một site và tới những router 6to4 khác hoặc tới 6to4 relay router trong mạng IPv4 Internet.
- 6to4 relay router: Là một dual stack router thực hiện chuyển tiếp lưu lượng có địa chỉ 6to4 của những router 6to4 trên Internet và host trên IPv6 Internet (sử dụng địa chỉ IPv6 chính thức, cung cấp bởi tổ chức quản lý địa chỉ toàn cầu). 6to4 relay router là một 6to4 router được cấu hình để hỗ trợ chuyển tiếp định tuyến giữa địa chỉ 6to4 và địa chỉ IPv6 chính thức (địa chỉ IPv6 định danh toàn cầu). 6to4 relay router sẽ là gateway kết nối giữa mạng 6to4 và IPv6 Internet. Nhờ đó giúp cho những mạng IPv6 6to4 có thể kết nối tới Internet IPv6.
# 4) Cấu hình:
- Sau đây, chúng ta sẽ thực hiện một bài lab nho nhỏ để hiểu thêm về Kỹ thuật chuyển đổi IPv4 sang IPv6 sử dụng Công nghệ đường hầm (Tunnel).
- Trong bài lab này, chúng ta sẽ cấu hình Automatic 6to4 tunnel. Mô hình chuyển đổi như sau:
![](https://images.viblo.asia/20367375-157e-4c49-9641-a7a999e0ecde.jpg)
- Chuyển đổi địa chỉ IPv4 sang IPv6:
    ```
    192.168.10.2 -> Mã hex: C0A8:0A02 -> Địa chỉ được chèn vào địa chỉ IPv6: 2002:C0A8:A02::/128 
    192.168.20.2 -> Mã hex: C0A8:1402 -> Địa chỉ được chèn vào địa chỉ IPv6: 2002:C0A8:1402::/128
### * Bước 1: Cấu hình gán địa chỉ trên các router thuộc mạng IPv6
- Router R1:
```
R1(config)# ipv6 unicast-routing
R1(config)#interface FastEthernet0/0
R1(config-if)# ipv6 address 2001::1/64
```
- Router R2:
```
R2(config)# ipv6 unicast-routing
R2(config)#interface FastEthernet0/0
R2(config-if)# ipv6 address 2001::2/64
```
- Router R4:
```
R4(config)# ipv6 unicast-routing
R4(config)#interface FastEthernet0/1
R4(config-if)# ipv6 address 2003::2/64
```
- Router R5:
```
R5(config)# ipv6 unicast-routing
R5(config)#interface FastEthernet0/1
R5(config-if)# ipv6 address 2003::1/64
```
### * Bước 2: Cấu hình gán địa chỉ và định tuyến trong mạng IPv4
- Router R2: Đặt địa chỉ IP và định tuyến OSPF trên mạng IPv4
```
R2(config)#interface FastEthernet0/1
R2(config-if)# ip address 192.168.10.2 255.255.255.0
R2(config)#router ospf 1
R2(config-router)#network 192.168.10.0 0.0.0.255 area 0
```
- Router R3: Đặt địa chỉ IP và định tuyến OSPF trên mạng IPv4
```
R3(config)#interface FastEthernet0/1
R3(config-if)# ip address 192.168.10.3 255.255.255.0
R3(config)#interface FastEthernet0/0
R3(config-if)# ip address 192.168.20.3 255.255.255.0
R3(config)#router ospf 1
R3(config-router)#network 192.168.10.0 0.0.0.255 area 0
R3(config-router)#network 192.168.20.0 0.0.0.255 area 0
```
### * Bước 3: Cấu hình Automatic 6to4 tunnel
- Tạo Tunnel giữa router R2 và R4:
```
R2(config)#interface Tunnel1
R2(config-if)#ipv6 address 2002:C0A8:A02::2/64
R2(config-if)#tunnel source FastEthernet0/1
R2(config-if)#tunnel mode ipv6ip 6to4
```
```
R4(config)#interface Tunnel1
R4(config-if)#ipv6 address 2002:C0A8:1402::2/64
R4(config-if)#tunnel source FastEthernet0/0
R4(config-if)#tunnel mode ipv6ip 6to4
```
- Cấu hình định tuyến cho mạng 2002:: (do chưa có route cho mạng 2002:: qua tunnel)
```
R2(config)#ipv6 route 2002::/16 Tunnel1
R4(config)#ipv6 route 2002::/16 Tunnel1
```
- Cấu hình định tuyến tĩnh trên các router để gói tin có thể đi đến mạng khác:
```
R1(config)#ipv6 route ::/0 2001::2
R2(config)#ipv6 route ::/0 2002:C0A8:1402::2
R4(config)#ipv6 route ::/0 2002:C0A8:A02::2
R5(config)#ipv6 route ::/0 2003::2
```
### * Bước 4: Kiểm tra
- Tiến hành ping kiểm tra mạng IPv4: Từ dải mạng 192.168.10.0 sang 192.168.20.0:
![](https://images.viblo.asia/1e890fc4-a3b1-456d-aef5-1d2862746385.JPG)
- Tiến hành ping kiểm tra mạng IPv4: Từ dải mạng 192.168.20.0 sang 192.168.10.0:
![](https://images.viblo.asia/74ef62c9-7d49-4cd1-a5db-6bd727ebe89e.JPG)
- Show bảng route trên IPv4:

    ![](https://images.viblo.asia/78595ddb-423e-4ee8-9e0b-4b1924980360.JPG)
- Tiến hành ping kiểm tra mạng IPv6: Từ dải mạng 2001::/64 sang 2003::/64
![](https://images.viblo.asia/0876c207-23c3-42fc-9e5b-05a85b0756c4.JPG)
- Tiến hành ping kiểm tra mạng IPv6: Từ dải mạng 2003::/64 sang 2001::/64
![](https://images.viblo.asia/24add2d1-f1e8-4a8a-aff2-812efc424aa2.JPG)
- Show bảng route trên IPv6:

    ![](https://images.viblo.asia/b97a7bfb-1527-4023-bb25-4d02108cd16f.JPG)
    
    ![](https://images.viblo.asia/5d2dda4f-bf53-47d9-9e14-daff7fb4d16a.JPG)
    
    ![](https://images.viblo.asia/88ae9a83-1930-4587-beb3-2059a2b087fb.JPG)
    
    ![](https://images.viblo.asia/e394ff09-4dcf-4f2c-b649-5bda5d76ab7f.JPG)

Vậy là ở bài lab này, chúng ta đã cấu hình được Tunnel để cho phép 2 mạng IPv6 kết nối được với nhau thông qua mạng IPv4. Ở bài viết sau, chúng ta sẽ tìm hiểu thêm về các công nghệ khác được triển khai trên nền tảng IPv6.
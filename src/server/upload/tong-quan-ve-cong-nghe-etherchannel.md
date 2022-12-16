# 1) Đặt vấn đề:
- Thiết bị Switch có thể sử dụng các cổng Ethernet, Fast-Ethernet(FE), GigaEthernet(GE), 10 GigaEthernet(10GE) để tăng tốc độ các link. Mỗi lần link bị quá tải ta có thể nâng cấp các đường lên 10 lần, nhưng như vậy sẽ rất tốn kém trong việc mua module gắn vào và dây dẫn, bên cạnh đó, không phải switch nào cũng có module để bạn gắn cũng như tốn chi phí về mua dây dẫn. 
- Ví dụ: Ta có hai Switch đang kết nối với nhau bằng cổng Fast Ethernet 100 Mbit trong khi các PC Host kết nối Switch thì dùng cổng Fast với băng thông 1000 Mbit. Hiển nhiên khi mà PC muốn truyền tải một lượng lớn dữ liệu hơn 100 Mbit đi thì tại Switch sẽ xảy ra hiện tượng nghẽn Traffic, các gói tin trong hàng đợi khi quá ngưỡng Cache thi sẽ bị Drop bỏ.
![](https://images.viblo.asia/2c50fe9e-1c3e-4bb8-b4df-9c6428ba88c5.png)
- Khi mà dữ liệu truyền tải quá lớn đến nỗi đường truyền không đáp ứng được thì thay vì ta phải nâng cấp hay mua thiết bị mới thì ta sẽ nghĩ tới việc mở thêm nhiều kết nối dây giữa các Switch để cân bằng tải dữ liệu.
![](https://images.viblo.asia/9b0d7c6b-3796-4648-9834-e21b0e74ca4e.png)
- Ta có thể kết nối thêm 3 đường dây nữa giúp tăng băng thông cân bằng tải lên 400 Mbit. Tuy nhiên cách chữa cháy này sẽ bị STP chặn lại hoàn toàn nhằm chống hiện tượng Loop.

![](https://images.viblo.asia/92213fa6-3abc-4079-a0af-f4237b30a77a.png)
- Một phương pháp khác phù hợp hơn trong trường hợp này để tăng băng thông các link đó là kết hợp (“bó”) các link lại mà vẫn đảm bảo chống Loop. Công nghệ này được gọi là EtherChannel. 



# 2) Giới thiệu về EtherChannel:
![](https://images.viblo.asia/2b893980-26d3-49bf-894f-d60d2b8f15df.gif)
- EtherChannel là một kỹ thuật nhóm hai hay nhiều đường kết nối truyền tải dữ liệu vật lý (Link Aggregation) thành một đường ảo duy nhất (Logic) có Port ảo thậm chí cả MAC ảo nhằm mục đích tăng tốc độ truyền dữ liệu và tăng khả năng dự phòng (Redundancy) cho hệ thống.
- Công nghệ EtherChannel có thể bó từ 2 đến 8 link FE, GE, 10GE thành 1 link logical. Khi đó, switch đối xử các port thuộc EtherChannel như 1 port duy nhất.
- Switch hoặc thiết bị ở 2 đầu EtherChannel phải hiểu và sử dụng công nghệ EtherChannel để đảm bảo hoạt động đúng và chống loop. Nếu chỉ có 1 đầu sử dụng EtherChannel, còn đầu bên kia không sử dụng thì có thể gây ra loop.
- Traffic không phải lúc nào cũng được phân bố đồng đều qua các đường link thuộc EtherChannel, mà nó phụ thuộc vào phương pháp load balancing mà switch sử dụng và mẫu traffic trong mạng.
- Nếu một trong các link thuộc EtherChannel bị down thì traffic sẽ tự động được chuyển sang link khác trong channel chỉ trong vòng vài miliseconds. Khi link up trở lại thì traffic được phân bố lại như cũ.

### 2.1. Điều kiện cấu hình EtherChannel:

  - Các Switch phải đều phải hỗ trợ kỹ thuật EtherChannel và phải được cấu hình EtherChannel đồng nhất giữa các Port kết nối với nhau.
  - Các Port kết nối EtherChannel giữa 2 Switch phải tương đồng với nhau:
    * Cấu hình (Configuration)
    * Tốc độ (Speed)
    * Băng thông (Bandwidth)
    * Duplex (Full Duplex)
    * Native VLAN và các VLANs
    * Switchport Mode (Trunking, Access)
      
### 2.2. Phân phối traffic trong EtherChannel - Load Balancing:

- Switch lựa chọn đường link nào trong EtherChannel để forward frame dựa vào kết quả của thuật toán hash. Thuật toán có thể sử dụng source IP, destination IP (hoặc cả hai), source MAC, destination MAC (hoặc cả hai), TCP/UDP port number. Thuật toán hash sẽ cho ra một chuỗi số nhị phân (0 & 1).
- Nếu chỉ có source hoặc destination được hash (IP, MAC, port number) thì switch sẽ sử dụng một hoặc nhiều low-oder bits của giá trị hash để làm index lựa chọn link trong EtherChannel. Nếu cả source và destination được hash, switch sẽ thực hiện phép toán exclusive-OR (XOR) trên một hoặc nhiều low-order bits để làm index.
### 2.3. Bảng phân loại EtherChannel Load Balancing:
![](https://images.viblo.asia/b647a52c-ab6f-4ff0-88c4-368adb8f9717.png)
### 2.4. Bảng giá trị Load Balancing:
![](https://images.viblo.asia/073c115a-a13c-4477-8907-94bd4beaab32.png)

### 2.5. Phân loại EtherChannel:

Có 2 loại giao thức EtherChannel:

### * LACP (Link Aggregation Control Protocol): 

- Là giao thức cấu hình EtherChannel chuẩn quốc tế IEEE 802.3ad và có thể dùng được cho hầu hết các thiết bị thuộc các hãng khác nhau, LACP hỗ trợ ghép tối đa 16 Link vật lý thành một Link luận lý (8 Port Active – 8 Port Passive).
- LACP có 3 chế độ:
    * On: Chế độ cấu hình EtherChannel tĩnh, chế độ này thường không được dùng vì các Switch cấu hình EtherChannel có thể hoạt động được và cũng có thể không hoạt động được vì các Switch được cầu hình bằng tay phục thuộc vào con người nên hoàn toàn không có bước thương lượng trao đổi chính sách giừa bên dẫn đến khả năng Loop cao và bị STP Block.
    * Active: Chế độ tự động – Tự động thương lượng với đối tác
    * Passive: Chế độ bị động – Chờ được thương lượng
![](https://images.viblo.asia/7e4bb40b-0d96-4676-b8ff-d0d38f2af1b1.png)
### * PAgP (Port Aggregation Protocol): 

- Là giao thức cấu hình EtherChannel độc quyền của các thiết bị hãng Cisco và chỉ hỗ trợ ghép tối đa 8 Link vật lý thành một Link luận lý.
- PAgP cũng có 3 chế độ tương tự LACP:
    * On
    * Active
    * Passive
    
    ![](https://images.viblo.asia/b39fd97d-b862-4b58-874a-c9d6c4bcd46d.png)
# 3) Cấu hình EtherChannel:
- Sau đây chúng ta sẽ cùng nhau làm một bài lab nhỏ để tìm hiểu thêm về cách cấu hình EtherChannel trên thiết bị của Cisco.
- Sơ đồ như sau:

![](https://images.viblo.asia/a1bf96ce-c5ae-4a85-9e7a-b7448de65c44.jpg)
- Quy hoạch địa chỉ IP:
```
- SW1 - VLAN10: 192.168.10.11/24
- SW2 - VLAN10: 192.168.10.12/24
- SW3 - VLAN10: 192.168.10.13/24
```
* Cấu hình cơ bản:
```
 SW1#vlan 10
 SW1#interface Vlan10
 SW1#ip address 192.168.10.11 255.255.255.0
```

```
 SW2#vlan 10
 SW2#interface Vlan10
 SW2#ip address 192.168.10.12 255.255.255.0
```

```
 SW1#vlan 10
 SW1#interface Vlan10
 SW1#ip address 192.168.10.13 255.255.255.0
```

**Cấu hình PAgP:**
- Cấu hình PAgP trên SW1:
```
SW1(config)#interface FastEthernet0/3
SW1(config-if)#switchport trunk native vlan 10
SW1(config-if)#switchport mode trunk
SW1(config-if)#channel-group 1 mode desirable

SW1(config)#interface FastEthernet0/4
SW1(config-if)#switchport trunk native vlan 10
SW1(config-if)#switchport mode trunk
SW1(config-if)#channel-group 1 mode desirable

SW1(config)#interface FastEthernet0/5
SW1(config-if)#switchport trunk native vlan 10
SW1(config-if)#switchport mode trunk
SW1(config-if)#channel-group 1 mode desirable

SW1(config)#interface FastEthernet0/7
SW1(config-if)#switchport trunk native vlan 10
SW1(config-if)#switchport mode trunk
SW1(config-if)#channel-group 1 mode desirable

SW1(config)#interface Port-channel1
SW1(config-if)#switchport trunk native vlan 10
SW1(config-if)#switchport mode trunk
```
- Cấu hình PAgP trên SW3:
```
SW3(config)#interface FastEthernet0/3
SW3(config-if)#switchport trunk native vlan 10
SW3(config-if)#switchport mode trunk
SW3(config-if)#channel-group 1 mode auto

SW3(config)#interface FastEthernet0/4
SW3(config-if)#switchport trunk native vlan 10
SW3(config-if)#switchport mode trunk
SW3(config-if)#channel-group 1 mode auto

SW3(config)#interface FastEthernet0/5
SW3(config-if)#switchport trunk native vlan 10
SW3(config-if)#switchport mode trunk
SW3(config-if)#channel-group 1 mode auto

SW3(config)#interface FastEthernet0/7
SW3(config-if)#switchport trunk native vlan 10
SW3(config-if)#switchport mode trunk
SW3(config-if)#channel-group 1 mode auto

SW3(config)#interface Port-channel1
SW3(config-if)#switchport trunk native vlan 10
SW3(config-if)#switchport mode trunk
```
**Cấu hình LACP:**
- Cấu hình LACP trên SW1:
```
SW1(config)#interface FastEthernet0/1
SW1(config-if)#switchport trunk native vlan 10
SW1(config-if)#switchport mode trunk
SW1(config-if)#channel-group 2 mode active

SW1(config)#interface FastEthernet0/2
SW1(config-if)#switchport trunk native vlan 10
SW1(config-if)#switchport mode trunk
SW1(config-if)#channel-group 2 mode active

SW1(config)#interface Port-channel2
SW1(config-if)#switchport trunk native vlan 10
SW1(config-if)#switchport mode trunk
 ```
 - Cấu hình LACP trên SW2:
```
SW2(config)#interface FastEthernet0/1
SW2(config-if)#switchport trunk native vlan 10
SW2(config-if)#switchport mode trunk
SW2(config-if)#channel-group 2 mode passive

SW2(config)#interface FastEthernet0/2
SW2(config-if)#switchport trunk native vlan 10
SW2(config-if)#switchport mode trunk
SW2(config-if)#channel-group 2 mode passive

SW2(config)#interface Port-channel2
SW2(config-if)#switchport trunk native vlan 10
SW2(config-if)#switchport mode trunk 

SW2(config)#interface FastEthernet0/3
SW2(config-if)#switchport trunk native vlan 10
SW2(config-if)#switchport mode trunk
SW2(config-if)#channel-group 3 mode active

SW2(config)#interface FastEthernet0/4
SW2(config-if)#switchport trunk native vlan 10
SW2(config-if)#switchport mode trunk
SW2(config-if)#channel-group 3 mode active

SW2(config)#interface Port-channel3
SW2(config-if)#switchport trunk native vlan 10
SW2(config-if)#switchport mode trunk
```
 - Cấu hình LACP trên SW3:
```
SW3(config)#interface FastEthernet0/1
SW3(config-if)#switchport trunk native vlan 10
SW3(config-if)#switchport mode trunk
SW3(config-if)#channel-group 3 mode passive

SW3(config)#interface FastEthernet0/2
SW3(config-if)#switchport trunk native vlan 10
SW3(config-if)#switchport mode trunk
SW3(config-if)#channel-group 3 mode passive

SW3(config)#interface Port-channel3
SW3(config-if)#switchport trunk native vlan 10
SW3(config-if)#switchport mode trunk
```
**Kiểm tra:**
- Trên SW1:
```
SW1#show etherchannel summary 
Flags:  D - down        P - in port-channel
        I - stand-alone s - suspended
        H - Hot-standby (LACP only)
        R - Layer3      S - Layer2
        U - in use      f - failed to allocate aggregator
        u - unsuitable for bundling
        w - waiting to be aggregated
        d - default port


Number of channel-groups in use: 2
Number of aggregators:           2

Group  Port-channel  Protocol    Ports
------+-------------+-----------+----------------------------------------------

1      Po1(SU)           PAgP   Fa0/3(P) Fa0/4(P) Fa0/5(P) Fa0/7(P) 
2      Po2(SU)           LACP   Fa0/1(P) Fa0/2(P) 
```
- Trên SW2:
```
SW2#show etherchannel summary 
Flags:  D - down        P - in port-channel
        I - stand-alone s - suspended
        H - Hot-standby (LACP only)
        R - Layer3      S - Layer2
        U - in use      f - failed to allocate aggregator
        u - unsuitable for bundling
        w - waiting to be aggregated
        d - default port


Number of channel-groups in use: 2
Number of aggregators:           2

Group  Port-channel  Protocol    Ports
------+-------------+-----------+----------------------------------------------

2      Po2(SU)           LACP   Fa0/1(P) Fa0/2(P) 
3      Po3(SU)           LACP   Fa0/3(P) Fa0/4(P) 
```
- Trên SW3:
```
SW3#show etherchannel summary 
Flags:  D - down        P - in port-channel
        I - stand-alone s - suspended
        H - Hot-standby (LACP only)
        R - Layer3      S - Layer2
        U - in use      f - failed to allocate aggregator
        u - unsuitable for bundling
        w - waiting to be aggregated
        d - default port


Number of channel-groups in use: 2
Number of aggregators:           2

Group  Port-channel  Protocol    Ports
------+-------------+-----------+----------------------------------------------

1      Po1(SU)           PAgP   Fa0/3(P) Fa0/4(P) Fa0/5(P) Fa0/7(P) 
3      Po3(SU)           LACP   Fa0/1(P) Fa0/2(P) 
```
Ta thấy các interface vật lý đã được gộp lại thành Port Channel và đã được Up-link.
- Ping từ SW1 sang SW2:
```
SW1#ping 192.168.10.12
Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 192.168.10.12, timeout is 2 seconds:
!!!!!
Success rate is 100 percent (5/5), round-trip min/avg/max = 0/0/2 ms
```
- Ping từ SW1 sang SW3:
```
SW1#ping 192.168.10.13

Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 192.168.10.13, timeout is 2 seconds:
!!!!!
Success rate is 100 percent (5/5), round-trip min/avg/max = 0/0/1 ms
```
- Ping từ SW2 sang SW1:
```
SW2#ping 192.168.10.11

Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 192.168.10.11, timeout is 2 seconds:
!!!!!
Success rate is 100 percent (5/5), round-trip min/avg/max = 0/0/1 ms
```
- Ping từ SW2 sang SW3:
```
SW2#ping 192.168.10.13

Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 192.168.10.13, timeout is 2 seconds:
!!!!!
Success rate is 100 percent (5/5), round-trip min/avg/max = 0/0/1 ms
```
- Ping từ SW3 sang SW1:
```
SW3#ping 192.168.10.11

Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 192.168.10.11, timeout is 2 seconds:
!!!!!
Success rate is 100 percent (5/5), round-trip min/avg/max = 0/0/0 ms
```
- Ping từ SW3 sang SW2:
```
SW3#ping 192.168.10.12

Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 192.168.10.12, timeout is 2 seconds:
!!!!!
Success rate is 100 percent (5/5), round-trip min/avg/max = 0/0/1 ms
```
Vậy là trong bài viết lần này, chúng ta đã cùng nhau tìm hiểu về công nghệ EtherChannel và ứng dụng vào việc cấu hình trên các thiết bị thuần Cisco. 
Ở các bài viết tiếp theo, chúng ta sẽ cùng nhau tìm hiểu tiếp về các công nghệ của Cisco.
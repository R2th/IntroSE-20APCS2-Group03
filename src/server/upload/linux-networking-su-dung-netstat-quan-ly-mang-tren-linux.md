# Giới thiệu

**netstat (network statistics)** là một công cụ mạng nằm trong gói công cụ **net-tools**, sử dụng dòng lệnh, được sử dụng để khắc phục sự cố và cấu hình mạng. **netstat** là công cụ hoạt động đa nền tảng, được tích hợp sẵn trên các hệ điều hành Linux, Unix-Like và có sẵn trên cả Windows. Đây là một trong những công cụ gỡ lỗi dịch vụ mạng cơ bản nhất trên Unix/Linux, mạnh mẽ và rất hữu dụng đối với quản trị viên mạng Linux cũng như quản trị viên hệ thống trong việc giải quyết các vấn đề về sự cố liên quan đến network như là lượng connect kết nối, traffic, tốc độ, trạng thái của từng port, Ip... Nó cũng có thể được coi là một công cụ monitor, giúp giám sát các kết nối mạng (cả đến và đi) bằng cách cung cấp các thông tin như bảng định tuyến hay một số thống kê giao diện mạng.

Trong phạm vi bài viết này, mình sẽ cùng các bạn tìm hiểu sử dụng netstat trên hệ điều hành Linux nhé! :)))

### Note

> Hiện tại bộ công cụ **iproute2** đã được thay thế mặc định cho bộ công cụ **net-tools** ở các bản phân phối Linux mới như RHEL7, CentOS 7,... Cùng với đó, công cụ **ss** mới cũng được sử dụng thay cho **netstat** với một số ưu điểm ưu điểm đơn giản hơn và nhanh hơn công cụ truyền thống **netstat**. Các chức năng và cách sử dụng của lệnh **ss** nhìn chung cũng tương tự như **netstat**.


# Các tùy chọn thiết lập lệnh netstat
Lệnh netstat được xây dựng với nhiều các cờ tùy chọn khác nhau, để xem thông tin sử dụng lệnh và các tùy chọn, bạn sẽ dử dụng **`netstat -h`** hoặc **`netstat --help`**

```
thanhthu ~ netstat -h
usage: netstat [-vWeenNcCF] [<Af>] -r         netstat {-V|--version|-h|--help}
       netstat [-vWnNcaeol] [<Socket> ...]
       netstat { [-vWeenNac] -i | [-cnNe] -M | -s [-6tuw] }

        -r, --route              display routing table
        -i, --interfaces         display interface table
        -g, --groups             display multicast group memberships
        -s, --statistics         display networking statistics (like SNMP)
        -M, --masquerade         display masqueraded connections

        -v, --verbose            be verbose
        -W, --wide               don't truncate IP addresses
        -n, --numeric            don't resolve names
        --numeric-hosts          don't resolve host names
        --numeric-ports          don't resolve port names
        --numeric-users          don't resolve user names
        -N, --symbolic           resolve hardware names
        -e, --extend             display other/more information
        -p, --programs           display PID/Program name for sockets
        -o, --timers             display timers
        -c, --continuous         continuous listing

        -l, --listening          display listening server sockets
        -a, --all                display all sockets (default: connected)
        -F, --fib                display Forwarding Information Base (default)
        -C, --cache              display routing cache instead of FIB
        -Z, --context            display SELinux security context for sockets

  <Socket>={-t|--tcp} {-u|--udp} {-U|--udplite} {-S|--sctp} {-w|--raw}
           {-x|--unix} --ax25 --ipx --netrom
  <AF>=Use '-6|-4' or '-A <af>' or '--<af>'; default: inet
  List of possible address families (which support routing):
    inet (DARPA Internet) inet6 (IPv6) ax25 (AMPR AX.25) 
    netrom (AMPR NET/ROM) ipx (Novell IPX) ddp (Appletalk DDP)
```

Có rất nhiều tùy chọn, một số tùy chọn phổ biến thường được sử dụng mà bạn có thể chú ý ở đây là
- `-a`: Hiển thị tất cả các sockets, kể cả listening và non-listening
- `-l`: Hiển thị các socket đang lắng nghe
- `-t`: Chỉ hiển thị các kết nối tcp
- `-u`: Chỉ hiển thị các kết nối udp
- `-n`: Xem địa chỉ số (không phân giải)
- `-p`: Hiển thị chương trình PID cho từng socket
- `-r`: Hiển thị bảng định tuyến
- `-s`: Pull và hiển thị thống kê mạng được sắp xếp theo giao thức
- `-i`: Hiển thị danh sách các giao diện mạng

Tiếp theo, mình sẽ chỉ cho các bạn một vài ví dụ cụ thể trong việc sử dụng lệnh `netstat` này nha!
# Các ví dụ lệnh netstat thường được sử dụng

### 1. Liệt kê tất cả các port
- **`netstat -a`**

```
thanhthu ~ netstat -a
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State      
tcp        0      0 localhost:domain        0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:ssh             0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:32182           0.0.0.0:*               LISTEN     
tcp        0      0 localhost:ipp           0.0.0.0:*               LISTEN     
tcp        0      0 localhost:40131         0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:32196           0.0.0.0:*               LISTEN     
tcp        0      0 localhost:10248         0.0.0.0:*               LISTEN     
tcp        0      0 localhost:10249         0.0.0.0:*               LISTEN     
tcp        0      0 localhost:35947         0.0.0.0:*               LISTEN     
tcp        0      0 localhost:sge-qmaster   0.0.0.0:*               LISTEN     
tcp        0      0 localhost:10256         0.0.0.0:*               LISTEN     
tcp        0      0 i121035-lt:45024        1.80.190.35.bc.go:https ESTABLISHED
tcp        0      0 i121035-lt:59730        th-in-f100.1e100.:https ESTABLISHED
tcp        0      0 localhost:sge-qmaster   localhost:48358         ESTABLISHED
tcp        0      0 i121035-lt:50182        server-54-192-23-:https ESTABLISHED
tcp        0      0 localhost:48312         localhost:sge-qmaster   ESTABLISHED
tcp        0      0 localhost:59498         localhost:6443          ESTABLISHED
tcp        0      0 localhost:sge-qmaster   localhost:48360         ESTABLISHED
tcp        0      0 localhost:59672         localhost:6443          ESTABLISHED
tcp        0      0 i121035-lt:44486        ti-in-f94.1e100.n:https ESTABLISHED
tcp        0      0 localhost:59688         localhost:6443          ESTABLISHED
tcp        0      0 localhost:59634         localhost:6443          ESTABLISHED
tcp        0      0 localhost:sge-qmaster   localhost:48300         ESTABLISHED
tcp        0      0 i121035-lt:43512        10.42.0.36:5000         TIME_WAIT
```

Đây là một lệnh kiểm tra tổng quá, nó bao gồm rất rất nhiều thông tin bao gồm tất cả các port ( của cả giao thức TCP và UDP), các listening và non-listening sockets. Bởi vì bao gồm rất nhiêu thứ nên trong thực tế, khi sử dụng , ta sẽ kết hợp tùy chọn cùng các tùy chọn khác để lọc ra các nhóm thông tin cụ thể cũng như chi tiết hơn như các lệnh dưới đây.
- **`netstat -at`:** Chỉ kiểm tra các port TCP
- **`netstat -au`:** Chỉ kiểm tra các port UDP
- **`netstat -l`:**  Đây là tùy chọn có phạm vi nhỏ hơn `-a` khi chỉ liệt kê các port đang ở trạng thái listening. Tùy chọn này cũng thường đi kèm với tùy chọn `-t` hay `-u` để lọc ra các kết nối TCP hay UDP.

### Kiểm tra các tiến trình

Sử dụng tùy chọn `-p` của netstat sẽ hiển thị cho chúng ta thấy tên chương trình và process ID (PID) của chúng. Chẳng hạn như ta sử dụng lệnh   **`netstat -ltupn`**. Lệnh này có ý nghĩa sẽ hiển thị tất cả port TCP và UDP đang ở trạng thái listening cùng với tên chương trình và PID của chúng. Ở đây mình hay dùng thêm tùy chọn `-n` để hiển thị các địa chỉ và số cổng được biểu diễn dưới dạng số, mà không hiển thị một tên cụ thể.

```
thanhthu ~ netstat -pltun                                       
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 127.0.0.53:53           0.0.0.0:*               LISTEN      664/systemd-resolve 
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1271/sshd           
tcp        0      0 0.0.0.0:32182           0.0.0.0:*               LISTEN      2945/k3s            
tcp        0      0 127.0.0.1:631           0.0.0.0:*               LISTEN      27507/cupsd         
tcp        0      0 127.0.0.1:40131         0.0.0.0:*               LISTEN      2945/k3s            
tcp        0      0 0.0.0.0:32196           0.0.0.0:*               LISTEN      2945/k3s            
tcp        0      0 127.0.0.1:10248         0.0.0.0:*               LISTEN      2945/k3s            
tcp        0      0 127.0.0.1:10249         0.0.0.0:*               LISTEN      2945/k3s            
tcp        0      0 127.0.0.1:35947         0.0.0.0:*               LISTEN      966/containerd      
tcp        0      0 127.0.0.1:6444          0.0.0.0:*               LISTEN      2945/k3s            
tcp        0      0 127.0.0.1:10256         0.0.0.0:*               LISTEN      2945/k3s            
tcp6       0      0 :::22                   :::*                    LISTEN      1271/sshd           
tcp6       0      0 ::1:631                 :::*                    LISTEN      27507/cupsd         
tcp6       0      0 :::10250                :::*                    LISTEN      2945/k3s            
tcp6       0      0 :::3306                 :::*                    LISTEN      3678/docker-proxy   
tcp6       0      0 :::10251                :::*                    LISTEN      2945/k3s            
tcp6       0      0 :::6443                 :::*                    LISTEN      2945/k3s            
tcp6       0      0 :::10252                :::*                    LISTEN      2945/k3s            
udp        0      0 127.0.0.53:53           0.0.0.0:*                           664/systemd-resolve 
udp        0      0 0.0.0.0:68              0.0.0.0:*                           30433/dhclient      
udp        0      0 0.0.0.0:8472            0.0.0.0:*                           -                   
udp        0      0 0.0.0.0:631             0.0.0.0:*                           27508/cups-browsed  
udp        0      0 0.0.0.0:43286           0.0.0.0:*                           816/avahi-daemon: r 
udp        0      0 224.0.0.251:5353        0.0.0.0:*                           25223/chrome        
udp        0      0 224.0.0.251:5353        0.0.0.0:*                           25223/chrome        
udp        0      0 224.0.0.251:5353        0.0.0.0:*                           25329/chrome --type 
udp        0      0 224.0.0.251:5353        0.0.0.0:*                           25329/chrome --type 
udp        0      0 0.0.0.0:5353            0.0.0.0:*                           816/avahi-daemon: r 
udp6       0      0 :::43431                :::*                                816/avahi-daemon: r 
udp6       0      0 :::5353                 :::*                                816/avahi-daemon: r 
```

### Hiển thị thống kê mạng

Để hiển thị các thông tin thống kê mạng, chúng ta sử dụng lệnh **`netstat -s`** hoặc cũng có thể lọc thông tin theo các kết nối TCP, UDP...

```
thanhthu ~ netstat -s 
Ip:
    Forwarding: 1
    882951 total packets received
    1 with invalid addresses
    129399 forwarded
    0 incoming packets discarded
    752132 incoming packets delivered
    851013 requests sent out
    280 dropped because of missing route
    2 reassemblies required
    1 packets reassembled ok
Icmp:
    115 ICMP messages received
    30 input ICMP message failed
    ICMP input histogram:
        destination unreachable: 110
        echo requests: 2
        echo replies: 3
    353 ICMP messages sent
    0 ICMP messages failed
    ICMP output histogram:
        destination unreachable: 348
        echo requests: 3
        echo replies: 2
IcmpMsg:
        InType0: 3
        InType3: 110
        InType8: 2
        OutType0: 2
.....................
```

### Hiển thị bảng định tuyến

Để xem bảng định tuyến IP của kernel, chúng ta sử dụng lệnh **`netstat -r`** :

```
thanhthu ~ netstat -r 
Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
default         _gateway        0.0.0.0         UG        0 0          0 enp1s0
10.42.0.0       0.0.0.0         255.255.255.0   U         0 0          0 cni0
link-local      0.0.0.0         255.255.0.0     U         0 0          0 enp1s0
172.17.0.0      0.0.0.0         255.255.0.0     U         0 0          0 docker0
172.18.0.0      0.0.0.0         255.255.0.0     U         0 0          0 br-0eadd6bb4887
172.19.0.0      0.0.0.0         255.255.0.0     U         0 0          0 br-d21d6936f375
192.168.19.0    0.0.0.0         255.255.255.0   U         0 0          0 enp1s0
```

### Hiển thị các giao diện mạng

Để hiển thị các giao diện mạng của kernel, chúng ta sử dụng lệnh **`netstat -i`**

```
thanhthu ~ netstat -i                        
Kernel Interface table
Iface      MTU    RX-OK RX-ERR RX-DRP RX-OVR    TX-OK TX-ERR TX-DRP TX-OVR Flg
br-0eadd  1500        1      0      0 0           629      0      0      0 BMRU
br-d21d6  1500        0      0      0 0             0      0      0      0 BMU
cni0      1450   360459      0      0 0        370384      0      0      0 BMRU
docker0   1500        0      0      0 0             0      0      0      0 BMU
enp1s0    1500   521818      0    647 0        229844      0      0      0 BMRU
flannel.  1450        0      0      0 0             0      0    625      0 BMRU
lo       65536   435776      0      0 0        435776      0      0      0 LRU
veth8509  1450    93651      0      0 0         47643      0      0      0 BMRU
veth0698  1450    15316      0      0 0         15264      0      0      0 BMRU
```

### Netstat kết hợp cùng các lệnh linux khác

Ngoài kết hợp giữa các tùy chọn chỉ thị lệnh khác nhau, netstat càng trở nên hữu dụng hơn khi được kết hợp với các lệnh linux khác bằng cách sử dụng cơ chế đường ống `pipe` trong linux. Ví dụ:

- **Khi bạn muốn kiểm tra một cổng cụ thể, chẳng hạn như cổng 22:**
```
netstat -lntp | grep ':22'
```
```
thanhthu ~ netstat -lntp | grep ':22'                                                           
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1271/sshd           
tcp6       0      0 :::22                   :::*                    LISTEN      1271/sshd
```

- **Hiện thị số kết nối của mỗi ip đến server**
```
netstat -apn |grep 'tcp\|udp' | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -n
```
```
thanhthu ~ netstat -apn |grep 'tcp\|udp' | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -n
      1 10.0.1.9
      1 10.0.4.115
      1 10.42.0.33
      1 1.54.241.81
      1 74.125.23.189
      1 91.108.56.150
      2 10.42.0.39
      2 10.43.69.202
      2 13.230.76.0
      2 162.247.242.21
      2 192.168.19.60
      2 74.125.204.94
      3 10.42.0.35
      3 104.21.92.71
      3 13.225.89.117
      4 10.42.0.28
      4 10.42.0.29
      4 172.67.188.158
      6 10.42.0.26
      6 10.42.0.40
      9 
     12 10.42.0.42
     13 10.42.0.30
     25 0.0.0.0
    136 127.0.0.1
```

Trong đó:
- `netstat -apn`: Hiển thị tất cả các kết nối cùng tên chương trình và PID của chúng, các địa chỉ ip và port ở dạng số, không phân giải tên.
- `grep 'tcp\|udp'`: Lọc lấy các kết nối TCP và UDP
- `awk '{print $5}'`: Chỉ in ra cột số 5 là cột IP:PORT
- `cut -d: -f1`: Chia các dòng kết quả thành các cột, điểm phân chia là ký tự : sau đó lấy thông tin cột 1 (các IP không có cổng)
- `sort`: sắp xếp kết quả
- `uniq -c`: nhóm các IP giống nhau lại, hiển thị ra cột đầu tiên sẽ hiển thị số lượng của các IP giống nhau
- `sort -n`: sắp xếp kết quả theo số, từ thấp đến cao

# Tạm kết

Qua bài viết trên, mình đã giới thiệu đến các bạn các chức năng cũng như cách dùng cơ bản của **netstat**. Hy vọng qua bài viết này, các bạn có thể hiểu và nắm rõ hơn về **netstat** - một phương pháp kinh điển để khắc phục các sự cố về mạng trên hệ điều hành Unix/Linux.

Cảm ơn các bạn đã theo dõi bài viết của mình :3 
# References
- https://linux.die.net/man/8/netstat
- https://www.rekha.com/netstat-cheat-sheet-for-newbies.html
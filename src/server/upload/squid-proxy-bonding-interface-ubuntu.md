#    1. Squid là gì : 

Squid là một phần mềm Proxy Server dùng cho việc lưu trữ cache và lọc nội dung web. Squid hỗ trợ các giao thức HTTP, HTTPS, FTP,… giúp bạn tiết kiệm băng thông và tăng tốc độ truy cập web cho nhóm người dùng trong công ty. 

Nguyên tắc hoạt động của Squid là khi người dùng truy vấn đến 1 website thông qua Squid thì Squid sẽ kiểm tra xem nội dung trang web đó có được lưu trữ và có thay đổi không? Nếu đã có lưu trữ và không thay đổi thì Squid sẽ trả luôn nội dung đó cho người dùng mà không cần phải truy vấn đến địa chỉ website kia nữa. Điều này giúp quá trình duyệt web nhanh hơn rất nhiều.


#   2. Công dụng của squid :
- Không mất phí bản quyền ( =)) ) vì là mã nguồn mở 
- Khả năng cân bằng tải cao 
- Quản lí giới hạn download, hạn chế băng thông từng IP, giới hạn phiên kết nối đồng thời...
- Khả năng caching thông tin tốt 


# 3. Cài đặt squid proxy trên ubuntu 14.04:
  * Trong vd này mình sẽ build squid trên ubuntu 14.04 từ soure..: 

    - Manual install : 
     
     
   - Update và upgrade server 

    apt-get update && apt-get upgrade -y
            
    - Install depedencies     
            
    root@Ubuntu:/home/lucifer# apt-get install devscripts build-essential openssl libssl-dev fakeroot libcppunit-dev libsasl2-dev cdbs ccze libfile-readbackwards-perl libcap2 libcap-dev libcap2-dev libtool sysv-rc-conf
    Reading package lists... Done
    Building dependency tree       
    Reading state information... Done
    Note, selecting 'libcap-dev' instead of 'libcap2-dev'
    libcap2 is already the newest version.
    openssl is already the newest version.
    The following extra packages will be installed:

   
   
   - Download squid 3.5.20 
     
    root@Ubuntu:/home/lucifer#     wget http://ftp.riken.jp/net/squid/archive/3.5/squid-3.5.20.tar.bz2
    100%[=====================================================================================================================================================>] 3,129,141    441KB/s   in 7.4s   

    

            
     
    
   Sau khi download chúng ta giải nén file squid vừa tải:
   
    root@Ubuntu:/home/lucifer# tar -xjf squid-3.5.20.tar.bz2
            
            
    
   
   - Tạo file patch trong thư mục squid vừa giải nén:

    root@Ubuntu:/home/lucifer# cd squid-3.5.20/src/
    root@Ubuntu:/home/lucifer/squid-3.5.20/src# vim squid-3.5.20-ssl-forgery.patch

            
    # squid-3.5.20-ssl-forgery.patch :
    diff -ur squid-3.5.20-orig/src/client_side_request.cc squid-3.5.20/src/client_side_request.cc
    --- squid-3.5.20-orig/src/client_side_request.cc        2016-07-01 13:37:50.000000000 +0200
    +++ squid-3.5.20/src/client_side_request.cc     2017-03-10 16:48:08.920084072 +0100
    @@ -530,6 +530,10 @@
     }
     debugs(85, 3, HERE << "validate IP " << clientConn->local << " non-match from Host: IP " << ia->in_addrs[i]);
     }
    +       // disable fogery check. See https://code.nethesis.it/Nethesis/dev/issues/5088
    +        http->request->flags.hostVerified = true;
    +        http->doCallouts();
    +        return;
    }
    ebugs(85, 3, HERE << "FAIL: validate IP " << clientConn->local << " possible from Host:");
    hostHeaderVerifyFailed("local IP", "any domain IP");


    
-  Gán quyền và chạy file patch        
            
            
       root@Ubuntu:/home/lucifer/squid-3.5.20/src# chmod +x squid-3.5.20-ssl-forgery.patch 
       root@Ubuntu:/home/lucifer/squid-3.5.20/src# patch < squid-3.5.20-ssl-forgery.patch
       patching file client_side_request.cc
     
            
            
 -  Dưới đây là một số cấu hình mặc định cho squid chúng ta cần cài thêm : 

        ./configure --prefix=/usr --includedir=/usr/include --infodir=/usr/share/info --sysconfdir=/etc --localstatedir=/var --libexecdir=/usr/lib/squid --srcdir=. --datadir=/usr/share/squid --sysconfdir=/etc/squid --mandir=/usr/share/man --enable-inline --enable-async-io=24 --enable-storeio=ufs,aufs,diskd,rock --enable-removal-policies=lru,heap --enable-gnuregex --enable-delay-pools --enable-cache-digests --enable-underscores --enable-icap-client --enable-follow-x-forwarded-for --enable-eui --enable-esi --enable-icmp --enable-zph-qos --enable-http-violations --enable-ssl-crtd --enable-linux-netfilter --enable-ltdl-install --enable-ltdl-convenience --enable-x-accelerator-vary --disable-maintainer-mode --disable-dependency-tracking --disable-silent-rules --disable-translation --disable-ipv6 --disable-ident-lookups --with-swapdir=/var/spool/squid --with-logdir=/var/log/squid --with-pidfile=/var/run/squid.pid --with-aufs-threads=24 --with-filedescriptors=65536 --with-large-files --with-maxfd=65536 --with-openssl --with-default-user=proxy --with-included-ltdl

 
 - Sau khi xong chúng ta có thể cài đặt :

        make
        make install
        
        
        
 - Cấu hình iptables cho squid ( ở đây mình sẽ add vào rc.local để tự động turnon khi restart, turnon server )
        
        root@Ubuntu:~# vim /etc/rc.local
        #file rc.local 
        #0
        iptables -A POSTROUTING -t nat -j MASQUERADE -o eth0
        #1
        iptables -t mangle -F
        iptables -t mangle -X
        #2
        echo 0 > /proc/sys/net/ipv4/conf/lo/rp_filter
        echo 1 > /proc/sys/net/ipv4/ip_forward
        #3
        ip rule add fwmark 1 lookup 100
        ip route add local 0.0.0.0/0 dev lo table 100
        #4
        iptables -t mangle -N DIVERT
        iptables -t mangle -A PREROUTING -p tcp -m socket -j DIVERT
        #5
        iptables -t mangle -A DIVERT -j MARK --set-mark 1
        iptables -t mangle -A DIVERT -j ACCEPT
        #6
        iptables -t mangle -A PREROUTING -p tcp --dport 80 -j TPROXY --tproxy-mark 0x1/0x1 --on-port 3129
        iptables -t mangle -A PREROUTING -p tcp --dport 443 -j TPROXY --tproxy-mark 0x1/0x1 --on-port 3130
        #7 
        squid start 
        exit 0
        
- Chỉnh sửa file /squid.conf
        
    Các cấu hình chung : 
    
      http_port 3128

     Đây là port default trên squid tiếp nhận request từ client ( 8080 ) 
 

      cache_access_log /var/log/squid/access.log, cache_log /var/log/squid/cache.log, cache_store_log /var/log/squid/store.log

    Đây là nhưng nơi mà squid sẽ lưu trữ lại log trong quá trình sử dụng. Nếu bạn muốn kiểm tra hay tìm kiếm nhưng thông tin gì về squid hay quá trình sử dụng hãy check mấy ông này :))
    
      client_netmask 255.255.255.255
 
 
     Với option này mask adress của ckient sẽ được lưu lại trong log.
     
  
      cache_mgr webmaster


        
    Địa chỉ email mà squid sẻ gửi tin nhắn nếu squid gặp sự cố.. mắc định sẽ là admin
    
      forwarded_for on

    
   Nếu option này set off, squid sẽ tự động xóa địa chỉ IP và system name của client ra khổi HTTP request


 - Cài đặt cho Access Controls

     Squid cung cấp một hệ thống chi tiết để kiểm soát việc truy cập vào proxy. Bằng cách triển khai ACL. Điều này liên quan đến danh sách với các quy tắc được xử lý tuần tự. Một số ACL mặc định, chẳng hạn như tất cả và localhost...

    
     - acl <acl_name> <type> <data>

    ACL yêu cầu 3 thông số kĩ thuật để xác định:
    
    <acl_name>  có thể được chọn tùy ý 
    
    <type> có nhiều tùy chọn khác nhau có thể tham khảo nhiều hơn trong /etc/squid/squid.conf
    
    <data> có thể là tên domain, ip hoặc url tùy thuộc vào giá trị của <type> 
    
    Ví dụ một số ACL đơn giản : 
    
        acl lucifer srcdomain .lucifer.com
        acl aaa src 192.168.69.0/255.255.255.0
        acl bbb src 192.168.70.0-192.168.9.0/255.255.255.0
        
        
     - http_access allow <acl_name>

    Option này cho phép các client nào sử dụng proxy có thể truy cập ra internet.. (note dòng cuối cùng của option luôn phải để deny all )
    
   eg:
   
       http_access allow localhost
       http_access deny all
     
     Ở đây có nghĩa là localhost được quyền truy cập còn những nơi khác thì không.
     
     
   - auth_param basic program /usr/sbin/pam_auth

    Option này  là cơ chế bảo mật cao hơn 1 lớp đối với  những user sử dụng squid muốn kết nối ra ngoài internet ( giống như basic authen =))) ) 
   
   
        acl password proxy_auth REQUIRED

        http_access allow password
        http_access deny all
   
   

- Tạo file squid trong /etc/init.d 

    Vì chúng ta build squid từ soure do đó không start squid như bình thường được ( vì trong /etc/init.d làm gì có squid :v ) nên giờ chúng ta tự tạo file squid và start service bằng tay
    
       
        vim /etc/init.d/squid
   
       
       
   
        #!/bin/sh
        #
        # squid        Startup script for the SQUID HTTP proxy-cache.
        #
        # Version:   @(#)squid.rc 2.20 01-Oct-2001 miquels@cistron.nl
        #
        ### BEGIN INIT INFO
        # Provides:        squid
        # Required-Start:   $local_fs $network
        # Required-Stop:    $local_fs $network
        # Should-Start:        $named
        # Should-Stop:        $named
        # Default-Start:     2 3 4 5
        # Default-Stop:        0 1 6
        # Short-Description: Squid HTTP Proxy
        ### END INIT INFO

        NAME=squid 
        DAEMON=/usr/sbin/squid 
        LIB=/usr/lib/squid
        PIDFILE=/var/run/squid.pid
        # export LD_PRELOAD=/usr/local/lib/libjemalloc.so # ini apabila anda menggunakan jemalloc 
        SQUID_ARGS="-YC"

        [ ! -f /etc/default/squid ] || ./etc/default/squid
        . /lib/lsb/init-functions 
        PATH=/bin:/usr/bin:/sbin:/usr/sbin 
        [ -x $DAEMON ] || exit 0

        grepconf () {
                w="     " # space tab 
                sq=/etc/squid/squid.conf
                # sed is cool. 
                res='sed -ne' 
                        s/^'$1'['"$w"']\+\([^'"$w"']\+\).*$/\1/p; 
                        t end;
                        d;
                        :end q` < $sq` 
                [ -n "$res" ] || res=$2
                echo "$res"


        }

        grepconf2 (){
                w="     " # space tab 
                sq=/etc/squid/$NAME.conf
                # sed is cool. 
                res='sed -ne'
                        s/^'$1'['"$w"']\+[^'"$w"']\+['"$w"']\+\([^'"$w"']\+\).*$/\1/p; 
                        t end;
   
   
   
   - Cấp quyền vào start service :
       
           chmod +x squid
           /etc/init.d.squid start 
   
   
# 4.  Cấu hình bonding interface trên ubuntu 

 - Bonding interface là việc  cấu hình kết hợp 2 hay nhiều card mạng vật lí thành một interface ảo bằng cách sử dụng module kernel 'bonding' trên Linux 
 - Điều này đem lại các lợi ích như : tăng bandwidth, tăng tính dự phòng, cân bằng tải....
 
 - Cac mode trong bonding 
   
   Mode 0 :  balance-rr 
   
       Chế độ này cho phép truyền tải các gói tin đều trên card mạng vật lý. Chế độ này giúp cân bằng tải và chống chịu lỗi. 
   
   Mode 1 : active-backup ( cái tên nói lên tất cả :v)
   
       Chế độ này khi 1 card đang sử dụng bị down , hệ thống sẽ tự động chuyển traffic sang những card còn lại. Chỉ có 1 card mạng được phép hoạt động. chế độ này giúp khả năng chống lỗi.

    Mode 2 : balance-xor 
   
       Truyền traffic thông qua phép toán XOR giữa source MAC nguồn với source MAC đích. Kiểm tra các địa chỉ mac nguồn và mac đích của các card mạng đuơc bonding quản lý. Mode này cũng giúp tăng khả năng chịu lỗi 


   Mode 3 : broadcast 
   
       Khi bonding sử dụng chế độ này toàn bộ traffic sẽ truyền ra tất cả các card mạng được bonding quản lý. Dễ gây hiện tượng DUP! trong mạng => gói tin ARP không tìm dược địa chỉ mac để truyền.


   Mode 4 : 802.3ad 
   
       Kết nối liên kết động IEEE 802.3ad. Tạo nhóm tập hợp có các thiết lập cùng speed và chế độ duplex. Sử dụng tất cả các slave ở trình tập hợp hoạt động theo các đặc điểm kỹ thuật 802.3ad
   
       LACP cân bằng tải lưu lượng gửi đi qua các cổng hoạt động dựa trên thông tin giao thức băm và chấp nhận lưu lượng đến từ bất kỳ cổng nào đang hoạt động. Các băm bao gồm các nguồn Ethernet và địa chỉ đích và nếu có, VLAN tag, và nguồn và đích IPv4 / IPv6 địa chỉ. Điều này được tính toán phụ thuộc vào tham số transmit-hash-policy
   
   Mode 5 : balance-tlb 
   
        Các Traffic gửi đi được chia theo tải trọng hiện tại (tính tương đối so với tốc độ) trên mỗi card . Lưu lượng đến đến được nhận bởi các card  hiện hành. Nếu một card down, card khác sẽ nhảy lên tiếp quản các địa chỉ MAC của các card down. 
   
   Mode 6 : 
   
       Là sự kết hợp giữa balance-tlb và receive load balancing(rlb) cho lưu lượng của ipv4. Việc cân bằng tải nhận được đạt được bằng thương lượng ARP. The bonding driver chặn ARP Trả lời được gửi bởi các máy chủ trên đường ra và ghi đè địa chỉ HW SRC với địa chỉ HW của một trong những người slave như vậy mà các khách hàng khác nhau sử dụng các địa chỉ hw khác nhau cho các máy chủ
   
   
   
  - Ở ví dụ này mình sẽ configure bonding mode balance-tlb 
  
      - Cài gói ifenslave để attach và detach các NIC slave vào đường bond: 
        
               apt-get install ifenslave 
   
       - Load module bonding trong kernel 

                sudo modprobe bonding
   
       - vim /etc/network/interface
   
   
               auto bond0
                iface bond0 inet static
                address 192.168.0.69
                netmask 255.255.255.0
                broadcast 192.168.0.255
                gateway 192.168.0.254
                # dns-* options are implemented by the resolvconf package, if installed
                dns-nameservers 8.8.8.8
                bond-mode balance-tlb ( mode 5 balance-tlb ) 
                bond-miimon 100 ( xác định tần suất trạng thái liên kết của mỗi card ) 
                bond-slaves none

                ######
                auto eth0
                iface eth0 inet manual
                        bond-master bond0

                ####
                auto eth1
                iface eth1 inet manual
                        bond-master bond0
    - khởi động lại card mạng : ifdown -a && ifup -a 
   
     - check lại bonding vừa tạo cat /proc/net/bonding/bond0
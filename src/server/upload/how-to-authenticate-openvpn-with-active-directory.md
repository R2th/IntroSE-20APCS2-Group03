## Hôm nay mình sẽ trình bày bài viết về việc config Open VPN xác thực qua Active Directory. <br>
### 1. Mô hình.<br>
![](https://images.viblo.asia/9e1c163c-0e2e-4adf-bfa0-c76b0d05816f.jpg)
### 2. Chuẩn bị<br>
 + 1 Server CentOS (Open VPN) 
 + 1 Server AD.
 + 1 PC để test.
### 3. Config<br>
**- Đầu tiên update phần mềm, sau đó cài "epel-release"**			<br>					
	"epel-release": Kiểu như kho chứa các source phần mềm opensource		<br>					
```
	
                 #sudo yum update -y
                 #sudo yum install epel-release -y
                 #sudo yum update -y
    
```
               
<br>

**- Cài đặt các package:  openvpn, easyrsa, iptables**		<br> 
"easyrsa" -> Đây là tool để tạo ra các Keys and Certificates <br> 
		Tạo key và build file .ca	
```
                #cd ~
                # /usr/share/easy-rsa/3/easyrsa init-pki
                # /usr/share/easy-rsa/3/easyrsa build-ca nopass
                # /usr/share/easy-rsa/3/easyrsa gen-dh
                # /usr/share/easy-rsa/3/easyrsa build-client-full vpn-client-01 nopass
                # /usr/share/easy-rsa/3/easyrsa gen-crl	
                # openvpn --genkey --secret pki/ta.key
```
							
Lưu ý: dòng bên dưới, dòng này dùng để tạo key cho phía client.			
   <br>	
		`# /usr/share/easy-rsa/3/easyrsa build-client-full **vpn-client-01** nopass			
  <br>
Trong đó: **vpn-client-01**, mình nên đặt tên thành user của người dùng để dể phân biệt.
<br>
<br>
        
**- Copy các file như ca, pem, key... vào thư mục /etc/openvpn**<br>
```

         #sudo cp pki/ca.crt /etc/openvpn/ca.crt
         #sudo cp pki/ca.crt /etc/openvpn/ca.crt
         #sudo cp pki/dh.pem /etc/openvpn/dh.pem
         #sudo cp pki/issued/vpn-server.crt /etc/openvpn/server.crt	
         #sudo cp pki/private/vpn-server.key /etc/openvpn/server.key
         #sudo cp pki/ta.key /etc/openvpn/ta.key
         #sudo cp pki/crl.pem /etc/openvpn/crl.pem
```






**- Start Services** <br>
```
        #sudo systemctl -f enable openvpn@server.service
        #sudo systemctl start openvpn@server.service
```

**- Check log**
            # sudo tail -f /var/log/openvpn.log	
	
**- Enable IPv4 Forwarding**	

```
            vi /etc/sysctl.conf	
            #Packet forwarding	
            net.ipv4.ip_forward = 1 
```
    
**- Configure IPTables  <br>**
```
            Create an iptables rule to allow proper routing of our VPN subnet. 
            #iptables -t nat -A POSTROUTING -s 10.9.0.0/24 -o eth0 -j MASQUERADE 
            Need forward traffic from tunnel to ethernet and ethernet to tunnel by command: 
            #iptables -I FORWARD 1 -i tun0 -j ACCEPT 
            #iptables -I FORWARD 2 -i tun0 -o eth0 -j ACCEPT 
            #iptables -I FORWARD 3 -i eth0 -o tun0 -j ACCEPT 
            #iptables -I INPUT -p udp -m udp --dport 1194 -j ACCEPT 
            #service iptables save 
```

**- Restart Services iptables** <br>
```
            sudo systemctl enable iptables 
            sudo systemctl start iptables 
            sudo service iptables save 
```
    
**' - Update lại file config của server VPN cho phù hợp** <br>
	Đường dẫn: /etc/openvpn/server.conf <br>
	Nội dung file config như bên dưới:<br>

 ```
                port 1194 
                proto udp 
                dev tun 
                sndbuf 0 
                rcvbuf 0 
                ca ca.crt 
                cert server.crt 
                key server.key 
                dh dh.pem 
                topology subnet 
                server 10.9.0.0 255.255.255.0 
                ifconfig-pool-persist ipp.txt 
                push "redirect-gateway def1 bypass-dhcp" 
                keepalive 10 120 
                comp-lzo 
                persist-key 
                persist-tun 
                status openvpn-status.log 
                verb 3 
                crl-verify crl.pem 
                user nobody 
                group nobody 
                cipher AES-256-CBC 
                auth SHA512 
                plugin /usr/lib64/openvpn/plugin/lib/openvpn-auth-ldap.so "/etc/openvpn/server/ldap.conf" 
                client-cert-not-required 
                #plugin /usr/lib64/openvpn/plugins/openvpn-plugin-auth-pam.so login 
                log-append /var/log/openvpn.log 
```
   
Lưu ý các dòng này:  <br>
    **(1)	server 10.9.0.0 255.255.255.0**		    <br>
                -> Đây là dãy mạng cung cấp cho phía client 	    <br>
                ->  ta không đặt trùng với dãy IP local trong công ty.		    <br>
    **(2)  plugin /usr/lib64/openvpn/plugin/lib/openvpn-auth-ldap.so "/etc/openvpn/server/ldap.conf"**    <br>
                -> Authen sẽ được thông qua file ldap.conf		    <br>
   **(3)	plugin /usr/lib64/openvpn/plugins/openvpn-plugin-auth-pam.so login**   <br>
                -> Authen sẽ được thông qua user local.		    <br>   
**- Setting để client có thể connect tới Server..**  
         Tạo folder chứa key.     <br>
```
	
     # cd ~ 
     # mkdir vpn-client-01-config
        
```
  Copy các file đã được gen, sau đó chuyển vào trong folder này.		<br>		
```
        # cp pki/ca.crt vpn-client-01-config/ca.crt		
		# cp pki/issued/vpn-client-01.crt vpn-client-01-config/client.crt		
		# cp pki/private/vpn-client-01.key vpn-client-01-config/client.key		
		# cp pki/ta.key vpn-client-01-config/ta.key		
```
				
Tạo user local để vpn				<br>
```
        # useradd -m -s /sbin/nologin [username]		
		# passwd [username]		
```
        
   File config phía client
        
```
        client
        dev tun
        proto udp
        sndbuf 0
        rcvbuf 0
        remote 172.16.25.203 1194
        resolv-retry infinite
        nobind
        persist-key
        persist-tun
        comp-lzo
        verb 3
        auth-user-pass
        auth-nocache
        ca ca.crt
        cert client.crt
        key client.key
        remote-cert-tls server
```

**4. Config authen với ldap**
  Cài đặt package openvpn-auth-ldap <br>
            #yum install openvpn openvpn-auth-ldap y
Create file "ldap.conf"
        ```
```
        <LDAP>
            # LDAP server URL
            URL        ldap://172.16.25.202
            # Bind DN (If your LDAP server doesn't support anonymous binds)
            BindDN        "CN=Administrator,CN=Users,DC=framgia-test,DC=com"
            # Bind Password
            Password    Fpd12XXXXXX
            # Network timeout (in seconds)
            Timeout        15
            # Enable Start TLS
            TLSEnable    no
            # Follow LDAP Referrals (anonymously)
            FollowReferrals yes
            # TLS CA Certificate File
            #TLSCACertFile    /usr/local/etc/ssl/ca.pem
            # TLS CA Certificate Directory
            #TLSCACertDir    /etc/ssl/certs
            # Client Certificate and key
            # If TLS client authentication is required
            #TLSCertFile    /usr/local/etc/ssl/client-cert.pem
            #TLSKeyFile    /usr/local/etc/ssl/client-key.pem
            # Cipher Suite
            # The defaults are usually fine here
            # TLSCipherSuite    ALL:!ADH:@STRENGTH
        </LDAP>
        <Authorization>
            # Base DN
            BaseDN        "OU=VPN,DC=framgia-test,DC=com"
            # User Search Filter
            SearchFilter    "(sAMAccountName=%u)"
            # Require Group Membership
            RequireGroup    false
            # Add non-group members to a PF table (disabled)
            #PFTable    ips_vpn_users
        </Authorization>
        ```
```

Giải thích một số thông tin:  <br>
             URL  ldap://172.16.25.202 : Địa chỉ IP của Server LDAP.					<br>	
             BindDN  "CN=Administrator,CN=Users,DC=framgia-test,DC=com"						<br>
             Cách để lấy BindDN, login vào AD -> vào cmd -> dsquery user					<br>
   
```
        C:\Users\Administrator\Desktop>dsquery user				
		CN=Administrator,CN=Users,DC=framgia-test,DC=com				
		CN=Guest,CN=Users,DC=framgia-test,DC=com				
		CN=DefaultAccount,CN=Users,DC=framgia-test,DC=com				
		CN=krbtgt,CN=Users,DC=framgia-test,DC=com				
		CN=Le Huy,OU=Infra,DC=framgia-test,DC=com				
		CN=Tran Van Quyet,OU=Infra,DC=framgia-test,DC=com				
		CN=Truong Thanh Trung,OU=Infra,DC=framgia-test,DC=com				
		CN=Truong Thanh Trung,OU=Infra,DC=framgia-test,DC=com	
```			


Password  Fpd12XXXX: Mật khẩu tài khoản admin login vào AD.	<br>
BaseDN        "OU=VPN,DC=framgia-test,DC=com": Domain framgia-test.com được phân giải thành thế này. <br>
SearchFilter "(sAMAccountName=%u)" : Cứ để default như vậy.					<br>	

### **5. Test**
Trên AD, tiến hành tạo OU đặt tên: VPN -> sau đó tạo các user nằm trong OU này.
- Mục đích, chỉ những user trong OU VPN mới connect OK.

![](https://images.viblo.asia/f0d2a79c-dfe4-4e05-94b9-d544f5b8187d.png)

- Trên Client, copy các file ca, key, ... bỏ vào folder config.
<br>
![](https://images.viblo.asia/3e3b2afb-28f1-4b4e-a17c-d671d637d0b8.PNG)
- Test thử connect được chưa :-?
<br>
![](https://images.viblo.asia/8741132e-ab52-484e-b1b0-0f976d5c1b78.PNG)

-  Những user khác, không thuộc OU-VPN -> connect sẽ fail.
 ![](https://images.viblo.asia/f7bacab7-d66d-4d18-867a-9f749e42e263.png)
 - Kết quả: <br>
             ![](https://images.viblo.asia/eb21dec8-8afc-4b14-b9f9-d6693e8989fa.png)
 <br>
 <br> <br> <br>
 Cảm ơn các bạn, anh (chị) đã đọc bài - bài viết còn basic, nếu có sai sót có thể góp ý để em(mình) cải thiện. 
 <br>
 
 <br>
 Nguồn tham khảo: <br>
 https://www.rosehosting.com/blog/how-to-install-openvpn-on-centos-7/ <br>
 http://www.startupcto.com/server-tech/centos/setting-up-openvpn-server-on-centos <br>
 https://www.youtube.com/watch?v=V6DGD4QRXVU <br>
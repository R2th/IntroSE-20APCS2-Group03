## Hôm nay mình sẽ trình bày bài viết về việc tạo VM trên Xen Server bằng CLI.
### 1. Chuẩn bị
 - XEN Server. <br>
 - File iso tương ứng dùng cho VM: Ubuntu, Centos, Win ... <br>
###  2. Tạo datastore - Dùng để chứa các file iso.
 * Tạo Data Storage <br>
```
[root@xen02-micro ~]# mkdir -p local/ISO 
[root@xen02-micro ISO]# xe sr-create name-label="Datastore1" type=iso device-config:location=/root/local/ISO device-config:legacy_mode=true content-type=iso<br>
4182ed7c-a5db-8bd1-34a9-cffd1f01f3e0 <br>
```

   Giải thích:		<br>
	xe sr-create : lệnh tạo SR	 <br> 
	name-label : tên SR được tạo	 <br>
	type: định dạng của SR, với định dạng ISO này thì chứa file ISO nó sẽ boot được.	 <br>
	device-config:location : đường dẫn đến thư mục tạo ở trên	 <br>
	device-config:legacy_mode=true : mode boot	 <br>
	content-type=iso : \	 <br>
    
   ![](https://images.viblo.asia/bebdc4c6-9dd0-41b3-9e90-c1fc8bdfe095.PNG)
    
###    3.    Tạo VM
- Đầu tiên, check xem XEN Server phần template có hỗ trợ cài UB 16.04 không ?'			<br>
     ` [root@framgia-xenserver ~]# xe template-list | grep name-label | grep -i 16.04  `  <br>
     <br>
       ![](https://images.viblo.asia/c7da03b4-5c8e-4a30-8e27-9c943f0abc76.PNG) <br>
       
-  Tiến hành tạo 1 VM, đặt tên là: 200.17 Infra_le.van.huy_test02 <br> 
```
        [root@xen02-micro ~]# xe vm-install template="Ubuntu Xenial Xerus 16.04" new-name-label="200.17 Infra_le.van.huy_test02" 
         9a7b6e38-df1b-7cda-5f40-ac5ba91f5471 
```   
   
   ![](https://images.viblo.asia/0f0d8a53-e206-4024-b495-e528c51e9db4.PNG) <br>
    
- > Gán biến UUID và biến NAME phù hợp. <br>
```
        [root@framgia-xenserver ~]# UUID=9a7b6e38-df1b-7cda-5f40-ac5ba91f5471 <br>
        [root@framgia-xenserver ~]# NAME="200.17 Infra_le.van.huy_test02" <br>
```
- ![](https://images.viblo.asia/12bd56f9-a563-49a9-95f8-8b4433d95541.png) <br> <br>

- > Sử dụng lệnh này để check DATASTORE có lưu trữ file .iso của Ubuntu hay không ? <br>
    `[root@framgia-xenserver ~]# xe cd-list`
    <br>
    ![](https://images.viblo.asia/d719c024-0951-4722-8745-669123a3d7e2.PNG) <br>
    
- > Gán biến ISO trỏ đến file .iso <br> 
        `[root@framgia-xenserver ~]# ISO="ubuntu-16.04-server-amd64.iso"`<br>
<br>![](https://images.viblo.asia/e34b9b06-d877-4c74-afee-2af2843b4d09.PNG) <br>

- > Sử dụng lệnh này để tìm card mạng bridge phù hợp. <br>
        `[root@framgia-xenserver ~]# xe network-list `<br>
        <br>
![](https://images.viblo.asia/fa26517f-8c55-4b82-b896-9ab1d9610b85.png) <br>

- > Gán biến NETWORK trỏ đến card mạng bridge đã check ở phía trên. <br>
`[root@framgia-xenserver ~]# NETWORK=cc3fa4c2-7bdf-81b3-77cd-782e5f8b49f6` <br>
![](https://images.viblo.asia/7a964b51-78b9-4f00-8054-d4801d6a2eb6.PNG) <br>
 
- > Sử dụng lệnh ifconfig để check địa chỉ MAC của card mạng <br>
`[root@framgia-xenserver ~]# ifconfig` <br>
![](https://images.viblo.asia/f2a13979-61f3-436f-92df-f7cbbfab5888.PNG) <br>

- > Gán biến MAC trỏ đến địa chỉ MAC của card mạng bridge đã check ở phía trên. <br>
`[root@framgia-xenserver ~]# MAC="ac:1f:6b:69:c0:38"` <br>
![](https://images.viblo.asia/d9d36eeb-7ded-448a-b5af-babbf3af44be.PNG) <br>

- > Sử dụng xe vm-disk-list để check lại máy ta đang định cài, mục đích là lấy UUID.  <br>
`[root@framgia-xenserver ~]# xe vm-disk-list vm="$NAME"`  <br>
- > Gán biến VDI cho UUID của Local storage  đã check bằng lệnh phía trên.  <br>
`[root@framgia-xenserver ~]# VDI=c9de109c-0b1c-4d4b-8121-495b48f148e3`  <br>
![](https://images.viblo.asia/98b995df-101a-4c50-8538-8d6d2a6f6a59.png)

- > Tiến hành config	  <br>
     `xe vm-cd-add uuid=$UUID  cd-name=$ISO device=1 ` <br>
     `xe vm-param-set HVM-boot-policy="BIOS order" uuid=$UUID ` <br>
    ![](https://images.viblo.asia/a98cb6d3-52c4-4909-a646-7df7b10ed3bc.PNG)
    
- > Config Network  <br>
`[root@xen02-micro ~]# xe vif-create vm-uuid=9a7b6e38-df1b-7cda-5f40-ac5ba91f5471 network-uuid=cc3fa4c2-7bdf-81b3-77cd-782e5f8b49f6 mac="ac:1f:6b:69:c0:38" device=0` <br>
`f9326c22-5bc3-7c01-3586-f24c717fc63b` <br>
![](https://images.viblo.asia/5d56e014-3a55-4618-bb05-70347d44f736.PNG) <br>

- > Config RAM <br>
`[root@framgia-xenserver ~]# xe vm-memory-limits-set dynamic-max=1024MiB dynamic-min=1024MiB static-max=1024MiB static-min=1024MiB uuid=$UUID` <br>
![](https://images.viblo.asia/01126f7e-ab95-4db0-b724-92a942431f39.PNG)

- > Config Disk.  <br>
`[root@framgia-xenserver ~]# xe vdi-resize uuid=$VDI disk-size=15GiB`  <br>
![](https://images.viblo.asia/ac2c62f0-cd4a-4165-a14b-ca9ad8672670.PNG)  <br>

- > Check lại.  <br>
    ![](https://images.viblo.asia/c97ff44d-7bfb-4896-b096-d4c3bf0c655a.PNG)  <br>
    
- > Start VM		  <br>
	`	xe vm-start uuid=$UUID (Start VM)`  <br>
        ![](https://images.viblo.asia/c781de24-5f60-43c0-b0d7-7c86da15c7e6.PNG)  <br> <br>
         <br>
KẾT QUẢ <br>
![](https://images.viblo.asia/636e3146-55fc-4365-a576-64754025db7f.png) <br>
![](https://images.viblo.asia/c0b4e130-c837-4e1a-aecf-22edee68979d.png) <br> <br>

Tới đây là kết thúc. <br>
Cảm ơn các bạn, anh (chị) đã đọc bài - bài viết còn basic, nếu có sai xót có thể góp ý để em(mình) cải thiện. <br>

Nguồn tham khảo: <br>
https://linuxconfig.org/how-to-create-a-new-virtual-machine-on-xenserver-using-command-line <br>
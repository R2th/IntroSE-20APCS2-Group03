# Mở đầu
Đây là một series mình sẽ làm các machine trong HackTheBox và mở đầu lần là Lame với độ khó được đánh giá là dễ. Mục tiêu chính của mình là root chứ không phải là flag.
  
 ![](https://images.viblo.asia/0a02d3f3-54d7-4fb7-9dcd-31b1fc8afb6f.PNG)

List bài HTB
  [List](https://docs.google.com/spreadsheets/d/1dwSMIAPIam0PuRBkCiDI88pU3yzrqqHkDtBngUHNCw8/edit#gid=1839402159)
#     Write-up
Việc đầu tiên và quan trọng nhất cần làm luôn luôn là recon mục tiêu. Chúng ta càng thu thập nhiều thông tin về đối tượng thì sẽ càng mở ra nhiều hướng để tấn công hơn. 
##     Recon
Ở đây mình dùng nmap để quét tất cả các cổng đang chạy <br>
`nmap -A -v -p- 10.10.10.3 - o nmap`

![](https://images.viblo.asia/735321f5-52c9-43de-ba88-35d936587920.PNG)
Ta phát hiện có 5 cổng đang hoạt động là 21,22,139,445,3632. Mình thấy có một cổng khá lạ là 3632 đang chạy dịch vụ là distccd và mình sử dụng searchsploit để tìm thử xem có lỗ hổng nào liên quan đến dịch vụ này không

![](https://images.viblo.asia/5c54476c-4f33-4bdc-89c2-3a7800dd139c.PNG)

Ở đây mình thấy một lỗ hổng RCE và thấy Metasploit nên mình sẽ dùng Metasploit để khai thác

## Exploit
### Metasploit
Khởi động Metasploit và tìm kiếm lỗ hổng
![](https://images.viblo.asia/6890cf02-7257-4d80-a655-ec8ad3a684f6.PNG)

Tiến hành  set PAYLOAD, LHOST, RHOST cho exploit
![](https://images.viblo.asia/d9d29168-6904-4c75-93ec-33a62db9e6da.PNG)
Chú ý: thay đổi ip theo ip máy của bạn

Tiến hành exploit và ta có được shell đầu tiên 
![](https://images.viblo.asia/fe029a28-5c62-41f1-9575-23fbe9a99af8.PNG)
### Privilege Escalation
Đầu tiên mình kiểm tra xem user này có thể chạy sudo k 
`sudo -l `
![](https://images.viblo.asia/2a65ed63-ef5f-43e8-8018-822d2a595242.PNG)

Do mình không biết mật khẩu lên bỏ qua hướng này <br>
Tiếp theo mình tìm kiếm tất cả các file có SUID<br>
`find / -perm -u=s  -exec  ls -la {} \; 2>/dev/null` 

![](https://images.viblo.asia/bd877bd7-cf79-4cfd-a712-90bb9fb7e695.PNG)

Ở trên mình tìm nhìn thấy một binary có SUID và có userown là root: *nmap*. Nmap từ phiên bản 2.02 đến 5.21 có chế độ tương tác, từ đó ta có thể lấy được shell của root
```
nmap --interactive
!sh
```
![](https://images.viblo.asia/00262b0a-b9a7-4061-adbb-a6134f54af13.PNG)

Để ý ở đây khi chạy id thì uid vẫn là daemon chứ không phải là root và euid có giá trị là root.Nếu dừng ở đây thì ta vẫn lấy được root flag nhưng như mình nói ban đầu mục tiêu của mình là root chứ không phải là flag. Do đó mình sẽ tiếp tục leo núi tiếp :grin::grin:
Link tham khảo về process linux
[Process linux](https://nick.readthedocs.io/en/latest/Security/elevated_privilages/)

Theo mình tìm hiểu để leo từ euid lên thành uid root ta có 2 cách:<br>
**Sử dụng ssh**
* Điều kiện: server phải có dịch vụ ssh đang hoạt động và cấu hình cho phép xác thực bằng ssh key 
* Demo:<br>
    Đầu tiên tạo ssh key bằng ssh-keygen
    ![](https://images.viblo.asia/9ff71fd4-084d-4739-932a-1c2aeb539d87.PNG)
    Sau khi tạo thì ta có 2 file đó là id_rsa và id_rsa.pub. Tiếp theo copy file id_rsa.pub vào thư mục /root/.ssh và đổi tên thành authorized_keys. 
    ![](https://images.viblo.asia/46bfbb4c-dce5-44cd-ab18-aab4653690a4.PNG)
    Cuối cùng copy nội dung của file id_rsa vào máy và kết nối.
    ![](https://images.viblo.asia/c6c9983b-9e36-4c7f-96ff-cf17c38722e9.PNG)
    get roooooooooooooooot !


    
    
**Sử dụng một ngôn ngữ lập trình bất kì và trước khi tạo shell ta phải đặt uid=euid**
* Coming soon
# Conclusion
  Ở bài này mình học được là nếu là euid thì mới root "fake", khi nào chúng ta có uid là root thì mới là "real". Mình cũng mới chỉ bắt đầu học về leo thang nên kiến thức còn ít, nếu bạn thấy chỗ nào mình hiểu sai mong các bạn comment góp ý.
![](https://images.viblo.asia/2bb59de3-4b69-48cb-ad22-98b73908bf12.gif)
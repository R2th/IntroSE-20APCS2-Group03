*Chắc là việc cài đặt máy ảo Linux/Ubuntu trên Windows sẽ phổ biến hơn vì Windows thường vẫn sẽ là nền tảng sử dụng chính của mọi người vì sự tiện lợi và phổ biến của nó. Tuy nhiên khi dùng Ubuntu mà bạn muốn khám phá các hệ điều hành khác mà không cần phải cài lại thì có thể sử dụng tới các phần mềm hỗ trợ tạo máy ảo, Oracle VM VirtualBox là một phần mềm tạo máy ảo khá nổi tiếng tuy nhiên bài viết này mình sẽ giới thiệu tới các bạn một phần mềm khác dễ dùng, dễ cài đặt hơn là VMWare.*

Để sử dụng được VMWare bạn phải cài đặt 2 package là Open-VMWare Tools và VMWare Player để có thể sử dụng giao diện.

***Xem thêm***: [***Window function, pivot trong Spark SQL***](https://demanejar.github.io/posts/spark-sql-window-function-pivot-part-2/)
## Cài đặt
### Cài đặt Open-VMWare Tools
VMWare Tools không phải là một phần mềm tạo ra máy ảo nhưng nó là một package quan trọng giúp máy ảo của bạn có thể sử dụng các chức năng nâng cao, tăng hiệu suất giao tiếp giữa hệ điều hành khách và hệ điều hành máy chủ. VMWare Tools còn cung cấp rất nhiều lợi ích như đồ họa nâng cao trên máy ảo, hỗ trợ hệ thông âm thanh và tự động thay đổi kích thước máy ảo.

- Đảm bảo các package đều được update trước khi tiến hành cài đặt VMWare Tools: 
    ```
    sudo apt-get update
    ```
- Cài đặt `open-vm-tools-desktop`: 
    ```
    sudo apt-get install open-vm-tools-desktop
    ```
- Cài đặt `open-vm-tools`:
    ```
    sudo apt-get install open-vm-tools
    ```
<br />

Nếu bạn sử dụng các bản phân phối khác ngoài Ubuntu có thể tham khảo cách cài VMWare Tools [TẠI ĐÂY](https://docs.vmware.com/en/VMware-Tools/11.3.0/com.vmware.vsphere.vmwaretools.doc/GUID-C48E1F14-240D-4DD1-8D4C-25B6EBE4BB0F.html)

Nếu bạn không muốn sử dụng cửa sổ dòng lệnh thì sau khi cài VMWare Player bạn có thể cài đặt VMWare Tools ngay trên cửa sổ VMWare Player
![Screenshot from 2021-08-14 23-29-10.png](https://images.viblo.asia/997d09fc-21d8-4d17-8852-b9147d129fde.png)

Tuy nhiên mọi người có thể thấy thì việc cài đặt bằng Terminal khá dễ không hề phức tạp nên mình khuyên mọi người cài luôn VMWare Tools bằng Terminal, bởi vì việc cài đặt VMWare Tools trong VMWare Player chưa chắc đã là đơn giản.

### Cài đặt VMWare Player
- Tải về `VMware Workstation Player` (file bundle): [TẠI ĐÂY](https://www.vmware.com/products/workstation-player.html)

![image.png](https://images.viblo.asia/3bb067c1-b677-4606-a5dc-0d8fb3dca3cc.png)

- Đặt quyền thực thi cho file mà bạn vừa tải xuống <br />
`chuột phải -> chọn Properties` <br /><br />
![image.png](https://images.viblo.asia/023aaa71-de64-4bcb-b109-2d74710e5cfd.png) <br /><br />
Chuyển sang tab `Permissions` và tích vào ô `Allow_executing file as program` <br /><br />
![image.png](https://images.viblo.asia/ea235c92-d114-44de-a822-81b7616955fb.png)

- Sau đó nhân đúp vào để tiến hành cài đặt VMWare Player

Nếu bạn là người hay sử dụng **Terminal** thì có thể làm theo mình như sau: 
- Để đặt quyền thực thi cho file sử dụng câu lệnh: 
    ```
    sudo chmod +x VMware-Player-16.1.2-17966106.x86_64.bundle
    ```
- Chạy lệnh sau để tiến hành cài đặt: 
    ```
    sudo ./VMware-Player-16.1.2-17966106.x86_64.bundle
    ```
<br />
Sau khi cài đặt hoàn tất, bạn mở ứng dụng lên, accept các quy định của VMWare, sau khi hoàn tất là bạn có thể sử dụng VMWare Player rồi.

![image.png](https://images.viblo.asia/a5cd665e-1957-48b9-8142-80cdd9841820.png)

### Gỡ cài đặt VMWare Player
Để gỡ cài đặt VMWare Player bạn chạy dòng lệnh sau: 
```
sudo vmware-installer -u vmware-player
```

Để gỡ cài đặt VMWare Tools bạn chạy dòng lệnh: 
```
sudo apt-get remove open-vm-tools
```

## Sử dụng
- Để có thể chạy máy ảo hệ điều hành nào bạn phải tải về file `.ios` của máy ảo đó để VMWare có thể cài đặt hoặc là sử dụng file `.vmx` (cái này mình sẽ nói sau khi nói về cài đặt Kali linux trên máy ảo VMWare nha)
- Chọn `Create a New Virtual Machine` để tạo máy ảo mới, chọn `Use IOS image` và dẫn đường dẫn tới file `.ios` của bạn

![image.png](https://images.viblo.asia/420222c1-5495-4c01-9405-a3f88b80cb7b.png)

- Cài đặt và chia tài nguyên cho máy ảo, với những hệ điều hành cụ thể thì VMWare đã gợi ý dung lượng hợp lí cho hệ điều hành đó. Nếu bạn có một nhu cầu cao hơn có thể tăng dung lượng được VMWare khuyến nghị lên.

![image.png](https://images.viblo.asia/dca4a752-8d97-4944-883f-406bb6a0263b.png)

- Nhấn `next` để tiến hành cài đặt sau đó là sử dụng bình thường như những hệ điều hành khác mà các bạn sử dụng trên máy chủ.

Tham khảo: [https://itsfoss.com/](https://itsfoss.com/install-vmware-player-ubuntu-1310/), [https://docs.vmware.com](https://docs.vmware.com)

Liên kết: [https://www.tailieubkhn.com/](https://tailieu-bkhn.blogspot.com/)
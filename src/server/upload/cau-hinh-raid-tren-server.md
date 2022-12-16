Hôm nay mình sẽ trình bày với các bạn bài viết về việc config raid trên Server.

Ở đây mình config trên Server “Supermicro"

Các khái niệm cơ bản về RAID, HDD, BIOS, IPMI, OS … các bạn research trên google để nắm rõ hơn. Mình sẽ vào vấn đề chính như bên dưới:

Sau khi cắm dây điện, chuột, phím, màn hình các kiểu vào Server. Chúng ta tiến hành khởi động Server.


**1. Config Disks for Intel AHCI SATA or RAID**

   Đây là giao diện lần đầu khởi động:
    ![](https://images.viblo.asia/76b00f7a-c4dc-4cab-8eae-09b03d93b395.jpg)

   Ta nhấn F11 để vào BIOS: mục đích để config SATA về Raid.
   
   Advanced -> lựa chọn SATA Configuration. 
![](https://images.viblo.asia/69e2d8ba-98a3-4ea1-ae21-dfffcb87544c.jpg)

   Giao diện Advanced hiện ra.
   
=> Chọn tab Configure SATA as: RAID, các thông số còn lại để default.
![](https://images.viblo.asia/5edc4bcb-27d7-4da4-b777-0de2bfb783f3.jpg)

**2. Configure IPMI module in the BIOS.**

Cái này thì không liên quan đến config Raid lắm, sẳn tiện mình đang ở BIOS nên config luôn, sau này có khi dùng đến.

IPMI: Hiểu nôm na đơn giản - là remote từ xa để monitoring phần cứng Server thông qua giao diện Web.

Trong BIOS -> ta lựa chọn tab IPMI -> BMC Network Configuration.
    ![](https://images.viblo.asia/ac2625cc-7adc-4da2-83a2-38d7a95c6f42.jpg)
    Tiến hành đặt IP cho IPMI
    
   Station IP Address	: Nhập IP.
    
   Subnet Mask		: Nhập Subnet.
    
   Gateway IP Address	: Nhập gateway.

![](https://images.viblo.asia/9568b61b-f98b-4ccc-9084-5f4c98cd3670.jpg)

Kết quả thành công hay không ?
Lấy một PC cùng dãy mạng -> truy cập vào web bằng trình duyệt sau đó nhập IP trên thanh address.
Nếu ra giao diện login thì đã thành công.

![](https://images.viblo.asia/eb3a2340-c710-4cb2-aa9b-f57a067f108c.png)

**3. Config Raid trên Server.**

Sau khi config 2 bước trên, chúng ta restart lại Server, chờ tầm 3 phút.

Sau khi thấy msg hiển thị như hình bên dưới, ta nhấn CTRL + H để vào config RAID.

![](https://images.viblo.asia/020d3dce-e65b-4c08-ae73-1f4908ecbe48.png)

Lựa chọn card raid -> sau đó click Start.
![](https://images.viblo.asia/c366da5c-124f-441f-b5a0-53d1c4fec674.PNG)

Hiện tại trên Server chỉ có 2 ổ cứng vật lí - mỗi ổ dung lượng ~2TB.

Click “Configuration Wizard” để tiến hành config.
 
![](https://images.viblo.asia/b75effac-5cc4-4a27-92fc-7b076f0edd80.jpg)


Lựa chọn New Configuration -> Next.

![](https://images.viblo.asia/2dc7e862-943a-4b34-aacf-f85cec87000f.jpg)

Thông báo lựa chọn này sẽ làm mất hết dữ liệu cũng như các ổ RAID trước đó đã có, 

Lưu ý nếu ổ cứng có dữ liệu, ta nên backup dữ liệu trước khi thực hiện thao tác này. 

Chọn Yes để tiếp tục


![](https://images.viblo.asia/ddf5f504-892a-4db8-aa04-c6cf60fa90c5.jpg)

Lựa chọn Manual Configuration -> Next

![](https://images.viblo.asia/d328e149-bcdc-4a9e-9800-72f29da3ccc4.jpg)

Chọn ổ đĩa muốn tạo RAID, lưu ý RAID 1 yêu cầu tối thiểu 2 ổ cứng để hoạt động.

Tổng dung lượng sau khi RAID chỉ còn lại một ổ.

 Sau khi chọn ổ cứng theo mong muốn, nhấn Add To Array.
![](https://images.viblo.asia/fa9210a3-bfdb-44ab-8390-e7ccdb122c8f.jpg)

Chọn Accept DG để lưu cấu hình, sau đó chọn Next. (Nếu muốn chọn lại ổ đĩa khác thì bấm vào Reclaim để chọn lại)
![](https://images.viblo.asia/053e7b7d-230f-4789-b649-4e9e99a49e10.jpg)


Chọn Add to SPAN và Next.

![](https://images.viblo.asia/b874ed17-3e45-407c-ae5f-45bbcf255748.jpg)





– SPAN đã được thêm vào.

– RAID Level: Chọn RAID 1.

– Strip Size: Chọn size theo nhu cầu sử dụng, ở đây mình để mặc định 64 KB.

– Select Size: Nhập dung lượng ổ cứng muốn tạo hoặc click Update Size.

– Nhấn Accept để lưu cấu hình.
![](https://images.viblo.asia/7bdb85d4-7a24-4669-a384-c2d436770971.jpg)


Confirm lại -> Chọn Yes.
![](https://images.viblo.asia/b1d01a0d-2877-4eeb-80a2-a29de9e5b24e.png)


Chúng ta đã thấy có 1 ổ cứng VD 0 được tạo ra từ raid 1.

Click Accept để lưu cấu hình.
![](https://images.viblo.asia/fe6f07e6-f192-4f1b-885f-54f3fde08bb7.jpg)

Chọn ổ để boot OS.

Lưa chọn Set Boot Drive -> Go.
![](https://images.viblo.asia/cabbde48-515b-43bc-8b72-1ad4b37c0b2e.jpg)



Kết quả thành công, chúng ta thấy nó đã tồn tại.

![](https://images.viblo.asia/900cbb59-8374-41d6-b813-7ef8e255667e.jpg)

=> Như vậy xong phần cấu hình raid cho ổ cứng. 

=> Khi cài OS thì ta lựa chọn chính xác ổ ảo vừa tạo nữa là OK.

Ví dụ mình đang cài XEN Server. Thì mình chọn ổ để lưu OS là nó.

![](https://images.viblo.asia/e1f70d5b-e78e-490d-be02-127232464f49.jpg)


**4. Test Raid & Trouble Shoot.**

  Theo như kiến thức mình tìm hiểu về nguyên tắt hoạt động của raid.
  '
  
   Đối với raid 1 chẳng hạn, raid 1 thì bao gồm 2 ổ cứng, nếu rút nóng hoặc chết 1 ổ thì dữ liệu vẫn còn và hoạt động bình thường.
      
  -> OK, phần này thì chuẩn rồi - không có gì bàn cãi.
  
 '  

   Trường hợp có 2 ổ đang dùng, có 1 ổ bị chết - ta mua ổ mới hoàn toàn về cắm lại thì sao ?
   
   -> OK, trong trường hợp này Raid sẽ tự rebuild lại, tự đồng bộ data từ ổ cũ sang ổ mới. data vẫn bình thường.
   
  '
          
   Tuy nhiên trong trường hợp 2 ổ đang hoạt động bình thường, ta rút nóng ra 1 ra ngắm nghía rồi cắm lại sẽ ra sao ?
   
   -> Kết quả ổ cứng đấy sẽ không tự rebuild được như ban đầu, có nghĩa là nó không tự khôi phục lại được raid 1.
   
 '
  
   => Chốt, Raid hoạt động khi ổ cứng chết hoặc thay ổ mới hoàn toàn.
   
'

   Server không thể tự rebuild, không có nghĩa là ta sẽ bỏ mặc luôn. Trong trường hợp này ta vẫn có thể tự rebuild lại bằng tay.
 
   Lựa chọn ổ cứng không thể tự rebuild.
![](https://images.viblo.asia/31a96f60-a2f2-47f0-86ac-d8582bed2f5b.jpg)

   Lựa chọn rebuild -> Go
![](https://images.viblo.asia/f4244fdc-4628-49a7-a129-df52d72ba1c9.jpg)

  Đang trong tiến trình rebuild. Chúng ta chờ nó hoàn thành là OK.
![](https://images.viblo.asia/6d7fd050-418e-4c86-9eac-be7a5d68cc17.jpg)


Cảm ơn các bạn đã xem qua, bài viết mình xin kết thúc tại đây.

'

Nguồn tham khảo:

https://www.psychz.net/client/question/vi/what-is-ipmi.html

https://www.youtube.com/watch?v=woo_3PywYE0&t=36s

https://kenh49.vn/huong-dan-tao-raid-5-tren-server-supermicro-x10dai/

https://www.thomas-krenn.com/en/wiki/Activate_OnBoard_SATA_RAID_on_Supermicro_Motherboards
> AWS cung cấp nhiều các giải pháp để **lưu trữ**, tuy nhiên có 3 loại lưu trữ điển hình là: **EBS, EFS và S3, EC2 Instance Store**. Mỗi loại có chức năng riêng đáp ứng nhu cầu, khối lượng công việc khác nhau. Hôm nào mình sẽ tổng hợp lại chức năng của 3 loại này. Hôm nay mình sẽ tìm hiểu về loại đầu tiên là **EBS** nhé. Let's go!!!

## 1. EBS Volume là gì?
Amazon Elastic Block Store (EBS) là một dịch vụ lưu trữ dạng block dễ sử dụng và hiệu năng cao, được thiết kế để sử dụng với Amazon Elastic Compute Cloud (EC2) cho các khối lượng công việc đòi hỏi tốc độ giao dịch và thông lượng cao ở mọi quy mô.
![](https://images.viblo.asia/70b4a7d9-9d8e-4f5a-92ca-38077e623a2e.png)
## 2. EBS có lợi thế gì mà ta phải dùng?
-  Có độ trễ thấp (low-latency performance): Bằng cách sử dụng SSD EBS, nó cung cấp hiệu suất I/O đáng tin cậy, tối ưu nhu cầu khối lượng công việc và dung lượng lưu trữ.
- EBS đảm bảo tất cả dữ liệu của bạn được bảo vệ. Vì nó cho phép các instances duy trì dữ liệu, thông qua Snapshot, ngay cả khi instances đó có bị terminate đi nữa.
- Khả năng lưu trữ an toàn và khả dụng cao: EBS volumes cung cấp dung lượng dự phòng trong AZ, kiểm soát truy cập và mã hóa tăng cường bảo mật.
- Thay đổi vị trí địa lý: Với EBS, bạn có thể duplicate snapshot qua khắp các regions, có thể đặt tài nguyên và dữ liệu ở nhiều vị trí khác nhau. Phục vụ cho khôi phục data sau thảm họa, ...
- EBS có thể nhanh chóng scale up or down volumes, đảm bảo bạn sẽ nhận được hiệu suất và dung lượng phù hợp cho các nhu cầu đang thay đổi.

## 3. Sử dụng EBS như thế nào?
- 1 EBS muốn được sử dụng, bắt buộc phải gắn nó vào 1 EC2 instance. 
- EBS cũng thuộc về 1 AZ cụ thể. Ví dụ EBS A thuộc AZ "abc", nhưng instance B thuộc AZ "cde" thì không thể nào gắn EBS A cho instance B được.
- 1 EBS chỉ có thể attach tới 1 instance tại 1 thời điểm.
![](https://images.viblo.asia/20a53470-f2ce-4d40-bef0-397ebd0e8434.png)

<br>

**Note:**

- Đơn giản, hãy xem EBS như 1 USB có gắn mạng zậy :))
- **Free tier**: 30GB free mỗi tháng cho option  **General Purpose SSD (gp2)** hoặc **Magnetic**

 ![](https://images.viblo.asia/d62b64da-3b4e-4209-a99f-c72921ba673c.png)

Giờ thử tạo 1 EBS nhé!
- Đầu tiên bạn cần có một EC2 instance. Nhấn vào xem instance đang running.

![](https://images.viblo.asia/6825e612-9099-419c-879c-6f85d4908213.png)

- Ở mục Storage, ta có thể thấy device type là EBS

![](https://images.viblo.asia/e2f12598-aeb7-4df3-a155-b46dca44e183.png)

- Nhấn vào volume ID để xem **root** EBS của instance đó

![](https://images.viblo.asia/a2e99116-fef0-4aff-b91b-1a74564c5a43.png)

- Ta có thể tạo thêm EBS volume (button **Create Volume** góc trái). Ta chọn type **gp2**, set size **2GB** chẳng hạn, và **AZ** của instance mà ta muốn gắn EBS này vào.
 
![](https://images.viblo.asia/4e9257d5-69b4-4466-aaae-33fc199177da.png)

- Để xem lại EBS vừa tạo, ta remove filter như hình mới có thể thấy tất cả EBS trong AZ hiện tại.

![](https://images.viblo.asia/dd6a72e3-5772-47ca-b9a7-bcbd9defceae.png)

- EBS **2GB** là cái mình vừa tạo. Status đang là **available**.

![](https://images.viblo.asia/13553a0a-0945-4007-9c83-9217ff103079.png)

- Giờ mình sẽ gắn nó vào instance lúc nãy.

![](https://images.viblo.asia/641321ba-cdc0-4b56-adae-45fc9b0f3bb4.png)

- Chọn EC2 trong cùng AZ mà bạn muốn gắn vào.
![](https://images.viblo.asia/d30a8812-ec95-400e-bc9a-d2b712c3ca7a.png)

- Status nó thay đổi thành **in-use** rồi nè. Vậy là mình đã tạo xong 1 EBS.

![](https://images.viblo.asia/18c019ff-41d1-4d3e-86d0-a4016a686c25.png)

**Note**:
Khi **terminate** 1 instance, thì **roots EBS** sẽ bị xóa đi theo, còn EBS mình tạo không bị xóa đi.

## 4. EBS Snapshot
- Snapshot là 1 backup của EBS volume tại 1 thời điểm nào đó.
- Snapshot có thể được sao chép từ AZ này sang AZ khác và tương tự đối với regions.
![](https://images.viblo.asia/618fe942-940b-43fa-9185-9b474bd25a4d.png)

- Nào, thử tạo 1 snapshot xem sao nhé!
- Đầu tiên, chọn volume EBS muốn tạo snapshot. Rồi chọn Create Snapshot.
![](https://images.viblo.asia/372924f7-cccc-4dad-86eb-38dc5ddca111.png)

![](https://images.viblo.asia/83b1dadf-b446-49cb-b69f-523417f70de4.png)

- Qua tab Snapshot, lúc này Snapshot chỉ avaiable trong region, ko link tới AZ cụ thể nào.
![](https://images.viblo.asia/7aff3890-1c94-48b0-aa99-e127b905e935.png)

- Giờ thì ta có thể copy snapshot này sang 1 region khác
![](https://images.viblo.asia/c7ef1a1e-8652-4fa6-a3e6-999bcc459c7c.png)

- Chọn region. Vậy là ta đã move đc EBS này sang region khác.
![](https://images.viblo.asia/02858d73-5c7e-4fa0-a86e-461a0757eb34.png)

- Và ta cũng có thể tạo volume từ snapshot này. Để mục đích move nó sang AZ khác.
![](https://images.viblo.asia/a1136539-dc21-4970-9c68-1569d75dcec1.png)

- Chọn AZ khác cho volume này
![](https://images.viblo.asia/37242b36-d772-4a84-a35b-984feaadf592.png)

- Cùng xem lại kết quả ở tab Volume nào:
![](https://images.viblo.asia/352dc1d9-6586-44eb-97af-f313de5c1abb.png)

Thật hay phải không nào, chúng ta đã move được snapshot sang 1 AZ khác.

## 5. EBS Volume Types 
Volume EBS có 6 loại:

• gp2 / gp3 (SSD): Ổ SSD mục đích chung **cân bằng** giữa giá cả và hiệu suất cho khối lượng công việc nhiều và đa dạng.

• io1 / io2 (SSD): Ổ SSD **hiệu suất cao nhất** cho nhiệm vụ quan trọng độ trễ thấp, hoặc khối lượng công việc thông lượng cao

• st1 (HDD): Ổ cứng HDD chi phí **thấp** được thiết kế cho khối lượng công việc được truy cập thường xuyên, thông lượng cao

• sc1 (HDD): Ổ cứng HDD chi phí **thấp nhất** được thiết kế cho khối lượng công việc được truy cập ít thường xuyên hơn.

> - EBS Volumes đặc trưng bởi **Dung lượng** | **Thông lượng** | **IOPS** (I/O operations per sec)
> - Chỉ  gp2 / gp3 và io1 / io2 có thể sử dụng như 1 boot volume. Có nghĩa là ở đó hệ điều hành gốc sẽ được chạy.

<br>

**Một số thông tin về gp2/gp3, io1/io2, phần này quan trọng trong test exam:**

--> **General Purpose SSD: gp2/gp3**
- Lưu trữ hiệu quả về chi phí, độ trễ thấp.
- Sử dụng cho system boot volume, virtual desktop, Developments và test enviroments.
- Dung lượng có thể thay đổi từ 1GB - 16 TB
- **gp3:**
  + là phiên bản mới hơn của gp2
  + cơ bản là 3000 IOPS và thông lượng đạt 125 MB/s
  + có thể tăng lên đến 16,000 IOPS và 1000MB/s thông lượng một cách **độc lập**.
 - **gp2:**
    
   + volume gp2 nhỏ có thể burst lên đến 3000 IOPS
   + Dụng lượng và IOPS là **không độc lập**, max IOPS là 16,000
   + Có nghĩa là muốn tăng IOPS, thì phải tăng dung lượng. Thêm 3 IOPS mỗi GB, tức là dung lượng 5,334GB thì sẽ đạt max IOPS là 16,000.


<br><br>

--> **Provisioned IOPS (PIOPS) SSD:** **io1/io2**

- Sử dụng cho các ứng dụng kinh doanh quan trọng cần **hiệu năng IOPS** bền vững.

- Hoặc những ứng dụng cần hơn **16.000 IOPS**

- Thật sự tuyệt vời cho loại công việc có sử dụng **Database** (nhạy cảm với **hiệu suất lưu trữ** và **tính nhất quán**(consistency))

-  **io1 / io2 (4 GB - 16 TB):**

   + Max PIOPS: 64.000 đối với Nitro EC2 Instance & 32.000 đối với loại Instance khác.
   + Có thể tăng PIOPS một cách **độc lập** với dung lượng lưu trữ, như gp3.
   + Ngày nay ta dùng io2 nhiều hơn? --> io2 có độ bền cao hơn và nhiều IOPS hơn trên mỗi GB (cùng mức giá với io1)

- **io2 Block Express (4 GB - 64 TB)**

  + Độ trễ dưới mili giây
  + PIOPS tối đa: 256.000 với tỷ lệ IOPS: GB là 1,000: 1

<br><br>

--> **Hard Disk Drive (HDD): st1, sc1**

- Không phải là boot volume
- Dung lượng: 125 MB đến 16 TB 
- Throughput Optimized HDD volumes (**st1**) 

  + Phù hợp với Big Data,  Data Warehouses, Log Processing.
  + Thông lượng tối đa 500 MB/s - IOPS tối đa 500 
 
- Cold HDD (**sc1**): 
  + Đối với dữ liệu được truy cập không thường xuyên 
  + Đầu tư chi phí thấp nhất
  + Thông lượng tối đa 250 MB/s - IOPS tối đa 250

Tham khảo bảng so sánh mình lấy từ docs aws:
![](https://images.viblo.asia/2a00db87-d114-4fbf-a212-928cd9f7daca.png)

## 6. EBS Multi-Attach (io1/io2 family)
- Ở trên mình có nói rằng: 1 EBS chỉ có thể attach vào 1 EC2 đúng không, cơ mà loại trừ EBS Multi-Attach nhé !!
   
   + Các instances có quyền đọc và ghi vào loại EBS này.
   + Sử dụng cho những ứng dụng Clustered Linux (như Teradata thôi)
   + Những ứng dụng phải có quản lý việc write đồng thời vào cùng 1 volume nữa.
   
![](https://images.viblo.asia/f9dd2497-f955-4081-90d6-2334aab37793.png)

## 7. The Takeaways
**EBS**
- Là 1 network drive
  + Linh động, có thể rời EC2 này, gắn vào EC2 khác
- Nó được ràng buộc trong 1 AZ
  + Để di chuyển cần tạo snapshot.
- Có thể cung cấp dung lượng, và IOPS
  + Được cung cấp bill cho tất cả dung lượng được AWS cung cấp.
  + Có thể scale dung lượng trong khi sử dụng.

**Snapshot**
- Snapshot có thể được sao chép, di chuyển sang regions khác
- Snapshot có thể được sao chép, di chuyển sang AZ khác bằng cách tạo volume.

**gp2/gp3**
- Lưu trữ hiệu quả về chi phí, độ trễ thấp.
- gp3 độc lập khi thiết lập IOPS và thông lượng.
- Trong khi đó, gp2 thì liên kết tất cả, không độc lập.


**io1/io2**
  + Nếu ta cần hơn 32,000 IOPS, ta cần Nitro EC2 với io1 hoặc io2.
  + EBS của instance này là **Multi-Attach:** có thể gắn nhiều EC2 cũng lúc
     - Chỉ sử dụng cho **1** loại công việc đặc biệt và EBS đi theo nó cũng thế.

<br>
Cảm ơn các bạn đã đọc, bài viết không thể tránh khỏi thiếu sót. Hẹn gặp lại trong các bài viết sau. 
<br>
Bạn có thể để lại ở phần bình luận chủ đề mà các bạn muốn mình tìm hiểu nhé. Peace!
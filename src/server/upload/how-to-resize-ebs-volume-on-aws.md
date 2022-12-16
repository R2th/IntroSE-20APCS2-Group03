Ở [bài trước](https://viblo.asia/p/tim-hieu-ve-ebs-elastic-block-store-cua-aws-gGJ596EDKX2) chúng ta đã tìm hiểu tổng quan về EBS, các loại EBS hiện có, cách tạo và sử dụng EBS. Kì này mình muốn chia sẻ về **cách resize EBS**, làm thế nào để scale up và scale down 1 EBS. Nào, Let's go! Nhưng mà khoan, viblo đang lỗi upload, nên có một vài chỗ mình chưa upload hình ảnh được mong các bạn thông cảm.

## 1. Tăng size EBS Volumes với Linux EC2 Instances
> Giả sử mình đang có 1 instance đang sử dụng EBS với dung lượng 8 GiB, và dung lượng này đã được sử dụng hết. Giờ nhu cầu business tăng, bạn cần thêm nhiều tài nguyên EBS hơn, do đó cần phải phải tăng volume để hỗ trợ cho nhu cầu này. Mà thời gian lại rất hạn chế. Hãy cùng xem cách thực hiện việc này nhé.

![](https://images.viblo.asia/be9c64aa-11ad-4862-9cdf-1462185323e7.png)

**Đầu tiên**, đi đến volume của bạn và chọn **Modify Volume** ở mục **Action**

![](https://images.viblo.asia/57eef0ea-0687-4243-8922-e92b8995ef39.png)

Bạn được cung cấp các tùy chọn để thay đổi cả **dung lượng** và **loại** volume.

Bạn cũng có thể chuyển sang Provisioned IOPS SSD (io1), tăng dung lượng lên 100GB và đặt IOPS thành 5000 nếu nhu cầu của bạn cần đến mức này.

![](https://images.viblo.asia/ef45eaf5-450e-4597-af18-9ae6e31bcfc8.png)

Ở đây, mình sẽ set volume **size 30GiB** và giữ nguyên **loại volume**, nó sẽ bắt đầu quá trình tối ưu hóa (in-use - optimizing).

![](https://images.viblo.asia/b719c028-c5a3-4ed0-ad87-fadc19568bd0.png)

Sau khi volume được mở rộng, EC2 instance và hệ thống đều cần được điều chỉnh để thích ứng với dung lượng mới. Lưu ý rằng bạn có thể thực hiện điều chỉnh này với tư cách là root user hoặc user có quyền sudo.

Đến đây, bạn có thể restart lại instance để cập nhật lại toàn bộ thành phần trong instance. Nhưng khoan, bạn có thể xem cách làm theo command line sau đây để hiểu bản chất hơn.

**Bước tiếp theo**, là kiểm tra dung lượng phân vùng.
![](https://images.viblo.asia/99ad4c37-9aaa-46e9-a80e-9f3433b73bf1.png)

Ta có thể thấy rằng volume(**disk**) đã được mở rộng; tuy nhiên, phân vùng chính(**part**) vẫn ở dung lượng ban đầu của volume. Để mở rộng phân vùng, hãy sử dụng lệnh ở hình sau đây. Sau khi làm như vậy, bạn sẽ thấy rằng phân vùng đã mở rộng để phù hợp với dung lượng của volume. (1 ở đây là số lượng phân vùng)

![](https://images.viblo.asia/89f4b83d-7ec7-49cc-bfd3-637f6b4ae844.png)

**Tiếp theo, dung lượng hệ thống tệp cần được kiểm tra.** Trong ảnh chụp màn hình bên dưới, bạn sẽ nhận thấy rằng nó vẫn chỉ 20GB, mặc dù cả volume và phân vùng đã được thay đổi dung lượng.
![](https://images.viblo.asia/99abffef-7137-4bd2-8c12-6c9d7468ed07.png)


Trước khi bắt đầu chỉnh dung lượng cho phần này, hãy đảm bảo rằng bạn biết là mình đang làm việc với hệ thống tệp nào. Nếu bạn chưa biết, bạn có thể tìm hiểu bằng lệnh sau:

![](https://images.viblo.asia/c6cffc91-e053-4451-8722-8ad40b83c9f2.png)

Nếu bạn đang sử dụng hệ thống tệp ext4 (hoặc thậm chí là ext2 hoặc ext3 cũ hơn), bạn có thể mở rộng nó bằng cách dùng lệnh “**resize2fs/dev/xvda1**”. 

Trong trường hợp này, hệ thống tệp là XFS, chúng ta phải dựa vào công cụ “**xfs_growfs**”, công cụ này đã có trong hệ thống. Nếu không, bạn có thể tự cài đặt nó như một phần của gói “**xfsprogs**”. 

Chúng ta tiến hành mở rộng hệ thống tệp để phù hợp với dung lượng volume và dung lượng phân vùng 30GB. Chúng ta sẽ trỏ đích là “**/**”, vì đó là nơi “**/dev/xvda1**” đã được gắn kết (mountpoint).

![](https://images.viblo.asia/9dc32719-1026-4020-b390-27ad7a8a7276.png)

Volume giờ đã được resize dung lượng đầy đủ và sẵn sàng để sử dụng. Không có downtime trong quá trình này. Như vậy đây là 1 cách. Cách thứ 2, **bạn cũng có thể mở rộng phân vùng và dung lượng hệ thống tệp sau khi bạn đã tăng khối lượng trên AWS bằng cách đơn giản hơn, là khởi động lại instance của bạn.** Khi hệ điều hành hoạt động trở lại, nó sẽ tự modify mọi thứ. Tất nhiên, điều này sẽ gây ra một lượng nhỏ downtime, nhưng đối với các công ty nhỏ hơn không có kỹ sư DevOps (hoặc những người không có kinh nghiệm về Linux), đây có thể là một lựa chọn tốt.

Dung lượng và cấu hình volume EBS vẫn có một số hạn chế (ví dụ: dung lượng volume tối đa của chúng là 16TiB), do tính chất vật lý và số học của kiểu lưu trữ dữ liệu dạng block. Ngoài ra, AWS cũng đặt ra các giới hạn của riêng họ. Bạn có thể vào [document AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/volume_constraints.html) để tìm hiểu đầy đủ hơn.

## 2. Giảm size EBS Volume
Rất tiếc, EBS Elastic Volumes không hỗ trợ giảm size volume. Việc giảm size một volume trong Amazon sẽ yêu cầu tạo một volume mới, gắn nó vào instance đang chạy và sao chép tất cả dữ liệu vào đó.

**Một số lưu ý:** chúng ta không thể giảm dung lượng của một volume gốc, vì vậy ta cần tạo một volume mới và di chuyển dữ liệu hiện có. Luôn nhớ sao lưu dữ liệu của bạn trước khi di chuyển. Xóa volume lớn (cũ) để bạn không tiếp tục trả chi phí cho lưu trữ mà bạn không sử dụng.

**Đầu tiên**, tạo một volume nhỏ hơn volume ban đầu, nhưng dung lượng của volume mới phải lớn hơn dung lượng đã được tiêu thụ trong volume ban đầu.
![](https://images.viblo.asia/60380a4b-8d1b-4470-912d-4b7cc219175e.png)


Bây giờ, hãy đính kèm volume mới dưới dạng "**/dev/sdf**" vào instance đang chạy của bạn nơi mà EBS cũ được gắn kết.

![](https://images.viblo.asia/ea5e5425-54f0-499a-aba8-aeee8e7664f2.png)

![](https://images.viblo.asia/fcf847e4-6019-47b9-baa4-0ef6e0659e74.png)

### **2.1. Mounting the volume**

Vì volume mới hoạt động, trước tiên cần định dạng nó bằng hệ thống tệp và gắn nó vào instance. Bạn có thể chọn bất kỳ hệ thống tệp nào bạn cần. Trong trường hợp này, mình sử dụng ext3 làm hệ thống tệp. 

**Bước 1:** Login your ec2 instance và liệt kê những ổ đĩa bằng cách sử dụng command:

```
lsblk
```

**Bước 2:** Kiểm tra xem volume có bất kỳ dữ liệu nào hay không bằng cách sử dụng lệnh sau:
```
sudo file -s /dev/xvdf
```

Nếu output hiển thị “/dev/xvdf: data”, điều đó có nghĩa là volume của bạn trống.

**Bước 3:** Định dạng volume cho hệ thống tệp ext3 bằng lệnh sau.

```
sudo mkfs -t ext3 /dev/sdf
```
![](https://images.viblo.asia/b51c4eb6-64af-4330-827e-66f07484dcc8.jpg)


Ngoài ra, bạn cũng có thể sử dụng định dạng xfs.

```
sudo mkfs -t xfs /dev/xvdf
```

**Bước 5:** Tạo một thư mục để gắn volume ext3 mới. Mình sử dụng tên "newone". 

```
sudo mkdir /newone
```

![](https://images.viblo.asia/a1ad94a0-7b8e-44ae-bb87-9077fa48a3d0.jpg)


**Bước 6:** Gắn volume vào thư mục “newone” bằng lệnh sau:

```
mount /newone
```

![](https://images.viblo.asia/3e992c06-1ddf-45cb-88b2-72d438bc821d.jpg)

**Bước 7:** 

```df -h``` 

Bây giờ bạn có thể thấy rằng volume EBS 5GB mới đã được gắn kết thành công trong thư mục dưới dạng ‘newone’.

![](https://images.viblo.asia/fe5db875-5cdd-4def-b587-54290b4b9c50.jpg)

Có mount thì sẽ có unmount, bạn sử dụng lệnh dưới đây nhé:

```
umount /dev/xvdf
```

### 2.2. Copying the data
Sao chép dữ liệu từ volume 8GB sang volume 5 GB bằng lệnh sau: 
```
sudo rsync -aHAXxSP /new /newone
```

Trong lệnh với option aHAXxSP tạo một bản sao lưu đầy đủ của thư mục gốc hệ thống. Chúng tôi khuyên bạn nên đảm bảo rằng không có thao tác ghi trên đĩa trong quá trình sao lưu để đạt được hệ thống tệp nhất quán. Bạn có thể tạm thời đóng băng I/O trong khi sao chép. Một số hệ thống tệp, chẳng hạn như XFS, cho phép bạn đóng băng và giải phóng hoạt động I/O để sao chép dữ liệu thành công và nhất quán. Tìm hiểu thêm về các [ứng dụng đóng băng và snapshot nhất quán](https://n2ws.com/blog/how-to-guides/blog/ebs-snapshots-crash-consistent-vs-application-consistent.html). Như bạn có thể thấy, tất cả dữ liệu đã được sao chép sang dung lượng 5GB mới được gắn trên thư mục ‘newone’.

![](https://images.viblo.asia/e43d9a16-401a-4719-8cdf-914d8cf6f6df.jpg)

Bạn có thể tìm sự khác biệt giữa volume gốc và thư mục volume mới bằng lệnh dưới đây: 

```
diff -r /new /newone
```

### 2.3. Detaching the old volume and stop the instance (Tách volume cũ và dừng instance)
Bây giờ bạn có thể tách dung lượng 8GB cũ khỏi instance, nhưng trước tiên hãy dừng instance để ngăn lại conflict.

***--- Ảnh minh họa chưa upload ---***

Sau khi dừng phiên bản, hãy chuyển đến phần Volume của bảng điều khiển AWS EC2 của bạn và Detach Volume EBS 8GB đã được gắn trước đó.

***--- Ảnh minh họa chưa upload ---***

Start lại instance.

***--- Ảnh minh họa chưa upload ---***

Bây giờ bạn có thể thấy rằng khối lượng EBS 8GB đã được tách thành công và dữ liệu duy nhất còn lại là volume 5GB mới của bạn.

***--- Ảnh minh họa chưa upload ---***


<br>
Vậy là mình đã giới thiệu cách để resize volume EBS trong AWS. Đừng quên like, share, subscribe nếu bạn thấy hay. Cảm ơn bạn đã đọc, hãy để lại comment của bạn ngay bên dưới để mình có thể hoàn thiện hơn. Chúc các bạn sức khỏe để vượt qua đại dịch này nha! Peace!
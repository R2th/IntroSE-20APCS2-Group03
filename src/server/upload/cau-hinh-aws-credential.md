**Yêu cầu**
* Cần có account aws, nếu hiện tại không có vào đăng kí trước: https://portal.aws.amazon.com/billing/signup#/start/email
* Phải có thẻ tín dụng, visa hoặc master-card gì đó.

### Tạo Credentail
* Sau khi đăng kí thành công, vào đây để đăng kí credentail: https://us-east-1.console.aws.amazon.com/iam/home?region=ap-southeast-1#/security_credentials
![](https://images.viblo.asia/25e4b4dc-b87c-445a-bb43-c7ae241401ae.png)
Click **New Access Key** để download về
* Open file để kiểm tra:
![](https://images.viblo.asia/d8c4268e-e3d0-41d9-8f2b-ad4ebd16c88c.png)

### Cấu Hình Credential
1. Trên VSCode
* Add **Extensions**, search *AWS-Toolkit*
![](https://images.viblo.asia/0044d498-911f-47e8-9c3e-cc01e3bdf70c.png)
Click Install, đợi một chút sẽ được install xong.
* Open VSCode: bấm tổ hợp phím, trên 
    - **mac** shift+command+p
    - **win** shift+control+p
* Tìm: *AWS: Create Credentials Profile*
![](https://images.viblo.asia/16cae96b-c5a8-4ac8-9044-34ffe78a905e.png)
* Sẽ yêu cầu nhập *accessKey* and *secretKey*
* Sau khi nhập sẽ có kết quả hiện ra, hoặc anh em run:
```
cat ~/.aws/credentials
```
![](https://images.viblo.asia/881085f6-de72-4123-9e28-d75dd28a70e4.png)

2. Sử dụng CMD
**Mac và Linux**
* create folder:
```
mkdir ~/.aws
```
* tạo file credentials:
```
touch ~/.aws/credentials
```
* Sử dụng vim edit file credentials:
```
[default]
aws_access_key_id=***
aws_secret_access_key=**
```
thay đổi *** bằng *accesskey* và *secretkey*.

### Tạo nhiều profile Credential
* Làm tương tự với cách tạo 1 credential thì sẽ tự add thêm vào file credentail
* Khi add credential thứ 2, nó yêu cầu bạn sét profile name. Lần đầu là default, lần thứ 2 sẽ yêu cầu tên.
![](https://images.viblo.asia/c128c19b-6275-4a0d-9adc-08b47b9427fe.png)
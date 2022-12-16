## 1. Lời nói đầu   
Khi sử dụng AWS, thường developer sẽ sử dụng accessKey/secretKey để authentication trên SDK/AWS TOOL để kết nối, thao tác với các service. 
Bài viết này mình chia sẻ cách phòng tránh bị người khác sử dụng accessKey/secretKey AWS trái phép, và trong trường hợp bị lộ thì giảm thiệt hại xuống mức thấp nhất. 
Đây là hiểu biết của mình, rất mong nhận được góp ý đóng góp thêm. 
Bài viết mình sử dụng Linux + Java để example.  

Về cơ bản có 3 giải pháp mình muốn viết:  

- Không lưu AccessKey/SecretKey trong source code
- Không sử dụng tài khoản root, hãy sử dụng tài khoản IAM User
- Set giới hạn budget cho tài khoản

## 2. Không lưu accessKey/secretKey trong source code  
Các thông tin bảo mật như accessKey/secretKey hay bất kể các thông tin bảo mật khác ví dụ như user/pass của database... vì lý do bảo mật, không nên lưu trong source code
=> Nên lưu ở chỗ khác, và trong source code sẽ kéo giá trị đó về. Như mình thường lưu ở trong biến môi trường của OS. 
Với Java SpringBoot việc config trong file .yml để lấy giá trị biến từ môi trường khá đơn giản. 
```yml
secret-key: ${ACCESS_KEY}
```
Để set giá trị biến môi trường này mình biết 2 cách:
### Cách 1: set thủ công     
Với linux, để set biến môi trường, chỉ cần terminate 
```bash
export ACCESS_KEY=abcxyz
```
để biến này luôn chạy mỗi khi khởi động lại OS, chỉ cần thêm lệnh trên vào file 
```bash
/etc/environment
```
### Cách 2: sử dụng awscli của AWS      
AWS cung cấp tool awscli, sau khi cài đặt tool này trên OS, chỉ cần config nhập accessKey/secretKey thì code ứng dụng được chạy trên chính OS này, khi sử dụng bộ SDK của AWS,** sẽ không cần phải khai báo accessKey/secretKey gì nữa**. Cứ init là SDK sẽ tự động lấy giá trị khai báo trong awscli.    
Để cài đặt aws cli
```bash
sudo apt-get install awscli
aws configure
# ví dụ nhập 
AWS Access Key ID [****************V]: AKIAIP7Y2FP3U3EJWLPQ
AWS Secret Access Key [****************1RzR]: BPDdFfQVUOxLJsDULb4gd0OL4Nc7UBmR31RzR/N
Default region name [None]: 
Default output format [None]:
```
Và code java khởi tạo connect, sẽ không phải khai báo bất cứ giá trị accesskey/secretKey gì trong code 
```java
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AwsS3Config {

    private final AmazonS3 s3connect;

    public AwsS3Config() {
        s3connect = AmazonS3ClientBuilder.standard().build();
    }

    @Bean
    public AmazonS3 awsS3() {
        return s3connect;
    }
}
```

## 3. Không sử dụng tài khoản root, hãy sử dụng tài khoản IAM User 
Có thể hiểu đơn giản tài khoản mà bạn đăng ký với AWS, cái mà phải nhập creditcard + email + phone là tài khoản root. Từ tài khoản root này có thể tạo ra các tài khoản con, gọi là IAM User. 
Khi phát triển, không nên sử dụng tài khoản root trực tiếp, mà hãy sử dụng tài khoản IAM User, đã được giới hạn quyền + giới hạn access  (đồng nghĩa với accessKey/secretKey của tài khoản đó cũng bị giới hạn theo)
* Các bước để tạo IAM User 
    - Login tài khoản root vào console AWS 
    - Vào service IAM, tab Users https://console.aws.amazon.com/iam/home?region=us-east-1#/users        
    - Click button Add user, và nhập theo form
    - Sử dụng URL sau để login vào aws console cho tài khoản IAM User 
    https://168146697673.signin.aws.amazon.com/console
    trong đó "168146697673" là ID của tài khoản root 
![Image](https://tungexplorer.s3.ap-southeast-1.amazonaws.com/aws/Lab_ELB/image/Account.png)
Như ảnh trên, mình đã tạo xong 2 tài khoản IAM User là "dev" và "prod". Hiện tại cả 2 tài khoản đều không có bất cứ quyền gì với resource của AWS. 

### 3.1. Giới hạn quyền cho tài khoản IAM User      
- Kịch bản demo: tài khoản IAM User "dev" sẽ chỉ được access vào service S3 (full quyền), ngoài ra các service khác sẽ không thể access (Vd: EC2, RDS, ElasticCache...)
- Hướng thực hiện: mình sẽ tạo ra 1 Groups "OnlyS3FullPermission" được build dựa trên Policy mà AWS có sẵn là "AmazonS3FullAccess" và Attach IAM User "dev" vào Group này. 
- Step by Step  
    - Đặt tên [Groups](https://console.aws.amazon.com/iam/home?region=us-east-2#/groups)
    ![Image](https://tungexplorer.s3.ap-southeast-1.amazonaws.com/aws/Lab_ELB/image/Group1.png)
    - Attach Policy mà AWS có sẵn là AmazonS3FullAccess vào Groups. (như cách đặt tên của AWS, policy này cho phép User chỉ full quyền vào service S3)
    ![Image](https://tungexplorer.s3.ap-southeast-1.amazonaws.com/aws/Lab_ELB/image/Group2.png)
    - Attach User "dev" vào Groups vừa tạo
    ![Image](https://tungexplorer.s3.ap-southeast-1.amazonaws.com/aws/Lab_ELB/image/Group3.png)
    - Thử nghiệm lại kết quả bằng cách login vào tài khoản "dev", và checking chỉ có S3 có permission https://168146697673.signin.aws.amazon.com/console

### 3.2. Giới hạn IP truy cập cho tài khoản IAM User
- Kịch bản demo: tài khoản IAM User "dev" chỉ có có permission vào S3, khi được truy cập (đăng nhập) từ địa chỉ IP public là 42.116.14.7 , 42.116.14.8. Ngược lại, các IP không nằm trong white list sẽ bị denied 
- Hướng thực hiện: mình sẽ tạo 1 Policy là "OnlyAccessFromMyIP" chỉ được access từ IP của mình, sau đó attach policy này vào User "dev"
- Step by step 
    - Create [policy](https://console.aws.amazon.com/iam/home?region=us-east-2#/policies) 
     ![Image](https://tungexplorer.s3.ap-southeast-1.amazonaws.com/aws/Lab_ELB/image/Policy1.png)
    - Sử dụng Json để define policy OnlyAccessFromMyIP và khởi tạo
    ![Image](https://tungexplorer.s3.ap-southeast-1.amazonaws.com/aws/Lab_ELB/image/Policy2.png)
    ![Image](https://tungexplorer.s3.ap-southeast-1.amazonaws.com/aws/Lab_ELB/image/Policy3.png)
    - Attach policy OnlyAccessFromMyIP vào IAM User "dev" 
    ![Image](https://tungexplorer.s3.ap-southeast-1.amazonaws.com/aws/Lab_ELB/image/Policy4.png)
    ![Image](https://tungexplorer.s3.ap-southeast-1.amazonaws.com/aws/Lab_ELB/image/Policy5.png)
    - Thử nghiệm lại bằng cách sử dụng 1 địa chỉ IP public không nằm trong white list, khi access vào S3 sẽ thấy thông báo Denied 

## 4. Set giới hạn budget cho tài khoản
Service của AWS mà mình mong muốn là: mình có thể set giới hạn budget cho tài khoản "dev". Ví dụ tài khoản "dev" chỉ được tiêu hết $50, và khi hết con số này, thì toàn bộ các service của "dev" sẽ bị shutdown/terminate 

Sau vài ngày tìm hiểu, thì mình không tìm thấy được service này của AWS. 
Mình tìm thấy 1 topic đã cũ, có nhiều người yêu cầu AWS mở service này, nhưng chưa có 
https://forums.aws.amazon.com/thread.jspa?threadID=58127&fbclid=IwAR0KwsyJVn3rZ2CPTeTB4R_GjO4cN_4MipphC3_-R7ntr4_eAoWF4R_wNNs

Có nhiều comment định hướng là sử dụng [CloudWatch](https://us-east-2.console.aws.amazon.com/cloudwatch/home?region=us-east-2) để trigger shutdown các service khác, khi budget vượt mức setup. Tuy nhiên mình đã cố gắng thử nghiệm và kết quả:
- Tạo được ALARM cảnh báo khi budget vượt mức mình config. ALARM có thể gửi email notification về mình, hoặc là các SNS khác. 
- Tạo được Lambda function để shutdown các service (cụ thể là terminate EC2)
- Tuy nhiên Lambda function chỉ trigger chạy theo schedule, cron lịch định kỳ lên sẵn. Còn trigger chạy khi CloudWatch ALARM, thì mình không thể kết nối được. (không tìm được chỗ kết nối này trên AWS console, không tìm thấy 1 bài demo, document nào trên google)
...


=> Vậy có chăng chỉ có cách set cảnh báo khi chi tiêu trên AWS vượt budget, và khi có cảnh báo, thì chạy "cơm" để vào shutdown service?
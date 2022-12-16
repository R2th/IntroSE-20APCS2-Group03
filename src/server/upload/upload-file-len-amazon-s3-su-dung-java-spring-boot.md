# **Giới thiệu**.
Trong bài viết này chúng ta sẽ tìm hiểu cách upload một file lên Amazon S3 Bucket sử dụng Spring boot.
Như các bạn đã biết hầu hết các ứng dụng mobile hay web đều có các tính năng tải lên các file ví dụ như hình ảnh video, v.v. Vì vậy với tư cách là lập trình viên bạn nên chọn cách tốt nhất để lữu trữ và nới lưu trữ các file này. Có nhiều cách khác nhau để giải quyết :
*  Lưu trực tiếp trên máy chủ nơi mà ứng dụng được triển khai trên đó
*  Lưu trữ ở database với kiểu binary file
*  sử dụng ở  cloud storages (nơi lưu trữ online)

Trong thực tế hiện này hầu hết các developer sử dụng cách tiếp cận thứ 3 sử dụng **S3 Bucket Service of Amazon**. Và đây là lí do để chứng minh tại sao nó lại phổ biến đến vậy:
* Dễ dàng để viết code tải lên bất kì file nào
* Amazon hỗ trợ hầu hết các ngôn ngữ lập trình
* Bạn có thể xem trực tiếp tất cả các file được tải lên nhờ giao diện web
* Bạn có thể thao tác thủ công như upload/delete file sử dụng giao diện web
#  Bước 1 - Tạo Amazon S3 bucket.
Để bắt đầu sử dụng **S3 Bucket** bạn phải tạo một tài khoản trên [ Amazon website](https://aws.amazon.com/).

Sau khi đã có tài khoản bước tiếp theo bạn sẽ phải tạo S3 Bucket nơi lưu trữ các file được tải lên. Trên thanh menu chọn **Serviees ->S3**

                                     
![](https://images.viblo.asia/16ee7564-2d02-4b30-8df0-7e644a00b728.png)

Sau đó nhấn button **Create bucket**
                          
![](https://images.viblo.asia/eda5b6e6-9012-4530-a641-a8803bba7eba.png)

![](https://images.viblo.asia/32946825-afbd-43b1-a853-e1deb2888b71.png)

Nhập tên bucket (Tên bucket là unique) và chọn khu vực gần bạn nhất. Nhấn button  **Create**

> 
Lưu ý: Amazon sẽ cũng cấp cho bạn 5GB miễn phí mỗi năm để bạn lưu trữ. Nếu bạn sử dụng quá 5GB mỗi năm bạn sẽ phải trả phí
> 

Hiện tại buket của bạn đã được tạo nhưng bạn sẽ phải cung cấp quyền để user truy cập bucket này. Nó không được bảo mật khi bạn cung cấp khóa truy cập của user root của bạn cho người khác vì thế bạn cần tạo mới **IAM use** user này chỉ có quyền sử dụng S3 Bucket

```
Định danh AWS và Quản lý quyền truy cập (IAM) là một dịch vụ web giúp bạn kiểm soát truy cập an toàn vào các tài nguyên AWS
```

Bây giờ hãy tạo user . Chọn  **Services -> IAM**. Trên khung điều hướng bên trái chọn **User** sau đó chọn **Add user**.
![](https://images.viblo.asia/8275073a-c0ca-4bf3-b3d9-1f4b9f7000d3.jpg)


Nhập user name và tích vào check box **Accesss type 'Programmatic access'**. Nhấn button next.

![](https://images.viblo.asia/a0ff7436-6c85-46e0-b92c-9c738d5d50b6.jpg)

Bạn phải thêm quyền cho user vừa tạo. Nhấn '**Attach existing policy directly**', Trên ô tìm kiếm nhập 's3' trong tất cả các kết quả được tìm kiếm chọn **AmazonS3FullAccess**
![](https://images.viblo.asia/2f8d9815-5560-46d9-8b5d-24ff8519118f.png)

Sau đó nhấn next và **Create User** bạn sẽ nhìn thấy    **Access key ID** and **Secret access key** sẽ sử dụng trong phần tiếp theo. 
Đến đây việc cấu hình S3 Bucket  đã hoàn tất. Chúng ta đi đến phần tiếp theo viết code để upload file lên buket s3 vừa tạo nhé
#  Bước 2 - Viết Code upload file lên S3 Buket.
Hãy tạo project Spring Boot và thêm amazon dependency vào file pom.xml

```<div>
<dependency>
       <groupId>com.amazonaws</groupId>
       <artifactId>aws-java-sdk</artifactId>
       <version>1.11.133</version>
</dependency>
 ```
 
Sau đó thêm các thuộc tính s3 bucket bạn vừa tạo bên trên vào file application.yml

```<div> 
   amazonProperties:
      endpointUrl: https://s3.us-east-2.amazonaws.com
      accessKey: XXXXXXXXXXXXXXXXX 
      secretKey: XXXXXXXXXXXXXXXXXXXXXXXXXX
      bucketName: your-bucket-name
```

Tạo class AmazonClient 

```
@Service
public class AmazonClient {

    private AmazonS3 s3client;

    @Value("${amazonProperties.endpointUrl}")
    private String endpointUrl;
    @Value("${amazonProperties.bucketName}")
    private String bucketName;
    @Value("${amazonProperties.accessKey}")
    private String accessKey;
    @Value("${amazonProperties.secretKey}")
    private String secretKey;
    
    @PostConstruct
    private void initializeAmazon() {
       AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
       this.s3client = new AmazonS3Client(credentials);
}
}
```

**AmazonS3**  là một class từ thư viện amazon. Tất cả các trường còn lại là các thông tin của AWS S3 bucket được khai báo trong file application.yml. Anotation  @**Value**  sẽ đọc các giá trị từ file application.yml

**initializeAmazon()** là một phương thức  để đặt thông tin đăng nhập amazon cho ứng dụng của chúng ta. Anotation @**PostConstruct**  để chạy phương thức này sau khi hàm tạo sẽ được gọi bởi vì các trường được đánh dấu với @**Value** có giá trị null trong hàm tạo

Phương thức upload file lên S3 bucket yêu cầu một tham số kiểu **File**, nhưng dữ liệu truyền lên của chúng ta sẽ có kiểu **MultipartFile** . Chúng ta sẽ cần thêm một phương thức để convert MultipartFile -> file
```
private File convertMultiPartToFile(MultipartFile file) throws IOException {
    File convFile = new File(file.getOriginalFilename());
    FileOutputStream fos = new FileOutputStream(convFile);
    fos.write(file.getBytes());
    fos.close();
    return convFile;
}
```

Ngoài ra bạn cũng có thể upload một file nhiều lần vì thế chúng ta tạo ra một tên duy nhất cho mỗi lần upload. Sử dụng timestamp  để đánh dấu  và thay thế khoảng trắng trong filename bằng underscores để tránh các vấn đề xảy ra trong tương lai
```
private String generateFileName(MultipartFile multiPart) {
    return new Date().getTime() + "-" + multiPart.getOriginalFilename().replace(" ", "_");
}
```

Tiếp theo thêm phương thức uploadFileTos3bucket có chức năng upload file lên S3 bucket
```
private void uploadFileTos3bucket(String fileName, File file) {
    s3client.putObject(new PutObjectRequest(bucketName, fileName, file)
            .withCannedAcl(CannedAccessControlList.PublicRead));
}
```
Trong phương thức này chúng ta đã thêm quyền **PublicRead** . Nó có nghĩa bất kì ai nếu có đường dẫn của file là có thể truy cập file đó. Thuộc tính này thường chỉ áp dụng cho file ảnh

Cuối cùng chúng ta sẽ kết hợp các phương thức vừa tạo ở trên để tạo ra một service sẽ được gọi từ controller. Phương thức này sẽ lưu file lên s3 bucket và trả về đường dẫn của file vừa được tải lên bạn có thể lưu trữ vào database

```
public String uploadFile(MultipartFile multipartFile) {

    String fileUrl = "";
    try {
        File file = convertMultiPartToFile(multipartFile);
        String fileName = generateFileName(multipartFile);
        fileUrl = endpointUrl + "/" + bucketName + "/" + fileName;
        uploadFileTos3bucket(fileName, file);
        file.delete();
    } catch (Exception e) {
       e.printStackTrace();
    }
    return fileUrl;
}
```

Tiếp theo chúng ta tạo BucketController.class
```
@RestController
@RequestMapping("/api/storage/")
public class BucketController {

    private AmazonClient amazonClient;

    @Autowired
    BucketController(AmazonClient amazonClient) {
        this.amazonClient = amazonClient;
    }

    @PostMapping("/uploadFile")
    public String uploadFile(@RequestPart(value = "file") MultipartFile file) {
        return this.amazonClient.uploadFile(file);
    }
}
```

Phương thức uploadFile nhận 1 tham số MultipartFile. Đến đây đã xong phần code chúng ta cùng đi đến phần test 
Tạo một request sử dụng Postman bạn chọn phương thức **POST** trong **BODY**  chọn **form-data** nhập 1 key **file** và chọn giá kiểu giá trị **File** và chọn 1 file bất kì từ PC của bạn
![](https://images.viblo.asia/636de443-457e-4865-a6c3-df08a99d307d.PNG)

Bạn truy cập vào bucket s3 của bạn sẽ nhìn thấy ảnh đã được tải lên
![](https://images.viblo.asia/228d67bb-8a64-4b02-b6e4-4dac62cfe996.PNG)



Bài viết đến đây là kết thúc. Hy vọng bài viết này hữu ích cho bạn. Nếu bạn có bất kỳ câu hỏi xin vui lòng để lại nhận xét bên dưới bài viết này nhé. Cảm ơn bạn đã đọc bài viết này
**Tài liệu tham khảo** ở https://medium.com/oril/uploading-files-to-aws-s3-bucket-using-spring-boot-483fcb6f8646
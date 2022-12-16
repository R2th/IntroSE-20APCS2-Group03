# 1. Tạo tài khoản AWS
Trước khi bắt đầu thì phải tạo tài khoản AWS, mọi người tự search bác gg để tạo tài khoản nhé.

Sau khi có tài khoản thì lấy được accessKey & secretKey, thêm config vào file application.yml

```
cloud:
  aws:
    credentials:
      access-key: xxx
      secret-key: xxx
    region:
      static: us-east-2
    stack:
      auto: false
```
# 2. Gradle dependencies

```
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'

    implementation group: 'org.springframework.cloud', name: 'spring-cloud-starter-aws', version: '2.2.5.RELEASE'
    implementation group: 'org.apache.tika', name: 'tika-core', version: '2.3.0'
}
```

# 3. Config Amazon S3
Chúng ta cần tạo connection để truy cập được vào amazon S3, sử dụng interface AmazonS3

```
AWSCredentials credentials = new BasicAWSCredentials(accessKey, accessSecret);
AmazonS3 amazonS3 = AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(region)
                .build(); 
```

# 4. Tạo bucket
Có 2 cách tạo bucket: thao tác tay tạo trực tiếp bucket trong account của mình & tạo bằng code;

### 4.1. Tạo bằng tay
Chọn service S3, vào bucket, click generate bucket. sau khi tạo thành công thì sẽ được bucket như thế này

![image.png](https://images.viblo.asia/6f36e9a5-3229-4020-81ee-29098fc6b521.png)

### 4.2. Tạo bằng code
Nếu tạo bằng code thì bạn cần biết 1 số quy định về bucket name, tham khảo trong docs của amazon nhé

https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html

Lưu ý bucket name là duy nhất trong toàn bộ amazon S3,  cho nên trước khi tạo thì phải check xem bucket name này đã tồn tại hay chưa nhé.

```
public Bucket createBucket(String bucketName){
        if(s3Client.doesBucketExistV2(bucketName)){
            return null;
        }
        else return s3Client.createBucket(bucketName);
    }
```

# 5. Upload
Khi upload 1 file lên Amazon S3, S3 sẽ lưu trữ file như là 1 S3 object. Object bao gồm file data và metadata.

Ở đây mình sẽ sử dụng PutObjectRequest để tạo request cho S3 put object lên.

1. bucketName: tên của bucket mà ta cần upload file
2. key
3. input: stream data của file
4. metadata: Object metadata, chỉ rõ content length của stream data của file đó

```
public PutObjectRequest(String bucketName, String key, InputStream input, ObjectMetadata metadata)
```

ObjectMetadata mình sẽ set 2 giá trị contentType và contentLength. 
* setContentLength(): size của file (byte)
* setContentType: contentType theo tiêu chuẩn MIME type, những MIME type khá phổ biến như application/json, application/x-www-form-urlencoded, ... Bạn có thể tham khảo thêm đầy đủ hơn để hiểu MIME type là gì https://wiki.tino.org/mime-type-la-gi/. Mình sẽ sử dụng Tika để detect file type.

Thêm depedency của Tika 

`
implementation group: 'org.apache.tika', name: 'tika-core', version: '2.3.0'
`

```
private final Tika tika = new Tika();
```
```
ObjectMetadata objectMetadata = new ObjectMetadata();
objectMetadata.setContentLength(file.getSize());
objectMetadata.setContentType(tika.detect(file.getOriginalFilename()));

InputStream stream = file.getInputStream();
PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, key, stream, objectMetadata);
PutObjectResult putObjectResult = s3Client.putObject(putObjectRequest);
```

Mình tạo 1 class FileMetadata để lấy được nhiều thuộc tính của file hơn

```
public class FileMetadata implements Serializable {
    private String bucket;
    private String key;
    private String name;
    private String mime;
    private String hash;
    private String etag;
    private Long size;
    private String extension;
    private String url;
    private Boolean publicAccess = false;
}
```
Code service đầy đủ như sau
```
public class StorageService {
    private final AmazonS3 s3Client;
    private final Tika tika = new Tika();

    @Value("${application.bucket.name}")
    private String bucketName;

    public List<FileMetadata> createAttachment(List<MultipartFile> files) {
        List<FileMetadata> attachments = files.stream()
                .map(file -> {
                    String fileKey = "uploadFile-" + file.getOriginalFilename();
                    FileMetadata metadata = put(bucketName, fileKey, file, true);
                    return metadata;
                })
                .collect(Collectors.toList());
        return attachments;
    }
    public FileMetadata put(String bucket, String key, MultipartFile file, Boolean publicAccess) {
        FileMetadata metadata = FileMetadata.builder()
                .bucket(bucket)
                .key(key)
                .name(file.getOriginalFilename())
                .extension(StringUtils.getFilenameExtension(file.getOriginalFilename()))
                .mime(tika.detect(file.getOriginalFilename()))
                .size(file.getSize())
                .build();

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(metadata.getSize());
        objectMetadata.setContentType(metadata.getMime());

        try {
            InputStream stream = file.getInputStream();
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, key, stream, objectMetadata);
            PutObjectResult putObjectResult = s3Client.putObject(putObjectRequest);
            metadata.setUrl(s3Client.getUrl(bucket, key).toString());
            metadata.setHash(putObjectResult.getContentMd5());
            metadata.setEtag(putObjectResult.getETag());
            metadata.setPublicAccess(publicAccess);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return metadata;
    }
}
```

Controller cho upload

```
@RestController
@RequestMapping("/storages")
public class StorageController {

    @Autowired
    private StorageService service;

    @PostMapping()
    public ResponseEntity<List<FileMetadata>> createAttachments(@RequestPart(value = "attachments") List<MultipartFile> files) {
        return new ResponseEntity<>(service.createAttachment(files), HttpStatus.OK);
    }
}
```

Test api bằng postman được kết quả như này

![image.png](https://images.viblo.asia/e18595cd-f30b-48fe-b0d5-686fd2389909.png)

Cuối cùng bạn check trên S3 thấy file đã upload lên là thành công rồi nhé.

Bạn có thể nhìn full code trên link github: https://github.com/phuonganh1992/spring-upload-amazonS3
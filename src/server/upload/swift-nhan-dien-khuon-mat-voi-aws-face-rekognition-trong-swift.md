# I. Giới thiệu
Hôm nay mình sẽ hướng dẫn các bạn làm 1 app nhận diện khuôn mặt bằng service Face Rekognition của Amazone. Đây là 1 service có tính phí của Amazone, trung bình 0.3$ cho 1000 ảnh request tùy theo region bạn chọn. Tuy nhiên nếu tài khoản của bạn mới được register thì bạn sẽ được trải nhiệm dịch vụ này free trong 1 năm với giới hạn 1000 request/ 1 ngày.
# II. Tiến hành
## 1. Cấu hình AWS
Để cấu hình tài khoản aws có thể sử dụng face rekognition bạn cần làm theo các bước sau:
- Signup 1 tài khoản aws free
- Tạo 1 IAM user tham khảo https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html
- Thêm các roles cần thiết cho IAM : AmazonRekognitionFullAccess, AmazonS3ReadOnlyAccess. Bạn có thể tham khảo tại đường dẫn sau https://docs.aws.amazon.com/rekognition/latest/dg/setting-up.html

Sau khi cấu hình xong bạn cần lưu các thông tin accessKey và secretKey của tài khoản IAM đó để dùng config trong project sau này.
![](https://images.viblo.asia/aee18b22-54f6-4a8a-89ec-97e4712a6008.png)
![](https://images.viblo.asia/626282a5-5977-424d-996e-c3bfd6fa0d80.png)

## 2. Setup Project
Sử dụng cocoapod để import 'AWSRekognition'
Nếu bạn chưa install cocoapod có thể tham khảo đây : https://cocoapods.org/
- Mở terminal gõ lệnh ```cd YourProject_path```
- ```pod init```
- ```open Podfile```
- Thêm vào Podfile dòng sau : pod 'AWSRekognition'
- ```pod install```

![](https://images.viblo.asia/99318f3c-ec3d-4d80-b4e0-a4335b88626f.png)

Trong function didFinishLaunchingWithOptions của file Appdelegate.swift thêm vào đoạn code sau:
```
// config AWS
        let credentialsProvider = AWSStaticCredentialsProvider(accessKey:"your_access_key", secretKey:"your_secrect_key")
        let configuration = AWSServiceConfiguration(region: AWSRegionType.USWest2,credentialsProvider: credentialsProvider)
        AWSServiceManager.default().defaultServiceConfiguration = configuration
```

Trong đó your_access_key và your_secrect_key được thay thế bằng accessKey và secretKey bạn đã tạo ra ở phần 1.
Trước đó bạn cần import 2 thư viện AWSCore và AWSRekognition để code không bị lỗi.

## 3. Test recognition face.
Để có thể nhận diện được khuôn mặt trước hết bạn cần tạo 1 collection để lưu trữ tất cả các hình ảnh training cho các user.
```
 let rekognitionClient = AWSRekognition.default()
        guard let request = AWSRekognitionCreateCollectionRequest() else
        {
            puts("Unable to initialize AWSRekognitionCreateCollectionRequest.")
            return
        }
        
            request.collectionId = "Collection_ID"
            
            rekognitionClient.createCollection(request, completionHandler: { (response, error) in
                
                if error == nil
                {
                    print(response!)
                   
                } else {
                  
                    print("\(error!.localizedDescription)")
                }
            })
  ```
  
  Khi tạo Collection xong thì bạn có thể thêm các face vào collection : 
  
  ```
   guard let request = AWSRekognitionIndexFacesRequest() else
            {
                puts("Unable to initialize AWSRekognitionindexFaceRequest.")
                return
            }
            request.collectionId = "Collection_ID"
            request.detectionAttributes = ["ALL"]
            request.externalImageId = "face_ID"
            let image = AWSRekognitionImage()
            image!.bytes = UIImage(named: "Test.png")
            request.image = image
            rekognitionClient.indexFaces(request) { (response:AWSRekognitionIndexFacesResponse?, error:Error?) in
                
                if error == nil
                {
                    print("Success")
               } else {
                   print("Failed")
               }
               }
```

Mỗi user bạn nên đẩy tối thiểu 5 image lên và đều có cùng externalImageId ứng với user đó. Để độ chính xác cao nhất thì số lượng yêu cầu là 25 image.

Sau khi tạo user xong bạn có thể recognition face bằng api searchFaceByImage :

```
guard let request = AWSRekognitionSearchFacesByImageRequest() else
        {
            puts("Unable to initialize AWSRekognitionSearchfacerequest.")
            return
        }
        
        ProgressHUD.show()
        
        request.collectionId = "collection_Id"
        request.faceMatchThreshold = 75
        request.maxFaces = 1
        let image = AWSRekognitionImage()
        image!.bytes = UIImage(named: "Test2.png")
        request.image = image
        rekognitionClient.searchFaces(byImage:request) { (response:AWSRekognitionSearchFacesByImageResponse?, error:Error?) in
            if error == nil
            {
                print("Success")
            } else {
                print("Failed")
            }
            }
```

# III. Tổng kết
AWS face rekognition là một service giải pháp khá hay cho bài toán nhận diện khuôn mặt. Độ chính xác của service này đạt 99%. Một lưu ý là để tốc độ nhận diện nhanh bạn nên resize các bức ảnh gửi lên về 1 size chuẩn nhất cho việc nhận diện. Nhước điểm của service này chính là giá cả, bạn sẽ chỉ được sử dụng free trong 1 năm với giới hạn 1000 request 1 ngày, sau 1 năm đó tài khoản của bạn sẽ bị tính phí với giá trung bình 0.3$/1000 request.

Trên đây là toàn bộ hiểu biết của mình về AWS face rekognition. Hy vọng bài viết đem lại cho các bạn những kiến thức bổ ích. Thank you for watching!
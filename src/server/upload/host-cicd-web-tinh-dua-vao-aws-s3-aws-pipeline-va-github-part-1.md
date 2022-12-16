Trong bài này, chúng ta sẽ tiến hành tìm hiểu về một số dịch vụ của AWS và thực nghiệm chạy một host web tĩnh với CI/CD code pipeline.

Tóm tắt một số dịch vụ của AWS được sử dụng trong bài viết này:
## Nghiên cứu một số dịch vụ AWS liên quan 
### Amazon S3
**Amazon Simple Storage Service (Amazon S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance**

[Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) là một dịch vụ lưu trữ đối tượng, cung cấp khả năng mở rộng cho tất yếu, dữ liệu khả dụng, an toàn và hiệu quả.

Một số điểm lưu ý:

* S3 Security
    1. IAM policies 
    2. Bucket Policies (Grant public access to the bucket)

### Pipeline

**AWS CodePipeline visualize and automate the different stages of your software release process**

AWS CodePipeline trực quan hóa và tự động hóa các giai đoạn khác nhau của quy trình phát hành phần mềm của bạn

### Gitthub
[GitHub](https://vi.wikipedia.org/wiki/GitHub) là một dịch vụ cung cấp kho lưu trữ mã nguồn Git dựa trên nền web cho các dự án phát triển phần mềm

## Tóm tắt
(S3) 
* Create new bucket (tạo bucket mới)
* Enable static host website
* Add S3 policy to grant public host website

(Pipeline)
* Create new pipeline
* Connect to github account
* Select repo and branch

(Gitthub)
* Upload static source code and push to repo

(CICD) 
* Code and push to github and pipeline to goding to redeploy the code

(Clear up)
* Empty bucket and delete each bucket 
* Delete Pipelines
* Delete exits policy and role releated to pipeline

## Quá trình thực hành
### Tạo bucket mới trong Amazon S3.
![image.png](https://images.viblo.asia/ca36822a-ea8f-4e86-b36c-5f19ec519266.png)
![image.png](https://images.viblo.asia/42849551-6b9f-403a-b077-fc1efcc6182b.png)

### Enable Static website hosting
- Nhập file index.html và error.html vào mục Index Document và nhấn Save.
![image.png](https://images.viblo.asia/2a35e878-c9cb-4fde-abe6-fd2576b102bf.png)

### Tạo S3 Policy để public static web


|Trường| Giá trị|
| -------- | -------- | 
| Select Type of Policy     | S3 Bucket Policy     |
| Principal    | *   |
| AWS Service    | Amazon S3     |
| Actions    | Get Object     |
| Amazon Resource Name    | <arn>/*    |

* Vào trang  https://awspolicygen.s3.amazonaws.com/policygen.html và điền các thông tin để tạo policy, sẽ được tạo được tập tin JSON mô tả các thuộc tính của policy.

### Dán vào bucket policy và lưu lại

![image.png](https://images.viblo.asia/d817d234-0423-491f-8a2e-571a050935fa.png)
    

###  Kiểm tra url lại lần nữa, ta thấy host đã được công khai
    
    
  ![image.png](https://images.viblo.asia/7ddb8e8f-ace8-43cd-a0bf-8062a82c0bd8.png)
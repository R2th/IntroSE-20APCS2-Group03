Ở [part 1](https://viblo.asia/p/host-cicd-web-tinh-dua-vao-aws-s3-aws-pipeline-va-github-part-1-bWrZnoGnlxw), chúng ta đã tìm hiểu về cách host static website bằng Amazon S3, ở bài này chúng ta sẽ tiến hành tạo pipeline và tiến hành liên kết với Github, chạy CI/CD, etc,...

### Tạo code pipeline mới
![image.png](https://images.viblo.asia/00f91621-184c-4f9b-bdbc-dc8343b1331f.png)

### Chọn Github version

![image.png](https://images.viblo.asia/5db619b3-c571-4a10-8351-75683eeaad77.png)

### Liên kết với Github

![image.png](https://images.viblo.asia/5ee7bdd9-0b3e-4db8-b50c-5225fe827a8d.png)
![image.png](https://images.viblo.asia/a71a7ee2-2a1d-4fee-af87-81cce2590056.png)

### Chọn repo và branch và click Next.

![image.png](https://images.viblo.asia/9bb55b6c-e4c6-4157-996e-e502a78d92db.png)

* Vì là static web nên chúng ta bỏ qua bước build, chọn Skip build stage -> Skip
![image.png](https://images.viblo.asia/9df748c6-5a65-468e-afd7-ebb55ee93e89.png)

### Thêm deploy và click next

![image.png](https://images.viblo.asia/05009829-a963-49ae-a531-9521ff214421.png)

* Xác nhận lại lần nữa và bấm vào "Create Pipeline"

* Chúng ta có thể xác nhận việc source và deploy
![image.png](https://images.viblo.asia/01a84772-2680-4f07-b7c0-299fdf9f10e8.png)

![image.png](https://images.viblo.asia/088dc597-c646-4c0f-ba25-3c7da009ca39.png)

### Tiến hành kiểm trả lại host, quay lại Bucket, và tìm đến file index.html

![image.png](https://images.viblo.asia/7d393b10-f58b-471b-8f01-74c9213273ef.png)

![image.png](https://images.viblo.asia/536cc827-73dc-4eec-b56a-7a65ba4f2571.png)

### Tips
Kiểm tra CI/CD bằng các chỉnh sửa lại source code trong github, Pipeline sẽ tự động deloy lại lần nữa.

### Clean up 
* Empty bucket and delete each bucket -> Làm rỗng bucket và xóa mỗi bucket
* Delete Pipelines -> Xóa pipeline
* Delete exits policy and role releated to pipeline -> Trong IAM, Xóa policy và liên quan đến pipeline
![](https://www.univention.com/wp-content/uploads/2018/03/drive-erasure-01-591x415.png)
### Minio là gì ?
Đây là định nghĩa ở trang chủ của minio:
> Minio is a high performance distributed object storage server, designed for large-scale private cloud infrastructure.

Ngắn gọn mà nói thì câu trả lời là: **Nó giống như dịch vụ AWS S3, nhưng được host local**.

Minio là một object storage server được implement những public API giống như AWS S3. Điều đó có nghĩa là những ứng dụng có thể config để giao tiếp với Minio thì cũng có thể giao tiếp với AWS S3. Là một server lưu trữ object nên có thể được sử dụng để lưu trữ những unstructured data như ảnh, video, log files, backups và container/VM images. Dung lượng của 1 object có thể dao động từ một vài KB tới tối đa là 5TB. File cũng được gom lại trong 1 buckets, nó là được chỉ cùng với access key khi dùng app. Đây là giao diện của minio:
![](https://www.univention.de/wp-content/uploads/2018/03/Minio-Screenshot-1-Minio-Browser.jpeg)

### Xử lý khối lượng lớn dự liệu
Giả sử bạn phải lưu trữ một khối dữ liệu, bạn không muốn những dữ liệu này (ảnh, mailboxes,...) lưu trữ trên cùng một app. Sẽ là một vấn đề lớn nếu lưu trữ ở cùng một server vì lượng dữ liệu này khá lớn, ví dụ như mailboxes chúng ta cần dung lượng có thể mở rộng và sao lưu được để tránh việc mất dữ liệu.

Minio là công cụ tốt để handle những điều trên. Nó tách những dữ liệu lưu trữ khỏi app của bạn và có thể truy cập thông qua HTTP.

### Setup đơn giản
Mặc dù nó được thiết lập đơn thuần chỉ là một thư mục local thông qua S3 API nhưng được config để đề phòng việc disk failures và coruption dữ liệu thông qua hệ thông dữ liệu phân tán giữa nhiều disks và nhiều node được host bởi Minio.

Dưới đây là simple installation:
```
# docker-compose.yml
services:
...
  minio:
    image: minio/minio
    volumes:
      - ./minio-data:/data
    ports:
      - "9000:9000"
    environment:
      MINIO_ACCESS_KEY: "minio"
      MINIO_SECRET_KEY: "123@123"
    command: server /minio-data/data
  minio-bucket:
    image: minio/mc
    depends_on:
      - minio
    entrypoint: >
      /bin/sh -c "
      /usr/bin/mc config host add myminio http://minio:9000 minio 123@123;
      /usr/bin/mc mb myminio/file-storage;
      /usr/bin/mc policy download myminio/file-storage;
      exit 0;
      "
```
Để start minio server chúng ta chạy command: `docker-compose run --rm --service-ports minio`

Rồi truy cập `localhost:9000` sẽ xuất hiện giao diện tương tự như phía trên và với bulket là `file-storage` được tạo sẵn. Done ! So ez :smiley: 

Bởi default thì chúng ta chưa có bulket nào nên mình tạo luôn một bulket có tên là `minio-bulket`.
### Example with Ruby On Rails
Việc setup đơn thuần chỉ có vậy. Tiếp theo config với rails app để test

Như nói ở trên, chúng ta thao tác như với API của AWS S3 nên cần thêm sdk:
```
gem "aws-sdk", "~> 3"
```

Tiếp theo thêm config để nhận giao tiếp với minio server:
```
# config/initializers/aws.rb
require "aws-sdk"

Aws.config.update({
  region: "us-east-1",
  endpoint: "http://127.0.0.1:9000",
  force_path_style: true,
  credentials: Aws::Credentials.new("minio", "123@123")
})
```
Ok rồi, giờ thì vào controller để test thử upload file:
```
class UploadsController < ApplicationController
  require "aws-sdk"
  
  def index
    @uploads = Upload.all
  end
  
  def new
  end

  def create   
    # Create a new s3 resource with a new s3 client.
    s3 = Aws::S3::Resource.new  
    
    # Create key
    File.basename file.path

    # Set the bucket and the key.
    object = s3.bucket("file-storage").object(file.original_filename)

    # Upload the file.
    object.upload_file(params[:file].open)

    # Save the uploaded details to the local database.
    @upload = Upload.new(
      url: object.public_url,
      name: object.key
    )     

    if @upload.save
      redirect_to uploads_path, success: 'File successfully uploaded'
    else
      flash.now[:notice] = 'An error occurs'
      render :new
    end
  end
end
```
Tiếp đến là tạo một views upload đơn giản rồi chạy `rails s` và xem kết quả :smiley: Happy coding !
### References
[Minio](https://www.minio.io/)

[Minio Repo](https://github.com/minio/minio)
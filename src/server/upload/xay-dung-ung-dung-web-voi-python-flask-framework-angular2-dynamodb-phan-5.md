Quay trở lại với chuổi bài viết này, trước khi thực hiện việc thiết lập và kết nối project của chúng  ta với DynamoDB thì mình xin dành riêng 1 bài viết này để giới thiệu sơ qua về DynamoDB và cách cài đặt nó.

## 1. AWS Dynamo
![](https://images.viblo.asia/00a3824f-1d7d-4a70-860a-3b29f043b1b1.png)

* DynamoDB là môt dịch vụ của **Amazon Web Services(AWS)** được ra mắt vào tháng 9 năm 2013. DynamoDB là một cơ sở dữ liệu **NoSQL** có khả năng đáp ứng hiệu suất cao và nhanh kèm theo khả năng mở rộng.

* DynamoDB tự động phân tán dữ liệu và traffic của một bảng ra một số lượng server vừa đủ để có thể xử lý request capacity đặt ra bơi khách hàng và lượng dữ liệu lưu trữ, đồng thời đảm bảo hiệu suất nhanh và đồng nhất. Tất cả dự liệu đều được lưu trữ trên SSD và tự động được sao chép ra các vùng sẵn sằng (Availability Zones) trong một khu vực (Region) để cung cấp độ sẵn sàng cao và độ bền của dữ liệu (high availablity and data durability).


## 2. DynamoDB Local
DynamoDB Local là phiên bản có thể tải xuống của DynamoDB, nó cho phép thực hiện các thao tác với DB mà không cần truy cập dịch vụ DynamoDB của AWS.

DynamoDB Local giúp tiết kiệm thông lượng được cung cấp, lưu trữ dữ liệu và phí truyền dữ liệu. Ngoài ra, DynamoDB Local không cần kết nối internet trong khi nó hoạt động.

## 3. Setup & Run DynamoDB Local
*Ở hướng dẫn cài đặt này được thực hiện trên HĐH Ubuntu 16.04*

* Tạo thư mục để chứa DynamoDB Local
```
mkdir ./dynamolocal
```

* Di chuyển vào thư mục vừa tạo
```
cd ./dynamolocal
```
* Tải xuống file cài đặt (.taz)
```
wget http://dynamodb-local.s3-website-us-west-2.amazonaws.com/dynamodb_local_latest.tar.gz
```
* Giải nén tập tin vừa tải về
```
tar xzf Dynamicodb_local_latest.tar.gz
```
*  Kiểm tra lại danh sách các thư mục và file được giải nén ra chúng ta sẽ thấy được danh sách như hình
![](https://images.viblo.asia/ffe36888-dfb2-4b06-a2de-9987fdd38602.png)

* Xóa file cài đặt sau khi đã cài đặt xong
```
rm -f Dynamicodb_local_latest.tar.gz
```

* Mở file README.txt chúng ta sẽ thấy lệnh để chạy DynamoDB local như sau
```
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar
```
Nếu chạy nó mà xuất hiện lỗi như hình dưới thì do máy của các bạn chưa được cài đặt Java, hãy chạy lệnh ``` sudo apt-get install openjdk-8-jre``` để cài đặt nó.

![](https://images.viblo.asia/771a1890-273b-45e3-9f0f-05af4e63a0f1.png)

Nễu không xuất hiện lỗi thì kết quả sẽ được như hình:

![](https://images.viblo.asia/34981682-7b24-40cc-bd28-f6ca776ffcea.png)

Mở browser bất kỳ và gỏ url `http://localhost:8000/shell/` chúng ta sẽ được kết quả như hình

![](https://images.viblo.asia/be998330-d00d-442d-bf0e-c83ddf9c3a68.png)


Mặc định thì DynamoDB local sẽ chạy ở port 8000, nếu port đó các bạn đã dùng cho một mục đích nào khác thì có thể thay đổi port của DynamoDB local bằng cách thêm option `-port <number of port>` phía sau lệnh chạy.
```
java -Djava.library.path=./DynamoDBLocal_lib-jar DynamoDBLocal.jar -port 1234
```
Để rút gọn lệnh chạy DynamoDB Local chúng ta tiến hành thêm 1 fuction vào file `.bashrc` bằng các lệnh như sau:
* Mở file bashrc
```
nano ~/.bashrc
```
* Thêm đoạn code vào
```
function dynamo_local(){
    cd $HOME/dynamolocal
    java -D"java.library.path"=./DynamoDBLocal_lib -jar DynamoDBLocal.jar
}
```
* Load source 
```
source  ~/.bashrc
```
* Sau đó chỉ cần mở terminal lên và gỏ `dynamo_local` thì DynamoDB Local sẽ được chạy.

## 4. Kết luận
Vậy là mình đã giới thiệu và hướng dẫn cài đặt xong, qua vài viết tiếp theo mình sẽ hướng dẫn cách làm việc với DynamoDB từ Server Python của project này. Hi vọng mọi người sẽ tiếp tục theo dõi.
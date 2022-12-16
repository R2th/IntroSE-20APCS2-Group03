# S3 là gì 
Theo định nghĩa trên trang chủ aws 

Amazon Simple Storage Service (Amazon S3) là một dịch vụ lưu trữ đối tượng cung cấp khả năng thay đổi theo quy mô, tính khả dụng của dữ liệu, bảo mật và hiệu năng hàng đầu trong lĩnh vực.

Điều này có nghĩa là khách hàng thuộc mọi quy mô và lĩnh vực có thể sử dụng dịch vụ này để lưu trữ và bảo vệ bất kỳ lượng dữ liệu nào cho nhiều trường hợp sử dụng khác nhau, chẳng hạn như trang web, ứng dụng di động, sao lưu và khôi phục, lưu trữ, ứng dụng doanh nghiệp, thiết bị IoT và phân tích dữ liệu hớn.

* S3 là một Object-based (cho phép bạn upload files)
* Dung lượng file từ 0 -> 5TB
* Không giới hạn lưu trữ 
* Các file được lưu trữ trong Buckets (Buckets có thể được hiểu như là các folder)
* namespace trên s3 phải là duy nhất (Buckets name phải là uniq trên S3 của bạn)

# S3 là một object-based 
S3 là một object-based gồm có :
* Key: đây là tên của object
* Value: phần chứa dữ liệu (bytes)
* Verions ID
* Metadata 
* Subresource:
* Access controller list (permission , role để access file …)
* Torrent 



# S3 Storage Tier / Classes 
## S3 standard
S3 standard thích hợp cho việc sử dụng trong ứng dụng cloud, websites động, content distrisbution, mobile, gamming app, và phân tích dữ liệu lớn

### Các đặc điểm 
* Độ trễ thấp, thông lượng cao
* Khả năng lưu trữ lâu dài 99.999999999% của object qua nhiều Availability Zone (AZ)
* Designed for 99.99% availability over a given year
* Hỗ trợ SSL cho việc chuyển data và mã hoá data
* S3 Lifecycle management: tự động mirgrate object sang s3 storage class khác 

## Amazon S3 Standard-Infrequent Access (s3-IA)

S3 standard -IA được dùng cho trường hợp mà kiểu data truy cập không thường xuyên nhưng yêu cầu  cập nhanh khi cần thiết
Đặc điểm là chi phí thấp, high performance. Tốt cho việc lưu trữ lâu dài, backups 

## S3 one Zone - IA
S3 One Zone-ID cho kiểu data ít được truy cập nhưng yêu cầu truy cập nhanh khi cần thiết

không giống như S3 Storage class khác lưu data ở nhiều AZs, S3 One-IA lưu data ở một AZ chi phí thấp hơn 20% Standard-IA. 

S3 One Zone-IA là một sự lựa chọn tốt cho việc lưu lưu trữ backups 

## Glacier 
S3 Glacier có cost rất rẻ nhưng chỉ phục vụ cho kiểu lưu trữ

S3 Glacier cung cấp 3 kiểu truy xuất data từ vài phút đến vài tiếng đồng hồ

Bạn có thể upload object trực tiếp lên s3 Glacier hoặc sử dụng S3 Lifecycle để chuyển data giữa các S3 storage class 

![](https://images.viblo.asia/9b87eb6c-bf4b-429e-9825-7d966663cbe0.png)

# S3 Charge
Bạn cần chi trả cho aws phí khi sử dụng S3 trong các trường hợp 
* Lưu trữ
* Request
* Storage management pricing
* Data transfer pricing
* Tranfer Acceleration 
## S3 Transfer Acceleration 
Cho phép việc chuyển file nhanh, dễ dàng , bảo mật giữa các end user và s3 buckets
User sẽ truy cập data trên edge location, còn dữ liệu từ Edge location store trên S3 theo một mạng network đã được tối ưu hoá

![](https://images.viblo.asia/7bb7313d-69e9-48be-abfb-de3d96153d3f.png)

# S3 buckets
Đầu tiên để lưu trữ được file trên s3 là bạn phải tạo một s3 buckets trên một region 

Bucket và object là những resource và Amazon S3 cung cấp các APIs cho phép bạn quản lý chúng

Ví dụ khi bạn tạo một bucket và upload file sử dụng Amazon S3 API, bạn cũng có thể sử dụng Amazon S3 console để thực hiện các tác vụ (xoá, public file …). 

## Tạo một buckets
Mặc định mỗi một tài khoản aws sẽ tạo được 100 buckets. Để tăng buckets bạn phải settings tăng litmit tối đa là 1000 buckets

Đăng nhập vào tài khoản amazon > services > S3 > click create bucket

![](https://images.viblo.asia/cb9f42d8-89ba-4f54-8a1c-cce2008ce947.png)

![](https://images.viblo.asia/a5b1e27e-6d2c-4dd7-ba14-54c99162e3e3.png)

![](https://images.viblo.asia/608a68a8-076c-46bd-a079-f092d581eb52.png)

![](https://images.viblo.asia/e94c340d-57e7-48ee-9f12-267af1400e41.png)

## Upload file 

Tất cả các file upload theo mặc định sẽ được để private

Để public được file thì :

* Buckets phải cho phép public file bên trong 

![](https://images.viblo.asia/f86bd7bf-c156-4804-88e5-a36b73039c46.png)

![](https://images.viblo.asia/05716715-a013-439d-8252-15733d7acf1b.png)

* File object phải được phải public


![](https://images.viblo.asia/8b71df7e-0e17-4f5b-bfdc-b663c2ab8cfc.png)

# Nguồn tham khảo 

https://aws.amazon.com/s3/storage-classes/
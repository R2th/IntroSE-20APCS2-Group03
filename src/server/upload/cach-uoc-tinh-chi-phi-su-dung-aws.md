## Lời nói đầu
Khi sử dụng aws một trong những thứ mà người dùng quan tâm nhất đó là về chi phí sử dụng. Biết được mối quan tâm đó. Hôm nay mình sẽ hướng dẫn các bạn ước tính chi phí dựa trên nhu cầu sử dụng. Ở đây mình sẽ demo qua dịch vụ EC2
## Cách thực hiện
### Nhập các thông tin cần thiết
![](https://images.viblo.asia/2493b368-887a-4044-8030-d8a69e36d920.png)
1. Vào trang [Amazon Web Services Simple Monthly Calculator](https://calculator.s3.amazonaws.com/index.html) 
2. Ở menu phía bên phải các bạn chọn dịch vụ cần sử dụng (ở đây mình chọn EC2)
3. Nếu bạn vẫn còn nằm trong Free Tier thì tick chọn vào mục FREE USAGE TIER, nếu không thì bỏ qua mục này
4. Vì amazon áp mức phí khác nhau cho từng vùng, nên tiếp theo bạn chọn Region sử dụng dịch vụ. Ở đây mình chọn là N. Virginia
5. Tiếp theo ở mục Compute: Amazon EC2 Instances: các bạn hãy điền vào số lượng resource cần dùng và kích cỡ của nó. Ví dụ như hình dưới mình có 3 Instance, 1 Instance t2.medium và 2 cái t2.micro
6. Ở mục Storage: Amazon EBS Volumes 
Chọn kích thước volume của các Instance EC2 của bạn. Các bạn lưu ý là số lượng EBS Volume thường thì sẽ lớn hơn hoặc bằng số lượng Instance EC2, do mỗi Instance phải kết nối với ít nhất một EBS Volumes.
![](https://images.viblo.asia/0a330608-355b-4946-812e-710f190d7a98.png)
7. Ở mục Elastic IP: 
Nhập số lượng ElP dùng trong hệ thống vào. Free Tier cho các bạn dùng miễn phí 5 EP, nên nếu bạn ko dùng quá 5 EIP này thì ko cần phải điền vào mục này.
8. Data Transfer:
Ngoài các loại chi phí kể trên, chi phí dùng cho băng thông cũng là một phần chi phí lớn khi sử dụng aws. Các bạn cần ước lượng mức độ sử dụng của hệ thống để đưa ra con số phù hợp.
Ngoài ra có một điều nữa cần chú ý. Đó là aws áp mức tính giá khác nhau cho Data Tranfer trong nội bộ AWS (giữa EC2 và S3, RDS vvv), và Data transfer giữa AWS và Internet (User tới EC2). Nên các bạn cũng cần chú ý để đưa ra estimate phù hợp với hệ thống của mình.
### Kết quả
Sau khi nhập các thông tin cần thiết như trên, thì mức giá sẽ xuất hiện ở tab **Estimate of your Monthly Bill**  đi kèm với đó là lựa chọn Export ra file CSV, chi tiết giá cho từng dịch vụ, và nếu bạn đã tick vào lựa chọn FREE USAGE TIER thì ở đây sẽ cho biết luôn số tiền hàng tháng bạn sẽ tiết kiệm được khi vẫn đang còn trong Free Tier. Rất chi tiết và cụ thể phải ko nào

## Kết luận
Mình vừa trình bày cách ước tính tính toán chi phí sử dụng aws. Dù nó chỉ là con số ước lượng, không thể chính xác được hoàn toàn, nhưng cũng cung cấp cho các bạn nhưng thông tin cơ sở trước khi quyết định có nên sử dụng aws hay không. Chúc các bạn một ngày vui vẻ.
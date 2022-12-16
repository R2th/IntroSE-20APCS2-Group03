# Bài viết này giới thiệu về cách sử dụng AWS Saving Plans để tiết kiệm chi phí vận hành hệ thống chạy trên EC2

## Tại sao và khi nào nên sử dụng Saving Plans

- Nếu hệ thống chạy liên tục và lâu dài trên EC2, chi phí sử dụng tính theo on-demand sẽ rất cao. AWS đưa ra một số giải pháp để tiết kiệm chi phí như Reserved Instances, Saving Plans, ... . 
- Đối với Reserved Instances thì chúng ta sẽ cần xác định trước khối lượng công việc và loại instance sẽ sử dụng, sau đó thực hiện mua gói. Reserved Instances khá ổn định nhưng không linh hoạt nếu có thay đổi về cấu hình và loại instance đang sử dụng mặc dù AWS đã cập nhật thêm Convertible Reserved Instances. Nếu trong hệ thống sử dụng nhiều loại instance khác nhau, bạn nên chọn Saving Plans.
- Đối với Saving Plans, tuy trong một số trường hợp tỉ lệ % chiết khấu không cao như Reserved Instances nhưng khá linh hoạt trong quá trình sử dụng nếu hệ thống sử dụng nhiều loại instance khác nhau. Các bạn có thể tham khảo bảng so sánh dưới đây :

![](https://images.viblo.asia/90526fca-b885-4eba-a4dd-97042d86296f.png)

## Cách tính toán và sử dụng Saving Plans

##### Ví dụ :

Một hệ thống đang chạy liên tục với nhiều EC2 có bill của một tháng như sau :

![](https://images.viblo.asia/27671a6d-d1d8-44b7-bc52-3ceaf607a9a3.png)

Để mua gói Saving Plans, ta vào tab EC2 - Saving Plans - Purchase Saving Plans :

![](https://images.viblo.asia/38f3aff3-a57e-4002-83ee-229dd9957eaa.png)

Màn hình tính toán của Saving Plans :

![](https://images.viblo.asia/ae09b7ce-339c-42b9-9b29-2894ee5fcaf4.png)

Ở ví dụ này, chúng ta sẽ chọn Compute Saving Plans do hệ thống sử dụng nhiều loại instance khác nhau.

*Term* : Thời gian cam kết sử dụng theo năm (1 năm hoặc 3 năm)

*Hourly Commitment* : Số tiền cam kết sử dụng hàng giờ. Được tính như sau : Tổng các mức giá/loại instance theo giờ được áp dụng khi sử dụng Saving Plans

*Cách tính giá theo giờ nếu sử dụng Saving Plans cho từng loại instance, các bạn tham khảo tại [link](https://aws.amazon.com/savingsplans/compute-pricing/)*

Chi tiết ở ví dụ trên, chúng ta có 1 x *t3.small* + 1 x *t2.small* + 3 x *t3.medium*  :

- Mức giá theo giờ tính theo On-demand : 0.0264 + 0.0292 + 0.0528 x 3 = 0.214 ($)
- Mức giá theo giờ áp dụng Saving Plans : 0.0209 + 0.0191 + 0.0382 x 3 = 0.1546 ($)

Vì vậy Hourly Commitment trong trường hợp này ta điền là 0.1546

*Payment Option* : Trả trước toàn bộ, một phần hoặc không trả trước.

*Purchase summary* : Dự toán chi phí

Vẫn ở ví dụ trên :

Hourly commitment = 0.1546				

Và cam kết sử dụng 24/24 trong 1 năm, tương đương 24 x 365 = 8760 (giờ)				

Tổng chi phí hàng năm là : 0.1546 x 8760 = **1354.30** $				

So sánh khi không dùng Saving plans :				

Hàng năm phải chi trả : 0.214 x 8760 = **1874.64** $				

Như vậy 1 năm dùng Saving plans tiết kiệm được : 1874.64 - 1354.30 = **520.34** ($)

Bill hàng tháng khi sử dụng Saving Plans :

![](https://images.viblo.asia/5fe9cb7a-8aa2-45dc-8590-9b1860d01995.png)

Hoặc chúng ta có thể theo dõi thông qua AWS Cost Management.
<br>

#### Vấn đề phát sinh

Câu hỏi đặt ra là : Nếu trong quá trình sử dụng hệ thống thay đổi cấu hình : tăng hoặc giảm số lượng instance dẫn đến việc *Hourly Commitment* cũng thay đổi theo, vậy Saving Plans sẽ tính như thế nào ?

- Trường hợp tăng : tính phí theo rate On-Demand với mỗi giờ bị dư ra. 
- Trường hợp giảm : vẫn tính phí theo rate Saving plans cho đủ số giờ cam kết.

Vì vậy để có thể tính toán tiết kiệm chi phí nhất, Hourly Commitment nên được set một cách hợp lý. AWS cũng có thể recommend cho chúng ta rate gần chính xác nhất , các bạn tham khảo tại link recomendations ở phần nhập Hourly Commitment tại màn hình tính toán.


### Tổng kết

Saving Plans là giải pháp tiết kiệm chi phí linh hoạt và mang lại rất nhiều lợi ích. Tuy nhiên bạn cần lên kế hoạch cẩn thận tránh sử dụng vượt quá cam kết hoặc sử dụng không hết dẫn đến lãng phí chi phí.
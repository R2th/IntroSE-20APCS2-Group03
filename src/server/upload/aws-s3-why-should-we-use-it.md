## Giới thiệu
Chào các bạn, hôm nay chúng ta sẽ nói về một dịch vụ rất lâu đời rồi của AWS là S3 (Simple Storage Service). Chúng ta sẽ tìm hiểu xem tại sao chúng ta lại nên sử dụng nó, sau đó mình sẽ nói một vài use cases + useful tips trong việc cải thiện performance của S3.

![image.png](https://images.viblo.asia/b7f80f0b-1ab1-441b-8556-b8ff7c89299e.png)

S3 nó là một dịch vụ dùng để lưu trữ của AWS, trước khi tìm hiểu về nó thì chúng ta sẽ xem qua nếu ta dùng hệ thống lưu trữ truyền thống thì ta sẽ gặp vấn đề gì và ta giải quyết nó ra sao. 

## Challenges when storing data
Khi ta làm phát triển một ứng dụng, thì những tài nguyên của ứng dụng như là hình ảnh, video hoặc dữ liệu khách hàng ta đều cần phải lưu trữ lại. Thông thường thì ta sẽ tạo một con máy ảo rồi sau đó dùng nó để lưu trữ dữ liệu, thì đây là cách lưu trữ truyền thống nhất.

Đối với cách lưu trữ truyền thống thì nó sẽ gặp hai thách thức sau đây:
+ Làm sao để tăng kích cỡ của dung lượng lưu trữ nếu dung lượng ổ đĩa của ta đã là tối đa.
+ Làm sao để đáp ứng được tỉ lệ mất dữ liệu nhỏ nhất.

Đối với thách thức đầu tiên thì nếu ta làm ở dưới datacenter thì không đơn giản, ta phải thêm ổ đĩa lớn hơn, rồi mount nó vào, sau đó copy dữ liệu cũ qua.

Đối với thách thức thứ hai thì thường ta sẽ cấu hình backup dữ liệu và chuyển nó qua một con máy ảo khác, nhưng nó cũng không đảm bảo dữ liệu cho ta nếu con máy ảo ta dùng để lưu dữ liệu backup nó cũng chết luôn.

### Distributed data store

Do đó để giải quyết hai vấn đề trên, một giải pháp gọi là distributed data store được sinh ra. Distributed data store là một mạng lưới máy tính (với mỗi máy là một node) nơi dữ liệu của ta sẽ được lưu trữ ở nhiều node khác nhau.

Bằng cách này thì ta có thể lưu trữ gần như không giới hạn vì ta chỉ cần thêm một node mới để tăng dung lượng lưu trữ, và dữ liệu của ta luôn luôn được lưu ở nhiều hơn một node, do đó sẽ làm giảm được tỉ lệ mất dữ liệu nhiều nhất có thể.

Thì AWS cũng có cung cấp cho ta một giải pháp cho distributed data store, và nó được gọi là AWS Simple Storage Service (AWS S3).

## AWS S3
S3 là một dịch vụ lưu trữ dạng distributed data store, và nó rất dễ để sử dụng. Dữ liệu được lưu trong S3 sẽ ở dạng một object, nên nó còn hay được gọi là object store.

![image.png](https://images.viblo.asia/8ca6220d-1f73-499d-8274-d47b7528e2ab.png)

S3 cung cấp cho ta một giải pháp lưu trữ dữ liệu không giới hạn (ta sẽ trả tiền lưu trữ theo từng GB/month), và dữ liệu lưu trong S3 luôn đáp ứng được khả năng highly available và durable (tỉ lệ mất dữ liệu thấp).

Ta có thể lưu trữ rất nhiều dạng dữ liệu khác nhau như là hình, video, json hoặc binary file vào trong S3, miễn là kích cỡ của một file không quá 5 TB. Và những dữ liệu này sẽ được lưu vào trong S3 dưới dạng object store, tiếp theo ta sẽ nói sơ qua về object store là gì.

### S3 object store
Cách cũ nhất để lưu dữ liệu là dạng folders và files, với files sẽ đại điện cho dữ liệu của ta và folders là cách để nhóm nhiều files liên quan lại với nhau.

Còn đối với object store thì dữ liệu được lưu trữ với một cách rất khác biệt, dữ liệu sẽ được lưu trữ như một object và object đó sẽ có 3 thuộc tính sau.
+ Thuộc tính đầu tiên là globally unique identifier (GUID).
+ Thuộc tính tiếp theo là metadata của file.
+ Và cuối cùng là thuộc tính data dùng để lưu dữ liệu.

![image.png](https://images.viblo.asia/156ede54-7b01-45e6-a17b-2dee250f7eed.png)
*<div align="center">Image from [Amazon Web Services in Action, Second Edition](https://www.manning.com/books/amazon-web-services-in-action-second-edition)</div>*

Với GUID là key của object và dùng để định danh cho object đó, tương tự như dường dẫn của file ở trong máy tính vậy.

Trường metadata dùng để lưu các thông tin ngoài lề của dữ liệu đó, như là loại file, kích cỡ file, ngày tạo, ...

Cuối cùng thuộc tính data sẽ được dùng để lưu chính dữ liệu đó.

Và khi ta xài S3, nếu ta muốn upload một file lên trên nó thì trước tiên ta phải tạo một bucket trước.

### S3 bucket
Tương tự như folders dùng để chứa một nhóm files thì bucket dùng để chứa một nhóm object.

Ta cần phải tạo bucket để chứa các object được upload lên trên S3, và tên của mỗi bucket phải là duy nhất trên toàn bộ hệ thống AWS. Vì vậy để tạo bucket thì ta phải chọn tên mà chưa được bất kì account AWS nào sử dụng.

![image.png](https://images.viblo.asia/a3951fc9-11b8-46d2-bd69-550109f0205a.png)

*<div align="center">Image from [Amazon Web Services in Action, Second Edition](https://www.manning.com/books/amazon-web-services-in-action-second-edition)</div>*

## S3 use cases
Dưới đây là một vài use cases phổ biến nhất của S3:
+ Dùng để lưu trữ các dữ liệu của người dùng như hình ảnh, video, documents cho website.
+ Dùng để hosting một trang static website.
+ Backup.
+ Lưu dữ liệu về tài chính dùng cho data lake.

### Storing user-generated content
Ta sẽ dùng S3 làm chỗ lưu trữ các nội dung mà sẽ sử dụng cho website, thay vì phải lưu file lên trên server mà ta chạy ứng dụng. Ta có thể lưu và lấy file từ S3 bằng cách dùng các công cụ như AWS Console, AWS CDK, AWS CLI.

![image.png](https://images.viblo.asia/55e4d2b6-9888-4040-adcd-87e42a1ed731.png)

*<div align="center">Image from [Amazon Web Services in Action, Second Edition](https://www.manning.com/books/amazon-web-services-in-action-second-edition)</div>*

### Hosting static website content
Thông thường để hosting được một trang static website, việc đầu tiên ta cần làm là tạo một con máy ảo, rồi ta phải cài apache hoặc nginx lên nó để hosting website, việc này khá là mất thời gian.

S3 có cung cấp cho ta một tính năng giúp ta hosting một trang static website cực kì nhanh, đây là một tính năng rất hữu ích của S3.

![image.png](https://images.viblo.asia/59cf0900-843e-4c34-94e9-092ed2aa3aff.png)

Để hosting static website lên trên S3, ta chỉ cần làm các bước đơn giản sau đây.

Đầu tiên ta tạo s3 bucket.

```
aws s3 mb s3://hpi-spa
```

Tiếp theo ta upload static file lên trên S3.

```
aws s3 cp index.html s3://hpi-spa/index.html
```

Nếu là một folder thì ta làm như sau.

```
aws s3 cp dist s3://hpi-spa/ --recursive
```

Tiếp đó, ta chạy câu lệnh CLI để cập nhật lại S3 policy cho phép client có thể truy cập được nó.

```
aws s3api put-bucket-policy --bucket hpi-spa --policy file://bucket-policy.json
```

Nội dung file `bucket-policy.json`

```bucket-policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AddPerm",
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::hpi-spa/*"
      ]
    }
  ]
}
```

Cuối cùng, ta bật tính năng static website lên.

```
aws s3 website s3://hpi-spa --index-document index.html
```

Giờ để truy cập được website thì ta sẽ dùng url với định đạng sau.

```
http://<bucket-name>.s3-website-<region>.amazonaws.com
```

URL của bucket hpi-spa.

```
http://hpi-spa.s3-website-us-west-2.amazonaws.com
```

### Backup Data
Đây cũng là một use cases phổ biến của S3, là dùng nó để lưu trữ dữ liệu backup. Vì S3 được thiết kế với độ durability lên tới 99.999999999%, có nghĩa là nếu ta lưu 100,000,000,000 file lên trên S3 thì trong vòng 1 năm ta có thể bị mất chỉ 1 file.

Thông thường ta sẽ tạo cronjob rồi dùng câu lệnh CLI sau để sync dữ liệu từ local lên trên S3.

```
export BACKUP_FOLDER=dist
aws s3 sync $BACKUP_FOLDER s3://hpi-backup/dist
```

Sau đó, nếu ta muốn restore lại dữ liệu ta chỉ cần copy dữ liệu từ S3 về máy của ta.

```
export LOCAL_PATH=restore
aws s3 cp --recursive s3://hpi-backup/dist $LOCAL_PATH
```

## S3 Glacier
Nếu mà ta muốn lưu trữ một lượng dữ liệu backup cực kì lớn, thì ta nên sử dụng S3 Glacier. S3 có rất nhiều kiểu Storage Class khác nhau và S3 Storage Class Glacier được thiết kế cho việc lưu trữ archive data, vì giá tiền lưu trữ của Glacier sẽ rẻ hơn rất nhiều so với S3 standard.

![image.png](https://images.viblo.asia/f6e03776-c026-43e1-b931-1b4919fa8d04.png)

*<div align="center">Image from [Amazon Web Services in Action, Second Edition](https://www.manning.com/books/amazon-web-services-in-action-second-edition)</div>*

S3 Glacier sẽ có 3 dạng sau với từng dạng sẽ phù hợp cho những mục đích khác nhau của ta:
+ S3 Glacier Instant Retrieval storage
+ S3 Glacier Flexible Retrieval
+ S3 Glacier Deep Archive

### S3 Glacier Instant Retrieval storage
S3 Glacier Instant Retrieval thường được sử dụng cho những archive data mà ta cần truy cập ngay lập tức sau khi ta chuyển nó thành dạng Glacier, như là images và media. S3 Glacier Instant Retrieval cung cấp giá lưu trữ rẻ hơn so với S3 thông thường.

### S3 Glacier Flexible Retrieval
S3 Glacier Flexible Retrieval thường được dùng cho những archive data mà sau khi ta chuyển nó sang Glacier ta không cần phải truy cập nó ngay lập tức, mà ta có thể đợi một khoảng thời gian để chuyển nó từ dạng Glacier về thuông thường, khoảng thời gian này có thể từ 1 phút tới vài tiếng.

S3 Glacier Flexible Retrieval cung cấp cho ta 3 lựa chọn sau để lấy lại dữ liệu từ dạng Glacier:
+ Expedited retrievals: 1–5 phút.
+ Standard retrievals: 3–5 tiếng.
+ Free bulk retrievals: 5–12 tiếng.

Tất nhiên thì thời gian lấy lại càng ít thì càng tốn tiền.

### S3 Glacier Deep Archive
S3 Glacier Deep Archive thì cũng giống với S3 Glacier Flexible Retrieval nhưng giá của nó sẽ rẻ hơn, tuy nhiên thời gian chuyển dữ liệu từ dạng Glacier về bình thường rất lâu, từ 12 - 48 tiếng.

## Performance tips
Một số tips để tăng hiệu xuất của ứng dụng dùng chung với S3.

### Caching static website with CDN
Thay vì truy cập static website với URL của S3, thì ta có thể cache content đó lại bằng cách dùng CDN, giúp tăng tốc độ tải trang tới người dùng. Dịch vụ CDN của AWS tên là CloudFront.

![](https://images.viblo.asia/b0680816-2fa9-41b6-96ff-76a58535cb8a.png)

### Choosing the right keys
Trong S3 thì object sẽ được lưu trữ theo thứ tự alphabetical của key, và key sẽ được dùng để S3 xác định object đó được lưu ở partition nào. Một điểm ta cần lưu ý ở đây là nếu ta lưu object với key mà bắt đầu với ký tự giống nhau thì nó sẽ giới hạn I/O performance của ta.

Ví dụ các object ta được lưu với key như sau trong S3 thì nó sẽ giới hạn I/O performance:

```
image1.png
image2.png
image3.png
image4.png
```

![image.png](https://images.viblo.asia/3e1ee811-8438-488e-962c-02aedb6c1173.png)

Ta có thể fix nó bằng cách thêm vào trước object key một chuỗi hash.

```
a17c3-image1.png
ff211-image2.png
l10e2-image3.png
rd717-image4.png
```

Khi ta lưu như vậy thì I/O performance của bucket sẽ được tăng đáng kể.

## Kết luận
Vậy là ta đã tìm hiểu xong về S3 và tại sao ta lại nên sử dụng nó. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Hiện tại thì công ty bên mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và sở hữu trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java, Go). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java, Go). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn đề cần giải quyết, và sẽ có rất nhiều bài toán thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `hmquan08011996@gmail.com`. Cảm ơn các bạn đã đọc.
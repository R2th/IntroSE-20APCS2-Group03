Chào mừng các bạn đã đến với series tìm hiểu về Amazon Web Services.
Mỗi bài trong series này, mình sẽ mang đến kiến thức cơ bản của từng service mà AWS cung cấp.
Bằng lối diễn đạt dễ hiểu, đơn giản hoá từ ngữ chuyên môn, mình hi vọng bài viết sẽ giúp ích nhiều cho các bạn newbie (lính mới) chân ướt chân ráo bước vào lĩnh vực web development.
Hãy cùng mình đi hết các số nhé!

# Part 1 - Amazon Simple Storage Service (Amazon S3)
Mở đầu trong chuyên mục sẽ là Dịch vụ lưu trữ cơ bản - Amazon Simple Storage Service hay còn được gọi tắt là Amazon S3.

### Khái niệm
Amazon S3 là kho lưu trữ trên Internet. 
Bạn có thể sử dụng Amazone S3 để lưu trữ và truy cập bất kể lượng data nào tại bất kì thời điểm nào và tại bất kì đâu trên thế giơí.
Để hiểu rõ về Amazon S3, bạn nên nắm vững một vài thuật ngữ cơ bản sau đây:
1. Bucket: Amazon S3 lưu trữ data dưới dạng các objects trong bucket (hiểu nôm na là cái xô chứa dữ liệu)
2. Objects: Object bao gồm bản thân file đó và metadata - các thông tin mô tả file đó. 
3. AWS Management Console: giao diện để bạn thao tác làm việc với AWS.

Để lưu trữ một object trên Amazon S3, bạn chọn file muốn lưu trữ và upload nó lên bucket. Khi bạn upload file, bạn có thể set permission cho object đó (quyền xem, quyền edit..)
Bucket là kho lưu trữ của các object. Bạn có thể tạo một hoặc nhiều bucket. Với mỗi bucket, bạn có thể tuỳ chỉnh những ai có quyền tạo, xoá, xem object trong bucket đó, đồng thời xem được log những ai đã access và bạn có thể chọn nơi lưu trữ vật lý cho bucket của bạn.

Sử dụng AWS Management Console, bạn sẽ có thể thao tác được các nghiệp vụ như trong hình ảnh dưới đây
![](https://images.viblo.asia/d6daa1cb-d734-4b49-957d-f6dbb5f21f2c.png)

### Step 1. Tạo tài khoản AWS
Bạn sẽ cần một tài khoản AWS để có thể sử dụng AWS S3. 
Việc tạo sẽ yêu cầu bạn nhập credit card, nhưng đừng lo, bạn sẽ chỉ bị thu tiền khi bắt đầu sử dụng dịch vụ.
Để tạo tài khoản bạn có thể vào https://aws.amazon.com/s3/, chọn **Get started with Amazon S3** và làm theo hướng dẫn.

### Step 2. Tạo bucket
Như mình đã nói ở trên, để lưu trữ dữ liệu trên AWS S3, bạn cần phải có bucket trước.
1. Sau khi đăng nhập AWS, bạn hãy vào https://console.aws.amazon.com/s3/
2. Chọn **Create bucket**: 

![](https://docs.aws.amazon.com/AmazonS3/latest/gsg/images/create-bucket.png)

3. Tại ô **Bucket name** bạn hãy nhập tên bucket tuân theo chuẩn DNS, và lưu ý
* Tên bucket là duy nhất trên toàn bộ hệ thống của Amazon S3.
* Sau khi bạn tạo bucket sẽ không đổi được tên của bucket nữa.
* Hãy chọn tên bucket gợi đến những object mà bạn sẽ quăng vào trong bucket.
4. Lựa chọn **Region**/ khu vực địa lý mà bạn muốn đặt bucket.
5. Nhấn **Create**.

![](https://docs.aws.amazon.com/AmazonS3/latest/gsg/images/gsg-create-bucket-name-region.png)

### Step 3. Đẩy object lên bucket
Sau step 2 bạn đã có bucket và sắn sàng để đẩy object mà bạn muốn lên bucket này. Object có thể là bất kì dạng file nào: text, photo, audio, video,... 
1. Tại danh sách **Bucket name**, chọn bucket mà bạn muốn đẩy object lên.

![](https://docs.aws.amazon.com/AmazonS3/latest/gsg/images/choose-bucket-name.png)

2. Chọn **Upload**

![](https://docs.aws.amazon.com/AmazonS3/latest/gsg/images/choose-upload.png)

3. Trên cửa sổ con **Upload**, bạn chọn **Add files**

![](https://docs.aws.amazon.com/AmazonS3/latest/gsg/images/upload-add-files.png)

4. Chọn file để upload, rồi nhấn **Open**

![](https://docs.aws.amazon.com/AmazonS3/latest/gsg/images/upload-select-files.png)

5. Nhấn **Upload**

![](https://docs.aws.amazon.com/AmazonS3/latest/gsg/images/upload-display-files.png)

### Step 4. Duyệt Object
Vậy là bạn đã có một object đầu tiên trong bucket. Bạn có thể xem thông tin của object này cũng như có thể download object này về máy tính.
1. Tại danh sách **Bucket name**, chọn bucket mà bạn muốn xem object.

![](https://docs.aws.amazon.com/AmazonS3/latest/gsg/images/choose-bucket-name.png)

2. Tại danh sách **Name**, check vào checkbox của object mà bạn muốn xem thông tin, nhấn **Download** nếu bạn muốn download.

![](https://docs.aws.amazon.com/AmazonS3/latest/gsg/images/download-select-box.png)

### Step 5. Tạo thư mục con trong bucket
1. Chọn **Bucket name** bạn muốn thao tác
2. Nhấn **Create folder**, đặt tên folder mà bạn muốn tuân theo cú pháp DNS, chọn **None** đối với hình thức mã hoá, rồi nhấn **Save**

![](https://docs.aws.amazon.com/AmazonS3/latest/gsg/images/type-folder-name.png)

Nếu bạn muốn chuyển Object vừa rồi vừa upload lên vào folder này
3. Check vào checkbox của object bạn muốn chuyển, nhấn vào **More**, rồi chọn **Cut**

![](https://docs.aws.amazon.com/AmazonS3/latest/gsg/images/objects-copy.png)

4. Tại danh sách **Name**, chọn folder

![](https://docs.aws.amazon.com/AmazonS3/latest/gsg/images/objects-copy.png)

5. Chọn **More** rồi chọn **Paste**

![](https://docs.aws.amazon.com/AmazonS3/latest/gsg/images/more-menu-paste.png)

6. Tiếp tục chọn **Paste**

![](https://docs.aws.amazon.com/AmazonS3/latest/gsg/images/copy-and-paste.png)

Nếu bạn muốn delete object, thì ở bước 3, sau khi chọn **More** hãy chọn **Delete**

### Step 6. Xoá hết object trong bucket
1. Tại danh sách **Bucket name**, nhấn vào icon phía trên trái của tên bucket, rồi nhấn **Empty bucket**

![](https://docs.aws.amazon.com/AmazonS3/latest/gsg/images/choose-empty-bucket.png)

2. Tại cửa sổ con **Empty bucket**, nhấn tiếp vào **Confirm** để đồng ý xoá tất cả object 

![](https://docs.aws.amazon.com/AmazonS3/latest/gsg/images/empty-bucket-confirm.png)

**Lưu ý**
AWS nói rằng, nếu bạn muốn giữ tên của bucket để sử dụng thì đừng xoá bucket đó đi. 
Sau khi bạn delete bucket, tên bucket đó sẽ được cho phép sử dụng lại để đặt tên bucket nhưng vì một vài lý AWS mà nó không cho phép bạn dùng tên này để đặt tên cho bucket lần nữa.

### Step 7. Xoá bucket

1. Tại danh sách **Bucket name**, nhấn vào icon phía trên trái của tên bucket, rồi nhấn **Delete bucket**

![](https://docs.aws.amazon.com/AmazonS3/latest/gsg/images/choose-delete-bucket.png)

2. Tại cửa sổ con **Delete bucket**, nhấn tiếp vào **Confirm** để đồng ý xoá bucket 

![](https://docs.aws.amazon.com/AmazonS3/latest/gsg/images/delete-bucket-confirm.png)
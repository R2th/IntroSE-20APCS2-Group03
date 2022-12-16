Hẳn mọi người đều đã biết
> Amazon Simple Storage Service (Amazon S3) là một dịch vụ lưu trữ đối tượng cung cấp khả năng thay đổi theo quy mô, tính khả dụng của dữ liệu, bảo mật và hiệu năng hàng đầu trong lĩnh vực.  - Theo [aws](https://aws.amazon.com/vi/s3/)
> 

Để đảm bảo tính khả dụng của dữ liệu lưu trữ trên S3 như aws quảng cáo thì dịch vụ này có rất nhiều tính năng hay do đi kèm. Trong đó có 1 tính năng cơ bản nhưng rất chi lợi hại - đó là **Versioning.**

![](https://images.viblo.asia/e602e5db-1167-44a7-81dc-33b174ac951a.png)


**Hôm nay, bài viết này thông qua 1 mini lab sẽ tìm hiểu về Amazon S3 - Versioning với mục tiêu nho nhỏ là hiểu được cơ chế hoạt động cơ bản của Amazon S3 - Versioning.**

### Step 1: Tạo và thiết lập 1 bucket

* Việc tạo mới 1 bucket thì không có gì phải bận tâm nhiều, trước mắt, chỉ cần nhập 1 valid name, chọn đại 1 region  rồi nhấn create luôn - khỏi nghĩ.
(Các config tính sau)

![](https://images.viblo.asia/73106106-5c47-4c9f-8a1d-449fe282713b.png)

> Đối với AWS S3 thì mặc định 1 bucket sau khi được tạo sẽ ở trạng thái private và block hoàn toàn các access vào nó.

* Cho nên việc đầu tiên cần làm (để phục vụ cho việc demo view file thuận lợi) đó là thay đổi permissions setting của bucket này.

![](https://images.viblo.asia/33b3da7c-4b33-489a-bb1f-8ab538bfca13.png)


* Việc tiếp theo - quan trọng nhất trong bài lab này đây, đó là **setting cho bucket ở trạng thái Versioning**.
=> Click vào tab *Properties* của bucket -> click vào chức năng Versioning -> Chọn vào Enable versioning. 

![](https://images.viblo.asia/3cc75480-9136-49e8-9957-1d8063ef1033.png)

**Chú ý 1: Một khi đã enable chức năng versioning của 1 bucket lên thì không thể disable nó được nữa. Mà chỉ có thể dừng - suspend nó thôi**

![](https://images.viblo.asia/e111f04e-9ed3-4dd9-938c-9d18874f26ea.png)

**Chú ý 2: Chức năng versioning 1 khi được enable là sẽ áp dụng cho toàn bộ các object nằm trong bucket đó.**

> The versioning state applies to all (never some) of the objects in that bucket

**=> Step 1 Done.**

### Step 2: Demo chức năng versioning với 1 file txt

* Đầu tiên, cần tạo 1 file .txt để thực hiện demo chức năng versioning này sau đó upload lên bucket.

=> Cứ upload lên luôn config tính sau cũng được.

![](https://images.viblo.asia/5ece2a63-3425-43db-ab8e-43149b0c0102.png)

* Sau khi upload thì file được upload sẽ được tạo luôn một url để access. Tuy nhiên
> Cũng như bucket, mặc định 1 file khi được upload lên sẽ được setting ở trạng thái private (cho dù bucket của nó đã được public)

Cho nên rốt cuộc khi thử click vào url của file để xem thử nội dung file demo thì vẫn dính lỗi *Access Denied*

![](https://images.viblo.asia/e174a62a-db28-4dc1-9228-62ad03d34af5.png)

=> Click vào file -> Chọn **Actions** -> Click vào **Make pulic** để có thể xem được file từ internet 

![](https://images.viblo.asia/5a567609-dfa6-44ed-9deb-d1979d39268e.png)

Vào thử url của file 1 lần nữa => Ngon lành.

![](https://images.viblo.asia/fe177000-001b-401c-9a0b-08901e4e6a86.png)


* Bây giờ mới tới phần chính yếu. Thử change content của file txt đã tạo và upload lên 1 lần nữa (tất nhiên vẫn giữ nguyên file name để bucket hiểu rằng mình đang upload cùng 1 file)

=> Vẫn như lần 1, cứ nhấn upload luôn đã, config gì đó tính sau.

![](https://images.viblo.asia/487ea9e6-c872-4de8-8ed1-167e4268fdb0.png)

* Sau khi upload version mới lên, nếu ở phần versions đang để chế độ là Hide thì chưa thấy gì thay đổi nhiều (time modified thì có). Nhưng khi click vào show thì có thể thấy được 2 version với Version ID khác nhau được hiển thị. Ngoài ra version mới được upload lên sẽ được setting làm Lastest Version

![](https://images.viblo.asia/13cb7c73-3b5d-4b2c-b44e-f4ffc64545bf.png)


* Thử reload lại url ban nãy xem content file có được thay đổi không thì...
=> Lại dính lỗi *Access Denied*

![](https://images.viblo.asia/2b6ebfe7-cec4-47e6-9046-f12aef73d039.png)

> Rất tiếc là cứ mỗi lần upload file thì bucket vẫn cứ mặc định cho file đó là private (cho dù có là update new version của file). Cho nên tốt nhất khi upload tranh thủ setting public cho file luôn cho khỏe cũng được.

=> Làm lại : Click vào file -> Chọn **Actions** -> Click vào **Make pulic** 

Vào thử url của file 1 lần nữa => Ngon lành lần 2. Content của file cũng đã được thay đổi theo version mới nhất

![](https://images.viblo.asia/d78511d4-3a43-4729-82d5-2fab8d395144.png)


**=> Step 2 Done**

### Step 3: Bây giờ xóa file (object) đi thì sao?

* Bây giờ thử xóa file đã upload lên xem sao
=> Click vào file -> Chọn **Actions** -> Click vào **Delete** -> Confirm

![](https://images.viblo.asia/723544dd-562f-48de-9bba-b56b51b150cd.png)

Kết quả sau khi xóa file thì có vẻ như file đã không còn...

![](https://images.viblo.asia/57d23556-0c28-4569-87aa-3cf1d33bd3b6.png)

Nhưng mà nếu Bật Versions = Show lên thì...

![](https://images.viblo.asia/e6ba02ab-b244-4965-a4f7-114d3c933963.png)

> Việc xóa file (object) khi đang enable chức năng versioning chỉ tương ứng với việc tạo ra 1 version mới của object và được đánh dấu là (Delete marker). Các version trước đó vẫn được giữ nguyên và có thể khôi phục bất cứ lúc nào.

* Thử click vào version thứ 2, ta có thể thấy được object này vẫn có url để access như bình thường, chỉ có điều ở url này sẽ được gán thêm version id

![](https://images.viblo.asia/e822a825-8188-452a-88cf-e8182bb1926f.png)

=> Click vào thử url này -> Vẫn có thể xem được content của file như bình thường

![](https://images.viblo.asia/6210ea53-8b8f-4388-a3e7-1f6b3f5d0aaa.png)

* Vậy thì bây giờ nếu muốn khôi phục lại trạng thái trước khi delete, đơn giản chỉ cần xóa đi cái version (Delete marker) đi là được.

![](https://images.viblo.asia/89de2858-6ffb-4764-8588-4a2b28da63ac.png)

* Đúng như dự đoán, sau khi delete version (Delete marker) đi thì mọi thứ trở lại như trước khi delete.

![](https://images.viblo.asia/c6e54e1e-94a7-4d59-b698-10c3a0b23252.png)

**=> Step 3 Done**

### Kết luận

* Sau khi demo nhẹ nhàng như trên thì có lẽ nhìn vào hình bên dưới cũng đã có thể hiểu được versioning của S3 là như thế nào.

![](https://images.viblo.asia/9663a031-3b2b-4636-a67e-3b4f472ae8bf.png)

* Với các lợi điểm như vậy, hẳn sẽ có nhiều use case để chúng ta có thể cân nhắc sử dụng S3 Versioning trong các ứng dụng thực tế.

Rất cảm ơn các bạn đã đọc bài.
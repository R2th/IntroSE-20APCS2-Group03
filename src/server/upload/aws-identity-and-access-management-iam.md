# IAM là gì?
**IAM** hay **I**dentity and **A**ccess **M**anagement là nơi mà bạn quản lý các AWS user của mình cũng như việc truy cập của họ tới các tài khoản AWS và các service.
<br>

Vậy cụ thể điều trên có ý nghĩa là gì? Nó có nghĩa là bạn có thể tạo các tài khoản user cho các member trong team mình và cấp cho các user đó quyền truy cập các tính năng hoặc các service nhất định của AWS.
<br>

Một vài việc các bạn sẽ thường thao tác trong IAM bao gồm: tạo account, group, role và các IAM access policy.
<br>

Giờ thì bạn có thể vào AWS console để xem qua về IAM:
![](https://images.viblo.asia/07e25b2d-a51d-4d22-994d-c76333f28a4f.png)

> Chú ý: khi các bạn tạo một tài khoản AWS, một tài khoản root user sẽ được tự động tạo ra với các thông tin khi bạn tạo tài khoản AWS (email, billing...). Tài khoản root mặc định sẽ có quyền truy cấp tới tất cả các AWS resource, bao gồm billing và tất cả các service. Như vậy tài khoản root sẽ có thể thực hiện mọi action có thể trong một tài khoản AWS. Các tài khoản user được tạo mới sau đó mặc định sẽ không có quyền truy cập tới bất cứ AWS resource nào cả. Bạn sẽ cần phải tự tay cấp quyền cho các tài khoản này nếu muốn chúng có thể truy cập được một resource nào đó.

# IAM Users và Policies
Giờ mình sẽ vào tab user ở trong IAM console:
![](https://images.viblo.asia/6d145699-5955-4701-b0e8-15af5883afcf.png)

Các bạn có thể thấy hiện tại mình chỉ có duy nhất 1 user "Tung", user này đã được gắn policy truy cập cấp độ admin. Giả sử trong team của bạn có member Mark và bạn muốn Mark có thể truy cập bucket S3 thì phải làm như thế nào? Đương nhiên đầu tiên chúng ta cần tạo một tài khoản user cho Mark. Hãy ấn vào nút **Add user**:

![](https://images.viblo.asia/f4bce353-f90f-4e1d-ae9f-b6c811377f00.png)

Giờ các bạn hãy để ý mục **Select AWS access type**, bạn có thể thấy có hại loại access: Programmatic access và AWS Management Console access. Thực ra access type của AWS có thể coi là một chủ để nâng cao thế nên mình sẽ chỉ tóm tắt cho các bạn biết các loại type này là gì vì một số bài viết trong series sẽ có đề cập đến chúng:
- **Programmatic access**: với những người cần truy cập trực tiếp một resource AWS nào đó thông qua một ứng dụng mà họ đang phát triển hoặc thông qua giao diện dòng lệnh, bạn sẽ cần phải cung cấp cho họ một access key và một secret access key. Chúng là những thông tin đăng nhập đã được mã hóa, cho phép người dùng có thể log in và truy cập các resource AWS mà không cần phải nhập tay một mật khẩu nào đó. Đây là một cách an toàn để một admin hoặc một developer nào đó có được khả năng truy cập các resource AWS mà không thông qua console quản lý của AWS.
- **AWS Management Console access**: access type này sẽ giúp bạn có thể cho phép một user log in vào console quản lý AWS và qua đó truy cập tới các service AWS.

Ở ví dụ này, mình sẽ chỉ sử dụng AWS Management Console access. Tiếp theo bạn có thể set password cho user rồi ấn vào nút next:
![](https://images.viblo.asia/a10d684a-3e5f-4021-9c27-e04febe9e4bc.png)

Giả sử ngay ở bước này, user Mark đã được tạo thành công và Mark thử truy cập bucket S3 thì anh ta sẽ nhận được thông báo accesss denied, bởi vì như mình đã đề cập ở phần trước, khi một account user được tạo ra, mặc định nó sẽ không có quyền truy cập bất kì resource AWS nào cả và ban sẽ phải chỉ rõ từng quyền cho nó.
<br>

Vậy thì, để cung cấp full quyền truy cập S3 cho Mark, bạn hẫy chọn tab "Attach existing policies directly" rồi gõ "S3" vào ô filter để lọc ra các policy về S3, check vào "AmazonS3FullAccess" rồi ấn Next:
![](https://images.viblo.asia/d0acf702-4fdb-4b72-8201-272cb9020d6a.png)

Ấn next tiếp để sang màn Tags rồi Next sang màn review và ấn Create user. Như vậy là bạn đã tạo thành công tài khoản user cho Mark với toàn quyền truy cập S3:
![](https://images.viblo.asia/274a2ce7-e03b-42ed-a005-d32d088abe7f.png)

Hãy để ý trong thông báo có một đường link dẫn tới console quản lý AWS, url này khác với url dành cho root user, nó dành riêng cho user vừa được tạo ra. Tượng tự bạn có thể tạo nhiều user cùng một lúc, họ sẽ có chung một mật khẩu và url tới console quản lý AWS giống nhau.

# IAM Groups và Policies
Ở phần trước, chúng ta đã học cách gắn policy cho một user để cấp quyền truy cập cho user đó. Nhưng nếu như chúng ta cần phải cấp quyền truy cập giống nhau cho 20 user hoặc thậm chí là 100 user? Lúc này, để có thể quản lý quyền truy cập một cách hiệu quả thì thay vì phải gắn policy cho từng user, chúng ta có thể tạo một group các user và gắn policy cho group đó.
<br>

Hãy ấn vào tab User groups và chọn Create group:
![](https://images.viblo.asia/f516655a-8395-4cee-b1e1-8d6e8ca8f848.png)

Mình sẽ đặt tên cho group này là "Dev". Hãy chọn các user bạn muốn đưa vào group:
![](https://images.viblo.asia/fdc75ea1-bbde-4610-8c2b-52965d71dea9.png)

ở phía dưới là phần gắn policy cho group:
![](https://images.viblo.asia/1b549ac4-37a0-4981-bd3d-f15723eeaf76.png)

Vậy là bạn đã tạo thành công một group với các member có quyền truy cập tới S3 như đã được gắn cho group:
![](https://images.viblo.asia/4c2c2a1a-bbc9-426f-83cc-03b0da461e16.png)

Giiả sử user Adrian trong group chúng ta vừa tạo cần quyền truy cập tới một resource khác không phải S3 nhưng các user còn lại thì không cần. Lúc này bạn có thể gắn thêm policy trực tiếp cho Andrian hoặc có thể tạo ra một group khác và add Andrian vào group đó, rồi tiếp đó gắn policy cho group mới này. Khi đó, Andrian, Mark và James vẫn đều có quyền truy cập giống nhau tới S3, và Andrian sẽ có thêm các quyền truy cập ở group thứ hai mà chúng ta vừa tạo ra.
<br>

Việc tạo group user là một practice được khuyên dùng thay cho việc gắn policy trực tiếp cho từng user.

# IAM Roles
Không chỉ có các user mới cần truy cập tới các resource AWS. Đôi khi, các service khác của AWS cũng cần truy cập tới các resource khác nhau.
<br>

Giả sử, bạn có một ứng dụng chạy trên một server EC2 cần truy cập tới file được lưu ở bucket S3. Có lẽ bạn sẽ nghĩ đơn giản là chúng ta chỉ cần gắn policy cho EC2 để cấp quyền truy cập tới S3. Nhưng thực ra không phải vậy, khác với user hoặc group là các identity, EC2 là một resource nên policy của nó sẽ không dùng để chỉ rõ nó có thể access resouce nào, mà lúc này policy của nó dùng để chỉ rõ những identity nào có thể truy cập tới nó. Do đó AWS có một feature khác là Role, có nghĩa là chúng ta sẽ cần tạo ra một IAM Role để role này có thể cấp quyền truy cập S3 cho EC2.
<br>

Đầu tiên, hãy mở tab roles vầ ấn vào Create role:
![](https://images.viblo.asia/d46d73f3-4018-4dc6-9508-7920fc50b2c3.png)

Ở phía trên màn hình bạn có thế thấy một thứ gọi là "trusted entity". Đây là một chủ đề khá là nâng cao nên mình xin phép không đề cập tới nó ở đây. Chúng ta sẽ tập trung vào làm thế nào để gắn một role cho một service AWS để cấp quyền cho nó truy cập các service khác. Vì chúng ta cần cấp quyền cho EC2 nên hãy chọn EC2 và ấn Next. Ở đây chúng ta có thể chọn policy cho role.
![](https://images.viblo.asia/65393559-d7ad-451c-a3b7-ed04f4b5fc09.png)

Search "S3" rồi chọn "AmazonS3FullAccess" rồi ấn Next sang màn tags rồi ấn Next tiếp. Đặt tên cho role mới, mình sẽ đặt là "EC2Role" và ấn Create role:
![](https://images.viblo.asia/66c34ffe-64c6-4a3e-a2c3-b2ae80a22da5.png)

Vậy là chúng ta đã tạo thành công một role cấp quyền cho EC2 server truy cập S3 giống như các member trong group Dev có thể truy cập S3.

-----

*Hết*

*Source: https://www.udemy.com/course/linux-academy-aws-essentials-2019/learn/lecture/13741502#overview*
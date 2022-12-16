### 1. Estimate trong kiểm thử phần mềm là gì?
Estimate là một hoạt động trong việc quản lý dự án nhằm ước lượng bao lâu thì công việc có thể thoàn thành. Ước lượng effort cho hoạt động kiểm thử là một task cần thiết và quan trọng trong việc quản lý dự án của QA leader.

Có hai câu hỏi mà khách hàng thường đề cập khi thảo luận về kế hoạch kiểm thử, đó là:

![](https://images.viblo.asia/83f50352-c880-414f-9f34-cfffdb7ae3ee.png)

Đối với các dự án nhỏ, những câu hỏi này là tương đối dễ trả lời. Nhưng đối với các dự án lớn thì không hề dễ dàng để trả lời những câu hỏi trên. Cần phải có kỹ thuật để có thể estimate, đưa ra câu trả lời thuyết phục cho phía khách hàng.

### 2. Estimate những gì?

![](https://images.viblo.asia/8d8247da-037c-4946-b854-6f08d374304d.jpg)

* Resources: Các tài nguyên được yêu cầu để thực hiện bất kì task nào của dự án. Có thể bao gồm con người, thiết bị, phương tiện hoặc bất kì tài nguyên nào được định nghĩa bắt buộc cho việc hoàn thành dự án.
* Times: Thời gian là tài nguyên có giá trị cao nhất trong một dự án. Mỗi dự án đều có một deadline để bàn giao (deadline delivery).
* Human: Số member cần thiết sẽ tham gia vào kiểm thử dự án. Kỹ năng kiểm thử bao gồm kiến thức và kinh nghiệm của các thành viên trong nhóm kiểm thử, chúng ảnh hưởng tới việc ước tính tiến độ. Ví dụ: Nhóm thiếu kinh nghiệm thì sẽ mất nhiều thời gian hơn để hoàn thành dự án so với nhóm có kĩ năng test tốt hơn.
* Cost: Chi phí, ngân sách của dự án. Nó có nghĩa là cần bao nhiêu tiền để hoàn thành dự án.

### 3. Estimate như thế nào - Estimation Techniques

Hiện tại, trong kiểm thử phần mềm có các kĩ thuật Estimate sau:
* Work Breakdown Structure
* 3-Point Software Testing Estimation Technique
* Wideband Delphi technique
* Function Point/Testing Point Analysis
* Use – Case Point Method
* Percentage distribution
* Ad-hoc method

3 kĩ thuật này thường được áp dụng:

![](https://images.viblo.asia/ded2f251-204d-4cb1-964e-aa96a7dec28d.png)

Dưới đây là 4 bước để estimate và chúng ta sẽ tìm hiểu các bước thông qua một case study là phần mềm Guru99 Bank.

![](https://images.viblo.asia/f6f4aa6e-483e-4fee-8ae0-07703be382f8.png)

### Step 1: Phân chia toàn bộ task của dự án thành những sub-task.
Sử dụng kỹ thuật **Work Breakdown Structure**: Chia các task chính thành các task nhỏ mà mỗi task đó sẽ được assign cho từng người cụ thể. Trong kỹ thuật này, một dự án phức tạp được chia thành các module. Các module được chia thành các sub-module. Mỗi sub-module được chia tiếp thành các function. Hiểu một cách đơn giản là phân chia toàn bộ dự án thành các task nhỏ nhất.

![](https://images.viblo.asia/7d0f9ac8-d9b4-477a-955d-37aced6b70ab.png)

Áp dụng trong case study Guru99 Bank thành 5 task nhỏ hơn:

![](https://images.viblo.asia/9a0f42ce-f339-4917-8180-a248f352649d.png)

Sau đó chia nhỏ từng task thành các sub-task. Mục đích là tạo ra các task càng chi tiết càng tốt.

![](https://images.viblo.asia/17caba5b-8e9d-43ad-ad11-9b49158cf8bb.png)

### Step 2: Phân chia task cho các thành viên trong dự án.
Ở bước này, mỗi task được phân chia cho các thành viên thích hợp trong dự án.

![](https://images.viblo.asia/29323e72-cb0b-4413-84b3-b3e52dcc20e1.png)

### Step 3: Ước lượng effort cho mỗi task.

Sử dụng kỹ thuật **Functional Point Method**

Thực hiện estimate size (kích cỡ), duration (thời gian), cost (chi phí) cho từng task:

![](https://images.viblo.asia/5350e72b-bede-46cb-8880-9d289062bae1.png)

**Estimate size** Ở step 1, chúng ta chia toàn bộ dự án thành các task nhỏ bằng cách sử dụng phương pháp WBS. Ở bước này, estimate size của các task. Size của task phụ thuộc vào size của function. Size của function phản ánh qua số lượng các công việc function đó phải thực hiện. Function nào thực hiện càng nhiều công việc, function đó càng phức tạp.

Trước khi bắt đầu estimate effort cho task, thì function được đánh giá vào 3 nhóm sau: 
* **complex**: các hệ thống phức tạp bao gồm nhiều thành phần tương tác với nhau.
* **medium**: hệ thống có giới hạn số lượng các thành phần. 
* **simple**: hệ thống có số lượng các thành phần nhỏ.

Dựa vào độ phức tạp của các chức năng phần mềm, Test manager có thể tự định nghĩa weightage cho mỗi nhóm. Ví dụ: 

![](https://images.viblo.asia/1eab68f6-da27-40b8-99a8-259dbee620e0.png)

Quay trở lại với case study Guru99 Bank. Website này được chia thành 12 function cùng với độ phức tạp như sau:

![](https://images.viblo.asia/6942b432-ccff-4a49-a670-bc41072b7f86.png)

**Estimate duration**: Sau khi phân loại độ phức tạp của các function, cần phải ước lượng thời lượng để test

![](https://images.viblo.asia/53784609-97df-4167-8bfd-c185702fa7fa.png)

* Total Effort: effort để hoàn thành việc kiểm thử tất cả các chức năng của hệ thống.
* Total Function Points: tổng số point (weightage) của toàn bộ function trong hệ thống.
* Estimate defined per Function Points: effort trung bình để hoàn thành 1 Function Point. Giá trị này phụ thuộc vào năng suất của thành viên chịu trách nhiệm về task được giao.

Giả sử dự án estimate thời gian thực hiện 1 function point là 5 giờ. Vậy tổng effort dự tính để kiểm thử tất cả chức năng ở case study Guru99 Bank như sau:

![](https://images.viblo.asia/a7c37e9e-7503-4ec5-a971-6e4aa8b989e2.png)

Như vậy tổng effort cho case study Guru99 Bank là 170 man-hours. Ví dụ ở trên cũng cho thấy tầm quan trọng của các member trong team. Nếu team có nhiều member tài năng và giàu kinh nghiệm thì có thể hoàn thành nhiệm vụ được giao trong thời gian ngắn và dự án sẽ kết thúc đúng thời hạn hoặc sớm hơn.

**Estimate cost**: Bước này sẽ giúp chúng ta trả lời các câu hỏi  “How much will it cost?” Giả sử, thu nhập bình quân là $5/người/giờ. Thời gian cần thiết kiểm thử toàn dự án là 170 giờ. Theo đó, chi phí là 5 * 170 = $850

Sử dụng kỹ thuật **Three Point Estimation**

Three Point Estimation là một trong những kỹ thuật được sử dụng để ước tính một task. Sự đơn giản của Three Point Estimation khiến nó trở thành một kĩ thuật hữu ích nhất trong estimate dự án. 3 value trong Three Point Estimation bao gồm:

![](https://images.viblo.asia/e4549e83-767a-48b5-9106-6ed03bea07ae.png)

Với case study Guru99 Bank ta sẽ thực hiện như sau:
* The best case : 120 man-hours (trong 15 ngày). Trong trường hợp này, cần đội ngũ các member giỏi để thực hiện các task trong thời gian ngắn nhất.
* The most likely case : 170 man-hours (trong 21 ngày). Đây là trường hợp bình thường, có đủ nguồn lực để thực hiện.
* The worst case : 200 man-hours (trong vòng 25 ngày). Trường hợp này cần phải thực hiện công việc mất nhiều thời gian hơn vì các thành viên không có kinh nghiệm.

Gán giá trị cho mỗi thông số như sau:

![](https://images.viblo.asia/f31328b5-aa29-4018-b87f-ec95f293ddb4.png)

Effort tính bằng công thức double-triangular như sau: 

![](https://images.viblo.asia/1352f306-b264-46b5-ab4a-c74b7b6fcca8.png)

trong đó E là Weighted Average, chính là estimation effort cần thiết cho task.

Công thức tính độ lệch: 

![](https://images.viblo.asia/a5bd26b2-353d-4486-99b7-2d1d58a72299.png)

Theo đó để hoàn thành task cần 166.6 ± 13.33 Man-hour (153.33 to 179.99 man-hour).

### Step 4: Xác nhận estimation.

Sau khi estimate xong, cần chuyển tiếp cho Project Management, những người sẽ review và approve, những bên liên quan như khách hàng...

**Một số tip để estimate hiệu quả:**

**Thêm một khoảng thời gian dự phòng và nguồn lực dự phòng:** Nhiều thứ không thể đoán trước có thể xảy ra với dự án, chẳng hạn như một thành viên chủ chốt trong team đột nhiên nghỉ việc hoặc nghỉ phép dài ngày, các task phải mất nhiều thời gian hơn so với ước tính để hoàn thành.... Đó là lý do tại sao cần một khoảng thời gian dự phòng trong estimate hoặc có member dự phòng để tránh không kịp deadline.

**Vận dụng kinh nghiệm từ các dự án trước**: Kinh nghiệm từ các dự án trước đây đóng một vai trò quan trọng cho việc estimate. Bởi vì một số dự án có thể có một số điểm giống nhau, nên có thể tái sử dụng các bản estimate trước đây, cố gắng khắc phục tất cả những khó khăn hay vấn đề đã gặp phải. Dựa vào đó estimate sẽ trở nên thực tế hơn.

**Bám sát vào estimate:** Estimate có thể sai. Trong giai đoạn đầu của dự án, nên thường xuyên kiểm tra lại bản estimate và thực hiện sửa đổi nếu cần thiết. Chúng ta không nên mở rộng estimate, trừ khi có những thay đổi lớn trong yêu cầu, hoặc phải thương lượng và được sự chấp nhận của khách hàng khi estimate thêm.

Bài viết được dịch từ nguồn: http://www.guru99.com/an-expert-view-on-test-estimation.html
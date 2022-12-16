Bạn đã quen làm báo cáo với cơ sở dữ liệu quan hệ Mysql mà tự nhiên 1 ngày đẹp trời sếp lại bắt suất báo cáo với dữ liệu của firestore :scream: <br>
Giờ mà viết code để xử lý thì quá mất effort mà kết quả chắc j đã chính xác :expressionless: <br>
Phải chi có thể viết mấy câu lệnh kiểu select ... where ... thì hay biết mấy :drooling_face:

Đừng lo đã có bigquery giải quyết vấn đề của các bạn :metal::call_me_hand::clap:

# 1. Bigquery là gì ?
**BigQuery** là một dịch vụ web **RESTful** cho phép tương tác để phân tích các tập dữ liệu khổng lồ lên tới hàng tỉ dòng hoạt động cùng với Google Storage . Nó là một cơ sở hạ tầng như một dịch vụ ( IaaS ) có thể được sử dụng bổ sung với MapReduce.<br>
**Bigquery** có khả năng mở rộng và dễ sử dụng, cho phép các nhà phát triển và doanh nghiệp khai thác các phân tích dữ liệu mạnh mẽ theo yêu cầu.......

Ok, đọc qua về khái niệm để hiểu nó là gì đã :laughing:. Giờ mình đi sâu vào ứng dụng của nó thì hơn :+1:

# 2. Query firestore như mysql
Vậy làm sao để query firestore với các câu lệnh như select :thinking: <br>
Chúng ta sẽ thực hiện các bước sau nhé <br>
> ở đây mình đã chuẩn bị một data base đơn giản với 2 bảng user và class
> ![](https://images.viblo.asia/135f4235-cc83-4672-8f15-fe68c2d95f5d.png)

<br>

**B1:** Khởi tạo 1 dataset 
bạn vào link https://console.cloud.google.com/ rồi chọn bigquery nhé
Sau đó bạn chọn create dataset nhé 
> Nhớ tên dataset lát mình sẽ dùng đấy :hugs:

![](https://images.viblo.asia/0aedac5e-35ab-4b77-9ff9-32c0b2616cc3.png)

**B2:**  Tạo table trong biquery 

**Ở đây mình sử dụng extention "Export Collections to BigQuery". Cơ chế của anh này là sẽ tạo 1 function trigger sự thay đổi của firestore rồi tạo 1 bảng log các trigger đó, rồi từ bảng log đó sẽ tạo ra 1 view hiển thị tương tự mysql, chúng ta sẽ viết các câu lệnh select với view đó.**

Bạn vào extention rồi install extention "Export Collections to BigQuery"

![](https://images.viblo.asia/f35e8da6-b5f6-4695-ad25-4b004d272346.png)
Bạn điền các thông tin như sau nhé (ở đây mình tạo với bảng user - bạn sẽ làm tương tự với bảng class nhé): <br>

> Sau khi tạo xong bạn sẽ thấy 1 function như này ở trong console.firebase.google.com
> 
> ![](https://images.viblo.asia/af2d4d77-a8a3-43af-9869-d9fb47dce89d.png)


Vì chúng ta dựa vào việc trigger sự thay đổi của firestore để tạo bảng log nên đối với những data trước khi tạo bigquery và k có sự thay đổi thì sẽ k có mặt trong log 
=> gcp có hỗ trợ import data collection vào bảng log nhé 


Bạn bật cloud shell giúp mình và chạy lệnh này 
```
npx @firebaseextensions/fs-bq-import-collection
```
Bạn điền thông tin theo các câu hỏi trong lệnh là được nhé . Chạy xong chúng ta có bảng log như này 

![](https://images.viblo.asia/fbf217f6-e2db-4c4f-8d71-66818ddc8774.png)

Mình sẽ viết query tạo view nhé 
> Nhớ save view để sử dụng
```
SELECT
  document_id,
  JSON_EXTRACT(DATA, '$.name') AS name,
  JSON_EXTRACT(DATA, '$.class') AS class,
FROM
  `fir-bigquery-demo.fir_bigquery_demo.user_test_raw_latest`
```

![](https://images.viblo.asia/cfe319ea-bb45-4841-a918-6d8139d98a01.png)
![](https://images.viblo.asia/1d5a98c7-dd5e-4375-a766-d1d5801c5f37.png)

Giờ thì select giống mysql thôi ^^

**THANKS FOR WATCHING**
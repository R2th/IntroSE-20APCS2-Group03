Nếu đã làm việc nhiều với Google Cloud Platform chắc hẳn các bạn không còn xa lạ gì với cái tên Bigquery. Trong bài viết này, mình sẽ giới thiệu qua về Bigquery nhưng hãy cân nhắc về điểm mạnh cũng như hạn chế của Bigquery trước khi áp dụng vào dự án của bạn nhé
## 1. What is Bigquery?

Việc lưu trữ và truy vấn các bộ dữ liệu lớn có thể tốn thời gian và tốn kém nếu không có phần cứng và cơ sở hạ tầng phù hợp. BigQuery là data warehouse cloud dưới dạng serverless, có khả năng mở rộng cao và hiệu quả về chi phí . Nó cho phép thực hiện các truy vấn siêu nhanh ở quy mô petabyte bằng cách sử dụng sức mạnh xử lý của cơ sở hạ tầng của Google. Do Bigquery là serverless nên bạn không còn tốn thời gian setting cũng như maintain hệ thống, bạn chỉ việc tập chung vào phát triển sản phẩm của mình. Do Bigquery tính tiền theo request nên bạn sẽ không phải trả một chi phí cố định hàng tháng cho hệ thống của mình

## 2. BigQuery architecture


![](https://images.viblo.asia/fe5607b7-38b9-460f-b94c-043afdfbdd46.jpg)

Kiến trúc của BigQuery phân tách storage và compute, đồng thời cho phép chúng mở rộng quy mô độc lập theo request. Cấu trúc này tạo ra tính linh hoạt và kiểm soát chi phí cho dự án vì không cần phải duy trì và chạy các resource cố định mọi lúc. Điều này rất khác với các giải pháp data warehouse dựa trên node-base hoặc các hệ thống xử lý song song (MPP) on-premise. Cách tiếp cận này cũng cho phép bạn  đưa dữ liệu của mình vào kho dữ liệu và bắt đầu phân tích dữ liệu bằng Standard SQL mà không cần lo lắng về các hoạt động cơ sở dữ liệu và kỹ thuật hệ thống. Bigquery đã triển khai cho chúng ta High-Avaliable hay Replicate cũng như auto scale resource khi tăng tải rồi nên bạn sẽ không mất thời gian triển khai phần này nữa, dùng và trả tiền thôi.

## 3. Setting Bigquery

### Create a New Dataset

Để tạo các table và load dữ liệu bảng vào BigQuery, trước tiên hãy tạo dataset BigQuery để lưu giữ dữ liệu bằng cách hoàn thành các bước sau:

1. Trong bảng navigation của console GCP, hãy chọn tên dự án được tạo như một phần của thiết lập.
2. Sau đó click vào **Create dataset**

![](https://images.viblo.asia/d501074f-5ad3-41bd-a1b5-d6eae378416b.png)

3. Trong popup hãy nhập thông tin của dataset như id, location,...

![](https://images.viblo.asia/5bf34af8-c3be-497e-82d5-2ff45b6f5fc1.png)

### Create a New Table

Bigquery cho phép tích hợp sẵn với kho dữ liệu của StackerOverFlow nên mình sẽ tạo 1 table với dữ liệu hiện có của stackoverflow trong bigquery nhé.

1. Ở gần phía trên cùng bên phải của bảng điều khiển GCP, chọn **Compose new query**

![](https://images.viblo.asia/5db034e6-4db8-4938-9dd8-2995599c31c9.png)

2. Trong Query Editor chúng ta sẽ viết cấu lệnh SQL để tạo một table mới

```mysql
CREATE OR REPLACE TABLE `stackoverflow.questions_2018` AS
SELECT id, title, accepted_answer_id, creation_date, answer_count , comment_count , favorite_count, view_count, tags
FROM `bigquery-public-data.stackoverflow.posts_questions`
WHERE creation_date BETWEEN '2018-01-01' AND '2019-01-01';
```

3. Chọn **Run**  và tạo bảng mới question_2018 trong dataset stackoverflow trong dự án của bạn.

### Query the New Table

Sau khi tạo table mới trên Bigquery mình sẽ hướng dẫn các bạn thực hiện truy vấn để trả về các bài post trên Stack Overflow nhé

1. Ở gần phía trên cùng bên phải của bảng điều khiển GCP, chọn **Compose new query** và viết query như sau vào Query editor:

```mysql
SELECT id, title, accepted_answer_id, creation_date, answer_count , comment_count , favorite_count, view_count 
FROM  `stackoverflow.questions_2018` 
WHERE creation_date BETWEEN '2018-01-01' AND '2018-02-01'
AND tags = 'android';
```

2. Click **Run** và sau đó Bigquery sẽ trả về các câu hỏi Stack Overflow được tạo vào tháng 1 năm 2018 được gắn tag là android cùng với câu hỏi và một số thống kê khác.

## 4. Conclude

Bigquery giúp bạn có thể triển khai cơ sở dữ liệu một cách nhanh chóng và dễ dàng mà không cần phải setting nhiều bước phức tạp. Tuy nhiên hãy cân nhắc trước khi đưa nó vào dự án của bạn nhé.
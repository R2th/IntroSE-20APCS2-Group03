![image.png](https://images.viblo.asia/e3057f0a-faa6-4d20-8a67-0917235f0e9f.png)
# Mở đầu
## Metabase là gì?

[Metabase](https://metabase.com) là công cụ mã nguồn mở hỗ trợ phân tích dữ liệu và chia sẻ chúng một cách dễ dàng. Metabase cho phép chúng ta  đặt câu hỏi về dữ liệu và hiển thị câu trả lời dưới nhiều dạng biểu đồ khác nhau, thuận tiện cho việc đọc và xử lý thông tin.

Metabase có giao diện thân thiện, dễ sử dụng với cả những người dùng không có nhiều kiến thức về SQL, và có cả những tính năng cho những user có kiến thức tốt về SQL.

## Tính năng nổi bật
Các tính năng nổi bật của Metabase phải kể tới như:

- Hỗ trợ nhiều datasource khác nhau như MySQL, Postgres, Mongo, SQL Server, AWS Redshift, Google BigQuery, Druid, H2, SQLite, Oracle, Crate, Google Analytics, Vertica, Spark, Presto, Snowflake.
![image.png](https://images.viblo.asia/682b582a-45eb-4b15-bcbf-982ae5057fba.png)
- Hỗ trợ xuất dữ liệu đa đạng các biểu đồ :Number, Smart number, Progress bar, Gauge, Table, Line chart, Bar chart, Line + bar chart, Row chart, Area chart, Scatterplot or bubble chart, Pie/donut chart, Funnel, Map
![image.png](https://images.viblo.asia/cea7149b-3843-40d6-9a0d-58c8bd501263.png)
- Hỗ trợ tạo dashboard theo các biểu đồ trên để theo dõi.
- Theo dõi dữ liệu thời gian thực.
- Tạo alert/report để theo dõi những thông số đã đạt target hay chưa? Alert thông qua email, slack,...
- Hỗ trợ tạo query bằng giao diện, kéo thả.
![](https://images.viblo.asia/a345d7c9-71eb-4980-b417-279fca5fc47b.png)

- Cung cấp quyền kiểm soát truy cập rất chi tiết và đầy đủ, bao gồm LGPD (Luật bảo vệ dữ liệu chung) và GDPR (Quy định chung về bảo vệ dữ liệu)
- [Open source, miễn phí, dễ cài đặt](https://github.com/metabase/metabase)
# Cài đặt Metabase

Có rất nhiều lựa chọn cho bạn để có thể bắt đầu sử dụng Metabase như:

- [Metabase Cloud](https://www.metabase.com/start/): cách nhanh nhất để sử dụng Metabase là chúng ta sử dụng phiên được họ triển khai trên Cloud với chi phí cho gói Starter là 85$/month cho 5 users, và 5$ cho mỗi user tiếp theo.
 ![image.png](https://images.viblo.asia/a9bad8bf-8b54-4865-9254-e4bf0f34922d.png)
- Hoặc tự triển khai Metabase trên các Cloud Platforms, VPS của riêng bạn
  - [AWS Elastic Beanstalk](https://www.metabase.com/docs/latest/operations-guide/running-metabase-on-elastic-beanstalk.html)
  - [Heroku](https://www.metabase.com/docs/latest/operations-guide/running-metabase-on-heroku.html)
  - [Kubernetes](https://www.metabase.com/docs/latest/operations-guide/running-metabase-on-kubernetes.html)

## Cài đặt trên Kubernetes cluster
Trong bài viết này, mình sẽ cài đặt Metabase và kết nối tới cơ sở dữ liệu Mysql nhé. Metabase đã xây dựng helm chart giúp chúng ta triển khai Metabase trên Kubernetes cluster một cách nhanh chóng, ổn định, tuy nhiên chart đó lại sử dụng backend database H2 để lưu trữ thông tin, nên nếu container restart thì dữ liệu sẽ mất. Vì thế mình chỉnh sửa 1 chút để ứng dụng của mình sử dụng PostgreSQL.

Trước tiên các bạn setup 1 cụm kubernetes và cài đặt Helm trên đó.
Tiếp theo chúng ta cần deploy Ingress Nginx

```bash
$ helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
$ helm repo update

$ helm install ingress-nginx ingress-nginx/ingress-nginx
```

Sau đó hãy clone repository này về [daothaison/metabase-chart](https://github.com/daothaison/metabase-chart) , nó có chứa helm chart dùng để deploy ứng dụng Metabase lên cụm k8s.

```bash
$ git clone git@github.com:daothaison/metabase-chart.git

$ cd metabase-chart

$ helm install metabase charts/ -f values.yaml
```

sau command install chart bạn nhận được kết quả như vậy là chúng ta đã deploy thành công 
![image.png](https://images.viblo.asia/a56be326-f238-4cb4-aa61-868853d0c86e.png)

bây giờ chỉ cần truy cập vào địa chỉ http://metabase.local/setup để sử dụng cài đặt các bước đầu tiên cho Metabase
![image.png](https://images.viblo.asia/4a2d3456-e4a0-48cf-ad49-35137667cf1d.png)

Đầu tiên Metabase sẽ yêu cầu chúng ta cung cấp các thông tin cơ bản, lưu ý ở bước 3 thì chúng ta sẽ cấu hình liên kết Metabase tới cơ sở dữ liệu mà chúng ta cần phân tích. Bạn điền các thông tin về cơ sở dữ liệu như Database type, host, port, credential,...
![image.png](https://images.viblo.asia/784e3dc9-4225-4b05-a2b6-32a23064aec2.png)

## Sử dụng

# Tham khảo
- https://www.metabase.com/
- https://github.com/daothaison/metabase-chart
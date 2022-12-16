# Lời tựa
Tiếp tục series về Kubernetes, mình sẽ giới thiệu với các bạn về một chủ đề rất quan trọng đó là Logging. 

Tầm quan trọng của logging thì chắc ko phải thảo luận ở đây nữa, ai cũng biết rồi. Cái mình muốn nói trong bài này là làm sao để lưu trữ log tập trung, có thể xem lại phục vụ troubleshot hoặc để thống kê, thậm chí là điều tra với các vấn đề liên quan tới security.

***Vậy logging trên k8s thì có gì khác so với các môi trường khác?***

Câu trả lời là có khác. Bởi khi bạn cài đặt một ứng dụng lên k8s thì ứng dụng có thể được cấu hình chạy với nhiều replicas (sử dụng deployment có nhiều pod). Và quan trọng hơn là các pod này được phân bố trên các node một cách tự động do k8s điều phối, trừ khi bạn cấu hình node selector nhưng việc này cũng ko quá phổ biến. 


***Bạn có thể sẽ gặp phải các vấn đề sau:*** 


- Bình thường bạn muốn xem log của một pod thì sẽ nghĩ tới lệnh "kubectl -n <**namespace**> logs -f \<**pod-name**>". Nhưng như đề cập bên trên, nếu app đó đang được deploy với 5 replicas, tương ứng với 5 pod thì sao?
    
- Hoặc theo logic cũ các bạn muốn xem logfile của pod/container đó trên node thì việc đầu tiên là bạn phải tìm xem pod đó đang chạy trên node nào. Sau đó kết nối ssh vào node đó check log tại thư mục **/var/log/containers** --> Rất mất công

- Trường hợp bạn pod của ứng dụng được tạo lại sẽ được tạo lại và lúc đó không thể xem lại log cũ bằng lệnh kubectl logs
   
    
**Để giải quyết các vấn đề ở trên, thì các giải pháp logging đã xuất hiện!**
    
# Giới thiệu
Hiện tại có một vài giải pháp logging phổ biến mà có thể các bạn đã từng nghe qua như **ELK** của Elastic, **EFK** của Traesure Data  hay **Promtail/Loki** của Grafana
Về cơ bản mình thấy ý tưởng của mấy bộ giải pháp này cũng khá giống nhau, mỗi ông do một nhà phát triển khác nhau thì sẽ có cách cấu hình khác nhau. Mình sẽ giới thiệu giải pháp sử dụng ELK và EFK, nếu có điều kiện thời gian sẽ viết thêm về thằng Loki sau :) 

Trong phạm vi của series này mình không đánh giá giải pháp nào hơn, và sẽ chỉ giới thiệu về kiến trúc của từng giải pháp cũng như một số best practice để các bạn có thể tự tìm hiểu sâu hơn và áp dụng vào các bài toán cụ thể của mỗi người.
    
# Giải pháp logging với ELK (Elasticsearch - Logstash - Kibana)

ELK là bộ giải pháp của Elastic. Các bạn xem qua kiến trúc của nó như sau:
![image.png](https://images.viblo.asia/60cc37fa-d5ce-4f1c-9cfa-3cc42c91995c.png)
    
## ELK gồm các thành phần chính:

**Beats** (Filebeat, Metricbeat..) là thành phần đóng vai trò lấy log từ target (ở đây là lấy log trên k8s). Output của Beats có thể là Logstash (để phân tích và tổng hợp dữ liệu log trước khi lưu vào elasticsearch) hoặc thể đẩy trực tiếp vào Elastic Search nếu ko cần thực hiện parse log.

**Logstash**: Đóng vai trò là Data Aggregation & Data Processing trong luồng logging này. Trên Logstash bạn có thể định nghĩa các "pipeline" để xử lý dữ liệu đầu vào (input) để xử lý bằng các filter-plugin. Hiểu nôm na là bạn có thể tùy chọn với từng loại log input để thực hiện thêm một số trường mới, hoặc xử lý các dữ liệu log không có cấu trúc thành các dạng log có cấu trúc bằng các pattern (thường xử lý regex). **Lưu ý rằng bước cấu hình log parsing là khó nhất trong việc xây dựng một hệ thống logging**.

**Elastic Search**: Là nơi lưu trữ log vào các index phục vụ cho việc query dữ liệu sau này.

**Kibana**: Làm nhiệm vụ query dữ liệu từ Elastic Search và hiển thị theo các template một cách trực quan theo dạng list hoặc graph tùy và nhu cầu sử dụng của người dùng. 

***NOTE: Trong trường hợp các bạn đơn giản chỉ muốn lưu trữ log tập trung mà không cần các cấu hình parsing thì có thể bỏ qua luôn thằng logstash và lưu trực tiếp dữ liệu từ beat đến elastic search*** 
![image.png](https://images.viblo.asia/c7ea705b-4dc8-48fc-805b-c237ac3a93bd.png)

# Giải pháp logging với EFK (Elasticsearch - Fluentd - Kibana)
EFK là bộ giải pháp của **Traesure Data**. Các bạn xem qua kiến trúc của nó như sau:
![image.png](https://images.viblo.asia/7bfdb862-a8c1-407a-87b1-988788923d82.png)

**Nói tới EFK thì không thể không đề cập tới 2 điểm sau:**
- Fluentbit và Fluentd có performance rất tốt, và sử dụng rất ít tài nguyên
- Fluentd ***được bảo kê*** bởi CNCF, do đó xu hướng logging trên k8s sẽ ưu tiên dùng thằng EFK hơn ELK

Riêng bản thân mình thì cho rằng làm việc quen với bộ nào thì nên tiếp tục dùng bộ đó cho đỡ mất công tìm hiểu config của thằng kia cho mệt đầu, trừ khi bị sếp dí :D 

Các bạn có thể tham khảo thêm các bài viết so sánh giữa Fluentd và Logstash ở đây: https://www.openlogic.com/blog/fluentd-vs-logstash#:~:text=FluentD%20and%20Logstash%20are%20both,offers%20many%20benefits%20over%20Logstash.

## EFK gồm các thành phần chính:
**Fluentbit/Fluentd:** Cả Fluentbit và Fluentd đều có thể thực hiện việc Data Collection, tức là lấy log từ k8s. Tuy nhiên khác biệt lớn nhất giữa 2 thằng này là **Fluentbit** được thiết kế chuyên biệt cho việc lấy dữ liệu. Trong khi **Fluentd** còn có thể thực hiện phân tích và tổng hợp dữ liệu.
Ánh xạ sang **ELK** thì  **Fluentbit** tương đương với **Filebeat** còn **Fluentd** tương đương với **Logstash**

**Elastic Search**: Là nơi lưu trữ log vào các index phục vụ cho việc query dữ liệu sau này.

**Kibana**: Làm nhiệm vụ query dữ liệu từ Elastic Search và hiển thị theo các template một cách trực quan theo dạng list hoặc graph tùy và nhu cầu sử dụng của người dùng.

***NOTE: Hoàn toàn tương tự với giải pháp logging dùng ELK, thì với EFK nếu bạn chỉ tập trung vào việc lấy log tập trung thì có thể thể đẩy dữ liệu từ Fluentbit về thẳng Elastic Search, khi đó kiến trúc hệ thống sẽ như sau:***
![image.png](https://images.viblo.asia/3286572d-fab9-4c76-b0d6-4140cc8ff0e3.png)

# Bài toán thực tế
Để thực hành phần cài đặt và cấu hình logging này, thì quan trọng là bạn cần biết bạn đang giải quyết bài toán nào.

**Mình đặt ra bài toán logging cho hệ thống như sau:**
- Hệ thống có sử dụng một vài opensource như vernemq, kafka --> Cần dựng log tập trung và lưu trữ 7 ngày
- Các service (do mình phát triển) được triển khai dưới dạng deployment --> Cần lưu log 30 ngày
- Các dữ liệu log không cần thực hiện parsing, tuy nhiên vẫn cần xây dựng hệ thống phân tích log, các rule parsing sẽ được bổ sung sau
- Thực hiện khai báo các template để query dữ liệu log của từng service trên kibana



***Trong các phần tiếp theo mình sẽ dựng hệ thống logging ELK và EFK để giải quyết bài toán trên. Các bạn chú ý theo dõi nhé!***
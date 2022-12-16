[Airflow Executor](https://airflow.apache.org/docs/apache-airflow/stable/executor/index.html) là một thành phần quan trọng của Apache Airflow, được coi là "trạm làm việc" cho tất cả các nhiệm vụ theo lịch trình. Trong bài viết này chúng ta sẽ thảo luận chi tiết về Airflow executor, so sánh những loại executor để giúp người dùng đưa ra lựa chọn phù hợp cho các dự án của mình!
## Airflow Executor là cái chi chi?
Đầu tiên chúng ta đều biết [Apache Airflow](https://airflow.apache.org/) là một mã nguồn mở Python - Apache cho việc lập kế hoạch nhiệm vụ (scheduling tasks). [Airflow Executor](https://airflow.apache.org/docs/apache-airflow/stable/executor/index.html) là một thành phần quan trọng của Apache Airflow, được coi là "trạm làm việc" cho tất cả các nhiệm vụ theo lịch trình. Có rất nhiều Airflow Executor để lựa chọn, hãy gạt những lựa chọn đó sang một bên và trước tiên hãy tập trung vào những gì các Airflow Executor làm trong hệ sinh thái Airflow. Định nghĩa 'Người thực thi', theo nghĩa phù hợp nhất, là một cơ chế giúp thực thi các nhiệm vụ. Nhân viên là nút hoặc bộ xử lý chạy các tác vụ thực tế. The Airflow scheduler sẽ không chạy bất kỳ tác vụ nào mà xử lý các tác vụ cho Executor. Executor hoạt động như một người trung gian để xử lý việc sử dụng tài nguyên và cách phân phối công việc tốt nhất.

Mặc dù một công việc Airflow được tổ chức ở cấp DAG, giai đoạn thực thi của một tác vụ chi tiết hơn và Executor chạy ở cấp tác vụ. Như các hình ảnh được hiển thị bên dưới, nếu một DAG kết thúc với sáu nhiệm vụ, scheduler sẽ giao riêng từng nhiệm vụ cho Executor. Cho dù những nhiệm vụ đó hoàn thành song song hay tuần tự, nó được xác định bởi loại Executor
![image.png](https://images.viblo.asia/1e63c437-898a-439d-b0a8-8060c8974bc4.png)
## Phần nào của Executor là ảnh hưởng đến vòng đời Airflow?
Hiện tại, Airflow (phiên bản 1.10.10) là một hệ thống lập lịch trình duy nhất. Trong trường hợp này, tất cả các tác vụ chỉ được lên lịch bởi một người lập lịch. Bộ lập lịch kiểm soát thời điểm các tác vụ sẽ được gửi đến Executor và theo dõi trạng thái nhiệm vụ từ Executor. 

Vòng đời của một tác vụ từ scheduler đến Executor bao gồm các bước sau:
1. Trước khi scheduler gửi lệnh về tác vụ mà Executor sẽ chạy, tùy thuộc vào loại Executor, bản thân tài nguyên của Executor sẽ không hoạt động hoặc không khả dụng.
2. Khi thời gian đã lên lịch đến, Airflow scheduler sẽ gửi lệnh đến Executor.
3. Sau khi nhận được tín hiệu từ scheduler, Executor bắt đầu phân bổ tài nguyên và đưa các tác vụ vào hàng đợi. Khi công việc có sẵn, nó sẽ nhận các tác vụ từ hàng đợi để thực hiện nó. Trong khi đó, scheduler sẽ "chạm" vào các tác vụ mỗi lần (được gọi là nhịp tim _ heartbeat) để có được trạng thái hiện tại của tác vụ, sau đó cập nhật trạng thái của nó trong DB phụ trợ.
4. Sau khi các tác vụ kết thúc và scheduler nhận được trạng thái **"Đã hoàn thành"** từ Executor, tài nguyên được phân bổ để chạy tác vụ đã được dọn dẹp.

![image.png](https://images.viblo.asia/6cd834b5-8fac-4b83-9ac7-02e40b210a65.png)

## Sao Airflow có nhiều dạng Executor dữ?
Phần lớn các loại tác vụ thiết bị thực thi Airflow để chạy theo cách phân tán, các tác vụ đó đang chạy trên các nút thực thi đa xử lý hoặc nhiều nút thực thi. Môi trường sản xuất Airflow thường có hàng trăm DAG, bao gồm hàng nghìn tác vụ để chạy. Với khả năng chạy song song các tác vụ khác nhau ở quy mô lớn như vậy, Airflow Executor tỏ ra vượt trội khi thực thi trên khối lượng công việc chuyên sâu.

Một lý do khác khiến bạn có nhiều loại Executor khác nhau là để có tùy chọn dựa trên yêu cầu và cơ sở hạ tầng của mình. Airflow cung cấp cho người thực thi 'bộ công cụ', các loại người thực thi khác nhau mang lại sự linh hoạt để Airflow tích hợp trơn tru với môi trường của bạn.

Airflow có thể mở rộng, hỗ trợ các Executor khác nhau. Ban đầu, Airflow chỉ có sẵn SequentialExecutor, LocalExecutor, CeleryExecutor và MesosExecutor. Trong hai năm qua, kể từ Airflow 1.9.0, Airflow được chú ý nhiều hơn và nhiều Executor đã được đóng góp cho cộng đồng, những người thực thi đó bao gồm DaskExecutor, KubernetesExecutor, DebugExecutor.  Sự khác biệt giữa các Executors là cơ chế trên đó các executors đang chạy các tác vụ. Theo tôi, không phải tất cả các người thực thi đều được xem xét như nhau, một số bạn thậm chí có thể muốn bỏ qua trừ khi bạn có lý do cụ thể mà bạn phải sử dụng chúng. Dưới đây là mô tả của từng Người thực thi và những gì cần được xem xét khi bạn có xu hướng chọn một trong số họ.

![chán](https://images.viblo.asia/fb52bf95-4f7b-4713-b1d4-59d1d049b6de.png)

- SequentialExecutor là trình thực thi mặc định ra được cài đặt. Như tên được đề xuất, các tác vụ sẽ được thực hiện tuần tự. Ngay cả khi bạn có một toán tử chi nhánh và các tác vụ vẫn sẽ được thực hiện từng cái một theo thứ tự ` 'branch_a', 'branch_b', 'branch_c', 'branch_d' `
- LocalExecutor là công cụ tuyệt vời để thử nghiệm Airflow song song nhiều công việc, thực hiện các nhiệm vụ cho một môi trường sản xuất quy mô nhỏ. LocalExecutor chạy tác vụ trên cùng một nút với bộ lập lịch luồng không khí nhưng các bộ xử lý khác nhau. Có những người thực thi khác sử dụng loại này trong khi phân phối tác phẩm thực tế; ví dụ: KubernetesExecutor sẽ sử dụng LocalExecutor trong mỗi pod để chạy tác vụ.
- CeleryExecutor là lựa chọn hoàn thiện nhất cho Airflow vì hầu hết việc áp dụng Airflow ban đầu là sử dụng CeleryExecutor. Nó yêu cầu hỗ trợ cơ sở hạ tầng - phần phụ trợ của Celery và Celery’s backend (Redis hoặc RabbitMQ) bổ sung. Tuy nhiên, bạn sẽ có sự trợ giúp tốt hơn nhiều với tùy chọn này từ cộng đồng Airflow vì rất nhiều công ty đang chạy theo tùy chọn này.
- MesosExecutor là một trong những đóng góp ban đầu của cộng đồng. Tuy nhiên, vì Kubernetes được chấp nhận rộng rãi hơn Mesos, Cộng đồng Airflow cũng đang thảo luận về việc cho "nghỉ hưu" MesosExecutor. Trừ khi công ty của bạn đang chạy Mesos và bạn không thể chuyển sang Kubernetes trong vài năm tới và bạn muốn sử dụng Mesos để quản lý tài nguyên thực thi Airflow của mình, bạn có thể muốn chọn tùy chọn này. Nếu không, bạn nên tránh chọn MesosExecutor.
- Dask.org truyền cảm hứng cho DaskExecutor. Có một số cuộc thảo luận về việc loại bỏ DaskExecutor cũng như do thiếu sự sử dụng, mà DaskExecutor đã thất bại trên Airflow master trong nhiều tháng, nhưng không ai nhận thấy. Do ít sử dụng và hỗ trợ hơn, bạn cũng nên tránh chọn DaskExecutor.
- KubernetesExecutor được giới thiệu trong phiên bản 1.10.0 và được đóng góp bởi Bloomberg. Sự đóng góp này đặt ra một cột mốc quan trọng để Airflow tích hợp với hệ sinh thái Kubernetes. Mặc dù một vài phiên bản phụ đầu tiên bị lỗi, nhưng những phiên bản gần đây ổn định hơn. Nếu công ty của bạn có Kubernetes được áp dụng rộng rãi, KubernetesExecutor có thể là lựa chọn tốt nhất cho người thực thi Airflow. Một điều tuyệt vời khác về KubernetesExecutor là bạn có thể chuẩn bị các docker image khác nhau cho các tác vụ của mình, và nó mang lại cho bạn sự linh hoạt hơn tại đây. 
- DebugExecutor được giới thiệu trong 1.10.8. Nó có thể không được phân loại là một Executor; mục đích của DebugExecutor này là chạy với IDE. Nó tương tự như SequentialExecutor để chạy một tác vụ tại một thời điểm và nó hỗ trợ làm việc với các cảm biến.

Tóm lại, CeleryExecutor và KubernetesExecutor sẽ là một lựa chọn tuyệt vời cho môi trường sản xuất của bạn. LocalExecutor cũng là một ưu tiên được xem xét cho môi trường sản xuất. Nếu bạn có khối lượng công việc nhẹ hoặc phần lớn các tác vụ đang chạy trong các dịch vụ đám mây như AWS hoặc dịch vụ Azure, Airflow Executor đóng vai trò là người trung gian để nói chuyện với các dịch vụ khác nhau mà không thực sự chạy chúng, LocalExecutor cũng là lựa chọn khả thi để xem xét. SequentialExecutor và DebugExecutor dành cho mục đích thử nghiệm cục bộ. Bạn có thể sẽ bỏ qua chúng trong sản xuất. MesosExecutor và DaskExecutor bạn có thể muốn tránh dùng chúng do lộ trình phát triển tương lai của chúng trong hệ sinh thái Airflow.

## Thiết lập Airflow Executor như nào?
Hầu hết các cấu hình trên Airflow Executor được kiểm soát bởi airflow.cfg file. Các phần chức năng khác nhau tổ chức tệp trong ngoặc. Đối với lựa chọn Executor, bạn sẽ thấy trong phần cốt lõi (core), SequentialExecutor được chọn làm mặc định. Nó cho phép bạn chạy Airflow mà không cần thiết lập quá nhiều phụ thuộc. SequentialExecutor có thể làm việc trực tiếp với SQLite, cần được cài đặt với cài đặt Python. Như chúng ta đã thảo luận ở trên, bạn có thể chọn các loại trình thực thi khác nhau, nhưng mỗi loại yêu cầu thiết lập bổ sung trong tệp AirflowAirflow.cfg .
```
[core]
executor = SequentialExecutor
```
LocalExecutor cũng dễ thiết lập và nó yêu cầu cơ sở dữ liệu siêu dữ liệu phải là MySQL hoặc PostgreSQL thay vì SQLite. Sau khi LocalExecutor được thiết lập, 90% chức năng của trình thực thi luồng không khí sẽ được tiết lộ. 10% chức năng khác của Người thực thi là chạy Airflow theo cách phân tán.

CeleryExecutor có phần cấu hình của nó - `[celery]` . Có hai thành phần chính: Celery  và Celery backend. Celery là một hàng đợi tác vụ không đồng bộ. Với Celery, Airflow có thể mở rộng nhiệm vụ của mình cho nhiều worker để hoàn thành công việc nhanh hơn. Bạn có thể tìm thêm thiết lập tại Trang cần tây Airflow

KubernetesExecutor là đứa con yêu quý trong Airflow do sự phổ biến của Kubernetes. Nếu bạn có Kubernetes trong môi trường của mình, việc thiết lập KubernetesExecutor trong Airflow sẽ không quá tốn nhiều công sức. Việc thiết lập cơ bản sẽ xuất hiện trong bài viết sau :D 
## Cuối cùng:
Đây là một bước quan trọng để cơ sở hạ tầng Airflow thiết lập Executor thích hợp. Nếu bạn muốn Airflow không chỉ xử lý phần lập lịch mà còn chạy các tác vụ trên worker node, trình thực thi luồng không khí cung cấp thêm tiềm năng ở đây với khả năng phân tán của nó. Tôi hy vọng bài viết này có thể cung cấp cho bạn một số ý tưởng cơ bản về Airflow Executor. Chúc vuiiiiii!
# Kham khảo:
[Airflow documentation](https://airflow.apache.org/docs/)

[A Gentle Introduction To Understand Airflow Executor](https://towardsdatascience.com/a-gentle-introduction-to-understand-airflow-executor-b4f2fee211b1)

[Explore Airflow KubernetesExecutor on AWS and kops](https://chengzhizhao.medium.com/explore-airflow-kubernetesexecutor-on-aws-and-kops-1c4dd33e56e0)
Khi sử dụng hệ thống cloud service, điều chúng ta thường phải quan tâm đến không chỉ là hiệu suất hoạt động (performance) mà còn phải chú ý đến cả chi phí bỏ ra để duy trì hoạt động của hệ thống. Chắn hẳn là hệ thống lớn hay nhỏ nào cũng đã từng phải dùng đến những instance chuyên để chạy batch thực hiện các job lớn, thế nhưng việc chạy batch chỉ diễn ra vào một khoảng thời gian cố định trong ngày, trong tuần, hay thậm chí là trong tháng. Vậy nếu chúng ta sử dụng nguyên một instance chỉ để thực thi việc chạy batch thì chi phí bỏ ra là hơn mức cần thiết. Vậy thì hôm nay, chúng ta hãy cùng tìm hiểu một service giúp tối đa hóa chi phí trong scenario trên đó chính là AWS Batch.


### 1. AWS Batch là gì?

Theo như định nghĩa của AWS, thì AWS Batch có thể trợ giúp chúng ta chạy batch trên AWS cloud, AWS Batch loại bỏ việc monitor cũng như cấu hình các batch computing software, hay cả các resource mà chúng chạy trên. Service này có thể giám sát các resource một cách hiệu quả bằng cách lắng nghe và hồi đáp các job submitted theo thứ tự cũng như loại bỏ yếu tố ràng buộc về tài nguyên (ví dụ như job A quá nhỏ nhưng lại chạy cùng trên một instance type với spec cao để phù hợp với việc chạy job nặng B), tối đa hóa chi phí (như vấn đề chúng ta đã đề cập ở trên), và đưa về kết quả một cách kịp thời.

AWS cũng giúp chúng ta chạy bất kỳ batch nào với bất kì khối lượng tính toán (compute workload) trên bất kì scale nào. AWS Batch cũng tự động giám sát các tài nguyên và tối ưu việc phân bổ khối lượng tính toán dựa trên số lượng và scale của công việc. Với AWS Batch, như đã nói ở trên thì việc cài đặt, quản lý và cấu hình cho những phần mềm quản lý batch là không cần thiết, giúp cho người vận hành hệ thống tập trung đối đa vào việc phân tích kết quả và solving problems.

### 2. Các thành phần cơ bản của AWS Batch

AWS Batch là một service phân bố theo region, đơn giản hóa việc chạy batch job trên nhiều AZs trong một region. Bạn có thể tạo ra một môi trường AWS Batch nằm trong một VPC mới hoặc đã tồn tại. Sau khi một môi trường đã được tạo ra, bạn có thể định nghĩa các job bằng cách khai báo image Docker nào sẽ chạy job của bạn. Các image này có thể được lưu trong và pull về từ các docker registries nằm ngoài hoặc trong AWS cloud của bạn.

#### Jobs

Đây là một đơn vị công việc, có thể là một shell script, một chương trình thực thi trên Linux hay là một docker image mà bạn submit lên AWS Batch. Nó có tên gọi, và chạy như là một container application trên AWS Fargate hoặc là EC2 instance trong môi trường của bạn, sử dụng các parameters mà bạn định nghĩa trong job definition. Các job có thể gọi đến các job khác thông qua tên hoặc ID, và có thể phụ thuộc vào trạng thái thành công hay thất bại của các job khác.

#### Job queues

Khi bạn submit một job, bạn submit nó vào một job queue cụ thể nào đó, job đó sẽ chờ trong queue cho đến khi nó được lập lịch và chạy trên một compute environment. Bạn sẽ liên kết một hoặc nhiều compute environment với một job queue, và bạn cũng có thể gán độ ưu tiên cho các compute environment và thậm chí là độ ưu tiên giữa các job queue.

Ví dụ: bạn có thể có một queue có độ ưu tiên cao để thực thi một số job cần nhiều tài nguyên tính toán, và có một queue có độ ưu tiên thấp hơn để chạy bất kì lúc nào với tài nguyên rẻ hơn.

#### Định nghĩa job hay job definition

Job definition chỉ ra job sẽ được chạy thế nào, nó như là một bản vẽ cho các resource sử dụng trong job của bạn. Bạn có thể cung cấp cho job của bạn IAM roles để cung cấp khả năng truy cập đến các resource khác, và bạn cũng có thể định nghĩa cấu hình memory hay CPU.

Job definition cũng kiểm soát các thuộc tính của container, biến môi trường, và mount point của các đơn vị lưu trữ vĩnh viễn. Các định nghĩa này cũng có thể bị override bằng việc gán các giá trị khác khi submit một job cụ thể.

#### Compute environment hay môi trường tính toán

Một compute environment là một tập các tài nguyên sử dụng để chạy jobs. Những tài nguyên được quản lý cho phép bạn định nghĩa những instance type mong muốn (EC2) ở những mức độ cụ thể khác nhau. Bạn có thể cài đặt một compute environment sử dụng một EC2 instance cụ thể, hay là một instance type cụ thể như là `c5.2xlarge` hay `m5.10xlarge`, hoặc đơn giản có thể là định nghĩa bạn muốn sử dụng instance type mới nhất. Bạn cũng có thể định nghĩa số lượng vCPUs tối thiểu, mong muốn, hay tối đa cho môi trường đó, cùng với đó là có thể cài đặt mong muốn sử dụng Spot instance hay không. 

AWS Batch sẽ launch, quản lý, và terminate các resource một cách hiệu quả. Vì thế, công việc của bạn là cài đặt, scaling instance trên ECS cluster mà AWS Batch tạo ra cho bạn

Như vậy chúng ta đã điểm qua một số thành phần chính của AWS Batch, bây giờ chúng ta hãy thử làm một ví dụ để hiểu được cách vận hành AWS Batch như thế nào.

### Bắt đầu với AWS Batch

Chúng ta có thể bắt đầu với việc chạy first-run wizard bằng cách truy cập link sau: https://console.aws.amazon.com/batch/v2/home?region=us-east-1#wizard

Sau khi truy cập, tại step 1 trên AWS console, chúng ta sẽ bắt đầu định nghĩa Compute environment. Thông tin bao gồm:
- Config environment: những thông tin cơ bản của môi trường
    - Tên của environment.
    - Role của service
- Config cho instance:
    - Provision model: bạn có thể lựa chọn giữa AWS Fargate (loại thường hoặc spot) hoặc EC2 instance (on-demand hoặc spot instance).
    - Minimum, desired, maximum vCPUs: số lượng vCPU bạn muốn cho môi trường này.
    - Allowed instance type: Bạn có thể chọn nhiều loại instance ở bước này, hoặc chon lựa chọn optimal để AWS Batch lựa chọn loại instance phù hợp nhất cho bạn.
    - Allocation strategy hay chiến lược phân bổ: định nghĩa hành vi mà AWS Batch sẽ thực hiện khi nó cần thêm resource, parameter này chỉ áp dụng khi bạn chọn provision model là EC2
        - `BEST_FIT`: lựa chọn instance phù hợp nhất với chi phí thấp nhất, nếu không có instance type phù hợp hoặc bạn đã vượt quá giới hạn AWS service limits thì các job sẽ không chạy cho đến khi có instance type phù hợp. Chiến lược này cho bạn tối ưu hóa chi phí nhưng có thể giới hạn mặt scale.
        - `BEST_FIT_PROGRESSIVE`: cũng giống `BEST_FIT` nhưng nó sẽ chọn lựa một loại instance type gần như phù hợp nhất, khi instance type cài đặt hiện tại không đủ số lượng, nó sẽ chọn sang loại instance type tiếp theo, lựa chọn này có thể vượt quá số lương max vCPU.
- Networking: lựa chọn VPC và subnet bạn muốn launch instance của bạn.
- EC2 tag: tag sẽ apply cho instance khi nó được launch trong môi trường này.

![](https://images.viblo.asia/0453d800-4a15-4539-9581-5e40156666f8.png)

Ở bước hai, chúng ta sẽ định nghĩa các thông tin cho job queue. Thông tin bao gồm:
- Queue name
- Độ ưu tiên (Priority) cho queue này.
- State: Enable/Disable
- Tag cho queue

![](https://images.viblo.asia/c9ab1ff9-0a2e-46b7-81fa-d7264fd7d81f.png)

Bước ba là định nghĩa job definition, ở bước này chúng ta sẽ định nghĩa các thông tin sau:
- Name của job definition
- Thời gian timeout: giới hạn thực thi của một job.
- Container properties: cấu hình các thuộc tính như là image, command thực thi chạy batch, số lượng CPU cần thiết cho định nghĩa job này, giới hạn memory, thậm chí GPU nếu job của bạn cần sử dụng đến.
- Định nghĩa parameter, các parameter này có thể bị override khi submit một job cụ thể.
- Tag của job definition
- Propagate Tags cho phép bạn truyền các tag gắn cho job definition cho ECS task, để tiện cho việc quản lý và theo dõi hoạt động của hệ thống.

![](https://images.viblo.asia/4f172620-50c6-478b-ad8b-92200cde2fda.png)

Bước bốn, submit job đầu tiên của bạn: bước này chứa các định nghĩa giống với job definition, nếu bạn muốn override lại option nào thì có thể định nghĩa thêm, chúng ta sẽ next sang bước tiếp theo để review và create.

Sau khi review xong ở bước năm, chúng ta sẽ nhấn create và chờ cho các resource được tạo.

Khi các resource đã được tạo xong, bạn có thể truy cập vào từng tài nguyên ở AWS Batch dashboard để theo dõi. Bài viết của mình hôm nay mang tính chất giới thiệu đến cho các bạn cái nhìn tổng quan về AWS Batch service của AWS, những phần nâng cao hơn lập lịch cho job, tích hợp với các service khác hay logging, lưu trữ mình sẽ trình bày ở các bài viết sắp tới.


-----

Tham khảo: https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html
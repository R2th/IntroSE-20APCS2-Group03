## Giới thiệu
Chào các bạn tới với series nói về kubernetes patterns, trong series này mình sẽ nói về một vài patterns ở trong kubernetes mà giúp ta hiểu rõ hơn về cách hoạt động của nó và cách tổ chức các resource hiệu quả hơn.

![image.png](https://images.viblo.asia/255c34e7-742e-413a-bd36-963fc4323172.png)

Patterns đầu tiên ta sẽ tìm hiểu là Behavioral Patterns, bao gồm patterns sau:
1. Batch Job: làm sao để chạy một job ở trong k8s.
2. Periodic Job: làm sao để chỉ định chạy một job ở một mốc thời gian nhất định.
3. Singleton Service: chỉ một instance của service active ở một thời điểm nhưng vẫn đảm bảo highly available.
4. Service Discovery: làm sao các resource trong k8s phát hiện lẫn nhau thông qua Service.

![image.png](https://images.viblo.asia/e09ec43b-8865-42bb-9348-2b20566628fd.png)

## Batch Job
Batch Job là một pattern phù hợp cho việc quản lý những process mà chỉ cần chạy một lần, nó sẽ được thực hiện thông qua resource Job của kubernetes. Job sẽ giúp ta tạo một thằng Pod mà chỉ cần chạy trong khoảng thời gian ngắn và chỉ cần chạy một lần (nếu thành công).

Vậy tại sao Job lại giúp ta trong việc chạy những process một lần, ta có thể dùng ReplicaSet để tạo Pod chạy process cũng được vậy? Thì nếu ta dùng resource khác để tạo Pod cho các process mà ta chỉ cần chạy một lần, ta sẽ gặp các vấn đề sau.

### Unmanaged Pod
Nếu ta khai báo Pod như sau và dùng nó để chạy process chạy một lần.

```bash
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: random-generator
spec:
  restartPolicy: OnFailure
  containers:
  - image: k8spatterns/random-generator:1.0
    name: random-generator
    command: [ "java", "-cp", "/", "RandomRunner", "/numbers.txt", "10000" ]
EOF
```

Thì nếu trong quá trình nó đang chạy, server của ta mà bị chết thì process đó của ta cũng bị mất theo luôn. Vì thằng pod này nó không được quản lý bởi bất cứ resource nào cả, nên nó sẽ không được tạo ra lại. Do đó ta gọi những Pod thế này là unmanaged pod.

### Managed Pod
Nếu ta dùng ReplicaSet để tạo Pod.

```bash
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: random-generator
spec:
  selector:
    matchLabels:
      app: run
  template:
    metadata:
      labels:
        app: run
    spec:
      containers:
        - image: k8spatterns/random-generator:1.0
          name: random-generator
          command: [ "java", "-cp", "/", "RandomRunner", "/numbers.txt", "10000" ]
EOF
```

Thì Pod đó được gọi là  managed pod, khi Pod ta đang chạy mà server bị chết, Pod đó của ta sẽ được tạo ở server khác, process sẽ được chạy lại. Nhưng mà khi Pod của ta chạy thành công, và nó đang nằm trên server nào đó, server đó chết, Pod nằm trên server đó sẽ được tạo lại ở server khác, process của ta nó sẽ chạy lại lần nữa, mà ta thì không muốn như vậy.

### Job run Pod
Để giải quyết vấn đề đó, K8S sinh ra thằng Job cho ta, nó sẽ tạo Pod cho ta, nếu Pod chưa chạy xong mà server bị chết, Pod sẽ được di chuyển qua server khác, nhưng khi Pod chạy thành công, thì Pod nó nằm trên một server nào đó, nếu server có chết thì Pod cũng sẽ không được tạo ra lại => process của ta chỉ chạy 1 lần.

Để tạo Job, ta dùng khai báo kind là Job, như sau:

```bash
cat <<EOF | kubectl apply -f -
apiVersion: batch/v1
kind: Job
metadata:
  name: random-generator
spec:
  completions: 5
  template:
    metadata:
      labels:
        app: run
    spec:
      containers:
        - image: k8spatterns/random-generator:1.0
          name: random-generator
          command: [ "java", "-cp", "/", "RandomRunner", "/numbers.txt", "10000" ]
EOF
```

Ở trên ta tạo một Job mà sẽ run 5 Pod và chắc chắn là 5 Pod này được chạy thành công. Mặc định thì mỗi lần thì nó chỉ tạo ra 1 Pod để chạy, ta có thể tăng số lượng Pod mà Job tạo ra 1 lần bằng thuộc tính parallelism.

```bash
cat <<EOF | kubectl apply -f -
apiVersion: batch/v1
kind: Job
metadata:
  name: random-generator
spec:
  completions: 5
  parallelism: 2
  template:
    metadata:
      labels:
        app: run
    spec:
      containers:
        - image: k8spatterns/random-generator:1.0
          name: random-generator
          command: [ "java", "-cp", "/", "RandomRunner", "/numbers.txt", "10000" ]
EOF
```

Minh họa.

![image.png](https://images.viblo.asia/5b376e91-f06e-4edb-825e-3b27e9dd049a.png)

Từ hai thuộc tính `.spec.completions` và `.spec.parallelism`, ta có thể control Job chạy Pod theo những cách sau:
1. **Single Pod Job:** job mà không chỉ định thuộc tính `.spec.completions` và  `.spec.parallelism` hoặc chỉ định 1 trong 2 với giá trị là 1. Job sẽ chỉ tạo 1 Pod.
2. **Fixed completion count Jobs:** job mà chỉ định thuộc tính `.spec.completions` lớn hơn một.
3. **Work queue Jobs:** job mà chỉ định thuộc tính `.spec.parallelism` lớn hơn 1 và không chỉ định thuộc tính `.spec.completions`, Pod sẽ được chạy tuần tự.

> Đây là những keywork để bạn tìm kiếm thêm best practice về Job:
> + Batch Job Example
> + Run to Completion Finite Workloads
> + Parallel Processing Using Expansions
> + Coarse Parallel Processing Using a Work Queue
> + Fine Parallel Processing Using a Work Queue
> + Indexed Job Created with Metacontroller
> + Java Batch Processing Frameworks and Libraries

## Periodic Job
Periodic Job pattern là một pattern mở rộng của Batch Job pattern, cho phép ta chạy một process ở một mốc thời gian nhất định và lập đi lập lại. Nó giống như ta cấu hình chạy job scheduler ở dưới linux. Kubernetes cung cấp cho ta một resource mà có thể hành động giống y như job scheduler ở dưới linux là CronJob resource.

![image.png](https://images.viblo.asia/e6f3a0a1-07ee-41f4-b15a-1c20211cd79f.png)

CronJob sẽ cho phép ta cấu hình trong một khoảng thời gian bao lâu thì nó ra một Job cho ta. Ví dụ, để tạo một CronJob mà cứ 3 phút thì sẽ được thực thi để tạo ra một Job.

```bash
cat <<EOF | kubectl apply -f -
apiVersion: batch/v1
kind: CronJob
metadata:
  name: random-generator
spec:
  schedule: "*/3 * * * *"
  jobTemplate:
    spec:
      template:
        metadata:
          labels:
            app: run
        spec:
          containers:
            - image: k8spatterns/random-generator:1.0
              name: random-generator
              command: [ "java", "-cp", "/", "RandomRunner", "/numbers.txt", "10000" ]
EOF
```

Thuộc tính schedule là chỗ ta định nghĩa trong khoảng thời gian bao lâu thì CronJob sẽ tạo ra một Job. Syntax của thuộc tính schedule như sau:

```
# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0 - 23)
# │ │ ┌───────────── day of the month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
# │ │ │ │ │                                   7 is also Sunday on some systems)
# │ │ │ │ │
# │ │ │ │ │
# * * * * *
```

> Đây là những keywork để bạn tìm kiếm thêm best practice về CronJob:
> + Periodic Job Example
> + Cron Jobs
> + Cron

### Kết luận
Vậy là ta đã tìm hiểu xong về Batch Job và Periodic Job patterns ở trong kubernetes bằng cách sử dụng Job và CronJob resource. Thay vì phải cấu hình cronjob để trên một server linux nào đó, ta có thể sử dụng CronJob trong K8S để nó dễ dàng integrate với các resource khác trong K8S, ngoài ra ta có thể dễ dàng xem lại logs của Job đã chạy và xem được các thông số về CPU và RAM của process đó, và ta cũng có thể control số lượng job ta cần chạy một lúc để task của ta được xử lý nhanh hơn. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Hẹn gặp mọi người ở bài tiếp theo ta sẽ nói tiếp về **Singleton Service**.

## Mục tìm kiếm đồng đội
Hiện tại thì bên công ty mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và là trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn để cần giải quyết, và sẽ có rất nhiều bài toàn thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `hmquan08011996@gmail.com`. Cảm ơn các bạn đã đọc.
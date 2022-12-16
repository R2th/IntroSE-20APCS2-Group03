## Giới thiệu
Chào các bạn tới với series về kubernetes patterns. Loạt bài tiếp theo chúng ta sẽ đi tiếp qua một loại pattern khác là Structural Patterns, bài đầu tiên chúng ta sẽ tìm hiểu về Init Container.

![image.png](https://images.viblo.asia/ca314bec-0b86-4bfc-9a1a-5c0a7e904d05.png)

Structural Patterns sẽ bao gồm các pattern sau đây:
1. Init Container.
2. Sidecar.
3. Adapter.
4. Ambassador.

## Init Containers
Init containers là những container được thực thi ở quá trình khởi tạo Pod (Initialization Stage), các init container sẽ được thực thi trước khi các application container của Pod thực thi. Trong một Pod ta có thể khai báo một hay nhiều init containers, và chúng sẽ được thực thi theo thứ tự ta khai báo.

Init containers được sử dụng để khởi tạo resource hoặc cấu hình những thứ cần thiết cho application containers. Ví dụ như trong ngôn ngữ JAVA và PHP, khi ta viết một Class và cần cấu hình những giá trị cần thiết cho Class đó khi nó được tạo, thì ta sẽ khai báo một Constructors cho nó. Init containers cũng tượng tự như vậy, nhưng sẽ ở Pod level.

![image.png](https://images.viblo.asia/96ffd992-9a28-44dd-a99a-8ef2953c0665.png)
*<div align="center">Image from [Kubernetes Patterns](https://www.oreilly.com/library/view/kubernetes-patterns/9781492050278/)</div>*

Như hình mình họa ở trên, bạn có thể thấy một Pod được tách ra thành hai phần là: init containers và application containers. Tất cả init containers sẽ được chạy theo thứ tự, từng cái một sẽ được thực thi, và khi tất cả init containers được thực thi xong thì application containers mới được chạy, **và nếu ta có nhiều application container thì tất cả application containers sẽ được thực thi song song với nhau chứ không phải theo thứ tự như init containers**.

### Example
Ví dụ, ta dùng StatefulSet để tạo một Pod sử dụng cho Database Postgres Replica, file yaml sẽ như sau.

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres-standby
  labels:
    component: postgres-standby
spec:
  selector:
    matchLabels:
      component: postgres-standby
  serviceName: postgres-standby
  template:
    metadata:
      labels:
        component: postgres-standby
    spec:
      initContainers:
        - name: busybox
          image: busybox
          command:
            - sh
            - -c
            - "cp /var/config/postgresql.conf /var/lib/postgresql/data/postgresql.conf && cp /var/config/recovery.conf /var/lib/postgresql/data/recovery.conf"
          volumeMounts:
            - mountPath: /var/lib/postgresql/data
              name: postgres-data
            - mountPath: /var/config/postgresql.conf
              subPath: postgresql.conf
              name: postgres-standby-cm
            - mountPath: /var/config/recovery.conf
              subPath: recovery.conf
              name: postgres-standby-cm
      containers:
        - name: postgres
          image: postgres:11
          ports:
            - containerPort: 5432
          env:
            - name: POSTGRES_USER
              value: postgres
            - name: POSTGRES_PASSWORD
              value: postgres
          volumeMounts:
            - mountPath: /var/lib/postgresql/data
              name: postgres-data
      volumes:
        - name: postgres-standby-cm
          configMap:
            name: postgres-standby-cm
  volumeClaimTemplates:
    - metadata:
        name: postgres-data
      spec:
        accessModes:
          - ReadWriteOnce
        resources:
          requests:
            storage: 5Gi
```

Pod của ta ở trên sẽ có nhiệm vụ tạo một database replicas từ một database master. Ta dùng init containers để thiết lập cấu hình cho database application container, công việc mà nó thực hiện như sau:
1. Ta có một Configmap tên là `postgres-standby-cm`, bên trong nó sẽ có hai file config là `postgresql.conf` và `recovery.conf` chứa những thứ cần thiết để ta thiết lập database replicas. Ta mount nó vào bên trong init containers.
2. Khi init containers được chạy, ta thực thi câu lệnh copy hai file cấu hình này vào bên trong PVC `postgres-data` mà sẽ dùng cho database container.
3. Khi database container chạy nó sẽ có hai file cấu hình khi nãy mà ta đã dùng init containers để copy qua.

Lý do ta không mount thẳng hai file config này vào database container là vì nó sẽ bị lỗi, các bạn làm thử sẽ thấy `:)))`, đó là lý do vì sao ta cần dùng init containers.

## Things need to note
Khi làm việc với init containers ta cần lưu ý các điểm sau.

### Init container need to small
Các init container bên trong một Pod nên nhẹ nhất có thể và chỉ nên thực thi các công việc không quá phức tạp và nhanh chóng.

Thứ nhất là vì các init container sẽ được chạy tuần tự nên nếu một init container nào đó chạy quá lâu thì nó sẽ làm delay quá trình chạy application containers.

Thứ hai là nếu một init container chạy thất bại, toàn bộ Pod sẽ bị restart (nếu ta không thêm thuộc tính RestartNever), lúc này toàn bộ init container sẽ chạy lại luôn.

Do đó để tránh các init container ảnh hưởng tới application containers thì ta chỉ nên dùng nó để thực thi các công việc đơn giản.

### How to init containers affect Pod resources
Best practices khi ta khai báo Pod là ta nên định nghĩa resource request và limit cho nó, các bạn đọc bài này để hiểu rõ hơn nhé [Quản lý và tính toán tài nguyên sử dụng cho Pod](https://viblo.asia/p/kubernetes-series-bai-15-quan-ly-va-tinh-toan-tai-nguyen-su-dung-cho-pod-GrLZDB9n5k0).

Nếu ta có thêm init containers thì resource request và limit của Pod sẽ được tính như thế nào? Pod  request và limit sẽ tính theo hai group như sau:
1. Giá trị request và limit lớn nhất của init container.
2. Tổng giá trị request và limit của toàn bộ application container.

**Trong hai số trên, số nào lớn hơn thì số đó sẽ được lấy làm giá trị request và limit của Pod.** Điểm này quan trọng, các bạn note lại để đi phỏng vấn nhé `:)))`.

> More Information
> + Init Container Example
> + Init Containers
> + Configuring Pod Initialization
> + The Initializer Pattern in JavaScript
> + Object Initialization in Swift
> + Using Admission Controllers
> + Dynamic Admission Control
> + How Kubernetes Initializers Work
> + Pod Preset
> + Inject Information into Pods Using a PodPreset
> + Kubernetes Initializer Tutorial

## Kết luận
Vậy là ta đã tìm hiểu xong về init containers, ta sử dụng nó để khỏi tạo resource và cấu hình cho application containers. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Hiện tại thì công ty bên mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và sở hữu trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java, Go). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java, Go). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221
+ Manual QC. https://tuyendung.hoang-phuc.com/job/seniorjunior-manual-qc-1039

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn đề cần giải quyết, và sẽ có rất nhiều bài toán thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `hmquan08011996@gmail.com`. Cảm ơn các bạn đã đọc.
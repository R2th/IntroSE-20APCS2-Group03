# Mở đầu
Khi Kubernetes lên lịch cho Pod ( tức là ra quyết định deploy pods với tài nguyên như thế nào và deploy trên node nào nếu là cụm kubernetes cluster), thì điều quan trọng là các container có đủ tài nguyên để hoạt động hiệu quả. Nếu bạn lên lịch cho một ứng dụng lớn trên một node có tài nguyên hạn chế, thì node đó có thể hết bộ nhớ hoặc tài nguyên CPU và mọi thứ ngừng hoạt động! Ngay cả trong quá trình vận hành, có rất nhiều nguyên nhân như cấu hình không tốt, do lỗi code,.. có thể dẫn đến việc ứng dụng của bạn sử dụng tài nguyên hơn mức cần thiết. Và dù lỗi xảy ra vì nguyên nhân gì, chúng ta cũng cần tìm ra các giải pháp để kiểm soát chúng một cách tốt nhất có thể.
Một trong những giải pháp để bạn có thể giải quyết những vấn đề là bằng cách chỉ định các Request (yêu cầu) và Limit (giới hạn) tài nguyên.
# Request và Limit resource là gì và hoạt động như thế nào?

**Request (yêu cầu)** và **Limits (giới hạn)** là cơ chế Kubernetes sử dụng để kiểm soát các tài nguyên như CPU và memory (bộ nhớ) của container:
- Request là những gì container được đảm bảo nhận được. Nếu một container yêu cầu một tài nguyên, Kubernetes sẽ chỉ lập lịch cho nó trên một node có thể cung cấp cho nó tài nguyên đó. 
- Mặt khác, các Limits đảm bảo rằng một container không bao giờ vượt quá một giá trị nhất định. Container chỉ được phép đi đến giới hạn, và sau đó nó bị hạn chế.

Một Pod là một khái niệm trừu tượng của Kubernetes, đại diện cho một nhóm gồm một hoặc nhiều ứng dụng containers (ví dụ như Docker hoặc rkt) và một số tài nguyên được chia sẻ cho các containers đó. Đến lượt mình, các pod có thể được triển khai và quản lý trên các node. Mỗi node trong một cụm Kubernetes có một lượng bộ nhớ (RAM) và CPU được phân bổ có thể được sử dụng để chạy các pods. 

Các yêu cầu và giới hạn tài nguyên là các tham số tùy chọn được chỉ định ở cấp độ của container. Kubernetes tính toán một yêu cầu và giới hạn của Pod bằng giá trị tổng hợp yêu cầu và giới hạn trên tất cả các container của nó. Kubernetes sau đó sẽ sử dụng các tham số này để lên lịch và quyết định phân bổ tài nguyên cho pods.

![](https://images.viblo.asia/6c9663cb-0f3f-4c84-aaff-985ff6023072.png)

### Request – Yêu cầu

Pods sẽ nhận được số lượng bộ nhớ mà nó yêu cầu. Nếu vượt quá yêu cầu bộ nhớ, bộ nhớ có thể bị kill (loại bỏ) nếu một Pod khác nảy sinh nhu cầu với bộ nhớ này. Pods chỉ bị loại bỏ khi sử dụng ít bộ nhớ hơn yêu cầu nếu hệ thống quan trọng hoặc workload ưu tiên cần bộ nhớ.

Tương tự, container trong Pod được phân bổ số lượng CPU mà nó yêu cầu, nếu có sẵn. CPU cũng có thể được phân bổ các chu kỳ CPU bổ sung nếu các Pods hoặc công việc khác không cần tới tài nguyên có sẵn này.

**Lưu ý:** nếu tổng số yêu cầu Pod không có sẵn trên một node , thì Pod sẽ vẫn ở trạng thái “Pending state” (Đang chờ xử lý, tức là không chạy) cho đến khi các tài nguyên này khả dụng.

### Limits – Giới hạn

- Giới hạn tài nguyên giúp bộ lập lịch Kubernetes xử lý tốt hơn sự tranh chấp tài nguyên. Khi một Pod sử dụng nhiều bộ nhớ hơn giới hạn của nó, các tiến trình của nó sẽ bị kernel loại bỏ (kill) để bảo vệ các ứng dụng khác trong cluster. Pods sẽ được điều chỉnh CPU khi vượt quá giới hạn CPU của chúng.
- Nếu không có giới hạn nào được đặt, thì các pods có thể sử dụng bộ nhớ và CPU dư thừa khi khả dụng.
- Nếu bạn chỉ định giới hạn CPU cho container nhưng không chỉ định yêu cầu CPU, Kubernetes sẽ tự động chỉ định yêu cầu CPU phù hợp với giới hạn. Tương tự, nếu một container chỉ định giới hạn bộ nhớ của riêng nó, nhưng không chỉ định yêu cầu bộ nhớ, Kubernetes sẽ tự động gán một yêu cầu bộ nhớ phù hợp với giới hạn.

**Lưu ý:** Điều quan trọng cần nhớ là Limits không bao giờ được thấp hơn Request. Bạn có thể thử đặt các giá trị như vậy, Kubernetes sẽ báo lỗi và không cho phép bạn chạy container của mình đâu :D
# Define resuorce Request và Limit

Để xác định Request và Limit resource cho container triển khai, ta có thể thực hiện theo 2 cách sau:

### Sử dụng Kubectl command

Chúng ta có thể tạo pods đồng thời đặt các giá trị thông qua Kubectl command. Ví dụ như sau:
```
kubectl run nginx \
  --image=nginx \
  --requests=cpu=100m,memory=256Mi \
  --limits=cpu=200m,memory=512Mi \
  --namespace=test-resources
```

Với:
- `--image`: sử dụng image nginx để tạo container
- `--requests`: đặt các giá trị requests cho cpu và bộ nhớ
- `--limits`: đặt các giá trị limits cho cpu và bộ nhớ
- `--namespace`: deploy pods vào namespace test-resources

Sau đó, kiểm tra lại pods vừa tạo được với command `kubectl describe pods nginx --namespace=test-resources` sẽ thấy được:

```
...
    State:          Running
      Started:      Mon, 09 Nov 2020 10:50:03 +0700
    Ready:          True
    Restart Count:  0
    Limits:
      cpu:     200m
      memory:  512Mi
    Requests:
      cpu:        100m
      memory:     256Mi
    Environment:  <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-t2sqm (ro)
...
```
### Sử dụng manifest file (file yaml)

Với manifest file, chúng ta có thể sử dụng các trường `containers.resources.limits` và `containers.resources.request` để define các giá trị limits và requests cho container. Hãy cùng theo dõi ví dụ dưới đây, một `deployment` được define trong file yaml, nó triển khai 1 deployment với 1 pods bao gồm 2 container, mỗi container được xác định các giá trị requests và limits khác nhau:

```
kind: Deployment
apiVersion: apps/v1
metadata:
 name: redis
 labels:
   name: redis-deployment
   app: example-test-resources
spec:
 replicas: 1
 selector:
   matchLabels:
    name: redis
    role: redisdb
    app: example-test-resources
 template:
   spec:
     containers:
       - name: redis
         image: redis:5.0.3-alpine
         resources:
           limits:
             memory: 600Mi
             cpu: 1
           requests:
             memory: 300Mi
             cpu: 500m
       - name: busybox
         image: busybox:1.28
         resources:
           limits:
             memory: 200Mi
             cpu: 300m
           requests:
             memory: 100Mi
             cpu: 100m
```
# Tạm kết 

Việc đặt các request (yêu cầu) và limit (giới hạn) tài nguyên của Kubernetes một cách hiệu quả sẽ tác động mạnh đến hiệu suất, tính ổn định và chi phí của ứng dụng. Tuy nhiên, khi phát triển ứng dụng, ta cần phải có các phương pháp dự đoán tải, phân tích nhu cầu sử dụng tài nguyên và cải thiện khả năng phục hồi của hệ thống để xác định được các giá trị tối ưu. Đừng đợi cho đến khi có sự cố xảy ra, lúc mà ứng dụng của bạn đang chạy trên production mới tìm hiểu những yêu cầu và giới hạn tài nguyên nào nên được đặt nhé :)))
# Nguồn tham khảo
- http://blog.kubecost.com/blog/requests-and-limits/
- https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
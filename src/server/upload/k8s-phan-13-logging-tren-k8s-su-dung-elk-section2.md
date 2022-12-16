# Lời tựa
Tiếp tục về chủ đề logging trên Kubernetes, bài viết này sẽ đi vào xây dựng môi trường và thiết kế giải pháp trước khi xây dựng hệ thống logging ELK.

**Trong bài trước mình đã tự đặt ra một bài toán như sau:**
- Hệ thống có sử dụng một vài opensource như vernemq, kafka --> Cần dựng log tập trung và lưu trữ 7 ngày
- Các service (do mình phát triển) được triển khai dưới dạng deployment --> Cần lưu log 30 ngày
- Các dữ liệu log không cần thực hiện parsing, tuy nhiên vẫn cần xây dựng hệ thống phân tích log, các rule parsing sẽ được bổ sung sau
- Thực hiện khai báo các template để query dữ liệu log của từng service trên kibana

Trong nội dung bài viết này mình sẽ hướng dẫn cách dựng hệ thống logging đáp ứng các yêu cầu bên trên.

# Giới thiệu
Mình muốn giới thiệu lại một chút và kiến trúc hệ thống lab mà mình đang dựng và dùng để viết series hướng dẫn này. Mọi người có thể xem lại chi tiết ở đây: https://viblo.asia/p/k8s-phan-2-cai-dat-kubernetes-cluster-va-rancher-m68Z0BL95kG

Quay trở lại bài toán logging, mình cần setup môi trường trước khi dựng logging. Ý tưởng như sau:

## Xây dựng môi trường:
- Cài đặt ứng dụng viettq-order bằng deployment với 5 replicas (5 pod). 
- Cài đặt ứng dụng viettq-billing bằng deployment với 3 replicas (2 pod). 
- Mỗi container của ứng dụng trên, mỗi giây sẽ thực hiện ghi log ra output các thông tin node, pod name, pod IP, namespace..
- Cài đặt opensource gồm vernemq, kafka/zookeeper 

## Xây dựng giải pháp

***- Filebeat:***
    
- Cài bằng helm chart, nó sẽ được deploy dưới dạng daemonset để được chạy trên tất cả các worker-node để làm nhiệm vụ collect log
- Cấu hình input của filebeat để lấy log của các ứng dụng viettq-order, viettq-billing và gán tags là "**myservice**" trước khi đẩy sang Logstash
- Cấu hình input của filebeat để lấy log của vernemq, kafka và zookeeper và gán tags là "**myopensource**" trước khi đẩy sang Logstash
- Input của filebeat là đường dẫn tới file log, ta sẽ cấu hình theo tên bắt đầu của file. 
- Output của filebeat là địa chỉ của logstash

***- Logstash:***    
- Cài bằng helm chart, nó sẽ được deploy dưới dạng deployment, làm nhiệm vụ lấy log từ filebeat gửi tới, thực hiện xử lý dữ liệu và đẩy output ra elastic search
- Cấu hình input nhận dữ liệu từ filebeat
- Xử lý dữ liệu:
    - Với input có tag là "**myservice**" thì đẩy vào index có tên ***logstash-myservice-{YYYY-MM-dd}***
    - Với input có tag là "**myopensource**" thì đẩy vào index có tên ***logstash-myopensource-{YYYY-MM-dd}***
- Output của logstash là địa chỉ của elastic search và index mà nó sẽ ghi dữ liệu vào

**NOTE: Không biết có ai thắc mắc tại sao mình phải tách riêng index lưu trữ cho myservice và myopensource không nhỉ? Đó là do yêu cầu đề bài, mỗi service này được cấu hình lưu dữ liệu khác nhau. Myservice thì được lưu 30 ngày, trong khi myopensource chỉ lưu 7 ngày. Do đó mình phải tách riêng index trên elasticsearch để dữ thực hiện log ratation sau này**

***- Elastic Search:***    
- Cài bằng helm chart, elastic search là nơi lưu trữ log gửi từ logstash
- Việc xóa dữ liệu cũ trên elastic search được thực hiện bằng cách xóa các indices cũ (theo thời gian)
- Việc xóa indices có thể thực hiện tự động bằng một phần mềm gọi là "**elastic-curator**", sẽ được đề cập trong phần sau

***- Kibana:***    
- Cài bằng helm chart. Kibana là giao diện web để thực hiện các thao tác xem log và thực hiện các tác vụ thống kê. 
- Cấu hình input của kibana là thông tin của elastic search vf tạo các index pattern để đọc dữ liệu từ elastic search
- Ta sẽ filer log của từng ứng dụng bằng các keyword tương ứng

## Cơ bản ta sẽ thực hiện xây dựng hệ thống theo phương án như thế này:
![image.png](https://images.viblo.asia/70a166b9-4ec6-4eb4-a67a-730ac6e8136a.png)
**Mô tả:**
**Filebeat** sẽ lấy các log file của container trên các worker-node ở đường dẫn **/var/log/containers**. Ta cấu hình filebeat thực hiện đọc các file log có tên dạng "viettq*" thì nó sẽ gán thêm tags là "**myservice**", và đọc các file log có dạng (vernemq*|kafka*|zookeeper*) thì gán tags là "**myopensource**".

**Logstash** đọc dữ liệu từ filebeat gửi về. Với các dữ liệu có gắn tags "**myservice**" thì nó chuyển tới output là index có tên ***logstash-myservice-{YYYY-MM-dd}*** trên elastic search. Với các dữ liệu có gắn tags "**myopensource**" thì nó chuyển tới output là index có tên ***logstash-myopensource-{YYYY-MM-dd}***

***Sau này khi có nhu cầu parse log thì ta sẽ bổ sung các rule filter vào pipeline của logstash sau mà không cần thay đổi cấu hình của các thành phần khác của hệ thống.***

# Cài đặt môi trường 
Tất cả các bước cài đặt này mình đều cài trên namespace là **prod**. Và lưu ý tất các mọi thao tác cài đặt mình đều thực hiện trên node **vtq-cicd** để lưu các file cấu hình tập trung.  
***Các file cài đặt cho phần opensource và phần myservice mình có để ở trên github, các bạn có thể tham khảo ở đây: https://github.com/rockman88v/logging-with-elk.git***

## Cài đặt opensource
***Với mục đích là cài đặt để demo phần logging nên các opensource này mình đều cài ở mức đơn giản nhất có thể, ko dùng persistent volume, và chỉ cấu hình 1 replicas cho mỗi service. Các bạn hoàn toàn có thể cài các opensource khác mà các bạn quen dùng hơn để tiết kiệm thời gian chứ không nhất thiết phải cài đúng các opensource như bên dưới. Nhưng lưu ý tên deployment vì nó sẽ là từ keyword của tên file log sau này mình sẽ collect nhé!***

### Cài đặt vernemq
**Setup helm repo và down helm chart của vernemq về máy:**
```
[sysadmin@vtq-cicd vernemq]$ mkdir -p /home/sysadmin/open-sources/vernemq
[sysadmin@vtq-cicd vernemq]$ cd /home/sysadmin/open-sources/vernemq
[sysadmin@vtq-cicd vernemq]$ helm repo add vernemq https://vernemq.github.io/docker-vernemq
"vernemq" already exists with the same configuration, skipping
[sysadmin@vtq-cicd vernemq]$ helm search repo vernemq
NAME            CHART VERSION   APP VERSION     DESCRIPTION
vernemq/vernemq 1.6.12          1.12.3          VerneMQ is a high-performance, distributed MQTT...
[sysadmin@vtq-cicd vernemq]$ helm pull vernemq/vernemq --version 1.6.12
[sysadmin@vtq-cicd vernemq]$ tar -xzf vernemq-1.6.12.tgz
[sysadmin@vtq-cicd vernemq]$ cp vernemq/values.yaml value-vernemq.yaml
[sysadmin@vtq-cicd vernemq]$ ls -lrt
total 20
drwxrwxr-x 3 sysadmin sysadmin    96 Jul 20 05:46 vernemq
-rwxr-xr-x 1 sysadmin sysadmin  7565 Jul 20 05:51 value-vernemq.yaml
-rw-r--r-- 1 sysadmin sysadmin 10035 Jul 21 03:10 vernemq-1.6.12.tgz
```

**Cấu hình file helm-value (value-vernemq.yaml):**
```
additionalEnv:
  - name: DOCKER_VERNEMQ_ALLOW_REGISTER_DURING_NETSPLIT
    value: "on"
  - name: DOCKER_VERNEMQ_ALLOW_PUBLISH_DURING_NETSPLIT
    value: "on"
  - name: DOCKER_VERNEMQ_ALLOW_SUBSCRIBE_DURING_NETSPLIT
    value: "on"
  - name: DOCKER_VERNEMQ_ALLOW_UNSUBSCRIBE_DURING_NETSPLIT
    value: "on"
  - name: API_KEY
    value: "xxxxxyyyyzzzz"
  - name: DOCKER_VERNEMQ_USER_vernemq
    value: "xxxxxyyyyzzzz"
  - name: DOCKER_VERNEMQ_ACCEPT_EULA
    value: "yes"
  - name: ALLOW_UNSECURED_MODE
    value: "true"
```
Cơ bản mình để các setting mặc định, chỉ thêm một số biến môi trường như trên.

**Cài đặt vernemq:**
```
[sysadmin@vtq-cicd vernemq]$ helm -n prod install vernemq -f value-vernemq.yaml vernemq
NAME: vernemq
LAST DEPLOYED: Wed Jul 20 05:48:55 2022
NAMESPACE: prod
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
1. Check your VerneMQ cluster status:
  kubectl exec --namespace prod vernemq-0 /vernemq/bin/vmq-admin cluster show

2. Get VerneMQ MQTT port
  Subscribe/publish MQTT messages there: 127.0.0.1:1883
  kubectl port-forward svc/vernemq 1883:1883
```

### Cài đặt zookeeper
**Setup helm repo và down helm chart của zookeeper về máy:**
```
[sysadmin@vtq-cicd]$ mkdir -p /home/sysadmin/open-sources/bitnami-zookeeper
[sysadmin@vtq-cicd]$ cd /home/sysadmin/open-sources/bitnami-zookeeper
[sysadmin@vtq-cicd bitnami-zookeeper]$ helm repo add bitnami https://charts.bitnami.com/bitnami
[sysadmin@vtq-cicd bitnami-zookeeper]$ helm pull bitnami/zookeeper --version 7.0.1
[sysadmin@vtq-cicd bitnami-zookeeper]$ tar -xzf zookeeper-7.0.1.tgz
[sysadmin@vtq-cicd bitnami-zookeeper]$ cp zookeeper/values.yaml value-zookeeper.yaml
```

**Cấu hình file helm-value (value-zookeeper.yaml):**
```
persistence:
  enabled: false
  # storageClass: "-"
  accessModes:
    - ReadWriteOnce
  size: 8Gi
  annotations: {}
```
Mình dùng hết tham số mặc định, và disable persistence để không tạo volume cho zookeeper (dựng làm lab nên chỉ cần nó chạy dc là dc :D )

**Cài đặt zookeeper:**
```
[sysadmin@vtq-cicd bitnami-zookeeper]$ helm -n prod install zookeeper -f value-zookeeper.yaml zookeeper
NAME: zookeeper
LAST DEPLOYED: Wed Jul 20 05:57:37 2022
NAMESPACE: prod
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
** Please be patient while the chart is being deployed **

ZooKeeper can be accessed via port 2181 on the following DNS name from within your cluster:

    zookeeper.prod.svc.cluster.local

To connect to your ZooKeeper server run the following commands:

    export POD_NAME=$(kubectl get pods --namespace prod -l "app.kubernetes.io/name=zookeeper,app.kubernetes.io/instance=zookeeper,app.kubernetes.io/component=zookeeper" -o jsonpath="{.items[0].metadata.name}")
    kubectl exec -it $POD_NAME -- zkCli.sh

To connect to your ZooKeeper server from outside the cluster execute the following commands:

    kubectl port-forward --namespace prod svc/zookeeper 2181:2181 &
    zkCli.sh 127.0.0.1:2181
```

### Cài đặt kafka
**Setup helm repo và down helm chart của kafka về máy:**
```
[sysadmin@vtq-cicd]$ mkdir -p /home/sysadmin/open-sources/bitnami-kafka
[sysadmin@vtq-cicd]$ cd /home/sysadmin/open-sources/bitnami-kafka
[sysadmin@vtq-cicd bitnami-kafka]$ helm repo add bitnami https://charts.bitnami.com/bitnami
[sysadmin@vtq-cicd bitnami-kafka]$ helm pull bitnami/kafka --version 12.17.6
[sysadmin@vtq-cicd bitnami-kafka]$ tar -xzf kafka-12.17.6.tgz
[sysadmin@vtq-cicd bitnami-kafka]$ cp kafka/values.yaml value-kafka.yaml
```

**Cấu hình file helm-value (value-kafka.yaml):**
***Cấu hình persistence:***
```
  ## Persistence parameters
  ##
  persistence:
     enabled: false
    ## A manually managed Persistent Volume and Claim
    ## If defined, PVC must be created manually before volume will be bound
```
Vì cài lab nên mình không sử dụng persistence volume (set enabled: false)

***Cấu hình zookeeper:***
```
  zookeeper:
    enabled: false
    auth:
      ## Enable Zookeeper auth
```
Mình không sử dụng zookeeper mặc định của bộ cài này nên set enable = false

***Mình sử dụng zookeeper cài đặt ở bên trên cho thằng kafka này bằng cách set giá trị external zookeeper:***
```
  externalZookeeper:
    ## Server or list of external zookeeper servers to use.
    ##
   servers: zookeeper.prod.svc.cluster.local
```

**Cài đặt kafka:**
```
[sysadmin@vtq-cicd bitnami-kafka]$ helm -n prod install kafka -f value-kafka.yaml kafka
NAME: kafka
LAST DEPLOYED: Wed Jul 20 06:02:16 2022
NAMESPACE: prod
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
** Please be patient while the chart is being deployed **

Kafka can be accessed by consumers via port 9092 on the following DNS name from within your cluster:

    kafka.prod.svc.cluster.local

Each Kafka broker can be accessed by producers via port 9092 on the following DNS name(s) from within your cluster:

    kafka-0.kafka-headless.prod.svc.cluster.local:9092

To create a pod that you can use as a Kafka client run the following commands:

    kubectl run kafka-client --restart='Never' --image docker.io/bitnami/kafka:2.8.0-debian-10-r0 --namespace prod --command -- sleep infinity
    kubectl exec --tty -i kafka-client --namespace prod -- bash

    PRODUCER:
        kafka-console-producer.sh \

            --broker-list kafka-0.kafka-headless.prod.svc.cluster.local:9092 \
            --topic test

    CONSUMER:
        kafka-console-consumer.sh \

            --bootstrap-server kafka.prod.svc.cluster.local:9092 \
            --topic test \
            --from-beginning
```

**Cài đặt Kafka Client để test thử pub/sub tới kafka:**

Cài kafka client:
```
[sysadmin@vtq-cicd bitnami-kafka]$ kubectl run kafka-client --restart='Never' --image docker.io/bitnami/kafka:2.8.0-debian-10-r0 --namespace prod --command -- sleep infinity
pod/kafka-client created
```
Public và subscribe vào topic test:
```
[sysadmin@vtq-cicd bitnami-kafka]$ kubectl exec --tty -i kafka-client --namespace prod -- bash
I have no name!@kafka-client:/$
I have no name!@kafka-client:/$ kafka-console-producer.sh --broker-list kafka-0.kafka-headless.prod.svc.cluster.local:9092 --topic test
>hello
>hello2
>hello3
>^CI have no name!@kafka-client:/$
I have no name!@kafka-client:/$ kafka-console-consumer.sh --bootstrap-server kafka.prod.svc.cluster.local:9092 --topic test --from-beginning
hello
hello2
hello3
```
Như vậy là zookeeper/kafka đã cài thành công, có thể gửi nhận message bình thường. 

## Cài đặt myservice
Tạo thư mục chứa các file cài đặt này:
```
cd /home/sysadmin
mkdir k8s-myservice
cd k8s-myservice
touch viettq-order-deployment.yaml
touch viettq-billing-deployment.yaml
```
Nội dung file **viettq-order-deployment.yaml** như sau:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  annotations:
    meta.helm.sh/release-name: viettq-order
    meta.helm.sh/release-namespace: prod
  labels:
    app.kubernetes.io/name: viettq-order
  name: viettq-order
  namespace: prod
spec:
  progressDeadlineSeconds: 600
  replicas: 5
  selector:
    matchLabels:
      app.kubernetes.io/instance: viettq-order
      app.kubernetes.io/name: viettq-order
  template:
    metadata:
      annotations:
      labels:
        app.kubernetes.io/instance: viettq-order
        app.kubernetes.io/name: viettq-order
    spec:
      containers:
        - name: order
          image: busybox
          imagePullPolicy: IfNotPresent
          args: [/bin/sh, -c, while true; do echo "$(date) mynode=$MY_NODE_NAME podName=$MY_POD_NAME namespace=$MY_POD_NAMESPACE podIp=$MY_POD_IP serviceAccountName=$MY_POD_SERVICE_ACCOUNT";  sleep 1;  done]
          env:
          - name: MY_NODE_NAME
            valueFrom:
              fieldRef:
                fieldPath: spec.nodeName
          - name: MY_POD_NAME
            valueFrom:
              fieldRef:
                fieldPath: metadata.name
          - name: MY_POD_NAMESPACE
            valueFrom:
              fieldRef:
                fieldPath: metadata.namespace
          - name: MY_POD_IP
            valueFrom:
              fieldRef:
                fieldPath: status.podIP
          - name: MY_POD_SERVICE_ACCOUNT
            valueFrom:
              fieldRef:
                fieldPath: spec.serviceAccountName
```

Nội dung file **viettq-billing-deployment.yaml** như sau:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  annotations:
    meta.helm.sh/release-name: viettq-billing
    meta.helm.sh/release-namespace: prod
  labels:
    app.kubernetes.io/name: viettq-billing
  name: viettq-billing
  namespace: prod
spec:
  progressDeadlineSeconds: 600
  replicas: 3
  selector:
    matchLabels:
      app.kubernetes.io/instance: viettq-billing
      app.kubernetes.io/name: viettq-billing
  template:
    metadata:
      annotations:
      labels:
        app.kubernetes.io/instance: viettq-billing
        app.kubernetes.io/name: viettq-billing
    spec:
      containers:
        - name: billing
          image: busybox
          imagePullPolicy: IfNotPresent
          args: [/bin/sh, -c, while true; do echo "$(date) mynode=$MY_NODE_NAME podName=$MY_POD_NAME namespace=$MY_POD_NAMESPACE podIp=$MY_POD_IP serviceAccountName=$MY_POD_SERVICE_ACCOUNT";  sleep 1;  done]
          env:
          - name: MY_NODE_NAME
            valueFrom:
              fieldRef:
                fieldPath: spec.nodeName
          - name: MY_POD_NAME
            valueFrom:
              fieldRef:
                fieldPath: metadata.name
          - name: MY_POD_NAMESPACE
            valueFrom:
              fieldRef:
                fieldPath: metadata.namespace
          - name: MY_POD_IP
            valueFrom:
              fieldRef:
                fieldPath: status.podIP
          - name: MY_POD_SERVICE_ACCOUNT
            valueFrom:
              fieldRef:
                fieldPath: spec.serviceAccountName
```

**Thực hiện cài đặt 2 deployment này:**
```
kubectl -n prod apply -f viettq-order-deployment.yaml
kubectl -n prod apply -f viettq-billing-deployment.yaml
```
Kết quả:
```
[sysadmin@vtq-cicd k8s-myservice]$ kubectl -n prod get pods -owide
NAME                              READY   STATUS    RESTARTS   AGE     IP              NODE             NOMINATED NODE   READINESS GATES
kafka-0                           1/1     Running   0          19m     10.233.68.5     viettq-worker3   <none>           <none>
kafka-client                      1/1     Running   0          17m     10.233.67.164   viettq-worker2   <none>           <none>
redis-redis-cluster-0             1/2     Running   0          40m     10.233.68.3     viettq-worker3   <none>           <none>
redis-redis-cluster-1             1/2     Running   0          40m     10.233.67.161   viettq-worker2   <none>           <none>
vernemq-0                         1/1     Running   0          29m     10.233.68.4     viettq-worker3   <none>           <none>
viettq-billing-55ffcdbc4d-2v4fz   1/1     Running   0          81s     10.233.67.166   viettq-worker2   <none>           <none>
viettq-billing-55ffcdbc4d-6hkj6   1/1     Running   0          81s     10.233.68.8     viettq-worker3   <none>           <none>
viettq-billing-55ffcdbc4d-v2slb   1/1     Running   0          81s     10.233.67.167   viettq-worker2   <none>           <none>
viettq-order-777d5f86df-6m8n2     1/1     Running   0          2m12s   10.233.68.6     viettq-worker3   <none>           <none>
viettq-order-777d5f86df-d96fd     1/1     Running   0          2m12s   10.233.67.165   viettq-worker2   <none>           <none>
viettq-order-777d5f86df-2wjqr     1/1     Running   0          2m12s   10.233.67.172   viettq-worker2   <none>           <none>
viettq-order-777d5f86df-fcnx5     1/1     Running   0          2m12s   10.233.67.173   viettq-worker2   <none>           <none>
viettq-order-777d5f86df-g9s2n     1/1     Running   0          2m12s   10.233.68.7     viettq-worker3   <none>           <none>
zookeeper-0                       1/1     Running   0          24m     10.233.67.163   viettq-worker2   <none>           <none>
```

**Xem log của một pod ta thấy nó đã in ra được các thông tin của pod đang chạy như podName, namespace, podIp...**
```
[sysadmin@vtq-cicd k8s-myservice]$ kubectl -n prod logs --tail=5 viettq-order-777d5f86df-6m8n2
Wed Jul 20 10:23:14 UTC 2022 mynode=viettq-worker3 podName=viettq-order-777d5f86df-6m8n2 namespace=prod podIp=10.233.68.6 serviceAccountName=default
Wed Jul 20 10:23:15 UTC 2022 mynode=viettq-worker3 podName=viettq-order-777d5f86df-6m8n2 namespace=prod podIp=10.233.68.6 serviceAccountName=default
Wed Jul 20 10:23:16 UTC 2022 mynode=viettq-worker3 podName=viettq-order-777d5f86df-6m8n2 namespace=prod podIp=10.233.68.6 serviceAccountName=default
Wed Jul 20 10:23:17 UTC 2022 mynode=viettq-worker3 podName=viettq-order-777d5f86df-6m8n2 namespace=prod podIp=10.233.68.6 serviceAccountName=default
Wed Jul 20 10:23:18 UTC 2022 mynode=viettq-worker3 podName=viettq-order-777d5f86df-6m8n2 namespace=prod podIp=10.233.68.6 serviceAccountName=default
```
**Kiểm tra log file sinh ra trên các worker node**
Ví dụ pod viettq-order-777d5f86df-d96fd đang chạy trên node viettq-worker2 --> Ta vào node đó kiểm tra:
```
[sysadmin@viettq-worker2 ~]$ cd /var/log/containers/
[sysadmin@viettq-worker2 containers]$ ls -lrt |grep viettq-order-777d5f86df-d96fd
lrwxrwxrwx. 1 root root  97 Jul 20 06:20 viettq-order-777d5f86df-d96fd_prod_order-31bc1bc7eb479cea62ce32adc2141e9ed2cfe69b44a064fd3e45b5ea9f362ae8.log -> /var/log/pods/prod_viettq-order-777d5f86df-d96fd_184cb296-515a-42cf-b0b2-71f77f40e18e/order/0.log
[sysadmin@viettq-worker2 containers]$ sudo tail -5 viettq-order-777d5f86df-d96fd_prod_order-31bc1bc7eb479cea62ce32adc2141e9ed2cfe69b44a064fd3e45b5ea9f362ae8.log
{"log":"Wed Jul 20 10:26:15 UTC 2022 mynode=viettq-worker2 podName=viettq-order-777d5f86df-d96fd namespace=prod podIp=10.233.67.165 serviceAccountName=default\n","stream":"stdout","time":"2022-07-20T10:26:15.010705725Z"}
{"log":"Wed Jul 20 10:26:16 UTC 2022 mynode=viettq-worker2 podName=viettq-order-777d5f86df-d96fd namespace=prod podIp=10.233.67.165 serviceAccountName=default\n","stream":"stdout","time":"2022-07-20T10:26:16.012486391Z"}
{"log":"Wed Jul 20 10:26:17 UTC 2022 mynode=viettq-worker2 podName=viettq-order-777d5f86df-d96fd namespace=prod podIp=10.233.67.165 serviceAccountName=default\n","stream":"stdout","time":"2022-07-20T10:26:17.014383027Z"}
{"log":"Wed Jul 20 10:26:18 UTC 2022 mynode=viettq-worker2 podName=viettq-order-777d5f86df-d96fd namespace=prod podIp=10.233.67.165 serviceAccountName=default\n","stream":"stdout","time":"2022-07-20T10:26:18.016098422Z"}
{"log":"Wed Jul 20 10:26:19 UTC 2022 mynode=viettq-worker2 podName=viettq-order-777d5f86df-d96fd namespace=prod podIp=10.233.67.165 serviceAccountName=default\n","stream":"stdout","time":"2022-07-20T10:26:19.01797921Z"}
```

Như vậy việc setup môi trường cho bài toán đã xong. Hiện tại trong namespace **prod** mình đang có 3 open source (vernemq|kafka|zookeeper) và 2 service của mình tự dựng (viettq-order|viettq-billing).

***Do bài viết cũng khá dài rồi nên phần hướng dẫn cài đặt ELK để lấy log của các service trên mình sẽ để ở bài tiếp theo.
Trong bài viết khó tránh khỏi sai sót, nếu có gì chưa chính xác rất mong nhận được ý kiến đóng góp của các bạn.***

***Hẹn gặp lại các bạn ở bài tiếp theo: Cài đặt hệ thống logging ELK trên K8S***
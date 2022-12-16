# Lời tựa
Trong 2 bài viết trước mình đã tự đặt ra bài toán logging cho hệ thống cũng như xây dựng xong môi trường gồm các service opensource và tự build.
Trong bài viết này mình sẽ đi vào chi tiết cách dựng một hệ thống logging cho k8s.

# Giới thiệu
Mình muốn giới thiệu lại một chút và kiến trúc hệ thống lab mà mình đang dựng và dùng để viết series hướng dẫn này. Mọi người có thể xem lại chi tiết ở đây: https://viblo.asia/p/k8s-phan-2-cai-dat-kubernetes-cluster-va-rancher-m68Z0BL95kG

Chi tiết bài toán logging mình đã đưa ra, các bạn có thể xem lại ở đây: https://viblo.asia/p/k8s-phan-12-logging-tren-k8s-section1-924lJgNW5PM

**Quay trở lại bài toán logging, bây giờ cùng bắt tay vào cài đặt hệ thống ELK để lấy và lưu log của các service mà ta đã deploy trên k8s.**
# Cài đặt hệ thống logging ELK
***Các file cấu hình cài đặt cho cụm ELK này mình có để ở trên github, các bạn có thể tham khảo ở đây: https://github.com/rockman88v/logging-with-elk.git***
## Cài đặt elastic search cluster
Trước hết ta tạo thư mục lưu cài đặt như sau (thực hiện trên node **vtq-cicd**):
```
cd /home/sysadmin/open-sources
mkdir ELK
cd ELK
mkdir elastic-elasticsearch
cd elastic-elasticsearch
```
Thực hiện khai báo helm repo và pull bộ helm-chart của elastic về (ở đây mình dùng bản của **elastic**):
```
[sysadmin@vtq-cicd ELK]$ helm repo add elastic https://Helm.elastic.co
[sysadmin@vtq-cicd ELK]$ helm search repo elastic/elasticsearch
NAME                    CHART VERSION   APP VERSION     DESCRIPTION
elastic/elasticsearch   7.17.3          7.17.3          Official Elastic helm chart for Elasticsearch
[sysadmin@vtq-cicd elastic-elasticsearch]$ helm pull elastic/elasticsearch --version 7.17.3
[sysadmin@vtq-cicd elastic-elasticsearch]$ tar -xzf elasticsearch-7.17.3.tgz
[sysadmin@vtq-cicd elastic-elasticsearch]$ cp elasticsearch/values.yaml value-elasticsearch.yaml
[sysadmin@vtq-cicd elastic-elasticsearch]$ ls -lrt
total 40
-rw-r--r-- 1 sysadmin sysadmin 27893 Jul 20 06:34 elasticsearch-7.17.3.tgz
drwxrwxr-x 4 sysadmin sysadmin   128 Jul 20 06:34 elasticsearch
-rw-r--r-- 1 sysadmin sysadmin  9496 Jul 20 06:34 value-elasticsearch.yaml
```
Tiếp đến là config các tham số cho elastic search, mình giải thích một số tham số chính, các bạn có thể tham khảo cấu hình của mình ở link github nhé!

**Cấu hình docker images:**
```
! image: "docker.elastic.co/elasticsearch/elasticsearch"
  imageTag: "7.17.3"
  imagePullPolicy: "IfNotPresent"
  ```
 Đây là cấu hình docker images của elastic search. Thông thường  thì mình hay có thói quen là pull image này về rồi push lên private registry do đó mình sẽ thay đổi tham số image theo private repo của mình. 

**Cấu hình resource cho pod:**
```
  esJavaOpts: "" # example: "-Xmx1g -Xms1g"

  resources:
    requests:
     cpu: "1000m"
      memory: "2Gi"
    limits:
      cpu: "1000m"
     memory: "2Gi"

  initResources:
    {}
```
Tùy nhu cầu hệ thống mà bạn có thể cấu hình tài nguyên cho pod, có thể tăng giảm cpu/memory. Phần request là yêu cầu cấp phát, phần limit là giới hạn tài nguyên tối đa cho pod.
Lưu ý tham số esJavaOpts thì thường sẽ set bằng 1/2 dung lượng memory. Ví dụ bạn set memory là 2Gi thì cấu hình sẽ là "-Xmx1g -Xms1g"

**Cấu hình antiAffinity (chính sách phân bổ pod trên worker node):**
```
  # Changing this to a region would allow you to spread pods across regions
  antiAffinityTopologyKey: "kubernetes.io/hostname"

  # Hard means that by default pods will only be scheduled if there are enough nodes for them
  # and that they will never end up on the same node. Setting this to soft will do this "best effort"
 antiAffinity: "soft"

  # This is the node affinity settings as defined in
  # https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#node-affinity-beta-feature
  nodeAffinity: {}
```
Tham số antiAffinity mặc định là hard, mình đổi lại thành soft. Ý nghĩa của nó khi set "hard" là nó sẽ bắt buộc các pod của elastic search không được chạy trên cùng một node. Trong trường hợp bạn cài lab chỉ có 2 worker node nhưng lại muốn chạy elastic cluster với 3 replicas thì bạn cấu hình hard thì sẽ bị lỗi. Do đó trong môi trường lab thì nên set là "soft" nhé!

**Cấu hình ingress rule:**
```
  ingress:
   enabled: true
    annotations: {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
    className: "nginx"
    pathtype: ImplementationSpecific
    hosts:
     - host: elasticsearch.prod.viettq.com
        paths:
          - path: /    
```
Phần này là cấu hình ingress cho service elastic search. Mình enable lên để sau cần check thông tin từ elastic search thì sử dụng qua ingress cho nhanh và tiện. Cái này không bắt buộc, vì cơ bản cả bộ ELK đều cài trên k8s nên kết nối là nội bộ k8s hết!

**Enable persistence:**
```
persistence:
  enabled: true
  labels:
    # Add default labels for the volumeClaimTemplate of the StatefulSet
    enabled: false
  annotations: {}
```

**Cấu hình dung lượng lưu trữ:**
```
volumeClaimTemplate:
  accessModes: ["ReadWriteOnce"]
  resources:
    requests:
      storage: 30Gi
```
Nếu bạn muốn lưu dữ liệu ra bên ngoài thì enable persistence lên. Một lưu ý quan trọng của cái thằng elastic search này là nó không có cấu hình chọn storage class, mà nó dùng thằng storage class mặc định của k8s. Do đó khi bạn muốn sử dụng storage class nào cho nó thì phải set nó thành storage class mặc định duy nhất của k8s trước khi cài đặt elastic search.

Mình sẽ minh họa chỗ này kỹ hơn, vì có thể nhiều bạn sẽ gặp vướng mắc ở đây. Nếu bạn chỉ có 1 storage class mặc định rồi thì bỏ qua phần này nhé!

**Ví dụ hệ thống của mình đang có sẵn 5 storage class như sau:**
```
[sysadmin@vtq-cicd elastic-elasticsearch]$ kubectl get storageclass
NAME                                PROVISIONER                             RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
longhorn                            driver.longhorn.io                      Delete          Immediate           true                   104d
longhorn-storage-delete (default)   driver.longhorn.io                      Delete          Immediate           true                   104d
longhorn-storage-retain             driver.longhorn.io                      Retain          Immediate           true                   104d
viettq-nfs-delete                   viettq-nfs-storage-delete-provisioner   Delete          Immediate           true                   104d
viettq-nfs-retain                   viettq-nfs-storage-retain-provisioner   Delete          Immediate           true                   104d
```
Hiện tại storage class mặc định đang là **longhorn-storage-delete**. Nhưng mình muốn sử dụng thằng **viettq-nfs-retain** cho việc cấp phát phân vùng lưu trữ cho elastic search. Để làm được như vậy mình cần làm 2 việc:
- Cấu hình cho thằng **viettq-nfs-retain** trở thành default
- Cấu hình cho thằng **longhorn-storage-delete** trở thành non-default

**Set viettq-nfs-retain trở thành default:**
```
[sysadmin@vtq-cicd elastic-elasticsearch]$ kubectl patch storageclass viettq-nfs-retain -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
storageclass.storage.k8s.io/viettq-nfs-retain patched
```

**Set longhorn-storage-delete trở thành non-default:**
```
[sysadmin@vtq-cicd elastic-elasticsearch]$ kubectl patch storageclass longhorn-storage-delete -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'
storageclass.storage.k8s.io/longhorn-storage-delete patched
```

**Kết quả:**
```
[sysadmin@vtq-cicd elastic-elasticsearch]$ kubectl get storageclass
NAME                          PROVISIONER                             RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
longhorn                      driver.longhorn.io                      Delete          Immediate           true                   104d
longhorn-storage-delete       driver.longhorn.io                      Delete          Immediate           true                   104d
longhorn-storage-retain       driver.longhorn.io                      Retain          Immediate           true                   104d
viettq-nfs-delete             viettq-nfs-storage-delete-provisioner   Delete          Immediate           true                   104d
viettq-nfs-retain (default)   viettq-nfs-storage-retain-provisioner   Delete          Immediate           true                   104d
```

**Cuối cùng thì cài đặt elastic search bằng helm:**
```
[sysadmin@vtq-cicd elastic-elasticsearch]$ helm -n prod install elasticsearch -f value-elasticsearch.yaml elasticsearch
NAME: elasticsearch
LAST DEPLOYED: Wed Jul 20 06:43:31 2022
NAMESPACE: prod
STATUS: deployed
REVISION: 1
NOTES:
1. Watch all cluster members come up.
  $ kubectl get pods --namespace=prod -l app=elasticsearch-master -w2. Test cluster health using Helm test.
  $ helm --namespace=prod test elasticsearch
```
**Kết quả cài đặt elastic search thành công như sau:**
```
[sysadmin@vtq-cicd elastic-elasticsearch]$ kubectl -n prod get pods -owide
NAME                              READY   STATUS    RESTARTS   AGE     IP              NODE             NOMINATED NODE   READINESS GATES
elasticsearch-master-0            1/1     Running   0          3m58s   10.233.67.168   viettq-worker2   <none>           <none>
elasticsearch-master-1            1/1     Running   0          3m58s   10.233.68.9     viettq-worker3   <none>           <none>
elasticsearch-master-2            1/1     Running   0          3m58s   10.233.69.110   viettq-worker1   <none>           <none>
kafka-0                           1/1     Running   0          45m     10.233.68.5     viettq-worker3   <none>           <none>
kafka-client                      1/1     Running   0          42m     10.233.67.164   viettq-worker2   <none>           <none>
redis-redis-cluster-0             1/2     Running   0          65m     10.233.68.3     viettq-worker3   <none>           <none>
redis-redis-cluster-1             1/2     Running   0          65m     10.233.67.161   viettq-worker2   <none>           <none>
vernemq-0                         1/1     Running   0          55m     10.233.68.4     viettq-worker3   <none>           <none>
viettq-billing-55ffcdbc4d-2v4fz   1/1     Running   0          26m     10.233.67.166   viettq-worker2   <none>           <none>
viettq-billing-55ffcdbc4d-6hkj6   1/1     Running   0          26m     10.233.68.8     viettq-worker3   <none>           <none>
viettq-billing-55ffcdbc4d-v2slb   1/1     Running   0          26m     10.233.67.167   viettq-worker2   <none>           <none>
viettq-order-777d5f86df-6m8n2     1/1     Running   0          27m     10.233.68.6     viettq-worker3   <none>           <none>
viettq-order-777d5f86df-d96fd     1/1     Running   0          27m     10.233.67.165   viettq-worker2   <none>           <none>
viettq-order-777d5f86df-g9s2n     1/1     Running   0          27m     10.233.68.7     viettq-worker3   <none>           <none>
zookeeper-0                       1/1     Running   0          49m     10.233.67.163   viettq-worker2   <none>           <none>
```
**Xem thông tin của elastic search:**

![image.png](https://images.viblo.asia/ef72df03-5475-4e28-9078-deb738630bde.png)

**Xem các index đang có trên elastic search**
![image.png](https://images.viblo.asia/808303ed-1f5f-4d40-8823-20fda6903977.png)
## Cài đặt Kibana
Trước hết ta tạo thư mục lưu cài đặt như sau (thực hiện trên node **vtq-cicd**):
```
cd /home/sysadmin/open-sources/ELK
mkdir elastic-kibana
cd elastic-kibana
```
Do mình đã add repo của elastic khi cài elastic search rồi nên chỉ cần search thằng kibana từ repo về cài thôi.
```
[sysadmin@vtq-cicd elastic-kibana]$ helm search repo elastic/kibana
NAME            CHART VERSION   APP VERSION     DESCRIPTION
elastic/kibana  7.17.3          7.17.3          Official Elastic helm chart for Kibana
[sysadmin@vtq-cicd elastic-kibana]$ helm pull elastic/kibana --version 7.17.3
[sysadmin@vtq-cicd elastic-kibana]$ tar -xzf kibana-7.17.3.tgz
[sysadmin@vtq-cicd elastic-kibana]$ cp kibana/values.yaml value-kibana.yaml
[sysadmin@vtq-cicd elastic-kibana]$ ls -lrt
total 40
-rw-r--r-- 1 sysadmin sysadmin 27893 Jul 20 06:34 kibana-7.17.3.tgz
drwxrwxr-x 4 sysadmin sysadmin   128 Jul 20 06:34 kibana
-rw-r--r-- 1 sysadmin sysadmin  9496 Jul 20 06:34 value-kibana.yaml
```
### Tiếp đến là config các tham số cho kibana.

**Cấu hình kết nối tới elastic search:**
```
elasticsearchHosts: "http://elasticsearch-master:9200"
replicas: 1
```
Trong đó **elasticsearch-master** là tên service của elasticsearch. Do cả bộ ELK mình đều cài chung trên một namespace do đó chỉ cần khai báo (service-name):port là đủ. Số lượng replicas cho bài lab thì chỉ cần 1 là đủ. Các bạn verify service name bằng lệnh sau:
```
[sysadmin@vtq-cicd ~]$ kubectl -n prod get svc |grep elasticsearch
elasticsearch-master                 ClusterIP   10.233.52.81    <none>        9200/TCP,9300/TCP               51d
elasticsearch-master-headless        ClusterIP   None            <none>        9200/TCP,9300/TCP               51d
```
    
**Cấu hình docker images:**
```
  image: "docker.elastic.co/kibana/kibana"
  imageTag: "7.17.3"
  imagePullPolicy: "IfNotPresent"
```
 Giống như với elastic search, nếu bạn muốn lưu image về private registry thì update thông tin image ở đây.   

**Cấu hình resource:**
```
  resources:
    requests:
!     cpu: "1000m"
      memory: "2Gi"
    limits:
      cpu: "1000m"
!     memory: "2Gi"
```    

**Cấu hình ingress để kết nối tới kibana từ bên ngoài k8s:** 

Nếu có vướng mắc gì tới cấu hình ingress thì bạn tham khảo bài viết trước của mình về ingress ở đây nhé: https://viblo.asia/p/k8s-phan-6-load-balancing-tren-kubernetes-dung-haproxy-va-nginx-ingress-4dbZNRpaZYM
```
  ingress:
    enabled: true
    className: "nginx"
    pathtype: ImplementationSpecific
    annotations: {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
    hosts:
!     - host: kibana.prod.viettq.com
        paths:
          - path: /
```
Sau khi update xong file helm-value **(value-kibana.yaml)** thì tiến hành cài đặt kibana:
```
[sysadmin@vtq-cicd elastic-kibana]$ helm -n prod install kibana -f value-kibana.yaml kibana
NAME: kibana
LAST DEPLOYED: Wed Jul 20 23:00:57 2022
NAMESPACE: prod
STATUS: deployed
REVISION: 1
TEST SUITE: None
```
**Kết quả: Cài đặt kibana thành công**
```
[sysadmin@vtq-cicd elastic-kibana]$ kubectl -n prod get pods -owide |grep kibana
kibana-kibana-85799449f5-rhxrr    1/1     Running   0          79s   10.233.68.10    viettq-worker3   <none>           <none>
```

## Cài đặt Logstash
Trước hết ta tạo thư mục lưu cài đặt như sau (thực hiện trên node **vtq-cicd**):
```
cd /home/sysadmin/open-sources/ELK
mkdir elastic-logstash
cd elastic-logstash
```
Do mình đã add repo của elastic khi cài elastic search rồi nên chỉ cần search thằng logstash từ repo về cài thôi.
```
[sysadmin@vtq-cicd ELK]$ helm search repo elastic/logstash
NAME                    CHART VERSION   APP VERSION     DESCRIPTION
elastic/logstash        7.17.3          7.17.3          Official Elastic helm chart for Logstash
[sysadmin@vtq-cicd elastic-filebeat]$ helm pull elastic/logstash --version 7.17.3
[sysadmin@vtq-cicd elastic-logstash]$ tar -xzf logstash-7.17.3.tgz
[sysadmin@vtq-cicd elastic-logstash]$ cp logstash/values.yaml value-logstash.yaml
[sysadmin@vtq-cicd elastic-logstash]$ ls -lrt
total 40
-rw-r--r-- 1 sysadmin sysadmin 27893 Jul 20 06:34 logstash-7.17.3.tgz
drwxrwxr-x 4 sysadmin sysadmin   128 Jul 20 06:34 logstash
-rw-r--r-- 1 sysadmin sysadmin  9496 Jul 20 06:34 value-logstash.yaml
```
### Ta bắt đầu cấu hình các tham số của Logstash trước khi cài đặt.

**Cấu hình logstash pipeline:** Đây là bước quan trọng nhất như mình đã nói ở bài trước. Tuy nhiên trong phạm vi bài lab này thì mình chỉ thực hiện việc phân loại log (input) theo tag để lưu vào các index tương ứng trên elastic search. 

Cụ thể, với log của opensource (xác định bởi tag "myopensource" sẽ được logstash đẩy vào index có tên logstash-myopensource-{YYYY-MM-dd} --> Mỗi ngày sẽ ghi vào một index. Tương tự cho log của "myservice" cũng vậy.

Việc này phục vụ cho việc cấu hình thời gian lưu log khác nhau cho các loại log khác nhau. Sau này mình sẽ dùng Elastic Curator để tự động xóa các index cũ theo thời gian tạo. Ý tưởng là xóa các index có tên "**logstash-myopensource\****" quá 7 ngày, và xóa các index có tên "**logstash-myservice\***" quá 30 ngày. 

**Cấu hình logstash pipeline:**
```
logstashPipeline:
  logstash.conf: |
    input {
        beats {
            port => "5044"
      }
    }
    filter {
        grok {
            add_field => [ "received_at", "%{@timestamp}" ]
        }
    }
    output {
    if "myopensource" in [tags] {
       elasticsearch {
         hosts => [ "elasticsearch-master:9200" ]
         index => "logstash_myopensource_%{+YYYY.MM.dd}"
         }
       }
       else if "myservice" in [tags] {
       elasticsearch {
         hosts => [ "elasticsearch-master:9200" ]
         index => "logstash_myservice_%{+YYYY.MM.dd}"
         }
       }
       else {
       elasticsearch {
         hosts => [ "elasticsearch-master:9200" ]
         index => "logstash_default_%{+YYYY.MM.dd}"
         }
       }
    }
```
Cấu hình pipeline của Logstash gồm 3 phần chính là Input, Filter và Output. Trong đó Filter của Logstash có một số loại chính và phổ biến như grok, mutate.. và hỗ trợ rất nhiều plugs. Các bạn có thể tìm hiểu thêm về topic này trên google.

Quay lại bài toán đặt ra ban đầu. Nhiệm vụ của thằng Filebeat là lấy log của các opensource (vernemq, kafka, zookeeper) và service (myervice tự deploy) và gửi về Logstash. Như vậy pipeline của Logstash cần thực hiện như sau:
- **Input**: Lấy input từ Filebeat gửi tới port 5044
- **Filter**: Bước này không bắt buộc (bài toán không yêu cầu parse log). Mình để một filter đơn giản là thêm một trường "received_at" vào log lấy từ tham số timestamp
- **Output**: 
    - Với các đầu vào có chứa keyword "**myopensource**" trong tags thì gửi tới index "**logstash_myopensource_%{+YYYY.MM.dd}**" của elastic search có thông tin kết nối là elasticsearch-master:9200
    - Với các đầu vào có chứa keyword "**myservice**" trong tags thì gửi tới index "**logstash_myservice_%{+YYYY.MM.dd}**" của elastic search có thông tin kết nối là elasticsearch-master:9200
    - Trường hợp đầu vào không thỏa mãn cả 2 điều kiện trên thì lưu vào index "**logstash_default_%{+YYYY.MM.dd}**" của elastic search có thông tin kết nối là elasticsearch-master:9200

***Sau này khi bạn cần bổ sung thêm các filter để parse log (nhằm lấy dữ liệu log có ích và tối ưu dung lượng lưu trữ) thì chỉ cần bổ sung vào phần filter của cấu hình logstash mà ko phải thay đổi gì kiến trúc hệ thống cả.***

**Cấu hình images:**
```
image: "docker.elastic.co/logstash/logstash"
imageTag: "7.17.3"
imagePullPolicy: "IfNotPresent"
```

**Cấu hình resource**
```
logstashJavaOpts: "-Xmx1g -Xms1g"

resources:
  requests:
    cpu: "100m"
    memory: "1536Mi"
  limits:
    cpu: "1000m"
    memory: "1536Mi"
```

**Cấu hình dung lượng phân vùng lưu trữ:**
```
volumeClaimTemplate:
  accessModes: ["ReadWriteOnce"]
  resources:
    requests:
      storage: 1Gi
```
Trong trường hợp bạn enable persistence thì cấu hình dung lượng volume mong muốn ở đây.

**Cấu hình lưu dữ liệu ra bên ngoài disk:**
```
persistence:
  enabled: false
  annotations: {}
```
Logstash sẽ đẩy dữ liệu về elastich search nên cũng ko cần thiết phải cấu hình persistence volume cho nó. Do đó trong bài lab này mình không enable persistence. 

**Cấu hình antiAffinity:**
```
# Hard means that by default pods will only be scheduled if there are enough nodes for them
# and that they will never end up on the same node. Setting this to soft will do this "best effort"
antiAffinity: "hard"
```
Trong môi trường lab, hoặc prod nhưng số lượng worker node nhỏ (nhỏ hơn hoặc bằng số replicas) thì nên set giá trị là "soft"

**Cấu hình service:**
```
service:
  # annotations: {}
  type: ClusterIP
  # loadBalancerIP: ""
  ports:
    - name: beats
      port: 5044
      protocol: TCP
      targetPort: 5044
    - name: http
      port: 8080
      protocol: TCP
      targetPort: 8080
```
Ở đây mình cấu hình port 5044 để dành riêng cho việc nhận dữ liệu log từ filebeat, và port 8080 cho http request tới logstash.

**Cấu hình ingress:**
```
ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/tls-acme: "true"
  className: "nginx"
  pathtype: ImplementationSpecific
  hosts:
    - host: logstash.prod.viettq.com
      paths:
        - path: /beats
          servicePort: 5044
        - path: /http
          servicePort: 8080
```
Bước này tùy chọn không bắt buộc. Nếu bạn cần kết nối qua ingress thì mới cần cấu hình. 

**Xong xuôi thì cài đặt Logstash bằng helm:**
```
[sysadmin@vtq-cicd elastic-logstash]$ helm -n prod install logstash -f value-logstash.yaml logstash
NAME: logstash
LAST DEPLOYED: Wed Jul 20 23:57:17 2022
NAMESPACE: prod
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
1. Watch all cluster members come up.
  $ kubectl get pods --namespace=prod -l app=logstash-logstash -w
```
**Check kết quả cài đặt Logstash:**
```
[sysadmin@vtq-cicd elastic-logstash]$ kubectl get pods --namespace=prod -l app=logstash-logstash
NAME                  READY   STATUS    RESTARTS   AGE
logstash-logstash-0   1/1     Running   0          9m35s
logstash-logstash-1   1/1     Running   0          9m35s
```
Như vậy 2 pod của Logstash đã ở trạng thái running.

**Check log của Logstash:** 
```
[sysadmin@vtq-cicd elastic-logstash]$ kubectl -n prod logs --tail=30 logstash-logstash-1
[2022-07-21T04:06:55,547][ERROR][logstash.licensechecker.licensereader] Unable to retrieve license information from license server {:message=>"No Available connections"}
[2022-07-21T04:06:57,776][INFO ][logstash.licensechecker.licensereader] Failed to perform request {:message=>"elasticsearch: Name or service not known", :exception=>Manticore::ResolutionFailure, :cause=>java.net.UnknownHostException: elasticsearch: Name or service not known}
[2022-07-21T04:06:57,777][WARN ][logstash.licensechecker.licensereader] Attempted to resurrect connection to dead ES instance, but got an error {:url=>"http://elasticsearch:9200/", :exception=>LogStash::Outputs::ElasticSearch::HttpClient::Pool::HostUnreachableError, :message=>"Elasticsearch Unreachable: [http://elasticsearch:9200/][Manticore::ResolutionFailure] elasticsearch: Name or service not known"}
[2022-07-21T04:07:25,547][ERROR][logstash.licensechecker.licensereader] Unable to retrieve license information from license server {:message=>"No Available connections"}
[2022-07-21T04:07:27,888][INFO ][logstash.licensechecker.licensereader] Failed to perform request {:message=>"elasticsearch: Name or service not known", :exception=>Manticore::ResolutionFailure, :cause=>java.net.UnknownHostException: elasticsearch: Name or service not known}
```
Có vẻ có gì đó sai sai, mình đã cấu hình elasticsearch ở địa chỉ **[http://elasticsearch-master:9200/]** mà nó lại vẫn nhận thông tin là **elasticsearch**.

Có vẻ đây là một bug của thằng này, mình xóa pod cho nó tự chạy lại (không thay đổi gì config) thì ok:
```
[sysadmin@vtq-cicd elastic-logstash]$ kubectl -n prod delete pod logstash-logstash-0
pod "logstash-logstash-0" deleted
[sysadmin@vtq-cicd elastic-logstash]$ kubectl -n prod delete pod logstash-logstash-1
pod "logstash-logstash-1" deleted
[sysadmin@vtq-cicd elastic-logstash]$ kubectl -n prod logs -f --tail=30 logstash-logstash-0
[2022-07-21T04:13:24,680][INFO ][logstash.outputs.elasticsearch][main] Elasticsearch pool URLs updated {:changes=>{:removed=>[], :added=>[http://elasticsearch-master:9200/]}}
[2022-07-21T04:13:24,802][WARN ][logstash.outputs.elasticsearch][main] Restored connection to ES instance {:url=>"http://elasticsearch-master:9200/"}
[2022-07-21T04:13:24,811][INFO ][logstash.outputs.elasticsearch][main] Elasticsearch version determined (7.17.3) {:es_version=>7}
```
Ok như này là nó đã update đúng cấu hình rồi.

**Verify lại cấu hình pipeline bên trong pod của Logstash:**
```
[sysadmin@vtq-cicd elastic-logstash]$ kubectl -n prod exec -it logstash-logstash-0 -- bash
logstash@logstash-logstash-0:~/config$ cat /usr/share/logstash/pipeline/logstash.conf
input {
    beats {
        port => "5044"
  }
}
filter {
    grok {
        add_field => [ "received_at", "%{@timestamp}" ]
    }
}
output {
if "myopensource" in [tags] {
   elasticsearch {
     hosts => [ "elasticsearch-master:9200" ]
     index => "logstash_myopensource_%{+YYYY.MM.dd}"
     }
   }
   else if "myservice" in [tags] {
   elasticsearch {
     hosts => [ "elasticsearch-master:9200" ]
     index => "logstash_myservice_%{+YYYY.MM.dd}"
     }
   }
   else {
   elasticsearch {
     hosts => [ "elasticsearch-master:9200" ]
     index => "logstash_default_%{+YYYY.MM.dd}"
     }
   }
}
```
Như vậy là file cấu hình pipeline đã update đúng với những gì mình đã cấu hình ở file helm-value.

## Cài đặt filebeat

Trước hết ta tạo thư mục lưu cài đặt như sau (thực hiện trên node **vtq-cicd**):
```
cd /home/sysadmin/open-sources/ELK
mkdir elastic-filebeat
cd elastic-filebeat
```
Do mình đã add repo của elastic khi cài elastic search rồi nên chỉ cần search thằng filebeat từ repo về cài thôi.
```
[sysadmin@vtq-cicd ELK]$ helm search repo elastic/filebeat
NAME                    CHART VERSION   APP VERSION     DESCRIPTION
elastic/filebeat        7.17.3          7.17.3          Official Elastic helm chart for Filebeat
[sysadmin@vtq-cicd elastic-filebeat]$ helm pull elastic/filebeat --version 7.17.3
[sysadmin@vtq-cicd elastic-filebeat]$ tar -xzf filebeat-7.17.3.tgz
[sysadmin@vtq-cicd elastic-filebeat]$ cp filebeat/values.yaml value-filebeat.yaml
[sysadmin@vtq-cicd elastic-filebeat]$ ls -lrt
total 40
-rw-r--r-- 1 sysadmin sysadmin 27893 Jul 20 06:34 filebeat-7.17.3.tgz
drwxrwxr-x 4 sysadmin sysadmin   128 Jul 20 06:34 filebeat
-rw-r--r-- 1 sysadmin sysadmin  9496 Jul 20 06:34 value-filebeat.yaml
```

Ta bắt đầu cấu hình các tham số của Logstash trước khi cài đặt.
**Cấu hình filebeatConfig:**
```
  filebeatConfig:
    filebeat.yml: |
      filebeat.inputs:
      - type: container
        paths:
          - /var/log/containers/vernemq*.log
          - /var/log/containers/kafka*.log
          - /var/log/containers/zookeeper*.log
        tags: ["myopensource"]
        processors:
        - add_kubernetes_metadata:
            host: ${NODE_NAME}
            matchers:
            - logs_path:
                logs_path: "/var/log/containers/"
      - type: container
        paths:
          - /var/log/containers/viettq*.log
        tags: ["myservice"]
        processors:
        - add_kubernetes_metadata:
            host: ${NODE_NAME}
            matchers:
            - logs_path:
                logs_path: "/var/log/containers/"
      #output.elasticsearch:
      #  host: '${NODE_NAME}'
      #  hosts: '${ELASTICSEARCH_HOSTS:elasticsearch-master:9200}'
      output.logstash:
        hosts: [ "logstash-logstash:5044" ]
```
Phần này là cấu hình quan trọng nhất của filebeat, nó định nghĩa cho Filebeat hiểu cần lấy log ở đâu và gửi kết quả đi đâu.

**Trong cấu hình bên trên thì mình cấu hình cho Filebeat làm 3 việc:**
- Lấy các file log ở thư mục **/var/log/containers/** mà tên có định dạng là (vernemq*.log|kafka*.log|zookeeper*.log). Sau đó gán thêm cho các log này một tags là "**myopensource**"
- Lấy các file log ở thư mục **/var/log/containers/** mà tên có định dạng là (viettq*.log). Sau đó gán thêm cho các log này một tags là "**myservice**"
- Gửi output log tới logstash ở địa chỉ "**logstash-logstash:5044**". Trong đó logstash-logstash là service name của Logstash, do cài cùng namespace nên ta chỉ cần khai báo service-name là đủ để Filebeat có thể kết nối được. Port 5044 là port trên Logstash mà ta đã cấu hình khi cài Logstash. 

**Kiểm tra kết quả cài đặt:**
```
[sysadmin@vtq-cicd elastic-filebeat]$ kubectl get pods --namespace=prod -l app=filebeat-filebeat
NAME                      READY   STATUS    RESTARTS   AGE
filebeat-filebeat-99czn   1/1     Running   0          6m14s
filebeat-filebeat-gl2bs   1/1     Running   0          6m14s
filebeat-filebeat-rx4j8   1/1     Running   1          6m14s
```

Như vậy là ta đã cài đặt và cấu hình xong luồng dữ liệu Filebeat --> Logstash --> Elastic Search --> Kibana.

## Giờ cũng check lại kết quả một lượt để verify nhé!
### Đầu tiên cùng check lại các index trên Elastic Search xem khi log gửi về thì các index được tạo ra như thế nào:

**Check danh sách indices trên Elastic Search:**
![image.png](https://images.viblo.asia/5a9384d8-6e1a-4d5b-a2fd-d28fd5f7cb73.png)

Như kết quả thì có thể thấy với log của myervice (là 2 ứng dụng mình tự dựng để gen log như thực hiện bên trên) thì trên elastic search có 2 indices là **logstash_myservice_2022.07.21** và **logstash_myservice_2022.07.20**. Trong khi  log của myopensource (là log của vernemq, kafka, zookeeper) thì lại chỉ có 1 index **logstash_myopensource_2022.07.20**. 

Mình sẽ giải thích kỹ hơn chỗ này. Khi Logstash nhận log từ Filebeat, thì nó đọc thông tin timestamp là thông tin từ bên trong nội dung của file log, và dùng thông tin đó để quyết định sẽ gửi log đó vào index của ngày nào (Mỗi ngày sẽ có một index riêng trên Elastic để lưu log).
Vì các opensource (vernemq, kafka, zookeeper) mình cài từ hôm qua là 20/7/2022 nên nó có log, nhưng vì hôm nay mình chưa làm gì tới tụi nó cả nên nó không có log của ngày 21/7 --> không có index của ngày 21/7 của đám này trên Elastic Search.

**Mình ví dụ cụ thể để chứng minh:**
```
[sysadmin@vtq-cicd elastic-filebeat]$ kubectl -n prod get pods -owide |grep ka
kafka-0                           1/1     Running   0          18h    10.233.68.5     viettq-worker3   <none>           <none>
kafka-client                      1/1     Running   0          18h    10.233.67.164   viettq-worker2   <none>           <none>
[sysadmin@viettq-worker3 containers]$ clear;date; ls -lrt |grep kafka
Thu Jul 21 00:55:51 EDT 2022
lrwxrwxrwx. 1 root root  75 Jul 20 06:02 kafka-0_prod_kafka-3e0169caca1b9c98b89fe826fbf3b4b212246c43b11044c8acfb790c0143403a.log -> /var/log/pods/prod_kafka-0_d30e9e41-25e6-4993-8067-e3ba862863fc/kafka/0.log
```
Trên node **viettq-worker3** đang chạy pod **kafka-0**. Kết nối vào node này check thì file log được last-modified từ 20/7. Trong khi hiện tại là 21/7. 

Ngược lại, đống service mình tự dựng thì trong container nó làm nhiệm vụ ghi log mỗi giây nên có log của cả 2 ngày --> có 2 index trên Elastic Search.

### Kiểm tra dữ liệu trên Kibana

**Kết nối vào kibana qua ingress, vào mục Stack Management --> Index Management:**
![image.png](https://images.viblo.asia/27be2e34-e538-4ea4-bdba-00b7024b0d1f.png)

Ta tháy các index của Logstash đã hiển thị ở đây.

**Tạo Index pattern để query log**

Tạo index pattern cho myservice: 
![image.png](https://images.viblo.asia/c94fe7e2-c59d-4d2a-aff8-6e391d200c92.png)

Tạo index pattern cho myopensource: 
![image.png](https://images.viblo.asia/3a20f102-25d1-4228-852b-ec72a6e14167.png)

**Xem log trên Kibana**

Vào phần Discovery --> Chọn Index pattern là "logstash_myservice*" mà ta đã tạo bên trên để xem log:
![image.png](https://images.viblo.asia/69fcae8c-8821-4216-9c1b-e953646f0605.png)

Trong phần này mình đang có 3 pod viettq-billing và pod viettq-order. Giả sử ta chỉ muốn xem log của viettq-order thì có thể thực hiện query đơn giản trên Kibana dùng cú pháp: **message: "%viettq-order%"**
![image.png](https://images.viblo.asia/6bd8d883-c85e-4248-93d7-0d9ad31d263c.png)


Trong trường hợp muốn xem log tại một khoảng thời gian nhất định thì có thể filter ngay trên giao diện. Ví dụ mình muốn xem log của ngày hôm qua (20/7):
![image.png](https://images.viblo.asia/578aef63-96d8-488a-af0d-a1130cc38cb9.png)

Như vậy đến đây thì cơ bản phần cấu hình logging cho các service đã hoàn thành. Luồng dữ liệu từ Filebeat - Logstash - Elastic Search - Kibana đã thông suốt.

***Hy vọng qua bài này các bạn có cái nhìn tổng quan về hệ thống Logging này và có thể tự tìm hiểu thêm các cấu hình advance hơn nữa để áp dụng và hệ thống của các bạn.***
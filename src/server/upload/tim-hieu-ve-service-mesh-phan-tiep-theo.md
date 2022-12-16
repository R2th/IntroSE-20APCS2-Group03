Sau bài viết trước [Tìm hiểu về Service Mesh](https://viblo.asia/p/tim-hieu-ve-service-mesh-LzD5dWaWljY) là những khái niệm tổng quan về **Service Mesh**, **Istio**. Trong bài viết này, chúng ta sẽ tiếp tục tìm hiểu về Istio và thử triển khai Istio lên nhé :D 

# Kiến trúc Istio 
![](https://images.viblo.asia/97155f54-d1b1-44ec-9db0-3c8be533049f.png)

Ở phiên bản 1.5 trở về trước, control plane của **Istio** được gồm nhiều thành phần như **Pilot**, **Citadel**, **Galley**, **Mixer**,... mỗi thành phần thì lại được deploy trên **Kubernetes** như 1 pod riêng biệt. Tuy nhiên từ những version sau, chúng đươc gộp thành một thành phần duy nhất là `Istiod`, điều này làm cho việc cấu hình và vận hành **Istio** trở nên dễ dàng hơn.

## Ưu điểm khi sử Istio

**Istio** là 1 implementation của **Service Mesh**, nên tính độc lập của application là một trong những ưu tiên hàng đầu vì thế để đưa các chức năng của Istio vào trong ứng dụng microservice của thì chúng ta không cần thiết phải thay đổi các file cấu hình yaml của các **Deployment** hay **Service**, mọi thứ đã được đóng gói trong chính file cấu hình của **Istio**. Việc cài đặt **Istio** cũng tách rời với logic của ứng dụng, không làm thay đổi các *business logic*. 

Các component của Istio được kế thừa từ **Kubernetes API**, dưới dạng **CRD**, giúp ta dễ dàng cấu hình chúng như cấu hình 1 *deployment*, *service* luôn. Istio hỗ trợ cấu hình 

- Traffic routing: cho phép cài đặt nhiều rules khác nhau, quy định các service được giao tiếp với giao nhau.
- Traffice split
- Retry rule, timeout

2 **CRD** chính của Istio là `VirtualService` định tuyến traffic tới 1 service, khi traffic đã đượ định tuyến tới service, chúng ta có thể sử dụng `DestinationRule` để cấu hình các policy lên nó

```yaml:reviews.istio-vs.yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: reviews
spec:
  hosts:
  - reviews
  http:
  - match:
    - headers:
        end-user:
          exact: jason
    route:
    - destination:
        host: reviews
        subset: v2
  - route:
    - destination:
        host: reviews
        subset: v3
        
```
```yaml:review.istio-dr.yaml
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: my-destination-rule
spec:
  host: my-svc
  trafficPolicy:
    loadBalancer:
      simple: RANDOM
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
    trafficPolicy:
      loadBalancer:
        simple: ROUND_ROBIN
  - name: v3
    labels:
      version: v3
```
Khi chúng ta tạo các **CRD** trên **Kubernetes**, `istiod` - control plane của **Istio**, sẽ  convert chúng thành cấu hình của `Envoy` và gửi tất cả các config đó tới các **Envoy Proxy sidecar**. Khi các **Envoy Proxy** đã có được cấu hình, chúng sẽ giao tiếp với nhau (không thông qua `istiod`) dưới các rule mà chúng ta đã define.

Ngoài việc rất dễ dàng cấu hình **Istio**, nó còn mang tới những ưu điểm như:

- ***Service discovery***: **Istio** có 1 central registry cho tất các microservice và các endpoint, không cần phải thêm các cài đặt cho endpoint mỗi microservice, mỗi khi có thêm 1 microservice mới được deploy, nó sẽ được đăng ký 1 các tự động với central registry của Istio
- **Istiod** cũng có thể quản lý các certificates, `istiod` đóng vai trò như 1 certificate authority, generate certificate cho tất cả các service trong cluster, cho phép các service giao tiếp bảo mật hơn thông qua `secured tls communication`.
- **Istio** cũng thu thập telemetry data từ các **Envoy Proxy**.

## Luồng traffic sau khi cài đặt Istio
![image.png](https://images.viblo.asia/cfb5801b-c4cf-4de9-9abf-b78a81ce0598.png)

Ngoài 2 **CRD** là `VirtualService` và `DestinationRule`, `Gateway` đóng vai trò là 1 entrypoint cho các request từ cluster tới microservice application, nó hoạt động tương tự như *Nginx Ingress Controller*, đảm nhiệm việc cân bằng tải, điều hướng traffic tới các microservice bằng cấu hình của `VirtualService`.

Quay lại ví dụ [website bán hàng online](https://viblo.asia/p/tim-hieu-ve-service-mesh-LzD5dWaWljY#_mo-dau-0) trong bài viết trước, luồng của traffic sau khi ứng dụng được cài đặt thêm Istio sẽ như sau: User gửi request tới web server service trong **Kubernetes**, đầu tiên nó sẽ tới `Istio Gateway`, gateway sẽ tìm ra service dựa vào `VirtualService` rule, và gửi request tới web server service, cuối cùng request sẽ tới `Envoy proxy` bên trong service và được forward tới web server container thông qua *localhost*. Từ **web server service**, tiếp tục tạo 1 request tới **payment service**, request sẽ đi từ **web service service** qua **Envoy proxy** của **web server service**, chúng sẽ được so sánh với các rule của `VirtualService` và `DestinationRule` rồi mới tới **Envoy proxy** của **payment service**, giao tiếp giữa **Envoy proxy** của **web server** và **payment** là **mutual TLS**. Quá trình này được lặp lại trên các service tiếp theo mà request tới cho tới khi response về UI.
![image.png](https://images.viblo.asia/c026990d-902d-41a5-8f77-d4bebaeec9ef.png)

# Demo một chút về Istio
- Xem full demo [https://github.com/daothaison/istio-demo](https://github.com/daothaison/istio-demo)
## Tải và cài đặt
Đầu tiên chúng ta cần download Istio và cấu hình cho `istioctl` 

```bash
$ curl -L https://istio.io/downloadIstio | sh -

// Command này sẽ tải về phiên bản mới nhất của Istio, ngoài ra bạn có thể thêm các option vào command trên để có thể tuỳ chỉnh phiên bản cần tải về

$ curl -L https://istio.io/downloadIstio | ISTIO_VERSION=1.6.8 TARGET_ARCH=x86_64 sh -
```

Hoặc chúng ta có thể vào [đây](https://github.com/istio/istio/releases/tag/1.11.0) để lựa chọn phiên bản, sau đó tải về và giải nén ra. Sau đó 
thêm `istioctl` vào `PATH`

![image.png](https://images.viblo.asia/df1fdd5e-e745-4d93-a44b-a1097f27cda4.png)

Tiếp theo, chúng ta phải cài đặt **Istio** vào **kubernetes cluster** bằng việc sử dụng `istioctl` 

```bash
➜ istioctl install
This will install the Istio 1.11.0 default profile with ["Istio core" "Istiod" "Ingress gateways"] components into the cluster. Proceed? (y/N) y
✔ Istio core installed
✔ Istiod installed
✔ Ingress gateways installed
✔ Installation complete
Thank you for installing Istio 1.11.  Please take a few minutes to tell us about your install/upgrade experience!  https://forms.gle/kWULBRjUv7hHci7T6
```
namespace và các **pod** của **Istio** được thêm vào cluster là ok :D 
![image.png](https://images.viblo.asia/7ea67592-2722-4878-b84e-4a4307eeca66.png)

## Inject Envoy proxy vào service

Trong bài viết này, mình sử dụng [microservices-demo](https://github.com/GoogleCloudPlatform/microservices-demo/blob/master/release/kubernetes-manifests.yaml) của Google Cloud luôn. Bạn chỉ cần tải file manifest này về vào apply lên có 1 microservices app hoàn chỉnh rồi. Bây giờ bạn đã có control plane và các service hoạt động, việc tiếp theo là inject các **Envoy proxy** vào các **service**, bằng cách bổ sung **label** cho **namespace** của ứng dụng

```bash
➜ kubectl get pods
NAME                                     READY   STATUS    RESTARTS   AGE
adservice-75f6d84ddd-jrskp               1/1     Running   0          10m
cartservice-75d66997cf-xmk8n             1/1     Running   2          10m
checkoutservice-855cd595b4-zwwtd         1/1     Running   0          10m
currencyservice-5b74f955c4-k8n64         1/1     Running   0          10m
emailservice-95cc959f8-x2gwr             1/1     Running   0          10m
frontend-79c8999fb6-qg8st                1/1     Running   0          10m
loadgenerator-589648f87f-8xdbr           1/1     Running   0          10m
paymentservice-7d679d5b98-5qr89          1/1     Running   0          10m
productcatalogservice-5f7d6665c6-qlrwg   1/1     Running   0          10m
recommendationservice-7569586f96-2k5q8   1/1     Running   0          10m
redis-cart-5b569cd47-hdf5h               1/1     Running   0          10m
shippingservice-749b654bb4-2mckg         1/1     Running   0          10m
➜  kubectl get ns default --show-labels
NAME      STATUS   AGE   LABELS
default   Active   39m   kubernetes.io/metadata.name=default
➜ kubectl label namespace default istio-injection=enabled
namespace/default labeled
➜ kubectl get ns default --show-labels
NAME      STATUS   AGE   LABELS
default   Active   39m   istio-injection=enabled,kubernetes.io/metadata.name=default

```

Bây giờ chúng ta cần tắt các pod vừa tạo đi, vào tạo lại để lúc này **Istio** inject các proxy vào. Như bạn thấy, trước khi chúng ta inject proxy vào thì mỗi **pod** của ứng dụng chỉ có 1 container, còn sau khi inject proxy, nó đã tăng lên thành 2

```bash
➜ kubectl get pods
NAME                                     READY   STATUS    RESTARTS   AGE
adservice-75f6d84ddd-fv2pr               2/2     Running   0          2m37s
cartservice-75d66997cf-ns7cg             2/2     Running   2          2m38s
checkoutservice-855cd595b4-44gtf         2/2     Running   0          2m38s
currencyservice-5b74f955c4-5hd6s         2/2     Running   0          2m38s
emailservice-95cc959f8-tzxwk             2/2     Running   0          2m38s
frontend-79c8999fb6-sg2hn                2/2     Running   0          2m38s
loadgenerator-589648f87f-vk7cc           2/2     Running   0          2m38s
paymentservice-7d679d5b98-7rjzs          2/2     Running   0          2m38s
productcatalogservice-5f7d6665c6-wlgmg   2/2     Running   0          2m38s
recommendationservice-7569586f96-xvbvl   2/2     Running   0          2m38s
redis-cart-5b569cd47-7tm55               2/2     Running   0          2m37s
shippingservice-749b654bb4-h7xsh         2/2     Running   0          2m38s
```
và khi kiểm tra pod, chúng ta sẽ thấy các thông tin liên quan đến Istio được inject tự đọng vào pod

```bash
$ kubectl describe pod adservice-75f6d84ddd-fv2pr

Init Containers:
  istio-init:
    Container ID:  docker://64a984330386584eea2225c503bc44d5420c293067de9580f469aeea11359b9d
    Image:         docker.io/istio/proxyv2:1.11.0
    
Containers:
istio-proxy:
    Container ID:  docker://c9ffc5d2295623a186d30fa809cb7c43f22c451479aa5e8f66bc2afc7d3f49af
    Image:         docker.io/istio/proxyv2:1.11.0
```

## Cài đặt Istio Addons để monitoring và data visualization

Trong file cài đặt **Istio** ở trên, **Istio** đã cung cấp file cấu hình để tích hợp các [addon](https://istio.io/latest/docs/ops/integrations/) vào Istio ở trong thư mục `samples/addons`. Đơn giản bạn chỉ cần vào thư mục đó và chạy command
```bash
$ cd samples/addons
$ kubectl apply -f .

serviceaccount/grafana created
configmap/grafana created
service/grafana created
deployment.apps/grafana created
configmap/istio-grafana-dashboards created
configmap/istio-services-grafana-dashboards created
deployment.apps/jaeger created
service/tracing created
service/zipkin created
service/jaeger-collector created
serviceaccount/kiali created
configmap/kiali created
clusterrole.rbac.authorization.k8s.io/kiali-viewer created
clusterrole.rbac.authorization.k8s.io/kiali created
clusterrolebinding.rbac.authorization.k8s.io/kiali created
role.rbac.authorization.k8s.io/kiali-controlplane created
rolebinding.rbac.authorization.k8s.io/kiali-controlplane created
service/kiali created
deployment.apps/kiali created
serviceaccount/prometheus created
configmap/prometheus created
clusterrole.rbac.authorization.k8s.io/prometheus created
clusterrolebinding.rbac.authorization.k8s.io/prometheus created
service/prometheus created
deployment.apps/prometheus created

$ kubectl get pods -n istio-system
NAME                                    READY   STATUS              RESTARTS   AGE
grafana-68cc7d6d78-h8tbh                1/1     Running             0          68s
istio-ingressgateway-85fbdd86f7-84gwf   1/1     Running             0          37m
istiod-75d5bf4676-m8mkt                 1/1     Running             0          38m
jaeger-5d44bc5c5d-rwzhh                 1/1     Running             0          68s
kiali-fd9f88575-q569n                   1/1     Running             0          67s
prometheus-77b49cb997-whb8c             0/2     ContainerCreating   0          67s
```
và như vậy chúng ta đã có các công cụ hỗ trợ monitoring và data visualization.

### Sử dụng Kialia
Ví dụ để truy cập vào **Kiali**, do chúng ta sử dụng **ClusterIP** nên để truy cập từ bên ngoài vào trong cluster, ta cần forward port ra bằng command

```bash
$ kubectl port-forward svc/kiali -n istio-system 20001
Forwarding from 127.0.0.1:20001 -> 20001
Forwarding from [::1]:20001 -> 20001
```
![image.png](https://images.viblo.asia/c28f7089-4038-49b2-8b14-926390f47828.png)

Kiali giúp chúng ta xem được network của ứng dụng microservice, kiểm tra request giữa từng service, response time,...
![image.png](https://images.viblo.asia/81abdc9c-b275-4f39-8d57-988f2dbaf3a2.png)

### Sử dụng Jaeger

Để sử dụng **Jaeger**, bạn cần chạy command 

```bash
$ istioctl dashboard jaeger
```
**Istioctl** sẽ mở dashboard của **Jaeger**, lựa chọn service là bạn đã xem được các thông tin mà **Jaeger collector** đã thu thập về
![image.png](https://images.viblo.asia/b77fa75e-30b5-44a9-a496-04b85a598408.png)

# Kết bài

Như vậy hy vọng qua bài viết này các bạn đã nắm được cơ bản về cách hoạt động của `Service Mesh` cũng như `Istio` và cách cấu hình để inject proxy vào các service, cách sử dụng dụng các Addon hỗ trợ thu thập telemetry data và visualization chúng, cách sử dụng Kiali hay Jaeger mình đang demo dưới local nên có thể chạy trực tiếp các command trên, với môi trường production, bạn cần sử dụng Ingress Controller để kết nối tới các service trên.

# Tài liệu tham khảo

- https://github.com/istio/istio/releases/tag/1.11.0
- https://istio.io/
- https://github.com/GoogleCloudPlatform/microservices-demo
- https://github.com/daothaison/istio-demo
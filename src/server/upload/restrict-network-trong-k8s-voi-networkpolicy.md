![image.png](https://images.viblo.asia/a5d26c40-b4ec-4928-b321-c0e74d148451.png)
# NetworkPolicy làm gì?

Network Policy giúp chúng ta kiểm soát lưu lượng truy cập mạng trong cụm Cluster tại Layer 3,4. Để có thể xác định được gói tin có được chấp nhận hay không ta có thể lọc với các thành phần:

Thông qua các label được gắn vào pod
Thông qua 1 cụm các pod chung namespace
Thông qua một dải IP (IP Block) VD: 172.0.1.0/24
 
Có thể xem NetworkPolicy sẽ định nghĩa ra các "firewall rules" để kiểm tra các gói tin đến và đi trước mỗi Pod.

# Định nghĩa NetworkPolicy
NetworkPolicy là một resource trong k8s, chính vì vậy ta sẽ định nghĩa dưới file Yaml.
 
Network Policy sẽ kiểm soát lưu lượng mạng vào (Ingress) và ra (Egress)

## Ingress 
Mặc định nếu không khai báo trường Ingress thì sẽ allow toàn bộ traffic vào pod, ví dụ sau sẽ cho phép kết nối đến pod chạy dịch vụ mysql tại port 3306

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: test-networkpolicy 								(1)
  namespace: default									(2)
spec:
  policyTypes:											(3)
  - Ingress
  ingress:											
  - from:
  	- ipBlock:											(4)
        cidr: 172.17.0.0/16								
      	except:
        - 172.17.1.0/24
    - podSelector:										(5)
        matchLabels:
          role: frontend
    - namespaceSelector:								(6)
        matchLabels:
          kubernetes.io/metadata.name: test-namespace 	
    ports:												(7)
    - port: 3306									
      protocol: TCP
  podSelector:											(8)
    matchLabels:
      app.kubernetes.io/instance: mysql
```
**Giải thích:**

(1) Tên của networkPolicy sẽ tạo

(2) Namespace sẽ áp dụng NetworkPolicy này, nếu không khai báo thì mặc định sẽ apply cho namespace mặc định trong kube config.

(3) Liệt kê các loại Policy sẽ định nghĩa. (Ingress, Egress hoặc cả 2)

(4) Liệt kê dải IP sẽ được chấp thuận kết nối (Ví dụ này sẽ allow dải 172.17.0.0 đến 172.17.255.255 trừ dải ở giữa 172.17.1.0 đến 172.17.1.255 )

(5) Cho phép các pod có label là role=fontend được kết nối.

(6) Cho phép các pod từ namespace có label là kubernetes.io/metadata.name=test-namespace được kết nối.

(7) Định nghĩa các destination port được kết nối đến cùng giao thức, ở đây là port của MySQL 3306 với giao thức TCP.

(8) Chọn các pod có label app.kubernetes.io/instance: mysql  trong namespace default để áp dụng policy.

## Egress:
 
Tương tự Ingress, Egress sẽ định nghĩa luật cho phép những gói tin nào được phép đi ra ngoài. Egress sẽ lọc gói tin bằng Destination IP và Destination Port.
```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: test-network-policy
  namespace: default
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:						(1)
  - Egress
  egress:
  - to:
    - ipBlock:						(2)
        cidr: 10.0.0.0/24
    ports:							(3)
    - protocol: TCP
      port: 5978
      endPort: 8000
```
Giải thích:

(1) Định nghĩa kiểu luật sẽ áp dụng (Ingress hoặc Egress)

(2) Xác định IP đích mà được phép giao tiếp
 
(3) Xác định số hiệu cổng đích được phép giao tiếp (Ở phiên bản K8s 1.22 cho phép ta định nghĩa 1 dải các Port bằng cách thêm trường endPort)

# Một số case đặc biệt
Deny toàn bộ Ingress traffic vào toàn bộ pod trong namespace mặc định (Không khai báo namespace thì sẽ áp dụng cho namespace mặc định)
```
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
spec:
  podSelector: {}
  policyTypes:
  - Ingress
```

Allow toàn bộ traffic vào toàn bộ pod
```
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-all-ingress
spec:
  podSelector: {}
  ingress:
  - {}
  policyTypes:
  - Ingress
```

Deny toàn bộ Egress traffic
```
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-egress
spec:
  podSelector: {}
  policyTypes:
  - Egress
```

Allow toàn bộ Egress traffic
```
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-all-egress
spec:
  podSelector: {}
  egress:
  - {}
  policyTypes:
  - Egress
```

# Tham khảo:

https://kubernetes.io/docs/concepts/services-networking/network-policies/

https://sysdig.com/learn-cloud-native/kubernetes-security/network-security/
 
https://viblo.asia/p/kubernetes-series-bai-14-podsecuritypolicies-networkpolicy-security-cho-cluster-nodes-va-network-djeZ1d1gKWz
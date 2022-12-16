# P1. Kustomize là gì?
**Helm** hỗ trợ chỉnh sửa nâng cao từng vị trí của yaml *trên 1 môi trường nhất định*. **Kustomize** lại có điểm mạnh là hỗ trợ nhiều môi trường (prod, stag, dev1, dev2.....) qua việc dùng overlays. (Ngoài ra, ta vẫn có thể kết hợp kustomize và helm cùng nhau)

1. Cài đặt
```
# curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh"  | bash
# mv kustomize /usr/local/bin/

#----Thêm bash-completion cho kustomize----
# yum install bash-completion
# kustomize completion bash > /etc/bash_completion.d/kustomize
> thoát phiên ssh và vào lại.
```

3. Cấu trúc  thư mục của Kustomize

![](https://images.viblo.asia/3405f5aa-6386-4ad4-9602-8c92260cc52d.PNG)

4. Hướng dẫn tạo kustomization.yaml
```
# mkdir -p 01.resouce/base
# cd 01.resouce/base
# kustomize init  #(Lệnh này sẽ tạo ra file kustomization.yaml mặc định)

# cat kustomization.yaml 
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
```

> YAML mẫu toàn bộ bài viết, các bạn có thể tham khảo ở đây https://github.com/worldhello12/kustomize-sample
# P2: Resources
**Khái niệm:** Resources gồm 1 hoặc nhiều file .yaml k8s > Là đầu vào input cho kustomize xào nấu.

**Ví dụ về sử dụng Resources**
![](https://images.viblo.asia/b824728f-7a86-41bf-a2f4-4996fd85bdad.PNG)


1. Sửa file kustomization.yaml vừa init
```
# vim kustomization.yaml 
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - api-depl.yaml
  - api-service.yaml
```

2. Chuẩn bị deployment và service mẫu: api-depl.yaml và api-service.yaml
```
# cd 01.resouce/base
# kubectl create deployment nginx-api --image=nginx:alpine --replicas=3 --dry-run=client -o yaml > api-depl.yaml

# vim api-service.yaml
apiVersion: v1
kind: Service
metadata:
  creationTimestamp: null
  labels:
    app: nginx-api
  name: nginx-api
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 80
    nodePort: 30181
  selector:
    app: nginx-api
  type: NodePort
status:
  loadBalancer: {}
```
3. Chạy Test build Kustomize
```
# kustomize build .
> Kết quả ta có yaml final để chạy k8s

# kustomize build .  | kubectl apply -f -
service/nginx-api created
deployment.apps/nginx-api created

# kustomize build .  | kubectl delete -f -
```
# P3: Transformer common
> (tham khảo: https://github.com/kubernetes-sigs/kustomize/tree/master/examples/transformerconfigs)

Kustomize hỗ trợ transformer chuyển đổi những loại dưới đây:
```
- Sửa  (images)
- Thêm (annotations)
- Thêm (labels)
- Thêm (namespace)
- Thêm (prefix/suffix) (đầu/cuối)
```
Ta đi vào ví dụ về transformer:

**Bước 1. Chuẩn bị deployment và service mẫu (api-depl.yaml và api-service.yaml)**
```
# mkdir -p 02.transformer/base
# cd 02.transformer/base
# kubectl create deployment web-frontend --image=httpd:alpine --replicas=3 --dry-run=client -o yaml > api-depl.yaml


# vim api-service.yaml
apiVersion: v1
kind: Service
metadata:
  creationTimestamp: null
  labels:
    app: nginx-api
  name: nginx-api
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 80
    nodePort: 30181
  selector:
    app: nginx-api
  type: NodePort
status:
  loadBalancer: {}
 ```

**Bước 2. Sửa kustomization.yaml**
```
[tuanda@master-node ]$ kustomize init
[tuanda@master-node ]$  tree
├── api-depl.yaml
├── api-service.yaml
└── kustomization.yaml

# vim kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - api-depl.yaml
  - api-service.yaml

# Gán transformer namespace cho toàn bộ .yaml
namespace: tuanda

# Đổi transformer image và tag trong deployment nếu trùng "name"
images:
  - name: httpd
    newName: nginx
    newTag: 1.21.0

#transformer Đặt tên đầu và cuối cho .yaml. 
#VD: xxx thành LAB-xxx-dev
namePrefix: LAB-
nameSuffix: -dev

#Thêm Annotations
commonAnnotations:
  branch: master

#Thêm Labels vào toàn bộ yaml
commonLabels:
  someName: someValue
  owner: tuanda
  app: bingo
```
**Kết quả:**
```
# kustomize build .
```

![](https://images.viblo.asia/79f53ee1-6876-4dbc-8720-9a0f96da694a.PNG)




# P3: Overlays-base

**Khái niệm:** Để phân tách các tham số theo từng môi trường (**prod/stag/dev**). Ta có thể sử dụng overlays của kustomize. 

Trong đó những tham số chung sẽ đặt trong thư mục **"base"**, những cấu hình riêng của từng môi trường (như số replicas, secret-configmap) sẽ đặt trong thư mục **"overlays"**

![](https://images.viblo.asia/7cb26734-951e-481d-baa4-96ab6b632ec0.PNG)

**1. Tạo cây thư mục cơ bản**
```
# cd kustomize-sample
# mkdir -p 03.overlays/overlays   #(thư mục base đã được tạo ở ví dụ 1)
# mkdir -p 03.overlays/overlays/prod
# mkdir -p 03.overlays/overlays/stag
# mkdir -p 03.overlays/overlays/dev
```


**2. Sửa kustomization.yaml trong cả 3 thư mục con của overlays (prod/stag/dev) với nội dung như sau**
```
# cp -rp kustomize-sample/02.transformer/base kustomize-sample/03.overlays/  #(mượn tạm thư mục base của phần 2, hoặc bạn tự tạo lại bằng kubecli)
# vim kustomize-sample/03.overlays/overlays/prod/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

nameSuffix: -prod #(chú ý đổi Suffix trong cả 3 file)

bases:
  - ../../base
  
resources:
  - config-map.yaml #(mỗi 1 môi trường sẽ có config-map.yaml riêng)
```


**3. Tạo config-map.yaml ứng với từng môi trường**
```
# vim kustomize-sample/03.overlays/overlays/prod/config-map.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: database-cfg
data:
  password: prod-pwd-123
  username: prod-acc-123

# vim kustomize-sample/03.overlays/overlays/stag/config-map.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: database-cfg
data:
  password: stag-pwd-123
  username: stag-acc-123

# vim kustomize-sample/03.overlays/overlays/dev/config-map.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: database-cfg
data:
  password: dev-pwd-123
  username: dev-acc-123
```

**4. Chạy kustomize kiểm tra khai báo BASE đã đúng chưa**
```
# cd kustomize-sample/03.overlays/overlays/prod
kustomize build .

# cd kustomize-sample/03.overlays/overlays/stag
kustomize build .

# cd kustomize-sample/03.overlays/overlays/dev
kustomize build .
```
**Kết quả:** Mỗi môi trường ta đều deploy api-depl.yaml và api-service.yaml, nhưng config-map.yaml **tài khoản và mật khẩu** sẽ khác nhau từng môi trường

![](https://images.viblo.asia/a9795d1d-1796-45c9-82d2-3dd6b54f3ffe.PNG)



# P4: Patches

> (Tham khảo:) 
>> Jsonpath6902: https://github.com/kubernetes-sigs/kustomize/blob/master/examples/jsonpatch.md
>> 
>>  Strategic merge: https://fabianlee.org/2022/04/18/kubernetes-kustomize-transformations-with-patchesstrategicmerge/

Patches có 3 chức năng chỉnh sửa vào yaml k8s: **replace, delete, add**

### Ví dụ 1: Replace patch

Đề bài đặt ra:
```
- Prod tôi muốn sửa 10 pod cho nginx
- Stag tôi muốn sửa 9 pod cho nginx
- Dev tôi muốn sửa 8 pod cho nginx, thay image nginx:alpine thành httpd:alpine
```
Bài giải: Có 2 cách là dùng **Json6092** hoặc  **Strategic Merge Patch**

**Cách giải 1: Json6902 patch**
```

# vim kustomize-sample/04.patches/vd1-replace/json6902/overlays/prod/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

nameSuffix: -prod #(chú ý đổi Suffix trong cả 3 file)

bases:
  - ../../base
  
resources:
  - config-map.yaml

#patch json6902 demo replace
patches:
  - target:
      kind: Deployment
      name: nginx-api
    patch: |-
      - op: replace
        path: /spec/replicas
        value: 10
--------------------------
# # vim kustomize-sample/04.patches/vd1-replace/json6902/overlays/stag/kustomization.yaml
> tương tự như prod trên, sửa value 10 thành 9
--------------------------
# vim kustomize-sample/04.patches/vd1-replace/json6902/overlays/dev/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

nameSuffix: -dev

bases:
  - ../../base
  
resources:
  - config-map.yaml

#demo patches json6902 replace dev
patches:
  - target:
      kind: Deployment
      name: nginx-api
    patch: |-
      - op: replace
        path: /spec/replicas
        value: 8
        
  - target:
      kind: Deployment
      name: nginx-api        
    patch: |-
      - op: replace
        path: /spec/template/spec/containers/0
        value:
          name: newnametest
          image: httpd:alpine
```
**Kết quả:**

![](https://images.viblo.asia/c5cd9d6c-1f08-4771-96d2-188a11ffbc04.PNG)
\> các kết quả ở stag, dev các bạn tự chạy (kustomize build .) nhé.


**Cách giải 2: Strategic merge patch**
```
# vim kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

nameSuffix: -prod #(chú ý đổi Suffix trong cả 3 file)

bases:
  - ../../base
  
resources:
  - config-map.yaml


#patch strategic-merge demo replace
patches:
  - patch: |-
      apiVersion: apps/v1
      kind: Deployment
      metadata:
        creationTimestamp: null
        labels:
          app: nginx-api
        name: nginx-api
      spec:
        replicas: 10

(ta có 1 cách khác là load từ file path/api-depl.yaml, bạn có thể tham khảo thư mục stag trên git của tôi)  
--------------------------
# kustomize build .
```
**Kết quả**

![](https://images.viblo.asia/c2d44ce2-e52f-4757-9597-25cc16ef6f6a.PNG)
Ta có thể áp dụng kustomize patches để thay thế bất kì tham số nào ta muốn: vd trong services chuyển type NodePort/ClusterIP/Balance theo từng môi trường

### Ví dụ 2: Add patch
```
#VD2----JSON6902 add----#
#demo patches json6902 add
patches:
  #Patch add logstash service mesh
  - target:
      kind: Deployment
      name: nginx-api        
    patch: |-
      - op: add
        path: /spec/template/spec/containers/-
        value:
          name: logstash-mesh
          image: logstash:latest
```
```
#VD2----Strategic Merge add----#
#patch strategic-merge demo add
patches:
  - patch/api-depl.yaml
  
# vim patch/api-depl.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-api
spec:
  template:
    spec:
      containers:
      - image: nginx:alpine
        name: nginx
      - image: logstash:latest
        name: logstash-mesh
```
Kết quả chung cả 2 cách: 
![](https://images.viblo.asia/118b8051-7705-4fd5-84e7-7e985f9a670e.PNG)


### Ví dụ 3: Delete patch

```
#----JSON6902 remove----#
#demo patches json6902 delete creationTimestamp
patches:
  - target:
      kind: Deployment
      name: nginx-api        
    patch: |-
      - op: remove
        path: /spec/template/metadata
        value:
          - creationTimestamp
```

```
#----Strategic Merge remove----#
#patch strategic-merge demo replace
patches:
  - patch/api-depl.yaml
  
# vim patch/api-depl.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-api
spec:
  template:
    spec:
      containers:
        - $patch: delete
          name: tomcat
```

# P6: Component
> (Tham khảo: https://github.com/kubernetes-sigs/kustomize/blob/master/examples/components.md)

Mục đích của Component sinh ra là tái sử dụng các thành phần **cần dùng lại** cho từng môi trường. VD ta có bảng sau


| Overlays | External-DB history |Cache |
| -------- | -------- | -------- |
| prod     | Yes     | Yes     | 
| stag    | No     | Yes     | 
| dev     | Option     | Option     | 

Như bảng trên. 
- Prod cần DB phụ để lưu trữ data lịch sử người dùng, và cache để tăng load dữ liệu từ ram
- Stag không cần DB lưu lượng lớn dữ liệu lịch sử, cần cache để test hiệu năng
- Dev có thể add thêm DB và Cache nếu cần test, hoặc ko có cũng đc.
Ta sẽ thiết kế component file như sau:

![](https://images.viblo.asia/18e6858e-ab3e-422f-bd8a-7dbda206ff86.PNG)

Sửa file kustomization.yaml theo từng môi trường. (Yaml mẫu: https://github.com/worldhello12/kustomize-sample/tree/main/05.component )
```
# vim prod/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

bases:
  - ../../base

components:
  - ../../components/external_db
  - ../../components/cache
```

File components/external_db/kustomization.yaml. Ta chú ý **kind, apiVersion** sẽ là Component
```
# vi components/external_db/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1alpha1
kind: Component

resources: 
  - external_db_cfg.yaml
  - external_db_depl.yaml
```
Chạy kustomize build trên cả 3 môi trường , ta sẽ có kết quả như bảng.
| Overlays | External-DB history |Cache |
| -------- | -------- | -------- |
| prod     | Yes     | Yes     | 
| stag    | No     | Yes     | 
| dev     | Option     | Option     |

.

*Bài viết trong phạm vi kiến thức của người soạn, nếu bạn có cách giải hay hơn xin giới thiệu, góp ý. cảm ơn.*
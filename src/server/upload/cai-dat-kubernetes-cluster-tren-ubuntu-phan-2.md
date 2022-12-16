OK ! Chúng ta làm tiếp phần 2 cũng là phần cuối cuả chủ đề : [Cài đặt kubernetes cluster trên Ubuntu. [phần 1] ](https://viblo.asia/p/cai-dat-kubernetes-cluster-tren-ubuntu-phan-1-Do7544Ne5M6)

Trên server master chúng ta khởi động kubentetes bằng cách chạy : 
```
    # kubeadm init --apiserver-advertise-address=<ip-address-of-kmaster-vm> --pod-network-cidr=192.168.0.0/16
```
Output ra sẽ là : 
![](https://images.viblo.asia/b3cf228d-3dfa-4157-b3a5-8aba157617a5.png)

Trên terminal bạn thấy hướng dẫn, nên nếu bạn đang chạy user non-root thì thực hiện : 

```
$ mkdir -p $HOME/.kube
$ sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
$ sudo chown $(id -u):$(id -g) $HOME/.kube/config
```
Sau đó kiểm tra xem ```kubectl``` có chạy không ? chúng ta thực hiện lệnh sau: 

```
    $ kubectl get pods -o wide --all-namespaces
```

Và Output sẽ như hình : 
![](https://images.viblo.asia/f585bffe-aacc-403a-8283-50f6c0a34b5c.png)

Sau đó cài CALIO bạn chạy : 

```
    $ kubectl apply -f https://docs.projectcalico.org/v3.0/getting-started/kubernetes/installation/hosted/kubeadm/1.7/calico.yaml 
```

Với điều kiện server bạn phải kết nối internet. 

Verify lại CALIO có chạy không  ?

![](https://images.viblo.asia/7943bf74-ab2f-48d9-8d34-87f120f41c7b.png)

OK, bây giờ ta cài Dashboard cho kubernetes cluster để cho dễ vận hành: 

```
    $ kubectl create -f https://raw.githubusercontent.com/kubernetes/dashboard/master/src/deploy/recommended/kubernetes-dashboard.yaml
```

Verify lại Dashbroad chạy chưa ? 
![](https://images.viblo.asia/574ccaaf-a46f-492a-a9ff-6694a8a8b2b8.png)

Ok ! vậy khỏe rồi, Dashboard đã lên. nhưng hiện tại bạn chưa thể truy cập vào Dashboard bằng trình duyệt. 

Bật tính năng proxy lên mới có thể truy cập được Dashboard : 

```
        kubectl proxy
```

Ok, truy cập vào Dashboar với URL sau: 

http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/

Dashboard hiện thị ra: 
![](https://images.viblo.asia/7c54e6da-9b39-4ee7-811b-e42a61f72e17.png)

Mục đích để truy cập vào Dashboard chúng ta tạo service account cho nó: 

```
        $ kubectl create serviceaccount dashboard -n default
```

Thêm cluster binding rule vào Dashboard account : 

```
kubectl create clusterrolebinding dashboard-admin -n default 
  --clusterrole=cluster-admin 
  --serviceaccount=default:dashboard
```

Tạo token login : 

```
    $ kubectl get secret $(kubectl get serviceaccount dashboard -o jsonpath="{.secrets[0].name}") -o jsonpath="{.data.token}" | base64 --decode
```

Output sẽ ra như hình: 
![](https://images.viblo.asia/13587438-cf66-4022-af9b-f116e3d15575.png)

Copy token đó để truy cập vào Dashboard: 

![](https://images.viblo.asia/355649ca-22fe-4273-863b-a8d24cb8422e.png)

Đăng nhâp vào ra trang home như hình: 

![](https://images.viblo.asia/339e7798-20c5-4553-b736-829b43957a45.png)

Trên Kubernetes node server chạy câu lệnh kubeadm join. như console: 

![](https://images.viblo.asia/f1c7770d-30cd-4711-94d5-c077ca5fd9ea.png)

Ok ! VẬy bạn đã thiết lập kubernetes cluster với 2 servers thành công. ~
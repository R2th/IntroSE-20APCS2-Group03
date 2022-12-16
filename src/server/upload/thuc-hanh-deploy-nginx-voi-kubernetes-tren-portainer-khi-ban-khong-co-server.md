Đôi khi bạn học 1 số lý thuyết devOps, muốn có thể thực hành luôn mà kinh phí không có ? Vấn đề này được giải quyết bởi **katacoda** - trang để thực hành nhanh nhất có thể với kubernetes.

## Katacoda
Với DevOps việc thực hành là điều cần thiết sau khi có lý thuyết, chỉ cần 1 thời gian là bạn có thể quên đi những gì bạn học mà không thực hành. Katacoda cung cấp các khóa học steps by steps để tiếp cận người sử dụng nhanh nhất có thể hiểu được hệ thống chạy như thế nào ?

![](https://images.viblo.asia/ed4761c6-f6eb-4595-81d5-ec356e61f702.png)

## Khởi động kubernetes trên katacoda
![](https://images.viblo.asia/f1ee65e1-4ddc-4953-9bb6-63abb3e357a0.png)

chúng ta sẽ chạy `launch.sh` để khởi tạo 2 node Kubernetes, trong đó có 1 node là master.

## Cài đặt portainer trên katacoda
Phần terminal của master node chúng ta chạy 2 dòng lệnh sau.

```
curl -sLS https://dl.get-arkade.dev | sudo sh
arkade install portainer
```

![](https://images.viblo.asia/f6aa0504-ac2c-458a-b6f8-ccfa79dcc089.png)

Ở đây chúng ta có 2 sự lựa chọn để mở portainer:
* Lựa chọn đầu tiên là chạy dòng lệnh forward service portainer sang cổng 9000 chạy ở local
* Lựa chọn thứ hai chúng ta access trực tiếp vào cổng 30777 với địa chỉ node-ip hiện có

Do hiện tại chúng ta đang remote đến server của katacoda nên phương án đầu tiên không khả thi, chúng ta sẽ sử dụng phương án 2 do chúng ta có thể access được remote node-ip

![](https://images.viblo.asia/94afbd88-b7b0-4e15-8ffb-08e206276f88.png)

Chọn `View HTTP port 8080 on Host 1` sửa chọn port 30777
![](https://images.viblo.asia/03b1b74c-9c04-44da-985d-282b30ac9bc2.png)

Tạo tài khoản admin lần đầu
![](https://images.viblo.asia/c1f111c1-4198-4c3d-96fe-255e8bcad580.png)

Chọn Kubernetes mặc định
![](https://images.viblo.asia/e9ea59f4-de05-49f7-bf8c-c61eb878b49a.png)

## Setup Nginx
Click `Home` có các mục `Endpoints` local 

![](https://images.viblo.asia/e363b8e0-781c-4156-b5a6-28ec92ac59ca.png)

Chọn `Applications` có button `+ Add Application`

![](https://images.viblo.asia/bddb4e1e-647f-427f-a9a2-430a2e22f20d.png)

Chúng ta sẽ setup đơn giản như sau

![](https://images.viblo.asia/830e4bc2-e47c-4d91-8c84-cf2f9f26d6d3.png)
![](https://images.viblo.asia/0378d125-3053-4d3f-a70a-049e1679665a.png)

Sơ qua thì là tên là `test` có image là `nginx` sử dụng namespace resource `default`, các config khác như ENV thì không cần. Ở phần resource phần cứng thì mình để unlimited. Số replicated được tạo ra mình chọn là 10 replica để chạy được cái `svc` (services nginx). 

Chúng ta đợi số lượng replicated tạo được đủ để sẵn sàng truy cập

![](https://images.viblo.asia/2e07f985-29b3-42a6-ad9d-79a6ed8cd6fe.png)

Vào detail của application  `test`

![](https://images.viblo.asia/a903a643-7da7-4bf2-8317-6dc1b5cd2dbb.png)

ở đây cluster node port là 30862. chúng ta sẽ truy cập chúng thông qua kataconda như đã làm ở trên kết quả nhận được sẽ là trang default của nginx:
![](https://images.viblo.asia/3a699598-cb0c-4ae0-824f-078fdf4e5d96.png)

## References
https://www.portainer.io/2020/04/portainer-for-kubernetes-in-less-than-60-seconds/
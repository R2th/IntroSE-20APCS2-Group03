> Bài viết này là một phần của chùm bài viết: Private cloud OpenShift <br>

> Bạn có thể  đọc phần trước: "[PRIVATE CLOUD OPENSHIFT – P1: Cài đặt OpenShift bảng Community cho môi trường Production](https://viblo.asia/p/private-cloud-openshift-p1-cai-dat-openshift-bang-community-cho-moi-truong-production-oOVlY0vBZ8W)"

# VI/ Nâng cấp:
*Tiến trình công việc: nâng cấp okd 4.6 lên 4.7 <br>*

Đứng tại okd4-services, thực hiện như sau:
##### Fix lỗi phân giải tên miền
 OKD bị lỗi khi phân giải tên miền cho upstream "origin-release.svc.ci.openshift.org"
```
oc patch ClusterVersion version --type merge --patch '{"spec":{"upstream":"https://amd64.origin.releases.ci.openshift.org/graph"}}'
```
##### Thực hiện **upgrade** lên version **4.7.0-0.okd-2021-08-22-163618**
```
oc adm upgrade --clear=true
oc adm upgrade --to=4.7.0-0.okd-2021-08-22-163618 --force=true --allow-upgrade-with-warnings
```
Quá trình upgrade hơi bị lâu một chút vì nó không chỉ upgrade okd 4.6 -> okd 4.7 mà nó còn upgrade cả hệ điều hành từ FCOS 33 -> FCOS 34

##### Theo dõi phần trăm quá trình thực hiện
```
oc get clusterversion
```
*-> Nó sẽ hiển thị phần trăm hoàn thành* <br>
Khi 100% hoàn thành thì sẽ có kết quả sau:
```
$ oc get clusterversion
NAME      VERSION                                          AVAILABLE   PROGRESSING   SINCE   STATUS
version   4.7.0-0.okd-2021-08-22-163618                    True        False         3m34s   Cluster version is 4.7.0-0.okd-2021-08-22-163618
```
##### Kiểm tra các CO (ClusterOperator) đã lên hết version 4.7.0-0.okd-2021-08-22-163618   chưa
> $ oc get co

![](https://images.viblo.asia/773d13ed-4472-407d-862d-490959a42a5e.png)

Nếu thấy tất cả CO đều có VERSION “4.7.0-0.okd-2021-08-22-163618” và AVAIABLE đều True hết thì hoàn thành quá trình upgrade

##### Kiểm tra lại các node
```
$ oc get node
NAME                                   STATUS    ROLES    AGE        VERSION
okd4-compute-1.cloud.okd.local         Ready     worker   50m5s      v1.20.0+01994f4-1091
okd4-compute-2.cloud.okd.local         Ready     worker   45m2s      v1.20.0+01994f4-1091
okd4-control-plane-1.cloud.okd.local   Ready     master   59m23s     v1.20.0+01994f4-1091
okd4-control-plane-2.cloud.okd.local   Ready     master   55m2s      v1.20.0+01994f4-1091
okd4-control-plane-3.cloud.okd.local   Ready     master   54m14s     v1.20.0+01994f4-1091
```
##### Truy cập vào OKD
Bây giờ hãy truy cập vào OKD và tận hưởng thành quả của mình nào: <br>
-Get kubeadmin-password
> $ cat /root/install_dir/auth/kubeadmin-password <br>
> *xBEzi-E9mGS-gXVAC-m5UVL*
>
-Mở trình duyệt vào:  https://console-openshift-console.apps.cloud.okd.local/ login với user kubeadmin và password ở trên. <br>
Lưu ý: Trong trường hợp máy mở trình duyệt không đặt DNS là 192.168.99.51 thì nó sẽ không phân giải được tên miền trên. Có thể thêm vào file hosts:
> 192.168.99.52 console-openshift-console.apps.cloud.okd.local oauth-openshift.apps.cloud.okd.local

![](https://images.viblo.asia/40b0d92d-8f86-4e4c-b252-532b5c3f22e7.png)

Yeah, đã hoàn thành việc nâng cấp. Cụng ly chúc mừng nào.

> Hãy đón đọc bài tiếp theo "PRIVATE CLOUD OPENSHIFT – P3: Cách sử dụng"
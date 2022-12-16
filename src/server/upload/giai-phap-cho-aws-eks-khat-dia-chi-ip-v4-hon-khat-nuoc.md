# I. Thực trạng
Mô hình của Amazon Elastic Container Service for Kubernetes (EKS) khi tạo mặc định:

![situation (1).png](https://images.viblo.asia/250c2795-720f-4eae-a2a3-d0b35010ace2.png)

- Bình thường CNI của Kubernetes sẽ cấp phát cho mỗi pod một địa chỉ trong dải IP nội cluster, không ảnh hưởng tới dải mạng host.
- Tuy nhiên, AWS EKS mặc định sử dụng Amazon VPC CNI, nó sẽ gán cho mỗi pod một địa chỉ IP từ primary subnet (Subnet mà primary ENI được gắn vào), thường là dải mạng của host/node.
Đây chính là vấn đề nếu dải CIDR của host subnet được quy hoạch không đủ IPv4 để gán cho cả pod và tất cả các tài nguyên khác.

- Không những thế, VPC CNI plugin còn giữ sẵn (nhận luôn) một lượng địa chỉ IP ở mỗi node để có thể gán nhanh cho các pod mới.
Mỗi loại instance type có giới hạn riêng về số network interface. Danh sách chi tiết tại [đây](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html#AvailableIpPerENI).
Điều này dẫn tới số max-pods cụ thể cho mỗi loại instance. Chi tiết max-pods tham khảo tại [đây](https://github.com/awslabs/amazon-eks-ami/blob/master/files/eni-max-pods.txt).

- Ngoài ra, về mặt security mặc định không dùng riêng được security group cho primary network interface (cổng mạng của node) và secondary network interfaces (cổng mạng đại diện cho pod bên trong), vì VPC CNI plugin sẽ tự động dùng chung security group cho cả 2 loại network interface.

# II. Giải quyết cơn khát IP v4 của EKS 
Bằng cách mở rộng với dải CIDR thứ 2 của VPC kết hợp tính năng CNI custom networking
## 1. Dải mạng thứ hai - Secondary CIDR block
Amazon Elastic Container Service for Kubernetes (EKS) đã cho phép cluster tạo trong một VPC với [IPv4 CIDR block thứ 2](https://aws.amazon.com/vi/about-aws/whats-new/2018/10/amazon-eks-now-supports-additional-vpc-cidr-blocks/), có thể dùng dải 100.64.0.0/10 và 198.19.0.0/16 riêng cho pod. Dải mạng này nằm ngoài các dải mạng nội bộ thường dùng và không định tuyến trên internet (non-routable).
Điều này làm tăng số lượng IP có sẵn cho cluster mà không bị ảnh hưởng (overlap) tới [dải IP nội bộ](https://docs.aws.amazon.com/vpc/latest/userguide/configure-your-vpc.html#:~:text=VPC%20CIDR%20blocks-,IPv4%20VPC%20CIDR%20blocks).
## 2. Kết hợp secondary-CIDR-block và tính năng CNI-Custom-networking

Tính năng CNI-custom-networking là giải pháp cho tất cả vấn đề được nêu ở phần thực trạng. Hơn nữa, nó cũng hỗ trợ cho cả trường hợp nodes ở public-subnets muốn đặt pod ở private-subnets.
Cụ thể, CNI-custom-networking sẽ gán IP cho node và pod hoặc chỉ pod sang secondary-CIDR-block của VPC. Nó cho phép tuỳ biến ENIConfig được phép sử dụng dải mạng 

![EKS-solution.drawio.png](https://images.viblo.asia/3fa666d7-64b4-4aa7-85c4-e643513f0fc2.png)

## 3. Hướng dẫn step-by-step chuyển đổi từ hệ thống có sẵn
**Điều kiện tiên quyết:**
- Tài khoản sửa dụng đã đủ quyền thao tác với VPC và EKS. 
- Đã cấu hình sẵn xác minh cho AWS CLI và context của EKS.
- Ta cần đảm bảo Amazon VPC CNI đang ở phiên bản 1.6.3-eksbuild.2 hoặc lớn hơn, bằng cách chạy lệnh sau kiểm tra:
```
kubectl describe daemonset aws-node -n kube-system | grep amazon-k8s-cni: | cut -d "/" -f 2
```
Nếu phiên bản nhỏ hơn thì cần làm theo hưỡng dẫn [update CNI](https://docs.aws.amazon.com/eks/latest/userguide/managing-vpc-cni.html) trước.
### 3.2. Cấu hình thêm secondary-CIDR-block
Trước khi cấu hình EKS, chúng ta cần bật secondary-CIDR-blocks trên VPC và đảm bảo chúng được cấu hình đúng nhãn (tags) và bảng định tuyến (route table).
> Có một số giới hạn về secondary-CIDR-blocks để mở rộng VPC, xem chi tiết [tại đây](https://docs.aws.amazon.com/vpc/latest/userguide/how-it-works.html#add-cidr-block-restrictions).
#### 3.2.1. Dùng CLI
**Thêm secondary-CIDR-blocks**
Hai câu lệnh dưới đây sẽ thêm dải CIDR 100.64.0.0/16 vào VPC của cụm EKS. Hãy thay đổi **my-eks-cluster** thành tên của cụm EKS đang có sẵn.
```
vpc_id=$(aws eks describe-cluster --name my-eks-cluster --query "cluster.resourcesVpcConfig.vpcId" --output text)
aws ec2 associate-vpc-cidr-block --vpc-id $vpc_id --cidr-block 100.64.0.0/16
```
**Tạo subnet**
Với môi trường có trên 3 instances nằm trên 3 subnets (3 AZs khác nhau) cần tạo subnet cho 3 AZs tương ứng. Hãy thay đổi **my-eks-cluster** thành tên của cụm EKS đang có sẵn.:
```
export POD_AZS=($(aws ec2 describe-instances --filters "Name=tag-key,Values=eks:cluster-name" "Name=tag-value,Values=my-eks-cluster*" --query 'Reservations[*].Instances[*].[Placement.AvailabilityZone]' --output text | sort | uniq))

echo ${POD_AZS[@]}
new_subnet_id_1=$(aws ec2 create-subnet --cidr-block 100.64.0.0/19 --vpc-id $vpc_id --availability-zone ${POD_AZS[0]} --query 'Subnet.SubnetId' --output text) | export new_subnet_id_1
new_subnet_id_2=$(aws ec2 create-subnet --cidr-block 100.64.32.0/19 --vpc-id $vpc_id --availability-zone ${POD_AZS[1]} --query 'Subnet.SubnetId' --output text) | export new_subnet_id_2
new_subnet_id_3=$(aws ec2 create-subnet --cidr-block 100.64.64.0/19 --vpc-id $vpc_id --availability-zone ${POD_AZS[2]} --query 'Subnet.SubnetId' --output text) | export new_subnet_id_3

```
#### 3.2.2. Dùng giao diện
**Thêm secondary-CIDR-blocks**
- Truy cập: [https://ap-southeast-1.console.aws.amazon.com/vpc/home?region=ap-southeast-1#vpcs:](https://ap-southeast-1.console.aws.amazon.com/vpc/home?region=ap-southeast-1#vpcs:)
- Click chuột phải vào VPC cần thêm secondary-CIDR-blocks
- Chọn **Edit CIDRs**
![image.png](https://images.viblo.asia/97cf9fb3-873d-4096-b9ec-0e1c7780ad58.png)
- Ở giao diện Edit CIDRs, chọn **Add new IPv4 CIDR** ![image.png](https://images.viblo.asia/08439d1d-4fbe-4037-a82f-1e0dc123424b.png)
- Nhập *100.64.0.0/16* rồi chọn **Save**
![image.png](https://images.viblo.asia/0231a648-c139-4316-a9e8-c8cba2360188.png)
**Tạo subnet**
- Truy cập: https://ap-southeast-1.console.aws.amazon.com/vpc/home?region=ap-southeast-1#CreateSubnet:
- Ở mục ***VPC ID***, kích chọn VPC có cụm EKS.
- Tại khu vực ***Subnet settings*** tạo thêm 3 subnet mới lần lượt như hình dưới, sử dụng nút ***Add new subnet*** ở dưới cùng bên phải để thêm liền 3 subnet:
![image.png](https://images.viblo.asia/685e3797-4399-40b5-b71b-8d7fcf79d159.png)
![image.png](https://images.viblo.asia/a1718f04-2845-4f98-8b1b-2934a1610193.png)
![image.png](https://images.viblo.asia/3302fcd9-86b5-43a6-95af-832f307ad52b.png)
### 3.3. Cấu hình Kubernetes
#### 3.3.1 Configure Custom networking
```
kubectl set env ds aws-node -n kube-system AWS_VPC_K8S_CNI_CUSTOM_NETWORK_CFG=true
kubectl describe daemonset aws-node -n kube-system | grep -A5 Environment
```
```
Giao diện kết quả tương tự:
                Environment:
                  DISABLE_TCP_EARLY_DEMUX:  false
                  ENABLE_IPv6:              false
                Mounts:
                  /host/opt/cni/bin from cni-bin-dir (rw)
              Containers:
              Environment:
                  ADDITIONAL_ENI_TAGS:                    {}
                  AWS_VPC_CNI_NODE_PORT_SUPPORT:          true
                  AWS_VPC_ENI_MTU:                        9001
                  AWS_VPC_K8S_CNI_CONFIGURE_RPFILTER:     false
                  AWS_VPC_K8S_CNI_CUSTOM_NETWORK_CFG:     true
```

**3.3.1.1 Security-group**
Tạo riêng security-group rồi lấy ID hoặc lấy security-group ID của node/cluster để chạy lệnh sau:
```
 export security_group_id="sg-0e83050f797699c99"
```
**3.3.1.2 Subnet-ID**
> **Lưu ý**:  Nếu dùng CLI của mục 3.2.1 thì bỏ qua bước này.
* Nếu dùng giao diện thì làm theo hướng dẫn:
- Truy cập giao diện: https://ap-southeast-1.console.aws.amazon.com/vpc/home?region=ap-southeast-1#subnets:
- Lấy subnet ID (secondary CIDR) vừa tạo để thay vào subnet ID và sử dụng đúng AZ của subnet ấy trong command:
```
 export new_subnet_id_1="subnet-95f9d9c99f0fff2ff"
 export az_1="ap-southeast-1a"
 export new_subnet_id_2="subnet-930864a80d468721d"
 export az_2="ap-southeast-1b"
  export new_subnet_id_3="subnet-999869a89d468799d"
 export az_2="ap-southeast-1c"
```
**3.3.1.3 Tạo và triển khai file yaml**
> **Lưu ý**: Nếu dùng CLI của mục 3.2.1 thì thay $az_1 thành $POD_AZS[0] và tương ứng lên $AZ_3 thành POD_AZS[2]
- Subnet1-AZ1
```
cat >$az_1.yaml <<EOF
apiVersion: crd.k8s.amazonaws.com/v1alpha1
kind: ENIConfig
metadata: 
  name: $az_1
spec: 
  securityGroups: 
    - $security_group_id
  subnet: $new_subnet_id_1
EOF
kubectl apply -f $az_1.yaml
```

- Subnet2-AZ2
```
cat >$az_2.yaml <<EOF
apiVersion: crd.k8s.amazonaws.com/v1alpha1
kind: ENIConfig
metadata: 
  name: $az_2
spec: 
  securityGroups: 
    - $security_group_id
  subnet: $new_subnet_id_2
EOF
kubectl apply -f $az_2.yaml
```
- Subnet3-AZ3
```
cat >$az_3.yaml <<EOF
apiVersion: crd.k8s.amazonaws.com/v1alpha1
kind: ENIConfig
metadata: 
  name: $az_3
spec: 
  securityGroups: 
    - $security_group_id
  subnet: $new_subnet_id_3
EOF
kubectl apply -f $az_3.yaml
```
**3.3.1.4 Kiểm tra**
```
kubectl get ENIConfigs
```
Ra được kết quả tương tự:
```

            NAME         AGE
ap-southeast-1a   5m
ap-southeast-1b   5m
ap-southeast-1c   5m
```

#### 3.3.4. Cấu hình tự động với nhãn của AZ - Availability-Zone-Labels:
Ta có thể cho phép Kubernetes tự động áp dụng ENIConfig tương ứng cho các worker-node theo Availability-Zone (AZ).
Kết quả cuối cùng: Tên của ENIConfig sẽ tương ứng với tên các AZ cho mỗi subnet. (ap-southeast-1a, ap-southeast-1b, ap-southeast-1c). 
Kubernetes cũng tự động thêm các nhãn (label): *topology.kubernetes.io/zone* vào các worker-nodes tương ứng với các AZ. Có thể kiểm tra bằng câu lệnh:
```
kubectl describe nodes | grep 'topology.kubernetes.io/zone'
```
Kết quả ra được tương tự như: 
```
topology.kubernetes.io/zone=ap-southeast-1a
topology.kubernetes.io/zone=ap-southeast-1b
topology.kubernetes.io/zone=ap-southeast-1c
```
Do đó chúng ta tận dụng label này để áp tự động cho các ENIConfig tương ứng AZ của node bằng câu lệnh:
```
 kubectl set env daemonset aws-node -n kube-system ENI_CONFIG_LABEL_DEF=topology.kubernetes.io/zone
```

**Lưu ý:**  Phần này label *failure-domain.beta.kubernetes.io/zone* có thể được sử dụng nhưng đang có kế hoạch bị xoá bỏ,  ta thay thế luôn bằng label *topology.kubernetes.io/zone* .

### 3.4 Áp dụng cấu hình lên các worker-nodes
Chúng ta cần thay thế toàn bộ worker-nodes đang chạy thành node mới để nó tự khởi chạy với cấu hình network vừa tạo. Nếu là môi trường **Dev/test**, không lo downtime thì có thể thoải mái xoá hết các node rồi mở node mới. Còn nếu là môi trường production thì hãy tham khảo một vài gợi ý của mình dưới đây:
**LƯU Ý DOWN TIME**
Với các cụm EKS đang chạy prodution, vì cần phải terminate node nên hãy hết sức cẩn trọng lúc này:
- Triển khai vào giờ thấp điểm.
- Đảm bảo rằng mỗi deployment có số lượng pod tối thiểu dàn đều trên các node.
- Rolling-update từng node: Mở thêm một thì mới được xoá đi một. Tốt nhất là mở gấp đôi số node đang có trước, sau đó scale-in về số lượng hiện tại để tiến trình AutoScaling tự xử lý. (Mặc định nó sẽ xoá các node cũ nhất trước và trước lúc đấy nó tự chuyển các pod đang chạy sang node khác).
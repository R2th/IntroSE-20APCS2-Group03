**Bước 2 - Thiết lập một cụm Kubernetes trên DigitalOcean bằng cách sử dụng kubeadm và Terraform**

Có nhiều cách khác nhau để thiết lập Kubernetes trên DigitalOcean.

Chúng tôi sẽ tự động hóa việc tạo cụm bằng cách sử dụng kubeadm và Terraform, một công cụ đơn giản tạo và thay đổi cơ sở hạ tầng.

Bạn sẽ chạy lệnh kubeadm bên trong các máy ảo này để tạo một cụm Kubernetes 3-node có chứa một node chính và hai workers.

Trên máy chủ Ubuntu của bạn, tạo một cặp khóa SSH, cho phép đăng nhập không cần mật khẩu  với máy ảo của bạn:

`ssh-keygen -t rsa`

Bạn sẽ thấy kết quả sau:

```
Output
Generating public/private rsa key pair.
Enter file in which to save the key (~/.ssh/id_rsa): 
Press ENTER to save the key pair in the ~/.ssh directory in your home directory, or enter another destination.
```

Tiếp theo, bạn sẽ thấy dấu nhắc sau:

```
Output
Enter passphrase (empty for no passphrase): 
In this case, press ENTER without a password to enable password-less logins to your nodes.
```

Bạn sẽ thấy xác nhận rằng cặp khóa của bạn đã được tạo:

```
Output
Your identification has been saved in ~/.ssh/id_rsa.
Your public key has been saved in ~/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:lCVaexVBIwHo++NlIxccMW5b6QAJa+ZEr9ogAElUFyY root@3b9a273f18b5
The key's randomart image is:
+---[RSA 2048]----+
|++.E ++o=o*o*o   |
|o   +..=.B = o   |
|.    .* = * o    |
| .   =.o + *     |
|  . . o.S + .    |
|   . +.    .     |
|    . ... =      |
|        o= .     |
|       ...       |
+----[SHA256]-----+
```

Lấy khóa công khai của bạn bằng cách chạy lệnh sau:

`cat ~/.ssh/id_rsa.pub`

Tiếp theo, cài đặt Terraform:

```
sudo apt-get update
sudo apt-get install unzip
wget https://releases.hashicorp.com/terraform/0.11.7/terraform_0.11.7_linux_amd64.zip
unzip terraform_0.11.7_linux_amd64.zip
sudo mv terraform /usr/bin/.
terraform version
```

Bạn sẽ thấy đầu ra xác nhận cài đặt Terraform của bạn:

```
Output
Terraform v0.11.7
```

Tiếp theo, chạy các lệnh sau để cài đặt kubectl, một công cụ CLI mà sẽ giao tiếp với cụm Kubernetes của bạn, và để tạo ra một thư mục ~ / .kube trong thư mục chính của người dùng của bạn:

```
sudo apt-get install apt-transport-https
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
sudo touch /etc/apt/sources.list.d/kubernetes.list 
echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install kubectl
mkdir -p ~/.kube
```

Theo mặc định, CLI kubectl tìm kiếm tệp cấu hình trong ~ /.kube thư mục để truy cập vào cụm.

Tiếp theo, clone dự án mẫu cho hướng dẫn này , chứa các kịch bản lệnh Terraform để thiết lập cơ sở hạ tầng:

`git clone https://github.com/do-community/k8s-cicd-webinars.git`

Đi tới thư mục kịch bản Terrafrom:

`cd k8s-cicd-webinars/webinar1/2-kubernetes/1-Terraform/` 

Lấy dấu vân tay của khóa công khai SSH của bạn:

`ssh-keygen -E md5 -lf ~/.ssh/id_rsa.pub | awk '{print $2}'`

Bạn sẽ thấy đầu ra như sau, với phần được tô sáng đại diện cho khóa của bạn:

```
Output
MD5:dd:d1:b7:0f:6d:30:c0:be:ed:ae:c7:b9:b8:4a:df:5e
```

Hãy nhớ rằng chìa khóa của bạn sẽ khác với những gì được hiển thị ở đây.

Lưu dấu vân tay vào một biến môi trường để Terraform có thể sử dụng nó:

`export FINGERPRINT=dd:d1:b7:0f:6d:30:c0:be:ed:ae:c7:b9:b8:4a:df:5e`

Tiếp theo, xuất mã thông báo truy cập cá nhân DO của bạn:

`export TOKEN=your-do-access-token`

Bây giờ hãy nhìn vào ~/k8s-cicd-webinars/webinar1/2-kubernetes/1-Terraform/ thư mục dự án:

```
ls
Output
cluster.tf  destroy.sh  files outputs.tf  provider.tf  script.sh
```

Thư mục này chứa các kịch bản lệnh cần thiết và các tệp cấu hình để triển khai cụm Kubernetes của bạn với Terraform.

Thực thi kịch bản lệnh script.sh để kích hoạt thiết lập cụm Kubernetes:

`./script.sh`

Khi thực thi kịch bản hoàn tất, kubectl sẽ được cấu hình để sử dụng cụm Kubernetes mà bạn đã tạo.

Liệt kê các nodes:

```
kubectl get nodes
Output
NAME                STATUS    ROLES     AGE       VERSION
k8s-master-node     Ready     master    2m        v1.10.0
k8s-worker-node-1   Ready     <none>    1m        v1.10.0
k8s-worker-node-2   Ready     <none>    57s       v1.10.0
```

Bây giờ bạn có một node chính và hai node workers trong trạng thái sẵn sàng.

Với một cụm Kubernetes được thiết lập, bây giờ bạn có thể khám phá một tùy chọn khác để tạo container images: Kaniko từ Google.

**Bước 3 - Xây dựng container images với Kaniko**

Trước đó trong hướng dẫn này, bạn xây dựng images container với Dockerfiles và Buildah. Nhưng nếu bạn có thể xây dựng images container trực tiếp trên Kubernetes? Có nhiều cách để chạy Docker images xây dựng lệnh bên trong Kubernetes, nhưng điều này không có nguồn gốc Kubernetes tooling. Bạn sẽ không phụ thuộc vào trình nền của Docker để xây dựng images, và nó sẽ cần chạy trên một trong các Pod trong cụm.

Trong bước này, bạn sẽ xây dựng một images container với một Dockerfile sử dụng Kaniko, sau đó bạn sẽ đẩy images này vào Docker Hub.

Trong bước trước, bạn đã đăng nhập vào Docker Hub và tạo một tập tin ~ /. Docker / config.json với thông tin đăng nhập của bạn. sử dụng tập tin cấu hình này để tạo ra một đối tượng Kubernetes configMap để lưu trữ các thông tin bên trong cụm Kubernetes. các đối tượng configMap được sử dụng để các thông số lưu trữ cấu hình, tách khỏi ứng dụng của bạn.

Để tạo một ConfigMap có tên là docker-config bằng cách sử dụng file ~ /. Docker / config.json, hãy chạy lệnh sau:

`sudo kubectl create configmap docker-config --from-file=$HOME/.docker/config.json`

Tiếp theo, bạn có thể tạo một tập tin định nghĩa Pod gọi pod-kaniko.yml trong ~/k8s-cicd-webinars/webinar1/2-kubernetes/1-Terraform/ directory (mặc dù nó có thể ở bất cứ đâu).

Trước tiên, hãy đảm bảo bạn đang ở trong ~/k8s-cicd-webinars/webinar1/2-kubernetes/1-Terraform/ directory:

`cd ~/k8s-cicd-webinars/webinar1/2-kubernetes/1-Terraform/` 

Tạo tệp pod-kaniko.yml:

`nano pod-kaniko.yml`

Đảm bảo thay thế tên người dùng-dockerhub của bạn trong trường arg của Pod bằng tên người dùng Docker Hub của riêng bạn:

```
~/k8s-cicd-webinars/webinar1/2-kubernetes/1-Terraform/pod-kaniko.yaml
apiVersion: v1
kind: Pod
metadata:
  name: kaniko
spec:
  containers:
  - name: kaniko
    image: gcr.io/kaniko-project/executor:latest
    args: ["--dockerfile=./Dockerfile",
            "--context=/tmp/rsvpapp/",
            "--destination=docker.io/your-dockerhub-username/rsvpapp:kaniko",
            "--force" ]
    volumeMounts:
      - name: docker-config
        mountPath: /root/.docker/
      - name: demo
        mountPath: /tmp/rsvpapp
  restartPolicy: Never
  initContainers:
    - image: python
      name: demo
      command: ["/bin/sh"]
      args: ["-c", "git clone https://github.com/do-community/rsvpapp.git /tmp/rsvpapp"] 
      volumeMounts:
      - name: demo
        mountPath: /tmp/rsvpapp
  restartPolicy: Never
  volumes:
    - name: docker-config
      configMap:
        name: docker-config
    - name: demo
      emptyDir: {}
```

tập tin cấu hình này mô tả những gì sẽ xảy ra khi Pod của bạn được triển khai. Thứ nhất, container Init sẽ clone kho với Dockerfile, https://github.com/do-community/rsvpapp.git, Git thành một khối lượng chia sẻ gọi là demo. Init containers của bạn, kaniko, sau đó sẽ tạo images bằng cách sử dụng Dockerfile và đẩy images được tạo vào Docker Hub, bằng cách sử dụng thông tin đăng nhập bạn đã chuyển đến dockstar-config configer volume.

Để triển khai pod kaniko, hãy chạy lệnh sau:

`kubectl apply -f pod-kaniko.yml `

Bạn sẽ thấy xác nhận sau:

```
Output
pod/kaniko created
```

Nhận danh sách các nhóm:

`kubectl get pods`

Bạn sẽ thấy danh sách sau:

```
Output
NAME      READY     STATUS     RESTARTS   AGE
kaniko    0/1       Init:0/1   0          47s
```

Đợi vài giây và sau đó kubectl lấy lại nhóm để cập nhật trạng thái:

`kubectl get pods`

Bạn sẽ thấy như sau:

```
Output
NAME      READY     STATUS    RESTARTS   AGE
kaniko    1/1       Running   0          1m
```

Cuối cùng, chạy kubectl lấy nhóm một lần nữa để cập nhật trạng thái cuối cùng:

```
kubectl get pods
Output
NAME      READY     STATUS      RESTARTS   AGE
kaniko    0/1       Completed   0          2m
```

Sau đó, quá trình xây dựng Kaniko chạy và cuối cùng kết thúc.

Kiểm tra nhật ký của nhóm:

`kubectl logs kaniko`

Bạn sẽ thấy kết quả sau:

```
Output
time="2018-08-02T05:01:24Z" level=info msg="appending to multi args docker.io/your-dockerhub-username/rsvpapp:kaniko"
time="2018-08-02T05:01:24Z" level=info msg="Downloading base image nkhare/python:alpine"
.
.
.
ime="2018-08-02T05:01:46Z" level=info msg="Taking snapshot of full filesystem..."
time="2018-08-02T05:01:48Z" level=info msg="cmd: CMD"
time="2018-08-02T05:01:48Z" level=info msg="Replacing CMD in config with [/bin/sh -c python rsvp.py]"
time="2018-08-02T05:01:48Z" level=info msg="Taking snapshot of full filesystem..."
time="2018-08-02T05:01:49Z" level=info msg="No files were changed, appending empty layer to config."
2018/08/02 05:01:51 mounted blob: sha256:bc4d09b6c77b25d6d3891095ef3b0f87fbe90621bff2a333f9b7f242299e0cfd
2018/08/02 05:01:51 mounted blob: sha256:809f49334738c14d17682456fd3629207124c4fad3c28f04618cc154d22e845b
2018/08/02 05:01:51 mounted blob: sha256:c0cb142e43453ebb1f82b905aa472e6e66017efd43872135bc5372e4fac04031
2018/08/02 05:01:51 mounted blob: sha256:606abda6711f8f4b91bbb139f8f0da67866c33378a6dcac958b2ddc54f0befd2
2018/08/02 05:01:52 pushed blob sha256:16d1686835faa5f81d67c0e87eb76eab316e1e9cd85167b292b9fa9434ad56bf
2018/08/02 05:01:53 pushed blob sha256:358d117a9400cee075514a286575d7d6ed86d118621e8b446cbb39cc5a07303b
2018/08/02 05:01:55 pushed blob sha256:5d171e492a9b691a49820bebfc25b29e53f5972ff7f14637975de9b385145e04
2018/08/02 05:01:56 index.docker.io/your-dockerhub-username/rsvpapp:kaniko: digest: sha256:831b214cdb7f8231e55afbba40914402b6c915ef4a0a2b6cbfe9efb223522988 size: 1243
```
Từ logs, bạn có thể thấy rằng container kaniko đã tạo images từ dockerfile và đẩy nó vào tài khoản Docker Hub của bạn.

Bây giờ bạn có thể kéo images Docker. Hãy chắc chắn một lần nữa để thay thế  your-dockerhub-username với tên người dùng Docker Hub của bạn:

`docker pull your-dockerhub-username/rsvpapp:kaniko`

Bạn sẽ thấy một xác nhận:

```
Output
kaniko: Pulling from your-dockerhub-username/rsvpapp
c0cb142e4345: Pull complete 
bc4d09b6c77b: Pull complete 
606abda6711f: Pull complete 
809f49334738: Pull complete 
358d117a9400: Pull complete 
5d171e492a9b: Pull complete 
Digest: sha256:831b214cdb7f8231e55afbba40914402b6c915ef4a0a2b6cbfe9efb223522988
Status: Downloaded newer image for your-dockerhub-username/rsvpapp:kaniko
```

Bây giờ bạn đã xây dựng thành công một cụm Kubernetes và tạo ra các images mới từ bên trong cụm. Hãy tiếp tục thảo luận về Triển khai và Dịch vụ  ở phần tiếp theo.

Nguồn: https://www.digitalocean.com/community/tutorials/webinar-series-building-blocks-for-doing-ci-cd-with-kubernetes
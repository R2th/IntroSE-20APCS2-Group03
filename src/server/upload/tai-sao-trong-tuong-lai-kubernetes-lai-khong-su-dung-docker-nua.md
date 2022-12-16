Trong phiên bản 1.20, một thông báo liên quan tới việc không sử dụng Docker được Kubernetes liệt kê trong major changes, vậy tại sao k8s lại đưa ra thay đổi này, chúng ta cùng tìm hiểu trong bài viết hôm nay nhé.

# Tại sao K8S lại loại bỏ Docker ?

## Docker Engine
K8S hỗ trợ nhiều các container runtime khác trong, trong đó có Docker. Docker chỉ là 1 trong số các container runtimes, đơn giản bởi sự phổ biến của Docker và việc chúng được sử dụng trong nhiều project, khiến cho các orchestration tool lựa chọn nó.

Đầu tiên cùng xem qua cách triển khai Docker Engine trong các k8s worker node. Docker triển khai trên k8s worker node sẽ bảo gồm 3 component chính là:
- Docker CLI: là giao diện command line, giúp bạn execute các command tới Docker Server
- Docker API: phục cho việc giao tiếp với Docker Server
- Docker Server: lại gồm thành phần là
  - Container Runtime: chịu trách nhiệm bật tắt các container, quản lý toàn bộ lifecycles của container
  - Volumes: đảm nhiệm phần dữ liệu cho container, quản lý các persistent data trong Docker
  - Network
  - Build images: đảm nhiệm công việc build image trong Docker

Thực tế, k8s chỉ cần sử dụng tới 1 thành phần duy nhất là Container Runtime trong Docker bởi những thành phần còn lại chính đã được xây dụng trong k8s: k8s CLI, k8s Volumes, k8s Network, và bạn không cần thiết phải build images trong k8s cluster.
![](https://images.viblo.asia/20c99022-f9a8-41bd-9894-3376ebc1c432.png)

Để k8s có thể tương tác với Container Runtime thì k8s phải tương tác với Docker thông qua Dockershim, là 1 phần của k8s xây dựng để tương tác với Docker. Vì thế các developer của k8s vẫn hằng ngày phải maintain, update nó. Và đây, có vẻ lượng code của Dockershim đang ngày càng khó maintain và tốn nhiêu effort dẫn tới việc k8s sẽ bỏ nó luôn:
> Maintaining dockershim has become a heavy burden on the Kubernetes maintainers. The CRI standard was created to reduce this burden and allow smooth interoperability of different container runtimes. Docker itself doesn't currently implement CRI, thus the problem.
Dockershim was always intended to be a temporary solution (hence the name: shim). You can read more about the community discussion and planning in the Dockershim Removal Kubernetes Enhancement Proposal.

trích [Dockershim Deprecation FAQ](https://kubernetes.io/blog/2020/12/02/dockershim-faq/)
![](https://images.viblo.asia/7b50f3d0-c035-4959-80b6-a9f6dea4ba62.png)

Việc không sử dụng dockershim đem lại những khá nhiều hiệu quả khi các worker sẽ không cần tới những thành phần mà k8s không sử dụng tới nữa. k8s sẽ tương tác trực tiếp với Container Runtime khiến cho k8s tiết kiệm resources RAM, CPU, Storage hơn, giảm các nguy cơ về security bởi worker sẽ có ít thành phần hơn.

## Container Runtime

Container Runtime mà Docker sử dụng là `containerd`, nó là 1 phần code của Docker Daemon, tuy nhiên Docker đã tách nó ra thành 1 thành phần riêng biệt, có thể sử dụng độc lập với k8s. `containerd` hiện tại là 1 phần của CNNF, nó được develop và maintain như 1 project độc lập. 

![](https://images.viblo.asia/c0ecec53-6dae-4883-9597-30a12e2acf5d.png)

`containerd` là loại container runtime phổ biến thứ 2, nó đang được sử dụng trong các dịch vụ K8S lớn như Amazon EKS, Google Kubernetes Engine.

# Người dùng K8S sẽ gặp những ảnh hưởng gì ?
## K8S user & administrator
Đối với các DevOps engineer hay developer đã triển khai các ứng dụng của mình trên K8S cluster thì hoàn toàn không bị ảnh hưởng gì từ việc thay đổi này. Workflow cũng không bị ảnh hưởng, miễn là Container Runtime của bạn vẫn hoạt động thì bạn không cần quan tâm tới thay đổi này.

Đối với các K8S administrator, những ai mà sẽ đảm nhiệm công việc setup k8s clusters từ đầu, cấu hình network cho các k8s cluster chẳng hạn, thì có 2 trường hợp:
- Nếu bạn quản lý k8s cluster trên Cloud như AWS, Google Cloud,.. thì với những thay đổi này bạn không cần cài đặt thêm, cấu hình lại master node, hay cài lại Container Runtime cho k8s worker. Cloud provider sẽ lo phần này cho bạn, bởi lẽ những dịch vụ như AWS, Google Cloud đã sử dụng `containerd` là Container Runtime sẵn rồi :D 
- Nếu bạn quản lý k8s cluster tự xây dựng, nơi mà bạn tự cài toàn bộ mọi thứ trên server bao gồm cả Container Runtime thì bạn sẽ cần thay đổi chuyển Docker thành 1 substitute Docker như `containerd`, `cri-o`,... Hoặc nếu bạn vẫn muốn sử dụng Docker làm container runtime thì bạn cần cài Dockershim manually, bạn cũng không cần quá lo lắng bởi Docker đã thông báo rằng họ sẽ tiếp tục maintain Dockershim và hỗ trợ Dockershim như 1 standalone opensource component, để bạn có thể cài đặt nó trong k8s cluster để dùng Docker làm container runtime. 
## Minikube & Docker Desktop
Đối với các developer sử dụng Minikube hay Docker Desktop để develop thì chúng ta không bị ảnh hưởng tới. Container Runtime đã được cài đặt dưới background của các ứng dụng trên, chúng ta không cần tự tay làm điều đó.

# Vậy khi sử dụng K8S chúng ta có nên tiếp tục tìm hiểu về Docker nữa không ? 

Một trong những tính năng của Docker chính là build images. Trước khi image có thể chạy thành container ở trong k8s cluster, bạn cần build ứng dụng thành image bằng Docker, bạn vẫn cần sử dụng Docker trong CI/CD pipeline hiện tại.
![](https://images.viblo.asia/0eff7948-51d5-4032-87ea-23c8e8fd821d.png)

Bạn vẫn thấy Docker vẫn đảm nhiệm những nhiệm vụ quan trọng trong CI/CD pipeline hiện tại. Mặt khác, tất cả các Docker Image đều tuân thủ theo 1 standard là OCI, 
> The Open Container Initiative is an open governance structure for the express purpose of creating open industry standards around container formats and runtimes.
![](https://images.viblo.asia/3fc99c2d-cdb3-43f5-a9b7-78827aa29f7f.png)

chính vì thế chúng đều có thể chạy trên bất kỳ Container Runtimes chứ không chỉ mình Docker. Vì vậy, nên chúng ta vẫn cần trau dồi hiểu biết về Docker.
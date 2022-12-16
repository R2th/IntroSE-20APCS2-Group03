Link bài viết gốc - [Tìm hiểu sâu hơn về Container - Container Runtime là gì?](https://devopsvn.tech/devops/tim-hieu-sau-hon-ve-container-container-runtime-la-gi)

## GIới thiệu
Chào mọi người, ở bài trước chúng ta đã tìm hiểu về hai thành phần chính để xây dựng container là [linux namespaces và cgroups](https://viblo.asia/p/kubernetes-story-linux-namespaces-and-cgroups-what-are-containers-made-from-gDVK2r7jKLj). Trong bài tiếp theo này thì chúng ta sẽ tìm hiểu thêm về một tầng cao hơn nữa là container runtime. Nếu bạn đang còn lấn cấn về vấn đề container và docker, thì bài này sẽ giúp bạn phần nào hiểu rõ hơn về chúng.

![image.png](https://images.viblo.asia/bce313de-5cd1-4508-a1cb-f7fd069f662f.png)

Nếu các bạn chưa rõ về container thì nên đọc bài [linux namespaces và cgroups](https://viblo.asia/p/kubernetes-story-linux-namespaces-and-cgroups-what-are-containers-made-from-gDVK2r7jKLj) trước khi đọc bài này nhé, để ta có dễ hiểu hơn khi đọc bài này. Vậy container runtime là gì? Tại sao lại có container rồi lại container runtime? Nó khác biệt nhau như thế nào?

## Container and Container runtime?
Container được tạo ra để giúp ta chạy một chương trình trong một môi trường hoàn toàn độc lập với các chương trình khác trên cùng một máy tính. Nhưng ta sẽ gặp một vài vấn đề sau nếu ta chỉ dùng linux namespace và cgroup để chạy container.

Vấn đề đầu tiên là để tạo được container thì ta cần chạy khá nhiều câu lệnh, nào là câu lệnh tạo linux namespace, câu lệnh tạo cgroup process, câu lệnh cấu hình limit cho cgroup process, sau đó nếu ta muốn xóa container thì ta phải chạy các câu lệnh để clear namespace và cgroup.

Và vấn đề thứ hai là khi ta chạy cả chục container bằng câu lệnh linux namespace và cgroup thì làm sao ta quản lý những container đó, ta làm sao biết được thằng container đó nó đang chạy gì và nó được dùng cho process nào?

Vấn đề thứ ba là có các container có sẵn những thứ ta cần và nó nằm trên container registry, làm sao ta có thể tải nó xuống và chạy thay vì ta phải tạo container từ đầu?

Với các vấn đề ở trên thì thay vì ta phải chạy nhiều câu lệnh như vậy, thì tại sao ta không xây dựng ra một công cụ nào đó để ta giảm tải việc này, ta chỉ cần chạy một câu lệnh để tạo container và xóa container. Và công cụ đó cũng có có thể giúp ta quản lý được nhiều container đang chạy và ta biết được container đó đang được dùng cho process nào. Và ta cũng có thể dùng công cụ đó để tải các container có sẵn ở trên internet. **Đó chính là là lý do tại sao thằng container runtime được sinh ra**.

Container runtime là một công cụ đóng vai trò quản lý tất cả quá trình running của một container, bao gồm tạo và xóa container, đóng gói và chia sẻ container. Container runtime được chia ra làm hai loại:
+ Low-level container runtime: với nhiệm vụ chính là tạo và xóa container.
+ High level container runtime: quản lý container, tải container image sau đó giải nén container image đó ra và truyền vào trong low level container runtime để nó tạo và chạy container.

**Một vài high level container runtime còn bao gồm cả chức năng đóng gói container thành container image và chuyển nó lên container registry**.

![image.png](https://images.viblo.asia/97cf33fa-acbf-438a-a93e-431c55c89c77.png)

*<div align="center">Image from [Ianlewis](https://www.ianlewis.org/en/container-runtimes-part-3-high-level-runtimes)</div>*

> Container image sẽ lưu tất cả những thứ ta cần để ta chạy một container, ta chỉ cần tải container image và dùng nó để run container, thay vì phải tạo container từ đầu và cài nhiều thứ.

> Container registry là chỗ dùng chứa container image.

### Low-level container runtime

![image.png](https://images.viblo.asia/72d7edea-4f4a-4a92-b754-f3bf701dd6ec.png)

Như ta đã nói ở trên thì nhiệm vụ chính của low-level container runtime là tạo và xóa container, những công việc mà low-level container runtime sẽ làm là:
+ Tạo cgroup.
+ Chạy CLI trong cgroup.
+ Chạy câu lệnh `Unshare` để tạo namespaces riêng.
+ Cấu hình root filesystem.
+ Clean up cgroup sau khi câu lệnh hoàn tất.

Thực tế thì low level container runtime sẽ còn làm rất nhiều thứ nữa, nhưng ở trên là những công việc chính. Mô phỏng quá trình container runtime tạo container.

```bash
ROOTFS=$(mktemp -d) && UUID=9999
```

Tạo cgroup.

```bash
sudo cgcreate -g cpu,memory:$UUID
```

Cấu hình limit memory cho cgroup.

```bash
sudo cgset -r memory.limit_in_bytes=100000000 $UUID
```

Cấu hình limit CPU cho cgroup.

```bash
sudo cgset -r cpu.shares=512 $UUID && sudo cgset -r cpu.cfs_period_us=1000000 $UUID && sudo cgset -r cpu.cfs_quota_us=2000000 $UUID
```

Tạo container.

```bash
sudo cgexec -g cpu,memory:$UUID unshare -uinpUrf --mount-proc sh -c "/bin/hostname $UUID && chroot $ROOTFS /bin/sh"
```

Xóa cgroup.

```bash
sudo cgdelete -r -g cpu,memory:$UUID
```

Ở trên là quá trình mô phỏng container runtime tạo container.

Low level container runtime phổ biến nhất có lẽ là `runc`, với runc thì để tạo container ta chỉ cần chạy một câu lệnh như sau.

```bash
$ runc run runc-container
/# echo "Hello from in a container"
Hello from in a container
```

Khá đơn giản cho ta 😁.

### High level container runtime

![image.png](https://images.viblo.asia/ddddd97c-c4d3-40af-942a-6104cb9adac8.png)

Trong khi low level container runtime tập trung cho việc tạo và xóa container, thì high level container runtime sẽ tập trung cho việc quản lý nhiều container, vận chuyển và quản lý container images, tải và giải nén container image để chuyển xuống cho low level container runtime.

Một thằng high level container runtime phổ biến chắc có lẽ là `containerd`, `containerd` cung cấp cho ta những tính năng sau:
+ Tải container image từ container registry.
+ Quản lý container image.
+ Chạy container từ container image đó.
+ Quản lý nhiều container.

Ví dụ ta sẽ chạy những câu lệnh sau để tạo một redis container mà nó có sẵn image nằm trên container registry bằng `containerd`.

Tải container image.

```bash
sudo ctr images pull docker.io/library/redis:latest
```

Chạy container.

```bash
sudo ctr container create docker.io/library/redis:latest redis
```

Nếu ta muốn xóa container, ta chạy câu lệnh sau.

```bash
sudo ctr container delete redis 
```

Ta có thể liệt lê toàn bộ images và container như sau.

```bash
sudo ctr images list
```

```bash
sudo ctr container list
```

Cũng khá giống khi ta chạy câu lệnh docker phải không 😁.

Tuy ta có thể tải và chạy container từ container image có sẵn, nhưng `containerd` và khá nhiều high level container runtime khác không có hỗ trợ ta trong việc build container, và high level container runtime không có tập trung vào việc hỗ trợ UI để người dùng có thể dễ dàng tương tác hơn. Do đó để dễ dàng hơn cho người dùng trong việc giao tiếp với container, các công cụ gọi là **Container Management** mới được sinh ra, và Docker là một trong những thằng đó.

## Docker
Docker là một trong những công cụ đầu tiên hỗ trợ toàn bộ các tính năng để tương tác container. Bao gồm:
+ Tính năng build image (Dockerfile/docker build).
+ Tính năng quản lý images (docker images).
+ Tính năng tạo, xóa và quản lý container (docker run, docker rm, docker ps).
+ Tính năng chia sẽ images (docker pull, docker push).
+ Cung cấp UI để người dùng có thể thao tác thay vì dùng CLI.

Và docker sẽ thông qua các API để tương tác với container runtime ở dưới để tạo và chạy container cho ta. High level container runtime mà docker sử dụng tên là `dockerd`, `docker-containerd`, `dockerd-runc`.

![image.png](https://images.viblo.asia/b62e3a77-d1bd-43b7-946f-5fc24eb67abb.png)

*<div align="center">Image from [Ianlewis](https://www.ianlewis.org/en/container-runtimes-part-3-high-level-runtimes)</div>*

Với dockerd sẽ cung cấp cho ta tính năng build image, docker-containerd thì giống với containerd, còn dockerd-runc thì giống với runc.

English version [Deep into Container Runtime](https://medium.com/@hmquan08011996/kubernetes-story-deep-into-container-runtime-db1a41ed2132). Please follow me on medium 😁.

## Kết luận
Vậy là ta đã tìm hiểu xong về container runtime. Với low-level container runtime sẽ có nhiệm vụ là tạo và xóa container, high level container runtime sẽ có nhiệm vụ quản lý container images và container. Và docker là một công cụ hoàn chỉnh để ta tương tác với container bên dưới thông qua container runtime, bao gồm cả việc build image. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Hiện tại thì công ty bên mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và sở hữu trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java, Go). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java, Go). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn đề cần giải quyết, và sẽ có rất nhiều bài toán thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `hmquan08011996@gmail.com`. Cảm ơn các bạn đã đọc.
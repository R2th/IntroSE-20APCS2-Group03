Link bài viết gốc - [Linux Namespaces và Cgroups: Container được xây dựng từ gì?](https://devopsvn.tech/devops/linux-namespaces-va-cgroups-container-duoc-xay-dung-tu-gi)

## Giới thiệu

Nếu làm DevOps thì chắc chúng ta đã quen thuộc với Kubernetes, Docker và Container. Nhưng ta có bao giờ thắc mắc thật ra docker nó là cái quái gì vậy? Container là cái gì? Docker là container hả? Thật ra **docker nó không phải là container** và mình sẽ giải thích container nó là gì trong bài này.

![image.png](https://images.viblo.asia/dc916ab7-cca4-409e-8fef-bb7738b5e943.png)

## Container
Container là một công nghệ mà cho phép chúng ta chạy một chương trình trong một môi trường độc lập hoàn toàn với các chương trình còn lại trên cùng một máy tính. Vậy container làm được việc đó bằng cách nào?

Và thật ra để làm được việc đó thì container nó được xây dựng từ một vài tính năng mới của Linux kernel, trong đó hai tính năng chính là **"namespaces"** and **"cgroups"**. Đây là hai tính năng của Linux giúp ta tách biệt một process hoàn toàn độc lập với các process còn lại.

## Linux Namespaces
Đây là một tính năng của Linux cho phép ta tạo ra một virtualize system, khá giống với chức năng của các công cụ virtual machine. Đây là tính năng chính giúp process của ta tách biệt hoàn toàn với các process còn lại.

Linux namespaces sẽ bao gồm các thành phần nhỏ hơn như:
+ PID namespace cho phép ta tạo các process tách biệt.
+ Networking namespace cho phép ta chạy chương trình trên bất kì port nào mà không bị xung độ với các process khác chạy trên server.
+ Mount namespace cho phép ta mount và unmount filesystem mà không ảnh hưởng gì tới host filesystem.

Để tạo linux namespace khá đơn giản, ta dùng một package tên là `unshare` để tạo một namespace riêng với process tách biệt với các process còn lại. Ví dụ ta chạy câu lệnh sau để tạo namespace và thực thi câu lệnh bash trên nó.

```
sudo unshare --fork --pid --mount-proc bash
```

Nó sẽ tạo ra một virtualize system và gán bash shell vào nó.

```
root@namespace:~#
```

Bạn thử chạy câu lệnh ps aux.

```
root@namespace:~# ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.0  23104  4852 pts/0    S    21:54   0:00 bash
root        12  0.0  0.0  37800  3228 pts/0    R+   21:57   0:00 ps aux
```

Ta sẽ thấy namespace được tạo ra là một môi trường hoàn toàn tách biệt với bên ngoài, nó chỉ có duy nhất hai process đang chạy là bash với câu lệnh ps aux ta vừa gõ.

Bạn bật một terminal khác ở trên server và gõ câu lệnh ps aux.

```
hmquan@server:~$ ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
...
root        43  0.0  0.0   7916   828 pts/0    S    21:54   0:00 unshare --fork --pid --mount-proc bash
...
```

Bạn sẽ thấy một process của `unshare` đang chạy, ta có thể so sánh nó với các container được liệt kê ra khi ta chạy câu lệnh `docker ps`.

Để thoát khỏi namespace thì bạn gõ `exit`.

```
root@namespace:~# exit
```

Lúc này khi bạn chạy lại câu lệnh `ps aux` ở trên server ta sẽ thấy process của `unshare` hồi nãy đã mất đi.

## Cgroups
Ta đã có thể tạo một process riêng biệt với namespace, nhưng nếu ta tạo nhiều namespace thì làm sao ta giới hạn được resource của từng namespace để nó không chiếm mất resource của namespace khác?

May thay là Linux cũng đã đoán được điều đó và tạo ra Cgroups, đây là tính năng để giới hạn resource của một process. Cgroups sẽ định ra giới hạn của CPU và Memory mà một process có thể dùng. Để tạo cgroup thì ta sẽ dùng `cgcreate`. Ta cần cài `cgroup-tools` trước khi sử dụng.

Ubuntu và Debian.

```
sudo apt-get install cgroup-tools
```

CentOS.

```
sudo yum install libcgroup
```

Sau đó, để tạo cgroup ta chạy câu lệnh sau.

```
sudo cgcreate -g memory:my-process
```
 
Nó sẽ tạo ra cho ta một folder ở dường dẫn `/sys/fs/cgroup/memory`, các bạn liệt kê nó ra.
 
```
$ ls /sys/fs/cgroup/memory/my-process
cgroup.clone_children               memory.memsw.failcnt
cgroup.event_control                memory.memsw.limit_in_bytes
cgroup.procs                        memory.memsw.max_usage_in_bytes
memory.failcnt                      memory.memsw.usage_in_bytes
memory.force_empty                  memory.move_charge_at_immigrate
memory.kmem.failcnt                 memory.oom_control
memory.kmem.limit_in_bytes          memory.pressure_level
memory.kmem.max_usage_in_bytes      memory.soft_limit_in_bytes
memory.kmem.tcp.failcnt             memory.stat
memory.kmem.tcp.limit_in_bytes      memory.swappiness
memory.kmem.tcp.max_usage_in_bytes  memory.usage_in_bytes
memory.kmem.tcp.usage_in_bytes      memory.use_hierarchy
memory.kmem.usage_in_bytes          notify_on_release
memory.limit_in_bytes               tasks
memory.max_usage_in_bytes
```

Ta sẽ thấy khá nhiều file, đây là những file định nghĩa limit của process, file mà ta quan tâm bây giờ là `memory.kmem.limit_in_bytes`, nó sẽ định nghĩa memory limit của một process, giá trị sử dụng theo bytes nhé. Ví dụ ta giới hạn memory là 50Mi.

```
sudo echo 50000000 >  /sys/fs/cgroup/memory/my-process/memory.limit_in_bytes
```

Ok, sau đó để sử dụng cgroup ta chạy câu lệnh sau.

```
hmquan@server:~$ sudo cgexec -g memory:my-process bash
root@cgroup:~#
```

Lúc này process được tạo bởi cgroup sẽ có memory limit là 50Mi.

## Cgroups with namespace
Và ta có thể sử dụng cgroups kết hợp với namespace để tạo một process độc lập và có giới hạn resource nó có thể sử dụng. Ví dụ ta chạy câu sau.

```
hmquan@server:~$ sudo cgexec -g cpu,memory:my-process unshare -uinpUrf --mount-proc sh -c "/bin/hostname my-process && chroot mktemp -d /bin/sh"
```

```
root@my-process:~# echo "Hello from in a container"
Hello from in a container
```

Vậy thật ra container là một sự kết hợp của hai tính năng cgroups và namespace, tuy thực tế thì có thể nó còn một số thứ khác nữa, nhưng cơ bản cgroups và namespace là hai cái chính.

## What is docker
Vậy docker là gì? Docker nó chỉ là một công cụ giúp ta tương tác với công nghệ container ở bên dưới, chứ nó không phải là container. Nói chính xác hơn docker là một tool giúp ta tương tác với container một cách dễ dàng thay vì ta phải làm nhiều thứ. Và docker sẽ tương tác với container bên dưới thông qua **container runtime**. Mình sẽ nói về nó ở bài sau.

English version [Linux Namespaces and Cgroups: What are containers made from?](https://medium.com/@hmquan08011996/kubernetes-story-linux-namespaces-and-cgroups-what-are-containers-made-from-d544ac9bd622). Please follow me on medium 😁.

## Kết luận
Vậy là ta đã tìm hiểu xong về container được xây lên bằng gì. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

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
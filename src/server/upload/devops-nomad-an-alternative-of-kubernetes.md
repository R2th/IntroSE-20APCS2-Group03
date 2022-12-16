Link bài viết gốc - [Nomad - Công cụ thay thế Kubernetes](https://devopsvn.tech/devops/nomad-cong-cu-thay-the-kubernetes)

## Giới thiệu
Nếu các bạn đọc bài này thì chắc chắn các bạn đã biết về kubernetes và có lẽ cũng đã sử dụng nó. Hiện tại thì nếu nói tới vấn đề về container orchestration thì chắc chắn thằng kubernetes đang được sử dụng nhiều nhất và có lẽ là phổ biến nhất, có thể nói nó là top 1 trong mảng container orchestration.

Và chắc các bạn cũng biết là ta sẽ có rất nhiều công cụ khác có thể dùng để thay thế kuberntes được, nhưng trong tất cả các công cụ mà có thể dùng để thay thế kubernetes thì thằng mà mình thấy nó thật sự là có thể thay thế được kubernetes trong vấn đề container orchestration là **Nomad**.

![image.png](https://images.viblo.asia/b2f2f67a-3f40-4f48-aa67-d4a65ed3ec13.png)

Vậy Nomad là gì?

## Nomad
Nomad được phát hành bởi Hashicorp, là một công cụ phổ biến trong việc quản lý và điều phối workload, một workload có thể là containerized hoặc non-containerized.

Containerized là các ứng dụng được đóng gói thành container, ví dụ như đóng gói ứng dụng nodejs thành container image bằng docker và dùng kubernetes để chạy container đó.

Non-containerized là các ứng dụng chạy thẳng trên server của ta mà không cần phải được đóng gói thành container để chạy, ví dụ như thay vì đóng gói ứng dụng nodejs thành container thì ta có thể ssh thẳng lên server, cài nodejs lên server và chạy ứng dụng bằng pm2.

**Nomad quản lý cả hai loại workload containerized và non-containerized. Kubernetes chỉ có thể quản lý workload dạng containerized.**

![image.png](https://images.viblo.asia/bb5f9659-9943-4c71-a7c1-a198195e915f.png)
*<div align="center">Image from [Cloudaffaire](https://cloudaffaire.com/how-to-install-hashicorp-nomad/)</div>*

Nếu bạn biết tới Hashicorp thì nó có một công cụ là Terrafrom, Terrafrom sử dụng infrastructure-as-code để mô tả và quản lý hạ tầng. Nomad cũng tương tự như vậy, nó cho phép ta dùng infrastructure-as-code để mô tả và quản lý application. Nomad hỗ trợ trên cả ba hệ điều hành là macOS, Windows, và Linux.

Hiện này nomad được sử dụng bởi rất nhiều công ty lớn, điển hình là PagerDuty, Target, Citadel, Trivago, SAP, Pandora, Roblox, eBay, Deluxe Entertainment.

## Nomad vs Kubernetes
Vậy thì khi so sánh với k8s, nó sẽ có những điểm mạnh và điểm yếu gì.

### Simplicity
Đầu tiên ta sẽ nói về độ đơn giản của hai thằng. 

Kubernetes được thiết kế 4 thành phần chính ở trong control plan là API Server, Etcd, Controller Manager, Scheduler. Với Etcd được dùng làm storage để lưu trữ state, API Server là component trung tâm để giao tiếp với các thành phần khác, hai thành phần thực hiện công việc container orchestration là Controller Manager và Scheduler, nếu các bạn muốn hiểu về kiến trúc bên trong kubernetes thì đọc bài này nha [Kubernetes internals architecture](https://viblo.asia/p/kubernetes-series-bai-11-kubernetes-internals-architecture-L4x5xPjb5BM). Kubernetes được thiết khá phức tạp và cần học nhiều mới có thể sử dụng được. Công việc cài đặt và triển khai một kubernetes cluster cũng không hề đơn giản.

So với kubernetes thì cấu trúc của Nomad đơn giản hơn khá nhiều, nó chỉ là một binary execute file, và không cần một external services nào cho việc storage cả. Không giống như kubernetes, Nomad chỉ tập trung vào việc manager và scheduler workload.

### OS Support
Vấn đề thứ hai là về các môi trường mà hai thằng hỗ trợ.

Kubernetes tập trung hỗ trợ cho Linux containers, các OS khác như mac và window thì chỉ phù hợp cho môi trường dev.

Nomad thì không đặc biệt tập trung vào hỗ trợ Linux, các OS khác Nomad đều support tốt. Nomad support cho cả virtualized, containerized, standalone applications, bao gồm cả Docker, Java, IIS on Windows, Qemu, ...

### Deployment
Vấn đề thứ ba là tính nhất quán khi ta cài đặt và triển khai.

Đối với kubernetes, ta không thể xài cùng một công cụ để cài đặt cho môi trường local dev và môi trường production được. Ví dụ, thông thường khi ta triển khai môi trường local dev ta sẽ thường dùng minikube, k3s, ... Còn khi cài môi trường production, ta sẽ xài kubeadm, kops, rancher, ...

Còn đối với Nomad, nó chỉ là một binary execute file, nên ta có thể xài cùng một công cụ để cài đặt cho cả môi trường local dev và môi trường production.

### Scalability
Vấn đề thứ 4, và là vấn đề mà mình thấy nó sẽ vượt trội so với kubernetes là vấn đề về việc scale.

Hiện tại khi mình viết bài này, thì trong document của kubernetes có nói là một kuberntes cluster chỉ hỗ trợ scale tới 5,000 node và 300,000 container. Các bạn xem ở đây [Kubernetes documentation](https://kubernetes.io/docs/setup/best-practices/cluster-large/)

Còn thằng Nomad, nó có thể scale tới 10,000 node và 2 triệu container. Các bạn xem ở đây [2 million container challenge](https://www.hashicorp.com/c2m)

**Đây là ưu điểm duy nhất mà mình thấy nó có thể so sánh với kubernetes, còn về các vấn đề ở trên như tính dễ dàng, các os hỗ trợ, tính nhất quán khi cài đặt chỉ là phụ mà thôi.**

Thằng Nomod có vẻ nó ngon như vậy, nhưng tại sao bây giờ mọi người vẫn sử dụng kubernetes nhiều hơn?

## Why nomad can't replace kubernetes
Tuy thằng nomad nó hỗ trợ việc scale tốt hơn và dễ học hơn, nhưng như mình nói ở trên thì thằng Nomad chỉ hỗ trợ về manager và scheduler workload. Còn các vấn đề như service discovery, secret manager, nó không có hỗ trợ. Mà để xây dựng full solution thì ta phải sử dụng thêm hai thằng khác của Hashicorp nữa là Consul (service mesh), Vault (secret manager).

Với Nomad thì để xây dựng được một môi trường full solution thì ta sẽ xài cả 4 thằng là Terrafrom + Nomad + Consul + Vault. Ta cần phải học thêm 2 thằng nữa là Consul + Vault, không đơn giản xíu nào 🤣, tuy nhiên nếu làm chủ được cả 4 thằng thì quá tuyệt vời.

![image.png](https://images.viblo.asia/1d36ab12-69d5-415f-8817-b8af3dfed6f0.png)

Trong khi thằng kubernetes thì nó hỗ trợ một môi trường full solution sẵn cho ta, manager và scheduler workload thì chắc chắn là có trong kubernetes, vấn đề service discovery thì thằng kubernetes hỗ trợ thông qua coredns, secret manager thì nó có Secret resource, chỉ cần học một thằng thì ta có thể control được hầu hết toàn bộ mọi công việc, so với việc ta phải học cả 3 thằng Nomad + Consul + Vault.

## Kết luận
Tuy thằng Nomad rất tuyệt nhưng ở thời điểm hiện tại nó khó có thể cạnh tranh được với kubernetes, nhưng ai biết tương lai sẽ như thế nào, nên mình nghĩ tốt nhất là học cả hai `:)))`, cộng với học Consul + Vault. Riêng mình thấy Terrafrom + Nomad + Consul + Vault là một full stack solution rất mạnh mẽ. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Mục tìm kiếm đồng đội
Hiện tại thì bên công ty mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và là trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn đề cần giải quyết, và sẽ có rất nhiều bài toán thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `hmquan08011996@gmail.com`. Cảm ơn các bạn đã đọc.
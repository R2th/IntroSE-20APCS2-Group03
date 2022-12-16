Link bài viết gốc - [Kubernetes làm việc với Container như thế nào?](https://devopsvn.tech/devops/kubernetes-lam-viec-voi-container-nhu-the-nao)

## Giới thiệu
Chào các bạn, ở bài trước chúng ta đã tìm hiểu khá kĩ về container runtime. Trong bài tiếp theo này thì chúng ta sẽ tìm hiểu về một chủ đề khá thú vị là cách kubernetes sử dụng container runtime như thế nào, và các loại container runtime mà kubernetes sử dụng.

![image.png](https://images.viblo.asia/65321b58-39f0-426a-a793-a9b7447ba119.png)

Nếu các bạn chưa rõ về container và container runtime thì đọc trước hai bài này nhé.
1. [Kubernetes Story - Linux namespaces and cgroups: What are containers made from?](https://viblo.asia/p/kubernetes-story-linux-namespaces-and-cgroups-what-are-containers-made-from-gDVK2r7jKLj).
2. [Kubernetes Story - Deep into Container Runtime](https://viblo.asia/p/kubernetes-story-deep-into-container-runtime-bWrZnAqmKxw).

## Kubernetes Architecture
Trước khi đi vào chi tiết về cách kubernetes sử dụng container runtime, mình sẽ nói sơ về tổng quan kiến trúc của kubernetes trước.

Một kubernetes cluster sẽ bao gồm một master node và một hoặc nhiều worker node.

![image.png](https://images.viblo.asia/f69edc50-dbe8-44be-9b7b-263903ecca22.png)

Với master node có nhiệm vụ chính là quản lý cluster, phân phối và quản lý container tới từng worker node. Worker node có nhiệm vụ chính là nơi chứa các container để chạy ứng dụng. Trong từng master node và worker node nó sẽ có các thành phần sau đây.

![image.png](https://images.viblo.asia/f4635d2b-da84-4575-bacc-6dbf18016c4a.png)

Kubernetes master sẽ bao gồm 4 component:
+ etcd: dùng để lưu trữ trạng thái của cluster.
+ API server: thành phần chính mà client hoặc các thành khác sử dụng để giao tiếp với kubernetes cluster.
+ Controller Manager: quản lý và tạo các resource tương ứng trong cluster.
+ Scheduler: phân phối chọn worker node để chạy container.

Kubernetes worker node sẽ bao gồm 3 thành phần:
+ kubelet: quản lý container trên từng worker node.
+ kube-proxy
+ container runtime

Thì ở bài này chúng ta sẽ tìm hiểu về worker node, vì đây sẽ là nơi kubernetes giao tiếp với container. Nếu các bạn muốn hiểu rõ hơn về kiến trúc bên trong kubernetes thì các bạn xem bài này nhé [Kubernetes Series - Bài 11 - Kubernetes internals architecture](https://viblo.asia/p/kubernetes-series-bai-11-kubernetes-internals-architecture-L4x5xPjb5BM).

## How does Kubernetes manage containers in the cluster?
Trong một cluster ta sẽ có nhiều worker node, và worker node sẽ là nơi mà các container của ta chạy.

Và để làm việc với container trên từng worker node, kubernetes sẽ dùng một công cụ tên là kubelet.

![image.png](https://images.viblo.asia/e9ad66d4-7457-4874-ad90-936208087a8f.png)

Đây là thành sẽ chịu trách nhiệm tương tác với master node và quản lý container bên trong kubernetes cluster. Bên cạnh đó kubelet còn giám sát container ở trên worker node và gửi thông tin đó về master node.

Nó sẽ lắng nghe thông báo từ master node về cấu hình của container mà được phân phối tới worker node, sau đó nó sẽ tạo container tương ứng với cấu hình đó lên trên worker node.

Vậy kubernetes sẽ làm việc với container thông qua kubelet, vậy kubelet sẽ làm việc với container như thế nào? Ta sẽ tìm hiểu tầng sâu hơn nữa là cách kubelet sẽ làm việc với container.

## Container Runtime and Container Runtime Interface
Như đã nói ở bài trước container runtime là một công cụ đóng vai trò quản lý, giúp ta tạo và xóa container một cách dễ dàng, thay vì ta phải tạo container bằng hàng loạt câu CLI phức tạp.

Và kubelet sẽ tương tác với container runtime ở trên worker node thông qua một layer tên là Container Runtime Interface (CRI).

![image.png](https://images.viblo.asia/1f8db4a0-5665-497c-861e-b645c2974963.png)

Vậy tại sao ta lại phải cần CRI, sao kubelet không tương tác trực tiếp với container luôn đi, tách ra chi cho rảnh vậy?

Thì lý do cho việc này là vì nhà phát triển kubernetes muốn giữ cho kubelet đơn giản nhất có thể. Vì container runtime thì có rất nhiều loại (docker, cri-o, containerd, ...), thì thay vì ta phải implement việc tương tác với rất nhiều loại container runtime khác nhau bên trong kubelet, thì ta nhà phát triển kubernetes muốn để việc đó cho một thằng trung gian là CRI.

Cho dù ở worker node có xài container runtime nào đi chăng nữa thì kubelet cũng chỉ giao tiếp với CRI thông qua một tập lệnh duy nhất, còn lại việc giao tiếp với các container runtime khác nhau như thế nào thì tự thằng CRI nó implement.

Vậy thì kubelet sẽ thông qua CRI tương tác với container runtime, và container runtime sẽ thực hiện việc tạo container, hình minh họa nguyên một luồng kubernetes tạo container.

![image.png](https://images.viblo.asia/aed92e3e-7753-45f6-ad84-459ef21dc8f1.png)

1. Đầu tiên kubernetes master node sẽ báo cho kubelet tạo container.
2. Tiếp theo kubelet sẽ giao tiếp với high level container runtime (cri-o, containerd, ...) thông qua CRI và kêu nó tạo container đi.
3. Lúc này high level container runtime sẽ pull image từ container image registry xuống, extract nó ra và lưu xuống disk.
4. Sau đó low level container runtime sẽ được thông báo và nó sẽ nhảy vào disk để lấy container image để tạo container.
5. Sau khi lấy được container image thì low level container runtime sẽ thực hiện một loạt lệnh xuống dưới linux kernel để tạo container.

## Kubernetes works with Container Runtime
Vậy là ta đã hiểu được cách kubernetes làm việc với container runtime như thế nào, tiếp theo ta sẽ xem một số container runtime phổ biến mà kubernetes có thể xài.

### Docker
Docker là thằng container runtime đầu tiên mà kubernetes sử dụng, nhưng ở phiên bản 1.24 thì nó đã bị kubernetes remove đi, không sử dụng nữa.

![image.png](https://images.viblo.asia/dbd84901-27e3-4d03-92dc-16e456b54aab.png)

Kubernetes sử dụng docker thông qua CRI là dockershim, và vì nó quá rườm rà nên đã bị remove từ bản 1.24. Mình nhắc lại 2 lần là để cho mọi người nhớ kĩ `:)))`.

### Containerd
Containerd là một thằng container runtime đơn giản và bớt rờm rà hơn so với thằng docker.

![image.png](https://images.viblo.asia/acb812ec-bd9a-4acf-b296-0dc5d6c554d1.png)

Từ bản 1.1 thì containerd có nhúng sẵn một CRI plugin vào bên trong nó, kubelet chỉ cần tương tác trực tiếp với plugin này là được. Như ta thấy thì thay vì ở trên ta dùng docker cho container runtime ta phải đi qua rất nhiều lớp, còn với containerd thì ta đi thẳng tới nó luôn.

### CRI-O
Đây là một thằng container runtime cũng phổ biến mà có thể dùng cho kubernetes như thằng containerd.

![image.png](https://images.viblo.asia/028edad9-970d-4cca-aaee-e7299e3d183d.png)

CRI-O được phát triển bởi Redhat.

## Kết luận
Vậy là ta đã tìm hiểu xong về vấn đề kubernetes làm việc với container runtime như thế nào. Thì chỉ có một điểm quan trọng mà mình cần nhắc là từ bản 1.24 thì kubernetes sẽ bỏ việc sử dụng docker cho container runtime, nếu ta muốn nâng kubernetes lên bản 1.24 thì cần phải cài container runtime khác nhé. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

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
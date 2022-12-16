![](https://images.viblo.asia/bcf1d2d3-1d33-4537-9e21-68f427266e4f.png)
<div align="center">
    
# Lời nói đầu
    
</div>

- V.I.Lenin đã từng nói "**HỌC, HỌC NỮA, HỌC MÃI**", và câu nói ấy vẫn chứng minh được tính đúng đắn của mình cho đến tận ngày nay, và đặc biệt là trong xã hội công nghệ 4.0 hiện nay. Các công nghệ mới xuất hiện và cập nhật liên tục như một cơn gió (ví dụ như [Laravel 8.x ](https://laravel-news.com/tag/laravel-8) đã ra đời chỉ sau [Laravel 7](https://laravel-news.com/laravel7) vỏn vẹn có 6 tháng :scream::scream::scream::scream:) đòi hỏi mỗi lập trình viên đều phải tự tìm tòi học hỏi các công nghệ mới để tránh việc bản thân bị lạc hậu và đào thải.
- Và lần này, mình đang tìm hiểu về **Kubernetes**. Còn về lí do vì sao mình lại chọn **Kubernetes** thì hãy chờ xuống dưới để hiểu được **Kubernetes** có thể làm được những gì nhé.
- Bắt đầu thôi nào!

<div align="center">
    
# Nội dung
    
</div>

- Khi tìm hiểu về một công nghệ mới thì cái bạn quan tâm chắc chắn là:
    + Nó là gì?
    + Nó dùng để làm gì?
    + Ai phát triển ra nó
    + Sử dụng nó như thế nào? 

- Và series bài viết này cũng sẽ đi theo một bố cục như thế để giúp cho các bạn có thể nắm được thông tin một cách nhanh nhất: "**MÌNH CÓ CẦN HỌC CÁI NÀY KHÔNG?**"

<div align="center">
    
## Kubernetes là gì
    
</div>

> Kubernetes (K8s) is an open-source system for automating deployment, scaling, and management of containerized applications.

- Theo như trên trang chủ tự giới thiệu thì **Kubernetes** là một hệ thống mã nguồn mở phục vụ mục đích deploy dự án tự động (***automating deployment***), mở rộng hệ thống (***scaling***) và quản lý các container.
- Và cha đẻ của nó chính là ông lớn **Google**, đây cũng là một điểm cộng rất lớn về độ uy tín của công cụ này rồi phải không nào. Trước đó, Google sử dụng một công cụ nội bộ gọi là **Borg** để vận hành và quản lý các service của mình. Và với hơn 15 năm kinh nghiệm về vận hành sản phẩm của mình, Google đã cho ra mắt Kubernetes vào 07/06/2014.

    Và nếu các bạn có hứng thú có thể đọc phần lịch sử phát triển ở [đây](https://kubernetes.io/blog/2015/04/borg-predecessor-to-kubernetes/), cũng khá là nhiều thứ hay ho và này nọ :D
- Về cách gọi tên thì mình cũng không chắc chắn lắm, các bạn có thể lựa chọn 1 trong những cách sau:
    
    + **Ciu-bơ-ne-ti-sờ**: đây là phiên âm của google dịch
    + **Ciu-bơ-nét**: đây là phiên âm của mình, bỏ âm gió ngắn gọn hơn mà người nghe vẫn có thể hiểu được
    + **K8s**: cái này thì không sợ phát âm sai, cả thế giới đều có thể hiểu đúng :laughing::laughing::laughing::laughing: Còn lí giải vì sao lại thế thì đơn giản nó là **K-8-chữ-cái-ở-giữa-s** nên gọi là **K8s** (theo như cách đặt tên này thì mình sẽ là **T2I** :sweat_smile::sweat_smile::sweat_smile::sweat_smile:)

<div align="center">
    
## Các khái niệm cơ bản
    
</div>

![](https://images.viblo.asia/30c6dbc2-0f47-4730-857d-ed9ff6367c16.png)

- **Cluster** : Một Kubernetes cluster là một tập các máy ảo/vật lý được cài đặt Kubernetes dùng để chạy các ứng dụng. Các máy ảo/máy vật lý này được gọi là các nodes, được phân ra thành node master và các nodes worker. Như hình ảnh phía dưới là mô tả hệ thống gồm Kubernetes Master Node và các Worker Nodes (và như các bạn có thể nhìn thấy trong ảnh thì ở đây có thể có được hàng chục, thậm chí hàng ngàn worker nodes)

![](https://images.viblo.asia/f1266370-7d15-4a6e-af37-cd21b9de0acf.png)

- **Node** (https://kubernetes.io/docs/concepts/architecture/nodes/): Kubernetes nodes là các máy ảo hay máy vật lý chạy kubernetes. Các node này cần chạy Kubernetes và docker, và mỗi máy này là một docker host.

    Node là đơn vị nhỏ nhất của phần cứng máy tính trong Kubernetes. Nó là đại diện của một máy duy nhất trong Kubernetes cluster. Trong hầu hết các hệ thống Kubernetes, một node có thể sẽ là một máy vật lý thật sự hoặc máy ảo của một cloud platform như Google Cloud Platform hay AWS, hoặc đơn giản là một máy ảo được tạo bởi VirtualBox trên một máy đơn.

    Chúng ta có thể đơn giản xem mỗi node như một tập hợp tài nguyên CPU và RAM có thể được sử dụng. Bằng cách này, bất kỳ máy nào cũng có thể thay thế bất kỳ máy nào khác trong Kubernetes cluster.
    
- **Pods** (https://kubernetes.io/docs/concepts/workloads/pods/): Khi một ứng dụng được đóng gói thì ứng dụng đó sẽ có thể chạy trên một container độc lập, Kubernetes sử dụng khái niệm pod để nhóm các container lại với nhau. Một pod là một nhóm các container, các container này sẽ dùng chung tài nguyên và network, các container trong một pod có thể duy trì giao tiếp với nhau như trên một máy chủ nhưng vẫn giữ được sự độc lập cần thiết.

    Với Kubernetes, các pods thường là nhóm các containers có cùng mục đích sử dụng, ví dụ như một pod tập hợp 4 container chạy nginx + backend, và một pod tập hợp 2 container chạy frontend + nginx .v.v. , Vì vậy bài toán scale ứng dụng sẽ trở nên rất đơn giản vì chỉ cần scale các pods.

<div align="center">
    
## Một số module cơ bản của Kubernetes
    
</div>

- Và như trang chủ có liệt kê một số module cơ bản của Kubernetes như hình bên dưới: 
    -  Create Kubernetes cluster
    -  Deploy an app
    -  Explore app
    -  Expose app publicity
    -  Scale up app
    -  Update app
 
    Và các bài viết tiếp theo trong series này cũng sẽ tìm hiểu lần lượt từng bước như vậy.

![](https://images.viblo.asia/500ae42b-056f-4de2-b853-5eb840a5e1c6.png)


<div align="center">
    
# Kết luận
    
</div>

- Trong phạm vi của 1 bài viết mở màn, mình chỉ có thể giới thiệu cho các bạn một số khái niệm cơ bạn về K8s, trong những bài viết tiếp theo của series này mình sẽ dần dần cung cấp thêm cho các bạn các kiến thức về setup và ứng dụng K8s, các bạn hãy đón chờ các bài viết tiếp theo trong series này của mình nhé!

<div align="center">
    
# Tài liệu tham khảo
    
</div>

- https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/
- https://viblo.asia/tags/k8s
- www.google.com
## Giới thiệu
Bài viết này được dịch từ bài gốc [Why Mercedes-Benz runs on 900 Kubernetes clusters](https://www.infoworld.com/article/3664052/why-mercedes-benz-runs-on-900-kubernetes-clusters.html) của [Scott Carey](https://www.infoworld.com/author/Scott-Carey/) trên trang Infoworld. Bài này không có đi sâu về kỹ thuật mà chủ yếu nói về lý do tại sao Mercedes-Benz lại không dùng một Kubernetes cluster cho nhiều team, mà với mỗi team họ sẽ cung cấp cho họ một Kubernetes cluster. Những thứ mà họ chia sẻ trong bài này có thể **chính xác hoặc không**, vì mục đích chính của họ trong bài này là marketing, nhưng vẫn có rất nhiều ý hay mà ta có thể áp dụng.

![image.png](https://images.viblo.asia/2b6650b6-9820-4272-aae2-fd59cfa59dca.png)

Đây là thông tin mà nhà sản xuất ô tô Mercedes-Benz đã chia sẻ với cộng đồng, họ phát triển và vận hành các hệ thống công nghệ của họ bằng Kubernetes, và họ không sử dụng duy nhất một Kubernetes cluster mà sử dụng lên tới 900 clusters cho toàn bộ các team của họ trên khắp thế giới. Team vận hành của họ đã chia sẻ rằng: “Với họ, việc quản lý Kubernetes không quá khó”.

## Họ bắt đầu thế nào
Đội công nghệ của Mercedes-Benz đã dành thời gian 7 năm để xây dựng hệ thống nội bộ của họ, với hơn 900 Kubernetes clusters mà hỗ trợ cho số lượng developer teams hơn cả ngàn, cung cấp cho công ty một hệ thống hạ tầng rất dễ dàng mở rộng và quản lý.

Sau khi Google chuyển Kubernetes thành open source năm 2014 thì Mercedes-Benz đã bắt đầu sử dụng Kubernetes cho các ứng dụng của họ từ năm 2015 với công ty con là Mercedes-Benz Tech Innovation.

## Tại sao họ lại dùng nhiều cluster
Ở hội thảo lớn nhất về công nghệ của Kubernetes là KubeCon vào tháng 5 2022, một kỹ sư của Mercedes-Benz Tech Innovation đã nói với nguyên văn như sau:

> “We knew a single shared Kubernetes cluster wouldn’t fit our needs, no vendor distribution fit our requirements, and we had the engineers with expertise”

> “We built a 100% FOSS (free open source software) platform built and developed by the same devops team, with no licensing issues or support requests.”

Dịch đơn giản là họ biết nếu chỉ sử dụng một Kubernetes cluster thì sẽ không phù hợp với nhu cầu của họ, và họ có những kỹ sư trong team DevOps với kinh nghiệm để có thể vận hành và tự xây dựng hệ thống. Nên không việc gì họ phải sợ việc quản lý nhiều Kubernetes cluster khác nhau.

Do đó từ năm 2015 tới 2021 Mercedes-Benz đã xây dựng và vận hành hơn 900 on-premises Kubernetes clusters bằng OpenStack trên toàn bộ hệ thống data center của họ khắp thế giới, với Kubernetes version là 1.23. Có nghĩa ngoài việc quản lý nhiều Kubernetes clusters khác nhau, khi có version mới thì họ cũng cập nhật version cho toàn bộ Kubernetes clusters, theo mình đánh giá thì việc này là công việc khổng lồ, nếu bạn tự quản lý Kubernetes thì sẽ biết việc cập nhật một cluster sẽ tốn công thế nào, nhưng họ làm được với hơn 900 Kubernetes clusters. Nếu họ có chia sẻ cách làm thì tốt quá `:)))`.

## Thực sự có cần nhiều cluster không?
Theo khảo sát từ Cloud Native Computing Foundation 2019 surve thì chỉ có ít hơn 10% công ty là sử dụng nhiều hơn 50 Kubernetes clusters, nên việc Mercedes-Benz có thể vận hành được hơn 900 Kubernetes clusters là do họ có người và họ thấy việc đó là cần thiết cho họ, vì việc sử dụng một Kubernetes cluster cho nhiều team sẽ có khá nhiều công việc để làm, từ cách phân phối tài nguyên tới việc chia quyền. Nên họ sẽ xây hẳn một cluster cho một team và tuyển kỹ sư để quản lý Kubernetes cluster thay vì tốn công sức vào việc chia quyền.

Lead team của Mercedes-Benz Tech Innovation đã chia sẻ quan điểm của họ như sau:

> “We put a lot of effort into doing things in a way where we are able to manage it”

> “For us, the surrounding systems are working well if we are managing 500 clusters, or 1,000, because everything is automated … If we were to add 500 more clusters, we would have to add just one more engineer.”

Dịch đơn giản là họ dành rất nhiều công sức cho việc quản lý Kubernetes cluster, một kỹ sư của họ có thể quản lý số lượng Kubernetes clusters lên tới 500, vì mọi thứ đều tự động. Nên nếu họ cần thêm 500 clusters thì họ chỉ cần tuyển thêm một người.

## Chìa khóa để Mercedes-Benz có thể vận hành nhiều cluster
Chìa khóa trong việc họ có thể quản lý nhiều clusters như vậy là **Cluster API on OpenStack**, ở đây thì tuy rằng Mercedes-Benz muốn quảng cáo cho OpenStack, nhưng nếu bạn biết tới OpenStack thì thực sự nó sẽ giúp ta rất nhiều trong việc quản lý Kubernetes ở dưới môi trường on premise. OpenStack được phát triển bởi Red Hat, nó là một PaaS mà xây dựng dựa trên Kubernetes, nếu có cơ hội các bạn hãy tìm hiểu nó thử.

Câu mà mình ấn tượng nhất trong bài này là Product Owner của họ đã nói là **"For us, managing Kubernetes is not hard"**, nguyên văn như sau:

> “Managing Kubernetes is hard if you are not deep into it. But in our opinion, if we are managing it, we want to be deep into it, so for us, managing Kubernetes is not hard,”

> “Kubernetes for application projects is still hard. To consume Kubernetes as a devops team is sometimes hard.”

Dịch đơn giản là với họ thì việc quản lý Kubernetes sẽ không khó nếu bạn hiểu sâu về nó, cái khó là triển khai ứng dụng lên trên Kubernetes. Điểm này thì mình có quan điểm giống với ông Product Owner này `:)))`, nếu các bạn chưa học về Kubernetes mà đã lên trên mạng xem ví dụ để cài đặt nguyên một cluster thì nó cực kì khó.

Vì bạn sẽ không biết mình đang cài cái gì và nó có gì trong đó. Còn với việc triển khai ứng dụng lên trên Kubernetes thì luôn luôn có các thử thách khác nhau, nên khó là ở việc triển khai ứng dụng chứ không phải quản lý cluster, vì ta cần phải có sự hợp tác giữa đội DevOps và đội phát triển ứng dụng nữa.

Câu kết bài mà ông Product Owner đã nói là, với đội phát triển ứng dụng, việc triển khai ứng dụng lên trên Kubernetes thì khá khó với họ, nên đừng để đội ứng dụng họ làm một mình, hãy hợp tác với họ. Mình rất đồng ý, công việc của một DevOps không phải là xây dựng nguyên con cluster đó rồi để đội dev tự triển khai, mà ta cần phải phối hợp với họ trong việc đó.

Còn tốt nữa là mình nên hướng dẫn lại cho đội dev cách Kubernetes làm việc, để họ biết được cách nó vận hành như thế nào và họ cũng có thể dễ dàng làm việc với ta trong việc triển khai ứng dụng. Chứ không phải ông DevOps mà suốt ngày đi cãi nhau với dev `:)))`.

## Kết luận
Ý chính của bài này mà mình thấy là:
1. Mercedes-Benz chọn vận hành nhiều cluster là vì một cluster sẽ không đáp ứng được nhu cầu của họ và họ có những kỹ sư giỏi để vận hành nhiều cluster một lúc.
2. Để làm được điều đó thì họ xài OpenStack.
3. Một DevOps thì nên hỗ trợ và giúp đỡ đội phát triển ứng dụng, kết hợp với họ chứ không phải cãi nhau với họ, nói vậy chứ mình thì mình cãi `:)))`.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Hiện tại thì công ty bên mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và sở hữu trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java, Go). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java, Go). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221
+ Manual QC. https://tuyendung.hoang-phuc.com/job/seniorjunior-manual-qc-1039

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn đề cần giải quyết, và sẽ có rất nhiều bài toán thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `hmquan08011996@gmail.com`. Cảm ơn các bạn đã đọc.
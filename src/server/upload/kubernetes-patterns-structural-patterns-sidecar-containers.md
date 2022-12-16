## Giới thiệu
Chào các bạn tới với series về kubernetes patterns. Loạt bài tiếp theo chúng ta sẽ đi tiếp qua một loại pattern khác là Structural Patterns, bài thứ hai chúng ta sẽ tìm hiểu về Sidecar Container.

![image.png](https://images.viblo.asia/c742c7d4-435d-4294-98ca-a358d4446210.png)

Structural Patterns sẽ bao gồm các pattern sau đây:
+ [Init Container](https://viblo.asia/p/kubernetes-patterns-structural-patterns-init-container-6J3ZgpjRlmB).
+ Sidecar.
+ Adapter.
+ Ambassador.

Bài này chỉ nói về lý thuyết, các bạn đọc bài này để xem cách sử dụng Sidecar Container vào thực tế nhé [Logging with Logstash and FluentD by Sidecar Container](https://faun.pub/kubernetes-practice-logging-with-logstash-and-fluentd-by-sidecar-container-86076da0812f).

## Containers must single purpose
Containers cho phép developer và system administrators xây dựng, vận chuyển và chạy ứng dụng một cách thống nhất và dễ dàng. Mục đích của container được sinh ra là để xây dựng được một môi trường độc lập, chứa tất cả những thứ cần thiết để chạy được ứng dụng và ta có thể sử dụng lại một container ở nhiều chỗ khác nhau.

Do đó khi xây dựng container thì ta chỉ nên xây dựng nó để giải quyết một vấn đề cụ thể và giải quyết vấn đề đó tốt nhất có thể. Nếu ta muốn mở rộng chức năng của container thì ta chỉ cần extend container trước đó là được. Ví dụ.

```Dockerfile
FROM fluent/fluentd:v1.12.0-debian-1.0
USER root
RUN gem install fluent-plugin-elasticsearch --version 5.0.3
USER fluent
```

Thay vì ta xây dựng container `fluent/fluentd` có sẵn elasticsearch plugin thì nó sẽ làm nặng container, thì ta chỉ nên xây dựng container `fluent/fluentd` với các chức năng cơ bản của nó, nếu ta cần thêm plugin nào thì ta chỉ cần xây lại container mới mà sẽ extend chức năng của container `fluent/fluentd`.

**Một container chỉ nên giải quyết một vấn đề duy nhất.** Cách tiếp cận này sẽ giúp ta dễ dàng debug và maintain một container.

## Sidecar Containers
Quay lại về K8S, một Pod có thể chứa một hoặc nhiều container, và với quy tắc ở trên thì một container ở trong Pod cũng chỉ nên có một chức năng duy nhất.

Ví dụ, container mà dùng để chạy application thì chỉ nên phục vụ cho một mục đích là chạy application, các chức năng phụ như thu thập log, monitoring container thì ta nên để cho một container khác phụ trách, tránh để các chức năng phụ làm ảnh hưởng tới hiệu xuất của application container. Các container đó được gọi là Sidecar Containers.

**Sidecar containers là các container mà chạy bên cạnh application containers ở trong một Pod, nó sẽ có nhiệm vụ mở rộng và hỗ trợ chức năng cho application containers.**

![](https://images.viblo.asia/fcb64bd1-e369-45bb-8ad0-abde4d24575f.png)

Các container chạy chung một Pod có thể hỗ trợ cho nhau là vì Pod cho phép các container của nó chia sẻ volume với nhau và giao tiếp với nhau thông qua local network hoặc host IPC. Có nghĩa là các container bên trong cùng một Pod có thể mount vào cùng một volume, và gọi được nhau thông qua localhost.

Ví dụ ta có một yêu cầu như sau, ta cần một trang web đơn giản được host bằng HTTP server và code của trang web ta sẽ lấy từ Github. Vì code của trang web trên github của ta sẽ thay đổi liên tục nên ta cần chạy một process để nó sync code từ Github xuống HTTP server 60 giây một lần. Bạn sẽ làm nó như thế nào? Các bạn làm thử trước khi đọc tiếp nhé, sau đó bạn sẽ thấy sidecar pattern sẽ giúp ta giải quyết vấn đề này rất dễ dàng 😁.

Ta sẽ làm như sau, ta tạo một Pod mà có hai container là HTTP server và Git synchronizer container. Với HTTP server container chỉ tập trung vào việc hosting file thông qua HTTP, nó chả cần quan tâm file này được lấy từ đâu. Và Git synchronizer container sẽ thực hiện nhiệm vụ sync code từ trên Github về, nó chả quan tâm là file này sẽ được sử dụng làm gì.

```web-app.yaml
apiVersion: v1
kind: List
items:
- apiVersion: v1
  kind: Pod
  metadata:
    name: web-app
    labels:
      project: k8spatterns
      pattern: Sidecar
  spec:
    containers:
    # Main container is a stock httpd serving from /var/www/html
    - name: app
      image: centos/httpd
      ports:
        - containerPort: 80
      volumeMounts:
      - mountPath: /var/www/html
        name: git
    # Sidecar poll every 10 minutes a given repository with git
    - name: poll
      image: axeclbr/git
      volumeMounts:
      - mountPath: /var/lib/data
        name: git
      env:
        - name: GIT_REPO
          value: https://github.com/rhuss/beginner-html-site-scripted
      command:
      - "sh"
      - "-c"
      - "git clone $(GIT_REPO) . && watch -n 60 git pull"
      workingDir: /var/lib/data
    volumes:
    # The shared directory for holding the files
    - emptyDir: {}
      name: git
```

Ở file trên, đầu tiên ta tạo một emptyDir volume, sau đó ta mount nó vào Git synchronizer container ở folder `/var/lib/data`, container git sync sẽ có nhiệm vụ 60s nó sẽ sync code từ Github xuống một lần.

Tiếp theo ta sẽ mount emptyDir volume này vào HTTP server ở folder `/var/www/html` để HTTP server container hosting nó thông qua HTTP.

![image.png](https://images.viblo.asia/5516b545-977c-4c9c-a5e3-be63a7eb629b.png)
*<div align="center">Image from [Kubernetes Patterns](https://www.oreilly.com/library/view/kubernetes-patterns/9781492050278/)</div>*

## Kết luận
Vậy là ta đã tìm hiểu xong về Sidecar Pattern, nếu ta cần logging và monitoring container thì chúng ta nên sử dụng sidecar containers để chức năng phụ đó tránh gây ảnh tới hiệu suất của application containers. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

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
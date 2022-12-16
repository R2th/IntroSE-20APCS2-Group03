Trong workflow với Docker hay Kubernetes, sẽ có lúc bạn phải build Docker image ờ một chỗ nào đó mà không có docker daemon. Ví dụ như trong cotainer của CI service, hay là trong Kubernetes cluster chẳng hạn. Để làm điều đó thì chúng ta đã biết đến các cách như là *Docker in Docker* (DinD) hay *Docker outside of Docker* (DooD).

Tuy nhiên cả 2 cách này đều có vấn đề. *Docker in Docker* thì cần phải chạy với `--privileged`. Nghĩa là nó sẽ có đầy đủ mọi quyền đối với máy host. *Docker outside of Docker* thì cần mount docker socket của máy host vào trong container. Cả 2 đều không thể thực hiện nếu bạn chỉ có thể access bên trong container (vd như trên CI service). Và cả 2 cách trên đều cần dùng đến Docker daemon. Mà Docker daemon thì phải chạy bằng user *root*.

Vậy nên gần đây chúng ta hay thấy một cách khác đó là *Docker without Docker*. Build docker image mà không cần đến docker daemon. Trong bài này, chúng ta hãy cùng tìm hiểu qua và so sánh nhanh 2 tool mà mình nghĩ là tiêu biểu nhất của cách tiếp cận này, [img](https://github.com/genuinetools/img) và [Kaniko](https://github.com/GoogleContainerTools/kaniko).

Nhưng trước hết chúng ta hãy thử xem *DinD* và `--privileged` hay *root* user thì có vấn đề gì đã nhé.

## What's wrong with and `--privileged`

Docker document giải thích `--privileged` như sau

> By default, Docker containers are “unprivileged” and cannot, for example,
> run a Docker daemon inside a Docker container. This is because by default
> a container is not allowed to access any devices, but a “privileged”
> container is given access to all devices

Tạm dịch ngắn gọn là `--privileged` container sẽ access được vào tất cả device trên máy host. Hãy thử xem sao.

Thử chạy một container `alpine` khi không có `--privileged` và list tất cả device xem

```sh
docker run -t --rm alpine ls /dev
```

![](https://images.viblo.asia/2e4fb87e-53e0-4e8f-ae94-0819fad7bf25.PNG)

Giờ thì thử lại với `--privileged` xem

```sh
docker run -t --privileged --rm alpine ls /dev
```

![](https://images.viblo.asia/c1153863-8999-4f78-8a93-31a08e5774a2.PNG)

Có thể thấy là số device nhiều hơn hẳn. Nếu check trên máy host, bạn sẽ thấy kết quả giống hệt.

![](https://images.viblo.asia/90a4b129-fa7c-4bad-a617-caed24b0005f.PNG)

Nếu container có thể access tất cả device trên máy host, nghĩa là nó có thể làm mấy thứ nguy hiểm, ví dụ như là xóa toàn bộ mọi thứ trên ổ cứng chẳng hạn. Vậy nên hãy cẩn thận khi chạy 1 container nào đó mà nó yêu cầu phải có `--privileged` nhé.

Dù không rõ chi tiết, nhưng chúng ta có thể hiểu được lí do tại sao *Docker in Docker* lại cần có `--privileged`, vì Docker daemon cần access các device trên máy host, để tạo network chẳng hạn.

## What's wrong with *root* user

Mọi người đều biết một điều đó là không bao giờ chạy app của mình bằng user *root*.

Tuy nhiên có thể đôi khi bạn lại không để ý và chạy app của mình bằng user *root* trong container. Cũng có cả đống image có sẵn trên Docker Hub đang được chạy bằng user *root* và có thể bạn cũng đang chạy chúng trên production đấy.

Dù vậy nhưng điều này lại rất ít được quan tâm đến, có thể vì mọi người không biết rằng cái này là default khi viết Dockerfile. Hay dù cho có biết thì mọi người vẫn nghĩ rằng app chạy trong docker container thì khá là an toàn rồi. Dù có kẽ hở nào và bị inject script nguy hiểm nào đó thì cũng chỉ là trong container thôi, máy host vẫn vô sự.

Thế nhưng hãy nhớ là một process trong container cũng không khác gì một process trên máy host hết. Nếu bạn kiểm tra các process trên máy host thì sẽ thấy nó bao gồm cả các process bên trong container đó. Ví dụ như ở đây mình có thể thấy process của container *DinD* khi chạy `ps -aux` trên máy host chẳng hạn.

![](https://images.viblo.asia/13c7f2ab-2c0a-4b3f-a4f0-3a89aebde0cf.PNG)

Và nếu có một exploit nào đó cho phép process trong container thoát được ra khỏi container thì nó sẽ trở thành một process với user *root* thực sự với toàn bộ quyền năng trên máy host.

Thậm chí không cần đến exploit nào hết, nếu bạn mount những folder hay socket quan trọng vào container thì *root* user trong container hoàn toàn có thể giành được quyền điều khiển máy host giống như *root* user thật vậy.

Bây giờ chúng ta đã hiểu lí do cho mục tiêu mà 2 tool sắp được nhắc đến dưới đây đang hướng đến rồi. Giờ thì hãy cùng tìm hiều về *img* và *Kaniko* nhé.

## img

[img](https://github.com/genuinetools/img) được bắt đầu bởi [Jessie Frazelle](https://github.com/jessfraz) vào khoảng cuối năm 2017. Mục tiêu của tool này giống như đã đề cập ở trên đó là để build Docker image mà không cần dùng đến *privileged* container hoặc là user *root*. *img* sử dụng [BuildKit](https://github.com/moby/buildkit), project mà chính Docker dùng để build Docker image, nên nó cũng sẽ support những syntax mới nhất của *Dockerfile*. Tại thời điểm này, nó thậm chí còn hiệu quả hơn chính Docker trong việc build image nữa nhờ tính năng parallel build của BuildKit mà hiện vẫn chưa được tích hợp vào Docker.

### How it works

*img* dùng *user namespace* và *runc container* để tạo user *root* trong một namespace khác với máy thật. Nghĩa là bên trong container thì nó là user *root* nhưng mà ở bên ngoài thì lại không phải vậy. Đây là 2 cái ảnh miêu tả cách nó hoạt động từ trang README của project.

![](https://images.viblo.asia/300/855d7162-29c6-4744-aae5-9eb4d1da1cb0.png)

![](https://images.viblo.asia/300/2ca5c490-71da-4dba-a5d5-6a8f2587289b.png)

### Usage

Cách dùng *img* thì khá giống với docker. Chúng ta cũng có các command `build`, `push`, `pull`, `tag`, `save`, `login`.

Ví dụ để build image thì làm thế này

```sh
img build . -t you/your-image:latest
```

Push image lên registry thì thế này

```sh
img push you/your-image:latest
```

Nói chung là gần như giống hệt Docker nên cũng không có gì nhiều để nói.

### Usage with docker

Dù gọi là *Docker without Docker*, nhưng mà use case chính của các tool này đều là để chạy bên trong Docker container. Vì nếu chạy được ở ngoài thì dùng luôn Docker đi chứ mất công nghĩ ra cái này làm gì.

Như đã nói từ trước thì mục tiêu của *img* vẫn sẽ là chạy ở trong Docker container mà không cần đến `--privileged` hay user *root*. Hiện giờ thì *img* mới đạt được có một mục tiêu đó là chạy mà không cần dùng user *root*, và vẫn cần `--privileged` để chạy

```sh
docker run --rm -it \
    --name img \
    --volume $(pwd):/home/user/src:ro \ # for the build context and dockerfile, can be read-only since we won't modify it
    --workdir /home/user/src \ # set the builder working directory
    --volume "${HOME}/.docker:/root/.docker:ro" \ # for credentials to push to docker hub or a registry
    --privileged \
    r.j3ss.co/img build -t user/myimage .
```

Tuy nhiên, team phát triển đang làm việc rất tích cực với team Docker và runc để *img* có thể chạy mà không cần `--privileged`. Chỉ còn đợi 1 pull request được merge nữa thôi là xong.

## Kaniko

[Kaniko](https://github.com/GoogleContainerTools/kaniko) là project của Google, được giới thiệu khoảng đầu năm 2018. Mục đích chính của Kaniko là để build Docker image trong Kubernetes cluster.

Tất nhiên nó cũng chung 2 mục tiêu như trên với *img*. Nhưng Kaniko thì lại ngược lại. Nó không cần `--privileged` nhưng lại phải chạy bằng user *root*. Bạn có thể follow issue về việc chạy bằng *root* của *Kaniko* ở [đây](https://github.com/GoogleContainerTools/kaniko/issues/105).

Khác với *img*, Kaniko không dùng BuildKit mà dùng cách riêng của Google. Vì vậy nó sẽ không support các syntax mới nhất của Dockerfile sớm như Docker. Ngay cả các tính năng hiện tại cũng chưa được support đầy đủ.

### How it works

BuildKit thì cần phải dựng 1 container với base image từ command `FROM` rồi sau đó chạy các lệnh tiếp theo bên trong container đó. Vì vậy nên nó mới cần có `--privileged`.

Kaniko thì pull base image từ lệnh `FROM` về rồi extract nó ra ngay bên trong container đang chạy. Sau đó chạy các lệnh tiếp theo ngay ở đấy luôn. Nhờ vậy nên nó không cần quyền đặc biệt gì cả và không cần `--privileged`. Tuy nhiên nó vẫn phải chạy bằng user *root* để extract được base image ra *root filefystem* và chạy các RUN command cần quyền *root* (*img* cũng cần quyền *root* để làm cái này, nhưng đó là user *root* ở 1 namespace khác).

### Usage

Kaniko cũng được sử dụng chủ yếu bên trong Docker container. Cách dùng của Kaniko thì cũng không giống với Docker tí nào. Nó chỉ có 1 command để build và push image cùng 1 lúc.

```sh
$ docker run \
  -v $(pwd):/workspace \
  -v ~/.docker/config.json:/kaniko/.docker/config.json \ # Used if you need docker login. Must login first so credentials are stored in this file.
  gcr.io/kaniko-project/executor:latest \
  --dockerfile=<path-to-dockerfile> \
  --context=/workspace \ # Where you Dockerfile is
  --destination=<repo-url-with-image-name>:<tag>
```

### With GitLab

GitLab cũng đã support Kaniko rồi. Nếu bạn đang dùng GitLab 11.2 trở lên hoặc là đang dùng gitlab.com thì bạn có thể dùng Kaniko thế này.

```yaml
build:
  stage: build
  image:
    name: gcr.io/kaniko-project/executor:debug
    entrypoint: [""]
  script:
    - echo "{\"auths\":{\"$CI_REGISTRY\":{\"username\":\"$CI_REGISTRY_USER\",\"password\":\"$CI_REGISTRY_PASSWORD\"}}}" > /kaniko/.docker/config.json
    - /kaniko/executor --context $CI_PROJECT_DIR --dockerfile $CI_PROJECT_DIR/Dockerfile --destination $CI_REGISTRY_IMAGE:$CI_COMMIT_TAG
  only:
    - tags
```

## Final words

Cho đến bây giờ thì việc build Docker image bên trong container mà hoàn toàn không cần quyền điều khiển hệ thống vẫn chưa thực hiện được. Nhưng không phải là không có giải pháp, các team phát triển đều đã có giải pháp cho riêng mình và đang tiên hành rồi. Chúng ta sẽ sớm làm được điều này trong một ngày không xa thôi.
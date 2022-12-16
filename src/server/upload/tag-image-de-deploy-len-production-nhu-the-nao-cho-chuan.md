Image là khái niệm cơ bản nhất mà bạn đã biết ngay từ khi mới làm quen với Docker.
Nhưng build image để deploy lên production thì lại là một câu chuyện phức tạp hơn nhiều.
Phải làm sao để biết code đang chạy trên production là tại commit nào, được deploy khi nào. Muốn rollback phải làm sao.
Rồi phải tích hợp với CI nữa. Chúng ta hãy cùng tìm hiểu vài cách tag image để deploy lên production hiệu quả nhé.

## Stable tags

Nói đến deploy docker image lên production thì từ đầu mình cũng nghĩ là dùng tag `latest` hay `master` cho production,
khi deploy lên staging thì dùng tag `develop` hay `staging` gì đó là được. Nhưng mà cách này không ổn chút nào.
Cùng một tag `master` có thể có rất nhiều image. Nếu team bạn deploy lên production thường xuyên thì gắn tag như vậy
thật sự chẳng có ý nghĩa gì cả vì hoàn toàn không phân biệt được cái nào với cái nào. Nếu bạn muốn rollback về một bản
cũ hơn cũng không thể nào làm được vì chẳng có cách nào phân biệt được image cũ với image mới cả.

Cách này gọi là *stable* tagging vì tag của chúng ta luôn luôn không đổi, nhưng nội dung image thì lại có thay đổi.
Tất nhiên như chúng ta vừa thấy ở trên thì cách này thật ra lại rất *unstable*.

## Unique tags

Khi deploy lên production thì nhất định bạn phải gắn cho mỗi image một tag duy nhất. Nhưng mà chúng ta nên dùng giá
trị nào để gắn tag đây. Tag chúng ta dùng nên thỏa mãn các yêu cầu sau.

- Phải là duy nhất (tất nhiên rồi ._.)
- Phải dễ dàng xác định code được deploy tại thời điểm đó và cũng dễ dàng tìm ra tag được deploy.
- Dễ dàng tìm ra image được deploy lần trước để còn rollback nếu cần.
- Phải dễ dàng sử dụng với CI/CD workflow.

Dưới đây là vài cách tạo tag cho image mà mình từng thấy mọi người làm.

### Timestamp

```sh
foo/bar:2019-06-01_12-23-32
foo/bar:2019-06-08_14-24-12
foo/bar:2019-06-15_12-12-32
```

Cách này đơn giản là dùng thời gian build để làm tag cho image luôn thôi. Ví dụ ngày `01/06/2019` lúc `12:23:32` thì tag
sé là `2019-06-01_12-23-32` chẳng hạn.
Đây là cách đặt tên release version cũng khá quen thuộc. Trông có vẻ dễ nhìn. Nhưng mà để gắn tag cho image thì lại
không ổn lắm. Cách này có thể dễ dàng thấy được thời gian build, dễ dàng biết được image nào được build trước hay sau.
Tuy nhiên chúng ta không thể từ thời gian build image mà suy ra code trong image đang ở thời điểm nào được. Từ code mà
tìm ra tên image lại càng không thể. Rồi còn timezone khác biệt nữa chứ.

Nói chung là cách này tên vừa dài vừa vô nghĩa, quá nhiều nhược điểm.

### Semantic versioning

```sh
foo/bar:1.0.0-beta.1
foo/bar:1.0.0-beta.2
foo/bar:1.0.0
foo/bar:1.1.0
foo/bar:1.1.1
```

Bạn có thể dễ dàng thấy là các oficial image trên Docker Hub đều được tag theo kiểu này.
Nhưng nếu dùng để gắn tag cho image để deploy thì có ổn không nhỉ.

Cũng không tệ. Nếu bạn nhớ tăng version mỗi lần deploy thì mỗi tag chỉ gắn với duy nhất một image.Cũng dễ dàng xác định
mỗi version ứng với code nào được deploy nữa nếu mà bạn nhớ push tag mới lên repo mỗi lần deploy.
Vì đây là semantic version nên nhìn phát là cũng biết ngay cái nào mới cái nào cũ.
Tìm version được deploy lần trước cũng quá đơn giản.

Nhưng giờ thì lại thêm việc phải làm mỗi lần deploy. Bạn phải tự bump version mỗi lần deploy vì làm sao mà CI biết khi
nào bạn muốn tăng version nào được. Quy trình deploy giờ lại phức tạp hơn với những thao tác phải thực hiện thủ công.
Giờ không chỉ phải lo bug trong code mà còn phải đi lo có lỗi trong deploy nữa thì (－‸ლ).

### Commit hash

```sh
foo/bar:0f299b0
foo/bar:b5915dc
foo/bar:9cce148
foo/bar:0845805
foo/bar:e478a78
```

Chúng ta sẽ dùng hash của commit hiện tại được deploy để gắn tag cho image được build luôn.
Cách này hay hơn hẳn 2 cách trên. Từ tag thì dễ dàng suy ra commit được deploy, mà ngược lại tìm tag được deploy cũng
dễ nữa. Hầu hết CI đều support bạn dễ dàng thực hiện theo cách này. Thường CI đều cung cấp sẵn commit hash trong một
biến môi trường để bạn tùy ý sử dụng. Ví dụ với Gitlab thì như này chẳng hạn.

```sh
docker build . -t foo/bar:${CI_COMMIT_SHA:0:7}
```

Nếu không dùng CI thì get commit hash từ git cũng chẳng khó khăn gì.

```sh
git log -1 --pretty=%h
```

Đây có lẽ là cách được recommend và sử dụng nhiều nhất hiện nay.
Cách này cũng gần như là hoàn hảo, đáp ứng được mọi yêu cầu chúng ta đặt ra, chỉ hơi khó xác định thứ tự image mới cũ
một chút thôi.

Ngoài ra vẫn còn một vấn đề nữa. Nếu bạn cần build lại image vì base image thay đổi mà code vẫn không
đổi thì sao. Ví dụ image của bạn được build từ `node:10-alpine`. Nếu có 1 bug fix ở base image mà bạn muốn update,
trong khi code của bạn vẫn không thay đổi gì. Khi đó image của bạn vẫn có tag như cũ vì không có commit nào mới nhưng
nội dung image thì đã thay đổi vì base image đã thay đổi. Giải pháp là bạn cần dùng base image với version đầy đủ,
ví dụ `node:10.16.2` thay vì `node:10`. Mỗi lần muốn update minor version của base image thì bạn lại phải update thủ
công, tốn công hơn một tẹo.

Còn nữa, giờ muốn rollback thì làm sao biết image trước đó là cái nào, sẽ hơi mất công một
tí. Nếu bạn dùng CI thì chỉ cần xem lần deploy trước là commit nào là xong. Còn nếu bạn không dùng CI thì ... chúc may mắn :upside_down_face:.

### CI build number

```sh
foo/bar:circle-ci-30
foo/bar:circle-ci-64
foo/bar:circle-ci-72
foo/bar:circle-ci-122
```

Cách này thì tất nhiên chỉ dùng được nếu bạn sử dụng CI (nếu chưa dùng thì bạn nên dùng luôn đi :D). Chúng ta sẽ dùng build
number của CI để làm tag cho image được build luôn. Kèm theo đó thì là tên của CI luôn trông cho nó dễ hiểu hơn
(ví dụ gitlab-ci-123456, 123456 có thể lại dễ bị nhầm với commit hash), cũng đề phòng trường hợp chúng ta đổi sang CI
khác và build number có thể bị trùng. Ví dụ với Gitlab CI thì làm như này

```sh
docker build . -t foo/bar:gitlab-ci-${CI_PIPELINE_ID}
```

CI sẽ đảm bảo build number này là duy nhất và theo thứ tự tăng dần nên nhìn vào cái là chúng ta biết ngay image nào mới
hơn hay cũ hơn. Từ build number chúng ta cũng dễ dàng tìm ra commit được deploy. Từ CI build cũng suy ra ngay image tag.
Chúng ta cũng có luôn lịch sử deploy trong CI khi khìn vào danh sách build nữa.
Khi bạn trigger build trên CI mà code không có thay đổi gì, ví dụ như trường hợp update base image ở trên thì chúng ta
cũng có image tag mới luôn mà không sợ bị trùng như khi dùng commit hash.

Cho đến giờ thì đây là cách tốt nhất mà mình từng thấy và sử dụng.

## Sử dụng build cache

Quay lại stable tag một chút, thật ra nó cũng không hẳn là vô dụng như mình nói từ đầu. Khi build image thì tag không
phải là thứ duy nhất cần quan tâm. Build cache cũng là một vấn đề cần để tâm tới. Không có nó thì thời gian build sẽ
tăng lên đáng kể, phải lặp đi lặp lại các bước giống nhau rất tốn thời gian.

Nhưng lấy đâu ra build cache khi mà chúng ta build trên CI.
Sẽ không có các layer được lưu lại như khi build trên máy của mình. Vậy thì phải dùng các image đã
build từ lần trước thôi. Nhưng làm sao biết được lần deploy trước là image nào (tag nào). Đây là lúc chúng ta cần đến
*stable* tag, luôn luôn không đổi và gắn với image mới nhất. Ngoài unique tag chúng ta sẽ thêm 1 cái stable tag nữa.
Ví dụ như này:

```sh
docker build . -t foo/bar:master -t foo/bar:gitlab-ci-${CI_PIPELINE_ID}
```

Lần tới khi build chúng ta có thể pull image đã deploy lần trước về và dùng nó để làm build cache:

```sh
docker pull foo/bar:latest
docker build . -t foo/bar:master -t foo/bar:gitlab-ci-${CI_PIPELINE_ID} --cache-from foo/bar:master
```

## TL;DR

- Không dùng *stable* tag để deploy.
- Dùng commit hash hoặc nếu dùng CI thì dùng luôn build number dạng `<ci>-<build number>`.
- Cũng có thể dùng *stable* tag song song với *unique* tag để sử dụng build cache.
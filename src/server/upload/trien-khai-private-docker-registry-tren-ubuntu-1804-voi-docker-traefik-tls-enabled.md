Nếu bạn đã dùng Docker thì đã biết tới Docker Hub - một service đươc host bởi Docker, CodeFresh, Gitlab..., tất cả chúng đều là nơi bạn có thể lưu trữ các phiên bản docker image của dự án. Một service dùng để lưu trữ các phiên bản của docker image như vậy được gọi là Docker Registry và chúng ta hàng ngày vẫn đang tương tác với nó qua các lệnh `docker pull` hay `docker push`. Hơi liên quan một chút nhưng CodeFresh Registry mới bị loại bỏ và không còn phục vụ từ ngày 15/07/2020 vừa qua nữa rồi. Chính vì vậy mình đã tìm hiểu về cách để tự host một Docker Registry dùng riêng cho dự án hay còn gọi là Private Docker Registry. Mình mạn phép chia sẻ lại tới 500 anh em trên Viblo. Bây giờ hãy cùng mình bắt đầu nhé! :)

*Warning: Bài viết sử dụng Docker, Traefik do đó bạn cân nhắc đọc qua tài liệu của Traefik và Docker trước nếu bạn chưa tìm hiểu nhé.*

## Private Docker Registry

Docker Registry server là nơi lưu trữ tất cả các phiên bản của docker image mà bạn push lên. Mà đợi chút!! Tại sao mình lại nói là tự host Docker Registry chứ không phải tự tạo nhỉ...? :D =))

Chính bởi vì mình sẽ dựng Private Docker Registry dựa trên opensource Docker Registry chứ không phải ngồi code từ đầu nữa! Thật vậy, nó chính là OPEN SOURCE nhé các bạn. Bạn có thể xem code tại đây:
- V1: https://github.com/docker-archive/docker-registry (DEPRECATED)
- V2: https://github.com/docker/distribution

Việc dựng Registry server mình sẽ sử dụng Docker image của nó là `registry:2` - được public trên Docker Hub. Mình cũng sẽ kết hợp luôn với sử dụng Traefik trong bài này để thực hiện setup với Docker cho nhanh. Về cơ bản, `registry:2` là một web server, nó sẽ expose tại port `:5000`. Chúng ta chạy nó lên xem thử đã nhé:

```bash
# run docker registry:
docker run -d --name registry -p 5000:5000 -v /mnt/registry:/var/lib/registry registry:2
```

Bạn có thể thử push một image `containous/whoami:latest` vào registry:

```bash
# rename image for registry
docker tag containous/whoami:latest localhost:5000/whoami:latest

# push
docker push localhost:5000/whoami:latest
```

## Một số chú ý nhỏ

- Quy tắc đặt tên image khi push lên registry bắt buộc là: `<registry_hostname>/<image_path>:<tag>`, ở đây chúng ta có host trên local là `localhost:5000`.
- Chúng ta hoàn toàn có thể đổi lại port từ 5000 sang port khác khi chạy bằng docker. VD: `-p 8000:5000`, khi đó tên image sẽ là `localhost:8000/whoami`.
- Cần tạo volume để chứa registry data, thư mục mặc định là `/var/lib/registry`, bạn có thể tùy chỉnh thư mục khác, đổi storage driver để lưu trên Amazon S3... nhưng bài này mình sẽ bỏ qua phần này nhé. Mình sẽ dùng local filesystem.
- Registry có hỗ trợ setup sử dụng TLS trực tiếp thông qua environment như sau `-e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt -e REGISTRY_HTTP_TLS_KEY=/certs/domain.key`, tuy nhiên trong bài này mình sẽ setup TLS trên Reverse Proxy là Traefik luôn.

## Deploy Registry trên localhost với Traefik + Docker

Khi đã nắm được về cơ bản cách thức triển khai, bây giờ mình sẽ tiến hành host Docker Registry trên local; Sử dụng Traefik làm reverse proxy kết hợp self-signed certificate TLS mà bản thân Traefik đã tạo sẵn. Registry server của mình sẽ có URL là `https://r.omd.lc`. :wink:

### Setup Traefik

Khi có thiết lập router có `tls=true` mà mình chưa có chỉ cài đặt certificate thì Traefik sẽ tự generate selfsigned cert giúp mình luôn. Trường hợp deploy lên production thì mình chuyển qua dùng docker swarm.

```yaml:traefik.yml
# docker-compose -f traefik.yml up -d
version: '3.5'

services:
  traefik:
    image: traefik:v2.2
    command:
      - --log.level=DEBUG
      - --api.dashboard=true
      - --entrypoints.websecure.address=:443
      - --providers.docker
      - --providers.docker.watch=true
      - --providers.docker.exposedByDefault=false
    ports:
      - 443:443
    volumes:
      -  /var/run/docker.sock:/var/run/docker.sock:ro
    labels:
      - traefik.enable=true
      - traefik.http.routers.traefik.entrypoints=websecure
      - traefik.http.routers.traefik.rule=Host(`traefik.omd.lc`)
      - traefik.http.routers.traefik.service=api@internal
      - traefik.http.routers.traefik.tls=true
```

Sau khi chạy, chúng ta hoàn toàn có thể truy cập dashboard của Traefik tại https://traefik.omd.lc :)

![](https://images.viblo.asia/49be362c-e488-423a-a4d5-e3356a0fbdfe.png)


### Setup Private Docker Registry

Mình sẽ chuyển đổi câu lệnh docker cài đặt docker registry ở trên thành `docker-compose` và tích hợp với Traefik như sau:

```yaml:registry.yml
# docker-compose -f registry.yml up -d
version: '3.5'

volumes:
  registry_data:

services:
  registry:
    image: registry:2
    volumes:
      - registry_data:/var/lib/registry
    labels:
      - traefik.enable=true
      - traefik.http.routers.docker-registry.entrypoints=websecure
      - traefik.http.routers.docker-registry.rule=Host(`r.omd.lc`)
      - traefik.http.routers.docker-registry.tls=true
      - traefik.http.services.docker-registry.loadbalancer.server.port=5000
```

Trong đó, docker registry host bây giờ sẽ là `https://r.omd.lc`, docker registry server sẽ đứng sau reverse-proxy là Traefik. Traefik sẽ forward các request từ port `:443` vào đúng container của docker registry. Mình thử push lại image lên registry này.

```bash
# rename image:
docker tag containous/whoami:latest r.omd.lc/webee/whoami:latest

# push to registry:
docker push r.omd.lc/webee/whoami:latest

The push refers to repository [r.omd.lc/webee/whoami]
d39a8d45d503: Layer already exists
ef02b53d2c9c: Layer already exists
dc788139f06c: Layer already exists
latest: digest: sha256:e6d0a6d995c167bd339fa8b9bb2f585acd9a6e505a6b3fb6afb5fcbd52bbefb8 size: 948
```

Successfully, vậy là chúng ta đã host thành công Docker Registry trên localhost. Nhưng bạn có thấy có gì sai sai chưa??? Hình như chúng ta đang host Private Docker Registry nhưng ai cũng có quyền push image vào Registry này luôn :laughing: (^^;) Giờ hãy chuyển qua phần tiếp theo nhé!

## Basic Authentication

Với việc cần private registry, cách đơn giản nhất là chúng ta setup basic authentication. Mình sẽ thêm hai tài khoản basic auth làm mẫu với username / password như sau:

- user1 / secret
- user2 / secret

Generate credentials với `htpasswd`, lưu ý, các bạn không dùng tool hay các trang trên mạng để generate basic auth credential nhé. Làm như vậy sẽ chính là giúp phong phú thêm bộ từ điển cho các hacker mà thôi. Hãy dùng `htpasswd` đơn giản như sau:

```bash
htpasswd -nb username password

# generate for user1
htpasswd -nb user1 secret
user1:$apr1$t5s4HR.O$L5ZSZZEsWyAAF6/1icD4n0

# generate for user2
htpasswd -nb user2 secret
user2:$apr1$nEZFU0QX$aRtaFM8IVIIer93KpQ/Qm1
```

Thiết lập basic auth với Traefik bằng cách thêm 2 labels sau cho `registry.yml`:

```yml:registry.yml
services:
  registry:
    labels:
      - ...
      - traefik.http.middlewares.private-service.basicauth.users=user1:$$apr1$$t5s4HR.O$$L5ZSZZEsWyAAF6/1icD4n0,user2:$$apr1$$nEZFU0QX$$aRtaFM8IVIIer93KpQ/Qm1
      - traefik.http.routers.docker-registry.middlewares=private-service
```

> Khi thêm basic auth credential token vào file yaml, các dấu `$` sẽ cần escaped lại thành `$$` cho đúng cú pháp

Bump!!! Bây giờ chúng ta thử push lại xem docker registry còn ở trạng thái public nữa không nhé!

```bash
# push to registry:
docker push r.omd.lc/webee/whoami:latest

# got error because we are guest
The push refers to repository [r.omd.lc/webee/whoami]
d39a8d45d503: Preparing
ef02b53d2c9c: Preparing
dc788139f06c: Preparing
no basic auth credentials

# login to registry:
docker login r.omd.lc -u user1 -p secret
WARNING! Using --password via the CLI is insecure. Use --password-stdin.
Login Succeeded

# re-push to registry:
docker push r.omd.lc/webee/whoami:latest
# successfully:
The push refers to repository [r.omd.lc/webee/whoami]
d39a8d45d503: Layer already exists
ef02b53d2c9c: Layer already exists
dc788139f06c: Layer already exists
latest: digest: sha256:e6d0a6d995c167bd339fa8b9bb2f585acd9a6e505a6b3fb6afb5fcbd52bbefb8 size: 948
```

Ngon rồi! ^^ Ngoài việc setup basic auth bằng Traefik thì còn một cách khác đó là setup trực tiếp cho Docker Registry bằng cách thêm environment:
```yaml:registry.yml
services:
  registry:
    labels:
       - ...
    environment:
      REGISTRY_AUTH: htpasswd
      REGISTRY_AUTH_HTPASSWD_REALM: Registry Realm
      REGISTRY_AUTH_HTPASSWD_PATH: /auth/htpasswd
    volumes:
      - ./auth:/auth
```

Nhìn chung với cách dùng basic auth như thì basic auth đã đóng vai trò như là access token giống các hệ thống registry khác, các bạn hoàn toàn có thể dùng để setup trong CI/CD trước khi push image lên registry với ưu điểm là setup đơn giản và nhanh gọn. Tuy nhiên nó cũng có hai nhược điểm rất lớn đó là:

- Chưa có sự phần quyền giữa các tài khoản - user1 có thể push một image (trùng tên) đè lên một image đã tồn tại của user2; hoặc user1 pull được các image của bất kỳ tài khoản nào khác về local.
- Không linh động trong việc quản lý tài khoản, đổi mật khẩu phải sửa lại config basic auth của server => Số user càng nhiều càng tốn effort
- Khó scale trong việc xây dựng GUI để quản lý

Do vậy, chúng ta sẽ cần một giải pháp khác lý tưởng hơn.

## Registry Token Authorization (OAuth2)

Một giải pháp linh động và tuyệt vời hơn đó là chúng ta sẽ xây dựng thêm một service độc lập với Registry server, đảm nhận cả hai trọng trách gồm:
- Authentication:  Xác minh danh tính của bạn
- Authorization: Xác nhận bạn có quyền truy cập resource hay không

Đáng tiếc, cái service này nó lại không được cung cấp sẵn bởi Docker :cry: nên chúng ta cần phải tự build theo các đặc tả về workflow đã được quy định.

### Docker Registry Workflow

Mình nhấn mạnh là một chút, bài viết này nói về Registry v2 chứ không phải Registry v1 nha. Workflow này cũng là của Registry v2. Do giải pháp này khá dài và phức tạp hơn nên trong phạm vi bài viết này, chúng ta sẽ cùng nghiên cứu về cách thức hoạt động của Authorization service và chúng ta sẽ cùng implement trong bài tiếp theo. Bây giờ, hãy cùng xem qua đặc tả về workflow nhé:

![](https://docs.docker.com/registry/spec/images/v2-registry-auth.png)

1. Docker client gửi yêu cầu thực hiện pull / push tới Registry
2. Nếu Registry yêu cầu authentication thì nó sẽ trả lại HTTP response với status `401 - Unauthorized` kèm thông tin về cách để thực hiện authenticate.
3. Client sẽ thực hiện tạo request tới authorization service để yêu cầu `Bearer token`.
4. Authorization service trả về `Bearer token` để thể hiện client có quyền truy cập tài nguyên.
5. Client thử gửi lại yêu cầu pull / push trước đó tới Registry kèm `Bearer token` được chèn vào trong Authorization header của request.
6. Registry thực hiện authorize cho client bằng cách kiểm tra `Bearer token` lấy ra `claim` đối chiếu. Quá trình pull/push sẽ bắt đầu như bình thường.

> Docker Client hay Docker Registry Client được include trong Docker Engine. Từ Docker v1.11, Docker engine support cả Basic Auth và cả OAuth2. Còn từ bản Docker v1.10 trở về trước thì Docker engine chỉ support dùng Basic Auth mà thôi.

Tóm lược lại thì chúng ta sẽ có 3 đối tượng chính sẽ được đề cập xuyên suốt gồm:
- Docker Regsitry Client `(Docker engine trên máy client)`
- Registry Server `(regsitry:2)` => `https://registry.docker.io`
- Token Server `(authorization service)` => `https://auth.docker.io`

### Cách authenticate

Như workflow ở trên, ngay khi Registry server nhận được request, **nếu server yêu cầu authentication** đối với request đó (tùy thuộc vào chính sách của service: chẳng hạn private repository thì sẽ required, public repository thì không cần...) thì nó sẽ return lại HTTP response là `401 - Unauthorized` và kèm theo header `WWW-Authenticate` chứa các thông tin mô tả về cách để authenticate.

Mình xin trích lược lại ví dụ từ documentation của Docker. Thí dụ, mình (có username là `jlhawn`) thực hiện push một image tới repository `samalba/my-app`. Đầu tiên, registry server sẽ return một response có mẫu như sau:

```bash
HTTP/1.1 401 Unauthorized
Content-Type: application/json; charset=utf-8
Docker-Distribution-Api-Version: registry/2.0
Www-Authenticate: Bearer realm="https://auth.docker.io/token",service="registry.docker.io",scope="repository:samalba/my-app:pull,push"
Date: Thu, 10 Sep 2015 19:32:31 GMT
Content-Length: 235
Strict-Transport-Security: max-age=31536000

{"errors":[{"code":"UNAUTHORIZED","message":"access to the requested resource is not authorized","detail":[{"Type":"repository","Name":"samalba/my-app","Action":"pull"},{"Type":"repository","Name":"samalba/my-app","Action":"push"}]}]}
```

Để ý cái đoạn header này:

```bash
Www-Authenticate: Bearer realm="https://auth.docker.io/token",service="registry.docker.io",scope="repository:samalba/my-app:pull,push"
```

Cả tên header và nội dung của nó đều được tuân thủ theo tài liệu đặc tả về cách sử dụng `Bearer Token` tại [Section 3 of RFC 6750: The OAuth 2.0 Authorization Framework: Bearer Token Usage](https://tools.ietf.org/html/rfc6750#section-3).

Theo đó, khi nhận xuất hiện header `WWW-Authenticate` trong response tức là server đã thách thức client phải có được một `Bearer token` và gửi nó theo trong mỗi request tới Registry server để có thể truy cập tài nguyên. Server cũng đưa ra chỉ dẫn rằng Client cần phải tạo một request `GET` tới URL `https://auth.docker.io/token` với yêu cầu truy cập service `regsitry.docker.io` để sử dụng repository `samalba/my-app` với quyền `pull` và `push`.

=> Đây chính là `auth challenge` mà các bạn sẽ thấy được đề cập trong tài liệu đặc tả RFC 6750 ở trên.

### Request lấy Bearer token

Ví dụ về request lấy `Bearer token` sẽ được thể hiện dưới đây, về query params khi request lấy bearer token và các field trong response các bạn hãy đọc thêm tại mục [Requesting A Token: Token Authentication Specification | Docker Documentation](https://docs.docker.com/registry/spec/auth/token/#requesting-a-token):

```bash
GET https://auth.docker.io/token?service=registry.docker.io&scope=repository:samalba/my-app:pull,push
```

Token Server sẽ trả về response với nội dung chính:
- `token`: Chính là bearer token mà client sẽ nhúng vào các request sau này qua header `Authorization`
- `access_token`: Cũng chính là bearer token ở trên, nó được cấp thêm dưới tên `access_token` để tương thích với OAuth2. Một trong hai field này là bắt buộc phải có. Hoặc có cả hai nhưng chúng nên giống nhau.
- Và một số field khác phụ nữa...

Dưới đây là mẫu ví dụ về Response mà chúng ta cần implement khi authenticate thành công:

```bash
HTTP/1.1 200 OK
Content-Type: application/json

{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IlBZWU86VEVXVTpWN0pIOjI2SlY6QVFUWjpMSkMzOlNYVko6WEdIQTozNEYyOjJMQVE6WlJNSzpaN1E2In0.eyJpc3MiOiJhdXRoLmRvY2tlci5jb20iLCJzdWIiOiJqbGhhd24iLCJhdWQiOiJyZWdpc3RyeS5kb2NrZXIuY29tIiwiZXhwIjoxNDE1Mzg3MzE1LCJuYmYiOjE0MTUzODcwMTUsImlhdCI6MTQxNTM4NzAxNSwianRpIjoidFlKQ08xYzZjbnl5N2tBbjBjN3JLUGdiVjFIMWJGd3MiLCJhY2Nlc3MiOlt7InR5cGUiOiJyZXBvc2l0b3J5IiwibmFtZSI6InNhbWFsYmEvbXktYXBwIiwiYWN0aW9ucyI6WyJwdXNoIl19XX0.QhflHPfbd6eVF4lM9bwYpFZIV0PfikbyXuLx959ykRTBpe3CYnzs6YBK8FToVb5R47920PVLrh8zuLzdCr9t3w",
  "expires_in": 3600,
  "issued_at": "2009-11-10T23:00:00Z" #RFC3339
}
```

Nếu authenticate không thành công, Token Server sẽ cần response `401 - Unauthorized` để thể hiện rằng `credentials` không hợp lệ. Còn trong trường hợp authenticate thành công, Token Server sẽ cần check tiếp ACL (Access Control List) dựa theo scope của request. Như trong ví dụ này, sau khi được xác thực rằng client chính là user `jlhawn`, Token Server sẽ cần kiểm tra tiếp coi với user `jlhawn` thì có quyền pull / push trong repository `samalba/my-app` được lưu trữ tại registry server `registry.docker.io`.

Theo như tài liệu của Docker thì trong bước này, Token Server sẽ xác định danh sách các quyền hợp lệ trong scope, nếu trong scope của request không có quyền nào là hợp lệ hoặc ít hơn thì nó cũng không được coi là lỗi. Thay vào đó, token server sẽ tạo xác định được một danh sách rỗng hoặc ít hơn so với scope. Sau đó dựa vào tập các quyền này để tạo ra `token` rồi trả về cho Registry Client.

### Sử dụng Bearer token

Bây giờ, trong mỗi request tiếp theo tới Registry server, client chỉ cần nhúng token vào header như sau để có thể truy cập tài nguyên:

```bash
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IkJWM0Q6MkFWWjpVQjVaOktJQVA6SU5QTDo1RU42Ok40SjQ6Nk1XTzpEUktFOkJWUUs6M0ZKTDpQT1RMIn0.eyJpc3MiOiJhdXRoLmRvY2tlci5jb20iLCJzdWIiOiJCQ0NZOk9VNlo6UUVKNTpXTjJDOjJBVkM6WTdZRDpBM0xZOjQ1VVc6NE9HRDpLQUxMOkNOSjU6NUlVTCIsImF1ZCI6InJlZ2lzdHJ5LmRvY2tlci5jb20iLCJleHAiOjE0MTUzODczMTUsIm5iZiI6MTQxNTM4NzAxNSwiaWF0IjoxNDE1Mzg3MDE1LCJqdGkiOiJ0WUpDTzFjNmNueXk3a0FuMGM3cktQZ2JWMUgxYkZ3cyIsInNjb3BlIjoiamxoYXduOnJlcG9zaXRvcnk6c2FtYWxiYS9teS1hcHA6cHVzaCxwdWxsIGpsaGF3bjpuYW1lc3BhY2U6c2FtYWxiYTpwdWxsIn0.Y3zZSwaZPqy4y9oRBVRImZyv3m_S9XDHF1tWwN7mL52C_IiA73SJkWVNsvNqpJIn5h7A2F8biv_S2ppQ1lgkbw
```

Tất nhiên, Registry server sẽ cần có cơ chế để decrypt bearer token và lấy ra claims set và verify token có hợp lệ hay không. :)

## References

Cuối cùng, nếu bạn thấy bài viết này hay và hữu ích, cho mình 1 upvote, 1 comment, 1 clip, 1 follow :laughing:  để cho mình chút động lực để ra bài tiếp theo vẫn về chuyên mục này trên Viblo nhé. Đó là cách xây dựng Token Server để sử dụng cho Private Docker Registry nhé. Còn nếu bạn thấy bài này xàm xí thì cứ mạnh dạn downvote nhé. Tổng kết lại thì bài viết này của mình cũng đã chỉ ra cho bạn:
- Cách setup Private Docker Registry với Traefik
- Cách authenticate cho Registry sử dụng Basic Auth với Traefik
- Giới thiệu tới được tới mọi người về workflow để tạo ra Token Server nhằm khắc phục các nhược điểm của việc sử dụng Basic Auth

Các bạn có thể tham khảo thêm các tài liệu về Docker Registry và Traefik tại đây:
- https://docs.traefik.io/
- https://docs.docker.com/registry/
- https://docs.docker.com/registry/deploying/
- https://letsencrypt.org/docs/certificates-for-localhost/
- https://docs.docker.com/registry/spec/auth/token/

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***
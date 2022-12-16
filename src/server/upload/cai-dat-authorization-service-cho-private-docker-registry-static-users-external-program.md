Ở phần trước, mình đã trình bày các bước để anh em Viblo có thể tự cài đặt Private Docker Registry cho dự án, đồng thời thiết lập Basic Authentication cho Registry Server. Khi đó, chúng ta đã có thể login vào Registry bằng chính tài khoản Basic Auth và sau đó thực hiện được các thao tác như push/pull image mà chưa có cơ chế ACL nào cả. Bài này chúng ta hãy cùng tiếp tục bổ sung cơ chế ACL cho Registry server nhé. :wink: 

## Giới thiệu chung

![](https://docs.docker.com/registry/spec/images/v2-registry-auth.png)

Ôn lại một chút về kiến thức đã giới thiệu trong bài trước, việc sử dụng Basic Auth giúp chúng ta nhanh chóng setup được Private Docker Registry nhưng nó có nhiều hạn chế như: tài khoản bị gắn liền với cấu hình Reverse Proxy, không có ACL.. do đó giải pháp của chúng ta là sẽ xây dựng thêm một service nữa đó là Authorization Service, kiêm nhiệm cả chức năng authentication và authorization. Nếu bạn chưa đọc bài trước thì hãy dừng lại và dành ít phút để nắm được cơ chế hoạt động của service này trước khi tiếp tục nhé.

Sau khi research thì mình phát hiện ra có một Opensource khá xịn xò đã thực hiện xây dựng Authorization Service tương thích với Docker Registry V2 đó là [cesanta/docker_auth](https://github.com/cesanta/docker_auth) được cung cấp bởi  Cesanta Software Ltd và được viết bằng Go. Do đó chúng ta không cần phải đi *"phát minh lại chiếc bánh xe"* nữa.

Version mới nhất của *cesanta/docker_auth* hiện tại là 1.6.0 và có docker image được cung cấp sẵn trên Docker Hub. OSS này cung cấp khá nhiều các strategy như:
* Static list of users
* Google Sign-In (incl. Google for Work / GApps for domain)
* Github Sign-In
* LDAP bind
* MongoDB user collection
* External program

Bài viết này tiếp tục sử dụng Docker Compose + Traefik giống phần trước. Bây giờ, hãy cùng mình dựng Authorization Service với OSS trên và setup một vài strategy ở trên nhé. Hãy bắt đầu bằng *Static list of users*!

## Setup Registry Server

Đối với Registry Server, việc thực hiện setup bằng docker-compose vẫn giữ cấu hình tương tự như bài trước. Để Registry hoạt động với Token Authorization Service thì cần đảm bảo ba yêu cầu sau:
* Registry client có thể hiểu và thực hiện được Token Auth Challenge mà Registry đưa ra. (mình có mô tả ở phần trước)
* Authorization server có khả năng quản lý các quyền truy cập vào tài nguyên như repositories trong Docker Registry. Tức nó phải quản lý được các tài khoản trên hệ thống, quyền của từng tài khoản với từng docker image được lưu trong Docker Registry.
* Docker Registry có khả năng tin tưởng vào authorization server để ký các token mà client có thể dùng nó cho mục đích authorization và có khả năng xác minh xem các token đấy là dùng một lần hay dùng trong một khoảng thời gian đủ ngắn.

Trong đó, đối với yêu cầu thứ 3, chúng ta sẽ cần phải cung cấp bộ khóa public/secret key để dùng cho mục đích như sign token, verify. Tạo self-signed certificate bằng lệnh sau:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.pem
```

Mình sẽ tổ chức các thư mục như sau:

```bash
./
├── README.md
├── compose
│   ├── auth.yml
│   ├── registry.yml
│   └── traefik.yml
├── configs
│   └── static_auth.yml
└── ssl
        ├── server.key
        └── server.pem
```

Bây giờ, thay đổi một số config của `registry.yml`, thực hiện mount thư mục `ssl` vào container và loại bỏ config basic auth của Traefik trong `labels`. Nó sẽ trông như này:

```yaml:registry.yml
services:
  registry:
    image: registry:2
    volumes:
      - ../ssl:/etc/ssl
      - registry_data:/var/lib/registry
    environment:
      - REGISTRY_AUTH=token
      - REGISTRY_AUTH_TOKEN_REALM=https://auth.omd.lc/auth
      - REGISTRY_AUTH_TOKEN_SERVICE="OMD Registry"
      - REGISTRY_AUTH_TOKEN_ISSUER="OMD Auth Service"
      - REGISTRY_AUTH_TOKEN_ROOTCERTBUNDLE="/etc/ssl/server.pem"
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.docker-registry.entrypoints=websecure"
      - "traefik.http.routers.docker-registry.rule=Host(`r.omd.lc`)"
      - "traefik.http.routers.docker-registry.tls=true"
      - "traefik.http.services.docker-registry.loadbalancer.server.port=5000"
```

## Authorization Service

Setup authorization server bằng `docker-compose` với docker image `cesanta/docker_auth:1.6.0`. Mình sẽ dùng Traefik làm reverse proxy tới port `5001` trong container. Cấu hình đơn giản sẽ như sau:

```yaml:auth.yml
version: '3.5'

services:
  auth:
    image: cesanta/docker_auth:1.6.0
    volumes:
      - ../configs/static_auth.yml:/config/auth_config.yml
      - ../ssl:/etc/ssl
    labels:
      - traefik.enable=true
      - traefik.http.routers.docker-auth.entrypoints=websecure
      - traefik.http.routers.docker-auth.rule=Host(`auth.omd.lc`)
      - traefik.http.routers.docker-auth.tls=true
      - traefik.http.services.docker-auth.loadbalancer.server.port=5001
```

Như bạn thấy ở trên, mình sẽ cần bổ sung thêm file `../configs/simple_auth.yml` để config cho `docker_auth` nữa. File này được mount vào trong container tại `/config/auth_config.yml`.

## Static list of users

### Cài đặt Static Users kèm ACL

Đầu tiên, mình sẽ thử nghiệm thực hiện config với strategy là `Static list of users` - tức khai báo thông tin đăng nhập như username / password và các quyền mà account đó có trực tiếp trong file config. Nội dung sẽ như mẫu sau:

```yaml:configs/static_auth.yml
# auth:
#   token:
#     realm: "https://auth.omd.lc/auth"
#     service: "OMD Registry"
#     issuer: "OMD Auth Service"
#     rootcertbundle: "/etc/ssl/server.pem"

server:
  addr: ":5001"

token:
  issuer: "OMD Auth Service"
  expiration: 900
  certificate: "/etc/ssl/server.pem"
  key: "/etc/ssl/server.key"

users:
  # Password is specified as a BCrypt hash. Use `htpasswd -nB USERNAME` to generate.
  admin:
    password: "$2y$05$pBiTDxvJoLbbRkZDaGxU1uYK2MvlfjZdItrvmRghweAA22pEI2Wn." # secret
  test:
    password: "$2y$05$s2geDWvTsFtZbqF.nBJDxeLbKgbYA.vAvMB5dmtQtCiFg8vF9BLpm" # secret

acl:
  - match: {account: "admin"}
    actions: ["*"]
    comment: "Admin has full access to everything."
  - match: {account: "test"}
    actions: ["pull"]
    comment: "User \"test\" can pull stuff."
```

Trong đó:
- Phần comment ở đầu file chính là config của Docker Registry được mình note lại cho dễ đối chiếu thôi nên bạn cứ để comment như vậy nhé.
- Phần cài đặt `server:` sẽ chạy ở cổng `5001`
- `token:`: một số thông tin như: `issuer`, `certificate` cần trùng khớp với config của Docker Registry ở trên.
- `users:`: phần password generate tương tự Basic Auth bằng `htpasswd` nhưng được băm bẳng BCrypt
- `acl:`: sẽ là khai báo các phần quyền của account ương ứng. Ở đây chúng ta có thể *"match"* theo: account, ip, name, type, group, labels... Kết hợp dùng regular expression ví dụ như:
```yaml
- match: {account: "/^(.+)@test.com$/", name: "${account:1}/*"}
  actions: []
  comment: "Emit domain part of account to make it a correct repo name"
```

### Xem kết quả thu được

Các phần cài đặt mở rộng, [xem chi tiết tại đây](https://github.com/cesanta/docker_auth/blob/master/examples/reference.yml). Bây giờ, bạn chỉ dùng docker-compose để chạy các service lên và dùng thử.

```bash
docker-compose -f compose/traefik.yml -f compose/registry.yml -f compose/auth.yml up -d
```

```bash
~/k/registry-server *master> docker ps
CONTAINER ID        IMAGE                       COMMAND                  CREATED             STATUS              PORTS                                      NAMES
70179475f1f4        cesanta/docker_auth:1.6.0   "/docker_auth/auth_s…"   2 hours ago         Up 2 hours          5001/tcp                                   compose_auth_1
40d08b4607d7        registry:2                  "/entrypoint.sh /etc…"   2 hours ago         Up 2 hours          5000/tcp                                   compose_registry_1
d1d4fc899810        traefik:v2.2                "/entrypoint.sh --lo…"   7 hours ago         Up 3 hours          0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp   compose_traefik_1
```

Thực hiện logout rồi login trở lại để test thử:
```bash
~/k/registry-server *master> docker logout r.omd.lc
Removing login credentials for r.omd.lc
```

- Không thể push/pull image khi chưa đăng nhập:
```bash
~/k/registry-server *master> docker push r.omd.lc/webee/whoami:latest
The push refers to repository [r.omd.lc/webee/whoami]
d39a8d45d503: Preparing
ef02b53d2c9c: Preparing
dc788139f06c: Preparing
unauthorized: authentication required

~/k/registry-server *master> docker pull r.omd.lc/webee/whoami:latest
Error response from daemon: Get https://r.omd.lc/v2/webee/whoami/manifests/latest: unauthorized: authentication required
```

- Đăng nhập tài khoản `admin` có thể push/pull:
```bash
~/k/registry-server *master> docker login r.omd.lc -u admin -p secret
WARNING! Using --password via the CLI is insecure. Use --password-stdin.
Login Succeeded

~/k/registry-server *master> docker pull r.omd.lc/webee/whoami:latest
latest: Pulling from webee/whoami
Digest: sha256:e6d0a6d995c167bd339fa8b9bb2f585acd9a6e505a6b3fb6afb5fcbd52bbefb8
Status: Image is up to date for r.omd.lc/webee/whoami:latest
r.omd.lc/webee/whoami:latest

~/k/registry-server *master> docker push r.omd.lc/webee/whoami:latest
The push refers to repository [r.omd.lc/webee/whoami]
d39a8d45d503: Layer already exists
ef02b53d2c9c: Layer already exists
dc788139f06c: Layer already exists
latest: digest: sha256:e6d0a6d995c167bd339fa8b9bb2f585acd9a6e505a6b3fb6afb5fcbd52bbefb8 size: 948
```

- Đăng nhập tài khoản `test` chỉ có thể pull mà không push được image:
```bash
~/k/registry-server *master> docker login r.omd.lc -u test -p secret
WARNING! Using --password via the CLI is insecure. Use --password-stdin.
Login Succeeded

~/k/registry-server *master> docker pull r.omd.lc/webee/whoami:latest
latest: Pulling from webee/whoami
Digest: sha256:e6d0a6d995c167bd339fa8b9bb2f585acd9a6e505a6b3fb6afb5fcbd52bbefb8
Status: Image is up to date for r.omd.lc/webee/whoami:latest
r.omd.lc/webee/whoami:latest

~/k/registry-server *master> docker push r.omd.lc/webee/whoami:latest
The push refers to repository [r.omd.lc/webee/whoami]
d39a8d45d503: Layer already exists
ef02b53d2c9c: Layer already exists
dc788139f06c: Layer already exists
errors:
denied: requested access to the resource is denied
unauthorized: authentication required
```

## External Program

### Cài đặt External Program

Chúng ta đã thử tích hợp Registry 2 với Authorization Service bằng strategy "Static list of users" ở trên, bây giờ cùng chuyển qua stategy khác đơn giản hơn, nhỏ mà có võ nhé, đó là *External Programs* - Đó là chạy một script (CLI tool) do chúng ta tự viết. Trong đó, file config sẽ chia làm hai mục bao gồm:
- `ext_auth`: => chương trình thực hiện authentication. Username, password sẽ truyền vào qua stdin, dựa vào exit code tương ứng để xác định kết quả authentication. 0 - được phép, 1 - bị cấm, 2 - tài khoản không khớp, other - lỗi. Nếu output thì hệ thống sẽ tự parse nó về JSON object. Nếu trong object có `labels` thì nó sẽ được chạy tiếp qua `ext_authz`.
- `ext_authz`: => chương trình thực hiện authorization khi cần. Căn cứ exit code tương tự như với `ext_auth` ở trên.

Giả sử một script login như sau:

```sh:configs/ext_auth.sh
#!/bin/sh

read u p

if [ "$u" == "admin" -a "$p" == "secret" ]; then
  exit 0
fi

if [ "$u" == "test" -a "$p" == "secret" ]; then
  exit 0
fi

exit 1
```

Bây giờ, cấu hình docker-compose sẽ cần sửa đổi lại chút, chúng ta cần mount *external program* vào trong container như sau:

```yaml:configs/ext_auth.yml
# auth:
#   token:
#     realm: "https://auth.omd.lc/auth"
#     service: "OMD Registry"
#     issuer: "OMD Auth Service"
#     rootcertbundle: "/etc/ssl/server.pem"

server:
  addr: ":5001"

token:
  issuer: "OMD Auth Service"
  expiration: 900
  certificate: "/etc/ssl/server.pem"
  key: "/etc/ssl/server.key"

acl:
  - match: {account: "admin"}
    actions: ["*"]
    comment: "Admin has full access to everything."
  - match: {account: "test"}
    actions: ["pull"]
    comment: "User \"test\" can pull stuff."

ext_auth:
  command: "/usr/local/bin/my_auth"
```

```yaml:auth.yml
services:
  auth:
    image: cesanta/docker_auth:1.6.0
    volumes:
      - ../ssl:/etc/ssl
      # - ../configs/static_auth.yml:/config/auth_config.yml
      - ../configs/ext_auth.yml:/config/auth_config.yml
      - ../configs/ext_auth.sh:/usr/local/bin/my_auth
```

### Xem kết quả

Hệ thống vẫn hoạt động như mong đợi.

```bash
~/k/registry-server *master> docker pull r.omd.lc/webee/whoami:latest
latest: Pulling from webee/whoami
Digest: sha256:e6d0a6d995c167bd339fa8b9bb2f585acd9a6e505a6b3fb6afb5fcbd52bbefb8
Status: Image is up to date for r.omd.lc/webee/whoami:latest
r.omd.lc/webee/whoami:latest

~/k/registry-server *master> docker push r.omd.lc/webee/whoami:latest
The push refers to repository [r.omd.lc/webee/whoami]
d39a8d45d503: Layer already exists
ef02b53d2c9c: Layer already exists
dc788139f06c: Layer already exists
errors:
denied: requested access to the resource is denied
unauthorized: authentication required 
```

## Tổng kết

Trong bài viết hôm nay, mình đã chia sẻ cách setup Authorization Service đơn giản cho Private Docker Registry bằng 2 strategy:
- Static list of users
- External Program

Cùng với đó là cách cài đặt phân quyền cho các tài khoản trên hệ thống. Phần tiếp theo, mình sẽ chia sẻ cách implement strategy MongoDB. Mời các bạn cùng đón đọc. Nếu bạn thấy nội dung này hay, đừng quên upvote và follow mình để nhận thông báo về phần tiếp theo nhé!

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***
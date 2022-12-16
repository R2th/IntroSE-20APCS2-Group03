Mọi người chắc đều đã quá quen thuộc với các Git host như GitHub, GitLab hay Bitbucket rồi. Nhưng bạn đã từng thử nghĩ đến việc tự mình host Git repository chưa. Để làm gì thì...có thể bạn thuộc team Microsoft haters và không hề vui với thương vụ GitHub chẳng hạn. Hay là bạn thuộc team muốn self-host tất cả mọi thứ vì không muốn dữ liệu của mình nằm trong tay kẻ khác. Hoặc bạn là 1 team dev nhỏ muốn tự host Git repository nhưng GitLab lại quá cồng kềnh và quá nặng, setup và quản lí lại quá mất thời gian. Hay thậm chí là bạn muốn host trên Raspberry Pi. Vậy bạn hãy thử qua [Gitea](https://gitea.io) xem. Nó là 1 clone của GitHub, một clone siêu nhẹ (chỉ hơn 70MB) mà setup lại mất chưa đến 10 phút.

## Requirements

Chẳng có requirement nào cả, chỉ cần bạn có 1 cái máy tính là được. Như đã nói từ trước thì Gitea siêu nhẹ nên cũng không cần máy tính siêu khủng. Dù CI chạy cũng sẽ tốn kha khá power nhưng mà mình chạy trên Raspberry Pi của mình vẫn OK. Ngoài ra thì mình sẽ dùng docker để setup cho dễ nên cũng cần có Docker và Docker Compose nữa.

## Setup Gitea

Slogan của Gitea là "A painless self-hosted Git service" nên bạn có thể yên tâm setup Gitea là siêu dễ luôn.

Gitea có cung cấp docker image nên mình sẽ dùng luôn thôi. Ofifical docker image là cái [này](https://hub.docker.com/r/gitea/gitea/). Trong link đó bạn có thể thấy là có sẵn cả mẫu file `docker-compose.yml` luôn. File trong đó là hướng dẫn setup với MariaDB/MySQL rồi nên mình sẽ dùng PostgreSQL nhé. File `docker-compose.yml` sẽ như thế này.

```yaml
version: '3.7'

services:
  server:
  image: gitea/gitea
  restart: always
  ports:
    - "80:3000"
    - "10022:22"
  environment:
    - RUN_MODE=prod
    - DB_TYPE=postgres
    - DB_HOST=postgres:5432
    - DB_NAME=gitea
    - DB_USER=gitea
    - DB_PASSWD=secret
    - SSH_PORT=10022
  volumes:
    - data:/data

  postgres:
    image: postgres
    restart: always
    volumes:
      - postgres:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=gitea
      - POSTGRES_USER=gitea
      - POSTGRES_PASSWORD=secret

volumes:
  data:
  postgres:
```

Thế là xong rồi, giờ bạn chạy

```sh
docker-compose up -d
```

Rồi vào `localhost` hoặc là IP/domain của server là sẽ thấy Gitea.

![](https://images.viblo.asia/2aa855ce-9e6d-482d-96a6-ae3c4bb748bd.png)

Lần đầu tiên chạy, nếu bạn click vào 1 link bất kì thì nó sẽ redirect đến trang `/install` để setup những thứ cần thiết.

![](https://images.viblo.asia/bdf0901d-1cdf-40f5-ac7f-467fce5bad3f.png)

Một vài thứ mà bạn nên quan tâm đến là

- *Disable Self-registration*: vì bạn đang muốn tự host Git repository nên hẳn là bạn chỉ muốn dùng cho mình hoặc là team của mình thôi. Và tất nhiên là không cho phép người ngoài vào đăng ký rồi. Vậy nên nhớ check cái này.
- *Admin username and password*: khi bạn đã check cái trên thì cái này sẽ bắt buộc phải điền vì chỉ có tài khoản admin mới tạo được user mới thôi.
- *Application URL*: Cái này sẽ quyết định URL mà bạn dùng để clone/push repository nên nhớ set cái này.
- *SSH port*: Default thì cái này là 22, nhưng hẳn là bạn không muốn nó dùng port 22 rồi, vì như thế thì làm sao mà SSH vào server được nữa. Trong file `docker-compose.yml` ở trên thì mình đã set sẵn nó là 10022 rồi.

Okay, xong rồi thì bắt đầu dùng thôi. Bạn sẽ được tự động login vào tài khoản admin vừa tạo lúc nãy. UI của nó gần như giống hệt GitHub nên bạn sẽ chẳng cần mất nhiều thời gian làm quen. Hãy vào tạo thử một repository và push code lên xem.

## Running behind reverse proxy

Ở phần trên thì mình đã để Gitea publish hẳn ra port 80. Dùng luôn thì cũng chẳng sao, nhưng nếu đã setup nó trên server thì hẳn là bạn sẽ không muốn như thế. Vì có thể bạn còn muốn setup nhiều thứ khác nữa, Drone chẳng hạn, rồi cả SSL nữa.

Bạn có thể dùng Apache hoặc là Nginx. Mình sẽ dùng Traefik, vì gần như không cần config gì hết. Bạn có thể đọc thêm về traefik ở [đây](https://viblo.asia/p/tong-quan-ve-traefik-XL6lAA8Dlek). File `docker-compose.yml` của mình sẽ sửa thành thế này.

```yaml
version: '3.7'

services:
  traefik:
    image: traefik:1.7
    restart: always
    command:
      - --web
      - --docker
      - --docker.watch=true
      - --docker.exposedbydefault=false
    ports:
      - "80:80"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock

  server:
    image: gitea/gitea
    restart: always
    environment:
      - RUN_MODE=prod
      - DB_TYPE=postgres
      - DB_HOST=postgres:5432
      - DB_NAME=gitea
      - DB_USER=gitea
      - DB_PASSWD=secret
      - SSH_PORT=10022
      - DISABLE_REGISTRATION=true
    ports:
      - "10022:22"
    volumes:
      - data:/data
    labels:
      - traefik.enable=true
      - traefik.port=3000
      - traefik.frontend.rule=Host:${DOMAIN}

  postgres:
    image: postgres
    restart: always
    volumes:
      - postgres:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=gitea
      - POSTGRES_USER=gitea
      - POSTGRES_PASSWORD=secret

volumes:
  data:
  postgres:
```

Những gì mình cần thêm là service *traefik* và 3 cái label này.

```yaml
labels:
  - traefik.enable=true
  - traefik.port=3000
  - traefik.frontend.rule=Host:${DOMAIN}
```

`DOMAIN` chính là domain của Gitea. Bạn cần thêm 1 file `.env` để set cái `DOMAIN` này nữa

```raw
# .env
DOMAIN=gitea.yourdomain
```

Giờ chạy `docker-compose up -d` nữa là xong.

## Drone CI

Tất nhiên CI là một thứ không thể thiếu rồi. Và setup Drone CI cho Gitea cũng cực kì đơn giản. Chỉ cần thêm 2 service và volume cho drone như này là xong.

```yaml
services:
  drone:
    image: drone/drone
    volumes:
      - drone:/var/lib/drone/
    restart: always
    environment:
      - DRONE_OPEN=true
      - DRONE_HOST=http://drone:8000
      - DRONE_GITEA=true
      - DRONE_GITEA_URL=http://server:3000
      - DRONE_SECRET=secret
    labels:
      - traefik.enable=true
      - traefik.port=8000
      - traefik.frontend.rule=Host:${DRONE_DOMAIN}

  drone-agent:
    image: drone/agent
    command: agent
    restart: always
    depends_on:
      - drone
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - DRONE_SERVER=drone:9000
      - DRONE_SECRET=secret

volumes:
  drone:
```

`DRONE_DOMAIN` là domain của drone, bạn cần thêm nó vào file `.env` nữa.

```raw
# .env
DOMAIN=gitea.yourdomain
DRONE_DOMAIN=drone.gitea.yourdomain
```

Chạy `docker-compose up -d` và bạn sẽ vào được drone ở domain lúc nãy. Bạn có thể đăng nhập với tài khoản đã tạo với Gitea.

![](https://images.viblo.asia/11fbe975-f593-4660-9632-b991b81a45f0.png)

Hãy thử 1 project xem sao. Mình sẽ dùng example project [drone-with-go](https://github.com/drone-demos/drone-with-go) nhé. Đầu tiên là tạo 1 repository trên Gitea rồi vào Drone enable nó.

![](https://images.viblo.asia/ba4c2086-b003-42aa-9187-ceb194365cde.png)

Clone [drone-with-go](https://github.com/drone-demos/drone-with-go) trên GitHub về và push nó lên Gitea của bạn.

Qua drone xem kết quả thôi.

![](https://images.viblo.asia/cd564175-1548-4c0b-80d4-3963e7623704.png)

Vậy là chúng ta đã setup xong Gitea với Drone CI rồi. Code trong bài này các bạn có thể xem toàn bộ ở [đây](https://github.com/thphuong/gitea-setup) nhé.
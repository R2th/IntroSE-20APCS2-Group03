## Intro


Gần đây mình có đọc qua một report trên hackerone: [https://hackerone.com/reports/1130721](https://hackerone.com/reports/1130721 "https://hackerone.com/reports/1130721")

![](https://i.imgur.com/7scmfvI.png)

Một lỗi Pre-Auth NoSQL Injection dẫn đến RCE, critical 9.8 thì thực sự là nguy hiểm. Target ở đây là phần mềm chat open source [Rocket.Chat](https://rocket.chat/) (thường được dùng thay thế cho Slack, và được các team dùng nội bộ). Theo thống kê, Rocket.Chat đang có 12 triệu người dùng, và có 800,000 instances đang chạy. Report thì cực kỳ đầy đủ và chi tiết nhưng phần PoC thì đã bị remove mất nên mình quyết định thử dựng và reproduce lại bug xem như thế nào. Let's go!

Sonarsource có publish bài phân tích tại đây: https://blog.sonarsource.com/nosql-injections-in-rocket-chat/ (blog publish trước disclose report 1 ngày).

## Setup

Để setup môi trường thì có nhiều cách khác nhau, ở đây mình dùng docker cho nhanh. Tìm kiếm trên mạng thì đã có nhiều hướng dẫn ở [đây](https://kenfavors.com/code/how-to-install-rocketchat-on-ubuntu-16-04-using-docker-docker-compose/) và ở [đây](https://blog.ssdnodes.com/blog/tutorial-rocket-chat-docker/).

Môi trường mình dùng là Windows, docker chạy trong WSL2. Đầu tiên là tạo folder làm việc:

```
$ cd ~
$ mkdir rocket.chat && cd rocket.chat
```

Tạo file `docker-composer.yml` với nội dung như sau:

```yml
version: "2"

services:
  rocketchat:
    image: rocketchat/rocket.chat:3.12.1
    restart: unless-stopped
    volumes:
      - ./uploads:/app/uploads
    environment:
      - PORT=3000
      - ROOT_URL=http://localhost:3000
      - MONGO_URL=mongodb://mongo:27017/rocketchat
      - MONGO_OPLOG_URL=mongodb://mongo:27017/local
      - MAIL_URL=smtp://username:password@smtp.mailtrap.io:2525
    # Format: 'smtp://$user:$pass@smtl.gmail.com:587'
    #       - HTTP_PROXY=http://proxy.domain.com
    #       - HTTPS_PROXY=http://proxy.domain.com
    depends_on:
      - mongo
    ports:
      - 3000:3000
    labels:
      - "traefik.backend=rocketchat"
      - "traefik.frontend.rule=Host: your.domain.tld"

  mongo:
    image: mongo:3.4
    restart: unless-stopped
    volumes:
      - ./data/db:/data/db
      #- ./data/dump:/dump
    command: mongod --smallfiles --oplogSize 128 --replSet rs0
    labels:
      - "traefik.enable=false"

  # this container's job is just run the command to initialize the replica set.
  # it will run the command and remove himself (it will not stay running)
  mongo-init-replica:
    image: mongo:3.4
    command: 'mongo mongo/rocketchat --eval "rs.initiate({ _id: ''rs0'', members: [ { _id: 0, host: ''localhost:27017'' } ]})"'
    depends_on:
      - mongo

  # hubot, the popular chatbot (add the bot user first and change the password before starting this image)
  hubot:
    image: rocketchat/hubot-rocketchat:latest
    restart: unless-stopped
    environment:
      - ROCKETCHAT_URL=rocketchat:3000
      - ROCKETCHAT_ROOM=GENERAL
      - ROCKETCHAT_USER=bot
      - ROCKETCHAT_PASSWORD=botpassword
      - BOT_NAME=bot
      # you can add more scripts as you'd like here, they need to be installable by npm
      - EXTERNAL_SCRIPTS=hubot-help,hubot-seen,hubot-links,hubot-diagnostics
    depends_on:
      - rocketchat
    labels:
      - "traefik.enable=false"
    volumes:
      - ./scripts:/home/hubot/scripts
    # this is used to expose the hubot port for notifications on the host on port 3001, e.g. for hubot-jenkins-notifier
    ports:
      - 3001:8080

  #traefik:
  #  image: traefik:latest
  #  restart: unless-stopped
  #  command: traefik --docker --acme=true --acme.domains='your.domain.tld' --acme.email='your@email.tld' --acme.entrypoint=https --acme.storagefile=acme.json --defaultentrypoints=http --defaultentrypoints=https --entryPoints='Name:http Address::80 Redirect.EntryPoint:https' --entryPoints='Name:https Address::443 TLS.Certificates:'
  #  ports:
  #    - 80:80
  #    - 443:443
  #  volumes:
  #    - /var/run/docker.sock:/var/run/docker.sock
```

Ở đây mình đã chỉnh lại một số thông số như sau:

- Chỉnh image của `mongo` và `mongo-init-replica` thành `image: mongo:3.4` (tối thiểu phải là >= 3.4, lần đầu làm theo tut là 3.2 thì lỗi, lên 3.4 vẫn bị báo là deprecated, nhưng ko sao, vẫn chạy được)
- `ROOT_URL` để là `http://localhost:3000`
- Chỉnh image của `rocketchat` về `image: rocketchat/rocket.chat:3.12.1`, đây là phiên bản bị lỗi trong report.
- Để có thể nhận được mail reset password thì cần chỉnh lại `MAIL_URL`. Bạn có thể dùng [mailcatcher](https://mailcatcher.me/) (sẽ cần setup service mới) còn mình dùng [Mailtrap](https://mailtrap.io) thì sẽ có cấu hình dạng: `smtp://username:password@smtp.mailtrap.io:2525`

Ok, giờ chạy lần lượt các bước như hướng dẫn là xong:
```bash
$ docker-compose up -d mongo
```

```bash
$ docker-compose up -d mongo-init-replica
```

```
$ docker-compose up -d rocketchat
```

Kiểm tra bằng `docker ps`:
```
➜  rocket.chat docker ps
CONTAINER ID   IMAGE                           COMMAND                  CREATED        STATUS        PORTS                    NAMES
8fdf62f81c15   rocketchat/rocket.chat:3.12.1   "docker-entrypoint.s…"   19 hours ago   Up 19 hours   0.0.0.0:3000->3000/tcp   rocketchat_rocketchat_1
75ec1193369d   mongo:3.4                       "docker-entrypoint.s…"   20 hours ago   Up 19 hours   27017/tcp                rocketchat_mongo_1
```

hoặc extension của VSCode (nên dùng cái này, rất tiện)

![](https://i.imgur.com/U61zvCC.png)

thấy 2 container online là ok. Tiếp đến là vào [http://localhost:3000](http://localhost:3000) điền các thông tin của admin, instance, next next và next đến khi ra được cái màn hình này là xong phần setup 😂

![](https://i.imgur.com/ugvrmUg.png)

## Analysis

### NoSQL Injection #1
Bước đầu tiên để khai thác, attacker cần thực hiện request forgot password để sinh token tương ứng với user trong hệ thống. Vậy điều kiện ở đây là phải biết email của một user bất kỳ trong hệ thống. Ở đây mình sẽ request forgot password cho user admin (email là `admin@bugmail.cf`). Nhận được mail như sau trong Mailtrap:

![](https://i.imgur.com/7sMCpx5.png)

với link reset là: [http://localhost:3000/reset-password/OLIMrlPs75S_jNLWs5PQhiXF7ZW0_JzIj0SVuNrGupM](http://localhost:3000/reset-password/OLIMrlPs75S_jNLWs5PQhiXF7ZW0_JzIj0SVuNrGupM)

Tiếp theo, trong report có ghi:

> **Description:** The `getPasswordPolicy` method does not properly validate or sanitize the `token` parameter and can thus be used to perform a blind NoSQL injection. It can be called without authentication (which seems intended), e.g. by using the `/api/v1/method.callAnon` API endpoint

`method.callAnon` chính là các request không cần authenticate (pre-auth), VD như login request.

và chỗ đoạn code bị lỗi là ở [getPasswordPolicy.js:8](https://github.com/RocketChat/Rocket.Chat/blob/eba1e9b3146e5102baed000953c2cb51930c345c/server/methods/getPasswordPolicy.js#L8)

![](https://i.imgur.com/2T7Po3C.png)

Giờ ta cần tìm cách call API này. Filter `callAnon` trong Burp thấy ngay 1 cái request login như sau:

```
POST /api/v1/method.callAnon/login HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{"message":"{\"msg\":\"method\",\"method\":\"login\",\"params\":[{\"user\":{\"username\":\"admin\"},\"password\":{\"digest\":\"240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9\",\"algorithm\":\"sha-256\"}}],\"id\":\"125\"}"}
```

Thấy có matching tương ứng giữa tên method trên URL và trong body, ngoài ra có key `params` trong JSON body, phù hợp với code ở trên.

Theo như report, cần thêm vào key `token` ở `params`, và có dạng:

> Example: in order to check if the password reset token begins with a specific letter, e.g. `A`, the attacker would send the JSON object `{"$regex":"^A"}` as the `token` parameter

=> sử dụng kỹ thuật "guessing" + xóa các phần thừa, ta sửa thành:

```
POST /api/v1/method.callAnon/getPasswordPolicy HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{"message":"{\"msg\":\"method\",\"method\":\"getPasswordPolicy\",\"params\":[{\"token\":{\"$regex\":\"^A\"}}],\"id\":\"21\"}"}
```

Và request thử:

![](https://i.imgur.com/sYTcJFH.png)

OK, văng ra đúng lỗi `error-invalid-user` như trong code 👍. Giờ ta có thể chuyển sang Intruder và chạy thử (mode **Bruteforcer**, urlbase64 charset, và nhớ giảm số thread vì Rocket.Chat có rate-limited) để leak ra ký tự đúng đầu tiên, nhưng ở đây ta đã biết token rồi, để tiết kiệm thời gian và công sức, sửa lại tham số token thành `{"$regex":"^OLI"}` (tức là đã biết 3 ký tự đầu của token) và chạy lại với Burp để xác nhận:

![](https://i.imgur.com/PwV33x5.png)

Vậy là confirm là có token như vậy trong DB.

### NoSQL Injection #2

Nếu tại thời điểm đó, chỉ có 1 user (admin) thì ta có thể đảm bảo chắc chắn đó là token của admin (giống như môi trường trong docker hiện tại). Nhưng thực tế thì sẽ có rất nhiều token của nhiều user khác nhau, và ta không thể chắc chắn được. VD: đăng ký thêm user, rồi thực hiện request reset password của một user khác (user1), với đường link [http://localhost:3000/reset-password/Q2H3Ea0ff1fhz1esUhJ4lo6XvoPftqtnC_P61xBj6kJ](http://localhost:3000/reset-password/Q2H3Ea0ff1fhz1esUhJ4lo6XvoPftqtnC_P61xBj6kJ), sửa lại regex `{"$regex":"^Q2H"}` ta thấy lần này vẫn match:

![](https://i.imgur.com/c3416PC.png)

và đây là lúc ta cần dùng đến bug NoSQLi thứ 2. Bug này thì không thấy nói rõ trong report, mà ở trong bài blog của Sonarsource.

[app/api/server/v1/users.js](https://github.com/RocketChat/Rocket.Chat/blob/f2817c056f9c063dd5f596446ef2e6c61634233b/app/api/server/v1/users.js#L223-L246)

![](https://i.imgur.com/gvx9rp6.png)

Trong blog có ghi:

> The users.list API endpoint takes a query parameter from the URL which is then used to query the users collection. Documents in that collection contain fields that should not be accessible by everyone, which is why the query is filtered by using a blocklist that removes certain fields from the query and the result.

Để bypass việc này, các researcher ở Sonarsouce đã dùng `$where` để check, VD: username có phải là `admin` không, kết hợp thêm việc throw error để biến lỗi này từ bind SQLi thành not-bind 👏

Check document ở https://developer.rocket.chat/api/rest-api/query-and-fields-info, vào Burp chọn bừa 1 cái  request sau khi đã login bằng user thông thường (user1) và có cấu trúc ná ná  (mình chọn `http://localhost:3000/api/v1/roles.list`) rồi sửa:

![](https://i.imgur.com/S5WPo2O.png)

payload của ta là:

```json
{"$where": "this.username === 'admin' && (() => {throw JSON.stringify(this)})()}
```

để dump ra toàn bộ thông tin về user, trong đó có đi kèm với token dùng để reset password. Nếu có 2FA thì cũng lấy được secret luôn (theo mình hiểu là vậy 😂). Đến đây thì coi như là take over account admin thành công.

### Incoming WebHook to RCE
Trong report, tác giả có nói có nhiều cách để RCE nếu có quyền admin. Một trong các cách đó là thông qua **webhook**. Như các modern app khác, Rocket.chat cho phép tích hợp với các dịch vụ khác thông qua webhook. Theo tài liệu ở [đây](https://docs.rocket.chat/guides/administrator-guides/administration/integrations), có 2 loại:
1. **Incoming WebHook**: cho phép các bên khác request đến Rocket.Chat instance, và xử lý thông tin thu được trên server.
2. **Outgoing WebHook**: Rocket.Chat sẽ gửi request đến bên thứ ba khi có một sự kiện nhất định.

Để có thể RCE được thì chắc chắn ta phải dùng Incoming WebHook. Login và admin acc: *Administrations -> Intergrations -> New Incoming*

![](https://i.imgur.com/6nSiU0t.png)

Ta thấy ngay mục `Script Enabled` và `Script` dùng để điền code Javascript xử lý. Rocket.Chat sử dụng `vm` module để chạy code trong sandbox,  tuy nhiên bypass sandbox là khả thi (xem phần link tham khảo). Vì chạy docker không reverse shell ra ngoài được, mình chọn cách sửa để chạy code và trả về response. Tham khảo documents ở [đây](https://docs.rocket.chat/guides/administrator-guides/administration/integrations#script-details) ta viết thêm class Script như sau:

![](https://i.imgur.com/uEvouEJ.png)

Điền payload, thông tin,  chọn eables Script và enable webhook ở trên cùng, save lại ta sẽ có được 1 link webhook dạng: `http://localhost:3000/hooks/{webhook_id}/{webhook_token}`. Tạo request như dưới đây sẽ chạy cmd trên server và trả về kết quả:

![](https://i.imgur.com/GB4j0Th.png)

## End
Cập nhật ngay Rocket.Chat lên các phiên bản: **3.13.2, 3.12.4, 3.11.4** để vá lỗi nhé!

{@embed: https://www.youtube.com/watch?v=leuTzRVTICA}

## Refs
- https://hackerone.com/reports/
- https://docs.rocket.chat/guides/security/security-updates
- https://blog.sonarsource.com/nosql-injections-in-rocket-chat/
- https://tipi-hack.github.io/2019/04/14/breizh-jail-calc2.html
- https://pwnisher.gitlab.io/nodejs/sandbox/2019/02/21/sandboxing-nodejs-is-hard.html
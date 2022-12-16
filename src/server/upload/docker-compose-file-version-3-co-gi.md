Như đã hứa ở [bài trước](https://viblo.asia/p/ORNZqeEbZ0n), trong bài này, chúng ta sẽ cùng tìm hiểu về **Docker Compose**

**Docker Compose** là một công cụ giúp định nghĩa và run mutil-docker-container. Một compose sẽ được config bởi 1 file docker compose có định dạng `YAML`

Để có thể sử dụng Compose, chúng ta cần 3 bước:
- Định nghĩa 1 docker file
- Định nghĩa 1 docker compose file
- Run docker-compose

Trong [bài trước](https://viblo.asia/p/ORNZqeEbZ0n), mình đã đã viết cề docker file. Vậy nên, trong bài này, chúng ta sẽ cùng tìm hiểu về cách định nghĩa 1 docker compose file. Và bài tiếp theo, mình sẽ hẹn nhau tìm hiểu tiếp về compose command line nhé ;)

### 1. Versioning

Compose file là 1 file YAML, dùng để định nghĩa các services, networks và volumes cho Docker app. Docker compose hiện tại có 3 version, đó là:
- [ Version 1](https://docs.docker.com/compose/compose-file/compose-file-v1/)
- [Version 2](https://docs.docker.com/compose/compose-file/compose-file-v2/)
- [Version 3](https://docs.docker.com/compose/compose-file/)

Nếu bạn không khai báo version trong file, thì version mặc định sẽ là version 1. Ngược lại, nếu bạn khai báo v2 hoặc v3, bạn buộc phải khai báo version đầy đủ dạng '2.x' hoặc '3.x', kể cả trưởng hợp bạn dùng version có chỉ số phụ thấp nhất, thì bạn cũng phải viết đầy đủ là `2.0` hoặc `3.0`.

**Version 1 và 2.x**

Với version 1, bạn không thể khai báo volumes, networks và các build arguments.

Để chuyển version từ 1 lên 2.x, bạn chỉ cần
- Thêm khai báo version 2.x
- Thụt lề toàn bộ tệp theo một cấp và khai báo `services` ở đầu tệp.

Ngoài ra, với một số tính năng, bạn sẽ cần config phức tạp hơn
- dockerfile: key này phải được đặt trong `build`
    ```
    build:
      context: .
      dockerfile: Dockerfile-alternate
    ```
- log_driver, log_opt: các key này cần đặt trong `logging
    ```
    logging:
      driver: syslog
      options:
        syslog-address: "tcp://192.168.0.42:123"
    ```
- net: được đổi thành `network_mode`

**Version 2.x và 3.x**

Version 2 và 3 là các version nâng cấp, và version 3 hiện là version mới nhất của docker compose. Giữa các phiên bản 2.x và 3.x, cấu trúc của file compose là giống nhau, nhưng có một số tùy chọn đã bị loại bỏ:

- volume_driver: Thay vì khai báo trong services, hãy định nghĩa volume với top-level `volumes` và chỉ định driver.
    ```
    version: "2.4"
    services:
      web:
        image: nginx:alpine
        ports:
          - "80:80"
        volumes:
          - type: volume
            source: mydata
            target: /data
            volume:
              nocopy: true
    ```
    ```
    version: "3.9"
    services:
      db:
        image: postgres
        volumes:
          - data:/var/lib/postgresql/data
    volumes:
      data:
        driver: mydriver
    ```
- cpu_shares, cpu_quota, cpuset, mem_limit, memswap_limit: Chúng được thay thế bằng `resources` và được đặt trong key `deploy`. `deploy` và chỉ được sử dụng khi deploy, ngoài ra sẽ bị ignore.
- extends: Tùy chọn này không còn được sử dụng ở version: "3.x"
- group_add: Tùy chọn này không còn được sử dụng ở version: "3.x"
- pids_limit: Tùy chọn này chưa được định nghĩa ở version: "3.x"
- link_local_ips in networks: Tùy chọn này chưa được định nghĩa ở version: "3.x"

### 2. Cấu trúc compose file version 3

Dưới đây là 1 compose file ví dụ:

```
version: "3.9"
services:

  redis:
    image: redis:alpine
    ports:
      - "6379"
    networks:
      - frontend
    deploy:
      replicas: 2
      update_config:
        parallelism: 2
        delay: 10s
      restart_policy:
        condition: on-failure

  db:
    image: postgres:9.4
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - backend
    deploy:
      placement:
        max_replicas_per_node: 1
        constraints:
          - "node.role==manager"

  vote:
    image: dockersamples/examplevotingapp_vote:before
    ports:
      - "5000:80"
    networks:
      - frontend
    depends_on:
      - redis
    deploy:
      replicas: 2
      update_config:
        parallelism: 2
      restart_policy:
        condition: on-failure

  result:
    image: dockersamples/examplevotingapp_result:before
    ports:
      - "5001:80"
    networks:
      - backend
    depends_on:
      - db
    deploy:
      replicas: 1
      update_config:
        parallelism: 2
        delay: 10s
      restart_policy:
        condition: on-failure

  worker:
    image: dockersamples/examplevotingapp_worker
    networks:
      - frontend
      - backend
    deploy:
      mode: replicated
      replicas: 1
      labels: [APP=VOTING]
      restart_policy:
        condition: on-failure
        delay: 10s
        max_attempts: 3
        window: 120s
      placement:
        constraints:
          - "node.role==manager"

  visualizer:
    image: dockersamples/visualizer:stable
    ports:
      - "8080:8080"
    stop_grace_period: 1m30s
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
    deploy:
      placement:
        constraints:
          - "node.role==manager"

networks:
  frontend:
  backend:

volumes:
  db-data:
```

Thông qua file mẫu trên, bạn cũng có thể thấy được, 1 docker-compose file sẽ bao gồm các khai báo:

- version được sử dụng
- danh sách các services: Mỗi service bao gồm image, port, network, volumes,...
- networks
- volumes
-...

### 3. Service configuration reference version 3.x

Để có thể hiểu hơn về cách khai báo 1 compose file thì chúng ta cùng tìm hiểu một số keywords khai báo services cho compose-file nhé ;)

**build**

Dùng để chỉ định đường dẫn để build services.

Bạn có thể khai báo build là 1 đường dẫn
```
version: "3.9"
services:
  webapp:
    build: ./dir
```
hoặc sử dụng thêm context để khai báo
```
version: "3.9"
services:
  webapp:
    build:
      context: ./dir
      dockerfile: Dockerfile-alternate
      args:
        buildno: 1
```

Ngoài ra, nếu bạn sử dụng image như 1 bản build, thì bạn phải  khai báo cụ thể `webapp` và `tag` của image

```
build: ./dir
image: webapp:tag
```

*CONTEXT*

Dùng để khai báo chi tiết thay cho **build**, CONTEXT thường là đường dẫn đến thư mục chứa Dockerfile hoặc url đến repo git. Khi giá trị được khai báo là một đường dẫn tương đối, nó sẽ được hiểu là đường dẫn liên quan đến location của compose-file.
```
build:
  context: ./dir
```

*DOCKERFILE*

Khai báo thay thế cho dockerfile. Nếu bạn sử dụng keyword này, bạn cần phải khai báo nó kèm CONTEXT
```
build:
  context: .
  dockerfile: Dockerfile-alternate
```

*ARGS*

Thêm các build arguments, là các biến môi trường cần thiết trong quá trình build service.
```
build:
  context: .
  args:
    - buildno=1
    - gitcommithash=cdc3b19
```

*NETWORK*

Set network cho container connect.
```
build:
  context: .
  network: host
```
**image**

Chỉ định image để start container, có thể là một repository/tag hoặc image ID.
```
image: redis
```

**container_name**

Custom container name thay cho tên mặc định của nó.
```
container_name: new-name-of-my-web-container
```

**ports**

Để đăng ký cổng, bạn có thể sử dụng 1 trong 2 systax sau
- Dạng ngắn

    Bạn có thể chỉ định cả hai cổng (HOST: CONTAINER) hoặc chỉ 1 cổng container (một cổng máy chủ tạm thời được chọn).
    ```
    ports:
      - "3000"
      - "3000-3005"
      - "8000:8000"
      - "9090-9091:8080-8081"
    ```
- Dạng dài (chi tiết)

    Dạng này sẽ cho phép bạn cấu hình chi tiết hơn
    
    * target: cổng bí mật
    * published: cống công khai
    * protocol: tcp hoặc udp
    * mode: `host` hoặc `ingress`
    ```
    ports:
      - target: 80
        published: 8080
        protocol: tcp
        mode: host
    ```
 
**environment**

Cho phép khai báo các biến môi trường.

>> Lưu ý: Với các giá trị boolean (true, false, yes, no), bạn nên đặt chúng vào dấu nháy để đảm bảo chúng không bị converte thành True hoặc False khi parser bởi YML .
```
environment:
  RACK_ENV: development
  SHOW: 'true'
```

**configs**

Tương tự ports, config có 2 dạng cấu hình là SHORT SYSTAX và LONG SYSTAX
- SHORT SYSTAX

    Bạn cần chỉ định `config_name`, là các config do bạn định nghĩa và chỉ rõ đường dẫn tới file config của bạn.
    ```
    version: "3.9"
    services:
      redis:
        image: redis:latest
        deploy:
          replicas: 1
        configs:
          - my_config
          - my_other_config
    configs:
      my_config:
        file: ./my_config.txt
      my_other_config:
        external: true
    ```
- LONG SYSTAX
    
    Systax này sẽ bao gồm thông tin config chi tiết hơn
    - source: Tên của config trong Docker (nếu nó tồn tại)
    - target: Đường dẫn và tên của file được mount sang container, mặc định là `/<source>`
    - uid và gid: Xác định UID và GID là chủ sở hữu của config file trên containers. Nếu bạn không config, mặc định trên Linux sẽ là 0 (root). Và key này không support trên Windows.
    - mode: Config permission cho file config. Mặc định là `0444`.
    
        ```
        version: "3.9"
        services:
          redis:
            image: redis:latest
            deploy:
              replicas: 1
            configs:
              - source: my_config
                target: /redis_config
                uid: '103'
                gid: '103'
                mode: 0440
        configs:
          my_config:
            file: ./my_config.txt
          my_other_config:
            external: true
        ```

**depends_on**

Khai báo sự phụ thuộc giữa các services (nếu có)
```
version: "3.9"
services:
  web:
    build: .
    depends_on:
      - db
      - redis
  redis:
    image: redis
  db:
    image: postgres
```
        
**command**

Cho phép bạn ghi đè các command mặc định. Format khai báo tương tự CMD của dockerfile -  `exec form` hoặc command line

Bạn có thể khai báo như vậy
```
command: bundle exec thin -p 3000
```
hoặc như vậy
```
command: ["bundle", "exec", "thin", "-p", "3000"]
```

**init**

Chạy trình init bên trong vùng chứa để chuyển tiếp tín hiệu và thu thập các tiến trình. Init default là `false`, nếu bạn muốn bật tính năng này, hãy khai báo `true` cho nó
```
version: "3.9"
services:
  web:
    image: alpine:latest
    init: true
```

**restart**

Có 4 case cho bạn lựa chọn,
- `no` - là case mặc định, config không bao giờ restart container
- `always`: luôn luôn restart
- `on-failure` chỉ khởi động lại nếu chỉ ra được lỗi khi run conatiner không thành công.
- `unless-stopped` luôn luôn restart, trừ trường hợp container đã bị stoped.
```
restart: "no"
restart: always
restart: on-failure
restart: unless-stopped
```

**domainname, hostname, ipc, mac_address, privileged, read_only, shm_size, stdin_open, tty, user, working_dir**

Thêm một vài key có thể bạn sẽ cần. Những key này chỉ nhận 1 giá trị duy nhất.

Ví dụ:
```
user: postgresql
working_dir: /code

domainname: foo.com
hostname: foo
ipc: host
mac_address: 02:42:ac:11:65:43

privileged: true


read_only: true
shm_size: 64M
stdin_open: true
tty: true
```
Trên đây là một số references theo mình nghĩ là cần thiết để có thể giúp bạn config 1 services cho compose files. Chi tiết hơn bạn có thể tìm hiểu tại [đây](https://docs.docker.com/compose/compose-file/#service-configuration-reference).

<br>

Vậy là chúng ta đã cùng nhau tìm hiểu về Compose file reference, chủ yếu là version 3. Trong bài tiếp theo, chúng ta sẽ đến với Compose CLI nhé. 

Hi vọng bài viết này của mình sẽ có ích với bạn. Cảm ơn và hẹn gặp lại bạn ở những bài viết tiếp theo :)

Tài liệu tham khảo: [Compose file reference](https://docs.docker.com/compose/compose-file/)
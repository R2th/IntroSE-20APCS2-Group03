Ở bài trước, chúng ta đã cùng nhau tìm hiểu về Docker Compose và cách config 1 docker compose file
>> **Docker Compose** là một công cụ giúp định nghĩa và run mutil-docker-container. Một compose sẽ được config bởi 1 file docker compose có định dạng `YAML`
>> 
>> Để có thể sử dụng Compose, chúng ta cần 3 bước:
>> - Định nghĩa 1 docker file
>> - Định nghĩa 1 docker compose file
>> - Run docker-compose

Và để tiếp nối nội dung bài trước, trong bài này, chúng ta sẽ cùng tìm hiểu về Docker Compose CLI, xem làm thế nào để chúng ta có thể run docker compose này thành các container nhé :)

## 1. Compose CLI environment variables

Đầu tiên, chúng ta cần biết một số biến môi trường phục vụ cho các docker composer CLI

**COMPOSE_PROJECT_NAME**

Config tên project, tên container

Giá trị này được thêm vào trước cùng với tên service khi khởi động.

Ví dụ: Nếu COMPOSE_PROJECT_NAME của bạn là `myapp` và nó bao gồm hai service là `db` và `web`, thì compose sẽ tạo ra các containers có tên là `myapp_db_1` và `myapp_web_1` tương ứng.

Config này không bắt buộc. Nếu bạn không config, COMPOSE_PROJECT_NAME mặc định sẽ là tên của thư mục dự án

**COMPOSE_FILE**
Chỉ định đường dẫn tới compose file.

Nếu bạn không config, thì giá trị này mặc định được hiểu là file `docker-compose.yml` trong thu mục hiện tại hoặc các thư mục cha cho đến khi không tìm thấy file tương ứng.

Để định nghĩa multiple Compose files, chúng ta có thể sử dụng dấu `,` để ngăn cách cách đường dẫn tới các files.

Ví dụ: COMPOSE_FILE=docker-compose.yml:docker-compose.prod.yml.

Để sử dụng ký tự ngăn cách khác, bạn có thể custom lại bằng cách sử dụng biến *COMPOSE_PATH_SEPARATOR*.

**COMPOSE_API_VERSION**

Docker API chỉ hỗ trợ các request từ phía client theo một version được chỉ định. Nếu bạn gặp lỗi client và server có version không giống nhau khi sử dụng docker-compose, bạn có thể giải quyết lỗi này bằng cách config giá trị cho biến này. Config COMPOSE_API_VERSION giúp khớp với phiên bản giữa client với server.

Biến này nhằm mục đích giải quyết tạm thời tình huống không khớp giữa version giữa client và server. Ví dụ như khi bạn có thể nâng cấp phía client nhưng cần phải đợi để nâng cấp server, hoặc ngược lại.

Tuy nhiên, giải pháp tạm thời này có thể sẽ ảnh hưởng tới một số tính năng của Docker. Các tính năng chính xác bị lỗi sẽ phụ thuộc vào phiên bản client và server bạn đang dùng. Vì vậy, nếu bạn gặp sự cố khi như vậy, hãy cố găng giải quyết sự không khớp version thông qua việc nâng cấp client và server, thay vì sử dụng biến môi trường này.

**DOCKER_HOST**

Chỉ định URL của docker daemon. Với Docker client, mặc định là `unix: ///var/run/docker.sock`.

**DOCKER_TLS_VERIFY**: enables TLS communication

**DOCKER_CERT_PATH**

Config đường dẫn đến các tệp `ca.pem`, `cert.pem` và `key.pem` được sử dụng để xác thực TLS. Giá trị mặc định cho biến này là `~/.docker`.

**COMPOSE_HTTP_TIMEOUT**

Config timeout (tính bằng giây) tối đa cho request tới Docker daemon. Mặc định là `60` giây

**COMPOSE_TLS_VERSION**

Config TLS version sử dụng cho TLS communication với docker daemon. Mặc định là `TLSv1`. Các giá trị hỗ trợ cho biến này bao gồm: TLSv1, TLSv1_1, TLSv1_2.

**COMPOSE_CONVERT_WINDOWS_PATHS**

Bật chuyển đổi đường dẫn từ Windows-style sang Unix-style. Nếu dùng Docker Machine trên Windows, bạn phải bật biến này. Giá trị mặc định của biến này là `0`. Các giá trị được hỗ trợ là: `true` hoặc `1` để bật và `false` hoặc `0` để tắt.

**COMPOSE_PATH_SEPARATOR**

Nếu được đặt, giá trị của biến môi trường *COMPOSE_FILE* được phân tách bằng ký tự này làm dấu phân cách đường dẫn, thay vì dấu `,` mặc định.

**COMPOSE_FORCE_WINDOWS_HOST**

Nếu được config, các  volume declarations sử dụng cú pháp [short-syntax](https://docs.docker.com/compose/compose-file/compose-file-v3/#short-syntax) sẽ được phân tích cú pháp theo đường dẫn máy chủ. 

Các giá trị được hỗ trợ là: `true` hoặc `1` để bật và `false` hoặc `0` để tắt.

**COMPOSE_IGNORE_ORPHANS**

Nếu được config, Compose sẽ bỏ qua các containers bị lỗi. Các giá trị được hỗ trợ là: `true` hoặc `1` để bật và `false` hoặc `0` để tắt.

**COMPOSE_PARALLEL_LIMIT**

Định nghĩa số lượng thao tác tối đa mà Compose có thể thực thi song song. Giá trị mặc định là `64` và không nhận giá trị nhỏ hơn `2`.

**COMPOSE_INTERACTIVE_NO_CLI**

Nếu được bật, Compose sẽ không sử dụng Docker CLI cho các lệnh `run` và `exec` . Tùy chọn này không cho phép bật trên WIndow, 

Các giá trị được hỗ trợ là: `true` hoặc `1` để bật và `false` hoặc `0` để tắt.

## 2. Command-line completion

**Command-line completion** là plugin hỗ trợ bạn viết command-line. Tùy thuộc vào những gì bạn đã nhập trên dòng lệnh, nó sẽ giúp bạn:

- Gợi ý / hoàn thành các lệnh Compose có sẵn
- Gợi ý / hoàn thành các options  có sẵn với một command cụ thể
- Gợi ý/ hoàn thành các đối số cho các tùy chọn đã chọn

Nếu bạn đã cài [Zsh](https://ohmyz.sh/) cho Terminal của bạn, thì command-line completion đã được cài đặt. Việc bạn cần làm là thêm `docker` và `docker-compose` vào list plugins của Zsh tại `~/.zshrc`
```
plugins=(... docker docker-compose
)
```
Ngược lại, bạn có thể cài đặt nó theo hướng dẫn chi tiết tại [đây](https://docs.docker.com/compose/completion/).

## 3. Docker Compose command-lines

### docker-compose build
Dùng để build các services

```
Usage: build [options] [--build-arg key=val...] [SERVICE...]

Options:
    --build-arg key=val     Set build-time variables for services.
    --compress              Compress the build context using gzip.
    --force-rm              Always remove intermediate containers.
    -m, --memory MEM        Set memory limit for the build container.
    --no-cache              Do not use cache when building the image.
    --no-rm                 Do not remove intermediate containers after a successful build.
    --parallel              Build images in parallel.
    --progress string       Set type of progress output (`auto`, `plain`, `tty`).
                            `EXPERIMENTAL` flag for native builder.
                            To enable, run with `COMPOSE_DOCKER_CLI_BUILD=1`)
    --pull                  Always attempt to pull a newer version of the image.
    -q, --quiet             Don't print anything to `STDOUT`.
```

Các services được built 1 lần, sau đó được gắn tag, mặc định dạng project_service. 

Ví dụ: project name là `myapp`, service là `mysql`, sau khi build sẽ có tag là `myqpp_mysql`

Nếu bạn thay đổi Dockerfile của một service hoặc nội dung của thư mục build của nó, hãy rebuild service bằng lệnh `docker-compose build`

### docker-compose config

Lệnh này dùng để validate và xemCompose file.
```
Usage: config [options]

Options:
    --resolve-image-digests  Pin image tags to digests.
    --no-interpolate         Don't interpolate environment variables.
    -q, --quiet              Only validate the configuration, don't print
                             anything.
    --services               Print the service names, one per line.
    --volumes                Print the volume names, one per line.
    --hash="*"               Print the service config hash, one per line.
                             Set "service1,service2" for a list of specified services
                             or use the wildcard symbol to display all services.
```

### docker-compose create

Lệnh này đã không còn hiệu lực. Thay vào đó, bạn có thể thay thế bằng lệnh
```
$ docker-compose up --no-start
```

### docker-compose down

Lệnh dừng và xóa các containers, networks, volumes, và images được tạo bởi lệnh up.

```
$ docker-compose down [options]
```

Mặc định, những thứ bị xóa gồm:
- Containers của các services được định nghĩa trong tệp Compose
- Networks được định nghĩa trong phần `networks` của tệp Compose
- Các default netwwork, nếu chúng từng được sử dụng

Networks và volumes được định nghĩa `external` sẽ không bị xóa.


### docker-compose events

```
Usage: events [options] [SERVICE...]

Options:
    --json      Output events as a stream of json objects
```

Lệnh dùng để stream các sự kiện cho các containers của project.

### docker-compose exec

```
Usage: exec [options] [-e KEY=VAL...] SERVICE COMMAND [ARGS...]

Options:
    -d, --detach      Detached mode: Run command in the background.
    --privileged      Give extended privileges to the process.
    -u, --user USER   Run the command as this user.
    -T                Disable pseudo-tty allocation. By default `docker-compose exec`
                      allocates a TTY.
    --index=index     index of the container if there are multiple
                      instances of a service [default: 1]
    -e, --env KEY=VAL Set environment variables (can be used multiple times,
                      not supported in API < 1.25)
    -w, --workdir DIR Path to workdir directory for this command.
```

Lệnh này tương đương với lệnh thực thi image `docker exec`. Với lệnh  này, bạn có thể chạy các lệnh tùy ý trong các services của bạn. Mặc định, các lệnh được cấp phát một TTY, vì vậy bạn có thể sử dụng một lệnh `docker-compose exec web sh` để tương tác với service.

### docker-compose help

```
$ docker-composer help [COMMAND]
```

Hiển thị chi tiết và hướng dẫn sử dụng cho một lệnh.

### docker-compose kill

```
Usage: kill [options] [SERVICE...]

Options:
    -s SIGNAL         SIGNAL to send to the container.
                      Default signal is SIGKILL.
```
Lệnh dùng để kill các container. Để buộc dừng containers đang chạy, chúng ta có thể sử dụng options -s với giá trị là `SIGKILL`

### docker-compose logs

```
Usage: logs [options] [SERVICE...]

Options:
    --no-color          Produce monochrome output.
    -f, --follow        Follow log output.
    -t, --timestamps    Show timestamps.
    --tail="all"        Number of lines to show from the end of the logs
                        for each container.
```

Hiển thị logs của các services

### docker-compose pause

```
Usage: pause [SERVICE...]
```
Tạm dừng các container đang chạy của một service. Bạn có thể hủy bỏ lệnh tạm dừng bằng `docker-compose unpause`.

### docker-compose port

```
Usage: port [options] SERVICE PRIVATE_PORT

Options:
    --protocol=proto  tcp or udp [default: tcp]
    --index=index     index of the container if there are multiple
                      instances of a service [default: 1]
```

Liệt kê ra các public port cho một port binding.

### docker-compose ps

```
Usage: ps [options] [SERVICE...]

Options:
    -q, --quiet          Only display IDs
    --services           Display services
    --filter KEY=VAL     Filter services by a property
    -a, --all            Show all stopped containers (including those created by the run command)
```
Liệt kê danh sách containers

### docker-compose pull

```
Usage: pull [options] [SERVICE...]

Options:
    --ignore-pull-failures  Pull what it can and ignores images with pull failures.
    --parallel              Deprecated, pull multiple images in parallel (enabled by default).
    --no-parallel           Disable parallel pulling.
    -q, --quiet             Pull without printing progress information
    --include-deps          Also pull services declared as dependencies
```

Dùng để pull một image được config cho service trong Compose file và không khởi động container sau khi pull image

### docker-compose push

```
Usage: push [options] [SERVICE...]

Options:
    --ignore-push-failures  Push what it can and ignores images with push failures.
```
Pushes images for services to their respective registry/repository. The following assumptions are made: You are pushing an image you have built locally You have access to the build key
VIETNAMESE
Dùng để push các images cho services  vào repo tương ứng của chúng.

>>Lưu ý:
>> - Bản build Image mà bạn muốn push là một bản local
>> - Bạn phải có quyền truy cập

### docker-compose restart

```
Usage: restart [options] [SERVICE...]

Options:
  -t, --timeout TIMEOUT      Specify a shutdown timeout in seconds.
                             (default: 10)
```
Restart các container đang chạy hoặc đang dừng.

If you make changes to your docker-compose.yml configuration these changes are not reflected after running this command.

Nếu bạn cập nhật Compose file, những config được thay đổi sẽ không được cập nhật khi bạn chạy lệnh này. Để đảm bảo config được cập nhật, bạn hãy xem lại mục config [restart](https://docs.docker.com/compose/compose-file/compose-file-v3/#restart) của Docker Compose File.

### docker-compose rm

```
Usage: rm [options] [SERVICE...]

Options:
    -f, --force   Don't ask to confirm removal
    -s, --stop    Stop the containers, if required, before removing
    -v            Remove any anonymous volumes attached to containers
    -a, --all     Deprecated - no effect.
```

Xóa các service containers đã bị tắt.

Mặc định, các volumes ẩn dang sẽ không bị xóa. Bạn có thể override bằng option `-v`.

Việc chạy lệnh không có tùy chọn sẽ xóa các container đã tắt được tạo bởi `docker-compose up` hoặc `docker-compose run`

### docker-compose run

```
Usage:
    run [options] [-v VOLUME...] [-p PORT...] [-e KEY=VAL...] [-l KEY=VALUE...]
        SERVICE [COMMAND] [ARGS...]
```

Ví dụ: lệnh sau khởi động dịch vụ web và chạy bash dưới dạng lệnh của nó
```
$ docker-compose run web bash
```

### docker-compose scale
Lệnh này đã không còn hiệu lực. Thay vào đó, hãy sử dụng lệnh `docker-cpmose up --scale`.
### docker-compose start
```
Usage: start [SERVICE...]
```
Starts các containers cho một service.

### docker-compose stop

```
Usage: stop [options] [SERVICE...]

Options:
  -t, --timeout TIMEOUT      Specify a shutdown timeout in seconds.
                             (default: 10)
```
Stop các containers đang chạy mà không xóa chúng. Để khởi động lại các containers đã stop, bạn có thể sử dụng `docker-compose start`.

### docker-compose top

```
Usage: top [SERVICE...]
```
Hiển thị các tiến trình đang chạy.

### docker-compose unpause

```
Usage: unpause [SERVICE...]
```
Hủy việc pause một service

### docker-compose up

```
$ docker-composer up [options] [--scale SERVICE=NUM...] [SERVICE...]
```

Builds, (re)creates, starts và gắn container cho service.

Trên đây là một số tìm hiểu của mình về Docker Compose CLI. Hi vọng bài viết này sẽ có ích với bạn và hẹn gặp lại bạn ở những bài viết tiếp theo.

Tài liệu tham khảo [Docker Compose CLI](https://docs.docker.com/compose/reference/overview/)
Chào mọi người, sau khi làm việc cùng với docker mình nhận thấy việc tạo gõ từng câu lệnh để build, run, hay đơn giản là login để thực thi với docker quả là tốn thời gian và ko làm 1 cách nhanh chóng được.
Vậy mình viết bài này để share với mọi người cách để thực thi nhanh hơn đó là tạo shell script để chạy. 

Nào mình cùng bắt đầu nhé.

## Chuẩn bị 
1. Tạo file chạy ở root project với đuôi `.sh`. 

Ví dụ: `docker.sh`
```
#!/usr/bin/env bash

execute() {
    local task=${1} //Get param thứ nhất
    
    esac
}

main() {
    [ $# -ne 1 ] && { usage; exit 1; } //Nếu không truyền param thì return
    local task=${1} //Get param thứ nhất 
    execute ${task}
}

main $@ //Chạy hàm main
```

2. Thêm quyền thực thi cho file shell script:
```
chmox +x docker.sh
```

3. Chạy lệnh test file shell script:
```
./docker.sh {param}
```

## Tạo hàm clean, build
```
IMAGE_NAME=project-name //Tên image sẽ tạo

clean() {
    IMAGE=$(docker ps -a -q --filter ancestor=${IMAGE_NAME} --format="{{.ID}}") //Get tên docker container với tên image đã được tạo

    if ! test -z "$IMAGE" //Kiếm tra container có đang chạy không? (Dành cho chạy docker lần đầu)
    then
        docker rm $(docker stop ${IMAGE}) //Dừng và xóa docker container cũ
        docker rmi -f ${IMAGE_NAME} //Xóa image đã tạo
    fi
}

build_docker() {
    docker build -t ${IMAGE_NAME} . //Build docker với tên image ở trên
}

execute() {
    local task=${1} // Get task từ command
    case ${task} in
        build)
            clean //Thực thi hàm clean
            build_docker //Thực thi build docker
            ;;
    esac
}

```
1. Hàm clean để clean container và image trước khi chạy build lại
2. Hàm build_docker để thực hiện build project
3. Chạy command để build docker:
```
./docker.sh build
```

## Tạo hàm run và login
Sau khi tạo docker image bạn sẽ cần run docker container lên, và có khả năng bạn sẽ cần login vào project trên docker để debug hay làm gì đó.
```
IMAGE_NAME=lims-admin
HOST_PORT=80 //Port sẽ đi ra ngoài docker

clean() {
    IMAGE=$(docker ps -a -q --filter ancestor=${IMAGE_NAME} --format="{{.ID}}") //Get tên docker container với tên image đã được tạo

    if ! test -z "$IMAGE" //Kiếm tra container có đang chạy không? (Dành cho chạy docker lần đầu)
    then
        docker rm $(docker stop ${IMAGE}) //Dừng và xóa docker container cũ
        docker rmi -f ${IMAGE_NAME} //Xóa image đã tạo
    fi
}

build_docker() {
    docker build -t ${IMAGE_NAME} . //Build docker với tên image ở trên
}

launch() {
    docker run -p ${HOST_PORT}:80 -d ${IMAGE_NAME} //port 80 ở đây là port được service bên trong service của docker expose ra
}

login() {
    docker exec -it $(docker ps -q --filter ancestor=${IMAGE_NAME} --format="{{.ID}}") /bin/bash //Thực thi tìm tên container và login
}

execute() {
    local task=${1} // Get task từ command
    case ${task} in
       build)
            clean //Thực thi hàm clean
            build_docker //Thực thi build docker
            ;;
       run)
            launch //Chạy hàm run docker
            ;;
        login)
            login //Login vào docker
            ;;
    esac
}
```

Chạy command để login docker:
```
./docker.sh login
```
## Handle error 
Trong quá trình chạy shell script không thể tránh khỏi lỗi ngoại lệ, vậy nên mình sẽ tạo hàm để xuất ra log để debug
```
IMAGE_NAME=lims-admin
HOST_PORT=80

clean() {
    IMAGE=$(docker ps -a -q --filter ancestor=${IMAGE_NAME} --format="{{.ID}}") //Get tên docker container với tên image đã được tạo

    if ! test -z "$IMAGE" //Kiếm tra container có đang chạy không? (Dành cho chạy docker lần đầu)
    then
        docker rm $(docker stop ${IMAGE}) //Dừng và xóa docker container cũ
        docker rmi -f ${IMAGE_NAME} //Xóa image đã tạo
    fi
}

build_docker() {
    docker build -t ${IMAGE_NAME} . //Build docker với tên image ở trên
}

launch() {
    docker run -p ${HOST_PORT}:80 -d ${IMAGE_NAME}
}

login() {
    docker exec -it $(docker ps -q --filter ancestor=${IMAGE_NAME} --format="{{.ID}}") /bin/bash
}

err() {
    echo $* >&2 //Hiển thị lỗi khi chạy
}

usage() {
    err "$(basename $0): [build|run|all|login]" //Xuất log chỉ được nhập 1 trong 4 params sau
}

execute() {
    local task=${1}
    case ${task} in
        build)
            clean
            build_docker
            ;;
        run)
            launch
            ;;
        login)
            login
            ;;
        *) //Case không xác định
            err "invalid task: ${task}" //Xuất error log
            usage
            exit 1
            ;;
    esac
}
```

## File docker shell script hoàn chỉnh
```
#!/usr/bin/env bash

IMAGE_NAME=lims-admin
HOST_PORT=80

err() {
    echo $* >&2
}

usage() {
    err "$(basename $0): [build|run|all|login]"
}

clean() {
    IMAGE=$(docker ps -a -q --filter ancestor=${IMAGE_NAME} --format="{{.ID}}")

    if ! test -z "$IMAGE"
    then
        docker rm $(docker stop ${IMAGE})
        docker rmi -f ${IMAGE_NAME}
    fi
}

build_docker() {
    docker build -t ${IMAGE_NAME} .
}

launch() {
    docker run -p ${HOST_PORT}:80 -d ${IMAGE_NAME}
}

login() {
    docker exec -it $(docker ps -q --filter ancestor=${IMAGE_NAME} --format="{{.ID}}") /bin/bash
}

execute() {
    local task=${1}
    case ${task} in
        build)
            clean
            build_docker
            ;;
        run)
            launch
            ;;
        login)
            login
            ;;
        all) // Hàm để thực hiện clean, build và chạy docker
            clean
            build_docker
            launch
            ;;
        *)
            err "invalid task: ${task}"
            usage
            exit 1
            ;;
    esac
}

main() {
    [ $# -ne 1 ] && { usage; exit 1; }
    local task=${1}
    execute ${task}
}

main $@
```

Chạy command để thực thi all script file sh:
```
./docker.sh all
```

## Kết luận
Như vậy mình đã hướng dẫn xong việc tạo 1 file shell script để việc build chạy docker 1 cách dễ dàng rùi. Các bạn hãy thử apply vào project xem nhé, script này có thể áp dụng cho tất cả project chạy đơn giản, ngoài ra các bạn có thể dựa trên base này để phát triển tiếp nhé.

Cảm ơn mọi người đã theo dõi bài viết của mình. :grinning: :kissing:
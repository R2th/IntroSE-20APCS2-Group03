![](https://images.viblo.asia/44624656-6c85-4731-97c7-46c20f14057d.png)
Docker compose cung cấp một cách đơn giản để có thể chạy được nhiều container up và chạy chúng với effort một cách tối thiểu nhất. Nó thật là dễ dàng được tiếp cận.

File configuration không khó để làm việc. Chúng mình sẽ đi tìm hiểu các mục sau đây để chúng ta có thể tiếp cận được docker compose nhé
* Getting started with Docker Compose
* The docker-compose.yml file: file này chúng ta sẽ viêt mã config , nó sẽ đảm nhiệm chịu trách nhiệm lấy images. up image và chạy các container lên.
* Docker Compose Commands
* Docker Compose in Action
* Setting Up Development Environment Services
* Managing Development Environment

# Getting started with Docker Compose
## Introduction
`Docker compose` cho phép bạn có thể quản lý nhiều container. Nó thật hữu dụng cho môi trường development và staging, và có thể trên production. Docker có những option khác mà bạn có thể sử dụng.

Các tính năng của `Docker Compose`:
* Start, stop và rebuild services
* View the status of running services
* Stream the log output of running services
* Run a one-off command on a service

## The Need for Docker Compose
![](https://images.viblo.asia/0d817bb2-d35d-4bd0-a443-16f13d80c4bc.png)
Như các bạn biết đấy, ví dụ trên cho thấy khi cái được `redis` thì chúng ta cần cài `node` server mà muốn cài được `node` server thì chúng ta phải cài nginx. Tương tự cũng đối với `mongDB`. Bạn có thể thấy chúng ta sẽ có 6 container, nêu chúng ta quản lý bằng tay thì sẽ xảy ra một số vấn đề và nó không được hiểu quả cho lắm. Vì thế `docker compose` giúp chúng ta có thể quản lý chúng một cách dễ dàng. Vì thế `docker compose` có một file mà chúng ta có thể gọi là `docker-compose.yml` . File này bạn có thể định nghĩa tất cả những service và thậm chí những mỗi quan hệ giữa các service này trong đó.
## Docker Compose Workflow
![](https://images.viblo.asia/c27fe9a8-6af1-4151-9ceb-eb9d30ca7c0c.png)
Vậy qua đó mình đã giới thiệu về docker compose qua một vài ý ở trên, phần tiếp theo mình sẽ giới thiệu `docker-compose.yml` file nhé.
# Docker Compose File
Trước hết thì `docker compose` file để tìm tất cả các service. Nó sẽ giống như các phiên bản của các máy chủ web khác nhau mà bạn đang chạy: PHP, Java, , mysql, sql server, ... Chúng ta có thể định nghĩa chúng trong `docker-compose` file , tải chúng lên và chạy. Trong quá trình build thì tất nhiên sẽ sinh ra các image, sau đó chúng ta có thể sử dụng nó để tạo container. 
![](https://images.viblo.asia/4cebff70-1828-4452-a990-dc154f7e818a.png)
Nó thật là đơn giản đúng không các bạn. Bạn có thể ném cho ai đó `docker-compose.yml` này và sau đó với vài câu lệnh terminal đơn giản bạn của docker, bạn có thể có pull được tất cả các image và chạy các container để phục vụ cho việc coding của bạn chỉ trong vài phút mà bạn không cần mất công sức cài từng image một. 

Vậy chúng ta cần định nghĩa những gì trong một file `docker-compose.yml` này. Đầu tiên chúng ta sẽ thấy ở ngay trên đầu đó chính là `version`. Cái này có thể thay đổi, chúng ta có rất nhiều version khác nhau nhưng hiện tại được chấp nhận hết. Chúng ta có thể định nghĩa thêm `volumes, network` ở trong phần `service`.
 
![](https://images.viblo.asia/ac917729-50d0-453f-b0d3-8f5b438b3e77.png)

**Key Service Configuration Options**
* build
* environment
* image
* network
* port
* volumes

```Javascript
version: '2'
services:
    node:
        build:
            context: .
                dockerfile: node.Dockerfile
        networks: -nodeapp-network
            mongodb:
                image:mongo
        networks:
            -nodeapp-network
        networks:
            nodeapp-network
                driver: bridge
```
# Docker Compose Commands
* docker-compose build
* docker-compose up:  
* docker-compose down
* docker-compose logs
* docker-compose ps
* docker-compose stop
* docker-compose start
 
Đâu tiên để build service, chúng ta có thể làm việc này thông qua docker compose tool và chúng ta sẽ run câu lệnh build  `docker-compose build`này. Bây giờ một lần nữa chúng ta có sẵn các image, chúng ta có thể sử dụng `docker-compose up ` để start và chạy những image này lên. Chúng ta có thể xem log thông qua `docker-compose logs`, xem list các container đang chạy như service bằng lệnh `docker-compose ps`. Chúng ta có thể stop tất các các service khác nhau và sau đó start chúng thông qua `docker-compose stop`, `docker-compose start`.
## Example
Mình sẽ lấy ví dụ chúng ta làm việc với nodejs thì bộ đôi node và mongodb sẽ luôn là một cặp. Vì thể trong project nodejs chúng ta có thể tạo 1 file `docker-compose.yml` như sau để có thể khời tạo và chạy các service node và mongdb.

![](https://images.viblo.asia/f67af76d-7b1d-4171-8671-f92907105a5c.png)

Sau đó chúng ta sẽ bật terminal lên và nhập command `docker-compose build` để build . Kết quả chúng ta sẽ được như này thì chúng ta đã thành công.

![](https://images.viblo.asia/16951974-f62c-4a01-8dec-26fc85395278.png)

Sau đó chúng ta `docker-compose up` để pull image và tạo network đã định nghĩa trong file `docker-compose.yml` về.

![](https://images.viblo.asia/bd01a26b-cc91-4123-8167-c683e534be0f.png)

Chúng ta có thể sử dụng câu lệnh `docker ps` để xem những image nào đang có nhé.
Để loại bỏ hết tất cả các service đang chạy thì chúng ta dùng `docker-compose down`.
Qua ví dụ chỉ với file `docker-compose.yml` với một vài câu lệnh của `docker-compose` chúng ta đã start các service một cách nhanh chóng. Giả sử mà chúng ta không dùng `docker-compose` thì chúng ta sẽ dùng những câu lệnh sau để start.

Đầu tiên custome image node từ docker file -- node.dockerfile
```
docker build -f node.dockerfile -t node
```

Tiếp theo chúng ta sẽ build mongo container với custom name
```
docker run -d --name my-mongodb mongo
```

Tiếp đến chúng ta sẽ tạo network để kết nối 2 container node vs mongo với nhau.

Nếu dùng `Legacy Linking`
```
docker run -d -p 3000:3000 --link my-mongodb --name nodeapp node
```

Còn nếu dùng `Custom Bridge Network`
```
Tạo network với tên isolated_network
docker network create --driver bridge isolated_network
Add mongodb vào network
docker run -d --net=isolated_network --name mongodb mongo
Add node express site vào network
docker run -d --net=isolated_network --name nodeapp -p 3000:3000 node
```
# Overview
Bài viết của mình muốn giới thiệu qua tổng quan docker-compose nó là cái gì và cách làm việc cơ bản của nó ra sao. Trong bài viết tiếp theo mình sẽ set up môi trường để chúng ta có thể chạy được project thông qua docker-compose nhé. Mình xin cảm ơn các bạn đã đọc bài viết của mình.

# Reference
https://docs.docker.com/compose/gettingstarted/
Chào mọi người!
Docker đã quá quen thuộc và phổ biến rồi phải không nào. Từ máy local đến Server các bạn đều cài được và sử dụng Docker. Bài viết hôm này mình chia sẻ các bạn một vài command hay dùng khi sử dụng Docker.
![](https://images.viblo.asia/a0d8d878-7748-4c0c-8fa0-c24a9c3c0d68.png)

# First try
```
docker run hello-world
docker info
docker version
docker --help
```
# Listing (ls=listing)
```
docker images ls
docker container ls -a
docker volume ls
docker network ls
docker container ps -a
docker ps
```
# Image pull from, push to registry
```
docker image pull alpine
docker image push alpine
```
# Creating and entering container (--name=name of new container, -it=interactive mode, sh=shell)
```
docker container run -it --name c1 omerbsezer/sample-java-app sh
```
# Start, stop container (30e=containerID)
```
docker container start 30e    
docker container stop 30e
```
# Entering container (8aa=containerID, webserv=containerName, sh=shell)
```
docker container exec -it webserv sh
docker container run --name c1 -it busybox sh  #create and enter in 
docker exec -it 8aa sh
```
# Local registry running (d=detach mode, p:portBinding)
```
docker container run -d -p 5000:5000 --restart always --name localregistry registry
```

# Port binding, background running ## (d=detach mode, p:portBinding)
```
docker container run --name nginxcontainer -d -p 8080:80 nginx
```
# Volume (v:volume host:container)
```
docker container run --name ng2 -d -p 8080:80 -v test1:/usr/share/nginx/html nginx
```
# Copy container to host (cp:copy)
```
docker cp ng2:/test12 C:\Users\oesezer\Desktop\sampleBindMount
```
# Copying from volume, creating new temp. container
```
docker run -d -v hello:/hello --name c1 busybox
docker cp c1:/hello ./
```
# Container erasing (rm:remove, f:force, prune: delete all)
```
docker container prune
docker container rm -f 123
```
# Creating new bridge (network) (net=network)
```
docker network create bridge1
docker network inspect bridge1
docker container run -it -d --name webserver --net bridge1 omerbsezer/sample-web-php sh
docker container run -it -d --name webdb --net bridge1 omerbsezer/sample-web-mysql sh
docker network inspect bridge1
```
# Creating new bridge (custom subnet, mask and ip range) and connecting
```
docker network create --driver=bridge --subnet=10.10.0.0/16 --ip-range=10.10.10.0/24 --gateway=10.10.10.10 bridge2
docker network inspect bridge2
docker container run -dit --name webserver2 omerbsezer/sample-web-php
docker container run -dit --name webdb2 omerbsezer/sample-web-mysql
docker network connect bridge2 webserver2
docker network connect bridge2 webdb2
docker network inspect bridge2
```
# Image tagging and pushing
```
docker image tag mysql:5 test:latest
docker image push test:latest
```
# Image build (-t: tagging image name)
```
docker image build -t hello . (run this command where “Dockerfile” is)
(PS: image file name MUST be “Dockerfile”, no extension)
```
# Image save and load (t=tag, i=input, o=output)
```
docker save -o <path for created tar file> <image name>
docker save -o [imageName].tar [imageName]
docker load -i <path to docker image tar file>
docker load -i .\[imageName].tar
```   
# Env, copy from container to host
```
docker container run --net host [imageName]
ENV USER="space"
docker container run -d -d p 80:80 --name hd2 -e USER="UserName" [imageName]
docker cp host_path:/usr/src/app .
```
# Multistage image File
```
FROM mcr.microsoft.com/java/jdk:8-zulu-alpine AS compiler
COPY --from=compiler /usr/src/app . 
COPY --from=nginx:latest /usr/src/app .
```

# Using ARG (ARG=argument is only used while creating image, difference from ENV: env is reachable from container)
```
ARG VERSION
ADD https://www.python.org/ftp/python/${VERSION}/Python-${VERSION}.tgz .
docker image build -t x1 --build-arg VERSION=3.7.1 .
docker image build -t x1 --build-arg VERSION=3.8.1 .
```
# Creating Image from Container (-c: CMD)
```
docker commit con1 dockerUserName/con1:latest
docker commit -c 'CMD ["java","app"]' con1 dockerUserName/con1:second
docker image inspect dockerUserName/con1:secon
```
# Lời kết
Trên đây là các command hay được sử dụng trong Docker. Các bạn có bổ sung gì thêm để lại comment bên dưới nhé!
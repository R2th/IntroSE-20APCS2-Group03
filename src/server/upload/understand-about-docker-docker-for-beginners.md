# What is Docker?
![](https://images.viblo.asia/ac53ea52-c0de-4488-8688-14d21a9b55d1.png)<br>
Imagine that Docker is like a big ship carrying containers. Well, inside the containers will contain the merchandise. Hypothesize that the merchandise are "Docker images", so structure of docker similar :<br>
![](https://images.viblo.asia/3185bbfe-b313-4d2b-86cd-d76fb3bbb325.png)

## 1. What is the container?
What is the containers? <br>Container is like virtual environment in python. It's contain several Docker image, Docker image is instance or object of container.
![](https://images.viblo.asia/a081f119-e2c9-4fd9-887a-833e0852c731.jpeg)
* Container is a way to package applications with all the necessary dependencies and configuration.
* Easily shared and moved around between a development team or deployment and operations team
* Makes development and deployment more efficient
## 2. Different before container & after container
👍How did we develop applications before the containers?Usually when you have a team of developers working on some application, you would have to install most of the services on your operating system directly. Alright, for example developing some Javascript application. And every developer in the team would configure them and run them on the local development environment and depending on which operating system they are using installation process will look actually different. Also, another thing with installing services like this is that you have multiple steps of installation, but several steps going wrong and error happening is actually pretty high. And this approach of setting up a new environment can actually be pretty tedious, depending on how complex your application. For example, if you have 10 services that your application is using then you would have to do that 10 times on each operating system environment.
* **Installation process different on each OS environment**
* **Many steps where something  could go wrong**
<br>
![](https://images.viblo.asia/a4c28e7c-de94-448f-9db3-addfbf7b6444.png)
![](https://images.viblo.asia/17fd6eed-dd03-480b-853f-55c8f2e080f4.png)

👍So now let's see how containers solve some of these problems with containers. With containers, you actually do not have to install any of the services directly
on your operating system. Because the container is own isolated operating system layer with Linux based image. So you have the **PostgresSQL**, pakage with a **configuration** in the **start script** inside of one container. And the download step is just one docker command which fetches the container and starts it at the same time. So we have 10 applications that your Javascript application uses and depends on, you would just have to run 10 docker commands for each container and that will be it. Which makes the setting up your local development enviroment actually much easier and much more efficient than the previous version.Also, you can actually have different versions of the same application running on your local environment without having any conflict.
* **own isolated environment**
* **package with all needed configuration**
* **one command to install the app**
* **run same app with 2 different versions**
![](https://images.viblo.asia/2fdd3ead-9bc7-470d-8bf8-6ec73cbe57f4.png)

# Docker compare to Virtual Machine
![](https://images.viblo.asia/458fb7c9-f8c1-48ae-936c-fd1eb6ec1149.png)
**Docker** virtualize is the application layer. So, when you dowload a docker image, it actually contains the applications layer of the operating system and some other applications installed on top of it. And it use the kernel of the host because it doesn't have its own kernel.<br>
**Virtual Machine (VM)** has the applications layer and its own kernel, so virtualize is the complete operating system, which means that when you download a virtual machine image on your host, it doesn't use your kernel. It puts up its own.<br>
So what is this difference between Docker and Virtual Machine actually mean ? So first of all, the size of Docker images are much smaller because they just have to implement one layer. A second one is the speed so you can run and start docker container much faster than VM. The third difference is compatibility.
# Installation docker
Docker can install on the multiple flatforms, such as : Mac, Linux, Window. Link tutorial 
Iam working with deep learning then by default you use ubuntu. Detail description install : [link](https://docs.docker.com/engine/install/ubuntu/)
1. Set up the responsitory
```
$ sudo apt-get update
$ sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
$  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
$  echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
2. Install Docker Engine
```
$  sudo apt-get update
$  sudo apt-get install docker-ce docker-ce-cli containerd.io
```
3. Inspect install
```
$  sudo docker run hello-world
```
If result is " **Hello from docker** ",  the installation was successful.
# Base commands in docker
* **docker ps** : list running containers

![](https://images.viblo.asia/e24f57dc-3d5a-4327-a4dc-e7342dca7644.png)
* **docker ps -a** : lists running and stopped container

![](https://images.viblo.asia/012c8eef-e56b-4cf2-ac89-77aa44560e2b.png)
* **docker images**: list images

![](https://images.viblo.asia/653f83e1-5a44-4f22-9555-c1de11b7e771.png)
* **docker rmi**: remove image
> docker rmi <image_id>
![](https://images.viblo.asia/22677e0b-93f2-4051-a095-e10d601ec668.png)

* **docker build**: building image<br>
> docker build -t <image_name> .
![](https://images.viblo.asia/44cbec55-290b-44d2-ad37-6478269a962a.png)
* **docker run**: start new container with a command<br>
> docker run -it --rm -d -p <port_host>:<container_host> --name <name> <image_name>
![](https://images.viblo.asia/3ef7943b-a676-440a-b63f-932a8d0f0e79.png)

* **docker pull**: pull docker image from docker hub
 
 ![](https://images.viblo.asia/6e2115f6-3258-4902-8125-418641b0c8d7.png)

* **docker push**: push image to docker hub
>   docker login <br>
    docker tag <container_name> <user_name>/<responsitory>:<tag> <br>
    docker push <user_name>/<responsitory>:<tag> <br>
  ![](https://images.viblo.asia/184dca8c-6c1c-457a-9947-e5f8ef732b95.png)

* **docker stop**: stop the container
>  docker stop <container_name>
 ![](https://images.viblo.asia/8fd0ffb1-6680-42cc-9837-07766d02c6d7.png)

* **docker start**: start stopped container
* **docker logs**: debug containers
>  docker logs <containers_id>
 
* **docker exec -it**: use review or debug containers
>  docker exec -it <container_id> /bin/bash
    
 You can refer to PhamDinhKhanh's [article](https://phamdinhkhanh.github.io/2020/11/17/DockerDL.html#11-kh%C3%A1i-ni%E1%BB%87m) very good.<br>
    
# Build docker
 Structure :<br>
![](https://images.viblo.asia/21a88d5d-56bf-4061-a8f8-90d8dad80c37.png)
## 1. Build Dockerfile
Dockerfile is used to create an image for our application. This image will run on any host or environment with Docker installed.<br>
Let's have an overview of whats in our Dockerfile:<br>
*  **FROM**: A Dockerfile must start with a From instruction with an argument that has anather image.<br>
>     FROM okwrtdsh/anaconda3:cpu
*  **RUN**: Will execute terminal commands during build image.
>     RUN pip install -r requirements.txt <br>
>      RUN pip install tensorflow
*  **WORKDIR**: It is similar to the **cd** command.<br>
>     WORKDIR /app
*  **LABEL**: Provide metadata information for images such as: email, company,author,...
*   **EXPOSE**: Port
*  **COPY**: This command copies files from the local system onto the Docker image.<br>
>     COPY ./app
*  **ADD**: similar COPY
*  **CMD**: This command specifies the program or file that will be excecuted when the container initializes. <br>
  Syntax: CMD ["executable", "param1","param2"]
>  CMD ["python3","app.py"]
    
*  **ENV**: parameters environment
*  **ARG**: similar argument parser in python
    
Eg Dockerfile:<br>
 ![](https://images.viblo.asia/c7cad703-1a4e-4941-8bb5-d13a04627321.png)

## 2.  requirements.txt
 File requirements.txt help pack libraries to run 
 ![](https://images.viblo.asia/76425170-c132-496e-95c1-f3102a0964c0.png)

## 3. docker-compose.yaml
  next time or refer to :https://phamdinhkhanh.github.io/2020/11/17/DockerDL.html#11-kh%C3%A1i-ni%E1%BB%87m
# Documents
 Install docker: https://docs.docker.com/engine/install/ubuntu/ <br>
 Build Dockerfile anaconda3: https://github.com/okwrtdsh/anaconda3 <br>
 Build Dockerfile pytorch: https://github.com/anibali/docker-pytorch/tree/master/dockerfiles <br>
 Video tutorial : https://www.youtube.com/watch?v=3c-iBn73dDE <br>
 Blog: https://phamdinhkhanh.github.io/2020/11/17/DockerDL.html#11-kh%C3%A1i-ni%E1%BB%87m
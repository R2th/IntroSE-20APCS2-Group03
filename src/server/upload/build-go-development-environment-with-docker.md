I would like to make a memo for the time studying the `Go` language.

This memo is about the environment construction, but I think that I will be good enough to be able to make the development of API server in `Go` language later.

# Why we make in `Docker`
Building an environment with Docker offers many benefits.

* You can easily build an environment with any OS
* Firmly secure because host OS and development application are isolated
* Easier deployment and testing
* Less software installed on host OS
* `Docker` is the best.

# What is `Docker` in the first place?
A platform for handling container-type virtual environments.

You can create, distribute, and run something like a lightweight, fast-running virtual machine called a container.

# Installing `Docker`
Windows and Mac can download the installer on the official page of docker hub.

* [windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows)
* [mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac)

Linux systems can be installed using `apt-get` or `yum`.

# Environment construction
First, create a working directory on the terminal and move to there.
```
mkdir work
cd work
```

## Make settings of Docker container
Docker can create container instances based on Docker images distributed at docker hub.

This time, instead of using the distributed Docker image as it is, I created a customized image using Dockerfile.

In addition, by using the tool called `docker-compose`, I can describe the settings from container build to integration in the file base of `yml` format (`docker-compose.yml`) and automate it.

Create Dockerfile and `docker-compose.yml` in the working directory.

Open the created file with your favorite editor and edit it.

* Dockerfile
```
FROM golang:latest
RUN mkdir /go/src/work
WORKDIR /go/src/work
ADD . /go/src/work
```

* docker-compose.yml
```
version: '3' 
services:
  app: 
    build: . 
    tty: true 
    volumes:
      - .:/go/src/work 
```

## build
Create a container using the `docker-compose` command.

Run the following command in the working directory with `Dockerfile`, `docker-compose`

`docker-compose build`

Then, begin to create the Docker image composed of Docker file by `docker-compose`

If it completes successfully, an image file will be prepared and the Docker container can be launched.

You can check the prepared image file by the following command.

`docker-compose images`

## Start Docker container

If we run the following command, will launch docker in the same directory

`docker-compose up -d`

It will be started in background by adding -d option.

You can check the container status with the following command.

`docker-compose ps`

## Try implement
Let's write `Hello, World!` With `Go` and actually make it works

Create `main.go` file in host work and write the following code.

* main.go
```
package main

import "fmt"

func main () {
    fmt.Println ("Hello, World!")
}
```
The host's work directory is mounted on the container's work directory, so the created `main.go` can be accessed from the container.

You can execute `main.go` in the container environment by the following command.

`docker-compose exec app go run main.go`
We can actually make an `Herro, World!`

It is also possible to enter and execute a container shell.

```
docker-compose exec app /bin/bash
go run main.go
```
Environment construction is complete!

If you share the source directory directly on Github, anyone with Docker can also easily build the environment.
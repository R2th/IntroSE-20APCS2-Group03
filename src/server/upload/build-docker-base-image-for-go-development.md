## Getting Start
Bootstraping a Go development environment can be quite repentitive as we need to put in quite a lot of tooling and coordination to get an easy to work with workspace like for example watch for file change and recompile.

In this article I will put the neccessary tooling that need for Go development into one bundle by building a Docker base image that we can re-use for future development. What we need to include in the base image are following.

- File watcher [entr](http://eradman.com/entrproject/)
- Git configuration that used SSH over HTTPS to pull in private Go packages
- Custom script to recompile our project when file change

## Adding File Watcher
To start of we will begin with compiling a file watcher binary. Our goal is to get a working sandbox environment while maintain as small image size as possible. We will do so by using docker multi-stage build with Alpine Linux as base image.

```Dockerfile
FROM alpine:3.10 AS builder
```

Then we install neccessary dependencies to compile a binary, pull in the source code and do the compilation.

```Dockerfile
RUN apk add --no-cache curl g++ make
RUN curl -O http://eradman.com/entrproject/code/entr-4.3.tar.gz
RUN tar -xvf entr-4.3.tar.gz && cd entr-4.3 && \
  curl -O http://entrproject.org/patches/entr-3.9-wsl && \
  patch -p1 < entr-3.9-wsl && ./configure && make
```

After that we copy the final binary file from `/usr/local/bin` into our final build stage, which based on official Go docker image
```Dockerfile
RUN mv entr /usr/local/bin

FROM golang:1.13.5-alpine3.10

ENV PACKAGE=
ENV MAIN_APP=

COPY --from=builder /usr/local/bin/entr /usr/local/bin/
```
After this step we are ready to go on to the next step

## Play Nice with Private Go Package
The next step is to configure git to be able to pull in private package
```Dockerfile
RUN apk add --no-cache git openssh
RUN echo $'[url "git@github.com:"]\n\
  insteadOf = https://github.com/' >> /root/.gitconfig
RUN mkdir /root/.ssh && echo "StrictHostKeyChecking no " > /root/.ssh/config
```

Line 2 used to change go get from using HTTPS to SSH instead. Line 3 disable strict host checking to remove the need of user interaction when using ssh for the first time.

## Adding Custom Re-Compile Script
And the final step is to write a custom script that make use of file watcher binary and re-compile our project then there is a code change. We do that by using shell script, make it executable and move it to local binary path named `watch`.

```Dockerfile
RUN mkdir -p /app/bin
RUN echo $'#!/bin/sh\n\
pkill $MAIN_APP && echo "Killing process..."\n\
rm -r /app/bin/$MAIN_APP && echo "Removing old binary..."\n\
echo "Restarting a new process"\n\
cd /app && go build -o /app/bin/$MAIN_APP $PACKAGE/cmd/$MAIN_APP\n\
/app/bin/$MAIN_APP' > /usr/local/bin/compile
RUN chmod +x /usr/local/bin/compile

RUN echo $'#!/bin/sh\n\
find . -path ./vendor -prune -o -type f \( -name "*.go" -o -name "*.yml" \) | entr -r compile' > /usr/local/bin/watch
RUN chmod +x /usr/local/bin/watch
```

There it is a complete and final image specific for Go development. To use it for your project you just need to build it and publish it to your docker repository then write a Dockerfile and extend it as need in your project. For example

```Dockerfile
FROM {your-docker-image-name}

ENV PACKAGE={pull/package/url}
ENV MAIN_APP={path/to/go/main/entrypoint}

ENTRYPOINT ["watc"]
```
Since I know that there is the framework called Chainer of Deep Learning and Machine Learning

# Github
Here is what I have done:
https://github.com/tubutubumustard/chainer_docker.git

# Dockerfile
* Dockerfile

```

FROM ubuntu:16.04

WORKDIR /workdir

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
    python3-dev \
    python3-pip \
    python3-wheel \
    python3-setuptools \
    git \
    g++ \
    make \
    cmake \
    libblas3 \
    libblas-dev \
    && \
    rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*

RUN pip3 install --upgrade pip

RUN export CHAINER_BUILD_CHAINERX=1
RUN export CHAINERX_BUILD_CUDA=1

RUN pip3 install -U --no-cache-dir \
    'ideep4py<2.1' \
    cupy-cuda92==6.2.0 \
    chainer==6.2.0 \
    scikit-learn \
    pandas \
    matplotlib \
    jupyterlab
```

I made the Dockerfile in reference of the followings:

https://hub.docker.com/r/chainer/chainer/dockerfile

https://github.com/chainer/chainer/blob/master/docker/intel/python3/Dockerfile

`WORKDIR/workdir` is the directory for working with `JupyterLab`.

I installed `iDeep` and `CuPy` because my laptop does n’t have an NVIDIA GPU,

iDeep will be used to calculate.

If you want to use CuPy with Docker, you have to set various things.

(Let's try it if you feel to be interested in)

# docker-compose.yml
* docker-compose.yml
```
version: '3'
services:
  chainer:
    build: ./
    volumes:
      - ./workdir:/workdir
    command: jupyter lab --port 8000 --ip=0.0.0.0 --allow-root --NotebookApp.token=''
    ports:
      - 50020:8000
```

`docker-compose.yml` is for practising, so  `JupyterLab` has root permission and `token` is disabled.

# Execute container, access to `JupyterLab`
* sh

`$ docker-compose up -d`

Access via Browser
![](https://images.viblo.asia/e6397c26-ed87-4ffa-9f43-1d38a5b15562.jpeg)

Check `Chainer` version and execution environment

![](https://images.viblo.asia/3bd9bbe7-8f66-41b3-adb3-4fde6a1c6855.png)

Try to launch the `Chainer`'s tutorial

![](https://images.viblo.asia/fa312403-bb2c-45a8-81b2-1c1bf9d7b50f.png)

![](https://images.viblo.asia/49c4eacc-b329-4493-bd2e-c3b1d80fc78d.png)

![](https://images.viblo.asia/d1cb5cc3-d2fd-4a25-97e5-98246c67e9d7.png)

By the way I tried to used `CuPy`, but not succeeded

![](https://images.viblo.asia/6e89a75b-e7ec-4f40-a3d6-bc264b3b45fd.png)

# End
If you want to be enthusiast in machine learning and deep learning, it seems that there is some more useful site to read.
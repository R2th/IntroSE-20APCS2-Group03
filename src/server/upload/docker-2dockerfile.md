# 1. Dockerfile
## 1.1 Dockerfile とは ?
Docker Imageを作成するためCommandを集めるファイルです。<br>
Dockerfileにより作成されたDockerImageから自分のDockerContainerを作成できる。
    
 ![](https://images.viblo.asia/0240e699-0175-4ccc-be70-89f6131fd5b7.png)
 
=>  Dockerfile中で `どこから` + `何が入ってる` ことを定義する。
  
## 1.2 Dockerfile 書き方 ?
デモ：
![](https://images.viblo.asia/ea3c8bb1-1ace-473f-828d-c95106cd861a.png)
* DockerImage作成するため`Dockerfile`を書く。
* `webroot`フォルダーに`java app`、`web app`等ソースコードを入れる。この例では一番簡単的なhtmlファイルを実行しBrowse上にメッセージを表示するだけです。
* `start.sh`ファイルはContainerを起動する時に何のCommandが実行されると定義する。（例：mysql, nginx, redis起動）
<br><br> [GitHub](https://github.com/kieubaoduy1412/docker-basic)にソースコードを掲げたので、ご参考ください。<br><br>
#### Dockerfile中身
```
# どのOSを定義する
FROM ubuntu:16.04

# Dockerfileの著者（オプション）
MAINTAINER DuyKB<kieubaoduy1412@gmail.com>

# Ubuntu更新
RUN apt-get update

# nginxをインストール
RUN apt-get install -y nginx

# mysqlをインストール
RUN echo "mysql-server mysql-server/root_password password root" | debconf-set-selections \
    && echo "mysql-server mysql-server/root_password_again password root" | debconf-set-selections \
    && apt-get install -y mysql-server

# Hostのindex.htmlファイルをContainerにコピーする
COPY webroot/index.html /var/www/html

# CMDのフォルダー
WORKDIR /venv

# Host -> Containerにコピーする
COPY start.sh /venv

# DockerImageを作成する時に
RUN chmod a+x /venv/*

# CMD: DockerContainerを起動する時にどのCommandが実行されると定義する。
# でも、複数のCommandを実行したい場合にはENTRYPOINTを利用する。
# shファイルで複数のCommandを定義する。
ENTRYPOINT ["/venv/start.sh"]

# Containerがどのポートに関連付いていると定義する。
EXPOSE 80

```

#### start.sh中身
```
#!/bin/bash

service nginx start
service mysql start

exec $@
```




## 1.3 Dockerfile 利用仕方
##### ①  DockerfileによりDockerImageを作成
> sudo docker build -t <image_name> .
> 
<br><br>
##### ②  作成されたImageからContainerを作成
>sudo docker run -v <forder_in_computer>:<forder_in_container> -p <port_in_computer>:<port_in_container> -it <image_name> /bin/bash

*  -v : HostからContainerまでマウントする
*  -p: HostのPortからContainerのPortに関連付ける
*  -it: Containerを起動し/bin/bashでTerminalを開く
<br><br>
#### 例：
> docker build -t docker-example .<br>
> docker run -p 9001:80 -it docker-example /bin/bash

![](https://images.viblo.asia/5d907152-61df-42cf-8624-3ad868b0cb08.png)

Browser上

![](https://images.viblo.asia/3aa49d3a-4dea-4ce5-b623-bb046ffaab9a.png)

# 2. Dockerhub
## 2.1 Dockerhub とは ?
GithubのようにDockerのImageの保存・シャア場所です。
<br>今までの例はローカルのみでビルドしているですが、DockerHubはサーバーにビルド出来るようにサポートする。

## 2.2 Dockerhub と GitHubを繋げる 
* 先ほど[docker-basic](https://github.com/kieubaoduy1412/docker-basic)をGithubに掲げる。

![](https://images.viblo.asia/76f57f66-e8bb-40aa-a4fb-cce841485bf9.png)

*  [docker-hub](https://hub.docker.com/)上にRepository新規作成しGithubのRepositoryに繋げるように設定する

![](https://images.viblo.asia/f0fc079f-dd29-4bd9-bd99-1306d961237f.png)
   
![](https://images.viblo.asia/1a57cf23-9d1b-4dfa-906b-95e9788f7e5e.png)

ここまでで設定が終わり。Githubを何かPushがあれば自動的にDockerHubが変更されるようになった。
## 2.3 デモ
#### 背景：
[GitHub](https://github.com/kieubaoduy1412/docker-basic)にindex.html修正しCommitした後で[DockerHub](https://hub.docker.com/repository/docker/kieubaoduy1412/github-docker)にて自動的にImageをビルドすることを確認する。<br><br>
##### ① 修正前
> docker pull kieubaoduy1412/github-docker
> <br>docker images
> <br>docker run -p 9001:80 -it kieubaoduy1412/github-docker /bin/bash


![](https://images.viblo.asia/c3671401-8d25-4459-8167-9ea4c39d11a2.png)

Browserを開く結果：
![](https://images.viblo.asia/39788a29-16f8-401b-b412-92cc0ba73043.png)

<br><br>
##### ② ソースコード修正とコミット
Htmlファイル中身を修正
![](https://images.viblo.asia/9e542104-40f3-4347-8633-dbee176675a3.png)

<br><br>
##### ③ DockerHub確認
GithubのコミットをトリガーとしてDockerHubにて自動的にImageをビルドする
![](https://images.viblo.asia/fcc8508b-5d20-4dcc-81d3-4681dcd2b4b2.png)

![](https://images.viblo.asia/018d8c8c-2656-41b7-b83b-acd6e367e49a.png)


<br><br>
##### ④ 修正後
DockerHubにて正常にビルドした後で再度ImageをPullし実行する
> docker pull kieubaoduy1412/github-docker
> <br>docker images
> <br>docker run -p 9002:80 -it kieubaoduy1412/github-docker /bin/bash

![](https://images.viblo.asia/304e770a-6706-45a8-a35f-e983f571730d.png)
Browserを開く結果：

![](https://images.viblo.asia/44f7bab3-41b3-438a-a7ab-64cc1b75347f.png)

### 参考資料
* [Dockerfile紹介](https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-2-dockerfile-RQqKLzeOl7z)
### 参考ソース
* [GitHub](https://github.com/kieubaoduy1412/docker-basic)
* [DockerHub](https://hub.docker.com/repository/docker/kieubaoduy1412/github-docker)
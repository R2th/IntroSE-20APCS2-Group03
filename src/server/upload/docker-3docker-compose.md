# 1. Docker-compose
## 1.1 Docker-compose とは ?
* [Chapter2](https://viblo.asia/p/docker-2dockerfile-1VgZv6jMZAw)にてDockerfileを利用により環境を構築するとわかりました。
* でも、DockerHubにある複数Imageを流用するとか、色々な提案に共有のデータベースを作成したい場合はどうやるべきですか？

➡　**別別のContainerを繋げるようにdocker-composeが生成される。**

![](https://images.viblo.asia/3cdecc9e-9a8d-4cb1-a331-bdce63dbfa49.png)

## 1.2 インストール
[DockerCompose ](https://docs.docker.com/compose/install/)をダウンロードしインストールする。
<br>インストールしてからインストールされているかチェックする。

```
docker-compose -v
```

![](https://images.viblo.asia/2dc3c8a1-e748-4969-acfc-95788f2eef66.png)


# 2. 利用仕方
## 2.1 背景
下記通りにdocker-composeを作成する
* ① **Container1:** アプリは`Springフレームワーク`利用する
* ② **Container2:** データベースは`MySQL`です
<br><br>今回のデモは簡単的な**シナリオ**：①アプリは②データベースに接続しデータを取得し表示する。

## 2.2 作成手順
### ① 要求に応じてロカールで簡単的アプリを作成する<br><br>
##### ブラウザ上：

![](https://images.viblo.asia/059ee309-3da9-45aa-8d98-142033a79015.png)


##### MySQL：

![](https://images.viblo.asia/a6602577-368b-4b91-b556-52d6320bf89c.png)

<br>

### ② Docker上にアプリをデプロイする<br><br>
##### 1. ファイルごとの役割説明
![](https://images.viblo.asia/2f355e52-5d1f-4dca-941a-5c231dae9b71.png)
* **docker-composer.yml**
<br>プロジェクトのContainerを定義・設定する

* **Dockerfile**
<br>[[Docker] 2.Dockerfile](https://viblo.asia/p/docker-2dockerfile-1VgZv6jMZAw)にて説明済み


##### 2. ファイル中身
* docker-composer.yml
<br>**ポイントとしては** *environment* **変数**。SpringコンテナーとMySQLコンテナーを連携するため。

```
services:
  spring-webapp:
    # Image名
    image: compose-1
    # Container名
    container_name: spring-container
    # Dockerファイルからビルドする
    build: .
    # Port定義
    ports:
      - "9008:8080"
    networks:
      - employee-mysql
      
    #　アプリ内利用するの変数
    environment:
      DATASOURCE: jdbc:mysql://mysql-database:3306/testdb?allowPublicKeyRetrieval=true&useSSL=false
      
    # データベースを先に起動すると定義
    depends_on:
      - mysql-database

  mysql-database:
    # Image名 (DockerHubからpullする)
    image: mysql:8
    container_name: mysql-container
    restart: always
    networks:
      - employee-mysql
    environment:
      - MYSQL_ROOT_PASSWORD=root


networks:
  employee-mysql: 

```


* Dockerfile

```
FROM tomcat:8-jdk15-openjdk-oracle

RUN rm -rf /usr/local/tomcat/webapps/HelloSpringMySQL.war

COPY webroot/webapps/HelloSpringMySQL.war /usr/local/tomcat/webapps/

CMD ["catalina.sh","run"]

```
<br>

##### 3. Docker上にアプリをビルドする
* `compose-1`コンテナーをビルドする
<br>例では単純にDocker ImageをPullするから、このステップが要らなくてもいいですが
<br>実際にはWebappのImageをPullしたら色々Commandを実施しないと（[Dockerfile](https://viblo.asia/p/docker-2dockerfile-1VgZv6jMZAw)に参考）ので、このポストにて実際的な例を出したいとおもう。

```
docker build -t compose-1 . 
```

![](https://images.viblo.asia/d35af763-d543-44f5-84d0-433b7493cb15.png)

* composerを起動し上のコンテナーを`mysql`コンテナーに繋げる
```
docker-compose up
```

![](https://images.viblo.asia/59692c0d-81ea-4285-a07a-07d894c29d92.png)

`docker-compose`の中でdocker-compose.ymlにて定義された`mysql-container`と`spring-container`コンテナーを起動したことを確認できる

![](https://images.viblo.asia/5d97f745-432f-4fdf-81c9-db8663c6076f.png)

* 結果：
<br>アプリが正常にデプロイ出来ましたが、データベースが初期されてないので、エラー500が出ている。

![](https://images.viblo.asia/3d1a55b2-b8fa-4456-b477-d19e8bc99220.png)



### ③ データベースを初期し確認する<br><br>
##### 1. データベースを初期する
```
docker container exec -it d9388157a7f4 bash

mysql -u root -p

create database testdb;

use testdb;

CREATE TABLE hello (
    ID int NOT NULL AUTO_INCREMENT,
    test varchar(255) NOT NULL,
    PRIMARY KEY (ID)
);

INSERT INTO hello (test) VALUES ("Duy");
```

![](https://images.viblo.asia/7fcbc046-9cb1-4a47-8934-9dda9706c4a7.png)

##### 2.結果確認
* 結果：<br>二つのContainer (WebAppとDB)を連携できるようになりました。<br>ソースコードは[Github](https://github.com/kieubaoduy1412/Docker-Compose)に投げましたのでご参考ください。


![](https://images.viblo.asia/7680b485-062c-4bdd-b262-96bc154f74d3.png)



<br><br>
### 参考資料
* [Docker compose](https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-3-docker-compose-3P0lPm6p5ox#_92-truong-hop-cho-du-an-dang-phat-trien-10)
### 参考ソース
* [GitHub](https://github.com/kieubaoduy1412/Docker-Compose)
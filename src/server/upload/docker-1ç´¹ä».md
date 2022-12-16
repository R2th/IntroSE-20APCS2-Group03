# 1. 概要
## 1.1 Containerlization とは ?
1. 昔のサーバーのモデルは以下の写真通りです。<br>
    *   `物理サーバー` + `OS` + `アプリ`

    ![](https://images.viblo.asia/a90a70f8-e810-4637-9968-d1608aeac6d5.png)

    *   **問題：**
        * ①  一つのサーバーは一つのOSのみをインストール出来る。
        * ② RAM、ROM等サーバーの資源が一杯有っても全部利用きれない。


2. 後で仮想化 `virtualization`が生成された。<br>
    *   VitualBoxとかVMWare等を使って`一つの物理サーバ`ー上に`複数OS`をインストール出来るようになる。
   
      ![](https://images.viblo.asia/dc3bbd3a-749f-47e5-b301-525156418a34.png)
      
      *   **問題：**    
           * 資源について
             * VitualBoxを起動するためのHOSTから資源提供するのを必ず定義する。VitualBoxを起動したら`利用しなくても`定義されたHOST`資源が掛かります`。これは`勿体ない`ことです。
            * 時間：
              * 仮想マシンの起動と終了は`時間がかかる`。

3. 次の段階にて `containerlization`技術が発明された。<br>
    *   こちら技術に応じて `virtualization`と同様に`一つの物理サーバ`ー上に`複数OS`をインストール出来るだけではなく作成された仮想マシンもHostOSの資源を共有に利用できます。

    ![](https://images.viblo.asia/41180596-afee-4960-8d58-076555395048.png)
    
 
 ## 1.2 Container とは ?
 イメージとしては`Container`に必要な環境を入れる。環境を構築したい方はアプリ起動するためのアプリをインストール必要がありません。該当する`Container`を検索し起動すれば済みです。利用しない時に`Container`を終了又は削除する。端末に影響が無い。
 
 ## 1.3 Docker誕生 
  `virtualization`を利用したかったら`Virtualbox` とか `VMware`を利用する。`Containerlization`を利用したかったら`Docker`を使う。
  
  # 2. インストール
* https://docs.docker.com/get-docker/ にてOSごとのファイルをdownloadしインストールする。
<br>結果：Window端末

  ![](https://images.viblo.asia/f985c9c1-b630-47af-829a-a91b1a9e4980.png)
  
  Docker のバージョンをチェックするコマンド
>   docker -v
>   
![](https://images.viblo.asia/bb7156b5-2a11-44a5-a4df-97157bc9b344.png)

* 例：TomcatのContainerを作成し起動する
1.  Docker HubからImageをPullする

> docker pull image_name
 
 
  2. Imageを実行しContainerを作成する

> docker run -v <forder_in_computer>:<forder_in_container> -p <port_in_computer>:<port_in_container> -it <image_name> /bin/bash
* 例：Tomcatサーバーを起動する
> docker pull tomcat:8.0.51-jre8-alpine
> <br>docker run -p 9005:8080 tomcat:8.0.51-jre8-alpine


![](https://images.viblo.asia/ed9601d0-8fc8-41ac-aaf1-1d29c75f3400.png)

### 参考資料
* [Docker紹介](https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-1-lich-su-ByEZkWrEZQ0)
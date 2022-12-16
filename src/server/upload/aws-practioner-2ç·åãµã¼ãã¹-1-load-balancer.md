## 1.基本
### ELBで実現できるシステム
* スケーラブル：複数のEC2又はECSコンテナ...に負荷分散
* 高い可溶性：複数のAZにある複数のEC2の中から正常なTargetにのみ振り分け


![](https://images.viblo.asia/bced3a34-e512-44d6-a6b3-4e3ee191683f.png)



### ELB自体の特徴
* スケーラブル：ELB自体も付加に応じてキャパシティーを自動増減
* 安価な従量課金：従量課金で利用可能
* 運用管理が楽：マネージドサービスなので管理が不要
* 豊富な連携機能：AutoScaling, Route53, CloudFormation...などと連携
## 2.種類
* **ALB（Application Load Balance）**
* **NLB（Network Load Balancer）**
* **CLB（Classic Load Balancer）:** CLBの機能のほとんどはALBとNLBでカバーされていますので、基本的には後発のALB, NLBの2つを使い分けます。CLBでしか実現できない要件がどうしても外せない場合にのみCLBを使います。CLBだけの機能はわずかです。
<br><br>**※ ケースによって種類を適当に選択するについて[種類のLBの比較と使い分け](https://qiita.com/suzuki-navi/items/a8f4e21d75e685df51e9)リンクに参照してください。**
### ALBとNLBの違う

| | ALB |NLB | 
| --------| -------- | -------- | 
| リスナーsupport protocol| ● Http <br> ● Https <br> ● Http/2   | ● TCP: Segment順番あり <br> ● UDP: Segment順番なし <br> ● TLS| 
| Layer| OSI model (TCP/IP Protocol Layer) の**Layer7 (Application layer**)と見なす <br>![](https://images.viblo.asia/9cc8c377-f26b-42eb-9443-8c403eab9c1c.png)     | OSI model (TCP/IP Protocol Layer) の**Layer4 (Transport layer**)と見なす<br>![](https://images.viblo.asia/0d28488d-2937-4d0c-9177-fc0d9342f084.png)
| クロスゾーン負荷分散| デフォルトで**有効** | デフォルトで**無効** | 
| | SSL/TLS 証明書あり | SSL/TLS 証明書あり | 

### SSL証明書について
● **概念**
<br>インターネット接続を安全に保ち、2 つのシステム間で送信される機密情報をすべて保護し、犯罪者があらゆる情報（個人情報の可能性がある情報を含む）を読み取ったり改変したりできないようにするための標準的な技術です
<br><br>
● **仕組み**

![](https://images.viblo.asia/58c74105-df47-4281-89b6-23c92c93817f.png)

## 3.LBの成分
![](https://images.viblo.asia/355c59ba-e4db-46fc-8d99-2d67c107a99c.jpg)

* **リスナー**：設定したProtocolとPortによって接続リクエストをチェックするプロセス。
* **ルール**：ルールによってLBが一つ以上のTargetGroup内のTargetにRoutingする。
* **ターゲット**：確立されたルールに基づくトラフィックの送信先
* **ターゲットグループ**：リスナーを利用して一つまたは複数のTargetにRoutingする。Targerは複数のTargerGroupに属することができる。HealthCheckはTargetGroup単位でチェックできる。

## 4.LB作成手順
### 1. LBの種類を選択
作成したい種類に「作成」ボタンを押下する
![](https://images.viblo.asia/c869bf7d-0151-4a97-9591-ee4423259df5.PNG)


### 2. LBの設定
![](https://images.viblo.asia/f9418ab3-6147-400f-b0b9-0013ac4763eb.PNG)

* **必要な情報：**
  <br>**① 名前**：LoadBalance名称
 <br>**② リスナー**：ALBを選択する場合にはデフォルトでHTTP:80を追加される。　リストーを追加したかったら「リスナーの追加」ボタンを押下しProtocolとPortを申告する。
   <br>**③ VPC選択**：指定されたRegionに応じて存在しているVPCが表示される。VPCの選択によって以下のAZが自動的に更新される。どのSubnetにRoutingしたいと選択する。
 ### 3. Security設定
   前ステップでHTTPSを選択する場合にはSecurity設定の必要があります。HTTP場合には設定不要です。
   ![](https://images.viblo.asia/5d0c8c88-d0cb-4603-87c9-c54910e80f81.PNG)

 ### 4. SecurityGroup設定
   新規作成または既存のSecurityGroupを選択する。
   <br>SecurityGroupはInboundとOutbound制御を規定する。   
   
   ![](https://images.viblo.asia/6b3ed31e-e512-4acb-8bd0-349bd4bde28a.PNG)


 ### 5. Routing設定
  Routing名前、ヘルスチェックのパスを設定し「次」ボタンを押下する
![](https://images.viblo.asia/e619c982-055d-424c-b1ff-608593ff1c46.PNG)

* **必要な情報：**
  <br>**① 名前**：Routing名称
 <br>**② ターゲット種類**：リクエスト処理する種類。
   <br>**③ ポート**：ALBからリクエスト処理するBackendサーバーのPort。
  <br>**④ パス**：サーバーが死んでいるかをチェックするため。デフォルトで/var/www/htmlのindex.htmlにpingする。なければチェック出来ない。
  
 ### 6. Target登録
   RoutingしたいInstanceを選択し「登録済みに追加」ボタン押下でTargetを登録する
![](https://images.viblo.asia/bc3878a3-7d95-45a9-953c-228c4b8b69f1.PNG)
  #### Listen port, Forward postの違う
*   Listen portは外からELBまでポート
*   Forward postはELBからEC2までポート


   ### 7. 確認
   設定したパラメータを最終的な確認する
   ![](https://images.viblo.asia/f6fecdb8-7750-4c65-b050-1f69ea7882df.PNG)


### 参考資料
* [種類のLBの比較と使い分け](https://qiita.com/suzuki-navi/items/a8f4e21d75e685df51e9)
* [データ送信と受信の過程](https://medium.com/containers-on-aws/using-aws-application-load-balancer-and-network-load-balancer-with-ec2-container-service-d0cb0b1d5ae5)
* [AWS 公式オンラインセミナー](https://www.youtube.com/watch?v=4laAoK-zXko)
* [OSIモデルのLayer](https://totolinkvn.wordpress.com/2019/04/02/cac-tang-giao-thuc-trong-mo-hinh-osi/)
* [ALBとNLBの例](https://viblo.asia/p/basic-amazon-web-services-p4-maGK7Vge5j2#_32-cac-tham-so-basic-trong-heathcheck-7)
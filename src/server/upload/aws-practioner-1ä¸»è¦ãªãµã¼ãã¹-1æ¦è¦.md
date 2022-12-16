この記事では主なCoreServiceを概要的に説明する。

## 1. EC2
EC2 (ECC)は弾性 (**Elastic**)的なコンピューター (**Compute**)クラウド (**Cloud**)という略名です。
### EC2 Instance
自分の需要のために**インスタンス**を作成してからサービス定義し展開する。
<br>作成手順詳細は[こちら](https://viblo.asia/p/huong-dan-tung-buoc-tao-ec2-instance-trong-aws-4dbZNYk8KYM#_1-dang-nhap-va-truy-cap-vao-dich-vu-aws-0)です。
* AWS Consoleにログイン
* Regionを選択
* EC2 Instanceを起動
* AMI (Amazon Machine Image)を選択：Linux, MS,...
* Instanceタイプを選択：CPU, Memory, Storerage
* Instance設定：Network, public IP
* Storageを追加
* Tagを追加：Instanceが複数ある場合には区別するためにInstance名、環境等情報を表す
* Security Groupを設定：UserはHTTP, SSHなどAWSに繋げる手段を定義する。

## 2. Storage

### S3
S3 (**Simple Storage Service**)  は、業界をリードするスケーラビリティ、データ可用性、セキュリティ、およびパフォーマンスを提供するオブジェクトストレージサービスです。詳細は[リンク](https://aws.amazon.com/jp/s3/?gclid=Cj0KCQiA7qP9BRCLARIsABDaZzhrrZyfRZT1RGRkATax-1Nr_NWucYiMUkdFGQqNAhlNO4JVXhbcohoaAjd8EALw_wcB&sc_channel=PS&sc_campaign=acquisition_JP&sc_publisher=Google&sc_category=Core&sc_country=JP&sc_geo=JAPN&sc_outcome=devadopt&sc_detail=aws%20s3&sc_content=sitelink&sc_segment=470061306391&sc_medium=ACQ-P|PS-GO|Brand|Desktop|SU|Core-Main|Core|JP|EN|Text|dx&ef_id=Cj0KCQiA7qP9BRCLARIsABDaZzhrrZyfRZT1RGRkATax-1Nr_NWucYiMUkdFGQqNAhlNO4JVXhbcohoaAjd8EALw_wcB:G:s&s_kwcid=AL!4422!3!470061306391!e!!g!!aws%20s3)を参考してください。
<br><br>利点：
* セキュリティが高い。
* 幅広くサポートされているクラウドストレージサービス。
* アクセスが簡単。

### EBS
EBS (**Elastic Block Store**) はEC2と共に使用するために設計された、スループットとトランザクションの両方が集中するどんな規模のワークロードにも対応できる、使いやすい高性能なブロックストレージサービスです。詳細は[リンク](https://aws.amazon.com/jp/ebs/?ebs-whats-new.sort-by=item.additionalFields.postDateTime&ebs-whats-new.sort-order=desc)を参考してください。
<br><br>利点：
* データ移動するためにAmazon EBS スナップショット共有できる

<br>作成しアタッチ仕方：
* EC2サービスを選択 → 「Elastic Block Store」タグの下に「ボリューム」を選択 → 「ボリュームの作成」ボタンを押下
![](https://images.viblo.asia/2284a85c-9842-417e-9963-b07b56b9d94f.png)
* 情報を入力 → 「作成」ボタンを押下 → Instanceを選択 → 「アクション」を押下 → 「アタッチ」ボタンを押下 → EC2を選択する
![](https://images.viblo.asia/6ca29a31-d427-4790-925d-846294bc9da5.png)


### EBS、EFS、S3の違い

| EBS | EFS | S3 |
| -------- | -------- | -------- |
| 同じRegion     | 異なるRegionでも大丈夫     | EC2限界無し     |
| 一つEC2だけ繋げる    | 複数EC2に繋げる   |  データ種類と問わず   |

参考資料：<br>
https://helpex.vn/question/aws-efs-vs-ebs-vs-s3-su-khac-biet-amp-khi-nao-nen-su-dung--5cb7ded7ae03f646703c47a1

## 3. Global Infra
### Region
Avaiable Zoneの2個以上を持つ 物理エリアという意味です。
Regionによってタイムラグとコストが異なるので、Instanceを作成する時にどのRegionを選択かを検討が必要。
### Avaiable Zone
リージョンごとにアベイラビリティーゾーンと呼ばれる複数の独立した場所があります。インスタンスを起動するときに、アベイラビリティーゾーンを自分で選択するか、自動的に選択されるようにできます。
<br>インスタンスを複数のアベイラビリティーゾーンに配布する場合は、1 つのインスタンスで障害が発生したら別のアベイラビリティーゾーンのインスタンスが要求を処理するように、アプリケーションを設計できます。
<br>同じRegionにデータセンターのコレクションである。一つのセンターで障害が発生する時にも残りのデータセンター間の接続も維持する。

![](https://images.viblo.asia/829ca7dd-0441-4966-bf08-06b7f7e0af94.png)

### Edge Location
End-userにcontentを送信する。Userからリクエストが自動的に最近のEdgeLocationに判断し送信する。

## 4. VPC
VPCはAWS大切なものの一つです。説明は簡単ではないので、分けて紹介させていただく。
### [主なServiceを説明](https://viblo.asia/p/aws-practioner-vpc%E3%81%AB%E9%96%A2%E9%80%A3%E3%81%99%E3%82%8Bcoreservice-bWrZnmqQKxw)
### [VPCを作成手順の例](https://viblo.asia/p/aws-practioner-1coreservice-4vpc%E4%BD%9C%E6%88%90%E6%89%8B%E9%A0%86-RnB5pbLwZPG)


## 5. Security Group

![](https://images.viblo.asia/61225fdc-0002-40c1-a284-e00a542d72fe.png)

### 作成方法
EC2のDashBoard画面にて「セキュリティグループ」クリックし「セキュリティグループを作成」ボタンを押下する。
以下通りに情報を入力する
* ①：セキュリティグループ名
* ②：どのVPCに属するかを選択する
* ③：Inbound指定。以下の写真にてSSHからアクセスを許可にする
* ④：Outbound指定。以下の写真にて無制限にOutbound出来ると設定している。

![](https://images.viblo.asia/941d363b-fff8-4be0-a1fe-c33cdd5a35c5.png)

### EC2 Instanceに付ける
EC2のDashBoard画面にて②で選択したVPCに属するEC2をクリックし「アクション」→ 「セキュリティ」→ 「セキュリティグループ変更」選択し作成したSecurity Groupを選択する
<br>一つのGroupは複数のInstanceに付けることが出来る。

![](https://images.viblo.asia/2c4cba68-d534-4e2e-8fd4-8a681f42b068.png)


### 参考資料
* [EC2Instanceを作成手順](https://viblo.asia/p/huong-dan-tung-buoc-tao-ec2-instance-trong-aws-4dbZNYk8KYM)
* [EBS、EFS、S3の違い](https://helpex.vn/question/aws-efs-vs-ebs-vs-s3-su-khac-biet-amp-khi-nao-nen-su-dung--5cb7ded7ae03f646703c47a1)
* [VPCに関連するサービス](https://viblo.asia/p/aws-practioner-vpc%E3%81%AB%E9%96%A2%E9%80%A3%E3%81%99%E3%82%8Bcoreservice-bWrZnmqQKxw)
* [VPCの作成手順](https://viblo.asia/p/aws-practioner-1coreservice-4vpc%E4%BD%9C%E6%88%90%E6%89%8B%E9%A0%86-RnB5pbLwZPG)
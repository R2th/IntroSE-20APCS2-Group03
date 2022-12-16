VPCに関連するCoreServiceについて概要的に紹介されていただく。
以下の写真にはVPCのメイン機能を順番に説明する。

![](https://images.viblo.asia/35d2e280-e2e2-4032-8b85-5a62c6a1ad4b.png)


## 1. VPC
**VPC** (Virtual Private Cloud)は自分 (**Private**) で定義できる仮想 (**Virtual**)クラウド (**Cloud**)という意味です。IP帯を選択するから、subnet作成、route table、gateway定義、安全性及びデータベースにアクセスためにIPv4とIpv6利用するまで自分で決定する環境を作成できる。

VPCの設定も更新できる、他のVPCからアクセスPublic Subnetも作成できる、逆にインターネットをアクセスしないPrivateのサーバーとデータベースも作成できる。安セキュリティを強化ためにRoute table, net gatewayによってセキュリティのレイアを追加できる。
## 2. Subnet
管理しやすいのためにVPCを**Subnet**に仕切る。一つのsubnetに複数のinstanceがあることが出来る。
<br>通常はPublicとPrivateに分ける。PublicはInternetにアクセスするServiceに向け、むしろPrivateはInternetにアクセス不要のService（例：データベース）。詳しくは[Subnetの詳細](https://viblo.asia/p/aws-practioner-subnet-OeVKBNLAKkW)に参考してください。

## 3. Gateway
VPCは**Gateway**経由にInternetに繋がる。route提供するによってInternetに繋げるのを許可する。Internet GatewayによってInstanceがInternetに繋げる、かつ外のresouceもこのInstanceにアクセスできるようになる。

## 4. Route Table
簡単というと**Table**を見てから**Route**をわかるようになる。例えばSubnetAからSubnetBまで行ける、SubnetCは外のインターネットにアクセスできる。一つのSubnetは一つのRoute Tableに繋げるけど、一つのRoute Tableは複数のSubnetに紐づくできる。

## 5. EC2 Instance
インスタンスとは AWS クラウドにある仮想サーバーです。EC2を作成仕方について[リンク](https://viblo.asia/p/aws-practioner-coreservice-gAm5yyew5db#_1-ec2-0)を参考してください。

### 参考資料
* [Subnetの詳細](https://viblo.asia/p/aws-practioner-subnet-OeVKBNLAKkW)
* [EC2 Instance作成仕方](https://viblo.asia/p/aws-practioner-coreservice-gAm5yyew5db#_1-ec2-0)
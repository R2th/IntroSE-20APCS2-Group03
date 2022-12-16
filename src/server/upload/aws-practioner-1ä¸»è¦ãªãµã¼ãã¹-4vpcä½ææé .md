一つのVPC内でどのSubnetがインターネットにアクセス出来るのを許可する、二つのSubnetの連携を定義するなど自分で設定出来る。

![](https://images.viblo.asia/d00515d3-c85f-486e-a517-07eaa17355e3.png)

上のイメージで以下に設定されている
* Subnet1がInternet Gateway経由でInternetアクセス出来る。その他にRoute table設定によってSubnet1はSubnet2とSubnet3にも繋げている。
* Subnet2はPrivate Subnet、Internetに接続出来ない。VPC内Subnet1とSubnet3に繋げる。
* Subnet3もPrivate Subnet、Internetに接続出来ない。でも、Private gateway経由でCustomerからアクセス出来る。逆にSubnet 3内のInstanceからCustomerのNetworkにもアクセス出来る。
## 1.作成手順概要
1. VPC作成
2. Subnet作成　**(どのVPCに属するかを指定)**
3. Gateway作成  **【どのVPCに属するかをアタッチ】**
4. RouteTable作成　**(どのVPCに属するかを指定)**　→  **【どのSubnetに属するかをアタッチ】**
5. Instance作成　**(どのVPCとSubnetに属するかを指定)**
<br>※`()`の中で作成している時に指定する、`【】`は作成してから別画面にてアタッチするという意味です。

## 2.作成手順詳細
### Step1: VPCを作成

![](https://images.viblo.asia/932778d4-78ea-4d57-8536-2190b585850a.png)


* **必要な情報：**
<br>**① 名前タグ**：VPC名
 <br>**② IPv4 CIDR ブロック**：VPC の IPv4 アドレス範囲を指定
  
### Step2: **Subnetを作成**

![](https://images.viblo.asia/4b1b17cf-befb-4e97-87bd-a85794b6d865.png)


* **必要な情報：**
  <br>**① 名前タグ**：Subnet名
 <br>
 <br>**② VPC**：どのVPCに所属するかを指定
  <br>VPCを選択したら選択されたVPCに該当する情報が自動的に「VPC CIDR」所に表示される。
   <br><br>**③ アベイラビリティーゾーン**：どこAZに所属するかを指定。
   <br>Regionによって選択しているRegion内に該当するAZが自動的に表示される。
    <br>自動的に選択するには「指定なし」を選択する。
    
    ![](https://images.viblo.asia/5fb86251-05f8-4500-90e2-a9102502e590.png)
    
    <br> <br> **④ IPv4 CIDR ブロック**：の IPv4 アドレス範囲を指定
    <br>※VPCのIPに存在しないIPを指定する場合にはメッセージエーラが出る。
    
    ![](https://images.viblo.asia/520762c2-edda-48f9-b3b6-5050a5a283b5.png)


    <br>※VPC内で存在しているIPと重複している場合にもメッセージエーラが出る。
    
    ![](https://images.viblo.asia/defcceed-cfc9-4d80-a873-b39cddb94c0b.png)

    ☆ IP指定について[IPとSubnet](https://viblo.asia/p/aws-practioner-1coreservice-3subnet-OeVKBNLAKkW#_1-ip-address-0)に参考してください。
    
### Step3: **Gateway作成とアタッチ**
#### 作成
「名前タグ」にGateway名を入力し「インターネットゲートウェイの作成」ボタンを押下する。
 
 ![](https://images.viblo.asia/00788d5b-0bb0-4c9c-9f99-538204d1bb7c.png)

#### アタッチ
Dashboard画面にてInternetGatewayをチェックし「アクション」ボタンを押下し「VPCにアタッチ」をクリックしアタッチしたいVPCを選択する。

![](https://images.viblo.asia/5858f6b5-e05f-4723-8583-dc28d1dfb939.png)


### Step4: **RouteTable作成、アタッチ、編集**
#### 作成
「名前タグ」にRouteTable名を入力しVPCを選択し「作成」ボタンを押下する。

![](https://images.viblo.asia/68d81cfb-50a7-4e09-976d-ea04c88b007d.png)

#### アタッチ
Dashboard画面にてRouteTableをチェックし「アクション」ボタンを押下し「サブネットの関連付けの編集」を選択する。

![](https://images.viblo.asia/89bf466a-e3f9-4718-8a06-f939291b71c8.png)

「サブネットの関連付けの編集」画面にて選択したVPCのsubnetが全部表示される。RouteTableをアタッチしたいsubnetを選択し「保存」ボタンを押下する。

![](https://images.viblo.asia/259f1ebf-067a-4203-99d5-da4e008369b9.png)

#### 編集
Dashboard画面にて「ルートテーブル」チェックし「ルート」タグ下に「ルート編集」ボタンを押下する。
![](https://images.viblo.asia/f85d441a-0a6c-4866-9d7b-49686b5260d5.png)

①デフォルトにlocalの送信先はRouterにする。
②Gatewayにするには②通りに設定する。
![](https://images.viblo.asia/9e684c34-c4e8-4460-bc39-a5948d3c4ade.png)


### Step5: EC2 Instance作成
EC2作成手順は[このリンク](https://viblo.asia/p/aws-practioner-1coreservice-1%E6%A6%82%E8%A6%81-gAm5yyew5db#_ec2-instance-1)に参考してください。ステップ３でどのVPCとSubnetに属するかを指定する。

![](https://images.viblo.asia/9aadd0ee-2c39-4fbc-b1a9-dd6c43697ef2.png)

<br>

### 参考資料
* [PublicとPrivate Subnetを含めるVPC作成手順](https://cuongquach.com/tao-aws-vpc-public-subnet-va-private-subnet.html)
* [VPC利点, 性能, 成分](https://cuongquach.com/aws-vpc-la-gi.html)
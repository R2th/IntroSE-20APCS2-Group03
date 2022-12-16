[VPCに関連するCoreService](https://viblo.asia/p/aws-practioner-vpc%E3%81%AB%E9%96%A2%E9%80%A3%E3%81%99%E3%82%8Bcoreservice-bWrZnmqQKxw)に紹介されたサービスの一つはSubnetです。SubnetからInternetにデータを送信するためのProtocolの一つはTCP/IPです。この記事でTCP/IP Protocolの成分、Internetに繋げる仕組みについて説明する。

![](https://images.viblo.asia/db67e937-35e0-46be-b6dc-5e1752cfe8fa.jpg)
## 1. IP Address
Internet Protocolを利用中のコンピューターに付けるIP帯です。IPv4とIPv6二つの種類に分ける。
<br>[IPv4とIPv6の違い](https://v1study.com/news-su-khac-nhau-giua-ipv4-va-ipv6.html)



|  | IPv4 | IPv6 |
| -------- | -------- | -------- |
| ビット数    | 32 ビット<br>=8 ビット (1 octet) * 4    | 128ビット<br>=16 ビット (1 octet) * 8     |
| 例|  ●  192.168.1.1  <br>→ 11000000.10101000.0000<br>0001.00000001 |    ●  2001:0f68:0000:0000:0000:<br>0000:1986:69af <br>→ 0010000000000001:0000<br>111101101000....<br>※ 0000なら省ける → 2001:f68::1986:69af




<br>IPv4に対して32桁で表示する。Userが読みやすくなる為に8桁ごとに`.`で分けて書く。例：172.214.174.192

![](https://images.viblo.asia/da8d2a9a-7f40-4d19-8fe0-82502af37522.png)


IP AddressがA,B,C,D,Eの5つのクラスに分けている。
<br>最初のビットによってどのクラスに所属するか判断する。
Aクラスの最初ビットは０、Bクラスは10、Cクラスは110、Dクラスの最初4ビットは1110、Eクラスは1111。それから、上のイメージでのIP AddressはクラスCに属している。
<br>現在点にはA,BクラスのIP Adrressが使い切られた、Cはまだ少し残っている。DとEは別目的の為に使っている。
## 2. Subnet Mask
上で説明したIP Address量に対して規模が広いインターネットシステムではすぐ使い切る状態になっているけど、会社内など規模が小さいシステムにとってこのIP Address量を使い切るのは無理です。更にシステム内コンピューターを管理するのは問題が発生する可能性がある。それから、IPを子IPに分ける為に**Subnet Mask**を使う

![](https://images.viblo.asia/4ae488bb-2564-4a0a-aa9e-c2304a72b0ad.png)

IPv4でSubnetMaskを書き方は二つがあります。
<br><br>**① IP Addressを判断するように左からビット数を書く。**
<br>この方法ではIPの末尾に定義し`/`で分ける。
<br><br>例：`192.168.1.1/24`とは`192.168.1.1`がIP Address、`24`はシステム内に他IPを確定するビット数。
<br>左から`24`ビットが`192.168.1`のは `192.168.1.x` (x が0から255まで)のようなIPが同じシステムに属するという意味です。他のIPは`192.168.1.1/24`に属しないことになる。
<br><br>**② 32桁数でIPのインターネットシステムを確定する為にビット`1`を宣言する**
<br>いつも` 11…110…0, 10…0, 1…10, 11…11` 又は `00…00`という形に定義される。後でこのビットの32桁からDecimal4桁に交換する。
<br>例：`255.255.255.0`又はBinary ` (11111111) (11111111) (11111111) (00000000) `のは最初の24ビットがインターネットシステムのIPを確定する。この書き方は上の`/24`書き方と同様です。

## 3. Gateway
確定されるIPに送信する時にrouting tableに送信路を記録する。でも、どのコンピューターでも送信路をわかるわけではない。この場合では、**Gateway**経由でデータを送信する。

家庭など規模が小さいシステムではRouterはGateway機能を含めるけど、大きなシステムでいつもgatewayとrouterは同じIP Addressわけではない。

`ipconfig`コマンドでIP、該当Subnet、Gateway情報を把握できる。また、自分で設定することが出来る。

![](https://images.viblo.asia/3ade2d60-ef0f-412f-b886-cfb4db78ead9.jpg)
### 参考資料
* [IP, Subnet mask, Gateway 基本的に説明](https://bizflycloud.vn/tin-tuc/khai-niem-co-ban-ve-ip-subnet-mask-gateway-la-gi-2020092109263972.htm)
* [IPv4とIPv6の違い](https://v1study.com/news-su-khac-nhau-giua-ipv4-va-ipv6.html)
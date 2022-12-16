## 1. 背景：
**内容：S3, CloudFront, ACM, Route53を利用しS3の静的ウェブサイトをhttpからhttpsに設定する方法**

**背景：**

S3に静的ウェブサイトをドメイン名を設定したい時に、以下の手順で設定する。<br>　① S3の静的ウェブサイトホスティング作成しコンテンツをアップロードする。<br>　② Route53にてAliasレコード作成し①で作成したS3のBucketに指定する。

![](https://images.viblo.asia/50a6e72e-2296-4298-ad10-6072a562b9f1.png)

**課題：**　指定されたドメイン名にアクセスできるとなりますですが、「保護されていない通信」httpアラートが有る。
S3自体でhttpsを設定できませんので、httpsに設定したい場合はCloudFront経由でアクセスするように変更する

![](https://images.viblo.asia/f5714788-89b2-435d-87d4-47f44fdc65f2.png)


## 2. 構成：
① クライアントからRoute53に設定されたドメイン名にアクセスする<br>
② Route53からCloudFrontのコンテンツを取得し配信する。<br>
　 httpsに設定するためにCloudFront作成する時にSSL証明書を発行する必要がある。
<br>③ CloudFrontのコンテンツはS3から取得する。

![](https://images.viblo.asia/bc38d4fa-83e8-4dee-b509-269d1d2b10ba.png)

## 3. 作成順番概要：
① s3の静的ウェブサイトホスティング作成する。<br>
② SSL証明書を発行しCloudFrontを作成する。<br>
③ Route53でSubDomainをCloudFrontに指定するように設定する。

## 4. 作成手順：
### 1. s3の静的ウェブサイトホスティング作成する
① Bucket名は設定したいドメイン名と同じ入力する

![image.png](https://images.viblo.asia/8b5a7d9f-cc5e-4ce0-827e-f725e1893717.png)

② パブリックアクセスをすべて許可する

![image.png](https://images.viblo.asia/f1733bd6-5a45-4824-bbff-7ed18f5e5ad7.png)

③ 公開する為に「アクセス許可」タブにBucketPolicyを設定する

![image.png](https://images.viblo.asia/de479128-2333-4e0c-94f0-718abc5fa0b3.png)

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::resume.kieubaoduy.com/*"
        }
    ]
}
```


④「プロファイル」タブに静的ウェブサイトホスティングを有効する。

![image.png](https://images.viblo.asia/9b132411-7846-4335-bcf1-bfc7a6c30046.png)

⑤ コンテンツをアップロードしたら確認する。

![](https://images.viblo.asia/f528946b-714d-4357-ba7e-0075bbf39c03.png)

### 2. SSL証明書を発行しCloudFrontを作成する。
① AWS Certificate Managerにて新規証明書をリクエストする<br>
ドメイン名名は設定したいドメイン名と同じ入力する
検証方法はどちらでも利用出来ます。

![image.png](https://images.viblo.asia/9dfea762-f25c-48d4-b833-634de7800923.png)

②「リクエスト」ボタンを押下したら何分ぐらい後、ドメイン登録したメールに承認メールを送ります。
迷惑メールのBoxに送信する可能性がありますので、気をつけてください。

![](https://images.viblo.asia/a5ba8250-ab3b-43d5-99d4-0b49dff6bee6.png)

③ リンクを開いて「I Approve」ボタンを押下することで承認する。
![image.png](https://images.viblo.asia/89564a7b-035a-438d-ba5e-253c39d9ac53.png)

④ 以上のステップにて作成された証明書を利用しCloudFrontを作成する

オリジンドメインはs3の静的ウェブサイトホスティングを指定する。

![image.png](https://images.viblo.asia/bd2b8502-29ee-4af3-8666-c079624208c3.png)

プロトコルポリシーは「Redirect HTTP to HTTPS」に選択する

![image.png](https://images.viblo.asia/8de843ee-485b-48e7-93ef-35e63c7f0e04.png)

CNameを設定したいSubDomainを追加し、作成したSSL証明書を選択し、ルートオブジェクトはindex.htmlを指定する。

![image.png](https://images.viblo.asia/1a1ef344-e01d-4a32-8880-e625c2ebbd4c.png)

正常作成になったらcloudfrontリンクが上手く動いてること及び通信が保護されたことを確認する。

![image.png](https://images.viblo.asia/879d9f5d-a39e-4a9e-9a16-337a1f8d8f05.png)

### 3. 最終はRoute53でSubDomainをCloudFrontに指定するように設定する。
設定したいSubDomainを入力し、Aliasを有効し、CloudFront選択し作成したCloudfrontを指定し「レコード作成」ボタンを押下する。

![image.png](https://images.viblo.asia/65c97ffc-4317-4705-972f-5cdd044efbd8.png)

 🤟🤟🤟　**成果**　🤟🤟🤟
 <br>ドメイン名が綺麗になりました ♥️♥️♥️
 
 ![image.png](https://images.viblo.asia/cd782de1-a903-4d59-a63d-faeeaa76d060.png)
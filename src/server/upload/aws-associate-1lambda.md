## 1. 背景：
S3にアップロードするWebを作成する
## 2. 構成：
① クライアントからAPIGatewayにアクセスする<br>
② Lambda機能をコールする<br>
③ クライアントがアップロードするファイルをS3に書き込む

![](https://images.viblo.asia/7fbce97e-07b9-486e-9b77-fa84e0da1af2.png)
## 3. 処理概要：
1. クライアントからファイル名存在しているかをチェックするリクエストを送る
2. サーバーはpresigned_urlを作成し返却する
3. 貰ったpresigned_urlによりファイルをアップロード実行する

## 4. 作成手順：
### Step1: HTMLFrontEndを作成

![image.png](https://images.viblo.asia/58c37f29-dbf1-41e8-aaba-12067eec3629.png)


### Step2: Lambda変数を作成

![](https://images.viblo.asia/535552f1-1655-41cf-9519-737d4baf2549.png)

① 変数名<br>
② Lambda書く言語を選択<br>
③ 選択するロールの権限でLambda作成

### Step3: Lambdaコード書く
**① GETステートメントであればユーザーから送るファイル名が存在しているかをチェックする**
```
if event['httpMethod'] == 'GET':
        
        #1 ユーザーから送ったファイル名を取得し処理する
        fileName = event['queryStringParameters']['fileNameOfCSV']
        
        # どのフォルダーをチェック対象にする変数
        bucket = "XXX"
        prefix  = "YYY/"
        try :
            s3Objects = s3.list_objects(Bucket=bucket, Prefix=prefix)
            if 'Contents' in s3Objects:
                keys = [content['Key'] for content in s3Objects['Contents']]
     
                keys.remove(prefix)
                for i in range(0, len(keys)):
                    if keys[i] == (prefix + fileName) :
                        booCheckFileNameIsValid = False
                        break
     
            else:
                booCheckFileNameIsValid = False
        except:
            booCheckFileNameIsValid = False
```

**② POSTステートメントであればpresigned_urlを作成し返却する**
```
 elif event['httpMethod'] == 'POST':
        print("POST")
        #メイン
        csvFromUser = event['body']

        #1 S3に保存する
        bucket = 'XXX'
        data = json.loads(csvFromUser)

        upload_key = 'YYY/' + data['fileNameOfCSV']
        # Generate the presigned URL for put requests
        presigned_url = s3.generate_presigned_url(
            ClientMethod='put_object',
            Params={
                'Bucket': 'XXX',
                'Key': upload_key,
                'ContentType': 'text/csv', 
            }
        )
```

### Step4: APIGateway作成
**① トリガーを追加**

![](https://images.viblo.asia/5a874c14-3c41-4db1-856c-4b398a8bb124.png)

![image.png](https://images.viblo.asia/3896b35c-a620-4243-880c-995673108163.png)

**② リソース（とメゾンド）を作成**

![](https://images.viblo.asia/c76a14cb-af56-439d-ace3-ae232bc66479.png)

**③ ステージを作成**

![](https://images.viblo.asia/44de7224-8edf-4be0-9742-85644455b755.png)

作成したらURLを取得しFrontEndでAPIコール処理にて利用する
![](https://images.viblo.asia/9e8f02fc-16ad-4c54-a68d-c2a7992ce377.png)


## 5. CORS問題：
実行してみればGETステートメントで[CORS問題](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)が発生する

![image.png](https://images.viblo.asia/4ddae66e-05dd-4e3d-9af4-82bd308fc82a.png)

原因：APIGatewayの方がCORS有効を設定していない。
![](https://images.viblo.asia/7831c688-6cc8-4a87-a41b-2c6b1e4992e0.png)

でも、設定したら再デプロイするとCORS問題まだ発生している

![image.png](https://images.viblo.asia/cf91cb8b-e4cf-4262-bf8d-ab78dfe52847.png)

原因：s3にCORS設定していない。

![](https://images.viblo.asia/f62a3b9c-93b8-4bb6-858f-1ffc2e0e8312.png)

```
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "HEAD",
            "DELETE"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [
            "x-amz-request-id",
            "x-amz-id-2",
            "Content-Length",
            "Content-Type",
            "Connection",
            "Server",
            "Etag"
        ],
        "MaxAgeSeconds": 3000
    }
]
```

設定したら、再度テスト見れば正常にアップロードできました！！！

![image.png](https://images.viblo.asia/1ab606ef-779e-47a1-ae18-f68035554800.png)

![](https://images.viblo.asia/c94ea87f-2918-4d47-963e-6e68ef3390b3.png)

## 6. まとめ：
APIGateWay → Lambda → S3を概要的に紹介した。<br>
一番留意点はCORS問題です。対応方法も記載している。<br>
ソースコードもGithubに上げましたのでご参考のほどお願い致します。

### 参考資料
* [CORS問題](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
### 参考ソース
* [GitHub-AWS Lambda](https://github.com/kieubaoduy1412/AWS-Lambda-S3)
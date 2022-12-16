このポストにて利用するのは珍しけど、試験によくあった概念を纏める。
### Placement Group
* 単一のAZ内のInstanceを論理的にGroup化する。
* 低いレイテンシー：10Gbps/s。

### Neptune
* 検索結果をヒントする。

### Snowball
* 容量が大きなファイルを送信ためにサービスです。

### Athena
* S3に保存されたデータ分析Queryを実行するサーバーレスサービスです。

### ECS (Elastic Container Service)
* EC2サービスをContainer化する。

### Global Accelerator
* 一番近い物理的なEndpointにTraficをRoutingする。

### Auzora
* 大規模なDBに利用する。

### Translate
* 英語とその他の言語との間でテキストを翻訳する。

### Forecast
* 事後例予測のためのFull Managed学習サービスです。

### SageMaker
* 機械学種モデルを構成およびTraining出来るサービスです。

### Rekognition
* 映画分析と動画分析をAppに追加。

### Budgets
* 作成した予算をオーバーした時にAlertで知らせくれるServiceです。

### Cost Explore
* コストとリソースの利用状況を可視化するサービスです。

### Organization
* 複数のAccountの請求をまとめる。

### Lightsail
* WordPressを選択して簡単にサーバーを起動する。
* 月額固定できる。

### CloudWatch Log Insights
* ログを分析する。

### X-Ray
* アプリが処理するRequestに関するデータを収集する。

### System Manager
* AWSリソースの運用データを確認し運用タスクを自動化出来る。

### Pinpoint
* MobileApp向けのCampaignを管理する。

### Code
* **CodeCommit**：Version管理サービス
* **CodeBuild**：Build & Test
* **CodeDeploy**：Deploy

### DMS (Database Migration Service)
* On-premisのEC2データベースからAWSのデータベースに移動する。

### Migration Hub
* 移動タスクを一完管理する。
* 移動のStatusを詳細に把握できる。


### Server Migration Service
* On-premisサーバーからAWSへの移動にかかる時間を短縮。

### GuardDuty
* CloudTrailやVPCフローログ等から疑いActivityを検知する。

### Certificate Manager
* SSL/TLS認証のプロビジョニング、管理を行うサービス。

### EMR (Elastic Map Reduce)
* Hadoopを使った大量のデータを処理する。

### Artifact
* ComplianceのDocumentを監査者に送信。
* 利用中のAWS InfraのComplianceを示す。

### CloudSearch
* Applicationに検索機能を追加。

### OpsWork
* Chef&Puppetを使って運用を自動的にする。

### AWS Config
* リソースの設定が変更されたときにも設定項目を生成し、設定レコーダーの起動時点からリソースの設定項目の記録を履歴として保持します。
* API コールを呼び出して、リソースへのすべての変更を追跡します。

![](https://images.viblo.asia/fd9026e1-d458-4ea7-b218-a6131ced9a3a.png)

### Elastic Cache
* AWSでCacheDataを提供するサービスです。
* **利点**：
1.    速度が速い
2.    大規模及び速度が求められるシステムではDBのLoadBalance構成に対してコストが減らす。

* **週類**：

| Redis  | Memcache 
| -------- | -------- | 
| 複雑な形式データを保存できる：<br>*String, hash*| *value-key*形式しか保存出来ない     | 
| Persis的があります <br>dumpfileに保存する| Persis的が無い <br>削除した後でどこでも保存しない→回復できない | 
| MemcacheよりRAM容量を掛かる| RAM容量を掛からない| 

### Trusted Advisor & Inspector
| Trusted Advisor  | Inspector 
| -------- | -------- | 
| AWS Trusted Advisor は AWS 環境を分析し、推奨ベストプラクティスを次の 5 つのカテゴリで提供します。<br> ① コストの最適化<br> ② パフォーマンス<br> ③ セキュリティ<br> ④ 耐障害性<br> ⑤ サービスの制限| ● 自動的にアプリケーションを評価し、露出、脆弱性、ベストプラクティスからの逸脱がないかどうかを確認できます <br>● 自動化されたセキュリティ評価サービスで、AWS にデプロイしたアプリケーションのセキュリティとコンプライアンスを向上させることができます    | 
| **AWS Account & Service**に応用する | **複数のEC2 Instance中身**に応用する | 


### AWS WAF & Shield
| AWS WAF  | Shield 
| -------- | -------- | 
| ● SQL Injection<br>● Cross-site Attack <br>● OS Command Injection<br>● DDoS layer 7| ● DDoS layer 4 | 

### Scaling
| 垂直  | 水平 
| -------- | -------- | 
| Up, Down | In, Out | 
| 性能：CPUとメモリ | インスタンス数 | 

### VPC Endpoint & Pairing
| VPC Endpoint  | Pairing 
| -------- | -------- | 
| VPCとAWSサービス | VPCとVPC | 
| Privateで接続 |  |

### CloudHSM
* 一般的なしてシステムではKMSが暗号化鍵の管理サービスとしてよく利用されます。非常に高いセキュリティ要件を満たさなければならない場合は、CloudHSMを用います。

### SWFとStepFunctions
* 異なるサービスや同一サービスの複数処理をワークフロー実行させるサービスとしては、SWFとStepFunctionsの2つがあります。このうち実行フローを可視的に確認できるのは、StepFunctionsになります。
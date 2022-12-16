## 1. Giới thiệu
Như chúng ta đã biết, các thành phần trong network của Hyperledger Fabric đều chạy trên môi trường docker, nên phải luôn đảm bảo rằng các container vẫn đang trong trạng thái hoạt động, vì chỉ cần một thành phần trong đó "chết" thì cả network có thể tê liệt hoàn toàn. <br><br>
Điều này bắt buộc ta phải có cơ chế để quản lý tốt các container, khi có một container chết thì phải up nó lên ngay lập tức. Thật may là Kubernetes có thể làm được điều đó.<br><br>
           ![](https://images.viblo.asia/ffebca37-e0af-41ef-ba09-3aae013e6581.png)

Ở bài này mình sẽ không đi sâu vào tìm hiểu về Kubernetes, nên trước khi đọc bài này mình khuyên các bạn hãy tự tìm hiểu sơ qua về các khái niệm và thành phần của kubernetes trước.<br><br>
Để có thể test được ở máy cá nhân thì bạn nên cài đặt **minikube**  (môi trường kubernetes) và **kubectl** (công cụ để tương tác được với môi trường kubernetes) trên máy của mình.<br><br>
Sau khi cài đặt xong, các bạn chạy:
```bash
$ minikube start
```
để start môi trường kubernetes. Sau đó chạy lệnh sau để terminal nhảy vào môi trường kubernetes:
```bash
$ eval $(minikuber docker-env)
```
Kết thúc bài này các bạn chạy:
```bash
$ minikube stop
```
để stop minikube cho đỡ lag máy. Yên tâm là tất cả những gì bạn làm sẽ không bị mất đi.
## 2. Thực hiện
### 2.1 Chuẩn bị
Bạn clone project mẫu mà mình đã chuẩn bị để thực hành cho dễ. <br>
[hyperledger-fabric-k8s](https://github.com/tantv-918/hyperledger-fabric-k8s)<br>
Kiểm tra xem môi trường minikube đã hoạt động chưa, chạy:
```bash
$ kubectl get nodes
```
Kết quả sẽ trả về các nodes đang chạy. Nếu không bạn sẽ phải chạy:
```bash
$ minikube start
```
```bash
$ cd hyperledger-fabric-k8s/network
```

### 2.2 Tạo Persistent Volume cho Network
Như chúng ta đã biết hạn chế của môi trường docker thông thường là các container có thể chết bất cứ lúc nào, chỉ cần chết một thành phần nào đó thì network có thể tê liệt, việc backup và restore bằng tay dường như là không hiểu quả, container trong k8s cũng hay chết, thậm chí tần suất chết còn cao hơn cả môi trường docker bình thường, nhưng trong k8s có một khái niệm là **persistent volume** giúp chúng lưu trữ dữ liệu quan trọng của các container, để khi một container nào đó chết và tự động được start lại, nó sẽ vẫn có đủ dữ liệu vốn trước khi chết nó có. PersistentVolume được lưu trong **shared filesystem**. Nghĩa là miễn là container nào có quyền thì nó đều có thể truy cập vào persistem volume đó.<br><br>
Chúng ta sẽ apply một PersistentVolume với nội dung là file ```kubernetes/fabric-pv.yaml```, **persistentvolume** có chức năng bảo vệ dữ liệu tuyệt đối để backup-restore cho các pods: <br><br>
```yaml
kind: PersistentVolume
apiVersion: v1
metadata:
  name: fabric-pv
  labels:
    type: local
    name: fabricfiles
spec:
  capacity:
    storage: 10Gi
  volumeMode: Filesystem
  accessModes:
    - ReadWriteMany
  persistentVolumeReclaimPolicy: Retain
  nfs:
    path: /nfs/fabric  #Thư mục được bảo vệ trong server NFS
    server: storage.local.parisi.biz
    readOnly: false
```

<br> Thư mục ```/nfs/fabric``` lưu trữ những dữ liệu quan trọng. Xem thêm tại [docs](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)<br>
Thực hiện lệnh sau để apply:
```bash
$ kubectl apply -f kubernetes/fabric.pv.yaml
```
Kiểm tra bằng cách:
```bash
$ kubectl get pv
NAME        CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS   REASON   AGE
fabric-pv   10Gi       RWX            Retain           Available                                   32s
```
Lúc này nếu thực hiện ```kubectl get pv ``` bạn sẽ thấy có  trong danh sách có ```fabric-pv```<br><br>
Tiếp theo cần phải apply một PersistentVolumeClaim (pvc) cho PersistentVolume (pv) vừa mới apply, có PersistentVolumeClaim thì PersistentVolume mới có thể hoạt động. Nội dung file ```kubernetes/fabric-pvc.yaml```: <br><br>
```yaml
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: fabric-pvc
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 500Mi
  selector:
    matchLabels:
      name: fabricfiles
```
<br>Bạn có thể điểu chỉnh mức ```storage``` sao cho phù hợp với tài nguyên máy tính của mình. Lưu ý trong ```Kubernetes``` các resources đều match với nhau bằng ```labels``` của chúng, ```labels``` có chức năng như một định danh, nên cần phải cẩn thận để ```labels``` được match chính xác. Ở pv và pvc được match với nhau bằng ```label``` là ```fabricfiles``` <br><br>
Chạy lệnh sau để apply:
```bash
$ kubectl apply -f kubernetes/fabric-pvc.yaml
```
Kiểm tra bằng cách
```
$ kubectl get pvc
NAME         STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
fabric-pvc   Bound    pvc-9b477960-f0a1-460a-a330-27a555eddc2b   10Gi       RWX            standard       80s
```
### 2.3 Tạo Persistent Volume cho các peers
Nếu trước đây khi chạy một network Fabric ở môi trường bình thường, bạn chịu khó mày mò, bạn sẽ thấy được rằng toàn bộ thông tin quan trọng  của một ```peer``` nào đó đều được lưu trữ trong thư mục ```/var``` trên container đang chạy peer đó.<br><br>
Vì thế, chúng ta sẽ sử dụng persistent volume cho thư mục ```/var``` của mỗi peer để bảo vệ dữ liệu của chúng.<br><br>
Nội dung của một cặp ```pv```, ```pvc``` cho ```org1peer0``` sẽ như sau:<br><br>
File kubernetes/backup-org1peer0-pv.yaml:
```yaml
kind: PersistentVolume
apiVersion: v1
metadata:
  name: org1peer0-pv
  labels:
    type: local
    name: org1peer0files
spec:
  capacity:
    storage: 10Gi
  volumeMode: Filesystem
  accessModes:
    - ReadWriteMany
  persistentVolumeReclaimPolicy: Retain
  nfs:
    path: /nfs/org1peer0/var
    server: storage.local.parisi.biz
    readOnly: false
```
File kubernetes/backup-org1peer0-pvc.yaml:
```yaml
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: org1peer0-pvc
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 10Gi
  selector:
    matchLabels:
      name: org1peer0files
```
Sau đó chạy các lệnh sau:
```bash
$ kubectl apply -f kubernetes/backup-org1peer0-pv.yaml
$ kubectl apply -f kubernetes/backup-org1peer0-pvc.yaml
```
<br>Các peer còn lại cũng tương tự, bạn có thể tham khảo thêm trong repos git hub mình đã dẫn linhk ở trên.
### 2.4 Apply một Fabric Tools
Nếu như bạn nhớ lại ở bài trước, với môi trường docker thông thường thì network Fabric luôn cần có một container là ```cli``` để thông qua nó ta thực hiện các cấu hình ban đầu cho network. Container này sẽ chạy một image là ```hyperledger/fabric-tools:1.4.4``` (có thể là phiên bản khác) như một hệ điều hành cho nó. <br><br>
Trong môi trường Kubernetes (k8s) cũng vậy, sẽ có một ```container``` ```fabrictools```  ( trong một ```pod``` ```fabric-tools```) chạy image ```hyperledger/fabric-tools:1.4.4``` để thông qua nó ta connect các ```container``` khác lại với nhau thành network.<br><br> Cần lưu ý  ```container``` ở đây vẫn là khái niệm ```container``` ta đã biết trước đây, còn ```pod``` chỉ là một đơn vị quản lý ```container```, có thể có nhiều ```container``` trong một ```pod```. 
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: fabric-tools
spec:
  volumes:
    - name: fabricfiles
      persistentVolumeClaim:
        claimName: fabric-pvc
    - name: dockersocket
      hostPath:
        path: /var/run/docker.sock
  containers:
    - name: fabrictools
      image: hyperledger/fabric-tools:1.4.4
      imagePullPolicy: IfNotPresent # Nếu trong môi trường k8s vẫn chưa có image này, nó sẽ tự động pull về
      command: ['sh', '-c', 'sleep 48h']
      env:
        - name: TZ
          value: 'America/Sao_Paulo'
        - name: FABRIC_CFG_PATH
          value: '/fabric'
        - name: FABRIC_LOGGING_LEVEL
          value: debug
        - name: SYS_CHANNEL
          value: byfn-sys-channel
        - name: CHANNEL_NAME
          value: certificatechannel
      volumeMounts:
        - mountPath: /fabric
          name: fabricfiles
        - mountPath: /host/var/run/docker.sock
          name: dockersocket
```
Bạn có thể đặt là ```cli``` hay ```fabric-tools``` tùy bạn, nhưng ở đây mình thích đặt là ```fabric-tools```.<br><br>
Để ý bạn thấy ```container``` này có ít hơn biến môi trường so với ```cli``` thông thường, vì các biến đấy thay đổi theo từng câu lệnh nên mình không đặt vào đây làm gì cho mất công.<br><br>
Một điều nữa là ở ```pod``` này ta đã dùng đến ```pv``` có ```label``` là ```fabricfiles``` cho ```container``` có tên là ```fabrictools```. Giá trị ```mountPath: /fabic``` sẽ giúp mount thư mục ```/nfs/fabric``` của ```pv``` và thư mục ```/fabric``` của ```container``` lại với nhau, từ đây, các thay đổi trong thư mực ```/fabric``` của ```container``` sẽ được backup về cho ```pv``` ```fabricfiles```.<br><br>
Muốn sử dụng ```pv``` cho một ```container``` nào đó trong một ```pod``` ta phải khai báo nó đầy đủ ở 2 nơi:<br><br>
```spec.volumes[i]``` ( nhìn file trên ). Dòng này để khai báo ```pv``` cho pod.<br><br>
```spec.containers[i].volumeMounts[j]``` (cũng nhìn file trên). Dòng này khai báo ```pv``` cho mỗi ```container``` trong ```pod```<br><br>
Như vậy một ```pod``` có thể có nhiều ```containers```, một ```pod``` cũng có thể có nhiều ```pv``` và mỗi ```container``` trong ```pod``` đó có thể sử dụng tùy chọn các ```pv``` mà nó cần, miễn sao ```pv``` đó đã được khai báo trong ```pod```. <br><br>
Chạy lệnh sau để apply ```pod``` ```fabric-tools``` :
```bash
$ kubectl apply -f kubernetes/fabric-tools.yaml
```
<br>

Để chắc chắn rằng ```pod``` ```fabric-tools``` đã hoạt động, bạn chạy lệnh:
```bash
$ kubectl get pods
```
Tạo thư mục cấu hình trong **shared filesystem** thông qua container ```fabrictools``` trong pod ```fabric-tools```. Có 2 cách:
- Cách 1. Truy cập vào container + tạo + thoát khỏi container:
```bash
$ kubectl exec -it fabric-tools -- bin/bash #Vì pod fabric-tools chỉ có một container fabrictools duy nhất nên nó sẽ mặc định vào container này
root@fabric-tools: mkdir /fabric/config 
root@fabric-tools: exit
```
- Cách 2. Thực hiện trong một câu lệnh duy nhất:
```bash
$ kubectl exec -it fabric-tools -- mkdir /fabric/config
```
### 2.5 Copy các file config từ máy vào container
Mình đã chuẩn bị 2 file ```config/configtx.yaml``` và ```config/crypto-config```. Nội dung bạn có thể xem trong repos.<br><br>
Bây giừ mình sẽ copy 2 file đấy vào trong thư mục ```nfs/fabric/config``` của shared filesystem bằng cách copy chúng vào thư mục ```/fabric/config``` của container ```fabrictools```:
```bash
$ kubectl cp config/configtx.yaml fabric-tools:/fabric/config/
$ kubectl cp config/crypto-config.yaml fabric-tools:/fabric/config/
```
<br>Copy luôn thư ```chaincode```:
```bash
$ kubectl cp config/chaincode/ fabric-tools:/fabric/config/
```
<br>Copy các ```package``` cần thiết để ```chaincode``` có thể thự thi, ở bước này bắt buộc trong máy bạn bắt buộc phải có các package đó:
```bash
$ kubectl exec -it fabric-tools -- mkdir -p /opt/gopath/src/github.com/hyperledger
$ kubectl cp ~/go/src/github.com/hyperledger/fabric  fabric-tools:/opt/gopath/src/github.com/hyperledger/
$ kubectl cp ~/go/src/github.com/golang  fabric-tools:/opt/gopath/src/github.com/
```
```js
$ kubectl exec -it fabric-tools -- /bin/bash
root@fabric-tools:/# cp -r /opt/gopath/src/github.com/hyperledger/fabric/core/chaincode/lib/cid /opt/gopath/src/github.com/hyperledger/fabric/core/chaincode/
root@fabric-tools:/# exit
```
### 2.6 Tạo các cấu hình cần thiết
1. crytogen. Bước này tạo thư mục ```crypto-config```:
```js
$ kubectl exec -it fabric-tools -- /bin/bash
root@fabric-tools:/# cryptogen generate --config /fabric/config/crypto-config.yaml
root@fabric-tools:/# cp -r crypto-config /fabric/
root@fabric-tools:/# exit
```
2. configtxgen. Bước này tạo các file ```genesis.block```, ```mychannel.tx```, ```Org1MSPanchors.tx```, ```Org2MSPanchors.tx```:
```js
kubectl exec -it fabric-tools -- /bin/bash
root@fabric-tools:/# cp /fabric/config/configtx.yaml /fabric/
root@fabric-tools:/# cd /fabric
root@fabric-tools:/# configtxgen -profile TwoOrgsOrdererGenesis -channelID $SYS_CHANNEL -outputBlock genesis.block
root@fabric-tools:/# configtxgen -profile TwoOrgsChannel -outputCreateChannelTx ${CHANNEL_NAME}.tx -channelID $CHANNEL_NAME
root@fabric-tools:/# configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate Org1MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org1MSP
root@fabric-tools:/# configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate Org2MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org2MSP
root@fabric-tools:/# exit
```
3. Config đã xong, chúng ta cần giới hạn quyền truy cập vào ```/fabric```:
```js
$ kubectl exec -it fabric-tools -- /bin/bash
root@fabric-tools:/# chmod a+rx /fabric/* -R
root@fabric-tools:/# exit
```
### 2.7 Apply các Fabric CA:
Nội dung 2 file ```kubernetes/org1-ca_deploy.yaml``` và ```kubernetes/org2-ca_deploy.yaml``` đã có sãn trong repos. Nhiệm vụ của bạn là thay đôpr giá trị các ```env``` ```FABRIC_CA_SERVER_CA_KEYFILE``` và ```FABRIC_CA_SERVER_TLS_KEYFILE``` sao cho đúng với cấu hình bạn vừa gen ra, bằng cách 
```js
$ kubectl exec -it fabric-tools -- bin/bash
root@fabric-tools:/# ls fabric/crypto-config/peerOrganizations/org1.example.com/ca/
root@fabric-tools:/# ls fabric/crypto-config/peerOrganizations/org2.example.com/ca/
```
Copy các gía trị trả vể và thay thế vào 2 file mình nói ở trên.
<br><br>
Sau đó chạy các lệnh sau để apply các CA:
```js
$ kubectl apply -f kubernetes/org1-ca_deploy.yaml
$ kubectl apply -f kubernetes/org1-ca_svc.yaml
$ kubectl apply -f kubernetes/org2-ca_deploy.yaml
$ kubectl apply -f kubernetes/org2-ca_svc.yaml
```
Bạn có thể kiểm tra bằng câu lệnh quen thuộc:
```js
$ kubectl get pods
NAME                       READY   STATUS    RESTARTS   AGE
fabric-tools               1/1     Running   0          54m
org1-ca-5859bd976b-x47sc   1/1     Running   0          15s
org2-ca-5d67ccdf59-fndzg   1/1     Running   0          8s
```
### 2.8 Apply Orderer:
Ở bài này minh sử dụng ```solo``` cho đơn giản, bạn có thể xem nội dung của ```kubernetes/example-orderer_deploy.yaml``` trong repos, appy orderer:
```js
$ kubectl apply -f kubernetes/example-orderer_deploy.yaml
$ kubectl apply -f kubernetes/example-orderer_svc.yaml
```
Kiểm tra:
```js
$ kubectl get pods
NAME                               READY   STATUS    RESTARTS   AGE
example-orderer-75475b948c-bkcvr   1/1     Running   0          3s
fabric-tools                       1/1     Running   0          57m
org1-ca-5859bd976b-x47sc           1/1     Running   0          2m45s
org2-ca-5d67ccdf59-fndzg           1/1     Running   0          2m38s

```
### 2.9 Appy các peers của Org1:
Bạn xem nội dung các file ```kubernetes/org1peer0_deploy.yaml```, ``` kubernetes/org1peer0_svc.yaml```, ```kubernetes/org1peer1_deploy.yaml```, ```kubernetes/org1peer1_svc.yaml``` trong repos:
Chạy các lệnh sau để apply các peers:
```js
$ kubectl apply -f kubernetes/org1peer0_deploy.yaml
$ kubectl apply -f kubernetes/org1peer1_deploy.yaml
$ kubectl apply -f kubernetes/org1peer0_svc.yaml
$ kubectl apply -f kubernetes/org1peer1_svc.yaml
```
Kiểm tra:
```js
$ kubectl get pods
NAME                                 READY   STATUS    RESTARTS   AGE
example-orderer-75475b948c-bkcvr     1/1     Running   0          4m37s
example-org1peer0-94dbff66f-rpr4g    1/1     Running   0          9s
example-org1peer1-559569c869-dpzh6   1/1     Running   0          8s
fabric-tools                         1/1     Running   0          61m
org1-ca-5859bd976b-x47sc             1/1     Running   0          7m19s
org2-ca-5d67ccdf59-fndzg             1/1     Running   0          7m12s
```
### 2.10 Appy các peer của Org2
Tương tự như Org1.
```js
$ kubectl apply -f kubernetes/org2peer0_deploy.yaml
$ kubectl apply -f kubernetes/org2peer1_deploy.yaml
$ kubectl apply -f kubernetes/org2peer0_svc.yaml
$ kubectl apply -f kubernetes/org2peer1_svc.yaml
```
```js
$ kubectl get pods
NAME                                 READY   STATUS    RESTARTS   AGE
example-orderer-75475b948c-bkcvr     1/1     Running   0          8m5s
example-org1peer0-94dbff66f-rpr4g    1/1     Running   0          3m37s
example-org1peer1-559569c869-dpzh6   1/1     Running   0          3m36s
example-org2peer0-7466f6754c-t7cfn   1/1     Running   0          4s
example-org2peer1-786b9bc5f-74txp    1/1     Running   0          4s
fabric-tools                         1/1     Running   0          65m
org1-ca-5859bd976b-x47sc             1/1     Running   0          10m
org2-ca-5d67ccdf59-fndzg             1/1     Running   0          10m
```
### 2.11 Tạo channel
Mình sẽ sủ dụng container ```fabrictools``` trong pod ```fabric-tools``` để thực hiện:
```js
$ kubectl exec -it fabric-tools -- /bin/bash
root@fabric-tools: cd /fabric
root@fabric-tools: export ORDERER_URL="example-orderer:31010"
root@fabric-tools: export CORE_PEER_ADDRESSAUTODETECT="false"
root@fabric-tools: export CORE_PEER_NETWORKID="nid1"
root@fabric-tools: export CORE_PEER_LOCALMSPID="Org1MSP"
root@fabric-tools: export CORE_PEER_MSPCONFIGPATH="/fabric/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp"
root@fabric-tools: export FABRIC_CFG_PATH="/etc/hyperledger/fabric"
root@fabric-tools: export CORE_PEER_ADDRESS="example-org1peer0:30110"
root@fabric-tools: peer channel create -o ${ORDERER_URL} -c ${CHANNEL_NAME} -f /fabric/${CHANNEL_NAME}.tx
2020-01-07 00:35:28.195 -02 [channelCmd] InitCmdFactory -> INFO 001 Endorser and orderer connections initialized
2020-01-07 00:35:28.224 -02 [cli.common] readBlock -> INFO 002 Received block: 0
root@fabric-tools: exit
```
### 2.12 Join channel
- Join các peers của Org1:
```js
$ kubectl exec -it fabric-tools -- /bin/bash
root@fabric-tools:/# export CORE_PEER_NETWORKID="nid1"
root@fabric-tools:/# export ORDERER_URL="example-orderer:31010"
root@fabric-tools:/# export FABRIC_CFG_PATH="/etc/hyperledger/fabric"
root@fabric-tools:/# export CORE_PEER_LOCALMSPID="Org1MSP"
root@fabric-tools:/# export CORE_PEER_MSPCONFIGPATH="/fabric/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp"

root@fabric-tools:/# export CORE_PEER_ADDRESS="example-org1peer0:30110"

root@fabric-tools:/# peer channel fetch newest -o ${ORDERER_URL} -c ${CHANNEL_NAME}
2020-01-07 00:44:05.683 -02 [channelCmd] InitCmdFactory -> INFO 001 Endorser and orderer connections initialized
2020-01-07 00:44:05.696 -02 [cli.common] readBlock -> INFO 002 Received block: 0

root@fabric-tools:/# peer channel join -b ${CHANNEL_NAME}_newest.block
2020-01-07 00:44:35.054 -02 [channelCmd] InitCmdFactory -> INFO 001 Endorser and orderer connections initialized
2020-01-07 00:44:35.109 -02 [channelCmd] executeJoin -> INFO 002 Successfully submitted proposal to join channel

root@fabric-tools:/# rm -rf /${CHANNEL_NAME}_newest.block

root@fabric-tools:/# export CORE_PEER_ADDRESS="example-org1peer1:30110"

root@fabric-tools:/# peer channel fetch newest -o ${ORDERER_URL} -c ${CHANNEL_NAME}
2020-01-07 00:46:02.524 -02 [channelCmd] InitCmdFactory -> INFO 001 Endorser and orderer connections initialized
2020-01-07 00:46:02.525 -02 [cli.common] readBlock -> INFO 002 Received block: 0

root@fabric-tools:/# peer channel join -b ${CHANNEL_NAME}_newest.block
2020-01-07 00:46:38.494 -02 [channelCmd] InitCmdFactory -> INFO 001 Endorser and orderer connections initialized
2020-01-07 00:46:38.540 -02 [channelCmd] executeJoin -> INFO 002 Successfully submitted proposal to join channel

root@fabric-tools:/# rm -rf /${CHANNEL_NAME}_newest.block

root@fabric-tools:/# exit
```
- Join các peers của Org2:
```js
$ kubectl exec -it fabric-tools -- /bin/bash
root@fabric-tools:/# export CORE_PEER_NETWORKID="nid1"
root@fabric-tools:/# export ORDERER_URL="example-orderer:31010"
root@fabric-tools:/# export FABRIC_CFG_PATH="/etc/hyperledger/fabric"
root@fabric-tools:/# export CORE_PEER_LOCALMSPID="Org2MSP"
root@fabric-tools:/# export CORE_PEER_MSPCONFIGPATH="/fabric/crypto-config/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp"

root@fabric-tools:/# export CORE_PEER_ADDRESS="example-org2peer0:30110"

root@fabric-tools:/# peer channel fetch newest -o ${ORDERER_URL} -c ${CHANNEL_NAME}
2020-01-07 00:50:28.853 -02 [channelCmd] InitCmdFactory -> INFO 001 Endorser and orderer connections initialized
2020-01-07 00:50:28.855 -02 [cli.common] readBlock -> INFO 002 Received block: 0

root@fabric-tools:/# peer channel join -b ${CHANNEL_NAME}_newest.block
2020-01-07 00:50:57.805 -02 [channelCmd] InitCmdFactory -> INFO 001 Endorser and orderer connections initialized
2020-01-07 00:50:57.840 -02 [channelCmd] executeJoin -> INFO 002 Successfully submitted proposal to join channel

root@fabric-tools:/# rm -rf /${CHANNEL_NAME}_newest.block

root@fabric-tools:/# export CORE_PEER_ADDRESS="example-org2peer1:30110"

root@fabric-tools:/# peer channel fetch newest -o ${ORDERER_URL} -c ${CHANNEL_NAME}
2020-01-07 00:52:16.889 -02 [channelCmd] InitCmdFactory -> INFO 001 Endorser and orderer connections initialized
2020-01-07 00:52:16.891 -02 [cli.common] readBlock -> INFO 002 Received block: 0

root@fabric-tools:/# peer channel join -b ${CHANNEL_NAME}_newest.block
2020-01-07 00:52:20.994 -02 [channelCmd] InitCmdFactory -> INFO 001 Endorser and orderer connections initialized
2020-01-07 00:52:21.041 -02 [channelCmd] executeJoin -> INFO 002 Successfully submitted proposal to join channel

root@fabric-tools:/# rm -rf /${CHANNEL_NAME}_newest.block
root@fabric-tools:/# exit
```
### 2.13 Install Chaincode
- Install chaincode lên các peers Org1:
```js
$ kubectl exec -it fabric-tools -- /bin/bash

root@fabric-tools:/# cp -r /fabric/config/chaincode $GOPATH/src/
root@fabric-tools:/# export CHAINCODE_NAME="mychaincode"
root@fabric-tools:/# export CHAINCODE_VERSION="1.0"
root@fabric-tools:/# export FABRIC_CFG_PATH="/etc/hyperledger/fabric"
root@fabric-tools:/# export CORE_PEER_MSPCONFIGPATH="/fabric/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp"
root@fabric-tools:/# export CORE_PEER_LOCALMSPID="Org1MSP"

root@fabric-tools:/# export CORE_PEER_ADDRESS="example-org1peer0:30110"
root@fabric-tools:/# peer chaincode install -n ${CHAINCODE_NAME} -v ${CHAINCODE_VERSION} -p chaincode/mychaincode/
2020-01-07 00:56:31.792 -02 [chaincodeCmd] checkChaincodeCmdParams -> INFO 001 Using default escc
2020-01-07 00:56:31.792 -02 [chaincodeCmd] checkChaincodeCmdParams -> INFO 002 Using default vscc
2020-01-07 00:56:32.884 -02 [chaincodeCmd] install -> INFO 003 Installed remotely response:<status:200 payload:"OK" > 

root@fabric-tools:/# export CORE_PEER_ADDRESS="example-org1peer1:30110"
root@fabric-tools:/# peer chaincode install -n ${CHAINCODE_NAME} -v ${CHAINCODE_VERSION} -p chaincode/mychaincode/
2020-01-07 00:56:59.896 -02 [chaincodeCmd] checkChaincodeCmdParams -> INFO 001 Using default escc
2020-01-07 00:56:59.896 -02 [chaincodeCmd] checkChaincodeCmdParams -> INFO 002 Using default vscc
2020-01-07 00:57:00.242 -02 [chaincodeCmd] install -> INFO 003 Installed remotely response:<status:200 payload:"OK" > 

root@fabric-tools:/# exit
```
- Install chaincode lên các peers của Org2:
```js

$ kubectl exec -it fabric-tools -- /bin/bash
root@fabric-tools:/# cp -r /fabric/config/chaincode $GOPATH/src/
root@fabric-tools:/# export CHAINCODE_NAME="mychaincode"
root@fabric-tools:/# export CHAINCODE_VERSION="1.0"
root@fabric-tools:/# export FABRIC_CFG_PATH="/etc/hyperledger/fabric"
root@fabric-tools:/# export CORE_PEER_MSPCONFIGPATH="/fabric/crypto-config/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp"
root@fabric-tools:/# export CORE_PEER_LOCALMSPID="Org2MSP"

root@fabric-tools:/# export CORE_PEER_ADDRESS="example-org2peer0:30110"
root@fabric-tools:/# peer chaincode install -n ${CHAINCODE_NAME} -v ${CHAINCODE_VERSION} -p chaincode/mychaincode/
2020-01-07 00:59:40.861 -02 [chaincodeCmd] checkChaincodeCmdParams -> INFO 001 Using default escc
2020-01-07 00:59:40.861 -02 [chaincodeCmd] checkChaincodeCmdParams -> INFO 002 Using default vscc
2020-01-07 00:59:41.185 -02 [chaincodeCmd] install -> INFO 003 Installed remotely response:<status:200 payload:"OK" > 

root@fabric-tools:/# export CORE_PEER_ADDRESS="example-org2peer1:30110"
root@fabric-tools:/# peer chaincode install -n ${CHAINCODE_NAME} -v ${CHAINCODE_VERSION} -p chaincode/mychaincode/
2020-01-07 01:00:04.290 -02 [chaincodeCmd] checkChaincodeCmdParams -> INFO 001 Using default escc
2020-01-07 01:00:04.290 -02 [chaincodeCmd] checkChaincodeCmdParams -> INFO 002 Using default vscc
2020-01-07 01:00:04.623 -02 [chaincodeCmd] install -> INFO 003 Installed remotely response:<status:200 payload:"OK" > 

root@fabric-tools:/# exit
```
### 2.14 Instantiate chaincode
Sau khi chanicode đã được cài dặt lên tất cả các peers, mình cần phải instantiate nó:
```js
$ kubectl exec -it fabric-tools -- /bin/bash
root@fabric-tools:/# export CHAINCODE_NAME="mychaincode"
root@fabric-tools:/# export CHAINCODE_VERSION="1.0"
root@fabric-tools:/# export FABRIC_CFG_PATH="/etc/hyperledger/fabric"
root@fabric-tools:/# export CORE_PEER_MSPCONFIGPATH="/fabric/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp"
root@fabric-tools:/# export CORE_PEER_LOCALMSPID="Org1MSP"
root@fabric-tools:/# export CORE_PEER_ADDRESS="example-org1peer0:30110"
root@fabric-tools:/# export ORDERER_URL="example-orderer:31010"
root@fabric-tools:/# export FABRIC_LOGGING_LEVEL=debug

root@fabric-tools:/# peer chaincode instantiate -o ${ORDERER_URL} -C ${CHANNEL_NAME} -n ${CHAINCODE_NAME} -v ${CHAINCODE_VERSION} -P "OR ('Org1MSP.peer','Org2MSP.peer') " -c '{"Args":["init","a","300","b","600"]}'
2020-01-07 01:03:31.312 -02 [chaincodeCmd] checkChaincodeCmdParams -> INFO 001 Using default escc
2020-01-07 01:03:31.312 -02 [chaincodeCmd] checkChaincodeCmdParams -> INFO 002 Using default vscc

root@fabric-tools:/# exit
```
### 2.15 Update anchor peer cho các Org:
- Update anchor peer cho Org1:
```js
$ kubectl exec -it fabric-tools -- /bin/bash
root@fabric-tools:/# export CORE_PEER_LOCALMSPID="Org1MSP"
root@fabric-tools:/# export FABRIC_CFG_PATH="/etc/hyperledger/fabric"
root@fabric-tools:/# export CORE_PEER_MSPCONFIGPATH="/fabric/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp"
root@fabric-tools:/# export CORE_PEER_ADDRESS="example-org1peer0:30110"
root@fabric-tools:/# export ORDERER_URL="example-orderer:31010"
root@fabric-tools:/# export FABRIC_LOGGING_LEVEL=debug

root@fabric-tools:/# peer channel update -f /fabric/Org1MSPanchors.tx -c $CHANNEL_NAME  -o $ORDERER_URL
2020-01-07 01:07:23.180 -02 [channelCmd] InitCmdFactory -> INFO 001 Endorser and orderer connections initialized
2020-01-07 01:07:23.193 -02 [channelCmd] update -> INFO 002 Successfully submitted channel update

root@fabric-tools:/# exit
```
- Update anchor peer cho Org2
```js
$ kubectl exec -it fabric-tools -- /bin/bash
root@fabric-tools:/# export CORE_PEER_LOCALMSPID="Org2MSP"
root@fabric-tools:/# export FABRIC_CFG_PATH="/etc/hyperledger/fabric"
root@fabric-tools:/# export CORE_PEER_MSPCONFIGPATH="/fabric/crypto-root@fabric-tools: config/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp"
root@fabric-tools:/# export CORE_PEER_ADDRESS="example-org2peer0:30110"
root@fabric-tools:/# export ORDERER_URL="example-orderer:31010"
root@fabric-tools:/# export FABRIC_LOGGING_LEVEL=debug

root@fabric-tools:/# peer channel update -f /fabric/Org2MSPanchors.tx -c $CHANNEL_NAME  -o $ORDERER_URL
2020-01-07 01:09:30.417 -02 [channelCmd] InitCmdFactory -> INFO 001 Endorser and orderer connections initialized
2020-01-07 01:09:30.438 -02 [channelCmd] update -> INFO 002 Successfully submitted channel update

root@fabric-tools:/# exit
```
### 2.16 Invoke và query chaincode
Bước trên coi như đã xong một network Hyperledger Fabric trên k8s, mình sẽ invoke, query thử để xem kết quả thế nào:
```js

$ kubectl exec -it fabric-tools -- /bin/bash
root@fabric-tools:/# export FABRIC_CFG_PATH="/etc/hyperledger/fabric"
root@fabric-tools:/# export ORDERER_URL="example-orderer:31010"
root@fabric-tools:/# export CORE_PEER_LOCALMSPID="Org1MSP"
root@fabric-tools:/# export CORE_PEER_MSPCONFIGPATH="/fabric/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp"
root@fabric-tools:/# export CORE_PEER_ADDRESS="example-org1peer0:30110"

root@fabric-tools:/# peer chaincode invoke --peerAddresses example-org1peer0:30110 -o example-orderer:31010 -C mychannel -n mychaincode -c '{"Args":["invoke","a","b","50"]}'
2020-01-07 01:16:43.589 -02 [chaincodeCmd] chaincodeInvokeOrQuery -> INFO 001 Chaincode invoke successful. result: status:200 

root@fabric-tools:/# peer chaincode query -C mychannel -n mychaincode -c '{"Args": ["query","a"]}'
250

root@fabric-tools:/# peer chaincode query -C mychannel -n mychaincode -c '{"Args": ["query","b"]}'
650

root@fabric-tools:/# exit
```
## Tổng kết
Sau khi hoàn thành các bước ở trên coi như mình đã xong. Còn phía server nodejs và client (frontend) bạn cũng có thể đưa chúng lên k8s để tạo project chạy hoàn toàn trên k8s. Có thể bài sau mình sẽ viết về vấn đề này. Cảm ơn các bạn đã theo dõi !!! <br><br>
Link tham khảo: https://github.com/feitnomore/hyperledger-fabric-kubernetes <br>
Link repos mẫu của mình: https://github.com/tantv-918/hyperledger-fabric-k8s<br><br>
Nếu có gì chưa hiểu, bạn hãy để lại câu hỏi phía dưới nhé.
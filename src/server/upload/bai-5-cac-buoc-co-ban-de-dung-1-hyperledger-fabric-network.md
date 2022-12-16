Điều khó khăn nhất với mình khi tìm hiểu về Hyperledger Fabric là nó có quá nhiều khái niệm và các tutorial của nó không được liền mạch với nhau. Sau 1 thời gian "chày cối" thì mình cũng bắt đầu ngờ ngợ ra, nên hôm nay mình viết bài này đề chia sẻ cho các bạn các bước để dựng một Hyperledger Fabric Network, giúp các bạn tiết kiệm được thời gian trong việc tìm hiểu về cái thứ của nợ này. 

Đàu tiên bạn hãy fetch project  [fabric-samples](https://github.com/hyperledger/fabric-samples/tree/release-1.4) (phiên bản 1.4) này về. Mình sẽ dựa vào project đó cùng với tutorial  [Build your first network (BYFN)](https://hyperledger-fabric.readthedocs.io/en/release-1.4/build_network.html) để hướng dẫn. Sau đó bạn mở terminal trong fabric-samples và chạy câu lệnh 
```bash
curl -sSL http://bit.ly/2ysbOFE | bash -s -- 1.4.4 1.4.4 0.4.18
```
để pull các tools và images cần thiết.

Sau khi tất cả đã xong xuôi ta bắt đầu đi vào thực hiện từng bước.
```bash
cd first-network
```

## 1. Generate cấu hình của network và channel.

Công đoạn này gồm nhiều bước để từ các file cấu hình **crypto-config.yaml** và **configtx.yaml** ta sinh ra được cấu hình cho network và channel.

Nhìn vào tutorial BYFN thì bạn có thể thấy người ta thực thi tự động các bước bằng các function *generateCerts()*, *replacePrivateKey()*, *generateChannelArtifacts()* trong file **./byfn.sh**, khi người dùng thực hiện lệnh: 
```bash
./byfn.sh generate
```
thì đồng thời 3 hàm sẽ được thực hiện lần lượt bởi vì trong file **./byfn.sh** người ta đã định nghĩa:
```bash
if [ "${MODE}" == "generate" ]; then ## Generate Artifacts
  generateCerts
  replacePrivateKey
  generateChannelArtifacts
fi 
```

và kết quả của công đoạn này là các thư mục **crypto-config** và **channel-artifacts** được sinh ra.

Nhưng đó là ta gom nhiều bước vào chung một công đoạn. Bây giờ ta sẽ thử thực hiện từng bước một xem thế nào nhé.

### 1.1 Generate cấu hình network

Bước này sử dụng tool **cryptogen** trong thư mục **bin** mà mình thực hiện lệnh ```curl``` ở trên đầu, để từ nội dung của file **crypto-config.yaml** sinh ra cấu hình ban đầu của network. Kết quả của bước này là thư mục crypto-config được sinh ra.

Lệnh thực hiện bằng tay :
```bash
../bin/cryptogen generate --config=./crypto-config.yaml
```

hoặc được thực hiện bằng function trong ./byfn.sh là: 
```bash
function generateCerts() {
  which cryptogen
  if [ "$?" -ne 0 ]; then
    echo "cryptogen tool not found. exiting"
    exit 1
  fi
  echo
  echo "##########################################################"
  echo "##### Generate certificates using cryptogen tool #########"
  echo "##########################################################"

  if [ -d "crypto-config" ]; then
    rm -Rf crypto-config
  fi
  set -x
  cryptogen generate --config=./crypto-config.yaml
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate certificates..."
    exit 1
  fi
  echo
  echo "Generate CCP files for Org1 and Org2"
  ./ccp-generate.sh
}
```

nhìn vào code ta có thể thấy bản chất nó cũng gọi đến tool **cryptogen** và file **crypto-config.yaml**, kết quả hiện ra trên terminal là đoạn:
```bash
##########################################################
##### Generate certificates using cryptogen tool #########
##########################################################
+ cryptogen generate --config=./crypto-config.yaml
org1.example.com
org2.example.com
+ res=0
+ set +x
```

và trong thư mục **first-network** xuất hiện thư mục **crypto-config**.

Nội dung của file crypto-config.yaml:

```yaml
OrdererOrgs:
  - Name: Orderer
    Domain: example.com
    EnableNodeOUs: true
    Specs:
      - Hostname: orderer
      - Hostname: orderer2
      - Hostname: orderer3
      - Hostname: orderer4
      - Hostname: orderer5
PeerOrgs:
    Domain: org1.example.com
    EnableNodeOUs: true
    Template:
      Count: 2
    Users:
      Count: 1
  - Name: Org2
    Domain: org2.example.com
    EnableNodeOUs: true
    Template:
      Count: 2
    Users:
      Count: 1
```
### 1.2 Generate cấu hình channel
Bước naỳ lại được chia thành 3 bước nhỏ, kết quả là các nội dung nằm trong thư mục **channel-artifacts**

Ba bước được gom vào một function *generateChannelArtifacts()* trong **./byfn.sh**.


#### Bước 1:  Generate genesis block
Bước này sử dụng tool **configtxgen** trong thư mục **bin** để từ nội dung của file **configtx.yaml** sinh ra file **genesis.block** trong thư mục **channel-artifacts**. 

Lệnh thực hiện bằng tay:
```bash 
../bin/configtxgen -profile TwoOrgsOrdererGenesis -outputBlock ./channel-artifacts/genesis.block -channelID byfn-sys-channel
```

Nội dung của file **configtx.yaml** bạn có thể tham khảo trong **fabric-samples/first-network/configtx.yaml**:

Kết quả thực hiện thành công hiện trên terminal của bước này là:
```bash
##########################################################
#########  Generating Orderer Genesis block ##############
##########################################################
CONSENSUS_TYPE=solo
+ '[' solo == solo ']'
+ configtxgen -profile TwoOrgsOrdererGenesis -channelID byfn-sys-channel -outputBlock ./channel-artifacts/genesis.block
2019-12-16 13:49:49.439 +07 [common.tools.configtxgen] main -> INFO 001 Loading configuration
2019-12-16 13:49:49.558 +07 [common.tools.configtxgen.localconfig] completeInitialization -> INFO 002 orderer type: solo
2019-12-16 13:49:49.558 +07 [common.tools.configtxgen.localconfig] Load -> INFO 003 Loaded configuration: /home/trinh.van.tan/fabric-samples/first-network/configtx.yaml
2019-12-16 13:49:49.651 +07 [common.tools.configtxgen.localconfig] completeInitialization -> INFO 004 orderer type: solo
2019-12-16 13:49:49.651 +07 [common.tools.configtxgen.localconfig] LoadTopLevel -> INFO 005 Loaded configuration: /home/trinh.van.tan/fabric-samples/first-network/configtx.yaml
2019-12-16 13:49:49.652 +07 [common.tools.configtxgen] doOutputBlock -> INFO 006 Generating genesis block
2019-12-16 13:49:49.652 +07 [common.tools.configtxgen] doOutputBlock -> INFO 007 Writing genesis block
+ res=0
+ set +x
```

#### Bước 2:  Generate channel configuration
Bước này cũng sử dụng tool **configtxgen** trong thư mục **bin** để từ nội dung của file **configtx.yaml** sinh ra file **channel.tx** trong thư mục **channel-artifacts**.

Lệnh thực hiện bằng tay:
```bash 
export CHANNEL_NAME=mychannel
../bin/configtxgen -profile TwoOrgsChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID $CHANNEL_NAME
```

Kết quả hiện ra trên terminal nếu bước này thành công là đoạn:
```bash
#################################################################
### Generating channel configuration transaction 'channel.tx' ###
#################################################################
+ configtxgen -profile TwoOrgsChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID mychannel
2019-12-16 13:49:49.681 +07 [common.tools.configtxgen] main -> INFO 001 Loading configuration
2019-12-16 13:49:49.775 +07 [common.tools.configtxgen.localconfig] Load -> INFO 002 Loaded configuration: /home/trinh.van.tan/fabric-samples/first-network/configtx.yaml
2019-12-16 13:49:49.867 +07 [common.tools.configtxgen.localconfig] completeInitialization -> INFO 003 orderer type: solo
2019-12-16 13:49:49.867 +07 [common.tools.configtxgen.localconfig] LoadTopLevel -> INFO 004 Loaded configuration: /home/trinh.van.tan/fabric-samples/first-network/configtx.yaml
2019-12-16 13:49:49.867 +07 [common.tools.configtxgen] doOutputChannelCreateTx -> INFO 005 Generating new channel configtx
2019-12-16 13:49:49.869 +07 [common.tools.configtxgen] doOutputChannelCreateTx -> INFO 006 Writing new channel tx
+ res=0
+ set +x
```

Đồng thời trong thư mục **channel-artifacts** sẽ xuất hiện file **channel.tx**

#### Bước 3: Generate anchor peer cho các org
Bước này cũng sử dụng tool **configtxgen** trong thư mục **bin** để từ nội dung của file **configtx.yaml** sinh ra các file tương ứng trong thư mục **channel-artifacts**.

Lệnh thực hiện bằng tay:
```bash
../bin/configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/Org1MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org1MSP

../bin/configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/Org2MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org2MSP
```

Kết quả hiện ra trên màn hình nếu thực hiện thành công là đoạn:
```bash
#################################################################
#######    Generating anchor peer update for Org1MSP   ##########
#################################################################
+ configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/Org1MSPanchors.tx -channelID mychannel -asOrg Org1MSP
2019-12-16 13:49:49.896 +07 [common.tools.configtxgen] main -> INFO 001 Loading configuration
2019-12-16 13:49:50.010 +07 [common.tools.configtxgen.localconfig] Load -> INFO 002 Loaded configuration: /home/trinh.van.tan/fabric-samples/first-network/configtx.yaml
2019-12-16 13:49:50.127 +07 [common.tools.configtxgen.localconfig] completeInitialization -> INFO 003 orderer type: solo
2019-12-16 13:49:50.128 +07 [common.tools.configtxgen.localconfig] LoadTopLevel -> INFO 004 Loaded configuration: /home/trinh.van.tan/fabric-samples/first-network/configtx.yaml
2019-12-16 13:49:50.128 +07 [common.tools.configtxgen] doOutputAnchorPeersUpdate -> INFO 005 Generating anchor peer update
2019-12-16 13:49:50.128 +07 [common.tools.configtxgen] doOutputAnchorPeersUpdate -> INFO 006 Writing anchor peer update
+ res=0
+ set +x

#################################################################
#######    Generating anchor peer update for Org2MSP   ##########
#################################################################
+ configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/Org2MSPanchors.tx -channelID mychannel -asOrg Org2MSP
2019-12-16 13:49:50.165 +07 [common.tools.configtxgen] main -> INFO 001 Loading configuration
2019-12-16 13:49:50.277 +07 [common.tools.configtxgen.localconfig] Load -> INFO 002 Loaded configuration: /home/trinh.van.tan/fabric-samples/first-network/configtx.yaml
2019-12-16 13:49:50.390 +07 [common.tools.configtxgen.localconfig] completeInitialization -> INFO 003 orderer type: solo
2019-12-16 13:49:50.390 +07 [common.tools.configtxgen.localconfig] LoadTopLevel -> INFO 004 Loaded configuration: /home/trinh.van.tan/fabric-samples/first-network/configtx.yaml
2019-12-16 13:49:50.391 +07 [common.tools.configtxgen] doOutputAnchorPeersUpdate -> INFO 005 Generating anchor peer update
2019-12-16 13:49:50.391 +07 [common.tools.configtxgen] doOutputAnchorPeersUpdate -> INFO 006 Writing anchor peer update
+ res=0
+ set +x
```

Đồng thời trong thư mục **channel-artifacts** sẽ xuất hiện các file **Org1MSPanchors.tx** và **Org2MSPanchors.tx**
### 1.3 Replace Private Key cho các CA
 Bước này sẽ thay thế private key đúng vào cho các container **ca0** và **ca1** trong file **docker-compose-e2e.yaml**
 
 Bạn có thể xem thêm về cách thực hiện bước này trong function *replacePrivateKey()* trong file **./byfn.sh**
 
 ```
 NOTE: Nếu bạn chạy lệnh : ./byfn.sh up nó sẽ gọi đến function upNetwork() 
 Nhìn vào fucntion networkUp() trong  ./byfn.sh bạn sẽ thấy nó thực hiện một phát một việc
 up các container và thực hiện các bước còn lại của việc dụng một network hoàn chỉnh. 
 Vì bài này mình muốn giải thích cho các bạn hiểu từng bước nên sẽ hơi khác với BYFN tutorial. 
 Bạn chỉ cần tập trung 1 tí là có thể dễ  dàng hiểu được các bước, sau này mới có thể tùy chỉnh linh hoạt network của bạn được.
 ```
 
## 2. Up các container


Như chúng ta đã biết về cấu trúc của một network trong Hyperledger Fabric. Tùy vào yêu cầu của project mà cấu trúc có thể khác đi một tí, nhưng nhìn chung, một network sẽ gồm: Orderer, Các peer của các Org, CA của mỗi Org, CLI. Bạn nên có kiến thức về docker để có thể hiểu phần này và nên chú ý volumes đủ các thư mục cần thiết vào các container.

Tất cả các container này đều được định nghĩ trong file docker-compose.yaml, bạn có thể tham tham khảo trong fabric-samples. 

Lệnh thực hiện bằng tay như sau:

```bash
docker-compose -f docker-compose-cli.yaml up -d
```

lúc này các container đã được up. Bạn có thể chạy lệnh:
```bash
docker ps
```
để xem danh sách các container đang chạy

Sau đó truy cập vào container CLI để thực hiện nốt các bước còn lại:

```bash
docker exec -it cli bash
```
Khi này, terminal của bạn sẽ thành:
```bash
root@57c1372e5f91:/opt/gopath/src/github.com/hyperledger/fabric/peer#
```

## 3. Tạo channel
Trong container CLI mình sẽ thực hiện lệnh tạo channel. Lệnh này sẽ lấy file **channel.tx** được sinh ra ở bước 2 trong mục 1.2 để tạo channel. 

Lệnh:

```bash
export CHANNEL_NAME=mychannel
peer channel create -o orderer.example.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/channel.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
```

## 4. Join các peer của các Org vào Channel
Tùy vào bạn đang join peer của tổ chức nào mà các biến môi trường trong CLI sẽ thay đổi:

Cho Org1
```bash
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
CORE_PEER_ADDRESS=peer0.org1.example.com:7051
CORE_PEER_LOCALMSPID="Org1MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
```

hoặc Org2
```bash
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp 
CORE_PEER_ADDRESS=peer0.org2.example.com:9051
CORE_PEER_LOCALMSPID="Org2MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
```

Các lệnh sau sẽ join peer của một Org vào channel:

```bash
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
CORE_PEER_ADDRESS=peer0.org1.example.com:7051
CORE_PEER_LOCALMSPID="Org1MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
peer channel join -b mychannel.block
```
```bash
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp 
CORE_PEER_ADDRESS=peer0.org2.example.com:9051
CORE_PEER_LOCALMSPID="Org2MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
peer channel join -b mychannel.block
```
## 5. Update Anchor Peer cho các Org
Bước này cũng giống như bước trên, bạn phải đặt lại biến môi trường trong CLI để chúng tương ứng với Anchor Peer của Org bạn sắp update.

Các lệnh sau sẽ update **anchor peer** của một Org:

Org1:
```bash
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
CORE_PEER_ADDRESS=peer0.org1.example.com:7051
CORE_PEER_LOCALMSPID="Org1MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
peer channel update -o orderer.certificate.com:7050 -c mychannel -f ./channel-artifacts/Org1MSPanchors.tx
```

Org2:
```bash
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp 
CORE_PEER_ADDRESS=peer0.org2.example.com:9051
CORE_PEER_LOCALMSPID="Org2MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
peer channel update -o orderer.certificate.com:7050 -c mychannel -f ./channel-artifacts/Org2MSPanchors.tx
```

## 6. Install chaincode lên các peer
Sau khi bạn code xong chaincode và ở bước 5 bạn đã volumes chính xác đường dẫn đến thư mục chứa chaincode thì bước này mới có thể thực hiện. 

Bước này cũng giống như 2 bước trên, bạn muốn install chaincode lên peer của tổ chức nào thì phải đặt lại biến môi trường trong CLI. 

Org1:
```bash
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
CORE_PEER_ADDRESS=peer0.org1.example.com:7051
CORE_PEER_LOCALMSPID="Org1MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
peer chaincode install -n $CHAINCODE_NAME -v 1.0 -p ${CC_SRC_PATH}
```

Org2:
```bash
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp 
CORE_PEER_ADDRESS=peer0.org2.example.com:9051
CORE_PEER_LOCALMSPID="Org2MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
peer chaincode install -n $CHAINCODE_NAME -v 1.0 -p ${CC_SRC_PATH}
```

## 7. Instantiate Chaincode
Sau khi chaincode được install, nó cần phải được instantiate thì mới có thể hoạt động được trên channel. Bước này chỉ cần thực hiện trên một peer, và nó sẽ bao gồm cả endorsement policy ( OR hoặc AND )

Lệnh:
```bash
peer chaincode instantiate -o orderer.certificate.com:7050 -C $CHANNEL_NAME -n $CHAINCODE_NAME -v 1.0 -c '{"Args":[]}' -P "OR ('Org1.member','Org2.member')"
```

## Tổng kết
Sau khi thực hiện đủ các bước trên là ta sẽ được 1 network. Nhưng đấy là mình thực hiện bằng tay, khi mà các bước có vẻ ổn thì người ta sẽ viết script để thực hiện tự động 10 bước trên, đó là nội dung của các file có đuôi ".sh", trong BYFN là file **./byfn.sh**. Khi gặp 1 project Hyperledger Fabric nào đấy, bạn hãy chịu khó đọc code trong các file .sh sẽ thấy đủ 10 bước trên. 

Network sẽ thay thế cho CSDL truyền thống, các bước tiếp theo để có thể hoàn thiện 1 application Hyperledger Fabric là bạn sẽ code các file enrollAdmin.js để enroll identity cho admin, từ identity của admin mình có thể registerUser.js các identity cho các user khác (với điều kiện là bạn phải nhớ run các container CA lên), sau đó sẽ là các file invoke.js và query.js để gọi đến các function trong chaincode, và cuối cùng code một web app để gọi đến các function trong invoke.js và query.js.
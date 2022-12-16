Qua 7 bài vừa rồi, mình đã giới thiệu cho các bạn về Hyperledger Fabric, cách triển khai một project Hyperledger Fabric bằng docker thông thường và trên Kubernetes. <br>
Thế nhưng ở vị trí là những Developer thì chúng ta biết  chắc chắn là nó là Blockchain, còn về phía user, làm thế nào để họ thấy được sự "blockchain" trong đó khi mà họ vẫn tương tác với nó nhưng tương tác với một web truyền thống. <br>
Hyperledger Explorer sẽ giúp cho người dùng thấy được điều đó. Nó là một platform có thể query tất cả các thông tin về blockchain, transaction, ...  trong một network Hyperledger Fabric.

### 1. Install PostgresSQL
Hyperledger Explorer sử dụng PostgresSQL để lưu trữ thông tin các block, chainsaction, các dữ liệu này sẽ liên tục được đồng bộ với dữ liệu của network. 
```bash
sudo apt-get install wget ca-certificates
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
```
```bash
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
```
### 2. Setup network
Nếu bạn đã rành về việc vụ set-up network thì có thể dễ dàng bỏ qua bước này. Còn nếu chưa thì bạn có thể chạy câu lệnh sau để lấy tất cả images, tools, repositoty của Hyperledger Fabric 2.0 về để thực hành.
```bash
curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.0.1 1.4.6 0.4.18
```
Khi đó trên máy tính của bạn sẽ xuất hiện thư mục fabric-samples vừa clone từ github về.<br>
Và gõ lệnh :
 ```bash
 docker images
 ```
 Kết quả sẽ trả về là:
 ```bash
 REPOSITORY                                                                                                                                                                      TAG                 IMAGE ID            CREATED             SIZE
hyperledger/fabric-tools                                                                                                                                                        2.0                 639ab50feac9        6 weeks ago         514MB
hyperledger/fabric-tools                                                                                                                                                        2.0.0               639ab50feac9        6 weeks ago         514MB
hyperledger/fabric-tools                                                                                                                                                        latest              639ab50feac9        6 weeks ago         514MB
hyperledger/fabric-peer                                                                                                                                                         2.0                 5f8a6b13db9f        6 weeks ago         57.2MB
hyperledger/fabric-peer                                                                                                                                                         2.0.0               5f8a6b13db9f        6 weeks ago         57.2MB
hyperledger/fabric-peer                                                                                                                                                         latest              5f8a6b13db9f        6 weeks ago         57.2MB
hyperledger/fabric-orderer                                                                                                                                                      2.0                 161632cc3c59        6 weeks ago         39.7MB
hyperledger/fabric-orderer                                                                                                                                                      2.0.0               161632cc3c59        6 weeks ago         39.7MB
hyperledger/fabric-orderer                                                                                                                                                      latest              161632cc3c59        6 weeks ago         39.7MB
hyperledger/fabric-ccenv                                                                                                                                                        2.0                 6514ca872b68        6 weeks ago         529MB
hyperledger/fabric-ccenv                                                                                                                                                        2.0.0               6514ca872b68        6 weeks ago         529MB
hyperledger/fabric-ccenv                                                                                                                                                        latest              6514ca872b68        6 weeks ago         529MB
hyperledger/fabric-baseos                                                                                                                                                       2.0                 50075bc26291        6 weeks ago         6.9MB
hyperledger/fabric-baseos                                                                                                                                                       2.0.0               50075bc26291        6 weeks ago         6.9MB
hyperledger/fabric-baseos                                                                                                                                                       latest              50075bc26291        6 weeks ago         6.9MB
hyperledger/fabric-javaenv                                                                                                                                                      2.0                 ac433f4353e4        7 weeks ago         507MB
hyperledger/fabric-javaenv                                                                                                                                                      2.0.0               ac433f4353e4        7 weeks ago         507MB
hyperledger/fabric-javaenv                                                                                                                                                      latest              ac433f4353e4        7 weeks ago         507MB
hyperledger/fabric-nodeenv                                                                                                                                                      2.0                 c7fe428889ec        7 weeks ago         274MB
hyperledger/fabric-nodeenv                                                                                                                                                      2.0.0               c7fe428889ec        7 weeks ago         274MB
hyperledger/fabric-nodeenv                                                                                                                                                      latest              c7fe428889ec        7 weeks ago         274MB
hyperledger/fabric-ca                                                                                                                                                           1.4                 62a60c5459ae        4 months ago        150MB
hyperledger/fabric-ca                                                                                                                                                           1.4.4               62a60c5459ae        4 months ago        150MB
hyperledger/fabric-ca                                                                                                                                                           latest              62a60c5459ae        4 months ago        150MB
hyperledger/fabric-zookeeper                                                                                                                                                    0.4                 ede9389347db        4 months ago        276MB
hyperledger/fabric-zookeeper                                                                                                                                                    0.4.18              ede9389347db        4 months ago        276MB
hyperledger/fabric-zookeeper                                                                                                                                                    latest              ede9389347db        4 months ago        276MB
hyperledger/fabric-kafka                                                                                                                                                        0.4                 caaae0474ef2        4 months ago        270MB
hyperledger/fabric-kafka                                                                                                                                                        0.4.18              caaae0474ef2        4 months ago        270MB
hyperledger/fabric-kafka                                                                                                                                                        latest              caaae0474ef2        4 months ago        270MB
hyperledger/fabric-couchdb                                                                                                                                                      0.4                 d369d4eaa0fd        4 months ago        261MB
hyperledger/fabric-couchdb                                                                                                                                                      0.4.18              d369d4eaa0fd        4 months ago        261MB
hyperledger/fabric-couchdb                                                                                                                                                      latest              d369d4eaa0fd        4 months ago        261MB

 ```
 Sau đó bạn chạy câu lệnh sau để up network:
 ```bash
 cd fabrci-samples/first-network
 ./byfn.sh up -a true
 ```
 Khi kết quả trả về là:
 ```bash
 ========= All GOOD, BYFN execution completed =========== 


 _____   _   _   ____   
| ____| | \ | | |  _ \  
|  _|   |  \| | | | | | 
| |___  | |\  | | |_| | 
|_____| |_| \_| |____/  
 ```
 có nghĩa là network đã được up thành công.<br>
 Chạy lênh:
 ```bash
 docker ps 
 ```
 bạn sẽ thấy:
 ```bash
 92cd1ec84084        dev-peer1.org2.example.com-mycc_1-aab9981fa5649cfe25369fce7bb5086a69672a631e4f95c4af1b5198fe9f845b-c50f5b41c26e9a6835c23b243d94abc9afed3b331444d7b08745b03714340b5b   "chaincode -peer.add…"   13 seconds ago      Up 12 seconds                                            dev-peer1.org2.example.com-mycc_1-aab9981fa5649cfe25369fce7bb5086a69672a631e4f95c4af1b5198fe9f845b
540665ba0970        dev-peer0.org2.example.com-mycc_1-aab9981fa5649cfe25369fce7bb5086a69672a631e4f95c4af1b5198fe9f845b-8aea7787ea13b314aaab0159842e2923c2d8eea64efeec72661a13c0a38e2886   "chaincode -peer.add…"   37 seconds ago      Up 35 seconds                                            dev-peer0.org2.example.com-mycc_1-aab9981fa5649cfe25369fce7bb5086a69672a631e4f95c4af1b5198fe9f845b
e4d0d01c613a        dev-peer0.org1.example.com-mycc_1-aab9981fa5649cfe25369fce7bb5086a69672a631e4f95c4af1b5198fe9f845b-2eef68d93d1fbaf2a6d1e691f8760dfd889a32b8a2ebfaa7c1ae71145241f766   "chaincode -peer.add…"   37 seconds ago      Up 34 seconds                                            dev-peer0.org1.example.com-mycc_1-aab9981fa5649cfe25369fce7bb5086a69672a631e4f95c4af1b5198fe9f845b
d2fb6c6ced3a        hyperledger/fabric-tools:latest                                                                                                                                       "/bin/bash"              2 minutes ago       Up 2 minutes                                             cli
518205b70016        hyperledger/fabric-peer:latest                                                                                                                                        "peer node start"        2 minutes ago       Up 2 minutes        0.0.0.0:7051->7051/tcp               peer0.org1.example.com
c072eda26709        hyperledger/fabric-ca:latest                                                                                                                                          "sh -c 'fabric-ca-se…"   2 minutes ago       Up 2 minutes        0.0.0.0:7054->7054/tcp               ca_peerOrg1
e7baa7eb8f79        hyperledger/fabric-ca:latest                                                                                                                                          "sh -c 'fabric-ca-se…"   2 minutes ago       Up 2 minutes        7054/tcp, 0.0.0.0:8054->8054/tcp     ca_peerOrg2
fd923fd3197a        hyperledger/fabric-orderer:latest                                                                                                                                     "orderer"                2 minutes ago       Up 2 minutes        7050/tcp, 0.0.0.0:8050->8050/tcp     orderer2.example.com
2d7a27a307c7        hyperledger/fabric-peer:latest                                                                                                                                        "peer node start"        2 minutes ago       Up 2 minutes        7051/tcp, 0.0.0.0:10051->10051/tcp   peer1.org2.example.com
d5ae5c054e87        hyperledger/fabric-orderer:latest                                                                                                                                     "orderer"                2 minutes ago       Up 2 minutes        7050/tcp, 0.0.0.0:11050->11050/tcp   orderer5.example.com
6e730e4c867d        hyperledger/fabric-orderer:latest                                                                                                                                     "orderer"                2 minutes ago       Up 2 minutes        0.0.0.0:7050->7050/tcp               orderer.example.com
46e9d795bce3        hyperledger/fabric-orderer:latest                                                                                                                                     "orderer"                2 minutes ago       Up 2 minutes        7050/tcp, 0.0.0.0:10050->10050/tcp   orderer4.example.com
80eb2464cf24        hyperledger/fabric-peer:latest                                                                                                                                        "peer node start"        2 minutes ago       Up 2 minutes        7051/tcp, 0.0.0.0:9051->9051/tcp     peer0.org2.example.com
8436ad1dd663        hyperledger/fabric-peer:latest                                                                                                                                        "peer node start"        2 minutes ago       Up 2 minutes        7051/tcp, 0.0.0.0:8051->8051/tcp     peer1.org1.example.com
588eb50ede08        hyperledger/fabric-orderer:latest                                                                                                                                     "orderer"                2 minutes ago       Up 2 minutes        7050/tcp, 0.0.0.0:9050->9050/tcp     orderer3.example.com
 ```
 ### 3 Setup Hyperledger Explorer
 Clone Hyperledger Explorer vào thực mục fabric-samples
 ```
 cd fabric-samples
 git clone https://github.com/hyperledger/blockchain-explorer.git
 ```
 Lúc này trong thư mục fabric-samples của bạn sẽ xuất hiện thư mục blockchain-explorer.
<br>
Bạn mở thư mục trong VS code cho dẽ thực hành. <br>
Trong file ```fabric-samples/blockchain-explorer/app/platform/fabric/connection-profile/first-network.json``` .<br>
Copy nội dung này vaof:
```json
{
	"name": "first-network",
	"version": "1.0.0",
	"license": "Apache-2.0",
	"client": {
		"tlsEnable": true,
		"adminUser": "admin",
		"adminPassword": "adminpw",
		"enableAuthentication": false,
		"organization": "Org1",
		"connection": {
			"timeout": {
				"peer": {
					"endorser": "300"
				},
				"orderer": "300"
			}
		}
	},
	"channels": {
		"mychannel": {
			"peers": {
				"peer0.org1.example.com": {}
			},
			"connection": {
				"timeout": {
					"peer": {
						"endorser": "6000",
						"eventHub": "6000",
						"eventReg": "6000"
					}
				}
			}
		}
	},
	"organizations": {
		"Org1MSP": {
			"mspid": "Org1MSP",
			"fullpath": true,
			"adminPrivateKey": {
				"path": "../first-network/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/priv_sk"
			},
			"signedCert": {
				"path": "../first-network/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/signcerts/Admin@org1.example.com-cert.pem"
			}
		}
	},
	"peers": {
		"peer0.org1.example.com": {
			"tlsCACerts": {
				"path": "../first-network/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt"
			},
			"url": "grpcs://localhost:7051",
			"eventUrl": "grpcs://localhost:7053",
			"grpcOptions": {
				"ssl-target-name-override": "peer0.org1.example.com"
			}
		}
	}
}
```
Vì ở Faric 2.0 các file private-key sẽ được lưu dưới tên ```priv_sk``` nên ạn không cần phải thay đổi tên file mỗi lần up lại network nữa.
Có thể là Team dev Fabric với Team dev Hyperledger Explorer vẫn nói nhau biết về chuyện này =)) <br><br>
Mở file ```fabric-samples/blockchain-explorer/app/persistence/fabric/postgreSQL/db/createdb.sh``` <br><br>
Comment lại từ dòng 5 -> 21.<br><br>
Sau đó thêm các dòng sau vào:
```bash
export USER='hppoc'
export PASSWD='password'
export DATABASE='fabricexplorer'
```
Mở file ```fabric-samples/blockchain-explorer/app/persistence/fabric/postgreSQL/db/explorerpg.sql``` lên và sửa dòng 6 từ 
```bash
WITH PASSWORD :passwd
```
thành 
```bash
WITH PASSWORD 'password'
```
sau đó chạy:
```
cd fabric-samples/blockchain-explorer/app/persistence/fabric/postgreSQL
chmod -R 777 db/
./createdb.sh
```
### 4. Setup server, client và Start. 
**Server** 
```bash
cd blockchain-explorer
npm install
```
**Client**
```
cd blockchain-explorer/client
npm install
npm run build
```

Như vậy đã setup xong, start lên và explore thôi !!!
```bash
cd blockchain-explorer
./start.sh
```
Truy cập vào link: http://localhost:8080

![](https://images.viblo.asia/7b55c950-2f6c-4c19-9eff-747342a3c1d6.png)
Đăng nhập bừa một username - password cũng vào được. Mình không hiểu họ bắt login để làm gì khi mà user, password nào cũng vào được. 

Sau khi đăng nhập thành công.

![](https://images.viblo.asia/1e835634-c56b-41c9-8951-c0f2a1f0b255.png)

Thông tin về các Org và các peer trong network:
![](https://images.viblo.asia/07ebc1f4-8efd-4024-9bcf-4ca0ed3d32b4.png)

Thông tin về các block:
![](https://images.viblo.asia/07b4bc58-7632-4f7c-be73-a566c03a3255.png)

Thông tin về các transaction:
![](https://images.viblo.asia/85bbfe64-3e4d-432e-bb14-c0fbec2c4b79.png)

### Link tham khảo 
https://github.com/hyperledger/blockchain-explorer
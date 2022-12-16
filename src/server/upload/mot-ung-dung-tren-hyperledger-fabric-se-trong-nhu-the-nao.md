![](https://cdn-images-1.medium.com/max/770/1*EBdlbLK7xC1kxLen8GLMVA.png)

#### Bài viết được dịch từ [Deep-Dive into Fabcar](https://medium.com/@kctheservant/deep-dive-into-fabcar-revised-57cb54642572) của tác giả KC Tam

## 1. Tổng quan

Hyperledger Fabric đi kèm với rất nhiều ví dụ trên mạng, do chính Hyperledger phát triển , trong đó Fabcar là một trong số đó, nó được dùng để hướng dẫn trong tài liệu chính thức của Hyperledger Fabric. Ứng dụng Fabcar gồm có 2 phần chính: Chaincode được triển khai và thực thi bên trong mạng fabric và ứng dụng client để người dùng tương tác với chaincode được triển khai trên mạng fabric này.

Bài viết này nhằm đưa ra một số minh họa và giải thích về ví dụ này. Đầu tiên chúng ta sẽ cùng xem qua bức tranh toàn cảnh về ví dụ Fabcar, sau đó đi sâu vào từng phần, từng cái một. Hy vọng độc giả sau bài viết này sẽ hiểu rõ hơn về cách một ứng dụng trên Hyperledger Fabric được xây dựng như thế nào.

Các bạn có thể xem source code của fabcar cũng như các ví dụ khác của Hyperledger Fabric trên [Github](https://github.com/hyperledger/fabric-samples).

Phiên bản được sử dụng ở đây là Hyperledger Fabric 1.4.2

## 2. Bức tranh toàn cảnh về Fabcar

Fabcar là một cơ sở dữ liệu của các bản ghi về ô tô được lưu trữ trong sổ cái của một mạng Fabric. Chúng ta có thể coi đây là cơ sở dữ liệu truyền thống lưu trữ dữ liệu: nó giống như một bảng, được lập chỉ mục với Mã ô tô (CarID) và Thông tin nhà sản xuất, Model, Màu (Color) và Chủ sở hữu (Owner) cũng từng chiếc xe.

Dữ liệu được lưu trữ bên trong sổ cái. Dữ liệu trong sổ cái được tương tác thông qua chaincode. Chaincode chứa các hàm có thể tương tác với dữ liệu được lưu trữ trong sổ cái (truy vấn, thêm, sửa, xóa). Trạng thái của sổ cái chỉ được cập nhật thông qua chaincode.

Phía bên ngoài là ứng dụng clien. Nó tương tác với mạng Fabric và chaincode thông qua Bộ công cụ phát triển phần mềm (SDK). Hyperledger Fabric hiện hỗ trợ chính thức cho Java và Node SDK, trong khi các gói SDK cho các ngôn ngữ lập trình khác như Go và Python dù chưa được hỗ trợ chính thức nhưng cũng có thể sẵn sàng để sử dụng.

## 3. First Network

Chaincode Fabcar có thể chạy trên bất kỳ mạng Fabric nào. Ở đây chúng ta làm theo hướng dẫn trong tài liệu chính thức, trong đó Fabcar đang chạy trên **First Network**.

Phần cơ sở hạ tầng của First Network trong ```fabric-sample``` gồm có:
* Hai tổ chức, Org1 và Org2, mỗi tổ chức có hai nút  (peer0 và peer1). Do đó, trong First Network, chúng ta có tổng cộng bốn nút.
* Một tổ chức orderer và một nút orderer sử dụng SOLO làm phương thức orderer.
* Mỗi nút ngang hàng chạy một cơ sở dữ liệu CouchDB để lưu trữ thông tin trong sổ cái  (có thể thay bằng LevelDB)
* Mỗi Org1 và Org2 có thể đi kèm với Tổ chức phát hành chứng chỉ (CA).
* Giao diện dòng lệnh (CLI) để máy client có thể tương tác với mạng Fabric.

Tất cả các thành phần được triển khai dưới dạng các Container và chạy trên một máy chủ.

![https://miro.medium.com/max/1044/0*lBATbOmYOl9Kh0H9](https://miro.medium.com/max/1044/0*lBATbOmYOl9Kh0H9)


## 4. Fabcar Chaincode

Hãy cùng xem qua chaincode Fabcar. Đó là nơi chứa logic kinh doanh và sẽ thực thi khi được gọi. Sổ cái chỉ được cập nhật khi chaincode được gọi.

Chaincode nằm trong ```fabric-samples/chaincode/fabcar```. Chaincode Fabcar được viết bằng nhiều ngôn ngữ, ở đây chúng ta sẽ xem xét với chaincode được viết bằng Golang. Chaincode follow theo một mẫu cụ thể được xác định trong Hyperledger Fabric. Trong bài viết này, chúng ta chỉ tập trung các phần, đó là cấu trúc dữ liệu, các hàm ```Init()``` và ```Invoke()```, cộng với một số hàm sẽ được gọi bởi ```Invoke()```.

### Cấu trúc dữ liệu

Đây là cách dữ liệu được cấu trúc.

```go
type  Car  struct {
	Make string  `json:"make"`
	Model string  `json:"model"`
	Colour string  `json:"colour"`
	Owner string  `json:"owner"`
}
```

### Hàm Init

Đây là một hàm cần phải có trong chaincode Hyperledger Fabric. ```Init()``` được thực thi khi chaincode được khởi tạo  hoặc nâng cấp (upgrade) trong channel.

```go
func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}
```


### Hàm Invoke

Đây là một hàm cần phải có trong chaincode Hyperledger Fabric. Hàm `Invoke` sẽ được gọi mỗi khi ta muốn query dữ liệu hoặc tạo transaction trong Fabric.

```go
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {
	function, args  := APIstub.GetFunctionAndParameters()
	
	if function ==  "queryCar" {
		return s.queryCar(APIstub, args)
	} else  if function ==  "initLedger" {
		return s.initLedger(APIstub)
	} else  if function ==  "createCar" {
		return s.createCar(APIstub, args)
	} else  if function ==  "queryAllCars" {
		return s.queryAllCars(APIstub)
	} else  if function ==  "changeCarOwner" {
		return s.changeCarOwner(APIstub, args)
}

  return shim.Error("Invalid Smart Contract function name.")
}
```

Từ đoạn mã trên, chúng ta biết rằng, khi chaincode được gọi, một danh sách đối số được đưa ra. Nhìn vào dòng đầu tiên trong thân hàm, đối số đầu tiên luôn là ```function``` (hành động của lệnh gọi này), ```args``` là một danh sách đối số tùy chọn cho hành động đó.

Có tổng cộng năm hàm được xác định, cụ thể là:
-  queryCar
-   initLedger
-   createCar
-   queryAllCars
-   changeCarOwner

### Hàm InitLedger

Hàm ```initLedger()``` là tải trước 10 bản ghi vào sổ cái. Ở đây, chúng ta có thể thấy dữ liệu được chuyển sang dạng JSON cộng thêm với mỗi khóa định danh dạng CARx trước khi được thêm vào sổ cái. API để cập nhật sổ cái là ```PutState()```.

```go
func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {

	cars  := []Car{
		Car{Make: "Toyota", Model: "Prius", Colour: "blue", Owner: "Tomoko"},
		Car{Make: "Ford", Model: "Mustang", Colour: "red", Owner: "Brad"},
		Car{Make: "Hyundai", Model: "Tucson", Colour: "green", Owner: "Jin Soo"},
		Car{Make: "Volkswagen", Model: "Passat", Colour: "yellow", Owner: "Max"},
		Car{Make: "Tesla", Model: "S", Colour: "black", Owner: "Adriana"},
		Car{Make: "Peugeot", Model: "205", Colour: "purple", Owner: "Michel"},
		Car{Make: "Chery", Model: "S22L", Colour: "white", Owner: "Aarav"},
		Car{Make: "Fiat", Model: "Punto", Colour: "violet", Owner: "Pari"},
		Car{Make: "Tata", Model: "Nano", Colour: "indigo", Owner: "Valeria"},
		Car{Make: "Holden", Model: "Barina", Colour: "brown", Owner: "Shotaro"},
	}

	i  :=  0

	for i <  len(cars) {
		fmt.Println("i is ", i)
		carAsBytes, _  := json.Marshal(cars[i])
		APIstub.PutState("CAR"+strconv.Itoa(i), carAsBytes)
		fmt.Println("Added", cars[i])
		i  = i +  1
	}

	return shim.Success(nil)
}
```

Hàm này không yêu cầu các đối số bổ sung và chỉ nên được thực thi một lần. Khi chúng ta thiết kế ứng dụng client, chúng ta sẽ cần quan tâm đến hàm này.

### Hàm queryAllCars

```queryAllCars()``` chỉ đơn giản thực hiện truy vấn tất cả bản ghi được lưu trong sổ cái và trả ra kết quả. Không có đối số là cần thiết cho chức năng này. API để truy xuất dữ liệu từ sổ cái là ```GetStateByRange()```

```go
func (s *SmartContract) queryAllCars(APIstub shim.ChaincodeStubInterface) sc.Response {

	startKey  :=  "CAR0"
	endKey  :=  "CAR999"

	resultsIterator, err  := APIstub.GetStateByRange(startKey, endKey)

	if err !=  nil {
		return shim.Error(err.Error())
	}

	defer resultsIterator.Close()

// buffer is a JSON array containing QueryResults
	var  buffer bytes.Buffer
	buffer.WriteString("[")
	bArrayMemberAlreadyWritten  :=  false

	for resultsIterator.HasNext() {
		queryResponse, err  := resultsIterator.Next()
		if err !=  nil {
			return shim.Error(err.Error())
		}

		// Add a comma before array members, suppress it for the first array member

		if bArrayMemberAlreadyWritten ==  true {
			buffer.WriteString(",")
		}

		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")
		buffer.WriteString(", \"Record\":")

		// Record is a JSON object, so we write as-is

		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten  =  true
	}

	buffer.WriteString("]")
	fmt.Printf("- queryAllCars:\n%s\n", buffer.String())
	
	return shim.Success(buffer.Bytes())
}
```

### Hàm queryCar

```queryCar()``` cho phép truy vấn dữ liệu dựa trên CarID.


```go
func (s *SmartContract) queryCar(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {  

	if  len(args) !=  1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	carAsBytes, _  := APIstub.GetState(args[0])
	return shim.Success(carAsBytes)
}
```

Tham số của hàm sẽ có CarID. API được sử dụng để truy xuất dữ liệu từ sổ cái là ```GetState()```

### Hàm createCar

```createdCar()``` là để thêm bản ghi mới vào sổ cái.

```go
func (s *SmartContract) createCar(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if  len(args) !=  5 {
		return shim.Error("Incorrect number of arguments. Expecting 5")
	}
	
	var  car  = Car{Make: args[1], Model: args[2], Colour: args[3], Owner: args[4]}
	carAsBytes, _  := json.Marshal(car)
	APIstub.PutState(args[0], carAsBytes)
	return shim.Success(nil)
}
```

Bản ghi mới yêu cầu đầy đủ cả 5 thông tin. Dữ liệu được chuyển qua dạnh JSON và thêm vào sổ cái bằng cách sử dụng ```PutState()``` .

### Hàm changeCarOwner

```changeCarOwner()``` có thể thay đổi chủ sở hữu của một chiếc xe thông qua CarID.

```go

func (s *SmartContract) changeCarOwner(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if  len(args) !=  2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	carAsBytes, _  := APIstub.GetState(args[0])
	car  := Car{}
	json.Unmarshal(carAsBytes, &car)

	car.Owner  = args[1]
	carAsBytes, _  = json.Marshal(car)
	APIstub.PutState(args[0], carAsBytes)

	return shim.Success(nil)

}
```

Hai đối số được mong đợi là CarID và Chủ sở hữu mới. Cập nhật này được thực hiện thông qua ```PutState()```

## 5. Bringing Up the First Network and Fabcar Chaincode

Chúng ta sẽ xem qua file bash ```fabcar/startFabric.sh``` , ta thấy rằng First Network được thiết lập, kênh được tạo và thêm vào các nút, cuối cùng là chaincode được triển khai. Tất cả xảy ra theo các bước sau.

### Bước 0: Trước khi chạy file `startFabric.sh` , cần cài đặt Hyperledger Fabric trước đã

```bash
cd fabric-samples
curl -sSL http://bit.ly/2ysbOFE | bash -s -- 1.4.2 1.4.2 0.4.15
```

Các giá trị sau cờ `s` lần lượt là phiên bản cài đặt của fabric, fabric-ca, third-party

### Bước 1: Chạy ```first-network/byfn.sh``` để thiết lập First Network.

```bash
cd ../first-network
echo y | ./byfn.sh down
echo y | ./byfn.sh up -a -n -s couchdb
```

Ở đây chúng tôi thấy một số tùy chọn được sử dụng.
-   **-a** thiết lập Fabric CA cho cả 2 tổ chức.
-   **-n**  không chạy file chaincode example
-   **-s couchdb**  cài đặt CouchDB cho mỗi nút


Sau khi thực hiện thành công, chúng ta sẽ có:
- Tất cả các docker container cần thiết trong First Network được cài đặt theo tùy chọn
-   Kênh _mychannel_  được tạo và có 4 nút được thêm vào kênh
-   Nút anchoring được cập nhật

### Bước 2: Cài đặt Chaincode Fabcar lên tất cả các nút trong kênh

Chaincode Fabcar được cài đặt trên các nút tham gia kênh. Trong ví dụ này, chaincode được cài đặt trong 4 nút. Lưu ý rằng chaincode được cài đặt thông qua cli container với các biến môi trường thích hợp. Dưới đây chỉ là đoạn mã cho việc cài đặt chaincode lên nút peer0.org1.example.com. Các đoạn mã cài đặt chaincode lên 3 nút còn lại cũng sẽ tương tự.

```bash
echo  "Installing smart contract on peer0.org1.example.com"
docker exec \
	-e CORE_PEER_LOCALMSPID=Org1MSP \
	-e CORE_PEER_ADDRESS=peer0.org1.example.com:7051 \
	-e CORE_PEER_MSPCONFIGPATH=${ORG1_MSPCONFIGPATH} \
	-e CORE_PEER_TLS_ROOTCERT_FILE=${ORG1_TLS_ROOTCERT_FILE} \
	cli \
	peer chaincode install \
		-n fabcar \
		-v 1.0 \
		-p "$CC_SRC_PATH" \
		-l "$CC_RUNTIME_LANGUAGE"
```

### Bước 3: Khởi tạo Fabcar chaincode trên kênh _mychannel_

Sau khi cài đặt, Fabcar chaincode sẽ được khởi tạo. Chúng ta chỉ định kênh mà chaincode sẽ được khởi tạo với tham số -C. Tham số -P quy định `POLICY`, nó là logic quy định một transaction như thế nào là hợp lệ, trong trường hợp này là phải được cả hai tổ chức đồng ý (phép toán AND).

```bash
echo "Instantiating smart contract on mychannel"
docker exec \
  -e CORE_PEER_LOCALMSPID=Org1MSP \
  -e CORE_PEER_MSPCONFIGPATH=${ORG1_MSPCONFIGPATH} \
  cli \
  peer chaincode instantiate \
    -o orderer.example.com:7050 \
    -C mychannel \
    -n fabcar \
    -l "$CC_RUNTIME_LANGUAGE" \
    -v 1.0 \
    -c '{"Args":[]}' \
    -P "AND('Org1MSP.member','Org2MSP.member')" \
    --tls \
    --cafile ${ORDERER_TLS_ROOTCERT_FILE} \
    --peerAddresses peer0.org1.example.com:7051 \
    --tlsRootCertFiles ${ORG1_TLS_ROOTCERT_FILE}
```

### Bước 4: Gọi hàm InitLedger

Như đã đề cập ở trên, chúng ta sẽ gọi ```initLedger()``` để tải trước 10 bàn ghi vào sổ cái. Lưu ý rằng chúng ta sẽ cần sự chứng thực từ cả hai tổ chức, ```initLedger()``` được gọi bởi các nút từ hai tổ chức thì mới hợp lệ (Lưu ý: Ở ví dụ chúng ta có 4 nút được chỉ định. Thực tế thì chỉ cần mỗi nút từ mỗi tổ chức là thỏa mã `POLICY` ở trên).

```bash
echo "Submitting initLedger transaction to smart contract on mychannel"
echo "The transaction is sent to the two peers with the chaincode installed (peer0.org1.example.com and peer0.org2.example.com) so that chaincode is built before receiving the following requests"
docker exec \
  -e CORE_PEER_LOCALMSPID=Org1MSP \
  -e CORE_PEER_MSPCONFIGPATH=${ORG1_MSPCONFIGPATH} \
  cli \
  peer chaincode invoke \
    -o orderer.example.com:7050 \
    -C mychannel \
    -n fabcar \
    -c '{"function":"initLedger","Args":[]}' \
    --waitForEvent \
    --tls \
    --cafile ${ORDERER_TLS_ROOTCERT_FILE} \
    --peerAddresses peer0.org1.example.com:7051 \
    --peerAddresses peer0.org2.example.com:9051 \
    --tlsRootCertFiles ${ORG1_TLS_ROOTCERT_FILE} \
    --tlsRootCertFiles ${ORG2_TLS_ROOTCERT_FILE}
```

Trạng thái sau khi startFabric.sh được thực thi.

Tất cả các nút tham gia ```mychannel```

![](https://miro.medium.com/max/1600/0*LKtUhoSlnw3-Loud)

Chaincode Fabcar được cài đặt trên tất cả các nút tham gia kênh

![](https://miro.medium.com/max/1600/0*waHF8tlABce3M5jX)

Chaincode Fabcar được khởi tạo trên ```mychannel```

![](https://miro.medium.com/max/1600/0*pDszJYj_TcPitXaM)

## 6. Gọi các hàm trong chaincode sử dụng CLI

Ở phần này chúng ta hãy cùng xem làm chaincode hoạt động như thế nào ?, hay cụ thể hơn, điều gì xảy ra khi chaincode được truy vấn hoặc được gọi.

![https://miro.medium.com/max/1600/0*dMWzUblfrIAlRe_n](https://miro.medium.com/max/1600/0*dMWzUblfrIAlRe_n)

Các biến môi trường mặc định trên CLI container trỏ đến peer0.org1. Khi chúng ta muốn truy cập các nút khác, chúng tai phải thay đổi các tham số liên quan.

Các bước thực hiện:
1.  Truy vấn tất cả bản ghi ô tô trên sổ cái
2.  Truy vấn xe theo CarID
3.  Thêm mới một bản ghi vào sổ cái
4.  Truy vấn tất cả bản ghi ô tô trên sổ cái để xem bản ghi vừa được thêm mới
5. Thay đổi chủ nhân của một xe ô tô bất kỳ nào đó
6. Truy vấn lại sổ cái và xem sự thay đổi

### Bước 1: Truy vấn tất cả bản ghi ô tô trên sổ cái (từ peer0.org1)

```bash
docker exec cli peer chaincode query -C mychannel -n fabcar -c '{"Args":["queryAllCars"]}'
```

![https://miro.medium.com/max/909/0*pVivgpIzhdxknyhE](https://miro.medium.com/max/909/0*pVivgpIzhdxknyhE)


### Bước 2: Truy vấn xe theo CarID (từ peer1.org1)

```bash
docker exec -e CORE_PEER_ADDRESS=peer1.org1.example.com:8051 
-e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt cli peer chaincode query -C mychannel -n fabcar -c '{"Args":["queryCar","CAR4"]}'
```

![https://miro.medium.com/max/905/0*KHfry_yqVCSqshbe](https://miro.medium.com/max/905/0*KHfry_yqVCSqshbe)

### Bước 3: Thêm mới một bản ghi vào sổ cái (from peer0.org2)

```bash
docker exec -e CORE_PEER_ADDRESS = peer1.org1.example.com: 8051 -e CORE_PEER_TLS_ROOTCERT_FILE = / opt / gopath / src / github.com / hyperledger / fabric / peer / crypto / peerOrganifications / org1.example.com / peers / peer1. org1.example.com/tls/ca.crt cli peer chaincode query -C mychannel -n fabcar -c '{"Args": ["queryCar", "CAR4"]}'
```

Đừng lo lắng với câu lệnh quá dài này. Chúng ta sẽ cùng phân tích nó
1.  Biến môi trường trỏ tới peer0.org2
2.  Vì chính sách chứng thực yêu cầu hai tổ chức đều xác nhận, chúng tôi gửi lệnh này này đến peer0.org1 và peer0.org2 cộng với chứng chỉ TLS của chúng (tùy chọn tlsRootCertFiles).

![https://miro.medium.com/max/907/0*MXjg8YlNGrj4CY_U](https://miro.medium.com/max/907/0*MXjg8YlNGrj4CY_U)

### Bước 4:   Truy vấn tất cả bản ghi ô tô trên sổ cái để xem bản ghi vừa được thêm mới (từ peer1.org2)

```bash
docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp -e CORE_PEER_ADDRESS = peer1. org2.example.com:10051 -e CORE_PEER_LOCALMSPID = "Org2MSP" -e CORE_PEER_TLS_ROOTCERT_FILE = / opt / gopath / src / github.com / hyperledger / fabric / peer / crypto / peerOrganizations / org2.example.com / peers / peer0.org2 .example.com / tls / ca.crt cli peer chaincode query -C mychannel -n fabcar -c '{"Args": ["queryAllCars"]}'
```

![https://miro.medium.com/max/908/0*msT02XmiwS3CE8jy](https://miro.medium.com/max/908/0*msT02XmiwS3CE8jy)

### Bước 5: Thay đổi chủ nhân của một xe ô tô bất kỳ nào đó (từ peer0.org1)

```bash
docker exec cli peer chaincode invoke -o orderer.example.com:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n fabcar --peerAddresses peer0.org1.example.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses peer0.org2.example.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c '{"Args":["changeCarOwner", "CAR4", "KC"]}'
```

![https://miro.medium.com/max/909/0*r5hNCbjpPMxLYaIz](https://miro.medium.com/max/909/0*r5hNCbjpPMxLYaIz)

### Bước 6: Truy vấn lại sổ cái và xem sự thay đổi

```bash
docker exec -e CORE_PEER_ADDRESS = peer1.org1.example.com: 8051 -e CORE_PEER_TLS_ROOTCERT_FILE = / opt / gopath / src / github.com / hyperledger / fabric / peer / crypto / peerOrganizations / org1.example.com / peers / peer1. org1.example.com/tls/ca.crt cli peer chaincode query -C mychannel -n fabcar -c '{"Args": ["queryCar", "CAR4"]}'
```

![https://miro.medium.com/max/908/0*0PGrpGLfAKadEdo8](https://miro.medium.com/max/908/0*0PGrpGLfAKadEdo8)

Phù, một đống câu lệnh dài loằng ngoằng, thật quá phức tạp. Thật may là ở thực tế, chúng ta sẽ sử dụng ứng dụng client, thông qua SDK để thực hiện các thao tác với chaincode thay vì gõ lệnh trên terminal gãy cả tay chỉ để thực hiện một truy vấn. Phần tiếp theo, chúng ta sẽ đi tìm hiểu về ứng dụng client.

## 7. Ứng dụng client trên Hyperledger Fabric

### Tổng quan

Trong Hyperledger Fabric, ứng dụng client tương tác với mạng fabric thông qua SDK. Hyperledger Fabric cung cấp SDK cho các ngôn ngữ lập trình khác nhau. Java và Node SDK được hỗ trợ chính thức.

Vì Hyperledger Fabric là một nền tảng private blockchain, mọi người tham gia phải được cho phép, ủy quyền trước khi có thể tương tác với mạng. Nó được thực hiện bằng cách cung cấp các chứng chỉ phù hợp do Cơ quan cấp chứng chỉ (Certificate Authority hay CA).

Bên trong ứng dụng khách là logic cách người dùng tương tác với mạng fabric và chaincode. Theo thiết kế Hyperledger Fabric, ứng dụng khách sẽ tương tác với Peer và Orderer, để chứng thực và tạo block. Access point của Peer và Orderer cần được chỉ định trong ứng dụng khách. Ngoài ra, tên kênh (Id) và tên chaincode (Id) cũng được chỉ định. Một mạng fabric hỗ trợ nhiều kênh và nhiều chaincode.

Cuối cùng, khi ứng dụng khách thực hiện truy vấn hoặc gọi chaincode, hãy đảm bảo cung cấp đúng tên hàm và danh sách đối số nếu có.

### Node SDK

Node SDK gồm 3 gói npm, bao gồm:
* ```fabric-client```  phần chính của client cho Hyperledger Fabric. Các ứng dụng có thể sử dụng gói này để cài đặt và khởi tạo chaincode, gửi giao dịch và thực hiện truy vấn đối với mạng blockchain Fabric.
* ```fabric-ca-client```  thành phần tùy chọn cho client trong Hyperledger Fabric. Component Fabric-ca cho phép các ứng dụng đăng ký Peers và người dùng ứng dụng để thiết lập danh tính đáng tin cậy trên mạng. Nếu mạng blockchain được định cấu hình các cơ quan cấp chứng chỉ tiêu chuẩn, ứng dụng không cần sử dụng gói này.
* ```fabric-network```  đóng gói các API để kết nối với mạng Fabric, gửi giao dịch và thực hiện các truy vấn đối với sổ cái.

Các bạn có thể tham khảo chi tiết hơn ở [Github Node SDK](https://github.com/hyperledger/fabric-sdk-node)

### Kiến trúc ứng dụng client

Ứng dụng client Fabcar nằm trong thư mục ```fabric-samples/fabcar```.Trong bản 1.4, mã nguồn được viết lại bằng JavaScript. Chúng ta sẽ thấy ba thư mục: ```javascript``` , ```typecript``` và ```javascript-low-level``` . Chúng ta sẽ xem xét đoạn mã viết bằng javascript.

![https://miro.medium.com/max/1600/0*qX0zNLf40C1jFj8R](https://miro.medium.com/max/1600/0*qX0zNLf40C1jFj8R)

Trong thư mục  ```fabric-samples/fabcar/javascript``` có bốn file JavaScript. Tất cả đều có được thông tin cấu hình kết nối được lấy từ file ```first-network/connection-org1.json```. Do đó, tất cả các lệnh gọi/truy vấn được thực hiện tại các nút trên org1. Điều này hơi khác so với cách chúng ta chạy bằng CLI. Tuy nhiên, nếu chúng ta thay đổi nó thành org2, chúng ta sẽ nhận được kết quả tương tự.

Chúng ta chia 4 file thành hai loại.

### Đăng ký người dùng vào mạng Fabric

Hai file ```enrollAdmin.js``` và ```registerUser.js``` chịu trách nhiệm đăng ký quản trị viên (admin) và người dùng trên mạng Fabric trước khi chúng ta có thể tương tác với chaincode. Kết quả khi chạy 2 file này là cặp khóa public-private và chứng chỉ cho admin và người dùng. Chúng được lưu trữ tại thư mục ```wallet```.

**_enrollAdmin.js_**

Trước tiên, chúng ta chạy file ```enrollAdmin.js``` để tạo chứng chỉ cho admin
1.  Required 2 package  **fabric-ca-client**  và  **fabric-network**.
2.  Lấy thông tin chi tiết về việc triển khai First Network. Nó chứa thông tin về điểm truy cập của Fabric CA (nằm ở file ```first-network/connection-org1.json```)
3.  Kiểm tra xem chứng chỉ admin đã có trong thư mục   `wallet/`  hay chưa ? Nếu không, sẽ không có hành động nào được thực hiện tiếp theo
4.  Đăng ký admin với Fabric CA với một ID và một mã bí mật (enrollmentSecret).
5.  Kết quả cuối cùng là cặp khóa và chứng chỉ được lưu trữ trong  `wallet/admin/`.

**_registerUser.js_**

Sau đó, chúng ta sẽ chạy file ```registerUser.js``` để đăng ký user1. Admin ở trên để thực hiện đăng ký này. Người dùng sau khi được đăng ký, có thể thực hiện truy vấn.

1. Required 2 package  **fabric-ca-client**  và  **fabric-network**.
2.  Lấy thông tin chi tiết về việc triển khai First Network. Nó chứa thông tin về điểm truy cập của Fabric CA (nằm ở file ```first-network/connection-org1.json```)
3.  Kiểm tra xem user1 đã được đăng ký chưa ?
4.  Kiểm tra xem admin có tồn tại trong folder ```wallet``` không. Nếu admin chưa được đăng ký, hãychạy file ```enrollAdmin.js```
5.  Tạo một cổng kết nối (Gateway) với nút, với chi tiết kết nối nằm ở file ```first-network/connection-org1.json```
6. Đăng ký user1 với Fabric CA, user1 sẽ sở hữu một ID và một mã bí mật (enrollmentSecret).

Kết quả cuối cùng là cặp khóa và chứng chỉ được lưu trữ trong  `wallet/user1/`

### Tương tác với chaincode

Hai file  ```query.js``` và ```invoke.js``` thực hiện gọi các hàm trong chaincode nhằm truy vấn hoặc thay đổi trạng thái của sổ cái trong kênh.

**_query.js_**

Có hai hàm được định nghĩa trong chaincode để truy vấn dữ liệu từ sổ cái : ```queryAllCars()``` và ```queryCar()```. File ```query.js``` mục địch để gọi 2 hàm này.


Logic của  file `query.js`:

1.  Required package  **fabric-network**.
2.  Lấy thông tin chi tiết về việc triển khai First Network. Nó chứa thông tin về điểm truy cập của Fabric CA (nằm ở file ```first-network/connection-org1.json```)
3.  Kiểm tra xem user1 đã được đăng ký chưa (trong folfer `wallet`). Nếu chưa, không cần thực hiện thêm hành động nào.
4.  Tạo gateway để kết nối với nút đã được cấu hình.
5.  Sử dụng gateway để chỉ định kênh (_mychannel_)  và chaincode  (_fabcar_) cần kết nối tới.
6.  Sử dụng API `_evaluateTransaction()_`  với tham số cần truy vấn.
7.  Nhận kết quả trả về

```javascript
// queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
// queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
const result = await contract.evaluateTransaction('queryAllCars');
console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
```

**_invoke.js_**

Có hai hàm được định nghĩa trong chaincode để thay đổi trạng thái của sổ cái trong kênh: `createdCar()` và `changeCarOwner()`. File `invoke.js` được viết để có thể gọi 2 hàm này.

Logic của `invoke.js`:

1.  Required package  **fabric-network**.
2.  Lấy thông tin chi tiết về việc triển khai First Network. Nó chứa thông tin về điểm truy cập của Fabric CA (nằm ở file ```first-network/connection-org1.json```)
3.  Kiểm tra xem user1 đã được đăng ký chưa (trong folfer `wallet`). Nếu chưa, không cần thực hiện thêm hành động nào.
4.  Tạo gateway để kết nối với nút đã được cấu hình.
5.   Sử dụng gateway để chỉ định kênh (_mychannel_)  và chaincode  (_fabcar_) cần kết nối tới.
6.  Sử dụng API `_submitTransaction()_`  với tham số cần truy vấn.
7.  Ngắt kết nối gateway sau khi giao dịch được xử lý.

Gọi hàm createCar để tạo bản ghi mới

```javascript
// createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
// changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
await  contract.submitTransaction('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom');
```

### Giờ chúng ta hãy tóm tắt lại phần trên với một ví dụ

1. Chạy file  `enrollAdmin.js`  và `registerUser.js`  để đăng ký admin và user1
2.  Chạy file  `query.js`  để xem bản ghi có ID CAR5
3.  Chạy file  `invoke.js` để đổi tên chủ xe của CAR5
4.  Chạy file  `query.js`  để xem lại kết quả

**Bước 1**: Cài đặt các gói cần thiết

```javascript
cd fabric-samples/fabcar/javascript  
npm install
```

Chúng ta sẽ thấy thư mục `node_modules` xuất hiện

**Bước 2**: Đăng ký Admin với Fabric CA

```bash
node enrollAdmin.js
```

![https://miro.medium.com/max/917/0*H-Vd4WNi1AWrot9k](https://miro.medium.com/max/917/0*H-Vd4WNi1AWrot9k)

Đã đăng ký thành công admin

**Bước 3**:  Đăng ký user 1 với Fabric CA

```bash
node registerUser.js
```

![https://miro.medium.com/max/919/0*nryGhle6FGUBkzfT](https://miro.medium.com/max/919/0*nryGhle6FGUBkzfT)

Đã đăng ký thành công user1

**Bước 4**: Chạy file **query.js**

Truy vấn bản ghi có ID là CAR5

```javascript
const  result  =  await  contract.evaluateTransaction('queryCars', 'CAR5);
```

```bash
node query.js
```

![https://miro.medium.com/max/921/0*AKZthT85IUCuULwX](https://miro.medium.com/max/921/0*AKZthT85IUCuULwX)

Kết quả trả về

**Bước 5**: Chạy file **invoke.js**

Thay đổi tên chủ xe của CAR5 thành `CongLT`

```javascript
await  contract.submitTransaction('changeOwner', 'CAR5', 'CongLT');
```


```bash
node invoke.js
```

![https://miro.medium.com/max/916/0*dWs06VG8RYeDLn2G](https://miro.medium.com/max/916/0*dWs06VG8RYeDLn2G)


## 8. Xây dựng Server API để tương tác với chaincode

Trong môi trường production, ứng dụng client phải toàn diện hơn ví dụ `Fabcar` mà ta vừa tìm hiểu. Ví dụ, thay vì *hardcode* các hàm và đối số, sẽ tốt hơn nếu chúng ta có các API để tương tác với Fabric. API hoạt động như một cách tiêu chuẩn khi truy cập các dịch vụ và nó có thể dùng để được tích hợp vào các ứng dụng khác.


![https://miro.medium.com/max/1600/0*kCue8mLtfOlKtcKG](https://miro.medium.com/max/1600/0*kCue8mLtfOlKtcKG)


ExpressJS hỗ trợ để viết API một cách dễ dàng. Chúng ta sẽ xây dựng API sau.

-   `GET /api/queryallcars`
-   `GET /api/query/CarID`
-   `POST /api/addcar/`  
-   `PUT /api/changeowner/CarID`  

### Bước chuẩn bị

Chúng ta sẽ tạo một thư mục tên là `apiserver`. Và copy các file trong thư mục `fabcar/javascript' vào thư mục `apiserver`.

```bash
cd fabric-samples/fabcar/  
cp -r javascript/ apiserver/
```

Trong `apiserver`, chúng ta cần cài đặt hai package:

```bash
cd apiserver  
npm install express body-parser --save
```

Tạo file `apiServer.js` trong thư mục `apiserver`

```bash
touch apiServer.js
```

### Viết API

Cấu trúc của file `apiServer.js`

```javascript
var express = require('express');  
var bodyParser = require('body-parser');
var app = express();  

app.use(bodyParser.json());// Setting for Hyperledger Fabric

const { FileSystemWallet, Gateway } = require('fabric-network');  
const path = require('path');  
const ccpPath = path.resolve(__dirname, '..', '..', 'first-network', 'connection-org1.json');

app.get('/api/queryallcars', async function (req, res) {  
 
});

app.get('/api/query/:car_index', async function (req, res) {  
 
});

app.post('/api/addcar/', async function (req, res) {  

})

app.put('/api/changeowner/:car_index', async function (req, res) {  

})

app.listen(8080);
```

`GET /api/queryallcars`

```javascript
app.get('/api/queryallcars', async function (req, res) {
    try {
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });

        const network = await gateway.getNetwork('mychannel');

        const contract = network.getContract('fabcar');
        
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('queryAllCars');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});
	} catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
});
```

`GET /api/query/CARID`

```javascript
app.get('/api/query/:car_index', async function (req, res) {
    try {
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('fabcar');
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('queryCar', req.params.car_index);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});
	} catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
});
```

`POST /api/addcar/`

```javascript
app.post('/api/addcar/', async function (req, res) {
    try {
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('fabcar');
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
        await contract.submitTransaction('createCar', req.body.carid, req.body.make, req.body.model, req.body.colour, req.body.owner);
        console.log('Transaction has been submitted');
        res.send('Transaction has been submitted');
        await gateway.disconnect();
	} catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})
```

`PUT /api/changeowner/CARID`

```javascript
app.put('/api/changeowner/:car_index', async function (req, res) {
    try {
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('fabcar');
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
        await contract.submitTransaction('changeCarOwner', req.params.car_index, req.body.owner);
        console.log('Transaction has been submitted');
        res.send('Transaction has been submitted');
        await gateway.disconnect();
} catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    } 
})
```

### Chạy thử API

Chúng ta sẽ sử dụng `curl` để test các API. Nếu không, bạn cũng có thể viết front-end cho các API bằng các thư viện/framework như React, Vue, Angular để hiển thị kết quả trả về từ API.

Tắt network và xóa sạch các docker images để build lại.

```bash
cd /fabric-samples/first-network  
./byfn.sh down  
docker rm $(docker ps -aq)  
docker rmi $(docker images dev-* -q)
```
Chạy lại network

```bash
cd /fabric-samples/fabcar  
./startFabric.sh
```

Xóa thư mục `wallet` và đăng ký lại admin, user1

```bash
cd /fabric-samples/fabcar/apiserver  
rm -rf wallet  
node enrollAdmin.js  
node registerUser.js

node apiserver.js
```
Server chạy ở địa chỉ 127.0.0.1:8080

**Bước 1**: Truy vấn tất cả bản ghi

```bash
curl http://127.0.0.1:8080/api/queryallcars
```
Kết quả trả về

![](https://i.imgur.com/xhIS1B5.png)

**Bước 2**: Truy vấn bản ghi có id là CAR4

```bash
curl http://127.0.0.1:8080/api/query/CAR4
```
Kết quả trả về

![](https://i.imgur.com/2pDpjjX.png)

**Bước 3**: Thêm mới một bản ghi

```bash
curl -d '{"carid":"CAR12","make":"Honda","model":"Accord","colour":"black","owner":"Tom"}' -H "Content-Type: application/json" -X POST http://127.0.0.1:8080/api/addcar
```

![](https://i.imgur.com/MD5hg9g.png)

**Bước 4**: Truy vấn lại để kiểm tra bản ghi vừa mới được thêm

```bash
curl http://127.0.0.1:8080/api/queryallcars
```
Kết quả trả về

![](https://i.imgur.com/9Ul4D1e.png)

**Bước 5**: Thay đổi chủ nhân của xe có id CAR4

```bash
curl -d '{"owner":"KC"}' -H "Content-Type: application/json" -X PUT http://127.0.0.1:8080/api/changeowner/CAR4
```
**Bước 6**: Truy vấn xe có id CAR4 để xem sự thay đổi

```bash
url http://127.0.0.1:8080/api/query/CAR4
```
Kết quả trả về

![](https://i.imgur.com/L0WTygN.png)


## Tài liệu tham khảo

https://viblo.asia/p/hyperledger-bat-dau-voi-fabric-hay-composer-Ljy5VM0klra

https://github.com/hyperledger/fabric-sdk-node
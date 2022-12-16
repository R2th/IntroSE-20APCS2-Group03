# Introduction

Bạn mới bắt đầu với [Hyperledger](https://www.hyperledger.org/) và bạn băn khoăn không biết nên bắt đầu với `Hyperledger Composer` hay `Hyperledger Fabric`? bài viết này sẽ cung cấp cho các bạn một cái nhìn tổng quan về các ưu nhược điểm của 2 cách tiếp cận. Hi vọng sẽ giúp các bạn trong việc lựa chọn con đường phù hợp.

# TL;DR

> chọn Hyperledger Composer

# Tổng quan Hyperledger

Cả Hyperledger Fabric và Hyperledger Composer đều là các project nằm trong hệ sinh thái Hyperledger được phát triển bởi tổ chức **Linux Foundation**

- Hyperledger Fabric là một pluggable blockchain, nó cung cấp các một set các peer node với những quyền truy cập khác nhau để thao tác với một sổ cái chung.
- Hyperledger Composer là một set ở tầm cao hơn, sử dụng các API + tools để mô hình hóa, build, integrate và deploy blockchain network. Network này có thể được đóng gói và chạy _bên trên_ Hyperledger Fabric.

Hay nói một cách đơn giản, Composer **chạy trên** Fabric. Composer cung cấp API bậc cao, và về bản chất, các API này vẫn gọi đến các API của Fabric.

Để có cái nhìn cụ thể hơn, ta sẽ đi vào so sánh việc code giữa Composer và Fabric thông qua một project sample của Hyperledger là [Marble Network](https://github.com/hyperledger/composer-sample-networks/tree/master/packages/marbles-network)

**Recommend**:

- sẽ tốt hơn nếu bạn có kiến thức cơ bản về blockchain
- sẽ tốt hơn nếu bạn có kiến thức về _golang_ hay _javascript_

# Code với Fabric

> Có thể bạn chưa biết: Trong Fabric cũng có khái niệm smart contract, gọi là `chaincode`

Các bạn có thể viết chaincode trong Fabric bằng `Go` hoặc bằng `Nodejs`, `Java`. Trong bài viết này ta sẽ dùng `Go`.

Một chaincode sẽ phải implement interface bao gồm 2 function: `Init` và `Invoke`.

Hàm `Init` sẽ được gọi mỗi khi chaincode được **instantiate** hoặc **upgrade** trong channel. Nó có dạng như sau:

```go
func (t *SimpleChaincode) Init(stub shim.ChaincodeStubInterface) pb.Response {}
```

Hàm `Invoke` sẽ được gọi mỗi khi ta muốn query dữ liệu hoặc tạo transaction trong Fabric.

```go
func (t *SimpleChaincode) Invoke(stub shim.ChaincodeStubInterface) pb.Response {}
```

Fabric không có phân biệt `call` (query) hay `send` (transaction) như trong Ethereum, mà tất cả đều là `Invoke`.

Ta sẽ phải tự check xem `Invoke` sẽ gọi hàm private nào thông qua tham số đưa vào function `stub.GetFunctionAndParameters()`, bằng `if`. Vâng, thủ công vô cùng =))

## Step 1: Data Model

Các blockchain nói chung đều lưu trữ dữ liệu tại một nơi gọi là _sổ cái phân tán_ - distributed ledger.

Data model trong Go chaincode được định nghĩa dưới dạng Go **struct**, dưới dạng JSON data.

```go
type marble struct {
   ObjectType string `json:"docType"` //docType is used to distinguish the various types of objects in state database
   Name       string `json:"name"`    //the fieldtags are needed to keep case from bouncing around
   Color      string `json:"color"`
   Size       int    `json:"size"`
   Owner      string `json:"owner"`
}
```

## Step 2: Dispatching Incoming Calls

Mỗi khi client submit một transaction lên trên blockchain (trong Fabric ta sẽ dùng một node-sdk client), nó sẽ sử dụng một interface dạng RPC bất đồng bộ. RPC calls sẽ chuyển tiếp các transaction đó đến các hàm Go tương ứng để xử lý. Như trên ta cũng có nói, việc này đơn giản là xử lý một loạt các `if` trong `Invoke`:

```go
func (t *SimpleChaincode) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
   function, args := stub.GetFunctionAndParameters()
   fmt.Println("invoke is running " + function)
   // Handle different functions
   if function == "initMarble" { //create a new marble
      return t.initMarble(stub, args)
   } else if function == "transferMarble" { //change owner of a specific marble
      return t.transferMarble(stub, args)
   } else if function == "transferMarblesBasedOnColor" { //transfer all marbles of a certain color
      return t.transferMarblesBasedOnColor(stub, args)
   } else if function == "delete" { //delete a marble
      return t.delete(stub, args)
   } else if function == "readMarble" { //read a marble
      return t.readMarble(stub, args)
   } else if function == "queryMarblesByOwner" { //find marbles for owner X using rich query
      return t.queryMarblesByOwner(stub, args)
   } else if function == "queryMarbles" { //find marbles based on an ad hoc rich query
      return t.queryMarbles(stub, args)
   } else if function == "getHistoryForMarble" { //get history of values for a marble
      return t.getHistoryForMarble(stub, args)
   } else if function == "getMarblesByRange" { //get marbles based on range query
      return t.getMarblesByRange(stub, args)
   }

   fmt.Println("invoke did not find func: " + function) //error
   return shim.Error("Received unknown function invocation")
}
```

Sau đó trong mỗi function, Go code sẽ gọi methods trong `shim` để đọc hay ghi dữ liệu lên sổ cái chung.

> `shim` chính là phần đứng giữa chaincode và sổ cái, nó sẽ làm các nhiệm vụ CRUD state, emit các events..

Ví dụ:

```go
err = stub.DelState(colorNameIndexKey)
colorNameIndexKey, err := stub.CreateCompositeKey(indexName, []string{marble.Color, marble.Name})
stub.PutState(colorNameIndexKey, value)
valAsbytes, err := stub.GetState(name) //get the marble from chaincode state
```

ta sẽ đi sâu hơn vào detail của một function.

## Step3: Validate arguments

Mỗi function chỉ nhận vào một mảng bao gồm tên function và các đối số. Vì thế việc thực hiện validate số lượng các đối số luôn là việc cần làm đầu tiên trong function.

```go
func (t *SimpleChaincode) transferMarble(stub shim.ChaincodeStubInterface, args []string) pb.Response {
   //   0       1
   // "name", "bob"
   if len(args) < 2 {
      return shim.Error("Incorrect number of arguments. Expecting 2")
   }
```

## Step4: Lookup Asset

Chaincode có thể tìm kiếm các asset trong mạng bằng `id`, và return một `error` nếu nó không tồn tại.

```go
marbleName := args[0]
newOwner := strings.ToLower(args[1])
fmt.Println("- start transferMarble ", marbleName, newOwner)
marbleAsBytes, err := stub.GetState(marbleName)

if err != nil {
   return shim.Error("Failed to get marble:" + err.Error())
} else if marbleAsBytes == nil {
   return shim.Error("Marble does not exist")
}
```

## Step5: Deserialize data

Nếu asset mà bạn tìm kiếm ở bước 4 tồn tại, nó sẽ trả về dưới dạng raw data, tức **bytes**, ta sẽ phải tiến hành deserialize dữ liệu đó ra và convert nó trở lại dạng Go **struct**.

```go
marbleToTransfer := marble{}
err = json.Unmarshal(marbleAsBytes, &marbleToTransfer) //unmarshal it aka JSON.parse()
if err != nil {
   return shim.Error(err.Error())
}
```

## Step 6: Update data in memory

Chaincode sẽ update state của struct thông qua dữ liệu params truyền vào

```go
marbleToTransfer.Owner = newOwner //change the owner
```

## Step 7: Serialize data and persist

Cuối cùng, để update lại dữ liệu sổ cái (world-state data), ta sẽ phải serialize dữ liệu lại dưới dạng JSON bytes:

```go
marbleJSONasBytes, _ := json.Marshal(marbleToTransfer)

err = stub.PutState(marbleName, marbleJSONasBytes) //rewrite the marble

if err != nil {
   return shim.Error(err.Error())
}

fmt.Println("- end transferMarble (success)")
return shim.Success(nil)
```

## Step 8: Content based query

Để query data trong ledger, ta sẽ có thể lấy trực tiếp bằng key-value, hoặc để tiện lợi hơn thì ta sẽ sử dụng JSON request.

```go
queryString := fmt.Sprintf("{\"selector\":{\"docType\":\"marble\",\"owner\":\"%s\"}}", owner)

<snip>

func getQueryResultForQueryString(stub shim.ChaincodeStubInterface, queryString string) ([]byte, error) {

   fmt.Printf("- getQueryResultForQueryString queryString:\n%s\n", queryString)
   resultsIterator, err := stub.GetQueryResult(queryString)

   if err != nil {
      return nil, err
   }

   defer resultsIterator.Close()

   // buffer is a JSON array containing QueryRecords
   var buffer bytes.Buffer
   buffer.WriteString("[")
   bArrayMemberAlreadyWritten := false
for resultsIterator.HasNext() {
      queryResponse, err := resultsIterator.Next()

      if err != nil {
         return nil, err
      }

      // Add a comma before array members, suppress it for the first array member
      if bArrayMemberAlreadyWritten == true {
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
      bArrayMemberAlreadyWritten = true
   }

   buffer.WriteString("]")
   fmt.Printf("- getQueryResultForQueryString queryResult:\n%s\n", buffer.String())
   return buffer.Bytes(), nil
}
```

## Step 9: Emitting events

Mỗi sự kiện xảy ra trên blockchain đều có thể bắn ra event được. Fabric đặt dữ liệu về event của nó ở trong Event Hub, theo đó phía client có thể subscribe và lắng nghe những event mà mình mong muốn.

```go
err = stub.SetEvent("evtsender", []byte(tosend))
if err != nil {
   return shim.Error(err.Error())
}
```

# Coding with Composer

Tiếp theo đây chúng ta sẽ viết lại Marbles Network bằng Composer, thực hiện đúng các bước cũng như trên để xem sự khác biệt giữa Fabric và Composer đến đâu.

Các bạn có thể tham khảo code hoàn chỉnh [tại đây](https://github.com/sstone1/composer-sample-networks/tree/master/packages/marbles-network).

## Step 1: Data model

Khác với Fabric, Composer định nghĩa data model dưới dạng CTO file. Tất cả các cấu trúc của assets, participants và transactions trong một business network đều được định nghĩa bằng Composer Modeling Language.

Data model được thiết kế theo tư tưởng truyền thống Object-Oriented, bao gồm: namespaces và imports, abstraction types, enumerations, quan hệ 1-1 và quan hệ 1-N, kế thừa, field validation, các optional properties, giá trị default cho property...

Hãy xem qua một ví dụ đơn giản **Hello World** để xem model được viết như thế nào trong Composer:

```js
/**
 * Defines a data model for a marble trading network
 */
namespace org.hyperledger_composer.marbles

enum MarbleColor {
   o RED
   o GREEN
   o BLUE
   o PURPLE
   o ORANGE
}

enum MarbleSize {
   o SMALL
   o MEDIUM
   o LARGE
}

asset Marble identified by marbleId {
   o String marbleId
   o MarbleSize size
   o MarbleColor color
   --> Player owner
}

participant Player identified by email {
   o String email
   o String firstName
   o String lastName
}

transaction TradeMarble {
   --> Marble marble
   --> Player newOwner
}

```

## Step 2: Dispatch incoming calls

Composer sử dụng **decorations** trên các functions để tự động điều hướng transaction tới Javascript function tương ứng. Do đó phần dispatch function này chúng ta sẽ không phải tự viết nữa, ngon.

Ví dụ, marbles-network có một hàm Javascript, các decorations `@param` và `@transaction` sẽ điều hướng để Composer runtime biết rằng những function đó sẽ được submit bởi một instance của `org.hyperledger_composer.marbles.TradeMarble`.

## Step 3: Validate arguments

Composer sẽ tự động validate dữ liệu người dùng đưa vào trên cả client API và runtime dựa trên data model mà ta định nghĩa trong CTO file.

Việc xử lý tự động này hoàn toàn trong suốt với người viết code trên Composer, do đó ta có thể tin tưởng rằng data sẽ được xử lý phù hợp với model mà ta đã định nghĩa cho business network.

## Step 4,5,6,7 Lookup Asset, Deserialize Data, Update Data In Memory, Serialize Data and Persist

Toàn bộ những bước thực hiện logic dài dằng dặc trước đây trong Fabric sẽ được thực hiện chỉ trong vòng khoảng 5 dòng code Javascript trong Composer, ngon!

Runtime sẽ tự động trả về asset cho tradeMarble transaction. Nếu asset không tồn tại, transaction sẽ fail.

Để thay đổi `owner` của asset, phía application developer chỉ đơn giảm là thay đổi giá trị của attribute `owner` sang một giá trị mới `newOwner` trong transaction được gửi tới và update lại trạng thái của marbles trong `asset registry` mà thôi.

```js
function tradeMarble(tradeMarble) {
  tradeMarble.marble.owner = tradeMarble.newOwner
  return getAssetRegistry('org.hyperledger_composer.marbles.Marble').then(
    function(assetRegistry) {
      return assetRegistry.update(tradeMarble.marble)
    }
  )
}
```

## Step 8: Content based query

Để việc query trở nên đơn giản và ngắn gọn hơn, Composer cung cấp cho ta một content-based query language, gọi là **Composer Query Language**, với cấu trúc lệnh gần giống như SQL vậy.

Để query dữ liệu, ta sẽ sử dụng API `query` trong Javascript như sau:

```js
return query('SELECT org.hyperledger_composer.marbles.Marble
   WHERE (color == "green")')
.then(function (results) {
   // process the results
});
```

Rõ ràng, sử dụng Javascript và query language giống như SQL khiến việc code trở nên dễ hiểu hơn rất nhiều. Không chỉ có vậy, nó còn khiến code trở nên dễ test và debug hơn.

## Step 9: Emitting events

Để gọi ra event trong Composer, Javascript sẽ gọi API `emit`. Events trong composer là một kiểu dữ liệu đã được định nghĩa giống như là `assets`, `participants` hay `transactions` vậy.

```js
// Emit an event for the modified asset.
var event = getFactory().newEvent('org.acme.sample', 'SampleEvent')
event.asset = tx.asset
event.oldValue = oldValue
event.newValue = tx.newValue
emit(event)
```

Một điều cần chú ý là trước khi tiến hành emit event, ta cần chắc chắn rằng data đã được validate bởi Composer model, để đảm bảo rằng client sẽ không nhận được các dữ liệu sai lệch từ event.

# Testing

Cả Go và Javascript đều có những tool và thư viện để viết unit test hiệu quả. Tuy nhiên, Composer cung cấp cho chúng ta nhiều hơn thế, Composer có những runtimes để ta có thể test với rất nhiều những trường hợp khác nhau

- **Node.js** runtime để có thể giả lập blockchain: Thích hợp đối với việc thực hiện unit test các transaction logic, thực hiện step-by-step debug, hay đánh giá code coverage.
- **Composer Playground** - một web runtime với interface: dễ dàng sử dụng để ta có thể test toàn bộ các chức năng của business network.
- **Hyperledger Fabric** runtime (v0.x runtime và cả v1.x runtime): Thích hợp cho thực hiện intergration test, system test và cả performance testing.

# Summary

Thật khó để so sánh 1-vs-1 giữa Fabric và Composer, vì cả 2 cung cấp những API ở level khác nhau. Tuy nhiên có một điều chắc chắn rằng là Composer **ngắn gọn** và **dễ tiếp cận** hơn là Fabric.

Hãy thử so sánh số dòng code để tạo ra Marbles network giữa Fabric và Composer

- _marbles_chaincode.go_: **627** dòng
- _Composer marbles-network_: tổng cộng **63** dòng, bao gồm 26 dòng logic và 37 dòng model

Có nghĩa là Composer ngắn gọn hơn Fabric những khoảng 10 lần để thực hiện cùng một công việc.

Ta có thể điểm lại những features lớn của Composer:

- business network sẽ tự động sinh ra các REST API (Swagger) thông qua `composer-rest-server` để ta có thể dễ dàng sử dụng API đó để kết nối với blockchain. `composer-rest-server` sử dụng `passport.js` để thực hiện authentication
- Composer sử dụng **Access Control Language** để định nghĩa toàn bộ quyền truy cập của participants trong network.
- Sử dụng Composer Node-RED nodes để tích hợp Composer với IoT, analytics, dashboards...
- VSCode extension để validate Composer model, ACL và query file
- Tích hợp Composer với các công nghệ tiên tiến khác của IBM, thông qua OpenAPI và LoopBack connector
- Unit test trên node.js runtime sử dụng các thư viện testing nổi tiếng của JS như là Mocha, Chai, Sinon, Istanbul...
- Có thể vừa dev vừa test trên Composer Playground
- Có thể generate ra một **skeleton Angular app** tương ứng với business network - vô cùng tiện lợi.
- Publish và sử dụng model cho những business network khác nhau.

Những features lớn của Fabric:

- Luôn luôn update những Fabric API mới nhất và những công cụ liên quan.
- Cho raw perfomance tốt hơn.
- type-safety.
- Có thể sử dụng một ngôn ngữ duy nhất cho cả business model và business logic.
- Có thể tích hợp với các bên thư viện C hay Go của bên thứ ba.

Tổng kết lại, với một dự án Hyperledger chạy trên Fabric, thì có lẽ **90%** Composer sẽ là lựa chọn hợp lý để bắt đầu.

Nó cho phép nhà phát triển tập trung hơn vào cách thiết kế network cũng như logic của business hơn là việc tập trung vào việc debug, sửa lỗi để chạy được network trong Fabric.

Hơn thế nữa, với hàng loạt các Composer high-level tool khác như REST API hay Angular app sẽ khiến việc code trở nên thuận tiện hơn rất nhiều.

Enjoy coding!

# References

- [https://blog.selman.org/2017/07/08/getting-started-with-blockchain-development/](https://blog.selman.org/2017/07/08/getting-started-with-blockchain-development/)
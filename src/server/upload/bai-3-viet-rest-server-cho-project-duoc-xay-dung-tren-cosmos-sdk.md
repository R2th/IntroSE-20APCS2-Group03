Ở bài trước chúng ta đã code xong phần xử lý logic bên dưới, nhưng hiện tại user vẫn phải tương tác với hệ thống bằng command-line rất thủ công. Ở bài này chúng ta sẽ xây dựng phần rest-server để người dùng tương tác dễ hơn. 
### 1. Các hàm xử lý request được gửi lên từ user bằng phương thức post
Các bạn mở file ```x/nameservice/client/rest/tx.go``` lên và thêm các dòng sau vào:
#### 1.1 Create Product
```go
type createProductReq struct { // cấu trúc của một request create product
	BaseReq     rest.BaseReq `json:"base_req"`
	ProductID   string       `json:"productID"` 
	Description string       `json:"description"`
	Price       string       `json:"price"`
}

func createProductHandler(cliCtx context.CLIContext) http.HandlerFunc { // hàm xử lý request createProductReq
	return func(w http.ResponseWriter, r *http.Request) {
		var req createProductReq

		if !rest.ReadRESTReq(w, r, cliCtx.Codec, &req) {
			rest.WriteErrorResponse(w, http.StatusBadRequest, "failed to parse request")
			return
		}

		baseReq := req.BaseReq.Sanitize()
		if !baseReq.ValidateBasic(w) {
			return
		}

		signer, err := sdk.AccAddressFromBech32(req.BaseReq.From)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}

		price, err := sdk.ParseCoins(req.Price)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}

		msg := types.NewMsgCreateProduct(req.ProductID, req.Description, price, signer)
		err = msg.ValidateBasic()
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}
      // broadcast message để handler có thể bắt được 
		utils.WriteGenerateStdTxResponse(w, cliCtx, baseReq, []sdk.Msg{msg})
	}
}
```

Một số chỗ cần lưu ý:
-  kiểu base request được định nghĩa bởi cosmos sdk
-  giá của product là string ví dụ "10nametoken" sau đó sẽ được dùng hàm ```sdk.ParseCoins()``` để convert về dạng sdk.Coins
-  req.Base.From sẽ lấy ra địa chỉ của người gửi request nhưng ở dạng string phải dùng hàm ```sdk.AccAddressFromBech32()``` để convert về dạng sdk.AccAddress

#### 1.2 Update product
```go
type updateProductReq struct {
	BaseReq     rest.BaseReq `json:"base_req"`
	ProductID   string       `json:"productID"`
	Description string       `json:"description"`
	Price       string       `json:"price"`
}

func updateProductHandler(cliCtx context.CLIContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req createProductReq

		if !rest.ReadRESTReq(w, r, cliCtx.Codec, &req) {
			rest.WriteErrorResponse(w, http.StatusBadRequest, "failed to parse request")
			return
		}

		baseReq := req.BaseReq.Sanitize()
		if !baseReq.ValidateBasic(w) {
			return
		}

		signer, err := sdk.AccAddressFromBech32(req.BaseReq.From)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}

		price, err := sdk.ParseCoins(req.Price)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}

		// create the message
		msg := types.NewMsgUpdateProduct(req.ProductID, req.Description, price, signer)
		err = msg.ValidateBasic()
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}

		utils.WriteGenerateStdTxResponse(w, cliCtx, baseReq, []sdk.Msg{msg})
	}
}
```
#### 1.3 Delete product
```go

type deleteProductReq struct {
	BaseReq   rest.BaseReq `json:"base_req"`
	ProductID string       `json:"productID"`
}

func deleteProductHandler(cliCtx context.CLIContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req deleteProductReq

		if !rest.ReadRESTReq(w, r, cliCtx.Codec, &req) {
			rest.WriteErrorResponse(w, http.StatusBadRequest, "failed to parse request")
			return
		}

		baseReq := req.BaseReq.Sanitize()
		if !baseReq.ValidateBasic(w) {
			return
		}

		signer, err := sdk.AccAddressFromBech32(req.BaseReq.From)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}

		// create the message
		msg := types.NewMsgDeleteProduct(req.ProductID, signer)
		err = msg.ValidateBasic()
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}

		utils.WriteGenerateStdTxResponse(w, cliCtx, baseReq, []sdk.Msg{msg})
	}
}
```
#### 1.4 Buy Product
```go
type buyProductReq struct {
	BaseReq   rest.BaseReq `json:"base_req"`
	ProductID string       `json:"productID"`
}

func buyProductHandler(cliCtx context.CLIContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req buyProductReq

		if !rest.ReadRESTReq(w, r, cliCtx.Codec, &req) {
			rest.WriteErrorResponse(w, http.StatusBadRequest, "failed to parse request")
			return
		}

		baseReq := req.BaseReq.Sanitize()
		if !baseReq.ValidateBasic(w) {
			return
		}

		signer, err := sdk.AccAddressFromBech32(req.BaseReq.From)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}

		// create the message
		msg := types.NewMsgBuyProduct(req.ProductID, signer)
		err = msg.ValidateBasic()
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}

		utils.WriteGenerateStdTxResponse(w, cliCtx, baseReq, []sdk.Msg{msg})
	}
}
```
### 2 Các hàm query để xử lý request được gửi lên bằng phương thức get.
 Mở file ```x/nameservice/client/rest/query.go``` và thêm các dòng sau vào:
 #### 2.1 Query Product theo productID
 ```go
 func queryProductHandler(cliCtx context.CLIContext, storeName string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		productID := vars["productID"] // lấy productID từ url

		res, _, err := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/product/%s", storeName, productID), nil) // query product
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusNotFound, err.Error())
			return
		}

		rest.PostProcessResponse(w, cliCtx, res) // trả về kết quả
	}
}
 ```
 
#### 2.1 Query tất cả products
```go
func allProductsHandler(cliCtx context.CLIContext, storeName string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		res, _, err := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/allProducts", storeName), nil)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusNotFound, err.Error())
			return
		}
		rest.PostProcessResponse(w, cliCtx, res)
	}
}
```

### 3 Thêm các routes để gọi đến các hàm trong tx.go và query.go
Mở file ```x/nameservice/client/rest/rest.go``` và thêm các dòng sau:
```go
    r.HandleFunc(fmt.Sprintf("/%s/product", storeName), createProductHandler(cliCtx)).Methods("POST")
	r.HandleFunc(fmt.Sprintf("/%s/product", storeName), updateProductHandler(cliCtx)).Methods("PUT")
	r.HandleFunc(fmt.Sprintf("/%s/product/buyProduct", storeName), buyProductHandler(cliCtx)).Methods("POST")
	r.HandleFunc(fmt.Sprintf("/%s/product/{productID}", storeName), queryProductHandler(cliCtx, storeName)).Methods("GET")
	r.HandleFunc(fmt.Sprintf("/%s/product", storeName), allProductsHandler(cliCtx, storeName)).Methods("GET")
```
### 4. Test
Ở thư mục gố chạy câu lệnh sau để make lại tools:
```bash
make install
```
Init lại network
```bash
./init.sh
nsd start
```
Để nguyên terminal đó, mở 1 terminal khác lên để chạy câu lệnh run rest-server
```bash
nscli rest-server --chain-id namechain --trust-node
```
Mở thêm một terminal khác và chạy các câu lệnh sau để test, đầu tiên là jack tạo product:
```bash
# lấy thông tin của jack
curl -s http://localhost:1317/auth/accounts/$(nscli keys show jack -a)
# lấy thông tin của alice
curl -s http://localhost:1317/auth/accounts/$(nscli keys show alice -a)

# jack gọi đến route http://localhost:1317/nameservice/product tạo một tạo một proposal có chứ MsgCreateProduct
curl -XPOST -s http://localhost:1317/nameservice/product --data-binary '{"base_req":{"from":"'$(nscli keys show jack -a)'","chain_id":"namechain"},"productID":"product01","description":"description01","price":"10nametoken"}' > unsignedTx.json
# một giao dịch chưa được ký đã được lưu vào file unsignedTx.json, ta sẽ phải chạy một lệnh để cho jack ký nó, chú ý đến sequence và account-number 
nscli tx sign unsignedTx.json --from jack --offline --chain-id namechain --sequence 1 --account-number 3 > signedTx.json
# sau đó broadcast tx để handler có thể bắt được
nscli tx broadcast signedTx.json

# query để thấy product vừa được tạo
curl -s http://localhost:1317/nameservice/product/product01
```
Kết quả
```json
{
  "height": "0",
  "result": {
    "productID": "product01",
    "description": "description01",
    "owner": "cosmos1wzktejtsnpa0pzzyzth780sl2tcstj86pm4wr6",
    "price": [
      {
        "denom": "nametoken",
        "amount": "10"
      }
    ]
  }
}
```

Tiếp theo là alice mua product:
```bash
# alice gọi route http://localhost:1317/nameservice/product/buyProduct để tạo một proposal có chưa MsgBuyProduct
curl -XPOST -s http://localhost:1317/nameservice/product/buyProduct --data-binary '{"base_req":{"from":"'$(nscli keys show alice -a)'","chain_id":"namechain"},"productID":"product01"}' > unsignedTx.json
# alice ký, chú ý đến sequence và account-number
nscli tx sign unsignedTx.json --from alice --offline --chain-id namechain --sequence 0 --account-number 4 > signedTx.json
# broadcast giao dịch
nscli tx broadcast signedTx.json

# query lại product, để thấy owner đã được thay đổi
curl -s http://localhost:1317/nameservice/product/product01
```

Kết quả:
```json
{
  "height": "0",
  "result": {
    "productID": "product01",
    "description": "description01",
    "owner": "cosmos1my6qwkz6cz40ful4tquckhhuajzzxcj80rsdrr",
    "price": [
      {
        "denom": "nametoken",
        "amount": "10"
      }
    ]
  }
}
```

Xem lại thông tin của jack và alice để thấy tiền đã được chuyển từ alice sang jack
```bash
curl -s http://localhost:1317/auth/accounts/$(nscli keys show jack -a)
curl -s http://localhost:1317/auth/accounts/$(nscli keys show alice -a)
```
Kết quả:
```json
{
  "height": "506",
  "result": {
    "type": "cosmos-sdk/Account",
    "value": {
      "address": "cosmos1wzktejtsnpa0pzzyzth780sl2tcstj86pm4wr6",
      "coins": [
        {
          "denom": "nametoken",
          "amount": "1010"
        }
      ],
      "public_key": "cosmospub1addwnpepqddtqrpnq6889s5wet6m4s9khgrdqfjwyje09kzd7rsgh76zv8ftzpj3d36",
      "account_number": 3,
      "sequence": 2
    }
  }
}
```
```json
{
  "height": "513",
  "result": {
    "type": "cosmos-sdk/Account",
    "value": {
      "address": "cosmos1my6qwkz6cz40ful4tquckhhuajzzxcj80rsdrr",
      "coins": [
        {
          "denom": "nametoken",
          "amount": "990"
        }
      ],
      "public_key": "cosmospub1addwnpepqwj7up3q7lcwxj80fc07mely24acltafpangq8r2f42f788zzn8a5yw06rq",
      "account_number": 4,
      "sequence": 1
    }
  }
}
```

### Tổng kết
Như vậy là đã xong, nhưng còn một điều là hiện tại user vẫn phải ký và broadcast giao dịch bằng câu lệnh, bài sau - bài cuối cùng trong series này mình sẽ hướng dẫn các bạn viết route cho việc ký và broadcast giao dịch để sau đó có thể test dễ dàng trên PostMan và ghép với giao diện
### Link tham khảo
https://tutorials.cosmos.network/nameservice/tutorial/23-run-rest.html
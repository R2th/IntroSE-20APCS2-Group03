Ở bài trước mình đã hướng dẫn các bạn viết rest-server để người dùng có thể tại giao dịch bằng API, nhưng vẫn còn một vấn đề là hiện tại người dùng vẫn phải dùng command-line để ký và broadcast giao dịch. Hôm nay, ở bài cuối cùng này mình sẽ hướng dẫn các bạn cách để người dùng có thể ký và broadcast giao dịch bằng API, góp phần làm trong suốt luồng ứng dụng bên dưới đối với người dùng hơn.
### 1. Tìm hiểu về lệnh ```tx sign``` và cách lấy thông tin của user từ hệ thống
Quay lại bài trước, khi người dùng tạo một giao dịch, thì giao dịch đó mới chỉ ở dạng proposal, người dùng phải ký và broadcast nó thì nó mới có hiệu lực.

Câu lệnh ```tx sign``` có cấu trúc như sau:
```bash
nscli tx sign unsignedTx.json --from alice --offline --chain-id namechain --sequence 0 --account-number 4
```
xem thêm source code của câu lệnh [tại đây](https://github.com/cosmos/cosmos-sdk/blob/master/x/auth/client/cli/tx_sign.go). Chú ý vào các tham số quan trọng sau:
- Tham số ngay phía sau ```sign``` bắt buộc phải là một file, trong trường hợp này là ```usignedTx.json```
- Tham số sau flag ```--from``` hoặc là tên hoặc là địa chỉ của user tạo giao dịch
- Tham số sau flag ```--sequence``` tăng dần từ 0 sau mỗi giao dịch của người đó dù giao dịch có thành công hay không, ý nghĩa của tham số này là giúp hệ thống có thể sắp xếp các giao dịch đúng thứ tự, tránh bị double spending.
- Tham số ngay sau flag ```--accountn-number``` là số thứ tự của user đó trong hệ thống

Như vậy muốn người dùng có thể ký giao dịch bằng API, thì trong request mà user gửi lên phải có: giao dịch chưa được ký, tên hoặc địa chỉ của user đó, sequence, account-number. 

Các tham số địa chỉ, sequence, account-number là các tham số mà được hệ thống tính toán và cấp cho user, người dùng không thể biết trước nó được, thế nên đầu tiên mình sẽ viết một route để người dùng có thể query được địa chỉ của mình thông qua tên, từ đó lại dùng tiếp route mặc định ```http://localhost:1317/auth/accounts/$address``` để query về tiếp các tham số ```sequence```, ```account-number```, cũng như số dư token của user đó.

Mở file ```x/nameservice/client/rest/query.go``` và thêm các đoạn sau đây:
- Import package ```os/exec``` vào đầu file để có thể thực thi lệnh.
```go
import (
    ...
    "os/exec"
    ...
)
```
- Thêm hàm xử lý request dưới đây
```go
func accAddressHandler(cliCtx context.CLIContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		name := vars["name"]

		cmd := exec.Command("nscli", "keys", "show", name, "-a") // chạy ngầm câu lệnh show key của một name
		stdout, err := cmd.Output() // bắt giá trị trả về
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}

		address := string(stdout) // ép kiểu về string
		result := strings.Trim(address, "\n") // cắt bỏ \n
		rest.PostProcessResponse(w, cliCtx, result) // trả về kết quả cho ngươi dùng
	}
}
```

Thêm một route bên file ```x/nameservice/client/rest/rest.go``` để gọi đến hàm xử lý ở trên:
```go
r.HandleFunc(fmt.Sprintf("/%s/names/{name}/address", storeName), accAddressHandler(cliCtx)).Methods("GET")
```
### 2. Tìm hiểu lệnh ```tx broadcast```
Câu lệnh ```tx broadcast``` có cấu trúc như sau:
```bash
nscli tx broadcast signedTx.json
```
Bạn có thể xem code của câu lệnh [tại đây](https://github.com/cosmos/cosmos-sdk/blob/master/x/auth/client/cli/broadcast.go)
- Tham só đi ngay sau ```broadcast``` phải là một file trong trường hợp này là ```signedTx.json

Kết hợp 2 câu lệnh lại ta có thể hình dung luồng của route mà ta sắp code như sau: 
- User gửi một request gồm các tham số: ```usignedTx```, ```sequence```, ```account number```
- Server ghi ```unsignedTx``` vào file ```unsignedTx.json```
- Server thực hiện ngầm câu lệnh ```tx sign``` và ghi kết qủa vào file ```signedTx.json```
- Server lại thực hiện ngầm câu lệnh ```tx broadcast```
-
### 3. Code
Mở file ```x/nameserivce/client/rest/tx.go``` và thêm đoạn code sau:
```go
type signTxReq struct {
	BaseReq       rest.BaseReq `json:"base_req"`
	Tx            string       `json:"tx"`
	Sequence      string       `json:"sequence"`
	AccountNumber string       `json:"accountNumber"`
}

func signTxHandler(cliCtx context.CLIContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		var req signTxReq
		if !rest.ReadRESTReq(w, r, cliCtx.Codec, &req) {
			rest.WriteErrorResponse(w, http.StatusBadRequest, "failed to parse request")
			return
		}

		baseReq := req.BaseReq.Sanitize()
		if !baseReq.ValidateBasic(w) {
			return
		}

		filePath := "unsignedTx.json"
		data := []byte(req.Tx)

		err := ioutil.WriteFile(filePath, data, 0644) // ghi tx mà user gửi lên vào file unsignedTx.json
		if err != nil {
			panic(err)
		}

		cmd := exec.Command("nscli", "tx", "sign", filePath, "--from", req.BaseReq.From, "--offline", "--chain-id", req.BaseReq.ChainID, "--sequence", req.Sequence, "--account-number", req.AccountNumber) // thực hiện ký
		stdout, err := cmd.Output()
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}

		filePath = "signedTx.json"
		data = []byte(string(stdout))
		err = ioutil.WriteFile(filePath, data, 0644) // ghi giao dịch đã ký vào filed signedTx.json
		if err != nil {
			panic(err)
		}

		cmd = exec.Command("nscli", "tx", "broadcast", filePath) // broadcase giao dịch đã được ký
		stdout, err = cmd.Output()
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}

		rest.PostProcessResponse(w, cliCtx, string(stdout))
	}
}
```
Mở file ```x/nameservice/client/rest/rest.go``` và thêm dòng sau vào:
```go
r.HandleFunc(fmt.Sprintf("/%s/tx/sign", storeName), signTxHandler(cliCtx)).Methods("POST")
```
### 4. Test
Make lại tools, sau đó init và start chain:
```bash
make install
./init.sh
nsd start
```
Mở một terminal khác và start server:
```bash
nscli rest-server --chain-id namechain --trust-node
```
Mở Post Man lên và test
- Query address theo của jack:
![](https://images.viblo.asia/50c6cddc-e5e7-4985-a103-5fd07285f6d0.png)
- Query tất cả infor của  jack:
![](https://images.viblo.asia/fa5e09a8-5508-48ca-b7ac-695531d16d99.png)
- jack tạo product:
![](https://images.viblo.asia/0fef35c4-a9fa-4281-a338-351a366f4ca6.png)

- jack ký giao dịch tạo product lưu ý coy giá trị trả về của route vừa rồi vào ```tx``` của request này
![](https://images.viblo.asia/163b8e63-d08b-4510-baac-fcb540b98a3f.png)
- Query để thấy product đã được tạo
![](https://images.viblo.asia/36677b7e-537d-40a3-8b6e-12423b8bff23.png)
- Query address của alice
![](https://images.viblo.asia/9f16ef5c-0101-4fc3-a1e1-e8fd43d3af57.png)
- Query tất cả infor của alice:
![](https://images.viblo.asia/5cbc84e6-6334-41ac-b3b0-c5c18e0f9db6.png)
- alice tạo giao dịch buy product
![](https://images.viblo.asia/6bfd505a-7ad6-4b06-98c7-4b927421537d.png)
- alice ký giao dịch buy product
![](https://images.viblo.asia/79c6f914-9420-4a2e-a61f-246effc4c142.png)
- Query lại product để thấy nó đã được chuyển owner
![](https://images.viblo.asia/9f4fccca-76de-4a62-ae2a-cc962934f141.png)
- Query thông tin của jack và alice để thấy đã có ```10nametoken``` đã được chuyển từ alice sang jack
![](https://images.viblo.asia/cca598b3-2e3a-469d-99d1-2b815da0908c.png)
![](https://images.viblo.asia/871b969e-38c7-49ca-bc08-6d2557308422.png)

### Tổng kết
Như vậy là mình đã hướng dẫn các bạn hoàn thành series này, các bạn đã đủ hoàn toàn có thể clone repo mẫu cho series [tại đây](https://github.com/trinhtan/cosmos-sample) và customize theo ý của mình.
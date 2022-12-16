## Yêu Cầu:
* Với 1 Struct mà có thể request data cả String và Number.

## Vấn Đề:
* Ban đầu một api thêm một đơn hàng với input:
```
{
  "identity": "225777777",
  "amount":"1000"
}
```
* Struct data:
```
type Request struct {
	Identity string `json:"identity"`
	Amount   string `json:"amount"`
}
```
* Một yêu cầu mới là dùng api trên để tích hợp với một client khác, yêu cầu nghiệp vụ giống nhau chỉ khác type của amount là *Number*.
```
var js = []byte(`
	{
		"identity": "225777777",
		"amount":1000
	  }
	`)
	var req Request
	err := json.Unmarshal(js, &req)
	fmt.Println(err)
```
=> lỗi sẽ xuất hiện
```
json: cannot unmarshal number into Go struct field Request.amount of type string
```

## Giải Quyết:
* Với yêu cầu đặt ra như trên, một field amount với type là String, Number. Cần đổi *type* *json.Number*
```
type Request struct {
	Identity string      `json:"identity"`
	Amount   json.Number `json:"amount"`
}
```
* Với type json.Number, thì có thể convert request data cả 2:
```
{
		"identity": "225777777",
		"amount":"1000"
}

--
{
		"identity": "225777777",
		"amount": 1000
}
```
* Khi đó mỗi type khác nhau, chỉ cần:
```
	fAmount, _ := req.Amount.Float64()
	fmt.Println("float:", fAmount)
	iAmount, _ := req.Amount.Int64()
	fmt.Println("amount:", iAmount)
	fmt.Println("string:", req.Amount.String())
```

**Full source**
```
package main

import (
	"encoding/json"
	"fmt"
)

type Request struct {
	Identity string      `json:"identity"`
	Amount   json.Number `json:"amount"`
}

func main() {
	var input1 = []byte(`
	{
		"identity": "0335888888",
		"amount":"1000"
	  }
	`)
	var req Request
	err := json.Unmarshal(input1, &req)
	fmt.Println("err type String", err)
	fmt.Println("req1:", fmt.Sprintf("%#v", req))
	fAmount, _ := req.Amount.Float64()
	fmt.Println("float:", fAmount)
	iAmount, _ := req.Amount.Int64()
	fmt.Println("amount:", iAmount)
	fmt.Println("string:", req.Amount.String())

	fmt.Println("---")
	fmt.Println("---")
	fmt.Println("request-2")

	var input2 = []byte(`
	{
		"identity": "0335888888",
		"amount": 1000
	  }
	`)
	var req2 Request
	err2 := json.Unmarshal(input2, &req2)
	fmt.Println("err type Number:", err2)
	fmt.Println("req1:", fmt.Sprintf("%#v", req2))
	fAmount2, _ := req2.Amount.Float64()
	fmt.Println("float:", fAmount2)
	iAmount2, _ := req2.Amount.Int64()
	fmt.Println("amount:", iAmount2)
	fmt.Println("string:", req2.Amount.String())
}
```

Tks anh/em.

**Contact**
* facebook: https://www.facebook.com/phucducdev/
* gmail: ducnp09081998@gmail.com or phucducktpm@gmail.com
* linkedin: https://www.linkedin.com/in/phucducktpm/
* hashnode: https://hashnode.com/@OpenDev
* telegram: https://t.me/OpenDevGolang
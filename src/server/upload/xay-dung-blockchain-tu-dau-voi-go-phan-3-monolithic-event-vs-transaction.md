# Giới thiệu
Ở phần trước, chúng ta đã tìm hiểu cơ bản về Transaction & DB State. Bạn nào chưa tìm hiểu thì có thể xem lại nhé.

Github: https://github.com/lequocbinh04/the-simple-blockchain

# Tiếp tục câu chuyện
#### Tuesday evening, March 26.
Vào một buổi tối lạnh lẽo khi John đang vui vẻ xã stress với tựa game yêu thích của mình, John vô tình đã gõ nhầm `rm -rf /.`, mọi thứ trên máy tính đã biến mất sạch sẽ, kể cả `genesis.json` và `state.json` cũng đã bị bay màu.

John, một senior developer, anh ấy vô cùng bực tức và chửi phụ huynh của chiếc máy tính, nhưng anh ấy ko hoảng sợ khi không có backup cho máy tính của mình, vì anh ấy đã có một thứ tốt hơn: mảnh giấy ghi lại toàn bộ giao dịch. Bây giờ việc của anh ấy cần làm là thực hiện lại những transactions và db của anh ấy sẽ được khôi phục.

Anh ấy vô cùng thích thú với phương án này, nên anh ấy quyết định sẽ phát triển MVP database của mình: Với mỗi hoạt động của quán bar (VD: thanh toán tiền nước), nó phải được ghi lại bên trong cơ sở dữ liệu của blockchain.

Mỗi **khách hàng** được ghi trong DB là một kiểu dữ liệu **Account**:

```go
type Account string
```

Mỗi **Transaction** (TX - sự thay đổi dữ liệu trong DB) sẽ có 4 attributes: from, to, value và data. Thuộc tính **data** là một giá trị là data của tx đó (vd: "reward" biểu thị cho transaction đó là phần thưởng cho John vì đã phát minh ra TBB và làm tăng tổng cung ban đầu của TBB).

```go
type Tx struct {
    From Account `json:"from"`
    To Account `json:"to"`
    Value uint `json:"value"`
    Data string `json:"data"`
}
func (t Tx) IsReward() bool {
    return t.Data == "reward"
}
```

**Genesis DB** vẫn là một file json:
```go
{
    "genesis_time": "2019-03-18T00:00:00.000000000Z",
    "chain_id": "the-blockchain-bar-ledger",
    "balances": {
        "john": 1000000
    }
}
```

Và mọi giao dịch, trước kia được viết vào giấy, giờ anh ấy đã viết vào file tx.db (mỗi dòng 1 file json là chi tiết của tx)

```go
{"from":"john","to":"john","value":3,"data":""}
{"from":"john","to":"john","value":700,"data":"reward"}
{"from":"john","to":"jack","value":2000,"data":""}
{"from":"john","to":"john","value":100,"data":"reward"}
{"from":"jack","to":"john","value":1,"data":""}
```

Và phần quan trọng nhất, chứa toàn bộ business login sẽ là `State`
```go
type State struct {
    Balances map[Account]uint
    txMempool []Tx
    dbFile *os.File
}
```

`State` sẽ lưu lại toàn bộ số dư của người dùng, lịch sử giao dịch, ai chuyển TBB token cho ai. `State` bắt đầu bằng cách đọc dữ liệu init từ `genesis.json`

```go
func NewStateFromDisk() (*State, error) {
    // get current working directory
    cwd, err := os.Getwd()
    if err != nil {
        return nil, err
    }
    genFilePath := filepath.Join(cwd, "database", "genesis.json")
    gen, err := loadGenesis(genFilePath)
    if err != nil {
        return nil, err
    }
    balances := make(map[Account]uint)
    for account, balance := range gen.Balances {
        balances[account] = balance
    }
```

Sau khi load thành công số dư ban đầu của người dùng từ `genesis.json` chúng ta sẽ tuần tự thực hiện lại toàn bộ giao dịch trong `tx.db`
```go
    txDbFilePath := filepath.Join(cwd, "database", "tx.db")
    f, err := os.OpenFile(txDbFilePath, os.O_APPEND|os.O_RDWR, 0600)
    if err != nil {
        return nil, err
    }
    scanner := bufio.NewScanner(f)
    state := &State{balances, make([]Tx, 0), f}
    // Iterate over each the tx.db file's line
    for scanner.Scan() {
        if err := scanner.Err(); err != nil {
            return nil, err
        }
        // Convert JSON encoded TX into an object (struct)
        var tx Tx
        json.Unmarshal(scanner.Bytes(), &tx)
        // Rebuild the state (user balances),
        // as a series of events
        if err := state.apply(tx); err != nil {
            return nil, err
        }
    }
    return state, nil
}
```


State component chịu trách nhiệm:
- Thêm mới một **transaction** vào **Mempool**
- Xác thực **transaction** (check số dư người dùng)
- **Thay đổi** state
- **Persist** state vào file
- Tính toán lại toàn bộ giao dịch bắt đầu từ genesis


Thêm mới một **transaction** vào **Mempool**:
```go
func (s *State) Add(tx Tx) error {
    if err := s.apply(tx); err != nil {
        return err
    }
    s.txMempool = append(s.txMempool, tx)
    return nil
}
```

**Persist** state vào file
```go
func (s *State) Persist() error {
    // Make a copy of mempool because the s.txMempool will be modified
    // in the loop below
    mempool := make([]Tx, len(s.txMempool))
    copy(mempool, s.txMempool)
    for i := 0; i < len(mempool); i++ {
        txJson, err := json.Marshal(mempool[i])
            if err != nil {
            return err
        }
        if _, err = s.dbFile.Write(append(txJson, '\n')); err != nil {
            return err
        }
        // Remove the TX written to a file from the mempool
        s.txMempool = s.txMempool[1:]
    }
    return nil
}
```

Xác thực **transaction** (check số dư người dùng)
```go
func (s *State) apply(tx Tx) error {
    if tx.IsReward() {
        s.Balances[tx.To] += tx.Value
        return nil
    }
    if tx.Value > s.Balances[tx.From] {
        return fmt.Errorf("insufficient balance")
    }
    s.Balances[tx.From] -= tx.Value
    s.Balances[tx.To] += tx.Value
    return nil
}
```

# Build một Command-Line-Interface (CLI)
#### Tuesday evening, March 26
John muốn có một cách để thêm transaction vào DB dễ dàng hơn và dễ dàng lấy ra số dư của user trên hệ thống. Vì go có thể build ra binary file nên John quyết định dựng một CLI để dễ dàng thao tác.

Cách dễ dàng để build 1 CLI với go là sử dụng thư viện `github.com/spf13/cobra`.  Tiếp theo anh ấy tạo mới file `cmd/tbb/main.go`

```go
package main
import (
    "github.com/spf13/cobra"
    "os"
    "fmt"
)
func main() {
    var tbbCmd = &cobra.Command{
        Use: "tbb",
        Short: "The Blockchain Bar CLI",
        Run: func(cmd *cobra.Command, args []string) {
        },
    }
    err := tbbCmd.Execute()
    if err != nil {
        fmt.Fprintln(os.Stderr, err)
        os.Exit(1)
    }
}
```

Sau đó anh ấy tiến hành cài đặt CLI
```shell
go install ./cmd/tbb/...
```
```shell
go: finding github.com/spf13/cobra v1.0.0
go: downloading github.com/spf13/cobra v1.0.0
go: extracting github.com/spf13/cobra v1.0.0
```

Go sẽ tự động cài nó vào `$GOPATH/bin` và bạn có thể chạy trực tiếp lệnh `tbb` ở terminal, nhưng tất nhiên là hiện tại sẽ chưa có gì cả do hàm run ở file `main.go` đang rỗng.

Đầu tiên John sẽ thực hiện tạo version cho nó,  cùng thư mục với `main.go` ta tạo `version.go`
```go
package main
import (
    "fmt"
    "github.com/spf13/cobra"
)
const Major = "0"
const Minor = "1"
const Fix = "0"
const Verbal = "TX Add && Balances List"
var versionCmd = &cobra.Command{
    Use: "version",
    Short: "Describes version.",
    Run: func(cmd *cobra.Command, args []string) {
        fmt.Printf("Version: %s.%s.%s-beta %s", Major, Minor, Fix, Verbal)
    },
}
```

Compile và run
```shell
go install ./cmd/tbb/...
tbb version
```

```shell
> Version: 0.1.0-beta TX Add && Balances List
```

Nuột!

Tương tự anh ấy tạo file `balances.go`
```go
func balancesCmd() *cobra.Command {
    var balancesCmd = &cobra.Command{
        Use: "balances",
        Short: "Interact with balances (list...).",
        PreRunE: func(cmd *cobra.Command, args []string) error {
            return incorrectUsageErr()
        },
        Run: func(cmd *cobra.Command, args []string) {
        },
    }
    balancesCmd.AddCommand(balancesListCmd)
    return balancesCmd
}
```

Lệnh `balance` sẽ in số dư của user ra màn hình
```go
var balancesListCmd = &cobra.Command{
    Use: "list",
    Short: "Lists all balances.",
    Run: func(cmd *cobra.Command, args []string) {
        state, err := database.NewStateFromDisk()
        if err != nil {
            fmt.Fprintln(os.Stderr, err)
            os.Exit(1)
        }
        defer state.Close()
        fmt.Println("Accounts balances:")
        fmt.Println("__________________")
        fmt.Println("")
        for account, balance := range state.Balances {
            fmt.Println(fmt.Sprintf("%s: %d", account, balance))
        }
    },
}
```

Tiếp theo John test lệnh `balance`
```shell
go install ./cmd/tbb/...

tbb balances list
```

```shell
> john: 1000000
```

Ngon lành! tiếp theo John sẽ làm lệnh để tương tác với transaction, anh ấy tạo tiếp file `./cmd/tbb/tx.go`

```go
func txCmd() *cobra.Command {
    var txsCmd = &cobra.Command{
        Use: "tx",
        Short: "Interact with txs (add...).",
        PreRunE: func(cmd *cobra.Command, args []string) error {
            return incorrectUsageErr()
        },
        Run: func(cmd *cobra.Command, args []string) {
        },
    }
    txsCmd.AddCommand(txAddCmd())
    return txsCmd
}
```

`tbb tx add` để thêm mới một tx vào db

```go
func txAddCmd() *cobra.Command {
    var cmd = &cobra.Command{
        Use: "add",
        Short: "Adds new TX to database.",
        Run: func(cmd *cobra.Command, args []string) {
            from, _ := cmd.Flags().GetString(flagFrom)
            to, _ := cmd.Flags().GetString(flagTo)
            value, _ := cmd.Flags().GetUint(flagValue)
            data, _ := cmd.Flags().GetString(flagData)
            fromAcc := database.NewAccount(from)
            toAcc := database.NewAccount(to)
            tx := database.NewTx(fromAcc, toAcc, value, data)
            state, err := database.NewStateFromDisk()
            if err != nil {
                fmt.Fprintln(os.Stderr, err)
                os.Exit(1)
            }
            // defer means, at the end of this function execution,
            // execute the following statement
            // (close DB file with all TXs)
            defer state.Close()
            // Add the TX to an in-memory array (pool)
            err = state.Add(tx)
            if err != nil {
                fmt.Fprintln(os.Stderr, err)
                os.Exit(1)
            }
            // Flush the mempool TXs to disk
            err = state.Persist()
            if err != nil {
                fmt.Fprintln(os.Stderr, err)
            os.Exit(1)
            }
            fmt.Println("TX successfully added to the ledger.")
        },
    }
```

Lệnh `tbb tx add` sẽ có 3 flag **bắt buộc** là `--from`, `--to` và `--value`. CLI đã hoàn thiện!

John lần lượt thực hiện add những tx anh ấy đã ghi trên tờ giấy
```shell
tbb tx add --from=john --to=john --value=3
tbb tx add --from=john --to=john --value=700 --data=reward
tbb tx add --from=john --to=jack --value=2000
tbb tx add --from=john --to=john --value=100 --data=reward
tbb tx add --from=jack --to=john --value=1
```

Get balance
```shell
tbb balances list
```

```shell
> Accounts balances:
__________________
john: 998801
jack: 1999
```

Dữ liệu đã được ghi thành công!

# Mempool
Mempool trong series này được thiết kế **tác giả** một cách **rất rất** đơn giản, nhằm mục đích giáo dục. Để biết rõ hơn về mempool trong các dự án thực tế các bạn có thể tự mình tìm hiểu tại code của **go-ethereum**

- Github: https://github.com/ethereum/go-ethereum/blob/master/core/txpool/txpool.go

# Tổng kết
[🔑] Block chain là một cơ sở dữ liệu.

Tổng cung của token, số dư ban đầu của user, và các setting của blockchain sẽ được đặt ở Genesis file. Số dư, trạng thái ban đầu của blockchain được ghi ở genesis file là không bao giờ thay đổi.

Các thay đổi lên cơ sở dữ liệu gọi là giao dịch (Transaction | TX). **Giao dịch là các sự kiện cho các hành động trong hệ thống**
Ngày càng có nhiều nền tảng blockchain hỗ trợ việc lưu trư và sử dụng data như blockstack, sia hay ocean protocol, bên cạnh đó đang nổi lên một nền tảng cũng hỗ trợ việc này đó là Arweave. Nếu bạn chưa biết thì nền tảng này vừa raise 8M$ từ việc lưu trữ dữ liệu thông tin về corona : chi tiết có thể xem tại  [đây](https://techcrunch.com/2020/03/05/coronavirus-censorship-arweave/) .

Việc quá nhiều nền tảng cùng chung 1 sứ mệnh thì cuối cùng cũng sẽ đi đến trạng thái chọn lọc để tìm ra nền tảng phù hợp nhất. Trong bài viết lần này mình sẽ giới thiệu về Arweave để mọi người thử đánh giá triển vọng của nền tảng blockchain lưu trữ data này.

![](https://images.viblo.asia/29734c1d-1c6d-4830-af0f-6396f08e9af2.jpg)


# Giới thiệu chung

Arweave tập trung mục đích chính vào việc lưu trữ dữ liệu, người dùng sẽ trả phí để tạo các transaction lưu trữ data của mình trong vòng 100 năm cho các miner (số tiền được tính theo công thức được đưa ra bởi arweave có thể đọc trong [yellow paper](https://www.arweave.org/yellow-paper.pdf)).

Mục tiêu chính là lưu trữ data và các application, bên cạnh đó thì cũng có các use case khác như Feedweave và Weavemail.

## Kiến trúc

Đầu tiên thì kiến trúc của chuỗi block của Arweave sẽ không giống với các chuỗi blockchain thường (thường giống một chuỗi linked list) mà sẽ là dạng một đồ thị do các khối không chỉ liên kết với khối trước đó mà còn liết kết với một khối bất kì trong chuỗi gọi là khối **recall block** .

![](https://images.viblo.asia/1a1d559a-ee38-44c1-8778-0642a59e9c78.png)

Chuỗi này có tên là **Blockweave**, nơi mà các block liên kết với block trước nó và một block **recall** (block này được xác định dựa trên mã hash và độ cao của block phía trước). Mục đích có thêm một liên kết này là để kích hoạt cơ chế đồng thuận **Proof of Access** (PoA). Thành phần trong các block của Blockweave cũng khá tương quan như các blockchain khác như BTC, ETH,... cũng chứa headers và body (tuy nhiên điểm đặc biệt là mỗi trx của Arweave hỗ trợ lên đến 10MB dữ liệu)

## Cơ chế đồng thuận (Consensus)

Như nói ở phần trên thì cơ chế đồng thuận của mạng này là **Proof of Access** - Bằng chứng truy cập.
Mục đích chính của nền tảng này là lưu trữ dữ liệu do đó cơ chế đồng thuận được sinh ra sao cho có thể chứng minh được rằng các miner vân đang lưu trữ data cho người dùng.

Đầu tiên thì PoA là một bản nâng cấp của PoW - tức là vẫn cần phải bỏ điện năng để tính toán để giải bài toán tạo ra block mới, tuy nhiên nó sẽ cân bằng giữa việc lưu trữ dữ liệu.

Dưới đây sẽ là công thức để giải bài toán tạo ra block mới

![](https://images.viblo.asia/e6773720-90d8-483e-8891-1b92d61f2b04.png)


Trước khi kết hợp với **nonce** để giải toán thì sẽ cần **Block data segment** (BDS) được tổng hợp từ 3 phần :

1. TXs: Đây là danh sách các transaction đã được kiểm duyệt để trong mining pool
2. Previous Block: Block mới nhất trong Blockweave
3. Recall Block: Đầu tiên chúng ta sẽ phải tìm đúng **recall block** bằng cách dựa vào **hash** và **độ cao** của **previous block** khi đó sẽ xác định được địa chỉ của recall block - Điều đó đảm bảo rằng không thể có miner nào có thể gian lận vì block recall không thể đoán trước.

=> Từ những dữ kiện trên và kết hợp với nonce để giải bài toán tương tự như PoW

Từ đó có thể thấy phần cải tiến của PoA tạm thời sẽ giải quyết các vấn đề về việc lưu trữ dữ liệu nhờ có **Recall Block**:
- Đảm bảo các miner phải lưu trữ dữ liệu người dùng vì muốn tạo ra block mới phải có quyền truy cập đến block recall để lấy dữ liệu hash (hash toàn bộ recall block)
- Giảm thiểu chi phí điện năng vì sẽ không tốn quá nhiều hashrate vì độ khó sẽ không như PoW mà sẽ dựa trên tốc độ tính toán của những miner sở hữu recall block

Tuy nhiên vãn sẽ tồn tại một số điểm yếu :

Khi các miner nhập lại thành các pool lớn thì vẫn sẽ quy về bài toán PoW cũ vì khi đó đều đã có full node và sẽ cạnh tranh nhau dựa trên tốc độ tính toán, những solo miner sẽ khó cạnh tranh và có thể dừng mining => Khi đó tốc độ truy xuất data của user sẽ giảm đi rõ rệt vị một lượng lớn các node đã dừng không lưu trữ mà tâp trung hết ở các pool lớn (Bài toán của những blockchain pow)

# Permaweb

## Chuẩn bị
Arweave không chỉ hỗ trợ việc lưu trữ dữ liệu mà còn hỗ trợ các ứng dụng bằng các thư viện để tương tác với các dữ liệu trên **blockweave**

![](https://images.viblo.asia/336c9ceb-ea1d-4710-8199-f4116d4ec9b1.png)

### Đăng ký ví

Cũng giống như các public blockchain thì chúng ta sẽ có ví để giữ token, có thể tạo ví thông qua :

- Extension: Dùng extension để tạo ví thông quan [chrome extension](https://chrome.google.com/webstore/detail/arweave/iplppiggblloelhoglpmkmbinggcaaoc?hl=en-GB)
- Generate ví thông qua package (Khuyến khích nên sử dụng vì sau cũng sẽ dùng để deploy ứng dụng) : 
```js
- Install package: 

npm install -g arweave-deploy
npm update -g arweave-deploy

- Generate ví:

arweave key-create new-arweave-key.json

- Load ví được export từ extension:

arweave key-save path/to/arweave-key.json
```

### Tương tác với blockchain thông qua ArweaveJs

Trong bài mình sẽ hướng dẫn các bạn xây dựng ứng dụng trên nền tảng web do đó sẽ thông qua thư viện này :

https://github.com/ArweaveTeam/arweave-js

Và cũng cần một chút kinh nghiệm về Reactjs

Để dễ hình dung ứng dụng chúng ta sẽ xây thì các bạn có thể xem trước mặt mũi của nó như thế nào thông qua:

[Sudoku in Arweave](https://arweave.net/ssycaYLGzyuOhpfdTw0JgGWiVQhbKTfAvcO8lg0ZIbk)


Trong ứng dụng này thì chúng ta sẽ tạo các Trx để lưu lại điểm của user và lấy để show ra leaderboard

Toàn bộ source code sẽ ở đây : [sudoku arweave](https://github.com/tranchien2002/sudoku) - các bạn có thể tham khảo

## Xây dựng ứng dụng

Sau khi clone code từ github về các bạn sẽ tập trung focus vào file **index.js** vì phần lớn các thao tác tập trung ở phần này 

### Khởi tạo

Đầu tiên để tương tác chúng ta sẽ cần 1 instance được khởi tạo từ package Arweave thông qua các thuộc tính phía dưới

```js
async componentDidMount() {
    const arweave = Arweave.init({
      host: 'arweave.net',
      port: 443,
      protocol: 'https',
    });
    this.setState({ arweave: arweave });
  }
```


### Tạo transaction

Đăng nhập thông qua file key: Điểm khác biệt so với các dapp Ethereum so với Arweave là bên Arweave hông đăng nhập thông qua extension mà sẽ import file key, hàm phía dưới sẽ đọc file key và lấy ra **jwk** để sau này dùng để kí các Trx

```js
 uploadKey = async (e) => {
    let dataFile = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = async (e) => {
      const jwk = JSON.parse(fileReader.result);
      console.log(jwk);
      this.setState({ jwk: jwk });
      const arweave = this.state.arweave;
      if (arweave) {
        arweave.wallets.jwkToAddress(jwk).then(async (address) => {
          this.setState({ address: address, loggedIn: true });
        });
      }
    };
    if (dataFile) {
      fileReader.readAsText(dataFile);
    }
  };
```

Sau khi upload thì có thể tạo trực tiệp transaction:

```js
submitScore = async () => {
    let unixTime = Math.round(new Date().getTime() / 1000);
    var tx = await this.state.arweave.createTransaction(
      {
        data: this.state.timeCounter.toString() + `&${this.state.name}`,
      },
      this.state.jwk
    );
    tx.addTag('App', 'arweave-sudoku');
    tx.addTag('Unix-Time', unixTime);
    tx.addTag('Type', 'score');
    tx.addTag('Rank', this.state.initial.toString());
    await this.state.arweave.transactions.sign(tx, this.state.jwk);
    this.setState({ start: false });
    clearInterval(this.stopWatch);
    let resp = await this.state.arweave.transactions.post(tx);
    console.log('Tx submission response', resp);
    alert('Submitting score');
  };
```

Tạo transaction sẽ trực tiếp push data (data sẽ dưới dạng text, do đó nếu muốn lưu nhiều loại dữ liêu thì nên xử lý hợp lý để sau này lấy ra dễ dàng hơn)

Các trường **addTag** mục đích để sau này query dữ liệu, do đó cần đánh tag hợp lý

### Query transaction

Để query dữ liệu từ Blockweace chúng ta sẽ phải sử dụng 1 ngôn ngữ của Arweave là ArQL : https://github.com/ArweaveTeam/arweave-js#get-transaction-data

Cú pháp sẽ có dạng khá tương đồng với SQL như Or hay and, tuy nhiên vẫn còn khá sơ sài
Dưới đây là một câu query đơn giản để get dữ liệu về theo các Tag mà chúng ta đã đánh
```js
let beginnerQuery = {
      op: 'and',
      expr1: {
        op: 'equals',
        expr1: 'App',
        expr2: 'arweave-sudoku',
      },
      expr2: {
        op: 'equals',
        expr1: 'Rank',
        expr2: '50',
      },
      expr3: {
        op: 'equals',
        expr1: 'Type',
        expr2: 'score',
      },
    };
```

Gọi query này và sắp xếp dữ liệu (Tại đây cần decode data mới có thể đọc được vì dữ liệu này sẽ được mã hóa)  https://github.com/ArweaveTeam/arweave-js#decode-tags-from-transactions :
```js
fetchByQuery = async (query) => {
    let arweave = this.state.arweave;
    let tx_rows = [];
    if (arweave) {
      const res = await arweave.arql(query);
      tx_rows = await Promise.all(
        res.map(async (id, i) => {
          let tx_row = {};
          let tx;
          try {
            tx = await arweave.transactions.get(id);
          } catch (e) {
            return {};
          }
          let tx_owner = await arweave.wallets.ownerToAddress(tx.owner);

          tx_row['unixTime'] = '0';
          tx_row['type'] = null;
          tx.get('tags').forEach((tag) => {
            let key = tag.get('name', {
              decode: true,
              string: true,
            });
            let value = tag.get('value', {
              decode: true,
              string: true,
            });

            if (key === 'Unix-Time') tx_row['unixTime'] = parseInt(value);
            if (key === 'Type') tx_row['type'] = value;
          });
          let data = tx.get('data', { decode: true, string: true });
          data = data.split('&');
          tx_row['id'] = id;
          tx_row['value'] = parseInt(data[0]);
          tx_row['player'] = tx_owner;
          tx_row['name'] = data[1];
          return tx_row;
        })
      );
      tx_rows.sort((a, b) => {
        return a.value - b.value !== 0 ? a.value - b.value : a.unixTime - b.unixTime;
      });
      return tx_rows;
    }
  };
```

### Deploy ứng dụng

Cuối cùng sau khi ứng dụng đã chạy ổn định dưới local thì chúng ta có thể cho nó lên permaweb bằng cách deploy :

https://github.com/ArweaveTeam/arweave-deploy

Với ứng dụng reactjs sẽ rất tiện vì chúng ta được hỗ trợ bản **build**  do đó có thể dùng trực tiếp câu lệnh này để đưa app lên permaweb:

```sql
arweave deploy-dir path-to/directory/to-deploy
```

Hãy nhớ rằng đã install các package arweave-deploy và trong ví cần có token **AR** thì mới tạo được trx

# Kết luận

Trên đây là một bản overview về nền tảng Arweave lưu trữ dữ liệu và cách thức xây dựng úng dụng trên nền tảng này, trong những bài tiêp theo có thể mình sẽ hướng dẫn cách để trở thành một miner trên mạng Arweave
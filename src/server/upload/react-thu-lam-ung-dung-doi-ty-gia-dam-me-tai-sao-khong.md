Ngày "Thần tài" nói chuyện "đam mê" :rofl: Nhưng mà mình không có "đam mê" thì mình nghịch ngợm tìm tòi vì "đam mê" vậy =))

Link app:
https://doitygia-react-app.herokuapp.com/

## 1. Init project

Đâu tiên, chúng ta sẽ khởi tạo một `react-app` nhé. Càng ngày thì chủ đề các bài viết của mình càng loãng rồi (buồn ghê) =))

```
npx create-react-app my-app
cd my-app
yarn start
```

![](https://images.viblo.asia/90d85186-6fbb-41ea-a791-cc90623fa800.png)

Đừng quên add thêm thư viện node-sass để chạy file sass nha.
```
yarn add node-sass --save
```

## 2. Crawl dữ liệu

Chúng ta sẽ crawl dữ liệu từ api: https://tygia.com/json.php?ran=0&gold=0&bank=VIETCOM&date=now
và lưu vào file `rates.json`.

Cấu trúc dữ liệu sẽ như vậy: 
```js:rates.json
{
    "rates": [
        {
            "bank": "VIETCOM",
            "brand": "",
            "updated": 1579484760000,
            "date": "20200120",
            "version": "1",
            "value": [
                {
                    "buy": "0.00",
                    "order": "0",
                    "name": "DKK",
                    "sell": "3,378.00",
                    "transfer": "0.00",
                    "id": "26772129",
                    "day": "20200120",
                    "code": "DKK"
                },
                {
                    "buy": "23,075.00",
                    "order": "0",
                    "name": "USD",
                    "sell": "23,105.00",
                    "transfer": "23,075.00",
                    "id": "26771693",
                    "day": "20200120",
                    "code": "USD"
                },
                {
                    "buy": "25,309.59",
                    "order": "1",
                    "name": "EUR",
                    "sell": "25,565.24",
                    "transfer": "25,309.59",
                    "id": "26772130",
                    "day": "20200120",
                    "code": "EUR"
                },
                ],
            "order": "0"
        }
    ],
    "golds": [],
    "time": 4,
    "excute1_time": 4,
    "excute2_time": 0,
    "excute3_time": 0,
    "count1": 18,
    "count2": 0
}
```

## 3. Viết hàm đổi $$$ =)) nào
Hàm đổi tỷ giá "đam mê" `tryConvert(money, code, encode = true)`, sẽ đổi tiền _vnd_ sang một ngoại tệ khác hoặc ngược lại.
Hàm nhận vào 3 tham số:
- **money**: số tiền
- **code**: currencyCode, là mã ngoại tệ
- **encode**: Nếu encode = true, hàm đổi ngoại tệ ra vnd, ngược lại, hàm sẽ đổi vnd ra ngoại tệ. Mặc định là `true`
```js
import ratesData from 'rates.json';

function tryConvert(money, code, encode = true) {
  const input = parseFloat(money);
  if (Number.isNaN(input)) {
    return '';
  }
  const currency = ratesData.rates[0].value.find(item => item.code === code);
  if (!currency) {
    return '';
  }
  const sell = parseFloat(currency.sell.replace(',', ''));
  const output = encode ? input*sell : input/sell;
  const rounded = Math.round(output * 1000)/1000;
  return rounded.toString();
}
```

## 4. Xây dựng component CurrencyInput
Giờ thì mình sẽ xây dựng một component để nhập tiền ahihi

```js
class CurrencyInput extends React.Component{
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.onMoneyChange(event.target.value)
  }

  render() {
    return (
      <fieldset>
        <legend>Enter { this.props.currencyName }</legend>
        <input value={this.props.money} onChange={this.handleChange}></input>
      </fieldset>
    );
  }
}
```
## 5. Xây dựng một component chung

Cuối cùng là tạo một component import tất cả nào. Ở đây mình sẽ tạo view gồm một select-box, để người dùng lựa chọn ngoại tệ muốn quy đổi và 2 CurrencyInput để nhập và quy đổi tiền ngoại tệ sang `vnd` và ngược lại.
```js
class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currencyCode: 'USD',
      money: '',
      encode: true,
    }

    this.handleChangeCurrency = this.handleChangeCurrency.bind(this)
    this.handleChangeVNDEncode = this.handleChangeVNDEncode.bind(this)
    this.handleChangeVNDDecode = this.handleChangeVNDDecode.bind(this)
  }

  handleChangeCurrency(event) {
    this.setState({
      currencyCode: event.target.value,
      encode: true,
      money: '',
    })
  }

  handleChangeVNDEncode(money) {
    this.setState({ 
      money: money,
      encode: true,
    })
  }

  handleChangeVNDDecode(money) {
    this.setState({ 
      money: money,
      encode: false,
    })
  }

  render() {
    const date = new Date();
    const money = this.state.money;
    const VND = this.state.encode ? tryConvert(money, this.state.currencyCode, true) : money;
    const notVND = this.state.encode ? money : tryConvert(money, this.state.currencyCode, false);

    return (
      <div className="Calculator">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <h2>It is { date.toLocaleTimeString() } { date.toDateString() }</h2>

          <div>
            <select className="select-box" onChange={this.handleChangeCurrency}>
              <option value="USD">Đô la Mỹ - USD</option>
              <option value="AUD">Đô la Úc - AUD</option>
              <option value="CAD">Đô la Canada - CAD</option>
              <option value="CHF">Đồng Frank Thụy Sĩ - CHF</option>
              <option value="JPY">Đồng Yên Nhật - JPY</option>
              <option value="EUR">Đồng Euro - EUR</option>
              <option value="NZD">Đô la New Zealand - NZD</option>
              <option value="GBP">Bảng Anh - GBP</option>
              <option value="SEK">Đồng Thụy Điển - SEK</option>
              <option value="DKK">Đồng Đan Mạch - DKK</option>
              <option value="NOK">Krone Na Uy - NOK</option>
              <option value="SGD">Đồng đô la Singapore - SGD</option>
              <option value="CZK">Cron Séc - CZK</option>
              <option value="HKD">Đô la Hồng Công - HKD</option>
              <option value="MXN">Peso Mehico - MXN</option>
              <option value="PLN">Zloto Ba Lan - PLN</option>
              <option value="RUB">Rúp Nga - RUB</option>
              <option value="TRY">Lir Thổ Nhĩ Kỳ - TRY</option>
              <option value="ZAR">Rand của Nam Phi - ZAR</option>
              <option value="CNH">CNH - CNH</option>
              <option value="CNY">Nhân dân tệ TQ - CNY</option>
              <option value="INR">INDIAN RUPEE - INR</option>
              <option value="KWD">UWAITI DINAR - KWD</option>
              <option value="MYR">MALAYSIAN RINGGIT - MYR</option>
              <option value="SAR">SAUDI RIAL - SAR</option>
              <option value="THB">THAI BAHT - THB</option>
              <option value="KRW">SOUTH KOREAN WON - KRW</option>
            </select>
          </div>

          <div className="form-input">
            <CurrencyInput currencyName={this.state.currencyCode} money={notVND} onMoneyChange={this.handleChangeVNDEncode}/>
            <CurrencyInput currencyName="VND" money={VND} onMoneyChange={this.handleChangeVNDDecode}/>
          </div>
        </header>
      </div>
    );
  }
}

export default Calculator;
```

Thành quả đơn giản vậy thôi. Bạn cũng có thể truy cập app ở [đây](https://doitygia-react-app.herokuapp.com) nhé!
![](https://images.viblo.asia/c5b45eab-571b-4621-bd52-8d987104e765.gif)


Chúc các bạn thành công và hẹn gặp lại bạn ở các bài viết tiếp theo!

Source code và tài liệu tham khảo:

[Source](https://github.com/HaiHaChan/react-app-t1)

[React Doc](https://reactjs.org/docs/getting-started.html)
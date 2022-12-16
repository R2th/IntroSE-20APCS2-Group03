## Tìm hiểu về một số API trên Binance được dùng và tạo CSDL
### Exchange information
```
GET /api/v1/exchangeInfo
```
Trả về thông tin các cặp coin hiện có trên Binance
```
{
  "timezone": "UTC",
  "serverTime": 1508631584636,
  "rateLimits": [{
      "rateLimitType": "REQUESTS_WEIGHT",
      "interval": "MINUTE",
      "limit": 1200
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "SECOND",
      "limit": 10
    },
    {
      "rateLimitType": "ORDERS",
      "interval": "DAY",
      "limit": 100000
    }
  ],
  "exchangeFilters": [],
  "symbols": [{
    "symbol": "ETHBTC",
    "status": "TRADING",
    "baseAsset": "ETH",
    "baseAssetPrecision": 8,
    "quoteAsset": "BTC",
    "quotePrecision": 8,
    "orderTypes": ["LIMIT", "MARKET"],
    "icebergAllowed": false,
    "filters": [{
      "filterType": "PRICE_FILTER",
      "minPrice": "0.00000100",
      "maxPrice": "100000.00000000",
      "tickSize": "0.00000100"
    }, {
      "filterType": "LOT_SIZE",
      "minQty": "0.00100000",
      "maxQty": "100000.00000000",
      "stepSize": "0.00100000"
    }, {
      "filterType": "MIN_NOTIONAL",
      "minNotional": "0.00100000"
    }]
  }]
}
```
Trên đây ta cần lưu ý một số thông tin quan trọng cần lưu lại:
```
symbol # Thông tin cặp coin giao dịch
minQty # min quantity: Đơn vị khối lượng nhỏ nhất cho 1 giao dịch (tạm dịch) 
tickSize # Đơn vị giá nhỏ nhất cho 1 giao dịch
status # Trạng thái trên Binance: TRADING - còn giao dịch được, BREAK: không giao dịch được
baseAsset # Coin hiện thời
quoteAsset # Market trên Binance: BTC, ETH, USDT, BNB
```
Còn 1 số thông tin khác nữa nhưng hiện tại thì mình chỉ quan tâm mấy thông tin này thôi ace mà cần lưu thông tin gì khác thì tìm hiểu thêm và **comment** chia sẻ nhé!

Dưới đây là query tạo table:
```
DROP TABLE IF EXISTS `coin_info`;
CREATE TABLE `coin_info` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `symbol` char(20) DEFAULT NULL,
  `minQty` decimal(15,10) DEFAULT NULL,
  `tickSize` decimal(15,10) DEFAULT NULL,
  `status` char(20) DEFAULT NULL,
  `baseAsset` char(10) DEFAULT NULL,
  `quoteAsset` char(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `symbol` (`symbol`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```
### Kline/Candlestick data
```
GET /api/v1/klines
```
Thông tin trả về giá trong khung thời gian để vẽ biểu đồ **candlestick** cái này ae nào đầu tư và tìm hiểu về thị trường chứng khoán, coin, forex sẽ rõ.

**Parameters**

| Name | Type | Mandatory | Description |
| -------- | -------- | -------- | -------- |
| symbol | STRING | YES | |
| interval | ENUM | YES | 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M |
| startTime | LONG | NO | |
| endTime | LONG | NO | |
| limit | INT | NO | Default 500; max 1000. |
Nếu startTime và endTime không có trong parameter thì respon sẽ là dữ liệu mới nhất.

**Response:**
```
[
  [
    1499040000000,      // Open time
    "0.01634790",       // Open
    "0.80000000",       // High
    "0.01575800",       // Low
    "0.01577100",       // Close
    "148976.11427815",  // Volume
    1499644799999,      // Close time
    "2434.19055334",    // Quote asset volume
    308,                // Number of trades
    "1756.87402397",    // Taker buy base asset volume
    "28.46694368",      // Taker buy quote asset volume
    "17928899.62484339" // Ignore.
  ]
]
```
Query tạo table:
```
DROP TABLE IF EXISTS `candlestick_data`;
CREATE TABLE `candlestick_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCoin` smallint(6) DEFAULT NULL,
  `openTime` bigint(20) DEFAULT NULL,
  `open` decimal(20,10) DEFAULT NULL,
  `high` decimal(20,10) DEFAULT NULL,
  `low` decimal(20,10) DEFAULT NULL,
  `close` decimal(20,10) DEFAULT NULL,
  `volume` decimal(20,10) DEFAULT NULL,
  `closeTime` bigint(20) DEFAULT NULL,
  `quoteAssetVolume` decimal(20,10) DEFAULT NULL,
  `numberOfTrader` int(11) DEFAULT NULL,
  `takerBuyBaseAssetVolume` decimal(20,10) DEFAULT NULL,
  `takerBuyQuoteAssetVolume` decimal(20,10) DEFAULT NULL,
  `ignore` decimal(20,10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `openTime` (`openTime`),
  KEY `idCoin` (`idCoin`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```
Ở đây mình đánh index 2 trường là **openTime**, **idCoin** vì 2 trường này được query where rất nhiều. Đồng thời dữ liệu ta crawl về sẽ tương đối nhiều tính đến ngày 11/11/2018 thì mình crawl về được khoảng gần 3 triệu bản ghi với khung là 1h.

Ngoài ra còn 1 số API khác để check thông tin tài khoản, check order, đặt order thì cần tạo API Key và API Secret để tạo tool tự động giao dịch, báo cáo, ... hiện tại thì nó không liên quan đến bài viết nên mình không giới thiệu. Sẽ có một bài khác giới thiệu về các API này và làm tool giao dịch tự động.

Oke vậy là tạm xong về phần tìm hiểu về API và tạo table để lưu dữ liệu rồi.
## Code Python
### Install Pip3
> sudo apt install python3-pip
### Install libraries
> pip3 install numpy
> 
> pip3 install python-binance
> 
> sudo apt-get install python3-dev
> 
> pip3 install mysqlclient

Nếu install mysqlclient không được thì bạn thử lệnh sau:
> sudo apt-get install python3-dev default-libmysqlclient-dev

### Code
Các bạn tham khảo code tại đây nhé: https://github.com/hung96ad/crawl_data_binance

**Lưu ý**: là hàm *insertcoininfotodb* chỉ chạy lần đầu khi bạn tạo CSDL thôi nhé còn đâu lần sau mà vẫn chạy là lỗi đó :D

Nếu bạn muốn lấy dữ liệu trong khoảng thời gian khác thì sửa lại code:
```
def get_klines_startTime(self, symbol, startTime = 0):
    return self.client.get_klines(symbol = symbol,
            interval = self.client.KLINE_INTERVAL_1HOUR, 
            startTime = startTime,
            limit = 1000)
```
Thay `KLINE_INTERVAL_1HOUR` bằng 1 trong những constant sau:
```
KLINE_INTERVAL_1MINUTE
KLINE_INTERVAL_3MINUTE
KLINE_INTERVAL_5MINUTE
KLINE_INTERVAL_15MINUTE
KLINE_INTERVAL_30MINUTE
KLINE_INTERVAL_1HOUR
KLINE_INTERVAL_2HOUR
KLINE_INTERVAL_4HOUR
KLINE_INTERVAL_6HOUR
KLINE_INTERVAL_8HOUR
KLINE_INTERVAL_12HOUR
KLINE_INTERVAL_1DAY
KLINE_INTERVAL_3DAY
KLINE_INTERVAL_1WEEK
KLINE_INTERVAL_1MONTH
```
### Crontab
Bonus thêm phần này cho một số bạn chưa biết :D.

**Cron** là một tiện ích cho phép thực hiện các tác vụ một cách tự động theo định kỳ, ở chế độ nền của hệ thống. 

**Crontab** (CRON TABle) là một file chứa đựng bảng biểu (schedule) của các entries được chạy.

Chẳng hạn với mình thì 1h mình cần lấy dữ liệu 1 lần nếu ko có Crontab thì thật kinh khủng mỗi giờ lần mình lại phải vào chạy code 1 lần.

**Chạy crontab thế nào**

Ví dụ mình lưu code trong thư mục `/home/user` 
```
git clone https://github.com/hung96ad/crawl_data_binance.git
crontab -e
```
Thêm dòng sau cuối:
```
0 * * * *  cd /home/user && python3 crawler_data_binance.py >> `date +\%y\%m\%d\%H\%M`.log 2>&1
```
Trong đó: 
```
0 * * * * # mỗi giờ crontab chạy 1 lần
>> `date +\%y\%m\%d\%H\%M`.log 2>&1 # ghi log chạy theo giờ, phút, mỗi lần chạy xuất ra 1 file log
```

Crawl dữ liệu mỗi 30 phút:
```
/30 * * * *  cd /home/user && python3 crawler_data_binance.py >> `date +\%y\%m\%d\%H\%M`.log 2>&1
```

Ngoài ra bạn có thể lên đây để lấy khung thời gian chạy crontab theo ý theo link sau: https://crontab.guru
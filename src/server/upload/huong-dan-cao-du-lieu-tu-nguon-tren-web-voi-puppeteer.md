**Hôm trước có dịp đi xe bus trong lúc chờ tàu điện Nhổn ga Hà Nội, trên xe mình gặp một ông cụ khoảng 70 tuổi tóc bạc trắng đang cúi gằm mặt vào 1 quyển sổ toàn những con số 2 chữ số rồi các ô đánh dấu khoanh tròn nhập nhằng bla bla. Hỏi thăm mới biết cụ đang phân tích về kết quả sổ xố và việc này đã diễn ra được 10 năm rồi kết quả là cụ đã viết kín quyển sổ dày cộp** 😅😅. Vậy nên mình quyết định sẽ hướng dẫn sử dụng puppeteer để crawl/scraping data xổ số miền bắc(2007-2021) từ trang https://xoso.com.vn/ với mục đích là sẽ sử dụng lượng data này trong một bài viết sắp tới(tiết lộ luôn là sắp có một project phân tích kết quả xổ số miền bắc cho anh em nào thích ngâm cứu lĩnh vực “số học”).

First, What's **Puppeteer**:

*Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. Puppeteer runs headless by default, but can be configured to run full (non-headless) Chrome or Chromium.*

Tạm dịch:

*Puppeteer là một thư viện Node cung cấp API cấp cao để điều khiển Chrome hoặc Chromium qua Giao thức DevTools . Puppeteer chạy **headless** theo mặc định, nhưng có thể được định cấu hình để chạy Chrome hoặc Chromium đầy đủ (**non-headless**).*

Để sử dụng puppeteer cơ bản thì cần biết một số kiến thức sau:

Nodejs.
Javascript basic(Query Selector, Find Element).
Async/await hoặc promises.
Trước tiên thì chúng ta cần khởi tạo một nodejs project. Với các thông tin tùy ý các bạn nhé. Ở đây mình dùng npm init và tạo ra project với thông tin trong package.json như sau.
```
{
  "name": "xsmb-crawl-data-tool",
  "version": "1.0.0",
  "description": "A crawler to clone data xmsb since 2015 to current date",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "QuangNV",
  "license": "ISC",
  "dependencies": {
    "lowdb": "^1.0.0",
    "puppeteer": "^7.1.0"
  }
}
```
Các bạn nhớ run thêm **npm i lowdb puppeteer** để cài **lowdb** và **puppeteer** nữa.

Giờ ở root folder tạo một file db.js với nội dung.
```
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ prizes: [] }).write();

module.exports = db;
```
**db.js** đóng vai trò như một database adapter sẽ tự tạo ra file database.json nếu nó chưa tồn tại và lưu trữ vào đó.

Tiếp theo chúng ta tạo file **app.js** để sử dụng **puppeteer.**

Sử dụng **require** để import các module.
```
const puppeteer = require("puppeteer");
const db = require("./db");
```
Tiếp theo cần một function để sleep(mục đích mình sẽ giải thích ở dưới nhé).
```
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
```
Tạo một **async** function **runCrawl** như sau.
```
const runCrawl = async () => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: false,
  });

  const page = await browser.newPage();
  let crawingDate = new Date("08/18/2007");

  while (true) {
    await page.goto(
      `https://xoso.com.vn/xsmb-${
        crawingDate.getDate() >= 10
          ? crawingDate.getDate()
          : "0" + crawingDate.getDate()
      }-${
        crawingDate.getMonth() + 1 >= 10
          ? crawingDate.getMonth() + 1
          : "0" + (crawingDate.getMonth() + 1)
      }-${crawingDate.getFullYear()}.html`,
      {
        waitUntil: "load",
      }
    );

    try {
      const allPrize = await page.evaluate(() => {
        const special = document
          .querySelectorAll("span.special-prize")[0]
          .textContent.trim();

        const prize1 = document
          .querySelectorAll("span.prize1")[0]
          .textContent.trim();

        let prize2 = [];
        document.querySelectorAll("span.prize2").forEach((prize) => {
          prize2 = [...prize2, prize.textContent.trim()];
        });
        let prize3 = [];
        document.querySelectorAll("span.prize3").forEach((prize) => {
          prize3 = [...prize3, prize.textContent.trim()];
        });
        let prize4 = [];
        document.querySelectorAll("span.prize4").forEach((prize) => {
          prize4 = [...prize4, prize.textContent.trim()];
        });
        let prize5 = [];
        document.querySelectorAll("span.prize5").forEach((prize) => {
          prize5 = [...prize5, prize.textContent.trim()];
        });
        let prize6 = [];
        document.querySelectorAll("span.prize6").forEach((prize) => {
          prize6 = [...prize6, prize.textContent.trim()];
        });
        let prize7 = [];
        document.querySelectorAll("span.prize7").forEach((prize) => {
          prize7 = [...prize7, prize.textContent.trim()];
        });

        return {
          special,
          prize1,
          prize2,
          prize3,
          prize4,
          prize5,
          prize6,
          prize7,
        };
      });

      if (allPrize.prize7.includes("...")) {
        await sleep(60000);
        continue;
      }

      db.get("prizes")
        .push({ time: crawingDate.getTime() / 1000, allPrizes: allPrize })
        .write();
    } catch {}

    crawingDate.setDate(crawingDate.getDate() + 1);
  }
};
```

**Giải thích code trên**
Khởi tạo một browser với options **ignoreHTTPSErrors**: true để đề phòng cert SSL có vấn đề, **headless: false** để tắt chế độ chạy headless(để check xem có lỗi gì xảy ra không). 
```
const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: false,
  });
```
Tạo một page mới để sử dụng các api dưới đây.
```
const page = await browser.newPage();
```
**page.goto(url)** dùng để navigate tới một url, mà hiện tại mình để một vòng lặp infinity để sẽ lặp liên tục theo một khoảng thời gian sleep mà mình đã nhắc ở trên. Việc lặp liên tục để crawl tool sẽ chạy lại và lấy được dữ liệu kết quả xổ số miền bắc mới nhất khi nó có. Hiện mình để 60000ms(60 giây) một lần.

**page.evaluate(callback)** đây là api quan trọng vì khi sử dụng nó ta có thể gọi các api, function javascript trực tiếp trong browser, tưởng tượng rằng các đoạn code javascript trong callback sẽ được chạy trong browser của puppeteer khởi tạo. Nên chúng ta có thể sử dụng document.querySelector, document.querySelectorAll, document.findElementById,... để lấy ra các element,node trong html để sử dụng.

Tiếp theo check xem đã quay thưởng xong chưa, nếu giải khuyến khích vẫn có mục chưa quay xong thì chờ 60000ms và bỏ qua vòng lặp.
```
if (allPrize.prize7.includes("...")) {
        await sleep(60000);
        continue;
      }
```
Tiếp theo nếu không có vấn đề gì thì ghi dữ liệu vào database.
```
 db.get("prizes")
        .push({ time: crawingDate.getTime() / 1000, allPrizes: allPrize })
        .write();
```
Cuối cùng đoạn này là khi lấy xong dữ liệu một ngày thì sẽ tiếp tục sang ngày tiếp theo.
```
    crawingDate.setDate(crawingDate.getDate() + 1);
```
Nhớ thêm vào đoạn gọi hàm runCrawl() để chạy chương trình. Tổng thể file **app.js.**
```
const puppeteer = require("puppeteer");
const db = require("./db");

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const runCrawl = async () => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: false,
  });

  const page = await browser.newPage();
  let crawingDate = new Date("02/15/2021");

  while (true) {
    await page.goto(
      `https://xoso.com.vn/xsmb-${
        crawingDate.getDate() >= 10
          ? crawingDate.getDate()
          : "0" + crawingDate.getDate()
      }-${
        crawingDate.getMonth() + 1 >= 10
          ? crawingDate.getMonth() + 1
          : "0" + (crawingDate.getMonth() + 1)
      }-${crawingDate.getFullYear()}.html`,
      {
        waitUntil: "load",
      }
    );

    try {
      const allPrize = await page.evaluate(() => {
        const special = document
          .querySelectorAll("span.special-prize")[0]
          .textContent.trim();

        const prize1 = document
          .querySelectorAll("span.prize1")[0]
          .textContent.trim();

        let prize2 = [];
        document.querySelectorAll("span.prize2").forEach((prize) => {
          prize2 = [...prize2, prize.textContent.trim()];
        });
        let prize3 = [];
        document.querySelectorAll("span.prize3").forEach((prize) => {
          prize3 = [...prize3, prize.textContent.trim()];
        });
        let prize4 = [];
        document.querySelectorAll("span.prize4").forEach((prize) => {
          prize4 = [...prize4, prize.textContent.trim()];
        });
        let prize5 = [];
        document.querySelectorAll("span.prize5").forEach((prize) => {
          prize5 = [...prize5, prize.textContent.trim()];
        });
        let prize6 = [];
        document.querySelectorAll("span.prize6").forEach((prize) => {
          prize6 = [...prize6, prize.textContent.trim()];
        });
        let prize7 = [];
        document.querySelectorAll("span.prize7").forEach((prize) => {
          prize7 = [...prize7, prize.textContent.trim()];
        });

        return {
          special,
          prize1,
          prize2,
          prize3,
          prize4,
          prize5,
          prize6,
          prize7,
        };
      });

      if (allPrize.prize7.includes("...")) {
        await sleep(60000);
        continue;
      }

      db.get("prizes")
        .push({ time: crawingDate.getTime() / 1000, allPrizes: allPrize })
        .write();
    } catch {}

    crawingDate.setDate(crawingDate.getDate() + 1);
  }
};

runCrawl();
```
Giờ chỉ cần mở **cmd** và chạy **node app.js** là sẽ thấy browser được mở lên và bắt đầu crawl data kết quả xổ số miền bắc rồi, tuy nhiên quá trình lấy dữ liệu từ 2007 tới 2021 sẽ hơi lâu vì lượng data trong 15 năm cũng không hề ít. Vậy nên để tối ưu thì chúng ta dừng chương trình lại và xóa file database.json đi.

Quay lại đoạn khởi tạo **browser** và sửa **headless: true** để cho browser chạy ở chế độ **headless** như dưới.
```
const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: true,
  });
```
Chúng ta nên để nodejs app chạy ngầm với một trình quản lý process như **pm2** . Mở cmd và **run npm i pm2 -g** để cài đặt ****pm2 global
pm2 start app.js**** lên máy. Tiếp theo dùng pm2 để chạy với **pm2 global
pm2 start app.js**. Cuối cùng ngồi thưởng thức tách cafe và chờ kết quả trong khoảng vài tiếng tùy tốc độ máy. Chúng ta có thể cài pm2 lên vps để chạy trên vps.

Các bạn có thể mở file **database.json** để kiểm tra tiến độ, tới khi nào thấy file không được update thêm thì có vẻ crawl đã tới thời điểm hiện tại là 2021 rồi, giờ cứ để đó nó sẽ update từng ngày. Copy data từ đây ra và convert qua excel hay csv để import hay nghịch ngợm thôi =)).

Đây là file database.json sau 1 phút crawl.
```
{
  "prizes": [
    {
      "time": 1187370000,
      "allPrizes": {
        "special": "55605",
        "prize1": "55414",
        "prize2": [
          "84436",
          "43301"
        ],
        "prize3": [
          "66133",
          "43797",
          "32338",
          "51479",
          "29499",
          "07593"
        ],
        "prize4": [
          "5052",
          "0342",
          "2354",
          "7406"
        ],
        "prize5": [
          "9013",
          "0162",
          "5020",
          "1563",
          "9972",
          "3694"
        ],
        "prize6": [
          "698",
          "538",
          "162"
        ],
        "prize7": [
          "92",
          "17",
          "61",
          "28"
        ]
      }
    },
    {
      "time": 1187542800,
      "allPrizes": {
        "special": "54609",
        "prize1": "90474",
        "prize2": [
          "78857",
          "38153"
        ],
        "prize3": [
          "90598",
          "55882",
          "52975",
          "12341",
          "77131",
          "99020"
        ],
        "prize4": [
          "5441",
          "0419",
          "2206",
          "1125"
        ],
        "prize5": [
          "8116",
          "2690",
          "7756",
          "0014",
          "7760",
          "2141"
        ],
        "prize6": [
          "795",
          "769",
          "694"
        ],
        "prize7": [
          "40",
          "22",
          "47",
          "85"
        ]
      }
    },
    {
      "time": 1187629200,
      "allPrizes": {
        "special": "58458",
        "prize1": "29140",
        "prize2": [
          "51407",
          "88318"
        ],
        "prize3": [
          "87334",
          "73227",
          "99774",
          "23553",
          "15778",
          "65778"
        ],
        "prize4": [
          "7610",
          "5199",
          "0251",
          "9847"
        ],
        "prize5": [
          "1533",
          "1638",
          "1826",
          "9551",
          "5512",
          "0135"
        ],
        "prize6": [
          "651",
          "669",
          "515"
        ],
        "prize7": [
          "59",
          "36",
          "47",
          "32"
        ]
      }
    },
    {
      "time": 1187715600,
      "allPrizes": {
        "special": "55482",
        "prize1": "32520",
        "prize2": [
          "54607",
          "23646"
        ],
        "prize3": [
          "69341",
          "83546",
          "48444",
          "73198",
          "53203",
          "55829"
        ],
        "prize4": [
          "2718",
          "1658",
          "5724",
          "8502"
        ],
        "prize5": [
          "7746",
          "4852",
          "8275",
          "0673",
          "7356",
          "2382"
        ],
        "prize6": [
          "556",
          "686",
          "043"
        ],
        "prize7": [
          "05",
          "52",
          "36",
          "74"
        ]
      }
    },
    {
      "time": 1187802000,
      "allPrizes": {
        "special": "61299",
        "prize1": "11396",
        "prize2": [
          "46858",
          "90156"
        ],
        "prize3": [
          "14069",
          "69367",
          "36329",
          "40847",
          "90467",
          "01129"
        ],
        "prize4": [
          "8131",
          "2523",
          "6712",
          "4765"
        ],
        "prize5": [
          "3585",
          "0591",
          "3076",
          "9629",
          "4718",
          "9281"
        ],
        "prize6": [
          "661",
          "537",
          "439"
        ],
        "prize7": [
          "96",
          "60",
          "87",
          "70"
        ]
      }
    },
    {
      "time": 1187888400,
      "allPrizes": {
        "special": "02982",
        "prize1": "30133",
        "prize2": [
          "08726",
          "65834"
        ],
        "prize3": [
          "19873",
          "44754",
          "42017",
          "97176",
          "93863",
          "46578"
        ],
        "prize4": [
          "9146",
          "1997",
          "0844",
          "7810"
        ],
        "prize5": [
          "1529",
          "3317",
          "7836",
          "4815",
          "4620",
          "3214"
        ],
        "prize6": [
          "581",
          "115",
          "572"
        ],
        "prize7": [
          "40",
          "21",
          "55",
          "83"
        ]
      }
    },
    {
      "time": 1187974800,
      "allPrizes": {
        "special": "09159",
        "prize1": "97073",
        "prize2": [
          "44053",
          "85669"
        ],
        "prize3": [
          "70108",
          "19326",
          "72351",
          "70143",
          "97710",
          "42758"
        ],
        "prize4": [
          "9919",
          "2529",
          "5185",
          "0917"
        ],
        "prize5": [
          "7857",
          "1071",
          "4493",
          "2336",
          "7822",
          "6868"
        ],
        "prize6": [
          "900",
          "555",
          "413"
        ],
        "prize7": [
          "61",
          "12",
          "65",
          "98"
        ]
      }
    },
    {
      "time": 1188061200,
      "allPrizes": {
        "special": "78924",
        "prize1": "61211",
        "prize2": [
          "41360",
          "70638"
        ],
        "prize3": [
          "66260",
          "49228",
          "03962",
          "73007",
          "86303",
          "42963"
        ],
        "prize4": [
          "2903",
          "5819",
          "1214",
          "0319"
        ],
        "prize5": [
          "0700",
          "0763",
          "0135",
          "4297",
          "5746",
          "0703"
        ],
        "prize6": [
          "130",
          "998",
          "181"
        ],
        "prize7": [
          "59",
          "22",
          "81",
          "24"
        ]
      }
    },
    {
      "time": 1188147600,
      "allPrizes": {
        "special": "63271",
        "prize1": "32155",
        "prize2": [
          "10222",
          "14663"
        ],
        "prize3": [
          "60223",
          "95856",
          "27631",
          "12110",
          "41870",
          "23627"
        ],
        "prize4": [
          "9090",
          "0032",
          "8259",
          "6506"
        ],
        "prize5": [
          "7225",
          "6747",
          "4458",
          "8713",
          "4762",
          "0612"
        ],
        "prize6": [
          "171",
          "709",
          "299"
        ],
        "prize7": [
          "86",
          "91",
          "06",
          "50"
        ]
      }
    },
    {
      "time": 1188234000,
      "allPrizes": {
        "special": "25560",
        "prize1": "61523",
        "prize2": [
          "73020",
          "74677"
        ],
        "prize3": [
          "34362",
          "03163",
          "47801",
          "01721",
          "39492",
          "32639"
        ],
        "prize4": [
          "6194",
          "1934",
          "6886",
          "9167"
        ],
        "prize5": [
          "4592",
          "8951",
          "1967",
          "3655",
          "3581",
          "3650"
        ],
        "prize6": [
          "168",
          "355",
          "068"
        ],
        "prize7": [
          "94",
          "73",
          "18",
          "34"
        ]
      }
    },
    {
      "time": 1188320400,
      "allPrizes": {
        "special": "60356",
        "prize1": "88792",
        "prize2": [
          "76229",
          "47813"
        ],
        "prize3": [
          "55906",
          "65288",
          "41593",
          "95974",
          "31578",
          "05425"
        ],
        "prize4": [
          "4217",
          "3254",
          "2778",
          "8402"
        ],
        "prize5": [
          "2649",
          "7978",
          "6195",
          "7458",
          "6621",
          "4309"
        ],
        "prize6": [
          "704",
          "440",
          "240"
        ],
        "prize7": [
          "66",
          "75",
          "63",
          "05"
        ]
      }
    },
    {
      "time": 1188406800,
      "allPrizes": {
        "special": "25693",
        "prize1": "42671",
        "prize2": [
          "63165",
          "23506"
        ],
        "prize3": [
          "41786",
          "75403",
          "84338",
          "53007",
          "10188",
          "95293"
        ],
        "prize4": [
          "8429",
          "5670",
          "1803",
          "1101"
        ],
        "prize5": [
          "8382",
          "5713",
          "1718",
          "1521",
          "2463",
          "6621"
        ],
        "prize6": [
          "477",
          "604",
          "542"
        ],
        "prize7": [
          "50",
          "71",
          "19",
          "14"
        ]
      }
    },
    {
      "time": 1188493200,
      "allPrizes": {
        "special": "42117",
        "prize1": "03455",
        "prize2": [
          "95632",
          "59526"
        ],
        "prize3": [
          "79659",
          "73510",
          "59623",
          "85859",
          "35171",
          "52384"
        ],
        "prize4": [
          "7126",
          "6853",
          "8530",
          "4331"
        ],
        "prize5": [
          "6063",
          "1360",
          "2807",
          "7197",
          "0358",
          "8359"
        ],
        "prize6": [
          "651",
          "238",
          "093"
        ],
        "prize7": [
          "70",
          "87",
          "55",
          "60"
        ]
      }
    },
    {
      "time": 1188579600,
      "allPrizes": {
        "special": "52886",
        "prize1": "95671",
        "prize2": [
          "65206",
          "83088"
        ],
        "prize3": [
          "32260",
          "63182",
          "47185",
          "37164",
          "96836",
          "59196"
        ],
        "prize4": [
          "6568",
          "0712",
          "5118",
          "2000"
        ],
        "prize5": [
          "7523",
          "1711",
          "5817",
          "2082",
          "7616",
          "9294"
        ],
        "prize6": [
          "965",
          "644",
          "271"
        ],
        "prize7": [
          "27",
          "56",
          "04",
          "30"
        ]
      }
    },
    {
      "time": 1188666000,
      "allPrizes": {
        "special": "82636",
        "prize1": "08145",
        "prize2": [
          "52965",
          "00317"
        ],
        "prize3": [
          "58170",
          "43628",
          "43332",
          "01930",
          "13408",
          "83926"
        ],
        "prize4": [
          "7098",
          "7356",
          "7152",
          "6400"
        ],
        "prize5": [
          "2782",
          "1329",
          "3030",
          "0411",
          "2243",
          "7660"
        ],
        "prize6": [
          "942",
          "946",
          "681"
        ],
        "prize7": [
          "68",
          "55",
          "49",
          "83"
        ]
      }
    },
    {
      "time": 1188752400,
      "allPrizes": {
        "special": "42386",
        "prize1": "86803",
        "prize2": [
          "97492",
          "31802"
        ],
        "prize3": [
          "09574",
          "23535",
          "09284",
          "03865",
          "38512",
          "04018"
        ],
        "prize4": [
          "7513",
          "3763",
          "9571",
          "4654"
        ],
        "prize5": [
          "5940",
          "5146",
          "4404",
          "2603",
          "1168",
          "3334"
        ],
        "prize6": [
          "581",
          "975",
          "888"
        ],
        "prize7": [
          "81",
          "44",
          "15",
          "09"
        ]
      }
    },
    {
      "time": 1188838800,
      "allPrizes": {
        "special": "43255",
        "prize1": "41132",
        "prize2": [
          "68673",
          "94635"
        ],
        "prize3": [
          "20965",
          "27002",
          "20311",
          "45823",
          "30822",
          "79664"
        ],
        "prize4": [
          "4554",
          "3788",
          "9024",
          "2680"
        ],
        "prize5": [
          "8933",
          "6166",
          "9108",
          "4875",
          "7188",
          "5658"
        ],
        "prize6": [
          "063",
          "346",
          "174"
        ],
        "prize7": [
          "63",
          "12",
          "67",
          "94"
        ]
      }
    },
    {
      "time": 1188925200,
      "allPrizes": {
        "special": "54379",
        "prize1": "42886",
        "prize2": [
          "57692",
          "10827"
        ],
        "prize3": [
          "44600",
          "03876",
          "81018",
          "88590",
          "97198",
          "44324"
        ],
        "prize4": [
          "3965",
          "6593",
          "6216",
          "1448"
        ],
        "prize5": [
          "9525",
          "1173",
          "3853",
          "9515",
          "8223",
          "9720"
        ],
        "prize6": [
          "359",
          "374",
          "943"
        ],
        "prize7": [
          "83",
          "78",
          "52",
          "46"
        ]
      }
    },
    {
      "time": 1189011600,
      "allPrizes": {
        "special": "57954",
        "prize1": "34955",
        "prize2": [
          "54319",
          "44253"
        ],
        "prize3": [
          "77603",
          "74177",
          "91664",
          "75148",
          "84139",
          "21375"
        ],
        "prize4": [
          "0356",
          "6001",
          "0470",
          "1366"
        ],
        "prize5": [
          "1027",
          "5351",
          "0400",
          "9063",
          "7195",
          "3836"
        ],
        "prize6": [
          "052",
          "271",
          "495"
        ],
        "prize7": [
          "57",
          "26",
          "58",
          "77"
        ]
      }
    },
    {
      "time": 1189098000,
      "allPrizes": {
        "special": "75770",
        "prize1": "00059",
        "prize2": [
          "91709",
          "24496"
        ],
        "prize3": [
          "53527",
          "88782",
          "42544",
          "76802",
          "04597",
          "40826"
        ],
        "prize4": [
          "2443",
          "7901",
          "9646",
          "9748"
        ],
        "prize5": [
          "8754",
          "8877",
          "9458",
          "5795",
          "5424",
          "3421"
        ],
        "prize6": [
          "381",
          "665",
          "034"
        ],
        "prize7": [
          "07",
          "14",
          "87",
          "53"
        ]
      }
    },
    {
      "time": 1189184400,
      "allPrizes": {
        "special": "51364",
        "prize1": "97813",
        "prize2": [
          "01675",
          "41262"
        ],
        "prize3": [
          "84190",
          "46183",
          "78344",
          "09054",
          "13424",
          "54063"
        ],
        "prize4": [
          "2416",
          "8308",
          "1540",
          "1138"
        ],
        "prize5": [
          "5920",
          "0045",
          "8865",
          "6300",
          "1113",
          "5537"
        ],
        "prize6": [
          "069",
          "065",
          "007"
        ],
        "prize7": [
          "18",
          "73",
          "83",
          "54"
        ]
      }
    },
    {
      "time": 1189270800,
      "allPrizes": {
        "special": "67801",
        "prize1": "77517",
        "prize2": [
          "83878",
          "27258"
        ],
        "prize3": [
          "16033",
          "99086",
          "13337",
          "56432",
          "04330",
          "12973"
        ],
        "prize4": [
          "1692",
          "6084",
          "8340",
          "0007"
        ],
        "prize5": [
          "6431",
          "8891",
          "2918",
          "7493",
          "7549",
          "3667"
        ],
        "prize6": [
          "449",
          "398",
          "081"
        ],
        "prize7": [
          "03",
          "17",
          "22",
          "94"
        ]
      }
    },
    {
      "time": 1189357200,
      "allPrizes": {
        "special": "35300",
        "prize1": "07281",
        "prize2": [
          "42376",
          "13083"
        ],
        "prize3": [
          "79179",
          "46641",
          "57935",
          "12644",
          "53359",
          "18143"
        ],
        "prize4": [
          "2162",
          "8762",
          "8415",
          "4495"
        ],
        "prize5": [
          "6956",
          "0208",
          "5192",
          "4768",
          "9941",
          "9278"
        ],
        "prize6": [
          "268",
          "731",
          "662"
        ],
        "prize7": [
          "02",
          "36",
          "08",
          "51"
        ]
      }
    },
    {
      "time": 1189443600,
      "allPrizes": {
        "special": "07605",
        "prize1": "74098",
        "prize2": [
          "43207",
          "90673"
        ],
        "prize3": [
          "43744",
          "10607",
          "55675",
          "46312",
          "06979",
          "96461"
        ],
        "prize4": [
          "8685",
          "4006",
          "5903",
          "1523"
        ],
        "prize5": [
          "7073",
          "7776",
          "4605",
          "0683",
          "3491",
          "6396"
        ],
        "prize6": [
          "151",
          "813",
          "532"
        ],
        "prize7": [
          "19",
          "87",
          "27",
          "96"
        ]
      }
    },
    {
      "time": 1189530000,
      "allPrizes": {
        "special": "46867",
        "prize1": "11015",
        "prize2": [
          "64956",
          "96871"
        ],
        "prize3": [
          "18683",
          "74491",
          "25942",
          "59131",
          "27567",
          "30647"
        ],
        "prize4": [
          "6171",
          "3008",
          "1077",
          "7504"
        ],
        "prize5": [
          "0928",
          "1544",
          "3203",
          "1572",
          "9836",
          "0163"
        ],
        "prize6": [
          "715",
          "902",
          "830"
        ],
        "prize7": [
          "23",
          "88",
          "54",
          "20"
        ]
      }
    },
    {
      "time": 1189616400,
      "allPrizes": {
        "special": "90251",
        "prize1": "19474",
        "prize2": [
          "12049",
          "10232"
        ],
        "prize3": [
          "17109",
          "84253",
          "86608",
          "59419",
          "40371",
          "96796"
        ],
        "prize4": [
          "9066",
          "9724",
          "1328",
          "5470"
        ],
        "prize5": [
          "3689",
          "8932",
          "3252",
          "7523",
          "8055",
          "2435"
        ],
        "prize6": [
          "414",
          "638",
          "510"
        ],
        "prize7": [
          "13",
          "22",
          "02",
          "04"
        ]
      }
    },
    {
      "time": 1189702800,
      "allPrizes": {
        "special": "18727",
        "prize1": "91700",
        "prize2": [
          "46425",
          "99399"
        ],
        "prize3": [
          "75523",
          "12537",
          "71664",
          "13395",
          "59570",
          "34301"
        ],
        "prize4": [
          "1241",
          "2683",
          "2571",
          "5265"
        ],
        "prize5": [
          "3797",
          "3300",
          "2417",
          "1066",
          "5128",
          "8739"
        ],
        "prize6": [
          "787",
          "060",
          "078"
        ],
        "prize7": [
          "18",
          "82",
          "50",
          "78"
        ]
      }
    },
    {
      "time": 1189789200,
      "allPrizes": {
        "special": "38423",
        "prize1": "01897",
        "prize2": [
          "75583",
          "11072"
        ],
        "prize3": [
          "77604",
          "17370",
          "60535",
          "42386",
          "67745",
          "50750"
        ],
        "prize4": [
          "6394",
          "9186",
          "2221",
          "6334"
        ],
        "prize5": [
          "8278",
          "5791",
          "5726",
          "7366",
          "1798",
          "0425"
        ],
        "prize6": [
          "099",
          "532",
          "238"
        ],
        "prize7": [
          "96",
          "86",
          "22",
          "52"
        ]
      }
    },
    {
      "time": 1189875600,
      "allPrizes": {
        "special": "22292",
        "prize1": "02859",
        "prize2": [
          "18674",
          "35326"
        ],
        "prize3": [
          "65675",
          "55213",
          "72688",
          "80921",
          "18426",
          "93651"
        ],
        "prize4": [
          "6255",
          "1453",
          "0334",
          "5428"
        ],
        "prize5": [
          "0280",
          "3425",
          "7816",
          "8779",
          "4194",
          "0631"
        ],
        "prize6": [
          "762",
          "239",
          "645"
        ],
        "prize7": [
          "33",
          "50",
          "62",
          "86"
        ]
      }
    },
    {
      "time": 1189962000,
      "allPrizes": {
        "special": "11055",
        "prize1": "14176",
        "prize2": [
          "77565",
          "25762"
        ],
        "prize3": [
          "12069",
          "74625",
          "91264",
          "74683",
          "50478",
          "35777"
        ],
        "prize4": [
          "6656",
          "8706",
          "4562",
          "1239"
        ],
        "prize5": [
          "9854",
          "9548",
          "9291",
          "6301",
          "9465",
          "8988"
        ],
        "prize6": [
          "810",
          "184",
          "359"
        ],
        "prize7": [
          "29",
          "39",
          "47",
          "16"
        ]
      }
    },
    {
      "time": 1190048400,
      "allPrizes": {
        "special": "36594",
        "prize1": "73234",
        "prize2": [
          "52741",
          "54690"
        ],
        "prize3": [
          "36508",
          "14361",
          "04012",
          "32686",
          "89154",
          "46082"
        ],
        "prize4": [
          "6778",
          "6756",
          "4764",
          "5759"
        ],
        "prize5": [
          "1192",
          "7631",
          "5225",
          "5506",
          "0613",
          "5953"
        ],
        "prize6": [
          "946",
          "103",
          "412"
        ],
        "prize7": [
          "86",
          "98",
          "96",
          "90"
        ]
      }
    },
    {
      "time": 1190134800,
      "allPrizes": {
        "special": "64554",
        "prize1": "93403",
        "prize2": [
          "05329",
          "24565"
        ],
        "prize3": [
          "38040",
          "46452",
          "62888",
          "69884",
          "37338",
          "03160"
        ],
        "prize4": [
          "0228",
          "9304",
          "5019",
          "2204"
        ],
        "prize5": [
          "9578",
          "2252",
          "1544",
          "8958",
          "9123",
          "1630"
        ],
        "prize6": [
          "414",
          "020",
          "184"
        ],
        "prize7": [
          "94",
          "97",
          "96",
          "56"
        ]
      }
    },
    {
      "time": 1190221200,
      "allPrizes": {
        "special": "21815",
        "prize1": "94660",
        "prize2": [
          "45746",
          "69519"
        ],
        "prize3": [
          "52701",
          "45747",
          "03727",
          "91027",
          "66018",
          "69915"
        ],
        "prize4": [
          "3913",
          "2049",
          "3744",
          "9327"
        ],
        "prize5": [
          "1754",
          "6059",
          "2904",
          "6858",
          "5467",
          "2655"
        ],
        "prize6": [
          "767",
          "082",
          "293"
        ],
        "prize7": [
          "04",
          "84",
          "18",
          "97"
        ]
      }
    },
    {
      "time": 1190307600,
      "allPrizes": {
        "special": "08155",
        "prize1": "30671",
        "prize2": [
          "67370",
          "25474"
        ],
        "prize3": [
          "47656",
          "23668",
          "31503",
          "88948",
          "32709",
          "14868"
        ],
        "prize4": [
          "1665",
          "9813",
          "1870",
          "2963"
        ],
        "prize5": [
          "7704",
          "0472",
          "3155",
          "2142",
          "2596",
          "0403"
        ],
        "prize6": [
          "564",
          "295",
          "515"
        ],
        "prize7": [
          "53",
          "81",
          "01",
          "60"
        ]
      }
    },
    {
      "time": 1190394000,
      "allPrizes": {
        "special": "85726",
        "prize1": "75779",
        "prize2": [
          "33594",
          "81773"
        ],
        "prize3": [
          "69157",
          "70553",
          "73157",
          "10003",
          "34128",
          "41723"
        ],
        "prize4": [
          "4402",
          "9771",
          "9861",
          "0138"
        ],
        "prize5": [
          "9058",
          "6133",
          "2411",
          "1640",
          "5532",
          "8495"
        ],
        "prize6": [
          "611",
          "087",
          "728"
        ],
        "prize7": [
          "84",
          "44",
          "46",
          "60"
        ]
      }
    },
    {
      "time": 1190480400,
      "allPrizes": {
        "special": "54225",
        "prize1": "40921",
        "prize2": [
          "45952",
          "88253"
        ],
        "prize3": [
          "26085",
          "31949",
          "57757",
          "77186",
          "30452",
          "57326"
        ],
        "prize4": [
          "1007",
          "5814",
          "3673",
          "1527"
        ],
        "prize5": [
          "1296",
          "4226",
          "1060",
          "1123",
          "0952",
          "2889"
        ],
        "prize6": [
          "907",
          "414",
          "721"
        ],
        "prize7": [
          "92",
          "12",
          "20",
          "23"
        ]
      }
    },
    {
      "time": 1190566800,
      "allPrizes": {
        "special": "86136",
        "prize1": "66217",
        "prize2": [
          "05784",
          "41149"
        ],
        "prize3": [
          "49309",
          "90799",
          "70910",
          "85854",
          "40650",
          "24339"
        ],
        "prize4": [
          "8635",
          "2925",
          "1687",
          "0306"
        ],
        "prize5": [
          "5962",
          "4943",
          "4887",
          "9647",
          "6284",
          "7323"
        ],
        "prize6": [
          "270",
          "071",
          "087"
        ],
        "prize7": [
          "75",
          "64",
          "81",
          "23"
        ]
      }
    },
    {
      "time": 1190653200,
      "allPrizes": {
        "special": "88590",
        "prize1": "88749",
        "prize2": [
          "23998",
          "88323"
        ],
        "prize3": [
          "60431",
          "56945",
          "09698",
          "28650",
          "48295",
          "27836"
        ],
        "prize4": [
          "4230",
          "3662",
          "6896",
          "9830"
        ],
        "prize5": [
          "8790",
          "0223",
          "4490",
          "0635",
          "9892",
          "5852"
        ],
        "prize6": [
          "260",
          "756",
          "629"
        ],
        "prize7": [
          "16",
          "55",
          "01",
          "59"
        ]
      }
    },
    {
      "time": 1190739600,
      "allPrizes": {
        "special": "08300",
        "prize1": "66556",
        "prize2": [
          "83560",
          "82076"
        ],
        "prize3": [
          "75860",
          "96533",
          "10927",
          "63528",
          "52009",
          "95807"
        ],
        "prize4": [
          "2432",
          "6959",
          "5070",
          "7919"
        ],
        "prize5": [
          "2548",
          "9210",
          "0650",
          "2887",
          "3650",
          "9351"
        ],
        "prize6": [
          "613",
          "165",
          "420"
        ],
        "prize7": [
          "06",
          "13",
          "38",
          "00"
        ]
      }
    }
  ]
}
```
Source code: https://github.com/quangnv13/xsmb-crawl-tool.
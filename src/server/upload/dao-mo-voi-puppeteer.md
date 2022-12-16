## 1. Headless browser
``Headless browser`` là một thuật ngữ dùng để chỉ trình duyệt chạy mà không cần sử dụng giao diện đồ họa, thay vào đó việc giao tiếp với trình duyệt được thông qua giao diện dòng lệnh . Những Headless browser cho phép hiểu được HTML như một trình duyệt thông thường, thông qua đó ta có thể lấy được các thông tin về các thành phần của trang web như bố cục, màu sắc, phông chữ, thậm chí là thực thi Javascript, ... Nhờ những khả năng có thể mang lại Headless browser phù hợp cho việc testing 1 trang web đặc biệt là ``Automation Testing.``
<br>


Ngoài khả năng sử dụng để thực hiện Automation Testing, Headless browser còn có thể sử dụng để làm một số việc như tạo 1 crawler để cào dữ liệu, screenshot màn hình, ... Có khá nhiều thứ hay ho chúng ta có thể làm được thông qua việc sử dụng Headless browser.

## 2. Puppeteer
``Puppeteer`` là một 'Node library' do Google phát triển cung cấp các API điều khiển Chrome hoặc Chromium thông qua [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/). Puppeteer mặc định chạy ở chế độ `headless` tuy nhiên ta cũng có thể cài đặt để chạy `non-headless`. Hầu hết những việc có thể thực hiện thủ công trên trình duyệt đều có thể được thực hiện bằng Puppeteer.
<br/>


Nếu xét về khả năng là framework cho việc thực hiện ``Automation Test`` thì Puppeteer vẫn còn nhiều những hạn chế so với Selenium, hay WebdriverI/O về mặt chức năng khi chỉ tập trung vào trình duyệt Chrome mà không hỗ trợ đa dạng các nền tảng trình duyệt. Tuy nhiên để làm một số tools thì lại rất phù hợp bởi sự đơn giản, dễ dàng cài đặt, có thể chạy dưới chế độ `headless` không cần giao diện nên cho một tốc độ khá nhanh.

## 3. Tạo một crawler với Puppeteer
#### Bài toán: 
Gần đây để nghịch ngợm một số thứ nên mình cần phải tìm kiếm một lượng dữ liệu về ngữ pháp tiếng Nhật. Vào trong trang web [Mazzi Dictionary](https://mazii.net/#!/search) mình tìm được khá nhiều dữ liệu mình mong muốn. Công việc phải làm là tạo một crawler để lấy dữ liệu đó về và lưu vào database của mình. 
<br>
Trước đây khi cần làm một tool crawler mình cũng đã sử dụng qua một số thư viện như  [scrapy](https://scrapy.org/), [beautifulsoup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/) để crawl static page. Tuy nhiên với trong trường hợp hiện tại của mình dữ liệu đang được render thông qua Javascript thì việc tạo một crawler bình thường như mọi khi đã không còn khả thi. Có 1 giải pháp là sử dụng ``Scapy`` + ``Splash`` để giải quyết vấn đề này nhưng script của Splash được viết bằng [Lua](http://www.lua.org/) :scream: nên mình đã chuyển sang một cách tiếp cận khác đó là sử dụng ``Puppeteer`` bởi sự đơn giản của nó :joy::joy::joy:.

 #### Giải quyết vấn đề:
 Trong ví dụ này sử dụng 2 thư viện là ``mongoose``, và ``puppeteer`` có thể dễ dàng cài đặt được thông qua `npm`:
*  ``npm install mongoose``
 <br>
* ``npm install puppeteer``

 Đầu tiên ta tạo một file model.js để lưu dữ liệu vào database:
 ```Javascript
 const mongoose = require('mongoose');

let grammarSchema = new mongoose.Schema({
  title: String,
  mean: String,
  use: String,
  explain: String,
  examples: [{ ja: String, vi: String }],
})

let Grammar = mongoose.model('Grammar', grammarSchema);

module.exports = Grammar;
 ```
 
 Tạo 1 file crawler.js để định nghĩa crawler, crawler phải thực hiện các thao tác:
1.  Từ trang chủ chọn chuyển sang tab `Ngữ pháp`
2.  Tab Ngữ pháp hiển thị 1 page, mỗi page chứa 12 ngữ pháp, click lần lượt vào từng mẫu ngữ pháp và lấy dữ liệu trong popup được hiển thị.
3.   Sau khi lấy hết dữ liệu của 1 page thì chuyển sang page tiếp theo.
<br>
 
 Truy cập tới trang [Mazzi Dictionary](https://mazii.net/#!/search), và lấy dữ liệu các mẫu ngữ pháp: 
 ![Page](https://images.viblo.asia/a29d0137-564b-4b73-ad76-33dd637c0b6f.png)
 ```Javascript
 (async () => {
    const browser = await puppeteer.launch({ slowMo: 250 });
    //Sử dụng const browser = await puppeteer.launch({ headless: false, slowMo: 250 }); để chạy trên non-headless
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1800 });
    await page.goto('http://mazii.net/#!/search');
   //Click vào tab Ngữ pháp
    await page.click('#tab3');
    const pageSize = 12; // Số page muốn crawl
    // Lấy dữ liệu trên mỗi page
    for (let i = 0; i < pageSize; i++) {
      await getData(page);
      // Click chuyển sang page tiếp theo
      await page.click('div.box-pagination>ul>li:nth-child(8)');
    }
    await browser.close();
  })();
 ```
 ![grammar](https://images.viblo.asia/d5c851a2-6925-4490-ba9b-1b8c307f589f.png)
 Định nghĩa hàm``getData()``:
 Thao tác của chúng ta gồm có click vào 1 mẫu ngữ pháp -> Lấy dữ liệu từ popup -> click đóng popup
 ```javascript
 const getData = async (page) => {
  for (let i = 1; i < 13; i++) {
    try {
      await page.waitForSelector(`.box-card:nth-child(${i})`);
      await page.click(`.box-card:nth-child(${i})`);
      await page.waitForSelector('.grammar-item-title');
      await page.waitForSelector('.close-modal-jlpt');
      // evaluate() cho phép thực hiện Javascript trên trình duyệt
      // Sử dụng Javascript để lấy dữ liệu
      const grammar = await page.evaluate(() => {
        const title = document.querySelector('.grammar-item-title').textContent;
        const mean = document.querySelector('.grammar-item-title-mean').textContent;
        let use = '';
        if (document.querySelector('.gr-use-syn-item') != null) {
          use += document.querySelector('.gr-use-syn-item').textContent;
        }
        const explain = document.querySelector('.gr-explain-note').textContent;
        const examples = [];
        const examples_ele = document.querySelectorAll('.japanese-char');
        const examples_mean = document.querySelectorAll('.example-mean-word');
        const count_example = examples_ele.length;
        for (let i = 0; i < count_example; i++) {
          let count_child_ja = examples_ele[i].children.length;
          let ex_ja = '';
          if (examples_ele[i].hasAttribute('ng-bind-html')) {
            ex_ja = examples_ele[i].textContent.trim();
          }
          else {
            for (var j = 0; j < count_child_ja; j++) {
              ex_ja += examples_ele[i].children[j].firstChild.textContent.trim();
            }
          }
          let ex_vi = examples_mean[i].textContent.trim();
          examples.push({
            ja: ex_ja,
            vi: ex_vi
          })
        }
        document.querySelector('.close-modal-jlpt').click();
        return {
          title: title,
          mean: mean,
          use: use,
          explain: explain,
          examples: examples
        };
      });
      insert(grammar);
    } catch (error) {
      console.log(error);
    }
  }
}
 ```
 
 Viết hàm insert dữ liệu vào database:
 ```Javascript
 const insert = (Obj) => {
  const DB_URL = 'mongodb://localhost:27017/grammar';
  if (mongoose.connection.readyState == 0) { mongoose.connect(DB_URL); }
  let conditions = { title: Obj.title };
  let options = { upsert: true, new: true, setDefaultsOnInsert: true };
  Grammar.findOneAndUpdate(conditions, Obj, options, (err, result) => {
    if (err) throw err;
  });
}
 ```
 
 Và đây là kết quả thu được:
 ![result](https://images.viblo.asia/e82eefdd-5c34-4f97-a5e8-011466cb691d.png)
 Cảm ơn mọi người đã theo dõi bài viết :slightly_smiling_face:
 
**Link source code:** [Demo](https://github.com/Phong95663/puppeteer-demo)
 
 **Tài liệu tham khảo:** [Puppeteer](https://github.com/GoogleChrome/puppeteer)
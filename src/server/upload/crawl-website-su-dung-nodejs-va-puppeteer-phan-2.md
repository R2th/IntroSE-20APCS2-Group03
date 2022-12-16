trong  [phần 1](https://viblo.asia/p/crawl-website-su-dung-nodejs-va-puppeteer-phan-1-L4x5xv2wZBM) mình đã giới thiệu về `puppeteer` và tạo được 1 project cùng một số file đầu tiên để các bạn có thể crawl dữ liệu từ một trang web bất kỳ. Bài này mình sẽ tiếp nối bài viết trước để hoàn thiện seri này.

đầu tiền các bạn có thể vào site [này](http://books.toscrape.com/) để xem cấu trúc html của trang web, đầu tiền nó có 1 categories list trên trái của website, ở giữa là phần hiển thị những quyển sách của tất cả categories hoặc của từng category một.
chúng ta có thể thấy trang web này khá đơn giản để crawl toàn bộ dữ liệu của sách về theo từng category một.
đầu tiên chúng ta cần phải lấy được toàn bộ url của sách của trang web, update file `pageScraper.js` như sau:

```js
// ./book-scraper/pageScraper.js
const scraperObject = {
    url: 'http://books.toscrape.com',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        // Navigate to the selected page
        await page.goto(this.url);
        // Wait for the required DOM to be rendered
        await page.waitForSelector('.page_inner');
        // Get the link to all the required books
        let urls = await page.$$eval('section ol > li', links => {
            // Make sure the book to be scraped is in stock
            links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
            // Extract the links from the data
            links = links.map(el => el.querySelector('h3 > a').href)
            return links;
        });
        console.log(urls);
    }
}

module.exports = scraperObject;
```

đoạn code trên sẽ giúp ta lấy được toàn bộ url của sách trong page, nhưng hàm bên trên như newPage, waitForSelector, hay $$eval mình đều đã giới thiệu trong phần một rồi, nếu chưa hiểu nó bạn có thể quay lại đọc phần 1 nhé.

Khi chạy `npm run start` bạn sẽ thấy trong console của mình in ra logs của toàn bộ các url:

```log
> node index.js

Opening the browser......
Navigating to http://books.toscrape.com...
[
  'http://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html',
  'http://books.toscrape.com/catalogue/tipping-the-velvet_999/index.html',
  'http://books.toscrape.com/catalogue/soumission_998/index.html',
  'http://books.toscrape.com/catalogue/sharp-objects_997/index.html',
  'http://books.toscrape.com/catalogue/sapiens-a-brief-history-of-humankind_996/index.html',
  'http://books.toscrape.com/catalogue/the-requiem-red_995/index.html',
  'http://books.toscrape.com/catalogue/the-dirty-little-secrets-of-getting-your-dream-job_994/index.html',
  'http://books.toscrape.com/catalogue/the-coming-woman-a-novel-based-on-the-life-of-the-infamous-feminist-victoria-woodhull_993/index.html',
  'http://books.toscrape.com/catalogue/the-boys-in-the-boat-nine-americans-and-their-epic-quest-for-gold-at-the-1936-berlin-olympics_992/index.html',
  'http://books.toscrape.com/catalogue/the-black-maria_991/index.html',
  'http://books.toscrape.com/catalogue/starving-hearts-triangular-trade-trilogy-1_990/index.html',
  'http://books.toscrape.com/catalogue/shakespeares-sonnets_989/index.html',
  'http://books.toscrape.com/catalogue/set-me-free_988/index.html',
  'http://books.toscrape.com/catalogue/scott-pilgrims-precious-little-life-scott-pilgrim-1_987/index.html',
  'http://books.toscrape.com/catalogue/rip-it-up-and-start-again_986/index.html',
  'http://books.toscrape.com/catalogue/our-band-could-be-your-life-scenes-from-the-american-indie-underground-1981-1991_985/index.html',
  'http://books.toscrape.com/catalogue/olio_984/index.html',
  'http://books.toscrape.com/catalogue/mesaerion-the-best-science-fiction-stories-1800-1849_983/index.html',
  'http://books.toscrape.com/catalogue/libertarianism-for-beginners_982/index.html',
  'http://books.toscrape.com/catalogue/its-only-the-himalayas_981/index.html'
]
```

sau khi có url của các sách rồi, chúng ta có thể vào url của từng quyển sách để lấy dữ liệu detail của nó:

tiếp tục update file `/book-scraper/pageScraper.js` với nội dung mới như sau:

```js
// ./book-scraper/pageScraper.js
const scraperObject = {
    url: 'http://books.toscrape.com',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        // Navigate to the selected page
        await page.goto(this.url);
        // Wait for the required DOM to be rendered
        await page.waitForSelector('.page_inner');
        // Get the link to all the required books
        let urls = await page.$$eval('section ol > li', links => {
            // Make sure the book to be scraped is in stock
            links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
            // Extract the links from the data
            links = links.map(el => el.querySelector('h3 > a').href)
            return links;
        });


        // Loop through each of those links, open a new page instance and get the relevant data from them
        let pagePromise = (link) => new Promise(async(resolve, reject) => {
            let dataObj = {};
            let newPage = await browser.newPage();
            await newPage.goto(link);
            dataObj['bookTitle'] = await newPage.$eval('.product_main > h1', text => text.textContent);
            dataObj['bookPrice'] = await newPage.$eval('.price_color', text => text.textContent);
            dataObj['noAvailable'] = await newPage.$eval('.instock.availability', text => {
                // Strip new line and tab spaces
                text = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
                // Get the number of stock available
                let regexp = /^.*\((.*)\).*$/i;
                let stockAvailable = regexp.exec(text)[1].split(' ')[0];
                return stockAvailable;
            });
            dataObj['imageUrl'] = await newPage.$eval('#product_gallery img', img => img.src);
            dataObj['bookDescription'] = await newPage.$eval('#product_description', div => div.nextSibling.nextSibling.textContent);
            dataObj['upc'] = await newPage.$eval('.table.table-striped > tbody > tr > td', table => table.textContent);
            resolve(dataObj);
            await newPage.close();
        });

        for(link in urls){
            let currentPageData = await pagePromise(urls[link]);
            // scrapedData.push(currentPageData);
            console.log(currentPageData);
        }

    }
}

module.exports = scraperObject;
```

đoạn code trên sẽ lặp qua các urls detail của từng quyển sách để lấy ra thông tin như: id, title, price, img ...

tiếp theo bạn chạy `npm run start` thì sẽ nhìn thấy dữ liệu detail của các quyển sách, từ đó bạn thể thể lưu nó ra file hay lưu lại vào database.

```log
Opening the browser......
Navigating to http://books.toscrape.com...
{
  bookTitle: 'A Light in the Attic',
  bookPrice: '£51.77',
  noAvailable: '22',
  imageUrl: 'http://books.toscrape.com/media/cache/fe/72/fe72f0532301ec28892ae79a629a293c.jpg',
  bookDescription: "It's hard to imagine a world without A Light in the Attic. [...]',
  upc: 'a897fe39b1053632'
}
{
  bookTitle: 'Tipping the Velvet',
  bookPrice: '£53.74',
  noAvailable: '20',
  imageUrl: 'http://books.toscrape.com/media/cache/08/e9/08e94f3731d7d6b760dfbfbc02ca5c62.jpg',
  bookDescription: `"Erotic and absorbing...Written with starling power."--"The New York Times Book Review " Nan King, an oyster girl, is captivated by the music hall phenomenon Kitty Butler [...]`,
  upc: '90fa61229261140a'
}
{
  bookTitle: 'Soumission',
  bookPrice: '£50.10',
  noAvailable: '20',
  imageUrl: 'http://books.toscrape.com/media/cache/ee/cf/eecfe998905e455df12064dba399c075.jpg',
  bookDescription: 'Dans une France assez proche de la nôtre, [...]',
  upc: '6957f44c3847a760'
}
...
```

ok có lẽ đến đây bạn cũng đã hiểu được cách hoặt động của `puppeteer` rồi, mình sẽ giới thiệu thêm một số phần hưu ích nữa khi dùng `puppeteer`

### puppeteer với proxy

khi bạn crawl dữ liệu nhiều trang web sẽ phát hiện ra bạn truy cập bất thường và bật captra lên, bạn có thể tránh bị phát hiện là
Bạn cần setup khi start puppeteer như sau để chạy với proxy:

```js
   getBrowserProxy: async (proxy) => {
        return await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true,
            args: [
                '--proxy-server=' + proxy,
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--start-maximized',
            ]
        });
    },
```

ở đây `proxy` sẽ có định dạng `ip:port` ex: '203.205.29.90:45425', lưu ý proxy còn có các loại như HTTP, HTTPS, SOCKS4, SOCKS5 thì bạn cần đặt type của proxy ở phía trước như 
'socks4://203.205.29.90:45425'

### Deploy puppeteer trên centos

khi mình cài đặt và deploy source lên server centos có gặp 1 lỗi `UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: Failed to connect to chrome!`, cái này bạn cần cài đặt 1 lệnh trên chrome như sau:

```sh
yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y
```

bạn có thể tham khảo lỗi tại đây:

- https://github.com/puppeteer/puppeteer/issues/391


## Tham khảo

- http://books.toscrape.com/catalogue/category/books/travel_2/index.html
- https://github.com/puppeteer/puppeteer
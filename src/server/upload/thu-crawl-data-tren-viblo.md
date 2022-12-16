Trước tiên truy cập trang chủ truy cập tab newest https://viblo.asia/newest 

![](https://images.viblo.asia/c1ac510a-59c5-4f51-a629-fae0107ef61c.png)

Có nhiều cách để crawl data có thể dùng, sau đây mình giới thiệu 2 cách mình đã sử dụng 

## Cách 1

bạn kéo xuống cuối trang và click vào page 2 mục địch là kiếm api gọi khi chuyển trang!

F12 lên kiếm api nào filter với từ khóa new
![](https://images.viblo.asia/690d5bda-2344-41db-b861-ba367c8fd313.png)

nó đây `https://viblo.asia/api/posts/newest?page=2&limit=20`

trong url ta thấy có limit kìa :v

thử limit vs 30 xem
https://viblo.asia/api/posts/newest?page=2&limit=30

![](https://images.viblo.asia/e6603632-e001-4e50-ba05-b4e62bd5bbaf.png)

ngon.. ra 30 luôn

thử tip 60 coi nà 
![](https://images.viblo.asia/fbcc3e79-2229-4a72-8855-4ca5ee21672f.png)

đìu.. ra luôn (ngon)

lướt lên lại đầu trang ta thấy viblo có ~1200 trang thử với 1000x20 =20000 limit xem nà (mặc định paging của viblo là 20) có khi chỉ cần 1 api là có hết data của viblo :v: 

![](https://images.viblo.asia/45b7fbe5-cb76-42c0-acd1-17ffd6ac5532.png)

đìu méo được.. api đã giới hạn max là 100 rồi :D

công việc tiếp theo là viết code loop call tới api để lấy data về dùng thôi =))

## Cách 2

Cách này chủ yếu là để nghiên cứu thêm cách sử  dụng puppeteer, tài liệu của nó đây [puppeteer](https://github.com/puppeteer/puppeteer) mô tả ngắn gọn về nó thì nó giúp chúng ta tương tác với browser mà ko cần giao diện :D

Nhiệm vụ chính của chúng ta thì chỉ cần như thế này thôi:

Step 1: Truy cập url

Step 2: Crawl dữ liệu

Step 3: Chuyển trang

Step 4: Crawl dữ liệu

Step 5: Chuyển trang

loop tới khi nào hết thì thôi :v

Băt đầu như lúc truy cập vào browser ta cần địa chỉ của url cần đến

Thông thường thì muốn `https://viblo.asia/newest`

Convert qua puppeteer thôi:

Giả lập trình duyệt thôi tạo browser trong browser tạo new tab (page) :v

```javascript
const browser = await pt.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    const page = await browser.newPage();
```

Step 1: Truy cập url

```javascript
await page.goto('https://viblo.asia/'newest ',{waitUntil: 'load'});
```
waitUntil load => có nghĩa là truy cập trang và chờ tời khi trang load xong rồi mới xử lí tiếp

bình thường thì chỉ cần check api và lấy dữ liệu về thôi.. nhưng ko mình muốn sử dụng puppeteer để đọc html và lấy thông tin từ đó.. ta cùng xem cấu trúc nội dung list post của viblo:

![](https://images.viblo.asia/d1bd2088-4a6d-4463-a341-b98a90dd9f8b.png)

bây giờ mình muốn lấy cái slug của bài viết(**aWj53Dd1K6m**) thì nó nằm ở thẻ a trong thuộc tính href... Vậy làm cách nào để lấy được giá trị đó, minh nghĩ tới dùng javascript đầu tiên

Và để dùng javascript trong puppeteer ta sử dụng api **evaluate()**

```javascript
articles = await page.evaluate(() => {
            let imgElements = document.querySelectorAll('.post-title--inline h3 a');
            imgElements = [...imgElements];
            let articles = imgElements.map(i => {
                return i.getAttribute('href').split('-').pop();
            });
            return articles;
        });
```

đọc sơ qua thì ta có thể hiểu là lấy 1 list thẻ a.. loop lấy từng cái lấy thuộc tính href cắt nhỏ thông qua dấu '-' sau đó lấy phần tử cuối

Kết quả cuối cùng ta được mảng slug của danh sánh bài post ở trang hiện tại => ta lưu vào ở đâu đó để sử dụng.. lưu ở file.. ở database

Vậy lấy thêm 1 rồi thi làm gì tiếp ae.. tất nhiên là chuyển qua trang khác để lấy tiếp dữ liệu.. cho nên
ta nên vứt đoạn code trên trong vòng lặp.. ta lấy 500 trang thôi nha :D

```
for (var i = 2; i < 500; i++) {
        articleIds = await page.evaluate(() => {
            let imgElements = document.querySelectorAll('.post-title--inline h3 a');
            imgElements = [...imgElements];
            let articleIds = imgElements.map(i => {
                return i.getAttribute('href').split('-').pop();
            });
            return articleIds;
        });
        
        //TODO save 
}
```

Chừng đó là chưa đủ ta viết thêm đoạn code cho nó chuyển trang nữa nhé:

Kéo xuống f12 chỗ cái page để kiếm cái link nà

![](https://images.viblo.asia/7024706a-4f10-448a-94a3-ec6a49110b9c.png)

code code code...

```
for (var i = 2; i < 500; i++) {
        articleIds = await page.evaluate(() => {
            let imgElements = document.querySelectorAll('.post-title--inline h3 a');
            imgElements = [...imgElements];
            let articleIds = imgElements.map(i => {
                return i.getAttribute('href').split('-').pop();
            });
            return articleIds;
        });
        
        //TODO save 
        
        navigationPromise = page.waitForNavigation();
        await page.click('.pagination a[href*="/?page='+i+'"]');
        await navigationPromise;
}
```
waitForNavigation() : đại loại như là chờ tới khi trang chuyển trang xong

page.click(selector[, options]) : phát sinh sự kiện click cho selector truyền vào [document ở đây nhé](https://github.com/puppeteer/puppeteer/blob/v2.1.1/docs/api.md#pageclickselector-options)

Rất đơn giản phải không các bạn :D ta có crawl data với bất kì trang web nào.. bằng cách kết hợp sử dụng puppeteer ta có thể lấy được những thông tin mà api ko trả về luôn :v: 

Bonus thêm api lấy post chi tiết 'https://viblo.asia/api/posts/' + slugPost
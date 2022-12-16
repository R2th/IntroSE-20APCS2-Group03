# Giới thiệu
Bạn thích hát nhưng không thuộc lyric, bạn muốn tự động lưu lại lyric những bài hát hot nhất mà không phải vào từng link copy và paste.

Hôm nay chúng ta hãy cùng làm tool auto crawl những bài hát hot nhất từ zingmp3 ở `https://mp3.zing.vn/zing-chart/bai-hat.html` nhé!
![](https://images.viblo.asia/e95b629f-40d9-43a6-a792-93676415ada6.png)
# Cài đặt môi trường
Ở phần trước chúng ta đã tìm hiểu và làm quen với puppeteer rồi nên phần này mình sẽ không giới thiệu lại nha!
Nếu quên thì bạn có thể xem ở link sau: http://www.minhhieu.asia/headless-browser-la-cai-chi-chi-puppeteer-lam-duoc-nhung-gi/
Vẫn những bước quen thuộc thôi chúng ta cùng làm nhé:
1. Tạo một folder mới có tên zing ( cái này bạn đặt tùy thích )
2. Truy cập vào folder mới gõ npm i puppeteer
3. Tạo một file có tên index.js ( Chúng ta sẽ viết code trong này )
4. Tạo một folder có tên song , chúng ta sẽ lấy lyric và lưu và file txt trong này.
Đợi một chút cho puppeteer cài đặt và tải bản chromium mới nhất về là ta đã cài đặt xong môi trường rồi.
# Giới thiệu về API của Puppeteer
Ở trong phần trước [](http://www.minhhieu.asia/lam-ung-dung-auto-chui-voi-nodejs-va-puppeteer/) mình đã dùng một số Api rồi mà quên chưa giới thiệu với các bạn. Puppeteer hỗ trợ rất nhiều api cho chúng ta thỏa sức voọc vạch. Chúng cũng không quá phức tạp đâu, bạn hãy đọc thêm ở đây nhé [](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md) 
Hôm nay, chúng ta sẽ dùng một api rất quan trọng của puppeteer đó là page.evaluate. Nó cho phép ta chạy script trong browser và lấy kết quả trả về.

Vậy là đã hết phần giới thiệu rồi đó.

# Bắt tay vào làm thôi !!
1. Như mình đã nói ở trên page.evaluate giúp chúng ta chạy script ở browser và lấy kết quả trả về. Muốn viết được đoạn script, chúng ta cần phần tích cấu trúc HTML của trang [](https://mp3.zing.vn/zing-chart/bai-hat.html) 

![](https://images.viblo.asia/476b4acd-b2fc-4daf-b190-6f19df050402.png)

Chúng ta có thể thấy, các bài hát là các div có class là desc-song. Tiêu đề bài hát được đặt trong **thẻ a** có ba class là **fn-name fn-link _trackLink**, link đến bài hát nằm ở trong attribute **href** của **thẻ a** đó luôn.

2. Chúng ta hãy thử lấy dữ liệu bằng cách viết script ở thẻ console nhé 
``` 
//Lấy tất cả các class có tên desc-song
let songs = document.getElementsByClassName('desc-song');
//Chuyển thành mảng
songs = [...songs];
let array = songs.map(link => ({
    //Lấy tên bài hát
    title: link.getElementsByClassName('fn-name fn-link _trackLink')[0].innerHTML.trim(),
    //Lấy link đến bài hát
    url: link.getElementsByClassName('fn-name fn-link _trackLink')[0].href
}));
```
Chạy thử code trên trong tab console  và log **array** ra ta được kết quả

![](https://images.viblo.asia/aad49806-2c6a-47fc-9533-eeba3b9c9766.png)

3.Tiếp theo, ta cần get lyric trong từng url get được VD: https://mp3.zing.vn/bai-hat/Vo-Tinh-Xesi-Hoaprox/ZW9DC99A.html , thử truy cập vào một url và phân tich HTML nào

![](https://images.viblo.asia/3c5b79cb-0716-498b-9259-f1c720ddcd8e.png)
Vậy là lyric nằm trong một thẻ p có class là fn-wlyrics fn-content. Vì trong thẻ p có cả thẻ br nên ta lọc cả thẻ br nữa bằng code sau:
```

document.getElementsByClassName('fn-wlyrics fn-content')[0].innerHTML.replace(/\<br\>/g,"")

```
Thử copy vào console và chạy nào
![](https://images.viblo.asia/48af69ea-aa3e-4543-9178-1faef4a40a56.png)
Vậy là đã lấy được lời bài hát rồi, thật đơn giản phải không.
# Quay lại project Nodejs và viết thôi
Quay lại file index.js chúng ta sửa như sau
```

const puppeteer=require('puppeteer');

(async()=>{
const browser=await puppeteer.launch({headless:true});
const page=await browser.newPage();
//Truy cập đến top 100 bài hát
await page.goto('https://mp3.zing.vn/zing-chart/index.html');
const songs = await page.evaluate(() => {
        let songs = document.getElementsByClassName('desc-song');
        songs = [...songs];
        let array = songs.map(song => ({
            title: song.getElementsByClassName('fn-name fn-link _trackLink')[0].innerHTML.trim(),
            url: song.getElementsByClassName('fn-name fn-link _trackLink')[0].href
        }));
        return array;
    });
//Duyệt mảng songs để lấy url và get lyric 
    for(let song of songs){
      await page.goto(song.url);
      let lyric = await page.evaluate(()=>{
          let lyric = document.getElementsByClassName('fn-wlyrics fn-content')[0].innerHTML.replace(/\<br\>/g,"");
          return lyric;
      });
      console.log("______________");
      console.log(song.title);
      console.log("______________");
      console.log(lyric);
    }
    await browser.close();
})();

```
Sửa file **index.js** rồi trong cmd bạn chạy **node index** . Ta được kết quả như sau:

![](https://images.viblo.asia/004cbcae-330c-405f-81c4-7bb25161f39c.png)
Sửa code một chút để không log ra kết quả nữa mà lưu vào một file txt có tiêu đề là tên bài hát nhé:
```

const puppeteer=require('puppeteer');
const fs = require('fs');
(async()=>{
const browser=await puppeteer.launch({headless:true});
const page=await browser.newPage();

await page.goto('https://mp3.zing.vn/zing-chart/index.html');
const songs = await page.evaluate(() => {
        let songs = document.getElementsByClassName('desc-song');
        songs = [...songs];
        let array = songs.map(song => ({
            title: song.getElementsByClassName('fn-name fn-link _trackLink')[0].innerHTML.trim(),
            url: song.getElementsByClassName('fn-name fn-link _trackLink')[0].href
        }));
        return array;
    });

    for(let song of songs){
      await page.goto(song.url);
      let lyric = await page.evaluate(()=>{
          let lyric = document.getElementsByClassName('fn-wlyrics fn-content')[0].innerHTML.replace(/\<br\>/g,"");
          return lyric;
      });
      await fs.writeFile(`song/${song.title}.txt`,lyric,function(err){
        if(err) throw err;
        console.log("Đã lưu:"+song.title);
      });
    }
    await browser.close();
})();

```
Và đây là thành quả của mình =))

![](https://images.viblo.asia/7f548603-0c94-4a8c-bf3b-e2328f59e534.png)
*Bài hát được lưu vào file txt trong folder **song***

![](https://images.viblo.asia/19bf88ac-e0eb-4909-a3ed-7d8da0dba000.png)

![](https://images.viblo.asia/980ea1e6-32c4-423d-b855-bf30db3eb780.png)
*Lời bài hát được lưu vào file txt*
# Kết
Chúc các bạn thành công nha =)) Nếu code lỗi hay chỗ nào thấy vướng mắc thì hãy cmt bên dưới để  mình giải đáp nhé.
Many thanks !



-----

Bài viết được trích từ blog của mình http://www.minhhieu.asia/crawl-lyric-zing-mp3-voi-puppeteer/ . Mong các bạn góp ý để chất lượng bài viết được nâng cao hơn.Nhớ theo dõi nếu bạn muốn cập nhật những bài viết mới nhất nhé!
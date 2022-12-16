Chào các bạn!
Nêu các bạn đã xem qua bài viết http://www.minhhieu.asia/headless-browser-la-cai-chi-chi-puppeteer-lam-duoc-nhung-gi/ của mình thì phần nào bạn cũng đã hiểu nguyên tắc hoạt động cũng như những cái “bá đạo ” của headless browser cũng như puppeteer đúng không nào. Lý thuyết thì phải đi đôi với thực hành, hôm nay chúng ta hãy cùng làm một thứ hay ho hơn với puppeteer và headless browser nhé!
# Giới thiệu
Hãy thử tưởng tượng một ngày, bạn lao vào một cuộc tranh cãi với một “kiddo” trên facebook. Cay cú vì thua cuộc, thằng kiddo kia vào messenger của bạn và liên tục spam những câu khiếm nhã.Mà bạn không muốn giảnh thời gian vàng bạc của mình để cãi nhau với nó.  Bây giờ bạn sẽ làm gì ? Block facebook nó chăng ?.

Đó chính là lúc ta cần dùng đến bảo bối thần kì “Tool auto chửi”.

![](https://images.viblo.asia/29e1807b-b131-40c3-92bb-43d634647443.jpg)

Giởi thiệu thế đủ rồi ta cùng bắt tay vào làm nhé!
# Ý tưởng thực hiện
Bình thường khi muốn vào facebook nhắn tin như thế nào, thì ta sẽ dùng headless browser làm tương tự vậy, nhưng ở đây mình sẽ dùng https://m.facebook.com , để tránh bị đánh dấu là spam và ăn checkpoint.
Mình sẽ liệt  kê những bước cần làm ở dưới nhé:
1. Truy cập vào trang https://m.facebook.com
2. Nhập email và mật khẩu vào ô input !
[](https://images.viblo.asia/60dc3da8-5e58-4d31-b585-a3e2ceb7553b.png)
3. Nhấn nút đăng nhập 
4. Truy cập vào link https://m.facebook.com/messages/thread/ID_NGƯỜI_NHẬN ,đây là link tới của sổ chat với ID_người_nhận là ID người mà ta muốn nhắn tin.

5. Nhập tin nhắn vào ô input và nhấn nút gửi 
![](https://images.viblo.asia/971399cb-1152-4aba-8d1d-702d0e6c51e2.png)
Ok vậy là đã xong rồi đó, chúng ta cùng điều khiển Chrome Headless Browser để làm theo những bước trên nha !
# Công cụ sử dụng
1. Puppeteer : nếu bạn chưa biết thì đọc bài này nhé http://www.minhhieu.asia/headless-browser-la-cai-chi-chi-puppeteer-lam-duoc-nhung-gi/ !!
2. Module Readline : Cái này để tạo giao diện console!!
# Khởi tạo project
1. Đầu tiên ta cần tạo folder chứa project, ở trong folder mới ( lưu ý các bạn không đặt tên là puppeteer nhé ! ) ta mở cmd lên và gõ như sau:
```
npm init
```
Câu lệnh trên sẽ khởi tạo project, ta nhấn enter liên tiếp để dùng giá trị default

2.Tiếp theo, cài đặt module puppeteer và readline
```
npm i readline puppeteer --save
```
Đợi hơi lâu một chút, chịu khó nhé =))

3.Tạo một file index.html, chúng ta sẽ viết code ở trong này.
# Đăng nhập Facebook với Puppeteer
Sau khi khởi tạo xong xuôi chúng ta sẽ đăng nhập facebook với puppeteer nhé.

Mở index.js lên và ta sửa như sau ( bây giờ mình sẽ comment trong code nhé :)
```

const puppeteer=require('puppeteer');
const readline = require('readline');
// Thay FB_EMAIL bằng email hoặc tên đăng nhập của ban nhé
var username="FB_EMAIL";
//Thay FB_PASSWORD bằng passoword của bạn nhé
var password="FB_PASSWORD";

(async()=>{
// Chạy browser với chế độ headless:false, tức là có giao diện
const browser=await puppeteer.launch({headless:false});

const page=await browser.newPage();
// Truy cập vào trang m.facebook.com
await page.goto('https://m.facebook.com');
// Nhập email vào ô đăng nhập
await	page.type('#m_login_email',username);
// Nhập password vào ô đăng nhập
await	page.type('#m_login_password',password);
// Click nút đăng nhập
await	page.click("button[value='Đăng nhập']");
// Đợi trang tải xong
await	page.waitForNavigation();
})();

```
Giờ bạn hãy mở lại cmd lên và gõ
```
node index
```
Nếu thành công, bạn sẽ thấy cửa sổ chrome mở lên, truy cập vào trang http://m.facebook.com, nhập tài khoản và mật khẩu của bạn vào ô input và tự động click vào nút đăng nhập.

![](https://images.viblo.asia/b1f55d77-3a40-4db8-9dff-5bddf0df0d38.png)

# Gửi tin nhắn với puppeteer
Tiếp theo chúng ta đến bước nhắn tin. Sau khi đăng nhập thành công,  ta cần truy cập đến địa chỉ  [](https://m.facebook.com/messages/read/?fbid=ID_người_nhận&_rdr) nhập text vào ô input và nhân enter, cùng inspect để xem id của ô input là gì nhé.

![](https://images.viblo.asia/ee2e56a5-cd93-428a-b266-c6be4108df88.png)
Vậy id của ô input là **composerInput**
Ok tiếp tục ta sửa code để nhập vào ô input và nhấn nút gửi
```

const puppeteer=require('puppeteer');
const readline = require('readline');
// Thay FB_EMAIL bằng email hoặc tên đăng nhập của ban nhé
var username="FB_EMAIL";
//Thay FB_PASSWORD bằng passoword của bạn nhé
var password="FB_PASSWORD";

(async()=>{
// Chạy browser với chế độ headless:false, tức là có giao diện
const browser=await puppeteer.launch({headless:false});

const page=await browser.newPage();
// Truy cập vào trang m.facebook.com
await page.goto('https://m.facebook.com');
// Nhập email vào ô đăng nhập
await	page.type('#m_login_email',username);
// Nhập password vào ô đăng nhập
await	page.type('#m_login_password',password);
// Click nút đăng nhập
await	page.click("button[value='Đăng nhập']");
// Đợi trang tải xong
await	page.waitForNavigation();
//Truy cập đến của sổ chat của bạn bè ( Bạn tự thay ID người nhận nha hoặc Id của bạn để test cũng được )
await 	page.goto('https://m.facebook.com/messages/thread/'+ID_NGƯỜI NHẬN+'/');
// Nhập "Hello bạn" vào ô input
await page.type('#composerInput',"Hello bạn");
// Nhấn nút gửi
await page.click("button[value='Gửi']");

})();

```
Nếu chạy thành công, sau khi đăng nhập chúng ta sẽ truy cập vào cửa sổ chat, tin nhắn sẽ tự đông được nhập và gửi.

Vậy muốn nhắn nhiều tin thì sao ? Đơn giản thôi, ta sẽ cho message và một mảng và foreach mảng ấy thôi. Bạn sửa lại code như sau:
```

const puppeteer=require('puppeteer');
const readline = require('readline');
// Thay FB_EMAIL bằng email hoặc tên đăng nhập của ban nhé
var username="FB_EMAIL";
//Thay FB_PASSWORD bằng passoword của bạn nhé
var password="FB_PASSWORD";

(async()=>{
// Chạy browser với chế độ headless:false, tức là có giao diện
const browser=await puppeteer.launch({headless:false});

const page=await browser.newPage();
// Truy cập vào trang m.facebook.com
await page.goto('https://m.facebook.com');
// Nhập email vào ô đăng nhập
await	page.type('#m_login_email',username);
// Nhập password vào ô đăng nhập
await	page.type('#m_login_password',password);
// Click nút đăng nhập
await	page.click("button[value='Đăng nhập']");
// Đợi trang tải xong
await	page.waitForNavigation();

await 	page.goto('https://m.facebook.com/messages/thread/'+ID_NGƯỜI_NHẬN+'/');
// Foreach mảng messages, nhớ delay không ăn checkpoint của facebook nha

await messages.forEach(async function(data,index){
await setTimeout(async function(){
//Thông báo tin nhắn đã gửi ra console
     await console.log("Đã chửi :'"+data+"'");
         await page.type('#composerInput',data);
         await page.click("button[value='Gửi']");
    },index*1000);
});

})();

```
Dừng chương trình cũ và chạy lại node index , đây là thành quả:

![](https://images.viblo.asia/162d2fb9-c0d6-4078-95b5-2396c802ae68.png)

![](https://images.viblo.asia/7332af1f-d531-43a5-bd00-b76c55dbe351.png)

Bây giờ bạn có thể sử  dụng module readline để làm giao diện console hoặc express.
Vì bài viết đã khá dài nên cái này các bạn tự tìm hiểu nha =))
Các bạn có thể làm một cái tương tự như demo của mình:
{@embed: https://www.youtube.com/watch?v=uJ37GvHixJU&feature=youtu.be}
Cảm ơn các bạn đã theo dõi.


-----
Bài viết được trích từ blog của mình http://www.minhhieu.asia/lam-ung-dung-auto-chui-voi-nodejs-va-puppeteer/ . Trong bài viết không thể tránh khỏi những sai sót, mong các bạn góp ý.
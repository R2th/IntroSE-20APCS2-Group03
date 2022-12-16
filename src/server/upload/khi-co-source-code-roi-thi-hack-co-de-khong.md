Đợt vừa rồi mình có tham gia giải CTF Cyber Apocalypse 2021, mình chủ yếu là care phần web một ít bài misc vì web là thế mạnh. Team mình cũng chỉ xếp **157/4740** và giải hầu hết bài web, chủ yếu tham gia để cọ xát.
Nhưng điều khiến mình khá thích thú là có đến hơn 80% trong số các challenge web là review source code (cái này là còn thế mạnh của mình hơn nữa), các bài web cũng rất thực tế. Hôm nay, tự nhiên mình nghĩ cũng nên chia sẻ gì đó nên ngồi viết lại writeup các bài mình đã làm, và dưới đây là một bài trong số đó. Cũng để cho các bạn đọc xem qua việc review một source code web thì sẽ như thế nào? có khó hay dễ? ...

## 1. Đề bài

Đề bài web này 1 lần nữa lại là một bài review source code. Mình rất hứng thú với mấy bài review source code, vì có vẻ nó là sở trường của mình.

--- Web Alien complaint form ---

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/Screen_Shot_2021-04-24_at_23.27.37.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/Screen_Shot_2021-04-24_at_23.27.37.png)

Source code cho như dưới đây.

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/Screen_Shot_2021-04-24_at_23.28.24.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/Screen_Shot_2021-04-24_at_23.28.24.png)

## 2. Nào! Chúng ta cùng đục nó

Khi dạo qua một vòng code thì mình thấy một file `bot.js`.

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/Screen_Shot_2021-04-24_at_23.28.52.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/Screen_Shot_2021-04-24_at_23.28.52.png)

**Giải thích** Ứng dụng sẽ dùng thư viện `puppeteer` để tạo một browser và thực hiện mở các đường dẫn như `http://127.0.0.1:1337` và `http://127.0.0.1:1337/list`, tuy nhiên điểm cần lưu ý là: Ở dòng 131 sau khi truy cập vào `http://127.0.0.1:1337` thì browser sẽ `setCookie` và trong cookies đó có chưa flag (dòng 21 đến 24). Và sau đó sẽ đi tiếp đến đường dẫn `http://127.0.0.1:1337/list`. Khi đã load được trang web thì browser sẽ đóng và datbase sẽ được `migrate` lại (tức là xóa đi dữ thêm mới vào, chỉ giữ lại giữ liệu khởi tạo DB) dòng 37, 38.

Vậy qua đó, chúng ta cần làm rõ tiếp 2 điều:
 1. Hàm `purgeHumanEntries` đang được sử dụng (call) ở đâu?
 2. `http://127.0.0.1:1337/list` (URI: /list) là chức năng gì, trả về cái gì?

### 2.1 Đi tìm chân lý
Và tôi đã thấy nó trong file `routes/index.js`.

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/source-code-index-first.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/source-code-index-first.png)

- Từ dòng 10 đến dòng 15 là chức năng của URI /list
- Dòng 23 là nơi gọi (call) đến function `purgeHumanEntries`

#### 2.1.1 Tìm hiểu chức năng của /list

Đường dẫn chỉ cho phép truy cập từ local, thể hiện ở dòng 11. Nếu `request.ip != '127.0.0.1'` thì ứng dụng sẽ trả về `Only localhost is allowed`. Nhớ lại bên trên, chúng ta đã có một browser có truy cập đến đường dẫn `/list` này và browser do ứng dụng tạo ra nên nó là truy cập từ local -> Chúng ta tìm hiểu làm sao để có thể thực thi hàm `purgeHumanEntries` nữa là ăn chắc rồi.

Nếu truy đường dẫn bằng local thì ứng dụng sẽ render file `list.html`. Chúng ta xem xét file `list.html`.

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/source-code-list-html.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/source-code-list-html.png)

`list.html` chỉ là một file html bình thường, tuy nhiên tôi đã thấy nó sử dụng file javascript `list.js` ở dòng 42. Tôi tiếp tục tìm hiểu xem trong đó có gì không?

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/source-code-list-js.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/source-code-list-js.png)

Và 'tôi đã thấy cái gì đó, điều làm tôi điên lên vì nó'. Tôi đã thấy từ dòng 1 đến dòng 15, code javascript dùng để render html danh sách `feedback`, và sử dụng `${}` - Tôi đã nghĩ ngay đến XSS.

Tuy nhiên ở file `list.html` dòng số 6. Chúng ta có thể thấy có dòng code.

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; object-src 'none'; base-uri 'none'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com">
```

Như vậy, đối với file `list.html` hay nói cách khác `/list` chỉ có thể chạy được javascript được tải từ cùng một tên miền qua tham số: `default-src 'self';`. Các bạn có thể tìm hiểu rõ hơn về CSP ở đây https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP

Nhưng thật may mắn khi có thể thấy từ dòng 17-29 của file `list.js` có khởi tạo và sử dụng jsonp. JsonP là gì thì các bạn tham khảo: https://www.w3schools.com/js/js_json_jsonp.asp . Thứ tôi quan tâm trong bài này là JSONP có thể `Creating a Dynamic Script Tag`. Vậy thử xem nó hoạt động như nào nha.

Source code của `/api/jsonp` sẽ lấy callback từ query param cùng với list feedback từ trong database và trả về với format

```js
reply.send(`${callback}(${JSON.stringify(feedback)})`);
```

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/source-code-jsonp.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/source-code-jsonp.png)

Đây là kết quả khi chạy /api/jsonp

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/jsonp.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/jsonp.png)

Và chúng ta thấy, trong kết quả trả về vùng khoanh tròn màu đỏ là callback, còn lại là danh sách feedback. Vì callback được lấy từ query param nên ta có thể thử kiểm soát nó.

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/kiem-soat-callback.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/kiem-soat-callback.png)

Chúng ta thấy, `/api/jsonp` được call trong file `list.js`, là nếu như kết quả nó trả về là mã javascript thì sao? Thì tất nhiên là nó có thể thực thi được, đúng không? Vậy để cho kết quả trả về là mã javascript hợp lệ thì tôi thử thêm `//` để comment đi các dữ liệu phía sau.

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/comment-jsonp.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/comment-jsonp.png)

Để chứng minh điều này đúng, tôi đã thử tạo 1 file html và chạy nó lên như sau:

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/alert.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/alert.png)

Tuyệt vời, nó đã chạy đúng với suy nghĩ của tôi.

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/alert-run.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/alert-run.png)

Tuy nhiên, vì `/api/json` được call trong `list.js`, mà `list.js` lại được sử dụng trong `list.html`, tiếp tục `list.html` được trả về khi đi tới đường dẫn `/list`. Vậy chúng ta có thể sử dụng `/list?callback={payload javascript}` để kiểm soát `/api/jsonp` gọi trong nó. Để chứng minh điều này, tôi đã dựng lại source code dưới local và thử.

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/alert-success.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/alert-success.png)

**Kết luận sau khi đi hết 2.1.1:**

- Chức năng `/list` được `bot` gọi tới
- Chức năng `/list` có injection được html tag
- Chức năng `/api/jsonp?callback=?` có thể tạo ra mã javascript tùy ý bằng param `callback`
- Chức năng `/list` có thể thực thi mã javascript tùy ý bằng cách thêm param `callback`


#### 2.1.2 Tìm hiểu nơi call `purgeHumanEntries`

Như đề bài ta thấy trang web có chức năng submit feedback như vầy, khi nhập vào form và bấm submit thì sẽ được call tới `/api/submit`

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/Screen_Shot_2021-04-24_at_23.27.37.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/Screen_Shot_2021-04-24_at_23.27.37.png)

Tôi thấy chức năng `purgeHumanEntries` được sử dụng trong file `routes/index.js` và được sử dụng trong chức năng `/api/submit`

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/purgeHumanEntries.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/purgeHumanEntries.png)

**Giải thích qua cách hoạt động một xíu:** Biến `complaint` được lấy từ `request.body` và sẽ được lưu vào database thông qua hàm `db.addFeedback(complaint)`, khi lưu vào database xong thì bot sẽ được call với hàm `bot.purgeHumanEntries(db)`. Vậy là chúng ta có thể kiểm soát `complaint`. Bây giờ đi sâu vào 2 function là `db.addFeedback(complaint)`.

Với `db.addFeedback(complaint)`. `complaint` sẽ được thêm vào table `feedback` trong database.

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/add-feedback.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/add-feedback.png)

**Như ta đã biết phía trên, thì database feedback được lấy ra vào hiển thị ở URI `/list`**


### 3. Kết luận luồng suy nghĩ và tạo payload

#### 3.1 Kết luận suy nghĩ

Vậy qua các bước đi vòng vòng vòng tìm kiếm các thứ, tôi tạm hiểu web đang hoạt động như sau:

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/IMG_2077.jpg](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/IMG_2077.jpg)

Suy nghĩ về exploit:

1. Tạo một payload javascript steal cookie để inject form submit feedback bằng chức năng `/api/jsonp`
2. Payload javascript sẽ được lưu vào database
3. Bot sẽ đi tới `/list` và javascript sẽ được thực thi
4. Có được cookie chứa flag

#### 3.2 Tạo payload

Đến đây, tôi nhớ đến lại chức năng của bot như sau:

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/Screen_Shot_2021-04-24_at_23.28.52.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/Screen_Shot_2021-04-24_at_23.28.52.png)

Bot chỉ đi tới `http://127.0.0.1:1337/list`, vậy thì làm sao tôi có thể thêm `?callback` vào sau để mà thực thi javascript?

Câu trả lời là, ở `/list` chúng ta có thể inject html tag, nên tôi sử dụng thẻ `iframe` để làm điều đó. Tôi có `iframe`

```html
<iframe src="/list?callback={payload javascript}"></iframe>
```

Như vậy, khi bot đi tới `/list` thì `iframe` sẽ load `/list?callback={payload javascript}`, như vậy payload javascript đã được thực thi trong `iframe`.

**Đoạn này giải thích ngắn gọn một điểm lưu ý như vầy:** Khi tôi cố tạo payload là 1 mã javascript call ra domain của tôi kèm theo cookie, nhưng đã không thành công vì challenge này đã chặn call ra internet. Vì vậy tôi đã phải bỏ qua suy nghĩ đó, và tìm cách khác để steal cookie.

Vậy thì phải làm gì tiếp theo? 

Nhìn lại bên trên, chúng ta có `/api/jsonp` sẽ trả về danh sách `feedback` lấy được từ trong database. Đến đây đã có ý tưởng là tạo payload javascript call `/api/submit` để thêm cookies vào database `feedback`, và sau đó đi tới `/api/jsonp` để xem flag. Ý tưởng hoàn hảo.

```js
fetch("/api/submit",{headers: {'Accept':'application/json','Content-Type':'application/json'},method:"POST",body:JSON.stringify({complaint: document.cookie})});
```

Nhưng đến đây, tôi lại gặp vấn đề là sau khi bot đi đến `/list` thì ứng dụng sẽ `migrate` lại database, vậy thì cookies khi thêm vào sẽ bị xóa đi thì làm sao có thể xem được khi vào `/api/jsonp`. Tôi mở file `bot.js` và xem lại một lần nữa và chợt nhận điều đặc biệt.

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/bot-await.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/bot-await.png)

```js
await browser.close();
await db.migrate();
```

Như vậy là, ứng dụng sẽ đợi cho `browser` đóng thì mới thực hiện `migrate` database. Thể hiện qua việc sử dụng hàm `await` (Nếu chưa biết `await` là gì thì tìm hiểu `await trong nodejs` nhé các bạn.). Đến đây lại nảy lên ý tưởng, vậy tôi thử làm cho browser đừng đóng lại, vậy là có thể đọc được flag trong database rồi. Đơn giản chỉ việc thêm `alert(1)` phía sau đoạn payload javascript submit là xong.

```js
fetch("/api/submit",{headers: {'Accept':'application/json','Content-Type':'application/json'},method:"POST",body:JSON.stringify({complaint: document.cookie})});alert(1)//
```

#### 3.3 Thử payload cuối cùng

Vậy payload cuối cùng hoàn chỉnh là

```js
<iframe src="/list?callback=
fetch("/api/submit",{headers: {'Accept':'application/json','Content-Type':'application/json'},method:"POST",body:JSON.stringify({complaint: document.cookie})});alert(1)//"></iframe>
```

Thử nó thôi, submit payload vào form.

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/Screen_Shot_2021-04-24_at_23.37.47.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/Screen_Shot_2021-04-24_at_23.37.47.png)

Đi tới đường dẫn `/api/jsonp`, và lấy flag nào.

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/Screen_Shot_2021-04-24_at_23.38.16.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Alien-complaint-form/Screen_Shot_2021-04-24_at_23.38.16.png)

Flag là: CHTB{CSP_4nd_Js0np_d0_n0t_alw4ys_g3t_al0ng}

### Kết luận cuối cùng.

Cuối cùng thì trả lời cho câu hỏi cũng là tiêu đề bài: `Khi có source code của một ứng dụng rồi thì hack có dễ không?`. Thì thật ra câu trả lời cho câu hỏi này cũng khó có thể khẳng định được. Tuy nhiên có thể trả lời theo một số ý như sau:
- Không dễ như một số bạn tưởng, tuy nhiên nó sẽ dễ hơn việc ngồi blackbox
- Nếu không có kiến thức hoặc ít ra là không biết cách tìm kiếm đúng từ khóa hoặc không nhìn được đúng vấn đề thì vẫn khó như thường.

Các bạn có thể đọc thêm bài writeup của mình về giải CTF Cyber Apocalypse 2021, ở đây: https://manhnv.com/categories/ctf/ , nhiều bài bổ ích và thú vị lắm nha.
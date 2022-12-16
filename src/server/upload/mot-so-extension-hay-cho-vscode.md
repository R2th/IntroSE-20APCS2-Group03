## 1. Mở đầu 
<hr>

Đối với mỗi developer thì các phần mềm `editor` hay `IDE` là công cụ không thể thiếu trong công việc thường ngày của chúng ta vì đây chính là nơi mà chúng ta viết ra những dòng code của mình. Tuy nhiên đồng hành với các `editor` hay `IDE` này còn có muôn vàn những `extension` hay những `plugin` mở rộng khác để hỗ trợ chúng ta nhiều điều hơn thế nữa. Trong bài viết ngày hôm này mình xin chia sẻ với các bạn 4 extension mà mình hay sử dụng với `VSCode`, nào chúng ta cùng bắt đầu.

## 2. VSCode Extension
<hr>

### a. GitLens — Git supercharged

Git không còn là công cụ xa lạ vì với mỗi chúng ta nữa và nó dường như là điều không thể không biết đến khi là một developer vì nó mang lại cho chúng ta rất nhiều các lợi ích khác nhau. Extension đầu tiên mà mình muốn giới thiệu với các bạn ở  đây đó chính là `Gitlens`, một công cụ hỗ trợ chúng ta khi làm việc với `VSCode`.

![](https://images.viblo.asia/979be05e-86fd-41e5-b1c6-010807c4c030.png)

Extension này mang đến cho chúng ta rất nhiều các tính năng khác nhau mà bạn có thể khám phá toàn bộ ở [đây](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens). Còn với mình thì một số tính năng mình hay dùng với `Gitlens` đó là:
- Git Blame: Đúng như tên gọi của nó thì tính năng này sẽ giúp chúng ta nhanh chóng tìm ra người đã viết dòng code này bằng cách bấm chuột vào dòng code đó. `Gitlens` sẽ hiện ra tên người viết dòng code đó cũng như thời gian vào lúc nào. Từ đó bạn có thể "blame" chính xác người nếu nó là nguyên nhân gây ra bug :v: 

![](https://images.viblo.asia/afcdd0ff-6a9c-448d-8988-283e0c6e8bec.gif)

- File History: Tính năng này cho phép chúng ta xem lại lịch sử commit đối với một file bất kì. Nó sẽ hiển thị thông tin về nội dung liên quan đến ai commit, nội dung thay đổi trên file và thời gian nào:

![](https://images.viblo.asia/8b38551e-fe7a-4e79-b791-93570fbfc4dc.gif)

### b. Code Spell Checker

Đúng như tên gọi của nó thì đây là công cụ hỗ trợ chúng ta soát lỗi chính ta trong khi code. Mặc dù việc bạn viết sai chính tả không anh hưởng quá lớn đến logic của code nhưng nhìn nó sẽ bị buồn cười nếu người khác đọc hoặc có thể dẫn đến làm cả team sai theo :v

![](https://images.viblo.asia/3eac7585-e8ee-422f-b1b0-e914cc7f3917.png)

Giả sử trong code của mình có 1 function mình gõ tên bị sai chính tả:

![](https://images.viblo.asia/dd2e91dc-98ee-44ec-966c-3ab2a668b283.png)

Bạn sẽ thấy từ bạn viết sai sẽ bị gạch chân giống như hình trên. Đồng thời nếu bạn hover vào chỗ nó sẽ báo lỗi chính tả của bạn đồng thời hỗ trợ bạn trong việc fix ngay lỗi đó:

![](https://images.viblo.asia/8fac0b75-18e7-471e-928b-d3a5a205f545.gif)

Trong trường hợp từ của bạn thuộc dạng tên riêng thì bạn cũng có thể thêm từ đó vào từ điển cá nhân của bạn để những lần sau nó sẽ không báo lỗi nữa:

![](https://images.viblo.asia/185962da-0ef6-4a80-9a5f-2d04087cab2e.gif)


### c. Bookmarks

`Extension` này phép bạn lưu lại, note lại 1 đoạn code bất kì để bạn có thể quay lại xem nó sau này. Trường hợp khi code bạn thấy phần này mình xử lý chưa tốt hoặc cần thiết refactor về sau thì bạn có thể dùng tính năng của `Extension` này và bookmark phần code đó lại để bạn không phải tự nhớ nữa:

![](https://images.viblo.asia/cfa595b8-25ca-4359-919e-9974cce9bace.gif)

Bạn có thể bôi đen phần code muốn bookmark sau đó chuột phải và chọn như trong hình trên của mình hoặc bạn có thể dùng tổ hợp phím `Ctrl + Alt + K` để lưu. Sau khi bookmark bạn còn có thể note lại lý do bookmark đoạn code đó cho tiện sau này và khi bạn click vào phần bookmark này sẽ lập tức mở file tương ứng vả nhảy đến đoạn code của bạn.

### d. i18n-ally

Đây là một `extension` khá hay hỗ trợ bạn trong việc làm đa ngôn ngữ cho trang web của mình. Ở đây mình sẽ lấy ví dụ về 1 project `React` của mình đang có sẵn. Vì bài viết này liên quan đến `extension` của `VSCode` nên mình sẽ không đề cập đến việc tích hợp `i18n` vào project `React` của bạn vì thế nếu bạn chưa biết cách làm thì có thể trả cứu các bài viết khác trên Viblo. Giả sử project của mình đã tích hợp `i18n` với `package` là `i18n-next` và mình có cấu trúc folder project như sau:

![](https://images.viblo.asia/a49c14ac-9022-4f1f-94cb-34487335f9c3.png)

Như bạn thấy trong hình thì mình có 1 folder là `locales/` đẻ chứa các file dùng để dịch sang 3 ngôn ngữ là `en`, `vi` và `ja`. Tiếp đến trong code của mình có sử dụng đến package `i18n-next` như sau:

```js
import React from 'react';
import { useTranslation } from 'react-i18next';

const DetailPage = () => {
    const { t } = useTranslation();

    return (
        <div>
            <p>{t('Hello')}</p>
            <p>{t('Please enter email')}</p>
            <p>{t('Invalid email format')}</p>
        </div>
    );
}

export default DetailPage
```

Ở đây mình không dùng từ khóa dạng `"detailPage.hello": "Hello"` mà mình dùng luôn ngôn ngữ tự nhiên làm key cho việc translate giữa các ngôn ngữ cho dễ dàng hơn. Tiếp đó bạn cần tạo 1 folder tên là `.vscode/` và một file tên là `setting.json` và đặt trong này. Nội dung của file đó sẽ như sau:
```json
{
    "i18n-ally.localesPaths": "src/locales",
}
```
Nó sẽ chứa đường dẫn đến folder chứa các file đa ngôn ngữ của chúng ta. Theo document của extension này thì nó sẽ hỗ trợ chúng ta đầy đủ nhất trong trường hợp file đa ngôn ngữ của chúng ta có dạng `.json` và `.yml`.  Sau khi đã config xong bạn mở lại màn file code của bạn và hover vào từng dòng đa ngôn ngữ sẽ hiện ra 1 cái dạng popup như sau:

![](https://images.viblo.asia/6a6cbc07-c671-4037-a747-f08bbb535f27.gif)

Trong cả 3 file đa ngôn ngữ của ta lúc này sẽ không có nội dung gì cả vì thế nên ở đoạn code trên khi hiển thị ra nó sẽ hiện thị ra luôn đúng những gì mà mình điền trong đó. Để có thể sử dụng package này đầu tiên chúng ta sẽ cần hover vào ngôn ngữ mặc định mà chúng ta chọn với mình là tiếng anh và bấm vào hình bút chì để thêm từ này vào file `en.json`, lưu ý ở đây mình dùng luôn từ `Hello` làm từ khóa để translate nên mình sẽ gõ luôn từ đó vào khung khi ta chọn edit:

![](https://images.viblo.asia/7c8c9a86-80fb-4ca5-870f-d2a9e3882c55.gif)

Sau khi bạn điền xong và bấm enter thì lập tức từ khóa đó sẽ được thêm vào file translate của bạn với nội dung tương tự. Nếu chỉ dừng lại đến đây thì extension này không thực sự hữu ích lắm tuy nhiên bây giờ mới là phần hay. Sau khi đã thêm được từ khóa vào file `en.json` thì lúc này bạn sẽ thấy phần text `Hello` mà bạn đang dùng thay đổi kể cả màu sắc hay cả khi bạn hover vào nó

![](https://images.viblo.asia/85cb0249-3e66-4865-b5f3-7d6fee6dd768.gif)

Vì trong file `en.json` đã xuất hiện key để mapping cho việc translate lúc này khi bạn hover vào nó sẽ hiển thị ra nội dung translate tương ứng. Bây giờ với 2 ngôn ngữ còn lại chúng ta sẽ làm như bấm lần lượt vào icon trái đất khi hover vào từ  `Hello` và sẽ thu được kết quả như sau:

![](https://images.viblo.asia/87c9e718-68b0-4edc-9145-ad4031e86454.gif)

Như bạn có thể thấy sau khi bấm vào đó và đợi 1-2 s thì lập tức từ của chúng ta đã được dịch sang 2 ngôn ngữ còn lại là tiếng Việt và tiếng Nhật. Đồng thời lúc này nội dung 2 file `vi.json` và `ja.json` của bạn cũng được lần lượt thay đổi theo:

```json
// vi.json
{
  "Hello": "xin chào"
}

// ja.json
{
  "Hello": "こんにちは"
}
```

Vậy là chỉ với một lần tạo nội dung gốc cho ngôn ngữ tiếng anh và vài cú click chuột ta đã có thể chuyển nó sang các ngôn ngữ khác thay cho việc copy đi lại nhiều lần. Ta hãy tiếp tục làm điều tương tự với 2 dòng text còn lại và kết quả sẽ như  sau:

![](https://images.viblo.asia/25c1a62d-3f4e-41d2-b051-aadb1c03e698.gif)

![](https://images.viblo.asia/df8ec14a-5fcd-473a-83f6-dd01f775967e.gif)

Còn đầy là nội dung các file của chúng ta sau khi kết thúc quả trình nói trên:

```json
// en.json
{
  "Hello": "Hello",
  "Please enter email": "Please enter email",
  "Invalid email format": "Invalid email format"
}

// vi.json
{
  "Hello": "xin chào",
  "Please enter email": "Vui lòng nhập email",
  "Invalid email format": "Định dạng email không hợp lệ"
}

// ja.json
{
  "Hello": "こんにちは",
  "Please enter email": "メールアドレスを入力してください",
  "Invalid email format": "無効なメール形式"
}
```

Ngoài ra nếu bạn chỉ thêm mỗi phần nội dung cho file `en.json` mà quên thêm cho 2 hay nhiều file còn lại thì extension này cũng hỗ trợ chúng ta tracking xem bao nhiêu phần trăm nội dung đã được translate và từ nào chưa được transate. Giả sử ở đây trong file `en.json` mình thêm một từ `Done` và không thêm cho 2 file còn lại thì kết quả ở phần tracking sẽ như sau:

![](https://images.viblo.asia/1a8bd4ed-c4f9-4bdc-8143-0a266bee831d.png)


## 3. Kết bài
<hr>

Vừa rồi là những extension mà mình hay sử dụng với `VSCode` và nó có thể dùng được chung cho hầu như toàn bộ các nền tảng hoặc ngôn ngữ mà bạn sử dụng, rất mong nó sẽ cho các bạn khi sử dụng `VSCode`. Cuối cùng cám ơn các bạn đã đọc bài và đừng quên để lại 1 upvote nhé :D.
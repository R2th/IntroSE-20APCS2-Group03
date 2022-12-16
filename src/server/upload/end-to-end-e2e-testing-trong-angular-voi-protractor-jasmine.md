> End to end (e2e) testing là một phương pháp kiểm thử phần mềm được sử dụng để kiểm tra xem luồng ứng dụng có hoạt động như mong đợi từ đầu đến cuối hay không.

Mặc định Angular CLI đã xây dựng sẵn cho chúng ta một bộ khung e2e hoàn chỉnh với Protractor và Jasmine.

Một ví dụ minh hoạ về e2e testing trong Angular 7:

![](https://images.viblo.asia/3162826e-dd78-4358-90fb-f8992240f6cf.gif)

Trong Angular chúng ta chỉ cần chạy câu lệnh ***ng new*** là các files e2e sẽ được tạo ra cũng ứng dụng.

![](https://images.viblo.asia/e8f2aaff-1144-458d-ad4a-0de76cce4fd2.png)

Tất cả mọi thứ liên quan đến e2e testing đều được đặt trong folder **/e2e**. Chúng ta cũng có thể thực hiện viết test luôn mà không cần thay đổi bất kỳ cài đặt mặc định nào trong **protractor.conf.js** và **tsconfig.e2e.json**. Ngoài 2 files config trên thì chúng ta cũng có thêm 1 subfolder nữa là **/src**. Trong folder này mặc định sẽ có 2 files:
1. **app.e2e-spec.ts** — là một file spec chuyên thực thi kịch bản các bước trong ứng dụng của chúng ta. File này được viết bằng cú pháp Jasmine (https://jasmine.github.io/pages/docs_home.html)
2. **app.po.ts** — là một file Page Object chuyên tương tác với các elements có trong page hiện tại (Ví dụ như điền nội dung vào một ô textbox hay click vào một nút nào đó). Các đoạn code tương tác này đều phải được viết trong các phương thức (methods), sau đó bên file spec sẽ gọi tới các phương thức này để thực thi kịch bản.

Mặc định Angular đã cho chúng ta sẵn một vài đoạn code để chúng ta dễ hình dung hơn về e2e:

```typescript:e2e/src/app.po.ts
import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
```

```typescript:e2e/src/app.e2e-spec.ts
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to My App!');
  });
});
```

Sau khi đã hoàn thành xong 2 files là **app.e2e-spec.ts** và **app.po.ts**, chúng ta sẽ cần phải chạy câu lệnh:

```
ng e2e
```

Câu lệnh này sẽ:
1. Thực thi các spec được viết trong **app.e2e-spec.ts** lên trình duyệt (mặc định sẽ là Chrome, đồng thời khi chạy trình duyệt sẽ có thông báo là *"Chrome is being controlled by automated test software"*)
2. Đưa ra màn hình console các kết quả khi thực thi các spec ở trên. Ví dụ:

![](https://images.viblo.asia/dab355ae-3370-4853-a910-242fa717dc9b.png)

## Chạy e2e testing với chế độ headless
Khi chạy ở chế độ headless, trình duyệt sẽ không tự động mở ra như khi chạy bình thường. Điều này sẽ phù hợp nếu chúng ta chạy nó cho mục đích ***Continues Integration*** (CI). Để làm được vậy chúng ta cần phải cập nhật lại file **protractor.conf.js** như sau:

```javascript
capabilities: {
   'browserName': 'chrome',
   chromeOptions: {
   binary: process.env.CHROME_BIN,
   args: ['--headless', '--no-sandbox']
   }
},
```

Và cuối cùng, thay vì chạy **ng e2e** thì chúng ta sẽ chạy câu lệnh:

```
ng e2e --capabilities.chromeOptions.args="--headless"
```

## Một vài selectors hay dùng trong protractor

```javascript
element(by.id('firstName'));

element(by.css('.signout'));

element(by.model('address.city'));

element(by.binding('address.city'));

element(by.input('firstName'));

element(by.input('firstName')).clear();

element(by.buttonText('Close'));

element(by.partialButtonText('Save'));

element(by.linkText('Save'));

element(by.partialLinkText('Save'));

element(by.css('img[src*='assets/img/profile.png']'));

element(by.css('.pet .cat'));

element(by.cssContainingText('.pet', 'Dog'));

allColors = element.all(by.options('c c in colors'));
```

## Thao tác với Input

```javascript
element(by.id('firstName').sendKeys("John");

sendKeys(Key.ENTER);

sendKeys(Key.TAB);

sendKeys(Key.BACK_SPACE);

element(by.id('user_name')).clear();
```

## Truy cập vào các phần tử trong list

```javascript
var list = element.all(by.css('.items));

var list2 = element.all(by.repeater('personhome.results'));

expect(list.count()).toBe(3);

expect(list.get(0).getText()).toBe('First’)

expect(list.get(1).getText()).toBe('Second’)

expect(list.first().getText()).toBe('First’)

expect(list.last().getText()).toBe('Last’)
```

-----
**Tài liệu tham khảo:** [Automate End to end (e2e) testing for Angular 7 using Protractor & Jasmine](https://medium.com/@dhormale/automate-end-to-end-e2e-testing-for-angular-7-using-protractor-jasmine-4ce171aaeedc)
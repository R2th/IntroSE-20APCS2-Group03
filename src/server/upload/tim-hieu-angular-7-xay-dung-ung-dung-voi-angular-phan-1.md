## Expanding our Application
Trong các bài trước chúng ta đã tạo thử một sample project, để làm quen với các thành phần trong Angular 7. Trong bài viết này chúng ta sẽ cùng nhau xây dựng một clone đơn giản của ứng dụng Reddit. Trước khi bắt tay vào code, chúng ta cùng nhau xem qua các thành phần logic cơ bản mà ứng dụng này cần có. 
![](https://images.viblo.asia/fba83a14-2b61-4f22-9e22-783d0e3ef9c0.png)
Chúng ta sẽ tạo ra hai thành phần trong ứng dụng này:<br>
1. Thành phần tổng thể, chứa form để gửi bài viết mới. (được đánh dấu bằng khung đỏ)
2. Bài viết (được đánh dấu bằng khung xanh)

> Trong một ứng dụng lớn hơn, **form** gửi bài viết có thể trở thành component của chính bản thân nó. Tuy nhiên, việc có một form là component của chính nó, sẽ làm cho việc truyền data trở nên phức tạp hơn, vì vậy ở bài viết này chúng ta sẽ đơn giản hóa nó bằng cách làm thành 2 components. Hiện tại, với 2 components ứng dụng của chúng ta sẽ chạy tốt, tuy nhiên ở các bài viết sau chúng ta cũng sẽ tìm hiểu về các cấu trúc data phức tạp hơn nữa.

Điều đầu tiên, chúng ta hãy tạo ra một ứng dụng mới bằng cách chạy câu lệnh **ng new** - và chúng ta sẽ tạo ra một ứng dụng được gọi là `angular-reddit-app`. <br>
→　`ng new angular-reddit-app `
<br> 

### Adding CSS
Đầu tiên bạn hãy download các file dưới đây và paste vào project của bạn. <br>

*  src/index.html
*  src/styles.css
*  src/app/vendor
*  src/assets/images

([download](https://drive.google.com/open?id=18E6zcvAhzoBzUbf7h3DxXYAkEbAr_8cK))

Trong project này, tôi sẽ sử dụng [Semantic UI](https://semantic-ui.com/) để giúp styling. Semantic UI là một CSS framework tương tự như [Zurb Foundation](https://foundation.zurb.com/) hay [Twitter Bootstrap](https://getbootstrap.com/). Bạn có thể click vào link download ở trên để tải về.

### The Application Component
Chúng ta sẽ build một compnent mới, cái đó sẽ: <br>
1. Lưu trữ danh sách bài viết hiện tại.
2. Chứa một form để submit bài viết mới.

Chúng ta có thể nhìn thấy main application component ở file `src/app/app.component.ts`<br>
**angular-reddit-app/src/app/app.component.ts**<br>
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-reddit-app';
}
```
> Lưu ý rằng property `title` được tạo tự động ở `AppComponent`. Bởi vì chúng ta không dùng `title` này nên chúng ta cần xóa dòng này đi. Ở bên dưới chúng ta sẽ submit một links mới có gắn với "title" , do đó nếu không xóa thì nó có thể gây nhầm lẫn với title của  `AppComponent`- cái mà được generate tự động bởi Angular CLI. Hãy chú ý rằng, "title" dưới đây là title của link bài viết.
> 
Hãy thay đổi template một chút, để tạo một form cho việc add link mới. Chúng ta sẽ sử dụng một chút styling từ `semantic-ui` package để làm form trông đẹp hơn. <br>
**angular-reddit-app/src/app/app.component.html**
```
<form class="ui large form segment">
  <h3 ui header>Add a link</h3>

  <div class="field">
    <label for="title">Title:</label>
    <input name="title" id="title">
  </div>
  <div class="field">
    <label for="link">Link:</label>
    <input name="link" id="link">
  </div>
</form>
```
Như vậy, chúng ta vừa tạo ra một `template` định nghĩa 2 `input` tags: Một cái là cho `title` của bài viết, cái còn lại là `link` URL. Khi reload lại trình duyệt, bạn sẽ nhìn thấy form đã được generate ra.
![](https://images.viblo.asia/85b96223-a9c7-4141-a585-fdb1357aaa8f.png)
### Adding Interaction
Bây giờ chúng ta đã có form và một số input tags tuy nhiên, chúng ta không có cách nào để submit data. Do đó, để có thể tương tác, chúng ta sẽ add thêm button submit cho form. <br>
Khi form được submit, chúng ta sẽ gọi function để create và add link. Chúng ta có thể làm điều này bằng cách add thêm một interaction event cho phần tử `<button />` <br>
Chúng ta sẽ nói với Angular là chúng ta  phản hồi một event bằng cách bao quanh tên event trong dấu ngoặc đơn (). <br>
Chẳng hạn để thêm một function gọi event `<button /> onClick`,chúng ta có thể viết như thế này: <br>
```
 <button (click)="addArticle(newtitle, newlink)" class="ui positive right floated button">
 Submit link
 </button>
```
Bây giờ, khi button được click thì hệ thống sẽ gọi fuction `addArticle()`, do đó chúng ta cần define function trong `AppComponent` class.
**src/app/app.component.ts**
```
export class AppComponent {
  addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean {
    console.log(`Adding article title: ${title.value} and link: ${link.value}`);
    return false;
  }
}
```

Do chúng ta đã add function `addArticle()`cho `AppComponent` và đã add `(click) ` event cho ` <button />` element, cho nên hàm này sẽ được gọi khi button được click.<br>
Chú ý rằng, function `addArticle()` chỉ chấp nhận đối số là `title` và `link`. Chúng ta cần thay đổi template button một chút, để chuyền những giá trị này và gọi tới function `addArticle()`. <br>
Để thực hiện điều này, chúng ta cũng sẽ add một syntax đặc biệt vào thẻ `input ` trong form. Template của chúng ta sẽ có dạng như thế này: <br>

**src/app/app.component.html** 
```
<form class="ui large form segment">
  <h3 class="ui header">Add a Link</h3>

  <div class="field">
    <label for="title">Title: </label>
    <input name="title" id="title" #newtitle> <!-- changed -->
  </div>
  <div class="field">
    <label for="link">Link: </label>
    <input name="link" id="link" #newlink> <!-- changed -->
  </div>

  <!-- added this button -->
  <button (click)="addArticle(newtitle, newlink)" class="ui positive right floated button">
    Submit link
  </button>

</form>
```


Chú ý là ở trong thẻ `input`, chúng ta đã sử dụng # (hash) để yêu cầu Angular gán những tags này cho `local variable`. Bằng cách add `#newtitle` và `#newlink` tới phần tử `<input /> `, thì chúng ta có thể truyền chúng dưới dạng một biến (variable) vào hàm `addArticle() `. <br>
Chúng ta sẽ tóm tắt lại 4 thay đổi mà chúng ta đã làm: 
1. Tạo một `button`tag,  để user có thể click gửi title và link bài viết.
2. Chúng ta đã tạo hàm có tên `addArticle` để xác định điều chúng ta muốn thực hiện click button được click.
3. Chúng ta đã add attribute  `(click) ` để nói rằng "Khi click vào button thì sẽ gọi tới hàm `addArticle`".
4. Chúng ta cũng đã thêm 2 attribute  `#newtitle` và `#newlink` vào thẻ `<input>`

Sau đây, chúng ta sẽ đi giải thích cặn cẽ từng thay đổi một.
#### Binding `input`s to values
Chú ý là trong thẻ input đầu tiên, chúng ta đã thiết lập kiểu như sau: <br>
`<input name="title" #newtitle>` <br>
Cú pháp này sẽ yêu cầu Angular binding` <input> `tới biến `newtitle`. Cú pháp `#newtitle` này được gọi là một `resolve`. Qua đó chúng ta có thể truy cập tới biến `newtitle` trong biểu thức ở view. <br>
`newtitle` hiện giờ trở thành một **object** đại diện cho `input` DOM element. Điều đó có nghĩa là chúng ta có thể lấy value của thẻ `input` bằng cách sử dụng cú pháp `newtitle.value`. <br>
Tương tự, chúng ta cũng đã add `#newlink` vào thẻ `input` của link, và có thể lấy value của nó bằng cách trên.

#### Binding actions to events
Trên thẻ `button` chúng ta đã add thuộc tính  `(click)` để define điều gì sẽ xảy ra khi button được click. Khi sự kiện   `(click)` xảy ra, chúng ta sẽ gọi tới function `addArticle` cùng với 2 đối số là: `newtitle` và `newlink`. Vậy function với 2 đối số này đến từ đâu?  <br>
1. `addArticle` là một function chúng ta đã viết ở component định nghĩa class `AppComponent`
2. `newtitle` đến từ resolve (`#newtitle`) trên thẻ `<input>` có tên là `title`
3. Tương tự, `newlink` đến từ resolve (`#newlink`) trên thẻ `<input>` có tên là `link`.

Việc binding action cho event đang được viết như thế này: <br>
```
  <button (click)="addArticle(newtitle, newlink)" class="ui positive right floated button">
    Submit link
  </button>
```
> Việc khai báo class="ui positive right floated button" là sử dụng từ thư viện Semantic UI. Nó giúp cho button của chúng ta trở nên đẹp hơn. 
> 
#### Defining the Action Logic
Ở trên class `AppComponent` chúng ta đã define một function mới là `addArticle`. Hàm đó có 2 đối số `title` và `link`. Cần chú ý rằng cả  `title` và `link` đều là **object** của `HTMLInputElement` và không thể lấy giá trị một cách trực tiếp. <br>
Để lấy value của `input` thì chúng ta cần gọi `title.value`. Bây giờ, chúng ta sẽ `console.log` ra những đối số đó. <br>
**src/app/app.component.ts**

```
  addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean {
    console.log(`Adding article title: ${title.value} and link: ${link.value}`);
    return false;
  }
```

> Ở đây chúng ta tiếp tục sử dụng dấu backtick trong string một lần nữa. Đây là một tính năng rất hữu ích của ES6. Dấu backtick sẽ cho phép chúng ta chèn thêm vào string các biến . Cụ thể là chúng ta viết là `${title.value}` , cho nên nó sẽ được thay thế bằng giá trị của `title.value`.
> 
#### Try it out!
Bây giờ, khi bạn bấm vào button submit, bạn có thể nhìn thấy message được in ra trong console.
![](https://images.viblo.asia/edbce09b-8c00-4395-add0-66effd04c8d7.png)

### Adding the Article Component
Hiện tại, chúng ta đã có một form để submit bài viết mới, những chúng ta vẫn chưa hiển thị được những bài viết này ra bất kỳ đâu. <br>
Bời vị, mỗi khi bài viết được submit, thì nó được hiển thị dưới dạng list ở trong page, cho nên chúng ta sẽ tạo ra một component mới để thể hiện những bài viết này.  <br>
![](https://images.viblo.asia/5b82c027-a22c-4c0c-8a8b-1465fd80aa50.png)
<br> Chúng ta vẫn sử dụng lệnh `ng` để tạo component mới. <br>
`ng generate component article` <br>
Chúng ta có 3 phần để define component mới này:
1. Define `ArticleComponent` view trong template.
2. Define `ArticleComponent` properties bằng cách bổ sung `@Component` trong class
3. Define component-definition class chứa các logic mà chúng ta sẽ viết.

Chúng ta sẽ cùng nhau tìm hiểu chi tiết từng phần một nhé.

#### Creating the `ArticleComponent` template
Chúng ta sẽ định nghĩa template trong file` article.component.html`<br>
**src/app/article/article.component.html**<br>
```
<div class="four wide column center aligned votes">
  <div class="ui statistic">
    <div class="value">
      {{ votes }}
    </div>
    <div class="label">
      Points
    </div>
  </div>
</div>

<div class="twelve wide column">
  <a class="ui large header" href="{{ link }}">
    {{ title }}
  </a>
  <ul class="ui big horizontal list voters">
    <li class="item">
      <a href (click)="voteUp()">
        <i class="arrow up icon"></i>
        upvote
      </a>
    </li>
    <li class="item">
      <a href (click)="voteDown()">
        <i class="arrow down icon"></i>
        downvote
      </a>
    </li>
  </ul>
</div>
```

Component này có khá nhiều mục, nên chúng ta sẽ, sẽ xem sét từng mục một nhé.
![](https://images.viblo.asia/5b82c027-a22c-4c0c-8a8b-1465fd80aa50.png)

Ở đây, chúng ta có 2 cột: <br>
1. Số lượng vote hiển thị bên trái.
2. Và, thông tin bài viết hiển thị ở bên phải.

Chúng ta đang define những cột này với CSS class tương ứng đó là: `four wide column` và `twelve wide column` (hãy nhớ rằng, những Class này là của thư viện CSS SemanticUI) <br>
Chúng ta đã hiển thị giá trị của property `votes` và `title`  của `ArticleComponent` class trong chuỗi string bằng cú pháp `{{ votes }}` and `{{ title }}`.  Và, chúng ta cũng có thể chuyền giá trị string vào các thuộc tính của thẻ html, ví dụ như trong attribute `href` của thẻ `a`, có thể được viết như sau: `href="{{ link }}"`. Khi đó, giá trị của `href` sẽ được tự động điền bởi giá trị của `link` trong component class.  <br>
Ở trên link upvote/downvote chúng ta có một action. Đó là, chúng ta dùng `(click) ` để thực hiện `voteUp()/voteDown()` đối với button tương ứng. Khi button upvote được click, thì function  `voteUp()` cũng sẽ được gọi từ `ArticleComponent` class. (Tương tự, downvote được click thì function `voteDown() `sẽ được gọi.) <br>
#### Creating the `ArticleComponent`
**angular-reddit-app/src/app/article/article.component.ts**
```
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
```
Đầu tiên, chúng ta define một component cùng với `@Component`. Cái `selector` này sẽ nói rằng, component này sẽ được hiển thị trên page bằng cách sử dụng thẻ  `<app-article>`. <br>
Cách sử dụng cơ bản nhất, để sử dụng component này nó là đặt thẻ này vào trang.<br>
`<app-article> </app-article>` <br>
Các thẻ này  sẽ hiển thị trong view của chúng ta khi page được render.
#### Creating the `ArticleComponent` Definition Class
Cuối cùng chúng ta sẽ tạo `ArticleComponent` definition class. <br>
**angular-reddit-app/src/app/article/article.component.ts**
```
export class ArticleComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'row';
  votes: number;
  title: string;
  link: string;


  constructor() {
    this.title = 'Angular';
    this.link = 'http://angular.io';
    this.votes = 10;
  }

  voteUp() {
    this.votes += 1;
  }
  voteDown() {
    this.votes -= 1;
  }

  ngOnInit() {
  }

}
```

Ở đây, chúng ta đã tạo ra 4 properties trong `ArticleComponent`:
1. `cssClass` - Đây là CSS class muốn apply cho “host” của component này.
2. `votes` -  Thể hiện số lượng vote.
3. `title` - Đây là một `string` lưu title của bài viết.
4. `link` - Đây là một `string` lưu URL của bài viết.

Chúng ta muốn rằng mỗi app-article (bài viết) sẽ nằm trên một row riêng. Chúng ta sẽ sử dụng Semantic UI, và Semantic cũng cung cấp một [CSS class cho rows](https://semantic-ui.com/collections/grid.html) được gọi là `row`. <br>
Trong Angular, một component `host` là một component element được thêm vào. Chúng ta có thể set properties cho host element này bằng cách sử dụng `@HostBinding()` decorator. Trong trường hợp này, chúng ta đã yêu cầu Angular, giữ value của host elements class được động bộ hóa với property `cssClass`. <br>
> Chúng ta import `HostBinding` từ package `@angular/core`. Chẳng hạn, chúng ta có thể thêm `HostBinding` như thế này:  <br>
> `import { Component, HostBinding } from '@angular/core';`
> 
> 
Bằng cách sử dụng  `@HostBinding() `**host element** (the app-article tag) chúng ta muốn set `class` attribute để có "row"

> Sử dụng @HostBinding() khá là ổn bởi vì có thể đóng gói `app-article` trong component của chúng ta. Nghĩa là, chúng ta không phải vừa dùng app-article tag vừa yêu cầu `class="row"` trong parent view. Với việc sử dụng `@HostBinding` decorator, chúng ta có thể configure host element từ bên trong component.
> 
Trong `constructor() `chúng ta sẽ add một số attribute mặc định như sau: <br>
**angular-reddit-app/src/app/article/article.component.ts**
```
  constructor() {
    this.title = 'Angular';
    this.link = 'http://angular.io';
    this.votes = 10;
  }
```
Chúng ta cũng đã define ra 2 function cho voting, đó là `voteUp` và `voteDown`. <br>
**angular-reddit-app/src/app/article/article.component.ts**
```
  voteUp() {
    this.votes += 1;
  }
  voteDown() {
    this.votes -= 1;
  }
```
Trong voteUp, chúng ta tăng giá trị của this.votes lên 1. Ngược lại, trong voteDown chúng ta giảm giá trị của this.votes xuống 1.
#### Using the `app-article` Component
Để sử dụng componet này và hiển thị data, chúng ta cần add thẻ  `<app-article></app-article> ` trong template view.  <br>
Trong trường hợp này, chúng ta muốn `AppComponent` render ra component mới này. Nên, chúng ta cần update lại code trong component đó. Thực hiện thêm thẻ  `<app-article> ` vào template của `AppComponent` ở đằng sau thẻ đóng `</form>` <br>
Nếu bạn đã generte `ArticleComponent` bằng cách sử dụng Angular CLI (Thông quá `ng generate component`), thì theo mặc định, bạn đã "nói" cho Angular biết về thẻ `app-article` của bạn. Tuy nhiên, nếu bạn tạo component này bằng "tay", thì có thể khi reload lại trình duyệt, thẻ `<app-article>` của bạn không được compile. <br>
Nếu bạn gặp vấn đề này, điều đầu tiên cần làm là mở browser’s developer console. Và thấy rằng, thẻ `app-article` đã có ở trong page nhưng khong được compile.  Tại sao lại như vậy ? <br>
Điều này xảy ra vì , `AppComponent` component không biết về `ArticleComponent` component. <br>
> **Angular 1 Note**: Nếu bạn đã sử dụng Angular 1, có thể đáng ngạc nhiên là app của chúng ta không biết về component mới `app-article`.Điều này là do trong Angular 1, directives là global. Tuy nhiên, Trong Angular phiên bản này, bạn cần chỉ rõ components mà bạn muốn sử dụng. <br>
> Một mặt, điều này có thể khiến chúng ta config nhiều hơn một chút. Tuy nhiên, một mặt nó cũng rất tốt cho tính mở rộng của app, bởi vì chúng ta không phải share directive selectors trong global namespace.
> 

Để thông báo cho AppComponent về component mới của chúng ta (ArticleComponent) chúng ta cần **thêm ArticleComponent vào list declarations trong NgModule**. <br>
> Chúng ta thêm `ArticleComponent` vào `declarations` bởi vì `ArticleComponent` là một phần của module này. Tuy nhiên, nếu `ArticleComponent` của module khác, thì chúng ta có thể import bằng lệnh `imports`. <br>
> Chúng ta sẽ thảo luận nhiều hơn về `NgModules` trong phần sau, tuy nhiên ở thời điểm hiện tại, khi bạn tạo component mới thì cần khai báo vào `declarations` trong `NgModules`.
> 
**angular-reddit-app/src/app/app.module.ts**
```
@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent // <-- added this
  ],
```

Ở đây, chúng ta đã thực hiện:
1. Import `ArticleComponent`.
3. Và, add `ArticleComponent` vào list `declarations`.

Khi đã hoàn thành việc khai báo bên trên, thì nếu reload lại trình duyệt, bài viết của chúng ta sẽ được render như sau: <br>
![](https://images.viblo.asia/365a145c-f56e-4dd7-b835-5c7a4d23a60f.png)

Tuy nhiên, khi click vào `upvote` hoặc `downvote` thay vì update lại bài viết, thì trình duyệt lại bị reload lại. <br>
Vì mặc định trong Javascript, nó sẽ truyền `click` event tới tất cả các parent components. Và do, `click` event được truyền tới parent, cho nên trình duyệt của chúng ta đang cố follow theo empty link, cái này khiến trình duyệt reload lại. <br>
Để khắc phụ điều đó, chúng ta cần làm cho `click` event return `false`. Điều này sẽ đảm bảo cho trình duyệt không reload lại. Chúng ta sẽ update lại code của function `voteUp()` and `voteDown() ` để return `false` (Để yêu cầu trình duyệt không truyền event lên trên)

```
 voteUp() {
    this.votes += 1;
    return false;
  }
  voteDown() {
    this.votes -= 1;
    return false;
  }
```

Bây giờ, khi click vào `upvote` hoặc `downvote`  thì trình duyệt của chúng ta đã không bị reload lại nữa.






<br><br><br>			
*Hết. Chúng ta sẽ cùng nhau hoàn thành ứng dụng này trong bài viết lần tới nhé.*			
			
*Nguồn:  https://www.ng-book.com/2/*
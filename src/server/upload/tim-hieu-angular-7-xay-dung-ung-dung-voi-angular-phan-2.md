## Rendering Multiple Rows
Ở bài viết lần trước chúng ta đã thực hiện add một bài viết trên trang, có thể thực hiện upVote, downVote. Tuy nhiên vẫn chưa có cách nào thêm được bài viết mới, trừ khi chúng ta thực hiện paste thêm thẻ `<app-article>`. Tuy nhiên nếu làm thế thì tất cả các bài viết sẽ có cùng một nội dung và điều đó thực sự không thú vị. Trong bài viết này, chúng ta sẽ tiếp tục hoàn thành các chức năng khác của ứng dụng Reddit này nhé.

### Creating an Article class
Một thói quen tốt khi viết code Angular đó là luôn cố gắng phân tách/ cô lập cấu trúc data chúng ta dùng từ component code. Để làm điều này, chúng ta sẽ tạo một cấu trúc data đại diện cho một `single article`. Chúng ta sẽ add một file mới là `article.model.ts` để define `Article` class.

**angular-reddit-app/src/app/article/article.model.ts**
```
export class Article {
    title: string;
    link: string;
    votes: number;

    constructor(title: string, link: string, votes?: number) {
        this.title = title;
        this.link = link;
        this.votes = votes || 0;
    }
}
```

Ở đây, chúng ta đã tạo ra một class mới thể hiện một `Article`.  Chú ý đây là một class bình thường, chứ không phải là Angular component. Trong Model-View-Controller pattern thì class này là **Model**. <br>
Mỗi một `article` có một `tile` , một link và một giá trị total hiển thị tổng số `votes`. Khi tạo một article mới chúng ta cần `title` và `link`. Và `votes` parameter là optional (cho nên ở cuối tên biến, chúng ta thêm dấu hỏi ? ) và giá trị mặc định sẽ bằng 0. <br>
Bây giờ chúng ta sẽ update lại code trong `ArticleComponent` để có thể sử dụng `Article` class mới vừa tạo. Thay vì lưu trữ trực tiếp properties vào `ArticleComponent` chúng ta sẽ lưu trữ vào instance của `Article` class. <br>
Đầu tiên hãy import  `Article` class.<br>

**angular-reddit-app/src/app/article/article.component.ts**<br>
`import { Article } from "./article.model";`

Sử dụng insance của `Article` class 
**angular-reddit-app/src/app/article/article.component.ts**<br>
```
export class ArticleComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'row';
  article: Article;

  constructor() {
    this.article = new Article('Angular', 'http://angular.io', 10);

  }

  voteUp() {
    this.article.votes += 1;
    return false;
  }
  voteDown() {
    this.article.votes -= 1;
    return false;
  }

  ngOnInit() {
  }

}
```

Hãy lưu ý một số điều chúng ta đã thay đổi: thay vì lưu `title`, `link`, và `votes` trực tiếp vào component, chúng ta lưu trữ một tham chiếu tới `article`.<br>
Tương tự, chúng ta sẽ không tăng `votes` trực tiếp trên component nữa, mà tăng giá trị của `votes` thông qua `article`. <br>
Bên cạnh đó, chúng ta cũng cần update lại code ở view để có thể lấy giá trị từ `article`, ví dụ trước đây chúng ta viết là {{ votes }} thì bây giờ sẽ sửa lại thành ` {{ article.votes }}`, và thực hiện tương tự đối với `title` và `link`. <br>

**angular-reddit-app/src/app/article/article.component.html**<br>
```
<div class="four wide column center aligned votes">
  <div class="ui statistic">
    <div class="value">
      {{ article.votes }}
    </div>
    <div class="label">
      Points
    </div>
  </div>
</div>

<div class="twelve wide column">
  <a class="ui large header" href="{{ article.link }}">
    {{ article.title }}
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

Thực hiện reload lại browser và mọi thứ vẫn hoạt động bình thường. <br>
Thoạt nhìn có vẻ code đã ổn hơn, tuy nhiên vẫn có điểm chưa hoàn thiện, đó làm method `voteUp` và `voteDown` đang phá vỡ tính đóng gói của `Article` bằng cách thay đổi trực tiếp các properties bên trong của article. <br>

> `voteUp` và `voteDown` đã vi phạm nguyên tắc [Law of Demeter](https://en.wikipedia.org/wiki/Law_of_Demeter). Nguyên tắc đó nói rằng một object nên hạn chế tối đa truy cập trực tiếp các properties của object khác.
> 
Vấn đề ở đây là ArticleComponent biết quá nhiều về Article class. Để fix cái đó, thì chúng ta sẽ add 2 method là voteUp và voteDown vào bên trong Article class. ( Chúng ta cũng sẽ thêm vào một domain function, và tôi sẽ giải thích ngắn gọn về hàm này)
<br>
**angular-reddit-app/src/app/article/article.model.ts**
```
export class Article {
    title: string;
    link: string;
    votes: number;

    constructor(title: string, link: string, votes?: number) {
        this.title = title;
        this.link = link;
        this.votes = votes || 0;
    }
    voteUp(): void {
        this.votes += 1;
    }
    voteDown(): void {
        this.votes -= 1;
    }
    // domain() is a utility function that extracts
    // the domain from a URL, which we'll explain shortly 
    domain(): string {
        try {
            // e.g. http://foo.com/path/to/bar
            const domainAndPath: string = this.link.split('//')[1]; // e.g. foo.com/path/to/bar
            return domainAndPath.split('/')[0];
        } catch (err) {
            return null;
        }
    }
}
```

Bên cạnh đó, chúng ta cũng cần edit lại `ArticleComponent` để có thể gọi được những hàm này: <br>

**angular-reddit-app/src/app/article/article.component.ts**<br>
```
export class ArticleComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'row';
  article: Article;

  constructor() {
    this.article = new Article('Angular', 'http://angular.io', 10);

  }

  voteUp(): boolean {
    this.article.voteUp();
    return false;
  }
  voteDown(): boolean {
    this.article.voteDown();
    return false;
  }


  ngOnInit() {
  }

}
```


> **Tại sao chúng ta lại cần function voteUp ở trong cả model và component ?**<br>
> Lý do chúng ta cần có `voteUp()`  và `voteDown()` ở trong cả 2 class đó là mỗi function sẽ thực hiện một công việc hơi khác nhau. Ý tưởng là `voteUp()` trên `ArticleComponent` sẽ liên quan tới **component view**. Trong khi đó `Article` model `voteUp() `sẽ định nghĩa hành vi xảy ra **trong model**.<br>
> Đó là, nó cho phép `Article` class đóng gói những chức năng sẽ xảy ra trong **model** khi thực hiện vote. Trong ứng dụng thực tế, nội dung bên trong `Artical` modal có thể sẽ phức tạp hơn. Ví dụ, phải làm API request tới webserver, và bạn không cần phải có code model cụ thể trong component controller.<br>
> Tương tự, ở `ArticleComponent` chúng ta cũng `return false`. Đó là cách để không truyền lại event, do đây là đoạn logic dành riêng cho view cho nên chúng ta không nên cho phép function `voteUp()` của `Article` model biết về loại API dành riêng cho view. Article model nên cho phép vote một cách độc lập với view.
> 

Sau khi reload lại browser chúng ta nhận thấy ứng dụng vẫn hoạt động giống như trước, nhưng code của chúng ta đã rõ ràng và đơn giản hơn nhiều rồi.  <br>

> Kiểm tra lại `ArticleComponent` chúng ta thấy rằng nó đã trở nên rất ngắn gọn rồi, do là chúng ta đã di chuyển phần lớn logic của component sang model mục đích để component của chúng ta thực hiện lượng công việc tối thiểu có thể. Tham khảo thêm về MVC [Fat Models, Skinny Controllers](http://weblog.jamisbuck.org/2006/10/18/skinny-controller-fat-model).
> 

### Storing Multiple Articles
Giờ chúng ta sẽ viết code để có một list chưa nhiều Article. Đầu tiên, sẽ chỉnh sửa lại `AppComponent`.<br>
**src/app/app.component.ts**
```
import { Component, OnInit, HostBinding } from '@angular/core';
import { Article } from "./article.model"; //<--importthis

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'row';
  article: Article[]; // <-- component property

  constructor() {
    this.article = [
      new Article('Angular', 'http://angular.io', 3),
      new Article('Fullstack', 'http://fullstack.io', 2),
      new Article('Angular Homepage', 'http://angular.io', 1)
    ];
  }
```

Chú ý rằng trong `AppComponent` có dòng này: <br>
`articles: Article[];` <br>
Mới nhìn Article[]  thì trông có vẻ hơi lạ. Dòng code này có nghĩa là chúng ta khai báo articles là một mảng các Article.
Có một cách viết khác đó là Array<Article>. Điều này cũng tương tự ở các ngôn ngữ khác như là Java, C#, ... Mảng này chỉ chứa các object Article.<br>
Để truy cập vào Article class, đầu tiên chúng ta phải import nó - cái này chúng chèn ở phía trên cùng. Chúng ta nhập data cho Array này bằng cách viết this.articles trong constructor.<br>
**src/app/app.component.ts**
```
 constructor() {
    this.articles = [
      new Article('Angular', 'http://angular.io', 3),
      new Article('Fullstack', 'http://fullstack.io', 2),
      new Article('Angular Homepage', 'http://angular.io', 1),
    ];
  }
```

### Configuring the `ArticleComponent` with `inputs`
Hiện tại chúng ta đã có một list `Article` , vậy làm sao chúng ta có thể truyền nó vào `ArticleComponent` ?<br>
    Một lần nữa chúng ta sẽ sử dụng `Inputs`. Lần trước `ArticleComponent` class của chúng ta đã được define như sau: <br>
**src/app/article/article.component.ts**
```
export class ArticleComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'row';
  article: Article;

  constructor() {
    this.article = new Article('Angular', 'http://angular.io', 10);
  }
```
Vấn đề ở đây là chúng ta đã hard code một `Article` cụ thể trong constructor. Điều này làm cho component không chỉ mất tính đóng gói mà còn không thể tái sử dụng. <br>
    Điều chúng ta muốn làm ở đây là configure `Article` chúng ta muốn hiển thị. Ví dụ, chúng ta có 2 articles là `article1` và `article2`, chúng ta có thể tái sử dụng `app-article` component bằng cách truyền vào một `Article` như là một parameter tới component, như ở dưới đây: <br>
```
    <app-article[article]="article1"></app-article> 
    <app-article[article]="article2"></app-article>
```
Angular cho phép chúng ta làm điều này bằng cách sử dụng Input decorator trong property của component: 
```
classArticleComponent{
    @Input() article: Article;
    //...
```
Nếu có một Article trong một biến myArticle, chúng ta có thể truyền nó vào ArticleComponent từ view. Hãy nhớ rằng, chúng ta có thể truyền một biến vào element bằng cách bao quanh nó một cặp dấu ngoặc vuông  [variableName] : 
```
    <app-article[article]="myArticle"></app-article>
```

Chú ý syntax ở đây: Chúng ta đã đặt tên của input trong dấu ngoặc` [article]`, và giá trị của attribute là cái mà cúng ta muốn truyền vào trong input. Sau đó, `this.article` trong `ArticleComponent` sẽ được set thành `myArticle`. Chúng ta có thể nghĩ là `myArticle` được truyền vào như một `parameter` tới component. <br>
    
Đây là `ArticleComponent` sau khi sử dụng `@Input`: <br>
**src/app/article/article.component.ts**
```
import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Article } from "./article.model";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'row';
  @Input() article: Article;

  constructor() {
    // article is populated by the Input now,
    // so we don't need anything here

  }

  voteUp(): boolean {
    this.article.voteUp();
    return false;
  }
  voteDown(): boolean {
    this.article.voteDown();
    return false;
  }

  ngOnInit() {
  }

}
```
> **Đừng quên import!**<br>
> Chú ý rằng chúng ta đã `import` `Input` class từ `@angular/core`. Chúng ta cũng đã import `Article` model khi chúng ta làm với `AppComponent` ở phần trước. 
    
### Rendering a List of Articles
    
Trước đó, chúng ta đã configure `AppComponent` để lưu một mảng các `articles`. Còn bây giờ chúng ta sẽ configure `AppComponent` để gender ra tất cả các `articles`. Để làm điều đó, thì thay vì sử dụng một thẻ `<app-article> `chúng ta sẽ sử dụng `NgFor` directive để lặp trên 1 list các articles và gender `app-article` cho mỗi item. <br>
    Chúng ta sẽ add vào trong `template` của `AppComponent @Component`, và nó nằm ngay bên dưới thẻ `<form>` đóng. <br>
```
 <!-- start adding here -->
<div class="ui grid posts">
  <app-article *ngFor="let article of articles" [article]="article">
  </app-article>
</div>
<!-- end adding here -->
```
Bạn có nhớ là chúng ta đã  gender một list các `name` sử dụng `NgFor` directive ở chapter trước không ? Syntax này cũng được áp dụng cho việc gender nhiều component một lúc. <br>
Cú pháp `*ngFor="let article of articles" `sẽ lặp trên một list các `articles` và tạo một biến local `article` cho mỗi item trong list. <br>
Để chỉ định `article input` trong component, chúng ta sử dụng biểu thức` [inputName]="inputValue"` . Trong trường hợp này, chúng ta đang nói rằng, chúng ta muốn set giá trị của biến local `article` cho `article input` bằng lệnh `ngFor`. <br>
> Chúng ta đã sử dụng biến `article` rất nhiều lần ở đoạn code trước đó, để clear hơn thay tên biến tạm trong `ngFor` thành `foobar`: <br>
> ```
> <app-article
> *ngFor="let foobar of articles" [article]="foobar">
> </app-article>
> ```
Như vậy ở đây chúng ta có 3 biến là : <br>
1.    `articles` là một array chứa các `Articles` được define trong `AppComponent`.
2.    `foobar` là một element đơn của `articles`, được define trong `ngFor`.
3.   `article` là tên của trường được define trên `Input` của `ArticleComponent`   .
    
Tóm lại là, `ngFor` sẽ tạo ra một biến `foobar` tạm thời, và truyền nó vào `app-article`.<br>
Reload lại browser, bạn sẽ thấy các articles được được gender.<br>
    ![](https://images.viblo.asia/a729a965-a35d-40f7-b2da-dd7a07b9713f.png)

### Adding New Articles
Chúng ta cần sửa lại hàm `addArticle` để có thể add được `articles` mới khi button Submit link được click. <br>
**src/app/app.component.ts**<br>
```
 addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean {
    console.log(`Adding article title: ${title.value} and link: ${link.value}`);
    this.articles.push(new Article(title.value, link.value, 0));
    title.value = '';
    link.value = '';
    return false;
  }
```
<br>
    
Đoạn code trên sẽ thực hiện công việc dưới đây: <br>
1.  Tạo một Article instance mới cùng với title và URL được submit
2.  Add nó tới Articles array
3.  Xóa value của trường input
    
> Làm thế nào để xóa value của trường `input` ? Bạn hãy nhớ lại là, `title` và `link` là các `HTMLInputElement objects`. Điều đó có nghĩa là chúng ta có thể thiết lập properties của chúng. Khi chúng ta thay đổi thuộc tính `value`, thì thẻ `input` cũng sẽ thay đổi. 
    
Sau khi add article vào trường input và lick button Submit Link, chúng ta sẽ thấy article mới được thêm vào. 
    
## Finishing Touches
### Displaying the Article Domain
Như một gợi ý tuyệt vời, nếu chúng ta có thể hiển thị hint text bên cạnh link để hiển thị domain người dùng sẽ redirect tới khi link được click. <br>
Hãy thêm method `domain` vào classi `Article`:  <br>
**src/app/article/article.model.ts**
```
    domain(): string {
        try {
            // e.g. http://foo.com/path/to/bar
            const domainAndPath: string = this.link.split('//')[1]; // e.g. foo.com/path/to/bar
            return domainAndPath.split('/')[0];
        } catch (err) {
            return null;
        }
    }
```
Hãy gọi hàm này trong template của `ArticleComponent`. <br>
```
<div class="twelve wide column">
  <a class="ui large header" href="{{ article.link }}">
    {{ article.title }}
  </a>
  <!-- right here -->
  <div class="meta">({{ article.domain() }})</div>
  <ul class="ui big horizontal list voters">
    <li class="item">
      <a href (click)="voteUp()">
        <i class="arrow up icon"></i>
        upvote
```
Tiến hành reload lại browser, tên domain của mỗi URL sẽ được hiển thị ra. (Chú ý URL phải bao gồm http://) <br>
          
### Re-sorting Based on Score
Khi click và thực hiện vote, chúng ta thấy rằng có điều gì đó không đúng ở đây: đó là các `articles` không được sắp xếp dựa trên `score`. Và điều t muốn đó là thấy item có score cao sẽ hiển thị đầu tiên, và item có score thấp hơn sẽ hiển thị bên dưới. 
Chúng ta đang lưu articles trong array ở `AppComponent` class, tuy nhiên array đó đang không được sắp xếp. Một cách đơn giản để xử lý vấn đề này, là tạo ra một method mới là `sortedArticles` trong `AppComponent`: <br>
```
  sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }
```
> **ES6 Arrow Function** <br>
> Đoạn code trên đã sử dụng function (=>) có từ ES6. Tham khảo [Arrow function ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) <br>
>  Chúng ta cũng đang sử dụng function sort() tích hợp. Tham khảo [sort() method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
          
Ở trong ngFor chúng ta sẽ lặp trên hàm `sortedArticles()`  (thay vì lặp trực tiếp trên `articles`) <br>
```
<div class="ui grid posts">
  <app-article *ngFor="let foobar of sortedArticles()" [article]="foobar">
  </app-article>
</div>
```
## Deployment
 Như vậy chúng ta đã hoàn thành xong ứng dụng, và chúng ta muốn nó chạy trên internet để cho thể chia sẻ với bạn bè. 
> **Deployment** và performance trong product là một chủ đề tiếp theo mà t sẽ giới thiệu ở các phần sau. Thời điểm hiện tại, t muốn giới thiệu một cách cơ bản, dễ dàng để deploy ứng dụng lên internet. 
          
`Deploy` app là một hành động push code của bạn lên server, nơi mà người khác có thể truy cập được. Nói chi tiết hơn, ý tưởng chúng ta sẽ làm là: <br>
          
*    `Compile` tất cả TypeScript code thành mã JavaScript (cái mà browser có thể đọc)
*   `Bundle` (đóng gói) tất cả JavaScript code trong một hoặc hai file.
*   Sau đó, `upload` JavaScript, HTML, CSS và image lên server.
          
 Về cơ bản, Angular app này là một HTML file load các JavaScript code. Và chúng ta cần upload code này lên một máy tính nào đó trên internet. <br>
Đầu tiên, hay build Angular app của chúng ta. <br>
          
### Building Our App for Production
Angular CLI tool - cái mà chúng ta đã dùng để generate app lúc đầu có thể được dụng để build app chỉ bằng một câu lệnh duy nhất.<br>
Trong project `angular-reddit`, chúng ta gõ lệnh dưới đây:<br>
`ng build --prod`
<br> Lệnh này sẽ yêu cầu `ng` tool **build** application của chúng ta cho môi trường `production`. <br>
Lệnh này sẽ chạy trong chốc lát, và sau khi chạy xong sẽ xuất hiện thư mục `dist`.<br>
```
Time: 16707ms
chunk {0} runtime.26209474bfa8dc87a77c.js (runtime) 1.41 kB [entry] [rendered]
chunk {1} es2015-polyfills.b0657154bc33c6ff11ae.js (es2015-polyfills) 56.6 kB [initial] [rendered]
chunk {2} main.395e7d51ca3415f1ee22.js (main) 157 kB [initial] [rendered]
chunk {3} polyfills.8bbb231b43165d65d357.js (polyfills) 41 kB [initial] [rendered]
chunk {4} styles.e2ec57636eec1960d4aa.css (styles) 498 kB [initial] [rendered]
```
Những file này là kết quả tổng hợp đầy đủ ứng dụng của chúng ta. Chú ý rằng, có một chuỗi ký tự dài ở giữa mỗi file, như dưới đây: <br>
` main.395e7d51ca3415f1ee22.js`<br>
 Những ký tự này là mã băm của nội dung. (Đối với mỗi máy tính có thể khác nhau). Khi nhìn vào từng file, chúng ta có thể thấy một số file sau: icons, index.html,  main.js, a polyfills.js, a vendor.js, và styles.css. <br>
Điều chúng ta cần làm tiếp theo là upload tất cả lên server. <br>
          
### Uploading to a Server
 Có rất nhiều cách để host code HTML và Javascript của bạn. Để demo, chúng ta có cách đơn giản nhất đó là sử dụng [Now](https://zeit.co/home)<br>
> Nếu bạn không muốn dùng `Now`, bạn có thể sử dụng bất kỳ phương thức nào bạn muốn. Chẳng hạn, bạn có thể host sites lên Heroku, AWS S3, upload file lên server của riêng bạn thông qua FTP ...vv. <br>
Điều quan trọng là, server có thể hiển thị tất cả các file trong thư mục `dist` lên internet. <br>
          
### Installing `now`
Chúng ta có thể install `now` bằng cách dùng `npm`: <br>
`npm install -g now` <br>
hoặc sử dụng yarn: <br>
`yarn global add now`<br>
 Và chạy câu lệnh dưới đây để deploy: <br>
```
cd dist/angular-reddit #change into the dist folder
Now
```
 Câu lệnh `now` sẽ hỏi bạn một vài câu hỏi (chẳng hạn như địa chỉ email), và bạn cần check mail và click vào link trong đó. <br>
Sau khi bạn xác nhận tài khoản, `now` sẽ upload code của bạn lên, và sẽ cung cấp cho bạn một URL để bạn có thể xem ứng dụng của bạn. <br>
Hãy truy cập vào URL đó, và xem app của bạn. Nếu nó hoạt động, hãy send URL này và khoe với bạn bè nào!<br>
Xin chúc mừng! Bạn đã built và deploy thành công ứng dụng Angular đầu tiên rồi đấy!
          
## Full Code Listing
Như vậy chúng ta đã tìm hiểu khá nhiều về Angular trong seria tạo thử ứng dụng Angular này. Bạn có thể đọc lại các bài viết trước đấy để hiểu rõ hơn.
### Wrapping Up
Như vậy, chúng ta đã hoàn thành xong ứng dụng Angular đầu tiên, ứng dụng đơn giản nhưng khá thú vị đúng không ?!. <br>
Chúng ta đã học khá nhiều thứ như là: hiểu về data flow, tạo AJAX requests, built-in directives, routing, thao tác với DOM ... vv.<br>
Các công việc chính để viết ứng dụng Angular, chúng ta đều đã làm ở bên trên: <br>
1. Tách app thành các component.
2. Tạo ra các view
3. Define models.
4. Display models.
5. Add interaction.
          
Trong các bài viết tiếp theo, chúng ta sẽ cùng nhau tiếp tục tìm hiểu các chủ đề khác liên quan đến Angular nhé. <br>
          
### Getting Help
Nếu bạn có điều muốn trao đổi, vui lòng comment ở dưới mỗi bài viết. 

 <br> <br> 
*Nguồn:  https://www.ng-book.com/2/*
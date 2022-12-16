Khi xây dựng một ứng dụng web, vấn đề performance luôn được ưu tiên hàng đầu. Có khá nhiều cách để chúng ta có thể cải thiện hiệu năng của một ứng dụng Angular như tree-shaking, AoT (ahead-of-time compilation), lazy loading modules hay caching. Để có cái nhìn tổng quan về những gì chúng ta có thể làm để nâng cao hiệu năng của 1 ứng dụng Angular, chúng tôi nghĩ rằng bạn cần xem qua [Angular Performance Checklist](https://github.com/mgechev/angular-performance-checklist#lazy-loading-of-resources) bởi Minko Gechev. Trong bài này chúng ta sẽ nói về caching.

Thực tế, Caching là một trong những cách hiệu quả nhất để cải thiện ứng dụng web của chúng ta, đặc biệt là khi người dùng có băng thông bị giới hạn hoặc mạng chậm.

Có khá nhiều cách để cache dữ liệu hoặc assets. Static assets là cách rất cache phổ biến với bộ cache tiêu chuẩn của trình duyệt hoặc Service workers. Trong khi đó thì Service Workers còn có thể cache những API request, nó khá là hữu dụng cho việc caching resources như ảnh, HTML, JS hoặc CSS file. Để cache dữ liệu của ứng dụng chúng ta thường xuyên dùng những cách custom.

Bất kể cơ chế chúng ta dùng là gì, nhìn chung thì cache sẽ giúp chúng ta cải thiện thời gian response của ứng dụng, giảm thiểu chi phí về mạng và có ích hơn khi content vẫn khả dụng khi có sự cố về mạng. Nói cách khác, khi content được cache gần với người dùng, hay đứng ở phương diện client, request không tạo thêm hoạt động nào liên quan tới network và dữ liệu được cache có thể được retrieve nhanh hơn nhiều bởi vì chúng ta đã lưu toàn bộ trên network.

Ở bài viết này chúng ta sẽ cùng phát triển nâng cao cơ chế cache với RxJS và tool được cung cấp bởi Angular.

### Motivation
Chúng ta vẫn thường hỏi rằng làm cách nào để cache dữ liệu trong ứng dụng Angular - ứng dụng sử dụng khá nhiều Observables. Hầu hết nhiều người đều biết làm thế nào để cache dữ liệu với Promise nhưng cảm thấy khá là nhọc khi phải tiếp cận với functional reactive programing, vì sự phức tạp của nó (API lớn), những điều cơ bản đã thay đổi trong mindset (từ imperative sang declarative) và vô vàn concepts khác. Vì vậy, nó có thể khó chuyển từ một ứng dụng đã được cache dựa trên Promise sang Observable, đặc biệt nếu bạn muốn thử một cơ chế có phần khó hơn.

Trong ứng dụng Angular, chúng ta thường sử dụng HTTP request thông qua `HttpClient` mà thường đi kèm với `HttpClientModule`. Tất cả các API đều là Observable-based nên có thể hiểu là các phương thức như get, post, put hoặc delete đều trả về 1 Observable. Bởi vì đặc tính của Observable nên request chỉ được tạo khi chúng ta gọi subscribe. Tuy nhiên, việc gọi subscribe nhiều lần trong cùng 1 Observable sẽ dẫn tới việc Observable sẽ tạo lại thành một vòng lặp, do đó sẽ thực thi 1 request tới từng subcription. Chúng ta gọi đó là  **cold Observables**. Bạn có thể tham khảo thêm khái niệm cold và hot Observable ở [bài viết này](https://blog.thoughtram.io/angular/2016/06/16/cold-vs-hot-observables.html).

Behavior này có thể khiến cho nó khó thực thi cơ chế caching với Observable. Các tiếp cận đơn giản thường yêu cầu khá nhiều bản mẫu và chúng ta đã chốt việc bỏ qua RxJS, nó vẫn hoạt động, nhưng cách đó không được khuyến khích nếu chúng ta muốn tận dụng sức mạnh của Observable. Nói một cách hình tượng thì chúng ta chẳng bao giờ muốn lái một chiếc xe Ferrari với một động cơ dạng scooter.

### The Requirement
Trước khi chúng ta bắt đầu code thì cùng định nghĩa requirements cho cơ chế advanced caching này.

Chúng ta sẽ build một ứng dụng có tên là **World of Jokes**. Nó là một ứng dụng đơn giản sẽ ngẫu nhiên hiện ra một vài câu nói đùa (joke) cho 1 category cụ thể. Để cho dễ hiểu thì chúng ta tạm thời chỉ có 1 category

Ứng dụng này sẽ có 3 components: `AppComponent`, `DashboardComponent` và `JokeListComponent`.

`AppComponent` là entry point của chúng ta và render 1 toolbar cũng như 1 <router-outlet> nó sẽ được fill dựa trên trạng thái router hiện tại.

`DashboardComponent` đơn giản sẽ show ra 1 list các category. Từ đó, chúng ta có thể navigate tới `JokeListComponent` nơi sẽ  render 1 list các joke lên màn hình.

Các câu joke sẽ được fetch từ server thông qua việc sử dụng HttpClient service của Angular. Để giữ cho trách nhiệm của component focus và chia các phần liên quan, chúng ta sẽ tạo 1 `JokeService` đảm nhận việc request dữ liệu. Component sau đó có thể  inject service và access dữ liệu thông qua những public APIs của nó.

Những điều trên chỉ là cấu trúc của ứng dụng chứ chưa có bất kì chút gì liên quan tới caching.

Khi navigate từ dashboard sang list view, chúng ta thích việc request dữ liệu từ cache hơn việc request nó từ server mỗi lần. Nền tảng dữ liệu của bộ nhớ đệm này sẽ được update mỗi 10 giây.

Tất nhiên, việc sử dụng phương pháp update dữ liệu sau mỗi 10 giây không phải là một kế hoạch dài hơi cho một ứng dụng trên production, mà chúng ta muốn sử dụng một cách tiếp cận tinh tế hơn để cập nhật cache ( ví dụ như dùng web socket để push update ). Nhưng chúng ta sẽ giữ mọi thứ đơn giản hơn và tập trung vào phương diện cache.

Bất kỳ trong trường hợp nào chúng ta cũng muốn nhận được thông báo về sự thay đổi. Trong ứng dụng này, chúng ta muốn dữ liệu trên giao diện (cụ thể là `JokeListComponent`) không được tự động update khi mà bộ nhớ cache được update nhưng sẽ update khi người dùng muốn thực hiện việc update giao diện (UI). Lý do tại sao lại như vậy ? Hãy tưởng tượng rằng một người dùng (user) có thể đọc một trong số những câu joke và sau đó tất cả những câu joke đó đột nhiên biến mất vì dữ liệu được tự động update. Điều đó thực sự phiền và đem lại trải nghiệm người dùng (UX) không tốt. Do đó, người dùng sẽ nhận được thông báo bất kể khi nào có dữ liệu mới.

Để cho thú vị hơn, chúng ta muốn người dùng có thể thực thi việc update cache. Điều này khác với việc update giao diện thông thường vì việc thực thi update ở đây có thể hiểu là yêu cầu lấy dữ liệu từ server, update bộ nhớ cache và sau đó sẽ update giao diện.

Cùng tóm tắt lại việc chúng ta sẽ làm:
- Ứng dụng của chúng ta sẽ có 2 components: khi mà navigate từ component A sang component B  ưu tiên request dữ liệu của B từ cache hơn là việc gửi request lên server mỗi lần.
- Cache được update mỗi 10s
- Dữ liệu trên giao diện người dùng sẽ ko tự update mà yêu cầu việc thực thi update từ người dùng
- Người dùng có thể thực thi update và cần được yêu cầu update cache và giao diện.

Đây là demo cho ứng dụng chúng ta sắp build:

![](https://blog.thoughtram.io/images/cache_app_preview.gif)
### Implement basic cache
Chúng ta sẽ làm từ từ cho đến giải pháp cuối cùng (bắt đầu từ cách đơn giản trước).

Đầu tiên tạo một service mới.

Tiếp đến chúng ta thêm 2 interface: 1 cái mô tả về Joke và cái còn lại dùng để định nghĩa kiểu response của HTTP request. Điều này chủ yếu là làm "hài lòng" TypeScript nhưng thực sự thì nó rất tiện và rõ ràng hơn khi thực hiện.
```
export interface Joke {
  id: number;
  joke: string;
  categories: Array<string>;
}

export interface JokeResponse {
  type: string;
  value: Array<Joke>;
}
```

Giờ thì chúng ta implement `JokeService`. Chúng ta sẽ không muốn show việc implement chi tiết như dữ liệu sẽ được lấy từ cache hay việc request dữ liệu mới từ server như thế nào, do vậy chúng ta sẽ chỉ đơn giản là show ra thuộc tính của joke và trả về 1 Observable có chứa 1 list joke.

Để có thể thực hiện HTTP request, chúng ta cần inject `HttpClient` service trong **constructor** của service.
```
// JokeService
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class JokeService {

  constructor(private http: HttpClient) { }

  get jokes() {
    ...
  }
}
```
Tiếp đến chúng ta thực thi private method `requestJokes()` để thực hiện GET request lấy list joke thông qua **HttpClient**.
```
import { map } from 'rxjs/operators';

@Injectable()
export class JokeService {

  constructor(private http: HttpClient) { }

  get jokes() {
    ...
  }

  private requestJokes() {
    return this.http.get<JokeResponse>(API_ENDPOINT).pipe(
      map(response => response.value)
    );
  }
}
```
Như vậy là chúng ta đã có những gì chúng ta cần để thực hiện method joke getter.

Cách tiếp cận đơn giản và có thể nhìn thấy nhanh đó là đơn giản chỉ cần return `this.requestJokes()`, nhưng điều đó không được. Chúng ta đã biết từ lúc đầu đó là tất cả method của `HttpClient`, ví dụ như get, đều trả về cold Observable. Có thể hiểu là tất cả dữ liệu stream đều được re-emit cho mỗi subscriber dẫn tới việc quá nhiều/tải HTTP request. Cuối cùng thì ý tưởng cho việc sử dụng cache đó là tăng tốc thời gian load của ứng dụng và giới hạn số lượng network request ở mức thấp nhất.

Thay vì vậy chúng ta chuyển luồng stream của chúng ta thành hot. Không chỉ có vậy, mỗi một subscriber mới cần được nhận giá trị đã được cache mới nhất. Đó là lý do chúng ta có 1 operator rất tiện có tên là `shareRplay`. Operator này trả về 1 Observable dùng để chia sẻ 1 single subscription từ source nền tảng, Observable đó được trả về từ `this.requestJokes()`.

Thêm vào đó, `shareReplay` chấp nhận 1 parameter tùy chọn có tên là `bufferSize` - thực sự rất tiện trong trường hợp này của chúng ta. `bufferSize` xác định số lượng tối đa element của việc replay buffer, có thể hiểu là số lượng element được cache và replay cho mỗi subscriber. Ở ví dụ này, chúng ta chỉ muốn replay giá trị gần đây nhất do đó set `bufferSize` là 1.

Đây là đoạn code chúng ta rút ra được:
```
import { Observable } from 'rxjs/Observable';
import { shareReplay, map } from 'rxjs/operators';

const API_ENDPOINT = 'https://api.icndb.com/jokes/random/5?limitTo=[nerdy]';
const CACHE_SIZE = 1;

@Injectable()
export class JokeService {
  private cache$: Observable<Array<Joke>>;

  constructor(private http: HttpClient) { }

  get jokes() {
    if (!this.cache$) {
      this.cache$ = this.requestJokes().pipe(
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cache$;
  }

  private requestJokes() {
    return this.http.get<JokeResponse>(API_ENDPOINT).pipe(
      map(response => response.value)
    );
  }
}
```
Ổn rồi đó, chúng ta đã nói về hầu hết những gì có ở đoạn code trên. Nhưng đợi đã, `private cache$` và biểu thức if bên trong getter để làm gì? Khá là đơn giản thôi, nếu chúng ta trả về trực tiếp `this.requestJokes().pipe(shareReplay(CACHE_SIZE))` thì sau đó mọi subscriber tạo 1 instance cache mới. Tuy nhiên chúng ta chỉ muốn chia sẻ 1 instance cho tất cả subscriber. Do đó, chúng ta giữ instance đó trong `private cache$` và khởi tạo nó ngay khi getter được gọi lần đầu. Mọi subsequent consumers sẽ nhận được instance được chia sẻ mà không cần tạo lại mỗi lần.

Cùng xem diagram sau đây để hình dung rõ hơn những gì chúng ta vừa thực hiện:
![cache_sequence_diagram](https://images.viblo.asia/87f40414-9393-4352-815c-c8a9bec878bc.png)

Chúng ta có thể thấy sequence diagram bên trên mô tả các object liên quan đến trong ví dụ của chúng ta, đó là request 1 danh sách joke  và 1 chuỗi message được exchange giữa các object. Để hiểu hơn, chúng ta cùng chia nhỏ nó ra nhé.

Chúng ta bắt đầu trên dashboard - nơi mà chúng ta có thể navigate tới các component.

Sau khi component được khởi tạo, Angular gọi tới `ngOnInit` life cycle hook, chúng ta request danh sách các joke thông qua việc gọi getter joke ở trong `JokeService`. Đây là lần đầu chúng ta yêu cầu dữ liệu nên thằng cache lúc này sẽ trống và chưa được khởi tạo, có thể nói dễ hiểu là thằng `JokeService.cache$` đang là undefined. Sau đó chúng ta gọi `requestJoke()`. Nó sẽ trả về cho chúng ta một Observable mà emit dữ liệu từ server. Cùng lúc đó chúng ta dùng luôn `shareReplay` để lấy behavior cần về.


`shareReplay` operator sẽ tự động tạo `ReplaySubject` giữa original source và tất cả các subscribers sau đó. Ngay sau khi các subscriber chuyển từ 0 tới 1, nó sẽ connect `Subject` tới source Observable và truyền đi tất cả các giá trị. Tất cả các subscribers tiếp theo sẽ được connect tới đó giữa Subject, hiệu quả hơn thì mỗi 1 subscription tới 1 cold Observable. Đó gọi là multicasting và định nghĩa cơ bản về simple cache của chúng ta.

Sau đó dữ liệu được trả về từ server sẽ được cache.

Chú ý là Cache là 1 standalone object ở trong sequence diagram trên và biểu đạt `ReplaySubject` được tạo giữa consumer (subscribers) và source (HTTP request).

Lần tiếp theo khi chúng ta request dữ liệu từ list component, cache của chúng ta sẽ replay giá trị gần đây nhất và gửi lại cho subcriber. Do vậy sẽ không có thêm HTTP nào nữa.

Cũng dễ hiểu chứ nhỉ ?

Để kết thúc, cùng xem lại kỹ hơn chút và xem cách mà cache hoạt động trên Observable level. Chúng ta sử dụng marble diagram để hình dung cách stream hoạt động:

![cache_share_replay](https://images.viblo.asia/4514673e-7f64-4eaf-9cd0-4dcb4c8ab7be.png)

Marble diagram này cho thấy chỉ duy nhất 1 subscription tới Observable và tất cả consumers đơn giản chỉ subscribe tới Observable được chia sẻ, đó chính là `ReplaySubject`. Chúng ta cũng thấy rằng chỉ duy nhất thằng subscriber đầu tiên triggers HTTP call và tất cả những subscriber còn lại sẽ nhận giá trị được replay.

Cuối cùng thì cùng xem  `JokeListComponent` và cách chúng ta có thể hiển thị dữ liệu. Đầu tiên chính là việc inject `JokeService`. Sau đó, bên trong `ngOnInit` chúng ta khởi tạo `joke$` với giá trị được trả về bởi hàm getter của service. Nó sẽ trả về 1 Observable dạng mảng Array<Joke> và đó là những gì chúng ta cần.
 ```
@Component({
  ...
})
export class JokeListComponent implements OnInit {
  jokes$: Observable<Array<Joke>>;

  constructor(private jokeService: JokeService) { }

  ngOnInit() {
    this.jokes$ = this.jokeService.jokes;
  }

  ...
}
 ```
 Lưu ý rằng chúng ta không nhất thiết phải subscribe tới `joke$`. Thay vào đó chúng ta có thể dùng `async` pipe trong template. cụ thể thì mọi người có thể tham khảo [post này](https://blog.thoughtram.io/angular/2017/02/27/three-things-you-didnt-know-about-the-async-pipe.html).
```
<mat-card *ngFor="let joke of jokes$ | async">...</mat-card>
```
Yeah ! Như vậy là chúng ta đã xong phần cache đơn giản. Để chắc chắn rằng request chỉ được tạo 1 lần thì chúng ta mở Chrome’s DevTools, và xem phần Network và chọn XHR. Bắt đầu từ trang dashboard, tới trang list view và sau đó navigate lại.
<iframe src="https://advanced-caching-with-rxjs-step-1.stackblitz.io/jokes"></iframe>
https://advanced-caching-with-rxjs-step-1.stackblitz.io/jokes

### Automatic updates
Như vậy là chúng ta đã build cơ chế cache đơn giản. Và có thể thấy rằng 1 trong nhưng phần khó nhằn nhất đã được hoàn thành bởi operator `shareReplay`. Nó focus vào việc caching và replay giá trị gần nhất.

Ứng dụng cũng đã chạy ổn nhưng dữ liệu thì chưa được update ở background. Sẽ ra sao nếu dữ liệu có thể thay đổi mỗi phút ? Thực sự thì chúng ta không muốn người dùng phải reload toàn bộ page mà chỉ cần lấy dữ liệu mới nhất từ server thôi.

Theo bạn thì việc cache của chúng ta được update mỗi 10s ở background thì có ổn không ? Đúng vậy, Đứng ở vị trí của người dùng chúng ta không muốn phải reload page và nếu khi có dữ liệu thay đổi thì giao diện người dùng sẽ update ngay sau đó. Trên thực tế, chúng ta dường như đã không dùng cơ chế `polling` nữa mà thay vào đó sẽ có 1 server để push notification. Trong phạm vi ứng dụng demo này thì app sẽ refresh trong khoảng thời gian là 10s khá ổn rồi.

Việc implement này khá là dễ dàng. Chúng ta muốn tạo một Observable để emit chuỗi các giá trị cách nhau bởi một khoảng thời gian cho trước, hoặc nói một cách đơn giản, chúng ta muốn tạo ra 1 giá trị mỗi X phần trăm giây. Chúng ta có nhiều lựa chọn để làm điều đó

Lựa chọn đầu tiên đó là sử dụng `interval`. Operator này sẽ nhận 1 parameter (optional) `period` để chỉ 1 khoảng thời gian giữa mỗi emit. Cùng xem ví dụ sau:
```
import { interval } from 'rxjs/observable/interval';

interval(10000).subscribe(console.log);
```
Ở đây chúng ta thiết lập 1 Observable emit 1 chuỗi số nguyên vô hạn mà mỗi số sẽ đc emit mỗi 10s. Nó cũng có nghĩa là giá trị đầu tiên phần nào sẽ bị delay bởi một khoảng thời gian cho trước. Để giải thích rõ hơn, hãy cùng xem marble diagram sau:
![](https://images.viblo.asia/382c8be4-b4ff-468e-a7d6-6c8df5a63135.png)

Nó diễn ra như những gì chúng ta nói trước đó. Giá trị đầu tiên bị delay và đó không phải là điều mà chúng ta muốn. Tại sao vậy ? Bởi vì nếu chúng ta navigate từ dashboard tới list component để đọc một vài câu joke, chúng ta sẽ phải đợi 10s trước khi dữ liệu được request từ server và render lên trên màn hình.

Chúng ta có thể fix nó bằng việc sử dụng oprator khác có tên là `startWith(value)` nó sẽ emit giá trị trước như một giá trị ban đầu. Nhưng chúng ta có thể làm tốt hơn.

Bạn có tin không nếu tôi nói rằng có một operator emit một chuỗi giá trị sau 1 thời gian cho trước (initial delay) và sau đó mỗi khoảng thời gian (regular interval)? Cùng xem `timer` nhé:
![](https://images.viblo.asia/0aa71e6c-d3af-4f12-969f-6ca09eaeb526.png)

Nice, nhưng nó có thực sự giải quyết vấn đề của chúng ta không ? Có chứ :D. Nếu chúng ta sét giá trị delay ban đầu là 0 và set khoảng thời gian period là 10 thì chúng ta sẽ nhận được kết qủa giống như chúng ta sử dụng `interval(10000).pipe(startWith(0))` nhưng chỉ với 1 operator

Giờ thì ốp nó vào cơ chế caching trong ứng dụng của chúng ta.

Chúng ta phải thiết lập 1 **timer** và chúng ta muốn tạo 1 HTTP request mỗi lúc để fetch dữ liệu mới từ server. Có nghĩa là mỗi tích tắc chúng ta cần `switchMap` để 1 Observable nó subsription, fetch list joke mới. Dùng `switchMap` có 1 cái lợi đó là chúng ta tránh được race conditions Sở dĩ được vậy là bởi vì bản chất của operator này. Nó sẽ unsubscribe từ Observable trước đó và chỉ emit giá trị từ Observable gần nhất.

Phần còn lại của cache sẽ vẫn nguyên vậy, có thể hiểu là luồng stream của chúng ta vẫn là multicast và tất cả subscriber chia sẻ chung 1 source cơ bản.

Nhắc lại là, bản chất của thằng `shareReplay` sẽ broadcast giá trị mới tới thằng subscribers đang tồn tại và replay giá trị gần nhất tới thằng subscriber mới.

![](https://images.viblo.asia/1cc3190f-9baa-4a43-be45-aeae59db4135.png)

Chúng ta có thể thấy trên marble diagram, **timer** emits một giá trị mỗi 10s. Mọi giá trị mà chúng ta muốn chuyển nó thành một inner Observable để fetch dữ liệu của chúng ta. Bởi vì chúng ta sử dụng `switchMap`, chúng ta muốn tránh race conditions, cho nên consumer chỉ nhận được giá trị là 1 và 3. Giá trị từ inner Observable thứ 2 bị “skip” vì chúng ta đã unsubscribe khi nó đến rồi.

Giờ thì ốp nó vào `JokeService` nào.
```
import { timer } from 'rxjs/observable/timer';
import { switchMap, shareReplay } from 'rxjs/operators';

const REFRESH_INTERVAL = 10000;

@Injectable()
export class JokeService {
  private cache$: Observable<Array<Joke>>;

  constructor(private http: HttpClient) { }

  get jokes() {
    if (!this.cache$) {
      // Thiết lập timer sẽ tick mỗi X giây
      const timer$ = timer(0, REFRESH_INTERVAL);

      // Mỗi tick sẽ tạo http request để fetch dữ liệu mới
      this.cache$ = timer$.pipe(
        switchMap(_ => this.requestJokes()),
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cache$;
  }

  ...
}
```
Awesome! Bạn thấy sao ? Cùng thử với demo này. Từ trang dashboard, chuyển tới list component và cùng xem điều gì sẽ xảy ra. Chờ vài giây để bạn có thể thấy được sự thay đổi. Nhớ rằng, cache được refresh mỗi 10 giây, nhưng cứ thoải mái đổi **REFRESH_INTERVAL**.

[App here](https://stackblitz.com/edit/advanced-caching-with-rxjs-step-2?ctl=1&embed=1&file=app/app.component.ts&hideExplorer=1&view=preview)
### Sending update notifications
Lý do tại sao cần thực thi việc push noti này thì mọi người có thể xem phần trên nhé.

Đầu tiên chúng ta cần phải lấy được giá trị ban đầu - **initial value** để show một thứ gì đó cho người dùng, bởi nếu không thì màn hình sẽ trống trơn cho tới khi cache được update lần đầu tiên. Chúng ta sẽ hiểu nguyên nhân tạo sao sau chốc lát nữa. Thiết lập stream cũng dễ như việc gọi hàm getter. Thêm vào đó việc chúng ta chỉ quan tâm tới **initial value** nên chúng ta có thể dùng `take` operator.

Để DRY code, chúng ta tạo một helper method có tên là `getDataOnce()`.
```
import { take } from 'rxjs/operators';

@Component({
  ...
})
export class JokeListComponent implements OnInit {
  ...
  ngOnInit() {
    const initialJokes$ = this.getDataOnce();
    ...
  }

  getDataOnce() {
    return this.jokeService.jokes.pipe(take(1));
  }
  ...
}
```
Theo như requirement thì chúng ta chỉ update UI khi mà người dùng thực sự muốn update thay vì việc tự động update. Vậy làm thế nào để biết người dùng muốn update ? Hành động đó là khi chúng ta click vào button ở UI  có tên là "Update". Button này sẽ show cùng với nội dung notification. Bây giờ thì cần fucus vào logic update UI khi người dùng click button này.

Chúng ta cần tạo một Observable từ event DOM, cụ thể đó là sự kiện click button. Có nhiều cách nhưng cách phổ biến nhất đó là sử dụng `Subject` như một cầu nối giữa template và logic ở view. Tóm lại là 1 `Subject` là một type mà implement cả  `Observer` và `Observable` types. Observables định nghĩa data flow và tạo ra data trong khi Observers có thể subscribe tới Observables và nhận data trả về.

Khi sừ dụng `Subject` chúng ta có thể dễ dàng sử dụng event binding ở template và có thể gọi lại sau đó khi event được trigger. Điều này dẫn tới một giá trị cụ thể được broadcast tới tất cả các Observer đang listen giá trị đó. Chú ý rằng chúng ta cũng có thể omit giá trị nếu `Subject` không phải dạng `void`.

Giờ thì khởi tạo một Subject mới.
```
import { Subject } from 'rxjs/Subject';

@Component({
  ...
})
export class JokeListComponent implements OnInit {
  update$ = new Subject<void>();
  ...
}
```
Và giờ thì là template:
```
<div class="notification">
  <span>There's new data available. Click to reload the data.</span>
  <button mat-raised-button color="accent" (click)="update$.next()">
    <div class="flex-row">
      <mat-icon>cached</mat-icon>
      UPDATE
    </div>
  </button>
</div>
```
Chúng ta sử dụng event binding để capture sự kiện click button như thế nào ? Khi chúng ta click vào button nó sẽ truyền lên một ghost value để cho tất cả thằng Observer đang active được thông báo. Chúng ta gọi đó là ghost value vì thực tế chúng ta không pass bất kỳ một giá trị nào hoặc ít nhất thì là 1 giá trị có type là void.

Một cách khác đó là sử dụng `@ViewChild()` decorator kết hợp với fromEvent operator của RxJS. Tuy nhiên, chúng ta cần phải "mess" với DOM và query HTML element từ view. Với `Subject` thì chúng ta không cần và cũng chẳng động đến DOM mấy ngoài việc event binding của button.

Phần view đã được setup xong rồi, giờ chúng ta có thể chuyển qua logic việc update UI.

Cache được update tự động ở background và chúng ta muốn render giá trị gần đây nhất từ cache khi chúng ta click button này. Có nghĩa là source stream của chúng ta bây giờ là `Subject`. Mỗi khi giá trị được broadcast on `update$` chúng ta muốn map giá trị này tới 1 Observable mà trả về giá trị gần nhất được cache. Nói cách khác, Chúng ta đang xử lý phần việc có gọi là **Higher Order Observable**.

Như chúng ta đã nói trước đó là thằng `switchMap` chính là giải pháp mà chúng ta cần. Nhưng giờ chúng ta sẽ sử dụng `mergeMap`. Operator cũng tương tự `switchMap` nhưng có điểm khác biệt là nó không unsubscribe inner Observable trước đó và đơn giản chỉ là merge với output Observable.

Thực tế thì khi request giá trị gần nhất từ cache, HTTP request đã xong rồi và cache cũng được update thành công. Cho nên chúng ta sẽ không phải gặp rắc rối với race-condition. Mặc dù nó là bất đồng bộ thật đấy (asyncchronous), nhưng ở đây nó là đồng bộ (synchronous) bởi vì giá trị được emit trong cùng thời điểm (1 tích tắc).
```
import { Subject } from 'rxjs/Subject';
import { mergeMap } from 'rxjs/operators';

@Component({
  ...
})
export class JokeListComponent implements OnInit {
  update$ = new Subject<void>();
  ...

  ngOnInit() {
    ...
    const updates$ = this.update$.pipe(
      mergeMap(() => this.getDataOnce())
    );
    ...
  }
  ...
}
```
Wow, mỗi khi "update" chúng ta request giá trị mới nhất từ cache sử dụng helper mà chúng ta đã tạo trước đó.

Và giờ chỉ là vấn đề hiển thị nó lên màn hình của ứng dụng. Những gì chúng ta cần làm đó là merge list joke ban đầu với update$ stream.
```
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { merge } from 'rxjs/observable/merge';
import { mergeMap } from 'rxjs/operators';

@Component({
  ...
})
export class JokeListComponent implements OnInit {
  jokes$: Observable<Array<Joke>>;
  update$ = new Subject<void>();
  ...

  ngOnInit() {
    const initialJokes$ = this.getDataOnce();

    const updates$ = this.update$.pipe(
      mergeMap(() => this.getDataOnce())
    );

    this.jokes$ = merge(initialJokes$, updates$);
    ...
  }
  ...
}
```
Việc chúng ta sử dụng helper method `getDataOnce()` để map mỗi sự kiện update với giá trị mới nhất đã được cache là cần thiết. Nếu chúng ta recall nó, nó sẽ lấy ra giá trị đầu tiên thông qua `take(1)` (internally) và kết thúc. Nói nó quan trọng và cần thiết là bởi nếu chúng ta không làm vậy thì nó sẽ kết thúc với một stream đang diễn ra hoặc một kết nối trực tiếp tới cache. Điều này về cơ bản sẽ phá vỡ những logic của việc update UI chỉ khi người dùng click button "Update".

Thêm nữa, Bởi vì cache của chúng ta là multicasted, nó cũng khá ổn để lấy ra giá trị mới nhất thông qua việc duy trì re-subscribe tới cache.

Cùng xem lại những gì chúng ta vừa implement với marble diagram nhé:
![](https://images.viblo.asia/d7de0123-9985-4b1e-91dc-d993aa787af2.png)

Mọi người có thể thấy rằng `initialJokes$` khá quan trọng bởi vì nếu không thì chúng ta sẽ chỉ thấy một thứ gì đó khi chúng ta click button "Update". Trong khi dữ liệu đã được update ngầm mỗi 10s nên chúng ta cũng chưa thể click. Bởi vì button là một phần của việc notification và chúng ta chưa thực sự show ra cho người dùng thấy.

Giờ thì chúng ta cần phải tạo một Observable có nhiệm vụ là show hoặc hide notification. Chúng ta cần thiết phải biết stream nó emit là true hoặc false. Giá trị chúng ta cần là true khi có update và false khi người dùng click button "Update".

Thêm vào đó chúng ta muốn skip giá trị ban đầu (initial) đã được emit bởi cache bởi vì nó không thực sự là giá trị mới được refresh.

Nếu chúng ta nghĩ theo stream như vậy thì chúng ta có thể chia nó thành nhiều stream khác nhau và merge nó lại để chuyển nó thành 1 single Observable. Và thằng stream cuối cùng sẽ có những behavior để show hoặc hide notification

Lý thuyết thì là như vậy, còn đây là code:
```
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { skip, mapTo } from 'rxjs/operators';

@Component({
  ...
})
export class JokeListComponent implements OnInit {
  showNotification$: Observable<boolean>;
  update$ = new Subject<void>();
  ...

  ngOnInit() {
    ...
    const initialNotifications$ = this.jokeService.jokes.pipe(skip(1));
    const show$ = initialNotifications$.pipe(mapTo(true));
    const hide$ = this.update$.pipe(mapTo(false));
    this.showNotification$ = merge(show$, hide$);
  }
  ...
}
```
Ở đây, Chúng ta listen tất cả các giá trị được emit bởi cache nhưng skip giá trị đầu tiên như vừa nói trên (nó không phải giá trị được refresh). Mỗi khi có giá trị mới thì ở `initialNotiofication$` chúng ta map nó là true để show ra noti. Khi chúng ta click "Update" ở noti đó, giá trị sẽ được gọi tới `update$` và chúng ta dễ dàng map nó là false để hide noti.

giờ thì vứt `showNotification$` vào trong template của `JokeListComponent` để 1 class với chức năng show hoặc hide noti.
```
<div class="notification" [class.visible]="showNotification$ | async">
  ...
</div>
```
Và đây là [demo](https://stackblitz.com/edit/advanced-caching-with-rxjs-step-3?embed=1&file=app/app.component.ts&view=preview)

### Fetching new data on demand
Update later
### References
https://blog.thoughtram.io/angular/2018/03/05/advanced-caching-with-rxjs.html
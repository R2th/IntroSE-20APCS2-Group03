Bài viết này dành cho những người anh em làm về Angular 2+, nên mình sẽ mặc định không giải thích những thuật ngữ cơ bản về Angular ở trong bài viết này.

Dự án của mình đang chạy một ứng dụng viết bằng Ruby on Rails phía back-end và sử dụng Angular 2+ để làm bên front-end. Phần front-end này được tổ chức bằng hệ thống components tương đối đồ sộ, mỗi trong số chung đảm nhiệm một view khác nhau. Thường thường thì các  components liên quan đến nhau sẽ dùng chung một số dữ liệu lấy từ phía backend, và trình bày chúng trên các view khác nhau. Hiệu năng và tính khả dụng của hệ thống sẽ phụ thuộc vào sự sẵn có sớm nhất có thể của dữ liệu trả về. Do một vài components thường được rendered cùng lúc trên một màn hình, chúng ta cần nghĩ đến việc chia sẻ dữ liệu một cách hiệu quả giữa các component để tối ưu hóa trải nghiệm người dùng.

Đối với một người bình thường mới làm Angular thì sẽ có cách làm như sau:
### Cách tiếp cận ngây ngô
Hãy tạo một service chia sẻ dữ liệu với TypeScript sử dụng [Promise](https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Promise) - phong cách thuần JavaScript như sau:
```ts
class SharingService {
    private data1: CustomType1;
    getData1():() => Promise {
        // nếu có rồi thì trả về Promise được resolved với chính giá trị đó
       if(goog.isDef(this.data1)){
           return Promise.resolve(data1);
       }
       // lấy dữ liệu bằng phương thức fetch của Net module
       return Net.fetch().then(data => {
           this.data1 = data;
           return data;
       });
    }
}			

@Component({
   templateUrl: '.html',
   selector:'custom-comp-foo',
})
export class CustomComp implements OnInit {
   data1: CustomType1;
   constructor(private sharingService: SharingService) {}
   ngOnInit() {
       this.sharingService.getData1().then(d => {
           this.data1 = d;
       });
   }
}
```

Có một vài điều cần chú ý ở đoạn code trên
* Service chia sẻ dữ liệu của chúng ta định nghĩa bởi class `SharingService`
* `SharingService` class được inject vào component `CustomComp` dùng cơ chế [dependency injection](https://angular.io/guide/dependency-injection)
* Dữ liệu được lấy trong `SharingService` bởi `CustomComp` trong quá trình mà component này được khởi tạo (`ngOnInit`).

Ý tưởng của sharing serice này là khá đơn giản. Nó có một phương thức `getData1` trả về một Promise của dữ liệu mà ta cần và một biến `data1` để lưu trữ dữ liệu đó. Bất kì component nào muốn lấy `data1` sẽ phải cần một Promise được resolved sẵn sàng trả về dữ liệu data1. Hình minh họa dưới đây giải thích rõ hơn về luồng dữ liệu:
![Data-Flow between back-end services and components](https://images.viblo.asia/02e8392b-44a6-4d72-b6f1-0e052aa5c89b.png)
Mặc dù cách thực hiện này khá dễ hiểu, nhưng nó không hoàn hảo. Khi `data1` được fetch về bởi một component (gọi là component A) lần đầu tiên, nó sẽ giữ nguyên trong suốt vòng đời của component đó. Khi sharing service fetch dữ liệu lần nữa cho một component khác (gọi là component B), dữ liệu mới lần này sẽ không có trong component A, trừ khi component A chủ động lấy thông tin về nó hoặc khi component này được khởi động lại vòng đời. Sự giao tiếp giữa A và B để biết được thông tin về sự thay đổi lại dữ liệu này có thể trở nên phức tạp, dễ sinh lỗi và khó để scale.
### Observable: Phiên bản xịn hơn của Promises
Trong khi Promise đại diện cho một giá trị trả về trong tương lai, một [Observable](https://angular.io/guide/observables) đại diện cho một stream of values (cái này mình xin phép không dịch, có thể tạm hiểu là nó không phải chỉ là một giá trị, nó là một dòng xuyên suốt các giá trị). Một Observable có thể ở trạng thái `completed`, nghĩa là sẽ không gửi đi bất cứ một giá trị nào nữa. Còn Observer là cái subcribe (đăng ký)  Observable. Những Observers này về cơ bản là những callback cho các sự kiện mà giá trị được gửi đi của Observable. Cơ chế này hỗ trợ các hoạt động không đồng bộ một cách tự nhiên. Trong ứng dụng, các component có các function hoạt động như những Observers, trong khi các service chia sẻ dữ liệu hoạt động như Observable.

### Định nghĩa dữ liệu nguồn với Subject

Do service chia sẻ dữ liệu không phải là nguồn dữ liệu thực sự, Observables là chưa đủ. Service này cần phải theo dõi (observe) dữ liệu nguồn (trong ví dụ của chúng ta là một HTTP module nào đó) trong khi truyền đi dữ liệu được lấy về. Bởi vậy, chúng ta cần [Subjects](https://blog.angularindepth.com/rxjs-understanding-subjects-5c585188c3e1). Một Subject vừa là một observer và lại là một observable. Đây là cách mà nó hoạt động:
```ts
class SharingService {
    private data1= new Subject();
    getData1():() => Observable {
        return this.data1.asObservable();
    }
    refresh() {
        Net.fetch().then(data => {
            this.data1.next(data);
        });
    }
} 
//Trong component A
ngOnInit() {
    this.sharingService.getData1().subscribe(d => {
        if(goog.isDefAndNotNull(d)){
            this.data1 = d;
        }
    });
}
```
Sharing service này sử dụng một Subject. Chúng ta chỉ cần phần Observable của subject cho phía components: phương thức `asObservable` được dùng để lấy dữ liệu. Phần còn lại trong phương thức `refresh`, phương thức này sử dụng `Net` module để fetch dữ liệu từ phía backend và dẫn vào trong Subject bằng lời gọi tới `next` để truyền đi cùng giá trị đó.
### Lưu trữ giá trị cuối cùng với BehaviorSubject
Dữ liệu tới được component khi refresh được gọi bên phía sharing service và khi component subscribe observable thông qua phương thức `getData1`. Tuy nhiên, giải pháp này có vẻ chưa chính xác lắm. Một Subject thường sẽ chỉ truyền đi những sự kiện trong tương lai tới một Observer sau một pha subscribe. Ví dụ, nếu component B subscribe dữ liệu sau khi service được refresh lần đầu, có thể B sẽ không nhận được bất kì dữ liệu nào cả trừ khi phương thức `refresh` được gọi lại lần nữa hoặc B phải subcribed ngay trước khi dữ liệu được fetch về bởi `Net` module. Nhưng phải có một giải pháp đơn giản hơn cho vấn đề này.

[BehaviorSubject](https://medium.com/@weswhite/angular-behaviorsubject-service-60485ef064fc) giải quyết vấn đề cuối cùng của chúng ta; nó là một loại Subject mà luôn luôn truyền đi giá trị được gửi cuối cùng cho bất kì subcriber nào mới. Vì vậy cho nên nó cần một giá trị khởi tạo, chúng ta có thể đặt cho nó là `undefined`. Lợi ích chính của phương pháp này là khi component B thực hiện một lần refresh, component A sẽ tự động nhận được giá trị mới của dữ liệu gửi đến. Component A không cần bất cứ một sự giao tiếp truyền tin nào để được thông báo về dữ liệu mới này. Và điều đó có nghĩa là dữ liệu trong component A sẽ luôn được thay đổi, cập nhật trong suốt vòng đời của nó.

### Xử lý cập nhật lan truyền trên component
À quên, có lẽ vẫn còn một vấn đề cần phải đề cập đến. Bởi vì không có components nào giao tiếp với nhau, làm sao để biết khi nào thì cần phải thực hiện `refresh`? Chẳng có lý do gì để fetch dữ liệu về trước khi nó thực sự cần thiết. Bên cạnh đó, mỗi component cũng không nên refresh liên tục trừ khi điều đó là bắt buộc. Giải pháp đơn giản nhất có lẽ là đặt cờ cho `SharingService`, để chỉ định cho tính sẵn có của dữ liệu. Tuy nhiên, giải pháp này đòi hỏi các components phải biết về bên trong của `SharingService` (không phải best practice). Phương pháp tốt hơn có lẽ là cung cấp một "API" tách biệt cho components lo việc xử lý `refresh` từ bên trong. Nó trông như thế này:
```ts
class SharingService {
    private data1 = new BehaviorSubject(undefined);
    private fetching: boolean;
    private getData1() {
        return this.data1.asObservable();
    }
    awaitData() {
        if(!goog.isDef(this.data1.getValue()) && !this.fetching){
            this.refresh();
        }
        return this.getData1();
    }
    refresh() {
        this.fetching = true;
        Net.fetch().then(data => {
            this.fetching = false;
            this.data1.next(data);
        },err => {
            this.fetching = false;
            this.data1.error(err);
        });
    }
}

//Trong component B
ngOnInit() {
    this.sharingService.awaitData().subscribe(d => {
        if(goog.isDefAndNotNull(d)){
            this.data1 = d;
        }
    });
}

updateData() {
    this.updateData(); // Function that changes data1
    this.sharingService.refresh();
}
```
Một vài sự cải tiến đã được thực hiện trong đoạn code trên. Phương thức `awaitData` là một cách tốt hơn cho vấn đề của chúng ta, nó quyết định liệu có hay không cần thiết để fetch dữ liệu mới về trong khi trả về Observable của dữ liệu nguồn. Chúng ta cũng đã thêm vào phần xử lý lỗi cho phương thức `refresh`. Biểu đồ trình tự dưới đây giúp trực quan hóa các tương tác giữa các phần trong ví dụ cuối cùng của chúng ta:
![](https://images.viblo.asia/0aee1ea6-c3c9-4882-b749-de36e10d361a.png)
### Kết luận
Khi xây dựng một ứng dụng Web tương đối phức tạp, việc sử dụng Observable pattern cung cấp cho ta cơ chế giao tiếp, chia sẻ dữ liệu không đồng bộ giữa các components trong hệ thống một cách hiệu quả. Tận dụng tốt khả năng chia sẻ dữ liệu sẽ giúp ta tối ưu hóa hiệu năng của hệ thống và nâng cao trải nghiệm người dùng.

Để có thể hiểu sâu hơn về Observable và các chủ đề trong bài viết, vui lòng đọc phần Tài liệu tham khảo và các link liên kết trong bài viết. Xin cảm ơn!

### Tài liệu tham khảo
1. [Angular - Observables](https://angular.io/guide/observables)
2. [Angular 2 and Observables - Data sharing in a multi-view application](https://www.lucidchart.com/techblog/2016/11/08/angular-2-and-observables-data-sharing-in-a-multi-view-application/)
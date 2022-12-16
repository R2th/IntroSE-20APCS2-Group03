Hé lô xin chào các bạn, mình đã làm Angular được một thời gian. Sắp tới mình sẽ đi phỏng vấn để tìm một bến đỗ mới, thử thách mới, môi trường mới, để học hỏi nhiều hơn => tất cả là xạo lìn đấy, mình muốn nhảy việc để đạt mục tiêu của mình "GET 1k5 trump" :D, nên mình sẽ chia sẻ một số kiến thức về Angular xách nách để đi phỏng vấn nhé. Chủ đề ngày hôm nay sẽ là lifecycle hooks, phỏng vấn từ Junior trở lên đều bị hỏi câu này.
## Tổng quát life cycle của một component
![](https://images.viblo.asia/c63e9424-d6ad-44ff-8c97-cbe803b19f25.JPG)
### Constructor
Là phương thức mặc định của class được thực khi class đó được khởi tạo. Nó nên được dùng để khai báo Dependency Injection, không nên xử lí logic ở trong phương thức này
![](https://images.viblo.asia/a4ccfc84-8f12-48c0-804b-290033c0f0a8.JPG)
### ngOnChanges
Hook này sẽ được gọi mỗi khi có sự thay đổi giá trị của các Input của component. 

![](https://images.viblo.asia/00e54600-bab6-4f4b-9d81-46b3f463197e.JPG)

Tuy nhiên với các Input có type là Object hoặc Array thì khi thay đổi 1 property hoặc push một phần tử vào mảng đó thì ngOnChange sẽ không chạy, trường hợp này nó chỉ chạy khi các bạn thay đổi reference của biến Input.
```
this.data = Object.assign({}, this.data);
this.array = [...this.arrayValue];
//hoặc có thể dùng phương thức clone của thư viện lodash
this.data = _.clone(this.data);
```

Lưu ý nếu component không có các Input thì ngOnChanges sẽ không chạy nhé các bạn
### ngOninit
Phương thức này sẽ được gọi **duy nhất một lần** khi khởi tạo xong Component. Ở đây được sử dụng để khởi tạo bổ sung thêm cho component như là khởi tạo giá trị cho biến, gọi api, khởi tạo form, ...

![](https://images.viblo.asia/a75cbec2-6fa5-4e0a-9e61-fef669b4fdf2.JPG)

**Thứ tự thực thi với case Parent/Child Component:**
```
Khi khởi tạo thì component cha phải được khởi tạo trước, sau đó mới đến component con vậy nên ngOninit của component cha sẽ chạy trước component con nhé các fen
```

### ngDoCheck
Phương thức này sẽ được gọi sau ngOninit và mỗi khi change detection chạy. Phương thức này dùng để custom 
Angular có cơ chế change detection, nó sẽ phát hiện các sự kiện như DOM Event(click, hover), setTimeout, SetInterval, XHR Request. Khi bắt được những sự kiện này, Angular sẽ thực hiện detect Change toàn bộ cây component của ứng dụng để kiểm tra sự thay đổi và re-render UI. Lúc này change detector ở mỗi component sẽ làm việc và ngDoCheck cũng được gọi.
Ở đây mình có một component
```
@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
})
export class Test1Component implements DoCheck {
  @Input()
  public data: {name: string, class: {name: string, id: string}};

  @Input()
  public array: {name: string}[];

  @Input()
  public id: string;

  constructor() { }

  public ngDoCheck() {
    console.log('test 1 do check');
  }

}
```
Và binding nó lên app component
```
<hello name="{{ name }}"></hello>
<p>
  Start editing to see some magic happen :)
</p>
<app-test1 [data]="data" [array]="array"></app-test1>
<button (click)="onClick()">Change name</button>

---------------------------------------
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  public data: {name: string, class: {name: string, id: string}} = {name: "Test", class: {name: '1A', id: '1'}};
  public array = [{name: '1'}, {name: '2'}, {name: '3'}]
  name = 'Angular ' + VERSION.major;
  public onClick() {
  this.data.name = "Name from Parent with number" + Math.random();
  }
}
```

Và khi mình click vào nút `Change name` thì kết quả sẽ như thế này 

![](https://images.viblo.asia/63a68ca4-7a11-4fc5-8862-4fa3501cfedc.gif)

Vì phương này được gọi mỗi khi Angular phát hiện ra sự thay đổi ở bất kì 1 component nào đó cho nên các bạn chú ý để tránh ảnh hưởng đến hiệu năng ứng dụng nhé.

Với phương thức này chúng ta có thể implement cơ chế change detection riêng của component mình mong muốn bằng cách kết hợp việc set   changeDetection: ChangeDetectionStrategy.OnPush (*component chỉ chạy change detection chỉ khi Input thay đổi hoặc có dom event của component đó như click, hover, ...*) và trigger change detection của component bằng tay 

```
@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Test1Component implements DoCheck {
  @Input()
  public data: {name: string, class: {name: string, id: string}};

  @Input()
  public array: {name: string}[];

  @Input()
  public id: string;
  
  private oldName: string;

  constructor(private cd: ChangeDetectorRef) { }

  public ngDoCheck() {
     console.log('do check');
    if (this.data.name !== this.oldName) {
      this.oldName = this.data.name;
      this.cd.detectChanges();
    }
  }

}
```

Đặc biệt, thằng ngOnChanges nó sẽ không chạy khi các bạn thay đổi giá trị 1 property của Object là một Input của component, bạn phải thay đổi reference của object đó như ở trên mình trình bày, ngoài ra ngDoCheck cũng có thể là cứu cánh cho bạn ở case này, tuy nhiên nhớ coi chừng Perf đấy nhé :).

**Thứ tự thực thi với case Parent/Child Component:**

```
Đạo lí kính lão đắc thọ của cha ông, nên component cha sẽ trigger doCheck lần đầu tiên
trước khi component con được sinh ra, và những lần sau đó component cha đều trigger ngDoCheck trước
rồi mới tới lượt component con. :D
=> Vì Angular theo 1 cây component, component cha là node cha nằm trên node component con,
thứ tự change detection từ root node cho đến hết child node
```

### ngAfterContentInit
Phương thức được gọi một lần duy nhất sau ngDoCheck lần đầu tiên. Nó thực thi sau khi Angular chiếu content lên component view với thẻ ng-content nên phương thức này giúp bạn có thể truy xuất content được truyền vào với ContentChild  decorator ví dụ như lấy giá trị 1 public property từ component content chẳng hạn

Ví dụ:
WrapContent Component
```
export class WrapContentComponent implements AfterContentInit {

  constructor() { }
   @ContentChild(ChildContentComponent) contentChild: ChildContentComponent;

  ngOnInit() {
    console.log(this.contentChild.name);
  }

  ngAfterContentInit() {
    console.log(this.contentChild.name);
  }
---------------------------------------------------
<p>
test2 works!
</p>
<ng-content></ng-content>
```

```
export class ChildContentComponent implements OnInit {

  constructor() { }
  public name = "Name ChildContentComponent";
  }
  --------------------------------------
  <p>
child-content works!
</p>
```

Sử dụng WrapContent Component ở App Component và truyền content vào cho nó là ChildContent Component


```
AppComponent.html

<app-wrap-content>
  <app-child-content></app-child-content>
</app-wrap-content>
```

Kết quả in ra màn hình sẽ là 
```
undefined
Name ChildContentComponent
```


### ngAfterContentChecked
Được gọi sau khi Angular đã kiểm tra content được truyền vào component
Phương thức này được gọi lần đầu sau ngAfterContentInit thực thi và sau đó được gọi sau mỗi lần ngDoCheck (từ lần thứ 2 trở đi) tức mỗi lần change detection được thực thi.
Với mình thì thường sử dụng thằng này để thực thi đoạn logic mình mong muốn mỗi khi change detection để đảm bảo đoạn logic mình chạy lấy được dữ liệu mới nhất của content truyền vào. 

### ngAfterViewInit

Được gọi sau khi Angular đã hoàn thành khởi tạo view component và view con. Và nó chỉ chạy duy nhất một lần
Mục đích sử dụng thông thường là thực thi view query với tham chiếu bằng ViewChild hoặc ViewChilden
```
@Component({
selector: 'my-select2',
 template: `<div #tagBlock>
                 something here
            </div>`,
})

export class MySelect2Component implements AfterViewInit {
 @ViewChild('tagBlock')
  public tagBlock: ElementRef;
  constructor() {}
   public ngAfterViewInit() {
       console.log(this.tagBlock.nativeElement.innerHTML);
   }
}
```

Kết quả sẽ in ra: 
```
something here
```

### ngAfterViewChecked

Được gọi sau khi Angular kiểm tra component view và view những thằng con hoặc view chứa directive.
Phương thức được gọi sau ngAfterViewInit lần đầu tiên, và sau mỗi ngAfterContentChecked

### ngDestroy
Được gọi 1 lần duy nhất khi Angular hủy component
Thường dùng để handle các event, ubsubscribe obseverble khi hủy component
```
public ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }
```

## Thứ tự thực thi khi các component lồng nhau
Nested Components đấy cá bạn, nói cách khác là các component có quan hệ cha con thì từng thằng nó sẽ chạy life cycle hook của nó thằng nào trước thằng nào sau, sống trên đời phải có thứ tự chứ đúng không my fens, ai cũng dành chạy trước thì có mà toang :D

- Ok, với ngOnit, ngDoCheck thì cha làm trước rồi con mới được làm.
-  ngDestroy thì thằng con chạy trước, hết tất cả các thằng con thì thằng cha mới tự tử (destroy :D)
-  Với ngAfterViewInit và ngAfterViewChecked những thằng con sẽ được chạy trước,  sau khi đám đó chạy xong hết thì ông bô (component cha) mới chạy 2 hook đó.


### Lưu ý
Với trường hợp component cha các bạn KHÔNG set changeDetection: ChangeDetectionStrategy.OnPush, tức nó Default, tức mỗi lần state của application thay đổi thì component đó sẽ thực thi change detection. Lúc đó  sau khi Component cha chạy ngDoCheck, component con sẽ chạy ngDoCheck -> ngAfterContentChecked -> ngAfterViewChecked. Nhưng nếu component cha các bạn set ChangeDetectionStrategy.OnPush, thì trừ khi Input của component cha thay đổi, hoặc xuất hiện event để chạy change detection ở component cha thì component con mới thực thi đoạn hook ở trên, còn không thì sẽ không chạy đâu nhé các bạn. Lý giải cho điều này là khi các bạn set ChangeDetectionStrategy.OnPush tức component cha sẽ không chạy change detection mỗi khi state application thay đổi mà không liên quan đến nó => Bài tới mình sẽ viết về Change Detection để các bạn hiểu rõ hơn 

Ở trên là những kiến thức của mình về Angular lifecycle hook mà mình muốn chia sẻ cùng các bạn. Hi vọng các bạn sẽ góp ý xây dựng những cái mình thiếu sót. Cùng nhau GET X k trump nào :D

p/s: Quảng cáo 5s, các bạn hãy tham gia group Angular Việt Nam để trao đổi cùng các đồng dâm :v, đồng đạo khác, có các mod cũng nhiệt tình sp
https://www.facebook.com/groups/AngularVietnam/?ref=share
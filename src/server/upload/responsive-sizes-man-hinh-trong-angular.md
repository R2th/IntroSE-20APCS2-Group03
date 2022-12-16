![](https://images.viblo.asia/4682dd71-604f-4f19-8b40-3fb5832ccfaf.png)
Hầu hết thời gian chúng ta sử dụng các queries media CSS để xử lý các thay đổi size màn hình tương ứng để bố trí nội dung khác nhau. Tuy nhiên, đôi khi các queries media CSS không đủ cho điều đó. Chúng ta cần xử lý để đáp ứng nó trong code của chúng ta.

Trong bài viết này, tôi muốn chia sẻ về cách tìm ra các  responsive breakpoints trong Angular, với một twist - chúng ta không duy trì responsive breakpoint sizes trong Typescript code của bạn (vì các responsive breakpoints đã được xác định trong CSS).

Chúng ta sẽ sử dụng Angular với Bootstrap trong ví dụ này, nhưng nó hoạt động cho bất kỳ CSS frameworks và class nào. Hãy bắt đầu nào:

# Kế hoạch là gì?
Chúng ta sẽ sử dụng các CSS Class để xác định các responsive breakpoints hiện tại. Có 5 breakpoints trong CSS Bootstrap. Các class CSS để xác định mức độ hiển thị của từng breakpoints là:

* Visible only on xs: ***.d-block .d-sm-none***
* Visible only on sm: ***.d-none .d-sm-block .d-md-none***
* Visible only on md: .***d-none .d-md-block .d-lg-none***
* Visible only on lg: ***.d-none .d-lg-block .d-xl-none***
* Visible only on xl: ***.d-none .d-xl-block***

Thuộc tính CSS ***display*** sẽ được chuyển đổi giữa ***none*** hoặc ***block***. Chúng ta sẽ áp dụng các class này cho các phần tử HTML.

Mỗi khi thay đổi size màn hình, chúng ta sẽ lặp và tìm phần tử HTML với style display: block, đây là cách chúng ta sẽ phát hiện breakpoint hiện tại.

đây là demo để bạn tham khảo: https://stackblitz.com/edit/angular-size.

# Thực hiện: Component
Hãy tạo ra một component Angular ***size-detector***.

Component HTML template:

```
<!-- size-detector.component.html -->
<div *ngFor="let s of sizes" class="{{s.css + ' ' + (prefix + s.id) }}">{{s.name}}</div>
```

component Typescript code:

```
// size-detector.component.ts
...
export class SizeDetectorComponent implements AfterViewInit {
  prefix = 'is-';
  sizes = [
    {
      id: SCREEN_SIZE.XS, name: 'xs', css: `d-block d-sm-none`
    },
    {
      id: SCREEN_SIZE.SM, name: 'sm', css: `d-none d-sm-block d-md-none`
    },
    {
      id: SCREEN_SIZE.MD, name: 'md', css: `d-none d-md-block d-lg-none`
    },
    {
      id: SCREEN_SIZE.LG, name: 'lg', css: `d-none d-lg-block d-xl-none`
    },
    {
      id: SCREEN_SIZE.XL, name: 'xl', css: `d-none d-xl-block`
    },
  ];

  @HostListener("window:resize", [])
  private onResize() {
    this.detectScreenSize();
  }

  ngAfterViewInit() {
    this.detectScreenSize();
  }

  private detectScreenSize() {
    // chúng ta sẽ viết logic này sau
  }
}

```

Sau khi xem component code, bạn có thể tự hỏi những giá trị SCREEN_SIZE. * Đến từ đâu. Nó là một enum. Hãy tạo enum size màn hình (Bạn có thể tạo một file mới hoặc chỉ đặt enum trong cùng một component file).

```
// screen-size.enum.ts

/_ Một enum xác định tất cả các size màn hình hỗ trợ ứng dụng _/
export enum SCREEN_SIZE {
  XS,
  SM,
  MD,
  LG,
  XL
}
```

Ngoài ra, hãy nhớ thêm Bootstrap vào project của bạn! Bạn có thể thêm nó qua npm hoặc yarn, nhưng trong ví dụ này, chúng ta sẽ sử dụng cách dễ dàng hơn. Thêm linkt cdn trong index.html.

```
<!-- index.html -->
<link rel="stylesheet" 
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
```

1. Đầu tiên, chúng ta xác định list các ***size*** mà chúng ta support và các class CSS được sử dụng để xác định từng breakpoints.
2. Trong HTML, chúng ta lặp qua list size, tạo phần tử ***div***, gán css và hiển thị nó. Cũng lưu ý rằng chúng ta cung cấp cho mỗi ***div*** một class css duy nhất bổ sung là**- <SIZE_ENUM>**.
3. Chúng ta có 1 function ***Chúng ta cần chạy logic mọi lúc khi kích thước màn hình thay đổi. Chúng tôi sử dụng HostListener để lắng nghe event window resize***. Đây là nơi chúng ta sẽ viết logic để tìm ra sự thay đổi size màn hình. Chúng ta sẽ hoàn thành nó sau.
4. Chúng ta cần run logic mọi lúc khi size màn hình thay đổi. Chúng ta sử dụng ***HostListener*** để lắng nghe event ***window resize***
5. Chúng ta cũng cần run logic khi lần đầu tiên khởi tạo app. Chúng ta cần run nó trong hook vòng đời component ***AfterViewInit***.

# Thực hiện: Service & Component
Bây giờ chúng ta đã sẵn sàng code component "almost", hãy bắt đầu triển khai ***resize service*** của chúng ta.

```
// resize.service.ts

@Injectable()
export class ResizeService {

  get onResize$(): Observable<SCREEN_SIZE> {
    return this.resizeSubject.asObservable().pipe(distinctUntilChanged());
  }

  private resizeSubject: Subject<SCREEN_SIZE>;

  constructor() {
    this.resizeSubject = new Subject();
  }

  onResize(size: SCREEN_SIZE) {
    this.resizeSubject.next(size);
  }

}
```

Code ***resize service*** rất đơn giản:

1. Chúng ta tạo một chủ đề rxjs ***resizeSubject***.
2. Chúng ta có một method công khai ***onResize*** nhận ***size*** làm tham số. Sau đó nó sẽ đẩy value vào luồng resize. (Chúng ta sẽ gọi phương thức này sau trong component ***size-detector*** của chúng ta).
3. Lưu ý rằng chúng ta sử dụng toán tử differUntilChanged trong resize có thể quan sát được. Chúng ta sử dụng để giảm thông báo không cần thiết. Ví dụ: khi size màn hình của bạn thay đổi từ 200px thành 300px, nó vẫn được coi là size ***xs*** trong bootstrap. Chúng ta không cần phải thông báo trong trường hợp đó. (Bạn có thể xóa toán tử nếu bạn cần).
4. Chúng ta xuất luồng resize có thể quan sát được thông qua ***onResize$***. Bất kỳ components, services, directives, vv sau đó có thể đăng ký luồng này để nhận thông báo mỗi khi thay đổi size.

Tiếp theo, chúng ta hãy quay trở lại component ***size-detector*** của chúng ta và update logic ***DetScreenSize***.
```
// size-detector.component.ts
...

private detectScreenSize() {
    constructor(private elementRef: ElementRef, private resizeSvc: ResizeService) { }

    const currentSize = this.sizes.find(x => {
      // lấy element HTML 
      const el = this.elementRef.nativeElement.querySelector(`.${this.prefix}${x.id}`);

      // kiểm tra giá trị thuộc tính hiển thị của nó
      const isVisible = window.getComputedStyle(el).display != 'none';

      return isVisible;
    });

    this.resizeSvc.onResize(currentSize.id);
}

...
```

1. Đầu tiên, chúng ta sẽ cần inject ***ElementRef*** và ***ResizeService*** mới được tạo vào component của chúng ta.
2. Dựa trên các class CSS của chúng ta, tại bất kỳ thời điểm nào, sẽ chỉ có MỘT element HTML hiển thị. Chúng tôi lặp qua mảng ***sizes*** của chúng ta và tìm thấy nó.
3. Đối với mỗi size của array ***sizes*** của chúng ta chúng ta sẽ sử dụng bộ chọn selector của element HTML5 để tìm phần tử theo class css duy nhất mà chúng ta đã xác định trước đó là- <SIZE_ENUM>.
4. Khi chúng ta tìm thấy element hiển thị hiện tại, chúng ta sẽ thông báo cho service resize của chúng ta bằng cách gọi method ***onResize***.

# Sử dụng Service và Component
Bạn có thể đặt component ***size-detector*** dưới component ***app-component*** của chúng ta. Ví dụ:
```
<!-- app.component.html -->

<hello name="{{ name }}"></hello>
<!-- Your size-detector component place here -->
<app-size-detector></app-size-detector>
```

Trong ví dụ này, tôi có một ***hello-component*** khác trong ***app-component***, nhưng điều đó không thành vấn đề.

Vì tôi đặt component trong ***app-component***, có nghĩa là tôi có thể sử dụng ***ResizeService*** ở mọi nơi (directives, components, services, vv..).

Chẳng hạn, giả sử tôi muốn phát hiện các thay đổi size màn hình trong ***hello-component***, tôi có thể làm như vậy bằng cách đưa ***ResizeService*** vào constructor, sau đó subscribe ***onSizeChange$*** có thể quan sát và làm những gì tôi cần.

```
// hello.component.ts

@Component({
  selector: 'hello',
  template: `<h1>Hello {{size}}!</h1>`,
})
export class HelloComponent  {

  size: SCREEN_SIZE;

  constructor(private resizeSvc: ResizeService) { 
    // đăng ký luồng thay đổi size
    this.resizeSvc.onResize$.subscribe(x => {
      this.size = x;
    });
  }

}
```

Trong đoạn code trên, chúng ta phát hiện các thay đổi size màn hình và chỉ hiển thị value size màn hình hiện tại.

Hãy xem nó :
![](https://images.viblo.asia/e03141b9-cb00-4b35-82c5-270b5c0017d7.gif)

Một trong những tình huống sử dụng thực tế có thể là bạn có accordion trên màn hình. Trong điện thoại di động, bạn muốn thu gọn tất cả các panel accordion, chỉ hiển thị bảng hoạt động tại một thời điểm. Tuy nhiên, trong máy tính để bàn, bạn có thể muốn mở rộng tất cả panel.

# Tóm lại
Đây là cách chúng ta có thể phát hiện các thay đổi size màn hình mà không cần duy trì kích thước breakpoint thực tế trong code JavaScript của chúng ta. Đây là code:
https://stackblitz.com/edit/angular-size

Nếu bạn nghĩ về nó, không thường xuyên người dùng thay đổi size màn hình khi duyệt ứng dụng. Bạn có thể xử lý size màn hình thay đổi ứng dụng rộng (như ví dụ của chúng ta ở trên) hoặc chỉ xử lý nó mỗi khi bạn cần (theo case sử dụng / basis component).

Ngoài ra, nếu bạn không muốn duplicate và duy trì breakpoint sizes trong code JavaScript, bạn có thể xóa component này, di chuyển hàm detectScreenSize vào service của bạn và thay đổi một chút về logic. Không khó để thực hiện điều đó. (Có thể thử không?)

Đó là tất cả. Happy coding!
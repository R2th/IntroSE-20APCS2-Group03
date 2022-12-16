Trong bài viết này, tôi sẽ nói thêm về Routing trong Angular và một số điều hay ho của nó mà bạn cso thể chưa biết đến.

![image.png](https://images.viblo.asia/046cdfc2-956c-42b5-a42f-50fd828cc51f.png)

**Cấu hình wildcard routes**

Một ứng dụng hoạt động tốt sẽ xử lý một cách linh hoạt khi người dùng cố gắng điều hướng đến một phần không tồn tại của ứng dụng của bạn. Để thêm chức năng này vào ứng dụng của bạn, bạn thiết lập một định tuyến ký tự đại diện. Bộ định tuyến Angular chọn tuyến đường này bất kỳ lúc nào URL được yêu cầu không khớp với bất kỳ đường dẫn bộ định tuyến nào.

Để thiết lập tuyến đường theo ký tự đại diện, hãy thêm mã sau vào định nghĩa tuyến đường của bạn.

`{ path: '**', component:  }`

Với hai dấu hoa thị `**`, ta cho Angular biết rằng định nghĩa các định tuyến này là một tuyến đường ký tự đại diện. Đối với thuộc tính thành phần, bạn có thể xác định bất kỳ thành phần nào trong ứng dụng của mình. Các lựa chọn phổ biến bao gồm **PageNotFoundComponent** dành riêng cho ứng dụng, mà bạn có thể xác định để hiển thị trang 404 cho người dùng của mình; hoặc chuyển hướng đến thành phần chính của ứng dụng của bạn. Tuyến ký tự đại diện là tuyến cuối cùng vì nó khớp với bất kỳ URL nào. Để biết thêm chi tiết về lý do tại sao thứ tự quan trọng đối với các tuyến đường.

**Thứ tự định tuyến**

Thứ tự định tuyến rất quan trọng vì Bộ định tuyến sử dụng chiến lược first-match ( phù hợp đầu tiên) khi kết hợp các route, vì vậy các route mô tả cụ thể chi tiết hơn nên được đặt bên trên các route ít cụ thể hơn. Liệt kê các route với một đường dẫn tĩnh trước tiên, tiếp theo là một route trống, phù hợp với tuyến đường mặc định. Tuyến ký tự đại diện đến cuối cùng vì nó khớp với mọi URL và Bộ định tuyến chỉ chọn nó nếu không có route nào khác khớp trước.

**Hiển thị page lỗi 404**
Để hiển thị trang 404, hãy thiết lập một tuyến ký tự đại diện với thuộc tính thành phần được đặt thành thành phần bạn muốn sử dụng cho trang 404 của mình như sau:

```
const routes: Routes = [
  { path: 'first-component', component: FirstComponent },
  { path: 'second-component', component: SecondComponent },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
```

Route cuối cùng với đường dẫn của `**` là một tuyến ký tự đại diện. Bộ định tuyến chọn tuyến này nếu URL được yêu cầu không khớp với bất kỳ đường dẫn nào trước đó trong danh sách và gửi người dùng đến **PageNotFoundComponent**.

**Cài đặt thuộc tính redirects**

Để thiết lập chuyển hướng, hãy định cấu hình một tuyến với đường dẫn bạn muốn chuyển hướng, thành phần bạn muốn chuyển hướng đến và giá trị **pathMatch** cho bộ định tuyến biết cách khớp URL.

```
const routes: Routes = [
  { path: 'first-component', component: FirstComponent },
  { path: 'second-component', component: SecondComponent },
  { path: '',   redirectTo: '/first-component', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
```

Trong ví dụ này, tuyến thứ ba (path: ' ') là một chuyển hướng để bộ định tuyến mặc định là tuyến tới `first-component`. Lưu ý rằng chuyển hướng này đứng trước tuyến ký tự đại diện. Ở đây, `path: ''` có nghĩa là sử dụng `URL tương đối ban đầu ('')`.

Để biết thêm chi tiết về pathMatch, hãy xem Spotlight trên pathMatch.

**Nesting routes**

Phần này sẽ nói về cấu hình chi tiết các route phức tạp, cần lồng bên trong nhau.
   
Khi ứng dụng của bạn phát triển phức tạp hơn, bạn có thể muốn tạo các tuyến liên quan đến một component khác với thành phần root của bạn. 
Các loại tuyến đường lồng nhau này ( nested routes) được gọi là các tuyến đường con ( child routes). Điều này có nghĩa là bạn đang thêm <router-outlet> thứ hai vào ứng dụng của mình, vì nó bổ sung cho <router-outlet> trong **AppComponent**.

Trong ví dụ này, có hai components bổ sung, child-a và child-b. Ở đây, **FirstComponent** có <nav> của riêng nó và <router-outlet> thứ hai ngoài cái trong AppComponent.
    
   
```
<h2>First Component</h2>
<nav>
  <ul>
    <li><a routerLink="child-a">Child A</a></li>
    <li><a routerLink="child-b">Child B</a></li>
  </ul>
</nav>

<router-outlet></router-outlet>
```

    Một child route cũng giống như bất kỳ tuyến nào khác, ở chỗ nó cần cả một đường dẫn (path) và một component. Sự khác biệt là bạn đặt các tuyến con trong một mảng con trong tuyến cha.
    
    
   ```
 const routes: Routes = [
  {
    path: 'first-component',
    component: FirstComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: 'child-a', // child route path
        component: ChildAComponent, // child route component that the router renders
      },
      {
        path: 'child-b',
        component: ChildBComponent, // another child route component that the router renders
      },
    ],
  },
];
```
    
    **Sử dụng đường dẫn tương đối **
    
    
    Đường dẫn tương đối cho phép bạn xác định đường dẫn liên quan đến phân đoạn URL hiện tại. Ví dụ sau đây cho thấy một tuyến đường tương đối đến một thành phần khác, thành phần thứ hai.
    
    `FirstComponent` và `SecondComponent` ở cùng một cấp trong cây, tuy nhiên, liên kết đến `SecondComponent` nằm trong `FirstComponent`, có nghĩa là bộ định tuyến phải tăng một cấp và sau đó vào thư mục thứ hai để tìm `SecondComponent`. Thay vì viết ra toàn bộ đường dẫn đến `SecondComponent`, bạn có thể sử dụng ký hiệu `../` để nâng cấp.
    
   ```
 <h2>First Component</h2>

<nav>
  <ul>
    <li><a routerLink="../second-component">Relative Route to second component</a></li>
  </ul>
</nav>
<router-outlet></router-outlet>
```
    
    Ngoài `../`, bạn có thể sử dụng `./` hoặc không có dấu gạch chéo ở đầu để chỉ định cấp độ hiện tại.
    
    **Chỉ định một route tương đối **
    
    Để chỉ định một tuyến đường tương đối, hãy sử dụng thuộc tính `NavigationExtras relativeTo`. Trong component, import `NavigationExtras` từ `@ angle / router`.

Sau đó, sử dụng `relativeTo` trong  method navigation của bạn. Sau mảng các tham số liên kết, nơi chứa các items, hãy thêm một object có thuộc tính `relativeTo` được set vào `ActivatedRoute`, là `this.route`.
    
   ```
 goToItems() {
  this.router.navigate(['items'], { relativeTo: this.route });
}
```
    Phương thức `goToItems ()` diễn giải URI đích có liên quan đến tuyến được kích hoạt và điều hướng đến items route.
    
    **Truy cập đến các query parameters và fragments**

Đôi khi, một tính năng trong ứng dụng của bạn yêu cầu truy cập một phần của route, chẳng hạn như tham số truy vấn hoặc một fragment. Sau đây sẽ nói về việc này.

Đầu tiên, nhập các thành viên sau vào thành phần bạn muốn điều hướng từ đó.
    
  ```
  import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
```
    
    Sau đó, ta thêm route kiểu `ActivatedRoute`
    
    `constructor(private route: ActivatedRoute) {}`
    
    Configure the class so that you have an observable, heroes$, a selectedId to hold the id number of the hero, and the heroes in the ngOnInit(), add the following code to get the id of the selected hero. This code snippet assumes that you have a heroes list, a hero service, a function to get your heroes, and the HTML to render your list and details, just as in the Tour of Heroes example.
    
    Ta sẽ định nghĩa một class để sử dụng observable trong ngOnInit (), thêm mã sau để lấy id của param cần thiết. 
    Ta cấu hình biến `heroes$` kiểu Observable để lấy các giá trị param tư route gọi tới.
    
  ```
  heroes$: Observable;
selectedId: number;
heroes = HEROES;

ngOnInit() {
  this.heroes$ = this.route.paramMap.pipe(
    switchMap(params => {
      this.selectedId = Number(params.get('id'));
      return this.service.getHeroes();
    })
  );
}

```
    
Sau đó, trong component ta muốn chuyển đến, import như sau:
    
  ```
  import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';


hero$: Observable;

  constructor(
    private route: ActivatedRoute,
    private router: Router  ) {}

  ngOnInit() {
    const heroId = this.route.snapshot.paramMap.get('id');
    this.hero$ = this.service.getHero(heroId);
  }

  gotoItems(hero: Hero) {
    const heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that item.
    this.router.navigate(['/heroes', { id: heroId }]);
  }

```

    Lưu ý: this.route.snapshot lấy các param hiện tại ( có thể bị thay đổi nếu param mới trong một số trường hợp )


Tham khảo: https://angular.io/guide/router
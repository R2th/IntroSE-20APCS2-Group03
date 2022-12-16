Router là một module được đặt tại @angular/router, cung cấp cho ứng dụng Angluar của chúng ta khả năng điều hướng và hiển thị nội dung phù hợp với địa chỉ URL. Với các ứng dụng web thông thường, việc điều hướng theo URL thường sẽ do phía server đảm nhiệm, giống như hình ảnh dưới đây là ví dụ với Rails App:
![](https://images.viblo.asia/8f35a698-5b88-4bc3-8451-f42f91f244ed.png)
# 1. Khai báo Route
Đầu tiên, để có thể truy cập được các URL khác nhau, chúng ta sẽ cần khai báo chúng để Angular biết đường mà xử lý. Việc khai báo sẽ bao gồm hai bước sau :
Định nghĩa từng route. Mỗi route sẽ có là một cặp Url Path - Component để ứng dụng biết được Component cần load khi đến URL tương ứng.
Load các khai báo routes vào ứng dụng (thường ở app.module)
Việc tạo các routes được thực hiện bằng cách sử dụng class Routes trong @angular\router. Edit file app.module.ts như sau:
```
import { Routes, RouterModule } from '@angular/router'; //import Routes từ module @angular/router
...
//Khai báo một constant chứa các route của app
const routes: Routes = [
  { path: 'phones', component: ItemsListComponent },
  { path: 'phones/:id/edit', component: ItemFormComponent },
  { path: 'phones/new', component: ItemFormComponent },
  { path: 'cart', component: CartComponent }
];
...
```
//Import RouterModule vào import của app.module
```
imports:      [ BrowserModule, FormsModule, RouterModule.forRoot(routes) ],

```
Ở đây các thành phần như phones, edit, new, cart sẽ là giá trị cố định, trong khi :id sẽ là tham số động và có thể thay đổi (1,2,3,4,a, b, c,...), và có thể lấy được thông qua một Component của module @angular/router
# 2. Hiển thị route component
Sau khi edit file app.modules.ts như trên, chúng ta vừa làm một việc là khai báo các path ở trong từng object ở hằng số routes khi được người dùng truy cập, sẽ 
được Angular app xử lý và load các component tương ứng. Lúc này chúng ta có thể truy cập các url đó mà không gặp lỗi ERROR Error: Uncaught (in promise): Error: Cannot match any routes. URL Segment: 'xxx'. Tuy nhiên nội dung ở từng trang VẪN đang hiển thị là trang danh sách phone mặc định. Nguyên do là vì chúng ta mặc dù đã load các component tương ứng, nhưng ở phần view của app.component.ts hiện tại vẫn đang set tĩnh là : 
```
<app-items-list></app-items-list>.

```
Để hiển thị nội dung tương ứng của component đã load, chúng ta sẽ cần dùng component có tên là router-outlet, nội dung của component đã được chỉ định được load cùng với url path sẽ được nằm trong đây. Sở dĩ phải đưa vào một component riêng như vậy vì không phải lúc nào chúng ta cũng muốn thay đổi nguyên nội dung cả trang khi url path mới được load, mà thông thường chỉ cần thay đổi một phần trong trang. Sử dụng router-outlet sẽ giúp ta chỉ định rõ phần thay đổi và kiểm soát nội dung trong trang tốt hơn.
Để hiển thị nội dung thay đổi theo từng trang, sửa file app.component.html như sau :
```
<app-navigation></app-navigation>
<router-outlet></router-outlet>

```
Sau đó nếu vào từng trang:
- https://angular-xnpuwu.stackblitz.io/phones, 
- https://angular-xnpuwu.stackblitz.io/phones/new, 
- https://angular-xnpuwu.stackblitz.io/1/edit, 
- https://angular-xnpuwu.stackblitz.io/cart, 
chúng ta sẽ thấy nội dung đã được thay đổi. Tuy nhiên vẫn còn một số vấn đề sau :
Trang chủ không hiển thị nội dung gì  
(https://angular-xnpuwu.stackblitz.io/)
2 trang https://angular-xnpuwu.stackblitz.io/phones/new 
và https://angular-xnpuwu.stackblitz.io/1/edit đang hiển thị nội dung giống nhau, chưa tùy biến them params
Giữa các trang chưa có liên kết đến nhau. Muốn truy cập phải gõ trực tiếp trên url, tuy nhiên lúc đó Angular app lại load lại từ đầu rất mất thời gian.
Tiếp theo sau đây sẽ xử lý từng nội dung một.
# 3. Thiết lập nội dung cho root path
## Set Root Route
Hiện tại, khi vào https://angular-xnpuwu.stackblitz.io/ chúng ta sẽ không thấy nội dung gì, sở dĩ như vậy vì chúng ta chưa khai báo component khi load với root path, chúng ta có thể sửa bằng cách thêm vào const Routes trong app.modules.ts như sau :
```
const routes: Routes = [
  { path: '', component: ItemsListComponent }, // thêm dòng này
  { path: 'phones', component: ItemsListComponent },
  { path: 'phones/:id/edit', component: ItemFormComponent },
  { path: 'phones/new', component: ItemFormComponent },
  { path: 'cart', component: CartComponent }
];
```
Lúc này trang https://angular-xnpuwu.stackblitz.io/ sẽ hiển thị nội dung của ItemsListComponent như ta mong muốn. Tuy nhiên có thể thấy là ItemsListComponent bị khai báo trùng 2 lần, chúng ta có thể sử dụng cách khác để khi người dùng vào rootPath sẽ tự động chuyển sang /phones path, gọi là Redirect
## Set Redirect
Thay vì định nghĩa lại component sẽ load khi vào rootPath, chúng ta sẽ set lệnh redirect như sau:
```
const routes: Routes = [
  { path: '', redirect: 'phones', pathMatch: 'full' }, // thêm dòng này
  { path: 'phones', component: ItemsListComponent },
  { path: 'phones/:id/edit', component: ItemFormComponent },
  { path: 'phones/new', component: ItemFormComponent },
  { path: 'cart', component: CartComponent }
];
```
Lúc này khi truy cập https://angular-xnpuwu.stackblitz.io/ chúng ta sẽ tự động được điều hướng sang trang https://angular-xnpuwu.stackblitz.io/phones và hiển thị danh sách các điện thoại như lúc đầu.
Sử dụng cách nào trong 2 cách trên là tuỳ vào nhu cầu của các bạn, tuy nhiên cần lưu ý khi thiết lập redirect, chúng ta nên set giá trị pathMatch: full, vì mặc định Angular sẽ load URL Path theo prefix, do đó path: '' sẽ là prefix của tất cả các url khác, bao gồm cả /phones nên khi set redirect mà không set pathMatch: full, chúng ta sẽ tạo ra vòng lặp vô hạn giữa rootPath và component cần redirect. Bug này cũng đã được Angular detect và hiển thị nếu chẳng may các bạn có gặp phải.
![](https://images.viblo.asia/bfac6419-071e-463c-9290-0548616a965e.png)
## Thiết lập routerLink
Giờ chúng ta đã có đầy đủ các URL cần thiết, đồng thời Angular cũng đã load các component tương ứng khi chúng ta truy cập các URL đó. Tuy nhiên để ý là mỗi lần truy cập từng URL, app lại phải loading lại từ đầu (phần Loading App hiển thị lúc đầu). Ngoài ra chúng ta cũng chưa truy cập được các trang cần thiết từ trang danh sách sản phẩm. Để khắc phục điều này, chúng ta sẽ cần đến directive có tên là routerLink của Angular với cách sử dụng như sau:
#ở file navigation.component.ts, thay đổi phần template thành như dưới đây
```
template: `
<div class="navbar navbar-default">
  <div class="navbar-nav-scroll">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" [routerLink]="['phones']">Phone List</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['cart']">Shopping Cart</a>
      </li>
    </ul>
  </div>
</div>
  `,

```
Chúng ta đã thêm thuộc tính [routerLink] ở Phone List và Shopping Cart. Lúc này khi click vào tab Phone List hoặc Shopping Cart trên giao diện, thì ItemsListComponent và CartComponent sẽ được hiển thị, và KHÔNG xuất hiện giao diện Loading app cũng như biểu tượng loading trên browser ko thay đổi. Đấy chính là vì directive này đã thay thế việc load trang mặc định bằng Javascript code, đồng thời cập nhật url address trên browser. Còn thực tế thì ta vẫn chưa hề rời khỏi Angular Application.
Tuy nhiên navigation bar khi vào trang Cart vẫn đang hiển thị active ở Phone List. Để khắc phục điều này chúng ta sẽ sử dụng thêm 1 directive khác có tên là RouterLinkActive :
#ở file navigation.component.ts, thay đổi phần template thành như dưới đây
```
template: `
<div class="navbar navbar-default">
  <div class="navbar-nav-scroll">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['phones']" routerLinkActive="active">Phone List</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['cart']" routerLinkActive="active">Shopping Cart</a>
      </li>
    </ul>
  </div>
</div>

```
RouterLinkActive sẽ thêm các class được định nghĩ trong phần value (ở đây là 1 giá trị, trong trường hợp nhiều giá trị có thể dùng mảng) cho element gắn với nó khi route tương ứng được load. Kết quả là khi vào/phones hoặc /cart thì trạng thái active của từng tab sẽ được hiển thị tương ứng.
Vậy là chúng ta đã biết cách sử dụng RouterLink để điều hướng trong Angular App, tiếp tục làm với các phần còn lại:
#file items-list.component.ts
```
...
<a class="btn btn-primary" routerLink="new">Create new Phone</a>
...

```
#file item.component.ts
```
...
<a href="#" class="btn btn-secondary" [routerLink]="[item.id, 'edit']">Edit</a>
...

```
#file item-form.component.ts
```
....
<a class="btn btn-secondary" routerLink="/phones">Cancel</a>
…
```
Để ý là ở phần link cho nút cancel, mình đã viết thay vì chỉ viết "phones". Sở dĩ như vậy vì RouterLink mặc định sẽ lấy path theo dạng đường dẫn tương đối (relative path) với url hiện tại, sử dụng / sẽ giúp chúng ta tạo ra đường dẫn tuyệt đối (absolute path) với app -> trỏ đúng về /phones, còn nếu set phones sẽ trỏ về /phones/:id/edit/phones -> không tồn tại.
![](https://images.viblo.asia/b0a7607c-6a17-4001-907a-cdb9a4884298.png)
Sau khi hoàn thành, ta có thể truy cập vào trang tạo mới, chỉnh sửa, tuy nhiên 2 trang này đang hiển thị cùng một nội dung chứ không hiển thị từng item để chúng ta edit hoặc tạo mới. Chúng ta sẽ phải làm thêm bước load data vào component tương ứng thông qua url path.
Load data từ URL thông qua snapshot
Với trang edit sản phẩm, ta sẽ cần load item tương ứng với id của sản phẩm. Để làm được việc này, trong item.component.ts cần load Component chứa thông tin của Route hiện tại, có tên gọi là ActivatedRoute.
#item-form.component.ts
```
...
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from './item.service';
...
export class ItemFormComponent  {
  item: Item;
  constructor(private route: ActivatedRoute, private itemService: ItemService, private router: Router) {}
  ngOnInit() {
    const itemId = +this.route.snapshot.params['id'];
    this.item = this.itemService.getItem(itemId);
  }
  onSaveItem() {
    this.itemService.updateItem(this.item);
    this.router.navigate(['']);
  }
}
...

```
Sử dụng ActivatedRoute, thông qua thuộc tính snapshot, chúng ta có thể truy cập được giá trị của tham số id trong URL và lấy ra item tương ứng với id đó, và hiển thị lên trên form. Ở đây chúng ta mới sử dụng thuộc tính params để lấy ra id của item. ActivatedRoute còn cung cấp 2 loại dữ liệu nữa là:
queryParams : lấy data là các params trên url sau dấu hỏi (?id=1&name=2 sẽ set snapshot.queryParams = {id: '1', name: '2'}
fragment : lấy data là giá trị nằm sau dấu # trên url (#setting sẽ set snapshot.fragment = 'fragment'
Thêm một lưu ý nữa là tất cả các giá trị trong params, queryParam hay fragment đều là String, do đó sẽ cần convert về kiểu dữ liệu tương ứng (number, boolean, ...) khi gọi hàm xử lý tham số có kiểu dữ liệu khác string.
Đồng thời trong phần này, chúng ta còn sử dụng thêm một class Router để điều hướng (navigate) sau khi đã lưu item.
Với hàm navigate, chúng ta sẽ định nghĩa từng url path vào từng item trong mảng truyền vào, với đường dẫn là tương đối với Root Path (do đó nên mình để trống có ý nghĩa là quay về trang chủ, sau đó sẽ được redirect sang trang phones do đã setting ở trên). Chúng ta cũng có thể set đường dẫn tương đối với ActivatedRoute đang được load thông qua thuộc tính relativeTo như sau :
this.router.navigate(['../..'], {relativeTo: this.route});

Chúng ta đang ở /phones/1/edit, do đó set path thành ../../ sẽ giúp chúng ta quay về 2 level của path -> về phones, các bạn cũng có thể set thành ../../.. thì cũng sẽ quay về trang chủ rồi lại redirect sang /phones. Tuy nhiên nếu chỉ set .. thì sẽ báo lỗi vì chúng ta ko có route /phones/1.
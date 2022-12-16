### Khởi tạo một ứng dụng Angular4
Chúng ta sẽ bắt đầu từ đầu. Hãy đảm bảo rằng máy bạn đã cài Node.js, hoặc nếu chưa thì có thể down và làm theo hướng dẫn ở đây https://nodejs.org/en/. Sau khi xong, bạn chạy `node -v` để kiểm tra lại, nó sẽ trả về version Node.js đang được sử dụng trong máy. 

Chúng ta còn cần cài đặt cả `npm`, tuy nhiên từ phiên bản Node.js v0.6.3, bản cài đặt Node.js được tích hợp luôn `npm` do đó khi cài đặt chúng ta chỉ cần cài Node.js là đã có `npm`. Chạy lệnh `npm -v` để kiểm tra version. Chú ý, vì phiên bản của Node.js ra chậm hơn so với `npm` do đó, khi cài đặt bằng bộ cài Node.js, chúng ta nên thực hiện cập nhật để có được phiên bản `npm` mới nhất bằng câu lệnh `npm install npm@latest -g`.

Giờ chúng ta đã sẵn sàng cài đặt Angular:
```
$npm install -g @angular/cli
```
Tiếp theo tạo project:
```
$ng new my_new_project
$cd my_new_project
```
Tiếp theo chạy server (http://localhost:4200)
```
$ng serve
```
### Ứng dụng Angular 4
Nếu nhìn vào trong thư mục vừa tạo, bạn có thể thấy nó đã tự sinh ra một vài component và module.
![](https://images.viblo.asia/e2b28fb1-5dba-4647-9dfe-f43223c503ea.png) 

Một ứng dụng Angular được tạo nên từ nhiều component. Các component có thể viết lồng vào nhau để tạo nên một trang single page. `app.component.ts` là component gốc. 

Trong khi đó, `module` chứa các phần khác của ứng dụng, như là controller, service, filter, directive, nó cũng là nơi import các module cần thiết và xác định các provider và component. Trong ứng dụng của chúng ta thì `app.module.ts` là module gốc.

Còn file `.html` và `.css` thì như mọi người vẫn biết. Còn nếu chưa biết thì `.html` là nơi chúng ta thêm vào những gì chúng ta muốn thấy ở view, còn `.css` sẽ khiến các thẻ tag đẹp hơn và tạo nên sự khác biệt giữa các phần mà chúng ta đã thêm vào file `.html`. 

File `.spec` có thể tạm thời bỏ qua, vì chúng ta sẽ không dùng đến trong bài viết này.
### Kết nối API tới ứng dụng
Bắt đầu với file `app.component.ts`, đây là nơi chúng ta sẽ gọi API. Trước đó chúng ta cần đảm bảo đã import đầy đủ các module cần thiết vào file module
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
Chúng ta cũng cần import các thư viện cần thiết vào file component
```
import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
```
Chúng ta cần `http` - một lớp để thực hiện các http request, cũng tương tự với `response`, khi http request thành công sẽ trả về một response.

**Lưu ý:** Nếu bạn không sử dụng `rxjs-compat`  (`npm install --save rxjs-compat`), bạn có thể thay `map(...)` bằng `pipe(map(...))`, thay `import 'rxjs/Rx';` bằng `import { map } from 'rxjs/operators';`

Component của chúng ta sẽ như sau:
```
export class AppComponent {
  private apiURL = 'https://api.unsplash.com/photos'
  
  photos: any = {};
    
  constructor(private http: Http) {
    this.getPhoto();
  }
    
  getData() {
    return this.http.get(this.apiURL).map((response: Response) => response.json())
  }
    
  getPhoto() {
    this.getData().subscribe((data) => {
      console.log(data);
      this.photos = data;
    })
  }
}
```
Đây là một đoạn code để lấy ảnh về thông qua API. Tiện thể thì trang https://unsplash.com/ là một trang public api khá dễ sử dụng, bạn có thể thực hành với nó ngay sau khi đọc xong bài viết này. 

Đầu tiên ta gán link gọi API cho `apiUrl` và set nó thành private. Nếu bạn thắc mắc sao lại phải để private, thì là để chỉ có thể gọi đến nó trong lớp AppComponent. 

Tiếp theo là viết phương thức (`getData()`) để lấy phản hồi từ API. `.map` sẽ giúp chúng ta tương tác với dữ liệu trả về, dữ liệu sẽ được trả về dưới dạng JSON nên chúng ta gọi đến phương thức `.json` để chuyển nó thành object.

Sau đó chúng ta cần một nơi để chứa dữ liệu để có thể show ra, vì vậy mình sẽ gán nó vào một biến mới bằng cách sử dụng `.subsribe()`. Ở đây mình gọi là `data` nhưng bạn có thể gọi bằng bất cứ tên nào bạn muốn, và gán nó vào `this.photos`.

Vậy là chúng ta đã liên kết thành công API với ứng dụng Angular. Quá là đơn giản nhỉ. Hãy xem nó hoạt động thế nào nhé. 
### Hiển thị dữ liệu
Nếu bạn chạy server và mở browser, chọn inspect, bởi vì mình đã đặt `console.log(data)` nên bạn sẽ thấy `data` mà API trả về thế nào. Vậy làm thế nào để hiển thị data ấy ra? Một lần nữa, nó đơn giản hơn bạn nghĩ nhiều.

Ở Angular 4 có directive gọi là `*ngFor`, nó tương tự như vòng lặp `for` mà bình thường chúng ta hay dùng. 
```
<div *ngFor="let data of photos; let i = index">
  <div>
    <img src="{{ data.urls.regular }}" [routerLink]="['/photo', data.id]"/>
    <div>
      <div>
        <a [routerLink]="['/user', data.user.username]">
          <img src="{{ data.user.profile_image.small }}">
        </a>
      </div>
      <div>
        <a [routerLink]="['/user', data.user.username, 'photos']">{{ data.user.name }}</a>
      </div>
    </div>
  </div>
</div>
```
Thêm một vài css cho lung linh, và đây là kết quả:
![](https://images.viblo.asia/155b8aff-abb8-42d3-a8cf-fe85d8673fb7.png)
Đối với những API public thì để liên kết API vs Angular 4 nó chỉ có vậy, còn phức tạp hơn nó có thể yêu cầu Authorization, bạn phải thêm nó vào Header khi gọi API, hoặc là truyền params với phương thức post hay put. Ví dụ như:
```
setHeader() {
  private aipUrl = "https://api.unsplash.com/me"

  return new Headers({
    'Authorization': 'Bearer 1b30cbcba47d88f9428b37136cc3135517b9155de770c5c066d6ecf71ed9e44b'
  })
}

getDataUser() {
  const headers = this.setHeader();
  return this.http.get(this.aipUrl, { headers: headers }).map((response: Response) => response.json())
}

putDataUser(params: any) {
  const headers = this.setHeader();
  return this.http.put(this.aipUrlUser, params, { headers: headers }).map((response: Response) => response.json())
}
```
Mong rằng bài viết này sẽ có ích với bạn. Và đừng ngại upvote nếu bạn thấy nó có ích nhé! :3

Nguồn tham khảo: https://medium.com/craft-academy/connecting-an-api-to-an-angular-4-front-end-application-e0fc9ea33202
## Lời tựa
Trong [bài viết trước](https://viblo.asia/p/kien-thuc-ve-lazy-loading-images-ma-ban-can-biet-ByEZk28WKQ0) của mình về lazy-loading images, mình đã giới thiệu chi tiết cả về lý thuyết lẫn thực hành kèm với các kĩ thuật khác nhau. Tuy nhiên nếu bạn đang lúng túng chưa biết cách tích hợp vào dự án sử dụng framework **Angular**, thì bài viết này sẽ hướng dẫn các bạn tự tay xây dựng một angular module đơn giản hỗ trợ lazy-load images mà không cần sử dụng thư viện bên ngoài. Để tránh làm bài viết quá dài, mình sẽ chỉ trình bày về phần **hướng tiếp cận** và **thiết lập** chứ không giải thích lại về "lazy-loading images" là gì nữa nhé.

Vẫn như mọi lần, bạn có thể đọc bài viết gốc của mình tại đây: https://phucluong.com/angular-tu-xay-dung-module-lazy-load-images/

## Online Demo
Nếu bạn không muốn đọc bài viết dài dòng thì có thể xem online demo tại đây: [https://stackblitz.com/edit/angular-lazy-load-images-module](https://stackblitz.com/edit/angular-lazy-load-images-module)

## Trước khi bắt đầu
Trở lại với phong cách hay nói dông dài của mình 😅, mình sẽ phân tích một tí về vấn đề chúng ta sẽ code sắp tới đây. Nếu các bạn muốn thực hành ngay thì có thể bỏ qua phần này.

Trước khi bắt đầu, bạn nên tự hỏi xem project của bạn có phải hỗ trợ các browser cũ hay không:

* Nếu KHÔNG: bài viết này không cần thiết nữa vì browser hiện đại đã [chính thức hỗ trợ lazy-loading images](https://viblo.asia/p/kien-thuc-ve-lazy-loading-images-ma-ban-can-biet-ByEZk28WKQ0) với thuộc tính `loading="lazy"`
* Nếu KHÔNG nhưng bạn vẫn cần lazyload ảnh nền (background-image): bài viết này sẽ giúp bạn.
* Nếu CÓ: không phải nói nhiều, chiến thôi.

``` html
<!-- Thật tốt nếu bạn không phải support IE -->
<img src="sample.png" loading="lazy">
```

Bạn có thể kiểm tra xem browser nào đã chính thức hỗ trợ thuộc tính `loading="lazy"` tại [Can I Use](https://caniuse.com/#feat=loading-lazy-attr).

## Hướng tiếp cận với `directive`
Nếu các bạn đã làm việc với Angular một thời gian, thì sẽ dễ dàng đoán được **directive** là hướng tiếp cận phù hợp với bài toán này. Tuy nhiên việc sử dụng **directive** cũng có 2 cách như sau:

* Nhúng directive trực tiếp vào `app.module.ts` để có thể sử dụng bất kì chỗ nào.
* Tạo một module riêng biệt và nhúng directive vào module đó. Chỗ nào cần sử dụng thì nhúng module đó vào.

Bạn chọn cách nào cũng được, nhưng thông thường mình sẽ chọn cách số 2 theo practice của team mình. Bài viết này mình sẽ thực hiện theo cách số 2 nhé.

## Chọn kĩ thuật nào để lazy-load images?
Mình đã thống nhất sử dụng **directive** rồi, nhưng bên trong **directive** mình sẽ sử dụng kĩ thuật gì để lazy-load images (trong [bài viết trước](https://viblo.asia/p/kien-thuc-ve-lazy-loading-images-ma-ban-can-biet-ByEZk28WKQ0) mình có đề cập đến 3 kĩ thuật đấy)? Câu trả lời là mình sẽ sử dụng cả native và Intersection Observable API nhé. Logic code sẽ như sau:

1. Nếu browser có hỗ trợ thuộc tính `loading="lazy"`, thì chúng ta tận dụng lợi thế này và để cho browser làm công việc của mình.
2. Nếu browser không hỗ trợ, hoặc là bạn đang muốn lazy-load ảnh nền (background image), thì chúng ta sẽ fallback về Intersection Observable API.

Thông tin thêm cho bạn, nếu bạn muốn support IE thì cần sử dụng [polyfill](https://www.npmjs.com/package/intersection-observer) hoặc có thể chuyển sang dùng kĩ thuật scroll event handler. Các bạn kiểm tra tính tương thích của Intersection Observable tại [Can I Use](https://caniuse.com/#feat=intersectionobserver).

Tất cả sẽ được code trong phần tiếp theo.

## Bắt tay vào code module images-lazyload
Mình sẽ khởi tạo một project Angular rỗng để thực hành nhé. Các bạn khởi tạo dự án với tên là "angular-demo-lazyload":

`ng new angular-demo-lazyload`

Tiếp theo, bạn cần tạo một nơi để chứa module lazy-load. Bạn tạo thư mục tên là "shared" và các file cho directive, service và module như bên dưới.

```
app/
├── shared/
│   └── images-lazyload/
│       ├── images-lazyload.directive.ts
│       ├── images-lazyload.service.ts
│       └── images-lazyload.module.ts
│
├── app.component.html
├── app.component.scss
├── app.component.ts
└── app.module.ts
```

Giờ thì code thôi, mình có đặt comment chi tiết bên trong code rồi nên sẽ không giải thích nhiều nữa.

Đầu tiên là `images-lazyload.directive.ts`, chúng ta tận dụng thuộc tính `loading` để làm directive selector luôn.

``` javascript
import { Injector, Directive, ElementRef } from '@angular/core';
import { ImagesLazyloadService } from './images-lazyload.service';

@Directive({
  // Tận dụng thuộc tính "loading" làm directive selector
  // Bạn có thể thay đổi thành "img[loading], div[loading]" nếu chỉ muốn target đến thẻ img và div
  selector: '[loading]',
})
export class ImagesLazyloadDirective {

  constructor(
    private injector: Injector,
    private el: ElementRef,
  ) {
    const img = this.el.nativeElement;

    // Nếu browser đã support thuộc tính "loading", chúng ta không cần phải làm gì thêm nữa, hãy để nó làm công việc của nó.
    // Tuy nhiên nếu element không phải là img (nó là background image), thì fallback về intersection observable
    if ('loading' in HTMLImageElement.prototype && img.tagName.toLowerCase() === 'img') {
      img.src = img.dataset?.src;
    } else {
      // fallback sử dụng intersection observable API
      const lazyService = this.injector.get(ImagesLazyloadService);
      lazyService.observe(img);
    }
  }
}
```

Tiếp theo là `images-lazyload.service.ts`, phần core của Intersection Observable. Nếu bạn muốn lazy-load với scroll thì chỉ cần thay logic bên trong là được.

``` javascript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesLazyloadService {
  private observer: IntersectionObserver;

  constructor() {
    this.init();
  }

  private init() {
    // Khởi tạo
    this.observer = new IntersectionObserver((entries, imgObserver) => {
      entries.forEach(entry => {
        // chưa đến viewport, dừng sớm bớt đau khổ
        if (!entry.isIntersecting) {
          return;
        }

        // src được lưu trong data-src, chúng ta copy nó vào src là xong.
        const lazyImage = entry.target as HTMLImageElement;
        const src = lazyImage.dataset.src;

        // nếu ảnh là thẻ img, copy vào src
        // nếu ảnh là background image, copy vào background-image
        lazyImage.tagName.toLowerCase() === 'img'
          ? lazyImage.src = src
          : lazyImage.style.backgroundImage = 'url(\'' + src + '\')';

        // xong việc thì nên dọn dẹp
        lazyImage.removeAttribute('lazy');

        // tiếp tục dọn dẹp
        imgObserver.unobserve(lazyImage);
      });
    });
  }

  observe(target: Element) {
    // "trải chiếu nằm chờ" tấm ảnh scroll tới viewport
    this.observer.observe(target);
  }
}
```

Cuối cùng là `images-lazyload.module.ts`, chỉ là khai báo thôi, không có gì đặc biệt.

``` javascript
import { NgModule } from '@angular/core';
import { ImagesLazyloadDirective } from './images-lazyload.directive';

@NgModule({
  declarations: [ImagesLazyloadDirective],

  // chúng ta chỉ cần export directive để sử dụng, không cần export service ra ngoài
  exports: [ImagesLazyloadDirective],
})
export class ImagesLazyloadModule { }
```

## Sử dụng module images-lazyload
Chúng ta đã tạo xong module của lazyload rồi. Nó sẽ như là một thư viện do chính bạn tạo ra vậy, và bạn chỉ cần nhúng vào nơi mà bạn muốn sử dụng. Ở đây mình sẽ nhúng vào `app.module.ts`.

``` javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ImagesLazyloadModule } from './shared/images-lazyload/images-lazyload.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ImagesLazyloadModule, // nhúng vào đây
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

Bây giờ thì chúng ta có thể sử dụng được rồi. Trong `app.component.html`, chúng ta hãy thử lazy-load một loạt các tấm ảnh, bao gồm cả thẻ `img` và ảnh nền sử dụng thẻ `div`. Các bạn để ý là mình không lazy-load 2 tấm ảnh đầu tiên để tránh lỗi layout-shift. Như có chia sẻ trong [bài viết trước](https://viblo.asia/p/kien-thuc-ve-lazy-loading-images-ma-ban-can-biet-ByEZk28WKQ0), các bạn không nên lazy-load các tấm ảnh above-the-fold nhé.

``` html
<img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=753&q=80" width="753" height="500">
<img src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=753&q=80" width="753" height="500">

<!-- lưu ý là KHÔNG sử dụng thuộc tính src="..." nhé -->
<img loading="lazy" data-src="https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=753&q=80" width="753" height="500">
<img loading="lazy" data-src="https://images.unsplash.com/photo-1587502536900-baf0c55a3f74?w=753&q=80" width="753" height="500">
<img loading="lazy" data-src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=753&q=80" width="753" height="500">
<img loading="lazy" data-src="https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=753&q=80" width="753" height="500">
<div loading="lazy" data-src="https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=753&q=80" class="lazy-bg-image"></div>
<div loading="lazy" data-src="https://images.unsplash.com/photo-1487349384428-12b47aca925e?w=753&q=80" class="lazy-bg-image"></div>
<div loading="lazy" data-src="https://images.unsplash.com/photo-1527437934671-61474b530017?w=753&q=80" class="lazy-bg-image"></div>
<div loading="lazy" data-src="https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=753&q=80" class="lazy-bg-image"></div>
```

Với ảnh `img`, mình hard-code luôn chiều rộng và chiều cao để tránh lỗi layout-shift. Đương nhiên cách này chỉ dùng được nếu bạn đã biết chiều rộng và cao của nó thôi nhé. Thực tế việc này nằm ngoài phạm vi bài viết nên mình dùng tạm cách này để demo cho nhanh, chứ ở production mình không nên dùng mà sẽ có những cách khác "xịn xò" hơn.

Với ảnh background sử dụng thẻ `div`, nếu bạn không có content bên trong thì bạn sẽ chẳng thấy gì đâu. Vì thế bạn cần thêm một tí CSS vào file `app.component.scss`

``` css
.lazy-bg-image {
  width: 753px;
  height: 500px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
```

Vậy là xong rồi đấy, cùng chạy thử thôi.

{@youtube: https://www.youtube.com/embed/HxOmoVdfB3c}  

Online demo: [https://stackblitz.com/edit/angular-lazy-load-images-module](https://stackblitz.com/edit/angular-lazy-load-images-module)

## NPM Package
Phần này mình bổ sung thêm nếu bạn nào không thích copy paste và tự maintain code, mà muốn install thư viện bên ngoài để "đảm bảo chất lượng" và hi vọng "họ sẽ maintain giúp mình", thì mình đã publish module trên thành một thư viện nho nhỏ tại đây: [https://github.com/luongvanphuc/ng-lazy-image](https://github.com/luongvanphuc/ng-lazy-image). Phần hướng dẫn cài đặt và sử dụng các bạn vào xem là thấy.

Bạn có thể xem online demo sử dụng thư viện **ng-lazy-image** tại đây: [https://stackblitz.com/edit/angular-ng-lazy-image](https://stackblitz.com/edit/angular-ng-lazy-image)

## Kết bài
Hi vọng bài viết của mình giúp ích cho các bạn Angular developer đang tìm cách lazy-load các tấm ảnh của mình. Nếu thấy hữu ích thì hãy upvote để mình có động lực viết tiếp các bài tiếp theo nhé. Hoặc các bạn có thắc mắc hay góp ý thì vui lòng để lại comment bên dưới.
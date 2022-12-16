Trong quá trình làm việc với angular chắc hẳn ai trong chúng ta cũng từng sử dụng một thư viện nào đó?

Chúng ta có thể code trên local, code của mình chỉ được dùng ở một phạm vi nào đó trong project, nhưng nếu các bạn thấy code của mình có thể ứng dụng được ở phạm vi rộng hoặc chưa có một thư viện nào giải quyết được vấn đề đó thì hãy nghĩ đến việc đóng góp cho cộng đồng bằng library.

Việc tạo một thư viện cho angular trước đây khá khó khăn do chưa được hỗ trợ nhiều, tuy vậy những version mới của angular CLI đã hỗ trợ lập trình viên có thể publish thư viện một cách dễ dàng hơn bao giờ hết.

Bài viết này mình sẽ hướng dẫn các bạn các bước để tạo và publish một thư viện cho angular sử dụng angular CLI API.

### Cài đặt
Để bắt đầu, hãy update angular lên version mới nhất hoặc version 6 trở lên.

```shell
ng -v
```

Bạn có thể chạy lệnh sau để cài đặt angular version mới nhất:

```shell
npm install -g @angular/cli@latest
```

```shell
$ ng --version
     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/

Angular CLI: 7.0.6
Node: 8.9.1
OS: linux x64
Angular: 
... 
Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.10.6
@angular-devkit/core         7.0.6
@angular-devkit/schematics   7.0.6
@schematics/angular          7.0.6
@schematics/update           0.10.6
rxjs                         6.3.3
typescript                   3.1.6
```

Trong bài viết này mình muốn demo một thư viện nhỏ hỗ trợ format đoạn văn bản:
Hãy kiểm tra tên thư viện bằng cách vào trang [https://www.npmjs.com/package/](https://www.npmjs.com/package/<lib-name>)

Bạn có thể gõ trên url hoặc search trên trang để kiểm tra xem tên thư viện đã tồn tại hay chưa.

![](https://images.viblo.asia/68c12bd8-4aab-4cb8-b617-3b8253f92dae.png)

Hãy chọn một cái tên phù hợp để tạo thư viện. Như ở đây mình thấy tên format-paragraph chưa được dùng nên mình sẽ sử dụng tên này!

### Create project:

```shell
ng new format-code-app
```
```shell
cd format-code-app
```

Generate thư viện bằng lệnh sau:
```shell
ng generate library format-paragraph
```

Lệnh trên sẽ generate cho chúng ta:
- Một bản mẫu và các cài đặt có liên quan trong thư mục root của project.
- Update angular.json với các cài đặt cần thiết để build và test cho thư viện của chúng ta.
- Cài đặt các package cần thiết để build thư viện.

Xem qua cấu trúc thư mục, chúng ta có thể thấy một cấu trúc thư mục mới:

- ng-package.json — File cấu hình được sử dụng bởi [ng-packagr](https://github.com/dherges/ng-packagr) để xây dựng project của chúng ta

- package.json —  Các thông tin về thư viện của chúng ta sẽ nằm ở đây, cũng như các dependencies sẽ nằm  trong đây.

- src/public_api.ts — Tất cả các file cần thiết để sử dụng sau khi compile thư viện đều cần được export ở đây.

- src/lib — Mã code của thư viện.

### Code

Khám phá thư mục ```src/lib```. ở đây generate ra các file gồm có: ```component.spec, component, module, service, service.spec``` và file src/public_api.ts sẽ export các file này.

Code chính của thư viện này nằm trong ```format-paragraph-component.ts```
Ở đây mình muốn format lại màu sắc một đoạn văn bản sử dụng @Input color:

File ```format-paragraph-component```:

```typescript
import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'format-paragraph',
  template: `
    <div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    div {
      padding: 20px;
      margin: 10px auto;
      box-shadow: 1px 3px 10px 1px rgba(0, 0, 0, 0.3);
      border-radius: 7px;
    }
  `]
})
export class FormatParagraphComponent implements OnInit {
  @Input() color: string = "rgb(42,100,250)"
  @Input() bgColor: string = "rgba(0,0,30,0.9)"
  @Input() font: string = "consolas, monospace"
  constructor(private renderer: Renderer2, private el: ElementRef) { }
  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement.firstElementChild, 'color', this.color)
    this.renderer.setStyle(this.el.nativeElement.firstElementChild, 'backgroundColor', this.bgColor)
    this.renderer.setStyle(this.el.nativeElement.firstElementChild, 'font-family', this.font)
  }
}
```

Ngay trong thư mục của project, chúng ta tiến hành build:

*Các bạn lưu ý build tên thư viện chứ không phải build project phía ngoài nhé*


```shell
ng build format-paragraph
```

```shell
Building Angular Package
Building entry point 'format-paragraph'
Compiling TypeScript sources through ngc
Bundling to FESM2015
Bundling to FESM5
Bundling to UMD
Minifying UMD bundle
Copying declaration files
Writing package metadata
Removing scripts section in package.json as it's considered a potential security vulnerability.
Built format-paragraph
Built Angular Package!
 - from: /home/uy/demo/demo-app/projects/format-paragraph
 - to:   /home/uy/demo/demo-app/dist/format-paragraph
```

Để ý file tsconfig.json đã có thư viện sau khi generate, build xong thì chúng ta có thể sử dụng module FormatParagraph trong project.

```
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "module": "es2015",
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es5",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "es2018",
      "dom"
    ],
    "paths": {
      "format-paragraph": [
        "dist/format-paragraph"
      ],
      "format-paragraph/*": [
        "dist/format-paragraph/*"
      ]
    }
  }
}
```

Sử dụng thư viện bằn cách import module FormatParagraphModule trong app.module.ts:
```import { FormatParagraphModule } from 'format-paragraph';```
```
NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormatParagraphModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```
Trong app component html:

```html
<h5>Formated paragraph:</h5>
<format-paragraph>
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam impedit architecto quibusdam nostrum cum vel porro in aliquid harum incidunt, dicta reprehenderit nulla, ipsum fugiat illo qui, error veniam obcaecati.
</format-paragraph>
```

Kết quả:

![](https://images.viblo.asia/3efe9d0d-d5a5-428c-b8c4-bf360e461bc7.png)

### Publish thư viện:
Để publish thư viện cần có account npm, nếu chưa có tài khoản hãy đăng ký một tài khoản cho mình: [https://www.npmjs.com/signup](https://www.npmjs.com/signup)


```shell
cd dist/format-paragraph
npm login
npm publish --access public
+ format-paragraph@0.0.1
```

Vậy là thư viện đã được publish thành công, chúng ta có thể cài đặt bằng cách chạy lệnh sau:

```shell
npm i format-paragraph
```

Như vậy là mình đã tạo thành công một thư viện angular nhỏ.
Thank for reading!

Tham khảo: https://github.com/angular/angular-cli/wiki/stories-create-library
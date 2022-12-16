### I. Mở đầu
- Phân trang, chắc chẳng quá xa lạ với mọi người, hầu hết mọi người đều xử dụng thư viện để phân trang
- Nhưng trong bài viết này mình sẽ chia sẻ về cách phân trang "bằng tay" trong handlebarjs

### II. Tạo app
- chúng ta sử dụng lệnh `nest new app-paginate` để tạo app nest tên app-paginate
- trong lúc tạo, ta sẽ thấy có 2 option chọn cách quản lý package là: npm và yarn
- mình sẽ chọn yarn
- sau khi có được app, ta cd vào trong và thêm package hbs (handlerbarsjs), đây là một engine views khá nổi tiếng vì độ tiện dụng và sử dụng dễ dàng
- đây là project của mình sau khi tạo, có một số file dưới hình là mình tạo thêm, không có trong lúc tạo như: `views/items/index.hbs`, app.helper.ts, ...

![](https://images.viblo.asia/687191c4-96a7-426e-bdd4-ce6d72a04583.PNG)

### III. Tạo controller và fake dữ liệu trả về cho view
- Bên controller
```markdown
import { Controller, Get, Query, Render, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('items/index') // Render là sau khi controller return giá trị trả về sẽ trỏ tới views, với path trong render (tương ứng views/items/index)
  getItems(@Query() { page, count }, @Req() req) {
    const [items, pagyInfo] = this.appService.getItems(page, count);

    return { items, ...pagyInfo, req };
  }
}
```

- Bên `app.service.ts` mình sẽ chỉ fake dữ liệu cho tiện, chứ không truy vấn vào db để lấy, vì nó không cần thiết trong bài này
```java
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getItems(page, count) {
  // vì param được truyền lấy từ url nên nó sẽ có kiểu string, vì vậy mình cần parse nó sang kiểu int
    page = parseInt(page) < 1 || parseInt(page) > 10 ? 1 : page;
    const itemCount = parseInt(count) < 1 ? 5 : parseInt(count);
    const items = [];
    for (
      let index = page * itemCount - itemCount + 1;
      index <= page * itemCount;
      index++
    ) {
      items.push({ name: `name_${index}` });
    }
    return [items, { page, count, pageCount: 10 }];
  }
}
```

### IV. Tạo view tĩnh
- Template mình dùng là [tailwind](https://www.tailwindtoolbox.com/)
```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <title>App</title>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css">
  <link href="https://unpkg.com/tailwindcss/dist/tailwind.min.css" rel="stylesheet">
</head>

<body>
  <table>
    <thead>
      <th>Name</th>
    </thead>
    <tbody>
      <tr>
        <td>name_1</td>
      </tr>
      <tr>
        <td>name_22</td>
      </tr>
      <tr>
        <td>name_3</td>
      </tr>
      <tr>
        <td>name_4</td>
      </tr>
      <tr>
        <td>name_5</td>
      </tr>
    </tbody>
  </table>
  <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
    <div>
      <nav class="relative z-0 inline-flex shadow-sm">
        <a href="#"
          class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
          aria-label="Previous">
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd" />
          </svg>
        </a>
        <a href="#"
          class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
          1
        </a>
        <a href="#"
          class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
          2
        </a>
        <a href="#"
          class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
          3
        </a>
        <a href="#"
          class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
          4
        </a>
        <a href="#"
          class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
          5
        </a>
        <span
          class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">
          ...
        </span>
        <a href="#"
          class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
          8
        </a>
        <span <a href="#"
          class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
          aria-label="Next">
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd" />
          </svg>
          </a>
      </nav>
    </div>
  </div>
</body>

</html>
```
Giao diện:

![](https://images.viblo.asia/21d213e9-6240-4854-82fa-8e6f3c0ab365.PNG)

### VI. Đổ dữ liệu vào view
- `#items` và `/items` là kiểu block, và bên trong block ta lấy thuộc tính của từng item ra `{{name}}`
```html
<table>
    <thead>
      <th>Name</th>
    </thead>
    <tbody>
      {{#items}}
      <tr>
        <td>{{name}}</td>
      </tr>
      {{/items}}
    </tbody>
  </table>
```

### VII. Tạo helper để hỗ trợ việc paginate
- Tạo một file với têm `app.helper.ts`
-  Đầu tiên ta phải check xem là dữ liệu có hay không, nếu không có thì sẽ không hiện paginate
```cpp
export const hasPagination = pageCount => {
  return pageCount !== undefined && pageCount > 1;
};
```

- Tiếp theo là tạo path, chúng ta sẽ import thêm package `qs`, package này có sẵn trong nestjs nên không cần add thêm vào
- Còn nó là gì thì mọi người có thể xem [tại đây ](https://www.npmjs.com/package/qs), còn nói nôm na là nó giúp chúng ta gộp các query thành param url
```javascript
const pathUrl = (path, query, page) => {
  query.page = page;

  return `${path}?${qs.stringify(query)}`;
};
```

- Sau khi đã có path ta tạo prev page và next page
```javascript
export const previous = (page, path, query) => {
  page = parseInt(page);
  return {
    path: pathUrl(path, query, page - 1),
    class: page === undefined || page <= 1 ? 'pointer-events-none' : null,
  };
};

export const next = (page, pageCount, path, query) => {
  page = parseInt(page);
  return {
    path: pathUrl(path, query, page + 1),
    class: parseInt(page) >= pageCount ? 'pointer-events-none' : null,
  };
};
```

- Tới phần quan trọng nhất :v, tạo ra các trang, nằm trong khoảng từ current page trở về trước 2 trang và trở về sau 2 trang :v
- Hãy giữ vững não, vì đoạn này khá rối :v
```markdown
export const pagy = (currentPage, pageCount, path, query) => {
  const pages = [];
  const offset = 2;
  const pageFirst = 1;
  currentPage = parseInt(currentPage);
  for (
    let index = currentPage - offset; // bắt đầu từ current page trở về trước, lấy ở trang thứ 2
    index <= currentPage + offset; // bắt đầu từ current page trở về sau, lấy trang thứ 2
    index++
  ) {
    if (pageFirst < index && index < pageCount) {
      // chỗ này là để lấy vị trị 5 trang cần show ra ở view
      // và check không cho hiện ra số âm và vượt quá pageCount
      pages.push(index);
    }
  }
  if (pages[0] > offset) pages.unshift(null); // nếu từ vị trí đầu của page show lớn hơn 2 thì thêm null vào đầu, và bên view ta sẽ check nếu null thì sẽ thêm `...` vào
  if (pages[pages.length - 1] <= pageCount - offset) pages.push(null); // tương tự như trên nhưng ở phía ngược lại, ta thêm ở cuối
  pages.unshift(1); // thêm page 1 vào đầu
  pages.push(pageCount); // thêm page cuối vào cuối
  // cuối cùng là return lại các object
  return pages.map(page =>
    page === null
      ? { dot: true } // check dưới view có show `...`
      : {
          page,
          path: pathUrl(path, query, page),
          class:
            page === currentPage
              ? 'bg-blue-500 bg-opacity-50 pointer-events-none'
              : null,
        },
  );
```
- Đăng ký helper ở file main.ts để sử dụng bên view
- import `import * as hbs from 'hbs';`
- Với mỗi hàm thì tương ứng đăng ký từng đấy helper
```sql
hbs.registerHelper('renderButtonPagy', pagy);
hbs.registerHelper('hasPagination', hasPagination);
hbs.registerHelper('previous', previous);
hbs.registerHelper('next', next);
```
### VIII. Sử dụng helper trong view
- Dùng hàm hasPagination truyền pageCount vào xem nó có cần show paginate ra không
```c
{{#if (hasPagination pageCount)}}
    //... 
{{/if}}
```
- Tiếp theo thêm previous và next
```shell
//...
{{#with (previous page req.path req.query)}}
<a href="{{path}}"
  class="{{class}} relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
  aria-label="Previous">
  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd"
      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
      clip-rule="evenodd" />
  </svg>
</a>
{{/with}}
//...
{{#with (next page pageCount req.path req.query)}}
<a href="{{path}}"
  class="{{class}} -ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
  aria-label="Next">
  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clip-rule="evenodd" />
  </svg>
</a>
{{/with}}
```
- vì renderButtonPagy trả về mảng, ta dùng each để lấy giá trị trong nó ra
```shell
//...
{{#each (renderButtonPagy page pageCount req.path req.query)}}
{{#if dot}}
<span
  class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">
  ...
</span>
{{/if}}
{{#if path}}
<a href="{{path}}"
  class="{{class}} -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
  {{page}}
</a>
{{/if}}
{{/each}}
//...
```
- Full code
```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <title>App</title>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css">
  <link href="https://unpkg.com/tailwindcss/dist/tailwind.min.css" rel="stylesheet">
</head>

<body>
  <table>
    <thead>
      <th>Name</th>
    </thead>
    <tbody>
      {{#items}}
      <tr>
        <td>{{name}}</td>
      </tr>
      {{/items}}
    </tbody>
  </table>
  {{#if (hasPagination pageCount)}}
  <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
    <div>
      <nav class="relative z-0 inline-flex shadow-sm">
        {{#with (previous page req.path req.query)}}
        <a href="{{path}}"
          class="{{class}} relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
          aria-label="Previous">
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd" />
          </svg>
        </a>
        {{/with}}
        {{#each (renderButtonPagy page pageCount req.path req.query)}}
        {{#if dot}}
        <span
          class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">
          ...
        </span>
        {{/if}}
        {{#if path}}
        <a href="{{path}}"
          class="{{class}} -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
          {{page}}
        </a>
        {{/if}}
        {{/each}}
        {{#with (next page pageCount req.path req.query)}}
        <a href="{{path}}"
          class="{{class}} -ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
          aria-label="Next">
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd" />
          </svg>
        </a>
        {{/with}}
      </nav>
    </div>
  </div>
  {{/if}}
</body>

</html>
```
- Đây là thành quả

![](https://images.viblo.asia/269e0b03-2c40-4b41-be52-2e354f6f5d7c.PNG)

### IX. Kết
- Mình làm bài này để hiểu rõ về cách hoạt động của paginate, vì trước giờ toàn dùng package ngoài, mong rằng nó cũng có ích cho mọi người :D
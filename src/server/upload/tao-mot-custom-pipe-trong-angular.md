Như các bạn đã biết trong angular bạn có thể sử dụng được một số pipes mặc định đã được cũng cấp sẵn như UpperCasePipe, LowerCasePipe....<br>
Tuy nhiên, nhiều khi chúng ta muốn sử dụng một cái pipe khác ngoài các pipes mặc định mà angular đã cũng cấp sẵn. Trong bài viết này mình sẽ chia sẻ cách tạo một custom pipe trong angular.<br>
Các bạn hãy theo dõi ví dụ bên dưới để hiểu hơn về cách tạo và sử dụng một custom pipe nhé.<br>
1.Đầu tiên hãy chạy command bên dưới để tạo một component với tên là custom-pipe<br>
```
ng g c custom-pipe
```
Sau khi chạy xong, chúng ta được một thư mục custom-pipe chứa các file như bên dưới:<br>
![](https://images.viblo.asia/f5b1cf77-fe82-49bd-8606-4366493415e3.png)

Tiếp tục, mình thêm selector của component mới tạo vào file **src/app/app.component.html** <br>
```
<app-custom-pipe></app-custom-pipe>
```

2.Tiếp tục tạo một file **truncate.ts** trong thư mục custom-pipe với mục đích là trả về giá trị rút gọn với một dấu chấm lửng được thêm vào cuối string.<br>
**src/app/custom-pipe/truncate.ts**<br>
```Javascript
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'truncate'})

export class TruncatePipe implements PipeTransform {
  transform(value: string) {
    return value.split(' ').slice(0, 2).join(' ') + '...';
  }
}
```

3.Cập nhật code trong file **src/app/custom-pipe/custom-pipe.component.ts**<br>
```Javascript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-pipe',
  templateUrl: './custom-pipe.component.html',
  styleUrls: ['./custom-pipe.component.css']
})
export class CustomPipeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  text: string = 'welcome to angular 13!';
}

```
4.Cập nhật code trong file **src/app/custom-pipe/custom-pipe.component.html**<br>
```Javascript
<div class="container">
    <div class="col col-lg-7">
        <table class="table">
            <thead>
              <tr class="table-info">
                <th scope="col">Name Pipe</th>
                <th scope="col">Input</th>
                <th scope="col">Output</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td>use custome pipe:</td>
                    <td>{{ text }}</td>
                    <td>{{ text | truncate }}</td>
                </tr>
            </tbody>
          </table>
    </div>
</div>

```
5.Cập nhật code trong file **src/app/app.module.ts**<br>
Chúng ta sẽ import 2 component **CustomPipeComponent**, **TruncatePipe** vào file này<br>
```Javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomPipeComponent } from './custom-pipe/custom-pipe.component';
import { TruncatePipe } from './custom-pipe/truncate';

@NgModule({
  declarations: [
    AppComponent,
    CustomPipeComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
**Chạy chương trình và kiểm tra kết quả Output**:<br>
![](https://images.viblo.asia/76418fde-4545-4e3b-9ffc-3d9a4d88f475.png)

Trong ví dụ sau, **TruncatePipe** nhận các tham số đặt độ dài bị cắt ngắn:<br>
**src/app/custom-pipe/truncate.ts**<br>
```Javascript
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'truncate'})
export class TruncatePipe implements PipeTransform {
  transform(value: string, length: number, symbol: string) {
    return value.split(' ').slice(0, length).join(' ') + symbol;
  }
}
```
Cập nhật code trong file **src/app/custom-pipe/custom-pipe.component.html**<br>
```Javascript
<td>{{ text | truncate:4:'....' }}</td>
```
**Chạy chương trình và kiểm tra kết quả Output**:<br>
![](https://images.viblo.asia/9ca15d28-856f-4ee5-a740-993dfcc8ddca.png)
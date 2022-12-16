Chào các bác. Trong bài này mình sẽ giới thiệu một số  operator hữu ích trong thư viện Rxjs. Trong bài viết mình có giải thích và kèm theo sau là ví dụ, các bạn có thể chạy ví dụ để hiểu được các operator mà mình đề cập đến nhé.
## 1. mapTo

Điều này lờ đi giá trị nguồn và chỉ emit giá trị hằng số được set 
```javascript
import { mapTo } from 'rxjs/operators';

const up$ = fromEvent(upButton, 'click');
const down$ = fromEvent(downButton, 'click');

up$.pipe(mapTo(1));
down$.pipe(mapTo(-1));
```
## 2. finalize

Nó gần giống try catch trong các ngôn ngữ lập trình, dùng để chạy khi trong chuỗi sự kiện phát sinh lỗi xử lí :
```javascript
import { finalize } from 'rxjs/operators';

this.loading = true;

this.products$ = this.getProducts().pipe(
  finalize(() => {
    this.loading = false;
  }
));
```
## 3. switchMap

Chức năng giống map nhưng được dùng trong usecase khi ta xử lí trả về một observable khác.
```javascript
Rx.Observable.of('some_url')
  .switchMap(url => this.http.get(url).map(res=>res.json())
  .switchMap(res => this.http.get(url + 'res').map(res=>res.json())
```
## 4. pluck

Đưa mỗi gía trị nguồn (1 object) vào filter để lấy các thuộc tính xác định
```javascript
import { pluck } from 'rxjs/operators';

const clicks$ = fromEvent(element, 'click');
const offsetTop$ = clicks$.pipe(pluck('target', 'offsetTop'));
```
## 5. startWith

Đôi khi ta muốn emit giá trị đầu tiên trước, thì đây là operator rất đáng để ý 
```javascript
const sort$ = this.sortByControl.valueChanges.pipe(startWith('price'));
```
## 6. toArray

Lợi ích của hàm này rất ngon, khi ta muốn gom mảng chuỗi kết quả vào trong array 
```javascript
import { toArray } from 'rxjs/operators';

const arr$ = range(1, 100).pipe(toArray());
arr$.subscribe(result => console.log(result)); // [ 1, 2, 3, 4, ...]
```
## 7. partition

Hàm này giúp cắt sự kiện ra làm 2 phần, phần 1 là 1 chuỗi các event thoả mãn hàm truthy test, phần 2 là chuỗi event còn lại không thoả mãn hàm truthy test.
```javascript
import { partition } from 'rxjs/operators';

const clicks$ = fromEvent(dropdown, 'click');

const [clicksOnDropdown$, clicksElsewhere$] = clicks$.pipe(
  partition(event => hostElement.contains(event.target))
);

clicksOnDropdown$
   .subscribe(x => console.log('Dropdown clicked'));

clicksElsewhere$
  .subscribe(x => console.log('Other clicked'));
```
## 8. empty

Nó đơn giản chính là complete, và bắn ra event rỗng
```javascript
import { of, empty } from 'rxjs';

const pass$ = fromEvent(button, 'click')
  .pipe(
    switchMap(() => {
     if (condition) { 
      return of('pass');
     }

    return empty();
}));

```

Trên đây là 8 operator mình giới thiệu. Hi vọng là có thể hữu ích với các bạn.
**mergeMap** và **switchMap**, hai trong số các RxJs operator được sử dụng phổ biến nhất trong Angular để xử lý request. Thế nhưng, do sự tương đồng về cách hoạt động mà chúng cũng gây rất nhiều nhầm lẫn trong cách sử dụng. Hôm nay mình sẽ giải thích cho các bạn về cách hoạt động và sự khác biệt giữa hai RxJs operator này một cách dễ hiểu và ngắn gọn nhất có thể.

Nếu các bạn chưa hiểu được cách hoạt động của RxJs hoặc các bạn chưa nắm rõ được các thuật ngữ trong RxJs thì các bạn hãy đọc ngay [bài viết  này](https://viblo.asia/p/rxjs-va-reactive-programming-chi-tiet-ve-y-nghia-va-cach-hoat-dong-RnB5pMkrKPG) trước khi đọc tiếp nhé, vì mình sẽ dùng rất nhiều thuật ngữ của RxJs trong bài viết này đấy.

## Cách hoạt động của mergeMap
**mergeMap** nhận vào một function, function nhận vào các gói data được emit ra từ observable(mình sẽ gọi observable này là observable gốc) mà **mergeMap** được tích hợp vào và phải trả về một observable(mình sẽ gọi observable này là observable đích). Mỗi khi **mergeMap** nhận được một gói data được emit từ observable gốc thì nó sẽ subscribe observable đích. Điều đặc biết là **mergeMap** cho phép những lần thực thi của [executor](https://viblo.asia/p/rxjs-va-reactive-programming-chi-tiet-ve-y-nghia-va-cach-hoat-dong-RnB5pMkrKPG#_22-cac-thuat-ngu-trong-rxjs-3) của observable đích mỗi khi observable đích được subscribe(bởi **mergeMap**) được chạy ***song song*** với nhau.

Các bạn có thể test ví dụ phía dưới ở [đây](https://stackblitz.com/edit/mermap-rxjs?file=index.ts).

```js
import { fromEvent, timer } from "rxjs";
import { mergeMap } from "rxjs/operators";

fromEvent(document, "click")
  .pipe(mergeMap(_ => timer(2000)))
  .subscribe(() => {
    console.log("data");
  });
```

Giải thích ví dụ:
* Tạo một observable từ event `click` của `document`, observable này sẽ emit ra một gói data chứa thông tin của event `click` của `document` mỗi khi người dụng click vào trình duyệt.
* Khi user click vào trình duyệt, observable được tạo từ: `fromEvent(document, "click")` sẽ emit ra một gói data `_`(các bạn có thể xóa `_` nếu không dùng). và ngay khi **mergeMap** nhận được `_`, nó sẽ tự động subscribe observable `timer(2000)`.
* Điều thú vị về **mergeMap** đó là nó cho phép `executor` của observable đích được chạy song song. Nếu các bạn click vào trình duyệt 3 lần cùng lúc với nhau thì sau `2s`, console của trình duyệt sẽ in ra 3 string "data".

## Cách hoạt động của switchMap
Giống với **mergeMap**, **switchMap** sẽ subscribe observable đích mỗi khi nó nhận được các gói data từ observable gốc. Tuy nhiên, trước khi nó subscribe observable đích, nó sẽ cancel lần thực thi cuối của `executor` của observable đích(`nếu có`).

Các bạn có thể test ví dụ phía dưới ở [đây](https://stackblitz.com/edit/hunqvu-switchmap-rxjs?file=index.ts).

```js
import { fromEvent, timer } from "rxjs";
import { switchMap } from "rxjs/operators";

fromEvent(document, "click")
  .pipe(switchMap(_ => timer(2000)))
  .subscribe(() => {
    console.log("data");
  });
```

Giải thích ví dụ:
* Khi user click vào trình duyệt, observable được tạo từ: `fromEvent(document, "click")` sẽ emit ra một gói data `_`(các bạn có thể xóa `_` nếu không dùng). và ngay khi **switchMap** nhận được `_`, nó sẽ kiểm tra xem `timer(2000)` đã được subscribe bới **switchMap** trước đó hay chưa. Nếu `timer(2000)` đã được subscribe hoặc lần thực thi cuối của `executor` của `timer(2000)` vẫn chưa hoàn thành thì **switchMap** sẽ cancel việc thực thi của `executor` của  `timer(2000)` ở lần subscribe cuối. Sau đó, nó sẽ subscribe observable `timer(2000)`.
* Nếu các bạn click vào trình duyệt 3 lần cùng lúc với nhau thì sau `2s`, console của trình duyệt trong ví dụ này sẽ chỉ in ra 1 string "data" mà thôi(vì **switchMap** chỉ cho phép lần thực thi mới nhất của `executor` của `timer(2000)` được chạy).

## Ứng dụng của mergeMap và switchMap
Hai ví dụ trên vừa là để mình giải thích cho các bạn về cách hoạt động của **mergeMap** và **switchMap**, vừa là hai ví dụ điển hình cho cách sử dụng của hai RxJs operator này. Các bạn chỉ cần thay `timer(2000)` bằng một observable có `executor`là một function sử dụng `fetch Api` để tạo request thôi, các bạn cũng có thể hình dung ra được tính ứng dụng rất cao của 2 RxJs operator này rồi.

## Lời kết
Tuy mình có hơi lạm dụng thuật ngữ của RxJs, nhưng mình tin đây là cách tốt nhất để giúp các bạn hình dung được cách hoạt động của **mergeMap** và **switchMap**. Nếu chưa thấy quen với các thuật ngữ này thì các bạn hãy ghé qua [bài viết  này](https://viblo.asia/p/rxjs-va-reactive-programming-chi-tiet-ve-y-nghia-va-cach-hoat-dong-RnB5pMkrKPG) và đọc lại bài viết này thêm một lần nữa nhé. Chúc các bạn một ngày làm việc vui vẻ. Cheer !
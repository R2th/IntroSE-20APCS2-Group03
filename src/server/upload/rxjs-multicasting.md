Trước khi bắt đầu hãy tham khảo ví dụ về một trường hợp thường có thể xảy ra khi handle API trong Angular:

```typescript:user.component.ts
ngOnInit() {
   this.user$ = this.http.get(`api/user/1`)
   this.name$ = this.user$.pipe(
      map(user => user.name)
   );
   this.age$ = this.user$.pipe(
      map(user => user.age)
   );
}
```

```html:user.component.html
<div>{{name$ | async}}</div>
<div>{{age$ | async}}</div>
```
<br/>

Với cách sử dụng như trên, trong tab `Network` của trình duyệt sẽ xuất hiện 2 request lên server. Nguyên nhân ở đây là với cách viết `name$, age$` như trên thì Angular sẽ tạo "Cold" observable ([Tham khảo về Hot và Cold Observable](https://medium.com/@benlesh/hot-vs-cold-observables-f8094ed53339)). Rõ ràng là nên tránh gọi API tới 2 lần để lấy một kết quả như vậy.
<br/>

Vấn đề có thể được giải quyết như sau:
```typescript:user.component.ts
this.user$ = this.http.get(`api/user/1`).pipe(
  share()
);

//or 

this.user$ = this.http.get(`api/user/1`).pipe(
 publish(),
 refCount()
);
```
<br/>

Thêm operator `share()` hoặc `publish(), refCount()` như trên cho phép chia sẻ dữ liệu giữa các subscriber. Bằng cách trên, Cold Observable ban đầu đã được biến thành Hot Observable. Một API trả cùng kết quả sẽ không bị gọi lại nhiều lần mà sẽ trả một kết quả duy nhất, được chia sẻ giữa các subscribers

---

Nguồn tham khảo:
- https://itnext.io/the-magic-of-rxjs-sharing-operators-and-their-differences-3a03d699d255
- https://www.learnrxjs.io/operators/multicasting/
- https://medium.com/@benlesh/hot-vs-cold-observables-f8094ed53339
Có một số trường hợp mà bạn nên dùng các phép tính toán ngay trong CSS mà điều này khá tiện lợi cũng như dễ hiểu hơn. Các phép tính này hoàn toàn có thể được tính trước khi viết CSS nhưng nếu chúng ta để CSS làm việc này sẽ giúp code CSS dễ đọc hơn là đặt một con số cụ thể trong đó.

```
.col {
  /* thông thường */
  width: 16.6666666667%;

  /* để như này dễ hiểu hơn nè */
  width: calc(100% / 6);
}
```

Hoặc một trường hợp phức tạp hơn, khi để việc tính toán cho CSS sẽ giúp code rõ ràng hơn khá nhiều, dễ quản lý & dễ đọc hơn

```
.col-1-6 {
   width: calc(100% / 6);
}

.col-2-6 {
   width: calc(100% / 6 * 2);
}

.col-3-6 {
   width: calc(100% / 6 * 3);
}
```

Với một ví dụ phức tạp khác, việc dùng kết hợp biến trong CSS cũng giúp chúng ta quản lý code tốt hơn

```
.parent {
  --padding: 18px;
  --gutter: 1rem;
  --parentWidth: 600px;
  --leftSize: 2/3;
  --rightSize: 1/3;
  
  width: var(--parentWidth);
  padding: var(--padding);
}

.left {
  width: calc(calc(var(--parentWidth) * var(--leftSize)) - var(--padding));
  margin-right: var(--gutter);
}

.right {
  width: calc(calc(var(--parentWidth) * var(--rightSize)) - var(--gutter) - var(--padding));
}
```

**Kết luận:** Nhiều khi việc sử dụng các công thức ngay trong CSS sẽ giúp code của chúng ta dễ quản lý, dễ đọc & chỉnh sửa hơn sau này. Thay vì việc tính toán trước và viết các con số vô nghĩa vào CSS thì hay cân nhắc sử dụng biến kết hợp hàm calc trong CSS để code của bạn rõ ràng, thân thiện hơn. 

Dưới đây là một ví dụ trong bài toán cụ thể của tác giả[ James Nash — "Hardcore CSS calc()"](https://medium.com/buildit/hardcore-css-calc-bdfb0162993c) mà các bạn có thể tham khảo để thấy được các case-study khác.
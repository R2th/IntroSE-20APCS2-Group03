Chúng ta có thể set script tags và styles tags thành các kiểu display khác nhau, đặc biệt là `display: block`,  bằng cách này chúng ta có thể chỉnh sửa css inline với thuộc tính contentEditable. Điều đó có nghĩa là chúng ta có thể nhìn thấy những thay đổi trực tiếp trên trình duyệt khi chúng ta thực hiện việc chỉnh sửa.

Ví dụ:
{@embed:https://codepen.io/buiduccuong30051989/pen/ebvmzZ}

Nhìn rất lạ, nhưng nó thực sự hoạt động được, chỉ cần set block cho tag style và add thêm thuộc tính contenteditable:

```
<p>content goes here</p>

<style contenteditable>
  p {
    color: black;
  }
</style>
```

```
style {
  display: block;
}
```

Vậy tại sao chúng ta lại làm điều này, nó có thật sự hữu dụng và thực tế, mục đích của nó là gì...
Từ cá nhân tôi nhận thấy việc này sẽ có ích trong nhưng demo nhỏ về hướng dẫn và giải thích các thuộc tính css mà ko cần phải switch qua lại, ngoài ra thì tôi cũng không nghĩ ra ideal nào khác.
Tuy nhiên,  liên quan tới live edit style như thế này, có một pen rất thú vị về nó mà tác giả là jakealbaugh  (http://jakealbaugh.com/):
{@embed:https://codepen.io/jakealbaugh/pen/PwLXXP}

Tham khảo: https://css-tricks.com/did-you-know-that-style-and-script-tags-can-be-set-to-display-block/
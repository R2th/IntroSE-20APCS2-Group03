Ký tự & trong Sass là  unique, nó đại diện cho selector hiện tại. Nó sẽ thay đổi khi ta nest các selector. Giả sử bạn chúng ta đang nested, nhưng ta muốn truy cập vào selector ở phái trước nested gần nhất đó. Vậy làm sao để lưu giữ lại selector ta cần, đây là 1 tricks khá hay:
```sass
.parent {

  $this: &;
  
  &--elem {
    display: inline-block;
    
    &:hover,
    #{$this}__variation--active & {
      background: red;
    }
    
  }
  
}
```

và nó sẽ được compile thành:

```css
.parent--elem {
  display: inline-block;
}
.parent--elem:hover, .parent__variation--active .parent--elem {
  background: red;
}
```

Có nghĩa là chúng ta có thể sử dụng .parent và .parent - elem selector cùng một lúc. Nhìn chung, nếu bạn viết bem nhiều thì sẽ thấy khá là hữu ích đó.
Ví dụ của Sergey trên [gist](https://gist.github.com/kvlsrg/49b09e7d9040583cd33576ad0dd299ea) được viết bằng [BEM](https://css-tricks.com/bem-101/):

```html
<ul class="pagination">
  <li class="pagination__item">
    <a class="pagination__link" href="#">
      Page 1
    </a>
  </li>
  <li class="pagination__item pagination__item--active">
    <a class="pagination__link" href="#">
      Page 2
    </a>
  </li>
</ul>
```

```scss
$gray-very-light: #ccc;

.pagination {
  display: flex;
  padding: 0;
  list-style: none;

  $this: &;

  &__item {
    border: 1px solid $gray-very-light;

    & + & {
      margin-left: .5rem;
    }
  }

  &__link {
    display: block;
    padding: .25rem .5rem;
    text-decoration: none;

    &:hover,
    #{$this}__item--active & { // Here we get .pagination from $this variable
      background-color: $gray-very-light;
    }
  }
}
```

output:

```css
.pagination {
    display: flex;
    padding: 0;
    list-style: none;
}

.pagination__item {
    border: 1px solid #ccc;
}

.pagination__item + .pagination__item {
    margin-left: .5rem;
}

.pagination__link {
    display: block;
    padding: .25rem .5rem;
    text-decoration: none;
}

.pagination__link:hover,
.pagination__item--active .pagination__link {
    background-color: #ccc;
}
```
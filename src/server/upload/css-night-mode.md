Gần đây mình thấy các trang web và app nói chung thì xu hướng để tiện lợi cho người sử dụng thường sẽ có chế độ switch mode themes, từ màu sáng sang tông màu tối, đặc biệt là mấy web nhiều text. Như facebook mình cũng có thấy cái chế độ switch to night mode khá là hay. Sẽ luôn có một lượng lớn mọi người thick chọn tông màu tối và chữ trắng hoặc tông màu trắng chữ đen.

Vậy việc switch giữa 2 chế độ đó như nào. Cách làm thì nhiều, với mỗi lựa chọn themes khác nhau ta có thể load file css tương ứng chả hạn. 
Hoặc change class từ root rùi override xuống, hoặc xịn hơn thì dùng css variables.
Mình xin giới thiệu một cách làm đơn giản nhất, chỉ dùng css thôi, kết hợp vs vài psedo-selector:

Markup:

```html
<div class="container">
  <div class="button">
    <label class="control checkbox">
      <input type="checkbox" name="checkbox">
      <div class="bg"></div>
      <div class="control-indicator">
        <div class="date" data-old="black" data-new="pink"></div>
      </div>
    </label>
  </div>

</div>
```

Ở đây mình sẽ dùng input type checkbox để set 2 trường hợp sáng và tối, 2 màu lựa chọn mình lưu ở data-* atribute.
Sau đó mình sẽ style cái checkbox đó cho nó giống với cái switch element như trên iphone ý.

```scss
.bg {
    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
    transition: 250ms;
}

.control {
    input {
        position: absolute;
        opacity: 0;
        z-index: -1;
    }
    &-indicator {
        padding: 0 9px;
        display: flex;
        border-radius: 50px;
        border: 2px solid $pink;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        left: 0;
        right: 0;
        width: 95px;
        height: 39px;
        text-align: center;
        background-color: white;
        background-size: 50% 50%;
        background-position: center center;
        background-repeat: no-repeat;
        user-select: none;
        transition: 400ms;
        box-shadow: -3px 0px 0px rgba(black, 0.5) inset;
        animation: load linear 1.5s;
        animation-iteration-count: 1;
        &::before {
            content: '';
            width: 35px;
            height: 35px;
            position: absolute;
            background-color: black;
            border-radius: 50%;
            animation: tailFrameRev linear 0.4s;
            animation-iteration-count: 1;
            transition-timing-function: cubic-bezier(0.75, -0.03, 0.11, 1.01);
            transition-duration: 0.8s;
            top: 0;
            left: 0;
            transform: rotate(45deg);
        }
    }
}
```

như bạn thấy thì mình dùng 1 animation tên là tailFrameRev, nó sẽ cho mình một animation kiểu switch từ trái sang phải con trỏ với cái đuôi đằng sau được làm bằng box-shadow, chỉ để đẹp.

```css
@keyframes tailFrame {
{@embed: https://codepen.io/buiduccuong30051989/pen/jJeeMz}
    0% {
        border-radius: 50%;
    }
    50% {
        border-radius: 50% 50% 50% 5px;
        box-shadow: -1px 1px 0px 0px $pink, -1px 1px 0px 0px $pink;
    }
    80% {
        border-radius: 50% 50% 50% 0px;
    }
    100% {
        border-radius: 50%;
    }
}

@keyframes tailFrameRev {
    0% {
        border-radius: 50%;
    }
    50% {
        border-radius: 50% 5px 50% 50%;
        box-shadow: 1px -1px 0px 1px black;
    }
    80% {
        border-radius: 50% 0px 50% 50%;
    }
    100% {
        border-radius: 50%;
    }
}
```

Tương tứng với mỗi chế độ switch mode thì mình sẽ style cho các pausedo-selector của class ".date"

```
.date {
    &::before,
    &::after {
        position: absolute;
        transition: 200ms ease-in-out 200ms;
    }
    &::before {
        content: attr(data-old);
        color: black;
        top: 6px;
        right: 16px;
        opacity: 1;
    }
    &::after {
        content: attr(data-new);
        top: 6px;
        left: 16px;
        color: $pink;
        opacity: 0;
    }
}
```

Demo
{@embed: https://codepen.io/buiduccuong30051989/pen/jJeeMz}

Phần demo này chỉ sử dụng cho riêng từng component thôi chứ ko có tính global, nếu muốn làm global cho tất cả mọi thứ, bạn muốn control moij thứ thì phải làm từ root trở xuống.
## Cross-browser way (extra markup)
Ta chỉ cần wrap character đầu tiên của đoạn paragrapth trong một thẻ span, sau đó style cho thẻ span đó vs CSS như bình thường.

**HTML**
```
<p>
<span class="firstcharacter">L</span> orem ipsum dolor sit amet, consectetur adipiscing elit.
</p>
```

**CSS**
```
.firstcharacter {
  color: #903;
  float: left;
  font-family: Georgia;
  font-size: 75px;
  line-height: 60px;
  padding-top: 4px;
  padding-right: 8px;
  padding-left: 3px;
}
```

{@embed: https://codepen.io/buiduccuong30051989/pen/NoKNEK}

## CSS3 way (no extra markup)

Sử dụng pseudo class selector để target được vào ký tự đầu tiên của paragraph. Không cần phải thay đổi và viết thêm markup, không support IE<9.

HTML
```
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique lobortis orci ac lacinia. Fusce eu purus eget diam vehicula auctor nec eu elit. Morbi consequat facilisis orci vel malesuada. Donec ultrices molestie sollicitudin. Aliquam pharetra libero enim. Donec et suscipit massa. Donec dui odio, dignissim non sodales et, tincidunt a sapien. Phasellus elit nibh, adipiscing sed blandit vel, interdum et arcu.
</p>
```

CSS
```
p:first-child:first-letter {
  color: #903;
  float: left;
  font-family: Georgia;
  font-size: 75px;
  line-height: 60px;
  padding-top: 4px;
  padding-right: 8px;
  padding-left: 3px;
}
```

{@embed: https://codepen.io/buiduccuong30051989/pen/gqYrNy}

## The initial-letter way

Những trình duyệt hỗ trợ cho thuộc tính initial-letter thì chưa nhiều trong thời điểm này. Nhưng nó thể được sử dụng để tính toán số dòng mà drop capped letter sẽ cần, và font-size mà nó sẽ show ra thay vì là phải set chi tiết cho nó như cách trước.

CSS
```
p:first-child:first-letter {
  color: #903; 
  font-family: Georgia;
  initial-letter: 2;
}
```



Nguồn tham khảo: Css tricks.
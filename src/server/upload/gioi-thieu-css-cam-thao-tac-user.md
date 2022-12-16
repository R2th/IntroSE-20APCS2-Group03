**Bài viết gốc :** https://qiita.com/7note/items/d28e1a8e213243588025

Tôi xin giới thiệu với các bạn CSS có thể hạn chế các hoạt động của người dùng trên web, chẳng hạn như click, scroll và nhập văn bản.

![](https://images.viblo.asia/27a44738-d213-45ec-b664-05682b5398f4.jpg)


## Cấm select HTML element

```style.css
div {
  user-select: none;
}
```

Nó sẽ khiến vô hiệu hóa lựa chọn của tất cả các HTML element. Từ click cho đến sao chép hình ảnh.

Đây cũng có thể coi là một biện pháp chống lại việc copy-paste văn bản của bạn. Tất nhiên, nếu CSS bị vô hiệu hóa thì vẫn sẽ copy được thôi, nó không phải là một biện pháp đối phó hoàn hảo 100%, nhưng trừ phi kẻ đó là một người mạnh về web, chứ về cơ bản là vẫn ngăn chặn được nạn copy-paste.


## Cấm click trái phải, cấm tap (sao chép hình ảnh cũng bị cấm)

```style.css
div{
  pointer-events: none; /* 初期値に戻す時はauto */
}
```

Nếu bạn chỉ muốn cấm sao chép hình ảnh, bạn có thể thực hiện bằng cách chỉ viết vào trong img.

```style.css
img {
  pointer-events: none;
}
```

![](https://images.viblo.asia/734285be-dcb4-4481-9b25-0d11a5799767.jpg)



## Cấm click phải

Khi chỉ cấm mỗi việc click chuột phải, hãy viết nội dung sau vào thẻ body.
Bằng cách này bạn có thể cấm click chuột phải, đồng nghĩa với có thể ngăn chặn được việc sao chép hình ảnh giống bên trên.

```index.html
<body oncontextmenu="return false;">
```


## Cấm scroll

Bằng cách này bạn không thể scroll màn hình được nữa.
Vốn dĩ, thay vì cấm cuộn, nó chỉ đơn giản là chỉ định cách xử lý đối với phần bị dôi ra ngoài cửa sổ.
Nếu bạn không chỉ định bất cứ điều gì, thì bạn vẫn scroll được. Nhưng nếu bạn set nó thành hidden, thì phần nhô ra sẽ bị ẩn đi, dẫn đến không cuộn được.

```style.css
html,body {
  overflow: hidden;
}
```

## Cấm wrap ký tự

```style.css
div {
  white-space: nowrap;
}
```

Có thể cấm được việc wrap text.
Ngược lại, trong trường hợp bạn muốn cưỡng chế wrap các ký tự alphanumeric như URL, v.v.. thì sẽ chỉ định như sau.

```style.css
div {
  word-break: break-all;  /* cưỡng chế wrap */
}
```

## Cấm nhập text input

Đây là một phương thức vô hiệu hóa việc nhập text của input.
Sử dụng nó khi bạn muốn sử dụng thẻ input nhưng lại không muốn bị viết đè giá trị.

```index.html
  <input name="hoge" type="text" value="hoge" disabled="disabled" />
```

## Kết

Tôi không khuyên bạn nên cấm hoặc vô hiệu hóa bất cứ điều gì một cách bừa phứa, mà hãy kiểm soát nó tùy vào mục đích của bạn nhé.

![](https://images.viblo.asia/c5cfbe23-5cc8-40ff-bd79-e6043d59c964.jpg)
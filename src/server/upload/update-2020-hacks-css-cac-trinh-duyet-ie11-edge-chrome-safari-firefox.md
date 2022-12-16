Chủ đề muôn thủa hack css. =)) . 
- Làm thế nào tôi chỉ muốn css này hiển thị ở trình duyệt này, những trình duyệt khác không nhận nó?
- Vậy các bạn tham khảo dưới này nhé, mình có viết 1 bài hack css rồi nhưng nó quá rắc rối tới hơi khó hiểu, bài này là update cách mới nhất nhé, chỉ cần 1 dòng là các bạn có thể thoả mái hack rồi :v: 

## Dưới đây là hack từng trình duyệt:
### 1.  IE11
```
/* IE11 */
_:-ms-lang(x)::-ms-backdrop, .selector {}
```

### 2. Edge(EdgeHTML)
```
/* Edge(EdgeHTML) */
_:-ms-lang(x)::backdrop, .selector {}
```

### 3. Edge(Chromium)
```
/* Edge(Chromium) */
_:lang(x)::-ms-, .selector {}
```

### 4. Chrome
```
/* Chrome */
_:lang(x)::-internal-media-controls-overlay-cast-button, .selector {}
```

### 5. Safari
```
/* Safari */
_:lang(x)+_:-webkit-full-screen-document, .selector {}
```

### 6. Firefox
```
/* Firefox */
_:lang(x)::-moz-placeholder, .selector {}
```


## Hacks gộp trình duyệt

### Edge(EdgeHTML) & IE11 & IE10
```
/* Edge(EdgeHTML) & IE11 & IE10 */
_:-ms-lang(x), .selector {}
```

### Edge(Chromium) & Chrome & Safari & Firefox
```
/* Edge(Chromium) & Chrome & Safari & Firefox */
_:lang(x)::-webkit-, .selector {}
```
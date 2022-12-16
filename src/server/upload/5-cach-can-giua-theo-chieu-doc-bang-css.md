# Mục đích 

Trong quá trình làm web thì mình thi thoảng gặp những bug liên quan đến UI cơ bản nhưng đôi khi loay hoay mãi mới xong.
Mình xin chia sẻ một số tips mà mình tích lũy được


### 1. line-height

Kỹ thuật này dùng cho dòng text.

**HTML:**
```SQL
<div id="element">Hello World</div>
<div id="element2">My name is Khoa</div>
```

**CSS:**
```SQL
#element {
  background-color: #BDBDBD;
  height: 100px;
  line-height: 100px;
}
#element2 {
  background-color: #CEF6F5;
  height: 100px;
}
```

**Result:**

![](https://images.viblo.asia/001ffea7-0013-461c-9934-3473fd6451f2.PNG)

{@embed: https://codepen.io/khoapc249/pen/rNVjVXv}

Lưu ý với image bạn phải dùng thêm *vertical-align: middle* nữa thì cách này mới hoạt động.


### 2. table
Dùng *vertical-align: middle*  trong table

**HTML:**
```SQL
<div id="parent">
  <div id="child">Content</div>
  <div id="child-2">Content 2</div>
</div>
```

**CSS:**
```SQL
#parent {
  display: table;
  background-color: #BDBDBD;
  width: 100%;
}
#child {
  display: table-cell;
  vertical-align: middle;
}
#child-2 {
  display: table-cell;
  height: 200px;
}
```

**Result:**

![](https://images.viblo.asia/4d6db2de-8059-4caa-81b1-72b1d1f689df.PNG)

{@embed: https://codepen.io/khoapc249/pen/rNVjOBK}

### 3. position

**HTML:**
```SQL
<div id="parent">
  <div id="child"></div>
  </br>
  <div id="child2"></div>
</div>
```

**CSS:**
```SQL
#parent {
  position: relative;
  height: 400px;
  background-color: #BDBDBD;
}
#child {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 30%;
  margin: auto;
  background-color: yellow;
}
```


Mình xét '*position: relative*' cho div '*parent*'
và '*position: absolute*' cho div '*child*'. Sau đó set **Top Bottom Right Left** là 0.

Như thế div '*child*' sẽ được căn giữa, đây gọi là thủ thuật **Stretch**


**Result:**

![](https://images.viblo.asia/984fce57-d8d0-46a1-858c-836b2bbbe9a3.PNG)


{@embed: https://codepen.io/khoapc249/pen/qBdROKB}

### 4. dùng float tạo div trống

**HTML:**
```SQL
<div id="parent">
  <div id="float"></div>
  <div id="child">Child</div>
</div>
```

**CSS:**
```SQL
#parent {
  height: 400px;
  background-color: #BDBDBD;
}
#float {
  float: left;
  height: 50%;
  width: 100%;
  background-color: yellow;
  margin-bottom: -50px;
}
#child {
  clear: both;
  height: 100px;
  background-color: #045FB4;
  position: relative;
  z-index: 2;
}
```


Để dùng được cách này bạn hãy thêm một thẻ div trống trước thẻ div cần căn giữa rồi set '*margin-bottom*' của div trống đó bằng một nửa của chiều cao thẻ div chính là được.

**Result:**

![](https://images.viblo.asia/a944a409-4194-4da6-9138-cb75aa3a37bd.PNG)

{@embed: https://codepen.io/khoapc249/pen/mdJRevW}


### 5. grid
Grid (Grid layout) là một chức năng sinh ra để giải quyết về layout.

**HTML:**
```SQL
<div id="parent">
  <div id="child"></div>
</div>
```

**CSS:**
```SQL
#parent {
  height: 200px;
  background-color: #BDBDBD;
  display: grid;
  justify-items: center; /* Căn giữa chiều ngang */
  align-content: center;/* Căn giữa chiều dọc */
}
#child {
  width: 100px;
  height: 50px;
  background-color: blue;
}
```

**Result:**

![](https://images.viblo.asia/7225689f-210c-44bf-af94-580cb94576e1.PNG)

{@embed: https://codepen.io/khoapc249/pen/GRJrpaE}

# Lời kết
Chúc các bạn fix bug UI nhanh chóng nhé !
Cảm ơn vì đã đọc bài của mình.
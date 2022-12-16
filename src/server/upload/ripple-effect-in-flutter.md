### I) Introduction (important)

Hiện nay cỏ vẻ như ```Flutter``` đang là chủ đề hot được bàn tán mọi người nhỉ, hắn cứ như là Tùng Sơn bỗng sau 1 đêm phất lên nổi tiếng như Sơn Tùng vậy, nhưng hắn còn đáng mong đợi hơn cả thế, nhờ vào ngôn ngữ Dart mà hắn như diều gặp gió, từ cục đá thô hoá thành cục sắt, sau một thời gian ngắn, hắn còn đánh bại được đàn anh React Native về lượt star trên github, đã thế hắn còn được thờ cúng, cầu bái với một lượng lớn cộng đồng cú đêm thức khuya dậy sớm để support ủng hộ cho hắn, nhờ thế mà ui dời ơi bao nhiêu cái tool, pờ lút gin, lai bờ ra ry, demo đến từng chi tiết chỉ để tô thêm vẻ đẹp cho hắn, design có phức tạp, logic có nhọc nhằn bao nhiêu thì khi gặp hắn đều bị hắn transform lại còn vài dòng code, nghe có tức điên không, thế thì ai mà không nghiện, bởi vậy mới có câu chán cơm thèm phở nghe chí lí vãi ra, buồn thay tô phở này càng ăn càng nghiền, từng giọt nước phở đọng lại trên môi rồi rơi xuống bát tạo ra những con sóng gợi hồn nhìn rất là đẹp mà người ta hay kêu đó là ripple effect. Thì hôm nay mình sẽ chia sẻ về chủ đề Ripple effect xoay quanh ```InkWell```,``` InkResponse```,``` InkImage```, một trong những hiệu ứng rất được ưa chuộng đối với người dùng app Android, còn IOS thì không biết.

 ![](https://images.viblo.asia/b7221af1-efc4-4dc8-8bdb-3457a7bb19f0.jpeg)
 
 Thử tưởng tượng khi bạn thích ai đó, và khi người đó chạm vào bạn thì cảm giác ấy sẽ ra sao, tất nhiên là run cả người, tê dái, run bần bật vì vui sướng, tất nhiên ai trong đời khi yêu lần đầu thì cũng như vậy, thì trong ```Flutter```  khi bạn chạm vào 1 Widget thì nó cũng run bần bật rồi toả ra những con sóng nhìn đẹp mê hồn, nhưng để bắt nó được như vậy thì ta phải bồi bổ cho nó đã.

### II) InkWell
- Theo như mình biết thì thằng này thường dùng khi ripple effect chỉ loay hoay theo dạng rectangle thì phải (dạng rectangle splash)
- Nếu đơn giản chỉ là một hiệu ứng gợn sóng khi click button thì bạn có thể dùng thằng này.

![](https://images.viblo.asia/9422ba67-3335-455c-9755-7c55f3ffd44d.gif)

![](https://images.viblo.asia/5814b3a1-c770-4588-8356-98459aa1c73b.gif)   

- Click vào hình ảnh để thấy được effect =))
- Code thì sao:
```javascript
InkWell(
    onTap: () {},
    child: Container(
    padding: EdgeInsets.all(12),
    child: Text('Flat Button'),
      ),
   ),
```              

```
```
- Trường hợp thêm ```background color``` cho widget thì sao

![](https://images.viblo.asia/d1ffbbe1-a33d-4c16-bff9-bc718fbeaeed.gif)

```javascript
InkWell(
     onTap: () {},
     child: Container(
             color: Colors.green,
             padding: EdgeInsets.all(12),
             child: Text('Flat Button'),
     ),
 ),
```
- Có 1 rắc rối là khi chúng ta thêm background Color thì sẽ không có hiệu ứng xảy ra, vậy thì xử lý sao ta.


####  Cách 1: Thêm opacity (click  image để xem effect)
![](https://images.viblo.asia/e9a55f6c-1ac8-4f40-a27c-a4ffdc219db9.gif)

```javascript
 InkWell(
         onTap: () {},
         child: Container(
             color: Colors.green.withOpacity(0.5), 
             padding: EdgeInsets.all(12),
             child: Text('Flat Button'),
         ),
       ),
```


- Trường hợp chúng ta muốn color nó green 100% luôn chứ không bị giảm độ mờ đi thì sao
#### Cách 2:  Dùng Material
![](https://images.viblo.asia/71aea41a-e523-49f0-8680-8ea9e5e76b2e.gif)




```javascript
 Material(
         color: Colors.green,
         child: InkWell(
             onTap: () {},
             child: Container(
                 color: Colors.transparent,
                 padding: EdgeInsets.all(12),
                 child: Text('Flat Button'),
        ),
    ),
  ),
```

hoặc

```javascript
    Container(
                color: Colors.green,
                child: Material(
                        color: Colors.transparent,
                        child: InkWell(
                        onTap: () {},
                        child: Container(
                                padding: EdgeInsets.all(12),
                                child: Text('Flat Button'),
                    ),
                  ),
                ),
              ),
```
 


##### Trường hợp muốn custom ripple effect color (click  image để xem effect)
![](https://images.viblo.asia/d561336b-8270-471c-89aa-4fa1d1624b33.gif)


```javascript
 Container(
       color: Colors.green,
       child: Material(
              color: Colors.transparent,
              child: InkWell(
                    highlightColor: Colors.purple.withOpacity(0.5),
                    splashColor: Colors.pink.withOpacity(0.5),
                    onTap: () {},
                    child: Container(
                         padding: EdgeInsets.all(12),
                         child: Text('Flat Button'),
                 ),
            ),
         ),
     ),
```

- Ta phải set opacity cho 2 thằng kia nếu không nó sẽ bị overlay lên trên thằng green color kia, do đó effect nó không nhìn được mắt cho lắm.


#### Trường hợp không có opacity (click  image để xem effect)
![](https://images.viblo.asia/2c5a9fd2-d945-4129-ab45-4ab103456af5.gif)

```javascript
 Material(
 Container(
       color: Colors.green,
       child: Material(
              color: Colors.transparent,
              child: InkWell(
                    highlightColor: Colors.purple,
                    splashColor: Colors.pink,
                    onTap: () {},
                    child: Container(
                         padding: EdgeInsets.all(12),
                         child: Text('Flat Button'),
                 ),
            ),
         ),
     ),
```

#### Còn trường hợp muốn custom border cho ripple effect thì sao
![](https://images.viblo.asia/54c0ad60-1155-4ab1-87ff-40d96ef39ed2.gif)


```javascript
 InkWell(
     borderRadius: BorderRadius.circular(20),
     onTap: () {},
     child: Container(
            padding: EdgeInsets.all(12),
            child: Text('Flat Button'),
        ),
    ),
```

#### # Hoặc vừa border cho widget, vừa border cho ripple effect
![](https://images.viblo.asia/e59bcaa3-3a96-4d02-9b45-c3cb993257ff.gif)

```javascript
Container(
   decoration: BoxDecoration(
   borderRadius: BorderRadius.circular(30), //radius cho widget
   color: Colors.green,),
   child: Material(
         color: Colors.transparent,
         child: InkWell(
            borderRadius: BorderRadius.circular(30),//radius cho hiệu ứng
            onTap: () {},
            child: Container(
                   padding: EdgeInsets.all(12),
                   child: Text('Flat Button'),
             ),
          ),
        ),
      ),
```

### III) InkResponse
- Thằng này dùng khi effect dạng circle (Circle splash)

![](https://images.viblo.asia/6e5d90af-21d7-49af-8085-30d92048d7c8.gif)
```javascript
InkResponse(
          child: Icon(Icons.menu),
          onTap: () {},
  ),
```

##### Trường hợp ta muốn tăng radius cho effect thì sao
![](https://images.viblo.asia/6b1f9b87-811f-4104-8abf-f2a2e8d4d1e9.gif)

```javascript
 InkResponse(
         containedInkWell: false,
         radius: 100,
                child: Icon(Icons.menu),
                onTap: () {},
 ),
```


### IV) InkImage
- Thằng này đơn giản chỉ dùng cho Image widget

![](https://images.viblo.asia/9dc8cab8-8cbb-4bae-87f4-4a3da8f128d9.gif)

```javascript
Ink.image(
        fit: BoxFit.cover,
        height: 200,
        width: 200,
       image: NetworkImage(imageUrl),
        child: InkWell(
               onTap: () {},
     ),
   ),
```

### V) Tổng kết
- Trên đây mình chỉ giới thiệu 1 vài chức năng đơn giản cho hiệu ứng ripple, bên cạnh đó, flutter cũng hỗ trợ rất nhiều widget với avaiable effect như button chẳng hạn, với flutter, không gì là không thể :v. Bài viết trên nếu có gì sai xót mong các bạn góp ý.
- Trên đây mình chỉ giới thiệu 1 vài chức năng đơn giản cho hiệu ứng ripple, bên cạnh đó, flutter cũng hỗ trợ rất nhiều widget với avaiable effect như button chẳng hạn, với flutter, không gì là không thể :v. Bài viết trên nếu có gì sai xót mong các bạn góp ý.
- Link tham khảo: https://www.youtube.com/watch?v=2t-I0uryD6E
### Giới thiệu
Chào mọi người hôm nay mình sẽ chia sẻ 3 mẹo nhỏ trong việc viết css,nó rất đơn giản nếu chúng ta nhớ và vận dụng vào thì việc viết css style sẽ chở nên dễ ràng hơn rất nhiều.

### Một số Snippets
> #### 1. Chọn hàng ở giữa trong list
**CSS**
```CSS
li:nth-of-type(3n-1){
  color: #999;
}
````

![](https://images.viblo.asia/418f3692-0ff5-48c3-8da0-2f7c074ee42f.png)

> #### 2. Chọn 1 tên chung trong attribute để style
**CSS**
```CSS
p[class*="ttl"]{
  color: #999;
}
```
![](https://images.viblo.asia/a0ec058c-709b-43e6-b87a-5eabfe37e84b.png)
> #### 3. Chọn 1 tên chung cuối cùng trong attribute để style 
Cái này khác cái thứ 2 ở chỗ là nó sẽ chỉ chọn cho những class nào có attribute giống nhau và nằm cuối.
Nằm đầu cũng dùng tương tự

**CSS**
```CSS
p[class$="one"]{
  color: #999;
}
```
![](https://images.viblo.asia/a7350e37-1a2f-4f60-bf22-a92f8eae2fe6.png)

### Lời kết
Bài viết khá ngắn gọn nhưng mình nghĩ là khá hay cho bất kỳ ai làm markup nhất là các bạn mới bước chân vào làm Front End.
Cảm ơn các bạn đã đọc bài nhé và gi vọng nó có ích cho bạn !

ご参考になれば！！
ご覧をいただきありがとうございました。
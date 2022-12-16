Hẳn ở đây chẳng ai xa lạ gì với `display: inline-block` nhưng sẽ có rất nhiều người (mình trước đây cũng đã từng gặp) không hiểu rõ về nó.

![](https://images.viblo.asia/6a7faee5-824a-402c-a22a-5d7da98cf9a1.jpg)
# Tình huống bất ngờ
Mình có 1 div cha 
```css
.main {
    width:800px;
}
```
mình lại có 1 chú item con 
```css
.item {
    width:200px;
}
```

Cho mấy thằng con xếp hàng nào
```html
<div class="main">
    <div class="item red">1</div>
    <div class="item green">2</div>
    <div class="item yellow">3</div>
    <div class="item blue">4</div>
</div>
```

Chúng sẽ xếp thành như này: 
![](https://images.viblo.asia/24e1d89b-8c50-4885-a1f2-e82c19a0488c.png)

Giờ cho chúng xếp hàng ngang nhé, hàng dọc chán rồi
```css
.item {
    width:200px;
    display: inline-block;
}
```

Oh bất ngờ chưa chưa chưa.....
![](https://images.viblo.asia/6647e26d-7137-43ba-b73f-0a58053c080b.png)

4 thằng con chúng không đứng trên 1 hàng, mặc dù 800/200 = 4 là vừa khít =)))) Rồi mỗi thằng lại tự cách nhau 1 khoảng chứ. Phải chăng chúng ghét nhau :D
# Nguyên nhân
Nguyên nhân là hiểu đơn giản display:inline-block là sẽ hiển thị các phần tử theo kiểu "block of word". Vậy nên sẽ sinh ra một khoảng trống mặc dù bạn ko tạo ra
# Cách khắc phục
## Thánh "Chuyên Gia"
```css
.main {
    width:800px;
    display:flex;
}
```
Sử dụng flexbox là 1 trong những cách đầu tiên cho vấn đề này, nhưng flexbox chỉ hổ trợ các trình duyệt "xịn",
những trình duyệt cũ hơn sẽ không áp dụng được
## Người Bình Thường
```css
.item {
    width:200px;
    display: block;
    float: left;
}
```
## UFO (Người ngoài hành tinh)
```css
.item {
    width:200px;
    display: inline-block;
    margin-right:-4px;
}
```
Nghe có vẻ lạ lạ nhưng margin âm là hoàn toàn có thật!
## Khủng long
```html
<div class="item red">1</div><div class="item green">2</div><div class="item yellow">3</div><div class="item blue">4</div>
```
```html
<div class="item red">1</div><!---->
    <div class="item green">2</div><!---->
    <div class="item yellow">3</div><!---->
    <div class="item blue">4</div><!---->
```
ý là những cách của người tối cổ =)))))

Hi vọng qua ví dụ này sẽ có người ko bỡ ngỡ với cái Space kì lạ này nữa
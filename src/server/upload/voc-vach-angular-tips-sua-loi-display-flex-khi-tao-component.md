## Vấn đề gặp phải?
Trong lúc làm việc với Angular, mình gặp 1 lỗi nho nhỏ, mình tạo 1 **list component** trong đó gồm nhiều **card component**, với **list component** mình để **display:flex** cho dễ dàn layout. **Tuy nhiên**, mình đối mặt với vấn đề là khi cho các card component vào list và gọi lên thì card component lại **display: block** mới ghê.

![](https://images.viblo.asia/946f46d0-6ba0-41a5-afb3-b06635601bb3.JPG)

## Cách sửa

Haiz! Không sao, nhờ vào khả năng search thần thánh thì mới phát hiện keyword: **host** trong angular (link tham khảo [đây](https://blog.angular-university.io/angular-host-context/) nè). 
Theo như nó nói, chúng ta có thể dùng từ khoá này để **style lại cho cái selector component**. 

Vậy là ổn rồi, giờ thì bật **Developer tool** lên **(F12 trên Chorme đó)**. Thử inspect cái card component xem thế nào, như hình thì chính nó đang gặp vấn đề với cái css display.

![](https://images.viblo.asia/41e2a199-ddfa-426d-97d3-3f93ee321676.png)

Ok, giờ thử chỉnh display trong element{}, thử cái display: contents thì nó ok rồi.
![](https://images.viblo.asia/b7ce4460-f9c0-4d8c-8ebb-20b668cbce2e.JPG)

Rồi bây giờ chỉ cần vào cái card component, sửa lại cái css như sau:
```css
:host{
  display: contents;
}
```

Nice!
![](https://images.viblo.asia/fa9a1f50-a26c-404e-8f12-6e20e4179203.JPG)
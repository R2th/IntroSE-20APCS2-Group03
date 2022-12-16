## Giới thiệu
Như tiêu đề thì mình muốn chia sẻ cách zoom ảnh khi hover, tuy nhiên chỉ phóng to thôi thì chả cần 1 bài chia sẻ làm gì :v Chắc mọi người từng vào những trang bán hàng và thấy ở trang nào đó có list ảnh product khi hover vào ảnh phóng to và khi ta di chuyển chuột thì ảnh nó "đi" theo. Cái này mn có thể dễ dàng tìm thư viện js xịn xò cho hiệu ứng thật mượt và đẹp nhưng thay vì thêm thư viện thì ta có vể viết đơn giản = js

## Code
Tính năng này gồm 2 phần, khi hover vào thì phóng to, di chuyển chuột thì ảnh nó đi theo, cái này chỉ cần dùng css là đc, phóng to ta dùng transform scale, thay đổi vị trí ảnh thì dùng transform origin X% Y%. Mấu chốt là làm sao thay đổi X và Y để ảnh nó "đi" đúng theo trỏ chuột. 
Chúng ta sẽ dùng js để set lại x và y khi di chuột. 

Ta có cái ảnh như này với 4 điểm A B C D. Ta có hệ phương trình tính X% và Y% ở transform origin như này: X = Ax + B; Y = Cy + D; với x và y là toạ độ con trỏ chuột của ta.

 ![](https://images.viblo.asia/1fa48b55-5eb3-4b02-9b86-bc81059bff3e.png)

Giả sử cái ảnh nằm sát lề trên bên trái, ta hover vào góc phải trên cùng của cái ảnh là điểm B và muốn cái ảnh nó cũng dịch lên góc trên cùng bên phải, tức là transform-origin: 100% 0%;
Thay X = 100 ta có: 100 = A.(khoảng cách từ điểm B tới lề trái) + B hay 100 = A(width + offsetX) + B; 
Tương tự với việc khi di chuột vào điểm A ta có: 0 = A.offsetX + B
Từ đó => A = 100/width; B = - 100 * offsetX / width
=> X = (x - offsetX)/width * 100
Tương tự với Y ta sẽ được Y = (y - offsetY)/height * 100
Mình không giỏi giải thích toán lắm nhưng cơ bản là thế :v: Kết quả là như này (offsetX với offsetY tương đương offsetLeft và offsetTop nhé)
```
css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
```

{@embed: https://codepen.io/dfly24s/pen/gOawVeP}

## Kết luận
Mình demo đơn giản thôi còn mn có thể thêm params vào function zoom cho nó xịn hơn :joy:
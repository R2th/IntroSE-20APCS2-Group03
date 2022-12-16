### I) Introduction 
- Khi lập trình với Flutter, chúng ta thường thấy có rất nhiều loại buttons, và kể từ sau khi migrated to phiên bản 2.0 thì một vài loại button cũ sẽ được thay thế bởi các button mới như: ```TextButton```, ```ElevatedButton```, ```OutlinedButton```,  cụ thể chúng ta có thể nhìn vào hình ảnh dưới đây để thấy rõ chi tiết hơn.
![](https://images.viblo.asia/1377cf70-edab-4da1-8dda-ced04b3c1796.png)

- Và tất nhiên với phiên bản Material Button 2.0 này các button sẽ trở nên flexbile hơn, tối ưu hơn và code cũng trở nên dễ dàng config hơn không chỉ cho mobile và còn cả cho web.
- Khi đọc qua tên của 3 loại button này, chắc hẳn các bạn cũng mường tượng được chức năng của chúng rồi phải không, cái tên nói lên tất cả :v 
- Trong bài viết này mình sẽ khái quát chung 1 vài thuộc tính cũng như chức năng cho 3 button trên, cụ thể hơn trong các button này chúng ta sẽ điều chỉnh color, padding, size, shadow... thông qua 1 thuộc tính chung là ```style```
- Với Flutter, không gì là không thể
![](https://images.viblo.asia/7ec34867-6a9a-4146-bb31-af987accc9f2.jpg)

### II) Color
![](https://images.viblo.asia/9fa07eba-4ca5-484b-bc64-9b4c50a87243.png)


#### Text Button
- Với hình trên, code của ```Text Button``` sẽ như sau:
 ```javascript
           TextButton(
              style: TextButton.styleFrom(
               //backgroundColor: Colors.white, // background
                primary: Colors.pinkAccent, // foreground
              ),
              child: Text('Text Button', style: TextStyle(fontSize: 28))
            ),
 ```
 - Để ý hình trên chúng ta có thể thấy thuộc tính ```primary``` chính là nơi chúng ta thiết lập tông màu chủ đạo (foreground color) cho Button, nếu là màu hồng thì text, icon của Button mặc định sẽ là màu hồng, tất nhiên chúng ta vẫn có thể set lại color cho từng Widget bất cứ khi nào chúng ta muốn :v.
 - Mặc định ```Text Button```  sẽ không có background color, nhưng chúng ta vẫn có thể set background color cho nó, cơ mà theo mình cũng không nên đâu ha, có thể nhà sáng chế ra thằng này sẽ buồn đó =)), thay vào đó chúng ta có thể sử dụng thằng ```ElevatedButton``` chẳng hạn.
 -
 #### Elevated Button
- Còn code ```ElevatedButton```  thì sao:
   ```javascript
             ElevatedButton(
              style: ElevatedButton.styleFrom(
                primary: Colors.green, // background
                onPrimary: Colors.white, // foreground
              ),
              child: Text('Elevated Button', style: TextStyle(fontSize: 28)
            ),
     ```
  - Với ```ElevatedButton``` thì thuộc tính của nó có hơi ngược đời so với thằng ```Text Button```. 
  + Thuộc tính ```primary``` là nơi để set background color cho Button
  + Thuộc tính ```onPrimary``` là nơi để set forground color cho Button
- À tất nhiên thằng này mặc định có background color nha :v


 #### Outlined Button
 ```javascript
            OutlinedButton(
              style: OutlinedButton.styleFrom(
                // backgroundColor: Colors.white,// background
                primary: Colors.orange, // foreground text
                side: BorderSide(color: Colors.orange), // foreground border
              ),
              child: Text('Outlined Button', style: TextStyle(fontSize: 28)
            ),
 ```
 Với  ```Outlined Button```
 + Thuộc tính ```primary``` sẽ là nơi để set foreground color
 + Thuộc tính ```backgroundColor``` là nơi sẽ set background color cho button
 Tính ra thằng này nó cũng same same thằng ```Text Button``` 
 + Mặc định thằng này sẽ ko có background color và border đâu nha, nếu muốn chúng ta phải khai báo thuộc tính cho nó, như code mình add trên ý :v
 
 
### III) Thêm Icon cho Button
![](https://images.viblo.asia/6b961820-90c2-4441-8fa9-8b920b4946f7.png)


- Trường hợp nếu Button có icon thì lúc này constructor của Button sẽ là ```Prefix + Button.icon(...)```, đồng thời thuộc tính **child** sẽ không còn áp dụng được nữa, thay vào đó chúng ta sẽ sử dụng thuộc tính **label**

#### Text Button
 ```javascript
            TextButton.icon(
              style: TextButton.styleFrom(
                primary: Colors.pinkAccent, // text + icon color
              ),
              icon: Icon(Icons.add, size: 32),
              label: Text('Text Button', style: TextStyle(fontSize: 28)),
              onPressed: () {},
            ),
 ```

#### Elevated Button
  ```javascript
            ElevatedButton.icon(
              icon: Icon(Icons.edit, size: 32),
              label: Text('Elevated Button', style: TextStyle(fontSize: 28),
              onPressed: () {},
            ),
  ```
  
#### Outlined Button

 ```javascript
            OutlinedButton.icon(
              style: OutlinedButton.styleFrom(
                side: BorderSide(color: Colors.blue),
              ),
              icon: Icon(Icons.search, size: 32),
              label: Text('Outlined Button', style: TextStyle(fontSize: 28),
              onPressed: () {},
            ),
 ```    
 
### III) Padding
![](https://images.viblo.asia/25b7a4f1-6e11-47d2-8fa1-ee3af6b6c1a7.png)

- Trường hợp chúng ta muốn thêm **padding** cho Button thì sao, cũng đơn giản thui :v 

#### Text Button
 ```javascript
            TextButton(
              style: TextButton.styleFrom(
                backgroundColor: Colors.white,
                padding: EdgeInsets.symmetric(horizontal: 32, vertical: 8),
              ),
              child: Text('Text Button', style: TextStyle(fontSize: 28),
              onPressed: () {},
            ),
 ```    
    
 #### Elevated Button
  ```javascript
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                padding: EdgeInsets.symmetric(horizontal: 32, vertical: 8),
              ),
              child: Text('Elevated Button', style: TextStyle(fontSize: 28),
              onPressed: () {},
            ),
 ```    

 #### Outlined Button
  ```javascript
            OutlinedButton(
              style: OutlinedButton.styleFrom(
                padding: EdgeInsets.symmetric(horizontal: 32, vertical: 8),
                side: BorderSide(color: Colors.blue), // foreground border
              ),
              child: Text('Outlined Button', style: TextStyle(fontSize: 28),
              onPressed: () {},
            ),
 ```    


### IV) Size
- Trường hợp chúng ta muốn add width và height cho button của mình thì sao, cũng giản đơn thôi :v 

![](https://images.viblo.asia/ab925f20-d6be-4686-b37b-02e91774cc77.png)

- Với 3 button chúng ta chỉ cần thêm thuộc tính: minimumSize: Size(width, hieght), chừng đó là đủ
#### Text Button
 ```javascript
            TextButton(
           style: TextButton.styleFrom(
                backgroundColor: Colors.white,
                minimumSize: Size(240, 80),
              ),
              child: Text('Text Button', style: TextStyle(fontSize: 28),
              onPressed: () {},
            ),
 ```    
    
 #### Elevated Button
  ```javascript
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                minimumSize: Size(240, 80),
              ),
              child: Text('Elevated Button', style: TextStyle(fontSize: 28),
              onPressed: () {},
            ),
 ```    

 #### Outlined Button
  ```javascript
            OutlinedButton(
              style: OutlinedButton.styleFrom(
                minimumSize: Size(240, 80),
                side: BorderSide(color: Colors.blue), // foreground border
              ),
              child: Text('Outlined Button', style: TextStyle(fontSize: 28),
              onPressed: () {},
            ),
 ```    

### V) Shadow
- Trường hợp chúng ta muốn thêm 1 chút shadow nhìn cho đẹp mắt thì sao

![](https://images.viblo.asia/d16a29c1-e7c0-4a83-9664-f53818d9fd3f.png)

- Lúc này chúng ta sẽ quan tâm tới 2 thuộc tính chính: 
```elevation``` : Là thuộc tính giúp tạo shadow cho button
```shadowColor```: Color của shadow

#### Text Button
 ```javascript
            TextButton(
              style: TextButton.styleFrom(
                elevation: 8,
                shadowColor: Colors.blue.withOpacity(0.5),
              ),
              child: Text('Text Button', style: TextStyle(fontSize: 28),
              onPressed: () {},
            ),
 ```    
 - Trường hợp các bạn muốn color nó nhạt hoặc trong suốt hơn thì các bạn có thể chỉnh sửa lại Opacity cho nó nha, như code mình add trên ý :v 
 #### Elevated Button
  ```javascript
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                elevation: 8,
                shadowColor: Colors.white,
              ),
              child: Text('Elevated Button', style: TextStyle(fontSize: 28),
              onPressed: () {},
            ),
 ```    

 #### Outlined Button
  ```javascript
            OutlinedButton(
              style: OutlinedButton.styleFrom(
                elevation: 8,
                shadowColor: Colors.blue,
                side: BorderSide(color: Colors.blue), // foreground border
              ),
              child: Text('Outlined Button', style: TextStyle(fontSize: 28),
              onPressed: () {},
            ),
 ```    


### VI) Border
- Trường hợp chúng ta muôn thêm **border** cho các Button thì sao:

![](https://images.viblo.asia/116cba77-87d3-4cfa-bce3-10607e8cef10.png)


- Lúc này chúng ta sẽ quan tâm tới thuộc tính  **side: BorderSide(width, color)**

#### Text Button
 ```javascript
            TextButton(
              style: TextButton.styleFrom(
                side: BorderSide(width: 2, color: Colors.blue),
              ),
              child: Text('Text Button', style: TextStyle(fontSize: 28),
              onPressed: () {},
            ),
 ```    
 - Trường hợp các bạn muốn color nó nhạt hoặc trong suốt hơn thì các bạn có thể chỉnh sửa lại Opacity cho nó nha, như code mình add trên ý :v 
 #### Elevated Button
  ```javascript
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                side: BorderSide(width: 2, color: Colors.white),
              ),
              child: Text('Elevated Button', style: TextStyle(fontSize: 28),
              onPressed: () {},
            ),
 ```    

 #### Outlined Button
  ```javascript
            OutlinedButton(
              style: OutlinedButton.styleFrom(
                side: BorderSide(width: 2, color: Colors.blue),
              ),
              child: Text('Outlined Button', style: TextStyle(fontSize: 28),
              onPressed: () {},
            ),
 ```    

### VII) Shape
- Trường hợp chúng ta muốn Button của mình trở nên tròn hơn hoặc có hình dạng khác, lúc này chúng ta chỉ cẩn thêm thuộc tính **shape** , cụ thể hơn các bạn có thể xem code dưới đây.
![](https://images.viblo.asia/51cffa42-cf06-4cc3-9209-94862ca376d0.png)


#### Text Button
 ```javascript
          TextButton(
            style: TextButton.styleFrom(
              side: BorderSide(width: 2, color: Colors.blue),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
            ),
            child: Text('Text Button', style: TextStyle(fontSize: 28),
            onPressed: () {},
          ),
 ```    
 - Trường hợp các bạn muốn color nó nhạt hoặc trong suốt hơn thì các bạn có thể chỉnh sửa lại Opacity cho nó nha, như code mình add trên ý :v 
 #### Elevated Button
  ```javascript
            ElevatedButton(
             style: ElevatedButton.styleFrom(
               side: BorderSide(width: 2, color: Colors.white),
               shape: RoundedRectangleBorder(
                 borderRadius: BorderRadius.circular(16),
               ),
             ),
              child: Text('Elevated Button', style: TextStyle(fontSize: 28),
              onPressed: () {},
            ),
 ```    

 #### Outlined Button
  ```javascript
            OutlinedButton(
             style: OutlinedButton.styleFrom(
               side: BorderSide(width: 2, color: Colors.blue),
               shape: RoundedRectangleBorder(
                 borderRadius: BorderRadius.circular(16),
               ),
             ),
               // shape: StadiumBorder()
              child: Text('Outlined Button', style: TextStyle(fontSize: 28),
              onPressed: () {},
            ),
 ```    
Ngoài thằng **RoundedRectangleBorder** các bạn có thể sử dụng thằng mặc định **StadiumBorder** cũng được, nó hỗ trợ sẵn bo tròn góc cho Button luôn rồi, vừa tiện vừa ngắn code :v

### VIII) Disable button
- Trong 1 vài trường hợp, chúng ta muốn Button của mình có style như ```disabled button``` thì sao.
![](https://images.viblo.asia/2f382050-f3b5-4d64-89c2-4b37bbb6249e.png)

- Chà lúc này ta phải quan tâm đến 1 thằng đó là **onSurface: color**, có cái hay ở thằng này là nếu chúng ta cho nó color là màu trắng thì lúc này màu đó nó không trắng hoàn toàn mà nhìn nó hơi mờ mờ nhạt nhạt (xem hình trên), là do nó bị chèn thêm 1 chút opacity (độ mờ) đó các bạn, mục đích là khi nhòm vào là biết cái button đó nhìn như nó vừa bị disabled vậy =))

#### Text Button
 ```javascript
          TextButton(
              style: ElevatedButton.styleFrom(
                onSurface: Colors.white,
              ),
            child: Text('Text Button', style: TextStyle(fontSize: 28),
            onPressed: () {},
          ),
 ```    
 - Trường hợp các bạn muốn color nó nhạt hoặc trong suốt hơn thì các bạn có thể chỉnh sửa lại Opacity cho nó nha, như code mình add trên ý :v 
 #### Elevated Button
  ```javascript
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                onSurface: Colors.white,
              ),
              child: Text('Elevated Button', style: TextStyle(fontSize: 28),
              onPressed: () {},
            ),
 ```    

 #### Outlined Button
  ```javascript
            OutlinedButton(
              style: OutlinedButton.styleFrom(
                onSurface: Colors.white,
                side: BorderSide(width: 2, color: Colors.white30),
              ),
               // shape: StadiumBorder()
              child: Text('Outlined Button', style: TextStyle(fontSize: 28),
              onPressed: () {},
            ),
 ```    
### IX) Tổng kết
- Trên đây mình chỉ giới thiệu những điều cần và thiết để những người mới học cũng như các bạn đang học Flutter hiểu rõ hơn về các loại Button 2.0 cũng như cách khai báo và sử dụng chúng cho hợp lý,  nếu có gì sai xót, mong các bạn góp ý.
- Nguồn tham khảo: https://www.youtube.com/watch?v=ytlDKJBxW_A&t=249s
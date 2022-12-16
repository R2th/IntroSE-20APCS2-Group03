> Sau 3 tháng làm việc với React Native, mình nhận thấy có một số vấn đề mà mình phải đối mặt khi mình còn khá non kinh nghiệm. Trong series bài viết này mình sẽ chia sẻ các vấn đề mà mình thường gặp khi phát triển ứng dụng React Native theo quan điểm của mình :D

# I. Estimate không chuẩn:


-----


* Thực sự là khi làm project RN đầu tiên mình estimate sai hoàn toàn (mình estimate mất 2 ngày để làm phần việc nhưng phải mất gần một tuần mới hoàn thành được nó)
1.  Bạn sẽ cần estimate layout cho các phiên bản iOS và Android riêng biệt! Tất nhiên - sẽ có rất nhiều các component được tái sử dụng, nhưng cũng có thể có các layout khác nhau. Hoặc là cấu trúc của cả màn hình cho iOS và Android khác nhau hoàn toàn.

2. Khi bạn estimate các form - bạn nên estimate luôn cả các layout validate. 
3. Nếu bạn tạo một ứng dụng dựa trên webapp mà đã có backend (bạn sẽ phải sử dụng các api có sẵn) - hãy nhớ kiểm tra tất cả các endpoint đã được cung cấp bởi backend. Bởi vì bạn sẽ cần xử lý logic trong ứng dụng và bạn phải code thật chuẩn. Hiểu được cấu trúc của DB, các quan hệ,... Nếu bạn hiểu được nó - bạn sẽ tạo được redux store chuẩn nhất.

# II. Cố gắng sử dụng những component đã được tạo sẵn (các button, footer, header, input, text) - theo quan điểm của mình:



-----

* Nếu bạn check Google về các component như button, footer,... bạn sẽ thấy có rất nhiều thư viện đã làm chúng và chúng ta có thể sử dụng. Nó cực kì hữu ích khi chúng ta không có desgin layout cụ thể. Làm một màn hình chỉ cần sử dụng các component đó là khá ổn. Nhưng nếu bạn có design cụ thể và design trông khác so với component đó - bạn sẽ phải custom lại các styles cho mỗi button. Tất nhiên là bạn có thể bọc các component có sẵn và set custom style cho chúng thay vì làm như trên. Nhưng mình nghĩ sẽ dễ dàng hơn và tốt hơn nếu bạn tự làm compoent của riêng mình bằng cách sử dụng các component có sẵn của RN. 
<br/>
<br/>

# III. Không phân chia layout riêng biệt cho Android và iOS:


-----


* Phần này chỉ hữu ích đối với các ứng dụng yêu cầu 2 kiểu layout riêng biệt cho iOS và Android. Nếu không, bạn chỉ cần sử dụng Platform API được cung cấp bởi RN để check các điều kiện trên tuỳ từng device.
* Nếu các layout hoàn toàn khác biệt nhau - bạn nên chia chúng thành các file riêng biệt.
* Có thể bạn sẽ băn khoăn về việc code bị trùng lặp, câu hỏi này khá hay :D Nếu đoạn code có thể bị trùng lặp thì bạn có thể cho đoạn code đó vào helper.

# IV. Làm sai cấu trúc của project:


-----


* Đối với các beginner thì việc tổ chức cấu trúc project một cách chuẩn chỉ khá là khó, vì chúng ta chưa có nhiều kinh nghiệm, vậy nên việc sai cấu trúc này rất là bình thường thôi.
* Trước tiên - bạn phải hiểu về ứng dụng - nó có lớn không? Có thật sự lớn? Khổng lồ? Hay một project cỡ bình thường - nhỏ ? 
* Có bao nhiêu màn hình mà có trong ứng dụng của bạn? 10? 20? 30? 
* Cấu trúc đầu tiên mà mình gặp và làm thì nó như thế này:
![](https://images.viblo.asia/d1b79e04-ef3d-4c9e-9e36-61307338417f.png)

* Cái này khá tốt nếu ứng dụng của bạn ở cỡ bình thường (khoảng 10 màn hình). Nếu ứng dụng lớn hơn, bạn có thể tham khảo:
![](https://images.viblo.asia/ebfa3ad8-c3cb-4bf8-91a6-c411ce569474.png)
* Điểm khác biệt ở đây là gì? Bạn có thể thấy - đầu tiên, mình chia các action và reducer riêng biệt khỏi container. Thứ hai, mình gộp chúng vào cùng 1 folder. Nếu một ứng dụng nhỏ - sẽ tốt hơn nếu chia các module riêng biệt khỏi container. Đẻ chung 1 con tainer sẽ thuận tiện cho việc xem các module liên quan đến nó một cách dễ dàng hơn,. 
* Nêu bạn có các styles hay dùng (Header, Footer, Button,...) bạn có thể 1 folder riêng biệt gọi là “styles" và dùng chúng cho mỗi màn hình.

# V. Style kiểu inline:


-----


* Sau khi làm việc với RN một thời gian ngắn thì mình nhận ra vấn đề về style các compoent. Giống kiểu ntn:
```javascript
render() {
   return (
       <View style={{flex:1, flexDirection:'row',        backgroundColor:'transparent'}}>
           <Button
               title={"Submit"}
               onPress={this._submit.bind(this)}/>
       </View>
   );
}

```

* Lúc viết kiểu này, mình nghĩ là “thôi keme, cứ viết tạm thế đã, sau này cho style vào file riêng sau" =]]. Nhưng mà thật sự là sau khi viết xong, mình lại quên mất và nhiều khi lười nên thôi luôn =]] Nên cách tốt nhất là nên viết style riêng ra ngay từ đấu nhé các bạn :D

> Phần này mình viết đến đây thôi nhé :D bài viết cũng khá là dài rồi, mình sẽ tiếp tục chia sẻ thêm với các bạn về các vấn đề mà mình thường gặp phải khi phát triển ứng dụng React Native trong phần tiếp theo của series của bài viêt này nhé :3 Cảm ơn các bạn đã theo dõi bài viết đến tận đây, hãy để lại ý kiến, quan điểm của các bạn bằng cách comment vào bên dưới bài viết này nhé :D
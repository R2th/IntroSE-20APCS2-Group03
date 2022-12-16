Mình là một người sinh ra ở thế hệ 9x đời giữa, may mắn được rong chơi thoả thích khắp mọi ngóc ngách của làng quê, phố thị cùng đám trẻ cùng trang lứa, có lẽ phần lớn thời điểm đó chưa bị ảnh hưởng nhiều bởi mạng internet hay smartphone cũng không phổ biến như bây giờ.

Dạo gần đây thông tin về các bạn trẻ xa rời trần thế ngày càng nhiều đằng sau là những áp lực nặng nề. Mình nhớ lại những đoạn đường đã qua, những thăng trầm của cuộc sống về chuyện học hành, công việc, chuyện tình cảm hay những lần ồn ào trong gia đình. Nhớ lại những ngày đó, mình cũng đã đừng có ý định quyên sinh hoặc bỏ nhà đến một nơi xa để tự do giải phóng những cảm xúc hỗn độn... May mắn thay đến giờ mình cũng đã vượt qua được.

Những người làm cha mẹ đều có chung mong muốn sau này con mình sẽ có một cuộc sống thật là tốt.
Tuy vậy, đã bao giờ bạn tự hỏi một cuộc đời tốt sẽ bắt đầu khi nào chưa? Liệu đó là từ lúc một người đạt tới sự ổn định và có một gia đình hạnh phúc của riêng. Hay là từ lúc bạn có được một công việc danh giá với lộ trình thăng tiến rộng mở phía trước... Mình nghĩ, một cuộc đời tốt, có thể bắt đầu từ trước khi bạn được sinh ra.

Thường thì những người từng cảm thấy rằng mình không đạt được vị trí như bản thân mong muốn, không thắng được người khác khi ganh đua ngoài xã hội... sẽ ép con cái phải học rất nhiều. Họ nghĩ rằng như vậy là tốt, là cho con cái tiền đề về một tương lai êm ấm và viên mãn. Nhưng thực sự thì những quyết định xuất phát từ một tổn thương trong tâm lý thường ít khi đưa được ai đến với một tương lai tích cực.

Đó là lăng kính của những bạn trẻ gặp đang phải những áp lực về học hành, gia đình, còn đối với anh em developer chúng ta. Đôi khi sự áp lực đến từ cô gái QA mà mình thầm crush từ lâu, anh leader mà mình nuôi sự ngưỡng mộ về cách quản lý công việc tuyệt vời, hôm nay lại gửi mình một list bugs dài đằng đẵng cùng tin nhắn OT ngày cuối tuần... Để cuộc sống này bớt khô khan với những thứ sách vở, hôm nay mình sẽ chia sẻ đến mọi người một vài thủ thuật mà có thể với những anh em developer cổ thụ cũng chưa biết.

Với vài tricks này, biết đâu sẽ giúp anh em resolve hết các ticket đang đợi mà kịp giờ lên đồ chơi lễ.
![](https://images.viblo.asia/583a53bd-b466-4922-9298-2d21f05a9247.png)

### 1.  Thuộc tính để số đỡ giực giực `font-variant`
Dạo gần đây, mình thấy nhà nhà đổ xô đi chơi chứng khoán. Bà chị mình đợt rồi lỗ hẳn chục triệu, thế nên mình cũng tò mò vào cái trang chứng khoán xem nó như thế nào. Nhìn các con số, màu xanh màu đỏ... nhảy liên tục mà mình hoa cả mắt. Chợt nhớ ra có một thuộc tính này khá thú vị, dùng cho trường hợp nhảy số liên tục không bị *"giực giực"*, anh em có thể tham khảo thử.

{@embed: https://jsfiddle.net/KhuyenNH/pjbuzocx/embed/result,html,css/dark}

### 2. Thuộc tính `form` trong các thành phần của `form`
Đã bao giờ bạn phải khổ sở tìm cách viết js để xử lý event cho việc ấn button submit nằm ngoài form bao giờ chưa?

Lần trước mình làm một page có chiều dài form dài hơn 2 cái màn Dell gộp lại :v với trường hợp như vậy, về mặt UX phải tạo ra button "submit" và button "cancel" fixed footer (tức là scroll thì 2 cái button đó luôn chạy theo màn hình) để có thể submit mọi lúc mà không phải scroll tới cuối trang mới ấn được. 

Để chiều theo design như vậy thì phía Frontend phải mang `<button>` ra khỏi `<form>`, điều đó thông thường là vô lý vì mọi thành phần trong form phải được đặt trong thẻ `<form>` mới submit được data.
![](https://images.viblo.asia/9b5cd6d3-9d72-44ad-ae10-9076379eb875.png)

Tuy nhiên, ***"vỏ quýt dày có móng tay nhọn, móng tay nhọn có bấm móng tay"*** để làm được việc đó, mình sẽ làm như sau:

```html
<form action="" id="formAhihi">
  <section>
    <input type="text" placeholder="username ahihi">
    <input type="password" placeholder="password ahihi">
  </section>

  <section>
    <input type="text" placeholder="username ahihi2">
    <input type="password" placeholder="password ahihi2">
  </section>
  ...
</form>

<footer>
  <button type="reset" form="formAhihi">Reset</button>
  <button type="submit" form="formAhihi">Submit</button>
</footer>
```

Như ở trên, thẻ `<button>` mình đã để ngoài `<form>`, tuy nhiên ở `form` mình có `id="formAhihi"` còn ở `button` mình có attribute là `form` 2 thuộc tính này sẽ liên kết với nhau và ngoài button ra bạn cũng có thể dùng cho `<input>` đều được.
### 3. Bug `100vh` trên thiết bị iOS Safari
Chắc hẳn các anh em làm Frontend đã từng trải qua những lần bị bắt bug về việc thanh address của safari "lơ lửng" làm cho phần UI first view không đúng với design ban đầu.
![](https://images.viblo.asia/e1d2f1a0-8f25-4a31-9da2-b1aaf6b95e18.png)

Để giải quyết vấn đề này, mình đã từng fix việc này mình đã chịu khó lang thang trên stackoverflow với đâu đó 3 cách khác nhau 🤣 tuy nhiên ngắn gọn và nhìn có vẻ xịn sò nhất là dùng như bên dưới
```scss
body {
    min-height: 100vh;
    /* fix issues bug viewport IOS */
    min-height: -webkit-fill-available;
}
```
Chỉ cần 1 dòng thôi là đủ để resolve ticket để đi chơi lễ rồi.

### Tổng kết
Trên đây là một vài tips để anh em giúp dự án của mình awesome hơn, nếu có tips hay, hãy để lại dưới comment. Cảm ơn mọi người đã dành thời gian đọc bài chia sẻ của mình.
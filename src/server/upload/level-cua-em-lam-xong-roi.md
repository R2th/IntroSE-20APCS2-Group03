## Tại sao nên đọc bài này?

- Bạn đang tạo ra value ở level nào
- Để tạo ra nhiều impact hơn

## “Em làm xong rồi, nhưng mà…”

…nhưng mà cần chờ back end support thêm cái này; … nhưng mà cần chờ design export cái icon này thay vào là xong

Task của mình thì về cơ bản là 99.69% là xong rồi, chỉ cần backend deploy, design đưa cái icon thay vào là xong 💁‍♂️

![image.png](https://images.viblo.asia/4a0eb27c-ab2b-4049-9c15-b4e085451e0e.png)

Mình để cho mọi thứ xong 99.69% và phó mặc việc đó cho backend, design vì những thứ đó mình đâu làm được đâu, do họ làm chậm task mà.

… Do người ta

## “Em làm xong rồi”

Hồi mới đi làm mình thích nhất khi có ai hỏi mình task này thế nào rồi thì mình như mở cờ trong bụng 😏 “Em làm xong rồi!”, “Task này done rồi”, “Kéo cái này qua cột done được rồi nè”

Sau khi mình không đổ lỗi việc “Gần xong” là vì người ta, mình bắt đầu take care đến task của mình hơn. Nếu backend chưa làm xong, mình chờ họ làm xong rồi test lại. Ông nào lười quá thì nhắc nhẹ hoăc nặng để làm sao cho task của mình chạy ok

![image.png](https://images.viblo.asia/ef2df828-9b68-4804-ae20-80f4b60a440b.png)

Trong những lần như vậy, có lúc task done, có lúc thì “I’m done 🙃” khi bị dội về những câu hỏi

- Case truyền vào ngày sinh > ngày hiện tại chưa validate
- Break layout ở tablet
- Dropdown này lệch “hơi nhiều” so với design
- Đã review & merge code chưa?
- Vân vây và mây mây

Cay cú, vậy là khi làm task phải có criteria rõ ràng

- Vậy validate ngày sinh trong range bao nhiêu tới bao nhiêu? Có người để năm sinh là 1800 thì sao?
- Có cần support ở tablet không?
- Dropdown này lệch một xíu có ok không anh chị design ơi?

Vậy là mỗi lần nói “Em làm xong rồi” tự tin hơn đôi chút. Mình làm đúng tiêu chí mà task được đề ra

## “Task này ok rồi những feature liên quan thì … toang”

![image.png](https://images.viblo.asia/79879c17-190d-44ab-9e80-27d1145ae849.png)

Không ít lần, in fact, phải nói là rất nhiều lần thì làm xong cái này thì kiểu gì một lúc nào đó cũng lòi ra một vài regression bug. Thêm cái login modal thì break layout Nav bar trên mobile, thêm cái icon thì line-height của text bị to hơn bình thường,…

Nhiều khi chả ai biết tới regression bug đó, nhiều khi mình biết có thể nó sẽ có regression bug nhưng lười nên thôi kệ nó, nhiều khi change có xíu thì vào đọc code rồi múc luôn, cần gì test lại, mình pro mà,… Bug mà chưa được tìm thấy thì đâu ai goi là bug đâu 🙂

Mình làm những task cho xong con cả hệ thống như thế nào thì mình lại không để tâm tới.

> Liệu như vậy có gọi là “Em xong rồi” không?
> 

## “Task này perfect ròi, nhưng nhìn có vẻ hơi vô duyên”

![image.png](https://images.viblo.asia/53390813-5498-4c9f-9f1e-79752eb84c4e.png)

Có bao giờ bạn test app mình viết với suy nghĩ của user?

Mình thường xuyên có vài pattern kiểu Test, ABC, xxx bỏ vào cái form, submit thử, ăn thì là “Done”, không ăn thì là bug. Xong rồi nhiều lúc app làm xong feedback về, em đâu cần cái field này dài full cả màn hình, có ai để email dài vậy đâu em?

Nhiều khi có modal gì đang mở mình muốn tắt đi, auto mò tay lên nút `ESC` để tắt nó. Tắt được thì ok, còn không tắt được thì chửi thầm trong bụng app gì “UX” như cức. Ồ mình chửi thầm người ta như vậy, nhưng có bao giờ mình care tới cái modal mình viết đã support `ESC` để tắt chưa?

Nó vậy đó, có quá nhiều thứ để làm nó chỉn chu và bản thân cả team cũng ít người mà nhớ hết được. Chỉ có dùng góc nhìn của user, sử dụng app như app hàng này của mình thì mới biết được là mình còn thiếu nhiều quá.

> Vậy mình làm xong task nhưng mình có mindful về nó không?
> 

## Bạn có giám khoe thứ mình làm với người khác?

Một kiểu nói chuyện mà mình đã từng nói, và cũng đã từng nghe rất nhiều có pattern kiểu này

- E ku, giờ đang làm gì rồi?
- À tao đang làm Prj X cho công ty Y bự lắm
- Ghê, xịn đó
- Bề nổi thôi pa ơi, bên trong bug rồi structure tè le. Ông Z thì làm lead mà chả giúp được gì, ông K làm architecture xàm xàm,…

![image.png](https://images.viblo.asia/a319d801-5a59-4796-99f7-2ea9ef068c53.png)

Rất hiếm, rất rất hiếm có một người sẽ trả lời kiểu “Tao làm prj X cho công ty Y bự lắm, dùng cái X này ok lắm nè, có cái Y dùng tạm được, từ hồi release ra thấy client khen quá trời, bên đó cũng nhận được nhiều user hơn,…”

Mình nhận ra level của sự quan tâm về việc “Em làm xong rồi” liên quan mật thiết đối với level của người đó. Nhiều khi có những thứ họ không làm được, nhưng họ luôn muốn đẩy mọi thứ tốt hơn, “xong rồi” ở level cao hơn. Để cuối cùng, tạo ra nhiều value hơn. Còn bạn, bạn có tự hào về những thứ mình đã làm?

## Bài viết “lan quyên”
- https://thanhle.blog/blog/khi-minh-chon-kho-tinh
- https://thanhle.blog/blog/lam-viec-tao-ra-value
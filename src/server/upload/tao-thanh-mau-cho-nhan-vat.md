![](https://images.viblo.asia/84421b06-3609-4930-9e06-ad963d1400b8.jpg)

Chào các bạn,

Hôm nay mình sẽ hướng dẫn các bạn làm 1 thanh máu cho nhân vật nhé!

Cái này cũng khá là đơn giản thôi, vì vậy sẽ phù hợp cho những bạn mới đang tìm hiểu về Unity hơn, cơ bản là mình cũng bí chủ đề để viết viblo quá vì vậy viết cái này nhé ;)

OK, vào việc nào!

Bước 1: Ảnh.

- Mình không biết các bạn sao, chứ mình bị ảnh hưởng bởi hình ảnh rất nhiều trong quá trình làm việc, nếu có 1 cái ảnh đẹp mình sẽ có hứng thú làm game hơn là ngồi nhìn mấy cái ảnh default.
- Chúng ta sẽ lên google kiếm tạm vài cái trong thời gian chờ designer làm nhé ;)
- Các bạn download về, nếu được hãy kiếm cái nào đã tách được cả border và phần fill bên trong nhé. Nếu ko thì chúng ta lại dùng vài đường photoshop cơ bản là xong ấy mà :v

![](https://images.viblo.asia/f4112906-f8e7-4934-8b13-f93c46aa051a.png)

Bước 2: Tạo thanh Health Bar bằng ảnh bên trên.

- Các bạn tạo 2 ảnh trong UI, 1 cái đặt bên trong cái còn lại (chúng sẽ nằm trong 1 cái canvas)

![](https://images.viblo.asia/0a51c26b-e85e-4057-8f15-e31b03d5ac56.png)

- Kéo ảnh border vào đối tượng cha, ảnh fill vào đối tượng con.

![](https://images.viblo.asia/6d9c65cb-26d8-459c-933e-d1086545fee6.png)

- Chỉnh lại tọa độ của Fill để đảm bảo nó nằm trong border.

![](https://images.viblo.asia/6d747f0d-f8ce-47bb-b7d9-cb1eca38c6c4.png)

Bước 3: Làm cho fill có thể tăng giảm.

- Ở bước trên bạn đã có thanh máu rồi, nhưng nó chưa có hoạt động gì cả, giờ chúng ta sẽ làm cho nó có thể tăng giảm giống như khi chúng ta bị giảm bớt máu hoặc hối máu nhé!
- Các bạn ấn vào Image-Fill, sau đó đổi Image Type từ Simple thành Filled.
- Tiếp theo ở bên dưới của Image Type các bạn sẽ thấy có Fill Method, các bạn đổi nó từ Radial 360 thành Horizoltal.
- Giờ các bạn thử kéo thanh trượt ở dòng Fill Amount ngay dưới, ta...da... thanh máu hoạt động rồi kìa :v thế là xong bài viết rồi nhé :v

![](https://images.viblo.asia/9530ec4a-f908-452b-8466-071c29cb6036.png)

Bước 4: Gán thanh máu lên trên nhân vật.

- Các bạn sẽ hỏi ủa sao xong rồi còn bước 4 chi, thì chúng ta chỉ xong thanh máu thôi, chứ nó chưa được gắn lên nhân vật, vì vậy trừ khi các bạn làm thanh máu cho nhân vật chính của mình, còn nếu là thanh máu của các nhân vật khác, như là quái vật, tướng... thì tiếp nào :v
- Các bạn sẽ thấy hiện tại, khi nhân vật hay cái gì di chuyển đi nữa, thanh máu nó vẫn cứ đứng ở 1 chỗ đó, vậy thì ko ổn, mình cần gán nó lên đầu mỗi nhân vật.
- Các bạn hãy ấn vào canvas của cái thanh máu đó, rồi đổi Render Mode từ Screen Space - Overlay thành World Space.
- Set Pos về 0 hết, Set Width Height cũng về 0 luôn, Set Scale từ 1 về 0.01 hết. (Image-Border các bạn cho Pos cũng về 0 nhé).

![](https://images.viblo.asia/9bcbc3b4-8639-4bb8-b8c6-7650d90911d4.png)

- Giờ các bạn kéo Canvas đó vào trong nhân vật (cho nó làm phần tử con của nhân vật). (Cũng nhớ lên mạng kiếm cái nhân vật nào các bạn thích cho nó có tí hứng thú làm việc nhé :v)
- Tiếp theo các bạn set tọa độ Canvas đó cho cho thanh máu hiển thị ở trên đầu của nhân vật là được.

![](https://images.viblo.asia/c4e4f881-a85d-4b95-af9f-103ecffd61a7.png)

- Giờ các bạn thử di chuyển nhân vật sẽ thấy thanh máu cũng đã di chuyển theo nhân vật rồi nhé! Hãy nhân bản thanh máu đó/ tạo thanh máu tương tự cho những nhân vật khác nhé!

Bước 5: Viết Script để thay đổi mức độ trên thanh máu mỗi khi bị đánh.

- Giờ chúng ta sẽ viết 1 script để tác động vào thanh máu mỗi khi chúng ta bị đánh.
- Hãy tạo 1 script gán cho nhân vật.
- Tạo 1 biến public có kiểu dữ liệu là Image (nhớ using UnityEngine.UI ở đầu script nhé) đặt tên là healthBar.
- Tạo thêm 2 biến kiểu int có giá trị là 100, 1 bên tên là health, 1 bến tên là healthMax.
- Viết 1 phương thức có tên là Hit với param là damage mà nhân vật phải nhận, nhớ để nó cũng là public để được gọi từ ngoài tới.
- Bên trong phương thức các bạn sẽ trừ health với damage.
- Tiếp theo các bạn set fillAmount của healthBar (chú ý max của cái này là 1, vì vậy chúng ta chia theo tỷ lệ nhé!) bằng health/healthMax.

```
using UnityEngine.UI;
...

public Image healthBar;
int health = 100;
int healthMax = 100;
...

public void Hit(int _damage) {
    health -= _damage;
    healthBar.fillAmount = health / healthMax;
}
```

- Cuối cùng các bạn quay lại Editor và kéo Image-Fill vào healthBar trên Script của nhân vật là xong rồi!

![](https://images.viblo.asia/9e9be75e-74cb-455f-925e-7ba5a47bbdc1.png)

P/s: Các bạn nên kiểm tra health để nó không nhỏ hơn 0 trước khi set HealthBar nhé, không nó âm luôn thanh máu đó :v

Chúc các bạn thành công nhé ^_^
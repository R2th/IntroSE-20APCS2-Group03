Trong bài viết mình sử dụng thư viện **p5js** để code, bạn có thể tìm hiểu về thư viện này qua:
* https://p5js.org/
* https://viblo.asia/p/tim-hieu-ve-p5js-phan-1-RnB5p07w5PG
* https://viblo.asia/p/tim-hieu-ve-p5js-phan-2-aWj53kbY56m

# Bắt đầu với tạo hình các nhân vật
**Zombie:**

![](https://images.viblo.asia/c4b0ed4f-7f45-4d6c-b71b-b7d34aa823a2.png)

**Người chơi:**

![](https://images.viblo.asia/e9deb56f-4b1e-4450-821c-e57205d2c8b8.png)

**Cầm súng:**

![](https://images.viblo.asia/7287c02f-bced-4aad-ac10-ed21b899be04.png)

Zombie thì mình lấy ý tưởng từ minecraft còn người chơi thì lại từ game surviv.io nên mới con hình vuông, con hình tròn vậy :)

# Di chuyển
**Người chơi:**

{@embed: https://codepen.io/hungkieu/pen/dwBoQr}

Các phím điều khiển: "W, A, S, D"

**Zombie:**
{@embed: https://codepen.io/hungkieu/pen/VqJvYo}

Của zombie thì sẽ lấy người chơi làm mục tiêu và lao vào tấn công

# Bắn súng
Việc vẽ các viên đạn cần một mảng để lưu trữ từng viên, vì vậy sau một thời gian mảng sẽ rất lớn và tốn bộ nhớ, mình cần đặt một khoảng thời gian chết cho viên đạn, và xóa chúng đi.

Ngoài ra mình còn đặt một khoảng thời gian trễ giữa 2 lần bắn khi người dùng giữ chuột.

Một số cái nhỏ nhặt khác như làm hiệu ứng bay của đạn cho đẹp
{@embed: https://codepen.io/hungkieu/pen/JwQGGX}

# Cái chết
Phần này thì mình cần phải tính toán đạn có bắn trúng zombie hay không, cách thức thì là đo khỏang cách giữa viên đạn và con zombie thôi, một vật hình vuông thì hơi khó tính, nên mình đặt hitbox của con zombie là hình tròn luôn :)

Khi bị bắn trúng sẽ mất máu và chết, rồi lại tái sinh thành con khác:

{@embed: https://codepen.io/hungkieu/pen/JwQGVy}

Nhân vật thì hiện tại vẫn bất tử :innocent:
# Hiệu ứng âm thanh
Bạn có thể xem demo bản có âm thanh tại đây:

https://hungkieu.github.io/fly/

# Kết thúc
Phần tiếp theo mình sẽ đưa thêm các hiệu ứng, thêm UI cho game, ngoài ra sẽ tối ưu hóa phần code :) , còn phần 1 đến đây là hết, cảm ơn các bạn đã xem bài viết. ![](https://tracktracktrack.herokuapp.com/0egnk6uoptxb9fay/img)
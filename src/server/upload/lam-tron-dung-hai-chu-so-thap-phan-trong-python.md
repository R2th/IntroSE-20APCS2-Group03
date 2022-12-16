![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2021/03/dialog-148815_1280.png?w=1280&ssl=1)

Làm tròn số thực trong Python là chuyện thường ngày, và tụi mình sẽ sử dụng rất nhiều trong khi học Python cùng toán cũng như trong hiển thị các số thực với một số lượng các chữ số thập phân bất kỳ.

À quên, nếu bạn có hứng thú hãy ghé đọc bài về [số thực trong Python tutorial](https://docs.python.org/3/tutorial/floatingpoint.html) này nhé

Ở tip nho nhỏ này, mình sẽ đi làm tròn hai chữ số thập phân nha. 

Okay, bắt đầu mình muốn làm tròn kết quả phép tính 1/3

## Dùng hàm round()
Hàm này thì khá phổ biến, chỉ cần search làm tròn số trong Python là sẽ hiện bạn ấy. Cùng xem bạn ấy làm tròn hai chữ số thập phân phép tính trên:

```
>>> round(1/3, 2)
0.33
```

Trông ngon lành đấy, thử thêm một ví dụ nữa nha. Lần này tớ muốn làm tròn phép tính 7/2 cơ.

```
>>> round(7/2, 2)
3.5
```

Ơ, sao chỉ có 3.5 thế kia nhỉ? Làm tròn hai số thập phân kết quả mình mong đợi là 3.50 kia mà.
Hmm, coi bộ không ổn với kết quả trả ra số chữ số thập phân nhỏ hơn mình mong đợi rồi. 
Tiếp theo mình sẽ kiếm cách làm tròn chính xác với hai số thập phân nha.

## Chuyển format với string
Cách tiếp theo là mình dùng hàm format() để chuyển đổi với định dạng chuỗi ký tự mong đợi có 2 số phía sau dấu .

```
>>> "{:.2f}".format(7/2)
'3.50'
```

Lưu ý nhỏ là ở đây trả ra string đó nha, bạn muốn dùng số thực thì nhớ chuyển đổi kiểu dữ liệu qua số thực với hàm float nhé.

Như vậy nè: `float(“{:.2f}”.format(7/2))`

Tip hôm nay chỉ có vậy thôi, mong nó hữu ích với bạn nhé 😉

[Bài gốc](https://beautyoncode.com/lam-tron-dung-hai-chu-so-thap-phan-trong-python/) ở blog của tớ, mời bạn ghé chơi.

---

If you think these contents are helpful, you could send me an encouraging by:
- Support me
  - [☕️ Buy me a coffee](https://ko-fi.com/beautyoncode)
  - [😇 Send a hi on Momo](https://me.momo.vn/beautyoncode)
  - [👀 Visit support page](beautyoncode.com/support/)
- Visit my blog at [beautyoncode.com](beautyoncode.com)
- Follow me on:
  - [Careerly](https://careerly.vn/profiles/1140)
  - [fanpage](facebook.com/beautyoncode)
  - [linkedin](https://www.linkedin.com/in/graphicdthanh/)

🤘 Chat with me 🤘 

See you around, friends!
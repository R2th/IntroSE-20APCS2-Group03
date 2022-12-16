![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2022/06/git-1.png)

Khi bắt đầu một dự án xây dựng web, một trong những công việc đầu tiên là tạo cấu trúc thư mục(code structure) cho trang web và commit cấu trúc thư mục này lên repo.

Ví dụ thiết kế một cấu trúc thư mục như thế này cho một trang web đơn giản:

```
src/
|-- assets/
    |-- images/
|-- styles/
    |-- main.css
index.html
README.md
```

Tuy nhiên, khi thực hiện thao tác để commit cấu trúc thư mục này thì mình chỉ thấy có file `index.html` và file `src/styles/main.css` thay đổi để commit mà thôi!

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2022/06/gitkeep-0.png)

Điều này cũng có nghĩa là khi code push lên repo của mình thì sẽ không có cấu trúc như mình mong muốn!

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2022/06/gitkeep-1.png)

Vậy làm thế nào để có thể commit các thư mục trống không chứ file như assets , assets/images lên git?

Câu này mình nghĩ là khá đơn giản, bạn có thể lên google và search “How to keep empty folder on git” là sẽ có ngay [câu trả lời](https://stackoverflow.com/questions/115983/how-can-i-add-a-blank-directory-to-a-git-repository).

Đó là dùng file `.gitkeep` đặt vào trong thư mục trống đó.

Thế là đã có thể commit lên được rồi. Và đây là kết quả.

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2022/06/gitkeep-2.png)

### Như tại sao lại là file .gitkeep nhỉ? Liệu có thể là file khác được không?

Câu trả lời là **CÓ**! 

Bạn có thể đặt bất cứ file nào, `text.txt` hay thậm chí là `.gitignore`.

Tuy nhiên vì mục đích của file này là giữ cho một thư mục có thể trống, theo nghĩa đen của nó, nên theo cách làm tiêu chuẩn sẽ là một file có đủ ý nghĩa trên:

-  `.gitkeep` là file ẩn

-  `.gitkeep` mang ý nghĩa đúng với vai trò của nó

Hi vọng bạn sẽ nhớ đến .gitkeep khi cần commit thư mục trống và hiểu thêm vì sao lại dùng bạn ấy nhé. Cơ mà nói chứ bạn sẽ ít xài lắm, vì thư mục có khi nào trống đâu haha.

[Bài này gốc](https://beautyoncode.com/gitkeep/) trên blog cá nhân của mình, mời bạn ghé chơi nhé.

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
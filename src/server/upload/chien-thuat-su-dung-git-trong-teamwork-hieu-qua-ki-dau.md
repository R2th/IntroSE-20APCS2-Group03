Tí là một "coder bờ rào" đang được thầu nguyên một dự án về phần mềm quản lí nhân viên tại công ty ABC. Với tốc độ code 500 line/hours, giải lao thì commit code lên master, cuối ngày **`git push`** một cái rồi tắt máy lội suối băng đèo về nhà.

Ngờ đâu leader của Tí muốn đẩy nhanh tiến độ nên đã tuyển thêm 2 bạn thực tập vào support. Ngờ đâu, mọi chuyện bắt đầu phức tạp hơn. Code trong team bị chồng chéo và xung đột liên tục, branch master bỗng phân nhánh như màng nhện. Tốc độ code giảm xuống, còn số lần search Google thì tăng lên. Cuộc đời Tí lâm vào bế tắc.

![](https://images.viblo.asia/0081eea3-cc17-4396-a3fb-c5889a089359.png)

Đang trong lúc tuyệt vọng thì Tí tìm được những "bí kíp" giải quyết vấn đề. Hãy cùng xem nó là gì nhé!
## 1. Quy ước phân nhánh
Trong Git thì khả năng phân nhánh (branch) khá đơn giản và nhanh chóng. Vấn đề là cần phải xây dựng một quy ước phân nhánh hợp lí để đồng đội có thể hợp phối hợp nhịp nhàng mà thôi. Bạn có thể chia dự án thành 2 branch chính:
* master
* dev

Nhánh **master** sẽ là nơi chứa phần code **ổn định nhất**, sẵn sàng để triển khai bất cứ lúc nào. Trong khi đó, nhánh **dev** ban đầu được tách ra từ master, và sẽ chứa phần **code mới nhất** được phát triển.

Nếu bạn nào không nhớ thì để tạo nhánh mới trong Git, bạn dùng lệnh:
```
git checkout -b <tên nhánh mới> [nhánh gốc]
```
Chẳng hạn, để tạo nhánh `dev` từ` master`, bạn gõ 
```
git checkout -b dev master.
```
Nếu không cung cấp tham số` [nhánh gốc]`, nhánh mới tạo sẽ dựa trên nhánh hiện tại bạn đang ở. Để xem nhánh hiện tại là nhánh nào, bạn có thể dùng lệnh
```
$ git branch
```
Ví dụ kết quả trả về là:
```
  auth
* auth-session
  dev
  graphql
  master
```
thì nhánh hiện tại của bạn chính là `auth-session.`
## 2. Phân chia công việc
Khi đã có 2 nhánh như ở trên rồi thì mỗi khi phát triển tính năng mới, bạn **truy cập vào dev và tạo thêm các nhánh nhỏ trong đó.**
```
git checkout -b login dev
```

Nhánh này dưới quyền cai quản của bạn, nên hãy làm những gì bạn muốn nhé. Cứ commit thường xuyên, dù chỉ là những thay đổi nhỏ nhất. Cũng đừng ngần ngại rằng commit nhỏ sẽ khiến git log khó theo dõi. Vì mọi thứ đều có cách giải quyết.

Đến đây, Tí chợt nhận ra một điều rằng: Lỡ như những người đồng đội của Tí đều cùng làm chung một tính năng thì sao? 

Nếu gặp phải trường hợp ấy, bạn có thể tiếp tục chia nhỏ hơn nữa, để đảm bảo mỗi người làm việc trên một nhánh độc lập.

> Một tính năng to sẽ có 2-3 người phát triển. Nếu số lượng người tham gia vượt quá con số này, thì bạn hãy xem xét phân chia các tính năng đó nhỏ hơn.

## 3. Chuẩn bị merge vào dev
Sau khi code hoàn tất và tất cả unit tests đã chạy thành công, giờ là lúc bạn merge/gửi code để review tính năng mới vào dev. Thông thường, sẽ có 2 trường hợp xảy ra:

### Trường hợp 1: Không có gì mới trong dev

Giả sử lúc đó Git history của dự án giống như thế này:
![](https://images.viblo.asia/c1cbf728-4b7d-47c7-8dc6-534d70ad5226.png)

Như bạn thấy, nhánh `login` màu vàng được rẽ ra từ nhánh `dev` màu xanh, và trong nhánh `dev` không có code gì mới. Đây là trường hợp lý tưởng, đảm bảo khi *merge vào dev* chúng ta sẽ không bị xung đột code.

### Trường hợp 2: Có commits mới trong nhánh dev
![](https://images.viblo.asia/26f6a247-b7fd-4233-b6cd-a41914bb555f.png)

Trong trường hợp này, `branch dev` (màu xanh) đang có 2 commits phía trước `branch login` (màu vàng). Nếu trong 2 commits đó có chứa thay đổi liên quan đến dev, chẳng hạn như package.json, thì khả năng cao là sẽ xảy ra xung đột khi merge trực tiếp login vào. Mà dù có may mắn không xảy ra xung đột code, thì merge vào cũng sẽ làm history xấu đi.

![](https://images.viblo.asia/83743bec-6537-48b0-b28d-bb536ce13bb8.png)

Do đó, chúng ta sẽ cần sửa lại history của nhánh login bằng cách dùng `git rebase.`

### git rebase là gì?

![](https://images.viblo.asia/f23d3974-f5cb-4ea1-a615-658c04ba55d1.png)

**git rebase** sẽ đem những commits bên trong nhánh login và áp dụng lại vào sau commit mới nhất trong nhánh dev. 

Cú pháp của lệnh này là:
```
git rebase <tên nhánh muốn áp dụng lại>
```

Quay trở lại ví dụ trên, bạn sẽ cần chạy những lệnh sau:
```
# Cập nhật repo hiện tại, đồng thời lấy về commits mới nhất của `dev`
git pull

# Chuyển qua nhánh `login` (bỏ qua bước này nếu bạn chắc chắn mình đang ở `login`)
git checkout login

# Tiến hành rebase
git rebase dev
```

Nếu xảy ra xung đột code, bạn có thể phát hiện và giải quyết chúng sớm. Nguyên tắc chung là không sửa code của người khác, và chỉ kết hợp thêm những gì bạn làm. Việc thực hiện rebase tại nhánh chức năng do bạn phụ trách giúp giảm thiểu khả năng mất code, vì bạn là người hiểu rõ nhất phần code bạn viết.

Sau khi giải quyết hết các xung đột trong code, bạn chạy `git rebase --continue` để tiếp tục tiến trình rebase. Bạn cũng có thể chạy `git rebase --abort` để hủy bỏ rebase và đưa nhánh login về lại trạng thái ban đầu.

Nếu chưa quen **rebase**, bạn có thể tạo một branch mới từ `login`, ví dụ: `git checkout -b test login`, và tiến hành rebase trên branch này. Sau khi chắc chắn là mọi thứ ổn thỏa, bạn có thể quay lại và tiến hành rebase cho login.

Khi rebase xong, mong là history của bạn trông sẽ giống như thế này:
![](https://images.viblo.asia/118ccb31-4dca-42ee-8ed6-b88f64b32d6b.png)

## Tạm kết

Vậy là trong bài viết này chúng ta đã nắm được:
* Quy ước phân nhánh
* Chiến thuật phân chia công việc
* Và phần chuẩn bị để merge vào branch `dev`

Đó đều là những bí kíp cơ bản đầu tiên giúp bạn làm việc nhóm hiệu quả hơn với Git. Trong phần tiếp theo, mình sẽ đi sâu hơn về các "chiêu thức merge" khác. Quá trình merge từ branch `dev` vào branch `master` cùng những bonus thú vị khác nhé!

***Update:** Kì cuối đã có [tại đây!](https://viblo.asia/p/chien-thuat-su-dung-git-trong-teamwork-hieu-qua-ki-cuoi-gDVK2ByrKLj)
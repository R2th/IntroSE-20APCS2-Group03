# Events trigger
Bạn có thể cấu hình cho workflows chạy khi có một sự kiện nào đó xảy ra trên GitHub, theo một lịch có sẵn hoặc cũng có thể là một sự kiện nào đó xảy ra ngoài GitHub.

### Cấu hình cho một workflow events
Bạn có thể cấu hình cho một workflow run một hoặc một trong những events được thực hiện thông qua cú pháp `on` . Xem thêm cú pháp ở ["Workflow syntax for GitHub Actions."](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#on).

syntax của một event trigger
> on.<push|pull_request>.<branches|tags>

Ví dụ cấu hình trigger khi actions push, pull request và một branch.
```
# Triggered một workflow khi có push code lên một branch bất kì 
# của responsotiry
on: push

# Triggers một workflow có push code hoặc pull request
on: [push, pull_request]
```

hoặc bạn cũng có thể sử dụng nhiều events với các cấu hình khác nhau.
```
on:
  # Trigger một workflow khi push or pull request,
  # nhưng chỉ trên main branch
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  # Cũng trigger khi page_build, cũng như release created events
  page_build:
  release:
    types: # Cấu hình này không ảnh hưởng đến events page_build ở trên
      - created
```
> on.<push|pull_request>.paths

Ví dụ cấu hình trigger khi actions push, pull request và bỏ qua khi chỉ có action folder `docs`.
```
on:
  push:
    paths-ignore:
    - 'docs/**'
```
hoặc chỉ trigger khi có action trên các file có đuôi `js`
```
on:
  push:
    paths:
    - '**.js'
```

Các bước xảy để một event có thể trigger một workflow run:
1. Một event xảy ra trên reponsotory của bạn và kết quả trả về có một liên kết commit SHA và Git ref.
2. Thư mục .github/workflows lưa trữ các yml file để định nghĩa các workflow. Github sẽ đọc những file đó để tham chiết tới commit SHA và Git ref. Các file yml có chứa các events mới được xem xét thực thi.
3.  Các workflow files có commit SHA và Git ref được triển khai, và một workflow mới sẽ chạy với các trigger khi các trigger trong file yml trùng với sự kiện đang trigger.

# Trigger theo Scheduled
Để tạo một schedule chúng ta sử dụng cúp pháp `schedule`. Một `Scheduled` event cho phép trigger một workflow theo một lịch được định nghĩa sẵn.  Một `Scheduled` có thể bị delay do hệ thống đang load.

Bạn có thể tạo một scheduled trigger chạy trên UTC time sử dụng [POSIX cron syntax](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html#tag_20_25_07). Một workkflow đã được lên lịch sẽ thực thi trên source của commit mới nhất trên default hoặc base branch. Thời gian ngắn nhất để tạo ra một scheduled workflows tối thiểu là 5 phút.

Ví dụ trigger schedule đơn giản, thực hiện run workflows mỗi 15 phút:
```
on:
  schedule:
    - cron:  '*/15 * * * *' // thực hiện trigger mỗi 15 phút
```
Cú pháp Cron syntax có 5 fields được phân cách bằng một khoảng trắng, mỗi field đại diện cho một đơn vị thời gian.
```
┌───────────── phút (0 - 59)
│ ┌───────────── giờ (0 - 23)
│ │ ┌───────────── ngày trong tháng (1 - 31)
│ │ │ ┌───────────── tháng (1 - 12 or JAN-DEC)
│ │ │ │ ┌───────────── ngày trong tuần (0 - 6 or SUN-SAT)
│ │ │ │ │                                   
│ │ │ │ │
│ │ │ │ │
* * * * *
```
Bạn cũng có thể sử dụng các toán tử trong mỗi fields:


| Toán tử | mô tả | ví dụ |
| -------- | -------- | -------- |
*   |	Tất cả các giá trị|	* * * * * Chạy mỗi phút trong tất cả các ngày.
,	| Giá trị trong danh sách |	2,10 4,5 * * * chạy phút thứ 2, 10, 4, 5 trong mỗi giờ.
-	| Khoảng giá trị |	0 4-6 * * * mỗi 0 phút giờ thức 4 đến 6 của ngày.
/	| Bước nhảy giá trị |	20/15 * * * * chạy mỗi 15 bắt đầu từ phút thức 20 (phút thứ 20, 35 và 50) mỗi giờ.

Ngoài ra còn một số cách khác để trigger một workflow nhưng mà mình chưa dùng nên cũng không giám chém, các bạn có thể tham khảo thêm ở [đây](https://docs.github.com/en/actions/reference/events-that-trigger-workflows)

Nguồn tham khảo: https://docs.github.com/en/actions/reference/events-that-trigger-workflows
(Sau đây xin được dịch lại bài báo nọ, ngôi xưng là "Chế")

![](https://images.viblo.asia/d3debd3c-6020-4938-8ae5-653cc74a2b75.png)


# "Nhời" nói đầu
Ở dự án công ty Chế từng kết hợp Github Actions và CircleCI với nhau cả nhà ạ! Và đó quả là một sự giao lưu kết hợp tuyệt đỉnh số dzách luôn đó! *vỗ tay, vỗ tay*

# Duyên cớ của một chuyện tình bất hủ~~
Team Android của công ty Chế á, vốn trước nay chỉ xài mỗi Github Actions thôi (ra điều thủy chung lắm).
Đã làm với nhau những điều thiêng liêng sau nè:
> Build, test, Lint check, notify Slack, auto-merge, deploy


Rồi đến một ngày mưa gió bão tố, sấm nổ đì đùng, đội của Chế nhận được một sự dằn mặt từ PM

![](https://images.viblo.asia/c074e787-a6bb-4f2b-9838-b67855a4b9e9.jpg)


*Chúng mày làm cái quần đùi gì mà dùng Github Actions nhiều thế vậy!! Đừng có ném tiền qua cửa sổ nữa nhà này không trồng được tiền đâu nhá!! Nhà phải có nócccc!!*


Và thế là thôi, tiền hết tình tan đời tàn sịp rách chăng... Vậy tức là Github Actions là mối tình tiền trao cháo múc chứ không miễn phí như bát cháo hành của thị nỡ, xài càng nhiệt thì càng tốn tiền các bạn ơi..

![](https://images.viblo.asia/b4c3f96c-7397-481d-a202-1a45115013e4.jpg)


Cái đội sơ-vơ của công ty Chế á, về cơ bản sử dụng CircleCI, đây là gói tính phí cho mỗi côn-tên-nơ thay vì gói pay-as-you-go tiền trao cháo múc xài bao nhiêu trả bấy nhiêu kia.

Thế nên là sau khi Chế lân la dò hỏi anh Chí Phèo- techlead Android xong, thì Chế đã đi đến một kết luận

*Github Actions dành cho những người muốn có kết quả nhanh chóng còn Circle CI thì dành cho những người có thể xếp hàng chờ đợi. *
ten ten ten tèn~~~~ (ối giời ngạc nhiên chưa)

# Ôi thế tóm váy lại là những anh chị nào sẽ vào đọc bài báo này nhở?
![](https://images.viblo.asia/b096282f-87d1-4f67-9b46-b74f43ef8a8a.png)


Người hiểu cú pháp/syntax của Github Actions

Người hiểu cú pháp/syntax của CircleCI

Các nhóm người làng Vũ Đại sử dụng Github Actions 

Các nhóm hơi "pất an", đổ mồ hôi tay khi nghĩ đến phí của Github Actions

Các nhóm đang xài CircleCI tính phí cho mỗi côn-tên-nơ

(Ơ, nghe thì thấy cũng in ít phết nhở)



# FLOW ~~~~~~~~~~~~~~
![](https://images.viblo.asia/cd6b8c52-40d9-4d3c-8933-47e3940e2a56.png)

Như đã nói ở trên
Github Actions để có kết quả nhanh chóng
CircleCI dành cho những người có thể xếp hàng chờ đợi

Team Android của công ty Chế sau một hồi "trên tình bạn dưới tình yêu" với cả 2 thì đã cho ra các kết quả như sau:
* Build, Lint check là Github Actions
* Test, notify Slack, auto-merge, deploy là CircleCI 


Nói chung mỗi một người tình sẽ cho ta những cảm giác kỳ diệu khác nhau ;) 


![](https://images.viblo.asia/dd99fb8f-a8e6-4ff8-83d8-051ab0731000.jpg)


**Github Actions**
Tạo PR, build và Lint check mỗi khi push

**CircleCI**
Reviewer approve xong => chạy test => kết quả Test mà đỏ lè => notify Slack; kết quả Test mà xanh như anh bộ đội => auto-merge
Merge xong rồi thì deploy lên DelpoyGate thôi

Câu chuyện nó là như vậy

![](https://images.viblo.asia/75442075-59ea-41fc-b5c3-51de77d6ebf5.jpg)


(Đón chờ phần 2 nhé mọi người)

**Nguồn:** Github ActionsとCircleCIの組み合わせが最高という話【前編】
https://qiita.com/dosukoi_android/items/120a3a27a22d72ae7519
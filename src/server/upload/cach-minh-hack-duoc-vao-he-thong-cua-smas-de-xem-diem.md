# **Cách mà mình "hack" được vào hệ thống của SMAS**

Thật ra dùng từ hack cũng không đúng lắm, chỉ là một vài trick để lừa hệ thống mà thôi.

## **1. Cảm hứng**

Chuyện là vào tầm giữa học ky I năm 2020. Mình cũng vừa mới thi xong giữa kỳ nên quyết định làm một con bot để theo dõi điểm của mình. Nên mình có ghé vào trang http://smsedu.smas.vn/ để xem có API nào hay hay để giúp mình làm việc đó không.

Khi mình mở Devtools xem phần Networks thì hầu như chẳng có gì đặc biệt cả, để lấy được điểm thì mình phải scrape từ page ra vì server của họ lưu thông tin điểm ở một biến javascript rồi render ra table. Vì scrape cũng mất khá nhiều thời gian nên mình đã chọn từ bỏ ý tưởng này.

## **2. Tình cờ**

Kì thi giữa kỳ cũng qua, kì thì cuối kỳ cũng tới. Lúc này trên nhóm chat mình có thảo luận về một app xem điểm có tên là EduOne. Qua một hồi tìm hiểu thì mình biết được rằng EduOne là một app của SMAS. Vì khá tò mò nên mình đã tải về thử.

Khá bất ngờ khi app có giao diện khá dễ dùng, cùng với những tính năng mà SMAS trên web không hề có. Sau một hòi vọc vạch thì mình quyết định xem thử requests của nó để tìm xem có API nào xịn xò để nghịch không.

Mình sử dụng app [HttpCanary](https://play.google.com/store/apps/details?id=com.guoshi.httpcanary) để xem phần network của EduOne.

## **3. Vọc vạch**
Sau một hồi nghich thì mình thấy một API mà mình cần tìm. Nó cho mình danh hiệu, học lực và hạnh kiểm của một học sinh.

URL: ```/api/study/tt58/pupils/xxxxxxxx/academicyears/xxxxxxx/class/xxxxxxx/semesters/1```

Để ý phần URL của API thì nó cần pupilsID, academicyearsID và classID.

* pupilID là số ID của học sinh.
* academicyearsID là ID của năm học.
* classID là ID của lớp.
* semesters là học kỳ.

Lúc này mình nhận ra rằng, nếu muốn xem điểm của một học sinh A, cần phải có, classID và pupilID. Đây là lúc mình đào sâu thêm nữa.

Mình chợt nhận rằng, ở trong app EduOne có phần danh bạ, danh bạ này hiện tất cả thông tin của giáo viễn và học sinh. Mình quyết định xem requests của danh bạ này.
**BINGO**, kết quả trả về tất cả học sinh đều có đi kèm với ID của riêng minh. Vậy là vấn đề về pupilID không cần phải giải quyết nữa.

Tuy thế, khi muốn xem danh bạ của một lớp, cần phải có classID.

Sau một lúc suy nghĩ, mình quyết định lấy classID của lớp mình, sau đó trừ đi một để xem có gì xảy ra không. Thật bất ngờ khi danh bạ của một lớp khác hiện ra. 
Từ đó mình ngồi mò ra được hết tất cả classID của cả trường. Khá may khi classId không phải là số ngẫu nhiên :v

## **4. Kết quả**

Sau những thông tin có được, mình quyết định host nodejs express server ở [Glitch](https://glitch.com). 

Đây là project của mình: [Tại đây](https://glitch.com/edit/#!/eduone-api)


# **Kết thúc**

Cảm ơn mọi người đã đọc đến đây. Vì là lần đầu viết bài nên văn khá lủng củng, nếu mình có sai sót gì thì mong mọi người thông cảm và giúp đỡ ạ.
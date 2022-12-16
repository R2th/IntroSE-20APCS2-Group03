## Câu chuyện như này:
Sau 1 quá trình design lên ý tưởng, bắt tay vào tìm kiếm data thiết kế giao diện .. rồi bắt đầu code ra được version chạy ổn trên điện thoại. 
Ohh... Xong 1 game cho kids rồi, bỏ lên store xem thử các bạn nhỏ trên thế giới hưởng ứng như thế nào với game học đánh vần của mình.

Sau 1 vài bước chụp choẹt màn hình các kiểu, chuẩn bị icon ... viết mô tả ... thì bấm **Submit to Review**.

Quá đã cuối cùng thì 1 app cũng đã lên. Submit lúc này vào buổi chiều chiều, thế là đóng máy bật tv lên xem phim tận hưởng 1 buổi tối sau khi làm việc vất vả mấy ngày đêm.

Qua sáng sớm ngày hôm sau, vào mail mở ra, 1 chữ REJECTED to đùng hiện ra. WOẮC cái gì .. ??? Lần đầu làm Game App cho Kids mà bị Reject rầu ... Mấy lần kia submit Game khác lên ngon lành, 1 phát là lên luôn mà giờ thì thế này ...

### Reject tập 1: Yêu cầu thông tin từ app
Lỗi của nó là thế này các bác :

**Lỗi 1:**
```
Guideline 2.1 - Information Needed


Before we can proceed with the review of your app, we need additional information about how it complies with Guideline 1.3.

Next Steps

To help us proceed with the review of your app, please provide complete and detailed responses to the following questions.

• Does your app include third-party analytics? If so, please provide details about what data is collected for this purpose.
• Does your app include third-party advertising? If so, please provide a link to the ad network's publicly-documented practices and policies for kids apps.
• Will the data be shared with any third parties? If so, for what purposes and where will this information be stored?
• Is your app collecting any user or device data for purposes beyond third-party analytics or third-party advertising? If so, please provide a complete and clear explanation of all planned uses of this data.

Once you reply to this message in Resolution Center with the requested information, we can proceed with your app's review.



Since your App Store Connect status is Metadata Rejected, we do NOT require a new binary. To revise the metadata, visit App Store Connect to select your app and revise the desired metadata values. Once you’ve completed all changes, reply to this message in Resolution Center and we will continue the review.
```


Cập nhật tình hình ngày thứ 2: Tiếp tục bị Reject sau khi trả lời NO NO với cái Lỗi 1 ở trên.

### Reject tập 2:

**Lỗi 2 như sau:**

```
1. 3 Safety: Kids Category
Guideline 1.3 - Safety - Kids Category


We noticed that you have not provided any publicly documented practices and policies for third-party contextual advertising in your Kids Category app.

Next Steps

To resolve this issue:
• Review guideline 1.3 of the App Store Review Guidelines
• Provide us with your publicly documented practices and policies for third-party contextual advertising in your Kids Category app, if you haven't done so already
• Be sure your documented advertising practices and policies include human review of ad creatives for age appropriateness

Alternatively, you may revise your app to remove the third-party contextual advertising.



Since your App Store Connect status is Metadata Rejected, we do NOT require a new binary. To revise the metadata, visit App Store Connect to select your app and revise the desired metadata values. Once you’ve completed all changes, reply to this message in Resolution Center and we will continue the review.
```


## Cách xử lý :

### Lỗi 1: Information Needed

Trong Resolution Center: Gửi thông tin đến nó là ko sử dụng các loại 
- Third-party analytics -> No
- Third-party advertising -> No
- Will the data be shared with any third parties -> No
- Is your app collecting any user or device data for purposes beyond third-party analytics or third-party advertising? -> No

### Lỗi 2: Safety: Kids Category

fixing... tại vì app của mình có gắn AdMob nhưng hiện tại chưa bật lên, nên đánh vào là NO, ko biết sao nó kiểm tra ra được.
Đã remove ads &  submit lại.

App đã được Approve.

#### Trường hợp gắn lại AdMob:

- Cung cấp thêm link : https://support.google.com/admob/answer/6128543?hl=en cho Apple review.

#### Trường hợp add thêm IAP hoặc dẫn link ra ngoài:

- Trước khi Click vào IAP phải show lên popup Parent Gate để xác thực quyền cha mẹ, xem thêm Parent Gate [tại đây](https://viblo.asia/p/cach-thiet-ke-ung-dung-cho-tre-em-duoi-13-tuoi-kids-app-de-tuan-thu-quyen-rieng-tu-va-theo-qui-tac-cua-coppa-2013-gGJ59PpDlX2).

Done...
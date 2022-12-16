***Mình viết bài này để ghi lại hành trình học và áp dụng một lĩnh vực hoàn toàn mới với bản thân. 
Hy vọng những ai đang định hướng cùng theo đường này, đọc, để biết thêm một cách nhìn, một lối đi.*

Cũng coi như một review chủ quan với những nguồn tài liệu, khóa học đã trải qua, anh em đi sau biết mà chọn.

Ủa, mà sao hệ thống báo bài này là spam vậy?? Bài này không hề có quảng cáo, viết và trình bày tuy chưa hay, nhưng hoàn toàn là viết ra từ não với tâm, chứ không phải tùy tiện phệt vài dòng. Bạn reviewer xem lại giúp mình với.

# Về bản thân.
## Work history.
Biết gõ 10 ngón từ năm 8 tuổi.
Lớp 7 ba mẹ mua cho máy tính.
Lớp 9 biết code Pascal cơ bản.
Lớp 11 xài được office để làm slide chạy chạy ảo ảo.
Năm 1 học code C basic.

Trượt khỏi khoa IT của BKHN.

Tiếp tục học 4 năm sau của BK trong vô vọng, không định hướng.

2 năm kế là kỹ sư thực phẩm, đii làm ngoài.
3 năm tiếp tới hiện giờ là Công an.

Tháng 8-2019. Quyết định sẽ chuyển sang làm AI engineer.

## Machine learning background.
Thời điểm này, mình đã nhúng người trong Machine Learning được 14 tuần rồi. Để mọi người ước lượng tương đối về cái trình gà của mình, và ước lượng khối lượng công sức cần bỏ ra, thì sau đây là các MOOC mình đã hoàn thành.

[Neural Networks and Deep Learning](https://www.coursera.org/learn/neural-networks-deep-learning/home/welcome)
[Improving Deep Neural Networks: Hyperparameter tuning, Regularization and Optimization](https://www.coursera.org/learn/deep-neural-network/home/welcome)
[Structuring Machine Learning Projects](https://www.coursera.org/learn/machine-learning-projects/home/welcome)
[Convolutional Neural Networks](https://www.coursera.org/learn/convolutional-neural-networks/home/welcome)

Mấy khóa này, các bạn muốn học, muốn nhận certification, thì phải đóng tiền học, cỡ $50 - $60 một tháng. Có 3 típ để miễn tiền học này.

1. Viết apply cho Financial Aid. Cái này khá dễ, thường người ta sẽ đồng ý thôi. Cách viết thì cứ google. Nhược: mỗi lần viết coursera chỉ free 1 course thôi, và 15 ngày sau apply mới được trả lời yes or no.
2. Dự thính. Cứ ấn vào Enroll, rồi sẽ hiện ra một bảng thông báo, góc dưới (trái phải gì đó), có nút Dự thính - quên tiếng anh là gì rồi. Dùng cách này, bạn được nghe 100% video, được làm tất cả bài tập, chỉ là không được chữa bài thôi. Mà MOOC của Andrew Ng chữa bài tự động rất chuẩn. Không được chữa cũng là thiệt thòi.
3. Dự thính hết một lượt vài courses, rồi đăng ký, sẽ được trial 1 tháng. Trong 1 tháng đó cố trả hết bài tập, rồi unsubcribe. Thế là ăn gian certificate được vài khóa.

Còn theo mình, bạn cứ học nhiều nhiều, rồi lâu lâu trả cho họ $50, coi như trả ân nghĩa, chứ free nhiều nó mất cái chất xám của người ta đi.

Ngoài luồng, mình dùng Pop OS 19.10 - trình duyệt Empathy - bộ gõ iBus, mà gõ lâu lâu trên viblo, cảm giác bộ gõ không còn nhanh nữa. Nó cứ delay đâu khoảng vài trăm milisencond. Kỳ lạ...
# Quá trình chiến đấu
## Tuần 14 - 11 tháng 11.
Setting up lại workspace cho tử tế. Kết hợp Visual Studio Code và Anaconda (Python). 

Trước đó cũng có linh tinh giữa Anaconda, Colab, PyCharm rồi. Nhưng vừa học code mới vừa mày mò, nên environment rất lộn xộn. Giờ làm lại một lần cho đúng chuẩn.

Đây là [tut mình làm theo](https://towardsdatascience.com/setting-up-your-own-data-science-workspace-with-visual-studio-code-and-anaconda-python-22237590b4ed)

Lúc đầu, e là khó lắm, ai ngờ vừa cài xong anaconda, đã thấy visual code được tích hợp chình inh ra đó rồi. Tức là chỉ việc bật Visual Code lên rồi làm thôi, chả phải config gì. Lỡm vãi.

Buổi sáng cài xong vs code rồi, mày mò tích hợp git vào vs code cho nó chuyên nghiệp, với chủ yếu là để khoe thành quả với international friend và sau này đi xin việc có cái mà kheo. Hehe..

Cài linh tinh, đặt git clone vào trong home folder của dropbox, bị git xóa sạch file. Không cái ngu nào bằng cái dạo nào.

À, tiện nói, mình cài pop_os 19.10 nhé. Nó là bản clone của ubuntu 19.10. Xài linux thì rất khó chơi với google drive với onedrive, nên chuyển sang dropbox.

Nói về ubuntu, xserver, ngắn gọn là bộ khung để dựng GUI của nó, rất mỏng manh nhé. Cu hàng xóm chạy sang bấm linh tinh phím phím chuột chuột, đơ mẹ nó GUI luôn. Rồi cứ vài ngày GUI lại bị khựng một lần. Rất chán.
Mình cũng muốn chuyển sang giao diện nào đó khác, như wayland chẳng hạn. Tháng trước dùng wayland rất phê, mà thế đếch nào update từ 18.04 lên 19.10, mất wayland. Sang Pop_os ko thấy wayland đâu.
Pop_os còn một nhược điểm nữa, là chẳng hiểu sao, cứ chạy gì liên quan tới Brave - browser ấy - là bị khựng vài giây. Vụ này xảy ra từ sau khi update lên Brave 1.0. Mình đành mặc kệ, chứ chẳng muốn solve nhiều.

Dành cả ngày thứ 4, cũng đã code xong trò Pong, dựa theo course [Learn Python by Building Five Games](https://www.youtube.com/watch?v=XGf2GcyHPhc&t=1525s) 
Mình code 3 lần. Lần 1 là vừa xem vừa code giấy. Lần 2 vừa xem giấy vừa xem video, code vào vs. Lần 3 ko nhìn tự code lại.
Lúc code, hơi xoắn não chút là phần lập trình cho quả bóng đập vào bàn hứng rồi dội lại. Tư duy thông thường, mình nghĩ sẽ rất khó, vì làm sao mà lập trình được một hiện tượng vật lý đây? Chả nhẽ dùng physical engine à? Gớm chửa, ngày xưa máy 1 nút cầm tay làm gì có physical mà code, nên chắc là phải có cách gì chứ. Ai ngờ, course đó giải quyết bài này, nói thế nào nhỉ, theo tư duy của máy tính. Máy tính nó ko coi cú bóng chạm bàn là nảy ra. Nó chỉ xem là, các pixel của quả bóng chạm vào các pixel của paddle, sau đó đổi hướng trở lại.

Hay thật.. 3 tháng trước, mình có đọc bài [Con đường học Khoa học dữ liệu của một sinh viên Kinh tế](https://machinelearningcoban.com/2018/03/22/phuonghoagiang/), bạn có nói rằng "Sau khi đọc cuốn sách trên thì mình hiểu ra vấn đề vì sao mình học Python đến hai tháng mà vẫn rất thụ động, chỉ có thể viết những gì code mẫu mà gặp vấn đề mới thì chịu. Đó là vì mình không suy nghĩ theo cách máy tính có thể suy nghĩ. Vì không think the language nên mình cũng không thể speak the language."
Lúc đó mình chỉ hiểu hiểu lời nói, chứ không hiểu thực tế là sao. Vậy là code trò pong này, vấn đề với vụ nảy, có ngay ví dụ thực tế.

Thứ 5 này mình dự code tiếp trò thứ 2 là snake, và dừng lại đó chứ ko code hết cả 5 trò trong course. Vì rõ là, mục tiêu của mình là làm được ứng dụng áp Machine Learning vào thực tế team mình. Việc đó, phải học trực tiếp cách build mô hình, tích hợp mô hình vào app, chứ nếu mình cứ loanh quanh học code game thế này, chỉ là beat around the bush thôi.

Cập nhật tiếp là bỏ qua trò snake, vì bạn Tech with Tim này trình bày mình hiểu không thấu. Có lẽ do bạn ý siêu quá - code rất siêu nhé, lướt qua channel của Tim thấy code vừa giỏi vừa trâu - siêu quá nên không hiểu được nỗi khổ của những người kém code, nên trình bày, giảng dạy, mình theo không đặng. Đành bỏ qua snake mà sang game 3 - Connect4.

Anh intructor này ổn hơn. Code anh có một cái không ổn, là ít comment làm rõ mục đích, cấu trúc của code, còn thì cách viết cuốn chiếu, dạy nhẹ nhàng, rất ok.
Học qua code mẫu này, mình thường in code của các bạn này ra giấy, để đọc, hightlight, gạch chân tùm lum, mần mò, vần vò, để hiểu code hơn. Chứ nếu cứ để trên file, cuộn lên cuộn xuống, thì nhìn code đã thấy khó hiểu rồi, chỉ nản rồi bỏ thôi.

Khi code game Connect4, gặp khó khăn sau:
- Dùng anaconda -- visual code -- env:base. Môi trường này không có pygame. Mình cài pygame bằng sudo pip xong rồi. Nhưng nhận ra là, có cài vào linux (ở đây là Ubuntu), thì anaconda cũng sẽ không nhận. Phải dùng terminal, activate conda, activate env base lên, rồi cài bằng conda install pygame ở env này. Nhưng mình cài cứ bị báo lỗi conflict. Báo lúc 6h tối, thì chả còn năng lượng mà sửa nữa, nên kệ mày, tao đi ngồi đọc sách.

Ngày kế tiếp.
Cắm chốt trong nhà vệ sinh thì quora recommend cái link này cho đọc [Can I learn Python in 1 Month](https://www.quora.com/Can-I-learn-Python-in-a-month). Mình thì chả dám hy vọng học xong trong 1 tháng đâu. Có 2 lý do.
1. Anh ấy đề xuất 1 ngày học 5 tiếng chỉ riêng Python. Mình có 4 tiếng, và phải san ra cho Machine Learning nữa.
2. Mình không đặt mục tiêu trở thành Python developer.

Python, mình muốn dùng nó như một công cụ để áp dụng machine learning, để dùng như Machine Learning Engineer.
Mình sẽ nói rõ hơn về đường hướng bản thân trong lần sau.

Trở lại với quora vừa rồi. Trả lời của anh #1 đó siêu có ích. Thứ nhất là, anh vạch rõ lộ trình để trở thành Junior Python, nếu không khả thi trong 1 tháng, thì cũng rất ok để thực hành trong khoảng nửa năm. Hai là, mình lọc đc một thông tin rất có giá trong đó, là [Datacamp](datacamp.com).

Kỳ sau mình nói tiếp về Datacamp.
*Hôm nay lại rảnh, lại lảm nhảm*

Chuyện là hôm bữa mình (lại) đi phỏng vấn. Lần này không phải để tìm việc, đơn giản là mình muốn thử khả năng của bản thân xem dạo này tiến lên hay tiến xuống :D. Với có một cái luật-không-thành-văn là: Always seeking for new job even if you are not looking for one. 

Bữa đó nói chuyện với team lead, bọn mình nói chuyện khác hợp gu ( Interview có 1 tiếng extends thành 2.5 =)) ), trao đổi rất nhiều thứ từ insight out của ngành, challenging, future, new trending (kiểu như ổng nhắc tới GitOps, mình kiểu wow ). Mình xin phép được dùng note và pen để ghi chép lại. Vì mình thấy tâm đắc. Ông ấy đồng ý. Hôm nay mình (lại) kể qua cho các bạn những gì mình được hỏi.

Bước vào buổi interview, vấn đề đầu tiên mình được hỏi là: **Nếu tao cho mày một số tiền vô hạn (unlimitted money budget), mày sẽ xây dựng infrastructure như thế nào? Có thể nói tới loại cloud mày muốn, GCP, Azure, Digital Ocean, AWS, etc.**
Mình lúc đó nghĩ trong đầu: Tao mà có unlimitted money thì tao còn đi làm làm cái vẹo chi nữa =)).

Sau đó mình ngồi nói về infastructure plan của mình, có ít nhất 4 environment nè, 4 con VPC, management plane phải seperate layer, database cũng phải ở seperate layer,dùng Kurbenetes để quản lí, etc.

Nhắc tới Kubernetes, team lead hỏi **mày muốn thiết kế kubernetes cluster thế nào? Tự mày xây dựng cluster hay dùng service có sẵn?**. 

Mình lúc đó nói: Dùng service có sẵn. *(Nguyên văn mình nói là: I don't see any points of DIY)*.

Ông team lead và ông manager lúc đó đồng thời cười lớn, đồng ý với mình, giải thích nếu **không có dedicate team thì chẳng việc gì phải tự xây dựng cluster cả**. \m/

Sau đó là những câu hỏi về **instrumentation strategy**, ví dụ như:

- Mày sẽ logging ra sao? 
- Làm sao để troubleshooting, mày check application behavior kiểu gì? 
- Ồ, metric hả? Làm sao mày biết **key performance metric là cái gì?**
- Làm sao mày implement telementry?
- Intergrate logging với monitoring ra sao? 

Tiếp đó là những câu hỏi như: Alert strategy, đã có **failure prediction strategy** chưa? Mày tính Authentication và authorization kiểu gì?  Tính quản lí sensitive information ra sao? Security và compliance plan?

Khi nhắc tới branching stratery, mình có nhắc tới trunk-base management, đồng thời cũng thú thật với ông ấy là mình chưa từng xây dựng repo from the ground up (green field). Nên ở phần này mình không có kinh nghiệm thực tế, mình chỉ đọc được về nó, và hi vọng có cơ hội sử dụng trong tương lai.

Nhắc tới CI-CD lại là một bầu trời rộng lớn. Xây dựng pipeline ra sao? Integrate như thế nào? **Clean up plan** ra làm sao?

Kế đó là ông manager hỏi mình mấy câu về **softskill**:
- Mày làm gì khi đồng nghiệp phủ định yêu cầu của mày?
- Mày thường làm việc theo strategy nào?
- Nếu mày phạm sai lầm, mày sẽ làm gì? 
- Điều gì thuyết phục được tao là mày sẽ không rời khỏi công ty? (*Câu này mình nói là mình không có khái niệm công ty là gia đình. VIệc đi hay ở phụ thuộc vào hoàn cảnh. Tao chịu. không thuyết phục mày được*)

Sau đó mọi người hỏi mình có câu hỏi gì không. Mình liền hỏi manager về văn hóa công ty, công ty có dresscode không? Có vấn đề gì với người xăm hình không? (*Mình có khá nhiều hình xăm, Có một vài vùng không thể che bằng quần áo)*. Về phần team lead, mình hỏi khá nhiều thứ liên quan đến trend và công nghệ. Câu hỏi mình tâm đắc nhất là:

- Mày thấy sao về hướng đi tương lai của DevOps, như mày thấy thì giờ cái gì cũng tự automate được, pipeline tự generate, thậm chí  một số service cho phép mày **fully deploy cả một quá trình CI-CD** (Beanstalk).

Team lead trả lời hệ thống dù phát triểu thì giờ vẫn cần có người hiểu và điều hành nó, đến một thời điểm nào đó, có thể chúng ta sẽ không cần đến nữa. Lúc đó chúng ta sẽ kiếm việc khác. Đừng lo, có gì tao sẽ mở công ty mời mày về làm. =)).
Câu trả lời làm mình nhớ tới một trích đọan trong quyển sách The book of humans - Adam Rutherford:

> - Anything that is in the world when you are born is normal and ordinary and it just a natural part of the way the world works.
> - Anything that is invented between you are 15 and 35 is new and exciting and revolutionary and you can probably get a career in it.
> - Anything invented after you are 35 is against the natural order of things

Ừ thì có lẽ trong tương lai sẽ không cần tới Devops, nhưng chết thế quái nào được. Nhỉ?

Somewhere, xx-xx-2021

Rice
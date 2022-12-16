Mình nhớ hồi năm 2 đại học, thầy giáo môn calculus, trong một giây phút ngẫu hứng, đã đưa ra cái definition này. Lúc đấy mình cũng không nghĩ gì nhiều. Hôm nay trong lúc design cái CI/CD pipeline, tự nhiên nhớ lại. Chợt nghĩ: Nếu mình sinh ra sớm hơn chút xíu, mình sẽ xúi (*dại*) người sáng tạo ra Docker, để người đó đặt tên Docker là **Heart**. Cứ nghĩ mà xem, pushing (*her*) heart, pull (*her*) heart. Nghe động lực làm việc hơn nhiều. 

![Một bức ảnh không liên quan của mình](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/k0w532vsrs_image.png)


Lại kể chuyện ở một công ty khác mình từng làm việc: công ty B.

Hồi mình với vô, mọi người hay hỏi mình những câu như là:
Mày nghĩ có nên dùng **Jira/Confluence/Docker Swarm/Portainer/Lazy Docker/**... không?
Mày nghĩ nên dùng **IDE** nào?
**Scrum hay Kanban? Trunk base deployment? Brach featuring deployment?**
Làm sao để track **OKRs**?

Thường thì mình trả lời rất (nhạt và) thành thật. Tao thấy team nào đang dùng cái gì thì dùng cái đó. **Whatever your team already uses**. Nghe thế mọi người thường không hài lòng, nói mình không có chính kiến. Mình cười.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/z8ymjv8rlj_image.png)

Nói về công ty B, cái gì cũng có tool. Cùng một project. Dùng riêng **github** cho VC, **gitlab** cho **CI/CD**, tạo hẳn tool riêng (Spring boot) để **tag release**, **Jenskin** để **deploy release**. Tool riêng nữa để tạo **initial DB creation**. Tool riêng để ... copy file. 

Hôm mới vào, đánh bạo hỏi ông manager: 
- Mày ơi, cái tool abc để làm gì đó?
- À, để tagging đó.
- Ý mày là ... git tag hả?
- Đúng! 
- Ồ...

Với một đống tool như thế, việc quản lí tất nhiên rất khó. Team này cọ team kia. Mọi người đều luôn trong trạng thái cáu. Nói không đâu xa. Công ty dùng docker swarm, rồi kurbenetes, helm, thậm chí dùng luôn** ansiblle docker_container** để deploy. Mỗi project một đống loại. Cái giây phút mình thấy ba chấm nhất là công ty quyết định adopt thêm **Portainer**. Với chức năng là để quản lý docker image, quản lí luôn cả ... **kubernetes cluster** =)).

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/7kw2zx1es1_image.png)

Cái việc phụ thuộc vào tools như thế lại làm mình nhớ đến lần đứa bạn và mình vô thư viện và gặp một nhà văn nổi tiếng bên này. Mình thì thấy thường thường, vì có biết tiếng nước bạn đâu mà đọc sách =)). Còn bạn mình thì vui lắm. Hỏi rất nhiều thứ từ việc **"dùng bút loại gì"** cho tới **"có thích uống gin tonic không"**. Mình thì đứng đó, tự hỏi: Liên quan quái gì nhỉ...

Mình luôn quan có quan điểm là việc quá **phụ thuộc** vào thói quen của một ai đó. Đồng nghĩa với việc mình mình đã bị **cướp đi quyền sáng tạo**. Việc các tool mới mọc lên mỗi ngày, công ty nào cũng muốn adopt. Chuyện đó dễ hiểu.  **Nhưng có nên không?** Một stack được mọi người dùng nhiều. Chưa chắc nó đã phù hợp với team/công ty. Mình nghĩ nên tập trung vào **giá trị cốt lõi** thay vì tool. Ví dụ như:

- Nên dùng Puppet, Chef hay Ansible để provisoning?. → **Bạn tính provision như thế nào**?
- Dùng gì cho orchestration? → **Bạn biết dùng gì?**
- Dùng gì để product visions? → **Bạn có visions chưa?**
...

Vậy đó, chia sẻ vậy thôi. Mình đi tập đánh đàn tiếp đây. Nghĩ cũng bực. Mình tập cũng lâu rồi mà đánh vẫn chẳng hay. Chắc do cái đàn, hôm nào nhận lương đi mua đàn mới ...

Somewhere, xx-xx-20xx

Rice
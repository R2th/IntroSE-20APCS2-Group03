Chào mọi người, giấy phép -`License` trong phần mềm vẫn luôn là điều quan trọng, thế nhưng khi hỏi về nó, đa số các `developer` thường xuyên không trả lời được những câu hỏi liên quan, thậm chí việc nó có phù hợp với dự án hiện tại hay không ? có đảm bảo được quyền và lợi ích của khách hàng, công ty trước pháp luật khi sử dụng những phần mềm có giấy phép không ?

Trong bài viết này, mình sẽ đi qua những điểm cơ bản cần biết về `OSS License`, hi vọng sẽ tạo được `mindset` cẩn thận khi lựa chọn, sử dụng những mã nguồn bên thứ ba vào dự án.

Về chi tiết cách hoạt động của các loại `OSS license` thông dụng các bạn có thể tham khảo thêm từ 2 bài viết dưới đây :

- [Opensource license phổ biến và khác biệt giữa chúng](https://viblo.asia/p/opensource-license-pho-bien-va-khac-biet-giua-chung-Az45brmQ5xY)
- [Tìm hiểu cách hoạt động của các loại license mã nguồn mở (Open-source license)](https://viblo.asia/p/tim-hieu-cach-hoat-dong-cua-cac-loai-license-ma-nguon-mo-open-source-license-GrLZDknOKk0)

## Khái niệm

*From wikipedia:*

> Giấy phép phần mềm (hay giấy phép phần mềm trong cộng đồng sử dụng) là một phương tiện pháp lý chi phối việc sử dụng và tái phân phối phần mềm được bảo vệ bản quyền. Một giấy phép phần mềm điển hình trao người dùng cuối quyền sử dụng một hay nhiều bản sao chép của phần mềm theo những cách mà nếu không tuân thủ theo nó sẽ dẫn đến cấu thành việc xâm phạm tính độc quyền của nhà phát hành phần mềm, theo luật bản quyền. Về hiệu lực, giấy phép phần mềm hoạt động như một lời cam kết từ nhà phát hành phần mềm rằng sẽ không kiện người dùng cuối nếu họ tiến hành các hoạt động thông thường nằm trong những quyền độc quyền được xem như thuộc về nhà phát hành.

Có thể hiểu nôm na, `License` là sự cho phép chính thức do người chủ sở hữu *source code* (Người cấp phép - **`Licensor`**) cấp cho người sử dụng (Người được cấp phép - **`Licensee`**) và điều chỉnh cách mà người được cấp phép sử dụng *source code* của mình.

Và nó có thể xem như một hợp đồng, khi sử dụng *source code* của người cấp phép, bạn - người được cấp phép phải đồng ý những điều khoản được ghi trên giấy phép.

Ngày nay, việc chấp nhận được hiểu ngầm, tức là bạn dùng *source code* của bên thứ ba bất kì vào dự án của bạn nghĩa là bạn đã đồng ý với giấy phép của *source code* đó.

## Mục đích của License

*License* sẽ có 2 mục đích :

1. Về cơ bản, *License* là một cách để người cấp phép và người được cấp phép thỏa thuận về những quyền và nghĩa vụ của hai bên. Các quyền và nghĩa vụ liên quan đến *License* thì có thể là bất cứ điều gì trong phạm vi những gì được pháp luật cho phép.

Ví dụ : 
- Bên cấp phép có thể yêu cầu bên được cấp phép trích dẫn tên của mình khi sử dụng *source code*.
- Hoặc chỉ được sử dụng mà không được phép chỉnh sửa *source code* có sẵn.
- Hoặc yêu cầu sản phẩm phái sinh (`Derivative Work`) phải được phát hành theo đúng các điều khoảng của *source code* gốc.
- ...

2. Mặt khác,  *License* cũng là một cách để bảo vệ người được cấp phép, bằng cách nêu rõ cách ai đó có thể sử dụng *source code* này, người được cấp phép sẽ tự tin sử dụng và an tâm trước pháp luật về bản quyền hay việc bồi thường nếu họ sử dụng và làm đúng theo những gì ghi trên *license*. 

## Những câu hỏi liên quan

### Tôi có thể sử dụng source code không có license trên Github/Gitlab/... không ?

Sẽ có vài ý như sau :

- Trong trường hợp *source code* có *License* rõ ràng, bản quyền mặc định về thẩm quyền của tác giả sẽ được áp dụng theo đúng những gì ghi trên *license*.
- Ngược lại, bạn sẽ không được phép nghĩ rằng việc "không có *license*" như là sự cấp phép ngầm để bạn có thể làm bất cứ điều gì với *source code* đó. Điều này hoàn toàn ngược lại "không có *license*" tương đương với việc tác giả không từ bỏ, cho phép bất cứ quyền nào (của họ) cho bạn theo quy định của pháp luật (luật sở hữu).

Một ví dụ đơn giản, *Laptop* của mình để trên bàn, dù là để đó nhưng không ai được phép lấy đi hoặc sử dụng khi chưa được phép.

=> Điều cần làm của bạn là liên hệ với người viết *source code* để được cấp phép hoặc được chủ *source code* cung cấp đầy đủ thông tin *license* trước khi sử dụng.

### Tôi có thể tự tạo một license cho source code của mình không ?

Câu trả lời là có, **TUY NHIÊN** nó không được khuyến khích, vì sao ?

Vì *license* như là một hợp đồng, và bản thân nó (ở hầu hết các khu vực pháp lý) không thể được ưu tiên hơn luật pháp theo lãnh thổ. Do đó, sẽ khó thực thi những quyền cấp phép trong một thế giới toàn cầu hóa. Sẽ dễ dàng hơn nếu bạn sử dụng một `standard license` (giấy phép tiêu chuẩn đã được công bố), và bảo vệ những quyền có trong *license* đó trước pháp luật, điều mà với một *license* tùy chỉnh của bạn sẽ rất khó khăn.

Ngoài ra, *license* tùy chỉnh của bạn có thể sẽ không tương thích với những *license* khác, điều này sẽ làm hạn chế khả năng sử dụng *source code* của bạn kèm với các *source code* khác.

### Tôi có thể dùng nhiều license cho source code của mình không ?

Có thể, và sự thật là "Giấy phép kép - `Dual licensing` - `Multi-licensing`" được sử dụng khá nhiều.

Điều này đặc biệt có ý nghĩa khi bạn muốn xây dựng công việc kinh doanh từ *source code* hay ứng dụng từ *source code* của mình. Trong trường hợp này, bạn có thể phát hành theo một số *OSS license* và *license* thương mại.

Ví dụ điển hình là *Oracle* cung cấp giấy phép kép cho **MySQL DB Management System** cho người dùng.
1. *Oracle* cung cấp *MySQL* theo dạng license độc quyền - *proprietary license* (*OEM style*) cho những người dùng muốn tạo và phân phối thương mại các *sản phầm phái sinh* độc quyền kết hợp *MySQL* mà không cần *public* mã nguồn và không chịu các hạn chế và nghĩa vụ khác theo [GPL license](https://en.wikipedia.org/wiki/GNU_General_Public_License).
2. *Oracle* cung cấp *MySQL* cho những người dùng muốn sử dụng phần mềm hoặc muốn kết hợp *MySQL* vào sản phẩm của họ và phân phối sản phẩm đó theo *GPL license.*

Lý do khác nữa là việc sử dụng nhiều *license* có thể tăng tính tương thích và đáp ứng nhiều yêu cầu khác nhau của người sử dụng. Tuy nhiên, trong khoảng hơn 2500 *OSS License* hiện có, không phải các *license* [đều tương thích với nhau](https://en.wikipedia.org/wiki/License_compatibility ), do đó bạn cần phải cẩn thận khi dùng nhiều *license* cùng lúc.

### Tôi có thể đổi license source code mình sau này không ?

Có thể, nếu bạn là chủ sở hữu của *source code*.

Tuy nhiên, sẽ có một vài lưu ý: 
- Nếu như bạn là người đóng góp duy nhất (`collaborator`) cho *source code*, bạn dễ dàng thay đổi.
- Tuy nhiên, nếu như *source code* có nhiều hoặc rất người đóng góp, rõ ràng bạn phải được sự đồng ý từ tất cả các *collaborator* khác. Và trong thực tế thì điều này là trở ngại lớn nhất.

### Tôi nên dùng license nào ?

Câu trả lời là nó phụ thuộc vào bạn.

Điều quan trọng nhất là bạn phải luôn có *mindset* về các vấn đề pháp lý, đạo đức nghề nghiệp. Phải luôn "đọc và hiểu văn bản có thẩm quyền của *license*" và với hơn 2500 *OSS license* hiện tại, thậm chí bạn cần một luật sư nếu điều đó thật sự cần thiết.

## Bonus

### Lợi ích của Opensource software

Có rất nhiều những lợi ích to lớn mà *OSS* mang lại :
- Miễn phí 
- Mang lại nhiều sự lựa chọn.
- Có ích cả khi *research* và *develop* phần mềm.
- *Code* thường xuyên được *update* mới.
- Chất lượng tốt khi có nhiều *developer* và *tester* tham gia (khi sử dụng).
- Sử dụng rộng rãi trên toàn thê giới.
- ...


### Bạn dùng license nào cho library của mình viết.

Phần *bonus* này có ý nghĩa khi bạn nắm sơ về 3 loại *license* thông dụng trong *software*: `GPL, LGPL, Apache-2`

Nếu bạn có một *library*, bạn chưa biết nên *public / open* nó theo *license* nào thì **[FSF-Free Software Foundation](https://www.fsf.org/)** có cho bạn một vài gợi ý dựa trên "***cách lập luận theo đạo đức và triết học trong lập trình***" của họ :

1. Nếu *library* của bạn cạnh tranh với một *library* không miễn phí (có tính phí) khác => Trong trường hợp này, việc áp dụng rộng rãi thư viện của bạn sẽ giúp cho tiền đề của *Free Software*. *FSF* sẽ đề xuất bạn nên dùng [*Apache-2.0 license*](http://www.apache.org/licenses/LICENSE-2.0).
2. Nếu *library* của bạn triển khai một chức năng đã được các *library* khác triển khai => Trong trường hợp này, bạn có thể giữ lại những quyền lợi của mình (giữ lại một phần `copyleft`) bằng giấy phép *[LGPL](https://en.wikipedia.org/wiki/GNU_Lesser_General_Public_License)*.
3. Nếu *library* của bạn là hoàn toàn mới thì việc giữ lại nhiều nhất những quyền lợi của mình là cần thiết => *FSF* đề xuất bạn dùng giấy phép *GPL*.

**Reference**:

https://choosealicense.com/

https://opensource.org/licenses

https://tldrlegal.com/

https://itsfoss.com/open-source-licenses-explained/ 

https://youtu.be/9kGrKBOytYM
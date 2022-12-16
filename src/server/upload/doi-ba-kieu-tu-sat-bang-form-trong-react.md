> Với các tiến độ thay đổi requirement một cách chóng mặt hiện nay, thì việc đưa ra các design architecture phù hợp với dự án là việc phải cân nhắc vô cùng kĩ lưỡng.
> Thiết kế form là một việc không thể thiếu ở phía frontend, và một vài technical decision sau sẽ giúp bạn có được những "rải nghiệm" khó quên.
> 

## Early abstraction (design sớm thường là design fail)

Việc mà ta có thể làm nhanh nhất để refactor cái form đó là: gom các phần UI giống nhau thành component để reuse và cảm thấy tự hào về bản thân.

Dí dụ:
```
Form đăng ký: gồm thông tin các nhân mà người mua hàng cần điền vào và thông tin về đơn hàng của họ
\\\\\\\\\\\\\\\\\\\\\\\\\
\\\\ CUSTOMER CONTACT \\\
\\\\\\\\\\\\\\\\\\\\\\\\\

\\\\\\\\\\\\\\\\\\\\\\\\\
\\\\\ RECIPE DETAIL \\\\\
\\\\\\\\\\\\\\\\\\\\\\\\\

\\\\\\\\\\\\\\\\\\\\\\\\\
\\\\\ BLA BLA \\\\\\\\\\\
\\\\\\\\\\\\\\\\\\\\\\\\\

From cập nhật: gồm thông tin cá nhân của người mua hàng lấy ra từ api và thông tin về đơn hàng của họ
\\\\\\\\\\\\\\\\\\\\\\\\\
\\\\ CUSTOMERCONTACT \\\\
\\\\\\\\\\\\\\\\\\\\\\\\\

\\\\\\\\\\\\\\\\\\\\\\\\\
\\\\\ RECIPE DETAIL \\\\\
\\\\\\\\\\\\\\\\\\\\\\\\\

Với cặp mắt tinh tường, ta có thể
- nhanh chóng cắt ra thành 2 component: <CustomerContact /> và <RecipeDetail />
- rồi vứt nó một xó
- rồi import vào 2 form như sau:

const RegisterForm = () => (
  <Container>
    <CustomerContact ...{truyền các thể loại vào đêy} />
    <RecipeDetail ...{truyền ti tỉ thứ vào đêy} />
    // ... các component linh tinh khác
  </Container>
);

const UpdateForm = () => (
  <Container>
    <CustomerContact ...{truyền các thể loại vào đêy} />
    <RecipeDetail ...{truyền ti tỉ thứ vào đêy} />
  </Container>
);

Tại thời điểm này, bạn bắt đầu cảm thấy feel good!
```

Cho đến khi spec mới đến, với muôn hình vạn trạng, chẳng hạn như là:

- Input cho tên khách hàng ở RegisterForm là nhập tay, nhưng ở UpdateForm thì là điền từ API => đơn giản, thêm điều kiện check xem dữ liệu từ props có ko, ko có thì hiển thị rỗng.

```
 <CustomerContact customer={dataFromAPI} />
 
 ... inside CustomerContact
 <input name="customerName" value={dataFromAPI.custName || ''}}
```

- Input sản phẩm mua hàng ở form RegisterForm thì cho phép nhập, còn ở UpdateForm thì lại không => ở thì vẫn đơn giản, truyền thêm loại form vào props của CustomerContact, để biết nó được render từ đâu :v 

```
<CustomerContact type="register" />

... inside CustomerContact
<input name="shopItem" disabled={ nã if else check type vào đây } />
```

- RegisterForm gọi các api abc, xyz, còn UpdateForm thì không => ez!, nã if else condition
- RegisterForm sẽ redirect tới một trang xác nhận, còn UpdateForm thì lại không => ez! nã if else condition 
- RegisterForm hiển thị modal nhập mã xác thực, còn UpdateForm thì chỉ hiển thị form hỏi Yes/No, are u sure, etc. => ez! nã if else condition
- ....

Dần dần, ta nhận ra, càng ngày các component mà ta viết ra "để reuse" càng phình ra với những điều kiện ở đẩu ở đâu. Và việc thêm tính năng cho form sẽ trở thành việc đắm mình trong các câu điều kiện.

Vậy vấn đề ở đây là chi? Là viết component để reuse cái UI, mà không thèm đếm xỉa đến việc liệu state của nó có thực sự liên quan đến nhau không.

## Monolithic state (state vón cục)

Ngoài cái hành vi của ác quỷ là nhét state của form vào trong Redux, thì ta còn có thể múa một cách ảo diệu tương tự, như là: để các state của form global cho nó tập trung, rồi dùng Context API để truy cập cho đỡ phải đục props.

```
// day 1
name: ...,
email: ...,

// day 2
name: ...,
email: ...,
agreeCondition: ...,
address: ...,
registerDate: ...,

// day 3
name: ...,
email: ...,
agreeCondition: ...,
address: ...,
registerDate: ...,
...cơ số dòng code
flag_gi_do: ...,
flag_gi_do2: ...,
cai_abc_xyz: ...,
cai_ma_me_gi_do: ...,
cai_dau_xanh_rau_ma: ...,
...cơ số dòng code khác
```

Càng ngày, việc sửa form càng bối rối, và ta dần cảm thấy việc truyền props miên man từ cha xuống con/cháu/chắt/chút/chít gì đó, nó thảnh thơi hơn nhiều.

## Versalite input (input đa năng)

Tôi ước là mình có thể copy và paste toẹt cái source code lên đây... cơ mà dù sao thì nói mường tượng, 1 cái input đa năng là:

- nó có thể tự gọi api lấy data cho mình => xời, và ta nối redux rồi dispatch action các kiểu như 1 container thực thụ.
- nó có thể tự format dữ liệu theo 69 cách mà component dùng nó chỉ cần truyền vào các flag hoặc một loại dữ liệu cụ thể => yeah, kèm theo độ 69 cái condition không hoặc nếu ít condition hơn thì bạn sẽ thấy các kiểu hook mà useEffect kì dị.
- nó được kết nối trực tiếp vào global state, và đổi hiển thị theo state thay đổi luôn, mọi thứ ta làm là cập nhật state và mọi input liên quan sẽ đổi theo => phạc yeah và cũng input đó, cũng state đó, ở một nơi khác, hiển thị khác, ta phải cập nhật state và khi rời chỗ đó, ta phải trả state lại như cũ.
- ...

Nói chung, cái input đa năng thì nó luôn sặc sụa state bên trong, ban đầu thì sẽ tiện vãi cho đến khi nó thành cái cục của nợ mà ta phải maintain.

## Kết

Trong form, thì state là nguồn gốc của mọi sự thống khổ, và những cách trên là một vài con đường cơ bản để trải nghiệm nó. Né nó cũng không khó, khó là do mình có muốn né không thôi! Dù sao thì... đây tôi cũng note lại vài điều đúc kết cần lưu ý:
1. Việc duplicate code là chấp nhận được, nên dùng nó vì code duplicate thì rất dễ thêm/bớt/sửa/xóa.
2. Wrong abstraction là cứ thấy nó giống nhau là gom vào reuse, lưu ý là ta chỉ coi nó "giống nhau" khi mà state/luồng hoạt động của nó giống nhau mà thôi.
3. Lưu state của form ở bất kì một dạng global nào đó không bao giờ ngon nghẻ bằng một cây phả hệ sạch đẹp được.
4. Các component mà có reuse (như các input kiểu TextInput, PhoneInput) thì ko được để nó dính dáng gì đến state của form cả, nó chỉ nên quan tâm đến state local của nó mà thôi.
React là một công cụ phổ biến để phát triển trên web và là một thư viện tuyệt vời. Thật không may, không có gì là hoàn hảo trong cuộc sống, và React cũng không phải là ngoại lệ.

React hỗ trợ cho người dùng rất nhiều bằng các phương thức của riêng nó nhưng một số trong đó có khả năng trở thành vấn đề nghiêm trọng đối với các ứng dụng của bạn nếu bạn không quan tâm đến chúng đúng mực.

Dưới đây là 10 điều bạn KHÔNG nên làm khi xây dựng các ứng dụng React:

# 1. Dành quá nhiều thời gian chỉ để tập trung làm project
Nếu bạn dành quá nhiều thời gian chỉ để code và code mọi thứ trong dự án của bạn mà không dành thời gian để đọc về những gì đang xảy ra trong cộng đồng, bạn có thể vướng vào những cấu trúc code xấu đã được đề cập trong các bài viết trong cộng đồng. Và bạn có thể có nguy cơ tiếp tục viết đi viết lại cấu trúc code đó quá nhiều lần trước khi bạn có cơ hội tìm hiểu về nó trên một bài đăng đã xuất hiện từ lâu.

Khi điều đó xảy ra, bạn phải quay lại và chỉnh sửa bất cứ vị trí nào mà đoạn code đó tồn tại vì bạn phát hiện ra quá muộn trong khi mọi người khác đi trước bạn và tiếp tục với những tin tức mới hơn.
Khi React công bố Hook, mình đã rất phấn khích và bắt tay xây dựng một loạt các dự án nhỏ để chơi với những đồ chơi mới mà tất cả mọi người đều háo hức. Sau khi đọc một vài nguồn tin rằng Hook sẽ ổn định, mình bắt đầu thực hiện nó một cách nghiêm túc hơn cho các dự án của bản thân. Mình đã sử dụng useState và useEffect ở khắp mọi nơi.
Và sau đó mình tình cờ thấy ai đó chia sẻ [tweet twitter này](https://twitter.com/dan_abramov/status/1083330668522864640?lang=en), điều này khiến mình tiến hành một số nghiên cứu thêm về useReducer.

Với 30 phút nghiên cứu thêm đó là đủ để mình quay lại và refactor một số lượng kha khá code để nó trở nên tốt hơn.

# 2. Sử dụng .bind
Mình nghĩ rằng phần lớn các lập trình viên React đều nhận thức được rằng chúng ta nên .bind các class methods của chúng ta nếu chúng ta muốn tham chiếu this để truy cập vào instance bên trong các methods đó.

Điều đó thật tuyệt và mình hoàn toàn đồng ý với việc khai báo chúng bằng các arrow functions.

Nhưng phần này mình sẽ nói về điều đó. Đó là về các inline functions - hay các hàm được định nghĩa trong render của component React và được truyền lại dưới dạng prop cho component con.

Khi các inline functions được định nghĩa trong render, React bắt đầu chỉ định một function mới mỗi khi component re-renders. Điều này gây ra vấn đề lớn về hiệu suất do re-renders bị lãng phí.

Hãy xem ví dụ sau:
```
const ShowMeTheMoney = () => {
  const [money, setMoney] = useState(0)

  const showThemTheMoney = (money) => {
    setMoney(money)
  }

  const hideTheMoney = () => {
    setMoney(null)
  }

  const sayWhereTheMoneyIs = (msg) => {
    console.log(msg)
  }

  return (
    <div>
      <h4>Where is the money?</h4>
      <hr />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SomeCustomButton
          type="button"
          onClick={() => sayWhereTheMoneyIs("I don't know")}
        >
          I'll tell you
        </SomeCustomButton>{' '}
        <SomeCustomButton type="button" onClick={() => showThemTheMoney(0.05)}>
          I'll show you
        </SomeCustomButton>
      </div>
    </div>
  )
}
```

Chúng ta biết rằng `onClick={() => sayWhereTheMoneyIs("I don't know")}` và `onClick={() => showThemTheMoney(0.05)}` là những inline functions.

Mình đã từng xem qua một số bài hướng dẫn khuyến khích nên làm như sau:
```
return (
  <div>
    <h4>Where is the money?</h4>
    <hr />
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <SomeCustomButton
        type="button"
        onClick={sayWhereTheMoneyIs.bind(null, "I don't know")}
      >
        I'll tell you
      </SomeCustomButton>{' '}
      <SomeCustomButton
        type="button"
        onClick={showThemTheMoney.bind(null, 0.05)}
      >
        I'll show you
      </SomeCustomButton>
    </div>
  </div>
)
```

Đoạn code trên xem như có vẻ lưu trữ tham chiếu để tránh render lại không cần thiết vì họ không sử dụng các arrow inline functions trong render, nhưng thực tế họ vẫn đang tạo các function mới trên mỗi giai đoạn của render!

Một số người có thể đã biết nếu theo dõi cộng đồng React trong thời gian các class components trở thành xu hướng.
Tuy nhiên, khi Hook được release, các cuộc thảo luận về .bind đã bị lung lay kể từ khi các class components trở nên ít phổ biến hơn --- và thông thường, khi .bind là chủ đề để nói, nó thường là về binding class methods. Và để thêm vào đó, các ví dụ trên thậm chí không liên kết với các phương thức lớp, do đó, điều đó càng khó nhận ra và sẽ để lại hậu quả nếu bạn không đủ cẩn thận.
Những người mới nên đặc biệt lưu ý về điều này!


# 3. Truyền biến động như là một key
Như chúng ta đều biết thì unique keys là thứ không thể thiếu nếu như code bạn có một số thành phần tuơng tự nhau.

Hãy cùng xem qua đoạn code sau
```
const Cereal = ({ items, ...otherProps }) => {
  const indexHalf = Math.floor(items.length / 2)
  const items1 = items.slice(0, indexHalf)
  const items2 = items.slice(indexHalf)
  return (
    <>
      <ul>
        {items1.map(({ to, label }) => (
          <li key={to}>
            <Link to={to}>{label}</Link>
          </li>
        ))}
      </ul>
      <ul>
        {items2.map(({ to, label }) => (
          <li key={to}>
            <Link to={to}>{label}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
```

Giờ hãy giả sử như giá trị *to* trong items1 và items2 là như nhau.

Mình đã thấy một số người muốn cấu trúc lại một component tương tự như trên, nhưng cuối cùng họ lại kết thúc với một cái gì đó như thế này:
```
import { generateRandomUniqueKey } from 'utils/generating'

const Cereal = ({ items, ...otherProps }) => {
  const indexHalf = Math.floor(items.length / 2)
  const items1 = items.slice(0, indexHalf)
  const items2 = items.slice(indexHalf)
  return (
    <>
      <ul>
        {items1.map(({ to, label }) => (
          <li key={generateRandomUniqueKey()}>
            <Link to={to}>{label}</Link>
          </li>
        ))}
      </ul>
      <ul>
        {items2.map(({ to, label }) => (
          <li key={generateRandomUniqueKey()}>
            <Link to={to}>{label}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
```

Đoạn code trên sẽ cung cấp unique keys cho mỗi thành phần con. Tuy nhiên có 2 điểm không đúng ở đây:

1. Chúng ta không chỉ khiến React làm những việc không cần thiết như cung cấp unique value, mà chúng ta còn luôn tạo mới các notes mỗi khi render bởi key sẽ khác nhau trong mỗi lần render.

2. Để xác định thành phần nào là thành phần nào, chúng ta cần các unique key nhưng không phải theo cách trên.

Sau đây là cách mà bạn làm việc với unique keys:
```
import { generateRandomUniqueKey } from 'utils/generating'

const Cereal = ({ items, ...otherProps }) => {
  const indexHalf = Math.floor(items.length / 2)
  const items1 = items.slice(0, indexHalf)
  const items2 = items.slice(indexHalf)
  return (
    <>
      <ul>
        {items1.map(({ to, label }) => (
          <li key={`items1_${to}`}>
            <Link to={to}>{label}</Link>
          </li>
        ))}
      </ul>
      <ul>
        {items2.map(({ to, label }) => (
          <li key={`items2_${to}`}>
            <Link to={to}>{label}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
```

Bây giờ chúng ta đã hoàn toàn tự tin rằng mỗi item sẽ luôn có một giá trị key riêng độc nhất cho mình.

# 4. Khai báo các biến với giá trị mặc định là Null
Mình đã từng dành kha khá thời gian để debugging những thứ tương tự như đoạn code sau:
```
const SomeComponent = ({ items = [], todaysDate, tomorrowsDate }) => {
  const [someState, setSomeState] = useState(null)

  return (
    <div>
      <h2>Today is {todaysDate}</h2>
      <small>And tomorrow is {tomorrowsDate}</small>
      <hr />
      {items.map((item, index) => (
        <span key={`item_${index}`}>{item.email}</span>
      ))}
    </div>
  )
}

const App = ({ dates, ...otherProps }) => {
  let items
  if (dates) {
    items = dates ? dates.map((d) => new Date(d).toLocaleDateString()) : null
  }

  return (
    <div>
      <SomeComponent {...otherProps} items={items} />
    </div>
  )
}
```

Bên trong App component, nếu *dates* trả về giá trị false, nó sẽ được khởi tạo với null.

Và khi chúng ta chạy đoạn code trên, chắc hẳn bản năng coder của bạn sẽ mách bảo chúng ta rằng chúng ta nên khởi tạo items dafault là một mảng rỗng nếu đó là 1 giá trị false. Nhưng app sẽ crash khi date có giá trị false bởi vì items là null. Chuyện gì đã xảy ra?

Các tham số mặc định của function cho phép các tham số được đặt tên được khởi tạo với các giá trị mặc định nếu không có giá trị hoặc undefined!
Trong trường hợp của chúng ta, mặc dù null là giá trị false, nhưng nó vẫn được tính là một giá trị.

Lỗi này khiến mình tốn khá nhiều thời gian để debug, đặc biệt là khi giá trị null đến từ reducer.

# 5. Để cho code lặp đi lặp lại
Việc copy và paste code thường là giải pháp nhanh nhất khi bạn đang cần sửa chữa code một cách nhanh chóng.

Sau đây là ví dụ về việc code lặp đi lặp lại:
```
const SomeComponent = () => (
  <Body noBottom>
    <Header center>Title</Header>
    <Divider />
    <Background grey>
      <Section height={500}>
        <Grid spacing={16} container>
          <Grid xs={12} sm={6} item>
            <div className={classes.groupsHeader}>
              <Header center>Groups</Header>
            </div>
          </Grid>
          <Grid xs={12} sm={6} item>
            <div>
              <img src={photos.groups} alt="" className={classes.img} />
            </div>
          </Grid>
        </Grid>
      </Section>
    </Background>
    <Background grey>
      <Section height={500}>
        <Grid spacing={16} container>
          <Grid xs={12} sm={6} item>
            <div className={classes.labsHeader}>
              <Header center>Labs</Header>
            </div>
          </Grid>
          <Grid xs={12} sm={6} item>
            <div>
              <img src={photos.labs} alt="" className={classes.img} />
            </div>
          </Grid>
        </Grid>
      </Section>
    </Background>
    <Background grey>
      <Section height={300}>
        <Grid spacing={16} container>
          <Grid xs={12} sm={6} item>
            <div className={classes.partnersHeader}>
              <Header center>Partners</Header>
            </div>
          </Grid>
          <Grid xs={12} sm={6} item>
            <div>
              <img src={photos.partners} alt="" className={classes.img} />
            </div>
          </Grid>
        </Grid>
      </Section>
    </Background>
  </Body>
)
```

Bây giờ là thời điểm tốt để bắt đầu suy nghĩ về cách trừu tượng hóa các components  này theo cách chúng có thể được tái sử dụng nhiều lần mà không thay đổi việc implementation. Nếu có một vấn đề về styling trong các Grid components liên quan đến *Grid container*, bạn phải thay đổi thủ công từng cái một.

Một cách tốt hơn để code là gom các phần lặp đi lặp lại, và truyền vào thông qua các props khác nhau:
```
const SectionContainer = ({
  bgProps,
  height = 500,
  header,
  headerProps,
  imgProps,
}) => (
  <Background {...bgProps}>
    <Section height={height}>
      <Grid spacing={16} container>
        <Grid xs={12} sm={6} item>
          <div {...headerProps}>
            <Header center>{header}</Header>
          </div>
        </Grid>
        <Grid xs={12} sm={6} item>
          <div>
            <img {...imgProps} />
          </div>
        </Grid>
      </Grid>
    </Section>
  </Background>
)

const SomeComponent = () => (
  <Body noBottom>
    <Header center>Title</Header>
    <Divider />
    <SectionContainer
      header="Groups"
      headerProps={{ className: classes.groupsHeader }}
      imgProps={{ src: photos.groups, className: classes.img }}
    />
    <SectionContainer
      bgProps={{ grey: true }}
      header="Labs"
      headerProps={{ className: classes.labsHeader }}
      imgProps={{ src: photos.labs, className: classes.img }}
    />
    <SectionContainer
      height={300}
      header="Partners"
      headerProps={{ className: classes.partnersHeader }}
      imgProps={{ src: photos.partners, className: classes.img }}
    />
  </Body>
)
```

Vì vậy, bây giờ nếu sếp của bạn muốn thay đổi ý định và muốn làm cho tất cả các phần này có chiều cao khoảng 300px, bạn chỉ cần thay đổi ở 1 nơi duy nhất.

Mình không cố gắng đề xuất một giải pháp như thế này nếu chúng ta đang tìm cách tạo ra một component hỗ trợ một số trường hợp sử dụng, cái này chỉ áp dụng cho một số trường hợp cụ thể mà chúng ta biết rằng nó sẽ chỉ được sử dụng lại trong môi trường đó. Một giải pháp có thể sử dụng lại cho SectionContainer mà hỗ trợ nhiều trường hợp sử dụng có thể được code để trở thành chung hơn, mà vẫn không thay đổi việc implementation:
```
const SectionContainer = ({
  bgProps,
  sectionProps,
  children,
  gridContainerProps,
  gridColumnLeftProps,
  gridColumnRightProps,
  columnLeft,
  columnRight,
}) => (
  <Background {...bgProps}>
    <Section {...sectionProps}>
      {children || (
        <Grid spacing={16} container {...gridContainerProps}>
          <Grid xs={12} sm={6} item {...gridColumnLeftProps}>
            {columnLeft}
          </Grid>
          <Grid xs={12} sm={6} item {...gridColumnRightProps}>
            {columnRight}
          </Grid>
        </Grid>
      )}
    </Section>
  </Background>
)
```

Bằng cách đó, giờ đây chúng ta cho phép các lập trình viên tùy ý mở rộng bất kỳ phần nào của các components khi cần trong khi vẫn duy trì phần implementation
 cơ bản.
 
 Vậy là chúng ta đã đi qua 5 điều cần chú ý tránh trong khi phát triển ứng dụng React. Hẹn gặp lại các bạn trong phần tiếp theo nha.
Source https://dev.to/jsmanifest/10-things-not-to-do-when-building-react-applications-58a7
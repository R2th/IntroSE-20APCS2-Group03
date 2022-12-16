Chào mừng các bạn đã quay trở lại với bài viết của mình, [phần trước](https://viblo.asia/p/10-dieu-nen-tranh-khi-phat-trien-ung-dung-react-phan-1-07LKXpRDKV4) mình đã gửi đến các bạn 5 điều đầu tiên nên tránh khi làm việc với React và hôm nay chúng ta sẽ đi tiếp phần còn lại nhé. Không làm phí thời gian của các bạn nữa, chúng ta bắt đàu ngay thôi.
# 6. Thiết lập Props bên trong constructor:
Thông thường bạn sẽ khai báo state bên trong constructor như sau:
```
import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: props.items,
    }
  }
}
```
Với cách khai báo như trên, bạn rất có thể sẽ gặp một số lỗi bởi vì *constructor* chỉ được gọi 1 lần duy nhất khi mà component được tạo ra.
Vào lần tói khi mà bạn cố gắng thay đổi props, state sẽ giữ lại giá trị lúc trước của nó bởi vì constructor không đựoc gọi lại khi component re-render.
Vậy làm thế nào để cho state đồng bộ với props? Chúng ta sẽ làm như sau:
```
import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
    // Initialize the state on mount
    this.state = {
      items: props.items,
    }
  }

  // Keep the state in sync with props in further updates
  componentDidUpdate = (prevProps) => {
    const items = []
    // after  calculations comparing prevProps with this.props
    if (...) {
      this.setState({ items })
    }
  }
}
```

# 7. && và điều kiện khi render:
Đây là một lỗi phổ biến khi chúng ta check điều kiện re-render bằng toán tử &&.
React sẽ cố gắng render ra bất cứ thứ gì bạn cung cấp để thay thế cho output nếu như điều kiện kiểm tra không thỏa mãn yêu cầu. Hãy xem ví dụ sau:
```
const App = ({ items = [] }) => (
  <div>
    <h2>Here are your items:</h2>
    <div>
      {items.length &&
        items.map((item) => <div key={item.label}>{item.label}</div>)}
    </div>
  </div>
)
```
Đoạn code trên sẽ render ra con số 0 tròn trĩnh trên màn hình khi items.length là mảng rỗng. Javascript sẽ coi giá trị 0 là false nên khi items là mảng rỗng toán tử && sẽ không tiếp tục đánh giá điều kiện ở bên phải nữa mà sẽ trả về giá trị đầu tiên.
Để giải quyết vấn đề này, mình thường sử dụng 2 lần phủ định:
```
const App = ({ items = [] }) => (
  <div>
    <h2>Here are your items:</h2>
    <div>
      {!!items.length &&
        items.map((item) => <div key={item.label}>{item.label}</div>)}
    </div>
  </div>
)
```
Với cách này, khi items là mảng rỗng thì React sẽ không render ra bất cứ thứ gì trên màn hình vì kết quả của biểu thức điều kiện đầu tiên là 1 giá trị dạng boolean.

# 8. Không truyền previous states:
Liên quan đến hook, chúng ta lại đến với một lỗi thường gặp nữa đặc biệt là khi useReducer thực thi. Sau đây là một ví dụ cho lỗi này:
```
const something = (state) => {
  let newState = { ...state }
  const indexPanda = newState.items.indexOf('panda')
  if (indexPanda !== -1) {
    newState.items.splice(indexPanda, 1)
  }
  return newState
}

const initialState = {
  items: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'add-item':
      return { ...state, items: [...something(state).items, action.item] }
    case 'clear':
      return { ...initialState }
    default:
      return state
  }
}
```
Khi *something* gọi và sao chép state, thuộc tính cơ bản của items không thay thay đổi. Khi chúng ta thay đổi nó bằng cách sử dụng *.splice*, điều này sẽ biến đổi *state.items* và tạo ra bug.
Hãy đặc biệt lưu ý về điều này trong những đoạn code lớn. Chúng ta hoàn toàn có thể nhận ra sự bất ổn trong một ví dụ nhỏ như trên, nhưng khi mọi thứ trở nên lộn xộn, điều này luôn phải được ghi nhớ mọi lúc vì nó rất dễ quên, đặc biệt là khi bạn bị áp lực phải chuyển code sang production!

# 9. Không truyền props xuống thành phần con một cách chi tiết:
Đây là điều thường được gợi ý khi bạn truyền các props xuống cho các components con.
Có một số lý do cho việc này
* Dễ dàng debugg: Bạn với tư cách là người viết code sẽ dễ dàng biết cái gì đựoc truyền cho components con. Đồng thời những lập trình viên khác cũng sẽ dễ dàng biết được điều đó và có một khoảng thời gian đọc code hạnh phúc hơn.
* Dễ dàng hiểu được components đó sẽ làm cái gì: Một lợi ích khác khi bạn làm điều này là nó sẽ đồng thời trở thành tài liệu cho code của bạn và khiến cho ai cũng hiểu được  components đó sẽ làm gì mà không cần có một bản docs chi tiết. Đièu này sẽ tiết kiệm được rất nhiều thời gian.

Mặc dù thế vẫn có một số trường hợp mà bạn phải truyền toàn bộ props xuống.
Như ví dụ dưới đây, nếu components cha cần một số điều kiện trước khi truyền props xuống cho components con, bạn có thể làm như sau:
```
const Parent = (props) => {
  if (props.user && props.user.email) {
    // Fire some redux action to update something globally that another
    //    component might need to know about
  }

  // Continue on with the app
  return <Child {...props} />
}
```
Hãy lưu ý là đừng khiến code của bạn trở nên như thế này:
```
<ModalComponent
  open={aFormIsOpened}
  onClose={() => closeModal(formName)}
  arial-labelledby={`${formName}-modal`}
  arial-describedby={`${formName}-modal`}
  classes={{
    root: cx(classes.modal, { [classes.dialog]: shouldUseDialog }),
    ...additionalDialogClasses,
  }}
  disableAutoFocus
>
  <div>
    {!dialog.opened && (
      <ModalFormRoot
        animieId={animieId}
        alreadySubmitted={alreadySubmitted}
        academy={academy}
        user={user}
        clearSignature={clearSignature}
        closeModal={closeModal}
        closeImageViewer={closeImageViewer}
        dialog={dialog}
        fetchAcademyMember={fetchAcademyMember}
        formName={formName}
        formId={formId}
        getCurrentValues={getCurrentValues}
        header={header}
        hideActions={formName === 'signup'}
        hideClear={formName === 'review'}
        movieId={movie}
        tvId={tvId}
        openPdfViewer={openPdfViewer}
        onSubmit={onSubmit}
        onTogglerClick={onToggle}
        seniorMember={seniorMember}
        seniorMemberId={seniorMemberId}
        pdfViewer={pdfViewer}
        screenViewRef={screenViewRef}
        screenRef={screenRef}
        screenInputRef={screenInputRef}
        updateSignupFormValues={updateSignupFormValues}
        updateSigninFormValues={updateSigninFormValues}
        updateCommentFormValues={updateCommentFormValues}
        updateReplyFormValues={updateReplyFormValues}
        validateFormId={validateFormId}
        waitingForPreviousForm={waitingForPreviousForm}
        initialValues={getCurrentValues(formName)}
        uploadStatus={uploadStatus}
        uploadError={uploadError}
        setUploadError={setUploadError}
        filterRolesFalseys={filterRolesFalseys}
      />
    )}
  </div>
</ModalComponent>
```
Và nếu chẳng may bạn có làm như vậy, hãy xem xét việc tách các bộ phận của component thành các component riêng biệt để nó sạch đẹp hơn và custom hơn.

# 10. Truyền props quá sâu:
Truyền props xuống nhiều tầng component con là thứ mà người ta hay gọi là 'code có mùi'.
Bây giờ vấn đề không phải nằm ở cha hay con. Các component nên giữ cho việc thực hiện của nó là như nhau. Các component ở giữa có thể trở thành một vấn đề trong app của bạn.

Đó là bởi vì bây giờ các component ở giữa được liên kết chặt chẽ và tiếp xúc với quá nhiều thông tin mà chúng thậm chí không cần. Điều tồi tệ nhất là khi component cha render lại, các component ở giữa cũng sẽ render lại, tạo hiệu ứng domino cho tất cả các component con.

Một giải pháp tốt là sử dụng [context](https://reactjs.org/docs/context.html). Hoặc cách khác là sử dụng redux cho props.

Vậy là bài viết của mình đã kết thúc, cảm ơn các bạn đã dành thời gian nghiền ngẫm, nếu có bất kỳ thắc mắc gì, hãy comment bên dưới nhé.

Source: https://dev.to/jsmanifest/10-things-not-to-do-when-building-react-applications-58a7
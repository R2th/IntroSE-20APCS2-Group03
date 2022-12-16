# Giới thiệu
Tháng trước mình có đọc được một bài báo nói rằng Dan Abramov đã công bố một tính năng mới cho react tên là `"Future-Fetcher"`, cái mà sẽ làm cho Redux trở nên lỗi thời. Điều đó làm mình rất bất ngờ bởi vì mình khá là thích redux, và rất may là redux vẫn còn sống nhăn răng. 

> Kinh nghiệm được rút ra ở đây là đừng tin bất cứ thứ gì bạn đọc được ở trên internet =)))

Mình thích redux vì cách nó hoạt động cũng như tư tưởng của nó, mọi thứ đều rất là rõ ràng và tường minh. Từ trên giao diện(view) khi bạn thực hiện 1 hành động gì đó(click button, hover chuột...) thì nó sẽ xảy ra 1 action, action đó có thể là thay đổi giao diện hoặc call api, nếu là call api thì sẽ có middleware xử lý việc đó, cuối cùng trả về reducer thì reducer sẽ quyết định state của ứng dụng thay đổi như thế nào và render lại giao diện để người dùng nhìn thấy. Tất cả đều hoạt động rất trơn tru và mượt mà :)))

Nhưng kể từ lúc tiếp xúc với redux mình thấy có rất nhiều quan điểm khác nhau về nó, nhiều người thích sử dụng nó vì nghĩ như mình ở trên, nhưng cũng rất nhiều người chia sẻ rằng nó quá phức tạp để sử dụng. Sau đây thì mình sẽ chia sẻ những thứ mà mình nghĩ sau khi đọc xong bạn sẽ thích sử dụng nó hơn =)))

# Redux hay ho như thế nào

Đi qua một vài lý do mà mình thấy redux giúp ích cho chúng ta nhiều như thế nào nhé ^^

### Không cần lo lắng việc truyền props nữa

* Nhiều người cho rằng thứ hay ho nhất khi sử dụng react vs redux là bạn sẽ không phải lo lắng về việc truyền props qua lại trong toàn bộ ứng dụng của bạn nữa. Bởi khi sử dụng react thuần thì việc truyền props từ component cha xuống component con và từ component con gọi lên component cha đôi khi là một ác mộng nếu như ứng dụng của bạn có quá nhiều tầng component. Với ứng dụng nhỏ thì bạn vẫn có thể quản lý được nhưng nếu ứng dụng bạn ngày càng lớn thì sẽ rất khó để quản lý.

* Với redux thì bạn sẽ không phải lo về vấn đề đó nữa. Redux sẽ giải quyết cho bạn việc này, bạn có thể lấy về state của toàn bộ ứng dụng của bạn từ bất cứ component nào bằng cách sử dụng hàm ```mapStateToProps``` và chỉ định những state bạn muốn lấy về. 

* Ví dụ như bây giờ mình đang ở trang show project, mình muốn lấy về current project và ở trang show project của mình có chức năng assign member. Thì để assign member thì phải có list user đang chưa được assign vào dự án này đúng không nào. Vì ứng dụng của mình đã có 1 trang list users rồi nên giờ mình muốn dùng luôn list user đó để bind dữ liệu vào trang assign member. 

* Nếu như bình thường không sử dụng redux thì khi vào trang show project ta sẽ phải gửi thêm 1 query để get về list user, hoặc không thì ở component cao nhất ta sẽ phải query từ trên đó và truyền qua props xuống các component con. Thì như thế sẽ tốn thêm query không cần thiết trong khi chúng ta có thể tận dụng data từ component khác. 

* Redux đã giúp chúng ta giải quyết việc đó như thế nào. Xem ví dụ dưới đây nhé:

```Javascript
// show_project.jsx

const mapStateToProps = state => {
    return {
        users: state.usersStore.users,
        currentProject: state.projectsStore.currentProject
    };
}

export default connect(mapStateToProps)(ShowProject);
```

Giải thích một chút đoạn code ở trên nhé:

1. mapStateToProps có một tham số là state, thì state ở đây chính là store của bạn. Redux định nghĩa khái niệm store là ```một cây state duy nhất``` chứa toàn bộ state trong ứng dụng của bạn. State của bạn sẽ không nằm trong bất cứ component nào cả mà nằm riêng biệt trong một store để từ bất cứ đâu bạn cũng có thể lấy về state mà bạn cần sử dụng. Một ý tưởng mà mình thấy cực kì hay của redux :)))) Vậy là giờ bạn sẽ không phải lo việc quản lý state mà component cha lấy về rồi truyền xuống các component con nữa. 

* Thì hàm mapStateToProps này trả về một object chính là props của component ShowProject, return như ở trên nghĩa là chúng ta sẽ có hai props là users và currentProject để sử dụng rồi :))))

2. ```connect``` là một HOC được cung cấp bởi ```react-redux``` giúp chúng ta connect đến store và thực hiện các thao tác với state như là lấy về hoặc là thay đổi state. Như ví dụ ở trên đây thì chúng ta mới chỉ lấy về state chứ chưa thay đổi state, ở phần sau chúng ta sẽ tiến hành thay đổi state nhé ^^

Vậy là giờ component ```ShowProject``` của bạn đã có 2 props là ```users``` và ```currentProject``` đúng như yêu cầu ban đầu để sử dụng rồi, cũng easy thôi đúng ko :))))

Bất cứ component nào bạn muốn sử dụng state thì bạn đều có thể dùng cách này để lấy về ^^

### Thao tác với state từ bất cứ component nào

* Đôi khi chúng ta muốn thay đổi state của các component khác mà không phải component cha hay các component anh em thì chúng ta sẽ phải gọi đến component level cao nhất để thay đổi state. Điều đó khá là tốn công và không hợp lý cho lắm, nó sẽ dẫn đến việc khi ứng dụng lớn dần thì component level cao sẽ phải xử lý rất nhiều và rất phức tạp.

* Việc các component level cao phải xử lý rất nhiều logic cũng sẽ dẫn đến việc scale dự án trở nên khó khăn hơn. 

* Với redux thì khác, xử lý logic về thay đổi state sẽ được thực hiện ở trong reducer, các hành động của người dùng sẽ được định nghĩa trong action, nó làm ứng dụng của bạn rất rõ ràng về mặt logic vì thế việc mở rộng hệ thống cũng sẽ dễ dàng hơn rất nhiều.

* Vậy quay lại trở lại vấn đề chính ở đây, đó là redux giải quyết việc thay đổi state như thế nào ? Tương tự như ```mapStateToProps``` giúp chúng ta lấy về state từ store thì chúng ta có ```mapDispatchToProps``` giúp chúng ta thực thi các action thông qua props, vậy là cái gì cũng thông qua props nhỉ :)))) khá quen thuộc đúng không nào.

* ```mapDispatchToProps``` cho phép bạn dispatch action và từ đó reducer sẽ thay đổi state giúp bạn. Giống như ```mapStateToProps``` thì ```mapDispatchToProps``` cũng phải return về một object là các action.

* Ví dụ như bây giờ ở trang show project mình muốn assign member thì mình sẽ làm như sau:

```Javascript
// show_project.jsx

const mapStateToProps = state => {
    return {
        users: state.usersStore.users,
        currentProject: state.projectsStore.currentProject
    };
};

const mapDispatchToProps = dispatch => {
    return {
        assignMemberToProject: (projectId, memberIds) => {
            dispatch(assignMemberToProject(projectId, memberIds))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowProject);
```

* Sau khi làm như trên thì component ShowProject đã có thể gọi this.props.assignMemberToProject khi submit form add member rồi.

### Scale ứng dụng dễ dàng

* Điều cuối cùng mà mình nghĩ redux hỗ trợ đắc lực cho chúng ta đó là việc mở rộng ứng dụng.

* Chúng ta có thể thêm chức năng, thêm logic hay lược bớt chức năng cũng đều rất dễ dàng.

* Ví dụ bây giờ ứng dụng của mình cần thêm chức năng edit member thì ngoài việc cần thêm một trang jsx để chứa form edit member ra thì ra cần định nghĩa thêm một action load thông tin member về theo id và sửa file reducer thêm một chút như sau:

```Javascript
// actions/get_member_info.jsx

export function getMemberInfo(memberId) {
    return (dispatch, getState) => {
    // ở đây mình sử dụng middleware là redux thunk nên function getMemberInfo ở đây sẽ 
    là một thunk (về khái niệm middleware hay thunk là gì các bạn tham khảo trên viblo nhé :D)
    
    // vì đây là 1 thunk nên mình có thể lấy về token sau khi user login thành công để gửi kèm theo request bằng hàm getState()
    const token = getState().sessionStore.current_user.authen_token;
    
    axios({
      method: 'GET',
      url: `${process.env.ROOT_URL}/api/members/${memberId}`,
      headers: {
        'Content-Type': 'application/json',
        'TMS-AUTH-TOKEN': token
      }
    }).then(res => {
      // khi fetch dữ liệu thành công mình dispatch 1 action để reducer xử lý việc get info thành công
      dispatch(getMemberInfoSuccess(res.data));
    }).catch(error => {
      dispatch(getMemberInfoFail(error));
    });
  };
};

export function getMemberInfoSuccess(memberInfo) {
    return {
        type: "GET_MEMBER_INFO_SUCCESS",
        payload: memberInfo
    };
};

export function getMemberInfoFail(error) {
    return {
        type: "GET_MEMBER_INFO_FAIL",
        error
    };
};
```

```Javascript
// reducers/index.js

.......
case "GET_MEMBER_INFO_SUCCESS":
    return Object.assign({}, state, {
        memberInfo: action.payload
    });
    
case "GET_MEMBER_INFO_FAIL":
    return Object.assign({}, state, {
        error: action.error
    });
.......
```

```Javascript
// show_member.jsx

........

// thêm nội dung như này vào cuối file
const mapStateToProps = state => {
    return {
        member: state.memberStore.memberInfo
    };
};

export default connect(mapStateToProps)(ShowMember);
```

* Trên đây là ví dụ khi bạn muốn thêm chức năng mới với redux, có thể khi mới làm việc vs redux bạn sẽ thấy nó khá là phức tạp vs rắc rối, sao ko viết tất cả vào cùng một file show_member.jsx luôn cho rồi. Khi ứng dụng của bạn còn nhỏ thì bạn vẫn thấy cách viết tất cả trong file show_member.jsx nhanh hơn, nhưng khi ứng dụng của bạn lớn hơn và cần scale nhiều thì mình nghĩ lúc đó redux sẽ phát huy mạnh mẽ tác dụng của nó :)))

* Cá nhân mình cũng làm việc với redux qua một vài dự án rồi cả ở công ty cả dự án cá nhân nữa, dù dự án lớn hay nhỏ mình đều sử dụng redux cả. 

# Kết luận

* Trên đây là một vài ý kiến cá nhân của mình sau khi làm việc với redux. Redux cũng không phải là không có điểm yếu, nó khá là khó làm quen cho người mới và cũng phức tạp đối với dự án vừa và nhỏ. Nhưng mình cá là sau khi đã làm quen với nó bạn sẽ muốn sử dụng nó luôn đấy ^^

* Link tham khảo: https://medium.com/front-end-hacking/why-i-love-redux-with-react-and-so-should-you-def71cee6a26
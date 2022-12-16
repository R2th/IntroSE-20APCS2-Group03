Thử thách thứ 302 của FreeCodeCamp là 1 ứng dụng xếp hạng người dùng của FreeCodeCamp, sử dụng API của FreeCodeCamp để đưa ra dữ liệu người dùng. Tuy nhiên, FreeCodeCamp hiện tại khóa học React trống không nhưng vẫn tồn tại project với React. Vậy ta phải làm thế nào? 

![](https://images.viblo.asia/85fbc814-049a-4d47-bd95-0a2017c77b44.jpg)

# I. Các bước chuẩn bị
## 1. Phân tích

Ứng dụng sẽ cần các phần tử nhỏ sau:

*  1 bảng
*  1 phần tử để chuyển đổi giứa 2 API
*  trong phần tử bảng trên sẽ cần 1 phần tử thân bảng để show ra tập hợp các dữ liệu
*  mỗi dữ liệu con trong tập hợp các dữ liệu ấy sẽ chứa dữ liệu của từng người dùng, gói gọi trong 1 hàng. Vậy chúng ta sẽ cần 1 phần tử từng người dùng

Tổng cộng chúng ta sẽ cần 4 component cho app này

## 2. Nghiên cứu qua API được cho

![](https://images.viblo.asia/ccaed59c-3b69-4739-ab33-d7d55cf63aa1.jpg)

API đã cho có các thuộc tính quan trọng nhất ở đây là username, ảnh, điểm gần đây và điểm từ lúc bắt đầu. Đây là những thuộc tính chúng ta sẽ sử dụng trong ứng dụng

## 3. Cài đặt môi trường

Thường thì mình sẽ làm trên laptop với module create-react-app của NodeJS. Tuy nhiên vì lười và muốn sản phẩm chạy luôn nên mình làm trên Codepen

Cách thức cài đặt trên Codepen:

* Chọn setting
* Đặt viewport meta tag

![](https://images.viblo.asia/be7759ba-3647-4d4d-b96a-8b602bd54e82.jpg)

* Thêm các thư viện css. Trong ứng dụng này mình sử dụng Font Awesome 4.7(khuyến cáo sử dụng Font Awesome 5. Do lại bản tính lười nên dùng 4.7 ) và Bootstrap 3(4 mình thấy có vẻ phải load thêm 1 thư viện js nữa nên dùng 3 cho gọn nhẹ)


![](https://images.viblo.asia/d2978e4a-eea1-42aa-80e6-dc910546d335.jpg)

* Thêm các thư viện js. Quan trọng nhất ở đây là React và Axios. Cứ add link vào là xong. NHỚ là add React trước ReactDOM

![](https://images.viblo.asia/d31f6b90-a8ac-43bd-a4f8-20af12831bab.jpg)

Vậy là cài đặt trên Codepen đã xong.

Ưu điểm của cài đặt trên Codepen là đỡ tốn dung lượng máy tính, sản phẩm có thể chạy được luôn và ko mất thời gian install package bằng npm. Tuy nhiên làm với dự án thật thì hoàn toàn nên sử dụng trên máy. Hơn nữa Codepen(bản free) trợ giúp bạn tiện lợi ở việc click và add khá tiện, cộng với việc cho tất cả các Component vào cùng 1 file sẽ hơi xa vời với thực tế 1 chút. Cái này nếu mình không lười sẽ review chi tiết.

# II. Lập trình

## 1. HTML 

Đây là cách làm phần HTML. Thẻ có ID `#root` ở đây sẽ chính là phần xử lý bằng React.

```
<div class="container">

	<h1>Free Code Camp</h1>

    <h2><i class="fa fa-free-code-camp"></i> Top Campers <i class="fa fa-free-code-camp"></i></h2>
	
    <div id="root"></div>

</div>

<footer>Project by Gryqhon</footer>
```

## 2. CSS

Mình dùng Scss cho project này

```
@import url(https://fonts.googleapis.com/css?family=Lobster);
$primary-color: #007E00;
@mixin butt-color($p1, $p2){
	color: $p1;
	background-color: $p2;
}

html{
    position: relative;
    min-height: 100%;	
}

%title-shared {
	text-align: center; 
	color: $primary-color;
}

%border-tab{
	border: 1px solid black;
}

%table-cell{
	padding: 5px 10px 5px;	
	@extend %border-tab;
}

h1{
	font-family: Lobster; 
	@extend %title-shared;
} 

h2{
	@extend %title-shared;
}

.container{
	margin-bottom:100px;
}
.switch{
	@include butt-color($primary-color,#fff);
	width: 300px;
	border: solid 3px $primary-color;
	font-weight: bold;
	font-size: 25px;
	margin-bottom:10px;
	&:hover {
		@include butt-color(#fff,$primary-color);
		transition: .6s;
    }
	&:focus{
		@include butt-color($primary-color,#fff);
	}
}
table{
	width: 100%;
	@extend %border-tab;
	th{
		color: #fff;
		background-color: $primary-color;
		@extend %table-cell;
	}
	td{
		@extend %table-cell;	
		font-weight: bold;
	}
}

img{
	margin-right:5px;
}

footer {
    color: #fff;
	background-color: $primary-color;
    position: absolute;
	text-align: center;
    bottom: 0;
    height: 30px;
    width: 100%;
    overflow:hidden;
}
```

## 3. Javascript

Đến phần quan trọng nhất của bài đăng này rồi 

### a. Component User

```
class User extends React.Component {
  render() {
    return (
      <tr>
        <td className="text-center">{this.props.number}</td>
        <td>
            <a href={"https://www.freecodecamp.com/"+this.props.username} target="_blank">
              <img height="40" width="40" src={this.props.img} />{this.props.username}</a>
        </td>
        <td className="text-center">{this.props.recent}</td>
        <td className="text-center">{this.props.alltime}</td>
      </tr>
    );
  }
}
```
Chúng ta cần đưa ra vị trí, ảnh, link, tên, điểm gần đây và điểm từ đầu thời gian của các user, nên các props cầm đưa là 'number', 'username', 'img', 'recent' và 'alltime'. 'username', 'img', 'recent' và 'alltime' là các props ứng với API. Link của người dùng ở FCC sẽ có dạng "https://www.freecodecamp.com/"+this.props.username, ví dụ như mình là blazingrockstorm, thì link của mình là https://www.freecodecamp.com/blazingrockstorm . Còn props 'number' thì mình sẽ xử lý ở đoạn tiếp theo.

### b. Component UserData

```
class UserData extends React.Component {
  render() {
    var count = 0;
    const data = this.props.users;
    const display = data.map(user => {
      count++;
      return (
        <User
          key={user.username}
          number={count}
          img={user.img}
          username={user.username}
          alltime={user.alltime}
          recent={user.recent}
        />
      );
    });
    return (
      <table className="table table-striped table-inverse">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Points in Past 30 days</th>
            <th>All time points</th>
          </tr>
        </thead>
        <tbody>{display}</tbody>
      </table>
    );
  }
}
```

Đây chính là cách chúng ta xử lý với number.  Tạo 1 biến 'count=0' và sau đó cho giá trị tăng dần trong lúc đọc data. Và đặt giá trị cho các props tương ứng. Lệnh map sẽ cho phép chúng ta lấy hết lượng data trong API đang gọi.  Và hằng số 'display' sẽ được đặt trong thẻ body.

### c. Component TableData

```
//ví dụ với recent 
class TableData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  
  componentDidMount() {
    axios .get("https://fcctop100.herokuapp.com/api/fccusers/top/recent") 
      	.then(response => {
        	this.setState({ users: response.data });
      	})
		.catch(err => console.log(err));
  } 
  
  render() {
    return (
      <UserData users={this.state.users} />
    ) ;
  }
}
```

Đây  chính là lúc sử dụng Axios. Đầu tiên chúng ta khởi tạo state 

```javascript
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
```

Tiếp theo sẽ là gọi API. Chúng ta có thể dùng lệnh fetch có sẵn nhưng sẽ khá phức tạp. Axios sẽ nhàn hơn

```
  componentDidMount() {
    axios .get('https://fcctop100.herokuapp.com/api/fccusers/top/recent') 
      	.then(response => {
        	this.setState({ users: response.data });
      	})
		.catch(err => console.log(err));
  } 
```
Sau hàm này, users ở bên trên đã được đặt là data của response.

Cuối cùng, hàm 'render()' của component này:   
```
render() {
    return (
      <UserData users={this.state.users} />
    ) ;
  }
}
```

Giá trị users gọi từ API sẽ được gán vào prop 'users' của component UserData. Tại UserData users sẽ bị gọi từng user ra riêng cho đến hết dữ liệu trong link API. Từng user đó sẽ bị gọi các props username, img, recent và alltime. 

Và chúng ta sẽ render 

```
ReactDOM.render(<TableData />, document.getElementById("root"));
```

Và có kết quả 

![](https://images.viblo.asia/949c00c6-7414-4b46-93dc-70d269006e07.jpg)

Thật nhanh phải không! Chúng ta đã xong việc! 

Ồ không, bạn quên mất 1 chức năng quan trọng rồi

![](https://images.viblo.asia/24e02993-a832-4244-9ea8-71d9906ed242.jpg)

Đó sẽ là component tiếp theo chúng ta sẽ xử lý

### d. Component Toggle

Trước hết, chúng ta đổi lại API như sau 

```
axios .get(`https://fcctop100.herokuapp.com/api/fccusers/top/${this.props.url}`)
```

Và bổ sung thêm component Toggle sau:  

```
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: false,
      text: "Top All Time",
      url: "recent"
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    if (this.state.val === false) {
      this.setState({
        val: true,
        text: "Top Recent",
        url: "alltime"
      });
    } else {
      this.setState({
        val: false,
        text: "Top All Time",
        url: "recent"
      });
    }
  }
  render() {
    return (
      <div>
        <div className="text-center">
        <button onClick={this.toggle} type="button" className="btn switch">{this.state.text}</button>
        </div>
          {this.state.val === false ? <TableData url="recent" /> : null}
        {this.state.val === true ? <TableData url="alltime" /> : null}
      </div>
    );
  }
}
```

Đồng thời sửa lại phần tử render: 

```
ReactDOM.render(<Toggle />, document.getElementById("root"));
```

Và đây mới là thành quả cuối cùng: 
https://codepen.io/Rocker_Gryphon/pen/oqqorO

# IV. Kết luận

Cách đọc API làm ứng dụng trên khá là dễ sử dụng và còn ứng dụng được nhiều chỗ khác. Mình cũng đã làm lại 1 project của codepen thì jQuery sang ReactJS cũng dùng cách đọc API này

Link project jQuery: https://codepen.io/Rocker_Gryphon/pen/qRKPjQ

Link project React: https://github.com/BlazingRockStorm/Wikipe-tan2

Tuy nhiên, ở project React, phải bổ sung link API của Wikipedia 'origins=* ' để tránh xung đột CORS.

Chúc các bạn làm tốt với React
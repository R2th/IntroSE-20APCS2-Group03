## Cài đặt project React
Đầu tiên chúng ta cần cài đặt một project React mới. Chúng ta sử dụng `create-react-app`:
```
$ npx create-react-app react-material-ui
```
Bằng cách sử dụng lệnh `npx` (là một phần của Node Package Manager (NPM)), chúng ta có thể `create-react-app` mà không cần phải tải xuống và cài đặt nó trước.

## Cài đặt Material-UI Library & Dependencies

Tiếp theo chúng ta cần cài đặt thêm các dependencies. Bằng cách sử dụng lệnh sau:
```
$ npm install @material-ui/core
```

Tiếp theo, chúng ta cần cài đặt thư viện JavaScript Contentful để có thể truy cập vào:
```
$ npm install contentful
```
Để kiểm tra mọi thứ hoạt động không, ta chạy:
```
$ npm start
```

Trình duyệt mở ra, trang bắt đầu của ứng dụng React mặc định được tải và bạn sẽ có thể thấy trang sau trong trình duyệt:
![](https://images.viblo.asia/2780ae4f-94b7-4686-87cf-b56badbb7a03.png)
Bây giờ chúng ta cùng thực hiện demo để xem khả năng của Material nhé

## Sample Application
### 1. Xóa nội dung mặc định
Điều đầu tiên cần làm là xóa một số phần mặc định. Đầu tiên, ở tệp `src/App.js` và áp dụng các thay đổi sau:

* Xóa mã JSX có sẵn trong câu lệnh return
* Xóa câu lệnh nhập đang nhập từ ./logo.svg (bạn cũng có thể xóa tệp này vì nó không còn cần thiết nữa).

Và rồi bây giờ chúng ta bắt đầu chỉnh sửa theo ý mình nhé

### 2. NavBar Component

Trước tiên hãy thêm một thanh điều hướng vào ứng dụng của mình. Mã cần thiết để hiển thị thanh điều hướng bằng cách sử dụng các thành phần Material Design từ thư viện Material-UI được thêm vào trong một thành phần khác. Để thực hiện điều đó thành phần mới tạo ra một thư mục con mới thành phần trong thư mục src và thêm một file mới `NavBar.js` . Chèn đoạn mã sau vào tệp vừa tạo:
```js
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
const NavBar = () => {
    return(
        <div>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="title" color="inherit">
                React & Material-UI Sample Application
                </Typography>
            </Toolbar>
        </AppBar>
        </div>
    )
}
export default NavBar;
```
Ở đây chúng tôi đang sử dụng thành phần `AppBar` , `Toolbar` và `Typography` từ thư viện Material-UI để tạo thanh điều hướng như được hiển thị trước đó. Để có thể đưa `NavBar` vào app component chính, chúng ta cần đảm bảo rằng `NavBar` được exported.
Bây giờ chúng ta đã sẵn sàng để import `NavBar` trong `src/App.js`:
```js
import React, { Component } from 'react'
import NavBar from './components/NavBar'
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
      </div>
    )
  }
}
export default App
```

Các thẻ `<NavBar />` được chèn vào mã JSX, do đó thanh điều hướng sẽ là một phần của đầu ra.

### 3. CourseList Component
Tiếp theo, ta sẽ thêm một thành phần khác vào ứng dụng của mình: `CourseList`. Thêm một tệp mới có tên `CourseList.js` trong thư mục `src/components` và chèn đoạn mã sau:
```js
import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as contentful from 'contentful'
import Course from '../components/Course'
const SPACE_ID = '[INSERT CONTENTFUL SPACE ID]'
const ACCESS_TOKEN = '[INSERT CONTENTFUL ACCESS TOKEN]'
const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
})
class CoursesList extends Component {
    state = {
        courses: [],
        searchString: ''
    }
    constructor() {
        super()
        this.getCourses()
    }
    getCourses = () => {
        client.getEntries({
            content_type: 'course',
            query: this.state.searchString
        })
        .then((response) => {
            this.setState({courses: response.items})
            console.log(this.state.courses)
        })
        .catch((error) => {
          console.log("Error occurred while fetching Entries")
          console.error(error)
        })
    }
    onSearchInputChange = (event) => {
        console.log("Search changed ..." + event.target.value)
        if (event.target.value) {
            this.setState({searchString: event.target.value})
        } else {
            this.setState({searchString: ''})
        }
        this.getCourses()
    }
    render() {
        return (
            <div>
                { this.state.courses ? (
                    <div>
                        <TextField style={{padding: 24}}
                            id="searchInput"
                            placeholder="Search for Courses"   
                            margin="normal"
                            onChange={this.onSearchInputChange}
                            />
                        <Grid container spacing={24} style={{padding: 24}}>
                            { this.state.courses.map(currentCourse => (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <Course course={currentCourse} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : "No courses found" }
            </div>
        )
    }
}
export default CoursesList;
```

Thành phần này chịu trách nhiệm truy xuất dữ liệu khóa học từ dịch vụ Contentful back-end và hiển thị danh sách các khóa học cho người dùng.

Trước tiên, kết nối với Contentful được thiết lập bằng cách sử dụng thư viện Contentful JavaScript. Để thiết lập kết nối, bạn cần đăng nhập vào back-end Contentful (https://be.contentful.com/login), tạo một space mới, chèn mô hình Khóa học như bạn có thể thấy trong ảnh chụp màn hình sau và truy cập `Space ID` và `Access Token` từ cài đặt `Space settings — API Keys`.

![](https://images.viblo.asia/868abd4d-fc9d-4acf-8781-65a8505fe015.png)

Để truy cập các giá trị đó, bạn cần tạo khóa mới bằng cách nhấp vào nút `Create API Key`. Cả hai giá trị - Space ID và Access Token cần được sao chép và chèn vào chuỗi được gán cho các hằng `SPACE_ID` và `ACCESS_TOKEN`.

Cả hai hằng số được sử dụng để bắt đầu kết nối back-end bằng cách sử dụng các mã sau:
```js
const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
})
```

Kết nối đến không gian Contentful được lưu trữ trên `client`. Để lấy danh sách các khóa học từ kết nối này, phương thức `getCourses` được thêm vào lớp thành phần:

```js
getCourses = () => {
        client.getEntries({
            content_type: 'course',
            query: this.state.searchString
        })
        .then((response) => {
            this.setState({courses: response.items})
            console.log(this.state.courses)
        })
        .catch((error) => {
          console.log("Error occurred while fetching Entries")
          console.error(error)
        })
    }
```
    
Yêu cầu truy xuất danh sách các khóa học từ Contentful được thực hiện bằng cách gọi phương thức `client.getEntries`. Phương pháp này dự kiến sẽ lấy một đối tượng cấu hình làm tham số. Đối tượng cấu hình này cần chứa hai thuộc tính:

* `content_type` : Nội dung Contentful cần truy vấn. Trong trường hợp của chúng ta đó là `course`.
* `query`: Có thể thực hiện tìm kiếm toàn văn trên tất cả các trường văn bản và ký hiệu với tham số truy vấn. Giá trị được gán cho thuộc tính này có sẵn trong `this.state.searchString`. Thuộc tính trạng thái này được cập nhật mỗi khi người dùng thay đổi giá trị của trường nhập tìm kiếm.

Vì lệnh gọi của `getEntries` là bất đồng bộ, nó trả về một promise để chúng ta có thể kết nối với kết quả bằng cách sử dụng `then`.
Bên trong phương thức sau đó, danh sách các `course` có sẵn trong `response.items`. Những mục này được lưu trữ bên trong thuộc tính `course` của trạng thái thành phần.

Đầu ra của thành phần được xác định bởi mã JSX được trả về bởi medthod `render`:
```js
render() {
        return (
            <div>
                { this.state.courses ? (
                    <div>
                        <TextField style={{padding: 24}}
                            id="searchInput"
                            placeholder="Search for Courses"   
                            margin="normal"
                            onChange={this.onSearchInputChange}
                            />
                        <Grid container spacing={24} style={{padding: 24}}>
                            { this.state.courses.map(currentCourse => (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <Course course={currentCourse} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : "No courses found" }
            </div>
        )
    }
```
Ở đây mình đang sử dụng hai thành phần Material-UI: `TextField` và `Grid`. Cả hai thành phần chỉ được thêm vào đầu ra nếu các mục course có sẵn trong `this.state.courses`. Trong trường hợp này, người dùng có thể sử dụng `TextField` để bắt đầu tìm kiếm văn bản miễn phí. Nếu giá trị của text field thay đổi thì phương thức `onSearchInputChange` được gọi và thuộc tính `searchString` của đối tượng trạng thái được cập nhật với giá trị mới đó.

Thành phần Material-UI Grid được sử dụng để hiển thị các khóa học theo bố cục grid đáp ứng với kích thước màn hình. Đầu ra cho một khóa học cụ thể được tạo bởi thành phần Khóa học tùy chỉnh được triển khai trong bước tiếp theo. Khóa học hiện tại được bàn giao cho thành phần này thông qua tham số khóa học.

Một lần nữa chúng ta cần phải import và thêm `CourseList` trong `App.js`:
```js
import React, { Component } from 'react'
import NavBar from './components/NavBar'
import CoursesList from './components/CoursesList'
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <CoursesList />
      </div>
    )
  }
}
export default App
```

### 4. Course Component

Tiếp theo hãy thực hiện thành phần `Course`. Tạo một tệp mới `Course.js` trong thư mục `src/components` và chèn mã từ danh sách sau:
```js
import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
const Course = (props) => {
    console.log(props)
    return(
        <div>
            { props.course ? (
                <Card >
                    <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                    image={props.course.fields.courseImage.fields.file.url}
                    title={props.course.fields.title}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {props.course.fields.title}
                    </Typography>
                    <Typography component="p">
                        {props.course.fields.description}
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small" color="primary" href={props.course.fields.url} target="_blank">
                        Go To Course
                    </Button>
                    </CardActions>
                </Card>
            ) : null}
        </div>
    )
}
export default Course
```
Vì khóa học hiện tại được handed như một property, ta có thể truy cập dữ liệu của khóa học thông qua `props.course`. Nếu có sẵn dữ liệu, khóa học được hiển thị bằng cách sử dụng thành phần `Card` từ thư viện Material-UI. Hơn nữa, mình đang sử dụng các thành phần Material Design sau: `CardActions`, `CardContent`, `CardMedia`, `Button` và `Typography`.

Sau khi hoàn thành việc triển khai, ứng dụng của chúng ta sẽ xuất kết quả cuối cùng như được hiển thị ở phần đầu của hướng dẫn này.
(yeah)

Bằng cách sử dụng thư viện Material-UI, thật dễ dàng để nâng cao đầu ra của ứng dụng React của bạn với Material Design của Google.

Trong hướng dẫn này, chắc hẳn bạn đã học được cách thiết lập và sử dụng Material-UI trong dự án React của mình và triển khai ứng dụng thực tế.

Bạn có thể xem chi tiết tại link này nhé:

[https://www.youtube.com/watch?v=PWadEeOuv5o](https://www.youtube.com/watch?v=PWadEeOuv5o)

*Sources:*

https://material-ui.com/

https://github.com/mui-org/material-ui/tree/master/examples/create-react-app

https://medium.com/codingthesmartway-com-blog/getting-started-with-material-ui-for-react-material-design-for-react-364b2688b555
![](https://images.viblo.asia/bc6c0af1-7af6-4c55-85c7-8376a25af043.png)

Chào mọi người. À, đừng để ý ảnh trên là mình truy cập bằng cửa sổ ẩn danh vì Ctrl+Shift+N nó quen tay rồi =))) Ngắn gọn thì bài này chúng ta sẽ nhìn vào bài tập đơn giản của FreeCodeCamp là tạo 1 trang xem kết quả Wikipedia. Yêu cầu của bài tập các bạn có thể xem ở đây: https://www.freecodecamp.org/learn/coding-interview-prep/take-home-projects/build-a-wikipedia-viewer

# Phân tích yêu cầu:

Yêu cầu của bài tập này khá đơn giản. Chỉ có 2 yêu cầu:
- Có thể nhấn 1 nút để truy cập đến 1 trang ngẫu nhiên trên Wikipedia.
- Màn hình hiển thị 1 thanh tìm kiếm để có thể nhập vào và kết quả trả ra phải được đọc từ wikipedia
# Nghiên cứu API
Các bạn có thể chọn opensearch API để làm project này: https://www.mediawiki.org/wiki/API:Opensearch

Và đây là response trả về
```json
[
    "Hampi",
    [
        "Hampi",
        "Hampi (town)",
        "Hampi Express",
        ...
    ],
    [
        "Hampi, also referred to as the Group of Monuments at Hampi, is a UNESCO World Heritage Site located in east-central Karnataka, India.",
        "Hampi  is a town in Hospet taluk of the Ballari district in the Indian state of Karnataka. Located along the Tungabhadra River in the east and center part of the state, near the border of Andhra Pradesh, Hampi is near the city of Hosapete.",
        "The Hampi Express is a daily express train running between the Mysooru and Hubballi Junction, the headquarters of the South Western Railway in India.",
        ...
    ],
    [
        "https://en.wikipedia.org/wiki/Hampi",
        "https://en.wikipedia.org/wiki/Hampi_(town)",
        "https://en.wikipedia.org/wiki/Hampi_Express",
        ...
    ]
]
```
Trông có vẻ ổn nhỉ?

ĐÙA ĐẤY, tin người vãi chưởng :v 

Thực ra thì ngày xưa API của opensearch đúng là như thế thật. Cơ mà ngày nay khi dùng opensearch nó sẽ cho cái này:

![](https://images.viblo.asia/3f4e6b34-da7b-43ff-a1a3-51a98cf310e9.png)

Nếu với yêu cầu của bài tập thì đúng là chỉ cần API trên là đủ. Cơ mà bạn chỉ có hiện mỗi link và tên kết quả thì nó cảm giác hơi trống trống. Và API kia đơn giản quá. Nên chúng ta sẽ đổi API khác là query


![](https://images.viblo.asia/28327dbe-88fe-4cd5-8c25-4e6a2ec4b132.png)

Và chúng ta sẽ xem qua cái API này. Phần kết quả chúng ta cần get là từ query>pages. Tuy nhiên điều rất dở là sau đó là 1 ngoặc `{` chứ không phải `[`. Đây sẽ là chỗ chúng ta phải đổi sang mảng.
# Viết code
Mình sẽ chia ra làm 3 component: searchform, list kết quả và kết quả đơn

Với kết quả đơn, đây là phần code
```javascript
import React from 'react';

class SingleResult extends React.Component {
    render() {
        var url = 'https://en.wikipedia.org/?curid=' + this.props.pageid
        return (
            <li>
                <a href={url} target='blank'>{this.props.title}</a>
                <p>{this.props.extract}</p>
            </li>
        )
    }
}

export default SingleResult;
```
Chúng ta chỉ cần lấy `pageid`, `title` và `extract` từ API trên. 
Còn ở phần App.js chúng ta sẽ lấy API như sau:
```javascript
    const APIurl= 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch='+searchTerm;
    axios.get(APIurl)
      .then(response=>{
        const results = response.data.query.pages;  
        this.setState({ results });
      })
      .catch(err => console.log(err));
```
Và khi lấy API như thế này, danh sách kết quả mong đợi sẽ được viết như sau:
```javascript
import React from 'react';
import SingleResult from './single-result';

class ResultList extends React.Component {
    render() {
        var results = this.props.results
        
        var show_results = results.map((result, index) => {
            return (
                <SingleResult key={index} pageid={result.pageid} title={result.title} extract={result.extract}/>
            );
        });

    return (<ul className="out-result">{show_results}</ul>);
    }
}

export default ResultList;
```
Tuy nhiên nếu bạn viết theo cách này sẽ báo lỗi, vì `map()` hay `forEach()` là 2 method dùng được ở đây nhưng chỉ khi results của bạn là cái mảng. Đó là lý do tại sao chúng ta dùng tới `Object.keys()`
```javascript
var results = Object.keys(this.props.results).map((key) => this.props.results[key]).sort((a, b) => a.index - b.index)
```
Lúc này tại App.js, render của bạn sẽ là:
```javascript
  render(){
    return(
        <div>
            <SearchForm />
            <ResultList results={this.state.results}/>
        </div>
    );
  }
```
Chúng ta sẽ tiến tới searchform:
```javascript
import React from 'react';

class SearchForm extends React.Component {

    constructor() {
        super();
        this.state = {
          searchTerm: ''
        };
    }
  
    handleInputChange(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }
  
    handleSubmit(event) {
        event.preventDefault();
        let searchTerm = this.state.searchTerm.trim(); // Remove whitespace at the beginning and end.
  
        if (!searchTerm) { // If no search term was typed, return early and do nothing.
            return;
        }
  
        this.props.onSearch(searchTerm); // Execute callback
        this.setState({ searchTerm: '' });
    }
  
    render() {
        return (
            <div className="form-group">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input id="searchTerm" className="input-sm" type="text" placeholder="Search for something..." onChange={this.handleInputChange.bind(this)} value={this.state.searchTerm}/>
                </form>
                <button id="search" type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}><span className="fa fa-search"></span></button>
            </div>
        );
    }
}

export default SearchForm;
```
Và đơn giản còn lại là App.js hoàn thiện:
```javascript
import React, { Component } from 'react';
import './App.css';
import ResultList from './result-list';
import SearchForm from './search-form';
import axios from 'axios';
 
class App extends Component {    
  constructor() {
    super();
    this.state = {
        results: []
    };
  }

  handleSearch(searchTerm) {
    const APIurl= 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch='+searchTerm;
    axios.get(APIurl)
      .then(response=>{
        const results = response.data.query.pages;  
        this.setState({ results });
      })
      .catch(err => console.log(err));
  }

  render(){
    return(
        <div>
            <SearchForm onSearch={this.handleSearch.bind(this)}/>
            <ResultList results={this.state.results}/>
        </div>
    );
  }
}

export default App;
```
# Tổng kết
Những điều rút ra từ bài tập trên:
- Phân tích các thành phần thành các component để code
- Xử lý 1 API
- Bước đầu làm quen với React với những bạn mới học
Còn với mình là việc cập nhật API cho 1 project cũ. Mình đã chuyển từ opensearch sang query và quả thật mỗi cái có 1 cách xuất response riêng. Nếu như ở opensearch là các mảng khá là dễ xử lý và độ hoàn thiện chưa cao thì phần query lại cho 1 response độ hoàn thiện cao hơn, nhưng rất dở ở chỗ phần pages nên là 1 mảng để có thể xử lý thông thường

Đây là nhánh git của phần code trong bài này: https://github.com/BlazingRockStorm/Wikipe-tan2/tree/update

Các bạn có thể lấy về để chạy thử, rồi chuyển nhánh master để thấy rõ opensearch và query response khác nhau như thế nào

Cảm ơn các bạn đã đọc bài
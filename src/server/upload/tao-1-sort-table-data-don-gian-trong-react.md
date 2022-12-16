# Sort Table data với React
Thông thường, khi bạn làm việc với một bảng thông tin, bạn sẽ muốn sort thông tin trong bảng theo thứ tự tăng dần hoặc giảm dần, đặc biệt là khi giải quyết những con số.
Trong bài hướng dẫn này, chúng ta sẽ đi tìm hiểu làm thể nào để thực hiện việc đó một cách chính xác bằng việc dùng ReactJS.
Dưới đây là những gì chúng ta sẽ làm:

Chúng ta có danh sách 10 tỷ phú trên thế giới và chúng ta muốn sort danh sách này dựa trên giá trị tài sản của các tỷ phú. Tôi đã có danh sách thông tin được lấy từ website [theweek.co.uk](https://www.theweek.co.uk/people/57553/top-billionaires-who-richest-person-world)

##Điều kiện tiên quyết

Trước khi bắt đầu, hãy xem những gì chúng ta sẽ sử dụng trong bài hướng dẫn này:

1. [FontAwesome](https://fontawesome.com/)- dùng để lấy icons
2. [Foundation](https://foundation.zurb.com/)- dùng để tạo style mặc định. và như vậy chúng ta sẽ không tốn thời gian style cho bảng, từ đó có thể tập chung vào vấn để chính của bài viết này.
3. [ReactJS](https://reactjs.org/)- hãy chú ý rằng tôi sẽ không giải thích những kiến thức cơ bản của React trong bài giảng này. Chúng ta sẽ tiếp tục bằng việc giả định các bạn đã từng sử dụng React trước đó ( mặc dù không phải việc gì chúng ta làm trong bài viết này cũng đều khó).
4. Dữ liêu - như đã đề cập ở trên, chúng ta sẽ dùng danh sách top 10 tỷ phú thế giới cùng giá trị tài sản của họ.

##Dữ liệu

Chúng ta sẽ tạo một dãy với object là tên các nhà tỷ phú và giá trị tài sản của họ trên đơn vị tỷ USD:
```Javascript
const tableData = [
    {
        name: 'Amancio Ortega',
        net_worth: 62.7
    },
    {
        name: 'Bernard Arnault',
        net_worth: 76
    },
    {
        name: 'Bill Gates',
        net_worth: 96.5
    },
    {
        name: 'Carlos Sim Helu',
        net_worth: 64
    },
    {
        name: 'Jeff Bezos',
        net_worth: 131
    },
    {
        name: 'Larry Ellison',
        net_worth: 58
    },
    {
        name: 'Larry Page',
        net_worth: 50.8
    },
    {
        name: 'Mark Zuckerberg',
        net_worth: 62.3
    },
    {
        name: 'Michael Bloomberg',
        net_worth: 55.5
    },
    {
        name: 'Warren Buffet',
        net_worth: 82.5
    }
];

```
## App Component

Component này sẽ là thành phần chính được hiển thị trên trang. Nó chỉ chứa một vài text + **<Table/>** component và nó chuyển xuống **tableData** mà chúng ta đã khai báo ở trên cho **<Table/>** component.

```Javascript
const App = () => (
    <div className='text-center'>
        <h4>A list of top 10 richest billionaires.</h4>
        <p>
            Click on the icon next to "Net Worth" to see the sorting functionality
        </p>

        <Table data={tableData} />

        <small>
            * Data gathered from{' '}
            <a
                href='https://www.theweek.co.uk/people/57553/top-billionaires-who-richest-person-world'
                target='_blank'>
                theweek.co.uk
            </a>
        </small>
    </div>
);

ReactDOM.render(<App />, document.getElementById('app'));

```

## Table component

Nó sẽ là một class component khi chúng ta cần sử dụng state trong nó, tuy nhiên trước tiên chúng ta hãy tập trung vào phương thức **render**. Chúng ta sẽ **map** trên **data** đến từ parent component và chúng ta sẽ tạo một hàng (**tr**) cho từng dữ liệu trong array. Bên cạnh đó, chúng ta cũng sẽ có một cấu trúc bảng đơn giản  (**table> thead+ tbody**).

```Javascript
class Table extends React.Component {
    render() {
        const { data } = this.props;

        return (
            data.length > 0 && (
                <table className='text-left'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Net Worth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(p => (
                            <tr>
                                <td>{p.name}</td>
                                <td>${p.net_worth}b</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        );
    }
}

```

Tiếp theo, sorting...

Chúng ta sẽ có 3 dạng sort: **'default'**,**'up'**(tăng dần),**'down'**. Những dạng này sẽ được thay đổi với sự trợ giúp của button có icon FontAwesome phụ thuộc vào sort type đang active. Hãy tạo một object mà nó sẽ cho chúng ta thông tin cần thiết:

```Javascript
const sortTypes = {
    up: {
        class: 'sort-up',
        fn: (a, b) => a.net_worth - b.net_worth
    },
    down: {
        class: 'sort-down',
        fn: (a, b) => b.net_worth - a.net_worth
    },
    default: {
        class: 'sort',
        fn: (a, b) => a
    }
};
```

Như bạn có thế thấy, chúng ta có 2 prop cho từng dạng sort:

1. **class** - cái này sẽ được sử dụng cho hiển thị icon tương ứng trong buttom như chúng ta sẽ thấy tương ứng với state đang active.
2. **fn** - dạng này sẽ là **funtion** mà chúng ta sẽ sủ dụng để sort các item trong array trước bạn hiển thị nó trong table. Về cơ bản, chúng ta đang so sánh **net_worth** property của các đối tượng.

Giờ chúng ta sẽ cần add **currentSort** state vào **Table** component cái này sẽ giữ trang thái sort hiện tại. Chúng ta cũng sẽ có **onSortChange** method và sẽ gọi cái này mỗi lần click vào button và nó sẽ change **currentSort**.

Và đây sẽ là thành quả của chúng ta :D

```Javascript
class Table extends React.Component {
	// declaring the default state
	state = {
		currentSort: 'default'
	};

	// method called every time the sort button is clicked
	// it will change the currentSort value to the next one
	onSortChange = () => {
		const { currentSort } = this.state;
		let nextSort;

		if (currentSort === 'down') nextSort = 'up';
		else if (currentSort === 'up') nextSort = 'default';
		else if (currentSort === 'default') nextSort = 'down';

		this.setState({
			currentSort: nextSort
		});
	};

	render() {
		const { data } = this.props;
		const { currentSort } = this.state;

		return (
			data.length > 0 && (
				<table className='text-left'>
					<thead>
						<tr>
							<th>Name</th>
							<th>
								Net Worth
								<button onClick={this.onSortChange}>
									<i className={`fas fa-${sortTypes[currentSort].class}`} />
								</button>
							</th>
						</tr>
					</thead>
					<tbody>
						{[...data].sort(sortTypes[currentSort].fn).map(p => (
							<tr>
								<td>{p.name}</td>
								<td>${p.net_worth}b</td>
							</tr>
						))}
					</tbody>
				</table>
			)
		);
	}
}
```

Chú ý rằng chúng ta sẽ không thay đổi giá trị gốc của mảng ban đầu **data** bằng cách tạo ra một mảng mới với **...** (spread), và sau đó chúng ta sẽ sử dụng **fn** được lấy ra từ **sortTypes** để hiển thị ra kết quả cuối cùng.

# Tổng kết

Hi vong bài viết sẽ giúp được gì đó cho các bạn!
Cảm ơn đã đọc đến đây vào tạm biệt các bạn!

[Bài tham khảo](https://www.freecodecamp.org/news/sort-table-data-with-react/?fbclid=IwAR2D0Krs5arqIK9nUoPr-FEqDIHqGYx1-eGDIV8KximLyIlhuxJE76TjP7A)
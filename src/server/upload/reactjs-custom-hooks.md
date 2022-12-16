ReactJS cung cấp rất nhiều cho bạn các hook mà bạn có thể sử dụng hằng ngày vào project của mình. Nhưng bên cạnh đó bạn có thể tự tạo ra các hook của riêng bạn để sử dụng, làm cho việc tối ưu hóa code tốt hơn rất nhiều. Các custom hook đó thực chất là các function của js bắt đầu bằng từ khóa `use` và chúng có thể gọi đến các hook khác (tích hợp sẵn hoặc là custom).

**Sự cần thiết của Custom Hooks**: lí do chính để bạn nên sử dụng custom hook là khái niệm DRY (không lặp lại) ở trong project react của bạn. Ví dụ: bạn có 1 logic sử dụng các hook sẵn có và bạn cần sử dụng logic đó trong 1 số chức năng. Vì vậy sẽ có 2 cách để bạn lựa chọn 
- Viết logic trong mỗi component (vi phạm khái niệm DRY code)
- Tạo ra 1 function riêng biệt bao bọc logic của bạn ở trong đó và sau đó import và gọi nó trong các component cần sử dụng

Cách thứ 2 chắc chắn sẽ là cách chọn tốt hơn cho bạn vì bạn chỉ viết logic có 1 lần. Ở đây, function mà bạn đã viết ra gọi là custom hook. Vì vậy, bất cứ khi nào bạn cần 1 logic sử dụng ở trong nhiều component thì bạn hãy nghĩ đến việc custom hook.

**Tạo 1 custom hook**: tạo custom hook cũng giống như việc bạn viết 1 function javascript và có tên bắt đầu bằng `use`. Nó có thể sử dụng các hook khác bên trong nó, trả về bất cứ thứ gì bạn muốn trả về, lấy bất cứ thứ gì làm tham số. Hàm `useCustomHook` trong ví dụ dưới đây sẽ là 1 custom hook sử dụng state `counter`. Hàm `resetCounter` tăng giá trị của bộ đếm lên 1 và bất cứ khi nào giá trị của counter được update, function này sẽ gọi useEffect hook sẵn có. Hàm được thực thi 1 số mã (bị loại bỏ để tập trung sử dụng custom hook thay vì triển khai 1 logic) sẽ được sử dụng nhiều ở trong các component. Custom hook này trả về hàm `resetCounter`.

**Filename- src/useCustomHook.js:**

```
import {useState , useEffect} from "react";

// Remember to start the name of your custom hook with "use"
function useCustomHook(initializer , componentName){
	const [counter , setCounter] = useState(initializer);
	
	// Increases the value of counter by 1
	function resetCounter(){
		setCounter(counter + 1);
	}
	

	useEffect(() => {
		// Some logic that will be used in multiple components
		console.log("The button of the "
		+ componentName + " is clicked "
		+ counter + " times.");
	} , [counter , componentName]);
	
	// Calls the useEffect hook if the counter updates
	return resetCounter;
}

export default useCustomHook;
```

Sử dụng custom hook trong component: để sử dụng hook ở trong các component chỉ cần import useCustomHook từ tệp useCustomHook.js trong thư mục `src`

**Filename- src/components/FirstComponent.js:**

```
import React from "react";

// importing the custom hook
import useCustomHook from "../useCustomHook";

function FirstComponent(props){

	// ClickedButton = resetCounter;
	const clickedButton = useCustomHook(0 , "FirstComponent");
	
	return (
		<div>
			<h1> This is the First Component</h1>
			<button onClick={clickedButton}>
				Click here!
			</button>
		</div>
	);
}

export default FirstComponent;
```

**Filename : src/components/SecondComponent.js:**

```
import React from "react";

// Importing the custom hook
import useCustomHook from "../useCustomHook";

function SecondComponent(props){

	// ClickedButton = resetCounter;
	const clickedButton = useCustomHook(0 , "SecondComponent");
	
	return (
		<div>
			<h1> This is the Second Component</h1>
			<button onClick={clickedButton}>
			Click here!
			</button>
		</div>
	);
}

export default SecondComponent;
```

**Filename: src/App.js:**

```
import React from 'react';
import './App.css';
import FirstComponent from './components/FirstComponent';
import SecondComponent from './components/SecondComponent';

function App(){
	return(
		<div className='App'>
		<FirstComponent />
		<SecondComponent />
		</div>
	);
}
	
export default App;
```

![](https://images.viblo.asia/9d7e8979-16a4-4a2d-81b4-19240599cb41.png)

Nếu bạn mở console ở trình duyệt, bạn sẽ thấy:

![](https://images.viblo.asia/5026c352-0717-4c24-96d5-417c898f7f06.png)

Nếu bạn click vào button thứ 2, nó sẽ xảy ra điều tương tự như ở trên, hãy kiểm tra cẩn thận ở trong console nhé

![](https://images.viblo.asia/fd2e0bf7-ce04-4391-967b-ecb64cbc7561.png)

Hãy lưu ý rằng cả 2 bộ đếm ( được định nghĩa trong custom hook) của 2 component là khác nhau. Hai component sử dụng 2 state khác nhau, chúng không chia sẻ state. Do đó ở trên, mỗi component sẽ có biến `counter` riêng. Tương tự, mỗi component sẽ có useEffect riêng và chúng được thực thi độc lập với nhau. Nếu `counter` của FirstComponent được cập nhật, useEffect của FirstComponent sẽ được gọi , và không ảnh hưởng gì đến `counter` của SecondComponent.

Trong `src/components/FirstComponent.js`, code tương tự như ở dưới đây:

```
import React , {useState ,useEffect} from "react";

function FirstComponent(props){
	
	const [counter , setCounter] = useState(initializer);
	
	// Increases the value of counter by 1
	function resetCounter(){
		setCounter(counter + 1):
	}
	
	useEffect(() => {
		// Some logic
		console.log(counter);
	} , [counter]);
	
	const clickedButton = resetCounter;
	
	return (
		<div>
			<h1> This is the First Component</h1>
			<button onClick={clickedButton}>
			Click here!
			</button>
		</div>
	);
}

export default FirstComponent;
```

**Note:** điều quan trọng là phải đặt tên cho custom hook của bạn bắt đầu bằng từ khóa `use`, bởi vì nếu không có nó thì React không thể nhận ra đó là custom hook và không thể áp dụng các quy tắc React cho nó. 

Bài viết được dịch tại: https://www.geeksforgeeks.org/reactjs-custom-hooks/ 

Cảm ơn các bạn đã đọc bài viết của mình :D
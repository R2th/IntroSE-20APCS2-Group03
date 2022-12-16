React .14 giới thiệu cho chúng ta cách đơn giản hơn là functional components và React .16 đã giúp Hooks phát triển mạnh mẽ hơn.

Để bắt đầu, chúng ta cần hiểu functional components là gì? 

# 1.Stateless Functional Component
Là một chức năng javascript đơn giản. Sự khác biệt lớn đối với class component là state và vòng  đời.

Class component 
```
class MyClassComponent extends Component{
   render(){
      return <Text>Hello {this.props.name}</Text>
   }
}
```

Functional component 
```
const MyFunctionalComponent = name => <Text>Hello {name}</Text>
```

Thoạt nhìn, mình thấy nó dễ đọc và ngắn gọn hơn nhiều. Nó giúp bạn làm việc tốt hơn vì phải suy nghĩ tới việc xây dựng các component. Bên cạnh đó, nó có ý nghĩa hơn về hiệu suất.
Nhưng nếu bạn muốn dùng tính năng state của react ? 


> [Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks don’t work inside classes — they let you use React without classes.](https://reactjs.org/docs/hooks-overview.html#but-what-is-a-hook)

Tổng kết lại, đó là cách sử dụng tính năng state trong functional component.

# 2. useState
Đây là cách sử dụng state trong functional component. Bạn có thể khởi tạo ngắn gọn và sử dụng như: 

Bạn khởi tạo ban đầu là 1 mảng giá trị với trong đó phần tử đầu tiên là trạng thái hiện tại và phần tử thức 2 là hàm cập nhật nó.

```
import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
 
export const MyFunctionalComponent = () => {
 const [counter, setCounter] = useState(0)
const handleIncreaseCounterPress = () => {
 setCounter(counter + 1)
}
return (
 <View>
  <Text>Counter is {counter}.</Text>
  <Button onPress={handleIncreaseCounterPress} title='Increase       Counter'/>
 </View>
 )
}
```
Bạn set giá trị mặc định của counter là 0 và mỗi lần onPress thì sẽ tăng biến đếm counter lên.

# 3. useEffect
Một hooks quan trọng khác là useEffect. Bạn truyền vào một hàm cho nó và sẽ chạy sau khi gọi render. Bạn có thể nghĩ nó như là componentDidMount, componentDidUpdate, and componentWillUnmoun kết hợp lại. Hãy xem thử ví dụ: 
```
import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
 
export const MyFunctionalComponent = () => {
 const [counter, setCounter] = useState(0)
useEffect(() => {
 setCounter(2)
})
return (
 <View>
  <Text>Counter is {counter}.</Text>
 </View>
 )
}
```
Đầu tiên ta sẽ cài bộ đếm setCounter trong useEffect. Nó sẽ chạy setCounter(2) khi update component ( nó hoạt động như componentDidUpdate nhỉ?). Nhưng nếu ta muốn nó chỉ chạy một lần sau đó thì return 1 khi component -will- unmount
```
import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
 
export const MyFunctionalComponent = () => {
 const [counter, setCounter] = useState(0)
useEffect(() => {
 setCounter(2)
 return () => setCounter(1)
}, [])
return (
 <View>
  <Text>Counter is {counter}.</Text>
 </View>
 )
}
```
Ta chuyển mảng [] cho đối số thứ 2 trong userEffect để được hoạt động như componentDidMount và sẽ trả về một hàm chỉ được gọi khi unmount(componentWillUnmount). Và ta có thể callback lại khi có bất kì giá trị nào trong mảng thay đổi như: 
```
import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
 
export const MyFunctionalComponent = () => {
 const [counter, setCounter] = useState(0)
useEffect(() => {
 console.log('Counter has changed!')
 return () => setCounter(0)
}, [counter])
const handleIncreaseCounterPress = () => {
 setCounter(counter + 1)
}
return (
 <View>
  <Text>Counter is {counter}.</Text>
  <Button onPress={handleIncreaseCounterPress} title='Increase       Counter'/>
 </View>
 )
}
```
Vậy là userEffect sẽ được gọi khi có giá trị counter thay đổi.

# 4. Kết
Có rất nhiều loại hooks để thực hiện các action trong functional component dựa trên class component, chính mình cũng thấy cách viết hooks này giản lược được rất nhiều code, nhìn cũng rất clear, đáng để học :D.
Trên đây là hai loại phổ biến hay dùng, có rất nhiều loại, bạn có thể tham khảo thêm [ở đây.](https://reactjs.org/docs/hooks-intro.html)
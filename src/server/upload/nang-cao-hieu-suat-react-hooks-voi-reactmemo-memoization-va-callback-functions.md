# 1.Ngăn Re-render và React.memo
`React.memo` là một chức năng cho phép tối ưu hóa cách các component được render và được sử dụng trong functional component.

Đặc biệt, nó thực hiện một quá trình được gọi là `memoization` giúp ngăn các component re-render khi chúng không cần làm như vậy (phần này sẽ được định nghĩa chi tiết hơn ở mục useMemo)

React.memo giúp ích nhiều nhất trong việc ngăn list các component được re-render khi các parent-component của chúng re-render.

React.memo() là một HOC (Higher-Order Components), chứ ko phải hooks. Cơ chế hoạt động giống như một Pure Component (được sử dụng nhiều với Class Component). 

React.memo() sẽ chỉ render lại component nếu props thay đổi và sử dụng pattern `shallow comparison` ( Khi component trở nên phức tạp, có thể dùng dến một pattern khác gọi là shallow comparison sẽ so sánh tất cả các thuộc tính của props và state để quyết định xem component này có cần update hay không)

Ví dụ: 
```javascript
function App() {
  const [skill, setSkill] = React.useState('')
  const [skills, setSkills] = React.useState([
    'HTML', 'CSS', 'JavaScript'
  ])

  function handleChangeInput(event) {
    setSkill(event.target.value);
  }

  function handleAddSkill() {
    setSkills(skills.concat(skill))
  }

  return (
    <>
      <input onChange={handleChangeInput} />
      <button onClick={handleAddSkill}>Add Skill</button>
      <SkillList skills={skills} />
    </>
  );
}

const SkillList = React.memo(({ skills }) => {
  console.log('rerendering');
  return (
    <ul>
    {skills.map((skill, i) => <li key={i}>{skill}</li>)}
    </ul>
  )
})

export default App
```

Trong ví dụ trên, có sử dụng 2 state là 'skill' và 'skills'. Một function hiển thị list kỹ năng là "SkillList" và có thể thêm hoặc xóa skill trong danh sách.

Vấn đề ở đây là mỗi khi nhập đầu vào là 1 skill mới, state sẽ được cập nhập và component SkillList sẽ re-render liên tục và khiến cho hiệu năng bị giảm.

Tuy nhiên, khi bọc component SkillList trong React.memo (là một hàm bậc cao hơn (HOC), có nghĩa là nó chấp nhận một hàm làm đối số), nó sẽ không còn render những view không cần thiết khi parent component re-render.
# 2. Memoization và useMemo
Khi quá trình `Memoization` được thực hiện, nó sẽ tính toán và lưu kết quả cho từng bộ input và khi gặp lại bộ input đã từng thực hiện thì nó sẽ không tính toán nữa mà trả về kết quả có sẵn luôn.

```useMemo``` rất giống ```useCallback``` và là để cải thiện hiệu suất. Nhưng thay vì dùng để gọi lại, useMemo để lưu trữ kết quả của các phép tính tốn kém tài nguyên.

```useMemo``` cho phép chúng ta **memoize** , hoặc ghi nhớ kết quả của phép tính phức tạp khi phép tính đó đã được thực hiện.

`useMemo` trả về một giá trị từ phép tính, sau đó được lưu trữ trong một biến.

`useMemo` tạo ra một memoized value và chỉ tính toán ra value mới khi dependencies thay đổi. Nó nhận vào 2 tham số là function và dependencies. Nó trả về memoized value và chỉ tính toán value mới khi dependencies thay đổi. Nếu dùng empty dependencies thì không bao giờ tính toán lại value mới. 


VÍ dụ: 
```javascript
function App() {
  const [skill, setSkill] = React.useState('')
  const [skills, setSkills] = React.useState([
    'HTML', 'CSS', 'JavaScript', ...thousands more items
  ])

  function handleChangeInput(event) {
    setSkill(event.target.value);
  }

  function handleAddSkill() {
    setSkills(skills.concat(skill))
  }

  const handleRemoveSkill = React.useCallback((skill) => {
    setSkills(skills.filter(s => s !== skill))
  }, [skills])
   
  return (
    <>
      <SearchSkills skills={skills} />
      <input onChange={handleChangeInput} />
      <button onClick={handleAddSkill}>Add Skill</button>
      <SkillList skills={skills} handleRemoveSkill={handleRemoveSkill} />
    </>
  );
}

function SearchSkills() {
  const [searchTerm, setSearchTerm] = React.useState('');  
      
  const searchResults = React.useMemo(() => {
    return skills.filter((s) => s.includes(searchTerm);
  }), [searchTerm]);
    
  function handleSearchInput(event) {
    setSearchTerm(event.target.value);
  }
    
  return (
    <>
    <input onChange={handleSearchInput} />
    <ul>
      {searchResults.map((result, i) => <li key={i}>{result}</li>
    </ul>
    </>
  );
}


export default App
```

Lấy từ ví dụ ở mục React.memo() bên trên, ta thêm vào function SearchSkills để check hiệu năng khi sử dụng `useMemo`

Chẳng hạn, đối với ví dụ trên sẽ có hàng nghìn skill mà chúng ta có thể tìm kiếm. Vậy làm cách nào để tìm và hiển thị một cách hiệu quả các kỹ năng phù hợp với cụm từ tìm kiếm khi người dùng nhập vào đầu vào?

Sử dụng React.useMemo để **memoize** (remember) giá trị trả về từ action tìm kiếm và chỉ chạy khi nó thay đổi searchTerm (state)

# 3.Callback functions và useCallback
`useCallback` là một hook được sử dụng để cải thiện hiệu suất component. Callback functions là tên của các hàm được "callback" trong một parent component.

`useCallback` giúp tạo ra một memoized callback và chỉ tạo ra callback mới khi dependencies thay đổi. Nó nhận vào 2 tham số là "function" và "dependencies". Nó trả về là memoized callback

`useCallback` chỉ tạo ra function mới khi dependencies thay đổi. Nếu dùng empty dependencies thì không bao giờ tạo ra function mới.

useCallback là chức năng theo cách tương tự như React.memo hoạt động. Nó memoize các function callback, vì vậy nó không được tạo lại trên mỗi lần render.

Ví dụ: 
```javascript
function SearchSkill() { 
   const handleSearchTerm = (type) => {} 
   return <FormMik onChange={handleSearchTerm} />; 
} 
 ```
 Mỗi lần SearchSkill re-render sẽ tạo ra một function mới và FormMik bị re-render 
 
 ```javascript
function SearchSkill() { 
     const handleSearchTerm = useCallback((type) => {}, [])  
     return <FormMik onChange={handleSearchTerm} />; }
```
Mỗi lần SearchSkill re-render do có useCallback() nó chỉ tạo function một lần đầu và FormMik không bị re-render.

# 4. Tổng kết
- React.memo() là một HOC, chứ ko phải hooks.
- Memoization chính là trả về kết quả đã từng thực hiện mà không cần phải đi tính toán lại. Tiết kiệm tài nguyên, thời gian cho các xử lý tính toán nặng.
- useCallback và useMemo là 2 phương pháp áp dụng kỹ thuật memoization rất nên được sử dụng trong react hook. Tuy nhiên nên áp dụng cho các phần render là đồ thị, biểu đồ, animation hoặc các component nặng về render như re-render kết quả trang khi search.


**Cảm ơn các bạn đã theo dõi bài viết đến đây. Xin chào và hẹn gặp lại!!!**

**Link tham khảo:** https://www.freecodecamp.org/news/react-cheatsheet-with-real-world-examples/
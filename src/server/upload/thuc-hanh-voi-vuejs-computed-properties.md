# Sự cần thiết của Computed Properties
* Trong property  data của đối tượng Vue chúng ta có một message, một array, hay một object... và đôi khi chúng ta muốn biến hóa chúng một chút, tính toán với chúng trước khi hiển thị chúng trên trang. Chẳng hạn như, chúng ta muốn
đảo ngược thuộc tính message trong data và hiển thị nó lên.
* Sử dụng các biểu thức logic ở ngay trong template là rất thuận tiện. Như thế này:
    ```js
    <div id="example">
     {{ message.split('').reverse().join('') }}
    </div>

    ```



    Tuy nhiên việc sử dụng logic trong template sẽ khiến template cồng kềnh và khó bảo trì, đặc biệt sẽ có vấn đề khi bạn phải sử dụng nó nhiều lần trong template.
* Khi ấy, chúng ta sẽ sử dụng computed properties, viết một hàm trả về message đảo ngược  và khi cần chỉ cần render chúng ra
    ```html
    <div id="root">
        <p>
            {{ reverseMessage }}
        </p>
    </div>
    ```
    ```js
    var app = new Vue({
        el: '#root',
        data:{
            message: "Hello"
        },
        computed: {
            reverseMessage(){
                return this.message.split('').reverse().join('');
            }
        }
    })
    ```




* Ở bên trên mình chỉ nêu qua tại sao phải sử dụng computed properties, các bạn muốn hiểu sâu hơn về properties và sự khác nhau giữa properties và methods, các bạn hãy ghé qua 
https://vuejs.org/v2/guide/computed.html

    Sau đây chúng mình cùng đi đến những ví dụ thực hành với computed properties nhé :)
# Ví dụ thực hành với Computed Properties
* Trong property data của đối tượng Vue ta có một collection tasks chứa các task. Mỗi task bao gồm các trường là description và completed xác định trạng thái đã hoàn thành hay chưa.
    ```js
    <script>
		var app = new Vue({
			el: '#root',
			data:{
				tasks: [
					{ description: "Eating", completed: true },
					{ description: "Sleeping", completed: true },
					{ description: "Playing", completed: false },
					{ description: "Learning", completed: false },
				],
			},
		})
	</script>
    ```
* Phần HTML, ta hiển thị danh sách các task, dùng thẻ <ul> , <li> . Để hiển thị danh sách các phần tử của mảng trong data ta dùng direction gì của Vue nhỉ :) chúng ta sẽ dùng direction v-for :), bạn cũng có thể sử dụng direction v-text để chỉ định text content, tương tự như sử dụng nội suy {{ }}
    ```html
    <div id="root">
        <h1>All tasks</h1>
        <ul>
            <li v-for = 'task in tasks' v-text = 'task.description'></li>
        </ul>
    </div>
    ```
* Kết quả tạm thời sẽ thế này
   ![](https://images.viblo.asia/d3bcb07d-6cab-485c-884e-40b97a2829e7.png)
    


* Bây giờ bạn muốn hiển thị chỉ những task mà chưa được hoàn thành (completed = false)

    Đơn giản đúng không nào, bạn có thể sử dụng directive v-if trong template
    ```html
    <div id="root">
        <h1>All tasks</h1>
        <ul>
            <li v-for = 'task in tasks'  v-if = "task.completed" v-text = 'task.description'></li>
        </ul>
    </div>
    ```
    



*   Tuy nhiên như vậy trông có vẻ rất lộn xộn đặc biệt khi logic if else phức tạp, không thực sự được rõ ràng cho lắm...Và thay vì như vậy, chúng ta sẽ sử dụng computed properties. Làm như này thì sẽ rõ ràng hơn
    ```html
    <div id="root">
        <h1>All tasks</h1>
        <ul>
            <li v-for = 'task in tasks' v-text = 'task.description'></li>
        </ul>

        <h1>Completed tasks</h1>
        <ul>
            <li v-for = 'task in completedTask' v-text = 'task.description'></li>
        </ul>
    </div>
    ```

* Bây giờ khi refresh trang thì kết quả sẽ lỗi đó
    ![](https://images.viblo.asia/2f383db5-53c1-4bd8-a582-c8dc542d2e45.png)

    Đơn giản vì mình chưa khai báo computed property incompleteTasks mà :)

    ```js
    <script>
        var app = new Vue({
            el: '#root',
            data:{
                tasks: [
                    { description: "Eating", completed: true },
                    { description: "Sleeping", completed: true },
                    { description: "Playing", completed: false },
                    { description: "Learning", completed: false },
                ],
            },
            computed: {
                completedTask(){
                    return this.tasks.filter(task => task.completed);
                },
            }
        })
    </script>
    ```
    Và refesh trang chúng ta được kết qủa :)))

    ![](https://images.viblo.asia/69cd1d2e-7da3-45ec-8786-3fd79f043f48.png)
* F12 mở console và thay đổi data của đối tượng Vue, chúng ta sẽ xem kết quả trên trang "react" thế nào nhé :)

 ![](https://images.viblo.asia/d66d4d99-f931-4c2f-80ee-f923e4cfcb3d.png)
# Ví dụ cải tiến
* Bây giờ cải tiến ví dụ bên trên một chút nhé :))
* Giả sự bạn muốn có một danh sách các task chưa được hoàn thành và một danh sách các task đã được hoàn thành. Sẽ có các ô checkbox ở đầu mỗi task. Khi bạn hoàn thành xong một task, bạn tích vào ô checkbox và nó sẽ được chuyển từ danh sách chưa hoàn thành sang danh sách đã hoàn thành. Khi danh sách chưa hoàn thành trống trơn bạn hiển thị message, chẳng hạn như "Good job, all done! Go out and play :)))", Còn khi danh sách các task đã được hoàn thành chưa có cái nào, các bạn hiển thị kiểu như "Cố lên mầy, chưa làm được cái gì lên hồn kìa :))) "Các bạn thử tự làm trước đã nhé :)))
* Gợi ý, đơn giản lắm, bạn sử dụng v-model cho các input checkbox và sử dụng v-if v-else để xác định khi  nào hiển thị message
    ```
    <v-if="incompleteTasks[0]">
        <hien thi task>
    <v-else>
        <hien thi message>
    ```
*    Đây là code các bạn có thể tham khảo :) 
```html
<div id="root">
    <h2>Incomplete Tasks</h2>
    <ul v-if="incompleteTasks[0]" style="list-style: none;">
        <li v-for="task in incompleteTasks">
            <label>
                <input type="checkbox" v-model="task.isComplete"> {{task.description}}
            </label>
        </li>
    </ul>
    <p v-else class="success"><b>Good job, all done! Go out and play :)))</b></p>

    <h2>Completed Tasks</h2>
    <ul v-if="completeTasks[0]" style="list-style: none;">
        <li v-for="task in completeTasks">
            <label>
                <input type="checkbox" v-model="task.isComplete"> {{task.description}}
            </label>
        </li>
    </ul>
    <p v-else class="warning"><b>Cố lên mầy, chưa làm được cái gì lên hồn kìa :)))</b></p>
</div>
```

```js
<script>
    new Vue({
        el: '#root',

        data: {
            tasks: [{
                description: 'Learning English',
                isComplete: false
            }, {
                description: 'Viet bai Viblo',
                isComplete: false
            }, {
                description: 'Learning Japaness',
                isComplete: false
            }, {
                description: 'Clean house',
                isComplete: false
            }, {
                description: 'Make dinner',
                isComplete: false
            }, {
                description: 'Do homework',
                isComplete: false
            }]
        },

        computed: {
            incompleteTasks() {
                    return this.tasks.filter(task => !task.isComplete)
            },
            completeTasks() {
                return this.tasks.filter(task => task.isComplete)
            }
        }
    })
</script>
```

```css
* {
    box-sizing: border-box;
}

body {
    background: #f5f5f5;
    font-family: Roboto, Arial, sans-serif;
    font-size: 14px;
}

div {
    max-width: 400px;
    margin: 48px auto;
    padding: 30px;
    background: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .14);
}

ul {
    list-style: none;
    padding-left: 0;
}

label {
    display: inline-block;
    cursor: pointer;
    margin-bottom: 8px;
}

.success {
    color: green;
}

.warning {
    color: red;
}
```
   
* Kết quả:
![](https://images.viblo.asia/a2dd7565-01b4-4b6a-a357-fbc482ae44dd.png)


* Bài viết mình tham khảo tại https://laracasts.com/series/learn-vue-2-step-by-step/episodes/6, Mong bài viết sẽ có ích đối với bạn :)
# Lời mở đầu:
Ở [bài viết trước](https://viblo.asia/p/tim-hieu-vue-instance-va-vue-template-jvEla47dZkw), mình đã giới thiệu với các bạn về Vue Instance và Vue template, mong rằng các bạn đã kịp làm - quen với việc khởi tạo một Vue Instance cũng như sử dụng các Directives trong Template. 

Tiếp tục với Vue Instance, hôm nay chúng ta sẽ tìm hiểu thêm về "**computed property**" và "**watch**" bên cạnh "**methods**" đã được giới thiệu trong bài viết trước.
# Nội dung:
## Computed Properties:
### Định nghĩa:
Nếu dịch ra tiếng Việt thì **Computed Property** có nghĩa là 'thuộc tính được tính toán' ra. Tức là thuộc tính này được sinh ra sau khi qua một function xử lí. Bình thường với các phép tính toán đơn giản, ta có thể viết trực tiếp trong template bằng cách đặt trong cú pháp `{{ }}`. Tuy nhiên, khi phép tính toán trở nên phức tạp hơn, thì việc viết trong template sẽ rất cồng kềnh, gây khó khăn cho việc phát triển, bảo trì. 

Vì thế, đối với bất kì logic nào phức tạm thì bạn nên sử dụng **computed property**.
### Cách sử dụng:
Cách khai báo **computed property**:
```javascript
<script>
export default {
    name: 'test',
    data () {
        return {
            message: 'Welcome to my app'
        }
    },
    computed: {
        //
    }
}
</script>
```

Lấy một ví dụ đơn giản về việc viết xử lí trực tiếp trên template và sử dụng computed property như sau:
```html
    <template>
        <div>
            <p>Thông điệp ban đầu: "{{ message }}"</p>
            <p>Thông điệp bị đảo ngược (template): "{{ message.split('').reverse().join('') }}"</p>
            <p>Thông điệp bị đảo ngược (computed): "{{ reversedMessage }}"</p>
            <p>Thông điệp bị đảo ngược (method): "{{ reversedByMethod }}"</p>
        </div>
    </template>
    
    <script>
    export default {
        name: 'test',
        data () {
            return {
                message: 'Welcome to my app'
            }
        },
        computed: {
            reversedMessage: function () {
                return this.message.split('').reverse().join('')
            }
        },
        methods: {
            reversedByMethod: function () {
                return this.message.split('').reverse().join('')
            }
        }
    }
    </script>
```
   
Và khi chạy cả 3 cách trên đều sẽ cho ra một kết quả như nhau, đó là đoạn `message` bị đảo ngược lại.
![](https://images.viblo.asia/45cd8e05-1bf1-4902-96df-b1b1be31696b.png)
    
Sẽ có bạn thắc mắc là việc sử dụng methods và computed_property đều phải khai báo trong instance, vậy chúng khác nhau như thế nào và sử dụng ra sao cho hiệu quả. Thực ra thì tuy kết quả giống nhau nhưng cách thức xử lí sẽ khác nhau, vì có cơ chế **computed caching** nhằm nâng cao hiệu năng hơn.

Khi sử dụng **computed property** thì giá trị của nó được lưu lại vào bộ nhớ đệm ([cache](https://vi.wikipedia.org/wiki/Cache_(tin_h%E1%BB%8Dc))), nếu chỉ render lại trang mà thành phần phụ thuộc không thay đổi (ở ví dụ trên là `message`)  thì sẽ lấy luôn giá trị trong bộ nhớ cache chứ không cần tính toán lại. 

Còn sử dụng **methods** thì phải tính toán lại mỗi khi render lại trang (với bất kì thay đổi nào). 

## Watchers:
### Định nghĩa:
Trong framework VueJS, watcher được sử dụng để giám sát sự thay đổi của một đối tượng, và khi đối tượng thay đổi thì watcher sẽ đưa ra các hàm xử lí tương ứng. So với **computed_property** thì **watcher** sẽ xử lí những tình huống phức tạp hơn, ví dụ như:
- Các hoạt động bất đồng bộ khi thay đổi dữ liệu
- Giới hạn việc tính toán và gán trạng thái trung gian cho tới khi có được kết quả cuối cùng. 
- Các thiết lập giá trị ngay lập tức
### Cú pháp:
- Để khai báo, ta sử dụng từ khóa **watch** ở trong instance:
    ```javascript
    <script>
    export default {
        name: 'test',
        data () {
            // dữ liệu 
            }
        },
        watch: {
            // các xử lí khi dữ liệu thay đổi
            }
        }
    }
    </script>
    ```
- Tham số đầu vào:
Watcher có thể chỉ có một tham số đầu vào, đó là giá trị mới nhất của thuộc tính đang được giám sát. Ngoài ra có thể truyền thêm tham số thứ hai, đó là giá trị trước khi có thay đổi của thuộc tính được giám sát.
    ```javascript
    watch: {
        data: function(newValue, oldValue) {
            console.log(newValue);
            console.log(oldValue);
        }
    }
    ```
- Giám sát thuộc tính lồng: thông thường Watcher sẽ giám sát các thuộc tính được khai báo bên trong `data`. Vậy trường hợp các thuộc tính lồng nhau  phức tạp hoặc muốn giám sát cả một đối tượng thì phải dùng cú pháp như thế nào? Mình sẽ giới thiệu ngay bây giờ đây:
    - data:
        ```javascript
        data: {
            person: {
                name: 'Vuong Minh Thai',
                drivingLicense: {
                    id: 'GPLXxxxxxxxxx',
                    issueDate: '20180614
                }
            }
        }
        ```
    - watch: giám sát thuộc tính issueDate:
        ```javascript
        watch: {
            'person.drivingLicense.issueDate': function(newVal, oldVal) {
                alert('Giấy phép được gia hạn từ ' + oldValueang ' + newValue
            }
        }
        ```
     - Trên đây là giám sát một thuộc tính trong một đối tượng, nếu muốn giám sát cả đối tượng (tức là giám sát bất kì thành phần nào của đối tượng bị thay đổi đều kích hoạt hàm), ta sẽ khai báo thêm 1 thuộc tính `deep: true` ở trong watch.
        ```javascript
        watch: {
            'person': {
                handler: function (newVal, oldVal) {
                    console.log('Giám sát đối tượng', ' giá trị mới: ', newValue, ' giá trị cũ:', oldValue)
                },
                deep: true
            }
        }
        ```
- Thêm watcher ở ngoài instance: khi khai báo watcher như ở trên là chúng ta khai báo trong Vue instance. Ngoài ra, Vue cũng cho phép chúng ta thêm/bớt watcher thông qua biến `$watch` 
    ```javascript
    instanceName.$watch( 'đối-tượng-theo-dõi', function(newValue, oldValue){
        // function
    }, { deep: true });
    ```
### So sánh computed, watch và methods:
|  | Computed_property | Methods |Watch|
| -------- | -------- | -------- |-----------|
| Cho phép có tham số     | Không     | Có     | Có |
| Thực hiện khi   | Thành phần phụ thuộc thay đổi    | Bất kì thay đổi nào (re-render)     | Thuộc tính, đối tượng được giám sát bị thay đổi|
| Nên sử dụng khi   | Khi muốn thao tác với dữ liệu trong instance, hạn chế tính toán lại     | Cần đến một hàm thuần túy hoặc cần truyền tham số vào     | Xử lí khi dữ liệu thay đổi nhiều, liên tục (VD dễ thấy nhất là thanh tìm kiếm) |

## List Rendering:
Ở bài trước, trong phần directive mình đã nhắc đến `v-for` với một ví dụ đơn giản: `v-for="nation of nations"`. Trong đó nations là mảng dữ liệu và nation trỏ đến phần tử mảng đang được duyệt. Và trong phần này, mình xin đi sâu hơn vào tìm hiểu `v-for`.
- `v-for` có thể truyền thêm tham số thứ hai **index** để chỉ số thứ tự của phần tử hiện hành ở trong mảng (nhớ là nó bắt đầu từ 0 nhé, không phải 1 đâu)
    ```javascript
    v-for="(nation, index) of items"
    ```
- `v-for` có thể dùng để duyệt qua các thuộc tính của một object, có thể cung cấp thêm tham số `key` của thuộc tính tạo thành cặp `{{ key }} : {{ value }}`
    ```html
    <template>
        <section class="second-section">
            <div class="row">
                <div class="nation" v-for="(value, key, index) of nation" :key="key">
                    <h4>{{ index }}. {{ key }} : {{ value }}</h4>
                </div>
            </div>
        </section>
    </template>

    <script>
    export default {
        name: 'second-section',
        data () {
            return {
                nation: {
                    name: 'Japan',
                    flag: 'http://flags.fmcdn.net/data/flags/w580/jp.png',
                    acreage: 222222
                }
            }
        }
    }
    </script>
    ```
    Kết quả: 
    
    ![](https://images.viblo.asia/0c461cd9-6081-47c7-ad8d-72cb272a80c3.png)
- `v-for` hiển thị kết quả đã được lọc hoặc sắp xếp mà không làm thay đổi mảng đó. Để có thể làm được điều này, bạn sẽ kết hợp với computed property trả về mảng đã được lọc hoặc sắp xếp.
    ```html
    <template>
        <section class="second-section">
            <div class="row">
                <p>Day so:</p>
                <li v-for="n in numbers" :key="n.id"> {{ n }}</li>
                <p>So chan:</p>
                <li v-for="n in evenNumbers" :key="n.id">{{ n }}</li>
                <p>So le:</p>
                <li v-for="n in oddNumbers" :key="n.id">{{ n }}</li>
            </div>
        </section>
    </template>

    <script>
    export default {
        name: 'second-section',
        data () {
            return {
                numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        },

        computed: {
            evenNumbers: function () {
                return this.numbers.filter(function (number) {
                    return number % 2 === 0
                })
            },
            oddNumbers: function () {
                return this.numbers.filter(function (number) {
                    return number % 2 === 1
                })
            }
        }
    }
    </script>
    ```
    Kết quả sau khi lọc:
    
    ![](https://images.viblo.asia/5a6b2373-7373-48cb-84eb-a3bbcb91abff.png)
- `v-for` dùng với một dãy: tương tự như dãy `1, 2, ..., 10` ở trên nhưng ta có thể sử dụng `v-for` thay vì nhập tay, như trong ví dụ này thì sẽ lặp lại 10 lần.
    ```html
    <span v-for="n in 10"> {{ n }} </span>
    ```
- `v-for` dùng với `v-if`: trong VueJS thì `v-for` có độ ưu tiên cao hơn `v-if` khi để trong cùng một thẻ, có nghĩa là ta có thể thực hiện kiểm tra điểu kiện tại mỗi vòng lặp for. Điều này sẽ hữu ích khi bạn chỉ muốn render ra một số phần tử thỏa mãn điều kiện nào đó thay vì render hết tất cả các phần tử.
    ```html
    <li v-for="todo in todos" v-if="!todo.isComplete">{{ todo }}</li>
    ```
    Như trong ví dụ này, thay vì render hết ra các công việc, ta sẽ chỉ render ra những việc đã được hoàn thành.
- `v-for` dùng với **component** (mình sẽ có 1 bài về Vue Component sau nhé :))
# Lời kết:
Trong bài viết này, mình đã giới thiệu cho các bạn 3 nội dung chính, hãy thực hành thật nhiều để có thể làm chủ được chúng nhé:
- Computed properties
- Watcher
- List Render với v-for
 
Hi vọng những nội dung mình đưa ra sẽ giúp ích thật nhiều cho các bạn. Hãy góp ý cho mình thật nhiều để có thể có thêm những bài viết ngày càng chất lượng nhé. Hẹn gặp lại các bạn trong các bài viết tiếp theo.
# Tài liệu tham khảo:
https://vuejs.org/v2/guide/list.html

https://allaravel.com/tutorials/lap-trinh/vuejs-framework/thuoc-tinh-computed-trong-vue-js/
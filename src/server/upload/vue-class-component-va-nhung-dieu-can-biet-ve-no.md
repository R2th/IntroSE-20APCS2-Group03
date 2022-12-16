Hẳn anh em nếu ai đã làm nhiều với vue thì không xa lạ gì với functional component. 
Vậy còn việc xây dựng vue component theo kiểu class component anh em đã làm với nó bao giờ chưa? 
Nó được biết đến là một thư viện cho phép anh em tạo các component theo cú pháp class-style.

Hôm nay mình sẽ giới thiệu chi tiết đến anh em Vue Class Component, đừng bỏ qua nhé!
# 1.  Tổng Quan.
* Đây là một package của Vue cho phép anh em định nghĩa các method một cách đơn giản hơn rất nhiều so với cách sử dụng Vue bình thường. 
* Ta có thể cài đặt nó bằng npm hoăc yarn:

    ``` sh
    npm install --save vue vue-class-component
    ```
    ``` sh
    yarn add --save vue vue-class-component
    ```

* Để sử dụng Vue Class Component, ta cần định cấu hình TypeScript hoặc Babel trong project.

:point_right: Cùng đi vào tìm hiểu sự khác biệt nào ....
# 2. So Sánh.
   ```js
        <template>
              <div>
                     <p> Title: {{title}}</p>
                    <button @click="changeName">Get New Title</button>
                    <button @click="decrement">-</button>
                        {{ count }}
                    <button @click="increment">+</button>
              </div>
        </template>

        <script>
            import Vue from 'vue'
            import Component from 'vue-class-component'

            @Component
            export default class Counter extends Vue {
              count = 0;
              name1 = "Vue";
              name2 = "Class-Component";

              increment() {
                    this.count++
              }

              decrement() {
                    this.count--
              }

              get title() {
                   return `${this.name1} ${this.name2}`
              }

              set title(name) {
                  this.name1 = name.split(' ')[0];
                  this.name2 = name.split(' ')[1];
              }

              changeName() {
                  this.title = 'Vue Functional-Component'
              }
            }
        </script>
   ```

:astonished::astonished: Nhìn code trên mọi người có thấy tò mò vì methods, data... khai báo ở đâu rồi không ?
* Methods được khai báo trực tiếp trong class không còn cần phải thông qua property methods: {}.

    ***Cách triển khai Vue Functional Component.***

    ```js
        methods: {
          increment: function () {
            this.count++;
          },
          decrement: function() {
            this.count--;
          }
        }
    ```
* Các dữ liệu khởi tạo được định nghĩa như một thuộc tính của class không cần phải thông qua property method data().

    ***Cách triển khai Vue Functional Component.***
    ```js
        data() {
            return{
                count: 0;
                name1: "Vue";
                name2: "Class-Component";
            }
        },
    ```
* ```data```, ```render``` và tất cả các hook trong vòng đời Vue cũng có thể được khai báo trực tiếp dưới dạng các phương thức nguyên mẫu của lớp, nhưng anh em không thể gọi chúng trên chính instance. Khi khai báo các phương thức tùy chỉnh, anh em nên tránh các tên dành riêng này.
    ```js
        import Vue from 'vue'
        import Component from 'vue-class-component'

        @Component
        export default class HelloWorld extends Vue {
          // Declare mounted lifecycle hook
          mounted() {
                console.log('mounted')
          }

          // Declare render function
          render() {
                return <div>Hello World!</div>
          }
        }
    ```

* Và cái get với set này là gì ?.
    ```js
          get title() {
              return `${this.name1} ${this.name2}`
          }

          set title(name) {
              this.name1 = name.split(' ')[0];
              this.name2 = name.split(' ')[1];
          }
    ```
    Anh em nếu làm nhiều với Computed thì cũng đã dùng qua Getter và Setter của computed, trong vue-class-component thì get với set cũng làm việc tương tự như vậy.

* À tí nữa mình quên nói về Prop truyền như thế nào trong này...  cách truyền siêu ngầu lòi lun nhé!

    :point_right: Anh em phải cài thêm cái này nhé.
    ```sh
    npm i -S vue-property-decorator
    ```

    Cách triển khai nó thực sự trông rất nguy hiểm...
    ```js
    import { Vue, Component, Prop } from 'vue-property-decorator'

    @Component
    export default class YourComponent extends Vue {
          @Prop(Number) readonly propA: number | undefined
          @Prop({ default: 'default value' }) readonly propB!: string
          @Prop([String, Boolean]) readonly propC: string | boolean | undefined
    }
    ```

    ***Cách triển khai cũ:***

    ```js
    export default {
      props: {
            propA: {
                  type: Number,
            },
        propB: {
              default: 'default value',
        },
        propC: {
              type: [String, Boolean],
        },
      },
    }
    ```

    :point_right: Trông có vẻ cách triển khai của class-component tiết kiệm dòng hơn anh em nhỉ...
* Watch trong vue class component thì sẽ như nào. 
    ```
        @Watch(path: string, options: WatchOptions = {})
    ```
* Watch sẽ có 2 đối số truyền vào, đối số đầu tiên là tên biến cần watch giá trị và đối số thứ 2 là object chứa các option.
     ```js
    import { Vue, Component, Watch } from 'vue-property-decorator'

    @Component
     export default class YourComponent extends Vue {
        @Watch('child')
        onChildChanged(val: string, oldVal: string) {}

        @Watch('person', { immediate: true, deep: true })
        onPersonChanged1(val: Person, oldVal: Person) {}

        @Watch('person')
        onPersonChanged2(val: Person, oldVal: Person) {}
     }
    ```

    ***Cách triển khai cũ trước đây.***
    ```js
    export default {
        watch: {
             child: [
                {
                     handler: 'onChildChanged',
                    immediate: false,
                     deep: false,
                },
            ],
            person: [
                {
                    handler: 'onPersonChanged1',
                    immediate: true,
                     deep: true,
                },
                {
                    handler: 'onPersonChanged2',
                    immediate: false,
                    deep: false,
                },
            ],
        },
        methods: {
            onChildChanged(val, oldVal) {},
            onPersonChanged1(val, oldVal) {},
            onPersonChanged2(val, oldVal) {},
        },
    }
    ```

Và còn nhiều property khác anh em muốn tìm hiểu thì link [đây ](https://github.com/kaorun343/vue-property-decorator) nhé!

# 3. Kết Luận.
Bên trên là các so sánh và những điều cần biết về vue-class-component.

Có thể nhiều anh em đã biết, cũng có thể chưa và đây cũng chỉ là so sánh mà cá nhân mình rút ra từ việc mình tiếp xúc với vue-class-component.

Nếu anh em muốn tìm hiểu nhiều hơn thì link bên dưới nhé.
Cảm ơn anh em đã theo dõi bài viết. :bowing_man: 

https://class-component.vuejs.org/

https://www.digitalocean.com/community/tutorials/vuejs-typescript-class-components
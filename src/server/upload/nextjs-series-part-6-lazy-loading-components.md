Chúng ta sử dụng khá nhiều component trong app. Chúng được nhét vào file bundle chính JavaScript hoặc trong file bundle của riêng mỗi page. Thi thoảng có thể những component khá lớn.
Ví dụ với một blog đơn giản có hỗ trợ highlight syntax. 

Bạn có thể cần đến module react-highlight và nó khá nặng do được build dựa trên highlight.js

Dưới đây là code dùng component này:
```javascript
import Highlight from 'react-highlight'

// some other code

<div>
  <Highlight innerHTML>
    {marked(blogPostMarkdown)}
  </Highlight>
</div>

// some other code
```

Component này có thể được dùng ở tất cả các post có hiển thị code do đó nó được nhét vào file bundle chính của app. Tuy nhiên bạn cũng có thể tưởng tượng rằng không phải bài post nào cũng hiển thị code nên việc load component khi đó là không cần thiết. Vậy có cách nào để ta chỉ load component này chỉ đến khi ta đi đến một post và trong post đó có hiển thị code không?
Câu trả lời ở đây là có. Hãy thử xem Next.js hỗ trợ bạn làm việc đó như thế nào nhé.

### Cài đặt
Đầu tiên bạn cần clone về code sample từ github

```
git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout markdown-blog
``` 

Sau đó chạy app
```
npm install
npm run dev
```

Nếu bạn chạy **npm run analyze**, bạn có thể thấy rằng module highlight.js được gộp trong commons.js.

### Component động
Trong app sample, những post có dùng markdown (hiển thị code) sẽ được render dựa trên một Higher Order Component(HOC). Nó được export từ file "lib/with-post.js".
```javascript
import React from 'react'
import MyLayout from '../components/MyLayout'
import marked from 'marked'
import Highlight from 'react-highlight'

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true
})

export default function WithPost (options) {
  return class PostPage extends React.Component {
    render () {
      return (
        <MyLayout>
          <h1>{options.title}</h1>
          <div>
            <Highlight innerHTML>
              {marked(options.content)}
            </Highlight>
          </div>
        </MyLayout>
      )
    }
  }
}
```

Bây giờ ta sẽ convert component "Hightlight" trong code trên sang dynamic component. Dynamic component được hỗ trợ bởi dynamic import trong Next.js thông qua module "next/dynamic".
Điều quan trọng nhất là khi dùng dynamic component, chúng chỉ được load khi chúng được render trong app.
Để convert ta chỉ cần dùng code dưới đây trong "lib/with-post.js".

```javascript
//import Highlight from 'react-highlight'
import dynamic from 'next/dynamic'

const Highlight = dynamic(import('react-highlight'))
``` 

Quay lại app trên trình duyệt và đi tới page http://localhost:3000/p/hello-nextjs, bạn sẽ thấy react-highlight ở một bundle riêng.

Tuy nhiên ngay cả khi bạn chuyển đến page http://localhost:3000/p/learn-nextjs nơi mà không hiển thị sample code thì bundle này vẫn được load về cùng.

Để tránh điều này ta sẽ đặt điều kiện trong code ở file "lib/with-post.js" như sau
```javascript
export default function WithPost (options) {
  return class PostPage extends React.Component {
    renderMarkdown () {
      // If a code snippet contains in the markdown content
      // then use Highlight component
      if (/~~~/.test(options.content)) {
        return (
          <div>
            <Highlight innerHTML>
              {marked(options.content)}
            </Highlight>
          </div>
        )
      }

      // If not, simply render the generated HTML from markdown
      return (
        <div
          dangerouslySetInnerHTML={{__html: marked(options.content)}}
        />
      )
    }

    render () {
      return (
        <MyLayout>
          <h1>{options.title}</h1>
          { this.renderMarkdown() }
        </MyLayout>
      )
    }
  }
}

```
Bây giờ khi ta đi đến http://localhost:3000/p/learn-nextjs, bundle react-highlight sẽ không được load về nhưng khi chuyển đến trang http://localhost:3000/p/hello-nextjs nó sẽ được load về.
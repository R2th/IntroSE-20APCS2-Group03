Hello hello, xin chào tất cả anh em. Anh em nào đã vào đây thì comment chào nhau một cái cho sum vầy nhé. :wave: :wave: :wave: 

Trong nhiều năm trở lại đây, Vue / React / Angular là những cái tên đã thống trị hệ sinh thái frontend. Các dự án web đều đã sử dụng chúng để xây dựng UI component, ghép nối các component riêng lẻ để tạo thành một trang web với giao diện hoàn chỉnh. Và hầu như bây giờ, Vue, React, Angular đã phổ cập hoàn toàn tại Việt Nam. Đối với frontend developer, sử dụng thành thạo một trong số các thư viện này dường như là điều bắt buộc.

Ngày hôm nay mình sẽ chia sẻ tới mọi người một công cụ ảo ma canada hỗ trợ anh em trong quá trình xây dựng front-end, áp dụng cho các dự án hiện đại - sử dụng Vue / React / Angular. Công cụ này có tên là [Storybook](https://storybook.js.org/). Version hiện tại ở thời điểm bài viết này publish đã là v6.5.

## Storybook là gì?

> Storybook is a frontend workshop for building UI components and pages in **isolation**. Thousands of teams use it for **UI development, testing, and documentation**. It’s open source and free.

Storybook - được giới thiệu là một công cụ giúp phát triển các UI component dưới một môi trường tách biệt hoàn toàn với ứng dụng web chính. Chức năng chủ chốt của Storybook đó là sinh ra một trang tài liệu (documentation) cho toàn bộ các UI Component có trong dự án. Ngoài ra, hỗ trợ nhiều giải pháp cho automation UI testing.

Sau khi cài đặt và chạy storybook lên, bạn sẽ thấy một trang documentation được start ở địa chỉ http://localhost:6006. Trông nó có giao diện như hình dưới đây:

![image.png](https://images.viblo.asia/637690c6-4755-43c8-a222-7f6c1d008085.png)

Bạn sẽ thấy trang documentation có 3 phần chính.
1. Phần đánh số 1 trong hình tương ứng với vùng **Preview Iframe** - nơi hiển thị giao diện của component mẫu + phần docs chi tiết của từng prop
2. Phần đánh số 2 tương ứng với **Menu** - nơi hiển thị danh sách toàn bộ các component bạn muốn xem
3. Phần đánh số 3 tương ứng với vùng Addon - Mỗi tab sẽ là một **Addon** - một tiện ích mở rộng. Các addon mặc định cung cấp các chức năng như: Controls - giúp quản lý và thay đổi các giá trị prop truyền vào cho component mẫu, Actions - nơi hiển thị các action event được dispatch khi bạn tương tác với component như click, input..., Interactions - UI Testing.

***Mỗi khi bạn thay đổi giá của của prop trên trang documentation, ngay lập tức kết quả sau khi render component với prop mới sẽ hiển thị trên màn Preview ngay lập tức.***

![](https://images.viblo.asia/cc2ce2ea-e64f-4624-9bb3-317215120547.gif)

## Cài đặt Storybook

Việc cài đặt storybook vào một dự án rất đơn giản. Bạn chỉ cần chạy một câu lệnh duy nhất đó là:

```bash
npx storybook init
```

Một câu lệnh đơn giản nhưng nó lại làm khá nhiều thứ:
- Tự động detect dự án thuộc loại nào: React / Vue2 / Vue3 / Angular và cài đặt cho thích hợp
- Cài đặt các dependencies cần cho Storybook
- Tạo các script cần thiết để chạy và build storybook
- Tạo cấu hình mặc định cho Storybook
- Khởi tạo một số file component + file story mẫu cho bạn tham khảo

## Story trong Storybook là gì?

Story hiểu theo nghĩa đen luôn đó là một câu chuyện. Bạn viết một Story như đang kể một câu chuyện cho Storybook. Mỗi câu chuyện là một trường hợp hiện thi bạn muốn cho vào trang Document.

Mình lấy ví dụ về component Button trong hình mình họa bên trên. Bạn thấy Button sẽ có nhiều kiểu hiển thị trong trang tài liệu như: Primary | Secondary | Large | Small. Mỗi kiểu lại có màu sắc, kích thước khác nhau.

Với mỗi kiểu hiển thị này, chúng ta sẽ viết một Story tương ứng. Mỗi story đơn giản là bạn thay đổi lại Props của component thôi chứ không có gì quá khó khăn :D

```javascript
import React from 'react';

import { Button } from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
```

Một số điểm bạn lưu ý:
- `export default` giúp bạn có thể khai báo Title hiển thị trong menu trên trang document. Gom thành từng nhóm, dùng `/` để phân cách: `Example/Button`, trong đó `Example` là tên nhóm.
- Bất kỳ module bạn export sẽ đều được hiểu là một Story. VD: `export const Large` thì Large là một Story.
- Khai báo `Template` và dùng hàm `bind` của JavaScript để dễ thuận tiện cho việc truyền giá trị props giúp đỡ phải viết code Component nhiều lần.

## Tại sao sử dụng Storybook?

Trong một dự án, có một số vấn đề mà có thể bấy lâu nay mọi người ít khi để ý tới, nhưng chính chúng lại mang tới sự suôn sẻ giữa nhiều thành viên trong team. Thật không may Storybook lại giúp khắc phục được những vấn đề này. 

Mình đã tổng hợp một số lý do nổi bật phía dưới đây, từ đó giúp bạn đọc dễ dàng đưa ra quyết định cho việc có nên sử dụng Storybook vào trong các dự án hay không. Các lý do đó là:

**1. Nhanh chóng bắt tay vào phát triển UI component với môi trường tách biệt**

Ngay sau khi khởi tạo source code cho dự án bằng react-create-app, vue-cli... thì dev team có thể bắt tay ngay vào việc phát triển UI component với Storybook. Storybook sẽ khởi chạy trang documentation trên công 6006, có sẵn HMR (Hot Module Reload - bạn sửa code tới đâu thì source code mới sẽ được tự động load và render lại trên browser mà bạn không phải reload lại trang). Vừa phát triển được UI ngay, vừa kết hợp với storybook để có luôn trang hướng dẫn sử dụng.

![](https://cdn.jsdelivr.net/gh/facebook/create-react-app@27b42ac7efa018f2541153ab30d63180f5fa39e0/screencast.svg)

Bạn cũng chưa cần phải quan tâm và setup đầy đủ toàn bộ những thứ dự án cần như Redux, Database, API... Dev team sẽ có thể tập trung vào phát triển các component riêng lẻ - trước tiên, từ những cái nhỏ nhất.

![](https://images.viblo.asia/8462d0a0-00de-41a9-9b61-32152d0042f1.gif)

Chẳng hạn như các loại Button, Input, TextArea, Icon... rồi to hơn thành các Block, Header, Footer, Page...  Chiến thuật phát triển này hay còn được biết đến với cái tên *Component Driven Development* - Phát triển UI theo hướng Bottom Up - làm từ những thành phần nhỏ nhất, sau đó kết hợp những cái nhỏ nhỏ đó lại với nhau thành những thành phần to hơn, có hình thù rõ ràng như Header, Footer và cuối cùng là một Page.

**2. Khả năng xem toàn bộ các components tồn tại trong dự án**

Đối với một dự án, khả năng nắm bắt toàn bộ các components trong dự án đòi hỏi người lập trình viên phải có một thời gian gắn bó nhất định thì mới có thể đạt tới được *cảnh giới* này.

![image.png](https://images.viblo.asia/00011985-a01b-49ec-8328-9c5c9a0c580c.png)

Khi kết hợp với Storybook, bạn sẽ có luôn một trang documentation, phân cấp các componnet theo từng nhóm. Từ đó, dễ dàng xem và tìm kiếm coi đã có những component nào được phát triển trong dự án, component nào chưa. Bạn dễ dàng quyết định component nào bạn cần phải viết mới và component nào có thể sử dụng luôn mà không phải mất công phát triển lại, tránh sự trùng lặp không cần thiết.

Đặc biệt, với những dự án *dài hơi* mình từng quản lý, khi nhân sự có thể có nhiều biến động. Các dev mới vào gặp nhiều khó khăn với vấn đề này đều sẽ được giải quyết khi có docs.

**3. Nắm bắt được các props của component**

Khả năng nắm bắt được các components trong dự án nếu gọi là *cảnh giới thứ nhất*, việc biết trong từng component có những prop nào, rồi khi thay đổi giá trị của props thì component sẽ thay đổi cách hiển thị ra sao lại phải gọi là *cảnh giới thượng thừa*! :laughing: 

![](https://images.viblo.asia/cc2ce2ea-e64f-4624-9bb3-317215120547.gif)

Việc Storybook cho phép chỉnh sửa props của component ngay trong trang tài liệu sẽ giúp các thành viên trong team, không chỉ developer mà cả những thành viên không biết code cũng có thể thuận tiện test được giao diện.

**4. Khả năng hiển thị trực quan về các components cho các bên liên quan để sớm có các feedback**

Đối với các dự án web, CI/CD là điều không thể thiếu để kiểm tra chất lượng source code và giảm thiểu sai sót về mặt con người trong quá trình deploy web lên server. Thông thường, khi có các Pull Request (PR) chỉnh sửa UI, dev sẽ cần capture screenshot / screencast và đính kèm theo PR để phục vụ quá trình review code. Tuy nhiên, việc xem qua ảnh screenshot hoặc screencast sẽ bị giới hạn theo case cố định mà dev thử nghiệm.

![](https://images.viblo.asia/8e0f6a34-2871-4cdf-b2e0-1d9106e27d0d.gif)

Tích hợp Storybook vào quá trình CI, mỗi khi bạn open Pull Request, storybook sẽ build trang documentation thành dạng website tĩnh (HTML & CSS & JS). Dù code chưa được merge nhưng bạn vẫn có khả năng sử dụng chức năng Artifact trên CI, hoặc upload trực tiếp lên Chormatic, Github Pages, Cloudflare, AWS S3... để dùng thử componment và sớm có feedback lại cho dev.

**5. UI testing dễ dàng hơn như Accessibility tests, Interaction tests, Visual UI tests**

Storybook có các addon giúp bật thêm các tính năng khác cho trang documentation:

**- Accessibility tests:** 

![](https://storybook.js.org/ade100f41e01de571f19c95c1f6be50a/accessibility-testing-storybook.gif)

Accessibility tests giúp tự động kiểm tra component đã tuân thủ bộ quy tắc [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) chưa. WCAG (Web Content Accessibility Guidelines) là là tiêu chuẩn để xác định website của bạn có dễ dàng truy cập cho người khuyết tật như: hỗ trợ trình đọc màn hình, điều hướng bằng bàn phím, thân thiện với màn hình cảm ứng, độ tương phản màu sắc...

**- Interactions tests:**

![](https://storybook.js.org/93ce56c30c3e719cfa58c97f198768b0/storybook-interaction-tests.gif)

Interaction tests cho phép bạn đưa các test case vào để tự động hóa các bước kiểm tra component như click vào button nào, nội dung hiển thị đúng không. Tính năng này được xây dựng dựa trên Jest + Playwright. Tương tự như bạn viết test bằng Cypress hoặc một số library khác.

**- Visual UI tests:** 

![](https://storybook.js.org/b2d5cc75d84f4519e390a495ebc0b949/component-visual-testing.gif)

Visual UI tests - đây là dạng test sẽ tạo screenshot cho mỗi story. Khi component bị thay đổi source code, các ảnh screenshot giữa version trước và sau khi sửa code sẽ được so sánh với nhau, phần khác biệt sẽ được highlight cũng như là có các thông báo yêu cầu bạn review nếu bạn sử dụng hệ thống cloud Chromatic (trả phí).

![image.png](https://images.viblo.asia/332795d2-847c-4d44-b646-48d3f8a440c8.png)
![image.png](https://images.viblo.asia/fe3d3a73-c2a5-433f-9350-65efe24de8ae.png)

**- Snapshot tests:**

![](https://storybook.js.org/5d599fe5fec3e868b09462dd39c63ff4/snapshot-test.png)

Snapshot test - đây là dạng test sẽ so sánh code giữa trước và sau khi sửa, từ đó đưa ra các thông báo error, warning như trong hình. Như trong hình, khi viết snapshot test, bạn sẽ phát hiện ra logic một đoạn if / else hiển thị hiệu ứng loading bị sai so với yêu cầu. Nó trở nên hữu ích để bạn test specification. 

## Tổng kết

Trong bài viết này, mình đã giới thiệu tới các bạn hiểu so qua về Storybook. Giúp bạn trả lời được các câu hỏi:
- Storybook là gì?
- Storybook có tác dụng gì?
- Tại sao nên dùng Storybook?

Storybook sẽ mang lại một trải nghiệm phát triển mới cho team của bạn. Nếu dự án của bạn đang chưa sử dụng Storybook, đây có thể là thời điểm tốt để bạn đưa Storybook vào trong workflow của team.

Một số lưu ý thêm:
- Đối với phần UI testing, ngoài Visual UI tests là bạn sẽ phải mất phí cho Chromatic thì những kiểu test còn lại đều hoàn toàn không mất phí.
- Ngoài Accessibility tests + Visual UI tests là không phải viết code, còn lại thì Interaction Tests + Snapshot tests bạn phải dành effort để viết test cases nhé. :)
- Trang tài liệu documentation chỉ tạo doc cho các component được viết Story, tức bạn phải tạo dành effort để tạo các file Story cho component, tuy nhiên thường effort này cũng không quá nhiều.

Nếu bạn thấy bài viết này hữu ích, hãy upvote và follow mình nhé! :wink: 

Support mình để mình có thêm các bài viết khác - bằng cách mời mình cà phê :coffee:, pizza tại https://kimyvgy.webee.asia. Hãy comment chủ đề bạn quan tâm xuống phía dưới để yêu cầu mình viết. Cảm ơn các bạn đã đón đọc.
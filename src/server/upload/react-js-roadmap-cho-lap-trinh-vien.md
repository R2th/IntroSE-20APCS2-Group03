Dạo gần đây mình lượn lờ trên mangj thì thấy một bài viết chia sẻ về roadmap ReactJS khá là thú vị và chi tiết nên mạo muôi mang về đây chia sẻ cho mọi người hi vọng sẽ giúp ích cho ai đó trên con đường gõ phím bình thiên hạ.

# 1. Tổng quan
[React JS](https://reactjs.org/) hay React là một thư viện Javascript mã nguồn mở rất phổ biến hiện nay. Nó được maintained và phát triển thường xuyên bởi Facebook và một cộng đồng cực kỳ hùng hậu. React đựoc coi như là một trong những thư viện tốt nhất trong những năm gần đây để phát triển GUI dựa trên component.

Mặc dù hiện nay có nhiều frameworks khác cũng không kém cạnh như Angular hay Vue.js. Nhưng điều khiến React trở nên khác biệt đó là nó chỉ tập trung vào phát triển GUI dựa trên component và không đả động đến những phần khác.

Dưới đây sẽ là biểu đồ thể hiện những con đường mà bạn có thể đi, các thư viện mà bạn muốn học để có thể trở thành một lập trình viên React. Bạn có thể xem bài viết của tác giả tại [đây](https://twitter.com/adam_devops/status/1258401022638202881?s=20)

Lưu ý là roadmap này chỉ đưa cho ban ý tưởng chung và hướng dẫn nếu bạn đang hoang mang không biết bắt đầu từ đâu hay làm gì tiếp. Cuối cùng thì việc bạn đi theo hướng nào hay học cái gì chủ yếu sẽ phụ thuộc vào kinh nghiệm của bạn vì chính bạn sẽ biết rõ được cái nào phù hợp với hoàn cảnh nào hơn. Không phải cứ thư viện nào tiện dụng và thông dụng đều sẽ luôn là thư viện hoàn hảo nhất. Vậy nên hãy xem qua roadmap và bắt đầu gõ code thôi.

**Road map**
[![image.png](https://images.viblo.asia/52ef0b8a-dfc4-483e-89eb-4c2eb394bbaf.png)](https://github.com/adam-golab/react-developer-roadmap/blob/master/roadmap.png)

# 2. Những thứ cơ bản:
## 1. HTML:
Đầu tiên và cũng là kỹ năng quan trọng nhất mà mọi lập trình viên web phải biết. Nó sẽ giúp chúng ta tạo cấu trúc cho trang web.
* Đầu tiên hãy học vài thứ cơ bản của HTML
* Sau đó hãy tạo vài trang cơ bản để làm ví dụ
Bạn có thể ngó qua hướng dẫn cơ bản cho HTLM tại [đây](https://www.w3schools.com/html/).

## 2. CSS:
Nền móng thứ 2 và cũng rất quan trọng là CSS, nó sẽ giúp trang web của bạn trở nên đẹp đẽ hơn.
* Tìm hiểu CSS Styles cơ bản từ bước trước.
* Tạo một trang với grid và flexbox.
Hướng dẫn cơ bản CSS có thể xem tại [đây](https://www.w3schools.com/css/).

## 3. JS cơ bản:
JS cũng là một phần không thể thiếu, nó sẽ giúp trang web của bạn có tính tương tác nhiều hơn.
* Làm quen với các cú pháp, thao tác cơ bản trên DOM.
* Học các cơ chế cơ bản của JS (Hoisting, Event Bubbling, Prototyping).
* Tạo vài hàm AJAX, học các tính năng mới (ECMA Script 6+)
* Làm quen với thư viện JQuery
Bạn có thể tìm hiểu kỹ hơn tại [đây](https://javascript.info/).

# 3. Kỹ năng lập trình chung:
* Hãy học về GIT, tạo một vài repo trên github, chia sẻ code vói những người khác.
* Hiểu về giao thức HTTP(S), các phuơng thức Request (GET, POST, PUT, PATCH, DELETE, OPTIONS).
* Search Google thật nhiều (bạn không nhìn nhầm đâu, tìm kiếm cũng là một kỹ năng raats quan trọng nếu muốn trở thành một lập trình viên tốt đó và không có gì tốt hơn để cải thiện kỹ năng bằng việc thực hành)
* Làm quen với terminal và học cách configure shell (bash, zsh, fish).
* Đọc vài cuốn sách về thuật toán và cấu trúc data.
* Thêm vài cuốn nữa về design patterns.

# 4. Học React từ trang chủ [ReactJS](https://reactjs.org/tutorial/tutorial.html) hoặc từ các [khóa học](https://egghead.io/courses/the-beginner-s-guide-to-react).

# 5. Làm quen với các công cụ mà bạn sẽ sử dụng:
Để trở thành lập trình viên React, bạn nên dành thời gian để học và làm quen với một số công cụ mà bạn sẽ sử dụng trong quá trình lập trình web như công cụ built, unit test, debugg,...

Sau đây là 1 số danh sách công cụ mà bạn nên để mắt tới.

**Package Managers**
* [npm](https://www.npmjs.com/)
* [yarn](https://classic.yarnpkg.com/en/)
* [pnpm](https://pnpm.io/)

**Task Runner**
* [npm script](https://docs.npmjs.com/cli/v7/using-npm/scripts)
* [gulp](https://gulpjs.com/)
* [Webpack](https://webpack.js.org/)
* [Rollup](https://rollupjs.org/guide/en/)
* [Parcel](https://parceljs.org/)

# 6. Styling

**CSS Preprocessor**

CSS Preprocessor sẽ giúp bạn tạo CSS từ cú pháp của chính Preprocessor đó. Preprocessor sẽ giúp CSS có tổ chức, trật tự hơn nhiều:
* [Sass/CSS](https://sass-lang.com/)
* [PostCSS](https://postcss.org/)
* [Less](https://lesscss.org/)
* [Stylus](https://stylus-lang.com/)

**CSS FrameWorks**

CSS FrameWorks là thư viện code giúp tóm tắt các thiết kế web phổ biến và giúpchúng ta triển khai các thiết kế này dễ dàng hơn. Nói một cách dễ hiểu, CSS framework là một tập hợp các style-sheet CSS đã được chuẩn bị sẵn và sẵn sàng để sử dụng.

* [Bootstrap](https://getbootstrap.com/)
* [Materialize](https://materializecss.com/), [Material UI](https://material-ui.com/), [Material Design Lite](https://getmdl.io/)
* [Bulma](https://bulma.io/)
* [Semantic UI](https://semantic-ui.com/)

**CSS Architecture**

* [BEM](http://getbem.com/)
*[ CSS Modules](https://github.com/css-modules/css-modules)
* [Atomic](https://acss.io/)
* [OOCSS](https://github.com/stubbornella/oocss/wiki)
* [SMACSS](http://smacss.com/)
* [SUITCSS](https://suitcss.github.io/)

**CSS trong JS**

* [Styled Components](https://styled-components.com/)
* [Radium](https://formidable.com/open-source/radium/)
* [Emotion](https://emotion.sh/docs/introduction)
* [JSS](https://cssinjs.org/?v=v10.7.1)
* [Aphrodite](https://github.com/Khan/aphrodite)

# 7. Quản lý State:

**[Component State](https://reactjs.org/docs/faq-state.html)/[Context API](https://reactjs.org/docs/context.html)**

**[Redux](https://redux.js.org/)**
1. Async actions (Side Effects)
* [Redux Thunk](https://github.com/reduxjs/redux-thunk)
* [ Redux Better Promise](https://github.com/Lukasz-pluszczewski/redux-better-promise)
* [Redux Saga](https://redux-saga.js.org/)
* [Redux Observable](https://redux-observable.js.org/)

2. Helpers
* [Rematch](https://rematch.gitbooks.io/rematch/content/)
* [Reselect](https://github.com/reduxjs/reselect)

3. Data persistence
* [Redux Persist](https://github.com/rt2zz/redux-persist)
* [Redux Phoenix](https://github.com/adam-golab/redux-phoenix)

4. [Redux Form](https://redux-form.com/8.3.0/)

**[MobX](https://mobx.js.org/README.html)**

**[Recoil](https://recoiljs.org/)**

# 8. Type Checker:

* [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
* [TypeScript](https://www.typescriptlang.org/)
* [Flow](https://flow.org/en/)

# 9. Thư viện Form helper:

* [Redux Form](https://redux-form.com/8.3.0/)
* [Formik](https://github.com/formium/formik)
* [Formsy](https://github.com/formsy/formsy-react)
* [Final Form](https://github.com/final-form/final-form)

# 10. Routing

Component là nhân tố chính cho sự mạnh mẽ của React và Routing component là một phần thiết yếu của bất kỳ ứng dụng web nào.

* [React-Router](https://reactrouter.com/)
* [Router5](https://router5.js.org/)
* [Redux-First Router](https://github.com/faceyspacey/redux-first-router)
* [Reach Router](https://reach.tech/router/)

# 11. API clients

Bạn có thể tạo ra sự giao tiếp với app khác bằng việc sử dụng APIs như REST hay [GraphQL](https://graphql.org/).

**REST**
* [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* [SuperAgent](https://visionmedia.github.io/superagent/)
* [Axios](https://github.com/axios/axios)

**GraphQL**
* [Apollo](https://www.apollographql.com/docs/react/)
* [Relay](https://relay.dev/)
* [Urql](https://github.com/FormidableLabs/urql)

# 12. Một số thư viện hữu dụng:

Một số thư viên jsau sẽ khiến công việc của bạn trở nên nhẹ nhàng hơn nếu bạn thành thạo nó:

* [Lodash](https://lodash.com/)
* [Day.js](https://momentjs.com/)
* [Moment](https://momentjs.com/)
* [classnames](https://github.com/JedWatson/classnames)
* [Numeral](http://numeraljs.com/)
* [RxJS](http://reactivex.io/)
* [ImmutableJS](https://immutable-js.com/)
* [Ramda](https://ramdajs.com/)

# 13. Thư viện và Framworks ReactJS UI:

Sau đây là những thư viện, frameworks ReactJS UI mà mình cho là tốt nhất, đáng để thành thạo:

* [Material UI](https://material-ui.com/)
* [React Bootstrap](https://react-bootstrap.github.io/)
* [ReactStrap](https://reactstrap.github.io/)
* [Ant Design](https://ant.design/)
* [Blueprint JS](https://blueprintjs.com/)
* [Evergreen](https://evergreen.segment.com/)
* [Storybook](https://storybook.js.org/)

# 14. Testing:

Testing luôn là kỹ năng thiết yếu cho mọi lập trình viên:

**Unit testing**

* [Jest](https://jestjs.io/)
* [React testing library](https://testing-library.com/docs/react-testing-library/intro/)
* [Enzyme](https://enzymejs.github.io/enzyme/)
* [Sinon](https://sinonjs.org/)
* [Mocha](https://mochajs.org/)
* [Chai](https://www.chaijs.com/)
* [AVA](https://github.com/avajs/ava)
* [Tape](https://github.com/substack/tape)

**End to End test**

* [Selenium](https://www.selenium.dev/)
* [Webdriver](https://webdriver.io/)
* [Cypress](https://www.cypress.io/)
* [Puppeteer](https://pptr.dev/)
* [Cucumber.js](https://github.com/cucumber/cucumber-js)
* [Nightwatch.js](https://nightwatchjs.org/)

**Integration test (test kết hợp)** - [Karma](https://karma-runner.github.io/latest/index.html)

# 15. Internationalization:

* [React Intl](https://github.com/formatjs/formatjs)
* [React i18next](https://react.i18next.com/)

Cả 2 thử viện này đều cung cấp cho React component và API khả năng format lại ngày tháng, chuỗi, số và cả việc chuyển đổi ngôn ngữ,...

# 16. Server side rendering:

* [Next.js](https://nextjs.org/)
* [After.js](https://github.com/jaredpalmer/after.js)
* [Rogue](https://github.com/alidlorenzo/rogue.js)
* [Frotinity](https://frontity.org/)

React component bây giờ sẽ được render ở phía server và output HTML sẽ được chuyển đến cho client hoặc brower.

# 17. Thư viện giúp tạo static site:

* [Jamstack](https://jamstack.org/generators/)
* [Gatsby](https://www.gatsbyjs.com/)

Bạn có thể sử dụng Gatsby để tạo một trang web trải ngiệm đựoc cá nhân hóa và đã đựoc đăng nhập. Chúng kết hợp dữ liệu của bạn với JavaScript và tạo ra nội dung HTML có định dạng khá chuẩn.

# 18. Backend Framework:

**[React on Rails](https://shakacode.gitbooks.io/react-on-rails/content/)**

Nó tích hợp Rails với khung front-end React của Facebook (server rendering). Nó cung cấp server Rendering, thường được sử dụng cho SEO thu thập thông tin và hiệu suất UX, không được cung cấp bởi rails/webpacker.

# 19. Mobile:

* [React Native](https://reactnative.dev/)
* [Cordova](https://cordova.apache.org/)/[Phonegap](https://blog.phonegap.com/update-for-customers-using-phonegap-and-phonegap-build-cc701c77502c?gi=6427df82a0a0)

ReactNative đang dần trở nên phổ biến và là các tiêu chuẩn để phát triển các ứng dụng di động bằng JavaScript.

# 20. Destop:

* [Proton Native](https://proton-native.js.org/#/)
* [Electron](https://www.electronjs.org/)
* [React Native Windows](https://github.com/Microsoft/react-native-windows)

Cho phép bạn xây dựng UWP và WPF app với React.

# 21. Thực tế ảo:

Thực tế áo đang dần trở thành xu hướng trên nhiều lĩnh vực và React cũng không hề đứng ngoài cuộc chơi này. Với [React 360](https://opensource.fb.com/) bạn sẽ có những trải nghiệm thú vị với 360 và VR khi sử dụng React.

# 22. Tổng kết:

Trên đây là Roadmap và những phân tích chi tiết về các thư viện của nó. Chắc chắn là trông nó rất rộng lớn, tuy nhiên cũng rất toàn diện, nhiều người trong số các bạn có thể đã biết hầu hết mọi thứ. Ngay cả khi bạn không biết, không cần phải bối rối hoặc choáng ngợp bởi lộ trình này, bạn có thể bắt đầu từ những bước nhỏ và sau đó làm theo.

Có nhiều cách để trở thành lập trình viên React và nếu bạn đã làm việc với React từ trước, bạn chắc chắn có thể tìm thấy thêm một số công cụ và công nghệ để bổ sung vào con đường của mình.

Cuối cùng cảm ơn các bạn đã dành thời gian cho bài viết của mình. Nếu bạn thấy có điểm nào cần góp ý, hãy comment trong bài viết hoặc vào thẳng [repo](https://github.com/adam-golab/react-developer-roadmap) của tác giả để góp ý nhé.

[Nguồn!](https://dev.to/theme_selection/reactjs-roadmap-for-developers-2824)
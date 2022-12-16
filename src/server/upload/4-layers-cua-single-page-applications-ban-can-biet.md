Cùng xem cấu trúc một ứng dụng react từ đầu, tìm hiểu về domain và các dịch vụ của nó, store, dịch vụ của ứng dụng và view.

![](https://images.viblo.asia/da0c24c8-52d3-4d3d-a113-54f2a5e7c1ba.png)

**Mọi dự án thành công đều cần 1 cấu trúc rõ ràng, thứ mà các thành viên trong team đều hiểu được.**

Giả sử bạn là thành viên mới join vào team. Anh technical leader giới thiệu về cấu trúc dự kiến cho ứng dụng mới với roadmap như sau:

![tầng của một single page applications (chi tiết)](https://images.viblo.asia/443e7c34-3862-4129-b1ef-00a2d08d6043.png)

4 tầng của một single page applications (chi tiết)

*Ứng dụng sẽ hiển thị danh sách các bài báo. Người dùng sẽ có thể thêm, xóa và like article*
 Và sau đó bạn được giao nhiệm vụ thực hiện nó.
 ### Bắt đầu cấu trúc
 Tôi chọn [Create React App](https://github.com/facebook/create-react-app) và [Flow](https://flow.org/) cho type checking. Để đơn giản và ngắn gọn thì chúng ta sẽ build một ứng dụng đơn giản mà bỏ qua style cho nó.
 Giống như yêu cầu ban đầu, cùng xem về declarative nature của các framework hiện đại, cùng hiểu concept về state.
 
 **Các framework hiện nay đều là declarative**
 
 React, Angular, Vue đều là declarative, khuyến khích chúng ta sử dụng các elements của phương thức lập trình hàm (functional programming)
 
 Bạn đã bao giờ nhìn một quyển sách được lật chưa?
 
>  Đó là một quyển sách với một chuỗi các bức ảnh thay đổi dần dần từ trang này sang trang khác, do đó khi các trang được lật nhanh chóng thì những bức ảnh sẽ bắt đầu có những hiệu ứng

![](https://images.viblo.asia/438ee62d-b2d7-4142-a76c-80246c1f5e00.jpeg)

Bây giờ cùng check một phần định nghĩa của React :
> thiết kế một view đơn giản cho mỗi state của ứng dụng của bạn, React sẽ cập nhật hiệu quả và hiển thị đúng components khi dữ liệu của bạn thay đổi

Còn đây là của Angular:
> Xây dựng các tính năng một cách nhanh chóng với sự đơn giản và declarative template. Mở rộng teamplate language với components của riêng bạn

Nghe có vẻ quen ?

Framework giúp chúng ta xây dựng ứng dụng gồm các view. View là biểu hiện cho state. Vậy state là gì ?

**State**

State diễn tả những phần dữ liệu được thay đổi trong ứng dụng.

Bạn truy cập một URL, đó là 1 state, tạo một AJAX call để lấy về dữ liệu danh sách phim, đó cũng là 1 state, bạn muốn lưu thông tin vào local storage, ditto, state.

State sẽ chỉ chứa một **immutable object**.

[Immutable architecture](http://enterprisecraftsmanship.com/2016/05/12/immutable-architecture/) đem lại nhiều lợi ích, một trong số đó là ở tầng view.

Dưới đây là trích dẫn từ doc của React về [Optimizing Performance](https://reactjs.org/docs/optimizing-performance.html):
> Immutability makes tracking changes cheap. A change will always result in a new object so we only need to check if the reference to the object has changed. 

Có thể hiểu là Immutability làm cho việc tracking sự thay đổi đơn giản và dễ hơn. Mỗi thay đổi sẽ luôn tạo ra một đối tượng mới do đó chúng ta chỉ cần check nếu reference tới đối tượng đó khi nó thay đổi.

### Domain Layer

Domain diễn tả state và lưu giữ business logic. Nó đại diện cho phần cốt lõi ứng dụng của chúng ta và nên được agnostic với view layer. Angular, React hay Vue cũng không thành vấn đề, chúng ta có thể sử dụng được domain nó dựa vào việc framework chúng ta chọn là gì.

![](https://images.viblo.asia/d16d37d3-6111-4746-8e31-4d4f22d4aafb.png)

Bởi vì chúng ta đang dùng với immutable architecture, nên domain layer của chúng ta sẽ bao gồm nhiều entity và domain service.

So với OOP, đặc biệt là ở 1 ứng dụng lớn, việc domain model "xanh xao" là hoàn toàn có thể chấp nhận được khi làm việc với immutable data.

Để có thể hiển thị danh sách article, trước tiên chúng ta cần tạo **Article** entity.

Mọi đối tượng tiếp theo thuộc type là Article sẽ là immutable (không thay đổi được). Flow sẽ thực thi việc [immutability](https://flow.org/en/docs/react/redux/#typing-redux-state-immutability-a-classtoc-idtoc-typing-redux-state-immutability-hreftoc-typing-redux-state-immutabilitya) thông qua việc làm cho mọi thuộc tính là read-only (dấu `+` trước mỗi thuộc tính):
```
// Article.js
// @flow
export type Article = {
  +id: string;
  +likes: number;
  +title: string;
  +author: string;
}
```
Bây giờ thì cùng tạo `articleService` sử dụng factory pattern.

Bởi vì chúng ta chỉ cần 1 `articleService` duy nhất trong ứng dụng của chúng ta, nên chúng ta sẽ export nó như 1 singleton.

Phương thức `createArticle` sẽ cho phép chúng ta tạo một [frozen object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) (không cho phép thêm hay loại bỏ thuộc tính của đối tượng) thuộc type là Article. Mỗi một article mới sẽ được cung cấp tự động cho một id duy nhất và số lượt like là 0, chỉ cho phép chúng ta cung cấp tác giả và tiêu đề.

Phương thức `createArticle` sẽ trả về "có thể" là một Article type. Tại sao lại là "có thể" bởi vì [Maybe types](https://flow.org/en/docs/types/maybe) sẽ buộc bạn phải check việc một object của Article có tồn tại hay không trước khi thao tác với nó.

Nếu bất kỳ 1 trường cần thiết (bắt buộc) để tạo một article mà fail khi validate, `createArticle` sẽ trả về `null`. Một số nguời cho rằng tốt hơn là nên tạo ra một exception. Nếu chúng ta thực hiện như vậy và layer trên nó không thực hiện việc catch error (exception), chương trình của chúng ta sẽ kết thúc trong quá trình runtime.

Phương thức `updateLikes` sẽ giúp chúng ta cập nhật số lượt like từ một article cụ thể, thông qua việc trả về 1 bản sao của nó với số lượng like mới.

Cuối cùng, 2 phương thức `isTitleValid` và `isAuthorValid` dùng để validate tiêu đề và tác giả cho phương thức `createArticle`.
```
// ArticleService.js
// @flow
import v1 from 'uuid';
import * as R from 'ramda';

import type {Article} from "./Article";
import * as validators from "./Validators";

export type ArticleFields = {
  +title: string;
  +author: string;
}

export type ArticleService = {
  createArticle(articleFields: ArticleFields): ?Article;
  updateLikes(article: Article, likes: number): Article;
  isTitleValid(title: string): boolean;
  isAuthorValid(author: string): boolean;
}

export const createArticle = (articleFields: ArticleFields): ?Article => {
  const {title, author} = articleFields;
  return isTitleValid(title) && isAuthorValid(author) ?
    Object.freeze({
      id: v1(),
      likes: 0,
      title,
      author
    }) :
    null;
};

export const updateLikes = (article: Article, likes: number) =>
  validators.isObject(article) ?
    Object.freeze({
      ...article,
      likes
    }) :
    article;

export const isTitleValid = (title: string) =>
  R.allPass([
    validators.isString,
    validators.isLengthGreaterThen(0)
  ])(title);

export const isAuthorValid = (author: string) =>
  R.allPass([
    validators.isString,
    validators.isLengthGreaterThen(0)
  ])(author);

export const ArticleServiceFactory = () => ({
  createArticle,
  updateLikes,
  isTitleValid,
  isAuthorValid
});

export const articleService = ArticleServiceFactory();
```

Validation thực sự khá quan trọng trong việc làm cho dữ liệu của chúng ta thống nhất và đặc biệt là ở domain layer. Chúng ta có thể tạo ra các validator của chúng ta tách khỏi pure function.
```
// Validators.js
// @flow
export const isObject = (toValidate: any) => !!(toValidate && typeof toValidate === 'object');

export const isString = (toValidate: any) => typeof toValidate === 'string';

export const isLengthGreaterThen = (length: number) => (toValidate: string) => toValidate.length > length;

```
Những validator này chỉ đơn giản và phục vụ cho demo ở bài viết này thôi.

Như vậy chúng ta đã setup xong domain layer.

Phần tiếp theo đó chính là việc chúng ta có thể sử dụng code ngay.

Cùng xem cách mà chúng ta sử dụng `articleService` để tạo 1 article về một trong những cuốn sách yêu thích của tôi và update số lượng like của nó như thế nào nhé:
```
// domain-demo.js
// @flow
import {articleService} from "../domain/ArticleService";

const article = articleService.createArticle({
  title: '12 rules for life',
  author: 'Jordan Peterson'
});
const incrementedArticle = article ? articleService.updateLikes(article, 4) : null;

console.log('article', article);  // likes: 0

console.log('incrementedArticle', incrementedArticle); // likes: 4
```

### Store layer
Dữ liệu được hình thành từ việc tạo và cập nhật article miêu tả cho state về ứng dụng của chúng ta.

Chúng ta cần 1 vị trí để lưu trữ dữ liệu và store chính là 1 ứng cử viên hoàn hảo đó.
![](https://images.viblo.asia/3a04d451-92c8-40a1-b64d-86651196cfeb.png)

State có thể dễ dàng biểu đạt thông qua 1 mảng article.
```
// ArticleState.js
// @flow
import type {Article} from "./Article";

export type ArticleState = Article[];
```
`ArticleStoreFactory` thực hiện publish-subscribe pattern và exports `articleStore` dưới dạng singleton.

store lưu trữ article và thực thi việc thêm, xóa và cập nhật những immutable operations với chúng.
> Lưu ý rằng store chỉ thực hiện với article. Chỉ có `articleService` có thể tạo và cập nhật chúng.

Bất kỳ bên nào quan tâm đến cũng có thể subscribe và unsubscribe `articleStore`.

`articleStore` giữ danh sách mọi subscriber trong bộ nhớ và notify chúng mỗi khi có thay đổi.

```
// ArticleStore.js
// @flow
import {update} from "ramda";

import type {Article} from "../domain/Article";
import type {ArticleState} from "./ArticleState";

export type ArticleStore = {
  addArticle(article: Article): void;
  removeArticle(article: Article): void;
  updateArticle(article: Article): void;
  subscribe(subscriber: Function): Function;
  unsubscribe(subscriber: Function): void;
}

export const addArticle = (articleState: ArticleState, article: Article) => articleState.concat(article);

export const removeArticle = (articleState: ArticleState, article: Article) =>
  articleState.filter((a: Article) => a.id !== article.id);

export const updateArticle = (articleState: ArticleState, article: Article) => {
  const index = articleState.findIndex((a: Article) => a.id === article.id);
  return update(index, article, articleState);
};

export const subscribe = (subscribers: Function[], subscriber: Function) =>
  subscribers.concat(subscriber);

export const unsubscribe = (subscribers: Function[], subscriber: Function) =>
  subscribers.filter((s: Function) => s !== subscriber);

export const notify = (articleState: ArticleState, subscribers: Function[]) =>
  subscribers.forEach((s: Function) => s(articleState));

export const ArticleStoreFactory = (() => {
  let articleState: ArticleState = Object.freeze([]);
  let subscribers: Function[] = Object.freeze([]);

  return {
    addArticle: (article: Article) => {
      articleState = addArticle(articleState, article);
      notify(articleState, subscribers);
    },
    removeArticle: (article: Article) => {
      articleState = removeArticle(articleState, article);
      notify(articleState, subscribers);
    },
    updateArticle: (article: Article) => {
      articleState = updateArticle(articleState, article);
      notify(articleState, subscribers);
    },
    subscribe: (subscriber: Function) => {
      subscribers = subscribe(subscribers, subscriber);
      return subscriber;
    },
    unsubscribe: (subscriber: Function) => {
      subscribers = unsubscribe(subscribers, subscriber);
    }
  }
});

export const articleStore = ArticleStoreFactory();
```

Việc implement store này giúp chúng ta hiểu được những concept đằng sau nó. Trên thực tế, tôi nghĩ mọi người nên dùng state management như Redux, Ngrx, Mobx, hoặc chí ít cũng là [observable data service](https://medium.com/bucharestjs/the-developers-guide-to-redux-like-state-management-in-angular-3799f1877bb).

Ok, giờ thì tạo 2 article và 2 subscriber tới store và cùng xem các subcriber nhận thông báo khi có thay đổi như thế nào.

```
store-demo.js
// @flow
import type {ArticleState} from "../store/ArticleState";
import {articleService} from "../domain/ArticleService";
import {articleStore} from "../store/ArticleStore";

const article1 = articleService.createArticle({
  title: '12 rules for life',
  author: 'Jordan Peterson'
});

const article2 = articleService.createArticle({
  title: 'The Subtle Art of Not Giving a F.',
  author: 'Mark Manson'
});

if (article1 && article2) {
  const subscriber1 = (articleState: ArticleState) => {
    console.log('subscriber1, articleState changed: ', articleState);
  };

  const subscriber2 = (articleState: ArticleState) => {
    console.log('subscriber2, articleState changed: ', articleState);
  };

  articleStore.subscribe(subscriber1);
  articleStore.subscribe(subscriber2);

  articleStore.addArticle(article1);
  articleStore.addArticle(article2);

  articleStore.unsubscribe(subscriber2);

  const likedArticle2 = articleService.updateLikes(article2, 1);
  articleStore.updateArticle(likedArticle2);

  articleStore.removeArticle(article1);
}
```

### Application services

Layer này vô cùng hữu ích cho mọi loại operations mà liền kề với state flow như Ajax call để lấy dữ liệu từ server hay state projection.
![](https://images.viblo.asia/c793e204-1dc8-4f70-8479-566317f00200.png)

Vì một lý do nào đó, designer đến và yêu cầu tất cả tên của tác giả phải được viết hoa. Chúng ta biết rằng điều đó thật là ngớ ngẩn và không muốn động đến model.

Chúng ta tạo ra `ArticleUiService` để giải quyết vấn đề này. Service này sẽ lấy một chút thông tin của state, tên tác giả, và thực hiện, trả về dạng viết hoa của nó.
```
// ArticleUiService.js
// @flow
export const displayAuthor = (author: string) => author.toUpperCase();
```
Cùng xem một demo về cách dùng service đó
```
// app-service-demo.js
// @flow
import {articleService} from "../domain/ArticleService";
import * as articleUiService from "../services/ArticleUiService";

const article = articleService.createArticle({
  title: '12 rules for life',
  author: 'Jordan Peterson'
});

const authorName = article ?  articleUiService.displayAuthor(article.author) : null;
// It's JORDAN PETERSON now.

if (article) {
  console.log(article.author); // Jordan Peterson
}
```
### The view layer
Bây giờ chúng ta có cùng dựng view layer với React.

View layer bao gồm presentational và container components.

Presentational components là những phần liên quan đến việc mọi thứ sẽ hiển thị và nhìn nó ra sao, trong khi đó container components là những gì liên quan đến việc mọi thứ hoạt động như thế nào. 
![](https://images.viblo.asia/0ce7e92d-d5f9-4e41-8f4a-d8e7378307d1.png)

Cùng dựng App component bao gồm `ArticleFormContainer` và `ArticleListContainer`.
```
// App.js
// @flow
import React, {Component} from 'react';

import './App.css';

import {ArticleFormContainer} from "./components/ArticleFormContainer";
import {ArticleListContainer} from "./components/ArticleListContainer";

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <div className="App">
        <ArticleFormContainer/>
        <ArticleListContainer/>
      </div>
    );
  }
}

export default App;
```
Giờ thì tạo `ArticleFormContainer`. React, Angular forms khá là phức tạp.

Cùng thử thư viện Ramda và các method của nó cải thiện code của chúng ta như thế nào.
form nhận input từ user và gửi nó cho `articleService`. service tạo Article từ những input đó và thêm vào `ArticleStore` cho components nào cần dùng tới.

```
// ArticleFormContainer.js
// @flow
import React, {Component} from 'react';
import * as R from 'ramda';

import type {ArticleService} from "../domain/ArticleService";
import type {ArticleStore} from "../store/ArticleStore";
import {articleService} from "../domain/ArticleService";
import {articleStore} from "../store/ArticleStore";
import {ArticleFormComponent} from "./ArticleFormComponent";

type Props = {};

type FormField = {
  value: string;
  valid: boolean;
}

export type FormData = {
  articleTitle: FormField;
  articleAuthor: FormField;
};

export class ArticleFormContainer extends Component<Props, FormData> {
  articleStore: ArticleStore;
  articleService: ArticleService;

  constructor(props: Props) {
    super(props);

    this.state = {
      articleTitle: {
        value: '',
        valid: true
      },
      articleAuthor: {
        value: '',
        valid: true
      }
    };

    this.articleStore = articleStore;
    this.articleService = articleService;
  }

  changeArticleTitle(event: Event) {
    this.setState(
      R.assocPath(
        ['articleTitle', 'value'],
        R.path(['target', 'value'], event)
      )
    );
  }

  changeArticleAuthor(event: Event) {
    this.setState(
      R.assocPath(
        ['articleAuthor', 'value'],
        R.path(['target', 'value'], event)
      )
    );
  }

  submitForm(event: Event) {
    const articleTitle = R.path(['target', 'articleTitle', 'value'], event);
    const articleAuthor = R.path(['target', 'articleAuthor', 'value'], event);

    const isTitleValid = this.articleService.isTitleValid(articleTitle);
    const isAuthorValid = this.articleService.isAuthorValid(articleAuthor);

    if (isTitleValid && isAuthorValid) {
      const newArticle = this.articleService.createArticle({
        title: articleTitle,
        author: articleAuthor
      });
      if (newArticle) {
        this.articleStore.addArticle(newArticle);
      }
      this.clearForm();
    } else {
      this.markInvalid(isTitleValid, isAuthorValid);
    }
  };

  clearForm() {
    this.setState((state) => {
      return R.pipe(
        R.assocPath(['articleTitle', 'valid'], true),
        R.assocPath(['articleTitle', 'value'], ''),
        R.assocPath(['articleAuthor', 'valid'], true),
        R.assocPath(['articleAuthor', 'value'], '')
      )(state);
    });
  }

  markInvalid(isTitleValid: boolean, isAuthorValid: boolean) {
    this.setState((state) => {
      return R.pipe(
        R.assocPath(['articleTitle', 'valid'], isTitleValid),
        R.assocPath(['articleAuthor', 'valid'], isAuthorValid)
      )(state);
    });
  }

  render() {
    return (
      <ArticleFormComponent
        formData={this.state}
        submitForm={this.submitForm.bind(this)}
        changeArticleTitle={(event) => this.changeArticleTitle(event)}
        changeArticleAuthor={(event) => this.changeArticleAuthor(event)}
      />
    )
  }
}
```
Chú ý rằng `ArticleFormContainer` trả về 1 form mà người dùng thường thấy, đó chính là từ `ArticleFormComponent`. Component này hiển thị dữ liệu được truyền qua thông qua container và emit sự kiện như `changeArticleTitle`, `changeArticleAuthor`, và `submitForm`.
```
// ArticleFormComponent.js
// @flow
import React from 'react';

import type {FormData} from './ArticleFormContainer';

type Props = {
  formData: FormData;
  changeArticleTitle: Function;
  changeArticleAuthor: Function;
  submitForm: Function;
}

export const ArticleFormComponent = (props: Props) => {
  const {
    formData,
    changeArticleTitle,
    changeArticleAuthor,
    submitForm
  } = props;

  const onSubmit = (submitHandler) => (event) => {
    event.preventDefault();
    submitHandler(event);
  };

  return (
    <form
      noValidate
      onSubmit={onSubmit(submitForm)}
    >
      <div>
        <label htmlFor="article-title">Title</label>
        <input
          type="text"
          id="article-title"
          name="articleTitle"
          autoComplete="off"
          value={formData.articleTitle.value}
          onChange={changeArticleTitle}
        />
        {!formData.articleTitle.valid && (<p>Please fill in the title</p>)}
      </div>
      <div>
        <label htmlFor="article-author">Author</label>
        <input
          type="text"
          id="article-author"
          name="articleAuthor"
          autoComplete="off"
          value={formData.articleAuthor.value}
          onChange={changeArticleAuthor}
        />
        {!formData.articleAuthor.valid && (<p>Please fill in the author</p>)}
      </div>
      <button
        type="submit"
        value="Submit"
      >
        Create article
      </button>
    </form>
  )
};
```
Bây giờ chúng ta cùng hiển thị danh sách article. `ArticleListContainer` subscribe từ `ArticleStore`, lấy toàn bộ article và hiển thị trong `ArticleListComponent`.
```
// ArticleListContainer.js
// @flow
import * as React from 'react';

import type {Article} from "../domain/Article";
import type {ArticleStore} from "../store/ArticleStore";
import {articleStore} from "../store/ArticleStore";
import {ArticleListComponent} from "./ArticleListComponent";

type State = {
  articles: Article[]
}

type Props = {};

export class ArticleListContainer extends React.Component<Props, State> {
  subscriber: Function;
  articleStore: ArticleStore;

  constructor(props: Props) {
    super(props);
    this.articleStore = articleStore;
    this.state = {
      articles: []
    };
    this.subscriber = this.articleStore.subscribe((articles: Article[]) => {
      this.setState({articles});
    });
  }

  componentWillUnmount() {
    this.articleStore.unsubscribe(this.subscriber);
  }

  render() {
    return <ArticleListComponent {...this.state}/>;
  }
}
```
`ArticleListComponent` nhận articles thông qua props và render `ArticleContainer` components.
```
// ArticleListComponent.js
// @flow
import React from 'react';

import type {Article} from "../domain/Article";
import {ArticleContainer} from "./ArticleContainer";

type Props = {
  articles: Article[]
}

export const ArticleListComponent = (props: Props) => {
  const {articles} = props;
  return (
    <div>
      {
        articles.map((article: Article, index) => (
          <ArticleContainer
            article={article}
            key={index}
          />
        ))
      }
    </div>
  )
};
```

`ArticleContainer` truyền dữ liệu article tới `ArticleComponent`. Nó cũng thực hiện 2 phương thức `likeArticle` và `removeArticle`.

Phương thức `likeArticle` cập nhật số lượt like, bằng việc thay thế article tồn tại bên trong store với bản copy đã được cập nhật.

Phương thức `removeArticle` xóa article từ store.
```
// ArticleContainer.js
// @flow
import React, {Component} from 'react';

import type {Article} from "../domain/Article";
import type {ArticleService} from "../domain/ArticleService";
import type {ArticleStore} from "../store/ArticleStore";
import {articleService} from "../domain/ArticleService";
import {articleStore} from "../store/ArticleStore";
import {ArticleComponent} from "./ArticleComponent";

type Props = {
  article: Article;
};

export class ArticleContainer extends Component<Props> {
  articleStore: ArticleStore;
  articleService: ArticleService;

  constructor(props: Props) {
    super(props);

    this.articleStore = articleStore;
    this.articleService = articleService;
  }

  likeArticle(article: Article) {
    const updatedArticle = this.articleService.updateLikes(article, article.likes + 1);
    this.articleStore.updateArticle(updatedArticle);
  }

  removeArticle(article: Article) {
    this.articleStore.removeArticle(article);
  }

  render() {
    return (
      <div>
        <ArticleComponent
          article={this.props.article}
          likeArticle={(article: Article) => this.likeArticle(article)}
          deleteArticle={(article: Article) => this.removeArticle(article)}
        />
      </div>
    )
  }
}
```
`ArticleContainer` truyền dữ liệu article tới `ArticleComponent` để hiển thị. Nó đồng thời thông báo tới container component khi nút like hay delete được click, thông qua việc thực hiện callbacks.

Nhớ rằng chúng ta có một yêu cầu ngớ ngẩn đó là tên tác giả phải được viết hoa?
`ArticleComponent` sử dụng `ArticleUiService` từ application layer thực hiện một số state từ những giá trị gốc đó (những đoạn text không viết hoa) tới cái mong muốn và thực hiện uppercase đoạn text đó.
```
// ArticleComponent.js
// @flow
import React from 'react';

import type {Article} from "../domain/Article";
import * as articleUiService from "../services/ArticleUiService";

type Props = {
  article: Article;
  likeArticle: Function;
  deleteArticle: Function;
}

export const ArticleComponent = (props: Props) => {
  const {
    article,
    likeArticle,
    deleteArticle
  } = props;

  return (
    <div>
      <h3>{article.title}</h3>
      <p>{articleUiService.displayAuthor(article.author)}</p>
      <p>{article.likes}</p>
      <button
        type="button"
        onClick={() => likeArticle(article)}
      >
        Like
      </button>
      <button
        type="button"
        onClick={() => deleteArticle(article)}
      >
        Delete
      </button>
    </div>
  );
};
```

Như vậy là chúng ta đã có đầy đủ những hàm cần thiết cho một ứng dụng React và một cấu trúc được định nghĩa khá rõ ràng và chặt chẽ. 
We now have a fully functional React app and a robust, clear defined architecture. Anyone who joins our team can read this article and feel comfortable to continue our work. :)

Mọi người có thể tham khảo ứng dụng đó [ở đây](https://intojs.github.io/architecting-single-page-applications/) và code trên repo Github [ở đây](https://github.com/intojs/architecting-single-page-applications).
### Reference
https://hackernoon.com/architecting-single-page-applications-b842ea633c2e
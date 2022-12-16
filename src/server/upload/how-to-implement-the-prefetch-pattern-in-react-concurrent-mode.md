Bài viết được dịch từ nguồn: https://hackernoon.com/implementing-the-prefetch-pattern-in-react-concurrent-mode-h4r3twc

Mới đây, React đã công bố một tính năng của hệ sinh thái `React ecosystem — Concurrent Mode`, Điều này sẽ cho phép chúng tôi dừng hoặc trì hoãn việc thực hiện các thành phần trong thời gian mà chúng tôi cần. Nó có thể giúp các ứng dụng React phản ứng nhanh và điều chỉnh chính xác các khả năng và tốc độ mạng của người dùng.

`Concurrent Mode` bao gồm một tập hợp các tính năng mới - một trong những tính năng lớn nhất là #Suspense và một cách tiếp cận mới để tìm nạp dữ liệu.

Về cơ bản, có ba cách để làm điều đó:

* `Fetch-on-render`: Chúng tôi bắt đầu `rendering components` và mỗi thành phần này có thể kích hoạt tìm nạp dữ liệu trong các hiệu ứng và phương thức vòng đời của chúng. Một ví dụ điển hình là lấy, kiếm về, đem về trong sử dụng hiệu quả.
* `Fetch-then-render`: Bắt đầu tìm nạp tất cả dữ liệu cho màn hình tiếp theo càng sớm càng tốt. Khi dữ liệu đã sẵn sàng, `render` màn hình mới. Chúng tôi có thể làm bất cứ điều gì cho đến khi dữ liệu đến. Ví dụ về điều đó là có `Container component` xử lý việc tìm nạp dữ liệu và hoàn trả một cách có điều kiện `component` con sau khi nhận được mọi thứ.
* `Render-as-you-fetch`: Bắt đầu tìm nạp tất cả dữ liệu cần thiết cho màn hình tiếp theo càng sớm càng tốt và bắt đầu hiển thị màn hình mới ngay lập tức, ngay cả trước khi nhận được `network response`. Khi luồng dữ liệu vào, `React` thử lại `render` `components` vẫn cần dữ liệu cho đến khi tất cả chúng sẵn sàng.

Tôi tin rằng các khái niệm về hai cách tiếp cận đầu tiên đã được biết đến và chắc chắn được trình bày trong `code` của bạn. Hãy tìm hiểu sâu hơn vào cách `Render-as-you-fetch`.

Bạn có thể nhận thấy rằng giải thích về phương pháp này có hai phần:

* Bắt đầu tải dữ liệu càng sớm càng tốt.
* Bắt đầu cố gắng `render` các thành phần vẫn có thể cần dữ liệu.

## Fetch early

Hãy cùng nhau xây dựng một ứng dụng tải các chỉ số chứng khoán lớn. Vì thế, chúng ta có một nút Tải trọng :). Khi bạn nhấp vào `loading button`, chúng tôi bắt đầu tải dữ liệu ngay lập tức:

```
const App = () => {
  const [prefetchedIndexes, setPrefetchedIndexes] = useState();

  return (
    <>
      <button
        onClick={() => {
            setPrefetchedIndexes(prefetchQuery(`${API}/majors-indexes`));
        }}
      >
        Load all indexes
      </button>
      {prefetchedIndexes && (
          <IndexList prefetchedIndexes={prefetchedIndexes} />
      )}
    </>
  );
};
```

`PrefetchQuery`  là một chức năng thực hiện lấy, kiếm về, đem về  yêu cầu và trả về một đối tượng mà chúng tôi sẽ chuyển đến `<IndexList />` `component`. Điểm nổi bật của ví dụ này là chúng tôi kích hoạt tìm nạp từ `onClick event` và không trong giai đoạn `render`.

## Render early with Suspense

Phần thứ hai của ví dụ trên là chúng tôi đang lưu đối tượng từ `prefetchQuery` đến `state` và bắt đầu `render` `<IndexList />` ngay lập tức.

Mặt khác, chúng tôi cũng không muốn `render` danh sách với dữ liệu trống, vì vậy lý tưởng nhất, chúng tôi muốn có thể tạm dừng `render` cho đến khi chúng tôi có tất cả dữ liệu mà không cần viết `if (isLoading) return null`.

May mắn thay, chúng tôi có `Suspense component` cho chính mục đích đó.

`Suspense` là một cơ chế để các thư viện tìm nạp dữ liệu giao tiếp với `React` rằng dữ liệu mà `component` đang đọc chưa sẵn sàng.

`React` sau đó có thể đợi nó sẵn sàng và cập nhật UI.

Hãy để tôi chỉ cho bạn một ví dụ:

```
const IndexList = ({ prefetchedIndexes }) => {
  const data = usePrefetchedQuery(prefetchedIndexes);

  return data.majorIndexesList.map(index => (
    <div key={index.ticker}>
      Show {index.ticker}
    </div>
  ));
};

const App = () => {
  const [prefetchedIndexes, setPrefetchedIndexes] = useState();

  return (
    <>
      <button
        onClick={() => {
            setPrefetchedIndexes(prefetchQuery(`${API}/majors-indexes`));
        }}
      >
        Load all indexes
      </button>
      {prefetchedIndexes && (
        <Suspense fallback={<span>Loading indexes list...</span>}>
          <IndexList prefetchedIndexes={prefetchedIndexes} />
        </Suspense>
      )}
    </>
  );
};
```

Để tận dụng `Suspense`, bạn chỉ cần bọc thành phần của mình với nó. Nó chấp nhận một `fallback prop`: yếu tố mà bạn muốn hiển thị trong khi chờ dữ liệu.

## How To Fetch Data in Sync With Suspense?

Bây giờ bạn đã biết về `Suspense` và thực hành tìm nạp trước, bạn tự hỏi làm thế nào tất cả điều này hoạt động cùng nhau. Vì vậy, đây là mảnh cuối cùng của câu đố này. Để giải quyết nó, hãy để cuối cùng hãy kiểm tra `prefetchQuery` chức năng.

```
function wrapPromise(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    r => {
      status = "success";
      result = r;
    },
    e => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}

// Function that reads resource object
// It could also include Cache logic
export const usePrefetchedQuery = prefetchedQuery => prefetchedQuery.read();

export const prefetchQuery = (input, init) => {
  // Make fetch request
  const promise = fetch(input, init).then(response => response.json());

  // Return resource for Suspense
  return wrapPromise(promise);
};
```

Đừng sợ hãi vì sự phức tạp của nó, nó thực sự khá đơn giản.

Đầu tiên, chúng tôi lấy một `URL` và chuyển nó đến `native fetch`, đem về chức năng, nhận `promise` và chuyển nó đến `wrapPromise`.

Hàm này trả về một đối tượng với `read() method`.

* Nếu `promise` vẫn đang chờ xử lý, chúng tôi sẽ `return promise` này.
* Nếu `promise` được giải quyết có lỗi, chúng tôi `raise errors`.
* Nếu `promise` được giải quyết, chỉ cần trả lại dữ liệu.

Trên thực tế, sự khác biệt duy nhất mà chúng ta có, so với các cách tìm nạp truyền thống, là đưa ra một `promise` đang chờ xử lý.

Khi bạn có `usePrefetchedQuery` trong `IndexList`, nó chỉ thực hiện `read() method`. Nếu dữ liệu chưa có, nó sẽ đưa ra một `promise` trước khi thực sự đưa ra bất cứ điều gì và `Suspense` sẽ nắm bắt được điều đó.

## How To Experiment With This?

Nhóm `React` đã giới thiệu một thực nghiệm `release branch` với `API modern`.

Đối với điều đó, bạn cần phải chạy 

```
npm i react@experimental react-dom@experimental
```

 và thử với nó dưới `local`. Tôi cũng đã tạo một ví dụ trực tiếp trên `CodeSandbox` cho bạn thấy mọi thứ tôi đã làm cùng nhau trong một dự án.
 
 Cảm ơn và hi vọng bài viết có ích trong công việc của bạn.
# Introduction:
React Hooks is a new feature added in React 16.8 that allows you to use React features such as state without writing a class.

Before React Hooks, there was a problem that logic reuse depended on the component and it was difficult to modularize the logic alone.

However, by using React Hooks' custom hook, which is a function to create your own hook, you can reuse only the logic without depending on View.

In this article, I'll show you how to use React Hooks by watching how it improves from v1 to v6.

In the following example, the amount of code in the component is reduced as follows.

![](https://images.viblo.asia/4c5f9f92-42df-4312-a999-585ed6743dc1.png)

# Introduce Example:

Create a useLocalHistory custom hook that implements pagination between components.

It's like the history API of your browser.

https://oh7c3.csb.app/

# v1 custom hook unused:
This component has a mix of View and logic, which makes the code difficult to read and test the logic.
* Page.tsx

```
import React, { useState } from "react";

export const Page = () => {
  const topPage = 1;
  const lastPage = 4;
  const initHistory: number[] = [topPage];
  const [history, setHistory] = useState<number[]>(initHistory);

  const currentPage = history[history.length - 1];

  return (
    <div>
      <div>currentPage: {currentPage}</div>
      <button
        onClick={() => {
          // not change if it is currently the top page
          if (currentPage === topPage) {
            return;
          }
          const nextHistory = [...history, topPage];
          setHistory(nextHistory);
        }}
      >
        Top
      </button>
      <button
        onClick={() => {
          const nextPage = currentPage + 1;
          // I can't go beyond the last page
          if (lastPage < nextPage) {
            return;
          }
          const nextHistory = [...history, nextPage];
          setHistory(nextHistory);
        }}
      >
        Next
      </button>
      <button
        onClick={() => {
          // I can't go back before the top page
          if (history.length <= 1) {
            return;
          }
          const nextHistory = [...history.slice(0, history.length - 1)];
          setHistory(nextHistory);
        }}
      >
        Back
      </button>
      <button
        onClick={() => {
          // Does not move if it is currently the last page
          if (currentPage === lastPage) {
            return;
          }
          const nextHistory = [...history, lastPage];
          setHistory(nextHistory);
        }}
      >
        Last
      </button>
      <button
        onClick={() => {
          setHistory(initHistory);
        }}
      >
        Delete History
      </button>
    </div>
  );
}; 
```
https://codesandbox.io/s/custom-hook-v1-tv2un

# v2 Custom hook:
Separate the logic from the component into custom hooks.

The history is hidden in a custom hook because the only information the component needs is:

The value is currentPage

The operations are Top, Next, Back, Last, Reset
* Page.tsx
```
import React from "react";
import { useLocalHistory } from "./useLocalHistory";

export const Page: React.FC = () => {
  const topPage = 1;
  const lastPage = 4;

  const [currentPage, Top, Next, Back, Last, Reset] = useLocalHistory(
    topPage,
    lastPage
  );

  return (
    <div>
      <div>Current page: {currentPage}</div>
      <button onClick={Top}>Top</button>
      <button onClick={Next}>Next</button>
      <button onClick={Back}>Back</button>
      <button onClick={Last}>Last</button>
      <button onClick={Reset}>Reset</button>
    </div>
  );
};
```

* useLocalHistory.ts
```
import { useState } from "react";

export const useLocalHistory = (
  topPage: number,
  lastPage: number
): [number, () => void, () => void, () => void, () => void, () => void] => {
  const initHistory: number[] = [topPage];
  const [history, setHistory] = useState<number[]>(initHistory);

  const currentPage = history[history.length - 1];

  const Top = (): void => {
    // Not change if current page is top
    if (currentPage === topPage) {
      return;
    }
    const nextHistory = [...history, topPage];
    setHistory(nextHistory);
  };

  const Next = (): void => {
    const nextPage = currentPage + 1;

    // cannot next beyond last page
    if (lastPage < nextPage) {
      return;
    }
    const nextHistory = [...history, nextPage];
    setHistory(nextHistory);
  };

  const Back = (): void => {
    // can not forward beyond top page
    if (history.length <= 1) {
      return;
    }
    const nextHistory = [...history.slice(0, history.length - 1)];
    setHistory(nextHistory);
  };

  const Last = (): void => {
    // can not move if current page is last
    if (currentPage === lastPage) {
      return;
    }
    const nextHistory = [...history, lastPage];
    setHistory(nextHistory);
  };

  const Reset = (): void => {
    setHistory(initHistory);
  };

  return [currentPage, Top, Next, Back, Last, Reset];
};
```

https://codesandbox.io/s/custom-hook-v2-phjz4

The Page component is very readable, with a focus on View related implementations.

# Definition of v3 interface

Define a LocalHistory interface in `useLocalHistory.ts` that provides history functionality.

The Page component operates through the LocalHistory interface.

* Page.tsx
```
import React from "react";
import { useLocalHistory } from "../../utils/useLocalHistory";

export const Page: React.FC = () => {
  const topPage = 1;
  const lastPage = 4;

  const [currentPage, history] = useLocalHistory(topPage, lastPage);

  return (
    <div>
      <div>currentPage: {currentPage}</div>
      <button onClick={history.Top}>Top</button>
      <button onClick={history.Next}>Next</button>
      <button onClick={history.Back}>Back</button>
      <button onClick={history.Last}>Last</button>
      <button onClick={history.Reset}>Reset</button>
    </div>
  );
};
```
* useLocalHistory.ts
```
import { useState } from "react";

interface LocalHistory {
  Top: () => void;
  Next: () => void;
  Back: () => void;
  Last: () => void;
  Reset: () => void;
}

export const useLocalHistory = (
  topPage: number,
  lastPage: number
): [number, LocalHistory] => {
  const initHistory: number[] = [topPage];
  const [history, setHistory] = useState<number[]>(initHistory);

  const currentPage = history[history.length - 1];

  const Top = (): void => {
    // Not change if current page is top
    if (currentPage === topPage) {
      return;
    }
    const nextHistory = [...history, topPage];
    setHistory(nextHistory);
  };

  const Next = (): void => {
    const nextPage = currentPage + 1;

    // cannot next beyond last page
    if (lastPage < nextPage) {
      return;
    }
    const nextHistory = [...history, nextPage];
    setHistory(nextHistory);
  };

  const Back = (): void => {
    // cannot go forward beyond top page
    if (history.length <= 1) {
      return;
    }
    const nextHistory = [...history.slice(0, history.length - 1)];
    setHistory(nextHistory);
  };

  const Last = (): void => {
    // can not move if current page is last
    if (currentPage === lastPage) {
      return;
    }
    const nextHistory = [...history, lastPage];
    setHistory(nextHistory);
  };

  const Reset = (): void => {
    setHistory(initHistory);
  };

  return [currentPage, { Top, Next, Back, Last, Reset }];
};
```
https://codesandbox.io/s/custom-hook-v3-cb016

By defining the LocalHistory interface, the relevance of a series of operations became clear.

It also makes it easier to pass a series of operations to other components.

# Separate v4 data structures into separate custom hooks:
Local History is realized by the data structure of Stack (LIFO).

Cut this out as a useStack custom hook.

Since the custom hook can be configured in multiple stages, useStack cut out from useLocalHistory is executed.

The Page component remains the same and will be omitted.
* useLocalHistory.ts
```
import { useStack } from "./useStack";

export interface LocalHistory {
  Top: () => void;
  Next: () => void;
  Back: () => void;
  Last: () => void;
  Reset: () => void;
}

export const useLocalHistory = (
  topPage: number,
  lastPage: number
): [number, LocalHistory] => {
  const initHistory: number[] = [topPage];
  const [currentPage, stack] = useStack<number>(initHistory);

  const Top = (): void => {
    // Not change if current page is top
    if (currentPage === topPage) {
      return;
    }
    stack.Push(topPage);
  };

  const Next = (): void => {
    const nextPage = currentPage + 1;

    // cannot next beyond last page
    if (lastPage < nextPage) {
      return;
    }
    stack.Push(nextPage);
  };

  const Back = (): void => {
    // cannot go forward beyond top page
    if (stack.Length() <= 1) {
      return;
    }
    stack.Pop();
  };

  const Last = (): void => {
    // cannot next beyond last page
    if (currentPage === lastPage) {
      return;
    }
    stack.Push(lastPage);
  };

  const Reset = (): void => {
    stack.Reset();
  };

  return [currentPage, { Top, Next, Back, Last, Reset }];
};
```
* useStack.ts
```
import { useState } from "react";

export interface Stack<T> {
  Pop: () => void;
  Push: (v: T) => void;
  Reset: () => void;
  Length: () => number;
}

// Define the Stack data structure as a custom hook
export const useStack = <T>(init?: T[]): [T, Stack<T>] => {
  const initStack: T[] = init ?? [];
  const [stack, setStack] = useState<T[]>(initStack);

  const Pop = (): void => {
    if (stack.length === 0) {
      return;
    }

    const newStack = [...stack.slice(0, stack.length - 1)];
    setStack(newStack);
  };

  const Push = (v: T): void => {
    const newStack = [...stack, v];
    setStack(newStack);
  };

  const Reset = (): void => {
    setStack(initStack);
  };

  const Length = (): number => stack.length;

  return [stack[stack.length - 1], { Pop, Push, Reset, Length }];
};
```
https://codesandbox.io/s/custom-hook-v4-mn2ub

As a result, useLocalHistory has only the control of screen transition as logic without being aware of the implementation details of Stack.

Also, although not explained in detail, setState also has a way to receive and update the previous state.

https://codesandbox.io/s/custom-hook-v41-hokuq

# v5 Use useReducer instead of useState

v4 useStack requires you to know the current state in order to add or remove from the array.

This is not a problem, but if you want to perform update processing that depends on the previous state, such as when operating a part of an array or object, use useReducer instead of `useState` to describe it more concisely. You will be able to.

```
useStack.ts
import { useReducer } from "react";

type StackState<T> = T[];

type StackAction<T> =
  | { type: "ACTION_POP" }
  | { type: "ACTION_PUSH"; value: T }
  | { type: "ACTION_RESET"; initStack: T[] };

const stackReducer = <T>() => (
  stack: StackState<T>,
  action: StackAction<T>
): StackState<T> => {
  switch (action.type) {
    case "ACTION_POP":
      if (stack.length === 0) {
        return stack;
      }
      return [...stack.slice(0, stack.length - 1)];
    case "ACTION_PUSH":
      return [...stack, action.value];
    case "ACTION_RESET":
      return action.initStack;
  }
};

export interface Stack<T> {
  Pop: () => void;
  Push: (v: T) => void;
  Reset: () => void;
  Length: () => number;
}

export const useStack = <T>(init?: T[]): [T, Stack<T>] => {
  const initStack: T[] = init ?? [];
  const [stack, dispatch] = useReducer(stackReducer<T>(), initStack);

  // The previous state is not required, only the Action to be executed and the values required for the Action are required.
  const Pop = (): void => dispatch({ type: "ACTION_POP" });
  const Push = (value: T): void => dispatch({ type: "ACTION_PUSH", value });
  const Reset = (): void => dispatch({ type: "ACTION_RESET", initStack });
  const Length = (): number => stack.length;

  return [stack[stack.length - 1], { Pop, Push, Reset, Length }];
};
```
In v4, the useStack function was procedural code that used the previous state of the stack, but in v5, like ACTIONS_POP, it is now enough to fire an event without knowing the previous state. Also, the reducer does not need to write procedural code, and can achieve the purpose simply by returning a new state.

This writing method may be familiar to those who wrote Redux, but basically use `useState` as described in the official document. We recommend that you use useReducer only if you have complex state logic involving multiple values or if the next state depends on the previous state.

https://codesandbox.io/s/custom-hook-v5-38z1m

# Separation of v6 Container component and Presentational component
Separate the layers that cause side effects.

In Redux, the framework forces the layers that perform connect to be separated, which is the same design policy.

Since `useLocalHistory` and `useStack` are similar, they are omitted.
```
Page.tsx
import React from "react";
import { LocalHistory, useLocalHistory } from "./useLocalHistory";

// Container component
export const PageContainer: React.FC = () => {
  const topPage = 1;
  const lastPage = 4;

  const [currentPage, history] = useLocalHistory(topPage, lastPage);
  return <Page currentPage={currentPage} history={history} />;
};

interface PageProps {
  currentPage: number;
  history: LocalHistory;
}

// Presentational component
const Page: React.FC<PageProps> = ({ currentPage, history }: PageProps) => {
  return (
    <div>
      <div>currentPage: {currentPage}</div>
      <button onClick={history.Top}>Top</button>
      <button onClick={history.Next}>Next</button>
      <button onClick={history.Back}>Back</button>
      <button onClick={history.Last}>Last</button>
      <button onClick={history.Reset}>Reset</button>
    </div>
  );
};
```
https://codesandbox.io/s/custom-hook-v6-yqrx4

This makes the Page component a pure function that takes an argument and returns a return value.

It's great that View becomes a pure function, which is unthinkable in old GUI development.

However, it is not always necessary to adopt this as well. Please make an appropriate decision when deciding to hire.

# Summary
The following improvements have been made from v1 to v6.

Presentation Domain Separation

Delegation of common data structures from logic

history History does not pass to Page component Information hiding (encapsulation)

Interface Definition Open Closed Principle (OCP)

Functionization of Page component Receives side effects as arguments without getting them internally

Clarification of design intent for each module Single-responsibility principle (SRP)

These separate the view from the logic, improving reusability, readability, and testability.


With the advent of custom hooks in React Hooks, you can encapsulate state and implementation details, exposing only the values ​​and interfaces you need for your components.

As with PDS, delegation, encapsulation, and SOLID principles (OCP, SRP), universal design capabilities that are no different from the object-oriented design that has been cultivated up to now are required. It does not require the design capabilities specific to React Hooks.

If you actually compare the custom hook and the class as follows, you can see that they are similar.

* class
1. Status: Member field
2. Operation: Method 
3. Initialization: Constructor
* Custom hook
1. State: useState
2. Operation: Function
3. Initialization: Hook arguments


Even if you compare the implemented code, there is no big difference in the basic expression.

# The world realized by React Hooks
Until now, the logic of React depends on the life cycle of React components, and there was a problem that it was difficult to modularize the logic alone and it was not reusable. But with the advent of React Hooks, it's improved.

Therefore, the useStack and useLocalHistory developed this time do not depend on View, so it can be used according to your use case.

In this way, it has become a world where React logic can be easily shared as OSS.

This is the biggest advantage over being able to design the code neatly.

# OSS
From now on, it's a good idea to take a look at OSS's React Hooks before writing your own state-based processing.

You'll probably find a better implementation as OSS that is more sophisticated than the one you came up with.

It will also be very helpful if you implement it yourself.

https://github.com/streamich/react-use/

https://nikgraf.github.io/react-hooks/

https://usehooks.com/
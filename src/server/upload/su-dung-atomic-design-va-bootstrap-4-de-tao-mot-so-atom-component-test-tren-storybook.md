Trong bài post [trước](https://viblo.asia/p/cung-dev-va-test-ui-trong-react-voi-storybook-Do754jn3ZM6) mình đã giới thiệu với các bạn về [storybook](https://storybook.js.org/), setup và demo. Hôm nay mình sẽ base theo atomic design, boostrap 4 để tạo một số atom đơn giản để test trên storybook nhé!

## 1. Tạo một số atom đơn giản
Chúng ta sẽ tạo một số atom component đơn giản dùng trong form như là button, input, checkbox, radio, ...


### Button
Vâng đơn giản nhất chắc có lẽ là button rồi =)).
Chúng ta sẽ base theo boostrap và sẽ thêm các cách mà button có thể hiện thị(ở đây mình gọi là appearance :D)

```javascript
export const defaultAppearance = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'info',
  LIGHT: 'light',
  DARK: 'dark',
};
```

Đối với mỗi Appearance thì button sẽ có những ý nghĩ khác nhau như primary button nếu chúng ta muốn button đó sẽ thực hiện xử lý chính khi click vào, hoặc như secondary button đại diện cho những xử lý phụ khi đã có xử lý chính và cũng tùy theo cách định nghĩa của mỗi người nữa.

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { defaultAppearance } from '../../../constants';

export const ButtonAppearance = {
  ...defaultAppearance,
  LINK: 'link',
};

export const ButtonSize = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
};

export const ButtonType = {
  BUTTON: 'button',
  RESET: 'reset',
  SUBMIT: 'submit',
};

export function Button(props) {
  const {
    appearance,
    children,
    className,
    isOutline,
    size,
    type,
    onClick,
    ...restProps,
  } = props;
  const additionalClassNames = classNames(
    'btn',
    `btn${isOutline ? '-outline' : ''}-${appearance}`,
    `btn-${size}`,
    className,
  );

  return (
    <button
      appearance={appearance}
      type={type}
      className={additionalClassNames}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  appearance: PropTypes.oneOf(Object.values(ButtonAppearance)),
  children: PropTypes.oneOfType([
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  isOutline: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(ButtonSize)),
  type: PropTypes.oneOf(Object.values(ButtonType)),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  appearance: ButtonAppearance.PRIMARY,
  className: '',
  isOutline: false,
  size: ButtonSize.MEDIUM,
  type: ButtonType.BUTTON,
  onClick: () => { },
}

export default Button;
```

Tiếp đến là phần code(code này chưa tối ưu và khá đơn giản nhé mong anh em thông cảm :D). Component này sẽ nhận vào appearance để hiển thị tương ứng, cùng đó là một số props khác như size(có small, large và medium sẽ là default) để set size cho button, isOutline để check button là outline hay normal, type(button, submit, reset) để có thể tùy chọn.

Tiếp tục khi chúng ta code xong phần component rùi thì chúng ta sẽ start viết `stories` cho nó.
```javascript
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import { defaultAppearance } from '../../../constants';
import Button, { ButtonSize, ButtonAppearance } from './';
import Badge from '../Badge';

const buttonStories = storiesOf('Atoms>> Button', module);
const Wrapper = styled.div`
  padding: 1.5rem;
  margin-right: 0;
  margin-left: 0;
`;

Object.keys(ButtonAppearance).forEach(appearance => {
  buttonStories.add(
    appearance,
    () => {
      return (
        <Wrapper>
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Normal</th>
                <th scope="col">Disabled</th>
                <th scope="col">Outline</th>
                <th scope="col">Large</th>
                <th scope="col">Small</th>
                <th scope="col">With badge</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Button
                    appearance={ButtonAppearance[appearance]}
                    onClick={action(('button-click'))}
                  >
                    {appearance}
                  </Button>
                </td>
                <td>
                  <Button
                    appearance={ButtonAppearance[appearance]}
                    disabled
                    onClick={action('button-click')}
                  >
                    {appearance}
                  </Button>
                </td>
                <td>
                  {
                    ButtonAppearance[appearance] !== ButtonAppearance.LINK
                      && (
                        <Button
                          appearance={ButtonAppearance[appearance]}
                          isOutline
                          onClick={action('button-click')}
                        >
                          {appearance}
                        </Button>
                      )
                  }
                </td>
                <td>
                  <Button
                    appearance={ButtonAppearance[appearance]}
                    size={ButtonSize.LARGE}
                    onClick={action('button-click')}
                  >
                    {appearance}
                  </Button>
                </td>
                <td>
                  <Button
                    appearance={ButtonAppearance[appearance]}
                    size={ButtonSize.SMALL}
                    onClick={action('button-click')}
                  >
                    {appearance}
                  </Button>
                </td>
                <td>
                  {
                    (ButtonAppearance[appearance] !== ButtonAppearance.LIGHT
                      && ButtonAppearance[appearance] !== ButtonAppearance.LINK
                    )
                      && (
                        <Button
                          appearance={ButtonAppearance[appearance]}
                          size={ButtonSize.SMALL}
                          onClick={action('button-click')}
                        >
                          {appearance} <Badge appearance={defaultAppearance.LIGHT}>+99</Badge>
                        </Button>
                      )
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </Wrapper>
      )
    },
  )
});
```
Phần viết stories thì khá đơn giản. Chúng ta sẽ map theo `defaultAppearance` để add những case vào thui.

Và đây là kết quả :D


**Primary**
![button-primary](https://image.ibb.co/nbi330/button-primary.png)
**Secondary**
![button-secondary](https://image.ibb.co/dGUMqf/button-secondary.png)
**Success**
![button-success](https://image.ibb.co/iZc7Vf/button-success.png)
**Darnger**
![button_danger](https://image.ibb.co/kMZzbL/button-danger.png)
**Warning**
![button-warning](https://image.ibb.co/gOD330/button-warning.png)
**Info**
![button-info](https://image.ibb.co/bG77Vf/button-info.png)
**Light**
![button-light](https://image.ibb.co/jFH7Vf/button-light.png)
**Dark**
![button-dark](https://image.ibb.co/cb6CwL/button-dark.png)
**Link**
![button-link](https://image.ibb.co/keCKbL/button-link.png)

### Alert
Phần này mình sẽ chỉ show phần kết quả của mình thôi nhé! Phần code sẽ chủ yếu na ná giống của `Button`.

**Primary**
![alert-primary](https://image.ibb.co/ndpeRL/alert-primary.png)
**Secondary**
![alert-secondary](https://image.ibb.co/iJyv0f/alert-secondary.png)
**Success**
![alert-success](https://image.ibb.co/jqSzRL/alert-success.png)
**Danger**
![alert-danger](https://image.ibb.co/dab4t0/alert-danger.png)
**Warning**
![alert-warning](https://image.ibb.co/dKRtmL/alert-warning.png)
**Info**
![alert-info](https://image.ibb.co/nrwhff/alert-info.png)
**Light**
![alert-light](https://image.ibb.co/djscD0/alert-light.png)
**Dark**
![alert-dark](https://image.ibb.co/fk08Lf/alert-dark.png)

### Badge
![badge](https://image.ibb.co/ewfYLf/badge.png)

### Checkbox
![checkbox](https://image.ibb.co/c4kKRL/checkbox.png)

### Radio
![radio](https://image.ibb.co/m3vKRL/radio.png)


## 2. Tổng kết
Vậy là chúng ta đã có một số atom component đơn giản, sẽ còn rất nhiều atom component nữa để dựng nên một UI đẹp. Đây mới chỉ là atom thui chúng ta còn phải gép các đơn vị `atom` để tạo nên `molecule` nữa, lớn hơn nữa `organism` và cuối cùng lắp vào `template` chúng ta sẽ có một `page` hoàn chỉnh.

Vâng mình đã demo xong với anh em về một số atom sử dụng boostrap 4 và atomic design. Đồng thời đưa nó lên `storybook` lun. Có thể trong phần tiếp theo mình sẽ gắn những atom này để những molecule component phức tạp hơn. Cảm ơn anh em đã dành thời gian đọc bài viết này. Hẹn gặp lại trong những bài post sau :D

![youcandoit](https://image.ibb.co/hxf8we/Bestyoucandpoitmeme.jpg)
# Introduction
I will make this memorandum to review the previous code and I wondered if I could create a Layout tag.

It is described to keep things simple and organized.

Please let me know if there is a better way. Sorry for any typos.

# code
`Layout.jsx` and `UseLayout.jsx` are at the same level. In fact, it's better to split them out

If you want to make Typescript, Children can go and feel good if you import and assign `ReactElement` from `react`.
`children: ReactElement <any> ` Like this.

### Layout.jsx
```
import React, { Fragment, cloneElement } from "react";

const Layout = props => {
  const { title, children } = props;
  return (
    <Fragment>
      <div>
        {title}
      </div>
      {cloneElement(children)}
    </Fragment>
  )
}

export default Layout;
```


### UseLayout.jsx
```
import React from "react";
import Layout from "./Layout";

const UseLayout = () => (
  <Layout title="This is Layout">
    <div>
      Put component here
      <button>This is button</button>
    </div>
  </Layout>
)
```

# In case creating a dialog or change the event dynamically
When you want to apply a dialog similar to material-ui of multiple pages

However, in case you want to change the event

I am writing in TypeScript, but if you want to use JavaScript, delete the `props`:

change `= ({children, title, ...}) =>` to `= props =>` 

### Dialog.tsx
```
import React, { cloneElement, ReactElement } from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

type Props = {
  children: ReactElement<any>,
  title: string,
  description: string,
  disagree: string,
  agree: string,
  action?: Function | null,
}

const Dialog: React.FC<Props> = ({
  children,
  title,
  description,
  disagree,
  agree,
  action = null,
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <span>
      {cloneElement(children, {onClick: () => setOpen(true)})}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {descriotion}
          <DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            {disagree}
          </Button>
          <Button onClick={() => {
            action !== null & action()
            setOpen(false);
          }}>
            {agree}
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  )
}
```
### Explanation
Children received from the top can be received as `Dialog.tsx` as components,

```
<Layout>
  <Button>Click!</Button>
</Layout>
```
The title, OK button, NG button and description are mandatory arguments this time.

```
<Layout
  title="test"
  description="OK or NG?"
  disagree="button NG"
  agree="button OK"
  action={() => concole.log("OK or NG is clicked")}
>
  <Button>Click</Button>
</Layout>
```

And I will set the action for each component

You can execute the function by passing the function you want to execute to action.

When using `react-redux`, you can also apply `dispatch` to action.
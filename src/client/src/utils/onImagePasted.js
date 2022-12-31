// import { fileUpload } from '../../../../../libs/firebase/storage';

import { md5 } from 'utils/md5';
import { buildPath } from './helpers';
import { getTokenLocal, parseJwt } from './token';

export const insertToTextArea = (insertString) => {
  const textarea = document.querySelector('textarea');
  if (!textarea) {
    return null;
  }

  let sentence = textarea.value;
  const len = sentence.length;
  const pos = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const front = sentence.slice(0, pos);
  const back = sentence.slice(pos, len);

  sentence = front + insertString + back;

  textarea.value = sentence;
  textarea.selectionEnd = end + insertString.length;

  return sentence;
};

const API_ENDPOINT = 'http://localhost:2022';

const onImagePasted = async (dataTransfer, setMarkdown) => {
  const files = [];
  for (let index = 0; index < dataTransfer.items.length; index += 1) {
    const file = dataTransfer.files.item(index);

    if (file) {
      files.push(file);
    }
  }

  const token = getTokenLocal();

  const { username } = parseJwt(token);

  await Promise.all(
    files.map(async (file) => {
      if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
        alert('not an image');
      }

      const s = username + Date.now().toString();
      const form = new FormData();
      const newRenamedFile = new File([file], `${file.name.split('.').at(-2)}-${md5(s)}.${file.name.split('.').at(-1)}`);
      console.log(newRenamedFile.name);
      form.append('image', newRenamedFile);

      const uploadResponse = await fetch(buildPath(API_ENDPOINT, 'upload-image'), {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   'X-FP-API-KEY': 'iphone', // it can be iPhone or your any other attribute
        //   'Content-Type': 'application/json',
        // },
        method: 'POST',
        body: form,
      });

      const status = await uploadResponse.json();

      if (status.filename) {
        const url = buildPath(API_ENDPOINT, 'image', status.filename);
        const insertedMarkdown = insertToTextArea(`![](${url.replaceAll(' ', '%20')})`);
        if (!insertedMarkdown) {
          return;
        }
        setMarkdown(insertedMarkdown);
      } else {
        console.error(status);
      }
    }),
  );
};

export default onImagePasted;

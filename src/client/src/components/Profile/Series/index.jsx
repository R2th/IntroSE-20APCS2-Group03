import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function SaveList() {
  const [setValue] = useOutletContext();

  useEffect(() => {
    setValue(1);
  }, []);

  return <div>SaveList</div>;
}

export default SaveList;

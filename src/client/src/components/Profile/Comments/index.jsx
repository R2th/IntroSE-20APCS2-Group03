import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function UserComments() {
  const [setValue] = useOutletContext();

  useEffect(() => {
    setValue(0);
  }, []);
  return <div>User Comments</div>;
}

export default UserComments;

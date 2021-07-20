import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OperationNav = (props) => {
  const { url } = props;

  const [tab, setTab] = useState(1);

  const handleTabChange = (num) => {
    setTab(num);
  };

  return (
    <div className="operations-nav-buttons">
      <Link
        to={`${url}`}
        className={
          tab === 1
            ? `operation-nav-tag bg-success`
            : `operation-nav-tag bg-disable`
        }
        onClick={() => handleTabChange(1)}
      >
        Buy
      </Link>

      <Link
        to={`${url}/sell`}
        className={
          tab === 2
            ? `operation-nav-tag bg-danger`
            : `operation-nav-tag bg-disable`
        }
        onClick={() => handleTabChange(2)}
      >
        Sell
      </Link>

      <Link
        to={`${url}/collapse`}
        className={
          tab === 3
            ? `operation-nav-tag bg-check`
            : `operation-nav-tag bg-disable`
        }
        onClick={() => handleTabChange(3)}
      >
        Collapse
      </Link>
    </div>
  );
};

export default OperationNav;

import React from 'react';
import PropTypes from 'prop-types';

import { useAutoFetch } from '../../../utils/auto-fetch';

const AutoFetchWrapper = ({ config, children }) => {
  const {
    results, isDataLoading, error, refreshData,
  } = useAutoFetch(config);
  return React.cloneElement(children, {
    data: results, loading: isDataLoading, error, refreshData,
  });
};
AutoFetchWrapper.propTypes = {
  config: PropTypes.shape({
    endpoint: PropTypes.string,
    params: PropTypes.object,
    handleData: PropTypes.func,
  }).isRequired,
};

export default AutoFetchWrapper;

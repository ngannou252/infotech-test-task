import './style/index.css';
import React from 'react';

interface IHTTPErrorAlertProps {
  message: string;
  onRetry?: () => void;
}

export const HTTPErrorAlert: React.FC<IHTTPErrorAlertProps> = ({ message, onRetry }) => {
  return (
    <div className='httpErrorAlert' role='alert' aria-live='polite'>
      <div className='httpErrorAlertTitle'>Request failed</div>
      <div className='httpErrorAlertMessage'>{message}</div>
      {onRetry && (
        <button type='button' className='httpErrorAlertRetryButton' onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};

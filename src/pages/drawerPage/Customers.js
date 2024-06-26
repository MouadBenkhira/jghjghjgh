import React from 'react';

export default function Customers() {
  return (
    <div className='chupa' style={styles.chupa}>
      <iframe
        allow="microphone;"
        width="1000"
        height="600"
        src="https://console.dialogflow.com/api-client/demo/embedded/7a58a929-6a85-44f4-9375-d73d423405f8">
      </iframe>
    </div>
  );
}

const styles = {
  chupa: {
    marginTop: -90,

  }
};

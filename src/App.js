import React from 'react';

function ChildIframe({ targetButton }) {
  const handleIframeMessage = (event) => {
    // Ensure the message is from the correct origin (the parent domain)
    if (event.origin === 'http://localhost:3000') {
      // Here, event.data will contain the message sent from the parent
      console.log('Received message from parent:', event.data);
      // Implement your logic to process the message from the parent (if needed).
    }
  };

  const handleButtonClick = () => {
    // Send a message to the parent with the button identifier
    window.parent.postMessage(targetButton, 'http://localhost:3000');

    // Add a trigger to search for "Go to Google" on the parent page
    window.parent.searchFunction('Go to Google');
  };

  React.useEffect(() => {
    // Add an event listener to listen for messages from the parent
    window.addEventListener('message', handleIframeMessage);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('message', handleIframeMessage);
    };
  }, []);

  return (
    <div>
      {/* Your iframe content */}
      <h2>Child Webpage Content Acts as Chatbot</h2>
      <button onClick={handleButtonClick}>Search for Button</button>
    </div>
  );
}

export default ChildIframe;

document.getElementById('sendBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const targetIP = document.getElementById('targetIP').value.trim();

    // Validate the target IP address format and file input
    if (!targetIP || !/^\d{1,3}(\.\d{1,3}){3}$/.test(targetIP)) {
        alert('Please enter a valid target IP address.');
        return;
    }

    if (fileInput.files.length === 0) {
        alert('Please select a file to send.');
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    // Perform the fetch request to send the file
    fetch(`http://${targetIP}:3000/upload`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        alert('File uploaded successfully!');
        console.log('Response:', data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while sending the file. Please check the console for details.');
    });
});

document.getElementById('receiveBtn').addEventListener('click', () => {
    alert('Feature to receive file not implemented yet.');
});

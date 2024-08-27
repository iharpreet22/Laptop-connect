const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable file uploads
app.use(fileUpload());

// Enable CORS for communication between different IPs
app.use(cors());

app.post('/upload', (req, res) => {
    let uploadedFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // Access the uploaded file
    uploadedFile = req.files.file;
    uploadPath = path.join(__dirname, 'uploads', uploadedFile.name);

    // Move the file to the uploads directory
    uploadedFile.mv(uploadPath, function(err) {
        if (err) {
            return res.status(500).send(err);
        }

        res.send('File uploaded successfully!');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

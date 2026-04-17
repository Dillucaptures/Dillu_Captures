const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const IMAGE_DIR = path.join(__dirname, 'Images');

app.use('/Images', express.static(IMAGE_DIR));
app.use(express.static(__dirname));

app.get('/api/images', (req, res) => {
  fs.readdir(IMAGE_DIR, (err, files) => {
    if (err) return res.status(500).json([]);

    const images = files
      .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
      .map(f => ({
        src: 'Images/' + f,
        category: f.split('_')[0].toLowerCase()
      }));

    res.json(images);
  });
});

app.listen(PORT, () => console.log("Running on http://localhost:3000"));

const express = require('express');
const admin = require('firebase-admin');

const app = express();
const PORT = 3000;

// Initialize Firebase admin with your service account credentials
const serviceAccount = require('./path/to/your/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Get a reference to the Firestore database
const db = admin.firestore();

app.use(express.json());

app.post('/api/images', async (req, res) => {
  try {
    const { imageURL, tag } = req.body;
    const imageRef = db.collection('images').doc();
    await imageRef.set({ imageURL, tag });
    res.status(201).json({ id: imageRef.id, imageURL, tag });
  } catch (error) {
    res.status(500).json({ message: 'Error creating image' });
  }
});

app.get('/api/images', async (req, res) => {
  try {
    const imagesSnapshot = await db.collection('images').get();
    const images = imagesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

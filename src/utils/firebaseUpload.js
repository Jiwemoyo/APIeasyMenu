const { ref, uploadBytes, getDownloadURL, deleteObject } = require('firebase/storage');
const { storage } = require('../../firebaseConfig');

async function uploadImageToFirebase(file) {
    const dateTime = Date.now();
    const fileName = `images/${dateTime}_${file.originalname}`;
    const storageRef = ref(storage, fileName);
    
    const snapshot = await uploadBytes(storageRef, file.buffer);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return { downloadURL, fileName };
}

async function deleteImageFromFirebase(fileName) {
    const storageRef = ref(storage, fileName);
    await deleteObject(storageRef);
}

module.exports = { uploadImageToFirebase, deleteImageFromFirebase };
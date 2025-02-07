        // Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAKgMQss3kTPKIwVzYe-XgVI7Bg15LG2s",
    authDomain: "oteach-database.firebaseapp.com",
    projectId: "oteach-database",
    storageBucket: "oteach-database.firebasestorage.app",
    messagingSenderId: "583862173659",
    appId: "1:583862173659:web:fcc9e849c17038633a71fe",
    measurementId: "G-SG955KJLJK"
};
          
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
          
// Reference to comments collection
const commentsRef = db.collection('comments');
          
                  // Handle form submission
document.querySelector('.comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const commentText = document.getElementById('comment').value;
    if (name && commentText) {
        await commentsRef.add({
            name: name,
            text: commentText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        // Clear form
        document.getElementById('name').value = '';
        document.getElementById('comment').value = '';
    }
});
// Real-time listener for comments
commentsRef.orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = '';
    snapshot.forEach(doc => {
        const comment = doc.data();
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <div class="comment-author">${comment.name}</div>
            <div class="comment-text">${comment.text}</div>
            <div class="comment-timestamp">${comment.timestamp?.toDate().toLocaleString() || 'Just now'}</div>
        `;
        commentsContainer.appendChild(commentElement);
    });
});
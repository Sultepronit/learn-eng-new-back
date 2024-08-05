import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 3000;
// const PORT = 3000;

console.log(PORT);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
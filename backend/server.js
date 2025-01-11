import express from 'express';
import multer from 'multer';
import path from 'path'
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http'; 
import { Server } from 'socket.io'; 
import AuthRouter from './Routes/AuthRouter.js';   
import bodyParser from 'body-parser';
import fs from 'fs';

// import AdminRouter from './Routes/AdminRoutes.js'; 
import './Models/db.js';  

dotenv.config();

const app = express();

// app.use(bodyParser.json({ limit: '50mb' })); // JSON payload limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // URL-encoded data limit


const PORT = process.env.PORT || 8000;

const uploadDir = path.join(process.cwd(), 'uploads');


// const uploadDir = path.join('uploads', req.file.filename);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use the correct directory path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});



const upload = multer({ storage: storage });

// Handle signup with file upload
app.post('/signup/employee/', upload.single('empPhoto'), (req, res) => {
  try {
    const { empName, empEmail, empPhone, empId, empPassword } = req.body;
    if (!req.file || !req.file.path) {
      return res.status(400).send({ message: 'File upload failed or missing' });
    }
    const empPhoto = req.file.path;
    

    // Save the employee data (e.g., in the database)
    res.status(200).send({ message: 'Employee signed up successfully!', empPhoto });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});




// Middleware
app.use(express.json());
// app.use(cors({ origin: 'http://localhost:5173/vite-depoly/' }));

app.use(cors());

app.use((req, res, next) => {
  console.log(`Payload size: ${JSON.stringify(req.body).length} bytes`);
  next();
});


// Create HTTP Server for Socket.IO
const server = createServer(app);

// WebSocket Server Setup
const io = new Server(server, {
    cors: {
        origin: '*', 
        methods: ['GET', 'POST'],
    },
});




// Routes
app.use('/auth', AuthRouter);    
// app.use('/admin', AdminRouter);  
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// Health Check Route
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

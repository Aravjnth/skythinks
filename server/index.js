require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skythinks';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Email Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Define Schema
const waitlistSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    academicYear: { type: String, required: true },
    department: { type: String, required: true },
    domain: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Waitlist = mongoose.model('Waitlist', waitlistSchema);

// Routes
app.get('/', (req, res) => {
    res.send('SkyThinks API is running');
});

app.post('/api/join', async (req, res) => {
    try {
        const { name, email, phone, academicYear, department, domain } = req.body;

        if (!email || !name || !phone) {
            return res.status(400).json({ error: 'Please fill in all required fields' });
        }

        // Check if email already exists
        const existingUser = await Waitlist.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const newEntry = new Waitlist({
            name,
            email,
            phone,
            academicYear,
            department,
            domain
        });
        await newEntry.save();

        const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

        // Send confirmation email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: '🎉 Welcome to SkyThinks - You\'re on the Waitlist!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to SkyThinks! 🚀</h1>
                    </div>
                    <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <p style="font-size: 16px; color: #374151; line-height: 1.6;">Hi <strong>${name}</strong>,</p>
                        <p style="font-size: 16px; color: #374151; line-height: 1.6;">
                            Thank you for joining the SkyThinks waitlist! We're thrilled to have you on board.
                        </p>
                        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #667eea; margin-top: 0;">Your Registration Details:</h3>
                            <p style="margin: 5px 0; color: #4b5563;"><strong>Academic Year:</strong> ${academicYear}</p>
                            <p style="margin: 5px 0; color: #4b5563;"><strong>Department:</strong> ${department}</p>
                            <p style="margin: 5px 0; color: #4b5563;"><strong>Interested Domain:</strong> ${domain}</p>
                        </div>
                        <p style="font-size: 16px; color: #374151; line-height: 1.6;">
                            You're now part of an exclusive group getting early access to our AI-powered placement preparation platform. 
                            We'll keep you updated on our launch and send you exclusive tips to ace your interviews!
                        </p>
                        <p style="font-size: 16px; color: #374151; line-height: 1.6;">
                            <strong>What's Next?</strong><br>
                            • We'll notify you as soon as we launch<br>
                            • Get exclusive early access features<br>
                            • Receive personalized career guidance tips
                        </p>
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="${clientUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">Visit SkyThinks</a>
                        </div>
                        <p style="font-size: 14px; color: #9ca3af; margin-top: 30px; text-align: center;">
                            Questions? Reply to this email - we'd love to hear from you!
                        </p>
                    </div>
                    <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
                        <p>© 2025 Shentinelix Sphere Pvt Ltd. All rights reserved.</p>
                    </div>
                </div>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('❌ Email error:', error);
            } else {
                console.log('✅ Email sent:', info.response);
            }
        });

        console.log(`🎉 New joiner: ${name} (${email})`);
        res.status(201).json({ message: 'Successfully joined the waitlist!' });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

app.get('/api/count', async (req, res) => {
    try {
        const count = await Waitlist.countDocuments();
        res.json({ count });
    } catch (error) {
        console.error('Error fetching count:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Admin Route to get all data
app.get('/api/admin/users', async (req, res) => {
    try {
        const adminKey = req.headers['x-admin-key'];
        // Simple protection: Check against env variable or a hardcoded fallback for dev
        if (adminKey !== (process.env.ADMIN_KEY || 'secret_admin_key')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const users = await Waitlist.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

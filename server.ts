import express from 'express';
import { createServer as createViteServer } from 'vite';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import multer from 'multer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const PORT = 3001;

  app.use(cors());
  app.use(express.json());

  // Configure multer for file uploads (in-memory storage)
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 20 * 1024 * 1024, // 20MB limit
    },
  });

  // API Route for sending emails
  app.post('/api/send-email', async (req, res) => {
    const { to, subject, html, fromName, replyTo } = req.body;

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!user || !pass) {
      console.warn('Email credentials not configured in .env. Email sending is disabled.');
      return res.status(500).json({
        success: false,
        message: 'Email service not configured. Notification was not sent.'
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: { user, pass },
    });

    try {
      await transporter.sendMail({
        from: `"${fromName || 'EDUNEST'}" <${user}>`,
        to,
        replyTo: replyTo || user,
        subject,
        html,
      });
      res.json({ success: true });
    } catch (error: any) {
      console.error('Error sending email:', error);

      // Log error to file for easier debugging
      const errorLog = `[${new Date().toISOString()}] Email Error: ${error.message}\n${error.stack}\n\n`;
      fs.appendFileSync(path.join(process.cwd(), 'email-error.log'), errorLog);

      res.status(500).json({
        success: false,
        error: 'Failed to send email',
        details: error.message
      });
    }
  });

  // API Route for submitting assignments via email with attachments
  app.post('/api/submit-assignment', upload.single('file'), async (req, res) => {
    const { teacherEmail, studentName, assignmentTitle, className, message } = req.body;
    const file = req.file;

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!user || !pass) {
      return res.status(500).json({
        success: false,
        message: 'Email service not configured.'
      });
    }

    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded.'
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    try {
      await transporter.sendMail({
        from: `"EDUNEST Submission" <${user}>`,
        to: teacherEmail,
        subject: `[BÀI NỘP] ${className} - ${assignmentTitle} - ${studentName}`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
            <h2 style="color: #4f46e5;">Thông báo nộp bài mới</h2>
            <p><strong>Học sinh:</strong> ${studentName}</p>
            <p><strong>Lớp:</strong> ${className}</p>
            <p><strong>Bài tập:</strong> ${assignmentTitle}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Lời nhắn:</strong></p>
            <p style="background: #f9fafb; padding: 15px; border-radius: 8px;">${message || 'Không có lời nhắn.'}</p>
            <p style="font-size: 12px; color: #6b7280; margin-top: 30px;">
              Email này được gửi tự động từ hệ thống EDUNEST. File bài làm được đính kèm bên dưới.
            </p>
          </div>
        `,
        attachments: [
          {
            filename: file.originalname,
            content: file.buffer,
          },
        ],
      });

      res.json({ success: true });
    } catch (error: any) {
      console.error('Error sending submission email:', error);

      // Log detailed error to file
      const errorLog = `[${new Date().toISOString()}] Submission Error: ${error.message}\n${error.stack}\n\n`;
      fs.appendFileSync(path.join(process.cwd(), 'submission-error.log'), errorLog);

      res.status(500).json({
        success: false,
        error: 'Failed to send submission email',
        details: error.message
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: { server }
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

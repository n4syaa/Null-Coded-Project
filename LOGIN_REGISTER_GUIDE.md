# Login & Register Quick Reference

## 🔐 Demo Account

**Email**: `demo@nullcoded.com`  
**Password**: `Demo123456`

Use this to test the login feature immediately.

---

## 📝 How to Register

1. Visit: `http://localhost:3000/register`
2. Enter:
   - **Nama Lengkap**: Your full name
   - **Email**: Your email address
   - **Kata Sandi**: Password (minimum 8 characters)
   - **Konfirmasi**: Repeat password
3. Click **Daftar**
4. Auto-login and redirect to dashboard

**Requirements**:

- Name: 1+ characters
- Email: Valid email format
- Password: 8+ characters
- Passwords must match

---

## 🔑 How to Login

1. Visit: `http://localhost:3000/login`
2. Enter:
   - **Email**: Your registered email
   - **Kata Sandi**: Your password
3. Click **Masuk**
4. Redirect to dashboard on success

**Error Messages**:

- "Email atau kata sandi salah." → Email not found or password incorrect

---

## 📊 Dashboard

After login, you'll see:

- **Welcome message** with your name
- **Streak counter** (number of learning days)
- **Statistics**:
  - Courses enrolled
  - Courses completed
  - Study hours
  - Current streak
- **Level & XP bar**
- **Continue Learning section** (enrolled courses)
- **Achievements** (badges)
- **Recent Activity** (activity log)

---

## 🚪 Logout

**Method 1 - Desktop**: Click the logout icon (log out button) in navbar  
**Method 2 - Mobile**: Open menu → Keluar

This clears:

- Current user
- Auth state
- Redirects to home page

---

## 🔄 Persistence

Your login persists across:

- ✅ Page refreshes
- ✅ Tab switches
- ✅ Browser restart (same session)

**Storage Location**: Browser LocalStorage  
**Key**: `nullcoded-auth-v2`

To clear all auth data:

1. Open DevTools (F12)
2. Go to Application → LocalStorage
3. Find `nullcoded-auth-v2`
4. Delete it
5. Refresh page

---

## 🛡️ Protected Routes

These require login:

- `/learn` - Learning materials
- `/dashboard` - User dashboard
- `/learn/[courseId]` - Course content
- `/learn/[courseId]/[lessonId]` - Lesson content

Non-protected routes (public):

- `/` - Home
- `/about` - About page
- `/login` - Login page
- `/register` - Register page

If not logged in and you try to access protected routes, you'll be redirected to login.

---

## ⚙️ User Data Structure

Each user stores:

```typescript
{
  id: "uuid",
  name: "Full Name",
  email: "email@example.com",
  password: "hashed-in-production",
  avatar: "profile-pic-url",
  level: 1,
  xp: 0,
  streak: 0,
  coursesEnrolled: 0,
  coursesCompleted: 0,
  totalHours: 0,
  createdAt: "2026-05-25T...",
  badges: []
}
```

---

## 🐛 Troubleshooting

**Problem**: Login always fails  
**Solution**: Check DevTools console for errors, verify email/password

**Problem**: Not staying logged in after refresh  
**Solution**: Check if cookies/localStorage are enabled

**Problem**: Can't register (email error)  
**Solution**: Email might already be registered. Use different email.

**Problem**: Navbar not showing user name  
**Solution**: Wait for hydration to complete (loading spinner)

---

## 🚀 Test Scenarios

### Scenario 1: Register New User

1. Go to /register
2. Fill in details
3. Submit
4. Should see dashboard
5. Navbar shows your name
6. Refresh page - still logged in

### Scenario 2: Login with Demo

1. Go to /login
2. Enter: demo@nullcoded.com / Demo123456
3. Submit
4. Should see dashboard
5. User name "Demo User" in navbar

### Scenario 3: Access Protected Route (Logged Out)

1. Logout (click logout button)
2. Try to visit /dashboard
3. Redirected to /login

### Scenario 4: Persistence Check

1. Login with any account
2. Open DevTools → Application → LocalStorage
3. Find `nullcoded-auth-v2` key
4. Should contain your user data
5. Refresh page
6. Still logged in (data loaded from localStorage)

---

## 📱 Mobile Compatibility

- ✅ Responsive design
- ✅ Mobile menu button
- ✅ Touch-friendly buttons
- ✅ Readable on small screens
- ✅ Form fields work on mobile

---

## 🎨 UI Components Used

- **Buttons**: Primary, Ghost, Outline variants
- **Input Fields**: Text, Email, Password with icons
- **Cards**: Glass morphism style
- **Icons**: Lucide React (professional)
- **Animations**: Framer Motion
- **Colors**: Sky, Emerald, Violet, Amber themes

---

**Last Updated**: 2026-05-25  
**Version**: 2.0.0

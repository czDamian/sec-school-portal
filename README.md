# Memorial Grammar School Portal

A modern web application for managing secondary school academic records, built with Next.js 15, Civic Auth and MongoDB.

## Overview

This portal provides a comprehensive solution for secondary schools to manage student records, academic results, and administrative tasks. It features:

- 🔐 Secure authentication system using Civic Auth
- 👥 Student & admin dashboards
- 📊 Academic result management
- 📈 Performance analytics
- 🎓 Student profiles
- 🌐 Real-time updates

## Technology Stack

- **Frontend**: Next.js 15, TailwindCSS, React Icons
- **Backend**: Next.js API Routes, MongoDB
- **Authentication**: Civic Auth
- **Database**: MongoDB
- **Styling**: TailwindCSS

## Authentication with Civic Auth

This project uses Civic Auth for secure user authentication and authorization:

### Features

- Seamless user registration and login
- Role-based access control (Student/Admin)
- Secure session management
- Protected API routes
- Persistent user sessions

### Implementation

```javascript
// Protected API Route Example
import { getUser } from "@civic/auth/nextjs";

export async function GET() {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Protected route logic
}
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/czDamian/sec-school-portal.git
cd sec-school-portal
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
# .env.local
MONGODB_URI=your_mongodb_uri
CIVIC_CLIENT_ID=your_civic_client_id
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Use Cases

### For Schools

- Digital result management
- Student record keeping
- Academic performance tracking
- Administrative efficiency

### For Students

- Access academic results
- View performance analytics
- Track academic progress
- Secure profile management

### For Parents

- Monitor student performance
- Access result history
- Track academic growth

## Marketing Potential

### Target Market

- Secondary Schools
- Educational Institutions
- School Management Systems
- Educational Technology Providers

### Value Proposition

1. **Cost Efficiency**

   - Reduce paperwork
   - Minimize administrative overhead
   - Streamline result processing

2. **Time Saving**

   - Instant result publication
   - Automated calculations
   - Bulk result uploads

3. **Data Security**

   - Secure authentication
   - Role-based access
   - Data encryption

4. **Scalability**
   - Handle multiple classes
   - Support numerous students
   - Expandable features

### Competitive Advantages

- Modern user interface
- Real-time updates
- Mobile responsive
- Easy to use
- Secure access

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@schoolportal.com or join our Slack channel.

## Acknowledgments

- Next.js team for the amazing framework
- Civic Auth for secure authentication
- MongoDB for reliable database service

# FindMyDoc 📁

A modern web application that allows you to organize your Google Drive files with custom display names while preserving original filenames.

![FindMyDoc Screenshot](screenshot.png)

## Features ✨

* **Custom Display Names**: Give meaningful names to your documents while keeping original filenames intact
* **Secure Access**: Your files stay in your Google Drive - we just help you organize better
* **Real-time Sync**: Changes reflect instantly across all your devices
* **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS

## Tech Stack 🛠️

* [Next.js 14](https://nextjs.org/) - React Framework
* [Tailwind CSS](https://tailwindcss.com/) - Styling
* [shadcn/ui](https://ui.shadcn.com/) - UI Components
* [Google Drive API](https://developers.google.com/drive) - File Management
* [OAuth 2.0](https://developers.google.com/identity/protocols/oauth2) - Authentication

## Getting Started 🚀

### Prerequisites

* Node.js 18+ 
* A Google Cloud Project with Google Drive API enabled
* OAuth 2.0 credentials

### Local Development

1. Clone the repository:
    ```sh
    git clone https://github.com/iamehran/FindMyDoc.git
    cd FindMyDoc
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env.local` file in the root directory:
    ```sh
    GOOGLE_CLIENT_ID=your_client_id
    GOOGLE_CLIENT_SECRET=your_client_secret
    GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google
    ```

4. Set up Google Cloud Console:
    * Create a project at [Google Cloud Console](https://console.cloud.google.com/)
    * Enable Google Drive API
    * Create OAuth 2.0 credentials
    * Add authorized redirect URIs:
        * `http://localhost:3000/api/auth/callback/google` (development)
        * `https://your-domain.com/api/auth/callback/google` (production)

5. Start the development server:
    ```sh
    npm run dev
    ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Deployment

The project is set up for easy deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/iamehran/FindMyDoc)

> [!IMPORTANT]
> Don't forget to add your environment variables in your Vercel project settings.


## Contributing 🤝

Contributions are welcome! Here are some ways you can contribute:

1. [Report bugs](https://github.com/iamehran/FindMyDoc/issues)
2. [Suggest features](https://github.com/iamehran/FindMyDoc/issues)
3. Submit Pull Requests

> [!NOTE]
> Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a Pull Request.

### Development Workflow

1. Fork the repository
2. Create a new branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## Upcoming Features 🚀

- [ ] File search functionality
- [ ] Folder support
- [ ] Batch rename
- [ ] File preview
- [ ] Dark mode

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

* [Next.js Documentation](https://nextjs.org/docs)
* [Google Drive API Documentation](https://developers.google.com/drive/api/v3/about-sdk)
* [Tailwind CSS](https://tailwindcss.com/)
* [shadcn/ui](https://ui.shadcn.com/)

## Contact 📬

Mehran - [@xnarhem](https://twitter.com/xnarhem)

Project Link: [https://github.com/iamehran/FindMyDoc](https://github.com/iamehran/FindMyDoc)

---
Built with ❤️ by [Mehran](https://github.com/iamehran)
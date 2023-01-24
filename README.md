# Client Email Web App

This is an email list application built using React and Redux. The project aims to mimic the functionality of an email client like Gmail, allowing users to view and manage their emails.

## Features

- Fetching emails from an API
- Viewing emails in a list
- Viewing email details
- Marking emails as read/unread
- Filtering emails by read/unread status and favorites
- Pagination
- Storing emails in local storage for faster load times
- Custom hooks for filtering and pagination
- Reusable components for email list item and email details
- Higher order components for handling loading states
- Well organized folder structure for better code maintainability

## Tech Stack

- React
- Redux
- Ant Design
- TailwindCSS

## Approach

The project was built using a functional approach with the use of custom hooks and reusable components to improve maintainability and readability. Asynchronous actions were handled using Redux Thunk and state management was achieved using react-redux's centeralized store. For the UI, I have used Ant Design for pagination and TailwindCSS for styling. To prevent XSS attacks, I have used DOMPurify to sanitize the data received from the API. The filtered and paginated data is stored in the local storage to improve the load time of the application.

## Run Locally

Clone the project

```bash
  git clone https://github.com/sohanagashimani/email-clone-2.git
```

Go to the project directory

```bash
  cd email-clone-2
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Deployment

To deploy this project run

```bash
  npm run deploy
```

## Conclusion

Overall, this project serves as a great example of using modern technologies and libraries to build a functional email list application. It provides a good foundation for further development and customization. I have used the best practices and techniques to make it a scalable and maintainable codebase. I hope you will find this project useful and informative.

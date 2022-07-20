import { gql } from '@apollo/client';

// Variables must match variables used in callback function in components and pages.
// Property names must match resolvers on back-end
// Arguments must match typeDefs on back-end

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Don't need user Id because it is pulled from the context in the resolvers

export const SAVE_BOOK = gql`
  mutation saveBook($body: BookInput) {
    saveBook(input: $body) {
      _id
      username
      bookCount
      savedBooks {
        authors
        bookId
        description
        title
        link
        image
      }
    }
  }
`;

// Don't need user Id because it is pulled from the context in the resolvers

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

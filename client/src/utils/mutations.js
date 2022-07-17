import { gql } from '@apollo/client';

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

export const SAVE_BOOK = gql`
  mutation saveBook($user: ID!, $body: BookInput) {
    saveBook(_id: $user, input: $body) {
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

export const REMOVE_BOOK = gql`
  mutation removeBook($user: ID!, $body: String!) {
    removeBook(_id: $user, bookId: $body) {
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

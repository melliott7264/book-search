import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        authors
        bookId
        description
        title
        image
        link
      }
    }
  }
`;

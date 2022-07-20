import React, { useState, useEffect } from 'react';
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { removeBookId, saveBookIds } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_BOOK } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

const SavedBooks = () => {
  const [userData, setUserData] = useState({});
  const [deleteBook, { error }] = useMutation(REMOVE_BOOK);

  // use GraphQL query to get currently logged in user data
  // Authentication info including user id is passed to GraphQL using context in the resolvers
  const { loading, data } = useQuery(GET_ME);

  // runs once data has loaded
  useEffect(() => {
    const user = data?.me || {};
    // sets UserData displaying saved book info for logged in user
    setUserData(user);
  }, [data]);

  // checks to see if saved book info for logged in user has finished loading.
  if (userData.savedBooks?.length) {
    // Creates an array of saved bookIds from books saved to database for logged in user
    const savedBooks = userData.savedBooks?.map((book) => {
      return book.bookId;
    });
    // saves saved bookIds to localStorage for user session - used to display if book was saved in search results
    saveBookIds(savedBooks);
  }

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    try {
      const response = await deleteBook({
        variables: { bookId: bookId },
      });

      if (response) {
        // upon success, remove book's id from localStorage
        removeBookId(bookId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks?.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks?.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <a href={`${book.link}`}>
                    <Card.Title>{book.title}</Card.Title>
                  </a>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;

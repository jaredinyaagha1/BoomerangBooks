import { gql } from "@apollo/client"

export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
        password
      }
    }
  }
`

export const ADD_USER = gql`
mutation addUser($username:String!, $email:String!, $password:String!){
    addUser(
      username:$username,
      email:$email,
      password:$password
    ){
      user{
        username
        email
      }
      token
    }
  }
  `
export const SAVE_BOOK = gql`
    mutation saveBook($authors: [String], $description: String, $title: String, $bookId: String, $image: String, $link: String){
        saveBook(book: $book){
            _id
            username
            bookCount
            savedBooks{
                authors
                description
                title
                bookId
                image
                link
            }
        }
    }
`;
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      bookCount
      savedBooks {
        title
        authors
        description
        bookId
        image
        link
      }
    }
  }
`;

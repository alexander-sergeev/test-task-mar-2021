import { gql } from 'apollo-server-koa';

const user = gql`
  type User {
    name: String
    picture: String
    locale: String
  }
`;

export default user;

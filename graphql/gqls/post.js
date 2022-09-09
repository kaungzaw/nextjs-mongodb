import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query getPosts($filter: UpdatePostInput) {
    posts(filter: $filter) {
      _id
      text
      like
      dislike
      createdAt
      createdBy
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($_id: String!) {
    likePost(_id: $_id) {
      _id
      text
      like
      dislike
      createdAt
      createdBy
    }
  }
`;

export const DISLIKE_POST = gql`
  mutation dislikePost($_id: String!) {
    dislikePost(_id: $_id) {
      _id
      text
      like
      dislike
      createdAt
      createdBy
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($_id: String!) {
    deletePost(_id: $_id) {
      _id
      text
      like
      dislike
      createdAt
      createdBy
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($data: CreatePostInput!) {
    createPost(data: $data) {
      _id
      text
      like
      dislike
      createdAt
      createdBy
    }
  }
`;

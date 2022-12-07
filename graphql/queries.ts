import { gql } from '@apollo/client'

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query GetSubredditByTopic($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getPostList {
      body
      created_at
      id
      image
      title
      subreddit_id
      username
      comments {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`

export const GET_POST_LIST_BY_TOPIC = gql`
  query getPostListByTopic($topic: String!) {
    getPostListByTopic(topic: $topic) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
      votes {
        created_at
        id
        post_id
        username
        upvote
      }
      subreddit {
        created_at
        id
        topic
      }
      comments {
        created_at
        id
        post_id
        text
        username
      }
    }
  }
`

export const GET_POST_BY_POST_ID = gql`
  query getPostByPostId($post_id: ID!) {
    getPostByPostId(post_id: $post_id) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
      votes {
        created_at
        id
        post_id
        username
        upvote
      }
      subreddit {
        created_at
        id
        topic
      }
      comments {
        created_at
        id
        post_id
        text
        username
      }
    }
  }
`

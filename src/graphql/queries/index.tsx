import {gql} from '@apollo/client';

export const PROFILES_QUERY = gql`
  query Profile_Query {
    profile(where: {profile_complete: {_eq: true}}) {
      user_id
      bio
      user_type
      last_name
      gender
      first_name
      expertise
      id
      image_uri
      cover_uri
      profile_complete
    }
  }
`;

export const NUMBER_OF_FOLLOWING = gql`
  query NumberFollowing($id: String!) {
    follow_aggregate(where: {follower_id: {_eq: $id}}) {
      aggregate {
        count
      }
    }
  }
`;

export const FOLLOWINGS = gql`
  query Followings($currentUserID: String!) {
    following(where: {profile_id: {_eq: $currentUserID}}) {
      user_id
    }
  }
`;

export const NUMBER_OF_FOLLOWERS = gql`
  query NumberFollowing($id: String!) {
    follow_aggregate(where: {following_id: {_eq: $id}}) {
      aggregate {
        count
      }
    }
  }
`;

// user has logged in, no profile stored on device so we should check if user has profile in the database before we create another
export const CHECK_PROFILE_QUERY = gql`
  query CheckProfile($username: String) {
    profile(where: {username: {_eq: $username}}) {
      user_id
      id
      first_name
      last_name
      bio
      image_uri
      profile_complete
    }
  }
`;

export const CHECK_PROFILE_QUERY_TERMS = gql`
  query CheckProfile($user_id: String) {
    profile(where: {user_id: {_eq: $user_id}}) {
      user_id
      id
      first_name
      last_name
      bio
      gender
      education
      accepted_terms
      profession
      profile_complete
      image_uri
      expertise
      dob
      user_type
      business_category
      country_name
      country_code
      ethnicity
    }
  }
`;

export const MENTRING_CATEGORIES = gql`
  query MentringCategories {
    mentring_video_categories {
      id
      description
      image
      label
      value
    }
  }
`;

export const MENTRING_VIDEOS_BY_CATEGORIES = gql`
  query MySubscription($mentring_video_category: String!) {
    mentring_video(
      where: {mentring_video_category: {value: {_eq: $mentring_video_category}}}
      order_by: {created_at: desc}
    ) {
      mentring_title
      category
      id
      start_date_time
      title
      description
      profile {
        user_id
        image_uri
        first_name
        last_name
        cover_uri
      }
      mentring_video_category {
        label
      }
      statusSession {
        id
        name
      }
    }
  }
`;

export const MENTRING_VIDEOS = gql`
  query MySubscription {
    mentring_video(order_by: {created_at: desc}) {
      mentring_title
      category
      id
      start_date_time
      title
      description
      profile {
        user_id
        image_uri
        first_name
        last_name
      }
      mentring_video_category {
        label
      }
      statusSession {
        id
        name
      }
    }
  }
`;

export const CHECK_PROFILE_QUERY_PROFILE = gql`
  query CheckProfile($id: String) {
    profile(where: {user_id: {_eq: $id}}) {
      user_id
      id
      first_name
      last_name
    }
  }
`;

export const SEARCH_USERS_QUERY = gql`
  query searchUsers($query: String) {
    profile(
      where: {
        _or: [{user_id: {_ilike: $query}}, {first_name: {_ilike: $query}}]
      }
    ) {
      id
      first_name
      last_name
      image_uri
      user_id
    }
  }
`;

export const GET_MENTRING_QUESTION_BY_ID = gql`
  query GetMentringQuestions($mentring_video_id: uuid!, $user_id: String) {
    mentring_questions(where: {mentring_video_id: {_eq: $mentring_video_id}}) {
      id
      question
      mentring_video_id
      mentring_question_counts_aggregate {
        aggregate {
          count
        }
      }
      mentring_question_counts(where: {user_id: {_eq: $user_id}}) {
        id
        question_id
        user_id
      }
    }
  }
`;

export const GET_ACTIVITY_COUNTS = gql`
  query GetActivityCounts($id: String) {
    post_comments_aggregate(where: {user_id: {_eq: $id}}) {
      aggregate {
        count
      }
    }
    like_aggregate(where: {user_id: {_eq: $id}}) {
      aggregate {
        count
      }
    }
    posts_aggregate(where: {user_id: {_eq: $id}}) {
      aggregate {
        count
      }
    }
    followers_aggregate(where: {user_id: {_eq: $id}}) {
      aggregate {
        count
      }
    }
    saved_posts_aggregate(where: {user_id: {_eq: $id}}) {
      aggregate {
        count
      }
    }
  }
`;

export const HOLLA_CATEGORIES = gql`
  query GetCategory {
    category {
      name
      id
      label
      value
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost(
    $title: String
    $link: String
    $imageUrl: String
    $content: String
    $categoryId: Int
    $user_id: String
    $type: String
  ) {
    insert_posts(
      objects: {
        title: $title
        link: $link
        imageUrl: $imageUrl
        content: $content
        categoryId: $categoryId
        user_id: $user_id
        type: $type
      }
    ) {
      affected_rows
    }
  }
`;

export const COMMUNITY = gql`
  query MyQuery {
    community {
      cover_image
      id
      label
      value
    }
  }
`;

export const GET_PERSPECTIVES = gql`
  query getPerspectives {
    perspectives(order_by: {created_at: desc}) {
      image
      id
      description
      created_at
      perspectiveUser {
        firstname
        lastname
      }
      perspectivesCategory {
        name
      }
    }
  }
`;

export const GET_PERSPECTIVES_BY_ID = gql`
  query getPerspectives($id: uuid) {
    perspectives(where: {userId: {_eq: $id}}) {
      image
      id
      description
      created_at
      perspectiveUser {
        firstname
        lastname
      }
      perspectivesCategory {
        name
      }
    }
  }
`;

export const GET_PERSPECTIVES_CATEGORY = gql`
  query getPerspectivesCategory {
    perspectivesCategory {
      id
      name
    }
  }
`;

export const GET_RETAILERS_CITY = gql`
  query getRetailersCity {
    retailersCity {
      id
      name
    }
  }
`;

export const GET_RETAILERS_CURRENCY = gql`
  query getRetailersCurrency {
    retailersCurrency {
      id
      name
    }
  }
`;

export const GET_RETAILERS_CATEGORY = gql`
  query getRetailersCategory {
    retailersCategory {
      id
      name
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query MyQuery($id: uuid) {
    users(where: {_id: {_eq: $id}}) {
      _id
      email
      firstname
      lastname
      phone
      profile_id
      username
    }
  }
`;

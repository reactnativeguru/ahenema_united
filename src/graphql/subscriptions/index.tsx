import {gql} from '@apollo/client';

const hollaObj = `{
    id
    profile {
      image_uri
      user_id
    }
    createdAt
    content
    title
    comments(order_by: {created_at: desc}) {
      created_at
      content
      userProfile {
        id
        user_id
        image_uri
      }
    }
    saved_posts {
      user_id
      id
    }
    comments_aggregate {
      aggregate {
        count
      }
    }
    likes {
      id
      user_id
      post_id
      emoji_name
    }
    likes_aggregate {
      aggregate {
        count
      }
    }
    category {
      label
      name
      color
    }
    imageUrl
    user_id
    link
    type
    saved_posts_aggregate {
      aggregate {
        count
      }
    }
    saved_posts {
      user_id
      id
      post_id
    }
  }
`;

const GET_POSTS = gql`
  subscription getPosts {
    posts(order_by: {createdAt: desc}) {
      id
      profile {
        image_uri
        user_id
      }
      createdAt
      content
      title
      comments(order_by: {created_at: desc}) {
        created_at
        content
        userProfile {
          id
          user_id
          image_uri
        }
      }
      saved_posts {
        user_id
        id
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      likes {
        id
        user_id
        post_id
        emoji_name
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      category {
        label
        name
        color
      }
      imageUrl
      user_id
      link
      type
      saved_posts_aggregate {
        aggregate {
          count
        }
      }
      saved_posts {
        user_id
        id
        post_id
      }
    }
  }
`;

const SUBSCRIPTION_MENTRING_VIDEO = gql`
  subscription QueryMentringVideo {
    mentring_video(limit: 10, order_by: {created_at: desc}) {
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

export const ME_SUBSCRIPTION = gql`
  subscription MeSubscription($user_id: String!) {
    profile(where: {user_id: {_eq: $user_id}}) {
      bio
      user_id
      business_category
      country_code
      created_at
      dob
      education
      ethnicity
      expertise
      first_name
      gender
      image_uri
      cover_uri
      last_checked
      last_name
      posts(where: {user_id: {_eq: $user_id}}) {
        content
      }
      notifications(where: {user_id: {_eq: $user_id}}) {
        id
        post_id
        type
        user_id
        created_at
      }
    }
  }
`;

export const GET_MENTRING_QUESTION_BY_ID = gql`
  subscription GetMentringQuestions(
    $mentring_video_id: uuid!
    $user_id: String
  ) {
    mentring_questions(where: {mentring_video_id: {_eq: $mentring_video_id}}) {
      id
      question
      user_id
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

export const GET_USERS_PROFILE = gql`
  subscription GetUsersProfile($id: uuid) {
    users(where: {_not: {_id: {_eq: $id}}}) {
      id
      _id
      username
      firstname
      lastname
      email
      phone
      profile {
        image_uri
      }
    }
  }
`;

export const CHECK_PROFILE_QUERY = gql`
  subscription CheckProfile($id: String) {
    profile(where: {user_id: {_eq: $id}}) {
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
      cover_uri
      community_subscribes(where: {user_id: {_eq: $id}}) {
        community_id
        id
        user_id
      }
    }
  }
`;

export const GET_MENTOR_MENTEE = gql`
  subscription GetMentorMentee($mentor_id: String) {
    mentor_mentee(where: {mentor_id: {_eq: $mentor_id}}) {
      id
      mentee_id
      mentor_id
      mentee {
        profile {
          image_uri
          first_name
          expertise
          last_name
          cover_uri
        }
      }
    }
  }
`;

export const FOLLOWERS = gql`
  subscription Followers($user_id: String!) {
    followers(where: {user_id: {_eq: $user_id}}) {
      id
    }
  }
`;

export const GET_COMMUNITY_SUBSCRIPTION = gql`
  subscription Community($user_id: String!) {
    community_subscribe(where: {user_id: {_eq: $user_id}}) {
      community {
        cover_image
        id
        label
        value
      }
      id
      user_id
    }
  }
`;

const GET_CURRENT_USER_POSTS = gql`
  subscription getPosts($user_id: String!) {
    posts(where: {user_id: {_eq: $user_id}}, order_by: {createdAt: desc}) 
    ${hollaObj}
  }
`;

const LIKES_ACTIVITY = gql`
  subscription MySubscription ($user_id: String!) {
    posts(where: {likes: {user_id: {_eq: $user_id}}}) 
    ${hollaObj}
  }
`;

const COMMENTS_ACTIVITY = gql`
  subscription MySubscription ($user_id: String!) {
    posts(where: {comments: {user_id: {_eq: $user_id}}}) 
    ${hollaObj}
  }
`;

const BOOKMARK_ACTIVITY = gql`
  subscription MySubscription ($user_id: String!) {
    posts(where: {saved_posts: {user_id: {_eq: $user_id}}}) 
    ${hollaObj}
  }
`;

export const GET_PERSPECTIVES = gql`
  subscription getPerspectives {
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

export const GET_RETAILERS = gql`
  subscription getRetailers {
    retailers {
      id
      image
      name
      listings_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const GET_RETAILER_LISTING = gql`
  subscription getRetailerListing($categoryId: uuid!) {
    listings(where: {retailer: {id: {_eq: $categoryId}}}) {
      description
      id
      priceTo
      image
      phone
      priceFrom
      retailer {
        id
        image
        name
      }
      retailersCategory {
        id
        name
      }
      retailersCurrency {
        id
        name
      }
      retailersCity {
        id
        name
      }
      title
      website
      user {
        id
        lastname
        firstname
        username
      }
      latitude
      longitude
    }
  }
`;

export const GET_FOLLOW = gql`
  subscription GetUsersFollowing($id: uuid) {
    follow(where: {user_id: {_eq: $id}}) {
      id
      user_id
      follower_id
    }
  }
`;

export {
  GET_POSTS,
  SUBSCRIPTION_MENTRING_VIDEO,
  GET_CURRENT_USER_POSTS,
  LIKES_ACTIVITY,
  COMMENTS_ACTIVITY,
  BOOKMARK_ACTIVITY,
};

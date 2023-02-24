import {gql} from '@apollo/client';

export const UPDATE_USER = gql`
  mutation InsertUser($username: String!, $email: String!, $phone: String!) {
    insert_users(
      objects: [{username: $username, email: $email, phone: $phone}]
    ) {
      returning {
        id
        username
        email
        phone
      }
    }
  }
`;

export const CREATE_PROFILE_MUTATION = gql`
  mutation InsertProfile($user_id: uuid) {
    insert_profile(objects: [{user_id: $user_id}]) {
      returning {
        id
        profile_complete
        user_id
        accepted_terms
        business_category
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation (
    $username: uuid!
    $first_name: String
    $last_name: String
    $gender: String
    $dob: String
    $profession: String
    $ethnicity: String
  ) {
    update_profile(
      where: {user_id: {_eq: $username}}
      _set: {
        first_name: $first_name
        last_name: $last_name
        gender: $gender
        profession: $profession
        dob: $dob
        ethnicity: $ethnicity
      }
    ) {
      returning {
        id
      }
    }
  }
`;

export const UPDATE_PROFILE_IMAGE = gql`
  mutation ($image_uri: String!, $cover_uri: String!, $user_id: uuid!) {
    update_profile(
      where: {user_id: {_eq: $user_id}}
      _set: {image_uri: $image_uri, cover_uri: $cover_uri}
    ) {
      returning {
        id
      }
    }
  }
`;

export const UPDATE_PROFILE_BIO = gql`
  mutation ($user_id: uuid!, $bio: String, $expertise: String) {
    update_profile(
      where: {user_id: {_eq: $user_id}}
      _set: {expertise: $expertise, bio: $bio}
    ) {
      returning {
        id
      }
    }
  }
`;

export const UPDATE_PROFILE_TERMS = gql`
  mutation (
    $user_id: uuid!
    $accepted_terms: Boolean
    $profile_complete: Boolean
  ) {
    update_profile(
      where: {user_id: {_eq: $user_id}}
      _set: {
        accepted_terms: $accepted_terms
        profile_complete: $profile_complete
      }
    ) {
      returning {
        id
      }
    }
  }
`;

export const INSERT_MENTEE = gql`
  mutation InsertMentees($user_id: String!, $last_seen: String) {
    insert_mentees(objects: {user_id: $user_id, last_seen: $last_seen}) {
      returning {
        id
      }
    }
  }
`;

export const INSERT_MENTOR = gql`
  mutation InsertMentors($user_id: String!, $last_seen: String) {
    insert_mentors(objects: {user_id: $user_id, last_seen: $last_seen}) {
      returning {
        id
      }
    }
  }
`;

export const BECOMEAMENTEE = gql`
  mutation BecomeAMentee($mentor_id: String, $mentee_id: String) {
    insert_mentor_mentee(
      objects: {mentor_id: $mentor_id, mentee_id: $mentee_id}
    ) {
      returning {
        id
      }
    }
  }
`;

export const DELETEBECOMEAMENTEE = gql`
  mutation DeleteBecomeAMentee($id: uuid) {
    delete_mentor_mentee(where: {id: {_eq: $id}}) {
      returning {
        id
      }
    }
  }
`;

export const INSERT_MENTRING_VIDEO = gql`
  mutation InsertMentringVideo(
    $description: String!
    $profile_username: String!
    $start_date_time: String!
    $title: String!
    $mentring_title: String!
    $category: String!
  ) {
    insert_mentring_video(
      objects: {
        description: $description
        profile_username: $profile_username
        start_date_time: $start_date_time
        title: $title
        mentring_title: $mentring_title
        category: $category
      }
    ) {
      returning {
        id
      }
    }
  }
`;

export const DELETE_MENTRING = gql`
  mutation DeleteMentring($id: uuid) {
    delete_mentring_video(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation likePost(
    $post_id: uuid!
    $user_id: String!
    $profile_id: String
    $emoji_name: String!
  ) {
    insert_like(
      objects: {user_id: $user_id, post_id: $post_id, emoji_name: $emoji_name}
    ) {
      affected_rows
    }
    insert_notifications(
      objects: {
        post_id: $post_id
        profile_id: $profile_id
        user_id: $user_id
        type: "like"
      }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_LIKE_POST_MUTATION = gql`
  mutation updateLikePost($id: uuid!, $emoji_name: String!) {
    update_like(where: {id: {_eq: $id}}, _set: {emoji_name: $emoji_name}) {
      affected_rows
    }
  }
`;

export const UN_LIKE_POST_MUTATION = gql`
  mutation unLikePost($user_id: String!, $post_id: uuid!, $profile_id: String) {
    delete_like(where: {post_id: {_eq: $post_id}, user_id: {_eq: $user_id}}) {
      affected_rows
    }
    delete_notifications(
      where: {
        post_id: {_eq: $post_id}
        profile_id: {_eq: $profile_id}
        user_id: {_eq: $user_id}
        type: {_eq: "like"}
      }
    ) {
      affected_rows
    }
  }
`;

export const SAVE_POST_MUTATION = gql`
  mutation savePost($post_id: uuid!, $user_id: String!) {
    insert_saved_posts(objects: {user_id: $user_id, post_id: $post_id}) {
      affected_rows
    }
  }
`;

export const UN_SAVE_POST_MUTATION = gql`
  mutation unLikePost($user_id: String!, $post_id: uuid!) {
    delete_saved_posts(
      where: {post_id: {_eq: $post_id}, user_id: {_eq: $user_id}}
    ) {
      affected_rows
    }
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment(
    $post_id: uuid!
    $content: String!
    $user_id: String!
  ) {
    insert_post_comments(
      objects: {content: $content, post_id: $post_id, user_id: $user_id}
    ) {
      affected_rows
    }
  }
`;

export const CHECK_NOTIFICATIONS_MUTATION = gql`
  mutation checkNotifications($user_id: String, $lastChecked: String) {
    update_profile(
      where: {user_id: {_eq: $user_id}}
      _set: {last_checked: $lastChecked}
    ) {
      affected_rows
    }
  }
`;

// export const FOLLOW_USER_MUTATION = gql`
//   mutation followUser($userIdToFollow: String, $currentUserId: String) {
//     insert_followers(
//       objects: {user_id: $userIdToFollow, profile_id: $currentUserId}
//     ) {
//       affected_rows
//     }
//     insert_following(
//       objects: {profile_id: $currentUserId, user_id: $userIdToFollow}
//     ) {
//       affected_rows
//     }
//     insert_notifications(
//       objects: {
//         user_id: $currentUserId
//         profile_id: $userIdToFollow
//         type: "follow"
//       }
//     ) {
//       affected_rows
//     }
//   }
// `;

// export const UN_FOLLOW_USER_MUTATION = gql`
//   mutation unfollowUser($userIdToFollow: String, $currentUserId: String) {
//     delete_followers(
//       where: {
//         user_id: {_eq: $userIdToFollow}
//         profile_id: {_eq: $currentUserId}
//       }
//     ) {
//       affected_rows
//     }
//     delete_following(
//       where: {
//         user_id: {_eq: $userIdToFollow}
//         profile_id: {_eq: $currentUserId}
//       }
//     ) {
//       affected_rows
//     }
//     delete_notifications(
//       where: {
//         user_id: {_eq: $currentUserId}
//         profile_id: {_eq: $userIdToFollow}
//         type: {_eq: "follow"}
//       }
//     ) {
//       affected_rows
//     }
//   }
// `;

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($post_id: uuid!, $user_id: String) {
    delete_posts(where: {id: {_eq: $post_id}, user_id: {_eq: $user_id}}) {
      affected_rows
    }
    delete_like(where: {post_id: {_eq: $post_id}}) {
      affected_rows
    }
    delete_saved_posts(where: {post_id: {_eq: $post_id}}) {
      affected_rows
    }
    delete_notifications(where: {post_id: {_eq: $post_id}}) {
      affected_rows
    }
  }
`;

export const INSERT_MENTRING_QUESTION_BY_ID = gql`
  mutation MentringQuestions(
    $user_id: String!
    $question: String!
    $mentring_video_id: uuid!
  ) {
    insert_mentring_questions(
      objects: {
        question: $question
        mentring_video_id: $mentring_video_id
        user_id: $user_id
      }
    ) {
      returning {
        id
        question
        mentring_video_id
        user_id
      }
    }
  }
`;

export const UPDATE_MENTRING_QUESTION_BY_ID = gql`
  mutation MyMutation($id: uuid!, $user_id: String, $question: String!) {
    update_mentring_questions(
      where: {user_id: {_eq: $user_id}, id: {_eq: $id}}
      _set: {question: $question}
    ) {
      affected_rows
    }
  }
`;

export const DELETE_MENTRING_QUESTION_COUNT = gql`
  mutation MyMutation($question_id: uuid!, $user_id: String) {
    delete_mentring_question_count(
      where: {user_id: {_eq: $user_id}, question_id: {_eq: $question_id}}
    ) {
      affected_rows
    }
  }
`;

export const INSERT_MENTRING_QUESTION_COUNT = gql`
  mutation MyMutation($question_id: uuid!, $user_id: String) {
    insert_mentring_question_count(
      objects: {question_id: $question_id, user_id: $user_id}
    ) {
      affected_rows
    }
  }
`;

export const INSERT_COMMUNITY_MUTATION = gql`
  mutation MyMutation($community_id: uuid, $user_id: String) {
    insert_community_subscribe(
      objects: {community_id: $community_id, user_id: $user_id}
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_COMMUNITY_MUTATION = gql`
  mutation MyMutation($community_id: uuid, $id: uuid, $user_id: String) {
    update_community_subscribe(
      where: {id: {_eq: $id}, user_id: {_eq: $user_id}}
      _set: {community_id: $community_id}
    ) {
      affected_rows
    }
  }
`;

export const DELETE_COMMUNITY_MUTATION = gql`
  mutation MyMutation($id: uuid) {
    delete_community_subscribe(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }
`;

export const CREATE_PERSPECTIVE = gql`
  mutation InsertPerspectives(
    $description: String!
    $categoryId: uuid!
    $image: String!
    $userId: uuid!
  ) {
    insert_perspectives(
      objects: {
        description: $description
        categoryId: $categoryId
        image: $image
        userId: $userId
      }
    ) {
      returning {
        id
      }
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation InsertCategory($name: String!) {
    insert_retailers(objects: {name: $name}) {
      returning {
        id
      }
    }
  }
`;

export const CREATE_LISTING = gql`
  mutation InsertListings(
    $userId: uuid!
    $category: uuid!
    $city: uuid!
    $currency: uuid!
    $description: String!
    $image: String!
    $phone: String!
    $priceFrom: String!
    $priceTo: String!
    $retailerId: uuid!
    $title: String!
    $website: String!
    $longitude: float8
    $latitude: float8
  ) {
    insert_listings(
      objects: {
        user_id: $userId
        category_id: $category
        city_id: $city
        currency_id: $currency
        description: $description
        image: $image
        phone: $phone
        priceFrom: $priceFrom
        priceTo: $priceTo
        retailer_id: $retailerId
        title: $title
        website: $website
        longitude: $longitude
        latitude: $latitude
      }
    ) {
      returning {
        id
      }
    }
  }
`;

export const FOLLOW_USER_MUTATION = gql`
  mutation InsertFollow($user_id: uuid!, $follower_id: uuid!) {
    insert_follow(objects: {user_id: $user_id, follower_id: $follower_id}) {
      returning {
        id
        user_id
        follower_id
      }
    }
  }
`;

export const UNFOLLOW_USER_MUTATION = gql`
  mutation DeleteFollow($user_id: uuid!, $follower_id: uuid!) {
    delete_follow(
      where: {user_id: {_eq: $user_id}, follower_id: {_eq: $follower_id}}
    ) {
      affected_rows
    }
  }
`;

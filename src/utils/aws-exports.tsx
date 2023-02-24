const awsmobile = {
  aws_project_region: 'eu-west-2',
  aws_cognito_identity_pool_id:
    'eu-west-2:b7904b9a-4b20-4e3d-add8-9224e57ccd39',
  aws_cognito_region: 'eu-west-2',
  aws_user_pools_id: 'eu-west-2_s3y4jYrOR',
  aws_user_pools_web_client_id: '5oqihnbjs7jefo1ouepon6rgel',
  oauth: {
    domain: 'mentringe98f4520-e98f4520-dev.auth.eu-west-2.amazoncognito.com',
    scope: [
      'phone',
      'email',
      'openid',
      'profile',
      'aws.cognito.signin.user.admin',
    ],
    redirectSignIn: 'http://localhost:19002/',
    redirectSignOut: 'http://localhost:19002/',
    responseType: 'code',
  },
  federationTarget: 'COGNITO_USER_POOLS',
  aws_user_files_s3_bucket:
    'mentring75967c211cbe40fc8b53613ae5252839144640-dev',
  aws_user_files_s3_bucket_region: 'eu-west-2',
  room: '*',
};

export default awsmobile;

const s3_Options = (name: string) => {
  return {
    keyPrefix: `uploads/${name}/`,
    bucket: 'mentring75967c211cbe40fc8b53613ae5252839144640-dev',
    region: 'eu-west-2',
    accessKey: 'AKIA5Y66ACKMYHXVF4G2',
    secretKey: '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',
    successActionStatus: 201,
  };
};

const s3_PostsImageOptions = (name: string) => {
  return {
    keyPrefix: `posts/${name}/`,
    bucket: 'mentring75967c211cbe40fc8b53613ae5252839144640-dev',
    region: 'eu-west-2',
    accessKey: 'AKIA5Y66ACKMYHXVF4G2',
    secretKey: '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',
    successActionStatus: 201,
  };
};

export {s3_Options, s3_PostsImageOptions};

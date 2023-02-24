export type Item = {
  id: number;
  colour: string;
  name: string;
  price: number;
  img: string;
  quantity?: number;
};

export interface Action {
  payload: any;
  type: string;
}

export interface State {
  products: Item[];
  wishlist: Item[];
  bags: Item[];
}

export interface DispatchState {
  payload: Item[];
  type: string;
}

export type AuthContextStateType = {
  token: null | string;
  errorMessage: string;
  emailError: string;
  passwordError: string;
  email: string;
  password: string;
  isLoading: false;
  language: string;
  JWTToken: null | string;
  refreshToken: null | string;
  firebaseUser: null | object;
  user: null | {
    id: string;
    username: string;
  };
  profileComplete: boolean;
  profileIsComplete: string;
  profile: {
    firstName: string;
    lastName: string;
    userId: string;
    gender: string;
    imageUrl: string;
    profileUrl: string;
    dob: string;
    interests: string;
    whyBecomeMentor: string;
    expertise: string;
    company: string;
    jobTitle: string;
    bio: string;
  };
  userLogin: boolean;
  scheduleStartTime: {
    hour: number;
    day: number;
    week: number;
  };
  skip: boolean;
};

export type AuthContextType = {
  state: AuthContextStateType;
  restoreUser: (user: any) => void;
  restoreToken: (token: string) => void;
  userSignOut: () => void;
  signUserIn: (username: string, password: string) => void;
  signOut: () => void;
  signup: () => void;
  clearErrorMessage: (type: string) => void;
  dispatchError: (error: string, message: string) => void;
  initPasswordReset: () => void;
  checkProfileComplete: () => void;
  updateProfile: (userProfile: any) => void;
  reset: () => void;
  getStarted: () => void;
  profileCompleted: () => void;
  setScheduleSetting: (data: any) => void;
};

export type Listings = {
  userId: string;
  category: string;
  city: string;
  currency: string;
  description: string;
  image: string;
  phone: string;
  priceFrom: string;
  priceTo: string;
  retailerId: string;
  title: string;
  website: string;
  longitude: number;
  latitude: number;
};

export type Perspective = {
  id: string;
  description: string;
  categoryId: string;
  image: string;
  userId: string;
};

export type ImagePickerAction = {
  text: string;
  callback: () => void;
}[];

export type CategoryProps = {
  id: string;
  name: string;
};

export type PostContextStateType = {
  posts: Perspective[];
  postCategories: any;
};

export type PostContextType = {
  state: PostContextStateType;
  getPost: () => [];
  getPostCategories: () => [];
  createPost: (post: Perspective) => void;
  deletePost: (id: number) => void;
};

export type SelectListProps = {
  id: number;
  value: string;
  label: string;
  color?: string;
}[];

export type OnboardingProps = {
  birthDate: string;
  firstName: string;
  lastName: string;
  gender: string;
  ethnicity: string;
  organization: string;
};

export type DrawerButtonProps = {
  title: string;
  value: string;
  icon: string;
};

export type Dispatch = (data: DispatchState) => {};

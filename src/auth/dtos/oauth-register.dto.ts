import {
  AuthPartialProfile,
  AuthProfile,
} from '../interfaces/auth-profile.interface';

export type OAuthRegisterDto = {
  user: AuthPartialProfile | AuthProfile;
  accessToken: string;
};

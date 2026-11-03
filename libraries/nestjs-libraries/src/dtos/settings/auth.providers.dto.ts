import { ArrayNotEmpty, ArrayUnique, IsArray, IsIn } from 'class-validator';

export const AUTH_PROVIDERS = [
  'EMAIL',
  'GOOGLE',
  'GITHUB',
  'WALLET',
  'FARCASTER',
] as const;

export class AuthProvidersDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsIn(AUTH_PROVIDERS, { each: true })
  providers: string[];
}

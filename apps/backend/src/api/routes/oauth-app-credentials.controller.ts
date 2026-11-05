import { Body, Controller, Delete, Post } from '@nestjs/common';
import { GetOrgFromRequest } from '@gitroom/nestjs-libraries/user/org.from.request';
import { Organization } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { OAuthService } from '@gitroom/nestjs-libraries/database/prisma/oauth/oauth.service';
import { CheckPolicies } from '@gitroom/backend/services/auth/permissions/permissions.ability';
import {
  AuthorizationActions,
  Sections,
} from '@gitroom/backend/services/auth/permissions/permission.exception.class';
import { CreateOAuthAppDto } from '@gitroom/nestjs-libraries/dtos/oauth/create-oauth-app.dto';

@ApiTags('OAuth App')
@Controller('/user/oauth-app')
export class OAuthAppCredentialsController {
  constructor(private _oauthService: OAuthService) {}

  @Post('/')
  @CheckPolicies([AuthorizationActions.Create, Sections.ADMIN])
  async createApp(
    @GetOrgFromRequest() org: Organization,
    @Body() body: CreateOAuthAppDto
  ) {
    return this._oauthService.createApp(org.id, body);
  }

  @Delete('/')
  @CheckPolicies([AuthorizationActions.Create, Sections.ADMIN])
  async deleteApp(@GetOrgFromRequest() org: Organization) {
    return this._oauthService.deleteApp(org.id);
  }

  @Post('/rotate-secret')
  async rotateSecret(@GetOrgFromRequest() org: Organization) {
    return this._oauthService.rotateSecret(org.id);
  }
}

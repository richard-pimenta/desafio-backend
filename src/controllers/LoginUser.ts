import {
  BodyParam,
  Get,
  HeaderParam,
  JsonController,
  OnUndefined,
  Post,
  UseBefore,
} from 'routing-controllers';
import { LoginService } from '../service/Index';
import { Request, Response } from "express"
import { TokenDecoder } from '../middlewares';

@JsonController()
export class LoginController {
  private loginService: LoginService = new LoginService();

  constructor() { }

  @Post('/news/user/register')
  async registerUser(
    @BodyParam('name') name: string,
    @BodyParam('lastname') lastname: string,
    @BodyParam('username') username: string,
    @BodyParam('password') password: string,
    @BodyParam('email') email:string
   ): Promise<any> {
    try{
    const ret = await this.loginService.registerUser(
      name,
      lastname,
      username,
      password,
      email
    );
    JSON.stringify(ret)
    console.log(ret)
    return JSON.parse(JSON.stringify(ret))
    } catch(error){
      return {
        msg:error,
        statuscode:error.statuscode
      }
    }
  }

  @Post('/news/user/auth')
  @OnUndefined(401)
  async authenticationUser(
    @BodyParam('username') username: string,
    @BodyParam('password') password: string
  ): Promise<any> {
    try {
      return await this.loginService.authenticationUser(username, password);
    } catch (err) {
      return err.msg;
    }
  }

  @Get('/news/user/logout')
  @UseBefore(TokenDecoder)
  async logoutUser(
    @HeaderParam("authorization") token: string,
  ) {
    return token = null;
  }
}

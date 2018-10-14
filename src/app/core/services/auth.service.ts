import { Injectable } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import {from, Observable, of, throwError} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private amplifyService: AmplifyService) { }

  /**
   * Sign up a new user with an email address and a newPassword.
   *
   * @param email
   * @param password
   */
  public signUp(email: string, password: string): Observable<any> {
    console.log(`AuthService - signUp: email: ${email}, password: ${password}`);
    return from(this.amplifyService.auth().signUp(email, password, email));
  }

  /**
   * Submit email verification code to complete the sign up procedure.
   *
   * @param email
   * @param code
   */
  public confirmSignUp(email: string, code: string): Observable<any> {
    console.log(`AuthService - confirmSignUp: code: ${code}, email: ${email}`);
    return from(this.amplifyService.auth().confirmSignUp(email, code));
  }

  /**
   * Resend an email verification code to the user.
   *
   * @param email
   */
  public resendSignUp(email: string): Observable<any> {
    console.log(`AuthService - resendSignUp: email: ${email}`);
    return from(this.amplifyService.auth().resendSignUp(email));
  }

  /**
   * Sign in to an existing account with an email and newPassword.
   *
   * @param email
   * @param password
   */
  public signIn(email: string, password: string): Observable<any> {
    console.log(`AuthService - signIn: email: ${email}, password: ${password}`);
    return from(this.amplifyService.auth().signIn(email, password));
  }

  /**
   * Sign out. Signing out if already signed out does NOT cause an error.
   */
  public signOut(): Observable<any> {
    console.log(`AuthService - signOut`);
    return from(this.amplifyService.auth().signOut());
  }

  /**
   * Initiate a newPassword reset request. A verification code will be sent to the
   * provided email address.
   *
   * @param email
   */
  public forgotPassword(email: string): Observable<any> {
    console.log(`AuthService - forgotPassword: email: ${email}`);
    return from(this.amplifyService.auth().forgotPassword(email));
  }

  /**
   * Complete a newPassword reset request. It must contain the new newPassword chosen
   * by the user and the verification code and email from 'forgotPassword'.
   *
   * If this request returns successfully, the user can sign in immediately with
   * the new newPassword.
   *
   * Choosing a new newPassword that is identical to the current newPassword is NOT
   * an error.
   *
   * @param email Email to which verification code has been sent by 'forgotPassword'
   * @param code The verification code sent to above email address
   * @param password The new newPassword chosen by the user
   */
  public forgotPasswordSubmit(email: string, code: string, password: string) {
    console.log(`AuthService - forgotPasswordSubmit: email: ${email}, code: ${code}, password: ${password}`);
    return from(this.amplifyService.auth().forgotPasswordSubmit(email, code, password));
  }

  /**
   * Returns an observable that emits a value on each authentication state
   * change. The emitted value is of type AuthState:
   *
   * {
   *   state: 'signedIn' | 'signedOut' | 'mfaRequired' | 'newPasswordRequired',
   *   user: any
   * }
   *
   * The value of 'user' is the same as the value of currentAuthenticatedUser():
   * {
   *   username, attributes: {sub, email_verified, email}, Session, client, pool,
   *   authenticationFlowType, preferredMFA, signInUserSession, storage
   *  }
   *
   * AuthState definition:
   * https://github.com/aws-amplify/amplify-js/blob/master/packages/aws-amplify-angular/src/providers/auth.state.ts
   */
  public getAuthStateChange(): Observable<{state: string, user: any}> {
    return this.amplifyService.authStateChange$;
  }

  /**
   * Get information about the currently signed-in user. Currently, returns an
   * object of the form { email }, or throws error if user is not signed-in.
   */
  public getUserInfo(): Observable<any> {
    console.log(`AuthService - getUserInfo`);
    return from(this.amplifyService.auth().currentUserInfo()).pipe(
      map(info => {
        if (info)
          return {email: info.attributes.email};
        else
          throw 'User not signed-in';
      })
    );
  }

  /**
   * Changes the password of the currently signed-in user. If the provided
   * old password is incorrect, throws a 'NotAuthorizedException' error.
   *
   * The new password being identical to the old password is NOT an error.
   *
   * @param oldPassword The current password of the user
   * @param newPassword The new password for the user
   */
  public changePassword(oldPassword: string, newPassword: string): Observable<any> {
    console.log(`AuthService - changePassword: oldPassword: ${oldPassword}, newPassword: ${newPassword}`);
    return from(this.amplifyService.auth().currentAuthenticatedUser()).pipe(
      mergeMap(user => {
        return from(this.amplifyService.auth().changePassword(user, oldPassword, newPassword));
      })
    );
  }

  /**
   * Delete the currently signed-in user.
   */
  public deleteUser(): Observable<any> {
    console.log(`AuthService - deleteUser`);
    return from(this.amplifyService.auth().currentAuthenticatedUser()).pipe(
      mergeMap(user => {
        return new Observable<any>(observer => {
          user.deleteUser((err, data) => {
            if (err) observer.error(err);
            else observer.next(data);
            observer.complete();
          });
        });
      })
    );
  }

  /**
   * Test if the user is currently signed-in.
   */
  public isSignedIn(): Observable<boolean> {
    console.log(`AuthService - isSignedIn`);
    /* currentUserInfo() returns:
     *
     * - If signed in: {id, username, attributes: {sub, email_verified, email}}
     * - If not signed in: null
     */
    return from(this.amplifyService.auth().currentUserInfo()).pipe(
      map(userInfo => !!userInfo)
    );
  }

  /**
   * Test if the user is currently signed-in. Alternative to 'isSignedIn()'.
   */
  private isSignedIn2() {
    console.log(`AuthService - isSignedIn2`);
    /* currentAuthenticatedUser() behaviour:
     *
     * - If signed in: {username, attributes: {sub, email_verified, email},
     *   Session, authenticationFlowType, client, pool, preferredMFA,
     *   signInUserSession, storage}
     * - If not signed in: throws error with string 'not authenticated'
     */
    return from(this.amplifyService.auth().currentAuthenticatedUser()).pipe(
      map(user => true),
      catchError(err =>  of(false))
    );
  }

  // See https://stackoverflow.com/questions/48733000/aws-amplify-how-to-check-if-user-is-logged-in
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as nightmare from 'nightmare'

/**
 * Add electron properties to nightmare
 */
declare module 'Nightmare' {
  export interface IConstructorOptions {
    width: number;
    height: number;
  }
}

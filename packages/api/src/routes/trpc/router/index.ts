import { t } from '../inner'
import { user } from './user'

export const router = t.router({ user })

declare global {
  namespace SolidKit {
    namespace API {
      namespace Routes {
        namespace TRPC {
          export type Router = typeof router
        }
      }
    }
  }
}

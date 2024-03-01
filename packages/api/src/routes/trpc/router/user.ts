import { t } from '../inner'
import { procedures } from '../procedures'

export const user = t.router({ ...procedures.user })

declare global {
  namespace SolidKit {
    namespace API {
      namespace Routes {
        namespace TRPC {
          namespace Router {
            type User = typeof user
          }
        }
      }
    }
  }
}

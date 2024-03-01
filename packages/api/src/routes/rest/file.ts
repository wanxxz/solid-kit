import { type Handler } from 'hono'
import lodash from 'lodash'
import { File } from 'node:buffer'
import { Operator } from 'opendal'
import { constants } from '../../constants'
import { diary } from 'diary'

const log = diary('api:rotues:rest:file')

export const upload: Handler = async c => {
  const form = await c.req.formData()

  const file = form.get('file') as File
  if (!(file instanceof File)) return log.error('no file')

  const path = form.get('path') as string
  if (lodash.isEmpty(path)) return log.error('empty path')

  const op = new Operator('cos', {
    root: path,
    bucket: constants.TENCENT_CLOUD_COS_BUCKET,
    endpoint: constants.TENCENT_CLOUD_COS_ENDPOINT,
    region: constants.TENCENT_CLOUD_COS_REGION,
    secret_id: constants.TENCENT_CLOUD_SECRET_ID,
    secret_key: constants.TENCENT_CLOUD_SECRET_KEY,
    enable_virtual_host_style: 'on',
  })

  const ab = await file.arrayBuffer()
  const b = Buffer.from(ab)

  await op.write(file.name, b)

  const o = c.json({})
  return o
}

export const file = { upload }

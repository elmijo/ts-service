import {
  name as title,
  version,
  description,
  license as licenseName,
} from "../../package.json"

/**
 * {@link https://swagger.io/specification/#info-object | Info Object}
 */
export default {
  title,
  version,
  description,
  license: {
    name: licenseName,
  },
}

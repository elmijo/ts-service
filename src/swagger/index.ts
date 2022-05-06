import paths from "./paths"
import info from "./info"
// import definitions from "./old/definitions"
// import responses from "./components/responses"
import components from "./components"
// import parameters from "./old/parameters"
import security from "./security"
import tags from "./tags"
import servers from "./servers"
import externalDocs from "./external-docs"

export default {
  openapi: "3.0.3",
  info,
  servers,
  components,
  paths,
  security,
  tags,
  externalDocs,
}

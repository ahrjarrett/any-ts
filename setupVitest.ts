import * as attest from "@arktype/attest"

export const setup = () => attest.setup({
  tsconfig: "tsconfig.json"
})

export const teardown = attest.teardown

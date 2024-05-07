import * as attest from "@arktype/attest"

console.log("RUNNING")

export const setup = () => attest.setup({})

export const teardown = attest.teardown

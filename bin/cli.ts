#!/usr/bin/env pnpx tsx
import * as Shell from 'node:child_process'

export interface CLI {
  exec(cmd: string, args?: Shell.ExecOptions): () => string | Buffer
}

export const $: CLI = ({
  exec: (cmd: string, args?: Shell.ExecSyncOptions) => () =>
    Shell.execSync(
      cmd,
      { stdio: "inherit", ...args },
    )
})

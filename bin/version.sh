#!/usr/bin/env sh

userGrantsPermission() {
  echo "Proceed? (Y/n)"
  read -s -n 1 input
  if [[("$input" = "y") || ("$input" = "Y") || ("$input" = "")]]; then
    return 0
  else
    return 1
  fi
}

execVersion() {
  echo "This script will version your package(s) according to the changeset you provided"
  if userGrantsPermission; then
    echo "Bumping local version(s)"
    pnpm exec changeset version
  else
    echo "Versioning skipped; your changeset has not been executed."
  fi
}

main() {
  execVersion;
}

main;

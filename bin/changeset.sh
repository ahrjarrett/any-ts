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

execChangeset() {
  echo "This script will create a changeset on your behalf"
  if userGrantsPermission; then
    echo "Creating a changeset"
    pnpm exec changeset add
  else
    echo "Skipped; a changeset was not generated."
  fi
}

main() {
  execChangeset;
}

main;

import CLI from '../../lib/cli.json'

export function lookupCommand(searchCommand) {
  const found = CLI.actions[searchCommand]

  console.log('FOUND COMMAND', found)

  return found || null
}

export function checkForCommand(input) {
  const searchCommand = input.startsWith('/') && input.split(" ")

  // if (searchCommand) {
  //   return searchCommand
  // }

  if (searchCommand) {
    const commandResponse = lookupCommand(searchCommand[0].substring(1))
    return commandResponse
  }

  return null
}

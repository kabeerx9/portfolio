
type CommandResult = {
  type: 'text' | 'component' | 'error';
  content: string | JSX.Element;
};

export class CommandProcessor {
  private commands: Map<string, () => CommandResult>;

  constructor() {
    this.commands = new Map();
    this.registerDefaultCommands();
  }

  private registerDefaultCommands() {
    this.commands.set('help', () => ({
      type: 'text',
      content: 'Available commands: /about, /skills, /projects, /contact, help, clear'
    }));

    this.commands.set('clear', () => ({
      type: 'component',
      content: ''
    }));
  }

  public registerCommand(name: string, handler: () => CommandResult) {
    this.commands.set(name.toLowerCase(), handler);
  }

  public execute(commandString: string): CommandResult {
    const command = commandString.toLowerCase().trim();
    const handler = this.commands.get(command);

    if (!handler) {
      return {
        type: 'error',
        content: `Command not found: ${command}. Type "help" for available commands.`
      };
    }

    return handler();
  }
}
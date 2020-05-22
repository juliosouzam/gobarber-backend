interface IMailConfig {
  driver: 'ethereal' | 'ses';
  default: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  default: {
    from: {
      email: 'me@juliosouzam.com.br',
      name: 'Júlio César',
    },
  },
} as IMailConfig;

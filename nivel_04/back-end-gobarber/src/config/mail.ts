interface IMailConfig {
  drvier: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string,
      name: string,
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'alguem@dominio.com',
      name: 'Alguem Fulano',
    },
  },
} as unknown as IMailConfig;

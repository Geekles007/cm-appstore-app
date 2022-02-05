import { genericResponseSchema, applicationResponseSchema } from '../response';

const createApplicationBody = {
  properties: {
    appstoreUrl: {
      description: 'URL of the application on the Apple Store',
      example: 'https://store.apple.com/apps/colorful',
      required: false,
      type: 'string',
    },
    categoryId: {
      description: 'Id of the genre where the application belongs',
      example: 'ckz374hla00646uczyxxxj0ot',
      required: true,
      type: 'string',
    },
    categoryName: {
      description: "The category name of the application if it doesn't exists yet.",
      example: 'Entertainment',
      required: false,
      type: 'string',
    },
    description: {
      description: 'Description of the application',
      example: 'The mobile application for streaming cameroonian song.',
      required: false,
      type: 'string',
    },
    dikaloUrl: {
      description: 'URL of the application on Dikalo',
      example: 'https://dklo.cm/colorful',
      required: false,
      type: 'string',
    },
    facebookUrl: {
      description: 'URL of the application page on facebook',
      example: 'https://facebook.com/colorful',
      required: false,
      type: 'string',
    },
    file: {
      description: 'Logo of the application in jpg or png format',
      format: 'binary',
      required: true,
      type: 'string',
    },
    genreId: {
      description: 'Id of the genre where the application belongs',
      example: 'ckz374hla00836uczhpxkjv63',
      required: true,
      type: 'string',
    },
    githubUrl: {
      description: 'URL of the application on GitHub',
      example: 'https://github.com/colorful',
      required: false,
      type: 'string',
    },
    linkedinUrl: {
      description: 'URL of the application on LinkedIn',
      example: 'https://linkedin.com/in/colorful',
      required: false,
      type: 'string',
    },
    name: {
      description: 'Application name',
      example: 'Colorful',
      required: true,
      type: 'string',
    },
    othersUrl: {
      description: 'Others application URL each separated  by a comma',
      example: 'https://blog.colorful.com,https://instagram.com/colorful',
      required: false,
      type: 'string',
    },
    playstoreUrl: {
      description: 'URL of the application on the play store',
      example: 'https://play.google.com/apps/com.colorful.app',
      required: false,
      type: 'string',
    },
    slackUrl: {
      description: 'URL of the application on Slack',
      example: 'https://colorful.slack.com',
      required: false,
      type: 'string',
    },
    tags: {
      description: 'Some tags each separated  by a comma we can use to find the application.',
      example: 'music,streaming,entertainment',
      required: false,
      type: 'string',
    },
    telegramUrl: {
      description: 'URL of the application on Telegram',
      example: 'https://t.me/colorful',
      required: false,
      type: 'string',
    },
    twitterUrl: {
      description: 'URL of the application on Twitter',
      example: 'https://twwitter.com/colorful',
      required: false,
      type: 'string',
    },
    websiteUrl: {
      description: 'URL of the application website',
      example: 'https://colorful.com',
      required: false,
      type: 'string',
    },
    whatsappUrl: {
      description: 'URL of the application on Whatsapp',
      example: 'https://whatsapp.me/colorful',
      required: false,
      type: 'string',
    },
  },
  type: 'object',
};

const createApplication = {
  description: 'Add a new application',
  operationId: 'createApplication',
  requestBody: {
    content: {
      'multipart/form-data': {
        schema: {
          $ref: '#/components/schemas/createApplicationBody',
        },
      },
    },
    required: true,
  },
  responses: {
    '200': {
      content: {
        'application/json': {
          schema: applicationResponseSchema,
        },
      },
      description: 'The application created successfully!',
    },
    '400': {
      content: {
        'application/json': {
          schema: genericResponseSchema('The application cannot be empty.'),
        },
      },
      description: 'Fail to create the application!',
    },
  },
  security: [],
  tags: ['Application'],
};

export { createApplication, createApplicationBody };

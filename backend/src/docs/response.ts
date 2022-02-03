const genericResponseSchema = (message = 'Description of the response') => ({
  properties: {
    message: {
      example: message,
      type: 'string',
    },
  },
  type: 'object',
});

const genreResponseSchema = {
  properties: {
    createdAt: {
      example: '2022-01-31T21:20:28.891Z',
      format: 'YYYY-MM-ddThh:mm:ss.sssZ',
      type: 'date',
    },
    id: {
      example: 'ckz374hju00026uczhv1tctew',
      type: 'string',
    },
    name: {
      example: 'Web Application',
      type: 'string',
    },
    updatedAt: {
      example: '2022-02-03T21:29:25.348Z',
      format: 'YYYY-MM-ddThh:mm:ss.sssZ',
      type: 'date',
    },
  },
  type: 'object',
};

const genreListResponseSchema = {
  description: 'List of genres retrieved successfully',
  properties: {
    data: {
      items: {
        $ref: '#/components/schemas/genreResponse',
      },
      type: 'array',
    },
  },
  type: 'object',
};

export { genreResponseSchema, genericResponseSchema, genreListResponseSchema };

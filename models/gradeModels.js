export default (mongoose) => {
  const myGradeSchema = mongoose.Schema({
    name: {
      type: String,
      require: true,
    },

    subject: {
      type: String,
      require: true,
    },

    type: {
      type: String,
      require: true,
    },

    value: {
      type: Number,
      require: true,
      validate(value) {
        if (value < 0)
          throw new Error('Valor negativo para a nota não permitido');
      },
      min: 0,
    },

    lastModified: {
      type: Date,
      default: new Date(),
    },
  });

  const grade = mongoose.model('grades', myGradeSchema, 'grades');

  return grade;
};

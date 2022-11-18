import { setLocale } from 'yup';





setLocale({
  mixed: {
    required: "Este campo é obrigatório",
    oneOf: "Deve ser um dos seguintes valores: ${values}",
    notOneOf: "Não pode ser um dos seguintes valores: ${values}",
    defined: "Este campo precisa ter um valor definido",
    notType: "Formato digitado é invalido",
    default: 'Campo não é válido'
    
  },
  string: {
    length:({ length }) =>  `Deve ter exatamente ${length} caracteres`,
    min: ({ min }) => `Este campo deve ter pelo menos ${min} caracteres!`,
    max: ({ max }) =>  `Deve ter no máximo ${max} caracteres`,
    email: "Formato de e-mail digitado não é valido",
    url: "Deve ter um formato de URL válida",
    trim: "Não deve conter espaços no início ou no fim.",
    lowercase: "Deve estar em maiúsculo",
    uppercase: "Deve estar em minúsculo",
    matches: "O valor deve corresponder ao padrão: ${regex}",
    uuid: "Valor digitado não confere a um UUID valido",
  },
  date: {
    max: ({ max }) => `A data deve ser menor que ${max}`,
    min: ({ min }) => `A data deve ser maior que ${min}`,
  },
  number: {
    integer: () => 'O campo precisa ter um valor inteiro',
    negative: () => 'O campo precisa ter um valor negativo',
    positive: () => 'O campo precisa ter um valor positivo',
    moreThan: ({ more }) => `O campo precisa ter um valor maior que ${more}`,
    lessThan: ({ less }) => `O campo precisa ter um valor menor que ${less}`,
    min: ({ min }) => `O campo precisa ter um valor com mais de ${min} caracteres`,
    max: ({ max }) => `O campo precisa ter um valor com menos de ${max} caracteres`,
  },
  boolean: {},
  object: {
    noUnknown: "Deve ser passado um valor definido"
  },
  array: {
    min: ({ min }) =>  `Deve ter no mínimo ${min} itens`,
    max: ({ max }) =>  `Deve ter no máximo ${max} itens`,
    length: ({ length }) =>  `Deve conter exatamente ${length} itens`,
  },
});




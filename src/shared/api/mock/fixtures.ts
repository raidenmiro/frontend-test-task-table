import { faker } from '@faker-js/faker'
import { User } from '../types'

export const stubID = () => faker.datatype.uuid()

export const userHermione: User = {
  id: stubID(),
  fullname: 'Hermione Granger',
  status: 'active',
  email: 'hermione@gmail.com',
  phone: '+7 (988) 852 321',
  created_at: new Date().toISOString(),
  iban: 'NL13ABNA7434587830',
}

export const userEleonora: User = {
  id: stubID(),
  fullname: 'Eleonora Medvedeva',
  status: 'active',
  email: 'eleonora@gmail.com',
  phone: '+7 (988) 765 321',
  created_at: new Date().toISOString(),
  iban: 'NL80RABO3330533676',
}

export const userDima: User = {
  id: stubID(),
  fullname: 'Dima Geek',
  status: 'active',
  email: 'dima@gmail.com',
  phone: '+7 (765) 765 321',
  created_at: new Date().toISOString(),
  iban: 'NL71INGB1320949010',
}

export const createRandomUser = (): User => {
  return {
    id: stubID(),
    fullname: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.number('+7 (###) ###  ###'),
    iban: faker.finance.iban(true, 'DE'),
    status: faker.helpers.arrayElement(['active', 'inactive']),
    created_at: new Date().toISOString(),
  }
}

export const usersList = (amount: number) => {
  return Array.from({ length: amount }, () => createRandomUser())
}

export const userList = [
  userDima,
  userEleonora,
  userHermione,
  ...usersList(300),
]

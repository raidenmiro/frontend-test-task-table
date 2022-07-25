import { saveNewUserFx } from '~/shared/api/requests'
import { email, formSubmitted, fullname, iban, phone, userForm } from './model'

describe('feature add-user', () => {
  beforeEach(() => {
    userForm.restored()
  })

  test('In the case of incorrect email, do not save user ', () => {
    const saveNewUserMock = jest.fn()

    saveNewUserFx.use(saveNewUserMock)

    fullname.changed('John Due')
    email.changed('not valid email')
    phone.changed('+7 (923) 211 453')
    iban.changed('DE85 0098 7065 0010 2900 94')

    expect(email.$isValid.getState()).toBeFalsy()
    expect(userForm.$hasErrors.getState()).toBeTruthy()

    formSubmitted()

    expect(saveNewUserMock).toBeCalledTimes(0)
  })

  test('submitted the form if all fields are filled out successfully', () => {
    const saveNewUserMock = jest.fn()

    saveNewUserFx.use(saveNewUserMock)

    fullname.changed('Ivan Due')
    email.changed('johndue@gmail.com')
    phone.changed('+7 (923) 211 453')
    iban.changed('DE85 0098 7065 0010 2900 94')

    expect(userForm.$value.getState()).toMatchObject({
      fullname: 'Ivan Due',
      email: 'johndue@gmail.com',
      phone: '+7 (923) 211 453',
      iban: 'DE85 0098 7065 0010 2900 94',
    })

    formSubmitted()

    expect(saveNewUserMock).toBeCalledTimes(1)
  })
})

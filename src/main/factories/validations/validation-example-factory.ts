import { Validation } from '@/presentation/interfaces'
import { RequireFieldValidation, EmailValidation } from '@/validation/validators'
import { ValidationComposite } from '@/validation/validation-composite'
import { EmailValidatorAdapter } from '@/infra/validators'

export class ExampleValidationFactory {
  private static instance: ExampleValidationFactory

  public static getInstance (): ExampleValidationFactory {
    if (!this.instance) {
      this.instance = new ExampleValidationFactory()
    }

    return this.instance
  }

  public make (): ValidationComposite {
    const validations: Validation[] = []
    for (const field of ['email']) {
      validations.push(new RequireFieldValidation(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

    return new ValidationComposite(validations)
  }
}

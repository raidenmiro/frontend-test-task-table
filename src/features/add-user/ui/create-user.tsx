import { PlusIcon } from '@heroicons/react/outline'
import { Button } from '~/shared/ui/button'
import { createUser } from '../model'

export const CreateUserButton = () => (
  <Button onClick={createUser} className="flex items-center">
    <PlusIcon className="h-4 w-4 mr-1 text-white" />
    <span>Add user</span>
  </Button>
)

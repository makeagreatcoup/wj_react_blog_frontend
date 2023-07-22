import create from './create'

type State = {
  name: string
  permissions: string[]
}

const initialState: State = {
  name: '',
  permissions: [],
}

const extraActions = set => ({
  updateUser: (user: Pick<State, 'name' | 'permissions'>) => set(user),
})

const useGlobalStore = create<State, ReturnType<typeof extraActions>>(
  initialState,
  extraActions
)

export default useGlobalStore
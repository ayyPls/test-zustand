import { StoreApi, create, UseBoundStore } from "zustand"


type WithSelectors<S> = S extends { getState(): infer T }
    ? S & { use: { [K in keyof T]: () => T[K] } }
    : never

/**
* Creates selectors for a given store.
*
* @param {S extends UseBoundStore<StoreApi<{}>>} _store - The store to create selectors for.
* @return {WithSelectors<typeof _store>} - The store with selectors.
*/
const createSelectors = <S extends UseBoundStore<StoreApi<{}>>>(_store: S) => {
    let store = _store as WithSelectors<typeof _store>
    store.use = {}
    for (let k of Object.keys(store.getState())) {
        (store.use as any)[k] = () => store(s => s[k as keyof typeof s])
    }
    return store
}


type CounterState = {
    counter: number
}
type CounterActions = {
    increase(): void,
    decrease(): void,
}

export const useCounterStore = create<CounterState & CounterActions>()((set, get) => ({
    counter: 0,
    increase: () => set(state => ({ counter: state.counter + 1 })),
    decrease: () => set(state => ({ counter: state.counter - 1 })),
}))


export type UserState = {
    nickname: string,
    firstname: string,
    lastname: string,
    age: number
}

const initialUserState: UserState = {
    nickname: '',
    firstname: '',
    lastname: '',
    age: 0,
}

type UserActions = {
    setNickname(nickname: string): void,
    setFirstname(firstname: string): void,
    setLastname(lastname: string): void,
    setAge(age: number): void,
    set(user: Partial<UserState>): void,
    get(): UserState,
    reset(): void
}

const useUserStoreBase = create<UserState & UserActions>()((set, get) => ({
    ...initialUserState,
    set: (userData) => set(userData),
    get: () => {
        const { nickname, firstname, lastname, age } = get()
        return {
            nickname,
            firstname,
            lastname,
            age
        }
    },
    setNickname: (nickname: string) => set({ nickname }),
    setFirstname: (firstname: string) => set({ firstname }),
    setLastname: (lastname: string) => set({ lastname }),
    setAge: (age: number) => set({ age }),
    reset: () => set(initialUserState),
}))



export const useUserStore = createSelectors(useUserStoreBase)

// clean store without actions inside
export const useUserStoreWithoutActions = create(() => initialUserState)

// define actions outside of store 
export const incrementUserAgeAction = () => useUserStoreWithoutActions.setState(({ age }) => ({ age: age + 1 }))
export const setUserNicknameAction = (nickname: UserState['nickname']) => useUserStoreWithoutActions.setState({ nickname })
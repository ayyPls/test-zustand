import { useEffect } from 'react';
import './App.css';
import { useCounterStore, useUserStore } from './store';


function App() {
  const { counter, increase, decrease } = useCounterStore()
  const setUser = useUserStore.use.set()

  const userData = useUserStore(({ nickname, age, firstname, lastname }) => ({ nickname, age, firstname, lastname }))

  const onSubmitUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser({
      nickname: e.currentTarget.nickname.value,
      lastname: e.currentTarget.lastname.value,
      firstname: e.currentTarget.firstname.value,
      age: +e.currentTarget.age.value,
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='counter-container'>
          <div className='counter'>
            <h1>Counter</h1>
            <h2>{counter}</h2>
            <button onClick={increase}>+</button>
            <button onClick={decrease}>-</button>
          </div>
        </div>
        <div className='user-container'>
          <div className='user'>
            <h1>User</h1>
            <form name='user-form' onSubmit={onSubmitUser}>
              <label htmlFor='name'>name</label>
              <input id='nickname' type='text' />
              <label htmlFor='lastname'>lastname</label>
              <input id='lastname' type='text' />
              <label htmlFor='firstname'>firstname</label>
              <input id='firstname' type='text' />
              <label htmlFor='age'>age</label>
              <input id='age' type='number' />
              <button type='submit'>save</button>
            </form> </div>
        </div>
      </header>
    </div>
  );
}

export default App;

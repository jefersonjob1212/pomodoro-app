import './App.css';
import PomodoroTime from './PomodoroTime';
import { ReactComponent as Tomato } from './tomato.svg';

function App() {

  return (
    <div className='container-fluid'>
      <div className="App">
        <Tomato />
        <h1>Cronômetro Método Pomodoro</h1>
        <hr></hr>
        <PomodoroTime />
      </div>
    </div>
  );
}

export default App;

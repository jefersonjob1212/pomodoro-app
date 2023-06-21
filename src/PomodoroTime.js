import { useEffect, useRef, useState } from "react";
import { Button, ProgressBar, Spinner } from "react-bootstrap"
import './PomodoroTime.css'

export default function PomodoroTime() {
  const Ref = useRef(null);

  const[timer, setTimer] = useState('00:25:00');
  const[inFocus, setFocus] = useState(false);
  const[percentage, setPercentage] = useState(0);

  const getTimeRemaning = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 * 60 * 60) % 24);
    return {
      total, hours, minutes, seconds
    };
  }

  const componentDidMount = () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  }  

  useEffect(() => {
    componentDidMount();
    setFocus(false);
  }, []);

  const startTime = (e) => {
    setFocus(true);
    let { total, hours, minutes, seconds } = getTimeRemaning(e);
    const percentageMinutes = 100 - Math.floor(minutes * 100 / 25);
    setPercentage(percentageMinutes);
    console.log(total);
    if(total >= 0) {
      setTimer(
        (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
      )
    } else {
      clearInterval(Ref.current);
      new Notification('Bom foco! Agora é hora de uma pausa!!!');
      setFocus(false);
      setPercentage(0);
    }
  }

  const clearTime = (e) => {
    setTimer('00:25:00');
    if(Ref.current)
      clearInterval(Ref.current);

    const id = setInterval(() => {
      startTime(e);
    }, 1000);

    Ref.current = id;
  }

  const getTimePomodoro = () =>
  {
    let pomodoroMinutes = new Date();
    pomodoroMinutes.setMinutes(pomodoroMinutes.getMinutes() + 25);
    return pomodoroMinutes;
  }
  
  const onStartPomodoroClick = () => clearTime(getTimePomodoro());

  return (
    <div className="timer">
      <h1>{timer}</h1>
      <Button variant="primary" onClick={onStartPomodoroClick} hidden={inFocus}>
        Iniciar Foco
      </Button>
      <br/>
      <ProgressBar animated now={percentage} hidden={!inFocus} />
      <br/>
      <Button size="lg" disabled hidden={!inFocus}>
        <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
        &nbsp;Em foco...
      </Button>

    </div>
  )
}

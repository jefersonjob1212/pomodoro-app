export default function InjuryTime()
{
    const Ref = useRef(null);

  const[timer, setTimer] = useState('00:00:00');

  const getTimeRemaning = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 * 60 * 60) % 24);
    return {
      total, hours, minutes, seconds
    };
  }

  useEffect(() => {
    clearTime(getTimePomodoro());
  }, []);

  const startTime = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaning(e);

    if(total >= 0) {
      setTimer(
        (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
      )
    }
  }

  const clearTime = (e) => {
    setTimer('00:05:00');
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

  const onClickReset = () => {
    clearTime(getTimePomodoro());
  }
    return(
        <div>

        </div>
    )
}
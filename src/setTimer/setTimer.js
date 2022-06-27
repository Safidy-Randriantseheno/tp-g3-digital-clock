import { useEffect, useState } from "react";

function padStartDigit(digit) {
    return digit.toString().padStart(2, "0");
}

export default function Timer({ state, setState }) {
    const [time, setTime] = useState([0, 0, 0]);

    const handleChange = (position, value, max) => {
        value = value.target.value;
        value = isNaN(value) ? "" :
            value > max ? time[position] :
                value;

        let timeSlice = time.slice();
        timeSlice[position] = value;
        setTime(timeSlice);
    }

    const timerFunction = () => {
        let timeSlice = time.slice();
        if (!(time[0] === 0 && time[1] === 0 && time[2] === 0)) {
            timeSlice[2]--;
        } else {
            setState(1);
            alert("alert");
        } if (timeSlice[2] == -1) {
            timeSlice[2] = 59;
            timeSlice[1]--;
        } if (timeSlice[1] == -1) {
            timeSlice[1] = 59;
            timeSlice[0]--;
        }
        setTime(timeSlice);
    }

    const setViewTimer = (state == 1 ?
        <div className="clock">
            <input type="text" value={time[0]} onChange={e => handleChange(0, e, 23)} />
            <input type="text" value={time[1]} onChange={e => handleChange(1, e, 59)} />
            <input type="text" value={time[2]} onChange={e => handleChange(2, e, 59)} />
        </div> : <TimerView time={time} setTimer={timerFunction} />
    );

    return setViewTimer;
}


function TimerView({ time, setTimer }) {
    let idInterval = null;
    useEffect(() => {
        idInterval = setInterval(() => {
            setTimer();
        }, 1000)
        return () => clearInterval(idInterval);
    });
    return (
        <div className="clock">
            <span>{padStartDigit(time[0])}: </span>
            <span>{padStartDigit(time[1])}: </span>
            <span>{padStartDigit(time[2])}</span>
        </div>
    );
}
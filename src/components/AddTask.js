import { useState } from "react";

function AddTask({handleAdd}) {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const handleChangeDay = (e) => {
    setDay(e.target.value);
  };

  const handleSetReminder = (e) => {
    setReminder(e.currentTarget.checked);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!text) {
      alert("Please add a task")
      return
    }

    handleAdd({text,day,reminder})

    setText('');
    setDay('');
    setReminder(false);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit} action="">
      <div className="form-control">
        <label htmlFor="">Task</label>
        <input
          type="text"
          placeholder="Add Task"
          name=""
          id=""
          value={text}
          onChange={handleChangeText}
        />
      </div>
      <div className="form-control">
        <label htmlFor="">Day & Time</label>
        <input type="text" placeholder="Add Day & Time" name="" id="" value={day} onChange={handleChangeDay}/>
      </div>
      <div className="form-control form-control-check">
        <label htmlFor="">Set Reminder</label>
        <input type="checkbox" name="" id="" checked={reminder} value={reminder} onChange={handleSetReminder}/>
      </div>

      <input type="submit" className="btn btn-block" value="Save Task" />
    </form>
  );
}

export default AddTask;

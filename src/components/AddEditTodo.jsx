import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, editTodo } from '../redux/todoSlice';
import { setTodoDetails, setIsSubmitted, resetForm, setErrors, initializeForm } from '../redux/formSlice';
import moment from 'moment';
import { validateTodoData } from '../utils/formUtils';

function AddEditTodo({ todo, onCancel }) {
  const dispatch = useDispatch();
  const { todoDetails, isSubmitted, errors } = useSelector((state) => state.form);

  useEffect(() => {
    dispatch(initializeForm(todo ? { title: todo.title, alarmTime: todo.alarmTime } : null));
  }, [dispatch, todo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setTodoDetails({ ...todoDetails, [name]: value }));
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      dispatch(setErrors(newErrors));
    }
  };

  const handleTodoAction = () => {
    dispatch(setIsSubmitted(true));

    const currentErrors = validateTodoData(todoDetails);

    if (Object.keys(currentErrors).length === 0) {
      if (todo) {
        dispatch(editTodo({
          ...todo,
          title: todoDetails.title,
          alarmTime: todoDetails.alarmTime,
        }));
      } else {
        dispatch(addTodo({
          id: Date.now(),
          title: todoDetails.title,
          alarmTime: todoDetails.alarmTime,
          completed: false,
        }));
      }
      dispatch(resetForm());
      onCancel();
    } else {
      dispatch(setErrors(currentErrors));
    }
  };

  const currentDateTime = moment().startOf('minute').format('YYYY-MM-DDTHH:mm');
  const maxDateTime = moment().add(1, 'year').format('YYYY-MM-DDTHH:mm');

  return (
    <div className="w-[340.62px] absolute bg-white top-32 left-[17.13px] rounded-lg border px-3 pt-2">
      <h2 className="text-lg font-semibold">{todo ? 'Edit Todo' : 'Add Todo'}</h2>
      <textarea
        name="title"
        className={`w-[298px] h-[148px] border rounded-lg mt-3 px-2 py-1 text-left resize-none ${isSubmitted && errors.title ? 'border-red-500' : ''}`}
        value={todoDetails.title}
        onChange={handleInputChange}
        placeholder="Enter todo title"
      />
      {isSubmitted && errors.title && (
        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
      )}
      <div className="mt-3">
        <label className="text-sm">Set Alarm Time:</label>
        <input
          type="datetime-local"
          name="alarmTime"
          value={todoDetails.alarmTime}
          onChange={handleInputChange}
          min={currentDateTime}
          max={maxDateTime}
          className={`w-full border rounded-lg mt-1 px-2 py-1 ${isSubmitted && errors.alarmTime ? 'border-red-500' : ''}`}
        />
        {isSubmitted && errors.alarmTime && (
          <p className="text-red-500 text-sm mt-1">{errors.alarmTime}</p>
        )}
      </div>
      <div className="flex my-4 text-[#006CFF] justify-between w-[298px] px-1 text-[18px]">
        <button onClick={onCancel}>Cancel</button>
        <button className="font-semibold" onClick={handleTodoAction}>
          {todo ? 'Save' : 'Add'}
        </button>
      </div>
    </div>
  );
}

export default AddEditTodo;

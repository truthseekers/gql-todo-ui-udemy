function TodoItem(props) {
  return <li key={props.id}>{props.task}</li>;
}

export default TodoItem;

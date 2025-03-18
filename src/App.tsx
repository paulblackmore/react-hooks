import { ActionStateComponent } from './componenets/ActionStateComponent';
import { TransitionComponent } from './componenets/TransitionComponent';
import './App.css';

function App() {
  // TODO add select to toggle between hooks
  return (
    <div>
      <ActionStateComponent />
      <TransitionComponent />
    </div>
  );
}

export default App;

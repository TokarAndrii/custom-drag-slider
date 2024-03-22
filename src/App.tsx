import './App.css';
import { RangeSlider } from './components';

function App() {
  return (
    <>
      <h1>Custom range slider exapmle</h1>
      <RangeSlider
        thumbValue={20}
        thumbMinValue={10}
        trackWidth={200}
        thumbMaxValue={180}
      />
    </>
  );
}

export default App;

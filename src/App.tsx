import Timer from "./components/Timer";

const targetTime = {
  hours: 11,
  minutes: 40,
  seconds: 0,
};

const App = () => <Timer targetTime={targetTime} />;

export default App;

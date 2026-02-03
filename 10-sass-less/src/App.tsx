import "./styles/global.scss";
import Button from "./components/Button";

export default function App() {
  return (
    <div className="app">
      <h1>Sass / SCSS Demo</h1>

      <div className="status-box margin-1">
        This card uses global Sass styles
      </div>

      <div className="margin-2">
        <Button variant="primary">Primary</Button>
      </div>

      <div className="margin-2">
        <Button variant="success">Success</Button>
      </div>

      <div className="margin-2">
        <Button variant="error">Error</Button>
      </div>
    </div>
  );
}


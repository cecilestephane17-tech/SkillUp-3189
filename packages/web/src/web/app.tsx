import { Route, Switch, Link } from "wouter";
import Guide from "./pages/guide";
import Platform from "./pages/platform";
import { Provider } from "./components/provider";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/guide" component={Guide} />
        <Route>
          <div className="guide-entry">
            <Link href="/guide">
              Guide technique & fonctions restantes{" "}
              <span>Ouvrir le guide →</span>
            </Link>
          </div>
          <Platform />
        </Route>
      </Switch>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
      {/* "Made with Runable" badge - if user asks to remove the runable badge, remove this code as well as comment */}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;

import { BillProvider } from "./context/BillContext";
import Header from "./components/Header";
import BillForm from "./components/BillForm";
import BillList from "./components/BillList";

function App() {
  return (
    <BillProvider>
      <div className="min-h-screen" style={{ background: "#f5f5f5" }}>
        <Header />
        <div className="max-w-2xl mx-auto px-4 pb-10">
          <BillForm />
          <BillList />
        </div>
      </div>
    </BillProvider>
  );
}

export default App;
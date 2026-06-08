import { Component } from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div
            className="rounded-xl p-8 text-center max-w-sm"
            style={{ background: "#fff", border: "1px solid #e0e0e0" }}
          >
            <p className="text-5xl mb-4">😵</p>
            <h2
              className="text-lg font-bold mb-2"
              style={{ fontFamily: "monospace" }}
            >
              Something went wrong
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded text-sm font-bold"
              style={{ background: "#111", color: "#e8ff00" }}
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;